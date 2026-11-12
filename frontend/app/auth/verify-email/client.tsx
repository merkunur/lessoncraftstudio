'use client';

/**
 * The page the link in the confirmation e-mail opens. In the teacher's language (content/verify-email/ui.json, 11
 * languages; until 2026-11-12 it was English for everyone and its two buttons led to pages that do not exist).
 * When the link works, the auth context signs her in and takes her to her workspace. When it does not (older than
 * 24 hours, or used), the page says so and sends her to sign in: her account page sends a new link.
 */
import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import ui from '@/content/verify-email/ui.json';

type Strings = (typeof ui)['en'];

function VerifyEmailPageContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = typeof params?.locale === 'string' ? params.locale : 'en';
  const s: Strings = (ui as Record<string, Strings>)[locale] || ui.en;
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const token = searchParams.get('token');
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return; // a link works once: never send it twice (React runs an effect twice in development)
    started.current = true;
    if (!token) { setStatus('error'); return; }
    verifyEmail(token).then(() => setStatus('success')).catch(() => setStatus('error'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#FBF3E4] px-4 py-12" data-verify-page={status}>
      <div className="w-full max-w-md rounded-2xl border border-[#CFC5AE] bg-[#FFFDF8] p-8 text-center shadow-[0_2px_6px_-2px_rgba(74,56,24,0.18)]">
        {status === 'loading' && (
          <p role="status" className="text-lg font-semibold text-[#14322D]">{s.verifying}</p>
        )}
        {status === 'success' && (
          <>
            <h1 className="text-2xl font-bold text-[#14322D]">{s.verified}</h1>
            <a href={`/${locale}/workspace`} className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-[#F2784B] px-6 py-3 font-semibold text-[#2A1206] no-underline">
              {s.panelCta}
            </a>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="text-2xl font-bold text-[#14322D]">{s.failedTitle}</h1>
            <p className="mt-3 text-[#3D4F49]">{s.failedBody}</p>
            <a href={`/${locale}/auth/signin?redirect=${encodeURIComponent(`/${locale}/workspace?verify=1`)}`} className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-[#F2784B] px-6 py-3 font-semibold text-[#2A1206] no-underline">
              {s.signIn}
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPageContent;
