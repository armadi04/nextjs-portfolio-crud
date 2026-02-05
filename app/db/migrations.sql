-- Migration: Create audit_logs table for governance and compliance
-- This table stores all AI interactions with full traceability

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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_status ON audit_logs(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_policy_flag ON audit_logs(policy_flag) WHERE policy_flag = TRUE;

-- Add comments for documentation
COMMENT ON TABLE audit_logs IS 'Audit trail for all AI-generated responses with governance metadata';
COMMENT ON COLUMN audit_logs.id IS 'Unique identifier for each audit record';
COMMENT ON COLUMN audit_logs.user_id IS 'Identifier of the user who submitted the prompt';
COMMENT ON COLUMN audit_logs.prompt IS 'Original user prompt/question';
COMMENT ON COLUMN audit_logs.response IS 'AI-generated response';
COMMENT ON COLUMN audit_logs.sources IS 'JSON array of source documents used for RAG';
COMMENT ON COLUMN audit_logs.confidence_score IS 'Confidence score based on retrieval similarity';
COMMENT ON COLUMN audit_logs.policy_flag IS 'Whether policy violations were detected';
COMMENT ON COLUMN audit_logs.status IS 'Review status: pending, approved, or rejected';
COMMENT ON COLUMN audit_logs.reviewer_id IS 'Identifier of the human reviewer';
COMMENT ON COLUMN audit_logs.reviewed_at IS 'Timestamp when review was completed';
COMMENT ON COLUMN audit_logs.created_at IS 'Timestamp when record was created';
