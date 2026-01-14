import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Coloring Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/kleurplaten-werkbladen.ts
 * URL: /nl/apps/kleurplaten-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/coloring.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Dutch Keywords:
 * 1. Kleurplaten
 * 2. Werkbladen groep 3
 * 3. Werkbladen kleuters
 * 4. Oefenbladen gratis
 * 5. Fijne motoriek
 * 6. Letters leren / Schrijven oefenen
 * 7. Rekenen werkbladen
 * 8. Veilig leren lezen
 * 9. Sommen tot 20
 * 10. Tafels oefenen
 */

export const coloringNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'kleurplaten-werkbladen',
    appId: 'coloring',
    title: 'Kleurplaten Generator - Gratis Printbare Kleurplaten voor Kleuters en Groep 3',
    description: 'Maak professionele kleurplaten met onze gebruiksvriendelijke kleurplaten generator. Met je Basispakket abonnement krijg je onbeperkt toegang tot het maken van werkbladen zonder extra kosten per werkblad. Download kleurplaten als PDF of JPEG en print ze direct uit.',
    keywords: 'kleurplaten, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, letters leren, schrijven oefenen, rekenen werkbladen, veilig leren lezen, sommen tot 20',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/kleurplaten-werkbladen',
  },

  // Hero Section - FULL text from coloring.md paragraphs 1-4
  hero: {
    title: 'Kleurplaten Generator',
    subtitle: 'Gratis Printbare Kleurplaten voor Kleuters en Groep 3',
    description: `Maak professionele kleurplaten met onze gebruiksvriendelijke kleurplaten generator. Met je Basispakket abonnement krijg je onbeperkt toegang tot het maken van werkbladen zonder extra kosten per werkblad. Download kleurplaten als PDF of JPEG en print ze direct uit. Ideaal voor leerkrachten die werkbladen kleuters nodig hebben.

Onze kleurplaten generator is speciaal ontwikkeld voor het basisonderwijs. Leerkrachten van groep 1 en 2 gebruiken deze tool dagelijks. Met meer dan 3000 kindvriendelijke afbeeldingen maak je in enkele minuten prachtige werkbladen groep 3. De generator ondersteunt 11 talen waaronder Nederlands.

Kleurplaten zijn essentieel voor de ontwikkeling van jonge kinderen. Ze stimuleren de fijne motoriek en creativiteit. Onze werkbladen kleuters bevatten thema's die aansluiten bij het schooljaar. Denk aan seizoenen, dieren, voertuigen en feestdagen. Elk werkblad is bewerkbaar op het canvas.`,
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

  // Sample Gallery - REAL file paths from samples/english/coloring/
  samples: {
    sectionTitle: 'Kleurplaten Voorbeelden',
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

  // Use Cases - FULL text from coloring.md use case sections
  useCases: {
    sectionTitle: 'Kleurplaten voor Leerkrachten, Ouders en Ondernemers - Werkbladen Groep 3 en Kleuters voor Iedereen',
    sectionDescription: 'Onze kleurplaten generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot thuisonderwijzende ouders. Ontdek hoe verschillende groepen de tool gebruiken.',
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
    sectionTitle: 'Combineer Kleurplaten met Andere Generators - Complete Werkbladen Pakketten',
    sectionDescription: 'Het Basispakket bevat tien werkblad generators die perfect samenwerken. Combineer kleurplaten met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
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

export default coloringNlContent;
