from typing import List, Dict, Any, Optional

def calculate_tree_stage(total_co2_saved_kg: float) -> Dict[str, Any]:
    """Calculates tree evolution levels (Seed -> Forest) based on CO2 savings."""
    if total_co2_saved_kg >= 500.0:
        return {"stage": 5, "name": "Ancient Forest", "emoji": "🌳🌳🌳"}
    elif total_co2_saved_kg >= 250.0:
        return {"stage": 4, "name": "Mature Tree", "emoji": "🌲"}
    elif total_co2_saved_kg >= 100.0:
        return {"stage": 3, "name": "Growing Sapling", "emoji": "🌳"}
    elif total_co2_saved_kg >= 25.0:
        return {"stage": 2, "name": "Sprout", "emoji": "🌿"}
    else:
        return {"stage": 1, "name": "Seed", "emoji": "🌱"}

def calculate_rankings(users: List[Dict[str, Any]], city_filter: Optional[str] = None) -> List[Dict[str, Any]]:
    """Sorts users by CO2 saved and applies city or global ranking positions."""
    filtered_users = users
    if city_filter and city_filter.strip():
        filtered_users = [u for u in users if u.get("city", "").lower() == city_filter.strip().lower()]

    sorted_users = sorted(filtered_users, key=lambda x: x.get("co2_saved_kg", 0.0), reverse=True)

    ranked_users = []
    for rank, user in enumerate(sorted_users, start=1):
        user_copy = user.copy()
        user_copy["rank"] = rank
        ranked_users.append(user_copy)

    return ranked_users