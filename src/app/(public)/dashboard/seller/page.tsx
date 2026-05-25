'use client';

import Link from 'next/link';
import { Plus, Tag, DollarSign, Clock, XCircle, CheckCircle } from 'lucide-react';
import DashboardCard from '@/components/ui/DashboardCard';
import StatusBadge from '@/components/ui/StatusBadge';
import EmptyState from '@/components/ui/EmptyState';
import { mockListings, mockPayouts, mockProfiles } from '@/data/mock';

export default function SellerDashboardPage() {
  const seller = mockProfiles[0];
  const listings = mockListings.filter((l) => l.seller_id === seller.id);
  const payouts = mockPayouts.filter((p) => p.seller_id === seller.id);

  const activeListings = listings.filter((l) => l.status === 'active');
  const soldListings = listings.filter((l) => l.status === 'sold');
  const pendingListings = listings.filter((l) => l.status === 'pending_review');
  const rejectedListings = listings.filter((l) => l.status === 'rejected');

  const pendingPayouts = payouts.filter((p) => p.status === 'held' || p.status === 'pending_release');
  const totalEarned = payouts.filter((p) => p.status === 'released').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">לוח המוכר</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">נהל את המודעות והתשלומים שלך</p>
        </div>
        <Link
          href="/sell"
          className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          מודעה חדשה
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="מודעות פעילות" value={activeListings.length} icon={Tag} color="emerald" />
        <DashboardCard title="נמכרו" value={soldListings.length} icon={CheckCircle} color="blue" />
        <DashboardCard title="ממתינים לתשלום" value={pendingPayouts.length} icon={Clock} color="yellow" />
        <DashboardCard title="סה״כ הכנסות" value={`₪${totalEarned}`} icon={DollarSign} color="purple" />
      </div>

      {/* Payout Timeline */}
      <div className="mb-8 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">תהליך שחרור תשלום</h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {[
            { label: 'קונה שילם', icon: DollarSign, active: true },
            { label: 'כסף בנאמנות', icon: Clock, active: true },
            { label: 'אימות הכרטיס', icon: CheckCircle, active: false },
            { label: 'שוחרר למוכר', icon: DollarSign, active: false },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 sm:flex-col sm:text-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                step.active ? 'bg-emerald-50 text-[var(--accent-text)]' : 'bg-[var(--input-bg)] text-[var(--muted)]'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className={`text-sm ${step.active ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>{step.label}</span>
              {i < 3 && <div className="hidden h-px flex-1 bg-[var(--input-bg)] sm:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Active Listings */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">מודעות פעילות</h2>
        {activeListings.length > 0 ? (
          <div className="space-y-3">
            {activeListings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
                <div>
                  <p className="font-medium text-[var(--foreground)]">{listing.event?.title}</p>
                  <p className="text-sm text-[var(--muted)]">{listing.quantity} כרטיסים · ₪{listing.asking_price} לכרטיס</p>
                </div>
                <StatusBadge status={listing.status} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={Tag} title="אין מודעות פעילות" description="פרסם כרטיס למכירה" action={{ label: 'פרסם כרטיס', href: '/sell' }} />
        )}
      </div>

      {/* Pending Review */}
      {pendingListings.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">ממתין לאישור</h2>
          <div className="space-y-3">
            {pendingListings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div>
                  <p className="font-medium text-[var(--foreground)]">{listing.event?.title}</p>
                  <p className="text-sm text-[var(--muted)]">{listing.quantity} כרטיסים · ₪{listing.asking_price} לכרטיס</p>
                </div>
                <StatusBadge status="pending_review" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rejected Listings */}
      {rejectedListings.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">נדחו</h2>
          <div className="space-y-3">
            {rejectedListings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4">
                <div>
                  <p className="font-medium text-[var(--foreground)]">{listing.event?.title}</p>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-600">כרטיס מסומן כחשוד</p>
                  </div>
                </div>
                <StatusBadge status="rejected" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payouts */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">תשלומים</h2>
        {payouts.length > 0 ? (
          <div className="space-y-3">
            {payouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
                <div>
                  <p className="font-medium text-[var(--foreground)]">₪{payout.amount}</p>
                  <p className="text-sm text-[var(--muted)]">הזמנה #{payout.order_id.slice(-4)}</p>
                </div>
                <StatusBadge status={payout.status} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={DollarSign} title="אין תשלומים עדיין" description="תשלומים יופיעו כאן לאחר מכירה" />
        )}
      </div>
    </div>
  );
}
