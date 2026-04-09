import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'sudoku skriva ut',
    secondaryKeywords: [
      'sudoku generator',
      'sudoku barn skriva ut',
      'sudoku med bilder',
      'skapa egen sudoku',
    ],
    lsiKeywords: [
      'sudoku',
      'logik',
      'rutnät',
      'bilder',
      'barn',
    ],
    titleTag: 'Sudoku att skriva ut | Generator med bilder',
    metaDescription: 'Skapa sudoku med bilder eller siffror, justerbar svårighetsgrad. Automatiskt facit, utskrivbara PDF:er. Prova gratis — sälj på Etsy & KDP.',
  },

  hero: {
    title: 'Sudoku att skriva ut — Generator med bilder och justerbar svårighet',
    tagline: 'Skapa sudoku med bilder för barn och justerbar svårighetsgrad — prova gratis med vattenmärke.',
    description:
      'Skapa bildsudoku att sälja på Etsy eller sammanställa i logikpusselböcker för Amazon KDP. 4×4 rutnät med bilder istället för siffror — samma regler som klassiskt sudoku, men visuellt tillgängligt för barn. Tre svårighetsnivåer: Lätt (4 tomma celler), Medel (6) och Svår (8). Bildsudoku är helt visuellt — fungerar globalt utan översättning, en enda produkt säljs på alla marknader. Välj bland mer än 3 100 illustrationer i 104 teman. Sudokuböcker för barn är en konsekvent populär nisch på KDP. Den svenska marknaden saknar bildsudoku-produkter på Etsy. Automatiskt facit med komplett fyllt rutnät ingår. Exportera tryckfärdiga PDF:er i Letter och A4. Kommersiell licens ingår. Gratis provversion med alla funktioner — nedladdningar innehåller en vattenstämpel; köp en licens för att ta bort den.',
  },

  howItWorks: {
    title: 'Hur du Skapar Bildsudoku Arbetsblad i 5 Steg',
    steps: [
      {
        title: 'Ställ in sidlayouten',
        description:
          'Öppna panelen Sida och Scen och välj en sidstorlek: Letter Stående, Letter Liggande, A4 Stående, A4 Liggande eller valfri anpassad dimension. Välj en reservfärg med färgväljaren. Välj ett bakgrundstema och justera dess opacitet (0–1 i 0,05-steg), välj sedan ett ramtema med sin egen oberoende opacitetskontroll. Dessa layoutval ramar in ditt sudokupussel innan du konfigurerar något innehåll.',
      },
      {
        title: 'Välj svårighetsnivå',
        description:
          'Öppna panelen Sudoku för Barn och välj en svårighet från dropdownen: Lätt, Medel eller Svår. Lätt tar bort 4 celler från 4×4-rutnätet, lämnar 12 fyllda och 4 för användaren att lösa. Medel tar bort 6 celler för en måttlig utmaning. Svår tar bort 8 celler — exakt halva rutnätet — och kräver mer avancerat logiskt resonemang. Systemet väljer slumpmässigt vilka celler som blir tomma, så att regenerera samma svårighet producerar olika pusselkonfigurationer varje gång.',
      },
      {
        title: 'Välj exakt 4 bilder',
        description:
          'Öppna panelen Bildbibliotek och välj hur du vill välja dina 4 pusselbilder. Temabaserat val väljer ett tema från dropdownen och systemet väljer automatiskt 4 slumpmässiga bilder från den samlingen. Manuellt val låter dig bläddra bland 104 tematiska samlingar med mer än 3 100 illustrationer, filtrera efter tema eller söka med nyckelord för att handplocka exakt 4 bilder. Du kan också ladda upp egna bilder. Appen kräver exakt 4 bilder — varken mer eller mindre — eftersom ett 4×4 sudokurutnät använder 4 unika symboler.',
      },
      {
        title: 'Generera sudokupusslet',
        description:
          'Klicka på Generera för att skapa 4×4 bildsudoku-rutnätet. Appen placerar dina 4 valda bilder i ett giltigt sudokuarrangemang där varje bild visas exakt en gång per rad och en gång per kolumn, och tar sedan bort det konfigurerade antalet celler baserat på din svårighetsinställning. Premiumrutnätet visar alternerande 2×2-blockfärger i ljusblått (#F8F9FC) och ljusrosa (#FFF5F7), med feta mittdelare, flerskiktsade skuggor och en indigoblå yttre ram (#667EEA) med rundade hörn. En stiliserad \"Bildsudoku\"-rubrik visas ovanför rutnätet med lila bakgrund (#5E35B1) och lokaliserad titeltext.',
      },
      {
        title: 'Generera facit och ladda ner',
        description:
          'Växla till fliken Facit för att se det kompletta fyllda rutnätet med alla 16 celler ifyllda — inga tomma. Ladda ner båda versionerna med de fyra dedikerade knapparna: Arbetsblad-JPEG, Facit-JPEG, Arbetsblad-PDF och Facit-PDF. Filer exporteras som sudoku_worksheet.jpeg/pdf och sudoku_answer_key.jpeg/pdf med 300 DPI. Växla gråskala för bläckvänliga versioner. Varje export är produktionsklar för Etsy-annonser, Amazon KDP-interiörer och Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nyckelfunktioner i Bildsudoku Generatorn',
    features: [
      {
        title: '4×4 bildsudoku med bilder istället för siffror',
        description:
          'Varje pussel använder ett 4×4-rutnät med 4 unika färgglada bilder som ersätter traditionella siffror. användarna tillämpar samma logikregler som klassiskt sudoku — varje bild måste visas exakt en gång i varje rad och exakt en gång i varje kolumn — men det visuella formatet gör pussel tillgängliga för föreläsare och unga användare som inte har bemästrat siffror ännu. Det bildbaserade formatet gör också varje pussel universellt förståeligt oavsett språk, eftersom ingen text visas inom själva rutnätet. Denna visuella design är den viktigaste skillnaden som öppnar världsmarknader för dina utskrivbara produkter.',
      },
      {
        title: 'Tre svårighetsnivåer: Lätt, Medel och Svår',
        description:
          'Kontrollera pusselkomplexiteten med tre distinkta svårighetsinställningar. Lätt tar bort 4 celler från 16-cells rutnätet, lämnar 12 ledtrådar — användarna löser en cell i taget med enkel rad-och-kolumn-eliminering. Medel tar bort 6 celler, vilket kräver att användarna överväger flera begränsningar samtidigt. Svår tar bort 8 celler — exakt halva rutnätet — och kräver flerstegs logiskt resonemang för att slutföra. Systemet bestämmer slumpmässigt vilka celler som blir tomma, så att regenerera samma svårighetsnivå producerar en annorlunda pusselkonfiguration varje gång.',
      },
      {
        title: 'Temabaserat och manuellt bildval för exakt 4 bilder',
        description:
          'Två bildvalsmetoder säkerställer kreativ flexibilitet. Temabaserat val låter dig välja valfritt tema från dropdownen och systemet väljer automatiskt 4 slumpmässiga bilder från den samlingen — perfekt för snabb pusselgenerering. Manuellt val öppnar hela Bildbiblioteket där du bläddrar bland 104 tematiska samlingar, filtrerar efter tema eller söker med nyckelord för att handplocka exakt 4 bilder. Du kan också ladda upp egna bilder. Appen upprätthåller 4-bildskravet: du kan inte generera ett pussel med färre eller fler än 4 unika bilder, eftersom varje 4×4 sudokurutnät använder exakt 4 distinkta symboler.',
      },
      {
        title: 'Premiumrutnätsdesign med alternerande blockfärger och flerskiktsade skuggor',
        description:
          'Sudokurutnätet har en polerad design som lyfter dina utskrivbara produkter över grundläggande pusselgeneratorer. Alternerande 2×2-block använder ljusblå (#F8F9FC) och ljusrosa (#FFF5F7) bakgrunder för att hjälpa användarna visuellt identifiera blockgränser. Feta mittdelare (#7C8DB5, 3px streck) separerar de fyra kvadranterna medan lättare inre linjer (#D1D9E6, 1,5px) definierar individuella celler. En indigoblå yttre ram (#667EEA) med 18px rundade hörn ramar in hela rutnätet, och tre flerskiktsade skuggor lägger till djup. Bilder visas med 65% av cellstorleken för tydlig visuell separation.',
      },
      {
        title: 'Automatiskt genererat facit med komplett fyllt rutnät',
        description:
          'Varje sudokupussel genererar automatiskt ett medföljande facit på en separat arbetsyteflik. Facit visar det kompletta 4×4-rutnätet med alla 16 celler fyllda — varje tom cell från arbetsbladet är ifylld med rätt bild. Ingen manuell lösning, ingen separat filskapning — facit är alltid synkroniserat med pusslet. Denna dubbelarbetsyte-metod sparar betydande produktionstid för säljare som skapar sudokupaket där varje pussel behöver sin egen lösningssida. Ladda ner facit som sudoku_answer_key.jpeg eller sudoku_answer_key.pdf bredvid arbetsbladet.',
      },
      {
        title: 'Bildbibliotek med 104 tematiska samlingar och mer än 3 100 illustrationer',
        description:
          'Bläddra bland 104 tematiska bildsamlingar som täcker djur, mat, fordon, natur, yrken, högtider, sport, årstider och dussintals fler. Varje tema ger en koordinerad uppsättning färgglada illustrationer som skapar visuellt sammanhängande sudokupussel. Filtrera efter tema med dropdownen eller sök efter specifika bilder med nyckelord. Klicka på valfri bild för att lägga till den i ditt pussel. Kommersiellt Paket inkluderar 10 färgglada teman för att komma igång; Full Access låser upp alla 104 teman för maximal kreativ variation över alla dina sudokuprodukter.',
      },
      {
        title: 'Tryckfärdig PDF- och JPEG-export med 300 DPI och gråskaleväxling',
        description:
          'Ladda ner sudoku arbetsblad och facit som högupplösta JPEG-bilder eller tryckfärdiga PDF-dokument renderade med 300 DPI (6× arbetsyte-multiplikator). Fyra dedikerade nedladdningsknappar exporterar sudoku_worksheet.jpeg, sudoku_worksheet.pdf, sudoku_answer_key.jpeg och sudoku_answer_key.pdf separat. Sidstorlekar inkluderar Letter Stående, Letter Liggande, A4 Stående, A4 Liggande och helt anpassade dimensioner. Växla gråskala för bläckvänliga versioner som sparar toner samtidigt som bildtydligheten bevaras. Varje export är produktionsklar för digitala nedladdningar, tryckta arbetsböcker och produktlinjesutdelningar.',
      },
      {
        title: 'Full arbetsyteredigering med textverktyg och 50-stegs ångrahistorik',
        description:
          'Fabric.js-arbetsytan ger komplett kontroll över varje element på ditt sudoku arbetsblad. Dra, ändra storlek, rotera och flytta bilder, text och genererat innehåll fritt. Lagerkontroller hanterar staplingsordning — flytta element framåt eller skicka dem bakåt. Lägg till anpassad text med sju typsnittsalternativ (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storlek och färg, och textkonturbredd från 0 till 10 med 0,5-stegs granularitet. Zooma från 25% till 300% i 25%-steg för detaljarbete. Ångra och gör om upp till 50 historiksteg med Ctrl+Z och Ctrl+Y — mer än dubbelt det typiska ångringsdjupet för trygg experimentering.',
      },
    ],
  },

  businessUseCases: {
    title: 'Hur du Säljer Bildsudoku Arbetsblad Online',
    cases: [
      {
        title: 'Tematiska bildsudoku-paket på Etsy',
        description:
          'Skapa tematiska sudokupussel-paket med de 104 bildsamlingarna — djursudoku, matsudoku, fordonssudoku, havssudoku och dussintals fler. Varje tema ger tillräckligt med illustrationer för att generera flera unika pussel med olika bildkombinationer och cellkonfigurationer. Paketera 15–30 sudokupussel per tema med facit inkluderade, och sälj till 30–70 SEK per paket. Blanda svårighetsnivåer inom varje paket: börja med Lätt-pussel för uppvärmning och avancera till Svårt för en komplett logikutmaningssamling. Det automatiskt genererade facit eliminerar den största tidsslösaren i pusselproduktion.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Tidiga logikarbetsböcker på Amazon KDP',
        description:
          'Sammanställ 50–100 bildsudoku-pussel till en tryckt arbetsbok formaterad för Amazon KDP. Strukturera din bok efter progressiv svårighet: Kapitel 1 använder Lätt-pussel (4 tomma) för nybörjare som lär sig rad-och-kolumn-logik, Kapitel 2 ökar till Medel (6 tomma), och Kapitel 3 utmanar med Svårt (8 tomma). Använd olika teman per kapitel eller blanda teman genomgående för visuell variation. Inkludera facit i slutet av boken. Gråskaleväxlingen producerar bläckvänliga sidor redo för svartvita interiörer, och det visuella formatet innebär att din arbetsbok tilltalar köpare världen över utan översättningskostnader.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'produktlinjeslogik och resonemangsaktiviteter för Gumroad',
        description:
          'Bygg färdiga logikresonemangs-arbetsblad med tryckta facit för produktlinjesanvändning. köpare som söker på Gumroad efter kritiskt tänkande-aktiviteter värdesätter bildsudoku eftersom det utvecklar logisk deduktion i ett format tillgängligt för tidiga användare. Skapa produktkatalogsanpassade set organiserade efter tema: bondgårdsdjur logikpussel, matgrupper resonemangsaktiviteter, samhällshjälpar problemlösningsblad. Varje set inkluderar arbetsblad på flera svårighetsnivåer och lärarfacit i både PDF- och JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Säsongsbetonade och högtidssudoku pussel-samlingar',
        description:
          'De 104 tematiska bildsamlingarna täcker varje säsongs- och högtidstillfälle — jul, halloween, påsk, alla hjärtans dag, skolstart, sommarlov och fler. Skapa tidsbegränsade sudoku pussel-samlingar som sammanfaller med toppshoppingperioder. Släpp halloweensudoku-paket i september, julsamlingar i oktober och alla hjärtans dag-paket i januari. Inkludera alla tre svårighetsnivåer i varje säsongsset för maximalt värde. Säsongsprodukter motiverar högre priser under sina toppfönster och skapar naturliga skäl till återköp genom hela året.',
        platform: 'Etsy / Amazon KDP / Gumroad (säsongsbetonat)',
      },
      {
        title: 'Global marknadsattraktionskraft med visuella pussel',
        description:
          'Bildsudoku är helt visuellt — inga ord, bokstäver eller siffror visas inom pusselrutnätet. Detta innebär att varje arbetsblad du skapar fungerar identiskt för köpare i alla länder och på alla språk. Ett enda sudokupaket betjänar engelska, tyska, franska, spanska och varje annan marknad utan modifiering. Lista samma produkt på flera Etsy-butiker eller regionala Amazon KDP-marknadsplatser utan att skapa separata språkversioner. Denna visuella fördel ökar dramatiskt din adresserbara marknad samtidigt som produktionsinsatsen förblir konstant.',
        platform: 'Globala marknadsplatser (alla plattformar)',
      },
    ],
  },

  faq: [
    {
      question: 'Hur fungerar ett 4×4 bildsudoku-pussel?',
      answer:
        'Ett 4×4 bildsudoku använder ett rutnät med 16 celler arrangerade i 4 rader och 4 kolumner. Fyra unika bilder ersätter traditionella siffror. Regeln är densamma som klassiskt sudoku: varje bild måste visas exakt en gång i varje rad och exakt en gång i varje kolumn. Vissa celler börjar fyllda med bilder (ledtrådar), och användaren fyller i de tomma cellerna genom att använda logisk eliminering — kontrollera vilken bild som saknas i varje rad och kolumn för att bestämma korrekt placering.',
    },
    {
      question: 'Varför använda bilder istället för siffror för sudoku?',
      answer:
        'Bilder gör sudoku tillgängligt för föreläsare och unga användare som inte har bemästrat siffror. Det visuella formatet engagerar användarna med färgglada tematiska illustrationer samtidigt som det utvecklar samma logiska resonemangsfärdigheter som sifferbaserat sudoku. Bildbaserade pussel är också universellt förståeliga — ingen språk- eller siffersystemkunskap krävs — vilket gör dina produkter säljbara globalt utan översättning.',
    },
    {
      question: 'Vad kontrollerar de tre svårighetsnivåerna?',
      answer:
        'Svårighet bestämmer hur många celler som lämnas tomma för användaren att lösa. Lätt tar bort 4 celler från 16-cells rutnätet, lämnar 12 ledtrådar för enkel lösning. Medel tar bort 6 celler, vilket kräver mer noggrann logisk deduktion. Svår tar bort 8 celler — exakt halva rutnätet — och kräver flerstegs resonemang. Systemet väljer slumpmässigt vilka celler som blir tomma, så att regenerera samma svårighet skapar en annorlunda pussellayout varje gång.',
    },
    {
      question: 'Varför kräver generatorn exakt 4 bilder?',
      answer:
        'Ett 4×4 sudokurutnät använder exakt 4 unika symboler — var och en förekommer 4 gånger över de 16 cellerna. Att välja färre än 4 bilder skulle lämna rutnätet ofullständigt, och att välja fler än 4 skulle bryta mot sudoku-begränsningen att varje symbol visas exakt en gång per rad och kolumn. Appen upprätthåller detta krav: temabaserat val väljer automatiskt 4 slumpmässiga bilder, och manuellt val förhindrar att lägga till en 5:e bild.',
    },
    {
      question: 'Vad är skillnaden mellan temabaserat och manuellt bildval?',
      answer:
        'Temabaserat val låter dig välja ett tema från dropdownen och systemet väljer automatiskt 4 slumpmässiga bilder från den samlingen — idealiskt för snabb pusselgenerering. Manuellt val öppnar hela Bildbiblioteket där du bläddrar bland 104 tematiska samlingar, filtrerar efter tema eller söker med nyckelord för att handplocka exakt 4 specifika bilder. Du kan också ladda upp egna bilder. Båda metoderna resulterar i exakt 4 bilder som används i pusslet.',
    },
    {
      question: 'Hur fungerar facit för bildsudoku?',
      answer:
        'Generatorn använder ett dubbelarbetsyte-system med en Arbetsbladsflik och en Facitflik. Arbetsbladet visar 4×4-rutnätet med tomma celler där användarna behöver bestämma de korrekta bilderna. Facit visar exakt samma rutnät men med alla 16 celler fyllda — varje tom cell är ifylld med rätt bild. Båda versionerna exporteras separat med fyra dedikerade knappar: sudoku_worksheet.jpeg, sudoku_worksheet.pdf, sudoku_answer_key.jpeg och sudoku_answer_key.pdf.',
    },
    {
      question: 'Vad gör rutnätsdesignen premium?',
      answer:
        'Sudokurutnätet har alternerande 2×2-blockbakgrunder i ljusblått (#F8F9FC) och ljusrosa (#FFF5F7) som hjälper användarna identifiera blockgränser. Feta mittdelare (#7C8DB5, 3px streck) separerar de fyra kvadranterna medan lättare inre linjer (#D1D9E6, 1,5px) definierar individuella celler. En indigoblå yttre ram (#667EEA) med 18px rundade hörn ramar in hela rutnätet, och tre flerskiktsade skuggor vid varierande förskjutningar lägger till professionellt djup. Bilder visas med 65% av cellstorleken för tydlig visuell separation.',
    },
    {
      question: 'Är pusslen unika varje gång jag genererar ett?',
      answer:
        'Ja. Appen blandar bilder slumpmässigt innan den fyller 4×4-rutnätet, och väljer sedan slumpmässigt vilka celler som ska bli tomma baserat på svårighetsnivån. Även med samma 4 bilder och samma svårighetsinställning producerar regenerering ett annorlunda giltigt sudokuarrangemang med olika tomma cellpositioner. Denna randomisering låter dig skapa stora samlingar av unika pussel från en liten uppsättning tematiska bilder.',
    },
    {
      question: 'Finns det en gratis provversion?',
      answer:
        'Ja. Du kan använda alla funktioner — alla tre svårighetsnivåer, temabaserat och manuellt bildval, det automatiskt genererade facit, hela bildbiblioteket, bakgrunds- och ramteman, textverktyg och alla nedladdningsformat — utan att skapa ett konto, ange kreditkort eller installera programvara. Gratis provversion-nedladdningar innehåller en liten vattenstämpel. En kommersiell licens tar bort vattenstämpeln och ger fulla försäljningsrättigheter.',
    },
    {
      question: 'Är bildsudoku arbetsblad språkkänsliga?',
      answer:
        'Nej. Bildsudoku är helt visuellt — pusselrutnätet innehåller bara bilder, inga ord eller siffror. Detta gör att varje arbetsblad fungerar identiskt på alla 11 stödda språk. Det enda lokaliserade elementet är den automatiskt genererade \"Bildsudoku\"-rubriktexten ovanför rutnätet, som översätts automatiskt när du byter språk. Pusslet i sig kräver noll modifiering för olika marknader, vilket gör det idealiskt för global försäljning.',
    },
    {
      question: 'Kan jag sälja bildsudoku arbetsblad skapade med detta verktyg på Etsy och Amazon KDP?',
      answer:
        'Ja. Med en kommersiell licens har du fulla rättigheter att sälja dina bildsudoku arbetsblad som digitala nedladdningar på Etsy, som tryckta arbetsböcker på Amazon KDP, som produktlinjesresurser på Gumroad, eller genom valfri annan försäljningskanal. De tre svårighetsnivåerna, 104 tematiska bildsamlingar och det visuella formatet ger dig de kreativa verktygen för att producera originella, globalt säljbara sudokuprodukter.',
    },
    {
      question: 'Vad är er återbetalningspolicy?',
      answer:
        'Eftersom den gratis provversionen ger dig tillgång till alla funktioner erbjuder vi inte återbetalning på köp av kommersiella licenser. Du kan testa alla tre svårighetsnivåer, temabaserat och manuellt bildval, det automatiskt genererade facit, hela bildbiblioteket, bakgrunds- och ramteman, textverktyg och alla nedladdningsformat innan du köper. Den gratis provversionen är återbetalningspolicyn — se till att verktyget passar dina behov innan du köper en licens.',
    },
    {
      question: 'Följer arbetsbladen Lgr22 (läroplanen)?',
      answer:
        'Sudoku stöder Lgr22:s centrala innehåll i matematik — logiskt tänkande, problemlösning och systematiskt resonemang. Att lösa sudoku kräver att man drar slutsatser och eliminerar möjligheter, färdigheter som är centrala i kursplanen. Justerbara svårighetsnivåer gör det enkelt att anpassa till varje årskurs.',
    },
    {
      question: 'Passar uppgifterna för förskoleklass, lågstadiet och mellanstadiet?',
      answer:
        'Ja. Med tre svårighetsnivåer och bildalternativ täcks alla åldrar. För förskoleklass (6 år) fungerar bildsudoku med 4×4-rutnät. För lågstadiet (åk 1-3) kan du använda 6×6-rutnät med bilder eller siffror. För mellanstadiet (åk 4-6) passar traditionella 9×9-sudoku med justerbar svårighetsgrad.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'saknade-bitar-arbetsblad',
      anchorText: 'Saknade Bitar Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'hitta-udda-bilden-arbetsblad',
      anchorText: 'Hitta Udda Bilden Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'bildlabyrint-arbetsblad',
      anchorText: 'Bildlabyrint Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'mattepussel-arbetsblad',
      anchorText: 'Mattepussel Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'monster-arbetsblad',
      anchorText: 'Mönster Arbetsblad Generator',
    },
    {
      pageType: 'bundle',
      slug: 'pussel-logik-paket',
      anchorText: 'Pussel och Logik Paket — Alla Pusselappar i Ett',
    },
    {
      pageType: 'guide',
      slug: 'sudoku-bocker-kdp',
      anchorText: 'Hur du Skapar och Säljer Sudokuböcker på Amazon KDP',
    },
    {
      pageType: 'guide',
      slug: 'skapa-bildsudoku',
      anchorText: 'Hur du Skapar Bildsudoku för Barn',
    },
    {
      pageType: 'idea',
      slug: 'matefakta-utskriftsbara-ideer',
      anchorText: 'Logikpussel Utskriftsbara Idéer för Arbetsblad',
    },
    {
      pageType: 'idea',
      slug: 'forsta-klass-utskriftsbara-ideer',
      anchorText: 'Första Klass Utskriftsbara Idéer för Grundutbildning',
    },
    {
      pageType: 'idea',
      slug: 'andra-klass-utskriftsbara-ideer',
      anchorText: 'Andra Klass Utskriftsbara Idéer för Växande användare',
    },
    {
      pageType: 'start',
      slug: 'amazon-kdp-aktivitetsbocker',
      anchorText: 'Publicera Aktivitetsböcker på Amazon KDP',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/swedish/sudoku/sudoku-worksheet.webp',
      primaryAlt: '4×4 bildsudoku arbetsblad med tematiska bilder i ett premiumrutnät med alternerande blockfärger och automatiskt genererad Bildsudoku-rubrik',
    },
    sampleGallery: [
      {
        src: '/samples/swedish/sudoku/sudoku-l%c3%a4tt.webp',
        alt: 'Lätt svårighet bildsudoku med 4 tomma celler och 12 fyllda celler i ett 4×4-rutnät',
        caption: 'Lätt svårighet — 4 tomma celler för nybörjare som lär sig rad-och-kolumn-logik',
      },
      {
        src: '/samples/swedish/sudoku/sudoku-sv%c3%a5r.webp',
        alt: 'Svår svårighet bildsudoku med 8 tomma celler och 8 fyllda celler i ett 4×4-rutnät',
        caption: 'Svår svårighet — 8 tomma celler som kräver flerstegs logiskt resonemang',
      },
      {
        src: '/samples/swedish/sudoku/sudoku-l%c3%a4tt%20answer-key.webp',
        alt: 'Bildsudoku facit som visar komplett fyllt 4×4-rutnät med alla 16 celler ifyllda',
        caption: 'Automatiskt genererat facit — komplett fyllt rutnät med alla bilder placerade',
      },
    ],
    youtubeId: 'bqVioFbkYbA',
    videoTitle: 'Hur du Skapar 4×4 Bildsudoku Arbetsblad med Tre Svårighetsnivåer — Steg-för-Steg Handledning',
  },
};

export default content;
