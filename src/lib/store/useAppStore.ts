import { create } from 'zustand';

interface AppState {
  isMealLogOpen: boolean;
  isRecipeModalOpen: boolean;
  selectedSwapItem: string | null;
  setMealLogOpen: (open: boolean) => void;
  setRecipeModalOpen: (open: boolean, item?: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMealLogOpen: false,
  isRecipeModalOpen: false,
  selectedSwapItem: null,
  setMealLogOpen: (open) => set({ isMealLogOpen: open }),
  setRecipeModalOpen: (open, item = null) => set({ isRecipeModalOpen: open, selectedSwapItem: item }),
}));
