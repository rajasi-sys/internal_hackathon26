from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/api/v1/solutions", tags=["Solutions Dashboard"])

# --- Schemas ---
class SolutionItem(BaseModel):
    category: str
    current_action: str
    suggested_action: str
    short_term_savings_usd: float
    long_term_carbon_reduction_kg: float

class SolutionsResponse(BaseModel):
    user_city: str
    solutions: List[SolutionItem]

# --- Endpoints ---
@router.get("/recommendations/{city}", response_model=SolutionsResponse)
def get_recommendations(city: str, transport_km: float = 20.0, electricity_kwh: float = 15.0):
    solutions_list = [
        SolutionItem(
            category="Commute",
            current_action=f"Driving {transport_km} km/day solo in a gas vehicle",
            suggested_action="Switch to Public Transit or Electric Scooter 3 days/week",
            short_term_savings_usd=65.0, # Monthly fuel savings
            long_term_carbon_reduction_kg=round(transport_km * 0.17 * 12, 2)
        ),
        SolutionItem(
            category="Energy",
            current_action=f"Consuming {electricity_kwh} kWh/day on standard grid power",
            suggested_action="Upgrade to LED bulbs & smart plug schedules",
            short_term_savings_usd=25.0, # Monthly utility savings
            long_term_carbon_reduction_kg=round(electricity_kwh * 0.85 * 0.20 * 30, 2)
        )
    ]
   
    return {
        "user_city": city,
        "solutions": solutions_list
    }

