import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Guess Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/word-guess-worksheets.ts
 * URL: /sv/apps/gissa-ordet-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/word-guess.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordGuessSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'gissa-ordet-arbetsblad',
    appId: 'word-guess',
    title: 'Gissa Ordet Generator - Arbetsblad Gratis för Bokstäver Lära Sig | Förskoleklass Material',
    description: 'Skapa professionella gissa-ordet-arbetsblad med vår generator. Generera anpassade arbetsblad gratis perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
    keywords: 'gissa ordet generator, arbetsblad gratis, förskoleklass material, bokstäver lära sig, skriva bokstäver, ordgissning, matematik arbetsblad, finmotorik övningar, målarbilder barn, lågstadiet',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/gissa-ordet-arbetsblad',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/word-guess/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis gissa ordet arbetsblad för barn - bildtips och bokstavsrutor för förskoleklass',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/word-guess/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gissa ordet arbetsblad gratis - ordgissning för bokstäver lära sig för lågstadiet',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/word-guess/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis arbetsblad gissa ordet för förskoleklass - visuell ordträning',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/word-guess/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbetsblad gratis gissa ordet för barn - stavningsträning med bildledtrådar',
      },
    ],
  },

  // Hero Section - FULL text from word-guess.md paragraphs 1-4
  hero: {
    title: 'Gissa Ordet Generator',
    subtitle: 'Arbetsblad Gratis för Bokstäver Lära Sig - Förskoleklass Material',
    description: `Skapa professionella gissa-ordet-arbetsblad med vår gissa-ordet-generator. Din Full Tillgång-prenumeration ger dig obegränsad arbetsblad-skapande utan avgifter per arbetsblad. Generera anpassade arbetsblad gratis perfekta för förskoleklass material och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Våra gissa-ordet-arbetsblad kombinerar bildtips med bokstavsrutor. Eleverna använder bilden för att gissa ordet. De skriver sedan bokstäverna i rutorna. Detta gör bokstäver lära sig roligt och visuellt.

Varje arbetsblad innehåller 1-10 gåtor per sida. Välj mellan fyra svårighetsnivåer. Enkel nivå visar hälften av bokstäverna som ledtrådar. Normal nivå visar en fjärdedel av bokstäverna. Svår nivå visar bara en sjättedel. Du kan också skapa gåtor helt utan ledtrådar för avancerade elever.`,
    previewImageSrc: '/samples/swedish/word-guess/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/word guess/
  samples: {
    sectionTitle: 'Gratis Gissa Ordet Arbetsblad Exempel - Arbetsblad för Barn',
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
        worksheetSrc: '/samples/swedish/word-guess/sample-1.jpeg',
        answerKeySrc: '/samples/swedish/word-guess/sample-1-answer.jpeg',
        altText: 'Gratis gissa ordet arbetsblad för barn - bildtips och bokstavsrutor för förskoleklass bokstavsträning',
        pdfDownloadUrl: '/samples/swedish/word-guess/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/swedish/word-guess/sample-2.jpeg',
        answerKeySrc: '/samples/swedish/word-guess/sample-2-answer.jpeg',
        altText: 'Gissa ordet arbetsblad gratis för lågstadiet - ordgissning med färgglada bildledtrådar',
        pdfDownloadUrl: '/samples/swedish/word-guess/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/swedish/word-guess/sample-3.jpeg',
        answerKeySrc: '/samples/swedish/word-guess/sample-3-answer.jpeg',
        altText: 'Gratis arbetsblad för barn gissa ordet - stavningsträning och ordförråd för förskoleklass',
        pdfDownloadUrl: '/samples/swedish/word-guess/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/swedish/word-guess/sample-4.jpeg',
        answerKeySrc: '/samples/swedish/word-guess/sample-4-answer.jpeg',
        altText: 'Arbetsblad för förskoleklass gissa ordet gratis - bokstäver lära sig med bildtips',
        pdfDownloadUrl: '/samples/swedish/word-guess/sample-4.pdf',
      },
    ],
  },

  // Features Grid - FULL text from word-guess.md feature sections
  features: {
    sectionTitle: 'Gissa Ordet Funktioner - Arbetsblad Gratis för Förskoleklass Material och Bokstäver Lära Sig',
    sectionDescription: 'Gissa-ordet-generatorn kombinerar kraftfulla funktioner med enkel användning. Skapa professionella arbetsblad gratis utan designkunskaper. Varje funktion är utformad för lärare som behöver snabba och effektiva förskoleklass material.',
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
        title: 'Skapa Arbetsblad Gratis på 3 Klick',
        description: `Generera kompletta arbetsblad på tre enkla steg. Välj först ditt bildtema från biblioteket. Klicka sedan på genereringsknappen. Ditt arbetsblad visas direkt på duken. Ingen väntetid eller komplikerade inställningar.

Välj mellan 1-10 gåtor per arbetsblad. Anpassa svårighetsnivån för din klass. Enkel nivå passar förskoleklass material. Svårare nivåer fungerar för årskurs 1-3. Varje arbetsblad skapas på under 30 sekunder.

Generatorn hanterar automatisk layout och skalning. Gåtorna placeras perfekt på sidan. Bilderna och bokstavsrutorna justeras automatiskt. Du behöver inte mäta eller positionera element manuellt. Systemet optimerar varje arbetsblad för utskrift.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Redigera Allt på Duken',
        description: `Varje element på ditt arbetsblad är redigerbart. Klicka på vilken bild som helst för att flytta den. Dra den till en ny position. Rotera bilden om du vill. Skala den större eller mindre. Detta gör bokstäver lära sig arbetsblad helt anpassningsbara.

Bokstavsrutorna kan också flyttas och justeras. Ändra storleken på rutorna för yngre elever. Flytta dem till bättre positioner. Gruppera relaterade gåtor tillsammans. Skapa visuellt balanserade layouter som ser professionella ut.

Lägg till anpassad text var som helst på duken. Skriv instruktioner på svenska. Lägg till namn- och datumfält. Inkludera uppmuntrade budskap. Välj mellan flera teckensnitt och storlekar. Justera textfärger och konturer.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Ladda Upp Egna Bilder',
        description: `Ladda upp dina egna bilder för personliga arbetsblad. Välj flera filer samtidigt från din dator. Stöd för JPEG, PNG och GIF-format. Dina uppladdade bilder visas direkt i bildförhandsgranskningen. Kombinera dem med biblioteksbilder för variation.

Använd foton från klassrumsaktiviteter. Ladda upp elevernas målarbilder barn för personliga gåtor. Inkludera bilder från utflykter eller projekt. Detta skapar meningsfulla kopplingar mellan arbetsbladen och elevernas upplevelser.

Uppladdade bilder lagras under din session. De förblir tillgängliga medan du arbetar. Skapa flera arbetsblad med samma uppladdade bilder. Ingen permanent lagring innebär att dina filer förblir privata. Stäng webbläsaren och alla uppladdade bilder raderas automatiskt.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Språk Support',
        description: `Användargränssnittet översätts helt till 11 språk. Välj svenska för alla menyer och instruktioner. Alla knappar, etiketter och meddelanden visas på svenska. Detta gör generatorn lättillgänglig för svenska lärare.

Språkvalet påverkar även ordutvinningen från bildfilnamn. Svenska bildnamn blir svenska ord i gåtorna. Detta är avgörande för bokstäver lära sig och skriva bokstäver övningar. Eleverna ser bekanta svenska ord kopplade till bilder.

De 11 språken inkluderar engelska, tyska, franska, spanska och italienska. Portugisiska, nederländska, danska, norska och finska finns också. Detta gör generatorn idealisk för flerspråkiga klassrum. Skapa arbetsblad på flera språk för språkinlärning.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommersiell Licens Ingår',
        description: `Full Tillgång inkluderar en kommersiell print-on-demand-licens. Sälj dina gissa-ordet-arbetsblad på Teachers Pay Teachers. Lista dem på Etsy som digitala nedladdningar. Publicera arbetsbladsböcker på Amazon KDP. Ingen attribution krävs.

Många lärare tjänar 500-5000 dollar per månad genom att sälja arbetsblad. Skapa paket av matematik arbetsblad och finmotorik övningar. Kombinera gissa-ordet-gåtor med andra arbetsbladstyper. Erbjud tematiska samlingsbuntar.

Den kommersiella licensen täcker obegränsad försäljning. Ingen royalty eller extra avgifter. Sälj så många arbetsblad du vill. Använd Pinterest för att marknadsföra dina produkter. Bygg ett passivt inkomstflöde från ditt arbetsblad-skapande.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Bildbibliotek',
        description: `Tillgång till över 3000 barnvänliga bilder ingår. Bilderna organiseras i temabaserade samlingsbuntar. Välj matematik-teman med siffror och tal. Hitta bilder för addition och subtraktion gåtor. Välj klockan lära sig bilder för tidsrelaterade ord.

Varje tema innehåller 20-50 relaterade bilder. Bläddra genom djur, fordon, mat och kläder. Utforska säsongsbaserade teman för höst, vinter, vår och sommar. Hitta skolrelaterade bilder för klassrumsord. Ämnesspecifika teman täcker vetenskap, historia och geografi.

Bildbiblioteket uppdateras regelbundet med nytt innehåll. Alla bilder är licensierade för utbildningsbruk. Inga extra avgifter per bild eller nedladdning. Obegränsad användning ingår i din prenumeration. Detta sparar hundratals dollar jämfört med betalande bildtjänster.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionell 300 DPI Kvalitet',
        description: `Varje arbetsblad exporteras i professionell 300 DPI-upplösning. Detta garanterar skarp text och tydliga bilder. Utskrifter ser professionella ut på alla skrivare. Bokstavsrutor har perfekta kanter. Bildtips är kristallklara.

Välj mellan PDF- och JPEG-exportformat. PDF bevarar vektortext för skarpaste kvalitet. JPEG fungerar för webbdelning och digitala arbetsflöden. Båda formaten stödjer högupplöst utskrift. Exportera samma arbetsblad i båda formaten vid behov.

Gråskala-alternativet konverterar arbetsblad till svartvitt. Detta sparar färgbläck vid utskrift. Perfekt för massutskrift av klassuppsättningar. Gråskala bibehåller tydlighet och kontrast. Eleverna kan fortfarande se alla detaljer tydligt.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from word-guess.md step sections
  howTo: {
    sectionTitle: 'Hur Man Skapar Gissa Ordet Arbetsblad - Arbetsblad Gratis i 5 Enkla Steg',
    sectionDescription: 'Skapa professionella gissa-ordet-arbetsblad på under 3 minuter med vår enkla 5-stegs process. Inga designkunskaper behövs för att skapa vackra arbetsblad gratis för utskrift. Följ dessa steg för att skapa gissa-ordet-arbetsblad för bokstäver lära sig och förskoleklass material.',
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
        title: 'Välj ditt Innehåll',
        description: `Börja med att välja språk från språkmenyn. Välj svenska för svenska ord och gränssnitt. Detta påverkar ordutvinningen från bildfilnamn. Svenska bilder genererar svenska ord automatiskt.

Öppna bildbiblioteket genom att klicka på bildbibliotek-accordionen. Bläddra genom över 3000 barnvänliga bilder. Bilderna organiseras i teman. Välj ett tema från tema-rullgardinsmenyn. Matematik-teman innehåller siffror, former och räkningsobjekt.

Klicka på enskilda bilder för att välja dem för dina gåtor. Varje vald bild blir en ordgåta. Välj 1-10 bilder beroende på hur många gåtor du vill per sida. Systemet visar valda bilder i förhandsgranskningssektionen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar',
        description: `Öppna övningskonfigurationssektionen. Välj antal gåtor från rullgardinsmenyn. Välj mellan 1-10 gåtor per arbetsblad. Fler gåtor ger mer övning per sida. Färre gåtor ger större bilder och bokstavsrutor.

Välj svårighetsgrad från svårighetsgradsmenyn. Fyra nivåer finns tillgängliga. "Inga ledtrådar" visar inga bokstäver - alla rutor tomma. "Enkel" visar hälften av bokstäverna som ledtrådar. "Normal" visar en fjärdedel av bokstäverna. "Svår" visar bara en sjättedel av bokstäverna.

Välj bokstäversformat - stora bokstäver eller små bokstäver. Stora bokstäver är standard och lättare för unga elever att skriva. Små bokstäver ger övning i gemener för äldre elever.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera',
        description: `Klicka på "Generera"-knappen i det övre högra hörnet. Välj "Nytt arbetsblad" från rullgardinsmenyn. Systemet skapar ditt arbetsblad omedelbart. Förhandsvisningen visas på duken. Hela processen tar 5-10 sekunder.

Arbetsbladsfliken visar elevversionen med partiella ledtrådar. Varje gåta innehåller en bild och bokstavsrutor. Vissa rutor är förifyllda baserat på din svårighetsgrad. Tomma rutor väntar på att eleverna ska fylla i dem.

Granska layouten noggrant. Kontrollera att gåtorna är välplacerade. Verifiera att bilderna är tydliga och igenkännbara. Bekräfta att bokstavsrutorna är tillräckligt stora för att eleverna ska skriva i.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera',
        description: `Efter generering är varje element på arbetsblad redigerbart. Klicka på vilken bild som helst för att välja den. Dra bilden till en ny position. Detta är användbart om layouten känns trång eller obalanserad. Bilderna kan placeras var som helst på sidan.

Rotera bilder genom att dra rotationshandtaget. Små rotationer kan göra layouten mer dynamisk. Skala bilder genom att dra hörnhandtagen. Gör bilder större för betoning eller mindre för att spara utrymme.

Lägg till anpassad text genom att öppna textverktygssektionen. Skriv din text i innehållsfältet. Klicka på "Lägg till text". Texten visas på duken. Dra den till önskad position.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner',
        description: `Ladda ner dina färdiga gissa-ordet-arbetsblad i professionell 300 DPI-kvalitet. Välj mellan PDF för bästa utskriftskvalitet eller JPEG för digital användning. Båda formaten ger kristallklar kvalitet perfekt för utskrift hemma eller på skolan.

PDF-formatet bevarar all kvalitet och fungerar perfekt för skolors kopiatorer. Ladda ner PDF och skriv ut direkt utan kvalitetsförlust. Perfekt för att skriva ut flera kopior för hela klassen.

Välj gråskaleläge för att spara bläck vid utskrift. Särskilt användbart när du skriver ut många kopior av arbetsblad gratis. Gråskala ser fortfarande professionellt ut men använder bara svart bläck.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from word-guess.md use case sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare och Föräldrar',
    sectionDescription: 'Gissa-ordet-generatorn används av lärare och föräldrar över hela Sverige. Skapa arbetsblad gratis för bokstäver lära sig, matematik arbetsblad och förskoleklass material. Varje användargrupp har unika behov som generatorn uppfyller perfekt.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Förskoleklass Lärare',
        subtitle: 'Arbetsblad Gratis för Bokstäver Lära Sig och Skriva Bokstäver',
        description: `Förskoleklass lärare använder gissa-ordet-arbetsblad för tidig läskunskap. Sexåringar lär sig att känna igen bokstäver genom bildassociationer. Bildtipsen hjälper barn att koppla ljud till bokstäver. Detta bygger fonemisk medvetenhet naturligt.

Välj enkel svårighetsgrad för förskoleklass. Hälften av bokstäverna visas som ledtrådar. Barn kan fokusera på att identifiera och skriva de saknade bokstäverna. Detta är lagom utmanande för sexåringar. De känner sig framgångsrika när de slutför varje gåta.

Använd stora bokstäver för förskoleklass material. Unga barn lär sig stora bokstäver först. De är enklare att forma och känna igen. Små bokstäver kommer senare i årskurs 1. Fokusera på stora bokstäver under förskoleåret.`,
        quote: 'Barnen älskar att gissa ord med bildtips!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lågstadielärare Årskurs 1-3',
        subtitle: 'Matematik Arbetsblad och Stavningsträning',
        description: `Lärare i lågstadiet använder gissa-ordet-arbetsblad för stavningsträning från årskurs 1 till årskurs 3. Eleverna utvecklas från enkla tre- och fyrbokstavsord till mer komplexa ord och begrepp. Anpassa svårighetsgraden med olika antal ledtrådar efter elevernas nivå.

Kombinera gissa-ordet-arbetsblad med matematik arbetsblad för tematiska läropaket. Skapa gåtor om siffror och tal med bilder av nummer och mängder. Lägg till addition och subtraktion övningar på samma tema.

Många lärare skapar veckans arbetsblad varje söndag kväll. Med vår generator tar det 15 minuter istället för 2 timmar. Skapa gissa-ordet-arbetsblad för svenska, matematik arbetsblad för matte, målarbilder barn för bildämnet.`,
        quote: 'Gissa-ordet gör stavningsträning roligt och engagerande.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hemundervisande Föräldrar',
        subtitle: 'Arbetsblad Gratis för Bokstäver Lära Sig och Siffror och Tal',
        description: `Hemundervisande föräldrar uppskattar flexibiliteten att skapa arbetsblad gratis anpassade efter varje barns inlärningsstil. Skapa gissa-ordet-arbetsblad om ämnen som intresserar ditt barn. Om barnet älskar dinosaurier, skapa arbetsblad om dinosaurier.

Kombinera flera ämnen på samma arbetsblad för integrerat lärande. Skapa gissa-ordet-arbetsblad om djur, sedan lägg till siffror och tal övningar om att räkna djur. Lägg till målarbilder barn av samma djur för kreativ aktivitet.

Hemundervisning kräver material för flera barn i olika åldrar. Skapa förskoleklass material för yngre syskon och matematik arbetsblad för äldre barn på samma plattform.`,
        quote: 'Ett verktyg täcker alla mina barns årskurser.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Språklärare',
        subtitle: 'Arbetsblad för Bokstäver Lära Sig på 11 Språk',
        description: `Språklärare och lärare i flerspråkiga klasser använder gissa-ordet-arbetsblad för ordförrådsutveckling. Generatorns stöd för 11 språk gör den perfekt för språkundervisning. Skapa arbetsblad på svenska för svenska som andraspråk. Skapa arbetsblad på engelska för engelskundervisning.

Bildbaserade gissa-ordet-arbetsblad fungerar utmärkt för andraspråksinlärning. Eleven ser bilden och lär sig ordet samtidigt som de löser gåtan. Detta kombinerar visuellt lärande med språkträning för effektiv inlärning.

Använd samma bilder för arbetsblad på olika språk. Skapa gåtor om mat på svenska på måndag. Skapa gåtor om mat på engelska på tisdag med samma bilder.`,
        quote: 'Flerspråkigt stöd är avgörande för mitt klassrum.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpedagoger',
        subtitle: 'Förskoleklass Material och Finmotorik Övningar för Anpassat Lärande',
        description: `Specialpedagoger använder gissa-ordet-arbetsblad för strukturerade övningar anpassade efter elevers individuella behov. Stora, tydliga bokstäver fungerar perfekt för elever med synsvårigheter. Färgkodade bokstäver hjälper elever med lässvårigheter att känna igen bokstavsmönster.

Skapa arbetsblad med endast 1-2 gåtor per sida för elever som blir överstimulerade. Lägg till extra stora bilder och bokstäver för tydlighet. Anpassa varje arbetsblad exakt efter elevens funktionsnivå och behov.

Kombinera gissa-ordet-arbetsblad med finmotorik övningar för elever som behöver träna penngrepp. Lägg till tracingövningar för bokstäver lära sig och motorik samtidigt.`,
        quote: 'Jag kan snabbt anpassa arbetsblad för varje elevs behov.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lärarentreprenörer',
        subtitle: 'Sälj Arbetsblad Gratis på Teachers Pay Teachers och Etsy',
        description: `Lärarentreprenörer använder vår generator för att skapa arbetsblad gratis för försäljning på Teachers Pay Teachers och Etsy. Full Tillgång inkluderar full kommersiell licens utan extra avgifter. Skapa, sälj och tjäna pengar på dina gissa-ordet-arbetsblad utan begränsningar.

Många lärare tjänar 5 000-20 000 kronor per månad genom att sälja digitala arbetsblad. Skapa gissa-ordet-arbetsblad, matematik arbetsblad, målarbilder barn och förskoleklass material för försäljning.

Skapa produktpaket med gissa-ordet-arbetsblad, matematik arbetsblad för addition och subtraktion, och klockan lära sig material. Kompletta paket säljer bättre än enskilda arbetsblad.`,
        quote: 'Min prenumeration betalade sig själv första månaden!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from word-guess.md
  faq: {
    sectionTitle: 'Vanliga Frågor om Gratis Gissa Ordet Arbetsblad för Barn',
    sectionDescription: 'Vanliga frågor om vår gissa-ordet-generator och arbetsblad gratis.',
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
        question: 'Är Gissa-Ordet-Generatorn Verkligen Gratis för Förskoleklass Material?',
        answer: 'Gissa-ordet-generatorn kräver en Full Tillgång-prenumeration som kostar 240 dollar årligen eller 25 dollar månaden. Din prenumeration ger dig obegränsad gissa-ordet-skapande utan extra avgifter per arbetsblad. Generera så många arbetsblad gratis för utskrift som du behöver utan tilläggskostnader. Full Tillgång inkluderar alla 33 arbetsblad-generatorer på plattformen.',
      },
      {
        id: '2',
        question: 'Kan Jag Skriva Ut Gissa-Ordet-Arbetsblad Hemma för Bokstäver Lära Sig?',
        answer: 'Ja, alla arbetsblad kan skrivas ut på vanliga hemskrivare. Arbetsbladen är designade för standard A4-pappersformat. Ladda ner som PDF och skriv ut direkt utan speciella inställningar. Professionell 300 DPI-kvalitet garanterar skarp text och tydliga bilder på alla skrivare. Gråskaleläge sparar färgbläck vid utskrift.',
      },
      {
        id: '3',
        question: 'Behöver Jag Designkunskaper för att Skapa Gissa-Ordet-Arbetsblad?',
        answer: 'Nej, inga designkunskaper behövs för att skapa professionella arbetsblad gratis. Generatorn är designad för lärare utan teknisk bakgrund. Klicka på tema, välj inställningar, klicka generera. Färdigt arbetsblad på 3 minuter. Alla element placeras automatiskt med perfekt layout och spacing.',
      },
      {
        id: '4',
        question: 'Kan Jag Använda Gissa-Ordet-Arbetsblad i Mitt Klassrum?',
        answer: 'Ja, Full Tillgång-prenumerationen inkluderar obegränsad klassrumsanvändning för alla arbetsblad. Skapa gissa-ordet-arbetsblad för bokstäver lära sig, matematik arbetsblad för multiplikationstabellen, målarbilder barn för konstlektioner. Skapa obegränsat antal kopior för alla dina elever. Dela digitalt via lärplattformar som Google Classroom.',
      },
      {
        id: '5',
        question: 'Vilka Språk Finns Tillgängliga för Gissa-Ordet-Arbetsblad?',
        answer: 'Gissa-ordet-generatorn fungerar på 11 olika språk. Svenska, engelska, tyska, franska, spanska, italienska, portugisiska, nederländska, danska, norska och finska. Användargränssnittet är fullständigt översatt till alla språk. Arbetsbladsinnehållet genereras automatiskt på valt språk.',
      },
      {
        id: '6',
        question: 'Kan Jag Sälja Gissa-Ordet-Arbetsblad Jag Skapar?',
        answer: 'Ja, Full Tillgång-prenumerationen inkluderar full kommersiell print-on-demand-licens utan extra avgifter. Sälj dina gissa-ordet-arbetsblad på Teachers Pay Teachers, Etsy eller Amazon KDP. Ingen extra licensavgift utöver prenumerationsavgiften. Ingen attribution krävs på dina arbetsblad.',
      },
      {
        id: '7',
        question: 'Hur Anpassar Jag Gissa-Ordet-Arbetsblad för Mina Elever?',
        answer: 'Anpassa varje arbetsblad efter dina elevers specifika behov med full redigeringskontroll. Välj antal gåtor per sida från 1 till 10. Välj svårighetsgrad med olika antal ledtrådar. Välj mellan versaler och gemener för bokstäver lära sig. Lägg till egna textfält med instruktioner.',
      },
      {
        id: '8',
        question: 'Vilka Åldersgrupper Fungerar Bäst med Gissa-Ordet-Arbetsblad?',
        answer: 'Gissa-ordet-arbetsblad fungerar utmärkt för barn från 5 år upp till 9 år, motsvarande förskoleklass till årskurs 3. Yngre barn börjar med enkla 3-4 bokstavsord med många ledtrådar. Äldre elever klarar längre ord utan ledtrådar. Anpassa svårighetsgrad efter elevernas nivå.',
      },
      {
        id: '9',
        question: 'Kan Jag Ladda Upp Egna Bilder för Gissa-Ordet-Arbetsblad?',
        answer: 'Ja, ladda upp dina egna bilder i JPEG, PNG eller GIF-format direkt i generatorn. Multi-fil uppladdning låter dig ladda upp flera bilder samtidigt. Bilderna sparas i sessionen och kan användas i alla arbetsblad. Kombinera egna bilder med bildbiblioteket på samma arbetsblad.',
      },
      {
        id: '10',
        question: 'Hur Lång Tid Tar Det att Skapa Gissa-Ordet-Arbetsblad?',
        answer: 'Skapa kompletta gissa-ordet-arbetsblad på under 3 minuter från start till nedladdning. Välj tema eller bilder tar 30 sekunder. Anpassa inställningar tar 30 sekunder. Generera arbetsblad tar 10 sekunder. Eventuell redigering tar 1-2 minuter. Jämfört med manuellt skapande som tar 30-60 minuter är detta enorm tidsbesparing.',
      },
      {
        id: '11',
        question: 'Inkluderar Gissa-Ordet-Arbetsblad Facit?',
        answer: 'Ja, gissa-ordet-generatorn skapar automatiskt separata facit. Efter att ha genererat arbetsbladsidan klicka generera igen. Välj "Facit" från rullgardinsmenyn. Systemet skapar facitversion med alla bokstäver ifyllda. Detta gör rättning oerhört snabb och enkel.',
      },
      {
        id: '12',
        question: 'Kan Jag Skapa Gissa-Ordet-Arbetsblad om Specifika Skolämnen?',
        answer: 'Ja, skapa gissa-ordet-arbetsblad om alla skolämnen genom att använda ämnesspecifika bilder och ordlistor. Naturkunskap: gåtor om djur, växter, väderfenomen. Samhällskunskap: gåtor om yrken, byggnader, transport. Matematik: gåtor om siffror och tal, geometriska former och klockan lära sig.',
      },
    ],
  },

  // Pricing
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
    sectionTitle: 'Kombinera Gratis Gissa Ordet med Andra Arbetsblad för Barn',
    sectionDescription: 'Skapa kompletta läropaket genom att kombinera gissa-ordet-arbetsblad med dessa kompletterande generatorer.',
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
    items: [
      {
        id: '1',
        slug: 'word-search',
        name: 'Ordletare',
        category: 'Språk',
        icon: '🔍',
        description: 'Komplettera gissa-ordet med ordletare för samma ordförråd teman för omfattande ordträning.',
      },
      {
        id: '2',
        slug: 'crossword',
        name: 'Korsordspussel',
        category: 'Språk',
        icon: '📝',
        description: 'Kombinera gissa-ordet med korsordspussel för att förstärka stavning och ordförråd från flera vinklar.',
      },
      {
        id: '3',
        slug: 'word-scramble',
        name: 'Ordpussel',
        category: 'Språk',
        icon: '🔀',
        description: 'Lägg till ordpussel aktiviteter i dina läscentra tillsammans med gissa-ordet för varierad träning.',
      },
      {
        id: '4',
        slug: 'alphabet-train',
        name: 'Alfabetståg',
        category: 'Tidig Inlärning',
        icon: '🚂',
        description: 'Balansera gissa-ordet med bokstavsigenkänningsaktiviteter för omfattande tidig läsning.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Målarbilder',
        category: 'Kreativitet',
        icon: '🎨',
        description: 'Belöna färdiga gissa-ordet-arbetsblad med tematiska målarbilder som utvecklar finmotorik.',
      },
      {
        id: '6',
        slug: 'matching-app',
        name: 'Matchningsövningar',
        category: 'Logik',
        icon: '🔗',
        description: 'Kombinera gissa-ordet med matchningsövningar för att träna visuell diskriminering och ordförråd.',
      },
    ],
  },
};

export default wordGuessSvContent;
