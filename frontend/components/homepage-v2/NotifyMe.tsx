'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

// Notify-me email-capture form per HOMEPAGE-IMPLEMENTATION-PROMPT.md §9 launch readiness
// item 1 + T5 default. Replaces SubscribeCTA when HOMEPAGE_SUBSCRIBE_MODE === "notify_me".
// Posts to /api/subscription-interest. Idempotent on email at the server — duplicate
// submissions resolve to the same confirmation state with no leak.
//
// Editorial-scholarly aesthetic per the home page rebuild (commit 63deeb93):
// terracotta primary CTA, ink type, cream surfaces.

export default function NotifyMe() {
  const t = useTranslations('homepage.notify');
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Client-side email check — same shape as the server-side regex; the server
  // re-validates on receipt, so this is purely a UX nicety.
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
      setStatus('error');
      setErrorMessage(t('errors.invalid_email'));
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscription-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, locale }),
      });

      if (res.ok) {
        setStatus('success');
        return;
      }

      // 4xx — surface the server's error message if it parses as JSON, else fall
      // back to the localized invalid-email string (covers most 400 cases).
      let serverError = '';
      try {
        const data = await res.json();
        if (typeof data?.error === 'string') serverError = data.error;
      } catch {
        // ignore JSON parse failure
      }
      setStatus('error');
      setErrorMessage(
        res.status === 400 ? serverError || t('errors.invalid_email') : t('errors.server')
      );
    } catch {
      setStatus('error');
      setErrorMessage(t('errors.server'));
    }
  }

  if (status === 'success') {
    return (
      <p
        className="text-base text-ink-700 leading-relaxed"
        role="status"
        aria-live="polite"
      >
        {t('confirmation')}
      </p>
    );
  }

  const isSubmitting = status === 'submitting';

  return (
    <div className="flex flex-col gap-3 w-full max-w-xl">
      <p className="text-base text-ink-700 leading-relaxed">
        {t('aboveField')}
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:items-start gap-3"
        noValidate
      >
      {/* Hidden locale field — useLocale() drives the body of the request directly,
          but echo it as a hidden input so non-JS submissions (or future progressive
          enhancement) carry the locale too. */}
      <input type="hidden" name="locale" value={locale} />

      <div className="flex-1 min-w-0">
        {/* Semantic label — describes the field for screen readers. Deliberately
            NOT echoing the placeholder example: (a) labels and placeholders should
            convey different things, and (b) Cloudflare's auto Email Address
            Obfuscation rewrites email-shaped strings in text content, which would
            replace the placeholder echo with an obfuscated link an a11y user hears
            as "[email protected]". */}
        <label htmlFor="notify-email" className="sr-only">
          {t('label')}
        </label>
        <input
          id="notify-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            if (status === 'error') {
              setStatus('idle');
              setErrorMessage('');
            }
          }}
          disabled={isSubmitting}
          placeholder={t('placeholder')}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'notify-error' : undefined}
          className="w-full px-4 py-3 rounded-md border border-cream-300 bg-cream-50 text-ink-900 text-base placeholder:text-ink-500 focus:outline-none focus:border-ink-700 focus:ring-2 focus:ring-terracotta-400/30 transition disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium text-base bg-terracotta-400 text-cream-50 hover:bg-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:ring-offset-2 focus:ring-offset-cream-100 transition disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>

      {status === 'error' && errorMessage && (
        <p
          id="notify-error"
          role="alert"
          className="basis-full text-sm text-terracotta-500"
        >
          {errorMessage}
        </p>
      )}
      </form>
      <p className="text-sm text-ink-500 leading-relaxed">
        {t('subCopy')}
      </p>
    </div>
  );
}
