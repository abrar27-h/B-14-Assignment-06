import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToLibrary = () => {
    const libraryElem = document.getElementById('library');
    if (libraryElem) {
      libraryElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#131822] border border-[#1f293d] rounded-2xl p-6 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
      <div className="flex-1 z-10">
        <div className="inline-flex items-center gap-2 text-[#ccff00] text-xs font-bold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WORKOUT LIBRARY</span>
        </div>
        
        <h1 className="font-display text-4xl md:text-5xl font-extrabold uppercase text-white tracking-tight leading-none mb-4">
          TRAIN WITH INTENT. <br className="hidden md:block" />
          LOG EVERY SET.
        </h1>

        <p className="text-gray-400 text-sm md:text-base max-w-lg mb-8 leading-relaxed">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <button
          onClick={scrollToLibrary}
          className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-md hover:bg-[#b8e600] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#ccff00]/10"
        >
          <span>BROWSE WORKOUTS</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Illustration */}
      <div className="w-full md:w-80 h-64 md:h-80 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#ccff00]/20 to-transparent rounded-full blur-3xl opacity-30"></div>
        <img
          src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800"
          alt="Gym Companion Illustration"
          className="w-full h-full object-cover rounded-xl border border-[#1f293d] shadow-2xl relative z-10"
        />
      </div>
    </section>
  );
};
