'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

const faqItems = [
  { q: 'מה זה SafeTicket?', a: 'SafeTicket היא פלטפורמה מאובטחת לקנייה ומכירה של כרטיסים יד שנייה. אנחנו מספקים מערכת נאמנות (escrow) שמגינה על הקונים והמוכרים.' },
  { q: 'איך מערכת ה-Escrow עובדת?', a: 'כשקונה משלם, הכסף מוחזק בנאמנות ולא מועבר למוכר. הכסף נשאר בנאמנות עד אחרי האירוע. אם הכרטיס לא עבד - הקונה מקבל החזר מלא.' },
  { q: 'כמה עולה להשתמש בפלטפורמה?', a: 'לקונים - עמלה של 10% על מחיר הכרטיס. למוכרים - עמלה של 10% על מכירה מוצלחת בלבד. אין תשלום על פרסום מודעה.' },
  { q: 'איך מוודאים שהכרטיסים אמיתיים?', a: 'כל מודעה עוברת בדיקה ידנית על ידי הצוות שלנו לפני פרסום. המוכרים עוברים אימות זהות מלא.' },
  { q: 'מה המדיניות לגבי מחירים?', a: 'אנחנו לא מאפשרים ספסרות. מחיר המכירה חייב להיות שווה או נמוך מהערך הנקוב (המחיר המקורי) של הכרטיס.' },
  { q: 'מה קורה אם האירוע מבוטל?', a: 'במקרה של ביטול אירוע, מבצעים החזר כספי מלא לקונה באופן אוטומטי. אנחנו עוקבים אחרי עדכוני אירועים ומטפלים בזה.' },
  { q: 'איך מתבצע תהליך האימות?', a: 'מוכרים מעלים תעודת זהות או דרכון. הצוות שלנו מאמת את הפרטים תוך 24 שעות. אימות מגביר אמון ומשפר את הסיכוי למכירה.' },
  { q: 'מה עושים במקרה של בעיה?', a: 'פותחים סכסוך דרך המערכת. הצוות שלנו בודק את המקרה ומחליט תוך 48 שעות. בדרך כלל, אם הכרטיסים לא תקינים - הקונה מקבל החזר מלא.' },
  { q: 'כמה זמן לוקח לקבל תשלום כמוכר?', a: 'הכסף משוחרר אחרי האירוע (48 שעות לאחר מועד האירוע) ומועבר לחשבון הבנק שלכם תוך 3-5 ימי עסקים.' },
  { q: 'האם אפשר למכור כרטיס דיגיטלי?', a: 'בהחלט! אנחנו תומכים בכרטיסים דיגיטליים - PDF, צילום מסך, או כל קובץ עם ברקוד/QR. כרטיסים נעולים לאפליקציה (כמו Eventim) לא נתמכים כרגע.' },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <FadeIn>
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-[var(--foreground)]">שאלות נפוצות</h1>
          <p className="text-lg text-[var(--muted)]">כל מה שצריך לדעת על SafeTicket</p>
        </div>
      </FadeIn>

      <div className="space-y-4">
        {faqItems.map((item, i) => (
          <FadeIn key={i} delay={i * 0.04}>
            <div className="overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)] transition-all hover:border-[var(--input-border)] hover:shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-start"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 shrink-0 text-[var(--accent-text)]" />
                  <span className="font-semibold text-[var(--foreground)]">{item.q}</span>
                </div>
                {openIndex === i ? <ChevronUp className="h-5 w-5 shrink-0 text-[var(--muted)]" /> : <ChevronDown className="h-5 w-5 shrink-0 text-[var(--muted)]" />}
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === i ? '200px' : '0px',
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <div className="border-t border-[var(--card-border)] px-6 pb-6 pt-4">
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.4}>
        <div className="relative mt-16 overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-8 text-center">
          <div className="noise-overlay pointer-events-none absolute inset-0" />
          <div className="relative">
            <MessageCircle className="mx-auto mb-4 h-10 w-10 text-[var(--accent-text)]" />
            <h2 className="mb-2 text-xl font-bold text-[var(--foreground)]">לא מצאתם תשובה?</h2>
            <p className="mb-6 text-[var(--muted)]">צוות התמיכה שלנו כאן בשבילכם</p>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:shadow-xl hover:brightness-110">
              צור קשר
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
