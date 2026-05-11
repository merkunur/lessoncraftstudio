/**
 * access-control.ts — Pillar 4 Arc 2 Phase 3a access predicate for flashcards.
 *
 * Composes `isLcsSubscriptionActive` (lib/subscription-helpers.ts) with a
 * free-tier-3-package allowlist per Arc 2 spec §3 Phase 3.
 *
 * Per CLAUDE.md §7 + docs/SUBSCRIPTION-SCOPE.md: flashcards are a paid-tier
 * deliverable EXCEPT for the 3-package free-tier allowlist. Free users access
 * the allowlist; subscribers + admins access everything.
 *
 * Free-tier-3-package allowlist storage decision per Phase 0 audit (Dimension
 * 4): constant-table pattern (option a) — simplest substrate; allowlist
 * changes via small code commit; no schema migration. If post-launch signal
 * warrants dynamic allowlist (subscriber-data-driven), commission migration
 * to Bundle metadata flag (option b) as future arc.
 *
 * Final allowlist locked by operator at Phase 3a close (C5 launch-trigger
 * condition):
 *
 *   - count-objects-1-to-10 (early-numeracy; math domain)
 *   - identify-letter-sounds-vowels (early-literacy; literacy domain)
 *   - identify-living-vs-nonliving (world-knowledge; science domain)
 *
 * Cross-domain coverage: math + literacy + world-knowledge. The world-
 * knowledge third-domain pick (identify-living-vs-nonliving) was operator
 * override of CC's original SEL pre-recommendation (identify-and-name-
 * emotions) per architectural-centrality reasoning: identify-living-vs-
 * nonliving has ~8-bundle cross-bundle reuse density signaling high
 * cross-domain applicability; surfacing it to free-tier showcases bundle
 * reusability pattern + K-3 science search-traffic optimization.
 */

interface SubscriptionShape {
  status?: string | null;
  lsSubscriptionId?: string | null;
}

interface SessionLikeShape {
  isAdmin?: boolean;
  subscription?: SubscriptionShape | null;
}

/**
 * Free-tier-3-package allowlist (C5 launch-trigger condition). Operator
 * locked final 3 at Phase 3a close. Constant-table pattern; allowlist
 * change requires code commit (no DB migration).
 */
export const FREE_TIER_FLASHCARD_PACKAGES: ReadonlySet<string> = new Set([
  'count-objects-1-to-10',
  'identify-letter-sounds-vowels',
  'identify-living-vs-nonliving',
]);

export type AccessReason = 'free-tier' | 'subscription' | 'admin-bypass' | 'gated';

export interface AccessResult {
  allowed: boolean;
  reason: AccessReason;
}

/**
 * Returns access result for a flashcard package given a session.
 *
 * Resolution order:
 *   1. Free-tier allowlist match → allowed=true, reason='free-tier'
 *   2. Admin bypass (session.isAdmin === true) → allowed=true, reason='admin-bypass'
 *   3. Active LCS subscription → allowed=true, reason='subscription'
 *   4. Otherwise → allowed=false, reason='gated'
 *
 * Mirrors the active-LCS-subscription predicate per CLAUDE.md §7 +
 * SUBSCRIPTION-SCOPE.md: `lsSubscriptionId !== null AND status === 'active'`.
 *
 * Free-tier path is checked FIRST so anonymous visitors (no session) can
 * still access the allowlist without authentication.
 */
export function canAccessFlashcard(
  packageSlug: string,
  session: SessionLikeShape | null | undefined
): AccessResult {
  if (FREE_TIER_FLASHCARD_PACKAGES.has(packageSlug)) {
    return { allowed: true, reason: 'free-tier' };
  }
  if (session?.isAdmin === true) {
    return { allowed: true, reason: 'admin-bypass' };
  }
  const sub = session?.subscription;
  if (sub && sub.status === 'active' && sub.lsSubscriptionId) {
    return { allowed: true, reason: 'subscription' };
  }
  return { allowed: false, reason: 'gated' };
}

/**
 * Convenience predicate when caller only needs allowed/denied boolean.
 */
export function isFlashcardAccessAllowed(
  packageSlug: string,
  session: SessionLikeShape | null | undefined
): boolean {
  return canAccessFlashcard(packageSlug, session).allowed;
}
