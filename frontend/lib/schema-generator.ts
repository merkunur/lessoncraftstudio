/**
 * SEO Schema Markup Generator
 * Generates JSON-LD structured data for pages
 * Supports: FAQ, Homepage, Apps Collection, About, and Static Page schemas
 */

import { encodeImagePath } from '@/lib/encode-image-path';

const authorSchemaDescriptions: Record<string, string> = {
  en: "Printable product creators building 33 professional worksheet generators for Etsy sellers, Amazon KDP publishers, and online entrepreneurs in 11 languages",
  de: "33 professionelle Arbeitsblatt-Generatoren zum Erstellen und Verkaufen von Druckvorlagen auf Etsy, Amazon KDP und weiteren Marktplätzen in 11 Sprachen",
  fr: "33 générateurs de fiches pédagogiques pour créer des mots mêlés, mots croisés, fiches maths, coloriages et plus. Licence commerciale pour Etsy, KDP et autres plateformes en 11 langues",
  es: "Creadores de productos imprimibles con 33 generadores profesionales para vendedores de Etsy, editores de Amazon KDP y emprendedores en línea en 11 idiomas",
  pt: "Criadores de produtos imprimíveis com 33 geradores profissionais para vendedores Etsy, editores Amazon KDP e empreendedores online em 11 idiomas",
  it: "Creatori di prodotti stampabili con 33 generatori professionali per venditori Etsy, editori Amazon KDP e imprenditori online in 11 lingue",
  nl: "Makers van printbare producten met 33 professionele werkblad-generatoren voor Etsy-verkopers, Amazon KDP-uitgevers en online ondernemers in 11 talen",
  sv: "Skapare av utskrivbara produkter med 33 professionella generatorer för Etsy-säljare, Amazon KDP-utgivare och onlineentreprenörer på 11 språk",
  da: "Skabere af printbare produkter med 33 professionelle generatorer til Etsy-sælgere, Amazon KDP-udgivere og online-iværksættere på 11 sprog",
  no: "Skapere av utskrivbare produkter med 33 profesjonelle generatorer for Etsy-selgere, Amazon KDP-utgivere og nettbaserte gründere på 11 språk",
  fi: "Tulostettavien tuotteiden tekijät, jotka tarjoavat 33 ammattimaista generaattoria Etsy-myyjille, Amazon KDP -julkaisijoille ja verkkoyrittäjille 11 kielellä"
};

const authorKnowsAbout: Record<string, string[]> = {
  en: ["Printable Products", "Worksheet Generators", "Etsy Digital Downloads", "Amazon KDP Publishing", "Commercial Licensing", "Online Printable Business"],
  de: ["Arbeitsblatt Generator", "Suchsel erstellen", "Kreuzworträtsel erstellen", "Mathe Arbeitsblatt Generator", "Druckvorlagen für Etsy", "Amazon KDP Arbeitsblätter"],
  fr: ["Générateur fiches pédagogiques", "Générateur mots mêlés", "Générateur mots croisés", "Fiches maths à imprimer", "Générateur coloriages", "Licence commerciale imprimables"],
  es: ["Productos imprimibles", "Generadores de fichas", "Descargas digitales Etsy", "Publicación Amazon KDP", "Licencia comercial", "Negocio de imprimibles en línea"],
  pt: ["Produtos imprimíveis", "Geradores de planilhas", "Downloads digitais Etsy", "Publicação Amazon KDP", "Licença comercial", "Negócio de impressos online"],
  it: ["Prodotti stampabili", "Generatori di schede", "Download digitali Etsy", "Pubblicazione Amazon KDP", "Licenza commerciale", "Business di stampabili online"],
  nl: ["Printbare producten", "Werkblad-generatoren", "Etsy digitale downloads", "Amazon KDP publicatie", "Commerciële licentie", "Online printables-bedrijf"],
  sv: ["Utskrivbara produkter", "Arbetsblads-generatorer", "Etsy digitala nedladdningar", "Amazon KDP publicering", "Kommersiell licens", "Onlineföretag för utskrifter"],
  da: ["Printbare produkter", "Arbejdsark-generatorer", "Etsy digitale downloads", "Amazon KDP udgivelse", "Kommerciel licens", "Online printvirksomhed"],
  no: ["Utskrivbare produkter", "Arbeidsark-generatorer", "Etsy digitale nedlastinger", "Amazon KDP utgivelse", "Kommersiell lisens", "Nettbasert utskriftsvirksomhet"],
  fi: ["Tulostettavat tuotteet", "Työarkki-generaattorit", "Etsy digitaaliset lataukset", "Amazon KDP julkaisu", "Kaupallinen lisenssi", "Tulostettavien verkkoliiketoiminta"]
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

/** Locale-aware homepage screenshot URLs (verified filenames from content files) */
function getHomepageScreenshots(locale: string, baseUrl: string): string[] {
  const screenshotMap: Record<string, [string, string, string]> = {
    en: [
      '/samples/english/addition/addition-fun-1.webp',
      '/samples/english/wordsearch/word-search-1.webp',
      '/samples/english/coloring/coloring-portrait-1.webp',
    ],
    de: [
      '/samples/german/addition/additionsspa-1.webp',
      '/samples/german/wordsearch/worter-suchen-1.webp',
      '/samples/german/coloring/coloring-portrait-1.webp',
    ],
    fr: [
      '/samples/french/addition/addition-amusant-1.webp',
      '/samples/french/wordsearch/mots-caches-1.webp',
      '/samples/french/coloring/coloring-portrait-1.webp',
    ],
    es: [
      '/samples/spanish/addition/suma-divertida-1.webp',
      '/samples/spanish/wordsearch/sopa-de-letras-1.webp',
      '/samples/spanish/coloring/coloring-portrait-1.webp',
    ],
    pt: [
      '/samples/portuguese/addition/adição-divertida-1.webp',
      '/samples/portuguese/wordsearch/caça-palavras-1.webp',
      '/samples/portuguese/coloring/coloring-landscape-1.webp',
    ],
    it: [
      '/samples/italian/addition/addizione-divertente-1.webp',
      '/samples/italian/wordsearch/cerca-parole-1.webp',
      '/samples/italian/coloring/coloring-landscape-1.webp',
    ],
    nl: [
      '/samples/dutch/addition/optellen-is-leuk-1.webp',
      '/samples/dutch/wordsearch/woordzoeker-1.webp',
      '/samples/dutch/coloring/coloring-portrait-1.webp',
    ],
    sv: [
      '/samples/swedish/addition/addition-övning.webp',
      '/samples/swedish/wordsearch/ordletning-portrait.webp',
      '/samples/swedish/coloring/coloring-portrait-1.webp',
    ],
    da: [
      '/samples/danish/addition/sjov-addition-1.webp',
      '/samples/danish/wordsearch/ordsøgning-1.webp',
      '/samples/danish/coloring/coloring-portrait-1.webp',
    ],
    no: [
      '/samples/norwegian/addition/gøy-addisjon-1.webp',
      '/samples/norwegian/wordsearch/ordleting-1.webp',
      '/samples/norwegian/coloring/coloring-portrait-1.webp',
    ],
    fi: [
      '/samples/english/addition/addition-fun-1.webp',
      '/samples/english/wordsearch/word-search-1.webp',
      '/samples/english/coloring/coloring-portrait-1.webp',
    ],
  };
  const paths = screenshotMap[locale] || screenshotMap.en;
  return paths.map(p => `${baseUrl}${encodeImagePath(p)}`);
}

/**
 * Generate Homepage Schemas
 * Includes: Organization, WebSite, and SoftwareApplication schemas
 */
export function generateHomepageSchemas(locale: string, baseUrl: string = getBaseUrl(), pageMeta?: { name: string; description: string }) {
  const schemas: any[] = [];

  // Localized homepage descriptions
  const homepageOrgDescriptions: Record<string, string> = {
    en: "33 professional printable generators for Etsy sellers, KDP publishers, and printable business entrepreneurs. Create and sell worksheets, puzzles, and activity books.",
    de: "33 Arbeitsblatt-Generatoren zum Erstellen von Suchsel, Kreuzworträtsel, Mathe-Arbeitsblätter, Ausmalbilder und mehr. Kommerzielle Lizenz für Etsy und KDP.",
    fr: "33 générateurs de fiches pédagogiques avec 3 000+ images et 11 langues. Créez des mots mêlés, mots croisés, fiches maths et coloriages prêts à imprimer.",
    es: "33 generadores profesionales de imprimibles para vendedores de Etsy, editores KDP y emprendedores. Cree y venda fichas, rompecabezas y libros de actividades.",
    pt: "33 geradores profissionais de impressos para vendedores Etsy, editores KDP e empreendedores. Crie e venda planilhas, quebra-cabeças e livros de atividades.",
    it: "33 generatori professionali di stampabili per venditori Etsy, editori KDP e imprenditori. Crea e vendi schede, puzzle e libri di attività.",
    nl: "33 professionele printable-generatoren voor Etsy-verkopers, KDP-uitgevers en printable-ondernemers. Maak en verkoop werkbladen, puzzels en activiteitenboeken.",
    sv: "33 professionella generatorer för utskrivbara produkter för Etsy-säljare, KDP-utgivare och entreprenörer. Skapa och sälj arbetsblad, pussel och aktivitetsböcker.",
    da: "33 professionelle printbare generatorer til Etsy-sælgere, KDP-udgivere og iværksættere. Opret og sælg arbejdsark, puslespil og aktivitetsbøger.",
    no: "33 profesjonelle generatorer for utskrivbare produkter for Etsy-selgere, KDP-utgivere og gründere. Lag og selg arbeidsark, puslespill og aktivitetsbøker.",
    fi: "33 ammattimaista tulostettavien tuotteiden generaattoria Etsy-myyjille, KDP-julkaisijoille ja yrittäjille. Luo ja myy työarkkeja, pulmia ja aktiviteettikirjoja."
  };

  const homepageWebsiteDescriptions: Record<string, string> = {
    en: "Printable generators for creating and selling worksheets, puzzles, and activity books online",
    de: "Arbeitsblatt-Generatoren zum Erstellen von Suchsel, Kreuzworträtsel, Mathe-Arbeitsblätter und mehr — kostenlos testen",
    fr: "Générateurs de fiches pédagogiques pour créer des mots mêlés, mots croisés, fiches maths et coloriages à imprimer",
    es: "Generadores de imprimibles para crear y vender fichas, rompecabezas y libros de actividades en línea",
    pt: "Geradores de impressos para criar e vender planilhas, quebra-cabeças e livros de atividades online",
    it: "Generatori di stampabili per creare e vendere schede, puzzle e libri di attività online",
    nl: "Printable-generatoren voor het maken en verkopen van werkbladen, puzzels en activiteitenboeken online",
    sv: "Generatorer för utskrivbara produkter för att skapa och sälja arbetsblad, pussel och aktivitetsböcker online",
    da: "Printbare generatorer til at oprette og sælge arbejdsark, puslespil og aktivitetsbøger online",
    no: "Generatorer for utskrivbare produkter for å lage og selge arbeidsark, puslespill og aktivitetsbøker på nett",
    fi: "Tulostettavien tuotteiden generaattorit työarkkien, pulmien ja aktiviteettikirjojen luomiseen ja myyntiin verkossa"
  };

  const homepageSoftwareDescriptions: Record<string, string> = {
    en: "33 professional worksheet generators with 3,100+ themed images for creating printable products to sell on Etsy, Amazon KDP, and other marketplaces",
    de: "33 Arbeitsblatt-Generatoren mit 3.100+ Themenbildern in 11 Sprachen. Suchsel, Kreuzworträtsel, Mathe, Sudoku und mehr erstellen. 300 DPI PDF-Export.",
    fr: "33 générateurs de fiches avec plus de 3 100 images thématiques en 11 langues. Mots mêlés, mots croisés, fiches maths, coloriages, sudoku et plus. PDF 300 DPI.",
    es: "33 generadores profesionales con más de 3.100 imágenes temáticas para crear productos imprimibles para vender en Etsy, Amazon KDP y otros mercados",
    pt: "33 geradores profissionais com mais de 3.100 imagens temáticas para criar produtos imprimíveis para vender na Etsy, Amazon KDP e outros marketplaces",
    it: "33 generatori professionali con oltre 3.100 immagini tematiche per creare prodotti stampabili da vendere su Etsy, Amazon KDP e altri marketplace",
    nl: "33 professionele generatoren met 3.100+ thematische afbeeldingen voor het maken van printbare producten voor Etsy, Amazon KDP en andere marktplaatsen",
    sv: "33 professionella generatorer med 3 100+ tematiska bilder för att skapa utskrivbara produkter att sälja på Etsy, Amazon KDP och andra marknadsplatser",
    da: "33 professionelle generatorer med 3.100+ tematiske billeder til at oprette printbare produkter til salg på Etsy, Amazon KDP og andre markedspladser",
    no: "33 profesjonelle generatorer med 3 100+ tematiske bilder for å lage utskrivbare produkter for salg på Etsy, Amazon KDP og andre markedsplasser",
    fi: "33 ammattimaista generaattoria yli 3 100 temaattisella kuvalla tulostettavien tuotteiden luomiseen myyntiin Etsyssä, Amazon KDP:ssä ja muilla markkinapaikoilla"
  };

  const homepageFeatureLists: Record<string, string[]> = {
    en: ["Word Search Generator", "Crossword Puzzle Generator", "Math Worksheet Generator", "Pattern Recognition Activities", "Matching Games", "And 28 more generators"],
    de: ["Suchsel Generator", "Kreuzworträtsel Generator", "Mathe Arbeitsblatt Generator", "Ausmalbilder Generator", "Sudoku Generator", "Und 28 weitere Generatoren"],
    fr: ["Générateur de mots mêlés", "Générateur de mots croisés", "Générateur de fiches maths", "Générateur de coloriages", "Générateur de sudoku", "Et 28 autres générateurs"],
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
    "@type": "Organization",
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
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "inLanguage": getHreflangCode(locale),
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "149",
      "priceCurrency": "USD",
      "offerCount": 3,
      "offers": [
        { "@type": "Offer", "name": "Free Trial", "price": "0", "priceCurrency": "USD", "description": "All features, watermarked downloads" },
        { "@type": "Offer", "name": "Individual App", "price": "49", "priceCurrency": "USD", "description": "One-time payment, commercial license" },
        { "@type": "Offer", "name": "Category Bundle", "price": "149", "priceCurrency": "USD", "description": "All apps in a category, commercial license" }
      ]
    },
    "description": homepageSoftwareDescriptions[locale] || homepageSoftwareDescriptions.en,
    "featureList": homepageFeatureLists[locale] || homepageFeatureLists.en,
    "screenshot": getHomepageScreenshots(locale, baseUrl),
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
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": `${baseUrl}${encodeImagePath(getHomepageScreenshots(locale, baseUrl)[0])}`,
        "contentUrl": `${baseUrl}${encodeImagePath(getHomepageScreenshots(locale, baseUrl)[0])}`,
        "caption": pageMeta.name,
        "width": 2480,
        "height": 3508,
        "encodingFormat": "image/webp"
      },
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
    de: "33 Arbeitsblatt-Generatoren",
    fr: "33 Générateurs de Fiches Pédagogiques",
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
    en: "33 professional printable generators for your online business. Create word searches, crosswords, math puzzles and more to sell on Etsy and Amazon KDP.",
    de: "33 Arbeitsblatt-Generatoren für Mathe, Sprache, visuelles Lernen, Kreativität und Logik. Suchsel, Kreuzworträtsel, Sudoku und mehr erstellen. Kostenlos testen.",
    fr: "33 générateurs de fiches pédagogiques : mots mêlés, mots croisés, fiches maths, coloriages, sudoku et plus. PDF 300 DPI, licence commerciale pour Etsy et Amazon KDP.",
    es: "33 generadores profesionales de imprimibles para su negocio en línea. Cree sopas de letras, crucigramas, rompecabezas matemáticos y más para vender en Etsy y Amazon KDP.",
    pt: "33 geradores profissionais de impressos para o seu negócio online. Crie caça-palavras, palavras cruzadas, quebra-cabeças de matemática e mais para vender na Etsy e Amazon KDP.",
    it: "33 generatori professionali di stampabili per il tuo business online. Crea ricerca di parole, cruciverba, puzzle matematici e altro da vendere su Etsy e Amazon KDP.",
    nl: "33 professionele printable-generatoren voor uw online bedrijf. Maak woordzoekers, kruiswoordpuzzels, rekenpuzzels en meer om te verkopen op Etsy en Amazon KDP.",
    sv: "33 professionella generatorer för utskrivbara produkter för ditt onlineföretag. Skapa ordjaktar, korsord, mattepussel och mer att sälja på Etsy och Amazon KDP.",
    da: "33 professionelle printbare generatorer til din onlinevirksomhed. Opret ordjaktar, krydsord, matematikpuslespil og mere til salg på Etsy og Amazon KDP.",
    no: "33 profesjonelle generatorer for utskrivbare produkter for din nettvirksomhet. Lag ordjaktar, kryssord, mattepuslespill og mer for salg på Etsy og Amazon KDP.",
    fi: "33 ammattimaista tulostettavien tuotteiden generaattoria verkkoliiketoimintaasi. Luo sanaristikkoja, ristisanatehtäviä, matemaattisia pulmia ja muuta myytäväksi Etsyssä ja Amazon KDP:ssä."
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
      "@type": "Organization",
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "about": {
      "@type": "Thing",
      "name": "Professional Printable Generators"
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
    en: "Professional Printable Generators", de: "Professionelle Druckvorlagen-Generatoren",
    fr: "Générateurs de Fiches Gratuits en Ligne", es: "Generadores Profesionales de Imprimibles",
    pt: "Geradores Profissionais de Impressos", it: "Generatori Professionali di Stampabili",
    nl: "Professionele Printable Generatoren", sv: "Professionella Generatorer för Utskrifter",
    da: "Professionelle Printbare Generatorer", no: "Profesjonelle Generatorer for Utskrifter",
    fi: "Ammattimaiset Tulostettavien Generaattorit"
  };
  const descs: Record<string, string> = {
    en: "33 professional printable generators. Create worksheets, puzzles, and activity books to sell online.",
    it: "33 generatori professionali di stampabili. Crea schede, puzzle e libri di attività da vendere online.",
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
    "numberOfItems": 149,
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
    fr: "Idées de Niches d'Imprimables Rentables", es: "Ideas de Nichos para Imprimibles",
    pt: "Ideias de Nichos para Impressos", it: "Idee di Nicchia per Stampabili",
    nl: "Niche-ideeën voor Printables", sv: "Nischidéer för Utskrifter",
    da: "Nicheidéer til Tryksager", no: "Nisjeidéer for Utskrifter", fi: "Tulostettavien Liiketoimintaideat"
  };
  return {
    "@context": "https://schema.org", "@type": "CollectionPage",
    "name": names[locale] || names.en,
    "description": "60 printable business niche ideas for Etsy, Amazon KDP, and TPT sellers.",
    "url": `${baseUrl}/${locale}/ideas`,
    "numberOfItems": 60,
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
    fr: "Lancer votre Business d'Imprimables", es: "Guías de Negocio de Imprimibles",
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
    "@type": "Organization",
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