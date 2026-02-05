"""
RAG Service - Core Retrieval-Augmented Generation pipeline.
Implements document retrieval, response generation, and confidence scoring.
"""

from typing import List, Dict, Any, Tuple
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_classic.chains import RetrievalQA
from langchain_classic.prompts import PromptTemplate
from app.utils.vector_store import get_vector_store
from app.config import settings
from app.schemas import SourceDocument
import structlog

logger = structlog.get_logger()


class RAGService:
    """
    Service for Retrieval-Augmented Generation.
    Combines vector search with LLM generation for grounded responses.
    """
    
    def __init__(self):
        """Initialize RAG components."""
        self.vector_store = get_vector_store()
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            temperature=0.7,
            google_api_key=settings.google_gemini_api_key
        )
        
        # Custom prompt templates for RAG
        self.prompts = {
            "en": PromptTemplate(
                template="""You are a helpful AI assistant. Use the following context to answer the question.
If the question is a general greeting (like "hello", "hi") or not directly related to the specific context provided, please answer politely using your general knowledge.
Do NOT say "I cannot answer based on context" for simple social interactions or general questions.

Context:
{context}

Question: {question}

Answer: """,
                input_variables=["context", "question"]
            ),
            "id": PromptTemplate(
                template="""Anda adalah asisten AI yang membantu. Gunakan konteks berikut untuk menjawab pertanyaan.
Jika pertanyaan adalah sapaan umum (seperti "halo", "selamat pagi") atau tidak terkait langsung dengan konteks yang diberikan, silakan jawab dengan sopan menggunakan pengetahuan umum Anda.
JANGAN katakan "Saya tidak bisa menjawab berdasarkan konteks" untuk interaksi sosial sederhana atau pertanyaan umum.

Konteks:
{context}

Pertanyaan: {question}

Jawaban: """,
                input_variables=["context", "question"]
            )
        }
    
    async def generate_response(self, prompt: str, language: str = "id") -> Tuple[str, List[SourceDocument], float]:
        """
        Generate a response using RAG pipeline.
        
        Args:
            prompt: User's question/prompt
            language: Language code ('id' or 'en')
            
        Returns:
            Tuple of (answer, source_documents, confidence_score)
        """
        try:
            logger.info("Starting RAG pipeline", prompt=prompt[:100], language=language)
            
            # Step 1: Retrieve relevant documents
            retriever = self.vector_store.as_retriever(
                search_kwargs={"k": settings.retrieval_top_k}
            )
            
            # Get documents with scores
            docs_with_scores = self.vector_store.similarity_search_with_score(
                prompt,
                k=settings.retrieval_top_k
            )
            
            logger.info(f"Retrieved {len(docs_with_scores)} documents")
            
            # Step 2: Calculate confidence score based on similarity
            confidence_score = self._calculate_confidence(docs_with_scores)
            
            # Step 3: Prepare source documents
            source_docs = []
            retrieved_docs = []
            
            for doc, score in docs_with_scores:
                # Chroma returns distance, convert to similarity (lower distance = higher similarity)
                similarity_score = 1 / (1 + score)
                
                source_docs.append(
                    SourceDocument(
                        content=doc.page_content,
                        metadata=doc.metadata,
                        similarity_score=round(similarity_score, 4)
                    )
                )
                retrieved_docs.append(doc)
            
            # Step 4: Generate response using LLM
            if not retrieved_docs:
                answer = "Maaf, saya tidak memiliki cukup informasi untuk menjawab pertanyaan ini." if language == "id" else "I don't have enough information to answer this question."
            else:
                # Build context from retrieved documents
                context = "\n\n".join([doc.page_content for doc in retrieved_docs])
                
                # Select prompt based on language (default to id)
                prompt_template = self.prompts.get(language, self.prompts["id"])
                
                # Generate response
                formatted_prompt = prompt_template.format(
                    context=context,
                    question=prompt
                )
                
                response = self.llm.invoke(formatted_prompt)
                answer = response.content
            
            logger.info(
                "RAG pipeline completed",
                confidence_score=confidence_score,
                num_sources=len(source_docs)
            )
            
            return answer, source_docs, confidence_score
            
        except Exception as e:
            logger.error("Error in RAG pipeline", error=str(e))
            raise
    
    def _calculate_confidence(self, docs_with_scores: List[Tuple[Any, float]]) -> float:
        """
        Calculate confidence score based on retrieval similarity.
        
        Args:
            docs_with_scores: List of (document, distance_score) tuples
            
        Returns:
            Confidence score between 0 and 1
        """
        if not docs_with_scores:
            return 0.0
        
        # Convert distances to similarities and average them
        similarities = [1 / (1 + score) for _, score in docs_with_scores]
        avg_similarity = sum(similarities) / len(similarities)
        
        # Normalize to 0-1 range
        confidence = min(1.0, max(0.0, avg_similarity))
        
        return round(confidence, 4)


# Singleton instance
_rag_service = None


def get_rag_service() -> RAGService:
    """Get or create RAG service instance."""
    global _rag_service
    if _rag_service is None:
        _rag_service = RAGService()
    return _rag_service
