import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'forbind-opgaver til print',
    secondaryKeywords: [
      'sæt sammen opgave',
      'parring opgaveark',
      'forbind med streger opgave',
      'forbinde billeder børnehaveklasse',
    ],
    lsiKeywords: [
      'parring',
      'forbinde',
      'streger',
      'børnehaveklasse',
      'indskoling',
      'facit',
    ],
    titleTag: 'Forbind-opgaver til print | Generator parringsleg',
    metaDescription: 'Lav forbind-opgaver med temabilleder til børnehaveklasse og indskoling. Automatisk facit, 300 DPI PDF. Prøv gratis.',
  },

  hero: {
    title: 'Forbind-opgaver til print — Generator til parringsleg og forbindelsesøvelser',
    tagline: 'Fire parringstilstande i én generator — Begyndelsesbogstav, Billede+Ord, Billede/Ord Blandet og Tilpasset Ord — med automatisk facit, konfigurerbart antal par og lokaliseret \"Find Parrene!\"-overskrift over 104 tematiske billedsamlinger.',
    description:
      'Lav professionelle forbind-opgaver til print, hvor børn parrer billeder ved at tegne streger mellem to kolonner. Det danske marked for printbare opgaveark (5,8 mio. dansktalende, Etsy.dk, lav konkurrence) giver en unik mulighed for sælgere, der vil sælge parringsøvelser til børnehaveklasse, indskoling (0.–3. klasse) og mellemtrin (4.–6. klasse). Vælg mellem fire parringstilstande: Billede ↔ Begyndelsesbogstav forbinder billeder med deres første bogstav, Billede+Ord ↔ Billede+Ord parrer mærkede billeder på begge sider, Billede/Ord Blandet blander billeder og ord per række, og Tilpasset Ord lader dig skrive dine egne forbindelsestermer. Konfigurer 4, 5 eller 6 par per opgaveark og slå artikelnumre samt dekorative punktmarkeringer til for ren formatering. Hvert opgaveark inkluderer en automatisk genereret lokaliseret \"Find Parrene!\"-overskrift med titel og instruktioner på alle 11 understøttede sprog. Dobbeltlærredssystemet genererer både et opgaveark og en facitliste — facit tegner forbindelseslinjer mellem korrekte par, så du aldrig behøver oprette det manuelt. Generatoren er sprogfølsom: Begyndelsesbogstav- og Billede+Ord-tilstande bruger lokaliserede billednavne, så at skifte sprog ændrer ordene og de første bogstaver på opgavearket. Det betyder, at det samme billedtema kan generere unikke forbind-opgaver på 11 forskellige sprog — hver sprogversion har forskellige ord, forskellige begyndelsesbogstaver og en tilpasset overskrift, hvilket gør hver version til et separat produkt. Fuld Adgang låser op for alle 104 temaer med mere end 3.100 illustrationer og alle 11 brugerfladesprog til lokaliseret ordindhold. Tilføj baggrundstemaer og rammetemaer med uafhængige opacitetskontroller, inkluder navn- og datofelter, og eksporter printklare PDF\'er og JPEG-billeder med 300 DPI i Letter, A4, Kvadrat eller brugerdefinerede størrelser. Uanset om du sælger parringsøvelse-pakker på Etsy.dk, sammensætter forbindelsesopgave-bøger til Amazon KDP eller opretter parringsstationsaktiviteter til Gumroad — denne generator leverer produktionsklare opgaveark på få minutter. Gratis prøveversion med alle funktioner — ingen tilmelding, intet kreditkort. Downloads indeholder et vandmærke; køb en licens for at fjerne det.',
  },

  ctaHeading: 'Lav parkoblingsopgaver',

  howItWorks: {
    title: 'Sådan laver du forbind-opgaver i 5 trin',
    steps: [
      {
        title: 'Indstil sidelayoutet',
        description:
          'Åbn panelet Sideopsætning og vælg en sidestørrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) eller en brugerdefineret dimension. Vælg en sidefarve med farvevælgeren som reservebaggrund. Vælg et baggrundstema og juster dets opacitet (0–1 i 0,05-trin), vælg derefter et rammetema med sin egen uafhængige opacitetskontrol. Disse layoutvalg rammer dit matchnings arbejdsark ind, før du konfigurerer noget indhold.',
      },
      {
        title: 'Konfigurer arbejdsarksindstillinger',
        description:
          'Åbn panelet Arbejdsarkskonfiguration og vælg din matchningstilstand: Begyndelsesbogstav, Billede+Ord, Billede/Ord Blandet eller Tilpasset Ord. Indstil maksimalt antal par til 4, 5 eller 6 (standard er 6). Slå fluebenet \"Inkluder Navn/Dato-felter\" til for at tilføje navn- og datolinjer nederst på siden. Slå \"Inkluder artikelnumre\" (standard TIL) til for at tilføje numre før hvert par og \"Vis punktmarkeringer\" (standard TIL) for at vise dekorative punkter ved siden af artiklerne. For Begyndelsesbogstav-tilstanden, vælg mellem store og små bogstaver og vælg en undertilstand: Tilfældigt Tema og Billeder, Tilfældigt fra Valgt Tema eller Vælg Specifikke Billeder.',
      },
      {
        title: 'Vælg billeder fra biblioteket',
        description:
          'Åbn panelet Billedbibliotek og gennemse 104 tematiske samlinger med mere end 3.100 farverige illustrationer — dyr, mad, køretøjer, natur, højtider og snesevis flere. Filtrer efter tema med dropdownen eller søg med nøgleord. Klik på billeder for at vælge dem til dit arbejdsark. I Begyndelsesbogstav-tilstanden med \"Vælg Specifikke Billeder\" vælger du manuelt præcis 6 billeder. I Billede+Ord og Tilpasset Ord-tilstandene bruger du panelet Artikelkonfiguration til at indstille muligheder per række. Du kan også uploade egne PNG-, JPG- eller GIF-billeder at bruge ved siden af bibliotekets indhold.',
      },
      {
        title: 'Generer matchnings arbejdsarket',
        description:
          'Klik på Generer for at oprette den tocolonne-matchningslayout. Appen arrangerer dine valgte billeder og tekst i venstre og højre kolonne med det konfigurerede parantal. En stiliseret \"Find Parrene!\"-overskrift vises øverst med en gul pillebaggrund (#FFD700), koralramkant (#FF7F50) og lokaliseret titel og instruktioner renderet i Fredoka og Quicksand-skrifttyper. Artikelnumre og punktmarkeringer vises baseret på dine omskifterindstillinger. Arbejdsarkfanen viser øvelsesversionen uden forbindelseslinjer — klar til brugerne at tegne deres egne.',
      },
      {
        title: 'Generer facit og download',
        description:
          'Skift til fanen Facit for at se det automatisk genererede facit med horisontale forbindelseslinjer (#555, stregbredde 2) tegnet mellem hvert korrekt par. Download begge versioner med de fire dedikerede knapper: Arbejdsark-JPEG, Facit-JPEG, Arbejdsark-PDF og Facit-PDF. Filerne hedder worksheet.jpeg, worksheet.pdf, answer_key.jpeg og answer_key.pdf med 300 DPI. Slå gråtone til for blækvenlige versioner. Hver eksport er produktionsklar til Etsy-annoncer, Amazon KDP-indersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nøglefunktioner i forbind-opgave generatoren',
    features: [
      {
        title: 'Fire matchningstilstande: Begyndelsesbogstav, Billede+Ord, Billede/Ord Blandet og Tilpasset Ord',
        description:
          'Én generator dækker fire distinkte matchningsaktiviteter. Begyndelsesbogstav-tilstanden placerer billeder til venstre og deres første bogstaver til højre — med tre undertilstande for tilfældige temaer, tilfældige billeder fra et valgt tema eller manuelt billedvalg. Billede+Ord-tilstanden viser mærkede billedpar på begge sider til ordforrådsforstærkning. Billede/Ord Blandet-tilstanden bruger dropdown-vælgere per række, så hver side kan vise et billede eller et ord uafhængigt, hvilket generator varieret sværhedsgrad inden for et enkelt arbejdsark. Tilpasset Ord-tilstanden parrer billeder med dine egne indtastede ord til staveøvelse, ordforrådsquiz eller sprogøvelser. Hver tilstand producerer en anderledes kognitiv udfordring fra det samme billedbibliotek.',
      },
      {
        title: 'Automatisk genereret facit med forbindelseslinjer mellem matchede par',
        description:
          'Hvert matchnings arbejdsark genererer automatisk en ledsagende facitliste på en separat lærredsfane. Facit gengenerator den præcise arbejdsarkslayout og tilføjer horisontale forbindelseslinjer (#555 farve, stregbredde 2) tegnet mellem hvert korrekt par. Ingen manuel linjetegning, ingen separat filoprettelse — facit er altid synkroniseret med arbejdsarket. Denne dobbeltlærred-tilgang sparer betydelig produktionstid for sælgere, der opretter matchningsaktivitetspakker, hvor hvert arbejdsark har brug for sin egen facitliste. Download facit som answer_key.jpeg eller answer_key.pdf ved siden af arbejdsarket.',
      },
      {
        title: 'Konfigurerbart parantal med 4, 5 eller 6 matchningspar per arbejdsark',
        description:
          'Indstil antallet af matchningspar til 4, 5 eller 6 med dropdownen i panelet Arbejdsarkskonfiguration. Standard er 6 par, hvilket fungerer godt til standardarbejdsark. Reducer til 4 eller 5 par til yngre brugere, der har brug for større billeder og mere afstand, eller til arbejdsark med længere tilpassede ord, der kræver ekstra plads. Parantallet gælder konsekvent på tværs af alle fire matchningstilstande, hvilket giver dig kontrol over arbejdsarkets sværhedsgrad og visuelle tæthed uden at redesigne layoutet.',
      },
      {
        title: 'Lokaliseret \"Find Parrene!\"-overskrift med titel og instruktioner på 11 sprog',
        description:
          'Hvert genereret arbejdsark inkluderer en stiliseret overskrift med gul pillebaggrund (#FFD700), hvid indre pille og koralramkant (#FF7F50, 8px streg). Titlen \"Find Parrene!\" og beskrivelsen \"Tegn linjer for at forbinde de matchende par!\" oversættes automatisk til alle 11 understøttede sprog: engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, dansk, norsk og finsk. Titlen renderes i Fredoka (vægt 700) og beskrivelsen i Quicksand (vægt 500). Stående arbejdsark viser en stor centreret overskrift; liggende arbejdsark bruger et kompakt centreret layout.',
      },
      {
        title: 'Billedbibliotek med 104 tematiske samlinger og mere end 3.100 illustrationer',
        description:
          'Gennemse 104 tematiske billedsamlinger, der dækker dyr, mad, køretøjer, natur, erhverv, højtider, sport, årstider og snesevis flere. Hvert tema giver et koordineret sæt farverige illustrationer, der fungerer sammen i matchningsaktiviteter. Filtrer efter tema med dropdownen eller søg efter specifikke billeder med nøgleord. Klik på ethvert billede for at tilføje det til dit arbejdsark. Kommerciel Pakke inkluderer 10 farverige temaer til at komme i gang; Fuld Adgang låser op for alle 104 temaer for maksimal kreativ variation på tværs af alle matchningstilstande.',
      },
      {
        title: 'Artikelnumre og dekorative punktmarkeringer med omskifterkontroller',
        description:
          'To formateringsomskiftere i panelet Arbejdsarkskonfiguration kontrollerer den visuelle struktur i hver matchningskolonne. \"Inkluder artikelnumre\" (standard TIL) tilføjer numre før hvert par — brugerne ser nummererede artikler til nem reference under produktlinjegennemgang. \"Vis punktmarkeringer\" (standard TIL) tilføjer dekorative punkter ved siden af artiklerne for visuel tydelighed. Begge muligheder kan slås til uafhængigt, hvilket lader dig oprette rene nummererede arbejdsark, punktlister, begge, eller ingen af dem afhængigt af din målgruppe og produktstil.',
      },
      {
        title: 'Trykfærdig PDF- og JPEG-eksport med 300 DPI og gråtoneomskifter',
        description:
          'Download matchnings arbejdsark og facit som højopløste JPEG-billeder eller trykklare PDF-dokumenter renderet med 300 DPI. Fire dedikerede downloadknapper eksporterer worksheet.jpeg, worksheet.pdf, answer_key.jpeg og answer_key.pdf separat. Sidestørrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) og helt brugerdefinerede dimensioner. Slå gråtone til for blækvenlige versioner, der sparer toner. Hver eksport er produktionsklar til digitale downloads, trykte arbejdsbøger og produktlinjeuddeling.',
      },
      {
        title: 'Fuld lærredsredigering med tekstværktøjer, justering og lagkontroller',
        description:
          'Fabric.js-lærredet giver komplet kontrol over hvert element på dit matchnings arbejdsark. Træk, ændr størrelse, roter og flyt billeder, tekst og genereret indhold frit. Lagkontroller håndterer stablingsrækkefølge — flyt elementer fremad eller send dem bagud. Lås færdige elementer, mens du redigerer andre. Tilføj brugerdefineret tekst med syv skrifttypemuligheder (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar størrelse og farve, og tekstkonturbredde fra 0 til 10 med 0,5-trins granularitet. Seks justeringsmuligheder plus centrer-på-siden holder layouts præcise. Zoom fra 25% til 300% for detailarbejde. Fortryd og gentag op til 20 historiktrin med Ctrl+Z og Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Sådan sælger du forbind-opgaver online',
    cases: [
      {
        title: 'Tematiske matchnings arbejdsarkspakker på Etsy.dk',
        description:
          'Opret tematiske matchningsaktivitetspakker med de 104 billedsamlinger — dyrematchning, madmatchning, køretøjsmatchning, højtidsmatchning og snesevis flere. Hvert tema giver tilstrækkeligt med illustrationer til flere unikke matchnings arbejdsark på tværs af forskellige tilstande. Pak 10–20 matchnings arbejdsark per tema med facit inkluderet, og sælg til 25–60 kr per pakke. Bland tilstande inden for en enkelt pakke for variation: Begyndelsesbogstav-arbejdsark til bogstavgenkendelse, Billede+Ord-arbejdsark til ordforråd og Tilpasset Ord-arbejdsark til staveøvelse. Det automatisk genererede facit eliminerer den største tidssluger i matchnings arbejdsarksproduktion.',
        platform: 'Etsy (etsy.dk)',
      },
      {
        title: 'Tidlige læse- og skrivearbejdsbøger på Amazon KDP',
        description:
          'Saml 40–80 matchnings arbejdsark til en trykt arbejdsbog formateret til Amazon KDP. Begyndelsesbogstav-tilstanden er ideel til tidlig læsning — brugerne matcher billeder med deres første bogstaver på tværs af flere temaer og opbygger fonemisk bevidsthed med hver side. Strukturér din bog efter sværhedsgrad: Kapitel 1 bruger 4 par til begyndere, Kapitel 2 bruger 5 par og Kapitel 3 bruger 6 par til avancerede brugere. Inkluder facitsider i slutningen af bogen med den automatisk genererede facitfunktion. Gråtoneomskifteren producerer blækvenlige sider klar til sort-hvide bogsindersider.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Matchningsstationsaktiviteter til Gumroad',
        description:
          'Byg færdige matchningsstationsarbejdsark med navn/dato-felter, artikelnumre og trykte facit. Købere, der søger på Gumroad efter matchningsaktiviteter, værdsætter arbejdsark, der ankommer produktlinjefærdige — navnefeltet sikrer sporbarhed, artikelnumre gør facitkontrol effektiv under gruppegennemgang, og det automatisk genererede facit sparer sælgerens forberedelsestid. Opret produktkatalogtilpassede sæt: samfundshjælper matchning, madgrupper matchning, vejrordforråd matchning og levesteds dyrematchning. Hvert sæt inkluderer arbejdsark og facit i både PDF- og JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Ordforråds matchnings arbejdsark på flere sprog',
        description:
          'Udnyt de sprogfølsomme Begyndelsesbogstav- og Billede+Ord-tilstande til at oprette matchnings arbejdsark på 11 sprog. De samme billeder producerer forskelligt matchningsindhold, når du skifter sprog — billednavne, første bogstaver og overskriftstekst opdateres alle automatisk. Opret flersprogede ordforråds­pakker, hvor hver sprogversion bruger de samme tematiske billeder men lokaliserede ord. Dette er særligt værdifuldt for DSA-sælgere, tosprogede produktlinjer og internationale hjemmeundervisningsfamilier. Sælg sprogspecifikke pakker eller flersprogede megapakker til premiumpriser.',
        platform: 'Etsy / Gumroad (flersproget marked)',
      },
      {
        title: 'Sæsonbetonede matchningsaktivitets-samlinger',
        description:
          'De 104 tematiske billedsamlinger dækker enhver sæson- og højtidslejlighed — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Opret tidsbegrænsede matchnings arbejdsarkssamlinger, der falder sammen med topindkøbsperioder. Udgiv halloween-matchningspakker i september, julesamlinger i oktober og valentinsdag-pakker i januar. Inkluder alle fire matchningstilstande i hvert sæsonsæt for maksimal værdi. Sæsonprodukter motiverer højere priser under deres topvinduer og generator naturlige grunde til genkøb.',
        platform: 'Etsy / Amazon KDP / Gumroad (sæsonbetonet)',
      },
    ],
  },

  faq: [
    {
      question: 'Kan jeg sælge disse forbind-opgaver på Etsy?',
      answer:
        'Ja. Med en kommerciel licens har du fulde rettigheder til at sælge dine forbind-opgaver som digitale downloads på Etsy.dk, som trykte parrings-bøger på Amazon KDP, som produktlinjeressourcer på Gumroad, eller via enhver anden salgskanal. De fire parringstilstande, automatisk facit og 104 tematiske billedsamlinger giver dig de kreative værktøjer til at producere originale, salgbare forbind-opgaveprodukter.',
    },
    {
      question: 'Hvordan laver jeg forbind-opgaver?',
      answer:
        'Åbn generatoren, vælg en parringstilstand (Begyndelsesbogstav, Billede+Ord, Billede/Ord Blandet eller Tilpasset Ord), vælg billeder fra de 104 temaer og konfigurer 4, 5 eller 6 par per opgaveark. Klik Generer for at oprette opgavearket med automatisk facit. Eksporter som 300 DPI PDF eller JPEG — færdigt til print eller digitalt salg.',
    },
    {
      question: 'Er de egnede til børnehaveklasse, indskoling og mellemtrin?',
      answer:
        'Ja. Forbind-opgaverne fungerer for alle aldersgrupper. Til børnehaveklasse: vælg 4 par med store billeder for nem parring. Til indskoling (0.–3. klasse): brug Begyndelsesbogstav-tilstanden med 5–6 par til bogstavgenkendelse. Til mellemtrin (4.–6. klasse): brug Tilpasset Ord- eller Billede+Ord-tilstanden med 6 par for ordforråd og staveøvelser. Parantallet og tilstandsvalget giver fleksibel sværhedsgrad.',
    },
    {
      question: 'På hvor mange sprog fungerer forbind-opgaverne?',
      answer:
        'Generatoren understøtter 11 sprog: dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk. Begyndelsesbogstav- og Billede+Ord-tilstande bruger lokaliserede billednavne, så at skifte sprog ændrer ordene og de første bogstaver. Et kattebillede viser \"K\" på dansk, \"C\" på engelsk og \"K\" på tysk. Hver sprogversion er et separat produkt.',
    },
    {
      question: 'Er facitlisten inkluderet?',
      answer:
        'Ja. Dobbeltlærredssystemet genererer automatisk en facitliste med horisontale forbindelseslinjer mellem hvert korrekt par. Du behøver aldrig oprette facit manuelt. Download begge versioner med fire dedikerede knapper: Opgaveark-JPEG, Facit-JPEG, Opgaveark-PDF og Facit-PDF — alle med 300 DPI.',
    },
    {
      question: 'Hvad er de fire parringstilstande?',
      answer:
        'Begyndelsesbogstav-tilstanden forbinder billeder med deres første bogstav. Billede+Ord-tilstanden parrer mærkede billeder på begge sider til ordforrådsøvelse. Billede/Ord Blandet blander billeder og ord per række med dropdown-kontroller. Tilpasset Ord-tilstanden parrer billeder med dine egne indtastede ord til staveøvelse eller sprogøvelser. Hver tilstand skaber en anderledes parringsudfordring fra det samme billedbibliotek.',
    },
    {
      question: 'Findes der en gratis prøveversion?',
      answer:
        'Ja. Du kan bruge alle funktioner — alle fire parringstilstande, konfigurerbare parantal, automatisk facit, hele billedbiblioteket, baggrunds- og rammetemaer, navn/dato-felter og alle downloadformater — uden at oprette en konto, indtaste kreditkort eller installere software. Downloads fra den gratis prøveversion indeholder et lille vandmærke. En kommerciel licens fjerner vandmærket og giver fulde salgsrettigheder.',
    },
    {
      question: 'Hvad er returpolitikken?',
      answer:
        'Fordi den gratis prøveversion giver dig adgang til alle funktioner, tilbyder vi ingen refusioner på køb af kommercielle licenser. Du kan teste alle fire parringstilstande, det automatiske facit, hele billedbiblioteket og alle downloadformater, før du køber. Den gratis prøveversion er returpolitikken — sikr dig, at værktøjet passer til dine behov, før du anskaffer en licens.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'raster-puslespil-arbejdsark',
      anchorText: 'Gitterpuslespil Arbejdsark Generator',
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
      slug: 'stor-lille-arbejdsark',
      anchorText: 'Stort og Lille Arbejdsark Generator',
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
      anchorText: 'Sådan Opretter du Matchnings Arbejdsark, der Sælger',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/danish/matching/find-parrene-1.webp',
      primaryAlt: 'Forbind-opgave til print med temabilleder i to kolonner og lokaliseret Find Parrene-overskrift til parringsleg',
    },
    sampleGallery: [
      {
        src: '/samples/danish/matching/find-parrene-1.webp',
        alt: 'Forbind-opgave med begyndelsesbogstav — billeder til venstre og bogstaver til højre til børnehaveklasse',
        caption: 'Begyndelsesbogstav-tilstand — børnene forbinder billeder med streger til det rigtige bogstav',
      },
      {
        src: '/samples/danish/matching/find-parrene-2.webp',
        alt: 'Parring opgaveark med billede og ord — mærkede par på begge sider til indskoling',
        caption: 'Billede+Ord-tilstand — mærkede billedpar til ordforrådsparring',
      },
      {
        src: '/samples/danish/matching/find-parrene-3.webp',
        alt: 'Facitliste til forbind-opgave med streger tegnet mellem korrekte par',
        caption: 'Automatisk facit — forbindelseslinjer viser korrekte parringsresultater',
      },
    ],
    youtubeId: 'y3ghkjt_67s',
    videoTitle: 'Sådan laver du forbind-opgaver med 4 parringstilstande og automatisk facit — trin-for-trin guide',
  },
};

export default content;
