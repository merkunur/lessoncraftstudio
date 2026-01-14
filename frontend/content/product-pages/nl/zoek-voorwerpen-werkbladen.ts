import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find Objects Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/zoek-voorwerpen-werkbladen.ts
 * URL: /nl/apps/zoek-voorwerpen-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/find-objects.md
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

export const findObjectsNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'zoek-voorwerpen-werkbladen',
    appId: 'find-objects',
    title: 'Zoek de Voorwerpen Werkbladen Generator - Gratis Oefenbladen voor Groep 1 2 en Groep 3',
    description: 'Maak professionele zoekwerkbladen met onze gebruiksvriendelijke generator. Jouw Volledige Toegang abonnement geeft je onbeperkte toegang tot werkbladen voor kleuters en groep 3 leerlingen. Download printklare oefenbladen gratis van extra kosten per werkblad.',
    keywords: 'zoek voorwerpen werkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, visuele discriminatie, veilig leren lezen, letters leren, rekenen werkbladen, I Spy werkbladen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/zoek-voorwerpen-werkbladen',
  },

  // Hero Section - FULL text from find-objects.md paragraphs 1-2
  hero: {
    title: 'Zoek de Voorwerpen Werkbladen',
    subtitle: 'Gratis Oefenbladen voor Groep 1 2 en Groep 3',
    description: `Maak professionele zoekwerkbladen met onze gebruiksvriendelijke generator. Jouw Volledige Toegang abonnement geeft je onbeperkte toegang tot werkbladen voor kleuters en groep 3 leerlingen. Download printklare oefenbladen gratis van extra kosten per werkblad. Genereer in minder dan drie minuten prachtige zoekactiviteiten.

Onze zoekgenerator biedt twee unieke modi voor werkbladen groep 3 en werkbladen kleuters. De eerste modus is "I Spy" waarbij kinderen verborgen voorwerpen zoeken tussen afleidende afbeeldingen. De tweede modus is "Vind de Vreemde Eend" waarbij leerlingen afbeeldingen zonder paar moeten identificeren.

Deze werkbladen kleuters ondersteunen de ontwikkeling van visuele waarneming en fijne motoriek. Kinderen leren vormen herkennen en verschillen opmerken. Perfect voor leerkrachten die werkbladen groep 3 nodig hebben voor visuele training. De oefenbladen gratis downloaden als PDF of JPEG.`,
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

  // Sample Gallery - REAL file paths from samples/english/find objects/
  samples: {
    sectionTitle: 'Zoek de Voorwerpen Werkbladen Voorbeelden',
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

  // Use Cases - FULL text from find-objects.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Zoekwerkbladen voor Werkbladen Kleuters tot Werkbladen Groep 3',
    sectionDescription: 'Onze zoekwerkbladen generator bedient diverse onderwijsprofessionals en ouders. Van kleuterjuffen tot leerkracht-ondernemers. Ontdek hoe verschillende gebruikers profiteren van werkbladen groep 3 en oefenbladen gratis. Elke gebruikersgroep vindt specifieke voordelen voor hun unieke situatie.',
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
    sectionTitle: 'Combineer Zoekwerkbladen met Andere Generators - Complete Werkbladen Pakketten',
    sectionDescription: 'Het Volledige Toegang abonnement bevat drieëndertig werkblad generators die perfect samenwerken. Combineer zoekwerkbladen met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
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

export default findObjectsNlContent;
