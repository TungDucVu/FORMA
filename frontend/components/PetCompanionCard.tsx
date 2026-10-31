'use client';

import React, { useState } from 'react';
import { Zap, Sparkles, Heart, Award, ArrowUpRight, MessageCircle } from 'lucide-react';

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
  onPetClick?: () => void;
  onGoToWorkout?: () => void;
}

export const PetCompanionCard: React.FC<PetCompanionCardProps> = ({
  pet,
  onPetClick,
  onGoToWorkout,
}) => {
  const [dialogue, setDialogue] = useState<string>('Chào Vũ Minh! Hãy tập 1 set để mình cùng lên cơ nào! 🔥');
  const [isFlexing, setIsFlexing] = useState<boolean>(false);

  const xpPercent = Math.min(100, Math.round((pet.currentXp / pet.nextLevelXp) * 100));
  const hpPercent = Math.min(100, Math.round((pet.hp / pet.maxHp) * 100));

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
    <div className="forma-card rounded-3xl p-5 border-emerald-500/30 relative overflow-hidden shadow-glow-green/20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP: PET HEADER & LEVEL BADGE */}
      <div className="flex items-center justify-between relative z-10 pb-2">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-extrabold text-sm shadow-glow-green">
            ⚡
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-base font-black text-white tracking-wide">{pet.name}</h3>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                {pet.evolutionStage}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono">Linh Vật Đồng Hành Thể Lực</p>
          </div>
        </div>

        {/* Level Badge */}
        <div className="text-right">
          <div className="flex items-center space-x-1 bg-black/60 border border-emerald-500/30 px-2.5 py-1 rounded-xl">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-mono font-black text-emerald-400">LV. {pet.level}</span>
          </div>
        </div>
      </div>

      {/* CENTER: INTERACTIVE PET AVATAR & SPEECH BUBBLE */}
      <div className="py-2 flex flex-col items-center justify-center relative z-10">
        
        {/* Dynamic Speech Bubble */}
        <div className="relative mb-2 px-3.5 py-2 rounded-2xl bg-black/75 border border-emerald-500/30 text-xs text-gray-200 text-center max-w-xs shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="leading-relaxed font-medium">
            <span className="text-emerald-400 font-bold mr-1">💬</span>
            {dialogue}
          </p>
          {/* Bubble beak */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/75 border-b border-r border-emerald-500/30 rotate-45" />
        </div>

        {/* SVG Animated Pet (Novice Cyber Dragon) */}
        <div
          onClick={handleTapPet}
          className={`cursor-pointer transform transition-transform duration-300 relative group ${
            isFlexing ? 'scale-110 -rotate-3' : 'hover:scale-105 active:scale-95'
          }`}
          title="Chạm vào Pet để tương tác"
        >
          {/* Pulsing Aura */}
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />

          {/* Character SVG */}
          <svg className="w-36 h-36 relative z-10 drop-shadow-[0_10px_20px_rgba(34,197,94,0.3)]" viewBox="0 0 160 160">
            {/* Dragon Wings */}
            <path
              d="M30 65 Q 10 40 40 30 Q 55 50 45 75 Z"
              fill="#15803D"
              stroke="#22C55E"
              strokeWidth="2"
              className="animate-pulse"
            />
            <path
              d="M130 65 Q 150 40 120 30 Q 105 50 115 75 Z"
              fill="#15803D"
              stroke="#22C55E"
              strokeWidth="2"
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

            {/* Confident Smile / Mouth */}
            <path d="M74 65 Q 80 70 86 65" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Lifting Wristbands (Gym Accessories) */}
            <rect x="36" y="98" width="10" height="6" rx="2" fill="#22C55E" stroke="#000" strokeWidth="1" />
            <rect x="114" y="98" width="10" height="6" rx="2" fill="#22C55E" stroke="#000" strokeWidth="1" />

            {/* Strong Arms */}
            <circle cx="42" cy="95" r="9" fill="#16A34A" stroke="#22C55E" strokeWidth="2" />
            <circle cx="118" cy="95" r="9" fill="#16A34A" stroke="#22C55E" strokeWidth="2" />

            {/* Feet */}
            <ellipse cx="65" cy="140" rx="12" ry="6" fill="#14532D" stroke="#22C55E" strokeWidth="2" />
            <ellipse cx="95" cy="140" rx="12" ry="6" fill="#14532D" stroke="#22C55E" strokeWidth="2" />
          </svg>

          {/* Tap Cue Badge */}
          <div className="text-center mt-1">
            <span className="text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded-full border border-emerald-500/20 group-hover:border-emerald-500/40">
              Chạm để tương tác
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM: PET STATS (HP ENERGY + EXP LEVEL BAR + STR) */}
      <div className="space-y-2.5 pt-2 relative z-10 border-t border-white/10">
        
        {/* HP / ENERGY BAR */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-gray-400 flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span>NĂNG LƯỢNG (HP/ENERGY)</span>
            </span>
            <span className="text-white font-bold">{pet.hp} / {pet.maxHp} HP</span>
          </div>
          <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/5">
            <div
              className="bg-gradient-to-r from-yellow-400 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>

        {/* EXP PROGRESS BAR */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-gray-400 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>KINH NGHIỆM (EXP TO LEVEL {pet.level + 1})</span>
            </span>
            <span className="text-emerald-400 font-bold">{pet.currentXp} / {pet.nextLevelXp} XP ({xpPercent}%)</span>
          </div>
          <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/5">
            <div
              className="bg-emerald-500 h-full transition-all duration-500 shadow-glow-green"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Quick Attributes Summary */}
        <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
          <div className="bg-black/40 p-2 rounded-xl border border-white/5 flex items-center justify-between">
            <span className="text-[10px] text-gray-400">SỨC MẠNH (STR):</span>
            <span className="font-extrabold text-white text-xs">{pet.str} STR</span>
          </div>
          <div className="bg-black/40 p-2 rounded-xl border border-white/5 flex items-center justify-between">
            <span className="text-[10px] text-gray-400">TRẠNG THÁI:</span>
            <span className="font-extrabold text-emerald-400 text-xs">Sung Mãn 🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
};
