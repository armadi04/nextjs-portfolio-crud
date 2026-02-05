"""
Configuration management for the Cloud-Native RAG Platform.
Uses Pydantic Settings for environment variable validation and type safety.
"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Application
    app_name: str = "Cloud-Native RAG Platform"
    app_version: str = "1.0.0"
    debug: bool = True
    
    # Google Gemini
    google_gemini_api_key: str
    
    # Supabase
    supabase_url: str
    supabase_key: str
    
    # Vector Store
    chroma_persist_directory: str = "./chroma_db"
    chroma_collection_name: str = "documents"
    
    # RAG Configuration
    retrieval_top_k: int = 3
    similarity_threshold: float = 0.7
    confidence_threshold: float = 0.6
    
    # Policy Configuration
    enable_policy_check: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()
