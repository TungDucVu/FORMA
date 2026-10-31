-- ==============================================================================
-- FORMA AI FITNESS & NUTRITION PLATFORM - SUPABASE SCHEMA (V1)
-- ==============================================================================

-- 1. Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. PROFILES TABLE (Linked with Supabase Auth)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    display_name TEXT,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    age INTEGER CHECK (age >= 13 AND age <= 100),
    height_cm NUMERIC(5, 1) CHECK (height_cm > 50 AND height_cm < 260),
    weight_kg NUMERIC(5, 1) CHECK (weight_kg > 20 AND weight_kg < 350),
    target_weight_kg NUMERIC(5, 1),
    bodyfat_est NUMERIC(4, 1),
    activity_level TEXT DEFAULT 'moderate' CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'very_active', 'extra_active')),
    primary_goal TEXT CHECK (primary_goal IN ('cut', 'bulk', 'recomp', 'strength', 'endurance')),
    workout_days_per_week INTEGER DEFAULT 4 CHECK (workout_days_per_week BETWEEN 2 AND 7),
    experience_level TEXT DEFAULT 'beginner' CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
    equipment_type TEXT DEFAULT 'gym' CHECK (equipment_type IN ('gym', 'home_dumbbells', 'bodyweight')),
    injuries TEXT[] DEFAULT '{}',
    dietary_preferences JSONB DEFAULT '{"allergies": [], "diet_type": "standard", "meals_per_day": 3}'::JSONB,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    profile_completion_pct INTEGER DEFAULT 60,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger to auto-create profile row on Supabase Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 3. EXERCISES CACHE TABLE (Optimized from ExerciseDB)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.exercises_cache (
    id TEXT PRIMARY KEY, -- ExerciseDB ID (e.g. '0001', '0025')
    name TEXT NOT NULL,
    target_muscle TEXT NOT NULL,
    body_part TEXT NOT NULL,
    secondary_muscles TEXT[] DEFAULT '{}',
    equipment TEXT NOT NULL,
    gif_url TEXT,
    instructions TEXT[] DEFAULT '{}',
    approx_cal_per_set NUMERIC DEFAULT 15,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_exercises_target ON public.exercises_cache(target_muscle);
CREATE INDEX IF NOT EXISTS idx_exercises_body_part ON public.exercises_cache(body_part);
CREATE INDEX IF NOT EXISTS idx_exercises_equipment ON public.exercises_cache(equipment);

-- ==============================================================================
-- 4. WORKOUT PLANS & SESSIONS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.workout_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    split_name TEXT NOT NULL,
    days_per_week INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    ai_notes TEXT,
    raw_gemini_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.workout_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    day_name TEXT NOT NULL,
    focus_muscle_group TEXT NOT NULL,
    estimated_duration_mins INTEGER DEFAULT 45,
    order_index INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.workout_day_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_id UUID NOT NULL REFERENCES public.workout_days(id) ON DELETE CASCADE,
    exercise_id TEXT REFERENCES public.exercises_cache(id) ON DELETE SET NULL,
    order_index INTEGER NOT NULL,
    exercise_name TEXT NOT NULL,
    target_muscle TEXT NOT NULL,
    sets INTEGER DEFAULT 3 CHECK (sets > 0),
    rep_range TEXT DEFAULT '8-12',
    rest_seconds INTEGER DEFAULT 60,
    gif_url TEXT,
    approx_calories INTEGER DEFAULT 100,
    substitutes JSONB DEFAULT '[]'::JSONB
);

-- ==============================================================================
-- 5. DAILY NUTRITION LOGS & MEALS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.daily_nutrition_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    log_date DATE NOT NULL DEFAULT CURRENT_DATE,
    target_calories NUMERIC DEFAULT 2000,
    target_protein_g NUMERIC DEFAULT 150,
    target_carbs_g NUMERIC DEFAULT 200,
    target_fat_g NUMERIC DEFAULT 65,
    consumed_calories NUMERIC DEFAULT 0,
    consumed_protein_g NUMERIC DEFAULT 0,
    consumed_carbs_g NUMERIC DEFAULT 0,
    consumed_fat_g NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_user_daily_log UNIQUE (user_id, log_date)
);

CREATE TABLE IF NOT EXISTS public.meal_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    daily_log_id UUID NOT NULL REFERENCES public.daily_nutrition_logs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    dish_name TEXT NOT NULL,
    image_url TEXT,
    meal_type TEXT DEFAULT 'snack' CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack', 'pre_workout', 'post_workout')),
    calories NUMERIC NOT NULL DEFAULT 0,
    protein_g NUMERIC NOT NULL DEFAULT 0,
    carbs_g NUMERIC NOT NULL DEFAULT 0,
    fat_g NUMERIC NOT NULL DEFAULT 0,
    confidence_score NUMERIC DEFAULT 0.9,
    ai_ingredients_breakdown JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to automatically increment daily nutrition totals when a meal is logged
CREATE OR REPLACE FUNCTION public.update_daily_nutrition_totals()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.daily_nutrition_logs
    SET 
        consumed_calories = consumed_calories + NEW.calories,
        consumed_protein_g = consumed_protein_g + NEW.protein_g,
        consumed_carbs_g = consumed_carbs_g + NEW.carbs_g,
        consumed_fat_g = consumed_fat_g + NEW.fat_g
    WHERE id = NEW.daily_log_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_meal_inserted ON public.meal_items;
CREATE TRIGGER on_meal_inserted
    AFTER INSERT ON public.meal_items
    FOR EACH ROW EXECUTE FUNCTION public.update_daily_nutrition_totals();

-- ==============================================================================
-- 6. BODY CHECKINS & VISUAL VAULT
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.body_checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scale_weight_kg NUMERIC(5, 1) NOT NULL,
    photo_front_url TEXT,
    photo_side_url TEXT,
    estimated_bodyfat NUMERIC(4, 1),
    ai_analysis TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_day_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_nutrition_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_checkins ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only view/edit their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Exercises: readable by all authenticated users
CREATE POLICY "Exercises are viewable by all users" ON public.exercises_cache FOR SELECT USING (true);

-- Workout Plans: users can only manage their own plans
CREATE POLICY "Users manage own workout plans" ON public.workout_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users view own workout days" ON public.workout_days FOR ALL USING (
    EXISTS (SELECT 1 FROM public.workout_plans WHERE workout_plans.id = workout_days.plan_id AND workout_plans.user_id = auth.uid())
);
CREATE POLICY "Users view own workout exercises" ON public.workout_day_exercises FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.workout_days 
        JOIN public.workout_plans ON workout_plans.id = workout_days.plan_id
        WHERE workout_days.id = workout_day_exercises.day_id AND workout_plans.user_id = auth.uid()
    )
);

-- Nutrition: users can only manage their own logs
CREATE POLICY "Users manage own daily logs" ON public.daily_nutrition_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own meal items" ON public.meal_items FOR ALL USING (auth.uid() = user_id);

-- Body Checkins: private to owner only
CREATE POLICY "Users manage own checkins" ON public.body_checkins FOR ALL USING (auth.uid() = user_id);

-- ==============================================================================
-- 8. STORAGE BUCKET DEFINITIONS (SQL snippet for Supabase Dashboard)
-- ==============================================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('meal-photos', 'meal-photos', false) ON CONFLICT DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('body-vault', 'body-vault', false) ON CONFLICT DO NOTHING;

