import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'skyggeleg opgave til print',
    secondaryKeywords: [
      'skygger og figurer opgave',
      'silhuetter forbinde',
      'skygge-parring opgave',
      'skyggeleg børnehaveklasse',
    ],
    lsiKeywords: [
      'skygge',
      'silhuet',
      'parring',
      'figurer',
      'børnehaveklasse',
      'indskoling',
    ],
    titleTag: 'Skyggeleg opgave til print | Generator silhuet-parring',
    metaDescription: 'Lav skyggeleg-opgaver med billeder og silhuetter. Automatisk facit, 300 DPI PDF. Prøv gratis.',
  },

  hero: {
    title: 'Skyggeleg opgave til print — Generator til silhuet-parring og skygge-matchning',
    tagline: 'To parringstilstande i én generator — Skygge-parring opretter automatisk sorte silhuetter fra ethvert billede, Gør Den Hel deler billeder i halvdele — begge med Fisher-Yates-derangering, der sikrer ingen trivielle matchninger, automatisk facit og 104 tematiske billedsamlinger.',
    description:
      'Lav professionelle skyggeleg-opgaver til print, hvor børn forbinder farvede billeder med deres silhuetter eller genforbinder delte billedhalvdele. Det danske marked for printbare opgaveark (5,8 mio. dansktalende, Etsy.dk, lav konkurrence) er perfekt for sælgere af skygge-parringsøvelser til børnehaveklasse, indskoling (0.–3. klasse) og mellemtrin (4.–6. klasse). Skygge-parring-tilstanden placerer 4 farvede billeder mærket A, B, C, D i den øvre række og 4 automatisk genererede sorte silhuetter mærket 1, 2, 3, 4 i den nedre række — silhuetterne oprettes gennem billedbehandling på pixelniveau, der konverterer hver pixel til rent sort for at bevare hvert billedes præcise konturprofil. Gør Den Hel-tilstanden deler billeder i halvdele med horisontal eller vertikal klipretning, mærker første halvdele A–D og anden halvdele 1–4. Begge tilstande bruger Fisher-Yates-derangering for at garantere, at intet billede vises i sin oprindelige position, hvilket skaber ægte matchningsudfordringer hver gang. Slå vis/skjul etiketter til for A/B/C/D og 1/2/3/4 identifikatorer, tilføj valgfri navn- og datofelter, og generer automatisk facit, der viser hver korrekt bogstav-til-nummer-parring. Resultatet er rent visuelt uden lokaliseret ordindhold, så det samme skyggeleg-opgaveark fungerer identisk på alle markeder uden oversættelse. Fuld Adgang låser op for alle 104 temaer med mere end 3.100 illustrationer og alle 11 brugerfladesprog. Tilføj baggrundstemaer og rammetemaer med uafhængige opacitetskontroller, inkluder brugerdefineret tekst med syv skrifttypemuligheder, og eksporter printklare PDF\'er og JPEG-billeder med 300 DPI i Letter, A4, Kvadrat (1200×1200) eller brugerdefinerede størrelser. Uanset om du sælger skyggeleg-pakker på Etsy.dk, sammensætter silhuet-parrings­bøger til Amazon KDP eller opretter figur-matchningsaktiviteter til Gumroad — denne generator leverer produktionsklare opgaveark på få minutter. Gratis prøveversion med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  howItWorks: {
    title: 'Sådan laver du skyggeleg-opgaver i 5 trin',
    steps: [
      {
        title: 'Indstil sidelayoutet',
        description:
          'Åbn panelet Sideopsætning og vælg en sidestørrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) eller en brugerdefineret dimension. Vælg en sidefarve med farvevælgeren som reservebaggrund. Vælg et baggrundstema og juster dets opacitet (0–1 i 0,05-trin), vælg derefter et rammetema med sin egen uafhængige opacitetskontrol. Disse layoutvalg rammer dit skyggematchnings arbejdsark ind, før du konfigurerer noget indhold.',
      },
      {
        title: 'Vælg øvelsestilstand og konfigurer muligheder',
        description:
          'Åbn panelet Øvelseskonfiguration og vælg din tilstand: Skyggematchning eller Gør Den Hel. Skyggematchning genererer sorte silhuetter fra dine valgte billeder med billedbehandling på pixelniveau. Gør Den Hel deler billeder i halvdele — vælg horisontal (øvre/nedre) eller vertikal (venstre/højre) klipretning med radioknapperne, der vises i denne tilstand. Slå fluebenet \"Vis Etiketter\" (standard TIL) til for at vise A/B/C/D og 1/2/3/4 identifikatorer på arbejdsarket. Slå \"Inkluder Navn/Dato-felter\" til for at tilføje navn- og datolinjer.',
      },
      {
        title: 'Vælg 4 billeder fra biblioteket',
        description:
          'Åbn panelet Billedbibliotek og gennemse 104 tematiske samlinger med mere end 3.100 farverige illustrationer — dyr, mad, køretøjer, natur, højtider og snesevis flere. Filtrer efter tema med dropdownen eller søg med nøgleord. Klik på billeder for at vælge dem — tælleren viser din fremgang mod de nødvendige 4 billeder. En forhåndsvisning af valgte billeder bekræfter dine valg før generering. Du kan også uploade egne PNG-, JPG- eller GIF-billeder med panelet Upload Egne Billeder.',
      },
      {
        title: 'Generer skyggematchnings arbejdsarket',
        description:
          'Klik på Generer for at oprette matchningsarbejdsarket. I Skyggematchning-tilstanden behandler appen hvert billede på pixelniveau — indlæser det til et lærred, udtræk pixeldata via getImageData og konverterer hver pixel med alfa > 10 til rent sort (R=0, G=0, B=0, A=255) for at producere korrekte silhuetter. I Gør Den Hel-tilstanden deles billederne langs den valgte klipretning. Begge tilstande anvender Fisher-Yates-derangering for at garantere, at intet objekt vises i sin oprindelige position. En stiliseret overskrift vises med ravgul baggrund (#FFC107), hvid pillecontainer og 3px ravgul ramme, der viser \"Skyggematchning\" og instruktioner på det valgte sprog.',
      },
      {
        title: 'Generer facit og download',
        description:
          'Skift til fanen Facit for at se det automatisk genererede facit. I Skyggematchning-tilstanden viser hver celle originalbilledet ved siden af dets silhuet med en etiket som \"A → 2\", der angiver den korrekte matchning. I Gør Den Hel-tilstanden viser hver celle det komplette originalbillede med sin matchningsetiket. Download begge versioner med fire dedikerede knapper: Arbejdsark-JPEG, Facit-JPEG, Arbejdsark-PDF og Facit-PDF med 300 DPI. Slå gråtone til for blækvenlige versioner. Hver eksport er produktionsklar til Etsy-annoncer, Amazon KDP-indersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nøglefunktioner i skyggeleg-generatoren',
    features: [
      {
        title: 'Automatisk genererede silhuetter via billedbehandling på pixelniveau',
        description:
          'Skyggematchning-tilstanden opretter sorte silhuetter gennem ægte pixelniveau-manipulation — ikke CSS-filtre eller forudfremstillede aktiver. Appen indlæser hvert billede til et lærred, udtræk pixeldata med getImageData og konverterer hver pixel med en alfaværdi større end 10 til rent sort (R=0, G=0, B=0, A=255). Dette bevarer den præcise gennemsigtighedsprofil for hvert billede og producerer korrekte silhuetkonturer, der afspejler fine detaljer som dyreører, køretøjsformer og objektkonturer. CORS-håndtering sikrer, at billeder fra andre oprindelser behandles korrekt, med en reserve til en solid sort rektangel, hvis lærredet er kontamineret.',
      },
      {
        title: 'To øvelsestilstande: Skyggematchning og Gør Den Hel med klipretningsvalg',
        description:
          'Én generator leverer to distinkte visuelle matchningsaktiviteter. Skyggematchning-tilstanden placerer 4 farvede billeder i den øvre række og 4 automatisk genererede silhuetter i den nedre række — brugerne identificerer hvert billede udelukkende ud fra dets konturform. Gør Den Hel-tilstanden deler 4 billeder i halvdele og præsenterer første halvdele og anden halvdele separat — brugerne genforbinder delene for at fuldende hvert billede. I Gør Den Hel-tilstanden, vælg horisontal klipretning (øvre/nedre halvdele) eller vertikal klipretning (venstre/højre halvdele). Layoutet tilpasser sig automatisk: liggende sider bruger 2 rækker × 4 objekter, stående sider bruger 2 kolonner × 4 objekter.',
      },
      {
        title: 'Derangeringsalgoritme, der sikrer ingen trivielle matchninger',
        description:
          'Begge øvelsestilstande bruger en Fisher-Yates-derangeringsalgoritme, der garanterer, at intet objekt vises i sin oprindelige position. I Skyggematchning-tilstanden sidder ingen silhuet direkte under sit matchende billede. I Gør Den Hel-tilstanden vises ingen anden halvdel ved siden af sin matchende første halvdel. Dette eliminerer muligheden for, at brugerne gætter korrekt baseret udelukkende på position og sikrer, at hvert arbejdsark præsenterer en ægte matchningsudfordring. Derangeringen beregnes på ny ved hver generering, hvilket producerer forskellige arrangementer fra det samme billedsæt.',
      },
      {
        title: 'Automatisk genereret facit med bogstav-til-nummer matchningsetiketter',
        description:
          'Hvert skyggematchnings arbejdsark genererer automatisk en ledsagende facitliste på en separat lærredsfane. Facit bruger et gitterlayout, hvor hver celle viser originalbilledet ved siden af dets silhuet eller komplette billede, mærket med den korrekte matchning som \"A → 2\". Gitteret bruger 4 kolonner med 50px mellemrum før den anden række og 15px vertikal afstand mellem elementer. Ingen manuel facitoprettelse — facit forbliver synkroniseret med arbejdsarket. Download det separat som answer_key.jpeg eller answer_key.pdf ved siden af arbejdsarket.',
      },
      {
        title: 'Billedbibliotek med 104 tematiske samlinger og mere end 3.100 illustrationer',
        description:
          'Gennemse 104 tematiske billedsamlinger, der dækker dyr, mad, køretøjer, natur, erhverv, højtider, sport, årstider og snesevis flere. Hvert tema giver farverige illustrationer, der producerer distinkte silhuetter med genkendelige konturer — dyreformer, køretøjsprofiler og objektkonturer, der udfordrer visuel perception. Filtrer efter tema med dropdownen eller søg efter specifikke billeder med nøgleord. Kommerciel Pakke inkluderer 10 farverige temaer til at komme i gang; Fuld Adgang låser op for alle 104 temaer for maksimal kreativ variation over begge øvelsestilstande.',
      },
      {
        title: 'Valgfri etiketter og navn/dato navnefelter',
        description:
          'Slå fluebenet \"Vis Etiketter\" (standard TIL) til for at vise A, B, C, D identifikatorer på billeder eller første halvdele og 1, 2, 3, 4 identifikatorer på silhuetter eller anden halvdele. Når etiketterne er skjult, bliver arbejdsarket en ren visuel matchningsudfordring uden bogstav-/talstøtte — ideelt til avancerede aktiviteter eller puslespilsbøger, hvor skriftlige svar ikke er nødvendige. Fluebenet \"Inkluder Navn/Dato-felter\" tilføjer navn- og datolinjer nederst på siden til produktlinjeansvar og organisation.',
      },
      {
        title: 'Trykfærdig PDF- og JPEG-eksport med 300 DPI og gråtoneomskifter',
        description:
          'Download skyggematchnings arbejdsark og facit som højopløste JPEG-billeder eller trykklare PDF-dokumenter renderet med 300 DPI (6× multiplikator, JPEG-kvalitet 1,0). Fire dedikerede downloadknapper eksporterer arbejdsark og facitfiler separat. Sidestørrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) og helt brugerdefinerede dimensioner. PDF-orientering detekteres automatisk. Slå gråtone til for blækvenlige versioner. Hver eksport er produktionsklar til digitale downloads, trykte arbejdsbøger og produktlinjeuddeling.',
      },
      {
        title: 'Fuld lærredsredigering med tekstværktøjer, justering og lagkontroller',
        description:
          'Fabric.js-lærredet giver komplet kontrol over hvert element på dit skyggematchnings arbejdsark. Træk, ændr størrelse, roter og flyt billeder, tekst og genereret indhold frit. Lagkontroller håndterer stablingsrækkefølge — flyt elementer fremad eller send dem bagud. Lås færdige elementer, mens du redigerer andre. Tilføj brugerdefineret tekst med syv skrifttypemuligheder (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar størrelse og farve, og tekstkonturbredde fra 0 til 10 med 0,5-trins granularitet. Seks justeringsmuligheder plus centrer-på-siden holder layouts præcise. Zoom fra 25% til 300% for detailarbejde. Fortryd og gentag med ubegrænset historik med Ctrl+Z og Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Sådan sælger du skyggeleg-opgaver online',
    cases: [
      {
        title: 'Tematiske skyggematchnings-pakker på Etsy.dk',
        description:
          'Opret tematiske skyggematchningspakker med de 104 billedsamlinger — dyreskyggepuslespil, køretøjssilhuetmatchning, madskyggeudfod­ringer og snesevis flere. Hvert tema giver illustrationer med distinkte konturer, der generator engagerende silhuetaktiviteter. Pak 15–20 skyggematchnings arbejdsark per tema med facit inkluderet, og sælg til 25–60 kr per pakke. Bland begge tilstande inden for en enkelt pakke: Skyggematchnings arbejdsark til silhuetgenkendelse og Gør Den Hel-arbejdsark til rumligt ræsonnement. De automatisk genererede silhuetter og facit eliminerer de mest tidskrævende dele af produktionen.',
        platform: 'Etsy (etsy.dk)',
      },
      {
        title: 'Visuel perceptions-arbejdsbøger på Amazon KDP',
        description:
          'Saml 50–80 skyggematchnings arbejdsark til en trykt arbejdsbog formateret til Amazon KDP. Strukturér din bog med alternerende kapitler: Skyggematchningskapitler bygger silhuetgenkendelse, mens Gør Den Hel-kapitler udvikler rumlig bevidsthed og del-til-hel-ræsonnement. Inkluder både horisontal og vertikal klipretning i Gør Den Hel-afsnittene for variation. Placer facit i slutningen af bogen med den automatisk genererede facitfunktion. Gråtoneomskifteren producerer blækvenlige sider klar til sort-hvide bogsindersider. Visuelle perceptionspuslespilsbøger klarer sig godt året rundt i aktivitetsbogskategorien.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Produktlinje hurtigsluts-aktiviteter til Gumroad',
        description:
          'Byg færdige skyggematchningsaktiviteter med navn/dato-felter og trykte facit til produktlinjebrug. Købere, der søger efter visuel diskriminationsøvelse, værdsætter arbejdsark, der ankommer trykklare med facit. Opret produktkatalogtilgrænsende sæt: dyreskyg­gematchning til naturfagsenheder, samfundshjælper-silhuetter til samfundsfag, madskyggepuslespil til ernæringslektioner. Etiketomskifteren lader dig oprette støttede versioner (med A/B/C/D og 1/2/3/4 etiketter) og udfordringsversioner (etiketter skjult) i det samme produkt til niveauinddelte produktpakker.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sæsonbetonede skyggematchnings-samlinger',
        description:
          'De 104 tematiske billedsamlinger dækker enhver sæson- og højtidslejlighed — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Silhuetaktiviteter har særlig tiltrækningskraft under halloween, når skygge- og mysterietemaer er naturligt populære. Opret tidsbegrænsede skyggematchnings-samlinger, der falder sammen med topindkøbsperioder. Inkluder både Skyggematchning og Gør Den Hel-arbejdsark i hvert sæsonsæt for maksimal værdi og variation. Sæsonprodukter motiverer højere priser under deres topvinduer.',
        platform: 'Etsy / Amazon KDP / Gumroad (sæsonbetonet)',
      },
      {
        title: 'Blandet tilstands puslespilspakker som premiumpakker',
        description:
          'Kombinér begge øvelsestilstande til premiumpakker med blandet tilstand, der viser generatorens alsidighed. Hver pakke inkluderer Skyggematchnings arbejdsark (silhuetgenkendelse), Gør Den Hel-arbejdsark med horisontale klip (øvre/nedre genmontering) og Gør Den Hel-arbejdsark med vertikale klip (venstre/højre genmontering) — tre distinkte aktivitetstyper fra et tematisk billedsæt. Denne tre-i-én-tilgang motiverer premiumpris­sætning til 60–100 kr per pakke. Facit for hvert arbejdsark inkluderes automatisk, hvilket tilføjer professionel finish, der motiverer højere oplevet værdi.',
        platform: 'Etsy / Amazon KDP (premiumpakker)',
      },
    ],
  },

  faq: [
    {
      question: 'Kan jeg sælge disse skyggeleg-opgaver på Etsy?',
      answer:
        'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge dine skyggeleg-opgaver som digitale downloads på Etsy.dk, som trykte silhuet-bøger på Amazon KDP, som ressourcer på Gumroad, eller via enhver anden salgskanal. De to parringstilstande, automatisk genererede silhuetter, derangeringsalgoritmen og 104 tematiske billedsamlinger giver stærk differentiering.',
    },
    {
      question: 'Hvordan laver jeg skyggeleg-opgaver?',
      answer:
        'Åbn generatoren, vælg en tilstand (Skygge-parring eller Gør Den Hel), vælg 4 billeder fra de 104 temaer, og klik Generer. I Skygge-parring oprettes sorte silhuetter automatisk. I Gør Den Hel deles billeder i halvdele (horisontal eller vertikal). Opgavearket med automatisk facit er klar til eksport som 300 DPI PDF eller JPEG på få minutter.',
    },
    {
      question: 'Er de egnede til børnehaveklasse, indskoling og mellemtrin?',
      answer:
        'Ja. Til børnehaveklasse: brug Skygge-parring med etiketter (A/B/C/D og 1/2/3/4) for guidet figurgenkendelse. Til indskoling (0.–3. klasse): brug Gør Den Hel med horisontale klip for rumlig bevidsthed. Til mellemtrin (4.–6. klasse): skjul etiketterne for avanceret visuel diskriminering, eller brug vertikale klip for sværere del-til-hel-ræsonnement.',
    },
    {
      question: 'På hvor mange sprog fungerer opgaverne?',
      answer:
        'Skyggeleg-opgaverne er rent visuelle — kun billeder, silhuetter og delte halvdele, ingen tekst — så de fungerer på ethvert sprog uden oversættelse. Grænsefladen understøtter 11 sprog (dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk), men selve opgavearket er identisk uanset sprogvalg. Ét produkt kan sælges globalt.',
    },
    {
      question: 'Er facitlisten inkluderet?',
      answer:
        'Ja. Dobbeltlærredssystemet genererer automatisk en facitliste. I Skygge-parring viser facit originalbilledet ved siden af dets silhuet med etiketter som \"A → 2\". I Gør Den Hel vises det komplette billede med sin matchningsetiket. Download facit separat som Facit-JPEG eller Facit-PDF med 300 DPI.',
    },
    {
      question: 'Hvad er de to parringstilstande?',
      answer:
        'Skygge-parring placerer 4 farvede billeder i den øvre række og 4 automatisk genererede sorte silhuetter i den nedre række — børnene forbinder hvert billede med dets skygge. Gør Den Hel deler 4 billeder i halvdele og præsenterer første og anden halvdele separat — børnene matcher halvdele for at fuldende hvert billede. Begge tilstande bruger Fisher-Yates-derangering, der sikrer ingen trivielle matchninger.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — begge tilstande, automatiske silhuetter, klipretningsvalg, facit, hele billedbiblioteket, baggrunds- og rammetemaer, etiketomskifter, navn/dato-felter og alle downloadformater — uden at oprette en konto, indtaste kreditkort eller installere software. Downloads indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket.',
    },
    {
      question: 'Hvad er returpolitikken?',
      answer:
        'Fordi den gratis prøveversion giver dig adgang til alle funktioner, tilbyder vi ingen refusioner på køb af kommercielle licenser. Du kan teste begge tilstande, silhuetter, facit, hele billedbiblioteket og alle downloadformater, før du køber. Den gratis prøveversion er returpolitikken.',
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
      slug: 'bingo-arbejdsark',
      anchorText: 'Billedbingo Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'billedsortering-arbejdsark',
      anchorText: 'Billedsortering Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'malebog-arbejdsark',
      anchorText: 'Malebog Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'find-objekterne-arbejdsark',
      anchorText: 'Find Objekterne Arbejdsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'matchning-sortering-pakke',
      anchorText: 'Matchning og Sortering Pakke — Alle Matchningsapps i Én',
    },
    {
      pageType: 'idea',
      slug: 'foerskole-printbare-ideer',
      anchorText: 'Førskole printbare idéer for tidlige brugere',
    },
    {
      pageType: 'idea',
      slug: 'boernehaveklasse-printbare-ideer',
      anchorText: 'Børnehaveklasse printbare idéer for unge brugere',
    },
    {
      pageType: 'start',
      slug: 'printbar-forretning-plan',
      anchorText: 'Din Printbar Forretning Plan',
    },
    {
      pageType: 'guide',
      slug: 'skab-skyggematchnings-arbejdsark',
      anchorText: 'Sådan Opretter du Skyggematchnings Arbejdsark, der Sælger',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/danish/shadow%20match/G%C3%B8r%20Billederne%20Hele%201.webp',
      primaryAlt: 'Skyggeleg opgave til print med farvede billeder og sorte silhuetter til parring i børnehaveklasse',
    },
    sampleGallery: [
      {
        src: '/samples/danish/shadow%20match/Gør%20Billederne%20Hele%201.webp',
        alt: 'Skygge-parring opgave med fire farvede billeder og fire sorte silhuetter til forbindelse i børnehaveklasse',
        caption: 'Skygge-parring — børnene forbinder billeder med deres automatisk genererede silhuetter',
      },
      {
        src: '/samples/danish/shadow%20match/Gør%20Billederne%20Hele%202.webp',
        alt: 'Gør den hel opgave med delte billedhalvdele som børnene kobler sammen til indskoling',
        caption: 'Gør Den Hel-tilstand — børnene matcher delte billedhalvdele for at fuldende figurerne',
      },
      {
        src: '/samples/danish/shadow%20match/Gør%20Billederne%20Hele%203.webp',
        alt: 'Facitliste til skyggeleg med originalbilleder, silhuetter og korrekte bogstav-til-nummer parringsetiketter',
        caption: 'Automatisk facit — bogstav-til-nummer etiketter viser korrekte skygge-parringer',
      },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: 'Sådan laver du skyggeleg-opgaver med silhuet-parring og delte billeder — trin-for-trin guide',
  },
};

export default content;
