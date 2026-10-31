from typing import List, Optional
from pydantic import BaseModel, Field


class IngredientBreakdown(BaseModel):
    name: str
    estimated_grams: float
    calories: float
    protein_g: float
    carbs_g: float
    fat_g: float


class FoodVisionAnalysisResponse(BaseModel):
    dish_name: str
    total_calories: float
    total_protein_g: float
    total_carbs_g: float
    total_fat_g: float
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    ingredients: List[IngredientBreakdown] = Field(default_factory=list)
    ai_feedback_note: str


class MealLogRequest(BaseModel):
    dish_name: str
    meal_type: str = "lunch"
    calories: float
    protein_g: float
    carbs_g: float
    fat_g: float
    image_url: Optional[str] = None
    ai_ingredients_breakdown: Optional[List[dict]] = None

