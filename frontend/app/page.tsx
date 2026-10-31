'use client';

import React, { useState } from 'react';
import { TodayProgressDashboard } from '@/components/TodayProgressDashboard';
import { WorkoutTab } from '@/components/WorkoutTab';
import { MacroTab } from '@/components/MacroTab';
import { ProfileTab } from '@/components/ProfileTab';
import { CameraUploadModal } from '@/components/CameraUploadModal';
import { OnboardingModal } from '@/components/OnboardingModal';
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

  // Toggle/increment set for an exercise
  const handleToggleSet = (exerciseId: string, setIndex: number) => {
    setCompletedSetsMap((prev) => {
      const current = prev[exerciseId] || 0;
      // If clicking current or next set, increment or toggle
      const nextCount = setIndex === current ? Math.max(0, current - 1) : setIndex;
      return { ...prev, [exerciseId]: nextCount };
    });
  };

  // Handle new meal logged from camera
  const handleConfirmMealFromCamera = (meal: any) => {
    setMacroState((prev) => ({
      calories: { ...prev.calories, current: prev.calories.current + meal.calories },
      protein: { ...prev.protein, current: prev.protein.current + meal.protein },
      carb: { ...prev.carb, current: prev.carb.current + meal.carb },
      fat: { ...prev.fat, current: prev.fat.current + meal.fat },
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
      <header className="flex items-center justify-between py-2 border-b border-white/5 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-black text-sm shadow-glow-green">
            F
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-base font-extrabold tracking-wide text-white">FORMA</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold">
                FITNESS
              </span>
            </div>
            <p className="text-[10px] text-gray-400">Intelligence Behind You</p>
          </div>
        </div>

        {/* Streak & Reset Onboarding trigger */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-mono font-bold text-emerald-400">
            <Flame className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
            <span>STREAK: 5 NGÀY</span>
          </div>

          <button
            onClick={() => setShowOnboarding(true)}
            className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
            title="Mở lại Onboarding"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN TAB CONTENT */}
      <main className="flex-1 overflow-y-auto pb-4">
        {activeTab === 'today' && (
          <TodayProgressDashboard
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
          <MacroTab onOpenAddModal={() => setShowCameraModal(true)} />
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
