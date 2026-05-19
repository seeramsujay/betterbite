import { create } from 'zustand';

export interface Biometrics {
  sleepHours: number;
  currentHeartRate: number;
  dailySteps: number;
}

interface AppState {
  isMealLogOpen: boolean;
  isRecipeModalOpen: boolean;
  isAdaptModalOpen: boolean;
  isBiometricsModalOpen: boolean;
  selectedSwapItem: string | null;
  biometrics: Biometrics;
  setMealLogOpen: (open: boolean) => void;
  setRecipeModalOpen: (open: boolean, item?: string) => void;
  setAdaptModalOpen: (open: boolean) => void;
  setBiometricsModalOpen: (open: boolean) => void;
  setBiometrics: (biometrics: Partial<Biometrics>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMealLogOpen: false,
  isRecipeModalOpen: false,
  isAdaptModalOpen: false,
  isBiometricsModalOpen: false,
  selectedSwapItem: null,
  biometrics: {
    sleepHours: 7.4,
    currentHeartRate: 62,
    dailySteps: 4218,
  },
  setMealLogOpen: (open) => set({ isMealLogOpen: open }),
  setRecipeModalOpen: (open, item = null) => set({ isRecipeModalOpen: open, selectedSwapItem: item }),
  setAdaptModalOpen: (open) => set({ isAdaptModalOpen: open }),
  setBiometricsModalOpen: (open) => set({ isBiometricsModalOpen: open }),
  setBiometrics: (biometrics) => set((state) => ({ biometrics: { ...state.biometrics, ...biometrics } })),
}));
