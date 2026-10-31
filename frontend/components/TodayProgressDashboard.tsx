'use client';

import React from 'react';
import { Dumbbell, Utensils, ChevronRight, Flame } from 'lucide-react';

interface TodayProgressProps {
  workout: {
    currentDay: number;
    totalDays: number;
    completedExercises: number;
    totalExercises: number;
    completedSets: number;
    totalSets: number;
    dayName: string;
  };
  macro: {
    calories: { current: number; total: number };
    protein: { current: number; total: number };
    carb: { current: number; total: number };
    fat: { current: number; total: number };
  };
  onGoToWorkout: () => void;
  onGoToMacro: () => void;
}

export const TodayProgressDashboard: React.FC<TodayProgressProps> = ({
  workout,
  macro,
  onGoToWorkout,
  onGoToMacro,
}) => {
  // Percent calculations (capped at 100 for wheel stroke)
  const calPercent = Math.min(100, Math.round((macro.calories.current / macro.calories.total) * 100));
  const proPercent = Math.min(100, Math.round((macro.protein.current / macro.protein.total) * 100));
  const carbPercent = Math.min(100, Math.round((macro.carb.current / macro.carb.total) * 100));
  const fatPercent = Math.min(100, Math.round((macro.fat.current / macro.fat.total) * 100));

  const exPercent = Math.min(100, Math.round((workout.completedExercises / workout.totalExercises) * 100));
  const setPercent = Math.min(100, Math.round((workout.completedSets / workout.totalSets) * 100));
  const dayPercent = Math.min(100, Math.round((workout.currentDay / workout.totalDays) * 100));

  // Concentric ring circumferences
  // Ring 1 (Calorie): r = 50 -> 2 * PI * 50 = 314.16
  const c1 = 314.16;
  const offset1 = c1 - (calPercent / 100) * c1;

  // Ring 2 (Protein): r = 40 -> 2 * PI * 40 = 251.33
  const c2 = 251.33;
  const offset2 = c2 - (proPercent / 100) * c2;

  // Ring 3 (Carb): r = 30 -> 2 * PI * 30 = 188.5
  const c3 = 188.5;
  const offset3 = c3 - (carbPercent / 100) * c3;

  // Ring 4 (Fat): r = 20 -> 2 * PI * 20 = 125.66
  const c4 = 125.66;
  const offset4 = c4 - (fatPercent / 100) * c4;

  return (
    <div className="space-y-4">
      {/* 1. UNIFIED MACRO MULTI-RING WHEEL */}
      <div className="forma-card rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wide">Macro Hôm Nay</span>
              <p className="text-[11px] text-gray-400">Vòng tròn đa chỉ số dinh dưỡng</p>
            </div>
          </div>
          <button
            onClick={onGoToMacro}
            className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-0.5 hover:text-emerald-300 font-mono"
          >
            <span>Chi tiết</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Concentric Multi-Ring Wheel */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
          {/* SVG Multi-Ring */}
          <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {/* Background Tracks */}
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <circle cx="60" cy="60" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <circle cx="60" cy="60" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />

              {/* Ring 1: Calories (Bright Emerald Green) */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#22C55E"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={c1}
                strokeDashoffset={offset1}
                className="transition-all duration-700 ease-out"
              />

              {/* Ring 2: Protein (Mint Green) */}
              <circle
                cx="60"
                cy="60"
                r="40"
                fill="none"
                stroke="#4ADE80"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={c2}
                strokeDashoffset={offset2}
                className="transition-all duration-700 ease-out"
              />

              {/* Ring 3: Carb (Sage / Teal Green) */}
              <circle
                cx="60"
                cy="60"
                r="30"
                fill="none"
                stroke="#2DD4BF"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={c3}
                strokeDashoffset={offset3}
                className="transition-all duration-700 ease-out"
              />

              {/* Ring 4: Fat (Olive Green) */}
              <circle
                cx="60"
                cy="60"
                r="20"
                fill="none"
                stroke="#84CC16"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={c4}
                strokeDashoffset={offset4}
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Center Summary */}
            <div className="absolute flex flex-col items-center text-center">
              <Flame className="w-4 h-4 text-emerald-400 mb-0.5 fill-emerald-400" />
              <span className="text-sm font-extrabold text-white font-mono leading-none">
                {macro.calories.current}
              </span>
              <span className="text-[9px] text-gray-400 font-mono mt-0.5">/ {macro.calories.total} kcal</span>
            </div>
          </div>

          {/* Metrics Breakdown Legend (Show all current / total) */}
          <div className="w-full grid grid-cols-2 gap-2 font-mono text-xs">
            {/* Calories Legend */}
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-gray-400 block truncate">CALORIES ({calPercent}%)</span>
                <span className="text-xs font-bold text-white">
                  {macro.calories.current} <span className="text-[10px] text-gray-500 font-normal">/ {macro.calories.total}</span>
                </span>
              </div>
            </div>

            {/* Protein Legend */}
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-gray-400 block truncate">PROTEIN ({proPercent}%)</span>
                <span className="text-xs font-bold text-white">
                  {macro.protein.current} <span className="text-[10px] text-gray-500 font-normal">/ {macro.protein.total}g</span>
                </span>
              </div>
            </div>

            {/* Carb Legend */}
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-gray-400 block truncate">CARB ({carbPercent}%)</span>
                <span className="text-xs font-bold text-white">
                  {macro.carb.current} <span className="text-[10px] text-gray-500 font-normal">/ {macro.carb.total}g</span>
                </span>
              </div>
            </div>

            {/* Fat Legend */}
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-gray-400 block truncate">FAT ({fatPercent}%)</span>
                <span className="text-xs font-bold text-white">
                  {macro.fat.current} <span className="text-[10px] text-gray-500 font-normal">/ {macro.fat.total}g</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. WORKOUT PROGRESS WHEELS */}
      <div className="forma-card rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wide">Tiến Độ Tập Luyện</span>
              <p className="text-[11px] text-gray-400">{workout.dayName}</p>
            </div>
          </div>
          <button
            onClick={onGoToWorkout}
            className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-0.5 hover:text-emerald-300 font-mono"
          >
            <span>Vào tập</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Wheels: Ngày tập, Bài đã tập, Sets đã tập */}
        <div className="grid grid-cols-3 gap-3 pt-1">
          {/* Wheel 1: Ngày tập */}
          <div className="bg-black/40 p-3 rounded-2xl border border-white/5 flex flex-col items-center text-center">
            <div className="relative w-16 h-16 flex items-center justify-center mb-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-700 ease-out"
                  strokeDasharray={`${dayPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-xs font-mono font-extrabold text-white">
                {workout.currentDay}/{workout.totalDays}
              </div>
            </div>
            <span className="text-[10px] font-mono text-gray-400">NGÀY TẬP</span>
            <span className="text-[11px] font-mono font-bold text-emerald-400 mt-0.5">{dayPercent}%</span>
          </div>

          {/* Wheel 2: Bài đã tập */}
          <div className="bg-black/40 p-3 rounded-2xl border border-white/5 flex flex-col items-center text-center">
            <div className="relative w-16 h-16 flex items-center justify-center mb-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400 transition-all duration-700 ease-out"
                  strokeDasharray={`${exPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-xs font-mono font-extrabold text-emerald-400">
                {workout.completedExercises}/{workout.totalExercises}
              </div>
            </div>
            <span className="text-[10px] font-mono text-gray-400">BÀI ĐÃ TẬP</span>
            <span className="text-[11px] font-mono font-bold text-emerald-400 mt-0.5">{exPercent}%</span>
          </div>

          {/* Wheel 3: Sets đã tập */}
          <div className="bg-black/40 p-3 rounded-2xl border border-white/5 flex flex-col items-center text-center">
            <div className="relative w-16 h-16 flex items-center justify-center mb-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-700 ease-out"
                  strokeDasharray={`${setPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-xs font-mono font-extrabold text-white">
                {workout.completedSets}/{workout.totalSets}
              </div>
            </div>
            <span className="text-[10px] font-mono text-gray-400">SETS ĐÃ TẬP</span>
            <span className="text-[11px] font-mono font-bold text-emerald-400 mt-0.5">{setPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
