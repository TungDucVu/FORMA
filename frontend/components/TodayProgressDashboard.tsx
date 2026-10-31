'use client';

import React from 'react';
import { Dumbbell, Utensils, ChevronRight, Flame, Calendar as CalendarIcon, Check } from 'lucide-react';

interface TodayProgressProps {
  workout: {
    currentDay?: number;
    totalDays?: number;
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
  // Single % for workout progress (based on completed sets / total sets)
  const workoutPercent = Math.min(100, Math.round((workout.completedSets / workout.totalSets) * 100));

  // Macro percentages
  const calPercent = Math.min(100, Math.round((macro.calories.current / macro.calories.total) * 100));
  const proPercent = Math.min(100, Math.round((macro.protein.current / macro.protein.total) * 100));
  const carbPercent = Math.min(100, Math.round((macro.carb.current / macro.carb.total) * 100));
  const fatPercent = Math.min(100, Math.round((macro.fat.current / macro.fat.total) * 100));

  // Concentric ring circumferences
  // Ring 1 (Calories - Xanh lá): r = 50 -> 314.16
  const c1 = 314.16;
  const offset1 = c1 - (calPercent / 100) * c1;

  // Ring 2 (Protein - Hồng đỏ): r = 40 -> 251.33
  const c2 = 251.33;
  const offset2 = c2 - (proPercent / 100) * c2;

  // Ring 3 (Carb - Trắng): r = 30 -> 188.5
  const c3 = 188.5;
  const offset3 = c3 - (carbPercent / 100) * c3;

  // Ring 4 (Fat - Vàng): r = 20 -> 125.66
  const c4 = 125.66;
  const offset4 = c4 - (fatPercent / 100) * c4;

  // Weekly streak calendar data (Mon to Sun)
  const weekDays = [
    { day: 'T2', date: '26', completed: true },
    { day: 'T3', date: '27', completed: true },
    { day: 'T4', date: '28', completed: true },
    { day: 'T5', date: '29', completed: true },
    { day: 'T6', date: '30', completed: true, isToday: true },
    { day: 'T7', date: '31', completed: false },
    { day: 'CN', date: '01', completed: false },
  ];

  return (
    <div className="space-y-4">
      {/* 1. CARD LỊCH GHI STREAK CỦA USER */}
      <div className="forma-card rounded-3xl p-4 space-y-3 border-emerald-500/25">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Flame className="w-4 h-4 fill-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wide">Chuỗi Kỷ Luật (Streak)</span>
              <p className="text-[11px] text-gray-400 font-mono">5 Ngày Liên Tục • Tuần này</p>
            </div>
          </div>

          <div className="flex items-center space-x-1 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-mono font-bold text-emerald-400">
            <span>🔥 5 NGÀY</span>
          </div>
        </div>

        {/* 7-Day Mini Calendar */}
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {weekDays.map((d, idx) => (
            <div
              key={idx}
              className={`py-2 px-1 rounded-xl flex flex-col items-center justify-between text-center transition ${
                d.isToday
                  ? 'bg-emerald-500/20 border border-emerald-400 shadow-glow-green/30'
                  : d.completed
                  ? 'bg-black/50 border border-emerald-500/25'
                  : 'bg-black/30 border border-white/5 opacity-50'
              }`}
            >
              <span className="text-[9px] font-mono text-gray-400 font-semibold">{d.day}</span>
              <span className="text-xs font-bold font-mono text-white my-1">{d.date}</span>
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  d.completed
                    ? 'bg-emerald-500 text-black'
                    : 'bg-white/10 text-gray-600'
                }`}
              >
                {d.completed ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <span className="w-1 h-1 rounded-full bg-gray-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. REPORT TIẾN ĐỘ TẬP LUYỆN THEO % DUY NHẤT (ĐÃ TẬP / 100%) */}
      <div className="forma-card rounded-3xl p-5 flex items-center justify-between">
        <div className="space-y-1.5 pr-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Dumbbell className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-white uppercase tracking-wide">Tiến Độ Tập Luyện</span>
          </div>
          <h3 className="text-lg font-black text-white">{workout.dayName}</h3>
          <p className="text-xs font-mono text-gray-400">
            Đã hoàn thành <strong className="text-emerald-400">{workoutPercent}%</strong> / 100% mục tiêu
          </p>
          <div className="text-[11px] font-mono text-gray-500">
            {workout.completedSets} / {workout.totalSets} Sets • {workout.completedExercises} / {workout.totalExercises} Bài
          </div>
        </div>

        {/* Single Workout Progress Wheel */}
        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
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
              strokeDasharray={`${workoutPercent}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-base font-extrabold text-white font-mono leading-none">{workoutPercent}%</span>
            <span className="text-[8px] text-gray-400 font-mono mt-0.5">ĐÃ TẬP</span>
          </div>
        </div>
      </div>

      {/* 3. UNIFIED MACRO PROGRESS WHEEL WITH EXACT SPECIFIED COLORS */}
      {/* Xanh lá cho kcal (#22C55E), Hồng đỏ cho protein (#F43F5E), Trắng cho carb (#FFFFFF), Vàng cho fat (#EAB308) */}
      <div className="forma-card rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wide">Macro Hôm Nay</span>
              <p className="text-[11px] text-gray-400">Vòng tròn 4 màu dinh dưỡng</p>
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

              {/* Ring 1: Calories (XANH LÁ CÂY - #22C55E) */}
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

              {/* Ring 2: Protein (HỒNG ĐỎ - #F43F5E) */}
              <circle
                cx="60"
                cy="60"
                r="40"
                fill="none"
                stroke="#F43F5E"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={c2}
                strokeDashoffset={offset2}
                className="transition-all duration-700 ease-out"
              />

              {/* Ring 3: Carb (TRẮNG - #FFFFFF) */}
              <circle
                cx="60"
                cy="60"
                r="30"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={c3}
                strokeDashoffset={offset3}
                className="transition-all duration-700 ease-out"
              />

              {/* Ring 4: Fat (VÀNG - #EAB308) */}
              <circle
                cx="60"
                cy="60"
                r="20"
                fill="none"
                stroke="#EAB308"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={c4}
                strokeDashoffset={offset4}
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Center Summary */}
            <div className="absolute flex flex-col items-center text-center">
              <span className="text-xs font-mono text-emerald-400 font-bold">CALORIES</span>
              <span className="text-base font-extrabold text-white font-mono leading-none my-0.5">
                {macro.calories.current}
              </span>
              <span className="text-[9px] text-gray-400 font-mono">/ {macro.calories.total}</span>
            </div>
          </div>

          {/* 4 Colored Legends with exact colors */}
          <div className="w-full grid grid-cols-2 gap-2 font-mono text-xs">
            {/* Calories (Xanh lá) */}
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#22C55E] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-emerald-400 font-bold block truncate">KCAL ({calPercent}%)</span>
                <span className="text-xs font-bold text-white">
                  {macro.calories.current} <span className="text-[10px] text-gray-500 font-normal">/ {macro.calories.total}</span>
                </span>
              </div>
            </div>

            {/* Protein (Hồng đỏ) */}
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#F43F5E] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-[#F43F5E] font-bold block truncate">PROTEIN ({proPercent}%)</span>
                <span className="text-xs font-bold text-white">
                  {macro.protein.current} <span className="text-[10px] text-gray-500 font-normal">/ {macro.protein.total}g</span>
                </span>
              </div>
            </div>

            {/* Carb (Trắng) */}
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#FFFFFF] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-white font-bold block truncate">CARB ({carbPercent}%)</span>
                <span className="text-xs font-bold text-white">
                  {macro.carb.current} <span className="text-[10px] text-gray-500 font-normal">/ {macro.carb.total}g</span>
                </span>
              </div>
            </div>

            {/* Fat (Vàng) */}
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#EAB308] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-[#EAB308] font-bold block truncate">FAT ({fatPercent}%)</span>
                <span className="text-xs font-bold text-white">
                  {macro.fat.current} <span className="text-[10px] text-gray-500 font-normal">/ {macro.fat.total}g</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
