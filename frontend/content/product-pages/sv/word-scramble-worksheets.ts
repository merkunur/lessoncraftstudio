import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Scramble Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/word-scramble-worksheets.ts
 * URL: /sv/apps/ordpussel-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/word-scramble.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordScrambleSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'ordpussel-arbetsblad',
    appId: 'word-scramble',
    title: 'Ordpussel Generator - Arbetsblad Gratis för Bokstäver Lära Sig | Förskoleklass Material',
    description: 'Skapa professionella ordpussel med vår ordpussel-generator. Generera anpassningsbara arbetsblad gratis för utskrift perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
    keywords: 'ordpussel generator, arbetsblad gratis, förskoleklass material, bokstäver lära sig, skriva bokstäver, ordpussel, matematik arbetsblad, finmotorik övningar, målarbilder barn, lågstadiet',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/ordpussel-arbetsblad',
  },

  // Hero Section - FULL text from word-scramble.md paragraphs 1-4
  hero: {
    title: 'Ordpussel Generator',
    subtitle: 'Arbetsblad Gratis för Bokstäver Lära Sig - Förskoleklass Material',
    description: `Skapa professionella ordpussel med vår ordpussel-generator. Din Grundpaket-prenumeration ger dig obegränsad ordpusselgenerering utan extra kostnader per arbetsblad. Generera anpassningsbara arbetsblad gratis för utskrift perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Vår ordpussel-generator är perfekt för att träna bokstäver lära sig och skriva bokstäver. Barn älskar att lösa ordpussel där bokstäverna i ett ord är blandade. Varje pussel hjälper barn att känna igen bokstavsmönster och öva stavning. Välj mellan bildbaserade pussel eller textbaserade övningar med din egen ordlista.

Generatorn skapar vackra arbetsblad med professionell 300 DPI-kvalitet. Perfekt för utskrift hemma eller på skolan. Använd ordpussel tillsammans med matematik arbetsblad och målarbilder barn för kompletta läropaket. Skapa obegränsat antal arbetsblad för förskoleklass material och lågstadiets behov.`,
    previewImageSrc: '/samples/english/word scramble/word scramble portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/word scramble/
  samples: {
    sectionTitle: 'Ordpussel Arbetsblad Exempel',
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
        worksheetSrc: '/samples/english/word scramble/word scramble portrait.jpeg',
        answerKeySrc: '/samples/english/word scramble/word scramble portrait answer-key.jpeg',
        altText: 'Ordpussel arbetsblad i porträttformat med tematiska bilder för förskoleklass bokstavsträning',
        pdfDownloadUrl: '/samples/english/word scramble/word scramble portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/word scramble/word scramble landscape.jpeg',
        answerKeySrc: '/samples/english/word scramble/word scramble landscape answer-key.jpeg',
        altText: 'Ordpussel arbetsblad i landskapsformat med färgglada bildledtrådar för lågstadiet',
        pdfDownloadUrl: '/samples/english/word scramble/word scramble landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/word scramble/custom word list.jpeg',
        answerKeySrc: '/samples/english/word scramble/custom word list answer-key.jpeg',
        altText: 'Anpassad ordlista ordpussel för stavningsträning och ordförråd',
        pdfDownloadUrl: '/samples/english/word scramble/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from word-scramble.md feature sections
  features: {
    sectionTitle: 'Ordpussel Funktioner - Arbetsblad Gratis för Förskoleklass Material och Bokstäver Lära Sig',
    sectionDescription: 'Vår ordpussel-generator innehåller alla funktioner du behöver för att skapa professionella arbetsblad. Skapa arbetsblad gratis för förskoleklass och lågstadiet. Generatorn är perfekt för att skapa ordpussel för bokstäver lära sig och skriva bokstäver.',
    highlightBadgeText: 'Nyckelfunktion',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    badgeText: 'Funktioner',
    trustBadges: {
      allFeatures: 'Alla funktioner ingår',
      noHiddenFees: 'Inga dolda avgifter',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Skapa Ordpussel på 3 Klick',
        description: `Skapa professionella ordpussel på under 3 minuter. Välj tema eller individuella bilder från bildbiblioteket. Generatorn skapar automatiskt ordpussel med blandade bokstäver. Inga designkunskaper behövs för att skapa vackra arbetsblad.

Välj antal pussel per sida från 1 till 10. Anpassa svårighetsgrad med ledtrådar eller utan ledtrådar. Perfekt för att skapa förskoleklass material och arbetsblad för lågstadiet. Varje pussel genereras direkt på arbetsytan.

Använd ordpussel tillsammans med matematik arbetsblad och addition och subtraktion övningar. Skapa kompletta läropaket för olika ämnen. Din Grundpaket-prenumeration ger obegränsad generering av arbetsblad gratis för utskrift.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Redigera Allt på Arbetsytan',
        description: `Varje element på arbetsytan är helt redigerbart. Dra, rotera, skala eller ta bort bilder med musen. Ändra textens färg, storlek och teckensnitt direkt på arbetsytan. Ingen annan ordpussel-generator ger så mycket kontroll.

Lägg till egna textfält med rubriker eller instruktioner. Anpassa bokstävernas färg med färgkodade vokaler och konsonanter. Perfekt för barn som tränar bokstäver lära sig och skriva bokstäver. Ändra allt tills arbetsytan ser exakt ut som du vill.

Kombinera ordpussel med målarbilder barn på samma arbetsblad. Lägg till finmotorik övningar som klipp-och-klistra aktiviteter. Skapa unika arbetsblad för förskoleklass material som ingen annan har. Fullständig kreativ frihet med enkel redigering.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Ladda Upp Egna Bilder',
        description: `Ladda upp dina egna bilder för helt personliga ordpussel. Stöd för JPEG, PNG och GIF-format. Ladda upp flera bilder samtidigt för snabbare arbetsflöde. Kombinera dina bilder med vårt bildbibliotek på samma arbetsblad.

Perfekt för att skapa ordpussel med elevernas namn och foton. Använd bilder från klassrummet eller temaenheter ni arbetar med. Skapa arbetsblad gratis med helt personligt innehåll för dina elever. Bilderna sparas i sessionen för upprepad användning.

Kombinera egenuppladdade bilder med matematik arbetsblad och siffror och tal övningar. Skapa temaarbetsblad med bilder från högtider eller årstider. Din Grundpaket-prenumeration tillåter obegränsad bilduppladdning utan extra kostnader.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Svenskt Språkstöd',
        description: `Ordpussel-generatorn fungerar på 11 olika språk. Användargränssnittet är översatt till svenska, engelska, tyska, franska, spanska, italienska, portugisiska, nederländska, danska, norska och finska. Byt språk direkt i generatorn.

Särskilt viktigt för ordpussel är att bildernas filnamn styr vilket ord som används. Välj språk innan du genererar för att få korrekta ord på svenska. Perfekt för lärare som arbetar med flerspråkiga klasser eller språkundervisning.

Skapa ordpussel för bokstäver lära sig på elevernas modersmål. Använd samma generator för att skapa arbetsblad på olika språk. Kombinera med matematik arbetsblad och addition och subtraktion på svenska eller annat språk. Flerspråkigt stöd inkluderat utan extra kostnad.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommersiell Licens Tillgänglig',
        description: `Grundpaketet inkluderar full kommersiell print-on-demand-licens. Sälj dina ordpussel på Etsy, Teachers Pay Teachers och Amazon KDP. Ingen extra licensavgift utöver din prenumeration på 144 dollar per år.

Många lärare tjänar 5 000-20 000 kronor per månad genom att sälja arbetsblad gratis digitala nedladdningar. Skapa ordpussel, matematik arbetsblad, målarbilder barn och finmotorik övningar för försäljning. Professionell 300 DPI-kvalitet perfekt för utskrift och försäljning.

Ingen attribution krävs på dina arbetsblad. Du äger fullständiga rättigheter till det du skapar. Perfekt för lärarentreprenörer som bygger passiva inkomstströmmar. Kombinera ordpussel med förskoleklass material för kompletta paket som säljer bra.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bildbibliotek 3000+ Bilder',
        description: `Tillgång till över 3000 barnvänliga bilder inkluderade i prenumerationen. Alla bilder organiserade efter teman för enkel sökning. Välj hela teman med ett klick eller välj individuella bilder. Sökfunktion för att snabbt hitta specifika bilder.

Teman inkluderar djur, mat, fordon, bokstäver lära sig, siffror och tal, klockan lära sig och mycket mer. Perfekt för att skapa tematiska ordpussel och förskoleklass material. Alla bakgrunder och ramar inkluderade utan extra kostnad.

Använd bildbiblioteket för ordpussel, matematik arbetsblad, målarbilder barn och addition och subtraktion övningar. Skapa konsekventa temapaket över olika arbetsbladstyper. Till skillnad från konkurrenter som tar betalt per bild är allt inkluderat i din prenumeration.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionell 300 DPI Kvalitet',
        description: `Exportera alla arbetsblad i professionell 300 DPI-upplösning. Perfekt kvalitet för utskrift hemma eller på skolan. Ladda ner som PDF eller JPEG efter dina behov. Gråskaleläge för att spara bläck vid utskrift.

Professionell kvalitet som fungerar för både klassrumsbruk och försäljning. Skapa arbetsblad gratis för dina egna elever eller sälj på lärplattformar. Inga vattenstämplar eller begränsningar. Full upplösning på alla exporter.

Varje ordpussel ser professionellt ut med perfekt typografi och layout. Kombinera med matematik arbetsblad, finmotorik övningar och målarbilder barn i samma höga kvalitet. Ångra och gör om-funktioner gör redigering enkel. Skapade arbetsblad kan användas omedelbart.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from word-scramble.md step sections
  howTo: {
    sectionTitle: 'Hur Man Skapar Ordpussel - Arbetsblad Gratis i 5 Enkla Steg',
    sectionDescription: 'Skapa professionella ordpussel på under 3 minuter med vår enkla 5-stegs process. Inga designkunskaper behövs för att skapa vackra arbetsblad gratis för utskrift. Följ dessa steg för att skapa ordpussel för bokstäver lära sig och förskoleklass material.',
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
        title: 'Välj Innehåll',
        description: `Börja med att välja innehåll för dina ordpussel. Du har tre alternativ som alla fungerar perfekt för förskoleklass material och lågstadiet. Välj temabilder för snabb generering eller individuella bilder för mer kontroll. Du kan också använda egen ordlista för textbaserade övningar.

Välj ett tema från bildbiblioteket för snabb start. Teman inkluderar djur, mat, bokstäver lära sig, siffror och tal, klockan lära sig och mycket mer. Klicka på temat så fylls bildvalet automatiskt med passande bilder. Perfekt för att skapa tematiska arbetsblad gratis.

För mer kontroll, bläddra genom bildbiblioteket och välj individuella bilder. Över 3000 bilder tillgängliga sorterade efter kategorier. Klicka på bilder för att lägga till dem i ditt urval. Anpassa antalet efter hur många ordpussel du vill per sida.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar',
        description: `Anpassa ordpusslens inställningar efter dina elevers nivå och behov. Välj antal pussel per sida från 1 till 10. Välj färre pussel för yngre barn i förskoleklass eller fler för äldre elever. Varje inställning påverkar slutresultatet direkt.

Välj svårighetsgrad baserat på antal ledtrådar. "Inga ledtrådar" är svårast där alla bokstäver är blandade. "Lätt" visar varannan bokstav som ledtråd. "Normal" visar var fjärde bokstav. Anpassa efter elevernas behov för bokstäver lära sig.

Välj mellan versaler och gemener beroende på vad eleverna tränar på. Versaler passar bäst för förskoleklass och årskurs 1. Färgkodade bokstäver visar vokaler i rött och konsonanter i blått. Detta hjälper barn att känna igen bokstavsmönster.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera',
        description: `Klicka på "Generera" för att skapa dina ordpussel direkt på arbetsytan. Generatorn arbetar på några sekunder och visar resultat omedelbart. Varje ordpussel placeras automatiskt på arbetsytan med perfekt layout.

Generatorn skapar automatiskt ordpussel baserat på valda bilder eller ordlista. Varje bild blir ett ordpussel med blandade bokstäver. Namnet på bilden används som korrekt svar. Bilderna placeras ovanför de blandade bokstäverna för visuell koppling.

Förhandsgranskningen visar exakt hur arbetsbladen kommer se ut när de skrivs ut. Kontrollera att allt ser bra ut innan du fortsätter till redigeringsfasen. Om något inte ser rätt ut, justera inställningarna och generera igen.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera',
        description: `Nu kan du redigera varje element direkt på arbetsytan med mus eller pekskärm. Dra bilder till nya positioner genom att klicka och dra. Rotera bilder genom att använda roteringshandtaget. Skala bilder större eller mindre genom att dra i hörnen.

Klicka på textelement för att ändra färg, storlek eller teckensnitt. Lägg till nya textfält med rubriker eller instruktioner. Skriv "Ordpussel om djur" eller "Bokstäver lära sig övningar" som rubrik. Anpassa textens placering exakt där du vill ha den.

Kombinera ordpussel med andra element på samma arbetsblad. Lägg till målarbilder barn i nedre delen av sidan. Lägg till finmotorik övningar som klipp-linjer eller prick-till-prick. Skapa kompletta arbetsblad med flera aktiviteter på samma sida.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner',
        description: `Ladda ner dina färdiga ordpussel i professionell 300 DPI-kvalitet. Välj mellan PDF för bästa utskriftskvalitet eller JPEG för digital användning. Båda formaten ger kristallklar kvalitet perfekt för utskrift hemma eller på skolan.

PDF-formatet bevarar all kvalitet och fungerar perfekt för skolors kopiatorer. Ladda ner PDF och skriv ut direkt utan kvalitetsförlust. Perfekt för att skriva ut flera kopior för hela klassen.

Välj gråskaleläge för att spara bläck vid utskrift. Särskilt användbart när du skriver ut många kopior av arbetsblad gratis. Gråskala ser fortfarande professionellt ut men använder bara svart bläck.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from word-scramble.md use case sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare och Föräldrar',
    sectionDescription: 'Vår ordpussel-generator används av lärare och föräldrar över hela Sverige. Skapa arbetsblad gratis för bokstäver lära sig, matematik arbetsblad och förskoleklass material. Varje användargrupp har unika behov som generatorn uppfyller perfekt.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Förskollärare och Förskoleklass',
        subtitle: 'Bokstäver Lära Sig och Finmotorik Övningar Material',
        description: `Förskollärare och lärare i förskoleklass använder ordpussel för att introducera bokstäver lära sig på ett lekfullt sätt. Barn i 6-årsåldern älskar att lösa ordpussel med bilder de känner igen. Varje pussel tränar bokstavsigenkänning och stavning samtidigt som det är roligt och engagerande.

Skapa ordpussel med stora, tydliga bokstäver perfekta för nybörjare. Använd färgkodade bokstäver där vokaler är röda och konsonanter blå. Detta hjälper barn att lära sig skillnaden mellan bokstavstyper. Kombinera med målarbilder barn på samma arbetsblad för flera aktiviteter.

Förskoleklass material behöver vara visuellt tilltalande och enkelt att förstå. Våra ordpussel uppfyller båda kraven med professionell design och intuitivt upplägg. Skapa tematiska arbetsblad om årstider, djur, mat eller högtider.`,
        quote: 'Barnen älskar att lösa ordpussel med bilder!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lågstadielärare Årskurs 1-3',
        subtitle: 'Matematik Arbetsblad och Stavningsträning',
        description: `Lärare i lågstadiet använder ordpussel för stavningsträning från årskurs 1 till årskurs 3. Eleverna utvecklas från enkla tre- och fyrbokstavsord till mer komplexa ord och begrepp. Anpassa svårighetsgraden med olika antal ledtrådar efter elevernas nivå.

Kombinera ordpussel med matematik arbetsblad för tematiska läropaket. Skapa ordpussel om siffror och tal med bilder av nummer och mängder. Lägg till addition och subtraktion övningar på samma tema. Skapa multiplikationstabellen arbetsblad med ordpussel om matematiska begrepp.

Många lärare skapar veckans arbetsblad varje söndag kväll. Med vår generator tar det 15 minuter istället för 2 timmar. Skapa ordpussel för svenska, matematik arbetsblad för matte, målarbilder barn för bildämnet.`,
        quote: 'Ordpussel gör stavningsträning roligt och engagerande.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hemundervisande Föräldrar',
        subtitle: 'Arbetsblad Gratis för Bokstäver Lära Sig och Siffror och Tal',
        description: `Hemundervisande föräldrar uppskattar flexibiliteten att skapa arbetsblad gratis anpassade efter varje barns inlärningsstil. Skapa ordpussel om ämnen som intresserar ditt barn. Om barnet älskar dinosaurier, skapa ordpussel om dinosaurier. Om barnet älskar rymden, använd rymdbilder.

Kombinera flera ämnen på samma arbetsblad för integrerat lärande. Skapa ordpussel om djur, sedan lägg till siffror och tal övningar om att räkna djur. Lägg till målarbilder barn av samma djur för kreativ aktivitet.

Hemundervisning kräver material för flera barn i olika åldrar. Skapa förskoleklass material för yngre syskon och matematik arbetsblad för äldre barn på samma plattform.`,
        quote: 'Ett verktyg täcker alla mina barns årskurser.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Språklärare',
        subtitle: 'Arbetsblad för Bokstäver Lära Sig på 11 Språk',
        description: `Språklärare och lärare i flerspråkiga klasser använder ordpussel för ordförrådsutveckling. Generatorns stöd för 11 språk gör den perfekt för språkundervisning. Skapa ordpussel på svenska för svenska som andraspråk. Skapa ordpussel på engelska för engelskundervisning.

Bildbaserade ordpussel fungerar utmärkt för andraspråksinlärning. Eleven ser bilden och lär sig ordet samtidigt som de löser pusslet. Detta kombinerar visuellt lärande med språkträning för effektiv inlärning.

Använd samma bilder för ordpussel på olika språk. Skapa ordpussel om mat på svenska på måndag. Skapa ordpussel om mat på engelska på tisdag med samma bilder. Eleverna lär sig ordförråd på båda språken.`,
        quote: 'Flerspråkigt stöd är avgörande för mitt klassrum.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpedagoger',
        subtitle: 'Förskoleklass Material och Finmotorik Övningar för Anpassat Lärande',
        description: `Specialpedagoger använder ordpussel för strukturerade övningar anpassade efter elevers individuella behov. Stora, tydliga bokstäver fungerar perfekt för elever med synsvårigheter. Färgkodade bokstäver hjälper elever med lässvårigheter att känna igen bokstavsmönster.

Skapa ordpussel med endast 1-2 pussel per sida för elever som blir överstimulerade. Lägg till extra stora bilder och bokstäver för tydlighet. Anpassa varje arbetsblad exakt efter elevens funktionsnivå och behov.

Kombinera ordpussel med finmotorik övningar för elever som behöver träna penngrepp. Lägg till tracingövningar för bokstäver lära sig och motorik samtidigt. Skapa målarbilder barn med stora ytor för elever som tränar färgläggning.`,
        quote: 'Jag kan snabbt anpassa arbetsblad för varje elevs behov.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lärarentreprenörer',
        subtitle: 'Sälj Arbetsblad Gratis på Teachers Pay Teachers och Etsy',
        description: `Lärarentreprenörer använder vår generator för att skapa arbetsblad gratis för försäljning på Teachers Pay Teachers och Etsy. Grundpaketet inkluderar full kommersiell licens utan extra avgifter. Skapa, sälj och tjäna pengar på dina ordpussel utan begränsningar.

Många lärare tjänar 5 000-20 000 kronor per månad genom att sälja digitala arbetsblad. Skapa ordpussel, matematik arbetsblad, målarbilder barn och förskoleklass material för försäljning. Professionell 300 DPI-kvalitet säkerställer nöjda kunder.

Skapa produktpaket med ordpussel, matematik arbetsblad för addition och subtraktion, multiplikationstabellen övningar och klockan lära sig material. Kompletta paket säljer bättre än enskilda arbetsblad.`,
        quote: 'Min prenumeration betalade sig själv första månaden!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from word-scramble.md
  faq: {
    sectionTitle: 'Vanliga Frågor',
    sectionDescription: 'Vanliga frågor om vår ordpussel-generator och arbetsblad gratis.',
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
        question: 'Är Ordpussel-Generatorn Verkligen Gratis för Förskoleklass Material?',
        answer: 'Ordpussel-generatorn kräver en Grundpaket-prenumeration som kostar 144 dollar per år eller 15 dollar per månad. Din prenumeration ger dig obegränsad ordpusselgenerering utan extra avgifter per arbetsblad. Generera så många arbetsblad gratis för utskrift som du behöver utan tilläggskostnader. Grundpaketet inkluderar 10 populära verktyg för arbetsbladskapande.',
      },
      {
        id: '2',
        question: 'Kan Jag Skriva Ut Ordpussel Hemma för Bokstäver Lära Sig?',
        answer: 'Ja, alla arbetsblad kan skrivas ut på vanliga hemskrivare. Arbetsbladen är designade för standard A4-pappersformat. Ladda ner som PDF och skriv ut direkt utan speciella inställningar. Professionell 300 DPI-kvalitet garanterar skarp text och tydliga bilder på alla skrivare. Gråskaleläge sparar färgbläck vid utskrift.',
      },
      {
        id: '3',
        question: 'Behöver Jag Designkunskaper för att Skapa Ordpussel?',
        answer: 'Nej, inga designkunskaper behövs för att skapa professionella arbetsblad gratis. Generatorn är designad för lärare utan teknisk bakgrund. Klicka på tema, välj inställningar, klicka generera. Färdigt arbetsblad på 3 minuter. Alla element placeras automatiskt med perfekt layout och spacing.',
      },
      {
        id: '4',
        question: 'Kan Jag Använda Ordpussel i Mitt Klassrum?',
        answer: 'Ja, Grundpaket-prenumerationen inkluderar obegränsad klassrumsanvändning för alla arbetsblad. Skapa ordpussel för bokstäver lära sig, matematik arbetsblad för multiplikationstabellen, målarbilder barn för konstlektioner. Skapa obegränsat antal kopior för alla dina elever. Dela digitalt via lärplattformar som Google Classroom.',
      },
      {
        id: '5',
        question: 'Vilka Språk Finns Tillgängliga för Ordpussel?',
        answer: 'Ordpussel-generatorn fungerar på 11 olika språk. Svenska, engelska, tyska, franska, spanska, italienska, portugisiska, nederländska, danska, norska och finska. Användargränssnittet är fullständigt översatt till alla språk. Arbetsbladsinnehållet genereras automatiskt på valt språk.',
      },
      {
        id: '6',
        question: 'Kan Jag Sälja Ordpussel Jag Skapar?',
        answer: 'Ja, Grundpaket-prenumerationen inkluderar full kommersiell print-on-demand-licens utan extra avgifter. Sälj dina ordpussel på Teachers Pay Teachers, Etsy eller Amazon KDP. Ingen extra licensavgift utöver prenumerationsavgiften. Ingen attribution krävs på dina arbetsblad.',
      },
      {
        id: '7',
        question: 'Hur Anpassar Jag Ordpussel för Mina Elever?',
        answer: 'Anpassa varje arbetsblad efter dina elevers specifika behov med full redigeringskontroll. Välj antal pussel per sida från 1 till 10. Välj svårighetsgrad med olika antal ledtrådar. Välj mellan versaler och gemener för bokstäver lära sig. Lägg till egna textfält med instruktioner.',
      },
      {
        id: '8',
        question: 'Vilka Åldersgrupper Fungerar Bäst med Ordpussel?',
        answer: 'Ordpussel fungerar utmärkt för barn från 6 år upp till 9 år, motsvarande förskoleklass till årskurs 3. Yngre barn börjar med enkla 3-4 bokstavsord med många ledtrådar. Äldre elever klarar längre ord utan ledtrådar. Anpassa svårighetsgrad efter elevernas nivå.',
      },
      {
        id: '9',
        question: 'Kan Jag Ladda Upp Egna Bilder för Ordpussel?',
        answer: 'Ja, ladda upp dina egna bilder i JPEG, PNG eller GIF-format direkt i generatorn. Multi-fil uppladdning låter dig ladda upp flera bilder samtidigt. Bilderna sparas i sessionen och kan användas i alla arbetsblad. Kombinera egna bilder med bildbiblioteket på samma arbetsblad.',
      },
      {
        id: '10',
        question: 'Hur Lång Tid Tar Det att Skapa Ordpussel?',
        answer: 'Skapa kompletta ordpussel på under 3 minuter från start till nedladdning. Välj tema eller bilder tar 30 sekunder. Anpassa inställningar tar 30 sekunder. Generera arbetsblad tar 10 sekunder. Eventuell redigering tar 1-2 minuter. Jämfört med manuellt skapande som tar 30-60 minuter är detta enorm tidsbesparing.',
      },
      {
        id: '11',
        question: 'Inkluderar Ordpussel Facit?',
        answer: 'Ordpussel inkluderar inte automatiskt genererade facit eftersom svaren är visuellt självklara. Bilden visar vad ordet är och de blandade bokstäverna finns där. Eleverna löser pusslet genom att arrangera bokstäverna till rätt ord baserat på bilden. För digitala arbetsblad kan du skapa två versioner.',
      },
      {
        id: '12',
        question: 'Kan Jag Skapa Ordpussel om Specifika Skolämnen?',
        answer: 'Ja, skapa ordpussel om alla skolämnen genom att använda ämnesspecifika bilder och ordlistor. Naturkunskap: ordpussel om djur, växter, väderfenomen. Samhällskunskap: ordpussel om yrken, byggnader, transport. Matematik: ordpussel om siffror och tal, geometriska former och klockan lära sig.',
      },
    ],
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
    guaranteeText: '30 dagars pengarna-tillbaka-garanti',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombinera med Andra Arbetsblad Generatorer',
    sectionDescription: 'Skapa kompletta läropaket genom att kombinera ordpussel arbetsblad med dessa kompletterande generatorer.',
    ctaTitle: 'Redo att Skapa Fantastiska Arbetsblad?',
    ctaDescription: 'Gå med tusentals lärare som skapar professionella arbetsblad. Obegränsad generering, kommersiell licens ingår.',
    primaryCtaText: 'Starta Gratis Provperiod',
    secondaryCtaText: 'Visa Alla 33 Appar',
    badgeText: 'Fungerar Utmärkt Med',
    exploreText: 'Utforska alla appar',
    trustBadges: {
      guarantee: '30 dagars pengarna-tillbaka-garanti',
      securePayment: 'Säker betalning',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [
      {
        id: '1',
        slug: 'word-search',
        name: 'Ordletare',
        category: 'Språk',
        icon: '🔍',
        description: 'Komplettera ordpussel med ordletare för samma ordförråd teman för omfattande ordträning.',
      },
      {
        id: '2',
        slug: 'crossword',
        name: 'Korsordspussel',
        category: 'Språk',
        icon: '📝',
        description: 'Kombinera ordpussel med korsordspussel för att förstärka stavning och ordförråd från flera vinklar.',
      },
      {
        id: '3',
        slug: 'word-guess',
        name: 'Ordgissning',
        category: 'Språk',
        icon: '❓',
        description: 'Lägg till ordgissningsaktiviteter i dina läscentra tillsammans med ordpussel för varierad träning.',
      },
      {
        id: '4',
        slug: 'alphabet-train',
        name: 'Alfabetståg',
        category: 'Tidig Inlärning',
        icon: '🚂',
        description: 'Balansera ordpussel med bokstavsigenkänningsaktiviteter för omfattande tidig läsning.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Målarbilder',
        category: 'Kreativitet',
        icon: '🎨',
        description: 'Belöna färdiga ordpussel med tematiska målarbilder som utvecklar finmotorik.',
      },
      {
        id: '6',
        slug: 'matching-app',
        name: 'Matchningsövningar',
        category: 'Logik',
        icon: '🔗',
        description: 'Kombinera ordpussel med matchningsövningar för att träna visuell diskriminering och ordförråd.',
      },
    ],
  },
};

export default wordScrambleSvContent;
