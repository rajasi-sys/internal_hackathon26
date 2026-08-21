from pydantic import BaseModel
from typing import List

class SolutionItem(BaseModel):
    category: str
    current_action: str
    suggested_action: str
    short_term_savings_usd: float
    long_term_carbon_reduction_kg: float

class SolutionsResponse(BaseModel):
    user_city: str
    solutions: List[SolutionItem]
    