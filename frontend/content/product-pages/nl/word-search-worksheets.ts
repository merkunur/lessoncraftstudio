import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/word-search-worksheets.ts
 * URL: /nl/apps/woordzoeker-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/wordsearch.md
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

export const wordSearchNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'woordzoeker-werkbladen',
    appId: 'word-search',
    title: 'Woordzoeker Generator - Gratis Oefenbladen voor Werkbladen Groep 3 en Kleuters',
    description: 'Maak professionele woordzoekers voor het basisonderwijs. Deze gratis woordzoeker generator is perfect voor werkbladen groep 3, werkbladen kleuters en oefenbladen. Ontwerp werkbladen die kinderen uitdagen en vermaken. De woordzoeker maker werkt volledig in het Nederlands.',
    keywords: 'woordzoeker generator, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, letters leren, veilig leren lezen, rekenen werkbladen, kleurplaten, fijne motoriek, sommen tot 20',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/woordzoeker-werkbladen',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-4
  hero: {
    title: 'Woordzoeker Generator',
    subtitle: 'Gratis Oefenbladen voor Werkbladen Groep 3 en Kleuters',
    description: `Maak in een paar klikken professionele woordzoekers voor je leerlingen. Deze gratis woordzoeker generator is perfect voor leerkrachten in het basisonderwijs. Ontwerp werkbladen groep 3 die kinderen uitdagen en vermaken tegelijk.

De woordzoeker maker werkt volledig in het Nederlands. Je kiest een thema of uploadt eigen afbeeldingen. Binnen drie minuten heb je een afdrukbare puzzel klaar. Ideaal voor werkbladen kleuters en groep 1 2 die net beginnen met letters leren.

Traditionele werkbladen kosten veel tijd om te maken. Met deze tool bespaar je uren werk. De generator maakt automatisch een puzzelrooster met de woorden die jij kiest. Je downloadt het resultaat als PDF of afbeelding.`,
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Woordzoeker Werkbladen Voorbeelden',
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

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Werkbladen Kleuters tot Groep 5 voor Iedereen',
    sectionDescription: 'De woordzoeker generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot ouders die thuisonderwijs geven. Ontdek hoe deze tool past bij jouw situatie.',
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
    sectionTitle: 'Combineer Woordzoekers met Andere Generatoren - Complete Werkbladen Pakketten',
    sectionDescription: 'Met een abonnement krijg je toegang tot 33 generatoren. Combineer verschillende werkblad-typen voor maximale impact. Woordzoekers alleen zijn al waardevol. In combinatie met andere apps ontstaat echte meerwaarde.',
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

export default wordSearchNlContent;
