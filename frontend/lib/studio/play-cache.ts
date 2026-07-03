// Story Studio tenancy — tiny in-process link cache for the /api/play media
// route. A playing story fires dozens of asset requests; caching the
// link→story resolution for 60s keeps them off Postgres while keeping
// revocation propagation ≤ one TTL.

import { resolvePlayLink } from './story-gate';

interface CacheEntry {
  at: number;
  storyId: string | null; // null = negative (unknown/revoked) — cached too
}

const TTL_MS = 60 * 1000;
const MAX_ENTRIES = 500;
const cache = new Map<string, CacheEntry>();

export async function resolveLinkStoryIdCached(linkId: string): Promise<string | null> {
  const now = Date.now();
  const hit = cache.get(linkId);
  if (hit && now - hit.at < TTL_MS) return hit.storyId;

  const link = await resolvePlayLink(linkId);
  const storyId = link ? link.story.id : null;

  if (cache.size >= MAX_ENTRIES) {
    // Drop the oldest entry (Map preserves insertion order).
    const first = cache.keys().next().value;
    if (first !== undefined) cache.delete(first);
  }
  cache.delete(linkId);
  cache.set(linkId, { at: now, storyId });
  return storyId;
}
