import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Big Small Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/big-small-worksheets.ts
 * URL: /sv/apps/stort-litet-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/big-small.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const bigSmallSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'stort-litet-arbetsblad',
    appId: 'big-small-app',
    title: 'Arbetsblad Gratis för Stort och Litet - Matematik Arbetsblad och Förskoleklass Material för Storleksträning',
    description: 'Skapa professionella arbetsblad för att lära barn skilja på stort och litet. Generera anpassade matematik arbetsblad för storleksjämförelse på under 3 minuter. Ladda ner högkvalitativa PDF-filer för förskoleklass material och matte övningar.',
    keywords: 'arbetsblad gratis, stort och litet, storleksjämförelse, förskoleklass material, matematik arbetsblad, matte övningar, finmotorik övningar, målarbilder barn, siffror och tal',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/stort-litet-arbetsblad',
  },

  // Hero Section - FULL text from big-small.md paragraphs 1-4
  hero: {
    title: 'Arbetsblad Gratis för Stort och Litet',
    subtitle: 'Matematik Arbetsblad och Förskoleklass Material för Storleksträning',
    description: `Skapa professionella arbetsblad för att lära barn skilja på stort och litet. Din Full Tillgång-prenumeration ger dig obegränsad tillgång till skapande av arbetsblad utan extra avgifter per arbetsblad. Generera anpassade matematik arbetsblad för storleksjämförelse på under 3 minuter. Ladda ner högkvalitativa PDF-filer redo att skriva ut.

Storleksjämförelseövningar är grundläggande för barns kognitiva utveckling. Denna matematiska färdighet förbereder elever för mätnings- och taluppfattningskoncepten. Vår generator av arbetsblad gratis förenklar skapandet av dessa pedagogiska aktiviteter med förskoleklass material och matte övningar.

Arbetsblad för storleksjämförelse passar perfekt för förskoleklass material och lågstadiet. Från 6-åringar i förskoleklassen till elever i årskurs 3 lär sig barn att skilja på stort och litet. Dessa matte övningar utvecklar observationsförmåga och visuell diskriminering genom praktiska matematik arbetsblad.

Förskoleklass material fokuserar på grundläggande storleksbegrepp. Elever i årskurs 1-3 fortsätter att befästa sina kunskaper om storlekar. Varje arbetsblad gratis innehåller tydliga och attraktiva bilder som håller barnens uppmärksamhet under matte övningar.`,
    previewImageSrc: '/samples/english/big small/big-small-different images.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/big small/
  samples: {
    sectionTitle: 'Storleksjämförelsearbetsblad Exempel',
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
        worksheetSrc: '/samples/english/big small/big-small-different images.jpeg',
        answerKeySrc: '/samples/english/big small/big-small-different images answer_key.jpeg',
        altText: 'Storleksjämförelsearbetsblad med olika bilder för förskoleklass',
        pdfDownloadUrl: '/samples/english/big small/big-small-different images.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/big small/big-small identical images.jpeg',
        answerKeySrc: '/samples/english/big small/big-small identical images answer_key.jpeg',
        altText: 'Storleksjämförelsearbetsblad med identiska bilder för lågstadiet',
        pdfDownloadUrl: '/samples/english/big small/big-small identical images.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/big small/big-small number 1-2-3.jpeg',
        answerKeySrc: '/samples/english/big small/big-small number 1-2-3 answer_key.jpeg',
        altText: 'Storleksordningsarbetsblad med nummer 1-2-3 för siffror och tal',
        pdfDownloadUrl: '/samples/english/big small/big-small number 1-2-3.pdf',
      },
    ],
  },

  // Features Grid - FULL text from big-small.md feature sections
  features: {
    sectionTitle: 'Funktioner för Matematik Arbetsblad och Förskoleklass Material - Allt du Behöver för Arbetsblad Gratis och Matte Övningar',
    sectionDescription: 'Vår generator för arbetsblad gratis erbjuder omfattande funktioner för pedagoger. Skapa storleksjämförelseövningar anpassade till alla nivåer med matematik arbetsblad och förskoleklass material. Från förskolan till årskurs 3 uppfyller varje arbetsblad specifika pedagogiska behov. Upptäck de sju huvudfunktionerna som gör detta verktyg oumbärligt för din undervisning i matte övningar.',
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
        title: 'Enkel Skapande av Arbetsblad Gratis på 3 Klick - Förskoleklass Material Klart på Under 3 Minuter',
        description: `Att skapa förskoleklass material har aldrig varit enklare. Välj ett bildtema från vårt bibliotek. Bestäm antal övningar du önskar. Klicka på generera. Ditt arbetsblad gratis visas omedelbart på skärmen.

Generatorn erbjuder fem olika frågetyper för matematik arbetsblad. Eleverna kan ringa in det största eller minsta objektet. De kan också ordna bilder från minst till störst. Denna variation håller barnens intresse genom hela läsåret med engagerande matte övningar.

Varje matematik arbetsblad genereras automatiskt med bilder i olika storlekar. Algoritmen garanterar tydligt synliga storleksskillnader för förskoleklass material. Barn skiljer lätt på stort och litet på varje arbetsblad gratis. Denna tydlighet är avgörande för framgångsrika matte övningar.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Fullständig Anpassning av Matematik Arbetsblad - Redigera Varje Element på Arbetsytan för Matte Övningar',
        description: `Alla arbetsblad gratis är helt anpassningsbara. Flytta bilder dit du vill ha dem i ditt förskoleklass material. Ändra storlek på element efter dina behov. Rotera objekt för att skapa unika kompositioner av matematik arbetsblad.

Redigeringsarbetsytan fungerar med dra-och-släpp för enkla matte övningar. Inga tekniska färdigheter krävs för att skapa förskoleklass material. Lägg till anpassad text för instruktioner på dina arbetsblad gratis. Ändra färger och typsnitt med ett klick på matematik arbetsblad.

Förskoleklass material kan inkludera ett utrymme för namn och datum. Detta alternativ aktiveras med en enkel kryssruta. Dina arbetsblad gratis är redo för distribution i klassen med professionella matte övningar.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Ladda Upp Egna Bilder för Anpassat Förskoleklass Material - Målarbilder Barn med Klassfoton',
        description: `Ladda upp dina egna bilder för att skapa unika arbetsblad gratis. Använd klassfoton eller tematiska bilder i ditt förskoleklass material. Kombinera dina bilder med vårt bibliotek för varierade matematik arbetsblad. Denna flexibilitet möjliggör skapandet av personliga målarbilder barn.

Uppladdningen accepterar alla vanliga format för matte övningar. JPEG, PNG och GIF stöds för förskoleklass material. Ladda upp flera filer i en enda operation. Dina bilder förblir tillgängliga under hela sessionen för arbetsblad gratis.

Anpassat förskoleklass material engagerar eleverna mer. De känner igen bekanta föremål från sin miljö i matematik arbetsblad. Lärandet blir mer konkret och meningsfullt med personliga matte övningar och målarbilder barn.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Stöd för 11 Språk i Matematik Arbetsblad - Gränssnitt på Svenska för Förskoleklass Material',
        description: `Vår generator av arbetsblad gratis fungerar på 11 språk. Användargränssnittet visas helt på svenska för förskoleklass material. Bildbiblioteket erbjuder namn på ditt språk i matematik arbetsblad. Denna funktion underlättar flerspråkiga matte övningar.

De 11 tillgängliga språken inkluderar svenska, tyska, spanska och italienska. Portugisiska, nederländska och skandinaviska språk erbjuds också för arbetsblad gratis. Byt språk med ett enkelt klick i menyn för förskoleklass material.

För tvåspråkiga klasser, skapa matematik arbetsblad på flera språk. Storleksjämförelseövningarna fungerar på alla språk i matte övningar. Perfekt för språkundervisning redan i förskolan med arbetsblad gratis.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommersiell Licens Inkluderad för att Sälja Arbetsblad Gratis - Förskoleklass Material på Teachers Pay Teachers',
        description: `Din Full Tillgång-prenumeration inkluderar fullständig kommersiell licens. Sälj dina arbetsblad gratis på Teachers Pay Teachers. Skapa en Etsy-butik med pedagogiska resurser som förskoleklass material. Publicera på Amazon KDP utan extra avgifter för matematik arbetsblad.

De arbetsblad gratis du skapar tillhör dig helt. Ingen hänvisning krävs vid försäljning av förskoleklass material. 300 DPI-kvaliteten garanterar professionella utskrifter av matematik arbetsblad. Dina kunder uppskattar bildernas skärpa i matte övningar.

Många lärare genererar extra inkomster med förskoleklass material. Vissa tjänar mellan 5000 och 50000 kronor per månad på arbetsblad gratis. Dina matematik arbetsblad kan bli en källa till passiv inkomst genom matte övningar.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bildbibliotek med Över 3000 Bilder för Målarbilder Barn - Varierande Teman för Förskoleklass Material',
        description: `Vårt bibliotek innehåller över 3000 barnvänliga bilder. Varje bild passar perfekt för målarbilder barn och arbetsblad gratis. Varierande teman täcker djur, fordon och natur för förskoleklass material. Vardagliga föremål och mat finns också tillgängliga för matematik arbetsblad.

Bilderna organiseras efter teman för att underlätta sökningen i matte övningar. Använd sökfältet för att hitta specifika bilder till förskoleklass material. Välj ett helt tema för automatisk generering av arbetsblad gratis. Matematik arbetsblad använder attraktiva och tydliga bilder för målarbilder barn.

Bakgrunder och ramar ingår i biblioteket för matte övningar. Lägg till en dekorativ ram till ditt förskoleklass material. Säsongsteman gör det möjligt att variera arbetsblad gratis genom hela året med matematik arbetsblad.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionell 300 DPI-Kvalitet för Arbetsblad Gratis - Matematik Arbetsblad och Matte Övningar Redo att Distribuera',
        description: `Varje arbetsblad gratis exporteras i professionell kvalitet. Upplösningen på 300 DPI garanterar skarpa utskrifter av förskoleklass material. Bilderna förblir perfekt tydliga även i stort format för matematik arbetsblad. Dina matte övningar får ett professionellt utseende.

Ladda ner dina arbetsblad gratis i PDF- eller JPEG-format. PDF-formatet passar perfekt för utskrift av förskoleklass material. JPEG-formatet används för digitala presentationer av matematik arbetsblad. Svartvit-alternativet sparar bläck i skrivaren för matte övningar.

Facit genereras automatiskt för arbetsblad gratis. Ett klick räcker för att skapa svarsbladet till förskoleklass material. Lösningarna visas tydligt med gröna bockar i matematik arbetsblad. Spara tid på rättning av matte övningar.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from big-small.md step sections
  howTo: {
    sectionTitle: 'Hur man Skapar Arbetsblad Gratis för Storleksjämförelse i 5 Enkla Steg - Matematik Arbetsblad och Förskoleklass Material på Under 3 Minuter',
    sectionDescription: 'Att skapa arbetsblad för storleksjämförelse tar bara några minuter. Följ denna steg-för-steg-guide för att generera dina första övningar med förskoleklass material. Inga tekniska färdigheter krävs för att skapa matematik arbetsblad. Även lärare som är nybörjare på datorer lyckas första gången. Ditt arbetsblad gratis är klart på under 3 minuter med matte övningar.',
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
        title: 'Välj Innehåll för dina Arbetsblad Gratis - Temaval och Bilder för Förskoleklass Material och Målarbilder Barn',
        description: `Det första steget är att välja bilder för dina övningar med förskoleklass material. Du har tre alternativ för att fylla dina arbetsblad gratis. Varje metod passar olika pedagogiska behov för matematik arbetsblad och målarbilder barn.

Välj ett komplett tema från rullgardinsmenyn. Djur, fordon och frukter är särskilt uppskattade för förskoleklass material. Generatorn väljer automatiskt varierade bilder från temat. Denna metod är snabbast för att skapa arbetsblad gratis och målarbilder barn.

Du kan också bläddra i bildbiblioteket manuellt för ditt förskoleklass material. Klicka på bilderna du vill använda i matematik arbetsblad. De läggs till din urval längst ner på skärmen. Detta tillvägagångssätt ger full kontroll över innehållet i arbetsblad gratis.

Det tredje alternativet är att ladda upp dina egna bilder för målarbilder barn. Ladda upp foton från din dator till förskoleklass material. Kombinera dem med bilderna från biblioteket i matematik arbetsblad. Skapa personliga övningar med föremål som är bekanta för eleverna i arbetsblad gratis.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Konfigurera Inställningar för Matematik Arbetsblad - Antal Frågor och Typ av Förskoleklass Material',
        description: `Konfigurera sedan parametrarna för dina matematik arbetsblad. Inställningspanelen erbjuder flera anpassningsalternativ för förskoleklass material. Varje parameter påverkar svårighetsgrad och format på arbetsblad gratis.

Bestäm antal övningar per arbetsblad för ditt förskoleklass material. Du kan skapa mellan 1 och 10 övningar för matematik arbetsblad. För förskoleklass räcker 4 övningar. Elever i årskurs 1-3 kan hantera fler i sina arbetsblad gratis.

Välj antal bilder per övning i förskoleklass material. Alternativet 2 bilder passar nybörjare i matematik arbetsblad. Alternativet 3 bilder introducerar begreppet medelstor. Denna progression följer elevernas lärande i arbetsblad gratis.

Välj frågetyp bland fem möjligheter för förskoleklass material. "Ringa in det största" är vanligast i matematik arbetsblad. "Ringa in det minsta" erbjuder en variant. Ordningsövningar från minst till störst utvecklar logik i arbetsblad gratis.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera Arbetsblad Gratis med Matematik Arbetsblad - Omedelbar Förhandsgranskning av Förskoleklass Material',
        description: `Klicka på knappen "Skapa" för att generera ditt arbetsblad gratis. Förhandsgranskningen visas omedelbart på arbetsytan med förskoleklass material. Storleksjämförelseövningarna visas med de valda bilderna i matematik arbetsblad. Varje element är redan optimalt positionerat.

Generatorn skapar automatiskt olika storlekar för varje bild i förskoleklass material. Storleksskillnaden är alltid tydligt synlig i matematik arbetsblad. Eleverna har inga svårigheter att skilja på stort och litet. Denna tydlighet är väsentlig för arbetsblad gratis.

Kontrollera att arbetsblad gratis motsvarar dina förväntningar. Instruktionerna visas längst upp på varje övning i förskoleklass material. Bilderna är jämnt fördelade över sidan i matematik arbetsblad. Antalet övningar motsvarar ditt val.

Om resultatet inte passar dig, klicka på "Skapa" igen för nytt förskoleklass material. En ny layout genereras med samma parametrar för matematik arbetsblad. Upprepa tills du får det perfekta arbetsblad gratis för din klass.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Anpassa på Arbetsytan - Bokstäver Lära Sig och Finmotorik Övningar med Fria Ändringar',
        description: `Redigeringsarbetsytan gör det möjligt att anpassa varje element i arbetsblad gratis. Klicka på en bild för att markera den i ditt förskoleklass material. Flytta den genom att hålla musknappen nedtryckt. Ändra storlek med hörngrepppen i matematik arbetsblad.

Lägg till text för att berika dina arbetsblad gratis med bokstäver lära sig. Skriv en titel eller ytterligare instruktioner för förskoleklass material. Välj typsnitt, storlek och färg. Texten integreras perfekt i dina finmotorik övningar och matematik arbetsblad.

Ändra bakgrunden för att göra arbetsblad gratis mer tilltalande. Välj ett tema i bakgrundsmenyn för förskoleklass material. Justera opaciteten så att bilderna förblir synliga i matematik arbetsblad. Dekorativa ramar ger en sista touch till finmotorik övningar.

Använd justeringsverktygen för en professionell layout av arbetsblad gratis. Centrera element horisontellt eller vertikalt i förskoleklass material. Justera flera objekt mellan varandra i matematik arbetsblad. Dessa justeringar garanterar ett oklanderligt resultat för bokstäver lära sig.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner Arbetsblad Gratis - Högkvalitativt PDF-Format',
        description: `Ditt arbetsblad gratis är klart för nedladdning. Klicka på knappen "Ladda ner" för att komma åt alternativen för förskoleklass material. Flera format är tillgängliga enligt dina behov med matematik arbetsblad. Varje format garanterar professionell kvalitet.

PDF-formatet är idealiskt för direkt utskrift av arbetsblad gratis. Upplösningen på 300 DPI säkerställer skarpa bilder i förskoleklass material. Dina arbetsblad med siffror och tal får ett professionellt utseende. Föräldrar uppskattar kvaliteten på materialet.

JPEG-formatet passar digitala användningar av arbetsblad gratis. Integrera arbetsblad i presentationer eller dokument med förskoleklass material. Dela dem via e-post med familjer. Svartvit-alternativet sparar bläck vid utskrift av matematik arbetsblad och siffror och tal.

Generera också facit med ett klick för arbetsblad gratis. Svarsbladet visar lösningarna med gröna bockar i förskoleklass material. För ordningsövningar visas siffrorna. Distribuera facit till elever för självkorrektion av siffror och tal.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from big-small.md use case sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare, Föräldrar och Pedagoger - Arbetsblad Gratis och Matematik Arbetsblad för Alla Behov',
    sectionDescription: 'Vår generator för arbetsblad gratis passar alla som arbetar inom utbildning. Lärare i förskoleklass och lågstadiet finner lämpliga resurser med matematik arbetsblad. Föräldrar som bedriver hemundervisning uppskattar också detta verktyg. Upptäck hur varje profil använder våra arbetsblad gratis och förskoleklass material.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Lärare i Förskoleklass och Förskola',
        subtitle: 'Finmotorik Övningar och Målarbilder Barn för 6-åringar',
        description: `Lärare i förskoleklass utgör vår huvudsakliga målgrupp med arbetsblad gratis. För 6-åringar i förskoleklassen varierar behoven. Finmotorik övningar integreras naturligt i storleksjämförelser. Målarbilder barn kompletterar perfekt dessa aktiviteter med matematik arbetsblad.

I förskolan använder barn enkla övningar med 2 bilder för förskoleklass material. Barn från 3 år koncentrerar sig på att skilja stort från litet. Enkla arbetsblad gratis undviker kognitiv överbelastning. Finmotorik övningar i denna ålder förblir grundläggande men väsentliga.

Förskoleklassen förbereder inträdet till årskurs 1 med matematik arbetsblad. Övningar i storleksordning blir vanliga. Arbetsblad gratis förbereder för formellt matematiskt lärande. Finmotorik övningar når sin mest utvecklade nivå med målarbilder barn.`,
        quote: 'Mina 6-åringar älskar att jämföra storlekar med dessa arbetsblad!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lärare i Lågstadiet Årskurs 1-3',
        subtitle: 'Addition och Subtraktion med Matematik Arbetsblad',
        description: `Lärare i lågstadiet använder arbetsblad gratis för att förstärka matematiska grunder. Storleksjämförelser stöder taluppfattning i matematik arbetsblad. Innan man tar itu med addition och subtraktion behärskar elever storleksrelationer. Arbetsblad gratis förbereder dessa beräkningar.

I årskurs 1 stöder storleksjämförelse lärandet av siffror och tal. Större, mindre, lika: dessa begrepp grundar kalkyl med matematik arbetsblad. Övningar förbereder addition och subtraktion. Multiplikationstabellen kommer senare med dessa solida grunder.

I årskurs 2-3 fungerar arbetsblad gratis som repetition och differentiering. Elever med svårigheter återupptar grunderna med matematik arbetsblad. Storleksjämförelseövningar förblir relevanta. Förberedelsen för multiplikationstabellen går via denna förståelse av addition och subtraktion.`,
        quote: 'Storleksjämförelser ger en stark grund för matematiskt tänkande.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Föräldrar med Hemundervisning',
        subtitle: 'Bokstäver Lära Sig och Målarbilder Barn Hemma',
        description: `Föräldrar som bedriver hemundervisning hittar värdefulla resurser med arbetsblad gratis. Övningar för att bokstäver lära sig kombinerar flera färdigheter. Alfabetet undervisas parallellt med storleksbegrepp i matematik arbetsblad. Detta globala tillvägagångssätt optimerar undervisningstiden med målarbilder barn.

Hemma är flexibilitet väsentlig med arbetsblad gratis. Skapa arbetsblad anpassade till ditt barns tempo. Alfabetet kan läras bokstav för bokstav med storleksjämförelser i matematik arbetsblad. Övningarna för att bokstäver lära sig blir roliga och personliga med målarbilder barn.

Föräldrar uppskattar enkelheten i skapandet av arbetsblad gratis. Ingen pedagogisk utbildning krävs. Professionella arbetsblad konkurrerar med skolmaterial i matematik arbetsblad. Alfabetet och storleksjämförelse arbetas samtidigt för att bokstäver lära sig.`,
        quote: 'Ett verktyg täcker alla mina barns behov hemma.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Språklärare',
        subtitle: 'Siffror och Tal på Svenska som Andraspråk',
        description: `Språklärare använder våra arbetsblad gratis för svenska som andraspråk. Visuella övningar överskrider språkbarriärer i matematik arbetsblad. Elever jämför storlekar innan de behärskar ordförrådet. Siffror och tal på svenska blir mer tillgängligt.

Grundläggande ordförråd förvärvas naturligt med arbetsblad gratis. Stor, liten, medelstor: dessa väsentliga ord lärs i sammanhang. Förskoleklass material illustrerar konkret begreppen i matematik arbetsblad. Elever som lär sig svenska framsteg i språket samtidigt som de utvecklar matematiska färdigheter.

De 11 språken i gränssnittet underlättar undervisningen med arbetsblad gratis. Börja på elevens modersmål. Gå progressivt över till svenska. Jämföra storlekar sker mjukt med siffror och tal.`,
        quote: 'Flerspråkigt stöd är avgörande för mitt klassrum.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpedagoger',
        subtitle: 'Finmotorik Övningar och Addition och Subtraktion för Särskilda Behov',
        description: `Specialpedagoger anpassar våra arbetsblad gratis till särskilda behov. Finmotorik övningar justeras till varje elev i matematik arbetsblad. Storleksjämförelseövningar utvecklar övergripande färdigheter. Addition och subtraktion introduceras progressivt.

För elever med inlärningssvårigheter är visuell tydlighet avgörande med arbetsblad gratis. Våra arbetsblad erbjuder skarpa bilder och enkla instruktioner i matematik arbetsblad. Finmotorik övningar läggs till gradvis. Addition och subtraktion anpassas till motoriska förmågor.

Differentiering är kärnan i specialundervisning med arbetsblad gratis. Skapa personliga arbetsblad för varje elev. Finmotorik övningar och storleksjämförelse arbetas i individuell takt i matematik arbetsblad. Framstegen är synliga och mätbara med addition och subtraktion.`,
        quote: 'Jag kan snabbt anpassa arbetsblad för varje elevs behov.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lärarentreprenörer',
        subtitle: 'Sälja Arbetsblad Gratis och Målarbilder Barn på Teachers Pay Teachers',
        description: `Lärarentreprenörer genererar inkomster med våra arbetsblad gratis. Den inkluderade kommersiella licensen tillåter omedelbar försäljning. Målarbilder barn säljer mycket bra på plattformar i matematik arbetsblad. Teachers Pay Teachers välkomnar dina skapelser med arbetsblad gratis.

Skapa tematiska samlingar av arbetsblad gratis. Säsongspaket lockar köpare. Målarbilder barn kombinerat med storleksjämförelseövningar erbjuder mervärde i matematik arbetsblad. Lärare söker färdiga resurser med arbetsblad gratis.

Etsy och Amazon KDP är andra lönsamma möjligheter för arbetsblad gratis. Gratisutsändningar blir betalda produkter med din personliga touch. Målarbilder barn utvecklas till aktivitetshäften i matematik arbetsblad. Din kreativitet tjänar pengar lätt med arbetsblad gratis.`,
        quote: 'Min prenumeration betalade sig själv första månaden!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from big-small.md
  faq: {
    sectionTitle: 'Vanliga Frågor om Arbetsblad Gratis för Storleksjämförelse',
    sectionDescription: 'Vanliga frågor om matematik arbetsblad, förskoleklass material och storleksjämförelseövningar. Svar på frågor om finmotorik övningar, målarbilder barn och mer.',
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
        question: 'Är Denna Generator för Arbetsblad Gratis Verkligen Gratis att Använda?',
        answer: 'Generatorn för arbetsblad gratis kräver en Full Tillgång-prenumeration som kostar 240 euro per år eller 25 euro per månad. Din prenumeration ger dig obegränsad skapande av arbetsblad gratis utan extra avgifter per arbetsblad. Generera så många matematik arbetsblad som du behöver utan ytterligare kostnader. Full Tillgång-prenumerationen inkluderar alla 33 generatorer på plattformen. Grundpaketet-prenumerationen inkluderar 10 populära generatorer och kostar 144 euro per år. Båda prenumerationerna inkluderar kommersiell licensiering, support på 11 språk och professionella exporter i 300 DPI-kvalitet för arbetsblad gratis.',
      },
      {
        id: '2',
        question: 'Kan jag Skriva Ut Arbetsblad Gratis på en Vanlig Hemskrivare?',
        answer: 'Alla arbetsblad gratis skrivs ut perfekt på en vanlig hemskrivare. Arbetsblad för storleksjämförelse och finmotorik övningar kommer ut i hög kvalitet. Upplösningen på 300 DPI garanterar skarpa bilder på matematik arbetsblad. PDF-formatet anpassar sig till alla typer av skrivare. Välj pappersformat som passar din skrivare för arbetsblad gratis. Letter för USA, A4 för Europa. Svartvit-alternativet sparar färgbläck för arbetsblad gratis.',
      },
      {
        id: '3',
        question: 'Krävs Designkunskaper för att Skapa Matematik Arbetsblad?',
        answer: 'Inga designkunskaper krävs för att skapa arbetsblad gratis. Övningar med storleksjämförelse genereras automatiskt med några klick. Det intuitiva gränssnittet guidar varje steg i processen. Välj ett bildtema och klicka på generera för arbetsblad gratis. Redigeringsverktygen förblir enkla och tillgängliga för arbetsblad gratis. Din kreativitet uttrycks utan tekniska hinder.',
      },
      {
        id: '4',
        question: 'Kan jag Använda Arbetsblad Gratis i min Klass?',
        answer: 'Full Tillgång-prenumerationen tillåter obegränsad användning i klassrummet med arbetsblad gratis. Arbetsblad om storleksjämförelse distribueras till alla dina elever. Skriv ut så många kopior som nödvändigt. Dela arbetsblad gratis med dina kollegor på skolan. Prenumerationen täcker alla pedagogiska användningar.',
      },
      {
        id: '5',
        question: 'Vilka Språk är Arbetsblad Gratis Tillgängliga på?',
        answer: 'Arbetsblad gratis finns på 11 olika språk. Finmotorik övningar visas på svenska, tyska, spanska och italienska. Portugisiska, nederländska och skandinaviska språk erbjuds också för matematik arbetsblad. Denna mångfald svarar mot behoven i flerspråkiga klasser. Byt språk med ett enkelt klick för arbetsblad gratis.',
      },
      {
        id: '6',
        question: 'Kan jag Sälja Arbetsblad Gratis som jag Skapar?',
        answer: 'Full Tillgång-prenumerationen inkluderar en fullständig kommersiell licens för arbetsblad gratis. Sälj dina arbetsblad på Teachers Pay Teachers. Publicera på Amazon KDP. Inga extra avgifter för den kommersiella licensen med arbetsblad gratis. Dina skapelser tillhör dig helt. Din kreativitet blir en inkomstkälla.',
      },
      {
        id: '7',
        question: 'Hur Anpassar jag Arbetsblad Gratis för mina Elever?',
        answer: 'Anpassningen av arbetsblad gratis är total och intuitiv. Välj antal övningar och svårighetsgrad. Lägg till anpassad text med specifika instruktioner. Ladda upp dina egna bilder för mer anpassning. Skapa unika material för varje elev med arbetsblad gratis.',
      },
      {
        id: '8',
        question: 'Vilka Åldersgrupper Passar Bäst för Storleksjämförelseövningar?',
        answer: 'Storleksjämförelseövningar passar barn från 3 till 8 år med arbetsblad gratis. I förskolan räcker övningar med 2 bilder. I förskoleklass och årskurs 1-3 ökar komplexiteten progressivt med arbetsblad gratis. Finmotorik övningar utvecklas med storleksjämförelser.',
      },
      {
        id: '9',
        question: 'Kan jag Ladda Upp Mina Egna Bilder till Arbetsblad Gratis?',
        answer: 'Import av personliga bilder stöds fullt ut för arbetsblad gratis. Dina övningar integrerar klassfoton. Ladda upp flera bilder i en enda operation för arbetsblad gratis. JPEG, PNG och GIF accepteras. Kombinera personliga bilder och bibliotek för mer variation. Ditt pedagogiska material blir verkligen unikt.',
      },
      {
        id: '10',
        question: 'Hur Lång Tid Tar det att Skapa Arbetsblad Gratis?',
        answer: 'Att skapa arbetsblad gratis tar mindre än 3 minuter. Välj ett tema och konfigurera parametrarna. Arbetsbladet genereras automatiskt. Valfri anpassning lägger till några minuter. Jämför med traditionell manuell skapande som tog 30-60 minuter. Vår generator minskar denna tid med 90%.',
      },
      {
        id: '11',
        question: 'Inkluderar Arbetsblad Gratis Facit?',
        answer: 'Varje genererat arbetsblad gratis har ett automatiskt facit. Facit använder tydliga visuella indikatorer. Gröna bockar markerar rätt svar. Ladda ner facit separat eller med arbetsblad gratis. Den pedagogiska hanteringen förblir flexibel.',
      },
      {
        id: '12',
        question: 'Kan jag Skapa Arbetsblad Gratis på Specifika Teman?',
        answer: 'Arbetsblad gratis skapas på vilket tema du än väljer. Över 3000 bilder täcker alla ämnen. Djur, fordon, mat och säsongsbetonade teman finns tillgängliga. Skapa dina egna teman genom att importera bilder. Tematisk personalisering är obegränsad.',
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
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombinera med Andra Arbetsblad Generatorer',
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera storleksjämförelsearbetsblad med dessa kompletterande generatorer för matematik och visuell perception.',
    ctaTitle: 'Redo att Skapa Fantastiska Storleksjämförelsearbetsblad?',
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
        slug: 'more-less',
        name: 'Mer eller Mindre',
        category: 'Matematik',
        icon: '⚖️',
        description: 'Kombinera storleksjämförelser med mer eller mindre övningar för att förstärka matematiska begrepp.',
      },
      {
        id: '2',
        slug: 'pattern-train',
        name: 'Mönstertåg',
        category: 'Logik',
        icon: '🚂',
        description: 'Lägg till mönsterigenkänningsövningar för att utveckla logiskt tänkande och sekvensförståelse.',
      },
      {
        id: '3',
        slug: 'matching-app',
        name: 'Matchning',
        category: 'Visuell Perception',
        icon: '🔗',
        description: 'Komplettera med matchningsövningar för att förstärka visuell diskriminering och kategorisering.',
      },
      {
        id: '4',
        slug: 'find-and-count',
        name: 'Hitta och Räkna',
        category: 'Matematik',
        icon: '🔢',
        description: 'Kombinera storleksjämförelse med räkning för att bygga taluppfattning.',
      },
      {
        id: '5',
        slug: 'picture-sort',
        name: 'Bildsortering',
        category: 'Kategorisering',
        icon: '📊',
        description: 'Utöka med sorteringsövningar för att utveckla klassificeringsförmåga.',
      },
      {
        id: '6',
        slug: 'coloring',
        name: 'Målarbilder',
        category: 'Kreativitet',
        icon: '🎨',
        description: 'Belöna färdiga storleksjämförelseövningar med tematiska målarbilder som utvecklar finmotorik.',
      },
    ],
  },
};

export default bigSmallSvContent;
