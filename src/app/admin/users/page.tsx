'use client';

import AdminTable from '@/components/ui/AdminTable';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockProfiles } from '@/data/mock';
import type { Column } from '@/components/ui/AdminTable';
import type { Profile } from '@/types/database';

const userColumns: Column<Profile>[] = [
  { key: 'name', header: 'שם', sortable: true, sortValue: (p) => p.full_name, render: (p) => <span className="font-medium text-[var(--foreground)]">{p.full_name}</span> },
  { key: 'email', header: 'אימייל', sortable: true, sortValue: (p) => p.email, render: (p) => p.email },
  { key: 'role', header: 'תפקיד', sortable: true, sortValue: (p) => p.role, render: (p) => <StatusBadge status={p.role === 'admin' ? 'verified' : p.role === 'seller' ? 'active' : 'pending'} customLabel={p.role === 'admin' ? 'מנהל' : p.role === 'seller' ? 'מוכר' : 'קונה'} /> },
  { key: 'verification', header: 'אימות', sortable: true, sortValue: (p) => p.verification_status, render: (p) => <StatusBadge status={p.verification_status} /> },
  { key: 'date', header: 'תאריך הצטרפות', sortable: true, sortValue: (p) => p.created_at, render: (p) => new Date(p.created_at).toLocaleDateString('he-IL') },
];

export default function AdminUsersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">משתמשים</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">ניהול משתמשי הפלטפורמה</p>
      </div>
      <AdminTable columns={userColumns} data={mockProfiles} />
    </div>
  );
}
