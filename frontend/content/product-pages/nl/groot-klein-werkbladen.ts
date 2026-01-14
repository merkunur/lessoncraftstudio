import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Big Small Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/groot-klein-werkbladen.ts
 * URL: /nl/apps/groot-klein-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/big-small.md
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

export const bigSmallNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'groot-klein-werkbladen',
    appId: 'big-small-app',
    title: 'Groot en Klein Werkbladen Generator - Oefenbladen Gratis voor Kleuters en Groep 3',
    description: 'Maak in enkele minuten professionele groot-klein werkbladen met onze Groot en Klein generator. Met je Volledige Toegang abonnement heb je onbeperkt toegang tot werkbladen kleuters en werkbladen groep 3 zonder extra kosten per werkblad. Download hoogwaardige PDF-werkbladen in minder dan 3 minuten.',
    keywords: 'groot klein werkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, rekenen werkbladen, sommen tot 20, tafels oefenen, veilig leren lezen, letters leren',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/groot-klein-werkbladen',
  },

  // Hero Section - FULL text from big-small.md paragraphs 1-2
  hero: {
    title: 'Groot en Klein Werkbladen',
    subtitle: 'Oefenbladen Gratis voor Kleuters en Groep 3',
    description: `Maak in enkele minuten professionele groot-klein werkbladen met onze Groot en Klein generator. Met je Volledige Toegang abonnement heb je onbeperkt toegang tot werkbladen kleuters en werkbladen groep 3 zonder extra kosten per werkblad. Deze werkbladen ondersteunen de fijne motoriek ontwikkeling van jonge kinderen. Download hoogwaardige PDF-werkbladen in minder dan 3 minuten.

Werkbladen groep 3 en werkbladen kleuters zijn essentieel voor het ontwikkelen van visuele waarneming. Kinderen leren objecten vergelijken op grootte. Dit is een belangrijke vaardigheid voor rekenen werkbladen en sommen tot 20. De oefenbladen gratis online zijn moeilijk te vinden in goede kwaliteit. Onze generator biedt professionele werkbladen met meer dan 3000 afbeeldingen.

De Groot en Klein werkbladen helpen bij de ontwikkeling van fijne motoriek. Kinderen oefenen met omcirkelen en nummeren. Dit ondersteunt later het letters leren en schrijven oefenen. De werkbladen zijn perfect voor veilig leren lezen voorbereiding. Kleuters ontwikkelen hun visuele discriminatie door grootteverschillen te herkennen.`,
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

  // Sample Gallery - REAL file paths from samples/english/big small/
  samples: {
    sectionTitle: 'Groot en Klein Werkbladen Voorbeelden',
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

  // Use Cases - FULL text from big-small.md use case sections
  useCases: {
    sectionTitle: 'Voor Wie Zijn Groot en Klein Werkbladen - Oefenbladen Gratis voor Leerkrachten en Ouders',
    sectionDescription: 'Groot en klein werkbladen zijn geschikt voor diverse gebruikers. Van leerkrachten groep 1 2 tot thuisonderwijzende ouders. De generator maakt werkbladen kleuters en werkbladen groep 3 voor elke situatie. Hieronder beschrijven we wie het meest profiteert van deze oefenbladen gratis.',
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
    sectionTitle: 'Combineer Groot en Klein met Andere Generators - Rekenen Werkbladen en Kleurplaten Platform',
    sectionDescription: 'Het LessonCraftStudio platform biedt 33 werkbladgeneratoren. Groot en Klein combineert perfect met andere apps voor complete lespakketten. Van rekenen werkbladen tot kleurplaten en taalactiviteiten. Hieronder beschrijven we de beste combinaties voor werkbladen kleuters en werkbladen groep 3.',
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

export default bigSmallNlContent;
