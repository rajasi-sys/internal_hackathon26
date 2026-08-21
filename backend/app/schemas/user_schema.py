from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any

# Authentication Schemas
class UserRegisterSchema(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str

class AuthResponseSchema(BaseModel):
    status: str
    message: str
    user: Dict[str, Any]
    token: Optional[str] = "mock-jwt-token-12345"

# Demographic Profile Schemas
class UserProfileSchema(BaseModel):
    age: int
    city: str
    gender: str
    household_size: int
    primary_transport: str

class ProfileResponseSchema(BaseModel):
    status: str
    message: str
    data: UserProfileSchema