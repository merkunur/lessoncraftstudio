import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'tælleopgaver til print',
    secondaryKeywords: [
      'øvelser tælle og diagram',
      'opgaver diagrammer indskoling',
      'tælle og strege opgave',
      'tælleaktiviteter børnehaveklasse',
    ],
    lsiKeywords: [
      'tælle',
      'søjlediagram',
      'streger',
      'data',
      'sortere',
    ],
    titleTag: 'Tælleopgaver og diagrammer til print | Generator',
    metaDescription: 'Lav tælle- og diagramopgaver med temabilleder. Automatisk facit, printklare PDF\'er. Prøv gratis.',
  },

  hero: {
    title: 'Tælleopgaver til print — generator til diagrammer og tælleaktiviteter',
    tagline: 'Lav tælle- og diagramopgaver med temabilleder, automatisk facit og printklare PDF\'er til børnehaveklasse og indskoling.',
    description:
      'Lav professionelle tælleopgaver til print med den eneste generator, der er bygget specifikt til øvelser med tælle og diagram. Hvert arbejdsark indeholder et spredt billedgitter med 20 ikoner fra 6 forskellige typer i et 4×5-layout — børnene tæller, sorterer og markerer streger, og farvelægger derefter de tilsvarende celler i søjlediagrammet nedenfor. Appen genererer samtidigt en facitliste med gulmarkerede celler, der viser de korrekte antal. Det danske marked for tælleaktiviteter børnehaveklasse er næsten ubesat. Med 5,8 millioner dansktalende og stigende interesse for printbare opgaver på Etsy.dk er søgeord som \"tælle og strege opgave\" og \"opgaver diagrammer indskoling\" nicher med lav konkurrence og høj købsintention. Brug generatoren til at lave tælleopgaver til børnehaveklasse, indskoling (1. klasse) og mellemtrin, der træner data-sortere og søjlediagram-færdigheder. Vælg billeder automatisk fra 104 tematiske samlinger eller manuelt fra mere end 3.100 illustrationer. Hvert arbejdsark inkluderer en lokaliseret overskrift med tælleinstruktioner på alle 11 sprog. Tilføj navn- og datofelter, anvend baggrunds- og rammetemaer, og tilpas med tekstværktøjer og frihånds lærredsredigering. Tælleopgaverne er ikke sprogfølsomme — visuel tælling bruger universelle tal og billeder, så arbejdsarkene fungerer identisk på ethvert sprog. Eksporter trykklare PDF\'er med 300 DPI i Letter, A4 eller brugerdefinerede størrelser. Download alle fire filer — arbejdsark og facit som JPEG og PDF — i en enkelt session. Uanset om du sælger tællepakker på Etsy.dk, sammensætter datafærdigheds-bøger til Amazon KDP eller laver matematikstationer — denne tælleopgaver generator leverer resultater på få minutter. Prøv gratis med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  howItWorks: {
    title: 'Sådan laver du tælleopgaver og diagrammer til print i 5 trin',
    steps: [
      {
        title: 'Indstil sidelayout og navnefelter',
        description:
          'Åbn panelet Sideopsætning og vælg en sidestørrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) eller en brugerdefineret dimension. Vælg en sidefarve med farvevælgeren — hvid er standard for rene arbejdsark. Sæt flueben i feltet Inkluder Navn/Dato for at tilføje formaterede \"Navn: ____\" og \"Dato: ____\" felter nederst på siden, så brugerne identificerer deres arbejde. Vælg et baggrundstema og et rammetema fra det indbyggede bibliotek, hvert med en uafhængig opacitetsskyder (0–1, trin 0,05) til subtil eller dristig dekorativ indramning.',
      },
      {
        title: 'Vælg din billedkilde',
        description:
          'Åbn panelet Billedbibliotek og vælg en billedkilde fra dropdownmenuen Arbejdsarkets Billedkilde. Vælg et tema som Dyr, Mad eller Køretøjer for automatisk udvalg — appen vælger tilfældigt 6 billeder fra den samling. Alternativt, skift til manuel tilstand: gennemse Billedbiblioteket efter tema eller søg, og klik derefter på præcis 6 billeder for at vælge dem. Valgte billeder vises i en forhåndsvisningsrække, hvor du kan klikke for at fjerne og erstatte individuelle valg. Uden valgt tema vælger appen 6 tilfældige billeder fra alle tilgængelige samlinger.',
      },
      {
        title: 'Generer billeddiagram-arbejdsarket',
        description:
          'Klik på Generer for at oprette arbejdsarket. Appen arrangerer 20 spredte ikoner fra dine 6 valgte billedtyper i et 4×5-gitter med en stiplet ramme øverst på siden. Under gitteret vises et søjlediagram med 6 kolonner × 5 rækker, hvor hver kolonne er mærket med en af de 6 billedtyper. Rækkerne er nummereret 1–5 nedefra og op. En automatisk genereret overskrift viser en lokaliseret \"Billeddiagram\"-titel og tælleinstruktioner i en stiliseret gul pille med orange ramkant. Lærredets arbejdsark viser tomme diagramceller klar til brugerne at udfylde.',
      },
      {
        title: 'Tilpas med tekstværktøjer og lærredsredigering',
        description:
          'Brug panelet Tekstværktøjer til at tilføje titler, etiketter eller instruktioner med syv skrifttypevalg: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial og Verdana. Juster skriftstørrelse, tekstfarve, konturfarve og konturbredde (0–10 med 0,5-trins granularitet) for læsbare overskrifter. Træk, ændr størrelse, roter og flyt elementer hvor som helst på Fabric.js-lærredet. Brug lagkontroller til at håndtere stablingsrækkefølge, lås færdige elementer og zoom fra 25% til 300% for præcision. Fortryd og gentag op til 20 historiktrin med Ctrl+Z og Ctrl+Y.',
      },
      {
        title: 'Generer facit og download alt',
        description:
          'Skift til fanen Facit for at se den automatisk genererede løsning — søjlediagrammets celler er fyldt med gul (#FFC857) markering, der viser det korrekte antal for hver billedtype. Slå gråtonemuligheden til for blækvenlige versioner. Download alle fire filer: arbejdsark-JPEG, arbejdsark-PDF, facit-JPEG og facit-PDF — alle renderet med 300 DPI. Filerne hedder worksheet.jpeg, worksheet.pdf, answer_key.jpeg og answer_key.pdf for nem organisering. Hver eksport er produktionsklar til Etsy-annoncer, Amazon KDP-indersider og Gumroad-ressourcefiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nøglefunktioner i tælleopgaver-generatoren',
    features: [
      {
        title: 'Billeddiagram arbejdsark generator med spredt billedgitter og søjlediagram',
        description:
          'Hvert genereret arbejdsark kombinerer to sammenkoblede elementer: et 4×5-gitter med 20 spredte ikoner fra 6 forskellige billedtyper, og et søjlediagram med 6 kolonner × 5 rækker, hvor hver kolonne svarer til en billedtype. Billedtyperne forekommer hver 1–5 gange i gitteret (maksimalt 5 per type, tilfældigt fordelt), hvilket generator en unik tælleudfordring, hver gang du genererer. Brugerne tæller, hvor mange af hver billedtype der er i gitteret, og farvelægger derefter det tilsvarende antal celler i diagrammet nedenfor. Dette todelte format lærer dataindsamling og datarepræsentation samtidig — kernen i tidlige diagramfærdigheder.',
      },
      {
        title: 'Automatisk genereret facit med udfyldte diagramceller',
        description:
          'Hvert arbejdsark genererer en matchende facitliste samtidig på en separat lærredsfane. Facit viser det samme billedgitter og søjlediagram, men med de korrekte celler fyldt med gul (#FFC857) markering. Sælgere ser med et blik, hvor mange af hver billedtype der skal være i diagrammet. Skift mellem fanerne Arbejdsark og Facit for at sammenligne. Download begge versioner uafhængigt — arbejdsark-JPEG/PDF og facit-JPEG/PDF — hvilket giver dig fire produktionsklare filer fra en enkelt generering. Det automatiske facit eliminerer manuel tælling og sikrer nøjagtighed over store arbejdsarkspakker.',
      },
      {
        title: 'Automatisk og manuelt billedvalgtilstand',
        description:
          'Dropdownmenuen Arbejdsarkets Billedkilde tilbyder to metoder til at vælge de 6 billeder, der vises på hvert arbejdsark. I automatisk tilstand vælger du et tema (Dyr, Mad, Køretøjer og 101 flere), og appen vælger tilfældigt 6 billeder fra den samling. I manuel tilstand gennemser du Billedbiblioteket efter tema eller søger med nøgleord og klikker derefter på præcis 6 billeder for at vælge dem — en forhåndsvisningsrække viser dine valg med klik-for-at-fjerne funktionalitet. Uden valgt tema henter appen 6 tilfældige billeder fra alle tilgængelige samlinger. Begge tilstande garanterer præcis 6 billedtyper per arbejdsark for konsekvent diagramformatering.',
      },
      {
        title: 'Lokaliseret billeddiagram-overskrift med titel og instruktioner',
        description:
          'Hvert genereret arbejdsark inkluderer en automatisk genereret overskrift med gul pillebaggrund (#FFD93D), hvid indre pille og orange ramkant (ydre #FF8C42, indre #FFD6A5). Overskriften viser en lokaliseret titel — \"Billeddiagram\" på dansk, \"Picture Graph\" på engelsk, \"Bilddiagramm\" på tysk og tilsvarende oversættelser på alle 11 understøttede sprog. Under titlen guider lokaliserede tælleinstruktioner brugerne gennem aktiviteten. Overskriften tilpasses automatisk, når du skifter brugerfladesprog, hvilket gør arbejdsarkene produktlinjefærdige i alle lokaler uden manuel tekstredigering.',
      },
      {
        title: 'Billedbibliotek med 104 tematiske samlinger og mere end 3.100 illustrationer',
        description:
          'Gennemse 104 tematiske billedsamlinger, der dækker dyr, mad, køretøjer, natur, erhverv, højtider, sport, årstider og snesevis flere. Hvert tema giver et koordineret sæt farverige illustrationer perfekte til billeddiagram arbejdsark. Brug temadropdownen til at filtrere efter kategori eller søg efter specifikke billeder med nøgleord. I automatisk tilstand vælger appen 6 billeder fra dit valgte tema; i manuel tilstand vælger du præcis 6 fra enhver kombination af temaer. Kommerciel Pakke inkluderer 10 farverige temaer; Fuld Adgang låser op for alle 104 temaer for maksimal variation over arbejdsarkspakker.',
      },
      {
        title: 'Baggrunds- og rammetemaer med uafhængige opacitetskontroller',
        description:
          'Anvend dekorative baggrunde og rammer fra det indbyggede temabibliotek for at ramme dine billeddiagram arbejdsark ind. Til forskel fra apps med kun rammetemaer tilbyder Diagramtælling Generatoren både baggrunds- og rammetemaer med uafhængige opacitetsskydere (0–1, trin 0,05). Indstil en subtil akvarelbaggrund på 20% opacitet, mens du beholder en dristig dekorativ ramme på fuld opacitet, eller enhver kombination, der passer din design. Baggrunds- og rammetemaer tilføjer visuel finish og øger oplevet kvalitet til markedspladsannoncer uden at forstyrre billedgitterets eller søjlediagrammets indhold.',
      },
      {
        title: 'Trykfærdig PDF- og JPEG-eksport med 300 DPI og gråtoneomskifter',
        description:
          'Download billeddiagram arbejdsark og facit som højopløste JPEG-billeder eller trykklare PDF-dokumenter renderet med 300 DPI via en 6× multiplikator for skarpe resultater. Sidestørrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) og helt brugerdefinerede dimensioner. Slå gråtone til for blækvenlige versioner, ideelle til masseudskrift og KDP-bogsindersider. Fire downloadknapper giver arbejdsark-JPEG, facit-JPEG, arbejdsark-PDF og facit-PDF — et komplet produktsæt fra en enkelt generering.',
      },
      {
        title: 'Fuld lærredsredigering med tekstværktøjer og lagkontroller',
        description:
          'Fabric.js-lærredet giver komplet kontrol over hvert element på dit billeddiagram arbejdsark. Træk, ændr størrelse, roter og flyt billedgitteret, søjlediagrammet, overskriften, teksten og alle brugerdefinerede elementer frit. Lagkontroller håndterer stablingsrækkefølge — flyt elementer fremad eller send dem bagud. Lås færdige elementer, mens du redigerer andre. Tilføj brugerdefineret tekst med syv skrifttypemuligheder (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar størrelse og farve, og tekstkonturbredde fra 0 til 10 med 0,5-trins granularitet. Zoom fra 25% til 300% for præcisionsarbejde. Fortryd og gentag op til 20 historiktrin. Ryd Alt inkluderer en bekræftelsesdialog for at forhindre utilsigtet sletning.',
      },
    ],
  },

  businessUseCases: {
    title: 'Sådan sælger du tælleopgaver og diagrammer online',
    cases: [
      {
        title: 'Tematiske billeddiagram-pakker på Etsy.dk',
        description:
          'Opret tematiske billeddiagram-pakker med de 104 billedsamlinger — dyretællings diagrammer, maddata diagrammer, køretøjstællings ark, naturobservations diagrammer og snesevis flere. Hvert tema giver tilstrækkeligt med billeder til 10–20 unikke arbejdsark med forskellige tilfældige fordelinger. Inkluder det automatisk genererede facit med hvert arbejdsark til sælgerbekvemmelighed. Pak temaer som enkle pakker til 25–40 kr hver, eller kombinér flere temaer til megapakker til 100–150 kr. Det spredte billedgitter med 6 typer per ark sikrer, at hvert arbejdsark er unikt og umuligt at genskabe manuelt, hvilket giver dine produkter ægte originalitet.',
        platform: 'Etsy (etsy.dk)',
      },
      {
        title: 'Datafærdigheds-arbejdsbøger på Amazon KDP',
        description:
          'Saml 60–100 billeddiagram arbejdsark til en trykt datafærdigheds-arbejdsbog formateret til Amazon KDP. Strukturér kapitler efter tema: Kapitel 1 dækker dyretælling, Kapitel 2 maddiagrammer, Kapitel 3 køretøjsdata og så videre. Slå gråtoneeksport til for blækvenlige sider klar til sort-hvide bogsindersider. Inkluder facitsider i slutningen af hvert kapitel til forældre- og sælgerreference. Dobbeltlærred-genereringen producerer både arbejdsark og facit automatisk, så at bygge en 100-siders arbejdsbog med komplette løsninger tager en brøkdel af tiden sammenlignet med manuelt skabelse.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Matematikstationsaktiviteter til Gumroad',
        description:
          'Byg færdige matematikstationsaktiviteter med billeddiagrammer, der inkluderer navn- og datofelter. Købere, der søger på Gumroad efter diagramaktiviteter, værdsætter arbejdsark med indbygget identifikation — fluebenet for navn/dato gør dit produkt øjeblikkeligt produktlinjefærdigt uden yderligere formatering. Opret temaspecifikke sæt knyttet til produktkatalogenheder: tæl bondegårdsdyr til livsvidenskab, diagram af vejrikoner til geovidenskab, eller tæl samfundshjælperkøretøjer til samfundsfag. Hvert arbejdsark leveres med sin egen facitliste, hvilket eliminerer sælgerens forberedelsestid.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Tværfaglige dataaktiviteter',
        description:
          'Billeddiagrammer bygger bro mellem matematik og andre fag naturligt. Brug dyretemaer til naturfaglige enheder om levesteder og klassifikation. Brug madtemaer til sundheds- og ernæringslektioner. Brug køretøjstemaer til samfunds- og transportemner. De 104 tematiske samlinger dækker praktisk talt ethvert grundskoleemneområde, hvilket lader dig oprette datarepræsentation arbejdsark, der forstærker fagordforråd, samtidig med at de lærer diagramfærdigheder. Sælg tværfaglige pakker, der appellerer til købere, der ønsker integrerede aktiviteter — en voksende niche på alle tre store platforme.',
        platform: 'Etsy / Amazon KDP / Gumroad',
      },
      {
        title: 'Sæsonbetonede tællings- og diagramsamlinger',
        description:
          'De 104 tematiske billedsamlinger dækker enhver sæson- og højtidslejlighed — julepynt, halloween-ikoner, påskegenstande, valentinsdag-hjerter, skolstartstilbehør, sommeraktiviteter og vinterscener. Opret tidsbegrænsede billeddiagram-samlinger, der falder sammen med topindkøbsperioder. Udgiv halloween-tællings-pakker i september, julediagram-pakker i oktober og valentinsdag-dataaktiviteter i januar. Inkluder facit med hvert sæt til komplette sælgerpakker. Sæsonprodukter motiverer højere priser under deres topvinduer og generator naturlige grunde til genkøb.',
        platform: 'Etsy / Amazon KDP / Gumroad (sæsonbetonet)',
      },
    ],
  },

  faq: [
    {
      question: 'Kan jeg sælge disse tælleopgaver på Etsy?',
      answer:
        'Ja. Med en kommerciel licens har du alle rettigheder til at sælge dine tælleopgaver som digitale downloads på Etsy.dk, som trykte datafærdigheds-bøger på Amazon KDP, som printbare produkter på Gumroad, eller via enhver anden salgskanal. Dobbeltlærred-genereringen, automatisk facit og 104 tematiske billedsamlinger giver dig værktøjerne til at producere originale tælle- og diagramprodukter i stor skala.',
    },
    {
      question: 'Hvordan laver jeg tælleopgaver til print?',
      answer:
        'Åbn tælleopgaver-generatoren, vælg et tema fra 104 billedsamlinger (eller vælg 6 billeder manuelt), og klik Generer. Appen arrangerer 20 spredte ikoner i et 4×5-gitter og opretter et søjlediagram nedenfor. Børnene tæller, sorterer og markerer streger. Facit genereres automatisk med gulmarkerede celler. Download alle fire filer — arbejdsark og facit som JPEG og PDF — i en enkelt session.',
    },
    {
      question: 'Er tælleopgaverne egnede til børnehaveklasse og indskoling?',
      answer:
        'Ja. Tælle- og diagramopgaverne er designet til børnehaveklasse og indskoling (1. klasse), hvor børnene tæller op til 5 pr. billedtype. Det visuelle format med billeder og søjlediagram er perfekt til at lære tælle, sortere og data-repræsentation — kernefærdigheder i de første skoleår. Hvert arbejdsark er unikt takket være tilfældig fordeling af billedtyper.',
    },
    {
      question: 'På hvor mange sprog kan jeg lave tælleopgaver?',
      answer:
        'Tælleopgaverne er helt visuelle — børnene tæller billeder og udfylder søjlediagramceller med tal, ingen ord. Et arbejdsark oprettet på ét sprog fungerer globalt. Appens brugerflade og den lokaliserede overskrift understøtter 11 sprog: dansk, svensk, norsk, finsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk og engelsk. Dine printbare tælleaktiviteter kan sælges på alle markedspladser uden oversættelse.',
    },
    {
      question: 'Er facitlisten inkluderet?',
      answer:
        'Ja. Appen genererer automatisk en matchende facitliste med gulmarkerede celler, der viser det korrekte antal for hver billedtype. Skift mellem fanerne Arbejdsark og Facit for at sammenligne. Download facitlisten som separat JPEG eller PDF — ingen manuel tælling nødvendig.',
    },
    {
      question: 'Hvordan fungerer billedgitteret og søjlediagrammet?',
      answer:
        'Hvert arbejdsark har to dele. Den øvre sektion viser et 4×5-gitter med 20 spredte ikoner fra 6 billedtyper — hver type forekommer 1–5 gange, tilfældigt fordelt. Den nedre sektion viser et søjlediagram med 6 kolonner og 5 rækker. Børnene tæller hver billedtype og farvelægger det tilsvarende antal celler. Det træner både tælle (dataindsamling) og diagram (datarepræsentation) i én øvelse.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — dobbeltlærredet, billedgittergenerering, søjlediagramoprettelse, automatisk facit, billedbiblioteket, baggrunds- og rammetemaer, gråtoneeksport og alle downloadformater — uden at oprette en konto, indtaste kreditkort eller installere software. Downloads fra den gratis prøveversion indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket og giver fulde salgsrettigheder.',
    },
    {
      question: 'Hvad er returpolitikken?',
      answer:
        'Fordi den gratis prøveversion giver dig adgang til alle funktioner, tilbyder vi ingen refusioner på køb af kommercielle licenser. Du kan teste alle temaer, gråtoneeksport, facitgenerering og alle downloadformater, før du køber. Prøv gratis, før du anskaffer en licens.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'stor-lille-arbejdsark',
      anchorText: 'Stort og Lille Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'moenstertog-arbejdsark',
      anchorText: 'Mønstertog Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'moenstre-arbejdsark',
      anchorText: 'Mønster Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'tegn-og-farvelaeg-arbejdsark',
      anchorText: 'Tegn og Farvelæg Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'linjetraening-arbejdsark',
      anchorText: 'Linjetræning Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'malebog-arbejdsark',
      anchorText: 'Malebog Arbejdsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'visuel-laering-pakke',
      anchorText: 'Visuel Læring Pakke — Alle Visuelle Apps i Én',
    },
    {
      pageType: 'idea',
      slug: 'sommer-printbare-ideer',
      anchorText: 'Sommer printbare idéer for sæsonsalg',
    },
    {
      pageType: 'idea',
      slug: 'jul-printbare-ideer',
      anchorText: 'Jul printbare idéer for sæsonsalg',
    },
    {
      pageType: 'start',
      slug: 'etsy-printbar-forretning',
      anchorText: 'Byg Din Etsy Printbar Forretning',
    },
    {
      pageType: 'guide',
      slug: 'skab-billeddiagram-arbejdsark',
      anchorText: 'Sådan Opretter du Diagramtælling Arbejdsark, der Sælger',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/danish/chart%20count/Billediagram%201.webp',
      primaryAlt: 'Tælleopgaver til print med billedgitter og søjlediagram til børnehaveklasse og indskoling',
    },
    sampleGallery: [
      {
        src: '/samples/danish/chart%20count/Billediagram%201.webp',
        alt: 'Tælleaktiviteter børnehaveklasse — dyretema med 20 spredte ikoner og tomt søjlediagram',
        caption: 'Dyretema tælleopgave — børnene tæller 6 dyretyper og fylder søjlediagrammet ud',
      },
      {
        src: '/samples/danish/chart%20count/Billediagram%202.webp',
        alt: 'Øvelser tælle og diagram med temabilleder til indskoling',
        caption: 'Tematisk tælleopgave — 104 temaer giver unikke øvelser med tælle og sortere',
      },
      {
        src: '/samples/danish/chart%20count/Billediagram%203.webp',
        alt: 'Tælleopgaver facit med gulmarkerede celler der viser korrekte streger i søjlediagrammet',
        caption: 'Automatisk facit — gulmarkerede celler viser det korrekte antal for hver billedtype',
      },
    ],
    youtubeId: 'CDgIihDQX6U',
    videoTitle: 'Sådan Opretter du Billeddiagram Arbejdsark med Automatiske Facit og 104 Tematiske Billedsamlinger — Trin-for-Trin Guide',
  },
};

export default content;
