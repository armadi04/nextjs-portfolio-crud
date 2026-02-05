"""
Setup script to create database tables in Supabase.
Run this once to initialize the audit_logs table.
"""

import asyncio
from supabase import create_client
from app.config import settings
import structlog

logger = structlog.get_logger()


async def setup_database():
    """Create audit_logs table in Supabase."""
    
    print("🔧 Setting up Supabase database...")
    print(f"📍 Supabase URL: {settings.supabase_url}")
    
    try:
        # Create Supabase client
        supabase = create_client(settings.supabase_url, settings.supabase_key)
        print("✅ Connected to Supabase")
        
        # Note: Supabase Python client doesn't support direct SQL execution
        # We need to use the SQL Editor in Supabase Dashboard
        
        print("\n" + "="*60)
        print("⚠️  MANUAL STEP REQUIRED")
        print("="*60)
        print("\nPlease run the following SQL in your Supabase SQL Editor:")
        print("(Dashboard → SQL Editor → New Query)\n")
        
        sql = """
-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT,
    prompt TEXT NOT NULL,
    response TEXT NOT NULL,
    sources JSONB,
    confidence_score FLOAT,
    policy_flag BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewer_id TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_status ON audit_logs(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_policy_flag ON audit_logs(policy_flag) WHERE policy_flag = TRUE;
"""
        
        print(sql)
        print("\n" + "="*60)
        print("\nAfter running the SQL, press Enter to continue...")
        input()
        
        # Test connection by trying to query the table
        result = supabase.table("audit_logs").select("*").limit(1).execute()
        print("✅ Database table verified!")
        print(f"📊 Current audit logs count: {len(result.data)}")
        
        print("\n✨ Database setup complete!")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        print("\nPlease ensure you've run the SQL migration in Supabase Dashboard")
        raise


if __name__ == "__main__":
    asyncio.run(setup_database())
