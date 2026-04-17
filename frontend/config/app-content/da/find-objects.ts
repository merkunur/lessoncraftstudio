import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'find og markér opgave til print',
    secondaryKeywords: [
      'gemte genstande opgave',
      'søgebillede til print',
      'observationsleg opgave',
      'find og cirkel børn',
    ],
    lsiKeywords: [
      'gemte genstande',
      'søgebillede',
      'observation',
      'opmærksomhed',
      'børnehaveklasse',
      'facit',
    ],
    titleTag: 'Find og markér-generator | LessonCraftStudio',
    metaDescription: 'Lav find-og-markér opgaver med temabilleder. Automatisk facit, 300 DPI PDF. Prøv gratis — sælg på Etsy & KDP.',
  },

  hero: {
    title: 'Find og markér-generator — Lav printables at sælge på Etsy og KDP',
    tagline: 'To aktivitetstilstande i én generator — Søgning med gemte genstande og nul-overlap placering samt Find den Ulige Billede med parrede billedrækker — med automatisk facit, adaptiv billedstørrelse, navn- og datofelter og en legende, der viser genstande at finde.',
    description:
      'Lav professionelle find-og-markér opgaver til print, hvor børn søger i en billedscene for at finde og cirkle specifikke genstande. Det danske marked for printbare opgaveark (5,8 mio. dansktalende, Etsy.dk, lav konkurrence) er ideelt for sælgere af observationslege til børnehaveklasse, indskoling (0.–3. klasse) og mellemtrin (4.–6. klasse). Vælg mellem to aktivitetstilstande: Søgnings-tilstanden bruger en nul-overlapalgoritme til at sprede 1–5 gemte genstande blandt 8–12 distraktorer over siden — intet gitter, ingen rækker og kolonner, bare en sammenhængende visuel scene. En legende nederst på opgavearket viser børnene præcis, hvilke genstande de skal finde. Find den Ulige Billede-tilstanden arrangerer 8–12 parrede billeder i rækker med 1–5 uparrede genstande blandet ind — børnene identificerer billederne, der ikke har en matchende partner. Dobbeltlærredssystemet genererer både et opgaveark og en facitliste — facit tegner røde cirkler rundt gemte genstande (Søgning) eller uparrede genstande (Find den Ulige Billede), så du aldrig behøver markere dem manuelt. Generatoren er visuel: sproget påvirker brugerfladeetiketter men IKKE opgavearkets indhold, så hvert opgaveark fungerer på ethvert sprog uden lokaliserede billednavne. Fuld Adgang låser op for alle 104 temaer med mere end 3.100 illustrationer og alle 11 brugerfladesprog. Tilføj baggrundstemaer og rammetemaer med uafhængige opacitetskontroller, slå navn- og datofelter til, tilpas den automatiske overskrift med 6 skrifttypevalg, og eksporter printklare PDF\'er og JPEG-billeder med 300 DPI i Letter, A4 eller brugerdefinerede størrelser. Uanset om du sælger søgebillede-pakker på Etsy.dk, sammensætter observationsopgave-bøger til Amazon KDP eller opretter opmærksomhedsaktiviteter til Gumroad — denne generator leverer produktionsklare opgaveark på få minutter. Gratis prøveversion med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  ctaHeading: 'Lav find-og-markér-opgaver',

  howItWorks: {
    title: 'Sådan laver du find-og-markér opgaver i 5 trin',
    steps: [
      {
        title: 'Indstil sidelayoutet',
        description:
          'Åbn panelet Side og Scene og vælg en sidestørrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende eller en brugerdefineret dimension. Vælg en baggrundsfarve med farvevælgeren, vælg et baggrundstema og juster dets opacitet, vælg derefter et rammetema med sin egen uafhængige opacitetskontrol. Disse layoutvalg rammer dit skjulte objekter-arbejdsark ind, før du konfigurerer noget indhold.',
      },
      {
        title: 'Vælg din aktivitetstilstand',
        description:
          'Vælg mellem to tilstande i panelet Objektvalg. Søgnings-tilstanden (standard) opretter frie skjulte objekter-scener, hvor objekter spredes over siden med en nul-overlapalgoritme — intet gitter, bare en naturligt udseende visuel scene. Find den Ulige Billede-tilstanden arrangerer parrede billeder i rækker med uparrede objekter blandet ind til visuelle diskrimineringsaktiviteter. Hver tilstand producerer en anderledes type søg-og-find arbejdsark fra det samme billedbibliotek.',
      },
      {
        title: 'Vælg billeder og konfigurer objektantal',
        description:
          'Gennemse 104 tematiske billedsamlinger med mere end 3.100 farverige illustrationer i Billedbibliotekspanelet. Filtrer efter tema eller søg med nøgleord. I Søgnings-tilstanden, konfigurer 1–5 skjulte objekter at finde og 8–12 distraktorobjekter, der fylder scenen. I Find den Ulige Billede-tilstanden, indstil 8–12 parrede billeder og 1–5 uparrede (ulige) objekter. Du kan også uploade egne PNG-, JPG- eller GIF-billeder at bruge ved siden af bibliotekets indhold.',
      },
      {
        title: 'Generer den skjulte objekter-scene',
        description:
          'Klik på Generer for at oprette arbejdsarket. I Søgnings-tilstanden placerer nul-overlapalgoritmen hvert billede ved at teste 50 tilfældige positioner og vælge placeringen med mindst overlap, og reducerer adaptivt billedstørrelse, når pladsen bliver trang. En legende vises nederst, der viser brugerne, hvilke objekter de skal finde. I Find den Ulige Billede-tilstanden arrangeres billeder i rækker med parrede og uparrede objekter. Den automatiske overskrift renderer din titel i Fredoka-skrifttype med dekorative pillecontainere — skriftstørrelsen justeres automatisk baseret på tekstlængde.',
      },
      {
        title: 'Generer facit og download',
        description:
          'Skift til fanen Facit for at se automatisk genererede annoteringer: røde cirkler tegnet rundt skjulte objekter (Søgnings-tilstand) eller uparrede objekter (Find den Ulige Billede-tilstand), dimensioneret 3–5px større end objektet for tydelig synlighed. Download begge versioner med fire dedikerede knapper i dropdownen: Arbejdsark-JPEG, Facit-JPEG, Arbejdsark-PDF og Facit-PDF med 300 DPI. Slå gråtone til for blækvenlige versioner. Hver eksport er produktionsklar til Etsy-annoncer, Amazon KDP-indersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nøglefunktioner i find-og-markér generatoren',
    features: [
      {
        title: 'To aktivitetstilstande: Søgning Skjulte Objekter og Find den Ulige Billede',
        description:
          'Én generator dækker to distinkte aktivitetsformater. Søgnings-tilstanden opretter frie skjulte objekter-scener, hvor 1–5 målobjekter gemmer sig blandt 8–12 distraktorer i en spredt visuel scene — brugerne søger på siden og ringer ind, hvad de finder. Find den Ulige Billede-tilstanden arrangerer 8–12 parrede billeder i rækker med 1–5 uparrede objekter blandet ind — brugerne identificerer billederne uden en matchende partner. Billeder i Find den Ulige Billede-tilstanden renderes 50% større end Søgnings-tilstanden for tydelig visuel sammenligning. Hver tilstand producerer en anderledes kognitiv udfordring fra det samme billedbibliotek.',
      },
      {
        title: 'Nul-overlap scenegenerering med adaptiv billedstørrelse',
        description:
          'Søgnings-tilstanden bruger en sofistikeret placeringsalgoritme i stedet for et fast gitter. Funktionen findBestPosition() tester 50 tilfældige positioner per billede og vælger placeringen med mindst overlap. Når pladsen bliver trang, reducerer algoritmen adaptivt billedstørrelsen for at passe flere objekter uden at overbelaste scenen. Dette opretter naturligt udseende skjulte objekter-scener, hvor billeder spredes organisk over siden — langt mere engagerende end gitterbaserede alternativer, hvor objekter sidder i forudsigelige rækker og kolonner.',
      },
      {
        title: 'Automatisk genereret facit med cirkelannoteringer',
        description:
          'Hvert skjulte objekter-arbejdsark genererer automatisk en ledsagende facitliste på en separat lærredsfane. Facit gengenerator det præcise arbejdsarkslayout og tegner røde cirkler rundt de korrekte objekter — skjulte mål i Søgnings-tilstanden og uparrede objekter i Find den Ulige Billede-tilstanden. Cirkler dimensioneres 3–5px større end objektet for tydelig synlighed. Ingen manuel markering, ingen separat filoprettelse — facit er altid synkroniseret med arbejdsarket.',
      },
      {
        title: 'Legendevisning, der viser objekter at finde i Søgnings-tilstanden',
        description:
          'I Søgnings-tilstanden viser en legende i den nedre margin (120px) målobjekterne, brugerne skal finde. Denne visuelle reference fortæller brugerne præcis, hvad de skal lede efter uden skriftlige instruktioner — hvilket gør arbejdsarkene tilgængelige for førlæsere og flersprogede produktlinjer. Legenden genereres automatisk baseret på dine valgte skjulte objekter. Find den Ulige Billede-tilstanden inkluderer ingen legende, da brugerne opdager de uparrede objekter gennem visuel sammenligning snarere end en referenceliste.',
      },
      {
        title: 'Navn- og datofelter med omskifterkontrol',
        description:
          'Et flueben i panelet Tekst og Indhold tilføjer \"Navn:\" og \"Dato:\"-felter på arbejdsarket. Disse identifikationslinjer sikrer ansvarlighed til produktlinjebrug og gør arbejdsarkene professionelt formaterede til markedspladsannoncer. Slå dem til for produktlinjefærdige produkter eller fra for aktivitetsbogssider, hvor navneoplysninger vises på omslaget. Felterne renderes rent sammen med den automatisk genererede overskrift og legende.',
      },
      {
        title: 'Billedbibliotek med 104 tematiske samlinger og mere end 3.100 illustrationer',
        description:
          'Gennemse 104 tematiske billedsamlinger, der dækker dyr, mad, køretøjer, natur, erhverv, højtider, sport, årstider og snesevis flere. Hvert tema giver et koordineret sæt farverige illustrationer, der fungerer som både skjulte objekter og distraktorer i søgescener, eller som parrede og uparrede objekter i Find den Ulige Billede-arbejdsark. Filtrer efter tema med dropdownen eller søg efter specifikke billeder med nøgleord. Kommerciel Pakke inkluderer 10 farverige temaer (~300 billeder); Fuld Adgang låser op for alle 104 temaer med mere end 3.100 illustrationer.',
      },
      {
        title: 'Trykfærdig PDF- og JPEG-eksport med 300 DPI og gråtoneomskifter',
        description:
          'Download skjulte objekter-arbejdsark og facit som højopløste JPEG-billeder eller trykklare PDF-dokumenter renderet med 300 DPI (6× multiplikator). Fire downloadknapper i dropdownmenuen eksporterer Arbejdsark-JPEG, Facit-JPEG, Arbejdsark-PDF og Facit-PDF separat. Sidestørrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende og helt brugerdefinerede dimensioner. Slå gråtone til for blækvenlige versioner, der sparer toner. Hver eksport er produktionsklar til digitale downloads, trykte arbejdsbøger og produktlinjeuddeling.',
      },
      {
        title: 'Fuld lærredsredigering med tekstværktøjer, baggrundstemaer og rammetemaer',
        description:
          'Fabric.js-lærredet giver komplet kontrol over hvert element på dit skjulte objekter-arbejdsark. Træk, ændr størrelse, roter og flyt billeder, tekst og genereret indhold frit. Lagkontroller håndterer stablingsrækkefølge. Tilføj brugerdefineret tekst med seks skrifttypemuligheder (Fredoka, Lexend Deca, Baloo 2, Nunito, Quicksand, Arial), justerbar størrelse og farve, og tekstkonturbredde fra 0 til 10 med 0,5-trins granularitet. Baggrundstemaer og rammetemaer har hver sine uafhængige opacitetskontroller. Zoom fra 25% til 300% med knappekontroller (Ind +25%, Ud -25%, Nulstil 100%). Fortryd og gentag op til 20 historiktrin med Ctrl+Z og Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Sådan sælger du find-og-markér opgaver online',
    cases: [
      {
        title: 'Tematiske skjulte objekter-aktivitetspakker på Etsy.dk',
        description:
          'Opret tematiske søgearbejdsarkspakker med de 104 billedsamlinger — dyr skjulte objekter, højtidssøgning, havdyrssøgning, dinosaurusopdagelse og snesevis flere. Hvert tema giver tilstrækkeligt med illustrationer til flere unikke skjulte objekter-scener med varierende sværhed. Pak 10–20 skjulte objekter-arbejdsark per tema med facit inkluderet, og sælg til 25–60 kr per pakke. Øg sværheden gennem pakken ved at tilføje flere skjulte objekter (1 → 5) og flere distraktorer (8 → 12), efterhånden som siderne skrider frem.',
        platform: 'Etsy (etsy.dk)',
      },
      {
        title: 'Skjulte objekter-aktivitetsarbejdsbøger på Amazon KDP',
        description:
          'Saml 40–80 skjulte objekter-arbejdsark til en trykt arbejdsbog formateret til Amazon KDP. Strukturér din bog efter progressiv sværhed: tidlige kapitler gemmer 1–2 objekter blandt 8 distraktorer for begyndere, mellemkapitler øger til 3–4 skjulte objekter med 10 distraktorer, og avancerede kapitler bruger 5 skjulte objekter blandt 12 distraktorer. Inkluder facit i slutningen af bogen. Gråtoneomskifteren producerer blækvenlige sider klar til sort-hvide bogsindersider. Det visuelle design betyder, at en arbejdsbog fungerer for ethvert sprogmarked.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Find den Ulige Billede visuelle diskrimineringsarbejdsark til Gumroad',
        description:
          'Byg færdige Find den Ulige Billede-arbejdsark, hvor brugerne identificerer uparrede billeder blandt parrede sæt. Købere, der søger på Gumroad efter visuelle diskrimineringsaktiviteter, værdsætter arbejdsark, der udvikler observationsevne og logisk ræsonnement. Opret produktkatalogtilpassede sæt: bondegårdsdyr ulige billede, formgenkendelse, sæsonsortering og levestedsklassificering. Inkluder navn- og datofelter for sporbarhed, og giv facit, der viser, hvilke objekter der var uparrede. Hvert sæt eksporteres i både PDF- og JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sæsonbetonede skjulte objekter-aktivitetssamlinger',
        description:
          'De 104 tematiske billedsamlinger dækker enhver sæson- og højtidslejlighed — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Opret tidsbegrænsede skjulte objekter-samlinger, der falder sammen med topindkøbsperioder. Udgiv halloween søgepakker i september, jul skjulte objekter-samlinger i oktober og valentinsdag søg-og-find-pakker i januar. Inkluder både Søgnings- og Find den Ulige Billede-arbejdsark i hvert sæsonsæt for maksimal værdi.',
        platform: 'Etsy / Amazon KDP / Gumroad (sæsonbetonet)',
      },
      {
        title: 'Blandede tilstands søgning og Find den Ulige Billede-pakker',
        description:
          'Kombinér begge aktivitetstilstande til premium variationspakker. Hver pakke inkluderer Søgning skjulte objekter-scener, hvor brugerne finder specifikke objekter i en spredt scene, plus Find den Ulige Billede-arbejdsark, hvor brugerne identificerer uparrede objekter blandt matchede sæt. Denne kombination retter sig mod to forskellige kognitive færdigheder — visuel søgning og visuel diskriminering — i et enkelt produkt. Blandede tilstands-pakker motiverer højere priser, fordi de leverer mere aktivitetsvariation og dækker flere læringsmål end enkelt-tilstands-produkter.',
        platform: 'Etsy / Gumroad (variationspakker)',
      },
    ],
  },

  faq: [
    {
      question: 'Kan jeg sælge disse find-og-markér opgaver på Etsy?',
      answer:
        'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge dine find-og-markér opgaver som digitale downloads på Etsy.dk, som trykte søgebillede-bøger på Amazon KDP, som ressourcer på Gumroad, eller via enhver anden salgskanal. De to aktivitetstilstande, nul-overlap scenegenerering og 104 tematiske billedsamlinger giver dig de kreative værktøjer til at producere originale, salgbare observationsopgaver.',
    },
    {
      question: 'Hvordan laver jeg find-og-markér opgaver?',
      answer:
        'Åbn generatoren, vælg en aktivitetstilstand (Søgning med gemte genstande eller Find den Ulige Billede), konfigurer antal genstande og distraktorer, vælg et billedtema fra de 104 samlinger, og klik Generer. Opgavearket med automatisk facit er klar til eksport som 300 DPI PDF eller JPEG på få minutter.',
    },
    {
      question: 'Er de egnede til børnehaveklasse, indskoling og mellemtrin?',
      answer:
        'Ja. Til børnehaveklasse: brug Søgnings-tilstanden med 1–2 gemte genstande og 8 distraktorer for let opmærksomhedstræning. Til indskoling (0.–3. klasse): øg til 3–4 genstande blandt 10 distraktorer. Til mellemtrin (4.–6. klasse): brug 5 gemte genstande blandt 12 distraktorer, eller prøv Find den Ulige Billede-tilstanden for visuel diskriminering.',
    },
    {
      question: 'På hvor mange sprog fungerer opgaverne?',
      answer:
        'Find-og-markér opgaverne er rent visuelle — ingen tekst på resultatet — så de fungerer på ethvert sprog uden oversættelse. Grænsefladen understøtter 11 sprog (dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk), men selve opgavearket er identisk uanset sprogvalg. Ét produkt kan sælges globalt.',
    },
    {
      question: 'Er facitlisten inkluderet?',
      answer:
        'Ja. Dobbeltlærredssystemet genererer automatisk en facitliste med røde cirkler rundt gemte genstande (Søgning) eller uparrede genstande (Find den Ulige Billede). Cirkler dimensioneres 3–5px større end genstanden for tydelig synlighed. Download facit separat som Facit-JPEG eller Facit-PDF med 300 DPI.',
    },
    {
      question: 'Hvad er de to aktivitetstilstande?',
      answer:
        'Søgnings-tilstanden opretter frie søgebilleder, hvor 1–5 gemte genstande spredes blandt 8–12 distraktorer med en nul-overlapalgoritme — børnene søger og cirkler, hvad de finder. Find den Ulige Billede-tilstanden arrangerer 8–12 parrede billeder i rækker med 1–5 uparrede genstande — børnene identificerer genstanden uden en partner.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — begge aktivitetstilstande, konfigurerbare objektantal, automatisk facit, hele billedbiblioteket, baggrunds- og rammetemaer, navn- og datofelter og alle downloadformater — uden at oprette en konto, indtaste kreditkort eller installere software. Downloads indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket.',
    },
    {
      question: 'Hvad er returpolitikken?',
      answer:
        'Fordi den gratis prøveversion giver dig adgang til alle funktioner, tilbyder vi ingen refusioner på køb af kommercielle licenser. Du kan teste begge tilstande, konfigurerbare objektantal, facit, hele billedbiblioteket og alle downloadformater, før du køber. Den gratis prøveversion er returpolitikken.',
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
      slug: 'krydsord-arbejdsark',
      anchorText: 'Billedkrydsord Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'skattejagt-arbejdsark',
      anchorText: 'Skattejagt Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'billedsortering-arbejdsark',
      anchorText: 'Billedsortering Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'matchning-arbejdsark',
      anchorText: 'Matchnings Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'find-den-ulige-arbejdsark',
      anchorText: 'Find den Ulige Arbejdsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'soeg-find-pakke',
      anchorText: 'Søg og Find Pakke — Alle Søgeapps i Én',
    },
    {
      pageType: 'guide',
      slug: 'skab-skjulte-genstande-arbejdsark',
      anchorText: 'Sådan Opretter du Skjulte Objekter Arbejdsark, der Sælger',
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
    {
      pageType: 'tool',
      slug: 'find-genstandene-skaber',
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
      primary: '/samples/danish/find%20objects/find-de-skjulte-objekter-1.webp',
      primaryAlt: 'Find-og-markér opgave til print med gemte genstande spredt over søgebillede og legende med genstande at finde',
    },
    sampleGallery: [
      {
        src: '/samples/danish/find%20objects/find-de-skjulte-objekter-1.webp',
        alt: 'Observationsleg opgave med gemte genstande spredt over søgebillede til børnehaveklasse',
        caption: 'Søgnings-tilstand — børnene finder og cirkler gemte genstande i søgebilledet',
      },
      {
        src: '/samples/danish/find%20objects/find-de-skjulte-objekter-2.webp',
        alt: 'Find-og-markér opgave med tematisk søgebillede og varieret antal genstande til indskoling',
        caption: 'Tematisk søgebillede — 104 temaer giver unikke observationsudfordringer',
      },
      {
        src: '/samples/danish/find%20objects/find-de-skjulte-objekter-3.webp',
        alt: 'Facitliste til find-og-markér opgave med røde cirkler rundt gemte genstande',
        caption: 'Automatisk facit — røde cirkler markerer gemte og uparrede genstande',
      },
    ],
    youtubeId: '8Y3jrVr1Phs',
    videoTitle: 'Sådan laver du find-og-markér opgaver med søgebilleder og observationslege — trin-for-trin guide',
  },
};

export default content;
