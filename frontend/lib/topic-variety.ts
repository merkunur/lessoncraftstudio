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
  const decks = (await prisma.deck.findMany({
    where: { language: currentLocale, status: 'published' },
    select: DECK_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
  })) as unknown as TopicDeckSummary[];

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
  const decks = (await prisma.deck.findMany({
    where: { status: 'published' },
    select: DECK_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
  })) as unknown as TopicDeckSummary[];

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

