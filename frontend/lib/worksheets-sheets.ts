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
  /**
   * Whether this worksheet actually HAS an answer key. Null-preserving, read
   * from `Deck.answerKeyUrl` — the same signal `canonicalDeckAssets` uses. The
   * card hides the Answer key link when false. NOTE this is a different
   * question from "is it interactive", which is a property of the exercise TYPE
   * (config/interactive-exercise-types.ts) and needs no database at all.
   */
  hasAnswerKey?: boolean;
  /**
   * Set only on Level Set rows of a type whose Level Set decks ship a screen version
   * (config/interactive-level-set-types.ts). Wins over the type-level print-only mark:
   * the type's published deck is printable, these copies are interactive.
   */
  interactive?: boolean;
};

/** A row is print-only unless it is an interactive Level Set row, else by its type. */
export function rowIsPrintOnly(l: HubRow, isPrintOnlyType: (type: string) => boolean): boolean {
  return l.interactive ? false : isPrintOnlyType(l.coordinate.type);
}

/**
 * What the hub knows about one deck row, keyed by slug.
 *
 * No deck id: downloads go through the SLUG-keyed metered proxy
 * (/api/quota/dl?loc=&slug=&kind=), the same one the static landing pages
 * already use, so a card can offer its PDF without resolving a database row
 * at all.
 */
export interface DeckFacts {
  title: string;
  hasAnswerKey: boolean;
  /**
   * The deck's OWN theme (`Deck.subjectTags[0]`): null when the deck has none, undefined when
   * the caller did not read it. A collapsed sheet is not always its parent landing's theme —
   * measured on en 2026-10-18, 130 were not, and the theme filter showed them anyway.
   */
  theme?: string | null;
}

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
  // A DECK title's " — " suffix is its stored theme name, which can carry a picture-set
  // variant ("Animals BW 4", "Birds 2"). Show the clean theme name instead (2026-10-18).
  const i = title.indexOf(' — ');
  if (i > 0) return `${title.slice(0, i)} — ${label}`;
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
  factsBySlug: Map<string, DeckFacts>,
  deckHrefOf: (slug: string) => string,
  themeLabelOf: (themeKey: string) => string = () => '',
): HubRow[] {
  // Landing rows carry their own deck's answer-key fact so the card knows
  // whether to offer an Answer key link at all; a missing fact leaves the row
  // intact and the card falls back to the exercise type, which answers the same
  // question exactly (no exercise type mixes the two).
  /* WHICH theme a row is filed under (2026-10-18). A deck's own tag is the truth
     wherever the type's tags VARY: read on thumbnails, the en/es/pt treasure-hunt
     landings name the wrong theme ("Accessories" on an Easter grid) while their
     deck tags are right. Where every landing deck of a type carries ONE tag, the
     app stamped it (es chart-count: all "accessories"; pt: all "4th_of_july") and
     the curated landing coordinate is the truth. */
  const tagsOfType = new Map<string, Set<string>>();
  for (const l of landings) {
    const t = factsBySlug.get(l.canonicalDeckSlug)?.theme;
    if (!t) continue;
    if (!tagsOfType.has(l.coordinate.type)) tagsOfType.set(l.coordinate.type, new Set());
    tagsOfType.get(l.coordinate.type)!.add(t);
  }
  const trustTags = (type: string) => (tagsOfType.get(type)?.size ?? 0) > 1;
  const decorate = (l: Landing): HubRow => {
    const f = factsBySlug.get(l.canonicalDeckSlug);
    if (!f) return l;
    const theme = f.theme && trustTags(l.coordinate.type) ? f.theme : l.coordinate.theme;
    // A refiled card also drops the landing h1 that names the wrong theme: the card says
    // what the sheet shows (the landing page itself is left as it is).
    return theme === l.coordinate.theme
      ? { ...l, hasAnswerKey: f.hasAnswerKey }
      : { ...l, coordinate: { ...l.coordinate, theme }, h1: withTheme(f.title, theme, themeLabelOf), hasAnswerKey: f.hasAnswerKey };
  };
  if (factsBySlug.size === 0) return landings;

  const own = new Set(landings.map((l) => l.canonicalDeckSlug));
  const seen = new Set<string>();
  const sheets: HubRow[] = [];
  for (const l of landings) {
    for (const slug of l.collapseSiblings || []) {
      if (own.has(slug) || seen.has(slug)) continue;
      const f = factsBySlug.get(slug);
      if (!f) continue;
      seen.add(slug);
      // The sheet's own theme when the deck carries a trustworthy one; else the parent's.
      const theme = f.theme && trustTags(l.coordinate.type) ? f.theme : l.coordinate.theme;
      sheets.push({
        ...l,
        coordinate: { ...l.coordinate, theme },
        slug,
        variantShape: 'singleton',
        h1: withTheme(f.title, theme, themeLabelOf),
        canonicalDeckSlug: slug,
        collapseSiblings: [],
        deckHref: deckHrefOf(slug),
        hasAnswerKey: f.hasAnswerKey,
      });
    }
  }
  return [...landings.map(decorate), ...sheets];
}

/** A Level Set deck read from the DB: visible to teachers, never indexed, no landing. */
export interface LevelSetDeck {
  slug: string;
  title: string;
  /** The deck's own theme key (`Deck.subjectTags[0]`), null when themeless. */
  theme?: string | null;
  exerciseMode: string | null;
  hasAnswerKey: boolean;
  /** The deck ships an interactive screen version (its type is in INTERACTIVE_LEVEL_SET_TYPES). */
  interactive?: boolean;
}

/**
 * The copy number a Level Set slug carries: `…-k323` is copy 1, `…-k323-4`
 * copy 4 (the generator's variant_id suffix). Only that shape counts, so a
 * slug that merely ends in a digit is read as copy 1.
 */
export function levelSetCopy(slug: string): number {
  const m = /-(?:k|g\d)\d{3}-(\d+)$/.exec(slug);
  return m ? Number(m[1]) : 1;
}

/** The variation code a worksheet slug ends with (`…-k344`, `…-k344-3` → "k344"); null when absent. */
export function variationCode(slug: string): string | null {
  const m = /-((?:k|g\d)\d{3})(?:-\d+)?$/.exec(slug);
  return m ? m[1] : null;
}

/**
 * Rows for the Level Set worksheets (do-not-index marker, no landing page) of
 * ONE exercise type, shown on the hub only when that type is chosen
 * (operator ruling 2026-09-27: the default hub page stays exactly as indexed).
 *
 * Each row borrows the type's first landing for its coordinate — the same
 * trick expandHubRows uses for collapsed siblings — and links to the deck page.
 * The stored title is the type title alone, identical for every level and
 * copy, so the card label adds the level word (the taxonomy's own localized
 * exercise-mode name) and the copy number: "Das bin ich · Leicht · Satz 2".
 */
export function levelSetRows(
  typeLandings: Landing[],
  decks: LevelSetDeck[],
  deckHrefOf: (slug: string) => string,
  modeNameOf: (mode: string) => string | null,
  setWord: string,
  /** Clean theme name of a theme key; when given, the card title shows it instead of the stored variant name. */
  themeLabelOf?: (themeKey: string) => string,
): HubRow[] {
  // Each card borrows the landing of its OWN variation (same code, e.g. k344),
  // so it carries that variation's mode: the hub arranger spreads by mode, and
  // two copies of one variation never share a row (operator standing rule
  // 2026-09-27). A variation without a landing falls back to the first one.
  const byCode = new Map<string, Landing>();
  for (const l of typeLandings) {
    const c = variationCode(l.canonicalDeckSlug);
    if (c && !byCode.has(c)) byCode.set(c, l);
  }
  return decks.map((d) => {
    const parent = byCode.get(variationCode(d.slug) || '') || typeLandings[0];
    const mode = d.exerciseMode ? modeNameOf(d.exerciseMode) : null;
    const n = levelSetCopy(d.slug);
    // With a theme the card is told apart by its theme; a copy number ("Set 112") is
    // the generator's counter, not something a teacher can use, so it stays off themed cards.
    const themed = Boolean(themeLabelOf && d.theme);
    // On the hub a copy whose face HAS a landing carries that landing's title — the set's name
    // ("Fact Families to 10: Four Houses, …") — so different faces of one type never read as
    // duplicates ("Fact Family Houses · Easy" three times in a row, review 2026-10-18).
    const ownFace = byCode.get(variationCode(d.slug) || '');
    const base = themeLabelOf && ownFace ? ownFace.h1 : d.title;
    const label0 = themed ? themeLabelOf!(d.theme as string) : '';
    const title = !themed ? base
      : ownFace ? (label0 && !base.toLowerCase().includes(label0.toLowerCase()) ? `${base} — ${label0}` : base)
        : withTheme(d.title, d.theme as string, themeLabelOf!);
    // On the hub (themeLabelOf given) no copy number at all: "Set 10" is the generator's
    // counter across levels, which a teacher reads as noise (review 2026-10-18). Inside a
    // Level Set view the pages are numbered by position instead (LevelSetView).
    const label = [title, mode, n > 1 && !themeLabelOf ? `${setWord} ${n}` : null].filter(Boolean).join(' · ');
    return {
      ...parent,
      // Its OWN theme, never the borrowed landing's: build-waves picks a theme per
      // face x level x copy, so 38% of en copies differed from the landing they borrow.
      coordinate: { ...parent.coordinate, theme: d.theme === undefined ? parent.coordinate.theme : (d.theme || '') },
      slug: d.slug,
      variantShape: 'singleton',
      h1: label,
      canonicalDeckSlug: d.slug,
      collapseSiblings: [],
      deckHref: deckHrefOf(d.slug),
      hasAnswerKey: d.hasAnswerKey,
      ...(d.interactive ? { interactive: true } : {}),
    };
  });
}
