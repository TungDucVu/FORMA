'use client';

import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Activity, 
  Heart, 
  ShieldAlert, 
  Utensils, 
  Edit3, 
  Check, 
  X, 
  RotateCcw, 
  ChevronRight, 
  Camera, 
  Scale, 
  Flame, 
  Bell, 
  Globe, 
  SlidersHorizontal 
} from 'lucide-react';

interface ProfileTabProps {
  onReopenOnboarding: () => void;
}

export interface UserProfileData {
  // Card 1: Ảnh, Tên, Mục tiêu
  name: string;
  avatarUrl: string;
  gender: 'Nam' | 'Nữ';
  age: number;
  goal: string;
  frequency: string;

  // Card 2: Chỉ số Body
  height: number; // cm
  weight: number; // kg
  bodyFat: number; // %

  // Card 3: Chỉ số Sức khỏe
  bmr: number; // kcal
  tdee: number; // kcal
  activityLevel: string;
  restingHeartRate: number; // bpm

  // Card 4: Chấn thương & Kiêng khem
  injuries: string;
  dietaryRestrictions: string;

  // Card 5: Cài đặt ứng dụng
  weightUnit: 'kg' | 'lbs';
  notifications: boolean;
  language: string;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ onReopenOnboarding }) => {
  const [profile, setProfile] = useState<UserProfileData>({
    name: 'Vũ Minh',
    avatarUrl: '/logo.png',
    gender: 'Nam',
    age: 24,
    goal: 'Tăng cơ (Lean Bulk)',
    frequency: '4 buổi / tuần',

    height: 172,
    weight: 68.5,
    bodyFat: 14.5,

    bmr: 1650,
    tdee: 2450,
    activityLevel: 'Vận động vừa phải (1.55 • Gym 3-5 buổi)',
    restingHeartRate: 64,

    injuries: 'Khớp gối mỏi khi squat nặng; cần né xoay gập gối quá 90 độ',
    dietaryRestrictions: 'Dị ứng hải sản có vỏ (tôm, cua); hạn chế sữa có lactose',

    weightUnit: 'kg',
    notifications: true,
    language: 'Tiếng Việt',
  });

  // Modal State for Editing
  const [activeModal, setActiveModal] = useState<
    'identity' | 'body' | 'health' | 'diet' | 'settings' | null
  >(null);

  // Form draft state during modal edit
  const [draft, setDraft] = useState<UserProfileData>(profile);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const openEdit = (modalType: 'identity' | 'body' | 'health' | 'diet' | 'settings') => {
    setDraft({ ...profile });
    setActiveModal(modalType);
  };

  const handleSave = () => {
    // Recalculate BMI and dynamic BMR if body changes
    let newBmr = draft.bmr;
    let newTdee = draft.tdee;
    if (draft.weight && draft.height && draft.age) {
      if (draft.gender === 'Nam') {
        newBmr = Math.round(10 * draft.weight + 6.25 * draft.height - 5 * draft.age + 5);
      } else {
        newBmr = Math.round(10 * draft.weight + 6.25 * draft.height - 5 * draft.age - 161);
      }
      newTdee = Math.round(newBmr * 1.55);
    }

    setProfile({
      ...draft,
      bmr: newBmr,
      tdee: newTdee,
    });
    setActiveModal(null);
    setSaveToast('Đã cập nhật thông tin thành công!');
    setTimeout(() => setSaveToast(null), 2500);
  };

  // Derived BMI
  const bmi = (profile.weight / ((profile.height / 100) * (profile.height / 100))).toFixed(1);

  return (
    <div className="space-y-3.5 pb-6">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-black px-4 py-2 rounded-xl text-xs font-bold shadow-glow-green animate-in fade-in flex items-center space-x-1.5">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* CARD 1: ẢNH ĐẠI DIỆN, TÊN & MỤC TIÊU */}
      {/* ============================================================ */}
      <div
        onClick={() => openEdit('identity')}
        className="forma-card rounded-2xl p-4 border-emerald-500/25 hover:border-emerald-500/40 cursor-pointer transition active:scale-[0.99] group relative overflow-hidden"
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-3">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Hồ Sơ Cá Nhân</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1 group-hover:underline">
            <Edit3 className="w-3 h-3" />
            <span>Sửa</span>
          </span>
        </div>

        <div className="flex items-center space-x-3.5">
          {/* Avatar with Camera Placeholder */}
          <div className="relative group shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/40 p-0.5 flex items-center justify-center overflow-hidden">
              <img
                src={profile.avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center">
              <Camera className="w-3 h-3 stroke-[2.5]" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-black text-white truncate">{profile.name}</h3>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 rounded-full">
                {profile.gender} • {profile.age}t
              </span>
            </div>
            <div className="text-xs font-semibold text-emerald-400 font-mono mt-0.5 truncate">
              🎯 {profile.goal}
            </div>
            <p className="text-[11px] text-gray-400 font-mono mt-0.5">
              Lịch tập: {profile.frequency}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CARD 2: CHỈ SỐ BODY */}
      {/* ============================================================ */}
      <div
        onClick={() => openEdit('body')}
        className="forma-card rounded-2xl p-4 border-emerald-500/25 hover:border-emerald-500/40 cursor-pointer transition active:scale-[0.99] group relative overflow-hidden"
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-3">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Chỉ Số Vóc Dáng (Body)</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1 group-hover:underline">
            <Edit3 className="w-3 h-3" />
            <span>Sửa</span>
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center font-mono">
          <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
            <span className="text-[9px] text-gray-400 block">CHIỀU CAO</span>
            <span className="text-sm font-black text-white">{profile.height}</span>
            <span className="text-[9px] text-gray-400 block">cm</span>
          </div>
          <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
            <span className="text-[9px] text-gray-400 block">CÂN NẶNG</span>
            <span className="text-sm font-black text-emerald-400">{profile.weight}</span>
            <span className="text-[9px] text-gray-400 block">{profile.weightUnit}</span>
          </div>
          <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
            <span className="text-[9px] text-gray-400 block">BODY FAT</span>
            <span className="text-sm font-black text-yellow-400">{profile.bodyFat}</span>
            <span className="text-[9px] text-gray-400 block">%</span>
          </div>
          <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
            <span className="text-[9px] text-gray-400 block">CHỈ SỐ BMI</span>
            <span className="text-sm font-black text-white">{bmi}</span>
            <span className="text-[9px] text-emerald-400 block font-bold">Chuẩn</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CARD 3: CHỈ SỐ SỨC KHỎE & TRAO ĐỔI CHẤT */}
      {/* ============================================================ */}
      <div
        onClick={() => openEdit('health')}
        className="forma-card rounded-2xl p-4 border-emerald-500/25 hover:border-emerald-500/40 cursor-pointer transition active:scale-[0.99] group relative overflow-hidden"
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Chỉ Số Sức Khỏe & Chuyển Hóa</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1 group-hover:underline">
            <Edit3 className="w-3 h-3" />
            <span>Sửa</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2 font-mono">
          <div className="bg-black/40 border border-white/5 p-2.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[9px] text-gray-400 block">BMR (CALO NỀN)</span>
              <span className="text-sm font-black text-white">{profile.bmr} kcal</span>
            </div>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="bg-black/40 border border-white/5 p-2.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[9px] text-gray-400 block">TDEE (TIÊU THỤ)</span>
              <span className="text-sm font-black text-emerald-400">{profile.tdee} kcal</span>
            </div>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        <div className="space-y-1.5 text-xs font-mono">
          <div className="flex items-center justify-between bg-black/30 p-2 rounded-xl border border-white/5">
            <span className="text-gray-400 text-[10px]">MỨC VẬN ĐỘNG (PAL):</span>
            <span className="text-white text-[11px] font-bold truncate max-w-[200px]">
              {profile.activityLevel}
            </span>
          </div>
          <div className="flex items-center justify-between bg-black/30 p-2 rounded-xl border border-white/5">
            <span className="text-gray-400 text-[10px]">NHỊP TIM NGHỈ:</span>
            <span className="text-emerald-400 text-[11px] font-bold flex items-center space-x-1">
              <Heart className="w-3 h-3 text-red-500 fill-red-500 inline mr-1" />
              {profile.restingHeartRate} bpm (Khỏe mạnh)
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CARD 4: CHẤN THƯƠNG & KIÊNG KHEM */}
      {/* ============================================================ */}
      <div
        onClick={() => openEdit('diet')}
        className="forma-card rounded-2xl p-4 border-emerald-500/25 hover:border-emerald-500/40 cursor-pointer transition active:scale-[0.99] group relative overflow-hidden"
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-3">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Chấn Thương & Kiêng Khem</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1 group-hover:underline">
            <Edit3 className="w-3 h-3" />
            <span>Sửa</span>
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="p-2.5 rounded-xl bg-black/40 border border-red-500/20">
            <div className="flex items-center space-x-1.5 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="text-[11px] font-bold text-red-400 font-mono">TIỀN SỬ CHẤN THƯƠNG (AI SẼ NÉ):</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {profile.injuries || 'Không có chấn thương nào ghi nhận.'}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-yellow-500/20">
            <div className="flex items-center space-x-1.5 mb-1">
              <Utensils className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              <span className="text-[11px] font-bold text-yellow-400 font-mono">KIÊNG KHEM / DỊ ỨNG ĂN UỐNG:</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {profile.dietaryRestrictions || 'Không có dị ứng thực phẩm đặc biệt.'}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CARD 5: CÀI ĐẶT ỨNG DỤNG */}
      {/* ============================================================ */}
      <div className="forma-card rounded-2xl p-4 border-emerald-500/25 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Cài Đặt Ứng Dụng</span>
          </div>
          <button
            onClick={() => openEdit('settings')}
            className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1 hover:underline"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Chi tiết</span>
          </button>
        </div>

        <div className="space-y-2 text-xs font-mono">
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
            <div className="flex items-center space-x-2 text-gray-300">
              <Bell className="w-4 h-4 text-emerald-400" />
              <span>Thông báo tập & nhắc meal</span>
            </div>
            <button
              onClick={() => setProfile((p) => ({ ...p, notifications: !p.notifications }))}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                profile.notifications ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black transition-transform absolute top-0.5 ${
                  profile.notifications ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
            <div className="flex items-center space-x-2 text-gray-300">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Đơn vị đo lường</span>
            </div>
            <div className="flex items-center space-x-1 bg-black/60 p-0.5 rounded-lg border border-white/10 text-[10px]">
              <button
                onClick={() => setProfile((p) => ({ ...p, weightUnit: 'kg' }))}
                className={`px-2 py-0.5 rounded font-bold ${
                  profile.weightUnit === 'kg' ? 'bg-emerald-500 text-black' : 'text-gray-400'
                }`}
              >
                kg / cm
              </button>
              <button
                onClick={() => setProfile((p) => ({ ...p, weightUnit: 'lbs' }))}
                className={`px-2 py-0.5 rounded font-bold ${
                  profile.weightUnit === 'lbs' ? 'bg-emerald-500 text-black' : 'text-gray-400'
                }`}
              >
                lbs / ft
              </button>
            </div>
          </div>

          {/* Re-trigger Onboarding Button */}
          <button
            onClick={onReopenOnboarding}
            className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 flex items-center justify-between transition group"
          >
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-180 transition duration-500" />
              <span>Thiết lập lại Onboarding (Khởi tạo lộ trình)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODAL: CHỈNH SỬA CARD TƯƠNG ỨNG */}
      {/* ============================================================ */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0F1411] border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">
                    {activeModal === 'identity' && 'Sửa Thông Tin & Mục Tiêu'}
                    {activeModal === 'body' && 'Sửa Chỉ Số Body'}
                    {activeModal === 'health' && 'Sửa Chỉ Số Sức Khỏe'}
                    {activeModal === 'diet' && 'Sửa Chấn Thương & Kiêng Khem'}
                    {activeModal === 'settings' && 'Cài Đặt Ứng Dụng Chi Tiết'}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-mono">Thay đổi dữ liệu và bấm xác nhận</p>
                </div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: According to active card */}
            <div className="space-y-3.5 text-xs font-mono">
              {/* EDIT CARD 1: IDENTITY */}
              {activeModal === 'identity' && (
                <>
                  <div>
                    <label className="text-gray-400 block mb-1">HỌ VÀ TÊN</label>
                    <input
                      type="text"
                      value={draft.name}
                      onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                      className="w-full bg-black/60 border border-emerald-500/30 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-gray-400 block mb-1">GIỚI TÍNH</label>
                      <div className="flex space-x-1">
                        {(['Nam', 'Nữ'] as const).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setDraft({ ...draft, gender: g })}
                            className={`flex-1 py-1.5 rounded-xl border font-bold text-xs ${
                              draft.gender === g
                                ? 'bg-emerald-500 text-black border-emerald-400'
                                : 'bg-black/40 border-white/10 text-gray-400'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 block mb-1">TUỔI</label>
                      <input
                        type="number"
                        value={draft.age}
                        onChange={(e) => setDraft({ ...draft, age: Number(e.target.value) })}
                        className="w-full bg-black/60 border border-emerald-500/30 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 block mb-1">MỤC TIÊU CHÍNH</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        'Tăng cơ (Lean Bulk)',
                        'Giảm mỡ (Cut)',
                        'Tăng sức bền (Endurance)',
                        'Giữ cân & Recomp',
                      ].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setDraft({ ...draft, goal: g })}
                          className={`p-2 rounded-xl border text-left text-[11px] font-bold ${
                            draft.goal === g
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                              : 'bg-black/40 border-white/5 text-gray-400'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 block mb-1">SỐ BUỔI TẬP / TUẦN</label>
                    <div className="grid grid-cols-5 gap-1">
                      {['2 buổi', '3 buổi', '4 buổi', '5 buổi', '6 buổi'].map((freq) => (
                        <button
                          key={freq}
                          type="button"
                          onClick={() => setDraft({ ...draft, frequency: `${freq} / tuần` })}
                          className={`py-1.5 rounded-xl border text-center text-[10px] font-bold ${
                            draft.frequency.includes(freq)
                              ? 'bg-emerald-500 text-black border-emerald-400'
                              : 'bg-black/40 border-white/10 text-gray-400'
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* EDIT CARD 2: BODY */}
              {activeModal === 'body' && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-gray-400 block mb-1">CHIỀU CAO (CM)</label>
                      <input
                        type="number"
                        value={draft.height}
                        onChange={(e) => setDraft({ ...draft, height: Number(e.target.value) })}
                        className="w-full bg-black/60 border border-emerald-500/30 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 block mb-1">CÂN NẶNG (KG)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={draft.weight}
                        onChange={(e) => setDraft({ ...draft, weight: Number(e.target.value) })}
                        className="w-full bg-black/60 border border-emerald-500/30 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 block mb-1">BODY FAT (%)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={draft.bodyFat}
                        onChange={(e) => setDraft({ ...draft, bodyFat: Number(e.target.value) })}
                        className="w-full bg-black/60 border border-emerald-500/30 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-gray-300">
                    💡 Chỉ số BMI và BMR sẽ được tự động tính toán lại ngay khi bạn bấm Xác nhận.
                  </div>
                </>
              )}

              {/* EDIT CARD 3: HEALTH */}
              {activeModal === 'health' && (
                <>
                  <div>
                    <label className="text-gray-400 block mb-1">MỨC ĐỘ VẬN ĐỘNG (PAL)</label>
                    <div className="space-y-1.5">
                      {[
                        'Ít vận động (1.2 • Văn phòng, ít thể thao)',
                        'Vận động nhẹ (1.375 • 1-3 buổi/tuần)',
                        'Vận động vừa phải (1.55 • Gym 3-5 buổi)',
                        'Rất năng động (1.725 • 6-7 buổi/tuần)',
                      ].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setDraft({ ...draft, activityLevel: lvl })}
                          className={`w-full p-2 rounded-xl border text-left text-[11px] font-bold ${
                            draft.activityLevel === lvl
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                              : 'bg-black/40 border-white/5 text-gray-400'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 block mb-1">NHỊP TIM NGHỈ (RESTING HR - BPM)</label>
                    <input
                      type="number"
                      value={draft.restingHeartRate}
                      onChange={(e) => setDraft({ ...draft, restingHeartRate: Number(e.target.value) })}
                      className="w-full bg-black/60 border border-emerald-500/30 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </>
              )}

              {/* EDIT CARD 4: INJURIES & DIET */}
              {activeModal === 'diet' && (
                <>
                  <div>
                    <label className="text-gray-400 block mb-1">TIỀN SỬ CHẤN THƯƠNG (AI SẼ TỰ ĐỘNG NÉ BÀI)</label>
                    <textarea
                      rows={3}
                      value={draft.injuries}
                      onChange={(e) => setDraft({ ...draft, injuries: e.target.value })}
                      placeholder="Ví dụ: Đau khớp gối khi squat, đau khớp vai trái..."
                      className="w-full bg-black/60 border border-red-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-red-400"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 block mb-1">KIÊNG KHEM & DỊ ỨNG THỰC PHẨM</label>
                    <textarea
                      rows={3}
                      value={draft.dietaryRestrictions}
                      onChange={(e) => setDraft({ ...draft, dietaryRestrictions: e.target.value })}
                      placeholder="Ví dụ: Dị ứng tôm cua, không uống được sữa bò tươi..."
                      className="w-full bg-black/60 border border-yellow-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </>
              )}

              {/* EDIT CARD 5: SETTINGS */}
              {activeModal === 'settings' && (
                <>
                  <div>
                    <label className="text-gray-400 block mb-1">NGÔN NGỮ</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Tiếng Việt', 'English'].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setDraft({ ...draft, language: lang })}
                          className={`p-2 rounded-xl border text-center font-bold text-xs ${
                            draft.language === lang
                              ? 'bg-emerald-500 text-black border-emerald-400'
                              : 'bg-black/40 border-white/10 text-gray-400'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 block mb-1">ĐƠN VỊ CÂN NẶNG</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['kg', 'lbs'] as const).map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setDraft({ ...draft, weightUnit: u })}
                          className={`p-2 rounded-xl border text-center font-bold text-xs ${
                            draft.weightUnit === u
                              ? 'bg-emerald-500 text-black border-emerald-400'
                              : 'bg-black/40 border-white/10 text-gray-400'
                          }`}
                        >
                          {u.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Actions: Cancel & Confirm */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold text-xs hover:bg-white/10 transition"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="py-2.5 rounded-xl bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-400 shadow-glow-green transition flex items-center justify-center space-x-1.5"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Xác Nhận</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
