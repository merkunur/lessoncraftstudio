import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Bingo Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/picture-bingo-worksheets.ts
 * URL: /sv/apps/bildlotto-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/picture-bingo.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const pictureBingoSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'bildlotto-arbetsblad',
    appId: 'picture-bingo',
    title: 'Gratis Bildlotto Generator | Arbetsblad för Förskoleklass och Lågstadiet',
    description: 'Skapa professionella bildlottokort med vår bildlotto generator. Perfekt för förskoleklass material och lågstadiet. Ladda ner arbetsblad gratis som högkvalitativa PDF-filer på under 3 minuter.',
    keywords: 'bildlotto generator, arbetsblad gratis, förskoleklass material, matematik arbetsblad, bildlottokort, gratis arbetsblad, lågstadiet, bokstäver lära sig, siffror och tal, målarbilder barn',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/bildlotto-arbetsblad',
  },

  // Hero Section - FULL text from picture-bingo.md paragraphs 1-3
  hero: {
    title: 'Gratis Bildlotto Generator',
    subtitle: 'Arbetsblad Gratis för Förskoleklass och Lågstadiet',
    description: `Skapa professionella bildlottokort med vår bildlotto generator. Din Grundpaketet-prenumeration ger dig obegränsad skapande av arbetsblad utan extra avgifter per arbetsblad. Generera anpassade bildlotto arbetsblad perfekta för förskoleklass material och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Bildlotto är ett klassiskt klassrumsspel för att lära barn siffror och tal, bokstäver, och visuell igenkänning. Vår generator skapar unika bingobrickor för varje elev och matchande uppropskort för läraren. Perfekt för matematik arbetsblad, finmotorik övningar, och språkinlärning. Varje bildlotto-arbetsblad är helt redigerbart efter generering.

Använd bildlotto generator för förskoleklass material, lågstadiet aktiviteter, och hemundervisning. Kombinera med våra andra arbetsblad gratis - matematik arbetsblad för addition och subtraktion, målarbilder barn för kreativa pauser, och bokstäver lära sig för läsinlärning. Grundpaketet-prenumerationen inkluderar alla nödvändiga verktyg för moderna lärare som behöver varierade arbetsblad gratis.`,
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

  // Sample Gallery - REAL file paths from samples/english/bingo/
  samples: {
    sectionTitle: 'Bildlotto Arbetsblad Exempel',
    sectionDescription: 'Ladda ner gratis exempelarbetsblad för att se vår professionella kvalitet',
    downloadLabel: 'Ladda Ner Gratis Exempel',
    worksheetLabel: 'Arbetsblad',
    answerKeyLabel: 'Uppropskort',
    viewAllLabel: 'Visa större',
    noPdfLabel: 'Endast förhandsgranskning',
    freePdfCountLabel: 'gratis nedladdningar',
    badgeText: 'Gratis Exempel',
    downloadingLabel: 'Laddar ner...',
    ofLabel: 'av',
    items: [],
  },

  // Use Cases - FULL descriptions from picture-bingo.md persona sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare, Föräldrar och Pedagoger',
    sectionDescription: 'Bildlotto generator passar alla som undervisar barn. Förskoleklass pedagoger, lågstadielärare, hemundervisande föräldrar och specialpedagoger använder våra arbetsblad gratis dagligen. Varje användargrupp hittar unika fördelar med bildlotto för sina specifika behov. Grundpaketet-prenumerationen ger tillgång till alla verktyg för att skapa engagerande förskoleklass material och matematik arbetsblad.',
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
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera bildlotto arbetsblad med dessa kompletterande generatorer.',
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

export default pictureBingoSvContent;
