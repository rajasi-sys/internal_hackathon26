from fastapi import APIRouter, UploadFile, File, status
from app.schemas.user_schema import UserProfileSchema, ProfileResponseSchema
from app.services.file_service import save_uploaded_file

router = APIRouter(prefix="/api/v1/user", tags=["User & Profile"])

@router.post("/profile", response_model=ProfileResponseSchema)
def update_profile(profile: UserProfileSchema):
    return {
        "status": "success",
        "message": "Background check profile updated successfully.",
        "data": profile
    }

@router.post("/upload-bill", status_code=status.HTTP_201_CREATED)
async def upload_bill(file: UploadFile = File(...)):
    saved_path = save_uploaded_file(file)
    return {
        "status": "success",
        "message": "Bill uploaded successfully.",
        "filename": file.filename,
        "file_path": saved_path
    }