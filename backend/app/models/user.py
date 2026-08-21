from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

# Fallback Base if database.py is not yet configured
try:
    from app.database import Base
except ImportError:
    from sqlalchemy.orm import declarative_base
    Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=True)
    city = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    household_size = Column(Integer, nullable=True)
    primary_transport = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)