import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'gittermatchning puslespil generator',
    secondaryKeywords: [
      'printbar gitterpuslespil generator til Etsy-sælgere',
      'billedfliser matchnings arbejdsark generator til KDP',
      'gittermatchning puslespil generator kommerciel licens',
      'sælg gitterbilledpuslespil på Gumroad',
    ],
    lsiKeywords: [
      'digitale fliser matchnings printbare online forretning',
      'kommercielt brug gitterpuslespil arbejdsark generator',
      'printbar billedpuslespil forretningsværktøj',
    ],
    titleTag: 'Gittermatchning Puslespil Generator | Opret og Sælg',
    metaDescription:
      'Opret gittermatchningspuslespil til salg på Etsy, KDP og Gumroad. Konfigurerbar gitterstørrelse, justerbare ledetrådsceller, automatisk facit, 104 temaer. Gratis.',
  },

  hero: {
    title: 'Gittermatchning Puslespil Generator til Billedflisers Matchningsaktiviteter',
    tagline: 'Forvandl ethvert billede til et gitterbaseret billedpuslespil — del det op i fliser, vis konfigurerbare ledetrådsceller, bland resterende fliser til en nummereret palette, og auto-generer et facit med nummererede cirkeloverlay over 104 tematiske billedsamlinger.',
    description:
      'Byg professionelle gittermatchningspuslespil, hvor et enkelt billede deles op i et gitter af fliser, og brugerne matcher nummererede fliser tilbage til deres korrekte positioner. Konfigurer gitteret fra 2×2 op til 4×4 (2–4 rækker × 2–4 kolonner) og indstil 1–5 ledetrådsceller, der forbliver synlige som tips — færre ledetråde betyder sværere puslespil. Appen blander resterende fliser med Fisher-Yates-randomisering og viser dem i en nummereret palette ved siden af eller under gitteret. Brugerne studerer de synlige ledetrådsceller, gennemgår de nummererede fliser og skriver, hvilket nummer der hører hjemme i hver tom celle. Dobbeltlærredssystemet genererer både en arbejdsarkfane og en facitfane — facit viser det komplette billede med nummererede cirkler overlejret på hver celle, der viser korrekt fliseplacering, så du aldrig behøver oprette facit manuelt. Gittermatchning er IKKE sprogfølsom: puslespilsresultatet er rent visuelt uden lokaliseret ordindhold på selve arbejdsarket. Det samme gitterpuslespil fungerer identisk på alle markeder uden oversættelse. Fuld Adgang låser op for alle 104 temaer med mere end 3.100 illustrationer og alle 11 brugerfladesprog til appgrænsefladen. Tilføj baggrundstemaer og rammetemaer med uafhængige opacitetskontroller, inkluder brugerdefineret tekst med syv skrifttypemuligheder, og eksporter trykklare PDF\'er og JPEG-billeder med 300 DPI i Letter, A4 eller brugerdefinerede størrelser. Uanset om du sælger billedpuslespil-pakker på Etsy.dk, sammensætter visuel perceptions-arbejdsbøger til Amazon KDP eller opretter hurtigsluts-puslespilsaktiviteter til Gumroad — denne generator leverer produktionsklare gitterpuslespil på få minutter. Gratis prøveversion med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  howItWorks: {
    title: 'Sådan Opretter du Gittermatchningspuslespil i 5 Trin',
    steps: [
      {
        title: 'Indstil sidelayoutet',
        description:
          'Åbn panelet Sideopsætning og vælg en sidestørrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende eller en brugerdefineret dimension. Vælg en reservefarve med farvevælgeren. Vælg et baggrundstema og juster dets opacitet (0–1 i 0,05-trin), vælg derefter et rammetema med sin egen uafhængige opacitetskontrol. Disse layoutvalg rammer dit gitterpuslespil ind, før du konfigurerer noget indhold. Bemærk: Kvadratisk sidestørrelse er ikke tilgængelig for Gittermatchning.',
      },
      {
        title: 'Konfigurer gitteret',
        description:
          'Åbn panelet Gittermuligheder og indstil antallet af rækker (2–4, standard 3) og kolonner (2–4, standard 3) til dit puslespilsgitter. Indstil derefter antallet af ledetrådsceller (1–5, standard 1) — dette er fliser, der forbliver synlige på arbejdsarket som tips til brugerne. Et 3×3-gitter med 1 ledetråd generator et udfordrende puslespil med 8 fliser at matche, mens et 2×2-gitter med 3 ledetråde generator en simpel opvarmning med kun 1 flise at placere. Denne konfigurerbare sværhedsgrad gør det nemt at oprette graderede puslespilssæt.',
      },
      {
        title: 'Vælg et billede',
        description:
          'Åbn panelet Billedbibliotek og gennemse 104 tematiske samlinger med mere end 3.100 farverige illustrationer — dyr, mad, køretøjer, natur, højtider og snesevis flere. Filtrer efter tema med dropdownen eller søg med nøgleord. Klik på et billede for at vælge det til dit puslespil. Den valgte billedforhåndsvisning viser dit valg før generering. Du kan også uploade egne PNG-, JPG- eller GIF-billeder med panelet Upload Egne Billeder for at oprette personaliserede gitterpuslespil fra dine egne fotos eller kunstværker.',
      },
      {
        title: 'Generer gitterpuslespil-arbejdsarket',
        description:
          'Klik på Generer for at oprette gittermatchningspuslespillet. Appen deler dit valgte billede op i det konfigurerede gitter, viser ledetrådscellerne med de faktiske billedfliser synlige og markerer resterende celler med \"?\"-pladsholdere. Alle fliser blandes med Fisher-Yates-randomisering og vises som en nummereret palette. Stående layouts placerer gitteret øverst med paletten nedenfor; liggende layouts positionerer gitteret til venstre med paletten til højre. En stiliseret overskrift vises med cyan baggrund (#00BCD4), dyblilla titel (#6A1B9A) og orange ramkant (#FF8C42), der viser \"Gittermatchning\" og instruktioner på det valgte sprog.',
      },
      {
        title: 'Generer facit og download',
        description:
          'Skift til fanen Facit for at se det automatisk genererede facit. Det viser det komplette, uopdelte billede med nummererede cirkler overlejret på hver gittercelle — gul baggrund (#ffffe0) cirkler med sorte konturer, der viser, hvilket palettenummer der hører hjemme i hver position. Download begge versioner med de fire dedikerede knapper: Arbejdsark-JPEG, Facit-JPEG, Arbejdsark-PDF og Facit-PDF med 300 DPI. Slå gråtone til for blækvenlige versioner. Hver eksport er produktionsklar til Etsy-annoncer, Amazon KDP-indersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nøglefunktioner i Gittermatchning Puslespil Generatoren',
    features: [
      {
        title: 'Enkeltbilledgitterpuslespil med konfigurerbare rækker og kolonner (2–4 × 2–4)',
        description:
          'Hvert puslespil begynder med ét billede opdelt i et gitter af fliser. Indstil 2–4 rækker og 2–4 kolonner uafhængigt, hvilket generator gitre fra 2×2 (4 fliser) op til 4×4 (16 fliser). Standard 3×3-gitteret producerer 9 fliser — en balanceret sværhedsgrad for de fleste aldre. Mindre gitre fungerer godt til introduktionspuslespil og yngre brugere, mens større gitre udfordrer ældre brugere og generator premiumpuslespilsprodukter. Til forskel fra matchningsarbejdsark med flere billeder tester gitterpuslespillet rumligt ræsonnement og visuel analyse af et enkelt komplet billede.',
      },
      {
        title: 'Justerbart antal ledetrådsceller for skalerbar sværhedsgrad (1–5 synlige celler)',
        description:
          'Kontroller puslespillets sværhed ved at indstille 1–5 ledetrådsceller, der forbliver synlige på arbejdsarket som tips. Med et 3×3-gitter og 1 ledetråd skal brugerne matche 8 blandede fliser — en ægte udfordring. Med 5 ledetråde på det samme gitter skal kun 4 fliser matches — en tilgængelig opvarmning. Denne ene kontrol forvandler det samme billede til puslespil, der spænder fra let til avanceret sværhed, hvilket lader dig oprette graderede puslespilssæt fra ét billede og én gitterkonfiguration. Standard er 1 ledetrådscelle for maksimal udfordring.',
      },
      {
        title: 'Blandet nummereret flisepalette med Fisher-Yates-randomisering',
        description:
          'Skjulte fliser blandes med Fisher-Yates-algoritmen og vises i en nummereret palette ved siden af gitteret. Hver flise får et unikt nummer, som brugerne refererer til, når de skriver svar. Randomiseringen sikrer, at hvert genereret puslespil har en anderledes fliserækkefølge, selv når det samme billede og de samme gitterindstillinger bruges. Det betyder, at du kan producere flere unikke puslespilsarbejdsark fra et enkelt billede ved simpelthen at regenerere — værdifuldt til at oprette variationspakker uden at behøve forskellige kildebilleder.',
      },
      {
        title: 'Automatisk genereret facit med nummererede cirkeloverlay på komplet billede',
        description:
          'Hvert gitterpuslespil genererer automatisk en ledsagende facitliste på en separat lærredsfane. Facit viser det komplette, uopdelte billede med nummererede cirkler overlejret på hver gittercelle — gul baggrund (#ffffe0) cirkler med sorte konturer og sort nummertekst i Fredoka-skrifttype. Hvert nummer svarer til den blandede paletterækkefølge fra arbejdsarket og viser brugere og sælgere præcis, hvilken flise der hører hvor. Ingen manuel facitoprettelse, ingen separat fil — facit forbliver perfekt synkroniseret med arbejdsarket.',
      },
      {
        title: 'Billedbibliotek med 104 tematiske samlinger og mere end 3.100 illustrationer',
        description:
          'Gennemse 104 tematiske billedsamlinger, der dækker dyr, mad, køretøjer, natur, erhverv, højtider, sport, årstider og snesevis flere. Hvert tema giver farverige illustrationer, der fungerer smukt som gitterpuslespils-kildebilleder. Filtrer efter tema med dropdownen eller søg efter specifikke billeder med nøgleord. Klik på ethvert billede for at vælge det som din puslespilskilde. Kommerciel Pakke inkluderer 10 farverige temaer til at komme i gang; Fuld Adgang låser op for alle 104 temaer for maksimal kreativ variation over alle gitterpuslespilsprodukter.',
      },
      {
        title: 'Responsivt stående og liggende layout med automatisk ompositionering',
        description:
          'Generatoren tilpasser automatisk sit layout baseret på sideorientering. Stående sider (højde > bredde) placerer gitteret øverst med 45% af tilgængelig højde med den nummererede palette nedenfor, plus en fuldbredde-overskrift (100px højde, 15px radius). Liggende sider (bredde > højde) positionerer gitteret på den venstre halvdel (48% af tilgængelig bredde) med paletten til højre, med en kompakt overskrift (70px højde, 35px radius). Denne automatiske ompositionering sikrer, at gitterpuslespil ser polerede ud på både Letter og A4 i begge orienteringer uden manuelle layoutjusteringer.',
      },
      {
        title: 'Trykfærdig PDF- og JPEG-eksport med 300 DPI og gråtoneomskifter',
        description:
          'Download gitterpuslespil og facit som højopløste JPEG-billeder eller trykklare PDF-dokumenter renderet med 300 DPI (6× multiplikator, JPEG-kvalitet 1,0). Fire dedikerede downloadknapper eksporterer arbejdsark og facitfiler separat. Sidestørrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende og helt brugerdefinerede dimensioner. PDF-orientering detekteres automatisk. Slå gråtone til for blækvenlige versioner, der sparer toner, mens gitterstrukturen bevares. Hver eksport er produktionsklar til digitale downloads, trykte arbejdsbøger og produktlinjeuddeling.',
      },
      {
        title: 'Fuld lærredsredigering med tekstværktøjer, justering og lagkontroller',
        description:
          'Fabric.js-lærredet giver komplet kontrol over hvert element på dit gitterpuslespil. Træk, ændr størrelse, roter og flyt billeder, tekst og genereret indhold frit. Lagkontroller håndterer stablingsrækkefølge — flyt elementer fremad eller send dem bagud. Lås færdige elementer, mens du redigerer andre. Tilføj brugerdefineret tekst med syv skrifttypemuligheder (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar størrelse og farve, og tekstkonturbredde fra 0 til 10 med 0,5-trins granularitet. Seks justeringsmuligheder plus centrer-på-siden holder layouts præcise. Zoom fra 25% til 300% for detailarbejde. Fortryd og gentag op til 20 historiktrin med Ctrl+Z og Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Sådan Sælger du Gittermatchningspuslespil Online',
    cases: [
      {
        title: 'Tematiske gitterpuslespil-pakker på Etsy.dk',
        description:
          'Opret tematiske gitterpuslespil-pakker med de 104 billedsamlinger — dyregitterpuslespil, køretøjsgitterpuslespil, højtidsbilledpuslespil og snesevis flere. Hvert tema giver tilstrækkeligt med illustrationer til 20–30 unikke puslespilsarbejdsark med varierende gitterstørrelser og ledetrådsantal. Pak 15–25 gitterpuslespil per tema med facit inkluderet, og sælg til 25–60 kr per pakke. Inkluder en blanding af lette (2×2 med 3 ledetråde), middel (3×3 med 2 ledetråde) og svære (4×4 med 1 ledetråd) puslespil i hver pakke for bred appel. Det automatisk genererede facit med nummererede overlay eliminerer den mest tidskrævende del af puslespilsoprettelse.',
        platform: 'Etsy (etsy.dk)',
      },
      {
        title: 'Billedpuslespil-arbejdsbøger på Amazon KDP',
        description:
          'Saml 50–100 gittermatchningspuslespil til en trykt arbejdsbog formateret til Amazon KDP. Strukturér din bog efter progressiv sværhedsgrad: Kapitel 1 bruger 2×2-gitre med 3 ledetråde til begyndere, Kapitel 2 bruger 3×3-gitre med 2 ledetråde til mellemniveau, og Kapitel 3 bruger 4×4-gitre med 1 ledetråd til avancerede løsere. Inkluder facitsider i slutningen af bogen med de automatisk genererede nummererede cirkeloverlay. Gråtoneomskifteren producerer blækvenlige sider klar til sort-hvide bogsindersider. Visuelle perceptionspuslespilsbøger klarer sig godt i aktivitetsbogskategorien året rundt.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Produktlinjepuslespil-aktiviteter til Gumroad',
        description:
          'Byg færdige gitterpuslespil-aktiviteter til hurtigsluts-øvelser, morgenarbejde eller berigelse. Købere, der søger på Gumroad efter visuelle perceptionsaktiviteter, værdsætter puslespil, der ankommer trykklare med facit. Opret produktkatalogtilgrænsende sæt: dyrebilledpuslespil til naturfagsenheder, vartegnspuslespil til samfundsfag, madpuslespil til sundhed og ernæring. Den konfigurerbare sværhedsgrad lader dig differentiere inden for et enkelt produkt — inkluder lette, middel og svære versioner af de samme tematiske puslespil, så sælgere kan tildele efter niveau.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sæsonbetonede gitterpuslespil-samlinger',
        description:
          'De 104 tematiske billedsamlinger dækker enhver sæson- og højtidslejlighed — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Opret tidsbegrænsede gitterpuslespil-samlinger, der falder sammen med topindkøbsperioder. Udgiv halloween-puslespilspakker i september, julesamlinger i oktober og valentinsdag-pakker i januar. Inkluder flere gitterstørrelser og sværhedsgrader i hvert sæsonsæt for maksimal værdi. Sæsonprodukter motiverer højere priser under deres topvinduer og generator naturlige grunde til genkøb.',
        platform: 'Etsy / Amazon KDP / Gumroad (sæsonbetonet)',
      },
      {
        title: 'Tilpassede fotogitterpuslespil til personaliserede produkter',
        description:
          'Brug funktionen Upload Egne Billeder til at oprette gitterpuslespil fra ethvert foto eller kunstværk. Familiefotopuslespil bliver unikke personlige gaver. Sælgere kan uploade klassebilleder til semesterafslutningsaktiviteter. Kæledyrsfotopuslespil, feriefotopuslespil og holdfotopuslespil generator alle unikke produkter. Tilbyd tilpasset gitterpuslespil-oprettelse som en premiumtjeneste på Etsy.dk, hvor kunder sender deres fotos, og du leverer trykte puslespilsarbejdsark med facit — et højmarginpersonaliseret produkt med minimal produktionstid.',
        platform: 'Etsy (personaliserede produkter)',
      },
    ],
  },

  faq: [
    {
      question: 'Hvilke gitterstørrelser er tilgængelige for gittermatchningspuslespil?',
      answer:
        'Generatoren understøtter 2–4 rækker og 2–4 kolonner, konfigureret uafhængigt. Dette generator gitre fra 2×2 (4 fliser) op til 4×4 (16 fliser). Standard er 3×3 (9 fliser). Mindre gitre er lettere og fungerer godt for yngre brugere; større gitre øger sværhedsgraden og visuel kompleksitet. Du kan indstille rækker og kolonner til forskellige værdier — for eksempel generator 2 rækker × 4 kolonner et bredt rektangulært puslespil.',
    },
    {
      question: 'Hvordan kontrollerer ledetrådsceller puslespillets sværhed?',
      answer:
        'Ledetrådsceller er gitterpositioner, hvor billedflisen forbliver synlig som et tip. Indstil 1–5 ledetrådsceller med skyderen i panelet Gittermuligheder (standard er 1). Flere ledetråde gør puslespillet lettere, fordi brugerne har flere referencepunkter. For et 3×3-gitter med 1 ledetråd skal brugerne matche 8 fliser — ganske udfordrende. Med 5 ledetråde skal kun 4 fliser matches — meget mere tilgængeligt. Denne ene kontrol lader dig oprette graderede sværhedssæt fra det samme billede.',
    },
    {
      question: 'Hvordan fungerer gittermatchningspuslespillet for brugerne?',
      answer:
        'Arbejdsarket viser et gitter, hvor nogle celler viser den faktiske billedflise (ledetrådsceller) og resterende celler viser \"?\"-pladsholdere. Under eller ved siden af gitteret viser en nummereret palette alle skjulte fliser i blandet rækkefølge. Brugerne gennemgår ledetrådscellerne, studerer de nummererede fliser og afgør, hvilket nummer der hører hjemme i hver tom gitterposition. Svaret kræver rumligt ræsonnement — matchning af fliseindhold til dets korrekte plads i det overordnede billede.',
    },
    {
      question: 'Hvordan fungerer det automatisk genererede facit?',
      answer:
        'Generatoren bruger et dobbeltlærredssystem med en Arbejdsarkfane og en Facitfane. Facit viser det komplette, uopdelte billede med nummererede cirkler overlejret på hver gittercelle. Hver cirkel har en gul baggrund (#ffffe0) med sort kontur og viser palettenummeret, der hører hjemme i den position. Numrene svarer til den blandede fliserækkefølge fra arbejdsarket, hvilket gør facitkontrol enkel. Begge versioner eksporteres separat med fire dedikerede downloadknapper.',
    },
    {
      question: 'Kan jeg bruge egne billeder til gitterpuslespil?',
      answer:
        'Ja. Panelet Upload Egne Billeder lader dig uploade PNG-, JPG- eller GIF-filer fra din computer. Uploadede billeder vises i et galleri under uploadområdet. Klik på ethvert uploadet billede for at vælge det som din puslespilskilde. Denne funktion er ideel til at oprette personaliserede puslespil fra fotos, tilpasset kunstværk eller brandede billeder. Du kan bruge uploadede billeder ved siden af det indbyggede bibliotek — skift frit mellem dem.',
    },
    {
      question: 'Hvordan tilpasser layoutet sig til stående og liggende orientering?',
      answer:
        'Generatoren registrerer automatisk din sideorientering og ompositionerer elementer i overensstemmelse hermed. Stående sider placerer gitteret øverst (med 45% af tilgængelig højde) med den nummererede palette nedenfor og en fuldbredde-overskrift. Liggende sider positionerer gitteret på den venstre halvdel (48% af tilgængelig bredde) med paletten til højre og en kompakt overskrift. Dette sikrer, at gitterpuslespil ser balancerede og professionelle ud i begge orienteringer uden manuelle layoutjusteringer.',
    },
    {
      question: 'Kan jeg generere flere unikke puslespil fra det samme billede?',
      answer:
        'Ja. Hver gang du klikker på Generer, blander appen fliserne med Fisher-Yates-randomisering, hvilket producerer en anderledes nummereret fliserækkefølge. Ledetrådscellernes positioner ændres også mellem genereringer. Det betyder, at du kan oprette flere distinkte puslespilsarbejdsark fra et enkelt billede uden at ændre nogen indstillinger — hvert har forskellige flisenumre og ledetrådspositioner, hvilket gør dem til unikke puslespilsoplevelser.',
    },
    {
      question: 'Hvordan fungerer sværhedsskalering over gitterstørrelser og ledetrådsantal?',
      answer:
        'Sværheden afhænger af to faktorer: samlet antal fliser (gitterstørrelse) og synlige ledetråde. Et 2×2-gitter med 3 ledetråde efterlader kun 1 flise at matche — det lettest mulige puslespil. Et 4×4-gitter med 1 ledetråd kræver matchning af 15 fliser — den sværeste konfiguration. Mellem disse yderpunkter kan du oprette ethvert sværhedsniveau. Til graderede arbejdsbøger, begynd med 2×2-gitre (3 ledetråde), fortsæt til 3×3 (2 ledetråde) og afslut med 4×4 (1 ledetråd) for en naturlig sværhedskurve.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — alle gitterstørrelser, justerbare ledetrådsceller, det automatisk genererede facit med nummererede overlay, hele billedbiblioteket, baggrunds- og rammetemaer, upload af egne billeder, tekstværktøjer og alle downloadformater — uden at oprette en konto, indtaste kreditkort eller installere software. Downloads fra den gratis prøveversion indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket og giver fulde salgsrettigheder.',
    },
    {
      question: 'Er Gittermatchning Puslespil Generatoren sprogfølsom?',
      answer:
        'Nej. Gittermatchning er rent visuelt — puslespilsresultatet indeholder kun billedfliser og tal, uden lokaliseret ordindhold på selve arbejdsarket. Appgrænsefladen (menuer, knapper, overskriftstekst) understøtter alle 11 sprog, men det genererede puslespil fungerer identisk uanset sprogvalg. Dette gør gittermatchningspuslespil universelt salgbare på alle markeder uden oversættelse. Kommerciel Pakke inkluderer 10 farverige temaer; Fuld Adgang låser op for alle 104 temaer og alle 11 brugerfladesprog.',
    },
    {
      question: 'Kan jeg sælge gittermatchningspuslespil oprettet med dette værktøj på Etsy og Amazon KDP?',
      answer:
        'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge dine gittermatchningspuslespil som digitale downloads på Etsy.dk, som trykte arbejdsbøger på Amazon KDP, som produktlinjeressourcer på Gumroad, eller via enhver anden salgskanal. De konfigurerbare gitterstørrelser, justerbare ledetrådsceller, automatisk genererede facit og 104 tematiske billedsamlinger giver dig de kreative værktøjer til at producere originale, salgbare gitterpuslespilsprodukter.',
    },
    {
      question: 'Hvad er returpolitikken?',
      answer:
        'Fordi den gratis prøveversion giver dig adgang til alle funktioner, tilbyder vi ingen refusioner på køb af kommercielle licenser. Du kan teste alle gitterstørrelser, ledetrådscellekonfigurationer, det automatisk genererede facit med nummererede overlay, hele billedbiblioteket, baggrunds- og rammetemaer, upload af egne billeder, tekstværktøjer og alle downloadformater, før du køber. Den gratis prøveversion er returpolitikken — sikr dig, at værktøjet passer til dine behov, før du anskaffer en licens.',
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
      slug: 'skygge-match-arbejdsark',
      anchorText: 'Skyggematchning Arbejdsark Generator',
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
      slug: 'manglende-brikker-arbejdsark',
      anchorText: 'Manglende Brikker Arbejdsark Generator',
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
      slug: 'skab-matchnings-arbejdsark',
      anchorText: 'Sådan Opretter du Matchning og Gitterpuslespil Arbejdsark',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/danish/grid%20match/Gitterpuslespil%201.webp',
      primaryAlt: 'Gittermatchning billedpuslespil arbejdsark med billedfliser opdelt i et gitter, ledetrådsceller synlige og nummereret flisepalette til matchning',
    },
    sampleGallery: [
      {
        src: '/samples/danish/grid%20match/Gitterpuslespil%201.webp',
        alt: 'Tre gange tre gittermatchningspuslespil med én ledetrådscelle og otte nummererede fliser i paletten',
        caption: '3×3 gitterpuslespil — én ledetrådscelle synlig, otte fliser at matche fra nummereret palette',
      },
      {
        src: '/samples/danish/grid%20match/Gitterpuslespil%202.webp',
        alt: 'Gittermatchningspuslespil med et andet tema og varieret gitterstørrelse',
        caption: 'Tematisk gitterpuslespil — 104 temaer giver unikke visuelle perceptionsudfordringer',
      },
      {
        src: '/samples/danish/grid%20match/Gitterpuslespil%203.webp',
        alt: 'Gittermatchning facit, der viser komplet billede med nummererede cirkler overlejret på hver gittercelle',
        caption: 'Automatisk genereret facit — nummererede cirkler viser korrekt fliseplacering på komplet billede',
      },
    ],
    youtubeId: 'RGtED1Bnut8',
    videoTitle: 'Sådan Opretter du Gittermatchning Billedpuslespil med Konfigurerbar Sværhedsgrad — Trin-for-Trin Guide',
  },
};

export default content;
