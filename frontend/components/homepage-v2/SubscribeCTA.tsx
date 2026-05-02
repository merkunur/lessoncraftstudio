'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/Button';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';
import NotifyMe from './NotifyMe';

// Subscribe CTA per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.5 auth-state branching.
// Three branches in 'subscribe' mode:
//   1. Logged-out visitor → signup flow → LS checkout (custom JWT, not NextAuth, per T1)
//   2. Logged-in user without active LS subscription → LS checkout direct
//   3. Logged-in user with active LS subscription → "already subscribed" / dashboard
//
// In 'notify_me' mode (T5 production default per §9 launch readiness item 1):
//   - Logged-in user with active LS subscription → branch 3 ("already subscribed").
//     Covers the edge case where the flag flips back from subscribe to notify_me
//     after some users have already subscribed.
//   - Everyone else → email-capture form (NotifyMe component).
//
// Active-subscription detection per pass 3B: isLcsSubscriptionActive reads
// user.subscription.{status, lsSubscriptionId} populated by the LS webhook handler
// (subscription_* events) into the Subscription table.
//
// `mode` is resolved from process.env.HOMEPAGE_SUBSCRIBE_MODE in the parent
// SubscriptionSection (server component) at static-generation time and passed in
// as a prop. Build-time read; no runtime toggling.

interface SubscribeCTAProps {
  mode: 'subscribe' | 'notify_me';
}

export default function SubscribeCTA({ mode }: SubscribeCTAProps) {
  const t = useTranslations('homepage.subscription');
  const { user } = useAuth();

  // Editorial-scholarly aesthetic — override the global Button's seller-era blue
  // at this single homepage instance. Other pages keep blue until they're rebuilt.
  const homepageButtonOverride =
    '!bg-terracotta-400 !text-cream-50 hover:!bg-terracotta-500 focus:!ring-terracotta-400';
  const homepageGhostOverride =
    '!text-ink-700 hover:!bg-cream-200 focus:!ring-ink-700';

  // Branch 3 — already subscribed. Applies in both modes: in notify_me mode this
  // covers the edge case where the flag flips back to notify_me after launch; we
  // never show the form to a paying customer.
  if (user && isLcsSubscriptionActive(user)) {
    return (
      <Button variant="ghost" size="lg" href="/member" className={homepageGhostOverride}>
        {t('alreadySubscribedCta')}
      </Button>
    );
  }

  // Notify-me mode — pre-launch default. Auth state is irrelevant; everyone without
  // an active subscription sees the same form.
  if (mode === 'notify_me') {
    return <NotifyMe />;
  }

  // Subscribe mode — Branch 1 (logged-out) and Branch 2 (logged-in, no active sub):
  // both go to LS checkout. Logged-out users complete checkout as a guest; the
  // post-checkout webhook auto-creates a custom-JWT account by buyer email and
  // sends a "set your password" email. Per the established pattern in
  // /api/webhooks/lemonsqueezy/route.ts.
  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="primary"
        size="lg"
        href={SUBSCRIPTION_PRODUCT.buyNowUrl}
        className={homepageButtonOverride}
      >
        {t('subscribeCta')}
      </Button>
      <p className="text-sm text-ink-500 leading-relaxed max-w-md">
        {t('subscribeSubCopy')}
      </p>
    </div>
  );
}
