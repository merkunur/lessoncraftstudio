import taxonomyData from '@/config/topics-taxonomy.json';
import { ageRangeToLevelKey, getAxisName } from './taxonomy';

// Theme axis-keys are 100 entries (50 color + 50 BW per CLAUDE.md §16.5.1).
// Precomputed at module load so deck-card render doesn't re-walk taxonomy
// per deck.
const THEME_AXIS_KEYS: Set<string> = new Set(
  Object.keys(
    ((taxonomyData as { axes?: { theme?: Record<string, unknown> } }).axes?.theme) ?? {},
  ),
);

export interface DeckAltInput {
  exerciseType: string;
  subjectTags: string[];
  ageRange: string;
  title: string;
}

/**
 * Build a richer alt-text string for a deck thumbnail per the SEO audit
 * recommendation (2026-05-27): "Preview of {exerciseType} worksheet
 * featuring {theme} for {level}" — maps closer to image-search query
 * shapes than the bare deck title alone.
 *
 * Falls back to the bare deck.title if any taxonomy lookup fails
 * (off-taxonomy themes, missing locale entries, unmapped ageRange) —
 * substrate-honesty per §16.6.1; a half-composed template would read
 * worse than the bare title.
 *
 * The `t` argument is a translator bound to the `seo.deckCardAlt`
 * namespace; pass `(key, params) => t(key, params)` from a server
 * component using `getTranslations({ namespace: 'seo.deckCardAlt' })`
 * or from a client using `useTranslations('seo.deckCardAlt')`.
 */
export function buildDeckRichAlt(
  deck: DeckAltInput,
  locale: string,
  t: (key: string, params: Record<string, string>) => string,
): string {
  const exerciseTypeName = getAxisName('exercise-type', deck.exerciseType, locale);
  const levelKey = ageRangeToLevelKey(deck.ageRange);
  const levelName = levelKey ? getAxisName('educational-level', levelKey, locale) : null;
  const themeKey = deck.subjectTags.find((tag) => THEME_AXIS_KEYS.has(tag));
  const themeName = themeKey ? getAxisName('theme', themeKey, locale) : null;

  if (!exerciseTypeName || !levelName) {
    return deck.title;
  }

  if (themeName) {
    return t('withTheme', {
      exerciseType: exerciseTypeName,
      theme: themeName,
      level: levelName,
    });
  }

  return t('withoutTheme', {
    exerciseType: exerciseTypeName,
    level: levelName,
  });
}
