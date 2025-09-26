"""
Lead API endpoints
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from core.database import get_db
from core.auth import get_current_active_user
from models.user import User
from models.lead import Lead, LeadStatus, LeadSource, LeadPriority
from schemas.lead import (
    LeadCreate, 
    LeadUpdate, 
    LeadResponse, 
    LeadListResponse,
    WebhookLeadCreate,
    LeadStatsResponse
)
from services.lead_service import LeadService
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/leads", tags=["leads"])


@router.post("/", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
async def create_lead(
    lead_data: LeadCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new lead"""
    try:
        lead_service = LeadService(db)
        lead = lead_service.create_lead(lead_data, current_user.id)
        
        # Add creator and assignee names for response
        response_data = LeadResponse.from_orm(lead)
        if lead.creator:
            response_data.creator_name = lead.creator.name
        if lead.assignee:
            response_data.assignee_name = lead.assignee.name
        
        return response_data
        
    except Exception as e:
        logger.error(f"Error creating lead: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create lead"
        )


@router.get("/", response_model=LeadListResponse)
async def get_leads(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(10, ge=1, le=100, description="Items per page"),
    status: Optional[LeadStatus] = Query(None, description="Filter by status"),
    source: Optional[LeadSource] = Query(None, description="Filter by source"),
    priority: Optional[LeadPriority] = Query(None, description="Filter by priority"),
    assigned_to: Optional[int] = Query(None, description="Filter by assigned user"),
    search: Optional[str] = Query(None, description="Search in name, email, phone, company"),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get leads with filtering and pagination"""
    try:
        lead_service = LeadService(db)
        
        # Calculate skip
        skip = (page - 1) * per_page
        
        # Get leads
        leads, total = lead_service.get_leads(
            skip=skip,
            limit=per_page,
            status=status,
            source=source,
            priority=priority,
            assigned_to=assigned_to,
            search=search,
            user_role=current_user.role.value,
            user_id=current_user.id
        )
        
        # Convert to response format
        lead_responses = []
        for lead in leads:
            response_data = LeadResponse.from_orm(lead)
            if lead.creator:
                response_data.creator_name = lead.creator.name
            if lead.assignee:
                response_data.assignee_name = lead.assignee.name
            lead_responses.append(response_data)
        
        # Calculate total pages
        total_pages = (total + per_page - 1) // per_page
        
        return LeadListResponse(
            leads=lead_responses,
            total=total,
            page=page,
            per_page=per_page,
            total_pages=total_pages
        )
        
    except Exception as e:
        logger.error(f"Error getting leads: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve leads"
        )


@router.get("/{lead_id}", response_model=LeadResponse)
async def get_lead(
    lead_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific lead by ID"""
    try:
        lead_service = LeadService(db)
        lead = lead_service.get_lead(lead_id)
        
        if not lead:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lead not found"
            )
        
        # Check permissions
        if (current_user.role.value == "SALESPERSON" and 
            lead.assigned_to != current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        # Add creator and assignee names for response
        response_data = LeadResponse.from_orm(lead)
        if lead.creator:
            response_data.creator_name = lead.creator.name
        if lead.assignee:
            response_data.assignee_name = lead.assignee.name
        
        return response_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting lead: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve lead"
        )


@router.put("/{lead_id}", response_model=LeadResponse)
async def update_lead(
    lead_id: int,
    lead_data: LeadUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update a lead"""
    try:
        lead_service = LeadService(db)
        
        # Check if lead exists
        existing_lead = lead_service.get_lead(lead_id)
        if not existing_lead:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lead not found"
            )
        
        # Check permissions
        if (current_user.role.value == "SALESPERSON" and 
            existing_lead.assigned_to != current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        # Update lead
        lead = lead_service.update_lead(lead_id, lead_data, current_user.id)
        
        # Add creator and assignee names for response
        response_data = LeadResponse.from_orm(lead)
        if lead.creator:
            response_data.creator_name = lead.creator.name
        if lead.assignee:
            response_data.assignee_name = lead.assignee.name
        
        return response_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating lead: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update lead"
        )


@router.delete("/{lead_id}")
async def delete_lead(
    lead_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a lead (soft delete)"""
    try:
        lead_service = LeadService(db)
        
        # Check if lead exists
        existing_lead = lead_service.get_lead(lead_id)
        if not existing_lead:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lead not found"
            )
        
        # Check permissions (only admin can delete)
        if current_user.role.value not in ["ADMIN", "SUPER_ADMIN"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        # Delete lead
        success = lead_service.delete_lead(lead_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete lead"
            )
        
        return {"message": "Lead deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting lead: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete lead"
        )


@router.get("/stats/overview", response_model=LeadStatsResponse)
async def get_lead_stats(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get lead statistics"""
    try:
        lead_service = LeadService(db)
        stats = lead_service.get_lead_stats(
            user_role=current_user.role.value,
            user_id=current_user.id
        )
        
        return LeadStatsResponse(
            total_leads=stats["total_leads"],
            new_leads=stats["status_counts"].get("new", 0),
            in_progress_leads=stats["status_counts"].get("in_progress", 0),
            interested_leads=stats["status_counts"].get("interested", 0),
            converted_leads=stats["status_counts"].get("converted", 0),
            dropped_leads=stats["status_counts"].get("dropped", 0),
            leads_by_source=stats["source_counts"],
            leads_by_priority=stats["priority_counts"]
        )
        
    except Exception as e:
        logger.error(f"Error getting lead stats: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve lead statistics"
        )


@router.post("/webhook/", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
async def create_lead_webhook(
    lead_data: WebhookLeadCreate,
    key: str = Query(..., description="Webhook authentication key"),
    db: Session = Depends(get_db)
):
    """Create a lead via webhook (external API)"""
    try:
        # Simple webhook authentication (in production, use proper API keys)
        if key != "webhook_key_123":  # This should be in environment variables
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid webhook key"
            )
        
        # Convert webhook data to LeadCreate format
        lead_create_data = LeadCreate(
            name=lead_data.name,
            email=lead_data.email,
            phone=lead_data.phone,
            company=lead_data.company,
            source=LeadSource(lead_data.source) if lead_data.source else LeadSource.OTHER,
            notes=lead_data.notes,
            budget=lead_data.budget,
            language=lead_data.language
        )
        
        lead_service = LeadService(db)
        lead = lead_service.create_lead(lead_create_data, created_by=None)  # No user for webhook
        
        # Add creator and assignee names for response
        response_data = LeadResponse.from_orm(lead)
        if lead.creator:
            response_data.creator_name = lead.creator.name
        if lead.assignee:
            response_data.assignee_name = lead.assignee.name
        
        return response_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating lead via webhook: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create lead via webhook"
        )
