'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, Tag, CreditCard, ArrowRight, Shield, Clock, ShieldCheck } from 'lucide-react';
import { getEventById, getListingsByEventId } from '@/data/mock';
import FadeIn from '@/components/ui/FadeIn';
import EventCover from '@/components/ui/EventCover';
import type { EventCategory } from '@/types/database';

export default function EventDetailPage() {
  const params = useParams();
  const event = getEventById(params.id as string);
  const listings = event ? getListingsByEventId(event.id) : [];

  if (!event) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">האירוע לא נמצא</h1>
        <p className="mt-2 text-[var(--muted)]">ייתכן שהאירוע הוסר או שאין כרטיסים זמינים</p>
        <Link href="/tickets" className="mt-6 inline-block rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white">חזרה לאירועים</Link>
      </div>
    );
  }

  const eventDate = new Date(event.event_date);
  const categoryLabel = event.category === 'concert' ? 'הופעה' : event.category === 'sports' ? 'ספורט' : event.category === 'theater' ? 'תיאטרון' : event.category === 'festival' ? 'פסטיבל' : 'אחר';

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
      <FadeIn>
        <Link href="/tickets" className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          <ArrowRight className="h-4 w-4" />חזרה לאירועים
        </Link>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mb-8 overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
          <EventCover
            category={event.category as EventCategory}
            title={event.title}
            size="lg"
          />
          <div className="p-6">
            <div className="mb-3 inline-block rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent-text)]">
              {categoryLabel}
            </div>
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-[var(--muted)]">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{eventDate.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {eventDate.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--muted)]">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{event.venue}, {event.city}</span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mb-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h2 className="mb-4 text-base font-semibold">למה הרכישה כאן בטוחה?</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: 'כרטיס מאומת', desc: 'כל כרטיס נבדק על ידי הצוות שלנו' },
              { icon: Shield, title: 'תשלום מוגן', desc: 'כסף בנאמנות עד אחרי האירוע' },
              { icon: Clock, title: 'החזר מלא', desc: 'הכרטיס לא עבד? החזר מובטח' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-4 w-4 text-[var(--accent-text)]" />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-[var(--muted)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h2 className="mb-4 text-lg font-semibold">{listings.length} כרטיסים זמינים</h2>
      </FadeIn>

      {listings.length > 0 ? (
        <div className="space-y-3">
          {listings.map((listing, i) => {
            const serviceFee = Math.round(listing.asking_price * listing.quantity * 0.10);
            const total = listing.asking_price * listing.quantity + serviceFee;
            const discount = listing.face_value > listing.asking_price
              ? Math.round(((listing.face_value - listing.asking_price) / listing.face_value) * 100)
              : 0;

            return (
              <FadeIn key={listing.id} delay={0.25 + i * 0.06}>
                <div className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition-all duration-200 hover:border-[var(--accent)]/30 hover:shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {listing.section && (
                          <div className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
                            <Tag className="h-3.5 w-3.5" />
                            <span>גזרה {listing.section}</span>
                          </div>
                        )}
                        {listing.row && (
                          <span className="text-sm text-[var(--muted)]">· שורה {listing.row}</span>
                        )}
                        {listing.seat_info && (
                          <span className="text-sm text-[var(--muted)]">· {listing.seat_info}</span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="text-xs text-[var(--muted)]">{listing.quantity} כרטיסים</span>
                        {discount > 0 && (
                          <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-medium text-[var(--accent-text)]">
                            -{discount}% מהמחיר המקורי
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="text-end">
                        <div className="text-xl font-bold">₪{listing.asking_price}</div>
                        <div className="text-xs text-[var(--muted)]">לכרטיס</div>
                        {listing.quantity > 1 && (
                          <div className="text-xs text-[var(--muted)]">סה&quot;כ ₪{total} (כולל עמלה)</div>
                        )}
                      </div>
                      <Link
                        href="/checkout"
                        className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[var(--accent)]/20 transition-all hover:shadow-lg hover:shadow-[var(--accent)]/30 hover:brightness-110"
                      >
                        <CreditCard className="h-4 w-4" />
                        קנו עכשיו
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      ) : (
        <FadeIn delay={0.25}>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-8 text-center">
            <p className="text-[var(--muted)]">אין כרטיסים זמינים כרגע לאירוע זה</p>
            <Link href="/tickets" className="mt-4 inline-block text-sm font-medium text-[var(--accent-text)]">חפשו אירועים אחרים</Link>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
