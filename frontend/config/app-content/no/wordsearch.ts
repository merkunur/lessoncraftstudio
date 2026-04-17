import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'ordleting generator',
    secondaryKeywords: ['lage ordleting', 'ordleting skrive ut', 'ordsøk generator', 'ordleting med bilder'],
    lsiKeywords: ['rutenett', 'bokstaver', 'ordforråd', 'staving', 'tema', 'fasit', 'PDF', 'barneskole'],
    titleTag: 'Ordleting generator | Lag med temabilder',
    metaDescription: 'Lag ordleting med 3 000+ temabilder på 11 språk. Egne ord, automatisk fasit, 300 DPI PDF. Prøv gratis — kommersiell lisens.',
  },

  hero: {
    title: 'Ordleting generator — Lag ordleting med temabilder og fasit',
    tagline: 'Justerbare rutenett fra 5×5 til 30×30 med diagonal- og baklengs retningskontroller — bygg den perfekte vanskelighetsgraden til enhver målgruppe.',
    description:
      'Design profesjonelle ordsøk-arbeidsark der skjulte ord er innebygd i et rutenett av tilfeldige fyllbokstaver, og brukerne skanner rader, kolonner og diagonaler for å finne dem — det klassiske puslespillformatet som aldri går av moten. Velg mellom tre innholdskilder: det innebygde bildebiblioteket med mer enn 3 100 illustrasjoner i 104 temaer, Manuell Redigeringsmodus der du velger bilder og deretter tilpasser visningsnavnene, eller Egen Ordliste for tekstbaserte puslespill med opptil 8 egne ord. Juster rutenettet fra 5×5 for raske oppvarminger til 30×30 for ekte utfordringer, og slå diagonale ord samt baklengs ord til eller fra for å finjustere vanskeligheten over fire til åtte mulige plasseringsretninger. Tre visningsmoduser — ord pluss bilder, kun bilder eller kun ord — styrer hvordan ledetrådene vises ved siden av rutenettet. Full Tilgang låser opp alle 11 støttede språk, der både de skjulte ordene og rutenettets fyllbokstaver endres etter språk: norske rutenett inkluderer æ, ø, å ved naturlige frekvensvekter, tyske rutenett inkluderer ä, ö, ü, og hvert annet språk bruker sitt autentiske tegnsett. En fargekodet fasit markerer hvert funnet ord i en av seks roterende farger for øyeblikkelig visuell verifisering. Eksporter trykkeklare PDF-er og JPEG-bilder med mer enn 400 DPI i Letter-, A4- eller egendefinert format. Enten du selger tematiske puslespillpakker på Etsy, setter sammen ordsøkbøker til Amazon KDP eller lager nivåinndelte ordforrådsstasjoner til Gumroad — Ordsøk Arbeidsark Generatoren leverer profesjonelle resultater på få minutter. Gratis prøveversjon med alle funksjoner — ingen registrering, intet kredittkort. Nedlastinger inneholder et vannmerke; kjøp en lisens for å fjerne det.',
  },

  ctaHeading: 'Lag ordjakt',

  howItWorks: {
    title: 'Slik Lager du Ordsøk-Arbeidsark i 5 Trinn',
    steps: [
      {
        title: 'Still inn sidelayouten',
        description:
          'Åpne panelet Sideoppsett og velg et format: Letter Stående, Letter Liggende, A4 Stående, A4 Liggende eller en egendefinert størrelse. Velg en bakgrunnsfarge, velg et dekorativt bakgrunnstema fra bildebiblioteket og juster gjennomsiktigheten slik at rutenettet forblir lesbart. Legg til en matchende dekorativ ramme med uavhengig gjennomsiktighetskontroll. Disse layoutvalgene gir ordsøk-arbeidsarkene dine et polert, merkevarebasert utseende allerede før du legger til et eneste ord. Hvis du selger på Etsy eller Amazon KDP, lag både Letter-versjoner for nordamerikanske kjøpere og A4-versjoner for europeiske kunder for å doble markedsrekkevidden med minimalt ekstra arbeid.',
      },
      {
        title: 'Velg innholdskilden din',
        description:
          'Åpne panelet Innhold og velg en av tre kilder. Bildebibliotekmodusen lar deg bla gjennom 104 temaer og velge bilder — hvert bildenavn blir et skjult ord i rutenettet. Bruk knappen Tilfeldig Tema for automatisk å velge et overraskelsestema for rask variasjon. Manuell Redigeringsmodus lar deg velge bilder fra biblioteket og deretter redigere visningsnavnene deres før du genererer, perfekt for forenklet ordforråd eller fonikkfokuserte ord. Egen Ordliste hopper over bilder helt og lar deg skrive opptil 8 egne ord direkte, ideelt for ukens stavingslister, emnespesifikke termer eller fremmedspråkøvelser.',
      },
      {
        title: 'Konfigurer rutenettstørrelse og ordretninger',
        description:
          'Still inn rutenettets dimensjoner ved å justere rader og kolonner uavhengig av hverandre fra 5 til 30 (standard 12×12). Små rutenett som 5×5 eller 6×6 fungerer godt for nybegynnere; store rutenett som 20×20 eller 30×30 generator seriøse utfordringer. Slå deretter diagonale ord til eller fra og baklengs ord til eller fra. Med begge aktivert kan ord plasseres i åtte retninger — horisontalt, vertikalt, diagonalt og deres reverseringer. Å deaktivere diagonaler begrenser plasseringen til kun horisontalt og vertikalt, noe som generator enklere puslespill for yngre eller mindre erfarne løsere. Dette kontrollnivået lar deg lage progressive vanskelighetspakker fra enkle toretnings-rutenett til komplekse åtteretnings-puslespill.',
      },
      {
        title: 'Still inn visningsmodus og legg til egendefinerte detaljer',
        description:
          'Velg mellom tre ord/bildevisningsmoduser: Vis Ord og Bilder (standard), Vis Kun Bilder eller Vis Kun Ord. Hver modus styrer hva som vises ved siden av rutenettet som ledetråder. Bruk panelet Tekstverktøy til å legge til en arbeidsarktittel, felter for navn og dato, instruksjoner eller annen egendefinert tekst. Velg mellom syv skrifttyper, inkludert Lexend Deca, Baloo 2, Fredoka og Quicksand. Juster skriftstørrelse, farge og kontur for maksimal lesbarhet. Bruk det innebygde Fabric.js-lerretet til å dra, endre størrelse og flytte hvert element etter behov.',
      },
      {
        title: 'Generer den fargekodede fasiten og last ned',
        description:
          'Gå til fanen Fasit og klikk på Generer Fasit for å lage en løst versjon der hvert skjult ord markeres i en av seks roterende farger — rosa, blå, grønn, gull, korall og lavendel — slik at hvert ord ses tydelig. Aktiver gråtoneeksport for blekkbesparende versjoner. Åpne deretter nedlastingsmenyen og eksporter både arbeidsarket og fasiten som høyoppløst JPEG eller trykkeklar PDF. Hver eksport rendres med mer enn 400 DPI, noe som sikrer perfekt skarphet uansett om du skriver ut hjemme, laster opp på Etsy eller inkluderer i en Amazon KDP-ordpuslespillbok.',
      },
    ],
  },

  keyFeatures: {
    title: 'Nøkkelfunksjoner i Ordsøk Arbeidsark Generatoren',
    features: [
      {
        title: 'Skjulte-ord rutenettpuslespill med bildeledetråder',
        description:
          'Hvert puslespill bygger inn skjulte ord i et rutenett av tilfeldige fyllbokstaver. Brukerne skanner rader, kolonner og diagonaler for å finne dem — det klassiske ordsøkformatet som engasjerer visuell skanning, mønstergjenkjenning og ordforrådsgjenkalling samtidig. Når du bruker Bildebibliotek eller Manuell Redigeringsmodus, vises bilder ved siden av rutenettet som visuelle ledetråder, noe som kobler bildegjenkjenning og ordidentifikasjon sammen. Egen Ordliste-modusen generator rendyrkede tekstbaserte ordsøk-puslespill uten bilder, noe som utvider formatet til ethvert emne eller ordforrådsett.',
      },
      {
        title: 'Tilpassbar rutenettstørrelse fra 5×5 til 30×30',
        description:
          'Juster rader og kolonner uavhengig av hverandre fra 5 til 30, noe som generator rutenett så kompakte som 5×5 (25 celler) eller så ekspansive som 30×30 (900 celler). Små rutenett gir raske, tilgjengelige puslespill ideelle for yngre brukere eller oppvarmingsaktiviteter. Store rutenett generator tette, utfordrende søkeøvelser som holder erfarne løsere engasjert lenger. Standardrutenettet 12×12 balanserer vanskelighetsgrad og sideplass for de fleste målgrupper. Denne spennvidden lar deg lage progressive vanskelighetspakker — fra små startrutenett til massive ekspertnivå-utfordringer — alt fra det samme verktøyet.',
      },
      {
        title: 'Ordretningskontroller: diagonal- og baklengsbrytere',
        description:
          'To uavhengige brytere styrer hvor ord kan plasseres i rutenettet. Aktiver diagonale ord for å tillate plassering langs begge diagonalaksene i tillegg til horisontalt og vertikalt. Aktiver baklengs ord for å tillate baklengs plassering i enhver aktivert retning. Med begge aktivert kan ord vises i åtte mulige retninger; med begge deaktivert vises ord kun venstre-til-høyre horisontalt og ovenfra-og-ned vertikalt. Disse kontrollene generator en enorm vanskelighetsbredde fra enkle toretnings-rutenett til komplekse åtteretnings-puslespill, noe som gir deg presis kontroll over utfordringsnivået.',
      },
      {
        title: 'Tre innholdskilder: Bildebibliotek, Manuell Redigering og Egen Ordliste',
        description:
          'Bildebibliotekmodusen henter ord fra tematiske bildesamlinger — velg dyr, kjøretøy eller matbilder, og det skjulte ordet er bildenavnet. Manuell Redigeringsmodus legger til et tilpasningslag: velg bilder fra biblioteket og rediger deretter visningsnavnene deres før du genererer, perfekt for forenklet ordforråd eller fonikkfokuserte ord. Egen Ordliste dropper bilder helt og lar deg skrive opptil 8 egne ord direkte, noe som muliggjør ordsøk-arbeidsark til ethvert emne, staveprøver eller ordlister uten matchende illustrasjoner.',
      },
      {
        title: 'Språkbevisst alfabetfylling med språkspesifikke tegn',
        description:
          'Rutenettets fylltegn matcher automatisk det valgte språkets alfabet og tegnfrekvens. Norske rutenett inkluderer æ, ø og å ved vektede frekvenser som matcher naturlig norsk tekst. Tyske rutenett inkluderer ä, ö, ü og ß. Franske rutenett inkluderer é, è, ç og à. Hvert støttet språk får autentiske fylltegn, noe som gjør puslespillene lingvistisk ekte fremfor åpenbart engelskgenererte. Denne funksjonen er unik for Ordsøk — den påvirker ikke kun de skjulte ordene, men hele rutenettbakgrunnen, noe som generator en helt annerledes løseropplevelse per språk.',
      },
      {
        title: 'Fargekodet fasit med 6 markeringsfarger',
        description:
          'Fasiten markerer hvert funnet ord i en av seks roterende farger: rosa, blå, grønn, gull, korall og lavendel. Hvert ord får en distinkt farge for øyeblikkelig visuell identifikasjon, noe som gjør det enkelt for brukere å selvkontrollere eller for selgere å rette raskt. Det fargekodede formatet er visuelt engasjerende og profesjonelt — et tydelig steg opp sammenlignet med enkle ring-om-ordet-fasiter. Aktiver gråtoneeksport når du trenger blekkbesparende versjoner for svart-hvitt utskrift.',
      },
      {
        title: 'Trykkeklar PDF- og JPEG-eksport med høy DPI',
        description:
          'Last ned arbeidsark og fasit som høyoppløste JPEG-bilder eller trykkeklare PDF-dokumenter. Eksportmotoren rendrer med en 6x-multiplikator, noe som produserer resultater over 400 DPI i standardformat. Letter Stående, Letter Liggende, A4 Stående, A4 Liggende og egendefinerte størrelser støttes alle. Aktiver gråtoneeksport for blekkbesparende versjoner, ideelle for masseutskrift eller svart-hvite puslespillbøker. Hver eksport er produksjonsklar for Etsy-oppføringer, Amazon KDP-innersider og Gumroad-produktfiler.',
      },
      {
        title: 'Full lerredsredigering med tekst- og bildeverktøy',
        description:
          'Det innebygde Fabric.js-lerretet lar deg dra, endre størrelse, rotere og flytte hvert element på siden — tekst, puslespillrutenett, bilder, rammer og bakgrunner. Legg til egendefinert tekst med syv skrifttyper, sett inn dekorative elementer og bruk lagkontroller for presis stablingsrekkefølge. Justeringsverktøy snapper elementer på plass, og lås/lås opp beskytter ferdige elementer mens du redigerer andre. Ubegrenset angre og gjør om lar deg eksperimentere fritt, noe som gir deg layoutfleksibiliteten fra et grafisk designverktøy inne i en ordsøkgenerator.',
      },
    ],
  },

  businessUseCases: {
    title: 'Slik Selger du Ordsøk-Arbeidsark på Nett',
    cases: [
      {
        title: 'Tematiske ordsøkpakker på Etsy',
        description:
          'Lag sett med 10–20 ordsøk-arbeidsark gruppert etter tema og vanskelighetsgrad — bondegårdsdyr i et lite 8×8-rutenett uten diagonaler, havdyr i et 15×15-rutenett med diagonaler aktivert, dinosaurer i et 20×20-rutenett med baklengs ord slått på — og list dem som direktenedlastingspakker på Etsy. Inkluder fargekodede fasiter som bonusfiler. Det visuelle rutenettformatet med bildeledetråder skiller seg ut fra enkle ordlister i Etsys søkeresultater. Prissett enkle temapakker til 25–40 kr og multipakker med progressiv vanskelighetsgrad til 100–150 kr.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Ordsøkbøker på Amazon KDP',
        description:
          'Sett sammen 50–100 ordsøk-puslespill til en trykt puslespillbok formatert for Amazon KDP. Bruk progressive rutenettstørrelser som vanskelighetskurve: begynn med 6×6 kun-horisontale rutenett, avansér gjennom 12×12-rutenett med diagonaler og avslutt med 25×25-rutenett med baklengs ord aktivert. Grupper kapitler etter tema (dyr, mat, kjøretøy, natur) for blavennlig variasjon. Legg til en tittelside, vanskelighetsguide og fasitseksjon med fargekodede markeringer bakerst. Ordsøkbøker selger konsekvent året rundt med minimal markedsføring på Amazon.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Nivåinndelte ordforrådsstasjoner til Gumroad',
        description:
          'Bygg nivåinndelte ordsøk-øvingssett som bruker rutenettstørrelse og retningskontroller som differensieringsakse: Nivå 1 (8×8, kun horisontalt, 4 ord), Nivå 2 (12×12, horisontalt og vertikalt, 6 ord), Nivå 3 (16×16, diagonaler aktivert, 8 ord) og Nivå 4 (20×20, diagonaler og baklengs, 8 ord). Pakk hvert nivå med fargekodede fasiter og et fremgangsark. Gumroad-kjøpere betaler premiumpriser for nivåinndelte ordforrådsressurser de kan bruke direkte på tvers av flere evnenivåer.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Flerspråklige ordsøkprodukter med Full Tilgang',
        description:
          'Full Tilgang låser opp alle 11 språk, og fordi Ordsøk er språkavhengig, endres både de skjulte ordene og rutenettets fyllbokstaver etter språk. «Dog» på engelsk blir «Hund» i et rutenett fylt med tyske tegn inkl. ä, ö, ü; «chien» på fransk vises i et rutenett med é, è, ç, à. Norske rutenett inkluderer æ, ø og å ved naturlige frekvenser. Hver språkversjon er et genuint annerledes produkt med forskjellige ord, forskjellige fylltegn og en annerledes løseropplevelse. Lag identiske temaserier på flere språk og list hver som et separat Etsy-produkt eller KDP-bok — elleve inntektsstrømmer fra et enkelt arbeidsflyt.',
        platform: 'Etsy / Amazon KDP / Gumroad (flerspråklig)',
      },
      {
        title: 'Produktlinje- og privatundervisning i ordforrådsøving',
        description:
          'Bruk Egen Ordliste-modusen til å lage ordsøk-arbeidsark for enhver ordliste — ukens staveord, naturvitenskapelige termer, samfunnsfagsordforråd eller fremmedspråkøving. Skriv opptil 8 ord direkte uten å trenge matchende bilder. Juster rutenettstørrelse og retningsbrytere for å matche hver brukers evne: små kun-horisontale rutenett for brukere som trenger støtte, store diagonal-og-baklengs-rutenett for avanserte brukere. Skriv ut tilpassede sett på minutter for små grupper eller hele klasser. Den fargekodede fasiten sparer opplevd verdi, og det klassiske ordsøkformatet holder brukerne engasjert.',
        platform: 'Nettbasert / Privatundervisning / Hjemmeundervisning',
      },
    ],
  },

  faq: [
    {
      question: 'Hvordan fungerer ordsøk-puslespillet?',
      answer:
        'Skjulte ord er innebygd i et rutenett av tilfeldige fyllbokstaver. Brukerne skanner rader, kolonner og valgfritt diagonaler for å finne hvert ord. Når et ord er funnet, ringer brukerne rundt det eller markerer det i rutenettet. Fyllbokstavene randomiseres hver gang du genererer, slik at hvert puslespill er unikt, selv med den samme ordlisten. Opptil 8 ord kan plasseres i et enkelt rutenett.',
    },
    {
      question: 'Hvilke rutenettstørrelser er tilgjengelige?',
      answer:
        'Du kan stille inn rader og kolonner uavhengig av hverandre fra 5 til 30. Standard er 12×12. Et 5×5-rutenett generator et raskt, enkelt puslespill med kun 25 celler; et 30×30-rutenett generator et tett, utfordrende søkepuslespill med 900 celler. Å justere rutenettstørrelsen er den primære måten å kontrollere vanskelighetsgraden på sammen med ordretningsinnstillingene.',
    },
    {
      question: 'Hva gjør diagonal- og baklengsbryterne?',
      answer:
        'Diagonalbryteren tillater ord å plasseres langs begge diagonalaksene i tillegg til horisontalt og vertikalt. Baklengsbryteren tillater ord å plasseres baklengs i enhver aktivert retning. Med begge aktivert kan ord vises i åtte mulige retninger. Med begge deaktivert vises ord kun venstre-til-høyre horisontalt og ovenfra-og-ned vertikalt. Disse bryterne lar deg finjustere vanskelighetsgraden fra enkle toretnings-rutenett til komplekse åtteretnings-puslespill.',
    },
    {
      question: 'Hva er de tre innholdskildene?',
      answer:
        'Bildebibliotekmodusen bruker tematiske illustrasjoner der hvert bildenavn blir et skjult ord. Manuell Redigeringsmodus lar deg velge bilder og deretter tilpasse visningsnavnene deres før du genererer — perfekt for alternativt ordforråd eller forenklet staving. Egen Ordliste hopper over bilder helt og lar deg skrive opptil 8 egne ord direkte, noe som muliggjør ordsøk-arbeidsark til ethvert emne uten matchende illustrasjoner.',
    },
    {
      question: 'Hva er de tre visningsmodusene?',
      answer:
        'Vis Ord og Bilder (standard) viser både bildeledetråder og ordlister ved siden av rutenettet. Vis Kun Bilder viser bildeledetråder uten tekstlister, noe som krever at brukerne identifiserer bildet og finner ordet selv. Vis Kun Ord viser tekstlister uten bilder, noe som generator en rendyrket tekstbasert ordsøkopplevelse. Hver modus styrer hva som vises som ledetrådreferanser ved siden av rutenettet.',
    },
    {
      question: 'Hvordan fungerer den språkbevisste alfabetfyllingen?',
      answer:
        'Når du velger et språk, bytter rutenettets fylltegn automatisk til det aktuelle språkets alfabet med vektede frekvensfordelinger. Norske rutenett inkluderer æ, ø og å. Tyske rutenett inkluderer ä, ö, ü og ß. Franske rutenett inkluderer é, è, ç, à og andre aksentuerte tegn. Dette gjør puslespillene lingvistisk autentiske — fyllbokstavene ser naturlige ut fremfor åpenbart engelskgenererte.',
    },
    {
      question: 'Hvordan fungerer den fargekodede fasiten?',
      answer:
        'Fasiten markerer hvert funnet ord i en av seks roterende farger: rosa, blå, grønn, gull, korall og lavendel. Hvert ord får en distinkt farge slik at de ses tydelig, selv når ord krysser eller overlapper hverandre i rutenettet. Du kan aktivere gråtoneeksport for blekkbesparende fasitversjoner. Fasiten genereres som en separat nedlastbar fil.',
    },
    {
      question: 'Hva er det maksimale antall ord per puslespill?',
      answer:
        'Du kan plassere opptil 8 ord eller bilder i et enkelt ordsøk-rutenett. Denne grensen sikrer at ordene passer pent i rutenettet uten overdreven overlapping. For større ordantall, lag flere arbeidsark og pakk dem som et sett — dette øker også den opplevde verdien av produktpakkene dine.',
    },
    {
      question: 'Er Ordsøk-generatoren språkavhengig?',
      answer:
        'Ja. Fordi skjulte ord er bildenavn på det valgte språket, endrer et språkbytte hele puslespillinnholdet. I tillegg endres rutenettets fyllbokstaver for å matche målspråkets tegnsett med korrekte frekvensvekter. Kommersiell Pakke er kun engelsk; Full Tilgang låser opp alle 11 språk, noe som gjør hver språkversjon til et distinkt produkt med forskjellige ord og forskjellige fylltegn.',
    },
    {
      question: 'Finnes det en gratis prøveversjon?',
      answer:
        'Ja. Du kan bruke alle funksjoner — alle tre innholdskildene, alle visningsmodusene, hele bildebiblioteket, justerbare rutenettstørrelser, retningskontroller, fargekodede fasiter og alle eksportformater — uten å opprette en konto, oppgi kredittkort eller installere programvare. Nedlastinger fra den gratis prøveversjonen inneholder et lite vannmerke. En kommersiell lisens fjerner vannmerket og gir fulle salgsrettigheter.',
    },
    {
      question: 'Kan jeg selge arbeidsark laget med dette verktøyet på Etsy og Amazon KDP?',
      answer:
        'Ja. Med en kommersiell lisens har du fulle rettigheter til å selge ordsøk-arbeidsarkene dine som digitale nedlastinger på Etsy, som trykte puslespillbøker på Amazon KDP, som pedagogiske ressurser på Gumroad eller via enhver annen salgskanal. De justerbare rutenettstørrelsene, retningskontrollene og den flerspråklige kapasiteten gir deg sterk differensiering i trengte markedsplasskategorier.',
    },
    {
      question: 'Hva er returpolicyen?',
      answer:
        'Fordi den gratis prøveversjonen gir deg tilgang til alle funksjoner, tilbyr vi ingen refusjoner på kjøp av kommersielle lisenser. Du kan teste hver innholdskilde, hver rutenettstørrelse, hver retningsinnstilling, hver visningsmodus, hvert eksportformat og hvert sideformat før du kjøper. Den gratis prøveversjonen er returpolicyen — sørg for at verktøyet passer til behovene dine før du anskaffer en lisens.',
    },
    {
      question: 'Passer oppgavene for småskoletrinnet og mellomtrinnet?',
      answer: 'Ja. Tilpass vanskelighetsgraden for småskoletrinnet (1.–4. trinn) med enklere ord og mellomtrinnet (5.–7. trinn) med mer avansert ordforråd. Generatoren lar deg lage oppgaver for ethvert trinn i barneskolen.',
    },
    {
      question: 'Følger oppgavene LK20 (Kunnskapsløftet 2020)?',
      answer: 'Generatoren er et fleksibelt supplement som ikke er bundet til én bestemt læreplan. Oppgavene støtter kompetansemål i norsk for barneskolen i LK20, der elevene blant annet skal utvikle ordforråd og bokstavgjenkjenning. Tilpass ordvalget og vanskelighetsgraden til de spesifikke kompetansemålene du jobber med.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'alfabet-tog-arbeidsark',
      anchorText: 'Alfabettog Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'preposisjoner-arbeidsark',
      anchorText: 'Preposisjoner Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'gjett-ordet-arbeidsark',
      anchorText: 'Gjett Ordet Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'bokstavoppgaver-arbeidsark',
      anchorText: 'Bokstavblanding Arbeidsark Generator',
    },
    {
      pageType: 'app',
      slug: 'kryptogram-arbeidsark',
      anchorText: 'Kryptogram Arbeidsark Generator',
    },
    {
      pageType: 'bundle',
      slug: 'lesing-spraak-pakke',
      anchorText: 'Lesing og Språk Pakke — Alle Språkapper i Én',
    },
    {
      pageType: 'guide',
      slug: 'selg-ordsoek-etsy',
      anchorText: 'Guide til å Selge Ordsøk-Puslespill på Etsy',
    },
    {
      pageType: 'start',
      slug: 'komplett-guide-utskriftsbar-forretning',
      anchorText: 'Den Komplette Guiden til å Starte en Utskriftsbar Forretning',
    },
    {
      pageType: 'idea',
      slug: 'norsk-som-andrespraak-utskriftsbare-ideer',
      anchorText: 'Norsk som andrespråk utskriftsbare ideer for språkinnlæring',
    },
    {
      pageType: 'idea',
      slug: 'hjemmeundervisning-utskriftsbare-ideer',
      anchorText: 'Hjemmeundervisning utskriftsbare ideer for foreldre og selgere',
    },
    {
      pageType: 'guide',
      slug: 'lag-ordsoek-puslespill',
      anchorText: 'Slik Lager du Ordsøk-Puslespill som Selger',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/norwegian/wordsearch/ordleting-1.webp',
      primaryAlt: 'Ordsøk-arbeidsark med skjulte ord i et bokstavrutenett og bildeledetråder som viser ordforråds puslespill',
    },
    sampleGallery: [
      {
        src: '/samples/norwegian/wordsearch/ordleting-1.webp',
        alt: 'Ordsøk-arbeidsark i stående format med 12×12 bokstavrutenett og tematiske bildeledetråder',
        caption: 'Stående format — 12×12-rutenett med tematiske bildeledetråder og ordliste',
      },
      {
        src: '/samples/norwegian/wordsearch/ordleting-2.webp',
        alt: 'Ordsøk-arbeidsark med større rutenett og diagonale ord aktivert',
        caption: 'Større rutenett — med diagonal- og baklengs ord aktivert for økt utfordring',
      },
      {
        src: '/samples/norwegian/wordsearch/ordleting-3.webp',
        alt: 'Ordsøk fargekodet fasit med seks markeringsfarger som viser funne ord',
        caption: 'Fargekodet fasit — hvert ord markert i en unik farge for enkel verifisering',
      },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: 'Slik Lager du Skjulte-Ord Ordsøk-Arbeidsark — Trinn-for-Trinn Guide',
  },
};

export default content;
