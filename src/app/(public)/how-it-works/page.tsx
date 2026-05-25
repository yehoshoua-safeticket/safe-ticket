'use client';

import Link from 'next/link';
import { Search, CreditCard, Zap, Upload, ShieldCheck, DollarSign, CheckCircle } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn>
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-[var(--foreground)]">איך SafeTicket עובד?</h1>
          <p className="text-lg text-[var(--muted)]">תהליך פשוט, בטוח ומהיר - לקונים ולמוכרים</p>
        </div>
      </FadeIn>

      <div className="mb-20">
        <FadeIn><h2 className="mb-8 text-center text-2xl font-bold text-[var(--foreground)]">לקונים</h2></FadeIn>
        <div className="space-y-8">
          {[
            { step: 1, icon: Search, title: 'מצאו כרטיסים', desc: 'חפשו לפי אירוע, אמן, עיר או תאריך. כל הכרטיסים במחירים הוגנים - ללא ספסרות. עמלת שירות של 10% על מחיר הכרטיס.' },
            { step: 2, icon: CreditCard, title: 'שלמו בביטחון', desc: 'אתם משלמים ל-SafeTicket, לא למוכר. הכסף מוחזק בנאמנות עד אחרי האירוע. תשלום מאובטח בכרטיס אשראי.' },
            { step: 3, icon: Zap, title: 'קבלו את הכרטיס מיד', desc: 'מיד אחרי התשלום, הכרטיס נשלח אליכם במייל ובהודעת SMS עם קישור קבוע. הכרטיס לא עבד? החזר מלא.' },
          ].map((item) => (
            <FadeIn key={item.step} delay={item.step * 0.1}>
              <div className="flex gap-6">
                <div className="flex shrink-0 flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-bold text-white shadow-lg shadow-[var(--accent)]/25">
                    {item.step}
                  </div>
                  {item.step < 3 && <div className="mt-2 h-full w-px bg-[var(--input-bg)]" />}
                </div>
                <div className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/5">
                  <div className="mb-3 flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-[var(--accent-text)]" />
                    <h3 className="text-lg font-bold text-[var(--foreground)]">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <FadeIn><h2 className="mb-8 text-center text-2xl font-bold text-[var(--foreground)]">למוכרים</h2></FadeIn>
        <div className="space-y-8">
          {[
            { step: 1, icon: Upload, title: 'פרסמו כרטיס', desc: 'בחרו אירוע מהרשימה, העלו את הכרטיס וקבעו מחיר. הפרסום חינם. הצוות שלנו בודק שהמחיר הוגן (עד מחיר הקנייה).' },
            { step: 2, icon: ShieldCheck, title: 'אישור ומכירה', desc: 'הצוות שלנו מאשר את המודעה. קונה רוכש? מקבלים התראה במייל. הכסף מוחזק בנאמנות עד אחרי האירוע.' },
            { step: 3, icon: DollarSign, title: 'קבלו תשלום', desc: 'אחרי האירוע, הכסף משוחרר לחשבון הבנק שלכם תוך 3-5 ימי עסקים. עמלה של 10%.' },
          ].map((item) => (
            <FadeIn key={item.step} delay={item.step * 0.1}>
              <div className="flex gap-6">
                <div className="flex shrink-0 flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-bold text-white shadow-lg shadow-[var(--accent)]/25">
                    {item.step}
                  </div>
                  {item.step < 3 && <div className="mt-2 h-full w-px bg-[var(--input-bg)]" />}
                </div>
                <div className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/5">
                  <div className="mb-3 flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-[var(--accent-text)]" />
                    <h3 className="text-lg font-bold text-[var(--foreground)]">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <FadeIn>
        <div className="relative overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-8 text-center sm:p-12">
          <div className="noise-overlay pointer-events-none absolute inset-0" />
          <div className="relative">
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-[var(--accent-text)]" />
            <h2 className="mb-3 text-2xl font-bold text-[var(--foreground)]">מוכנים להתחיל?</h2>
            <p className="mb-8 text-[var(--muted)]">הצטרפו לאלפי משתמשים שכבר סומכים על SafeTicket</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/tickets" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-3.5 font-bold text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:shadow-xl hover:brightness-110">
                <Search className="h-5 w-5" />חפשו כרטיסים
              </Link>
              <Link href="/sell" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--input-border)] px-8 py-3.5 font-bold text-[var(--foreground)] transition hover:bg-[var(--input-bg)]">
                <Upload className="h-5 w-5" />מכרו כרטיסים
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
