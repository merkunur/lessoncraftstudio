/**
 * The ONE metered download href. Every surface that offers a deck's PDF or
 * answer key links through /api/quota/dl (frontend/lib/quota.ts policy): the
 * proxy 302s subscribers and crawlers to the file and meters everyone else.
 * A raw file link anywhere is a hole in the monthly allowance.
 *
 * Byte-identical to the static landings' dlHref (scripts/seo-landing/
 * render-landing-html.js) and scripts/lib/deck-actions.js, minus the host.
 */
export function dlHref(locale: string, deckSlug: string, kind: 'pdf' | 'answer'): string {
  return `/api/quota/dl?loc=${encodeURIComponent(locale)}&slug=${encodeURIComponent(deckSlug)}&kind=${kind}`;
}
