"""
Vector store initialization and management.
Handles Chroma setup with persistent storage and sample data ingestion.
"""

from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_classic.schema import Document
from app.config import settings
import structlog

logger = structlog.get_logger()


class VectorStoreManager:
    """Manages vector store initialization and operations."""
    
    _instance: Chroma = None
    
    @classmethod
    def get_vector_store(cls) -> Chroma:
        """Get or create vector store instance."""
        if cls._instance is None:
            cls._instance = cls._initialize_vector_store()
        return cls._instance
    
    @classmethod
    def _initialize_vector_store(cls) -> Chroma:
        """Initialize Chroma vector store with Google Gemini embeddings."""
        try:
            embeddings = GoogleGenerativeAIEmbeddings(
                model="models/text-embedding-004",
                google_api_key=settings.google_gemini_api_key
            )
            
            vector_store = Chroma(
                collection_name=settings.chroma_collection_name,
                embedding_function=embeddings,
                persist_directory=settings.chroma_persist_directory
            )
            
            logger.info(
                "Vector store initialized",
                collection=settings.chroma_collection_name,
                persist_dir=settings.chroma_persist_directory
            )
            
            # Check if we need to add sample documents
            if vector_store._collection.count() == 0:
                cls._add_sample_documents(vector_store)
            
            return vector_store
            
        except Exception as e:
            logger.error("Failed to initialize vector store", error=str(e))
            raise
    
    @classmethod
    def _add_sample_documents(cls, vector_store: Chroma):
        """
        Add sample documents to the vector store for testing.
        In production, replace this with your actual document ingestion pipeline.
        """
        sample_docs = [
            Document(
                page_content="Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.",
                metadata={"source": "ml_basics.pdf", "page": 1, "topic": "machine_learning"}
            ),
            Document(
                page_content="Deep learning uses neural networks with multiple layers to progressively extract higher-level features from raw input data.",
                metadata={"source": "ml_basics.pdf", "page": 2, "topic": "deep_learning"}
            ),
            Document(
                page_content="Natural Language Processing (NLP) is a branch of AI that helps computers understand, interpret and manipulate human language.",
                metadata={"source": "nlp_guide.pdf", "page": 1, "topic": "nlp"}
            ),
            Document(
                page_content="Retrieval-Augmented Generation (RAG) combines retrieval of relevant documents with generative AI to produce more accurate and grounded responses.",
                metadata={"source": "rag_overview.pdf", "page": 1, "topic": "rag"}
            ),
            Document(
                page_content="Responsible AI focuses on developing AI systems that are fair, transparent, accountable, and respect privacy and human rights.",
                metadata={"source": "responsible_ai.pdf", "page": 1, "topic": "responsible_ai"}
            )
        ]
        
        try:
            vector_store.add_documents(sample_docs)
            logger.info(f"Added {len(sample_docs)} sample documents to vector store")
        except Exception as e:
            logger.error("Failed to add sample documents", error=str(e))


def get_vector_store() -> Chroma:
    """Convenience function to get vector store instance."""
    return VectorStoreManager.get_vector_store()
