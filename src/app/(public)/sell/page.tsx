'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { Upload, ShieldCheck, Check, Search, ChevronDown, X, FileText, Shield, UserCheck, Lock, Eye, LogIn, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { mockEvents } from '@/data/mock';
import FadeIn from '@/components/ui/FadeIn';
import { createClient } from '@/lib/supabase';

export default function SellPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAuthenticated(!!user);
      setAuthLoading(false);
    });
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [eventSearch, setEventSearch] = useState('');
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
  const [askingPrice, setAskingPrice] = useState('');
  const [ticketFile, setTicketFile] = useState<File | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const ticketInputRef = useRef<HTMLInputElement>(null);
  const proofInputRef = useRef<HTMLInputElement>(null);

  const selectedEvent = useMemo(
    () => mockEvents.find((e) => e.id === selectedEventId),
    [selectedEventId]
  );

  const filteredEvents = useMemo(() => {
    if (!eventSearch) return mockEvents;
    const q = eventSearch.toLowerCase();
    return mockEvents.filter(
      (e) => e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q) || e.city.toLowerCase().includes(q)
    );
  }, [eventSearch]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedEventId) newErrors.event = 'בחרו אירוע';
    if (!ticketFile) newErrors.ticket = 'העלאת כרטיס היא חובה';
    if (!askingPrice || parseFloat(askingPrice) <= 0) newErrors.price = 'מחיר מבוקש חייב להיות חיובי';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  /* ─── Loading state ─── */
  if (authLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  /* ─── Auth gate: explain why login is required ─── */
  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <FadeIn>
          <div className="mb-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-soft)]">
              <Shield className="h-8 w-8 text-[var(--accent-text)]" />
            </div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">מכרו כרטיס בביטחון</h1>
            <p className="mx-auto mt-3 max-w-md text-[var(--muted)]">
              כדי להגן על הקונים ולשמור על אמינות הפלטפורמה, אנחנו צריכים לוודא את זהותכם לפני פרסום כרטיס.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mb-8 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="mb-5 text-lg font-semibold text-[var(--foreground)]">למה צריך להירשם?</h2>
            <div className="space-y-5">
              {[
                {
                  icon: UserCheck,
                  title: 'אימות זהות',
                  desc: 'אנחנו מאמתים את הזהות שלכם כדי למנוע הונאות. הקונים יודעים שהם קונים ממוכר אמיתי.',
                },
                {
                  icon: Eye,
                  title: 'הפרטים שלכם נשארים פרטיים',
                  desc: 'הקונה לא רואה את הפרטים שלכם — רק SafeTicket. אתם מוגנים לחלוטין.',
                },
                {
                  icon: Lock,
                  title: 'תשלום מובטח',
                  desc: 'הכסף מוחזק בנאמנות ומשוחרר אליכם אחרי האירוע. עמלה של 10% רק על מכירה מוצלחת.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)]">
                    <item.icon className="h-5 w-5 text-[var(--accent-text)]" />
                  </div>
                  <div>
                    <h3 className="text-[0.95rem] font-semibold text-[var(--foreground)]">{item.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mb-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">איך זה עובד?</h2>
            <div className="space-y-3">
              {[
                { num: '1', text: 'נרשמים ומאמתים את הזהות (תעודת זהות / דרכון)' },
                { num: '2', text: 'בוחרים אירוע, מעלים את הכרטיס וקובעים מחיר' },
                { num: '3', text: 'הצוות שלנו בודק ומפרסם — קונה משלם? מקבלים התראה' },
                { num: '4', text: 'אחרי האירוע, הכסף משוחרר לחשבון הבנק שלכם' },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                    {step.num}
                  </span>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/auth/signup"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:shadow-xl hover:brightness-110"
            >
              <UserCheck className="h-5 w-5" />
              צרו חשבון מוכר
            </Link>
            <Link
              href="/auth/login"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-6 py-3.5 font-semibold text-[var(--foreground)] transition-all hover:border-[var(--muted)] hover:shadow-sm"
            >
              <LogIn className="h-5 w-5" />
              כבר יש לי חשבון
            </Link>
          </div>
          <p className="mt-4 text-center text-xs text-[var(--muted)]">
            ההרשמה חינמית. פרסום מודעה — חינם. תשלום עמלה רק על מכירה מוצלחת.
          </p>
        </FadeIn>
      </div>
    );
  }

  /* ─── Success state ─── */
  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <Check className="h-10 w-10 text-[var(--accent-text)]" />
        </div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">המודעה נשלחה לבדיקה!</h1>
        <p className="mt-4 text-[var(--muted)]">
          הצוות שלנו יבדוק את הכרטיס ויאשר את המודעה בהקדם. תקבלו עדכון במייל.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            חזרה לדף הבית
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedEventId(null);
              setEventSearch('');
              setAskingPrice('');
              setTicketFile(null);
              setProofFile(null);
              setErrors({});
            }}
            className="rounded-xl border border-[var(--input-border)] px-6 py-3 text-[var(--foreground)] transition hover:bg-[var(--input-bg)]"
          >
            פרסם כרטיס נוסף
          </button>
        </div>
      </div>
    );
  }

  /* ─── Sell form (authenticated) ─── */
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">מכרו כרטיס</h1>
        <p className="mt-2 text-[var(--muted)]">בחרו אירוע, העלו את הכרטיס וקבעו מחיר — אנחנו מטפלים בכל השאר</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Pick event */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">1. בחרו אירוע</h2>
          <div className="relative">
            <button
              type="button"
              onClick={() => setEventDropdownOpen(!eventDropdownOpen)}
              className={`flex w-full items-center justify-between rounded-xl border bg-[var(--input-bg)] px-4 py-3 text-start transition ${
                errors.event ? 'border-red-500' : 'border-[var(--input-border)]'
              }`}
            >
              <span className={selectedEvent ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}>
                {selectedEvent ? selectedEvent.title : 'בחרו אירוע מהרשימה...'}
              </span>
              <ChevronDown className={`h-4 w-4 text-[var(--muted)] transition ${eventDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {errors.event && <p className="mt-1 text-xs text-red-600">{errors.event}</p>}

            {eventDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full rounded-xl border border-[var(--card-border)] bg-[var(--card)] shadow-lg">
                <div className="border-b border-[var(--card-border)] p-3">
                  <div className="relative">
                    <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
                    <input
                      type="text"
                      value={eventSearch}
                      onChange={(e) => setEventSearch(e.target.value)}
                      placeholder="חפשו אירוע..."
                      className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] py-2 pe-3 ps-10 text-sm placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto p-2">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((ev) => (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={() => {
                          setSelectedEventId(ev.id);
                          setEventDropdownOpen(false);
                          setEventSearch('');
                          if (errors.event) setErrors((prev) => { const next = { ...prev }; delete next.event; return next; });
                        }}
                        className={`w-full rounded-lg px-3 py-2.5 text-start transition hover:bg-[var(--input-bg)] ${
                          selectedEventId === ev.id ? 'bg-[var(--accent-soft)]' : ''
                        }`}
                      >
                        <div className="text-sm font-medium text-[var(--foreground)]">{ev.title}</div>
                        <div className="text-xs text-[var(--muted)]">
                          {new Date(ev.event_date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })} · {ev.venue}, {ev.city}
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-4 text-center text-sm text-[var(--muted)]">לא נמצאו אירועים</p>
                  )}
                </div>
              </div>
            )}
          </div>
          {selectedEvent && (
            <div className="mt-3 rounded-lg bg-[var(--input-bg)] px-4 py-3 text-sm">
              <div className="font-medium text-[var(--foreground)]">{selectedEvent.title}</div>
              <div className="text-xs text-[var(--muted)]">
                {new Date(selectedEvent.event_date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })} · {selectedEvent.venue}, {selectedEvent.city}
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Upload ticket */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">2. העלו את הכרטיס</h2>

          {ticketFile ? (
            <div className="flex items-center justify-between rounded-xl border border-[var(--card-border)] bg-[var(--input-bg)] px-4 py-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[var(--accent-text)]" />
                <div>
                  <div className="text-sm font-medium text-[var(--foreground)]">{ticketFile.name}</div>
                  <div className="text-xs text-[var(--muted)]">{formatFileSize(ticketFile.size)}</div>
                </div>
              </div>
              <button type="button" onClick={() => setTicketFile(null)} className="rounded-lg p-1 text-[var(--muted)] hover:bg-[var(--card-border)]">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => ticketInputRef.current?.click()}
              className={`flex w-full items-center justify-center rounded-xl border-2 border-dashed p-8 transition hover:border-[var(--muted)] ${
                errors.ticket ? 'border-red-400 bg-red-50' : 'border-[var(--input-border)] bg-[var(--input-bg)]'
              }`}
            >
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-[var(--muted)]" />
                <p className="mt-2 text-sm text-[var(--muted)]">גררו קובץ לכאן או לחצו לבחירה</p>
                <p className="mt-1 text-xs text-[var(--muted)]">PDF, PNG, JPG עד 5MB</p>
              </div>
            </button>
          )}
          <input
            ref={ticketInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setTicketFile(file);
                if (errors.ticket) setErrors((prev) => { const next = { ...prev }; delete next.ticket; return next; });
              }
            }}
          />
          {errors.ticket && <p className="mt-1 text-xs text-red-600">{errors.ticket}</p>}

          <div className="mt-4 rounded-lg border border-[var(--card-border)] bg-[var(--input-bg)] px-4 py-3">
            <p className="text-xs text-[var(--muted)]">
              אם המחיר לא מופיע על הכרטיס, צרפו גם אישור רכישה:
            </p>
            {proofFile ? (
              <div className="mt-2 flex items-center justify-between rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[var(--accent-text)]" />
                  <span className="text-xs text-[var(--foreground)]">{proofFile.name}</span>
                </div>
                <button type="button" onClick={() => setProofFile(null)} className="rounded p-0.5 text-[var(--muted)] hover:bg-[var(--card-border)]">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => proofInputRef.current?.click()}
                className="mt-2 text-xs font-medium text-[var(--accent-text)] hover:underline"
              >
                + העלו אישור רכישה
              </button>
            )}
            <input
              ref={proofInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setProofFile(file);
              }}
            />
          </div>
        </div>

        {/* Step 3: Price */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">3. קבעו מחיר</h2>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={askingPrice}
              onChange={(e) => {
                setAskingPrice(e.target.value);
                if (errors.price) setErrors((prev) => { const next = { ...prev }; delete next.price; return next; });
              }}
              placeholder="הזינו את המחיר המבוקש"
              className={`w-full rounded-xl border bg-[var(--input-bg)] py-3 pe-4 ps-10 text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-1 ${
                errors.price ? 'border-red-500 focus:ring-red-500' : 'border-[var(--input-border)] focus:ring-[var(--accent)]'
              }`}
            />
            <span className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">₪</span>
          </div>
          {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
          <p className="mt-2 text-xs text-[var(--muted)]">
            הצוות שלנו יבדוק שהמחיר לא עולה על מחיר הקנייה המקורי. עמלת מכירה: 10% על מכירה מוצלחת בלבד.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <ShieldCheck className="h-5 w-5 shrink-0 text-[var(--accent-text)]" />
          <p className="text-sm text-[var(--accent-text)]">
            הכרטיס יעבור בדיקה לפני הפרסום. הכסף יוחזק בנאמנות עד אחרי האירוע.
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[var(--accent)] py-4 text-lg font-bold text-white transition hover:opacity-90"
        >
          שלחו לבדיקה ופרסום
        </button>
      </form>
    </div>
  );
}
