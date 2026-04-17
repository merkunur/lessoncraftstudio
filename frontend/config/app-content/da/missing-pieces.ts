import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'puslespil manglende brikker til print',
    secondaryKeywords: [
      'hvilken brik passer opgave',
      'puslespil opgaveark',
      'visuel logik opgave',
      'puslespilsbrikker finde',
    ],
    lsiKeywords: [
      'puslespil',
      'brikker',
      'logik',
      'visuel',
      'indskoling',
      'facit',
    ],
    titleTag: 'Puslespil manglende brikker til print | Generator visuel logik',
    metaDescription: 'Lav opgaver med "manglende brikker" med temabilleder og automatisk facit. 300 DPI PDF printklare. Prøv gratis.',
  },

  hero: {
    title: 'Puslespil manglende brikker til print — Generator til visuel logik-opgaver',
    tagline: 'Generer puslespil-opgaver, hvor brikker klippes ud fra billeder, og børnene finder den korrekte nummererede brik — med 6 brikformer, 1–5 manglende brikker, 2–6 løsningsalternativer inkl. distraktorer, automatisk facit og visuelt design, der fungerer på alle sprog.',
    description:
      'Lav professionelle puslespil-opgaver med manglende brikker til print, hvor et billede har huller klippet ud, og børnene identificerer, hvilken nummereret brik der udfylder hvert hul. Det danske marked for printbare opgaveark (5,8 mio. dansktalende, Etsy.dk, lav konkurrence) er oplagt for sælgere af visuel logik-opgaver til børnehaveklasse, indskoling (0.–3. klasse) og mellemtrin (4.–6. klasse). Den smarte brikekstraktionsalgoritme finder visuelt distinkte områder med tilstrækkelig farvevarians, hvilket sikrer, at hvert puslespil er løseligt og engagerende. Vælg blandt 6 brikformer — firkant, cirkel, rektangel stående, rektangel liggende, ellipse stående og ellipse liggende — og konfigurer sværhedsgraden med 1–5 manglende brikker og 2–6 løsningsalternativer, der inkluderer distraktorbrikker for at udfordre visuel logik. Hvert puslespil inkluderer et automatisk genereret facit med gulmarkerede nummertiketter placeret inde i hvert hul, der viser det korrekte alternativ. Puslespillene er rent visuelle uden lokalt afhængigt indhold, så hvert puslespil fungerer identisk verden over — samme puslespil kan sælges globalt uden oversættelse. Fuld Adgang låser op for alle 104 temaer med mere end 3.100 illustrationer og alle 11 brugerfladesprog. Tilføj baggrundstemaer og rammetemaer med uafhængige opacitetskontroller, og eksporter printklare PDF\'er og JPEG-billeder med 300 DPI i Letter, A4, Kvadrat eller brugerdefinerede størrelser. Uanset om du sælger puslespil-pakker på Etsy.dk, sammensætter visuel logik-bøger til Amazon KDP eller opretter kritisk tænkning-aktiviteter til Gumroad — denne generator leverer produktionsklare opgaveark på få minutter. Gratis prøveversion med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  ctaHeading: 'Lav puslespil med manglende brikker',

  howItWorks: {
    title: 'Sådan laver du puslespil med manglende brikker i 5 trin',
    steps: [
      {
        title: 'Indstil sidelayoutet',
        description:
          'Åbn panelet Sideopsætning og vælg en sidestørrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) eller en brugerdefineret dimension. Vælg en sidefarve med farvevælgeren som reservebaggrund. Vælg et baggrundstema og juster dets opacitet (0–1 i 0,05-trin), vælg derefter et rammetema med sin egen uafhængige opacitetskontrol. Disse layoutvalg rammer dit manglende brikker-puslespil ind, før du konfigurerer noget indhold.',
      },
      {
        title: 'Konfigurer puslespillet',
        description:
          'Åbn panelet Puslespilskonfiguration og indstil antallet af manglende brikker fra 1 til 5 — dette kontrollerer, hvor mange huller der klippes ud af billedet. Indstil antallet af løsningsalternativer fra 2 til 6, som inkluderer de korrekte brikker plus distraktorbrikker, der øger sværheden. Vælg en brikform blandt 6 muligheder: firkant (standard), cirkel, rektangel stående, rektangel liggende, ellipse stående eller ellipse liggende. Hver form generator en anderledes visuel udfordring.',
      },
      {
        title: 'Vælg et billede fra biblioteket eller upload et eget',
        description:
          'Åbn panelet Billedbibliotek og gennemse 104 tematiske samlinger med mere end 3.100 farverige illustrationer — dyr, mad, køretøjer, natur, højtider og snesevis flere. Filtrer efter tema med dropdownen eller søg med nøgleord. Klik på et billede for at vælge det som kilde til dit puslespil. Du kan også uploade egne PNG-, JPG- eller GIF-billeder med panelet Upload Egne Billeder for fuldstændig kreativ frihed med dine puslespilsdesigns.',
      },
      {
        title: 'Generer puslespillet',
        description:
          'Appen klipper automatisk huller ud af det valgte billede med smart brikekstraktion. Algoritmen forsøger op til 150 placeringsforøg for at finde brikker med tilstrækkelig farvevarians (mindste lysstyrke­varians på 15) og mindst 250 pixels afstand mellem brikker for at forhindre overlap. Hvide huller med sort kontur (2px) vises på de oprindelige placeringer. Nummererede løsningsalternativer — korrekte brikker plus distraktorer — vises med gulmarkerede nummertiketter. Stående layouts placerer puslespilsbilledet øverst med alternativerne nedenfor; liggende layouts deler visningen 50/50.',
      },
      {
        title: 'Generer facit og download',
        description:
          'Skift til fanen Facit for at se det automatisk genererede facit. Samme puslespilsbillede vises med huller, og gulmarkerede nummertiketter (rgba(255,255,0,0.7)) inde i hvert hul viser det korrekte alternativindeks. Download begge versioner med fire dedikerede knapper: Arbejdsark-JPEG, Facit-JPEG, Arbejdsark-PDF og Facit-PDF — alle renderet med 300 DPI og JPEG-kvalitet 1,0. Slå gråtone til for blækvenlige versioner. Hver eksport er produktionsklar til Etsy-annoncer, Amazon KDP-indersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nøglefunktioner i puslespil-generatoren',
    features: [
      {
        title: 'Puslespilslignende manglende brikker-puslespil med konfigurerbar sværhed',
        description:
          'Opret puslespil, hvor et billede har huller klippet ud, og brugerne identificerer, hvilket nummereret alternativ der udfylder hvert hul. Konfigurer sværhedsgraden med to uafhængige kontroller: indstil 1–5 manglende brikker for at kontrollere puslespilskompleksiteten, og indstil 2–6 løsningsalternativer for at kontrollere, hvor mange valg brugerne evaluerer. Flere manglende brikker betyder mere rumligt ræsonnement; flere løsningsalternativer (inkl. distraktorer) betyder skarpere visuel diskriminering. Dette toakslede sværhedssystem lader dig oprette puslespil, der spænder fra simpel enkeltbriksidentifikation til komplekse flerbriks­udfordringer.',
      },
      {
        title: 'Seks brikformer: Firkant, Cirkel, Rektangel og Ellipsevarianter',
        description:
          'Vælg blandt 6 distinkte brikformer, der ændrer den visuelle karakter af hvert puslespil. Firkant (standard) og cirkel tilbyder rene geometriske udklip. Rektangel stående og rektangel liggende generator aflange huller med forskellige orienteringer — stående bruger 80% bredde og 100% højde, liggende bruger 100% bredde og 80% højde. Ellipse stående og ellipse liggende tilbyder blødere kurvede udklip med de samme dimensionsforhold. Hver form interagerer anderledes med kildebilledet, hvilket generator unikke identifikationsudfordringer, selv når den samme underliggende illustration bruges.',
      },
      {
        title: 'Smart brikekstraktion med farvevariansdetektering',
        description:
          'Brikekstraktionsalgoritmen sikrer, at hvert puslespil er visuelt løseligt og engagerende. Den forsøger op til 150 placeringsforøg for at finde brikker med en mindste lysstyrke­varianstærskel på 15 — hvilket garanterer, at hver ekstraheret brik indeholder tilstrækkelig visuel detalje til at være identificerbar. Brikker opretholder mindst 250 pixels afstand fra hinanden for at forhindre overlap. Distraktorbrikker genereres med op til 200 forsøg hver, hvilket sikrer, at de kommer fra ikke-overlappende områder af billedet. Denne smarte ekstraktion producerer konsekvent højkvalitets puslespil fra ethvert kildebillede.',
      },
      {
        title: 'Automatisk genereret facit med gulmarkerede nummertiketter',
        description:
          'Hvert manglende brikker-puslespil genererer automatisk en ledsagende facitliste på en separat lærredsfane. Facit viser det samme puslespilsbillede med huller og placerer gulmarkerede nummertiketter (rgba(255,255,0,0.7)) inde i hvert hul, der viser det korrekte 1-baserede alternativindeks. Skriftstørrelsen skaleres til 60% af brikstørrelsen for tydelig læsbarhed. Ingen manuel facitoprettelse nødvendig — facit forbliver perfekt synkroniseret med puslespillet. Download facit som answer_key.jpeg eller answer_key.pdf ved siden af arbejdsarket.',
      },
      {
        title: 'Nummererede løsningsalternativer med distraktorbrikker',
        description:
          'Løsningsalternativer vises i nummererede containere (1–N) med gulmarkerede nummertiketter for tydelig identifikation. Når løsningsalternativer overstiger antallet af manglende brikker, er de ekstra alternativer distraktorbrikker — ekstraheret fra forskellige områder af det samme billede, som ikke matcher noget hul. Distraktorer tvinger brugerne til omhyggeligt at sammenligne visuelle detaljer i stedet for simpelthen at matche ved eliminering. Stående arbejdsark arrangerer alternativer i en enkelt horisontal række under puslespillet; liggende arbejdsark placerer dem på højre side i en horisontal række.',
      },
      {
        title: 'Billedbibliotek med 104 tematiske samlinger og mere end 3.100 illustrationer',
        description:
          'Gennemse 104 tematiske billedsamlinger, der dækker dyr, mad, køretøjer, natur, erhverv, højtider, sport, årstider og snesevis flere. Hvert tema giver farverige illustrationer, der fungerer som puslespilskilder — billeder med varierede farver og distinkte regioner producerer de mest engagerende manglende brikker-puslespil. Filtrer efter tema med dropdownen eller søg efter specifikke billeder med nøgleord. Kommerciel Pakke inkluderer 10 farverige temaer til at komme i gang; Fuld Adgang låser op for alle 104 temaer for maksimal kreativ variation over alle puslespilsdesigns.',
      },
      {
        title: 'Trykfærdig PDF- og JPEG-eksport med 300 DPI og gråtoneomskifter',
        description:
          'Download manglende brikker-puslespil og facit som højopløste JPEG-billeder eller trykklare PDF-dokumenter renderet med 300 DPI (6× multiplikator) med JPEG-kvalitet 1,0. Fire dedikerede downloadknapper eksporterer arbejdsark og facitfiler separat. Sidestørrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) og helt brugerdefinerede dimensioner. Slå gråtone til for blækvenlige versioner, der sparer toner. Hver eksport er produktionsklar til digitale downloads, trykte arbejdsbøger og produktlinjeuddeling.',
      },
      {
        title: 'Fuld lærredsredigering med tekstværktøjer, justering og lagkontroller',
        description:
          'Fabric.js-lærredet giver komplet kontrol over hvert element på dit puslespilsarbejdsark. Træk, ændr størrelse, roter og flyt billeder, tekst og genereret indhold frit. Lagkontroller håndterer stablingsrækkefølge — flyt elementer fremad eller send dem bagud. Lås færdige elementer, mens du redigerer andre. Tilføj brugerdefineret tekst med syv skrifttypemuligheder (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar størrelse og farve, og tekstkonturbredde fra 0 til 10 med 0,5-trins granularitet. Seks justeringsmuligheder plus centrer-på-siden holder layouts præcise. Zoom fra 25% til 300% i 25%-trin for detailarbejde. Fortryd og gentag op til 50 historiktrin med Ctrl+Z og Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Sådan sælger du puslespil med manglende brikker online',
    cases: [
      {
        title: 'Tematiske manglende brikker puslespilspakker på Etsy.dk',
        description:
          'Opret tematiske puslespilspakker med de 104 billedsamlinger — dyrepuslespil, køretøjspuslespil, madpuslespil, naturpuslespil og snesevis flere. Hvert tema giver farverige illustrationer, der producerer engagerende manglende brikker-udfordringer. Pak 15–25 puslespil per tema med facit inkluderet, med varierende sværhed fra 1 manglende brik med 2 alternativer (let) til 5 manglende brikker med 6 alternativer (svær). Bland brikformer inden for en pakke for visuel variation: firkantede brikker i nogle puslespil, cirkulære brikker i andre, ellipsevarianter til avancerede udfordringer. Det automatisk genererede facit eliminerer den største tidssluger i puslespilsproduktion.',
        platform: 'Etsy (etsy.dk)',
      },
      {
        title: 'Visuelle puslespilsarbejdsbøger på Amazon KDP',
        description:
          'Saml 50–100 manglende brikker-puslespil til en trykt arbejdsbog formateret til Amazon KDP. Strukturér din bog med progressiv sværhed: Kapitel 1 bruger 1 manglende brik med 2 alternativer til begyndere, Kapitel 2 bruger 3 manglende brikker med 4 alternativer til mellemniveau, og Kapitel 3 bruger 5 manglende brikker med 6 alternativer inkl. distraktorer til avancerede løsere. Inkluder facit i slutningen af bogen med den automatisk genererede facitfunktion. Gråtoneomskifteren producerer blækvenlige sider klar til sort-hvide bogsindersider. Visuelle puslespil kræver ingen oversættelse, hvilket gør en enkelt bog salgbar på ethvert marked.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Produktlinjepuslespil-aktiviteter til Gumroad',
        description:
          'Byg færdige visuelle diskriminerings- og kritisk tænkning-aktiviteter til Gumroad. Manglende brikker-puslespil styrker rumligt ræsonnement, visuel analyse og opmærksomhed på detaljer — færdigheder, der værdsættes gennem hele børnehave- og grundskolekursusplaner. Opret produktkatalogtilpassede sæt: dyrelivsmiljø-puslespil, sæsonscene-puslespil, samfundshjælper-puslespil og madgruppe-puslespil. Hvert sæt inkluderer arbejdsark og facit i både PDF- og JPEG-format. Den konfigurerbare sværhedsgrad lader dig oprette niveauinddelte versioner af de samme puslespil til blandede produktlinjer.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sæsonbetonede og højtidspuslespil-samlinger',
        description:
          'De 104 tematiske billedsamlinger dækker enhver sæson- og højtidslejlighed — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Opret tidsbegrænsede puslespilssamlinger, der falder sammen med topindkøbsperioder. Udgiv halloween-puslespilspakker i september, julesamlinger i oktober og valentinsdag-pakker i januar. Varier brikformer og sværhedsgrader inden for hvert sæsonsæt for maksimal værdi. Sæsonprodukter motiverer højere priser under deres topvinduer og generator naturlige grunde til genkøb fra din kundebase.',
        platform: 'Etsy / Amazon KDP / Gumroad (sæsonbetonet)',
      },
      {
        title: 'Global markedsappel — visuelle puslespil kræver ingen oversættelse',
        description:
          'Manglende Brikker-puslespil er rent visuelle uden tekstindhold på selve arbejdsarket — ingen ord, ingen bogstaver, ingen lokalt afhængige elementer. Et puslespil oprettet på dansk fungerer identisk for kunder i Tyskland, Frankrig, Japan eller Brasilien. Dette gør dine puslespilsprodukter direkte salgbare på enhver international markedsplads uden at oprette separate sprogversioner. List den samme puslespilspakke på Etsy.dk med flersprogede titler og beskrivelser for at fange global søgetrafik. Ét produkt, ethvert marked — maksimal rækkevidde med nul ekstra produktionsarbejde.',
        platform: 'Globale markedspladser (alle platforme)',
      },
    ],
  },

  faq: [
    {
      question: 'Kan jeg sælge disse puslespil på Etsy?',
      answer:
        'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge dine puslespil med manglende brikker som digitale downloads på Etsy.dk, som trykte visuel logik-bøger på Amazon KDP, som ressourcer på Gumroad, eller via enhver anden salgskanal. De 6 brikformer, konfigurerbar sværhed, automatisk facit og 104 tematiske billedsamlinger giver stærk differentiering.',
    },
    {
      question: 'Hvordan laver jeg puslespil med manglende brikker?',
      answer:
        'Åbn generatoren, vælg en brikform (firkant, cirkel, rektangel eller ellipse), konfigurer antal manglende brikker (1–5) og løsningsalternativer (2–6), vælg et billede fra de 104 temaer eller upload dit eget, og klik Generer. Opgavearket med automatisk facit er klar til eksport som 300 DPI PDF eller JPEG på få minutter.',
    },
    {
      question: 'Er de egnede til børnehaveklasse, indskoling og mellemtrin?',
      answer:
        'Ja. Til børnehaveklasse: brug 1 manglende brik med 2 alternativer og firkantede brikker for simpel visuel logik. Til indskoling (0.–3. klasse): brug 3 manglende brikker med 4 alternativer for moderat udfordring. Til mellemtrin (4.–6. klasse): brug 5 manglende brikker med 6 alternativer inkl. distraktorer for avanceret visuel diskriminering.',
    },
    {
      question: 'På hvor mange sprog fungerer puslespillene?',
      answer:
        'Puslespillene er rent visuelle — ingen tekst på resultatet, kun billeder og tal — så de fungerer på ethvert sprog uden oversættelse. Grænsefladen understøtter 11 sprog (dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk), men selve opgavearket er identisk uanset sprogvalg. Ét produkt kan sælges globalt.',
    },
    {
      question: 'Er facitlisten inkluderet?',
      answer:
        'Ja. Dobbeltlærredssystemet genererer automatisk en facitliste med gulmarkerede nummertiketter placeret inde i hvert hul, der viser det korrekte alternativindeks. Download facit separat som Facit-JPEG eller Facit-PDF med 300 DPI.',
    },
    {
      question: 'Hvilke 6 brikformer er tilgængelige?',
      answer:
        'Firkant (standard), cirkel, rektangel stående, rektangel liggende, ellipse stående og ellipse liggende. Hver form skaber en anderledes visuel udfordring. Firkant og cirkel tilbyder rene geometriske udklip, mens rektangel- og ellipsevarianter giver aflange eller kurvede former, der interagerer anderledes med kildebilledet.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — alle 6 brikformer, konfigurerbare manglende brikker og løsningsalternativer, automatisk facit, hele billedbiblioteket, baggrunds- og rammetemaer og alle downloadformater — uden at oprette en konto, indtaste kreditkort eller installere software. Downloads indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket.',
    },
    {
      question: 'Hvad er returpolitikken?',
      answer:
        'Fordi den gratis prøveversion giver dig adgang til alle funktioner, tilbyder vi ingen refusioner på køb af kommercielle licenser. Du kan teste alle brikformer, sværhedsindstillinger, facit og alle downloadformater, før du køber. Den gratis prøveversion er returpolitikken.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'find-den-ulige-arbejdsark',
      anchorText: 'Find den Ulige Arbejdsark Generator',
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
      slug: 'find-og-tael-arbejdsark',
      anchorText: 'Find og Tæl Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'skygge-match-arbejdsark',
      anchorText: 'Skyggematchning Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'ordsoegning-arbejdsark',
      anchorText: 'Ordsøgning Arbejdsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'puslespil-logik-pakke',
      anchorText: 'Puslespil og Logik Pakke — Alle Puslespilsapps i Én',
    },
    {
      pageType: 'guide',
      slug: 'skab-manglende-brikker-puslespil',
      anchorText: 'Sådan Opretter og Sælger du Puslespilsarbejdsark Online',
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
      primary: '/samples/danish/missing%20pieces/manglende-dele-1.webp',
      primaryAlt: 'Puslespil manglende brikker opgave til print med huller klippet ud af et billede og nummererede brikker at finde',
    },
    sampleGallery: [
      {
        src: '/samples/danish/missing%20pieces/manglende-dele-1.webp',
        alt: 'Puslespil med manglende brikker — firkantede huller i farverig illustration til visuel logik i indskoling',
        caption: 'Firkantede brikker — rene geometriske udklip for tydelig visuel identifikation',
      },
      {
        src: '/samples/danish/missing%20pieces/manglende-dele-2.webp',
        alt: 'Hvilken brik passer opgave med cirkulære huller og nummererede løsningsalternativer inkl. distraktorer',
        caption: 'Cirkulære brikker — afrundede udklip med distraktorbrikker for øget logik-udfordring',
      },
      {
        src: '/samples/danish/missing%20pieces/manglende-dele-3.webp',
        alt: 'Facitliste til puslespil med manglende brikker — gule nummertiketter inde i hvert hul',
        caption: 'Automatisk facit — gule etiketter viser korrekt brik for hvert hul',
      },
    ],
    youtubeId: 'gb-xE_Ay4fc',
    videoTitle: 'Sådan laver du puslespil med manglende brikker — 6 brikformer og automatisk facit — trin-for-trin guide',
  },
};

export default content;
