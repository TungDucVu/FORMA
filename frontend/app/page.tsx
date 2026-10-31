'use client';

import React, { useState } from 'react';
import { TodayProgressDashboard } from '@/components/TodayProgressDashboard';
import { WorkoutTab } from '@/components/WorkoutTab';
import { MacroTab } from '@/components/MacroTab';
import { ProfileTab } from '@/components/ProfileTab';
import { CameraUploadModal } from '@/components/CameraUploadModal';
import { OnboardingModal } from '@/components/OnboardingModal';
import { PetState } from '@/components/PetCompanionCard';
import {
  Calendar,
  Dumbbell,
  Camera,
  Utensils,
  User,
  Flame,
  RotateCcw
} from 'lucide-react';

export default function Home() {
  // Navigation active tab: 'today' | 'workout' | 'macro' | 'profile'
  const [activeTab, setActiveTab] = useState<'today' | 'workout' | 'macro' | 'profile'>('today');

  // Modals state
  const [showCameraModal, setShowCameraModal] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Global Mock Workout State
  const [completedSetsMap, setCompletedSetsMap] = useState<{ [id: string]: number }>({
    'ex-1': 4, // 4/4 sets done
    'ex-2': 2, // 2/4 sets done
    'ex-3': 0, // 0/4 sets done
    'ex-4': 0, // 0/3 sets done
  });

  // Global Mock Macro State
  const [macroState, setMacroState] = useState({
    calories: { current: 1850, total: 2400 },
    protein: { current: 142, total: 175 },
    carb: { current: 205, total: 260 },
    fat: { current: 51, total: 65 },
  });

  // Calculate HP Regen from exact Macro KPI formula:
  // HP% = 100 * (0.25 * rKcal + 0.25 * rProtein + 0.25 * rCarb + 0.25 * rFat)
  const calculatePetHp = (macros: typeof macroState) => {
    if (macros.calories.current === 0 && macros.protein.current === 0) return 0;
    const rKcal = Math.min(1.0, macros.calories.current / macros.calories.total);
    const rPro = Math.min(1.0, macros.protein.current / macros.protein.total);
    const rCarb = Math.min(1.0, macros.carb.current / macros.carb.total);
    const rFat = Math.min(1.0, macros.fat.current / macros.fat.total);
    return Math.round(100 * (0.25 * rKcal + 0.25 * rPro + 0.25 * rCarb + 0.25 * rFat));
  };

  // Global Tamagotchi Pet State
  const [petState, setPetState] = useState<PetState>({
    name: 'DRAGO',
    species: 'Cyber Dragon',
    level: 4,
    currentXp: 650,
    nextLevelXp: 1000,
    hp: 79, // Initial calculated from current macros (1850/2400, 142/175, 205/260, 51/65)
    maxHp: 100,
    str: 145,
    evolutionStage: 'Giai Đoạn 1: Novice',
    mood: 'energetic',
  });

  // Toggle/increment set for an exercise + Give XP & STR to Pet!
  const handleToggleSet = (exerciseId: string, setIndex: number) => {
    setCompletedSetsMap((prev) => {
      const current = prev[exerciseId] || 0;
      const isCompleting = setIndex > current;
      const nextCount = setIndex === current ? Math.max(0, current - 1) : setIndex;

      // If user completes a set, feed XP and STR to the pet!
      if (isCompleting) {
        setPetState((p) => {
          const gainedXp = p.currentXp + 35;
          if (gainedXp >= p.nextLevelXp) {
            // Level up!
            return {
              ...p,
              level: p.level + 1,
              currentXp: gainedXp - p.nextLevelXp,
              nextLevelXp: Math.round(p.nextLevelXp * 1.3),
              str: p.str + 8,
              evolutionStage: p.level + 1 >= 5 ? 'Giai Đoạn 2: Iron Warrior' : p.evolutionStage,
            };
          }
          return {
            ...p,
            currentXp: gainedXp,
            str: p.str + 2,
          };
        });
      }

      return { ...prev, [exerciseId]: nextCount };
    });
  };

  // Handle new meal logged from camera or recipe + Regenerate Pet HP by exact Formula!
  const handleConfirmMealFromCamera = (meal: any) => {
    const nextMacros = {
      calories: { ...macroState.calories, current: macroState.calories.current + meal.calories },
      protein: { ...macroState.protein, current: macroState.protein.current + meal.protein },
      carb: { ...macroState.carb, current: macroState.carb.current + meal.carb },
      fat: { ...macroState.fat, current: macroState.fat.current + meal.fat },
    };

    setMacroState(nextMacros);

    // Recalculate Pet HP by exact formula and add bonus XP for feeding!
    const regeneratedHp = calculatePetHp(nextMacros);
    setPetState((p) => ({
      ...p,
      hp: regeneratedHp,
      currentXp: Math.min(p.nextLevelXp, p.currentXp + 45),
    }));
  };

  // Calculate current workout summary
  const totalExercises = 4;
  const completedExercises = Object.values(completedSetsMap).filter((cnt) => cnt >= 3).length;
  const totalSets = 15; // 4 + 4 + 4 + 3
  const completedSets = Object.values(completedSetsMap).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen-ios flex flex-col justify-between pb-24 px-4 pt-3 relative bg-[#090D0B]">
      
      {/* TOP HEADER */}
      <header className="flex items-center space-x-3 py-2.5 border-b border-white/5 mb-3">
        <img
          src="/logo.png"
          alt="FORMA Logo"
          className="w-10 h-10 rounded-xl object-contain shadow-glow-green"
        />
        <div className="flex flex-col justify-center">
          <span className="text-base font-black tracking-wider text-white leading-tight">FORMA</span>
          <p className="text-[10px] font-mono text-gray-400 leading-tight">Intelligence Behind Your Transformation</p>
        </div>
      </header>

      {/* MAIN TAB CONTENT */}
      <main className="flex-1 overflow-y-auto pb-4">
        {activeTab === 'today' && (
          <TodayProgressDashboard
            pet={petState}
            workout={{
              currentDay: 3,
              totalDays: 4,
              completedExercises,
              totalExercises,
              completedSets,
              totalSets,
              dayName: 'Upper Body Push & Pull',
            }}
            macro={macroState}
            onGoToWorkout={() => setActiveTab('workout')}
            onGoToMacro={() => setActiveTab('macro')}
          />
        )}

        {activeTab === 'workout' && (
          <WorkoutTab
            completedSetsMap={completedSetsMap}
            onToggleSet={handleToggleSet}
          />
        )}

        {activeTab === 'macro' && (
          <MacroTab
            onOpenAddModal={() => setShowCameraModal(true)}
            onLogSuggestedMeal={handleConfirmMealFromCamera}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab onReopenOnboarding={() => setShowOnboarding(true)} />
        )}
      </main>

      {/* BOTTOM MOBILE NAVIGATION DOCK (4 TABS + CENTER CAMERA) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0C120E]/95 backdrop-blur-xl border-t border-emerald-500/20 max-w-md mx-auto py-2 px-5 flex items-center justify-between">
        
        {/* Tab 1: Hôm nay */}
        <button
          onClick={() => setActiveTab('today')}
          className={`flex flex-col items-center space-y-1 transition ${
            activeTab === 'today' ? 'text-emerald-400 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px]">Hôm nay</span>
        </button>

        {/* Tab 2: Tập luyện */}
        <button
          onClick={() => setActiveTab('workout')}
          className={`flex flex-col items-center space-y-1 transition ${
            activeTab === 'workout' ? 'text-emerald-400 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Dumbbell className="w-5 h-5" />
          <span className="text-[10px]">Tập luyện</span>
        </button>

        {/* CENTER CAMERA BUTTON */}
        <button
          onClick={() => setShowCameraModal(true)}
          className="w-12 h-12 -mt-5 rounded-2xl bg-emerald-500 text-black flex items-center justify-center shadow-glow-green hover:bg-emerald-400 active:scale-95 transition"
          title="Chụp ảnh món ăn hoặc vóc dáng"
        >
          <Camera className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Tab 3: Macro */}
        <button
          onClick={() => setActiveTab('macro')}
          className={`flex flex-col items-center space-y-1 transition ${
            activeTab === 'macro' ? 'text-emerald-400 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px]">Macro</span>
        </button>

        {/* Tab 4: Hồ sơ */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center space-y-1 transition ${
            activeTab === 'profile' ? 'text-emerald-400 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Hồ sơ</span>
        </button>
      </nav>

      {/* CAMERA UPLOAD MODAL (PLACEHOLDER) */}
      <CameraUploadModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onConfirmMeal={handleConfirmMealFromCamera}
      />

      {/* ONBOARDING MODAL */}
      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={(data) => {
          setShowOnboarding(false);
          if (data.primary_goal === 'bulk') {
            setMacroState({
              calories: { current: 1850, total: 2750 },
              protein: { current: 142, total: 185 },
              carb: { current: 205, total: 310 },
              fat: { current: 51, total: 70 },
            });
          }
        }}
      />
    </div>
  );
}
