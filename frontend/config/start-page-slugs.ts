/**
 * Start Page Slug Configuration
 *
 * This file maps each cornerstone guide to its language-specific SEO slugs for /start/ pages.
 * Covers 12 Business Cornerstone Guides covering the complete printable business journey.
 *
 * Example:
 * - English: /en/start/complete-guide-printable-business
 */

import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES, SupportedLocale } from '@/config/product-page-slugs';

export { SUPPORTED_LOCALES };
export type { SupportedLocale };

export interface StartSlugConfig {
  startId: string;  // Internal start guide identifier (= English slug)
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
 * Start page slug configuration for all 12 cornerstone guides.
 * Add language-specific slugs as start pages are created for each language.
 */
export const startPageSlugs: StartSlugConfig[] = [
  { startId: 'complete-guide-printable-business', slugs: { en: 'complete-guide-printable-business', de: 'komplettanleitung-druckvorlagen-geschaeft', fr: 'guide-complet-activite-imprimables', es: 'guia-completa-negocio-imprimibles', pt: 'guia-completo-negocio-imprimiveis', it: 'guida-completa-attivita-stampabili', nl: 'complete-gids-printable-bedrijf', sv: 'komplett-guide-utskriftsbart-foretagande', da: 'komplet-guide-printbar-forretning' } },
  { startId: 'create-worksheets-that-sell', slugs: { en: 'create-worksheets-that-sell', de: 'arbeitsblaetter-erstellen-die-verkaufen', fr: 'creer-fiches-qui-se-vendent', es: 'crear-fichas-que-se-venden', pt: 'criar-fichas-que-vendem', it: 'creare-schede-che-vendono', nl: 'werkbladen-maken-die-verkopen', sv: 'skapa-arbetsblad-som-saljer', da: 'skab-arbejdsark-der-saelger' } },
  { startId: 'printable-business-blueprint', slugs: { en: 'printable-business-blueprint', de: 'druckvorlagen-geschaeft-bauplan', fr: 'plan-activite-imprimables', es: 'plan-negocio-imprimibles', pt: 'plano-negocio-imprimiveis', it: 'piano-attivita-stampabili', nl: 'blauwdruk-printable-bedrijf', sv: 'ritning-utskriftsbart-foretag', da: 'printbar-forretning-plan' } },
  { startId: 'etsy-printable-business', slugs: { en: 'etsy-printable-business', de: 'etsy-druckvorlagen-geschaeft', fr: 'activite-imprimables-etsy', es: 'negocio-imprimibles-etsy', pt: 'negocio-imprimiveis-etsy', it: 'attivita-stampabili-etsy', nl: 'etsy-printable-bedrijf', sv: 'etsy-utskriftsbart-foretag', da: 'etsy-printbar-forretning' } },
  { startId: 'amazon-kdp-activity-books', slugs: { en: 'amazon-kdp-activity-books', de: 'amazon-kdp-aktivitaetsbuecher', fr: 'livres-activites-amazon-kdp', es: 'libros-actividades-amazon-kdp', pt: 'livros-atividades-amazon-kdp', it: 'libri-attivita-amazon-kdp', nl: 'amazon-kdp-activiteitenboeken', sv: 'amazon-kdp-aktivitetsbocker', da: 'amazon-kdp-aktivitetsboeger' } },
  { startId: 'create-multilingual-worksheets', slugs: { en: 'create-multilingual-worksheets', de: 'mehrsprachige-arbeitsblaetter-erstellen', fr: 'creer-fiches-multilingues', es: 'crear-fichas-multilingues', pt: 'criar-fichas-multilingues', it: 'creare-schede-multilingue', nl: 'meertalige-werkbladen-maken', sv: 'skapa-flersprakiga-arbetsblad', da: 'skab-flersprogede-arbejdsark' } },
  { startId: 'commercial-license-guide', slugs: { en: 'commercial-license-guide', de: 'kommerzielle-lizenz-leitfaden', fr: 'guide-licence-commerciale', es: 'guia-licencia-comercial', pt: 'guia-licenca-comercial', it: 'guida-licenza-commerciale', nl: 'commerciele-licentie-gids', sv: 'kommersiell-licens-guide', da: 'kommerciel-licens-guide' } },
  { startId: 'printable-business-income', slugs: { en: 'printable-business-income', de: 'druckvorlagen-geschaeft-einkommen', fr: 'revenus-activite-imprimables', es: 'ingresos-negocio-imprimibles', pt: 'rendimentos-negocio-imprimiveis', it: 'reddito-attivita-stampabili', nl: 'printable-bedrijf-inkomen', sv: 'utskriftsbart-foretag-inkomst', da: 'printbar-forretning-indkomst' } },
  { startId: 'tools-for-printable-business', slugs: { en: 'tools-for-printable-business', de: 'werkzeuge-fuer-druckvorlagen-geschaeft', fr: 'outils-activite-imprimables', es: 'herramientas-negocio-imprimibles', pt: 'ferramentas-negocio-imprimiveis', it: 'strumenti-attivita-stampabili', nl: 'tools-voor-printable-bedrijf', sv: 'verktyg-for-utskriftsbart-foretag', da: 'vaerktojer-til-printbar-forretning' } },
  { startId: 'marketing-printable-business', slugs: { en: 'marketing-printable-business', de: 'marketing-druckvorlagen-geschaeft', fr: 'marketing-activite-imprimables', es: 'marketing-negocio-imprimibles', pt: 'marketing-negocio-imprimiveis', it: 'marketing-attivita-stampabili', nl: 'marketing-printable-bedrijf', sv: 'marknadsforing-utskriftsbart-foretag', da: 'markedsfoering-printbar-forretning' } },
  { startId: 'scaling-printable-business', slugs: { en: 'scaling-printable-business', de: 'druckvorlagen-geschaeft-skalieren', fr: 'croissance-activite-imprimables', es: 'escalar-negocio-imprimibles', pt: 'escalar-negocio-imprimiveis', it: 'scalare-attivita-stampabili', nl: 'printable-bedrijf-opschalen', sv: 'skala-upp-utskriftsbart-foretag', da: 'skalering-printbar-forretning' } },
  { startId: 'printable-business-legal', slugs: { en: 'printable-business-legal', de: 'druckvorlagen-geschaeft-recht', fr: 'aspects-juridiques-activite-imprimables', es: 'aspectos-legales-negocio-imprimibles', pt: 'aspectos-legais-negocio-imprimiveis', it: 'aspetti-legali-attivita-stampabili', nl: 'printable-bedrijf-juridisch', sv: 'utskriftsbart-foretag-juridik', da: 'printbar-forretning-juridisk' } },
];

/**
 * Get the slug for a specific start guide and locale
 */
export function getStartSlugForLocale(startId: string, locale: SupportedLocale): string | undefined {
  const config = startPageSlugs.find(c => c.startId === startId);
  if (!config) return undefined;
  return config.slugs[locale] || config.slugs.en; // Fallback to English
}

/**
 * Get the start config from any slug (in any language)
 */
export function getStartConfigBySlug(slug: string): { startId: string; locale: SupportedLocale } | undefined {
  for (const config of startPageSlugs) {
    for (const [locale, localeSlug] of Object.entries(config.slugs)) {
      if (localeSlug === slug) {
        return { startId: config.startId, locale: locale as SupportedLocale };
      }
    }
  }
  return undefined;
}

/**
 * Get all slugs for all locales (for generateStaticParams)
 */
export function getAllStartPageSlugs(): { locale: SupportedLocale; slug: string }[] {
  const result: { locale: SupportedLocale; slug: string }[] = [];

  for (const config of startPageSlugs) {
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
export function getStartAlternateUrls(startId: string, baseUrl: string = 'https://www.lessoncraftstudio.com'): Record<string, string> {
  const config = startPageSlugs.find(c => c.startId === startId);
  if (!config) return {};

  const alternates: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(config.slugs)) {
    if (slug) {
      const hreflangCode = getHreflangCode(locale);
      alternates[hreflangCode] = `${baseUrl}/${locale}/start/${slug}`;
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
export function hasStartPage(slug: string, locale: SupportedLocale): boolean {
  const config = getStartConfigBySlug(slug);
  if (!config) return false;

  const startConfig = startPageSlugs.find(c => c.startId === config.startId);
  return startConfig?.slugs[locale] === slug;
}
