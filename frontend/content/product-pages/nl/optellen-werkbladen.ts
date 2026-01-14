import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/optellen-werkbladen.ts
 * URL: /nl/apps/optellen-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Dutch Keywords:
 * 1. Werkbladen groep 3
 * 2. Werkbladen kleuters
 * 3. Rekenen werkbladen
 * 4. Kleurplaten
 * 5. Letters leren / Schrijven oefenen
 * 6. Oefenbladen gratis
 * 7. Tafels oefenen
 * 8. Veilig leren lezen
 * 9. Fijne motoriek
 * 10. Sommen tot 20
 */

export const additionNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'optellen-werkbladen',
    appId: 'image-addition',
    title: 'Optel Werkbladen Generator - Rekenen Werkbladen voor Werkbladen Groep 3 en Sommen tot 20',
    description: 'Maak professionele optelwerkbladen met plaatjes in enkele minuten. Deze rekenen werkbladen generator is perfect voor leerkrachten in het basisonderwijs. Met je Basispakket abonnement creëer je onbeperkt werkbladen groep 3 zonder extra kosten per werkblad.',
    keywords: 'optellen werkbladen, rekenen werkbladen, werkbladen groep 3, werkbladen kleuters, sommen tot 20, oefenbladen gratis, tafels oefenen, veilig leren lezen, fijne motoriek, letters leren',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/optellen-werkbladen',
  },

  // Hero Section - FULL text from addition.md paragraphs 1-4
  hero: {
    title: 'Optel Werkbladen Generator',
    subtitle: 'Rekenen Werkbladen voor Werkbladen Groep 3 en Sommen tot 20',
    description: `Maak professionele optelwerkbladen met plaatjes in enkele minuten. Deze rekenen werkbladen generator is perfect voor leerkrachten in het basisonderwijs. Met je Basispakket abonnement creëer je onbeperkt werkbladen groep 3 zonder extra kosten per werkblad.

De optelwerkbladen maker werkt volledig in het Nederlands. Je kiest afbeeldingen uit de bibliotheek of uploadt eigen plaatjes. Kinderen tellen de afbeeldingen bij elkaar op en schrijven het antwoord. Ideaal voor sommen tot 20 oefeningen in groep 3 en groep 4.

Rekenen met plaatjes maakt abstract tellen concreet. Kinderen zien drie appels plus twee appels. Ze begrijpen direct wat optellen betekent. Deze visuele aanpak werkt beter dan alleen cijfers.`,
    previewImageSrc: '',
    ctaLabels: {
      tryFree: 'Gratis Uitproberen',
      viewSamples: 'Voorbeelden Bekijken',
    },
    trustBadges: {
      languages: '11 Talen',
      images: '3000+ Afbeeldingen',
      license: 'Commerciële Licentie',
    },
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    floatingStats: {
      time: '3 min',
      action: 'Maken & Downloaden',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/addition/
  samples: {
    sectionTitle: 'Optelwerkbladen Voorbeelden',
    sectionDescription: 'Download gratis voorbeeldwerkbladen om onze professionele kwaliteit te ervaren',
    downloadLabel: 'Gratis Voorbeeld Downloaden',
    worksheetLabel: 'Werkblad',
    answerKeyLabel: 'Antwoordblad',
    viewAllLabel: 'Groter bekijken',
    noPdfLabel: 'Alleen voorbeeld',
    freePdfCountLabel: 'gratis downloads',
    badgeText: 'Gratis Voorbeelden',
    downloadingLabel: 'Downloaden...',
    ofLabel: 'van',
    items: [],
  },

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Werkbladen Kleuters tot Sommen tot 20 voor Iedereen',
    sectionDescription: 'De optelwerkbladen generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot ouders die thuisonderwijs geven. Ontdek hoe deze tool past bij jouw situatie en onderwijsdoelen.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [],
    ctaText: 'Nu Starten',
    bundleDescription: 'Uw abonnement geeft toegang tot 10 werkbladgeneratoren:',
    bundleApps: [
      'Beeldoptelling',
      'Alfabettrein',
      'Kleurplaten',
      'Rekenwerkbladen',
      'Woordkruisel',
      'Zoek en Tel',
      'Verbindingsspel',
      'Lijnen Trekken',
      'Plaatjes Bingo',
      'Sudoku',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combineer Optelwerkbladen met Andere Generators - Complete Werkbladen Pakketten',
    sectionDescription: 'De Basispakket bevat tien werkblad generators die perfect samenwerken. Combineer optelwerkbladen met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
    ctaTitle: 'Klaar om geweldige werkbladen te maken?',
    ctaDescription: 'Sluit je aan bij duizenden leerkrachten die professionele werkbladen maken. Onbeperkt genereren, commerciële licentie inbegrepen.',
    primaryCtaText: 'Gratis Proberen',
    secondaryCtaText: 'Alle 33 Apps Bekijken',
    badgeText: 'Werkt goed met',
    exploreText: 'Alle apps bekijken',
    trustBadges: {
      securePayment: 'Veilig betalen',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [],
  },
};

export default additionNlContent;
