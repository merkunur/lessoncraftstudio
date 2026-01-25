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
    title: 'Mönster Arbetsblad Gratis | Pattern Train Generator för Förskoleklass',
    description: 'Skapa professionella mönsterigenkänningsarbetsblad med vår Pattern Train-generator. Perfekt för förskoleklass material och matematik arbetsblad.',
    keywords: 'mönster arbetsblad, arbetsblad gratis, förskoleklass material, matematik arbetsblad, matte övningar, finmotorik övningar, bokstäver lära sig, siffror och tal, målarbilder barn, lågstadiet, mönsterigenkänning',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/monster-tag-arbetsblad',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/pattern-train/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis arbetsblad mönster tåg - mönsterigenkänning arbetsblad för förskoleklass',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/pattern-train/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis arbetsblad för barn - mönster tåg arbetsblad för lågstadiet',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/pattern-train/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis utskrifter mönster arbetsblad - AB AAB ABB mönster för förskoleklass',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/pattern-train/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbetsblad för förskoleklass - mönsterigenkänning med tåg tema',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/pattern-train/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbetsblad för barn - ABC AABB mönster övningar gratis',
      },
    ],
  },

  // Hero Section - FULL text from pattern-train.md paragraphs 1-4
  hero: {
    title: 'Mönster Arbetsblad Gratis för Förskoleklass Material',
    subtitle: 'Pattern Train Generator för Matematik Arbetsblad och Mönsterigenkänning',
    description: `Skapa professionella mönsterigenkänningsarbetsblad med vår Pattern Train-generator. Din Full Tillgång-prenumeration ger dig obegränsad tillgång att skapa arbetsblad utan extra avgifter per arbetsblad. Generera anpassade mönster arbetsblad perfekta för förskoleklass material och lågstadiets matematikundervisning. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Pattern Train-generatorn skapar visuella mönsterigenkänningsuppgifter där barn identifierar och fortsätter mönster. Välj mellan fem mönstertyper: AB, AAB, ABB, ABC och AABB. Varje arbetsblad använder bilder istället för abstrakta former vilket gör mönsterigenkänning mer engagerande för förskoleklass material och lågstadiet. Ditt arbetsblad gratis skapas med Full Tillgång-prenumerationen som kostar 240 dollar per år eller 25 dollar per månad.

Använd temabaserade bilder från vårt bibliotek med över 3000 barnvänliga bilder eller ladda upp dina egna bilder för personliga mönster arbetsblad. Generatorn skapar både arbetsblad och facit automatiskt vilket sparar dig timmar av manuellt arbete. Perfekt för matematik arbetsblad och matte övningar i mönsterigenkänning som är centrala färdigheter i förskoleklass och årskurs 1-3.

Full Tillgång-prenumerationen inkluderar kommersiell print-on-demand-licens. Sälj dina mönster arbetsblad på Teachers Pay Teachers, Etsy eller Amazon KDP utan extra licensavgifter. Skapa obegränsat med arbetsblad i alla 11 språk som stöds inklusive svenska.`,
    previewImageSrc: '/samples/swedish/pattern-train/sample-1.jpeg',
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
    sectionTitle: 'Gratis Arbetsblad för Barn - Gratis Arbetsblad och Gratis Utskrifter',
    sectionDescription: 'Ladda ner gratis utskrifter - Gratis arbetsblad för barn av professionell kvalitet. Gratis arbetsblad och arbetsblad för barn perfekt för arbetsblad för förskoleklass. Gratis arbetsblad för barn och arbetsblad för barn inkluderar utbildningsmaterial. Gratis arbetsblad och gratis utskrifter tillgänglig',
    downloadLabel: 'Ladda Ner Gratis Exempel',
    worksheetLabel: 'Arbetsblad',
    answerKeyLabel: 'Facit',
    viewAllLabel: 'Visa större',
    noPdfLabel: 'Endast förhandsgranskning',
    freePdfCountLabel: 'gratis nedladdningar',
    badgeText: 'Gratis Exempel',
    downloadingLabel: 'Laddar ner...',
    ofLabel: 'av',
    items: [
      {
        id: 'sample-1',
        worksheetSrc: '/samples/swedish/pattern-train/sample-1.jpeg',
        answerKeySrc: '/samples/swedish/pattern-train/sample-1.jpeg',
        altText: 'Gratis arbetsblad mönster tåg - mönsterigenkänning arbetsblad för förskoleklass',
        imageTitle: 'Gratis arbetsblad mönster tåg',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/swedish/pattern-train/sample-2.jpeg',
        answerKeySrc: '/samples/swedish/pattern-train/sample-2.jpeg',
        altText: 'Gratis arbetsblad för barn - mönster tåg arbetsblad för lågstadiet',
        imageTitle: 'Gratis arbetsblad för barn',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/swedish/pattern-train/sample-3.jpeg',
        answerKeySrc: '/samples/swedish/pattern-train/sample-3.jpeg',
        altText: 'Gratis utskrifter mönster arbetsblad - AB AAB ABB mönster för förskoleklass',
        imageTitle: 'Gratis utskrifter mönster arbetsblad',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/swedish/pattern-train/sample-4.jpeg',
        answerKeySrc: '/samples/swedish/pattern-train/sample-4.jpeg',
        altText: 'Arbetsblad för förskoleklass - mönsterigenkänning med tåg tema',
        imageTitle: 'Arbetsblad för förskoleklass',
      },
      {
        id: 'sample-5',
        worksheetSrc: '/samples/swedish/pattern-train/sample-5.jpeg',
        answerKeySrc: '/samples/swedish/pattern-train/sample-5.jpeg',
        altText: 'Arbetsblad för barn - ABC AABB mönster övningar gratis',
        imageTitle: 'Arbetsblad för barn',
      },
    ],
    
  },

  // Features Grid - FULL descriptions from pattern-train.md H3 sections
  features: {
    sectionTitle: 'Gratis Arbetsblad och Arbetsblad för Barn - Gratis Utskrifter och Arbetsblad för Förskoleklass',
    sectionDescription: 'Vår Pattern Train-generator kombinerar kraftfulla funktioner med användarvänlighet för att skapa professionella mönsterigenkänningsarbetsblad. Din Full Tillgång-prenumeration ger dig tillgång till alla verktyg du behöver för att skapa anpassade matematik arbetsblad och matte övningar för förskoleklass material och lågstadiet. Varje funktion är designad för att spara tid samtidigt som den levererar arbetsblad gratis med högsta kvalitet för din undervisning.',
    highlightBadgeText: 'Nyckelfunktion',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    badgeText: 'Funktioner',
    trustBadges: {
      allFeatures: 'Alla funktioner ingår',
      noHiddenFees: 'Inga dolda avgifter',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from pattern-train.md Step sections
  howTo: {
    sectionTitle: 'Gratis Arbetsblad för Barn Skapa - Arbetsblad för Förskoleklass och Gratis Utskrifter',
    sectionDescription: 'Skapa professionella mönsterigenkänningsarbetsblad på under 3 minuter. Denna steg-för-steg-guide visar exakt hur man använder Pattern Train-generatorn för att skapa arbetsblad gratis för förskoleklass material och lågstadiets matte övningar. Ingen tidigare designerfarenhet krävs. Följ dessa fem enkla steg och du har färdiga matematik arbetsblad redo att skriva ut.',
    ctaText: 'Börja Skapa Nu',
    badgeText: 'Så Fungerar Det',
    stepLabel: 'Steg',
    completionTitle: 'Klart!',
    completionSubtitle: 'Ditt arbetsblad är redo',
    readyTime: 'Klart på under 3 minuter',
    noSkillsNeeded: 'Inga designkunskaper behövs',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Välj Mönstertyp och Bilder',
        description: `Börja med att välja ditt mönstertyp från fem alternativ: AB, AAB, ABB, ABC eller AABB. AB-mönster är enklast och perfekt för förskoleklass material. AAB och ABB-mönster passar årskurs 1. ABC-mönster fungerar bra för årskurs 2. AABB-mönster är mest utmanande för årskurs 3.

Välj sedan hur många ledtrådar du vill visa. Inställningen går från 4 till 10 ledtrådar. Fler ledtrådar betyder enklare arbetsblad eftersom eleverna ser mönstret upprepas fler gånger. Färre ledtrådar gör arbetsblad gratis mer utmanande för äldre elever. För förskoleklass material rekommenderas 6-8 ledtrådar.

Nu väljer du bilder för ditt mönster. Du har tre alternativ. Första alternativet: välj ett tema från rullgardinsmenyn och låt systemet automatiskt välja matchande bilder. Teman inkluderar djur, frukt, fordon, former och mer. Detta är snabbaste sättet att skapa sammanhängande matematik arbetsblad och matte övningar.`,
        icon: '🎯',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar',
        description: `Välj pappersstorlek för dina arbetsblad gratis. Letter Portrait (8,5×11") är standard i USA. A4 Portrait (210×297mm) är standard i Sverige och Europa. Letter Landscape fungerar bra för horisontella tågmönster. A4 Landscape passar också utmärkta för bredare layouter. Fyrkantig storlek (1200×1200) är perfekt för digital användning.

Välj om du vill inkludera namn- och datumfält. Kryssa i rutan om du vill att eleverna ska skriva sina namn överst på arbetsbladet. Detta är särskilt användbart för förskoleklass material där bokstäver lära sig och skriva bokstäver övas genom att skriva eget namn.

Välj sidans bakgrundsfärg. Vit bakgrund är standard och sparar bläck. Ljusblå eller ljusgul bakgrund kan göra arbetsbladet mer visuellt intressant. Välj valfri bakgrundstema om du vill ha dekorativa bakgrundsbilder. Välj valfri ramtema för dekorativa ramar runt arbetsbladet. Ramar ger professionellt utseende till dina arbetsblad gratis.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera Ditt Mönster Arbetsblad',
        description: `Klicka på den stora blå "Skapa"-knappen för att generera ditt mönster arbetsblad. Systemet skapar omedelbart ett komplett arbetsblad baserat på dina inställningar. Hela processen tar mindre än 2 sekunder. Du ser en förhandsvisning av arbetsbladet på arbetsytan direkt framför dig.

Pattern Train skapar automatiskt både arbetsbladet och facit samtidigt. Arbetsbladet visar mönstret med några tomma positioner där eleverna fyller i saknade element. Facit visar det kompletta mönstret med alla positioner ifyllda. Båda versionerna använder exakt samma bilder och layout vilket gör rättning superenkel.

Om du inte är nöjd med resultatet klickar du bara på "Skapa" igen. Varje klick genererar en helt ny layout. Bilderna kan placeras olika. Mönsterelementens storlek kan variera. Tågvagnernas positioner kan ändras. Klicka flera gånger tills du får en layout du gillar. Obegränsad regenerering ingår i din Full Tillgång-prenumeration.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera på Arbetsytan',
        description: `Efter generering kan du redigera varje element direkt på arbetsytan. Klicka på valfri bild för att välja den. Dra bilden till ny position med musen. Rotera bilden genom att dra det runda handtaget. Skala bilden större eller mindre genom att dra hörnhandtagen. Radera bilden genom att trycka på Delete-tangenten.

Lägg till anpassad text för instruktioner eller övningar. Klicka på "Lägg till text till arbetsblad"-knappen i Textverktyg-sektionen. Skriv dina instruktioner. Välj typsnitt från sju barnvänliga alternativ. Justera textstorlek för läsbarhet. Ändra textfärg för visuell påverkan. Lägg till kontur runt text för bättre kontrast mot bakgrunden.

Använd lagerverktygen för att ordna element. Klicka på "Flytta framåt" för att ta fram valda bilden ett lager. "Flytta längst fram" flyttar bilden över alla andra element. "Flytta bakåt" skickar bilden ett lager bakåt. "Flytta längst bak" placerar bilden bakom alla andra element. Kombinera mönsterarbetsblad med målarbilder barn för finmotorik övningar.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner och Skriv Ut',
        description: `Klicka på "Ladda ner"-knappen i övre högra hörnet. En rullgardinsmeny visar alla nedladdningsalternativ. Du kan ladda ner arbetsbladet som JPEG, arbetsbladet som PDF, facit som JPEG eller facit som PDF. Båda formaten exporteras i professionell 300 DPI-kvalitet.

PDF-format rekommenderas för utskrift. PDF-filer bibehåller perfekt bildkvalitet. Ingen komprimering. Inga artefakter. Kristallklara bilder som ser professionella ut. Öppna PDF:en och skriv ut direkt från valfri dator eller enhet. PDF fungerar identiskt på Windows, Mac, iPad och Chromebook.

Kryssa i "Gråskala"-rutan innan nedladdning för att konvertera ditt färgarbetsblad till svartvitt. Gråskaleversionen sparar massvis med bläck. Perfekt för skolor med begränsade utskriftsbudgetar. Ladda ner både arbetsbladet och facit. Skriv ut arbetsbladet för eleverna. Behåll facit för dig själv för snabb rättning. Eller ge facit till äldre elever för självkontroll.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from pattern-train.md persona sections
  useCases: {
    sectionTitle: 'Gratis Arbetsblad för Barn - Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Pattern Train-generatorn möter behoven hos olika typer av pedagoger och föräldrar. Från förskoleklass till årskurs 3 skapar dessa mönster arbetsblad engagerande lärandemöjligheter. Full Tillgång-prenumerationen ger alla användartyper tillgång till professionella verktyg för att skapa arbetsblad gratis med obegränsad kreativ frihet. Upptäck hur Pattern Train passar just dina undervisningsbehov.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - ALL questions from pattern-train.md
  faq: {
    sectionTitle: 'FAQ - Gratis Arbetsblad för Barn och Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Lärare och föräldrar har många frågor om Pattern Train-generatorn innan de prenumererar. Dessa svar behandlar prissättning, användning, kommersiell licensiering och mer. Förståelse av prenumerationsfördelar hjälper pedagoger avgöra om verktyget passar deras undervisningsbehov.',
    showMoreText: 'Visa fler frågor',
    showLessText: 'Visa färre',
    badgeText: 'Vanliga Frågor',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    secureCheckout: 'Säker betalning',
    cancelAnytime: 'Avsluta när som helst',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing
  pricing: {
    title: 'Full Tillgång',
    price: '240$',
    priceInterval: '/år',
    priceSuffix: 'Faktureras årligen',
    benefits: [
      'Obegränsad mönster arbetsblad',
      'Fem mönstertyper (AB, AAB, ABB, ABC, AABB)',
      'Automatiska facit',
      '3000+ tematiska bilder',
      '300 DPI utskriftskvalitet',
      'Kommersiell licens ingår',
    ],
    ctaText: 'Börja Skapa Nu',
    bundleDescription: 'Din prenumeration inkluderar tillgang till alla 33 arbetsbladsverktyg',
    bundleApps: [
      'Bildaddition', 'Alfabetståg', 'Stor eller liten', 'Bildbingo',
      'Räknediagram', 'Kodaddition', 'Målarbilder', 'Bildkorsord',
      'Bildkryptogram', 'Rita och färglägg', 'Rita linjer', 'Hitta och räkna',
      'Hitta föremålen', 'Rutnätsmatchning', 'Matchningsspel', 'Mattepussel',
      'Matteuppgifter', 'Saknade bitar', 'Mer eller mindre', 'Vilket hör inte hemma',
      'Mönsterståg', 'Mönsterövningar', 'Bildväg', 'Sortera bilder',
      'Prepositioner', 'Skuggmatchning', 'Subtraktion', 'Barnsudoku',
      'Skattjakt', 'Gissa ordet', 'Ordmix', 'Ordletare', 'Skrivövningar',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Gratis Arbetsblad Kombinera - Arbetsblad för Barn och Gratis Utskrifter',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default patternTrainSvContent;
