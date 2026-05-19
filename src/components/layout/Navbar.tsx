'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Shield, User, LogOut, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { logout } from '@/app/auth/actions';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const navLinks = [
  { href: '/tickets', label: 'כרטיסים' },
  { href: '/how-it-works', label: 'איך זה עובד' },
  { href: '/sell', label: 'למכור כרטיס' },
  { href: '/faq', label: 'שאלות נפוצות' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--card)]/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Shield className="h-6 w-6 text-[var(--accent)]" strokeWidth={1.8} />
            <span className="text-lg font-bold tracking-tight">SafeTicket</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-[0.9rem] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-[var(--muted)]" />
            ) : user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-lg border border-[var(--card-border)] px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">{displayName}</span>
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    className="rounded-lg p-2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    title="התנתקות"
                  >
                    <LogOut className="h-[18px] w-[18px]" />
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="rounded-lg px-4 py-2 text-[0.9rem] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  התחברות
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-lg bg-[var(--accent)] px-5 py-2 text-[0.9rem] font-medium text-white transition-opacity hover:opacity-90"
                >
                  הרשמה
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="rounded-lg p-2 text-[var(--muted)] md:hidden">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[var(--card-border)] bg-[var(--card)] md:hidden">
          <div className="space-y-1 px-5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-3 text-[0.9rem] text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-[var(--card-border)] pt-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--card-border)] py-2.5 text-sm">
                    <User className="h-4 w-4" />{displayName}
                  </Link>
                  <form action={logout}>
                    <button type="submit" className="rounded-lg border border-[var(--card-border)] p-2.5 text-[var(--muted)]">
                      <LogOut className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link href="/auth/login" onClick={() => setIsOpen(false)} className="flex-1 rounded-lg border border-[var(--card-border)] py-2.5 text-center text-sm">
                    התחברות
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)} className="flex-1 rounded-lg bg-[var(--accent)] py-2.5 text-center text-sm font-medium text-white">
                    הרשמה
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
