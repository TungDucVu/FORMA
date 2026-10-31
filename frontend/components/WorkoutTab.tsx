'use client';

import React, { useState, useRef } from 'react';
import { Dumbbell, Check, Lightbulb, List, X, ChevronRight, ChevronLeft, ArrowRight, Sparkles } from 'lucide-react';

export interface ExerciseItem {
  id: string;
  name: string;
  target_muscle: string;
  sets: number;
  rep_range: string;
  gif_url: string;
  tips: string;
  approx_calories: number;
}

interface WorkoutTabProps {
  completedSetsMap: { [exerciseId: string]: number };
  onToggleSet: (exerciseId: string, setIndex: number) => void;
}

export const WorkoutTab: React.FC<WorkoutTabProps> = ({
  completedSetsMap,
  onToggleSet,
}) => {
  const exercises: ExerciseItem[] = [
    {
      id: 'ex-1',
      name: 'Incline Dumbbell Bench Press',
      target_muscle: 'Cơ Ngực Trên (Upper Pectorals)',
      sets: 4,
      rep_range: '8-10 reps',
      gif_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
      tips: 'Hạ tạ chậm 2 giây, khuỷu tay mở 45 độ so với thân, đẩy dứt khoát không khóa khớp cùi chỏ.',
      approx_calories: 110,
    },
    {
      id: 'ex-2',
      name: 'Lat Pulldown (Kéo xô rộng tay)',
      target_muscle: 'Cơ Lưng Xô (Latissimus Dorsi)',
      sets: 4,
      rep_range: '10-12 reps',
      gif_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
      tips: 'Ưỡn ngực, giữ lưng thẳng, kéo thanh đòn về xương quai xanh và siết chặt cơ lưng xô.',
      approx_calories: 95,
    },
    {
      id: 'ex-3',
      name: 'Standing Dumbbell Lateral Raise',
      target_muscle: 'Cơ Vai Giữa (Lateral Deltoid)',
      sets: 4,
      rep_range: '12-15 reps',
      gif_url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
      tips: 'Cùi chỏ hơi cong nhẹ, nâng tạ song song mặt sàn, kiểm soát pha hạ tạ từ từ.',
      approx_calories: 70,
    },
    {
      id: 'ex-4',
      name: 'Rope Tricep Cable Pushdown',
      target_muscle: 'Cơ Tay Sau (Triceps Brachii)',
      sets: 3,
      rep_range: '12-15 reps',
      gif_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
      tips: 'Cố định cùi chỏ sát mạn sườn, tách nhẹ 2 đầu dây ở điểm duỗi tay tối đa.',
      approx_calories: 60,
    },
  ];

  // Active exercise card index
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showListDrawer, setShowListDrawer] = useState<boolean>(false);

  const currentExercise = exercises[currentIndex];
  const completedCount = completedSetsMap[currentExercise.id] || 0;
  const isCurrentDone = completedCount >= currentExercise.sets;

  // Touch swipe handling
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      // Swiped from right to left -> next exercise
      handleNext();
    } else if (diff < -50) {
      // Swiped from left to right -> prev exercise
      handlePrev();
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. TOP CONTROLS & LIST ICON */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
            BUỔI 3/4 • UPPER BODY
          </span>
          <div className="flex items-center space-x-2 mt-0.5">
            <h2 className="text-xl font-extrabold text-white">Thẻ Bài Tập</h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              {currentIndex + 1} / {exercises.length}
            </span>
          </div>
        </div>

        {/* LIST ICON BUTTON TO OPEN EXERCISE DRAWER */}
        <button
          onClick={() => setShowListDrawer(true)}
          className="p-2.5 rounded-2xl bg-black/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/15 transition flex items-center space-x-1.5 shadow-glow-green/20"
          title="Xem danh sách bài tập hôm nay"
        >
          <List className="w-5 h-5 stroke-[2.5]" />
          <span className="text-xs font-mono font-bold hidden sm:inline">Danh Sách</span>
        </button>
      </div>

      {/* 2. MAIN ACTIVE SWIPE EXERCISE CARD */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`forma-card rounded-3xl p-5 border transition-all relative overflow-hidden select-none ${
          isCurrentDone ? 'border-emerald-500 shadow-glow-green/30' : 'border-white/10'
        }`}
      >
        {/* Top Badges */}
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="font-mono text-emerald-400 font-extrabold bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
            BÀI {currentIndex + 1}: {currentExercise.target_muscle.toUpperCase()}
          </span>
          <span className="text-[11px] text-gray-400 font-mono">
            🔥 ~{currentExercise.approx_calories} kcal
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-white leading-tight mb-3">
          {currentExercise.name}
        </h3>

        {/* Media GIF Container */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-black/80 border border-white/10 mb-4 group">
          <img
            src={currentExercise.gif_url}
            alt={currentExercise.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 justify-between">
            <span className="text-[11px] font-mono text-emerald-400 bg-black/70 px-2 py-0.5 rounded border border-emerald-500/30">
              GIF Kỹ Thuật Chuẩn
            </span>
            <span className="text-xs font-mono font-bold text-white bg-black/70 px-2.5 py-0.5 rounded border border-white/10">
              Mục tiêu: {currentExercise.rep_range}
            </span>
          </div>
        </div>

        {/* Technique Tip */}
        <div className="bg-black/50 rounded-xl p-3 border border-white/5 mb-4 text-xs leading-relaxed text-gray-300 flex items-start space-x-2">
          <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-emerald-400">Tips: </strong>
            {currentExercise.tips}
          </span>
        </div>

        {/* Sets Tracker - Tick Set 1, 2, 3, 4 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-gray-400">Đánh dấu Set đã hoàn tất:</span>
            <span className={isCurrentDone ? 'text-emerald-400 font-bold' : 'text-white'}>
              {completedCount} / {currentExercise.sets} Sets Xong
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: currentExercise.sets }).map((_, sIdx) => {
              const isSetDone = sIdx < completedCount;
              return (
                <button
                  key={sIdx}
                  onClick={() => onToggleSet(currentExercise.id, sIdx + 1)}
                  className={`py-3 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center space-y-1 border transition ${
                    isSetDone
                      ? 'bg-emerald-500 text-black border-emerald-400 shadow-glow-green'
                      : 'bg-black/40 text-gray-400 border-white/10 hover:border-emerald-500/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    {isSetDone ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="w-2 h-2 rounded-full bg-white/20" />}
                  </div>
                  <span>SET {sIdx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Swipe indicator / Navigation Buttons */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-3 py-2 rounded-xl text-xs font-mono font-semibold text-gray-400 hover:text-white bg-black/30 border border-white/5 disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Bài Trước</span>
          </button>

          <span className="text-[10px] text-gray-400 font-mono">
            {isCurrentDone ? '🎉 Hoàn tất! Vuốt để qua bài' : 'Vuốt ➔ để chuyển bài'}
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === exercises.length - 1}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-1 transition ${
              isCurrentDone && currentIndex < exercises.length - 1
                ? 'bg-emerald-500 text-black shadow-glow-green animate-pulse'
                : 'text-gray-400 hover:text-white bg-black/30 border border-white/5 disabled:opacity-30 disabled:pointer-events-none'
            }`}
          >
            <span>Bài Sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. EXERCISE LIST DRAWER (WHEN CLICKING LIST ICON) */}
      {showListDrawer && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-end p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md mx-auto bg-[#0F1411] border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <List className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Danh Sách Bài Tập Hôm Nay</h3>
                  <p className="text-[10px] text-gray-400 font-mono">Chạm vào bài tập để chuyển ngay</p>
                </div>
              </div>
              <button
                onClick={() => setShowListDrawer(false)}
                className="p-1 rounded-lg bg-white/5 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of exercises */}
            <div className="space-y-2.5">
              {exercises.map((ex, idx) => {
                const count = completedSetsMap[ex.id] || 0;
                const isDone = count >= ex.sets;
                const isSelected = idx === currentIndex;

                return (
                  <div
                    key={ex.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowListDrawer(false);
                    }}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 shadow-glow-green/30'
                        : isDone
                        ? 'bg-[#121A14] border-emerald-500/30 text-gray-300'
                        : 'bg-black/40 border-white/5 text-gray-400 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                          isDone
                            ? 'bg-emerald-500 text-black'
                            : isSelected
                            ? 'bg-emerald-500/30 text-emerald-400'
                            : 'bg-white/5 text-gray-400'
                        }`}
                      >
                        {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                          {ex.name}
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">
                          {ex.target_muscle} • {count}/{ex.sets} Sets
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono font-bold text-emerald-400 shrink-0 ml-2">
                      {isDone ? 'XONG' : isSelected ? 'ĐANG TẬP' : `${ex.sets} sets`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
