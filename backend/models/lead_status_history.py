"""
Lead Status History model for tracking status changes
"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from core.database import Base


class LeadStatusHistory(Base):
    """Track lead status changes with timestamps and user info"""
    __tablename__ = "lead_status_history"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False)
    old_status = Column(String(50), nullable=True)
    new_status = Column(String(50), nullable=False)
    changed_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    change_reason = Column(Text, nullable=True)
    changed_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    
    # Additional context for specific status changes
    interest_level = Column(Integer, nullable=True)  # For interested status changes
    drop_reason = Column(String(255), nullable=True)  # For drop status changes
    cnp_reason = Column(String(255), nullable=True)  # For CNP status changes
    conversion_notes = Column(Text, nullable=True)  # For conversion status changes
    
    # Relationships
    lead = relationship("Lead", back_populates="status_history")
    user = relationship("User", foreign_keys=[changed_by])
    
    def __repr__(self):
        return f"<LeadStatusHistory(id={self.id}, lead_id={self.lead_id}, {self.old_status} -> {self.new_status})>"
