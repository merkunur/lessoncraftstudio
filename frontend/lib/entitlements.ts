/**
 * Entitlement predicate for the 2026-07 subscription launch.
 *
 * `isSubscriptionUsable` is the ACCESS predicate for paid features (hosted
 * worksheets, collections/workspace, play-link creation, topic packs). It is
 * deliberately more forgiving than the strict-billing `isLcsSubscriptionActive`
 * (lib/subscription-helpers.ts, which stays untouched for billing surfaces):
 *
 *   1. Admin bypass (operational affordance, same as isLcsSubscriptionActive).
 *   2. status === 'active' with an LS-originated row → usable.
 *   3. status === 'past_due' within SUBSCRIPTION_GRACE_DAYS of pastDueAt →
 *      usable (dunning grace: LS retries cards for ~2 weeks; a teacher whose
 *      card bounced mid-term must not lose their class links overnight).
 *   4. status === 'canceled' but currentPeriodEnd is still in the future →
 *      usable (cancel-at-period-end: they paid through that date).
 *
 * Pure function — works in both server and client contexts. Callers provide
 * the subscription shape; server callers must SELECT pastDueAt +
 * currentPeriodEnd (see lib/subscriber-api-gate.ts) or grace/paid-through
 * silently degrade to strict-active semantics.
 */

export const SUBSCRIPTION_GRACE_DAYS = 14;

interface EntitlementSubscriptionShape {
  status?: string | null;
  lsSubscriptionId?: string | null;
  pastDueAt?: Date | string | null;
  currentPeriodEnd?: Date | string | null;
}

interface EntitlementSessionShape {
  isAdmin?: boolean;
  subscription?: EntitlementSubscriptionShape | null;
}

function toTime(value: Date | string | null | undefined): number | null {
  if (!value) return null;
  const t = value instanceof Date ? value.getTime() : Date.parse(value);
  return Number.isFinite(t) ? t : null;
}

export function isSubscriptionUsable(
  session: EntitlementSessionShape | null | undefined
): boolean {
  if (session?.isAdmin === true) return true;
  const sub = session?.subscription;
  if (!sub || !sub.lsSubscriptionId) return false;

  if (sub.status === 'active') return true;

  if (sub.status === 'past_due') {
    const pastDue = toTime(sub.pastDueAt);
    if (pastDue !== null) {
      return Date.now() - pastDue < SUBSCRIPTION_GRACE_DAYS * 24 * 60 * 60 * 1000;
    }
    return false;
  }

  if (sub.status === 'canceled') {
    const periodEnd = toTime(sub.currentPeriodEnd);
    return periodEnd !== null && periodEnd > Date.now();
  }

  return false;
}
