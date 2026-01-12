import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Prepositions Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/prepositions-worksheets.ts
 * URL: /sv/apps/prepositioner-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/prepositions.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Tillgång ($240/year or $25/month)
 * Swedish: Full Tillgång (2 900 SEK/år eller 300 SEK/månad)
 */

export const prepositionsSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'prepositioner-arbetsblad',
    appId: 'prepositions',
    title: 'Prepositioner Arbetsblad Gratis - Förskoleklass Material för Barn',
    description: 'Skapa professionella prepositionsarbetsblad för förskoleklass och lågstadiet. Generera arbetsblad gratis för elever som lär sig rumsliga begrepp. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
    keywords: 'prepositioner arbetsblad, arbetsblad gratis, förskoleklass material, finmotorik övningar, rumsliga begrepp, i på under, bredvid bakom, svenska prepositioner, lågstadiet material',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/prepositioner-arbetsblad',
  },

  // Hero Section - FULL text from prepositions.md paragraphs 1-4
  hero: {
    title: 'Rumsord Arbetsblad',
    subtitle: 'Prepositioner Gratis för Barn',
    description: `Skapa professionella prepositionsarbetsblad för förskoleklass och lågstadiet. Vårt verktyg genererar arbetsblad gratis att ladda ner för elever som lär sig rumsliga begrepp. Perfekt för lärare som behöver finmotorik övningar kombinerat med språkträning.

Din Full Tillgång-prenumeration ger dig obegränsat antal arbetsblad utan extra kostnader. Generera anpassade arbetsblad för prepositioner på svenska eller 10 andra språk. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Verktyget erbjuder 8 vanliga prepositioner: i, på, under, bredvid, bakom, mellan, över och framför. Varje arbetsblad använder bilder och former för att visualisera rumsliga relationer. Eleverna övar prepositioner genom ifyllnadsuppgifter eller flervalsfrågor.

Kombinera prepositionsträning med målarbilder barn gillar. Lägg till egna bilder från klassrummet. Skapa tematiska arbetsblad som passar din undervisning. Allt ingår i Full Tillgång-prenumerationen på 2 900 kronor per år eller 300 kronor per månad.`,
    previewImageSrc: '/samples/english/prepositions/prepositions_worksheet.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/prepositions/
  samples: {
    sectionTitle: 'Prepositioner Arbetsblad Exempel',
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
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/prepositions/prepositions_worksheet.jpeg',
        answerKeySrc: '/samples/english/prepositions/prepositions_answer_key.jpeg',
        altText: 'Prepositioner arbetsblad med ifyllnadsuppgifter för förskoleklass rumsliga begrepp',
        pdfDownloadUrl: '/samples/english/prepositions/prepositions_worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/prepositions/prepositions multiple choice.jpeg',
        answerKeySrc: '/samples/english/prepositions/prepositions multiple choice answer_key.jpeg',
        altText: 'Prepositioner flervalsfrågor arbetsblad för språkträning och rumslig förståelse',
        pdfDownloadUrl: '/samples/english/prepositions/prepositions multiple choice.pdf',
      },
    ],
  },

  // Features Grid - FULL descriptions from prepositions.md H3 sections
  features: {
    sectionTitle: 'Prepositionsarbetsblad Funktioner - Allt du Behöver för Förskoleklass Material och Arbetsblad Gratis',
    sectionDescription: 'Vårt prepositionsverktyg erbjuder omfattande funktioner för att skapa arbetsblad gratis och förskoleklass material. Lärare får tillgång till professionella verktyg som förenklar skapandet av prepositionsarbetsblad.',
    highlightBadgeText: 'Nyckelfunktion',
    badgeText: 'Funktioner',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    trustBadges: {
      allFeatures: 'Alla funktioner inkluderade',
      noHiddenFees: 'Inga dolda avgifter',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Skapa Prepositionsarbetsblad på 3 Klick - Arbetsblad Gratis för Förskoleklass',
        description: 'Välj antal övningar mellan 1 och 8 per arbetsblad. Markera vilka prepositioner som ska övas. Klicka på generera och ditt arbetsblad visas direkt. Hela processen tar under 3 minuter från start till färdigt arbetsblad. Verktyget väljer automatiskt bilder och skapar rumsliga relationer. Du behöver inga designkunskaper eller teknisk erfarenhet. Systemet skapar professionella arbetsblad direkt. Börja använda verktyget utan någon inlärningskurva.',
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Redigera Allt på Prepositionsarbetsbladet - Förskoleklass Material Anpassas Enkelt',
        description: 'Alla element på arbetsblad gratis kan redigeras efter generering. Dra, rotera, ändra storlek eller ta bort vilket objekt som helst. Lägg till egna texter med 7 olika typsnitt. Ändra färger på text och bakgrund efter behov. Lås objekt du vill behålla oförändrade. Flytta element framåt eller bakåt i lager. Använd ångra och gör om för att korrigera misstag. Full redigeringskontroll ger dig exakt det arbetsblad du vill ha.',
        highlighted: false,
      },
      {
        id: '3',
        icon: '🌍',
        title: 'Prepositioner på 11 Språk - Finmotorik Övningar för Flerspråkiga Klasser',
        description: 'Välj mellan 11 språk för prepositionernas visning på arbetsblad. Svenska, engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, danska, norska och finska stöds. Bildnamnen och instruktionerna översätts automatiskt till valt språk. Perfekt för språkklasser och flerspråkiga skolmiljöer. ESL-lärare kan skapa arbetsblad gratis på elevernas modersmål. Internationella skolor får förskoleklass material på alla 11 språk. Växla enkelt mellan språk för olika klasser.',
        highlighted: false,
      },
      {
        id: '4',
        icon: '📤',
        title: 'Ladda Upp Egna Bilder - Målarbilder Barn Känner Igen från Klassrummet',
        description: 'Ladda upp bilder från ditt klassrum eller elevernas vardag. Använd foton av leksaker, klassrumsobjekt eller elevernas favoritsaker. Kombinera uppladdade bilder med vårt bildbibliotek på över 3000 bilder. Skapa personliga arbetsblad som engagerar eleverna mer. Multifiluppladdning låter dig lägga till många bilder samtidigt. Alla vanliga bildformat stöds: JPEG, PNG och GIF. Uppladdade bilder kan användas som objekt eller former. Personalisering ökar elevernas motivation och igenkänning.',
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommersiell Licens Ingår - Sälj Prepositionsarbetsblad på Teachers Pay Teachers',
        description: 'Full Tillgång-prenumeration inkluderar kommersiell print-on-demand-licens utan extra kostnad. Sälj dina prepositionsarbetsblad på Teachers Pay Teachers, Etsy eller Amazon KDP. Ingen attribution krävs för materialet du skapar. Perfekt för lärarentreprenörer som vill sälja undervisningsmaterial. Professionell 300 DPI-kvalitet gör arbetsblad lämpliga för försäljning. Andra plattformar tar 500-2000 kronor extra per år för kommersiella licenser. Med Full Tillgång på 2 900 kronor per år ingår kommersiell licens redan. Börja din Teachers Pay Teachers-butik direkt.',
        highlighted: true,
      },
      {
        id: '6',
        icon: '📚',
        title: '3000+ Bildbibliotek - Arbetsblad Gratis med Tema-baserade Bilder',
        description: 'Tillgång till över 3000 barnvänliga bilder organiserade i teman. Välj djur, fordon, mat, kläder, leksaker och många andra kategorier. Sökfunktion hjälper dig hitta specifika bilder snabbt. Alla bilder ingår i prenumerationen utan extra kostnader. Temaurval förenklar skapandet av sammanhängande arbetsblad. Kombinera bilder från olika teman för varierade övningar. Bakgrunder och ramar ingår också i biblioteket. Komplett bildtillgång utan per-bild-avgifter som konkurrenter tar.',
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionell 300 DPI-kvalitet - Målarbilder Barn Kan Färglägga efter Prepositionsövning',
        description: 'Exportera arbetsblad i högupplöst 300 DPI-kvalitet. Perfekt för utskrift på vanliga skrivare eller professionell tryckning. JPEG- och PDF-format tillgängliga för alla arbetsblad. Gråskaleläge sparar bläck när färg inte behövs. Svarsnyckel genereras automatiskt för lärarens användning. Ladda ner både övningsblad och svarsnyckel i samma format. Professionell kvalitet gör arbetsblad lämpliga att sälja. Tydliga utskrifter även med små detaljer och text.',
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from prepositions.md Step sections
  howTo: {
    sectionTitle: 'Hur du Skapar Prepositionsarbetsblad på 5 Enkla Steg - Arbetsblad Gratis för Förskoleklass Material',
    sectionDescription: 'Skapa professionella prepositionsarbetsblad på under 3 minuter. Vårt verktyg gör processen enkel även för lärare utan designerfarenhet. Följ dessa fem steg för att generera arbetsblad gratis och förskoleklass material. Varje steg tar bara några sekunder att genomföra.',
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
        title: 'Steg 1: Välj Innehåll och Bilder - Arbetsblad Gratis med Matematik Arbetsblad Teman',
        description: 'Börja med att välja hur många övningar du vill ha. Välj mellan 1 och 8 prepositionsövningar per arbetsblad. Fler övningar ger mer träning på samma blad. Färre övningar passar yngre elever i förskoleklass material. Markera vilka prepositioner eleverna ska öva. Åtta prepositioner finns tillgängliga: i, på, under, bredvid, bakom, mellan, över och framför. Välj alla åtta för bred träning. Välj specifika prepositioner för riktad övning på svåra begrepp. Välj genereringsläge för bilderna. Manuellt val låter dig välja specifika teman. Djur, fordon, mat och leksaker är populära teman. Alla teman-läget väljer bilder slumpmässigt från hela biblioteket.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Steg 2: Anpassa Inställningar - Förskoleklass Material och Matte Övningar Layout',
        description: 'Välj pappersstorlek för dina arbetsblad gratis. Letter Portrait passar amerikansk standard. A4 Portrait är europeisk standard. Liggande format ger bredare layout för större bilder. Kvadratiskt format fungerar bra för Instagram eller digitala skärmar. Anpassad storlek låter dig ange exakt bredd och höjd. De flesta lärare använder Letter eller A4 för utskrift. Välj övningsläge för arbetsbladet. Ifyllnadsläge ger en blank linje där elever skriver preposition. Flervalslä get ger flera alternativ att välja mellan. Ifyllnad övar stavning medan flerval övar igenkänning. Lägg till namnfält och datumfält om du vill.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Steg 3: Generera Arbetsblad - Bokstäver Lära Sig genom Prepositioner och Siffror och Tal',
        description: 'Klicka på Generera-knappen när inställningar är klara. Verktyget skapar arbetsblad direkt på några sekunder. Förhandsgranskning visas på arbetsytan omedelbart. Inget väntetid eller laddningsskärmar. Systemet placerar bilder och former automatiskt. Rumsliga relationer skapas baserat på valda prepositioner. En bil kan placeras ovanpå en box. En boll kan placeras bredvid en stjärna. Varje övning visar objekt, form och rumslig relation. Ifyllnadslucka eller flervalsfråga visas för varje par. Prepositionsnamn översätts till valt språk automatiskt. Svenska elever ser svenska prepositioner. Generera om om du vill ha andra bilder eller placeringar. Varje generering ger nya kombinationer slumpmässigt.',
        icon: '⚡',
      },
      {
        id: '4',
        number: 4,
        title: 'Steg 4: Redigera på Arbetsytan - Finmotorik Övningar med Addition och Subtraktion Integration',
        description: 'Nu kan du anpassa arbetsbladet efter dina behov. Klicka på vilket objekt som helst för att välja det. Dra objekt till nya positioner med musen. Rotera objekt med rotationshandtagen i hörnen. Ändra storlek på bilder genom att dra i hörnen. Gör viktiga element större för betoning. Eller minska storlek för mer utrymme på sidan. Behåll proportioner eller sträck fritt. Lägg till egen text överallt på arbetsbladet. Skriv rubriker, instruktioner eller elevnamn. Välj bland sju typsnitt för olika stilar. Justera teckenstorlek från 8 till över 100 pixlar. Ändra textfärg för att matcha tema eller betona viktiga ord. Använd lagerverktygen för att flytta objekt framåt eller bakåt.',
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Steg 5: Ladda Ner och Skriv Ut - Multiplikationstabellen och Klockan Lära Sig Material i PDF',
        description: 'Klicka på nedladdningsknappen när arbetsbladet är färdigt. Välj mellan JPEG eller PDF-format. JPEG fungerar bra för digitalt delande eller bildbearbetning. PDF behåller högsta kvalitet för professionell utskrift. Ladda ner svarsnyckel i samma format som arbetsbladet. Både övningsblad och svarsnyckel exporteras i 300 DPI. Professionell upplösning ger skarpa utskrifter på alla skrivare. Lämpar sig även för försäljning på Teachers Pay Teachers. Aktivera gråskaleläge för att spara färgbläck. Gråskala konverterar alla färger till gråskalor automatiskt. Perfekt för skolskrivare med begränsat bläck. Eller behåll färg för mer engagerande arbetsblad. Skriv ut arbetsblad gratis direkt från nedladdad fil.',
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from prepositions.md persona sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare och Föräldrar - Förskoleklass Material och Arbetsblad Gratis för Alla Behov',
    sectionDescription: 'Prepositionsarbetsblad hjälper olika grupper av lärare och föräldrar. Förskoleklass lärare, lågstadielärare och hemmaskolelärare använder verktyget dagligen. ESL-lärare och specialpedagoger skapar anpassade arbetsblad gratis för sina elever. Lärarentreprenörer säljer prepositionsarbetsblad på Teachers Pay Teachers och Etsy.',
    badgeText: 'Användningsområden',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Förskoleklass Lärare',
        subtitle: 'Finmotorik Övningar och Bokstäver Lära Sig Grunderna',
        description: 'Förskoleklass lärare behöver arbetsblad som kombinerar flera färdigheter. Prepositionsträning övar rumslig förståelse och språk samtidigt. Sexåringar lär sig grundläggande begrepp som i, på, under och bredvid. Dessa ord används varje dag i klassrummet och hemma. Kombinera prepositionsarbetsblad med målarbilder barn kan färglägga. Eleverna färglägger objekt efter att ha fyllt i prepositioner. Detta ger finmotorik övningar tillsammans med språkträning. Både penngrepp och ordförståelse tränas i samma aktivitet. Lägg till namn- och datumfält för att organisera elevarbeten. Skapa temabaserade arbetsblad som matchar månadens tema. Använd svarsnyckel för snabb bedömning av elevförståelse. Se direkt vilka elever behärskar vilka prepositioner.',
        quote: 'Mina elever lär sig rumsliga begrepp samtidigt som de övar finmotorik!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lågstadielärare Årskurs 1-3',
        subtitle: 'Matematik Arbetsblad Kombinerat med Språkträning',
        description: 'Lågstadielärare undervisar elever från 7 till 9 år. Dessa elever övar fortfarande grundläggande prepositioner på svenska. Särskilt elever med annat modersmål behöver kontinuerlig träning. Prepositionsarbetsblad ger strukturerad övning på svåra rumsbegrepp. Integrera prepositionsträning med matematik arbetsblad och matte övningar. Använd prepositionsövningar som uppvärmning före mattelektion. Eller kombinera båda i samma arbetsblad för effektiv tidsbesparing. Addition och subtraktion kan övas med samma bilder som prepositionsövningar. Lärare på årskurs 2-3 kan använda flervalsfrågor. Detta format passar elever som redan kan läsa bra. De väljer korrekt preposition från flera alternativ snabbt. Snabbare format möjliggör fler övningar på samma tid.',
        quote: 'Flervalsfrågor fungerar perfekt för mina årskurs 2-elever!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hemundervisande Föräldrar',
        subtitle: 'Arbetsblad Gratis Anpassade för Familjens Behov',
        description: 'Hemundervisande föräldrar undervisar ofta flera barn i olika åldrar. En förälder kan ha barn i förskoleklass och årskurs 3. Verktyget låter dem skapa förskoleklass material för det yngre barnet. Samtidigt skapas svårare arbetsblad för det äldre barnet. Personalisering är särskilt viktig för hemmaskolefamiljer. Ladda upp bilder från familjens vardag och hem. Använd familjens husdjur, leksaker och möbler i övningar. Barn känner igen objekt från sitt liv direkt. Detta ökar engagemang och motivation hos hemmaskolebarn. De ser sitt eget rum, sina egna saker i arbetsbladet. Inlärningen blir mer meningsfull och relevant. Anknytning till verkliga föremål stärker förståelsen.',
        quote: 'Mina barn älskar att se sina egna leksaker i arbetsbladen!',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'ESL och Flerspråkiga Lärare',
        subtitle: 'Målarbilder Barn och Språkträning på 11 Språk',
        description: 'ESL-lärare undervisar svenska som andraspråk till barn. Prepositioner är särskilt svåra för andraspråksinlärare. Varje språk använder prepositioner olika. Svenska "på bordet" är engelska "on the table" men tyska "auf dem Tisch". Verktygets 11-språksstöd är ovärderligt för ESL-klasser. Visa samma övning på elevens modersmål först. Låt eleven förstå konceptet på ett känt språk. Sedan visa samma övning på svenska för språköverföring. Internationella skolor med elever från många länder använder verktyget dagligen. Skapa arbetsblad på engelska för internationella elever. Skapa arbetsblad på svenska för svenska elever. Samma verktyg hanterar båda språken utan problem.',
        quote: 'Flerspråkiga arbetsblad hjälper mina ESL-elever lära sig snabbare!',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpedagoger',
        subtitle: 'Förskoleklass Material Anpassat för Varje Elevs Nivå',
        description: 'Specialpedagoger arbetar med elever med olika inlärningsbehov. Vissa elever behöver enklare arbetsblad med färre övningar. Andra behöver större bilder och tydligare text. Verktyget låter lärare anpassa exakt efter varje elevs behov. Minska antal övningar till 1-2 för elever med koncentrationssvårigheter. Fokusera på bara en preposition i taget för tydlighet. Öka textstorlek för elever med synsvårigheter. Alla dessa justeringar görs med enkla kontroller. Använd bekanta bilder från elevens vardag för ökad förståelse. Ladda upp bilder av klassrummets föremål, elevens schema eller dagliga rutiner. Igenkänning hjälper elever med kognitiva utmaningar att förstå snabbare. Kopplingen till verkliga föremål stärker inlärningen.',
        quote: 'Jag kan anpassa varje arbetsblad för varje elevs unika behov!',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lärarentreprenörer',
        subtitle: 'Sälj Arbetsblad Gratis Skapade Material på Teachers Pay Teachers',
        description: 'Lärarentreprenörer skapar och säljer undervisningsmaterial online. Teachers Pay Teachers är den största marknadsplatsen för pedagogiskt material. Svenska lärare köper arbetsblad, aktiviteter och fullständiga lektionsplaneringar där. Prepositionsarbetsblad är en efterfrågad produktkategori. Full Tillgång-prenumeration inkluderar kommersiell print-on-demand-licens. Skapa prepositionsarbetsblad och sälj dem direkt på Teachers Pay Teachers. Ingen extra licensavgift eller attribution krävs. Alla rättigheter till skapade arbetsblad tillhör dig. Professionell 300 DPI-kvalitet gör arbetsblad lämpliga för försäljning. Köpare förväntar sig högkvalitativa utskrifter utan pixlighet. Verktygets exportfunktion ger exakt den kvalitet som krävs. PDF-format är standard för digitala nedladdningar på Teachers Pay Teachers.',
        quote: 'Jag tjänar extra inkomst varje månad från mina prepositionsarbetsblad!',
      },
    ],
  },

  // FAQ Section - ALL questions from prepositions.md
  faq: {
    sectionTitle: 'Vanliga Frågor om Prepositionsarbetsblad - Förskoleklass Material och Arbetsblad Gratis',
    sectionDescription: 'Lärare ställer ofta samma frågor om prepositionsverktyget. Här besvaras de vanligaste frågorna om funktioner och prenumeration. Svaren ger tydlig information om vad verktyget kan göra. Läs igenom frågorna innan du börjar använda verktyget.',
    showMoreText: 'Visa fler frågor',
    showLessText: 'Visa färre',
    badgeText: 'Vanliga Frågor',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    secureCheckout: 'Säker betalning',
    cancelAnytime: 'Avsluta när som helst',
    items: [
      {
        id: '1',
        question: 'Är denna Prepositionsgenerator Verkligen Gratis att Använda med Arbetsblad Gratis?',
        answer: 'Prepositionsarbetsblad kräver Full Tillgång-prenumeration som kostar 2 900 kronor årligen eller 300 kronor månadsvis. Din prenumeration ger obegränsad skapande av prepositionsarbetsblad utan avgifter per arbetsblad. Generera så många arbetsblad du behöver utan extra kostnader. Full Tillgång inkluderar alla 33 arbetsbladstyper och kommersiell licens. Ordsökningsgeneratorn är den enda verkligen gratis generatorn på plattformen. Den kräver ingen prenumeration men lägger till vattenstämpel på arbetsblad. Endast personligt bruk tillåts utan prenumeration. Alla andra generatorer kräver Full Tillgång-prenumeration för full funktionalitet. Prenumerationsvärdet överstiger kostnaden markant. Konkurrerande verktyg tar avgifter per arbetsblad eller per bild. LessonCraft Studio inkluderar allt i en fast årlig avgift.',
      },
      {
        id: '2',
        question: 'Kan jag Skriva Ut Prepositionsarbetsblad Hemma på Vanlig Skrivare för Förskoleklass Material?',
        answer: 'Ja, alla prepositionsarbetsblad skrivs ut perfekt på vanliga hem- och skolskrivare. Både bläckstråleskrivare och laserskrivare fungerar utmärkt. A4-papper och Letter-papper stöds båda fullt ut. Ingen specialutrustning eller professionell tryckning krävs för bra resultat. Arbetsblad exporteras i 300 DPI-kvalitet för skarp utskrift. Denna upplösning ger kristallklara bokstäver och bilder. Små detaljer syns tydligt även på hemskrivare. Text förblir läsbar och bilder ser professionella ut. Gråskaleläge sparar färgbläck för budgetmedvetna lärare. Aktivera gråskala innan nedladdning för svart-vitt-utskrift. Skolskrivare med begränsat färgbläck gynnas av detta alternativ.',
      },
      {
        id: '3',
        question: 'Behöver jag Designkunskaper för att Skapa Förskoleklass Material och Finmotorik Övningar?',
        answer: 'Inga designkunskaper eller teknisk erfarenhet krävs alls. Verktyget hanterar all design och layout automatiskt åt dig. Du väljer bara innehåll och inställningar med enkla kontroller. Systemet skapar professionell design på sekunder utan input från dig. Användargränssnittet använder enkla knappar och menyer. Inga komplicerade designprogram som Photoshop eller Canva behövs. Klicka, välj och generera är hela processen. Även tekniskt oinriktade lärare skapar vackra arbetsblad direkt. Förhandsvisning visar exakt hur arbetsbladet ser ut före nedladdning. Inga överraskningar när du skriver ut arbetsblad. Se resultatet på skärmen omedelbart efter generering. Justera vid behov och generera om på sekunder.',
      },
      {
        id: '4',
        question: 'Kan jag Använda Prepositionsarbetsblad i mitt Klassrum för Förskoleklass Material?',
        answer: 'Full Tillgång-prenumeration inkluderar obegränsad klassrumsanvändning. Skapa arbetsblad för alla dina klasser och alla elever. Skriva ut hundratals kopior utan extra avgifter. Ingen begränsning på antal elever eller klasser som använder materialet. Dela arbetsblad digitalt via Google Classroom eller andra LMS-system. Ladda upp PDF-filer för elevåtkomst hemifrån. Elever kan skriva ut arbetsblad hemma eller slutföra digitalt. Flexibel distribution passar både fysiska och digitala klassrum. Spara arbetsblad för återanvändning år efter år. Bygg ett bibliotek av prepositionsarbetsblad över tid. Använd samma arbetsblad med nya klasser varje läsår. Ingen utgång eller tidsbegränsning på skapade arbetsblad.',
      },
      {
        id: '5',
        question: 'Vilka Språk finns Tillgängliga för Matematik Arbetsblad och Matte Övningar?',
        answer: 'Prepositionsarbetsblad finns på 11 olika språk fullständigt. Svenska, engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, danska, norska och finska stöds. Både användargränssnitt och arbetsbladsinnehåll översätts till valt språk. Prepositionsnamn visas på rätt språk automatiskt på arbetsblad. Byt språk när som helst med språkväljaren. Skapa arbetsblad på svenska för svenska elever. Skapa arbetsblad på engelska för internationella elever. Växla mellan språk på sekunder utan att logga ut eller in. Samma bilder fungerar på alla språk sömlöst. Bilden av en hund ser likadan ut oavsett språk. Endast textprompter och prepositionsnamn ändras.',
      },
      {
        id: '6',
        question: 'Kan jag Sälja Prepositionsarbetsblad jag Skapar med Målarbilder Barn på Teachers Pay Teachers?',
        answer: 'Ja, Full Tillgång-prenumeration inkluderar full kommersiell print-on-demand-licens. Sälj alla arbetsblad du skapar på Teachers Pay Teachers, Etsy eller Amazon KDP. Ingen extra licensavgift eller attribution krävs någonsin. Alla rättigheter till skapade arbetsblad tillhör dig helt. Inga royalties eller vinstandelar till LessonCraft Studio krävs. Du behåller 100% av försäljningsintäkterna minus plattformsavgift. Teachers Pay Teachers tar 25-35% provision men LessonCraft tar inget. Dina arbetsblad är din egendom att sälja fritt. Professionell 300 DPI-kvalitet gör arbetsblad lämpliga för försäljning. Köpare förväntar sig högkvalitativt material på Teachers Pay Teachers.',
      },
      {
        id: '7',
        question: 'Hur Anpassar jag Prepositionsarbetsblad för Bokstäver Lära Sig och Siffror och Tal Integration?',
        answer: 'Anpassning sker på flera nivåer efter generering. Lägg till text överallt på arbetsbladet med textverktyget. Skriv elevnamn, instruktioner eller lärandemål tydligt synliga. Välj typsnitt, storlek och färg för all text fritt. Dra objekt till nya positioner med drag-och-släpp. Ändra storlek på bilder genom att dra i hörnen. Rotera bilder för dynamiska layouter och variation. Ta bort element du inte vill ha kvar på arbetsbladet. Ladda upp egna bilder för fullständig personalisering. Använd foton från ditt klassrum eller elevernas miljö. Lägg till logotyper, maskotar eller dekorativa element. Kombinera uppladdade bilder med biblioteksbilder sömlöst.',
      },
      {
        id: '8',
        question: 'Vilka Åldersgrupper Fungerar Bäst med Dessa Förskoleklass Material och Finmotorik Övningar?',
        answer: 'Prepositionsarbetsblad passar barn från 4 till 9 år perfekt. Förskoleklass och lågstadiet är målgruppen primärt. Sexåringar i förskoleklass lär sig grundläggande prepositioner som i, på och under. Äldre barn i årskurs 2-3 övar svårare prepositioner som mellan och bakom. Justera svårighetsgrad genom att välja antal övningar. Fyraåringar klarar 1-2 övningar per arbetsblad bra. Åttaåringar kan hantera alla 8 övningar utan problem. Flexibel svårighetsnivå passar bred åldersspann med samma verktyg. Välj övningsläge baserat på elevålder och färdighet. Ifyllnadsblankett kräver eleverna kan skriva prepositioner. Detta passar årskurs 1-3 som redan kan skriva. Flerval passar yngre eller elever som ännu inte behärskar stavning.',
      },
      {
        id: '9',
        question: 'Kan jag Ladda Upp Mina Egna Bilder till Prepositionsarbetsblad?',
        answer: 'Ja, multifiluppladdning tillåter många bilder samtidigt. Klicka på uppladdningsknappen och välj alla bilder från din dator. JPEG, PNG och GIF-format stöds alla fullt ut. Uppladdade bilder visas omedelbart i ditt bibliotek. Använd uppladdade bilder som objekt eller former i övningar. Ladda upp klassrumsobjekt för igenkänning hos elever. Använd elevernas egna teckningar som arbetsbladsinnehåll. Eller ladda upp tematiska bilder från internet för specifika lektioner. Kombinera uppladdade bilder med bibliotekets 3000+ bilder fritt. Blanda egna foton med professionella illustrationer sömlöst. Detta ger oändliga kombinationsmöjligheter för unika arbetsblad. Personalisering utan begränsning av biblioteksinnehåll.',
      },
      {
        id: '10',
        question: 'Hur Lång Tid Tar det att Skapa ett Prepositionsarbetsblad?',
        answer: 'Genomsnittlig skapandetid är under 3 minuter från start till färdig PDF. Välj inställningar tar 1 minut med knapptryckningar. Generering sker på sekunder automatiskt. Eventuella redigeringar tar 1-2 minuter med drag-och-släpp. Jämför detta med traditionella metoder som tar 30-60 minuter. Designprogram kräver bildimport, layout och textskapande. Hitta lämpliga bilder online tar ofta 15-20 minuter ensamt. Verktyget eliminerar all denna tidskrävande process fullständigt. Erfarna användare skapar arbetsblad ännu snabbare. Efter några användningar känner du alla kontroller. Rutinmässigt skapande tar bara 1-2 minuter totalt. Muscle memory utvecklas snabbt med verktygets intuitiva design.',
      },
      {
        id: '11',
        question: 'Inkluderar Prepositionsarbetsblad Svarsnycklar?',
        answer: 'Ja, svarsnyckel genereras automatiskt för varje arbetsblad. Klicka på "Generera svarsnyckel" efter att arbetsblad skapats. Svarsnyckeln visar korrekta prepositioner för varje övning tydligt. Perfekt för snabb rättning av elevarbeten utan gissning. Svarsnyckel exporteras i samma format som arbetsbladet. Välj PDF för svarsnyckel om arbetsblad är PDF. Välj JPEG för svarsnyckel om arbetsblad är JPEG. Båda filerna matchar perfekt för enkel jämförelse. Lägg svarsnyckel i lärarpärm eller digitalt arkiv. Vikarier kan rätta elevarbeten med svarsnyckel tillgänglig. Föräldrar som hjälper hemma kan kontrollera svar korrekt. Svarsnyckel gör prepositionsarbetsblad självständigt användbara av andra.',
      },
      {
        id: '12',
        question: 'Kan jag Skapa Prepositionsarbetsblad om Specifika Skolämnen?',
        answer: 'Ja, temabaserad bildväljning möjliggör ämnesspecifika arbetsblad. Välj djurtema för naturvetenskapsenheter om djur. Välj fordonstema för samhällskunskap om transport. Välj mattema för hälsolära om näring och kost. Kombinera prepositioner med andra lärandekoncept kreativt. Lägg till tal och siffror som text på arbetsbladet. Skapa övningar som kombinerar rumsliga begrepp med matematik. Integration av flera färdigheter i samma arbetsblad maximerar lärande. Ladda upp ämnesspecifika bilder för nischade behov. Geografilärare laddar upp kartor och landmärken. Historielärare laddar upp historiska föremål och personer. Varje ämne kan representeras med passande bilder.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Full Tillgång',
    price: '2 900 kr',
    priceInterval: '/år',
    priceSuffix: 'Faktureras årligen',
    benefits: [
      'Obegränsat skapande av arbetsblad',
      'Kommersiell licens inkluderad',
      '11 språk stöds',
      '3000+ tematiska bilder',
      '300 DPI utskriftskvalitet',
      'Facit inkluderat',
      'Alla 33 arbetsblad generatorer',
      '8 prepositioner tillgängliga',
    ],
    ctaText: 'Börja Skapa Nu',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombinera Prepositionsarbetsblad med Matematik Arbetsblad - Addition och Subtraktion, Multiplikationstabellen, Målarbilder Barn och Finmotorik Övningar',
    sectionDescription: 'LessonCraft Studio erbjuder 33 olika arbetsbladstyper på plattformen. Kombinera prepositionsarbetsblad med andra generatorer för kompletta lärpaket. Skapa tematiska undervisningsenheter som täcker flera färdighetsområden samtidigt. Full Tillgång-prenumeration ger tillgång till alla generatorer för 2 900 kronor årligen.',
    ctaTitle: 'Redo att Skapa Fantastiska Arbetsblad?',
    ctaDescription: 'Gå med tusentals pedagoger som skapar professionella arbetsblad. Obegränsat skapande, kommersiell licens inkluderad.',
    primaryCtaText: 'Starta Gratis Provperiod',
    secondaryCtaText: 'Visa Alla 33 Appar',
    badgeText: 'Fungerar Utmärkt Med',
    exploreText: 'Utforska alla appar',
    trustBadges: {
      securePayment: 'Säker betalning',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [
      {
        id: '1',
        slug: 'addition-arbetsblad',
        name: 'Additionsarbetsblad',
        category: 'Matematik',
        icon: '➕',
        description: 'Kombinera prepositionsarbetsblad med additionsarbetsblad för omfattande matte övningar. Elever övar rumsliga begrepp och matematik samtidigt.',
      },
      {
        id: '2',
        slug: 'malarbilder-arbetsblad',
        name: 'Målarbilder',
        category: 'Konst & Kreativitet',
        icon: '🎨',
        description: 'Skapa kompletta aktivitetspaket kombinera prepositioner med målarbilder barn. Elever fyller i preposition och färglägger sedan bilderna.',
      },
      {
        id: '3',
        slug: 'matchning-arbetsblad',
        name: 'Matchningsarbetsblad',
        category: 'Visuellt Lärande',
        icon: '🔗',
        description: 'Para ihop prepositionsarbetsblad med matchningsarbetsblad för visuell diskrimineringsförmåga. Elever matchar bilder med korrekta prepositioner.',
      },
      {
        id: '4',
        slug: 'hitta-och-rakna-arbetsblad',
        name: 'Hitta och Räkna',
        category: 'Matematik',
        icon: '🔢',
        description: 'Para ihop prepositionsarbetsblad med räkneaktiviteter för siffror och tal träning. Räkna objekt i olika rumsliga positioner.',
      },
      {
        id: '5',
        slug: 'rita-linjer-arbetsblad',
        name: 'Rita Linjer',
        category: 'Finmotorik',
        icon: '✏️',
        description: 'Kombinera prepositionsaktiviteter med rita linjer arbetsblad för komplett finmotorik övningar. Elever drar linjer mellan relaterade objekt.',
      },
      {
        id: '6',
        slug: 'stor-liten-arbetsblad',
        name: 'Stor och Liten',
        category: 'Tidig Inlärning',
        icon: '📏',
        description: 'Kombinera storlekssortering med stor och liten arbetsblad för jämförelseförmåga. Elever lär sig både storlek och rumsliga begrepp.',
      },
    ],
  },
};

export default prepositionsSvContent;
