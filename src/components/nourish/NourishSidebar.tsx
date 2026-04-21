import React from 'react';
import { NAV_ITEMS, USER_INFO } from '../../data/mockData';
import { useAppStore } from '../../lib/store/useAppStore';

interface NourishSidebarProps {
  readonly className?: string;
}

export const NourishSidebar: React.FC<NourishSidebarProps> = ({ className = '' }) => {
  return (
    <aside className={`fixed left-0 top-0 h-screen w-72 flex flex-col justify-between bg-stone-100/40 backdrop-blur-xl py-10 px-6 z-50 ${className}`}>
      <div className="flex flex-col gap-8">
        <div className="mb-4">
          <h1 className="font-editorial italic text-3xl font-medium text-primary">BetterBite</h1>
          <p className="font-body font-light uppercase tracking-widest text-[0.75rem] text-stone-500">The Digital Larder</p>
        </div>
        <nav className="flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 pl-4 transition-all duration-300 ${
                item.label === 'Nourish'
                  ? 'text-primary font-bold border-l-4 border-primary'
                  : 'text-stone-500 hover:bg-primary/5 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-body font-light uppercase tracking-widest text-[0.75rem]">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-4">
        <button 
          onClick={() => useAppStore.getState().setMealLogOpen(true)}
          className="w-full bg-primary text-on-primary py-4 px-6 text-[0.75rem] font-medium uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all duration-200"
        >
          Log Meal
        </button>
        <div className="flex items-center gap-3 px-4">
          <img
            src={USER_INFO.nourishAvatar}
            alt={USER_INFO.nourishName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{USER_INFO.nourishName}</p>
            <p className="text-[0.7rem] text-stone-500 uppercase tracking-tighter">{USER_INFO.nourishTier}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default NourishSidebar;
