'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/Button';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';

// Subscribe CTA per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.5 auth-state branching.
// Three branches:
//   1. Logged-out visitor → signup flow → LS checkout (custom JWT, not NextAuth, per T1)
//   2. Logged-in user without active LS subscription → LS checkout direct
//   3. Logged-in user with active LS subscription → "already subscribed" / dashboard
//
// Active-subscription detection per pass 3B: isLcsSubscriptionActive reads
// user.subscription.{status, lsSubscriptionId} populated by the LS webhook handler
// (subscription_* events) into the Subscription table.

export default function SubscribeCTA() {
  const t = useTranslations('homepage.subscription');
  const { user } = useAuth();

  // Editorial-scholarly aesthetic — override the global Button's seller-era blue
  // at this single homepage instance. Other pages keep blue until they're rebuilt.
  const homepageButtonOverride =
    '!bg-terracotta-400 !text-cream-50 hover:!bg-terracotta-500 focus:!ring-terracotta-400';
  const homepageGhostOverride =
    '!text-ink-700 hover:!bg-cream-200 focus:!ring-ink-700';

  if (user && isLcsSubscriptionActive(user)) {
    // Branch 3 — already subscribed. Per §5.5: do NOT let them re-checkout.
    return (
      <Button variant="ghost" size="lg" href="/member" className={homepageGhostOverride}>
        {t('alreadySubscribedCta')}
      </Button>
    );
  }

  // Branch 1 (logged-out) and Branch 2 (logged-in, no active sub):
  // both go to LS checkout. Logged-out users complete checkout as a guest; the
  // post-checkout webhook auto-creates a custom-JWT account by buyer email and
  // sends a "set your password" email. Per the established pattern in
  // /api/webhooks/lemonsqueezy/route.ts.
  return (
    <Button
      variant="primary"
      size="lg"
      href={SUBSCRIPTION_PRODUCT.buyNowUrl}
      className={homepageButtonOverride}
    >
      {t('subscribeCta')}
    </Button>
  );
}
