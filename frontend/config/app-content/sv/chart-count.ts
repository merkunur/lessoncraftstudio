import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'räkneuppgifter skriva ut',
    secondaryKeywords: [
      'övningar räkna och diagram',
      'uppgifter diagram lågstadiet',
      'räkna och streck uppgift',
      'räkneaktiviteter förskoleklass',
    ],
    lsiKeywords: [
      'räkna',
      'stapeldiagram',
      'streck',
      'data',
      'sortera',
    ],
    titleTag: 'Räknegenerator | LessonCraftStudio',
    metaDescription: 'Skapa räkne- och diagramuppgifter med temabilder. Automatiskt facit, utskrivbara PDF:er. Prova gratis.',
  },

  hero: {
    title: 'Räknegenerator — Skapa utskrifter att sälja på Etsy och KDP',
    tagline: 'Skapa räkne- och diagramuppgifter för förskoleklass och lågstadiet — prova gratis med vattenmärke.',
    description:
      'Skapa professionella räkne- och diagramblad att sälja på Etsy eller sammanställa i arbetsböcker för Amazon KDP. Varje arbetsblad innehåller ett spritt bildsrutnät med 20 ikoner från 6 olika typer — köparna räknar varje typ och fyller i stapeldiagrammet. Appen genererar automatiskt ett facit med gulmarkerade celler, så du slipper kontrollera manuellt. Välj bland mer än 3 100 illustrationer i 104 teman eller välj manuellt exakt 6 bilder. Bilddiagram är inte språkkänsliga — samma arbetsblad fungerar globalt utan översättning, vilket gör det möjligt att sälja samma produkt på alla marknader. Exportera tryckfärdiga PDF:er i Letter, A4 eller anpassade storlekar. Den svenska marknaden för pedagogiska diagramblad på Etsy saknar i princip konkurrenter — en outnyttjad nisch med hög potential. Kommersiell licens ingår. Gratis provversion med alla funktioner — nedladdningar innehåller en vattenstämpel; köp en licens för att ta bort den.',
  },

  ctaHeading: 'Skapa räkneuppgifter',

  howItWorks: {
    title: 'Hur du Skapar Bilddiagram Arbetsblad i 5 Steg',
    steps: [
      {
        title: 'Ställ in sidlayout och namnfält',
        description:
          'Öppna panelen Sidinställningar och välj en sidstorlek: Letter Stående, Letter Liggande, A4 Stående, A4 Liggande, Kvadrat (1200×1200) eller valfri anpassad dimension. Välj en sidfärg med färgväljaren — vitt är standard för rena arbetsblad. Kryssa i rutan Inkludera Namn/Datum för att lägga till formaterade \"Namn: ____\" och \"Datum: ____\" fält längst ner på sidan, så att användarna identifierar sitt arbete. Välj ett bakgrundstema och ett ramtema från det inbyggda biblioteket, vart och ett med ett oberoende opacitetsreglage (0–1, steg 0,05) för subtil eller djärv dekorativ inramning.',
      },
      {
        title: 'Välj din bildkälla',
        description:
          'Öppna panelen Bildbibliotek och välj en bildkälla från dropdownmenyn Arbetsbladets bildkälla. Välj ett tema som Djur, Mat eller Fordon för automatiskt urval — appen väljer slumpmässigt 6 bilder från det temat. Alternativt, växla till manuellt läge: bläddra i Bildbiblioteket efter tema eller sök, och klicka sedan på exakt 6 bilder för att välja dem. Valda bilder visas i en förhandsvisningsrad där du kan klicka för att ta bort och ersätta enskilda val. Utan valt tema väljer appen 6 slumpmässiga bilder från alla tillgängliga samlingar.',
      },
      {
        title: 'Generera bilddiagram-arbetsbladet',
        description:
          'Klicka på Generera för att skapa arbetsbladet. Appen arrangerar 20 spridda ikoner från dina 6 valda bildtyper i ett 4×5-rutnät med en streckad ram längst upp på sidan. Under rutnätet visas ett stapeldiagram med 6 kolumner × 5 rader där varje kolumn är märkt med en av de 6 bildtyperna. Raderna är numrerade 1–5 nedifrån och upp. En automatiskt genererad rubrik visar en lokaliserad \"Bilddiagram\"-titel och räkningsinstruktioner i en stiliserad gul piller med orange ramkant. Arbetsytans arbetsblad visar tomma diagramceller redo för användarna att fylla i.',
      },
      {
        title: 'Anpassa med textverktyg och arbetsyteredigering',
        description:
          'Använd panelen Textverktyg för att lägga till titlar, etiketter eller instruktioner med sju typsnittsval: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial och Verdana. Justera teckenstorlek, textfärg, konturfärg och konturbredd (0–10 med 0,5-stegs granularitet) för läsbara rubriker. Dra, ändra storlek, rotera och flytta element var som helst på Fabric.js-arbetsytan. Använd lagerkontroller för att hantera staplingsordning, lås färdiga element och zooma från 25% till 300% för precision. Ångra och gör om upp till 20 historiksteg med Ctrl+Z och Ctrl+Y.',
      },
      {
        title: 'Generera facit och ladda ner allt',
        description:
          'Växla till fliken Facit för att se den automatiskt genererade lösningen — stapeldiagrammets celler är fyllda med gul (#FFC857) markering som visar det korrekta antalet för varje bildtyp. Växla gråskalealternativet för bläckvänliga versioner. Ladda ner alla fyra filer: arbetsblad-JPEG, arbetsblad-PDF, facit-JPEG och facit-PDF — alla renderade med 300 DPI. Filerna heter worksheet.jpeg, worksheet.pdf, answer_key.jpeg och answer_key.pdf för enkel organisation. Varje export är produktionsklar för Etsy-annonser, Amazon KDP-interiörer och Gumroad-resursfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nyckelfunktioner i Diagramräkning Arbetsblad Generatorn',
    features: [
      {
        title: 'Bilddiagram arbetsblad generator med spritt bildsrutnät och stapeldiagram',
        description:
          'Varje genererat arbetsblad kombinerar två sammankopplade element: ett 4×5-rutnät med 20 spridda ikoner från 6 olika bildtyper, och ett stapeldiagram med 6 kolumner × 5 rader där varje kolumn motsvarar en bildtyp. Bildtyperna förekommer var och en 1–5 gånger i rutnätet (maximalt 5 per typ, slumpmässigt fördelade), vilket skapar en unik räkningsutmaning varje gång du genererar. användarna räknar hur många av varje bildtyp som finns i rutnätet och färglägger sedan motsvarande antal celler i diagrammet nedanför. Detta tvådelade format lär ut datainsamling och datarepresentation samtidigt — kärnan i tidiga diagramfärdigheter.',
      },
      {
        title: 'Automatiskt genererat facit med ifyllda diagramceller',
        description:
          'Varje arbetsblad genererar ett matchande facit samtidigt på en separat arbetsyteflik. Facit visar samma bildsrutnät och stapeldiagram, men med de korrekta cellerna fyllda med gul (#FFC857) markering. säljare ser med en blick hur många av varje bildtyp som ska finnas i diagrammet. Växla mellan flikarna Arbetsblad och Facit för att jämföra. Ladda ner båda versionerna oberoende — arbetsblad-JPEG/PDF och facit-JPEG/PDF — vilket ger dig fyra produktionsklara filer från en enda generering. Det automatiska facit eliminerar manuell räkning och säkerställer noggrannhet över stora arbetsbladspaket.',
      },
      {
        title: 'Automatiskt och manuellt bildvalsläge',
        description:
          'Dropdownmenyn Arbetsbladets bildkälla erbjuder två metoder för att välja de 6 bilderna som visas på varje arbetsblad. I automatiskt läge väljer du ett tema (Djur, Mat, Fordon och 101 fler) och appen väljer slumpmässigt 6 bilder från den samlingen. I manuellt läge bläddrar du i Bildbiblioteket efter tema eller söker med nyckelord, och klickar sedan på exakt 6 bilder för att välja dem — en förhandsvisningsrad visar dina val med klicka-för-att-ta-bort funktionalitet. Utan valt tema hämtar appen 6 slumpmässiga bilder från alla tillgängliga samlingar. Båda lägena garanterar exakt 6 bildtyper per arbetsblad för konsekvent diagramformatering.',
      },
      {
        title: 'Lokaliserad bilddiagram-rubrik med titel och instruktioner',
        description:
          'Varje genererat arbetsblad inkluderar en automatiskt genererad rubrik med gul pillerbakgrund (#FFD93D), vit inre piller och orange ramkant (yttre #FF8C42, inre #FFD6A5). Rubriken visar en lokaliserad titel — \"Picture Graph\" på engelska, \"Bilddiagramm\" på tyska, \"Graphique en Images\" på franska, \"Bilddiagram\" på svenska och motsvarande översättningar på alla 11 stödda språk. Under titeln guidar lokaliserade räkningsinstruktioner användarna genom aktiviteten. Rubriken anpassas automatiskt när du byter gränssnittsspråk, vilket gör arbetsbladen produktlinjesfärdiga i alla lokaler utan manuell textredigering.',
      },
      {
        title: 'Bildbibliotek med 104 tematiska samlingar och mer än 3 100 illustrationer',
        description:
          'Bläddra bland 104 tematiska bildsamlingar som täcker djur, mat, fordon, natur, yrken, högtider, sport, årstider och dussintals fler. Varje tema ger en koordinerad uppsättning färgglada illustrationer perfekta för bilddiagram arbetsblad. Använd temadropdownen för att filtrera efter kategori eller sök efter specifika bilder med nyckelord. I automatiskt läge väljer appen 6 bilder från ditt valda tema; i manuellt läge väljer du exakt 6 från valfri kombination av teman. Kommersiellt Paket inkluderar 10 färgglada teman; Full Access låser upp alla 104 teman för maximal variation över arbetsbladspaket.',
      },
      {
        title: 'Bakgrunds- och ramteman med oberoende opacitetskontroller',
        description:
          'Applicera dekorativa bakgrunder och ramar från det inbyggda temabiblioteket för att rama in dina bilddiagram arbetsblad. Till skillnad från appar med bara ramteman erbjuder Diagramräkning Generatorn både bakgrunds- och ramteman med oberoende opacitetsreglage (0–1, steg 0,05). Ställ in en subtil akvarellbakgrund på 20% opacitet medan du behåller en djärv dekorativ ram på full opacitet, eller valfri kombination som passar din design. Bakgrunds- och ramteman lägger till visuell polish och ökar upplevd kvalitet för marknadsplatsannonser utan att störa bildsrutnätet eller stapeldiagrammets innehåll.',
      },
      {
        title: 'Tryckfärdig PDF- och JPEG-export med 300 DPI och gråskaleväxling',
        description:
          'Ladda ner bilddiagram arbetsblad och facit som högupplösta JPEG-bilder eller tryckfärdiga PDF-dokument renderade med 300 DPI via en 6× multiplikator för skarpa resultat. Sidstorlekar inkluderar Letter Stående (612×792), Letter Liggande (792×612), A4 Stående (595×842), A4 Liggande (842×595), Kvadrat (1200×1200) och helt anpassade dimensioner. Växla gråskala för bläckvänliga versioner idealiska för volymutskrift och KDP-bokinteriörer. Fyra nedladdningsknappar ger arbetsblad-JPEG, facit-JPEG, arbetsblad-PDF och facit-PDF — en komplett produktuppsättning från en enda generering.',
      },
      {
        title: 'Full arbetsyteredigering med textverktyg och lagerkontroller',
        description:
          'Fabric.js-arbetsytan ger komplett kontroll över varje element på ditt bilddiagram arbetsblad. Dra, ändra storlek, rotera och flytta bildsrutnätet, stapeldiagrammet, rubriken, texten och alla anpassade element fritt. Lagerkontroller hanterar staplingsordning — flytta element framåt eller skicka dem bakåt. Lås färdiga element medan du redigerar andra. Lägg till anpassad text med sju typsnittsalternativ (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storlek och färg, och textkonturbredd från 0 till 10 med 0,5-stegs granularitet. Zooma från 25% till 300% för precisionsarbete. Ångra och gör om upp till 20 historiksteg med Ctrl+Z och Ctrl+Y. Rensa Allt inkluderar en bekräftelsedialog för att förhindra oavsiktlig radering.',
      },
    ],
  },

  businessUseCases: {
    title: 'Hur du Säljer Bilddiagram Arbetsblad Online',
    cases: [
      {
        title: 'Tematiska bilddiagram-paket på Etsy',
        description:
          'Skapa tematiska bilddiagram-paket med de 104 bildsamlingarna — djurräkning diagram, matdata diagram, fordonsräkning blad, naturobservation diagram och dussintals fler. Varje tema ger tillräckligt med bilder för 10–20 unika arbetsblad med olika slumpmässiga fördelningar. Inkludera det automatiskt genererade facit med varje arbetsblad för lärarbekvämlighet. Paketera teman som enskilda paket till 30–50 SEK vardera, eller kombinera flera teman till megapaket till 120–180 SEK. Det spridda bildsrutnätet med 6 typer per blad säkerställer att varje arbetsblad är unikt och omöjligt att återskapa manuellt, vilket ger dina produkter äkta originalitet.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Datafärdighets-arbetsböcker på Amazon KDP',
        description:
          'Sammanställ 60–100 bilddiagram arbetsblad till en tryckt datafärdighets-arbetsbok formaterad för Amazon KDP. Strukturera kapitel efter tema: Kapitel 1 täcker djurräkning, Kapitel 2 matdiagram, Kapitel 3 fordonsdata och så vidare. Växla gråskaleexport för bläckvänliga sidor redo för svartvita bokinteriörer. Inkludera facitsidor i slutet av varje kapitel för föräldra- och lärarreferens. Dubbelarbetsyta-genereringen producerar både arbetsblad och facit automatiskt, så att bygga en 100-sidig arbetsbok med kompletta lösningar tar en bråkdel av tiden jämfört med manuellt skapande.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Mattestationsaktiviteter för Gumroad',
        description:
          'Bygg färdiga mattestationsaktiviteter med bilddiagram som inkluderar namn- och datumfält. köpare som söker på Gumroad efter diagramaktiviteter värdesätter arbetsblad med inbyggd identifiering — kryssrutan för namn/datum gör din produkt omedelbart produktlinjesfärdig utan ytterligare formatering. Skapa temaspecifika set knutna till produktkatalogsenheter: räkna bondgårdsdjur för livsvetenskap, diagram av väderikoner för geovetenskap, eller räkna samhällshjälparfordon för samhällskunskap. Varje arbetsblad levereras med sitt eget facit, vilket eliminerar säljarens förberedelsetid.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Ämnesövergripande dataaktiviteter',
        description:
          'Bilddiagram överbryggar matematik och andra ämnen naturligt. Använd djurteman för naturvetenskapliga enheter om livsmiljöer och klassificering. Använd matteman för hälso- och näringslektioner. Använd fordonstemanför samhälls- och transportämnen. De 104 tematiska samlingarna täcker praktiskt taget varje grundskoleämnesområde, vilket låter dig skapa datarepresentation arbetsblad som förstärker ämnesvokabulär samtidigt som de lär ut diagramfärdigheter. Sälj ämnesövergripande paket som tilltalar köpare som vill ha integrerade aktiviteter — en växande nisch på alla tre stora plattformar.',
        platform: 'Etsy / Amazon KDP / Gumroad',
      },
      {
        title: 'Säsongsbetonade räkne- och diagramsamlingar',
        description:
          'De 104 tematiska bildsamlingarna täcker varje säsongs- och högtidstillfälle — julprydnader, halloween-ikoner, påskföremål, alla hjärtans dag-hjärtan, skolstartstillbehör, sommaraktiviteter och vinterscener. Skapa tidsbegränsade bilddiagram-samlingar som sammanfaller med toppshoppingperioder. Släpp halloweenräkning-paket i september, juldiagram-paket i oktober och alla hjärtans dag-dataaktiviteter i januari. Inkludera facit med varje set för kompletta lärarpaket. Säsongsprodukter motiverar högre priser under sina toppfönster och skapar naturliga skäl till återköp.',
        platform: 'Etsy / Amazon KDP / Gumroad (säsongsbetonat)',
      },
    ],
  },

  faq: [
    {
      question: 'Hur fungerar bilddiagram-arbetsbladet?',
      answer:
        'Varje arbetsblad har två delar. Den övre sektionen visar ett 4×5-rutnät med 20 spridda ikoner från 6 olika bildtyper — varje typ förekommer 1–5 gånger, slumpmässigt fördelade. Den nedre sektionen visar ett stapeldiagram med 6 kolumner × 5 rader med kolumner märkta med varje bildtyp och rader numrerade 1–5 nedifrån och upp. användarna räknar hur många av varje bildtyp som finns i rutnätet, och färglägger eller fyller sedan motsvarande antal celler i den matchande kolumnen. Detta lär ut både datainsamling (räkning) och datarepresentation (diagram) i en enda aktivitet.',
    },
    {
      question: 'Hur fungerar det automatiska bildvalet?',
      answer:
        'Öppna panelen Bildbibliotek och använd dropdownmenyn Arbetsbladets bildkälla för att välja ett tema. Appen väljer slumpmässigt 6 bilder från det temats samling. Om du föredrar manuell kontroll, växla till manuellt läge: bläddra bland teman eller sök med nyckelord, och klicka sedan på exakt 6 bilder. Valda bilder visas i en förhandsvisningsrad där du kan klicka på valfri bild för att ta bort den och välja en ersättare. Utan valt tema hämtar appen 6 slumpmässiga bilder från alla tillgängliga samlingar. Varje läge garanterar exakt 6 bildtyper per arbetsblad.',
    },
    {
      question: 'Hur fungerar det automatiskt genererade facit?',
      answer:
        'När du genererar ett arbetsblad skapar appen samtidigt ett matchande facit på en separat arbetsyteflik. Facit visar samma bildsrutnät och stapeldiagram, men de korrekta cellerna i diagrammet är fyllda med gul (#FFC857) markering. Växla mellan flikarna Arbetsblad och Facit för att jämföra. Ladda ner varje version oberoende med de fyra nedladdningsknapparna: arbetsblad-JPEG, arbetsblad-PDF, facit-JPEG och facit-PDF. Facit genereras automatiskt — ingen manuell räkning krävs.',
    },
    {
      question: 'Vad är den lokaliserade rubriken på varje arbetsblad?',
      answer:
        'Varje genererat arbetsblad inkluderar en stiliserad rubrik med en gul pillerbakgrund (#FFD93D), vit inre piller och orange ramkant. Rubriken visar en \"Bilddiagram\"-titel och räkningsinstruktioner som automatiskt översätts till det aktiva gränssnittsspråket — engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, svenska, danska, norska eller finska. Rubriken anpassas för liggande läge med en kompakt layout. Du behöver inte skapa eller formatera rubriken manuellt.',
    },
    {
      question: 'Hur fungerar namn- och datumfälten?',
      answer:
        'I panelen Sidinställningar kryssar du i rutan Inkludera Namn/Datum för att lägga till formaterade \"Namn: ____\" och \"Datum: ____\" fält längst ner på arbetsbladssidan. Fälten använder typsnittet Fredoka i 18px med #333-färg. användarna skriver sitt namn och datum innan de börjar räkneaktiviteten. Detta gör arbetsbladen omedelbart produktlinjesfärdiga utan ytterligare formatering. Avmarkera rutan för att ta bort fälten för produkter som inte behöver identifiering.',
    },
    {
      question: 'Hur fungerar bakgrunds- och ramteman?',
      answer:
        'Panelen Sidinställningar erbjuder både bakgrundsteman och ramteman laddade från det inbyggda temabiblioteket. Vardera har ett oberoende opacitetsreglage (0–1, steg 0,05), så du kan ställa in en subtil bakgrund på låg opacitet medan du behåller en djärv ram på full styrka, eller valfri kombination du föredrar. Bakgrundsteman fyller sidytan bakom bildsrutnätet och diagrammet, medan ramteman ramar in den yttre kanten. Tillsammans lägger de till dekorativ polish utan att störa arbetsbladets innehåll.',
    },
    {
      question: 'Hur fungerar gråskaleväxlingen?',
      answer:
        'Gråskaleväxlingen i panelen Nedladdning konverterar hela ditt arbetsblad eller facit till gråskala vid exporttillfället. Din arbetsyta förblir i fullfärg för enkel visuell redigering — gråskala appliceras bara på den exporterade filen. Detta producerar bläckvänligt resultat för volymutskrift där färgbläck är dyrt eller otillgängligt, och för Amazon KDP-bokinteriörer som kräver svartvita sidor. Gråskaleväxlingen fungerar oberoende för både arbetsblad- och facitexporter.',
    },
    {
      question: 'Hur växlar jag mellan arbetsbladet och facit?',
      answer:
        'Arbetsytans område har två flikar: Arbetsblad och Facit. Klicka på fliken Facit för att visa den automatiskt genererade lösningen med gulfyllda diagramceller. Klicka på fliken Arbetsblad för att återgå till övningsversionen med tomma celler. Varje flik har sitt eget par nedladdningsknappar (JPEG och PDF), vilket ger dig fyra totala nedladdningsalternativ. Redigeringar av arbetsyteelement som text, bakgrund och ramar gäller för båda flikarna — den enda skillnaden mellan dem är stapeldiagrammets fyllnadsläge.',
    },
    {
      question: 'Finns det en gratis provversion?',
      answer:
        'Ja. Du kan använda alla funktioner — dubbelarbetsytan, bildsrutnätsgenerering, stapeldiagramskapande, automatiskt facit, bildbiblioteket, bakgrunds- och ramteman, namn/datum-fält, gråskaleexport och alla nedladdningsformat — utan att skapa ett konto, ange kreditkort eller installera programvara. Gratis provversion-nedladdningar innehåller en liten vattenstämpel. En kommersiell licens tar bort vattenstämpeln och ger fulla försäljningsrättigheter.',
    },
    {
      question: 'Är Diagramräkning Generatorn språkkänslig?',
      answer:
        'Nej. Diagramräkning Generatorn producerar visuella räknearbetsblad där användarna räknar bilder och fyller i stapeldiagramceller — siffror och bilder är universella. Att byta språk påverkar bara gränssnittsetiketterna i generatorn, den automatiskt genererade rubrikens titel och instruktioner, samt bildbiblioteksets innehållsetiketter. Arbetsbladets resultat i sig fungerar identiskt på varje språk. Kommersiellt Paket inkluderar 10 färgglada teman; Full Access låser upp alla 104 teman och alla 11 gränssnittsspråk för gränssnittet.',
    },
    {
      question: 'Vad är er återbetalningspolicy?',
      answer:
        'Eftersom den gratis provversionen ger dig tillgång till alla funktioner erbjuder vi inte återbetalning på köp av kommersiella licenser. Du kan testa dubbelarbetsytan, bildsrutnätsgenerering, automatiskt facit, hela bildbiblioteket, bakgrunds- och ramteman, namn/datum-fält, gråskaleexport och alla nedladdningsformat innan du köper. Den gratis provversionen är återbetalningspolicyn — se till att verktyget passar dina behov innan du köper en licens.',
    },
    {
      question: 'Följer arbetsbladen Lgr22 (läroplanen)?',
      answer:
        'Räkne- och diagramuppgifter stöder Lgr22:s centrala innehåll i matematik — taluppfattning, datahantering och att tolka enkla tabeller och diagram. Att räkna föremål, sortera data och skapa streckdiagram är uttryckligen nämnt i kursplanen för de tidiga årskurserna. Generatorn skapar verktygen — du kopplar dem till din planering.',
    },
    {
      question: 'Passar uppgifterna för förskoleklass, lågstadiet och mellanstadiet?',
      answer:
        'Ja. Uppgifterna är särskilt relevanta för förskoleklass (6 år) och lågstadiet (åk 1-3) där räkning, sortering och enkla diagram är centralt i kursplanen. För mellanstadiet (åk 4-6) kan du öka antalet kategorier och föremål för mer avancerad datatolkning. Anpassa svårighetsgraden genom att välja antal bilder och kategorier per uppgift.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'stort-litet-arbetsblad',
      anchorText: 'Stort och Litet Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'monster-tag-arbetsblad',
      anchorText: 'Mönstertåg Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'monster-arbetsblad',
      anchorText: 'Mönster Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'rutritning-arbetsblad',
      anchorText: 'Rutritning Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'rita-linjer-arbetsblad',
      anchorText: 'Rita Linjer Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'malarbilder-arbetsblad',
      anchorText: 'Målarbilder Arbetsblad Generator',
    },
    {
      pageType: 'bundle',
      slug: 'visuellt-laerande-paket',
      anchorText: 'Visuellt Lärande Paket — Alla Visuella Appar i Ett',
    },
    {
      pageType: 'idea',
      slug: 'sommar-utskriftsbara-ideer',
      anchorText: 'Sommar Utskriftsbara Idéer för Säsongsförsäljning',
    },
    {
      pageType: 'idea',
      slug: 'jul-utskriftsbara-ideer',
      anchorText: 'Jul Utskriftsbara Idéer för Säsongsförsäljning',
    },
    {
      pageType: 'start',
      slug: 'etsy-utskriftsbart-foeretag',
      anchorText: 'Bygg Ditt Etsy Utskriftsbart Företag',
    },
    {
      pageType: 'guide',
      slug: 'skapa-diagram-rakning-arbetsblad',
      anchorText: 'Hur du Skapar Diagramräkning Arbetsblad som Säljer',
    },
    {
      pageType: 'tool',
      slug: 'bilddiagram-arbetsblad-skapare',
      anchorText: 'Looking for the free browser version? Try the free maker tool.',
    },
    {
      pageType: 'tool',
      slug: 'kdp-royalty-calculator',
      anchorText: 'Calculate KDP royalties for your activity books',
    },
    {
      pageType: 'tool',
      slug: 'kdp-size-calculator',
      anchorText: 'Pick the right KDP book size & margins',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/swedish/chart%20count/worksheet.webp',
      primaryAlt: 'Bilddiagram arbetsblad med spritt bildsrutnät och stapeldiagram för användarna att räkna och diagram 6 bildtyper',
    },
    sampleGallery: [
      {
        src: '/samples/swedish/chart%20count/worksheet-1.webp',
        alt: 'Djurtema bilddiagram arbetsblad med 20 spridda djurikoner och tomt stapeldiagram',
        caption: 'Djurtema bilddiagram — 6 djurtyper spridda över rutnätet med stapeldiagram nedanför',
      },
      {
        src: '/samples/swedish/chart%20count/worksheet-2.webp',
        alt: 'Bilddiagram facit med gulmarkerade celler som visar korrekta antal för varje bildtyp',
        caption: 'Automatiskt genererat facit — gulfyllda celler visar det korrekta antalet för varje bildtyp',
      },
      {
        src: '/samples/swedish/chart%20count/answer-key.webp',
        alt: 'Bilddiagram arbetsblad med dekorativt bakgrundstema och ramkant applicerad',
        caption: 'Dekorerat bilddiagram — bakgrunds- och ramteman med oberoende opacitetskontroller',
      },
    ],
    youtubeId: 'CDgIihDQX6U',
    videoTitle: 'Hur du Skapar Bilddiagram Arbetsblad med Automatiska Facit och 104 Tematiska Bildsamlingar — Steg-för-Steg Handledning',
  },
};

export default content;
