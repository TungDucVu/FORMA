'use client';

import React, { useState } from 'react';
import { WheelPicker } from './WheelPicker';
import { Sparkles, ArrowRight, Dumbbell, Flame, Scale, Trophy, Check } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (data: any) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('Khởi tạo AI Engine...');

  // Form states (Mandatory Group 1)
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(24);
  const [heightCm, setHeightCm] = useState<number>(172);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [goal, setGoal] = useState<'bulk' | 'cut' | 'recomp' | 'strength'>('bulk');
  const [days, setDays] = useState<number>(4);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const steps = [
      'Phân tích chỉ số trao đổi chất (BMR & TDEE)...',
      'Định lượng thâm hụt/thặng dư Calo theo mục tiêu...',
      'Google Gemini Flash đang phân bổ Macro & Giáo án...',
      'Hoàn tất lộ trình cá nhân hóa!'
    ];

    for (let i = 0; i < steps.length; i++) {
      setLoadingText(steps[i]);
      await new Promise((r) => setTimeout(r, 550));
    }

    const payload = {
      gender,
      age,
      height_cm: heightCm,
      weight_kg: weightKg,
      primary_goal: goal,
      workout_days_per_week: days,
    };

    onComplete(payload);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0F1411] border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-glow-green/20 flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Progress header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center font-mono">
              {step}/2
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              {step === 1 ? 'Chỉ số vóc dáng' : 'Mục tiêu & Lịch tập'}
            </span>
          </div>
          <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-glow-green animate-spin">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">FORMA AI đang phân tích</h3>
              <p className="text-xs text-emerald-400 font-mono mt-1 animate-pulse">{loadingText}</p>
            </div>
          </div>
        ) : (
          <>
            {/* STEP 1: PHYSICAL METRICS (ZERO KEYBOARD) */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Thể trạng hiện tại của bạn</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Cuộn để chọn chỉ số, không cần gõ bàn phím.</p>
                </div>

                {/* Gender toggle */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 mb-1.5 block">Giới tính sinh học</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-2.5 rounded-xl text-xs font-bold font-mono border transition ${
                        gender === 'male'
                          ? 'bg-emerald-500 text-black border-emerald-400 shadow-glow-green'
                          : 'bg-black/40 border-white/10 text-gray-400'
                      }`}
                    >
                      Nam (Male)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2.5 rounded-xl text-xs font-bold font-mono border transition ${
                        gender === 'female'
                          ? 'bg-emerald-500 text-black border-emerald-400 shadow-glow-green'
                          : 'bg-black/40 border-white/10 text-gray-400'
                      }`}
                    >
                      Nữ (Female)
                    </button>
                  </div>
                </div>

                {/* Wheel Pickers Row */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <WheelPicker
                    label="Tuổi"
                    min={15}
                    max={75}
                    value={age}
                    unit="tuổi"
                    onChange={setAge}
                  />
                  <WheelPicker
                    label="Chiều cao"
                    min={140}
                    max={210}
                    value={heightCm}
                    unit="cm"
                    onChange={setHeightCm}
                  />
                  <WheelPicker
                    label="Cân nặng"
                    min={35}
                    max={150}
                    value={weightKg}
                    unit="kg"
                    onChange={setWeightKg}
                  />
                </div>
              </div>
            )}

            {/* STEP 2: GOALS & SESSIONS */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Mục tiêu & Lịch tập</h2>
                  <p className="text-xs text-gray-400 mt-0.5">AI sẽ tự động tính thâm hụt/thặng dư Calo tương ứng.</p>
                </div>

                {/* Goal cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setGoal('bulk')}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                      goal === 'bulk'
                        ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-glow-green'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <Dumbbell className="w-5 h-5 text-emerald-400 mb-2" />
                    <div>
                      <div className="text-xs font-bold">Tăng cơ (Lean Bulk)</div>
                      <div className="text-[10px] text-gray-400">+300 kcal/ngày</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setGoal('cut')}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                      goal === 'cut'
                        ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-glow-green'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <Flame className="w-5 h-5 text-emerald-400 mb-2" />
                    <div>
                      <div className="text-xs font-bold">Giảm mỡ (Fat Loss)</div>
                      <div className="text-[10px] text-gray-400">-400 kcal/ngày</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setGoal('recomp')}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                      goal === 'recomp'
                        ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-glow-green'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <Scale className="w-5 h-5 text-emerald-400 mb-2" />
                    <div>
                      <div className="text-xs font-bold">Tái tạo vóc dáng</div>
                      <div className="text-[10px] text-gray-400">Giữ cân & săn chắc</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setGoal('strength')}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                      goal === 'strength'
                        ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-glow-green'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <Trophy className="w-5 h-5 text-emerald-400 mb-2" />
                    <div>
                      <div className="text-xs font-bold">Sức mạnh (Strength)</div>
                      <div className="text-[10px] text-gray-400">Tăng mức tạ tối đa</div>
                    </div>
                  </div>
                </div>

                {/* Workout sessions per week */}
                <div className="pt-2">
                  <label className="text-xs font-semibold text-gray-300 mb-2 block">
                    Số buổi có thể tập / tuần: <strong className="text-emerald-400">{days} buổi</strong>
                  </label>
                  <div className="flex justify-between gap-2">
                    {[2, 3, 4, 5, 6].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDays(d)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-mono border transition ${
                          days === d
                            ? 'bg-emerald-500 text-black border-emerald-400 shadow-glow-green'
                            : 'bg-black/40 border-white/10 text-gray-400'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ACTION BUTTON */}
            <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-gray-400 hover:text-white px-2 py-1"
                >
                  Quay lại
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center space-x-1.5 shadow-glow-green transition"
              >
                <span>{step === 1 ? 'Tiếp tục' : 'Tạo Lộ Trình AI'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
