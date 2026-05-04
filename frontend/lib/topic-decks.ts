import { prisma } from './prisma';
import { Axis, levelKeyToAgeRanges, listAxisKeys } from './taxonomy';

export interface TopicDeckSummary {
  id: string;
  slug: string;
  language: string;
  title: any;
  description: any;
  exerciseType: string;
  exerciseMode: string | null;
  ageRange: string;
  subjectTags: string[];
  thumbnailUrl: string;
  pdfUrl: string;
  htmlUrl: string;
  publishedAt: Date | null;
  updatedAt: Date;
}

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
 * Fetch published decks matching the given axis + axis-key + locale.
 *
 * Axis semantics:
 *  - exercise-type: deck.exerciseType matches the axis-key (which equals the
 *    canonical app name 1:1 per CLAUDE.md §14.10).
 *  - theme: deck.subjectTags includes the axis-key.
 *  - educational-level: deck.ageRange maps to the axis-key per
 *    CLAUDE.md §17.8.6 mapping table.
 */
export async function fetchDecksForAxis(
  axis: Axis,
  axisKey: string,
  locale: string
): Promise<TopicDeckSummary[]> {
  if (axis === 'exercise-type') {
    return prisma.deck.findMany({
      where: { language: locale, status: 'published', exerciseType: axisKey },
      select: DECK_SELECT,
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    }) as unknown as Promise<TopicDeckSummary[]>;
  }
  if (axis === 'theme') {
    return prisma.deck.findMany({
      where: { language: locale, status: 'published', subjectTags: { has: axisKey } },
      select: DECK_SELECT,
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    }) as unknown as Promise<TopicDeckSummary[]>;
  }
  if (axis === 'educational-level') {
    const ageRanges = levelKeyToAgeRanges(axisKey);
    if (ageRanges.length === 0) return [];
    return prisma.deck.findMany({
      where: { language: locale, status: 'published', ageRange: { in: ageRanges } },
      select: DECK_SELECT,
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    }) as unknown as Promise<TopicDeckSummary[]>;
  }
  return [];
}

/**
 * For a given (axis, locale), find all axis-keys that have ≥1 published deck.
 * Used by generateStaticParams + sitemap + footer wiring to avoid fabricating
 * links to empty topic pages (per Footer.tsx convention §5.6).
 *
 * Single round-trip: groups published decks once per axis/locale, then maps
 * back to taxonomy axis-keys.
 */
export async function listNonEmptyAxisKeys(
  axis: Axis,
  locale: string
): Promise<string[]> {
  if (axis === 'exercise-type') {
    const grouped = await prisma.deck.groupBy({
      by: ['exerciseType'],
      where: { language: locale, status: 'published' },
      _count: { _all: true },
    });
    const present = new Set(grouped.map(g => g.exerciseType));
    return listAxisKeys(axis).filter(k => present.has(k));
  }
  if (axis === 'theme') {
    const decks = await prisma.deck.findMany({
      where: { language: locale, status: 'published' },
      select: { subjectTags: true },
    });
    const present = new Set<string>();
    for (const d of decks) {
      for (const tag of d.subjectTags) present.add(tag);
    }
    return listAxisKeys(axis).filter(k => present.has(k));
  }
  if (axis === 'educational-level') {
    const grouped = await prisma.deck.groupBy({
      by: ['ageRange'],
      where: { language: locale, status: 'published' },
      _count: { _all: true },
    });
    const presentRanges = new Set(grouped.map(g => g.ageRange));
    return listAxisKeys(axis).filter(k => {
      const ranges = levelKeyToAgeRanges(k);
      return ranges.some(r => presentRanges.has(r));
    });
  }
  return [];
}

/**
 * Latest updatedAt across decks matching (axis, axisKey, locale). Used by the
 * sitemap to set `lastmod` on topic URLs — the topic's content changes when
 * its underlying decks change.
 */
export async function topicLastModified(
  axis: Axis,
  axisKey: string,
  locale: string
): Promise<Date | null> {
  const decks = await fetchDecksForAxis(axis, axisKey, locale);
  if (decks.length === 0) return null;
  return decks.reduce<Date>(
    (max, d) => (d.updatedAt > max ? d.updatedAt : max),
    decks[0].updatedAt
  );
}

/**
 * Build a Prisma where-clause fragment for a single (axis, axisKey) filter.
 * Returns null when the axis-key resolves to an empty filter (e.g. unknown
 * educational-level key). Used by both fetchDecksForIntersection and the
 * single-axis fetch above; consolidates the per-axis WHERE shape.
 */
function buildAxisWhere(axis: Axis, axisKey: string): Record<string, unknown> | null {
  if (axis === 'exercise-type') {
    return { exerciseType: axisKey };
  }
  if (axis === 'theme') {
    return { subjectTags: { has: axisKey } };
  }
  if (axis === 'educational-level') {
    const ageRanges = levelKeyToAgeRanges(axisKey);
    if (ageRanges.length === 0) return null;
    return { ageRange: { in: ageRanges } };
  }
  return null;
}

/**
 * Fetch published decks matching BOTH (axis1, axisKey1) AND (axis2, axisKey2)
 * within the given locale. Powers the path-based 2-axis intersection routes
 * at /<locale>/topic/<axis-1-slug>/<axis-2-slug>/ per Arc 6c.
 *
 * Per the per-locale-bounded-fetch convention from BreadthGrid 317cb1a7 +
 * variety-strips 9e83ddff, the WHERE clause is anchored on language + status
 * (hits the (language, status, *) compound indexes); the 2-axis filter
 * applies AND-style on top. Returns at most `take` rows; default 24 covers
 * page-1 of the eventual 6b cursor-pagination layer.
 */
export async function fetchDecksForIntersection(
  axis1: Axis,
  axisKey1: string,
  axis2: Axis,
  axisKey2: string,
  locale: string,
  options?: { take?: number }
): Promise<TopicDeckSummary[]> {
  if (axis1 === axis2) return []; // disjoint axes only
  const w1 = buildAxisWhere(axis1, axisKey1);
  const w2 = buildAxisWhere(axis2, axisKey2);
  if (!w1 || !w2) return [];
  const take = options?.take ?? 24;
  return prisma.deck.findMany({
    where: { language: locale, status: 'published', ...w1, ...w2 },
    select: DECK_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    take,
  }) as unknown as Promise<TopicDeckSummary[]>;
}

/**
 * Count published decks matching the 2-axis intersection. Used by the route
 * handler's empty-intersection 404 check (defense-in-depth per §16.6.1) +
 * by the intersection-page header's "<count> decks" line.
 */
export async function countDecksForIntersection(
  axis1: Axis,
  axisKey1: string,
  axis2: Axis,
  axisKey2: string,
  locale: string
): Promise<number> {
  if (axis1 === axis2) return 0;
  const w1 = buildAxisWhere(axis1, axisKey1);
  const w2 = buildAxisWhere(axis2, axisKey2);
  if (!w1 || !w2) return 0;
  return prisma.deck.count({
    where: { language: locale, status: 'published', ...w1, ...w2 },
  });
}

/**
 * Enumerate all non-empty (axisKey1, axisKey2) tuples for a given axis-pair
 * and locale — used by sitemap-generation to emit only intersection URLs
 * that have ≥1 published deck (per §16.6.1 substrate-honesty doctrine).
 *
 * Strategy:
 *   - Fetch all (exerciseType, ageRange, subjectTags) tuples for published
 *     decks in this locale. Project per-deck onto the (axis1, axis2) tuple
 *     space; deduplicate.
 *   - Theme axis fanout: a deck with subjectTags=['animals','vehicles'] yields
 *     one tuple per distinct theme key it carries, joined with the other axis.
 *   - Educational-level axis: collapse ageRange to the level-key via
 *     ageRangeToLevelKey reverse mapping (single mapping per range).
 *   - Filter both keys against the registered taxonomy (skip orphan tags).
 */
export async function listNonEmptyIntersections(
  axis1: Axis,
  axis2: Axis,
  locale: string
): Promise<Array<{ key1: string; key2: string }>> {
  if (axis1 === axis2) return [];
  const decks = await prisma.deck.findMany({
    where: { language: locale, status: 'published' },
    select: { exerciseType: true, ageRange: true, subjectTags: true },
  });

  // Reverse-map ageRange (e.g. '5-7') to the educational-level axis-key
  // ('kindergarten') per §17.8.6 mapping. levelKeyToAgeRanges is one-to-many;
  // build the inverse here for efficiency.
  const levelKeys = listAxisKeys('educational-level');
  const rangeToLevel = new Map<string, string>();
  for (const lk of levelKeys) {
    for (const r of levelKeyToAgeRanges(lk)) rangeToLevel.set(r, lk);
  }

  const themeRegistry = new Set(listAxisKeys('theme'));
  const exerciseTypeRegistry = new Set(listAxisKeys('exercise-type'));

  function keysFor(axis: Axis, deck: { exerciseType: string; ageRange: string; subjectTags: string[] }): string[] {
    if (axis === 'exercise-type') {
      return exerciseTypeRegistry.has(deck.exerciseType) ? [deck.exerciseType] : [];
    }
    if (axis === 'theme') {
      return deck.subjectTags.filter(t => themeRegistry.has(t));
    }
    if (axis === 'educational-level') {
      const lk = rangeToLevel.get(deck.ageRange);
      return lk ? [lk] : [];
    }
    return [];
  }

  const seen = new Set<string>();
  const out: Array<{ key1: string; key2: string }> = [];
  for (const d of decks) {
    const ks1 = keysFor(axis1, d);
    const ks2 = keysFor(axis2, d);
    for (const k1 of ks1) {
      for (const k2 of ks2) {
        const key = `${k1}|${k2}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ key1: k1, key2: k2 });
      }
    }
  }
  return out;
}

/**
 * Latest updatedAt across decks matching the 2-axis intersection. Sitemap
 * lastmod for intersection URLs.
 */
export async function intersectionLastModified(
  axis1: Axis,
  axisKey1: string,
  axis2: Axis,
  axisKey2: string,
  locale: string
): Promise<Date | null> {
  if (axis1 === axis2) return null;
  const w1 = buildAxisWhere(axis1, axisKey1);
  const w2 = buildAxisWhere(axis2, axisKey2);
  if (!w1 || !w2) return null;
  const row = await prisma.deck.findFirst({
    where: { language: locale, status: 'published', ...w1, ...w2 },
    select: { updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  });
  return row?.updatedAt ?? null;
}
