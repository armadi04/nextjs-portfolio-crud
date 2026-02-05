"""
Supabase database client and utilities.
Handles connection management and provides helpers for database operations.
"""

from supabase import create_client, Client
from app.config import settings
import structlog

logger = structlog.get_logger()


class SupabaseClient:
    """Singleton Supabase client for database operations."""
    
    _instance: Client = None
    
    @classmethod
    def get_client(cls) -> Client:
        """Get or create Supabase client instance."""
        if cls._instance is None:
            try:
                cls._instance = create_client(
                    settings.supabase_url,
                    settings.supabase_key
                )
                logger.info("Supabase client initialized successfully")
            except Exception as e:
                logger.error("Failed to initialize Supabase client", error=str(e))
                raise
        return cls._instance
    
    @classmethod
    async def ensure_tables(cls):
        """
        Ensure required database tables exist.
        Creates audit_logs table if it doesn't exist.
        """
        client = cls.get_client()
        
        # SQL to create audit_logs table
        create_table_sql = """
        CREATE TABLE IF NOT EXISTS audit_logs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id TEXT,
            prompt TEXT NOT NULL,
            response TEXT NOT NULL,
            sources JSONB,
            confidence_score FLOAT,
            policy_flag BOOLEAN DEFAULT FALSE,
            status TEXT DEFAULT 'pending',
            reviewer_id TEXT,
            reviewed_at TIMESTAMPTZ,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        -- Create index for faster queries
        CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
        CREATE INDEX IF NOT EXISTS idx_audit_logs_status ON audit_logs(status);
        CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
        """
        
        try:
            # Note: Supabase Python client doesn't support direct SQL execution
            # You'll need to run this SQL in Supabase SQL Editor or use PostgREST
            logger.info("Please ensure audit_logs table exists in Supabase")
            logger.info("Run the SQL migration from app/db/migrations.sql")
        except Exception as e:
            logger.error("Error checking tables", error=str(e))
            raise


# Convenience function to get client
def get_supabase() -> Client:
    """Get Supabase client instance."""
    return SupabaseClient.get_client()
