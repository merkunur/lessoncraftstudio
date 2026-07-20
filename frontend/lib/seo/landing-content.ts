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
// Landing content is loaded at RUNTIME via fs (below), NOT statically imported.
// Static `import xData from '@/content/seo-landing/xx.json'` bundled all 11 files
// (~93MB) into the webpack module graph, which made the COLD `next build` compile
// explode (16GB death-spiral / 32GB std::bad_alloc — the JSON AST dwarfs everything
// else). Reading them with fs keeps them out of the bundle → compile drops to ~4GB.
// This lib is server-only (no 'use client' importer), so fs is safe; landings render
// on-demand ISR (build-time sitemap also reads via fs, cwd=frontend/ during build).
import * as fs from 'fs';
import * as path from 'path';
import { CANONICAL_HOST } from '@/lib/seo/url';

export interface LandingCarouselItem { label: string; href: string }
export interface LandingCoordinate { type: string; mode: string | null; theme: string; level: string;
  /** Optional 5th discriminator. Set on per-deck find-and-count "Beginning Sounds" landings
   * (one landing per (theme, letter)) where (type, mode, theme) alone is NOT unique. Included
   * in coordKey() when present, so these landings sibling cross-locale on (theme, letter) and
   * do NOT falsely match another locale's still-collapsed theme-level landing. */
  letter?: string;
  /** Cross-language landings only — the TARGET language ISO the deck teaches (e.g. 'en' for a
   * de→English crossword). Appended to coordKey() so a cross-language coordinate NEVER collides
   * with the monolingual coordinate of the same (type, mode, theme) — e.g. monolingual
   * `wordsearch|null|accessories` vs cross-language `wordsearch|null|accessories|t:en`. Cross-
   * language siblings match on (type, mode, theme, target) across page-locales that teach the
   * same target. Absent on monolingual coords → byte-identical key → zero regression. */
  target?: string }
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

const LANDING_LOCALES = ['en', 'de', 'es', 'sv', 'nl', 'da', 'it', 'no', 'fr', 'pt', 'fi'];

// Candidate dirs for the seo-landing JSON, tried in order. cwd-relative covers the
// build (cwd=frontend/) and any release whose cwd is set right; the absolute path is
// the guaranteed fallback — the git checkout at /opt/lessoncraftstudio is THE code
// path (§A.1, stable) and always contains these committed files at runtime.
const _LANDING_DIRS = [
  path.join(process.cwd(), 'content', 'seo-landing'),
  path.join(process.cwd(), 'frontend', 'content', 'seo-landing'),
  '/opt/lessoncraftstudio/frontend/content/seo-landing',
];
const _fileCache: Record<string, LandingFile | null> = {};
function loadFile(locale: string): LandingFile | null {
  if (locale in _fileCache) return _fileCache[locale];
  let data: LandingFile | null = null;
  if (LANDING_LOCALES.includes(locale)) {
    for (const dir of _LANDING_DIRS) {
      const p = path.join(dir, `${locale}.json`);
      try {
        if (fs.existsSync(p)) { data = JSON.parse(fs.readFileSync(p, 'utf8')) as LandingFile; break; }
      } catch { /* try next candidate */ }
    }
  }
  _fileCache[locale] = data;
  return data;
}

export function getLandingLocales(): string[] {
  return LANDING_LOCALES.slice();
}

/* Real-content augment (Unit 3, 2026-07-06) — per-landing contentDate (+word banks etc.)
 * produced server-side by scripts/seo-landing/augment-landings-real-content.js.
 * Consumed here ONLY for the sitemap <lastmod>; OPTIONAL by design (absent file →
 * lastmod omitted, exactly the pre-Unit-3 emission). */
const _AUGMENT_DIRS = [
  process.env.LCS_AUGMENT_DIR || '/var/www/lcs-media/landings-augment',
];
const _augmentCache: Record<string, Record<string, { contentDate?: string }> | null> = {};
export function getLandingAugment(locale: string): Record<string, { contentDate?: string }> | null {
  if (locale in _augmentCache) return _augmentCache[locale];
  let data: Record<string, { contentDate?: string }> | null = null;
  for (const dir of _AUGMENT_DIRS) {
    try {
      const p = path.join(dir, `${locale}.json`);
      if (fs.existsSync(p)) { data = JSON.parse(fs.readFileSync(p, 'utf8')); break; }
    } catch { /* tolerate — lastmod is optional */ }
  }
  _augmentCache[locale] = data;
  return data;
}

export function getLandingSlugs(locale: string): string[] {
  const f = loadFile(locale);
  return f ? f.landings.map((l) => l.slug) : [];
}

export function getLandingBySlug(locale: string, slug: string): Landing | null {
  const f = loadFile(locale);
  if (!f) return null;
  return f.landings.find((l) => l.slug === slug) || null;
}

export function getAllLandings(locale: string): Landing[] {
  const f = loadFile(locale);
  return f ? f.landings : [];
}

/**
 * Monolingual landings only (no cross-language target). The /worksheets browse
 * HUB is the monolingual catalog's browse home — cross-language "Learn <X>"
 * landings live in the /learn category, NOT here. Use this for any monolingual-
 * facing facet/browse surface; use getAllLandings for the sitemap + route
 * generateStaticParams (which legitimately include cross-language entries).
 */
export function getMonolingualLandings(locale: string): Landing[] {
  return getAllLandings(locale).filter((l) => !l.coordinate.target);
}

/** Cross-language landings only (a target language is set). */
export function getCrossLanguageLandings(locale: string): Landing[] {
  return getAllLandings(locale).filter((l) => !!l.coordinate.target);
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
  const f = loadFile(locale);
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
  return `${c.type}|${c.mode === null ? 'null' : c.mode}|${c.theme}${c.letter ? '|' + c.letter : ''}${c.target ? '|t:' + c.target : ''}`;
}
function coordIndex(locale: string): Map<string, Landing> {
  if (_coordIndex[locale]) return _coordIndex[locale];
  const m = new Map<string, Landing>();
  const f = loadFile(locale);
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
  for (const loc of LANDING_LOCALES) {
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
  const f = loadFile(locale);
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
  // Mesh must stay WITHIN its tier: a cross-language "Learn English" landing links
  // only to other same-target cross-language landings; a monolingual landing links
  // only to monolingual ones. Otherwise the shared byType/byTheme facets would
  // cross-pollinate (an off-topic German-math link on a Learn-English page, and a
  // diluted cross-language mesh). null target = monolingual.
  const selfTarget = self.coordinate.target || null;
  const sameTier = (l: Landing) => (l.coordinate.target || null) === selfTarget;
  // same type: prefer the same level's slice of the type list, then the rest of the type
  const typeList = (fx.byType.get(self.coordinate.type) || []).filter(sameTier);
  const typeSameLevel = typeList.filter((l) => l.coordinate.level === self.coordinate.level);
  let sameType = neighborWindow(typeSameLevel, self, 4, exclude);
  if (sameType.length < 4) sameType = sameType.concat(neighborWindow(typeList, self, 4 - sameType.length, exclude));
  const sameTheme = neighborWindow(
    (fx.byTheme.get(self.coordinate.theme) || []).filter((l) => sameTier(l) && l.coordinate.type !== self.coordinate.type),
    self, 4, exclude,
  );
  const sameLevel = neighborWindow(
    (fx.byLevel.get(self.coordinate.level) || []).filter(
      (l) => sameTier(l) && l.coordinate.type !== self.coordinate.type && l.coordinate.theme !== self.coordinate.theme,
    ),
    self, 2, exclude,
  );
  return { sameType, sameTheme, sameLevel };
}

/** Deck-asset URLs (nginx-served; trailing-slash dir; slug-prefixed PDFs). */
export interface DeckAssets {
  deckDir: string; deckHtml: string; thumbnail: string; pdf: string; answerKey: string;
  /** The 1200×630 social composite written at publish time (§17.8.19). */
  ogImage: string;
}
export function deckAssets(locale: string, deckSlug: string): DeckAssets {
  const dir = `${CANONICAL_HOST}/${locale}/decks/${deckSlug}/`;
  return {
    deckDir: dir,
    deckHtml: `${dir}deck.html`,
    thumbnail: `${dir}thumbnail.png`,
    pdf: `${dir}${deckSlug}-printable.pdf`,
    answerKey: `${dir}${deckSlug}-answer-key.pdf`,
    ogImage: `${dir}og-image.png`,
  };
}

/**
 * Canonical deck-card asset URLs derived from the deck's slug+language — the
 * single source of truth for thumbnail / printable-PDF / answer-key links on
 * every browse surface (deck cards, variety strips, homepage tiles, collections).
 *
 * Why this exists (SEO-recovery 2026-06-25): the DB columns pdf_url / answer_key_url
 * / thumbnail_url drifted for ~8.8k non-EN decks — they still carry the LEGACY
 * English-mode filename (e.g. `…-make-whole-…-printable.pdf`) while the deck's slug,
 * on-disk directory, and actual files use the localized mode (`…-complete-…`), so
 * reading the DB column 404s. The on-disk asset tree is ALWAYS coherent with the
 * slug (symlink + `<slug>-printable.pdf` verified present catalog-wide), so deriving
 * the URLs from the slug — exactly as the /worksheets landing route already does —
 * resolves 200 everywhere AND is permanently drift-proof (no surface reads the
 * mutable DB columns again). answerKey stays null-preserving (many decks legitimately
 * have no answer key; the card hides the link when null).
 */
export function canonicalDeckAssets(d: { slug: string; language: string; answerKeyUrl?: string | null }): {
  thumbnailUrl: string;
  pdfUrl: string;
  answerKeyUrl: string | null;
} {
  const a = deckAssets(d.language, d.slug);
  return {
    thumbnailUrl: a.thumbnail,
    pdfUrl: a.pdf,
    answerKeyUrl: d.answerKeyUrl == null ? null : a.answerKey,
  };
}
