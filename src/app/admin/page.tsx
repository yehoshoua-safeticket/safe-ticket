'use client';

import { Users, Tag, Clock, AlertTriangle, ShieldAlert, CheckCircle, CalendarPlus } from 'lucide-react';
import DashboardCard from '@/components/ui/DashboardCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockProfiles, mockListings, mockDisputes, mockEvents } from '@/data/mock';

export default function AdminOverviewPage() {
  const pendingListings = mockListings.filter((l) => l.status === 'pending_review');
  const flaggedListings = mockListings.filter((l) => l.risk_status === 'flagged' || l.risk_status === 'under_review');
  const openDisputes = mockDisputes.filter((d) => d.status === 'open' || d.status === 'under_review');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">סקירה כללית</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">ניהול הפלטפורמה</p>
      </div>

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
    </div>
  );
}
