import React from 'react';

interface NourishTopNavProps {
  readonly className?: string;
}

export const NourishTopNav: React.FC<NourishTopNavProps> = ({ className = '' }) => {
  return (
    <header className={`sticky top-0 w-full z-40 bg-background/80 backdrop-blur-md flex justify-between items-center h-20 px-12 ${className}`}>
      <div className="flex items-center gap-6">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">search</span>
          <input
            className="bg-surface-container-low border-none focus:ring-1 focus:ring-primary pl-10 pr-4 py-2 text-sm w-64 rounded-lg"
            placeholder="Search pantry..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex gap-6 items-center">
          <span className="material-symbols-outlined text-stone-500 cursor-pointer hover:text-primary">notifications</span>
          <button className="text-primary text-sm font-body font-medium uppercase tracking-widest hover:opacity-80 transition-opacity">AI Recipe</button>
        </div>
        <div className="h-8 w-[1px] bg-outline-variant opacity-30"></div>
        <h2 className="font-editorial text-2xl text-primary font-medium italic">Nourish</h2>
      </div>
    </header>
  );
};

export default NourishTopNav;
