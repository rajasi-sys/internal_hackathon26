from pydantic import BaseModel
from typing import Dict, Optional

class DailyLogCreate(BaseModel):
    user_id: int = 1
    date_str: str  # Format: YYYY-MM-DD
    city: str
    electricity_kwh: float = 0.0
    petrol_car_km: float = 0.0
    zero_emission_day: bool = False

class EmissionResponse(BaseModel):
    status: str
    date: str
    user_daily_co2_kg: float
    city_daily_avg_kg: float
    over_emitting: bool
    excess_co2_kg: float

class CityBenchmarkResponse(BaseModel):
    status: str
    benchmarks: Dict[str, float]