'use client';

import React, { useRef, useEffect } from 'react';

interface WheelPickerProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  unit?: string;
  onChange: (val: number) => void;
  label?: string;
}

export const WheelPicker: React.FC<WheelPickerProps> = ({
  min,
  max,
  step = 1,
  value,
  unit = '',
  onChange,
  label,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const items: number[] = [];
  for (let i = min; i <= max; i += step) {
    items.push(i);
  }

  const itemHeight = 44; // px per item

  useEffect(() => {
    if (containerRef.current) {
      const index = items.indexOf(value);
      if (index !== -1) {
        containerRef.current.scrollTop = index * itemHeight;
      }
    }
  }, []);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    if (index >= 0 && index < items.length) {
      const selected = items[index];
      if (selected !== value) {
        onChange(selected);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {label && <span className="text-xs font-semibold text-gray-400 mb-1">{label}</span>}
      <div className="relative w-full h-[132px] overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10">
        {/* Selected target zone indicator */}
        <div className="absolute top-[44px] left-0 right-0 h-[44px] bg-emerald-500/15 border-y border-emerald-500/30 pointer-events-none z-10 flex items-center justify-end pr-4">
          {unit && <span className="text-xs font-mono font-bold text-emerald-400">{unit}</span>}
        </div>

        {/* Scrollable list */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="wheel-container h-full overflow-y-scroll py-[44px] px-2 text-center"
        >
          {items.map((item) => (
            <div
              key={item}
              onClick={() => {
                const index = items.indexOf(item);
                if (containerRef.current) {
                  containerRef.current.scrollTo({ top: index * itemHeight, behavior: 'smooth' });
                }
                onChange(item);
              }}
              className={`wheel-item h-[44px] flex items-center justify-center font-mono text-base transition-colors cursor-pointer ${
                item === value ? 'text-white font-extrabold text-xl' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

