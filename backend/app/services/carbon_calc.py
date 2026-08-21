from typing import Dict, Tuple

# Pre-defined city carbon averages (kg CO2 per capita per month)
CITY_BENCHMARKS: Dict[str, float] = {
    "New York": 450.0,
    "London": 320.0,
    "Mumbai": 210.0,
    "Tokyo": 290.0,
    "Default": 350.0
}

# Conversion Constants
CO2_PER_KWH = 0.85  # kg CO2 per kWh
CO2_PER_KM = 0.17   # kg CO2 per petrol car km

def calculate_daily_emissions(electricity_kwh: float, petrol_car_km: float, is_zero_day: bool) -> float:
    """Calculates total daily carbon footprint in kg CO2."""
    if is_zero_day:
        return 0.0
    return (electricity_kwh * CO2_PER_KWH) + (petrol_car_km * CO2_PER_KM)

def evaluate_city_benchmark(city: str, daily_co2_kg: float) -> Tuple[float, bool, float]:
    """
    Compares user daily CO2 against city target.
    Returns: (city_daily_avg_kg, over_emitting_flag, excess_co2_kg)
    """
    monthly_benchmark = CITY_BENCHMARKS.get(city.title(), CITY_BENCHMARKS["Default"])
    daily_city_avg = round(monthly_benchmark / 30.0, 2)
    
    over_emitting = daily_co2_kg > daily_city_avg
    excess_co2 = round(daily_co2_kg - daily_city_avg, 2) if over_emitting else 0.0
    
    return daily_city_avg, over_emitting, excess_co2