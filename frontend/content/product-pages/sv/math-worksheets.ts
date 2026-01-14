import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/math-worksheets.ts
 * URL: /sv/apps/matematik-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/math-worksheet.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const mathWorksheetsSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'matematik-arbetsblad',
    appId: 'math-worksheet',
    title: 'Matematik Arbetsblad Generator - Gratis Arbetsblad för Förskoleklass och Lågstadiet',
    description: 'Skapa professionella matematik arbetsblad med vår enkla generator för matte övningar. Generera anpassade arbetsblad perfekta för förskoleklass, årskurs 1-3. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
    keywords: 'matematik arbetsblad, arbetsblad gratis, matte övningar, förskoleklass material, addition och subtraktion, siffror och tal, multiplikationstabellen, klockan lära sig, bokstäver lära sig, målarbilder barn, finmotorik övningar',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/matematik-arbetsblad',
  },

  // Hero Section - FULL text from math-worksheet.md paragraphs 1-4
  hero: {
    title: 'Matematik Arbetsblad Generator - Gratis Arbetsblad för Förskoleklass och Lågstadiet',
    subtitle: 'Skapa Professionella Matte Övningar',
    description: `Skapa professionella matematik arbetsblad med vår enkla generator för matte övningar. Din Grundpaketsprenumeration ger dig obegränsad tillgång att skapa arbetsblad utan extra avgifter per arbetsblad. Generera anpassade matematik arbetsblad perfekta för förskoleklass, årskurs 1, årskurs 2 och årskurs 3. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Vår matematik arbetsblad generator använder bilder som symboler i matteproblem. Perfekt för små barn som lär sig addition och subtraktion genom visuellt lärande. Barn räknar äpplen, stjärnor, bilar eller andra roliga bilder istället för abstrakta siffror. Detta gör matte övningar mer engagerande och lättare att förstå för förskoleklass och tidiga lågstadiet.

Skapa obegränsat med arbetsblad för alla matteämnen. Din prenumeration inkluderar tillgång till över 3000 barnvänliga bilder organiserade i teman. Välj djur, mat, fordon, leksaker eller ladda upp dina egna bilder. Varje matematik arbetsblad kan anpassas fullständigt med bakgrunder, ramar, textverktyg och professionell 300 DPI utskriftskvalitet.

Grundpaketsprenumerationen kostar 144 dollar per år eller 15 dollar per månad. Detta inkluderar 10 populära arbetsblad-generatorer med kommersiell licens för print-on-demand. Skapa matte övningar för din klass, hemundervisning eller sälj dina egna arbetsblad på Teachers Pay Teachers, Etsy eller Amazon KDP. Inga extra licensavgifter - allt ingår i din prenumeration.`,
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

  // Sample Gallery - REAL file paths from samples/english/math worksheet/
  samples: {
    sectionTitle: 'Matematik Arbetsblad Exempel',
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

  // Use Cases - FULL text from math-worksheet.md use case sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare och Föräldrar',
    sectionDescription: 'Vår matematik arbetsblad generator tjänar många olika användare inom utbildning. Förskoleklass lärare, lågstadielärare, hemundervisande föräldrar och specialpedagoger använder alla denna verktyg dagligen. Varje användartyp hittar unika fördelar som sparar tid och förbättrar undervisningen. Läs hur olika pedagoger använder generatorn för sina specifika behov.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [],
    ctaText: 'Börja Skapa Nu',
    bundleDescription: 'Din prenumeration inkluderar tillgang till 10 arbetsbladsverktyg:',
    bundleApps: [
      'Bildaddition',
      'Alfabetstandriv',
      'Malarbilder',
      'Matematikuppgifter',
      'Ordtrassel',
      'Hitta och Rakna',
      'Matchningsspel',
      'Rita Linjer',
      'Bildbingo',
      'Sudoku',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombinera med Andra Arbetsblad Generatorer',
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera matematik arbetsblad med dessa kompletterande generatorer.',
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

export default mathWorksheetsSvContent;
