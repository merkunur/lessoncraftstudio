'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';
import { PRICING_PUBLIC } from '@/config/subscription-launch';
import { studioStrings } from '../studio-strings';

// Story Studio — full-viewport editor host. Auth + tier gates, a small-screen
// posture card (<1024px: editing is desktop/tablet-landscape), and the
// 401-from-inside listener (studio-core posts lcs-studio-auth when the token
// dies mid-session; autosave's localStorage backup protects the work).

const STUDIO_CLIENT_VERSION = 2; // bump with any storybook-studio.html/js change (§A.13.42)

export default function StudioEditorClient({
  locale,
  storyId,
}: {
  locale: string;
  storyId: string;
}) {
  const s = studioStrings(locale);
  const { user, loading: authLoading } = useAuth();
  const [authLost, setAuthLost] = useState(false);
  const [tooSmall, setTooSmall] = useState(false);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data && e.data.type === 'lcs-studio-auth' && e.data.status === 401) {
        setAuthLost(true);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    const check = () => setTooSmall(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (authLoading) {
    return (
      <main className="container mx-auto px-4 max-w-5xl py-12">
        <p className="text-ink-500">{s.loading}</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-16">
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-4">{s.signInTitle}</h1>
        <p className="text-ink-700 mb-8">{s.signInBody}</p>
        <Link
          href={`/${locale}/auth/signin`}
          className="inline-flex items-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
        >
          {s.signInCta}
        </Link>
      </main>
    );
  }

  if (!isLcsSubscriptionActive(user)) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-16">
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-4">{s.subscriberTitle}</h1>
        <p className="text-ink-700 mb-8">{s.subscriberBody}</p>
        {PRICING_PUBLIC && (
          <Link
            href={`/${locale}/pricing`}
            className="inline-flex items-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
          >
            {s.subscriberCta}
          </Link>
        )}
      </main>
    );
  }

  if (tooSmall) {
    return (
      <main className="container mx-auto px-4 max-w-xl py-20 text-center">
        <div className="text-5xl mb-6">🖥️</div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 mb-3">
          {s.smallScreenTitle}
        </h1>
        <p className="text-ink-700 mb-8">{s.smallScreenBody}</p>
        <Link
          href={`/${locale}/studio`}
          className="inline-flex items-center px-6 py-3 rounded-md border border-cream-300 text-ink-700 font-semibold hover:bg-cream-100 transition"
        >
          {s.backToStories}
        </Link>
      </main>
    );
  }

  return (
    <div className="fixed inset-0 z-40 bg-cream-50 flex flex-col">
      <div className="flex items-center gap-3 px-4 py-2 border-b border-cream-300 bg-cream-50">
        <Link
          href={`/${locale}/studio`}
          className="text-sm font-semibold text-ink-700 hover:text-terracotta-500 transition"
        >
          ← {s.backToStories}
        </Link>
      </div>
      {authLost && (
        <div className="flex items-center justify-between gap-4 px-4 py-2 bg-terracotta-400 text-cream-50">
          <p className="text-sm font-semibold">{s.editorAuthLost}</p>
          <Link
            href={`/${locale}/auth/signin`}
            className="shrink-0 text-sm font-bold underline"
          >
            {s.editorAuthCta}
          </Link>
        </div>
      )}
      <iframe
        src={`/mini-tools/storybook-studio.html?story=${encodeURIComponent(storyId)}&mode=teacher&v=${STUDIO_CLIENT_VERSION}`}
        title="Story Studio"
        className="flex-1 w-full border-0"
      />
    </div>
  );
}
