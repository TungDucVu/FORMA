'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, ShieldAlert, Percent, MapPin, Utensils, ChevronDown, ChevronUp } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  icon: any;
  completed: boolean;
  reward: string;
}

export const ProfileChecklist: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: 'injuries',
      label: 'Cập nhật tiền sử chấn thương (để AI bảo vệ khớp)',
      icon: ShieldAlert,
      completed: false,
      reward: '+10% Độ an toàn',
    },
    {
      id: 'bodyfat',
      label: 'Nhập tỷ lệ Body Fat % (ước tính hoặc Inbody)',
      icon: Percent,
      completed: false,
      reward: '+10% Chuẩn xác Macro',
    },
    {
      id: 'equipment',
      label: 'Chọn không gian tập (Gym đầy đủ tạ vs Tại nhà)',
      icon: MapPin,
      completed: true,
      reward: 'Đã hoàn tất',
    },
    {
      id: 'diet',
      label: 'Khai báo dị ứng & thực phẩm kiêng khem',
      icon: Utensils,
      completed: false,
      reward: '+10% Tối ưu thực đơn',
    },
  ]);

  const completedCount = items.filter((i) => i.completed).length + 2; // +2 for mandatory onboarding
  const totalCount = items.length + 2;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 overflow-hidden transition-all">
      {/* Header bar */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center space-x-2.5">
          <div className="relative w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center font-mono text-[11px] font-bold text-emerald-400">
            {percentage}%
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center space-x-1.5">
              <span>Hồ sơ thể lực cá nhân</span>
              <span className="text-[10px] font-normal text-emerald-400 font-mono">
                ({completedCount}/{totalCount} mục)
              </span>
            </div>
            <div className="text-[11px] text-gray-400">Hoàn thiện dần để AI cá nhân hóa sâu hơn</div>
          </div>
        </div>

        <button className="text-gray-400 hover:text-white p-1">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Progress line */}
      <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Expandable checklist */}
      {expanded && (
        <div className="mt-3.5 pt-3 border-t border-white/5 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                  item.completed
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-gray-300'
                    : 'bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/15'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {item.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-500 shrink-0" />
                  )}
                  <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className={item.completed ? 'line-through text-gray-500' : 'text-gray-200'}>
                    {item.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold shrink-0 ml-2">
                  {item.reward}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

