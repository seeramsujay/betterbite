"use client";

import React from "react";
import Sidebar from "./dashboard/Sidebar";
import TopNav from "./dashboard/TopNav";
import MealItem from "./dashboard/MealItem";
import { trpc } from "../app/utils/trpc";
import { ClientOnly } from "./ui/ClientOnly";

export const JournalFeed: React.FC = () => {
  const { data: logs, isLoading } = trpc.meal.getLogs.useQuery();

  return (
    <div className="text-on-surface bg-background font-body min-h-screen">
      <Sidebar />
      <main className="ml-64 min-h-screen pb-12">
        <TopNav />
        <div className="p-12 max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="font-headline text-5xl mb-2">The Journal</h1>
            <p className="text-on-surface-variant uppercase tracking-[0.2em] text-xs font-bold">Comprehensive Metabolic History</p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-sm font-bold text-outline uppercase tracking-widest mb-6 border-b border-outline-variant/20 pb-2">History</h2>
              <div className="grid grid-cols-1 gap-4">
                {isLoading ? (
                  <p className="text-sm text-stone-400 italic">Reading the larder logs...</p>
                ) : logs && logs.length > 0 ? (
                  logs.map((meal: any) => (
                    <div key={meal.id} className="bg-surface-container-low p-6 rounded-3xl flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition-all">
                      <div className="flex gap-6">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-inner">
                          <img 
                            src={meal.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200"} 
                            className="w-full h-full object-cover" 
                            alt={meal.identifiedMeal} 
                          />
                        </div>
                        <div>
                          <p className="text-[0.65rem] font-bold text-primary uppercase tracking-[0.2em] mb-1">
                            <ClientOnly>
                              {new Date(meal.timestamp).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                            </ClientOnly>
                          </p>
                          <h3 className="font-headline text-2xl">{meal.identifiedMeal}</h3>
                          <div className="flex gap-4 mt-2">
                             <span className="text-xs text-on-surface-variant italic">"{meal.predictedOutcome}"</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center border-l md:border-l-0 md:pl-0 pl-6 border-outline-variant/20">
                        <div className="bg-secondary/10 px-4 py-2 rounded-xl text-center">
                          <span className="block text-[0.6rem] font-bold text-secondary uppercase">BetterBite Sync</span>
                          <span className="font-headline text-lg text-secondary">{meal.suggestedSwap}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-20 text-center border-2 border-dashed border-outline-variant/20 rounded-[2rem]">
                    <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">history</span>
                    <p className="text-stone-400">Your metabolic journey begins with your first log.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JournalFeed;
