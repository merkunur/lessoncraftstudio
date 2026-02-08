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
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lessoncraftstudio.com';
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
  categoryDisplayName?: string;
  author?: string;
  createdAt: Date;
  updatedAt: Date;
}

export function generateBlogSchemas(post: BlogPostData, locale: string, baseUrl: string = getBaseUrl(), sampleImageUrls?: string[]) {
  const schemas: any[] = [];

  // Localized breadcrumb labels for blog schema
  const blogHomeLabel: Record<string, string> = {
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

  const blogLabel: Record<string, string> = {
    en: "Blog",
    de: "Blog",
    fr: "Blog",
    es: "Blog",
    pt: "Blog",
    it: "Blog",
    nl: "Blog",
    sv: "Blogg",
    da: "Blog",
    no: "Blogg",
    fi: "Blogi"
  };

  const postUrl = `${baseUrl}/${locale}/blog/${post.slug}`;
  // SEO FIX: Use full post.title for headline (not truncated metaTitle)
  // Google recommends headline matches actual article title for rich snippets
  const headline = post.title;
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || '';
  const image = post.featuredImage ? `${baseUrl}${post.featuredImage}` : `${baseUrl}/default-blog-image.svg`;

  // 1. Article Schema (Primary)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    "url": postUrl,
    "headline": headline,
    "description": description,
    "image": {
      "@id": `${postUrl}#primaryimage`
    },
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
    "publisher": { "@id": `${baseUrl}/#organization` },
    "datePublished": post.createdAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "isPartOf": {
      "@type": "Blog",
      "@id": `${baseUrl}/${locale}/blog#blog`,
      "name": `LessonCraftStudio ${blogLabel[locale] || 'Blog'}`,
      "url": `${baseUrl}/${locale}/blog`,
      "inLanguage": getHreflangCode(locale)
    },
    ...(post.focusKeyword ? {
      "keywords": post.focusKeyword
    } : {}),
    "articleSection": post.category || 'Education',
    "inLanguage": getHreflangCode(locale),
    "about": {
      "@type": "Thing",
      "name": post.category || 'Educational Resources'
    }
  };

  schemas.push(articleSchema);

  // 2. Breadcrumb Schema (localized labels, 4-level matching visible breadcrumb)
  const breadcrumbItems: any[] = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": blogHomeLabel[locale] || "Home",
      "item": `${baseUrl}/${locale}`
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": blogLabel[locale] || "Blog",
      "item": `${baseUrl}/${locale}/blog`
    }
  ];

  if (post.category) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": post.categoryDisplayName || post.category,
      "item": `${baseUrl}/${locale}/blog/category/${post.category}`
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",
    "position": post.category ? 4 : 3,
    "name": post.title
    // No "item" property for current page (Google spec)
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${postUrl}#breadcrumb`,
    "itemListElement": breadcrumbItems
  };

  schemas.push(breadcrumbSchema);

  // 3. Educational Content Schema (LearningResource)
  // This is CRITICAL for educational websites
  const educationalSchema: any = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": title,
    "description": description,
    "educationalUse": "assignment",
    "educationalLevel": "Elementary School",
    "learningResourceType": "Educational Article",
    "inLanguage": getHreflangCode(locale),
    "isAccessibleForFree": true,
    "provider": { "@id": `${baseUrl}/#organization` },
    "teaches": post.focusKeyword || post.category || 'Educational content',
    "typicalAgeRange": "6-12",
    "url": postUrl,
    "dateCreated": post.createdAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    ...(sampleImageUrls && sampleImageUrls.length > 0 && {
      "image": sampleImageUrls.map(url => `${baseUrl}${url}`)
    })
  };

  schemas.push(educationalSchema);

  // 4. ImageObject Schema (if featured image exists)
  if (post.featuredImage) {
    const imageSchema = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "@id": `${postUrl}#primaryimage`,
      "url": image,
      "contentUrl": image,
      "name": post.title,
      "caption": title,
      "description": description,
      "width": 1200,
      "height": 630,
      "encodingFormat": post.featuredImage.endsWith('.webp') ? 'image/webp' : post.featuredImage.endsWith('.svg') ? 'image/svg+xml' : 'image/png',
      "inLanguage": getHreflangCode(locale),
      "license": `${baseUrl}/${locale}/terms`,
      "acquireLicensePage": `${baseUrl}/${locale}/pricing`,
      "creditText": "LessonCraftStudio",
      "copyrightNotice": "\u00a9 2024-2026 LessonCraftStudio",
      "creator": { "@id": `${baseUrl}/#organization` }
    };

    schemas.push(imageSchema);
  }

  // 5. Organization Schema (for E-A-T signals)
  // Localized organization descriptions
  // Use the same descriptions as the homepage Organization for consistent @id
  const localizedOrgDescriptions: Record<string, string> = {
    en: "Professional worksheet generators for teachers and educators. Create customized educational materials in seconds.",
    de: "Professionelle Arbeitsblatt-Generatoren f\u00fcr Lehrer und P\u00e4dagogen. Erstellen Sie individuelle Unterrichtsmaterialien in Sekunden.",
    fr: "G\u00e9n\u00e9rateurs de fiches professionnels pour enseignants et \u00e9ducateurs. Cr\u00e9ez des mat\u00e9riaux p\u00e9dagogiques personnalis\u00e9s en quelques secondes.",
    es: "Generadores de fichas profesionales para maestros y educadores. Cree materiales educativos personalizados en segundos.",
    pt: "Geradores de planilhas profissionais para professores e educadores. Crie materiais educativos personalizados em segundos.",
    it: "Generatori di schede professionali per insegnanti ed educatori. Crea materiali didattici personalizzati in pochi secondi.",
    nl: "Professionele werkblad-generatoren voor leraren en docenten. Maak op maat gemaakte lesmateriaal in seconden.",
    sv: "Professionella arbetsblads-generatorer f\u00f6r l\u00e4rare och pedagoger. Skapa anpassade utbildningsmaterial p\u00e5 n\u00e5gra sekunder.",
    da: "Professionelle arbejdsark-generatorer til l\u00e6rere og p\u00e6dagoger. Opret tilpassede undervisningsmaterialer p\u00e5 f\u00e5 sekunder.",
    no: "Profesjonelle arbeidsark-generatorer for l\u00e6rere og pedagoger. Lag tilpassede undervisningsmateriell p\u00e5 sekunder.",
    fi: "Ammattimaiset ty\u00f6arkki-generaattorit opettajille ja kasvattajille. Luo mukautettuja opetusmateriaaleja sekunneissa."
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${baseUrl}/#organization`,
    "name": "LessonCraftStudio",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo-lcs.png`,
      "width": 600,
      "height": 600
    },
    "description": localizedOrgDescriptions[locale] || localizedOrgDescriptions.en,
    "areaServed": "Worldwide",
    "availableLanguage": ["English", "German", "French", "Spanish", "Portuguese", "Italian", "Dutch", "Swedish", "Danish", "Norwegian", "Finnish"],
    "sameAs": [
      "https://www.pinterest.com/lessoncraftstudio"
    ]
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
    "inLanguage": getHreflangCode(locale)
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
    "inLanguage": getHreflangCode(locale)
  };
}

/**
 * Generate Homepage Schemas
 * Includes: Organization, WebSite, and SoftwareApplication schemas
 */
export function generateHomepageSchemas(locale: string, baseUrl: string = getBaseUrl(), pageMeta?: { name: string; description: string }) {
  const schemas: any[] = [];

  // Localized homepage descriptions
  const homepageOrgDescriptions: Record<string, string> = {
    en: "Professional worksheet generators for teachers and educators. Create customized educational materials in seconds.",
    de: "Professionelle Arbeitsblatt-Generatoren f\u00fcr Lehrer und P\u00e4dagogen. Erstellen Sie individuelle Unterrichtsmaterialien in Sekunden.",
    fr: "G\u00e9n\u00e9rateurs de fiches professionnels pour enseignants et \u00e9ducateurs. Cr\u00e9ez des mat\u00e9riaux p\u00e9dagogiques personnalis\u00e9s en quelques secondes.",
    es: "Generadores de fichas profesionales para maestros y educadores. Cree materiales educativos personalizados en segundos.",
    pt: "Geradores de planilhas profissionais para professores e educadores. Crie materiais educativos personalizados em segundos.",
    it: "Generatori di schede professionali per insegnanti ed educatori. Crea materiali didattici personalizzati in pochi secondi.",
    nl: "Professionele werkblad-generatoren voor leraren en docenten. Maak op maat gemaakte lesmateriaal in seconden.",
    sv: "Professionella arbetsblads-generatorer f\u00f6r l\u00e4rare och pedagoger. Skapa anpassade utbildningsmaterial p\u00e5 n\u00e5gra sekunder.",
    da: "Professionelle arbejdsark-generatorer til l\u00e6rere og p\u00e6dagoger. Opret tilpassede undervisningsmaterialer p\u00e5 f\u00e5 sekunder.",
    no: "Profesjonelle arbeidsark-generatorer for l\u00e6rere og pedagoger. Lag tilpassede undervisningsmateriell p\u00e5 sekunder.",
    fi: "Ammattimaiset ty\u00f6arkki-generaattorit opettajille ja kasvattajille. Luo mukautettuja opetusmateriaaleja sekunneissa."
  };

  const homepageWebsiteDescriptions: Record<string, string> = {
    en: "Free worksheet generators for teachers and parents",
    de: "Kostenlose Arbeitsblatt-Generatoren f\u00fcr Lehrer und Eltern",
    fr: "G\u00e9n\u00e9rateurs de fiches gratuits pour enseignants et parents",
    es: "Generadores de fichas gratuitos para maestros y padres",
    pt: "Geradores de planilhas gratuitos para professores e pais",
    it: "Generatori di schede gratuiti per insegnanti e genitori",
    nl: "Gratis werkblad-generatoren voor leraren en ouders",
    sv: "Gratis arbetsblads-generatorer f\u00f6r l\u00e4rare och f\u00f6r\u00e4ldrar",
    da: "Gratis arbejdsark-generatorer til l\u00e6rere og for\u00e6ldre",
    no: "Gratis arbeidsark-generatorer for l\u00e6rere og foreldre",
    fi: "Ilmaiset ty\u00f6arkki-generaattorit opettajille ja vanhemmille"
  };

  const homepageSoftwareDescriptions: Record<string, string> = {
    en: "33 professional worksheet generators with 100+ themed images for creating educational materials",
    de: "33 professionelle Arbeitsblatt-Generatoren mit 100+ thematischen Bildern zur Erstellung von Unterrichtsmaterialien",
    fr: "33 g\u00e9n\u00e9rateurs de fiches professionnels avec plus de 100 images th\u00e9matiques pour cr\u00e9er des mat\u00e9riaux p\u00e9dagogiques",
    es: "33 generadores de fichas profesionales con m\u00e1s de 100 im\u00e1genes tem\u00e1ticas para crear materiales educativos",
    pt: "33 geradores de planilhas profissionais com mais de 100 imagens tem\u00e1ticas para criar materiais educativos",
    it: "33 generatori di schede professionali con oltre 100 immagini tematiche per creare materiali didattici",
    nl: "33 professionele werkblad-generatoren met 100+ thematische afbeeldingen voor het maken van lesmateriaal",
    sv: "33 professionella arbetsblads-generatorer med 100+ tematiska bilder f\u00f6r att skapa utbildningsmaterial",
    da: "33 professionelle arbejdsark-generatorer med 100+ tematiske billeder til at oprette undervisningsmaterialer",
    no: "33 profesjonelle arbeidsark-generatorer med 100+ tematiske bilder for \u00e5 lage undervisningsmateriell",
    fi: "33 ammattimaista ty\u00f6arkki-generaattoria yli 100 temaattisella kuvalla opetusmateriaalien luomiseen"
  };

  const homepageFeatureLists: Record<string, string[]> = {
    en: ["Word Search Generator", "Crossword Puzzle Generator", "Math Worksheet Generator", "Pattern Recognition Activities", "Matching Games", "And 28 more generators"],
    de: ["Wortsuchr\u00e4tsel-Generator", "Kreuzwortr\u00e4tsel-Generator", "Mathe-Arbeitsblatt-Generator", "Mustererkennungs-Aktivit\u00e4ten", "Zuordnungsspiele", "Und 28 weitere Generatoren"],
    fr: ["G\u00e9n\u00e9rateur de mots cach\u00e9s", "G\u00e9n\u00e9rateur de mots crois\u00e9s", "G\u00e9n\u00e9rateur de fiches maths", "Activit\u00e9s de reconnaissance de motifs", "Jeux d'association", "Et 28 autres g\u00e9n\u00e9rateurs"],
    es: ["Generador de sopa de letras", "Generador de crucigramas", "Generador de fichas de matem\u00e1ticas", "Actividades de reconocimiento de patrones", "Juegos de emparejar", "Y 28 generadores m\u00e1s"],
    pt: ["Gerador de ca\u00e7a-palavras", "Gerador de palavras cruzadas", "Gerador de fichas de matem\u00e1tica", "Atividades de reconhecimento de padr\u00f5es", "Jogos de combinar", "E mais 28 geradores"],
    it: ["Generatore di ricerca parole", "Generatore di cruciverba", "Generatore di schede matematica", "Attivit\u00e0 di riconoscimento pattern", "Giochi di abbinamento", "E altri 28 generatori"],
    nl: ["Woordzoeker-generator", "Kruiswoordpuzzel-generator", "Reken-werkblad-generator", "Patroonherkenning-activiteiten", "Memory-spellen", "En 28 meer generatoren"],
    sv: ["Ordjakts-generator", "Korsords-generator", "Matte-arbetsblads-generator", "M\u00f6nsterig\u00e4nk\u00e4nning", "Matchningsspel", "Och 28 fler generatorer"],
    da: ["Ordjakts-generator", "Krydsords-generator", "Matematik-arbejdsark-generator", "M\u00f8nstergenkendelses-aktiviteter", "Matchningsspil", "Og 28 flere generatorer"],
    no: ["Ordjakts-generator", "Kryssords-generator", "Matte-arbeidsark-generator", "M\u00f8nstergjenkjennings-aktiviteter", "Koblingsspill", "Og 28 flere generatorer"],
    fi: ["Sanaristikko-generaattori", "Ristisanateht\u00e4v\u00e4-generaattori", "Matematiikka-ty\u00f6arkki-generaattori", "Hahmontunnistus-aktiviteetit", "Yhdist\u00e4mispelit", "Ja 28 lis\u00e4\u00e4 generaattoria"]
  };

  // 1. Organization Schema (E-A-T signals)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${baseUrl}/#organization`,
    "name": "LessonCraftStudio",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo-lcs.png`,
      "width": 600,
      "height": 600
    },
    "description": homepageOrgDescriptions[locale] || homepageOrgDescriptions.en,
    "areaServed": "Worldwide",
    "availableLanguage": ["English", "German", "French", "Spanish", "Portuguese", "Italian", "Dutch", "Swedish", "Danish", "Norwegian", "Finnish"],
    "sameAs": [
      "https://www.pinterest.com/lessoncraftstudio"
    ]
  };
  schemas.push(organizationSchema);

  // 2. WebSite Schema (enables sitelinks search box in SERPs)
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "name": "LessonCraftStudio",
    "url": baseUrl,
    "description": homepageWebsiteDescriptions[locale] || homepageWebsiteDescriptions.en,
    "publisher": { "@id": `${baseUrl}/#organization` },
    "inLanguage": getHreflangCode(locale),
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
    "url": `${baseUrl}/${locale}`,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": homepageSoftwareDescriptions[locale] || homepageSoftwareDescriptions.en,
    "featureList": homepageFeatureLists[locale] || homepageFeatureLists.en,
    "screenshot": `${baseUrl}/opengraph-image.png`,
    "provider": { "@id": `${baseUrl}/#organization` }
  };
  schemas.push(softwareSchema);

  // 4. WebPage Schema (for the homepage itself)
  if (pageMeta) {
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/#webpage`,
      "url": `${baseUrl}/${locale}`,
      "name": pageMeta.name,
      "description": pageMeta.description,
      "isPartOf": { "@id": `${baseUrl}/#website` },
      "about": { "@id": `${baseUrl}/#organization` },
      "publisher": { "@id": `${baseUrl}/#organization` },
      "inLanguage": getHreflangCode(locale)
    };
    schemas.push(webPageSchema);
  }

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
    "inLanguage": getHreflangCode(locale),
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
export const localizedAppsLabel: Record<string, string> = {
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
 * Note: es uses es_ES (standard Spanish) to serve all Spanish-speaking markets
 */
export const ogLocaleMap: Record<string, string> = {
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
  es: 'es_ES',  // Standard Spanish — serves Spain, Mexico, Latin America, all markets
  pt: 'pt_BR',
  it: 'it_IT',
  nl: 'nl_NL',
  sv: 'sv_SE',
  da: 'da_DK',
  no: 'no_NO',  // Standardized from nb_NO to match hreflang code
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
  locale: string,
  pageUrl?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl && { "@id": `${pageUrl}#faq` }),
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
  totalTime: string = 'PT3M',
  pageUrl?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    ...(pageUrl && { "@id": `${pageUrl}#howto` }),
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
    "inLanguage": getHreflangCode(locale)
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
  grade?: string;          // Grade level for educational alignment
  appType?: string;        // Type of worksheet app (math, language, etc.)
  imageId?: string;        // Custom @id for cross-referencing (blog posts use #imageobject)
}

/**
 * Generate ImageObject Schema for sample images
 * Critical for Google Image Search visibility
 * Enhanced with educational schema.org properties for better SERP positioning
 */
export function generateImageObjectSchema(
  image: SampleImageData,
  pageUrl: string,
  baseUrl: string = getBaseUrl(),
  locale: string = 'en',
  index: number = 0,
  isRepresentative: boolean = false
) {
  // Encode URL properly for spaces
  const encodedSrc = image.src.replace(/ /g, '%20');
  const encodedThumb = image.thumbnailSrc?.replace(/ /g, '%20');

  // Map grade string to educational level for schema
  const gradeToEducationalLevel: Record<string, string> = {
    'Pre-K': 'Preschool',
    'Kindergarten': 'Kindergarten',
    '1st Grade': 'Grade 1',
    '2nd Grade': 'Grade 2',
    '3rd Grade': 'Grade 3',
    '4th Grade': 'Grade 4',
    '5th Grade': 'Grade 5',
    '6th Grade': 'Grade 6',
    '7th Grade': 'Grade 7',
    '8th Grade': 'Grade 8',
    'All Ages': 'Elementary School',
  };

  const educationalLevel = image.grade ? gradeToEducationalLevel[image.grade] || 'Elementary School' : 'Elementary School';

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${pageUrl}#image-${index}`,
    "inLanguage": getHreflangCode(locale),
    ...(isRepresentative && { "representativeOfPage": true }),
    "contentUrl": `${baseUrl}${encodedSrc}`,
    "url": pageUrl,
    "name": image.name,
    "description": image.description,
    "caption": image.caption,
    "width": image.width || 2480,
    "height": image.height || 3508,
    "encodingFormat": image.src.endsWith('.webp') ? 'image/webp' : 'image/jpeg',
    ...(encodedThumb && { "thumbnailUrl": `${baseUrl}${encodedThumb}` }),
    // SEO FIX: Use locale-prefixed URLs to avoid redirects in schema
    "license": `${baseUrl}/${locale}/terms`,
    "acquireLicensePage": `${baseUrl}/${locale}/pricing`,
    "creditText": "LessonCraftStudio",
    "copyrightNotice": "© 2024-2026 LessonCraftStudio",
    "creator": { "@id": `${baseUrl}#organization` },
    "associatedArticle": { "@type": "WebPage", "url": pageUrl },
    // Educational schema.org properties for better search visibility
    "educationalUse": ["assignment", "homework", "practice", "classwork"],
    "learningResourceType": "Worksheet",
    "isAccessibleForFree": true,
    "educationalAlignment": {
      "@type": "AlignmentObject",
      "alignmentType": "educationalLevel",
      "educationalFramework": "US Grade Levels",
      "targetName": educationalLevel
    },
    "accessibilityFeature": [
      "highContrastDisplay",
      "readingOrder",
      "structuralNavigation",
      "printPageNumbers"
    ],
    "accessMode": ["textual", "visual"],
    "accessModeSufficient": [
      { "@type": "ItemList", "itemListElement": ["textual", "visual"] }
    ],
    "typicalAgeRange": "5-12",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": ["teacher", "parent", "student"]
    }
  };
}

/**
 * Generate ImageGallery Schema for sample image collections
 * Helps Google understand the gallery structure and index all images
 * Enhanced with educational properties for worksheet sample galleries
 */
export function generateImageGallerySchema(
  images: SampleImageData[],
  galleryName: string,
  pageUrl: string,
  locale: string,
  baseUrl: string = getBaseUrl()
) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${pageUrl}#gallery`,
    "name": galleryName,
    "url": pageUrl,
    "numberOfItems": images.length,
    "inLanguage": getHreflangCode(locale),
    "image": images.map((img, i) => ({
      "@type": "ImageObject",
      "@id": img.imageId || `${pageUrl}#image-${i}`,
      "contentUrl": `${baseUrl}${img.src.replace(/ /g, '%20')}`,
      "name": img.name,
      "description": img.description,
      "caption": img.caption,
      "width": img.width || 2480,
      "height": img.height || 3508,
      "learningResourceType": "Worksheet",
      "isAccessibleForFree": true,
      "license": `${baseUrl}/${locale}/terms`,
      "acquireLicensePage": `${baseUrl}/${locale}/pricing`,
      "creditText": "LessonCraftStudio",
      "copyrightNotice": "\u00a9 2024-2026 LessonCraftStudio"
    })),
    "creator": { "@id": `${baseUrl}#organization` },
    // Educational properties for the gallery
    "about": {
      "@type": "LearningResource",
      "name": galleryName,
      "learningResourceType": "Worksheet",
      "educationalUse": ["assignment", "homework", "practice"],
      "isAccessibleForFree": true
    },
    // SEO FIX: Use locale-prefixed URL to avoid redirects
    "license": `${baseUrl}/${locale}/terms`,
    "isAccessibleForFree": true
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
  baseUrl: string = getBaseUrl(),
  galleryName?: string,
  screenshotUrl?: string
): object[] {
  const schemas: object[] = [];

  // 1. Core schemas (SoftwareApplication, BreadcrumbList, WebPage)
  schemas.push(...generateAppProductSchemas(appData, locale, pageUrl, baseUrl, screenshotUrl));

  // 2. FAQPage schema (if FAQ content provided)
  if (faqs && faqs.length > 0) {
    schemas.push(generateProductPageFAQSchema(faqs, locale, pageUrl));
  }

  // 3. HowTo schema (if how-to steps provided)
  if (howTo && howTo.steps.length > 0) {
    schemas.push(generateProductPageHowToSchema(
      howTo.title,
      howTo.description,
      howTo.steps,
      locale,
      'PT3M',
      pageUrl
    ));
  }

  // 4. ImageObject schemas for all sample images
  if (sampleImages && sampleImages.length > 0) {
    for (let i = 0; i < sampleImages.length; i++) {
      schemas.push(generateImageObjectSchema(sampleImages[i], pageUrl, baseUrl, locale, i, i === 0));
    }
  }

  // 5. ImageGallery schema (if gallery name provided)
  if (galleryName && sampleImages && sampleImages.length > 0) {
    schemas.push(generateImageGallerySchema(sampleImages, galleryName, pageUrl, locale, baseUrl));
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
  baseUrl: string = getBaseUrl(),
  screenshotUrl?: string
): object[] {
  const schemas: object[] = [];

  // 1. SoftwareApplication Schema (primary - for rich results)
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#software`,
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
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/${locale}/pricing`,
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
          "description": localizedSchemaCoreDesc[locale] || localizedSchemaCoreDesc.en,
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/${locale}/pricing`
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
          "description": localizedSchemaFullDesc[locale] || localizedSchemaFullDesc.en,
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/${locale}/pricing`
        }
      ]
    },
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "inLanguage": getHreflangCode(locale),
    "isAccessibleForFree": true,
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "Teacher",
      "audienceType": "Educators"
    },
    "screenshot": screenshotUrl || `${baseUrl}/opengraph-image.png`
  };

  schemas.push(softwareAppSchema);

  // 2. BreadcrumbList Schema (for navigation context)
  // SEO FIX: Per Google spec, the last breadcrumb item should NOT have "item" property
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
        "name": localizedAppsLabel[locale] || "Apps",
        "item": `${baseUrl}/${locale}/apps`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": appData.name
        // No "item" property for current page (Google spec)
      }
    ]
  };

  schemas.push(breadcrumbSchema);

  // 3. WebPage Schema (for page context) - ENHANCED WITH E-A-T SIGNALS
  // E-A-T (Expertise, Authoritativeness, Trustworthiness) signals are critical
  // for educational content ranking
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": appData.name,
    "description": appData.description,
    "url": pageUrl,
    "inLanguage": getHreflangCode(locale),
    // E-A-T: Publication dates signal content freshness
    "datePublished": "2024-06-01",
    "dateModified": new Date().toISOString().split('T')[0],
    // E-A-T: Author/publisher signals expertise and authority (use @id to avoid duplication)
    "author": { "@id": `${baseUrl}#organization` },
    "publisher": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      "name": "LessonCraftStudio",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo-lcs.png`
      }
    },
    "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
    "isPartOf": {
      "@type": "WebSite",
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "about": {
      "@id": `${pageUrl}#software`
    },
    // E-A-T: Educational audience signals domain expertise
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": ["teacher", "parent", "educator"]
    },
    "mainEntity": {
      "@id": `${pageUrl}#software`
    }
  };

  schemas.push(webPageSchema);

  return schemas;
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
