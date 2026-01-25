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
    title: 'Gratis Werkblad Sudoku Generator - Gratis Werkbladen voor Kinderen en',
    description: 'Maak prachtige visuele sudoku puzzels voor jonge kinderen. Onze sudoku werkbladen generator is speciaal ontworpen voor kleuters en basisschoolleerlingen.',
    keywords: 'sudoku werkbladen, werkbladen groep 3, werkbladen kleuters, rekenen werkbladen, oefenbladen gratis, kleurplaten, letters leren, schrijven oefenen, tafels oefenen, veilig leren lezen, fijne motoriek, sommen tot 20',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/sudoku-werkbladen',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/sudoku/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkblad sudoku voor kinderen - makkelijk niveau met plaatjes'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/sudoku/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkblad sudoku voor kleuters - medium moeilijkheidsgraad'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/sudoku/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkbladen sudoku - moeilijk niveau voor groep 3'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/sudoku/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Werkblad voor kinderen sudoku puzzels - gratis printables educatief'
      }
    ],
  },

  // Hero Section - FULL text from sudoku.md paragraphs 1-4
  hero: {
    title: 'Gratis Werkblad Sudoku Generator - Werkblad voor Kinderen',
    subtitle: 'Gratis Werkbladen en Gratis Printables voor Werkblad voor Kleuters',
    description: `Maak prachtige visuele sudoku puzzels voor jonge kinderen. Onze sudoku werkbladen generator is speciaal ontworpen voor kleuters en basisschoolleerlingen. Met je Basispakket abonnement maak je onbeperkt werkbladen kleuters zonder extra kosten per werkblad. In plaats van cijfers gebruiken deze puzzels kleurrijke plaatjes. Perfect voor kinderen die nog niet kunnen rekenen.

Visuele sudoku helpt kinderen logisch denken ontwikkelen. De puzzels zijn ideaal voor werkbladen groep 3 en werkbladen kleuters. Kinderen leren patronen herkennen zonder dat ze cijfers hoeven te kennen. Dit maakt onze sudoku generator perfect voor de jongste leerlingen.

Onze sudoku voor kinderen gebruikt afbeeldingen in plaats van cijfers. Een 4x4 rooster maakt de puzzels behapbaar voor jonge leerlingen. Kies uit meer dan 3000 kindvriendelijke afbeeldingen. Selecteer een thema of kies individuele plaatjes.`,
    previewImageSrc: '/samples/dutch/sudoku/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/dutch/sudoku/
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
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from sudoku.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Onze sudoku werkbladen generator biedt alle functies die je nodig hebt. Van eenvoudige creatie tot professionele downloads. Hieronder vind je de zeven belangrijkste mogelijkheden. Elke functie is ontworpen met leerkrachten en ouders in gedachten. Maak werkbladen kleuters en werkbladen groep 3 zonder technische kennis.',
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

  // How-To Guide - FULL text from sudoku.md step sections
  howTo: {
    sectionTitle: 'Sudoku Werkbladen Maken - Gratis Werkbladen en Gratis Printables in 5 Stappen',
    sectionDescription: 'Maak je eerste sudoku werkblad in minder dan drie minuten. Het proces is eenvoudig en intuïtief. Volg deze vijf stappen voor perfecte resultaten. Geen ervaring met ontwerpen nodig. Iedereen kan professionele werkbladen kleuters en werkbladen groep 3 maken.',
    ctaText: 'Nu Starten',
    badgeText: 'Zo werkt het',
    stepLabel: 'Stap',
    completionTitle: 'Klaar!',
    completionSubtitle: 'Je werkblad is gereed',
    readyTime: 'Klaar in minder dan 3 minuten',
    noSkillsNeeded: 'Geen ontwerpkennis nodig',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Stap 1: Kies Afbeeldingen voor Gratis Werkblad - Thema of Individueel',
        description: `Begin met het selecteren van afbeeldingen voor je puzzel. Je hebt twee opties. Kies een compleet thema of selecteer individuele plaatjes.

Bij themaselectie kiest de generator automatisch vier passende afbeeldingen. Thema's omvatten dieren, voertuigen, fruit, seizoenen en meer. Perfect voor snelle werkbladen groep 3 creatie. Alle plaatjes passen bij elkaar qua stijl.

Voor meer controle selecteer je individuele afbeeldingen. Blader door de bibliotheek met 3000+ plaatjes. Gebruik de zoekfunctie voor specifieke items. Klik op vier afbeeldingen naar keuze. Ze verschijnen in het selectievak.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Stel Moeilijkheidsgraad in - Werkblad voor Kinderen Niveau',
        description: `Kies de moeilijkheidsgraad voor je puzzel. Dit bepaalt hoeveel vakjes leeg blijven. Drie niveaus zijn beschikbaar.

Makkelijk heeft vier lege vakjes. Perfect voor beginners en werkbladen kleuters. Kinderen leren de basisregels zonder frustratie. Ideaal voor eerste kennismaking met sudoku.

Medium bevat zes lege vakjes. Geschikt voor kinderen met enige ervaring. Vergelijkbaar met sommen tot 20 qua uitdaging. Een goede tussenstap naar moeilijker werk.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Gratis Werkbladen - Direct Resultaat Bekijken',
        description: `Klik op de blauwe genereerknop. Je puzzel verschijnt direct op het canvas. Het 4x4 rooster toont je gekozen afbeeldingen. Lege vakjes zijn wit gemarkeerd.

De generator plaatst afbeeldingen volgens sudoku regels. Elke rij bevat elk plaatje precies een keer. Elke kolom bevat elk plaatje precies een keer. Dit garandeert een oplosbare puzzel.

Bekijk het resultaat op het canvas. Zoom in voor details. Controleer of de afbeeldingen duidelijk zichtbaar zijn. Het werkblad is nu klaar voor bewerking of download.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Werkblad voor Kleuters Aanpassen',
        description: `Nu kun je het werkblad volledig aanpassen. Elk element is bewerkbaar. Dit onderscheidt onze tool van statische generators.

Voeg een titel toe bovenaan. Klik op tekst toevoegen. Typ bijvoorbeeld "Sudoku Puzzel" of de naam van je leerling. Kies lettertype, grootte en kleur. Plaats de tekst waar je wilt.

Sleep afbeeldingen naar andere posities. Vergroot of verklein elementen. Draai plaatjes in elke hoek. Verwijder wat je niet nodig hebt. Volledige creatieve vrijheid.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download Gratis Printables als PDF - Werkblad Printen',
        description: `Je werkblad is klaar voor download. Klik op de downloadknop. Kies je gewenste formaat.

PDF is ideaal voor werkbladen groep 3 en kleurplaten combinaties. Het formaat behoudt perfecte kwaliteit. Print meerdere pagina's eenvoudig. Deel bestanden digitaal met collega's.

JPEG werkt uitstekend voor individuele werkbladen. Snel te delen via e-mail of chat. Eenvoudig in te voegen in andere documenten. Beide formaten hebben 300 DPI kwaliteit.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from sudoku.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad Sudoku voor Leerkrachten - Werkblad voor Kinderen en Kleuters',
    sectionDescription: 'Onze sudoku generator is ontworpen voor diverse gebruikers. Van kleuterjuffen tot thuisonderwijzers. Van basisschoolleerkrachten tot ondernemende docenten. Hieronder ontdek je hoe verschillende groepen profiteren. Iedereen vindt werkbladen kleuters en werkbladen groep 3 voor hun specifieke situatie.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from sudoku.md
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Hieronder beantwoorden we de meest gestelde vragen over onze sudoku generator. Van kosten tot mogelijkheden. Van printen tot verkopen. Vind snel antwoord op jouw vraag over werkbladen groep 3 en werkbladen kleuters.',
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
      'Onbeperkt werkbladen maken',
      'Commerciële licentie inbegrepen',
      '11 talen ondersteund',
      '3000+ thematische afbeeldingen',
      '300 DPI afdrukkwaliteit',
      'Antwoordbladen inbegrepen',
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
    sectionTitle: 'Gratis Werkbladen Combineren - Werkblad voor Kinderen en Gratis Printables',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default sudokuNlContent;
