'use client';

import { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, Check, ArrowRight, Download, Info, User, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { mockListings } from '@/data/mock';

export default function CheckoutPage() {
  const [step, setStep] = useState<'review' | 'payment' | 'success'>('review');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const listing = mockListings.find((l) => l.status === 'active')!;
  const event = listing.event!;

  const serviceFee = Math.round(listing.asking_price * listing.quantity * 0.10);
  const total = listing.asking_price * listing.quantity + serviceFee;

  if (step === 'success') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <Check className="h-10 w-10 text-[var(--accent-text)]" />
        </div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">הכרטיס נשלח אליכם!</h1>
        <p className="mt-4 text-[var(--muted)]">
          שלחנו את הכרטיס למייל ובהודעת SMS עם קישור קבוע. תוכלו להוריד אותו בכל עת.
        </p>
        <div className="mt-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">מספר הזמנה</span>
              <span className="font-mono text-[var(--foreground)]">#ORD-2026-0042</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">אירוע</span>
              <span className="text-[var(--foreground)]">{event.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">סטטוס</span>
              <span className="text-[var(--accent-text)]">כרטיס נשלח</span>
            </div>
          </div>
        </div>
        <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-3.5 font-semibold text-white transition hover:opacity-90">
          <Download className="h-5 w-5" />
          הורד כרטיס
        </button>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/tickets"
            className="rounded-xl border border-[var(--input-border)] px-6 py-3 text-[var(--foreground)] transition hover:bg-[var(--input-bg)]"
          >
            חזרה לאירועים
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <Link href="/tickets" className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          <ArrowRight className="h-4 w-4" />
          חזרה לאירועים
        </Link>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">השלמת רכישה</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">פרטי הכרטיס</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">אירוע</span>
                <span className="text-[var(--foreground)]">{event.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">מקום</span>
                <span className="text-[var(--foreground)]">{event.venue}, {event.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">תאריך</span>
                <span className="text-[var(--foreground)]">
                  {new Date(event.event_date).toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              {listing.seat_info && (
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">מושבים</span>
                  <span className="text-[var(--foreground)]">{listing.seat_info}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">כמות</span>
                <span className="text-[var(--foreground)]">{listing.quantity} כרטיסים</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">פרטי הקונה</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <User className="h-4 w-4" />שם מלא
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="ישראל ישראלי"
                  className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <Mail className="h-4 w-4" />אימייל
                </label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <Phone className="h-4 w-4" />טלפון
                </label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="050-1234567"
                  className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--muted)]">הכרטיס יישלח למייל ובהודעת SMS למספר הטלפון שהזנתם.</p>
          </div>

          {step === 'payment' && (
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
              <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">פרטי תשלום</h2>
              <p className="mb-4 text-sm text-[var(--muted)]">
                כאן יופיע טופס תשלום מאובטח (Stripe / PayPlus)
              </p>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm text-[var(--muted)]">מספר כרטיס</label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm text-[var(--muted)]">תוקף</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm text-[var(--muted)]">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted)]">
                <Lock className="h-3 w-3" />
                <span>חיבור מאובטח SSL - פרטי התשלום שלך מוצפנים</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[var(--accent-text)]" />
            <div className="text-sm text-[var(--accent-text)]">
              <p className="font-semibold">הגנת SafeTicket מלאה</p>
              <p className="mt-0.5 text-[var(--accent-text)]/80">
                הכסף מוחזק בנאמנות עד אחרי האירוע. הכרטיס לא עבד? תקבלו החזר מלא.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 px-1 text-xs text-[var(--muted)]">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <p>בהתאם לסעיף 14ג(ד) לחוק הגנת הצרכן, לא ניתן לבטל עסקה לרכישת כרטיס לאירוע במועד קבוע.</p>
          </div>
        </div>

        <div>
          <div className="sticky top-24 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="mb-4 text-lg font-semibold text-[var(--foreground)]">סיכום הזמנה</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">{listing.quantity}x כרטיס</span>
                <span className="text-[var(--foreground)]">₪{listing.asking_price * listing.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">עמלת שירות (10%)</span>
                <span className="text-[var(--foreground)]">₪{serviceFee}</span>
              </div>
              <div className="border-t border-[var(--card-border)] pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-[var(--foreground)]">סה&quot;כ</span>
                  <span className="text-xl font-bold text-[var(--foreground)]">₪{total}</span>
                </div>
              </div>
            </div>

            {step === 'review' ? (
              <button
                onClick={() => setStep('payment')}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-3.5 font-semibold text-white transition hover:opacity-90"
              >
                <CreditCard className="h-5 w-5" />
                המשך לתשלום
              </button>
            ) : (
              <button
                onClick={() => setStep('success')}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-3.5 font-semibold text-white transition hover:opacity-90"
              >
                <Lock className="h-5 w-5" />
                שלם ₪{total}
              </button>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--muted)]">
              <Lock className="h-3 w-3" />
              <span>תשלום מאובטח</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
