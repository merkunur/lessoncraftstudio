import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'rita på rutnät uppgift skriva ut',
    secondaryKeywords: [
      'kopiera på rutnät uppgift',
      'pixel art skriva ut',
      'spegling på rutnät',
      'rumsuppfattning uppgift',
    ],
    lsiKeywords: [
      'rutnät',
      'kopiera',
      'pixel',
      'spegling',
      'visuell logik',
    ],
    titleTag: 'Rutnätsgenerator | LessonCraftStudio',
    metaDescription: 'Skapa rita-på-rutnät uppgifter med temabilder. Automatiskt facit, utskrivbara PDF:er. Prova gratis.',
  },

  hero: {
    title: 'Rutnätsgenerator — Skapa utskrifter att sälja på Etsy och KDP',
    tagline: 'Skapa rita-på-rutnät uppgifter med temabilder och automatiskt facit — prova gratis med vattenmärke.',
    description:
      'Skapa rutnätskopplingspussel att sälja på Etsy eller sammanställa i visuella pusselböcker för Amazon KDP. En bild delas upp i plattor och köparna matchar numrerade plattor till rätt positioner. Konfigurera rutnätet från 2×2 till 4×4 och ställ in 1–5 ledtrådsceller — färre ledtrådar ger svårare pussel. Automatiskt facit med numrerade cirklar ingår. Pusslen är rent visuella — samma produkt fungerar globalt utan översättning, ett enda skapandeflöde betjänar varje marknad. Välj bland mer än 3 100 illustrationer i 104 teman. Rutnätspussel är ett populärt och unikt format som särskiljer dina produkter från vanliga arbetsblad. Den svenska marknaden på Etsy saknar denna produkttyp helt. Exportera tryckfärdiga PDF:er i Letter och A4. Kommersiell licens ingår. Gratis provversion med alla funktioner — nedladdningar innehåller en vattenstämpel; köp en licens för att ta bort den.',
  },

  ctaHeading: 'Skapa rutnätsuppgifter',

  howItWorks: {
    title: 'Hur du Skapar Rutmatchningspussel i 5 Steg',
    steps: [
      {
        title: 'Ställ in sidlayouten',
        description:
          'Öppna panelen Sidinställningar och välj en sidstorlek: Letter Stående, Letter Liggande, A4 Stående, A4 Liggande eller valfri anpassad dimension. Välj en reservfärg med färgväljaren. Välj ett bakgrundstema och justera dess opacitet (0–1 i 0,05-steg), välj sedan ett ramtema med sin egen oberoende opacitetskontroll. Dessa layoutval ramar in ditt rutnätspussel innan du konfigurerar något innehåll. Observera: Kvadratisk sidstorlek är inte tillgänglig för Rutmatchning.',
      },
      {
        title: 'Konfigurera rutnätet',
        description:
          'Öppna panelen Rutnätsalternativ och ställ in antalet rader (2–4, standard 3) och kolumner (2–4, standard 3) för ditt pusselrutnät. Ställ sedan in antalet ledtrådsceller (1–5, standard 1) — dessa är plattor som förblir synliga på arbetsbladet som tips för användarna. Ett 3×3-rutnät med 1 ledtråd skapar ett utmanande pussel med 8 plattor att matcha, medan ett 2×2-rutnät med 3 ledtrådar skapar en enkel uppvärmning med bara 1 platta att placera. Denna konfigurerbara svårighetsgrad gör det enkelt att skapa graderade pusselset.',
      },
      {
        title: 'Välj en bild',
        description:
          'Öppna panelen Bildbibliotek och bläddra bland 104 tematiska samlingar med mer än 3 100 färgglada illustrationer — djur, mat, fordon, natur, högtider och dussintals fler. Filtrera efter tema med dropdownen eller sök med nyckelord. Klicka på en bild för att välja den till ditt pussel. Den valda bildens förhandsgranskning visar ditt val innan generering. Du kan också ladda upp egna PNG-, JPG- eller GIF-bilder med panelen Ladda Upp Egna Bilder för att skapa personaliserade rutnätspussel från dina egna foton eller konstverk.',
      },
      {
        title: 'Generera rutnätspussel-arbetsbladet',
        description:
          'Klicka på Generera för att skapa rutmatchningspusslet. Appen delar upp din valda bild i det konfigurerade rutnätet, visar ledtrådscellerna med de faktiska bildplattorna synliga, och markerar återstående celler med \"?\"-platshållare. Alla plattor blandas med Fisher-Yates-randomisering och visas som en numrerad palett. Stående layouter placerar rutnätet överst med paletten nedanför; liggande layouter positionerar rutnätet till vänster med paletten till höger. En stiliserad rubrik visas med cyan bakgrund (#00BCD4), djuplila titel (#6A1B9A) och orange ramkant (#FF8C42) som visar \"Rutmatchning\" och instruktioner på det valda språket.',
      },
      {
        title: 'Generera facit och ladda ner',
        description:
          'Växla till fliken Facit för att se det automatiskt genererade facit. Det visar den kompletta, oskapade bilden med numrerade cirklar överlagrade på varje rutnätscell — gul bakgrund (#ffffe0) cirklar med svarta konturer som visar vilket palettnummer som hör hemma i varje position. Ladda ner båda versionerna med de fyra dedikerade knapparna: Arbetsblad-JPEG, Facit-JPEG, Arbetsblad-PDF och Facit-PDF med 300 DPI. Växla gråskala för bläckvänliga versioner. Varje export är produktionsklar för Etsy-annonser, Amazon KDP-interiörer och Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nyckelfunktioner i Rutmatchning Pussel Generatorn',
    features: [
      {
        title: 'Enbildsrutnätspussel med konfigurerbara rader och kolumner (2–4 × 2–4)',
        description:
          'Varje pussel börjar med en bild uppdelad i ett rutnät av plattor. Ställ in 2–4 rader och 2–4 kolumner oberoende, vilket skapar rutnät från 2×2 (4 plattor) upp till 4×4 (16 plattor). Standard 3×3-rutnätet producerar 9 plattor — en balanserad svårighetsnivå för de flesta åldrar. Mindre rutnät fungerar bra för introduktionspussel och yngre användare, medan större rutnät utmanar äldre användare och skapar premiumpussel-produkter. Till skillnad från matchningsarbetsblad med flera bilder testar rutnätspusslet rumsligt resonemang och visuell analys av en enda komplett bild.',
      },
      {
        title: 'Justerbart antal ledtrådsceller för skalbar svårighetsgrad (1–5 synliga celler)',
        description:
          'Kontrollera pusselsvårigheten genom att ställa in 1–5 ledtrådsceller som förblir synliga på arbetsbladet som tips. Med ett 3×3-rutnät och 1 ledtråd måste användarna matcha 8 blandade plattor — en genuin utmaning. Med 5 ledtrådar på samma rutnät behöver bara 4 plattor matchas — en tillgänglig uppvärmning. Denna enda kontroll förvandlar samma bild till pussel som spänner från lätt till avancerad svårighet, vilket låter dig skapa graderade pusselset från en bild och en rutnätskonfiguration. Standard är 1 ledtrådscell för maximal utmaning.',
      },
      {
        title: 'Blandad numrerad plattpalett med Fisher-Yates-randomisering',
        description:
          'Dolda plattor blandas med Fisher-Yates-algoritmen och visas i en numrerad palett bredvid rutnätet. Varje platta får ett unikt nummer som användarna refererar till när de skriver svar. Randomiseringen säkerställer att varje genererat pussel har en annorlunda plattordning, även när samma bild och rutnätsinställningar används. Detta innebär att du kan producera flera unika pusselarbetsblad från en enda bild genom att helt enkelt regenerera — värdefullt för att skapa variationspaket utan att behöva olika källbilder.',
      },
      {
        title: 'Automatiskt genererat facit med numrerade cirkelöverlägg på komplett bild',
        description:
          'Varje rutnätspussel genererar automatiskt ett medföljande facit på en separat arbetsyteflik. Facit visar den kompletta, oskapade bilden med numrerade cirklar överlagrade på varje rutnätscell — gul bakgrund (#ffffe0) cirklar med svarta konturer och svart nummertext i Fredoka-typsnitt. Varje nummer motsvarar den blandade palettordningen från arbetsbladet, och visar användare och säljare exakt vilken platta som hör var. Inget manuellt facitskapande, ingen separat fil — facit förblir perfekt synkroniserat med arbetsbladet.',
      },
      {
        title: 'Bildbibliotek med 104 tematiska samlingar och mer än 3 100 illustrationer',
        description:
          'Bläddra bland 104 tematiska bildsamlingar som täcker djur, mat, fordon, natur, yrken, högtider, sport, årstider och dussintals fler. Varje tema ger färgglada illustrationer som fungerar vackert som rutnätspusselkällbilder. Filtrera efter tema med dropdownen eller sök efter specifika bilder med nyckelord. Klicka på valfri bild för att välja den som din pusselkälla. Kommersiellt Paket inkluderar 10 färgglada teman för att komma igång; Full Access låser upp alla 104 teman för maximal kreativ variation över alla rutnätspussel-produkter.',
      },
      {
        title: 'Responsiv stående och liggande layout med automatisk ompositionering',
        description:
          'Generatorn anpassar automatiskt sin layout baserat på sidorientering. Stående sidor (höjd > bredd) placerar rutnätet överst med 45% av tillgänglig höjd med den numrerade paletten nedanför, plus en helbred rubrik (100px höjd, 15px radie). Liggande sidor (bredd > höjd) positionerar rutnätet på den vänstra halvan (48% av tillgänglig bredd) med paletten till höger, med en kompakt rubrik (70px höjd, 35px radie). Denna automatiska ompositionering säkerställer att rutnätspussel ser polerade ut på både Letter och A4 i båda orienteringarna utan manuella layoutjusteringar.',
      },
      {
        title: 'Tryckfärdig PDF- och JPEG-export med 300 DPI och gråskaleväxling',
        description:
          'Ladda ner rutnätspussel och facit som högupplösta JPEG-bilder eller tryckfärdiga PDF-dokument renderade med 300 DPI (6× multiplikator, JPEG-kvalitet 1,0). Fyra dedikerade nedladdningsknappar exporterar arbetsblad och facitfiler separat. Sidstorlekar inkluderar Letter Stående, Letter Liggande, A4 Stående, A4 Liggande och helt anpassade dimensioner. PDF-orientering detekteras automatiskt. Växla gråskala för bläckvänliga versioner som sparar toner samtidigt som rutnätsstrukturen bevaras. Varje export är produktionsklar för digitala nedladdningar, tryckta arbetsböcker och produktlinjesutdelningar.',
      },
      {
        title: 'Full arbetsyteredigering med textverktyg, justering och lagerkontroller',
        description:
          'Fabric.js-arbetsytan ger komplett kontroll över varje element på ditt rutnätspussel. Dra, ändra storlek, rotera och flytta bilder, text och genererat innehåll fritt. Lagerkontroller hanterar staplingsordning — flytta element framåt eller skicka dem bakåt. Lås färdiga element medan du redigerar andra. Lägg till anpassad text med sju typsnittsalternativ (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storlek och färg, och textkonturbredd från 0 till 10 med 0,5-stegs granularitet. Sex justeringsalternativ plus centrera-på-sidan håller layouter exakta. Zooma från 25% till 300% för detaljarbete. Ångra och gör om upp till 20 historiksteg med Ctrl+Z och Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Hur du Säljer Rutmatchningspussel Online',
    cases: [
      {
        title: 'Tematiska rutnätspussel-paket på Etsy',
        description:
          'Skapa tematiska rutnätspussel-paket med de 104 bildsamlingarna — djurrutnätspussel, fordonsrutnätspussel, högtidsbildpussel och dussintals fler. Varje tema ger tillräckligt med illustrationer för 20–30 unika pusselarbetsblad med varierande rutnätsstorlekar och ledtrådsantal. Paketera 15–25 rutnätspussel per tema med facit inkluderade, och sälj till 30–70 SEK per paket. Inkludera en blandning av lätta (2×2 med 3 ledtrådar), medel (3×3 med 2 ledtrådar) och svåra (4×4 med 1 ledtråd) pussel i varje paket för bred attraktionskraft. Det automatiskt genererade facit med numrerade överlägg eliminerar den mest tidskrävande delen av pusselskapande.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Bildpussel-arbetsböcker på Amazon KDP',
        description:
          'Sammanställ 50–100 rutmatchningspussel till en tryckt arbetsbok formaterad för Amazon KDP. Strukturera din bok efter progressiv svårighetsgrad: Kapitel 1 använder 2×2-rutnät med 3 ledtrådar för nybörjare, Kapitel 2 använder 3×3-rutnät med 2 ledtrådar för mellannivå, och Kapitel 3 använder 4×4-rutnät med 1 ledtråd för avancerade lösare. Inkludera facitsidor i slutet av boken med de automatiskt genererade numrerade cirkelöverläggen. Gråskaleväxlingen producerar bläckvänliga sidor redo för svartvita bokinteriörer. Visuella perceptionspussel-böcker presterar bra i aktivitetsbokskategorin året runt.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'produktlinjespussel-aktiviteter för Gumroad',
        description:
          'Bygg färdiga rutnätspussel-aktiviteter för snabbsluts-övningar online, morgonarbete eller berikningstationer. köpare som söker på Gumroad efter visuella perceptionsaktiviteter värdesätter pussel som anländer tryckfärdiga med facit. Skapa produktkatalogsangränsande set: djurbildpussel för naturvetenskapsenheter, landmärkespussel för samhällskunskap, matpussel för hälsa och näring. Den konfigurerbara svårighetsgraden låter dig differentiera inom en enda produkt — inkludera lätta, medel och svåra versioner av samma tematiska pussel så säljare kan tilldela efter nivå.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Säsongsbetonade rutnätspussel-samlingar',
        description:
          'De 104 tematiska bildsamlingarna täcker varje säsongs- och högtidstillfälle — jul, halloween, påsk, alla hjärtans dag, skolstart, sommarlov och fler. Skapa tidsbegränsade rutnätspussel-samlingar som sammanfaller med toppshoppingperioder. Släpp halloweenpussel-paket i september, julsamlingar i oktober och alla hjärtans dag-paket i januari. Inkludera flera rutnätsstorlekar och svårighetsnivåer i varje säsongsset för maximalt värde. Säsongsprodukter motiverar högre priser under sina toppfönster och skapar naturliga skäl till återköp.',
        platform: 'Etsy / Amazon KDP / Gumroad (säsongsbetonat)',
      },
      {
        title: 'Anpassade fotorutnätspussel för personaliserade produkter',
        description:
          'Använd funktionen Ladda Upp Egna Bilder för att skapa rutnätspussel från valfritt foto eller konstverk. Familjefotopussel blir unika personliga presenter. säljare kan ladda upp klassfoton för terminens avslutningsaktiviteter. Husdjursfotopussel, semesterfotopussel och lagfotopussel skapar alla unika produkter. Erbjud anpassat rutnätspussel-skapande som en premiumtjänst på Etsy där kunder skickar sina foton och du levererar tryckta pusselarbetsblad med facit — en högmarginal personaliserad produkt med minimal produktionstid.',
        platform: 'Etsy (personaliserade produkter)',
      },
    ],
  },

  faq: [
    {
      question: 'Vilka rutnätsstorlekar finns tillgängliga för rutmatchningspussel?',
      answer:
        'Generatorn stöder 2–4 rader och 2–4 kolumner, konfigurerade oberoende. Detta skapar rutnät från 2×2 (4 plattor) upp till 4×4 (16 plattor). Standard är 3×3 (9 plattor). Mindre rutnät är lättare och fungerar bra för yngre användare; större rutnät ökar svårighetsgraden och visuell komplexitet. Du kan ställa in rader och kolumner till olika värden — till exempel skapar 2 rader × 4 kolumner ett brett rektangulärt pussel.',
    },
    {
      question: 'Hur kontrollerar ledtrådsceller pusselsvårigheten?',
      answer:
        'Ledtrådsceller är rutnätspositioner där bildplattan förblir synlig som ett tips. Ställ in 1–5 ledtrådsceller med reglaget i panelen Rutnätsalternativ (standard är 1). Fler ledtrådar gör pusslet lättare eftersom användarna har fler referenspunkter. För ett 3×3-rutnät med 1 ledtråd måste användarna matcha 8 plattor — ganska utmanande. Med 5 ledtrådar behöver bara 4 plattor matchas — mycket mer tillgängligt. Denna enda kontroll låter dig skapa graderade svårighetsset från samma bild.',
    },
    {
      question: 'Hur fungerar rutmatchningspusslet för användarna?',
      answer:
        'Arbetsbladet visar ett rutnät där vissa celler visar den faktiska bildplattan (ledtrådsceller) och återstående celler visar \"?\"-platshållare. Under eller bredvid rutnätet visar en numrerad palett alla dolda plattor i blandad ordning. användarna granskar ledtrådscellerna, studerar de numrerade plattorna och avgör vilket nummer som hör hemma i varje tom rutnätsposition. Svaret kräver rumsligt resonemang — matchning av plattinnehåll till dess korrekta plats i den övergripande bilden.',
    },
    {
      question: 'Hur fungerar det automatiskt genererade facit?',
      answer:
        'Generatorn använder ett dubbelarbetsyte-system med en Arbetsbladsflik och en Facitflik. Facit visar den kompletta, oskapade bilden med numrerade cirklar överlagrade på varje rutnätscell. Varje cirkel har en gul bakgrund (#ffffe0) med svart kontur och visar palettnumret som hör hemma i den positionen. Numren motsvarar den blandade plattordningen från arbetsbladet, vilket gör ficitkontroll enkel. Båda versionerna exporteras separat med fyra dedikerade nedladdningsknappar.',
    },
    {
      question: 'Kan jag använda egna bilder för rutnätspussel?',
      answer:
        'Ja. Panelen Ladda Upp Egna Bilder låter dig ladda upp PNG-, JPG- eller GIF-filer från din dator. Uppladdade bilder visas i ett galleri under uppladdningsområdet. Klicka på valfri uppladdad bild för att välja den som din pusselkälla. Denna funktion är idealisk för att skapa personaliserade pussel från foton, anpassade konstverk eller varumärkesbilder. Du kan använda uppladdade bilder bredvid det inbyggda biblioteket — växla fritt mellan dem.',
    },
    {
      question: 'Hur anpassar sig layouten till stående och liggande orientering?',
      answer:
        'Generatorn detekterar automatiskt din sidorientering och ompositionerar element därefter. Stående sidor placerar rutnätet överst (med 45% av tillgänglig höjd) med den numrerade paletten nedanför och en helbred rubrik. Liggande sidor positionerar rutnätet på den vänstra halvan (48% av tillgänglig bredd) med paletten till höger och en kompakt rubrik. Detta säkerställer att rutnätspussel ser balanserade och professionella ut i båda orienteringarna utan manuella layoutjusteringar.',
    },
    {
      question: 'Kan jag generera flera unika pussel från samma bild?',
      answer:
        'Ja. Varje gång du klickar på Generera blandar appen plattorna med Fisher-Yates-randomisering, vilket producerar en annorlunda numrerad plattordning. Ledtrådscellernas positioner ändras också mellan genereringar. Detta innebär att du kan skapa flera distinkta pusselarbetsblad från en enda bild utan att ändra några inställningar — vart och ett har olika plattnummer och ledtrådspositioner, vilket gör dem till unika pusselupplevelser.',
    },
    {
      question: 'Hur fungerar svårighetsskalning över rutnätsstorlekar och ledtrådsantal?',
      answer:
        'Svårigheten beror på två faktorer: totalt antal plattor (rutnätsstorlek) och synliga ledtrådar. Ett 2×2-rutnät med 3 ledtrådar lämnar bara 1 platta att matcha — det lättaste möjliga pusslet. Ett 4×4-rutnät med 1 ledtråd kräver matchning av 15 plattor — den svåraste konfigurationen. Mellan dessa ytterligheter kan du skapa vilken svårighetsnivå som helst. För graderade arbetsböcker, börja med 2×2-rutnät (3 ledtrådar), fortsätt till 3×3 (2 ledtrådar) och avsluta med 4×4 (1 ledtråd) för en naturlig svårighetskurva.',
    },
    {
      question: 'Finns det en gratis provversion?',
      answer:
        'Ja. Du kan använda alla funktioner — alla rutnätsstorlekar, justerbara ledtrådsceller, det automatiskt genererade facit med numrerade överlägg, hela bildbiblioteket, bakgrunds- och ramteman, uppladdning av egna bilder, textverktyg och alla nedladdningsformat — utan att skapa ett konto, ange kreditkort eller installera programvara. Gratis provversion-nedladdningar innehåller en liten vattenstämpel. En kommersiell licens tar bort vattenstämpeln och ger fulla försäljningsrättigheter.',
    },
    {
      question: 'Är Rutmatchning Pussel Generatorn språkkänslig?',
      answer:
        'Nej. Rutmatchning är rent visuellt — pusselresultatet innehåller bara bildplattor och siffror, utan lokaliserat ordinnehåll på själva arbetsbladet. Appgränssnittet (menyer, knappar, rubriktext) stöder alla 11 språk, men det genererade pusslet fungerar identiskt oavsett språkval. Detta gör rutmatchningspussel universellt säljbara på alla marknader utan översättning. Kommersiellt Paket inkluderar 10 färgglada teman; Full Access låser upp alla 104 teman och alla 11 gränssnittsspråk.',
    },
    {
      question: 'Kan jag sälja rutmatchningspussel skapade med detta verktyg på Etsy och Amazon KDP?',
      answer:
        'Ja. Med en kommersiell licens har du fulla rättigheter att sälja dina rutmatchningspussel som digitala nedladdningar på Etsy, som tryckta arbetsböcker på Amazon KDP, som produktlinjesresurser på Gumroad, eller genom valfri annan försäljningskanal. De konfigurerbara rutnätsstorlekarna, justerbara ledtrådscellerna, automatiskt genererade facit och 104 tematiska bildsamlingar ger dig de kreativa verktygen för att producera originella, säljbara rutnätspussel-produkter.',
    },
    {
      question: 'Vad är er återbetalningspolicy?',
      answer:
        'Eftersom den gratis provversionen ger dig tillgång till alla funktioner erbjuder vi inte återbetalning på köp av kommersiella licenser. Du kan testa alla rutnätsstorlekar, ledtrådscellkonfigurationer, det automatiskt genererade facit med numrerade överlägg, hela bildbiblioteket, bakgrunds- och ramteman, uppladdning av egna bilder, textverktyg och alla nedladdningsformat innan du köper. Den gratis provversionen är återbetalningspolicyn — se till att verktyget passar dina behov innan du köper en licens.',
    },
    {
      question: 'Följer arbetsbladen Lgr22 (läroplanen)?',
      answer:
        'Rita-på-rutnät-uppgifter stöder Lgr22:s centrala innehåll i matematik och bild — rumsuppfattning, symmetri och visuellt tänkande. Att kopiera mönster på rutnät tränar koordination, precision och förståelse för positionering i ett koordinatsystem. Dessa är grundläggande geometriska färdigheter i kursplanen.',
    },
    {
      question: 'Passar uppgifterna för förskoleklass, lågstadiet och mellanstadiet?',
      answer:
        'Ja. Rutnätsstorlek och bildkomplexitet styr svårighetsgraden. För förskoleklass (6 år) fungerar enkla bilder på 4×4-rutnät. För lågstadiet (åk 1-3) kan du använda 6×6 till 8×8 med mer detaljerade mönster. För mellanstadiet (åk 4-6) skapar du symmetriuppgifter och komplexa figurer på 10×10-rutnät eller större.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'matchnings-arbetsblad',
      anchorText: 'Matchnings Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'skuggmatchning-arbetsblad',
      anchorText: 'Skuggmatchning Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'bildlotto-arbetsblad',
      anchorText: 'Bildlotto Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'bildsortering-arbetsblad',
      anchorText: 'Bildsortering Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'saknade-bitar-arbetsblad',
      anchorText: 'Saknade Bitar Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'hitta-foremal-arbetsblad',
      anchorText: 'Hitta Föremål Arbetsblad Generator',
    },
    {
      pageType: 'bundle',
      slug: 'matchning-sortering-paket',
      anchorText: 'Matchning och Sortering Paket — Alla Matchningsappar i Ett',
    },
    {
      pageType: 'idea',
      slug: 'forskola-utskriftsbara-ideer',
      anchorText: 'Förskola Utskriftsbara Idéer för Tidiga användare',
    },
    {
      pageType: 'idea',
      slug: 'dagis-utskriftsbara-ideer',
      anchorText: 'Dagis Utskriftsbara Idéer för unga användare',
    },
    {
      pageType: 'start',
      slug: 'utskriftsbart-foeretag-ritning',
      anchorText: 'Din Utskriftsbart Företag Ritning',
    },
    {
      pageType: 'guide',
      slug: 'skapa-matchnings-arbetsblad',
      anchorText: 'Hur du Skapar Matchning och Rutnätspussel Arbetsblad',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/swedish/grid%20match/rutnätspussel-1.webp',
      primaryAlt: 'Rutmatchning bildpussel arbetsblad med bildplattor uppdelade i ett rutnät, ledtrådsceller synliga och numrerad plattpalett för matchning',
    },
    sampleGallery: [
      {
        src: '/samples/swedish/grid%20match/rutnätspussel-2.webp',
        alt: 'Tre gånger tre rutmatchningspussel med en ledtrådscell och åtta numrerade plattor i paletten',
        caption: '3×3 rutnätspussel — en ledtrådscell synlig, åtta plattor att matcha från numrerad palett',
      },
      {
        src: '/samples/swedish/grid%20match/rutnätspussel-5.webp',
        alt: 'Fyra gånger fyra avancerat rutmatchningspussel med sexton plattor och minimala ledtrådar',
        caption: '4×4 avancerat pussel — maximal rutnätsstorlek för utmanande visuella perceptionsaktiviteter',
      },
      {
        src: '/samples/swedish/grid%20match/rutnätspussel-1-answer-key.webp',
        alt: 'Rutmatchning facit som visar komplett bild med numrerade cirklar överlagrade på varje rutnätscell',
        caption: 'Automatiskt genererat facit — numrerade cirklar visar korrekt plattplacering på komplett bild',
      },
    ],
    youtubeId: 'RGtED1Bnut8',
    videoTitle: 'Hur du Skapar Rutmatchning Bildpussel med Konfigurerbar Svårighetsgrad — Steg-för-Steg Handledning',
  },
};

export default content;
