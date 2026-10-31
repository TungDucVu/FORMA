'use client';

import React, { useState } from 'react';
import { User, Settings, CheckCircle2, Circle, ShieldAlert, Percent, MapPin, Utensils, RotateCcw, ChevronRight } from 'lucide-react';

interface ProfileTabProps {
  onReopenOnboarding: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ onReopenOnboarding }) => {
  const [profile, setProfile] = useState({
    name: 'Vũ Minh (FORMA Athlete)',
    gender: 'Nam',
    age: 24,
    height: 172,
    weight: 68.5,
    goal: 'Tăng cơ (Lean Bulk)',
    frequency: '4 buổi / tuần',
  });

  const [checklist, setChecklist] = useState([
    { id: '1', title: 'Cập nhật tiền sử chấn thương (để AI né khớp)', icon: ShieldAlert, done: false, bonus: '+10% An toàn' },
    { id: '2', title: 'Nhập tỷ lệ Body Fat % (InBody / Đo kẹp)', icon: Percent, done: false, bonus: '+10% Chuẩn xác' },
    { id: '3', title: 'Chọn không gian tập (Gym đầy đủ tạ)', icon: MapPin, done: true, bonus: 'Đã hoàn tất' },
    { id: '4', title: 'Khai báo thực phẩm kiêng khem / Dị ứng', icon: Utensils, done: false, bonus: '+10% Thực đơn' },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const completedCount = checklist.filter((c) => c.done).length + 2;
  const totalCount = checklist.length + 2;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-4">
      {/* 1. Profile Header Card */}
      <div className="forma-card rounded-2xl p-4 flex items-center space-x-3.5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-xl shrink-0">
          VM
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-extrabold text-white truncate">{profile.name}</h3>
          <p className="text-xs text-emerald-400 font-mono mt-0.5">{profile.goal}</p>
          <div className="text-[11px] text-gray-400 font-mono mt-1">
            {profile.gender} • {profile.age} tuổi • {profile.height} cm • {profile.weight} kg
          </div>
        </div>
      </div>

      {/* 2. Profile Completion Progress & Checklist */}
      <div className="forma-card rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wide">Hồ Sơ Thể Lực</span>
            <p className="text-[11px] text-gray-400">Hoàn thiện dần để AI cá nhân hóa sâu hơn</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            {percentage}% HOÀN THÀNH
          </span>
        </div>

        {/* Progress line */}
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Checklist items */}
        <div className="space-y-2 pt-1">
          {checklist.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition ${
                  item.done
                    ? 'bg-emerald-500/10 border-emerald-500/25 text-gray-300'
                    : 'bg-black/30 border-white/5 text-gray-400 hover:border-white/15'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  {item.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-500 shrink-0" />
                  )}
                  <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className={`truncate ${item.done ? 'line-through text-gray-400' : 'text-gray-200'}`}>
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 shrink-0 ml-2">
                  {item.bonus}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Settings & Options */}
      <div className="forma-card rounded-2xl p-4 space-y-2">
        <span className="text-xs font-bold text-white uppercase tracking-wide block mb-1">
          Cài Đặt Ứng Dụng
        </span>

        <button
          onClick={onReopenOnboarding}
          className="w-full p-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/5 flex items-center justify-between text-xs text-gray-300 transition"
        >
          <div className="flex items-center space-x-2.5">
            <RotateCcw className="w-4 h-4 text-emerald-400" />
            <span>Mở lại Onboarding & Tính lại Calo</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>

        <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs text-gray-300">
          <span>Đơn vị đo lường</span>
          <span className="font-mono text-emerald-400 font-bold">Metric (kg / cm)</span>
        </div>

        <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs text-gray-300">
          <span>Hệ thống AI Engine</span>
          <span className="font-mono text-emerald-400 font-bold">Google Gemini Flash</span>
        </div>
      </div>
    </div>
  );
};

