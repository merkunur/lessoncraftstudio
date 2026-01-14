import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Pattern Train Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/pattern-train-worksheets.ts
 * URL: /sv/apps/monster-tag-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/pattern-train.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * NOTE: Pattern Train is a Full Tillgång app ($240/year), not Baspaket
 */

export const patternTrainSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'monster-tag-arbetsblad',
    appId: 'pattern-train',
    title: 'Mönster Arbetsblad Gratis | Pattern Train Generator för Förskoleklass Material',
    description: 'Skapa professionella mönsterigenkänningsarbetsblad med vår Pattern Train-generator. Perfekt för förskoleklass material och matematik arbetsblad. Ladda ner arbetsblad gratis som högkvalitativa PDF-filer på under 3 minuter.',
    keywords: 'mönster arbetsblad, arbetsblad gratis, förskoleklass material, matematik arbetsblad, matte övningar, finmotorik övningar, bokstäver lära sig, siffror och tal, målarbilder barn, lågstadiet, mönsterigenkänning',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/monster-tag-arbetsblad',
  },

  // Hero Section - FULL text from pattern-train.md paragraphs 1-4
  hero: {
    title: 'Mönster Arbetsblad Gratis för Förskoleklass Material',
    subtitle: 'Pattern Train Generator för Matematik Arbetsblad och Mönsterigenkänning',
    description: `Skapa professionella mönsterigenkänningsarbetsblad med vår Pattern Train-generator. Din Full Tillgång-prenumeration ger dig obegränsad tillgång att skapa arbetsblad utan extra avgifter per arbetsblad. Generera anpassade mönster arbetsblad perfekta för förskoleklass material och lågstadiets matematikundervisning. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Pattern Train-generatorn skapar visuella mönsterigenkänningsuppgifter där barn identifierar och fortsätter mönster. Välj mellan fem mönstertyper: AB, AAB, ABB, ABC och AABB. Varje arbetsblad använder bilder istället för abstrakta former vilket gör mönsterigenkänning mer engagerande för förskoleklass material och lågstadiet. Ditt arbetsblad gratis skapas med Full Tillgång-prenumerationen som kostar 240 dollar per år eller 25 dollar per månad.

Använd temabaserade bilder från vårt bibliotek med över 3000 barnvänliga bilder eller ladda upp dina egna bilder för personliga mönster arbetsblad. Generatorn skapar både arbetsblad och facit automatiskt vilket sparar dig timmar av manuellt arbete. Perfekt för matematik arbetsblad och matte övningar i mönsterigenkänning som är centrala färdigheter i förskoleklass och årskurs 1-3.

Full Tillgång-prenumerationen inkluderar kommersiell print-on-demand-licens. Sälj dina mönster arbetsblad på Teachers Pay Teachers, Etsy eller Amazon KDP utan extra licensavgifter. Skapa obegränsat med arbetsblad i alla 11 språk som stöds inklusive svenska.`,
    previewImageSrc: '',
    ctaLabels: {
      tryFree: 'Prova Gratis',
      viewSamples: 'Visa Exempel',
    },
    trustBadges: {
      languages: '11 Språk',
      images: '3000+ Bilder',
      license: 'Kommersiell Licens',
    },
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    floatingStats: {
      time: '3 min',
      action: 'Skapa & Ladda Ner',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/pattern train/
  samples: {
    sectionTitle: 'Mönster Arbetsblad Exempel',
    sectionDescription: 'Ladda ner gratis exempelarbetsblad för att se vår professionella kvalitet',
    downloadLabel: 'Ladda Ner Gratis Exempel',
    worksheetLabel: 'Arbetsblad',
    answerKeyLabel: 'Facit',
    viewAllLabel: 'Visa större',
    noPdfLabel: 'Endast förhandsgranskning',
    freePdfCountLabel: 'gratis nedladdningar',
    badgeText: 'Gratis Exempel',
    downloadingLabel: 'Laddar ner...',
    ofLabel: 'av',
    items: [],
  },

  // Use Cases - FULL descriptions from pattern-train.md persona sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare, Föräldrar och Pedagoger',
    sectionDescription: 'Pattern Train-generatorn möter behoven hos olika typer av pedagoger och föräldrar. Från förskoleklass till årskurs 3 skapar dessa mönster arbetsblad engagerande lärandemöjligheter. Full Tillgång-prenumerationen ger alla användartyper tillgång till professionella verktyg för att skapa arbetsblad gratis med obegränsad kreativ frihet. Upptäck hur Pattern Train passar just dina undervisningsbehov.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [],
    ctaText: 'Börja Skapa Nu',
    bundleDescription: 'Din prenumeration inkluderar tillgang till alla 33 arbetsbladsverktyg',
    bundleApps: [],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombinera med Andra Arbetsblad Generatorer',
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera mönster arbetsblad med dessa kompletterande generatorer.',
    ctaTitle: 'Redo att Skapa Fantastiska Arbetsblad?',
    ctaDescription: 'Gå med tusentals lärare som skapar professionella arbetsblad. Obegränsad generering, kommersiell licens ingår.',
    primaryCtaText: 'Starta Gratis Provperiod',
    secondaryCtaText: 'Visa Alla 33 Appar',
    badgeText: 'Fungerar Utmärkt Med',
    exploreText: 'Utforska alla appar',
    trustBadges: {
      securePayment: 'Säker betalning',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [],
  },
};

export default patternTrainSvContent;
