'use client';

import { MessageCircle } from 'lucide-react';

const mockSupportMessages = [
  { id: 's-1', from: 'rachel@example.com', subject: 'לא קיבלתי את הכרטיס', date: '2026-05-17T10:00:00Z', status: 'open' as const },
  { id: 's-2', from: 'yossi@example.com', subject: 'איך מעדכנים מחיר?', date: '2026-05-16T14:00:00Z', status: 'replied' as const },
  { id: 's-3', from: 'david@example.com', subject: 'רוצה לבטל מודעה', date: '2026-05-15T09:00:00Z', status: 'open' as const },
];

export default function AdminSupportPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">תמיכה</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">הודעות תמיכה מלקוחות</p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
          {mockSupportMessages.filter((m) => m.status === 'open').length} ממתינות
        </span>
      </div>

      <div className="space-y-3">
        {mockSupportMessages.map((msg) => (
          <div key={msg.id} className="flex items-center justify-between rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
            <div className="flex items-start gap-3">
              <MessageCircle className={`mt-0.5 h-5 w-5 ${msg.status === 'open' ? 'text-amber-500' : 'text-[var(--muted)]'}`} />
              <div>
                <p className="font-medium text-[var(--foreground)]">{msg.subject}</p>
                <p className="text-sm text-[var(--muted)]">{msg.from} · {new Date(msg.date).toLocaleDateString('he-IL')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                msg.status === 'open' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {msg.status === 'open' ? 'ממתין' : 'נענה'}
              </span>
              <button className="rounded-lg border border-[var(--input-border)] px-3 py-1.5 text-xs text-[var(--muted)] transition hover:bg-[var(--input-bg)]">
                השב במייל
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-[var(--muted)]">
        כרגע, התשובות נשלחות ישירות מהמייל שלכם. בעתיד, ניתן יהיה להשיב מתוך הפאנל.
      </p>
    </div>
  );
}
