from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Dict, Optional

# Initialize Router
router = APIRouter(prefix="/api/v1/emissions", tags=["Emissions Engine"])

# =====================================================================
# 1. CITY BENCHMARKS & CONVERSION CONSTANTS
# =====================================================================

# City carbon averages in kg CO2 per capita per month
CITY_BENCHMARKS: Dict[str, float] = {
    "New York": 450.0,
    "London": 320.0,
    "Mumbai": 210.0,
    "Tokyo": 290.0,
    "Default": 350.0
}

# Environmental Conversion Factors
CO2_PER_KWH = 0.85  # 1 kWh = 0.85 kg CO2
CO2_PER_KM = 0.17   # 1 km petrol driving = 0.17 kg CO2


# =====================================================================
# 2. PYDANTIC SCHEMAS (REQUEST & RESPONSE MODELS)
# =====================================================================

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


# =====================================================================
# 3. HELPER MATH FUNCTIONS
# =====================================================================

def calculate_daily_emissions(electricity_kwh: float, petrol_car_km: float, is_zero_day: bool) -> float:
    """Calculates total daily carbon footprint in kg CO2."""
    if is_zero_day:
        return 0.0
    return (electricity_kwh * CO2_PER_KWH) + (petrol_car_km * CO2_PER_KM)


def evaluate_city_benchmark(city: str, daily_co2_kg: float):
    """Compares user daily CO2 against city target."""
    monthly_benchmark = CITY_BENCHMARKS.get(city.title(), CITY_BENCHMARKS["Default"])
    daily_city_avg = round(monthly_benchmark / 30.0, 2)
    
    over_emitting = daily_co2_kg > daily_city_avg
    excess_co2 = round(daily_co2_kg - daily_city_avg, 2) if over_emitting else 0.0
    
    return daily_city_avg, over_emitting, excess_co2


# =====================================================================
# 4. API ENDPOINTS
# =====================================================================

@router.post("/lock-daily", response_model=EmissionResponse, status_code=status.HTTP_200_OK)
def lock_daily_emissions(log: DailyLogCreate):
    """
    Locks the user's daily emission inputs, calculates carbon footprint,
    and returns comparative city analytics.
    """
    # Step 1: Calculate total daily CO2 output
    daily_co2_kg = calculate_daily_emissions(
        electricity_kwh=log.electricity_kwh,
        petrol_car_km=log.petrol_car_km,
        is_zero_day=log.zero_emission_day
    )
    
    # Step 2: Benchmark against city average
    city_daily_avg, over_emitting, excess_co2 = evaluate_city_benchmark(
        city=log.city,
        daily_co2_kg=daily_co2_kg
    )
    
    # Step 3: Return payload to Frontend
    return EmissionResponse(
        status="locked",
        date=log.date_str,
        user_daily_co2_kg=round(daily_co2_kg, 2),
        city_daily_avg_kg=city_daily_avg,
        over_emitting=over_emitting,
        excess_co2_kg=excess_co2
    )


@router.get("/city-benchmarks", response_model=CityBenchmarkResponse)
def get_city_benchmarks():
    """Returns baseline carbon emissions data for supported cities."""
    return CityBenchmarkResponse(status="success", benchmarks=CITY_BENCHMARKS)