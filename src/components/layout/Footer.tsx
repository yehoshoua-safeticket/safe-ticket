'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--card-border)]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.8} />
              <span className="text-base font-bold">SafeTicket</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              כרטיסים יד שנייה, בלי לחשוש.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium">פלטפורמה</h4>
            <ul className="space-y-2.5">
              <li><Link href="/tickets" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">כרטיסים</Link></li>
              <li><Link href="/sell" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">למכור כרטיס</Link></li>
              <li><Link href="/how-it-works" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">איך זה עובד</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium">תמיכה</h4>
            <ul className="space-y-2.5">
              <li><Link href="/faq" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">שאלות נפוצות</Link></li>
              <li><Link href="/contact" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">צור קשר</Link></li>
              <li><Link href="/support" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">סכסוכים</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium">משפטי</h4>
            <ul className="space-y-2.5">
              <li><Link href="#" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">תנאי שימוש</Link></li>
              <li><Link href="#" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">פרטיות</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--card-border)] pt-6">
          <p className="text-center text-xs text-[var(--muted)]">© 2026 SafeTicket. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}
