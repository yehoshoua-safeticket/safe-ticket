'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import AdminTable from '@/components/ui/AdminTable';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockListings } from '@/data/mock';
import type { Column } from '@/components/ui/AdminTable';
import type { Listing } from '@/types/database';

const listingColumns: Column<Listing>[] = [
  { key: 'event', header: 'אירוע', sortable: true, sortValue: (l) => l.event?.title || '', render: (l) => <span className="font-medium text-[var(--foreground)]">{l.event?.title || '-'}</span> },
  { key: 'seller', header: 'מוכר', sortable: true, sortValue: (l) => l.seller?.full_name || '', render: (l) => l.seller?.full_name || '-' },
  { key: 'price', header: 'מחיר', sortable: true, sortValue: (l) => l.asking_price, render: (l) => `₪${l.asking_price}` },
  { key: 'status', header: 'סטטוס', sortable: true, sortValue: (l) => l.status, render: (l) => <StatusBadge status={l.status} /> },
  { key: 'risk', header: 'סיכון', sortable: true, sortValue: (l) => l.risk_status, render: (l) => <StatusBadge status={l.risk_status} /> },
  {
    key: 'actions', header: 'פעולות', render: (l) => (
      l.status === 'pending_review' ? (
        <div className="flex gap-2">
          <button className="rounded-lg bg-emerald-50 p-1.5 text-[var(--accent-text)] hover:bg-emerald-100"><CheckCircle className="h-4 w-4" /></button>
          <button className="rounded-lg bg-red-50 p-1.5 text-red-600 hover:bg-red-100"><XCircle className="h-4 w-4" /></button>
        </div>
      ) : <span className="text-[var(--muted)]">-</span>
    ),
  },
];

export default function AdminListingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">מודעות</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">ניהול מודעות כרטיסים</p>
      </div>
      <AdminTable columns={listingColumns} data={mockListings} />
    </div>
  );
}
