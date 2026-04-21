import React from 'react';
import { useAppStore } from '../../lib/store/useAppStore';

interface NourishSwapCardProps {
  readonly before: string;
  readonly after: string;
  readonly gain: string;
  readonly description: string;
  readonly beforeImg: string;
  readonly afterImg: string;
}

export const NourishSwapCard: React.FC<NourishSwapCardProps> = ({
  before,
  after,
  gain,
  description,
  beforeImg,
  afterImg,
}) => {
  const { setRecipeModalOpen } = useAppStore();

  return (
    <div 
      onClick={() => setRecipeModalOpen(true, after)}
      className="min-w-[400px] snap-start bg-surface-container-lowest p-8 flex flex-col gap-6 group hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      <div className="grid grid-cols-2 gap-4 relative">
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-lg aspect-square">
            <img
              src={beforeImg}
              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              alt={before}
            />
          </div>
          <span className="text-[0.65rem] uppercase tracking-widest font-bold text-stone-400">Instead of</span>
          <span className="text-sm font-medium">{before}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-lg aspect-square ring-2 ring-primary ring-offset-4 ring-offset-surface-container-lowest">
            <img
              src={afterImg}
              className="w-full h-full object-cover"
              alt={after}
            />
          </div>
          <span className="text-[0.65rem] uppercase tracking-widest font-bold text-primary">Try This</span>
          <span className="text-sm font-medium">{after}</span>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface p-2 rounded-full shadow-md z-10">
          <span className="material-symbols-outlined text-primary text-xl">compare_arrows</span>
        </div>
      </div>
      <div className="pt-4 border-t border-outline-variant/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full">Metabolic Gain {gain}</span>
          <span className="material-symbols-outlined text-stone-300">info</span>
        </div>
        <p className="text-xs text-stone-500 leading-relaxed italic">{description}</p>
      </div>
    </div>
  );
};

export default NourishSwapCard;
