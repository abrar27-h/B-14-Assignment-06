import React from 'react';
import { Clock, Flame, Star } from 'lucide-react';
import { Workout } from '../types';

interface WorkoutCardProps {
  workout: Workout;
  onSelect: (workout: Workout) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(workout)}
      className="bg-[#131822] border border-[#1f293d] hover:border-[#ccff00]/50 rounded-xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 group flex flex-col justify-between"
    >
      <div>
        {/* Card Thumbnail */}
        <div className="h-44 w-full overflow-hidden relative">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131822] via-transparent to-transparent"></div>
        </div>

        {/* Category Pills & Info */}
        <div className="p-4">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {workout.category.map((cat, i) => (
              <span
                key={i}
                className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>

          <h3 className="font-display text-lg font-bold uppercase text-white tracking-wide group-hover:text-[#ccff00] transition-colors mb-1">
            {workout.name}
          </h3>

          <p className="text-gray-400 text-xs mb-4">
            {workout.equipment}
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-4 py-3 border-t border-[#1f293d] flex items-center justify-between text-gray-400 text-xs">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-gray-500" />
          <span>{workout.duration} min</span>
        </div>
        <div className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-gray-500" />
          <span>{workout.calories} kcal</span>
        </div>
        <div className="flex items-center gap-1 text-white font-medium">
          <Star className="w-3.5 h-3.5 fill-[#ccff00] text-[#ccff00]" />
          <span>{workout.rating}</span>
        </div>
      </div>
    </div>
  );
};
