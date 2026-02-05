"""
Audit Service - Manages audit logging for governance and compliance.
Handles creation, retrieval, and updates of audit records in Supabase.
"""

from typing import Optional, List, Dict, Any
from datetime import datetime
from app.db.supabase import get_supabase
from app.schemas import AuditLogResponse, AnalyticsStats
import structlog
import json

logger = structlog.get_logger()


class AuditService:
    """Service for managing audit logs in Supabase."""
    
    @classmethod
    async def create_audit_log(
        cls,
        user_id: Optional[str],
        prompt: str,
        response: str,
        sources: List[Dict[str, Any]],
        confidence_score: float,
        policy_flag: bool
    ) -> str:
        """
        Create a new audit log entry.
        
        Args:
            user_id: User identifier
            prompt: User's input prompt
            response: AI-generated response
            sources: List of source documents used
            confidence_score: Confidence score from RAG
            policy_flag: Whether policy violations were detected
            
        Returns:
            Audit log ID (UUID)
        """
        try:
            supabase = get_supabase()
            
            data = {
                "user_id": user_id,
                "prompt": prompt,
                "response": response,
                "sources": json.dumps(sources),  # Convert to JSON string
                "confidence_score": confidence_score,
                "policy_flag": policy_flag,
                "status": "pending",
                "created_at": datetime.utcnow().isoformat()
            }
            
            result = supabase.table("audit_logs").insert(data).execute()
            
            if result.data and len(result.data) > 0:
                audit_id = result.data[0]["id"]
                logger.info(
                    "Audit log created",
                    audit_id=audit_id,
                    user_id=user_id,
                    policy_flag=policy_flag
                )
                return audit_id
            else:
                raise Exception("Failed to create audit log - no data returned")
                
        except Exception as e:
            logger.error("Error creating audit log", error=str(e))
            raise
    
    @classmethod
    async def get_audit_log(cls, audit_id: str) -> Optional[AuditLogResponse]:
        """
        Retrieve an audit log by ID.
        
        Args:
            audit_id: UUID of the audit log
            
        Returns:
            AuditLogResponse or None if not found
        """
        try:
            supabase = get_supabase()
            
            result = supabase.table("audit_logs").select("*").eq("id", audit_id).execute()
            
            if result.data and len(result.data) > 0:
                record = result.data[0]
                
                # Parse sources from JSON string
                sources = json.loads(record["sources"]) if record.get("sources") else []
                
                return AuditLogResponse(
                    id=record["id"],
                    user_id=record.get("user_id"),
                    prompt=record["prompt"],
                    response=record["response"],
                    sources=sources,
                    confidence_score=record["confidence_score"],
                    policy_flag=record["policy_flag"],
                    status=record["status"],
                    reviewer_id=record.get("reviewer_id"),
                    reviewed_at=record.get("reviewed_at"),
                    created_at=record["created_at"],
                    pinned=record.get("pinned", False),
                    custom_title=record.get("custom_title")
                )
            else:
                logger.warning("Audit log not found", audit_id=audit_id)
                return None
                
        except Exception as e:
            logger.error("Error retrieving audit log", audit_id=audit_id, error=str(e))
            raise
    
    @classmethod
    async def update_review_status(
        cls,
        audit_id: str,
        decision: str,
        reviewer_id: str
    ) -> bool:
        """
        Update the review status of an audit log.
        
        Args:
            audit_id: UUID of the audit log
            decision: "approved" or "rejected"
            reviewer_id: Identifier of the reviewer
            
        Returns:
            True if successful, False otherwise
        """
        try:
            supabase = get_supabase()

            update_data = {
                "status": decision,
                "reviewer_id": reviewer_id,
                "reviewed_at": datetime.utcnow().isoformat()
            }

            result = supabase.table("audit_logs").update(update_data).eq("id", audit_id).execute()

            if result.data and len(result.data) > 0:
                logger.info(
                    "Audit log review updated",
                    audit_id=audit_id,
                    decision=decision,
                    reviewer_id=reviewer_id
                )
                return True
            else:
                logger.warning("Failed to update audit log", audit_id=audit_id)
                return False
                
        except Exception as e:
            logger.error("Error updating review status", audit_id=audit_id, error=str(e))
            raise

    @classmethod
    async def pin_audit_log(cls, audit_id: str, pinned: bool) -> bool:
        """
        Update the pin status of an audit log.
        
        Args:
            audit_id: UUID of the audit log
            pinned: True to pin, False to unpin
            
        Returns:
            True if successful, False otherwise
        """
        try:
            supabase = get_supabase()

            update_data = {
                "pinned": pinned
            }

            result = supabase.table("audit_logs").update(update_data).eq("id", audit_id).execute()

            if result.data and len(result.data) > 0:
                logger.info(
                    "Audit log pin status updated",
                    audit_id=audit_id,
                    pinned=pinned
                )
                return True
            else:
                logger.warning("Failed to update pin status", audit_id=audit_id)
                return False
                
        except Exception as e:
            logger.error("Error updating pin status", audit_id=audit_id, error=str(e))
            raise

    @classmethod
    async def rename_audit_log(cls, audit_id: str, custom_title: str) -> bool:
        """
        Update the custom title of an audit log.
        
        Args:
            audit_id: UUID of the audit log
            custom_title: New custom title
            
        Returns:
            True if successful, False otherwise
        """
        try:
            supabase = get_supabase()

            update_data = {
                "custom_title": custom_title
            }

            result = supabase.table("audit_logs").update(update_data).eq("id", audit_id).execute()

            if result.data and len(result.data) > 0:
                logger.info(
                    "Audit log renamed",
                    audit_id=audit_id,
                    custom_title=custom_title
                )
                return True
            else:
                logger.warning("Failed to rename audit log", audit_id=audit_id)
                return False
                
        except Exception as e:
            logger.error("Error renaming audit log", audit_id=audit_id, error=str(e))
            raise

    @classmethod
    async def delete_audit_log(cls, audit_id: str) -> bool:
        """
        Delete an audit log.
        
        Args:
            audit_id: UUID of the audit log
            
        Returns:
            True if successful, False otherwise
        """
        try:
            supabase = get_supabase()

            result = supabase.table("audit_logs").delete().eq("id", audit_id).execute()

            if result.data and len(result.data) > 0:
                logger.info("Audit log deleted", audit_id=audit_id)
                return True
            else:
                logger.warning("Failed to delete audit log", audit_id=audit_id)
                return False
                
        except Exception as e:
            logger.error("Error deleting audit log", audit_id=audit_id, error=str(e))
            raise


    @classmethod
    async def list_audit_logs(cls, limit: int = 20) -> List[AuditLogResponse]:
        """
        List recent audit logs.
        Pinned chats appear first, then sorted by created_at DESC.

        Args:
            limit: Maximum number of logs to return

        Returns:
            List of AuditLogResponse
        """
        try:
            supabase = get_supabase()

            # Query: sort by pinned DESC (pinned first), then created_at DESC
            result = supabase.table("audit_logs") \
                .select("*") \
                .order("pinned", desc=True) \
                .order("created_at", desc=True) \
                .limit(limit) \
                .execute()

            audits = []
            if result.data:
                for record in result.data:
                    # Parse sources from JSON string
                    sources = json.loads(record["sources"]) if record.get("sources") else []

                    audits.append(AuditLogResponse(
                        id=record["id"],
                        user_id=record.get("user_id"),
                        prompt=record["prompt"],
                        response=record["response"],
                        sources=sources,
                        confidence_score=record["confidence_score"],
                        policy_flag=record["policy_flag"],
                        status=record["status"],
                        reviewer_id=record.get("reviewer_id"),
                        reviewed_at=record.get("reviewed_at"),
                        created_at=record["created_at"],
                        pinned=record.get("pinned", False),
                        custom_title=record.get("custom_title")
                    ))

            return audits
        except Exception as e:
            logger.error("Error listing audit logs", error=str(e))
            raise

    @classmethod
    async def get_analytics_stats(cls) -> AnalyticsStats:
        """
        Calculate analytics statistics from audit logs.
        
        Returns:
            AnalyticsStats object
        """
        try:
            supabase = get_supabase()
            
            # Fetch generic stats (simplified for MVP: get max 1000 latest)
            result = supabase.table("audit_logs") \
                .select("status, user_id, confidence_score") \
                .order("created_at", desc=True) \
                .limit(1000) \
                .execute()
                
            if not result.data:
                return AnalyticsStats(
                    total_conversations=0,
                    total_suggestions=0,
                    ai_acceptance_rate=0.0,
                    approved_count=0,
                    rejected_count=0
                )
            
            data = result.data
            total_suggestions = len(data)
            
            # Calculate counts
            approved = sum(1 for r in data if r.get("status") == "approved")
            rejected = sum(1 for r in data if r.get("status") == "rejected")
            
            # Simple assumption: 1 log = 1 conversation / suggestion for now
            # In a real app, you might group by conversation_id
            
            # AI Acceptance: (Approved + Pending) / Total (Simplified)
            # OR just Approved / (Approved + Rejected) if we care about reviewed ones
            base_for_rate = (approved + rejected)
            acceptance_rate = (approved / base_for_rate * 100) if base_for_rate > 0 else 100.0
            
            return AnalyticsStats(
                total_conversations=total_suggestions, # 1:1 for this MVP
                total_suggestions=total_suggestions,
                ai_acceptance_rate=round(acceptance_rate, 1),
                approved_count=approved,
                rejected_count=rejected
            )
            
        except Exception as e:
            logger.error("Error calculating analytics stats", error=str(e))
            # Return empty stats on error to avoid breaking UI
            return AnalyticsStats(
                total_conversations=0,
                total_suggestions=0,
                ai_acceptance_rate=0.0,
                approved_count=0,
                rejected_count=0
            )

# Convenience functions
async def create_audit_log(**kwargs) -> str:
    """Create audit log entry."""
    return await AuditService.create_audit_log(**kwargs)


async def get_audit_log(audit_id: str) -> Optional[AuditLogResponse]:
    """Get audit log by ID."""
    return await AuditService.get_audit_log(audit_id)


async def update_review_status(audit_id: str, decision: str, reviewer_id: str) -> bool:
    """Update review status."""
    return await AuditService.update_review_status(audit_id, decision, reviewer_id)


async def list_audit_logs(limit: int = 20) -> List[AuditLogResponse]:
    """List recent audit logs."""
    return await AuditService.list_audit_logs(limit)


async def get_analytics_stats() -> AnalyticsStats:
    """Get analytics statistics."""
    return await AuditService.get_analytics_stats()

