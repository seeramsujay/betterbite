import React from 'react';

interface MetricCardProps {
  readonly label: string;
  readonly value: string;
  readonly unit: string;
  readonly change: string;
  readonly icon: string;
  readonly color: 'primary' | 'secondary' | 'tertiary';
  readonly trend?: readonly number[];
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  change,
  icon,
  color,
  trend,
}) => {
  const colorClass = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
  }[color];

  return (
    <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between h-44 group hover:bg-surface-container-high transition-colors">
      <div className="flex justify-between items-start">
        <span className={`material-symbols-outlined ${colorClass}`}>{icon}</span>
        <span className={`text-[0.65rem] font-bold ${colorClass}`}>{change}</span>
      </div>
      <div>
        <span className="font-headline text-4xl block">
          {value}
          <span className="text-lg ml-1 font-body text-outline">{unit}</span>
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">{label}</span>
      </div>
      
      {trend && (
        <div className="w-full h-8 flex items-end gap-1 mt-2">
          {trend.map((h, i) => (
            <div
              key={i}
              className={`flex-1 ${color === 'primary' ? 'bg-primary' : 'bg-secondary'} rounded-t-sm`}
              style={{ height: `${(h / Math.max(...trend)) * 100}%`, opacity: h === Math.max(...trend) ? 1 : 0.2 }}
            />
          ))}
        </div>
      )}
      
      {!trend && icon === 'directions_walk' && (
        <div className="w-full h-8 flex items-center mt-2">
           <svg className="w-full h-full text-secondary opacity-40" viewBox="0 0 100 20">
            <path d="M0 10 Q 25 2, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      )}

      {!trend && icon === 'electric_bolt' && (
         <div className="w-full h-8 flex items-center mt-2">
         <svg className="w-full h-full text-tertiary" viewBox="0 0 100 20">
           <path d="M0 15 L 10 5 L 20 18 L 30 2 L 40 12 L 50 8 L 60 16 L 70 4 L 80 10 L 90 2 L 100 12" fill="none" stroke="currentColor" strokeWidth="2" />
         </svg>
       </div>
      )}
    </div>
  );
};

export default MetricCard;
