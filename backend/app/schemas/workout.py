from typing import List, Optional
from pydantic import BaseModel, Field


class WorkoutSwapRequest(BaseModel):
    current_exercise_name: str = Field(..., description="The exercise being substituted")
    target_muscle: str = Field(..., description="Target muscle group")
    reason: str = Field(
        ...,
        description="Reason for swapping: 'joint_pain', 'equipment_busy', 'too_heavy', or custom text"
    )
    available_equipment: Optional[str] = Field(
        "gym", description="'gym', 'dumbbells_only', 'cable_only', 'bodyweight'"
    )


class WorkoutSwapResponse(BaseModel):
    original_exercise: str
    substitute_exercise: str
    target_muscle: str
    recommended_sets: int
    recommended_reps: str
    rest_seconds: int
    why_recommended: str
    gif_url: Optional[str] = None

