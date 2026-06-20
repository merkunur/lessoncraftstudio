/**
 * Data layer for the /learn ("Languages") cross-language category. Queries the
 * cross-language decks (contentLanguage = the TARGET language) — the exact
 * complement of the MONOLINGUAL_WHERE filter that the monolingual surfaces use.
 * Reuses DECK_SELECT + the sort + page size from topic-decks so cards render
 * identically; hits the [language, status, content_language] index.
 */
import { prisma } from './prisma';
import {
  DECK_SELECT,
  orderByForSort,
  TOPIC_PAGE_SIZE,
  type TopicDeckSummary,
  type TopicSortKey,
} from './topic-decks';

export interface CrossLangTarget {
  iso: string; // target language ISO 639-1 (= Deck.contentLanguage)
  count: number;
}

/** Distinct target languages (with deck counts) available for a page locale. */
export async function fetchCrossLanguageTargets(locale: string): Promise<CrossLangTarget[]> {
  const grouped = await prisma.deck.groupBy({
    by: ['contentLanguage'],
    where: { language: locale, status: 'published', contentLanguage: { not: null } },
    _count: { _all: true },
  });
  return grouped
    .filter((g) => g.contentLanguage)
    .map((g) => ({ iso: g.contentLanguage as string, count: g._count._all }))
    .sort((a, b) => b.count - a.count || a.iso.localeCompare(b.iso));
}

/** Total cross-language deck count for a page locale (across all targets). */
export async function countCrossLanguageDecks(locale: string): Promise<number> {
  return prisma.deck.count({ where: { language: locale, status: 'published', contentLanguage: { not: null } } });
}

/** Paginated/sorted/filtered cross-language decks for (page locale, target). */
export async function fetchCrossLanguageDecks(
  locale: string,
  targetIso: string,
  options: { type?: string; theme?: string; sort?: TopicSortKey; page?: number; pageSize?: number } = {}
): Promise<{ decks: TopicDeckSummary[]; totalCount: number; pageCount: number }> {
  const sort: TopicSortKey = options.sort ?? 'newest';
  const page = Math.max(1, options.page ?? 1);
  const pageSize = options.pageSize ?? TOPIC_PAGE_SIZE;
  const where: Record<string, unknown> = { language: locale, status: 'published', contentLanguage: targetIso };
  if (options.type) where.exerciseType = options.type;
  if (options.theme) where.subjectTags = { has: options.theme };

  const [decks, totalCount] = await Promise.all([
    prisma.deck.findMany({
      where,
      select: DECK_SELECT,
      orderBy: orderByForSort(sort),
      skip: (page - 1) * pageSize,
      take: pageSize,
    }) as unknown as Promise<TopicDeckSummary[]>,
    prisma.deck.count({ where }),
  ]);
  return { decks, totalCount, pageCount: Math.max(1, Math.ceil(totalCount / pageSize)) };
}

/** Facet counts (exercise-type + theme) for a (page locale, target) — drives the sidebar. */
export async function fetchCrossLanguageFacets(
  locale: string,
  targetIso: string
): Promise<{ types: Array<{ key: string; count: number }>; themes: Array<{ key: string; count: number }> }> {
  const base = { language: locale, status: 'published', contentLanguage: targetIso };
  const [typeGroups, decks] = await Promise.all([
    prisma.deck.groupBy({ by: ['exerciseType'], where: base, _count: { _all: true } }),
    prisma.deck.findMany({ where: base, select: { subjectTags: true } }),
  ]);
  const themeCount: Record<string, number> = {};
  decks.forEach((d) => (d.subjectTags || []).forEach((t) => { if (!t.includes('-vs-')) themeCount[t] = (themeCount[t] || 0) + 1; }));
  return {
    types: typeGroups.map((g) => ({ key: g.exerciseType, count: g._count._all })).sort((a, b) => b.count - a.count),
    themes: Object.entries(themeCount).map(([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count || a.key.localeCompare(b.key)),
  };
}
