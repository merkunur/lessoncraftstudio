// Story Studio tenancy — ownership + share-link helpers.
// Mirrors getOwnedCollectionOrFail (lib/subscriber-api-gate.ts): 404 on
// mismatch to hide existence.

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '../prisma';
import { requireSubscriber } from '../subscriber-api-gate';
import { isLcsSubscriptionActive } from '../subscription-helpers';
import type { StudioLinkKind } from './config';

/**
 * The Studio's own gate: authenticated AND actively subscribed (admin
 * bypass per isLcsSubscriptionActive). requireSubscriber alone only
 * authenticates — Collections went sign-in-only in the free pivot, but the
 * Story Studio is premium class #3 and must enforce the tier.
 */
export async function requireStudioSubscriber(request: NextRequest) {
  const gate = await requireSubscriber(request);
  if (gate instanceof NextResponse) return gate;
  if (!isLcsSubscriptionActive(gate.user)) {
    return NextResponse.json(
      { error: 'subscription_required', message: 'The Story Studio is part of the Teacher plan.' },
      { status: 403 }
    );
  }
  return gate;
}

export async function getOwnedStudioStoryOrFail(storyId: string, userId: string) {
  const story = await prisma.studioStory.findFirst({
    where: { id: storyId, teacherId: userId, status: { not: 'deleted' } },
  });
  if (!story) {
    return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  }
  return story;
}

/** 12-char unguessable alphanumeric link id (PlayLink precedent, one wider). */
export function generateLinkId(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const bytes = crypto.randomBytes(12);
  let out = '';
  for (let i = 0; i < 12; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

/** Find the story's live preview link, creating one if absent. */
export async function ensurePreviewLink(storyId: string, teacherId: string) {
  const existing = await prisma.studioShareLink.findFirst({
    where: { storyId, kind: 'preview', revokedAt: null },
  });
  if (existing) return existing;
  return prisma.studioShareLink.create({
    data: { linkId: generateLinkId(), storyId, teacherId, kind: 'preview' as StudioLinkKind },
  });
}

/**
 * Resolve a play link for the accountless /api/play routes. Returns null for
 * unknown/revoked links and deleted stories.
 */
export async function resolvePlayLink(linkId: string) {
  if (!/^[A-Za-z0-9]{10,16}$/.test(linkId)) return null;
  const link = await prisma.studioShareLink.findUnique({
    where: { linkId },
    include: {
      story: {
        select: {
          id: true,
          teacherId: true,
          title: true,
          status: true,
          locale: true,
          storyJson: true,
          stringsJson: true,
        },
      },
    },
  });
  if (!link || link.revokedAt || !link.story || link.story.status === 'deleted') return null;
  return link;
}
