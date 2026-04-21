import React from 'react';
import { METABOLIC_READINESS } from '../../data/mockData';

interface ReadinessCardProps {
  readonly className?: string;
}

export const ReadinessCard: React.FC<ReadinessCardProps> = ({ className = '' }) => {
  const { score, status, description } = METABOLIC_READINESS;
  const strokeDasharray = 552.92;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * score) / 100;

  return (
    <div className={`bg-surface-container-lowest p-8 rounded-3xl shadow-[0_8px_24px_rgba(28,20,9,0.03)] flex flex-col items-center text-center ${className}`}>
      <span className="text-xs font-bold tracking-widest text-outline uppercase mb-6">Metabolic Readiness</span>
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
          <circle
            className="text-surface-container-high"
            cx="96"
            cy="96"
            fill="transparent"
            r="88"
            stroke="currentColor"
            strokeWidth="6"
          />
          <circle
            className="text-primary rounded-full transition-all duration-1000"
            cx="96"
            cy="96"
            fill="transparent"
            r="88"
            stroke="currentColor"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeWidth="12"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-headline text-6xl font-light">{score}</span>
          <span className="text-xs font-bold text-primary tracking-widest">{status}</span>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3 w-full">
        <div className="h-1 bg-primary rounded-full"></div>
        <div className="h-1 bg-primary rounded-full"></div>
        <div className="h-1 bg-surface-container-high rounded-full"></div>
      </div>
      <p className="mt-6 text-sm text-on-surface-variant leading-relaxed">{description}</p>
    </div>
  );
};

export default ReadinessCard;
