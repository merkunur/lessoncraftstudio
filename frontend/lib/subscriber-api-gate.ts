import { NextRequest, NextResponse } from 'next/server';
import { extractBearerToken, verifyAccessToken } from './auth-utils';
import { prisma } from './prisma';
import { isLcsSubscriptionActive } from './subscription-helpers';

// Subscriber-API gate: Bearer auth + active LCS subscription check.
//
// Tool 1A (Collections, commit landing this pass) establishes this pattern.
// Tools 2/5/3/4 + Pillar 1 (lesson plan content) + Pillar 2 (bundles) inherit
// per project_pillar3_tool1_collections_recon.md HAS-3 (filed deferred for
// post-Tool-1 doctrine codification).
//
// Composes the existing Bearer-token + session lookup pattern (mirroring
// lib/auth-middleware.ts withAuth and app/api/auth/me/route.ts) with the
// isLcsSubscriptionActive predicate from lib/subscription-helpers.ts.
//
// Return discipline: returns EITHER a NextResponse error (401 unauthenticated /
// 403 not subscribed) OR a context object with { userId, user }. Caller pattern:
//
//   const gate = await requireSubscriber(request);
//   if (gate instanceof NextResponse) return gate;
//   const { userId, user } = gate;
//   // ...domain logic
//
// Grace-period note: isLcsSubscriptionActive does NOT honor the 60-day grace
// period documented in CLAUDE.md §7. Tool 1A inherits the existing predicate;
// the grace-period extension is filed in project_deferred_items_queue.md
// (HAS-1 entry).

interface SubscriberContext {
  userId: string;
  user: {
    id: string;
    email: string;
    subscription: {
      status: string | null;
      lsSubscriptionId: string | null;
    } | null;
  };
}

export async function requireSubscriber(
  request: NextRequest
): Promise<NextResponse | SubscriberContext> {
  const token = extractBearerToken(request.headers.get('authorization'));
  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  const payload = verifyAccessToken(token);
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  const session = await prisma.session.findFirst({
    where: {
      token,
      userId: payload.userId,
      expiresAt: { gt: new Date() },
    },
  });
  if (!session) {
    return NextResponse.json(
      { error: 'Session expired or revoked. Please sign in again.' },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      subscription: {
        select: {
          status: true,
          lsSubscriptionId: true,
        },
      },
    },
  });
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 401 }
    );
  }

  if (!isLcsSubscriptionActive(user)) {
    return NextResponse.json(
      { error: 'Active subscription required' },
      { status: 403 }
    );
  }

  return { userId: user.id, user };
}

// Ownership-check helper for Collection-scoped routes. Returns 404 (not 403)
// on mismatch — hides existence per the standard convention surfaced in the
// recon. Returns the Collection row on success.
//
// Usage:
//   const collectionOrError = await getOwnedCollectionOrFail(id, userId);
//   if (collectionOrError instanceof NextResponse) return collectionOrError;
//   const collection = collectionOrError;
export async function getOwnedCollectionOrFail(
  collectionId: string,
  userId: string
) {
  const collection = await prisma.collection.findFirst({
    where: { id: collectionId, teacherId: userId },
  });
  if (!collection) {
    return NextResponse.json(
      { error: 'Collection not found' },
      { status: 404 }
    );
  }
  return collection;
}
