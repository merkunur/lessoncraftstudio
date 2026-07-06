'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';
import { PRICING_PUBLIC } from '@/config/subscription-launch';
import { studioStrings } from '../studio-strings';

// Story Studio — TRUE full-viewport editor host: the iframe owns the entire
// screen (the canvas is the product; no wrapper band). Auth + tier gates, a
// small-screen posture card (<1024px: editing is desktop/tablet-landscape),
// the 401-from-inside listener (studio-core posts lcs-studio-auth when the
// token dies mid-session; autosave's localStorage backup protects the work),
// and the lcs-studio-nav listener (the studio toolbar's "← My stories").

const STUDIO_CLIENT_VERSION = 4; // bump with any storybook-studio.html/js change (§A.13.42)

export default function StudioEditorClient({
  locale,
  storyId,
}: {
  locale: string;
  storyId: string;
}) {
  const s = studioStrings(locale);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [authLost, setAuthLost] = useState(false);
  const [tooSmall, setTooSmall] = useState(false);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data && e.data.type === 'lcs-studio-auth' && e.data.status === 401) {
        setAuthLost(true);
      }
      if (e.data && e.data.type === 'lcs-studio-nav' && e.data.target === 'stories') {
        router.push(`/${locale}/studio`);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [locale, router]);

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
    // Inline positioning on purpose: the editor must own the viewport no
    // matter what utility classes or stacking contexts the surrounding site
    // ships (the nav is z-50; we sit above it even if this route is ever
    // re-included in the chrome'd layout branch).
    <div className="bg-cream-50" style={{ position: 'fixed', inset: 0, zIndex: 60 }}>
      <iframe
        src={`/mini-tools/storybook-studio.html?story=${encodeURIComponent(storyId)}&mode=teacher${user.isAdmin ? '&admin=1' : ''}&v=${STUDIO_CLIENT_VERSION}`}
        title="Story Studio"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
      />
      {authLost && (
        <div className="absolute left-1/2 top-3 z-10 flex -translate-x-1/2 items-center gap-4 rounded-full bg-terracotta-400 px-5 py-2.5 text-cream-50 shadow-lg">
          <p className="whitespace-nowrap text-sm font-semibold">{s.editorAuthLost}</p>
          <Link
            href={`/${locale}/auth/signin`}
            className="shrink-0 text-sm font-bold underline"
          >
            {s.editorAuthCta}
          </Link>
        </div>
      )}
    </div>
  );
}
