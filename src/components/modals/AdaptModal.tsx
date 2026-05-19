"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAppStore } from "../../lib/store/useAppStore";
import { playAudioFeedback } from "../../lib/utils/audio";

export const AdaptModal: React.FC = () => {
  const { isAdaptModalOpen, setAdaptModalOpen, biometrics } = useAppStore();
  const [promptValue, setPromptValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAdapt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptValue.trim()) return;

    setIsLoading(true);
    playAudioFeedback("thinking");
    try {
      const res = await fetch("/api/adapt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipePrompt: promptValue,
          biometrics: {
            sleepHours: biometrics.sleepHours,
            currentHeartRate: biometrics.currentHeartRate,
            dailySteps: biometrics.dailySteps,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        playAudioFeedback("success");
        setResult(data.data);
      } else {
        playAudioFeedback("error");
        alert("Adaptation failed");
      }
    } catch (err) {
      console.error(err);
      playAudioFeedback("error");
      alert("Error adapting recipe");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setPromptValue("");
  };

  return (
    <Dialog.Root open={isAdaptModalOpen} onOpenChange={(open) => { setAdaptModalOpen(open); if (!open) handleReset(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-surface-container-lowest rounded-[2rem] p-0 shadow-2xl z-[101] border border-outline-variant/20 overflow-hidden">
          {isLoading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-6" aria-live="polite" role="status">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="text-center">
                <p className="font-headline text-2xl mb-1 italic">Re-Engineering Recipe Profile</p>
                <p className="text-sm text-outline uppercase tracking-widest font-bold">Aligning with Metabolic Rhythm...</p>
              </div>
            </div>
          ) : result ? (
            <div className="animate-fade-in max-h-[85vh] overflow-y-auto no-scrollbar">
              <div className="bg-primary p-8 flex justify-between items-start">
                <div>
                  <label className="text-[0.65rem] font-bold text-on-primary/60 uppercase tracking-[0.2em] block mb-2">Metabolic Adaptation</label>
                  <Dialog.Title className="font-headline text-4xl text-on-primary italic">{result.adaptedName}</Dialog.Title>
                  <p className="text-xs text-on-primary/70 mt-1">Adapted from: <span className="line-through">{result.originalName}</span></p>
                </div>
                <Dialog.Close className="p-2 hover:bg-white/10 rounded-full transition-colors text-on-primary">
                  <span className="material-symbols-outlined">close</span>
                </Dialog.Close>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                <div className="md:col-span-2 bg-surface-container-low p-8 border-r border-outline-variant/10">
                  <div className="mb-6">
                    <span className="text-xs font-semibold px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full block text-center w-full">
                      Swap Gain: {result.metabolicGain}
                    </span>
                  </div>
                  <h4 className="text-[0.65rem] font-bold text-primary uppercase tracking-widest mb-6 border-b border-primary/20 pb-2">Larder Ingredients</h4>
                  <ul className="space-y-4">
                    {result.groceryList.map((item: string, i: number) => (
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
                  <div>
                    <h4 className="text-[0.65rem] font-bold text-outline uppercase tracking-widest mb-2">Metabolic Shift Justification</h4>
                    <p className="text-sm leading-relaxed text-on-surface-variant italic">"{result.swapDescription}"</p>
                  </div>
                  
                  <div>
                    <h4 className="text-[0.65rem] font-bold text-outline uppercase tracking-widest mb-4">Preparation Steps</h4>
                    <div className="space-y-6">
                      {result.steps.map((step: string, i: number) => (
                        <div key={i} className="flex gap-4">
                          <span className="font-headline text-3xl text-primary/20 italic select-none">0{i+1}</span>
                          <p className="text-sm leading-relaxed text-on-surface/80 pt-1.5">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-container-highest/30 p-6 px-8 flex justify-between items-center border-t border-outline-variant/10">
                <button
                  onClick={handleReset}
                  className="text-xs font-bold uppercase text-primary hover:underline"
                >
                  Adapt Another
                </button>
                <div className="flex gap-3">
                  <button className="p-2 hover:bg-surface-container rounded-full"><span className="material-symbols-outlined text-outline">share</span></button>
                  <button className="p-2 hover:bg-surface-container rounded-full"><span className="material-symbols-outlined text-outline">favorite</span></button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title className="font-headline text-2xl">Adapt Recipe</Dialog.Title>
                <Dialog.Close className="p-2 hover:bg-surface-container rounded-full transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </Dialog.Close>
              </div>

              <form onSubmit={handleAdapt} className="space-y-6">
                <p className="text-on-surface-variant text-sm">
                  Enter any dish name or describe a meal you crave. Gemini will automatically rewrite it to maximize metabolic readiness.
                </p>

                <div className="space-y-2">
                  <label htmlFor="recipe-input" className="text-xs font-bold text-outline uppercase tracking-wider">Dish or Cravings</label>
                  <input
                    id="recipe-input"
                    type="text"
                    required
                    value={promptValue}
                    onChange={(e) => setPromptValue(e.target.value)}
                    placeholder="e.g. White Rice with Butter Chicken, Glazed Chocolate Pastry"
                    className="w-full bg-surface-container p-4 rounded-xl border border-outline-variant/20 focus:outline-none focus:border-primary text-sm transition-colors"
                  />
                </div>

                <div className="bg-secondary/5 p-4 rounded-xl border-l-4 border-secondary text-xs flex flex-col gap-1 text-on-surface-variant">
                  <span className="font-bold text-secondary uppercase tracking-wider">Metabolic Context:</span>
                  <span>Sleep: {biometrics.sleepHours}h • Heart Rate: {biometrics.currentHeartRate}bpm • Steps: {biometrics.dailySteps}</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-[1.01]"
                >
                  Generate Adaptation
                </button>
              </form>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AdaptModal;
