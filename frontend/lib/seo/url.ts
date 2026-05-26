/**
 * SEO URL helpers — single source of truth for canonical absolute URLs.
 *
 * Two invariants enforced here:
 *   1. Canonical host is `www.lessoncraftstudio.com` (per CLAUDE.md §A.10).
 *   2. NO trailing slash on Next.js-route URLs — matches `next.config.js:
 *      trailingSlash: false`. The framework 308-redirects with-slash → no-slash
 *      at the request layer; emitting canonical/hreflang/og:url with a trailing
 *      slash creates a `canonical → 308` chain that wastes crawl signal.
 *
 * Carve-out: deck.html URLs (`/<locale>/decks/<slug>/`) are nginx-served and
 * trailing-slash-strict (per CLAUDE.md §15.7). Do NOT route those through
 * canonicalUrl() — they keep their trailing slash. Use the existing inline
 * concatenation in `app/sitemap/0.xml/route.ts` / `1.xml/route.ts` for those.
 *
 * Cross-references:
 *   - frontend/next.config.js:25 (`trailingSlash: false`)
 *   - frontend/middleware.ts:158-162 (non-www → www 301)
 *   - frontend/app/layout.tsx:38 (`metadataBase`)
 */

export const CANONICAL_HOST = 'https://www.lessoncraftstudio.com';

/**
 * Build a canonical absolute URL. Strips trailing slashes; canonical host
 * comes from CANONICAL_HOST. The site root stays "/".
 *
 * Examples:
 *   canonicalUrl("/en")                       → "https://www.lessoncraftstudio.com/en"
 *   canonicalUrl("/en/topic/animals")         → "https://www.lessoncraftstudio.com/en/topic/animals"
 *   canonicalUrl("/en/topic/animals/")        → "https://www.lessoncraftstudio.com/en/topic/animals"
 *   canonicalUrl("/")                         → "https://www.lessoncraftstudio.com/"
 */
export function canonicalUrl(path: string): string {
  const stripped = path.replace(/\/+$/, '');
  const clean = stripped === '' ? '/' : stripped;
  return new URL(clean, CANONICAL_HOST).toString();
}

/**
 * Build a locale-rooted path with NO trailing slash. The locale segment is
 * always first; subsequent segments are joined with "/" and the result has
 * no trailing slash. Empty segments are dropped.
 *
 * Examples:
 *   localePath("en")                        → "/en"
 *   localePath("en", "topic", "animals")    → "/en/topic/animals"
 *   localePath("de", "worksheets")          → "/de/worksheets"
 *   localePath("fi", "about")               → "/fi/about"
 */
export function localePath(locale: string, ...segments: string[]): string {
  const tail = segments.filter(Boolean).join('/');
  return tail ? `/${locale}/${tail}` : `/${locale}`;
}
