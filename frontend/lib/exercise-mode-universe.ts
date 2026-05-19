import { prisma } from './prisma';
import taxonomyData from '@/config/topics-taxonomy.json';
import { getExerciseModeName } from './taxonomy';

interface AppEntry {
  default_subject: string;
  default_age_range: string;
  exercise_type_axis_key: string;
}

interface Taxonomy {
  apps: Record<string, AppEntry>;
}

const taxonomy = taxonomyData as unknown as Taxonomy;

export type Subject = 'math' | 'letters' | 'logic' | 'spatial-reasoning';

export const SUBJECT_ORDER: Subject[] = ['math', 'letters', 'logic', 'spatial-reasoning'];

export interface ExerciseModeTile {
  exerciseType: string;
  exerciseMode: string | null;
  appLabel: string;
  modeLabel: string | null;
  subject: Subject;
  deck: {
    slug: string;
    language: string;
    title: string;
    thumbnailUrl: string;
  };
  isFallback: boolean;
}

const DECK_SELECT = {
  slug: true,
  language: true,
  title: true,
  exerciseType: true,
  exerciseMode: true,
  thumbnailUrl: true,
  publishedAt: true,
} as const;

interface RawDeck {
  slug: string;
  language: string;
  title: any;
  exerciseType: string;
  exerciseMode: string | null;
  thumbnailUrl: string;
  publishedAt: Date | null;
}

function titleFor(deck: RawDeck): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || titleMap.en || deck.slug;
}

function bucketKey(exerciseType: string, exerciseMode: string | null): string {
  return `${exerciseType}::${exerciseMode ?? ''}`;
}

function titleCase(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function appLabelFor(exerciseType: string): string {
  return titleCase(exerciseType);
}

function subjectFor(exerciseType: string): Subject {
  const subject = taxonomy.apps[exerciseType]?.default_subject;
  if (subject === 'math' || subject === 'letters' || subject === 'logic' || subject === 'spatial-reasoning') {
    return subject;
  }
  return 'math';
}

/**
 * Returns one representative tile per (exerciseType, exerciseMode) tuple in the
 * published English catalog. For each tuple, the deck used is:
 *   1. most-recent published deck in visitorLocale, if any
 *   2. else most-recent published English deck (the "loan from English" rule)
 *
 * The English catalog is treated as the canonical universe per CLAUDE.md §19.5
 * (Tier 1 en is Track-C-complete). Per operator: locale-mismatched tiles fall
 * back silently — the homepage looks structurally complete in every locale.
 */
export async function getExerciseModeUniverse(visitorLocale: string): Promise<ExerciseModeTile[]> {
  const locales = Array.from(new Set([visitorLocale, 'en']));

  const decks = (await prisma.deck.findMany({
    where: {
      status: 'published',
      language: { in: locales },
    },
    select: DECK_SELECT,
    orderBy: [{ publishedAt: 'desc' }, { slug: 'asc' }],
  })) as RawDeck[];

  // Two passes:
  //   pass 1 — record the most-recent EN deck per bucket (anchors the universe)
  //   pass 2 — record the most-recent visitor-locale deck per bucket (overrides EN)
  const enByBucket = new Map<string, RawDeck>();
  const visitorByBucket = new Map<string, RawDeck>();

  for (const deck of decks) {
    const key = bucketKey(deck.exerciseType, deck.exerciseMode);
    if (deck.language === 'en' && !enByBucket.has(key)) {
      enByBucket.set(key, deck);
    }
    if (deck.language === visitorLocale && !visitorByBucket.has(key)) {
      visitorByBucket.set(key, deck);
    }
  }

  const tiles: ExerciseModeTile[] = [];
  for (const [key, enDeck] of enByBucket.entries()) {
    const visitorDeck = visitorByBucket.get(key);
    const chosen = visitorDeck ?? enDeck;
    const isFallback = chosen.language !== visitorLocale;

    tiles.push({
      exerciseType: enDeck.exerciseType,
      exerciseMode: enDeck.exerciseMode,
      appLabel: appLabelFor(enDeck.exerciseType),
      modeLabel: enDeck.exerciseMode ? getExerciseModeName(enDeck.exerciseMode, visitorLocale) : null,
      subject: subjectFor(enDeck.exerciseType),
      deck: {
        slug: chosen.slug,
        language: chosen.language,
        title: titleFor(chosen),
        thumbnailUrl: chosen.thumbnailUrl,
      },
      isFallback,
    });
  }

  // Sort within each subject: by appLabel, then modeLabel (nulls last)
  tiles.sort((a, b) => {
    if (a.subject !== b.subject) {
      return SUBJECT_ORDER.indexOf(a.subject) - SUBJECT_ORDER.indexOf(b.subject);
    }
    const appCmp = a.appLabel.localeCompare(b.appLabel);
    if (appCmp !== 0) return appCmp;
    if (a.modeLabel === null && b.modeLabel === null) return 0;
    if (a.modeLabel === null) return -1;
    if (b.modeLabel === null) return 1;
    return a.modeLabel.localeCompare(b.modeLabel);
  });

  return tiles;
}

export function groupBySubject(tiles: ExerciseModeTile[]): Record<Subject, ExerciseModeTile[]> {
  const grouped: Record<Subject, ExerciseModeTile[]> = {
    math: [],
    letters: [],
    logic: [],
    'spatial-reasoning': [],
  };
  for (const tile of tiles) {
    grouped[tile.subject].push(tile);
  }
  return grouped;
}
