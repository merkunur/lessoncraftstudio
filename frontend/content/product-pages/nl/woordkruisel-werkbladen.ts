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
    title: 'Woordkruisel Generator - Oefenbladen Gratis voor Werkbladen Groep 3 en Letters Leren',
    description: 'Maak in enkele klikken professionele woordkruisels voor je leerlingen. Deze woordkruisel generator is perfect voor leerkrachten in het basisonderwijs. Met je Basispakket abonnement ontwerp je onbeperkt werkbladen groep 3 die kinderen uitdagen en vermaken.',
    keywords: 'woordkruisel generator, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, letters leren, schrijven oefenen, rekenen werkbladen, veilig leren lezen, sommen tot 20, tafels oefenen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/woordkruisel-werkbladen',
  },

  // Hero Section - FULL text from word-scramble.md paragraphs 1-4
  hero: {
    title: 'Woordkruisel Generator',
    subtitle: 'Oefenbladen Gratis voor Werkbladen Groep 3 en Letters Leren',
    description: `Maak in enkele klikken professionele woordkruisels voor je leerlingen. Deze woordkruisel generator is perfect voor leerkrachten in het basisonderwijs. Met je Basispakket abonnement ontwerp je onbeperkt werkbladen groep 3 die kinderen uitdagen en vermaken.

De woordkruisel maker werkt volledig in het Nederlands. Je kiest een thema of uploadt eigen afbeeldingen. Binnen drie minuten heb je een afdrukbaar werkblad klaar. Ideaal voor werkbladen kleuters en groep 1 2 die net beginnen met letters leren.

Bij een woordkruisel zien kinderen een afbeelding met daaronder de letters van het woord door elkaar gehusseld. Ze moeten de letters in de juiste volgorde zetten. Dit combineert visueel leren met taalvaardigheid.`,
    previewImageSrc: '',
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
  },

  // Sample Gallery - REAL file paths from samples/english/word scramble/
  samples: {
    sectionTitle: 'Woordkruisel Voorbeelden',
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

  // Use Cases - FULL text from word-scramble.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Werkbladen Groep 3 en Kleurplaten voor Iedereen',
    sectionDescription: 'De woordkruisel generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot ouders die thuisonderwijs geven. Ontdek hoe deze tool past bij jouw situatie en onderwijsdoelen.',
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
    sectionTitle: 'Combineer met Andere Generators - Werkbladen Kleuters en Tafels Oefenen Complete Lespakketten',
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
    items: [],
  },
};

export default wordScrambleNlContent;
