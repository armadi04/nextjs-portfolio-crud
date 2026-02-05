"""
Quick test script to verify the RAG pipeline is working.
"""

import asyncio
from app.services.rag_service import get_rag_service
from app.services.policy_service import check_policy
from app.config import settings
import structlog

structlog.configure(
    processors=[
        structlog.processors.JSONRenderer()
    ]
)

logger = structlog.get_logger()


async def test_rag():
    """Test the RAG pipeline."""
    
    print("🧪 Testing RAG Pipeline...")
    print(f"📍 Using Gemini API: {settings.google_gemini_api_key[:20]}...")
    print()
    
    try:
        # Initialize RAG service
        print("1️⃣ Initializing RAG service...")
        rag_service = get_rag_service()
        print("✅ RAG service initialized")
        print()
        
        # Test prompt
        test_prompt = "What is machine learning?"
        print(f"2️⃣ Testing with prompt: '{test_prompt}'")
        
        # Generate response
        answer, sources, confidence = await rag_service.generate_response(test_prompt)
        
        print("\n" + "="*60)
        print("📝 RESPONSE")
        print("="*60)
        print(answer)
        print()
        
        print("="*60)
        print(f"📚 SOURCES ({len(sources)} documents)")
        print("="*60)
        for i, src in enumerate(sources, 1):
            print(f"\n{i}. Similarity: {src.similarity_score:.4f}")
            print(f"   Source: {src.metadata.get('source', 'unknown')}")
            print(f"   Content: {src.content[:100]}...")
        print()
        
        print("="*60)
        print("📊 METADATA")
        print("="*60)
        print(f"Confidence Score: {confidence:.4f}")
        
        # Test policy
        print("\n3️⃣ Testing policy checks...")
        policy_flag, violations = check_policy(test_prompt, answer)
        print(f"Policy Flag: {policy_flag}")
        print(f"Violations: {violations if violations else 'None'}")
        
        print("\n✅ RAG Pipeline Test Complete!")
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    asyncio.run(test_rag())
