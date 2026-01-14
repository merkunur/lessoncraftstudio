import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Matching Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/verbindings-werkbladen.ts
 * URL: /nl/apps/verbindings-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/matching.md
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
 *
 * PRICING: Core Bundle - €144/year or €15/month (Basispakket)
 */

export const matchingNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'verbindings-werkbladen',
    appId: 'matching-app',
    title: 'Werkbladen Groep 3 Verbindings Generator - Oefenbladen Gratis voor Kleuters en Basisschool',
    description: 'Maak professionele verbindingswerkbladen met onze werkbladen generator. Met je Basispakket abonnement creëer je onbeperkt oefenbladen zonder extra kosten per werkblad. De generator maakt werkbladen groep 3 waarbij kinderen lijnen trekken om paren te verbinden.',
    keywords: 'verbindingswerkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, letters leren, fijne motoriek, veilig leren lezen, rekenen werkbladen, tafels oefenen, sommen tot 20',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/verbindings-werkbladen',
  },

  // Hero Section
  hero: {
    title: 'Werkbladen Groep 3 Verbindings Generator',
    subtitle: 'Oefenbladen Gratis voor Kleuters en Basisschool',
    description: `Maak professionele verbindingswerkbladen met onze werkbladen generator. Met je Basispakket abonnement creëer je onbeperkt oefenbladen zonder extra kosten per werkblad. De generator maakt werkbladen groep 3 waarbij kinderen lijnen trekken om paren te verbinden. Binnen drie minuten download je hoogwaardige PDF werkbladen klaar voor de printer.

Verbindingswerkbladen zijn ideaal voor werkbladen kleuters en groep 1 2. Kinderen leren visuele herkenning door afbeeldingen te koppelen aan woorden of letters. Dit stimuleert de fijne motoriek omdat leerlingen precieze lijnen moeten trekken. Onze generator biedt vier verschillende verbindingsmodi.

Ontwerp werkbladen groep 3 die perfect aansluiten bij jouw lesmateriaal. Kies uit meer dan 3000 kindvriendelijke afbeeldingen georganiseerd per thema. De generator ondersteunt elf talen inclusief Nederlands. Ideaal voor tweetalig onderwijs en meertalige klaslokalen.`,
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

  // Sample Gallery
  samples: {
    sectionTitle: 'Verbindingswerkbladen Voorbeelden',
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

  // Use Cases
  useCases: {
    sectionTitle: 'Wie Gebruikt Verbindingswerkbladen - Oefenbladen Gratis voor Tafels Oefenen en Veilig Leren Lezen',
    sectionDescription: 'Verbindingswerkbladen worden gebruikt door diverse groepen in het onderwijs. Leerkrachten, ouders, bijlesdocenten en speciale onderwijsprofessionals profiteren allemaal. Ontdek hoe elke groep de generator gebruikt voor werkbladen groep 3 en werkbladen kleuters.',
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
    sectionTitle: 'Combineer Apps voor Complete Lespakketten - Tafels Oefenen met Veilig Leren Lezen en Fijne Motoriek',
    sectionDescription: 'De Basispakket bevat tien werkbladgeneratoren die perfect samenwerken. Combineer verbindingswerkbladen met andere tools voor gevarieerde lessen. Maak complete lespakketten voor werkbladen kleuters en hogere groepen.',
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

export default matchingNlContent;
