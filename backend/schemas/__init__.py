# Schemas package
from .auth import LoginRequest, LoginResponse, UserResponse, ErrorResponse
from .lead import (
    LeadBase, LeadCreate, LeadUpdate, LeadResponse, LeadListResponse,
    WebhookLeadCreate, LeadStatsResponse
)
from .lead_lifecycle import (
    StatusUpdateRequest, InterestUpdateRequest, CNPRequest, ConvertRequest,
    DropRequest, StatusHistoryResponse, LeadLifecycleResponse
)

__all__ = [
    "LoginRequest", "LoginResponse", "UserResponse", "ErrorResponse",
    "LeadBase", "LeadCreate", "LeadUpdate", "LeadResponse", "LeadListResponse",
    "WebhookLeadCreate", "LeadStatsResponse",
    "StatusUpdateRequest", "InterestUpdateRequest", "CNPRequest", "ConvertRequest",
    "DropRequest", "StatusHistoryResponse", "LeadLifecycleResponse"
]
