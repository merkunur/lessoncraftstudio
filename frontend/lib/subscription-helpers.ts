/**
 * Subscription predicates per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.5 + SUBSCRIPTION-SCOPE.md.
 *
 * Pure functions — work in both server and client contexts. The caller provides the subscription
 * shape (typically `session.user.subscription` or the result of `prisma.subscription.findUnique`).
 * Subscription state is populated by the LS subscription webhook handler at
 * /api/webhooks/lemonsqueezy/route.ts on subscription_* events.
 */

interface SubscriptionShape {
  status?: string | null;
  lsSubscriptionId?: string | null;
}

interface SessionLikeShape {
  subscription?: SubscriptionShape | null;
}

/**
 * Returns true when the session/user has an active LCS subscription. Definition:
 * the subscription row exists, has status='active', AND has lsSubscriptionId populated
 * (i.e., it was created via the Lemon Squeezy webhook, not legacy Stripe-era data).
 *
 * Per SUBSCRIPTION-SCOPE.md: "the active-LCS-subscription predicate matches against
 * lsSubscriptionId !== null AND status === 'active'."
 */
export function isLcsSubscriptionActive(
  session: SessionLikeShape | null | undefined
): boolean {
  const sub = session?.subscription;
  if (!sub) return false;
  return sub.status === 'active' && !!sub.lsSubscriptionId;
}
