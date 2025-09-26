"""
Lead model for SQLAlchemy
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from core.database import Base
import enum


class LeadStatus(str, enum.Enum):
    """Lead status enumeration"""
    NEW = "new"
    IN_PROGRESS = "in_progress"
    INTERESTED = "interested"
    CONVERTED = "converted"
    DROPPED = "dropped"


class LeadSource(str, enum.Enum):
    """Lead source enumeration"""
    WEBSITE = "website"
    FACEBOOK = "facebook"
    GOOGLE = "google"
    REFERRAL = "referral"
    COLD_CALL = "cold_call"
    EMAIL_CAMPAIGN = "email_campaign"
    TRADE_SHOW = "trade_show"
    OTHER = "other"


class LeadPriority(str, enum.Enum):
    """Lead priority enumeration"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Lead(Base):
    """Lead model"""
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    
    # Basic Information
    name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), nullable=True, index=True)
    phone = Column(String(20), nullable=False, index=True)
    company = Column(String(255), nullable=True)
    
    # Lead Details
    job_title = Column(String(255), nullable=True)
    industry = Column(String(255), nullable=True)
    website = Column(String(500), nullable=True)
    budget = Column(Integer, nullable=True)  # In INR
    language = Column(String(50), nullable=True, default="English")
    
    # Status and Source
    status = Column(Enum(LeadStatus), default=LeadStatus.NEW, nullable=False)
    source = Column(Enum(LeadSource), nullable=True)
    priority = Column(Enum(LeadPriority), default=LeadPriority.MEDIUM, nullable=False)
    
    # Additional Information
    notes = Column(Text, nullable=True)
    address = Column(Text, nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    zip_code = Column(String(20), nullable=True)
    country = Column(String(100), nullable=True, default="India")
    
    # Audit fields
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Relationships
    creator = relationship("User", foreign_keys=[created_by], back_populates="created_leads")
    assignee = relationship("User", foreign_keys=[assigned_to], back_populates="assigned_leads")
    
    def __repr__(self):
        return f"<Lead(id={self.id}, name='{self.name}', phone='{self.phone}', status='{self.status}')>"
