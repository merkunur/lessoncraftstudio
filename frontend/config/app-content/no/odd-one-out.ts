import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'hvem hører ikke hjemme oppgave skrive ut',
    secondaryKeywords: ['finn inntrengeren oppgave', 'klassifisering oppgaveark', 'logisk tenkning oppgaver', 'hva passer ikke'],
    lsiKeywords: ['logikk', 'klassifisere', 'kategorisere', 'intrenger', 'tenke'],
    titleTag: 'Hvem hører ikke hjemme? oppgave å skrive ut | Logikkgenerator',
    metaDescription: 'Lag «hvem hører ikke hjemme?»-oppgaver med temabilder for logisk tenkning. Automatisk fasit. Prøv gratis.',
  },

  hero: {
    title: 'Hvem hører ikke hjemme? oppgave å skrive ut — Logikkgenerator med bilder',
    tagline: 'To genereringsmoduser — Identisk og Lignende — med overstyring per ovelse, 5–10 konfigurerbare ovelser, automatisk genererte fasiter med rode sirkelmarkeringer og visuelle puslespill som fungerer på alle 11 språk uten oversettelse.',
    description:
      'Bygg profesjonelle finn-den-annerledes arbeidsark der brukerne identifiserer og ringer inn det ulike objektet i hver rad av fire bilder. Velg mellom to genereringsmoduser: Identisk modus plasserer tre kloner av det samme bildet ved siden av et annerledes bilde fra det samme temaet for finn-forskjellen-utfordringer, mens Lignende modus henter tre bilder fra Tema A og ett bilde fra Tema B for temaovergripende diskrimineringspuslespill. Overstyr modusen per ovelse for å blande vanskelighetsgrader innenfor et enkelt arbeidsark. Konfigurer 5 til 10 ovelser per side med standard satt til 6, og slå valgfrie navn- og datofelt og ovelsesnumre til for produktlinjeferdig formatering. Hvert arbeidsark genererer en ledsagende fasit på en separat lerretfane — fasiten tegner en rod sirkel rundt det ulike objektet i hver rad, slik at du aldri trenger å markere svar manuelt. Den automatisk genererte overskriften har en koralfarget ytre ramme, ravgul indre ramme og turkis bakgrunn med den lokaliserte tittelen «Finn den som ikke horer til» rendret i Fredoka og instruksjoner i Quicksand på alle 11 språk. Fordi puslespillene er helt visuelle — ingen ord vises på selve arbeidsarket — er de ikke språkavhengige og fungerer identisk i enhver lokal. Samme arbeidsark kan selges globalt uten oversettelse. Full Tilgang låser opp alle 104 temaer med mer enn 3 100 illustrasjoner og alle 11 brukergrensesnittspråk. Legg til bakgrunnstemaer og rammetemaer med uavhengige opasitetskontroller, og eksporter trykkeklare PDF-er og JPEG-bilder med 300 DPI i Letter, A4, Kvadrat eller egendefinerte storrelser. Enten du selger visuelle puslespillpakker på Etsy, setter sammen kritisk tenkning-arbeidboker til Amazon KDP eller lager produktlinjeaktiviteter til Gumroad — denne generatoren leverer produksjonsklare arbeidsark på få minutter. Gratis proveversjon med alle funksjoner — ingen registrering, intet kredittkort. Nedlastinger inneholder et vannmerke; kjop en lisens for å fjerne det.',
  },

  howItWorks: {
    title: 'Slik Lager du Finn den Ulike Arbeidsark i 5 Trinn',
    steps: [
      {
        title: 'Still inn sidelayouten',
        description:
          'Åpne panelet Sideoppsett og velg en sidestorrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) eller en egendefinert dimensjon. Velg en sidefarge med fargevelgeren som reservebakgrunn. Velg et bakgrunnstema og juster dets opasitet (0–1 i 0,05-trinn), velg deretter et rammetema med sin egen uavhengige opasitetskontroll. Disse layoutvalgene rammer inn finn den ulike arbeidsarket ditt for du konfigurerer noen ovelser.',
      },
      {
        title: 'Konfigurer ovelsene dine',
        description:
          'Åpne panelet Ovelseskonfigurasjon og still inn ovelsesantallet fra 5 til 10 (standard 6). Velg en global genereringsmodus: Identisk modus bruker tre kloner av det samme bildet pluss et annerledes bilde fra det samme temaet, mens Lignende modus henter tre bilder fra Tema A og ett bilde fra Tema B. Overstyr modusen per ovelse med dropdown-velgere på hver rad — bland Identiske og Lignende ovelser på et enkelt arbeidsark for progressiv vanskelighetsgrad. Slå avkrysningsfeltet «Inkluder Navn/Dato-felt» til for å legge til navn- og datolinjer, og slå «Inkluder Ovelsesnumre» til for å vise numre på venstre side av hvert ovelseskort.',
      },
      {
        title: 'Velg temaer og bilder',
        description:
          'Åpne panelet Bildebibliotek og velg Tema A fra dropdownen — dette gir de tre vanlige bildene i Lignende modus. Velg Tema B for det ulike objektet i Lignende modus (f.eks. Tema A = dyr, Tema B = mat). Bla gjennom 104 tematiske samlinger med mer enn 3 100 fargerike illustrasjoner, eller sok med nokkelord. I Identisk modus trengs bare ett tema, da både de vanlige klonene og det ulike bildet kommer fra den samme samlingen. Du kan også laste opp egne PNG-, JPG- eller GIF-bilder å bruke ved siden av bibliotekets innhold.',
      },
      {
        title: 'Generer finn den ulike arbeidsarket',
        description:
          'Klikk på Generer for å lage ovelseskortene. Hvert kort viser fire bilder i en horisontal rad — tre vanlige objekter og ett ulikt objekt med sin posisjon tilfeldig blandet. Appen arrangerer kort i 1–2 kolonner avhengig av sideorientering og ovelsesantall (2 kolonner for liggende eller stående med 7+ ovelser). En stilisert «Finn den som ikke horer til»-overskrift vises overst med koralfarget ytre ramme (#FF6B6B, 8px strek), ravgul indre ramme (#FFB84D, 3px strek) og turkis bakgrunn (#4ECDC4) — med tittelen i morkblågronn Fredoka (#1A535C) og instruksjoner i rod Quicksand (#E63946).',
      },
      {
        title: 'Generer fasit og last ned',
        description:
          'Bytt til fanen Fasit for å se den automatisk genererte fasiten med en rod sirkel tegnet rundt det ulike objektet i hver ovelsesrad. Sirkelens strekbredde skaleres med bildestorrelse (maks av imageSize × 0,04 eller 3px) for konsekvent synlighet over sidestorrelser. Last ned begge versjonene med de fire dedikerte knappene: Arbeidsark-JPEG, Fasit-JPEG, Arbeidsark-PDF og Fasit-PDF med 300 DPI. Slå gråtone til for blekkbesparende versjoner. Hver eksport er produksjonsklar for Etsy-oppforinger, Amazon KDP-innersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nokkelfunksjoner i Finn den Ulike Arbeidsark Generatoren',
    features: [
      {
        title: 'Finn den som ikke horer til-puslespill med to genereringsmoduser',
        description:
          'Hver ovelse viser fire bilder i et horisontalt kort — tre vanlige objekter og ett ulikt objekt — og brukerne ringer inn den som ikke horer til. Generatoren tilbyr to distinkte moduser. Identisk modus plasserer tre kloner av noyaktig det samme bildet ved siden av et annerledes bilde fra det samme temaet, noe som generator en enkel finn-forskjellen-utfordring. Lignende modus henter tre bilder fra Tema A (f.eks. dyr) og ett bilde fra Tema B (f.eks. mat), noe som krever at brukerne identifiserer den tematiske avvikeren fremfor en visuell dublett. Hver modus produserer en fundamentalt annerledes kognitiv utfordring fra det samme bildebiblioteket.',
      },
      {
        title: 'Modusoverstyring per ovelse for arbeidsark med blandet vanskelighetsgrad',
        description:
          'Hver ovelsesrad inkluderer sin egen modusdropdown som lar deg overstyre den globale modusen per ovelse. Begynn med enkle Identiske ovelser overst og gå over til vanskeligere Lignende ovelser mot bunnen — eller alterner moduser gjennom hele arbeidsarket for variert utfordring. En «Rydd Valg»-knapp nullstiller alle per-ovelse-overstyringer til den globale innstillingen. Denne detaljerte kontrollen lar selgere lage arbeidsark med progressiv vanskelighetsgrad som betjener flere ferdighetsnivåer på en enkelt side, noe som oker den opplevde verdien av hvert utskriftsbare produkt.',
      },
      {
        title: 'Konfigurerbart ovelsesantall fra 5 til 10 per arbeidsark',
        description:
          'Still inn antall ovelser fra 5 til 10 med panelet Ovelseskonfigurasjon, med standard satt til 6. Faerre ovelser generator arbeidsark med storre bildekort og mer avstand — ideelt for yngre brukere eller arbeidsark beregnet for finmotorisk ovelse der innringing trenger plass. Flere ovelser oker innholdstettheten og utfordringen for eldre brukere. Layoutet tilpasser seg automatisk: stående sider med 7 eller flere ovelser bytter til et 2-kolonnelayout, og liggende sider bruker alltid 2 kolonner for optimalt mellomrom.',
      },
      {
        title: 'Totemasystem med Tema A (vanlige) og Tema B (ulike)',
        description:
          'Lignende modus bruker et totemasystem som gjor temaovergripende diskrimineringspuslespill enkle å lage. Velg Tema A fra dropdownen for de tre vanlige bildene i hver ovelse, velg deretter Tema B for det ene ulike objektet. Par dyr med mat, kjoretoy med natur, yrker med sport — enhver kombinasjon fra de 104 tilgjengelige temaene. Dette systemet garanterer at det ulike objektet alltid er tematisk distinkt, noe som generator tydelige og pedagogisk meningsfulle puslespill uten manuelt bildevalg for hver ovelse.',
      },
      {
        title: 'Automatisk generert fasit med rode sirkelmarkeringer',
        description:
          'Hvert finn den ulike arbeidsark genererer automatisk en ledsagende fasit på en separat lerretfane. Fasiten gjengenerator den noyaktige arbeidsarklayouten og tegner en rod sirkelkontur rundt det ulike objektet i hver ovelsesrad. Sirkelens strekbredde skaleres dynamisk med bildestorrelse — beregnet som det storre av imageSize × 0,04 eller 3 piksler — noe som sikrer konsekvent synlighet over alle sidestorrelser og ovelsesantall. Ingen manuell markering, ingen separat filoppretting — fasiten forblir synkronisert med arbeidsarket automatisk.',
      },
      {
        title: 'Bildebibliotek med 104 tematiske samlinger og mer enn 3 100 illustrasjoner',
        description:
          'Bla gjennom 104 tematiske bildesamlinger som dekker dyr, mat, kjoretoy, natur, yrker, hoytider, sport, årstider og dusinvis flere. Hvert tema gir et koordinert sett fargerike illustrasjoner som fungerer sammen i finn den ulike-ovelser. Filtrer etter tema med dropdownen eller sok etter spesifikke bilder med nokkelord. Bilder lastes med doven lasting (20 om gangen) for jevn gjennomlesing. Kommersiell Pakke inkluderer 10 fargerike temaer for å komme i gang; Full Tilgang låser opp alle 104 temaer for maksimal variasjon over begge genereringsmoduser.',
      },
      {
        title: 'Trykkeklar PDF- og JPEG-eksport med 300 DPI og gråtonebryter',
        description:
          'Last ned finn den ulike arbeidsark og fasit som hoyopploste JPEG-bilder eller trykkeklare PDF-dokumenter rendret med 300 DPI (6x multiplikator). Fire dedikerte nedlastingsknapper eksporterer Arbeidsark-JPEG, Fasit-JPEG, Arbeidsark-PDF og Fasit-PDF separat. Sidestorrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) og helt egendefinerte dimensjoner. Slå gråtone til for blekkbesparende versjoner som sparer toner. Hver eksport er produksjonsklar for digitale nedlastinger, trykte arbeidboker og produktlinjeutdeling.',
      },
      {
        title: 'Full lerredsredigering med tekstverktoy, navn/dato-felt og ovelsesnumre',
        description:
          'Fabric.js-lerretet gir komplett kontroll over hvert element på arbeidsarket ditt. Dra, endre storrelse, roter og flytt bilder, tekst og generert innhold fritt. Lagkontroller håndterer stablingsrekkefolge og lås ferdige elementer mens du redigerer andre. Legg til egendefinert tekst med syv skrifttypemuligheter (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storrelse og farge, og tekstkonturbredde fra 0 til 10 med 0,5-trinns granularitet. Slå navn- og datofelt til for produktlinjeferdig formatering og ovelsesnumre (25px bredde, 15px mellomrom) for enkel referanse under gjennomgang. Zoom fra 25 % til 300 % for detaljarbeid. Angre og gjor om opptil 20 historikktrinn med Ctrl+Z og Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Slik Selger du Finn den Ulike Arbeidsark på Nett',
    cases: [
      {
        title: 'Tematiske finn den ulike puslespillpakker på Etsy',
        description:
          'Lag tematiske visuelle diskrimineringspakker med totemasystemet — dyr mot mat, kjoretoy mot natur, hoytider mot sport og dusinvis flere temakombinasjoner. Hver temaparing produserer tilstrekkelig med unike ovelser til flere arbeidsark med både Identisk og Lignende modus. Pakk 10–20 finn den ulike arbeidsark per pakke med fasit inkludert, og selg til 25–60 kr per sett. Det visuelle formatet betyr at hver pakke fungerer for ethvert språkmarked uten modifikasjon, noe som utvider kundebasen din globalt.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Visuelle diskriminerings-arbeidboker på Amazon KDP',
        description:
          'Sett sammen 40–80 finn den ulike arbeidsark til en trykt arbeidsbok formatert for Amazon KDP. Strukturer boken med progressiv vanskelighetsgrad: tidlige kapitler bruker Identisk modus (finn den som ikke er klon), mellomkapitler bruker Lignende modus med åpenbare temakontraster, og avanserte kapitler bruker Lignende modus med mer subtile distinksjoner. Bruk modusoverstyring per ovelse til å lage blandede vanskelighetssider som utfordrer brukerne til å bytte mellom visuelle strategier. Inkluder fasit i slutten med den automatisk genererte rod-sirkel-fasiten. Gråtonebryteren produserer blekkbesparende sider for svart-hvite bokinnersider.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Produktlinje kritisk tenkning-aktiviteter til Gumroad',
        description:
          'Bygg ferdige finn den ulike arbeidsark med navn- og datofelt, ovelsesnumre og trykte fasiter. Kjopere som soker på Gumroad etter kritisk tenkning-aktiviteter setter pris på arbeidsark som ankommer produktlinjeferdige — navnefeltet sikrer sporbarhet, ovelsesnumre gjor klassediskusjon effektiv, og den rode sirkel-fasiten sparer vurderingstid. Lag produktkatalogtilpassede sett: dyreklassifiseringsutfordringer, matgruppediskriminering, samfunnshjelpidentifikasjon og sesongbevisthets puslespill. Hvert sett inkluderer arbeidsark og fasit i både PDF- og JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sesongbaserte og hoytidspuslespill-samlinger',
        description:
          'De 104 tematiske bildesamlingene dekker enhver sesong- og hoytidsanledning — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Lag tidsbegrensede finn den ulike-samlinger som faller sammen med toppinnkjopsperioder. Utgi halloween-puslespillpakker i september, julesamlinger i oktober og valentinsdag-pakker i januar. Bland Identisk og Lignende modus innenfor hvert sesongsett for variasjon og opplevd verdi. Sesongprodukter motiverer hoyere priser under toppvinduene sine og generator naturlige grunner til gjenkjop.',
        platform: 'Etsy / Amazon KDP / Gumroad (sesongbasert)',
      },
      {
        title: 'Global markedsappell med visuelle puslespill',
        description:
          'Fordi finn den ulike arbeidsark er helt visuelle — ingen tekst vises på selve puslespillet — fungerer hvert arbeidsark på ethvert språk uten modifikasjon. Den automatisk genererte overskriften oversettes til alle 11 stoettede språk, men puslespillinnholdet krever null lokalisering. Dette gjor finn den ulike arbeidsark unikt effektive for selgere som retter seg mot internasjonale markeder. Lag et sett arbeidsark og list dem i flere språkspesifikke Etsy-butikker eller Amazon KDP-markedsplasser. Samme produkt betjener ethvert marked samtidig.',
        platform: 'Etsy / Amazon KDP (globalt marked)',
      },
    ],
  },

  faq: [
    {
      question: 'Hvordan fungerer finn den ulike-mekanikken?',
      answer:
        'Hver ovelse viser fire bilder i et horisontalt kort — tre vanlige objekter og ett ulikt objekt. Brukerne ser på raden, identifiserer hvilket bilde som ikke horer til, og ringer det inn. Det ulike objektets posisjon blandes tilfeldig innenfor raden, slik at det kan vises i enhver av de fire plassene. Ovelser arrangeres vertikalt på siden, med layoutet som bytter til 2 kolonner ved liggende orientering eller stående med 7 eller flere ovelser.',
    },
    {
      question: 'Hva er forskjellen mellom Identisk og Lignende modus?',
      answer:
        'Identisk modus plasserer tre kloner av noyaktig det samme bildet ved siden av et annerledes bilde fra det samme temaet — brukerne finner den som ikke er dublett. Lignende modus henter tre bilder fra Tema A (f.eks. dyr) og ett bilde fra Tema B (f.eks. mat) — brukerne identifiserer den tematiske avvikeren. Identisk modus er lettere fordi brukerne sammenligner visuelle dubletter. Lignende modus er vanskeligere fordi alle fire bildene er forskjellige, og distinksjonen er kategorisk snarere enn visuell.',
    },
    {
      question: 'Hvordan fungerer modusoverstyring per ovelse?',
      answer:
        'Hver ovelsesrad inkluderer sin egen modusdropdown som lar deg overstyre den globale modusinnstillingen. Still inn den globale modusen til Lignende, bytt deretter individuelle ovelser til Identisk — eller omvendt. Dette lager arbeidsark med blandet vanskelighetsgrad der noen ovelser er lettere (Identisk) og andre er vanskeligere (Lignende) på den samme siden. En «Rydd Valg»-knapp nullstiller alle per-ovelse-overstyringer til den globale innstillingen.',
    },
    {
      question: 'Hvor mange ovelser kan jeg inkludere på et arbeidsark?',
      answer:
        'Ovelsesantallet er konfigurerbart fra 5 til 10, med standard satt til 6. Hver ovelse inneholder alltid noyaktig 4 bilder (3 vanlige + 1 ulik). Faerre ovelser generator storre bildekort med mer avstand; flere ovelser oker innholdstettheten. Layoutet tilpasser seg automatisk — stående sider med 7+ ovelser og alle liggende sider bruker et 2-kolonnelayout for optimalt mellomrom.',
    },
    {
      question: 'Hvordan fungerer totemasystemet i Lignende modus?',
      answer:
        'I Lignende modus velger du to temaer fra dropdown-menyene. Tema A gir de tre vanlige bildene for hver ovelse (f.eks. dyr), og Tema B gir det ene ulike objektet (f.eks. mat). Dette garanterer at det ulike objektet alltid er tematisk distinkt. Velg blant enhver kombinasjon av de 104 tilgjengelige temaene. I Identisk modus trengs bare ett tema, da både de vanlige klonene og det ulike bildet kommer fra den samme samlingen.',
    },
    {
      question: 'Hvordan fungerer den automatisk genererte fasiten med rode sirkler?',
      answer:
        'Generatoren bruker et dobbeltlerretssystem med en Arbeidsarkfane og en Fasitfane. Arbeidsarket viser ovelseskortene uten markeringer — brukerne ringer inn det ulike objektet selv. Fasiten gjengenerator det identiske layoutet og tegner en rod sirkelkontur rundt det ulike objektet i hver rad. Sirkelens strekbredde skaleres dynamisk med bildestorrelse (det storre av imageSize × 0,04 eller 3 piksler). Begge versjonene eksporteres separat med fire dedikerte nedlastingsknapper.',
    },
    {
      question: 'Kan jeg legge til navn- og datofelt på finn den ulike arbeidsark?',
      answer:
        'Ja. Slå avkrysningsfeltet «Inkluder Navn/Dato-felt» i panelet Ovelseskonfigurasjon til for å legge til navn- og datolinjer. Disse feltene posisjoneres responsivt basert på sidelayout. Navn- og datofelt gjor arbeidsarkene produktlinjeferdige — selgere kan spore utfylte ark, og foreldre kan organisere fullforte aktiviteter etter dato.',
    },
    {
      question: 'Hvordan fungerer ovelsesnumre?',
      answer:
        'Slå avkrysningsfeltet «Inkluder Ovelsesnumre» i panelet Ovelseskonfigurasjon til for å vise numre på venstre side av hvert ovelseskort. Numre bruker 25px bredde med 15px mellomrom fra kortinnholdet. Ovelsesnumre hjelper under produktlinjegjennomgang og gjor det enkelt for selgere å referere til spesifikke ovelser under diskusjon.',
    },
    {
      question: 'Finnes det en gratis proveversjon?',
      answer:
        'Ja. Du kan bruke alle funksjoner — begge genereringsmodusene, per-ovelse-overstyringer, konfigurerbare ovelsesantall, den automatisk genererte fasiten, hele bildebiblioteket, bakgrunns- og rammetemaer, navn/dato-felt, ovelsesnumre og alle nedlastingsformater — uten å opprette en konto, oppgi kredittkort eller installere programvare. Nedlastinger fra den gratis proveversjonen inneholder et lite vannmerke. En kommersiell lisens fjerner vannmerket og gir fulle salgsrettigheter.',
    },
    {
      question: 'Er finn den ulike arbeidsark språkavhengige?',
      answer:
        'Nei. Til forskjell fra apper som viser ord på arbeidsarket, er finn den ulike-puslespill helt visuelle — ingen tekst vises på selve puslespillinnholdet. Den automatisk genererte overskriften («Finn den som ikke horer til») oversettes til alle 11 stoettede språk, men de faktiske ovelsene inneholder kun bilder. Dette betyr at hvert arbeidsark fungerer på ethvert språk uten modifikasjon, noe som gjor finn den ulike-puslespill ideelle for global markedsplasssalg.',
    },
    {
      question: 'Kan jeg selge finn den ulike arbeidsark laget med dette verktøyet på Etsy og Amazon KDP?',
      answer:
        'Ja. Med en kommersiell lisens har du fulle rettigheter til å selge finn den ulike arbeidsarkene dine som digitale nedlastinger på Etsy, som trykte arbeidboker på Amazon KDP, som produktlinjeressurser på Gumroad, eller via enhver annen salgskanal. De to genereringsmodusene, per-ovelse-overstyringer og 104 tematiske bildesamlinger gir deg de kreative verktoyene til å produsere originale, salgbare visuelle diskrimineringsprodukter.',
    },
    {
      question: 'Hva er returpolicyen?',
      answer:
        'Fordi den gratis proveversjonen gir deg tilgang til alle funksjoner, tilbyr vi ingen refusjoner på kjop av kommersielle lisenser. Du kan teste begge genereringsmodusene, per-ovelse-overstyringssystemet, den automatisk genererte fasiten, hele bildebiblioteket, bakgrunns- og rammetemaer, navn/dato-felt, ovelsesnumre og alle nedlastingsformater for du kjoper. Den gratis proveversjonen er returpolicyen — sorg for at verktøyet passer til behovene dine for du anskaffer en lisens.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'manglende-biter-arbeidsark',
      anchorText: 'Manglende Biter Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'barne-sudoku-arbeidsark',
      anchorText: 'Bildesudoku Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'bildesti-arbeidsark',
      anchorText: 'Bildesti Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'skyggematching-arbeidsark',
      anchorText: 'Skyggematching Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'finn-og-tell-arbeidsark',
      anchorText: 'Finn og Tell Arbeidsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'puslespill-logikk-pakke',
      anchorText: 'Puslespill og Logikk Pakke — Alle Puslespillapper i En',
    },
    {
      pageType: 'guide',
      slug: 'lag-finn-den-ulike-puslespill',
      anchorText: 'Slik Lager du Finn den Ulike Puslespill som Selger',
    },
    {
      pageType: 'idea',
      slug: 'foerskole-utskriftsbare-ideer',
      anchorText: 'Visuell Diskriminering utskriftsbare ideer for arbeidsark',
    },
    {
      pageType: 'idea',
      slug: '1-klasse-utskriftsbare-ideer',
      anchorText: '1. klasse utskriftsbare ideer for barneskolen',
    },
    {
      pageType: 'idea',
      slug: '2-klasse-utskriftsbare-ideer',
      anchorText: '2. klasse utskriftsbare ideer for voksende brukere',
    },
    {
      pageType: 'start',
      slug: 'amazon-kdp-aktivitetsboeker',
      anchorText: 'Utgi Aktivitetsboker på Amazon KDP',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/norwegian/odd%20one%20out/Finn%20den%20Rare%201.webp',
      primaryAlt: 'Finn den ulike arbeidsark med fire bilder per ovelsesrad, fargerike tematiske illustrasjoner og lokalisert overskrift',
    },
    sampleGallery: [
      {
        src: '/samples/norwegian/odd%20one%20out/Finn%20den%20Rare%201.webp',
        alt: 'Lignende modus finn den ulike arbeidsark med tre dyr og ett matobjekt per rad',
        caption: 'Lignende modus — tre bilder fra Tema A og ett ulikt objekt fra Tema B',
      },
      {
        src: '/samples/norwegian/odd%20one%20out/Finn%20den%20Rare%202.webp',
        alt: 'Identisk modus finn den ulike arbeidsark med tre identiske bilder og ett annerledes bilde per rad',
        caption: 'Identisk modus — tre kloner av det samme bildet og ett annerledes bilde',
      },
      {
        src: '/samples/norwegian/odd%20one%20out/Finn%20den%20Rare%203.webp',
        alt: 'Finn den ulike fasit med rode sirkler tegnet rundt det ulike objektet i hver ovelsesrad',
        caption: 'Automatisk generert fasit — rode sirkler markerer det ulike objektet i hver rad',
      },
    ],
    youtubeId: '0R6WFUfY7Mk',
    videoTitle: 'Slik Lager du Finn den Ulike Arbeidsark med To Moduser og Automatiske Fasiter — Trinn-for-Trinn Guide',
  },
};

export default content;
