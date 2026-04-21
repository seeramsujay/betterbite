"use client";

import React from "react";
import dynamic from "next/dynamic";
import NourishSwapCard from "./nourish/NourishSwapCard";
import RecipeCard from "./nourish/RecipeCard";
import { NOURISH_SWAPS, SEASONAL_RECIPES } from "../data/mockData";

const NourishSidebar = dynamic(() => import("./nourish/NourishSidebar"), { ssr: false });
const NourishTopNav = dynamic(() => import("./nourish/NourishTopNav"), { ssr: false });

export interface NourishFeedProps {
  readonly className?: string;
}

export const NourishFeed: React.FC<NourishFeedProps> = ({ className = "" }) => {
  return (
    <div className={`bg-background text-on-surface antialiased font-body min-h-screen ${className}`}>
      <NourishSidebar />
      
      <main className="ml-72 min-h-screen pb-12">
        <NourishTopNav />
        
        <section className="px-12 py-12 max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="mb-16">
            <h2 className="font-editorial text-6xl lg:text-7xl mb-4 leading-tight text-on-surface">
              Curated<br />
              <span className="italic text-primary">Intelligence</span>
            </h2>
            <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Optimize your metabolic health without sacrificing the soul of the kitchen. Discover seasonal swaps and bio-harmonized recipes.
            </p>
          </div>

          {/* Smarter Swaps Section */}
          <div className="mb-24">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="font-editorial text-3xl mb-2">Smarter Swaps</h3>
                <p className="text-stone-500 text-sm font-body uppercase tracking-widest">Counterfactual Suggestions</p>
              </div>
              <div className="flex gap-2">
                <button aria-label="Previous" className="p-2 border border-outline-variant/30 hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button aria-label="Next" className="p-2 border border-outline-variant/30 hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
              {NOURISH_SWAPS.map((swap, i) => (
                <NourishSwapCard key={i} {...swap} />
              ))}
            </div>
          </div>

          {/* Seasonal Recipes Grid */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <h3 className="font-editorial text-4xl">Seasonal Recipes</h3>
              <div className="flex-grow h-[1px] bg-outline-variant/20"></div>
              <div className="flex gap-4">
                <span className="px-4 py-1 border border-primary text-primary text-[0.7rem] uppercase tracking-widest font-bold rounded-full">Autumn</span>
                <span className="px-4 py-1 text-stone-400 text-[0.7rem] uppercase tracking-widest font-medium">Winter</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {SEASONAL_RECIPES.map((recipe, i) => (
                <RecipeCard 
                  key={recipe.title} 
                  {...recipe} 
                  className={i === 1 || i === 4 ? 'lg:mt-12' : ''} 
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA / Signature Sheet */}
          <div className="mt-32 mb-16 bg-surface-container-lowest p-12 md:p-24 relative overflow-hidden group">
            <div className="relative z-10">
              <h5 className="font-editorial text-5xl mb-6 max-w-lg">Can't find what you're craving?</h5>
              <p className="font-body text-on-surface-variant max-w-sm mb-12">
                Let our AI nutritionist adapt any recipe from the web to your unique metabolic profile.
              </p>
              <button className="bg-primary text-on-primary px-10 py-5 text-sm uppercase tracking-[0.2em] font-bold hover:bg-primary-container transition-colors">
                Start Adaptation
              </button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block opacity-10">
              <span className="font-editorial italic text-[12rem] select-none">Bite</span>
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <footer className="px-12 py-12 border-t border-outline-variant/10 text-stone-400">
          <div className="flex flex-col md:flex-row justify-between gap-8 max-w-7xl mx-auto">
            <div className="max-w-xs">
              <h6 className="font-editorial italic text-2xl text-primary mb-4">BetterBite</h6>
              <p className="text-[0.7rem] leading-relaxed uppercase tracking-wider">
                Editorial intelligence for the modern kitchen. Optimized for your metabolic rhythm.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div className="flex flex-col gap-3">
                <span className="text-[0.65rem] font-bold text-on-surface uppercase tracking-widest">Navigation</span>
                <a className="text-[0.7rem] uppercase hover:text-primary" href="#">Journal</a>
                <a className="text-[0.7rem] uppercase hover:text-primary" href="#">Pantry</a>
                <a className="text-[0.7rem] uppercase hover:text-primary" href="#">Laboratory</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[0.65rem] font-bold text-on-surface uppercase tracking-widest">Legal</span>
                <a className="text-[0.7rem] uppercase hover:text-primary" href="#">Privacy</a>
                <a className="text-[0.7rem] uppercase hover:text-primary" href="#">Terms</a>
                <a className="text-[0.7rem] uppercase hover:text-primary" href="#">Science</a>
              </div>
            </div>
          </div>
          <div className="mt-12 text-[0.6rem] text-center uppercase tracking-[0.3em] opacity-40">
            © 2024 BetterBite Digital Larder
          </div>
        </footer>
      </main>
    </div>
  );
};

export default NourishFeed;
