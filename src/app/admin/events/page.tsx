'use client';

import { useState } from 'react';
import { CalendarPlus } from 'lucide-react';
import AdminTable from '@/components/ui/AdminTable';
import { mockEvents, mockListings } from '@/data/mock';
import type { Column } from '@/components/ui/AdminTable';
import type { Event } from '@/types/database';

const eventColumns: Column<Event>[] = [
  { key: 'title', header: 'שם', sortable: true, sortValue: (e) => e.title, render: (e) => <span className="font-medium text-[var(--foreground)]">{e.title}</span> },
  { key: 'venue', header: 'מקום', sortable: true, sortValue: (e) => e.venue, render: (e) => `${e.venue}, ${e.city}` },
  { key: 'date', header: 'תאריך', sortable: true, sortValue: (e) => e.event_date, render: (e) => new Date(e.event_date).toLocaleDateString('he-IL', { day: 'numeric', month: 'short', year: 'numeric' }) },
  {
    key: 'category', header: 'קטגוריה', sortable: true, sortValue: (e) => e.category, render: (e) => {
      switch (e.category) {
        case 'concert': return 'הופעה';
        case 'sports': return 'ספורט';
        case 'theater': return 'תיאטרון';
        case 'festival': return 'פסטיבל';
        default: return 'אחר';
      }
    },
  },
  {
    key: 'listings', header: 'מודעות', render: (e) => {
      const count = mockListings.filter((l) => l.event_id === e.id && l.status === 'active').length;
      return `${count} פעילות`;
    },
  },
];

export default function AdminEventsPage() {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', venue: '', city: '', date: '', time: '', category: 'concert' });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">אירועים</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">ניהול אירועים בפלטפורמה</p>
        </div>
        <button
          onClick={() => setShowAddEvent(!showAddEvent)}
          className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          <CalendarPlus className="h-4 w-4" />
          הוסף אירוע
        </button>
      </div>

      {showAddEvent && (
        <div className="mb-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="mb-4 text-base font-semibold text-[var(--foreground)]">אירוע חדש</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm text-[var(--muted)]">שם האירוע</label>
              <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="שם האירוע" className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">מקום</label>
              <input type="text" value={newEvent.venue} onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })} placeholder="שם המקום" className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">עיר</label>
              <input type="text" value={newEvent.city} onChange={(e) => setNewEvent({ ...newEvent, city: e.target.value })} placeholder="עיר" className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">תאריך</label>
              <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">שעה</label>
              <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">קטגוריה</label>
              <select value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })} className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]">
                <option value="concert">הופעה</option>
                <option value="sports">ספורט</option>
                <option value="theater">תיאטרון</option>
                <option value="festival">פסטיבל</option>
                <option value="other">אחר</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="rounded-lg bg-[var(--accent)] px-6 py-2 text-sm font-medium text-white transition hover:opacity-90">שמור אירוע</button>
            <button onClick={() => setShowAddEvent(false)} className="rounded-lg border border-[var(--input-border)] px-6 py-2 text-sm text-[var(--muted)] transition hover:bg-[var(--input-bg)]">ביטול</button>
          </div>
        </div>
      )}

      <AdminTable columns={eventColumns} data={mockEvents} />
    </div>
  );
}
