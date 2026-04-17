import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'telleoppgaver skrive ut',
    secondaryKeywords: [
      'øvelser telle og diagram',
      'oppgaver diagrammer barneskole',
      'telle og streke oppgave',
      'telleaktiviteter 1. trinn',
    ],
    lsiKeywords: [
      'telle',
      'stolpediagram',
      'streker',
      'data',
      'sortere',
    ],
    titleTag: 'Telleoppgaver-generator | LessonCraftStudio',
    metaDescription: 'Lag telle- og diagramoppgaver med temabilder. Automatisk fasit, utskrivbare PDF-er. Prøv gratis.',
  },

  hero: {
    title: 'Telleoppgaver-generator — Lag utskrifter å selge på Etsy og KDP',
    tagline: 'Dobbeltlerret piktogram-generator — generer spredte bilderutenett med 6 bildetyper, automatisk utfylte sojlediagram-fasiter, lokaliserte overskrifter på 11 språk og 104 tematiske bildesamlinger for datarepresentasjon arbeidsark.',
    description:
      'Forvandl visuell telling til en komplett dataferdighetsaktivitet med den eneste arbeidsark-generatoren som er bygget spesifikt for bildediagrammer. Hvert arbeidsark inneholder et spredt bilderutenett med 20 ikoner fra 6 forskjellige typer arrangert i et 4×5-layout — brukerne teller hvor mange av hver type det er, og fargelegger deretter de tilsvarende cellene i sojlediagrammet nedenfor. Appen genererer samtidig en fasit med gulmarkerte celler som viser de korrekte antallene, slik at selgere kan verifisere utfylte ark oyeblikkelig. Velg bilder automatisk ved å velge et tema fra dropdownmenyen Arbeidsarkets Bildekilde, eller velg manuelt noyaktig 6 bilder fra det gjennomsoekbare Bildebiblioteket med mer enn 3 100 illustrasjoner i 104 samlinger. Hvert arbeidsark inkluderer en automatisk generert overskrift med en lokalisert «Bildediagram»-tittel og telleinstruksjoner — overskriften tilpasses til alle 11 stoettede språk automatisk. Legg til navn- og datofelt med et enkelt avkrysningsfelt, anvend bakgrunns- og rammetemaer med uavhengige opasitetskontroller, og tilpass med tekstverktoy og frihånds lerredsredigering. Diagramtelling Generatoren er ikke språkavhengig — visuell telling bruker universelle tall og bilder, så arbeidsarkene fungerer identisk på ethvert språk. Det samme bildediagram arbeidsarket kan brukes globalt uten oversettelse — et enkelt skapelsesflyt betjener ethvert marked uten språkspesifikke varianter. Full Tilgang låser opp alle 104 temaer og alle 11 brukergrensesnittspråk. Eksporter trykkeklare PDF-er og JPEG-bilder med 300 DPI via 6x renderingsmultiplikator i Letter, A4, Kvadrat (1200×1200) eller egendefinerte storrelser. Last ned alle fire filer — arbeidsark-JPEG, arbeidsark-PDF, fasit-JPEG og fasit-PDF — i en enkelt okt. Kommersiell Pakke inkluderer 10 fargerike temaer; Full Tilgang låser opp alle 104 temaer for maksimal variasjon over bildediagram-pakker. Enten du selger bildediagram-pakker på Etsy, setter sammen dataferdighets-arbeidboker til Amazon KDP eller lager matematikkstasjonsaktiviteter til Gumroad — Diagramtelling Generatoren leverer produktlinjeferdige resultater på få minutter. Gratis proveversjon med alle funksjoner — ingen registrering, intet kredittkort. Nedlastinger inneholder et vannmerke; kjop en lisens for å fjerne det.',
  },

  ctaHeading: 'Lag telleoppgaver',

  howItWorks: {
    title: 'Slik Lager du Bildediagram Arbeidsark i 5 Trinn',
    steps: [
      {
        title: 'Still inn sidelayout og navnefelt',
        description:
          'Åpne panelet Sideoppsett og velg en sidestorrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) eller en egendefinert dimensjon. Velg en sidefarge med fargevelgeren — hvit er standard for rene arbeidsark. Sett avkrysning i feltet Inkluder Navn/Dato for å legge til formaterte «Navn: ____» og «Dato: ____» felt nederst på siden, slik at brukerne identifiserer arbeidet sitt. Velg et bakgrunnstema og et rammetema fra det innebygde biblioteket, hvert med en uavhengig opasitetsglidebryter (0–1, trinn 0,05) for subtil eller dristig dekorativ innramming.',
      },
      {
        title: 'Velg bildekilden din',
        description:
          'Åpne panelet Bildebibliotek og velg en bildekilde fra dropdownmenyen Arbeidsarkets Bildekilde. Velg et tema som Dyr, Mat eller Kjoretoy for automatisk utvalg — appen velger tilfeldig 6 bilder fra den samlingen. Alternativt, bytt til manuell modus: bla gjennom Bildebiblioteket etter tema eller sok, og klikk deretter på noyaktig 6 bilder for å velge dem. Valgte bilder vises i en forhåndsvisningsrad der du kan klikke for å fjerne og erstatte individuelle valg. Uten valgt tema velger appen 6 tilfeldige bilder fra alle tilgjengelige samlinger.',
      },
      {
        title: 'Generer bildediagram-arbeidsarket',
        description:
          'Klikk på Generer for å lage arbeidsarket. Appen arrangerer 20 spredte ikoner fra dine 6 valgte bildetyper i et 4×5-rutenett med en stiplet ramme overst på siden. Under rutenettet vises et sojlediagram med 6 kolonner × 5 rader, der hver kolonne er merket med en av de 6 bildetypene. Radene er nummerert 1–5 nedenfra og opp. En automatisk generert overskrift viser en lokalisert «Bildediagram»-tittel og telleinstruksjoner i en stilisert gul pille med oransje ramkant. Lerretets arbeidsark viser tomme diagramceller klare for brukerne å fylle ut.',
      },
      {
        title: 'Tilpass med tekstverktoy og lerredsredigering',
        description:
          'Bruk panelet Tekstverktoy til å legge til titler, etiketter eller instruksjoner med syv skrifttypevalg: Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial og Verdana. Juster skriftstorrelse, tekstfarge, konturfarge og konturbredde (0–10 med 0,5-trinns granularitet) for lesbare overskrifter. Dra, endre storrelse, roter og flytt elementer hvor som helst på Fabric.js-lerretet. Bruk lagkontroller til å håndtere stablingsrekkefolge, lås ferdige elementer og zoom fra 25 % til 300 % for presisjon. Angre og gjor om opptil 20 historikktrinn med Ctrl+Z og Ctrl+Y.',
      },
      {
        title: 'Generer fasit og last ned alt',
        description:
          'Bytt til fanen Fasit for å se den automatisk genererte losningen — sojlediagrammets celler er fylt med gul (#FFC857) markering som viser det korrekte antallet for hver bildetype. Slå gråtonemuligheten til for blekkbesparende versjoner. Last ned alle fire filer: arbeidsark-JPEG, arbeidsark-PDF, fasit-JPEG og fasit-PDF — alle rendret med 300 DPI. Filene heter worksheet.jpeg, worksheet.pdf, answer_key.jpeg og answer_key.pdf for enkel organisering. Hver eksport er produksjonsklar for Etsy-oppforinger, Amazon KDP-innersider og Gumroad-ressursfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nokkelfunksjoner i Diagramtelling Arbeidsark Generatoren',
    features: [
      {
        title: 'Bildediagram arbeidsark generator med spredt bilderutenett og sojlediagram',
        description:
          'Hvert genererte arbeidsark kombinerer to sammenkoblede elementer: et 4×5-rutenett med 20 spredte ikoner fra 6 forskjellige bildetyper, og et sojlediagram med 6 kolonner × 5 rader der hver kolonne tilsvarer en bildetype. Bildetypene forekommer hver 1–5 ganger i rutenettet (maksimalt 5 per type, tilfeldig fordelt), noe som generator en unik telleutfordring hver gang du genererer. Brukerne teller hvor mange av hver bildetype det er i rutenettet, og fargelegger deretter det tilsvarende antall celler i diagrammet nedenfor. Dette todelte formatet laerer datainnsamling og datarepresentasjon samtidig — kjernen i tidlige diagramferdigheter.',
      },
      {
        title: 'Automatisk generert fasit med utfylte diagramceller',
        description:
          'Hvert arbeidsark genererer en matchende fasit samtidig på en separat lerretfane. Fasiten viser det samme bilderutenettet og sojlediagrammet, men med de korrekte cellene fylt med gul (#FFC857) markering. Selgere ser med et blikk hvor mange av hver bildetype det skal vaere i diagrammet. Bytt mellom fanene Arbeidsark og Fasit for å sammenligne. Last ned begge versjonene uavhengig — arbeidsark-JPEG/PDF og fasit-JPEG/PDF — noe som gir deg fire produksjonsklare filer fra en enkelt generering. Den automatiske fasiten eliminerer manuell telling og sikrer noyaktighet over store arbeidsarkpakker.',
      },
      {
        title: 'Automatisk og manuell bildevalgtmodus',
        description:
          'Dropdownmenyen Arbeidsarkets Bildekilde tilbyr to metoder for å velge de 6 bildene som vises på hvert arbeidsark. I automatisk modus velger du et tema (Dyr, Mat, Kjoretoy og 101 flere), og appen velger tilfeldig 6 bilder fra den samlingen. I manuell modus blar du gjennom Bildebiblioteket etter tema eller soker med nokkelord og klikker deretter på noyaktig 6 bilder for å velge dem — en forhåndsvisningsrad viser valgene dine med klikk-for-å-fjerne funksjonalitet. Uten valgt tema henter appen 6 tilfeldige bilder fra alle tilgjengelige samlinger. Begge modusene garanterer noyaktig 6 bildetyper per arbeidsark for konsekvent diagramformatering.',
      },
      {
        title: 'Lokalisert bildediagram-overskrift med tittel og instruksjoner',
        description:
          'Hvert genererte arbeidsark inkluderer en automatisk generert overskrift med gul pillebakgrunn (#FFD93D), hvit indre pille og oransje ramkant (ytre #FF8C42, indre #FFD6A5). Overskriften viser en lokalisert tittel — «Bildediagram» på norsk, «Picture Graph» på engelsk, «Bilddiagramm» på tysk og tilsvarende oversettelser på alle 11 stoettede språk. Under tittelen guider lokaliserte telleinstruksjoner brukerne gjennom aktiviteten. Overskriften tilpasses automatisk når du bytter brukergrensesnittspråk, noe som gjor arbeidsarkene produktlinjeferdige i alle lokaler uten manuell tekstredigering.',
      },
      {
        title: 'Bildebibliotek med 104 tematiske samlinger og mer enn 3 100 illustrasjoner',
        description:
          'Bla gjennom 104 tematiske bildesamlinger som dekker dyr, mat, kjoretoy, natur, yrker, hoytider, sport, årstider og dusinvis flere. Hvert tema gir et koordinert sett fargerike illustrasjoner perfekte for bildediagram arbeidsark. Bruk temadropdownen til å filtrere etter kategori eller sok etter spesifikke bilder med nokkelord. I automatisk modus velger appen 6 bilder fra ditt valgte tema; i manuell modus velger du noyaktig 6 fra enhver kombinasjon av temaer. Kommersiell Pakke inkluderer 10 fargerike temaer; Full Tilgang låser opp alle 104 temaer for maksimal variasjon over arbeidsarkpakker.',
      },
      {
        title: 'Bakgrunns- og rammetemaer med uavhengige opasitetskontroller',
        description:
          'Anvend dekorative bakgrunner og rammer fra det innebygde temabiblioteket for å ramme inn bildediagram arbeidsarkene dine. Til forskjell fra apper med kun rammetemaer tilbyr Diagramtelling Generatoren både bakgrunns- og rammetemaer med uavhengige opasitetsglidere (0–1, trinn 0,05). Still inn en subtil akvarellbakgrunn på 20 % opasitet mens du beholder en dristig dekorativ ramme på full opasitet, eller enhver kombinasjon som passer designet ditt. Bakgrunns- og rammetemaer legger til visuell finish og oker opplevd kvalitet for markedsplassoppforinger uten å forstyrre bilderutenettets eller sojlediagrammets innhold.',
      },
      {
        title: 'Trykkeklar PDF- og JPEG-eksport med 300 DPI og gråtonebryter',
        description:
          'Last ned bildediagram arbeidsark og fasit som hoyopploste JPEG-bilder eller trykkeklare PDF-dokumenter rendret med 300 DPI via en 6x multiplikator for skarpe resultater. Sidestorrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende, Kvadrat (1200×1200) og helt egendefinerte dimensjoner. Slå gråtone til for blekkbesparende versjoner ideelle for masseutskrift og KDP-bokinnersider. Fire nedlastingsknapper gir arbeidsark-JPEG, fasit-JPEG, arbeidsark-PDF og fasit-PDF — et komplett produktsett fra en enkelt generering.',
      },
      {
        title: 'Full lerredsredigering med tekstverktoy og lagkontroller',
        description:
          'Fabric.js-lerretet gir komplett kontroll over hvert element på bildediagram arbeidsarket ditt. Dra, endre storrelse, roter og flytt bilderutenettet, sojlediagrammet, overskriften, teksten og alle egendefinerte elementer fritt. Lagkontroller håndterer stablingsrekkefolge — flytt elementer fremover eller send dem bakover. Lås ferdige elementer mens du redigerer andre. Legg til egendefinert tekst med syv skrifttypemuligheter (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storrelse og farge, og tekstkonturbredde fra 0 til 10 med 0,5-trinns granularitet. Zoom fra 25 % til 300 % for presisjonsarbeid. Angre og gjor om opptil 20 historikktrinn. Rydd Alt inkluderer en bekreftelsesdialog for å forhindre utilsiktet sletting.',
      },
    ],
  },

  businessUseCases: {
    title: 'Slik Selger du Bildediagram Arbeidsark på Nett',
    cases: [
      {
        title: 'Tematiske bildediagram-pakker på Etsy',
        description:
          'Lag tematiske bildediagram-pakker med de 104 bildesamlingene — dyretellings diagrammer, matdata diagrammer, kjoretoytellings ark, naturobservasjons diagrammer og dusinvis flere. Hvert tema gir tilstrekkelig med bilder til 10–20 unike arbeidsark med forskjellige tilfeldige fordelinger. Inkluder den automatisk genererte fasiten med hvert arbeidsark for selgerbekvemmelighet. Pakk temaer som enkle pakker til 25–40 kr hver, eller kombiner flere temaer til megapakker til 100–150 kr. Det spredte bilderutenettet med 6 typer per ark sikrer at hvert arbeidsark er unikt og umulig å gjenskape manuelt, noe som gir produktene dine ekte originalitet.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Dataferdighets-arbeidboker på Amazon KDP',
        description:
          'Sett sammen 60–100 bildediagram arbeidsark til en trykt dataferdighets-arbeidsbok formatert for Amazon KDP. Strukturer kapitler etter tema: Kapittel 1 dekker dyretelling, Kapittel 2 matdiagrammer, Kapittel 3 kjoretoysdata og så videre. Slå gråtoneeksport til for blekkbesparende sider klare for svart-hvite bokinnersider. Inkluder fasitsider i slutten av hvert kapittel for foreldre- og selgerreferanse. Dobbeltlerret-genereringen produserer både arbeidsark og fasit automatisk, så å bygge en 100-siders arbeidsbok med komplette losninger tar en brokdel av tiden sammenlignet med manuell skapelse.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Matematikkstasjonsaktiviteter til Gumroad',
        description:
          'Bygg ferdige matematikkstasjonsaktiviteter med bildediagrammer som inkluderer navn- og datofelt. Kjopere som soker på Gumroad etter diagramaktiviteter setter pris på arbeidsark med innebygd identifikasjon — avkrysningsfeltet for navn/dato gjor produktet ditt oyeblikkelig produktlinjeferdig uten ytterligere formatering. Lag temaspesifikke sett knyttet til produktkatalogenheter: tell bondegårdsdyr for livsvitenskap, diagram av vaerikoner for geovitenskap, eller tell samfunnshjelperkjoretoy for samfunnsfag. Hvert arbeidsark leveres med sin egen fasit, noe som eliminerer selgerens forberedelsestid.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Tverrfaglige dataaktiviteter',
        description:
          'Bildediagrammer bygger bro mellom matematikk og andre fag naturlig. Bruk dyretemaer for naturfaglige enheter om levesteder og klassifikasjon. Bruk mattemaer for helse- og ernaringsleksjoner. Bruk kjoretoytemaer for samfunns- og transportemner. De 104 tematiske samlingene dekker praktisk talt ethvert barneskolemneområde, noe som lar deg lage datarepresentasjon arbeidsark som forsterker fagordforråd samtidig som de laerer diagramferdigheter. Selg tverrfaglige pakker som appellerer til kjopere som onsker integrerte aktiviteter — en voksende nisje på alle tre store plattformene.',
        platform: 'Etsy / Amazon KDP / Gumroad',
      },
      {
        title: 'Sesongbaserte tellings- og diagramsamlinger',
        description:
          'De 104 tematiske bildesamlingene dekker enhver sesong- og hoytidsanledning — julepynt, halloween-ikoner, påskegjenstander, valentinsdag-hjerter, skolestarttilbehor, sommeraktiviteter og vinterscener. Lag tidsbegrensede bildediagram-samlinger som faller sammen med toppinnkjopsperioder. Utgi halloween-tellings-pakker i september, julediagram-pakker i oktober og valentinsdag-dataaktiviteter i januar. Inkluder fasit med hvert sett for komplette selgerpakker. Sesongprodukter motiverer hoyere priser under toppvinduene sine og generator naturlige grunner til gjenkjop.',
        platform: 'Etsy / Amazon KDP / Gumroad (sesongbasert)',
      },
    ],
  },

  faq: [
    {
      question: 'Hvordan fungerer bildediagram-arbeidsarket?',
      answer:
        'Hvert arbeidsark har to deler. Den ovre seksjonen viser et 4×5-rutenett med 20 spredte ikoner fra 6 forskjellige bildetyper — hver type forekommer 1–5 ganger, tilfeldig fordelt. Den nedre seksjonen viser et sojlediagram med 6 kolonner × 5 rader med kolonner merket med hver bildetype og rader nummerert 1–5 nedenfra og opp. Brukerne teller hvor mange av hver bildetype det er i rutenettet, og fargelegger eller fyller ut deretter det tilsvarende antall celler i den matchende kolonnen. Dette laerer både datainnsamling (telling) og datarepresentasjon (diagram) i en enkelt aktivitet.',
    },
    {
      question: 'Hvordan fungerer det automatiske bildevalget?',
      answer:
        'Åpne panelet Bildebibliotek og bruk dropdownmenyen Arbeidsarkets Bildekilde til å velge et tema. Appen velger tilfeldig 6 bilder fra den temasamlingen. Hvis du foretrekker manuell kontroll, bytt til manuell modus: bla gjennom temaer eller sok med nokkelord, og klikk deretter på noyaktig 6 bilder. Valgte bilder vises i en forhåndsvisningsrad der du kan klikke på ethvert bilde for å fjerne det og velge en erstatning. Uten valgt tema henter appen 6 tilfeldige bilder fra alle tilgjengelige samlinger. Hver modus garanterer noyaktig 6 bildetyper per arbeidsark.',
    },
    {
      question: 'Hvordan fungerer den automatisk genererte fasiten?',
      answer:
        'Når du genererer et arbeidsark, lager appen samtidig en matchende fasit på en separat lerretfane. Fasiten viser det samme bilderutenettet og sojlediagrammet, men de korrekte cellene i diagrammet er fylt med gul (#FFC857) markering. Bytt mellom fanene Arbeidsark og Fasit for å sammenligne. Last ned hver versjon uavhengig med de fire nedlastingsknappene: arbeidsark-JPEG, arbeidsark-PDF, fasit-JPEG og fasit-PDF. Fasiten genereres automatisk — ingen manuell telling nodvendig.',
    },
    {
      question: 'Hva er den lokaliserte overskriften på hvert arbeidsark?',
      answer:
        'Hvert genererte arbeidsark inkluderer en stilisert overskrift med en gul pillebakgrunn (#FFD93D), hvit indre pille og oransje ramkant. Overskriften viser en «Bildediagram»-tittel og telleinstruksjoner som automatisk oversettes til det aktive brukergrensesnittspråket — norsk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, dansk eller finsk. Overskriften tilpasses til liggende modus med et kompakt layout. Du trenger ikke lage eller formatere overskriften manuelt.',
    },
    {
      question: 'Hvordan fungerer navn- og datofeltene?',
      answer:
        'I panelet Sideoppsett setter du avkrysning i feltet Inkluder Navn/Dato for å legge til formaterte «Navn: ____» og «Dato: ____» felt nederst på arbeidsarksiden. Feltene bruker skrifttypen Fredoka i 18px med #333-farge. Brukerne skriver navnet og datoen sin for de begynner telleaktiviteten. Dette gjor arbeidsarkene oyeblikkelig produktlinjeferdige uten ytterligere formatering. Fjern avkrysningen for å fjerne feltene for produkter som ikke trenger identifikasjon.',
    },
    {
      question: 'Hvordan fungerer bakgrunns- og rammetemaer?',
      answer:
        'Panelet Sideoppsett tilbyr både bakgrunnstemaer og rammetemaer lastet fra det innebygde temabiblioteket. Hvert har en uavhengig opasitetsglidebryter (0–1, trinn 0,05), slik at du kan stille inn en subtil bakgrunn på lav opasitet mens du beholder en dristig ramme på full styrke, eller enhver kombinasjon du foretrekker. Bakgrunnstemaer fyller sideflaten bak bilderutenettet og diagrammet, mens rammetemaer rammer den ytre kanten inn. Sammen legger de til dekorativ finish uten å forstyrre arbeidsarkets innhold.',
    },
    {
      question: 'Hvordan fungerer gråtonebryteren?',
      answer:
        'Gråtonebryteren i panelet Nedlasting konverterer hele arbeidsarket eller fasiten til gråtone ved eksporttidspunktet. Lerretet ditt forblir i full farge for enkel visuell redigering — gråtone anvendes kun på den eksporterte filen. Dette produserer blekkbesparende resultater for masseutskrift der fargeblekk er dyrt eller utilgjengelig, og for Amazon KDP-bokinnersider som krever svart-hvite sider. Gråtonebryteren fungerer uavhengig for både arbeidsarks- og fasiteksporter.',
    },
    {
      question: 'Hvordan bytter jeg mellom arbeidsarket og fasiten?',
      answer:
        'Lerretområdet har to faner: Arbeidsark og Fasit. Klikk på fanen Fasit for å vise den automatisk genererte losningen med gulfylte diagramceller. Klikk på fanen Arbeidsark for å gå tilbake til ovelsesversjonen med tomme celler. Hver fane har sitt eget par nedlastingsknapper (JPEG og PDF), noe som gir deg fire totale nedlastingsmuligheter. Redigeringer av lerretselementer som tekst, bakgrunn og rammer gjelder for begge faner — den eneste forskjellen mellom dem er sojlediagrammets utfyllingsmodus.',
    },
    {
      question: 'Finnes det en gratis proveversjon?',
      answer:
        'Ja. Du kan bruke alle funksjoner — dobbeltlerretet, bilderutenettgenerering, sojlediagramoppretting, automatisk fasit, bildebiblioteket, bakgrunns- og rammetemaer, navn/dato-felt, gråtoneeksport og alle nedlastingsformater — uten å opprette en konto, oppgi kredittkort eller installere programvare. Nedlastinger fra den gratis proveversjonen inneholder et lite vannmerke. En kommersiell lisens fjerner vannmerket og gir fulle salgsrettigheter.',
    },
    {
      question: 'Er Diagramtelling Generatoren språkavhengig?',
      answer:
        'Nei. Diagramtelling Generatoren produserer visuelle tellearbeidsark der brukerne teller bilder og fyller ut sojlediagramceller — tall og bilder er universelle. Å bytte språk påvirker bare brukergrensesnittetiketter i generatoren, den automatisk genererte overskriftens tittel og instruksjoner samt bildebiblioteksets innholdsetiketter. Arbeidsarkets resultat i seg selv fungerer identisk på ethvert språk. Kommersiell Pakke inkluderer 10 fargerike temaer; Full Tilgang låser opp alle 104 temaer og alle 11 brukergrensesnittspråk.',
    },
    {
      question: 'Hva er returpolicyen?',
      answer:
        'Fordi den gratis proveversjonen gir deg tilgang til alle funksjoner, tilbyr vi ingen refusjoner på kjop av kommersielle lisenser. Du kan teste dobbeltlerretet, bilderutenettgenerering, automatisk fasit, hele bildebiblioteket, bakgrunns- og rammetemaer, navn/dato-felt, gråtoneeksport og alle nedlastingsformater for du kjoper. Den gratis proveversjonen er returpolicyen — sorg for at verktøyet passer til behovene dine for du anskaffer en lisens.',
    },
    {
      question: 'Passer oppgavene for småskoletrinnet og mellomtrinnet?',
      answer: 'Ja. Juster tallintervallet og vanskelighetsgraden for å matche småskoletrinnet (1.–4. trinn) og mellomtrinnet (5.–7. trinn). Generatoren lar deg tilpasse oppgavene til ethvert trinn i barneskolen — fra konkret visuell telling for 1. trinn til mer abstrakt tallregning for eldre elever på mellomtrinnet.',
    },
    {
      question: 'Følger oppgavene LK20 (Kunnskapsløftet 2020)?',
      answer: 'Generatoren er designet som et fleksibelt supplement og er ikke bundet til én bestemt læreplan. Oppgavene dekker kompetansemål i matematikk for barneskolen i LK20, der elevene blant annet skal utforske og bruke tallforståelse og datahåndtering. Tilpass tallintervallet og øvelsesmodusen for å matche de spesifikke kompetansemålene du jobber med — fra diagrammer og telling.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'stor-liten-arbeidsark',
      anchorText: 'Stort og Lite Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'monstertog-arbeidsark',
      anchorText: 'Monstertog Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'monster-arbeidsark',
      anchorText: 'Monster Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'tegn-og-fargelegg-arbeidsark',
      anchorText: 'Tegn og Fargelegg Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'linjeovelser-arbeidsark',
      anchorText: 'Linjeovelser Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'fargeleggingsbilder-arbeidsark',
      anchorText: 'Fargelegging Arbeidsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'visuell-laering-pakke',
      anchorText: 'Visuell Laering Pakke — Alle Visuelle Apper i En',
    },
    {
      pageType: 'idea',
      slug: 'sommer-utskriftsbare-ideer',
      anchorText: 'Sommer utskriftsbare ideer for sesongsalg',
    },
    {
      pageType: 'idea',
      slug: 'jul-utskriftsbare-ideer',
      anchorText: 'Jul utskriftsbare ideer for sesongsalg',
    },
    {
      pageType: 'start',
      slug: 'etsy-utskriftsbar-forretning',
      anchorText: 'Bygg Din Etsy Utskriftsbare Forretning',
    },
    {
      pageType: 'guide',
      slug: 'lag-bildediagram-arbeidsark',
      anchorText: 'Slik Lager du Diagramtelling Arbeidsark som Selger',
    },
    {
      pageType: 'tool',
      slug: 'bildediagram-arbeidsark-skaper',
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
      primary: '/samples/norwegian/chart%20count/bildediagram-1.webp',
      primaryAlt: 'Bildediagram arbeidsark med spredt bilderutenett og sojlediagram der brukerne teller og diagrammerer 6 bildetyper',
    },
    sampleGallery: [
      {
        src: '/samples/norwegian/chart%20count/bildediagram-1.webp',
        alt: 'Dyretema bildediagram arbeidsark med 20 spredte dyreikoner og tomt sojlediagram',
        caption: 'Dyretema bildediagram — 6 dyretyper spredt over rutenettet med sojlediagram nedenfor',
      },
      {
        src: '/samples/norwegian/chart%20count/bildediagram-2.webp',
        alt: 'Bildediagram arbeidsark med et annet tema og fargerike illustrasjoner',
        caption: 'Tematisk bildediagram — 104 temaer gir unike telleutfordringer for hvert arbeidsark',
      },
      {
        src: '/samples/norwegian/chart%20count/bildediagram-3.webp',
        alt: 'Bildediagram fasit med gulmarkerte celler som viser korrekte antall for hver bildetype',
        caption: 'Automatisk generert fasit — gulfylte celler viser det korrekte antallet for hver bildetype',
      },
    ],
    youtubeId: 'CDgIihDQX6U',
    videoTitle: 'Slik Lager du Bildediagram Arbeidsark med Automatiske Fasiter og 104 Tematiske Bildesamlinger — Trinn-for-Trinn Guide',
  },
};

export default content;
