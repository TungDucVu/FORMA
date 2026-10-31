'use client';

import React, { useState, useRef } from 'react';
import { Dumbbell, Check, Lightbulb, List, X, ChevronRight, ChevronLeft, Info, Play, Sparkles, BookOpen } from 'lucide-react';

export interface ExerciseItem {
  id: string;
  name: string;
  target_muscle: string;
  secondary_muscles: string;
  sets: number;
  rep_range: string;
  image_url: string;
  tutorial_gif: string;
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
      secondary_muscles: 'Cơ Vai Trước, Cơ Tay Sau',
      sets: 4,
      rep_range: '8-10 reps',
      image_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=80',
      tutorial_gif: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=80',
      tips: 'Hạ tạ chậm 2 giây có kiểm soát. Mở cùi chỏ một góc 45 độ so với thân để tối ưu lực ngực trên và triệt tiêu áp lực lên khớp vai.',
      approx_calories: 110,
    },
    {
      id: 'ex-2',
      name: 'Lat Pulldown (Kéo Xô Rộng Tay)',
      target_muscle: 'Cơ Lưng Xô (Latissimus Dorsi)',
      secondary_muscles: 'Cơ Tay Trước (Biceps), Cơ Lưng Giữa',
      sets: 4,
      rep_range: '10-12 reps',
      image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
      tutorial_gif: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
      tips: 'Ưỡn ngực, giữ lưng thẳng tự nhiên. Kéo thanh đòn về phía xương quai xanh và siết chặt cơ lưng xô ở đáy 1 giây.',
      approx_calories: 95,
    },
    {
      id: 'ex-3',
      name: 'Standing Dumbbell Lateral Raise',
      target_muscle: 'Cơ Vai Giữa (Lateral Deltoid)',
      secondary_muscles: 'Cơ Cầu Vai (Trapezius)',
      sets: 4,
      rep_range: '12-15 reps',
      image_url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=700&q=80',
      tutorial_gif: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=700&q=80',
      tips: 'Cùi chỏ hơi cong nhẹ và cố định góc độ. Nâng tạ bằng cách dẫn động từ cùi chỏ lên ngang vai, không nhún người lấy đà.',
      approx_calories: 70,
    },
    {
      id: 'ex-4',
      name: 'Rope Tricep Cable Pushdown',
      target_muscle: 'Cơ Tay Sau (Triceps Brachii)',
      secondary_muscles: 'Cẳng Tay',
      sets: 3,
      rep_range: '12-15 reps',
      image_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80',
      tutorial_gif: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80',
      tips: 'Ép chặt cùi chỏ sát mạn sườn trong suốt động tác. Tách nhẹ 2 đầu dây ở điểm duỗi thẳng tay để cô lập đầu ngoài cơ tay sau.',
      approx_calories: 60,
    },
  ];

  // Active exercise card index
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showTutorialModal, setShowTutorialModal] = useState<boolean>(false);
  const [showListDrawer, setShowListDrawer] = useState<boolean>(false);

  const currentExercise = exercises[currentIndex];
  const completedCount = completedSetsMap[currentExercise.id] || 0;
  const isCurrentDone = completedCount >= currentExercise.sets;

  // Touch swipe handling (like Tinder/Bumble: swipe right-to-left to next)
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      // Swiped right-to-left -> Next exercise
      handleNext();
    } else if (diff < -45) {
      // Swiped left-to-right -> Prev exercise
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
    <div className="space-y-3">
      {/* 1. TOP HEADER & LIST BUTTON */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
            BUỔI 3/4 • UPPER BODY
          </span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">Tập Luyện Hôm Nay</h2>
        </div>

        {/* LIST ICON BUTTON TO OPEN EXERCISE DRAWER */}
        <button
          onClick={() => setShowListDrawer(true)}
          className="p-2.5 rounded-2xl bg-black/50 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/15 transition flex items-center space-x-1.5 shadow-glow-green/20"
          title="Xem danh sách bài tập hôm nay"
        >
          <List className="w-5 h-5 stroke-[2.5]" />
          <span className="text-xs font-mono font-bold hidden sm:inline">Danh Sách</span>
        </button>
      </div>

      {/* 2. TINDER / BUMBLE STYLE CARD */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full h-[520px] rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between shadow-2xl ${
          isCurrentDone
            ? 'border-emerald-500 shadow-glow-green/30'
            : 'border-emerald-500/20'
        }`}
      >
        {/* Background Exercise Photo (Clean visual like Tinder/Bumble) */}
        <img
          src={currentExercise.image_url}
          alt={currentExercise.name}
          className="absolute inset-0 w-full h-full object-cover select-none"
        />

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

        {/* TOP OVERLAY: PROGRESS TRACK (SỐ BÀI ĐÃ TẬP / TỔNG BÀI - TINDER/STORY STYLE) */}
        <div className="relative z-10 p-4 space-y-2">
          {/* Segmented Progress Track bars */}
          <div className="grid grid-cols-4 gap-1.5 w-full">
            {exercises.map((ex, idx) => {
              const isExDone = (completedSetsMap[ex.id] || 0) >= ex.sets;
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={ex.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className="h-1.5 rounded-full overflow-hidden bg-white/20 cursor-pointer"
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      isExDone
                        ? 'bg-emerald-400 w-full'
                        : isCurrent
                        ? 'bg-white w-full'
                        : 'w-0'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Progress Track Title: Bài X / Y */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-extrabold bg-black/60 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
              BÀI {currentIndex + 1} / {exercises.length}
            </span>
            <span className="text-gray-300 font-semibold bg-black/60 px-2.5 py-0.5 rounded-lg border border-white/10">
              {Object.values(completedSetsMap).filter((c) => c >= 3).length} / {exercises.length} bài xong
            </span>
          </div>
        </div>

        {/* BOTTOM OVERLAY: BUMBLE / TINDER STYLE ESSENTIAL INFO & SETS TICK BOXES */}
        <div className="relative z-10 p-5 space-y-3.5 bg-gradient-to-t from-black via-black/90 to-transparent pt-8">
          
          {/* Exercise Title & Info Trigger */}
          <div
            onClick={() => setShowTutorialModal(true)}
            className="cursor-pointer group flex items-start justify-between gap-3"
          >
            <div className="flex-1">
              <h3 className="text-2xl font-black text-white leading-tight group-hover:text-emerald-400 transition">
                {currentExercise.name}
              </h3>
              <p className="text-xs font-mono text-emerald-400 font-bold mt-1 flex items-center space-x-1">
                <span>Mục tiêu: {currentExercise.rep_range}</span>
                <span>•</span>
                <span className="underline text-gray-300 flex items-center">
                  Xem Tutorial <ChevronRight className="w-3.5 h-3.5 ml-0.5 inline" />
                </span>
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTutorialModal(true);
              }}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-emerald-500/20 text-white border border-white/20 transition shrink-0"
              title="Xem tutorial và nhóm cơ tác động"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>

          {/* SETS TICK BOXES: Set 1, Set 2, Set 3, Set 4 */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs font-mono text-gray-300">
              <span className="text-gray-400">Đánh dấu Set hoàn thành:</span>
              <span className={isCurrentDone ? 'text-emerald-400 font-bold' : 'text-white'}>
                {completedCount} / {currentExercise.sets} Sets
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: currentExercise.sets }).map((_, sIdx) => {
                const isSetDone = sIdx < completedCount;
                return (
                  <button
                    key={sIdx}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSet(currentExercise.id, sIdx + 1);
                    }}
                    className={`py-3 rounded-2xl text-xs font-mono font-extrabold flex flex-col items-center justify-center space-y-1 border transition active:scale-95 ${
                      isSetDone
                        ? 'bg-emerald-500 text-black border-emerald-400 shadow-glow-green'
                        : 'bg-black/60 text-gray-300 border-white/20 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      {isSetDone ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                      )}
                    </div>
                    <span>SET {sIdx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Swipe indicator bar */}
          <div className="pt-2 flex items-center justify-between text-xs font-mono text-gray-400">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-2 py-1 text-gray-400 hover:text-white disabled:opacity-20 flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Trước</span>
            </button>

            <span className="text-[10px] text-gray-300">
              {isCurrentDone ? '🎉 Xong! Vuốt sang trái để qua bài' : 'Vuốt sang trái để chuyển bài ➔'}
            </span>

            <button
              onClick={handleNext}
              disabled={currentIndex === exercises.length - 1}
              className={`px-3 py-1 rounded-xl font-bold flex items-center space-x-1 transition ${
                isCurrentDone && currentIndex < exercises.length - 1
                  ? 'bg-emerald-500 text-black shadow-glow-green animate-pulse'
                  : 'text-gray-400 hover:text-white disabled:opacity-20'
              }`}
            >
              <span>Sau</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. TUTORIAL & MUSCLE INFO MODAL (OPENS WHEN CLICKING THE CARD) */}
      {showTutorialModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0F1411] border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col max-h-[88vh] overflow-y-auto space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    TUTORIAL & THÔNG TIN BÀI TẬP
                  </span>
                  <h3 className="text-base font-extrabold text-white truncate max-w-[240px]">
                    {currentExercise.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setShowTutorialModal(false)}
                className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tutorial GIF / Media Container */}
            <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-black border border-white/10">
              <img
                src={currentExercise.tutorial_gif}
                alt={currentExercise.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                GIF Minh Họa Kỹ Thuật
              </div>
            </div>

            {/* Muscle Groups Information */}
            <div className="bg-black/40 rounded-2xl p-3.5 border border-white/5 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                Nhóm Cơ Tác Động
              </span>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Cơ chính (Target Muscle):</span>
                <span className="font-bold text-white font-mono">{currentExercise.target_muscle}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Cơ phụ trợ (Secondary):</span>
                <span className="font-bold text-gray-300 font-mono">{currentExercise.secondary_muscles}</span>
              </div>
            </div>

            {/* Training Tips & Cues */}
            <div className="bg-black/40 rounded-2xl p-3.5 border border-white/5 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>Tips Kỹ Thuật & Lưu Ý Khớp</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed pt-1">
                {currentExercise.tips}
              </p>
            </div>

            {/* Reps and Calorie specs */}
            <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 block mb-0.5">SỐ REPS CHUẨN</span>
                <span className="font-extrabold text-white">{currentExercise.rep_range}</span>
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 block mb-0.5">ƯỚC TÍNH TIÊU HAO</span>
                <span className="font-extrabold text-emerald-400">~{currentExercise.approx_calories} kcal</span>
              </div>
            </div>

            {/* Close / Return Button */}
            <button
              onClick={() => setShowTutorialModal(false)}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-glow-green transition"
            >
              <span>QUAY LẠI BUỔI TẬP</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. LIST DRAWER (FOR QUICK JUMPING) */}
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

            {/* List */}
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
