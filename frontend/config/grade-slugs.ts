/**
 * Grade URL slug mappings for /[locale]/worksheets/[theme]/[grade]/ pages
 * and /[locale]/apps/grades/[grade]/ grade hub pages.
 *
 * Each grade has a localized slug per locale for SEO-friendly URLs.
 * The grade IDs match those in grade-content.ts.
 */

import { SUPPORTED_LOCALES } from '@/config/locales';

/** Hreflang code mapping (inlined to avoid circular dep with schema-generator) */
const hreflangCodes: Record<string, string> = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

export const GRADE_IDS = [
  'preschool',
  'kindergarten',
  'first-grade',
  'second-grade',
  'third-grade',
] as const;

export type GradeId = typeof GRADE_IDS[number];

/** Grade id -> localized URL slug per locale */
export const gradeSlugMap: Record<string, Record<string, string>> = {
  preschool: {
    en: 'preschool', de: 'vorschule', fr: 'maternelle', es: 'preescolar',
    pt: 'pre-escolar', it: 'prescuola', nl: 'kleuterschool', sv: 'forskola',
    da: 'forskole', no: 'forskole', fi: 'esikoulu',
  },
  kindergarten: {
    en: 'kindergarten', de: 'kindergarten', fr: 'grande-section', es: 'infantil',
    pt: 'jardim-infancia', it: 'scuola-infanzia', nl: 'groep-1-2', sv: 'forskoleklass',
    da: 'bornehaveklasse', no: 'barnehage', fi: 'esiopetus',
  },
  'first-grade': {
    en: 'first-grade', de: 'erste-klasse', fr: 'cp', es: 'primer-grado',
    pt: 'primeiro-ano', it: 'prima-elementare', nl: 'groep-3', sv: 'arskurs-1',
    da: 'forste-klasse', no: 'forste-klasse', fi: 'ensimmainen-luokka',
  },
  'second-grade': {
    en: 'second-grade', de: 'zweite-klasse', fr: 'ce1', es: 'segundo-grado',
    pt: 'segundo-ano', it: 'seconda-elementare', nl: 'groep-4', sv: 'arskurs-2',
    da: 'anden-klasse', no: 'andre-klasse', fi: 'toinen-luokka',
  },
  'third-grade': {
    en: 'third-grade', de: 'dritte-klasse', fr: 'ce2', es: 'tercer-grado',
    pt: 'terceiro-ano', it: 'terza-elementare', nl: 'groep-5', sv: 'arskurs-3',
    da: 'tredje-klasse', no: 'tredje-klasse', fi: 'kolmas-luokka',
  },
};

/** Grade display names per locale */
export const gradeDisplayNames: Record<string, Record<string, string>> = {
  preschool: {
    en: 'Preschool', de: 'Vorschule', fr: 'Maternelle', es: 'Preescolar',
    pt: 'Pré-escolar', it: 'Prescuola', nl: 'Kleuterschool', sv: 'Förskola',
    da: 'Førskole', no: 'Førskole', fi: 'Esikoulu',
  },
  kindergarten: {
    en: 'Kindergarten', de: 'Kindergarten', fr: 'Grande Section', es: 'Infantil',
    pt: 'Jardim de Infância', it: 'Scuola dell’Infanzia', nl: 'Groep 1-2', sv: 'Förskoleklass',
    da: 'Børnehaveklasse', no: 'Barnehage', fi: 'Esiopetus',
  },
  'first-grade': {
    en: '1st Grade', de: '1. Klasse', fr: 'CP', es: '1er Grado',
    pt: '1º Ano', it: '1ª Elementare', nl: 'Groep 3', sv: 'Årskurs 1',
    da: '1. Klasse', no: '1. Klasse', fi: '1. Luokka',
  },
  'second-grade': {
    en: '2nd Grade', de: '2. Klasse', fr: 'CE1', es: '2º Grado',
    pt: '2º Ano', it: '2ª Elementare', nl: 'Groep 4', sv: 'Årskurs 2',
    da: '2. Klasse', no: '2. Klasse', fi: '2. Luokka',
  },
  'third-grade': {
    en: '3rd Grade', de: '3. Klasse', fr: 'CE2', es: '3er Grado',
    pt: '3º Ano', it: '3ª Elementare', nl: 'Groep 5', sv: 'Årskurs 3',
    da: '3. Klasse', no: '3. Klasse', fi: '3. Luokka',
  },
};

/** Age ranges per grade */
export const gradeAgeRanges: Record<string, Record<string, string>> = {
  preschool: {
    en: 'Ages 3–4', de: '3–4 Jahre', fr: '3–4 ans', es: '3–4 años',
    pt: '3–4 anos', it: '3–4 anni', nl: '3–4 jaar', sv: '3–4 år',
    da: '3–4 år', no: '3–4 år', fi: '3–4 vuotta',
  },
  kindergarten: {
    en: 'Ages 5–6', de: '5–6 Jahre', fr: '5–6 ans', es: '5–6 años',
    pt: '5–6 anos', it: '5–6 anni', nl: '5–6 jaar', sv: '5–6 år',
    da: '5–6 år', no: '5–6 år', fi: '5–6 vuotta',
  },
  'first-grade': {
    en: 'Ages 6–7', de: '6–7 Jahre', fr: '6–7 ans', es: '6–7 años',
    pt: '6–7 anos', it: '6–7 anni', nl: '6–7 jaar', sv: '6–7 år',
    da: '6–7 år', no: '6–7 år', fi: '6–7 vuotta',
  },
  'second-grade': {
    en: 'Ages 7–8', de: '7–8 Jahre', fr: '7–8 ans', es: '7–8 años',
    pt: '7–8 anos', it: '7–8 anni', nl: '7–8 jaar', sv: '7–8 år',
    da: '7–8 år', no: '7–8 år', fi: '7–8 vuotta',
  },
  'third-grade': {
    en: 'Ages 8–9', de: '8–9 Jahre', fr: '8–9 ans', es: '8–9 años',
    pt: '8–9 anos', it: '8–9 anni', nl: '8–9 jaar', sv: '8–9 år',
    da: '8–9 år', no: '8–9 år', fi: '8–9 vuotta',
  },
};

/** App IDs appropriate for each grade level (from grade-content.ts) */
export const gradeAppIds: Record<string, string[]> = {
  preschool: [
    'coloring', 'draw-and-color', 'drawing-lines', 'big-small-app',
    'matching-app', 'pattern-train',
  ],
  kindergarten: [
    'image-addition', 'alphabet-train', 'word-search', 'coloring',
    'find-and-count', 'pattern-worksheet', 'picture-sort', 'shadow-match',
  ],
  'first-grade': [
    'math-worksheet', 'subtraction', 'word-scramble', 'image-crossword',
    'sudoku', 'find-objects', 'grid-match', 'writing-app',
  ],
  'second-grade': [
    'math-puzzle', 'code-addition', 'word-guess', 'image-cryptogram',
    'odd-one-out', 'picture-path', 'prepositions', 'more-less',
  ],
  'third-grade': [
    'math-puzzle', 'code-addition', 'word-guess', 'sudoku',
    'treasure-hunt', 'missing-pieces', 'chart-count-color', 'picture-bingo',
  ],
};

/** Reverse lookup: given a locale and slug, find the grade id */
export function getGradeIdFromSlug(locale: string, slug: string): string | undefined {
  for (const [gradeId, slugs] of Object.entries(gradeSlugMap)) {
    if (slugs[locale] === slug || slugs.en === slug) {
      return gradeId;
    }
  }
  return undefined;
}

/** Get the localized slug for a grade and locale */
export function getGradeSlug(gradeId: string, locale: string): string | undefined {
  return gradeSlugMap[gradeId]?.[locale] ?? gradeSlugMap[gradeId]?.en;
}

/** Get the localized display name for a grade */
export function getGradeDisplayName(gradeId: string, locale: string): string {
  return gradeDisplayNames[gradeId]?.[locale] ?? gradeDisplayNames[gradeId]?.en ?? gradeId;
}

/** Get grade-appropriate apps that also exist in a given theme's app list */
export function getGradeFilteredApps(gradeId: string, themeAppIds: string[]): string[] {
  const gradeApps = gradeAppIds[gradeId];
  if (!gradeApps) return themeAppIds;
  return themeAppIds.filter(appId => gradeApps.includes(appId));
}

/** Generate hreflang alternate URLs for a grade hub page (all locales) */
export function getGradeAlternateUrls(
  gradeId: string,
  baseUrl: string = 'https://www.lessoncraftstudio.com'
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    const slug = getGradeSlug(gradeId, locale);
    if (slug) {
      alternates[hreflangCodes[locale] || locale] = `${baseUrl}/${locale}/apps/grades/${slug}`;
    }
  }
  const enSlug = getGradeSlug(gradeId, 'en');
  if (enSlug) alternates['x-default'] = `${baseUrl}/en/apps/grades/${enSlug}`;
  return alternates;
}
