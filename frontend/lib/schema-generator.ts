/**
 * SEO Schema Markup Generator
 * Automatically generates JSON-LD structured data for blog posts
 * Supports: Article, Breadcrumb, and LearningResource schemas
 */

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

export function generateBlogSchemas(post: BlogPostData, locale: string, baseUrl: string = 'https://lessoncraftstudio.com') {
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
export function generateHomepageSchemas(locale: string, baseUrl: string = 'https://lessoncraftstudio.com') {
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
    "availableLanguage": ["en", "de", "fr", "es", "pt", "it", "nl", "sv", "da", "no", "fi"],
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
export function generateAppsCollectionSchema(locale: string, baseUrl: string = 'https://lessoncraftstudio.com') {
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
 * Generate Schema Markup for Individual App Product Pages
 * Includes: SoftwareApplication and BreadcrumbList schemas
 */
export function generateAppProductSchemas(
  appData: AppProductData,
  locale: string,
  pageUrl: string,
  baseUrl: string = 'https://www.lessoncraftstudio.com'
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

  // 3. WebPage Schema (for page context)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": appData.name,
    "description": appData.description,
    "url": pageUrl,
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "about": {
      "@type": "SoftwareApplication",
      "name": appData.name
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": appData.name
    }
  };

  schemas.push(webPageSchema);

  return schemas;
}
