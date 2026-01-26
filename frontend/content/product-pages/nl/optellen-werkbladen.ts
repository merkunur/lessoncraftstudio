import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/optellen-werkbladen.ts
 * URL: /nl/apps/optellen-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/addition.md
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

export const additionNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'optellen-werkbladen',
    appId: 'addition',
    title: 'Optel Werkbladen Generator - Gratis Werkbladen Optellen voor',
    description: 'Maak professionele optelwerkbladen met plaatjes in enkele minuten. Deze rekenen werkbladen generator is perfect voor leerkrachten in het basisonderwijs.',
    keywords: 'optellen werkbladen, rekenen werkbladen, werkbladen groep 3, werkbladen kleuters, sommen tot 20, oefenbladen gratis, tafels oefenen, veilig leren lezen, fijne motoriek, letters leren, gratis werkblad, gratis werkbladen, gratis printables, werkblad voor kinderen, werkblad voor kleuters',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/optellen-werkbladen',
      },

  // Hero Section - FULL text from addition.md paragraphs 1-4
  hero: {
    title: 'Gratis Optelwerkbladen Generator - Rekenen Werkbladen Maker',
    subtitle: 'Gratis Werkbladen voor Kinderen - Sommen tot 20 voor Groep 3',
    description: `Maak professionele optelwerkbladen met plaatjes in enkele minuten. Deze gratis werkbladen generator is perfect voor leerkrachten in het basisonderwijs. Met je Basispakket abonnement creëer je onbeperkt werkbladen groep 3 zonder extra kosten per werkblad.

De optelwerkbladen maker werkt volledig in het Nederlands. Je kiest afbeeldingen uit de bibliotheek of uploadt eigen plaatjes. Kinderen tellen de afbeeldingen bij elkaar op en schrijven het antwoord. Ideaal voor sommen tot 20 oefeningen in groep 3 en groep 4.

Rekenen met plaatjes maakt abstract tellen concreet. Kinderen zien drie appels plus twee appels. Ze begrijpen direct wat optellen betekent. Deze visuele aanpak werkt beter dan alleen cijfers.`,
    previewImageSrc: '/samples/dutch/addition/sample-1.jpeg',
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
      appSpecific: {
        videoId: '6O5aCzHkh8M',
        buttonText: 'Optellen Functies',
        modalTitle: 'Optellen Tutorial',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/dutch/addition/
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

  // Features Grid - FULL text from addition.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Deze optelwerkbladen maker biedt alle functies die je nodig hebt voor effectief rekenonderwijs. Van gratis werkblad voor kleuters tot uitdagende sommen tot 20 voor groep 4. Ontdek hoe je in enkele minuten professionele gratis werkbladen maakt met vier verschillende oefenmodi.',
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

  // How-To Guide - FULL text from addition.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad voor Kinderen Maken - Werkblad voor Kleuters',
    sectionDescription: 'Het maken van een optelwerkblad duurt minder dan drie minuten. Volg deze vijf stappen en je hebt een professioneel werkblad klaar. Geen technische kennis vereist. Van thema kiezen tot downloaden in een paar klikken.',
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
        title: 'Stap 1: Kies Je Afbeeldingen voor Gratis Werkblad - Thema of Eigen Plaatjes voor Werkblad voor Kleuters',
        description: `Begin met het selecteren van je afbeeldingen. Je hebt twee opties. Kies een thema uit de bibliotheek. Of upload je eigen plaatjes voor gepersonaliseerde werkbladen kleuters.

De thema-optie werkt het snelst voor sommen tot 20 werkbladen. Selecteer bijvoorbeeld "Fruit" of "Dieren". De generator toont alle beschikbare afbeeldingen in dat thema. Klik op de plaatjes die je wilt gebruiken.

Voor werkbladen groep 3 met specifieke thema's werkt de zoekfunctie handig. Typ een woord in het zoekveld. De tool toont direct alle relevante afbeeldingen. Zoek op "bloemen" voor lentethema's of "sneeuw" voor winterwerkbladen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Stel Oefening In voor Gratis Werkbladen - Van Werkblad voor Kinderen tot Rekenen',
        description: `Nu configureer je de oefening. Begin met het aantal opgaven. Kies een tot tien sommen per werkblad. Voor oefenbladen gratis niveau kwaliteit adviseren we zes tot acht opgaven.

Bepaal het getallenbereik voor je rekenen werkbladen. Stel het minimum en maximum aantal items per groep in. Voor kleuters kies je een tot vijf. Voor groep 3 kun je tot tien gaan.

Selecteer de oefenmodus die past bij je les. "Afbeelding + Afbeelding" voor visuele leerlingen. "Afbeelding + Getal" voor de overgang naar abstract rekenen. "Vind het Ontbrekende Getal" voor uitdaging.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Je Gratis Printables met Sommen tot 20 - Direct Klaar voor Groep 3',
        description: `Klik op de knop "Genereren" om je optelwerkblad te maken. Het werkblad verschijnt direct op het canvas. Je ziet alle sommen met afbeeldingen. De antwoordvakjes staan klaar.

De generator plaatst de afbeeldingen automatisch in groepen. Twee appels plus drie appels bijvoorbeeld. Het plusteken staat ertussen als je dat hebt gekozen. Het is-gelijkteken wijst naar het antwoordvak.

Elke keer dat je genereert krijg je een nieuwe variant. De volgorde van afbeeldingen wisselt. De getallen binnen je bereik variëren. Zo maak je snel meerdere werkbladen groep 3 met hetzelfde thema.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Gratis Werkblad voor Kinderen Personaliseren',
        description: `Na het genereren kun je alles aanpassen. Het canvas werkt intuïtief. Sleep elementen met je muis. Vergroot of verklein ze door aan de hoeken te trekken.

Voeg een titel toe aan je rekenen werkbladen. Typ bijvoorbeeld "Optellen met Dieren" bovenaan. Kies een kindvriendelijk lettertype. Pas de kleur aan bij je thema.

Combineer je optelwerkblad met kleurplaten elementen. Voeg decoratieve afbeeldingen toe uit de bibliotheek. Een vrolijke zon in de hoek. Bloemetjes rond de rand. Kinderen vinden versierde werkbladen leuker.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print - Gratis Werkbladen als PDF met Professionele Kwaliteit',
        description: `Je werkblad is klaar voor downloaden. Kies tussen PDF en JPEG formaat. PDF werkt het beste voor printen. De kwaliteit is 300 DPI voor scherpe resultaten.

Klik op "Download" en selecteer "Werkblad (PDF)". Het bestand wordt opgeslagen op je computer. Open het en print direct. De afbeeldingen en tekst zijn helder en scherp.

Download ook het antwoordenblad apart. Klik op "Antwoordblad (PDF)". Bewaar dit voor jezelf of print het voor zelfcorrectie door leerlingen. Tijdbesparend bij het nakijken.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters met Gratis Printables. Werkblad voor Kinderen',
    sectionDescription: 'De optelwerkbladen generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot ouders die thuisonderwijs geven. Ontdek hoe deze tool past bij jouw situatie en onderwijsdoelen.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from addition.md
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Heb je vragen over de optelwerkbladen generator? Hier vind je antwoorden op de meest gestelde vragen. Van abonnementskosten tot technische mogelijkheden.',
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
    sectionDescription: 'De Basispakket bevat tien werkblad generators die perfect samenwerken. Combineer optelwerkbladen met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
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

export default additionNlContent;
