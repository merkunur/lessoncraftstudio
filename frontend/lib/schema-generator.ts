/**
 * SEO Schema Markup Generator
 * Generates JSON-LD structured data for pages
 * Supports: FAQ, Homepage, Apps Collection, About, and Static Page schemas
 */

const authorSchemaDescriptions: Record<string, string> = {
  en: "Experienced educators and curriculum specialists creating research-backed, printable worksheet resources for pre-K through 3rd grade classrooms in 11 languages",
  de: "Erfahrene Lehrkr\u00e4fte und Lehrplanspezialisten, die forschungsbasierte, druckbare Arbeitsblatt-Ressourcen f\u00fcr Vorschul- bis 3. Klasse in 11 Sprachen erstellen",
  fr: "P\u00e9dagogues exp\u00e9riment\u00e9s et sp\u00e9cialistes des programmes cr\u00e9ant des ressources p\u00e9dagogiques imprimables fond\u00e9es sur la recherche, de la maternelle au CE2, en 11 langues",
  es: "Educadores experimentados y especialistas en curr\u00edculo que crean recursos educativos imprimibles basados en investigaci\u00f3n para aulas de preescolar a 3er grado en 11 idiomas",
  pt: "Educadores experientes e especialistas em curr\u00edculo criando recursos educacionais imprim\u00edveis baseados em pesquisa para salas de aula da pr\u00e9-escola ao 3\u00ba ano em 11 idiomas",
  it: "Educatori esperti e specialisti di curriculum che creano risorse didattiche stampabili basate sulla ricerca per le classi dalla scuola materna alla terza elementare in 11 lingue",
  nl: "Ervaren docenten en curriculumspecialisten die op onderzoek gebaseerde, afdrukbare werkbladen maken voor kleuterschool tot groep 5 in 11 talen",
  sv: "Erfarna pedagoger och l\u00e4roplansspecialister som skapar forskningsbaserade, utskrivbara arbetsblad f\u00f6r f\u00f6rskola till \u00e5rskurs 3 p\u00e5 11 spr\u00e5k",
  da: "Erfarne undervisere og l\u00e6replanspecialister der skaber forskningsbaserede, printbare arbejdsark til b\u00f8rnehave til 3. klasse p\u00e5 11 sprog",
  no: "Erfarne pedagoger og l\u00e6replanseksperter som lager forskningsbaserte, utskrivbare arbeidsark for barnehage til 3. klasse p\u00e5 11 spr\u00e5k",
  fi: "Kokeneet opettajat ja opetussuunnitelma-asiantuntijat luovat tutkimukseen perustuvia, tulostettavia teht\u00e4v\u00e4resursseja esikoulusta 3. luokkaan 11 kielell\u00e4"
};

const authorKnowsAbout: Record<string, string[]> = {
  en: ["Education", "Worksheets", "Teaching Resources", "Early Childhood Education", "Elementary Education", "Curriculum Development"],
  de: ["Bildung", "Arbeitsbl\u00e4tter", "Unterrichtsmaterialien", "Fr\u00fchkindliche Bildung", "Grundschulbildung", "Lehrplanentwicklung"],
  fr: ["\u00c9ducation", "Fiches p\u00e9dagogiques", "Ressources p\u00e9dagogiques", "\u00c9ducation de la petite enfance", "Enseignement primaire", "D\u00e9veloppement de programmes"],
  es: ["Educaci\u00f3n", "Fichas de trabajo", "Recursos educativos", "Educaci\u00f3n infantil", "Educaci\u00f3n primaria", "Desarrollo curricular"],
  pt: ["Educa\u00e7\u00e3o", "Planilhas", "Recursos educacionais", "Educa\u00e7\u00e3o infantil", "Ensino fundamental", "Desenvolvimento curricular"],
  it: ["Istruzione", "Schede didattiche", "Risorse didattiche", "Educazione della prima infanzia", "Istruzione elementare", "Sviluppo del curriculum"],
  nl: ["Onderwijs", "Werkbladen", "Lesmateriaal", "Vroegschoolse educatie", "Basisonderwijs", "Curriculumontwikkeling"],
  sv: ["Utbildning", "Arbetsblad", "Undervisningsresurser", "F\u00f6rskoleundervisning", "Grundskola", "L\u00e4roplansutveckling"],
  da: ["Uddannelse", "Arbejdsark", "Undervisningsressourcer", "F\u00f8rskolep\u00e6dagogik", "Grundskole", "L\u00e6replansudvikling"],
  no: ["Utdanning", "Arbeidsark", "Undervisningsressurser", "F\u00f8rskoleutdanning", "Grunnskole", "L\u00e6replansutvikling"],
  fi: ["Koulutus", "Ty\u00f6arkit", "Opetusresurssit", "Varhaiskasvatuksen koulutus", "Peruskoulu", "Opetussuunnitelman kehitt\u00e4minen"]
};

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
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { "@id": `${pageUrl}#faq`, "url": pageUrl } : { "@id": `${baseUrl}/${locale}/#faq`, "url": `${baseUrl}/${locale}` }),
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
      "@id": `${baseUrl}/#logo`,
      "url": `${baseUrl}/logo-lcs.png`,
      "contentUrl": `${baseUrl}/logo-lcs.png`,
      "width": 600,
      "height": 600
    },
    "description": homepageOrgDescriptions[locale] || homepageOrgDescriptions.en,
    "foundingDate": "2024",
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
    "@id": `${baseUrl}/${locale}/#software`,
    "name": "LessonCraftStudio Worksheet Generators",
    "url": `${baseUrl}/${locale}`,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "inLanguage": getHreflangCode(locale),
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "25",
      "priceCurrency": "USD",
      "offerCount": 3,
      "offers": [
        { "@type": "Offer", "name": "Free", "price": "0", "priceCurrency": "USD" },
        { "@type": "Offer", "name": "Core", "price": "15", "priceCurrency": "USD" },
        { "@type": "Offer", "name": "Full Access", "price": "25", "priceCurrency": "USD" }
      ]
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
      "inLanguage": getHreflangCode(locale),
      "datePublished": "2024-06-01",
      "dateModified": "2026-02-09",
      "mainEntity": { "@id": `${baseUrl}/${locale}/#software` },
      "primaryImageOfPage": { "@id": `${baseUrl}/#logo` },
      "speakable": getSpeakableSpecification()
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
  es: 'es_ES',  // Standard Spanish — serves Spain, Mexico, Latin America, all markets
  pt: 'pt_BR',
  it: 'it_IT',
  nl: 'nl_NL',
  sv: 'sv_SE',
  da: 'da_DK',
  no: 'nb_NO',  // Norwegian Bokm\u00e5l per Facebook's supported locale list
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
 * Generate About Page Schemas
 * ProfilePage + enhanced Organization with ContactPoint for E-E-A-T signals
 */
export function generateAboutPageSchemas(locale: string, baseUrl: string = getBaseUrl()) {
  const schemas: any[] = [];
  const pageUrl = `${baseUrl}/${locale}/about`;

  // Localized "About" breadcrumb labels
  const aboutLabel: Record<string, string> = {
    en: "About Us", de: "Über uns", fr: "À propos", es: "Sobre nosotros",
    pt: "Sobre nós", it: "Chi siamo", nl: "Over ons", sv: "Om oss",
    da: "Om os", no: "Om oss", fi: "Tietoa meistä"
  };

  // 1. ProfilePage Schema (Google's recommended type for about pages)
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profilepage`,
    "url": pageUrl,
    "name": aboutLabel[locale] || aboutLabel.en,
    "description": authorSchemaDescriptions[locale] || authorSchemaDescriptions.en,
    "inLanguage": getHreflangCode(locale),
    "datePublished": "2024-06-01",
    "dateModified": "2026-02-12",
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "mainEntity": {
      "@id": `${baseUrl}/#organization`
    },
    "breadcrumb": {
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
          "name": aboutLabel[locale] || "About Us"
        }
      ]
    },
    "speakable": getSpeakableSpecification()
  };
  schemas.push(profilePageSchema);

  // 2. Enhanced Organization Schema with ContactPoint
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${baseUrl}/#organization`,
    "name": "LessonCraftStudio",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "@id": `${baseUrl}/#logo`,
      "url": `${baseUrl}/logo-lcs.png`,
      "contentUrl": `${baseUrl}/logo-lcs.png`,
      "width": 600,
      "height": 600
    },
    "description": authorSchemaDescriptions[locale] || authorSchemaDescriptions.en,
    "foundingDate": "2024",
    "areaServed": "Worldwide",
    "availableLanguage": ["English", "German", "French", "Spanish", "Portuguese", "Italian", "Dutch", "Swedish", "Danish", "Norwegian", "Finnish"],
    "knowsAbout": authorKnowsAbout[locale] || authorKnowsAbout.en,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "url": `${baseUrl}/${locale}/contact`,
      "availableLanguage": ["English", "German", "French", "Spanish", "Portuguese", "Italian", "Dutch", "Swedish", "Danish", "Norwegian", "Finnish"]
    },
    "sameAs": [
      "https://www.pinterest.com/lessoncraftstudio"
    ]
  };
  schemas.push(orgSchema);

  return schemas;
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