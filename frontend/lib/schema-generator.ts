/**
 * SEO Schema Markup Generator
 * Automatically generates JSON-LD structured data for blog posts
 * Supports: Article, Breadcrumb, LearningResource, and Course schemas
 */

import { SUPPORTED_LOCALES } from '@/config/locales';

/**
 * Get the base URL from environment variable or use production default
 */
function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 'https://www.lessoncraftstudio.com';
}

interface BlogPostData {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  content: string;
  featuredImage?: string | null;
  focusKeyword?: string;
  keywords?: string[];
  category?: string;
  author?: string;
  createdAt: Date;
  updatedAt: Date;
}

export function generateBlogSchemas(post: BlogPostData, locale: string, baseUrl: string = getBaseUrl()) {
  const schemas: any[] = [];

  const postUrl = `${baseUrl}/${locale}/blog/${post.slug}`;
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || '';
  const image = post.featuredImage ? `${baseUrl}${post.featuredImage}` : `${baseUrl}/default-blog-image.svg`;

  // 1. Article Schema (Primary)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": post.author || "LessonCraftStudio Team",
      "url": `${baseUrl}/${locale}`,
      "jobTitle": "Educational Content Creator",
      "worksFor": {
        "@type": "EducationalOrganization",
        "name": "LessonCraftStudio"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "LessonCraftStudio",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo-lcs.png`,
        "width": 600,
        "height": 60
      }
    },
    "datePublished": post.createdAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "keywords": post.focusKeyword || post.keywords?.join(', ') || '',
    "articleSection": post.category || 'Education',
    "inLanguage": locale,
    "about": {
      "@type": "Thing",
      "name": post.category || 'Educational Resources'
    }
  };

  schemas.push(articleSchema);

  // 2. Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/${locale}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": postUrl
      }
    ]
  };

  schemas.push(breadcrumbSchema);

  // 3. Educational Content Schema (LearningResource)
  // This is CRITICAL for educational websites
  const educationalSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": title,
    "description": description,
    "educationalUse": "assignment",
    "educationalLevel": "Elementary School",
    "learningResourceType": "Educational Article",
    "inLanguage": locale,
    "isAccessibleForFree": true,
    "provider": {
      "@type": "Organization",
      "name": "LessonCraftStudio",
      "url": `${baseUrl}/${locale}`
    },
    "teaches": post.focusKeyword || post.category || 'Educational content',
    "typicalAgeRange": "6-12",
    "url": postUrl,
    "dateCreated": post.createdAt.toISOString(),
    "dateModified": post.updatedAt.toISOString()
  };

  schemas.push(educationalSchema);

  // 4. ImageObject Schema (if featured image exists)
  if (post.featuredImage) {
    const imageSchema = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "url": image,
      "width": 1200,
      "height": 630,
      "caption": title,
      "description": description
    };

    schemas.push(imageSchema);
  }

  // 5. Organization Schema (for E-A-T signals)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "LessonCraftStudio",
    "url": `${baseUrl}/${locale}`,
    "logo": `${baseUrl}/logo-lcs.png`,
    "sameAs": [
      // Add social media profiles here when available
    ],
    "description": "Free printable educational worksheets for elementary school teachers and parents",
    "areaServed": "Worldwide",
    "availableLanguage": ["en", "de", "fr", "es", "pt", "it", "nl", "sv", "da", "no", "fi"]
  };

  schemas.push(organizationSchema);

  return schemas;
}

/**
 * Generate FAQ Schema if the post contains FAQ content
 */
export function generateFAQSchema(faqs: Array<{question: string; answer: string}>, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })),
    "inLanguage": locale
  };
}

/**
 * Generate HowTo Schema for tutorial/guide posts
 */
export function generateHowToSchema(
  title: string,
  description: string,
  steps: Array<{name: string; text: string}>,
  locale: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    })),
    "inLanguage": locale
  };
}

/**
 * Generate Homepage Schemas
 * Includes: Organization, WebSite, and SoftwareApplication schemas
 */
export function generateHomepageSchemas(locale: string, baseUrl: string = getBaseUrl()) {
  const schemas: any[] = [];

  // 1. Organization Schema (E-A-T signals)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "LessonCraftStudio",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo-lcs.png`,
      "width": 600,
      "height": 60
    },
    "description": "Professional worksheet generators for teachers and educators. Create customized educational materials in seconds.",
    "areaServed": "Worldwide",
    "availableLanguage": [...SUPPORTED_LOCALES],
    "sameAs": []
  };
  schemas.push(organizationSchema);

  // 2. WebSite Schema (enables sitelinks search box in SERPs)
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LessonCraftStudio",
    "url": baseUrl,
    "description": "Free worksheet generators for teachers and parents",
    "inLanguage": locale,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/${locale}/apps?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
  schemas.push(webSiteSchema);

  // 3. SoftwareApplication Schema (for the platform)
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LessonCraftStudio Worksheet Generators",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "33 professional worksheet generators with 100+ themed images for creating educational materials",
    "featureList": [
      "Word Search Generator",
      "Crossword Puzzle Generator",
      "Math Worksheet Generator",
      "Pattern Recognition Activities",
      "Matching Games",
      "And 28 more generators"
    ],
    "screenshot": `${baseUrl}/opengraph-image.png`
  };
  schemas.push(softwareSchema);

  return schemas;
}

/**
 * Generate Apps Collection Page Schema
 */
export function generateAppsCollectionSchema(locale: string, baseUrl: string = getBaseUrl()) {
  const localizedNames: Record<string, string> = {
    en: "Worksheet Generator Apps",
    de: "Arbeitsblatt-Generator Apps",
    fr: "Applications Générateur de Fiches",
    es: "Aplicaciones Generador de Fichas",
    pt: "Aplicativos Gerador de Planilhas",
    it: "App Generatore di Schede",
    nl: "Werkblad Generator Apps",
    sv: "Arbetsblad Generator Appar",
    da: "Arbejdsark Generator Apps",
    no: "Arbeidsark Generator Apper",
    fi: "Työarkki Generaattori Sovellukset"
  };

  const localizedDescriptions: Record<string, string> = {
    en: "33 professional worksheet generators for education. Create word searches, crosswords, math puzzles and more.",
    de: "33 professionelle Arbeitsblatt-Generatoren für Bildung. Erstellen Sie Wortsuchrätsel, Kreuzworträtsel, Mathe-Puzzles und mehr.",
    fr: "33 générateurs de fiches professionnels pour l'éducation. Créez des mots cachés, des mots croisés, des puzzles mathématiques et plus.",
    es: "33 generadores de fichas profesionales para educación. Cree sopas de letras, crucigramas, puzzles matemáticos y más.",
    pt: "33 geradores de planilhas profissionais para educação. Crie caça-palavras, palavras cruzadas, quebra-cabeças de matemática e mais.",
    it: "33 generatori di schede professionali per l'istruzione. Crea ricerca di parole, cruciverba, puzzle matematici e altro.",
    nl: "33 professionele werkblad generatoren voor onderwijs. Maak woordzoekers, kruiswoordpuzzels, rekenpuzzels en meer.",
    sv: "33 professionella arbetsblad generatorer för utbildning. Skapa ordjaktar, korsord, mattepussel och mer.",
    da: "33 professionelle arbejdsark generatorer til uddannelse. Opret ordjaktar, krydsord, matematikpuslespil og mere.",
    no: "33 profesjonelle arbeidsark generatorer for utdanning. Lag ordjaktar, kryssord, mattepuslespill og mer.",
    fi: "33 ammattimaista työarkki generaattoria koulutukseen. Luo sanaristikkoja, ristisanatehtäviä, matemaattisia pulmia ja muuta."
  };

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": localizedNames[locale] || localizedNames.en,
    "description": localizedDescriptions[locale] || localizedDescriptions.en,
    "url": `${baseUrl}/${locale}/apps`,
    "numberOfItems": 33,
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "provider": {
      "@type": "EducationalOrganization",
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "about": {
      "@type": "Thing",
      "name": "Educational Worksheet Generators"
    }
  };
}

/**
 * Generate ItemList schema for the /apps collection page
 * Lists all 33 apps for better SERP display
 */
export function generateAppsItemListSchema(
  locale: string,
  apps: Array<{ id: string; name: string; slug: string; description?: string }>,
  baseUrl: string = getBaseUrl()
) {
  const itemListElements = apps.map((app, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": app.name,
    "url": `${baseUrl}/${locale}/apps/${app.slug}`,
    ...(app.description && { "description": app.description })
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": locale === 'de' ? '33 Arbeitsblatt-Generatoren' :
            locale === 'fr' ? '33 Générateurs de Fiches' :
            locale === 'es' ? '33 Generadores de Fichas' :
            locale === 'pt' ? '33 Geradores de Planilhas' :
            locale === 'it' ? '33 Generatori di Schede' :
            locale === 'nl' ? '33 Werkblad Generatoren' :
            locale === 'sv' ? '33 Arbetsblad Generatorer' :
            locale === 'da' ? '33 Arbejdsark Generatorer' :
            locale === 'no' ? '33 Arbeidsark Generatorer' :
            locale === 'fi' ? '33 Työarkki Generaattoria' :
            '33 Worksheet Generators',
    "numberOfItems": apps.length,
    "itemListElement": itemListElements
  };
}

/**
 * App Product Data interface for schema generation
 */
export interface AppProductData {
  appId: string;
  name: string;
  description: string;
  category?: string;
  tier?: 'free' | 'core' | 'full';
}

/**
 * Localized breadcrumb labels for "Apps" link
 */
const localizedAppsLabel: Record<string, string> = {
  en: "Apps",
  de: "Apps",
  fr: "Applications",
  es: "Aplicaciones",
  pt: "Aplicativos",
  it: "App",
  nl: "Apps",
  sv: "Appar",
  da: "Apps",
  no: "Apper",
  fi: "Sovellukset"
};

/**
 * Localized home labels
 */
const localizedHomeLabel: Record<string, string> = {
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
 * Localized pricing tier names
 */
const localizedFreeTier: Record<string, string> = {
  en: "Free Tier",
  de: "Kostenlose Stufe",
  fr: "Niveau Gratuit",
  es: "Nivel Gratuito",
  pt: "Nível Gratuito",
  it: "Livello Gratuito",
  nl: "Gratis Niveau",
  sv: "Gratis Nivå",
  da: "Gratis Niveau",
  no: "Gratis Nivå",
  fi: "Ilmainen Taso"
};

const localizedCoreTier: Record<string, string> = {
  en: "Core Bundle",
  de: "Basis-Paket",
  fr: "Forfait Essentiel",
  es: "Paquete Esencial",
  pt: "Pacote Essencial",
  it: "Pacchetto Base",
  nl: "Basispakket",
  sv: "Grundpaket",
  da: "Grundpakke",
  no: "Grunnpakke",
  fi: "Peruspaketti"
};

const localizedFullTier: Record<string, string> = {
  en: "Full Access",
  de: "Voller Zugang",
  fr: "Accès Complet",
  es: "Acceso Completo",
  pt: "Acesso Completo",
  it: "Accesso Completo",
  nl: "Volledige Toegang",
  sv: "Full Åtkomst",
  da: "Fuld Adgang",
  no: "Full Tilgang",
  fi: "Täysi Käyttöoikeus"
};

const localizedFreeDesc: Record<string, string> = {
  en: "Access to Word Search generator",
  de: "Zugang zum Wortsuchrätsel-Generator",
  fr: "Accès au générateur de mots cachés",
  es: "Acceso al generador de sopa de letras",
  pt: "Acesso ao gerador de caça-palavras",
  it: "Accesso al generatore di ricerca parole",
  nl: "Toegang tot de woordzoeker generator",
  sv: "Tillgång till ordjakts-generatorn",
  da: "Adgang til ordjakts-generatoren",
  no: "Tilgang til ordjakts-generatoren",
  fi: "Pääsy sanaristikko-generaattoriin"
};

const localizedCoreDesc: Record<string, string> = {
  en: "Access to 10 core worksheet generators",
  de: "Zugang zu 10 Basis-Arbeitsblatt-Generatoren",
  fr: "Accès à 10 générateurs de fiches essentiels",
  es: "Acceso a 10 generadores de fichas esenciales",
  pt: "Acesso a 10 geradores de planilhas essenciais",
  it: "Accesso a 10 generatori di schede essenziali",
  nl: "Toegang tot 10 basis werkblad generatoren",
  sv: "Tillgång till 10 grundläggande arbetsblads-generatorer",
  da: "Adgang til 10 grundlæggende arbejdsark-generatorer",
  no: "Tilgang til 10 grunnleggende arbeidsark-generatorer",
  fi: "Pääsy 10 perus työarkki-generaattoriin"
};

const localizedFullDesc: Record<string, string> = {
  en: "Access to all 33 worksheet generators",
  de: "Zugang zu allen 33 Arbeitsblatt-Generatoren",
  fr: "Accès aux 33 générateurs de fiches",
  es: "Acceso a los 33 generadores de fichas",
  pt: "Acesso a todos os 33 geradores de planilhas",
  it: "Accesso a tutti i 33 generatori di schede",
  nl: "Toegang tot alle 33 werkblad generatoren",
  sv: "Tillgång till alla 33 arbetsblads-generatorer",
  da: "Adgang til alle 33 arbejdsark-generatorer",
  no: "Tilgang til alle 33 arbeidsark-generatorer",
  fi: "Pääsy kaikkiin 33 työarkki-generaattoriin"
};

/**
 * Localized schema offer descriptions (for JSON-LD schema markup)
 */
const localizedSchemaFreeDesc: Record<string, string> = {
  en: "Access to Word Search generator",
  de: "Zugang zum Wortsuchrätsel-Generator",
  fr: "Accès au générateur de mots cachés",
  es: "Acceso al generador de sopa de letras",
  pt: "Acesso ao gerador de caça-palavras",
  it: "Accesso al generatore di ricerca parole",
  nl: "Toegang tot de woordzoeker generator",
  sv: "Tillgång till ordjakts-generatorn",
  da: "Adgang til ordjakts-generatoren",
  no: "Tilgang til ordjakts-generatoren",
  fi: "Pääsy sanaristikko-generaattoriin"
};

const localizedSchemaCoreDesc: Record<string, string> = {
  en: "Access to 10 core worksheet generators",
  de: "Zugang zu 10 Basis-Arbeitsblatt-Generatoren",
  fr: "Accès à 10 générateurs de fiches essentiels",
  es: "Acceso a 10 generadores de fichas esenciales",
  pt: "Acesso a 10 geradores de planilhas essenciais",
  it: "Accesso a 10 generatori di schede essenziali",
  nl: "Toegang tot 10 basis werkblad generatoren",
  sv: "Tillgång till 10 grundläggande arbetsblads-generatorer",
  da: "Adgang til 10 grundlæggende arbejdsark-generatorer",
  no: "Tilgang til 10 grunnleggende arbeidsark-generatorer",
  fi: "Pääsy 10 perus työarkki-generaattoriin"
};

const localizedSchemaFullDesc: Record<string, string> = {
  en: "Access to all 33 worksheet generators",
  de: "Zugang zu allen 33 Arbeitsblatt-Generatoren",
  fr: "Accès aux 33 générateurs de fiches",
  es: "Acceso a los 33 generadores de fichas",
  pt: "Acesso a todos os 33 geradores de planilhas",
  it: "Accesso a tutti i 33 generatori di schede",
  nl: "Toegang tot alle 33 werkblad generatoren",
  sv: "Tillgång till alla 33 arbetsblads-generatorer",
  da: "Adgang til alle 33 arbejdsark-generatorer",
  no: "Tilgang til alle 33 arbeidsark-generatorer",
  fi: "Pääsy kaikkiin 33 työarkki-generaattoriin"
};

const localizedWorksheetGenerator: Record<string, string> = {
  en: "Worksheet Generator",
  de: "Arbeitsblatt-Generator",
  fr: "Générateur de Fiches",
  es: "Generador de Fichas",
  pt: "Gerador de Planilhas",
  it: "Generatore di Schede",
  nl: "Werkblad Generator",
  sv: "Arbetsblads-generator",
  da: "Arbejdsark-generator",
  no: "Arbeidsark-generator",
  fi: "Työarkki-generaattori"
};

/**
 * og:locale mapping for OpenGraph tags
 * Note: es targets Mexico (es_MX) for Latin America market
 */
export const ogLocaleMap: Record<string, string> = {
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
  es: 'es_MX',  // Changed from es_ES - targeting Mexico/Latin America
  pt: 'pt_BR',
  it: 'it_IT',
  nl: 'nl_NL',
  sv: 'sv_SE',
  da: 'da_DK',
  no: 'nb_NO',
  fi: 'fi_FI'
};

/**
 * Hreflang mapping for language alternates
 * Uses regional codes for Portuguese (Brazil) and Spanish (Mexico/Latin America)
 * This is critical for SEO in target markets
 */
export const hreflangMap: Record<string, string> = {
  en: 'en',
  de: 'de',
  fr: 'fr',
  es: 'es-MX',    // Mexican Spanish for Latin America market
  pt: 'pt-BR',    // Brazilian Portuguese
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

/**
 * Language folder mapping for sample images
 */
export const localeToLanguageFolder: Record<string, string> = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  pt: 'portuguese',
  it: 'italian',
  nl: 'dutch',
  sv: 'swedish',
  da: 'danish',
  no: 'norwegian',
  fi: 'finnish'
};

/**
 * Generate FAQPage Schema for product pages
 * Enables FAQ rich snippets in Google SERPs
 */
export function generateProductPageFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
  locale: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })),
    "inLanguage": locale
  };
}

/**
 * HowTo Step interface for product page tutorials
 */
export interface HowToStepData {
  name: string;
  text: string;
  image?: string;
}

/**
 * Generate HowTo Schema for product pages
 * Enables How-To rich snippets showing steps
 */
export function generateProductPageHowToSchema(
  title: string,
  description: string,
  steps: HowToStepData[],
  locale: string,
  totalTime: string = 'PT3M'
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "totalTime": totalTime,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image })
    })),
    "inLanguage": locale
  };
}

/**
 * Image metadata interface for sample images
 */
export interface SampleImageData {
  src: string;
  name: string;
  description: string;
  caption: string;
  width?: number;
  height?: number;
  thumbnailSrc?: string;
}

/**
 * Generate ImageObject Schema for sample images
 * Critical for Google Image Search visibility
 */
export function generateImageObjectSchema(
  image: SampleImageData,
  pageUrl: string,
  baseUrl: string = getBaseUrl()
) {
  // Encode URL properly for spaces
  const encodedSrc = image.src.replace(/ /g, '%20');
  const encodedThumb = image.thumbnailSrc?.replace(/ /g, '%20');

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": `${baseUrl}${encodedSrc}`,
    "url": pageUrl,
    "name": image.name,
    "description": image.description,
    "caption": image.caption,
    "width": image.width || 2480,
    "height": image.height || 3508,
    "encodingFormat": image.src.endsWith('.webp') ? 'image/webp' : 'image/jpeg',
    ...(encodedThumb && { "thumbnailUrl": `${baseUrl}${encodedThumb}` }),
    "license": `${baseUrl}/terms`,
    "acquireLicensePage": `${baseUrl}/pricing`,
    "creditText": "LessonCraftStudio",
    "copyrightNotice": "© 2024-2026 LessonCraftStudio",
    "creator": {
      "@type": "Organization",
      "name": "LessonCraftStudio"
    },
    "associatedArticle": {
      "@type": "WebPage",
      "url": pageUrl
    }
  };
}

/**
 * Generate Product Schema for PDF downloads
 * Marks downloadable PDFs as products for rich results
 */
export function generateProductSchema(
  name: string,
  description: string,
  imageUrl: string,
  pdfUrl: string,
  category: string,
  baseUrl: string = getBaseUrl()
) {
  const encodedImage = imageUrl.replace(/ /g, '%20');
  const encodedPdf = pdfUrl.replace(/ /g, '%20');

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": `${baseUrl}${encodedImage}`,
    "brand": {
      "@type": "Brand",
      "name": "LessonCraftStudio"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `${baseUrl}${encodedPdf}`
    },
    "category": category
  };
}

/**
 * Generate all schemas for a product page with full SEO
 * Combines: SoftwareApplication, BreadcrumbList, WebPage, FAQPage, HowTo, and ImageObjects
 */
export function generateAllProductPageSchemas(
  appData: AppProductData,
  locale: string,
  pageUrl: string,
  faqs?: Array<{ question: string; answer: string }>,
  howTo?: { title: string; description: string; steps: HowToStepData[] },
  sampleImages?: SampleImageData[],
  baseUrl: string = getBaseUrl()
): object[] {
  const schemas: object[] = [];

  // 1. Core schemas (SoftwareApplication, BreadcrumbList, WebPage)
  schemas.push(...generateAppProductSchemas(appData, locale, pageUrl, baseUrl));

  // 2. FAQPage schema (if FAQ content provided)
  if (faqs && faqs.length > 0) {
    schemas.push(generateProductPageFAQSchema(faqs, locale));
  }

  // 3. HowTo schema (if how-to steps provided)
  if (howTo && howTo.steps.length > 0) {
    schemas.push(generateProductPageHowToSchema(
      howTo.title,
      howTo.description,
      howTo.steps,
      locale
    ));
  }

  // 4. ImageObject schemas for sample images (limit to first 5 for performance)
  if (sampleImages && sampleImages.length > 0) {
    const imagesToProcess = sampleImages.slice(0, 5);
    for (const image of imagesToProcess) {
      schemas.push(generateImageObjectSchema(image, pageUrl, baseUrl));
    }
  }

  return schemas;
}

/**
 * Generate Schema Markup for Individual App Product Pages
 * Includes: SoftwareApplication and BreadcrumbList schemas
 */
export function generateAppProductSchemas(
  appData: AppProductData,
  locale: string,
  pageUrl: string,
  baseUrl: string = getBaseUrl()
): object[] {
  const schemas: object[] = [];

  // 1. SoftwareApplication Schema (primary - for rich results)
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": appData.name,
    "description": appData.description,
    "url": pageUrl,
    "applicationCategory": "EducationalApplication",
    "applicationSubCategory": appData.category || "Worksheet Generator",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "0",
      "highPrice": "25",
      "offerCount": 3,
      "offers": [
        {
          "@type": "Offer",
          "name": localizedFreeTier[locale] || localizedFreeTier.en,
          "price": "0",
          "priceCurrency": "USD",
          "description": localizedSchemaFreeDesc[locale] || localizedSchemaFreeDesc.en
        },
        {
          "@type": "Offer",
          "name": localizedCoreTier[locale] || localizedCoreTier.en,
          "price": "15",
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "15",
            "priceCurrency": "USD",
            "billingDuration": "P1M"
          },
          "description": localizedSchemaCoreDesc[locale] || localizedSchemaCoreDesc.en
        },
        {
          "@type": "Offer",
          "name": localizedFullTier[locale] || localizedFullTier.en,
          "price": "25",
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "25",
            "priceCurrency": "USD",
            "billingDuration": "P1M"
          },
          "description": localizedSchemaFullDesc[locale] || localizedSchemaFullDesc.en
        }
      ]
    },
    "provider": {
      "@type": "Organization",
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "inLanguage": locale,
    "isAccessibleForFree": appData.tier === 'free',
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "Teacher",
      "audienceType": "Educators"
    },
    "screenshot": `${baseUrl}/opengraph-image.png`
  };

  schemas.push(softwareAppSchema);

  // 2. BreadcrumbList Schema (for navigation context)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        "name": localizedAppsLabel[locale] || "Apps",
        "item": `${baseUrl}/${locale}/apps`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": appData.name,
        "item": pageUrl
      }
    ]
  };

  schemas.push(breadcrumbSchema);

  // 3. WebPage Schema (for page context) - ENHANCED WITH E-A-T SIGNALS
  // E-A-T (Expertise, Authoritativeness, Trustworthiness) signals are critical
  // for educational content ranking
  const currentDate = new Date().toISOString().split('T')[0];
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": appData.name,
    "description": appData.description,
    "url": pageUrl,
    "inLanguage": locale,
    // E-A-T: Publication dates signal content freshness
    "datePublished": "2024-01-01", // Site launch date
    "dateModified": currentDate,   // Current date for freshness signal
    // E-A-T: Author/publisher signals expertise and authority
    "author": {
      "@type": "Organization",
      "name": "LessonCraftStudio",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "LessonCraftStudio",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "about": {
      "@type": "SoftwareApplication",
      "name": appData.name
    },
    // E-A-T: Educational audience signals domain expertise
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": ["teacher", "parent", "educator"]
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": appData.name
    }
  };

  schemas.push(webPageSchema);

  return schemas;
}

/**
 * Generate Course Schema for educational blog content
 * Use this for blog posts that teach specific educational concepts
 */
export function generateCourseSchema(
  post: {
    title: string;
    description: string;
    slug: string;
    category?: string;
    keywords?: string[];
    createdAt?: Date;
    updatedAt?: Date;
  },
  locale: string,
  baseUrl: string = getBaseUrl()
) {
  const courseUrl = `${baseUrl}/${locale}/blog/${post.slug}`;

  // Map category to educational level
  const educationalLevelMap: Record<string, string> = {
    'math': 'Beginner',
    'literacy': 'Beginner',
    'preschool': 'Beginner',
    'kindergarten': 'Beginner',
    'elementary': 'Intermediate',
    'worksheets': 'Beginner',
    'activities': 'Beginner',
  };

  const educationalLevel = educationalLevelMap[post.category?.toLowerCase() || ''] || 'Beginner';

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": post.title,
    "description": post.description,
    "url": courseUrl,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "LessonCraftStudio",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo-lcs.png`
      }
    },
    "educationalLevel": educationalLevel,
    "inLanguage": locale,
    "isAccessibleForFree": true,
    "courseMode": "online",
    "teaches": post.keywords?.join(', ') || post.category || 'Educational content',
    "dateCreated": post.createdAt?.toISOString() || new Date().toISOString(),
    "dateModified": post.updatedAt?.toISOString() || new Date().toISOString(),
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": ["teacher", "parent", "student"]
    },
    "about": {
      "@type": "Thing",
      "name": post.category || "Education"
    }
  };
}

/**
 * Generate author and publisher link tags for blog posts
 * Returns HTML link elements for rel="author" and rel="publisher"
 */
export function generateAuthorPublisherLinks(baseUrl: string = getBaseUrl()) {
  return {
    author: `${baseUrl}/about`,
    publisher: baseUrl
  };
}
