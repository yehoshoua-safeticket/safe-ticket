'use client';

import { useState } from 'react';
import { ShieldCheck, AlertTriangle, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold text-[var(--foreground)]">תמיכה וסכסוכים</h1>
        <p className="text-lg text-[var(--muted)]">אנחנו כאן כדי לפתור כל בעיה</p>
      </div>

      <div className="mb-12 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-start gap-4">
          <ShieldCheck className="h-6 w-6 shrink-0 text-[var(--accent-text)]" />
          <div>
            <h3 className="font-semibold text-[var(--foreground)]">הגנת קונה מלאה</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              הכסף שלכם מוחזק בנאמנות עד שתאשרו קבלת הכרטיסים. אם משהו לא בסדר, תקבלו החזר מלא.
              הצוות שלנו זמין לפתור כל בעיה תוך 48 שעות.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-xl font-bold text-[var(--foreground)]">תהליך פתרון סכסוך</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { icon: FileText, label: 'פתיחת סכסוך', desc: 'תארו את הבעיה', color: 'text-blue-600 bg-blue-50' },
            { icon: Clock, label: 'בדיקה', desc: 'הצוות בודק (48 שעות)', color: 'text-amber-700 bg-amber-50' },
            { icon: CheckCircle, label: 'החלטה', desc: 'הודעה על התוצאה', color: 'text-[var(--accent-text)] bg-[var(--accent-soft)]' },
            { icon: ShieldCheck, label: 'ביצוע', desc: 'החזר או שחרור כסף', color: 'text-purple-600 bg-purple-50' },
          ].map((step, i) => (
            <div key={i} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-center">
              <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${step.color}`}>
                <step.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)]">{step.label}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {submitted ? (
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-12 text-center">
          <CheckCircle className="mx-auto mb-4 h-12 w-12 text-[var(--accent-text)]" />
          <h2 className="text-xl font-bold text-[var(--foreground)]">הסכסוך נפתח בהצלחה</h2>
          <p className="mt-3 text-[var(--muted)]">מספר סכסוך: #DSP-2026-0089</p>
          <p className="mt-1 text-sm text-[var(--muted)]">הצוות שלנו יבדוק ויחזור אליכם תוך 48 שעות</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-8">
          <h2 className="mb-6 text-lg font-semibold text-[var(--foreground)]">פתיחת סכסוך חדש</h2>
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">מספר הזמנה</label>
              <input type="text" required placeholder="#ORD-2026-XXXX" className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">סיבת הסכסוך</label>
              <select required className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]">
                <option value="">בחר סיבה</option>
                <option value="fake">כרטיס מזויף / לא תקין</option>
                <option value="wrong">כרטיס שונה ממה שפורסם</option>
                <option value="not_received">לא קיבלתי את הכרטיסים</option>
                <option value="cancelled">האירוע בוטל</option>
                <option value="other">אחר</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">תיאור הבעיה</label>
              <textarea required rows={4} placeholder="תארו בפירוט מה קרה..." className="w-full resize-none rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700" />
            <p className="text-xs text-amber-700">פתיחת סכסוך תקפיא את שחרור הכסף למוכר עד להחלטה.</p>
          </div>

          <button type="submit" className="mt-6 w-full rounded-xl bg-[var(--accent)] py-3.5 font-semibold text-white transition hover:opacity-90">
            פתח סכסוך
          </button>
        </form>
      )}
    </div>
  );
}
