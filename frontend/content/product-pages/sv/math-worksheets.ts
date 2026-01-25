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
    title: 'Matematik Arbetsblad Generator - Gratis Arbetsblad för Barn',
    description: 'Skapa gratis arbetsblad för barn med vår matematik generator. Perfekt för förskoleklass - ladda ner professionella matte övningar som PDF på 3 minuter.',
    keywords: 'matematik arbetsblad, arbetsblad gratis, matte övningar, förskoleklass material, addition och subtraktion, siffror och tal, multiplikationstabellen, klockan lära sig, bokstäver lära sig, målarbilder barn, finmotorik övningar, gratis arbetsblad för barn, gratis utskrifter, arbetsblad för barn',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/matematik-arbetsblad',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/math/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Matematik arbetsblad gratis - porträttformat övningar för förskoleklass och lågstadiet'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/math/sample-2.jpeg',
        width: 3508,
        height: 2480,
        caption: 'Gratis arbetsblad för barn - landskapsformat matte övningar för förskoleklass'
      },
    ],
  },

  // Hero Section - FULL text from math-worksheet.md paragraphs 1-4
  hero: {
    title: 'Matematik Arbetsblad Generator - Gratis Arbetsblad för Förskoleklass och Lågstadiet',
    subtitle: 'Skapa Professionella Matte Övningar',
    description: `Skapa professionella matematik arbetsblad med vår enkla generator för matte övningar. Din Grundpaketsprenumeration ger dig obegränsad tillgång att skapa arbetsblad utan extra avgifter per arbetsblad. Generera anpassade matematik arbetsblad perfekta för förskoleklass, årskurs 1, årskurs 2 och årskurs 3. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Vår matematik arbetsblad generator använder bilder som symboler i matteproblem. Perfekt för små barn som lär sig addition och subtraktion genom visuellt lärande. Barn räknar äpplen, stjärnor, bilar eller andra roliga bilder istället för abstrakta siffror. Detta gör matte övningar mer engagerande och lättare att förstå för förskoleklass och tidiga lågstadiet.

Skapa obegränsat med arbetsblad för alla matteämnen. Din prenumeration inkluderar tillgång till över 3000 barnvänliga bilder organiserade i teman. Välj djur, mat, fordon, leksaker eller ladda upp dina egna bilder. Varje matematik arbetsblad kan anpassas fullständigt med bakgrunder, ramar, textverktyg och professionell 300 DPI utskriftskvalitet.

Grundpaketsprenumerationen kostar 144 dollar per år eller 15 dollar per månad. Detta inkluderar 10 populära arbetsblad-generatorer med kommersiell licens för print-on-demand. Skapa matte övningar för din klass, hemundervisning eller sälj dina egna arbetsblad på Teachers Pay Teachers, Etsy eller Amazon KDP. Inga extra licensavgifter - allt ingår i din prenumeration.`,
    previewImageSrc: '/samples/swedish/math/sample-1.jpeg',
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
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from math-worksheet.md feature sections
  features: {
    sectionTitle: 'Gratis Arbetsblad och Arbetsblad för Barn - Gratis Utskrifter och Arbetsblad för Förskoleklass',
    sectionDescription: 'Vår matematik arbetsblad generator kombinerar kraftfulla funktioner med enkel användning. Skapa professionella matte övningar på några minuter. Ingen designerfarenhet krävs. Alla verktyg du behöver för att skapa engagerande matematik arbetsblad för förskoleklass och lågstadiet finns här. Varje funktion är utformad för att spara tid åt lärare och föräldrar.',
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

  // How-To Guide - FULL text from math-worksheet.md step sections
  howTo: {
    sectionTitle: 'Hur man Skapar Gratis Arbetsblad för Förskoleklass i 5 Enkla Steg',
    sectionDescription: 'Hela processen från start till färdig PDF tar under 3 minuter. Inga komplicerade verktyg. Ingen designerfarenhet krävs. Bara fem enkla steg som leder till professionella matematik arbetsblad för förskoleklass och lågstadiet. Följ denna guide för att skapa ditt första arbetsblad. Du kommer att bli expert efter första försöket.',
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
        title: 'Välj Innehåll för Matematik Arbetsblad',
        description: `Börja med att välja hur du vill välja bilder för dina matteproblem. Två alternativ finns: använd ett helt tema eller välj individuella bilder. Temaval är snabbast. Klicka på "Djur" för djurmatematik. Klicka på "Mat" för fruktmatematik. Klicka på "Fordon" för fordonsmatematik. Generatorn väljer automatiskt lämpliga bilder från det temat.

Individuell bildval ger mer kontroll. Bläddra genom bildbiblioteket. Klicka på varje bild du vill använda. Bilderna samlas i din "Selected Images Pool". Välj exakt de äpplen, stjärnor och bilar du vill ha i dina matte övningar. Perfekt för att matcha specifika lektionsplan eller elevpreferenser.

Filtrera bildbiblioteket efter tema för att hitta bilder snabbare. Sökfältet låter dig skriva "hund" eller "bil" för att hitta specifika bilder. Bildnamnen visas på svenska när du har valt svenska språket. Detta hjälper barn lära sig ordförråd samtidigt som de löser addition och subtraktion problem. Kombinera språkinlärning med matematikförståelse i samma övning.

Ladda upp egna bilder om du vill använda klassfoto eller elevernas teckningar. Klicka på "Välj filer" under Custom Images. Välj en eller flera bildfiler från din dator. Uppladdade bilder visas i förhandsgranskningen. Använd dem precis som biblioteksbilder för att skapa helt personliga förskoleklass material och arbetsblad gratis design.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar för Matte Övningar',
        description: `Välj svårighetsgrad baserat på dina elevers nivå. Mycket Lätt använder 2 symboler och små tal. Perfekt för förskoleklass som just börjar med siffror och tal. Lätt använder också 2 symboler men lite större talområden. Medium använder 3 symboler för äldre förskoleklass och årskurs 1. Svår använder 4 symboler för årskurs 2-3 som behöver utmaning.

Antal uppgifter väljs mellan 1 och 6 per arbetsblad. Ett arbetsblad med 1-2 uppgifter fungerar för kort övandetid eller grupparbete där varje barn löser en uppgift på tavlan. Arbetsblad med 4-6 uppgifter passar hemläxor eller längre övningstid. Anpassa efter tillgänglig tid och elevernas uthållighet.

Operations-inställningen låter dig välja mellan Addition Only eller Addition & Subtraction. Förskoleklass börjar ofta med bara addition. När barn behärskar addition kan du lägga till subtraktion. Generatorn skapar automatiskt problem som matchar den valda operationen. Varje problem har en lösning som beräknas automatiskt.

Avancerade alternativ inkluderar min- och max-värden för resultat. Begränsa talområdet till 1-10 för nybörjare. Utvidga till 1-20 för mer erfarna elever. "Tillåt negativa resultat" checboxen låter dig inkludera problem där svaret kan bli negativt. Använd detta bara för äldre elever som förstår negativa tal. Skapa matteutmaningar som exakt matchar ditt lektionsmål.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera Arbetsblad Gratis',
        description: `Klicka på "Generera" knappen. Generatorn skapar ditt matematik arbetsblad på några sekunder. Förhandsgranskningen visas på arbetsytan. Varje matteproblem visas med bilder som symboler. Svaret beräknas automatiskt men visas inte på arbetsbladet. Detta ger elever övning att räkna och lösa själva.

Facit genereras samtidigt som arbetsbladet. Byt till "Facit" fliken för att se svaren. Varje matteproblem visar den korrekta lösningen. Använd facit för snabb rättning av elevarbeten. Dela inte facit med elever förrän de försökt lösa uppgifterna själva. Vissa lärare skriver ut facit på baksidan av arbetsbladet för självkontroll.

Om resultatet inte ser ut som du vill, ändra inställningarna och klicka Generera igen. Varje generering skapar nya unika matteproblem. Använd olika bilder varje gång. Generera flera versioner av samma svårighetsgrad för att ge varje elev ett unikt arbetsblad. Detta förhindrar att barn bara kopierar svar från sin granne.

Förhandsgranskningen visar exakt hur arbetsbladet kommer att se ut när det skrivs ut. Alla bakgrunder, ramar, titlar och matteproblem renderas i rätt storlek. Zooma in för att kontrollera detaljer. Zooma ut för att se helheten. Detta sparar tid och papper genom att eliminera testutskrifter.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera på Arbetsytan',
        description: `Canvas-redigeraren låter dig justera allt efter generering. Klicka på valfritt matteproblem för att flytta det. Dra hörnen för att ändra storlek. Använd rotationshandtaget för att vrida elementet. Ta bort matteproblem du inte vill ha med Delete-tangenten. Full kontroll över varje detalj i ditt matematik arbetsblad.

Lägg till egen text med textverktyget. Skriv titlar som "Matte Övningar för Årskurs 1" eller "Addition och Subtraktion Practice". Skriv instruktioner som "Räkna bilderna och skriv svaret". Ändra typsnitt, storlek och färg för att matcha din skolas stil. Lägg till kontur runt text för bättre läsbarhet på färgglada bakgrunder.

Bakgrunder och ramar kan läggas till eller ändras efter generering. Klicka på Page Setup accordion. Välj ett bakgrundstema. Justera opaciteten så bakgrunden inte överskuggar matteproblemen. Välj en ram från rambiblioteket. Anpassa ramens opacitet separat. Skapa säsongsmässiga arbetsblad med julbakgrunder i december eller blommiga bakgrunder på våren.

Lagerverktygen organiserar element framför eller bakom varandra. Flytta matteproblem framför bakgrundsbilder. Skicka dekorativa element bakom text. Justeringsverktygen centrerar objekt eller arrangerar dem i rader. Spara tid genom att automatiskt arrangera element snyggt istället för att justera varje pixel manuellt. Lås element när layouten är perfekt för att undvika oavsiktliga ändringar.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner och Skriv Ut Matematik Arbetsblad',
        description: `Klicka på Download-menyn när ditt matematik arbetsblad är färdigt. Välj mellan JPEG och PDF format. Välj mellan Arbetsblad och Facit. Fyra nedladdningsalternativ finns totalt. Ladda ner arbetsbladet som PDF för att dela digitalt. Ladda ner som JPEG för att infoga i Word-dokument eller presentationer.

Gråskalealternativet konverterar färgarbetsblad till svartvitt innan nedladdning. Detta sparar bläck vid utskrift. Perfekt för skolor med begränsade utskriftsbudgetar. Gråskaleversionen behåller all tydlighet och läsbarhet. Eleverna kan färglägga bilderna som en kombinerad matte och målarbilder barn aktivitet. Finmotorik övningar kombinerat med matematikförståelse.

Alla nedladdningar är 300 DPI professionell kvalitet. Inga pixliga bilder. Perfekt skärpa för utskrift på vilken skrivare som helst. Hemskrivare, skolkopiatorer och kommersiella tryckservices ger alla utmärkta resultat. Ladda ner samma arbetsblad flera gånger. Dela med kollegor. Spara i din digitala filarkiv för framtida användning.

PDF-formatet bevarar exakt layout oavsett vilken enhet som öppnar filen. Skicka PDF till föräldrar för hemundervisning. Ladda upp till Google Classroom. Skriv ut direkt från PDF-läsaren. JPEG-formatet fungerar för att infoga i nyhetsbrev, veckoplanerare eller kunskapskontroller. Båda formaten ger perfekt utskrift för förskoleklass material och lågstadiets matte övningar.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from math-worksheet.md use case sections
  useCases: {
    sectionTitle: 'Gratis Arbetsblad för Barn - Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Vår matematik arbetsblad generator tjänar många olika användare inom utbildning. Förskoleklass lärare, lågstadielärare, hemundervisande föräldrar och specialpedagoger använder alla denna verktyg dagligen. Varje användartyp hittar unika fördelar som sparar tid och förbättrar undervisningen. Läs hur olika pedagoger använder generatorn för sina specifika behov.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from math-worksheet.md
  faq: {
    sectionTitle: 'FAQ - Gratis Arbetsblad för Barn och Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Lärare och föräldrar har många frågor om vår matematik arbetsblad generator. Denna sektion besvarar de vanligaste frågorna om prenumeration, användning och funktioner.',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default mathWorksheetsSvContent;
