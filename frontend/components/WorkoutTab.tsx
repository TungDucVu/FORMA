'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Dumbbell, 
  Check, 
  Lightbulb, 
  List, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Play, 
  Sparkles, 
  BookOpen, 
  Lock, 
  Trophy, 
  Crown, 
  Star, 
  Flame, 
  MapPin, 
  ArrowLeft,
  Navigation,
  Gift
} from 'lucide-react';

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

export interface TowerDayNode {
  dayNumber: number;
  stageName: string;
  chapterTitle: string;
  focusTitle: string;
  status: 'completed' | 'active' | 'locked';
  stars: number; // 0 to 3
  isBoss?: boolean;
  isRewardChest?: boolean;
  expReward: number;
  calReward: number;
  positionX: number; // percentage horizontal offset: 25%, 50%, 75%, etc.
  exercises: ExerciseItem[];
}

interface WorkoutTabProps {
  completedSetsMap: { [exerciseId: string]: number };
  onToggleSet: (exerciseId: string, setIndex: number) => void;
}

// Exercise Banks for Days
const standardExercisesDay3: ExerciseItem[] = [
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

const standardExercisesDay1: ExerciseItem[] = [
  {
    id: 'ex-d1-1',
    name: 'Barbell Flat Bench Press',
    target_muscle: 'Cơ Ngực Giữa (Mid Pectorals)',
    secondary_muscles: 'Cơ Vai Trước, Tay Sau',
    sets: 4,
    rep_range: '8-10 reps',
    image_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=80',
    tutorial_gif: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=80',
    tips: 'Khóa chặt bả vai vào đệm ghế. Đẩy thanh tạ theo đường cong tự nhiên lên trên ngực.',
    approx_calories: 120,
  },
  {
    id: 'ex-d1-2',
    name: 'Overhead Dumbbell Tricep Extension',
    target_muscle: 'Cơ Tay Sau (Long Head Tricep)',
    secondary_muscles: 'Cẳng tay',
    sets: 3,
    rep_range: '10-12 reps',
    image_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80',
    tutorial_gif: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80',
    tips: 'Giữ cùi chỏ hướng lên trần nhà, duỗi thẳng tay ở đỉnh để khóa khớp an toàn.',
    approx_calories: 80,
  },
];

const standardExercisesDay2: ExerciseItem[] = [
  {
    id: 'ex-d2-1',
    name: 'Barbell Back Squat',
    target_muscle: 'Cơ Đùi Trước & Mông (Quads & Glutes)',
    secondary_muscles: 'Lưng Dưới, Bắp Chân',
    sets: 4,
    rep_range: '6-8 reps',
    image_url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=700&q=80',
    tutorial_gif: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=700&q=80',
    tips: 'Gồng chặt cơ bụng (brace core) trước khi hạ người. Đầu gối mở theo hướng mũi bàn chân.',
    approx_calories: 140,
  },
  {
    id: 'ex-d2-2',
    name: 'Leg Press (Đạp Đùi)',
    target_muscle: 'Cơ Đùi Trước (Quadriceps)',
    secondary_muscles: 'Mông',
    sets: 4,
    rep_range: '10-12 reps',
    image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
    tutorial_gif: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
    tips: 'Không khóa khớp gối hoàn toàn ở điểm duỗi thẳng để bảo vệ sụn gối.',
    approx_calories: 110,
  },
];

// 16-Stage Multi-Chapter Saga Tower Road
const towerStages: TowerDayNode[] = [
  // Chặng 1: Thức Tỉnh Sức Mạnh
  {
    dayNumber: 1,
    stageName: 'Tầng 1',
    chapterTitle: 'Chặng 1: Thức Tỉnh Cơ Bắp',
    focusTitle: 'Upper Body Push (Ngực & Tay Sau)',
    status: 'completed',
    stars: 3,
    expReward: 150,
    calReward: 200,
    positionX: 50,
    exercises: standardExercisesDay1,
  },
  {
    dayNumber: 2,
    stageName: 'Tầng 2',
    chapterTitle: 'Chặng 1: Thức Tỉnh Cơ Bắp',
    focusTitle: 'Lower Body (Đùi & Mông)',
    status: 'completed',
    stars: 3,
    expReward: 180,
    calReward: 250,
    positionX: 25,
    exercises: standardExercisesDay2,
  },
  {
    dayNumber: 3,
    stageName: 'Tầng 3',
    chapterTitle: 'Chặng 1: Thức Tỉnh Cơ Bắp',
    focusTitle: 'Upper Body Push & Pull (Hôm Nay)',
    status: 'active', // CURRENT DAY!
    stars: 0,
    expReward: 200,
    calReward: 335,
    positionX: 70,
    exercises: standardExercisesDay3,
  },
  {
    dayNumber: 4,
    stageName: 'Tầng 4',
    chapterTitle: 'Chặng 1: Thức Tỉnh Cơ Bắp',
    focusTitle: 'Shoulder & Core (Vai & Bụng)',
    status: 'locked',
    stars: 0,
    expReward: 160,
    calReward: 220,
    positionX: 35,
    exercises: standardExercisesDay3,
  },
  {
    dayNumber: 5,
    stageName: 'Tầng 5',
    chapterTitle: 'Chặng 1: Thử Thách Boss',
    focusTitle: '👑 Boss Floor: Full Body Hypertrophy',
    status: 'locked',
    stars: 0,
    isBoss: true,
    expReward: 350,
    calReward: 420,
    positionX: 50,
    exercises: standardExercisesDay3,
  },

  // Chặng 2: Khung Thép Tôi Luyện
  {
    dayNumber: 6,
    stageName: 'Tầng 6',
    chapterTitle: 'Chặng 2: Khung Thép Tôi Luyện',
    focusTitle: 'Incline Dumbbell Press & Dips',
    status: 'locked',
    stars: 0,
    expReward: 220,
    calReward: 280,
    positionX: 75,
    exercises: standardExercisesDay3,
  },
  {
    dayNumber: 7,
    stageName: 'Tầng 7',
    chapterTitle: 'Chặng 2: Khung Thép Tôi Luyện',
    focusTitle: 'Deadlift Power & Lưng Dưới',
    status: 'locked',
    stars: 0,
    expReward: 260,
    calReward: 340,
    positionX: 25,
    exercises: standardExercisesDay3,
  },
  {
    dayNumber: 8,
    stageName: 'Tầng 8',
    chapterTitle: 'Chặng 2: Khung Thép Tôi Luyện',
    focusTitle: 'Leg Extension & Hamstring Curls',
    status: 'locked',
    stars: 0,
    expReward: 240,
    calReward: 310,
    positionX: 65,
    exercises: standardExercisesDay3,
  },
  {
    dayNumber: 9,
    stageName: 'Tầng 9',
    chapterTitle: 'Chặng 2: Khung Thép Tôi Luyện',
    focusTitle: 'Overhead Military Press',
    status: 'locked',
    stars: 0,
    expReward: 230,
    calReward: 290,
    positionX: 30,
    exercises: standardExercisesDay3,
  },
  {
    dayNumber: 10,
    stageName: 'Tầng 10',
    chapterTitle: 'Chặng 2: Thử Thách Boss',
    focusTitle: '👑 Boss Floor: Siêu Chuỗi Sức Mạnh',
    status: 'locked',
    stars: 0,
    isBoss: true,
    expReward: 400,
    calReward: 460,
    positionX: 50,
    exercises: standardExercisesDay3,
  },

  // Chặng 3: Phá Giới Bứt Phá
  {
    dayNumber: 11,
    stageName: 'Tầng 11',
    chapterTitle: 'Chặng 3: Phá Giới Bứt Phá',
    focusTitle: 'Heavy Chest & Cable Fly',
    status: 'locked',
    stars: 0,
    expReward: 280,
    calReward: 350,
    positionX: 75,
    exercises: standardExercisesDay3,
  },
  {
    dayNumber: 12,
    stageName: 'Tầng 12',
    chapterTitle: 'Chặng 3: Phá Giới Bứt Phá',
    focusTitle: 'Weighted Pull-ups & Rows',
    status: 'locked',
    stars: 0,
    expReward: 300,
    calReward: 370,
    positionX: 30,
    exercises: standardExercisesDay3,
  },
  {
    dayNumber: 13,
    stageName: 'Tầng 13',
    chapterTitle: 'Chặng 3: Phá Giới Bứt Phá',
    focusTitle: 'Heavy Squat & Calf Raise',
    status: 'locked',
    stars: 0,
    expReward: 320,
    calReward: 390,
    positionX: 65,
    exercises: standardExercisesDay3,
  },
  {
    dayNumber: 14,
    stageName: 'Tầng 14',
    chapterTitle: 'Chặng 3: Phá Giới Bứt Phá',
    focusTitle: 'Face Pulls & Lateral Blaster',
    status: 'locked',
    stars: 0,
    expReward: 290,
    calReward: 340,
    positionX: 35,
    exercises: standardExercisesDay3,
  },
  {
    dayNumber: 15,
    stageName: 'Tầng 15',
    chapterTitle: 'Chặng 3: Rương Báu',
    focusTitle: '🎁 Rương Báu Tiến Hóa Linh Vật Pet',
    status: 'locked',
    stars: 0,
    isRewardChest: true,
    expReward: 500,
    calReward: 500,
    positionX: 50,
    exercises: standardExercisesDay3,
  },

  // Chặng 4: Đỉnh Cao Thể Lực
  {
    dayNumber: 16,
    stageName: 'Tầng 16',
    chapterTitle: 'Chặng 4: Đỉnh Cao Thể Lực',
    focusTitle: '🏆 ĐỈNH THÁP FORMA: Danh Hiệu Chiến Binh',
    status: 'locked',
    stars: 0,
    isBoss: true,
    expReward: 600,
    calReward: 600,
    positionX: 50,
    exercises: standardExercisesDay3,
  },
];

export const WorkoutTab: React.FC<WorkoutTabProps> = ({
  completedSetsMap,
  onToggleSet,
}) => {
  // Navigation View: 'map' (Candy Crush Tower) OR 'workout' (Tinder/Bumble Exercise Cards)
  const [viewMode, setViewMode] = useState<'map' | 'workout'>('map');
  const [selectedDayNode, setSelectedDayNode] = useState<TowerDayNode>(towerStages[2]); // Default to Day 3 active

  // Exercise card carousel index inside workout view
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showTutorialModal, setShowTutorialModal] = useState<boolean>(false);
  const [showListDrawer, setShowListDrawer] = useState<boolean>(false);
  const [shakeLockedDay, setShakeLockedDay] = useState<number | null>(null);

  // References for Scrollable Card Auto-scroll
  const mapScrollContainerRef = useRef<HTMLDivElement>(null);
  const activeNodeRef = useRef<HTMLDivElement>(null);

  const activeExercises = selectedDayNode.exercises;
  const currentExercise = activeExercises[currentIndex] || activeExercises[0];
  const completedCount = completedSetsMap[currentExercise?.id] || 0;
  const isCurrentDone = completedCount >= (currentExercise?.sets || 4);

  // Auto-scroll to Current Active Floor on mount / view switch
  useEffect(() => {
    if (viewMode === 'map' && activeNodeRef.current) {
      setTimeout(() => {
        activeNodeRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 150);
    }
  }, [viewMode]);

  const scrollToMyPosition = () => {
    activeNodeRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

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
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
  };

  const handleNext = () => {
    if (currentIndex < activeExercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSelectDay = (node: TowerDayNode) => {
    if (node.status === 'locked') {
      setShakeLockedDay(node.dayNumber);
      setTimeout(() => setShakeLockedDay(null), 600);
      return;
    }
    setSelectedDayNode(node);
    setCurrentIndex(0);
    setViewMode('workout');
  };

  // ============================================================
  // VIEW 1: BẢN ĐỒ LEO THÁP LÀ SCROLLABLE CARD (MẶC ĐỊNH)
  // ============================================================
  if (viewMode === 'map') {
    const totalStars = towerStages.reduce((acc, n) => acc + n.stars, 0);

    return (
      <div className="space-y-3 pb-8">
        {/* TOWER TOP STATUS BAR */}
        <div className="forma-card rounded-2xl p-3 border-emerald-500/25 relative overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs shadow-glow-green">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-wider">
                  Tháp Sức Mạnh FORMA
                </h2>
                <p className="text-[10px] text-gray-400 font-mono">Bản đồ leo tháp độc lập • Cuộn để khám phá</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 bg-black/60 border border-emerald-500/30 px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-yellow-400">
              <Star className="w-3.5 h-3.5 fill-yellow-400" />
              <span>{totalStars} / 48 ⭐</span>
            </div>
          </div>

          {/* Quick Action: Resume current stage */}
          <div className="pt-2.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                • VỊ TRÍ HIỆN TẠI •
              </span>
              <span className="text-xs font-bold text-white font-mono">
                {selectedDayNode.stageName}: {selectedDayNode.focusTitle}
              </span>
            </div>

            <button
              onClick={() => {
                const active = towerStages.find((s) => s.status === 'active') || towerStages[2];
                handleSelectDay(active);
              }}
              className="py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-glow-green active:scale-95 transition"
            >
              <Play className="w-3 h-3 fill-black" />
              <span>Tập Ngay</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCROLLABLE CARD: BẢN ĐỒ THÁP ĐỘC LẬP (CUỘN MƯỢT MÀ) */}
        {/* ============================================================ */}
        <div className="relative forma-card rounded-3xl border-emerald-500/20 overflow-hidden shadow-2xl">
          
          {/* Top Banner Hint Inside Card */}
          <div className="sticky top-0 z-30 bg-[#0F1411]/90 backdrop-blur-md px-4 py-2 border-b border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-mono text-gray-400">
              🏰 Cuộn lên để ngắm đỉnh tháp (Tầng 16)
            </span>
            
            {/* Quick jump to active position */}
            <button
              onClick={scrollToMyPosition}
              className="flex items-center space-x-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-lg hover:bg-emerald-500/25 transition active:scale-95"
            >
              <Navigation className="w-3 h-3" />
              <span>Về vị trí Pet</span>
            </button>
          </div>

          {/* SCROLLABLE CONTAINER BODY */}
          <div
            ref={mapScrollContainerRef}
            className="overflow-y-auto max-h-[520px] p-4 relative scroll-smooth space-y-4"
          >
            {/* Ambient Lighting Background */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Summit Banner at Top of Tower */}
            <div className="text-center py-4 relative z-10 border-b border-dashed border-emerald-500/30 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 mb-1">
                <Crown className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xs font-black text-yellow-400 uppercase tracking-widest font-mono">
                Đỉnh Tháp FORMA (Tầng 16)
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">Chinh phục toàn bộ để mở khóa danh hiệu Chiến Binh Tối Thượng</p>
            </div>

            {/* STAGES NODES: REVERSE ORDER (From Summit Tầng 16 down to Tầng 1 Ground) */}
            <div className="relative z-10 flex flex-col-reverse space-y-reverse space-y-10 py-4">
              {towerStages.map((node) => {
                const isShaking = shakeLockedDay === node.dayNumber;
                const isActive = node.status === 'active';

                return (
                  <div
                    key={node.dayNumber}
                    ref={isActive ? activeNodeRef : null}
                    style={{
                      marginLeft: `${node.positionX - 12}%`,
                    }}
                    className={`relative flex flex-col items-center transition-transform duration-300 ${
                      isShaking ? 'animate-bounce' : ''
                    }`}
                  >
                    {/* PET ON CURRENT ACTIVE STAGE */}
                    {isActive && (
                      <div className="absolute -top-12 z-20 flex flex-col items-center animate-bounce">
                        <div className="bg-black/90 border border-emerald-400 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-emerald-400 shadow-glow-green flex items-center space-x-1">
                          <span>🐉 BẠN Ở ĐÂY</span>
                        </div>
                        <div className="w-2 h-2 bg-emerald-400 rotate-45 -mt-1" />
                      </div>
                    )}

                    {/* NODE CIRCLE BUTTON */}
                    <button
                      onClick={() => handleSelectDay(node)}
                      className={`relative w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-300 active:scale-95 shadow-xl ${
                        node.status === 'completed'
                          ? 'bg-gradient-to-b from-emerald-500 to-emerald-700 text-black border-2 border-emerald-300 shadow-glow-green/50'
                          : isActive
                          ? 'bg-emerald-500 text-black border-4 border-white shadow-glow-green animate-pulse ring-4 ring-emerald-500/40'
                          : node.isRewardChest
                          ? 'bg-gradient-to-b from-yellow-600 to-amber-800 text-white border-2 border-yellow-400 shadow-lg'
                          : 'bg-[#151D18] text-gray-500 border-2 border-white/10 opacity-70 hover:opacity-90'
                      }`}
                    >
                      {/* Node Icon / Number */}
                      {node.status === 'completed' ? (
                        <Check className="w-7 h-7 stroke-[3] text-black" />
                      ) : isActive ? (
                        <Dumbbell className="w-7 h-7 stroke-[2.5] text-black" />
                      ) : node.isRewardChest ? (
                        <Gift className="w-6 h-6 text-yellow-300 animate-pulse" />
                      ) : node.isBoss ? (
                        <Crown className="w-6 h-6 text-yellow-500" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-500" />
                      )}

                      {/* Day number badge */}
                      <span
                        className={`text-[9px] font-mono font-black ${
                          node.status === 'completed' || isActive
                            ? 'text-black'
                            : 'text-gray-400'
                        }`}
                      >
                        TẦNG {node.dayNumber}
                      </span>
                    </button>

                    {/* Stars for completed stages */}
                    {node.status === 'completed' && (
                      <div className="flex items-center space-x-0.5 mt-1.5">
                        {Array.from({ length: 3 }).map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    )}

                    {/* Stage description pill */}
                    <div
                      onClick={() => handleSelectDay(node)}
                      className={`mt-1.5 px-2.5 py-1 rounded-xl text-center max-w-[160px] cursor-pointer border transition ${
                        isActive
                          ? 'bg-black/90 border-emerald-500/50 text-white ring-1 ring-emerald-400/30'
                          : node.status === 'completed'
                          ? 'bg-black/60 border-white/10 text-gray-300'
                          : 'bg-black/40 border-white/5 text-gray-500'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold block truncate">
                        {node.focusTitle}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400">
                        +{node.expReward} EXP
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Base of Tower footer note */}
            <div className="text-center py-2 text-[10px] font-mono text-gray-500 border-t border-white/5">
              • Chân Tháp Khởi Động •
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // VIEW 2: GIAO DIỆN BÀI TẬP HIỆN TẠI (TINDER/BUMBLE CARD STACK)
  // BẬT KHI USER BẤM VÀO Ô NGÀY TRÊN BẢN ĐỒ
  // ============================================================
  return (
    <div className="space-y-3 pb-8">
      {/* 1. TOP BAR: BACK TO TOWER MAP + DAY TITLE + LIST BUTTON */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={() => setViewMode('map')}
          className="flex items-center space-x-1.5 py-1.5 px-3 rounded-xl bg-black/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold hover:bg-emerald-500/15 transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bản Đồ Tháp</span>
        </button>

        <div className="text-right">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
            {selectedDayNode.stageName}
          </span>
          <h2 className="text-sm font-black text-white truncate max-w-[190px]">
            {selectedDayNode.focusTitle}
          </h2>
        </div>

        {/* LIST ICON BUTTON TO OPEN EXERCISE DRAWER */}
        <button
          onClick={() => setShowListDrawer(true)}
          className="p-2 rounded-xl bg-black/50 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/15 transition shadow-glow-green/20"
          title="Xem danh sách bài tập"
        >
          <List className="w-4 h-4 stroke-[2.5]" />
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
        {/* Background Exercise Photo */}
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
            {activeExercises.map((ex, idx) => {
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
              BÀI {currentIndex + 1} / {activeExercises.length}
            </span>
            <span className="text-gray-300 font-semibold bg-black/60 px-2.5 py-0.5 rounded-lg border border-white/10">
              {Object.values(completedSetsMap).filter((c) => c >= 3).length} / {activeExercises.length} bài xong
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
              disabled={currentIndex === activeExercises.length - 1}
              className={`px-3 py-1 rounded-xl font-bold flex items-center space-x-1 transition ${
                isCurrentDone && currentIndex < activeExercises.length - 1
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

            {/* Pro Training Tips */}
            <div className="bg-emerald-500/10 rounded-2xl p-3.5 border border-emerald-500/20 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-emerald-400">
                <Lightbulb className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Mẹo Huấn Luyện Viên AI
                </span>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-sans">
                {currentExercise.tips}
              </p>
            </div>

            {/* Done Button */}
            <button
              onClick={() => setShowTutorialModal(false)}
              className="w-full py-3 rounded-2xl bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-400 transition"
            >
              Đã Hiểu • Bắt Đầu Tập
            </button>
          </div>
        </div>
      )}

      {/* 4. LIST DRAWER: LIST OF ALL EXERCISES */}
      {showListDrawer && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md mx-auto bg-[#0F1411] border-t border-emerald-500/30 rounded-t-3xl p-5 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Dumbbell className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  Danh Sách Bài Hôm Nay ({activeExercises.length})
                </span>
              </div>

              <button
                onClick={() => setShowListDrawer(false)}
                className="p-1 rounded-lg bg-white/5 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List items */}
            <div className="space-y-2">
              {activeExercises.map((ex, idx) => {
                const count = completedSetsMap[ex.id] || 0;
                const done = count >= ex.sets;
                const isSelected = idx === currentIndex;

                return (
                  <div
                    key={ex.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowListDrawer(false);
                    }}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-400'
                        : done
                        ? 'bg-black/40 border-emerald-500/30 opacity-75'
                        : 'bg-black/30 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                          done
                            ? 'bg-emerald-500 text-black'
                            : isSelected
                            ? 'bg-white text-black'
                            : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {done ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{ex.name}</h4>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                          {ex.sets} sets • {ex.rep_range}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-mono font-bold text-emerald-400">
                        {count}/{ex.sets}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowListDrawer(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider"
            >
              Đóng Danh Sách
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
