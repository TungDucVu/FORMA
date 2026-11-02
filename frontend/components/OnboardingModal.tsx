'use client';

import React, { useState } from 'react';
import { WheelPicker } from './WheelPicker';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Dumbbell, 
  Flame, 
  Scale, 
  Trophy, 
  Check, 
  Zap, 
  ShieldAlert, 
  Heart, 
  Bot, 
  Smile, 
  Activity,
  CheckCircle2
} from 'lucide-react';

export interface OnboardingData {
  petName: string;
  petSpecies: 'drago' | 'cyberbot' | 'titan';
  gender: 'Nam' | 'Nữ';
  age: number;
  height_cm: number;
  weight_kg: number;
  primary_goal: 'bulk' | 'cut' | 'recomp' | 'strength';
  workout_days_per_week: number;
  calculatedBmr?: number;
  calculatedTdee?: number;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (data: OnboardingData) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  // Step 1: Welcome & Pet Creation
  // Step 2: Physical Metrics (Mandatory, Zero-Keyboard)
  // Step 3: Goal & Workout Schedule (Mandatory)
  // Step 4: AI Loading & Confetti Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Pet Creation (Step 1)
  const [petSpecies, setPetSpecies] = useState<'drago' | 'cyberbot' | 'titan'>('drago');
  const [petName, setPetName] = useState<string>('Drago');

  // Physical Metrics (Step 2 - Zero Keyboard)
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [age, setAge] = useState<number>(24);
  const [heightCm, setHeightCm] = useState<number>(172);
  const [weightKg, setWeightKg] = useState<number>(68);

  // Goals & Schedule (Step 3)
  const [goal, setGoal] = useState<'bulk' | 'cut' | 'recomp' | 'strength'>('bulk');
  const [days, setDays] = useState<number>(4);

  // AI Loading & Success (Step 4)
  const [loadingPhase, setLoadingPhase] = useState<'analyzing' | 'success'>('analyzing');
  const [loadingText, setLoadingText] = useState<string>('Khởi tạo AI Engine...');

  if (!isOpen) return null;

  // Quick name presets
  const namePresets = ['Drago', 'CyberBot', 'Titan', 'Kratos', 'Aero', 'Sparky'];

  // Calculate BMR & TDEE
  const calculateMetrics = () => {
    let bmr = Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + (gender === 'Nam' ? 5 : -161));
    let pal = days >= 5 ? 1.7 : days >= 4 ? 1.55 : 1.375;
    let tdee = Math.round(bmr * pal);
    return { bmr, tdee };
  };

  // Skip Onboarding for Debug
  const handleSkipDebug = () => {
    const { bmr, tdee } = calculateMetrics();
    onComplete({
      petName: 'Drago',
      petSpecies: 'drago',
      gender: 'Nam',
      age: 24,
      height_cm: 172,
      weight_kg: 68,
      primary_goal: 'bulk',
      workout_days_per_week: 4,
      calculatedBmr: bmr,
      calculatedTdee: tdee,
    });
  };

  // Transition to AI Loading
  const handleTriggerAIEngine = async () => {
    setStep(4);
    setLoadingPhase('analyzing');

    const steps = [
      'Phân tích chỉ số trao đổi chất (BMR & TDEE)...',
      'Định lượng thâm hụt/thặng dư Calo theo mục tiêu...',
      'Google Gemini Flash đang phân bổ Macro & Giáo án...',
      'Thức tỉnh linh vật và khởi tạo thông số ban đầu...',
    ];

    for (let i = 0; i < steps.length; i++) {
      setLoadingText(steps[i]);
      await new Promise((r) => setTimeout(r, 450));
    }

    setLoadingPhase('success');
  };

  const handleFinish = () => {
    const { bmr, tdee } = calculateMetrics();
    onComplete({
      petName,
      petSpecies,
      gender,
      age,
      height_cm: heightCm,
      weight_kg: weightKg,
      primary_goal: goal,
      workout_days_per_week: days,
      calculatedBmr: bmr,
      calculatedTdee: tdee,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0F1411] border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto no-scrollbar relative">
        
        {/* ============================================================ */}
        {/* TOP BAR: STEP PROGRESS & DEBUG SKIP BUTTON */}
        {/* ============================================================ */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center font-mono">
              {step <= 3 ? `${step}/3` : 'AI'}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-200">
              {step === 1 && 'Khởi Tạo Pet Đồng Hành'}
              {step === 2 && 'Vóc Dáng Cơ Bản'}
              {step === 3 && 'Mục Tiêu & Lịch Tập'}
              {step === 4 && 'Kích Hoạt Lộ Trình AI'}
            </span>
          </div>

          {/* DEBUG SKIP BUTTON */}
          <button
            onClick={handleSkipDebug}
            className="flex items-center space-x-1 text-[11px] font-mono font-bold text-yellow-400 bg-yellow-500/15 border border-yellow-500/30 px-2.5 py-1 rounded-xl hover:bg-yellow-500/25 active:scale-95 transition"
            title="Bỏ qua Onboarding với dữ liệu mẫu (Debug)"
          >
            <Zap className="w-3.5 h-3.5 fill-yellow-400" />
            <span>Bỏ qua (Debug)</span>
          </button>
        </div>

        {/* PROGRESS BAR */}
        {step <= 3 && (
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-4">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 1: CHÀO MỪNG & KHỞI TẠO PET (WELCOME & PET CREATION) */}
        {/* ============================================================ */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-white tracking-wide">
                Chào mừng bạn đến với <span className="text-emerald-400">FORMA</span>
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Mỗi rep tạ bạn tập, mỗi calo bạn nạp sẽ trực tiếp nuôi dưỡng và tiến hóa người bạn ảo này.
              </p>
            </div>

            {/* 3 Pet Starting Forms */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-gray-400 block uppercase">
                1. Chọn hình thái khởi đầu:
              </span>

              <div className="grid grid-cols-3 gap-2">
                {/* Form 1: Drago */}
                <div
                  onClick={() => {
                    setPetSpecies('drago');
                    if (namePresets.includes(petName)) setPetName('Drago');
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center text-center cursor-pointer transition active:scale-95 ${
                    petSpecies === 'drago'
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-glow-green/30'
                      : 'bg-black/40 border-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="text-2xl mb-1">🐉</div>
                  <span className="text-xs font-bold text-white block">Rồng Lửa</span>
                  <span className="text-[9px] font-mono text-emerald-400">Sức mạnh</span>
                </div>

                {/* Form 2: CyberBot */}
                <div
                  onClick={() => {
                    setPetSpecies('cyberbot');
                    if (namePresets.includes(petName)) setPetName('CyberBot');
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center text-center cursor-pointer transition active:scale-95 ${
                    petSpecies === 'cyberbot'
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-glow-green/30'
                      : 'bg-black/40 border-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="text-2xl mb-1">🤖</div>
                  <span className="text-xs font-bold text-white block">Cyber Mech</span>
                  <span className="text-[9px] font-mono text-emerald-400">Kỷ luật</span>
                </div>

                {/* Form 3: Titan */}
                <div
                  onClick={() => {
                    setPetSpecies('titan');
                    if (namePresets.includes(petName)) setPetName('Titan');
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center text-center cursor-pointer transition active:scale-95 ${
                    petSpecies === 'titan'
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-glow-green/30'
                      : 'bg-black/40 border-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="text-2xl mb-1">🦍</div>
                  <span className="text-xs font-bold text-white block">Thần Thú Đá</span>
                  <span className="text-[9px] font-mono text-emerald-400">Bền bỉ</span>
                </div>
              </div>
            </div>

            {/* Pet Name & Quick Chips */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-gray-400 block uppercase">
                2. Đặt tên cho Pet:
              </span>

              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Nhập tên nhân vật..."
                className="w-full bg-black/60 border border-emerald-500/30 rounded-2xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-400"
              />

              {/* Quick name chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {namePresets.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setPetName(name)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold border transition ${
                      petName === name
                        ? 'bg-emerald-500 text-black border-emerald-400'
                        : 'bg-black/40 text-gray-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <button
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-2xl bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-emerald-400 shadow-glow-green transition active:scale-95"
              >
                <span>Tiếp Tục: Nhập Vóc Dáng</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: VÓC DÁNG CƠ BẢN (MANDATORY, ZERO KEYBOARD) */}
        {/* ============================================================ */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-white">Chỉ số thể trạng</h2>
              <p className="text-xs text-gray-400">
                AI sẽ tính toán BMR & TDEE chính xác dựa trên các thông số này.
              </p>
            </div>

            {/* Gender Toggle */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-gray-400 block uppercase">
                Giới tính sinh học
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('Nam')}
                  className={`py-3 rounded-2xl border font-bold text-xs flex items-center justify-center space-x-1.5 transition ${
                    gender === 'Nam'
                      ? 'bg-emerald-500 text-black border-emerald-400 shadow-glow-green/30'
                      : 'bg-black/50 border-white/10 text-gray-400'
                  }`}
                >
                  <span>👦</span>
                  <span>Nam</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('Nữ')}
                  className={`py-3 rounded-2xl border font-bold text-xs flex items-center justify-center space-x-1.5 transition ${
                    gender === 'Nữ'
                      ? 'bg-emerald-500 text-black border-emerald-400 shadow-glow-green/30'
                      : 'bg-black/50 border-white/10 text-gray-400'
                  }`}
                >
                  <span>👧</span>
                  <span>Nữ</span>
                </button>
              </div>
            </div>

            {/* Age, Height, Weight Wheels (Zero Keyboard) */}
            <div className="grid grid-cols-3 gap-2">
              <WheelPicker
                label="Tuổi"
                min={16}
                max={75}
                value={age}
                unit="tuổi"
                onChange={setAge}
              />
              <WheelPicker
                label="Chiều cao"
                min={140}
                max={215}
                value={heightCm}
                unit="cm"
                onChange={setHeightCm}
              />
              <WheelPicker
                label="Cân nặng"
                min={40}
                max={150}
                value={weightKg}
                unit="kg"
                onChange={setWeightKg}
              />
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 font-bold text-xs hover:bg-white/10 transition flex items-center justify-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="py-3 rounded-2xl bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-1 hover:bg-emerald-400 shadow-glow-green transition active:scale-95"
              >
                <span>Mục Tiêu</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: MỤC TIÊU & LỊCH TẬP (MANDATORY) */}
        {/* ============================================================ */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-white">Mục tiêu & Lịch tập</h2>
              <p className="text-xs text-gray-400">
                AI sẽ thiết lập mức Calo và giáo án tập luyện phù hợp nhất.
              </p>
            </div>

            {/* 4 Goal Cards */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-gray-400 block uppercase">
                Mục tiêu chính
              </label>
              <div className="grid grid-cols-2 gap-2">
                {/* Bulk */}
                <div
                  onClick={() => setGoal('bulk')}
                  className={`p-3 rounded-2xl border cursor-pointer transition active:scale-95 ${
                    goal === 'bulk'
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-glow-green/30'
                      : 'bg-black/40 border-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center space-x-1 text-emerald-400 font-bold text-xs mb-1">
                    <span>💪</span>
                    <span>Tăng Cơ (Bulk)</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-tight">
                    Tối ưu phì đại cơ bắp, thặng dư năng lượng.
                  </p>
                </div>

                {/* Cut */}
                <div
                  onClick={() => setGoal('cut')}
                  className={`p-3 rounded-2xl border cursor-pointer transition active:scale-95 ${
                    goal === 'cut'
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-glow-green/30'
                      : 'bg-black/40 border-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center space-x-1 text-emerald-400 font-bold text-xs mb-1">
                    <span>🔥</span>
                    <span>Giảm Mỡ (Cut)</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-tight">
                    Thâm hụt calo, bảo toàn khối cơ và siết nét.
                  </p>
                </div>

                {/* Recomp */}
                <div
                  onClick={() => setGoal('recomp')}
                  className={`p-3 rounded-2xl border cursor-pointer transition active:scale-95 ${
                    goal === 'recomp'
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-glow-green/30'
                      : 'bg-black/40 border-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center space-x-1 text-emerald-400 font-bold text-xs mb-1">
                    <span>⚡</span>
                    <span>Recomp</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-tight">
                    Vừa giảm mỡ vừa xây dựng cơ bắp săn chắc.
                  </p>
                </div>

                {/* Strength / Endurance */}
                <div
                  onClick={() => setGoal('strength')}
                  className={`p-3 rounded-2xl border cursor-pointer transition active:scale-95 ${
                    goal === 'strength'
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-glow-green/30'
                      : 'bg-black/40 border-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center space-x-1 text-emerald-400 font-bold text-xs mb-1">
                    <span>🏃</span>
                    <span>Sức Bền</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-tight">
                    Nâng cao thể lực tim mạch và sự linh hoạt.
                  </p>
                </div>
              </div>
            </div>

            {/* Days per week buttons */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-gray-400 block uppercase">
                Số buổi có thể tập mỗi tuần
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[2, 3, 4, 5, 6].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={`py-2.5 rounded-xl border text-xs font-mono font-extrabold transition ${
                      days === d
                        ? 'bg-emerald-500 text-black border-emerald-400 shadow-glow-green/30'
                        : 'bg-black/50 border-white/10 text-gray-400'
                    }`}
                  >
                    {d} buổi
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setStep(2)}
                className="py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 font-bold text-xs hover:bg-white/10 transition flex items-center justify-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại</span>
              </button>
              <button
                onClick={handleTriggerAIEngine}
                className="py-3 rounded-2xl bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 hover:bg-emerald-400 shadow-glow-green transition active:scale-95"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>Tạo Lộ Trình AI</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: KÍCH HOẠT AI & CONFETTI SUCCESS */}
        {/* ============================================================ */}
        {step === 4 && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-5 relative overflow-hidden">
            
            {/* Phase 1: Analyzing */}
            {loadingPhase === 'analyzing' && (
              <>
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-black flex items-center justify-center shadow-glow-green animate-spin">
                    <Sparkles className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white">FORMA AI Đang Khởi Tạo</h3>
                  <p className="text-xs text-emerald-400 font-mono animate-pulse">{loadingText}</p>
                </div>
              </>
            )}

            {/* Phase 2: Success with Confetti */}
            {loadingPhase === 'success' && (
              <div className="space-y-4 animate-in zoom-in-95 duration-300 w-full">
                {/* Confetti Particles (Pure CSS Lightweight) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full animate-bounce"
                      style={{
                        top: `${Math.random() * 80}%`,
                        left: `${Math.random() * 90}%`,
                        backgroundColor: ['#22C55E', '#EAB308', '#4ADE80', '#FFFFFF', '#F43F5E'][i % 5],
                        animationDuration: `${0.8 + (i % 5) * 0.2}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center shadow-glow-green">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                    • THIẾT LẬP THÀNH CÔNG •
                  </span>
                  <h3 className="text-xl font-black text-white">Lộ Trình Đã Sẵn Sàng!</h3>
                  <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
                    Pet <strong className="text-emerald-400 font-bold">{petName}</strong> đã thức tỉnh và sẵn sàng bứt phá giới hạn cùng bạn.
                  </p>
                </div>

                {/* Recap Metrics Pill */}
                <div className="grid grid-cols-2 gap-2 bg-black/60 border border-emerald-500/20 p-3 rounded-2xl text-xs font-mono text-left">
                  <div>
                    <span className="text-[9px] text-gray-400 block">MỤC TIÊU:</span>
                    <span className="text-white font-bold uppercase">{goal}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block">LỊCH TẬP:</span>
                    <span className="text-emerald-400 font-bold">{days} buổi / tuần</span>
                  </div>
                </div>

                {/* Final Action Button */}
                <button
                  onClick={handleFinish}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-emerald-400 shadow-glow-green transition active:scale-95"
                >
                  <Trophy className="w-4 h-4 fill-black" />
                  <span>Bắt Đầu Hành Trình Ngay 🚀</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
