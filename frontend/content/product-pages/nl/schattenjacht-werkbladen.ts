import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Treasure Hunt Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/schattenjacht-werkbladen.ts
 * URL: /nl/apps/schattenjacht-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/treasure-hunt.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Pricing Tier: FULL ACCESS ($240/year = €240/jaar)
 *
 * Dutch Keywords:
 * 1. Schattenjacht
 * 2. Werkbladen groep 3
 * 3. Werkbladen kleuters
 * 4. Oefenbladen gratis
 * 5. Fijne motoriek
 * 6. Rekenen werkbladen
 * 7. Richtingswoorden
 * 8. Groep 1 2
 * 9. Veilig leren lezen
 * 10. Ruimtelijk inzicht
 */

export const treasureHuntNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'schattenjacht-werkbladen',
    appId: 'treasure-hunt',
    title: 'Schattenjacht Werkbladen Gratis - Gratis Werkblad voor Kinderen Groep',
    description: 'Maak professionele schattenjacht werkbladen met onze richtingswoorden generator. Genereer aangepaste oefenbladen perfect voor groep 1, groep 2 en groep 3.',
    keywords: 'schattenjacht, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, rekenen werkbladen, richtingswoorden, groep 1 2, veilig leren lezen, ruimtelijk inzicht',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/schattenjacht-werkbladen',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/treasure-hunt/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Schattenjacht gratis werkblad - werkblad voor kinderen met richtingswoorden voor groep 3'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/treasure-hunt/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Schattenjacht werkblad voor kleuters - gratis werkbladen met fijne motoriek oefeningen'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/treasure-hunt/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkblad schattenjacht - werkblad voor kinderen met ruimtelijk inzicht'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/treasure-hunt/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Schattenjacht gratis printables - werkblad voor kleuters met richtingsoefeningen'
      },
    ],
  },

  // Hero Section
  hero: {
    title: 'Schattenjacht Generator - Gratis Werkbladen voor Kinderen',
    subtitle: 'Gratis Werkblad voor Kleuters - Werkblad voor Kinderen met Richtingswoorden',
    description: `Maak in enkele minuten professionele schattenjacht werkbladen voor je leerlingen. Deze generator helpt leerkrachten bij het maken van richtingswoorden oefeningen. Perfect voor werkbladen groep 3 en werkbladen kleuters die leren volgen van instructies.

De schattenjacht maker werkt volledig in het Nederlands. Kies zes afbeeldingen uit een thema. De generator maakt automatisch een vijf-bij-vijf rooster. Leerlingen volgen de richtingsaanwijzingen om de schat te vinden. Dit oefent fijne motoriek en ruimtelijk inzicht tegelijk.

Je Volledige Toegang abonnement geeft toegang tot onbeperkte werkbladen maken. Download hoogwaardige PDF bestanden. Geen kosten per werkblad. Ideaal voor oefenbladen gratis verzamelingen die je kunt printen voor je klas.`,
    previewImageSrc: '/samples/dutch/treasure-hunt/sample-1.jpeg',
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
    sectionTitle: 'Gratis Werkblad voor Kinderen - Gratis Werkbladen en Gratis Printables',
    sectionDescription: 'Download gratis printables - Gratis werkblad voor kinderen van professionele kwaliteit. Gratis werkbladen en werkblad voor kinderen perfect voor werkblad voor kleuters. Gratis werkblad voor kinderen en werkblad voor kinderen inclusief educatief materiaal. Gratis werkblad beschikbaar',
    downloadLabel: 'Gratis Voorbeeld Downloaden',
    worksheetLabel: 'Werkblad',
    answerKeyLabel: 'Antwoordblad',
    viewAllLabel: 'Groter bekijken',
    noPdfLabel: 'Alleen voorbeeld',
    freePdfCountLabel: 'gratis downloads',
    badgeText: 'Gratis Voorbeelden',
    downloadingLabel: 'Downloaden...',
    ofLabel: 'van',
    items: [
      {
        id: 'sample-1',
        worksheetSrc: '/samples/dutch/treasure-hunt/sample-1.jpeg',
        answerKeySrc: '/samples/dutch/treasure-hunt/sample-1.jpeg',
        altText: 'Schattenjacht gratis werkblad - werkblad voor kinderen met richtingswoorden voor groep 3',
        imageTitle: 'Schattenjacht gratis werkblad',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/dutch/treasure-hunt/sample-2.jpeg',
        answerKeySrc: '/samples/dutch/treasure-hunt/sample-2.jpeg',
        altText: 'Schattenjacht werkblad voor kleuters - gratis werkbladen met fijne motoriek oefeningen',
        imageTitle: 'Schattenjacht werkblad voor kleuters',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/dutch/treasure-hunt/sample-3.jpeg',
        answerKeySrc: '/samples/dutch/treasure-hunt/sample-3.jpeg',
        altText: 'Gratis werkblad schattenjacht - werkblad voor kinderen met ruimtelijk inzicht',
        imageTitle: 'Gratis werkblad schattenjacht',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/dutch/treasure-hunt/sample-4.jpeg',
        answerKeySrc: '/samples/dutch/treasure-hunt/sample-4.jpeg',
        altText: 'Schattenjacht gratis printables - werkblad voor kleuters met richtingsoefeningen',
        imageTitle: 'Schattenjacht gratis printables',
      },
    ],
    
  },

  // Features Grid
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'De schattenjacht generator biedt alle functies voor professionele werkbladen. Van eenvoudige richtingsoefeningen voor kleuters tot uitdagende ruimtelijke puzzels voor groep 5. Ontdek hoe je snel werkbladen groep 3 maakt met richtingswoorden en visuele aanwijzingen. Volledige Toegang abonnement (€240 per jaar) geeft toegang tot alle functies en 3000+ afbeeldingen.',
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

  // How-To Guide
  howTo: {
    sectionTitle: 'Gratis Werkblad voor Kinderen Maken - Werkblad voor Kleuters',
    sectionDescription: 'Het maken van een schattenjacht werkblad duurt minder dan drie minuten. Volg deze vijf stappen voor professionele oefenbladen gratis. Van thema selecteren tot downloaden en printen. Geen technische kennis vereist voor werkbladen groep 3 of werkbladen kleuters.',
    ctaText: 'Nu Starten',
    badgeText: 'Zo werkt het',
    stepLabel: 'Stap',
    completionTitle: 'Klaar!',
    completionSubtitle: 'Je schattenjacht werkblad is gereed',
    readyTime: 'Klaar in minder dan 3 minuten',
    noSkillsNeeded: 'Geen ontwerpkennis nodig',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Stap 1: Kies Je Thema voor Rekenen Werkbladen en Veilig Leren Lezen Combinaties',
        description: `Begin met het selecteren van je inhoud. Je hebt twee hoofdopties. Kies een thema uit de bibliotheek. Of selecteer handmatig zes afbeeldingen. Beide methodes werken uitstekend voor werkbladen kleuters en groep 3.

De thema-optie werkt het snelst. Klik op het dropdown menu in de puzzel instellingen. Kies uit tientallen thema's zoals dieren, voertuigen of eten. De generator selecteert automatisch zes verschillende afbeeldingen. Perfect voor snelle werkbladen groep 3 wanneer tijd schaars is.

Voor Veilig leren lezen integratie kies je de handmatige selectie. Zoek afbeeldingen die beginnen met dezelfde letter. Bijvoorbeeld zes B-woorden voor een letterherkenning les. Bal, beer, banaan, boek, boot en bloem. Kinderen oefenen letters leren terwijl ze de schattenjacht oplossen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan voor Fijne Motoriek Oefeningen en Kleurplaten Elementen',
        description: `Nu stel je de puzzel parameters in. Begin met het richtingstype. Kies tussen basis richtingen of windrichtingen. Basis richtingen zijn links, rechts, omhoog en omlaag. Geschikt voor werkbladen kleuters tot en met groep 2.

Windrichtingen zijn noord, zuid, oost en west. Deze passen bij groep 3 en hoger. Kinderen leren geografische termen. De schattenjacht wordt een aardrijkskundeles. Kies het niveau dat past bij je leerlingen.

Voeg een achtergrond thema toe voor kleurplaten combinaties. Selecteer uit tientallen patronen. Seizoensthema's zoals herfstbladeren of sneeuwvlokken. Feestthema's voor Sinterklaas of Kerstmis. De achtergrond maakt je werkblad visueel aantrekkelijker.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Je Puzzel met Schrijven Oefenen en Sommen tot 20 Integratie',
        description: `Klik op de knop "Genereer Schattenjacht" in het paneel. De puzzel verschijnt direct op het canvas. Je ziet het vijf-bij-vijf rooster met afbeeldingen. Daaronder staan vijf richtingsaanwijzingen.

De zes gekozen afbeeldingen zijn willekeurig verdeeld over het rooster. Geen twee dezelfde plaatjes naast elkaar. Dit voorkomt verwarring. Leerlingen zien duidelijk elk object.

De generator maakt ook automatisch een antwoordblad. De correcte route is gemarkeerd. De eindpositie is aangegeven. Perfect voor snelle controle. Of voor leerlingen die zelfstandig willen checken.`,
        icon: '🚀',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Oefenbladen Gratis Personaliseren met Tafels Oefenen Elementen',
        description: `Na het genereren kun je alles aanpassen. Het canvas werkt intuïtief. Klik op het rooster om het te selecteren. Sleep het naar een andere positie. Vergroot of verklein met de hoekpunten.

Voeg een titel toe bovenaan je werkblad. Klik op "Voeg Tekst Toe" in het paneel. Typ bijvoorbeeld "Schattenjacht - Dieren Thema." Kies een lettertype uit de lijst. Fredoka en Baloo 2 zijn kindvriendelijk. Lexend Deca is modern en strak.

Voor tafels oefenen integratie voeg je getallen toe aan de roostervakjes. Plaats kleine teksten met "×3" of "÷2" in bepaalde vakjes. Kinderen moeten de som oplossen bij het passeren. De schattenjacht wordt een rekenparcours.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print - Werkbladen Kleuters en Groep 3 als Professionele Oefenbladen Gratis',
        description: `Je schattenjacht is klaar om te downloaden. Klik op "Download" in de rechterbovenhoek. Kies tussen "Werkblad (PDF)" en "Werkblad (JPEG)". PDF is het beste voor printen. JPEG werkt voor digitaal delen.

Selecteer ook of je het antwoordblad wilt downloaden. Vink "Inclusief antwoorden" aan. Je krijgt twee bestanden. Het werkblad voor leerlingen. Het antwoordblad voor jezelf. Beide in 300 DPI kwaliteit.

De grijswaarden optie bespaart inkt. Vink deze aan voor zwart-wit afdrukken. De schattenjacht blijft perfect herkenbaar. De afbeeldingen zijn nog steeds duidelijk. Maar je printer cartridge gaat driemaal langer mee.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters met Gratis Printables. Werkblad voor Kinderen',
    sectionDescription: 'De schattenjacht generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot ouders die thuisonderwijs geven. Ontdek hoe deze tool past bij jouw situatie en welke voordelen schattenjachten bieden voor werkbladen groep 3 en andere leerjaren.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    showMoreText: 'Meer vragen tonen',
    showLessText: 'Minder vragen',
    badgeText: 'Veelgestelde Vragen',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    secureCheckout: 'Veilige betaling',
    cancelAnytime: 'Altijd opzegbaar',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing Section
  pricing: {
    title: 'Volledige Toegang',
    price: '€240',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
    ctaText: 'Start Nu Met Maken',
    bundleDescription: 'Uw abonnement geeft toegang tot alle 33 werkbladgeneratoren:',
    bundleApps: [
      'Sommen met Plaatjes',
      'Alfabettrein',
      'Groot of klein',
      'Plaatjesbingo',
      'Grafieken tellen en kleuren',
      'Code-optellen',
      'Kleurplaten',
      'Beeldkruiswoordpuzzel',
      'Beeldcryptogram',
      'Tekenen en kleuren',
      'Lijnen Trekken',
      'Zoek en Tel',
      'Voorwerpen zoeken',
      'Rooster koppelen',
      'Koppelspel',
      'Rekenpuzzel',
      'Rekenwerkbladen',
      'Ontbrekende stukjes',
      'Meer of minder',
      'Welke hoort er niet bij',
      'Patronentrein',
      'Patroonwerkbladen',
      'Plaatjespad',
      'Plaatjes sorteren',
      'Voorzetsels',
      'Schaduw koppelen',
      'Aftrekken',
      'Sudoku voor Kinderen',
      'Schatzoeken',
      'Woord raden',
      'Letterkraker',
      'Woordzoekers',
      'Schrijfoefeningen',
    ],
    benefits: [
      'Alle 33 werkblad generators',
      'Onbeperkte werkbladen maken',
      '3000+ afbeeldingen bibliotheek',
      'Commerciële licentie inbegrepen',
      '11 talen ondersteuning',
      '300 DPI professionele kwaliteit',
      'PDF en JPEG downloads',
      'Geen watermerk',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Gratis Werkbladen Combineren - Werkblad voor Kinderen en Gratis Printables',
    ctaTitle: 'Klaar om Geweldige Werkbladen te Maken?',
    ctaDescription: 'Sluit je aan bij duizenden leerkrachten die professionele werkbladen maken met LessonCraft Studio.',
    primaryCtaText: 'Start Gratis Proefperiode',
    secondaryCtaText: 'Bekijk Alle 33 Apps',
    badgeText: 'Werkt Uitstekend Met',
    exploreText: 'Ontdek alle apps',
    trustBadges: {
      securePayment: 'Veilige betaling',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default treasureHuntNlContent;
