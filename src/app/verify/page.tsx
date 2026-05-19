'use client';

import { useState } from 'react';
import { Upload, ShieldCheck, Clock, Check } from 'lucide-react';
import VerificationBanner from '@/components/ui/VerificationBanner';

export default function VerifyPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">אימות זהות</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">אמתו את הזהות שלכם כדי להגביר אמון ולמכור כרטיסים</p>
      </div>

      <div className="mb-8">
        <VerificationBanner status="unverified" />
      </div>

      {submitted ? (
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <Check className="h-8 w-8 text-[var(--accent-text)]" />
          </div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">המסמכים נשלחו לבדיקה</h2>
          <p className="mt-3 text-[var(--muted)]">נבדוק את המסמכים ונחזור אליכם תוך 24 שעות</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-amber-700">
            <Clock className="h-4 w-4" />
            <span>סטטוס: ממתין לאישור</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">פרטים אישיים</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm text-[var(--muted)]">שם מלא (כפי שמופיע בתעודה)</label>
                <input type="text" required className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-[var(--muted)]">מספר תעודת זהות</label>
                <input type="text" required className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">העלאת מסמך</h2>
            <div>
              <label className="mb-2 block text-sm text-[var(--muted)]">סוג מסמך</label>
              <select className="mb-4 w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]">
                <option value="id">תעודת זהות</option>
                <option value="passport">דרכון</option>
                <option value="license">רישיון נהיגה</option>
              </select>
            </div>
            <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-[var(--input-border)] bg-[var(--input-bg)] p-8 transition hover:border-[var(--muted)]">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-[var(--muted)]" />
                <p className="mt-2 text-sm text-[var(--muted)]">גרור קובץ או לחץ לבחירה</p>
                <p className="mt-1 text-xs text-[var(--muted)]">PNG, JPG, PDF עד 10MB</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[var(--accent-text)]" />
            <p className="text-sm text-[var(--accent-text)]">המסמכים שלכם מאובטחים ומשמשים לאימות בלבד. לא נשתף את המידע.</p>
          </div>

          <button type="submit" className="w-full rounded-xl bg-[var(--accent)] py-3.5 font-semibold text-white transition hover:opacity-90">
            שלח לאימות
          </button>
        </form>
      )}
    </div>
  );
}
