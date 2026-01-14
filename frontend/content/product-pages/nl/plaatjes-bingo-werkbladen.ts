import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Bingo Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/plaatjes-bingo-werkbladen.ts
 * URL: /nl/apps/plaatjes-bingo-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/bingo.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Dutch Keywords:
 * 1. Werkbladen kleuters
 * 2. Werkbladen groep 3
 * 3. Oefenbladen gratis
 * 4. Rekenen werkbladen
 * 5. Letters leren
 * 6. Veilig leren lezen
 * 7. Sommen tot 20
 * 8. Kleurplaten
 * 9. Fijne motoriek
 * 10. Tafels oefenen
 *
 * PRICING: Core Bundle ($144/year = €144/jaar) - Picture Bingo is in Core Bundle
 */

export const pictureBingoNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'plaatjes-bingo-werkbladen',
    appId: 'picture-bingo',
    title: 'Plaatjes Bingo Werkbladen Generator - Gratis Printbare Oefenbladen voor Groep 1-3',
    description: 'Maak professionele bingo werkbladen met onze plaatjes bingo generator. Met je Basispakket abonnement genereer je onbeperkt werkbladen voor groep 1, 2 en 3. Download direct als PDF en print thuis of op school. Leerlingen leren spelenderwijs met visuele herkenning en woordenschat.',
    keywords: 'plaatjes bingo, werkbladen kleuters, werkbladen groep 3, oefenbladen gratis, rekenen werkbladen, letters leren, veilig leren lezen, sommen tot 20, kleurplaten, fijne motoriek, tafels oefenen, bingo generator',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/plaatjes-bingo-werkbladen',
  },

  // Hero Section - FULL text from bingo.md paragraphs
  hero: {
    title: 'Plaatjes Bingo Werkbladen Generator',
    subtitle: 'Gratis Printbare Oefenbladen voor Groep 1-3',
    description: `Maak professionele bingo werkbladen met onze plaatjes bingo generator. Met je Basispakket abonnement genereer je onbeperkt werkbladen voor groep 1, 2 en 3. Download direct als PDF en print thuis of op school. Leerlingen leren spelenderwijs met visuele herkenning en woordenschat.

Plaatjes bingo is een fantastisch leermiddel voor het basisonderwijs. Kleuters en kinderen uit groep 3 leren nieuwe woorden terwijl ze spelen. De generator maakt unieke bingokaarten met afbeeldingen of woorden. Elke kaart is anders, zodat ieder kind een eigen speelervaring heeft.

Met je abonnement maak je zoveel bingokaarten als je nodig hebt. Geen extra kosten per werkblad. Kies uit meer dan 3000 kindvriendelijke afbeeldingen. De beeldbibliotheek is georganiseerd op thema. Van dieren tot voertuigen, van fruit tot schoolspullen.`,
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

  // Sample Gallery - REAL file paths from samples/english/bingo/
  samples: {
    sectionTitle: 'Plaatjes Bingo Voorbeelden',
    sectionDescription: 'Download gratis voorbeeldwerkbladen om onze professionele kwaliteit te ervaren',
    downloadLabel: 'Gratis Voorbeeld Downloaden',
    worksheetLabel: 'Werkblad',
    answerKeyLabel: 'Oproepkaarten',
    viewAllLabel: 'Groter bekijken',
    noPdfLabel: 'Alleen voorbeeld',
    freePdfCountLabel: 'gratis downloads',
    badgeText: 'Gratis Voorbeelden',
    downloadingLabel: 'Downloaden...',
    ofLabel: 'van',
    items: [],
  },

  // Use Cases - FULL text from bingo.md use case sections
  useCases: {
    sectionTitle: 'Voor Wie Zijn Bingo Werkbladen - Oefenbladen Gratis voor Leerkrachten en Ouders',
    sectionDescription: 'Plaatjes bingo past in veel onderwijssituaties. Van kleuterklas tot speciaal onderwijs. Van thuisonderwijs tot taalles. Ontdek hoe verschillende gebruikers profiteren van de bingo generator.',
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
    sectionTitle: 'Combineer Bingo met Andere Werkbladen - Sommen tot 20 en Letters Leren Pakketten',
    sectionDescription: 'De bingo generator is nog krachtiger in combinatie met andere tools. Het Basispakket bevat tien werkbladgeneratoren die elkaar aanvullen. Maak complete leerpakketten voor thema\'s, seizoenen of vaardigheden.',
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

export default pictureBingoNlContent;
