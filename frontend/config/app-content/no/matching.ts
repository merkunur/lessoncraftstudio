import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'koble sammen oppgaver skrive ut',
    secondaryKeywords: ['trekke strek oppgave', 'paroppgave', 'matche bilder oppgave', 'koble sammen 1. trinn'],
    lsiKeywords: ['pare', 'strek', 'bilde', 'match', 'småskoletrinnet'],
    titleTag: 'Koble sammen oppgaver å skrive ut | Generator matchingslek',
    metaDescription: 'Lag koble-sammen-oppgaver med temabilder for småskoletrinnet. Automatisk fasit, 300 DPI PDF. Prøv gratis.',
  },

  hero: {
    title: 'Koble sammen oppgaver å skrive ut — Generator for matchingslek med bilder',
    tagline: 'Fire koblingsmoduser i en generator — Begynnelsesbokstav, Bilde+Ord, Bilde/Ord Blandet og Tilpasset Ord — med automatisk genererte fasiter, konfigurerbare parantall og en lokalisert «Finn Parene!»-overskrift over 104 tematiske bildesamlinger.',
    description:
      'Bygg profesjonelle trekk-en-strek koblings arbeidsark der brukerne kobler par sammen ved å tegne linjer mellom to kolonner. Velg mellom fire distinkte koblingsmoduser: Bilde og Begynnelsesbokstav matcher bilder med sin forste bokstav, Bilde+Ord og Bilde+Ord parer merkede bilder på begge sider, Bilde/Ord og Bilde/Ord blander bilder og ord per rad med dropdown-kontroller, og Bilde og Tilpasset Ord lar deg skrive dine egne koblingstermer. Konfigurer 4, 5 eller 6 par per arbeidsark og slå artikkelnumre og dekorative punktmarkeringer til for ren formatering. Hvert arbeidsark inkluderer en automatisk generert lokalisert «Finn Parene!»-overskrift med tittel og instruksjoner rendret på alle 11 stoettede språk. Dobbeltlerretssystemet genererer både en arbeidsarkfane og en fasitfane — fasiten tegner forbindelseslinjer mellom korrekte koblinger, slik at du aldri trenger å lage den manuelt. Koblings Arbeidsark Generatoren er språkavhengig: Begynnelsesbokstav- og Bilde+Ord-modusene bruker lokaliserte bildenavn, slik at å bytte språk endrer ordene og de forste bokstavene på arbeidsarket. Det betyr at det samme bildetemaet kan generere unike arbeidsark på 11 forskjellige språk — hver språkversjon har forskjellige ord, forskjellige begynnelsesbokstaver og en tilpasset overskrift, noe som gjor hver versjon til et separat produkt. Full Tilgang låser opp alle 104 temaer med mer enn 3 100 illustrasjoner og alle 11 brukergrensesnittspråk for lokalisert ordinnhold. Legg til bakgrunnstemaer og rammetemaer med uavhengige opasitetskontroller, inkluder navn- og datofelt, og eksporter trykkeklare PDF-er og JPEG-bilder med 300 DPI i Letter, A4, Kvadrat eller egendefinerte storrelser. Enten du selger koblingsaktivitetspakker på Etsy, setter sammen tidlige lese- og skrivearbeidboker til Amazon KDP eller lager koblingsstasjonsaktiviteter til Gumroad — denne generatoren leverer produksjonsklare arbeidsark på få minutter. Gratis proveversjon med alle funksjoner — ingen registrering, intet kredittkort. Nedlastinger inneholder et vannmerke; kjop en lisens for å fjerne det.',
  },

  howItWorks: {
    title: 'Slik Lager du Koblings Arbeidsark i 5 Trinn',
    steps: [
      {
        title: 'Still inn sidelayouten',
        description:
          'Åpne panelet Sideoppsett og velg en sidestorrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) eller en egendefinert dimensjon. Velg en sidefarge med fargevelgeren som reservebakgrunn. Velg et bakgrunnstema og juster dets opasitet (0–1 i 0,05-trinn), velg deretter et rammetema med sin egen uavhengige opasitetskontroll. Disse layoutvalgene rammer inn koblings arbeidsarket ditt for du konfigurerer noe innhold.',
      },
      {
        title: 'Konfigurer arbeidsarkinnstillinger',
        description:
          'Åpne panelet Arbeidsarkkonfigurasjon og velg koblingsmodusen din: Begynnelsesbokstav, Bilde+Ord, Bilde/Ord Blandet eller Tilpasset Ord. Still inn maksimalt antall par til 4, 5 eller 6 (standard er 6). Slå avkrysningsfeltet «Inkluder Navn/Dato-felt» til for å legge til navn- og datolinjer nederst på siden. Slå «Inkluder artikkelnumre» (standard PÅ) til for å legge til numre for hvert par og «Vis punktmarkeringer» (standard PÅ) for å vise dekorative punkter ved siden av artiklene. For Begynnelsesbokstav-modusen, velg mellom store og små bokstaver og velg en undermodus: Tilfeldig Tema og Bilder, Tilfeldig fra Valgt Tema eller Velg Spesifikke Bilder.',
      },
      {
        title: 'Velg bilder fra biblioteket',
        description:
          'Åpne panelet Bildebibliotek og bla gjennom 104 tematiske samlinger med mer enn 3 100 fargerike illustrasjoner — dyr, mat, kjoretoy, natur, hoytider og dusinvis flere. Filtrer etter tema med dropdownen eller sok med nokkelord. Klikk på bilder for å velge dem til arbeidsarket ditt. I Begynnelsesbokstav-modusen med «Velg Spesifikke Bilder» velger du manuelt noyaktig 6 bilder. I Bilde+Ord og Tilpasset Ord-modusene bruker du panelet Artikkelkonfigurasjon til å stille inn muligheter per rad. Du kan også laste opp egne PNG-, JPG- eller GIF-bilder å bruke ved siden av bibliotekets innhold.',
      },
      {
        title: 'Generer koblings arbeidsarket',
        description:
          'Klikk på Generer for å lage tocolonne-koblingslayouten. Appen arrangerer dine valgte bilder og tekst i venstre og hoyre kolonne med det konfigurerte parantallet. En stilisert «Finn Parene!»-overskrift vises overst med en gul pillebakgrunn (#FFD700), korallramkant (#FF7F50) og lokalisert tittel og instruksjoner rendret i Fredoka og Quicksand-skrifttyper. Artikkelnumre og punktmarkeringer vises basert på bryterinnstillingene dine. Arbeidsarkfanen viser ovelsesversjonen uten forbindelseslinjer — klar for brukerne å tegne sine egne.',
      },
      {
        title: 'Generer fasit og last ned',
        description:
          'Bytt til fanen Fasit for å se den automatisk genererte fasiten med horisontale forbindelseslinjer (#555, strekbredde 2) tegnet mellom hvert korrekt par. Last ned begge versjonene med de fire dedikerte knappene: Arbeidsark-JPEG, Fasit-JPEG, Arbeidsark-PDF og Fasit-PDF. Filene heter worksheet.jpeg, worksheet.pdf, answer_key.jpeg og answer_key.pdf med 300 DPI. Slå gråtone til for blekkbesparende versjoner. Hver eksport er produksjonsklar for Etsy-oppforinger, Amazon KDP-innersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nokkelfunksjoner i Koblings Arbeidsark Generatoren',
    features: [
      {
        title: 'Fire koblingsmoduser: Begynnelsesbokstav, Bilde+Ord, Bilde/Ord Blandet og Tilpasset Ord',
        description:
          'En generator dekker fire distinkte koblingsaktiviteter. Begynnelsesbokstav-modusen plasserer bilder til venstre og deres forste bokstaver til hoyre — med tre undermoduser for tilfeldige temaer, tilfeldige bilder fra et valgt tema eller manuelt bildevalg. Bilde+Ord-modusen viser merkede bildepar på begge sider for ordforrådsforsterkning. Bilde/Ord Blandet-modusen bruker dropdown-velgere per rad, slik at hver side kan vise et bilde eller et ord uavhengig, noe som generator variert vanskelighetsgrad innenfor et enkelt arbeidsark. Tilpasset Ord-modusen parer bilder med dine egne inndata for stavingsoving, ordforrådsquiz eller språkovelser. Hver modus produserer en annerledes kognitiv utfordring fra det samme bildebiblioteket.',
      },
      {
        title: 'Automatisk generert fasit med forbindelseslinjer mellom koblede par',
        description:
          'Hvert koblings arbeidsark genererer automatisk en ledsagende fasit på en separat lerretfane. Fasiten gjengenerator den noyaktige arbeidsarklayouten og legger til horisontale forbindelseslinjer (#555 farge, strekbredde 2) tegnet mellom hvert korrekt par. Ingen manuell linjetegning, ingen separat filoppretting — fasiten er alltid synkronisert med arbeidsarket. Denne dobbeltlerret-tilnaermingen sparer betydelig produksjonstid for selgere som lager koblingsaktivitetspakker der hvert arbeidsark trenger sin egen fasit. Last ned fasiten som answer_key.jpeg eller answer_key.pdf ved siden av arbeidsarket.',
      },
      {
        title: 'Konfigurerbart parantall med 4, 5 eller 6 koblingspar per arbeidsark',
        description:
          'Still inn antall koblingspar til 4, 5 eller 6 med dropdownen i panelet Arbeidsarkkonfigurasjon. Standard er 6 par, noe som fungerer godt for standardarbeidsark. Reduser til 4 eller 5 par for yngre brukere som trenger storre bilder og mer avstand, eller for arbeidsark med lengre tilpassede ord som krever ekstra plass. Parantallet gjelder konsekvent på tvers av alle fire koblingsmoduser, noe som gir deg kontroll over arbeidsarkets vanskelighetsgrad og visuelle tetthet uten å redesigne layouten.',
      },
      {
        title: 'Lokalisert «Finn Parene!»-overskrift med tittel og instruksjoner på 11 språk',
        description:
          'Hvert genererte arbeidsark inkluderer en stilisert overskrift med gul pillebakgrunn (#FFD700), hvit indre pille og korallramkant (#FF7F50, 8px strek). Tittelen «Finn Parene!» og beskrivelsen «Tegn linjer for å forbinde de matchende parene!» oversettes automatisk til alle 11 stoettede språk: engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk, norsk og finsk. Tittelen rendres i Fredoka (vekt 700) og beskrivelsen i Quicksand (vekt 500). Stående arbeidsark viser en stor sentrert overskrift; liggende arbeidsark bruker et kompakt sentrert layout.',
      },
      {
        title: 'Bildebibliotek med 104 tematiske samlinger og mer enn 3 100 illustrasjoner',
        description:
          'Bla gjennom 104 tematiske bildesamlinger som dekker dyr, mat, kjoretoy, natur, yrker, hoytider, sport, årstider og dusinvis flere. Hvert tema gir et koordinert sett fargerike illustrasjoner som fungerer sammen i koblingsaktiviteter. Filtrer etter tema med dropdownen eller sok etter spesifikke bilder med nokkelord. Klikk på ethvert bilde for å legge det til på arbeidsarket ditt. Kommersiell Pakke inkluderer 10 fargerike temaer for å komme i gang; Full Tilgang låser opp alle 104 temaer for maksimal kreativ variasjon på tvers av alle koblingsmoduser.',
      },
      {
        title: 'Artikkelnumre og dekorative punktmarkeringer med bryterkontroller',
        description:
          'To formateringsbrytere i panelet Arbeidsarkkonfigurasjon kontrollerer den visuelle strukturen i hver koblingskolonne. «Inkluder artikkelnumre» (standard PÅ) legger til numre for hvert par — brukerne ser nummererte artikler for enkel referanse under produktlinjegjennomgang. «Vis punktmarkeringer» (standard PÅ) legger til dekorative punkter ved siden av artiklene for visuell tydelighet. Begge mulighetene kan slås til uavhengig, noe som lar deg lage rene nummererte arbeidsark, punktlister, begge, eller ingen av dem avhengig av målgruppen og produktstilen din.',
      },
      {
        title: 'Trykkeklar PDF- og JPEG-eksport med 300 DPI og gråtonebryter',
        description:
          'Last ned koblings arbeidsark og fasit som hoyopploste JPEG-bilder eller trykkeklare PDF-dokumenter rendret med 300 DPI. Fire dedikerte nedlastingsknapper eksporterer worksheet.jpeg, worksheet.pdf, answer_key.jpeg og answer_key.pdf separat. Sidestorrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) og helt egendefinerte dimensjoner. Slå gråtone til for blekkbesparende versjoner som sparer toner. Hver eksport er produksjonsklar for digitale nedlastinger, trykte arbeidboker og produktlinjeutdeling.',
      },
      {
        title: 'Full lerredsredigering med tekstverktoy, justering og lagkontroller',
        description:
          'Fabric.js-lerretet gir komplett kontroll over hvert element på koblings arbeidsarket ditt. Dra, endre storrelse, roter og flytt bilder, tekst og generert innhold fritt. Lagkontroller håndterer stablingsrekkefolge — flytt elementer fremover eller send dem bakover. Lås ferdige elementer mens du redigerer andre. Legg til egendefinert tekst med syv skrifttypemuligheter (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storrelse og farge, og tekstkonturbredde fra 0 til 10 med 0,5-trinns granularitet. Seks justeringsmuligheter pluss sentrer-på-siden holder layouter presise. Zoom fra 25 % til 300 % for detaljarbeid. Angre og gjor om opptil 20 historikktrinn med Ctrl+Z og Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Slik Selger du Koblings Arbeidsark på Nett',
    cases: [
      {
        title: 'Tematiske koblings arbeidsarkpakker på Etsy',
        description:
          'Lag tematiske koblingsaktivitetspakker med de 104 bildesamlingene — dyrekobling, matkobling, kjoretoykobling, hoytidskobling og dusinvis flere. Hvert tema gir tilstrekkelig med illustrasjoner til flere unike koblings arbeidsark på tvers av forskjellige moduser. Pakk 10–20 koblings arbeidsark per tema med fasit inkludert, og selg til 25–60 kr per pakke. Bland moduser innenfor en enkelt pakke for variasjon: Begynnelsesbokstav-arbeidsark for bokstavgjenkjenning, Bilde+Ord-arbeidsark for ordforråd og Tilpasset Ord-arbeidsark for stavingsoving. Den automatisk genererte fasiten eliminerer den storste tidstyven i koblings arbeidsarkproduksjon.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Tidlige lese- og skrivearbeidboker på Amazon KDP',
        description:
          'Sett sammen 40–80 koblings arbeidsark til en trykt arbeidsbok formatert for Amazon KDP. Begynnelsesbokstav-modusen er ideell for tidlig lesing — brukerne matcher bilder med sine forste bokstaver på tvers av flere temaer og bygger fonemisk bevissthet med hver side. Strukturer boken etter vanskelighetsgrad: Kapittel 1 bruker 4 par for nybegynnere, Kapittel 2 bruker 5 par og Kapittel 3 bruker 6 par for avanserte brukere. Inkluder fasitsider i slutten av boken med den automatisk genererte fasitfunksjonen. Gråtonebryteren produserer blekkbesparende sider klare for svart-hvite bokinnersider.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Koblingsstasjonsaktiviteter til Gumroad',
        description:
          'Bygg ferdige koblingsstasjonsarbeidsark med navn/dato-felt, artikkelnumre og trykte fasiter. Kjopere som soker på Gumroad etter koblingsaktiviteter setter pris på arbeidsark som ankommer produktlinjeferdige — navnefeltet sikrer sporbarhet, artikkelnumre gjor fasitkontroll effektiv under gruppegjennomgang, og den automatisk genererte fasiten sparer selgerens forberedelsestid. Lag produktkatalogtilpassede sett: samfunnshjelperkoblinger, matgrupperkoblinger, vaerordforråd kobling og levestedsdyrkobling. Hvert sett inkluderer arbeidsark og fasit i både PDF- og JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Ordforråd koblings arbeidsark på flere språk',
        description:
          'Utnytt de språkavhengige Begynnelsesbokstav- og Bilde+Ord-modusene for å lage koblings arbeidsark på 11 språk. De samme bildene produserer forskjellig koblingsinnhold når du bytter språk — bildenavn, forste bokstaver og overskriftstekst oppdateres alle automatisk. Lag flerspråklige ordforråds pakker der hver språkversjon bruker de samme tematiske bildene men lokaliserte ord. Dette er saerlig verdifullt for norsk som andresspråk-selgere, tospråklige produktlinjer og internasjonale hjemmeundervisningsfamilier. Selg språkspesifikke pakker eller flerspråklige megapakker til premiumpriser.',
        platform: 'Etsy / Gumroad (flerspråklig marked)',
      },
      {
        title: 'Sesongbaserte koblingsaktivitets-samlinger',
        description:
          'De 104 tematiske bildesamlingene dekker enhver sesong- og hoytidsanledning — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Lag tidsbegrensede koblings arbeidsarksamlinger som faller sammen med toppinnkjopsperioder. Utgi halloween-koblingspakker i september, julesamlinger i oktober og valentinsdag-pakker i januar. Inkluder alle fire koblingsmoduser i hvert sesongsett for maksimal verdi. Sesongprodukter motiverer hoyere priser under toppvinduene sine og generator naturlige grunner til gjenkjop.',
        platform: 'Etsy / Amazon KDP / Gumroad (sesongbasert)',
      },
    ],
  },

  faq: [
    {
      question: 'Hva er de fire koblingsmodusene, og hvordan skiller de seg?',
      answer:
        'Generatoren tilbyr fire distinkte moduser. Begynnelsesbokstav-modusen plasserer bilder til venstre og deres forste bokstaver til hoyre — brukerne matcher hvert bilde med bokstaven det begynner med. Bilde+Ord-modusen viser merkede bildepar på begge sider for ordforrådskobling. Bilde/Ord Blandet-modusen bruker dropdown-velgere per rad, slik at hver side kan vise et bilde eller et ord uavhengig, noe som generator variert vanskelighetsgrad innenfor et enkelt arbeidsark. Tilpasset Ord-modusen parer bilder med dine egne innda for staving, ordforråd eller språkovelser. Hver modus produserer en annerledes laeringsaktivitet fra det samme bildebiblioteket.',
    },
    {
      question: 'Hvordan fungerer det konfigurerbare parantallet?',
      answer:
        'I panelet Arbeidsarkkonfigurasjon velger du 4, 5 eller 6 fra dropdownmenyen for maksimalt antall par. Standard er 6 par. Faerre par lager arbeidsark med storre bilder og mer avstand — ideelt for yngre brukere eller arbeidsark med lengre ord. Flere par oker vanskelighetsgrad og innholdstetthet. Parantallet gjelder konsekvent på tvers av alle fire koblingsmoduser.',
    },
    {
      question: 'Hvordan fungerer den automatisk genererte fasiten?',
      answer:
        'Generatoren bruker et dobbeltlerretssystem med en Arbeidsarkfane og en Fasitfane. Arbeidsarket viser tocolonne-layouten uten forbindelseslinjer — brukerne tegner sine egne linjer for å matche par. Fasiten gjengenerator den identiske layouten og legger til horisontale forbindelseslinjer (#555 farge, strekbredde 2) mellom hvert korrekt par. Begge versjonene eksporteres separat med fire dedikerte nedlastingsknapper: worksheet.jpeg, worksheet.pdf, answer_key.jpeg og answer_key.pdf.',
    },
    {
      question: 'Hva er Begynnelsesbokstav-undermodusene?',
      answer:
        'Begynnelsesbokstav-modusen tilbyr tre undermoduser for bildevalg. «Tilfeldig Tema og Bilder» velger et tilfeldig tema og 6 tilfeldige bilder derfra. «Tilfeldig fra Valgt Tema» lar deg velge et spesifikt tema og velger deretter tilfeldige bilder fra det temaet. «Velg Spesifikke Bilder» åpner Bildebiblioteket slik at du kan manuelt velge noyaktig 6 bilder. Du kan også velge mellom store og små bokstaver med bokstavtypeknappene.',
    },
    {
      question: 'Hva er panelet Artikkelkonfigurasjon?',
      answer:
        'Panelet Artikkelkonfigurasjon vises for Bilde+Ord, Bilde/Ord Blandet og Tilpasset Ord-moduser. Det tilbyr dynamiske kontroller per rad for å konfigurere hvert koblingspar. I Bilde/Ord Blandet-modusen lar dropdown-velgere deg velge om hver side av hver rad viser et bilde eller et ord. I Tilpasset Ord-modusen lar tekstfelt deg skrive koblingsordet for hvert bilde. Panelet gir deg finkornig kontroll over hvert enkelt par i arbeidsarket.',
    },
    {
      question: 'Hvordan fungerer artikkelnumre og punktmarkeringer?',
      answer:
        'To brytere i panelet Arbeidsarkkonfigurasjon kontrollerer formateringen. «Inkluder artikkelnumre» (standard PÅ) legger til numre for hvert par — nyttig for fasitkontroll og produktlinjediskusjon. «Vis punktmarkeringer» (standard PÅ) legger til dekorative punkter ved siden av artiklene for visuell tydelighet. Begge mulighetene er uavhengige: du kan ha kun numre, kun punkter, begge, eller ingen av dem avhengig av arbeidsarkstilen og målgruppen din.',
    },
    {
      question: 'Hvordan fungerer den lokaliserte overskriften?',
      answer:
        'Hvert genererte arbeidsark inkluderer en stilisert «Finn Parene!»-overskrift med gul pillebakgrunn (#FFD700), hvit indre pille og korallramkant (#FF7F50, 8px strek). Tittelen og beskrivelsesteksten oversettes automatisk til det valgte språket — alle 11 språk stoettes: norsk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk og finsk. Tittelen bruker skrifttypen Fredoka (vekt 700) og beskrivelsen bruker Quicksand (vekt 500).',
    },
    {
      question: 'Er Koblings Arbeidsark Generatoren språkavhengig?',
      answer:
        'Ja. Begynnelsesbokstav- og Bilde+Ord-modusene bruker lokaliserte bildenavn fra Bildebiblioteket, slik at å bytte språk endrer ordene og de forste bokstavene som vises på arbeidsarket. For eksempel viser et kattebilde «K» på norsk i Begynnelsesbokstav-modusen, «C» på engelsk (Cat) og «K» på tysk (Katze). Den lokaliserte «Finn Parene!»-overskriften endres også med det valgte språket. Kommersiell Pakke inkluderer 10 fargerike temaer; Full Tilgang låser opp alle 104 temaer og alle 11 språk for lokalisert ordinnhold.',
    },
    {
      question: 'Finnes det en gratis proveversjon?',
      answer:
        'Ja. Du kan bruke alle funksjoner — alle fire koblingsmoduser, konfigurerbare parantall, den automatisk genererte fasiten, hele bildebiblioteket, bakgrunns- og rammetemaer, navn/dato-felt, artikkelnumre, punktmarkeringer og alle nedlastingsformater — uten å opprette en konto, oppgi kredittkort eller installere programvare. Nedlastinger fra den gratis proveversjonen inneholder et lite vannmerke. En kommersiell lisens fjerner vannmerket og gir fulle salgsrettigheter.',
    },
    {
      question: 'Kan jeg legge til bakgrunnstemaer og rammetemaer på koblings arbeidsark?',
      answer:
        'Ja. Panelet Sideoppsett inkluderer både en bakgrunnstema-velger med en opasitetsglidebryter (0–1 i 0,05-trinn) og en rammetema-velger med sin egen uavhengige opasitetsglidebryter. Bakgrunnstemaer legger til dekorative monstre bak koblingsinnholdet, mens rammetemaer rammer inn siden. Begge har separate opasitetskontroller, slik at du kan lage subtile bakgrunner med fremtredende rammer, eller enhver kombinasjon som passer designet ditt.',
    },
    {
      question: 'Kan jeg selge koblings arbeidsark laget med dette verktøyet på Etsy og Amazon KDP?',
      answer:
        'Ja. Med en kommersiell lisens har du fulle rettigheter til å selge koblings arbeidsarkene dine som digitale nedlastinger på Etsy, som trykte arbeidboker på Amazon KDP, som produktlinjeressurser på Gumroad, eller via enhver annen salgskanal. De fire koblingsmodusene, automatisk genererte fasiter og 104 tematiske bildesamlinger gir deg de kreative verktoyene til å produsere originale, salgbare koblingsaktivitetsprodukter.',
    },
    {
      question: 'Hva er returpolicyen?',
      answer:
        'Fordi den gratis proveversjonen gir deg tilgang til alle funksjoner, tilbyr vi ingen refusjoner på kjop av kommersielle lisenser. Du kan teste alle fire koblingsmoduser, den automatisk genererte fasiten, hele bildebiblioteket, bakgrunns- og rammetemaer, navn/dato-felt, artikkelnumre, punktmarkeringer og alle nedlastingsformater for du kjoper. Den gratis proveversjonen er returpolicyen — sorg for at verktøyet passer til behovene dine for du anskaffer en lisens.',
    },
    {
      question: 'Passer oppgavene for småskoletrinnet og mellomtrinnet?',
      answer: 'Ja. Du kan tilpasse vanskelighetsgraden ved å justere antall par (4, 5 eller 6) og velge mellom enklere koblingsmoduser som Begynnelsesbokstav for småskoletrinnet (1.–4. trinn), eller mer utfordrende moduser som Bilde/Ord Blandet og Tilpasset Ord for mellomtrinnet (5.–7. trinn). Bildekompleksiteten varierer også etter tema, slik at du kan velge enkle motiver for de yngste og mer detaljerte bilder for eldre brukere.',
    },
    {
      question: 'Følger oppgavene LK20 (Kunnskapsløftet 2020)?',
      answer: 'Generatoren er et fleksibelt supplement som ikke er bundet til én bestemt læreplan. Oppgavene støtter kompetansemål i kunst og håndverk for barneskolen i LK20, særlig innen visuell observasjon og finmotorikk. Koblingsøvelsene trener visuell diskriminering, oppmerksomhet på detaljer og hånd-øye-koordinasjon — ferdigheter som er sentrale i de tverrfaglige temaene i LK20.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'rutenett-puslespill-arbeidsark',
      anchorText: 'Rutenett-puslespill Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'skyggematching-arbeidsark',
      anchorText: 'Skyggematching Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'bildebingo-arbeidsark',
      anchorText: 'Bildebingo Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'bildesortering-arbeidsark',
      anchorText: 'Bildesortering Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'stor-liten-arbeidsark',
      anchorText: 'Stort og Lite Arbeidsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'kobling-sortering-pakke',
      anchorText: 'Kobling og Sortering Pakke — Alle Koblingsapper i En',
    },
    {
      pageType: 'idea',
      slug: 'foerskole-utskriftsbare-ideer',
      anchorText: 'Forskole utskriftsbare ideer for tidlige brukere',
    },
    {
      pageType: 'idea',
      slug: 'barnehage-utskriftsbare-ideer',
      anchorText: 'Barnehage utskriftsbare ideer for unge brukere',
    },
    {
      pageType: 'start',
      slug: 'utskriftsbar-forretning-plan',
      anchorText: 'Din Utskriftsbare Forretning Plan',
    },
    {
      pageType: 'guide',
      slug: 'lag-koblings-arbeidsark',
      anchorText: 'Slik Lager du Koblings Arbeidsark som Selger',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/norwegian/matching/Finn%20Parene%201.webp',
      primaryAlt: 'Trekk-en-strek koblings arbeidsark med tematiske bilder arrangert i to kolonner med lokalisert Finn Parene-overskrift og artikkelnumre',
    },
    sampleGallery: [
      {
        src: '/samples/norwegian/matching/Finn%20Parene%201.webp',
        alt: 'Begynnelsesbokstav koblings arbeidsark med bilder til venstre og forste bokstaver til hoyre',
        caption: 'Begynnelsesbokstav-modus — brukerne matcher bilder med sine forste bokstaver',
      },
      {
        src: '/samples/norwegian/matching/Finn%20Parene%202.webp',
        alt: 'Bilde og ord koblings arbeidsark med merkede par på begge sider',
        caption: 'Bilde+Ord-modus — merkede bildepar for ordforrådskobling',
      },
      {
        src: '/samples/norwegian/matching/Finn%20Parene%203.webp',
        alt: 'Koblings arbeidsark fasit med forbindelseslinjer tegnet mellom korrekte par',
        caption: 'Automatisk generert fasit — forbindelseslinjer viser korrekte koblinger',
      },
    ],
    youtubeId: 'y3ghkjt_67s',
    videoTitle: 'Slik Lager du Koblings Arbeidsark med 4 Moduser og Automatiske Fasiter — Trinn-for-Trinn Guide',
  },
};

export default content;
