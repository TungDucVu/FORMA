from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()


@router.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
        "ai_model": settings.GEMINI_MODEL,
        "has_gemini_key": bool(settings.GEMINI_API_KEY),
        "has_supabase_config": bool(settings.SUPABASE_URL),
    }

