"""
Lead Lifecycle Service for Stage 6
"""
from sqlalchemy.orm import Session
from sqlalchemy import and_
from models.lead import Lead, LeadStatus
from models.lead_status_history import LeadStatusHistory
from schemas.lead_lifecycle import StatusHistoryResponse
from typing import List, Optional
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class LeadLifecycleService:
    def __init__(self, db: Session):
        self.db = db

    async def update_status(
        self, 
        lead_id: int, 
        new_status: str, 
        changed_by: int, 
        reason: Optional[str] = None
    ) -> dict:
        """Update lead status with history tracking"""
        try:
            # Get the lead
            lead = self.db.query(Lead).filter(Lead.id == lead_id).first()
            if not lead:
                raise ValueError("Lead not found")
            
            old_status = lead.status.value if lead.status else None
            
            # Update lead status
            lead.status = LeadStatus(new_status)
            lead.updated_at = datetime.utcnow()
            
            # Create status history record
            history = LeadStatusHistory(
                lead_id=lead_id,
                old_status=old_status,
                new_status=new_status,
                changed_by=changed_by,
                change_reason=reason,
                changed_at=datetime.utcnow()
            )
            
            self.db.add(history)
            self.db.commit()
            self.db.refresh(lead)
            
            logger.info(f"Lead {lead_id} status updated from {old_status} to {new_status} by user {changed_by}")
            
            return {
                "message": "Status updated successfully",
                "lead_id": lead_id,
                "old_status": old_status,
                "new_status": new_status,
                "updated_at": lead.updated_at
            }
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error updating lead status: {str(e)}")
            raise e

    async def update_interest_level(
        self, 
        lead_id: int, 
        interest_level: int, 
        changed_by: int
    ) -> dict:
        """Update lead interest level"""
        try:
            lead = self.db.query(Lead).filter(Lead.id == lead_id).first()
            if not lead:
                raise ValueError("Lead not found")
            
            old_interest = lead.interest_level
            lead.interest_level = interest_level
            lead.updated_at = datetime.utcnow()
            
            # Create history record
            history = LeadStatusHistory(
                lead_id=lead_id,
                old_status=lead.status.value if lead.status else None,
                new_status=lead.status.value if lead.status else None,
                changed_by=changed_by,
                interest_level=interest_level,
                change_reason=f"Interest level updated from {old_interest} to {interest_level}",
                changed_at=datetime.utcnow()
            )
            
            self.db.add(history)
            self.db.commit()
            self.db.refresh(lead)
            
            logger.info(f"Lead {lead_id} interest level updated to {interest_level} by user {changed_by}")
            
            return {
                "message": "Interest level updated successfully",
                "lead_id": lead_id,
                "interest_level": interest_level,
                "updated_at": lead.updated_at
            }
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error updating interest level: {str(e)}")
            raise e

    async def mark_as_cnp(
        self, 
        lead_id: int, 
        reason: Optional[str], 
        changed_by: int
    ) -> dict:
        """Mark lead as CNP with tracking"""
        try:
            lead = self.db.query(Lead).filter(Lead.id == lead_id).first()
            if not lead:
                raise ValueError("Lead not found")
            
            old_status = lead.status.value if lead.status else None
            
            # Update lead status and CNP tracking
            lead.status = LeadStatus.CNP
            lead.cnp_count = (lead.cnp_count or 0) + 1
            lead.last_cnp_at = datetime.utcnow()
            lead.updated_at = datetime.utcnow()
            
            # Create history record
            history = LeadStatusHistory(
                lead_id=lead_id,
                old_status=old_status,
                new_status="CNP",
                changed_by=changed_by,
                cnp_reason=reason,
                change_reason=f"Marked as CNP (attempt #{lead.cnp_count})",
                changed_at=datetime.utcnow()
            )
            
            self.db.add(history)
            self.db.commit()
            self.db.refresh(lead)
            
            logger.info(f"Lead {lead_id} marked as CNP (attempt #{lead.cnp_count}) by user {changed_by}")
            
            return {
                "message": "Lead marked as CNP successfully",
                "lead_id": lead_id,
                "cnp_count": lead.cnp_count,
                "last_cnp_at": lead.last_cnp_at,
                "updated_at": lead.updated_at
            }
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error marking lead as CNP: {str(e)}")
            raise e

    async def convert_lead(
        self, 
        lead_id: int, 
        product: str, 
        payment_amount: int, 
        notes: Optional[str], 
        changed_by: int
    ) -> dict:
        """Convert lead to customer (requires product and payment)"""
        try:
            lead = self.db.query(Lead).filter(Lead.id == lead_id).first()
            if not lead:
                raise ValueError("Lead not found")
            
            old_status = lead.status.value if lead.status else None
            
            # Update lead status and conversion details
            lead.status = LeadStatus.CONVERTED
            lead.product_purchased = product
            lead.payment_amount = payment_amount
            lead.converted_at = datetime.utcnow()
            lead.updated_at = datetime.utcnow()
            
            # Create history record
            history = LeadStatusHistory(
                lead_id=lead_id,
                old_status=old_status,
                new_status="Converted",
                changed_by=changed_by,
                conversion_notes=notes,
                change_reason=f"Converted to customer - Product: {product}, Amount: ₹{payment_amount}",
                changed_at=datetime.utcnow()
            )
            
            self.db.add(history)
            self.db.commit()
            self.db.refresh(lead)
            
            logger.info(f"Lead {lead_id} converted to customer by user {changed_by} - Product: {product}, Amount: ₹{payment_amount}")
            
            return {
                "message": "Lead converted successfully",
                "lead_id": lead_id,
                "product": product,
                "payment_amount": payment_amount,
                "converted_at": lead.converted_at,
                "updated_at": lead.updated_at
            }
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error converting lead: {str(e)}")
            raise e

    async def drop_lead(
        self, 
        lead_id: int, 
        reason: str, 
        notes: Optional[str], 
        changed_by: int
    ) -> dict:
        """Drop lead with reason (moves to dropped pool)"""
        try:
            lead = self.db.query(Lead).filter(Lead.id == lead_id).first()
            if not lead:
                raise ValueError("Lead not found")
            
            old_status = lead.status.value if lead.status else None
            
            # Update lead status and drop details
            lead.status = LeadStatus.DROPPED
            lead.drop_reason = reason
            lead.dropped_at = datetime.utcnow()
            lead.updated_at = datetime.utcnow()
            
            # Create history record
            history = LeadStatusHistory(
                lead_id=lead_id,
                old_status=old_status,
                new_status="Dropped",
                changed_by=changed_by,
                drop_reason=reason,
                change_reason=f"Dropped - Reason: {reason}",
                changed_at=datetime.utcnow()
            )
            
            self.db.add(history)
            self.db.commit()
            self.db.refresh(lead)
            
            logger.info(f"Lead {lead_id} dropped by user {changed_by} - Reason: {reason}")
            
            return {
                "message": "Lead dropped successfully",
                "lead_id": lead_id,
                "drop_reason": reason,
                "dropped_at": lead.dropped_at,
                "updated_at": lead.updated_at
            }
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error dropping lead: {str(e)}")
            raise e

    async def get_status_history(self, lead_id: int) -> List[StatusHistoryResponse]:
        """Get status change history for a lead"""
        try:
            history_records = self.db.query(LeadStatusHistory)\
                .filter(LeadStatusHistory.lead_id == lead_id)\
                .order_by(LeadStatusHistory.changed_at.desc())\
                .all()
            
            return [StatusHistoryResponse.from_orm(record) for record in history_records]
            
        except Exception as e:
            logger.error(f"Error getting status history: {str(e)}")
            raise e
