from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import health, onboarding, workout, nutrition

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="Backend API for FORMA: AI Fitness & Nutrition Platform",
    version="1.0.0"
)

# CORS setup for Web client & Cloudflare Tunnel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permissive for easy mobile testing via tunnel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(health.router, prefix=settings.API_V1_STR)
app.include_router(onboarding.router, prefix=f"{settings.API_V1_STR}/onboarding", tags=["Onboarding & Plan Generation"])
app.include_router(workout.router, prefix=f"{settings.API_V1_STR}/workout", tags=["Workout & Real-time Feedback"])
app.include_router(nutrition.router, prefix=f"{settings.API_V1_STR}/nutrition", tags=["Nutrition & Multimodal Vision"])


@app.get("/")
def root():
    return {
        "message": "Welcome to FORMA AI Backend",
        "docs": "/docs",
        "health": f"{settings.API_V1_STR}/health"
    }

