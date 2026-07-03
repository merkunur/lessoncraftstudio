// Story Studio tenancy — asset-byte quota bookkeeping.
// assetBytes is maintained incrementally on every binary write/delete;
// scripts/studio/reconcile-quota.js recomputes from the filesystem to repair
// any drift.

import { NextResponse } from 'next/server';
import { prisma } from '../prisma';
import { STUDIO_QUOTAS } from './config';

/**
 * Pre-write check: would adding `incomingBytes` exceed the story's quota?
 * Returns a NextResponse (413) to short-circuit with, or null when OK.
 */
export function checkAssetQuota(currentBytes: number, incomingBytes: number): NextResponse | null {
  if (currentBytes + incomingBytes > STUDIO_QUOTAS.MAX_ASSET_BYTES_PER_STORY) {
    const mb = Math.round(STUDIO_QUOTAS.MAX_ASSET_BYTES_PER_STORY / (1024 * 1024));
    return NextResponse.json(
      { error: `This story is out of space (${mb} MB limit). Remove some pictures or exercises first.` },
      { status: 413 }
    );
  }
  return null;
}

/** Record bytes written (or a negative delta for deletions). */
export async function addAssetBytes(storyId: string, delta: number) {
  await prisma.studioStory.update({
    where: { id: storyId },
    data: { assetBytes: { increment: delta } },
  });
}
