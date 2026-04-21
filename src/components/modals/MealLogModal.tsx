"use client";

import React, { useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAppStore } from "../../lib/store/useAppStore";
import { fileToBase64 } from "../../lib/utils/image";
import { trpc } from "../../app/utils/trpc";

export const MealLogModal: React.FC = () => {
  const { isMealLogOpen, setMealLogOpen } = useAppStore();
  const utils = trpc.useUtils();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64,
          mimeType: file.type,
          biometrics: {
            sleepHours: 7.5,
            currentHeartRate: 72,
            dailySteps: 5400,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data.data);
        utils.meal.getLogs.invalidate();
      } else {
        alert("Analysis failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error processing image");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Dialog.Root open={isMealLogOpen} onOpenChange={setMealLogOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-surface-container-lowest rounded-[2rem] p-8 shadow-2xl z-[101] border border-outline-variant/20">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="font-headline text-2xl">Log your meal</Dialog.Title>
            <Dialog.Close className="p-2 hover:bg-surface-container rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
            </Dialog.Close>
          </div>

          {!result ? (
            <div className="space-y-6">
              <p className="text-on-surface-variant text-sm">
                Upload a photo of your meal. BetterBite AI will identify nutrients and predict your metabolic response based on current vitals.
              </p>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed border-primary/30 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-primary/5 transition-all ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {isAnalyzing ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-bold text-primary animate-pulse text-sm uppercase tracking-widest">Gemini Analyzing...</p>
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-5xl text-primary">cloud_upload</span>
                    <p className="font-bold text-sm text-outline">Click to upload or take a photo</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-primary/5 p-6 rounded-2xl space-y-4">
                <div>
                  <label className="text-[0.65rem] font-bold text-primary uppercase tracking-widest block mb-1">Identified Meal</label>
                  <p className="font-headline text-xl">{result.identifiedMeal}</p>
                </div>
                <div>
                  <label className="text-[0.65rem] font-bold text-primary uppercase tracking-widest block mb-1">Predicted Outcome</label>
                  <p className="text-sm italic text-on-surface-variant leading-relaxed">"{result.predictedOutcome}"</p>
                </div>
              </div>

              <div className="bg-secondary/5 p-6 rounded-2xl border-l-4 border-secondary">
                <label className="text-[0.65rem] font-bold text-secondary uppercase tracking-widest block mb-2">BetterBite Suggestion</label>
                <h4 className="font-headline text-lg mb-1">{result.suggestedSwap}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">{result.counterfactualOutcome}</p>
              </div>

              <button 
                onClick={() => { setResult(null); setMealLogOpen(false); }}
                className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Log to Diary
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MealLogModal;
