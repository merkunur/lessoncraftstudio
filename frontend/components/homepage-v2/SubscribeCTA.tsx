'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/Button';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';

// Subscribe CTA per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.5 auth-state branching.
// Three branches:
//   1. Logged-out visitor → signup flow → LS checkout (custom JWT, not NextAuth, per T1)
//   2. Logged-in user without active LS subscription → LS checkout direct
//   3. Logged-in user with active LS subscription → "already subscribed" / dashboard
//
// PASS 3A SCOPE: branches 1 and 2 wired (logged-out / logged-in routes to LS checkout).
// Branch 3 (active-subscription detection) requires the schema migration + webhook
// extension authorized in pass 3B; until then, logged-in users always see the
// Subscribe button (defaulting to branch 2). The active-subscription predicate at
// `subscription-helpers.ts` will replace the placeholder logic in pass 3B.

export default function SubscribeCTA() {
  const t = useTranslations('homepage.subscription');
  const { user } = useAuth();

  // PASS 3B PLACEHOLDER: real active-LCS-subscription predicate lands here.
  // Until then, treat all logged-in users as branch 2 (no active sub → checkout direct).
  const hasActiveLcsSubscription = false;

  if (user && hasActiveLcsSubscription) {
    // Branch 3 — already subscribed. Per §5.5: do NOT let them re-checkout.
    return (
      <Button variant="ghost" size="lg" href="/member">
        {t('alreadySubscribedCta')}
      </Button>
    );
  }

  // Branch 1 (logged-out) and Branch 2 (logged-in, no active sub):
  // both go to LS checkout. Logged-out users complete checkout as a guest; the
  // post-checkout webhook ties the purchase to a NextAuth-equivalent account
  // (custom JWT) by buyer email. Per existing webhook pattern in
  // /api/webhooks/lemonsqueezy/route.ts.
  return (
    <Button variant="primary" size="lg" href={SUBSCRIPTION_PRODUCT.buyNowUrl}>
      {t('subscribeCta')}
    </Button>
  );
}
