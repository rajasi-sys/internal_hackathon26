from sqlalchemy import Column, Integer, String, Float
from app.database import Base 

class LeaderboardEntry(Base):
    __tablename__ = "leaderboard"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    city = Column(String, nullable=False)
    streak_days = Column(Integer, default=0)
    co2_saved_kg = Column(Float, default=0.0)

class TreeStatusModel(Base):
    __tablename__ = "tree_status"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True, nullable=False, index=True)
    tree_stage = Column(Integer, default=1)
    stage_name = Column(String, default="Seed")
    tree_emoji = Column(String, default="🌱")
    total_co2_saved_kg = Column(Float, default=0.0)