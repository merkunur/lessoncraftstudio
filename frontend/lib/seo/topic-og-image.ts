/**
 * The og:image for a topic hub — a picture of something actually on the page.
 *
 * Until now every topic hub emitted the same brand asset, `/og-homepage.png`:
 * one image shared by ~5,000 pages, on the section Google crawls most (41% of
 * all successful Googlebot fetches, measured 19-20 Jul 2026). A hub that shows
 * 24 worksheets can do better than a logo, and at no asset cost — each deck
 * already carries a real 1200×630 composite next to it on disk, written at
 * publish time (§17.8.19).
 *
 * So the hub adopts the composite of the FIRST deck in its own grid: the same
 * deck a visitor sees top-left, which makes the social preview and the page
 * agree with each other.
 *
 * Fails closed. A hub with no decks (or any lookup that comes back empty) keeps
 * the brand image, so no page can end up with no image at all.
 */
import { deckAssets } from '@/lib/seo/landing-content';
import { fetchLeadDeckForAxes } from '@/lib/topic-decks';
import { buildOgImageAlt } from '@/lib/deck-seo';
import { CANONICAL_HOST } from '@/lib/seo/url';
import type { Axis } from '@/lib/taxonomy';

export interface TopicOgImage {
  url: string;
  width: number;
  height: number;
  type: string;
  alt: string;
}

const BRAND_FALLBACK: TopicOgImage = {
  url: `${CANONICAL_HOST}/og-homepage.png`,
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'LessonCraftStudio — K-3 worksheets in 11 languages',
};

/**
 * Resolve the og:image for a topic hub defined by one or more axes.
 *
 * @param axes    the hub's axes — one for a single-axis hub, two for an
 *                intersection hub (§16.5.3), applied conjunctively.
 * @param locale  the page locale (also the deck language).
 * @param t       translator bound to the `seo.ogImageAlt` namespace, used to
 *                describe the chosen deck in the page's own language. Omit to
 *                fall back to the brand alt text.
 */
export async function topicOgImage(
  axes: Array<{ axis: Axis; axisKey: string }>,
  locale: string,
  t?: (key: string, params: Record<string, string>) => string,
): Promise<TopicOgImage> {
  try {
    return ogImageFromLeadDeck(await fetchLeadDeckForAxes(axes, locale), locale, t);
  } catch {
    // Metadata must never be the reason a page fails to render.
    return BRAND_FALLBACK;
  }
}

/** Lead deck for a hub whose membership is a subject×grade pair, not axes. */
export type LeadDeck = {
  slug: string; exerciseType: string; ageRange: string; subjectTags: string[]; title: unknown;
} | null;

/**
 * Turn a hub's lead deck into its og:image. Split out from topicOgImage so hubs
 * with their own membership query (subject×grade) can share the same shape.
 */
export function ogImageFromLeadDeck(
  lead: LeadDeck,
  locale: string,
  t?: (key: string, params: Record<string, string>) => string,
): TopicOgImage {
  if (!lead?.slug) return BRAND_FALLBACK;

  // Slug-derived, never the stored URL columns — those lag a re-slug and 404
  // for ~8.8k non-EN decks (§8.1 asset-URL rule).
  const url = deckAssets(locale, lead.slug).ogImage;

  let alt = BRAND_FALLBACK.alt;
  if (t) {
    try {
      const title = typeof lead.title === 'string'
        ? lead.title
        : ((lead.title as Record<string, string> | null)?.[locale] ?? '');
      const built = buildOgImageAlt(
        {
          exerciseType: lead.exerciseType,
          subjectTags: lead.subjectTags ?? [],
          ageRange: lead.ageRange,
          title,
        },
        locale,
        t,
      );
      if (built) alt = built;
    } catch { /* keep the brand alt rather than lose the image */ }
  }

  return { url, width: 1200, height: 630, type: 'image/png', alt };
}

export { BRAND_FALLBACK as brandOgImage };
