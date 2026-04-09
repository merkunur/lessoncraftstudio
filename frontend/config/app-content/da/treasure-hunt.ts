import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'skattejagt til print',
    secondaryKeywords: [
      'sporleg til print',
      'skattejagt opgaveark',
      'ledetråde skattejagt',
      'skattejagt børn',
    ],
    lsiKeywords: [
      'skattejagt sporleg ledetråde spor',
      'børn aktivitet skattejagt print',
      'skattejagt opgave koordinatgitter retning',
    ],
    titleTag: 'Skattejagt til print | Generator sporleg',
    metaDescription: 'Lav skattejagt- og sporleg-opgaver med temabilleder. Printklare PDF\'er. Prøv gratis — sælg på Etsy & KDP.',
  },

  hero: {
    title: 'Skattejagt til print — sporleg og ledetråde for børn',
    tagline: 'Lav printbare skattejagt-opgaver med ledetråde på et 5×5 koordinatgitter — to retningstyper (op/ned/venstre/højre og kompas: nord/syd/øst/vest), fuldt lokaliserede sporleg-anvisninger på 11 sprog og automatisk facit med markeret skatteplads.',
    description:
      'Generér printbare skattejagt-opgaver, hvor børn følger ledetråde og spor for at lokalisere en gemt skat på et 5×5 koordinatgitter. Hvert sporleg spreder 6 tematiske billeder over gitteret som vartegn og opretter en startposition og præcis 4 retningsbevægelser, der fører til skattecellen. Med det danske marked på kun 5,8 millioner indbyggere er konkurrencen på Etsy.dk og Amazon KDP markant lavere end på engelsksprogede platforme — og danske forældre søger aktivt efter printbare skattejagt-aktiviteter og sporleg til børn i børnehaveklasse (5-6 år), indskoling 0.-3. klasse og mellemtrin 4.-6. klasse. Vælg mellem to retningstyper: Grundlæggende tilstand bruger op, ned, venstre og højre for de yngste i børnehaveklassen, mens Kompas-tilstand bruger nord, syd, øst og vest for indskoling og mellemtrin. Generatoren er sprogfølsom: at skifte sprog ændrer ledetrådsteksten med autentiske retningsanvisninger — \"Flyt ned 2 felter\" på dansk, \"Move down 2 squares\" på engelsk, \"Gehe 2 Felder nach unten\" på tysk. Hvert sporleg inkluderer en automatisk genereret overskrift med blågrøn baggrund, gylden titel og lokaliseret tekst: \"Skattejagt\" og \"Følg ledetrådene og find skatten!\". Dobbeltlærredssystemet genererer både en opgavefane og en facitfane — facit markerer den endelige skattecelle i bleggu, så du aldrig behøver markere manuelt. Fuld Adgang låser op for alle 104 temaer med over 3.100 illustrationer og alle 11 sprog. Tilføj baggrundstemaer og rammetemaer med uafhængige opacitetskontroller, og eksporter trykklare PDF\'er og JPEG-billeder med 300 DPI i Letter, A4, Kvadrat eller brugerdefinerede størrelser. Uanset om du sælger skattejagt-pakker på Etsy.dk, sammensætter sporleg-aktivitetsbøger til Amazon KDP eller opretter koordinatgitter-opgaver til Gumroad — denne generator leverer produktionsklare skattejagt-opgaver på få minutter. Gratis prøveversion med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  howItWorks: {
    title: 'Sådan laver du skattejagt-opgaver til print i 5 trin',
    steps: [
      {
        title: 'Indstil sidelayoutet',
        description:
          'Åbn panelet Sideopsætning og vælg en sidestørrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) eller en brugerdefineret dimension. Vælg en baggrundsfarve med farvevælgeren, vælg derefter et baggrundstema og juster dets opacitet (0–1 i 0,05-trin). Vælg et rammetema med sin egen uafhængige opacitetskontrol. Disse layoutvalg rammer dit skattejagtpuslespil ind, før du konfigurerer noget indhold.',
      },
      {
        title: 'Vælg din retningstype',
        description:
          'I panelet Puslespilskonfiguration, skift mellem to retningsordforråd. Grundlæggende tilstand bruger op, ned, venstre og højre — ideelt for børnehavebørn til 1. klasse, der opbygger grundlæggende rumligt ordforråd. Kompas-tilstand bruger nord, syd, øst og vest — tilpasset 2. klasse og opefter, introducerer kompasretninger og kortlæsningsfærdigheder. Begge retningssæt er fuldt oversat til alle 11 understøttede sprog, så at skifte sprogvælgeren opdaterer retningsanvisningsteksten på arbejdsarket.',
      },
      {
        title: 'Vælg billeder til gitteret',
        description:
          'Vælg, hvordan du vil fylde 5×5-gitteret med 6 tematiske billeder. Generer fra Tema (standard) autovælger 6 tilfældige billeder fra det valgte tema og spreder dem over gitteret. Manuelt Billedvalg lader dig gennemse 104 tematiske samlinger med mere end 3.100 farverige illustrationer — dyr, mad, køretøjer, natur, højtider og snesevis flere — og klikke for at vælge præcis 6 billeder. Upload Egne Billeder lader dig tilføje egne JPEG-, PNG-, GIF- eller WebP-filer ved siden af bibliotekets indhold.',
      },
      {
        title: 'Generer skattejagtpuslespillet',
        description:
          'Klik på Generer for at oprette vejfindingspuslespillet på 5×5 koordinatgitteret (A–E rækker, 1–5 kolonner). Generatoren spreder dine 6 valgte billeder over gitteret, vælger en tilfældig startcelle og opretter præcis 4 retningsbevægelser, der forbliver inden for gitterets grænser. Arbejdsarket viser 5 instruktionslinjer: \"Start ved [celle]\" efterfulgt af 4 \"Flyt [retning] [antal] felt/felter\"-anvisninger, afsluttende med \"Hvor er skatten?\" En skattejagt-tematiseret overskrift vises øverst med blågrøn baggrund (#2C8C7C), gylden titel (#D4A017) og lokaliseret tekst i Fredoka og Quicksand-skrifttyper.',
      },
      {
        title: 'Vis facit og download',
        description:
          'Skift til fanen Facit for at se løsningen med den endelige skattecelle markeret i bleggu (rgba(255, 250, 205, 0.8)) og mørkegrå kontur. Download begge versioner med de fire dedikerede knapper i dropdownmenuen: Arbejdsark-JPEG, Facit-JPEG, Arbejdsark-PDF og Facit-PDF. Filer eksporteres med 300 DPI for trykfærdig kvalitet. Slå gråtone til for blækvenlige versioner. Hver eksport er produktionsklar til Etsy-annoncer, Amazon KDP-indersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nøglefunktioner i skattejagt- og sporleg-generatoren',
    features: [
      {
        title: 'Vejfinding skattejagtpuslespil på et 5×5 koordinatgitter',
        description:
          'Generer retningspuslespil på et fast 5×5 gitter mærket med bogstavsrækker (A–E) og talkolonner (1–5). Hvert puslespil spreder 6 tematiske billeder over de 25 celler som visuelle vartegn og genererer derefter en tilfældig startposition og præcis 4 sekventielle bevægelser, der navigerer gitteret til et skattemål. Det konsekvente 5-instruktionsformat — startposition, 4 bevægelser og et \"Hvor er skatten?\"-spørgsmål — generator en struktureret vejfindingsudfordring, der opbygger rumligt ræsonnement og koordinatkundskab. Alle bevægelser forbliver inden for gitterets grænser for gyldige, løsbare puslespil hver gang.',
      },
      {
        title: 'To retningstyper: Grundlæggende (Op/Ned/Venstre/Højre) og Kompas (Nord/Syd/Øst/Vest)',
        description:
          'Skift mellem to retningsordforråd for at matche din målgruppe. Grundlæggende tilstand bruger op, ned, venstre og højre — velkendte retningsord for tidlige brugere, der opbygger rumligt ordforråd. Kompas-tilstand introducerer nord, syd, øst og vest til kompasretningsøvelse og kortlæsningsberedskab. Begge ordforråd producerer den samme 4-bevægelses puslespilsstruktur på det samme 5×5 gitter, hvilket lader dig oprette progressive sværhedssæt: begynd med Grundlæggende retningsarbejdsark og avancér til Kompas retningsarbejdsark med identiske temaer og billeder.',
      },
      {
        title: 'Automatisk genereret facit med markeret skatteplads',
        description:
          'Hvert skattejagtpuslespil genererer automatisk en ledsagende facitliste på en separat lærredsfane. Facit gengenerator det præcise puslespilslayout og markerer den endelige skattecelle i bleggu (rgba(255, 250, 205, 0.8)) med mørkegrå kontur, hvilket gør destinationen øjeblikkeligt synlig. Ingen manuel markering, ingen separat filoprettelse — facit forbliver perfekt synkroniseret med puslespillet. Denne dobbeltlærred-tilgang sparer betydelig produktionstid for sælgere, der opretter skattejagtpakker.',
      },
      {
        title: 'Fuldt lokaliserede retningsanvisninger på 11 sprog',
        description:
          'Al retningsinstruktionstekst er fuldt oversat til 11 understøttede sprog: engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, dansk, norsk og finsk. Grundlæggende retninger (op/ned/venstre/højre) og Kompas-retninger (nord/syd/øst/vest) er begge lokaliserede, sammen med \"Start ved\"-instruktionen, \"Flyt\"-verbet, \"felt/felter\"-enheden og \"Hvor er skatten?\"-spørgsmålet. At skifte sprogvælgeren opdaterer hele arbejdsarkets tekst, hvilket producerer autentiske retningspuslespil på modersmålet frem for udelukkende engelsk indhold med oversatte titler.',
      },
      {
        title: 'Billedbibliotek med 104 tematiske samlinger og mere end 3.100 illustrationer',
        description:
          'Gennemse 104 tematiske billedsamlinger, der dækker dyr, mad, køretøjer, natur, erhverv, højtider, sport, årstider og snesevis flere. Hvert tema giver et koordineret sæt farverige illustrationer, der fylder 5×5-gitteret som visuelle vartegn. Filtrer efter tema med dropdownen eller søg efter specifikke billeder med nøgleord. Klik på ethvert billede for at tilføje det til dit puslespil. Kommerciel Pakke inkluderer 10 farverige temaer til at komme i gang; Fuld Adgang låser op for alle 104 temaer for maksimal kreativ variation over alle skattejagtpuslespil.',
      },
      {
        title: 'Skattejagt-tematiseret automatisk genereret overskrift med gylden titel på 11 sprog',
        description:
          'Hvert genereret arbejdsark inkluderer en skattejagt-tematiseret overskrift med blågrøn baggrund (#2C8C7C), ravfarvet ydre ramme (#D4A574), sandfarvet beige indre ramme (#F4E4C1) og gylden titel (#D4A017) renderet i Fredoka-skrifttype (vægt 700, adaptiv 36–48px størrelse). Beskrivelsesteksten vises i mørkebrun (#5C4033) med Quicksand (vægt 500). Stående arbejdsark viser en fuld overskrift (100px højde); liggende arbejdsark bruger et kompakt layout (70px højde). Titlen \"Skattejagt\" og beskrivelsen \"Følg ledetrådene og find skatten!\" oversættes automatisk til alle 11 understøttede sprog.',
      },
      {
        title: 'Baggrunds- og rammetemaer med uafhængige opacitetskontroller',
        description:
          'Panelet Sideopsætning inkluderer både en baggrundstema-vælger med en opacitetsskyder (0–1 i 0,05-trin) og en rammetema-vælger med sin egen uafhængige opacitetsskyder. Baggrundstemaer tilføjer dekorative mønstre bag koordinatgitteret og retningsanvisningerne, mens rammetemaer rammer siden ind. Begge har separate opacitetskontroller, så du kan oprette subtile baggrunde med fremtrædende rammer, eller enhver kombination, der passer din design. Disse visuelle elementer øger den oplevede kvalitet af dine skattejagtarbejdsark til markedspladsannoncer.',
      },
      {
        title: 'Trykfærdig PDF- og JPEG-eksport med 300 DPI og gråtoneomskifter',
        description:
          'Download skattejagtpuslespil og facit som højopløste JPEG-billeder eller trykklare PDF-dokumenter renderet med 300 DPI (6× JPEG-multiplikator, 3× PDF-multiplikator). Fire dedikerede downloadknapper i dropdownmenuen eksporterer worksheet.jpeg, answer_key.jpeg, worksheet.pdf og answer_key.pdf separat. Sidestørrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) og helt brugerdefinerede dimensioner. Slå gråtone til for blækvenlige versioner, der sparer toner. Hver eksport er produktionsklar til digitale downloads, trykte arbejdsbøger og produktlinjeuddeling.',
      },
    ],
  },

  businessUseCases: {
    title: 'Sådan sælger du skattejagt- og sporleg-opgaver online',
    cases: [
      {
        title: 'Tematiske skattejagtpakker på Etsy.dk',
        description:
          'Opret tematiske skattejagtpakker med de 104 billedsamlinger — dyreskattejagter, havskattejagter, rumskattejagter, højtidsskattejagter og snesevis flere. Hvert tema giver tilstrækkeligt med illustrationer til flere unikke puslespil, da generatoren tilfældigt vælger 6 billeder og opretter unikke startpositioner og bevægelsessekvenser per generering. Pak 10–20 skattejagtarbejdsark per tema med facit inkluderet, og sælg til 25–60 kr per pakke. Bland Grundlæggende og Kompas-retningstyper inden for en enkelt pakke for progressiv sværhed.',
        platform: 'Etsy (etsy.dk)',
      },
      {
        title: 'Retningsfærdigheds-arbejdsbøger på Amazon KDP',
        description:
          'Saml 40–80 skattejagtarbejdsark til en trykt arbejdsbog formateret til Amazon KDP. Strukturér kapitler efter progression: Kapitel 1 bruger Grundlæggende retninger (op/ned/venstre/højre) for grundlæggende rumligt ordforråd, Kapitel 2 introducerer Kompas-retninger (nord/syd/øst/vest) for kompaslæsningsberedskab. Organiser temaer gennem sektioner — dyr, køretøjer, natur, højtider — med facit i slutningen. Gråtoneomskifteren producerer blækvenlige sider klar til sort-hvide bogsindersider. Retningsbaserede vejfindings-arbejdsbøger fylder en unik niche på aktivitetsbogs­markedet.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Flersprogede skattejagtsæt med lokaliserede retninger',
        description:
          'Udnyt de fuldt lokaliserede retningsanvisninger til at oprette skattejagtarbejdsark på 11 sprog. Den samme puslespilsstruktur producerer autentisk indhold på modersmålet, når du skifter sprog — retninger, instruktioner og billedetiketter opdateres alle automatisk. Opret flersprogede skattejagtpakker, hvor hver sprogversion bruger de samme tematiske billeder men lokaliseret retningstekst. Dette er værdifuldt for DSA-produktlinjer, der underviser retningsordforråd, tosprogede familier og internationale hjemmeundervisningsprogrammer. Sælg sprogspecifikke sæt eller flersprogede megapakker til premiumpriser.',
        platform: 'Etsy / Gumroad (flersproget marked)',
      },
      {
        title: 'Koordinatgitter aktivitetspakker til Gumroad',
        description:
          'Byg færdige koordinatgitteraktiviteter, der lærer rumligt ræsonnement og kortfærdigheder. 5×5 bogstav-tal gitteret (A–E rækker, 1–5 kolonner) introducerer brugere til koordinatsystemer brugt i geografi, matematik og naturvidenskab. Købere, der søger på Gumroad efter koordinatgitteraktiviteter, værdsætter arbejdsark med tydelige visuelle gitre, sekventielle instruktioner og trykte facit. Opret produktkatalogtilpassede sæt: par Grundlæggende retningsskattejagter med Kompas-retningsversioner til niveauinddelte produktpakker. Hvert sæt inkluderer arbejdsark og facit i både PDF- og JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sæsonbetonede skattejagtsamlinger',
        description:
          'De 104 tematiske billedsamlinger dækker enhver sæson- og højtidslejlighed — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Opret tidsbegrænsede skattejagtsamlinger, der falder sammen med topindkøbsperioder. Udgiv halloweenskattejagter i september, julesamlinger i oktober og valentinsdag-pakker i januar. Inkluder både Grundlæggende og Kompas-retningstyper i hvert sæsonsæt for maksimal værdi. Sæsonprodukter motiverer højere priser under deres topvinduer og generator naturlige grunde til genkøb.',
        platform: 'Etsy / Amazon KDP / Gumroad (sæsonbetonet)',
      },
    ],
  },

  faq: [
    {
      question: 'Kan jeg sælge disse skattejagt-opgaver på Etsy?',
      answer:
        'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge dine skattejagt-opgaver som digitale downloads på Etsy.dk, som trykte aktivitetsbøger på Amazon KDP, som ressourcer på Gumroad eller via enhver anden salgskanal. De to retningstyper, 5×5 koordinatgitteret, lokaliserede ledetråde, automatisk facit og 104 tematiske billedsamlinger giver dig originale sporleg-produkter. Det danske marked med 5,8 millioner indbyggere har lav konkurrence på printbare skattejagt-aktiviteter.',
    },
    {
      question: 'Hvordan laver jeg skattejagt-opgaver med denne generator?',
      answer:
        'Vælg retningstype (Grundlæggende: op/ned/venstre/højre eller Kompas: nord/syd/øst/vest), vælg 6 billeder fra 104 temaer med over 3.100 illustrationer, og klik Generer. Generatoren opretter et 5×5 koordinatgitter med spredte billeder, en startposition og præcis 4 ledetråde, der fører til skattecellen. Download som trykfærdig PDF eller JPEG med 300 DPI. Facit med markeret skatteplads genereres automatisk.',
    },
    {
      question: 'Er skattejagt-opgaverne egnede til børnehaveklasse, indskoling og mellemtrin?',
      answer:
        'Ja. Til børnehaveklasse (5-6 år) og tidlig indskoling 0.-1. klasse bruger du Grundlæggende tilstand med op, ned, venstre og højre — velkendte retningsord, der opbygger rumligt ordforråd. Til indskoling 2.-3. klasse og mellemtrin 4.-6. klasse passer Kompas-tilstand med nord, syd, øst og vest for mere avanceret rumligt ræsonnement og kortlæsningsfærdigheder. Begge tilstande opretter den samme 4-bevægelses sporleg-struktur.',
    },
    {
      question: 'På hvor mange sprog kan jeg lave skattejagt-opgaver?',
      answer:
        'Generatoren understøtter 11 sprog: dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk. Alle ledetråde og retningsanvisninger er fuldt oversat — \"Flyt ned 2 felter\" på dansk, \"Move down 2 squares\" på engelsk, \"Gehe 2 Felder nach unten\" på tysk. Overskriften \"Skattejagt\" og \"Følg ledetrådene og find skatten!\" oversættes automatisk til det valgte sprog.',
    },
    {
      question: 'Er facitlisten inkluderet?',
      answer:
        'Ja. Hvert sporleg genererer automatisk en facitfane, der viser det identiske 5×5 gitter med den endelige skattecelle markeret i bleggu med mørkegrå kontur. Ingen manuel markering nødvendig — facit er altid synkroniseret med opgaven. Begge versioner eksporteres separat som PDF og JPEG med 300 DPI.',
    },
    {
      question: 'Hvad er et skattejagt-opgaveark, og hvordan fungerer sporleget?',
      answer:
        'Et skattejagt-opgaveark er et vejfindingspuslespil på et 5×5 koordinatgitter mærket med bogstavsrækker (A-E) og talkolonner (1-5). Seks tematiske billeder spredes som vartegn. Opgavearket giver 5 ledetråde: en startposition (f.eks. \"Start ved A3\"), 4 retningsbevægelser (f.eks. \"Flyt ned 2 felter\"), og spørgsmålet \"Hvor er skatten?\" Barnet følger sporene på gitteret for at finde skattecellen.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — begge retningstyper, 5×5 koordinatgitteret, 6-billeds sporleg, det automatiske facit, hele billedbiblioteket, baggrunds- og rammetemaer, alle downloadformater og gråtone — uden at oprette en konto, indtaste kreditkort eller installere software. Downloads fra den gratis prøveversion indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket og giver fulde salgsrettigheder.',
    },
    {
      question: 'Hvad er returpolitikken?',
      answer:
        'Fordi den gratis prøveversion giver dig adgang til alle funktioner, tilbyder vi ingen refusioner på køb af kommercielle licenser. Du kan teste begge retningstyper, koordinatgitteret, sporleg-generering, facit, hele billedbiblioteket og alle downloadformater, før du køber. Den gratis prøveversion er returpolitikken — sikr dig, at værktøjet passer til dine behov, før du anskaffer en licens.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'find-og-tael-arbejdsark',
      anchorText: 'Find og Tæl Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'find-objekterne-arbejdsark',
      anchorText: 'Find Objekterne Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'krydsord-arbejdsark',
      anchorText: 'Billedkrydsord Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'billedsti-arbejdsark',
      anchorText: 'Billedsti Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'praepositioner-arbejdsark',
      anchorText: 'Præpositioner Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'matteleger-arbejdsark',
      anchorText: 'Mattepuslespil Arbejdsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'soeg-find-pakke',
      anchorText: 'Søg og Find Pakke — Alle Søgeapps i Én',
    },
    {
      pageType: 'guide',
      slug: 'skab-skattejagt-arbejdsark',
      anchorText: 'Sådan Opretter du Skattejagt Arbejdsark, der Sælger',
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
      primary: '/samples/danish/treasure%20hunt/skattejagt-1.webp',
      primaryAlt: 'Skattejagt til print med 5 gange 5 koordinatgitter, spredte billeder, ledetråde og sporleg-overskrift',
    },
    sampleGallery: [
      {
        src: '/samples/danish/treasure%20hunt/skattejagt-1.webp',
        alt: 'Skattejagt til print med 6 tematiske billeder på et 5 gange 5 gitter og ledetråde med grundlæggende retninger',
        caption: 'Grundlæggende sporleg — følg ledetrådene op, ned, venstre og højre for at finde skatten',
      },
      {
        src: '/samples/danish/treasure%20hunt/skattejagt-2.webp',
        alt: 'Skattejagt-opgaveark med et andet tema og kompas-ledetråde nord, syd, øst og vest',
        caption: 'Kompas-sporleg — kompasretninger for avanceret rumligt ræsonnement i indskoling og mellemtrin',
      },
      {
        src: '/samples/danish/treasure%20hunt/skattejagt-3.webp',
        alt: 'Skattejagt facit med den endelige skattecelle markeret i bleggu på koordinatgitteret',
        caption: 'Automatisk facit — bleggu markering viser hvor skatten er gemt efter sporleget',
      },
    ],
    youtubeId: 'flHiBXsYLLA',
    videoTitle: 'Sådan Opretter du Skattejagt Vejfinding Arbejdsark med Retningsanvisninger og Automatiske Facit — Trin-for-Trin Guide',
  },
};

export default content;
