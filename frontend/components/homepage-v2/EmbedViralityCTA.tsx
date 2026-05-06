import { getTranslations } from 'next-intl/server';
import { getFeaturedDeckForLocale } from '@/lib/featured-deck-by-locale';
import type { SupportedLocale } from '@/config/locales';

/**
 * EmbedViralityCTA — Alt A above-the-fold first-class surface for the §1
 * SEO + embed-virality acquisition flywheel per Arc 2 A4 operator-locked
 * adjudication (2026-05-06).
 *
 * Communicates the platform's most distinctive free-side capability — that
 * any worksheet can be embedded on the visitor's own classroom blog or
 * school site — and routes the visitor to a representative deck where the
 * in-deck "Embed this" affordance (Layer 2 shipped at `e8cec493`) is one
 * click away.
 *
 * URL pattern per A4 lock:
 *   - Per-locale featured-deck target via `getFeaturedDeckForLocale(locale)`
 *     (extracted from breadth-grid-selection.ts featured-tile resolution
 *     so the same deck the BreadthGrid features is the one this CTA links
 *     to, keeping featured-deck choice coherent across surfaces).
 *   - Fallback to `/<locale>/` (locale-rooted catalog home) if the featured-
 *     deck query returns null.
 *   - `?embed=open` query param appended so the receiving deck.html can
 *     auto-open the embed overlay on landing. The receiving-side handler
 *     in buildEmbedAffordance (Layer 2) is a small `[FIX][EMBED]` follow-on
 *     to be done alongside Arc 2's deploy or shortly after — the param is
 *     harmless if the deck doesn't yet recognize it.
 *
 * Tier-neutral per locked decision #31 (Arc 2 A4 + prior session). Embed
 * is free for any visitor; no signup gate; the CTA is acquisition-flywheel
 * top-of-funnel, not subscription-conversion.
 *
 * SSR-rendered to maximize crawler-readability per §17.4 SEO doctrine —
 * the visible <a href> outside any iframe is the backlink surface per the
 * §17.8 backlink-vs-visibility distinction.
 *
 * Visual treatment (Arc 2 A4 spec): distinct enough to read as a CTA but
 * does NOT compete with hero h1 in importance hierarchy. Arc 3 will
 * adjudicate exact above-fold placement; this component is component-level
 * only.
 */
export default async function EmbedViralityCTA({ locale }: { locale: SupportedLocale }) {
  const t = await getTranslations({ locale, namespace: 'homepage.embedViralityCTA' });
  const featured = await getFeaturedDeckForLocale(locale);

  const href = featured
    ? `/${featured.language}/decks/${featured.slug}/?embed=open`
    : `/${locale}/`;

  return (
    <section
      id="embed-virality-cta"
      className="container mx-auto px-4 max-w-6xl py-8 md:py-10"
      aria-labelledby="embed-virality-cta-heading"
    >
      <div className="rounded-xl border border-cream-300 bg-cream-100 px-6 py-6 md:px-8 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="max-w-2xl">
          <h2
            id="embed-virality-cta-heading"
            className="font-display font-semibold text-xl md:text-2xl text-ink-900 tracking-tight"
          >
            {t('heading')}
          </h2>
          <p className="mt-2 text-base text-ink-600 leading-relaxed">
            {t('intro')}
          </p>
        </div>
        <div className="flex-shrink-0">
          <a
            href={href}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-ink-900 text-cream-50 font-semibold text-sm md:text-base hover:bg-ink-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100"
          >
            <span>{t('buttonLabel')}</span>
            {/* Right-arrow chevron — visual affordance for "go to deck". Inline
                SVG keeps the component self-contained and currentColor-friendly. */}
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
