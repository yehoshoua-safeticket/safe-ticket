'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CalendarDays, Tag, AlertTriangle, MessageCircle, ClipboardList, Shield, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'סקירה כללית', icon: LayoutDashboard },
  { href: '/admin/events', label: 'אירועים', icon: CalendarDays },
  { href: '/admin/users', label: 'משתמשים', icon: Users },
  { href: '/admin/listings', label: 'מודעות', icon: Tag },
  { href: '/admin/disputes', label: 'סכסוכים', icon: AlertTriangle },
  { href: '/admin/support', label: 'תמיכה', icon: MessageCircle },
  { href: '/admin/tasks', label: 'משימות', icon: ClipboardList },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  const nav = (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active
                ? 'bg-emerald-50 text-[var(--accent-text)]'
                : 'text-[var(--muted)] hover:bg-[var(--input-bg)] hover:text-[var(--foreground)]'
            }`}
          >
            <item.icon className="h-[18px] w-[18px]" />
            {item.label}
            {active && <ChevronRight className="mr-auto h-4 w-4 opacity-50" />}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-l border-[var(--card-border)] bg-[var(--card)] lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2.5 border-b border-[var(--card-border)] px-5">
          <Shield className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.8} />
          <span className="text-sm font-bold tracking-tight">SafeTicket Admin</span>
        </div>
        <div className="flex-1 overflow-y-auto">{nav}</div>
        <div className="border-t border-[var(--card-border)] px-5 py-3">
          <Link href="/" className="text-xs text-[var(--muted)] transition hover:text-[var(--foreground)]">
            חזרה לאתר &larr;
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex h-14 items-center justify-between border-b border-[var(--card-border)] bg-[var(--card)] px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.8} />
          <span className="text-sm font-bold">Admin</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-[var(--muted)]">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-b border-[var(--card-border)] bg-[var(--card)] lg:hidden">
          {nav}
        </div>
      )}
    </>
  );
}
