import React from 'react';
import { useAppStore } from '../../lib/store/useAppStore';

interface SwapCardProps {
  readonly title: string;
  readonly metrics: readonly string[];
  readonly beforeImg: string;
  readonly afterImg: string;
  readonly className?: string;
}

export const SwapCard: React.FC<SwapCardProps> = ({
  title,
  metrics,
  beforeImg,
  afterImg,
  className = '',
}) => {
  const { setRecipeModalOpen } = useAppStore();

  return (
    <div 
      onClick={() => setRecipeModalOpen(true, title)}
      className={`min-w-[340px] bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex flex-col gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer group ${className}`}
    >
      <div className="flex h-40">
        <div className="w-1/2 relative overflow-hidden">
          <img
            src={beforeImg}
            className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 transition-all duration-500"
            alt={`${title} before`}
          />
          <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center">
            <span className="bg-surface/90 px-3 py-1 rounded-full text-[0.6rem] font-bold text-secondary uppercase tracking-widest">Before</span>
          </div>
        </div>
        <div className="w-1/2 relative overflow-hidden">
          <img
            src={afterImg}
            className="w-full h-full object-cover"
            alt={`${title} after`}
          />
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
            <span className="bg-surface/90 px-3 py-1 rounded-full text-[0.6rem] font-bold text-primary uppercase tracking-widest">Better</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-headline text-xl mb-2">{title}</h3>
        <div className="flex gap-2">
          {metrics.map((metric, i) => (
            <span
              key={metric}
              className={`px-3 py-1 rounded-full text-[0.65rem] font-bold ${
                i === 0 ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-tertiary-fixed text-on-tertiary-fixed'
              }`}
            >
              {metric}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwapCard;
