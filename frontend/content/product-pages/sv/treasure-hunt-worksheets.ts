import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Treasure Hunt Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/treasure-hunt-worksheets.ts
 * URL: /sv/apps/skattjakt-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/treasure-hunt.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const treasureHuntSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'skattjakt-arbetsblad',
    appId: 'treasure-hunt',
    title: 'Gratis Skattjakt Arbetsblad | Riktningsövningar för Förskoleklass',
    description: 'Skapa professionella skattjakt arbetsblad med vår generator. Generera anpassade utskrivbara riktningsövningar perfekta för förskoleklass material och.',
    keywords: 'skattjakt arbetsblad, riktningsövningar, förskoleklass material, arbetsblad gratis, bokstäver lära sig, väderstreck, upp ner vänster höger, elev material, lågstadiet, finmotorik övningar',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/skattjakt-arbetsblad',
      },

  // Hero Section - FULL text from treasure-hunt.md paragraphs 1-4
  hero: {
    title: 'Gratis Skattjakt',
    subtitle: 'Riktningsövningar för Förskoleklass Material och Lågstadiet',
    description: `Skapa professionella skattjakt arbetsblad med vår skattjakt generator. Din Full Tillgång-prenumeration ger dig obegränsad tillgång till skattjakt utan extra avgifter per arbetsblad. Generera anpassade utskrivbara skattjakt arbetsblad perfekta för förskoleklass material och bokstäver lära sig aktiviteter. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Skattjakt arbetsblad kombinerar riktningsövningar med visuellt lärande på ett engagerande sätt. Eleverna följer steg-för-steg instruktioner för att navigera genom ett 5×5 rutnät av bilder. Detta hjälper barn att lära sig riktningar som upp, ner, höger och vänster samtidigt som de utvecklar läsförståelse. Perfekt för svenska klassrum från förskoleklass till lågstadiet årskurs 3.

Vår skattjakt generator erbjuder över 3000 barnvänliga bilder organiserade efter tema. Välj sex bilder från vårt bibliotek eller ladda upp dina egna foton. Välj mellan grundläggande riktningar för förskoleklass eller väderstreck för äldre elever. Anpassa allt från bakgrunder och ramar till textstorlek och färg. Skapa unika skattjakt arbetsblad som passar dina elevers behov och intressen.`,
    previewImageSrc: '/samples/swedish/treasure-hunt/sample-1.jpeg',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Se hur det fungerar',
        modalTitle: 'Funktionsöversikt',
      },
      appSpecific: {
        videoId: 'flHiBXsYLLA',
        buttonText: 'Skattjakt Funktioner',
        modalTitle: 'Skattjakt Guide',
      },
    },
  },

  // Sample Gallery - Swedish file paths from samples/swedish/treasure-hunt/
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
    items: [],
    
  },

  // Features Grid - FULL text from treasure-hunt.md feature sections
  features: {
    sectionTitle: 'Gratis Arbetsblad och Arbetsblad för Barn - Gratis Utskrifter och Arbetsblad för Förskoleklass',
    sectionDescription: 'Vår skattjakt generator innehåller alla funktioner du behöver för att skapa gratis arbetsblad för barn. Från förskoleklass material till lågstadiet årskurs 3 aktiviteter. Skapa gratis arbetsblad för förskoleklass med bokstäver lära sig fokus eller kombinera med matematik arbetsblad. Varje funktion är utformad för gratis utskrifter med fullständig kreativ kontroll.',
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

  // How-To Guide - FULL text from treasure-hunt.md step sections
  howTo: {
    sectionTitle: 'Skapa Gratis Skattjakt Arbetsblad för Barn i 5 Enkla Steg',
    sectionDescription: 'Skapa gratis arbetsblad för förskoleklass på under 3 minuter med dessa fem enkla steg. Ingen designerfarenhet behövs för att skapa gratis arbetsblad för barn. Full Tillgång-prenumerationen ger dig tillgång till obegränsad skapande av gratis utskrifter och arbetsblad för förskoleklass.',
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
        title: 'Välj Sex Bilder',
        description: `Det första steget är att välja exakt sex bilder för skattjakt rutnätet. Du har två alternativ för bildval. Välj ett tema så väljer generatorn automatiskt sex slumpmässiga bilder från det temat. Eller välj manuellt sex specifika bilder från bildbiblioteket. Båda metoderna fungerar perfekt för att skapa arbetsblad gratis.

Temaval är snabbast för förskoleklass material när du behöver skattjakt snabbt. Välj från teman som djur, mat, fordon eller natur. Generatorn väljer automatiskt sex olika bilder från det temat. Detta sparar tid vid skapande av elev material i stora mängder.

Manuellt bildval ger dig fullständig kontroll över innehållet. Bläddra genom bildbiblioteket eller använd sökfunktionen. Klicka på sex bilder du vill inkludera i skattjakten. Du kan också ladda upp egna bilder och kombinera med biblioteksbilder.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar',
        description: `Det andra steget är att anpassa skattjakt inställningarna. Välj mellan grundläggande riktningar (upp, ner, vänster, höger) för förskoleklass eller väderstreck (norr, söder, öst, väst) för äldre elever i lågstadiet. Grundläggande riktningar är perfekta för 5-7 åringar som precis lär sig spatial orientering.

Välj sidstorlek och layout för ditt arbetsblad gratis. Letter eller A4 format i stående eller liggande. Liggande layout placerar instruktioner till vänster och rutnät till höger. Stående layout placerar instruktioner upptill och rutnät nedtill.

Lägg till bakgrunder och ramar för mer visuellt engagerande arbetsblad. Välj från temabaserade bakgrunder som matchar årstider eller högtider. Justera opacitet för bakgrunder så de inte döljer rutnätet.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera Ditt Arbetsblad',
        description: `Klicka på "Generera" knappen för att skapa ditt skattjakt arbetsblad. Generatorn skapar automatiskt ett 5×5 rutnät med dina sex valda bilder. Algoritmen placerar bilderna utan upprepning i angränsande celler för variation. Generatorn väljer sedan en slumpmässig startposition och skapar sex riktningsförflyttningar genom rutnätet.

Instruktionerna genereras automatiskt på svenska. Exempel: "Starta vid äpple. Flytta 2 uppåt. Flytta 1 höger. Flytta 3 nedåt." Eleverna följer instruktionerna steg för steg för att hitta skatten. Detta tränar läsförståelse och följer flerstegs instruktioner.

Hela genereringsprocessen tar mindre än 3 sekunder. Arbetsbladet visas direkt på skärmen redo för redigering. Varje generering skapar en unik skattjakt även med samma bilder.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera på Canvas',
        description: `Efter generering kan du redigera varje element direkt på canvas. Klicka på rutnätet för att flytta det till en annan position. Dra instruktionslistan till vänster, höger eller centrum. Ändra storlek på element genom att dra i hörnen. Rotera bilder för variation. Ta bort element du inte vill ha.

Lägg till egna textelement för extra instruktioner på svenska. Skriv "Färglägg skatten när du hittar den" för kombinerade målarbilder barn aktiviteter. Lägg till "Skriv bildnamnen nedan" för bokstäver lära sig och skriva bokstäver övning.

Canvas redigeraren inkluderar lagerkontroller för elementordning. Flytta bakgrunder bakom allt annat innehåll. Placera rutnätet framför bakgrunden men bakom text. Ångra och gör om funktioner låter dig experimentera utan risk.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner och Skriv Ut',
        description: `Det sista steget är att ladda ner ditt färdiga skattjakt arbetsblad. Välj mellan PDF och JPEG format beroende på användning. PDF är perfekt för utskrift i högsta kvalitet. JPEG fungerar bra för digital delning via e-post eller lärplattformar. Båda formaten exporteras i 300 DPI professionell kvalitet.

Aktivera gråskala före nedladdning för att spara bläck vid utskrift av arbetsblad gratis. Gråskala-versionen bibehåller all detalj men sparar färgbläck. Perfekt när du skriver ut stora mängder förskoleklass material.

Generera och ladda ner facit separat genom att klicka "Skapa Facit" knappen. Facit visar samma rutnät med en röd cirkel som markerar skattens position. Ladda ner både arbetsblad och facit för komplett elev material.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from treasure-hunt.md use case sections
  useCases: {
    sectionTitle: 'Gratis Skattjakt Arbetsblad för Lärare, Föräldrar och Pedagoger',
    sectionDescription: 'Gratis arbetsblad för barn passar utmärkt för många olika användare och undervisningssituationer. Från förskoleklass lärare till hemundervisande föräldrar. Gratis arbetsblad för förskoleklass från lågstadiet klassrum till specialpedagogik. Varje användargrupp drar nytta av gratis utskrifter för riktningsträning.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - ALL questions from treasure-hunt.md
  faq: {
    sectionTitle: 'FAQ - Gratis Arbetsblad för Barn och Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Vanliga frågor om vår skattjakt generator och gratis arbetsblad för förskoleklass.',
    showMoreText: 'Visa fler frågor',
    showLessText: 'Visa färre',
    badgeText: 'Vanliga Frågor',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    secureCheckout: 'Säker betalning',
    cancelAnytime: 'Avsluta när som helst',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Swedish translations
  pricing: {
    title: 'Full Tillgång',
    price: '240$',
    priceInterval: '/år',
    priceSuffix: 'Faktureras årligen',
    benefits: [
      'Obegränsad arbetsbladskapning',
      'Kommersiell licens ingår',
      '11 språk stöds',
      '3000+ tematiska bilder',
      '300 DPI utskriftskvalitet',
      'Facit ingår',
      'Alla 33 arbetsbladsgeneratorer',
      'Två riktningslägen',
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

  // Related Apps - Swedish translations
  relatedApps: {
    sectionTitle: 'Kombinera Gratis Skattjakt med Andra Arbetsblad Generatorer',
    sectionDescription: 'Din Full Tillgång-prenumeration inkluderar 33 olika arbetsbladsgeneratorer. Kombinera gratis arbetsblad för barn med alfabets arbetsblad, matematik arbetsblad och målarbilder för kompletta lärpaket. Skapa gratis arbetsblad för förskoleklass och lågstadiet.',
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

export default treasureHuntSvContent;
