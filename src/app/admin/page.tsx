'use client';

import { useState } from 'react';
import { Users, Tag, Clock, AlertTriangle, ShieldAlert, CheckCircle, XCircle, CalendarPlus, MessageCircle } from 'lucide-react';
import DashboardCard from '@/components/ui/DashboardCard';
import StatusBadge from '@/components/ui/StatusBadge';
import AdminTable from '@/components/ui/AdminTable';
import { mockProfiles, mockListings, mockDisputes, mockEvents } from '@/data/mock';
import type { Profile, Listing, Dispute, Event } from '@/types/database';

type Tab = 'overview' | 'users' | 'listings' | 'disputes' | 'events' | 'support';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', venue: '', city: '', date: '', time: '', category: 'concert' });

  const pendingListings = mockListings.filter((l) => l.status === 'pending_review');
  const flaggedListings = mockListings.filter((l) => l.risk_status === 'flagged' || l.risk_status === 'under_review');
  const openDisputes = mockDisputes.filter((d) => d.status === 'open' || d.status === 'under_review');

  const mockSupportMessages = [
    { id: 's-1', from: 'rachel@example.com', subject: 'לא קיבלתי את הכרטיס', date: '2026-05-17T10:00:00Z', status: 'open' as const },
    { id: 's-2', from: 'yossi@example.com', subject: 'איך מעדכנים מחיר?', date: '2026-05-16T14:00:00Z', status: 'replied' as const },
    { id: 's-3', from: 'david@example.com', subject: 'רוצה לבטל מודעה', date: '2026-05-15T09:00:00Z', status: 'open' as const },
  ];

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'סקירה כללית' },
    { id: 'events', label: 'אירועים' },
    { id: 'users', label: 'משתמשים' },
    { id: 'listings', label: 'מודעות' },
    { id: 'disputes', label: 'סכסוכים' },
    { id: 'support', label: 'תמיכה' },
  ];

  const userColumns = [
    { key: 'name', header: 'שם', render: (p: Profile) => <span className="font-medium text-[var(--foreground)]">{p.full_name}</span> },
    { key: 'email', header: 'אימייל', render: (p: Profile) => p.email },
    { key: 'role', header: 'תפקיד', render: (p: Profile) => <StatusBadge status={p.role === 'admin' ? 'verified' : p.role === 'seller' ? 'active' : 'pending'} customLabel={p.role === 'admin' ? 'מנהל' : p.role === 'seller' ? 'מוכר' : 'קונה'} /> },
    { key: 'verification', header: 'אימות', render: (p: Profile) => <StatusBadge status={p.verification_status} /> },
    { key: 'date', header: 'תאריך הצטרפות', render: (p: Profile) => new Date(p.created_at).toLocaleDateString('he-IL') },
  ];

  const listingColumns = [
    { key: 'event', header: 'אירוע', render: (l: Listing) => <span className="font-medium text-[var(--foreground)]">{l.event?.title || '-'}</span> },
    { key: 'seller', header: 'מוכר', render: (l: Listing) => l.seller?.full_name || '-' },
    { key: 'price', header: 'מחיר', render: (l: Listing) => `₪${l.asking_price}` },
    { key: 'status', header: 'סטטוס', render: (l: Listing) => <StatusBadge status={l.status} /> },
    { key: 'risk', header: 'סיכון', render: (l: Listing) => <StatusBadge status={l.risk_status} /> },
    { key: 'actions', header: 'פעולות', render: (l: Listing) => (
      l.status === 'pending_review' ? (
        <div className="flex gap-2">
          <button className="rounded-lg bg-emerald-50 p-1.5 text-[var(--accent-text)] hover:bg-emerald-100"><CheckCircle className="h-4 w-4" /></button>
          <button className="rounded-lg bg-red-50 p-1.5 text-red-600 hover:bg-red-100"><XCircle className="h-4 w-4" /></button>
        </div>
      ) : <span className="text-[var(--muted)]">-</span>
    )},
  ];

  const disputeColumns = [
    { key: 'id', header: 'מזהה', render: (d: Dispute) => <span className="font-mono text-xs">#{d.id.slice(-4)}</span> },
    { key: 'reason', header: 'סיבה', render: (d: Dispute) => <span className="max-w-[200px] truncate">{d.reason}</span> },
    { key: 'status', header: 'סטטוס', render: (d: Dispute) => <StatusBadge status={d.status} /> },
    { key: 'date', header: 'תאריך', render: (d: Dispute) => new Date(d.created_at).toLocaleDateString('he-IL') },
    { key: 'resolution', header: 'החלטה', render: (d: Dispute) => d.admin_resolution ? <span className="text-xs text-[var(--muted)]">{d.admin_resolution.slice(0, 30)}...</span> : <span className="text-[var(--muted)]">ממתין</span> },
  ];

  const eventColumns = [
    { key: 'title', header: 'שם', render: (e: Event) => <span className="font-medium text-[var(--foreground)]">{e.title}</span> },
    { key: 'venue', header: 'מקום', render: (e: Event) => `${e.venue}, ${e.city}` },
    { key: 'date', header: 'תאריך', render: (e: Event) => new Date(e.event_date).toLocaleDateString('he-IL', { day: 'numeric', month: 'short', year: 'numeric' }) },
    { key: 'category', header: 'קטגוריה', render: (e: Event) => {
      switch (e.category) {
        case 'concert': return 'הופעה';
        case 'sports': return 'ספורט';
        case 'theater': return 'תיאטרון';
        case 'festival': return 'פסטיבל';
        default: return 'אחר';
      }
    }},
    { key: 'listings', header: 'מודעות', render: (e: Event) => {
      const count = mockListings.filter((l) => l.event_id === e.id && l.status === 'active').length;
      return `${count} פעילות`;
    }},
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">לוח ניהול</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">ניהול הפלטפורמה</p>
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id ? 'bg-emerald-50 text-[var(--accent-text)]' : 'text-[var(--muted)] hover:bg-[var(--input-bg)] hover:text-[var(--foreground)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <DashboardCard title="משתמשים" value={mockProfiles.length} icon={Users} color="blue" />
            <DashboardCard title="אירועים" value={mockEvents.length} icon={CalendarPlus} color="emerald" />
            <DashboardCard title="מודעות" value={mockListings.length} icon={Tag} color="purple" />
            <DashboardCard title="ממתין לאישור" value={pendingListings.length} icon={Clock} color="yellow" />
            <DashboardCard title="סכסוכים פתוחים" value={openDisputes.length} icon={AlertTriangle} color="red" />
            <DashboardCard title="התראות הונאה" value={flaggedListings.length} icon={ShieldAlert} color="red" />
          </div>

          {pendingListings.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">ממתין לאישור</h2>
              <div className="space-y-3">
                {pendingListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{listing.event?.title}</p>
                      <p className="text-sm text-[var(--muted)]">מוכר: {listing.seller?.full_name} · ₪{listing.asking_price}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm text-[var(--accent-text)] hover:bg-emerald-100">אשר</button>
                      <button className="rounded-lg bg-red-50 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100">דחה</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {flaggedListings.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">התראות הונאה</h2>
              <div className="space-y-3">
                {flaggedListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-[var(--foreground)]">{listing.event?.title}</p>
                        <p className="text-sm text-red-600">מוכר: {listing.seller?.full_name} · סטטוס: {listing.risk_status}</p>
                      </div>
                    </div>
                    <StatusBadge status={listing.risk_status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">ניהול אירועים</h2>
            <button
              onClick={() => setShowAddEvent(!showAddEvent)}
              className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              <CalendarPlus className="h-4 w-4" />
              הוסף אירוע
            </button>
          </div>

          {showAddEvent && (
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
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
      )}

      {activeTab === 'users' && <AdminTable columns={userColumns} data={mockProfiles} />}
      {activeTab === 'listings' && <AdminTable columns={listingColumns} data={mockListings} />}
      {activeTab === 'disputes' && <AdminTable columns={disputeColumns} data={mockDisputes} />}

      {activeTab === 'support' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">הודעות תמיכה</h2>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              {mockSupportMessages.filter((m) => m.status === 'open').length} ממתינות
            </span>
          </div>
          <div className="space-y-3">
            {mockSupportMessages.map((msg) => (
              <div key={msg.id} className="flex items-center justify-between rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
                <div className="flex items-start gap-3">
                  <MessageCircle className={`mt-0.5 h-5 w-5 ${msg.status === 'open' ? 'text-amber-500' : 'text-[var(--muted)]'}`} />
                  <div>
                    <p className="font-medium text-[var(--foreground)]">{msg.subject}</p>
                    <p className="text-sm text-[var(--muted)]">{msg.from} · {new Date(msg.date).toLocaleDateString('he-IL')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    msg.status === 'open' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {msg.status === 'open' ? 'ממתין' : 'נענה'}
                  </span>
                  <button className="rounded-lg border border-[var(--input-border)] px-3 py-1.5 text-xs text-[var(--muted)] transition hover:bg-[var(--input-bg)]">
                    השב במייל
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--muted)]">
            כרגע, התשובות נשלחות ישירות מהמייל שלכם. בעתיד, ניתן יהיה להשיב מתוך הפאנל.
          </p>
        </div>
      )}
    </div>
  );
}
