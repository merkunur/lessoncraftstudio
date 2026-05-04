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

/**
 * Sibling-axis listing within the same axis-kind. For SiblingAxisStrip on
 * single-axis topic pages: given (axis=theme, currentAxisKey=animals,
 * locale=en), returns all OTHER theme axis-keys with ≥1 published en deck,
 * sorted by deck-count desc. Caller (UI) caps display per Arc 6a Q2 lock
 * (top 8) with alphabetic-by-localized-name tiebreak.
 *
 * §16.6 substrate-honesty: only siblings with ≥1 published deck for the
 * current locale appear. Single round-trip via prisma.deck.groupBy.
 */
export async function listSiblingAxisKeysWithCounts(
  axis: Axis,
  currentAxisKey: string,
  locale: string
): Promise<Array<{ axisKey: string; count: number }>> {
  if (axis === 'exercise-type') {
    const grouped = await prisma.deck.groupBy({
      by: ['exerciseType'],
      where: { language: locale, status: 'published' },
      _count: { _all: true },
    });
    const registry = new Set(listAxisKeys(axis));
    return grouped
      .filter(g => g.exerciseType !== currentAxisKey && registry.has(g.exerciseType))
      .map(g => ({ axisKey: g.exerciseType, count: g._count._all }))
      .sort((a, b) => b.count - a.count);
  }
  if (axis === 'theme') {
    // subjectTags is a String[] column; can't groupBy directly. Pull all rows
    // and tally per tag. Per-locale-bounded by language filter; index hit on
    // (language, status, *) compound prefixes.
    const decks = await prisma.deck.findMany({
      where: { language: locale, status: 'published' },
      select: { subjectTags: true },
    });
    const registry = new Set(listAxisKeys(axis));
    const counts = new Map<string, number>();
    for (const d of decks) {
      for (const tag of d.subjectTags) {
        if (tag === currentAxisKey || !registry.has(tag)) continue;
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .map(([axisKey, count]) => ({ axisKey, count }))
      .sort((a, b) => b.count - a.count);
  }
  if (axis === 'educational-level') {
    const grouped = await prisma.deck.groupBy({
      by: ['ageRange'],
      where: { language: locale, status: 'published' },
      _count: { _all: true },
    });
    // Aggregate ageRange tallies into educational-level keys (one ageRange
    // typically maps to one level per §17.8.6, but the reverse map allows
    // multi-range levels).
    const levelKeys = listAxisKeys('educational-level');
    const levelCounts = new Map<string, number>();
    for (const lk of levelKeys) {
      if (lk === currentAxisKey) continue;
      const ranges = new Set(levelKeyToAgeRanges(lk));
      let total = 0;
      for (const g of grouped) {
        if (ranges.has(g.ageRange)) total += g._count._all;
      }
      if (total > 0) levelCounts.set(lk, total);
    }
    return Array.from(levelCounts.entries())
      .map(([axisKey, count]) => ({ axisKey, count }))
      .sort((a, b) => b.count - a.count);
  }
  return [];
}

/**
 * Cross-axis pivot listing for CrossAxisPivots. Given 1 or 2 anchor axes,
 * returns 2-axis intersections related to those anchors with ≥1 published
 * deck for the locale. Sorted by deck-count desc; caller applies the
 * limit cap (default 6 per Arc 6a Q1 lock).
 *
 * Single-anchor (single-axis topic page): enumerates intersections that
 * include the anchor axis. e.g. anchor={theme,animals} → returns
 * (theme=animals × any-level) + (theme=animals × any-exercise-type)
 * intersections that have ≥1 deck.
 *
 * Two-anchor (intersection page): enumerates OTHER intersections sharing
 * exactly one axis with the current page. e.g. anchors=[{theme,animals},
 * {educational-level,kindergarten}] → returns (animals × any-other-level)
 * + (animals × any-exercise-type) + (kindergarten × any-other-theme) +
 * (kindergarten × any-exercise-type), excluding the current intersection.
 *
 * Internally delegates to listNonEmptyIntersections for each axis pair the
 * anchor(s) participate in, then projects + filters + sorts.
 */
export async function listRelatedNonEmptyIntersections(
  currentAxes: Array<{ axis: Axis; axisKey: string }>,
  locale: string,
  limit: number = 6
): Promise<Array<{ axis1: Axis; key1: string; axis2: Axis; key2: string; count: number }>> {
  if (currentAxes.length < 1 || currentAxes.length > 2) return [];

  // Canonical axis-pair ordering: theme → educational-level → exercise-type
  // (mirrors Arc 6c URL-routing convention). Pairs always normalize to this
  // order for output.
  const RANK: Record<Axis, number> = { theme: 1, 'educational-level': 2, 'exercise-type': 3 };
  const ALL_AXES: Axis[] = ['theme', 'educational-level', 'exercise-type'];

  // Determine which axis pairs to enumerate. For 1 anchor: pair the anchor's
  // axis with each of the OTHER 2 axes. For 2 anchors: same set but exclude
  // the pair the anchors already form.
  const pairsToEnum: Array<[Axis, Axis]> = [];
  for (let i = 0; i < ALL_AXES.length; i++) {
    for (let j = i + 1; j < ALL_AXES.length; j++) {
      const pair: [Axis, Axis] = [ALL_AXES[i], ALL_AXES[j]];
      const involvesAnchor = currentAxes.some(a => a.axis === pair[0] || a.axis === pair[1]);
      if (involvesAnchor) pairsToEnum.push(pair);
    }
  }

  // Enumerate intersection counts per pair. Reuse listNonEmptyIntersections
  // for the per-pair tuple list, then re-count via groupBy-equivalent in JS
  // (listNonEmptyIntersections returns distinct tuples; we need their
  // deck-counts). Aggregate via a single-pass count fetch per pair.
  const allIntersections: Array<{ axis1: Axis; key1: string; axis2: Axis; key2: string; count: number }> = [];

  for (const [a1, a2] of pairsToEnum) {
    // Pull all decks for the locale once per pair for counting. Per-locale-
    // bounded fetch; index hit on (language, status, *) compound.
    const decks = await prisma.deck.findMany({
      where: { language: locale, status: 'published' },
      select: { exerciseType: true, ageRange: true, subjectTags: true },
    });

    const themeRegistry = new Set(listAxisKeys('theme'));
    const exerciseTypeRegistry = new Set(listAxisKeys('exercise-type'));
    const levelKeys = listAxisKeys('educational-level');
    const rangeToLevel = new Map<string, string>();
    for (const lk of levelKeys) {
      for (const r of levelKeyToAgeRanges(lk)) rangeToLevel.set(r, lk);
    }

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

    const counts = new Map<string, number>();
    for (const d of decks) {
      const ks1 = keysFor(a1, d);
      const ks2 = keysFor(a2, d);
      for (const k1 of ks1) {
        for (const k2 of ks2) {
          const key = `${k1}|${k2}`;
          counts.set(key, (counts.get(key) ?? 0) + 1);
        }
      }
    }

    for (const [key, count] of counts) {
      const [k1, k2] = key.split('|');
      allIntersections.push({ axis1: a1, key1: k1, axis2: a2, key2: k2, count });
    }
  }

  // Anchor-filter: each intersection MUST include at least one anchor's
  // (axis, axisKey). For 2-anchor case, ALSO exclude the current intersection
  // (where both anchors match in canonical order).
  const anchorMatchesIntersection = (
    inter: { axis1: Axis; key1: string; axis2: Axis; key2: string },
    anchor: { axis: Axis; axisKey: string }
  ): boolean => {
    return (
      (inter.axis1 === anchor.axis && inter.key1 === anchor.axisKey) ||
      (inter.axis2 === anchor.axis && inter.key2 === anchor.axisKey)
    );
  };

  let filtered = allIntersections.filter(inter => {
    return currentAxes.some(a => anchorMatchesIntersection(inter, a));
  });

  if (currentAxes.length === 2) {
    const [a, b] = currentAxes;
    filtered = filtered.filter(inter => {
      const isCurrent =
        (anchorMatchesIntersection(inter, a) && anchorMatchesIntersection(inter, b));
      return !isCurrent;
    });
  }

  // Sort: deck-count desc; caller applies tiebreak via localized-name lookup.
  filtered.sort((x, y) => y.count - x.count);

  return filtered.slice(0, limit);
}

/**
 * Arc 6b — page-size for filter+sort+paginated topic-page surfaces.
 * Locked at 24 per operator Q-page-size adjudication. Compile-time
 * constant; consumers use this rather than hard-coding.
 */
export const TOPIC_PAGE_SIZE = 24;

/**
 * Arc 6b — sort key vocabulary for filter+sort+paginated surfaces.
 * - 'newest': publishedAt DESC + id ASC tiebreak (matches existing default)
 * - 'alpha-asc': slug ASC + id ASC (slug derives from title per §17.8.5;
 *   slug-alphabetic ≈ title-alphabetic for production decks)
 * - 'alpha-desc': slug DESC + id ASC
 *
 * Bare path = no `?sort` param = newest (default). `?sort=newest` issues
 * 301 to bare path (canonical-tag discipline per 6c).
 */
export type TopicSortKey = 'newest' | 'alpha-asc' | 'alpha-desc';

function orderByForSort(sort: TopicSortKey) {
  if (sort === 'alpha-asc') return [{ slug: 'asc' as const }, { id: 'asc' as const }];
  if (sort === 'alpha-desc') return [{ slug: 'desc' as const }, { id: 'asc' as const }];
  // 'newest' default
  return [{ publishedAt: 'desc' as const }, { id: 'asc' as const }];
}

/**
 * Arc 6b — paginated + sorted + filtered deck fetch. Powers the
 * filter-sidebar + sort-dropdown + pagination UI on both single-axis
 * and intersection topic pages.
 *
 * primaryAxes carries the path-bound axes (1 anchor for single-axis;
 * 2 anchors for intersection per 6c canonical ordering). secondaryAxes
 * carries the searchParams-driven additional filters (per Q query-string
 * adjudication: universal English-canonical axis-keys).
 *
 * Combines via AND across all axes (operator-locked semantics: stricter
 * filtering as more facets are selected). Per per-locale-bounded fetch
 * convention from 317cb1a7 / 9e83ddff: anchors on language + status
 * (hits compound indexes); axis filters apply on top.
 *
 * Returns: paginated decks + totalCount (for ResultCount) + pageCount
 * (for Pagination). Out-of-range page handling is at the route handler
 * (per Q pagination adjudication: 404 not silent-redirect).
 */
export async function fetchDecksForTopicWithFilters(
  primaryAxes: Array<{ axis: Axis; axisKey: string }>,
  options: {
    secondaryAxes?: Array<{ axis: Axis; axisKey: string }>;
    sort?: TopicSortKey;
    page?: number;
    pageSize?: number;
  },
  locale: string
): Promise<{ decks: TopicDeckSummary[]; totalCount: number; pageCount: number }> {
  const sort = options.sort ?? 'newest';
  const page = Math.max(1, options.page ?? 1);
  const pageSize = options.pageSize ?? TOPIC_PAGE_SIZE;

  const allAxes = [...primaryAxes, ...(options.secondaryAxes ?? [])];

  // Build conjunctive WHERE from all axes. Empty filter on any axis aborts
  // (returns 0 results) — defense-in-depth against malformed param input.
  const whereFragments: Array<Record<string, unknown>> = [];
  for (const a of allAxes) {
    const w = buildAxisWhere(a.axis, a.axisKey);
    if (!w) {
      return { decks: [], totalCount: 0, pageCount: 0 };
    }
    whereFragments.push(w);
  }

  const baseWhere = {
    language: locale,
    status: 'published',
    ...whereFragments.reduce((acc, w) => ({ ...acc, ...w }), {}),
  };

  const [totalCount, decks] = await Promise.all([
    prisma.deck.count({ where: baseWhere }),
    prisma.deck.findMany({
      where: baseWhere,
      select: DECK_SELECT,
      orderBy: orderByForSort(sort),
      skip: (page - 1) * pageSize,
      take: pageSize,
    }) as unknown as Promise<TopicDeckSummary[]>,
  ]);

  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  return { decks, totalCount, pageCount };
}

/**
 * Arc 6b — facet-count aggregation for the filter-sidebar UI.
 *
 * Returns counts per axis-key for the 3 facet axes (theme +
 * exercise-type + educational-level), respecting active filters.
 * Active filters apply via AND-style scoping; counts within an axis
 * reflect "how many decks would match if I add this filter on top of
 * the current selection."
 *
 * primaryAxes: path-bound axes (always applied). activeFilters:
 * additional secondary-axes already selected via searchParams. Counts
 * for the THIRD axis (the one NOT path-bound and NOT active) reflect
 * the cardinality the user would see if they added that axis as a
 * filter.
 *
 * Single round-trip via prisma.deck.findMany + JS aggregation. Could be
 * 3 separate groupBy calls (one per axis) but the JS path is simpler
 * given the theme axis requires unnest-fanout anyway. Per scaling-
 * checkpoint validation at 55K: ~4ms p95 for full-locale fetch + JS
 * aggregation; well under threshold.
 */
export async function getFacetCounts(
  primaryAxes: Array<{ axis: Axis; axisKey: string }>,
  activeFilters: Array<{ axis: Axis; axisKey: string }>,
  locale: string
): Promise<Record<Axis, Array<{ axisKey: string; count: number }>>> {
  const allAxes = [...primaryAxes, ...activeFilters];
  const whereFragments: Array<Record<string, unknown>> = [];
  for (const a of allAxes) {
    const w = buildAxisWhere(a.axis, a.axisKey);
    if (!w) {
      return { theme: [], 'exercise-type': [], 'educational-level': [] };
    }
    whereFragments.push(w);
  }

  const baseWhere = {
    language: locale,
    status: 'published',
    ...whereFragments.reduce((acc, w) => ({ ...acc, ...w }), {}),
  };

  const decks = await prisma.deck.findMany({
    where: baseWhere,
    select: { exerciseType: true, ageRange: true, subjectTags: true },
  });

  const themeRegistry = new Set(listAxisKeys('theme'));
  const exerciseTypeRegistry = new Set(listAxisKeys('exercise-type'));
  const levelKeys = listAxisKeys('educational-level');
  const rangeToLevel = new Map<string, string>();
  for (const lk of levelKeys) {
    for (const r of levelKeyToAgeRanges(lk)) rangeToLevel.set(r, lk);
  }

  const themeCounts = new Map<string, number>();
  const exerciseTypeCounts = new Map<string, number>();
  const levelCounts = new Map<string, number>();

  for (const d of decks) {
    if (exerciseTypeRegistry.has(d.exerciseType)) {
      exerciseTypeCounts.set(d.exerciseType, (exerciseTypeCounts.get(d.exerciseType) ?? 0) + 1);
    }
    for (const tag of d.subjectTags) {
      if (themeRegistry.has(tag)) {
        themeCounts.set(tag, (themeCounts.get(tag) ?? 0) + 1);
      }
    }
    const lk = rangeToLevel.get(d.ageRange);
    if (lk) {
      levelCounts.set(lk, (levelCounts.get(lk) ?? 0) + 1);
    }
  }

  const toSortedArray = (m: Map<string, number>) =>
    Array.from(m.entries())
      .map(([axisKey, count]) => ({ axisKey, count }))
      .sort((a, b) => b.count - a.count);

  return {
    theme: toSortedArray(themeCounts),
    'exercise-type': toSortedArray(exerciseTypeCounts),
    'educational-level': toSortedArray(levelCounts),
  };
}

/**
 * Arc 6b — full theme axis-key enumeration with deck-counts. Used by
 * FilterSidebar's theme-facet show-more expand (per Q theme-facet
 * adjudication: top-N visible + show-more reveals full alphabetic
 * Tier 2). Returned in deck-count desc order; component slices top-12
 * for Tier 1 + remainder for Tier 2 client-side.
 */
export async function listAllNonEmptyThemesWithCounts(
  locale: string
): Promise<Array<{ axisKey: string; count: number }>> {
  const decks = await prisma.deck.findMany({
    where: { language: locale, status: 'published' },
    select: { subjectTags: true },
  });
  const registry = new Set(listAxisKeys('theme'));
  const counts = new Map<string, number>();
  for (const d of decks) {
    for (const tag of d.subjectTags) {
      if (!registry.has(tag)) continue;
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([axisKey, count]) => ({ axisKey, count }))
    .sort((a, b) => b.count - a.count);
}
