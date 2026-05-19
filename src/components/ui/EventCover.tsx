'use client';

import { Music, Trophy, Theater, Sparkles, Ticket } from 'lucide-react';
import type { EventCategory } from '@/types/database';

interface EventCoverProps {
  category: EventCategory;
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const categoryConfig: Record<string, { css: string; icon: typeof Music; pattern: string }> = {
  concert: {
    css: 'event-cover-concert',
    icon: Music,
    pattern: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 40%)',
  },
  sports: {
    css: 'event-cover-sports',
    icon: Trophy,
    pattern: 'radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 25% 25%, rgba(255,255,255,0.06) 0%, transparent 40%)',
  },
  theater: {
    css: 'event-cover-theater',
    icon: Theater,
    pattern: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.05) 0%, transparent 40%)',
  },
  festival: {
    css: 'event-cover-festival',
    icon: Sparkles,
    pattern: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 40%)',
  },
  other: {
    css: 'event-cover-other',
    icon: Ticket,
    pattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)',
  },
};

export default function EventCover({ category, title, className = '', size = 'md' }: EventCoverProps) {
  const config = categoryConfig[category] || categoryConfig.other;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'h-32',
    md: 'h-44',
    lg: 'h-56',
  };

  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const seed = title.length;
  const decorX = 15 + (seed * 7) % 70;
  const decorY = 10 + (seed * 13) % 60;

  return (
    <div className={`relative overflow-hidden rounded-xl ${config.css} ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0" style={{ background: config.pattern }} />

      <div
        className="absolute opacity-[0.04]"
        style={{ right: `${decorX}%`, top: `${decorY}%` }}
      >
        <Icon className={`${size === 'lg' ? 'h-32 w-32' : size === 'md' ? 'h-24 w-24' : 'h-16 w-16'} text-white`} strokeWidth={0.8} />
      </div>

      <div
        className="absolute opacity-[0.03]"
        style={{ left: `${(decorX + 40) % 80}%`, bottom: `${(decorY + 30) % 70}%` }}
      >
        <Icon className={`${size === 'lg' ? 'h-20 w-20' : size === 'md' ? 'h-14 w-14' : 'h-10 w-10'} text-white`} strokeWidth={0.6} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

      <div className="absolute bottom-0 start-0 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
            <Icon className={`${iconSizes.sm} text-white`} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
