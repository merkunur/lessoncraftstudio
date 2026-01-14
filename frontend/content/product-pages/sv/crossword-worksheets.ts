import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Crossword Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/crossword-worksheets.ts
 * URL: /sv/apps/bildkorsord-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/crossword.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const crosswordSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'bildkorsord-arbetsblad',
    appId: 'image-crossword',
    title: 'Bildkorsord Generator - Arbetsblad Gratis för Förskoleklass Material och Bokstäver Lära Sig',
    description: 'Skapa professionella bildkorsord med vår bildkorsordsgenerator. Din Full Tillgång-prenumeration ger dig obegränsad tillgång till att skapa korsord utan extra avgifter per arbetsblad. Generera anpassade utskrivbara bildkorsord perfekta för förskoleklass material och bokstäver lära sig aktiviteter.',
    keywords: 'bildkorsord generator, arbetsblad gratis, förskoleklass material, bokstäver lära sig, korsord barn, bildkorsord, matematik arbetsblad, finmotorik övningar, målarbilder barn, ordförråd',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/bildkorsord-arbetsblad',
  },

  // Hero Section - FULL text from crossword.md paragraphs 1-4
  hero: {
    title: 'Bildkorsord Generator',
    subtitle: 'Arbetsblad Gratis för Förskoleklass Material och Bokstäver Lära Sig',
    description: `Skapa professionella bildkorsord med vår bildkorsordsgenerator. Din Full Tillgång-prenumeration ger dig obegränsad tillgång till att skapa korsord utan extra avgifter per arbetsblad. Generera anpassade utskrivbara bildkorsord perfekta för förskoleklass material och bokstäver lära sig aktiviteter. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Bildkorsord kombinerar bilder med ordkunskap på ett roligt sätt. Eleverna ser bilder och skriver motsvarande ord i korsordsrutan. Detta hjälper barn att lära sig bokstäver samtidigt som de utvecklar ordförråd och stavningsförmåga. Perfekt för svenska klassrum från förskoleklass till årskurs 3.

Vår bildkorsordsgenerator erbjuder över 3000 barnvänliga bilder organiserade efter tema. Välj bilder från vårt bibliotek eller ladda upp dina egna foton. Anpassa allt från bakgrunder och ramar till textstorlek och färg. Skapa unika bildkorsord som passar dina elevers behov och intressen.

Varje bildkorsord exporteras i professionell 300 DPI-kvalitet. Ladda ner som PDF eller JPEG för perfekt utskrift. Full Tillgång-prenumerationen inkluderar kommersiell licens så du kan sälja dina bildkorsord på Teachers Pay Teachers, Etsy eller Amazon KDP. Alla 33 arbetsbladsgeneratorer ingår för endast $240 per år.`,
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

  // Sample Gallery - REAL file paths from samples/english/crossword/
  samples: {
    sectionTitle: 'Bildkorsord Arbetsblad Exempel',
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

  // Use Cases - FULL text from crossword.md use case sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare, Föräldrar och Pedagoger',
    sectionDescription: 'Bildkorsordsgeneratorn passar många olika användare inom svensk utbildning. Från förskollärare till lärarentreprenörer. Varje användargrupp får unika fördelar av vårt verktyg. Skapa arbetsblad gratis med förskoleklass material anpassat för dina elever.',
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
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera bildkorsord arbetsblad med dessa kompletterande generatorer.',
    ctaTitle: 'Redo att Skapa Fantastiska Bildkorsord?',
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

export default crosswordSvContent;
