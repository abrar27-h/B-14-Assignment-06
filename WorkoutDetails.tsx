import React from 'react';
import { Plus, Bookmark, ArrowLeft } from 'lucide-react';
import { Workout } from '../types';

interface WorkoutDetailsProps {
  workout: Workout;
  onBack: () => void;
  onAddToPlan: (workout: Workout) => void;
  onSaveForLater: (workout: Workout) => void;
}

export const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({
  workout,
  onBack,
  onAddToPlan,
  onSaveForLater,
}) => {
  return (
    <div className="max-w-6xl mx-auto py-4">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Workouts</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#131822] border border-[#1f293d] rounded-2xl p-6 md:p-8">
        {/* Left Column: Visual/Media */}
        <div className="rounded-xl overflow-hidden border border-[#1f293d] h-80 md:h-full min-h-[320px]">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column: Specs & Instructions */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight mb-2">
              {workout.name}
            </h1>

            {workout.subtitle && (
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {workout.subtitle}
              </p>
            )}

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {workout.category.map((cat, i) => (
                <span
                  key={i}
                  className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Key Specs Table Panel */}
            <div className="bg-[#0b0e14] border border-[#1f293d] rounded-xl p-4 mb-6 text-xs">
              <div className="grid grid-cols-2 gap-y-2.5 text-gray-400">
                <div>EQUIPMENT</div>
                <div className="text-white text-right font-medium">{workout.equipment}</div>
                
                <div className="border-t border-[#1f293d] pt-2">DIFFICULTY</div>
                <div className="border-t border-[#1f293d] pt-2 text-white text-right font-medium">{workout.difficulty}</div>

                <div className="border-t border-[#1f293d] pt-2">SETS</div>
                <div className="border-t border-[#1f293d] pt-2 text-white text-right font-medium">{workout.sets}</div>

                <div className="border-t border-[#1f293d] pt-2">REPS</div>
                <div className="border-t border-[#1f293d] pt-2 text-white text-right font-medium">{workout.reps}</div>

                <div className="border-t border-[#1f293d] pt-2">DURATION</div>
                <div className="border-t border-[#1f293d] pt-2 text-white text-right font-medium">{workout.duration} min</div>

                <div className="border-t border-[#1f293d] pt-2">CALORIES</div>
                <div className="border-t border-[#1f293d] pt-2 text-white text-right font-medium">{workout.calories} kcal</div>

                <div className="border-t border-[#1f293d] pt-2">RATING</div>
                <div className="border-t border-[#1f293d] pt-2 text-white text-right font-medium">{workout.rating}</div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-white mb-3">
                INSTRUCTIONS
              </h3>
              <ol className="space-y-2 text-xs md:text-sm text-gray-300">
                {workout.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-[#ccff00] font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#1f293d]">
            <button
              onClick={() => onAddToPlan(workout)}
              className="w-full sm:flex-1 bg-[#ccff00] text-black font-bold text-xs uppercase py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#b8e600] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add to today&apos;s plan</span>
            </button>

            <button
              onClick={() => onSaveForLater(workout)}
              className="w-full sm:flex-1 border border-gray-600 text-gray-200 font-bold text-xs uppercase py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:border-[#ccff00] hover:text-[#ccff00] transition-all"
            >
              <Bookmark className="w-4 h-4" />
              <span>Save for later</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
