from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime

try:
    from app.database import Base
except ImportError:
    from sqlalchemy.orm import declarative_base
    Base = declarative_base()

class Bill(Base):
    __tablename__ = "bills"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)