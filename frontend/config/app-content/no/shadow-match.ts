import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'skyggelek oppgave skrive ut',
    secondaryKeywords: ['skygger og figurer oppgave', 'silhuetter matche', 'skyggeparing oppgave', 'skyggelek 1. trinn'],
    lsiKeywords: ['skygge', 'silhuett', 'form', 'pare', 'matche'],
    titleTag: 'Skyggelek oppgave å skrive ut | Generator silhuettmatching',
    metaDescription: 'Lag skyggelek-oppgaver med bilder og silhuetter. Automatisk fasit, 300 DPI PDF. Prøv gratis.',
  },

  hero: {
    title: 'Skyggelek oppgave å skrive ut — Generator for silhuettmatching med bilder',
    tagline: 'To matchingsmoduser i en generator — Skyggematching lager automatisk genererte svarte silhuetter fra ethvert bilde, Gjor Det Helt deler bilder i halvdeler — begge med Fisher-Yates-derangering som sikrer ingen trivielle matchinger, automatisk genererte fasiter og 104 tematiske bildesamlinger.',
    description:
      'Bygg profesjonelle skyggematching arbeidsark der brukerne matcher fargede bilder med silhuettene sine eller gjenforbinder delte bildehalvdeler. Skyggematching-modusen plasserer 4 fargede bilder merket A, B, C, D i den ovre raden og 4 automatisk genererte svarte silhuetter merket 1, 2, 3, 4 i den nedre raden — silhuettene lages gjennom bildebehandling på pikselnivå som konverterer hver piksel med alfa > 10 til rent svart, noe som produserer korrekte konturer som bevarer hvert bildes presise gjennomsiktighetsprofil. Gjor Det Helt-modusen deler bilder i halvdeler med horisontal eller vertikal klipperetning, merker forste halvdeler A–D og andre halvdeler 1–4, og tilpasser layoutet basert på orientering. Begge moduser bruker Fisher-Yates-derangering for å garantere at intet objekt vises i sin opprinnelige posisjon, noe som generator ekte matchingsutfordringer hver gang. Slå vis/skjul etiketter til for A/B/C/D og 1/2/3/4 identifikatorer, legg til valgfrie navn- og datofelt for produktlinjebruk, og generer autofasit som viser hver korrekt bokstav-til-nummer-paring. Skyggematching Arbeidsark Generatoren er IKKE språkavhengig: resultatet er rent visuelt uten lokalisert ordinnhold på selve arbeidsarket. Det samme skyggematching-arbeidsarket fungerer identisk på alle markeder uten oversettelse. Full Tilgang låser opp alle 104 temaer med mer enn 3 100 illustrasjoner og alle 11 brukergrensesnittspråk. Legg til bakgrunnstemaer og rammetemaer med uavhengige opasitetskontroller, inkluder egendefinert tekst med syv skrifttypemuligheter, og eksporter trykkeklare PDF-er og JPEG-bilder med 300 DPI i Letter, A4, Kvadrat (1200×1200) eller egendefinerte storrelser. Enten du selger skyggepuslespill-pakker på Etsy, setter sammen visuell persepsjons-arbeidboker til Amazon KDP eller lager hurtigslutts-aktiviteter til Gumroad — denne generatoren leverer produksjonsklare arbeidsark på få minutter. Gratis proveversjon med alle funksjoner — ingen registrering, intet kredittkort. Nedlastinger inneholder et vannmerke; kjop en lisens for å fjerne det.',
  },

  howItWorks: {
    title: 'Slik Lager du Skyggematching Arbeidsark i 5 Trinn',
    steps: [
      {
        title: 'Still inn sidelayouten',
        description:
          'Åpne panelet Sideoppsett og velg en sidestorrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) eller en egendefinert dimensjon. Velg en sidefarge med fargevelgeren som reservebakgrunn. Velg et bakgrunnstema og juster dets opasitet (0–1 i 0,05-trinn), velg deretter et rammetema med sin egen uavhengige opasitetskontroll. Disse layoutvalgene rammer inn skyggematching arbeidsarket ditt for du konfigurerer noe innhold.',
      },
      {
        title: 'Velg ovelsesmodus og konfigurer muligheter',
        description:
          'Åpne panelet Ovelseskonfigurasjon og velg modusen din: Skyggematching eller Gjor Det Helt. Skyggematching genererer svarte silhuetter fra dine valgte bilder med bildebehandling på pikselnivå. Gjor Det Helt deler bilder i halvdeler — velg horisontal (ovre/nedre) eller vertikal (venstre/hoyre) klipperetning med radioknappene som vises i denne modusen. Slå avkrysningsfeltet «Vis Etiketter» (standard PÅ) til for å vise A/B/C/D og 1/2/3/4 identifikatorer på arbeidsarket. Slå «Inkluder Navn/Dato-felt» til for å legge til navn- og datolinjer.',
      },
      {
        title: 'Velg 4 bilder fra biblioteket',
        description:
          'Åpne panelet Bildebibliotek og bla gjennom 104 tematiske samlinger med mer enn 3 100 fargerike illustrasjoner — dyr, mat, kjoretoy, natur, hoytider og dusinvis flere. Filtrer etter tema med dropdownen eller sok med nokkelord. Klikk på bilder for å velge dem — telleren viser fremgangen din mot de nodvendige 4 bildene. En forhåndsvisning av valgte bilder bekrefter valgene dine for generering. Du kan også laste opp egne PNG-, JPG- eller GIF-bilder med panelet Last Opp Egne Bilder.',
      },
      {
        title: 'Generer skyggematching arbeidsarket',
        description:
          'Klikk på Generer for å lage matchingsarbeidsarket. I Skyggematching-modusen behandler appen hvert bilde på pikselnivå — laster det til et lerret, henter ut pikseldata via getImageData og konverterer hver piksel med alfa > 10 til rent svart (R=0, G=0, B=0, A=255) for å produsere korrekte silhuetter. I Gjor Det Helt-modusen deles bildene langs den valgte klipperetningen. Begge moduser anvender Fisher-Yates-derangering for å garantere at intet objekt vises i sin opprinnelige posisjon. En stilisert overskrift vises med ravgul bakgrunn (#FFC107), hvit pillebeholder og 3px ravgul ramme, som viser «Skyggematching» og instruksjoner på det valgte språket.',
      },
      {
        title: 'Generer fasit og last ned',
        description:
          'Bytt til fanen Fasit for å se den automatisk genererte fasiten. I Skyggematching-modusen viser hver celle originalbildet ved siden av silhuetten med en etikett som «A → 2» som angir den korrekte matchingen. I Gjor Det Helt-modusen viser hver celle det komplette originalbildet med sin matchingsetikett. Last ned begge versjonene med fire dedikerte knapper: Arbeidsark-JPEG, Fasit-JPEG, Arbeidsark-PDF og Fasit-PDF med 300 DPI. Slå gråtone til for blekkbesparende versjoner. Hver eksport er produksjonsklar for Etsy-oppforinger, Amazon KDP-innersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nokkelfunksjoner i Skyggematching Arbeidsark Generatoren',
    features: [
      {
        title: 'Automatisk genererte silhuetter via bildebehandling på pikselnivå',
        description:
          'Skyggematching-modusen lager svarte silhuetter gjennom ekte pikselnivå-manipulasjon — ikke CSS-filtre eller forhåndsproduserte aktiver. Appen laster hvert bilde til et lerret, henter ut pikseldata med getImageData og konverterer hver piksel med en alfaverdi storre enn 10 til rent svart (R=0, G=0, B=0, A=255). Dette bevarer den presise gjennomsiktighetsprofilen for hvert bilde og produserer korrekte silhuettkonturer som gjenspeiler fine detaljer som dyreorer, kjoretoysformer og objektkonturer. CORS-håndtering sikrer at bilder fra andre opprinnelser behandles korrekt, med en reserve til et solid svart rektangel hvis lerretet er kontaminert.',
      },
      {
        title: 'To ovelsesmoduser: Skyggematching og Gjor Det Helt med klipperetningsvalg',
        description:
          'En generator leverer to distinkte visuelle matchingsaktiviteter. Skyggematching-modusen plasserer 4 fargede bilder i den ovre raden og 4 automatisk genererte silhuetter i den nedre raden — brukerne identifiserer hvert bilde utelukkende ut fra dets konturform. Gjor Det Helt-modusen deler 4 bilder i halvdeler og presenterer forste halvdeler og andre halvdeler separat — brukerne gjenforbinder delene for å fullføre hvert bilde. I Gjor Det Helt-modusen, velg horisontal klipperetning (ovre/nedre halvdeler) eller vertikal klipperetning (venstre/hoyre halvdeler). Layoutet tilpasser seg automatisk: liggende sider bruker 2 rader × 4 objekter, stående sider bruker 2 kolonner × 4 objekter.',
      },
      {
        title: 'Derangeringsalgoritme som sikrer ingen trivielle matchinger',
        description:
          'Begge ovelsesmoduser bruker en Fisher-Yates-derangeringsalgoritme som garanterer at intet objekt vises i sin opprinnelige posisjon. I Skyggematching-modusen sitter ingen silhuett direkte under sitt matchende bilde. I Gjor Det Helt-modusen vises ingen andre halvdel ved siden av sin matchende forste halvdel. Dette eliminerer muligheten for at brukerne gjetter korrekt basert utelukkende på posisjon og sikrer at hvert arbeidsark presenterer en ekte matchingsutfordring. Derangeringen beregnes på nytt ved hver generering, noe som produserer forskjellige arrangementer fra det samme bildesettet.',
      },
      {
        title: 'Automatisk generert fasit med bokstav-til-nummer matchingsetiketter',
        description:
          'Hvert skyggematching arbeidsark genererer automatisk en ledsagende fasit på en separat lerretfane. Fasiten bruker et rutenettlayout der hver celle viser originalbildet ved siden av silhuetten eller det komplette bildet, merket med den korrekte matchingen som «A → 2». Rutenettet bruker 4 kolonner med 50px mellomrom for den andre raden og 15px vertikal avstand mellom elementer. Ingen manuell fasitoppretting — fasiten forblir synkronisert med arbeidsarket. Last den ned separat som answer_key.jpeg eller answer_key.pdf ved siden av arbeidsarket.',
      },
      {
        title: 'Bildebibliotek med 104 tematiske samlinger og mer enn 3 100 illustrasjoner',
        description:
          'Bla gjennom 104 tematiske bildesamlinger som dekker dyr, mat, kjoretoy, natur, yrker, hoytider, sport, årstider og dusinvis flere. Hvert tema gir fargerike illustrasjoner som produserer distinkte silhuetter med gjenkjennelige konturer — dyreformer, kjoretoyprofiler og objektkonturer som utfordrer visuell persepsjon. Filtrer etter tema med dropdownen eller sok etter spesifikke bilder med nokkelord. Kommersiell Pakke inkluderer 10 fargerike temaer for å komme i gang; Full Tilgang låser opp alle 104 temaer for maksimal kreativ variasjon over begge ovelsesmoduser.',
      },
      {
        title: 'Valgfrie etiketter og navn/dato navnefelt',
        description:
          'Slå avkrysningsfeltet «Vis Etiketter» (standard PÅ) til for å vise A, B, C, D identifikatorer på bilder eller forste halvdeler og 1, 2, 3, 4 identifikatorer på silhuetter eller andre halvdeler. Når etikettene er skjult, blir arbeidsarket en ren visuell matchingsutfordring uten bokstav-/tallstotte — ideelt for avanserte aktiviteter eller puslespillboker der skriftlige svar ikke er nodvendige. Avkrysningsfeltet «Inkluder Navn/Dato-felt» legger til navn- og datolinjer nederst på siden for produktlinjeansvar og organisasjon.',
      },
      {
        title: 'Trykkeklar PDF- og JPEG-eksport med 300 DPI og gråtonebryter',
        description:
          'Last ned skyggematching arbeidsark og fasit som hoyopploste JPEG-bilder eller trykkeklare PDF-dokumenter rendret med 300 DPI (6x multiplikator, JPEG-kvalitet 1,0). Fire dedikerte nedlastingsknapper eksporterer arbeidsark og fasitfiler separat. Sidestorrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) og helt egendefinerte dimensjoner. PDF-orientering detekteres automatisk. Slå gråtone til for blekkbesparende versjoner. Hver eksport er produksjonsklar for digitale nedlastinger, trykte arbeidboker og produktlinjeutdeling.',
      },
      {
        title: 'Full lerredsredigering med tekstverktoy, justering og lagkontroller',
        description:
          'Fabric.js-lerretet gir komplett kontroll over hvert element på skyggematching arbeidsarket ditt. Dra, endre storrelse, roter og flytt bilder, tekst og generert innhold fritt. Lagkontroller håndterer stablingsrekkefolge — flytt elementer fremover eller send dem bakover. Lås ferdige elementer mens du redigerer andre. Legg til egendefinert tekst med syv skrifttypemuligheter (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storrelse og farge, og tekstkonturbredde fra 0 til 10 med 0,5-trinns granularitet. Seks justeringsmuligheter pluss sentrer-på-siden holder layouter presise. Zoom fra 25 % til 300 % for detaljarbeid. Angre og gjor om med ubegrenset historikk med Ctrl+Z og Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Slik Selger du Skyggematching Arbeidsark på Nett',
    cases: [
      {
        title: 'Tematiske skyggematching-pakker på Etsy',
        description:
          'Lag tematiske skyggematchingpakker med de 104 bildesamlingene — dyreskyggepuslespill, kjoretoysilhuettmatching, matskyggeutfordringer og dusinvis flere. Hvert tema gir illustrasjoner med distinkte konturer som generator engasjerende silhuettaktiviteter. Pakk 15–20 skyggematching arbeidsark per tema med fasit inkludert, og selg til 25–60 kr per pakke. Bland begge modusene innenfor en enkelt pakke: Skyggematching arbeidsark for silhuettgjenkjenning og Gjor Det Helt-arbeidsark for romlig resonnement. De automatisk genererte silhuettene og fasitene eliminerer de mest tidkrevende delene av produksjonen.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Visuell persepsjons-arbeidboker på Amazon KDP',
        description:
          'Sett sammen 50–80 skyggematching arbeidsark til en trykt arbeidsbok formatert for Amazon KDP. Strukturer boken med alternerende kapitler: Skyggematching-kapitler bygger silhuettgjenkjenning, mens Gjor Det Helt-kapitler utvikler romlig bevissthet og del-til-hel-resonnement. Inkluder både horisontal og vertikal klipperetning i Gjor Det Helt-seksjonene for variasjon. Plasser fasit i slutten av boken med den automatisk genererte fasitfunksjonen. Gråtonebryteren produserer blekkbesparende sider klare for svart-hvite bokinnersider. Visuelle persepsjonspuslespillboker gjor det godt året rundt i aktivitetsbokskategorien.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Produktlinje hurtigslutts-aktiviteter til Gumroad',
        description:
          'Bygg ferdige skyggematching-aktiviteter med navn/dato-felt og trykte fasiter for produktlinjebruk. Kjopere som soker etter visuell diskriminasjonsovelse setter pris på arbeidsark som ankommer trykkeklare med fasit. Lag produktkatalogtilgrensende sett: dyreskyggematching for naturfagsenheter, samfunnshjelperskyggematching for samfunnsfag, matskyggepuslespill for ernaringsleksjoner. Etikettbryteren lar deg lage stottede versjoner (med A/B/C/D og 1/2/3/4 etiketter) og utfordringsversjoner (etiketter skjult) i det samme produktet for nivåinndelte produktpakker.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sesongbaserte skyggematching-samlinger',
        description:
          'De 104 tematiske bildesamlingene dekker enhver sesong- og hoytidsanledning — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Silhuettaktiviteter har saerlig tiltrekningskraft under halloween når skygge- og mysterietemaer er naturlig populaere. Lag tidsbegrensede skyggematching-samlinger som faller sammen med toppinnkjopsperioder. Inkluder både Skyggematching og Gjor Det Helt-arbeidsark i hvert sesongsett for maksimal verdi og variasjon. Sesongprodukter motiverer hoyere priser under toppvinduene sine.',
        platform: 'Etsy / Amazon KDP / Gumroad (sesongbasert)',
      },
      {
        title: 'Blandet modus puslespillpakker som premiumpakker',
        description:
          'Kombiner begge ovelsesmodusene til premiumpakker med blandet modus som viser generatorens allsidighet. Hver pakke inkluderer Skyggematching arbeidsark (silhuettgjenkjenning), Gjor Det Helt-arbeidsark med horisontale klipp (ovre/nedre gjenmontering) og Gjor Det Helt-arbeidsark med vertikale klipp (venstre/hoyre gjenmontering) — tre distinkte aktivitetstyper fra et tematisk bildesett. Denne tre-i-en-tilnaermingen motiverer premiumpriselting til 60–100 kr per pakke. Fasit for hvert arbeidsark inkluderes automatisk, noe som legger til profesjonell finish som motiverer hoyere opplevd verdi.',
        platform: 'Etsy / Amazon KDP (premiumpakker)',
      },
    ],
  },

  faq: [
    {
      question: 'Hva er de to ovelsesmodusene, og hvordan skiller de seg?',
      answer:
        'Generatoren tilbyr to distinkte moduser. Skyggematching-modusen plasserer 4 fargede bilder i den ovre raden og 4 automatisk genererte svarte silhuetter i den nedre raden — brukerne matcher hvert bilde med skyggen sin ved å pare bokstaver (A–D) med numre (1–4). Gjor Det Helt-modusen deler 4 bilder i halvdeler og presenterer forste halvdeler (A–D) og andre halvdeler (1–4) separat — brukerne matcher halvdeler for å fullføre hvert bilde. Skyggematching tester silhuettgjenkjenning, mens Gjor Det Helt utvikler romlig bevissthet og del-til-hel-resonnement.',
    },
    {
      question: 'Hvordan genereres silhuettene?',
      answer:
        'Silhuettene lages gjennom ekte bildebehandling på pikselnivå, ikke CSS-filtre eller forhåndsproduserte skyggeaktiver. Appen laster hvert bilde til et lerret, henter ut hver piksel med getImageData og konverterer alle piksler med en alfaverdi storre enn 10 til rent svart (R=0, G=0, B=0, A=255). Dette bevarer den presise gjennomsiktighetsprofilen for hvert kildebilde og produserer korrekte svarte silhuetter som gjenspeiler fine detaljer som orer, haler, håndtak og andre distinkte konturer.',
    },
    {
      question: 'Hvilke klipperetningsalternativer finnes i Gjor Det Helt-modusen?',
      answer:
        'Gjor Det Helt-modusen tilbyr to klipperetningsalternativer via radioknapper: Horisontale klipp deler bilder i ovre og nedre halvdeler, mens vertikale klipp deler bilder i venstre og hoyre halvdeler. Klipperetningen gjelder for alle 4 bilder på arbeidsarket. Layoutet tilpasser seg automatisk basert på sideorientering — liggende sider arrangerer objekter i 2 rader × 4 objekter, mens stående sider bruker 2 kolonner × 4 objekter for optimal visuell balanse.',
    },
    {
      question: 'Hvordan fungerer derangeringsalgoritmen?',
      answer:
        'Begge moduser bruker en Fisher-Yates-derangeringsalgoritme som garanterer at intet objekt vises i sin opprinnelige posisjon. I Skyggematching-modusen sitter ingen silhuett direkte under sitt matchende bilde. I Gjor Det Helt-modusen vises ingen andre halvdel ved siden av sin matchende forste halvdel. Dette sikrer at hvert arbeidsark presenterer en ekte matchingsutfordring — brukerne kan ikke gjette korrekt basert utelukkende på posisjon. Derangeringen beregnes på nytt ved hver generering, noe som produserer forskjellige arrangementer fra de samme bildene.',
    },
    {
      question: 'Kan jeg slå A/B/C/D og 1/2/3/4 etikettene til og fra?',
      answer:
        'Ja. Avkrysningsfeltet «Vis Etiketter» i panelet Ovelseskonfigurasjon (standard PÅ) kontrollerer om A, B, C, D etiketter vises på bilder eller forste halvdeler, og 1, 2, 3, 4 etiketter vises på silhuetter eller andre halvdeler. Når etikettene er PÅ, skriver brukerne bokstav-nummer-par som svar. Når etikettene er AV, blir arbeidsarket en ren visuell matchingsutfordring uten alfanumerisk stotte — nyttig for puslespillboker eller avanserte aktiviteter.',
    },
    {
      question: 'Hvorfor er det alltid noyaktig 4 oppgaver per arbeidsark?',
      answer:
        'Arbeidsarket bruker et fast antall på 4 matchingsproblemer. Dette er ikke konfigurerbart. Fire objekter gir den optimale balansen for skygge- og delt-bilde-matching: tilstrekkelig variasjon til å skape en ekte matchingsutfordring med derangering, samtidig som hvert bilde holdes stort nok til at brukerne kan studere fine detaljer i silhuetter og delte halvdeler. Det konsekvente 4-objektsformatet fungerer også godt for pakkeprodukter der hver side har forutsigbar innholdstetthet.',
    },
    {
      question: 'Hvordan fungerer navn- og datofeltene?',
      answer:
        'Slå avkrysningsfeltet «Inkluder Navn/Dato-felt» i panelet Ovelseskonfigurasjon til for å legge til navn- og datolinjer nederst på arbeidsarket. Når aktivert kan brukerne skrive navnet og datoen sin direkte på den utskrevne siden — essensielt for produktlinjeansvar og organisert vurdering. Når deaktivert bruker arbeidsarket hele sideflaten til matchingsinnhold. Denne muligheten fungerer med både Skyggematching og Gjor Det Helt-moduser.',
    },
    {
      question: 'Hvordan fungerer den automatisk genererte fasiten?',
      answer:
        'Generatoren bruker et dobbeltlerretssystem med en Arbeidsarkfane og en Fasitfane. I Skyggematching-modusen viser fasiten et rutenett der hver celle viser originalbildet ved siden av silhuetten med en etikett som «A → 2». I Gjor Det Helt-modusen viser hver celle det komplette originalbildet med sin matchingsetikett. Rutenettet bruker 4 kolonner med konsekvent avstand. Begge versjonene eksporteres separat med fire dedikerte nedlastingsknapper: arbeidsark-JPEG, arbeidsark-PDF, fasit-JPEG og fasit-PDF.',
    },
    {
      question: 'Finnes det en gratis proveversjon?',
      answer:
        'Ja. Du kan bruke alle funksjoner — begge ovelsesmodusene, automatisk genererte silhuetter, klipperetningsvalg, fasit, hele bildebiblioteket, bakgrunns- og rammetemaer, etikettbryter, navn/dato-felt, tekstverktoy og alle nedlastingsformater — uten å opprette en konto, oppgi kredittkort eller installere programvare. Nedlastinger fra den gratis proveversjonen inneholder et lite vannmerke. En kommersiell lisens fjerner vannmerket og gir fulle salgsrettigheter.',
    },
    {
      question: 'Er Skyggematching Arbeidsark Generatoren språkavhengig?',
      answer:
        'Nei. Skyggematching er rent visuelt — arbeidsarkets resultat inneholder kun bilder, silhuetter og delte halvdeler uten lokalisert ordinnhold. Appgrensesnittet (menyer, knapper, overskriftstekst) stotter alle 11 språk, men det genererte arbeidsarket fungerer identisk uansett språkvalg. Dette gjor skyggematching arbeidsark universelt salgbare på alle markeder uten oversettelse. Kommersiell Pakke inkluderer 10 fargerike temaer; Full Tilgang låser opp alle 104 temaer og alle 11 brukergrensesnittspråk.',
    },
    {
      question: 'Kan jeg selge skyggematching arbeidsark laget med dette verktøyet på Etsy og Amazon KDP?',
      answer:
        'Ja. Med en kommersiell lisens har du fulle rettigheter til å selge skyggematching arbeidsarkene dine som digitale nedlastinger på Etsy, som trykte arbeidboker på Amazon KDP, som produktlinjeressurser på Gumroad, eller via enhver annen salgskanal. De to ovelsesmodusene, automatisk genererte silhuetter, derangeringsalgoritmen, autofasit og 104 tematiske bildesamlinger gir deg de kreative verktoyene til å produsere originale, salgbare visuelle matchingsprodukter.',
    },
    {
      question: 'Hva er returpolicyen?',
      answer:
        'Fordi den gratis proveversjonen gir deg tilgang til alle funksjoner, tilbyr vi ingen refusjoner på kjop av kommersielle lisenser. Du kan teste begge ovelsesmodusene, automatisk genererte silhuetter, klipperetningsvalg, fasit, hele bildebiblioteket, bakgrunns- og rammetemaer, etikettbryter, navn/dato-felt, tekstverktoy og alle nedlastingsformater for du kjoper. Den gratis proveversjonen er returpolicyen — sorg for at verktøyet passer til behovene dine for du anskaffer en lisens.',
    },
    {
      question: 'Passer oppgavene for småskoletrinnet og mellomtrinnet?',
      answer: 'Ja. Skyggematching-modusen med tydelige silhuetter og få bilder er godt egnet for småskoletrinnet (1.–4. trinn), der barna trener grunnleggende visuell gjenkjenning. Gjør Det Helt-modusen med delte halvdeler og flere elementer krever mer nøyaktig visuell analyse og passer for mellomtrinnet (5.–7. trinn). Du kan også variere antall bilder per arbeidsark for å tilpasse vanskelighetsgraden.',
    },
    {
      question: 'Følger oppgavene LK20 (Kunnskapsløftet 2020)?',
      answer: 'Generatoren er et fleksibelt supplement som ikke er bundet til én bestemt læreplan. Oppgavene støtter kompetansemål i kunst og håndverk for barneskolen i LK20, særlig innen visuell observasjon og finmotorikk. Skyggematching trener formgjenkjenning, visuell diskriminering og oppmerksomhet på konturer — ferdigheter som også er relevante for geometriforståelse i matematikkfaget.',
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
      slug: 'fargeleggingsbilder-arbeidsark',
      anchorText: 'Fargelegging Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'finn-gjenstandene-arbeidsark',
      anchorText: 'Finn Gjenstandene Arbeidsark Generator',
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
      slug: 'lag-skyggematching-arbeidsark',
      anchorText: 'Slik Lager du Skyggematching Arbeidsark som Selger',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/norwegian/shadow%20match/Fullf%C3%B8r%20Bildene%201.webp',
      primaryAlt: 'Skyggematching arbeidsark med fargede bilder i ovre rad og automatisk genererte svarte silhuetter i nedre rad med ravgul overskrift',
    },
    sampleGallery: [
      {
        src: '/samples/norwegian/shadow%20match/Fullf%C3%B8r%20Bildene%201.webp',
        alt: 'Skyggematching arbeidsark som viser fire fargede bilder matchet med fire svarte silhuetter med bokstav- og nummeretiketter',
        caption: 'Skyggematching-modus — brukerne matcher bilder med sine automatisk genererte silhuetter',
      },
      {
        src: '/samples/norwegian/shadow%20match/Fullf%C3%B8r%20Bildene%202.webp',
        alt: 'Gjor det helt arbeidsark med delte bildehalvdeler som brukerne kobler sammen ved å matche forste og andre halvdeler',
        caption: 'Gjor Det Helt-modus — brukerne matcher delte bildehalvdeler for å fullføre bildene',
      },
      {
        src: '/samples/norwegian/shadow%20match/Fullf%C3%B8r%20Bildene%203.webp',
        alt: 'Skyggematching fasit som viser originalbilder med silhuetter og korrekte bokstav-til-nummer matchingsetiketter',
        caption: 'Automatisk generert fasit — bokstav-til-nummer etiketter viser korrekte matchinger',
      },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: 'Slik Lager du Skyggematching Arbeidsark med Silhuetter og Delte Bilder — Trinn-for-Trinn Guide',
  },
};

export default content;
