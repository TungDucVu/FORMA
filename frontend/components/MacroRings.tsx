'use client';

import React from 'react';

interface MacroRingsProps {
  calories: { current: number; target: number };
  protein: { current: number; target: number };
  carbs: { current: number; target: number };
  fat: { current: number; target: number };
}

export const MacroRings: React.FC<MacroRingsProps> = ({ calories, protein, carbs, fat }) => {
  const calPct = Math.min(100, Math.round((calories.current / calories.target) * 100));
  const proPct = Math.min(100, Math.round((protein.current / protein.target) * 100));
  const carbPct = Math.min(100, Math.round((carbs.current / carbs.target) * 100));
  const fatPct = Math.min(100, Math.round((fat.current / fat.target) * 100));

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10">
      {/* Calories Overview */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
        <div>
          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">CALORIES HÔM NAY</span>
          <div className="text-2xl font-extrabold text-white font-mono mt-0.5">
            {calories.current} <span className="text-xs text-gray-400 font-sans font-normal">/ {calories.target} kcal</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            {calPct}%
          </span>
        </div>
      </div>

      {/* Main Calories Bar */}
      <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mb-4">
        <div
          className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-500"
          style={{ width: `${calPct}%` }}
        />
      </div>

      {/* Macro Split 3 columns */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        {/* Protein */}
        <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
          <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 mb-1">
            <span>PROTEIN</span>
            <span>{proPct}%</span>
          </div>
          <div className="text-sm font-bold text-white font-mono">
            {protein.current}<span className="text-[10px] text-gray-400 font-normal">/{protein.target}g</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1.5">
            <div className="bg-cyan-400 h-full" style={{ width: `${proPct}%` }} />
          </div>
        </div>

        {/* Carbs */}
        <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
          <div className="flex justify-between items-center text-[10px] font-mono text-amber-400 mb-1">
            <span>CARBS</span>
            <span>{carbPct}%</span>
          </div>
          <div className="text-sm font-bold text-white font-mono">
            {carbs.current}<span className="text-[10px] text-gray-400 font-normal">/{carbs.target}g</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1.5">
            <div className="bg-amber-400 h-full" style={{ width: `${carbPct}%` }} />
          </div>
        </div>

        {/* Fat */}
        <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
          <div className="flex justify-between items-center text-[10px] font-mono text-pink-400 mb-1">
            <span>FAT</span>
            <span>{fatPct}%</span>
          </div>
          <div className="text-sm font-bold text-white font-mono">
            {fat.current}<span className="text-[10px] text-gray-400 font-normal">/{fat.target}g</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1.5">
            <div className="bg-pink-400 h-full" style={{ width: `${fatPct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

