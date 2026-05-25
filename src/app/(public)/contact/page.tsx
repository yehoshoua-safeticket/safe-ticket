'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <Check className="h-8 w-8 text-[var(--accent-text)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">ההודעה נשלחה!</h1>
        <p className="mt-3 text-[var(--muted)]">נחזור אליכם בהקדם האפשרי, בדרך כלל תוך 24 שעות.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold text-[var(--foreground)]">צור קשר</h1>
        <p className="text-lg text-[var(--muted)]">יש שאלה? נשמח לעזור!</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <form onSubmit={handleSubmit} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-8">
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm text-[var(--muted)]">שם מלא</label>
                  <input type="text" required placeholder="ישראל ישראלי" className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-[var(--muted)]">אימייל</label>
                  <input type="email" required placeholder="your@email.com" className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-[var(--muted)]">נושא</label>
                <select className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]">
                  <option value="">בחר נושא</option>
                  <option value="general">שאלה כללית</option>
                  <option value="buying">בעיה ברכישה</option>
                  <option value="selling">בעיה במכירה</option>
                  <option value="payment">תשלומים</option>
                  <option value="dispute">סכסוך</option>
                  <option value="other">אחר</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-[var(--muted)]">הודעה</label>
                <textarea required rows={5} placeholder="ספרו לנו איך אנחנו יכולים לעזור..." className="w-full resize-none rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
              </div>
            </div>
            <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-3.5 font-semibold text-white transition hover:opacity-90">
              <Send className="h-5 w-5" />שלח הודעה
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="mb-4 font-semibold text-[var(--foreground)]">פרטי התקשרות</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[var(--accent-text)]" />
                <span className="text-sm text-[var(--muted)]">support@safeticket.co.il</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[var(--accent-text)]" />
                <span className="text-sm text-[var(--muted)]">03-1234567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[var(--accent-text)]" />
                <span className="text-sm text-[var(--muted)]">תל אביב, ישראל</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="mb-2 font-semibold text-[var(--foreground)]">שעות פעילות</h3>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <p>ראשון - חמישי: 9:00 - 18:00</p>
              <p>שישי: 9:00 - 13:00</p>
              <p>שבת: סגור</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
