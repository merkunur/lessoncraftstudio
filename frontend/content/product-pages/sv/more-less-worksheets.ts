import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * More Less Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/more-less-worksheets.ts
 * URL: /sv/apps/jamforelse-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/more-less.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const moreLessSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'jamforelse-arbetsblad',
    appId: 'more-less',
    title: 'Matematik Arbetsblad för Siffror och Tal - Arbetsblad Gratis Jämförelse för Förskoleklass',
    description: 'Skapa professionella matematik arbetsblad för jämförelse av siffror och tal. Generera anpassade matte övningar med större än, mindre än och lika med symboler. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
    keywords: 'matematik arbetsblad, arbetsblad gratis, jämförelse, större än mindre än, förskoleklass material, matte övningar, siffror och tal, taluppfattning',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/jamforelse-arbetsblad',
  },

  // Hero Section - FULL text from more-less.md paragraphs 1-4
  hero: {
    title: 'Jämförelse Arbetsblad',
    subtitle: 'Matematik Arbetsblad för Siffror och Tal i Förskoleklass',
    description: `Skapa professionella matematik arbetsblad för jämförelse av siffror och tal. Din Full Tillgång-prenumeration ger dig obegränsad tillgång till arbetsbladsskapande utan extra avgifter per arbetsblad. Generera anpassade matte övningar perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Vår jämförelsegenerator hjälper barn att lära sig siffror och tal genom visuella övningar. Eleverna jämför antal objekt och använder symbolerna större än, mindre än eller lika med. Varje matematik arbetsblad kan anpassas helt efter dina elevers behov. Välj mellan olika bilder, teman och svårighetsgrader.

Använd vårt verktyg för att skapa arbetsblad gratis från per-arbetsblad-avgifter. Full Tillgång-prenumerationen kostar 240 euro per år eller 25 euro per månad. Du får tillgång till alla 33 arbetsbladsgeneratorer inklusive denna jämförelsegenerator. Perfekt för lärare i förskoleklass som behöver matte övningar för taluppfattning och jämförelser.`,
    previewImageSrc: '/samples/english/more less/image to image.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/more less/
  samples: {
    sectionTitle: 'Jämförelsearbetsblad Exempel',
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
        worksheetSrc: '/samples/english/more less/image to image.jpeg',
        answerKeySrc: '/samples/english/more less/image to image answer_key.jpeg',
        altText: 'Jämförelsearbetsblad bild mot bild för förskoleklass',
        pdfDownloadUrl: '/samples/english/more less/image to image.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/more less/image to number.jpeg',
        answerKeySrc: '/samples/english/more less/image to number answer_key.jpeg',
        altText: 'Jämförelsearbetsblad bild mot siffra för siffror och tal',
        pdfDownloadUrl: '/samples/english/more less/image to number.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/more less/illustration.jpeg',
        answerKeySrc: '/samples/english/more less/illustration answer_key.jpeg',
        altText: 'Jämförelsearbetsblad med illustrerade symboler för matematik',
        pdfDownloadUrl: '/samples/english/more less/illustration.pdf',
      },
    ],
  },

  // Features Grid - FULL text from more-less.md feature sections
  features: {
    sectionTitle: 'Matematik Arbetsblad Funktioner - Allt Du Behöver för Siffror och Tal i Förskoleklass Material',
    sectionDescription: 'Vår jämförelsegenerator för matematik arbetsblad erbjuder kraftfulla funktioner. Skapa professionella matte övningar på minuter istället för timmar. Varje funktion är designad för lärare i förskoleklass och lågstadiet. Generera arbetsblad gratis från extra avgifter per arbetsblad med din prenumeration.',
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
        title: 'Skapa Matematik Arbetsblad på 3 Klick - Snabb Generator för Siffror och Tal',
        description: `Skapa jämförelsearbetsblad på sekunder. Välj antal uppgifter mellan 1 och 8. Välj ditt tema från bildbiblioteket. Klicka på Skapa och ditt arbetsblad är klart. Inga komplicerade inställningar krävs för grundläggande matte övningar.

Generatorn producerar professionella arbetsblad direkt. Perfekt för förskoleklass och årskurs 1-3. Varje matematik arbetsblad innehåller visuella jämförelser med bilder. Eleverna jämför antal objekt och använder rätt symbol. Hela processen tar under 3 minuter från start till färdigt arbetsblad.

Välj mellan olika jämförelselägen. Bild mot bild eller bild mot siffra. Använd samma bilder för tydliga jämförelser. Eller välj olika bilder för mer variation. Anpassa svårighetsgraden efter elevernas nivå. Skapa arbetsblad gratis från tidskrävande manuellt arbete.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Redigera Allt på Duken - Full Anpassning av Matte Övningar för Siffror och Tal',
        description: `Varje element på ditt matematik arbetsblad är redigerbart. Dra, rotera och ändra storlek på alla bilder. Flytta siffror och tal till perfekta positioner. Ändra textfärger och fonter efter behov. Ta bort element du inte vill ha med.

Canvas-redigeraren ger dig fullständig kontroll. Lägg till egna textrutor med instruktioner. Ändra storleken på bilder för bättre layout. Justera positionering för perfekt balans. Varje förändring syns direkt på duken.

Perfekt för att anpassa matte övningar till specifika elever. Gör bilderna större för elever med synsvårigheter. Lägg till extra instruktioner på svenska. Kombinera flera övningstyper på samma arbetsblad. Din kreativitet är den enda gränsen för anpassning.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Ladda Upp Egna Bilder - Skapa Personliga Arbetsblad Gratis från Extra Avgifter',
        description: `Ladda upp dina egna bilder för unika matematik arbetsblad. Använd foton från klassrummet eller skolans omgivning. Kombinera egna bilder med våra 3000+ biblioteksbilder. Alla vanliga bildformat fungerar perfekt.

Flerfils-uppladdning sparar tid. Välj flera bilder samtidigt från din dator. Bilderna laddas snabbt upp och blir tillgängliga direkt. Använd dem i alla dina matte övningar. Perfekt för att göra övningar relevanta för dina elever.

Skapa temaarbetsblad med lokala bilder. Fotografera föremål från klassrummet. Använd bilder från elevernas vardag. Detta gör siffror och tal mer meningsfulla. Eleverna känner igen bilderna och engagerar sig mer i uppgifterna.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Matematik Arbetsblad på 11 Språk - Flerspråkigt Förskoleklass Material',
        description: `Bildbiblioteket finns på 11 olika språk. Svenska, engelska, tyska, franska, spanska och fler. Byt språk med en enkel rullgardinsmeny. Bildnamnen uppdateras automatiskt till valt språk. Perfekt för flerspråkiga klassrum och språkinlärning.

Särskilt värdefullt för svenskundervisning och svenska som andraspråk. Eleverna lär sig siffror och tal samtidigt som de övar svenska ord. Varje matematik arbetsblad blir också språkträning. Kombinera matematisk och språklig utveckling i samma övning.

Flerspråksstödet hjälper internationella skolor. Skapa matte övningar på elevernas modersmål. Eller använd svenska för att stödja språkutveckling. Flexibiliteten gör verktyget användbart i många olika sammanhang. Arbetsblad gratis från språkbarriärer med 11 språkalternativ.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommersiell Licens Ingår - Sälj Dina Matematik Arbetsblad och Matte Övningar',
        description: `Full Tillgång-prenumerationen inkluderar kommersiell print-on-demand-licens. Sälj dina matematik arbetsblad på Teachers Pay Teachers. Starta en Etsy-butik med förskoleklass material. Publicera på Amazon KDP. Inga extra licensavgifter utöver din prenumeration.

Många lärare tjänar 5000-50000 kronor per månad på att sälja arbetsblad. Din prenumeration på 240 euro per år inkluderar full säljrätt. Ingen attribution krävs på dina produkter. Skapa arbetsblad, exportera i högkvalitet och sälj direkt.

Perfekt för lärarentreprenörer som vill bygga en sidoinkomst. Skapa unika jämförelsearbetsblad för svenska marknaden. Kombinera med andra matte övningar för kompletta paket. 300 DPI-kvaliteten garanterar professionella produkter. Dina kunder får högkvalitativa arbetsblad gratis från kvalitetsproblem.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bildbibliotek med 3000+ Bilder för Barn - Målarbilder och Material för Siffror och Tal',
        description: `Över 3000 barnvänliga bilder inkluderade i prenumerationen. Organiserade i temagrupper för enkel sökning. Djur, fordon, mat, leksaker och mycket mer. Alla bilder designade för barn i förskoleklass och lågstadiet.

Välj temabaserat eller bläddra bland individuella bilder. Sökfunktionen hittar rätt bilder snabbt. Alla bakgrunder och ramar ingår utan extra kostnad. Skapa varierade matematik arbetsblad med olika teman varje vecka.

Bilderna fungerar perfekt för jämförelseövningar med siffror och tal. Tydliga konturer gör det lätt att räkna objekt. Färgglada illustrationer håller eleverna engagerade. Kombinera olika bildteman för mer utmanande matte övningar. Bildbiblioteket växer kontinuerligt med nya tillägg.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionell 300 DPI-Kvalitet - Högkvalitativa Matematik Arbetsblad för Förskoleklass',
        description: `Exportera alla arbetsblad i professionell 300 DPI-upplösning. PDF- och JPEG-format tillgängliga för alla matte övningar. Gråskaleläge sparar bläck vid utskrift. Perfekt för både hemmabruk och professionell tryckning.

Högupplösta arbetsblad ser professionella ut. Skarpa linjer och tydliga bilder. Text och siffror och tal är kristallklara. Kvaliteten matchar kommersiellt tryckta arbetshäften. Dina elever får material som ser professionellt ut.

Ladda ner worksheets och facitblad separat. Båda i samma höga kvalitet. Ångra och gör om-funktionen låter dig experimentera fritt. Spara tid genom att skapa flera arbetsblad i en session. Full Tillgång ger dig obegränsade nedladdningar av alla matematik arbetsblad du skapar.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from more-less.md step sections
  howTo: {
    sectionTitle: 'Hur Man Skapar Matematik Arbetsblad för Siffror och Tal på 5 Enkla Steg - Arbetsblad Gratis på Minuter',
    sectionDescription: 'Skapa professionella jämförelsearbetsblad för förskoleklass på under 3 minuter. Följ dessa fem enkla steg för perfekta matte övningar. Ingen erfarenhet av design krävs. Bara välj inställningar och klicka på Skapa. Hela processen är snabb och intuitiv för alla lärare.',
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
        title: 'Välj Ditt Innehåll för Siffror och Tal - Förskoleklass Material och Teman',
        description: `Börja med att välja bilder för dina jämförelseövningar. Du har två huvudalternativ för bildval. Välj individuella bilder eller ett helt tema. Båda alternativen skapar effektiva matematik arbetsblad.

För individuellt bildval väljer du först ett tema från rullgardinsmenyn. Bildbiblioteket visar alla tillgängliga bilder inom temat. Klicka på 1-5 bilder du vill använda. Valda bilder markeras tydligt. Detta ger dig full kontroll över exakt vilka bilder som används.

För temabaserat val väljer du bara ett tema från listan. Generatorn väljer slumpmässigt bilder från temat. Perfekt när du vill ha variation mellan arbetsblad. Samma tema ger olika bilder varje gång du genererar. Sparar tid när du skapar många matte övningar.

Ladda upp egna bilder om du vill. Klicka på uppladdningsknappen och välj filer. Dina bilder blir tillgängliga direkt i generatorn. Kombinera egna bilder med biblioteksbilder fritt. Skapa arbetsblad gratis från begränsningar med personliga bilder.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar för Matte Övningar - Matematik Arbetsblad för Alla Nivåer',
        description: `Välj antal övningar mellan 1 och 8. Färre övningar passar yngre barn i förskoleklass. Fler övningar utmanar äldre elever i lågstadiet. Justera antalet baserat på elevernas ålder och koncentrationsförmåga.

Välj jämförelseläge för dina matematik arbetsblad. Bild mot bild visar två grupper med objekt. Perfekt för visuell jämförelse av siffror och tal. Bild mot nummer kombinerar bilder med skriven siffra. Detta övar både räkning och sifferigenkänning.

Välj bildvariation för övningarna. Samma bilder betyder samma objekt i båda grupperna. Till exempel 5 katter mot 7 katter. Detta underlättar jämförelsen för nybörjare. Olika bilder använder olika objekt. Till exempel 5 katter mot 7 hundar. Mer utmanande men utvecklar flexibelt tänkande.

Välj vilka relationer som ska ingå. Bocka i större än, mindre än eller lika med. Du kan aktivera alla tre eller bara vissa. Detta låter dig fokusera på specifika begrepp. Börja med bara större än och mindre än för nybörjare. Lägg till lika med senare.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera Dina Arbetsblad Gratis - Matte Övningar Skapas Direkt för Förskoleklass',
        description: `Klicka på Skapa-knappen när alla inställningar är klara. Generatorn skapar ditt matematik arbetsblad omedelbart. Hela processen tar bara några sekunder. Arbetsbladet visas på duken redo för användning.

Generatorn placerar alla element automatiskt. Bilder, siffror och tal positioneras professionellt. Jämförelsesymboler centreras mellan grupperna. Övningsnummer läggs till om aktiverat. Layouten ser professionell ut direkt.

Skapa facitblad samtidigt genom att klicka på motsvarande knapp. Facitbladet visar samma övningar med rätta svar ifyllda. Symbolerna är redan markerade eller cirklade. Perfekt för rättning och självkontroll. Både arbetsblad och facit finns tillgängliga.

Om du inte är nöjd klickar du bara på Skapa igen. En ny version genereras med nya bilder om du valt temaläge. Eller samma bilder i nya positioner. Experimentera fritt tills du hittar den perfekta layouten. Obegränsad generering ingår i prenumerationen.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera på Duken - Anpassa Matematik Arbetsblad för Siffror och Tal Perfekt',
        description: `Klicka på vilket element som helst för att välja det. Valda element får markeringsramar. Dra för att flytta element till nya positioner. Använd hörnhandtagen för att ändra storlek. Rotera med rotationshandtaget om behövs.

Ändra textegenskaper för alla texter. Välj en text och justera färg med färgväljaren. Ändra storlek med storleksreglaget. Byt font från fontrullgardinsmenyn. Lägg till konturer för bättre läsbarhet om önskat.

Lägg till egna textrutor med instruktioner. Klicka på Lägg till text-knappen. Skriv din text och placera den var du vill. Perfekt för att lägga till extra förklaringar på svenska. Eller skapa specialinstruktioner för specifika elever.

Använd verktygsfältet för mer kontroll. Lagerknapparna flyttar element framåt eller bakåt. Justeringsknapparna centrerar eller justerar element. Låsknappen låser element så de inte flyttas av misstag. Raderingsknappen tar bort valda element.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner och Skriv Ut Matematik Arbetsblad Gratis - Högkvalitativa PDF för Förskoleklass Material',
        description: `Klicka på Ladda ner-knappen när arbetsbladet är klart. Välj mellan JPEG eller PDF-format. Båda formaten är högkvalitativa 300 DPI. JPEG fungerar bra för digital användning. PDF är perfekt för utskrift.

Ladda ner arbetsbladet och facitbladet separat. Båda finns tillgängliga i nedladdningsmenyn. Arbetsbladet för eleverna saknar svar. Facitbladet visar alla korrekta jämförelser. Skriv ut det antal du behöver av vardera.

Aktivera gråskaleläge för att spara bläck. Bocka i gråskale-alternativet före nedladdning. Arbetsbladet konverteras till svartvitt automatiskt. Perfekt för klassrumsbudgetar med begränsad färgutskrift. Kvaliteten förblir hög även i gråskala.

Skriv ut på vilken skrivare som helst. Hemskrivare fungerar utmärkt för matte övningar. Skolans kopieringsmaskin producerar många kopior snabbt. Professionella tryckeri ger premium-kvalitet för kommersiell försäljning. Filerna är optimerade för alla utskriftsmetoder.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from more-less.md use case sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare och Föräldrar - Förskoleklass Material och Matte Övningar för Siffror och Tal',
    sectionDescription: 'Jämförelsearbetsblad passar många olika användare och undervisningssituationer. Lärare i olika årskurser använder verktyget dagligen. Hemmaskolande föräldrar skapar anpassade lektioner. Specialpedagoger differentierar undervisning effektivt. Varje användargrupp hittar unika fördelar med dessa arbetsblad gratis från designkostnader.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Förskoleklass-Lärare',
        subtitle: 'Arbetsblad Gratis för Siffror och Tal Grundläggande Begrepp',
        description: `Förskoleklass-lärare använder jämförelsearbetsblad för tidig taluppfattning. Barn i förskoleklass lär sig räkna och jämföra på visuellt sätt. Verktyget skapar perfekta övningar för denna åldersgrupp. Färgglada bilder håller sexåringars uppmärksamhet.

Börja med enkla jämförelser mellan 1 och 5 objekt. Använd samma bilder för att underlätta räkning. Aktivera bara större än och mindre än symbolerna först. Introducera lika med-konceptet senare när barnen behärskar grunderna.

Skapa tematiska arbetsblad kopplade till årstider eller högtider. Jämför pumpor i oktober, hjärtan i februari. Detta gör matematik meningsfullt och roligt. Barn kopplar räkning till sina egna upplevelser. Engagemanget ökar dramatiskt med relevanta teman.`,
        quote: 'Mina 6-åringar älskar att jämföra storlekar med dessa arbetsblad!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lågstadielärare Årskurs 1-3',
        subtitle: 'Matematik Arbetsblad för Progression i Siffror och Tal',
        description: `Lärare för årskurs 1-3 använder jämförelsearbetsblad för progressiv svårighetsgrad. Årskurs 1 börjar med enkla jämförelser upp till 10. Årskurs 2 arbetar med tal upp till 20. Årskurs 3 hanterar större tal och mer komplexa mönster.

Bild-mot-nummer-läget introducerar sifferigenkänning. Elever ser gruppen med 7 objekt och jämför med siffran 7. Detta bygger bro mellan konkret och abstrakt tänkande. Kritiskt för matematisk utveckling i lågstadiet. Verktyget gör denna övergång smidig och naturlig.

Skapa arbetsblad som matchar lärobokens progression. Om klassen arbetar med addition och subtraktion inkludera dessa begrepp. Jämför 5+2 mot 6 objekt. Eller 10-3 mot 8 objekt. Integration med annan matematik förstärker inlärning. Eleverna ser samband mellan olika matematiska koncept.`,
        quote: 'Storleksjämförelser ger en stark grund för matematiskt tänkande.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hemmaskolande Föräldrar',
        subtitle: 'Flexibla Arbetsblad Gratis för Individuell Takt och Siffror och Tal',
        description: `Hemmaskolande föräldrar uppskattar full kontroll över innehåll och svårighetsgrad. Varje barn lär sig i sin egen takt. Verktyget låter dig anpassa exakt efter barnets nivå. Skapa lättare arbetsblad för repetition. Eller utmanande övningar för acceleration.

Temabaserat lärande fungerar perfekt hemma. Välj bilder som matchar familjens intressen. Ett djurintresserat barn får jämförelsearbetsblad med olika djur. Ett fordonsfascinerat barn räknar bilar och lastbilar. Personalisering ökar motivation och inlärning dramatiskt.

Kombinera jämförelseövningar med verkliga situationer. Räkna äpplen i fruktkorgen och jämför med bananer. Skapa arbetsblad med samma frukt efteråt. Kopplingen mellan verklig och pappersmatte förstärker förståelse. Barn ser matematikens praktiska relevans direkt.`,
        quote: 'Ett verktyg täcker alla mina barns behov hemma.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Språklärare och SFI',
        subtitle: 'Matematik Arbetsblad på 11 Språk för Flerspråkig Undervisning',
        description: `Språklärare använder jämförelsearbetsblad för integrerad språk- och matematikundervisning. Svenska som andraspråk-elever lär sig siffror och tal samtidigt som matematiska begrepp. Flerspråksstödet med 11 språk gör verktyget ovärderligt. Byt mellan svenska och elevernas modersmål efter behov.

Bilderna ger visuellt stöd för språkinlärning. Elever lär sig svenska ord för djur, fordon, mat genom räkneövningar. Varje jämförelsearbetsblad blir också en ordförrådsinlärning. Integration av flera ämnen sparar undervisningstid. Eleverna utvecklas i både matematik och språk samtidigt.

Skapa arbetsblad för att öva jämförelseord på svenska. Större än, mindre än, lika med är viktiga begrepp. Många, få, fler, färre används i vardagsspråk. Matematik ger konkret kontext för dessa abstrakta ord. Visuella jämförelser gör orden meningsfulla och begripliga.`,
        quote: 'Flerspråkigt stöd är avgörande för mitt klassrum.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpedagoger',
        subtitle: 'Anpassade Matte Övningar för Differentierad Undervisning av Siffror och Tal',
        description: `Specialpedagoger använder jämförelsearbetsblad för höggradig differentiering. Elever med särskilda behov kräver individuellt anpassat material. Verktyget låter dig skapa precis rätt svårighetsnivå. Stora bilder för synsvårigheter. Enkla jämförelser för koncentrationssvårigheter.

Börja med mycket konkreta övningar. Jämför 2 objekt mot 3 objekt. Använd bekanta bilder som eleven känner igen. Gradvis ökning av svårighetsgrad efter elevens takt. Dokumentera framsteg med sparade arbetsblad över tid. Detta visar tydlig utveckling för både elev och vårdnadshavare.

Skapa arbetsblad för specifika inlärningsmål. En elev behöver öva bara större än-konceptet. Inaktivera mindre än och lika med. Fokuserad övning ger bättre resultat än blandade övningar. Målstyrning fungerar bäst för elever med inlärningssvårigheter.`,
        quote: 'Jag kan snabbt anpassa arbetsblad för varje elevs behov.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lärarentreprenörer',
        subtitle: 'Sälja Arbetsblad Gratis från Extra Licensavgifter på TPT och Etsy',
        description: `Lärarentreprenörer använder verktyget för att skapa säljbara produkter. Teachers Pay Teachers och Etsy är stora marknader för arbetsbladsmaterial. Full Tillgång-prenumerationen på 240 euro per år inkluderar kommersiell licens. Ingen extra kostnad för att sälja det du skapar.

Skapa temade jämförelsepaketet för den svenska marknaden. Kombinera flera arbetsblad kring årstider, högtider eller teman. Ett höstpaket med pumpor, löv och ekollon. Ett vinterpaket med snöflingor och tomtar. Paket säljer bättre än enstaka arbetsblad.

Exportera i högkvalitativ PDF för professionella produkter. 300 DPI-kvaliteten matchar kommersiellt tryckta material. Dina kunder får premium-produkter. Positiva recensioner leder till fler försäljningar. Kvalitet är avgörande för framgång på TPT och Etsy.`,
        quote: 'Min prenumeration betalade sig själv första månaden!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from more-less.md
  faq: {
    sectionTitle: 'Vanliga Frågor om Matematik Arbetsblad för Jämförelser och Förskoleklass Material',
    sectionDescription: 'Lärare och föräldrar har många frågor om jämförelsegeneratorn. Här besvarar vi de vanligaste frågorna. Svaren täcker prenumeration, användning i klassrummet och tekniska detaljer.',
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
        question: 'Är Denna Jämförelsegenerator Verkligen Gratis att Använda för Matematik Arbetsblad?',
        answer: 'Jämförelsegeneratorn kräver en Full Tillgång-prenumeration som kostar 240 euro årligen eller 25 euro månadsvis. Din prenumeration ger dig obegränsad skapande av jämförelsearbetsblad utan extra avgifter per arbetsblad. Generera så många matematik arbetsblad du behöver utan ytterligare kostnader. Full Tillgång inkluderar alla 33 arbetsbladsgeneratorer på plattformen. Grundpaketet-prenumerationen inkluderar 10 populära arbetsbladsgeneratorer och kostar 144 euro årligen. Båda prenumerationerna inkluderar kommersiell licensiering, 11-språksstöd och professionell 300 DPI-kvalitetsexport.',
      },
      {
        id: '2',
        question: 'Kan Jag Skriva Ut Jämförelseworksheets Hemma på Min Vanliga Skrivare med Förskoleklass Material?',
        answer: 'Ja, alla jämförelseworksheets skrivs ut perfekt på vanliga hemskrivare. PDF-formatet är optimerat för standardskrivare. JPEG-formatet fungerar också utmärkt. Välj gråskaleläge för att spara färgbläck. Arbetsbladen ser professionella ut även i svartvitt. Använd vanligt kopieringspapper för daglig klassrumsanvändning. Eller högkvalitetspapper för material du vill behålla länge. Hemskrivare hanterar 300 DPI-kvaliteten utan problem. Skolans kopieringsmaskin producerar många kopior snabbt och billigt.',
      },
      {
        id: '3',
        question: 'Behöver Jag Designkunskaper för att Skapa Professionella Matematik Arbetsblad?',
        answer: 'Inga designkunskaper krävs alls. Verktyget är designat för lärare utan teknisk bakgrund. Välj bara dina inställningar och klicka på Skapa. Generatorn skapar professionella layouts automatiskt. Alla element placeras perfekt utan manuell justering. Canvas-redigeraren är intuitiv och enkel. Dra och släpp-funktionen fungerar precis som förväntat. Ändra storlek med enkla handtag. Rotera med rotationsverktyget. Även tekniskt osäkra lärare lär sig på minuter.',
      },
      {
        id: '4',
        question: 'Kan Jag Använda Jämförelseworksheets i Min Förskoleklass för Elever?',
        answer: 'Full Tillgång-prenumerationen inkluderar obegränsad klassrumsanvändning. Skapa jämförelseworksheets för alla dina elever. Skriv ut så många kopior du behöver. Använd i förskoleklass, lågstadiet och mellanstadiet. Inga restriktioner på antal elever eller klasser. Dela digitalt med elever vid distansundervisning. Skicka PDF-filer via skolans lärandeportal. Elever kan arbeta digitalt eller skriva ut hemma.',
      },
      {
        id: '5',
        question: 'Vilka Språk Finns Matematik Arbetsblad Tillgängliga På?',
        answer: 'Bildbiblioteket finns på 11 olika språk för alla verktyg. Svenska, engelska, tyska, franska, spanska, italienska, portugisiska, nederländska, danska, norska och finska. Byt språk enkelt från rullgardinsmenyn. Bildnamnen uppdateras automatiskt till valt språk. Detta gäller alla 33 arbetsbladsgeneratorer på plattformen. Flerspråksstödet hjälper andraspråksinlärning enormt. Skapa jämförelsearbetsblad på elevernas modersmål först. Sedan samma övningar på svenska för språkutveckling.',
      },
      {
        id: '6',
        question: 'Kan Jag Sälja Jämförelseworksheets Jag Skapar med Denna Generator?',
        answer: 'Ja, Full Tillgång-prenumerationen inkluderar fullständig kommersiell print-on-demand-licensiering utan extra kostnad. Sälj dina jämförelsearbetsblad på Teachers Pay Teachers, Etsy eller egen webbsida. Publicera på Amazon KDP som low-content books. Inga ytterligare licensavgifter utöver din årsprenumeration. Attribution krävs inte på dina sålda produkter. Produkterna är helt dina att sälja. Många lärare bygger framgångsrika sidoinkomster med dessa verktyg.',
      },
      {
        id: '7',
        question: 'Hur Anpassar Jag Jämförelseworksheets för Mina Elever?',
        answer: 'Canvas-redigeraren ger fullständig anpassningskontroll. Välj vilket element som helst och ändra det. Gör bilder större för elever med synsvårigheter. Minska antal övningar för koncentrationssvårigheter. Lägg till extra instruktioner på svenska för språkinlärare. Färganpassning hjälper elever med olika behov. Höga kontraster för dyslexi. Mjukare färger för ljuskänsliga elever.',
      },
      {
        id: '8',
        question: 'Vilken Åldersgrupp Fungerar Bäst med Dessa Jämförelseworksheets?',
        answer: 'Jämförelseworksheets fungerar perfekt för 4-9 år. Förskoleklass börjar med enkla jämförelser 1-5. Årskurs 1 arbetar med tal upp till 10. Årskurs 2-3 hanterar större tal och mer komplexa jämförelser. Svårighetsgraden anpassas enkelt efter ålder. Yngre barn i förskoleklass behöver stora bilder och tydliga symboler. Färre övningar per sida håller uppmärksamheten.',
      },
      {
        id: '9',
        question: 'Kan Jag Ladda Upp Mina Egna Bilder till Jämförelseworksheets?',
        answer: 'Ja, multi-filsuppladdning låter dig ladda upp många bilder samtidigt. Alla vanliga bildformat fungerar: JPEG, PNG, GIF. Dina uppladdade bilder blir omedelbart tillgängliga i generatorn. Kombinera egna bilder med de 3000+ biblioteksbilderna fritt. Egna bilder personaliserar undervisningen enormt. Fotografera föremål från klassrummet. Ta bilder från skolans omgivning.',
      },
      {
        id: '10',
        question: 'Hur Lång Tid Tar Det att Skapa ett Jämförelseworksheet?',
        answer: 'En komplett jämförelseworksheet tar under 3 minuter att skapa. Välj inställningar: 30 sekunder. Klicka på Skapa: 5 sekunder för generering. Eventuell redigering: 1-2 minuter. Nedladdning: 10 sekunder. Total tid från start till färdig PDF: under 3 minuter. Jämför med traditionell skapandeprocess. Manuell design tar 30-60 minuter per arbetsblad. Verktyget är 10-20 gånger snabbare.',
      },
      {
        id: '11',
        question: 'Inkluderar Jämförelseworksheets Facitblad?',
        answer: 'Ja, facitblad genereras separat med samma layout. Klicka på Skapa facitblad-knappen. Facitbladet visar samma övningar med korrekta svar ifyllda. Jämförelsesymbolerna är redan markerade eller cirklade. Ladda ner både arbetsblad och facit i samma session. Facitbladen sparar rättningstid enormt. Inga manuella beräkningar krävs. Allt är automatiskt korrekt.',
      },
      {
        id: '12',
        question: 'Kan Jag Skapa Jämförelseworksheets om Specifika Teman?',
        answer: 'Ja, temabaserat bildval låter dig fokusera på specifika ämnen. Välj djurtema för naturkunskap. Fordonstemat för samhällskunskap och trafik. Mattema för hälsa och kost. Varje tema relaterar till olika skolämnen naturligt. Kombinera jämförelser med ämnesinnehåll smart. Jämför antal ben på olika djur i biologi. Räkna och jämför transportmedel i samhällskunskap.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Full Tillgång',
    price: '240€',
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
    sectionTitle: 'Kombinera med Andra Arbetsblad Generatorer',
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera jämförelsearbetsblad med dessa kompletterande generatorer för matematik och visuell perception.',
    ctaTitle: 'Redo att Skapa Fantastiska Jämförelsearbetsblad?',
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
        slug: 'big-small-app',
        name: 'Stort och Litet',
        category: 'Matematik',
        icon: '📐',
        description: 'Kombinera jämförelser med storleksövningar för att förstärka matematiska begrepp.',
      },
      {
        id: '2',
        slug: 'image-addition',
        name: 'Addition',
        category: 'Matematik',
        icon: '➕',
        description: 'Lägg till additionsövningar för att utveckla grundläggande räknefärdigheter.',
      },
      {
        id: '3',
        slug: 'find-and-count',
        name: 'Hitta och Räkna',
        category: 'Matematik',
        icon: '🔢',
        description: 'Komplettera med räkneövningar för att bygga taluppfattning.',
      },
      {
        id: '4',
        slug: 'pattern-train',
        name: 'Mönstertåg',
        category: 'Logik',
        icon: '🚂',
        description: 'Lägg till mönsterigenkänningsövningar för att utveckla logiskt tänkande.',
      },
      {
        id: '5',
        slug: 'matching-app',
        name: 'Matchning',
        category: 'Visuell Perception',
        icon: '🔗',
        description: 'Förstärk visuell diskriminering med matchningsövningar.',
      },
      {
        id: '6',
        slug: 'chart-count-color',
        name: 'Diagram Räkna',
        category: 'Matematik',
        icon: '📊',
        description: 'Kombinera jämförelser med diagramövningar för dataanalys.',
      },
    ],
  },
};

export default moreLessSvContent;
