"""
Pydantic schemas for Lead Lifecycle (Stage 6)
"""
from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime


class StatusUpdateRequest(BaseModel):
    status: str = Field(..., description="New status for the lead")
    reason: Optional[str] = Field(None, description="Reason for status change")
    
    @validator('status')
    def validate_status(cls, v):
        valid_statuses = [
            "New", "In Progress", "CNP", "Interested-1", "Interested-2", 
            "Interested-3", "Interested-4", "Interested-5", "Qualified", 
            "Converted", "Lost", "Dropped"
        ]
        if v not in valid_statuses:
            raise ValueError(f"Status must be one of: {', '.join(valid_statuses)}")
        return v


class InterestUpdateRequest(BaseModel):
    interest_level: int = Field(..., ge=0, le=5, description="Interest level from 0 to 5")
    
    @validator('interest_level')
    def validate_interest_level(cls, v):
        if not 0 <= v <= 5:
            raise ValueError("Interest level must be between 0 and 5")
        return v


class CNPRequest(BaseModel):
    reason: Optional[str] = Field(None, description="Reason for marking as CNP")


class ConvertRequest(BaseModel):
    product: str = Field(..., description="Product or service purchased")
    payment_amount: int = Field(..., ge=0, description="Payment amount in INR")
    notes: Optional[str] = Field(None, description="Additional conversion notes")
    
    @validator('product')
    def validate_product(cls, v):
        if not v.strip():
            raise ValueError("Product name cannot be empty")
        return v.strip()


class DropRequest(BaseModel):
    reason: str = Field(..., description="Reason for dropping the lead")
    notes: Optional[str] = Field(None, description="Additional drop notes")
    
    @validator('reason')
    def validate_reason(cls, v):
        if not v.strip():
            raise ValueError("Drop reason cannot be empty")
        return v.strip()


class StatusHistoryResponse(BaseModel):
    id: int
    lead_id: int
    old_status: Optional[str]
    new_status: str
    changed_by: int
    change_reason: Optional[str]
    changed_at: datetime
    interest_level: Optional[int]
    drop_reason: Optional[str]
    cnp_reason: Optional[str]
    conversion_notes: Optional[str]
    
    class Config:
        from_attributes = True


class LeadLifecycleResponse(BaseModel):
    id: int
    name: str
    status: str
    interest_level: Optional[int]
    cnp_count: Optional[int]
    last_cnp_at: Optional[datetime]
    drop_reason: Optional[str]
    dropped_at: Optional[datetime]
    converted_at: Optional[datetime]
    product_purchased: Optional[str]
    payment_amount: Optional[int]
    updated_at: datetime
    
    class Config:
        from_attributes = True
