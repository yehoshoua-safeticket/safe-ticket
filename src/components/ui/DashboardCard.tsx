'use client';

import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: 'emerald' | 'blue' | 'yellow' | 'red' | 'purple';
}

const colorMap = {
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  blue: 'border-blue-200 bg-blue-50 text-blue-700',
  yellow: 'border-amber-200 bg-amber-50 text-amber-700',
  red: 'border-red-200 bg-red-50 text-red-700',
  purple: 'border-purple-200 bg-purple-50 text-purple-700',
};

export default function DashboardCard({ title, value, icon: Icon, trend, color = 'blue' }: DashboardCardProps) {
  const colors = colorMap[color];

  return (
    <div className={`rounded-xl border p-5 ${colors}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-70">{title}</p>
          <p className="mt-1.5 text-2xl font-bold">{value}</p>
          {trend && <p className="mt-1 text-xs opacity-60">{trend}</p>}
        </div>
        <Icon className="h-5 w-5 opacity-60" />
      </div>
    </div>
  );
}
