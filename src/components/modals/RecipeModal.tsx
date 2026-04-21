"use client";

import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAppStore } from "../../lib/store/useAppStore";

export const RecipeModal: React.FC = () => {
  const { isRecipeModalOpen, selectedSwapItem, setRecipeModalOpen } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    if (isRecipeModalOpen && selectedSwapItem) {
      fetchRecipe();
    } else {
      setRecipe(null);
    }
  }, [isRecipeModalOpen, selectedSwapItem]);

  const fetchRecipe = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ swapItem: selectedSwapItem }),
      });
      const data = await res.json();
      if (data.success) {
        setRecipe(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={isRecipeModalOpen} onOpenChange={(open) => setRecipeModalOpen(open)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-surface-container-lowest rounded-[2rem] p-0 shadow-2xl z-[101] border border-outline-variant/20 overflow-hidden">
          {isLoading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-6">
              <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
              <div className="text-center">
                <p className="font-headline text-2xl mb-1 italic">Generating Kitchen Intelligence</p>
                <p className="text-sm text-outline uppercase tracking-widest font-bold">Bio-Matching Ingredients...</p>
              </div>
            </div>
          ) : recipe ? (
            <div className="animate-fade-in">
              <div className="bg-secondary p-8 flex justify-between items-start">
                <div>
                  <label className="text-[0.65rem] font-bold text-on-secondary/60 uppercase tracking-[0.2em] block mb-2">Meta-Optimized Recipe</label>
                  <Dialog.Title className="font-headline text-4xl text-on-secondary italic">{recipe.recipeName}</Dialog.Title>
                </div>
                <Dialog.Close className="p-2 hover:bg-white/10 rounded-full transition-colors text-on-secondary">
                  <span className="material-symbols-outlined">close</span>
                </Dialog.Close>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                <div className="md:col-span-2 bg-surface-container-low p-8 border-r border-outline-variant/10">
                  <h4 className="text-[0.65rem] font-bold text-primary uppercase tracking-widest mb-6 border-b border-primary/20 pb-2">Grocery List</h4>
                  <ul className="space-y-4">
                    {recipe.groceryList.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-10 bg-white border border-outline-variant/30 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-surface-container transition-colors">
                    Add to Cart
                  </button>
                </div>
                
                <div className="md:col-span-3 p-8 space-y-8">
                  <h4 className="text-[0.65rem] font-bold text-outline uppercase tracking-widest mb-2">Preparation Steps</h4>
                  <div className="space-y-8">
                    {recipe.steps.map((step: string, i: number) => (
                      <div key={i} className="flex gap-6">
                        <span className="font-headline text-4xl text-secondary/20 italic select-none">0{i+1}</span>
                        <p className="text-sm leading-relaxed text-on-surface/80 pt-2">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-container-highest/30 p-6 px-8 flex justify-between items-center">
                <p className="text-[0.7rem] text-stone-400 italic">Validated by BetterBite Engine v.1.0 • Seasonal Autumn Bias</p>
                <div className="flex gap-3">
                  <button className="p-2 hover:bg-surface-container rounded-full"><span className="material-symbols-outlined text-outline">share</span></button>
                  <button className="p-2 hover:bg-surface-container rounded-full"><span className="material-symbols-outlined text-outline">favorite</span></button>
                </div>
              </div>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RecipeModal;
