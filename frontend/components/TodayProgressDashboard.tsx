'use client';

import React, { useState } from 'react';
import { Flame, Check, Maximize2, ChevronLeft, ChevronRight, X, Calendar, Trophy, Dumbbell } from 'lucide-react';
import { PetCompanionCard, PetState } from './PetCompanionCard';

interface TodayProgressProps {
  pet: PetState;
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

interface MonthData {
  name: string;
  year: number;
  totalDays: number;
  startDayOfWeek: number; // 0: Mon, 1: Tue, ... 6: Sun
  completedCount: number;
  bestStreak: number;
  days: {
    dayNumber: number;
    completed: boolean;
    isToday?: boolean;
    isRestDay?: boolean;
    workoutType?: string;
  }[];
}

// Historical month data for October (current), September, August 2026
const historicalMonths: Record<number, MonthData> = {
  0: {
    name: 'Tháng 10',
    year: 2026,
    totalDays: 31,
    startDayOfWeek: 3, // Starts on Thursday
    completedCount: 22,
    bestStreak: 7,
    days: Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;
      const isToday = day === 30;
      const isFuture = day > 30;
      // Training days roughly Mon, Wed, Fri, Sat
      const isRest = [4, 11, 18, 25, 6, 13, 20, 27].includes(day);
      const completed = !isFuture && !isRest && day <= 30;
      return {
        dayNumber: day,
        completed,
        isToday,
        isRestDay: isRest,
        workoutType: isRest ? 'Nghỉ ngơi' : 'Gym Workout',
      };
    }),
  },
  [-1]: {
    name: 'Tháng 9',
    year: 2026,
    totalDays: 30,
    startDayOfWeek: 1, // Starts on Tuesday
    completedCount: 20,
    bestStreak: 6,
    days: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      const isRest = [3, 7, 10, 14, 17, 21, 24, 28].includes(day);
      return {
        dayNumber: day,
        completed: !isRest,
        isRestDay: isRest,
        workoutType: isRest ? 'Nghỉ ngơi' : 'Gym Workout',
      };
    }),
  },
  [-2]: {
    name: 'Tháng 8',
    year: 2026,
    totalDays: 31,
    startDayOfWeek: 5, // Starts on Saturday
    completedCount: 19,
    bestStreak: 5,
    days: Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;
      const isRest = [2, 5, 9, 12, 16, 19, 23, 26, 30].includes(day);
      return {
        dayNumber: day,
        completed: !isRest,
        isRestDay: isRest,
        workoutType: isRest ? 'Nghỉ ngơi' : 'Gym Workout',
      };
    }),
  },
};

export const TodayProgressDashboard: React.FC<TodayProgressProps> = ({
  pet,
  workout,
  macro,
  onGoToWorkout,
  onGoToMacro,
}) => {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [monthOffset, setMonthOffset] = useState<number>(0); // 0 = current, -1 = prev, -2 = 2 months ago

  const currentMonthData = historicalMonths[0];
  const viewedMonth = historicalMonths[monthOffset] || historicalMonths[0];

  const dayHeaders = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  return (
    <div className="flex flex-col space-y-3.5 pb-2 min-h-full">
      {/* ============================================================ */}
      {/* CARD 1: CARD STREAK LỊCH 30 NGÀY (CLICK PHÓNG TO XEM CÁC THÁNG) */}
      {/* ============================================================ */}
      <div
        onClick={() => setIsZoomed(true)}
        className="forma-card rounded-2xl p-3.5 space-y-2.5 border-emerald-500/25 cursor-pointer hover:border-emerald-500/40 transition group relative overflow-hidden active:scale-[0.99]"
        title="Chạm để phóng to lịch & xem các tháng trước"
      >
        {/* Glow corner hint */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Flame className="w-3.5 h-3.5 fill-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-white uppercase tracking-wide">
                  Chuỗi Kỷ Luật • {currentMonthData.name}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                  🔥 5 NGÀY
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono">
                {currentMonthData.completedCount}/{currentMonthData.totalDays} ngày kỷ luật • Chạm để phóng to
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-gray-400 group-hover:text-emerald-400 transition bg-black/40 border border-white/10 px-2 py-1 rounded-lg text-[10px] font-mono">
            <Maximize2 className="w-3 h-3" />
            <span>Phóng to</span>
          </div>
        </div>

        {/* Mini 30-Day Calendar Grid */}
        <div className="pt-0.5">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {dayHeaders.map((dh, idx) => (
              <span key={idx} className="text-[9px] font-mono font-semibold text-gray-500">
                {dh}
              </span>
            ))}
          </div>

          {/* 30/31 Days Cells */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty slots before month start */}
            {Array.from({ length: currentMonthData.startDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-5" />
            ))}

            {/* Month Days */}
            {currentMonthData.days.map((d) => (
              <div
                key={d.dayNumber}
                className={`h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-medium transition ${
                  d.isToday
                    ? 'bg-emerald-500 text-black font-extrabold shadow-glow-green ring-1 ring-emerald-300'
                    : d.completed
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : d.dayNumber > 30
                    ? 'bg-black/20 text-gray-600'
                    : 'bg-black/40 text-gray-500'
                }`}
              >
                {d.completed ? (
                  <Check className="w-2.5 h-2.5 stroke-[3] text-emerald-400" />
                ) : (
                  <span>{d.dayNumber}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CARD 2: BORDERLESS TAMAGOTCHI PET HERO (TRÀN 1 TRANG APP) */}
      {/* Pet ở trên, 2 Wheels HP & EXP ở DƯỚI Pet */}
      {/* ============================================================ */}
      <div className="flex-1 flex flex-col justify-between">
        <PetCompanionCard
          pet={pet}
          macro={macro}
          workout={workout}
          onGoToWorkout={onGoToWorkout}
          onGoToMacro={onGoToMacro}
        />
      </div>

      {/* ============================================================ */}
      {/* ZOOMED-IN MODAL: XEM LỊCH SỬ THÁNG TRƯỚC / SAU ĐẦY ĐỦ */}
      {/* ============================================================ */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0F1411] border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Lịch Kỷ Luật Chi Tiết</h3>
                  <p className="text-[10px] text-gray-400 font-mono">Xem lại lịch sử tập luyện các tháng</p>
                </div>
              </div>

              <button
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Month Navigator Controls */}
            <div className="flex items-center justify-between bg-black/60 border border-emerald-500/20 p-2.5 rounded-2xl">
              <button
                disabled={monthOffset <= -2}
                onClick={() => setMonthOffset((prev) => Math.max(prev - 1, -2))}
                className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-center">
                <div className="text-sm font-bold text-white tracking-wide">
                  {viewedMonth.name} / {viewedMonth.year}
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  {monthOffset === 0 ? '• Tháng Hiện Tại •' : '• Lịch Sử Đã Qua •'}
                </div>
              </div>

              <button
                disabled={monthOffset >= 0}
                onClick={() => setMonthOffset((prev) => Math.min(prev + 1, 0))}
                className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Month Metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-black/40 border border-white/5 p-2 rounded-xl text-center">
                <span className="text-[9px] text-gray-400 block font-mono">ĐÃ TẬP</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {viewedMonth.completedCount}/{viewedMonth.totalDays} ngày
                </span>
              </div>
              <div className="bg-black/40 border border-white/5 p-2 rounded-xl text-center">
                <span className="text-[9px] text-gray-400 block font-mono">TỶ LỆ</span>
                <span className="text-xs font-bold text-white font-mono">
                  {Math.round((viewedMonth.completedCount / viewedMonth.totalDays) * 100)}%
                </span>
              </div>
              <div className="bg-black/40 border border-white/5 p-2 rounded-xl text-center">
                <span className="text-[9px] text-gray-400 block font-mono">STREAK TỐT</span>
                <span className="text-xs font-bold text-yellow-400 font-mono">
                  🔥 {viewedMonth.bestStreak} ngày
                </span>
              </div>
            </div>

            {/* Enlarged 30-Day Grid */}
            <div className="bg-black/40 border border-white/5 p-3 rounded-2xl space-y-2">
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {dayHeaders.map((dh, idx) => (
                  <span key={idx} className="text-[10px] font-mono font-bold text-gray-400">
                    {dh}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: viewedMonth.startDayOfWeek }).map((_, idx) => (
                  <div key={`modal-empty-${idx}`} className="h-9" />
                ))}

                {viewedMonth.days.map((d) => (
                  <div
                    key={`modal-${d.dayNumber}`}
                    className={`h-9 rounded-xl flex flex-col items-center justify-center p-1 text-center transition ${
                      d.isToday
                        ? 'bg-emerald-500 text-black font-extrabold shadow-glow-green ring-2 ring-emerald-300'
                        : d.completed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : d.dayNumber > 30 && monthOffset === 0
                        ? 'bg-black/30 text-gray-600 border border-white/5'
                        : 'bg-black/50 text-gray-500 border border-white/5'
                    }`}
                  >
                    <span className="text-[10px] font-mono leading-none">{d.dayNumber}</span>
                    {d.completed ? (
                      <Check className="w-3 h-3 stroke-[3] text-emerald-400 mt-0.5" />
                    ) : (
                      <span className="text-[8px] opacity-40 font-mono mt-0.5">
                        {d.isRestDay ? 'Nghỉ' : '-'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Note & Close button */}
            <div className="text-[11px] text-gray-400 font-mono flex items-center space-x-1.5">
              <Trophy className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Duy trì chuỗi ngày liên tiếp giúp Pet tiến hóa nhanh hơn!</span>
            </div>

            <button
              onClick={() => setIsZoomed(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition"
            >
              Đóng Lịch Kỷ Luật
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
