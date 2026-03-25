import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'saknade bitar pussel generator',
    secondaryKeywords: [
      'utskrivbar pusselspel skapare för Etsy-säljare',
      'saknade bitar arbetsblad generator för KDP-publicerare',
      'visuellt pussel skapare kommersiell licens Gumroad',
      'sälja saknade bitar arbetsblad på Gumroad',
    ],
    lsiKeywords: [
      'digitala pussel utskriftsbara produkter onlineföretag',
      'kommersiellt bruk visuellt pussel generator',
      'utskrivbar pusselaktivitet affärsverktyg',
    ],
    titleTag: 'Saknade Bitar Generator | Skapa Visuella Pussel',
    metaDescription:
      'Skapa saknade bitar-pussel att sälja på Etsy, KDP och Gumroad. 6 bitformer, konfigurerbar svårighet, automatiskt facit, 104 teman. Gratis provversion med vattenstämpel.',
  },

  hero: {
    title: 'Saknade Bitar Pussel Generator för Pusselliknande Visuella Pussel',
    tagline: 'Generera pusselliknande pussel där bitar klipps ut från bilder och användarna identifierar rätt numrerat alternativ — med 6 bitformer, 1–5 saknade bitar, 2–6 lösningsalternativ inklusive distraktorer, automatiskt genererade facit och visuell design som fungerar på alla språk.',
    description:
      'Bygg professionella saknade bitar-pussel där en bild har hål utklippta och användarna identifierar vilket numrerat alternativ som fyller varje lucka. Den smarta bitextraktions-algoritmen hittar visuellt distinkta områden med tillräcklig färgvarians, vilket säkerställer att varje pussel är lösbart och engagerande. Välj bland 6 bitformer — fyrkant, cirkel, rektangel stående, rektangel liggande, ellips stående och ellips liggande — och konfigurera svårighetsgraden med 1–5 saknade bitar och 2–6 lösningsalternativ som inkluderar distraktorbitar för att utmana visuell diskrimineringsförmåga. Varje pussel inkluderar ett automatiskt genererat facit med gulmarkerade nummertiketter placerade inuti varje hål som visar det korrekta alternativet. Den automatiskt genererade rubriken renderar «Saknade bitar» i turkos (#06B6D4) med en rosarosa beskrivning (#DB2777) över ett dubbelt ramsystem — blågrön yttre (#14B8A6, 8px) och het rosa inre (#EC4899, 3px) — lokaliserad på alla 11 stödda språk. Saknade Bitar är INTE språkkänsligt: pusslen är rent visuella utan lokalberoende innehåll, så varje pussel fungerar identiskt över hela världen. Samma pussel kan säljas globalt utan översättning — ett enda skapandeflöde betjänar varje marknad. Full Access låser upp alla 104 teman med mer än 3 100 illustrationer och alla 11 gränssnittsspråk. Lägg till bakgrundsteman och ramteman med oberoende opacitetskontroller, och exportera tryckfärdiga PDF:er och JPEG-bilder med 300 DPI i Letter, A4, Kvadrat eller anpassade storlekar. Kommersiellt Paket inkluderar 10 färgglada teman; Full Access låser upp alla 104 teman för maximal kreativ variation. Oavsett om du säljer visuella pusselpaket på Etsy, sammanställer pusselarbetsböcker för Amazon KDP eller skapar kritiskt tänkande-aktiviteter för Gumroad — denna generator levererar produktionsfärdiga pussel på några minuter. Gratis provversion med alla funktioner — ingen registrering, inget kreditkort. Nedladdningar innehåller en vattenstämpel; köp en licens för att ta bort den.',
  },

  howItWorks: {
    title: 'Hur du Skapar Saknade Bitar-Pussel i 5 Steg',
    steps: [
      {
        title: 'Ställ in sidlayouten',
        description:
          'Öppna panelen Sidinställningar och välj en sidstorlek: Letter Stående, Letter Liggande, A4 Stående, A4 Liggande, Kvadrat (1200×1200) eller valfri anpassad dimension. Välj en sidfärg med färgväljaren som reservbakgrund. Välj ett bakgrundstema och justera dess opacitet (0–1 i 0,05-steg), välj sedan ett ramtema med sin egen oberoende opacitetskontroll. Dessa layoutval ramar in ditt saknade bitar-pussel innan du konfigurerar något innehåll.',
      },
      {
        title: 'Konfigurera pusslet',
        description:
          'Öppna panelen Pusselkonfiguration och ställ in antalet saknade bitar från 1 till 5 — detta kontrollerar hur många hål som klipps ut från bilden. Ställ in antalet lösningsalternativ från 2 till 6, vilket inkluderar de korrekta bitarna plus distraktorbitar som ökar svårighetsgraden. Välj en bitform bland 6 alternativ: fyrkant (standard), cirkel, rektangel stående, rektangel liggande, ellips stående eller ellips liggande. Varje form skapar en annorlunda visuell utmaning.',
      },
      {
        title: 'Välj en bild från biblioteket eller ladda upp en egen',
        description:
          'Öppna panelen Bildbibliotek och bläddra bland 104 tematiska samlingar med mer än 3 100 färgglada illustrationer — djur, mat, fordon, natur, högtider och dussintals fler. Filtrera efter tema med dropdownen eller sök med nyckelord med 300ms fördröjning. Klicka på en bild för att välja den som källa för ditt pussel. Du kan också ladda upp egna PNG-, JPG- eller GIF-bilder med panelen Ladda Upp Egna Bilder för fullständig kreativ frihet med dina pusseldesigner.',
      },
      {
        title: 'Generera pusslet',
        description:
          'Appen klipper automatiskt ut hål från den valda bilden med smart bitextraktion. Algoritmen försöker upp till 150 placeringsförsök för att hitta bitar med tillräcklig färgvarians (minsta ljusstyrkavarians på 15) och minst 250 pixlars avstånd mellan bitar för att förhindra överlappning. Vita hål med svart kontur (2px) visas på de ursprungliga platserna. Numrerade lösningsalternativ — korrekta bitar plus distraktorer — visas med gulmarkerade nummertiketter. Stående layouter placerar pusselbilden överst med alternativen nedanför; liggande layouter delar vyn 50/50.',
      },
      {
        title: 'Generera facit och ladda ner',
        description:
          'Växla till fliken Facit för att se det automatiskt genererade facit. Samma pusselbild visas med hål, och gulmarkerade nummertiketter (rgba(255,255,0,0.7)) inuti varje hål visar det korrekta alternativindexet. Ladda ner båda versionerna med fyra dedikerade knappar: Arbetsblad-JPEG, Facit-JPEG, Arbetsblad-PDF och Facit-PDF — alla renderade med 300 DPI och JPEG-kvalitet 1,0. Växla gråskala för bläckvänliga versioner. Varje export är produktionsklar för Etsy-annonser, Amazon KDP-interiörer och Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nyckelfunktioner i Saknade Bitar Pussel Generatorn',
    features: [
      {
        title: 'Pusselliknande saknade bitar-pussel med konfigurerbar svårighet',
        description:
          'Skapa pussel där en bild har hål utklippta och användarna identifierar vilket numrerat alternativ som fyller varje lucka. Konfigurera svårighetsgraden med två oberoende kontroller: ställ in 1–5 saknade bitar för att kontrollera pusselkomplexiteten, och ställ in 2–6 lösningsalternativ för att kontrollera hur många val användarna utvärderar. Fler saknade bitar innebär mer rumsligt resonemang; fler lösningsalternativ (inklusive distraktorer) innebär skarpare visuell diskriminering. Detta tvåaxliga svårighetssystem låter dig skapa pussel som sträcker sig från enkel enbitarsidentifiering till komplexa flerbitarsutmaningar.',
      },
      {
        title: 'Sex bitformer: Fyrkant, Cirkel, Rektangel och Ellipsvarianter',
        description:
          'Välj bland 6 distinkta bitformer som ändrar den visuella karaktären på varje pussel. Fyrkant (standard) och cirkel erbjuder rena geometriska klipp. Rektangel stående och rektangel liggande skapar avlånga hål med olika orienteringar — stående använder 80% bredd och 100% höjd, liggande använder 100% bredd och 80% höjd. Ellips stående och ellips liggande erbjuder mjukare kurvade klipp med samma dimensionsförhållanden. Varje form interagerar annorlunda med källbilden, vilket skapar unika identifieringsutmaningar även när samma underliggande illustration används.',
      },
      {
        title: 'Smart bitextraktion med färgvariansdetektering',
        description:
          'Bitextraktions-algoritmen säkerställer att varje pussel är visuellt lösbart och engagerande. Den försöker upp till 150 placeringsförsök för att hitta bitar med en minsta ljusstyrkavarians-tröskel på 15 — vilket garanterar att varje extraherad bit innehåller tillräckligt med visuell detalj för att vara identifierbar. Bitar bibehåller minst 250 pixlars avstånd från varandra för att förhindra överlappning. Distraktorbitar genereras med upp till 200 försök vardera, vilket säkerställer att de kommer från icke-överlappande områden av bilden. Denna smarta extraktion producerar konsekvent högkvalitativa pussel från valfri källbild.',
      },
      {
        title: 'Automatiskt genererat facit med gulmarkerade nummertiketter',
        description:
          'Varje saknade bitar-pussel genererar automatiskt ett medföljande facit på en separat arbetsyteflik. Facit visar samma pusselbild med hål, och placerar gulmarkerade nummertiketter (rgba(255,255,0,0.7)) inuti varje hål som visar det korrekta 1-baserade alternativindexet. Teckenstorleken skalas till 60% av bitstorleken för tydlig läsbarhet. Inget manuellt facitskapande behövs — facit förblir perfekt synkroniserat med pusslet. Ladda ner facit som answer_key.jpeg eller answer_key.pdf bredvid arbetsbladet.',
      },
      {
        title: 'Numrerade lösningsalternativ med distraktorbitar',
        description:
          'Lösningsalternativ visas i numrerade containrar (1–N) med gulmarkerade nummertiketter för tydlig identifiering. När lösningsalternativ överstiger antalet saknade bitar är de extra alternativen distraktorbitar — extraherade från olika områden av samma bild som inte matchar något hål. Distraktorer tvingar användarna att noggrant jämföra visuella detaljer istället för att helt enkelt matcha genom eliminering. Stående arbetsblad arrangerar alternativ i en enda horisontell rad under pusslet (75% av maxstorlek); liggande arbetsblad placerar dem på höger sida (50% bredd) i en horisontell rad.',
      },
      {
        title: 'Bildbibliotek med 104 tematiska samlingar och mer än 3 100 illustrationer',
        description:
          'Bläddra bland 104 tematiska bildsamlingar som täcker djur, mat, fordon, natur, yrken, högtider, sport, årstider och dussintals fler. Varje tema ger färgglada illustrationer som fungerar som pusselkällor — bilder med varierade färger och distinkta regioner producerar de mest engagerande saknade bitar-pusslen. Filtrera efter tema med dropdownen eller sök efter specifika bilder med nyckelord. Kommersiellt Paket inkluderar 10 färgglada teman för att komma igång; Full Access låser upp alla 104 teman för maximal kreativ variation över alla pusseldesigner.',
      },
      {
        title: 'Tryckfärdig PDF- och JPEG-export med 300 DPI och gråskaleväxling',
        description:
          'Ladda ner saknade bitar-pussel och facit som högupplösta JPEG-bilder eller tryckfärdiga PDF-dokument renderade med 300 DPI (6× multiplikator) med JPEG-kvalitet 1,0. Fyra dedikerade nedladdningsknappar exporterar arbetsblad och facitfiler separat. Sidstorlekar inkluderar Letter Stående, Letter Liggande, A4 Stående, A4 Liggande, Kvadrat (1200×1200) och helt anpassade dimensioner. Växla gråskala för bläckvänliga versioner som sparar toner. Varje export är produktionsklar för digitala nedladdningar, tryckta arbetsböcker och produktlinjesutdelningar.',
      },
      {
        title: 'Full arbetsyteredigering med textverktyg, justering och lagerkontroller',
        description:
          'Fabric.js-arbetsytan ger komplett kontroll över varje element på ditt pusselarbetsblad. Dra, ändra storlek, rotera och flytta bilder, text och genererat innehåll fritt. Lagerkontroller hanterar staplingsordning — flytta element framåt eller skicka dem bakåt. Lås färdiga element medan du redigerar andra. Lägg till anpassad text med sju typsnittsalternativ (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storlek och färg, och textkonturbredd från 0 till 10 med 0,5-stegs granularitet. Sex justeringsalternativ plus centrera-på-sidan håller layouter exakta. Zooma från 25% till 300% i 25%-steg för detaljarbete. Ångra och gör om upp till 50 historiksteg med Ctrl+Z och Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Hur du Säljer Saknade Bitar-Pussel Online',
    cases: [
      {
        title: 'Tematiska saknade bitar pusselpaket på Etsy',
        description:
          'Skapa tematiska pusselpaket med de 104 bildsamlingarna — djurpussel, fordonspussel, matpussel, naturpussel och dussintals fler. Varje tema ger färgglada illustrationer som producerar engagerande saknade bitar-utmaningar. Paketera 15–25 pussel per tema med facit inkluderade, med varierande svårighet från 1 saknad bit med 2 alternativ (lätt) till 5 saknade bitar med 6 alternativ (svårt). Blanda bitformer inom ett paket för visuell variation: fyrkantiga bitar i vissa pussel, cirkulära bitar i andra, ellipsvarianter för avancerade utmaningar. Det automatiskt genererade facit eliminerar den största tidsslösaren i pusselproduktion.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Visuella pusselarbetsböcker på Amazon KDP',
        description:
          'Sammanställ 50–100 saknade bitar-pussel till en tryckt arbetsbok formaterad för Amazon KDP. Strukturera din bok med progressiv svårighet: Kapitel 1 använder 1 saknad bit med 2 alternativ för nybörjare, Kapitel 2 använder 3 saknade bitar med 4 alternativ för mellannivå, och Kapitel 3 använder 5 saknade bitar med 6 alternativ inklusive distraktorer för avancerade lösare. Inkludera facit i slutet av boken med den automatiskt genererade facitfunktionen. Gråskaleväxlingen producerar bläckvänliga sidor redo för svartvita bokinteriörer. Visuella pussel kräver ingen översättning, vilket gör en enda bok säljbar på varje marknad.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'produktlinjespussel-aktiviteter för Gumroad',
        description:
          'Bygg färdiga visuella diskriminerings- och kritiskt tänkande-aktiviteter för Gumroad. Saknade bitar-pussel stärker rumsligt resonemang, visuell analys och uppmärksamhet på detaljer — färdigheter som värderas genom hela förskole- och grundskoleproduktkataloger. Skapa produktkatalogsanpassade set: djurlivsmiljö-pussel, säsongsscen-pussel, samhällshjälpar-pussel och matgrupp-pussel. Varje set inkluderar arbetsblad och facit i både PDF- och JPEG-format. Den konfigurerbara svårighetsgraden låter dig skapa nivågrupperade versioner av samma pussel för blandade produktlinje.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Säsongsbetonade och högtidspussel-samlingar',
        description:
          'De 104 tematiska bildsamlingarna täcker varje säsongs- och högtidstillfälle — jul, halloween, påsk, alla hjärtans dag, skolstart, sommarlov och fler. Skapa tidsbegränsade pusselsamlingar som sammanfaller med toppshoppingperioder. Släpp halloweenpussel-paket i september, julsamlingar i oktober och alla hjärtans dag-paket i januari. Variera bitformer och svårighetsnivåer inom varje säsongsset för maximalt värde. Säsongsprodukter motiverar högre priser under sina toppfönster och skapar naturliga skäl till återköp från din kundbas.',
        platform: 'Etsy / Amazon KDP / Gumroad (säsongsbetonat)',
      },
      {
        title: 'Global marknadsattraktionskraft — visuella pussel kräver ingen översättning',
        description:
          'Saknade Bitar-pussel är rent visuella utan textinnehåll på själva arbetsbladet — inga ord, inga bokstäver, inga lokalberoende element. Ett pussel skapat på svenska fungerar identiskt för kunder i Tyskland, Frankrike, Japan eller Brasilien. Detta gör dina pusselprodukter direkt säljbara på varje internationell marknadsplats utan att skapa separata språkversioner. Lista samma pusselpaket på Etsy med flerspråkiga titlar och beskrivningar för att fånga global söktrafik. En produkt, varje marknad — maximal räckvidd med noll extra produktionsarbete.',
        platform: 'Globala marknadsplatser (alla plattformar)',
      },
    ],
  },

  faq: [
    {
      question: 'Hur fungerar saknade bitar-pusselmekaniken?',
      answer:
        'Generatorn tar en bild från biblioteket (eller din uppladdning) och klipper ut 1–5 bitar, lämnar vita hål med svarta konturlinjer på de ursprungliga platserna. Den visar sedan 2–6 numrerade lösningsalternativ under eller bredvid pusslet — de korrekta bitarna plus distraktorbitar extraherade från andra områden av samma bild. användarna granskar hålen och de numrerade alternativen, och identifierar sedan vilket alternativ som fyller varje lucka baserat på färg, mönster och visuella detaljer.',
    },
    {
      question: 'Vilka 6 bitformer finns tillgängliga?',
      answer:
        'Du kan välja bland fyrkant (standard), cirkel, rektangel stående (80% bredd, 100% höjd), rektangel liggande (100% bredd, 80% höjd), ellips stående (80% rx, 100% ry) och ellips liggande (100% rx, 80% ry). Varje form skapar en annorlunda visuell utmaning. Fyrkant och cirkel erbjuder rena geometriska klipp, medan rektangel- och ellipsvarianter skapar avlånga eller kurvade former som interagerar annorlunda med källbilden.',
    },
    {
      question: 'Hur fungerar svårighetsinställningarna?',
      answer:
        'Svårigheten kontrolleras av två oberoende inställningar. Antal saknade bitar (1–5) bestämmer hur många hål som klipps ut från bilden — fler bitar innebär mer rumsligt resonemang. Antal lösningsalternativ (2–6) bestämmer hur många numrerade val användarna utvärderar — när alternativ överstiger saknade bitar är de extra distraktorer som kräver noggrann visuell jämförelse. Ett pussel med 1 saknad bit och 2 alternativ är lätt; 5 saknade bitar med 6 alternativ är utmanande.',
    },
    {
      question: 'Vad är distraktorbitar och hur genereras de?',
      answer:
        'Distraktorbitar är extra lösningsalternativ som inte matchar något hål i pusslet. De extraheras från olika områden av samma källbild med upp till 200 placeringsförsök vardera, vilket säkerställer att de inte överlappar med korrekta bitar. Distraktorer förhindrar användarna från att lösa genom eliminering enbart — de måste noggrant jämföra färger, mönster och visuella detaljer för att skilja korrekta alternativ från liknande alternativ.',
    },
    {
      question: 'Hur fungerar den smarta bitextraktions-algoritmen?',
      answer:
        'Algoritmen använder upp till 150 försök för att hitta bitar med tillräcklig visuell detalj. Varje kandidatbit analyseras för ljusstyrkavarians (minsta tröskel 15) för att säkerställa att den innehåller tillräckligt med färginformation för att vara identifierbar. Bitar bibehåller minst 250 pixlars avstånd från varandra för att förhindra överlappning. Bitstorlek beräknas som 12% av bildens bredd med minimum 50 pixlar. Denna automatiserade process säkerställer att varje pussel är visuellt lösbart oavsett källbild.',
    },
    {
      question: 'Hur fungerar det automatiskt genererade facit?',
      answer:
        'Generatorn använder ett dubbelarbetsyte-system med en Arbetsbladsflik och en Facitflik. Facit visar samma pusselbild med hål men utelämnar lösningsalternativen. Istället placeras gulmarkerade nummertiketter (rgba(255,255,0,0.7)) inuti varje hål som visar det korrekta 1-baserade alternativindexet. Teckenstorleken skalas till 60% av bitstorleken för tydlig läsbarhet. Ladda ner facit separat med de dedikerade Facit-JPEG och Facit-PDF knapparna.',
    },
    {
      question: 'Är saknade bitar-pussel språkkänsliga?',
      answer:
        'Nej. Saknade Bitar är ett rent visuellt pusselformat utan textinnehåll på själva arbetsbladet — inga ord, inga bokstäver, inga lokalberoende element. Det enda språkberoende elementet är den automatiskt genererade rubriktexten («Saknade bitar» / «Hitta och placera de saknade bitarna!»), som är lokaliserad på alla 11 stödda språk. Pusslet i sig fungerar identiskt på varje språk, vilket gör det idealiskt för globala marknader.',
    },
    {
      question: 'Hur fungerar det dubbla ramsystemet?',
      answer:
        'Varje genererat pussel har två dekorativa ramar. Den yttre ramen använder lysande blågrön (#14B8A6) med 8px streck, 34px marginaler och 12px kantradie. Den inre ramen använder het rosa (#EC4899) med 3px streck, 46,5px marginaler, 8px kantradie och en lätt förskjutning på 2px höger och 3px ner. Tillsammans skapar de en polerad, professionell inramning som ökar den visuella kvaliteten på dina pusselarbetsblad för marknadsplatsannonser.',
    },
    {
      question: 'Finns det en gratis provversion?',
      answer:
        'Ja. Du kan använda alla funktioner — alla 6 bitformer, konfigurerbara saknade bitar och lösningsalternativ, det automatiskt genererade facit, hela bildbiblioteket, bakgrunds- och ramteman och alla nedladdningsformat — utan att skapa ett konto, ange kreditkort eller installera programvara. Gratis provversion-nedladdningar innehåller en liten vattenstämpel. En kommersiell licens tar bort vattenstämpeln och ger fulla försäljningsrättigheter.',
    },
    {
      question: 'Kan jag lägga till bakgrundsteman och ramteman på pussel?',
      answer:
        'Ja. Panelen Sidinställningar inkluderar både en bakgrundstema-väljare med ett opacitetsreglage (0–1 i 0,05-steg) och en ramtema-väljare med sitt eget oberoende opacitetsreglage. Bakgrundsteman lägger till dekorativa mönster bakom pusselinnehållet, medan ramteman ramar in sidan. Båda har separata opacitetskontroller så du kan skapa subtila bakgrunder med framträdande ramar, eller valfri kombination som passar din design.',
    },
    {
      question: 'Kan jag sälja saknade bitar-pussel skapade med detta verktyg på Etsy och Amazon KDP?',
      answer:
        'Ja. Med en kommersiell licens har du fulla rättigheter att sälja dina saknade bitar-pussel som digitala nedladdningar på Etsy, som tryckta arbetsböcker på Amazon KDP, som produktlinjesresurser på Gumroad, eller genom valfri annan försäljningskanal. De 6 bitformerna, konfigurerbar svårighet, automatiskt genererade facit och 104 tematiska bildsamlingar ger dig de kreativa verktygen för att producera originella, säljbara pusselprodukter.',
    },
    {
      question: 'Vad är er återbetalningspolicy?',
      answer:
        'Eftersom den gratis provversionen ger dig tillgång till alla funktioner erbjuder vi inte återbetalning på köp av kommersiella licenser. Du kan testa alla 6 bitformer, konfigurerbara svårighetsinställningar, det automatiskt genererade facit, hela bildbiblioteket, bakgrunds- och ramteman och alla nedladdningsformat innan du köper. Den gratis provversionen är återbetalningspolicyn — se till att verktyget passar dina behov innan du köper en licens.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'hitta-udda-bilden-arbetsblad',
      anchorText: 'Hitta Udda Bilden Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'bildsudoku-arbetsblad',
      anchorText: 'Bildsudoku Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'bildlabyrint-arbetsblad',
      anchorText: 'Bildlabyrint Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'hitta-och-rakna-arbetsblad',
      anchorText: 'Hitta och Räkna Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'skuggmatchning-arbetsblad',
      anchorText: 'Skuggmatchning Arbetsblad Generator',
    },
    {
      pageType: 'app',
      slug: 'ordsokning-arbetsblad',
      anchorText: 'Ordsökning Arbetsblad Generator',
    },
    {
      pageType: 'bundle',
      slug: 'pussel-logik-paket',
      anchorText: 'Pussel och Logik Paket — Alla Pusselappar i Ett',
    },
    {
      pageType: 'guide',
      slug: 'skapa-saknade-bitar-pussel',
      anchorText: 'Hur du Skapar och Säljer Pusselarbetsblad Online',
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
      primary: '/samples/swedish/missing%20pieces/Saknade%20Bitar%201.webp',
      primaryAlt: 'Saknade bitar pusselarbetsblad med hål utklippta från en bild och numrerade lösningsalternativ inklusive distraktorer',
    },
    sampleGallery: [
      {
        src: '/samples/swedish/missing%20pieces/Saknade%20Bitar%202.webp',
        alt: 'Saknade bitar-pussel med fyrkantiga hål utklippta från en färgglad illustration',
        caption: 'Fyrkantiga bitar — rena geometriska klipp för tydlig visuell identifiering',
      },
      {
        src: '/samples/swedish/missing%20pieces/Saknade%20Bitar%205.webp',
        alt: 'Saknade bitar-pussel med cirkulära hål och numrerade lösningsalternativ',
        caption: 'Cirkulära bitar — rundade klipp med distraktoralternativ för ökad utmaning',
      },
      {
        src: '/samples/swedish/missing%20pieces/Saknade%20Bitar%201%20answer_key.webp',
        alt: 'Saknade bitar pussel facit med gulmarkerade nummer inuti varje hål',
        caption: 'Automatiskt genererat facit — gula etiketter visar korrekt alternativ för varje hål',
      },
    ],
    youtubeId: 'gb-xE_Ay4fc',
    videoTitle: 'Hur du Skapar Saknade Bitar-Pussel med 6 Former och Automatiska Facit — Steg-för-Steg Handledning',
  },
};

export default content;
