import logging
from typing import List, Dict, Any, Optional
import httpx
from app.core.config import settings

logger = logging.getLogger(__name__)

# Sample cached exercises from ExerciseDB
CURATED_EXERCISES = [
    {
        "id": "0009",
        "name": "assisted chest dip (kneeling)",
        "target_muscle": "pectorals",
        "body_part": "chest",
        "equipment": "leverage machine",
        "gif_url": "https://v2.exercisedb.io/image/Wn1H2T2c7Y2C4k",
        "instructions": ["Kneel on the pad", "Lower body with elbows at 90 degrees", "Push back up to starting position"]
    },
    {
        "id": "0025",
        "name": "barbell bench press",
        "target_muscle": "pectorals",
        "body_part": "chest",
        "equipment": "barbell",
        "gif_url": "https://v2.exercisedb.io/image/YyYh8p4k1n",
        "instructions": ["Lie flat on the bench", "Grip barbell slightly wider than shoulder-width", "Lower to mid-chest, press upward"]
    },
    {
        "id": "0043",
        "name": "barbell full squat",
        "target_muscle": "quads",
        "body_part": "upper legs",
        "equipment": "barbell",
        "gif_url": "https://v2.exercisedb.io/image/Jj8k4L1",
        "instructions": ["Rest bar across traps", "Descend until thighs parallel to ground", "Drive through feet to stand"]
    },
    {
        "id": "0032",
        "name": "barbell deadlift",
        "target_muscle": "glutes",
        "body_part": "back",
        "equipment": "barbell",
        "gif_url": "https://v2.exercisedb.io/image/Pp8k2X1",
        "instructions": ["Stand mid-foot under barbell", "Hinge hips and grasp bar", "Lift by extending hips and knees"]
    },
    {
        "id": "0150",
        "name": "cable seated row",
        "target_muscle": "upper back",
        "body_part": "back",
        "equipment": "cable",
        "gif_url": "https://v2.exercisedb.io/image/Kk9L2P3",
        "instructions": ["Sit upright with feet on footplates", "Pull handle toward abdomen", "Squeeze shoulder blades"]
    }
]


class ExerciseDBService:
    def __init__(self):
        self.api_key = settings.EXERCISEDB_API_KEY
        self.base_url = settings.EXERCISEDB_BASE_URL
        self._cache: Dict[str, Dict[str, Any]] = {ex["id"]: ex for ex in CURATED_EXERCISES}

    async def get_exercises_by_target(self, target: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Fetches exercises by target muscle with local cache fallback."""
        if not self.api_key:
            filtered = [ex for ex in self._cache.values() if target.lower() in ex["target_muscle"].lower() or target.lower() in ex["body_part"].lower()]
            return filtered[:limit] if filtered else list(self._cache.values())[:limit]

        headers = {
            "X-RapidAPI-Key": self.api_key,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
        }
        url = f"{self.base_url}/exercises/target/{target}"
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.get(url, headers=headers, params={"limit": limit})
                if res.status_code == 200:
                    data = res.json()
                    # Cache fetched exercises
                    for item in data:
                        self._cache[item["id"]] = item
                    return data
        except Exception as e:
            logger.error(f"Error calling ExerciseDB: {e}")

        return list(self._cache.values())[:limit]

    def get_exercise_details(self, exercise_id: str) -> Optional[Dict[str, Any]]:
        return self._cache.get(exercise_id)


exercisedb_service = ExerciseDBService()

