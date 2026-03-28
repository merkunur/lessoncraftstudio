import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'skyggematchning generator',
    secondaryKeywords: [
      'printbar silhuetmatchning aktivitet skaber til Etsy-sælgere',
      'billedskygge puslespil arbejdsark generator til KDP',
      'skyggematchning arbejdsark skaber kommerciel licens',
      'sælg skyggematchnings arbejdsark på Gumroad',
    ],
    lsiKeywords: [
      'digitale silhuetmatchnings printbare online forretning',
      'kommercielt brug skyggepuslespil arbejdsark generator',
      'printbar visuel matchningsaktivitet forretningsværktøj',
    ],
    titleTag: 'Skyggematchning Generator | Opret Silhuetpuslespil',
    metaDescription:
      'Opret skyggematchnings arbejdsark til salg på Etsy, KDP og Gumroad. Skyggematchning og gør-den-hel-tilstande, autosilhuetter, 104 temaer. Gratis prøveversion.',
  },

  hero: {
    title: 'Skyggematchning Arbejdsark Generator til Silhuet- og Delt-Billede Matchningsaktiviteter',
    tagline: 'To matchningstilstande i én generator — Skyggematchning opretter automatisk genererede sorte silhuetter fra ethvert billede, Gør Den Hel deler billeder i halvdele — begge med Fisher-Yates-derangering, der sikrer ingen trivielle matchninger, automatisk genererede facit og 104 tematiske billedsamlinger.',
    description:
      'Byg professionelle skyggematchnings arbejdsark, hvor brugerne matcher farvede billeder med deres silhuetter eller genforbinder delte billedhalvdele. Skyggematchning-tilstanden placerer 4 farvede billeder mærket A, B, C, D i den øvre række og 4 automatisk genererede sorte silhuetter mærket 1, 2, 3, 4 i den nedre række — silhuetterne oprettes gennem billedbehandling på pixelniveau, der konverterer hver pixel med alfa > 10 til rent sort, hvilket producerer korrekte konturer, der bevarer hvert billedes præcise gennemsigtighedsprofil. Gør Den Hel-tilstanden deler billeder i halvdele med horisontal eller vertikal klipretning, mærker første halvdele A–D og anden halvdele 1–4, og tilpasser layoutet baseret på orientering. Begge tilstande bruger Fisher-Yates-derangering for at garantere, at intet objekt vises i sin oprindelige position, hvilket skaber ægte matchningsudfordringer hver gang. Slå vis/skjul etiketter til for A/B/C/D og 1/2/3/4 identifikatorer, tilføj valgfri navn- og datofelter til produktlinjebrug, og generer autofacit, der viser hver korrekt bogstav-til-nummer-parring. Skyggematchning Arbejdsark Generatoren er IKKE sprogfølsom: resultatet er rent visuelt uden lokaliseret ordindhold på selve arbejdsarket. Det samme skyggematchningsarbejdsark fungerer identisk på alle markeder uden oversættelse. Fuld Adgang låser op for alle 104 temaer med mere end 3.100 illustrationer og alle 11 brugerfladesprog. Tilføj baggrundstemaer og rammetemaer med uafhængige opacitetskontroller, inkluder brugerdefineret tekst med syv skrifttypemuligheder, og eksporter trykklare PDF\'er og JPEG-billeder med 300 DPI i Letter, A4, Kvadrat (1200×1200) eller brugerdefinerede størrelser. Uanset om du sælger skyggepuslespil-pakker på Etsy.dk, sammensætter visuel perceptions-arbejdsbøger til Amazon KDP eller opretter hurtigsluts-aktiviteter til Gumroad — denne generator leverer produktionsklare arbejdsark på få minutter. Gratis prøveversion med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  howItWorks: {
    title: 'Sådan Opretter du Skyggematchnings Arbejdsark i 5 Trin',
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
    title: 'Nøglefunktioner i Skyggematchning Arbejdsark Generatoren',
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
    title: 'Sådan Sælger du Skyggematchnings Arbejdsark Online',
    cases: [
      {
        title: 'Tematiske skyggematchnings-pakker på Etsy.dk',
        description:
          'Opret tematiske skyggematchningspakker med de 104 billedsamlinger — dyreskyggepuslespil, køretøjssilhuetmatchning, madskyggeudfod­ringer og snesevis flere. Hvert tema giver illustrationer med distinkte konturer, der skaber engagerende silhuetaktiviteter. Pak 15–20 skyggematchnings arbejdsark per tema med facit inkluderet, og sælg til 25–60 kr per pakke. Bland begge tilstande inden for en enkelt pakke: Skyggematchnings arbejdsark til silhuetgenkendelse og Gør Den Hel-arbejdsark til rumligt ræsonnement. De automatisk genererede silhuetter og facit eliminerer de mest tidskrævende dele af produktionen.',
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
      question: 'Hvad er de to øvelsestilstande, og hvordan adskiller de sig?',
      answer:
        'Generatoren tilbyder to distinkte tilstande. Skyggematchning-tilstanden placerer 4 farvede billeder i den øvre række og 4 automatisk genererede sorte silhuetter i den nedre række — brugerne matcher hvert billede med dets skygge ved at parre bogstaver (A–D) med numre (1–4). Gør Den Hel-tilstanden deler 4 billeder i halvdele og præsenterer første halvdele (A–D) og anden halvdele (1–4) separat — brugerne matcher halvdele for at fuldende hvert billede. Skyggematchning tester silhuetgenkendelse, mens Gør Den Hel udvikler rumlig bevidsthed og del-til-hel-ræsonnement.',
    },
    {
      question: 'Hvordan genereres silhuetterne?',
      answer:
        'Silhuetterne oprettes gennem ægte billedbehandling på pixelniveau, ikke CSS-filtre eller forudfremstillede skyggeaktiver. Appen indlæser hvert billede til et lærred, udtræk hver pixel med getImageData og konverterer alle pixels med en alfaværdi større end 10 til rent sort (R=0, G=0, B=0, A=255). Dette bevarer den præcise gennemsigtighedsprofil for hvert kildebillede og producerer korrekte sorte silhuetter, der afspejler fine detaljer som ører, haler, håndtag og andre distinkte konturer.',
    },
    {
      question: 'Hvilke klipretnings­muligheder findes i Gør Den Hel-tilstanden?',
      answer:
        'Gør Den Hel-tilstanden tilbyder to klipretnings­muligheder via radioknapper: Horisontale klip deler billeder i øvre og nedre halvdele, mens vertikale klip deler billeder i venstre og højre halvdele. Klipretningen gælder for alle 4 billeder på arbejdsarket. Layoutet tilpasser sig automatisk baseret på sideorientering — liggende sider arrangerer objekter i 2 rækker × 4 objekter, mens stående sider bruger 2 kolonner × 4 objekter for optimal visuel balance.',
    },
    {
      question: 'Hvordan fungerer derangeringsalgoritmen?',
      answer:
        'Begge tilstande bruger en Fisher-Yates-derangeringsalgoritme, der garanterer, at intet objekt vises i sin oprindelige position. I Skyggematchning-tilstanden sidder ingen silhuet direkte under sit matchende billede. I Gør Den Hel-tilstanden vises ingen anden halvdel ved siden af sin matchende første halvdel. Dette sikrer, at hvert arbejdsark præsenterer en ægte matchningsudfordring — brugerne kan ikke gætte korrekt baseret udelukkende på position. Derangeringen beregnes på ny ved hver generering, hvilket producerer forskellige arrangementer fra de samme billeder.',
    },
    {
      question: 'Kan jeg slå A/B/C/D og 1/2/3/4 etiketterne til og fra?',
      answer:
        'Ja. Fluebenet \"Vis Etiketter\" i panelet Øvelseskonfiguration (standard TIL) kontrollerer, om A, B, C, D etiketter vises på billeder eller første halvdele, og 1, 2, 3, 4 etiketter vises på silhuetter eller anden halvdele. Når etiketterne er TIL, skriver brugerne bogstav-nummer-par som svar. Når etiketterne er FRA, bliver arbejdsarket en ren visuel matchningsudfordring uden alfanumerisk støtte — nyttigt til puslespilsbøger eller avancerede aktiviteter.',
    },
    {
      question: 'Hvorfor er der altid præcis 4 opgaver per arbejdsark?',
      answer:
        'Arbejdsarket bruger et fast antal på 4 matchningsproblemer. Dette er ikke konfigurerbart. Fire objekter giver den optimale balance for skygge- og delt-billede-matchning: tilstrækkelig variation til at skabe en ægte matchningsudfordring med derangering, samtidig med at hvert billede holdes stort nok til, at brugerne kan studere fine detaljer i silhuetter og delte halvdele. Det konsekvente 4-objektsformat fungerer også godt til pakke­produkter, hvor hver side har forudsigelig indholdstæthed.',
    },
    {
      question: 'Hvordan fungerer navn- og datofelterne?',
      answer:
        'Slå fluebenet \"Inkluder Navn/Dato-felter\" i panelet Øvelseskonfiguration til for at tilføje navn- og datolinjer nederst på arbejdsarket. Når aktiveret kan brugerne skrive deres navn og dato direkte på den udskrevne side — essentielt for produktlinjeansvar og organiseret bedømmelse. Når deaktiveret bruger arbejdsarket hele sidefladen til matchningsindhold. Denne mulighed fungerer med både Skyggematchning og Gør Den Hel-tilstande.',
    },
    {
      question: 'Hvordan fungerer det automatisk genererede facit?',
      answer:
        'Generatoren bruger et dobbeltlærredssystem med en Arbejdsarkfane og en Facitfane. I Skyggematchning-tilstanden viser facit et gitter, hvor hver celle viser originalbilledet ved siden af dets silhuet med en etiket som \"A → 2\". I Gør Den Hel-tilstanden viser hver celle det komplette originalbillede med sin matchningsetiket. Gitteret bruger 4 kolonner med konsekvent afstand. Begge versioner eksporteres separat med fire dedikerede downloadknapper: arbejdsark-JPEG, arbejdsark-PDF, facit-JPEG og facit-PDF.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — begge øvelsestilstande, automatisk genererede silhuetter, klipretningsvalg, facit, hele billedbiblioteket, baggrunds- og rammetemaer, etiketomskifter, navn/dato-felter, tekstværktøjer og alle downloadformater — uden at oprette en konto, indtaste kreditkort eller installere software. Downloads fra den gratis prøveversion indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket og giver fulde salgsrettigheder.',
    },
    {
      question: 'Er Skyggematchning Arbejdsark Generatoren sprogfølsom?',
      answer:
        'Nej. Skyggematchning er rent visuelt — arbejdsarkets resultat indeholder kun billeder, silhuetter og delte halvdele uden lokaliseret ordindhold. Appgrænsefladen (menuer, knapper, overskriftstekst) understøtter alle 11 sprog, men det genererede arbejdsark fungerer identisk uanset sprogvalg. Dette gør skyggematchnings arbejdsark universelt salgbare på alle markeder uden oversættelse. Kommerciel Pakke inkluderer 10 farverige temaer; Fuld Adgang låser op for alle 104 temaer og alle 11 brugerfladesprog.',
    },
    {
      question: 'Kan jeg sælge skyggematchnings arbejdsark oprettet med dette værktøj på Etsy og Amazon KDP?',
      answer:
        'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge dine skyggematchnings arbejdsark som digitale downloads på Etsy.dk, som trykte arbejdsbøger på Amazon KDP, som produktlinjeressourcer på Gumroad, eller via enhver anden salgskanal. De to øvelsestilstande, automatisk genererede silhuetter, derangeringsalgoritmen, autofacit og 104 tematiske billedsamlinger giver dig de kreative værktøjer til at producere originale, salgbare visuelle matchningsprodukter.',
    },
    {
      question: 'Hvad er returpolitikken?',
      answer:
        'Fordi den gratis prøveversion giver dig adgang til alle funktioner, tilbyder vi ingen refusioner på køb af kommercielle licenser. Du kan teste begge øvelsestilstande, automatisk genererede silhuetter, klipretningsvalg, facit, hele billedbiblioteket, baggrunds- og rammetemaer, etiketomskifter, navn/dato-felter, tekstværktøjer og alle downloadformater, før du køber. Den gratis prøveversion er returpolitikken — sikr dig, at værktøjet passer til dine behov, før du anskaffer en licens.',
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
      primary: '/samples/danish/shadow%20match/G%C3%B8r%20Billederne%20Hele%201.jpeg',
      primaryAlt: 'Skyggematchnings arbejdsark med farvede billeder i øvre række og automatisk genererede sorte silhuetter i nedre række med ravgul overskrift',
    },
    sampleGallery: [
      {
        src: '/samples/danish/shadow%20match/G%C3%B8r%20Billederne%20Hele%201.jpeg',
        alt: 'Skyggematchnings arbejdsark, der viser fire farvede billeder matchet med fire sorte silhuetter med bogstav- og nummeretiketter',
        caption: 'Skyggematchning-tilstand — brugerne matcher billeder med deres automatisk genererede silhuetter',
      },
      {
        src: '/samples/danish/shadow%20match/G%C3%B8r%20Billederne%20Hele%202.jpeg',
        alt: 'Gør den hel arbejdsark med delte billedhalvdele, som brugerne kobler sammen ved at matche første og anden halvdele',
        caption: 'Gør Den Hel-tilstand — brugerne matcher delte billedhalvdele for at fuldende billederne',
      },
      {
        src: '/samples/danish/shadow%20match/G%C3%B8r%20Billederne%20Hele%201%20answer-key.jpeg',
        alt: 'Skyggematchning facit, der viser originalbilleder med silhuetter og korrekte bogstav-til-nummer matchningsetiketter',
        caption: 'Automatisk genereret facit — bogstav-til-nummer etiketter viser korrekte matchninger',
      },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: 'Sådan Opretter du Skyggematchnings Arbejdsark med Silhuetter og Delte Billeder — Trin-for-Trin Guide',
  },
};

export default content;
