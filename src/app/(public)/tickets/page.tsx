'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import FilterBar, { FilterState } from '@/components/tickets/FilterBar';
import EmptyState from '@/components/ui/EmptyState';
import FadeIn from '@/components/ui/FadeIn';
import EventCover from '@/components/ui/EventCover';
import { getEventsWithActiveListings } from '@/data/mock';
import { Ticket, MapPin, Calendar } from 'lucide-react';
import type { EventCategory } from '@/types/database';

export default function TicketsPage() {
  const allEvents = getEventsWithActiveListings();
  const [filters, setFilters] = useState<FilterState>({ search: '', city: '', category: '', minPrice: '', maxPrice: '' });

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!event.title.toLowerCase().includes(q) && !event.venue.toLowerCase().includes(q) && !event.city.toLowerCase().includes(q)) return false;
      }
      if (filters.city && event.city !== filters.city) return false;
      if (filters.category && event.category !== filters.category) return false;
      if (filters.minPrice && event.lowestPrice < parseFloat(filters.minPrice)) return false;
      if (filters.maxPrice && event.lowestPrice > parseFloat(filters.maxPrice)) return false;
      return true;
    });
  }, [allEvents, filters]);

  const categoryLabel = (cat: string) => {
    switch (cat) {
      case 'concert': return 'הופעה';
      case 'sports': return 'ספורט';
      case 'theater': return 'תיאטרון';
      case 'festival': return 'פסטיבל';
      default: return 'אחר';
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">אירועים עם כרטיסים זמינים</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">מצאו כרטיסים לאירועים הקרובים במחירים הוגנים</p>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <FilterBar onFilter={setFilters} />
        <div className="mt-5 text-sm text-[var(--muted)]">{filteredEvents.length} אירועים נמצאו</div>
      </FadeIn>
      {filteredEvents.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, i) => (
            <FadeIn key={event.id} delay={i * 0.06}>
              <Link
                href={`/tickets/${event.id}`}
                className="group block overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/8"
              >
                <EventCover
                  category={event.category as EventCategory}
                  title={event.title}
                  size="sm"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="p-5">
                  <div className="mb-2 inline-block rounded-full bg-[var(--accent-soft)] px-3 py-0.5 text-xs font-medium text-[var(--accent-text)]">
                    {categoryLabel(event.category)}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-text)]">{event.title}</h3>
                  <div className="space-y-1 text-sm text-[var(--muted)]">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{event.venue}, {event.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(event.event_date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-[var(--card-border)] pt-3">
                    <span className="text-sm text-[var(--muted)]">{event.listingCount} כרטיסים</span>
                    <span className="font-semibold text-[var(--accent-text)]">החל מ-₪{event.lowestPrice}</span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      ) : (
        <FadeIn>
          <div className="mt-8"><EmptyState icon={Ticket} title="לא נמצאו אירועים" description="נסו לשנות את הסינון" /></div>
        </FadeIn>
      )}
    </div>
  );
}
