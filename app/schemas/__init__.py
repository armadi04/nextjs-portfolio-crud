"""
Pydantic schemas for request/response validation.
These models ensure type safety and automatic API documentation.
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime


class SourceDocument(BaseModel):
    """Represents a retrieved source document with metadata."""
    content: str = Field(..., description="The text content of the document chunk")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Document metadata (source, page, etc.)")
    similarity_score: float = Field(..., description="Similarity score from vector search")


class PromptRequest(BaseModel):
    """Request model for submitting a prompt to the RAG system."""
    prompt: str = Field(..., min_length=1, description="User's question or prompt")
    user_id: Optional[str] = Field(None, description="Optional user identifier for audit tracking")
    language: str = Field("id", description="Language preference (id/en)")


class PromptResponse(BaseModel):
    """Response model containing the AI-generated answer with governance metadata."""
    audit_id: str = Field(..., description="Unique identifier for this interaction in audit logs")
    answer: str = Field(..., description="AI-generated response")
    sources: List[SourceDocument] = Field(..., description="Retrieved source documents used for generation")
    confidence_score: float = Field(..., description="Confidence score based on retrieval similarity")
    policy_flag: bool = Field(..., description="Whether policy violations were detected")
    policy_violations: List[str] = Field(default_factory=list, description="List of detected policy violations")
    status: str = Field(default="pending", description="Review status (pending/approved/rejected)")


class ReviewRequest(BaseModel):
    """Request model for human review decision."""
    decision: str = Field(..., pattern="^(approved|rejected)$", description="Review decision: approved or rejected")
    reviewer_id: str = Field(..., description="Identifier of the reviewer")
    comments: Optional[str] = Field(None, description="Optional review comments")


class AuditLogResponse(BaseModel):
    """Complete audit log record with explainability information."""
    id: str
    user_id: Optional[str]
    prompt: str
    response: str
    sources: List[Dict[str, Any]]
    confidence_score: float
    policy_flag: bool
    status: str
    reviewer_id: Optional[str] = None
    reviewed_at: Optional[datetime] = None
    created_at: datetime
    pinned: bool = False
    custom_title: Optional[str] = None
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class PinRequest(BaseModel):
    """Request model for pinning/unpinning a chat."""
    pinned: bool = Field(..., description="Pin status: true to pin, false to unpin")


class RenameRequest(BaseModel):
    """Request model for renaming a chat."""
    custom_title: str = Field(..., min_length=1, description="New custom title for the chat")


class AnalyticsStats(BaseModel):
    """Aggregated analytics statistics."""
    total_conversations: int = Field(..., description="Total number of logged conversations")
    total_suggestions: int = Field(..., description="Total AI suggestions generated")
    ai_acceptance_rate: float = Field(..., description="Percentage of suggestions accepted effectively")
    approved_count: int = Field(..., description="Number of approved reviews")
    rejected_count: int = Field(..., description="Number of rejected reviews")
