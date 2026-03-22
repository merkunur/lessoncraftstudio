/**
 * Idea Page Slug Configuration
 *
 * This file maps each niche/theme idea page to its language-specific SEO slugs for /ideas/ pages.
 * Covers 45 idea pages across 5 subcategories:
 * Animals & Nature (8), Seasons & Holidays (10), Interests & Activities (10),
 * Educational Focus (10), Business Models (7).
 *
 * Example:
 * - English: /en/ideas/farm-animals-printable-ideas
 */

import { getHreflangCode } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES, SupportedLocale } from '@/config/product-page-slugs';

export { SUPPORTED_LOCALES };
export type { SupportedLocale };

export interface IdeaSlugConfig {
  ideaId: string;  // Internal idea identifier (= English slug)
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
 * Idea page slug configuration for all 45 idea pages.
 * Add language-specific slugs as idea pages are created for each language.
 */
export const ideaPageSlugs: IdeaSlugConfig[] = [
  // === Animals & Nature (8) ===
  { ideaId: 'farm-animals-printable-ideas', slugs: { en: 'farm-animals-printable-ideas', de: 'bauernhoftiere-druckvorlagen-ideen', fr: 'animaux-ferme-idees-imprimables', es: 'animales-granja-ideas-imprimibles', pt: 'animais-fazenda-ideias-imprimiveis', it: 'animali-fattoria-idee-stampabili', nl: 'boerderijdieren-printable-ideen' } },
  { ideaId: 'ocean-animals-printable-ideas', slugs: { en: 'ocean-animals-printable-ideas', de: 'meerestiere-druckvorlagen-ideen', fr: 'animaux-marins-idees-imprimables', es: 'animales-marinos-ideas-imprimibles', pt: 'animais-marinhos-ideias-imprimiveis', it: 'animali-marini-idee-stampabili', nl: 'zeedieren-printable-ideen' } },
  { ideaId: 'safari-animals-printable-ideas', slugs: { en: 'safari-animals-printable-ideas', de: 'safaritiere-druckvorlagen-ideen', fr: 'animaux-safari-idees-imprimables', es: 'animales-safari-ideas-imprimibles', pt: 'animais-safari-ideias-imprimiveis', it: 'animali-safari-idee-stampabili', nl: 'safaridieren-printable-ideen' } },
  { ideaId: 'pets-printable-ideas', slugs: { en: 'pets-printable-ideas', de: 'haustiere-druckvorlagen-ideen', fr: 'animaux-compagnie-idees-imprimables', es: 'mascotas-ideas-imprimibles', pt: 'animais-estimacao-ideias-imprimiveis', it: 'animali-domestici-idee-stampabili', nl: 'huisdieren-printable-ideen' } },
  { ideaId: 'dinosaur-printable-ideas', slugs: { en: 'dinosaur-printable-ideas', de: 'dinosaurier-druckvorlagen-ideen', fr: 'dinosaures-idees-imprimables', es: 'dinosaurios-ideas-imprimibles', pt: 'dinossauros-ideias-imprimiveis', it: 'dinosauri-idee-stampabili', nl: 'dinosaurus-printable-ideen' } },
  { ideaId: 'birds-printable-ideas', slugs: { en: 'birds-printable-ideas', de: 'voegel-druckvorlagen-ideen', fr: 'oiseaux-idees-imprimables', es: 'aves-ideas-imprimibles', pt: 'aves-ideias-imprimiveis', it: 'uccelli-idee-stampabili', nl: 'vogels-printable-ideen' } },
  { ideaId: 'insects-printable-ideas', slugs: { en: 'insects-printable-ideas', de: 'insekten-druckvorlagen-ideen', fr: 'insectes-idees-imprimables', es: 'insectos-ideas-imprimibles', pt: 'insetos-ideias-imprimiveis', it: 'insetti-idee-stampabili', nl: 'insecten-printable-ideen' } },
  { ideaId: 'forest-animals-printable-ideas', slugs: { en: 'forest-animals-printable-ideas', de: 'waldtiere-druckvorlagen-ideen', fr: 'animaux-foret-idees-imprimables', es: 'animales-bosque-ideas-imprimibles', pt: 'animais-floresta-ideias-imprimiveis', it: 'animali-foresta-idee-stampabili', nl: 'bosdieren-printable-ideen' } },

  // === Seasons & Holidays (10) ===
  { ideaId: 'christmas-printable-ideas', slugs: { en: 'christmas-printable-ideas', de: 'weihnachten-druckvorlagen-ideen', fr: 'noel-idees-imprimables', es: 'navidad-ideas-imprimibles', pt: 'natal-ideias-imprimiveis', it: 'natale-idee-stampabili', nl: 'kerst-printable-ideen' } },
  { ideaId: 'halloween-printable-ideas', slugs: { en: 'halloween-printable-ideas', de: 'halloween-druckvorlagen-ideen', fr: 'halloween-idees-imprimables', es: 'halloween-ideas-imprimibles', pt: 'halloween-ideias-imprimiveis', it: 'halloween-idee-stampabili', nl: 'halloween-printable-ideen' } },
  { ideaId: 'easter-printable-ideas', slugs: { en: 'easter-printable-ideas', de: 'ostern-druckvorlagen-ideen', fr: 'paques-idees-imprimables', es: 'pascua-ideas-imprimibles', pt: 'pascoa-ideias-imprimiveis', it: 'pasqua-idee-stampabili', nl: 'pasen-printable-ideen' } },
  { ideaId: 'valentines-day-printable-ideas', slugs: { en: 'valentines-day-printable-ideas', de: 'valentinstag-druckvorlagen-ideen', fr: 'saint-valentin-idees-imprimables', es: 'san-valentin-ideas-imprimibles', pt: 'dia-namorados-ideias-imprimiveis', it: 'san-valentino-idee-stampabili', nl: 'valentijnsdag-printable-ideen' } },
  { ideaId: 'back-to-school-printable-ideas', slugs: { en: 'back-to-school-printable-ideas', de: 'schulanfang-druckvorlagen-ideen', fr: 'rentree-scolaire-idees-imprimables', es: 'vuelta-al-cole-ideas-imprimibles', pt: 'regresso-aulas-ideias-imprimiveis', it: 'ritorno-scuola-idee-stampabili', nl: 'terug-naar-school-printable-ideen' } },
  { ideaId: 'summer-printable-ideas', slugs: { en: 'summer-printable-ideas', de: 'sommer-druckvorlagen-ideen', fr: 'ete-idees-imprimables', es: 'verano-ideas-imprimibles', pt: 'verao-ideias-imprimiveis', it: 'estate-idee-stampabili', nl: 'zomer-printable-ideen' } },
  { ideaId: 'winter-printable-ideas', slugs: { en: 'winter-printable-ideas', de: 'winter-druckvorlagen-ideen', fr: 'hiver-idees-imprimables', es: 'invierno-ideas-imprimibles', pt: 'inverno-ideias-imprimiveis', it: 'inverno-idee-stampabili', nl: 'winter-printable-ideen' } },
  { ideaId: 'spring-printable-ideas', slugs: { en: 'spring-printable-ideas', de: 'fruehling-druckvorlagen-ideen', fr: 'printemps-idees-imprimables', es: 'primavera-ideas-imprimibles', pt: 'primavera-ideias-imprimiveis', it: 'primavera-idee-stampabili', nl: 'lente-printable-ideen' } },
  { ideaId: 'thanksgiving-printable-ideas', slugs: { en: 'thanksgiving-printable-ideas', de: 'erntedankfest-druckvorlagen-ideen', fr: 'action-de-grace-idees-imprimables', es: 'accion-de-gracias-ideas-imprimibles', pt: 'acao-gracas-ideias-imprimiveis', it: 'ringraziamento-idee-stampabili', nl: 'thanksgiving-printable-ideen' } },
  { ideaId: 'parents-day-printable-ideas', slugs: { en: 'parents-day-printable-ideas', de: 'elterntag-druckvorlagen-ideen', fr: 'fete-des-parents-idees-imprimables', es: 'dia-de-los-padres-ideas-imprimibles', pt: 'dia-dos-pais-ideias-imprimiveis', it: 'festa-genitori-idee-stampabili', nl: 'ouderdag-printable-ideen' } },

  // === Interests & Activities (10) ===
  { ideaId: 'space-printable-ideas', slugs: { en: 'space-printable-ideas', de: 'weltraum-druckvorlagen-ideen', fr: 'espace-idees-imprimables', es: 'espacio-ideas-imprimibles', pt: 'espaco-ideias-imprimiveis', it: 'spazio-idee-stampabili', nl: 'ruimte-printable-ideen' } },
  { ideaId: 'transportation-printable-ideas', slugs: { en: 'transportation-printable-ideas', de: 'fahrzeuge-druckvorlagen-ideen', fr: 'transports-idees-imprimables', es: 'transporte-ideas-imprimibles', pt: 'transportes-ideias-imprimiveis', it: 'trasporti-idee-stampabili', nl: 'voertuigen-printable-ideen' } },
  { ideaId: 'food-cooking-printable-ideas', slugs: { en: 'food-cooking-printable-ideas', de: 'essen-kochen-druckvorlagen-ideen', fr: 'cuisine-alimentation-idees-imprimables', es: 'cocina-alimentacion-ideas-imprimibles', pt: 'culinaria-alimentacao-ideias-imprimiveis', it: 'cucina-alimentazione-idee-stampabili', nl: 'eten-koken-printable-ideen' } },
  { ideaId: 'sports-printable-ideas', slugs: { en: 'sports-printable-ideas', de: 'sport-druckvorlagen-ideen', fr: 'sports-idees-imprimables', es: 'deportes-ideas-imprimibles', pt: 'desportos-ideias-imprimiveis', it: 'sport-idee-stampabili', nl: 'sport-printable-ideen' } },
  { ideaId: 'music-printable-ideas', slugs: { en: 'music-printable-ideas', de: 'musik-druckvorlagen-ideen', fr: 'musique-idees-imprimables', es: 'musica-ideas-imprimibles', pt: 'musica-ideias-imprimiveis', it: 'musica-idee-stampabili', nl: 'muziek-printable-ideen' } },
  { ideaId: 'construction-printable-ideas', slugs: { en: 'construction-printable-ideas', de: 'baustelle-druckvorlagen-ideen', fr: 'chantier-idees-imprimables', es: 'construccion-ideas-imprimibles', pt: 'construcao-ideias-imprimiveis', it: 'cantiere-idee-stampabili', nl: 'bouwplaats-printable-ideen' } },
  { ideaId: 'pirates-printable-ideas', slugs: { en: 'pirates-printable-ideas', de: 'piraten-druckvorlagen-ideen', fr: 'pirates-idees-imprimables', es: 'piratas-ideas-imprimibles', pt: 'piratas-ideias-imprimiveis', it: 'pirati-idee-stampabili', nl: 'piraten-printable-ideen' } },
  { ideaId: 'fairy-tale-printable-ideas', slugs: { en: 'fairy-tale-printable-ideas', de: 'maerchen-druckvorlagen-ideen', fr: 'contes-fees-idees-imprimables', es: 'cuentos-hadas-ideas-imprimibles', pt: 'contos-fadas-ideias-imprimiveis', it: 'fiabe-idee-stampabili', nl: 'sprookjes-printable-ideen' } },
  { ideaId: 'camping-printable-ideas', slugs: { en: 'camping-printable-ideas', de: 'camping-druckvorlagen-ideen', fr: 'camping-idees-imprimables', es: 'camping-ideas-imprimibles', pt: 'campismo-ideias-imprimiveis', it: 'campeggio-idee-stampabili', nl: 'kamperen-printable-ideen' } },
  { ideaId: 'underwater-printable-ideas', slugs: { en: 'underwater-printable-ideas', de: 'unterwasser-druckvorlagen-ideen', fr: 'sous-marin-idees-imprimables', es: 'submarino-ideas-imprimibles', pt: 'submarino-ideias-imprimiveis', it: 'sottomarino-idee-stampabili', nl: 'onderwaterwereld-printable-ideen' } },

  // === Educational Focus (10) ===
  { ideaId: 'preschool-printable-ideas', slugs: { en: 'preschool-printable-ideas', de: 'vorschule-druckvorlagen-ideen', fr: 'maternelle-idees-imprimables', es: 'preescolar-ideas-imprimibles', pt: 'pre-escolar-ideias-imprimiveis', it: 'prescuola-idee-stampabili', nl: 'peuterspeelzaal-printable-ideen' } },
  { ideaId: 'kindergarten-printable-ideas', slugs: { en: 'kindergarten-printable-ideas', de: 'kindergarten-druckvorlagen-ideen', fr: 'grande-section-idees-imprimables', es: 'infantil-ideas-imprimibles', pt: 'jardim-infancia-ideias-imprimiveis', it: 'scuola-infanzia-idee-stampabili', nl: 'kleuterschool-printable-ideen' } },
  { ideaId: 'first-grade-printable-ideas', slugs: { en: 'first-grade-printable-ideas', de: 'erste-klasse-druckvorlagen-ideen', fr: 'cp-idees-imprimables', es: 'primer-grado-ideas-imprimibles', pt: 'primeiro-ano-ideias-imprimiveis', it: 'prima-elementare-idee-stampabili', nl: 'groep-3-printable-ideen' } },
  { ideaId: 'second-grade-printable-ideas', slugs: { en: 'second-grade-printable-ideas', de: 'zweite-klasse-druckvorlagen-ideen', fr: 'ce1-idees-imprimables', es: 'segundo-grado-ideas-imprimibles', pt: 'segundo-ano-ideias-imprimiveis', it: 'seconda-elementare-idee-stampabili', nl: 'groep-4-printable-ideen' } },
  { ideaId: 'third-grade-printable-ideas', slugs: { en: 'third-grade-printable-ideas', de: 'dritte-klasse-druckvorlagen-ideen', fr: 'ce2-idees-imprimables', es: 'tercer-grado-ideas-imprimibles', pt: 'terceiro-ano-ideias-imprimiveis', it: 'terza-elementare-idee-stampabili', nl: 'groep-5-printable-ideen' } },
  { ideaId: 'homeschool-printable-ideas', slugs: { en: 'homeschool-printable-ideas', de: 'heimunterricht-druckvorlagen-ideen', fr: 'ecole-maison-idees-imprimables', es: 'educacion-en-casa-ideas-imprimibles', pt: 'ensino-domestico-ideias-imprimiveis', it: 'istruzione-domiciliare-idee-stampabili', nl: 'thuisonderwijs-printable-ideen' } },
  { ideaId: 'special-education-printable-ideas', slugs: { en: 'special-education-printable-ideas', de: 'sonderpaedagogik-druckvorlagen-ideen', fr: 'education-specialisee-idees-imprimables', es: 'educacion-especial-ideas-imprimibles', pt: 'educacao-especial-ideias-imprimiveis', it: 'educazione-speciale-idee-stampabili', nl: 'speciaal-onderwijs-printable-ideen' } },
  { ideaId: 'esl-printable-ideas', slugs: { en: 'esl-printable-ideas', de: 'daf-druckvorlagen-ideen', fr: 'fle-idees-imprimables', es: 'ele-ideas-imprimibles', pt: 'ple-ideias-imprimiveis', it: 'italiano-l2-idee-stampabili', nl: 'nt2-printable-ideen' } },
  { ideaId: 'summer-learning-printable-ideas', slugs: { en: 'summer-learning-printable-ideas', de: 'sommerlernen-druckvorlagen-ideen', fr: 'apprentissage-ete-idees-imprimables', es: 'aprendizaje-verano-ideas-imprimibles', pt: 'aprendizagem-verao-ideias-imprimiveis', it: 'apprendimento-estivo-idee-stampabili', nl: 'zomerleren-printable-ideen' } },
  { ideaId: 'math-facts-printable-ideas', slugs: { en: 'math-facts-printable-ideas', de: 'mathe-grundlagen-druckvorlagen-ideen', fr: 'bases-maths-idees-imprimables', es: 'bases-matematicas-ideas-imprimibles', pt: 'bases-matematica-ideias-imprimiveis', it: 'basi-matematica-idee-stampabili', nl: 'rekenfeiten-printable-ideen' } },

  // === Business Models (7) ===
  { ideaId: 'subscription-box-printable-ideas', slugs: { en: 'subscription-box-printable-ideas', de: 'abo-box-druckvorlagen-ideen', fr: 'box-abonnement-idees-imprimables', es: 'caja-suscripcion-ideas-imprimibles', pt: 'caixa-assinatura-ideias-imprimiveis', it: 'abbonamento-box-idee-stampabili', nl: 'abonnementbox-printable-ideen' } },
  { ideaId: 'print-on-demand-printable-ideas', slugs: { en: 'print-on-demand-printable-ideas', de: 'print-on-demand-druckvorlagen-ideen', fr: 'impression-demande-idees-imprimables', es: 'impresion-bajo-demanda-ideas-imprimibles', pt: 'impressao-sob-demanda-ideias-imprimiveis', it: 'stampa-su-richiesta-idee-stampabili', nl: 'print-on-demand-printable-ideen' } },
  { ideaId: 'digital-download-printable-ideas', slugs: { en: 'digital-download-printable-ideas', de: 'digitaler-download-druckvorlagen-ideen', fr: 'telechargement-numerique-idees-imprimables', es: 'descarga-digital-ideas-imprimibles', pt: 'download-digital-ideias-imprimiveis', it: 'download-digitale-idee-stampabili', nl: 'digitale-download-printable-ideen' } },
  { ideaId: 'physical-printable-product-ideas', slugs: { en: 'physical-printable-product-ideas', de: 'physische-druckvorlagen-produkt-ideen', fr: 'produits-imprimes-physiques-idees', es: 'productos-impresos-fisicos-ideas', pt: 'produtos-impressos-fisicos-ideias', it: 'prodotti-stampati-fisici-idee', nl: 'fysieke-printable-product-ideen' } },
  { ideaId: 'party-supply-printable-ideas', slugs: { en: 'party-supply-printable-ideas', de: 'partyzubehoer-druckvorlagen-ideen', fr: 'fournitures-fete-idees-imprimables', es: 'articulos-fiesta-ideas-imprimibles', pt: 'artigos-festa-ideias-imprimiveis', it: 'articoli-festa-idee-stampabili', nl: 'feestartikelen-printable-ideen' } },
  { ideaId: 'custom-worksheet-service-ideas', slugs: { en: 'custom-worksheet-service-ideas', de: 'arbeitsblatt-service-ideen', fr: 'service-fiches-personnalisees-idees', es: 'servicio-fichas-personalizadas-ideas', pt: 'servico-fichas-personalizadas-ideias', it: 'servizio-schede-personalizzate-idee', nl: 'werkblad-service-op-maat-ideen' } },
  { ideaId: 'bulk-licensing-printable-ideas', slugs: { en: 'bulk-licensing-printable-ideas', de: 'massenlizenz-druckvorlagen-ideen', fr: 'licences-volume-idees-imprimables', es: 'licencias-volumen-ideas-imprimibles', pt: 'licencas-volume-ideias-imprimiveis', it: 'licenze-volume-idee-stampabili', nl: 'bulklicenties-printable-ideen' } },
];

/**
 * Get the slug for a specific idea and locale
 */
export function getIdeaSlugForLocale(ideaId: string, locale: SupportedLocale): string | undefined {
  const config = ideaPageSlugs.find(c => c.ideaId === ideaId);
  if (!config) return undefined;
  return config.slugs[locale] || config.slugs.en; // Fallback to English
}

/**
 * Get the idea config from any slug (in any language)
 */
export function getIdeaConfigBySlug(slug: string): { ideaId: string; locale: SupportedLocale } | undefined {
  for (const config of ideaPageSlugs) {
    for (const [locale, localeSlug] of Object.entries(config.slugs)) {
      if (localeSlug === slug) {
        return { ideaId: config.ideaId, locale: locale as SupportedLocale };
      }
    }
  }
  return undefined;
}

/**
 * Get all slugs for all locales (for generateStaticParams)
 */
export function getAllIdeaPageSlugs(): { locale: SupportedLocale; slug: string }[] {
  const result: { locale: SupportedLocale; slug: string }[] = [];

  for (const config of ideaPageSlugs) {
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
export function getIdeaAlternateUrls(ideaId: string, baseUrl: string = 'https://www.lessoncraftstudio.com'): Record<string, string> {
  const config = ideaPageSlugs.find(c => c.ideaId === ideaId);
  if (!config) return {};

  const alternates: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(config.slugs)) {
    if (slug) {
      const hreflangCode = getHreflangCode(locale);
      alternates[hreflangCode] = `${baseUrl}/${locale}/ideas/${slug}`;
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
export function hasIdeaPage(slug: string, locale: SupportedLocale): boolean {
  const config = getIdeaConfigBySlug(slug);
  if (!config) return false;

  const ideaConfig = ideaPageSlugs.find(c => c.ideaId === config.ideaId);
  return ideaConfig?.slugs[locale] === slug;
}
