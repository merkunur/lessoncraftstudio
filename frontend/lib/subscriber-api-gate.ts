import { NextRequest, NextResponse } from 'next/server';
import { extractBearerToken, verifyAccessToken } from './auth-utils';
import { prisma } from './prisma';
import { isSubscriptionUsable } from './entitlements';

// API gates for authenticated + subscriber-only surfaces.
//
// HISTORY NOTE (2026-07-11 subscription launch): the original export here was
// named `requireSubscriber` but only ever enforced AUTHENTICATION (the header
// comment claimed a subscription check that was never implemented). It is now
// honestly named `requireAuthenticatedUser`; the real tier gate is
// `requireActiveSubscriber` below (auth + isSubscriptionUsable — 14-day
// dunning grace + paid-through-cancellation, see lib/entitlements.ts).
// `requireSubscriber` remains as a deprecated alias for one release.
//
// Return discipline: returns EITHER a NextResponse error (401 unauthenticated /
// 403 subscription_required) OR a context object with { userId, user }:
//
//   const gate = await requireActiveSubscriber(request);
//   if (gate instanceof NextResponse) return gate;
//   const { userId, user } = gate;
//   // ...domain logic

interface SubscriberContext {
  userId: string;
  user: {
    id: string;
    email: string;
    isAdmin: boolean;
    subscription: {
      status: string | null;
      lsSubscriptionId: string | null;
      pastDueAt: Date | null;
      currentPeriodEnd: Date | null;
    } | null;
  };
}

export async function requireAuthenticatedUser(
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

  // Keep actively-working sessions out of the sign-in route's 24h idle sweep:
  // lastActivityAt otherwise only updates on refresh/sign-in, so a teacher
  // editing in the Studio for hours looks "idle" and gets reaped by their next
  // sign-in elsewhere. Fire-and-forget, throttled to once per hour per session.
  if (session.lastActivityAt < new Date(Date.now() - 60 * 60 * 1000)) {
    prisma.session
      .update({ where: { id: session.id }, data: { lastActivityAt: new Date() } })
      .catch(() => {});
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      isAdmin: true,
      subscription: {
        select: {
          status: true,
          lsSubscriptionId: true,
          pastDueAt: true,
          currentPeriodEnd: true,
        },
      },
    },
  });
  if (!user) {
    return NextResponse.json(
      { error: 'Sign-in required' },
      { status: 401 }
    );
  }

  return { userId: user.id, user };
}

/** @deprecated Renamed 2026-07-11 — this gate is auth-only. Use
 * `requireAuthenticatedUser`, or `requireActiveSubscriber` for tier gating. */
export const requireSubscriber = requireAuthenticatedUser;

/**
 * The real tier gate: authentication + a usable subscription
 * (active / dunning-grace / paid-through-cancellation, admin bypass).
 * 403 body carries `error: 'subscription_required'` so client components can
 * render the upsell state instead of a generic failure.
 */
export async function requireActiveSubscriber(
  request: NextRequest
): Promise<NextResponse | SubscriberContext> {
  const gate = await requireAuthenticatedUser(request);
  if (gate instanceof NextResponse) return gate;
  if (!isSubscriptionUsable(gate.user)) {
    return NextResponse.json(
      { error: 'subscription_required' },
      { status: 403 }
    );
  }
  return gate;
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
