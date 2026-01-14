import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Sudoku Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/sudoku-werkbladen.ts
 * URL: /nl/apps/sudoku-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/sudoku.md
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

export const sudokuNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'sudoku-werkbladen',
    appId: 'sudoku',
    title: 'Sudoku Werkbladen Generator - Oefenbladen Gratis voor Werkbladen Groep 3 en Werkbladen Kleuters',
    description: 'Maak prachtige visuele sudoku puzzels voor jonge kinderen. Onze sudoku werkbladen generator is speciaal ontworpen voor kleuters en basisschoolleerlingen. Met je Basispakket abonnement maak je onbeperkt werkbladen kleuters zonder extra kosten per werkblad.',
    keywords: 'sudoku werkbladen, werkbladen groep 3, werkbladen kleuters, rekenen werkbladen, oefenbladen gratis, kleurplaten, letters leren, schrijven oefenen, tafels oefenen, veilig leren lezen, fijne motoriek, sommen tot 20',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/sudoku-werkbladen',
  },

  // Hero Section - FULL text from sudoku.md paragraphs 1-4
  hero: {
    title: 'Sudoku Werkbladen Generator',
    subtitle: 'Oefenbladen Gratis voor Werkbladen Groep 3 en Werkbladen Kleuters',
    description: `Maak prachtige visuele sudoku puzzels voor jonge kinderen. Onze sudoku werkbladen generator is speciaal ontworpen voor kleuters en basisschoolleerlingen. Met je Basispakket abonnement maak je onbeperkt werkbladen kleuters zonder extra kosten per werkblad. In plaats van cijfers gebruiken deze puzzels kleurrijke plaatjes. Perfect voor kinderen die nog niet kunnen rekenen.

Visuele sudoku helpt kinderen logisch denken ontwikkelen. De puzzels zijn ideaal voor werkbladen groep 3 en werkbladen kleuters. Kinderen leren patronen herkennen zonder dat ze cijfers hoeven te kennen. Dit maakt onze sudoku generator perfect voor de jongste leerlingen.

Onze sudoku voor kinderen gebruikt afbeeldingen in plaats van cijfers. Een 4x4 rooster maakt de puzzels behapbaar voor jonge leerlingen. Kies uit meer dan 3000 kindvriendelijke afbeeldingen. Selecteer een thema of kies individuele plaatjes.`,
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

  // Sample Gallery - REAL file paths from samples/english/sudoku/
  samples: {
    sectionTitle: 'Sudoku Werkbladen Voorbeelden',
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

  // Use Cases - FULL text from sudoku.md use case sections
  useCases: {
    sectionTitle: 'Sudoku Werkbladen voor Leerkrachten en Ouders - Oefenbladen Gratis voor Iedereen',
    sectionDescription: 'Onze sudoku generator is ontworpen voor diverse gebruikers. Van kleuterjuffen tot thuisonderwijzers. Van basisschoolleerkrachten tot ondernemende docenten. Hieronder ontdek je hoe verschillende groepen profiteren. Iedereen vindt werkbladen kleuters en werkbladen groep 3 voor hun specifieke situatie.',
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
    sectionTitle: 'Combineer Sudoku met Andere Generators - Complete Werkbladen Pakketten',
    sectionDescription: 'Het Basispakket bevat tien werkblad generators die perfect samenwerken. Combineer sudoku werkbladen met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
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

export default sudokuNlContent;
