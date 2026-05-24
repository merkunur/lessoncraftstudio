/**
 * SEO Schema Markup Generator
 * Generates JSON-LD structured data for pages.
 *
 * Supports: FAQ schema, Static Page schemas (WebPage + BreadcrumbList),
 * VideoObject, ImageObject / ImageGallery, plus hreflang and OpenGraph
 * locale utilities (getHreflangCode, ogLocaleMap, localizedHomeLabel)
 * that the live homepage, sitemap shards, and static pages depend on.
 *
 * Seller-era collection/itemlist/about schemas were removed in [FIX][SEO]
 * (same residue family as 34147318, b28f7bdb) — they targeted /apps,
 * /tools/<slug>, /guides, /bundles, /ideas, /start (all 410'd) and /about
 * (404 reshelled). No live caller imported them at removal time.
 */

import { encodeImagePath } from '@/lib/encode-image-path';

/**
 * Get the base URL from environment variable or use production default
 */
function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';
}

function getSpeakableSpecification(): object {
  return {
    "@type": "SpeakableSpecification",
    "cssSelector": [".speakable-headline", ".speakable-summary"]
  };
}

/**
 * Generate FAQ Schema if the post contains FAQ content
 */
export function generateFAQSchema(faqs: Array<{question: string; answer: string}>, locale: string, pageUrl?: string) {
  const baseUrl = getBaseUrl();
  // dateModified uses the build time; good enough for crawler freshness
  // signals since the site rebuilds whenever content changes.
  const dateModified = new Date().toISOString();
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { "@id": `${pageUrl}#faq`, "url": pageUrl } : { "@id": `${baseUrl}/${locale}/#faq`, "url": `${baseUrl}/${locale}` }),
    "dateModified": dateModified,
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })),
    "inLanguage": getHreflangCode(locale)
  };
}

/**
 * Localized home labels
 */
export const localizedHomeLabel: Record<string, string> = {
  en: "Home",
  de: "Startseite",
  fr: "Accueil",
  es: "Inicio",
  pt: "Início",
  it: "Home",
  nl: "Home",
  sv: "Hem",
  da: "Hjem",
  no: "Hjem",
  fi: "Etusivu"
};

/**
 * og:locale mapping for OpenGraph tags
 * Note: es uses es_ES (standard Spanish) to serve all Spanish-speaking markets
 */
export const ogLocaleMap: Record<string, string> = {
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
  // es: revised es_ES → es_MX per [ARC][SEO][DECK-PAGE] Phase 0 D7 register
  // evidence (image-vocabulary.js entries: chabacano, pay de manzana, carriola,
  // aguacate, carro, computadora, papa — unambiguous Mexican-Spanish canonical).
  // Concern 1 supplement adjudication ratified at Phase 1 5-item batch lock.
  // Replaces the prior "Standard Spanish" framing which conflated register
  // (the original draft also wrongly proposed pt_PT for the same reason —
  // both cases failed because vocabulary register was the load-bearing signal,
  // not country-code defaults).
  es: 'es_MX',
  pt: 'pt_BR',  // Brazilian Portuguese canonical per CLAUDE.md §6 (caminhão / ônibus / educação infantil)
  it: 'it_IT',
  nl: 'nl_NL',
  sv: 'sv_SE',
  da: 'da_DK',
  no: 'nb_NO',  // Norwegian Bokmål per Facebook's supported locale list
  fi: 'fi_FI'
};

/**
 * Hreflang mapping for language alternates
 * Uses regional code for Portuguese (Brazil) only
 * Spanish uses plain 'es' to serve ALL Spanish-speaking markets (not just Mexico)
 */
export const hreflangMap: Record<string, string> = {
  en: 'en',
  de: 'de',
  fr: 'fr',
  es: 'es',       // All Spanish-speaking markets (Spain, Mexico, Latin America)
  pt: 'pt-BR',    // Brazilian Portuguese (97% of Portuguese speakers)
  it: 'it',
  nl: 'nl',
  sv: 'sv',
  da: 'da',
  no: 'no',
  fi: 'fi',
};

/**
 * Get the proper hreflang code for a locale
 * Converts internal locale codes to proper hreflang format
 */
export function getHreflangCode(locale: string): string {
  return hreflangMap[locale] || locale;
}

// ── Static Page Schema Generator ─────────────────────────────────

/**
 * Generate WebPage + BreadcrumbList schemas for simple static pages
 * (contact, terms, privacy, license)
 */
export function generateStaticPageSchemas(input: {
  pagePath: string;
  pageName: string;
  pageDescription: string;
  locale: string;
  pageType?: string;
  dateModified?: string;
}, baseUrl: string = getBaseUrl()) {
  const { pagePath, pageName, pageDescription, locale, pageType = 'WebPage', dateModified = '2026-02-22' } = input;
  const pageUrl = `${baseUrl}/${locale}${pagePath}`;
  const schemas: any[] = [];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": `${pageUrl}#webpage`,
    "url": pageUrl,
    "name": pageName,
    "description": pageDescription,
    "inLanguage": getHreflangCode(locale),
    "dateModified": dateModified,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "breadcrumb": {
      "@id": `${pageUrl}#breadcrumb`
    },
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "speakable": getSpeakableSpecification()
  };
  schemas.push(webPageSchema);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": localizedHomeLabel[locale] || "Home",
        "item": `${baseUrl}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageName
      }
    ]
  };
  schemas.push(breadcrumbSchema);

  return schemas;
}

/**
 * Generate VideoObject JSON-LD schema for pages with embedded YouTube videos.
 * Used across all 6 page types (apps, tools, guides, bundles, ideas, starts).
 */
export function generateVideoSchema(params: {
  name: string;
  description: string;
  youtubeId: string;
  thumbnailUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: params.name,
    description: params.description,
    thumbnailUrl: params.thumbnailUrl || `https://img.youtube.com/vi/${params.youtubeId}/maxresdefault.jpg`,
    uploadDate: '2026-02-01T00:00:00+00:00',
    contentUrl: `https://www.youtube.com/watch?v=${params.youtubeId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${params.youtubeId}`,
  };
}

/**
 * Generate ImageObject JSON-LD schemas for showcase images (hero, tiered, spotlight, gallery).
 * Used across all 6 page types to give Google image licensing metadata for the most prominent
 * visual content on each page. Deduplicates by encoded URL.
 */
export function generateShowcaseImageSchemas(
  showcaseConfig: {
    hero: { images: Array<{ src: string; alt: string }> };
    tiered: { tiers: Array<{ image: { src: string; alt: string } }> };
    spotlight: { image: { src: string; alt: string } };
    gallery: { items: Array<{ image: { src: string; alt: string } }> };
  } | null,
  locale: string,
  pageUrl: string,
  existingUrls?: Set<string>,
): object[] {
  if (!showcaseConfig) return [];
  const baseUrl = getBaseUrl();
  const schemas: object[] = [];
  const seen = existingUrls ? new Set(existingUrls) : new Set<string>();

  function add(src: string, alt: string) {
    if (!src || !src.startsWith('/samples/')) return;
    const url = `${baseUrl}${encodeImagePath(src)}`;
    if (seen.has(url)) return;
    seen.add(url);
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      contentUrl: url,
      name: alt,
      caption: alt,
      encodingFormat: 'image/webp',
      width: 2480,
      height: 3508,
      license: `${baseUrl}/${locale}/license`,
      acquireLicensePage: pageUrl,
      creditText: 'LessonCraftStudio',
      creator: { '@type': 'Organization', name: 'LessonCraftStudio' },
      copyrightHolder: { '@type': 'Organization', name: 'LessonCraftStudio' },
      copyrightNotice: '© LessonCraftStudio',
    });
  }

  // Hero (3 images)
  if (showcaseConfig.hero?.images) {
    for (const img of showcaseConfig.hero.images) add(img.src, img.alt);
  }
  // Tiered (3 images)
  if (showcaseConfig.tiered?.tiers) {
    for (const tier of showcaseConfig.tiered.tiers) add(tier.image.src, tier.image.alt);
  }
  // Spotlight (1 image)
  if (showcaseConfig.spotlight?.image) {
    add(showcaseConfig.spotlight.image.src, showcaseConfig.spotlight.image.alt);
  }
  // Gallery (3 images)
  if (showcaseConfig.gallery?.items) {
    for (const item of showcaseConfig.gallery.items) add(item.image.src, item.image.alt);
  }

  return schemas;
}

/**
 * Generate ImageGallery JSON-LD schema for sample worksheet gallery sections.
 * Wraps sample images in a structured gallery for richer Google Image results.
 */
export function generateImageGallerySchema(
  images: Array<{ src: string; alt: string; caption?: string }>,
  galleryName: string,
  locale: string,
  pageUrl: string,
): object | null {
  if (!images || images.length === 0) return null;
  const baseUrl = getBaseUrl();

  const imageObjects = images.map((img, i) => ({
    '@type': 'ImageObject' as const,
    contentUrl: `${baseUrl}${encodeImagePath(img.src)}`,
    name: img.alt,
    caption: img.caption || img.alt,
    encodingFormat: 'image/webp',
    width: 2480,
    height: 3508,
    license: `${baseUrl}/${locale}/license`,
    acquireLicensePage: pageUrl,
    creditText: 'LessonCraftStudio',
    creator: { '@type': 'Organization', name: 'LessonCraftStudio' },
    copyrightHolder: { '@type': 'Organization', name: 'LessonCraftStudio' },
    copyrightNotice: '\u00a9 LessonCraftStudio',
    ...(i === 0 && { representativeOfPage: true }),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${pageUrl}#image-gallery`,
    name: galleryName,
    url: `${pageUrl}#samples`,
    numberOfItems: images.length,
    image: imageObjects,
    inLanguage: getHreflangCode(locale),
  };
}