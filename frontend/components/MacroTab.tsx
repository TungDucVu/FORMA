'use client';

import React, { useState } from 'react';
import { Utensils, Camera, Clock, ChefHat, Sparkles, X, Check, Flame, ChevronRight, BookOpen } from 'lucide-react';

export interface LoggedMealItem {
  id: string;
  name: string;
  meal_type: 'Bữa sáng' | 'Bữa trưa' | 'Bữa tối' | 'Bữa phụ';
  time: string;
  image_url: string;
  calories: number;
  protein: number;
  carb: number;
  fat: number;
}

export interface SuggestedRecipeItem {
  id: string;
  meal_type: 'Bữa sáng' | 'Bữa trưa' | 'Bữa tối' | 'Bữa xế';
  name: string;
  image_url: string;
  prep_time: string;
  calories: number;
  protein: number;
  carb: number;
  fat: number;
  why_recommended: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
}

interface MacroTabProps {
  onOpenAddModal: () => void;
  onLogSuggestedMeal?: (meal: { name: string; calories: number; protein: number; carb: number; fat: number }) => void;
}

export const MacroTab: React.FC<MacroTabProps> = ({ onOpenAddModal, onLogSuggestedMeal }) => {
  // 2 Sub-tabs: 'logged' (Nhật Ký Đã Ăn) vs 'suggested' (Gợi Ý Thực Đơn AI)
  const [subTab, setSubTab] = useState<'logged' | 'suggested'>('logged');

  // Logged meals state
  const [loggedMeals, setLoggedMeals] = useState<LoggedMealItem[]>([
    {
      id: 'm-1',
      name: 'Trứng Ốp La & Bánh Mì Đen Quả Bơ',
      meal_type: 'Bữa sáng',
      time: '07:45',
      image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
      calories: 420,
      protein: 26,
      carb: 38,
      fat: 16,
    },
    {
      id: 'm-2',
      name: 'Cơm Gạo Lứt Ức Gà Nướng & Bông Cải Xanh',
      meal_type: 'Bữa trưa',
      time: '12:30',
      image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      calories: 580,
      protein: 48,
      carb: 62,
      fat: 12,
    },
    {
      id: 'm-3',
      name: 'Sữa Chua Hy Lạp Trộn Hạt Chia & Chuối',
      meal_type: 'Bữa phụ',
      time: '16:15',
      image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
      calories: 250,
      protein: 20,
      carb: 32,
      fat: 5,
    },
    {
      id: 'm-4',
      name: 'Phở Bò Tái Nạc Không Nước Béo',
      meal_type: 'Bữa tối',
      time: '19:40',
      image_url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80',
      calories: 600,
      protein: 48,
      carb: 73,
      fat: 18,
    },
  ]);

  // AI Suggested recipes state
  const suggestedRecipes: SuggestedRecipeItem[] = [
    {
      id: 'sug-1',
      meal_type: 'Bữa sáng',
      name: 'Cháo Yến Mạch Nấu Trứng Gà & Nấm Hương',
      image_url: 'https://images.unsplash.com/photo-1505253758473-96b3015f240a?auto=format&fit=crop&w=600&q=80',
      prep_time: '10 phút',
      calories: 390,
      protein: 25,
      carb: 45,
      fat: 11,
      why_recommended: 'Cung cấp carb hấp thu chậm, giữ mức đường huyết ổn định cả buổi sáng.',
      ingredients: [
        { name: 'Yến mạch cán dẹt', amount: '50g' },
        { name: 'Trứng gà ta', amount: '2 quả' },
        { name: 'Nấm hương tươi', amount: '40g' },
        { name: 'Hành lá, gia vị tiêu muối', amount: 'Vừa đủ' }
      ],
      steps: [
        'Đun sôi 300ml nước, cho yến mạch và nấm hương thái lát vào đun nhỏ lửa trong 5 phút.',
        'Đập 2 quả trứng gà vào nồi, khuấy nhẹ tay theo vòng tròn để tạo vân trứng mịn.',
        'Nêm 1/2 thìa cà phê nước mắm, rắc tiêu và hành lá rồi thưởng thức nóng.'
      ]
    },
    {
      id: 'sug-2',
      meal_type: 'Bữa trưa',
      name: 'Ức Gà Xào Nấm Đùi Gà & Khoai Lang Hấp',
      image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
      prep_time: '15 phút',
      calories: 560,
      protein: 52,
      carb: 58,
      fat: 10,
      why_recommended: 'Đạt chuẩn 50g protein tinh khiết phục hồi sợi cơ sau buổi tập sáng.',
      ingredients: [
        { name: 'Ức gà phi lê', amount: '200g' },
        { name: 'Khoai lang vàng hấp', amount: '180g' },
        { name: 'Nấm đùi gà', amount: '80g' },
        { name: 'Dầu ô liu', amount: '1 thìa cà phê (5ml)' }
      ],
      steps: [
        'Ức gà thái quân cờ, ướp với chút tỏi băm, tiêu và hạt nêm trong 10 phút.',
        'Làm nóng chảo với 1 thìa dầu ô liu, áp chảo ức gà đến khi săn vàng 2 mặt.',
        'Cho nấm đùi gà vào đảo đều trong 3 phút đến khi nấm chín mềm và thơm.',
        'Bày ra đĩa ăn kèm khoai lang vàng đã hấp chín.'
      ]
    },
    {
      id: 'sug-3',
      meal_type: 'Bữa xế',
      name: 'Sinh Tố Bơ Chuối Protein Isolate',
      image_url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
      prep_time: '5 phút',
      calories: 310,
      protein: 28,
      carb: 35,
      fat: 7,
      why_recommended: 'Bù điện giải và năng lượng tức thời 60 phút trước buổi tập.',
      ingredients: [
        { name: 'Sữa tươi không đường', amount: '200ml' },
        { name: 'Whey Protein Isolate (Vanilla)', amount: '1 muỗng (30g)' },
        { name: 'Chuối tiêu đông lạnh', amount: '1 quả (80g)' },
        { name: 'Bơ sáp', amount: '30g' }
      ],
      steps: [
        'Cho tất cả nguyên liệu vào cối xay sinh tố.',
        'Xay ở tốc độ cao trong 45 giây đến khi hỗn hợp sánh mịn.',
        'Uống lạnh ngay để giữ trọn vẹn chất chống oxy hóa.'
      ]
    },
    {
      id: 'sug-4',
      meal_type: 'Bữa tối',
      name: 'Cá Hồi Áp Chảo Măng Tây & Cơm Gạo Lứt',
      image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
      prep_time: '20 phút',
      calories: 590,
      protein: 44,
      carb: 54,
      fat: 18,
      why_recommended: 'Giàu Omega-3 giảm viêm cơ bắp, hỗ trợ sản sinh hormone ngủ sâu.',
      ingredients: [
        { name: 'Phi lê cá hồi tươi', amount: '160g' },
        { name: 'Măng tây tươi', amount: '100g' },
        { name: 'Cơm gạo lứt huyết rồng', amount: '1 bát nhỏ (130g)' },
        { name: 'Chanh vàng & lá thì là', amount: 'Vừa đủ' }
      ],
      steps: [
        'Ướp cá hồi với chút muối biển, tiêu đen xay và nước cốt chanh vàng.',
        'Áp chảo cá hồi mỗi mặt 3-4 phút đến khi da cá giòn rụm.',
        'Xào sơ măng tây với chút tỏi trên cùng chảo để thấm hương vị cá.',
        'Thưởng thức cùng bát cơm gạo lứt ấm nóng.'
      ]
    }
  ];

  // Active selected recipe for modal
  const [selectedRecipe, setSelectedRecipe] = useState<SuggestedRecipeItem | null>(null);

  const totalCalories = loggedMeals.reduce((acc, m) => acc + m.calories, 0);
  const totalProtein = loggedMeals.reduce((acc, m) => acc + m.protein, 0);
  const totalCarb = loggedMeals.reduce((acc, m) => acc + m.carb, 0);
  const totalFat = loggedMeals.reduce((acc, m) => acc + m.fat, 0);

  const handleLogFromRecipe = (recipe: SuggestedRecipeItem) => {
    const newMeal: LoggedMealItem = {
      id: `m-${Date.now()}`,
      name: recipe.name,
      meal_type: recipe.meal_type as any,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image_url: recipe.image_url,
      calories: recipe.calories,
      protein: recipe.protein,
      carb: recipe.carb,
      fat: recipe.fat,
    };
    setLoggedMeals((prev) => [newMeal, ...prev]);
    if (onLogSuggestedMeal) {
      onLogSuggestedMeal({
        name: recipe.name,
        calories: recipe.calories,
        protein: recipe.protein,
        carb: recipe.carb,
        fat: recipe.fat,
      });
    }
    setSelectedRecipe(null);
    setSubTab('logged');
  };

  return (
    <div className="space-y-4">
      {/* 1. TOP HEADER & 2 SUB-TABS (SEGMENTED CONTROL) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              DINH DƯỠNG & KHẨU PHẦN
            </span>
            <h2 className="text-xl font-extrabold text-white mt-0.5">Dinh Dưỡng Hôm Nay</h2>
          </div>

          <button
            onClick={onOpenAddModal}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-extrabold font-mono flex items-center space-x-1.5 shadow-glow-green transition"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Chụp Món</span>
          </button>
        </div>

        {/* 2 Sub-Tabs Selector */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs">
          <button
            onClick={() => setSubTab('logged')}
            className={`py-2 rounded-xl font-bold transition flex items-center justify-center space-x-1.5 ${
              subTab === 'logged'
                ? 'bg-emerald-500 text-black shadow-glow-green'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Nhật Ký Đã Ăn</span>
          </button>

          <button
            onClick={() => setSubTab('suggested')}
            className={`py-2 rounded-xl font-bold transition flex items-center justify-center space-x-1.5 ${
              subTab === 'suggested'
                ? 'bg-emerald-500 text-black shadow-glow-green'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gợi Ý Thực Đơn AI</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SUB-TAB 1: NHẬT KÝ ĐÃ ĂN (USER LOGGED MEALS) */}
      {/* ============================================================ */}
      {subTab === 'logged' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          {/* Summary Box */}
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
                <span className="text-xs font-bold text-emerald-400">{totalProtein}g</span>
              </div>
              <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 block mb-0.5">CARB</span>
                <span className="text-xs font-bold text-white">{totalCarb}g</span>
              </div>
              <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 block mb-0.5">FAT</span>
                <span className="text-xs font-bold text-gray-300">{totalFat}g</span>
              </div>
            </div>
          </div>

          {/* List of Logged Meals */}
          <div className="space-y-3">
            {loggedMeals.map((meal) => (
              <div
                key={meal.id}
                className="forma-card rounded-2xl p-3.5 flex items-start space-x-3.5 border border-white/10"
              >
                {/* Photo */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black/60 shrink-0 border border-white/5">
                  <img
                    src={meal.image_url}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-emerald-400">
                    {meal.time}
                  </div>
                </div>

                {/* Details */}
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

                  {/* Macros */}
                  <div className="flex items-center space-x-2 text-[10px] font-mono pt-1">
                    <span className="bg-black/40 px-1.5 py-0.5 rounded border border-white/5 text-gray-300">
                      P: <strong className="text-emerald-400">{meal.protein}g</strong>
                    </span>
                    <span className="bg-black/40 px-1.5 py-0.5 rounded border border-white/5 text-gray-300">
                      C: <strong className="text-white">{meal.carb}g</strong>
                    </span>
                    <span className="bg-black/40 px-1.5 py-0.5 rounded border border-white/5 text-gray-400">
                      F: <strong>{meal.fat}g</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 2: GỢI Ý THỰC ĐƠN AI (AI SUGGESTED RECIPES) */}
      {/* ============================================================ */}
      {subTab === 'suggested' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="forma-card rounded-2xl p-3.5 border-emerald-500/30 flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-xs text-gray-300 leading-relaxed">
              Thực đơn do <strong className="text-white">Gemini Flash</strong> tính toán chuẩn xác theo thặng dư/thâm hụt calo của bạn. Bấm vào món để xem <strong className="text-emerald-400">công thức chi tiết</strong>.
            </p>
          </div>

          {/* Recipe Cards List */}
          <div className="space-y-3">
            {suggestedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="forma-card rounded-2xl p-4 border border-white/10 hover:border-emerald-500/40 cursor-pointer transition flex flex-col space-y-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-emerald-400 font-bold uppercase">
                      <span>{recipe.meal_type}</span>
                      <span>•</span>
                      <span className="text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-0.5 inline" /> {recipe.prep_time}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-white mt-1 group-hover:text-emerald-300 transition">
                      {recipe.name}
                    </h4>
                  </div>

                  <span className="text-xs font-mono font-bold text-white bg-black/40 px-2.5 py-1 rounded-lg border border-white/5 shrink-0">
                    {recipe.calories} kcal
                  </span>
                </div>

                {/* Recipe preview image */}
                <div className="relative w-full h-32 rounded-xl overflow-hidden bg-black/60 border border-white/5">
                  <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-95 transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 justify-between">
                    <span className="text-[10px] text-gray-300 font-mono">
                      P: <strong className="text-emerald-400">{recipe.protein}g</strong> • C: {recipe.carb}g • F: {recipe.fat}g
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center space-x-0.5">
                      <span>Xem công thức</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* RECIPE DETAILS MODAL (WHEN CLICKING SUGGESTED MEAL CARD) */}
      {/* ============================================================ */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0F1411] border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <ChefHat className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    CÔNG THỨC AI • {selectedRecipe.meal_type}
                  </span>
                  <h3 className="text-base font-extrabold text-white truncate max-w-[240px]">
                    {selectedRecipe.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedRecipe(null)}
                className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo & Macro summary */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-black border border-white/10 shrink-0">
              <img
                src={selectedRecipe.image_url}
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-3 justify-between">
                <div>
                  <span className="text-lg font-black text-white font-mono">{selectedRecipe.calories} kcal</span>
                  <div className="text-[11px] font-mono text-gray-300">
                    Protein: <strong className="text-emerald-400">{selectedRecipe.protein}g</strong> • Carb: {selectedRecipe.carb}g • Fat: {selectedRecipe.fat}g
                  </div>
                </div>
                <span className="text-xs font-mono text-gray-300 bg-black/60 px-2 py-1 rounded border border-white/10">
                  ⏱️ {selectedRecipe.prep_time}
                </span>
              </div>
            </div>

            {/* Why recommended */}
            <div className="bg-black/40 rounded-xl p-3 border border-white/5 text-xs text-gray-300">
              <span className="text-emerald-400 font-bold font-mono block mb-0.5">LÝ DO AI ĐỀ XUẤT:</span>
              <p className="leading-relaxed">{selectedRecipe.why_recommended}</p>
            </div>

            {/* Ingredients list */}
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nguyên Liệu Cần Chuẩn Bị</span>
              </h4>
              <div className="space-y-1.5">
                {selectedRecipe.ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 rounded-xl bg-black/30 border border-white/5 text-xs font-mono"
                  >
                    <span className="text-gray-200">{ing.name}</span>
                    <span className="text-emerald-400 font-bold">{ing.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cooking steps */}
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <ChefHat className="w-3.5 h-3.5 text-emerald-400" />
                <span>Các Bước Chế Biến</span>
              </h4>
              <div className="space-y-2">
                {selectedRecipe.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs text-gray-300 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              <button
                onClick={() => handleLogFromRecipe(selectedRecipe)}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-glow-green transition"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>ĐÃ ĂN MÓN NÀY & NẠP VÀO HÔM NAY</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
