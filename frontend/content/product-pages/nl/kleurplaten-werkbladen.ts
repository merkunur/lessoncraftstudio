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
    title: 'Kleurplaten Gratis Werkblad Generator - Gratis Werkbladen voor',
    description: 'Maak professionele kleurplaten met onze gratis werkbladen generator. Met je Basispakket abonnement krijg je onbeperkt toegang tot werkblad voor kinderen maken.',
    keywords: 'kleurplaten, gratis werkblad, gratis werkbladen, gratis printables, werkblad voor kinderen, werkblad voor kleuters, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/kleurplaten-werkbladen',
      },

  // Hero Section - FULL text from coloring.md paragraphs 1-4
  hero: {
    title: 'Gratis Werkblad Kleurplaten Generator - Gratis Werkbladen Maken',
    subtitle: 'Gratis Printables Kleurplaten - Werkblad voor Kinderen en Werkblad voor Kleuters',
    description: `Maak professionele kleurplaten met onze gratis werkbladen generator. Met je Basispakket abonnement krijg je onbeperkt toegang tot werkblad voor kinderen maken zonder extra kosten. Download gratis printables als PDF of JPEG en print ze direct uit. Ideaal voor leerkrachten die werkblad voor kleuters nodig hebben.

Onze kleurplaten generator is speciaal ontwikkeld voor het basisonderwijs als gratis werkblad oplossing. Leerkrachten van groep 1 en 2 gebruiken deze tool dagelijks. Met meer dan 3000 kindvriendelijke afbeeldingen maak je in enkele minuten prachtige gratis werkbladen groep 3. De generator ondersteunt 11 talen waaronder Nederlands.

Kleurplaten zijn essentieel voor de ontwikkeling van jonge kinderen. Ze stimuleren de fijne motoriek en creativiteit. Onze gratis printables werkbladen kleuters bevatten thema's die aansluiten bij het schooljaar. Denk aan seizoenen, dieren, voertuigen en feestdagen. Elk werkblad voor kinderen is bewerkbaar op het canvas.`,
    previewImageSrc: '/samples/dutch/coloring/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/dutch/coloring/
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

  // Features Grid - FULL text from coloring.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Onze kleurplaten generator biedt alle functies die leerkrachten nodig hebben. Van eenvoudig maken tot volledig aanpassen. Hieronder vind je de belangrijkste mogelijkheden. Elke functie is ontworpen met het basisonderwijs in gedachten. Leerkrachten besparen uren per week met deze tool.',
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

  // How-To Guide - FULL text from coloring.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad voor Kinderen Maken - Werkblad voor Kleuters',
    sectionDescription: 'Het maken van professionele kleurplaten kost minder dan 3 minuten. Volg deze vijf stappen en je hebt een compleet werkblad. Geen ontwerpervaring nodig. De generator doet het zware werk voor je.',
    ctaText: 'Nu Starten',
    badgeText: 'Zo werkt het',
    stepLabel: 'Stap',
    completionTitle: 'Klaar!',
    completionSubtitle: 'Je kleurplaat is gereed',
    readyTime: 'Klaar in minder dan 3 minuten',
    noSkillsNeeded: 'Geen ontwerpkennis nodig',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Stap 1: Gratis Werkblad Thema Kiezen - Werkblad voor Kinderen met Dieren of Seizoenen',
        description: `Begin met het kiezen van een thema uit de bibliotheek. Je vindt meer dan 30 thema's. Populaire keuzes zijn dieren, voertuigen en seizoenen.

Elk thema bevat tientallen afbeeldingen. Voor werkbladen groep 3 zijn de schoolthema's ideaal. Kleuters houden van dieren en sprookjes. Selecteer het thema dat past bij je les.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Gratis Werkbladen Afbeeldingen Selecteren - Werkblad voor Kleuters met Plaatjes',
        description: `Na het kiezen van een thema zie je alle beschikbare afbeeldingen. Klik op een afbeelding om deze toe te voegen aan je canvas. Je kunt meerdere afbeeldingen combineren.

Voor letters leren kies je afbeeldingen die beginnen met die letter. Bijvoorbeeld een appel voor de letter A. Oefenbladen gratis maken met thematische afbeeldingen is zo eenvoudig.`,
        icon: '🎯',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Gratis Printables Pagina-instellingen - Werkblad voor Kinderen Aanpassen',
        description: `Kies het juiste paginaformaat voor je doel. Letter of A4 formaat is beschikbaar. Portret of liggend oriëntatie kun je selecteren.

Pas de achtergrondkleur aan indien gewenst. Voeg een decoratieve rand toe uit de bibliotheek. Voor rekenen werkbladen voeg je tekstvelden toe met sommen tot 20. Zo combineer je kleuren met rekenen.`,
        icon: '⚙️',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Gratis Werkblad Canvas Bewerken - Werkblad voor Kleuters Perfectioneren',
        description: `Nu komt het creatieve gedeelte. Sleep afbeeldingen naar de juiste positie. Vergroot of verklein ze met de hoekpunten. Draai afbeeldingen voor een speelse look.

Voeg tekst toe met de gewenste lettertype. Voor fijne motoriek werkbladen voeg je schrijflijnen toe. Werkbladen kleuters krijgen vaak een naamveld bovenaan. Alles is aanpasbaar tot het perfect is.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Gratis Werkbladen Download - Gratis Printables Printen in Hoge Kwaliteit',
        description: `Je kleurplaat is klaar om te downloaden. Kies tussen PDF of JPEG formaat. PDF is ideaal voor printen op school. JPEG werkt goed voor digitaal delen.

Selecteer grijswaarden om inkt te besparen. De oefenbladen gratis downloaden gaat met een klik. Print direct uit op je thuisprinter of op school.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from coloring.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters met Gratis Printables. Werkblad voor Kinderen',
    sectionDescription: 'Onze kleurplaten generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot thuisonderwijzende ouders. Ontdek hoe verschillende groepen de tool gebruiken.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from coloring.md
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Hieronder beantwoorden we de meest gestelde vragen over onze kleurplaten generator. Van abonnementskosten tot printmogelijkheden.',
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
      'Onbeperkt kleurplaten maken',
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
    sectionTitle: 'Gratis Werkbladen Combineren - Werkblad voor Kinderen en Gratis Printables',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default coloringNlContent;
