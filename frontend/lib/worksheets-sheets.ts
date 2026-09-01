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
 * The level is INHERITED from the parent landing and deliberately NOT re-derived
 * from the deck's own `ageRange`. Per §22.1 a landing's grade comes from the
 * MECHANIC via the ledger override, not from the age_range tag, and the level is
 * a curated property of the (type, mode) coordinate the siblings share. Measured
 * on en: 117 sheets carry an ageRange whose band differs from the parent's level,
 * and in all 117 the parent's OWN deck differs identically — 0 cases where a
 * sheet genuinely departs from its coordinate. Re-deriving would have replaced
 * the curated band with the raw tag the program exists to override.
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
 * EVERY type is expanded — there is no allowlist.
 *
 * This started scoped to seven families, but the collapse is not special to
 * them: measured across the corpus it hides 5,491 worksheets in 11 locales
 * (en alone 1,058 over 25 of 53 types — missing-pieces showed 48 of 290,
 * grid-match 47 of 152, more-less 52 of 156). An allowlist would have left
 * most of the catalogue unreachable and made the facet counts truthful for
 * seven types and wrong for eighteen.
 *
 * Every sheet resolves: 5,491 of 5,491 have a published deck row with a
 * usable title, so nothing is dropped in practice.
 */

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
  const own = new Set<string>(landings.map((l) => l.canonicalDeckSlug));
  const out = new Set<string>();
  for (const l of landings) {
    for (const s of l.collapseSiblings || []) if (!own.has(s)) out.add(s);
  }
  return [...out];
}

/**
 * Deck titles follow a house convention of `Title — Theme` ("Add It Again —
 * Animals", "Heavy or Light? — Fruits"), but only for the types whose titles
 * were authored that way. The rest carry one generic title for every sheet:
 * measured on en, missing-pieces has 242 sheets under a single "Missing
 * Pieces", grid-match 105 under one, more-less 104, math-puzzle 91. Rendering
 * those as-is is a wall of identical cards, so the theme is appended where the
 * title does not already carry it — normalising to the convention the good
 * titles already use, not inventing a label. That takes missing-pieces from 1
 * distinct card label to 48, grid-match to 34, more-less to 52.
 */
function withTheme(title: string, themeKey: string, themeLabelOf: (k: string) => string): string {
  const label = themeKey ? themeLabelOf(themeKey) : '';
  if (!label) return title;
  return title.toLowerCase().includes(label.toLowerCase()) ? title : `${title} — ${label}`;
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
  themeLabelOf: (themeKey: string) => string = () => '',
): HubRow[] {
  if (titleBySlug.size === 0) return landings;
  const own = new Set(landings.map((l) => l.canonicalDeckSlug));
  const seen = new Set<string>();
  const sheets: HubRow[] = [];
  for (const l of landings) {
    for (const slug of l.collapseSiblings || []) {
      if (own.has(slug) || seen.has(slug)) continue;
      const title = titleBySlug.get(slug);
      if (!title) continue;
      seen.add(slug);
      sheets.push({
        ...l,
        slug,
        variantShape: 'singleton',
        h1: withTheme(title, l.coordinate.theme, themeLabelOf),
        canonicalDeckSlug: slug,
        collapseSiblings: [],
        deckHref: deckHrefOf(slug),
      });
    }
  }
  return [...landings, ...sheets];
}
