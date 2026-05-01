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
