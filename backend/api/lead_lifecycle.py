"""
Lead Lifecycle API endpoints for Stage 6
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from core.database import get_db
from core.auth import get_current_active_user
from models.user import User
from models.lead import Lead, LeadStatus
from models.lead_status_history import LeadStatusHistory
from schemas.lead_lifecycle import (
    StatusUpdateRequest, 
    InterestUpdateRequest, 
    ConvertRequest, 
    DropRequest, 
    CNPRequest,
    StatusHistoryResponse
)
from services.lead_lifecycle_service import LeadLifecycleService
from datetime import datetime

router = APIRouter(prefix="/leads", tags=["lead-lifecycle"])

# Drop reasons for analytics
DROP_REASONS = [
    "Financial - Budget constraints",
    "Not Interested - No need for service",
    "Joined Competitor - Using competitor service",
    "Timing - Not ready now, maybe later",
    "Technical - Technical issues",
    "Communication - Poor communication",
    "Price - Too expensive",
    "Quality - Service quality concerns",
    "Location - Geographic constraints",
    "Other - Other reasons"
]

@router.patch("/{lead_id}/status", status_code=status.HTTP_200_OK)
async def update_lead_status(
    lead_id: int,
    request: StatusUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update lead status with history tracking"""
    try:
        service = LeadLifecycleService(db)
        result = await service.update_status(
            lead_id=lead_id,
            new_status=request.status,
            changed_by=current_user.id,
            reason=request.reason
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.patch("/{lead_id}/interest", status_code=status.HTTP_200_OK)
async def update_interest_level(
    lead_id: int,
    request: InterestUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update lead interest level (0-5)"""
    try:
        service = LeadLifecycleService(db)
        result = await service.update_interest_level(
            lead_id=lead_id,
            interest_level=request.interest_level,
            changed_by=current_user.id
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/{lead_id}/cnp", status_code=status.HTTP_200_OK)
async def mark_as_cnp(
    lead_id: int,
    request: CNPRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Mark lead as CNP (Could Not Pick) with tracking"""
    try:
        service = LeadLifecycleService(db)
        result = await service.mark_as_cnp(
            lead_id=lead_id,
            reason=request.reason,
            changed_by=current_user.id
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/{lead_id}/convert", status_code=status.HTTP_200_OK)
async def convert_lead(
    lead_id: int,
    request: ConvertRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Convert lead to customer (requires product and payment)"""
    try:
        service = LeadLifecycleService(db)
        result = await service.convert_lead(
            lead_id=lead_id,
            product=request.product,
            payment_amount=request.payment_amount,
            notes=request.notes,
            changed_by=current_user.id
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/{lead_id}/drop", status_code=status.HTTP_200_OK)
async def drop_lead(
    lead_id: int,
    request: DropRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Drop lead with reason (moves to dropped pool)"""
    try:
        service = LeadLifecycleService(db)
        result = await service.drop_lead(
            lead_id=lead_id,
            reason=request.reason,
            notes=request.notes,
            changed_by=current_user.id
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/{lead_id}/status-history", response_model=list[StatusHistoryResponse])
async def get_status_history(
    lead_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get status change history for a lead"""
    try:
        service = LeadLifecycleService(db)
        history = await service.get_status_history(lead_id)
        return history
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/drop-reasons")
async def get_drop_reasons():
    """Get predefined drop reasons for dropdown"""
    return {"reasons": DROP_REASONS}
