from fastapi import APIRouter, HTTPException
from app.schemas.onboarding import MandatoryOnboardingInput, FullOnboardingPayload, GeneratedPlanResponse
from app.services.gemini_service import gemini_service

router = APIRouter()


@router.post("/generate-plan", response_model=GeneratedPlanResponse, summary="Generate Workout & Macro Plan")
async def generate_plan(payload: FullOnboardingPayload):
    """
    Receives minimum onboarding data (or full profile) and activates
    Gemini Flash to generate a hyper-personalized workout routine and macro breakdown.
    """
    try:
        plan = await gemini_service.generate_fitness_plan(payload)
        return plan
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate fitness plan: {str(e)}")

