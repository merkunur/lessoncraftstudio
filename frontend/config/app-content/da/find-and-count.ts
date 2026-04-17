import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'find og tæl opgave til print',
    secondaryKeywords: [
      'tæl genstandene opgave',
      'hvor mange er der? opgave',
      'tælleøvelse børnehaveklasse',
      'find og tæl børn',
    ],
    lsiKeywords: [
      'tælle',
      'finde',
      'antal',
      'børnehaveklasse',
      'indskoling',
      'facit',
    ],
    titleTag: 'Find og tæl-generator | LessonCraftStudio',
    metaDescription: 'Lav find-og-tæl opgaver hvor børn leder efter og tæller temabilleder. Automatisk facit. Prøv gratis.',
  },

  hero: {
    title: 'Find og tæl-generator — Lav printables at sælge på Etsy og KDP',
    tagline: 'To aktivitetstilstande i én generator — Søgning med gemte genstande og Bogstavsøgning — med fire blandbare opgavetyper (ring om, firkant, streg over, tæl), lokalspecifikke alfabeter med æ, ø, å, lokaliserede billednavnsetiketter på 11 sprog og automatisk facit med visuelle annoteringer.',
    description:
      'Lav professionelle find-og-tæl opgaver til print, hvor børn søger i en spredt billedscene for at finde, ringe om, strege over eller tælle specifikke genstande. Det danske marked for printbare opgaveark (5,8 mio. dansktalende, Etsy.dk, lav konkurrence) er oplagt for sælgere af tælleøvelser til børnehaveklasse, indskoling (0.–3. klasse) og mellemtrin (4.–6. klasse). Vælg mellem to aktivitetstilstande: Søgnings-tilstanden spreder billeder over et konfigurerbart gitter (5–10 rækker × 5–10 kolonner) og lader dig tildele op til 4 målobjekter med individuelle opgavetyper — ring om genstanden, sæt en firkant rundt den, streg den over, eller tæl hvor mange der er. Bogstavsøgning-tilstanden viser et lokalspecifikt alfabet med danske bogstaver (Æ, Ø, Å) og genererer søgescener med billeder, der begynder med det valgte bogstav. Hvert opgaveark inkluderer en automatisk genereret overskrift — \"Find og tæl\" eller \"Bogstavsøgning\" — lokaliseret på alle 11 understøttede sprog med blå ramme (#2196F3). Dobbeltlærredssystemet genererer både et opgaveark og en facitliste med røde cirkel-, firkant- og korsannoteringer plus antal-visninger. Generatoren er sprogfølsom: billednavnsetiketter renderes på det valgte sprog via billedordforråds­systemet. Det betyder, at det samme billedtema genererer unikke opgaveark på 11 forskellige sprog — hver sprogversion har lokaliserede etiketter, og Bogstavsøgning tilpasses til det sprogs alfabet (dansk ÆØÅ), hvilket gør hver version til et separat produkt. Fuld Adgang låser op for alle 104 temaer med mere end 3.100 illustrationer og alle 11 brugerfladesprog. Tilføj baggrundstemaer og rammetemaer med uafhængige opacitetskontroller, og eksporter printklare PDF\'er og JPEG-billeder med 300 DPI i Letter, A4, Kvadrat (1200×1200) eller brugerdefinerede størrelser. Uanset om du sælger tælleøvelse-pakker på Etsy.dk, sammensætter søge-og-tæl-bøger til Amazon KDP eller opretter tælleaktiviteter til Gumroad — denne generator leverer produktionsklare opgaveark på få minutter. Gratis prøveversion med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  ctaHeading: 'Lav find-og-tæl-opgaver',

  howItWorks: {
    title: 'Sådan laver du find-og-tæl opgaver i 5 trin',
    steps: [
      {
        title: 'Indstil sidelayoutet',
        description:
          'Åbn panelet Sideopsætning og vælg en sidestørrelse: Standard (800×1000), Letter, A4, Kvadrat (1200×1200) eller en brugerdefineret dimension. Konfigurer gittertætheden med rækker (5–10) og kolonner (5–10) — standard er 6×6. Vælg en sidefarve med farvevælgeren, vælg et baggrundstema og juster dets opacitet, vælg derefter et rammetema med sin egen uafhængige opacitetskontrol. Disse layoutvalg rammer dit søgearbejdsark ind, før du tilføjer noget indhold.',
      },
      {
        title: 'Vælg din aktivitetstilstand',
        description:
          'Vælg mellem to tilstande. Skjulte Objekter-tilstanden (standard) opretter klassiske søgescener — spredte billeder over et gitter, hvor brugerne søger efter specifikke objekter. Bogstavsøgning-tilstanden aktiverer et lokalspecifikt alfabet med accentuerede bogstaver og genererer scener med billeder, der begynder med det valgte bogstav. Det danske alfabet inkluderer A–Z plus Æ, Ø og Å (29 bogstaver). Overskriften skifter automatisk mellem \"Find og tæl\" og \"Bogstavsøgning\" (lokaliseret på alle 11 sprog) baseret på dit valg.',
      },
      {
        title: 'Vælg billeder og tildel opgavetyper',
        description:
          'I Skjulte Objekter-tilstanden, vælg op til 4 målobjekter fra Billedbiblioteksets 104 tematiske samlinger. For hvert valgt billede, tildel en opgavetype fra dropdownen: ring om (tegn en cirkel rundt det), firkant (sæt en firkant rundt det), streg over (streg det over), eller tæl (tæl hvor mange der er). Gitteret fylder resterende celler med tilfældige distraktorbilleder fra temaet. I Bogstavsøgning-tilstanden, klik på et bogstav fra alfabetgitteret for automatisk at udfylde målbilleder og distraktorer.',
      },
      {
        title: 'Generer søgearbejdsarket',
        description:
          'Appen auto-genererer ved sideindlæsning med dyretemaet, 4 tilfældige billeder og tilfældige opgavetyper. Klik på Generer for at genopbygge med dine tilpassede indstillinger. Den spredte billedscene fylder gitteret med målobjekter fordelt tilfældigt (1–5 forekomster hver) blandt distraktorbilleder. En stiliseret overskrift vises øverst med en blå ramme (#2196F3), gul indre accent og lokaliseret titel og instruktioner i Fredoka og Quicksand-skrifttyper.',
      },
      {
        title: 'Generer facit og download',
        description:
          'Skift til fanen Facit for at se automatisk genererede annoteringer: røde cirkler rundt ring-om-objekter, røde firkanter rundt firkant-objekter, røde kors over streg-over-objekter og mængdevisninger for tæl-objekter. Download begge versioner med fire dedikerede knapper: Arbejdsark-JPEG, Facit-JPEG, Arbejdsark-PDF og Facit-PDF med 300 DPI. Slå gråtone til for blækvenlige versioner. Hver eksport er produktionsklar til Etsy-annoncer, Amazon KDP-indersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nøglefunktioner i find-og-tæl generatoren',
    features: [
      {
        title: 'To aktivitetstilstande: Skjulte Objekter Søgning og Bogstavsøgning',
        description:
          'Én generator dækker to distinkte aktivitetsformater. Skjulte Objekter-tilstanden opretter klassiske søgescener, hvor brugerne søger i et spredt billedgitter for at finde specifikke objekter. Bogstavsøgning-tilstanden aktiverer et lokalspecifikt alfabet — engelsk A–Z (26 bogstaver), tysk A–Z + ÄÖÜ (29 bogstaver), spansk A–Z + Ñ (27 bogstaver), dansk/norsk A–Z + ÆØÅ (29 bogstaver), svensk/finsk A–Z + ÅÄÖ (29 bogstaver) — og genererer scener med billeder, der begynder med det valgte bogstav. Overskriften skifter automatisk mellem \"Find og tæl\" og \"Bogstavsøgning\" (lokaliseret på alle 11 sprog) baseret på den aktive tilstand.',
      },
      {
        title: 'Fire opgavetyper: Ring om, Firkant, Streg over og Tæl — blandbare på ét arbejdsark',
        description:
          'Tildel en anderledes opgavetype til hver af de op til 4 målobjekter på et enkelt arbejdsark. Ring om-opgaver beder brugerne tegne en cirkel rundt objektet. Firkant-opgaver beder dem sætte en firkant rundt det. Streg over-opgaver beder dem strege det over. Tæl-opgaver beder dem tælle, hvor mange forekomster der er, og skrive tallet. Bland alle fire opgavetyper på ét arbejdsark for varierede kognitive udfordringer, eller brug en enkelt type til fokuseret øvelse. Hver opgavetype genererer lokaliserede instruktioner automatisk.',
      },
      {
        title: 'Lokalspecifikke alfabeter med accentuerede bogstaver til Bogstavsøgning',
        description:
          'Bogstavsøgning-tilstanden viser et alfabetgitter tilpasset hvert sprogs tegnsæt. Tysk inkluderer Ä, Ö og Ü ved siden af de almindelige 26 bogstaver. Spansk tilføjer Ñ. Dansk og norsk inkluderer Æ, Ø og Å. Svensk og finsk tilføjer Å, Ä og Ö. Alfabetgitteret renderes i 7 kolonner og justerer automatisk rækkeantallet baseret på lokalens bogstavantal. Brugerne vælger et bogstav, og generatoren opretter en søgescene med billeder, der begynder med det bogstav på det valgte sprog.',
      },
      {
        title: 'Lokaliserede billednavnsetiketter på 11 sprog via billedordforråds­systemet',
        description:
          'Find og Tæl Generatoren er sprogfølsom. Billednavnsetiketter på arbejdsarket renderes på det valgte sprog via billedordforråds­systemet (image-vocabulary.js). At skifte fra engelsk til dansk ændrer \"cat\" til \"kat\", \"dog\" til \"hund\", og begyndelsesbogstaver opdateres derefter i Bogstavsøgning-tilstanden. Alle 11 sprog understøttes: engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, dansk, norsk og finsk. Kommerciel Pakke inkluderer engelsk; Fuld Adgang låser op for alle 11 sprog til lokaliserede etiketter.',
      },
      {
        title: 'Automatisk genereret facit med visuelle annoteringer og mængdevisninger',
        description:
          'Hvert søgearbejdsark genererer automatisk en ledsagende facitliste på en separat lærredsfane. Facit gengenerator det præcise arbejdsarkslayout og tilføjer røde visuelle annoteringer: cirkler rundt ring-om-opgaveobjekter, firkanter rundt firkant-opgaveobjekter, kors over streg-over-opgaveobjekter og mængdevisninger for tæl-opgaveobjekter. Ingen manuel markering, ingen separat filoprettelse — facit er altid synkroniseret med arbejdsarket. Denne dobbeltlærred-tilgang sparer betydelig produktionstid for sælgere, der opretter søgepakker.',
      },
      {
        title: 'Billedbibliotek med 104 tematiske samlinger og mere end 3.100 illustrationer',
        description:
          'Gennemse 104 tematiske billedsamlinger, der dækker dyr, mad, køretøjer, natur, erhverv, højtider, sport, årstider og snesevis flere. Hvert tema giver et koordineret sæt farverige illustrationer, der fungerer som både målobjekter og distraktorer i søgescener. Filtrer efter tema med dropdownen eller søg efter specifikke billeder med nøgleord. Kommerciel Pakke inkluderer 10 farverige temaer (~300 billeder) til at komme i gang; Fuld Adgang låser op for alle 104 temaer med mere end 3.100 illustrationer for maksimal variation.',
      },
      {
        title: 'Trykfærdig PDF- og JPEG-eksport med 300 DPI og gråtoneomskifter',
        description:
          'Download søgearbejdsark og facit som højopløste JPEG-billeder eller trykklare PDF-dokumenter renderet med 300 DPI (6× multiplikator). Fire dedikerede downloadknapper eksporterer Arbejdsark-JPEG, Facit-JPEG, Arbejdsark-PDF og Facit-PDF separat. Sidestørrelser inkluderer Standard (800×1000), Letter, A4, Kvadrat (1200×1200) og helt brugerdefinerede dimensioner. Slå gråtone til for blækvenlige versioner, der sparer toner. Hver eksport er produktionsklar til digitale downloads, trykte arbejdsbøger og produktlinjeuddeling.',
      },
      {
        title: 'Konfigurerbar gittertæthed med 5–10 rækker og 5–10 kolonner',
        description:
          'Kontroller sværheden og den visuelle tæthed af dine søgearbejdsark ved at justere gitterdimensionerne. Indstil rækker fra 5 til 10 og kolonner fra 5 til 10 — standard er 6×6 (36 celler). Et 5×5-gitter (25 celler) opretter lettere arbejdsark med større billeder for yngre brugere. Et 10×10-gitter (100 celler) opretter udfordrende tætte scener for avancerede brugere. Hver celle viser et billede med en maksstørrelse på 80px, med en 5% størrelses­reduktion i Bogstavsøgning-tilstanden. Målobjekter fordeles tilfældigt over gitteret med 1–5 forekomster hver.',
      },
    ],
  },

  businessUseCases: {
    title: 'Sådan sælger du find-og-tæl opgaver online',
    cases: [
      {
        title: 'Tematiske søgeaktivitetspakker på Etsy.dk',
        description:
          'Opret tematiske søgearbejdsarkspakker med de 104 billedsamlinger — dyresøgning, højtidssøgning, madsøgning, køretøjssøgning og snesevis flere. Bland alle fire opgavetyper inden for hver pakke for variation: ring-om-arbejdsark til finmotorik, tæl-arbejdsark til numerisk øvelse, streg-over-arbejdsark til visuel diskriminering og firkant-arbejdsark til instruktionsfølgning. Pak 10–20 søgearbejdsark per tema med facit inkluderet, og sælg til 25–60 kr per pakke. Det automatisk genererede facit eliminerer den største tidssluger i søgearbejdsarks­produktion.',
        platform: 'Etsy (etsy.dk)',
      },
      {
        title: 'Søgeaktivitets-arbejdsbøger på Amazon KDP',
        description:
          'Saml 40–80 søgearbejdsark til en trykt arbejdsbog formateret til Amazon KDP. Strukturér din bog efter progressiv sværhed: tidlige kapitler bruger 5×5-gitre med 2 målobjekter, mellemkapitler øger til 7×7-gitre med 3 mål, og avancerede kapitler bruger 10×10-gitre med alle 4 mål og blandede opgavetyper. Inkluder facit i slutningen af bogen med den automatisk genererede facitfunktion. Gråtoneomskifteren producerer blækvenlige sider klar til sort-hvide bogsindersider.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Produktlinje observations- og tælleaktiviteter til Gumroad',
        description:
          'Byg færdige søge-tælle-arbejdsark, hvor brugerne søger, finder og tæller objekter i en spredt scene. Købere, der søger på Gumroad efter tælleaktiviteter, værdsætter arbejdsark, der kombinerer visuelt søgning med numerisk øvelse. Tæl-opgavetypen beder brugerne skrive, hvor mange forekomster af hvert objekt de finder — en naturlig forlængelse af søgning til matematikfærdigheder. Opret produktkatalogtilpassede sæt: bondegårdsdyr tælling, samfundshjælper tælling, havdyr tælling og sæsonbetonet objekttælling. Hvert sæt inkluderer arbejdsark og facit i både PDF- og JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Bogstavsøgning og fonikpakker til alfabetbevidsthed',
        description:
          'Udnyt Bogstavsøgning-tilstanden til at oprette søgearbejdsark fokuseret på begyndelsesbogstavs­genkendelse. Hvert arbejdsark retter sig mod et specifikt bogstav — brugerne finder alle objekter, der begynder med det bogstav i en spredt billedscene. Opret en komplet A–Å Bogstavsøgning-pakke med 29 arbejdsark (ét per bogstav, inkl. Æ, Ø, Å) og facit. De lokalspecifikke alfabeter med accentuerede bogstaver lader dig oprette sprogspecifikke fonikpakker for tysk (ÄÖÜ), spansk (Ñ) og nordiske markeder (ÆØÅ/ÅÄÖ), som konkurrenter med udelukkende engelske værktøjer ikke kan matche.',
        platform: 'Etsy / Gumroad (litteracitetsmarkedet)',
      },
      {
        title: 'Flersprogede søgesamlinger til globale markeder',
        description:
          'Udnyt de sprogfølsomme billednavnsetiketter til at oprette søgearbejdsark på 11 sprog. De samme billeder producerer forskellige etikettering, når du skifter sprog — billednavne, Bogstavsøgning begyndelsesbogstaver og overskriftstekst opdateres alle automatisk. Opret flersprogede søgepakker, hvor hver sprogversion bruger de samme tematiske billeder men lokaliserede etiketter. Dette er værdifuldt for DSA-sælgere, tosprogede produktlinjer og internationale hjemmeundervisningsfamilier. Sælg sprogspecifikke pakker eller flersprogede megapakker til premiumpriser.',
        platform: 'Etsy / Gumroad (flersproget marked)',
      },
    ],
  },

  faq: [
    {
      question: 'Kan jeg sælge disse find-og-tæl opgaver på Etsy?',
      answer:
        'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge dine find-og-tæl opgaver som digitale downloads på Etsy.dk, som trykte tællebøger på Amazon KDP, som ressourcer på Gumroad, eller via enhver anden salgskanal. De to aktivitetstilstande, fire opgavetyper, Bogstavsøgning med lokalspecifikke alfabeter og 104 tematiske billedsamlinger giver stærk differentiering.',
    },
    {
      question: 'Hvordan laver jeg find-og-tæl opgaver?',
      answer:
        'Åbn generatoren, vælg en aktivitetstilstand (Søgning med gemte genstande eller Bogstavsøgning), vælg op til 4 målobjekter fra de 104 billedtemaer, tildel opgavetyper (ring om, firkant, streg over, tæl), og klik Generer. Opgavearket med automatisk facit er klar til eksport som 300 DPI PDF eller JPEG på få minutter.',
    },
    {
      question: 'Er de egnede til børnehaveklasse, indskoling og mellemtrin?',
      answer:
        'Ja. Til børnehaveklasse: brug 5×5-gitre med 2 målobjekter og tæl-opgavetypen for simpel talforståelse. Til indskoling (0.–3. klasse): øg til 7×7-gitre med 3 mål og blandede opgavetyper. Til mellemtrin (4.–6. klasse): brug 10×10-gitre med alle 4 mål for udfordrende søge- og tælleøvelser. Bogstavsøgning med dansk ÆØÅ er ideel til bogstavgenkendelse i alle aldersgrupper.',
    },
    {
      question: 'På hvor mange sprog fungerer opgaverne?',
      answer:
        'Generatoren understøtter 11 sprog: dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk. Billednavnsetiketter renderes på det valgte sprog — \"Kat\" på dansk, \"Cat\" på engelsk, \"Katze\" på tysk. Bogstavsøgning tilpasses til hvert sprogs alfabet (dansk ÆØÅ, tysk ÄÖÜ, spansk Ñ). Hver sprogversion er et separat produkt.',
    },
    {
      question: 'Er facitlisten inkluderet?',
      answer:
        'Ja. Dobbeltlærredssystemet genererer automatisk en facitliste med røde visuelle annoteringer: cirkler rundt ring-om-objekter, firkanter rundt firkant-objekter, kors over streg-over-objekter og antal-visninger for tæl-objekter. Download facit separat som Facit-JPEG eller Facit-PDF med 300 DPI.',
    },
    {
      question: 'Hvad er de fire opgavetyper?',
      answer:
        'Ring om: tegn en cirkel rundt genstanden. Firkant: sæt en firkant rundt den. Streg over: streg genstanden over. Tæl: tæl hvor mange forekomster der er, og skriv tallet. Du kan blande alle fire opgavetyper på ét opgaveark — for eksempel ring om alle katte, streg over alle hunde, tæl alle fugle og sæt firkant rundt alle fisk.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — begge aktivitetstilstande, alle fire opgavetyper, Bogstavsøgning med danske Æ, Ø, Å, konfigurerbare gitterdimensioner, automatisk facit, hele billedbiblioteket og alle downloadformater — uden at oprette en konto, indtaste kreditkort eller installere software. Downloads indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket.',
    },
    {
      question: 'Hvad er returpolitikken?',
      answer:
        'Fordi den gratis prøveversion giver dig adgang til alle funktioner, tilbyder vi ingen refusioner på køb af kommercielle licenser. Du kan teste begge tilstande, alle opgavetyper, Bogstavsøgning, facit og alle downloadformater, før du køber. Den gratis prøveversion er returpolitikken.',
    },
  ],

  internalLinks: [
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
      slug: 'skattejagt-arbejdsark',
      anchorText: 'Skattejagt Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'billediagram-arbejdsark',
      anchorText: 'Billeddiagram Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'billedsti-arbejdsark',
      anchorText: 'Billedsti Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'ordsoegning-arbejdsark',
      anchorText: 'Ordsøgning Arbejdsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'soeg-find-pakke',
      anchorText: 'Søg og Find Pakke — Alle Søgeapps i Én',
    },
    {
      pageType: 'idea',
      slug: 'bondegaardsdyr-printbare-ideer',
      anchorText: 'Sådan Opretter du Søgebøger til Amazon KDP',
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
      pageType: 'guide',
      slug: 'skab-taelle-arbejdsark',
      anchorText: 'Sådan Opretter du Find og Tæl Arbejdsark',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/danish/find%20and%20count/jeg-ser,-jeg-ser-1.webp',
      primaryAlt: 'Find-og-tæl opgave til print med spredte billeder på et gitter, blå overskriftsramme og fire tælleøvelse-instruktioner',
    },
    sampleGallery: [
      {
        src: '/samples/danish/find%20and%20count/jeg-ser,-jeg-ser-1.webp',
        alt: 'Tælleøvelse opgave med spredte dyrebilleder og ring om, firkant, streg over og tæl-instruktioner til børnehaveklasse',
        caption: 'Søgnings-tilstand — børnene finder og tæller genstande med fire opgavetyper',
      },
      {
        src: '/samples/danish/find%20and%20count/jeg-ser,-jeg-ser-2.webp',
        alt: 'Find-og-tæl opgave med tematisk søgebillede og varieret gittertæthed til indskoling',
        caption: 'Tematisk tælleøvelse — 104 temaer giver unikke søge- og tællescener',
      },
      {
        src: '/samples/danish/find%20and%20count/jeg-ser,-jeg-ser-3.webp',
        alt: 'Facitliste til find-og-tæl opgave med røde cirkel-, firkant- og korsannoteringer og antal-visninger',
        caption: 'Automatisk facit — røde annoteringer og antal-visninger markerer korrekte svar',
      },
    ],
    youtubeId: '0cOPi7eajLs',
    videoTitle: 'Sådan laver du find-og-tæl opgaver med 4 opgavetyper og bogstavsøgning — trin-for-trin guide',
  },
};

export default content;
