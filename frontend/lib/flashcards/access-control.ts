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
 * The allowlist is INITIAL — operator picks final 3 packages at Phase 3a
 * close (C5 launch-trigger condition surface). Pre-recommendation candidates
 * span cross-cluster K-3 representation:
 *
 *   - count-objects-1-to-10 (numeracy cluster; theme-derived; broad K-3 appeal)
 *   - identify-and-name-emotions (personal-social-emotional cluster; vocabKeyList; K-3-natural)
 *   - identify-letter-sounds-vowels (early-literacy cluster; phonics foundation)
 *
 * These 3 cover math + SEL + literacy domains — three distinct cluster
 * representations + diverse pedagogical strands. Operator-strategic at Phase
 * 3a close; constant table is mutable via subsequent code commit.
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
 * Free-tier-3-package allowlist (initial). Operator picks final 3 at Phase
 * 3a close per C5 launch-trigger condition. Constant-table pattern; allowlist
 * change requires code commit (no DB migration).
 */
export const FREE_TIER_FLASHCARD_PACKAGES: ReadonlySet<string> = new Set([
  'count-objects-1-to-10',
  'identify-and-name-emotions',
  'identify-letter-sounds-vowels',
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
