'use client';

import React, { useState } from 'react';
import { Camera, X, Upload, Sparkles, Check, Image as ImageIcon } from 'lucide-react';

interface CameraUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmMeal: (meal: any) => void;
}

export const CameraUploadModal: React.FC<CameraUploadModalProps> = ({
  isOpen,
  onClose,
  onConfirmMeal,
}) => {
  const [mode, setMode] = useState<'meal' | 'body'>('meal');
  const [photoSnapped, setPhotoSnapped] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSimulateSnap = async () => {
    setScanning(true);
    await new Promise((r) => setTimeout(r, 700));
    setScanning(false);
    setPhotoSnapped(true);
  };

  const handleConfirm = () => {
    if (mode === 'meal') {
      onConfirmMeal({
        name: 'Cơm Gà Xối Mỡ Rau Củ (AI Nhận Diện)',
        calories: 540,
        protein: 42,
        carb: 60,
        fat: 14,
      });
    }
    setPhotoSnapped(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0F1411] border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-glow-green/20 flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Chụp & Tải Ảnh AI</h3>
              <p className="text-[10px] text-emerald-400 font-mono">Placeholder Feature</p>
            </div>
          </div>

          <button
            onClick={() => {
              setPhotoSnapped(false);
              onClose();
            }}
            className="p-1 rounded-lg bg-white/5 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => {
              setMode('meal');
              setPhotoSnapped(false);
            }}
            className={`py-2 rounded-xl text-xs font-bold font-mono transition border ${
              mode === 'meal'
                ? 'bg-emerald-500 text-black border-emerald-400'
                : 'bg-white/5 text-gray-400 border-white/10'
            }`}
          >
            Quét Món Ăn (Macro)
          </button>
          <button
            onClick={() => {
              setMode('body');
              setPhotoSnapped(false);
            }}
            className={`py-2 rounded-xl text-xs font-bold font-mono transition border ${
              mode === 'body'
                ? 'bg-emerald-500 text-black border-emerald-400'
                : 'bg-white/5 text-gray-400 border-white/10'
            }`}
          >
            Check-in Vóc Dáng
          </button>
        </div>

        {/* Viewfinder / Preview Screen */}
        <div className="relative w-full h-56 rounded-2xl bg-black border-2 border-dashed border-emerald-500/30 flex flex-col items-center justify-center overflow-hidden mb-4 p-4 text-center">
          {photoSnapped ? (
            <div className="w-full h-full flex flex-col justify-between items-center animate-in zoom-in-95">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
                alt="Captured Preview"
                className="w-full h-32 object-cover rounded-xl"
              />
              <div className="w-full bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-2 text-left mt-2">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>📸 AI Nhận diện: Cơm Đĩa Gà Áp Chảo</span>
                  <span className="text-emerald-400 font-mono">540 kcal</span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-0.5">
                  <span>Protein: 42g</span>
                  <span>Carb: 60g</span>
                  <span>Fat: 14g</span>
                  <span className="text-emerald-400">Độ tin cậy: 94%</span>
                </div>
              </div>
            </div>
          ) : scanning ? (
            <div className="flex flex-col items-center space-y-2">
              <Sparkles className="w-8 h-8 text-emerald-400 animate-spin" />
              <span className="text-xs font-mono text-emerald-400 animate-pulse">
                Đang chụp và phân tích thị giác AI...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-xs text-gray-300 font-medium">
                {mode === 'meal'
                  ? 'Hướng ống kính vào đĩa thức ăn'
                  : 'Đứng cách gương 1.5m để chụp toàn thân'}
              </p>
              <span className="text-[10px] text-gray-500">
                AI sẽ tự động nhận diện thành phần & phân giải dinh dưỡng
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {photoSnapped ? (
          <div className="space-y-2">
            <button
              onClick={handleConfirm}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold text-xs flex items-center justify-center space-x-1.5 shadow-glow-green transition"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>XÁC NHẬN VÀ CỘNG VÀO HÔM NAY</span>
            </button>
            <button
              onClick={() => setPhotoSnapped(false)}
              className="w-full py-2 text-xs text-gray-400 hover:text-white text-center"
            >
              Chụp lại ảnh khác
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSimulateSnap}
              disabled={scanning}
              className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center space-x-2 shadow-glow-green transition"
            >
              <Camera className="w-4 h-4" />
              <span>CHỤP ẢNH NGAY</span>
            </button>
            <button
              onClick={handleSimulateSnap}
              disabled={scanning}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              <Upload className="w-4 h-4" />
              <span>Tải file</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

