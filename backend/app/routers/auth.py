from fastapi import APIRouter, status, HTTPException
from app.schemas.user_schema import UserRegisterSchema, UserLoginSchema, AuthResponseSchema

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=AuthResponseSchema)
def register_user(user_data: UserRegisterSchema):
    return {
        "status": "success",
        "message": "User registered successfully.",
        "user": {"email": user_data.email, "name": user_data.name},
        "token": "mock-jwt-token-xyz789"
    }

@router.post("/login", response_model=AuthResponseSchema)
def login_user(credentials: UserLoginSchema):
    return {
        "status": "success",
        "message": "Login successful.",
        "user": {"email": credentials.email, "name": "Eco User"},
        "token": "mock-jwt-token-xyz789"
    }