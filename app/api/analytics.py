"""
Analytics API endpoint - Retrieve aggregated platform statistics.
GET /analytics/stats - Get analytics data.
"""

from fastapi import APIRouter, HTTPException
from app.schemas import AnalyticsStats
from app.services.audit_service import get_analytics_stats
import structlog

logger = structlog.get_logger()
router = APIRouter()


@router.get("/analytics/stats", response_model=AnalyticsStats)
async def get_stats():
    """
    Retrieve aggregated analytics statistics.
    
    Returns:
        AnalyticsStats: {
            "total_conversations": int,
            "total_suggestions": int,
            "ai_acceptance_rate": float,
            "approved_count": int,
            "rejected_count": int
        }
    """
    try:
        logger.info("Retrieving analytics stats")
        stats = await get_analytics_stats()
        return stats
    except Exception as e:
        logger.error("Error retrieving analytics stats", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to retrieve analytics stats")
