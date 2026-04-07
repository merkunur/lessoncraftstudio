import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'hvad passer ikke opgave til print',
    secondaryKeywords: [
      'find den der ikke hører til',
      'klassifikation opgaveark',
      'logisk tænkning opgaver',
      'hvem hører ikke til',
    ],
    lsiKeywords: [
      'passer ikke',
      'klassifikation',
      'logik',
      'tænkning',
      'kategorisere',
      'indskoling',
    ],
    titleTag: 'Hvad passer ikke? opgave til print | Logik-generator',
    metaDescription: 'Lav "hvad passer ikke?"-opgaver med temabilleder til logisk tænkning. Automatisk facit, printklare PDF\'er. Prøv gratis.',
  },

  hero: {
    title: 'Hvad passer ikke? — opgave til print med logik-generator',
    tagline: 'Lav printbare "hvad passer ikke?"-opgaver, der træner logisk tænkning og klassifikation — to tilstande, automatisk facit med røde cirkler og 104 temabilledsamlinger.',
    description:
      'Lav professionelle opgaver til logisk tænkning, hvor børn finder den, der ikke hører til, i en række af fire billeder. Vælg mellem to tilstande: Identisk tilstand placerer tre ens billeder ved siden af ét, der passer ikke — perfekt til visuel klassifikation for de yngste. Lignende tilstand henter tre billeder fra ét tema og ét fra et andet til temaovergribende logik, hvor børn skal kategorisere og tænke abstrakt. Tilsidesæt tilstanden per øvelse for at blande sværhedsgrader inden for ét opgaveark. Konfigurer 5 til 10 øvelser per side og slå navn- og datofelter til. Hvert opgaveark genererer automatisk en facitliste med røde cirkler rundt det billede, der ikke passer. Det danske marked med 5,8 millioner dansktalende har næsten ingen printbare logikopgaver af typen "hvad passer ikke?" på Etsy.dk og Amazon KDP — en åben niche for sælgere. Opgaverne er ideelle til børnehaveklasse og indskoling (0.–3. klasse), hvor logisk tænkning og klassifikation er en del af læseplanen. Børn i mellemtrin (4.–6. klasse) kan udfordres med Lignende tilstand og subtile temadistinktioner. Fordi opgaverne er rent visuelle — ingen tekst på selve opgavearket — fungerer de på alle sprog uden oversættelse. Vælg blandt mere end 3.100 illustrationer i 104 temaer, tilføj baggrunds- og rammetemaer, og eksporter printklare PDF\'er og JPEG-billeder med 300 DPI i Letter, A4, Kvadrat eller brugerdefinerede størrelser. Gratis prøveversion med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  howItWorks: {
    title: 'Sådan laver du "hvad passer ikke?"-opgaver i 5 trin',
    steps: [
      {
        title: 'Indstil sidelayoutet',
        description:
          'Åbn panelet Sideopsætning og vælg en sidestørrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) eller en brugerdefineret dimension. Vælg en sidefarve med farvevælgeren som reservebaggrund. Vælg et baggrundstema og juster dets opacitet (0–1 i 0,05-trin), vælg derefter et rammetema med sin egen uafhængige opacitetskontrol. Disse layoutvalg rammer dit find den ulige arbejdsark ind, før du konfigurerer nogen øvelser.',
      },
      {
        title: 'Konfigurer dine øvelser',
        description:
          'Åbn panelet Øvelseskonfiguration og indstil øvelsesantallet fra 5 til 10 (standard 6). Vælg en global genereringstilstand: Identisk tilstand bruger tre kloner af det samme billede plus et anderledes billede fra det samme tema, mens Lignende tilstand henter tre billeder fra Tema A og ét billede fra Tema B. Tilsidesæt tilstanden per øvelse med dropdown-vælgere på hver række — bland Identiske og Lignende øvelser på et enkelt arbejdsark for progressiv sværhed. Slå fluebenet \"Inkluder Navn/Dato-felter\" til for at tilføje navn- og datolinjer, og slå \"Inkluder Øvelsesnumre\" til for at vise numre på venstre side af hvert øvelseskort.',
      },
      {
        title: 'Vælg temaer og billeder',
        description:
          'Åbn panelet Billedbibliotek og vælg Tema A fra dropdownen — dette giver de tre almindelige billeder i Lignende tilstand. Vælg Tema B til det ulige objekt i Lignende tilstand (f.eks. Tema A = dyr, Tema B = mad). Gennemse 104 tematiske samlinger med mere end 3.100 farverige illustrationer, eller søg med nøgleord. I Identisk tilstand behøves kun ét tema, da både de almindelige og de ulige billeder kommer fra den samme samling. Du kan også uploade egne PNG-, JPG- eller GIF-billeder at bruge ved siden af bibliotekets indhold.',
      },
      {
        title: 'Generer find den ulige arbejdsarket',
        description:
          'Klik på Generer for at oprette øvelseskortene. Hvert kort viser fire billeder i en horisontal række — tre almindelige objekter og ét uligt objekt med sin position tilfældigt blandet. Appen arrangerer kort i 1–2 kolonner afhængigt af sideorientering og øvelsesantal (2 kolonner for liggende eller stående med 7+ øvelser). En stiliseret \"Find den der ikke hører til\"-overskrift vises øverst med koralfarvet ydre ramme (#FF6B6B, 8px streg), ravgul indre ramme (#FFB84D, 3px streg) og turkis baggrund (#4ECDC4) — med titlen i mørkblågrøn Fredoka (#1A535C) og instruktioner i rød Quicksand (#E63946).',
      },
      {
        title: 'Generer facit og download',
        description:
          'Skift til fanen Facit for at se det automatisk genererede facit med en rød cirkel tegnet rundt det ulige objekt i hver øvelsesrække. Cirklens stregbredde skaleres med billedstørrelse (maks af imageSize × 0,04 eller 3px) for konsistent synlighed over sidestørrelser. Download begge versioner med de fire dedikerede knapper: Arbejdsark-JPEG, Facit-JPEG, Arbejdsark-PDF og Facit-PDF med 300 DPI. Slå gråtone til for blækvenlige versioner. Hver eksport er produktionsklar til Etsy-annoncer, Amazon KDP-indersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nøglefunktioner i logik-generatoren til klassifikation',
    features: [
      {
        title: 'Find den der ikke hører til-puslespil med to genereringstilstande',
        description:
          'Hver øvelse viser fire billeder i et horisontalt kort — tre almindelige objekter og ét uligt objekt — og brugerne ringer den ind, der ikke hører til. Generatoren tilbyder to distinkte tilstande. Identisk tilstand placerer tre kloner af præcis det samme billede ved siden af et anderledes billede fra det samme tema, hvilket generator en simpel find-forskellen-udfordring. Lignende tilstand henter tre billeder fra Tema A (f.eks. dyr) og ét billede fra Tema B (f.eks. mad), hvilket kræver, at brugerne identificerer den tematiske afviger frem for en visuel dublet. Hver tilstand producerer en fundamentalt anderledes kognitiv udfordring fra det samme billedbibliotek.',
      },
      {
        title: 'Tilstandstilsidesættelse per øvelse til arbejdsark med blandet sværhed',
        description:
          'Hver øvelsesrække inkluderer sin egen tilstandsdropdown, der lader dig tilsidesætte den globale tilstand per øvelse. Begynd med enkle Identiske øvelser øverst og overgå til sværere Lignende øvelser mod bunden — eller alternér tilstande gennem hele arbejdsarket for varieret udfordring. En \"Ryd Valg\"-knap nulstiller alle per-øvelse-tilsidesættelser til den globale indstilling. Denne detaljerede kontrol lader sælgere oprette arbejdsark med progressiv sværhed, der betjener flere færdighedsniveauer på en enkelt side, hvilket øger den oplevede værdi af hvert printbare produkt.',
      },
      {
        title: 'Konfigurerbart øvelsesantal fra 5 til 10 per arbejdsark',
        description:
          'Indstil antallet af øvelser fra 5 til 10 med panelet Øvelseskonfiguration, med standard sat til 6. Færre øvelser generator arbejdsark med større billedkort og mere afstand — ideelt for yngre brugere eller arbejdsark beregnet til finmotorisk øvelse, hvor indrigning behøver plads. Flere øvelser øger indholdstætheden og udfordringen for ældre brugere. Layoutet tilpasser sig automatisk: stående sider med 7 eller flere øvelser skifter til et 2-kolonnelayout, og liggende sider bruger altid 2 kolonner for optimalt mellemrum.',
      },
      {
        title: 'Totemasystem med Tema A (almindelige) og Tema B (ulige)',
        description:
          'Lignende tilstand bruger et totemasystem, der gør temaovergribende diskrimineringspuslespil nemme at oprette. Vælg Tema A fra dropdownen til de tre almindelige billeder i hver øvelse, vælg derefter Tema B til det ene ulige objekt. Par dyr med mad, køretøjer med natur, erhverv med sport — enhver kombination fra de 104 tilgængelige temaer. Dette system garanterer, at det ulige objekt altid er tematisk distinkt, hvilket generator tydelige og pædagogisk meningsfulde puslespil uden manuelt billedvalg for hver øvelse.',
      },
      {
        title: 'Automatisk genereret facit med røde cirkelmarkeringer',
        description:
          'Hvert find den ulige arbejdsark genererer automatisk en ledsagende facitliste på en separat lærredsfane. Facit gengenerator det præcise arbejdsarkslayout og tegner en rød cirkelkontur rundt det ulige objekt i hver øvelsesrække. Cirklens stregbredde skaleres dynamisk med billedstørrelse — beregnet som det større af imageSize × 0,04 eller 3 pixels — hvilket sikrer konsistent synlighed over alle sidestørrelser og øvelsesantal. Ingen manuel markering, ingen separat filoprettelse — facit forbliver synkroniseret med arbejdsarket automatisk.',
      },
      {
        title: 'Billedbibliotek med 104 tematiske samlinger og mere end 3.100 illustrationer',
        description:
          'Gennemse 104 tematiske billedsamlinger, der dækker dyr, mad, køretøjer, natur, erhverv, højtider, sport, årstider og snesevis flere. Hvert tema giver et koordineret sæt farverige illustrationer, der fungerer sammen i find den ulige-øvelser. Filtrer efter tema med dropdownen eller søg efter specifikke billeder med nøgleord. Billeder indlæses med doven indlæsning (20 ad gangen) for glidende gennemsyn. Kommerciel Pakke inkluderer 10 farverige temaer til at komme i gang; Fuld Adgang låser op for alle 104 temaer for maksimal variation over begge genereringstilstande.',
      },
      {
        title: 'Trykfærdig PDF- og JPEG-eksport med 300 DPI og gråtoneomskifter',
        description:
          'Download find den ulige arbejdsark og facit som højopløste JPEG-billeder eller trykklare PDF-dokumenter renderet med 300 DPI (6× multiplikator). Fire dedikerede downloadknapper eksporterer Arbejdsark-JPEG, Facit-JPEG, Arbejdsark-PDF og Facit-PDF separat. Sidestørrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) og helt brugerdefinerede dimensioner. Slå gråtone til for blækvenlige versioner, der sparer toner. Hver eksport er produktionsklar til digitale downloads, trykte arbejdsbøger og produktlinjeuddeling.',
      },
      {
        title: 'Fuld lærredsredigering med tekstværktøjer, navn/dato-felter og øvelsesnumre',
        description:
          'Fabric.js-lærredet giver komplet kontrol over hvert element på dit arbejdsark. Træk, ændr størrelse, roter og flyt billeder, tekst og genereret indhold frit. Lagkontroller håndterer stablingsrækkefølge og lås færdige elementer, mens du redigerer andre. Tilføj brugerdefineret tekst med syv skrifttypemuligheder (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar størrelse og farve, og tekstkonturbredde fra 0 til 10 med 0,5-trins granularitet. Slå navn- og datofelter til for produktlinjefærdig formatering og øvelsesnumre (25px bredde, 15px mellemrum) for nem reference under gennemgang. Zoom fra 25% til 300% for detailarbejde. Fortryd og gentag op til 20 historiktrin med Ctrl+Z og Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Sådan sælger du logikopgaver med "hvad passer ikke?" online',
    cases: [
      {
        title: 'Tematiske find den ulige puslespilspakker på Etsy.dk',
        description:
          'Opret tematiske visuelle diskrimineringspakker med totemasystemet — dyr mod mad, køretøjer mod natur, højtider mod sport og snesevis flere temakombinationer. Hver temaparring producerer tilstrækkeligt med unikke øvelser til flere arbejdsark med både Identisk og Lignende tilstand. Pak 10–20 find den ulige arbejdsark per pakke med facit inkluderet, og sælg til 25–60 kr per sæt. Det visuelle format betyder, at hver pakke fungerer for ethvert sprogmarked uden modifikation, hvilket udvider din kundebase globalt.',
        platform: 'Etsy (etsy.dk)',
      },
      {
        title: 'Visuelle diskriminerings-arbejdsbøger på Amazon KDP',
        description:
          'Saml 40–80 find den ulige arbejdsark til en trykt arbejdsbog formateret til Amazon KDP. Strukturér din bog med progressiv sværhed: tidlige kapitler bruger Identisk tilstand (find den der ikke er klon), mellemkapitler bruger Lignende tilstand med åbenlyse temakontraster, og avancerede kapitler bruger Lignende tilstand med subtilere distinktioner. Brug tilstandstilsidesættelse per øvelse til at oprette blandede sværhedssider, der udfordrer brugerne til at skifte mellem visuelle strategier. Inkluder facit i slutningen med det automatisk genererede rød-cirkel-facit. Gråtoneomskifteren producerer blækvenlige sider til sort-hvide bogsindersider.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Produktlinje kritisk tænkning-aktiviteter til Gumroad',
        description:
          'Byg færdige find den ulige arbejdsark med navn- og datofelter, øvelsesnumre og trykte facit. Købere, der søger på Gumroad efter kritisk tænkning-aktiviteter, værdsætter arbejdsark, der ankommer produktlinjefærdige — navnefeltet sikrer sporbarhed, øvelsesnumre gør klassediskussion effektiv, og det røde cirkel-facit sparer bedømmelsestid. Opret produktkatalogtilpassede sæt: dyreklassificeringsudfordringer, madgruppediskriminering, samfundshjælperidentifikation og sæsonbevidstheds­puslespil. Hvert sæt inkluderer arbejdsark og facit i både PDF- og JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sæsonbetonede og højtidspuslespil-samlinger',
        description:
          'De 104 tematiske billedsamlinger dækker enhver sæson- og højtidslejlighed — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Opret tidsbegrænsede find den ulige-samlinger, der falder sammen med topindkøbsperioder. Udgiv halloween-puslespilspakker i september, julesamlinger i oktober og valentinsdag-pakker i januar. Bland Identisk og Lignende tilstand inden for hvert sæsonsæt for variation og oplevet værdi. Sæsonprodukter motiverer højere priser under deres topvinduer og generator naturlige grunde til genkøb.',
        platform: 'Etsy / Amazon KDP / Gumroad (sæsonbetonet)',
      },
      {
        title: 'Global markedsappel med visuelle puslespil',
        description:
          'Fordi find den ulige arbejdsark er helt visuelle — ingen tekst vises på selve puslespillet — fungerer hvert arbejdsark på ethvert sprog uden modifikation. Den automatisk genererede overskrift oversættes til alle 11 understøttede sprog, men puslespilsindholdet kræver nul lokalisering. Dette gør find den ulige arbejdsark unikt effektive for sælgere, der retter sig mod internationale markeder. Opret et sæt arbejdsark og list dem i flere sprogspecifikke Etsy-butikker eller Amazon KDP-markedspladser. Samme produkt betjener ethvert marked samtidig.',
        platform: 'Etsy / Amazon KDP (globalt marked)',
      },
    ],
  },

  faq: [
    {
      question: 'Kan jeg sælge disse logikopgaver på Etsy?',
      answer:
        'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge dine "hvad passer ikke?"-opgaver som digitale downloads på Etsy.dk, som trykte aktivitetsbøger på Amazon KDP, eller via enhver anden salgskanal. Det danske marked med 5,8 millioner dansktalende har næsten ingen printbare klassifikationsopgaver, hvilket giver lav konkurrence. De to tilstande og 104 tematiske billedsamlinger giver dig værktøjerne til at producere originale logikopgaver til salg.',
    },
    {
      question: 'Hvordan laver jeg "hvad passer ikke?"-opgaver?',
      answer:
        'Vælg en tilstand: Identisk tilstand viser tre ens billeder og ét, der passer ikke — perfekt til visuel klassifikation. Lignende tilstand henter tre billeder fra ét tema og ét fra et andet til temaovergribende logisk tænkning. Vælg temaer fra de 104 billedsamlinger, indstil 5–10 øvelser per side og klik Generer. Eksporter som printklare PDF\'er med 300 DPI — klar til salg.',
    },
    {
      question: 'Er opgaverne egnede til børnehaveklasse, indskoling og mellemtrin?',
      answer:
        'Ja. Identisk tilstand er ideel til børnehaveklasse og indskoling (0.–3. klasse), hvor børn træner grundlæggende klassifikation og logisk tænkning ved at finde den, der ikke hører til. Lignende tilstand med subtile temadistinktioner udfordrer elever på mellemtrin (4.–6. klasse) til at kategorisere og tænke abstrakt. Tilsidesæt tilstanden per øvelse for at blande sværhedsgrader på ét opgaveark.',
    },
    {
      question: 'På hvor mange sprog fungerer opgaverne?',
      answer:
        'Opgaverne er rent visuelle — ingen tekst vises på selve opgavearket. Et opgaveark oprettet på dansk fungerer identisk på alle 11 understøttede sprog (dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk). Kun overskriften "Find den der ikke hører til" oversættes. Én PDF kan sælges globalt uden oversættelse.',
    },
    {
      question: 'Er facitlisten inkluderet?',
      answer:
        'Ja. Generatoren opretter automatisk en facitliste med en rød cirkel tegnet rundt det billede, der ikke passer, i hver øvelsesrække. Cirklens stregbredde skaleres dynamisk med billedstørrelse for tydelig synlighed. Download facit som separat JPEG eller PDF med fire dedikerede downloadknapper.',
    },
    {
      question: 'Hvad er forskellen mellem Identisk og Lignende tilstand?',
      answer:
        'Identisk tilstand placerer tre kloner af det samme billede ved siden af ét anderledes billede — børn finder den, der ikke er dublet. Lignende tilstand henter tre billeder fra Tema A og ét fra Tema B — børn identificerer den tematiske afviger. Identisk er lettere og træner visuel klassifikation. Lignende er sværere og kræver logisk tænkning om kategorier.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — begge tilstande, per-øvelse-tilsidesættelser, konfigurerbart øvelsesantal, automatisk facit med røde cirkler, hele billedbiblioteket, baggrunds- og rammetemaer og alle downloadformater — uden at oprette en konto, indtaste kreditkort eller installere software. Downloads fra den gratis prøveversion indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket og giver fulde salgsrettigheder.',
    },
    {
      question: 'Kan jeg tilføje navn- og datofelter?',
      answer:
        'Ja. Slå fluebenet "Inkluder Navn/Dato-felter" til i panelet Øvelseskonfiguration for at tilføje navn- og datolinjer. Du kan også aktivere øvelsesnumre på venstre side af hvert kort. Begge funktioner gør opgavearkene klar til brug i indskoling og børnehaveklasse uden yderligere forberedelse.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'manglende-brikker-arbejdsark',
      anchorText: 'Manglende Brikker Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'sudoku-arbejdsark',
      anchorText: 'Billedsudoku Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'billedsti-arbejdsark',
      anchorText: 'Billedsti Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'skygge-match-arbejdsark',
      anchorText: 'Skyggematchning Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'find-og-tael-arbejdsark',
      anchorText: 'Find og Tæl Arbejdsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'puslespil-logik-pakke',
      anchorText: 'Puslespil og Logik Pakke — Alle Puslespilsapps i Én',
    },
    {
      pageType: 'guide',
      slug: 'skab-find-den-forkerte-puslespil',
      anchorText: 'Sådan Opretter du Find den Ulige Puslespil, der Sælger',
    },
    {
      pageType: 'idea',
      slug: 'foerskole-printbare-ideer',
      anchorText: 'Visuel Diskriminering printbare idéer for arbejdsark',
    },
    {
      pageType: 'idea',
      slug: '1-klasse-printbare-ideer',
      anchorText: '1. klasse printbare idéer for grundskolen',
    },
    {
      pageType: 'idea',
      slug: '2-klasse-printbare-ideer',
      anchorText: '2. klasse printbare idéer for voksende brugere',
    },
    {
      pageType: 'start',
      slug: 'amazon-kdp-aktivitetsboeger',
      anchorText: 'Udgiv Aktivitetsbøger på Amazon KDP',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/danish/odd%20one%20out/Find%20den%20Ulige%201.webp',
      primaryAlt: 'Hvad passer ikke opgave til print med fire billeder per række til logisk tænkning og klassifikation',
    },
    sampleGallery: [
      {
        src: '/samples/danish/odd%20one%20out/Find%20den%20Ulige%201.webp',
        alt: 'Logisk tænkning opgave med tre dyr og ét madobjekt — find den der ikke hører til',
        caption: 'Lignende tilstand — tre billeder fra ét tema og ét, der passer ikke, fra et andet',
      },
      {
        src: '/samples/danish/odd%20one%20out/Find%20den%20Ulige%202.webp',
        alt: 'Klassifikation opgaveark med tre identiske billeder og ét anderledes billede per række',
        caption: 'Identisk tilstand — tre ens billeder og ét, der ikke hører til',
      },
      {
        src: '/samples/danish/odd%20one%20out/Find%20den%20Ulige%203.webp',
        alt: 'Facitliste til hvad passer ikke opgave med røde cirkler rundt det billede, der ikke passer',
        caption: 'Automatisk facit — røde cirkler markerer det billede, der passer ikke, i hver række',
      },
    ],
    youtubeId: '0R6WFUfY7Mk',
    videoTitle: 'Lav "hvad passer ikke?"-opgaver til logisk tænkning — trin-for-trin guide',
  },
};

export default content;
