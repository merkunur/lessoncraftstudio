/**
 * Bundle Page Slug Configuration
 *
 * This file maps each bundle to its language-specific SEO slugs for /bundles/ pages.
 * Each bundle corresponds to one of the 6 app categories.
 *
 * Example:
 * - English: /en/bundles/math-mastery-bundle
 */

import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES, SupportedLocale } from '@/config/product-page-slugs';

export { SUPPORTED_LOCALES };
export type { SupportedLocale };

export interface BundleSlugConfig {
  bundleId: string;  // Internal bundle identifier (matches category bundle naming)
  slugs: {
    en: string;
    de?: string;
    fr?: string;
    es?: string;
    it?: string;
    pt?: string;
    nl?: string;
    da?: string;
    sv?: string;
    no?: string;
    fi?: string;
  };
}

/**
 * Bundle page slug configuration for all 6 category bundles.
 * Add language-specific slugs as bundle pages are created for each language.
 */
export const bundlePageSlugs: BundleSlugConfig[] = [
  {
    bundleId: 'math-bundle',
    slugs: {
      en: 'math-mastery-bundle',
      de: 'mathematik-meister-paket',
      fr: 'pack-maitrise-maths',
      es: 'paquete-dominio-matematicas', pt: 'pacote-dominio-matematica', it: 'pacchetto-padronanza-matematica', nl: 'wiskunde-meester-pakket',
      sv: 'matematik-mastare-paket',
      da: 'matematik-mestring-pakke'
    },
  },
  {
    bundleId: 'literacy-bundle',
    slugs: {
      en: 'literacy-language-bundle',
      de: 'lese-sprach-paket',
      fr: 'pack-lecture-langage',
      es: 'paquete-lectura-lenguaje', pt: 'pacote-leitura-linguagem', it: 'pacchetto-lettura-linguaggio', nl: 'lezen-taal-pakket',
      sv: 'laesning-spraak-paket',
      da: 'laesning-sprog-pakke'
    },
  },
  {
    bundleId: 'visual-bundle',
    slugs: {
      en: 'visual-learning-bundle',
      de: 'visuelles-lernen-paket',
      fr: 'pack-apprentissage-visuel',
      es: 'paquete-aprendizaje-visual', pt: 'pacote-aprendizagem-visual', it: 'pacchetto-apprendimento-visivo', nl: 'visueel-leren-pakket',
      sv: 'visuellt-laerande-paket',
      da: 'visuel-laering-pakke'
    },
  },
  {
    bundleId: 'matching-bundle',
    slugs: {
      en: 'matching-sorting-bundle',
      de: 'zuordnung-sortierung-paket',
      fr: 'pack-association-tri',
      es: 'paquete-asociacion-clasificacion', pt: 'pacote-associacao-classificacao', it: 'pacchetto-abbinamento-classificazione', nl: 'matchen-sorteren-pakket',
      sv: 'matchning-sortering-paket',
      da: 'matchning-sortering-pakke'
    },
  },
  {
    bundleId: 'puzzle-bundle',
    slugs: {
      en: 'puzzles-logic-bundle',
      de: 'raetsel-logik-paket',
      fr: 'pack-puzzles-logique',
      es: 'paquete-puzzles-logica', pt: 'pacote-puzzles-logica', it: 'pacchetto-puzzle-logica', nl: 'puzzels-logica-pakket',
      sv: 'pussel-logik-paket',
      da: 'puslespil-logik-pakke'
    },
  },
  {
    bundleId: 'search-bundle',
    slugs: {
      en: 'search-find-bundle',
      de: 'suchen-finden-paket',
      fr: 'pack-cherche-trouve',
      es: 'paquete-busca-encuentra', pt: 'pacote-procura-encontra', it: 'pacchetto-cerca-trova', nl: 'zoeken-vinden-pakket',
      sv: 'soek-hitta-paket',
      da: 'soeg-find-pakke'
    },
  },
];

/**
 * Get the slug for a specific bundle and locale
 */
export function getBundleSlugForLocale(bundleId: string, locale: SupportedLocale): string | undefined {
  const config = bundlePageSlugs.find(c => c.bundleId === bundleId);
  if (!config) return undefined;
  return config.slugs[locale] || config.slugs.en; // Fallback to English
}

/**
 * Get the bundle config from any slug (in any language)
 */
export function getBundleConfigBySlug(slug: string): { bundleId: string; locale: SupportedLocale } | undefined {
  for (const config of bundlePageSlugs) {
    for (const [locale, localeSlug] of Object.entries(config.slugs)) {
      if (localeSlug === slug) {
        return { bundleId: config.bundleId, locale: locale as SupportedLocale };
      }
    }
  }
  return undefined;
}

/**
 * Get all slugs for all locales (for generateStaticParams)
 */
export function getAllBundlePageSlugs(): { locale: SupportedLocale; slug: string }[] {
  const result: { locale: SupportedLocale; slug: string }[] = [];

  for (const config of bundlePageSlugs) {
    for (const [locale, slug] of Object.entries(config.slugs)) {
      if (slug) {
        result.push({ locale: locale as SupportedLocale, slug });
      }
    }
  }

  return result;
}

/**
 * Get alternate language URLs for hreflang tags
 * Uses regional hreflang codes for pt-BR and es-MX
 */
export function getBundleAlternateUrls(bundleId: string, baseUrl: string = 'https://www.lessoncraftstudio.com'): Record<string, string> {
  const config = bundlePageSlugs.find(c => c.bundleId === bundleId);
  if (!config) return {};

  const alternates: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(config.slugs)) {
    if (slug) {
      const hreflangCode = getHreflangCode(locale);
      alternates[hreflangCode] = `${baseUrl}/${locale}/bundles/${slug}`;
    }
  }

  // Add x-default pointing to English version for unspecified regions
  if (alternates['en']) {
    alternates['x-default'] = alternates['en'];
  }

  return alternates;
}

/**
 * Check if a slug exists for a specific locale
 */
export function hasBundlePage(slug: string, locale: SupportedLocale): boolean {
  const config = getBundleConfigBySlug(slug);
  if (!config) return false;

  const bundleConfig = bundlePageSlugs.find(c => c.bundleId === config.bundleId);
  return bundleConfig?.slugs[locale] === slug;
}
