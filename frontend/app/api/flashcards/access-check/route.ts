import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractBearerToken, verifyAccessToken } from '@/lib/auth-utils';
import {
  canAccessFlashcard,
  FREE_TIER_FLASHCARD_PACKAGES,
  type AccessResult,
} from '@/lib/flashcards/access-control';

// Pillar 4 Arc 2 Phase 3a — Flashcard access-check endpoint.
//
// Returns { allowed, reason } given a package slug. Used by client-side
// flashcard browse UI to decide whether to show paywall preview vs full
// deck.html embed.
//
// Auth model:
//   - Anonymous request (no Bearer token) → free-tier allowlist check only
//   - Bearer token present → full session lookup; checks admin-bypass +
//     active-LCS-subscription per `canAccessFlashcard` predicate
//
// Endpoint is GET-only; idempotent; cache-friendly at 5-min TTL (matches
// §15.7 + flashcard CDN block from Phase 2).
//
// Per Phase 0 substrate audit Dimension 3: mirrors established subscriber-
// API pattern from lib/subscriber-api-gate.ts; reuses isLcsSubscriptionActive
// predicate via the `canAccessFlashcard` composition helper.

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const packageSlug = searchParams.get('package');

  if (!packageSlug) {
    return NextResponse.json(
      { error: 'Query parameter `package` is required.' },
      { status: 400 }
    );
  }

  // Fast path: free-tier allowlist match short-circuits without DB lookup.
  if (FREE_TIER_FLASHCARD_PACKAGES.has(packageSlug)) {
    const result: AccessResult = { allowed: true, reason: 'free-tier' };
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    });
  }

  // Slow path: requires session lookup for admin-bypass or active-subscription.
  // Anonymous requests fall through to gated result.
  const token = extractBearerToken(request.headers.get('authorization'));
  let session: { isAdmin: boolean; subscription: { status: string | null; lsSubscriptionId: string | null } | null } | null = null;

  if (token) {
    const payload = verifyAccessToken(token);
    if (payload) {
      const dbSession = await prisma.session.findFirst({
        where: { token, userId: payload.userId, expiresAt: { gt: new Date() } },
        select: {
          user: {
            select: {
              isAdmin: true,
              subscription: { select: { status: true, lsSubscriptionId: true } },
            },
          },
        },
      });
      if (dbSession?.user) {
        session = {
          isAdmin: dbSession.user.isAdmin,
          subscription: dbSession.user.subscription,
        };
      }
    }
  }

  const result = canAccessFlashcard(packageSlug, session);
  return NextResponse.json(result, {
    // Authenticated paths short TTL — subscription state changes need to
    // propagate to clients within 5 min. Anonymous gated paths can cache
    // longer (no per-user state), but for simplicity we use uniform 5-min
    // TTL matching the free-tier path + §15.7 flashcard CDN block.
    headers: { 'Cache-Control': 'public, max-age=300' },
  });
}
