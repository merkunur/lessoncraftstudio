import type { Metadata } from 'next';

/**
 * Shared robots directives for INDEXABLE pages — the single source of truth that
 * mirrors the root layout's robots (frontend/app/layout.tsx).
 *
 * WHY (SEO-recovery 2026-06-25): Next.js MERGES metadata shallowly but a page-level
 * `robots` object REPLACES the root layout's `robots` wholesale. So every page that
 * set `robots: { index: true, follow: true }` silently DROPPED the root's
 * `max-image-preview: 'large'` + `max-snippet: -1` + `max-video-preview: -1`. That
 * suppressed large worksheet-thumbnail previews in Google SERP (the operator's #1
 * visual goal) AND truncated SERP text snippets across ~30k landings + activities +
 * tools + topics + makers. Use this const wherever a page must stay indexable so the
 * full rich-result directives are preserved.
 */
export const INDEXABLE_ROBOTS: Metadata['robots'] = {
  index: true,
  follow: true,
  'max-image-preview': 'large',
  'max-snippet': -1,
  'max-video-preview': -1,
};
