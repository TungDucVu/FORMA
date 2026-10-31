from fastapi import APIRouter, HTTPException
from app.schemas.workout import WorkoutSwapRequest, WorkoutSwapResponse
from app.services.gemini_service import gemini_service
from app.services.exercisedb_service import exercisedb_service

router = APIRouter()


@router.post("/swap", response_model=WorkoutSwapResponse, summary="Instant Real-Time Exercise Substitution")
async def swap_exercise(request: WorkoutSwapRequest):
    """
    Substitutes an exercise on the fly when the user experiences joint pain,
    finds equipment busy, or needs a biomechanically safer alternative.
    """
    try:
        swap_result = await gemini_service.swap_exercise(request)
        return swap_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to substitute exercise: {str(e)}")


@router.get("/exercises", summary="Browse Curated Exercise Library")
async def get_exercises(target: str = "pectorals", limit: int = 10):
    return await exercisedb_service.get_exercises_by_target(target, limit)

