import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/rekenen-werkbladen.ts
 * URL: /nl/apps/rekenen-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/math-worksheet.md
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

export const mathWorksheetsNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'rekenen-werkbladen',
    appId: 'math-worksheet',
    title: 'Rekenen Werkbladen Generator - Gratis Oefenbladen voor Groep 3 en Kleuters',
    description: 'Maak professionele rekenen werkbladen met onze gebruiksvriendelijke generator. Met je Basispakket abonnement krijg je onbeperkte toegang tot alle functies. Genereer zoveel werkbladen groep 3 als je nodig hebt. Download direct als PDF of JPEG in hoge kwaliteit.',
    keywords: 'rekenen werkbladen, werkbladen groep 3, werkbladen kleuters, sommen tot 20, oefenbladen gratis, tafels oefenen, veilig leren lezen, fijne motoriek, letters leren, kleurplaten',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/rekenen-werkbladen',
  },

  // Hero Section - FULL text from math-worksheet.md paragraphs 1-4
  hero: {
    title: 'Rekenen Werkbladen Generator',
    subtitle: 'Gratis Oefenbladen voor Groep 3 en Kleuters',
    description: `Maak professionele rekenen werkbladen met onze gebruiksvriendelijke generator. Met je Basispakket abonnement krijg je onbeperkte toegang tot alle functies. Genereer zoveel werkbladen groep 3 als je nodig hebt. Download direct als PDF of JPEG in hoge kwaliteit.

De rekenen werkbladen generator is speciaal ontworpen voor leerkrachten en ouders. Maak werkbladen kleuters en oefenbladen gratis beschikbaar voor je klas. Het systeem genereert automatisch sommen tot 20 met afbeeldingen. Kies uit optellen, aftrekken, of een combinatie van beide bewerkingen.

Met deze tool maak je werkbladen groep 3 in enkele minuten. De generator ondersteunt verschillende moeilijkheidsniveaus. Zeer eenvoudig, eenvoudig, gemiddeld en moeilijk. Elke instelling past het aantal symbolen aan. Werkbladen kleuters bevatten minder symbolen.`,
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

  // Sample Gallery - REAL file paths from samples/english/math worksheet/
  samples: {
    sectionTitle: 'Rekenen Werkbladen Voorbeelden',
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

  // Use Cases - FULL text from math-worksheet.md use case sections
  useCases: {
    sectionTitle: 'Voor Wie Zijn Rekenen Werkbladen - Oefenbladen Gratis voor Leerkrachten en Ouders',
    sectionDescription: 'Onze generator is ontworpen voor diverse gebruikers. Van kleuterleidsters tot thuisonderwijs ouders. Werkbladen groep 3 voor de basisschool. Sommen tot 20 voor beginnende rekenaars. Hieronder lees je hoe verschillende doelgroepen profiteren.',
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
    sectionTitle: 'Combineer Rekenen Werkbladen met Andere Apps - Complete Leerpakketten',
    sectionDescription: 'Het Basispakket bevat 10 werkbladgeneratoren die perfect samenwerken. Combineer rekenen werkbladen met andere tools voor complete leerpakketten. Van kleurplaten tot tafels oefenen - alles in één abonnement.',
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

export default mathWorksheetsNlContent;
