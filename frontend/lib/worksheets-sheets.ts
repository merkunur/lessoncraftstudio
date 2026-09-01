/**
 * worksheets-sheets.ts — expands the /worksheets hub from one row per LANDING
 * page to one row per actual WORKSHEET.
 *
 * Why: a landing page can stand in for many sheets. `Landing.collapseSiblings`
 * holds the decks a landing collapses, and those decks were reachable only from
 * the landing's "More versions of this worksheet" thumbnail row — never from
 * the hub, and never counted in its facets. Measured on the en corpus: the
 * seven families below ship 33 landings covering 322 published worksheets, so
 * filtering the hub by "Arrays and Multiplication" returned 2 of 27.
 *
 * How: each collapsed sibling becomes a synthetic row carrying its PARENT
 * landing's coordinate (type / theme / level — already locale-native, so no
 * mapping is invented) plus its own DB title and its own deck URL. Everything
 * downstream — applyLandingFilters, buildLandingFacets, sortLandings,
 * WorksheetCatalogCard — keys off coordinate/slug/h1/canonicalDeckSlug, so the
 * synthetic rows flow through unchanged and the counts become truthful.
 *
 * These rows link to `/<locale>/decks/<slug>/`, which nginx serves (§15.7) —
 * hence `deckHref`, which the card must render as a plain <a>. A Next <Link>
 * would client-side route to an app route that does not exist.
 *
 * No SEO surface changes: deck pages are already indexable and already carry
 * their own sitemap shards. This is a browse/discovery fix only.
 */
import type { Landing } from '@/lib/seo/landing-content';

/**
 * Families whose landings are expanded into their individual sheets.
 *
 * Scoped to the seven the operator named. The mechanism is family-agnostic —
 * the same collapse affects 25 of 53 types (measured en: 3,918 landings over
 * 4,976 decks, 1,058 sheets hidden; worst are missing-pieces 242, grid-match
 * 105, more-less 104). Extending is adding keys here.
 */
export const SHEET_EXPANDED_TYPES: ReadonlySet<string> = new Set([
  'arrays-multiplication',
  'fractions',
  'geometry',
  'graphing-data',
  'number-charts',
  'measurement',
  'telling-time',
]);

/** A hub row: a landing, or one of the worksheets a landing collapses. */
export type HubRow = Landing & {
  /** Set only on expanded sheet rows — the nginx deck URL, needs a plain <a>. */
  deckHref?: string;
};

/**
 * Deck slugs an expanded family collapses, excluding each landing's own
 * canonicalDeckSlug (already represented by the landing row itself).
 *
 * Note this also implements "except for the last batch" for measurement and
 * telling-time at no cost: the nt20/VAR landings (capacity-and-mass,
 * draw-the-clock-hands and their variations) collapse nothing, so they
 * contribute no siblings and stay exactly as they are — one landing each.
 */
export function collapsedSheetSlugs(landings: Landing[]): string[] {
  const own = new Set<string>();
  const out = new Set<string>();
  for (const l of landings) {
    if (!SHEET_EXPANDED_TYPES.has(l.coordinate.type)) continue;
    own.add(l.canonicalDeckSlug);
  }
  for (const l of landings) {
    if (!SHEET_EXPANDED_TYPES.has(l.coordinate.type)) continue;
    for (const s of l.collapseSiblings || []) if (!own.has(s)) out.add(s);
  }
  return [...out];
}

/**
 * Landings + one row per collapsed sheet that resolved a title.
 *
 * A sheet with no title in `titleBySlug` is DROPPED rather than shown under an
 * invented name — if the DB read fails the hub degrades to exactly today's
 * behaviour instead of rendering placeholder cards.
 */
export function expandHubRows(
  landings: Landing[],
  titleBySlug: Map<string, string>,
  deckHrefOf: (slug: string) => string,
): HubRow[] {
  if (titleBySlug.size === 0) return landings;
  const own = new Set(
    landings.filter((l) => SHEET_EXPANDED_TYPES.has(l.coordinate.type)).map((l) => l.canonicalDeckSlug),
  );
  const seen = new Set<string>();
  const sheets: HubRow[] = [];
  for (const l of landings) {
    if (!SHEET_EXPANDED_TYPES.has(l.coordinate.type)) continue;
    for (const slug of l.collapseSiblings || []) {
      if (own.has(slug) || seen.has(slug)) continue;
      const title = titleBySlug.get(slug);
      if (!title) continue;
      seen.add(slug);
      sheets.push({
        ...l,
        slug,
        variantShape: 'singleton',
        h1: title,
        canonicalDeckSlug: slug,
        collapseSiblings: [],
        deckHref: deckHrefOf(slug),
      });
    }
  }
  return [...landings, ...sheets];
}
