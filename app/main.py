"""
Main FastAPI application entry point.
Cloud-Native Responsible Generative AI Platform with RAG, governance, and human-in-the-loop.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import prompt, audit, review, analytics
from app.config import settings
from app.utils.logger import configure_logging
from app.db.supabase import SupabaseClient
from app.utils.vector_store import VectorStoreManager
import structlog

# Configure logging
configure_logging()
logger = structlog.get_logger()

# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="""
    Cloud-Native Responsible Generative AI Platform
    
    Features:
    - RAG (Retrieval-Augmented Generation) pipeline
    - Responsible AI governance with policy checks
    - Human-in-the-loop review workflow
    - Comprehensive audit logging for compliance
    
    This platform ensures AI outputs are:
    - Grounded in source documents
    - Checked for policy violations
    - Reviewed by humans before finalization
    - Fully traceable for governance
    """
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(prompt.router, tags=["RAG Pipeline"])
app.include_router(audit.router, tags=["Audit & Compliance"])
app.include_router(review.router, tags=["Human-in-the-Loop"])
app.include_router(analytics.router, tags=["Analytics"])


@app.on_event("startup")
async def startup_event():
    """Initialize services on application startup."""
    logger.info("Starting Cloud-Native RAG Platform", version=settings.app_version)
    
    try:
        # Initialize Supabase client
        SupabaseClient.get_client()
        logger.info("Supabase client initialized")
        
        # Ensure database tables exist
        await SupabaseClient.ensure_tables()
        
        # Initialize vector store
        VectorStoreManager.get_vector_store()
        logger.info("Vector store initialized")
        
        logger.info("Application startup complete")
        
    except Exception as e:
        logger.error("Error during startup", error=str(e))
        raise


@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on application shutdown."""
    logger.info("Shutting down Cloud-Native RAG Platform")


@app.get("/", tags=["Health"])
async def root():
    """Root endpoint - API information."""
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "status": "running",
        "features": [
            "RAG Pipeline",
            "Policy Enforcement",
            "Human-in-the-Loop Review",
            "Audit Logging"
        ]
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "version": settings.app_version
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug
    )
