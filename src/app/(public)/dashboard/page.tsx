'use client';

import Link from 'next/link';
import { ShoppingBag, Tag, ShieldCheck, AlertTriangle, Settings } from 'lucide-react';
import VerificationBanner from '@/components/ui/VerificationBanner';
import DashboardCard from '@/components/ui/DashboardCard';
import { mockProfiles, mockOrders, mockListings } from '@/data/mock';

export default function DashboardPage() {
  const user = mockProfiles[0];
  const myOrders = mockOrders.filter((o) => o.buyer_id === user.id);
  const myListings = mockListings.filter((l) => l.seller_id === user.id);
  const activeListings = myListings.filter((l) => l.status === 'active');

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">שלום, {user.full_name}</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">ניהול החשבון והפעילות שלך</p>
        </div>
        <Link href="/verify" className="rounded-lg bg-[var(--input-bg)] p-2 text-[var(--muted)] transition hover:text-[var(--foreground)]">
          <Settings className="h-5 w-5" />
        </Link>
      </div>

      <div className="mb-8">
        <VerificationBanner status={user.verification_status} />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="הזמנות שלי" value={myOrders.length} icon={ShoppingBag} color="blue" />
        <DashboardCard title="מודעות פעילות" value={activeListings.length} icon={Tag} color="emerald" />
        <DashboardCard title="סטטוס אימות" value={user.verification_status === 'verified' ? 'מאומת' : 'ממתין'} icon={ShieldCheck} color={user.verification_status === 'verified' ? 'emerald' : 'yellow'} />
        <DashboardCard title="סכסוכים פתוחים" value={0} icon={AlertTriangle} color="red" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link
          href="/dashboard/buyer"
          className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 transition hover:border-[var(--input-border)]"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-text)]">לוח הקונה</h3>
              <p className="text-sm text-[var(--muted)]">ההזמנות והרכישות שלך</p>
            </div>
          </div>
        </Link>
        <Link
          href="/dashboard/seller"
          className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 transition hover:border-[var(--input-border)]"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[var(--accent-soft)] p-3">
              <Tag className="h-6 w-6 text-[var(--accent-text)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-text)]">לוח המוכר</h3>
              <p className="text-sm text-[var(--muted)]">המודעות והתשלומים שלך</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
