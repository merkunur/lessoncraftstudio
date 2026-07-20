/**
 * Per-deck vocabulary — the words and objects actually on each worksheet.
 *
 * Feeds the `{vocab}` slot of `seo.worksheetMainAlt`, so a deck thumbnail says
 *
 *   "Printable Word Search worksheet featuring owl, giraffe, and panda for kindergarten"
 *
 * instead of the category-level "Preview of Word Search worksheet featuring
 * Animals for kindergarten" that ~5,000 topic hubs render today, 24 times each.
 *
 * The map is built OFFLINE by scripts/seo-per-page/build-deck-vocab.js from the
 * extracted deck facts, and every entry is proved to trace back to its own deck
 * by scripts/seo-per-page/verify-deck-vocab.js (90,001 names, all locales). Two
 * consequences of doing it offline:
 *
 *   - No 1.7 MB fact file and no 491 KB vocabulary is loaded at render.
 *   - The English→locale translation of image nouns happens once, at build, so
 *     a German page can never accidentally print the English library key.
 *
 * Absent file, absent deck, or absent locale all resolve to `undefined`, and
 * `buildWorksheetMainAlt` then uses its ...NoVocab template — the current
 * wording. Nothing degrades if this data is missing.
 */
import * as fs from 'fs';
import * as path from 'path';
import { buildDeckRichAlt, buildWorksheetMainAlt } from '@/lib/deck-seo';

type VocabMap = Record<string, string[]>;

// Same candidate-dir strategy as landing-content.ts: the release cwd has no
// content/ directory, so the git checkout is the guaranteed fallback (§A.1).
const _DIRS = [
  path.join(process.cwd(), 'content', 'deck-vocab'),
  path.join(process.cwd(), 'frontend', 'content', 'deck-vocab'),
  '/opt/lessoncraftstudio/frontend/content/deck-vocab',
];

const _cache: Record<string, VocabMap | null> = {};

function load(locale: string): VocabMap | null {
  if (locale in _cache) return _cache[locale];
  let data: VocabMap | null = null;
  if (/^[a-z]{2}$/.test(locale)) {
    for (const dir of _DIRS) {
      const p = path.join(dir, `${locale}.json`);
      try {
        if (fs.existsSync(p)) { data = JSON.parse(fs.readFileSync(p, 'utf8')) as VocabMap; break; }
      } catch { /* try the next candidate */ }
    }
  }
  _cache[locale] = data;
  return data;
}

/**
 * The (up to 3) names this deck may honestly claim are on its sheet, already in
 * `locale`. Returns undefined when the deck has none — callers must treat that
 * as "say nothing specific", never as "guess".
 */
export function deckVocabNames(locale: string, deckSlug: string): string[] | undefined {
  const map = load(locale);
  const names = map?.[deckSlug];
  return names && names.length ? names : undefined;
}

/**
 * Alt text for a deck thumbnail on a browse surface.
 *
 * When this deck's contents are known, it describes them —
 * "Printable Word Search worksheet featuring owl, giraffe, and panda for
 * kindergarten" — using `seo.worksheetMainAlt`, the same native-authored
 * template already live on deck.html main images in all 11 locales.
 *
 * When they are not known (~28% of decks, mostly the generated printable
 * families whose contents live outside the manifest), it returns the EXISTING
 * `seo.deckCardAlt` wording unchanged. That is deliberate: a deck we cannot
 * describe truthfully should keep its current honest generality rather than
 * receive an invented specific.
 */
export function buildDeckThumbAlt(
  deck: { slug: string; exerciseType: string; subjectTags: string[]; ageRange: string; title: string },
  locale: string,
  tMainAlt: (key: string, params: Record<string, string>) => string,
  tCardAlt: (key: string, params: Record<string, string>) => string,
): string {
  const vocabNames = deckVocabNames(locale, deck.slug);
  if (vocabNames) {
    return buildWorksheetMainAlt({ ...deck, vocabNames }, locale, tMainAlt);
  }
  return buildDeckRichAlt(deck, locale, tCardAlt);
}
