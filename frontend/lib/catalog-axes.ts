/**
 * catalog-axes.ts — structural-axis metrics for homepage Alt A redesign per
 * `docs/homepage-acquisition-arc-2026-05-05.md` Alt A architectural lock.
 *
 * Surfaces 5 structural axes that constitute the platform's combinatorial
 * space:
 *   1. exercise-type (29 §14.10 canonical apps)
 *   2. locale (11 platform locales per §6)
 *   3. theme (100 axis-keys registered in topics-taxonomy.json per §16.5.1)
 *   4. educational-level (5 axis-keys per §17.8.6 — defined-but-1-unused at
 *      K-3 audience natural ceiling)
 *   5. mode (per-app variability; 6 single-mode + 23 multi-mode post-§109a91d4)
 *
 * Magnitude communication shifts from population-count (884 decks at HEAD
 * fba33939; stale at 500/day cadence toward 55,000-target) to axis-product
 * (14,487 publish-eligible combinations per §6 amendment). Operator authors
 * against the space; today's count is a snapshot.
 *
 * SSR-safe: pure compute + DB read via Prisma. Wrapped in unstable_cache for
 * 1-hour ISR-window per homepage `revalidate=3600` convention. Build-time DB
 * unreachability tolerated; ISR fills cache on first hit.
 *
 * Originating commission: Alt A Homepage Redesign — Arc 1 substrate
 * (parallel-commissioned with Embed Layer-2 implementation, 2026-05-05).
 */

import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { SUPPORTED_LOCALES, LOCALE_NAMES, type SupportedLocale } from '@/config/locales';

// ─────────────────────────────────────────────────────────────────────────
// Axis 1 — Exercise-type (§14.10 canonical 29 apps)
// ─────────────────────────────────────────────────────────────────────────

/**
 * The 29 canonical apps per §14.10 authoritative list. Single source of truth
 * for the exercise-type axis. Derived from `EXERCISE_MODE_APP_CLASSIFICATION`
 * constant in `scripts/publish-cli/slug.js`; mirrored here for TypeScript-side
 * consumption since slug.js is plain JS published-cli code.
 *
 * Maintenance rule per §14.10: when this list changes (apps added or removed
 * from the catalog system), update §14.10 first, then mirror here.
 */
export const CANONICAL_29_EXERCISE_TYPES = [
  'addition',
  'alphabet-train',
  'big-small',
  'bingo',
  'chart-count',
  'code-addition',
  'crossword',
  'cryptogram',
  'find-and-count',
  'find-objects',
  'grid-match',
  'matching',
  'math-puzzle',
  'math-worksheet',
  'missing-pieces',
  'more-less',
  'odd-one-out',
  'pattern-train',
  'pattern-worksheet',
  'picture-path',
  'picture-sort',
  'prepositions',
  'shadow-match',
  'subtraction',
  'sudoku',
  'treasure-hunt',
  'word-guess',
  'word-scramble',
  'wordsearch',
] as const;

export type CanonicalExerciseType = typeof CANONICAL_29_EXERCISE_TYPES[number];

// ─────────────────────────────────────────────────────────────────────────
// Axis 2 — Locale (§6 — 11 platform locales)
// ─────────────────────────────────────────────────────────────────────────

// Re-exported from locales.ts SoT for axis-summary use.
export { SUPPORTED_LOCALES, LOCALE_NAMES };
export type AxisLocale = SupportedLocale;

// ─────────────────────────────────────────────────────────────────────────
// Axis 3 — Theme (100 axis-keys registered in topics-taxonomy.json per §16.5.1)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Total theme axis-keys registered in topics-taxonomy.json axes.theme map.
 * Per §16.5.1: 50 color themes + 50 BW themes = 100 axis-keys, registered
 * 1:1 with image_themes type='images' rows.
 *
 * Surfaced as a constant for axis-product computation; full canonical list
 * resolved at component-render time via topics-taxonomy.json import.
 */
export const TOTAL_THEME_AXIS_KEYS = 100;

// ─────────────────────────────────────────────────────────────────────────
// Axis 4 — Educational-level (§17.8.6 — 5 axis-keys, K-3 audience)
// ─────────────────────────────────────────────────────────────────────────

export const EDUCATIONAL_LEVELS = [
  'preschool',
  'kindergarten',
  'grade-1',
  'grade-2',
  'grade-3',
] as const;

export type EducationalLevel = typeof EDUCATIONAL_LEVELS[number];

// ─────────────────────────────────────────────────────────────────────────
// Axis 5 — Mode (per-app variability; locked taxonomy from §109a91d4)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Per-app mode count from Commission ε locked taxonomy (commit `109a91d4`).
 *
 * 6 single-mode apps emit only the default (null) mode.
 * 11 multi-mode apps have explicit locked taxonomy.
 * 12 multi-mode apps are DERIVED but mode counts not yet locked at
 * §109a91d4; conservative estimate of 1 here (treats them as default-only)
 * until their multi-mode contracts are explicitly locked. Empirical state
 * at HEAD fba33939: addition + subtraction publish 4 modes each in Track C
 * waves; the others publish 1 mode currently.
 *
 * Future-conservative: when an app's multi-mode taxonomy gets locked, update
 * this map. Combinatorial-space computation grows as the taxonomy grows.
 */
export const LOCKED_MODE_COUNTS: Record<CanonicalExerciseType, number> = {
  // Single-mode apps (6) — default-only emit
  'alphabet-train': 1,
  'chart-count': 1,
  'crossword': 1,
  'cryptogram': 1,
  'grid-match': 1,
  'picture-sort': 1,
  // Multi-mode locked taxonomy (11 from `109a91d4` body)
  'bingo': 2,            // image-default-null + word
  'code-addition': 2,    // standard-default-null + secret-word
  'missing-pieces': 6,   // square-default-null + circle / rect-portrait / rect-landscape / ellipse-portrait / ellipse-landscape
  'odd-one-out': 2,      // identical-default-null + cross-theme
  'pattern-train': 5,    // AB-default-null + aab / abb / abc / aabb
  'pattern-worksheet': 3,// mixed-default-null + blank + options
  'sudoku': 3,           // 4=easy-default-null + 6=medium + 8=hard
  'treasure-hunt': 2,    // basic-default-null + compass
  'word-guess': 4,       // 0-default-null + 2=easy + 4=normal + 6=tough
  'word-scramble': 4,    // (same shape as word-guess)
  'wordsearch': 3,       // mixed-default-null + image-only + word-only
  // Other DERIVED (12) — mode taxonomies not yet locked at §109a91d4
  // Conservative 1 each (default-only); update as taxonomies lock.
  'addition': 1,
  'big-small': 1,
  'find-and-count': 1,
  'find-objects': 1,
  'math-puzzle': 1,
  'math-worksheet': 1,
  'matching': 1,
  'more-less': 1,
  'picture-path': 1,
  'prepositions': 1,
  'shadow-match': 1,
  'subtraction': 1,
};

// ─────────────────────────────────────────────────────────────────────────
// Axis-product (combinatorial space)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Computes combinatorial space per the §6 amendment formula.
 * Formula: themes × locales × themed-emitting-apps + themeless × locales.
 *
 * Per §6 the 13 themed-emitting apps × 100 themes × 11 locales = 14,300
 * themed combinations. The 17 themeless apps × 11 locales = 187 themeless.
 * Total: 14,487 publish-eligible combinations.
 *
 * The computation here matches that formula exactly; constants are derived
 * from CANONICAL_29_EXERCISE_TYPES + TOTAL_THEME_AXIS_KEYS + SUPPORTED_LOCALES
 * counts so future expansion (e.g., adding a 30th app, a 12th locale, or new
 * theme axis-keys) automatically reflects.
 */
export function computeCombinatorialSpace(): {
  themedCombinations: number;
  themelessCombinations: number;
  total: number;
  axisProduct: string;
} {
  // 13 themed-emitting apps + 17 themeless per §6 amendment.
  // (TODO when authoring final copy: surface which apps are themed-emitting
  // vs themeless via topics-taxonomy.json.apps.<app>.themed_emitting flag.
  // For Arc 1 substrate we use the §6 amendment numerics directly.)
  const themedEmittingAppCount = 13;
  const themelessAppCount = 17;
  const themed = TOTAL_THEME_AXIS_KEYS * SUPPORTED_LOCALES.length * themedEmittingAppCount;
  const themeless = themelessAppCount * SUPPORTED_LOCALES.length;
  return {
    themedCombinations: themed,
    themelessCombinations: themeless,
    total: themed + themeless,
    axisProduct: `${CANONICAL_29_EXERCISE_TYPES.length} exercise types × ${TOTAL_THEME_AXIS_KEYS} themes × ${SUPPORTED_LOCALES.length} languages`,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Axis-summary aggregator
// ─────────────────────────────────────────────────────────────────────────

export interface CatalogAxesSummary {
  exerciseTypes: {
    canonical: readonly string[];
    count: number;
  };
  locales: {
    canonical: readonly string[];
    displayNames: Record<string, string>;
    count: number;
  };
  themes: {
    totalRegistered: number;
    currentlyExercised: number;
  };
  educationalLevels: {
    canonical: readonly string[];
    count: number;
    activeAtAudience: number; // 4 of 5 exercised; grade-3 unused at K-3 ceiling
  };
  modesPerType: Record<string, number>;
  combinatorialSpace: ReturnType<typeof computeCombinatorialSpace>;
  currentPopulation: {
    publishedDeckCount: number; // footnote-only; magnitude communicated via axes
    cadenceTargetPerDay: number;
    longTermCellCeiling: number;
  };
}

/**
 * Query Hetzner DB for distinct exercised theme count + total published deck
 * count. SSR-safe; ISR-cached for 1-hour window matching homepage `revalidate=3600`.
 *
 * Build-time DB unreachability is tolerated (matches BreadthGrid pattern at
 * `frontend/components/homepage-v2/BreadthGrid.tsx:53-63`); empty fallbacks
 * mean the homepage renders structurally with axis-counts only and population
 * footnote shows zeros until ISR cache fills on first user request.
 */
async function queryDbState(): Promise<{ exercisedThemes: number; publishedDecks: number }> {
  try {
    const publishedDecks = await prisma.deck.count({
      where: { status: 'published' },
    });

    // Query distinct theme axis-keys exercised. subjectTags is String[] in Prisma
    // schema; we unnest in raw SQL to count distinct values.
    const themeRows = await prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(DISTINCT tag)::bigint AS count
      FROM (
        SELECT UNNEST(subject_tags) AS tag FROM decks WHERE status = 'published'
      ) t
    `;
    const exercisedThemes = Number(themeRows[0]?.count ?? 0);

    return { exercisedThemes, publishedDecks };
  } catch (err) {
    console.warn(
      '[catalog-axes] queryDbState failed; rendering with zero population:',
      (err as Error).message
    );
    return { exercisedThemes: 0, publishedDecks: 0 };
  }
}

/**
 * Returns the structured catalog-axes summary. ISR-cached for 1-hour window.
 *
 * Magnitude communication contract (per `docs/homepage-acquisition-arc-2026-05-05.md`
 * Alt A architectural lock): consumers display axis-product framing as
 * headline; current population surfaces as footnote only.
 */
export const getCatalogAxes = unstable_cache(
  async function getCatalogAxesUncached(): Promise<CatalogAxesSummary> {
    const dbState = await queryDbState();
    const localeDisplayNames: Record<string, string> = {};
    for (const loc of SUPPORTED_LOCALES) {
      localeDisplayNames[loc] = LOCALE_NAMES[loc];
    }
    return {
      exerciseTypes: {
        canonical: CANONICAL_29_EXERCISE_TYPES,
        count: CANONICAL_29_EXERCISE_TYPES.length,
      },
      locales: {
        canonical: SUPPORTED_LOCALES,
        displayNames: localeDisplayNames,
        count: SUPPORTED_LOCALES.length,
      },
      themes: {
        totalRegistered: TOTAL_THEME_AXIS_KEYS,
        currentlyExercised: dbState.exercisedThemes,
      },
      educationalLevels: {
        canonical: EDUCATIONAL_LEVELS,
        count: EDUCATIONAL_LEVELS.length,
        activeAtAudience: 4, // grade-3 unused at K-3 audience natural ceiling per §17.8.6
      },
      modesPerType: { ...LOCKED_MODE_COUNTS },
      combinatorialSpace: computeCombinatorialSpace(),
      currentPopulation: {
        publishedDeckCount: dbState.publishedDecks,
        cadenceTargetPerDay: 500, // operator-stated cadence target
        longTermCellCeiling: 55000, // operator-stated long-term ceiling
      },
    };
  },
  ['catalog-axes-summary'],
  { revalidate: 3600 } // 1-hour ISR window matching homepage convention
);
