import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'gittermatchning arbejdsark',
    secondaryKeywords: [
      'gittermatchning arbejdsark skaber for sælgere',
      'lav gitterpuslespil til salg',
      'printbar gitterpuslespil generator kommerciel brug',
      'billedfliser matchning arbejdsark skaber til KDP og Etsy',
    ],
    lsiKeywords: [
      'enkeltbilled gitterpuslespil fliser matchningsværktøj',
      'automatisk facit nummereret cirkeloverlejring generator',
      'konfigurerbar ledetrådscelle sværhed gitterskaber',
    ],
    titleTag: 'Gitterpuslespil Skaber — Gitter Arbejdsark Generator',
    metaDescription: 'Lav gittermatchnings arbejdsark med konfigurerbar gitterstørrelse, justerbare ledetrådsceller, Fisher-Yates-blanding og 104 tematiske billeder. Gratis prøveversion.',
  },

  hero: {
    title: 'Gitterpuslespil Skaber',
    tagline: 'Enkeltbilled gitterpuslespil generator med konfigurerbare gitterstørrelser fra 2×2 til 4×4, justerbare ledetrådsceller for skalerbar sværhed, Fisher-Yates fliserandomisering, automatisk genererede facit med nummererede cirkeloverlejringer og 104 tematiske billedsamlinger',
    description: 'Lav professionelle gittermatchnings arbejdsark, hvor et enkelt billede deles op i et gitter af fliser, og brugerne matcher nummererede fliser tilbage til deres korrekte positioner — et rumligt ræsonnementpuslespil bygget af ét billede. Konfigurér gitteret fra 2×2 op til 4×4 (2–4 rækker × 2–4 kolonner, standard 3×3) for at lave puslespil fra 4 til 16 fliser. Indstil 1–5 ledetrådsceller (standard 1), der forbliver synlige som tips — færre ledetråde betyder sværere puslespil, flere ledetråde skaber tilgængelige opvarmninger. Appen blander skjulte fliser med Fisher-Yates-randomisering og viser dem i en nummereret palet. Dobbeltarbejdsområde-systemet genererer samtidigt en arbejdsarksfane og en facitfane — facittet viser det komplette ubeskadigede billede med nummererede cirkler overlejret på hver gittercelle (gul baggrund #ffffe0, sort kontur, Fredoka-skrifttype). Det responsive layout tilpasses automatisk: stående sider placerer gitteret øverst med paletten nedenunder; liggende sider positionerer gitteret til venstre med paletten til højre. Gitterpuslespil er IKKE sprogfølsomt — puslespiloutputtet er rent visuelt uden lokaliseret ordindhold, hvilket gør hvert arbejdsark universelt sælgbart uden oversættelse. Gennemse 104 tematiske samlinger med mere end 3.100 illustrationer eller upload egne billeder. Anvend baggrunds- og rammetemaer med uafhængige gennemsigtighedsskydere. Eksportér fire filer per session: arbejdsark-JPEG, arbejdsark-PDF, facit-JPEG og facit-PDF — alle med 300 DPI. Den gratis prøveversion indeholder alle funktioner med et vandmærke. Køb en licens for at fjerne vandmærket og sælge kommercielt.',
  },

  tutorial: {
    title: 'Sådan Laver du Gittermatchnings Arbejdsark i 8 Trin',
    steps: [
      {
        title: 'Åbn Gitterpuslespil Skaberen',
        description: 'Klik på \"Prøv gratis nu\" for at starte gittermatchnings arbejdsark generatoren i din browser. Værktøjet indlæses direkte med et indstillingssidepanel til venstre og et dobbeltfane-arbejdsområde til højre. Ingen konto, ingen download, ingen installation kræves.',
      },
      {
        title: 'Konfigurér gitterstørrelsen',
        description: 'Åbn panelen Gittermuligheder og indstil antal rækker (2–4, standard 3) og kolonner (2–4, standard 3) uafhængigt. Et 2×2-gitter skaber 4 fliser for simple introduktionspuslespil. Et 3×3-gitter producerer 9 fliser for afbalanceret sværhed. Et 4×4-gitter leverer 16 fliser for avancerede rumlige ræsonnementudfordringer. Du kan også blande rækker og kolonner — et 2×4-gitter skaber et bredt rektangulært puslespil med 8 fliser.',
      },
      {
        title: 'Indstil ledetrådscelle-antallet for sværhed',
        description: 'Justér ledetrådscelle-skyderen fra 1 til 5 (standard 1). Ledetrådsceller er gitterpositioner, hvor den faktiske billedflise forbliver synlig som et tip. Med et 3×3-gitter og 1 ledetråd skal brugerne matche 8 blandede fliser — en ægte udfordring. Med 5 ledetråde på det samme gitter er kun 4 fliser skjult — en tilgængelig opvarmning. Denne enkelte kontrol forvandler det samme billede til puslespil, der spænder fra let til avanceret sværhed.',
      },
      {
        title: 'Vælg et billede fra biblioteket eller upload eget',
        description: 'Åbn panelen Billedbibliotek og gennemse 104 tematiske samlinger med mere end 3.100 farverige illustrationer — dyr, mad, køretøjer, natur, højtider, erhverv og snesevis flere. Alternativt upload egne PNG-, JPG- eller GIF-filer til personaliserede gitterpuslespil — familiefoto, tilpasset kunstværk, brandede billeder eller produktlinjespecifikt indhold.',
      },
      {
        title: 'Indstil sidelayout og dekorationer',
        description: 'I afsnittet Sideindstillinger vælger du sidestørrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende eller tilpasset dimension. Gitterpuslespil understøtter ikke Kvadratformat. Vælg sidebaggrundsfarve. Vælg dekorativt baggrundstema og rammetema med uafhængige gennemsigtighedsskydere (0–1, trin 0,05).',
      },
      {
        title: 'Generér gittermatchningspuslespillet',
        description: 'Klik på Generér. Appen opdeler dit valgte billede i det konfigurerede gitter, viser ledetrådscellerne med faktiske billedfliser synlige og markerer resterende celler med \"?\"-pladsholdere. Alle skjulte fliser blandes med Fisher-Yates-randomisering og vises som en nummereret palet. Det responsive layout tilpasses automatisk efter sideorientering. En stiliseret overskrift med cyan baggrund (#00BCD4), dyblilla titel (#6A1B9A) og orange ramme (#FF8C42) viser \"Gitterpuslespil\" og instruktioner.',
      },
      {
        title: 'Gennemse det automatisk genererede facit',
        description: 'Klik på fanen Facit for at se løsningen. Facittet viser det komplette ubeskadigede billede med nummererede cirkler overlejret på hver gittercelle — gul baggrund (#ffffe0) cirkler med sorte konturer og Fredoka-skrifttypetaltal, der viser hvilken paletflise der hører hvor. Facittet genereres samtidigt med arbejdsarket.',
      },
      {
        title: 'Download alle fire filer',
        description: 'Skift gråtone for blækvenlige versioner. Download alle fire filer: arbejdsark-JPEG, arbejdsark-PDF, facit-JPEG og facit-PDF — alle med 300 DPI. Klik på Generér igen med det samme billede for at producere et nyt puslespil med anderledes fliserandomisering, eller skift billeder og gitterindstillinger for hurtig variationsoprettelse gennem 104 tematiske samlinger.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Tematiske gitterpuslespilpakker efter sværhedsgrad',
      description: 'Lav gittermatchningspuslespilpakker organiseret efter tema og sværhed med de 104 billedsamlinger. Hvert tema producerer flere sværhedsgrader: lette puslespil (2×2 gitter med 3 ledetråde), medium (3×3 med 2 ledetråde) og svære (4×4 med 1 ledetråd). Pakér 15–20 puslespil per sværhedsgrad per tema med autogenererede facit. Fisher-Yates-randomisering betyder, at hver generering producerer anderledes fliseordning.',
    },
    {
      title: 'KDP visuel perception puslespilarbejdsbøger',
      description: 'Saml 60–80 gittermatchningspuslespil til trykte arbejdsbøger til Amazon KDP. Strukturér kapitler efter progressiv sværhed: Kapitel 1 bruger 2×2-gitre med 3 ledetråde for begyndere, Kapitel 2 bruger 3×3-gitre med 2 ledetråde for mellemniveau, Kapitel 3 bruger 4×4-gitre med 1 ledetråd for avancerede udfordringer. Facitsider i slutningen af hvert kapitel. Det rent visuelle format kræver ingen oversættelse.',
    },
    {
      title: 'Produktlinjens hurtigafslutnings-puslespilaktiviteter',
      description: 'Byg produktlinjefærdige gitterpuslespil til morgenarbejde, tidlige afsluttere og berigtelsesstationer. Lav produktkatalogtilstødende sæt. Den konfigurerbare sværhed lader dig differentiere inden for ét enkelt produkt — inkludér 2×2-puslespil for kæmpende brugere og 4×4-puslespil for avancerede brugere. Hvert puslespil eksporteres med sit autogenererede facit. Det rent visuelle format fungerer for alle brugere uanset læseniveau.',
    },
    {
      title: 'Tilpassede foto gitterpuslespilprodukter',
      description: 'Brug funktionen Upload Egne Billeder til at lave gitterpuslespil fra ethvert foto. Familiefotopuslespil bliver unikke personlige gaver. Sælgere kan uploade klassebilleder. Den konfigurerbare gitterstørrelse og ledetrådantal lader dig justere sværheden til enhver målgruppe.',
    },
    {
      title: 'Sæsonbetonede gitterpuslespilsamlinger',
      description: 'Byg roterende sæsonsamlinger med højtids- og naturtemaer. Jul, halloween, påske, valentinsdag, skolestart og sommertemaer understøtter hver dedikerede gitterpuslespilpakker. Inkludér flere gitterstørrelser og ledetrådantal i hvert sæsonsæt for maksimal variation.',
    },
    {
      title: 'Flerformats visuelle indlæringspakker',
      description: 'Parér gittermatchningspuslespil med matchningsarbejdsark, manglende brikker aktiviteter, skyggematchningsøvelser og billedsorteringsark med koordinerede temaer. Gitterpuslespil underviser i rumligt ræsonnement og visuel analyse. Matchning bygger visuel skelnelse. Manglende brikker udvikler del-til-hel-perception. Flerformats pakker sælger for mere.',
    },
  ],

  businessIdeas: [
    {
      title: 'Tematisk gitterpuslespilbutik på Etsy',
      description: 'Åbn en Etsy-butik specialiseret i gittermatchningspuslespilpakker organiseret efter tema med de 104 billedsamlinger. Dyr, køretøjer, natur, mad, højtider og erhverv bliver hver separate annoncer med lette, medium og svære sværhedsversioner. Hvert puslespil inkluderer det autogenererede facit med nummererede cirkeloverlejringer.',
      platform: 'Etsy',
    },
    {
      title: 'Amazon KDP visuel perception arbejdsbogserie',
      description: 'Saml 60–80 gittermatchningspuslespil til tematiske arbejdsbøger til Amazon KDP. Strukturér en serie efter sværhedsprogression: \"Lette Gitterpuslespil\" bruger 2×2-gitre med 3 ledetråde, \"Medium Gitterpuslespil\" bruger 3×3-gitre med 2 ledetråde, \"Avancerede Gitterpuslespil\" bruger 4×4-gitre med 1 ledetråd. Facitsider med nummererede cirkeloverlejringer til sidst. Det rent visuelle format publiceres identisk på alle internationale KDP-markedspladser.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Gumroad produktlinjens gitterpuslespil aktivitetspakker',
      description: 'Upload gitterpuslespil aktivitetspakker til Gumroad med niveauopdelt sværhed som nøglesalgspunkt. Købere, der søger efter visuelle perceptionsaktiviteter, værdsætter puslespil med flere sværhedsgrader og facit. Lav produktkatalogtilstødende sæt. Hvert pakke inkluderer lette (2×2), medium (3×3) og svære (4×4) versioner. Det autogenererede facit med nummererede overlejringer eliminerer sælgerens forberedelsestid.',
      platform: 'Gumroad',
    },
    {
      title: 'Pinterest gitterpuslespil trafiktragt',
      description: 'Gittermatchningspuslespil gør visuelt slående Pinterest-pins — det opdelte billedgitter med nummereret flisepalet og farverig overskrift skaber et øjeblikkeligt genkendeligt uddannelsesformat. Pin prøvepuslespil, der viser forskellige gitterstørrelser. Det rent visuelle format appellerer til forældre og sælgere i hvert land.',
      platform: 'Pinterest',
    },
    {
      title: 'Gumroad komplet gitterpuslespil værktøjskit',
      description: 'Pakér gittermatchningspuslespil over alle 104 temaer og alle sværhedsgrader til et omfattende værktøjskit på Gumroad. Inkludér 300+ puslespil med autogenererede facit — 600+ totale filer. Tretrins sværhedssystemet (2×2, 3×3, 4×4 gitre) med variable ledetrådantal giver enorm variation.',
      platform: 'Gumroad',
    },
    {
      title: 'Global visuel puslespil produktlinje',
      description: 'Gitterpuslespil producerer rent visuelle puslespil — billedfliser og tal er universelle. De samme produktfiler fungerer i hvert land uden oversættelse. Én designsession producerer et globalt sælgbart katalog. Sælg identiske filer globalt uden oversættelsesomkostninger.',
      platform: 'Etsy / Amazon KDP',
    },
  ],

  proTips: [
    {
      title: 'Kombinér gitterstørrelse og ledetrådantal for graduerede sværhedssæt',
      description: 'De to uafhængige sværhedskontroller — gitterstørrelse (2×2 til 4×4) og ledetrådsceller (1–5) — skaber et bredt udfordringsspektrum fra ét enkelt billede. Et 2×2-gitter med 3 ledetråde efterlader kun 1 flise at matche: en triviel opvarmning. Et 4×4-gitter med 1 ledetråd kræver matchning af 15 fliser: en ægte udfordring. Lav graduerede sværhedspakker.',
    },
    {
      title: 'Brug Fisher-Yates-randomisering til at multiplicere unikke puslespil',
      description: 'Hvert klik på Generér blander flisepaletten med Fisher-Yates-randomisering og producerer en anderledes nummereret fliseordning. Ét enkelt billede med faste gitterindstillinger genererer flere unikke puslespilarbejdsark. Generér 10–15 unikke puslespil per billede, multiplicér derefter over 104 temaer.',
    },
    {
      title: 'Vis facit med nummererede cirkeloverlejringer som salgspunkt',
      description: 'Det autogenererede facit viser det komplette billede med nummererede cirkler, der viser hvilken paletflise der hører hvor. Vis altid facitforhåndsvisninger i dine produktannoncer. Dobbeltarbejdsområde-systemet producerer begge versioner samtidigt.',
    },
    {
      title: 'Udnyt det rent visuelle format for globalt salg',
      description: 'Gittermatchningspuslespil indeholder kun billedfliser og tal — ingen sprogspecifik tekst. Hvert puslespil, du laver, er direkte sælgbart globalt uden oversættelse. Ét sæt puslespil betjener hvert marked.',
    },
    {
      title: 'Brug tilpassede billeduploads til premium personaliserede produkter',
      description: 'Panelen Upload Egne Billeder accepterer PNG, JPG og GIF. Tilbyd tilpasset gitterpuslespil-oprettelse som en premium Etsy-tjeneste. Den konfigurerbare gitterstørrelse og ledetrådantal lader dig justere sværheden til enhver målgruppe.',
    },
    {
      title: 'Brug baggrunds- og rammetemaer for sammenhængende produktbranding',
      description: 'Det uafhængige baggrunds- og rammetema-system med separate gennemsigtighedsskydere lader dig lave en konsistent visuel identitet. Indstil en subtil baggrund ved 15–25% gennemsigtighed og lagdel en dekorativ ramme ved 80–100%. Konsistent stil gennem en pakke skaber et sammenhængende produktudseende.',
    },
    {
      title: 'Vælg den rigtige gitterstørrelse til din målgruppe',
      description: 'Match gitterkonfiguration til køberforventninger. For Gumroad produktlinjeressourcer rettet mod børnehave til første klasse, brug 2×2 og 2×3 gitre. For Etsy aktivitetspakker, brug 3×3 gitre. For KDP puslespilarbejdsbøger rettet mod ældre brugere, brug 4×3 og 4×4 gitre.',
    },
  ],

  faq: [
    {
      question: 'Findes der en gratis prøveversion?',
      answer: 'Ja. Værktøjet tilbyder en gratis prøveversion med alle funktioner låst op — alle gitterstørrelser fra 2×2 til 4×4, justerbare ledetrådsceller (1–5), Fisher-Yates fliserandomisering, det autogenererede facit med nummererede cirkeloverlejringer, alle 104 tematiske billedsamlinger, tilpasset billedupload, baggrunds- og rammetemaer, gråtonekontakt og alle downloadformater. Ingen registrering, intet kreditkort kræves. Gratis prøveversions-downloads indeholder et vandmærke.',
    },
    {
      question: 'Hvordan fungerer gittermatchningspuslespillet?',
      answer: 'Arbejdsarket viser et enkelt billede opdelt i et gitter, hvor visse celler viser den faktiske billedflise (ledetrådsceller) og resterende celler viser \"?\"-pladsholdere. Ved siden af eller under gitteret viser en nummereret palet alle skjulte fliser i blandet rækkefølge. Brugerne undersøger de synlige ledetrådsceller, studerer de nummererede fliser og afgør, hvilket nummer der hører i hver tom gitterposition. Konfigurér gitteret fra 2×2 (4 fliser) til 4×4 (16 fliser) og indstil 1–5 ledetrådsceller.',
    },
    {
      question: 'Hvordan fungerer det automatisk genererede facit?',
      answer: 'Når du genererer et arbejdsark, opretter appen samtidigt et facit på en separat fane. Facittet viser det komplette ubeskadigede billede med nummererede cirkler overlejret på hver gittercelle — gul baggrund (#ffffe0), sorte konturer, Fredoka-skrifttype tal. Download hver version uafhængigt — fire produktionsklare filer fra én enkelt generering.',
    },
    {
      question: 'Hvilke gitterstørrelser er tilgængelige?',
      answer: 'Generatoren understøtter 2–4 rækker og 2–4 kolonner, konfigureret uafhængigt. Dette skaber gitre fra 2×2 (4 fliser) op til 4×4 (16 fliser). Standard er 3×3 (9 fliser). Du kan indstille rækker og kolonner til forskellige værdier for rektangulære puslespil.',
    },
    {
      question: 'Hvordan kontrollerer ledetrådsceller puslespilsværheden?',
      answer: 'Ledetrådsceller er gitterpositioner, hvor billedflisen forbliver synlig som et tip. Indstil 1–5 ledetrådsceller med skyderen (standard 1). Flere ledetråde gør puslespillet lettere. For et 3×3-gitter: 1 ledetråd betyder 8 fliser at matche (udfordrende), 3 ledetråde betyder 6 fliser (moderat), 5 ledetråde betyder 4 fliser (let).',
    },
    {
      question: 'Kan jeg generere flere unikke puslespil fra det samme billede?',
      answer: 'Ja. Hver gang du klikker på Generér, blander appen fliserne med Fisher-Yates-randomisering. Ledetrådscellernes positioner ændres også. Du kan lave flere distinkte puslespil fra ét enkelt billede uden at ændre indstillinger.',
    },
    {
      question: 'Kan jeg uploade mine egne billeder til gitterpuslespil?',
      answer: 'Ja. Panelen Upload Egne Billeder lader dig uploade PNG-, JPG- eller GIF-filer. Uploadede billeder vises i et galleri. Klik på ethvert billede for at vælge det som din puslespilkilde.',
    },
    {
      question: 'Hvordan tilpasses layoutet til stående og liggende?',
      answer: 'Generatoren registrerer automatisk din sideorientering. Stående sider placerer gitteret øverst (45% af højden) med paletten nedenunder. Liggende sider positionerer gitteret til venstre (48% af bredden) med paletten til højre. Denne automatiske ompositionering sikrer, at puslespil ser afbalancerede ud i begge orienteringer.',
    },
    {
      question: 'Er Gitterpuslespil Skaberen sprogfølsom?',
      answer: 'Nej. Gitterpuslespil er rent visuelt — puslespiloutputtet indeholder kun billedfliser og tal, uden lokaliseret ordindhold. App-grænsefladen understøtter alle 11 sprog, men det genererede puslespil fungerer identisk uanset sprogvalg. Dette gør gittermatchningspuslespil universelt sælgbare uden oversættelse.',
    },
    {
      question: 'Hvilke sidestørrelser og eksportformater er tilgængelige?',
      answer: 'Sidestørrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende og tilpassede dimensioner. Gitterpuslespil understøtter ikke Kvadrat (1200×1200). Eksportér som højopløst JPEG eller trykfærdig PDF med 300 DPI. Skift gråtone. Hver generering producerer fire downloadfiler.',
    },
    {
      question: 'Kan jeg sælge gittermatchningspuslespil lavet med dette værktøj kommercielt?',
      answer: 'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge gittermatchningspuslespil som digitale downloads på Etsy, trykte arbejdsbøger på Amazon KDP, produktlinjeressourcer på Gumroad eller gennem enhver anden salgskanal.',
    },
    {
      question: 'Hvad er jeres tilbagebetalingspolitik?',
      answer: 'Prøv før du køber med vores gratis prøveversion — alle funktioner er tilgængelige. Da den gratis prøveversion giver dig fuldstændig adgang, tilbyder vi ikke tilbagebetaling på licenskøb. Sørg for, at værktøjet passer til dine behov med den gratis prøveversion, før du køber.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'raster-puslespil-arbejdsark', anchorText: 'Gitterpuslespil — Fulde Produktdetaljer' },
    { pageType: 'tool', slug: 'matchnings-arbejdsark-skaber', anchorText: 'Matchnings Arbejdsark Skaber' },
    { pageType: 'tool', slug: 'skyggematchning-skaber', anchorText: 'Skyggematchning Skaber' },
    { pageType: 'tool', slug: 'billedbingo-skaber', anchorText: 'Billedbingo Skaber' },
    { pageType: 'tool', slug: 'manglende-brikker-skaber', anchorText: 'Manglende Brikker Puslespil Skaber' },
    { pageType: 'tool', slug: 'find-den-underlige-skaber', anchorText: 'Find den Underlige Skaber' },
    { pageType: 'tool', slug: 'sorter-billeder-skaber', anchorText: 'Sortér Billeder Skaber' },
    { pageType: 'tool', slug: 'additions-arbejdsark-skaber', anchorText: 'Additions Arbejdsark Skaber' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/danish/grid%20match/Gitterpuslespil%201.jpeg',
      primaryAlt: 'Gittermatchning arbejdsark med enkelt billede opdelt i fliser, ledetrådsceller synlige og nummereret flisepalet for rumligt ræsonnementpuslespil',
    },
    sampleGallery: [
      {
        src: '/samples/danish/grid%20match/Gitterpuslespil%201.jpeg',
        alt: 'Tre gange tre gittermatchningspuslespil med én ledetrådscelle synlig og otte nummererede fliser i blandet palet til matchning',
        caption: '3×3 gitterpuslespil — én ledetrådscelle synlig, otte fliser at matche fra nummereret palet',
      },
      {
        src: '/samples/danish/grid%20match/Gitterpuslespil%202.jpeg',
        alt: 'Fire gange fire avanceret gittermatchningspuslespil med seksten fliser og minimale ledetråde for udfordrende visuel perceptionsaktivitet',
        caption: '4×4 avanceret puslespil — maksimal gitterstørrelse med 16 fliser for udfordrende rumligt ræsonnement',
      },
      {
        src: '/samples/danish/grid%20match/Gitterpuslespil%201%20answer_key.jpeg',
        alt: 'Gittermatchning facit, der viser komplet billede med nummererede gule cirkler overlejret på hver gittercelle, der angiver korrekt flisplacering',
        caption: 'Automatisk genereret facit — nummererede cirkler (#ffffe0) viser korrekt flisplacering på komplet billede',
      },
    ],
    youtubeId: 'RGtED1Bnut8',
    videoTitle: 'Sådan Laver du Gittermatchningspuslespil med Konfigurerbare Gitterstørrelser, Justerbare Ledetrådsceller og Automatiske Facit — Trin-for-Trin Vejledning',
  },
};

export default content;
