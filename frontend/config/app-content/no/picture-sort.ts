import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'sorteringsoppgave skrive ut',
    secondaryKeywords: ['sortere og gruppere oppgave', 'kategorisere bilder', 'ordne og sortere oppgaveark', 'sorteringsaktivitet 1. trinn'],
    lsiKeywords: ['sortere', 'gruppere', 'kategorisere', 'ordne', '1. trinn'],
    titleTag: 'Sortering-generator | LessonCraftStudio',
    metaDescription: 'Lag sorterings- og kategoriseringsoppgaver med temabilder. Automatisk fasit, utskrivbare PDF-er. Prøv gratis.',
  },

  hero: {
    title: 'Sortering-generator — Lag utskrifter å selge på Etsy og KDP',
    tagline: 'Tokategorisortering i en kraftfull generator — temabasert eller manuelt bildevalg — med automatisk genererte fasiter, 4–12 konfigurerbare bilder, en lokalisert «Sorter bilder»-overskrift på 11 språk og 104 tematiske bildesamlinger.',
    description:
      'Bygg profesjonelle sorteringsarbeidsark der brukerne klassifiserer bilder i to kategorier ved å sortere utklippede bilder i den korrekte venstre eller hoyre gruppen. Velg temamodus for automatisk å fylle ut kategorier fra bildebiblioteket — velg et venstre tema og et hoyre tema, og appen henter 4–6 tilfeldige bilder per tema — eller bytt til manuell modus for å håndvelge individuelle bilder og tildele hver til en kategori. Hvert arbeidsark har to stiplede kategorirammer overst som sorteringsmål og et blandet utklippsrutenett nedenfor med blandede bilder klare til å klippes ut og sorteres. Dobbeltlerretssystemet genererer både en arbeidsarkfane og en fasitfane med 6x storre bilder organisert i kategorifelt, slik at du aldri trenger å lage fasit manuelt. Bildesortering Generatoren er språkavhengig: kategorietiketter bruker lokaliserte bildenavn, slik at å bytte språk endrer teksten på arbeidsarket. Det betyr at de samme bildetemaene kan generere unike sorteringsarbeidsark på 11 forskjellige språk — hver språkversjon har lokaliserte kategorietiketter, noe som gjor hver versjon til et separat produkt. En lokalisert «Sorter bilder»-overskrift med mintgronn bakgrunn og blågronn tittel rendres automatisk på alle 11 stoettede språk. Full Tilgang låser opp alle 104 temaer med mer enn 3 100 illustrasjoner og alle 11 brukergrensesnittspråk for lokaliserte kategorietiketter. Legg til bakgrunnstemaer og rammetemaer med uavhengige opasitetskontroller, inkluder navn- og datofelt for produktlinjeansvar, og eksporter trykkeklare PDF-er og JPEG-bilder med 300 DPI i Letter, A4, Kvadrat eller egendefinerte storrelser. Enten du selger sorteringsaktivitetspakker på Etsy, setter sammen klassifiseringsarbeidboker til Amazon KDP eller lager sorteringsstasjonsaktiviteter til Gumroad — denne generatoren leverer produksjonsklare arbeidsark på få minutter. Gratis proveversjon med alle funksjoner — ingen registrering, intet kredittkort. Nedlastinger inneholder et vannmerke; kjop en lisens for å fjerne det.',
  },

  ctaHeading: 'Lag sorteringsoppgaver',

  howItWorks: {
    title: 'Slik Lager du Bildesorteringsarbeidsark i 5 Trinn',
    steps: [
      {
        title: 'Still inn sidelayouten',
        description:
          'Åpne panelet Sideoppsett og velg en sidestorrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) eller en egendefinert dimensjon. Velg en sidefarge med fargevelgeren som reservebakgrunn. Velg et bakgrunnstema og juster dets opasitet (0–1 i 0,05-trinn), velg deretter et rammetema med sin egen uavhengige opasitetskontroll. Sett avkrysning i «Inkluder Navn/Dato-felt» for å legge til navn- og datolinjer. Disse layoutvalgene rammer inn sorteringsarbeidsarket ditt for du konfigurerer noe innhold.',
      },
      {
        title: 'Velg sorteringskategoriene dine',
        description:
          'Åpne panelet Sorteringskategorier og velg to temaer — ett for den venstre kategorien og ett for den hoyre kategorien. Appen genererer automatisk 4–6 tilfeldige bilder per tema fra bildebiblioteket. Velg for eksempel Dyr til venstre og Mat til hoyre for å lage et sorteringsarbeidsark der brukerne klassifiserer bilder i den korrekte gruppen. Alternativt, bytt til manuell modus for å håndvelge individuelle bilder og tildele hver til venstre eller hoyre kategori.',
      },
      {
        title: 'Velg bilder fra biblioteket eller last opp egne',
        description:
          'Åpne panelet Bildebibliotek og bla gjennom 104 tematiske samlinger med mer enn 3 100 fargerike illustrasjoner — dyr, mat, kjoretoy, natur, hoytider og dusinvis flere. Filtrer etter tema med dropdownen eller sok med nokkelord. Klikk på bilder for å legge dem til på arbeidsarket ditt og tildel hver til venstre eller hoyre kategori. Det totale bildeantallet spenner fra 4 til 12, med 2–10 bilder per kategori. Du kan også laste opp egne PNG-, JPG- eller GIF-bilder å bruke ved siden av bibliotekets innhold.',
      },
      {
        title: 'Generer sorteringsarbeidsarket',
        description:
          'Klikk på Generer for å lage den todelte sorteringslayouten. Appen arrangerer innholdet ditt i kategorirammer overst (to side om side stiplede rammer med #FAFAFA-utfylling) og et blandet utklippsrutenett nedenfor (hvite celler med stiplede #666-kanter). En stilisert «Sorter bilder»-overskrift vises overst med mintgronn bakgrunn (#4DB6AC), blågronn tittel (#00796B) i Fredoka-skrifttype og oransje beskrivelse (#FF7043) i Quicksand-skrifttype. En blågronn ytre ramme (#26A69A, 8px strek) rammer hele siden inn. Utklippsrutenettet viser alle bilder i tilfeldig rekkefolge — brukerne klipper dem ut og sorterer i den korrekte kategorirammen.',
      },
      {
        title: 'Generer fasit og last ned',
        description:
          'Bytt til fanen Fasit for å se den automatisk genererte losningen med 6x storre bilder organisert i sine korrekte kategorifelt, vist i maks 2 kolonner per felt. Last ned begge versjonene med de fire dedikerte knappene: Arbeidsark-JPEG, Fasit-JPEG, Arbeidsark-PDF og Fasit-PDF. Filer eksporteres med 300 DPI og JPEG-kvalitet 1,0. Slå gråtone til for blekkbesparende versjoner. Hver eksport er produksjonsklar for Etsy-oppforinger, Amazon KDP-innersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nokkelfunksjoner i Bildesortering Arbeidsark Generatoren',
    features: [
      {
        title: 'Tokategorisortering med temabasert eller manuelt bildevalg',
        description:
          'Lag sorteringsarbeidsark med noyaktig to kategorier — venstre og hoyre — med to distinkte valgmoduser. Temamodusen lar deg velge et tema for hver kategori (f.eks. Dyr mot Mat, Land mot Vann, Frukt mot Gronnsaker), og appen velger automatisk 4–6 tilfeldige bilder per tema fra bildebiblioteket. Manuell modus gir deg fullstendig kontroll: håndvelg individuelle bilder fra ethvert tema og tildel hver til venstre eller hoyre kategori. Begge moduser produserer den samme profesjonelle sorteringslayouten med kategorirammer og et blandet utklippsrutenett, noe som gir deg maksimal fleksibilitet for forskjellige produktstiler.',
      },
      {
        title: 'Konfigurerbart bildeantall fra 4 til 12 med 2–10 per kategori',
        description:
          'Kontroller det totale antall sorteringsbilder fra minimum 4 til maksimum 12 per arbeidsark, med hver kategori som inneholder mellom 2 og 10 bilder. Temamodusen henter automatisk 4–6 bilder per tema, noe som generator arbeidsark med 8–12 bilder totalt. Manuell modus lar deg stille inn presise antall per kategori. Faerre bilder generator enklere sorteringsoppgaver ideelle for yngre brukere; flere bilder oker vanskelighetsgraden og innholdstettheten. Utklippsrutenettet justerer automatisk kolonnelayouten sin (3–4 kolonner basert på totalt antall) for å opprettholde rent visuelt mellomrom.',
      },
      {
        title: 'Automatisk generert fasit med 6x storre bilder i kategorifelt',
        description:
          'Hvert sorteringsarbeidsark genererer automatisk en ledsagende fasit på en separat lerretfane. Fasiten viser to kategorifelt (ett per kategori, like brede) med bilder sortert i sin korrekte gruppe — rendret med 6x storrelsen av utklippsrutenettets celler for tydelig, lettleselig verifisering. Hvert kategorifelt bruker maks 2 kolonner og beholder den samme stiplede rammestilen (#FAFAFA-utfylling, #444-strek, 12px kantradius). Ingen manuell sortering, ingen separat filoppretting — fasiten forblir perfekt synkronisert med arbeidsarkets innhold.',
      },
      {
        title: 'Lokalisert «Sorter bilder»-overskrift med blågrønt design på 11 språk',
        description:
          'Hvert genererte arbeidsark inkluderer en stilisert overskrift med mintgronn bakgrunn (#4DB6AC), hvit pillebeholder, blågronn tittel (#00796B) i Fredoka Bold og oransje beskrivelse (#FF7043) i Quicksand. Stående arbeidsark viser en 100px overskrift med dynamisk tittelstorrelse (28–48px); liggende arbeidsark bruker en kompakt 70px overskrift med 24–36px tittel. Tittelen «Sorter bilder» og beskrivelsen «Sorter bildene i de riktige gruppene!» oversettes automatisk til alle 11 stoettede språk. En blågronn ytre ramme (#26A69A, 8px strek, 12px radius) rammer hele siden inn.',
      },
      {
        title: 'Bildebibliotek med 104 tematiske samlinger og mer enn 3 100 illustrasjoner',
        description:
          'Bla gjennom 104 tematiske bildesamlinger som dekker dyr, mat, kjoretoy, natur, yrker, hoytider, sport, årstider og dusinvis flere. Hvert tema gir et koordinert sett fargerike illustrasjoner som fungerer som sorteringskategorier. Filtrer etter tema med dropdownen eller sok etter spesifikke bilder med nokkelord. Det temabaserte kategorivalget gjor det enkelt å lage sorteringsarbeidsark med naturlige kategoripar — landdyr mot havdyr, sunn mat mot usunn mat, sommerting mot vinterting. Kommersiell Pakke inkluderer 10 fargerike temaer; Full Tilgang låser opp alle 104 temaer for maksimal kreativ variasjon.',
      },
      {
        title: 'Navn- og datofelt for produktlinjeansvar',
        description:
          'Sett avkrysning i avkrysningsfeltet «Inkluder Navn/Dato-felt» i panelet Sideoppsett for å legge til navn- og datolinjer på sorteringsarbeidsarket. Disse feltene sikrer sporbarhet i produktlinjemiljoer og gjor arbeidsarkene klare for selgerens innsamling og vurdering uten ytterligere forberedelse. Kjopere som soker etter sorteringsaktiviteter setter pris på arbeidsark som ankommer produktlinjeferdige, og navn/dato-muligheten gjor produktene dine mer attraktive for utdanningsmarkedet på Gumroad og Etsy.',
      },
      {
        title: 'Trykkeklar PDF- og JPEG-eksport med 300 DPI og gråtonebryter',
        description:
          'Last ned sorteringsarbeidsark og fasit som hoyopploste JPEG-bilder eller trykkeklare PDF-dokumenter rendret med 300 DPI med JPEG-kvalitet 1,0 og autoorientering. Fire dedikerte nedlastingsknapper eksporterer Arbeidsark-JPEG, Fasit-JPEG, Arbeidsark-PDF og Fasit-PDF separat. Sidestorrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) og helt egendefinerte dimensjoner. Slå gråtone til for blekkbesparende versjoner som sparer toner. Hver eksport er produksjonsklar for digitale nedlastinger, trykte arbeidboker og produktlinjeutdeling.',
      },
      {
        title: 'Full lerredsredigering med tekstverktoy, justering og lagkontroller',
        description:
          'Fabric.js-lerretet gir komplett kontroll over hvert element på sorteringsarbeidsarket ditt. Dra, endre storrelse, roter og flytt bilder, tekst og generert innhold fritt. Lagkontroller håndterer stablingsrekkefolge — flytt elementer fremover eller send dem bakover. Lås ferdige elementer mens du redigerer andre. Legg til egendefinert tekst med syv skrifttypemuligheter (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storrelse og farge, og tekstkonturbredde fra 0 til 10 med 0,5-trinns granularitet. Seks justeringsmuligheter pluss sentrer-på-siden holder layouter presise. Zoom fra 25 % til 300 % for detaljarbeid. Angre og gjor om opptil 20 historikktrinn med Ctrl+Z og Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Slik Selger du Bildesorteringsarbeidsark på Nett',
    cases: [
      {
        title: 'Tematiske sorteringsarbeidsark-pakker på Etsy',
        description:
          'Lag tematiske sorteringsaktivitetspakker med naturlige kategoripar fra de 104 bildesamlingene — dyr mot mat, land mot vann, frukt mot gronnsaker, innendors mot utendors og dusinvis flere. Hver temaparing produserer flere unike sorteringsarbeidsark ved å variere bildevalg og antall. Pakk 10–20 sorteringsarbeidsark per pakke med fasit inkludert, og selg til 25–60 kr per pakke. Det temabaserte kategorivalget gjor det raskt å generere arbeidsark med distinkte venstre/hoyre-grupperinger, og den automatisk genererte fasiten eliminerer den storste produksjonsflaskehalsen.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Klassifiseringsarbeidboker på Amazon KDP',
        description:
          'Sett sammen 40–80 sorteringsarbeidsark til en trykt arbeidsbok formatert for Amazon KDP. Strukturer etter vanskelighetsgrad: tidlige kapitler bruker 4–6 bilder med åpenbare kategoriforskjeller (dyr mot kjoretoy), mellomkapitler bruker 8–10 bilder med mer subtile distinksjoner (husdyr mot ville dyr), og avanserte kapitler bruker 12 bilder med utfordrende kategorier. Inkluder fasit i slutten av boken med den automatisk genererte fasitfunksjonen. Gråtonebryteren produserer blekkbesparende sider klare for svart-hvite bokinnersider. Sorteringsarbeidboker betjener en bred målgruppe fra barnehage til barneskole.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Produktlinje sorteringsaktiviteter til Gumroad',
        description:
          'Bygg ferdige sorteringsstasjonsarbeidsark med navn/dato-felt og trykte fasiter. Kjopere som soker på Gumroad etter sorteringsaktiviteter setter pris på arbeidsark som ankommer produktlinjeferdige — navnefeltet sikrer sporbarhet, kategorirammene gir tydelige sorteringsmål, og den automatisk genererte fasiten sparer selgerens forberedelsestid. Lag produktkatalogtilpassede sett: levende mot ikke-levende, sunn mot usunn mat, dag- mot nattdyr, varmt mot kaldt vaertoy. Hvert sett inkluderer arbeidsark og fasit i både PDF- og JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sesongbaserte og hoytidssorteringssamlinger',
        description:
          'De 104 tematiske bildesamlingene dekker enhver sesong- og hoytidsanledning — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Lag sesongbaserte sorteringsarbeidsark der brukerne klassifiserer hoytidsgjenstander i kategorier: julepynt mot julemat, halloweenkostymer mot halloweensnoep, sommeraktiviteter mot vinteraktiviteter. Utgi halloweensorteringspakker i september, julesamlinger i oktober og valentinsdag-pakker i januar. Sesongprodukter motiverer hoyere priser under toppvinduer og generator naturlige grunner til gjenkjop.',
        platform: 'Etsy / Amazon KDP / Gumroad (sesongbasert)',
      },
      {
        title: 'Flerspråklige sorteringsarbeidsark for norsk som andrespråk og tospråklige markeder',
        description:
          'Utnytt de språkavhengige kategorietiketene til å lage sorteringsarbeidsark på 11 språk. De samme bildene produserer forskjellige kategorietiketter når du bytter språk — bildenavn og «Sorter bilder»-overskriften oppdateres alle automatisk. Lag flerspråklige sorteringspakker der hver språkversjon bruker de samme tematiske bildene men lokalisert tekst. Dette er saerlig verdifullt for norsk som andrespråk-selgere, tospråklige produktlinjer og internasjonale hjemmeundervisningsfamilier. Selg språkspesifikke pakker eller flerspråklige megapakker til premiumpriser på Etsy og Gumroad.',
        platform: 'Etsy / Gumroad (flerspråklig marked)',
      },
    ],
  },

  faq: [
    {
      question: 'Hvordan fungerer tokategorisorteringsmekanikken?',
      answer:
        'Hvert sorteringsarbeidsark har noyaktig to kategorier — venstre og hoyre. Arbeidsarket viser to stiplede kategorirammer overst der brukerne sorterer bildene sine, og et blandet utklippsrutenett nedenfor med alle bilder blandet. Brukerne klipper bildene ut fra rutenettet og plasserer hvert i den korrekte kategorirammen. Tokategoriformatet generator en tydelig binaer klassifiseringsoppgave som fungerer for alle emner — dyr mot mat, land mot vann, levende mot ikke-levende og tusenvis av andre paringer.',
    },
    {
      question: 'Hva er forskjellen mellom temamodus og manuell modus?',
      answer:
        'Temamodusen lar deg velge ett tema for den venstre kategorien og et annet tema for den hoyre kategorien. Appen velger automatisk 4–6 tilfeldige bilder per tema fra bildebiblioteket, noe som generator arbeidsark med 8–12 bilder totalt. Manuell modus gir deg fullstendig kontroll: du håndvelger individuelle bilder fra ethvert tema og tildeler hver til venstre eller hoyre kategori. Temamodus er raskere for masseproduksjon; manuell modus er ideell for å lage spesifikke, produktkatalogtilpassede sorteringsaktiviteter.',
    },
    {
      question: 'Hvor mange bilder kan jeg inkludere på hvert sorteringsarbeidsark?',
      answer:
        'Hvert arbeidsark stotter 4 til 12 totale bilder, med hver kategori som holder mellom 2 og 10 bilder. Temamodusen henter automatisk 4–6 bilder per tema. Manuell modus lar deg stille inn presise antall per kategori. Utklippsrutenettet justerer kolonnelayouten sin (3–4 kolonner basert på antall) for å opprettholde rent visuelt mellomrom. Faerre bilder generator enklere sorteringsoppgaver; flere bilder oker vanskelighetsgraden.',
    },
    {
      question: 'Hvordan fungerer det blandede utklippsrutenettet?',
      answer:
        'Utklippsrutenettet opptar de nedre 55 % av innholdsområdet og viser alle valgte bilder i tilfeldig rekkefolge. Bilder vises i hvite celler med stiplede #666-kanter og 4px avrundede hjorner, arrangert i 3–4 kolonner basert på det totale bildeantallet. Hvert bilde fyller 85 % av cellen sin. Brukerne klipper bildene ut langs de stiplede linjene og sorterer dem i den korrekte kategorirammen ovenfor. Blandingen sikrer at brukerne faktisk må klassifisere hvert bilde i stedet for å kopiere et monster.',
    },
    {
      question: 'Hvordan fungerer den automatisk genererte fasiten?',
      answer:
        'Generatoren bruker et dobbeltlerretssystem med en Arbeidsarkfane og en Fasitfane. Fasiten viser to kategorifelt (ett per kategori, like brede) med bilder sortert i sin korrekte gruppe. Fasitbilder rendres med 6x storrelsen av utklippsrutenettets celler for tydelig verifisering, med maks 2 kolonner per kategorifelt. Hvert felt bruker #FAFAFA-utfylling med #444 stiplet strek og 12px kantradius. Begge versjonene eksporteres separat med fire dedikerte nedlastingsknapper.',
    },
    {
      question: 'Hvordan fungerer den lokaliserte overskriften?',
      answer:
        'Hvert genererte arbeidsark inkluderer en stilisert «Sorter bilder»-overskrift med mintgronn bakgrunn (#4DB6AC), hvit pillebeholder, blågronn tittel (#00796B) i Fredoka Bold-skrifttype og oransje beskrivelse (#FF7043) i Quicksand-skrifttype. Stående arbeidsark viser en 100px overskrift; liggende arbeidsark bruker en kompakt 70px overskrift. Tittelen og beskrivelsen oversettes automatisk til alle 11 stoettede språk: norsk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk og finsk.',
    },
    {
      question: 'Er Bildesortering Generatoren språkavhengig?',
      answer:
        'Ja. Kategorietiketter bruker lokaliserte bildenavn fra Bildebiblioteket, slik at å bytte språk endrer teksten på arbeidsarket. For eksempel vises et kattebilde som «Katt» på norsk, men «Cat» på engelsk og «Katze» på tysk. Den lokaliserte «Sorter bilder»-overskriften endres også med det valgte språket. Kommersiell Pakke inkluderer 10 fargerike temaer; Full Tilgang låser opp alle 104 temaer og alle 11 språk for lokaliserte kategorietiketter.',
    },
    {
      question: 'Kan jeg inkludere navn- og datofelt på sorteringsarbeidsark?',
      answer:
        'Ja. Sett avkrysning i avkrysningsfeltet «Inkluder Navn/Dato-felt» i panelet Sideoppsett for å legge til navn- og datolinjer på arbeidsarket. Disse feltene sikrer sporbarhet i produktlinjemiljoer og gjor sorteringsarbeidsarkene dine klare for selgerens innsamling og vurdering uten ytterligere forberedelse.',
    },
    {
      question: 'Finnes det en gratis proveversjon?',
      answer:
        'Ja. Du kan bruke alle funksjoner — temabasert og manuelt kategorivalg, konfigurerbare bildeantall, den automatisk genererte fasiten, hele bildebiblioteket, bakgrunns- og rammetemaer, navn/dato-felt og alle nedlastingsformater — uten å opprette en konto, oppgi kredittkort eller installere programvare. Nedlastinger fra den gratis proveversjonen inneholder et lite vannmerke. En kommersiell lisens fjerner vannmerket og gir fulle salgsrettigheter.',
    },
    {
      question: 'Kan jeg legge til bakgrunnstemaer og rammetemaer på sorteringsarbeidsark?',
      answer:
        'Ja. Panelet Sideoppsett inkluderer både en bakgrunnstema-velger med en opasitetsglidebryter (0–1 i 0,05-trinn) og en rammetema-velger med sin egen uavhengige opasitetsglidebryter. Bakgrunnstemaer legger til dekorative monstre bak sorteringsinnholdet, mens rammetemaer rammer inn siden. Begge har separate opasitetskontroller slik at du kan lage subtile bakgrunner med fremtredende rammer, eller enhver kombinasjon som passer designet ditt.',
    },
    {
      question: 'Hva er returpolicyen?',
      answer:
        'Fordi den gratis proveversjonen gir deg tilgang til alle funksjoner, tilbyr vi ingen refusjoner på kjop av kommersielle lisenser. Du kan teste temabasert og manuelt kategorivalg, konfigurerbare bildeantall, den automatisk genererte fasiten, hele bildebiblioteket, bakgrunns- og rammetemaer, navn/dato-felt og alle nedlastingsformater for du kjoper. Den gratis proveversjonen er returpolicyen — sorg for at verktøyet passer til behovene dine for du anskaffer en lisens.',
    },
    {
      question: 'Passer oppgavene for småskoletrinnet og mellomtrinnet?',
      answer: 'Ja. For småskoletrinnet (1.–4. trinn) fungerer tydelige kategorier med kjente temaer (f.eks. dyr vs. mat) og færre bilder godt. For mellomtrinnet (5.–7. trinn) kan du bruke mer nyanserte kategorier som krever dypere forståelse av klassifiseringskriterier, og øke antall bilder per arbeidsark for en mer krevende sorteringsoppgave.',
    },
    {
      question: 'Følger oppgavene LK20 (Kunnskapsløftet 2020)?',
      answer: 'Generatoren er et fleksibelt supplement som ikke er bundet til én bestemt læreplan. Oppgavene støtter kompetansemål i naturfag for barneskolen i LK20, særlig innen klassifisering og kategorisering. Sorteringsøvelser trener evnen til å observere likheter og forskjeller, gruppere etter kriterier og begrunne valg — ferdigheter som er sentrale i naturfaglig utforskning gjennom hele barneskolen.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'kobling-arbeidsark',
      anchorText: 'Koblings Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'rutenett-puslespill-arbeidsark',
      anchorText: 'Rutenettkobling Puslespill Generator',
    },
    {
      pageType: 'app',
      slug: 'skyggematching-arbeidsark',
      anchorText: 'Skyggematching Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'bildebingo-arbeidsark',
      anchorText: 'Bildebingo Kort Generator',
    },
    {
      pageType: 'app',
      slug: 'finn-og-tell-arbeidsark',
      anchorText: 'Finn og Tell Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'fargeleggingsbilder-arbeidsark',
      anchorText: 'Fargelegging Arbeidsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'kobling-sortering-pakke',
      anchorText: 'Kobling og Sortering Pakke — Alle Koblingsapper i En',
    },
    {
      pageType: 'guide',
      slug: 'lag-sorterings-arbeidsark',
      anchorText: 'Slik Lager du Sorteringsarbeidsark som Selger',
    },
    {
      pageType: 'idea',
      slug: 'camping-utskriftsbare-ideer',
      anchorText: 'Camping utskriftsbare ideer for utendorslaering',
    },
    {
      pageType: 'idea',
      slug: 'havdyr-utskriftsbare-ideer',
      anchorText: 'Havdyr utskriftsbare ideer for marine temaer',
    },
    {
      pageType: 'start',
      slug: 'markedsforing-utskriftsbar-forretning',
      anchorText: 'Markedsforing av Din Utskriftsbare Forretning',
    },
    {
      pageType: 'tool',
      slug: 'picture-sort-worksheet-maker',
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
      primary: '/samples/norwegian/picture%20sort/sorter-bilder-1.webp',
      primaryAlt: 'Tokategori bildesorteringsarbeidsark med tematiske kategorirammer, blandet utklippsrutenett og lokalisert Sorter bilder-overskrift',
    },
    sampleGallery: [
      {
        src: '/samples/norwegian/picture%20sort/sorter-bilder-1.webp',
        alt: 'Temamodus sorteringsarbeidsark med dyr til venstre og mat til hoyre kategorier',
        caption: 'Temamodus — automatisk utfylte kategorier fra bildebiblioteket',
      },
      {
        src: '/samples/norwegian/picture%20sort/sorter-bilder-2.webp',
        alt: 'Sorteringsarbeidsark med et annet temapar og variert bildeantall',
        caption: 'Tematisk sortering — 104 temaer gir uendelige kategoripar-kombinasjoner',
      },
      {
        src: '/samples/norwegian/picture%20sort/sorter-bilder-3.webp',
        alt: 'Bildesortering fasit med 6x storre bilder organisert i korrekte kategorifelt',
        caption: 'Automatisk generert fasit — 6x storre bilder i kategorifelt',
      },
    ],
    youtubeId: '9kzmlABtNVQ',
    videoTitle: 'Slik Lager du Bildesorteringsarbeidsark med Tokategorisortering og Automatiske Fasiter — Trinn-for-Trinn Guide',
  },
};

export default content;
