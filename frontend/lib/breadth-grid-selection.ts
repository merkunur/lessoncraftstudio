import { prisma } from './prisma';

export interface BreadthGridDeck {
  id: string;
  slug: string;
  language: string;
  title: any;
  exerciseType: string;
  subjectTags: string[];
  thumbnailUrl: string;
  publishedAt: Date | null;
}

export interface BreadthGridSelection {
  visiting: BreadthGridDeck[];
  crossLocale: BreadthGridDeck[];
  featured: BreadthGridDeck | null;
}

const DECK_SELECT = {
  id: true,
  slug: true,
  language: true,
  title: true,
  exerciseType: true,
  subjectTags: true,
  thumbnailUrl: true,
  publishedAt: true,
} as const;

const ALL_LOCALES: string[] = [
  'en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi',
];

const SIBLING_POOLS: Record<string, string[]> = {
  en: ['de', 'nl'],
  de: ['en', 'nl'],
  nl: ['de', 'en'],
  es: ['it', 'pt', 'fr'],
  it: ['fr', 'es', 'pt'],
  fr: ['it', 'es', 'pt'],
  pt: ['es', 'it', 'fr'],
  sv: ['da', 'no', 'fi'],
  da: ['sv', 'no', 'fi'],
  no: ['sv', 'da', 'fi'],
  fi: ['sv', 'da', 'no'],
};

function structurallyDifferentPool(visitorLocale: string): string[] {
  const siblings = new Set(SIBLING_POOLS[visitorLocale] ?? []);
  return ALL_LOCALES.filter(l => l !== visitorLocale && !siblings.has(l));
}

function pickVisitingLocale(
  candidates: BreadthGridDeck[],
  target: number
): BreadthGridDeck[] {
  const picked: BreadthGridDeck[] = [];
  const usedTypes = new Set<string>();
  const pickedIds = new Set<string>();
  const themed = candidates.filter(d => d.subjectTags.length > 0);
  const themeless = candidates.filter(d => d.subjectTags.length === 0);

  let themedCount = 0;
  for (const d of themed) {
    if (themedCount >= 3) break;
    if (!usedTypes.has(d.exerciseType)) {
      picked.push(d);
      usedTypes.add(d.exerciseType);
      pickedIds.add(d.id);
      themedCount += 1;
    }
  }

  let themelessCount = 0;
  for (const d of themeless) {
    if (themelessCount >= 3) break;
    if (!usedTypes.has(d.exerciseType)) {
      picked.push(d);
      usedTypes.add(d.exerciseType);
      pickedIds.add(d.id);
      themelessCount += 1;
    }
  }

  for (const d of candidates) {
    if (picked.length >= target) break;
    if (!usedTypes.has(d.exerciseType) && !pickedIds.has(d.id)) {
      picked.push(d);
      usedTypes.add(d.exerciseType);
      pickedIds.add(d.id);
    }
  }

  return picked.slice(0, target);
}

function pickFromPool(
  pool: readonly string[],
  byLocale: Map<string, BreadthGridDeck[]>,
  countByLocale: Map<string, number>,
  usedExerciseTypes: Set<string>,
  alreadyPickedIds: Set<string>
): BreadthGridDeck | null {
  const ordered = [...pool].sort((a, b) =>
    (countByLocale.get(b) ?? 0) - (countByLocale.get(a) ?? 0)
  );
  for (const loc of ordered) {
    const decks = byLocale.get(loc) ?? [];
    for (const d of decks) {
      if (!usedExerciseTypes.has(d.exerciseType) && !alreadyPickedIds.has(d.id)) {
        return d;
      }
    }
  }
  return null;
}

// Per-locale candidate fetch — LIMIT-bounded, deterministic, hits the
// (language, status, *) compound prefix indexes. Replaces the prior
// no-filter findMany that returned the full published catalog into memory.
// At any catalog scale this returns at most CANDIDATES_PER_LOCALE rows per
// locale; selection-algorithm consumes at most ~7 from any single locale.
const CANDIDATES_PER_LOCALE = 20;

async function fetchLocaleCandidates(
  locale: string
): Promise<BreadthGridDeck[]> {
  return prisma.deck.findMany({
    where: { language: locale, status: 'published' },
    select: DECK_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    take: CANDIDATES_PER_LOCALE,
  }) as unknown as Promise<BreadthGridDeck[]>;
}

/**
 * Selects the BreadthGrid composition for a visiting locale.
 *
 * Composition rule: 6 visiting-locale + 2 cross-locale = 8 grid thumbnails;
 * + 1 featured inline-play tile = 9 total. Where the visiting-locale catalog
 * has fewer than 6 published decks, padding shifts to cross-locale to maintain
 * 8 grid thumbnails (e.g. `no` currently 1 visiting + 7 cross-locale).
 *
 * Cross-locale pick 1 = sibling-language locale (Germanic / Romance / Nordic
 * pool); pick 2 = structurally-different family. Both subject to mechanic-
 * diversity (no exerciseType repeats across the 8).
 *
 * Featured tile prefers visiting-locale; falls back to en/de when visiting
 * locale lacks a 7th distinct deck.
 *
 * Determinism: candidates ordered by publishedAt DESC then id ASC. Stable
 * within a given DB state. ISR revalidate (3600s on the home-page route)
 * picks up newly-published decks at the next revalidation window.
 *
 * Scale shape: per-locale bounded fetch (max CANDIDATES_PER_LOCALE per
 * locale × 11 locales = 220 rows max) + 1 groupBy aggregate for true
 * deck-counts driving the cross-locale pool-sort. Total wall time ~30ms
 * regardless of catalog size; replaces the prior full-catalog findMany
 * that scaled linearly with published-deck count.
 */
export async function selectBreadthGridDecks(
  visitorLocale: string
): Promise<BreadthGridSelection> {
  const [perLocaleResults, countsRaw] = await Promise.all([
    Promise.all(ALL_LOCALES.map(loc => fetchLocaleCandidates(loc))),
    prisma.deck.groupBy({
      by: ['language'],
      where: { status: 'published' },
      _count: { _all: true },
    }),
  ]);

  const byLocale = new Map<string, BreadthGridDeck[]>();
  ALL_LOCALES.forEach((loc, i) => byLocale.set(loc, perLocaleResults[i]));

  const countByLocale = new Map<string, number>();
  for (const c of countsRaw) {
    countByLocale.set(c.language, c._count._all);
  }

  const visiting = pickVisitingLocale(byLocale.get(visitorLocale) ?? [], 6);
  const usedExerciseTypes = new Set(visiting.map(d => d.exerciseType));
  const pickedIds = new Set(visiting.map(d => d.id));

  const crossLocale: BreadthGridDeck[] = [];

  const siblingPool = SIBLING_POOLS[visitorLocale] ?? [];
  const siblingPick = pickFromPool(siblingPool, byLocale, countByLocale, usedExerciseTypes, pickedIds);
  if (siblingPick) {
    crossLocale.push(siblingPick);
    usedExerciseTypes.add(siblingPick.exerciseType);
    pickedIds.add(siblingPick.id);
  }

  const sdPool = structurallyDifferentPool(visitorLocale);
  const sdPick = pickFromPool(sdPool, byLocale, countByLocale, usedExerciseTypes, pickedIds);
  if (sdPick) {
    crossLocale.push(sdPick);
    usedExerciseTypes.add(sdPick.exerciseType);
    pickedIds.add(sdPick.id);
  }

  // Edge-case padding for sparse visiting-locale catalogs (e.g. `no` currently 1).
  // Spread further cross-locale picks across remaining locales by deck-count.
  const targetThumbnails = 8;
  if (visiting.length + crossLocale.length < targetThumbnails) {
    const usedLocales = new Set([
      visitorLocale,
      ...crossLocale.map(d => d.language),
    ]);
    const padPool = ALL_LOCALES.filter(l => !usedLocales.has(l));
    while (visiting.length + crossLocale.length < targetThumbnails && padPool.length > 0) {
      const pick = pickFromPool(padPool, byLocale, countByLocale, usedExerciseTypes, pickedIds);
      if (!pick) break;
      crossLocale.push(pick);
      usedExerciseTypes.add(pick.exerciseType);
      pickedIds.add(pick.id);
      const idx = padPool.indexOf(pick.language);
      if (idx >= 0) padPool.splice(idx, 1);
    }
    // Pool exhausted but still short — allow same-locale repeats while preserving
    // mechanic-diversity. Edge case for tiny catalogs.
    if (visiting.length + crossLocale.length < targetThumbnails) {
      const fallbackPool = ALL_LOCALES.filter(l => l !== visitorLocale);
      while (visiting.length + crossLocale.length < targetThumbnails) {
        const pick = pickFromPool(fallbackPool, byLocale, countByLocale, usedExerciseTypes, pickedIds);
        if (!pick) break;
        crossLocale.push(pick);
        usedExerciseTypes.add(pick.exerciseType);
        pickedIds.add(pick.id);
      }
    }
  }

  // Featured tile: prefer visiting-locale, then en/de fallback. Enforces
  // mechanic-diversity (distinct exerciseType from the 8 thumbnails) so the
  // 9-cell grid surfaces 9 distinct mechanics. Last-resort fallback relaxes
  // this only when the catalog genuinely has no 9th distinct mechanic.
  let featured: BreadthGridDeck | null = null;
  const visitingPool = byLocale.get(visitorLocale) ?? [];
  for (const d of visitingPool) {
    if (!pickedIds.has(d.id) && !usedExerciseTypes.has(d.exerciseType)) {
      featured = d;
      break;
    }
  }
  if (!featured) {
    for (const fallbackLocale of ['en', 'de']) {
      const decks = byLocale.get(fallbackLocale) ?? [];
      const found = decks.find(
        d => !pickedIds.has(d.id) && !usedExerciseTypes.has(d.exerciseType)
      );
      if (found) {
        featured = found;
        break;
      }
    }
  }
  if (!featured) {
    for (const d of visitingPool) {
      if (!pickedIds.has(d.id)) {
        featured = d;
        break;
      }
    }
  }
  if (!featured) {
    for (const fallbackLocale of ['en', 'de']) {
      const decks = byLocale.get(fallbackLocale) ?? [];
      const found = decks.find(d => !pickedIds.has(d.id));
      if (found) {
        featured = found;
        break;
      }
    }
  }

  return { visiting, crossLocale, featured };
}
