import os

class Settings:
    PROJECT_NAME: str = "EcoQuest API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-12345")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./ecoquest.db")

settings = Settings()