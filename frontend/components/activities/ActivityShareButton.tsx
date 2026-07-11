'use client';

/**
 * "Share with your class" — on every activity page (adult chrome). Mints a
 * durable clean student-play link (+ QR) for this activity, subscriber-gated.
 *   - signed out            → sign-up (voluntary; promotes the account)
 *   - signed in, no plan    → pricing (promotes the Teacher plan)
 *   - active subscriber     → POST /api/activities/share → share modal
 * The server is the source of truth for the gate (403 subscription_required →
 * pricing), so the optimistic client check never lets a non-subscriber through.
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';
import ActivityShareModal, { type ActivityShare } from './ActivityShareModal';

export default function ActivityShareButton({
  activityId,
  locale,
  title,
}: {
  activityId: string;
  locale: string;
  title: string;
}) {
  const t = useTranslations('activityShare');
  const router = useRouter();
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [share, setShare] = useState<ActivityShare | null>(null);

  const onClick = async () => {
    if (busy) return;
    if (!user) {
      router.push(`/${locale}/auth/signup`);
      return;
    }
    if (!isLcsSubscriptionActive(user)) {
      router.push(`/${locale}/pricing`);
      return;
    }
    setBusy(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('/api/activities/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token ?? ''}` },
        body: JSON.stringify({ activityId, locale, title }),
      });
      if (res.status === 401 || res.status === 403) {
        router.push(`/${locale}/pricing`);
        return;
      }
      if (!res.ok) return;
      const data = await res.json();
      if (data?.share?.url) {
        setShare({ title: data.share.title || title, url: data.share.url, qrUrl: data.share.qrUrl });
      }
    } catch {
      /* transient — leave the button ready to retry */
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-teal-700 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 disabled:opacity-60 transition"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
        {busy ? t('sharing') : t('button')}
      </button>
      {share && (
        <ActivityShareModal
          share={share}
          onClose={() => setShare(null)}
          workspaceHref={`/${locale}/workspace`}
        />
      )}
    </>
  );
}
