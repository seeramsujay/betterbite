"use client";

import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAppStore } from "../../lib/store/useAppStore";
import { trpc } from "../../app/utils/trpc";
import { playAudioFeedback } from "../../lib/utils/audio";

export const BiometricsModal: React.FC = () => {
  const { isBiometricsModalOpen, setBiometricsModalOpen, biometrics, setBiometrics } = useAppStore();
  const utils = trpc.useUtils();
  const [sleepHours, setSleepHours] = useState(biometrics.sleepHours);
  const [currentHeartRate, setCurrentHeartRate] = useState(biometrics.currentHeartRate);
  const [dailySteps, setDailySteps] = useState(biometrics.dailySteps);
  const [isSaving, setIsSaving] = useState(false);

  const updateMutation = trpc.meal.updateBiometrics.useMutation();

  // Reset inputs when opened
  useEffect(() => {
    if (isBiometricsModalOpen) {
      setSleepHours(biometrics.sleepHours);
      setCurrentHeartRate(biometrics.currentHeartRate);
      setDailySteps(biometrics.dailySteps);
    }
  }, [isBiometricsModalOpen, biometrics]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateMutation.mutateAsync({
        sleepHours,
        currentHeartRate,
        dailySteps,
      });

      // Update Zustand
      setBiometrics({
        sleepHours,
        currentHeartRate,
        dailySteps,
      });

      playAudioFeedback("success");
      setBiometricsModalOpen(false);
      
      // Invalidate query to sync back with server
      utils.meal.getBiometrics.invalidate();
    } catch (err) {
      console.error(err);
      playAudioFeedback("error");
      alert("Failed to update biometrics");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog.Root open={isBiometricsModalOpen} onOpenChange={setBiometricsModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface-container-lowest rounded-[2rem] p-8 shadow-2xl z-[101] border border-outline-variant/20">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="font-headline text-2xl">Update Vitals</Dialog.Title>
            <Dialog.Close className="p-2 hover:bg-surface-container rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-on-surface-variant text-sm">
              Adjust your biometrics to simulate metabolic changes. The readiness score and suggestions will recalculate.
            </p>

            <div className="space-y-4">
              {/* Sleep Hours Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-outline uppercase tracking-wider">
                  <label htmlFor="sleep-hours">Deep Sleep Quality</label>
                  <span className="text-primary">{sleepHours.toFixed(1)} h</span>
                </div>
                <input
                  id="sleep-hours"
                  type="range"
                  min="0"
                  max="24"
                  step="0.1"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                  className="w-full h-1 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Heart Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-outline uppercase tracking-wider">
                  <label htmlFor="heart-rate">Resting Heart Rate</label>
                  <span className="text-primary">{currentHeartRate} bpm</span>
                </div>
                <input
                  id="heart-rate"
                  type="range"
                  min="30"
                  max="250"
                  step="1"
                  value={currentHeartRate}
                  onChange={(e) => setCurrentHeartRate(parseInt(e.target.value))}
                  className="w-full h-1 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Steps Input */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-outline uppercase tracking-wider">
                  <label htmlFor="daily-steps">Daily Steps</label>
                  <span className="text-primary">{dailySteps.toLocaleString()}</span>
                </div>
                <input
                  id="daily-steps"
                  type="number"
                  min="0"
                  max="100000"
                  value={dailySteps}
                  onChange={(e) => setDailySteps(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-surface-container p-4 rounded-xl border border-outline-variant/20 focus:outline-none focus:border-primary text-sm transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>Syncing Vitals...</span>
                </>
              ) : (
                <span>Save Vitals</span>
              )}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BiometricsModal;
