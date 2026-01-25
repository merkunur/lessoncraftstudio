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
    title: 'Zoek en Tel Generator - Gratis Werkblad voor Kinderen met Werkbladen',
    description: 'Maak professionele zoek-en-tel werkbladen in enkele minuten. Deze interactieve werkblad generator combineert visueel zoeken met tellen. Met je Basispakket.',
    keywords: 'zoek en tel werkbladen, rekenen werkbladen, werkbladen groep 3, werkbladen kleuters, sommen tot 20, oefenbladen gratis, tafels oefenen, veilig leren lezen, fijne motoriek, letters leren',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/zoek-en-tel-werkbladen',
      },

  // Hero Section - FULL text from find-and-count.md paragraphs 1-2
  hero: {
    title: 'Zoek en Tel Generator - Gratis Werkbladen Maker',
    subtitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters en Groep 3',
    description: `Maak professionele zoek-en-tel werkbladen in enkele minuten. Deze interactieve werkblad generator combineert visueel zoeken met tellen. Met je Basispakket abonnement creëer je onbeperkt werkbladen groep 3 zonder extra kosten per werkblad.

De zoek-en-tel generator werkt volledig in het Nederlands. Je kiest afbeeldingen uit de bibliotheek of uploadt eigen plaatjes. Kinderen zoeken specifieke objecten in een rasterpatroon en tellen hoeveel ze vinden. Ideaal voor rekenen werkbladen die visuele discriminatie combineren met getalbegrip.

Zoek-en-tel activiteiten stimuleren meerdere vaardigheden tegelijk. Kinderen oefenen concentratie terwijl ze objecten zoeken. Ze tellen wat ze vinden en noteren het antwoord. Dit combineert observatievaardigheden met rekenen werkbladen doelen.`,
    previewImageSrc: '/samples/dutch/find-and-count/sample-1.jpeg',
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

  // Features Grid - FULL text from find-and-count.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Deze zoek-en-tel werkbladen maker biedt alle functies voor effectief onderwijs. Van eenvoudige telwerkbladen voor kleuters tot complexe zoekpatronen voor groep 4. Ontdek hoe je in enkele minuten professionele werkbladen maakt die visueel zoeken combineren met rekenen werkbladen doelen.',
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

  // How-To Guide - FULL text from find-and-count.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad Maken - Werkblad voor Kleuters Zoek en Tel in 5 Stappen',
    sectionDescription: 'Het maken van een zoek-en-tel werkblad duurt minder dan drie minuten. Volg deze vijf stappen en je hebt een professioneel werkblad klaar. Geen technische kennis vereist. Van thema kiezen tot downloaden in een paar klikken.',
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
        title: 'Stap 1: Gratis Werkblad Inhoud Kiezen - Werkblad voor Kinderen Thema',
        description: `Begin met het selecteren van je afbeeldingen. Je hebt twee opties. Kies een thema uit de bibliotheek. Of upload je eigen plaatjes voor gepersonaliseerde werkbladen kleuters.

De thema-optie werkt het snelst voor sommen tot 20 werkbladen. Selecteer bijvoorbeeld "Dieren" of "Fruit". De generator toont alle beschikbare afbeeldingen in dat thema. Klik op de plaatjes die kinderen moeten zoeken en tellen.

Je selecteert één tot vier verschillende objecten als zoekdoelen. Voor beginners kies je twee objecten. Voor gevorderde leerlingen kun je vier kiezen. Elk object wordt meerdere keren in het raster geplaatst.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Gratis Werkbladen Instellingen - Werkblad voor Kleuters Aanpassen',
        description: `Nu configureer je de rasterinstellingen. Begin met het aantal rijen en kolommen. Kies vijf tot tien voor beide dimensies. Een groter raster betekent meer zoekwerk.

Voor werkbladen kleuters adviseren we een vijf bij vijf raster. Dit geeft 25 vakjes met afbeeldingen. Kinderen kunnen het overzicht bewaren. Het tellen blijft behapbaar voor jonge leerlingen.

Voor werkbladen groep 3 kun je naar zes bij zes of zeven bij zeven. Dit geeft 36 of 49 vakjes. Meer uitdaging voor gevorderde zoekers. De sommen tot 20 blijven binnen bereik.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Gratis Printables Genereren - Werkblad voor Kinderen Aanmaken',
        description: `Klik op de knop "Genereren" om je zoek-en-tel werkblad te maken. Het werkblad verschijnt direct op het canvas. Je ziet het volledige raster met alle afbeeldingen.

De generator plaatst de objecten automatisch in het raster. Sommige afbeeldingen komen vaker voor dan andere. De zoekobjecten zijn willekeurig verspreid. Kinderen moeten echt zoeken om alles te vinden.

Onder het raster verschijnen de zoekopdrachten. Elk zoekobject wordt getoond met een antwoordvakje. Kinderen tellen hoeveel ze vinden en noteren het getal. Perfect voor letters leren combinatie met cijfers.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Gratis Werkblad voor Kinderen Bewerken - Werkblad voor Kleuters Canvas',
        description: `Na het genereren kun je alles aanpassen. Dit is waar de tool echt flexibel wordt. Voeg elementen toe of verwijder wat je niet nodig hebt.

Sleep afbeeldingen naar een andere positie in het raster. Vergroot of verklein objecten met je muis. Draai elementen voor variatie. Verwijder afbeeldingen die niet passen bij je thema.

Voor schrijven oefenen integratie voeg je tekstgebieden toe. Kinderen schrijven de naam van elk zoekobject. Ze tellen appels en schrijven "appel". Rekenen en taalvaardigheid gecombineerd.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Gratis Werkbladen Downloaden - Werkblad voor Kinderen PDF Printen',
        description: `Je werkblad is klaar voor downloaden. Kies tussen PDF en JPEG formaat. PDF werkt het beste voor printen. JPEG is handig voor digitaal delen met ouders.

Het antwoordblad genereer je met één klik. Alle aantallen staan automatisch ingevuld. Kinderen kunnen zelf controleren. Of jij controleert snel een hele stapel.

De grijswaarden optie bespaart inkt voor werkbladen groep 3. Alle afbeeldingen blijven herkenbaar in zwart-wit. Perfect voor scholen met beperkt printbudget. De kwaliteit blijft professioneel.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from find-and-count.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters voor Leerkrachten',
    sectionDescription: 'Zoek-en-tel werkbladen zijn veelzijdig inzetbaar. Van kleuterklas tot bovenbouw. Van klassikaal onderwijs tot thuisonderwijs. Ontdek hoe verschillende gebruikers profiteren van deze generator voor rekenen werkbladen en visuele training.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from find-and-count.md
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Heb je vragen over de zoek-en-tel werkbladen generator? Hier vind je antwoorden op de meest gestelde vragen. Van abonnementskosten tot pedagogische toepassingen.',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default findAndCountNlContent;
