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
    appId: 'bingo',
    title: 'Gratis Werkblad Plaatjes Bingo - Generator voor Werkbladen Kleuters',
    description: 'Maak professionele bingo werkbladen met onze plaatjes bingo generator. Met je Basispakket abonnement genereer je onbeperkt werkbladen voor groep 1, 2 en 3.',
    keywords: 'plaatjes bingo, werkbladen kleuters, werkbladen groep 3, oefenbladen gratis, rekenen werkbladen, letters leren, veilig leren lezen, sommen tot 20, kleurplaten, fijne motoriek, tafels oefenen, bingo generator',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/plaatjes-bingo-werkbladen',
      },

  // Hero Section - FULL text from bingo.md paragraphs
  hero: {
    title: 'Gratis Werkbladen Plaatjes Bingo Generator',
    subtitle: 'Werkblad voor Kinderen - Gratis Printables voor Groep 1-3',
    description: `Maak professionele bingo werkbladen met onze plaatjes bingo generator. Met je Basispakket abonnement genereer je onbeperkt werkbladen voor groep 1, 2 en 3. Download direct als PDF en print thuis of op school. Leerlingen leren spelenderwijs met visuele herkenning en woordenschat.

Plaatjes bingo is een fantastisch leermiddel voor het basisonderwijs. Kleuters en kinderen uit groep 3 leren nieuwe woorden terwijl ze spelen. De generator maakt unieke bingokaarten met afbeeldingen of woorden. Elke kaart is anders, zodat ieder kind een eigen speelervaring heeft.

Met je abonnement maak je zoveel bingokaarten als je nodig hebt. Geen extra kosten per werkblad. Kies uit meer dan 3000 kindvriendelijke afbeeldingen. De beeldbibliotheek is georganiseerd op thema. Van dieren tot voertuigen, van fruit tot schoolspullen.`,
    previewImageSrc: '/samples/dutch/bingo/sample-1.jpeg',
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
    sectionTitle: 'Gratis Werkblad voor Kinderen - Gratis Werkbladen en Gratis Printables',
    sectionDescription: 'Download gratis printables - Gratis werkblad voor kinderen van professionele kwaliteit. Gratis werkbladen en werkblad voor kinderen perfect voor werkblad voor kleuters. Gratis werkblad voor kinderen en werkblad voor kinderen inclusief educatief materiaal. Gratis werkblad beschikbaar',
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

  // Features Grid - FULL text from bingo.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'De bingo werkbladen generator biedt alles wat je nodig hebt voor interactief onderwijs. Van eenvoudige bediening tot professionele exportkwaliteit. Ontdek alle mogelijkheden om werkbladen te maken voor groep 1, 2 en 3.',
    highlightBadgeText: 'Uitgelicht',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    badgeText: 'Functies',
    trustBadges: {
      allFeatures: 'Alle functies inbegrepen',
      noHiddenFees: 'Geen verborgen kosten',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from bingo.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad Maken - Plaatjes Bingo in 5 Stappen voor Kinderen',
    sectionDescription: 'Het maken van een gratis werkblad voor kinderen duurt minder dan drie minuten. Volg dit eenvoudige stappenplan voor perfecte bingokaarten. Van thema kiezen tot printen, alles uitgelegd voor leerkrachten en ouders.',
    ctaText: 'Nu Starten',
    badgeText: 'Zo werkt het',
    stepLabel: 'Stap',
    completionTitle: 'Klaar!',
    completionSubtitle: 'Je bingokaarten zijn gereed',
    readyTime: 'Klaar in minder dan 3 minuten',
    noSkillsNeeded: 'Geen ontwerpkennis nodig',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Stap 1: Kies Je Thema voor Gratis Werkblad - Beeldbibliotheek Verkennen',
        description: `Open de bingo generator en bekijk de zijbalk. Selecteer de taal voor je beeldbibliotheek. Kies Nederlands voor Nederlandse woordnamen onder de plaatjes. Klik op het thema-dropdown menu.

Blader door categorieën zoals dieren, voertuigen of seizoenen. Je ziet direct alle beschikbare afbeeldingen in dat thema. Klik op plaatjes om ze te selecteren voor aangepaste oproepkaarten.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Stel Rastergrootte in voor Werkblad voor Kinderen - Van 3x3 tot 5x5',
        description: `Ga naar het onderdeel bingokaart instellingen. Kies het aantal rijen tussen drie en vijf. Kies het aantal kolommen tussen drie en vijf. Een 3x3 raster geeft negen vakjes per kaart.

Kleinere rasters zijn ideaal voor kleuters en beginners. Grotere rasters bieden meer uitdaging voor groep 3. Bepaal hoeveel kaarten je wilt genereren. Maximaal tien kaarten tegelijk mogelijk.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Gratis Werkbladen Genereren - Klik en Bekijk Direct Resultaat',
        description: `Kies of de bingokaart plaatjes of woorden toont. De plaatjesoptie toont afbeeldingen in elk vakje. De woordoptie toont de naam van elke afbeelding. Kies ook de vulling voor de oproepchips.

Klik op de genereerknop in de paarse werkbalk. Je bingokaarten verschijnen direct op het canvas. Het eerste tabblad toont kaarten en chips samen. Het tweede tabblad toont alleen de oproepkaarten.`,
        icon: '🎯',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Werkblad voor Kleuters Bewerken - Canvas Aanpassen naar Wens',
        description: `Nu begint het creatieve deel. Klik op elk element om het te selecteren. Sleep afbeeldingen naar een andere plek. Pak een hoekpunt om te vergroten of verkleinen. Draai elementen door het rotatiepunt te slepen.

Voeg tekst toe via de tekstgereedschappen. Typ een titel zoals "Dierenbingo Groep 2". Kies lettertype, grootte en kleur. Gebruik de uitlijnknoppen voor perfecte positionering.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Gratis Printables Downloaden - PDF of JPEG Exporteren',
        description: `Je werkblad is klaar voor export. Klik op de downloadknop in de werkbalk. Kies tussen verschillende formaten. JPEG voor losse afbeeldingsbestanden. PDF voor documenten met meerdere pagina's.

Vink de grijstintenoptie aan voor zwart-wit afdrukken. Dit bespaart inkt en maakt kleurplaten van je bingokaarten. Download apart de kaarten en de oproepchips.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from bingo.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Plaatjes Bingo voor Leerkrachten en Ouders',
    sectionDescription: 'Plaatjes bingo past in veel onderwijssituaties. Van kleuterklas tot speciaal onderwijs. Van thuisonderwijs tot taalles. Ontdek hoe verschillende gebruikers profiteren van de bingo generator.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from bingo.md
  faq: {
    sectionTitle: 'Gratis Werkblad FAQ - Veelgestelde Vragen over Plaatjes Bingo',
    sectionDescription: 'Hieronder beantwoorden we de meest gestelde vragen over de plaatjes bingo generator. Van prijzen tot mogelijkheden, van printen tot verkopen. Alles wat je moet weten voordat je begint.',
    showMoreText: 'Meer vragen tonen',
    showLessText: 'Minder tonen',
    badgeText: 'Veelgestelde vragen',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    secureCheckout: 'Veilig betalen',
    cancelAnytime: 'Altijd opzegbaar',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Core Bundle pricing
  pricing: {
    title: 'Basispakket',
    price: '€144',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
    benefits: [
      'Onbeperkt bingo werkbladen maken',
      'Commerciële licentie inbegrepen',
      '11 talen ondersteund',
      '3000+ thematische afbeeldingen',
      '300 DPI afdrukkwaliteit',
      'Volledig bewerkbaar canvas',
    ],
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
    sectionTitle: 'Gratis Werkbladen Combineren - Plaatjes Bingo met Letters Leren en Rekenen',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default pictureBingoNlContent;
