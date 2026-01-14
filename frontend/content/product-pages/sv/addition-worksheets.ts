import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/addition-worksheets.ts
 * URL: /sv/apps/addition-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const additionSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'addition-arbetsblad',
    appId: 'image-addition',
    title: 'Arbetsblad Gratis - Addition och Subtraktion Generator | Matematik Arbetsblad för Förskoleklass',
    description: 'Skapa professionella additionsarbetsblad med vår bildbaserade matematik arbetsblad generator. Generera skräddarsydda utskrivbara matte övningar perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
    keywords: 'arbetsblad gratis, addition och subtraktion, matematik arbetsblad, förskoleklass material, matte övningar, siffror och tal, additionsarbetsblad, multiplikationstabellen, klockan lära sig, bokstäver lära sig, skriva bokstäver, målarbilder barn, finmotorik övningar',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/addition-arbetsblad',
  },

  // Hero Section - FULL text from addition.md paragraphs 1-4
  hero: {
    title: 'Arbetsblad Gratis - Addition och Subtraktion Generator',
    subtitle: 'Matematik Arbetsblad för Förskoleklass',
    description: `Skapa professionella additionsarbetsblad med vår bildbaserade matematik arbetsblad generator. Din Grundpaketsprenumeration ger dig obegränsad arbetsbladskapande utan extra avgifter per arbetsblad. Generera skräddarsydda utskrivbara matte övningar perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Vår additionsgenerator använder bilder och siffror för att göra matematik konkret. Barn lär sig addition och subtraktion genom visuella representationer. Varje matematik arbetsblad kan anpassas med teman, svårighetsgrad och övningsantal. Perfekt för lärare som behöver finmotorik övningar kombinerade med matematik.

Addition och subtraktion är grundläggande färdigheter för förskoleklass material. Våra arbetsblad gratis för utskrift hjälper barn förstå siffror och tal genom konkreta exempel. Grundpaketsprenumerationen inkluderar kommersiell licens och tillgång till 3000+ barnvänliga bilder. Skapa professionella matte övningar snabbare än traditionella metoder.

Verktyget fungerar för alla lärarnivåer. Ingen designerfarenhet behövs. Välj bilder, ställ in svårighetsgrad och generera additionsarbetsblad omedelbart. Varje arbetsblad exporteras i 300 DPI professionell kvalitet. Utmärkt för förskoleklass material och lågstadiet matematik.`,
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

  // Sample Gallery - REAL file paths from samples/english/addition/
  samples: {
    sectionTitle: 'Additionsarbetsblad Exempel',
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

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare, Föräldrar och Pedagoger',
    sectionDescription: 'Additionsgeneratorn används av olika utbildare över hela Sverige. Från förskoleklass till årskurs 3 skapar lärare anpassade matte övningar. Hemundervisande föräldrar uppskattar den pedagogiska flexibiliteten. Specialpedagoger differentierar addition och subtraktion efter elevbehov.',
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
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera additionsarbetsblad med dessa kompletterande generatorer.',
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

export default additionSvContent;
