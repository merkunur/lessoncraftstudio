// Story Studio tenancy — asset-URL rewriting + the save-time src allowlist.
//
// Stored (canonical) form:  /studio-media/<storyId>/<relpath>
// Served (client) form:     /api/play/<linkId>/m/<relpath>
//
// The allowlist is the security keystone: every asset src a tenant story may
// reference is either its OWN /studio-media/<thisStoryId>/ subtree or a
// public platform prefix — cross-tenant reference and traversal are
// structurally impossible at save time, so the media route never needs to
// reason about them.

import {
  STUDIO_CANONICAL_PREFIX,
  STUDIO_PLAY_API_PREFIX,
  STUDIO_PUBLIC_SRC_PREFIXES,
} from './config';

const PLAY_MEDIA_RE = /^\/api\/play\/[A-Za-z0-9]+\/m\//;

function deepMapStrings(value: unknown, fn: (s: string) => string): unknown {
  if (typeof value === 'string') return fn(value);
  if (Array.isArray(value)) return value.map(v => deepMapStrings(v, fn));
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(value as Record<string, unknown>)) {
      out[k] = deepMapStrings((value as Record<string, unknown>)[k], fn);
    }
    return out;
  }
  return value;
}

/** Canonical → served: point this story's binaries at the given link. */
export function toClientUrls<T>(json: T, storyId: string, linkId: string): T {
  const canonical = STUDIO_CANONICAL_PREFIX + storyId + '/';
  const served = STUDIO_PLAY_API_PREFIX + linkId + '/m/';
  return deepMapStrings(json, s =>
    s.startsWith(canonical) ? served + s.slice(canonical.length) : s
  ) as T;
}

/** Served → canonical: normalize any /api/play/<anyLink>/m/ prefix back (links rotate). */
export function toCanonicalUrls<T>(json: T, storyId: string): T {
  const canonical = STUDIO_CANONICAL_PREFIX + storyId + '/';
  return deepMapStrings(json, s => {
    const m = s.match(PLAY_MEDIA_RE);
    return m ? canonical + s.slice(m[0].length) : s;
  }) as T;
}

export interface SrcViolation {
  where: string;
  src: string;
}

/**
 * Save-time gate. Walks story.assets (the sb-1 asset table — the single
 * place binary URLs live) plus sb-worksheet-exercise package paths, and
 * reports anything outside the allowlist:
 *   /studio-media/<thisStoryId>/…   (own tenant binaries)
 *   /mini-tools/…                    (platform: operator stories, storybook-library)
 *   /image-library-webp/…            (props)
 *   relative exercise packages 'exercises/<id>' (resolve under the story base)
 */
export function findSrcViolations(story: any, storyId: string): SrcViolation[] {
  const violations: SrcViolation[] = [];
  const ownPrefix = STUDIO_CANONICAL_PREFIX + storyId + '/';

  const okAbsolute = (s: string) =>
    (s.startsWith(ownPrefix) && !s.includes('..')) ||
    STUDIO_PUBLIC_SRC_PREFIXES.some(p => s.startsWith(p) && !s.includes('..'));

  const assets = (story && story.assets) || {};
  for (const id of Object.keys(assets)) {
    const src = assets[id] && assets[id].src;
    if (typeof src !== 'string' || !okAbsolute(src)) {
      violations.push({ where: 'assets.' + id, src: String(src) });
    }
  }

  const pages = (story && story.pages) || [];
  pages.forEach((pg: any, i: number) => {
    const inter = pg && pg.interaction;
    const pkg = inter && inter.taskData && inter.taskData.package;
    if (typeof pkg !== 'string' || !pkg) return;
    const ok = pkg.startsWith('/')
      ? okAbsolute(pkg)
      : /^exercises\/[A-Za-z0-9._-]+\/?$/.test(pkg);
    if (!ok) violations.push({ where: 'pages[' + i + '].interaction.taskData.package', src: pkg });
  });

  return violations;
}
