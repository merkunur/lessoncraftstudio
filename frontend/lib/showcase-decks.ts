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
 * counting / logic / visual / spatial so any slice is cross-subject.
 * cryptogram is excluded (0 themed decks — text-only, not visually appealing).
 *
 * ⚠ THIS LIST IS THE SUPPLY CEILING, and that is not obvious from the call site.
 * The assembler below takes AT MOST ONE deck per type, so `selectShowcaseDecks`
 * can never return more decks than there are entries here — asking for 22 from
 * an 18-entry list silently yields 18. The homepage's print room sizes its wall
 * off this number (see app/[locale]/page.tsx), so shortening this list shortens
 * that wall.
 *
 * Extended 18 -> 25 (2026-08-05) so the print room can hang a full third row.
 * Every addition was verified against the LIVE production DB to have themed,
 * published decks in all ELEVEN locales — thinnest locale in brackets:
 * code-addition (97), math-puzzle (140), find-objects (93), grid-match (47),
 * word-guess (49), pattern-worksheet (46), bingo (36).
 * REJECTED: `picture-path` (0 `en` decks — en publishes `picture-trail`
 * instead, so `en` would burn a slot for nothing) and `math-worksheet`
 * (Gr3-6 content, above this platform's K-2 ceiling).
 *
 * The same audit found that `crossword` has no THEMED decks in es/pt, and
 * `sudoku` none in pt. That is NOT an English-deck leak: candidatesForType
 * falls back to themeless IN-LOCALE decks first (47 / 47 / 150 available
 * respectively) and only reaches the English branch when a locale has no deck
 * of that type at all — which is true of none of the 25. Those three
 * (type, locale) pairs render an in-locale worksheet without images.
 */
const SHOWCASE_TYPES = [
  'addition',        // math
  'alphabet-train',  // letters
  'find-and-count',  // counting
  'sudoku',          // logic
  'matching',        // visual
  'more-less',       // comparison
  'code-addition',   // math
  'wordsearch',      // letters
  'chart-count',     // data
  'grid-match',      // visual
  'picture-sort',    // sorting
  'subtraction',     // math
  'crossword',       // letters
  'find-objects',    // visual scan
  'pattern-train',   // pattern
  'prepositions',    // spatial
  'math-puzzle',     // math / logic
  'word-guess',      // letters
  'missing-pieces',  // visual
  'big-small',       // comparison
  'treasure-hunt',   // spatial
  'odd-one-out',     // logic
  'shadow-match',    // visual
  'bingo',           // letters
  'pattern-worksheet', // pattern (spare-slot filler: 25 types against a request
                       // of 22 means a type that ever yields nothing is simply
                       // backfilled by the next one)
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

// Black-and-white themes are English-canonical `_bw`-suffixed subjectTags
// (valentine_bw, food_bw_2, …) across all locales. Exclude them from the
// showcase — a grey tile reads as dull next to the colour decks (§20.5).
function isColorDeck(d: ShowcaseDeck): boolean {
  return !(d.subjectTags || []).some((t) => /_bw(?:_\d+)?$/.test(t));
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
  const mapped = (rows as unknown as ShowcaseDeck[]).map(withThumb);
  // Prefer colour decks; fall back to the full set only if a type has none.
  const color = mapped.filter(isColorDeck);
  return color.length > 0 ? color : mapped;
}

/**
 * One real deck thumbnail per requested exercise type, in `locale` (en-fallback
 * inside candidatesForType for sparse locales). Used by the homepage-v4 hero /
 * embed / makers sections to show worksheet thumbnails in the VISITOR's language
 * instead of the hardcoded English decorative decks. Returns `null` for a type
 * with no candidate so the caller can fall back to its English decorative slug.
 * DB failure → all null (caller falls back). Themes vary per locale, so callers
 * pair these with theme-neutral, type-descriptive alt text.
 */
export async function getTypedThumbs(locale: string, types: string[]): Promise<(string | null)[]> {
  try {
    const perType = await Promise.all(types.map((t) => candidatesForType(t, locale)));
    return perType.map((cands) => cands[0]?.thumbnailUrl ?? null);
  } catch {
    return types.map(() => null);
  }
}

/**
 * Select the try-it band composition: one deck per curated exercise type,
 * preferring a distinct THEME per tile so the grid is visually varied (not a
 * wall of one theme). First 9 kept (featured = decks[0], thumbs = the next 8).
 * All in the visitor's locale (en fallback per type). DB failure → empty
 * (caller renders nothing — honesty).
 */
/**
 * Curated FALLBACK showcase — verified published EN decks, one per
 * exercise type with distinct themes (queried from the prod DB
 * 2026-08-01; thumbnails spot-checked 200). Used by the homepage when the
 * DB is unreachable or returns nothing, so the fold/wall never render
 * empty. EN-only by design: a fallback in the wrong language is still
 * a real, working worksheet.
 *
 * ⚠ This is NOT a rarely-exercised path in development: local dev has no
 * database, so every local render and every local screenshot comes from
 * here. It must therefore be long enough to fill the same walls the DB path
 * fills, or the layout you verify locally is not the layout that ships.
 * Extended 18 -> 24 (2026-08-05) alongside SHOWCASE_TYPES for that reason;
 * all 24 slugs re-checked 200 on production the same day.
 */
const FALLBACK_SLUGS: Array<[type: string, slug: string, title: string]> = [
  ['addition', 'addition-mixed-easter', 'Addition Practice'],
  ['sudoku', 'sudoku-breakfast', 'Picture Sudoku'],
  ['matching', 'matching-name-birds', 'Match Up!'],
  ['find-and-count', 'find-and-count-letter-spotting-clothing-17', 'Letter Spotting'],
  ['more-less', 'more-less-around-the-house', 'More or Less'],
  ['bingo', 'bingo-summer', 'Picture Bingo'],
  ['chart-count', 'chart-count-animals', 'Count & Chart'],
  ['grid-match', 'grid-match-thanksgiving', 'Grid Match'],
  ['shadow-match', 'shadow-match-tools-3', 'Shadow Match'],
  ['missing-pieces', 'missing-pieces-things-that-fly-5', 'Missing Pieces'],
  ['odd-one-out', 'odd-one-out-insects-and-bugs', 'Odd One Out'],
  ['find-objects', 'find-objects-i-spy-weather-e938', 'I Spy'],
  ['subtraction', 'subtraction-cross-out-space', 'Subtraction'],
  ['pattern-train', 'pattern-train-aab-things-that-fly', 'Pattern Train'],
  ['big-small', 'big-small-findbig-occupations', 'Big or Small'],
  ['word-guess', 'word-guess-easy-insects-and-bugs', 'Word Guess'],
  ['crossword', 'crossword-around-the-house', 'Picture Crossword'],
  ['wordsearch', 'wordsearch-occupations', 'Word Search'],
  ['alphabet-train', 'alphabet-train-letter-hint-vehicles-bfc4', 'Alphabet Train'],
  ['code-addition', 'code-addition-secret-word-winter', 'Code Addition'],
  ['math-puzzle', 'math-puzzle-toys-3', 'Math Puzzle'],
  ['picture-sort', 'picture-sort-bakery-vs-beach', 'Picture Sort'],
  ['prepositions', 'prepositions-multiplechoice-vegetables', 'Prepositions'],
  ['treasure-hunt', 'treasure-hunt-4th-of-july-050', 'Treasure Hunt'],
];

export function fallbackShowcase(count: number = SHOWCASE_COUNT): ShowcaseSelection {
  const decks: ShowcaseDeck[] = FALLBACK_SLUGS.slice(0, count).map(([type, slug, title], i) => ({
    id: `fallback-${i}`,
    slug,
    language: 'en',
    exerciseType: type,
    subjectTags: [],
    title: { en: title },
    thumbnailUrl: `https://www.lessoncraftstudio.com/en/decks/${slug}/thumbnail.png`,
    publishedAt: null,
  }));
  return { featured: decks[0] ?? null, thumbs: decks.slice(1, count) };
}

export async function selectShowcaseDecks(
  locale: string,
  count: number = SHOWCASE_COUNT,
): Promise<ShowcaseSelection> {
  const rot = dayRotation() % SHOWCASE_TYPES.length;
  const orderedTypes = [...SHOWCASE_TYPES.slice(rot), ...SHOWCASE_TYPES.slice(0, rot)];

  const perType = await Promise.all(orderedTypes.map((t) => candidatesForType(t, locale)));

  const usedThemes = new Set<string>();
  const usedIds = new Set<string>();
  const decks: ShowcaseDeck[] = [];
  for (const cands of perType) {
    if (decks.length >= count) break;
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
  return { featured: decks[0], thumbs: decks.slice(1, count) };
}
