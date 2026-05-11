/**
 * sentence-template-filler.ts — Sub-Phase 2.3 article/gender resolver + frame filler.
 *
 * Ports the article-resolution + fillTemplate logic from
 * REFERENCE TRANSLATIONS/material-generator-shared.js (lines 53-98, 264-272) +
 * REFERENCE APPS/material-generators/sentence-strips.html (lines 321-348).
 *
 * The HIGH-QC dimension per materials-catalog.json:154 — article auto-resolution
 * from IMAGE_VOCABULARY gender data so we never ship "Ich sehe ein Katze" instead
 * of "Ich sehe eine Katze".
 */

import { displayWord, type VocabEntry, type Locale } from './flashcard-data';

interface ArticleRules {
  definite: (gender?: string, word?: string) => string;
  indefinite: (gender?: string, word?: string) => string;
}

const ARTICLES: Record<string, ArticleRules> = {
  en: {
    definite: () => 'the',
    indefinite: (_g, word) => (word && /^[aeiouAEIOU]/.test(word.charAt(0)) ? 'an' : 'a'),
  },
  de: {
    definite: (g) => (g === 'm' ? 'der' : g === 'f' ? 'die' : 'das'),
    indefinite: (g) => (g === 'f' ? 'eine' : 'ein'),
  },
  fr: {
    definite: (g, word) => {
      if (word && /^[aeiouhAEIOUH]/.test(word)) return "l'";
      return g === 'm' ? 'le' : 'la';
    },
    indefinite: (g) => (g === 'm' ? 'un' : 'une'),
  },
  es: {
    definite: (g) => (g === 'm' ? 'el' : 'la'),
    indefinite: (g) => (g === 'm' ? 'un' : 'una'),
  },
  pt: {
    definite: (g) => (g === 'm' ? 'o' : 'a'),
    indefinite: (g) => (g === 'm' ? 'um' : 'uma'),
  },
  it: {
    definite: (g, word) => {
      if (word && /^[aeiouAEIOU]/.test(word)) return "l'";
      return g === 'm' ? 'il' : 'la';
    },
    indefinite: (g) => (g === 'm' ? 'un' : 'una'),
  },
  nl: {
    definite: (g) => (g === 'h' ? 'het' : 'de'),
    indefinite: () => 'een',
  },
  sv: {
    definite: () => '', // suffix-article in Swedish; gloss form
    indefinite: (g) => (g === 't' ? 'ett' : 'en'),
  },
  da: {
    definite: () => '',
    indefinite: (g) => (g === 'n' ? 'et' : 'en'),
  },
  no: {
    definite: () => '',
    indefinite: (g) => (g === 'n' ? 'et' : g === 'f' ? 'ei' : 'en'),
  },
  fi: { definite: () => '', indefinite: () => '' },
};

const NUMBER_WORDS_FOR_FRAME: Record<string, string[]> = {
  en: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
  de: ['', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn'],
  es: ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'],
  fr: ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix'],
  pt: ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez'],
  it: ['', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci'],
  nl: ['', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien'],
  sv: ['', 'en', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio'],
  da: ['', 'en', 'to', 'tre', 'fire', 'fem', 'seks', 'syv', 'otte', 'ni', 'ti'],
  no: ['', 'en', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti'],
  fi: ['', 'yksi', 'kaksi', 'kolme', 'neljä', 'viisi', 'kuusi', 'seitsemän', 'kahdeksan', 'yhdeksän', 'kymmenen'],
};

const COLOR_FALLBACK: Record<string, string> = {
  en: 'red', de: 'rot', fr: 'rouge', es: 'rojo', pt: 'vermelho',
  it: 'rosso', nl: 'rood', sv: 'röd', da: 'rød', no: 'rød', fi: 'punainen',
};

export function localizedArticle(
  vocabEntry: VocabEntry | undefined,
  locale: string,
  type: 'definite' | 'indefinite'
): string {
  const rules = ARTICLES[locale] || ARTICLES.en;
  const fn = type === 'indefinite' ? rules.indefinite : rules.definite;
  const localeArr: any = vocabEntry ? (vocabEntry as any)[locale] : null;
  const gender: string | undefined = localeArr && localeArr.length >= 3 ? localeArr[2] : undefined;
  const word: string = localeArr ? localeArr[0] || '' : '';
  return fn(gender, word) || '';
}

export function localizedNumberWord(n: number, locale: string): string {
  const words = NUMBER_WORDS_FOR_FRAME[locale] || NUMBER_WORDS_FOR_FRAME.en;
  if (!Number.isFinite(n) || n < 1 || n > 10) return String(n);
  return words[n] || String(n);
}

/**
 * Fill a sentence-frame template with vocab-driven substitutions.
 * Ported from REFERENCE APPS/material-generators/sentence-strips.html:321-348.
 *
 * Placeholders:
 *   {item}             → indef-article + singular ("eine Katze")
 *   {item:plural}      → plural ("Katzen")
 *   {item:plural-def}  → def-article + plural ("die Katzen") — falls back to plural for sv/da/no/fi
 *   {item:bare}        → singular only ("Katze")
 *   {item:def-bare}    → def-article + singular ("die Katze")
 *   {item:acc}         → German accusative ("eine Katze" / "einen Hund" / "ein Pferd"); falls back to indef elsewhere
 *   {count}            → localized number-word (default 3 per HTML source)
 *   {color}            → COLOR_FALLBACK for the locale
 */
export function fillTemplate(
  template: string,
  vocabEntry: VocabEntry | undefined,
  vocabKey: string,
  locale: string,
  count: number = 3
): string {
  if (!vocabEntry) {
    return template.replace(/\{[^}]+\}/g, vocabKey);
  }
  const localeArr: any = (vocabEntry as any)[locale] || (vocabEntry as any).en;
  const singular: string = localeArr ? localeArr[0] || vocabKey : vocabKey;
  const plural: string = localeArr ? localeArr[1] || singular : vocabKey;
  const gender: string | undefined = localeArr && localeArr.length >= 3 ? localeArr[2] : undefined;

  const indef = localizedArticle(vocabEntry, locale, 'indefinite');
  const def = localizedArticle(vocabEntry, locale, 'definite');

  const color = COLOR_FALLBACK[locale] || 'red';
  const countWord = localizedNumberWord(count, locale);

  const withIndef = indef ? `${indef} ${singular}` : singular;
  const withDef = def ? `${def} ${singular}` : singular;
  const pluralWithDef = def ? `${def} ${plural}` : plural;

  // German accusative: masculine "einen", feminine "eine", neuter "ein"
  let deAcc = withIndef;
  if (locale === 'de') {
    if (gender === 'm') deAcc = `einen ${singular}`;
    else if (gender === 'f') deAcc = `eine ${singular}`;
    else deAcc = `ein ${singular}`;
  }

  return template
    .replace(/\{item:plural-def\}/g, pluralWithDef)
    .replace(/\{item:plural\}/g, plural)
    .replace(/\{item:def-bare\}/g, withDef)
    .replace(/\{item:bare\}/g, singular)
    .replace(/\{item:acc\}/g, deAcc)
    .replace(/\{item\}/g, withIndef)
    .replace(/\{count\}/g, String(count))
    .replace(/\{count:word\}/g, countWord)
    .replace(/\{color\}/g, color);
}
