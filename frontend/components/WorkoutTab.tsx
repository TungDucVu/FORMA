'use client';

import React, { useState } from 'react';
import { Dumbbell, Check, RefreshCw, Flame, Lightbulb, Info } from 'lucide-react';

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
  // Curated exercises for today's session
  const [exercises, setExercises] = useState<ExerciseItem[]>([
    {
      id: 'ex-1',
      name: 'Incline Dumbbell Bench Press',
      target_muscle: 'Cơ Ngực Trên (Upper Pectorals)',
      sets: 4,
      rep_range: '8-10 reps',
      gif_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80',
      tips: 'Hạ tạ chậm 2 giây, khuỷu tay mở 45 độ so với thân, đẩy lên không khóa khớp cùi chỏ.',
      approx_calories: 110,
    },
    {
      id: 'ex-2',
      name: 'Lat Pulldown (Kéo xô rộng tay)',
      target_muscle: 'Cơ Lưng Xô (Latissimus Dorsi)',
      sets: 4,
      rep_range: '10-12 reps',
      gif_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
      tips: 'Ưỡn ngực, giữ lưng thẳng, kéo thanh đòn về xương quai xanh và siết chặt cơ lưng.',
      approx_calories: 95,
    },
    {
      id: 'ex-3',
      name: 'Standing Dumbbell Lateral Raise',
      target_muscle: 'Cơ Vai Giữa (Lateral Deltoid)',
      sets: 4,
      rep_range: '12-15 reps',
      gif_url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80',
      tips: 'Cùi chỏ hơi cong nhẹ, nâng tạ song song mặt sàn, kiểm soát pha hạ tạ từ từ.',
      approx_calories: 70,
    },
    {
      id: 'ex-4',
      name: 'Rope Tricep Cable Pushdown',
      target_muscle: 'Cơ Tay Sau (Triceps Brachii)',
      sets: 3,
      rep_range: '12-15 reps',
      gif_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80',
      tips: 'Cố định cùi chỏ sát mạn sườn, tách nhẹ dây ở điểm duỗi tay tối đa.',
      approx_calories: 60,
    },
  ]);

  const [activeTipId, setActiveTipId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
            BUỔI 3/4 • UPPER BODY PUSH & PULL
          </span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">Bài Tập Hôm Nay</h2>
        </div>
        <div className="text-xs font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-gray-300">
          4 Bài • ~335 kcal
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="space-y-4">
        {exercises.map((ex, idx) => {
          const completedCount = completedSetsMap[ex.id] || 0;
          const isDone = completedCount >= ex.sets;

          return (
            <div
              key={ex.id}
              className={`forma-card rounded-2xl p-4 transition-all ${
                isDone ? 'border-emerald-500/50 bg-[#0E1711]' : 'border-white/10'
              }`}
            >
              {/* Exercise Header */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400 font-bold">
                    <span>BÀI {idx + 1}</span>
                    <span>•</span>
                    <span className="text-gray-400">{ex.target_muscle}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mt-0.5">{ex.name}</h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-white bg-black/40 px-2 py-0.5 rounded border border-white/5">
                    {ex.sets} Sets × {ex.rep_range}
                  </span>
                </div>
              </div>

              {/* Media Graphic Preview (GIF/Image) */}
              <div className="relative w-full h-36 rounded-xl overflow-hidden bg-black/60 border border-white/5 mb-3 group">
                <img
                  src={ex.gif_url}
                  alt={ex.name}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 justify-between">
                  <span className="text-[11px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    GIF Kỹ Thuật Chuẩn
                  </span>
                  <span className="text-[11px] text-gray-300 font-mono">
                    ~{ex.approx_calories} kcal
                  </span>
                </div>
              </div>

              {/* Technique Tip Banner */}
              <div className="bg-black/40 rounded-xl p-2.5 border border-white/5 mb-3 text-xs leading-relaxed text-gray-300 flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-emerald-400">Tips: </strong>{ex.tips}</span>
              </div>

              {/* Set Progress & Interactive Check Buttons */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-gray-400 mb-2">
                  <span>Tiến độ bài tập:</span>
                  <span className={isDone ? 'text-emerald-400 font-bold' : 'text-white'}>
                    {completedCount} / {ex.sets} Sets Hoàn Thành
                  </span>
                </div>

                {/* Grid of Set buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: ex.sets }).map((_, sIdx) => {
                    const isSetDone = sIdx < completedCount;
                    return (
                      <button
                        key={sIdx}
                        onClick={() => onToggleSet(ex.id, sIdx + 1)}
                        className={`py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-1 border transition ${
                          isSetDone
                            ? 'bg-emerald-500 text-black border-emerald-400 shadow-glow-green'
                            : 'bg-black/40 text-gray-400 border-white/10 hover:border-emerald-500/40 hover:text-white'
                        }`}
                      >
                        {isSetDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        <span>SET {sIdx + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

