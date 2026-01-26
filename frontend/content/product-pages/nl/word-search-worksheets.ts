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
    appId: 'wordsearch',
    title: 'Woordzoeker Generator - Gratis Werkblad voor Kinderen',
    description: 'Maak professionele woordzoekers voor het basisonderwijs. Deze gratis woordzoeker generator is perfect voor werkbladen groep 3, werkbladen kleuters en.',
    keywords: 'woordzoeker generator, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, letters leren, veilig leren lezen, rekenen werkbladen, kleurplaten, fijne motoriek, sommen tot 20',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/woordzoeker-werkbladen',
      },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-4
  hero: {
    title: 'Woordzoeker Generator',
    subtitle: 'Gratis Werkbladen voor Kinderen - Oefenbladen voor Werkbladen Groep 3 en Kleuters',
    description: `Maak in een paar klikken professionele woordzoekers voor je leerlingen. Deze gratis woordzoeker generator is perfect voor leerkrachten in het basisonderwijs. Ontwerp werkbladen groep 3 die kinderen uitdagen en vermaken tegelijk.

De woordzoeker maker werkt volledig in het Nederlands. Je kiest een thema of uploadt eigen afbeeldingen. Binnen drie minuten heb je een afdrukbare puzzel klaar. Ideaal voor werkbladen kleuters en groep 1 2 die net beginnen met letters leren.

Traditionele werkbladen kosten veel tijd om te maken. Met deze tool bespaar je uren werk. De generator maakt automatisch een puzzelrooster met de woorden die jij kiest. Je downloadt het resultaat als PDF of afbeelding.`,
    previewImageSrc: '/samples/dutch/wordsearch/sample-1.jpeg',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Bekijk hoe het werkt',
        modalTitle: 'Overzicht van functies',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/dutch/wordsearch/
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
    items: [],
    
  },

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Deze woordzoeker maker biedt alle functies die je nodig hebt. Van simpele puzzels voor kleuters tot uitdagende woordzoekers voor groep 5. Ontdek hoe je in enkele minuten professionele werkbladen maakt.',
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

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad voor Kinderen Maken - Werkblad voor Kleuters',
    sectionDescription: 'Het maken van een woordzoeker duurt minder dan drie minuten. Volg deze vijf stappen en je hebt een professioneel werkblad klaar. Geen technische kennis vereist.',
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
        title: 'Stap 1: Kies Je Inhoud voor Oefenbladen Gratis - Thema of Eigen Woorden voor Letters Leren',
        description: `Begin met het selecteren van je inhoud. Je hebt drie opties. Kies een thema uit de bibliotheek. Selecteer individuele afbeeldingen. Of typ je eigen woordenlijst.

De thema-optie werkt het snelst voor oefenbladen gratis. Selecteer bijvoorbeeld "Boerderij" of "School". De generator kiest automatisch passende woorden. Ideaal voor snelle werkbladen groep 3.

Voor letters leren activiteiten werkt de individuele selectie goed. Zoek afbeeldingen die beginnen met dezelfde letter. Maak een puzzel met alleen B-woorden. Of focus op de letters die je deze week behandelt.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan voor Rekenen Werkbladen en Fijne Motoriek Oefeningen',
        description: `Nu stel je de puzzelinstellingen in. Begin met de roostergrootte. Kies het aantal rijen en kolommen. Van 5x5 voor kleuters tot 30x30 voor gevorderden.

Voor werkbladen kleuters adviseren we een rooster van 8x8. De letters zijn dan groot genoeg. Kinderen kunnen ze makkelijk omcirkelen. Perfect voor fijne motoriek oefeningen.

Groep 3 leerlingen kunnen een 10x10 of 12x12 rooster aan. Dit biedt meer uitdaging. Maar blijft overzichtelijk voor kinderen die net leren lezen.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Je Werkblad met Kleurplaten Elementen en Sommen tot 20 Thema\'s',
        description: `Klik op de knop "Genereren" om je puzzel te maken. De woordzoeker verschijnt direct op het canvas. Je ziet het rooster met alle letters. Daaronder staan de woorden om te zoeken.

De woorden worden willekeurig in het rooster geplaatst. Lege vakjes worden gevuld met andere letters. Het resultaat is een unieke puzzel. Elke keer dat je genereert krijg je een nieuwe variant.

De generator maakt ook automatisch een antwoordblad. Hierop zijn alle woorden gemarkeerd. Perfect voor zelfcorrectie door leerlingen. Of voor snelle controle door de leerkracht.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Werkbladen Groep 3 Personaliseren met Schrijven Oefenen',
        description: `Na het genereren kun je alles aanpassen. Het canvas werkt als een eenvoudig tekenprogramma. Sleep elementen met je muis. Vergroot of verklein ze naar wens.

Voeg een titel toe aan je werkbladen groep 3. Typ bijvoorbeeld "Woordzoeker Week 5" bovenaan. Kies een leuk lettertype. Pas de kleur aan bij je thema.

De bewerkingsmogelijkheden zijn eindeloos. Voeg extra afbeeldingen toe uit de bibliotheek. Sleep ze naar een lege plek op het werkblad. Maak ruimte voor schrijven oefenen onder de puzzel.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print - Oefenbladen Gratis als PDF met Tafels Oefenen Combinaties',
        description: `Je werkblad is klaar. Nu download je het in hoge kwaliteit. Kies tussen PDF en JPEG formaat. PDF werkt het beste voor printen.

Klik op "Download" en selecteer "Werkblad (PDF)". Het bestand wordt opgeslagen op je computer. Open het en print direct. De kwaliteit is 300 DPI voor scherpe resultaten.

De gratis versie bevat een klein watermerk. Dit is niet storend voor klassikaal gebruik. Voor werkbladen zonder watermerk kies je een betaald abonnement.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters met Gratis Printables. Werkblad voor Kinderen',
    sectionDescription: 'De woordzoeker generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot ouders die thuisonderwijs geven. Ontdek hoe deze tool past bij jouw situatie.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from wordsearch.md
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Heb je vragen over de woordzoeker generator? Hieronder vind je antwoorden op de meest gestelde vragen. Van prijzen tot functies en alles daartussen.',
    showMoreText: 'Meer vragen tonen',
    showLessText: 'Minder tonen',
    badgeText: 'Veelgestelde vragen',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    secureCheckout: 'Veilig betalen',
    cancelAnytime: 'Altijd opzegbaar',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Word Search is FREE but needs subscription for no-watermark/commercial
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default wordSearchNlContent;
