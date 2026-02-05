-- Database Migration for Chat Context Menu Features
-- Add pinned and custom_title columns to audit_logs table

ALTER TABLE audit_logs 
ADD COLUMN IF NOT EXISTS pinned BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS custom_title TEXT;

-- Create index for efficient sorting (pinned first, then by date)
CREATE INDEX IF NOT EXISTS idx_audit_logs_pinned ON audit_logs(pinned DESC, created_at DESC);

-- Verify migration
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns
WHERE table_name = 'audit_logs'
AND column_name IN ('pinned', 'custom_title');
