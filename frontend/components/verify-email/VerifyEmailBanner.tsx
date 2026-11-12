'use client';

/**
 * The notice an account sees on its own page while its e-mail is not confirmed (operator 2026-11-12; the rule is
 * lib/quota.ts FREE_ACCOUNT_NEEDS_CONFIRMED_EMAIL). It names the address the link went to and sends the link again.
 * A link sent again is a new link with its own 24 hours (app/api/auth/verify-email, GET).
 * Strings: content/verify-email/ui.json, 11 languages, read by one native reviewer.
 */
import { useState } from 'react';
import ui from '@/content/verify-email/ui.json';

type Strings = (typeof ui)['en'];

export default function VerifyEmailBanner({ locale, userId, email }: { locale: string; userId: string; email: string }) {
  const s: Strings = (ui as Record<string, Strings>)[locale] || ui.en;
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const resend = async () => {
    setState('sending');
    try {
      const res = await fetch(`/api/auth/verify-email?userId=${encodeURIComponent(userId)}`, { method: 'GET', cache: 'no-store' });
      setState(res.ok ? 'sent' : 'failed');
      try { (window as unknown as { umami?: { track: (e: string, d?: object) => void } }).umami?.track('verify-resend', { ok: res.ok }); } catch { /* counting never breaks a page */ }
    } catch {
      setState('failed');
    }
  };

  const [before, after] = s.bannerBody.split('{email}');
  return (
    <section data-verify-banner="" aria-labelledby="verify-banner-title" className="mb-6 max-w-3xl rounded-2xl border-2 border-lcs-coral bg-[#FFF6EF] p-5 md:p-6">
      <h2 id="verify-banner-title" className="font-lcsDisplay text-[1.25rem] font-bold leading-tight text-[#14322D]">{s.bannerTitle}</h2>
      <p className="mt-2 font-lcsBody text-[#3D4F49]">
        {before}<strong className="break-words text-[#14322D]">{email}</strong>{after}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={resend}
          disabled={state === 'sending'}
          className="inline-flex min-h-[48px] items-center rounded-full bg-lcs-coral px-6 py-3 font-lcsDisplay font-semibold text-[#2A1206] transition-shadow hover:shadow-[0_3px_10px_-2px_rgba(74,56,24,0.35)] disabled:opacity-60"
        >
          {s.resend}
        </button>
        <p role="status" aria-live="polite" className="font-lcsBody text-[0.9375rem] font-semibold text-[#14322D]">
          {state === 'sent' ? s.sent : state === 'failed' ? s.resendFailed : ''}
        </p>
      </div>
    </section>
  );
}
