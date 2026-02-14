/**
 * Product category URL slug mappings for /[locale]/apps/category/[slug] pages.
 *
 * Each category has a localized slug per locale for SEO-friendly URLs.
 * Slugs are derived from the category display names (slugified).
 *
 * Same pattern as blog-category-slugs.ts and grade-slugs.ts.
 */

import { SUPPORTED_LOCALES } from '@/config/locales';

/** Hreflang code mapping (inlined to avoid circular dep with schema-generator) */
const hreflangCodes: Record<string, string> = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

/** Category ID -> locale -> localized URL slug */
export const productCategorySlugMap: Record<string, Record<string, string>> = {
  'math': {
    en: 'math', de: 'mathematik', fr: 'mathematiques', es: 'matematicas',
    pt: 'matematica', it: 'matematica', nl: 'rekenen', sv: 'matematik',
    da: 'matematik', no: 'matematikk', fi: 'matematiikka',
  },
  'language-arts': {
    en: 'language-arts', de: 'sprache-schrift', fr: 'lecture-ecriture',
    es: 'lengua-escritura', pt: 'lingua-escrita', it: 'lingua-scrittura',
    nl: 'taal-schrijven', sv: 'sprak-skrivning', da: 'sprog-skrivning',
    no: 'sprak-skriving', fi: 'kieli-kirjoitus',
  },
  'word-games': {
    en: 'word-games', de: 'wortspiele', fr: 'jeux-de-mots', es: 'juegos-de-palabras',
    pt: 'jogos-de-palavras', it: 'giochi-di-parole', nl: 'woordspellen',
    sv: 'ordspel', da: 'ordspil', no: 'ordspill', fi: 'sanapelit',
  },
  'art-creativity': {
    en: 'art-creativity', de: 'kunst-kreativitaet', fr: 'art-creativite',
    es: 'arte-creatividad', pt: 'arte-criatividade', it: 'arte-creativita',
    nl: 'kunst-creativiteit', sv: 'konst-kreativitet', da: 'kunst-kreativitet',
    no: 'kunst-kreativitet', fi: 'taide-luovuus',
  },
  'logic-puzzles': {
    en: 'logic-puzzles', de: 'logikraetsel', fr: 'jeux-de-logique',
    es: 'puzles-de-logica', pt: 'puzzles-de-logica', it: 'giochi-di-logica',
    nl: 'logische-puzzels', sv: 'logikpussel', da: 'logikopgaver',
    no: 'logikkoppgaver', fi: 'logiikkapulmat',
  },
  'visual-perception': {
    en: 'visual-perception', de: 'visuelle-wahrnehmung', fr: 'perception-visuelle',
    es: 'percepcion-visual', pt: 'percepcao-visual', it: 'percezione-visiva',
    nl: 'visuele-waarneming', sv: 'visuell-perception', da: 'visuel-perception',
    no: 'visuell-persepsjon', fi: 'visuaalinen-hahmottaminen',
  },
  'matching-sorting': {
    en: 'matching-sorting', de: 'zuordnung-sortierung', fr: 'association-tri',
    es: 'emparejamiento-clasificacion', pt: 'associacao-classificacao',
    it: 'abbinamento-classificazione', nl: 'koppelen-sorteren',
    sv: 'koppla-sortera', da: 'parring-sortering', no: 'kobling-sortering',
    fi: 'yhdistaminen-lajittelu',
  },
  'patterns-motor': {
    en: 'patterns-motor', de: 'muster-feinmotorik', fr: 'motifs-motricite-fine',
    es: 'patrones-motricidad-fina', pt: 'padroes-coordenacao-motora',
    it: 'sequenze-motricita-fine', nl: 'patronen-fijne-motoriek',
    sv: 'monster-finmotorik', da: 'monstre-finmotorik', no: 'monstre-finmotorikk',
    fi: 'kuviot-hienomotoriikka',
  },
};

/** All valid product category IDs */
export const PRODUCT_CATEGORY_IDS = Object.keys(productCategorySlugMap);

/** Get the localized slug for a category and locale (falls back to English) */
export function getProductCategorySlug(categoryId: string, locale: string): string {
  return productCategorySlugMap[categoryId]?.[locale] ?? productCategorySlugMap[categoryId]?.en ?? categoryId;
}

/** Reverse lookup: given a slug (and optional locale), find the category ID */
export function getProductCategoryIdFromSlug(slug: string, locale?: string): string | undefined {
  // If locale is provided, check that locale first for faster match
  if (locale) {
    for (const [categoryId, slugs] of Object.entries(productCategorySlugMap)) {
      if (slugs[locale] === slug) return categoryId;
    }
  }
  // Check all locales
  for (const [categoryId, slugs] of Object.entries(productCategorySlugMap)) {
    for (const locSlug of Object.values(slugs)) {
      if (locSlug === slug) return categoryId;
    }
  }
  return undefined;
}

/** Generate hreflang alternate URLs for a product category (all locales) */
export function getProductCategoryAlternateUrls(
  categoryId: string,
  baseUrl: string = 'https://www.lessoncraftstudio.com'
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    const slug = getProductCategorySlug(categoryId, locale);
    alternates[hreflangCodes[locale] || locale] = `${baseUrl}/${locale}/apps/category/${slug}`;
  }
  alternates['x-default'] = `${baseUrl}/en/apps/category/${getProductCategorySlug(categoryId, 'en')}`;
  return alternates;
}
