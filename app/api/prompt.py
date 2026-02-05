"""
Prompt API endpoint - Handles user prompts and RAG pipeline execution.
POST /prompt - Submit a prompt and get AI-generated response with governance metadata.
"""

from fastapi import APIRouter, HTTPException
from app.schemas import PromptRequest, PromptResponse
from app.services.rag_service import get_rag_service
from app.services.policy_service import check_policy
from app.services.audit_service import create_audit_log
import structlog

logger = structlog.get_logger()
router = APIRouter()


@router.post("/prompt", response_model=PromptResponse)
async def submit_prompt(request: PromptRequest):
    """
    Submit a prompt to the RAG system.
    
    This endpoint:
    1. Executes the RAG pipeline to generate a response
    2. Checks for policy violations
    3. Creates an audit log entry
    4. Returns the response with governance metadata
    
    The response status is set to 'pending' and requires human review.
    """
    try:
        logger.info("Received prompt request", user_id=request.user_id, prompt_length=len(request.prompt))
        
        # Step 1: Execute RAG pipeline
        rag_service = get_rag_service()
        answer, sources, confidence_score = await rag_service.generate_response(request.prompt, request.language)
        
        # Step 2: Check policy violations
        policy_flag, violations = check_policy(request.prompt, answer)
        
        # Step 3: Prepare sources for audit log
        sources_dict = [
            {
                "content": src.content,
                "metadata": src.metadata,
                "similarity_score": src.similarity_score
            }
            for src in sources
        ]
        
        # Step 4: Create audit log
        audit_id = await create_audit_log(
            user_id=request.user_id,
            prompt=request.prompt,
            response=answer,
            sources=sources_dict,
            confidence_score=confidence_score,
            policy_flag=policy_flag
        )
        
        logger.info(
            "Prompt processed successfully",
            audit_id=audit_id,
            confidence_score=confidence_score,
            policy_flag=policy_flag,
            num_violations=len(violations)
        )
        
        # Step 5: Return response
        return PromptResponse(
            audit_id=audit_id,
            answer=answer,
            sources=sources,
            confidence_score=confidence_score,
            policy_flag=policy_flag,
            policy_violations=violations,
            status="pending"
        )
        
    except Exception as e:
        logger.error("Error processing prompt", error=str(e))
        raise HTTPException(status_code=500, detail=f"Error processing prompt: {str(e)}")
