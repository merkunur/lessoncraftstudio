/**
 * SEO landing-page content access — Phase 5 pilot (Math × Kindergarten × EN).
 *
 * Reads the gated, ensemble-reviewed pilot copy (frontend/content/seo-landing/en.json,
 * authored against docs/seo-landing/mechanic-ledger-mathK.md, similarity-gated by
 * scripts/seo-landing/gate.js). EN-only this gate; other locales resolve to null →
 * the route 404s for them (pilot is not a fan-out).
 *
 * Deck-asset URLs are derived deterministically from the coordinate's CANONICAL deck
 * slug (earliest-publishedAt per the 4-tuple, precomputed in the content file) using the
 * nginx deck-asset path convention (§15.7 / §15.14): trailing-slash dir, slug-prefixed PDFs.
 * Landing self-URL uses the no-trailing-slash Next convention (§A.10 / next.config).
 */
import enData from '@/content/seo-landing/en.json';
import deData from '@/content/seo-landing/de.json';
import esData from '@/content/seo-landing/es.json';
import svData from '@/content/seo-landing/sv.json';
import nlData from '@/content/seo-landing/nl.json';
import daData from '@/content/seo-landing/da.json';
import { CANONICAL_HOST } from '@/lib/seo/url';

export interface LandingCarouselItem { label: string; href: string }
export interface LandingCoordinate { type: string; mode: string | null; theme: string; level: string }
export interface Landing {
  slug: string;
  variantShape: 'singleton' | 'collapsed';
  coordinate: LandingCoordinate;
  eyebrow: string;
  h1: string;
  strand: string;
  standard?: string; // optional CCSS code (e.g. "K.MD.B.3"); when present the route emits educationalAlignment + a code chip
  /**
   * Optional grade SPAN (ordered low→high), each value a key in the route's LEVELS map
   * (en: preschool|kindergarten|grade-1|grade-2 · de: vorschule|1-klasse|2-klasse).
   * Present ONLY when the worksheet genuinely suits >1 grade (a true boundary sheet);
   * absent → single-band display via coordinate.level (zero change to shipped landings).
   * The route renders a range chip + array educationalLevel + range typicalAgeRange.
   */
  levels?: string[];
  /** Gold per-deck <title> to the winnable query (distinct from the on-page h1); falls back to h1 when absent (en/de single-band entries unchanged). */
  title?: string;
  /** Gold per-deck meta description (authored, demand-aware — NOT a p1 truncation); falls back to truncated p1 when absent. */
  metaDescription?: string;
  p1: string; p2: string; p3: string;
  canonicalDeckSlug: string;
  collapseSiblings?: string[];
  carousel: LandingCarouselItem[];
  /**
   * Optional practice-problem pairs for the schema.org Quiz rich-result (Google
   * "Practice problems"). Present ONLY for families that genuinely qualify (the
   * deck poses ≥2 marked Q/A the child sees — addition/subtraction/math-puzzle/
   * chart-count/more-less; NOT readiness/visual/word-puzzle per fancy-orbit §348).
   * When present (length ≥2) the route emits a third Quiz JSON-LD node. Each `q`
   * MUST mirror what the child SEES on the rendered deck (honest-fit; e.g.
   * chart-count "¿Cuántos koalas hay?" → "5"). Absent → no Quiz node (clean).
   */
  practiceProblems?: { q: string; a: string }[];
}

interface LandingFile { landings: Landing[] }

const FILES: Record<string, LandingFile> = {
  en: enData as unknown as LandingFile,
  de: deData as unknown as LandingFile,
  es: esData as unknown as LandingFile,
  sv: svData as unknown as LandingFile,
  nl: nlData as unknown as LandingFile,
  da: daData as unknown as LandingFile,
};

export function getLandingLocales(): string[] {
  return Object.keys(FILES);
}

export function getLandingSlugs(locale: string): string[] {
  const f = FILES[locale];
  return f ? f.landings.map((l) => l.slug) : [];
}

export function getLandingBySlug(locale: string, slug: string): Landing | null {
  const f = FILES[locale];
  if (!f) return null;
  return f.landings.find((l) => l.slug === slug) || null;
}

export function getAllLandings(locale: string): Landing[] {
  const f = FILES[locale];
  return f ? f.landings : [];
}

/**
 * Reverse map: deck slug → published landing slug (per locale). Drives the
 * hub→landing CONDITIONAL REPOINT — a deck card points to its landing IFF a
 * published landing exists for that deck's coordinate; else it keeps the /decks/
 * asset URL. This auto-bounds the live /topic/ mutation to exactly the published
 * landing set (rollback = unpublish a landing → its decks fall back to /decks/).
 * Built from each landing's canonicalDeckSlug + collapseSiblings.
 */
const _deckToLanding: Record<string, Record<string, string>> = {};
function deckMap(locale: string): Record<string, string> {
  if (_deckToLanding[locale]) return _deckToLanding[locale];
  const m: Record<string, string> = {};
  const f = FILES[locale];
  if (f) {
    for (const l of f.landings) {
      const decks = l.collapseSiblings && l.collapseSiblings.length ? l.collapseSiblings : [l.canonicalDeckSlug];
      for (const d of decks) m[d] = l.slug;
    }
  }
  _deckToLanding[locale] = m;
  return m;
}
export function landingSlugForDeck(locale: string, deckSlug: string): string | null {
  return deckMap(locale)[deckSlug] || null;
}

/**
 * Lazy per-locale coordinate index: `${type}|${mode}|${theme}` → Landing.
 * Built once per locale (same pattern as deckMap). Makes sibling/hreflang lookup
 * O(1) — mandatory for the landings sitemap shard, which iterates ~25k entries
 * and would otherwise pay an O(locales × n) linear scan per entry.
 */
const _coordIndex: Record<string, Map<string, Landing>> = {};
function coordKey(c: LandingCoordinate): string {
  return `${c.type}|${c.mode === null ? 'null' : c.mode}|${c.theme}`;
}
function coordIndex(locale: string): Map<string, Landing> {
  if (_coordIndex[locale]) return _coordIndex[locale];
  const m = new Map<string, Landing>();
  const f = FILES[locale];
  if (f) for (const l of f.landings) m.set(coordKey(l.coordinate), l);
  _coordIndex[locale] = m;
  return m;
}

/**
 * Cross-locale siblings of a landing: the SAME (type, mode, theme) coordinate in OTHER locales.
 * Matches on type+mode+theme — NOT level (level is RE-DERIVED per locale, e.g. an EN-kindergarten
 * addition coordinate is de-`1-klasse`). Drives the cross-locale hreflang block (en↔de). Returns
 * `{locale, slug}` for every other locale that has a landing for the coordinate. O(locales) via
 * the coordinate index.
 */
export function getSiblingLandingsByCoordinate(
  coordinate: LandingCoordinate,
  excludeLocale: string,
): Array<{ locale: string; slug: string }> {
  const out: Array<{ locale: string; slug: string }> = [];
  const key = coordKey(coordinate);
  for (const loc of Object.keys(FILES)) {
    if (loc === excludeLocale) continue;
    const m = coordIndex(loc).get(key);
    if (m) out.push({ locale: loc, slug: m.slug });
  }
  return out;
}

/**
 * Lazy per-locale facet indexes over the landing set — power the hub landing
 * browser, the standards-hub "Worksheets for this standard" section, and the
 * landing↔landing link mesh. Same lazy-memoization pattern as deckMap; first
 * call per locale builds all four maps in one pass (<50ms at 2.5k entries).
 */
interface FacetIndexes {
  byType: Map<string, Landing[]>;
  byTheme: Map<string, Landing[]>;
  byLevel: Map<string, Landing[]>;
  byStandard: Map<string, Landing[]>;
}
const _facets: Record<string, FacetIndexes> = {};
function facets(locale: string): FacetIndexes {
  if (_facets[locale]) return _facets[locale];
  const fx: FacetIndexes = {
    byType: new Map(),
    byTheme: new Map(),
    byLevel: new Map(),
    byStandard: new Map(),
  };
  const push = (m: Map<string, Landing[]>, k: string, l: Landing) => {
    const arr = m.get(k);
    if (arr) arr.push(l);
    else m.set(k, [l]);
  };
  const f = FILES[locale];
  if (f) {
    for (const l of f.landings) {
      push(fx.byType, l.coordinate.type, l);
      // themeless coordinates exist at runtime (es math-worksheet class) — skip
      if (l.coordinate.theme) push(fx.byTheme, l.coordinate.theme, l);
      push(fx.byLevel, l.coordinate.level, l);
      if (l.standard) push(fx.byStandard, l.standard, l);
    }
    // Deterministic order (stable across ISR revalidations): slug-sorted.
    for (const m of [fx.byType, fx.byTheme, fx.byLevel, fx.byStandard]) {
      for (const arr of m.values()) arr.sort((a, b) => (a.slug < b.slug ? -1 : 1));
    }
  }
  _facets[locale] = fx;
  return fx;
}

export function getLandingsByType(locale: string, type: string): Landing[] {
  return facets(locale).byType.get(type) || [];
}
export function getLandingsByTheme(locale: string, theme: string): Landing[] {
  return facets(locale).byTheme.get(theme) || [];
}
export function getLandingsByLevel(locale: string, level: string): Landing[] {
  return facets(locale).byLevel.get(level) || [];
}
/** Landings carrying a CCSS code (exact match, e.g. "K.MD.B.3"). Readiness landings carry none. */
export function getLandingsByStandard(locale: string, code: string): Landing[] {
  return facets(locale).byStandard.get(code) || [];
}

/**
 * Deterministic landing↔landing link mesh ("More worksheets" module).
 * Selection is a stable neighbor-window around the current landing inside
 * slug-sorted facet lists (NO randomness — links must not churn across ISR
 * revalidations, §16.2 ISR-cache-preserving discipline):
 *   - up to 4 same-type (prefer same-level) other-theme landings
 *   - up to 4 same-theme other-type landings
 *   - up to 2 same-level other-type/theme landings
 * Every landing therefore both emits and receives ~8-10 sibling links,
 * de-orphaning the landing tier independently of the topic hubs.
 */
export interface MeshGroups {
  sameType: Landing[];
  sameTheme: Landing[];
  sameLevel: Landing[];
}
function neighborWindow(list: Landing[], self: Landing, take: number, exclude: Set<string>): Landing[] {
  if (take <= 0 || list.length === 0) return [];
  const i = list.findIndex((l) => l.slug === self.slug);
  const out: Landing[] = [];
  // walk outward from the landing's own position (or the start when absent)
  const start = i >= 0 ? i : 0;
  for (let d = 1; d <= list.length && out.length < take; d++) {
    const cand = list[(start + d) % list.length];
    if (cand.slug === self.slug || exclude.has(cand.slug)) continue;
    exclude.add(cand.slug);
    out.push(cand);
  }
  return out;
}
export function getRelatedLandings(locale: string, self: Landing): MeshGroups {
  const fx = facets(locale);
  const exclude = new Set<string>([self.slug]);
  // same type: prefer the same level's slice of the type list, then the rest of the type
  const typeList = fx.byType.get(self.coordinate.type) || [];
  const typeSameLevel = typeList.filter((l) => l.coordinate.level === self.coordinate.level);
  let sameType = neighborWindow(typeSameLevel, self, 4, exclude);
  if (sameType.length < 4) sameType = sameType.concat(neighborWindow(typeList, self, 4 - sameType.length, exclude));
  const sameTheme = neighborWindow(
    (fx.byTheme.get(self.coordinate.theme) || []).filter((l) => l.coordinate.type !== self.coordinate.type),
    self, 4, exclude,
  );
  const sameLevel = neighborWindow(
    (fx.byLevel.get(self.coordinate.level) || []).filter(
      (l) => l.coordinate.type !== self.coordinate.type && l.coordinate.theme !== self.coordinate.theme,
    ),
    self, 2, exclude,
  );
  return { sameType, sameTheme, sameLevel };
}

/** Deck-asset URLs (nginx-served; trailing-slash dir; slug-prefixed PDFs). */
export interface DeckAssets { deckDir: string; deckHtml: string; thumbnail: string; pdf: string; answerKey: string }
export function deckAssets(locale: string, deckSlug: string): DeckAssets {
  const dir = `${CANONICAL_HOST}/${locale}/decks/${deckSlug}/`;
  return {
    deckDir: dir,
    deckHtml: `${dir}deck.html`,
    thumbnail: `${dir}thumbnail.png`,
    pdf: `${dir}${deckSlug}-printable.pdf`,
    answerKey: `${dir}${deckSlug}-answer-key.pdf`,
  };
}
