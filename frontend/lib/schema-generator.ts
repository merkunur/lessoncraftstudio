/**
 * SEO Schema Markup Generator
 * Generates JSON-LD structured data for pages
 * Supports: FAQ, Homepage, Apps Collection, About, and Static Page schemas
 */

const authorSchemaDescriptions: Record<string, string> = {
  en: "Experienced educators and curriculum specialists creating research-backed, printable worksheet resources for pre-K through 3rd grade classrooms in 11 languages",
  de: "Erfahrene Lehrkräfte und Lehrplanspezialisten, die forschungsbasierte, druckbare Arbeitsblatt-Ressourcen für Vorschul- bis 3. Klasse in 11 Sprachen erstellen",
  fr: "Pédagogues expérimentés et spécialistes des programmes créant des ressources pédagogiques imprimables fondées sur la recherche, de la maternelle au CE2, en 11 langues",
  es: "Educadores experimentados y especialistas en currículo que crean recursos educativos imprimibles basados en investigación para aulas de preescolar a 3er grado en 11 idiomas",
  pt: "Educadores experientes e especialistas em currículo criando recursos educacionais imprimíveis baseados em pesquisa para salas de aula da pré-escola ao 3º ano em 11 idiomas",
  it: "Educatori esperti e specialisti di curriculum che creano risorse didattiche stampabili basate sulla ricerca per le classi dalla scuola materna alla terza elementare in 11 lingue",
  nl: "Ervaren docenten en curriculumspecialisten die op onderzoek gebaseerde, afdrukbare werkbladen maken voor kleuterschool tot groep 5 in 11 talen",
  sv: "Erfarna pedagoger och läroplansspecialister som skapar forskningsbaserade, utskrivbara arbetsblad för förskola till årskurs 3 på 11 språk",
  da: "Erfarne undervisere og læreplanspecialister der skaber forskningsbaserede, printbare arbejdsark til børnehave til 3. klasse på 11 sprog",
  no: "Erfarne pedagoger og læreplanseksperter som lager forskningsbaserte, utskrivbare arbeidsark for barnehage til 3. klasse på 11 språk",
  fi: "Kokeneet opettajat ja opetussuunnitelma-asiantuntijat luovat tutkimukseen perustuvia, tulostettavia tehtäväresursseja esikoulusta 3. luokkaan 11 kielellä"
};

const authorKnowsAbout: Record<string, string[]> = {
  en: ["Education", "Worksheets", "Teaching Resources", "Early Childhood Education", "Elementary Education", "Curriculum Development"],
  de: ["Bildung", "Arbeitsblätter", "Unterrichtsmaterialien", "Frühkindliche Bildung", "Grundschulbildung", "Lehrplanentwicklung"],
  fr: ["Éducation", "Fiches pédagogiques", "Ressources pédagogiques", "Éducation de la petite enfance", "Enseignement primaire", "Développement de programmes"],
  es: ["Educación", "Fichas de trabajo", "Recursos educativos", "Educación infantil", "Educación primaria", "Desarrollo curricular"],
  pt: ["Educação", "Planilhas", "Recursos educacionais", "Educação infantil", "Ensino fundamental", "Desenvolvimento curricular"],
  it: ["Istruzione", "Schede didattiche", "Risorse didattiche", "Educazione della prima infanzia", "Istruzione elementare", "Sviluppo del curriculum"],
  nl: ["Onderwijs", "Werkbladen", "Lesmateriaal", "Vroegschoolse educatie", "Basisonderwijs", "Curriculumontwikkeling"],
  sv: ["Utbildning", "Arbetsblad", "Undervisningsresurser", "Förskoleundervisning", "Grundskola", "Läroplansutveckling"],
  da: ["Uddannelse", "Arbejdsark", "Undervisningsressourcer", "Førskolepædagogik", "Grundskole", "Læreplansudvikling"],
  no: ["Utdanning", "Arbeidsark", "Undervisningsressurser", "Førskoleutdanning", "Grunnskole", "Læreplansutvikling"],
  fi: ["Koulutus", "Työarkit", "Opetusresurssit", "Varhaiskasvatuksen koulutus", "Peruskoulu", "Opetussuunnitelman kehittäminen"]
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
    de: "Professionelle Arbeitsblatt-Generatoren für Lehrer und Pädagogen. Erstellen Sie individuelle Unterrichtsmaterialien in Sekunden.",
    fr: "Générateurs de fiches professionnels pour enseignants et éducateurs. Créez des matériaux pédagogiques personnalisés en quelques secondes.",
    es: "Generadores de fichas profesionales para maestros y educadores. Cree materiales educativos personalizados en segundos.",
    pt: "Geradores de planilhas profissionais para professores e educadores. Crie materiais educativos personalizados em segundos.",
    it: "Generatori di schede professionali per insegnanti ed educatori. Crea materiali didattici personalizzati in pochi secondi.",
    nl: "Professionele werkblad-generatoren voor leraren en docenten. Maak op maat gemaakte lesmateriaal in seconden.",
    sv: "Professionella arbetsblads-generatorer för lärare och pedagoger. Skapa anpassade utbildningsmaterial på några sekunder.",
    da: "Professionelle arbejdsark-generatorer til lærere og pædagoger. Opret tilpassede undervisningsmaterialer på få sekunder.",
    no: "Profesjonelle arbeidsark-generatorer for lærere og pedagoger. Lag tilpassede undervisningsmateriell på sekunder.",
    fi: "Ammattimaiset työarkki-generaattorit opettajille ja kasvattajille. Luo mukautettuja opetusmateriaaleja sekunneissa."
  };

  const homepageWebsiteDescriptions: Record<string, string> = {
    en: "Free worksheet generators for teachers and parents",
    de: "Kostenlose Arbeitsblatt-Generatoren für Lehrer und Eltern",
    fr: "Générateurs de fiches gratuits pour enseignants et parents",
    es: "Generadores de fichas gratuitos para maestros y padres",
    pt: "Geradores de planilhas gratuitos para professores e pais",
    it: "Generatori di schede gratuiti per insegnanti e genitori",
    nl: "Gratis werkblad-generatoren voor leraren en ouders",
    sv: "Gratis arbetsblads-generatorer för lärare och föräldrar",
    da: "Gratis arbejdsark-generatorer til lærere og forældre",
    no: "Gratis arbeidsark-generatorer for lærere og foreldre",
    fi: "Ilmaiset työarkki-generaattorit opettajille ja vanhemmille"
  };

  const homepageSoftwareDescriptions: Record<string, string> = {
    en: "33 professional worksheet generators with 100+ themed images for creating educational materials",
    de: "33 professionelle Arbeitsblatt-Generatoren mit 100+ thematischen Bildern zur Erstellung von Unterrichtsmaterialien",
    fr: "33 générateurs de fiches professionnels avec plus de 100 images thématiques pour créer des matériaux pédagogiques",
    es: "33 generadores de fichas profesionales con más de 100 imágenes temáticas para crear materiales educativos",
    pt: "33 geradores de planilhas profissionais com mais de 100 imagens temáticas para criar materiais educativos",
    it: "33 generatori di schede professionali con oltre 100 immagini tematiche per creare materiali didattici",
    nl: "33 professionele werkblad-generatoren met 100+ thematische afbeeldingen voor het maken van lesmateriaal",
    sv: "33 professionella arbetsblads-generatorer med 100+ tematiska bilder för att skapa utbildningsmaterial",
    da: "33 professionelle arbejdsark-generatorer med 100+ tematiske billeder til at oprette undervisningsmaterialer",
    no: "33 profesjonelle arbeidsark-generatorer med 100+ tematiske bilder for å lage undervisningsmateriell",
    fi: "33 ammattimaista työarkki-generaattoria yli 100 temaattisella kuvalla opetusmateriaalien luomiseen"
  };

  const homepageFeatureLists: Record<string, string[]> = {
    en: ["Word Search Generator", "Crossword Puzzle Generator", "Math Worksheet Generator", "Pattern Recognition Activities", "Matching Games", "And 28 more generators"],
    de: ["Wortsuchrätsel-Generator", "Kreuzworträtsel-Generator", "Mathe-Arbeitsblatt-Generator", "Mustererkennungs-Aktivitäten", "Zuordnungsspiele", "Und 28 weitere Generatoren"],
    fr: ["Générateur de mots cachés", "Générateur de mots croisés", "Générateur de fiches maths", "Activités de reconnaissance de motifs", "Jeux d'association", "Et 28 autres générateurs"],
    es: ["Generador de sopa de letras", "Generador de crucigramas", "Generador de fichas de matemáticas", "Actividades de reconocimiento de patrones", "Juegos de emparejar", "Y 28 generadores más"],
    pt: ["Gerador de caça-palavras", "Gerador de palavras cruzadas", "Gerador de fichas de matemática", "Atividades de reconhecimento de padrões", "Jogos de combinar", "E mais 28 geradores"],
    it: ["Generatore di ricerca parole", "Generatore di cruciverba", "Generatore di schede matematica", "Attività di riconoscimento pattern", "Giochi di abbinamento", "E altri 28 generatori"],
    nl: ["Woordzoeker-generator", "Kruiswoordpuzzel-generator", "Reken-werkblad-generator", "Patroonherkenning-activiteiten", "Memory-spellen", "En 28 meer generatoren"],
    sv: ["Ordjakts-generator", "Korsords-generator", "Matte-arbetsblads-generator", "Mönsterigänkänning", "Matchningsspel", "Och 28 fler generatorer"],
    da: ["Ordjakts-generator", "Krydsords-generator", "Matematik-arbejdsark-generator", "Mønstergenkendelses-aktiviteter", "Matchningsspil", "Og 28 flere generatorer"],
    no: ["Ordjakts-generator", "Kryssords-generator", "Matte-arbeidsark-generator", "Mønstergjenkjennings-aktiviteter", "Koblingsspill", "Og 28 flere generatorer"],
    fi: ["Sanaristikko-generaattori", "Ristisanatehtävä-generaattori", "Matematiikka-työarkki-generaattori", "Hahmontunnistus-aktiviteetit", "Yhdistämispelit", "Ja 28 lisää generaattoria"]
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
    "screenshot": [
      `${baseUrl}/samples/english/addition/Addition%20Fun%201.webp`,
      `${baseUrl}/samples/english/wordsearch/Word%20Search%20Fun%201.webp`,
      `${baseUrl}/samples/english/coloring/Coloring%20Fun%201.webp`,
    ],
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
  apps: Array<{ id: string; name: string; slug: string; description?: string; image?: string }>,
  baseUrl: string = getBaseUrl()
) {
  const itemListElements = apps.map((app, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": app.name,
    "url": `${baseUrl}/${locale}/apps/${app.slug}`,
    ...(app.description && { "description": app.description }),
    ...(app.image && { "image": app.image }),
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
 * Generate Tools Collection Page Schema
 */
export function generateToolsCollectionSchema(locale: string, baseUrl: string = getBaseUrl()) {
  const names: Record<string, string> = {
    en: "Free Printable Generators", de: "Kostenlose Druckvorlagen-Generatoren",
    fr: "Générateurs de Fiches Gratuits", es: "Generadores de Fichas Gratuitos",
    pt: "Geradores de Planilhas Gratuitos", it: "Generatori di Schede Stampabili",
    nl: "Gratis Werkblad Generatoren", sv: "Gratis Arbetsblad Generatorer",
    da: "Gratis Arbejdsark Generatorer", no: "Gratis Arbeidsark Generatorer",
    fi: "Ilmaiset Työarkki Generaattorit"
  };
  const descs: Record<string, string> = {
    en: "33 professional printable generators. Create worksheets, puzzles, and activities for education.",
    it: "33 generatori professionali di schede stampabili. Crea schede, puzzle e attività per l'istruzione.",
  };
  return {
    "@context": "https://schema.org", "@type": "CollectionPage",
    "name": names[locale] || names.en,
    "description": descs[locale] || descs.en,
    "url": `${baseUrl}/${locale}/tools`,
    "numberOfItems": 33,
    "inLanguage": getHreflangCode(locale),
    "isPartOf": { "@type": "WebSite", "name": "LessonCraftStudio", "url": baseUrl },
  };
}

export function generateToolsItemListSchema(
  locale: string,
  tools: Array<{ name: string; slug: string; image?: string }>,
  baseUrl: string = getBaseUrl()
) {
  return {
    "@context": "https://schema.org", "@type": "ItemList",
    "numberOfItems": tools.length,
    "itemListElement": tools.map((t, i) => ({
      "@type": "ListItem", "position": i + 1, "name": t.name, "url": `${baseUrl}/${locale}/tools/${t.slug}`,
      ...(t.image && { "image": t.image }),
    })),
  };
}

/**
 * Generate Guides Collection Page Schema
 */
export function generateGuidesCollectionSchema(locale: string, baseUrl: string = getBaseUrl()) {
  const names: Record<string, string> = {
    en: "How-To Guides", de: "Anleitungen", fr: "Guides Pratiques",
    es: "Guías Prácticas", pt: "Guias Práticos", it: "Guide Pratiche",
    nl: "Handleidingen", sv: "Guider", da: "Vejledninger", no: "Guider", fi: "Oppaat"
  };
  return {
    "@context": "https://schema.org", "@type": "CollectionPage",
    "name": names[locale] || names.en,
    "description": "Step-by-step guides for creating and selling printable worksheets on Etsy, KDP, and TPT.",
    "url": `${baseUrl}/${locale}/guides`,
    "numberOfItems": 65,
    "inLanguage": getHreflangCode(locale),
    "isPartOf": { "@type": "WebSite", "name": "LessonCraftStudio", "url": baseUrl },
  };
}

export function generateGuidesItemListSchema(
  locale: string,
  guides: Array<{ name: string; slug: string; image?: string }>,
  baseUrl: string = getBaseUrl()
) {
  return {
    "@context": "https://schema.org", "@type": "ItemList",
    "numberOfItems": guides.length,
    "itemListElement": guides.map((g, i) => ({
      "@type": "ListItem", "position": i + 1, "name": g.name, "url": `${baseUrl}/${locale}/guides/${g.slug}`,
      ...(g.image && { "image": g.image }),
    })),
  };
}

/**
 * Generate Ideas Collection Page Schema
 */
export function generateIdeasCollectionSchema(locale: string, baseUrl: string = getBaseUrl()) {
  const names: Record<string, string> = {
    en: "Printable Business Niche Ideas", de: "Nischen-Ideen für Druckvorlagen",
    fr: "Idées de Niches pour Stampabili", es: "Ideas de Nichos para Imprimibles",
    pt: "Ideias de Nichos para Impressos", it: "Idee di Nicchia per Stampabili",
    nl: "Niche-ideeën voor Printables", sv: "Nischidéer för Utskrifter",
    da: "Nicheidéer til Tryksager", no: "Nisjeidéer for Utskrifter", fi: "Tulostettavien Liiketoimintaideat"
  };
  return {
    "@context": "https://schema.org", "@type": "CollectionPage",
    "name": names[locale] || names.en,
    "description": "45 printable business niche ideas for Etsy, Amazon KDP, and TPT sellers.",
    "url": `${baseUrl}/${locale}/ideas`,
    "numberOfItems": 45,
    "inLanguage": getHreflangCode(locale),
    "isPartOf": { "@type": "WebSite", "name": "LessonCraftStudio", "url": baseUrl },
  };
}

export function generateIdeasItemListSchema(
  locale: string,
  ideas: Array<{ name: string; slug: string; image?: string }>,
  baseUrl: string = getBaseUrl()
) {
  return {
    "@context": "https://schema.org", "@type": "ItemList",
    "numberOfItems": ideas.length,
    "itemListElement": ideas.map((item, i) => ({
      "@type": "ListItem", "position": i + 1, "name": item.name, "url": `${baseUrl}/${locale}/ideas/${item.slug}`,
      ...(item.image && { "image": item.image }),
    })),
  };
}

/**
 * Generate Bundles Collection Page Schema
 */
export function generateBundlesCollectionSchema(locale: string, baseUrl: string = getBaseUrl()) {
  const names: Record<string, string> = {
    en: "Generator Bundles", de: "Generator-Pakete", fr: "Packs de Générateurs",
    es: "Paquetes de Generadores", pt: "Pacotes de Geradores", it: "Pacchetti Generatori",
    nl: "Generator Bundels", sv: "Generator Paket", da: "Generator Pakker",
    no: "Generator Pakker", fi: "Generaattoripakettit"
  };
  return {
    "@context": "https://schema.org", "@type": "CollectionPage",
    "name": names[locale] || names.en,
    "description": "6 category bundles of professional printable worksheet generators.",
    "url": `${baseUrl}/${locale}/bundles`,
    "numberOfItems": 6,
    "inLanguage": getHreflangCode(locale),
    "isPartOf": { "@type": "WebSite", "name": "LessonCraftStudio", "url": baseUrl },
  };
}

export function generateBundlesItemListSchema(
  locale: string,
  bundles: Array<{ name: string; slug: string; image?: string }>,
  baseUrl: string = getBaseUrl()
) {
  return {
    "@context": "https://schema.org", "@type": "ItemList",
    "numberOfItems": bundles.length,
    "itemListElement": bundles.map((b, i) => ({
      "@type": "ListItem", "position": i + 1, "name": b.name, "url": `${baseUrl}/${locale}/bundles/${b.slug}`,
      ...(b.image && { "image": b.image }),
    })),
  };
}

/**
 * Generate Start (Getting Started) Collection Page Schema
 */
export function generateStartCollectionSchema(locale: string, baseUrl: string = getBaseUrl()) {
  const names: Record<string, string> = {
    en: "Printable Business Guides", de: "Leitfäden für Druckvorlagen-Geschäft",
    fr: "Guides Business Imprimables", es: "Guías de Negocio de Imprimibles",
    pt: "Guias de Negócio de Impressos", it: "Guide Business Stampabili",
    nl: "Printables Bedrijfsgidsen", sv: "Guider för Utskriftsföretag",
    da: "Vejledninger til Printvirksomhed", no: "Guider for Utskriftsvirksomhet",
    fi: "Tulostettavien Liiketoimintaoppaat"
  };
  return {
    "@context": "https://schema.org", "@type": "CollectionPage",
    "name": names[locale] || names.en,
    "description": "12 comprehensive guides for starting and growing a printable business.",
    "url": `${baseUrl}/${locale}/start`,
    "numberOfItems": 12,
    "inLanguage": getHreflangCode(locale),
    "isPartOf": { "@type": "WebSite", "name": "LessonCraftStudio", "url": baseUrl },
  };
}

export function generateStartItemListSchema(
  locale: string,
  items: Array<{ name: string; slug: string; image?: string }>,
  baseUrl: string = getBaseUrl()
) {
  return {
    "@context": "https://schema.org", "@type": "ItemList",
    "numberOfItems": items.length,
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem", "position": i + 1, "name": item.name, "url": `${baseUrl}/${locale}/start/${item.slug}`,
      ...(item.image && { "image": item.image }),
    })),
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
    uploadDate: '2026-02-01',
    contentUrl: `https://www.youtube.com/watch?v=${params.youtubeId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${params.youtubeId}`,
  };
}