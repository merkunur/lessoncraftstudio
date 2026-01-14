import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/word-search-worksheets.ts
 * URL: /sv/apps/ordletar-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'ordletar-arbetsblad',
    appId: 'wordsearch',
    title: 'Gratis Ordletare Generator | Arbetsblad för Förskoleklass och Lågstadiet',
    description: 'Skapa professionella ordletarpussel med vår gratis ordletare generator. Perfekt för förskoleklass material och lågstadiet. Ladda ner arbetsblad gratis som högkvalitativa PDF-filer på under tre minuter.',
    keywords: 'ordletare generator, arbetsblad gratis, förskoleklass material, matematik arbetsblad, ordletarpussel, gratis arbetsblad, lågstadiet, bokstäver lära sig, skriva bokstäver, målarbilder barn',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-4
  hero: {
    title: 'Gratis Ordletare Generator',
    subtitle: 'Arbetsblad Gratis för Förskoleklass och Lågstadiet',
    description: `Skapa professionella ordletarpussel med vår gratis ordletare generator. Generatorn är gratis att använda för alla lärare och föräldrar. Arbetsbladet innehåller en vattenstämpel för personlig användning. Ladda ner arbetsblad gratis som högkvalitativa PDF-filer på under tre minuter.

Vår ordletare generator gör det enkelt att skapa anpassade arbetsblad. Perfekt för förskoleklass material och lågstadiet. Välj mellan över 3000 barnvänliga bilder organiserade efter tema. Kombinera matematik arbetsblad med ordletarpussel för komplett inlärning. Skapa pussel för att öva bokstäver lära sig och skriva bokstäver.

Generatorn stöder elev material för alla åldrar. Använd den för att skapa matte övningar med ordletarformat. Lägg till målarbilder barn kan använda efter att ha löst pusslet. Varje arbetsblad kan anpassas helt och hållet på canvas. Dra, rotera och ändra storlek på alla element tills det är perfekt. Arbetsbladen är professionella och lättutskrivbara.`,
    previewImageSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Ordletare Arbetsblad Exempel',
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
        worksheetSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch portrait answer_key.jpeg',
        altText: 'Ordletarpussel i porträttformat med tematiska bilder för förskoleklass ordförrådsträning',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/wordsearch/wordsearch landscape.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch landscape answer_key.jpeg',
        altText: 'Ordletare arbetsblad i landskapsformat med färgglada bildledtrådar för lågstadiet',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/wordsearch/custom word list.jpeg',
        answerKeySrc: '/samples/english/wordsearch/custom word list answer_key.jpeg',
        altText: 'Anpassad ordlista ordletare för stavningsträning och ordförråd',
        pdfDownloadUrl: '/samples/english/wordsearch/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Ordletare Funktioner - Arbetsblad Gratis för Förskoleklass Material och Matematik Arbetsblad',
    sectionDescription: 'Vår gratis ordletare generator innehåller alla funktioner du behöver. Skapa arbetsblad gratis för förskoleklass och lågstadiet. Generatorn är perfekt för att skapa matte övningar och matematik arbetsblad.',
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
        title: 'Skapa Arbetsblad Gratis på Tre Klick',
        description: `Skapa professionella ordletarpussel på mindre än tre minuter. Välj ett tema eller enskilda bilder från biblioteket. Klicka på generera och ditt arbetsblad visas direkt. Inga designkunskaper behövs för att skapa arbetsblad gratis. Generatorn gör allt arbetet åt dig automatiskt.

Välj mellan temapussel eller anpassade bildval. Temapussel använder ett slumpmässigt tema från bildbiblioteket. Anpassade bildval låter dig välja exakt vilka bilder som ska ingå. Perfekt för att skapa förskoleklass material anpassat till din undervisning. Använd detta för att skapa matte övningar med specifika siffror och tal.

Generatorn skapar automatiskt facit för varje pussel. Du laddar ner både arbetsblad och facit samtidigt. Facit visar alla ord markerade i rutnätet. Detta sparar tid när du rättar elevernas arbete. Både arbetsblad och facit är 300 DPI professionell kvalitet.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Redigera Allt på Canvas',
        description: `Varje element på arbetsbladet kan redigeras efter generering. Dra, rotera och ändra storlek på bilder med musen. Flytta ordlistan till en annan position på sidan. Ändra storlek på rutnätet för att passa ditt layout. Full canvas-redigerbarhet gör varje arbetsblad unikt.

Lägg till egna textelement var som helst på sidan. Välj mellan sju olika typsnitt för text. Ändra textstorlek, färg och kontur efter behov. Perfekt för att lägga till instruktioner på svenska. Använd detta för att skapa matematik arbetsblad med anpassade instruktioner.

Lagerkontroller låter dig bestämma vilka element som visas framför. Flytta bilder framåt eller bakåt i lagerordningen. Justera ordlistan så den inte överlappar viktiga element. Linjerings verktyg hjälper dig centrera element perfekt. Dessa funktioner gör det enkelt att skapa professionellt förskoleklass material.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Ladda Upp Egna Bilder',
        description: `Ladda upp dina egna bilder för helt anpassade pussel. Stöder alla vanliga bildformat som JPEG, PNG och GIF. Ladda upp flera filer samtidigt med flerfilsuppladdning. Kombinera uppladdade bilder med biblioteksbilder. Perfekt för att skapa arbetsblad gratis anpassade till dina elevers intressen.

Använd foton av elevernas favoritsaker i pusslen. Skapa ordletare med bilder från klassrummet eller skolgården. Ladda upp bilder av siffror och tal för matematik arbetsblad. Uppladdade bilder kan redigeras precis som biblioteksbilder. Dra, rotera och ändra storlek efter behov.

Bilduppladdning är perfekt för flerspråkiga klassrum. Ladda upp bilder med text på svenska för bokstäver lära sig. Skapa anpassade målarbilder barn kan färglägga efter pusslet. Uppladdade bilder sparas för sessionen så du kan återanvända dem. Detta gör det enkelt att skapa flera arbetsblad med samma tema.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Svenskt Språkstöd',
        description: `Generatorn stöder elva språk för innehåll och gränssnitt. Svenska är ett av de fullt stödda språken. Välj svenska som innehållsspråk så visas bildnamn på svenska. Detta gör det perfekt för svenska klassrum och hemundervisning. Alla kontroller och knappar översätts till svenska.

Svenskt språkstöd är kritiskt för effektiv språkinlärning. Elever ser svenska ord när de löser pusslet. Detta förstärker ordförråd och stavning naturligt. Använd detta för att skapa arbetsblad för bokstäver lära sig. Kombinera ordletare med övningar för att skriva bokstäver.

Bildbiblioteket innehåller svenska översättningar för alla 3000+ bilder. Bildfiler är namngivna på svenska när du väljer svenska språk. Detta säkerställer att pusslet innehåller korrekta svenska ord. Perfekt för att skapa förskoleklass material på svenska. Använd det för finmotorik övningar kombinerat med språkinlärning.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommersiell Licens Tillgänglig',
        description: `Gratis versionen är för personlig användning i klassrummet. För att sälja arbetsblad behöver du en prenumeration. Grundpaketet kostar 144 dollar per år. Full Tillgång kostar 240 dollar per år. Båda prenumerationerna inkluderar kommersiell print-on-demand licens.

Med kommersiell licens kan du sälja på Teachers Pay Teachers. Sälj på Etsy som utskrivbara digitala produkter. Skapa arbetsboksböcker för Amazon KDP. Ingen attribution krävs när du säljer dina arbetsblad. Detta gör det perfekt för lärare som vill bygga ett sidoinkomst.

Kommersiell licens inkluderar 300 DPI professionell kvalitet. Arbetsbladen är utskriftsklara för professionell publicering. Ta bort vattenstämpeln med en prenumeration. Skapa obegränsat med arbetsblad utan extra avgifter per arbetsblad. Detta sparar hundratals dollar jämfört med konkurrenter som tar betalt per design.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bildbibliotek 3000+ Bilder',
        description: `Över 3000 barnvänliga bilder organiserade efter tema. Varje bild är perfekt för förskoleklass och lågstadiet. Bilderna täcker alla vanliga undervisningsämnen. Hitta bilder för matematik arbetsblad, bokstäver lära sig och mer. Alla bilder ingår utan extra kostnad.

Temabaserad organisation gör det enkelt att hitta rätt bilder. Välj teman som djur, mat, fordon eller årstider. Sök efter specifika bilder med sökfunktionen. Filtrera bilder efter tema för snabbare resultat. Perfekt för att skapa tematiska arbetsblad snabbt.

Bildbiblioteket inkluderar bilder för siffror och tal. Hitta bilder för addition och subtraktion övningar. Skapa matte övningar med visuellt engagerande innehåll. Bilderna kan också användas som målarbilder barn färglägger efter pusslet. Kombinera ordletare med finmotorik övningar för komplett lärande.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionell 300 DPI Kvalitet',
        description: `Alla arbetsblad exporteras i 300 DPI professionell kvalitet. Detta säkerställer skarpa utskrifter på alla skrivare. Perfekt för att skapa arbetsblad gratis som ser professionella ut. Välj mellan JPEG och PDF format för nedladdning. Båda formaten behåller full 300 DPI kvalitet.

PDF-format är perfekt för digital distribution. Skicka arbetsblad via e-post till föräldrar och elever. JPEG-format är bra för att infoga i andra dokument. Använd JPEG för att skapa presentationer med dina arbetsblad. Båda formaten fungerar utmärkt för utskrift hemma eller på skolan.

Gråskala alternativ sparar bläck vid utskrift. Välj gråskala för att konvertera färgarbetsblad till svartvitt. Detta är perfekt när du skriver ut stora mängder. Arbetsbladen förblir tydliga och läsbara i gråskala. Använd detta för att skapa kostnadseffektiva arbetsblad för hela klassen.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Hur Man Skapar Arbetsblad Gratis i 5 Enkla Steg',
    sectionDescription: 'Skapa professionella ordletarpussel på under tre minuter totalt. Följ dessa fem enkla steg för att skapa arbetsblad gratis. Varje steg är designat för enkelhet och effektivitet. Inga designkunskaper behövs för att skapa förskoleklass material.',
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
        description: `Det första steget är att välja vilket innehåll ditt pussel ska ha. Välj mellan temabaserade pussel eller individuella bilder. Temabaserade pussel använder ett slumpmässigt tema automatiskt. Individuella bildval låter dig välja exakt vilka bilder som ingår. Perfekt för att skapa arbetsblad gratis anpassade till din lektion.

För matematik arbetsblad välj bilder relaterade till multiplikationstabellen. Hitta bilder av siffror och tal i bildbiblioteket. Skapa pussel för addition och subtraktion med räknebilder. Sök efter "numbers" eller "math" för att hitta alla matematikbilder. Välj upp till åtta bilder för ditt ordletarpussel.

För språkarbetsblad välj bilder för bokstäver lära sig. Hitta alfabetsbilder för att öva skriva bokstäver. Använd tematiska bildgrupper som djur eller mat. Varje bild visas med sitt svenska namn i pusslet. Detta förstärker ordförråd medan eleverna löser pusslet. Kombinera detta med finmotorik övningar för komplett lärande.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar',
        description: `Andra steget är att anpassa rutnätets storlek och pusselinställningar. Rutnätet kan vara mellan 5×5 och 30×30 rutor. Standard är 12×12 vilket fungerar bra för de flesta arbetsblad. Mindre rutnät är lättare för yngre elever i förskoleklass. Större rutnät ger mer utmaning för äldre elever.

För förskoleklass material använd mindre rutnät som 8×8 eller 10×10. Detta gör pusslet lättare att lösa för yngre barn. För äldre elever i lågstadiet använd 12×12 eller större. Större rutnät tar längre tid att lösa. Justera svårighetsgraden baserat på dina elevers nivå.

Aktivera diagonala ord för mer utmaning. Detta låter ord placeras diagonalt i rutnätet. Aktivera omvända ord för ännu svårare pussel. Omvända ord läses baklänges i rutnätet. Dessa inställningar är perfekta för att skapa matte övningar med olika svårighetsnivåer.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera',
        description: `Tredje steget är att klicka på genereringsknappen. Generatorn skapar ditt pussel omedelbart. Väntetiden är bara några sekunder. Ordletarrutnätet fylls automatiskt med dina valda ord. Tomma rutor fylls med slumpmässiga bokstäver automatiskt.

Generatorn placerar orden intelligent i rutnätet. Ord kan gå horisontellt, vertikalt eller diagonalt. Omvända ord inkluderas om du aktiverade den inställningen. Algoritmen säkerställer att alla ord får plats i rutnätet. Om ord inte får plats visas ett meddelande.

Facit genereras automatiskt samtidigt som arbetsbladet. Facit visar alla ord markerade i rutnätet. Du kan växla mellan arbetsblad och facit med flikar. Både arbetsblad och facit är klara för nedladdning direkt. Detta sparar massvis med tid jämfört med manuell skapelse.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera',
        description: `Fjärde steget är att redigera arbetsbladet på canvas. Klicka på vilket element som helst för att välja det. Dra för att flytta, rotera för att vrida, ändra storlek med hörnen. Varje element kan redigeras oberoende av de andra. Full kontroll gör varje arbetsblad unikt.

Lägg till extra textelement för instruktioner. Klicka på "Lägg till text" för att skapa nya textrutor. Skriv instruktioner på svenska för dina elever. Ändra typsnitt, storlek och färg efter behov. Perfekt för att skapa tydliga arbetsblad gratis.

Lägg till extra bilder från bildbiblioteket. Klicka på bilder i sidofältet för att lägga till dem på canvas. Dra och placera dem var du vill på arbetsbladet. Detta är perfekt för att lägga till målarbilder barn färglägger. Kombinera ordletare med finmotorik övningar genom att lägga till ritningsområden.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner',
        description: `Femte och sista steget är att ladda ner ditt arbetsblad. Välj mellan JPEG och PDF format. PDF är bäst för utskrift och digital distribution. JPEG är bra för att infoga i andra dokument. Båda formaten är 300 DPI professionell kvalitet.

Ladda ner både arbetsblad och facit. Arbetsbladet är vad eleverna får. Facit använder du för att rätta deras arbete. Båda laddas ner som separata filer. Facit visar alla ord markerade i olika färg. Detta gör det enkelt att se om eleverna hittade alla ord.

Välj gråskala för att spara bläck vid utskrift. Gråskala konverterar färgbilder till svartvitt. Arbetsbladet förblir lika tydligt i svartvitt. Perfekt när du skriver ut arbetsblad gratis för hela klassen. Sparar hundratals kronor på bläckkostnader per år.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare och Föräldrar',
    sectionDescription: 'Ordletare generatorn är perfekt för alla som undervisar barn. Lärare i förskoleklass och lågstadiet använder den dagligen. Föräldrar som hemundervisar skapar arbetsblad gratis för sina barn. Specialpedagoger skapar anpassade arbetsblad för olika behov.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Förskoleklass Lärare',
        subtitle: 'Skapa Förskoleklass Material och Arbetsblad Gratis för Finmotorik Övningar',
        description: `Förskoleklass lärare använder ordletare för daglig undervisning. Skapa arbetsblad för bokstäver lära sig och skriva bokstäver. Använd mindre rutnät som 8×8 för yngre barn. Kombinera ordletare med målarbilder barn färglägger efter lösning. Detta håller eleverna engagerade i flera aktiviteter.

Förskoleklass material behöver vara visuellt och enkelt. Använd bara bildläge utan ord för barn som inte läser än. Barnen letar efter bilder istället för ord. Detta utvecklar visuell perception och koncentration. Perfekt för finmotorik övningar när barnen ringar in bilderna.

Skapa tematiska arbetsblad för olika ämnesområden. Djur tema för naturvetenskap. Mat tema för hälsa och näring. Fordon tema för samhällskunskap. Varje tema kan kopplas till förskolans läroplan. Använd svenska bildnamn för språkutveckling.`,
        quote: 'Mina elever älskar att hitta de gömda bilderna!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lågstadielärare',
        subtitle: 'Matematik Arbetsblad för Multiplikationstabellen och Addition och Subtraktion',
        description: `Lågstadielärare använder ordletare för matematik arbetsblad. Skapa pussel för multiplikationstabellen som gör träning roligare. Använd sifferbilder för addition och subtraktion övningar. Kombinera matematiska begrepp med ordletarformat. Eleverna övar matematik medan de löser pusslet.

Matematik arbetsblad med ordletare är mer engagerande än traditionella övningar. Elever som tycker vanliga mattetal är tråkiga älskar ordletarpussel. Sök efter matematikord som "plus", "minus", "gånger", "delat". Använd siffror och tal som bildinnehåll. Detta förstärker matematiska begrepp visuellt.

Skapa arbetsblad för multiplikationstabellen systematiskt. Börja med tvåans tabell för årskurs 2. Fortsätt med femans och tiaans tabell. Använd bilderna för att representera multiplikation visuellt. Till exempel åtta äpplen för 2×4. Detta hjälper elever förstå multiplikation konkret.`,
        quote: 'Ordletare gör mattepraktik till ett roligt spel.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hemundervisande Föräldrar',
        subtitle: 'Bokstäver Lära Sig och Arbetsblad Gratis för Siffror och Tal',
        description: `Hemundervisande föräldrar skapar arbetsblad gratis för sina barn. Använd ordletare för bokstäver lära sig i förskoleklass och årskurs 1. Skapa pussel för siffror och tal för matematikinlärning. Kombinera flera ämnen i samma arbetsblad. Detta sparar tid och gör lärandet mer integrerat.

Hemundervisning kräver mycket förberedelse. Ordletare generatorn minskar förberedelsetiden drastiskt. Tre minuter istället för en timme per arbetsblad. Skapa en veckas material på en halvtimme. Detta ger föräldrar mer tid för faktisk undervisning. Perfekt för familjer med flera barn på olika nivåer.

Anpassa arbetsblad för varje barns intresse. Ett barn älskar dinosaurier - skapa dinosaurieordletare. Ett annat barn älskar rymden - skapa rymdordletare. Personligt innehåll håller barnen motiverade. Använd familjefoton som uppladdade bilder. Skapa ordletare med barnens namn och favoritord.`,
        quote: 'Ett verktyg täcker alla mina barns årskurser.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Språklärare',
        subtitle: 'Svenska Ordförråd med Klockan Lära Sig och Siffror och Tal Material',
        description: `Språklärare använder ordletare för svenskt ordförråd. Perfekt för Svenska som andraspråk elever. Bilderna visar konkret vad orden betyder. Eleverna lär sig svenska ord medan de löser pusslet. Detta kombinerar visuell och textbaserad inlärning perfekt.

Tematiska ordletare bygger ordförråd systematiskt. Skapa en serie om siffror och tal för att öva räkneord. Gör arbetsblad för klockan lära sig med tidsrelaterade ord. Använd målarbilder barn kan beskriva på svenska efteråt. Varje tema expanderar elevernas aktiva ordförråd.

Använd svenskt språkläge för alla bildnamn. Bildbiblioteket innehåller över 3000 svenska översättningar. Bilder namnges automatiskt på svenska i pusslet. Detta säkerställer korrekta svenska ord. Eleverna exponeras för korrekt stavning naturligt.`,
        quote: 'Flerspråkigt stöd är avgörande för mitt klassrum.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpedagoger',
        subtitle: 'Anpassade Arbetsblad Gratis med Finmotorik Övningar och Målarbilder Barn',
        description: `Specialpedagoger skapar anpassade arbetsblad gratis för olika behov. Elever med inlärningssvårigheter behöver differentierat material. Ordletare generatorn gör det enkelt att anpassa svårighetsgrad. Mindre rutnät för lättare pussel. Färre ord för elever med koncentrationssvårigheter. Större text för elever med synnedsättning.

Finmotorik övningar integreras naturligt med ordletarpussel. Elever ringar in ord med penna för penngreppsträ ning. Klippa ut bilderna för saxövningar. Klistra in bilderna på annat papper för finmotorik. Målarbilder barn färglägger utvecklar handstyrka. Varje aktivitet bygger motoriska färdigheter.

Visuellt lärande fungerar bra för många elever med specialbehov. Bilder ger konkret sammanhang för abstrakta ord. Elever med dyslexi drar nytta av bild stöd. Autistiska elever uppskattar den förutsägbara strukturen. Varje ordletarpussel ser likadant ut formatmässigt. Detta skapar trygghet och förutsägbarhet.`,
        quote: 'Jag kan snabbt anpassa arbetsblad för varje elevs behov.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lärarentreprenörer',
        subtitle: 'Sälj Arbetsblad Gratis Skapade för Teachers Pay Teachers',
        description: `Lärarentreprenörer använder ordletare för att skapa säljbara produkter. Skapa arbetsblad gratis med gratis versionen först. Uppgradera till prenumeration för att ta bort vattenstämpel. Sälj på Teachers Pay Teachers, Etsy eller eget webbplats. Kommersiell licens ingår i båda prenumerationerna.

Teachers Pay Teachers är en massiv marknad för arbetsblad. Ordletarpussel säljer mycket bra. Skapa tematiska paket med 10-20 arbetsblad. Säsongspaket som höst, vinter, vår, sommar. Ämnesteman som matematik arbetsblad för multiplikationstabellen. Prissätt paket mellan 3-8 dollar beroende på storlek.

Skapa återkommande inkomst med populära teman. Addition och subtraktion arbetsblad säljer året runt. Bokstäver lära sig material är alltid efterfrågat. Förskoleklass material har stor marknad. Skapa variationer av samma tema för olika årskurser. Sälj samma koncept till flera kundgrupper.`,
        quote: 'Min prenumeration betalade sig själv första månaden!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from wordsearch.md
  faq: {
    sectionTitle: 'Vanliga Frågor',
    sectionDescription: 'Vanliga frågor om vår ordletare generator och arbetsblad gratis.',
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
        question: 'Är Ordletare Generatorn Verkligen Gratis för Förskoleklass Material och Målarbilder Barn?',
        answer: 'Ordletare generatorn är gratis att använda för personlig användning. Skapa obegränsat med arbetsblad gratis för ditt klassrum. Alla grundfunktioner fungerar utan betalning. Genererade arbetsblad innehåller en liten vattenstämpel. Vattenstämpeln stör inte elevernas arbete men visar att det är gratis version. För att ta bort vattenstämpel behöver du en prenumeration. Grundpaketet kostar 144 dollar per år eller 15 dollar per månad.',
      },
      {
        id: '2',
        question: 'Kan Jag Skriva Ut Arbetsblad för Klockan Lära Sig och Finmotorik Övningar på Hemskrivare?',
        answer: 'Ja alla arbetsblad fungerar perfekt på hemskrivare. Både bläckstråle och laserskrivare ger utmärkta resultat. Arbetsbladen är 300 DPI professionell kvalitet. Detta säkerställer skarp text och tydliga bilder. Eleverna kan läsa och lösa pusslet utan problem. Välj gråskala för att spara bläck vid utskrift. Gråskala konverterar färgarbetsblad till svartvitt automatiskt.',
      },
      {
        id: '3',
        question: 'Behöver Jag Designkunskaper för att Skapa Multiplikationstabellen och Addition och Subtraktion Arbetsblad?',
        answer: 'Nej inga designkunskaper behövs överhuvudtaget. Generatorn är designad för lärare utan teknisk bakgrund. Klicka, välj bilder, klicka generera. Ditt arbetsblad är klart på tre minuter. Allt tekniskt arbete sker automatiskt bakom kulisserna. Skapa arbetsblad för multiplikationstabellen i enkla steg. Välj sifferbilder från bildbiblioteket. Klicka generera och ordletaren skapas automatiskt.',
      },
      {
        id: '4',
        question: 'Kan Jag Använda Arbetsblad för Bokstäver Lära Sig och Siffror och Tal i Mitt Klassrum?',
        answer: 'Ja gratis versionen inkluderar obegränsad klassrumsanvändning. Skapa så många arbetsblad du behöver för dina elever. Använd arbetsblad för bokstäver lära sig i förskoleklass och årskurs 1. Skapa arbetsblad för siffror och tal för matematikinlärning. Alla är gratis för personlig användning i klassrummet. Vattenstämpeln på gratis arbetsblad stör inte elevernas arbete.',
      },
      {
        id: '5',
        question: 'Vilka Språk Finns för Målarbilder Barn och Finmotorik Övningar Arbetsblad?',
        answer: 'Ordletare generatorn stöder elva språk totalt. Svenska, engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, danska, norska och finska. Välj vilket språk som helst för bildnamn i pusslet. Detta gör det perfekt för flerspråkiga klassrum och hemundervisning. Bildbiblioteket översätts automatiskt till valt språk.',
      },
      {
        id: '6',
        question: 'Kan Jag Sälja Arbetsblad för Klockan Lära Sig och Multiplikationstabellen på Teachers Pay Teachers?',
        answer: 'Ja med en prenumeration kan du sälja alla arbetsblad du skapar. Både Grundpaketet och Full Tillgång inkluderar kommersiell print-on-demand licens. Ingen extra licensavgift krävs. Ingen attribution behövs på sålda produkter. Du äger fullt ut arbetsbladet du skapar. Teachers Pay Teachers är en enorm marknad för arbetsblad.',
      },
      {
        id: '7',
        question: 'Hur Anpassar Jag Arbetsblad för Addition och Subtraktion och Finmotorik Övningar?',
        answer: 'Canvas redigeringsverktyg ger full kontroll efter generering. Klicka på vilket element som helst för att välja det. Dra för att flytta, rotera för att vrida, ändra storlek med hörnen. Varje element kan redigeras oberoende. Skapa exakt den layout du vill ha. För addition och subtraktion arbetsblad lägg till extra textelement för instruktioner.',
      },
      {
        id: '8',
        question: 'Vilka Åldersgrupper Fungerar Bäst med Målarbilder Barn och Förskoleklass Material?',
        answer: 'Ordletare fungerar utmärkt för barn från 4 till 12 år. Förskoleklass material för barn 5-6 år. Lågstadie material för årskurs 1-3. Äldre barn i årskurs 4-6 kan lösa svårare pussel. Justera svårighetsgrad genom rutnätsstorlek och ordval. För förskoleklass material använd små rutnät som 8×8 eller 10×10.',
      },
      {
        id: '9',
        question: 'Kan Jag Ladda Upp Egna Bilder för Bokstäver Lära Sig och Siffror och Tal Arbetsblad?',
        answer: 'Ja bilduppladdning är en kraftfull funktion. Ladda upp egna bilder för helt personliga pussel. Stöder alla vanliga format som JPEG, PNG och GIF. Ladda upp flera filer samtidigt med flerfilsuppladdning. Kombinera uppladdade bilder med biblioteksbilder i samma pussel. Lärare laddar upp klassrumsfoton för relevant ordförråd.',
      },
      {
        id: '10',
        question: 'Hur Lång Tid Tar Det att Skapa Arbetsblad för Multiplikationstabellen och Klockan Lära Sig?',
        answer: 'Tre minuter från start till färdigt arbetsblad. Detta inkluderar bildval, generering och nedladdning. Mycket snabbare än traditionell skapelse som tar 30-60 minuter. 95% tidsbesparing för varje arbetsblad du skapar med generatorn. För multiplikationstabellen arbetsblad välj matematikbilder på 30 sekunder.',
      },
      {
        id: '11',
        question: 'Inkluderar Arbetsblad för Addition och Subtraktion Facit?',
        answer: 'Ja varje ordletarpussel genererar automatiskt facit. Facit skapas samtidigt som arbetsbladet. Du laddar ner både arbetsblad och facit separat. Facit visar alla ord markerade i rutnätet i olika färg. Detta gör det enkelt att se om eleverna hittade alla ord. För addition och subtraktion arbetsblad visar facit matematikorden.',
      },
      {
        id: '12',
        question: 'Kan Jag Skapa Ämnesspecifika Arbetsblad för Förskoleklass Material och Målarbilder Barn?',
        answer: 'Ja bildbiblioteket innehåller över 3000 bilder organiserade efter tema. Djur, mat, fordon, årstider, matematik, bokstäver och mycket mer. Filtrera efter tema för att hitta ämnesspecifika bilder snabbt. Skapa ordletare för vilket skolämne som helst. För förskoleklass material skapa tematiska pussel som kopplar till läroplanen.',
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
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera ordletare arbetsblad med dessa kompletterande generatorer.',
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
        slug: 'crossword',
        name: 'Korsordspussel',
        category: 'Språk',
        icon: '📝',
        description: 'Komplettera ordletare med korsordspussel med samma ordförråd teman för omfattande ordträning.',
      },
      {
        id: '2',
        slug: 'word-scramble',
        name: 'Ordmix',
        category: 'Språk',
        icon: '🔤',
        description: 'Kombinera ordletare med förvrängda ord pussel för att förstärka stavning och ordförråd från flera vinklar.',
      },
      {
        id: '3',
        slug: 'word-guess',
        name: 'Ordgissning',
        category: 'Språk',
        icon: '❓',
        description: 'Lägg till ordgissningsaktiviteter i dina läscentra tillsammans med ordletare pussel för varierad träning.',
      },
      {
        id: '4',
        slug: 'cryptogram',
        name: 'Kryptogrampussel',
        category: 'Logik',
        icon: '🔐',
        description: 'Utmana elever med kodknäckningspussel som utvecklar logiskt tänkande och bokstavsmönsterigenkänning.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Målarbilder',
        category: 'Kreativitet',
        icon: '🎨',
        description: 'Belöna färdiga ordletare med tematiska målarbilder som utvecklar finmotorik.',
      },
      {
        id: '6',
        slug: 'alphabet-train',
        name: 'Alfabetståg',
        category: 'Tidig Inlärning',
        icon: '🚂',
        description: 'Balansera ordletarträning med bokstavsigenkänningsaktiviteter för omfattande tidig läsning.',
      },
    ],
  },
};

export default wordSearchSvContent;
