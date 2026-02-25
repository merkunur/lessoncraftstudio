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
    appId: 'addition',
    title: 'Gratis Additionsövning Generator | LessonCraftStudio',
    description: 'Skapa utskrivbara additionsövningar med bilder för förskola till årskurs 3. 3 000+ bilder, anpassa svårighetsgrad och få facit. Ladda ner gratis PDF. PDF.',
    keywords: 'additionsövning generator, additionsövningar gratis, addition arbetsblad förskola, bildbaserade additionsövningar, matematik arbetsblad gratis, plusövningar med bilder, utskrivbara räkneövningar, addition facit, lära sig addera, plusövningar årskurs 1, additionsövningar barn',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/addition-arbetsblad',
      },

  // Hero Section - FULL text from addition.md paragraphs 1-4
  hero: {
    title: 'Additionsövning Generator',
    subtitle: 'Skapa Bildbaserade Additionsövningar från Förskola till Årskurs 3',
    description: `Skapa professionella additionsarbetsblad med vår bildbaserade matematik arbetsblad generator. Din Grundpaketsprenumeration ger dig obegränsad arbetsbladskapande utan extra avgifter per arbetsblad. Generera skräddarsydda utskrivbara matte övningar perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Vår additionsgenerator använder bilder och siffror för att göra matematik konkret. Barn lär sig addition och subtraktion genom visuella representationer. Varje matematik arbetsblad kan anpassas med teman, svårighetsgrad och övningsantal. Perfekt för lärare som behöver finmotorik övningar kombinerade med matematik.

Addition och subtraktion är grundläggande färdigheter för förskoleklass material. Våra arbetsblad gratis för utskrift hjälper barn förstå siffror och tal genom konkreta exempel. Grundpaketsprenumerationen inkluderar kommersiell licens och tillgång till 3000+ barnvänliga bilder. Skapa professionella matte övningar snabbare än traditionella metoder.

Verktyget fungerar för alla lärarnivåer. Ingen designerfarenhet behövs. Välj bilder, ställ in svårighetsgrad och generera additionsarbetsblad omedelbart. Varje arbetsblad exporteras i 300 DPI professionell kvalitet. Utmärkt för förskoleklass material och lågstadiet matematik.`,
    previewImageSrc: '/samples/swedish/addition/sample-1.jpeg',
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
        videoId: '6O5aCzHkh8M',
        buttonText: 'Addition-funktioner',
        modalTitle: 'Addition-handledning',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/addition/
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

  // Features Grid - FULL text from addition.md feature sections
  features: {
    sectionTitle: 'Gratis Arbetsblad och Arbetsblad för Barn - Gratis Utskrifter och Arbetsblad för Förskoleklass',
    sectionDescription: 'Vår additionsgenerator innehåller sju viktiga funktioner som gör det enkelt att skapa professionella matte övningar. Varje funktion är utformad för förskoleklass material och lågstadiet matematik. Grundpaketsprenumerationen ger dig tillgång till alla funktioner utan extra kostnader. Skapa obegränsat med arbetsblad gratis för utskrift med din prenumeration.',
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

  // How-To Guide - FULL text from addition.md step sections
  howTo: {
    sectionTitle: 'Gratis Arbetsblad för Barn Skapa - Arbetsblad för Förskoleklass och Gratis Utskrifter',
    sectionDescription: 'Hela processen från start till färdig PDF tar under 3 minuter. Fem enkla steg ger dig professionella matte övningar. Ingen designerfarenhet krävs för att skapa förskoleklass material. Följ dessa steg för perfekta addition och subtraktion arbetsblad varje gång.',
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
        title: 'Välj Ditt Innehåll',
        description: `Börja med att välja bildinnehåll för dina additionsövningar. Tre alternativ finns tillgängliga. Välj bildtema från dropdown-menyn för snabba val. Bläddra igenom 3000+ enskilda bilder för specifika val. Ladda upp egna bilder för helt personliga matte övningar.

Bildteman grupperar relaterade bilder tillsammans. Djurtema ger lejon, elefanter, hundar och katter. Mattema inkluderar frukter, grönsaker och bakverk. Fordonstemat har bilar, bussar och flygplan. Varje tema innehåller 20-100 barnvänliga bilder perfekta för förskoleklass material.

Välj bilder genom att klicka på dem i biblioteket. Valda bilder flyttas till förhandsvisningsområdet. Antal valda bilder måste matcha antal övningar. Om du vill 5 övningar behöver du 5 bilder minst. Kombinera biblioteksbilder med egna uppladdade bilder fritt.

Sökfunktionen hjälper hitta specifika bilder snabbt. Sök på svenska ord som "äpple" eller "bil". Resultaten filtreras omedelbart. Detta sparar tid när du skapar tematiska matematik arbetsblad. Perfekt för säsongsbaserade eller ämnesintegrerade matte övningar.

Innehållsspråk kan ställas in separat från användargränssnittet. Välj svenska för svenska klassrum. Välj engelska för språkintegrerat lärande. Detta gör addition och subtraktion övningar till språkövningar samtidigt. Elever lär sig siffror och tal på olika språk.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar',
        description: `Ställ in antal övningar från 1 till 10 per arbetsblad. Förskoleklass fungerar bra med 4-6 övningar. Årskurs 1 klarar 8-10 övningar. Färre övningar ger större bilder och tydligare layout. Fler övningar ger mer träning per sida.

Välj minsta och största antal föremål per grupp. För nybörjare använd 1-5 föremål. För mer avancerade elever prova 3-10 föremål. Detta styr svårighetsgrad automatiskt. Små tal passar förskoleklass medan större tal utmanar årskurs 1-2.

Välj övningsläge från fyra alternativ. Bild + Bild visar två bildgrupper barn ska räkna och addera. Bild + Siffra kombinerar en bildgrupp med en siffra för abstrakt tänkande. Hitta Addenden presenterar 3 + ? = 7 där barn hittar saknade talet. Blandat Läge varierar övningstyper på samma arbetsblad för variation.

Inkludera namn- och datumfält om du vill. Praktiskt för arkivering och uppföljning. Visa plustecken mellan bildgrupper för tydlighet. Inkludera övningsnummer för organisering. Använd barnvänlig box för uttrycken för visuellt tilltalande layout. Varje inställning anpassar matte övningar för dina behov.

Välj sidstorlek mellan Letter och A4 format. Stående format passar de flesta additionsarbetsblad. Liggande format fungerar för färre övningar med större bilder. Kvadratiskt format perfekt för Instagram och sociala medier. Anpassad storlek låter dig specificera exakta pixelmått.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera',
        description: `Klicka på Generera-knappen efter att ha valt inställningar. Generatorn skapar ditt additionsarbetsblad på sekunder. Förhandsvisning visas omedelbart på arbetsytan. Alla övningar placeras automatiskt med optimal layout. Facit genereras samtidigt i separat flik.

Generatorn placerar bildgrupper och additionsuttryck smart. Utrymme fördelas jämnt över sidan. Textstorlek anpassas efter antal övningar. Bilder skalas för optimal synlighet. Allt designas för professionellt utseende automatiskt.

Förhandsgranskningsfunktionen låter dig se båda sidorna. Arbetsbladsflik visar elevversionen med tomma svar. Facitflik visar samma övningar med ifyllda svar. Växla mellan flikarna för att kontrollera allt ser korrekt ut. Detta garanterar kvalitet innan utskrift.

Om resultatet inte är perfekt klicka Generera igen. Varje generering skapar ny layout med samma inställningar. Bildplaceringen varierar lite varje gång. Prova några gånger tills du hittar perfekt layout. Ingen begränsning på antal genereringar med Grundpaketet.

Generatorn skapar också facit automatiskt. Varje övning visas med rätt svar. Lärare sparar enormt med tid på rättning. Dela facit med elever för självrättning. Detta gör addition och subtraktion övningar mer självständiga. Perfekt för hemundervisning och individuellt arbete.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera',
        description: `Efter generering kan allt redigeras direkt på arbetsytan. Klicka på vilket element som helst för att välja det. Dra för att flytta till ny position. Använd hörn för att ändra storlek. Rotera med rotationshandtag. Radera med Delete-tangent eller papperskorgikonen.

Textverktyg låter dig lägga till instruktioner eller rubriker. Skriv "Räkna bilderna och skriv svaret" överst. Lägg till elevens namn om arbetsbladet är personligt. Ändra textstorlek, färg och typsnitt. Fem barnvänliga typsnitt ingår. Lägg till konturer för bättre läsbarhet.

Sidverktyg låter dig anpassa bakgrund och ramar. Välj bakgrundstema från dropdown-menyn. Hundratals bakgrunder organiserade efter teman. Julbakgrund för december matematik arbetsblad. Vårblommor för säsongsarbetsblad. Justera opacitet för subtila effekter.

Lägg till bordramer från tembiblioteket. Djurramar för djurtematiska övningar. Sportramar för sporttema. Varje ram förbättrar det visuella utseendet. Ramar gör arbetsblad gratis se professionella ut. Barn engageras mer av visuellt tilltalande material.

Lagerordning kan justeras för överlappande element. Flytta text framför bilder vid behov. Skicka bakgrundselement bakåt. Justeringsverktyg arrangerar flera element perfekt. Vänsterjustera alla övningar för konsekvent layout. Centrera rubriker exakt. Detta ger polish och professionalism.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner',
        description: `Klicka på Ladda Ner-knappen när du är nöjd. Välj mellan flera format. Arbetsbladet finns i JPEG och PDF. Facit finns också i båda formaten. Ladda ner vad du behöver. Många lärare laddar ner alla fyra för fullständig dokumentation.

PDF-format rekommenderas för utskrift. Behåller högsta kvalitet vid alla utskriftsstorlekar. JPEG fungerar bättre för delning digitalt. Perfekt för att e-posta till föräldrar eller dela på skolplattformar. Båda exporteras i 300 DPI professionell kvalitet.

Gråskalealternativ sparar färgbläck dramatiskt. Perfekt för massutskrift av matte övningar. Svart-vita arbetsblad fungerar lika bra pedagogiskt. Många skolor föredrar gråskala för kostnadsbesparing. Växla mellan färg och gråskala med en kryssruta.

Skriv ut på vanlig hemskrivare utan problem. A4-papper passar bäst för svenska klassrum. Letter-storlek fungerar också utmärkt. Professionell kvalitet garanterar skarpa linjer och tydliga bilder. Barn kan läsa och förstå övningarna enkelt.

Spara PDF-filer för återanvändning senare. Bygg ett bibliotek av addition och subtraktion arbetsblad. Organisera efter tema eller svårighetsgrad. Dela med kollegor på din skola. Grundpaketslicensen tillåter delning inom din organisation. Många lärare skapar kompletta årsförråd av matematik arbetsblad.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Gratis Arbetsblad för Barn - Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Additionsgeneratorn används av olika utbildare över hela Sverige. Från förskoleklass till årskurs 3 skapar lärare anpassade matte övningar. Hemundervisande föräldrar uppskattar den pedagogiska flexibiliteten. Specialpedagoger differentierar addition och subtraktion efter elevbehov.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from addition.md
  faq: {
    sectionTitle: 'FAQ - Gratis Arbetsblad för Barn och Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Vanliga frågor om vår additionsgenerator och arbetsblad gratis.',
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
    title: 'Grundpaketet',
    price: '144$',
    priceInterval: '/år',
    priceSuffix: 'Faktureras årligen',
    benefits: [
      'Obegränsad arbetsbladskapning',
      'Kommersiell licens ingår',
      '11 språk stöds',
      '3000+ tematiska bilder',
      '300 DPI utskriftskvalitet',
      'Facit ingår',
    ],
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
    sectionTitle: 'Gratis Arbetsblad Kombinera - Arbetsblad för Barn och Gratis Utskrifter',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default additionSvContent;
