'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import {
  canAccessFlashcard,
  FREE_TIER_FLASHCARD_PACKAGES,
  type AccessReason,
} from '@/lib/flashcards/access-control';
import FlashcardDeck from './FlashcardDeck';
import FlashcardPaywall from './FlashcardPaywall';

// Pillar 4 Arc 2 Phase 3b — Per-package flashcard reader (subscriber-gated).
//
// Mirrors LessonPlanReader pattern: client-side auth gate; renders
// FlashcardDeck (iframe to Hetzner CDN deck.html) if allowed; renders
// FlashcardPaywall preview if gated.
//
// Free-tier-3-package allowlist (count-objects-1-to-10 +
// identify-letter-sounds-vowels + identify-living-vs-nonliving) accessible
// without auth per C5 lock at access-control.ts. Paid-tier subscribers +
// admin-bypass access full catalog.

interface AccessCheckResult {
  allowed: boolean;
  reason: AccessReason;
}

export default function FlashcardPackageReader({
  locale,
  packageSlug,
}: {
  locale: string;
  packageSlug: string;
}) {
  const t = useTranslations('flashcardReader');
  const { user, loading: authLoading } = useAuth();

  const [access, setAccess] = useState<AccessCheckResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Client-side access predicate composing useAuth session shape with
  // canAccessFlashcard. Mirrors server-side check at
  // /api/flashcards/access-check; provides immediate decision for UI
  // rendering without waiting on API roundtrip for free-tier packages.
  const computeAccess = useCallback((): AccessCheckResult => {
    // Free-tier fast path: anonymous + authenticated visitors both pass.
    if (FREE_TIER_FLASHCARD_PACKAGES.has(packageSlug)) {
      return { allowed: true, reason: 'free-tier' };
    }
    // Authenticated path: composes session shape with predicate.
    if (user) {
      return canAccessFlashcard(packageSlug, {
        isAdmin: user.isAdmin,
        subscription: user.subscription
          ? {
              status: user.subscription.status,
              lsSubscriptionId: user.subscription.lsSubscriptionId,
            }
          : null,
      });
    }
    // Anonymous + not-in-free-tier → gated.
    return { allowed: false, reason: 'gated' };
  }, [packageSlug, user]);

  useEffect(() => {
    if (authLoading) return;
    setAccess(computeAccess());
    setLoading(false);
  }, [authLoading, computeAccess]);

  if (authLoading || loading) {
    return (
      <main className="container mx-auto px-4 max-w-4xl py-12">
        <p className="text-ink-500">{t('loading')}</p>
      </main>
    );
  }

  if (!access) {
    return (
      <main className="container mx-auto px-4 max-w-4xl py-12">
        <p className="text-terracotta-500">{t('errorGeneric')}</p>
      </main>
    );
  }

  // Gated state: render paywall preview.
  if (!access.allowed) {
    return (
      <main className="container mx-auto px-4 max-w-4xl py-12">
        <FlashcardPaywall locale={locale} packageSlug={packageSlug} signedIn={!!user} />
      </main>
    );
  }

  // Allowed state: render full deck.
  return (
    <main className="container mx-auto px-4 max-w-4xl py-12">
      <FlashcardDeck
        locale={locale}
        packageSlug={packageSlug}
        accessReason={access.reason}
      />
      {access.reason === 'free-tier' && (
        <aside className="mt-8 p-4 rounded-md bg-cream-100 border border-cream-300 text-sm text-ink-700">
          <p className="font-semibold mb-1">{t('freeTier.banner.title')}</p>
          <p className="mb-3">{t('freeTier.banner.body')}</p>
          <Link
            href={`/${locale}#subscription`}
            className="inline-flex items-center px-4 py-2 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
          >
            {t('freeTier.banner.cta')}
          </Link>
        </aside>
      )}
    </main>
  );
}
