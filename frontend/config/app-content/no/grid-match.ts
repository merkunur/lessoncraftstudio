import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'tegne på rutenett oppgave skrive ut',
    secondaryKeywords: ['kopiere på rutenett oppgave', 'pikselkunst skrive ut', 'speiling på rutenett', 'romforståelse oppgave'],
    lsiKeywords: ['rutenett', 'piksel', 'kopi', 'speiling', 'romforståelse'],
    titleTag: 'Tegne på rutenett oppgave å skrive ut | Generator rutenetttegning',
    metaDescription: 'Lag tegne-på-rutenett oppgaver med temabilder. Automatisk fasit, utskrivbare PDF-er. Prøv gratis.',
  },

  hero: {
    title: 'Tegne på rutenett oppgave å skrive ut — Generator for rutenetttegning',
    tagline: 'Forvandl ethvert bilde til et rutenettbasert bildepuslespill — del det opp i fliser, vis konfigurerbare ledetrådsceller, bland gjenstående fliser til en nummerert palett, og auto-generer en fasit med nummererte sirkeloverlegg over 104 tematiske bildesamlinger.',
    description:
      'Bygg profesjonelle rutenettskoblingspuslespill der et enkelt bilde deles opp i et rutenett av fliser, og brukerne matcher nummererte fliser tilbake til sine korrekte posisjoner. Konfigurer rutenettet fra 2×2 opp til 4×4 (2–4 rader × 2–4 kolonner) og still inn 1–5 ledetrådsceller som forblir synlige som tips — faerre ledetråder betyr vanskeligere puslespill. Appen blander gjenstående fliser med Fisher-Yates-randomisering og viser dem i en nummerert palett ved siden av eller under rutenettet. Brukerne studerer de synlige ledetrådscellene, gjennomgår de nummererte flisene og skriver hvilket nummer som horer hjemme i hver tom celle. Dobbeltlerretssystemet genererer både en arbeidsarkfane og en fasitfane — fasiten viser det komplette bildet med nummererte sirkler overlagt på hver celle som viser korrekt fliseplassering, slik at du aldri trenger å lage fasit manuelt. Rutenettkobling er IKKE språkavhengig: puslespillresultatet er rent visuelt uten lokalisert ordinnhold på selve arbeidsarket. Det samme rutenettspuslespillet fungerer identisk på alle markeder uten oversettelse. Full Tilgang låser opp alle 104 temaer med mer enn 3 100 illustrasjoner og alle 11 brukergrensesnittspråk for appgrensesnittet. Legg til bakgrunnstemaer og rammetemaer med uavhengige opasitetskontroller, inkluder egendefinert tekst med syv skrifttypemuligheter, og eksporter trykkeklare PDF-er og JPEG-bilder med 300 DPI i Letter, A4 eller egendefinerte storrelser. Enten du selger bildepuslespill-pakker på Etsy, setter sammen visuell persepsjons-arbeidboker til Amazon KDP eller lager hurtigslutts-puslespillaktiviteter til Gumroad — denne generatoren leverer produksjonsklare rutenettspuslespill på få minutter. Gratis proveversjon med alle funksjoner — ingen registrering, intet kredittkort. Nedlastinger inneholder et vannmerke; kjop en lisens for å fjerne det.',
  },

  howItWorks: {
    title: 'Slik Lager du Rutenettskoblingspuslespill i 5 Trinn',
    steps: [
      {
        title: 'Still inn sidelayouten',
        description:
          'Åpne panelet Sideoppsett og velg en sidestorrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende eller en egendefinert dimensjon. Velg en reservefarge med fargevelgeren. Velg et bakgrunnstema og juster dets opasitet (0–1 i 0,05-trinn), velg deretter et rammetema med sin egen uavhengige opasitetskontroll. Disse layoutvalgene rammer inn rutenettspuslespillet ditt for du konfigurerer noe innhold. Merk: Kvadratisk sidestorrelse er ikke tilgjengelig for Rutenettkobling.',
      },
      {
        title: 'Konfigurer rutenettet',
        description:
          'Åpne panelet Rutenettmuligheter og still inn antall rader (2–4, standard 3) og kolonner (2–4, standard 3) for puslespillrutenettet ditt. Still deretter inn antall ledetrådsceller (1–5, standard 1) — dette er fliser som forblir synlige på arbeidsarket som tips for brukerne. Et 3×3-rutenett med 1 ledetråd generator et utfordrende puslespill med 8 fliser å matche, mens et 2×2-rutenett med 3 ledetråder generator en enkel oppvarming med kun 1 flise å plassere. Denne konfigurerbare vanskelighetsgraden gjor det enkelt å lage graderte puslespillsett.',
      },
      {
        title: 'Velg et bilde',
        description:
          'Åpne panelet Bildebibliotek og bla gjennom 104 tematiske samlinger med mer enn 3 100 fargerike illustrasjoner — dyr, mat, kjoretoy, natur, hoytider og dusinvis flere. Filtrer etter tema med dropdownen eller sok med nokkelord. Klikk på et bilde for å velge det til puslespillet ditt. Den valgte bildeforhåndsvisningen viser valget ditt for generering. Du kan også laste opp egne PNG-, JPG- eller GIF-bilder med panelet Last Opp Egne Bilder for å lage personaliserte rutenettspuslespill fra dine egne bilder eller kunstverk.',
      },
      {
        title: 'Generer rutenettspuslespill-arbeidsarket',
        description:
          'Klikk på Generer for å lage rutenettskoblingspuslespillet. Appen deler ditt valgte bilde opp i det konfigurerte rutenettet, viser ledetrådscellene med de faktiske bildeflisene synlige og markerer gjenstående celler med «?»-plassholdere. Alle fliser blandes med Fisher-Yates-randomisering og vises som en nummerert palett. Stående layouter plasserer rutenettet overst med paletten nedenfor; liggende layouter posisjonerer rutenettet til venstre med paletten til hoyre. En stilisert overskrift vises med cyan bakgrunn (#00BCD4), dyplilla tittel (#6A1B9A) og oransje ramkant (#FF8C42), som viser «Rutenettkobling» og instruksjoner på det valgte språket.',
      },
      {
        title: 'Generer fasit og last ned',
        description:
          'Bytt til fanen Fasit for å se den automatisk genererte fasiten. Den viser det komplette, uoppdelte bildet med nummererte sirkler overlagt på hver rutenettcelle — gul bakgrunn (#ffffe0) sirkler med svarte konturer som viser hvilket palettnummer som horer hjemme i hver posisjon. Last ned begge versjonene med de fire dedikerte knappene: Arbeidsark-JPEG, Fasit-JPEG, Arbeidsark-PDF og Fasit-PDF med 300 DPI. Slå gråtone til for blekkbesparende versjoner. Hver eksport er produksjonsklar for Etsy-oppforinger, Amazon KDP-innersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nokkelfunksjoner i Rutenettkobling Puslespill Generatoren',
    features: [
      {
        title: 'Enkeltbilderutenettspuslespill med konfigurerbare rader og kolonner (2–4 × 2–4)',
        description:
          'Hvert puslespill begynner med ett bilde delt opp i et rutenett av fliser. Still inn 2–4 rader og 2–4 kolonner uavhengig, noe som generator rutenett fra 2×2 (4 fliser) opp til 4×4 (16 fliser). Standard 3×3-rutenettet produserer 9 fliser — en balansert vanskelighetsgrad for de fleste aldre. Mindre rutenett fungerer godt for introduksjonspuslespill og yngre brukere, mens storre rutenett utfordrer eldre brukere og generator premiumpuslespillprodukter. Til forskjell fra koblingsarbeidsark med flere bilder tester rutenettspuslespillet romlig resonnement og visuell analyse av et enkelt komplett bilde.',
      },
      {
        title: 'Justerbart antall ledetrådsceller for skalerbar vanskelighetsgrad (1–5 synlige celler)',
        description:
          'Kontroller puslespillets vanskelighetsgrad ved å stille inn 1–5 ledetrådsceller som forblir synlige på arbeidsarket som tips. Med et 3×3-rutenett og 1 ledetråd må brukerne matche 8 blandede fliser — en ekte utfordring. Med 5 ledetråder på det samme rutenettet må kun 4 fliser matches — en tilgjengelig oppvarming. Denne ene kontrollen forvandler det samme bildet til puslespill som spenner fra lett til avansert vanskelighetsgrad, noe som lar deg lage graderte puslespillsett fra ett bilde og en rutenettkonfigurasjon. Standard er 1 ledetrådscelle for maksimal utfordring.',
      },
      {
        title: 'Blandet nummerert flisepalett med Fisher-Yates-randomisering',
        description:
          'Skjulte fliser blandes med Fisher-Yates-algoritmen og vises i en nummerert palett ved siden av rutenettet. Hver flise får et unikt nummer som brukerne refererer til når de skriver svar. Randomiseringen sikrer at hvert genererte puslespill har en annerledes fliserekkefolge, selv når det samme bildet og de samme rutenettinnstillingene brukes. Det betyr at du kan produsere flere unike puslespillarbeidsark fra et enkelt bilde ved simpelthen å regenerere — verdifullt for å lage variasjonspakker uten å trenge forskjellige kildebilder.',
      },
      {
        title: 'Automatisk generert fasit med nummererte sirkeloverlegg på komplett bilde',
        description:
          'Hvert rutenettspuslespill genererer automatisk en ledsagende fasit på en separat lerretfane. Fasiten viser det komplette, uoppdelte bildet med nummererte sirkler overlagt på hver rutenettcelle — gul bakgrunn (#ffffe0) sirkler med svarte konturer og svart nummertekst i Fredoka-skrifttype. Hvert nummer tilsvarer den blandede palettrekkefolgen fra arbeidsarket og viser brukere og selgere noyaktig hvilken flise som horer hvor. Ingen manuell fasitoppretting, ingen separat fil — fasiten forblir perfekt synkronisert med arbeidsarket.',
      },
      {
        title: 'Bildebibliotek med 104 tematiske samlinger og mer enn 3 100 illustrasjoner',
        description:
          'Bla gjennom 104 tematiske bildesamlinger som dekker dyr, mat, kjoretoy, natur, yrker, hoytider, sport, årstider og dusinvis flere. Hvert tema gir fargerike illustrasjoner som fungerer vakkert som rutenettspuslespill-kildebilder. Filtrer etter tema med dropdownen eller sok etter spesifikke bilder med nokkelord. Klikk på ethvert bilde for å velge det som puslespillkilden din. Kommersiell Pakke inkluderer 10 fargerike temaer for å komme i gang; Full Tilgang låser opp alle 104 temaer for maksimal kreativ variasjon over alle rutenettspuslespillprodukter.',
      },
      {
        title: 'Responsivt stående og liggende layout med automatisk omposisjonering',
        description:
          'Generatoren tilpasser automatisk layoutet sitt basert på sideorientering. Stående sider (hoyde > bredde) plasserer rutenettet overst med 45 % av tilgjengelig hoyde med den nummererte paletten nedenfor, pluss en fullbredde-overskrift (100px hoyde, 15px radius). Liggende sider (bredde > hoyde) posisjonerer rutenettet på den venstre halvdelen (48 % av tilgjengelig bredde) med paletten til hoyre, med en kompakt overskrift (70px hoyde, 35px radius). Denne automatiske omposisjoneringen sikrer at rutenettspuslespill ser polerte ut på både Letter og A4 i begge orienteringer uten manuelle layoutjusteringer.',
      },
      {
        title: 'Trykkeklar PDF- og JPEG-eksport med 300 DPI og gråtonebryter',
        description:
          'Last ned rutenettspuslespill og fasit som hoyopploste JPEG-bilder eller trykkeklare PDF-dokumenter rendret med 300 DPI (6x multiplikator, JPEG-kvalitet 1,0). Fire dedikerte nedlastingsknapper eksporterer arbeidsark og fasitfiler separat. Sidestorrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende og helt egendefinerte dimensjoner. PDF-orientering detekteres automatisk. Slå gråtone til for blekkbesparende versjoner som sparer toner mens rutenettstrukturen bevares. Hver eksport er produksjonsklar for digitale nedlastinger, trykte arbeidboker og produktlinjeutdeling.',
      },
      {
        title: 'Full lerredsredigering med tekstverktoy, justering og lagkontroller',
        description:
          'Fabric.js-lerretet gir komplett kontroll over hvert element på rutenettspuslespillet ditt. Dra, endre storrelse, roter og flytt bilder, tekst og generert innhold fritt. Lagkontroller håndterer stablingsrekkefolge — flytt elementer fremover eller send dem bakover. Lås ferdige elementer mens du redigerer andre. Legg til egendefinert tekst med syv skrifttypemuligheter (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storrelse og farge, og tekstkonturbredde fra 0 til 10 med 0,5-trinns granularitet. Seks justeringsmuligheter pluss sentrer-på-siden holder layouter presise. Zoom fra 25 % til 300 % for detaljarbeid. Angre og gjor om opptil 20 historikktrinn med Ctrl+Z og Ctrl+Y.',
      },
    ],
  },

  businessUseCases: {
    title: 'Slik Selger du Rutenettskoblingspuslespill på Nett',
    cases: [
      {
        title: 'Tematiske rutenettspuslespill-pakker på Etsy',
        description:
          'Lag tematiske rutenettspuslespill-pakker med de 104 bildesamlingene — dyrerutenettspuslespill, kjoretoyrutenettspuslespill, hoytidsbildepuslespill og dusinvis flere. Hvert tema gir tilstrekkelig med illustrasjoner til 20–30 unike puslespillarbeidsark med varierende rutenettstorrelser og ledetrådantall. Pakk 15–25 rutenettspuslespill per tema med fasit inkludert, og selg til 25–60 kr per pakke. Inkluder en blanding av lette (2×2 med 3 ledetråder), middels (3×3 med 2 ledetråder) og vanskelige (4×4 med 1 ledetråd) puslespill i hver pakke for bred appell. Den automatisk genererte fasiten med nummererte overlegg eliminerer den mest tidkrevende delen av puslespilloppretting.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Bildepuslespill-arbeidboker på Amazon KDP',
        description:
          'Sett sammen 50–100 rutenettskoblingspuslespill til en trykt arbeidsbok formatert for Amazon KDP. Strukturer boken etter progressiv vanskelighetsgrad: Kapittel 1 bruker 2×2-rutenett med 3 ledetråder for nybegynnere, Kapittel 2 bruker 3×3-rutenett med 2 ledetråder for mellomniå, og Kapittel 3 bruker 4×4-rutenett med 1 ledetråd for avanserte losere. Inkluder fasitsider i slutten av boken med de automatisk genererte nummererte sirkeloverleggene. Gråtonebryteren produserer blekkbesparende sider klare for svart-hvite bokinnersider. Visuelle persepsjonspuslespillboker gjor det godt i aktivitetsbokskategorien året rundt.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Produktlinjepuslespill-aktiviteter til Gumroad',
        description:
          'Bygg ferdige rutenettspuslespill-aktiviteter for hurtigslutts-ovelser, morgenarbeid eller berikelse. Kjopere som soker på Gumroad etter visuelle persepsjonsaktiviteter setter pris på puslespill som ankommer trykkeklare med fasit. Lag produktkatalogtilgrensende sett: dyrebildepuslespill for naturfagsenheter, varemerkepuslespill for samfunnsfag, matpuslespill for helse og ernaering. Den konfigurerbare vanskelighetsgraden lar deg differensiere innenfor et enkelt produkt — inkluder lette, middels og vanskelige versjoner av de samme tematiske puslespillene, slik at selgere kan tildele etter nivå.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sesongbaserte rutenettspuslespill-samlinger',
        description:
          'De 104 tematiske bildesamlingene dekker enhver sesong- og hoytidsanledning — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Lag tidsbegrensede rutenettspuslespill-samlinger som faller sammen med toppinnkjopsperioder. Utgi halloween-puslespillpakker i september, julesamlinger i oktober og valentinsdag-pakker i januar. Inkluder flere rutenettstorrelser og vanskelighetsgrader i hvert sesongsett for maksimal verdi. Sesongprodukter motiverer hoyere priser under toppvinduene sine og generator naturlige grunner til gjenkjop.',
        platform: 'Etsy / Amazon KDP / Gumroad (sesongbasert)',
      },
      {
        title: 'Tilpassede fotorutenettspuslespill for personaliserte produkter',
        description:
          'Bruk funksjonen Last Opp Egne Bilder til å lage rutenettspuslespill fra ethvert foto eller kunstverk. Familiebildepuslespill blir unike personlige gaver. Selgere kan laste opp klassebilder for semesteravslutningsaktiviteter. Kjaledyrsbildepuslespill, feriebildepuslespill og lagbildepuslespill generator alle unike produkter. Tilby tilpasset rutenettspuslespill-oppretting som en premiumtjeneste på Etsy, der kunder sender bildene sine, og du leverer trykte puslespillarbeidsark med fasit — et hoymarginpersonalisert produkt med minimal produksjonstid.',
        platform: 'Etsy (personaliserte produkter)',
      },
    ],
  },

  faq: [
    {
      question: 'Hvilke rutenettstorrelser er tilgjengelige for rutenettskoblingspuslespill?',
      answer:
        'Generatoren stotter 2–4 rader og 2–4 kolonner, konfigurert uavhengig. Dette generator rutenett fra 2×2 (4 fliser) opp til 4×4 (16 fliser). Standard er 3×3 (9 fliser). Mindre rutenett er lettere og fungerer godt for yngre brukere; storre rutenett oker vanskelighetsgraden og visuell kompleksitet. Du kan stille inn rader og kolonner til forskjellige verdier — for eksempel generator 2 rader × 4 kolonner et bredt rektangulert puslespill.',
    },
    {
      question: 'Hvordan kontrollerer ledetrådsceller puslespillets vanskelighetsgrad?',
      answer:
        'Ledetrådsceller er rutenettposisjoner der bildeflisen forblir synlig som et tips. Still inn 1–5 ledetrådsceller med glidebryteren i panelet Rutenettmuligheter (standard er 1). Flere ledetråder gjor puslespillet lettere fordi brukerne har flere referansepunkter. For et 3×3-rutenett med 1 ledetråd må brukerne matche 8 fliser — ganske utfordrende. Med 5 ledetråder må kun 4 fliser matches — mye mer tilgjengelig. Denne ene kontrollen lar deg lage graderte vanskelighetssett fra det samme bildet.',
    },
    {
      question: 'Hvordan fungerer rutenettskoblingspuslespillet for brukerne?',
      answer:
        'Arbeidsarket viser et rutenett der noen celler viser den faktiske bildeflisen (ledetrådsceller) og gjenstående celler viser «?»-plassholdere. Under eller ved siden av rutenettet viser en nummerert palett alle skjulte fliser i blandet rekkefolge. Brukerne gjennomgår ledetrådscellene, studerer de nummererte flisene og avgjor hvilket nummer som horer hjemme i hver tom rutenettposisjon. Svaret krever romlig resonnement — kobling av fliseinnhold til dens korrekte plass i det overordnede bildet.',
    },
    {
      question: 'Hvordan fungerer den automatisk genererte fasiten?',
      answer:
        'Generatoren bruker et dobbeltlerretssystem med en Arbeidsarkfane og en Fasitfane. Fasiten viser det komplette, uoppdelte bildet med nummererte sirkler overlagt på hver rutenettcelle. Hver sirkel har en gul bakgrunn (#ffffe0) med svart kontur og viser palettnummeret som horer hjemme i den posisjonen. Numrene tilsvarer den blandede fliserekkefolgen fra arbeidsarket, noe som gjor fasitkontroll enkel. Begge versjonene eksporteres separat med fire dedikerte nedlastingsknapper.',
    },
    {
      question: 'Kan jeg bruke egne bilder til rutenettspuslespill?',
      answer:
        'Ja. Panelet Last Opp Egne Bilder lar deg laste opp PNG-, JPG- eller GIF-filer fra datamaskinen din. Opplastede bilder vises i et galleri under opplastingsområdet. Klikk på ethvert opplastet bilde for å velge det som puslespillkilden din. Denne funksjonen er ideell for å lage personaliserte puslespill fra bilder, tilpasset kunstverk eller merkevarebaserte bilder. Du kan bruke opplastede bilder ved siden av det innebygde biblioteket — bytt fritt mellom dem.',
    },
    {
      question: 'Hvordan tilpasser layoutet seg til stående og liggende orientering?',
      answer:
        'Generatoren registrerer automatisk sideorienteringen din og omposisjonerer elementer deretter. Stående sider plasserer rutenettet overst (med 45 % av tilgjengelig hoyde) med den nummererte paletten nedenfor og en fullbredde-overskrift. Liggende sider posisjonerer rutenettet på den venstre halvdelen (48 % av tilgjengelig bredde) med paletten til hoyre og en kompakt overskrift. Dette sikrer at rutenettspuslespill ser balanserte og profesjonelle ut i begge orienteringer uten manuelle layoutjusteringer.',
    },
    {
      question: 'Kan jeg generere flere unike puslespill fra det samme bildet?',
      answer:
        'Ja. Hver gang du klikker på Generer, blander appen flisene med Fisher-Yates-randomisering, noe som produserer en annerledes nummerert fliserekkefolge. Ledetrådscellenes posisjoner endres også mellom genereringer. Det betyr at du kan lage flere distinkte puslespillarbeidsark fra et enkelt bilde uten å endre noen innstillinger — hvert har forskjellige flisenumre og ledetrådposisjoner, noe som gjor dem til unike puslespillopplevelser.',
    },
    {
      question: 'Hvordan fungerer vanskelighetsskalering over rutenettstorrelser og ledetrådantall?',
      answer:
        'Vanskelighetsgraden avhenger av to faktorer: totalt antall fliser (rutenettstorrelse) og synlige ledetråder. Et 2×2-rutenett med 3 ledetråder etterlater kun 1 flise å matche — det lettest mulige puslespillet. Et 4×4-rutenett med 1 ledetråd krever matching av 15 fliser — den vanskeligste konfigurasjonen. Mellom disse ytterpunktene kan du lage ethvert vanskelighetsnivå. For graderte arbeidboker, begynn med 2×2-rutenett (3 ledetråder), fortsett til 3×3 (2 ledetråder) og avslutt med 4×4 (1 ledetråd) for en naturlig vanskelighetskurve.',
    },
    {
      question: 'Finnes det en gratis proveversjon?',
      answer:
        'Ja. Du kan bruke alle funksjoner — alle rutenettstorrelser, justerbare ledetrådsceller, den automatisk genererte fasiten med nummererte overlegg, hele bildebiblioteket, bakgrunns- og rammetemaer, opplasting av egne bilder, tekstverktoy og alle nedlastingsformater — uten å opprette en konto, oppgi kredittkort eller installere programvare. Nedlastinger fra den gratis proveversjonen inneholder et lite vannmerke. En kommersiell lisens fjerner vannmerket og gir fulle salgsrettigheter.',
    },
    {
      question: 'Er Rutenettkobling Puslespill Generatoren språkavhengig?',
      answer:
        'Nei. Rutenettkobling er rent visuelt — puslespillresultatet inneholder kun bildefliser og tall, uten lokalisert ordinnhold på selve arbeidsarket. Appgrensesnittet (menyer, knapper, overskriftstekst) stotter alle 11 språk, men det genererte puslespillet fungerer identisk uansett språkvalg. Dette gjor rutenettskoblingspuslespill universelt salgbare på alle markeder uten oversettelse. Kommersiell Pakke inkluderer 10 fargerike temaer; Full Tilgang låser opp alle 104 temaer og alle 11 brukergrensesnittspråk.',
    },
    {
      question: 'Kan jeg selge rutenettskoblingspuslespill laget med dette verktøyet på Etsy og Amazon KDP?',
      answer:
        'Ja. Med en kommersiell lisens har du fulle rettigheter til å selge rutenettskoblingspuslespillene dine som digitale nedlastinger på Etsy, som trykte arbeidboker på Amazon KDP, som produktlinjeressurser på Gumroad, eller via enhver annen salgskanal. De konfigurerbare rutenettstorrelsene, justerbare ledetrådscellene, automatisk genererte fasiter og 104 tematiske bildesamlinger gir deg de kreative verktoyene til å produsere originale, salgbare rutenettspuslespillprodukter.',
    },
    {
      question: 'Hva er returpolicyen?',
      answer:
        'Fordi den gratis proveversjonen gir deg tilgang til alle funksjoner, tilbyr vi ingen refusjoner på kjop av kommersielle lisenser. Du kan teste alle rutenettstorrelser, ledetrådscellekonfigurasjoner, den automatisk genererte fasiten med nummererte overlegg, hele bildebiblioteket, bakgrunns- og rammetemaer, opplasting av egne bilder, tekstverktoy og alle nedlastingsformater for du kjoper. Den gratis proveversjonen er returpolicyen — sorg for at verktøyet passer til behovene dine for du anskaffer en lisens.',
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
      slug: 'manglende-biter-arbeidsark',
      anchorText: 'Manglende Biter Arbeidsark Generator',
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
      slug: 'barnehageklasse-utskriftsbare-ideer',
      anchorText: 'Barnehageklasse utskriftsbare ideer for unge brukere',
    },
    {
      pageType: 'start',
      slug: 'utskriftsbar-forretning-plan',
      anchorText: 'Din Utskriftsbare Forretning Plan',
    },
    {
      pageType: 'guide',
      slug: 'lag-koblings-arbeidsark',
      anchorText: 'Slik Lager du Kobling og Rutenettspuslespill Arbeidsark',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/norwegian/grid%20match/Rutenettspuslespill%201.webp',
      primaryAlt: 'Rutenettkobling bildepuslespill arbeidsark med bildefliser delt opp i et rutenett, ledetrådsceller synlige og nummerert flisepalett for kobling',
    },
    sampleGallery: [
      {
        src: '/samples/norwegian/grid%20match/Rutenettspuslespill%201.webp',
        alt: 'Tre ganger tre rutenettskoblingspuslespill med en ledetrådscelle og åtte nummererte fliser i paletten',
        caption: '3×3 rutenettspuslespill — en ledetrådscelle synlig, åtte fliser å matche fra nummerert palett',
      },
      {
        src: '/samples/norwegian/grid%20match/Rutenettspuslespill%202.webp',
        alt: 'Rutenettskoblingspuslespill med et annet tema og variert rutenettstorrelse',
        caption: 'Tematisk rutenettspuslespill — 104 temaer gir unike visuelle persepsjonsutfordringer',
      },
      {
        src: '/samples/norwegian/grid%20match/Rutenettspuslespill%203.webp',
        alt: 'Rutenettkobling fasit som viser komplett bilde med nummererte sirkler overlagt på hver rutenettcelle',
        caption: 'Automatisk generert fasit — nummererte sirkler viser korrekt fliseplassering på komplett bilde',
      },
    ],
    youtubeId: 'RGtED1Bnut8',
    videoTitle: 'Slik Lager du Rutenettkobling Bildepuslespill med Konfigurerbar Vanskelighetsgrad — Trinn-for-Trinn Guide',
  },
};

export default content;
