import React from 'react';
import { Dumbbell } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  planCount: number;
  savedCount: number;
  setActivePlanTab: (tab: 'today' | 'saved') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  planCount,
  savedCount,
  setActivePlanTab,
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#0b0e14]/90 backdrop-blur-md border-b border-[#1f293d] px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setCurrentPage('home')}
        >
          <div className="w-8 h-8 rounded-md bg-[#ccff00] text-black flex items-center justify-center font-bold transition-transform group-hover:scale-105">
            <Dumbbell className="w-5 h-5 fill-current" />
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white">
            FITLOG
          </span>
        </div>

        {/* Navigation Middle Links */}
        <div className="flex items-center gap-1 bg-[#131822] p-1 rounded-full border border-[#1f293d]">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
              currentPage === 'home'
                ? 'bg-[#ccff00] text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Workout
          </button>
          <button
            onClick={() => setCurrentPage('my-plan')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
              currentPage === 'my-plan'
                ? 'bg-[#ccff00] text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Plan
          </button>
        </div>

        {/* Right Status Badges */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentPage('my-plan');
              setActivePlanTab('today');
            }}
            className="flex items-center gap-1.5 bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold transition-transform hover:scale-105"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
              {planCount}
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('my-plan');
              setActivePlanTab('saved');
            }}
            className="flex items-center gap-1.5 border border-gray-600 text-gray-300 px-3 py-1 rounded-full text-xs font-semibold hover:border-[#ccff00] hover:text-[#ccff00] transition-all"
          >
            <span>Saved</span>
            <span className="text-gray-400 text-[11px]">{savedCount}</span>
          </button>
        </div>

      </div>
    </nav>
  );
};
