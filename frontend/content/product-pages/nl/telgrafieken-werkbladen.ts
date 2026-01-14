import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Chart Count Worksheets - Dutch Content (Telgrafieken Werkbladen)
 *
 * File: frontend/content/product-pages/nl/telgrafieken-werkbladen.ts
 * URL: /nl/apps/telgrafieken-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/chart-count.md
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

export const chartCountNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'telgrafieken-werkbladen',
    appId: 'chart-count-color',
    title: 'Telgrafieken Werkbladen Maker - Gratis Oefenbladen voor Rekenen en Tellen in Groep 3',
    description: 'Maak professionele telgrafieken werkbladen met onze werkbladen generator. Met je Volledige Toegang abonnement maak je onbeperkt werkbladen zonder extra kosten per werkblad. Deze tool is ideaal voor rekenen werkbladen waarbij kinderen leren tellen en gegevens visualiseren.',
    keywords: 'telgrafieken werkbladen, werkbladen groep 3, werkbladen kleuters, rekenen werkbladen, oefenbladen gratis, kleurplaten, letters leren, schrijven oefenen, tafels oefenen, veilig leren lezen, fijne motoriek, sommen tot 20',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/telgrafieken-werkbladen',
  },

  // Hero Section - FULL text from chart-count.md paragraphs 1-4
  hero: {
    title: 'Telgrafieken Werkbladen Maker',
    subtitle: 'Gratis Oefenbladen voor Rekenen en Tellen in Groep 3',
    description: `Maak professionele telgrafieken werkbladen met onze werkbladen generator. Met je Volledige Toegang abonnement maak je onbeperkt werkbladen zonder extra kosten per werkblad. Deze tool is ideaal voor rekenen werkbladen waarbij kinderen leren tellen en gegevens visualiseren. Download werkbladen als PDF in minder dan 3 minuten.

Telgrafieken zijn perfecte rekenen werkbladen voor werkbladen groep 3 en werkbladen kleuters. Kinderen leren op een speelse manier omgaan met cijfers en grafieken. De generator biedt meer dan 3000 afbeeldingen, allemaal inbegrepen in je abonnement. Combineer plaatjes met telactiviteiten voor effectieve sommen tot 20 oefeningen.`,
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

  // Sample Gallery - REAL file paths from samples/english/chart count/
  samples: {
    sectionTitle: 'Telgrafieken Werkbladen Voorbeelden',
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

  // Use Cases - FULL text from chart-count.md use case sections
  useCases: {
    sectionTitle: 'Wie Gebruikt Telgrafieken Werkbladen - Rekenen Werkbladen voor Elke Onderwijssituatie',
    sectionDescription: 'Telgrafieken werkbladen zijn waardevol voor verschillende onderwijsprofessionals. Van leerkrachten groep 1 2 tot thuisonderwijzers, iedereen vindt passend materiaal. De generator past zich aan elk niveau aan. Ontdek hoe rekenen werkbladen jouw onderwijs versterken.',
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
    sectionTitle: 'Combineer Telgrafieken met Andere Werkbladen - Tafels Oefenen en Veilig Leren Lezen Compleet Pakket',
    sectionDescription: 'Je Volledige Toegang abonnement bevat 33 verschillende werkbladgeneratoren. Combineer telgrafieken met andere tools voor complete lespakketten. Van tafels oefenen tot veilig leren lezen, alles werkt samen. Ontdek de krachtigste combinaties voor jouw onderwijs.',
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

export default chartCountNlContent;
