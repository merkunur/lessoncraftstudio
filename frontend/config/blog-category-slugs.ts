/**
 * Blog category URL slug mappings for /[locale]/blog/category/[slug] pages.
 *
 * Each category has a localized slug per locale for SEO-friendly URLs.
 * Slugs are derived from the CATEGORY_TRANSLATIONS display names (slugified).
 *
 * Same pattern as theme-slugs.ts and grade-slugs.ts.
 */

import { SUPPORTED_LOCALES } from '@/config/locales';

/** Hreflang code mapping (inlined to avoid circular dep with schema-generator) */
const hreflangCodes: Record<string, string> = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

/** Category ID -> locale -> localized URL slug */
export const blogCategorySlugMap: Record<string, Record<string, string>> = {
  'teaching-resources': {
    en: 'teaching-resources', de: 'unterrichtsmaterialien', fr: 'ressources-pedagogiques',
    es: 'recursos-didacticos', pt: 'recursos-de-ensino', it: 'risorse-didattiche',
    nl: 'onderwijsmiddelen', sv: 'undervisningsresurser', da: 'undervisningsressourcer',
    no: 'undervisningsressurser', fi: 'opetusresurssit',
  },
  'worksheet-tips': {
    en: 'worksheet-tips', de: 'arbeitsblatt-tipps', fr: 'conseils-fiches',
    es: 'consejos-fichas', pt: 'dicas-planilhas', it: 'suggerimenti-schede',
    nl: 'werkblad-tips', sv: 'arbetsbladstips', da: 'arbejdsark-tips',
    no: 'arbeidsark-tips', fi: 'tyoarkkivinkit',
  },
  'educational-activities': {
    en: 'educational-activities', de: 'bildungsaktivitaeten', fr: 'activites-educatives',
    es: 'actividades-educativas', pt: 'atividades-educacionais', it: 'attivita-educative',
    nl: 'educatieve-activiteiten', sv: 'utbildningsaktiviteter', da: 'uddannelsesaktiviteter',
    no: 'utdanningsaktiviteter', fi: 'koulutustoimintaa',
  },
  'learning-strategies': {
    en: 'learning-strategies', de: 'lernstrategien', fr: 'strategies-apprentissage',
    es: 'estrategias-aprendizaje', pt: 'estrategias-aprendizagem', it: 'strategie-apprendimento',
    nl: 'leerstrategieen', sv: 'inlarningsstrategier', da: 'laeringsstrategier',
    no: 'laeringsstrategier', fi: 'oppimisstrategiat',
  },
  'curriculum-guides': {
    en: 'curriculum-guides', de: 'lehrplan-leitfaeden', fr: 'guides-programme',
    es: 'guias-curriculo', pt: 'guias-curriculo', it: 'guide-curriculum',
    nl: 'curriculumgidsen', sv: 'laroplansguider', da: 'laeseplansguider',
    no: 'laereplansveiledninger', fi: 'opetussuunnitelmaoppaat',
  },
  'parent-resources': {
    en: 'parent-resources', de: 'elternressourcen', fr: 'ressources-parents',
    es: 'recursos-padres', pt: 'recursos-pais', it: 'risorse-genitori',
    nl: 'ouderhulpmiddelen', sv: 'foraldraresurser', da: 'foraeldreressourcer',
    no: 'foreldreressurser', fi: 'vanhempien-resurssit',
  },
  'seasonal-content': {
    en: 'seasonal-content', de: 'saisonale-inhalte', fr: 'contenu-saisonnier',
    es: 'contenido-estacional', pt: 'conteudo-sazonal', it: 'contenuti-stagionali',
    nl: 'seizoensinhoud', sv: 'sasongsinnehall', da: 'saesondindhold',
    no: 'sesonginnhold', fi: 'kauden-sisalto',
  },
};

/** All valid blog category IDs */
export const BLOG_CATEGORY_IDS = Object.keys(blogCategorySlugMap);

/** Get the localized slug for a category and locale (falls back to English) */
export function getBlogCategorySlug(categoryId: string, locale: string): string {
  return blogCategorySlugMap[categoryId]?.[locale] ?? blogCategorySlugMap[categoryId]?.en ?? categoryId;
}

/** Reverse lookup: given a slug (and optional locale), find the category ID */
export function getBlogCategoryIdFromSlug(slug: string, locale?: string): string | undefined {
  // If locale is provided, check that locale first for faster match
  if (locale) {
    for (const [categoryId, slugs] of Object.entries(blogCategorySlugMap)) {
      if (slugs[locale] === slug) return categoryId;
    }
  }
  // Check all locales
  for (const [categoryId, slugs] of Object.entries(blogCategorySlugMap)) {
    for (const locSlug of Object.values(slugs)) {
      if (locSlug === slug) return categoryId;
    }
  }
  return undefined;
}

/** Generate hreflang alternate URLs for a blog category (all locales) */
export function getBlogCategoryAlternateUrls(
  categoryId: string,
  baseUrl: string = 'https://www.lessoncraftstudio.com'
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    const slug = getBlogCategorySlug(categoryId, locale);
    alternates[hreflangCodes[locale] || locale] = `${baseUrl}/${locale}/blog/category/${slug}`;
  }
  alternates['x-default'] = `${baseUrl}/en/blog/category/${getBlogCategorySlug(categoryId, 'en')}`;
  return alternates;
}
