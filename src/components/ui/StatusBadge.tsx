'use client';

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  verified: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'מאומת' },
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'ממתין' },
  unverified: { bg: 'bg-stone-100', text: 'text-stone-600', label: 'לא מאומת' },
  rejected: { bg: 'bg-red-50', text: 'text-red-700', label: 'נדחה' },
  active: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'פעיל' },
  draft: { bg: 'bg-stone-100', text: 'text-stone-600', label: 'טיוטה' },
  pending_review: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'בבדיקה' },
  sold: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'נמכר' },
  expired: { bg: 'bg-stone-100', text: 'text-stone-600', label: 'פג תוקף' },
  clear: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'תקין' },
  flagged: { bg: 'bg-orange-50', text: 'text-orange-700', label: 'מסומן' },
  under_review: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'בבדיקה' },
  blocked: { bg: 'bg-red-50', text: 'text-red-700', label: 'חסום' },
  paid: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'שולם' },
  held: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'מוחזק' },
  released: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'שוחרר' },
  refunded: { bg: 'bg-purple-50', text: 'text-purple-700', label: 'הוחזר' },
  failed: { bg: 'bg-red-50', text: 'text-red-700', label: 'נכשל' },
  confirmed: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'מאושר' },
  completed: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'הושלם' },
  cancelled: { bg: 'bg-stone-100', text: 'text-stone-600', label: 'בוטל' },
  disputed: { bg: 'bg-red-50', text: 'text-red-700', label: 'בסכסוך' },
  open: { bg: 'bg-red-50', text: 'text-red-700', label: 'פתוח' },
  resolved_buyer: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'נפתר לטובת הקונה' },
  resolved_seller: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'נפתר לטובת המוכר' },
  closed: { bg: 'bg-stone-100', text: 'text-stone-600', label: 'סגור' },
  pending_release: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'ממתין לשחרור' },
};

interface StatusBadgeProps {
  status: string;
  customLabel?: string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, customLabel, size = 'sm' }: StatusBadgeProps) {
  const style = statusStyles[status] || { bg: 'bg-stone-100', text: 'text-stone-600', label: status };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${style.bg} ${style.text} ${
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
    >
      {customLabel || style.label}
    </span>
  );
}
