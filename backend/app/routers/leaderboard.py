from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import List, Optional
import sys
import os

# Ensures service module resolution
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from services.gamification import calculate_tree_stage, calculate_rankings

router = APIRouter(prefix="/api/v1/gamification", tags=["Forest & Leaderboard"])

class TreeStatusResponse(BaseModel):
    streak_days: int
    tree_stage: int
    stage_name: str
    tree_emoji: str
    total_co2_saved_kg: float

class LeaderboardUser(BaseModel):
    rank: int
    name: str
    city: str
    streak_days: int
    co2_saved_kg: float

# Fallback in-memory dataset so backend runs immediately without DB setup
MOCK_USERS_DB = [
    {"name": "Sanskruti", "city": "Pune", "streak_days": 14, "co2_saved_kg": 120.5},
    {"name": "Aarav", "city": "Mumbai", "streak_days": 21, "co2_saved_kg": 280.0},
    {"name": "Riya", "city": "Pune", "streak_days": 7, "co2_saved_kg": 45.2},
    {"name": "Karan", "city": "Delhi", "streak_days": 30, "co2_saved_kg": 520.0},
]

@router.get("/tree-status/{user_id}", response_model=TreeStatusResponse)
def get_tree_status(user_id: int):
    # Simulated fetching based on user ID logic
    user_co2 = 120.5 if user_id == 1 else 35.0
    streak_days = 14 if user_id == 1 else 3
    stage_info = calculate_tree_stage(user_co2)

    return TreeStatusResponse(
        streak_days=streak_days,
        tree_stage=stage_info["stage"],
        stage_name=stage_info["name"],
        tree_emoji=stage_info["emoji"],
        total_co2_saved_kg=user_co2
    )

@router.get("/leaderboard", response_model=List[LeaderboardUser])
def get_leaderboard(city: Optional[str] = Query(None, description="Filter rankings by city")):
    return calculate_rankings(MOCK_USERS_DB, city_filter=city)