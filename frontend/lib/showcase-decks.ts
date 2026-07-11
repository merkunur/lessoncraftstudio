import { prisma } from './prisma';
import { deckAssets } from '@/lib/seo/landing-content';

/**
 * Showcase-deck selection for the homepage "Try a worksheet" band (TryItBandV4).
 *
 * Distinct from `selectBreadthGridDecks` (which is shared by the dormant v2 grid
 * + featured-deck-by-locale and samples the 20 MOST-RECENT decks per locale —
 * fragile: when recent publishes are one exercise type, the grid collapses to
 * duplicates). This selector GUARANTEES variety structurally: it walks a curated,
 * subject-diverse list of image-rich exercise types and pulls one themed deck of
 * EACH — so the band always shows genuinely different, attractive worksheets, all
 * in the visitor's language. Aligns with the §18.2 curated-samples doctrine.
 */

export interface ShowcaseDeck {
  id: string;
  slug: string;
  language: string;
  title: unknown;
  exerciseType: string;
  subjectTags: string[];
  thumbnailUrl: string;
  publishedAt: Date | null;
}

export interface ShowcaseSelection {
  featured: ShowcaseDeck | null;
  thumbs: ShowcaseDeck[];
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

/**
 * Curated, subject-diverse, image-rich exercise types (every one verified to
 * have dozens-to-hundreds of themed decks). Interleaved across math / letters /
 * counting / logic / visual / spatial so any 9-deck slice is cross-subject.
 * cryptogram is excluded (0 themed decks — text-only, not visually appealing).
 */
const SHOWCASE_TYPES = [
  'addition', 'alphabet-train', 'find-and-count', 'sudoku', 'matching', 'more-less',
  'picture-sort', 'wordsearch', 'shadow-match', 'subtraction', 'pattern-train',
  'prepositions', 'missing-pieces', 'big-small', 'treasure-hunt', 'odd-one-out',
  'crossword', 'chart-count',
];

const SHOWCASE_COUNT = 9; // 1 featured inline-play tile + 8 thumbnails

/**
 * UTC day-of-week rotation (ISR-cache-stable within a day; varies for repeat
 * visitors across the week). Mirrors breadth-grid-selection's rotation idea.
 */
function dayRotation(): number {
  return Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % 7;
}

const CANDIDATES_PER_TYPE = 14; // enough spread to find an unused theme per type

function withThumb(d: ShowcaseDeck): ShowcaseDeck {
  // Slug-derived thumbnail (canonical, drift-proof — §8.1).
  return { ...d, thumbnailUrl: deckAssets(d.language, d.slug).thumbnail };
}

function themeOf(d: ShowcaseDeck): string {
  return (d.subjectTags && d.subjectTags[0]) || '';
}

/**
 * Recent themed (image-rich) candidate decks of `type` in `locale`; falls back
 * to themeless in-locale, then themed in `en` (sparse locales). Multiple
 * candidates so the assembler can pick one with an as-yet-unused THEME.
 */
async function candidatesForType(type: string, locale: string): Promise<ShowcaseDeck[]> {
  const order = [{ publishedAt: 'desc' as const }, { id: 'asc' as const }];
  const base = { status: 'published' as const, contentLanguage: null, exerciseType: type };
  let rows = await prisma.deck.findMany({
    where: { ...base, language: locale, subjectTags: { isEmpty: false } },
    orderBy: order, take: CANDIDATES_PER_TYPE, select: DECK_SELECT,
  });
  if (rows.length === 0) {
    rows = await prisma.deck.findMany({
      where: { ...base, language: locale }, orderBy: order, take: CANDIDATES_PER_TYPE, select: DECK_SELECT,
    });
  }
  if (rows.length === 0 && locale !== 'en') {
    rows = await prisma.deck.findMany({
      where: { ...base, language: 'en', subjectTags: { isEmpty: false } },
      orderBy: order, take: CANDIDATES_PER_TYPE, select: DECK_SELECT,
    });
  }
  return (rows as unknown as ShowcaseDeck[]).map(withThumb);
}

/**
 * Select the try-it band composition: one deck per curated exercise type,
 * preferring a distinct THEME per tile so the grid is visually varied (not a
 * wall of one theme). First 9 kept (featured = decks[0], thumbs = the next 8).
 * All in the visitor's locale (en fallback per type). DB failure → empty
 * (caller renders nothing — honesty).
 */
export async function selectShowcaseDecks(locale: string): Promise<ShowcaseSelection> {
  const rot = dayRotation() % SHOWCASE_TYPES.length;
  const orderedTypes = [...SHOWCASE_TYPES.slice(rot), ...SHOWCASE_TYPES.slice(0, rot)];

  const perType = await Promise.all(orderedTypes.map((t) => candidatesForType(t, locale)));

  const usedThemes = new Set<string>();
  const usedIds = new Set<string>();
  const decks: ShowcaseDeck[] = [];
  for (const cands of perType) {
    if (decks.length >= SHOWCASE_COUNT) break;
    // Prefer a candidate whose theme hasn't been used yet (visual variety);
    // fall back to any unused deck if every candidate's theme is taken.
    let pick = cands.find((d) => !usedIds.has(d.id) && !usedThemes.has(themeOf(d)));
    if (!pick) pick = cands.find((d) => !usedIds.has(d.id));
    if (!pick) continue;
    decks.push(pick);
    usedIds.add(pick.id);
    const th = themeOf(pick);
    if (th) usedThemes.add(th);
  }

  if (decks.length === 0) return { featured: null, thumbs: [] };
  return { featured: decks[0], thumbs: decks.slice(1, SHOWCASE_COUNT) };
}
