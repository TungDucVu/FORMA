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
    <div className="relative overflow-hidden flex flex-col justify-between space-y-3.5 py-1">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. TOP: PET HEADER (NAME, STAGE, LEVEL) */}
      <div className="w-full flex items-center justify-between relative z-10 px-1">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-extrabold text-xs shadow-glow-green">
            ⚡
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h2 className="text-base font-black text-white tracking-wide">{pet.name}</h2>
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

      {/* 2. SPEECH BUBBLE */}
      <div className="relative z-10 mx-auto px-4 py-2 rounded-2xl bg-black/80 border border-emerald-500/30 text-xs text-gray-200 text-center max-w-sm shadow-lg animate-in fade-in duration-300">
        <p className="leading-relaxed font-medium">
          <span className="text-emerald-400 font-bold mr-1">💬</span>
          {dialogue}
        </p>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/80 border-b border-r border-emerald-500/30 rotate-45" />
      </div>

      {/* 3. CENTER HERO: INTERACTIVE PET AVATAR */}
      <div className="w-full flex justify-center items-center py-2 relative z-10">
        <div
          onClick={handleTapPet}
          className={`cursor-pointer transform transition-transform duration-300 relative group shrink-0 ${
            isFlexing ? 'scale-110 -rotate-2' : 'hover:scale-105 active:scale-95'
          }`}
          title="Chạm vào Pet để tương tác"
        >
          {/* Pulsing Aura */}
          <div className="absolute inset-0 bg-emerald-500/25 rounded-full blur-3xl animate-pulse" />

          {/* Character SVG (Larger, Hero Center) */}
          <svg className="w-44 h-44 sm:w-48 sm:h-48 relative z-10 drop-shadow-[0_12px_28px_rgba(34,197,94,0.45)]" viewBox="0 0 160 160">
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
      </div>

      {/* 4. 2 WHEELS (HP & EXP) CHUYỂN XUỐNG DƯỚI PET (TRÀN ĐẦY MÀN HÌNH) */}
      <div className="w-full grid grid-cols-2 gap-3 relative z-10">
        
        {/* LEFT: HP WHEEL (NĂNG LƯỢNG SINH TỒN) - BẤM XEM POPUP MACRO */}
        <div
          onClick={() => setShowMacroModal(true)}
          className="forma-card rounded-2xl p-3 border-emerald-500/25 hover:border-yellow-400/40 cursor-pointer active:scale-95 transition flex flex-col items-center group relative overflow-hidden"
          title="Bấm để xem chi tiết vòng tròn Macro"
        >
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center my-1">
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
              <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-mono font-black text-white leading-none mt-0.5">{hpPercent}%</span>
            </div>
          </div>

          <div className="text-center mt-1">
            <div className="text-xs font-bold text-white group-hover:text-yellow-300 transition flex items-center justify-center space-x-1">
              <span>Năng Lượng (HP)</span>
              <ChevronRight className="w-3 h-3 text-yellow-400" />
            </div>
            <p className="text-[10px] text-gray-400 font-mono">Chạm xem Macro Wheel</p>
          </div>
        </div>

        {/* RIGHT: EXP WHEEL (TIẾN ĐỘ TẬP LUYỆN) - BẤM XEM POPUP WORKOUT */}
        <div
          onClick={() => setShowWorkoutModal(true)}
          className="forma-card rounded-2xl p-3 border-emerald-500/25 hover:border-emerald-400/40 cursor-pointer active:scale-95 transition flex flex-col items-center group relative overflow-hidden"
          title="Bấm để xem chi tiết tiến độ bài tập"
        >
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center my-1">
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
                strokeDasharray={`${workoutPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-mono font-black text-white leading-none mt-0.5">{workoutPercent}%</span>
            </div>
          </div>

          <div className="text-center mt-1">
            <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition flex items-center justify-center space-x-1">
              <span>Tập Luyện (EXP)</span>
              <ChevronRight className="w-3 h-3 text-emerald-400" />
            </div>
            <p className="text-[10px] text-gray-400 font-mono">
              {workout.completedSets}/{workout.totalSets} Sets Hoàn Thành
            </p>
          </div>
        </div>
      </div>

      {/* 5. FOOTER QUICK STATS */}
      <div className="w-full grid grid-cols-2 gap-2 pt-0.5 font-mono text-xs relative z-10">
        <div className="bg-black/50 p-2 rounded-xl border border-white/5 flex items-center justify-between">
          <span className="text-[10px] text-gray-400">SỨC MẠNH:</span>
          <span className="font-extrabold text-white text-xs">{pet.str} STR</span>
        </div>
        <div className="bg-black/50 p-2 rounded-xl border border-white/5 flex items-center justify-between">
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
                  <h3 className="text-sm font-black text-white">Vòng Tròn Macro Dinh Dưỡng</h3>
                  <p className="text-[10px] text-gray-400 font-mono">Quyết định tốc độ hồi phục HP của Pet</p>
                </div>
              </div>

              <button
                onClick={() => setShowMacroModal(false)}
                className="p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Concentric Macro Rings */}
            <div className="flex flex-col items-center py-2">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  {/* Calorie Ring (Green) */}
                  <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="60" cy="60" r="50"
                    stroke="#22C55E"
                    strokeWidth="6"
                    strokeDasharray={c1}
                    strokeDashoffset={offset1}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />

                  {/* Protein Ring (Pink-Red) */}
                  <circle cx="60" cy="60" r="40" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="60" cy="60" r="40"
                    stroke="#F43F5E"
                    strokeWidth="6"
                    strokeDasharray={c2}
                    strokeDashoffset={offset2}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />

                  {/* Carb Ring (White) */}
                  <circle cx="60" cy="60" r="30" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="60" cy="60" r="30"
                    stroke="#FFFFFF"
                    strokeWidth="6"
                    strokeDasharray={c3}
                    strokeDashoffset={offset3}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />

                  {/* Fat Ring (Yellow) */}
                  <circle cx="60" cy="60" r="20" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="60" cy="60" r="20"
                    stroke="#EAB308"
                    strokeWidth="6"
                    strokeDasharray={c4}
                    strokeDashoffset={offset4}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                {/* Center Kcal Stat */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-black font-mono text-white leading-none">{macro.calories.current}</span>
                  <span className="text-[9px] text-gray-400 font-mono mt-0.5">/ {macro.calories.total} kcal</span>
                </div>
              </div>
            </div>

            {/* 4 Macro Breakdown Legend */}
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {/* Kcal */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-500/20">
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                  <span className="font-bold text-white text-[11px]">KCAL ({calPercent}%)</span>
                </div>
                <div className="text-emerald-400 font-extrabold">{macro.calories.current} / {macro.calories.total}</div>
              </div>

              {/* Protein */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-pink-500/20">
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
                  <span className="font-bold text-white text-[11px]">PROTEIN ({proPercent}%)</span>
                </div>
                <div className="text-pink-400 font-extrabold">{macro.protein.current} / {macro.protein.total}g</div>
              </div>

              {/* Carb */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/20">
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF]" />
                  <span className="font-bold text-white text-[11px]">CARB ({carbPercent}%)</span>
                </div>
                <div className="text-white font-extrabold">{macro.carb.current} / {macro.carb.total}g</div>
              </div>

              {/* Fat */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-yellow-500/20">
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                  <span className="font-bold text-white text-[11px]">FAT ({fatPercent}%)</span>
                </div>
                <div className="text-yellow-400 font-extrabold">{macro.fat.current} / {macro.fat.total}g</div>
              </div>
            </div>

            {/* HP Formula Explainer */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3 text-[11px] text-gray-300 space-y-1">
              <span className="font-bold text-emerald-400 font-mono block">⚡ CÔNG THỨC HỒI MÁU CHO PET:</span>
              <p className="leading-relaxed">
                HP hồi phục theo trọng số cân bằng (0.25 Kcal + 0.25 Protein + 0.25 Carb + 0.25 Fat). Đạt trọn vẹn cả 4 chỉ số để Pet hồi sinh 100% HP!
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                setShowMacroModal(false);
                if (onGoToMacro) onGoToMacro();
              }}
              className="w-full py-3 rounded-2xl bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-emerald-400 transition"
            >
              <Utensils className="w-4 h-4" />
              <span>Chuyển Sang Tab Macro & Bữa Ăn</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. POPUP MODAL: WORKOUT PROGRESS WHEEL (CLICK WHEEL EXP) */}
      {/* ============================================================ */}
      {showWorkoutModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0F1411] border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Tiến Độ Tập Luyện Hôm Nay</h3>
                  <p className="text-[10px] text-gray-400 font-mono">{workout.dayName}</p>
                </div>
              </div>

              <button
                onClick={() => setShowWorkoutModal(false)}
                className="p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Single % Workout Wheel */}
            <div className="flex flex-col items-center py-2">
              <div className="relative w-40 h-40 flex items-center justify-center">
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
                    strokeDasharray={`${workoutPercent}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center text-center">
                  <span className="text-3xl font-mono font-black text-emerald-400 leading-none">{workoutPercent}%</span>
                  <span className="text-[10px] font-mono text-gray-400 mt-1">ĐÃ HOÀN THÀNH</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <div className="bg-black/40 p-3 rounded-2xl border border-white/5 text-center">
                <span className="text-[10px] text-gray-400 block mb-0.5">SỐ BÀI TẬP</span>
                <span className="text-sm font-extrabold text-white">
                  {workout.completedExercises} / {workout.totalExercises} Bài
                </span>
              </div>
              <div className="bg-black/40 p-3 rounded-2xl border border-white/5 text-center">
                <span className="text-[10px] text-gray-400 block mb-0.5">SỐ HIỆP (SETS)</span>
                <span className="text-sm font-extrabold text-emerald-400">
                  {workout.completedSets} / {workout.totalSets} Sets
                </span>
              </div>
            </div>

            {/* Gamification Tip */}
            <div className="bg-black/50 border border-white/5 rounded-2xl p-3 flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-[11px] text-gray-300 leading-relaxed font-mono">
                Mỗi set hoàn thành cộng ngay <strong className="text-emerald-400">+25 EXP</strong> cho Pet!
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                setShowWorkoutModal(false);
                if (onGoToWorkout) onGoToWorkout();
              }}
              className="w-full py-3 rounded-2xl bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-emerald-400 transition"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Tiếp Tục Buổi Tập Luyện</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
