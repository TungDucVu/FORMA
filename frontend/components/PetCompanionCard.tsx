'use client';

import React, { useState } from 'react';
import { Zap, Sparkles, Award, Utensils, Dumbbell, X, ChevronRight, Check, Flame } from 'lucide-react';

export interface PetState {
  name: string;
  species: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  hp: number;
  maxHp: number;
  str: number;
  evolutionStage: string;
  mood: 'energetic' | 'training' | 'hungry' | 'sleeping';
}

interface PetCompanionCardProps {
  pet: PetState;
  macro: {
    calories: { current: number; total: number };
    protein: { current: number; total: number };
    carb: { current: number; total: number };
    fat: { current: number; total: number };
  };
  workout: {
    completedExercises: number;
    totalExercises: number;
    completedSets: number;
    totalSets: number;
    dayName: string;
  };
  onPetClick?: () => void;
  onGoToWorkout?: () => void;
  onGoToMacro?: () => void;
}

export const PetCompanionCard: React.FC<PetCompanionCardProps> = ({
  pet,
  macro,
  workout,
  onPetClick,
  onGoToWorkout,
  onGoToMacro,
}) => {
  const [dialogue, setDialogue] = useState<string>('Chào Vũ Minh! Hãy tập 1 set để mình cùng lên cơ nào! 🔥');
  const [isFlexing, setIsFlexing] = useState<boolean>(false);

  // Modals for Wheel Popups
  const [showMacroModal, setShowMacroModal] = useState<boolean>(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState<boolean>(false);

  // EXP & HP Percentages
  const xpPercent = Math.min(100, Math.round((pet.currentXp / pet.nextLevelXp) * 100));
  const hpPercent = Math.min(100, Math.round(pet.hp)); // calculated dynamically from formula

  // Workout %
  const workoutPercent = Math.min(100, Math.round((workout.completedSets / workout.totalSets) * 100));

  // Concentric ring circumferences for Macro Popup Wheel
  const calPercent = Math.min(100, Math.round((macro.calories.current / macro.calories.total) * 100));
  const proPercent = Math.min(100, Math.round((macro.protein.current / macro.protein.total) * 100));
  const carbPercent = Math.min(100, Math.round((macro.carb.current / macro.carb.total) * 100));
  const fatPercent = Math.min(100, Math.round((macro.fat.current / macro.fat.total) * 100));

  const c1 = 314.16;
  const offset1 = c1 - (calPercent / 100) * c1;
  const c2 = 251.33;
  const offset2 = c2 - (proPercent / 100) * c2;
  const c3 = 188.5;
  const offset3 = c3 - (carbPercent / 100) * c3;
  const c4 = 125.66;
  const offset4 = c4 - (fatPercent / 100) * c4;

  const dialogues = [
    'Mình cảm thấy rất sung sức! Cùng cày nát buổi tập hôm nay nhé! 💪',
    'Mỗi rep tạ của bạn đều truyền sức mạnh trực tiếp cho mình! ⚡',
    'Đừng quên nạp đủ Protein để mình hồi phục cơ bắp đấy nhé! 🥩',
    'Streak 5 ngày rồi! Sắp tiến hóa lên hình thái mới rồi bạn ơi! 🐉',
    'Gồng cơ lên nào! Hôm nay là ngày để bứt phá giới hạn! 💥',
  ];

  const handleTapPet = () => {
    setIsFlexing(true);
    const randomMsg = dialogues[Math.floor(Math.random() * dialogues.length)];
    setDialogue(randomMsg);
    setTimeout(() => setIsFlexing(false), 600);
    if (onPetClick) onPetClick();
  };

  return (
    <div className="relative overflow-hidden py-3 px-2 flex flex-col items-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP: PET NAME & STAGE BADGE (BORDERLESS) */}
      <div className="w-full flex items-center justify-between pb-2 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-extrabold text-xs shadow-glow-green">
            ⚡
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h2 className="text-lg font-black text-white tracking-wide">{pet.name}</h2>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                {pet.evolutionStage}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-mono">Chạm vào Pet để tương tác</p>
          </div>
        </div>

        <div className="bg-black/60 border border-emerald-500/30 px-2.5 py-1 rounded-xl text-xs font-mono font-black text-emerald-400 flex items-center space-x-1">
          <Award className="w-3.5 h-3.5" />
          <span>LV. {pet.level}</span>
        </div>
      </div>

      {/* SPEECH BUBBLE */}
      <div className="relative z-10 my-1 px-4 py-2 rounded-2xl bg-black/80 border border-emerald-500/30 text-xs text-gray-200 text-center max-w-xs shadow-lg animate-in fade-in duration-300">
        <p className="leading-relaxed font-medium">
          <span className="text-emerald-400 font-bold mr-1">💬</span>
          {dialogue}
        </p>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/80 border-b border-r border-emerald-500/30 rotate-45" />
      </div>

      {/* CENTER: BORDERLESS PET & 2 FLANKING WHEELS (HP & EXP) */}
      <div className="w-full py-4 flex items-center justify-between relative z-10">
        
        {/* LEFT: HP WHEEL (NĂNG LƯỢNG SINH TỒN) - CLICK TO POPUP MACRO */}
        <div
          onClick={() => setShowMacroModal(true)}
          className="flex flex-col items-center cursor-pointer group active:scale-95 transition"
          title="Bấm để xem chi tiết Macro"
        >
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
                className="text-yellow-400 transition-all duration-700 ease-out"
                strokeDasharray={`${hpPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mb-0.5" />
              <span className="text-xs font-mono font-black text-white leading-none">{hpPercent}%</span>
              <span className="text-[8px] font-mono text-gray-400 mt-0.5">HP</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold mt-1.5 group-hover:underline flex items-center">
            <span>Macro</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        {/* CENTER: INTERACTIVE PET AVATAR */}
        <div
          onClick={handleTapPet}
          className={`cursor-pointer transform transition-transform duration-300 relative group shrink-0 ${
            isFlexing ? 'scale-115 -rotate-3' : 'hover:scale-105 active:scale-95'
          }`}
          title="Chạm vào Pet để tương tác"
        >
          {/* Pulsing Aura */}
          <div className="absolute inset-0 bg-emerald-500/25 rounded-full blur-2xl animate-pulse" />

          {/* Character SVG */}
          <svg className="w-40 h-40 relative z-10 drop-shadow-[0_12px_24px_rgba(34,197,94,0.4)]" viewBox="0 0 160 160">
            {/* Dragon Wings */}
            <path
              d="M30 65 Q 10 40 40 30 Q 55 50 45 75 Z"
              fill="#15803D"
              stroke="#22C55E"
              strokeWidth="2.5"
              className="animate-pulse"
            />
            <path
              d="M130 65 Q 150 40 120 30 Q 105 50 115 75 Z"
              fill="#15803D"
              stroke="#22C55E"
              strokeWidth="2.5"
              className="animate-pulse"
            />

            {/* Dragon Body */}
            <ellipse cx="80" cy="100" rx="38" ry="42" fill="#14532D" stroke="#22C55E" strokeWidth="2.5" />
            
            {/* Abs / Chest armor plates */}
            <path d="M68 85 Q 80 88 92 85" stroke="#4ADE80" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M65 98 Q 80 102 95 98" stroke="#4ADE80" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M68 112 Q 80 116 92 112" stroke="#4ADE80" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Head */}
            <circle cx="80" cy="55" r="28" fill="#166534" stroke="#22C55E" strokeWidth="2.5" />

            {/* Horns */}
            <path d="M65 35 Q 55 15 45 25 Q 60 30 66 38" fill="#22C55E" />
            <path d="M95 35 Q 105 15 115 25 Q 100 30 94 38" fill="#22C55E" />

            {/* Glowing Eyes */}
            <ellipse cx="70" cy="52" rx="4.5" ry="6" fill="#4ADE80" className="animate-ping opacity-75" />
            <circle cx="70" cy="52" r="3.5" fill="#FFFFFF" />
            <ellipse cx="90" cy="52" rx="4.5" ry="6" fill="#4ADE80" className="animate-ping opacity-75" />
            <circle cx="90" cy="52" r="3.5" fill="#FFFFFF" />

            {/* Confident Smile */}
            <path d="M74 65 Q 80 70 86 65" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Lifting Wristbands */}
            <rect x="36" y="98" width="10" height="6" rx="2" fill="#22C55E" stroke="#000" strokeWidth="1" />
            <rect x="114" y="98" width="10" height="6" rx="2" fill="#22C55E" stroke="#000" strokeWidth="1" />

            {/* Strong Arms */}
            <circle cx="42" cy="95" r="9" fill="#16A34A" stroke="#22C55E" strokeWidth="2" />
            <circle cx="118" cy="95" r="9" fill="#16A34A" stroke="#22C55E" strokeWidth="2" />

            {/* Feet */}
            <ellipse cx="65" cy="140" rx="12" ry="6" fill="#14532D" stroke="#22C55E" strokeWidth="2" />
            <ellipse cx="95" cy="140" rx="12" ry="6" fill="#14532D" stroke="#22C55E" strokeWidth="2" />
          </svg>
        </div>

        {/* RIGHT: EXP WHEEL (KINH NGHIỆM TẬP LUYỆN) - CLICK TO POPUP WORKOUT */}
        <div
          onClick={() => setShowWorkoutModal(true)}
          className="flex flex-col items-center cursor-pointer group active:scale-95 transition"
          title="Bấm để xem chi tiết tiến độ tập"
        >
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
                className="text-emerald-400 transition-all duration-700 ease-out"
                strokeDasharray={`${xpPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 mb-0.5" />
              <span className="text-xs font-mono font-black text-white leading-none">{xpPercent}%</span>
              <span className="text-[8px] font-mono text-gray-400 mt-0.5">EXP</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold mt-1.5 group-hover:underline flex items-center">
            <span>Tập luyện</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* QUICK FOOTER STATS */}
      <div className="w-full grid grid-cols-2 gap-2 pt-1 font-mono text-xs relative z-10">
        <div className="bg-black/50 p-2.5 rounded-2xl border border-white/5 flex items-center justify-between">
          <span className="text-[10px] text-gray-400">SỨC MẠNH:</span>
          <span className="font-extrabold text-white text-xs">{pet.str} STR</span>
        </div>
        <div className="bg-black/50 p-2.5 rounded-2xl border border-white/5 flex items-center justify-between">
          <span className="text-[10px] text-gray-400">TRẠNG THÁI:</span>
          <span className="font-extrabold text-emerald-400 text-xs">
            {hpPercent >= 80 ? 'Sung Mãn 🔥' : hpPercent >= 40 ? 'Bình Thường ⚡' : 'Đói Lả 🥩'}
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. POPUP MODAL: MACRO PROGRESS WHEEL (CLICK WHEEL HP) */}
      {/* ============================================================ */}
      {showMacroModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0F1411] border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Vòng Tròn Macro Dinh Dưỡng</h3>
                  <p className="text-[10px] text-gray-400 font-mono">Quyết định tốc độ hồi phục HP của Pet</p>
                </div>
              </div>
              <button
                onClick={() => setShowMacroModal(false)}
                className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Concentric Multi-Ring Wheel (4 Colors) */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <circle cx="60" cy="60" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <circle cx="60" cy="60" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />

                  {/* Ring 1: Calories (Xanh lá) */}
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" strokeDasharray={c1} strokeDashoffset={offset1} />
                  {/* Ring 2: Protein (Hồng đỏ) */}
                  <circle cx="60" cy="60" r="40" fill="none" stroke="#F43F5E" strokeWidth="6" strokeLinecap="round" strokeDasharray={c2} strokeDashoffset={offset2} />
                  {/* Ring 3: Carb (Trắng) */}
                  <circle cx="60" cy="60" r="30" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeDasharray={c3} strokeDashoffset={offset3} />
                  {/* Ring 4: Fat (Vàng) */}
                  <circle cx="60" cy="60" r="20" fill="none" stroke="#EAB308" strokeWidth="6" strokeLinecap="round" strokeDasharray={c4} strokeDashoffset={offset4} />
                </svg>

                <div className="absolute flex flex-col items-center text-center">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">CALORIES</span>
                  <span className="text-base font-extrabold text-white font-mono leading-none my-0.5">
                    {macro.calories.current}
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono">/ {macro.calories.total}</span>
                </div>
              </div>
            </div>

            {/* 4 Color Legends */}
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#22C55E] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-emerald-400 font-bold block">KCAL ({calPercent}%)</span>
                  <span className="text-xs font-bold text-white">{macro.calories.current}/{macro.calories.total}</span>
                </div>
              </div>

              <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#F43F5E] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-[#F43F5E] font-bold block">PROTEIN ({proPercent}%)</span>
                  <span className="text-xs font-bold text-white">{macro.protein.current}/{macro.protein.total}g</span>
                </div>
              </div>

              <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#FFFFFF] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-white font-bold block">CARB ({carbPercent}%)</span>
                  <span className="text-xs font-bold text-white">{macro.carb.current}/{macro.carb.total}g</span>
                </div>
              </div>

              <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#EAB308] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-[#EAB308] font-bold block">FAT ({fatPercent}%)</span>
                  <span className="text-xs font-bold text-white">{macro.fat.current}/{macro.fat.total}g</span>
                </div>
              </div>
            </div>

            {/* HP Regen Formula Status */}
            <div className="bg-black/40 p-3 rounded-2xl border border-white/5 text-xs text-gray-300 space-y-1">
              <span className="text-emerald-400 font-mono font-bold block">CƠ CHẾ HỒI PHỤC HP:</span>
              <p className="text-[11px] leading-relaxed">
                Pet đã hồi phục <strong className="text-white">{hpPercent}% HP</strong> nhờ nạp đủ trung bình 4 chỉ số Calo, Protein, Carb và Fat. Đạt 100% KPI hôm nay để Pet phục hồi trọn vẹn sinh lực!
              </p>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => {
                setShowMacroModal(false);
                if (onGoToMacro) onGoToMacro();
              }}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-glow-green transition"
            >
              <span>VÀO NHẬT KÝ ĐỂ CHO PET ĂN</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. POPUP MODAL: WORKOUT PROGRESS WHEEL (CLICK WHEEL EXP) */}
      {/* ============================================================ */}
      {showWorkoutModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0F1411] border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col max-h-[88vh] overflow-y-auto space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Tiến Độ Buổi Tập</h3>
                  <p className="text-[10px] text-gray-400 font-mono">{workout.dayName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowWorkoutModal(false)}
                className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Single Workout Progress Wheel */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
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
                  <span className="text-xl font-extrabold text-white font-mono leading-none">{workoutPercent}%</span>
                  <span className="text-[9px] text-gray-400 font-mono mt-0.5">HOÀN TẤT</span>
                </div>
              </div>
            </div>

            {/* Detailed sets and exercises info */}
            <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
              <div className="bg-black/50 p-3 rounded-2xl border border-white/5">
                <span className="text-[10px] text-gray-400 block mb-0.5">SETS ĐÃ TẬP</span>
                <span className="text-sm font-bold text-white">{workout.completedSets} / {workout.totalSets} Sets</span>
              </div>
              <div className="bg-black/50 p-3 rounded-2xl border border-white/5">
                <span className="text-[10px] text-gray-400 block mb-0.5">BÀI ĐÃ TẬP</span>
                <span className="text-sm font-bold text-emerald-400">{workout.completedExercises} / {workout.totalExercises} Bài</span>
              </div>
            </div>

            <div className="bg-black/40 p-3 rounded-2xl border border-white/5 text-xs text-gray-300">
              <span className="text-emerald-400 font-mono font-bold block mb-0.5">TẬP CÀY EXP CHO PET:</span>
              <p className="text-[11px] leading-relaxed">
                Mỗi Set bạn hoàn thành trong tab Tập luyện sẽ truyền trực tiếp <strong className="text-white">+35 EXP</strong> và <strong className="text-white">+2 STR</strong> cho Pet!
              </p>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => {
                setShowWorkoutModal(false);
                if (onGoToWorkout) onGoToWorkout();
              }}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-glow-green transition"
            >
              <span>VÀO TẬP LUYỆN ĐỂ CÀY EXP</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
