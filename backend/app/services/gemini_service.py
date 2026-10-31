import json
import logging
from typing import Optional, Dict, Any
from app.core.config import settings
from app.schemas.onboarding import MandatoryOnboardingInput, FullOnboardingPayload, GeneratedPlanResponse, MacroTargets, WorkoutDayPlan, ExerciseItem
from app.schemas.workout import WorkoutSwapRequest, WorkoutSwapResponse
from app.schemas.nutrition import FoodVisionAnalysisResponse, IngredientBreakdown

logger = logging.getLogger(__name__)


def calculate_bmr_and_tdee(gender: str, age: int, height_cm: float, weight_kg: float, activity_level: str, goal: str):
    """Mifflin-St Jeor Formula for BMR & TDEE calculation."""
    if gender == "female":
        bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161
    else:
        bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5
    
    activity_multipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "very_active": 1.725,
        "extra_active": 1.9,
    }
    multiplier = activity_multipliers.get(activity_level, 1.4)
    tdee = int(bmr * multiplier)

    # Goal adjustment
    if goal == "cut":
        adjustment = -400
        protein_ratio = 2.2 # g per kg bodyweight
    elif goal == "bulk":
        adjustment = 300
        protein_ratio = 1.9
    elif goal == "strength":
        adjustment = 150
        protein_ratio = 2.0
    else: # recomp / maintenance
        adjustment = 0
        protein_ratio = 2.1

    target_cal = max(1300, tdee + adjustment)
    protein_g = int(weight_kg * protein_ratio)
    fat_g = int((target_cal * 0.25) / 9)
    remaining_cals = max(0, target_cal - (protein_g * 4) - (fat_g * 9))
    carbs_g = int(remaining_cals / 4)

    return {
        "bmr": int(bmr),
        "tdee": tdee,
        "adjustment": adjustment,
        "target_calories": target_cal,
        "protein_g": protein_g,
        "carbs_g": carbs_g,
        "fat_g": fat_g,
    }


class GeminiService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.model_name = settings.GEMINI_MODEL
        self._client = None
        if self.api_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self._client = genai.GenerativeModel(self.model_name)
            except Exception as e:
                logger.warning(f"Could not initialize google.generativeai client: {e}")

    async def generate_fitness_plan(self, data: FullOnboardingPayload) -> GeneratedPlanResponse:
        """Generates a complete personalized fitness routine & macro distribution using Gemini Flash."""
        calc = calculate_bmr_and_tdee(
            data.gender, data.age, data.height_cm, data.weight_kg, data.activity_level, data.primary_goal
        )

        # Fallback template if Gemini client is not configured
        if not self._client:
            return self._get_fallback_plan(data, calc)

        prompt = f"""
        You are an elite sports scientist and strength coach at FORMA.
        Create an evidence-based, hyper-personalized workout routine and nutrition plan for this user:
        
        USER PROFILE:
        - Gender: {data.gender}
        - Age: {data.age}
        - Height: {data.height_cm} cm | Weight: {data.weight_kg} kg
        - Primary Goal: {data.primary_goal}
        - Weekly Frequency: {data.workout_days_per_week} days/week
        - Experience: {data.experience_level}
        - Equipment: {data.equipment_type}
        - Known Injuries/Flags: {', '.join(data.injuries) if data.injuries else 'None'}
        - Calculated Target Calories: {calc['target_calories']} kcal (Protein: {calc['protein_g']}g, Carbs: {calc['carbs_g']}g, Fat: {calc['fat_g']}g)

        Return strictly valid JSON with this exact schema:
        {{
            "split_name": "string (e.g. Upper / Lower Hypertrophy Split)",
            "weekly_frequency": {data.workout_days_per_week},
            "overview_summary": "string explaining the training philosophy",
            "macro_targets": {{
                "target_calories": {calc['target_calories']},
                "protein_g": {calc['protein_g']},
                "carbs_g": {calc['carbs_g']},
                "fat_g": {calc['fat_g']},
                "bmr": {calc['bmr']},
                "tdee": {calc['tdee']},
                "goal_adjustment_calories": {calc['adjustment']},
                "rationale": "Explanation of caloric and macronutrient distribution"
            }},
            "workout_days": [
                {{
                    "day_number": 1,
                    "day_name": "Day 1: Upper Body Push & Pull",
                    "focus": "Chest, Back & Shoulders",
                    "estimated_duration_mins": 45,
                    "exercises": [
                        {{
                            "order": 1,
                            "exercise_name": "Incline Dumbbell Press",
                            "target_muscle": "Upper Pectorals",
                            "sets": 4,
                            "rep_range": "8-10",
                            "rest_seconds": 90,
                            "approx_calories": 95,
                            "technique_tip": "Keep elbows at 45 degrees, pause at bottom",
                            "substitutes": ["Incline Barbell Press", "Push-ups with elevation"]
                        }}
                    ]
                }}
            ]
        }}
        """

        try:
            import google.generativeai as genai
            response = self._client.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                    temperature=0.3
                )
            )
            parsed = json.loads(response.text)
            return GeneratedPlanResponse(**parsed)
        except Exception as e:
            logger.error(f"Error calling Gemini Flash API: {e}. Falling back to deterministic plan.")
            return self._get_fallback_plan(data, calc)

    async def swap_exercise(self, request: WorkoutSwapRequest) -> WorkoutSwapResponse:
        """Instantly finds a biomechanically sound substitute exercise."""
        if not self._client:
            return WorkoutSwapResponse(
                original_exercise=request.current_exercise_name,
                substitute_exercise=f"Dumbbell Alternate for {request.current_exercise_name}",
                target_muscle=request.target_muscle,
                recommended_sets=3,
                recommended_reps="10-12",
                rest_seconds=60,
                why_recommended=f"Reduced joint stress for {request.reason} while targeting {request.target_muscle}."
            )

        prompt = f"""
        You are a strength coach in the FORMA app. A user in the gym needs to substitute an exercise IMMEDIATELY.
        - Original exercise: {request.current_exercise_name}
        - Target muscle: {request.target_muscle}
        - Reason: {request.reason}
        - Available equipment: {request.available_equipment}

        Return strictly valid JSON with this schema:
        {{
            "original_exercise": "{request.current_exercise_name}",
            "substitute_exercise": "string (name of the best alternative)",
            "target_muscle": "{request.target_muscle}",
            "recommended_sets": 3,
            "recommended_reps": "8-12",
            "rest_seconds": 60,
            "why_recommended": "1 sentence explanation on why this solves the user's issue safely"
        }}
        """
        try:
            import google.generativeai as genai
            response = self._client.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                    temperature=0.2
                )
            )
            parsed = json.loads(response.text)
            return WorkoutSwapResponse(**parsed)
        except Exception as e:
            logger.error(f"Error swapping exercise with Gemini: {e}")
            return WorkoutSwapResponse(
                original_exercise=request.current_exercise_name,
                substitute_exercise="Cable Machine Alternative",
                target_muscle=request.target_muscle,
                recommended_sets=3,
                recommended_reps="10-12",
                rest_seconds=60,
                why_recommended="Safer resistance curve and adjustable range of motion."
            )

    async def analyze_food_image(self, image_bytes: bytes, mime_type: str = "image/jpeg") -> FoodVisionAnalysisResponse:
        """Performs multimodal vision food analysis via Gemini Flash."""
        if not self._client:
            # Deterministic mock response for offline / initial testing
            return FoodVisionAnalysisResponse(
                dish_name="Phở Bò Tái Nạm (Vietnamese Beef Pho)",
                total_calories=485.0,
                total_protein_g=38.0,
                total_carbs_g=58.0,
                total_fat_g=11.5,
                confidence_score=0.92,
                ingredients=[
                    IngredientBreakdown(name="Bánh phở (Rice Noodles)", estimated_grams=180, calories=230, protein_g=4.5, carbs_g=52, fat_g=0.5),
                    IngredientBreakdown(name="Thịt bò nạc (Lean Beef)", estimated_grams=120, calories=185, protein_g=31, carbs_g=0, fat_g=6.5),
                    IngredientBreakdown(name="Nước dùng hầm xương (Broth)", estimated_grams=350, calories=70, protein_g=2.5, carbs_g=6, fat_g=4.5),
                ],
                ai_feedback_note="Món ăn giàu protein nạc, lượng carb vừa phải lý tưởng sau buổi tập."
            )

        prompt = """
        You are a clinical sports nutritionist and expert computer vision system in FORMA.
        Analyze this photo of a meal:
        1. Identify the dish name (especially Vietnamese dishes like Phở, Cơm Tấm, Bún Bò, Ức gà, etc.).
        2. Break down the components with estimated weights in grams.
        3. Estimate total Calories, Protein (g), Carbohydrates (g), and Fat (g).
        4. Provide an overall confidence score between 0.0 and 1.0.

        Return strictly valid JSON:
        {
            "dish_name": "string",
            "total_calories": float,
            "total_protein_g": float,
            "total_carbs_g": float,
            "total_fat_g": float,
            "confidence_score": float,
            "ingredients": [
                {
                    "name": "string",
                    "estimated_grams": float,
                    "calories": float,
                    "protein_g": float,
                    "carbs_g": float,
                    "fat_g": float
                }
            ],
            "ai_feedback_note": "string (short motivational nutrition advice in Vietnamese)"
        }
        """

        try:
            import google.generativeai as genai
            image_part = {"mime_type": mime_type, "data": image_bytes}
            response = self._client.generate_content(
                [prompt, image_part],
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                    temperature=0.2
                )
            )
            parsed = json.loads(response.text)
            return FoodVisionAnalysisResponse(**parsed)
        except Exception as e:
            logger.error(f"Error in Gemini Vision analysis: {e}")
            raise e

    def _get_fallback_plan(self, data: FullOnboardingPayload, calc: Dict[str, Any]) -> GeneratedPlanResponse:
        """Deterministic science-based workout and macro fallback plan."""
        days = []
        if data.workout_days_per_week == 2:
            split_name = "2-Day Full Body Frequency"
            days = [
                WorkoutDayPlan(
                    day_number=1,
                    day_name="Buổi 1: Toàn thân A (Full Body Focus)",
                    focus="Ngực, Lưng xô, Đùi trước",
                    estimated_duration_mins=45,
                    exercises=[
                        ExerciseItem(order=1, exercise_name="Goblet Squat / Leg Press", target_muscle="Quads", sets=4, rep_range="10-12", approx_calories=100, technique_tip="Giữ lưng thẳng, xuống sâu kiểm soát", substitutes=["Dumbbell Lunge"]),
                        ExerciseItem(order=2, exercise_name="Incline Dumbbell Press", target_muscle="Upper Chest", sets=4, rep_range="8-10", approx_calories=90, technique_tip="Hạ tạ 2 giây, đẩy dứt khoát", substitutes=["Push-ups"]),
                        ExerciseItem(order=3, exercise_name="Lat Pulldown (Kéo xô)", target_muscle="Lats", sets=4, rep_range="10-12", approx_calories=85, technique_tip="Ưỡn ngực, siết cơ lưng ở điểm thấp nhất", substitutes=["Dumbbell Row"]),
                    ]
                ),
                WorkoutDayPlan(
                    day_number=2,
                    day_name="Buổi 2: Toàn thân B (Full Body Power)",
                    focus="Vai, Đùi sau, Tay",
                    estimated_duration_mins=45,
                    exercises=[
                        ExerciseItem(order=1, exercise_name="Romanian Deadlift (RDL)", target_muscle="Hamstrings & Glutes", sets=4, rep_range="10-12", approx_calories=110, technique_tip="Đẩy mông về sau, cảm nhận căng đùi sau", substitutes=["Lying Leg Curl"]),
                        ExerciseItem(order=2, exercise_name="Dumbbell Shoulder Press", target_muscle="Shoulders", sets=4, rep_range="8-10", approx_calories=80, technique_tip="Không khóa khớp cùi chỏ ở đỉnh", substitutes=["Lateral Raise"]),
                        ExerciseItem(order=3, exercise_name="Cable Tricep Pushdown", target_muscle="Triceps", sets=3, rep_range="12-15", approx_calories=60, technique_tip="Cố định cùi chỏ sát sườn", substitutes=["Overhead Tricep Extension"]),
                    ]
                )
            ]
        elif data.workout_days_per_week == 3:
            split_name = "3-Day Classic Push / Pull / Legs"
            days = [
                WorkoutDayPlan(
                    day_number=1,
                    day_name="Buổi 1: Push (Ngực, Vai, Tay Sau)",
                    focus="Pectorals, Anterior Deltoids, Triceps",
                    estimated_duration_mins=45,
                    exercises=[
                        ExerciseItem(order=1, exercise_name="Incline Dumbbell Press", target_muscle="Upper Chest", sets=4, rep_range="8-10", approx_calories=90, substitutes=["Machine Chest Press"]),
                        ExerciseItem(order=2, exercise_name="Dumbbell Lateral Raise", target_muscle="Side Delts", sets=4, rep_range="12-15", approx_calories=65, substitutes=["Cable Lateral Raise"]),
                        ExerciseItem(order=3, exercise_name="Rope Tricep Pushdown", target_muscle="Triceps", sets=3, rep_range="12-15", approx_calories=55, substitutes=["Dumbbell Kickback"]),
                    ]
                ),
                WorkoutDayPlan(
                    day_number=2,
                    day_name="Buổi 2: Pull (Lưng Xô, Vai Sau, Tay Trước)",
                    focus="Lats, Rhomboids, Biceps",
                    estimated_duration_mins=45,
                    exercises=[
                        ExerciseItem(order=1, exercise_name="Lat Pulldown", target_muscle="Lats", sets=4, rep_range="10-12", approx_calories=95, substitutes=["Pull-ups"]),
                        ExerciseItem(order=2, exercise_name="Seated Cable Row", target_muscle="Mid Back", sets=4, rep_range="10-12", approx_calories=90, substitutes=["Dumbbell Row"]),
                        ExerciseItem(order=3, exercise_name="Incline Dumbbell Curl", target_muscle="Biceps", sets=3, rep_range="10-12", approx_calories=60, substitutes=["Hammer Curl"]),
                    ]
                ),
                WorkoutDayPlan(
                    day_number=3,
                    day_name="Buổi 3: Legs & Core (Chân & Bụng)",
                    focus="Quads, Hamstrings, Abs",
                    estimated_duration_mins=45,
                    exercises=[
                        ExerciseItem(order=1, exercise_name="Goblet Squat / Leg Press", target_muscle="Quads", sets=4, rep_range="10-12", approx_calories=120, substitutes=["Bulgarian Split Squat"]),
                        ExerciseItem(order=2, exercise_name="Romanian Deadlift", target_muscle="Hamstrings", sets=4, rep_range="10-12", approx_calories=100, substitutes=["Lying Leg Curl"]),
                        ExerciseItem(order=3, exercise_name="Hanging Leg Raise", target_muscle="Abs", sets=3, rep_range="15-20", approx_calories=50, substitutes=["Plank"]),
                    ]
                )
            ]
        else: # 4 to 6 days
            split_name = "4-Day Upper / Lower Hypertrophy Split"
            days = [
                WorkoutDayPlan(day_number=1, day_name="Buổi 1: Upper Body Power", focus="Ngực & Lưng Xô", estimated_duration_mins=50, exercises=[
                    ExerciseItem(order=1, exercise_name="Incline Dumbbell Press", target_muscle="Upper Chest", sets=4, rep_range="8-10", approx_calories=95),
                    ExerciseItem(order=2, exercise_name="Lat Pulldown", target_muscle="Lats", sets=4, rep_range="8-10", approx_calories=90),
                    ExerciseItem(order=3, exercise_name="Overhead Dumbbell Press", target_muscle="Shoulders", sets=3, rep_range="10-12", approx_calories=75)
                ]),
                WorkoutDayPlan(day_number=2, day_name="Buổi 2: Lower Body Quad Focus", focus="Đùi trước & Bắp chân", estimated_duration_mins=50, exercises=[
                    ExerciseItem(order=1, exercise_name="Leg Press / Barbell Squat", target_muscle="Quads", sets=4, rep_range="10-12", approx_calories=130),
                    ExerciseItem(order=2, exercise_name="Leg Extension", target_muscle="Quads", sets=3, rep_range="12-15", approx_calories=70),
                    ExerciseItem(order=3, exercise_name="Standing Calf Raise", target_muscle="Calves", sets=4, rep_range="15-20", approx_calories=50)
                ]),
                WorkoutDayPlan(day_number=3, day_name="Buổi 3: Upper Body Hypertrophy", focus="Vai, Tay trước & Tay sau", estimated_duration_mins=45, exercises=[
                    ExerciseItem(order=1, exercise_name="Cable Lateral Raise", target_muscle="Side Delts", sets=4, rep_range="12-15", approx_calories=65),
                    ExerciseItem(order=2, exercise_name="Incline Dumbbell Curl", target_muscle="Biceps", sets=4, rep_range="10-12", approx_calories=65),
                    ExerciseItem(order=3, exercise_name="Tricep Rope Pushdown", target_muscle="Triceps", sets=4, rep_range="12-15", approx_calories=65)
                ]),
                WorkoutDayPlan(day_number=4, day_name="Buổi 4: Lower Body Chain Focus", focus="Đùi sau & Mông", estimated_duration_mins=45, exercises=[
                    ExerciseItem(order=1, exercise_name="Romanian Deadlift", target_muscle="Hamstrings", sets=4, rep_range="10-12", approx_calories=110),
                    ExerciseItem(order=2, exercise_name="Seated Leg Curl", target_muscle="Hamstrings", sets=3, rep_range="12-15", approx_calories=70),
                    ExerciseItem(order=3, exercise_name="Hanging Knee Raise", target_muscle="Abs", sets=3, rep_range="15-20", approx_calories=55)
                ]),
            ]

        return GeneratedPlanResponse(
            split_name=split_name,
            weekly_frequency=data.workout_days_per_week,
            overview_summary=f"Lộ trình tối ưu cho mục tiêu {data.primary_goal.upper()} với tần suất {data.workout_days_per_week} buổi/tuần. Giữ thâm hụt/thặng dư hợp lý để tăng cường cơ bắp và bảo vệ khớp.",
            macro_targets=MacroTargets(
                target_calories=calc["target_calories"],
                protein_g=calc["protein_g"],
                carbs_g=calc["carbs_g"],
                fat_g=calc["fat_g"],
                bmr=calc["bmr"],
                tdee=calc["tdee"],
                goal_adjustment_calories=calc["adjustment"],
                rationale="Dựa trên công thức chuyển hóa Mifflin-St Jeor và tiêu chuẩn dinh dưỡng vận động viên."
            ),
            workout_days=days
        )


gemini_service = GeminiService()

