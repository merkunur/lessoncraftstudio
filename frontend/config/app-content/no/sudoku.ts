import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'bildesudoku generator',
    secondaryKeywords: [
      'utskriftsbar bildesudoku generator til Etsy-selgere',
      'bildesudoku puslespill generator til KDP-utgivere',
      'bildesudoku arbeidsark generator kommersiell lisens',
      'selg sudoku puslespillarbeidsark på Gumroad',
    ],
    lsiKeywords: [
      'digitale sudoku utskriftsbare produkter nettbasert forretning',
      'kommersielt bruk bildepuslespill generator',
      'utskriftsbar logikkpuslespill forretningsverktoy',
    ],
    titleTag: 'Bildesudoku Generator | Lag og Selg Arbeidsark',
    metaDescription: 'Lag bildesudoku arbeidsark til salg på Etsy, KDP og Gumroad. 4×4 rutenett, tre vanskelighetsgrader, automatisk fasit, 104 temaer. $49 engangsbetaling.',
  },

  hero: {
    title: 'Bildesudoku Arbeidsark Generator for 4×4 Bildelogikkpuslespill',
    tagline: 'Visuelle 4×4 sudokupuslespill med bilder i stedet for tall — tre vanskelighetsgrader fra 4 til 8 tomme celler, automatisk genererte fasiter med komplette utfylte rutenett og temabasert bildevalg over 104 samlinger for puslespill som selger globalt uten oversettelse.',
    description:
      'Bygg profesjonelle 4×4 bildesudoku arbeidsark der brukerne fyller ut tomme celler med de korrekte bildene ved hjelp av rad-og-kolonne-logikk. Hvert puslespill bruker noyaktig 4 unike bilder som skal vises en gang i hver rad og en gang i hver kolonne — de samme reglene som klassisk sudoku, men med fargerike illustrasjoner i stedet for tall. Velg blant tre vanskelighetsgrader: Lett fjerner 4 celler, Middels fjerner 6 og Vanskelig fjerner 8 — halvparten av rutenettet. Velg bilder gjennom temabasert autovalg som tilfeldig velger 4 bilder fra enhver av 104 tematiske samlinger, eller velg manuelt noyaktig 4 bilder fra biblioteket, sok eller dine egne opplastinger. Det premiumdesignede rutenettet har alternerende 2×2-blokkfarger i lyseblått og lyserosa, flerlagede skygger og en indigoblå ytre ramme med avrundede hjorner. Hvert puslespill inkluderer en automatisk generert «Bildesudoku»-overskrift lokalisert på alle 11 språk og en dobbeltlerretsfasit som viser det komplette utfylte rutenettet med alle 16 celler utfylt. Fordi bildesudoku er helt visuelt — ingen ord vises på puslespillrutenettet — fungerer hvert arbeidsark identisk på alle 11 språk, noe som gjor produktene dine salgbare globalt uten noen modifikasjon. Full Tilgang låser opp alle 104 temaer med mer enn 3 100 illustrasjoner og alle 11 brukergrensesnittspråk. Legg til bakgrunnstemaer og rammetemaer med uavhengige opasitetskontroller, og eksporter trykkeklare PDF-er og JPEG-bilder med 300 DPI i Letter, A4 eller egendefinerte storrelser. Enten du selger tematiske sudokupakker på Etsy, setter sammen logikkarbeidboker til Amazon KDP eller lager resonnementsaktiviteter til Gumroad — denne generatoren leverer produksjonsklare puslespill på få minutter. Gratis proveversjon med alle funksjoner — ingen registrering, intet kredittkort. Nedlastinger inneholder et vannmerke; kjop en lisens for å fjerne det.',
  },

  howItWorks: {
    title: 'Slik Lager du Bildesudoku Arbeidsark i 5 Trinn',
    steps: [
      {
        title: 'Still inn sidelayouten',
        description:
          'Åpne panelet Side og Scene og velg en sidestorrelse: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende eller en egendefinert dimensjon. Velg en reservefarge med fargevelgeren. Velg et bakgrunnstema og juster dets opasitet (0–1 i 0,05-trinn), velg deretter et rammetema med sin egen uavhengige opasitetskontroll. Disse layoutvalgene rammer inn sudokupuslespillet ditt for du konfigurerer noe innhold.',
      },
      {
        title: 'Velg vanskelighetsgrad',
        description:
          'Åpne panelet Sudoku for Barn og velg en vanskelighetsgrad fra dropdownen: Lett, Middels eller Vanskelig. Lett fjerner 4 celler fra 4×4-rutenettet og etterlater 12 utfylte og 4 for brukeren å lose. Middels fjerner 6 celler for en moderat utfordring. Vanskelig fjerner 8 celler — noyaktig halvparten av rutenettet — og krever mer avansert logisk resonnement. Systemet velger tilfeldig hvilke celler som blir tomme, slik at å regenerere den samme vanskelighetsgraden produserer forskjellige puslespillkonfigurasjoner hver gang.',
      },
      {
        title: 'Velg noyaktig 4 bilder',
        description:
          'Åpne panelet Bildebibliotek og velg hvordan du vil velge dine 4 puslespillbilder. Temabasert valg velger et tema fra dropdownen, og systemet velger automatisk 4 tilfeldige bilder fra den samlingen. Manuelt valg lar deg bla gjennom 104 tematiske samlinger med mer enn 3 100 illustrasjoner, filtrere etter tema eller soke med nokkelord for å håndplukke noyaktig 4 bilder. Du kan også laste opp egne bilder. Appen krever noyaktig 4 bilder — hverken mer eller mindre — fordi et 4×4 sudokurutenett bruker 4 unike symboler.',
      },
      {
        title: 'Generer sudokupuslespillet',
        description:
          'Klikk på Generer for å lage 4×4 bildesudoku-rutenettet. Appen plasserer dine 4 valgte bilder i et gyldig sudokuarrangement der hvert bilde vises noyaktig en gang per rad og en gang per kolonne, og fjerner deretter det konfigurerte antall celler basert på vanskelighetsinnstillingen din. Premiumrutenettet viser alternerende 2×2-blokkfarger i lyseblått (#F8F9FC) og lyserosa (#FFF5F7), med fete midtadskillere, flerlagede skygger og en indigoblå ytre ramme (#667EEA) med avrundede hjorner. En stilisert «Bildesudoku»-overskrift vises over rutenettet med lilla bakgrunn (#5E35B1) og lokalisert titteltekst.',
      },
      {
        title: 'Generer fasit og last ned',
        description:
          'Bytt til fanen Fasit for å se det komplette utfylte rutenettet med alle 16 celler utfylt — ingen tomme. Last ned begge versjonene med de fire dedikerte knappene: Arbeidsark-JPEG, Fasit-JPEG, Arbeidsark-PDF og Fasit-PDF. Filer eksporteres som sudoku_worksheet.jpeg/pdf og sudoku_answer_key.jpeg/pdf med 300 DPI. Slå gråtone til for blekkbesparende versjoner. Hver eksport er produksjonsklar for Etsy-oppforinger, Amazon KDP-innersider og Gumroad-produktfiler.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nokkelfunksjoner i Bildesudoku Generatoren',
    features: [
      {
        title: '4×4 bildesudoku med bilder i stedet for tall',
        description:
          'Hvert puslespill bruker et 4×4-rutenett med 4 unike fargerike bilder som erstatter tradisjonelle tall. Brukerne anvender de samme logikkreglene som klassisk sudoku — hvert bilde skal vises noyaktig en gang i hver rad og noyaktig en gang i hver kolonne — men det visuelle formatet gjor puslespill tilgjengelige for forlesere og unge brukere som ennå ikke har mestret tall. Det bildebaserte formatet gjor også hvert puslespill universelt forståelig uansett språk, da ingen tekst vises innenfor selve rutenettet. Denne visuelle designen er den viktigste forskjellen som åpner verdensmarkeder for dine utskriftsbare produkter.',
      },
      {
        title: 'Tre vanskelighetsgrader: Lett, Middels og Vanskelig',
        description:
          'Kontroller puslespillkompleksiteten med tre distinkte vanskelighetsinnstillinger. Lett fjerner 4 celler fra 16-cellersrutenettet og etterlater 12 ledetråder — brukerne loser en celle om gangen med enkel rad-og-kolonne-eliminering. Middels fjerner 6 celler, noe som krever at brukerne vurderer flere begrensninger samtidig. Vanskelig fjerner 8 celler — noyaktig halvparten av rutenettet — og krever flertrinns logisk resonnement for å fullføre. Systemet bestemmer tilfeldig hvilke celler som blir tomme, slik at å regenerere den samme vanskelighetsgraden produserer en annerledes puslespillkonfigurasjon hver gang.',
      },
      {
        title: 'Temabasert og manuelt bildevalg for noyaktig 4 bilder',
        description:
          'To bildevalgsmetoder sikrer kreativ fleksibilitet. Temabasert valg lar deg velge ethvert tema fra dropdownen, og systemet velger automatisk 4 tilfeldige bilder fra den samlingen — perfekt for rask puslespillgenerering. Manuelt valg åpner hele Bildebiblioteket der du blar gjennom 104 tematiske samlinger, filtrerer etter tema eller soker med nokkelord for å håndplukke noyaktig 4 bilder. Du kan også laste opp egne bilder. Appen håndhever 4-bildekravet: du kan ikke generere et puslespill med faerre eller flere enn 4 unike bilder, fordi hvert 4×4 sudokurutenett bruker noyaktig 4 distinkte symboler.',
      },
      {
        title: 'Premiumrutenettdesign med alternerende blokkfarger og flerlagede skygger',
        description:
          'Sudokurutenettet har et polert design som lofter de utskriftsbare produktene dine over grunnleggende puslespillgeneratorer. Alternerende 2×2-blokker bruker lyseblå (#F8F9FC) og lyserosa (#FFF5F7) bakgrunner for å hjelpe brukerne visuelt identifisere blokkgrenser. Fete midtadskillere (#7C8DB5, 3px strek) separerer de fire kvadrantene, mens lettere indre linjer (#D1D9E6, 1,5px) definerer individuelle celler. En indigoblå ytre ramme (#667EEA) med 18px avrundede hjorner rammer inn hele rutenettet, og tre flerlagede skygger legger til dybde. Bilder vises med 65 % av cellestorrelsen for tydelig visuell separasjon.',
      },
      {
        title: 'Automatisk generert fasit med komplett utfylt rutenett',
        description:
          'Hvert sudokupuslespill genererer automatisk en ledsagende fasit på en separat lerretfane. Fasiten viser det komplette 4×4-rutenettet med alle 16 celler utfylt — hver tom celle fra arbeidsarket er utfylt med det korrekte bildet. Ingen manuell losning, ingen separat filoppretting — fasiten er alltid synkronisert med puslespillet. Denne dobbeltlerret-tilnaermingen sparer betydelig produksjonstid for selgere som lager sudokupakker der hvert puslespill trenger sin egen losningsside. Last ned fasiten som sudoku_answer_key.jpeg eller sudoku_answer_key.pdf ved siden av arbeidsarket.',
      },
      {
        title: 'Bildebibliotek med 104 tematiske samlinger og mer enn 3 100 illustrasjoner',
        description:
          'Bla gjennom 104 tematiske bildesamlinger som dekker dyr, mat, kjoretoy, natur, yrker, hoytider, sport, årstider og dusinvis flere. Hvert tema gir et koordinert sett fargerike illustrasjoner som generator visuelt sammenhengende sudokupuslespill. Filtrer etter tema med dropdownen eller sok etter spesifikke bilder med nokkelord. Klikk på ethvert bilde for å legge det til på puslespillet ditt. Kommersiell Pakke inkluderer 10 fargerike temaer for å komme i gang; Full Tilgang låser opp alle 104 temaer for maksimal kreativ variasjon over alle sudokuproduktene dine.',
      },
      {
        title: 'Trykkeklar PDF- og JPEG-eksport med 300 DPI og gråtonebryter',
        description:
          'Last ned sudoku arbeidsark og fasit som hoyopploste JPEG-bilder eller trykkeklare PDF-dokumenter rendret med 300 DPI (6x lerret-multiplikator). Fire dedikerte nedlastingsknapper eksporterer sudoku_worksheet.jpeg, sudoku_worksheet.pdf, sudoku_answer_key.jpeg og sudoku_answer_key.pdf separat. Sidestorrelser inkluderer Letter Stående, Letter Liggende, A4 Stående, A4 Liggende og helt egendefinerte dimensjoner. Slå gråtone til for blekkbesparende versjoner som sparer toner mens bildetydeligheten bevares. Hver eksport er produksjonsklar for digitale nedlastinger, trykte arbeidboker og produktlinjeutdeling.',
      },
      {
        title: 'Full lerredsredigering med tekstverktoy og 50-trinns angrehistorikk',
        description:
          'Fabric.js-lerretet gir komplett kontroll over hvert element på sudoku arbeidsarket ditt. Dra, endre storrelse, roter og flytt bilder, tekst og generert innhold fritt. Lagkontroller håndterer stablingsrekkefolge — flytt elementer fremover eller send dem bakover. Legg til egendefinert tekst med syv skrifttypemuligheter (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), justerbar storrelse og farge, og tekstkonturbredde fra 0 til 10 med 0,5-trinns granularitet. Zoom fra 25 % til 300 % i 25 %-trinn for detaljarbeid. Angre og gjor om opptil 50 historikktrinn med Ctrl+Z og Ctrl+Y — mer enn dobbelt den typiske angredybden for trygg eksperimentering.',
      },
    ],
  },

  businessUseCases: {
    title: 'Slik Selger du Bildesudoku Arbeidsark på Nett',
    cases: [
      {
        title: 'Tematiske bildesudoku-pakker på Etsy',
        description:
          'Lag tematiske sudokupuslespill-pakker med de 104 bildesamlingene — dyresudoku, matsudoku, kjoretoysudoku, havsudoku og dusinvis flere. Hvert tema gir tilstrekkelig med illustrasjoner til å generere flere unike puslespill med forskjellige bildekombinasjoner og cellekonfigurasjoner. Pakk 15–30 sudokupuslespill per tema med fasit inkludert, og selg til 25–60 kr per pakke. Bland vanskelighetsgrader innenfor hver pakke: begynn med Lett-puslespill for oppvarming og avanser til Vanskelig for en komplett logikkutfordringssamling. Den automatisk genererte fasiten eliminerer den storste tidstyven i puslespillproduksjon.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Tidlige logikkarbeidboker på Amazon KDP',
        description:
          'Sett sammen 50–100 bildesudoku-puslespill til en trykt arbeidsbok formatert for Amazon KDP. Strukturer boken etter progressiv vanskelighetsgrad: Kapittel 1 bruker Lett-puslespill (4 tomme) for nybegynnere som laerer rad-og-kolonne-logikk, Kapittel 2 oker til Middels (6 tomme), og Kapittel 3 utfordrer med Vanskelig (8 tomme). Bruk forskjellige temaer per kapittel eller bland temaer hele veien for visuell variasjon. Inkluder fasit i slutten av boken. Gråtonebryteren produserer blekkbesparende sider klare for svart-hvite innersider, og det visuelle formatet betyr at arbeidsboken din appellerer til kjopere over hele verden uten oversettelseskostnader.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Produktlinjelogikk og resonnementsaktiviteter til Gumroad',
        description:
          'Bygg ferdige logikkresonnements arbeidsark med trykte fasiter for produktlinjebruk. Kjopere som soker på Gumroad etter kritisk tenkning-aktiviteter setter pris på bildesudoku fordi det utvikler logisk deduksjon i et format tilgjengelig for tidlige brukere. Lag produktkatalogtilpassede sett organisert etter tema: bondegårdsdyr logikkpuslespill, matgrupper resonnementsaktiviteter, samfunnshjelper problemlosningsark. Hvert sett inkluderer arbeidsark på flere vanskelighetsgrader og laererfasit i både PDF- og JPEG-format.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Sesongbaserte og hoytidssudoku puslespillsamlinger',
        description:
          'De 104 tematiske bildesamlingene dekker enhver sesong- og hoytidsanledning — jul, halloween, påske, valentinsdag, skolestart, sommerferie og flere. Lag tidsbegrensede sudoku puslespillsamlinger som faller sammen med toppinnkjopsperioder. Utgi halloween-sudokupakker i september, julesamlinger i oktober og valentinsdag-pakker i januar. Inkluder alle tre vanskelighetsgradene i hvert sesongsett for maksimal verdi. Sesongprodukter motiverer hoyere priser under toppvinduene sine og generator naturlige grunner til gjenkjop hele året.',
        platform: 'Etsy / Amazon KDP / Gumroad (sesongbasert)',
      },
      {
        title: 'Global markedsappell med visuelle puslespill',
        description:
          'Bildesudoku er helt visuelt — ingen ord, bokstaver eller tall vises innenfor puslespillrutenettet. Dette betyr at hvert arbeidsark du lager fungerer identisk for kjopere i alle land og på alle språk. En enkelt sudokupakke betjener ethvert marked uten modifikasjon. List det samme produktet på flere Etsy-butikker eller regionale Amazon KDP-markedsplasser uten å lage separate språkversjoner. Denne visuelle fordelen oker dramatisk ditt adresserbare marked mens produksjonsinnsatsen forblir konstant.',
        platform: 'Globale markedsplasser (alle plattformer)',
      },
    ],
  },

  faq: [
    {
      question: 'Hvordan fungerer et 4×4 bildesudoku-puslespill?',
      answer:
        'Et 4×4 bildesudoku bruker et rutenett med 16 celler arrangert i 4 rader og 4 kolonner. Fire unike bilder erstatter tradisjonelle tall. Regelen er den samme som klassisk sudoku: hvert bilde skal vises noyaktig en gang i hver rad og noyaktig en gang i hver kolonne. Noen celler begynner utfylt med bilder (ledetråder), og brukeren fyller ut de tomme cellene ved å bruke logisk eliminering — sjekke hvilket bilde som mangler i hver rad og kolonne for å bestemme korrekt plassering.',
    },
    {
      question: 'Hvorfor bruke bilder i stedet for tall til sudoku?',
      answer:
        'Bilder gjor sudoku tilgjengelig for forlesere og unge brukere som ennå ikke har mestret tall. Det visuelle formatet engasjerer brukerne med fargerike tematiske illustrasjoner, samtidig som det utvikler de samme logiske resonnements ferdighetene som tallbasert sudoku. Bildebaserte puslespill er også universelt forståelige — ingen språk- eller tallsystemkunnskap kreves — noe som gjor produktene dine salgbare globalt uten oversettelse.',
    },
    {
      question: 'Hva kontrollerer de tre vanskelighetsgradene?',
      answer:
        'Vanskelighetsgrad bestemmer hvor mange celler som etterlates tomme for brukeren å lose. Lett fjerner 4 celler fra 16-cellersrutenettet og etterlater 12 ledetråder for enkel losning. Middels fjerner 6 celler, noe som krever mer omhyggelig logisk deduksjon. Vanskelig fjerner 8 celler — noyaktig halvparten av rutenettet — og krever flertrinns resonnement. Systemet velger tilfeldig hvilke celler som blir tomme, slik at å regenerere den samme vanskelighetsgraden generator et annerledes puslespilllayout hver gang.',
    },
    {
      question: 'Hvorfor krever generatoren noyaktig 4 bilder?',
      answer:
        'Et 4×4 sudokurutenett bruker noyaktig 4 unike symboler — hver forekommer 4 ganger over de 16 cellene. Å velge faerre enn 4 bilder ville etterlate rutenettet ufullstendig, og å velge flere enn 4 ville bryte sudoku-begrensningen om at hvert symbol vises noyaktig en gang per rad og kolonne. Appen håndhever dette kravet: temabasert valg velger automatisk 4 tilfeldige bilder, og manuelt valg forhindrer tillegging av et 5. bilde.',
    },
    {
      question: 'Hva er forskjellen mellom temabasert og manuelt bildevalg?',
      answer:
        'Temabasert valg lar deg velge et tema fra dropdownen, og systemet velger automatisk 4 tilfeldige bilder fra den samlingen — ideelt for rask puslespillgenerering. Manuelt valg åpner hele Bildebiblioteket der du blar gjennom 104 tematiske samlinger, filtrerer etter tema eller soker med nokkelord for å håndplukke noyaktig 4 spesifikke bilder. Du kan også laste opp egne bilder. Begge metodene resulterer i noyaktig 4 bilder brukt i puslespillet.',
    },
    {
      question: 'Hvordan fungerer fasiten for bildesudoku?',
      answer:
        'Generatoren bruker et dobbeltlerretssystem med en Arbeidsarkfane og en Fasitfane. Arbeidsarket viser 4×4-rutenettet med tomme celler der brukerne skal bestemme de korrekte bildene. Fasiten viser noyaktig det samme rutenettet, men med alle 16 celler utfylt — hver tom celle er utfylt med det riktige bildet. Begge versjonene eksporteres separat med fire dedikerte knapper: sudoku_worksheet.jpeg, sudoku_worksheet.pdf, sudoku_answer_key.jpeg og sudoku_answer_key.pdf.',
    },
    {
      question: 'Hva gjor rutenettdesignet premium?',
      answer:
        'Sudokurutenettet har alternerende 2×2-blokkbakgrunner i lyseblått (#F8F9FC) og lyserosa (#FFF5F7) som hjelper brukerne identifisere blokkgrenser. Fete midtadskillere (#7C8DB5, 3px strek) separerer de fire kvadrantene, mens lettere indre linjer (#D1D9E6, 1,5px) definerer individuelle celler. En indigoblå ytre ramme (#667EEA) med 18px avrundede hjorner rammer inn hele rutenettet, og tre flerlagede skygger ved varierende forskyvninger legger til profesjonell dybde. Bilder vises med 65 % av cellestorrelsen for tydelig visuell separasjon.',
    },
    {
      question: 'Er puslespillene unike hver gang jeg genererer et?',
      answer:
        'Ja. Appen blander bilder tilfeldig for den fyller ut 4×4-rutenettet, og velger deretter tilfeldig hvilke celler som skal vaere tomme basert på vanskelighetsgraden. Selv med de samme 4 bildene og den samme vanskelighetsinnstillingen produserer regenerering et annerledes gyldig sudokuarrangement med forskjellige tomme celleposisjoner. Denne randomiseringen lar deg lage store samlinger av unike puslespill fra et lite sett tematiske bilder.',
    },
    {
      question: 'Finnes det en gratis proveversjon?',
      answer:
        'Ja. Du kan bruke alle funksjoner — alle tre vanskelighetsgradene, temabasert og manuelt bildevalg, den automatisk genererte fasiten, hele bildebiblioteket, bakgrunns- og rammetemaer, tekstverktoy og alle nedlastingsformater — uten å opprette en konto, oppgi kredittkort eller installere programvare. Nedlastinger fra den gratis proveversjonen inneholder et lite vannmerke. En kommersiell lisens fjerner vannmerket og gir fulle salgsrettigheter.',
    },
    {
      question: 'Er bildesudoku arbeidsark språkavhengige?',
      answer:
        'Nei. Bildesudoku er helt visuelt — puslespillrutenettet inneholder kun bilder, ingen ord eller tall. Dette gjor at hvert arbeidsark fungerer identisk på alle 11 stoettede språk. Det eneste lokaliserte elementet er den automatisk genererte «Bildesudoku»-overskriftsteksten over rutenettet, som oversettes automatisk når du bytter språk. Puslespillet i seg selv krever null modifikasjon for forskjellige markeder, noe som gjor det ideelt for globalt salg.',
    },
    {
      question: 'Kan jeg selge bildesudoku arbeidsark laget med dette verktøyet på Etsy og Amazon KDP?',
      answer:
        'Ja. Med en kommersiell lisens har du fulle rettigheter til å selge bildesudoku arbeidsarkene dine som digitale nedlastinger på Etsy, som trykte arbeidboker på Amazon KDP, som produktlinjeressurser på Gumroad, eller via enhver annen salgskanal. De tre vanskelighetsgradene, 104 tematiske bildesamlinger og det visuelle formatet gir deg de kreative verktoyene til å produsere originale, globalt salgbare sudokuprodukter.',
    },
    {
      question: 'Hva er returpolicyen?',
      answer:
        'Fordi den gratis proveversjonen gir deg tilgang til alle funksjoner, tilbyr vi ingen refusjoner på kjop av kommersielle lisenser. Du kan teste alle tre vanskelighetsgradene, temabasert og manuelt bildevalg, den automatisk genererte fasiten, hele bildebiblioteket, bakgrunns- og rammetemaer, tekstverktoy og alle nedlastingsformater for du kjoper. Den gratis proveversjonen er returpolicyen — sorg for at verktøyet passer til behovene dine for du anskaffer en lisens.',
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
      slug: 'finn-den-ulike-arbeidsark',
      anchorText: 'Finn den Ulike Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'bildesti-arbeidsark',
      anchorText: 'Bildesti Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'mattepuslespill-arbeidsark',
      anchorText: 'Mattepuslespill Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'monster-arbeidsark',
      anchorText: 'Monster Arbeidsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'puslespill-logikk-pakke',
      anchorText: 'Puslespill og Logikk Pakke — Alle Puslespillapper i En',
    },
    {
      pageType: 'guide',
      slug: 'sudoku-boeker-kdp',
      anchorText: 'Slik Lager og Selger du Sudokuboker på Amazon KDP',
    },
    {
      pageType: 'guide',
      slug: 'lag-bildesudoku',
      anchorText: 'Slik Lager du Bildesudoku for Barn',
    },
    {
      pageType: 'idea',
      slug: 'mattegrunnlag-utskriftsbare-ideer',
      anchorText: 'Logikkpuslespill utskriftsbare ideer for arbeidsark',
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
      primary: '/samples/norwegian/sudoku/Bilde-Sudoku%201.webp',
      primaryAlt: '4×4 bildesudoku arbeidsark med tematiske bilder i et premiumrutenett med alternerende blokkfarger og automatisk generert Bildesudoku-overskrift',
    },
    sampleGallery: [
      {
        src: '/samples/norwegian/sudoku/Bilde-Sudoku%201.webp',
        alt: 'Lett vanskelighetsgrad bildesudoku med 4 tomme celler og 12 utfylte celler i et 4×4-rutenett',
        caption: 'Lett vanskelighetsgrad — 4 tomme celler for nybegynnere som laerer rad-og-kolonne-logikk',
      },
      {
        src: '/samples/norwegian/sudoku/Bilde-Sudoku%202.webp',
        alt: 'Bildesudoku med et annet tema og middels vanskelighetsgrad',
        caption: 'Tematisk bildesudoku — 104 temaer gir unike puslespillopplevelser for hvert sett',
      },
      {
        src: '/samples/norwegian/sudoku/Bilde-Sudoku%203.webp',
        alt: 'Bildesudoku fasit som viser komplett utfylt 4×4-rutenett med alle 16 celler utfylt',
        caption: 'Automatisk generert fasit — komplett utfylt rutenett med alle bilder plassert',
      },
    ],
    youtubeId: 'bqVioFbkYbA',
    videoTitle: 'Slik Lager du 4×4 Bildesudoku Arbeidsark med Tre Vanskelighetsgrader — Trinn-for-Trinn Guide',
  },
};

export default content;
