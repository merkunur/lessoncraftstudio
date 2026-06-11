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
 * Cross-locale siblings of a landing: the SAME (type, mode, theme) coordinate in OTHER locales.
 * Matches on type+mode+theme — NOT level (level is RE-DERIVED per locale, e.g. an EN-kindergarten
 * addition coordinate is de-`1-klasse`). Drives the cross-locale hreflang block (en↔de). Returns
 * `{locale, slug}` for every other locale that has a landing for the coordinate.
 */
export function getSiblingLandingsByCoordinate(
  coordinate: LandingCoordinate,
  excludeLocale: string,
): Array<{ locale: string; slug: string }> {
  const out: Array<{ locale: string; slug: string }> = [];
  for (const loc of Object.keys(FILES)) {
    if (loc === excludeLocale) continue;
    const f = FILES[loc];
    if (!f) continue;
    const m = f.landings.find(
      (l) =>
        l.coordinate.type === coordinate.type &&
        l.coordinate.mode === coordinate.mode &&
        l.coordinate.theme === coordinate.theme,
    );
    if (m) out.push({ locale: loc, slug: m.slug });
  }
  return out;
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
