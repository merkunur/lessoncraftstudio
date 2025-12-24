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
