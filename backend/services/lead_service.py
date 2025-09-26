"""
Lead service for business logic
"""
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, func
from models.lead import Lead, LeadStatus, LeadSource, LeadPriority
from models.user import User
from schemas.lead import LeadCreate, LeadUpdate
import logging

logger = logging.getLogger(__name__)


class LeadService:
    """Lead service for business logic operations"""

    def __init__(self, db: Session):
        self.db = db

    def create_lead(self, lead_data: LeadCreate, created_by: int) -> Lead:
        """Create a new lead"""
        try:
            # Check for duplicate by phone or email
            existing_lead = self.get_lead_by_phone_or_email(
                phone=lead_data.phone,
                email=lead_data.email
            )
            
            if existing_lead:
                logger.warning(f"Duplicate lead found: {existing_lead.id}")
                # For now, we'll still create the lead but log the duplicate
                # In future, we might want to merge or reject duplicates

            # Create new lead
            lead = Lead(
                **lead_data.dict(),
                created_by=created_by
            )
            
            self.db.add(lead)
            self.db.commit()
            self.db.refresh(lead)
            
            logger.info(f"Lead created successfully: {lead.id}")
            return lead
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error creating lead: {str(e)}")
            raise

    def get_lead(self, lead_id: int) -> Optional[Lead]:
        """Get a lead by ID"""
        return self.db.query(Lead).filter(Lead.id == lead_id).first()

    def get_leads(
        self,
        skip: int = 0,
        limit: int = 100,
        status: Optional[LeadStatus] = None,
        source: Optional[LeadSource] = None,
        priority: Optional[LeadPriority] = None,
        assigned_to: Optional[int] = None,
        search: Optional[str] = None,
        user_role: Optional[str] = None,
        user_id: Optional[int] = None
    ) -> tuple[List[Lead], int]:
        """Get leads with filtering and pagination"""
        
        query = self.db.query(Lead)
        
        # Apply role-based filtering
        if user_role == "SALESPERSON" and user_id:
            # Salesperson can only see their assigned leads
            query = query.filter(Lead.assigned_to == user_id)
        elif user_role == "RECOVERY_AGENT" and user_id:
            # Recovery agent can see leads assigned to them
            query = query.filter(Lead.assigned_to == user_id)
        # Admin and other roles can see all leads
        
        # Apply filters
        if status:
            query = query.filter(Lead.status == status)
        
        if source:
            query = query.filter(Lead.source == source)
        
        if priority:
            query = query.filter(Lead.priority == priority)
        
        if assigned_to:
            query = query.filter(Lead.assigned_to == assigned_to)
        
        if search:
            search_filter = or_(
                Lead.name.ilike(f"%{search}%"),
                Lead.email.ilike(f"%{search}%"),
                Lead.phone.ilike(f"%{search}%"),
                Lead.company.ilike(f"%{search}%")
            )
            query = query.filter(search_filter)
        
        # Get total count
        total = query.count()
        
        # Apply pagination and ordering
        leads = query.order_by(Lead.created_at.desc()).offset(skip).limit(limit).all()
        
        return leads, total

    def update_lead(self, lead_id: int, lead_data: LeadUpdate, updated_by: int) -> Optional[Lead]:
        """Update a lead"""
        try:
            lead = self.get_lead(lead_id)
            if not lead:
                return None
            
            # Update fields
            update_data = lead_data.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(lead, field, value)
            
            self.db.commit()
            self.db.refresh(lead)
            
            logger.info(f"Lead updated successfully: {lead.id}")
            return lead
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error updating lead: {str(e)}")
            raise

    def delete_lead(self, lead_id: int) -> bool:
        """Delete a lead (soft delete by changing status)"""
        try:
            lead = self.get_lead(lead_id)
            if not lead:
                return False
            
            # Soft delete by changing status to dropped
            lead.status = LeadStatus.DROPPED
            self.db.commit()
            
            logger.info(f"Lead soft deleted: {lead.id}")
            return True
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error deleting lead: {str(e)}")
            raise

    def get_lead_by_phone_or_email(self, phone: str, email: Optional[str] = None) -> Optional[Lead]:
        """Check for duplicate leads by phone or email"""
        query = self.db.query(Lead).filter(Lead.phone == phone)
        
        if email:
            query = query.filter(or_(Lead.phone == phone, Lead.email == email))
        
        return query.first()

    def get_lead_stats(self, user_role: Optional[str] = None, user_id: Optional[int] = None) -> Dict[str, Any]:
        """Get lead statistics"""
        query = self.db.query(Lead)
        
        # Apply role-based filtering
        if user_role == "SALESPERSON" and user_id:
            query = query.filter(Lead.assigned_to == user_id)
        elif user_role == "RECOVERY_AGENT" and user_id:
            query = query.filter(Lead.assigned_to == user_id)
        
        # Get counts by status
        status_counts = {}
        for status in LeadStatus:
            count = query.filter(Lead.status == status).count()
            status_counts[status.value] = count
        
        # Get counts by source
        source_counts = {}
        for source in LeadSource:
            count = query.filter(Lead.source == source).count()
            source_counts[source.value] = count
        
        # Get counts by priority
        priority_counts = {}
        for priority in LeadPriority:
            count = query.filter(Lead.priority == priority).count()
            priority_counts[priority.value] = count
        
        return {
            "total_leads": query.count(),
            "status_counts": status_counts,
            "source_counts": source_counts,
            "priority_counts": priority_counts
        }

    def assign_lead(self, lead_id: int, assigned_to: int, assigned_by: int) -> Optional[Lead]:
        """Assign a lead to a user"""
        try:
            lead = self.get_lead(lead_id)
            if not lead:
                return None
            
            # Verify the assignee exists
            assignee = self.db.query(User).filter(User.id == assigned_to).first()
            if not assignee:
                raise ValueError("Assignee not found")
            
            lead.assigned_to = assigned_to
            self.db.commit()
            self.db.refresh(lead)
            
            logger.info(f"Lead {lead_id} assigned to user {assigned_to}")
            return lead
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error assigning lead: {str(e)}")
            raise
