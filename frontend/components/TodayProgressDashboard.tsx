'use client';

import React from 'react';
import { Flame, Check } from 'lucide-react';
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

export const TodayProgressDashboard: React.FC<TodayProgressProps> = ({
  pet,
  workout,
  macro,
  onGoToWorkout,
  onGoToMacro,
}) => {
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
      {/* ============================================================ */}
      {/* CARD 1: STREAK CALENDAR CARD (NẰM Ở TRÊN CÙNG) */}
      {/* ============================================================ */}
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

      {/* ============================================================ */}
      {/* CARD 2: BORDERLESS TAMAGOTCHI PET COMPANION (TRUNG TÂM) */}
      {/* Chứa 2 Wheels HP & EXP, click mở Popup Macro & Workout */}
      {/* ============================================================ */}
      <PetCompanionCard
        pet={pet}
        macro={macro}
        workout={workout}
        onGoToWorkout={onGoToWorkout}
        onGoToMacro={onGoToMacro}
      />
    </div>
  );
};
