'use client';

import AdminTable from '@/components/ui/AdminTable';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockDisputes } from '@/data/mock';
import type { Column } from '@/components/ui/AdminTable';
import type { Dispute } from '@/types/database';

const disputeColumns: Column<Dispute>[] = [
  { key: 'id', header: 'מזהה', sortable: true, sortValue: (d) => d.id, render: (d) => <span className="font-mono text-xs">#{d.id.slice(-4)}</span> },
  { key: 'reason', header: 'סיבה', sortable: true, sortValue: (d) => d.reason, render: (d) => <span className="max-w-[200px] truncate">{d.reason}</span> },
  { key: 'status', header: 'סטטוס', sortable: true, sortValue: (d) => d.status, render: (d) => <StatusBadge status={d.status} /> },
  { key: 'date', header: 'תאריך', sortable: true, sortValue: (d) => d.created_at, render: (d) => new Date(d.created_at).toLocaleDateString('he-IL') },
  { key: 'resolution', header: 'החלטה', render: (d) => d.admin_resolution ? <span className="text-xs text-[var(--muted)]">{d.admin_resolution.slice(0, 30)}...</span> : <span className="text-[var(--muted)]">ממתין</span> },
];

export default function AdminDisputesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">סכסוכים</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">ניהול סכסוכים ומחלוקות</p>
      </div>
      <AdminTable columns={disputeColumns} data={mockDisputes} />
    </div>
  );
}
