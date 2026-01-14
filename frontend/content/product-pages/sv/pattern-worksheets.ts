import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Pattern Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/pattern-worksheets.ts
 * URL: /sv/apps/monster-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/pattern-worksheet.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * NOTE: Pattern Worksheet is a Full Tillgång app ($240/year), not Baspaket
 */

export const patternWorksheetsSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'monster-arbetsblad',
    appId: 'pattern-worksheet',
    title: 'Mönsterigenkänning Arbetsblad Gratis | Matematik Arbetsblad Generator för Förskoleklass Material',
    description: 'Skapa professionella mönsterigenkänning arbetsblad med vår digitala generator. Din Full Tillgång-prenumeration ger dig obegränsad tillgång till arbetsblad utan extra kostnader. Generera anpassade arbetsblad gratis för förskoleklass och lågstadiet.',
    keywords: 'mönsterigenkänning arbetsblad, arbetsblad gratis, förskoleklass material, matematik arbetsblad, matte övningar, siffror och tal, bokstäver lära sig, finmotorik övningar, målarbilder barn, lågstadiet',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/monster-arbetsblad',
  },

  // Hero Section - FULL text from pattern-worksheet.md paragraphs 1-4
  hero: {
    title: 'Mönster Arbetsblad Gratis',
    subtitle: 'Matematik Arbetsblad Generator för Logiskt Tänkande och Problemlösning',
    description: `Skapa professionella mönsterigenkänning arbetsblad med vår digitala generator. Din Full Tillgång-prenumeration ger dig obegränsad tillgång till arbetsblad utan extra kostnader per ark. Generera anpassade arbetsblad gratis för mönsterigenkänning perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Mönsterigenkänning är en grundläggande matematisk färdighet för barn i förskoleklass och årskurs 1-3. Vårt verktyg hjälper lärare att skapa matematik arbetsblad som utvecklar logiskt tänkande. Eleverna lär sig identifiera och fortsätta mönster med bilder, former och färger. Detta stärker deras problemlösningsförmågor och förberedelser för mer avancerad matematik.

Verktyget passar perfekt för svenskundervisande lärare som behöver förskoleklass material. Du kan skapa mönsterigenkänning arbetsblad på några minuter istället för timmar. Kombinera mönsterigenkänning med andra ämnen som addition och subtraktion, siffror och tal, eller finmotorik övningar. Alla arbetsblad exporteras i professionell 300 DPI-kvalitet redo för utskrift eller försäljning på Teachers Pay Teachers.

Vår generator erbjuder 9 olika mönstertyper från enkla AB-mönster till avancerade ABCD-sekvenser. Välj mellan två frågetyper: tomma rutor där elever fyller i det saknade elementet, eller flervalsfrågor med olika svarsalternativ. Anpassa varje arbetsblad med egna bilder, teman från vårt bibliotek med 3000+ barnvänliga illustrationer, eller ladda upp dina egna foton.`,
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

  // Sample Gallery - REAL file paths from samples/english/pattern worksheet/
  samples: {
    sectionTitle: 'Mönsterigenkänning Arbetsblad Exempel',
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

  // Use Cases - FULL descriptions from pattern-worksheet.md persona sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare, Föräldrar och Pedagoger',
    sectionDescription: 'Mönsterigenkänning arbetsblad tjänar olika undervisningssituationer och elevers behov. Från förskoleklass till årskurs 3 använder lärare dessa arbetsblad för att utveckla logiskt tänkande och problemlösning. Verktyget skapar arbetsblad gratis som passar alla ämnesområden och svårighetsnivåer.',
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
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera mönsterigenkänning arbetsblad med dessa kompletterande generatorer.',
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

export default patternWorksheetsSvContent;
