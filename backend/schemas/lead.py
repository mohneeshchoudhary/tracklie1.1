"""
Lead schemas for API validation
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, validator
from models.lead import LeadStatus, LeadSource, LeadPriority


class LeadBase(BaseModel):
    """Base lead schema"""
    name: str
    email: Optional[EmailStr] = None
    phone: str
    company: Optional[str] = None
    job_title: Optional[str] = None
    industry: Optional[str] = None
    website: Optional[str] = None
    budget: Optional[int] = None
    language: Optional[str] = "English"
    status: LeadStatus = LeadStatus.NEW
    source: Optional[LeadSource] = None
    priority: LeadPriority = LeadPriority.MEDIUM
    notes: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = "India"
    assigned_to: Optional[int] = None

    @validator('phone')
    def validate_phone(cls, v):
        """Validate phone number format"""
        if not v:
            raise ValueError('Phone number is required')
        # Remove all non-digit characters
        digits_only = ''.join(filter(str.isdigit, v))
        if len(digits_only) < 10:
            raise ValueError('Phone number must be at least 10 digits')
        return v

    @validator('budget')
    def validate_budget(cls, v):
        """Validate budget is positive"""
        if v is not None and v < 0:
            raise ValueError('Budget must be positive')
        return v


class LeadCreate(LeadBase):
    """Schema for creating a new lead"""
    pass


class LeadUpdate(BaseModel):
    """Schema for updating a lead"""
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    industry: Optional[str] = None
    website: Optional[str] = None
    budget: Optional[int] = None
    language: Optional[str] = None
    status: Optional[LeadStatus] = None
    source: Optional[LeadSource] = None
    priority: Optional[LeadPriority] = None
    notes: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = None
    assigned_to: Optional[int] = None

    @validator('phone')
    def validate_phone(cls, v):
        """Validate phone number format"""
        if v is not None:
            digits_only = ''.join(filter(str.isdigit, v))
            if len(digits_only) < 10:
                raise ValueError('Phone number must be at least 10 digits')
        return v

    @validator('budget')
    def validate_budget(cls, v):
        """Validate budget is positive"""
        if v is not None and v < 0:
            raise ValueError('Budget must be positive')
        return v


class LeadResponse(LeadBase):
    """Schema for lead response"""
    id: int
    created_at: datetime
    updated_at: datetime
    created_by: Optional[int] = None
    creator_name: Optional[str] = None
    assignee_name: Optional[str] = None

    class Config:
        from_attributes = True


class LeadListResponse(BaseModel):
    """Schema for lead list response with pagination"""
    leads: List[LeadResponse]
    total: int
    page: int
    per_page: int
    total_pages: int


class WebhookLeadCreate(BaseModel):
    """Schema for webhook lead creation"""
    name: str
    email: Optional[EmailStr] = None
    phone: str
    company: Optional[str] = None
    source: Optional[str] = "webhook"
    notes: Optional[str] = None
    budget: Optional[int] = None
    language: Optional[str] = "English"

    @validator('phone')
    def validate_phone(cls, v):
        """Validate phone number format"""
        if not v:
            raise ValueError('Phone number is required')
        digits_only = ''.join(filter(str.isdigit, v))
        if len(digits_only) < 10:
            raise ValueError('Phone number must be at least 10 digits')
        return v


class LeadStatsResponse(BaseModel):
    """Schema for lead statistics"""
    total_leads: int
    new_leads: int
    in_progress_leads: int
    interested_leads: int
    converted_leads: int
    dropped_leads: int
    leads_by_source: dict
    leads_by_priority: dict
