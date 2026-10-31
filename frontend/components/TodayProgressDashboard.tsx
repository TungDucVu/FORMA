'use client';

import React from 'react';
import { Dumbbell, Utensils, CheckCircle2, ChevronRight, ArrowUpRight } from 'lucide-react';

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
  const calPercent = Math.min(100, Math.round((macro.calories.current / macro.calories.total) * 100));
  const proPercent = Math.min(100, Math.round((macro.protein.current / macro.protein.total) * 100));
  const carbPercent = Math.min(100, Math.round((macro.carb.current / macro.carb.total) * 100));
  const fatPercent = Math.min(100, Math.round((macro.fat.current / macro.fat.total) * 100));

  const exercisePercent = Math.min(100, Math.round((workout.completedExercises / workout.totalExercises) * 100));
  const setsPercent = Math.min(100, Math.round((workout.completedSets / workout.totalSets) * 100));

  // Overall daily adherence score
  const overallScore = Math.round((calPercent * 0.5) + (setsPercent * 0.5));

  return (
    <div className="space-y-4">
      {/* 1. HERO CIRCULAR PROGRESS WHEEL */}
      <div className="forma-card rounded-3xl p-5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              TIẾN ĐỘ HÔM NAY
            </span>
            <h2 className="text-xl font-extrabold text-white">Chinh Phục Mục Tiêu</h2>
            <p className="text-xs text-gray-400">Đã hoàn thành {overallScore}% kế hoạch trong ngày</p>
          </div>

          {/* Radial Progress Wheel (Strict Green & Dark) */}
          <div className="relative w-20 h-20 flex items-center justify-center">
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
                strokeDasharray={`${overallScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-base font-extrabold text-white font-mono">{overallScore}%</span>
              <span className="text-[9px] text-gray-400 font-mono">HOÀN TẤT</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CHỈ SỐ TẬP LUYỆN (HIỆN TẠI / TỔNG) */}
      <div className="forma-card rounded-2xl p-4 space-y-3">
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
            className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-0.5 hover:text-emerald-300"
          >
            <span>Chi tiết</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Metrics: Ngày tập, Số bài, Số sets */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
          <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-400 block mb-0.5">NGÀY TẬP</span>
            <span className="text-sm font-bold text-white">
              {workout.currentDay} <span className="text-xs text-gray-500 font-normal">/ {workout.totalDays}</span>
            </span>
          </div>

          <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-400 block mb-0.5">BÀI ĐÃ TẬP</span>
            <span className="text-sm font-bold text-emerald-400">
              {workout.completedExercises} <span className="text-xs text-gray-500 font-normal">/ {workout.totalExercises}</span>
            </span>
          </div>

          <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-400 block mb-0.5">SETS ĐÃ TẬP</span>
            <span className="text-sm font-bold text-white">
              {workout.completedSets} <span className="text-xs text-gray-500 font-normal">/ {workout.totalSets}</span>
            </span>
          </div>
        </div>

        {/* Workout Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-gray-400">Tỷ lệ hoàn thành buổi tập</span>
            <span className="text-emerald-400 font-bold">{exercisePercent}%</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${exercisePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. CHỈ SỐ MACRO & CALO (HIỆN TẠI / TỔNG ĐẦY ĐỦ CẢ 4 CHỈ SỐ) */}
      <div className="forma-card rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wide">Dinh Dưỡng Hôm Nay</span>
              <p className="text-[11px] text-gray-400">Đã nạp / Mục tiêu tiêu chuẩn</p>
            </div>
          </div>
          <button
            onClick={onGoToMacro}
            className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-0.5 hover:text-emerald-300"
          >
            <span>Nhật ký ăn</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 1. CALORIES TRACK */}
        <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-1.5">
          <div className="flex justify-between items-baseline font-mono">
            <span className="text-xs font-bold text-white">NĂNG LƯỢNG (CALORIES)</span>
            <span className="text-sm font-extrabold text-emerald-400">
              {macro.calories.current} <span className="text-xs text-gray-500 font-normal">/ {macro.calories.total} kcal</span>
            </span>
          </div>
          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${calPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>Còn lại: {Math.max(0, macro.calories.total - macro.calories.current)} kcal</span>
            <span>{calPercent}% đạt chuẩn</span>
          </div>
        </div>

        {/* 2. PROTEIN, CARB, FAT TRACKS (3 COLUMNS WITH CURRENT / TOTAL) */}
        <div className="grid grid-cols-3 gap-2">
          {/* Protein */}
          <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                <span className="font-bold text-emerald-400">PROTEIN</span>
                <span>{proPercent}%</span>
              </div>
              <div className="text-xs font-bold text-white font-mono">
                {macro.protein.current} <span className="text-[10px] text-gray-500 font-normal">/ {macro.protein.total}g</span>
              </div>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-emerald-400 h-full" style={{ width: `${proPercent}%` }} />
            </div>
          </div>

          {/* Carb */}
          <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                <span className="font-bold text-white">CARB</span>
                <span>{carbPercent}%</span>
              </div>
              <div className="text-xs font-bold text-white font-mono">
                {macro.carb.current} <span className="text-[10px] text-gray-500 font-normal">/ {macro.carb.total}g</span>
              </div>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-emerald-500 h-full" style={{ width: `${carbPercent}%` }} />
            </div>
          </div>

          {/* Fat */}
          <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                <span className="font-bold text-white">FAT</span>
                <span>{fatPercent}%</span>
              </div>
              <div className="text-xs font-bold text-white font-mono">
                {macro.fat.current} <span className="text-[10px] text-gray-500 font-normal">/ {macro.fat.total}g</span>
              </div>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-emerald-600 h-full" style={{ width: `${fatPercent}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

