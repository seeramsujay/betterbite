import React from 'react';

interface RecipeCardProps {
  readonly title: string;
  readonly time: string;
  readonly difficulty: string;
  readonly score: number;
  readonly tags: readonly string[];
  readonly image: string;
  readonly className?: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  time,
  difficulty,
  score,
  tags,
  image,
  className = '',
}) => {
  return (
    <div className={`group flex flex-col cursor-pointer ${className}`}>
      <div className="relative overflow-hidden mb-6 aspect-[4/5]">
        <img
          src={image}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          alt={title}
        />
        <div className="absolute bottom-4 left-4 flex gap-2">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className={`px-2 py-1 text-[0.6rem] uppercase tracking-widest backdrop-blur-md ${
                i === 0 ? 'bg-primary/90 text-on-primary' : 'bg-secondary/90 text-on-secondary'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-editorial text-2xl group-hover:text-primary transition-colors">{title}</h4>
        <span className="text-xs font-body text-stone-400 mt-2">{time}</span>
      </div>
      <div className="flex items-center gap-4 text-[0.7rem] text-stone-500 uppercase tracking-widest font-medium">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[1rem]">signal_cellular_alt</span> {difficulty}
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[1rem]">bolt</span> Metabolic Score: {score}
        </span>
      </div>
    </div>
  );
};

export default RecipeCard;
