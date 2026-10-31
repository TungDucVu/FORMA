'use client';

import React, { useState } from 'react';
import { Utensils, Plus, Clock, Camera, Sparkles } from 'lucide-react';

export interface MealItem {
  id: string;
  name: string;
  meal_type: 'Bữa sáng' | 'Bữa trưa' | 'Bữa tối' | 'Bữa phụ';
  time: string;
  image_url: string;
  calories: number;
  protein: number;
  carb: number;
  fat: number;
  verified_by_ai: boolean;
}

interface MacroTabProps {
  onOpenAddModal: () => void;
}

export const MacroTab: React.FC<MacroTabProps> = ({ onOpenAddModal }) => {
  // Sample meals already logged today
  const [meals, setMeals] = useState<MealItem[]>([
    {
      id: 'm-1',
      name: 'Trứng Ốp La & Bánh Mì Đen Quả Bơ',
      meal_type: 'Bữa sáng',
      time: '07:45',
      image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80',
      calories: 420,
      protein: 26,
      carb: 38,
      fat: 16,
      verified_by_ai: true,
    },
    {
      id: 'm-2',
      name: 'Cơm Gạo Lứt Ức Gà Nướng & Bông Cải',
      meal_type: 'Bữa trưa',
      time: '12:30',
      image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
      calories: 580,
      protein: 48,
      carb: 62,
      fat: 12,
      verified_by_ai: true,
    },
    {
      id: 'm-3',
      name: 'Sữa Chua Hy Lạp Trộn Hạt Chia & Chuối',
      meal_type: 'Bữa phụ',
      time: '16:15',
      image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
      calories: 250,
      protein: 20,
      carb: 32,
      fat: 5,
      verified_by_ai: true,
    },
    {
      id: 'm-4',
      name: 'Phở Bò Tái Nạm (Ước tính calo AI)',
      meal_type: 'Bữa tối',
      time: '19:40',
      image_url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80',
      calories: 600,
      protein: 48,
      carb: 73,
      fat: 18,
      verified_by_ai: true,
    },
  ]);

  const totalCalories = meals.reduce((acc, m) => acc + m.calories, 0);
  const totalProtein = meals.reduce((acc, m) => acc + m.protein, 0);
  const totalCarb = meals.reduce((acc, m) => acc + m.carb, 0);
  const totalFat = meals.reduce((acc, m) => acc + m.fat, 0);

  return (
    <div className="space-y-4">
      {/* Header Info & Add action */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
            NHẬT KÝ BỮA ĂN • HÔM NAY
          </span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">Bữa Ăn Đã Nạp</h2>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 text-xs font-bold font-mono flex items-center space-x-1.5 transition"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Chụp Món</span>
        </button>
      </div>

      {/* Daily Total Summary Card */}
      <div className="forma-card rounded-2xl p-4">
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-xs font-mono text-gray-400 uppercase">TỔNG NẠP TRONG NGÀY</span>
          <span className="text-lg font-extrabold text-emerald-400 font-mono">
            {totalCalories} <span className="text-xs text-gray-500 font-normal">kcal</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center font-mono">
          <div className="bg-black/40 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-400 block mb-0.5">PROTEIN</span>
            <span className="text-xs font-bold text-white">{totalProtein}g</span>
          </div>
          <div className="bg-black/40 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-400 block mb-0.5">CARB</span>
            <span className="text-xs font-bold text-white">{totalCarb}g</span>
          </div>
          <div className="bg-black/40 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-400 block mb-0.5">FAT</span>
            <span className="text-xs font-bold text-white">{totalFat}g</span>
          </div>
        </div>
      </div>

      {/* List of Meal Cards */}
      <div className="space-y-3">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="forma-card rounded-2xl p-3.5 flex items-start space-x-3.5 border border-white/10"
          >
            {/* Meal Photo */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black/60 shrink-0 border border-white/5">
              <img
                src={meal.image_url}
                alt={meal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 left-1 bg-black/70 px-1.5 py-0.5 rounded text-[9px] font-mono text-emerald-400">
                {meal.time}
              </div>
            </div>

            {/* Meal Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    {meal.meal_type}
                  </span>
                  <span className="text-xs font-extrabold text-white font-mono">
                    {meal.calories} kcal
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mt-0.5 truncate">{meal.name}</h4>
              </div>

              {/* Macro breakdown pills */}
              <div className="flex items-center space-x-2 text-[10px] font-mono pt-1 text-gray-300">
                <span className="bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
                  P: <strong className="text-emerald-400">{meal.protein}g</strong>
                </span>
                <span className="bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
                  C: <strong className="text-white">{meal.carb}g</strong>
                </span>
                <span className="bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
                  F: <strong className="text-gray-400">{meal.fat}g</strong>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

