import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'lav bingoplader',
    secondaryKeywords: [
      'bingo generator',
      'bingo med billeder til print',
      'egen bingo lave',
      'bingo spil til print',
    ],
    lsiKeywords: [
      'bingoplade bingo billeder spil gruppe klasse',
      'printbare bingoplader forretningsværktøj',
      'bingo generator kommercielt brug',
    ],
    titleTag: 'Lav bingoplader | Generator bingo med billeder',
    metaDescription: 'Lav bingoplader med 3.000+ temabilleder. Unikke plader per sæt, printklare PDF\'er. Prøv gratis — kommerciel licens.',
  },

  hero: {
    title: 'Lav bingoplader med billeder — bingo generator til print',
    tagline: 'Lav dine egne bingoplader med 3.000+ temabilleder — generer 1–10 unikke plader per sæt, billed- eller ordudfyldning, opråbsliste til spillederen, ZIP batch-eksport og 104 tematiske billedsamlinger.',
    description:
      'Lav professionelle bingoplader med billeder, hvor spillere markerer matchende billeder eller ord på deres unikke bingoplade. Det danske marked med 5,8 millioner dansktalende har lav konkurrence inden for printbare bingo spil på Etsy.dk — en oplagt mulighed for at sælge bingoplader til grupper og klasser. Konfigurer rækker fra 3 til 5 og kolonner fra 3 til 5 uafhængigt, hvilket giver gitre fra 3×3 (9 felter) op til 5×5 (25 felter) med standard 4×4 (16 felter). Vælg billedudfyldning eller ordudfyldning uafhængigt for både kortceller og cirkulære brikker — brikker har stiplede kanter og blandet Fisher-Yates-rækkefølge for autentisk bingospil. Generer 1–10 unikke bingoplader per sæt, hver med et anderledes tilfældigt billedudvalg fra puljen. En dedikeret opråbsliste til spillederen viser et dynamisk ordgitter med kolonner beregnet baseret på længste ordlængde. Bingo generatoren er sprogfølsom: ordudfyldning bruger lokaliserede billednavne, så at skifte sprog ændrer ordene — det samme tema kan generere unikke bingoplader på 11 sprog. Bingoplader er egnede til børnehaveklasse (5–6 år), indskoling (0.–3. klasse) og mellemtrin (4.–6. klasse) — tilpas sværheden med gitterstørrelse og antal billeder. Fuld Adgang låser op for alle 104 temaer med mere end 3.100 illustrationer og alle 11 brugerfladesprog. Tilføj baggrundstemaer og rammetemaer med uafhængige opacitetskontroller, og eksporter trykklare PDF\'er og JPEG-billeder med 300 DPI i Letter, A4, Kvadrat eller brugerdefinerede størrelser. Batch-eksporter alle bingoplader som individuelle JPEG-billeder i en enkelt ZIP-fil. Uanset om du sælger bingopladepakker på Etsy.dk, sammensætter bingo spil bøger til Amazon KDP eller opretter gruppeaktiviteter — denne bingo generator leverer printklare bingoplader på få minutter. Gratis prøveversion med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  howItWorks: {
    title: 'Sådan laver du bingoplader med billeder i 5 trin',
    steps: [
      {
        title: 'Indstil sidelayoutet',
        description:
          'Åbn panelet Sideopsætning og vælg en sidestørrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) eller en brugerdefineret dimension. Vælg en sidefarve med farvevælgeren som reservebaggrund. Vælg et baggrundstema og juster dets opacitet (0–1 i 0,05-trin), vælg derefter et rammetema med sin egen uafhængige opacitetskontrol. Disse layoutvalg rammer dit bingokort ind, før du konfigurerer noget indhold.',
      },
      {
        title: 'Konfigurer bingokortindstillinger',
        description:
          'Åbn panelet Bingokortindstillinger og indstil rækker (3–5) og kolonner (3–5) for at definere din gitterstørrelse — standard er 4×4 med 16 celler. Indstil antal kort fra 1 til 10 for at batch-generere flere unikke bingokort. Vælg kortcelleudfyldning (Billede eller Ord) og brikudfyldning (Billede eller Ord) uafhængigt — bland billedkort med ordbrikker, ordkort med billedbrikker, eller match begge. Aktiver fluebenet \"Brug tilpasset udvalg\" for at håndplukke specifikke billeder til opråb i stedet for at bruge automatisk udvalg.',
      },
      {
        title: 'Vælg billeder fra biblioteket',
        description:
          'Åbn panelet Billedbibliotek og gennemse 104 tematiske samlinger med mere end 3.100 farverige illustrationer — dyr, mad, køretøjer, natur, højtider og snesevis flere. Filtrer efter tema med dropdownen eller søg med nøgleord. Klik på billeder for at vælge dem til dine bingokort. Når tilpasset opråbsudvalg er aktiveret, vises valgte billeder i opråbspuljen med en levende tæller, der viser dit udvalg. Du kan også uploade egne PNG-, JPG- eller GIF-billeder med panelet Upload Egne Billeder.',
      },
      {
        title: 'Generer bingokortene',
        description:
          'Klik på Generer for at oprette dine bingokort. Appen fylder dit konfigurerede gitter med billeder eller ord fra det valgte tema og opretter derefter cirkulære brikker med stiplede kanter under kortet — brikkerne blandes med Fisher-Yates-rækkefølge, så de aldrig matcher kortlayoutet direkte. Hvis du anmodede om flere kort, trækker hvert et anderledes tilfældigt udvalg fra billedpuljen, hvilket garanterer, at hvert kort i batchen er unikt. Det første kort vises på lærredet øjeblikkeligt; alle kort inkluderes i batch-ZIP-eksporten.',
      },
      {
        title: 'Download kort og opråbsliste',
        description:
          'Skift mellem fanerne Kort + Brikker og Opråb for at forhåndsvise begge output. Opråbslisten viser et dynamisk ordgitter med ensartet skriftstørrelse og kolonner beregnet baseret på længste ordlængde. Download individuelle kort som JPEG eller PDF med de dedikerede knapper, eller batch-eksporter alle genererede kort som individuelle JPEG-billeder i en enkelt bingo_cards.zip-fil. Slå gråtone til for blækvenlige versioner. Hver eksport renderes med 300 DPI og er produktionsklar til Etsy-annoncer, Amazon KDP-indersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nøglefunktioner i bingo generatoren',
    features: [
      {
        title: 'Konfigurerbart bingogitter fra 3×3 til 5×5 med uafhængige række- og kolonnekontroller',
        description:
          'Indstil rækker og kolonner uafhængigt fra 3 til 5, hvilket generator gitre fra 3×3 (9 celler) op til 5×5 (25 celler). Standard er 4×4 (16 celler), som fungerer godt til standard bingokort. Et 3×3-gitter passer til hurtigt spillede bingorunder med færre objekter at holde styr på, mens et 5×5-gitter giver den klassiske 25-cellers bingooplevelse til længere spil. Gitterområdet bruger 60% af tilgængelig lærredshøjde (maks 500px) for optimale kortproportioner. Uafhængige række- og kolonnekontroller lader dig oprette ikke-kvadratiske gitre som 3×5 eller 5×3 til unikke bingokortformater, der skiller sig ud i markedspladsannoncer.',
      },
      {
        title: 'Batch-generering af 1–10 unikke bingokort per arbejdsark',
        description:
          'Generer 1 til 10 unikke bingokort i en enkelt batch. Hvert kort trækker et anderledes tilfældigt udvalg fra billedpuljen, så ingen to kort i batchen har det samme layout. Dette er essentielt for bingo: hver spiller har brug for et anderledes kort, for at spillet fungerer. Det første kort vises på arbejdsarkslærredet til øjeblikkelig forhåndsvisning. Alle genererede kort er tilgængelige til batch-eksport. Denne batch-tilgang betyder, at du kan producere et komplet sæt af 10 unikke bingokort med et enkelt klik i stedet for at generere og gemme dem ét ad gangen.',
      },
      {
        title: 'ZIP batch-eksport for alle genererede kort som individuelle JPEG-filer',
        description:
          'Eksporter alle genererede bingokort i en enkelt bingo_cards.zip-download. Hvert kort gemmes som en individuel højopløst JPEG-fil inde i ZIP-arkivet, navngivet sekventielt for nem organisering. Denne batch-eksport eliminerer den kedelige proces med at downloade kort ét ad gangen — generer 10 unikke kort, klik på én knap og modtag et komplet bingokortssæt klar til pakning i dit markedspladsprodukt. ZIP-eksporten bruger JSZip for pålidelig komprimering på tværs af browsere og fungerer sammen med de almindelige individuelle JPEG- og PDF-downloadknapper.',
      },
      {
        title: 'Dobbelte udfyldningstilstande: Billede eller Ord til både kortceller og cirkulære brikker',
        description:
          'Kortceller og brikker har hver sin uafhængige udfyldningstilstand — Billede eller Ord. Billedudfyldning viser tematiske illustrationer i kortceller eller som cirkulære brikmønstre. Ordudfyldning viser lokaliserede billednavne som tekst. Bland tilstande for kreativ variation: billedkort med ordbrikker generator en visuel-til-tekst matchningsudfordring, mens ordkort med billedbrikker vender dynamikken. Cirkulære brikker har stiplede kanter (#666, strokeDashArray [5,5]) og blandes med Fisher-Yates-rækkefølge, hvilket sikrer, at de aldrig spejler kortets gitterlayout. Dette dobbelte udfyldningssystem producerer fire distinkte bingokortsstile fra én generator.',
      },
      {
        title: 'Dedikeret opråbsliste med dynamisk ordgitter til spillederen',
        description:
          'Hvert bingokortssæt inkluderer en ledsagende opråbsliste på en separat fane. Opråbslisten viser et dynamisk gitter af alle unikke ord fra billedpuljen — spillederen læser disse højt, mens spillerne markerer deres kort. Kolonner beregnes baseret på længste ordlængde (2–6 kolonner) med ensartet skriftstørrelse på tværs af alle poster for ren læsbarhed. Gitteret er centreret på siden og arver siderammer og baggrund fra arbejdsarkets lærred. Aktiver tilpasset opråbsudvalg for at håndplukke specifikke billeder til opråbspuljen med en levende tæller, der viser dit valgte antal.',
      },
      {
        title: 'Billedbibliotek med 104 tematiske samlinger og mere end 3.100 illustrationer',
        description:
          'Gennemse 104 tematiske billedsamlinger, der dækker dyr, mad, køretøjer, natur, erhverv, højtider, sport, årstider og snesevis flere. Hvert tema giver et koordineret sæt farverige illustrationer, der fungerer sammen i bingoaktiviteter — tematiske bingokort er blandt de mest populære printbare produkter på Etsy.dk og Gumroad. Filtrer efter tema med dropdownen eller søg efter specifikke billeder med nøgleord. Kommerciel Pakke inkluderer 10 farverige temaer til at komme i gang; Fuld Adgang låser op for alle 104 temaer for maksimal kreativ variation over alle gitterstørrelser og udfyldningstilstande.',
      },
      {
        title: 'Trykfærdig PDF- og JPEG-eksport med 300 DPI og gråtoneomskifter',
        description:
          'Download bingokort og opråbslister som højopløste JPEG-billeder eller trykklare PDF-dokumenter renderet med 300 DPI (6× multiplikator, JPEG-kvalitet 1,0). Fire dedikerede knapper eksporterer Arbejdsark-JPEG, Opråb-JPEG, Arbejdsark-PDF og Opråb-PDF separat. Sidestørrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) og helt brugerdefinerede dimensioner. PDF-orientering detekteres automatisk. Slå gråtone til for blækvenlige versioner, der sparer toner. Hver eksport er produktionsklar til digitale downloads, trykte spilsæt og produktlinjeuddeling.',
      },
      {
        title: 'Fuld lærredsredigering med tekstværktøjer, justering og lagkontroller',
        description:
          'Fabric.js-lærredet giver komplet kontrol over hvert element på dit bingokort. Træk, ændr størrelse, roter og flyt billeder, tekst og genereret indhold frit. Lagkontroller håndterer stablingsrækkefølge — flyt elementer fremad eller send dem bagud. Lås færdige elementer, mens du redigerer andre. Tilføj brugerdefineret tekst med syv skrifttypemuligheder (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar størrelse og farve, og tekstkonturbredde fra 0 til 10 med 0,5-trins granularitet. Seks justeringsmuligheder plus centrer-på-siden holder layouts præcise. Zoom fra 50% til 200% i 10%-trin for detailarbejde. Fortryd og gentag op til 20 historiktrin med Ctrl+Z og Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Sådan sælger du bingoplader og bingo spil online',
    cases: [
      {
        title: 'Tematiske bingokortpakker på Etsy.dk',
        description:
          'Opret tematiske bingokortpakker med de 104 billedsamlinger — dyrebingo, madbingo, køretøjsbingo, højtidsbingo og snesevis flere. Hvert tema giver tilstrækkeligt med illustrationer til unikke kort over forskellige gitterstørrelser. Pak 10–30 unikke bingokort per tema med opråbslister inkluderet, og sælg til 25–70 kr per pakke. Brug batch-genereringsfunktionen til at oprette 10 unikke kort per sæt på sekunder, bland derefter gitterstørrelser inden for en enkelt pakke: 3×3 hurtigspilskort, 4×4 standardkort og 5×5 forlænget spil-kort for variation. ZIP batch-eksporten effektiviserer produktionen for høj­volumen-sælgere.',
        platform: 'Etsy (etsy.dk)',
      },
      {
        title: 'Bingoaktivitetsbøger på Amazon KDP',
        description:
          'Saml 40–80 bingokort til en trykt aktivitetsbog formateret til Amazon KDP. Strukturér din bog efter temakapitler: dyr, mad, køretøjer, højtider og flere. Inkluder opråbslister efter hvert sæt kort, så bogen er selvstændig til spil. Brug gråtoneomskifteren for blækvenlige indersider, der holder udskriftsomkostningerne lave. Bland gitterstørrelser for at tilbyde progressiv sværhedsgrad — begynd med 3×3-kort til hurtige runder og avancér til 5×5 til længere spil. Bingoaktivitetsbøger klarer sig godt året rundt og topper under højtidssæsoner, når familier søger gruppeaktiviteter.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Produktlinjebingo-aktiviteter til Gumroad',
        description:
          'Byg spilklare bingosæt med unikke spillerkort og spillelederark. Købere, der søger på Gumroad efter bingoaktiviteter, værdsætter produkter, der ankommer produktlinjefærdige — print kortene, del dem ud og begynd at spille øjeblikkeligt. Opret produktkatalogtilpassede sæt: ordforråds­bingo med ordudfyldnings­tilstand, billedgenkendelsesbingo med billedudfyldning og blandet tilstands-bingo til niveauinddelte produktpakker. Inkluder 10 unikke kort per sæt (tilstrækkeligt til små grupper) med en opråbsliste. Ordudfyldningstilstanden med lokaliserede billednavne forvandler bingo til en ordforrådsgentagelses­aktivitet.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sæsonbetonede og højtidsbingokort-samlinger',
        description:
          'De 104 tematiske billedsamlinger dækker enhver sæson- og højtidslejlighed — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Bingo er et naturligt socialt spil, der topper under højtider, når familier og produktlinjer søger gruppeaktiviteter. Udgiv halloweenbingosæt i september, julesamlinger i oktober og valentinsdag-pakker i januar. Hvert sæsonsæt inkluderer flere gitterstørrelser, både billed- og ordudfyldningsvarianter og opråbslister. Sæsonbetonede bingoprodukter motiverer premiumpriser under deres topvinduer.',
        platform: 'Etsy / Amazon KDP / Gumroad (sæsonbetonet)',
      },
      {
        title: 'Eventbingokort til festspil og specielle lejligheder',
        description:
          'Opret bingokortssæt til fester, baby showers, polterabender, teambuilding-events og uddannelsesworkshops. De konfigurerbare gitterstørrelser og det tematiske billedbibliotek gør det nemt at producere lejlighedsspecifikke bingospil — babyting-bingo til baby showers, madbingo til madlavningskurser, dyrebingo til zoologisk have-udflugter. Batch-generer 10 unikke kort per eventsæt med en opråbsliste, pak som en direkte downloadbar PDF-pakke og sælg på Etsy.dk, hvor eventplanlæggere aktivt søger efter printbare festspil. Den tilpassede opråbsvalgsfunktion lader dig kurere præcis, hvilke objekter der vises i spillet.',
        platform: 'Etsy (etsy.dk / eventplanlæggere)',
      },
    ],
  },

  faq: [
    {
      question: 'Kan jeg sælge disse bingoplader på Etsy?',
      answer:
        'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge dine bingoplader som digitale downloads på Etsy.dk, som trykte aktivitetsbøger på Amazon KDP eller via enhver anden salgskanal. Batch-generering af unikke plader, ZIP-eksport, opråbslister og 104 tematiske billedsamlinger giver dig værktøjerne til at producere salgbare bingo spil i stor skala. Det danske marked har lav konkurrence inden for printbare bingoplader.',
    },
    {
      question: 'Hvordan laver jeg bingoplader?',
      answer:
        'Åbn bingo generatoren, vælg et tema fra billedbiblioteket med 3.100+ illustrationer, konfigurer gitterstørrelse (3×3 til 5×5) og antal plader (1–10). Vælg billed- eller ordudfyldning for kortceller og brikker. Klik Generer — appen opretter unikke bingoplader med tilfældigt billedudvalg plus en opråbsliste til spillederen. Eksporter som printklare PDF\'er med 300 DPI eller batch-download alle plader som ZIP-fil.',
    },
    {
      question: 'Er bingopladerne egnede til børnehaveklasse, indskoling og mellemtrin?',
      answer:
        'Ja. Til børnehaveklasse (5–6 år) bruger du 3×3-gitre med billedudfyldning — færre felter og visuelle billeder gør spillet enkelt. Til indskoling (0.–3. klasse) bruger du 4×4-gitre med blandede tilstande (billedkort med ordbrikker). Til mellemtrin (4.–6. klasse) bruger du 5×5-gitre med ordudfyldning for den klassiske 25-felters bingooplevelse, der styrker ordforråd og læsefærdigheder.',
    },
    {
      question: 'På hvor mange sprog fungerer generatoren?',
      answer:
        'Bingo generatoren understøtter 11 sprog: dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, norsk og finsk. Ordudfyldning bruger lokaliserede billednavne — det samme tema genererer unikke bingoplader på hvert sprog. Et kattebillede viser \"Kat\" på dansk, \"Cat\" på engelsk og \"Katze\" på tysk. Hver sprogversion bliver et separat produkt for et nyt marked.',
    },
    {
      question: 'Er opråbslisten inkluderet?',
      answer:
        'Ja. Hvert bingosæt inkluderer en dedikeret opråbsliste på en separat fane med et dynamisk ordgitter af alle unikke objekter. Spillederen læser ord højt fra opråbslisten, mens spillerne markerer deres bingoplader. Bingo bruger en opråbsliste i stedet for en facitliste — der er intet enkelt korrekt svar, fordi hver spillers plade har forskellige objekter i forskellige positioner.',
    },
    {
      question: 'Hvordan fungerer batch-generering af unikke plader?',
      answer:
        'Indstil antal plader fra 1 til 10. Hvert kort trækker et anderledes tilfældigt udvalg fra billedpuljen, hvilket garanterer unikke plader — essentielt for bingo, hvor hver spiller har brug for en anderledes plade. Batch-eksporter alle plader som individuelle JPEG-filer i en enkelt bingo_cards.zip med ét klik. Ingen grund til at downloade plader én ad gangen.',
    },
    {
      question: 'Hvad er forskellen mellem billed- og ordudfyldning?',
      answer:
        'Kortceller og brikker har uafhængige udfyldningstilstande: Billede eller Ord. Bland tilstande for kreativ variation — billedkort med ordbrikker giver en visuel-til-tekst matchningsudfordring, mens ordkort med billedbrikker vender dynamikken. Fire distinkte bingostile fra én generator giver dig flere produktvarianter til salg.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — alle gitterstørrelser, batch-generering af op til 10 plader, ZIP batch-eksport, billed- og ordudfyldning, opråbslisten, hele billedbiblioteket og alle downloadformater — uden at oprette en konto eller indtaste kreditkort. Downloads fra den gratis prøveversion indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket og giver fulde salgsrettigheder.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'matchning-arbejdsark',
      anchorText: 'Matchnings Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'raster-puslespil-arbejdsark',
      anchorText: 'Gittermatchning Puslespil Generator',
    },
    {
      pageType: 'app',
      slug: 'skygge-match-arbejdsark',
      anchorText: 'Skyggematchning Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'billedsortering-arbejdsark',
      anchorText: 'Billedsortering Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'find-objekterne-arbejdsark',
      anchorText: 'Find Objekterne Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'ordsoegning-arbejdsark',
      anchorText: 'Ordsøgning Arbejdsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'matchning-sortering-pakke',
      anchorText: 'Matchning og Sortering Pakke — Alle Matchningsapps i Én',
    },
    {
      pageType: 'guide',
      slug: 'skab-bingokort',
      anchorText: 'Sådan Opretter og Sælger du Bingokort Online',
    },
    {
      pageType: 'idea',
      slug: 'camping-printbare-ideer',
      anchorText: 'Camping printbare idéer for udendørslæring',
    },
    {
      pageType: 'idea',
      slug: 'havdyr-printbare-ideer',
      anchorText: 'Havdyr printbare idéer for marine temaer',
    },
    {
      pageType: 'start',
      slug: 'markedsfoering-printbar-forretning',
      anchorText: 'Markedsføring af Din Printbar Forretning',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/danish/bingo/billedbingo-1.webp',
      primaryAlt: 'Bingoplade med temabilleder — printklart bingo spil lavet med bingo generator',
    },
    sampleGallery: [
      {
        src: '/samples/danish/bingo/billedbingo-1.webp',
        alt: 'Bingoplade med billedudfyldning — farverige temabilleder i gitterfelter og cirkulære brikker til print',
        caption: 'Bingoplade med billeder — farverige illustrationer i felter og cirkulære brikker',
      },
      {
        src: '/samples/danish/bingo/billedbingo-2.webp',
        alt: 'Bingoplade med et andet tema — unikke bingoplader fra bingo generator til gruppe og klasse',
        caption: 'Tematisk bingoplade — 104 temaer giver unikke bingo spil for hver gruppe',
      },
      {
        src: '/samples/danish/bingo/billedbingo-3.webp',
        alt: 'Bingo opråbsliste med dynamisk ordgitter — spillederens referenceark til bingo spil',
        caption: 'Opråbsliste — dynamisk ordgitter til spillederen i bingo spillet',
      },
    ],
    youtubeId: 'd6AOiDXoK1c',
    videoTitle: 'Sådan laver du bingoplader med billeder — batch-generering og opråbslister trin-for-trin',
  },
};

export default content;
