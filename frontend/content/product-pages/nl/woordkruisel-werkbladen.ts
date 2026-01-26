import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Scramble Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/woordkruisel-werkbladen.ts
 * URL: /nl/apps/woordkruisel-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/word-scramble.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Dutch Keywords:
 * 1. Woordkruisel
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

export const wordScrambleNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'woordkruisel-werkbladen',
    appId: 'word-scramble',
    title: 'Woordkruisel Generator - Gratis Werkblad voor Kinderen met Werkbladen',
    description: 'Maak in enkele klikken professionele woordkruisels voor je leerlingen. Deze woordkruisel generator is perfect voor leerkrachten in het basisonderwijs.',
    keywords: 'woordkruisel generator, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, letters leren, schrijven oefenen, rekenen werkbladen, veilig leren lezen, sommen tot 20, tafels oefenen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/woordkruisel-werkbladen',
      },

  // Hero Section - FULL text from word-scramble.md paragraphs 1-4
  hero: {
    title: 'Woordkruisel Generator - Gratis Werkbladen Maker',
    subtitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters en Groep 3',
    description: `Maak in enkele klikken professionele woordkruisels voor je leerlingen. Deze woordkruisel generator is perfect voor leerkrachten in het basisonderwijs. Met je Basispakket abonnement ontwerp je onbeperkt werkbladen groep 3 die kinderen uitdagen en vermaken.

De woordkruisel maker werkt volledig in het Nederlands. Je kiest een thema of uploadt eigen afbeeldingen. Binnen drie minuten heb je een afdrukbaar werkblad klaar. Ideaal voor werkbladen kleuters en groep 1 2 die net beginnen met letters leren.

Bij een woordkruisel zien kinderen een afbeelding met daaronder de letters van het woord door elkaar gehusseld. Ze moeten de letters in de juiste volgorde zetten. Dit combineert visueel leren met taalvaardigheid.`,
    previewImageSrc: '/samples/dutch/word-scramble/sample-1.jpeg',
    ctaLabels: {
      tryFree: 'Gratis Uitproberen',
      viewSamples: 'Voorbeelden Bekijken',
    },
    trustBadges: {
      languages: '11 Talen',
      images: '3000+ Afbeeldingen',
      license: 'Commerciele Licentie',
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
        videoId: 'Hc3g5VsSHEU',
        buttonText: 'Woordmix Functies',
        modalTitle: 'Woordmix Handleiding',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/dutch/word-scramble/
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

  // Features Grid - FULL text from word-scramble.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Deze woordkruisel maker biedt alle functies die je nodig hebt. Van simpele puzzels voor kleuters tot uitdagende woordkruisels voor groep 5. Ontdek hoe je in enkele minuten professionele werkbladen maakt met volledige bewerkingsmogelijkheden.',
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

  // How-To Guide - FULL text from word-scramble.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad Maken - Werkblad voor Kleuters in 5 Stappen',
    sectionDescription: 'Het maken van een woordkruisel duurt minder dan drie minuten. Volg deze vijf stappen en je hebt een professioneel werkblad klaar. Geen technische kennis vereist. De generator doet het zware werk voor je.',
    ctaText: 'Nu Starten',
    badgeText: 'Zo werkt het',
    stepLabel: 'Stap',
    completionTitle: 'Klaar!',
    completionSubtitle: 'Je woordkruisel is gereed',
    readyTime: 'Klaar in minder dan 3 minuten',
    noSkillsNeeded: 'Geen ontwerpkennis nodig',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Stap 1: Gratis Werkblad Inhoud Kiezen - Werkblad voor Kinderen Thema Selecteren',
        description: `Begin met het selecteren van je inhoud. Je hebt drie opties. Kies een thema uit de bibliotheek. Selecteer individuele afbeeldingen. Of typ je eigen woordenlijst zonder afbeeldingen.

De thema-optie werkt het snelst voor oefenbladen gratis. Selecteer bijvoorbeeld "Boerderij" of "School". De generator kiest automatisch passende woorden en afbeeldingen. Ideaal voor snelle werkbladen kleuters en groep 3.

Voor letters leren activiteiten werkt de individuele selectie goed. Zoek afbeeldingen die beginnen met dezelfde letter. Maak een puzzel met alleen B-woorden. Of focus op de letters die je deze week behandelt in de klas.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Gratis Werkbladen Instellingen - Werkblad voor Kleuters Aanpassen',
        description: `Nu stel je de puzzelinstellingen in. Begin met het aantal puzzels per pagina. Kies 1 tot 10 woordkruisels. Minder puzzels betekent grotere afbeeldingen en letters.

Voor werkbladen kleuters adviseren we 4 tot 6 puzzels per pagina. De afbeeldingen zijn dan groot genoeg. Kinderen kunnen de letters makkelijk herkennen. Perfect voor fijne motoriek oefeningen met grote schrijfruimte.

Kies de moeilijkheidsgraad via het hintsysteem. "Geen hints" voor de grootste uitdaging. "Makkelijk" toont de helft van de letters. "Normaal" toont een kwart.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Gratis Printables Genereren - Werkblad voor Kinderen Aanmaken',
        description: `Klik op de knop "Aanmaken" om je puzzel te genereren. De woordkruisel verschijnt direct op het canvas. Je ziet de afbeeldingen met daaronder de door elkaar gehusselde letters.

De letters worden willekeurig gerangschikt. Elke keer dat je genereert krijg je een nieuwe variant. Dit is handig voor differentiatie in de klas. Maak meerdere versies voor verschillende leerlingen.

De generator maakt ook automatisch een antwoordblad. Hierop staan de correcte woorden uitgeschreven. Perfect voor zelfcorrectie door leerlingen.`,
        icon: '⚡',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Gratis Werkblad voor Kinderen Bewerken - Werkblad voor Kleuters Canvas',
        description: `Na het genereren kun je alles aanpassen. Het canvas werkt als een eenvoudig tekenprogramma. Sleep elementen met je muis. Vergroot of verklein ze naar wens.

Voeg een titel toe aan je werkbladen groep 3. Typ bijvoorbeeld "Woordkruisel Week 5" bovenaan. Kies een leuk lettertype uit de zeven beschikbare opties. Pas de kleur aan bij je thema.

Maak ruimte voor schrijven oefenen onder de puzzels. Voeg extra lijnen toe voor oefenwoorden. Kinderen kunnen de gevonden woorden meerdere keren overschrijven.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Gratis Werkbladen Downloaden - Werkblad voor Kinderen PDF Printen',
        description: `Je werkblad is klaar. Nu download je het in hoge kwaliteit. Kies tussen PDF en JPEG formaat. PDF werkt het beste voor printen op school of thuis.

Klik op "Download" en selecteer "Werkblad (PDF)". Het bestand wordt opgeslagen op je computer. Open het en print direct. De kwaliteit is 300 DPI voor scherpe letters en afbeeldingen.

Download ook het antwoordblad als je dat wilt. Klik op "Antwoordblad (PDF)". Bewaar dit apart voor correctie. De grijswaarden optie bespaart inkt voor grote aantallen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from word-scramble.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters voor Leerkrachten',
    sectionDescription: 'De woordkruisel generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot ouders die thuisonderwijs geven. Ontdek hoe deze tool past bij jouw situatie en onderwijsdoelen.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from word-scramble.md
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Heb je vragen over de woordkruisel generator? Hieronder vind je antwoorden op de meest gestelde vragen. Van prijzen tot functies en alles daartussenin.',
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
      'Onbeperkt woordkruisels maken',
      'Commerciele licentie inbegrepen',
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
    sectionDescription: 'Je Basispakket abonnement bevat tien populaire werkbladgenerators die perfect samenwerken. Combineer woordkruisels met andere tools voor complete lespakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
    ctaTitle: 'Klaar om geweldige werkbladen te maken?',
    ctaDescription: 'Sluit je aan bij duizenden leerkrachten die professionele werkbladen maken. Onbeperkt genereren, commerciele licentie inbegrepen.',
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

export default wordScrambleNlContent;
