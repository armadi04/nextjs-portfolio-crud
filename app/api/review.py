"""
Review API endpoint - Human-in-the-loop review workflow.
POST /review/{id} - Approve or reject AI-generated responses.
"""

from fastapi import APIRouter, HTTPException
from app.schemas import ReviewRequest
from app.services.audit_service import update_review_status, get_audit_log
import structlog

logger = structlog.get_logger()
router = APIRouter()


@router.post("/review/{audit_id}")
async def review_response(audit_id: str, request: ReviewRequest):
    """
    Submit a human review decision for an AI-generated response.
    
    This implements the human-in-the-loop workflow:
    - Reviewers can approve or reject responses
    - Decision is recorded in the audit log
    - Reviewer ID and timestamp are tracked for accountability
    
    Args:
        audit_id: UUID of the audit log to review
        request: Review decision (approved/rejected) and reviewer info
        
    Returns:
        Updated audit log with review status
    """
    try:
        logger.info(
            "Received review request",
            audit_id=audit_id,
            decision=request.decision,
            reviewer_id=request.reviewer_id
        )
        
        # Verify audit log exists
        audit_log = await get_audit_log(audit_id)
        if audit_log is None:
            logger.warning("Audit log not found for review", audit_id=audit_id)
            raise HTTPException(status_code=404, detail=f"Audit log {audit_id} not found")
        
        # Check if already reviewed
        if audit_log.status != "pending":
            logger.warning(
                "Audit log already reviewed",
                audit_id=audit_id,
                current_status=audit_log.status
            )
            raise HTTPException(
                status_code=400,
                detail=f"Audit log already reviewed with status: {audit_log.status}"
            )
        
        # Update review status
        success = await update_review_status(
            audit_id=audit_id,
            decision=request.decision,
            reviewer_id=request.reviewer_id
        )
        
        if not success:
            raise HTTPException(status_code=500, detail="Failed to update review status")
        
        # Retrieve updated audit log
        updated_log = await get_audit_log(audit_id)
        
        logger.info(
            "Review completed successfully",
            audit_id=audit_id,
            decision=request.decision,
            reviewer_id=request.reviewer_id
        )
        
        return {
            "message": "Review submitted successfully",
            "audit_id": audit_id,
            "decision": request.decision,
            "reviewer_id": request.reviewer_id,
            "audit_log": updated_log
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error processing review", audit_id=audit_id, error=str(e))
        raise HTTPException(status_code=500, detail=f"Error processing review: {str(e)}")
