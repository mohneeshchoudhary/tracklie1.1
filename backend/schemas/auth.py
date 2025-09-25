"""
Authentication schemas for request/response validation
"""
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from models.user import UserRole


class LoginRequest(BaseModel):
    """Login request schema"""
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    """Login response schema"""
    access_token: str
    token_type: str = "bearer"
    expires_in: int  # seconds
    user: "UserResponse"


class UserResponse(BaseModel):
    """User response schema"""
    id: int
    email: str
    name: str
    role: UserRole
    is_active: bool
    created_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True


class TokenData(BaseModel):
    """Token data schema for JWT payload"""
    user_id: Optional[int] = None
    email: Optional[str] = None
    role: Optional[UserRole] = None


class ErrorResponse(BaseModel):
    """Error response schema"""
    detail: str
    error_code: Optional[str] = None


# Update forward references
LoginResponse.model_rebuild()
