import React from 'react';
import { Clock, Flame, Star, Check, X, ChevronDown, Dumbbell } from 'lucide-react';
import { Workout } from '../types';

interface MyPlanProps {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  completedIds: string[];
  activeTab: 'today' | 'saved';
  setActiveTab: (tab: 'today' | 'saved') => void;
  sortBy: 'duration' | 'calories' | 'rating';
  setSortBy: (sort: 'duration' | 'calories' | 'rating') => void;
  onViewDetails: (workout: Workout) => void;
  onMarkDone: (workoutId: string) => void;
  onRemove: (workoutId: string, fromTab: 'today' | 'saved') => void;
  onGoToWorkouts: () => void;
}

export const MyPlan: React.FC<MyPlanProps> = ({
  todayPlan,
  savedWorkouts,
  completedIds,
  activeTab,
  setActiveTab,
  sortBy,
  setSortBy,
  onViewDetails,
  onMarkDone,
  onRemove,
  onGoToWorkouts,
}) => {
  // Metrics Summary
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((acc, w) => acc + w.duration, 0);
  const totalCalories = todayPlan.reduce((acc, w) => acc + w.calories, 0);

  const activeList = activeTab === 'today' ? [...todayPlan] : [...savedWorkouts];

  // Sorting
  activeList.sort((a, b) => {
    if (sortBy === 'duration') return b.duration - a.duration;
    if (sortBy === 'calories') return b.calories - a.calories;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto py-4">
      {/* Title & Subtitle */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold uppercase text-white tracking-wider mb-1">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-xs">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row */}
      <div className="bg-[#131822] border border-[#1f293d] rounded-2xl p-6 mb-8 grid grid-cols-3 gap-4">
        <div>
          <div className="text-gray-400 text-xs uppercase mb-1">Exercises</div>
          <div className="font-display text-3xl font-bold text-[#ccff00]">{totalExercises}</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs uppercase mb-1">Minutes</div>
          <div className="font-display text-3xl font-bold text-white">{totalMinutes}</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs uppercase mb-1">Calories</div>
          <div className="font-display text-3xl font-bold text-white">{totalCalories}</div>
        </div>
      </div>

      {/* Tabs & Sort Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 bg-[#131822] p-1 rounded-xl border border-[#1f293d] w-fit">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'today'
                ? 'bg-[#1f293d] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'saved'
                ? 'bg-[#1f293d] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'duration' | 'calories' | 'rating')}
              className="bg-[#131822] border border-[#1f293d] text-white text-xs rounded-lg px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* List / Empty State */}
      {activeList.length === 0 ? (
        <div className="border border-dashed border-[#1f293d] rounded-2xl p-12 text-center my-8 bg-[#131822]/40">
          <div className="w-12 h-12 bg-[#1f293d] text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-gray-400 text-xs mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <button
            onClick={onGoToWorkouts}
            className="bg-[#ccff00] text-black text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-[#b8e600] transition-all uppercase"
          >
            Go to workouts
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {activeList.map((workout) => {
            const isDone = completedIds.includes(workout.id);
            return (
              <div
                key={workout.id}
                className={`bg-[#131822] border border-[#1f293d] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${
                  isDone ? 'opacity-60 border-green-900/50' : ''
                }`}
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-display text-base font-bold uppercase text-white tracking-wide">
                      {workout.name}
                    </h4>
                    <p className="text-gray-400 text-xs mb-1.5">{workout.equipment}</p>
                    <div className="flex items-center gap-3 text-gray-400 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {workout.calories} kcal
                      </span>
                      <span className="flex items-center gap-1 text-white">
                        <Star className="w-3 h-3 fill-[#ccff00] text-[#ccff00]" />
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 border-[#1f293d] pt-3 md:pt-0">
                  <button
                    onClick={() => onViewDetails(workout)}
                    className="text-xs text-gray-300 border border-[#1f293d] hover:border-gray-500 px-3 py-1.5 rounded-md transition-all"
                  >
                    View Details
                  </button>

                  {activeTab === 'today' && (
                    <button
                      onClick={() => onMarkDone(workout.id)}
                      disabled={isDone}
                      className={`text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 transition-all ${
                        isDone
                          ? 'bg-green-900/40 text-green-400 border border-green-800 cursor-default'
                          : 'bg-[#ccff00] text-black hover:bg-[#b8e600]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isDone ? 'Done' : 'Mark as Done'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => onRemove(workout.id, activeTab)}
                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
