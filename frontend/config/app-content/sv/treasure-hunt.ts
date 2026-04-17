import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'skattjakt skriva ut',
    secondaryKeywords: [
      'tipspromenad skriva ut',
      'skattjakt uppgiftsblad',
      'ledtrådar skattjakt',
      'skattjakt barn',
    ],
    lsiKeywords: [
      'skattjakt',
      'tipspromenad',
      'ledtrådar',
      'spårjakt',
      'barn',
    ],
    titleTag: 'Skattjaktsgenerator | LessonCraftStudio',
    metaDescription: 'Skapa skattjakt- och tipspromenaduppgifter med temabilder. Utskrivbara PDF:er. Prova gratis — sälj på Etsy & KDP.',
  },

  hero: {
    title: 'Skattjaktsgenerator — Skapa utskrifter att sälja på Etsy och KDP',
    tagline: 'Skapa skattjakt- och tipspromenaduppgifter med riktningsanvisningar och temabilder — prova gratis med vattenmärke.',
    description:
      'Skapa skattjaktblad att sälja på Etsy eller sammanställa i aktivitetsböcker för Amazon KDP. Köparna följer riktningsanvisningar för att hitta en gömd skatt på ett 5×5 koordinatrutnät — ett engagerande format som föräldrar och barn älskar. Grundläggande läge (upp/ner/vänster/höger) för tidiga användare, Kompass-läge (norr/söder/öster/väster) för avancerade. Generatorn är språkkänslig: samma pussel producerar autentiska riktningsanvisningar på 11 språk — \"Flytta ner 2 rutor\" på svenska, \"Move down 2 squares\" på engelska. Välj bland mer än 3 100 illustrationer i 104 teman. Automatiskt facit med markerad skattplats ingår. Skattjaktblad är unika produkter som sticker ut på Etsy. Den svenska marknaden saknar denna produkttyp helt. Kommersiell licens ingår. Gratis provversion med alla funktioner — nedladdningar innehåller en vattenstämpel; köp en licens för att ta bort den.',
  },

  ctaHeading: 'Skapa skattjakter',

  howItWorks: {
    title: 'Hur du Skapar Skattjakt Arbetsblad i 5 Steg',
    steps: [
      {
        title: 'Ställ in sidlayouten',
        description:
          'Öppna panelen Sidinställningar och välj en sidstorlek: Letter Stående, Letter Liggande, A4 Stående, A4 Liggande, Kvadrat (1200×1200) eller valfri anpassad dimension. Välj en bakgrundsfärg med färgväljaren, välj sedan ett bakgrundstema och justera dess opacitet (0–1 i 0,05-steg). Välj ett ramtema med sin egen oberoende opacitetskontroll. Dessa layoutval ramar in ditt skattjaktpussel innan du konfigurerar något innehåll.',
      },
      {
        title: 'Välj din riktningstyp',
        description:
          'I panelen Pusselkonfiguration, växla mellan två riktningsvokabulärer. Grundläggande läge använder upp, ner, vänster och höger — idealiskt för förskolebarn till och med årskurs 1 som bygger grundläggande rumslig vokabulär. Kompass-läge använder norr, söder, öster och väster — anpassat för årskurs 2 och uppåt, introducerar kompassriktningar och kartläsningsfärdigheter. Båda riktningsuppsättningarna är fullt översatta till alla 11 stödda språk, så att byta språkväljaren uppdaterar riktningsanvisningstexten på arbetsbladet.',
      },
      {
        title: 'Välj bilder för rutnätet',
        description:
          'Välj hur du vill fylla 5×5-rutnätet med 6 tematiska bilder. Generera från Tema (standard) autoäljer 6 slumpmässiga bilder från det valda temat och sprider dem över rutnätet. Manuellt Bildval låter dig bläddra bland 104 tematiska samlingar med mer än 3 100 färgglada illustrationer — djur, mat, fordon, natur, högtider och dussintals fler — och klicka för att välja exakt 6 bilder. Ladda Upp Egna Bilder låter dig lägga till egna JPEG-, PNG-, GIF- eller WebP-filer bredvid biblioteksinnehåll.',
      },
      {
        title: 'Generera skattjaktpusslet',
        description:
          'Klicka på Generera för att skapa vägfinnandepusslet på 5×5 koordinatrutnätet (A–E rader, 1–5 kolumner). Generatorn sprider dina 6 valda bilder över rutnätet, väljer en slumpmässig startcell och skapar exakt 4 riktningsrörelser som stannar inom rutnätsgränserna. Arbetsbladet visar 5 instruktionsrader: \"Börja vid [cell]\" följt av 4 \"Flytta [riktning] [antal] ruta/rutor\"-anvisningar, avslutande med \"Var är skatten?\" En skattjakttemad rubrik visas överst med blågrön bakgrund (#2C8C7C), gyllene titel (#D4A017) och lokaliserad text i Fredoka och Quicksand-typsnitt.',
      },
      {
        title: 'Visa facit och ladda ner',
        description:
          'Växla till fliken Facit för att se lösningen med den slutliga skattcellen markerad i blekgult (rgba(255, 250, 205, 0.8)) och mörkgrå kontur. Ladda ner båda versionerna med de fyra dedikerade knapparna i dropdownmenyn: Arbetsblad-JPEG, Facit-JPEG, Arbetsblad-PDF och Facit-PDF. Filer exporteras med 300 DPI för tryckfärdig kvalitet. Växla gråskala för bläckvänliga versioner. Varje export är produktionsklar för Etsy-annonser, Amazon KDP-interiörer och Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nyckelfunktioner i Skattjakt Arbetsblad Generatorn',
    features: [
      {
        title: 'Vägfinnande skattjaktpussel på ett 5×5 koordinatrutnät',
        description:
          'Generera riktningspussel på ett fast 5×5 rutnät märkt med bokstavsrader (A–E) och sifferkolumner (1–5). Varje pussel sprider 6 tematiska bilder över de 25 cellerna som visuella landmärken, och genererar sedan en slumpmässig startposition och exakt 4 sekventiella rörelser som navigerar rutnätet till ett skattmål. Det konsekventa 5-instruktionsformatet — startposition, 4 rörelser och en \"Var är skatten?\"-fråga — skapar en strukturerad vägfinnandeutmaning som bygger rumsligt resonemang och koordinatkunskap. Alla rörelser stannar inom rutnätsgränserna för giltiga, lösbara pussel varje gång.',
      },
      {
        title: 'Två riktningstyper: Grundläggande (Upp/Ner/Vänster/Höger) och Kompass (Norr/Söder/Öster/Väster)',
        description:
          'Växla mellan två riktningsvokabulärer för att matcha din målgrupp. Grundläggande läge använder upp, ner, vänster och höger — bekanta riktningsord för tidiga användare som bygger rumslig vokabulär. Kompass-läge introducerar norr, söder, öster och väster för kompassriktningsövning och kartläsningsberedskap. Båda vokabulärerna producerar samma 4-rörelses pusselstruktur på samma 5×5 rutnät, vilket låter dig skapa progressiva svårighetsset: börja med Grundläggande riktningsarbetsblad och avancera till Kompass riktningsarbetsblad med identiska teman och bilder.',
      },
      {
        title: 'Automatiskt genererat facit med markerad skattplats',
        description:
          'Varje skattjaktpussel genererar automatiskt ett medföljande facit på en separat arbetsyteflik. Facit återskapar den exakta pussellayouten och markerar den slutliga skattcellen i blekgult (rgba(255, 250, 205, 0.8)) med mörkgrå kontur, vilket gör destinationen omedelbart synlig. Ingen manuell markering, ingen separat filskapning — facit förblir perfekt synkroniserat med pusslet. Denna dubbelarbetsyte-metod sparar betydande produktionstid för säljare som skapar skattjaktpaket där varje arbetsblad behöver sitt eget facit.',
      },
      {
        title: 'Fullt lokaliserade riktningsanvisningar på 11 språk',
        description:
          'All riktningsinstruktionstext är fullt översatt till 11 stödda språk: engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, svenska, danska, norska och finska. Grundläggande riktningar (upp/ner/vänster/höger) och Kompass-riktningar (norr/söder/öster/väster) är båda lokaliserade, tillsammans med \"Börja vid\"-instruktionen, \"Flytta\"-verbet, \"ruta/rutor\"-enheten och \"Var är skatten?\"-frågan. Att byta språkväljaren uppdaterar hela arbetsbladets text, vilket producerar autentiska riktningspussel på modersmålet snarare än enbart engelskt innehåll med översatta titlar.',
      },
      {
        title: 'Bildbibliotek med 104 tematiska samlingar och mer än 3 100 illustrationer',
        description:
          'Bläddra bland 104 tematiska bildsamlingar som täcker djur, mat, fordon, natur, yrken, högtider, sport, årstider och dussintals fler. Varje tema ger en koordinerad uppsättning färgglada illustrationer som fyller 5×5-rutnätet som visuella landmärken. Filtrera efter tema med dropdownen eller sök efter specifika bilder med nyckelord. Klicka på valfri bild för att lägga till den i ditt pussel. Kommersiellt Paket inkluderar 10 färgglada teman för att komma igång; Full Access låser upp alla 104 teman för maximal kreativ variation över alla skattjaktpussel.',
      },
      {
        title: 'Skattjakttemad automatiskt genererad rubrik med gyllene titel på 11 språk',
        description:
          'Varje genererat arbetsblad inkluderar en skattjakttemad rubrik med blågrön bakgrund (#2C8C7C), bärnstensfärgad yttre ram (#D4A574), sandfärgad beige inre ram (#F4E4C1) och gyllene titel (#D4A017) renderad i Fredoka-typsnitt (vikt 700, adaptiv 36–48px storlek). Beskrivningstexten visas i mörkbrun (#5C4033) med Quicksand (vikt 500). Stående arbetsblad visar en full rubrik (100px höjd); liggande arbetsblad använder en kompakt layout (70px höjd). Titeln \"Skattjakt\" och beskrivningen \"Följ ledtrådarna och hitta skatten!\" översätts automatiskt till alla 11 stödda språk.',
      },
      {
        title: 'Bakgrunds- och ramteman med oberoende opacitetskontroller',
        description:
          'Panelen Sidinställningar inkluderar både en bakgrundstema-väljare med ett opacitetsreglage (0–1 i 0,05-steg) och en ramtema-väljare med sitt eget oberoende opacitetsreglage. Bakgrundsteman lägger till dekorativa mönster bakom koordinatrutnätet och riktningsanvisningarna, medan ramteman ramar in sidan. Båda har separata opacitetskontroller så du kan skapa subtila bakgrunder med framträdande ramar, eller valfri kombination som passar din design. Dessa visuella element ökar den upplevda kvaliteten på dina skattjaktarbetsblad för marknadsplatsannonser.',
      },
      {
        title: 'Tryckfärdig PDF- och JPEG-export med 300 DPI och gråskaleväxling',
        description:
          'Ladda ner skattjaktpussel och facit som högupplösta JPEG-bilder eller tryckfärdiga PDF-dokument renderade med 300 DPI (6× JPEG-multiplikator, 3× PDF-multiplikator). Fyra dedikerade nedladdningsknappar i dropdownmenyn exporterar worksheet.jpeg, answer_key.jpeg, worksheet.pdf och answer_key.pdf separat. Sidstorlekar inkluderar Letter Stående, Letter Liggande, A4 Stående, A4 Liggande, Kvadrat (1200×1200) och helt anpassade dimensioner. Växla gråskala för bläckvänliga versioner som sparar toner. Varje export är produktionsklar för digitala nedladdningar, tryckta arbetsböcker och produktlinjesutdelningar.',
      },
    ],
  },

  businessUseCases: {
    title: 'Hur du Säljer Skattjakt Arbetsblad Online',
    cases: [
      {
        title: 'Tematiska skattjaktpaket på Etsy',
        description:
          'Skapa tematiska skattjaktpaket med de 104 bildsamlingarna — djurskattjakter, havsskattjakter, rymdskattjakter, högtidsskattjakter och dussintals fler. Varje tema ger tillräckligt med illustrationer för flera unika pussel eftersom generatorn slumpmässigt väljer 6 bilder och skapar unika startpositioner och rörelsesekvenser per generering. Paketera 10–20 skattjaktarbetsblad per tema med facit inkluderade, och sälj till 30–70 SEK per paket. Blanda Grundläggande och Kompass-riktningstyper inom ett enda paket för progressiv svårighet.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Riktningsfärdighets-arbetsböcker på Amazon KDP',
        description:
          'Sammanställ 40–80 skattjaktarbetsblad till en tryckt arbetsbok formaterad för Amazon KDP. Strukturera kapitel efter progression: Kapitel 1 använder Grundläggande riktningar (upp/ner/vänster/höger) för grundläggande rumslig vokabulär, Kapitel 2 introducerar Kompass-riktningar (norr/söder/öster/väster) för kompassläsningsberedskap. Organisera teman genom sektioner — djur, fordon, natur, högtider — med facit i slutet. Gråskaleväxlingen producerar bläckvänliga sidor redo för svartvita bokinteriörer. Riktningsbaserade vägfinnande-arbetsböcker fyller en unik nisch på aktivitetsboksmarknaden.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Flerspråkiga skattjaktset med lokaliserade riktningar',
        description:
          'Utnyttja de fullt lokaliserade riktningsanvisningarna för att skapa skattjaktarbetsblad på 11 språk. Samma pusselstruktur producerar autentiskt modersmålsinnehåll när du byter språk — riktningar, instruktioner och bildetiketter uppdateras alla automatiskt. Skapa flerspråkiga skattjaktpaket där varje språkversion använder samma tematiska bilder men lokaliserad riktningstext. Detta är värdefullt för ESL/EFL-produktlinje som undervisar riktningsvokabulär, tvåspråkiga familjer och internationella hemundervisningsprogram. Sälj språkspecifika set eller flerspråkiga megapaket till premiumpriser.',
        platform: 'Etsy / Gumroad (flerspråkig marknad)',
      },
      {
        title: 'Koordinatrutnät aktivitetspaket för Gumroad',
        description:
          'Bygg färdiga koordinatrutnätsaktiviteter som lär ut rumsligt resonemang och kartfärdigheter. 5×5 bokstavs-sifferrutnätet (A–E rader, 1–5 kolumner) introducerar användare till koordinatsystem som används i geografi, matematik och vetenskap. köpare som söker på Gumroad efter koordinatrutnätsaktiviteter värdesätter arbetsblad med tydliga visuella rutnät, sekventiella instruktioner och tryckta facit. Skapa produktkatalogsanpassade set: para Grundläggande riktningsskattjakter med Kompass-riktningsversioner för nivågrupperade produktpaket. Varje set inkluderar arbetsblad och facit i både PDF- och JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Säsongsbetonade skattjaktsamlingar',
        description:
          'De 104 tematiska bildsamlingarna täcker varje säsongs- och högtidstillfälle — jul, halloween, påsk, alla hjärtans dag, skolstart, sommarlov och fler. Skapa tidsbegränsade skattjaktsamlingar som sammanfaller med toppshoppingperioder. Släpp halloweenskattjakter i september, julsamlingar i oktober och alla hjärtans dag-paket i januari. Inkludera både Grundläggande och Kompass-riktningstyper i varje säsongsset för maximalt värde. Säsongsprodukter motiverar högre priser under sina toppfönster och skapar naturliga skäl till återköp.',
        platform: 'Etsy / Amazon KDP / Gumroad (säsongsbetonat)',
      },
    ],
  },

  faq: [
    {
      question: 'Vad är ett skattjaktarbetsblad och hur fungerar pusslet?',
      answer:
        'Ett skattjaktarbetsblad är ett vägfinnandepussel på ett 5×5 koordinatrutnät märkt med bokstavsrader (A–E) och sifferkolumner (1–5). Sex tematiska bilder sprids över rutnätet som visuella landmärken. Arbetsbladet ger 5 instruktionsrader: en startposition (t.ex. \"Börja vid A3\"), exakt 4 riktningsrörelser (t.ex. \"Flytta ner 2 rutor\"), och en slutfråga \"Var är skatten?\" användarna följer de sekventiella anvisningarna på rutnätet för att avgöra vilken cell som innehåller skatten.',
    },
    {
      question: 'Hur fungerar 5×5 koordinatrutnätet?',
      answer:
        'Rutnätet består av 25 celler arrangerade i 5 rader (märkta A till E) och 5 kolumner (märkta 1 till 5). Varje cell identifieras av en bokstavs-sifferkoordinat som A1, B3 eller E5. Sex tematiska bilder upptar 6 av de 25 cellerna som visuella landmärken. Startpositionen och alla 4 rörelser stannar inom rutnätsgränserna (rader A–E, kolumner 1–5), vilket säkerställer att varje pussel är lösbart. Detta bokstavs-sifferkoordinatsystem introducerar användare till rutnätsreferensfärdigheter som används i kartor, diagram och matematik.',
    },
    {
      question: 'Vilka är de två riktningstyper och hur skiljer de sig?',
      answer:
        'Grundläggande läge använder upp, ner, vänster och höger — bekanta riktningsord för förskolebarn till och med årskurs 1 som bygger grundläggande rumslig vokabulär. Kompass-läge använder norr, söder, öster och väster — kompassriktningar anpassade för årskurs 2 och uppåt. Båda lägena genererar samma 4-rörelses pusselstruktur på samma 5×5 rutnät. Riktningstypsväxlingen låter dig skapa progressiv svårighet: börja med Grundläggande riktningsarbetsblad och avancera till Kompass riktningsarbetsblad med identiska teman.',
    },
    {
      question: 'Varför har varje pussel exakt 4 rörelser?',
      answer:
        'Den konsekventa 4-rörelsestrukturen skapar ett standardiserat pusselformat som fungerar tillförlitligt på 5×5-rutnätet. Fyra rörelser ger tillräcklig komplexitet för meningsfull vägfinnande utan att överväldiga yngre användare. Varje pussel följer samma 5-rads instruktionsformat: startposition, 4 sekventiella rörelser och \"Var är skatten?\"-frågan. Denna konsekvens gör skattjaktarbetsblad förutsägbara för användare och enkla att paketera i strukturerade aktivitetsset för säljare.',
    },
    {
      question: 'Hur används de 6 bilderna i pusslet?',
      answer:
        'Sex tematiska bilder sprids över de 25 cellerna i 5×5-rutnätet som visuella landmärken. De gör rutnätet visuellt engagerande och hjälper användarna orientera sig medan de följer riktningsanvisningar. Du kan fylla rutnätet med tre metoder: Generera från Tema (standard) autoäljer 6 slumpmässiga bilder från det valda temat, Manuellt Bildval låter dig bläddra i biblioteket och klicka för att välja exakt 6 bilder, och Ladda Upp Egna Bilder låter dig lägga till egna JPEG-, PNG-, GIF- eller WebP-filer.',
    },
    {
      question: 'Är Skattjakt Generatorn språkkänslig?',
      answer:
        'Ja. Skattjakt Generatorn är språkkänslig på två sätt. Först är all riktningsanvisningstext — startinstruktioner, rörelseriktningar (Grundläggande och Kompass), rutaenheter och skattfrågan — fullt översatt till det valda språket på alla 11 stödda språk. Dessutom uppdateras bildinnehåll laddat från biblioteket baserat på vald lokal. Att byta språk producerar autentiska skattjaktarbetsblad på modersmålet med lokaliserade riktningar och bilder. Kommersiellt Paket inkluderar 10 färgglada teman; Full Access låser upp alla 104 teman och alla 11 språk.',
    },
    {
      question: 'Hur lokaliseras riktningsanvisningarna?',
      answer:
        'All riktningsvokabulär är översatt till 11 språk: engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, svenska, danska, norska och finska. Grundläggande riktningar (upp/ner/vänster/höger) och Kompass-riktningar (norr/söder/öster/väster) har båda kompletta översättningar, tillsammans med \"Börja vid\"-instruktionen, \"Flytta\"-verbet, \"ruta/rutor\"-enheten och \"Var är skatten?\"-frågan. Till exempel, på svenska i Grundläggande läge skrivs anvisningen \"Flytta ner 2 rutor\" med inhemskt riktningsvokabulär. Rubrikens titel och beskrivning översätts också automatiskt.',
    },
    {
      question: 'Hur fungerar det automatiskt genererade facit?',
      answer:
        'Generatorn använder ett dubbelarbetsyte-system med en Arbetsbladsflik och en Facitflik, var och en med separata ångra/gör om-stackar. Arbetsbladet visar 5×5-rutnätet med spridda bilder och riktningsanvisningar — redo för användarna att följa. Facit återskapar den identiska layouten och markerar den slutliga skattcellen i blekgult (rgba(255, 250, 205, 0.8)) med mörkgrå kontur, vilket gör destinationen omedelbart synlig. Båda versionerna exporteras separat med fyra dedikerade nedladdningsknappar: worksheet.jpeg, answer_key.jpeg, worksheet.pdf och answer_key.pdf.',
    },
    {
      question: 'Finns det en gratis provversion?',
      answer:
        'Ja. Du kan använda alla funktioner — båda riktningstyper, 5×5 koordinatrutnätet, 6-bilds pusselgenerering, det automatiskt genererade facit, hela bildbiblioteket, bakgrunds- och ramteman, alla nedladdningsformat och gråskaleväxling — utan att skapa ett konto, ange kreditkort eller installera programvara. Gratis provversion-nedladdningar innehåller en liten vattenstämpel. En kommersiell licens tar bort vattenstämpeln och ger fulla försäljningsrättigheter.',
    },
    {
      question: 'Kan jag lägga till bakgrundsteman och ramteman på skattjaktarbetsblad?',
      answer:
        'Ja. Panelen Sidinställningar inkluderar både en bakgrundstema-väljare med ett opacitetsreglage (0–1 i 0,05-steg) och en ramtema-väljare med sitt eget oberoende opacitetsreglage. Bakgrundsteman lägger till dekorativa mönster bakom koordinatrutnätet och riktningsinstruktionerna, medan ramteman ramar in sidan. Båda har separata opacitetskontroller så du kan skapa subtila bakgrunder med framträdande ramar, eller valfri kombination som passar din design. Dessa visuella element ökar den upplevda kvaliteten på dina skattjaktarbetsblad för marknadsplatsannonser.',
    },
    {
      question: 'Vad är er återbetalningspolicy?',
      answer:
        'Eftersom den gratis provversionen ger dig tillgång till alla funktioner erbjuder vi inte återbetalning på köp av kommersiella licenser. Du kan testa båda riktningstyper, 5×5 koordinatrutnätet, 6-bilds pusselgenerering, det automatiskt genererade facit, hela bildbiblioteket, bakgrunds- och ramteman och alla nedladdningsformat innan du köper. Den gratis provversionen är återbetalningspolicyn — se till att verktyget passar dina behov innan du köper en licens.',
    },
    {
      question: 'Följer arbetsbladen Lgr22 (läroplanen)?',
      answer:
        'Skattjakt stöder Lgr22:s centrala innehåll genom att kombinera läsförståelse, problemlösning och orientering. Att följa ledtrådar och navigera mellan stationer tränar logiskt tänkande och samarbete. Formatet är perfekt för tipspromenader — en unikt svensk tradition vid skolavslutningar och föreningsfester. Du väljer teman och frågor.',
    },
    {
      question: 'Passar uppgifterna för förskoleklass, lågstadiet och mellanstadiet?',
      answer:
        'Ja. Skattjaktsformatet fungerar för alla åldrar. För förskoleklass (6 år) skapar du enkla bildbaserade ledtrådar. För lågstadiet (åk 1-3) kan du använda textbaserade frågor och enkel orientering. För mellanstadiet (åk 4-6) passar mer komplexa ledtrådar med koordinater och logiska gåtor. Tipspromenadsformatet är populärt från förskola till vuxna.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'hitta-och-rakna-arbetsblad',
      anchorText: 'Hitta och Räkna Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'hitta-foremal-arbetsblad',
      anchorText: 'Hitta Föremål Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'bildkorsord-arbetsblad',
      anchorText: 'Bildkorsord Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'bildlabyrint-arbetsblad',
      anchorText: 'Bildväg Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'prepositioner-arbetsblad',
      anchorText: 'Prepositioner Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'mattepussel-arbetsblad',
      anchorText: 'Mattepussel Arbetsblad Generator',
    },
    {
      pageType: 'bundle',
      slug: 'sok-hitta-paket',
      anchorText: 'Sök och Hitta Paket — Alla Sökappar i Ett',
    },
    {
      pageType: 'guide',
      slug: 'skapa-skattjakt-arbetsblad',
      anchorText: 'Hur du Skapar Skattjakt Arbetsblad som Säljer',
    },
    {
      pageType: 'idea',
      slug: 'camping-utskriftsbara-ideer',
      anchorText: 'Camping Utskriftsbara Idéer för Utomhuslärande',
    },
    {
      pageType: 'idea',
      slug: 'havsdjur-utskriftsbara-ideer',
      anchorText: 'Havsdjur Utskriftsbara Idéer för Marina Teman',
    },
    {
      pageType: 'start',
      slug: 'marknadsforing-utskriftsbart-foeretag',
      anchorText: 'Marknadsföring av Ditt Utskriftsbart Företag',
    },
    {
      pageType: 'tool',
      slug: 'treasure-hunt-worksheet-maker',
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
      primary: '/samples/swedish/treasure%20hunt/skattjakt-1.webp',
      primaryAlt: 'Skattjakt vägfinnande arbetsblad med 5 gånger 5 koordinatrutnät, spridda bilder, riktningsanvisningar och skattjakttemad rubrik',
    },
    sampleGallery: [
      {
        src: '/samples/swedish/treasure%20hunt/skattjakt-2.webp',
        alt: 'Skattjaktpussel arbetsblad med 6 tematiska bilder på ett 5 gånger 5 rutnät och Grundläggande riktningsanvisningar',
        caption: 'Grundläggande riktningsläge — följ upp, ner, vänster och höger anvisningar för att hitta skatten',
      },
      {
        src: '/samples/swedish/treasure%20hunt/skattjakt-4.webp',
        alt: 'Skattjaktpussel arbetsblad med Kompass-riktningsanvisningar med norr, söder, öster och väster',
        caption: 'Kompass-riktningsläge — kompassriktningar för avancerat rumsligt resonemang',
      },
      {
        src: '/samples/swedish/treasure%20hunt/skattjakt-1-answer-key.webp',
        alt: 'Skattjakt facit med slutlig skattcell markerad i blekgult på koordinatrutnätet',
        caption: 'Automatiskt genererat facit — blekgul markering visar skattens destination',
      },
    ],
    youtubeId: 'flHiBXsYLLA',
    videoTitle: 'Hur du Skapar Skattjakt Vägfinnande Arbetsblad med Riktningsanvisningar och Automatiska Facit — Steg-för-Steg Handledning',
  },
};

export default content;
