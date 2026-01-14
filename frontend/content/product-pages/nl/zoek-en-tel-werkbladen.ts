import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find and Count Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/zoek-en-tel-werkbladen.ts
 * URL: /nl/apps/zoek-en-tel-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/find-and-count.md
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

export const findAndCountNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'zoek-en-tel-werkbladen',
    appId: 'find-and-count',
    title: 'Zoek en Tel Werkbladen Generator - Rekenen Werkbladen voor Werkbladen Groep 3 en Oefenbladen Gratis',
    description: 'Maak professionele zoek-en-tel werkbladen in enkele minuten. Deze interactieve werkblad generator combineert visueel zoeken met tellen. Met je Basispakket abonnement creëer je onbeperkt werkbladen groep 3 zonder extra kosten per werkblad.',
    keywords: 'zoek en tel werkbladen, rekenen werkbladen, werkbladen groep 3, werkbladen kleuters, sommen tot 20, oefenbladen gratis, tafels oefenen, veilig leren lezen, fijne motoriek, letters leren',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/zoek-en-tel-werkbladen',
  },

  // Hero Section - FULL text from find-and-count.md paragraphs 1-2
  hero: {
    title: 'Zoek en Tel Werkbladen',
    subtitle: 'Rekenen Werkbladen voor Werkbladen Groep 3 met Oefenbladen Gratis Kwaliteit',
    description: `Maak professionele zoek-en-tel werkbladen in enkele minuten. Deze interactieve werkblad generator combineert visueel zoeken met tellen. Met je Basispakket abonnement creëer je onbeperkt werkbladen groep 3 zonder extra kosten per werkblad.

De zoek-en-tel generator werkt volledig in het Nederlands. Je kiest afbeeldingen uit de bibliotheek of uploadt eigen plaatjes. Kinderen zoeken specifieke objecten in een rasterpatroon en tellen hoeveel ze vinden. Ideaal voor rekenen werkbladen die visuele discriminatie combineren met getalbegrip.

Zoek-en-tel activiteiten stimuleren meerdere vaardigheden tegelijk. Kinderen oefenen concentratie terwijl ze objecten zoeken. Ze tellen wat ze vinden en noteren het antwoord. Dit combineert observatievaardigheden met rekenen werkbladen doelen.`,
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

  // Sample Gallery - REAL file paths from samples/english/find and count/
  samples: {
    sectionTitle: 'Zoek en Tel Werkbladen Voorbeelden',
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

  // Use Cases - FULL text from find-and-count.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Zoek en Tel Werkbladen voor Werkbladen Kleuters tot Werkbladen Groep 3',
    sectionDescription: 'Zoek-en-tel werkbladen zijn veelzijdig inzetbaar. Van kleuterklas tot bovenbouw. Van klassikaal onderwijs tot thuisonderwijs. Ontdek hoe verschillende gebruikers profiteren van deze generator voor rekenen werkbladen en visuele training.',
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
    sectionTitle: 'Combineer Zoek en Tel met Andere Generators - Complete Werkbladen Pakketten',
    sectionDescription: 'Het Basispakket bevat tien werkblad generators die perfect samenwerken. Combineer zoek-en-tel werkbladen met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
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

export default findAndCountNlContent;
