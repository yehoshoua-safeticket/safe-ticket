'use client';

import Link from 'next/link';
import { ShoppingBag, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import DashboardCard from '@/components/ui/DashboardCard';
import StatusBadge from '@/components/ui/StatusBadge';
import EmptyState from '@/components/ui/EmptyState';
import { mockOrders, mockProfiles, mockDisputes } from '@/data/mock';

export default function BuyerDashboardPage() {
  const buyer = mockProfiles[1];
  const orders = mockOrders.filter((o) => o.buyer_id === buyer.id);
  const disputes = mockDisputes.filter((d) => d.opened_by === buyer.id);

  const pendingOrders = orders.filter((o) => o.order_status === 'pending' || o.order_status === 'confirmed');
  const completedOrders = orders.filter((o) => o.order_status === 'completed');
  const openDisputes = disputes.filter((d) => d.status === 'open' || d.status === 'under_review');

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">ההזמנות שלי</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">עקוב אחרי הרכישות שלך</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="סה״כ הזמנות" value={orders.length} icon={ShoppingBag} color="blue" />
        <DashboardCard title="בהמתנה" value={pendingOrders.length} icon={Clock} color="yellow" />
        <DashboardCard title="הושלמו" value={completedOrders.length} icon={CheckCircle} color="emerald" />
        <DashboardCard title="סכסוכים" value={openDisputes.length} icon={AlertTriangle} color="red" />
      </div>

      {/* Orders List */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">הזמנות אחרונות</h2>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{order.listing?.event?.title || 'אירוע'}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      הזמנה #{order.id.slice(-4)} · {new Date(order.created_at).toLocaleDateString('he-IL')}
                    </p>
                  </div>
                  <StatusBadge status={order.order_status} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-[var(--card-border)] pt-4 text-sm">
                  <div>
                    <p className="text-[var(--muted)]">סכום</p>
                    <p className="font-medium text-[var(--foreground)]">₪{order.total_amount}</p>
                  </div>
                  <div>
                    <p className="text-[var(--muted)]">תשלום</p>
                    <StatusBadge status={order.payment_status} />
                  </div>
                  <div>
                    <p className="text-[var(--muted)]">תשלום למוכר</p>
                    <StatusBadge status={order.payout_status} />
                  </div>
                </div>
                {order.order_status !== 'completed' && order.order_status !== 'cancelled' && (
                  <div className="mt-4 flex gap-3">
                    <Link
                      href="/support"
                      className="rounded-lg border border-[var(--input-border)] px-4 py-2 text-sm text-[var(--muted)] transition hover:bg-[var(--input-bg)] hover:text-[var(--foreground)]"
                    >
                      פתח סכסוך
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={ShoppingBag}
            title="אין הזמנות עדיין"
            description="חפש כרטיסים ורכוש בביטחון"
            action={{ label: 'חפש כרטיסים', href: '/tickets' }}
          />
        )}
      </div>

      {/* Disputes */}
      {disputes.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">סכסוכים</h2>
          <div className="space-y-4">
            {disputes.map((dispute) => (
              <div key={dispute.id} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-[var(--foreground)]">סכסוך #{dispute.id.slice(-4)}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{dispute.reason}</p>
                  </div>
                  <StatusBadge status={dispute.status} />
                </div>
                {dispute.admin_resolution && (
                  <div className="mt-3 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] p-3">
                    <p className="text-xs text-[var(--muted)]">החלטה:</p>
                    <p className="mt-0.5 text-sm text-[var(--foreground)]">{dispute.admin_resolution}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
