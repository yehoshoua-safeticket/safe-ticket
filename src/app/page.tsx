'use client';

import Link from 'next/link';
import { Shield, Lock, Search, ChevronDown, ChevronUp, CircleDollarSign, CheckCircle, RotateCcw, Calendar, MapPin, Ticket, Music, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { getEventsWithActiveListings } from '@/data/mock';
import FadeIn from '@/components/ui/FadeIn';
import EventCover from '@/components/ui/EventCover';
import type { EventCategory } from '@/types/database';

export default function Home() {
  const events = getEventsWithActiveListings();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'מה קורה אם הכרטיסים מזויפים?', a: 'תקבלו החזר כספי מלא. הכסף מוחזק בנאמנות עד אחרי האירוע. אם הכרטיס לא עבד — החזר מלא, ללא שאלות.' },
    { q: 'למה לא פשוט לקנות בפייסבוק?', a: 'בקבוצות פייסבוק אין שום הגנה. משלמים בהעברה ומקווים לטוב. כאן הכסף שלכם מוגן עד אחרי האירוע.' },
    { q: 'כמה זה עולה?', a: 'לקונים — עמלת שירות של 10% על מחיר הכרטיס. למוכרים — עמלה של 10% רק על מכירה שהצליחה. אין תשלום על פרסום מודעה.' },
  ];

  const stats = [
    { value: '100%', label: 'החזר כספי' },
    { value: '24h', label: 'בדיקת כרטיסים' },
    { value: '₪0', label: 'פרסום מודעה' },
  ];

  return (
    <div className="flex flex-col">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden px-5 pb-24 pt-20 sm:px-8 sm:pt-32">
        {/* Animated gradient mesh background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="hero-gradient-orb" style={{ width: 500, height: 500, top: '-15%', right: '-10%', background: 'rgba(26, 122, 92, 0.06)' }} />
          <div className="hero-gradient-orb" style={{ width: 400, height: 400, bottom: '-10%', left: '-5%', background: 'rgba(249, 115, 22, 0.04)', animationDelay: '4s' }} />
          <div className="hero-gradient-orb" style={{ width: 300, height: 300, top: '40%', left: '50%', background: 'rgba(26, 122, 92, 0.03)', animationDelay: '8s' }} />
        </div>

        {/* Dot grid pattern */}
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative mx-auto max-w-3xl text-center">
          <FadeIn delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-4 py-2 text-sm shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]"></span>
              </span>
              <span className="text-[var(--muted)]">{events.length} אירועים עם כרטיסים זמינים</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-[2.25rem] font-bold leading-[1.2] tracking-tight sm:text-[3.25rem]">
              קנו ומכרו כרטיסים —<br />
              <span className="text-[var(--accent-text)]">בלי לחשוש מהונאות</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[var(--muted)]">
              אתם קונים מ-SafeTicket, לא מזרים. הכסף מוחזק בנאמנות עד אחרי האירוע.
              הכרטיס לא עבד? החזר מלא.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/tickets"
                className="group inline-flex items-center gap-2.5 rounded-lg bg-[var(--accent)] px-7 py-3.5 text-[0.95rem] font-medium text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:shadow-xl hover:shadow-[var(--accent)]/30 hover:brightness-110"
              >
                <Search className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
                חפשו כרטיסים
              </Link>
              <Link
                href="/sell"
                className="inline-flex items-center gap-2.5 rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-7 py-3.5 text-[0.95rem] font-medium shadow-sm transition-all hover:border-[var(--muted)] hover:shadow-md"
              >
                מכרו כרטיס
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="mx-auto mt-14 flex max-w-sm justify-center gap-8 sm:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-[var(--accent-text)]">{stat.value}</div>
                  <div className="mt-0.5 text-xs text-[var(--muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Floating decorative tickets */}
        <div className="pointer-events-none absolute end-[8%] top-[18%] hidden lg:block">
          <div className="animate-float opacity-[0.07]">
            <Ticket className="h-20 w-20 -rotate-12 text-[var(--accent)]" strokeWidth={1} />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-[15%] start-[5%] hidden lg:block">
          <div className="animate-float-delayed opacity-[0.05]">
            <Music className="h-16 w-16 rotate-12 text-[var(--foreground)]" strokeWidth={1} />
          </div>
        </div>
      </section>

      {/* ─── How the money is protected ─── */}
      <section className="relative border-y border-[var(--card-border)] bg-[var(--card)] px-5 py-20 sm:px-8">
        <div className="noise-overlay pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="mb-3 text-center text-2xl font-bold">איך הכסף שלכם מוגן?</h2>
            <p className="mb-12 text-center text-[var(--muted)]">תהליך הנאמנות (escrow) שלנו בשלושה שלבים</p>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { num: '1', icon: CircleDollarSign, title: 'אתם משלמים', desc: 'הכסף לא מועבר למוכר. הוא נשמר בנאמנות עד אחרי האירוע.' },
              { num: '2', icon: Ticket, title: 'מקבלים את הכרטיס מיד', desc: 'מיד אחרי התשלום, הכרטיס נשלח אליכם במייל ובהודעת SMS עם קישור קבוע.' },
              { num: '3', icon: Shield, title: 'הגנה מלאה', desc: 'הכרטיס לא עבד באירוע? תקבלו החזר מלא. הכסף משוחרר למוכר רק אחרי האירוע.' },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div className="group relative rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
                  <div className="absolute -top-3 start-5 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white shadow-md shadow-[var(--accent)]/30">
                    {step.num}
                  </div>
                  <div className="mb-4 mt-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-soft)] transition-transform duration-300 group-hover:scale-110">
                    <step.icon className="h-5 w-5 text-[var(--accent-text)]" />
                  </div>
                  <h3 className="mb-2 text-[1.05rem] font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust signals ─── */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-border)] shadow-sm sm:grid-cols-3">
              {[
                { icon: CheckCircle, title: 'כרטיסים מאומתים', desc: 'כל כרטיס נבדק על ידי הצוות שלנו לפני פרסום' },
                { icon: RotateCcw, title: 'החזר כספי מובטח', desc: 'כרטיס לא עבד? אירוע בוטל? החזר מלא — ללא שאלות' },
                { icon: Lock, title: 'מחירים הוגנים בלבד', desc: 'לא ניתן למכור מעל המחיר המקורי. אפס ספסרות' },
              ].map((item) => (
                <div key={item.title} className="group relative bg-[var(--card)] p-8 transition-colors hover:bg-[var(--accent-soft)]">
                  <item.icon className="mb-4 h-5 w-5 text-[var(--accent-text)] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.8} />
                  <h3 className="mb-2 text-[0.95rem] font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Available Events ─── */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold">אירועים עם כרטיסים זמינים</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">מצאו כרטיסים לאירועים הקרובים</p>
              </div>
              <Link href="/tickets" className="hidden items-center gap-1.5 text-sm font-medium text-[var(--accent-text)] hover:underline sm:inline-flex">
                כל האירועים<ArrowLeft className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 6).map((event, i) => (
              <FadeIn key={event.id} delay={i * 0.08}>
                <Link
                  href={`/tickets/${event.id}`}
                  className="group block overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/8"
                >
                  <EventCover
                    category={event.category as EventCategory}
                    title={event.title}
                    size="sm"
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="p-5">
                    <div className="mb-2 inline-block rounded-full bg-[var(--accent-soft)] px-3 py-0.5 text-xs font-medium text-[var(--accent-text)]">
                      {event.category === 'concert' ? 'הופעה' : event.category === 'sports' ? 'ספורט' : event.category === 'theater' ? 'תיאטרון' : event.category === 'festival' ? 'פסטיבל' : 'אחר'}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-text)]">{event.title}</h3>
                    <div className="space-y-1 text-sm text-[var(--muted)]">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{event.venue}, {event.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(event.event_date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-[var(--card-border)] pt-3">
                      <span className="text-sm text-[var(--muted)]">{event.listingCount} כרטיסים</span>
                      <span className="font-semibold text-[var(--accent-text)]">החל מ-₪{event.lowestPrice}</span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/tickets" className="text-sm font-medium text-[var(--accent-text)]">כל האירועים ←</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Social proof / why SafeTicket ─── */}
      <section className="relative overflow-hidden border-y border-[var(--card-border)] bg-[var(--card)] px-5 py-20 sm:px-8">
        <div className="noise-overlay pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="mb-3 text-2xl font-bold">למה SafeTicket?</h2>
            <p className="mb-10 text-[var(--muted)]">כי קנייה בפייסבוק היא הימור. כאן — הכסף שלכם מוגן.</p>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            <FadeIn delay={0.05}>
              <div className="relative rounded-xl border border-red-200 bg-red-50/60 p-6 text-start">
                <div className="mb-3 text-sm font-bold text-red-700">❌ קנייה בפייסבוק</div>
                <ul className="space-y-2 text-sm text-red-800/70">
                  <li>• משלמים בהעברה לזר</li>
                  <li>• אין ערבות שהכרטיס אמיתי</li>
                  <li>• המוכר נעלם? אין מה לעשות</li>
                  <li>• מחירים מנופחים ללא פיקוח</li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative rounded-xl border border-emerald-200 bg-emerald-50/60 p-6 text-start">
                <div className="mb-3 text-sm font-bold text-[var(--accent-text)]">✓ קנייה ב-SafeTicket</div>
                <ul className="space-y-2 text-sm text-emerald-800/70">
                  <li>• משלמים ל-SafeTicket, לא למוכר</li>
                  <li>• כל כרטיס נבדק לפני פרסום</li>
                  <li>• כרטיס לא עבד? החזר מלא</li>
                  <li>• מחירים הוגנים — ללא ספסרות</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <FadeIn>
            <h2 className="mb-10 text-center text-2xl font-bold">שאלות נפוצות</h2>
          </FadeIn>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] transition-shadow hover:shadow-sm">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-start">
                    <span className="text-[0.95rem] font-medium">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="h-4 w-4 text-[var(--muted)]" /> : <ChevronDown className="h-4 w-4 text-[var(--muted)]" />}
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: openFaq === i ? '200px' : '0px',
                      opacity: openFaq === i ? 1 : 0,
                    }}
                  >
                    <div className="border-t border-[var(--card-border)] px-6 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-[var(--muted)]">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div className="mt-6 text-center">
              <Link href="/faq" className="text-sm text-[var(--muted)] hover:text-[var(--accent-text)]">עוד שאלות נפוצות ←</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden border-t border-[var(--card-border)] px-5 py-20 sm:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="hero-gradient-orb" style={{ width: 400, height: 400, top: '-20%', left: '20%', background: 'rgba(26, 122, 92, 0.05)' }} />
          <div className="hero-gradient-orb" style={{ width: 300, height: 300, bottom: '-20%', right: '20%', background: 'rgba(26, 122, 92, 0.04)', animationDelay: '6s' }} />
        </div>
        <FadeIn>
          <div className="relative mx-auto max-w-lg text-center">
            <div className="relative mx-auto mb-5 inline-flex">
              <Shield className="h-8 w-8 text-[var(--accent-text)]" strokeWidth={1.5} />
              <span className="pulse-ring absolute inset-0 rounded-full"></span>
            </div>
            <h2 className="mb-3 text-2xl font-bold">מוכנים לקנות או למכור בביטחון?</h2>
            <p className="mb-8 text-[var(--muted)]">הרשמה חינמית. הכסף שלכם תמיד מוגן.</p>
            <Link href="/auth/signup" className="group inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-8 py-3.5 font-medium text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:shadow-xl hover:shadow-[var(--accent)]/30 hover:brightness-110">
              צרו חשבון חינם
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
