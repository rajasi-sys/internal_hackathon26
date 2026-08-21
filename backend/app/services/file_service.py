import os
import shutil
from fastapi import UploadFile, HTTPException, status

UPLOAD_DIR = "uploads"

def save_uploaded_file(file: UploadFile) -> str:
    """Validates extensions and saves utility bill file to disk."""
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    allowed_extensions = ["jpg", "jpeg", "png", "pdf"]
    
    file_ext = file.filename.split(".")[-1].lower() if "." in file.filename else ""
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file format. Only JPG, PNG, or PDF allowed."
        )

    saved_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(saved_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return saved_path