import React from 'react';

interface MealItemProps {
  readonly type: string;
  readonly time: string;
  readonly title: string;
  readonly score: number;
  readonly image: string;
}

export const MealItem: React.FC<MealItemProps> = ({
  type,
  time,
  title,
  score,
  image,
}) => {
  return (
    <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl group hover:shadow-md transition-shadow">
      <img src={image} className="w-16 h-16 rounded-xl object-cover" alt={title} />
      <div className="flex-1">
        <p className="text-[0.65rem] font-bold text-outline uppercase tracking-widest">{type} • {time}</p>
        <h4 className="font-headline text-lg leading-tight">{title}</h4>
        <p className="text-xs text-primary font-bold mt-0.5">Metabolic Score: {score}</p>
      </div>
      <span className="material-symbols-outlined text-outline opacity-40">chevron_right</span>
    </div>
  );
};

export default MealItem;
