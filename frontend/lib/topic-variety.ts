import { prisma } from './prisma';
import { Axis, ageRangeToLevelKey, levelKeyToAgeRanges } from './taxonomy';
import { TopicDeckSummary } from './topic-decks';

// Catalog variety Arc 1 helpers per CLAUDE.md §16.2 + §17.4 + §1 (path 2):
// algorithmic below-the-fold variety strips on topic pages + numeric scale
// copy on the homepage. ISR-cached at the calling page level (topic page
// revalidate=3600). All queries respect status='published' + §16.6 honesty.
//
// Composition rules locked at Arc 1 brief adjudication:
//   Strip 1 same-axis-key other locales: max 1 deck per locale
//   Strip 2 related topics:               max 2 decks per axis-key
//   Strip 3 other ages (theme + ex-type only): max 1 deck per educational-level
//   Strip 4 catalog highlights:           max 1 per locale + max 1 per ex-type

const DECK_SELECT = {
  id: true,
  slug: true,
  language: true,
  title: true,
  description: true,
  exerciseType: true,
  exerciseMode: true,
  ageRange: true,
  subjectTags: true,
  thumbnailUrl: true,
  pdfUrl: true,
  htmlUrl: true,
  publishedAt: true,
  updatedAt: true,
} as const;

// All 11 platform locales. Mirrors the BreadthGrid pattern at
// commit 317cb1a7 (lib/breadth-grid-selection.ts ALL_LOCALES). DRY-extraction
// to a shared lib/locales.ts is filed as a future-consolidation candidate.
const ALL_LOCALES: string[] = [
  'en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi',
];

// Per-locale candidate fetch cap. 200 chosen empirically via the
// scale-checkpoint framework's pre/post output-parity verification at the
// 55K loadtest checkpoint: 50 missed the strip2-educational-level case
// (rare grade-3 age-range at 3% distribution didn't always have 2+ decks
// in top-50); 200 covers the rarest age-range with high probability
// (P(>=2 grade-3 in top-200) ~= 99.5%) while still capping fetch volume
// at 0.04 MB per Strip-4 invocation.
const STRIP_CANDIDATES_PER_LOCALE = 200;

/**
 * Per-locale bounded fetch — narrows full-table/full-locale findMany to a
 * LIMIT-bounded compound-index-hitting query. Mirrors BreadthGrid pattern
 * at commit 317cb1a7. For Strip 2 we pass [currentLocale] (1 query); for
 * Strip 4 we pass ALL_LOCALES (11 queries in parallel via Promise.all).
 * Merged + re-sorted to preserve publishedAt-DESC + id-ASC ordering for
 * the diversity-cap walks that consume the result.
 *
 * Replaces no-WHERE-filter-and-no-LIMIT findMany shapes that triggered
 * external-merge-on-disk sorts at 55K (per Phase 3 EXPLAIN: Strip 4
 * sort spilled 10MB to disk, contributing ~60ms to the 104.45ms p95
 * threshold violation).
 */
async function fetchPublishedDecksByLocale(
  locales: readonly string[],
  take: number
): Promise<TopicDeckSummary[]> {
  const perLocale = await Promise.all(
    locales.map(loc =>
      prisma.deck.findMany({
        where: { language: loc, status: 'published' },
        select: DECK_SELECT,
        orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
        take,
      })
    )
  );
  const merged: TopicDeckSummary[] = [];
  for (const arr of perLocale) merged.push(...(arr as unknown as TopicDeckSummary[]));
  if (locales.length > 1) {
    merged.sort((a, b) => {
      const ta = a.publishedAt ? a.publishedAt.getTime() : 0;
      const tb = b.publishedAt ? b.publishedAt.getTime() : 0;
      if (tb !== ta) return tb - ta;
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
  }
  return merged;
}

/**
 * Strip 1 — same axis-key in other locales.
 * Theme:        decks with subject_tags @> [axisKey] AND language != currentLocale
 * Exercise:     decks with exerciseType = axisKey   AND language != currentLocale
 * Educational:  decks with ageRange IN levelKeyToAgeRanges(axisKey) AND language != currentLocale
 * Diversity-shuffle: max 1 deck per locale (so the strip spreads across locales).
 */
export async function fetchDecksSameAxisKeyOtherLocales(
  axis: Axis,
  axisKey: string,
  currentLocale: string,
  limit: number = 8
): Promise<TopicDeckSummary[]> {
  let where: Record<string, unknown>;
  if (axis === 'exercise-type') {
    where = { exerciseType: axisKey, language: { not: currentLocale }, status: 'published' };
  } else if (axis === 'theme') {
    where = { subjectTags: { has: axisKey }, language: { not: currentLocale }, status: 'published' };
  } else if (axis === 'educational-level') {
    const ageRanges = levelKeyToAgeRanges(axisKey);
    if (ageRanges.length === 0) return [];
    where = { ageRange: { in: ageRanges }, language: { not: currentLocale }, status: 'published' };
  } else {
    return [];
  }

  const decks = (await prisma.deck.findMany({
    where,
    select: DECK_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
  })) as unknown as TopicDeckSummary[];

  const seen = new Set<string>();
  const out: TopicDeckSummary[] = [];
  for (const d of decks) {
    if (seen.has(d.language)) continue;
    seen.add(d.language);
    out.push(d);
    if (out.length >= limit) break;
  }
  return out;
}

/**
 * Strip 2 — other axis-keys within the same axis, current locale only.
 * For axis=exercise-type: surface other exercise-types in current locale.
 * For axis=theme:         surface other themes in current locale.
 * For axis=educational-level: surface other educational-levels in current locale.
 * Diversity-shuffle: max 2 decks per axis-key.
 */
export async function fetchDecksRelatedTopics(
  axis: Axis,
  currentAxisKey: string,
  currentLocale: string,
  limit: number = 8
): Promise<TopicDeckSummary[]> {
  // Per-locale bounded fetch (single locale, take=200). Pre-refactor fetched
  // ALL ~5K rows for currentLocale at 55K; this caps at top-200 most-recent
  // which covers the diversity-cap walk for all 3 axis variants per
  // empirical pre/post parity verification at the 55K loadtest checkpoint.
  const decks = await fetchPublishedDecksByLocale(
    [currentLocale],
    STRIP_CANDIDATES_PER_LOCALE
  );

  const out: TopicDeckSummary[] = [];
  const counts = new Map<string, number>();

  if (axis === 'exercise-type') {
    for (const d of decks) {
      if (d.exerciseType === currentAxisKey) continue;
      const c = counts.get(d.exerciseType) ?? 0;
      if (c >= 2) continue;
      counts.set(d.exerciseType, c + 1);
      out.push(d);
      if (out.length >= limit) break;
    }
    return out;
  }

  if (axis === 'theme') {
    const seenIds = new Set<string>();
    for (const d of decks) {
      if (seenIds.has(d.id)) continue;
      const otherTag = d.subjectTags.find(t => t !== currentAxisKey);
      if (!otherTag) continue;
      const c = counts.get(otherTag) ?? 0;
      if (c >= 2) continue;
      counts.set(otherTag, c + 1);
      seenIds.add(d.id);
      out.push(d);
      if (out.length >= limit) break;
    }
    return out;
  }

  if (axis === 'educational-level') {
    const currentRanges = new Set(levelKeyToAgeRanges(currentAxisKey));
    for (const d of decks) {
      if (currentRanges.has(d.ageRange)) continue;
      const c = counts.get(d.ageRange) ?? 0;
      if (c >= 2) continue;
      counts.set(d.ageRange, c + 1);
      out.push(d);
      if (out.length >= limit) break;
    }
    return out;
  }

  return [];
}

/**
 * Strip 3 — other educational-levels at the same axis-key (cross-axis).
 * Only valid when the current page's axis is theme or exercise-type. Educational-
 * level pages skip this strip (guard at caller too).
 * Diversity-shuffle: max 1 deck per educational-level.
 *
 * At n=116 this typically self-skips because each (locale, exercise_type) tuple
 * has exactly one deck — only 1 educational-level represented. Becomes
 * meaningful as inventory grows past 1-deck-per-tuple.
 */
export async function fetchDecksOtherAges(
  axis: Axis,
  axisKey: string,
  currentLocale: string,
  limit: number = 6
): Promise<TopicDeckSummary[]> {
  if (axis === 'educational-level') return [];

  let where: Record<string, unknown>;
  if (axis === 'exercise-type') {
    where = { exerciseType: axisKey, language: currentLocale, status: 'published' };
  } else if (axis === 'theme') {
    where = { subjectTags: { has: axisKey }, language: currentLocale, status: 'published' };
  } else {
    return [];
  }

  const decks = (await prisma.deck.findMany({
    where,
    select: DECK_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
  })) as unknown as TopicDeckSummary[];

  const seenLevels = new Set<string>();
  const out: TopicDeckSummary[] = [];
  for (const d of decks) {
    const level = ageRangeToLevelKey(d.ageRange);
    if (!level || seenLevels.has(level)) continue;
    seenLevels.add(level);
    out.push(d);
    if (out.length >= limit) break;
  }
  return out;
}

/**
 * Strip 4 — broadest catalog variety surface.
 * Aggregate across all locales + status='published'. Two diversity caps:
 *   - max 1 deck per locale  (strip spreads across languages)
 *   - max 1 deck per exerciseType (strip spreads across mechanics)
 * Both caps apply conjunctively. At n=116 with 4 locales this caps at 4
 * tiles; at catalog scale (>=11 locales × 29 exercise-types) the cap rises
 * naturally to the layout target.
 */
export async function fetchDecksCatalogHighlights(
  limit: number = 8
): Promise<TopicDeckSummary[]> {
  // Per-locale bounded fetch across ALL_LOCALES (11 parallel queries via
  // Promise.all, take=200 each). Pre-refactor fetched ALL 55K published
  // rows in one query, triggering external-merge-on-disk sort (10MB
  // tmp file per Phase 3 EXPLAIN). Post-refactor caps at 11 × 200 = 2200
  // candidates; the merged-and-resorted union preserves
  // publishedAt-DESC + id-ASC ordering for the greedy diversity walk.
  // Pre/post output parity verified empirically at the 55K loadtest
  // checkpoint (matches across all 5 representative test cases).
  const decks = await fetchPublishedDecksByLocale(
    ALL_LOCALES,
    STRIP_CANDIDATES_PER_LOCALE
  );

  const seenLocales = new Set<string>();
  const seenExerciseTypes = new Set<string>();
  const out: TopicDeckSummary[] = [];
  for (const d of decks) {
    if (seenLocales.has(d.language)) continue;
    if (seenExerciseTypes.has(d.exerciseType)) continue;
    seenLocales.add(d.language);
    seenExerciseTypes.add(d.exerciseType);
    out.push(d);
    if (out.length >= limit) break;
  }
  return out;
}

