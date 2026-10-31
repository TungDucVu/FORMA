from fastapi import APIRouter, HTTPException, UploadFile, File
from app.schemas.nutrition import FoodVisionAnalysisResponse
from app.services.gemini_service import gemini_service

router = APIRouter()


@router.post("/analyze-food", response_model=FoodVisionAnalysisResponse, summary="Analyze Food Image with Gemini Vision")
async def analyze_food(file: UploadFile = File(...)):
    """
    Ingests an image uploaded from physical iPhone / Camera and triggers
    Gemini Flash Multimodal Vision to deconstruct ingredients, estimated grams,
    and macros (Calories, Protein, Carbs, Fat).
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    try:
        image_bytes = await file.read()
        analysis = await gemini_service.analyze_food_image(image_bytes, file.content_type)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Vision analysis failed: {str(e)}")

