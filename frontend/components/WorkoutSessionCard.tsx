'use client';

import React, { useState } from 'react';
import { Check, RefreshCw, Flame, AlertCircle, Dumbbell } from 'lucide-react';

interface ExerciseData {
  order: number;
  exercise_name: string;
  target_muscle: string;
  sets: number;
  rep_range: string;
  approx_calories: number;
  technique_tip?: string;
  gif_url?: string;
}

interface WorkoutSessionCardProps {
  exercise: ExerciseData;
  onCompleteSet: (order: number) => void;
  completedSets: number;
}

export const WorkoutSessionCard: React.FC<WorkoutSessionCardProps> = ({
  exercise,
  onCompleteSet,
  completedSets,
}) => {
  const [showSwapModal, setShowSwapModal] = useState<boolean>(false);
  const [currentName, setCurrentName] = useState<string>(exercise.exercise_name);
  const [targetMuscle, setTargetMuscle] = useState<string>(exercise.target_muscle);
  const [swapping, setSwapping] = useState<boolean>(false);

  const handleSwap = async (reason: string) => {
    setSwapping(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/workout/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_exercise_name: currentName,
          target_muscle: targetMuscle,
          reason,
          available_equipment: 'gym',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentName(data.substitute_exercise);
      } else {
        // Local fallback swap
        setCurrentName(`Cable Alternate for ${currentName}`);
      }
    } catch {
      setCurrentName(`Dumbbell Alternate for ${currentName}`);
    } finally {
      setSwapping(false);
      setShowSwapModal(false);
    }
  };

  const isAllDone = completedSets >= exercise.sets;

  return (
    <div
      className={`glass-card rounded-2xl p-4 border transition-all ${
        isAllDone
          ? 'border-emerald-500/40 bg-emerald-950/20'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Top badges */}
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="font-mono text-emerald-400 font-bold">
          BÀI {exercise.order} • {targetMuscle.toUpperCase()}
        </span>
        <span className="text-[11px] text-gray-400 flex items-center space-x-1">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>~{exercise.approx_calories} kcal</span>
        </span>
      </div>

      {/* Exercise name and AI swap trigger */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-base font-extrabold text-white leading-tight">{currentName}</h4>
        <button
          onClick={() => setShowSwapModal(true)}
          className="px-2 py-1 rounded-lg bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 text-[10px] font-mono border border-purple-500/20 flex items-center space-x-1 shrink-0 transition"
          title="Đổi bài tập khi đau khớp hoặc thiết bị bận"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Đổi bài AI</span>
        </button>
      </div>

      {/* Reps, Sets and Technique tips */}
      <div className="mt-2.5 flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-white/5 text-xs font-mono">
        <div>
          <span className="text-gray-400">Tiến độ set: </span>
          <span className="text-emerald-400 font-bold">
            {completedSets} / {exercise.sets} Sets
          </span>
        </div>
        <div className="text-gray-300">
          Mục tiêu: <strong className="text-white">{exercise.rep_range} Reps</strong>
        </div>
      </div>

      {exercise.technique_tip && (
        <p className="text-[11px] text-gray-400 mt-2 italic leading-relaxed">
          💡 {exercise.technique_tip}
        </p>
      )}

      {/* Interactive Complete Set Button */}
      <div className="mt-3">
        <button
          onClick={() => onCompleteSet(exercise.order)}
          disabled={isAllDone}
          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition ${
            isAllDone
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-glow-lime hover:opacity-90'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{isAllDone ? 'ĐÃ HOÀN TẤT TẤT CẢ SET' : `TAP HOÀN THÀNH SET ${completedSets + 1}`}</span>
        </button>
      </div>

      {/* AI Swap Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-slate-900 border border-purple-500/30 rounded-2xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center space-x-2 text-purple-400">
              <AlertCircle className="w-5 h-5" />
              <h4 className="text-sm font-bold text-white">Lý do muốn đổi bài?</h4>
            </div>
            <p className="text-xs text-gray-400">AI sẽ chọn bài tập thay thế an toàn cho nhóm cơ này trong 2 giây.</p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => handleSwap('joint_pain')}
                disabled={swapping}
                className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left text-xs font-medium text-gray-200 border border-white/10"
              >
                🦴 Đau khớp / Khó chịu khi tập
              </button>
              <button
                onClick={() => handleSwap('equipment_busy')}
                disabled={swapping}
                className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left text-xs font-medium text-gray-200 border border-white/10"
              >
                ⏳ Thiết bị/máy tạ đang có người dùng
              </button>
              <button
                onClick={() => handleSwap('too_heavy')}
                disabled={swapping}
                className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left text-xs font-medium text-gray-200 border border-white/10"
              >
                ⚖️ Tạ quá nặng hoặc tạ quá nhẹ
              </button>
            </div>

            <button
              onClick={() => setShowSwapModal(false)}
              className="w-full py-2 text-xs text-gray-400 hover:text-white text-center mt-2"
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

