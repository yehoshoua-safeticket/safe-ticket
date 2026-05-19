'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Eye, EyeOff, Loader2 } from 'lucide-react';
import { signup } from '@/app/auth/actions';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('הסיסמאות לא תואמות');
      return;
    }
    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    setLoading(true);

    const result = await signup(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Shield className="mx-auto mb-4 h-8 w-8 text-[var(--accent)]" strokeWidth={1.8} />
          <h1 className="text-2xl font-bold">צרו חשבון</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">הצטרפו לפלטפורמה הבטוחה לכרטיסים יד שנייה</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-8">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">שם מלא</label>
              <input name="fullName" type="text" required placeholder="ישראל ישראלי" className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">אימייל</label>
              <input name="email" type="email" required placeholder="your@email.com" className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">טלפון</label>
              <input name="phone" type="tel" placeholder="050-1234567" className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">סיסמה</label>
              <div className="relative">
                <input name="password" type={showPassword ? 'text' : 'password'} required placeholder="לפחות 6 תווים" className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute end-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[var(--muted)]">אימות סיסמה</label>
              <input name="confirmPassword" type="password" required placeholder="הכנסו שוב את הסיסמה" className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            צרו חשבון
          </button>
          <p className="mt-4 text-center text-xs text-[var(--muted)]">
            בהרשמה אתם מסכימים לתנאי השימוש ומדיניות הפרטיות
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          כבר יש לכם חשבון?{' '}<Link href="/auth/login" className="text-[var(--accent-text)] hover:underline">התחברו</Link>
        </p>
      </div>
    </div>
  );
}
