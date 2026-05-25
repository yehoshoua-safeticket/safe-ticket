'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Check } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Shield className="mx-auto mb-4 h-8 w-8 text-[var(--accent)]" strokeWidth={1.8} />
          <h1 className="text-2xl font-bold">איפוס סיסמה</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">הכנסו את האימייל שלכם ונשלח קישור לאיפוס</p>
        </div>

        {submitted ? (
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
              <Check className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-lg font-semibold">הקישור נשלח!</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">אם קיים חשבון עם האימייל {email}, תקבלו קישור לאיפוס.</p>
            <Link href="/auth/login" className="mt-6 inline-block text-sm text-[var(--accent-text)] hover:underline">חזרה להתחברות</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-8">
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">אימייל</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
            </div>
            <button type="submit" className="mt-6 w-full rounded-lg bg-[var(--accent)] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
              שלח קישור איפוס
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          <Link href="/auth/login" className="text-[var(--accent-text)] hover:underline">חזרה להתחברות</Link>
        </p>
      </div>
    </div>
  );
}
