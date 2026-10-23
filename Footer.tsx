import React from 'react';
import { Dumbbell } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1f293d] bg-[#0b0e14] py-8 px-4 md:px-8 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        
        {/* Left Brand */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#ccff00] text-black flex items-center justify-center font-bold">
            <Dumbbell className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-display font-bold text-sm tracking-wider text-white">
            FITLOG
          </span>
        </div>

        {/* Right Copyright */}
        <div>
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </div>

      </div>
    </footer>
  );
};
