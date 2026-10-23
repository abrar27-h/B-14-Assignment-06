import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkoutCard } from './components/WorkoutCard';
import { WorkoutDetails } from './components/WorkoutDetails';
import { MyPlan } from './components/MyPlan';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { WORKOUTS } from './data/workouts';
import { Workout, ToastMessage } from './types';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  // LocalStorage state with persistence
  const [todayPlan, setTodayPlan] = useState<Workout[]>(() => {
    const saved = localStorage.getItem('fitlog_today_plan');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
    const saved = localStorage.getItem('fitlog_saved');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('fitlog_completed');
    return saved ? JSON.parse(saved) : [];
  });

  const [activePlanTab, setActivePlanTab] = useState<'today' | 'saved'>('today');
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('fitlog_today_plan', JSON.stringify(todayPlan));
  }, [todayPlan]);

  useEffect(() => {
    localStorage.setItem('fitlog_saved', JSON.stringify(savedWorkouts));
  }, [savedWorkouts]);

  useEffect(() => {
    localStorage.setItem('fitlog_completed', JSON.stringify(completedIds));
  }, [completedIds]);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type: 'info', message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleAddToPlan = (workout: Workout) => {
    if (todayPlan.length >= 5) {
      showToast("Cap of 5 lifts reached for today!");
      return;
    }
    if (todayPlan.some((w) => w.id === workout.id)) {
      showToast("Already in today's plan");
      return;
    }
    setTodayPlan([...todayPlan, workout]);
    showToast(`Added "${workout.name}" to today's plan`);
  };

  const handleSaveForLater = (workout: Workout) => {
    if (savedWorkouts.some((w) => w.id === workout.id)) {
      showToast("Already in saved workouts");
      return;
    }
    setSavedWorkouts([...savedWorkouts, workout]);
    showToast(`Saved "${workout.name}" for later`);
  };

  const handleMarkDone = (id: string) => {
    if (!completedIds.includes(id)) {
      setCompletedIds([...completedIds, id]);
      showToast("Workout marked as done!");
    }
  };

  const handleRemove = (id: string, fromTab: 'today' | 'saved') => {
    if (fromTab === 'today') {
      setTodayPlan(todayPlan.filter((w) => w.id !== id));
      showToast("Removed from today's plan");
    } else {
      setSavedWorkouts(savedWorkouts.filter((w) => w.id !== id));
      showToast("Removed from saved workouts");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col justify-between">
      <div>
        <Navbar
          currentPage={currentPage}
          setCurrentPage={(page) => {
            setCurrentPage(page);
            setSelectedWorkout(null);
          }}
          planCount={todayPlan.length}
          savedCount={savedWorkouts.length}
          setActivePlanTab={setActivePlanTab}
        />

        <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
          {/* Workout Details Screen */}
          {selectedWorkout ? (
            <WorkoutDetails
              workout={selectedWorkout}
              onBack={() => setSelectedWorkout(null)}
              onAddToPlan={handleAddToPlan}
              onSaveForLater={handleSaveForLater}
            />
          ) : currentPage === 'home' ? (
            <div>
              <Hero />

              {/* Library Section */}
              <section id="library" className="mb-12">
                <div className="mb-6">
                  <h2 className="font-display text-3xl font-extrabold uppercase text-white tracking-wider mb-1">
                    THE LIBRARY
                  </h2>
                  <p className="text-gray-400 text-xs">
                    Twelve lifts covering every major muscle group.
                  </p>
                </div>

                {/* Grid 3x4 on large screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {WORKOUTS.map((workout) => (
                    <WorkoutCard
                      key={workout.id}
                      workout={workout}
                      onSelect={(w) => setSelectedWorkout(w)}
                    />
                  ))}
                </div>
              </section>
            </div>
          ) : currentPage === 'my-plan' ? (
            <MyPlan
              todayPlan={todayPlan}
              savedWorkouts={savedWorkouts}
              completedIds={completedIds}
              activeTab={activePlanTab}
              setActiveTab={setActivePlanTab}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onViewDetails={(w) => setSelectedWorkout(w)}
              onMarkDone={handleMarkDone}
              onRemove={handleRemove}
              onGoToWorkouts={() => setCurrentPage('home')}
            />
          ) : (
            /* 404 Fallback */
            <div className="py-20 text-center">
              <h1 className="font-display text-4xl font-bold mb-2">404 - PAGE NOT FOUND</h1>
              <p className="text-gray-400 text-xs mb-6">The page you are looking for does not exist.</p>
              <button
                onClick={() => setCurrentPage('home')}
                className="bg-[#ccff00] text-black px-6 py-2.5 rounded-lg font-bold text-xs"
              >
                Return Home
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
      <Toast toasts={toasts} />
    </div>
  );
}

export default App;
