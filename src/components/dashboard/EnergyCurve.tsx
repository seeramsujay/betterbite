"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "1PM", original: 80, counterfactual: 80 },
  { time: "2PM", original: 140, counterfactual: 95 },
  { time: "3PM", original: 60, counterfactual: 100 },
  { time: "4PM", original: 40, counterfactual: 90 },
  { time: "5PM", original: 75, counterfactual: 85 },
];

export function EnergyCurve() {
  return (
    <div className="w-full h-48 relative mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#bec9c0" opacity={0.2} />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#6f7a72' }} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#6f7a72' }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff8f4', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ fontSize: '12px' }}
            labelStyle={{ fontSize: '12px', color: '#6f7a72', fontWeight: 'bold' }}
          />
          <Line 
            type="monotone" 
            dataKey="original" 
            name="Original Meal"
            stroke="#9ca3af" // Gray for crash
            strokeWidth={3} 
            dot={false}
            opacity={0.6}
          />
          <Line 
            type="monotone" 
            dataKey="counterfactual" 
            name="BetterBite Nudge"
            stroke="#10b981" // Glowing mint green
            strokeWidth={4} 
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            style={{
              filter: `drop-shadow(0px 0px 8px rgba(16, 185, 129, 0.4))`
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EnergyCurve;
