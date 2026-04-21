"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import MetricCard from "./dashboard/MetricCard";
import SwapCard from "./dashboard/SwapCard";
import MealItem from "./dashboard/MealItem";
import ReadinessCard from "./dashboard/ReadinessCard";
import EnergyCurve from "./dashboard/EnergyCurve";
import { BIOMETRICS, SMARTER_SWAPS, TODAY_JOURNEY } from "../data/mockData";
import { trpc } from "../app/utils/trpc";
import { useAppStore } from "../lib/store/useAppStore";
import { ClientOnly } from "./ui/ClientOnly";

// ssr:false → these components use usePathname / browser APIs
// prevents hydration mismatch between server HTML and client render
const Sidebar = dynamic(() => import("./dashboard/Sidebar"), { ssr: false });
const TopNav = dynamic(() => import("./dashboard/TopNav"), { ssr: false });

export interface DashboardProps {
  readonly className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ className = "" }) => {
  const setMealLogOpen = useAppStore((s) => s.setMealLogOpen);
  const { data: logs, isLoading: logsLoading } = trpc.meal.getLogs.useQuery();

  const formattedLogs = useMemo(() => {
    if (!logs) return [];
    return (logs as any[]).map((meal) => ({
      ...meal,
      displayTime: new Date(meal.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
  }, [logs]);

  return (
    <div className={`text-on-surface bg-background font-body min-h-screen ${className}`}>
      <Sidebar />

      <main className="ml-64 min-h-screen pb-12">
        <TopNav />

        <div className="p-8 space-y-10 max-w-7xl mx-auto">
          {/* Row 1: Readiness & Biometric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <ReadinessCard className="lg:col-span-4" />
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {BIOMETRICS.map((metric) => (
                <MetricCard
                  key={metric.label}
                  {...metric}
                  color={metric.color as "primary" | "secondary" | "tertiary"}
                />
              ))}
            </div>
          </div>

          {/* Row 2: Smarter Swaps */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="font-headline text-3xl">Smarter Swaps</h2>
                <p className="text-on-surface-variant text-sm mt-1">
                  Personalized shifts based on your morning labs.
                </p>
              </div>
              <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                View All{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SMARTER_SWAPS.map((swap) => (
                <SwapCard key={swap.title} {...swap} />
              ))}
            </div>
          </section>

          {/* Row 3: Today's Journey & Forecast */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-headline text-2xl px-2">Today's Journey</h2>
              <div className="space-y-4">
                {logsLoading ? (
                  <p className="text-sm text-stone-400 italic">Syncing with larder...</p>
                ) : formattedLogs.length > 0 ? (
                  formattedLogs.map((meal) => (
                    <MealItem
                      key={meal.id}
                      type="Meal"
                      time={meal.displayTime}
                      title={meal.identifiedMeal}
                      score={85}
                      image={
                        meal.imageUrl ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200"
                      }
                    />
                  ))
                ) : (
                  TODAY_JOURNEY.map((meal) => (
                    <MealItem key={meal.title} {...meal} />
                  ))
                )}
                <div className="flex items-center gap-4 border-2 border-dashed border-outline-variant/30 p-4 rounded-2xl">
                  <div className="w-16 h-16 rounded-xl bg-surface-container-low flex items-center justify-center">
                    <span className="material-symbols-outlined text-outline">add_a_photo</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[0.65rem] font-bold text-outline uppercase tracking-widest">Next • Upcoming</p>
                    <h4 className="font-headline text-lg leading-tight text-on-surface/40">Log Evening Dinner</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Forecast */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-3xl shadow-[0_8px_24px_rgba(28,20,9,0.03)] border-t-4 border-secondary">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-headline text-2xl">Response Forecast</h3>
                  <p className="text-sm text-on-surface-variant">
                    Simulated glucose response for the next 4 hours.
                  </p>
                </div>
                <div className="bg-surface-container-low px-4 py-2 rounded-xl text-center">
                  <span className="block text-xs font-bold text-outline uppercase">Confidence</span>
                  <span className="font-headline text-xl text-primary">94%</span>
                </div>
              </div>
              <ClientOnly>
                <EnergyCurve />
              </ClientOnly>
              <div className="mt-12 flex gap-8">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">BetterBite Nudge</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9ca3af]"></span>
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Original Meal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Quick Log */}
          <div className="bg-surface-container p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-headline text-3xl">Capture your moment.</h2>
              <p className="text-on-surface-variant max-w-sm mt-2">
                Log your meal in seconds for instant metabolic feedback.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 relative z-10">
              <button
                onClick={() => setMealLogOpen(true)}
                className="bg-surface-container-lowest hover:bg-white text-on-surface px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm transition-all hover:scale-105"
              >
                <span className="material-symbols-outlined text-primary">photo_camera</span>
                <span className="font-bold text-sm">Scan Meal</span>
              </button>
              <button className="bg-surface-container-lowest hover:bg-white text-on-surface px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm transition-all hover:scale-105">
                <span className="material-symbols-outlined text-primary">search</span>
                <span className="font-bold text-sm">Search Base</span>
              </button>
              <button className="bg-surface-container-lowest hover:bg-white text-on-surface px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm transition-all hover:scale-105">
                <span className="material-symbols-outlined text-primary">mic</span>
                <span className="font-bold text-sm">Voice Log</span>
              </button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        <footer className="p-8 text-center text-on-surface-variant/40 text-xs border-t border-outline-variant/10 mt-10">
          © 2024 BetterBite Engine. All metabolic data processed locally.
        </footer>
      </main>

      <button
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center z-50"
        aria-label="Log meal"
        onClick={() => setMealLogOpen(true)}
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
};

export default Dashboard;
