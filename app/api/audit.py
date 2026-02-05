from typing import List
from fastapi import APIRouter, HTTPException, Query
from app.schemas import AuditLogResponse, PinRequest, RenameRequest
from app.services.audit_service import get_audit_log, list_audit_logs, AuditService
import structlog

logger = structlog.get_logger()
router = APIRouter()


@router.get("/audit", response_model=List[AuditLogResponse])
async def list_audits(limit: int = Query(20, ge=1, le=100)):
    """
    List recent audit logs.
    
    Returns a list of recent AI interactions for the sidebar history.
    """
    try:
        return await list_audit_logs(limit)
    except Exception as e:
        logger.error("Error listing audit logs", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to list audit logs")


@router.get("/audit/{audit_id}", response_model=AuditLogResponse)
async def get_audit(audit_id: str):
    """
    Retrieve an audit log by ID.
    
    Returns complete audit information including:
    - Original prompt and response
    - Source documents used for generation
    - Confidence score
    - Policy violation flags
    - Review status and reviewer information
    
    This provides full explainability and traceability for governance.
    """
    try:
        logger.info("Retrieving audit log", audit_id=audit_id)
        
        audit_log = await get_audit_log(audit_id)
        
        if audit_log is None:
            logger.warning("Audit log not found", audit_id=audit_id)
            raise HTTPException(status_code=404, detail=f"Audit log {audit_id} not found")
        
        logger.info("Audit log retrieved successfully", audit_id=audit_id)
        return audit_log
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error retrieving audit log", audit_id=audit_id, error=str(e))
        raise HTTPException(status_code=500, detail=f"Error retrieving audit log: {str(e)}")


@router.patch("/audit/{audit_id}/pin")
async def pin_audit(audit_id: str, request: PinRequest):
    """
    Pin or unpin an audit log.
    
    Pinned chats will appear at the top of the sidebar list.
    """
    try:
        logger.info("Updating pin status", audit_id=audit_id, pinned=request.pinned)
        
        success = await AuditService.pin_audit_log(audit_id, request.pinned)
        
        if not success:
            raise HTTPException(status_code=404, detail=f"Audit log {audit_id} not found")
        
        return {"message": "Pin status updated successfully", "audit_id": audit_id, "pinned": request.pinned}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error updating pin status", audit_id=audit_id, error=str(e))
        raise HTTPException(status_code=500, detail=f"Error updating pin status: {str(e)}")


@router.patch("/audit/{audit_id}/rename")
async def rename_audit(audit_id: str, request: RenameRequest):
    """
    Rename an audit log with a custom title.
    
    The custom title will be displayed in the sidebar instead of the original prompt.
    """
    try:
        logger.info("Renaming audit log", audit_id=audit_id, custom_title=request.custom_title)
        
        success = await AuditService.rename_audit_log(audit_id, request.custom_title)
        
        if not success:
            raise HTTPException(status_code=404, detail=f"Audit log {audit_id} not found")
        
        return {"message": "Audit log renamed successfully", "audit_id": audit_id, "custom_title": request.custom_title}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error renaming audit log", audit_id=audit_id, error=str(e))
        raise HTTPException(status_code=500, detail=f"Error renaming audit log: {str(e)}")


@router.delete("/audit/{audit_id}")
async def delete_audit(audit_id: str):
    """
    Delete an audit log.
    
    WARNING: This permanently removes the audit log from the database.
    This action cannot be undone.
    """
    try:
        logger.info("Deleting audit log", audit_id=audit_id)
        
        success = await AuditService.delete_audit_log(audit_id)
        
        if not success:
            raise HTTPException(status_code=404, detail=f"Audit log {audit_id} not found")
        
        return {"message": "Audit log deleted successfully", "audit_id": audit_id}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error deleting audit log", audit_id=audit_id, error=str(e))
        raise HTTPException(status_code=500, detail=f"Error deleting audit log: {str(e)}")

