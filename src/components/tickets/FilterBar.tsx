'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FilterBarProps {
  onFilter: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  city: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}

const cities = ['הכל', 'תל אביב', 'ירושלים', 'חיפה', 'הרצליה', 'אילת'];
const categories = [
  { value: '', label: 'הכל' },
  { value: 'concert', label: 'הופעות' },
  { value: 'sports', label: 'ספורט' },
  { value: 'theater', label: 'תיאטרון' },
  { value: 'festival', label: 'פסטיבלים' },
  { value: 'conference', label: 'כנסים' },
];

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ search: '', city: '', category: '', minPrice: '', maxPrice: '' });

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const empty: FilterState = { search: '', city: '', category: '', minPrice: '', maxPrice: '' };
    setFilters(empty);
    onFilter(empty);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            placeholder="חפש אירוע, אמן, מקום..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] py-2.5 pe-4 ps-11 text-sm placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition ${
            isOpen || hasActiveFilters ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-text)]' : 'border-[var(--input-border)] text-[var(--muted)] hover:border-[var(--muted)]'
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">סינון</span>
        </button>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1 rounded-lg border border-[var(--input-border)] px-3 py-2.5 text-sm text-[var(--muted)]">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1.5 block text-xs text-[var(--muted)]">עיר</label>
            <select value={filters.city} onChange={(e) => updateFilter('city', e.target.value)} className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none">
              {cities.map((c) => <option key={c} value={c === 'הכל' ? '' : c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[var(--muted)]">קטגוריה</label>
            <select value={filters.category} onChange={(e) => updateFilter('category', e.target.value)} className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none">
              {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[var(--muted)]">מחיר מינימום</label>
            <input type="number" placeholder="₪0" value={filters.minPrice} onChange={(e) => updateFilter('minPrice', e.target.value)} className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[var(--muted)]">מחיר מקסימום</label>
            <input type="number" placeholder="₪∞" value={filters.maxPrice} onChange={(e) => updateFilter('maxPrice', e.target.value)} className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none" />
          </div>
        </div>
      )}
    </div>
  );
}
