import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'sudoku til print',
    secondaryKeywords: [
      'sudoku generator',
      'sudoku børn til print',
      'sudoku med billeder',
      'lav egen sudoku',
    ],
    lsiKeywords: [
      'sudoku tal billeder sværhedsgrad',
      'gitter logik sudoku print',
      'sudoku opgave børn generator printbar',
    ],
    titleTag: 'Sudoku til print | Generator med billeder',
    metaDescription: 'Lav sudoku med billeder eller tal, justerbar sværhedsgrad. Automatisk facit, printklare PDF\'er. Prøv gratis — sælg på Etsy & KDP.',
  },

  hero: {
    title: 'Sudoku til print — generator med billeder og justerbar sværhedsgrad',
    tagline: 'Lav din egen sudoku med billeder i stedet for tal — tre sværhedsgrader fra 4 til 8 tomme celler i et 4×4 gitter, automatisk facit og 104 tematiske billedsamlinger til sudoku-opgaver, der sælger globalt uden oversættelse.',
    description:
      'Generér printbare sudoku-opgaver med billeder, hvor børn udfylder tomme celler med de korrekte billeder ved hjælp af logik. Hvert sudoku-gitter bruger præcis 4 unikke billeder, der skal vises én gang i hver række og én gang i hver kolonne — de samme regler som klassisk sudoku, men med farverige illustrationer i stedet for tal. Med det danske marked på kun 5,8 millioner indbyggere er konkurrencen på Etsy.dk og Amazon KDP markant lavere end på engelsksprogede platforme — og danske forældre, pædagoger og lærere søger aktivt efter printbare sudoku-opgaver til børnehaveklasse (5-6 år), indskoling 0.-3. klasse og mellemtrin 4.-6. klasse. Udbuddet af billedsudoku på dansk er minimalt, hvilket giver sælgere en klar markedsmulighed. Vælg blandt tre sværhedsgrader: Let fjerner 4 celler (perfekt til børnehaveklasse), Middel fjerner 6 celler (indskoling) og Svær fjerner 8 celler — halvdelen af gitteret (mellemtrin). Vælg billeder gennem temabaseret autovalg fra 104 samlinger, manuelt udvalg fra biblioteket med over 3.100 illustrationer, eller upload egne billeder. Det premiumdesignede gitter har alternerende 2×2-blokfarver, flerlagsede skygger og en indigoblå ramme med afrundede hjørner. Hvert sudoku-opgaveark inkluderer en automatisk genereret overskrift lokaliseret på alle 11 sprog og et dobbeltlærredsfacit med det komplette udfyldte gitter. Fordi sudoku med billeder er helt visuelt — ingen ord på gitteret — fungerer hvert opgaveark identisk på alle sprog, hvilket gør produkterne universelt salgbare. Fuld Adgang låser op for alle 104 temaer og alle 11 brugerfladesprog. Eksporter trykklare PDF\'er og JPEG-billeder med 300 DPI i Letter, A4 eller brugerdefinerede størrelser. Uanset om du sælger sudoku-pakker på Etsy.dk, sammensætter logikbøger til Amazon KDP eller opretter ræsonnementsaktiviteter til Gumroad — denne generator leverer produktionsklare sudoku-opgaver på få minutter. Gratis prøveversion med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  howItWorks: {
    title: 'Sådan laver du sudoku til print i 5 trin',
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
    title: 'Nøglefunktioner i sudoku-generatoren med billeder',
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
          'Gennemse 104 tematiske billedsamlinger, der dækker dyr, mad, køretøjer, natur, erhverv, højtider, sport, årstider og snesevis flere. Hvert tema giver et koordineret sæt farverige illustrationer, der generator visuelt sammenhængende sudokupuslespil. Filtrer efter tema med dropdownen eller søg efter specifikke billeder med nøgleord. Klik på ethvert billede for at tilføje det til dit puslespil. Kommerciel Pakke inkluderer 10 farverige temaer til at komme i gang; Fuld Adgang låser op for alle 104 temaer for maksimal kreativ variation over alle dine sudokuprodukter.',
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
    title: 'Sådan sælger du sudoku til print online',
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
          'De 104 tematiske billedsamlinger dækker enhver sæson- og højtidslejlighed — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Opret tidsbegrænsede sudoku puslespilssamlinger, der falder sammen med topindkøbsperioder. Udgiv halloween-sudokupakker i september, julesamlinger i oktober og valentinsdag-pakker i januar. Inkluder alle tre sværhedsgrader i hvert sæsonsæt for maksimal værdi. Sæsonprodukter motiverer højere priser under deres topvinduer og generator naturlige grunde til genkøb hele året.',
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
      question: 'Kan jeg sælge disse sudoku-opgaver på Etsy?',
      answer:
        'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge dine sudoku-opgaver som digitale downloads på Etsy.dk, som trykte aktivitetsbøger på Amazon KDP, som ressourcer på Gumroad eller via enhver anden salgskanal. De tre sværhedsgrader, 104 tematiske billedsamlinger og det visuelle format giver dig originale, globalt salgbare sudoku-produkter. Det danske marked med 5,8 millioner indbyggere har lav konkurrence på printbar sudoku med billeder.',
    },
    {
      question: 'Hvordan laver jeg sudoku til print med denne generator?',
      answer:
        'Vælg sværhedsgrad (Let: 4 tomme celler, Middel: 6 tomme, Svær: 8 tomme), vælg præcis 4 billeder fra 104 temaer med over 3.100 illustrationer eller upload egne billeder, og klik Generer. Generatoren opretter et gyldigt 4×4 sudoku-gitter med premium-design og fjerner det valgte antal celler. Download som trykfærdig PDF eller JPEG med 300 DPI. Facit med komplet udfyldt gitter genereres automatisk.',
    },
    {
      question: 'Er sudoku-opgaverne egnede til børnehaveklasse, indskoling og mellemtrin?',
      answer:
        'Ja. Let sværhedsgrad (4 tomme celler) passer til børnehaveklasse (5-6 år), hvor børn lærer grundlæggende logik med enkel række-og-kolonne-eliminering. Middel (6 tomme) passer til indskoling 0.-3. klasse med moderat logisk deduktion. Svær (8 tomme — halvdelen af gitteret) udfordrer mellemtrin 4.-6. klasse med flertrins ræsonnement. Billedformatet gør sudoku tilgængeligt for børn, der endnu ikke har mestret tal.',
    },
    {
      question: 'På hvor mange sprog kan jeg lave sudoku-opgaver?',
      answer:
        'Generatoren understøtter 11 brugerfladesprog: dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk. Selve sudoku-gitteret er helt visuelt — det indeholder kun billeder, ingen ord eller tal — så hvert opgaveark fungerer identisk på alle sprog uden oversættelse. Det eneste lokaliserede element er overskriftsteksten, som oversættes automatisk.',
    },
    {
      question: 'Er facitlisten inkluderet?',
      answer:
        'Ja. Hvert sudoku-opgaveark genererer automatisk en facitfane med det komplette 4×4 gitter, hvor alle 16 celler er udfyldt med de korrekte billeder. Ingen manuel løsning nødvendig — facit er altid synkroniseret med opgaven. Begge versioner eksporteres separat som PDF og JPEG med 300 DPI.',
    },
    {
      question: 'Hvorfor bruge billeder i stedet for tal til sudoku?',
      answer:
        'Sudoku med billeder gør logik tilgængeligt for førlæsere og unge børn, der endnu ikke har mestret tal. Det visuelle format engagerer med farverige tematiske illustrationer, samtidig med at det udvikler de samme logiske ræsonnementsfærdigheder. Billedbaserede sudoku-opgaver er universelt forståelige uanset sprog, hvilket gør produkterne salgbare globalt uden oversættelse.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — alle tre sværhedsgrader, temabaseret og manuelt billedvalg, automatisk facit, hele billedbiblioteket, baggrunds- og rammetemaer, tekstværktøjer og alle downloadformater — uden at oprette en konto, indtaste kreditkort eller installere software. Downloads fra den gratis prøveversion indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket og giver fulde salgsrettigheder.',
    },
    {
      question: 'Hvad er returpolitikken?',
      answer:
        'Fordi den gratis prøveversion giver dig adgang til alle funktioner, tilbyder vi ingen refusioner på køb af kommercielle licenser. Du kan teste alle tre sværhedsgrader, billedvalg, facit, hele billedbiblioteket og alle downloadformater, før du køber. Den gratis prøveversion er returpolitikken — sikr dig, at værktøjet passer til dine behov, før du anskaffer en licens.',
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
      primary: '/samples/danish/sudoku/billede-sudoku%201.webp',
      primaryAlt: 'Sudoku til print med billeder — 4×4 gitter med tematiske illustrationer, justerbar sværhedsgrad og automatisk facit',
    },
    sampleGallery: [
      {
        src: '/samples/danish/sudoku/billede-sudoku%201.webp',
        alt: 'Sudoku til print med billeder — let sværhedsgrad med 4 tomme celler i et 4×4 gitter',
        caption: 'Let sværhedsgrad — 4 tomme celler, perfekt til børnehaveklasse og tidlig indskoling',
      },
      {
        src: '/samples/danish/sudoku/billede-sudoku%202.webp',
        alt: 'Sudoku med billeder i et andet tema og middel sværhedsgrad til indskoling',
        caption: 'Tematisk sudoku med billeder — 104 temaer giver unikke sudoku-opgaver for hvert sæt',
      },
      {
        src: '/samples/danish/sudoku/billede-sudoku%203.webp',
        alt: 'Sudoku facit med komplet udfyldt 4×4 gitter, der viser alle 16 celler med korrekte billeder',
        caption: 'Automatisk facit — komplet udfyldt sudoku-gitter med alle billeder placeret',
      },
    ],
    youtubeId: 'bqVioFbkYbA',
    videoTitle: 'Sådan Opretter du 4×4 Billedsudoku Arbejdsark med Tre Sværhedsgrader — Trin-for-Trin Guide',
  },
};

export default content;
