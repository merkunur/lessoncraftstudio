import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'billedsudoku generator',
    secondaryKeywords: [
      'printbar billedsudoku skaber til Etsy-sælgere',
      'billedsudoku puslespil generator til KDP-udgivere',
      'billedsudoku arbejdsark skaber kommerciel licens',
      'sælg sudoku puslespilsarbejdsark på Gumroad',
    ],
    lsiKeywords: [
      'digitale sudoku printbare produkter online forretning',
      'kommercielt brug billedpuslespil generator',
      'printbar logikpuslespil forretningsværktøj',
    ],
    titleTag: 'Billedsudoku Generator | Opret og Sælg Arbejdsark',
    metaDescription:
      'Opret billedsudoku arbejdsark til salg på Etsy, KDP og Gumroad. 4×4 gitter, tre sværhedsgrader, automatisk facit, 104 temaer. Gratis prøveversion.',
  },

  hero: {
    title: 'Billedsudoku Arbejdsark Generator til 4×4 Billedlogikpuslespil',
    tagline: 'Visuelle 4×4 sudokupuslespil med billeder i stedet for tal — tre sværhedsgrader fra 4 til 8 tomme celler, automatisk genererede facit med komplette udfyldte gitre og temabaseret billedvalg over 104 samlinger til puslespil, der sælger globalt uden oversættelse.',
    description:
      'Byg professionelle 4×4 billedsudoku arbejdsark, hvor brugerne udfylder tomme celler med de korrekte billeder ved hjælp af række-og-kolonne-logik. Hvert puslespil bruger præcis 4 unikke billeder, der skal vises én gang i hver række og én gang i hver kolonne — de samme regler som klassisk sudoku, men med farverige illustrationer i stedet for tal. Vælg blandt tre sværhedsgrader: Let fjerner 4 celler, Middel fjerner 6 og Svær fjerner 8 — halvdelen af gitteret. Vælg billeder gennem temabaseret autovalg, der tilfældigt vælger 4 billeder fra enhver af 104 tematiske samlinger, eller vælg manuelt præcis 4 billeder fra biblioteket, søg eller dine egne uploads. Det premiumdesignede gitter har alternerende 2×2-blokfarver i lyseblå og lyserosa, flerlagsede skygger og en indigoblå ydre ramme med afrundede hjørner. Hvert puslespil inkluderer en automatisk genereret \"Billedsudoku\"-overskrift lokaliseret på alle 11 sprog og et dobbeltlærredsfacit, der viser det komplette udfyldte gitter med alle 16 celler udfyldt. Fordi billedsudoku er helt visuelt — ingen ord vises på puslespilsgitteret — fungerer hvert arbejdsark identisk på alle 11 sprog, hvilket gør dine produkter salgbare globalt uden nogen modifikation. Fuld Adgang låser op for alle 104 temaer med mere end 3.100 illustrationer og alle 11 brugerfladesprog. Tilføj baggrundstemaer og rammetemaer med uafhængige opacitetskontroller, og eksporter trykklare PDF\'er og JPEG-billeder med 300 DPI i Letter, A4 eller brugerdefinerede størrelser. Uanset om du sælger tematiske sudokupakker på Etsy.dk, sammensætter logikarbejdsbøger til Amazon KDP eller opretter ræsonnementsaktiviteter til Gumroad — denne generator leverer produktionsklare puslespil på få minutter. Gratis prøveversion med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  howItWorks: {
    title: 'Sådan Opretter du Billedsudoku Arbejdsark i 5 Trin',
    steps: [
      {
        title: 'Indstil sidelayoutet',
        description:
          'Åbn panelet Side og Scene og vælg en sidestørrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende eller en brugerdefineret dimension. Vælg en reservefarve med farvevælgeren. Vælg et baggrundstema og juster dets opacitet (0–1 i 0,05-trin), vælg derefter et rammetema med sin egen uafhængige opacitetskontrol. Disse layoutvalg rammer dit sudokupuslespil ind, før du konfigurerer noget indhold.',
      },
      {
        title: 'Vælg sværhedsgrad',
        description:
          'Åbn panelet Sudoku for Børn og vælg en sværhed fra dropdownen: Let, Middel eller Svær. Let fjerner 4 celler fra 4×4-gitteret og efterlader 12 udfyldte og 4 til brugeren at løse. Middel fjerner 6 celler for en moderat udfordring. Svær fjerner 8 celler — præcis halvdelen af gitteret — og kræver mere avanceret logisk ræsonnement. Systemet vælger tilfældigt, hvilke celler der bliver tomme, så at regenerere den samme sværhed producerer forskellige puslespilskonfigurationer hver gang.',
      },
      {
        title: 'Vælg præcis 4 billeder',
        description:
          'Åbn panelet Billedbibliotek og vælg, hvordan du vil vælge dine 4 puslespilsbilleder. Temabaseret valg vælger et tema fra dropdownen, og systemet vælger automatisk 4 tilfældige billeder fra den samling. Manuelt valg lader dig gennemse 104 tematiske samlinger med mere end 3.100 illustrationer, filtrere efter tema eller søge med nøgleord for at håndplukke præcis 4 billeder. Du kan også uploade egne billeder. Appen kræver præcis 4 billeder — hverken mere eller mindre — fordi et 4×4 sudokugitter bruger 4 unikke symboler.',
      },
      {
        title: 'Generer sudokupuslespillet',
        description:
          'Klik på Generer for at oprette 4×4 billedsudoku-gitteret. Appen placerer dine 4 valgte billeder i et gyldigt sudokuarrangement, hvor hvert billede vises præcis én gang per række og én gang per kolonne, og fjerner derefter det konfigurerede antal celler baseret på din sværhedsindstilling. Premiumgitteret viser alternerende 2×2-blokfarver i lyseblå (#F8F9FC) og lyserosa (#FFF5F7), med fede midtadskillere, flerlagsede skygger og en indigoblå ydre ramme (#667EEA) med afrundede hjørner. En stiliseret \"Billedsudoku\"-overskrift vises over gitteret med lilla baggrund (#5E35B1) og lokaliseret titeltekst.',
      },
      {
        title: 'Generer facit og download',
        description:
          'Skift til fanen Facit for at se det komplette udfyldte gitter med alle 16 celler udfyldt — ingen tomme. Download begge versioner med de fire dedikerede knapper: Arbejdsark-JPEG, Facit-JPEG, Arbejdsark-PDF og Facit-PDF. Filer eksporteres som sudoku_worksheet.jpeg/pdf og sudoku_answer_key.jpeg/pdf med 300 DPI. Slå gråtone til for blækvenlige versioner. Hver eksport er produktionsklar til Etsy-annoncer, Amazon KDP-indersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nøglefunktioner i Billedsudoku Generatoren',
    features: [
      {
        title: '4×4 billedsudoku med billeder i stedet for tal',
        description:
          'Hvert puslespil bruger et 4×4-gitter med 4 unikke farverige billeder, der erstatter traditionelle tal. Brugerne anvender de samme logikregler som klassisk sudoku — hvert billede skal vises præcis én gang i hver række og præcis én gang i hver kolonne — men det visuelle format gør puslespil tilgængelige for førlæsere og unge brugere, der endnu ikke har mestret tal. Det billedbaserede format gør også hvert puslespil universelt forståeligt uanset sprog, da ingen tekst vises inden for selve gitteret. Denne visuelle design er den vigtigste forskel, der åbner verdensmarkeder for dine printbare produkter.',
      },
      {
        title: 'Tre sværhedsgrader: Let, Middel og Svær',
        description:
          'Kontroller puslespilskompleksiteten med tre distinkte sværhedsindstillinger. Let fjerner 4 celler fra 16-cellers gitteret og efterlader 12 ledetråde — brugerne løser én celle ad gangen med simpel række-og-kolonne-eliminering. Middel fjerner 6 celler, hvilket kræver, at brugerne overvejer flere begrænsninger samtidig. Svær fjerner 8 celler — præcis halvdelen af gitteret — og kræver flertrins logisk ræsonnement for at fuldende. Systemet bestemmer tilfældigt, hvilke celler der bliver tomme, så at regenerere den samme sværhedsgrad producerer en anderledes puslespilskonfiguration hver gang.',
      },
      {
        title: 'Temabaseret og manuelt billedvalg for præcis 4 billeder',
        description:
          'To billedvalgsmetoder sikrer kreativ fleksibilitet. Temabaseret valg lader dig vælge ethvert tema fra dropdownen, og systemet vælger automatisk 4 tilfældige billeder fra den samling — perfekt til hurtig puslespilsgenerering. Manuelt valg åbner hele Billedbiblioteket, hvor du gennemser 104 tematiske samlinger, filtrerer efter tema eller søger med nøgleord for at håndplukke præcis 4 billeder. Du kan også uploade egne billeder. Appen håndhæver 4-billedskravet: du kan ikke generere et puslespil med færre eller flere end 4 unikke billeder, fordi hvert 4×4 sudokugitter bruger præcis 4 distinkte symboler.',
      },
      {
        title: 'Premiumgitterdesign med alternerende blokfarver og flerlagsede skygger',
        description:
          'Sudokugitteret har et poleret design, der løfter dine printbare produkter over grundlæggende puslespilsgeneratorer. Alternerende 2×2-blokke bruger lyseblå (#F8F9FC) og lyserosa (#FFF5F7) baggrunde for at hjælpe brugerne visuelt identificere blokgrænser. Fede midtadskillere (#7C8DB5, 3px streg) separerer de fire kvadranter, mens lettere indre linjer (#D1D9E6, 1,5px) definerer individuelle celler. En indigoblå ydre ramme (#667EEA) med 18px afrundede hjørner rammer hele gitteret ind, og tre flerlagsede skygger tilføjer dybde. Billeder vises med 65% af cellestørrelsen for tydelig visuel separation.',
      },
      {
        title: 'Automatisk genereret facit med komplet udfyldt gitter',
        description:
          'Hvert sudokupuslespil genererer automatisk en ledsagende facitliste på en separat lærredsfane. Facit viser det komplette 4×4-gitter med alle 16 celler udfyldt — hver tom celle fra arbejdsarket er udfyldt med det korrekte billede. Ingen manuel løsning, ingen separat filoprettelse — facit er altid synkroniseret med puslespillet. Denne dobbeltlærred-tilgang sparer betydelig produktionstid for sælgere, der opretter sudokupakker, hvor hvert puslespil har brug for sin egen løsningsside. Download facit som sudoku_answer_key.jpeg eller sudoku_answer_key.pdf ved siden af arbejdsarket.',
      },
      {
        title: 'Billedbibliotek med 104 tematiske samlinger og mere end 3.100 illustrationer',
        description:
          'Gennemse 104 tematiske billedsamlinger, der dækker dyr, mad, køretøjer, natur, erhverv, højtider, sport, årstider og snesevis flere. Hvert tema giver et koordineret sæt farverige illustrationer, der skaber visuelt sammenhængende sudokupuslespil. Filtrer efter tema med dropdownen eller søg efter specifikke billeder med nøgleord. Klik på ethvert billede for at tilføje det til dit puslespil. Kommerciel Pakke inkluderer 10 farverige temaer til at komme i gang; Fuld Adgang låser op for alle 104 temaer for maksimal kreativ variation over alle dine sudokuprodukter.',
      },
      {
        title: 'Trykfærdig PDF- og JPEG-eksport med 300 DPI og gråtoneomskifter',
        description:
          'Download sudoku arbejdsark og facit som højopløste JPEG-billeder eller trykklare PDF-dokumenter renderet med 300 DPI (6× lærred-multiplikator). Fire dedikerede downloadknapper eksporterer sudoku_worksheet.jpeg, sudoku_worksheet.pdf, sudoku_answer_key.jpeg og sudoku_answer_key.pdf separat. Sidestørrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende og helt brugerdefinerede dimensioner. Slå gråtone til for blækvenlige versioner, der sparer toner, mens billedtydeligheden bevares. Hver eksport er produktionsklar til digitale downloads, trykte arbejdsbøger og produktlinjeuddeling.',
      },
      {
        title: 'Fuld lærredsredigering med tekstværktøjer og 50-trins fortrydhistorik',
        description:
          'Fabric.js-lærredet giver komplet kontrol over hvert element på dit sudoku arbejdsark. Træk, ændr størrelse, roter og flyt billeder, tekst og genereret indhold frit. Lagkontroller håndterer stablingsrækkefølge — flyt elementer fremad eller send dem bagud. Tilføj brugerdefineret tekst med syv skrifttypemuligheder (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar størrelse og farve, og tekstkonturbredde fra 0 til 10 med 0,5-trins granularitet. Zoom fra 25% til 300% i 25%-trin for detailarbejde. Fortryd og gentag op til 50 historiktrin med Ctrl+Z og Ctrl+Y — mere end dobbelt den typiske fortryddybde for tryg eksperimentering.',
      },
    ],
  },

  businessUseCases: {
    title: 'Sådan Sælger du Billedsudoku Arbejdsark Online',
    cases: [
      {
        title: 'Tematiske billedsudoku-pakker på Etsy.dk',
        description:
          'Opret tematiske sudokupuslespil-pakker med de 104 billedsamlinger — dyresudoku, madsudoku, køretøjssudoku, havsudoku og snesevis flere. Hvert tema giver tilstrækkeligt med illustrationer til at generere flere unikke puslespil med forskellige billedkombinationer og cellekonfigurationer. Pak 15–30 sudokupuslespil per tema med facit inkluderet, og sælg til 25–60 kr per pakke. Bland sværhedsgrader inden for hver pakke: begynd med Let-puslespil til opvarmning og avancér til Svær for en komplet logikudfordringssamling. Det automatisk genererede facit eliminerer den største tidssluger i puslespilsproduktion.',
        platform: 'Etsy (etsy.dk)',
      },
      {
        title: 'Tidlige logikarbejdsbøger på Amazon KDP',
        description:
          'Saml 50–100 billedsudoku-puslespil til en trykt arbejdsbog formateret til Amazon KDP. Strukturér din bog efter progressiv sværhed: Kapitel 1 bruger Let-puslespil (4 tomme) til begyndere, der lærer række-og-kolonne-logik, Kapitel 2 øger til Middel (6 tomme), og Kapitel 3 udfordrer med Svær (8 tomme). Brug forskellige temaer per kapitel eller bland temaer hele vejen igennem for visuel variation. Inkluder facit i slutningen af bogen. Gråtoneomskifteren producerer blækvenlige sider klar til sort-hvide indersider, og det visuelle format betyder, at din arbejdsbog appellerer til købere verden over uden oversættelsesomkostninger.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Produktlinjelogik og ræsonnementsaktiviteter til Gumroad',
        description:
          'Byg færdige logikræsonnementsarbejdsark med trykte facit til produktlinjebrug. Købere, der søger på Gumroad efter kritisk tænkning-aktiviteter, værdsætter billedsudoku, fordi det udvikler logisk deduktion i et format tilgængeligt for tidlige brugere. Opret produktkatalogtilpassede sæt organiseret efter tema: bondegårdsdyr logikpuslespil, madgrupper ræsonnementsaktiviteter, samfundshjælper problemløsningsark. Hvert sæt inkluderer arbejdsark på flere sværhedsgrader og lærerfacit i både PDF- og JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sæsonbetonede og højtidssudoku puslespilssamlinger',
        description:
          'De 104 tematiske billedsamlinger dækker enhver sæson- og højtidslejlighed — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Opret tidsbegrænsede sudoku puslespilssamlinger, der falder sammen med topindkøbsperioder. Udgiv halloween-sudokupakker i september, julesamlinger i oktober og valentinsdag-pakker i januar. Inkluder alle tre sværhedsgrader i hvert sæsonsæt for maksimal værdi. Sæsonprodukter motiverer højere priser under deres topvinduer og skaber naturlige grunde til genkøb hele året.',
        platform: 'Etsy / Amazon KDP / Gumroad (sæsonbetonet)',
      },
      {
        title: 'Global markedsappel med visuelle puslespil',
        description:
          'Billedsudoku er helt visuelt — ingen ord, bogstaver eller tal vises inden for puslespilsgitteret. Dette betyder, at hvert arbejdsark, du opretter, fungerer identisk for købere i alle lande og på alle sprog. En enkelt sudokupakke betjener ethvert marked uden modifikation. List det samme produkt på flere Etsy-butikker eller regionale Amazon KDP-markedspladser uden at oprette separate sprogversioner. Denne visuelle fordel øger dramatisk dit adresserbare marked, mens produktionsindsatsen forbliver konstant.',
        platform: 'Globale markedspladser (alle platforme)',
      },
    ],
  },

  faq: [
    {
      question: 'Hvordan fungerer et 4×4 billedsudoku-puslespil?',
      answer:
        'Et 4×4 billedsudoku bruger et gitter med 16 celler arrangeret i 4 rækker og 4 kolonner. Fire unikke billeder erstatter traditionelle tal. Reglen er den samme som klassisk sudoku: hvert billede skal vises præcis én gang i hver række og præcis én gang i hver kolonne. Nogle celler begynder udfyldt med billeder (ledetråde), og brugeren udfylder de tomme celler ved at bruge logisk eliminering — tjekke, hvilket billede der mangler i hver række og kolonne for at bestemme korrekt placering.',
    },
    {
      question: 'Hvorfor bruge billeder i stedet for tal til sudoku?',
      answer:
        'Billeder gør sudoku tilgængeligt for førlæsere og unge brugere, der endnu ikke har mestret tal. Det visuelle format engagerer brugerne med farverige tematiske illustrationer, samtidig med at det udvikler de samme logiske ræsonnementsfærdigheder som talbaseret sudoku. Billedbaserede puslespil er også universelt forståelige — ingen sprog- eller talsystemkundskab kræves — hvilket gør dine produkter salgbare globalt uden oversættelse.',
    },
    {
      question: 'Hvad kontrollerer de tre sværhedsgrader?',
      answer:
        'Sværhed bestemmer, hvor mange celler der efterlades tomme til brugeren at løse. Let fjerner 4 celler fra 16-cellers gitteret og efterlader 12 ledetråde for enkel løsning. Middel fjerner 6 celler, hvilket kræver mere omhyggelig logisk deduktion. Svær fjerner 8 celler — præcis halvdelen af gitteret — og kræver flertrins ræsonnement. Systemet vælger tilfældigt, hvilke celler der bliver tomme, så at regenerere den samme sværhed skaber et anderledes puslespilslayout hver gang.',
    },
    {
      question: 'Hvorfor kræver generatoren præcis 4 billeder?',
      answer:
        'Et 4×4 sudokugitter bruger præcis 4 unikke symboler — hver forekommer 4 gange over de 16 celler. At vælge færre end 4 billeder ville efterlade gitteret ufuldstændigt, og at vælge flere end 4 ville bryde sudoku-begrænsningen om, at hvert symbol vises præcis én gang per række og kolonne. Appen håndhæver dette krav: temabaseret valg vælger automatisk 4 tilfældige billeder, og manuelt valg forhindrer tilføjelse af et 5. billede.',
    },
    {
      question: 'Hvad er forskellen mellem temabaseret og manuelt billedvalg?',
      answer:
        'Temabaseret valg lader dig vælge et tema fra dropdownen, og systemet vælger automatisk 4 tilfældige billeder fra den samling — ideelt til hurtig puslespilsgenerering. Manuelt valg åbner hele Billedbiblioteket, hvor du gennemser 104 tematiske samlinger, filtrerer efter tema eller søger med nøgleord for at håndplukke præcis 4 specifikke billeder. Du kan også uploade egne billeder. Begge metoder resulterer i præcis 4 billeder brugt i puslespillet.',
    },
    {
      question: 'Hvordan fungerer facit for billedsudoku?',
      answer:
        'Generatoren bruger et dobbeltlærredssystem med en Arbejdsarkfane og en Facitfane. Arbejdsarket viser 4×4-gitteret med tomme celler, hvor brugerne skal bestemme de korrekte billeder. Facit viser præcis det samme gitter, men med alle 16 celler udfyldt — hver tom celle er udfyldt med det rigtige billede. Begge versioner eksporteres separat med fire dedikerede knapper: sudoku_worksheet.jpeg, sudoku_worksheet.pdf, sudoku_answer_key.jpeg og sudoku_answer_key.pdf.',
    },
    {
      question: 'Hvad gør gitterdesignet premium?',
      answer:
        'Sudokugitteret har alternerende 2×2-blokbaggrunde i lyseblå (#F8F9FC) og lyserosa (#FFF5F7), der hjælper brugerne identificere blokgrænser. Fede midtadskillere (#7C8DB5, 3px streg) separerer de fire kvadranter, mens lettere indre linjer (#D1D9E6, 1,5px) definerer individuelle celler. En indigoblå ydre ramme (#667EEA) med 18px afrundede hjørner rammer hele gitteret ind, og tre flerlagsede skygger ved varierende forskydninger tilføjer professionel dybde. Billeder vises med 65% af cellestørrelsen for tydelig visuel separation.',
    },
    {
      question: 'Er puslespillene unikke, hver gang jeg genererer et?',
      answer:
        'Ja. Appen blander billeder tilfældigt, før den udfylder 4×4-gitteret, og vælger derefter tilfældigt, hvilke celler der skal være tomme baseret på sværhedsgraden. Selv med de samme 4 billeder og den samme sværhedsindstilling producerer regenerering et anderledes gyldigt sudokuarrangement med forskellige tomme cellepositioner. Denne randomisering lader dig oprette store samlinger af unikke puslespil fra et lille sæt tematiske billeder.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — alle tre sværhedsgrader, temabaseret og manuelt billedvalg, det automatisk genererede facit, hele billedbiblioteket, baggrunds- og rammetemaer, tekstværktøjer og alle downloadformater — uden at oprette en konto, indtaste kreditkort eller installere software. Downloads fra den gratis prøveversion indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket og giver fulde salgsrettigheder.',
    },
    {
      question: 'Er billedsudoku arbejdsark sprogfølsomme?',
      answer:
        'Nej. Billedsudoku er helt visuelt — puslespilsgitteret indeholder kun billeder, ingen ord eller tal. Dette gør, at hvert arbejdsark fungerer identisk på alle 11 understøttede sprog. Det eneste lokaliserede element er den automatisk genererede \"Billedsudoku\"-overskriftstekst over gitteret, som oversættes automatisk, når du skifter sprog. Puslespillet i sig selv kræver nul modifikation for forskellige markeder, hvilket gør det ideelt til global salg.',
    },
    {
      question: 'Kan jeg sælge billedsudoku arbejdsark oprettet med dette værktøj på Etsy og Amazon KDP?',
      answer:
        'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge dine billedsudoku arbejdsark som digitale downloads på Etsy.dk, som trykte arbejdsbøger på Amazon KDP, som produktlinjeressourcer på Gumroad, eller via enhver anden salgskanal. De tre sværhedsgrader, 104 tematiske billedsamlinger og det visuelle format giver dig de kreative værktøjer til at producere originale, globalt salgbare sudokuprodukter.',
    },
    {
      question: 'Hvad er returpolitikken?',
      answer:
        'Fordi den gratis prøveversion giver dig adgang til alle funktioner, tilbyder vi ingen refusioner på køb af kommercielle licenser. Du kan teste alle tre sværhedsgrader, temabaseret og manuelt billedvalg, det automatisk genererede facit, hele billedbiblioteket, baggrunds- og rammetemaer, tekstværktøjer og alle downloadformater, før du køber. Den gratis prøveversion er returpolitikken — sikr dig, at værktøjet passer til dine behov, før du anskaffer en licens.',
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
      slug: 'find-den-ulige-arbejdsark',
      anchorText: 'Find den Ulige Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'billedsti-arbejdsark',
      anchorText: 'Billedsti Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'matteleger-arbejdsark',
      anchorText: 'Mattepuslespil Arbejdsark Generator',
    },
    {
      pageType: 'app',
      slug: 'moenstre-arbejdsark',
      anchorText: 'Mønster Arbejdsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'puslespil-logik-pakke',
      anchorText: 'Puslespil og Logik Pakke — Alle Puslespilsapps i Én',
    },
    {
      pageType: 'guide',
      slug: 'sudoku-boeger-kdp',
      anchorText: 'Sådan Opretter og Sælger du Sudokubøger på Amazon KDP',
    },
    {
      pageType: 'guide',
      slug: 'skab-billedsudoku',
      anchorText: 'Sådan Opretter du Billedsudoku for Børn',
    },
    {
      pageType: 'idea',
      slug: 'mattegrundlag-printbare-ideer',
      anchorText: 'Logikpuslespil printbare idéer for arbejdsark',
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
      primary: '/samples/danish/sudoku/Billede-Sudoku%201.jpeg',
      primaryAlt: '4×4 billedsudoku arbejdsark med tematiske billeder i et premiumgitter med alternerende blokfarver og automatisk genereret Billedsudoku-overskrift',
    },
    sampleGallery: [
      {
        src: '/samples/danish/sudoku/Billede-Sudoku%201.jpeg',
        alt: 'Let sværhed billedsudoku med 4 tomme celler og 12 udfyldte celler i et 4×4-gitter',
        caption: 'Let sværhed — 4 tomme celler for begyndere, der lærer række-og-kolonne-logik',
      },
      {
        src: '/samples/danish/sudoku/Billede-Sudoku%202.jpeg',
        alt: 'Billedsudoku med et andet tema og middelsværhed',
        caption: 'Tematisk billedsudoku — 104 temaer giver unikke puslespilsoplevelser for hvert sæt',
      },
      {
        src: '/samples/danish/sudoku/Billede-Sudoku%201%20answer_key.jpeg',
        alt: 'Billedsudoku facit, der viser komplet udfyldt 4×4-gitter med alle 16 celler udfyldt',
        caption: 'Automatisk genereret facit — komplet udfyldt gitter med alle billeder placeret',
      },
    ],
    youtubeId: 'bqVioFbkYbA',
    videoTitle: 'Sådan Opretter du 4×4 Billedsudoku Arbejdsark med Tre Sværhedsgrader — Trin-for-Trin Guide',
  },
};

export default content;
