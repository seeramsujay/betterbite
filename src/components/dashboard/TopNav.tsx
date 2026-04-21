import React from 'react';

interface TopNavProps {
  readonly className?: string;
}

export const TopNav: React.FC<TopNavProps> = ({ className = '' }) => {
  return (
    <header className={`sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-xl flex justify-between items-center px-8 py-4 shadow-[0_8px_24px_rgba(28,20,9,0.04)] ${className}`}>
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline opacity-60">search</span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm focus:ring-1 focus:ring-primary"
            placeholder="Search nutrients, recipes..."
            type="text"
          />
        </div>
        <div className="flex items-center bg-primary-fixed px-4 py-1.5 rounded-full gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-[1.2rem] fill-1">auto_awesome</span>
          <span className="text-xs font-bold text-on-primary-fixed">AI Recipe Pill</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button aria-label="Microphone" className="p-2 text-primary hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined">mic</span>
        </button>
        <button aria-label="Notifications" className="p-2 text-primary hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>
    </header>
  );
};

export default TopNav;
