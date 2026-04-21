import React from 'react';
import { NAV_ITEMS, USER_INFO } from '../../data/mockData';
import { useAppStore } from '../../lib/store/useAppStore';

interface SidebarProps {
  readonly className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  return (
    <aside className={`flex flex-col py-8 px-6 h-screen w-64 fixed left-0 top-0 border-r-0 bg-surface-container-low dark:bg-stone-900 z-50 ${className}`}>
      <div className="mb-10">
        <h1 className="font-headline text-2xl italic tracking-tight text-primary dark:text-primary-fixed">BetterBite</h1>
        <p className="text-[0.7rem] uppercase tracking-widest opacity-60 mt-1">Precision Metabolic Engine</p>
      </div>
      
      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
              item.active
                ? 'text-primary dark:text-primary-fixed font-bold border-r-2 border-primary bg-surface-variant/30'
                : 'text-on-surface/60 dark:text-stone-400 font-medium hover:bg-surface-variant dark:hover:bg-stone-800'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-lg">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-outline-variant/20">
        <button 
          onClick={() => useAppStore.getState().setMealLogOpen(true)}
          className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined">add</span>
          Log Meal
        </button>
        
        <div className="mt-6 flex items-center gap-3">
          <img
            src={USER_INFO.avatar}
            alt={USER_INFO.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold">{USER_INFO.name}</span>
            <span className="text-[0.65rem] opacity-50 uppercase tracking-tighter">{USER_INFO.tier}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
