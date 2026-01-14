import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Puzzle Worksheets - Dutch Content (Rekenpuzzels Werkbladen)
 *
 * File: frontend/content/product-pages/nl/rekenpuzzels-werkbladen.ts
 * URL: /nl/apps/rekenpuzzels-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/math-puzzle.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * App Tier: FULL ACCESS (€240/year) - Volledige Toegang
 *
 * Dutch Keywords:
 * 1. Werkbladen groep 3
 * 2. Werkbladen kleuters
 * 3. Rekenen werkbladen
 * 4. Oefenbladen gratis
 * 5. Tafels oefenen
 * 6. Sommen tot 20
 * 7. Fijne motoriek
 * 8. Kleurplaten
 * 9. Veilig leren lezen
 * 10. Letters leren schrijven oefenen
 */

export const mathPuzzleNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'rekenpuzzels-werkbladen',
    appId: 'math-puzzle',
    title: 'Rekenpuzzels Werkbladen Groep 3 - Oefenbladen Gratis voor Rekenen en Sommen tot 20',
    description: 'Maak professionele rekenpuzzels met onze math puzzle generator voor groep 1 2 en groep 3. Perfect voor leerkrachten die werkbladen kleuters en rekenen werkbladen nodig hebben. Uw Volledige Toegang abonnement geeft u onbeperkte toegang tot het maken van oefenbladen zonder extra kosten per werkblad.',
    keywords: 'rekenpuzzels werkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, rekenen werkbladen, sommen tot 20, tafels oefenen, fijne motoriek, kleurplaten, veilig leren lezen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/rekenpuzzels-werkbladen',
  },

  // Hero Section - FULL text from math-puzzle.md paragraphs 1-3
  hero: {
    title: 'Rekenpuzzels Werkbladen Groep 3',
    subtitle: 'Oefenbladen Gratis voor Rekenen en Sommen tot 20',
    description: `Maak professionele rekenpuzzels met onze math puzzle generator voor groep 1 2 en groep 3. Perfect voor leerkrachten die werkbladen kleuters en rekenen werkbladen nodig hebben. Uw Volledige Toegang abonnement geeft u onbeperkte toegang tot het maken van oefenbladen zonder extra kosten per werkblad. Genereer gepersonaliseerde rekenpuzzels met optellen en aftrekken voor groep 1 2 en groep 3 leerlingen.

Download hoogwaardige PDF oefenbladen in minder dan 3 minuten. Onze rekenpuzzels werkbladen combineren fijne motoriek met tafels oefenen. Ideaal voor rekenen werkbladen groep 3 en werkbladen kleuters die sommen tot 20 leren. De generator maakt automatisch antwoordsleutels aan.

Kies puzzelroosters van 2×2 tot 4×4. Selecteer optellen subtractie of beide bewerkingen. Voeg afbeeldingen toe uit onze bibliotheek van 3000+ kindvriendelijke plaatjes. Upload uw eigen afbeeldingen om werkbladen te personaliseren voor uw leerlingen. Alle rekenpuzzels downloaden als professionele 300 DPI PDF bestanden.`,
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

  // Sample Gallery - REAL file paths from samples/english/math puzzle/
  samples: {
    sectionTitle: 'Rekenpuzzels Voorbeelden',
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

  // Use Cases - FULL text from math-puzzle.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Rekenen Werkbladen Werkbladen Kleuters en Oefenbladen',
    sectionDescription: 'Onze math puzzle generator werkt voor alle educatieve settings. Van groep 1 2 werkbladen kleuters tot groep 3 rekenen werkbladen. Thuisonderwijs ouders tot professionele leerkrachten. Iedereen maakt eenvoudig oefenbladen voor sommen tot 20. Volledige Toegang abonnement ondersteunt alle gebruikers.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [],
    ctaText: 'Nu Starten',
    bundleDescription: 'Uw abonnement geeft toegang tot alle 33 werkbladgeneratoren',
    bundleApps: [],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combineer Rekenpuzzels met Andere Generators - Complete Werkbladen Pakketten',
    sectionDescription: 'LessonCraft Studio platform biedt 33 verschillende worksheet generators. Rekenpuzzels combineren perfect met andere werkblad types. Maak complete lespakketten die meerdere vaardigheden oefenen. Één thema, meerdere werkblad formats voor versterkte leren.',
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

export default mathPuzzleNlContent;
