from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class MandatoryOnboardingInput(BaseModel):
    """Group 1: Minimum mandatory fields needed to generate routine & macros."""
    gender: Literal["male", "female", "other"] = Field(..., description="User biological gender for BMR calculation")
    age: int = Field(..., ge=13, le=100, description="Age in years")
    height_cm: float = Field(..., ge=100, le=250, description="Height in centimeters")
    weight_kg: float = Field(..., ge=30, le=300, description="Current weight in kilograms")
    primary_goal: Literal["cut", "bulk", "recomp", "strength", "endurance"] = Field(
        ..., description="Primary fitness objective"
    )
    workout_days_per_week: int = Field(..., ge=2, le=7, description="Available training sessions per week")


class OptionalOnboardingInput(BaseModel):
    """Group 2: Optional advanced parameters for deep customization (Profile Nudge)."""
    target_weight_kg: Optional[float] = None
    bodyfat_est: Optional[float] = None
    activity_level: Literal["sedentary", "light", "moderate", "very_active", "extra_active"] = "moderate"
    experience_level: Literal["beginner", "intermediate", "advanced"] = "beginner"
    equipment_type: Literal["gym", "home_dumbbells", "bodyweight"] = "gym"
    injuries: List[str] = Field(default_factory=list, description="Joint or muscle flags (e.g. ['knee_pain', 'lower_back'])")
    dietary_preferences: Optional[dict] = None


class FullOnboardingPayload(MandatoryOnboardingInput, OptionalOnboardingInput):
    pass


class MacroTargets(BaseModel):
    target_calories: int
    protein_g: int
    carbs_g: int
    fat_g: int
    bmr: int
    tdee: int
    goal_adjustment_calories: int
    rationale: str


class ExerciseItem(BaseModel):
    order: int
    exercise_name: str
    target_muscle: str
    sets: int = 3
    rep_range: str = "8-12"
    rest_seconds: int = 60
    approx_calories: int = 80
    gif_url: Optional[str] = None
    technique_tip: Optional[str] = None
    substitutes: List[str] = Field(default_factory=list)


class WorkoutDayPlan(BaseModel):
    day_number: int
    day_name: str
    focus: str
    estimated_duration_mins: int = 45
    exercises: List[ExerciseItem]


class GeneratedPlanResponse(BaseModel):
    split_name: str
    weekly_frequency: int
    overview_summary: str
    macro_targets: MacroTargets
    workout_days: List[WorkoutDayPlan]

