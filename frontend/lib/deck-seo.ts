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

export interface DeckAltWithVocabInput extends DeckAltInput {
  vocabNames?: string[];
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

/**
 * Compose vocab phrase for alt text per CLAUDE.md §A.13.X SEO commission
 * 2026-05-27 alt-text strategy: cap at 3 entries; locale-localized via
 * Intl.ListFormat with hardcoded EN fallback (matches existing
 * §17.8.13 convention from sr-only emission).
 *
 * Returns the formatted list ("cat, dog, and rabbit") or null when
 * vocabNames is empty (caller branches to ...NoVocab template).
 */
function formatVocabPhrase(vocabNames: string[] | undefined, locale: string): string | null {
  if (!vocabNames || vocabNames.length === 0) return null;
  const top3 = vocabNames.slice(0, 3);
  try {
    const fmt = new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' });
    return fmt.format(top3);
  } catch {
    // Fallback to EN Oxford-comma format (matches §17.8.13 hardcoded fallback)
    if (top3.length === 1) return top3[0];
    if (top3.length === 2) return top3[0] + ' and ' + top3[1];
    return top3[0] + ', ' + top3[1] + ', and ' + top3[2];
  }
}

/**
 * OG image alt text composer for `og:image:alt` + `twitter:image:alt`
 * meta tags + sitemap-image og-image caption. Used at publish time
 * (Node-CJS port at scripts/publish-cli/deck-rich-alt.js) AND at sitemap
 * SSR (this TS module). Shape: 140-char-capped descriptive sentence
 * matching the auditor's Google Images target shape.
 *
 * The `t` argument is a translator bound to the `seo.ogImageAlt`
 * namespace.
 */
export function buildOgImageAlt(
  deck: DeckAltWithVocabInput,
  locale: string,
  t: (key: string, params: Record<string, string>) => string,
): string {
  const exerciseTypeName = getAxisName('exercise-type', deck.exerciseType, locale);
  const levelKey = ageRangeToLevelKey(deck.ageRange);
  const levelName = levelKey ? getAxisName('educational-level', levelKey, locale) : null;
  const themeKey = deck.subjectTags.find((tag) => THEME_AXIS_KEYS.has(tag));
  const themeName = themeKey ? getAxisName('theme', themeKey, locale) : null;
  const vocabPhrase = formatVocabPhrase(deck.vocabNames, locale);

  if (!exerciseTypeName || !levelName) {
    return deck.title;
  }

  if (themeName && vocabPhrase) {
    return t('withTheme', {
      exerciseType: exerciseTypeName,
      theme: themeName,
      level: levelName,
      vocab: vocabPhrase,
    });
  }
  if (themeName) {
    return t('withThemeNoVocab', {
      exerciseType: exerciseTypeName,
      theme: themeName,
      level: levelName,
    });
  }
  if (vocabPhrase) {
    return t('withoutTheme', {
      exerciseType: exerciseTypeName,
      level: levelName,
      vocab: vocabPhrase,
    });
  }
  return t('withoutThemeNoVocab', {
    exerciseType: exerciseTypeName,
    level: levelName,
  });
}

/**
 * Main worksheet `<img>` alt text composer. Drives the largest image on
 * every deck.html page (currently `alt=""` HARDCODED per audit). Shape
 * targets ~125 chars matching the Google Images alt-text best practice.
 *
 * The `t` argument is a translator bound to the `seo.worksheetMainAlt`
 * namespace.
 */
export function buildWorksheetMainAlt(
  deck: DeckAltWithVocabInput,
  locale: string,
  t: (key: string, params: Record<string, string>) => string,
): string {
  const exerciseTypeName = getAxisName('exercise-type', deck.exerciseType, locale);
  const levelKey = ageRangeToLevelKey(deck.ageRange);
  const levelName = levelKey ? getAxisName('educational-level', levelKey, locale) : null;
  const themeKey = deck.subjectTags.find((tag) => THEME_AXIS_KEYS.has(tag));
  const themeName = themeKey ? getAxisName('theme', themeKey, locale) : null;
  const vocabPhrase = formatVocabPhrase(deck.vocabNames, locale);

  if (!exerciseTypeName || !levelName) {
    return deck.title;
  }

  if (themeName && vocabPhrase) {
    return t('withTheme', {
      exerciseType: exerciseTypeName,
      theme: themeName,
      level: levelName,
      vocab: vocabPhrase,
    });
  }
  if (themeName) {
    return t('withThemeNoVocab', {
      exerciseType: exerciseTypeName,
      theme: themeName,
      level: levelName,
    });
  }
  if (vocabPhrase) {
    return t('withoutTheme', {
      exerciseType: exerciseTypeName,
      level: levelName,
      vocab: vocabPhrase,
    });
  }
  return t('withoutThemeNoVocab', {
    exerciseType: exerciseTypeName,
    level: levelName,
  });
}

/**
 * Deck.html `<main role="application">` aria-label composer.
 * Drives the WCAG-correct accessible name of the interactive worksheet
 * container. Per §A.13.X Dimension 2 phased rollout — deck-side first
 * because worksheet buttons are already `<button>` elements (keyboard-complete).
 *
 * The `t` argument is bound to the `aria.deckContainerTemplate`
 * namespace.
 */
export function buildDeckContainerAriaLabel(
  deck: DeckAltInput & { instruction?: string },
  locale: string,
  t: (key: string, params: Record<string, string>) => string,
): string {
  const exerciseTypeName = getAxisName('exercise-type', deck.exerciseType, locale);
  const levelKey = ageRangeToLevelKey(deck.ageRange);
  const levelName = levelKey ? getAxisName('educational-level', levelKey, locale) : null;
  const themeKey = deck.subjectTags.find((tag) => THEME_AXIS_KEYS.has(tag));
  const themeName = themeKey ? getAxisName('theme', themeKey, locale) : null;
  const instruction = deck.instruction ?? '';

  if (!exerciseTypeName || !levelName) {
    return deck.title;
  }

  if (themeName) {
    return t('withTheme', {
      exerciseType: exerciseTypeName,
      theme: themeName,
      level: levelName,
      instruction,
    });
  }
  return t('withoutTheme', {
    exerciseType: exerciseTypeName,
    level: levelName,
    instruction,
  });
}
