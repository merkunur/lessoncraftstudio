#!/usr/bin/env node
/**
 * SEO Part 263: NO Second-Grade Enrichment — Themes 26-50
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the second-grade grade block of 25 NO theme files (insects through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  insects: {
    snippetAnswer: 'Insekt-oppgaver for 2. klasse (7\u20138 \u00e5r) trener m\u00e5ling i millimeter og centimeter, livssyklusdata i tabeller og s\u00f8ylediagrammer, systematisk klassifisering med bestemmelsesn\u00f8kkel og selvstendig skriving av vitenskapelige observasjonsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse l\u00f8ftes insekttemaet fra enkel observasjon til systematisk vitenskapelig unders\u00f8kelse \u2014 syv- og \u00e5tte\u00e5ringer kan m\u00e5le insektkroppslengder i millimeter, beregne vekst gjennom livssyklusstadier ved hjelp av subtraksjon innenfor 100, og f\u00f8re strukturerte observasjonsdagb\u00f8ker med dato, tid og v\u00e6rforhold. Multiplikasjon som gjentatt addisjon modellerer ekte insektmatematikk: 14 maur med 6 bein gir 84 bein totalt. Klassifiseringsarbeid med bestemmelsesn\u00f8kkel skiller ekte insekter fra edderkopper og andre leddyr ved hjelp av systematiske ja/nei-sp\u00f8rsm\u00e5l. Lesetekster dekker metamorfose, kolonihierarkier og kamuflasjestategier. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, m\u00e5ling og skriftlig rapportering i 2. trinn st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'M\u00e5ling i millimeter og centimeter (7\u20138-\u00e5ringer bruker linjal med presisjon)', howWeAddress: 'Insektm\u00e5lingsark der elevene m\u00e5ler kroppslengder, vingespenn og antenner i mm og cm og registrerer data i tabell' },
      { milestone: 'Systematisk klassifisering med bestemmelsesn\u00f8kkel (dikotomisk sortering)', howWeAddress: 'Bestemmelsesn\u00f8kkel-ark med ja/nei-sp\u00f8rsm\u00e5l om kroppsdeler, bein og vinger som skiller insekter fra andre leddyr' },
      { milestone: 'Vitenskapelig observasjonsdagbok (strukturert datainnsamling over tid)', howWeAddress: 'Observasjonsdagbok-maler med felt for dato, tid, v\u00e6r, art og atferdsbeskrivelse trener systematisk dokumentasjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til fem velkjente insekter, m\u00e5l i hele centimeter og bruk forenklet bestemmelsesn\u00f8kkel med bilder. For avanserte elever i 2. klasse tilf\u00f8yes m\u00e5ling i millimeter med omregning, selvstendig utforming av bestemmelsesn\u00f8kler og utvidet forskningsrapport med hypotese og konklusjon.',
    parentTakeaway: 'Ta med barnet p\u00e5 insektjakt med lupe og sjekkliste: hvilke insekter finner dere under steiner, p\u00e5 blomster, i gresset? M\u00e5l et insekt med linjal og registrer lengden. La barnet tegne insektet og skrive tre fakta. Regn med bein: \u00ab5 maur med 6 bein \u2014 hvor mange bein til sammen?\u00bb Naturen er det st\u00f8rste laboratoriet.',
    classroomIntegration: 'Insekttemaet i 2. klasse integreres i uteundervisning: naturfagstimen gjennomf\u00f8rer insektjakt med bestemmelsesn\u00f8kler, mattetimen analyserer m\u00e5ledata og lager s\u00f8ylediagrammer, norsktimen skriver observasjonsrapporter, og kunsttimen tegner detaljerte insekttegninger. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, data og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'M\u00e5ling av insekter (mm og cm)', emerging: 'm\u00e5ler i hele centimeter med st\u00f8tte fra l\u00e6rer', proficient: 'm\u00e5ler selvstendig i millimeter og centimeter og registrerer data presist i tabell', advanced: 'm\u00e5ler presist, beregner vekstforskjeller og omregner mellom mm og cm' },
      { skill: 'Systematisk klassifisering', emerging: 'sorterer insekter i to grupper etter \u00e9n egenskap med st\u00f8tte', proficient: 'bruker selvstendig bestemmelsesn\u00f8kkel med flere kriterier og forklarer valget', advanced: 'utformer egne bestemmelsesn\u00f8kler og klassifiserer ukjente arter med fagbegreper' },
      { skill: 'Vitenskapelig observasjonsrapport', emerging: 'skriver 2\u20133 observasjoner med st\u00f8tte fra mal', proficient: 'f\u00f8rer selvstendig observasjonsdagbok med dato, art og atferdsbeskrivelse', advanced: 'skriver sammenhengende forskningsrapport med hypotese, data og konklusjon' },
    ],
  },

  jobs: {
    snippetAnswer: 'Yrke-oppgaver for 2. klasse (7\u20138 \u00e5r) trener pengematematikk med l\u00f8nnsberegning, tidsplanlegging av arbeidsdager, lesing av yrkesrelaterte sakprosatekster og selvstendig skriving av yrkesforskningsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r yrketemaet fra enkel identifikasjon til systematisk utforskning av arbeidsliv \u2014 syv- og \u00e5tte\u00e5ringer kan beregne enkel l\u00f8nn (8 timer \u00e0 50 kr.), lage tidsplaner for arbeidsdager med klokkesl\u00e6tt, og lese flerparagrafstekster om hvordan ulike yrker bidrar til samfunnet. Multiplikasjon som gjentatt addisjon brukes i yrkeskontekst: en baker lager 6 brett med 8 boller = 48 boller. Venn-diagrammer sammenligner to yrker p\u00e5 tvers av utdanning, arbeidsoppgaver og verkt\u00f8y. Skriving utvides til strukturerte yrkesforskningsrapporter med innledning, fakta og konklusjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for samfunnsfag, matematikk og skriftlig fremstilling i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Pengematematikk med l\u00f8nn og budsjett (7\u20138-\u00e5ringer forst\u00e5r inntekt og utgifter)', howWeAddress: 'L\u00f8nnsberegningsark der elevene regner ut dagsl\u00f8nn, ukesl\u00f8nn og enkle budsjetter i yrkeskontekst' },
      { milestone: 'Tidsplanlegging med klokkesl\u00e6tt (planlegge en arbeidsdag)', howWeAddress: 'Arbeidsdagplaner der elevene setter opp tidslinjer med start, pauser og slutt og beregner varighet' },
      { milestone: 'Sammenlignende analyse av yrker (flere kriterier samtidig)', howWeAddress: 'Venn-diagrammer og tabeller der elevene sammenligner to yrker etter utdanning, verkt\u00f8y og arbeidsoppgaver' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele kroner uten \u00f8re, begrens til tre velkjente yrker og tilby rapportmaler med setningsstartere. For avanserte elever i 2. klasse tilf\u00f8yes desimaltall i l\u00f8nnsberegning, sammenligning av fire yrker i tabell og selvstendig yrkesforskningsrapport med kildehenvisning.',
    parentTakeaway: 'Snakk om yrker i hverdagen: \u00abhva gj\u00f8r bussjf\u00f8ren, legen, snekkeren?\u00bb La barnet intervjue en voksen om jobben sin og skrive tre fakta. Regn med arbeidstid: \u00ab8 timer \u00e0 50 kroner \u2014 hvor mye tjener man p\u00e5 en dag?\u00bb Yrker gir barnet en konkret forst\u00e5else av samfunnet rundt seg.',
    classroomIntegration: 'Yrketemaet i 2. klasse fungerer som samfunnsfagsprosjekt: mattetimen med l\u00f8nns- og tidsberegninger, norsktimen med yrkesforskningsrapporter og intervjuer, samfunnsfagstimen med samfunnsroller og yrkessammenligning. Klassebes\u00f8k fra lokale yrkesut\u00f8vere gir autentisk l\u00e6ring. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for samfunnsfag og skriftlig fremstilling st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Pengematematikk (l\u00f8nn og budsjett)', emerging: 'adderer to bel\u00f8p i hele kroner innenfor 100 med st\u00f8tte', proficient: 'beregner selvstendig dagsl\u00f8nn og enkel budsjett med flere poster', advanced: 'l\u00f8ser flertrinnsproblemer med l\u00f8nn, utgifter og sparing og formulerer egne oppgaver' },
      { skill: 'Tidsplanlegging av arbeidsdag', emerging: 'setter opp en enkel tidsplan med tre tidspunkter med st\u00f8tte', proficient: 'planlegger selvstendig en hel arbeidsdag med start, pauser og slutt og beregner varighet', advanced: 'planlegger komplekse tidsskjemaer med flere aktiviteter og beregner total arbeidstid' },
      { skill: 'Yrkesforskningsrapport', emerging: 'skriver 3\u20134 faktasetninger om et yrke med st\u00f8tte', proficient: 'skriver selvstendig en rapport med innledning, fakta og konklusjon', advanced: 'skriver en detaljert rapport med sammenligning av to yrker, kildehenvisning og personlig vurdering' },
    ],
  },

  music: {
    snippetAnswer: 'Musikk-oppgaver for 2. klasse (7\u20138 \u00e5r) trener br\u00f8kforst\u00e5else gjennom notelendesm\u00f8nstre, m\u00f8nstergjenkjenning i rytmesekvenser, lesing av musikkhistorie og selvstendig skriving av musikkrapporter med fagvokabular. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir musikktemaet et kraftig verkt\u00f8y for matematisk tenkning \u2014 syv- og \u00e5tte\u00e5ringer oppdager at noter representerer br\u00f8ker (helnote = 4 slag, halvnote = 2 slag, fjerdedelsnote = 1 slag), bygger rytmesekvenser med gjentatt addisjon og analyserer m\u00f8nstre i melodier. Addisjon og subtraksjon innenfor 100 brukes til \u00e5 beregne total spilletid og sammenligne sanglengder. Multiplikasjon modellerer musikalsk repetisjon: et vers som gjentas 4 ganger med 8 takter gir 32 takter. Lesetekster dekker instrumentfamilier, norske folkemusikktradisjoner og lydproduksjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for musikk, matematikk og norskfaget i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Begynnende br\u00f8kforst\u00e5else gjennom noteverdier (hel, halv, fjerdedel)', howWeAddress: 'Noteverdis\u00f8velser der elevene deler takter i helnote, halvnoter og fjerdedelsnoter og oppdager halverings-m\u00f8nsteret' },
      { milestone: 'M\u00f8nstergjenkjenning i rytmesekvenser (gjentakelse, variasjon)', howWeAddress: 'Rytmesekvensark der elevene identifiserer, forlenger og lager egne m\u00f8nstre med rytmesymboler' },
      { milestone: 'Strukturert fagskriving med musikkvokabular', howWeAddress: 'Musikkrapport-maler der elevene skriver om instrumenter eller sjangere med fagord som rytme, melodi og tempo' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk kun helnote og halvnote, begrens rytmem\u00f8nstre til to elementer og tilby ordbanker med musikkvokabular. For avanserte elever i 2. klasse tilf\u00f8yes \u00e5ttedelsnoter, komplekse rytmem\u00f8nstre med synkope og selvstendig skriving av musikkanalyse med fagbegreper.',
    parentTakeaway: 'Klapp rytmer sammen hjemme: \u00abkan du klappe dette m\u00f8nsteret: lang-kort-kort-lang?\u00bb Lytt til musikk og tell slag: \u00abhvor mange slag per takt?\u00bb Regn med sanger: \u00abhvis hvert vers varer 30 sekunder og sangen har 4 vers, hvor lang er sangen?\u00bb Musikk gj\u00f8r matematikk h\u00f8rbar og f\u00f8lbar.',
    classroomIntegration: 'Musikktemaet i 2. klasse integreres p\u00e5 tvers av fag: mattetimen med noteverdier og br\u00f8ktenkning, musikktimen med rytmem\u00f8nstre og instrumentkunnskap, norsktimen med musikkrapporter og fagvokabular. Klassekonserter gir autentisk presentasjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for musikk, matematikk og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Br\u00f8kforst\u00e5else gjennom noteverdier', emerging: 'gjenkjenner helnote og halvnote med bildest\u00f8tte', proficient: 'forklarer selvstendig forholdet mellom hel, halv og fjerdedelsnote og fyller takter korrekt', advanced: 'bruker noteverdier til \u00e5 l\u00f8se br\u00f8koppgaver og komponerer egne rytmem\u00f8nstre med varierte noteverdier' },
      { skill: 'Rytmem\u00f8nster (gjenkjenning og forlengelse)', emerging: 'gjenkjenner enkle to-elements m\u00f8nstre med st\u00f8tte', proficient: 'identifiserer, forlenger og beskriver rytmem\u00f8nstre med tre eller flere elementer', advanced: 'lager egne komplekse m\u00f8nstre, varierer dem og forklarer strukturen med fagord' },
      { skill: 'Musikkrapport med fagvokabular', emerging: 'skriver 2\u20133 setninger om et instrument med st\u00f8tte', proficient: 'skriver selvstendig en rapport med innledning, fakta og fagord som rytme, melodi og tempo', advanced: 'skriver en sammenlignende analyse av to instrumenter med faglig argumentasjon' },
    ],
  },

  nature: {
    snippetAnswer: 'Natur-oppgaver for 2. klasse (7\u20138 \u00e5r) trener \u00f8kosystemforst\u00e5else med n\u00e6ringskjeder, m\u00e5ling av naturdata i cm og m, dataanalyse med s\u00f8ylediagrammer og selvstendig skriving av naturforskningsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r naturtemaet fra observasjon til systematisk \u00f8kologisk forst\u00e5else \u2014 syv- og \u00e5tte\u00e5ringer kan kartlegge enkle n\u00e6ringskjeder (sol \u2192 plante \u2192 insekt \u2192 fugl), m\u00e5le treh\u00f8yder og bladst\u00f8rrelser i centimeter, og analysere naturdata over tid i s\u00f8ylediagrammer. Addisjon og subtraksjon innenfor 100 brukes p\u00e5 artstellinger og vekstdata. Multiplikasjon som gjentatt addisjon modellerer naturens m\u00f8nstre: 5 planter med 4 blomster = 20 blomster. Lesetekster dekker norske \u00f8kosystemer, \u00e5rstidssykluser og artsmangfold. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, m\u00e5ling og skriftlig rapportering i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'N\u00e6ringskjedeforst\u00e5else (produsent \u2192 konsument \u2192 toppredator)', howWeAddress: 'N\u00e6ringskjedeark der elevene kobler arter i riktig rekkef\u00f8lge og forklarer energioverf\u00f8ring med egne ord' },
      { milestone: 'M\u00e5ling av naturdata med standardenheter (cm og m)', howWeAddress: 'Feltm\u00e5lingsark der elevene m\u00e5ler treh\u00f8yder, bladlengder og avstand mellom planter og registrerer data' },
      { milestone: 'Dataanalyse av naturobservasjoner over tid', howWeAddress: 'Langtidsobservasjonsark der elevene registrerer ukentlige naturdata og lager s\u00f8ylediagrammer for \u00e5 finne m\u00f8nstre' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre-ledds n\u00e6ringskjeder, m\u00e5l i hele centimeter og bruk forenklede diagrammaler. For avanserte elever i 2. klasse tilf\u00f8yes n\u00e6ringsnett med kryssende kjeder, m\u00e5ling i millimeter med omregning og selvstendig naturforskningsrapport med hypotese og dataanalyse.',
    parentTakeaway: 'G\u00e5 p\u00e5 natursti og gj\u00f8r det til forskning: m\u00e5l tre treh\u00f8yder med en meterstokk, tell blomster p\u00e5 en eng og lag et s\u00f8ylediagram hjemme. Diskuter n\u00e6ringskjeder: \u00abhva spiser fuglen? Og hva spiser det fuglen spiser?\u00bb Naturen er det beste klasserommet \u2014 og det er gratis.',
    classroomIntegration: 'Naturtemaet i 2. klasse kj\u00f8res som feltforskningsprosjekt: naturfagstimen med \u00f8kosystemer og n\u00e6ringskjeder, mattetimen med naturm\u00e5linger og dataanalyse, norsktimen med forskningsrapporter og fagvokabular, utetimen med praktisk feltarbeid. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, m\u00e5ling og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'N\u00e6ringskjeder (\u00f8kosystemforst\u00e5else)', emerging: 'kobler tre arter i riktig rekkef\u00f8lge med bildest\u00f8tte', proficient: 'bygger selvstendig n\u00e6ringskjeder med fire ledd og forklarer energioverf\u00f8ring', advanced: 'konstruerer n\u00e6ringsnett med kryssende kjeder og forklarer konsekvenser hvis \u00e9n art fjernes' },
      { skill: 'Feltm\u00e5ling av naturdata', emerging: 'm\u00e5ler i hele centimeter med st\u00f8tte', proficient: 'm\u00e5ler selvstendig i cm og m, registrerer data presist og sammenligner resultater', advanced: 'm\u00e5ler i mm, omregner til cm, beregner gjennomsnitt og presenterer data i diagram' },
      { skill: 'Naturforskningsrapport', emerging: 'skriver 3\u20134 observasjoner med st\u00f8tte fra mal', proficient: 'skriver selvstendig rapport med innledning, observasjoner, data og konklusjon', advanced: 'skriver detaljert forskningsrapport med hypotese, metode, resultater og perspektivering' },
    ],
  },

  numbers: {
    snippetAnswer: 'Tall-oppgaver for 2. klasse (7\u20138 \u00e5r) trener posisjonsverdi til 1000, addisjon og subtraksjon med tierovergang, begynnende multiplikasjon og divisjon, og selvstendig formulering av tekstoppgaver med flertrinnsregning. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse utvides tallforst\u00e5elsen dramatisk \u2014 syv- og \u00e5tte\u00e5ringer arbeider med posisjonsverdi til 1000, mestrer addisjon og subtraksjon med tierovergang innenfor 100, og introduseres for multiplikasjon som gjentatt addisjon og divisjon som rettferdig deling. Tallm\u00f8nstre utvides til hundretallssekvenser (200, 400, 600\u2026). Tallinje-arbeid styrker forst\u00e5elsen av tallenes relative st\u00f8rrelse. Estimering og avrunding til n\u00e6rmeste tier trener tallf\u00f8lelse. Tekstoppgaver krever flertrinnsl\u00f8sninger med b\u00e5de addisjon og subtraksjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tallforst\u00e5else, regning og probleml\u00f8sing i 2. trinn st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'Posisjonsverdi til 1000 (hundrere, tiere, enere)', howWeAddress: 'Posisjonsverdiark der elevene deler tresifrede tall i hundrere, tiere og enere med konkreter og tabeller' },
      { milestone: 'Addisjon/subtraksjon med tierovergang innenfor 100', howWeAddress: 'Regnestrategiark der elevene bruker tallinje, tierkompiser og oppstilling for \u00e5 mestre tierovergang' },
      { milestone: 'Begynnende multiplikasjon og divisjon (gjentatt addisjon og rettferdig deling)', howWeAddress: 'Grupperingsark der elevene \u00f8ver multiplikasjon som gjentatt addisjon og divisjon som lik fordeling med konkreter' },
      { milestone: 'Flertrinnsproblemer med tekstoppgaver', howWeAddress: 'Tekstoppgaver med to operasjoner der elevene identifiserer regnearten, l\u00f8ser steg for steg og forklarer strategien' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, hold posisjonsverdi innenfor 100, bruk tallinje til tierovergang og tilby bildest\u00f8tte ved tekstoppgaver. For avanserte elever i 2. klasse tilf\u00f8yes posisjonsverdi til 1000 med omveksling, flertrinnsproblemer med tre operasjoner og selvstendig formulering av egne tekstoppgaver.',
    parentTakeaway: 'Lek med tall i hverdagen: \u00abhvor mange kroner har vi hvis vi har 3 hundrelapper, 4 tiere og 7 enere?\u00bb \u00d8v tierovergang med handlepriser: \u00ab47 + 35 \u2014 bruk tierkompis!\u00bb La barnet formulere egne tekstoppgaver om familiesituasjoner. Tallf\u00f8lelse vokser best n\u00e5r matematikk oppleves som nyttig.',
    classroomIntegration: 'Talltemaet i 2. klasse er fundamentet for all matematikk: regnetimen med posisjonsverdi og algoritmer, probleml\u00f8sningstimen med tekstoppgaver, spill\u00f8kter med tallkort og tallm\u00f8nstre. Tallforst\u00e5else integreres i alle fagtimer gjennom praktisk regning. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tallforst\u00e5else og regning st\u00f8ttes systematisk.',
    assessmentRubric: [
      { skill: 'Posisjonsverdi til 1000', emerging: 'identifiserer tiere og enere i tosifrede tall med st\u00f8tte', proficient: 'deler selvstendig tresifrede tall i hundrere, tiere og enere og sammenligner dem', advanced: 'omveksler mellom posisjonsenheter, runder til n\u00e6rmeste tier/hundre og forklarer posisjonsverdi med egne ord' },
      { skill: 'Addisjon/subtraksjon med tierovergang', emerging: 'l\u00f8ser oppgaver innenfor 50 med tallinje eller konkreter', proficient: 'l\u00f8ser selvstendig oppgaver innenfor 100 med tierovergang ved hjelp av regnestrategi', advanced: 'l\u00f8ser flertrinnsproblemer innenfor 200 og velger mest effektive strategi' },
      { skill: 'Tekstoppgaver med flere operasjoner', emerging: 'l\u00f8ser ettrinnsproblemer med bildest\u00f8tte', proficient: 'l\u00f8ser selvstendig totrinnsproblemer og forklarer l\u00f8sningsstrategien', advanced: 'l\u00f8ser flertrinnsproblemer og formulerer egne tekstoppgaver med to operasjoner' },
    ],
  },

  ocean: {
    snippetAnswer: 'Hav-oppgaver for 2. klasse (7\u20138 \u00e5r) trener m\u00e5ling av havdyr i cm, dataanalyse med dybdedata, n\u00e6ringskjeder i havet og selvstendig skriving av havforskningsrapporter med sammenlignende analyse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir havtemaet et avansert forskningsprosjekt \u2014 syv- og \u00e5tte\u00e5ringer kan m\u00e5le og sammenligne havdyrst\u00f8rrelser i centimeter, analysere dybdedata i s\u00f8ylediagrammer, og kartlegge marine n\u00e6ringskjeder fra plankton til hval. Addisjon og subtraksjon innenfor 100 brukes p\u00e5 dybder, lengder og temperaturdata. Multiplikasjon som gjentatt addisjon modellerer havlivet: 6 blekkspruter med 8 armer = 48 armer. Lesetekster dekker koralrev, havstr\u00f8mmer og artsmangfold i norske farvann. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, m\u00e5ling og skriftlig rapportering i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Sammenligning av havdyrst\u00f8rrelser med m\u00e5ling (7\u20138-\u00e5ringer bruker cm og m)', howWeAddress: 'Havdyrm\u00e5lingsark der elevene sammenligner lengder i cm, beregner forskjeller og rangerer arter etter st\u00f8rrelse' },
      { milestone: 'Marine n\u00e6ringskjeder (plankton \u2192 fisk \u2192 sj\u00f8pattedyr)', howWeAddress: 'N\u00e6ringskjedeark der elevene kobler marine arter i riktig rekkef\u00f8lge og forklarer energioverf\u00f8ring i havet' },
      { milestone: 'Dataanalyse med dybde- og temperaturdata', howWeAddress: 'Havdataark der elevene leser av s\u00f8ylediagrammer med dybde- og temperaturdata og besvarer analysessp\u00f8rsm\u00e5l' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til fem velkjente havdyr, bruk hele centimeter og tilby forenklede n\u00e6ringskjeder med tre ledd. For avanserte elever i 2. klasse tilf\u00f8yes m\u00e5ling i millimeter, n\u00e6ringsnett med kryssende kjeder og selvstendig havforskningsrapport med datadiagrammer.',
    parentTakeaway: 'Utforsk havet hjemmefra: se p\u00e5 bilder av havdyr og gjett lengden i centimeter \u2014 sjekk svaret etterpå. Bygg en n\u00e6ringskjede p\u00e5 papir: \u00abhva spiser krabben? Og hva spiser det krabben spiser?\u00bb Regn med havtall: \u00aben hval er 25 meter, en delfin er 3 meter \u2014 hvor mye lengre er hvalen?\u00bb',
    classroomIntegration: 'Havtemaet i 2. klasse integreres som tverrfaglig prosjekt: naturfagstimen med n\u00e6ringskjeder og \u00f8kosystemer, mattetimen med m\u00e5ledata og diagrammer, norsktimen med havforskningsrapporter, kunsttimen med havdyrtegninger. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, m\u00e5ling og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'M\u00e5ling og sammenligning av havdyr', emerging: 'sammenligner to havdyr etter st\u00f8rrelse med bildest\u00f8tte', proficient: 'sammenligner selvstendig flere arter i cm, beregner forskjeller og rangerer', advanced: 'analyserer m\u00e5ledata i tabell, beregner gjennomsnitt og presenterer funn i diagram' },
      { skill: 'Marine n\u00e6ringskjeder', emerging: 'kobler tre arter i riktig rekkef\u00f8lge med st\u00f8tte', proficient: 'bygger selvstendig n\u00e6ringskjeder med fire ledd og forklarer energioverf\u00f8ring', advanced: 'konstruerer n\u00e6ringsnett og vurderer konsekvenser av milj\u00f8endringer p\u00e5 kjeden' },
      { skill: 'Havforskningsrapport', emerging: 'skriver 3\u20134 fakta om et havdyr med st\u00f8tte', proficient: 'skriver selvstendig rapport med innledning, fakta, data og konklusjon', advanced: 'skriver sammenlignende rapport med to arter, datadiagrammer og kildehenvisning' },
    ],
  },

  pets: {
    snippetAnswer: 'Kj\u00e6ledyr-oppgaver for 2. klasse (7\u20138 \u00e5r) trener vektm\u00e5ling og sammenligning, f\u00f4ringsbudsjett med pengematematikk, datainnsamling om kj\u00e6ledyrvaner og selvstendig skriving av dyrepassguider med prosedyretekst. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir kj\u00e6ledyrtemaet et praktisk forsknings- og omsorgsprosjekt \u2014 syv- og \u00e5tte\u00e5ringer kan veie kj\u00e6ledyr i kilogram, beregne f\u00f4rmengder med multiplikasjon (3 m\u00e5ltider \u00e0 50 g = 150 g per dag), og f\u00f8re budsjett over kj\u00e6ledyrutgifter med addisjon og subtraksjon innenfor 100. Datainnsamling om klassens kj\u00e6ledyr gir s\u00f8ylediagrammer og piktogrammer. Prosedyreskriving om dyrestell trener sekvensering og presist spr\u00e5k. Lesetekster dekker ansvarlig dyrehold, veterin\u00e6rbes\u00f8k og dyrebehov. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, m\u00e5ling og skriftlig fremstilling i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Vektm\u00e5ling og sammenligning (kilogram og gram)', howWeAddress: 'Kj\u00e6ledyrveiingsark der elevene sammenligner vekter i kg, beregner forskjeller og rangerer dyr etter st\u00f8rrelse' },
      { milestone: 'Pengematematikk med dyrebudsjett (f\u00f4r, veterin\u00e6r, utstyr)', howWeAddress: 'Budsjettark der elevene beregner m\u00e5nedlige kj\u00e6ledyrkostnader med addisjon av flere poster' },
      { milestone: 'Prosedyreskriving om dyrestell (rekkef\u00f8lge og instruksjoner)', howWeAddress: 'Stelleguide-maler der elevene skriver trinnvise instruksjoner for daglig kj\u00e6ledyrpleie med presist spr\u00e5k' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele kilogram og hele kroner, begrens budsjett til tre poster og tilby prosedyremaler med setningsstartere. For avanserte elever i 2. klasse tilf\u00f8yes vekt i gram, detaljerte m\u00e5nedsbudsjetter med \u00e5rsberegning og selvstendig dyrepassguide med begrunnede r\u00e5d.',
    parentTakeaway: 'Gj\u00f8r kj\u00e6ledyrstellet til l\u00e6ring: la barnet veie f\u00f4r (\u00ab50 gram tre ganger om dagen \u2014 hvor mye per dag?\u00bb), f\u00f8r budsjett over kj\u00e6ledyrutgifter og skrive en stelleguide. Hvis dere ikke har kj\u00e6ledyr, \u00abadopter\u00bb et tenkt dyr og planlegg alt det trenger. Ansvar for dyr bygger empati og matematisk tenkning.',
    classroomIntegration: 'Kj\u00e6ledyrtemaet i 2. klasse integreres som ansvarsprosjekt: naturfagstimen med dyrebehov og livssyklus, mattetimen med vektm\u00e5ling og budsjett, norsktimen med prosedyretekst og dyrepassguider. Et klassedyr (virkelig eller fiktivt) gir autentisk l\u00e6ringskontekst. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, m\u00e5ling og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Vektm\u00e5ling (kg og g)', emerging: 'sammenligner to dyr etter vekt med st\u00f8tte (\u00abst\u00f8rst/minst\u00bb)', proficient: 'veier selvstendig i kg, beregner forskjeller og rangerer flere dyr etter vekt', advanced: 'arbeider med gram, omregner til kg og beregner f\u00f4rmengder per uke' },
      { skill: 'Kj\u00e6ledyrbudsjett (pengematematikk)', emerging: 'adderer to poster i hele kroner innenfor 100 med st\u00f8tte', proficient: 'beregner selvstendig m\u00e5nedsbudsjett med flere poster og finner totalsum', advanced: 'l\u00f8ser flertrinnsproblemer med \u00e5rsbudsjett, sammenligner kostnader for ulike dyr' },
      { skill: 'Prosedyretekst (stelleguide)', emerging: 'skriver 3\u20134 trinn for en enkel oppgave med st\u00f8tte', proficient: 'skriver selvstendig en komplett stelleguide med rekkef\u00f8lge, tidsangivelser og begrunnelser', advanced: 'skriver en detaljert dyrepassmanual med tilpasninger for ulike situasjoner og faglige r\u00e5d' },
    ],
  },

  pirates: {
    snippetAnswer: 'Pirat-oppgaver for 2. klasse (7\u20138 \u00e5r) trener kartkoordinater og retningsinstruksjoner, pengematematikk med skattberegning, koding av hemmelige meldinger og selvstendig skriving av piratfortellinger med spenningskurve. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir pirattemaet et avansert probleml\u00f8sningsprosjekt \u2014 syv- og \u00e5tte\u00e5ringer bruker rutenettkoordinater til \u00e5 navigere skattekart, beregner avstand mellom \u00f8yer i ruteenheter, og l\u00f8ser flertrinnsproblemer med gullmyntfordeling (48 mynter delt likt p\u00e5 6 pirater = ?). Pengematematikk med skatteverdier bruker addisjon og subtraksjon innenfor 100. Kodeknekking med tallkoder og bokstavforskyvning trener logisk tenkning. Lesetekster dekker sj\u00f8fartshistorie, kompassretninger og navigasjon. Skriving av piratfortellinger med innledning, h\u00f8ydepunkt og avslutning trener narrativ struktur. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, norsk og probleml\u00f8sing i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Rutenettkoordinater og romlig navigasjon (7\u20138-\u00e5ringer leser enkle koordinatsystemer)', howWeAddress: 'Skattekartark med rutenett der elevene bruker koordinater til \u00e5 finne posisjoner og planlegge ruter' },
      { milestone: 'Divisjon som rettferdig deling (fordele skatt p\u00e5 mannskap)', howWeAddress: 'Skattefordelingsark der elevene deler mynter likt mellom pirater og oppdager divisjonsprinsippet' },
      { milestone: 'Narrativ skriving med spenningskurve (innledning, h\u00f8ydepunkt, avslutning)', howWeAddress: 'Piratfortelling-maler med rammestruktur der elevene skriver egne eventyr med stigende spenning' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk forenklet rutenett med f\u00e6rre ruter, del med tall i 2- og 5-tabellen, og tilby fortelling-maler med setningsstartere. For avanserte elever i 2. klasse tilf\u00f8yes st\u00f8rre rutenett med bokstav-tall-koordinater, divisjon med rest og selvstendig piratfortelling med dialog og beskrivende spr\u00e5k.',
    parentTakeaway: 'Lag en skattejakt hjemme: tegn et rutenett-kart over hagen eller leiligheten og skriv koordinater for skjulestedet. Regn med piratskatt: \u00ab36 gullmynter delt p\u00e5 4 pirater \u2014 hvor mange f\u00e5r hver?\u00bb La barnet skrive en piratfortelling med begynnelse, h\u00f8ydepunkt og slutt. Pirater gj\u00f8r matematikk til et eventyr.',
    classroomIntegration: 'Pirattemaet i 2. klasse kj\u00f8res som eventyrprosjekt: mattetimen med koordinater, skatteberegning og divisjon, norsktimen med piratfortellinger og kodeknekking, samfunnsfagstimen med sj\u00f8fartshistorie og kompassretninger. En klasseskattejakt gir autentisk motivasjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, norsk og probleml\u00f8sing st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Rutenettkoordinater og navigasjon', emerging: 'finner posisjoner p\u00e5 et enkelt rutenett med st\u00f8tte', proficient: 'bruker selvstendig bokstav-tall-koordinater til \u00e5 finne og beskrive posisjoner', advanced: 'planlegger ruter mellom flere punkter, beregner avstand og lager egne skattekart' },
      { skill: 'Divisjon som rettferdig deling', emerging: 'deler konkreter likt mellom 2 grupper med st\u00f8tte', proficient: 'l\u00f8ser selvstendig delingsoppgaver i 2-, 5- og 10-tabellen og skriver dem som divisjonsstykker', advanced: 'l\u00f8ser divisjonsoppgaver med rest og forklarer sammenhengen mellom multiplikasjon og divisjon' },
      { skill: 'Piratfortelling med spenningskurve', emerging: 'skriver en kort fortelling med begynnelse og slutt med st\u00f8tte', proficient: 'skriver selvstendig en fortelling med innledning, h\u00f8ydepunkt og avslutning', advanced: 'skriver en detaljert fortelling med dialog, beskrivende spr\u00e5k og uventet vending' },
    ],
  },

  robots: {
    snippetAnswer: 'Robot-oppgaver for 2. klasse (7\u20138 \u00e5r) trener algoritmisk tenkning med steg-for-steg-instruksjoner, symmetri og geometrisk design, m\u00e5ling av robotdeler i cm og selvstendig skriving av instruksjonstekster med presis sekvensering. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse l\u00f8ftes robottemaet til programmering og konstruksjon \u2014 syv- og \u00e5tte\u00e5ringer skriver algoritmer som steg-for-steg-instruksjoner (hvis-s\u00e5-l\u00f8kker), designer roboter med geometriske former og symmetrilinjer, og m\u00e5ler robotdeler i centimeter for \u00e5 tegne m\u00e5lstokktegninger. Multiplikasjon brukes i robotproduksjon: 5 roboter med 4 hjul = 20 hjul. Addisjon og subtraksjon innenfor 100 beregner delepriser og monteringstid. Lesetekster dekker robotteknologi i hverdagen, programmering og kunstig intelligens p\u00e5 barneniv\u00e5. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for teknologi, matematikk og skriftlig fremstilling i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Algoritmisk tenkning (steg-for-steg-instruksjoner med betingelser)', howWeAddress: 'Algoritmeark der elevene skriver instruksjoner for robotbevegelser med \u00abhvis-s\u00e5\u00bb-betingelser og l\u00f8kker' },
      { milestone: 'Geometrisk design med symmetri (bygge roboter av former)', howWeAddress: 'Robotdesignark der elevene konstruerer roboter med rektangler, sirkler og trekanter og markerer symmetrilinjer' },
      { milestone: 'M\u00e5lstokktegning av robotdeler i cm', howWeAddress: 'Konstruksjonsark der elevene m\u00e5ler og tegner robotdeler i riktig st\u00f8rrelse og sammenligner m\u00e5l' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens algoritmer til tre trinn uten betingelser, bruk enkle former og hele centimeter. For avanserte elever i 2. klasse tilf\u00f8yes algoritmer med n\u00f8stede betingelser, komplekse geometriske design med m\u00e5lstokk og selvstendig skriving av robotbruksanvisning.',
    parentTakeaway: 'Bygg en papprobothjemme: m\u00e5l delene i centimeter, klipp ut og monter. Skriv instruksjoner: \u00absteg 1: g\u00e5 tre skritt frem. Steg 2: hvis vegg, sving h\u00f8yre.\u00bb La barnet programmere deg som en robot \u2014 du gj\u00f8r bare eksakt det instruksjonen sier! Algoritmisk tenkning er fremtidens grunnkompetanse.',
    classroomIntegration: 'Robottemaet i 2. klasse integreres som teknologiprosjekt: mattetimen med geometri, m\u00e5ling og multiplikasjon, norsktimen med instruksjonstekster og algoritmer, kunst- og h\u00e5ndverkstimen med robotkonstruksjon. Programmering av enkle roboter gir praktisk l\u00e6ring. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for teknologi, matematikk og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Algoritmisk tenkning', emerging: 'f\u00f8lger en ferdig algoritme med tre trinn med st\u00f8tte', proficient: 'skriver selvstendig en algoritme med fem trinn inkludert \u00e9n betingelse', advanced: 'lager algoritmer med l\u00f8kker og n\u00f8stede betingelser og feilretter dem systematisk' },
      { skill: 'Geometrisk robotdesign med symmetri', emerging: 'bygger en enkel robot av to former med st\u00f8tte', proficient: 'designer selvstendig en robot med flere geometriske former og \u00e9n symmetrilinje', advanced: 'lager komplekse robotdesign med m\u00e5lstokk, flere symmetrilinjer og forklarer designvalg' },
      { skill: 'Instruksjonstekst (robotprogrammering)', emerging: 'skriver 2\u20133 instruksjonstrinn med st\u00f8tte', proficient: 'skriver selvstendig en komplett instruksjon med rekkef\u00f8lge og betingelser', advanced: 'skriver en detaljert bruksanvisning med feilh\u00e5ndtering og alternative veier' },
    ],
  },

  school: {
    snippetAnswer: 'Skole-oppgaver for 2. klasse (7\u20138 \u00e5r) trener timeplanlesing og tidsberegning, skolebudsjett med pengematematikk, datainnsamling om skolevaner og selvstendig skriving av skolerapporter med sammenligning og argumentasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir skoletemaet en autentisk kontekst for matematikk og skriving \u2014 syv- og \u00e5tte\u00e5ringer leser timeplaner og beregner varighet mellom klokkesl\u00e5tt, planlegger skolebudsjetter for klasseturer og utstyr, og analyserer data fra sp\u00f8rreunders\u00f8kelser om favorittfag og friminuttsaktiviteter. Multiplikasjon brukes i skolekontekst: 6 grupper med 4 elever = 24 elever. Prosedyreskriving om skolerutiner trener presis sekvensering. Meningsskriving om skoletemaer (\u00abhvilket fag er viktigst?\u00bb) utvikler argumentasjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tid, pengematematikk og skriftlig argumentasjon i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Tidsberegning med klokkesl\u00e6tt og timeplan (beregne varighet)', howWeAddress: 'Timeplanark der elevene leser av start- og sluttider, beregner varighet og planlegger skoledagen sin' },
      { milestone: 'Sp\u00f8rreunders\u00f8kelse og dataanalyse (samle og tolke data)', howWeAddress: 'Unders\u00f8kelsesark der elevene gjennomf\u00f8rer klassens sp\u00f8rreunders\u00f8kelse, lager diagrammer og analyserer resultater' },
      { milestone: 'Argumenterende skriving om skoletemaer', howWeAddress: 'Meningsark med rammer for \u00abjeg mener... fordi...\u00bb der elevene argumenterer for sitt syn p\u00e5 skolesaker' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele timer, begrens budsjett til tre poster og tilby argumentasjonsrammer med ferdige setningsstartere. For avanserte elever i 2. klasse tilf\u00f8yes tidsberegning med halve og kvarte timer, detaljerte klasseturbudsjetter og selvstendig debattinnlegg med flere argumenter.',
    parentTakeaway: 'Bruk skolehverdagen som l\u00e6ring: \u00abn\u00e5r begynner mattetimen og n\u00e5r slutter den \u2014 hvor lenge varer den?\u00bb La barnet f\u00f8re budsjett over skoleutstyr: \u00abpennal 45 kr + fargestifter 32 kr = ?\u00bb Diskuter: \u00abhvilket fag liker du best, og hvorfor?\u00bb Skolen er den mest autentiske l\u00e6ringskonteksten.',
    classroomIntegration: 'Skoletemaet i 2. klasse er selvreflekterende: mattetimen med timeplaner og budsjett, norsktimen med meningsskrivning og prosedyretekster, samfunnsfagstimen med demokrati og medbestemmelse. Klassesp\u00f8rreunders\u00f8kelser gir ekte datamateriale. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tid, data og skriftlig argumentasjon st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Tidsberegning med timeplan', emerging: 'leser av hele timer p\u00e5 analogt ur med st\u00f8tte', proficient: 'beregner selvstendig varighet mellom to klokkesl\u00e6tt og planlegger en timeplan', advanced: 'beregner med halve og kvarte timer, konverterer mellom analog og digital tid' },
      { skill: 'Sp\u00f8rreunders\u00f8kelse og diagramtolkning', emerging: 'leser av et enkelt s\u00f8ylediagram med st\u00f8tte', proficient: 'gjennomf\u00f8rer selvstendig en unders\u00f8kelse, lager diagram og besvarer sp\u00f8rsm\u00e5l', advanced: 'analyserer data, sammenligner resultater og trekker begrunnede konklusjoner' },
      { skill: 'Argumenterende skriving', emerging: 'skriver en mening med \u00e9n begrunnelse med st\u00f8tte', proficient: 'skriver selvstendig en argumenterende tekst med p\u00e5stand, to begrunnelser og konklusjon', advanced: 'skriver et debattinnlegg med motargument, tilsvar og overbevisende avslutning' },
    ],
  },

  seasons: {
    snippetAnswer: '\u00c5rstid-oppgaver for 2. klasse (7\u20138 \u00e5r) trener temperaturm\u00e5ling og beregning, sammenlignende dataanalyse p\u00e5 tvers av \u00e5rstider, naturfaglig observasjon av \u00e5rstidssykluser og selvstendig skriving av \u00e5rstidsrapporter med data. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir \u00e5rstidstemaet et langsg\u00e5ende vitenskapelig prosjekt \u2014 syv- og \u00e5tte\u00e5ringer registrerer temperaturdata gjennom hele \u00e5ret, lager s\u00f8ylediagrammer som sammenligner m\u00e5neder, og beregner temperaturforskjeller med subtraksjon innenfor 100. Multiplikasjon modellerer \u00e5rstidsm\u00f8nstre: 3 m\u00e5neder per \u00e5rstid, 4 \u00e5rstider = 12 m\u00e5neder. Lesetekster dekker norske \u00e5rstidssykluser, dagslengde, dyretilpasninger og fenologiske observasjoner. Sammenlignende skriving kontrasterer to \u00e5rstider med data og argumentasjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, m\u00e5ling og skriftlig rapportering i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Temperaturm\u00e5ling og beregning (negative og positive tall i kontekst)', howWeAddress: 'Temperaturark der elevene leser av termometer, registrerer daglige temperaturer og beregner forskjeller' },
      { milestone: 'Sammenlignende dataanalyse p\u00e5 tvers av \u00e5rstider', howWeAddress: 'Sammenligninsark der elevene lager doble s\u00f8ylediagrammer for to \u00e5rstider og analyserer forskjeller' },
      { milestone: 'Fenologisk observasjon (registrere naturens endringer over tid)', howWeAddress: '\u00c5rstidsdagbok der elevene registrerer f\u00f8rste krokus, l\u00f8vfall, f\u00f8rste sn\u00f8 og kobler til temperaturdata' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk kun positive temperaturer, begrens til to \u00e5rstider og tilby forenklede diagrammaler. For avanserte elever i 2. klasse tilf\u00f8yes negative temperaturer, sammenligning av alle fire \u00e5rstider i ett diagram og selvstendig \u00e5rstidsforskningsrapport med klimadata.',
    parentTakeaway: 'F\u00f8r en v\u00e6rdagbok gjennom \u00e5ret: les av termometeret hver morgen og registrer temperaturen. Lag et s\u00f8ylediagram per m\u00e5ned. Diskuter: \u00abhvorfor er det kaldere i januar enn i juli? Hva skjer med tr\u00e6rne om h\u00f8sten?\u00bb \u00c5rstidene er naturens st\u00f8rste eksperiment \u2014 og det skjer rett utenfor vinduet.',
    classroomIntegration: '\u00c5rstidstemaet i 2. klasse kj\u00f8res som langtidsprosjekt: naturfagstimen med fenologiske observasjoner, mattetimen med temperaturdata og diagrammer, norsktimen med \u00e5rstidsrapporter og sammenlignende skriving, utetimen med praktisk observasjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, data og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Temperaturm\u00e5ling og beregning', emerging: 'leser av termometer i hele grader med st\u00f8tte', proficient: 'registrerer selvstendig temperaturer, beregner forskjeller og sammenligner m\u00e5neder', advanced: 'arbeider med negative temperaturer, beregner gjennomsnitt og analyserer temperaturtrrender' },
      { skill: 'Sammenlignende \u00e5rstidsdiagrammer', emerging: 'leser av et enkelt s\u00f8ylediagram med st\u00f8tte', proficient: 'lager selvstendig doble s\u00f8ylediagrammer og sammenligner to \u00e5rstider', advanced: 'analyserer data fra alle fire \u00e5rstider, finner m\u00f8nstre og formulerer konklusjoner' },
      { skill: '\u00c5rstidsrapport med data', emerging: 'skriver 3\u20134 observasjoner med st\u00f8tte', proficient: 'skriver selvstendig \u00e5rstidsrapport med observasjoner, temperaturdata og konklusjon', advanced: 'skriver en sammenlignende rapport med data fra flere \u00e5rstider og klimaperspektiv' },
    ],
  },

  shapes: {
    snippetAnswer: 'Form-oppgaver for 2. klasse (7\u20138 \u00e5r) trener geometriske egenskaper som sider, hj\u00f8rner og vinkler, symmetrilinjer, sammensetning av former til nye figurer og selvstendig skriving av geometriske beskrivelser med fagvokabular. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r formtemaet fra gjenkjenning til systematisk analyse \u2014 syv- og \u00e5tte\u00e5ringer beskriver former ved hjelp av egenskaper (antall sider, hj\u00f8rner, parallelle sider), identifiserer symmetrilinjer, og bygger sammensatte figurer av grunnformer. Areal introduseres gjennom rutenettelling (hvor mange ruter dekker formen?). Multiplikasjon kobles til geometri: et rektangel med 3 rader og 4 kolonner har 12 ruter. Klassifisering av trekanter og firkanter etter egenskaper trener systematisk tenkning. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for geometri, m\u00e5ling og faglig skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Geometriske egenskaper (sider, hj\u00f8rner, parallelle sider, rettvinkler)', howWeAddress: 'Egenskapsark der elevene teller sider og hj\u00f8rner, identifiserer parallelle sider og sorterer former etter kriterier' },
      { milestone: 'Symmetri (identifisere og tegne symmetrilinjer)', howWeAddress: 'Symmetriark der elevene finner symmetrilinjer i geometriske former og tegner den andre halvdelen av symmetriske figurer' },
      { milestone: 'Arealintroduksjon gjennom rutenettelling', howWeAddress: 'Rutenettark der elevene teller ruter inne i former og oppdager at rader \u00d7 kolonner = totalt antall ruter' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til rektangler, trekanter og sirkler, bruk enkle symmetrioppgaver med \u00e9n symmetrilinje og tell ruter i sm\u00e5 rutenett. For avanserte elever i 2. klasse tilf\u00f8yes irregul\u00e6re mangekanter, flere symmetrilinjer og arealberegning med multiplikasjon i st\u00f8rre rutenett.',
    parentTakeaway: 'Finn former i hverdagen: \u00abhvor mange rektangler ser du i stuen? Har d\u00f8ren symmetri? Hvor mange hj\u00f8rner har vinduet?\u00bb Tegn former p\u00e5 rutepapir og tell ruter: \u00abet rektangel med 3 rader og 5 kolonner \u2014 hvor mange ruter?\u00bb Geometri er overalt n\u00e5r du l\u00e6rer \u00e5 se det.',
    classroomIntegration: 'Formtemaet i 2. klasse integreres i hele skolehverdagen: mattetimen med geometriske egenskaper og areal, kunsttimen med symmetriske m\u00f8nstre og formmosaikk, norsktimen med geometriske beskrivelser med fagvokabular. Byggeprosjekter med papp og papir gir praktisk forst\u00e5else. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for geometri og m\u00e5ling st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Geometriske egenskaper (sider, hj\u00f8rner, vinkler)', emerging: 'teller sider og hj\u00f8rner p\u00e5 enkle former med st\u00f8tte', proficient: 'beskriver selvstendig former med sider, hj\u00f8rner og parallelle sider og sorterer etter kriterier', advanced: 'klassifiserer trekanter og firkanter etter egenskaper og forklarer forskjellene med fagbegreper' },
      { skill: 'Symmetri', emerging: 'identifiserer \u00e9n symmetrilinje i enkle former med st\u00f8tte', proficient: 'finner selvstendig symmetrilinjer og tegner den andre halvdelen av symmetriske figurer', advanced: 'identifiserer flere symmetrilinjer, lager egne symmetriske design og forklarer symmetribegrepet' },
      { skill: 'Areal gjennom rutenettelling', emerging: 'teller ruter i sm\u00e5 former (under 10 ruter) med st\u00f8tte', proficient: 'teller selvstendig ruter i st\u00f8rre former og oppdager rader \u00d7 kolonner-m\u00f8nsteret', advanced: 'bruker multiplikasjon til arealberegning og sammenligner arealer av ulike former' },
    ],
  },

  space: {
    snippetAnswer: 'Verdensrom-oppgaver for 2. klasse (7\u20138 \u00e5r) trener posisjonsverdi med planetdata, flertrinnsproblemer med romoppdrags-tidslinjer, sammenlignende analyse av planeter i tabeller og selvstendig skriving av planetforskningsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir romtemaet et avansert dataforskningsprosjekt \u2014 syv- og \u00e5tte\u00e5ringer arbeider med tresifrede tall fra planetdata (Mars er 228 millioner km fra sola), beregner oppdragsvarigheter med addisjon og subtraksjon innenfor 100, og sammenligner planetegenskaper i tabeller med flere kolonner. Multiplikasjon modellerer romforsyninger: 4 astronauter med 3 m\u00e5ltider = 12 m\u00e5ltider per dag. Lesetekster dekker solsystemet, romutforskning og astronautliv. Meningsskriving (\u00abbur mennesker reise til Mars?\u00bb) trener argumentasjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for posisjonsverdi, lesing og skriftlig argumentasjon i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Posisjonsverdi med store tall i romkontekst (hundrer og tusener)', howWeAddress: 'Planetdataark der elevene leser av og sammenligner tresifrede tall for planetsst\u00f8rrelser og avstander' },
      { milestone: 'Flertrinnsproblemer med romoppdrags-tidslinjer', howWeAddress: 'Oppdragsplanleggingsark der elevene beregner forsyningsbehov, varighet og avstand med flere operasjoner' },
      { milestone: 'Meningsskriving med evidens fra lesing', howWeAddress: 'Romargumentasjonsark der elevene skriver begrunnet mening om romutforskning med fakta fra lesetekster' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk tosifrede tall, \u00e9n-trinns-oppgaver og tilby meningsrammer med setningsstartere. For avanserte elever i 2. klasse tilf\u00f8yes firesifrede tall, tretrinnsproblemer og selvstendig planetforskningsrapport med data fra flere kilder.',
    parentTakeaway: 'Utforsk solsystemet sammen: \u00abhvor mange planeter er det? Hvilken er st\u00f8rst?\u00bb Regn med romtall: \u00abet romoppdrag starter dag 47 og varer 36 dager \u2014 hvilken dag er det tilbake?\u00bb La barnet skrive: \u00abjeg mener vi b\u00f8r reise til Mars fordi...\u00bb Verdensrommet gj\u00f8r store tall spennende.',
    classroomIntegration: 'Romtemaet i 2. klasse integreres som forskningsprosjekt: mattetimen med planetdata og beregninger, naturfagstimen med solsystemet og romteknologi, norsktimen med forskningsrapporter og argumentasjon. Et klasseromoppdrag-rollespill gir autentisk motivasjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tallforst\u00e5else, naturfag og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Posisjonsverdi med store romtall', emerging: 'leser av tosifrede tall i romkontekst med st\u00f8tte', proficient: 'sammenligner selvstendig tresifrede tall fra planetdata og forklarer posisjonsverdi', advanced: 'arbeider med firesifrede tall, rangerer planeter etter st\u00f8rrelse og beregner forskjeller' },
      { skill: 'Flertrinnsproblemer (romoppdrag)', emerging: 'l\u00f8ser \u00e9n-trinns-oppgaver med st\u00f8tte', proficient: 'l\u00f8ser selvstendig totrinnsproblemer med forsyninger og varighet', advanced: 'l\u00f8ser tretrinnsproblemer, formulerer egne rommatteoppgaver og forklarer strategien' },
      { skill: 'Meningsskriving om romutforskning', emerging: 'skriver en mening med \u00e9n begrunnelse med st\u00f8tte', proficient: 'skriver selvstendig en argumenterende tekst med p\u00e5stand, to begrunnelser og konklusjon', advanced: 'skriver et debattinnlegg med fakta fra flere kilder, motargument og overbevisende avslutning' },
    ],
  },

  sports: {
    snippetAnswer: 'Sport-oppgaver for 2. klasse (7\u20138 \u00e5r) trener poengberegning og resultattabeller, tidsm\u00e5ling i minutter og sekunder, statistikk med s\u00f8ylediagrammer og selvstendig skriving av kamprapporter med data. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir sportstemaet et datadrevet analyseprosjekt \u2014 syv- og \u00e5tte\u00e5ringer beregner poeng og resultater med addisjon og subtraksjon innenfor 100, m\u00e5ler tid i minutter og sekunder, og analyserer sportsstatistikk i s\u00f8ylediagrammer. Multiplikasjon brukes i lagkontekst: 4 lag med 6 spillere = 24 spillere. Sammenlignende tabeller kontrasterer prestasjon p\u00e5 tvers av kamper. Lesetekster dekker norske idrettshelter, fair play og treningsplanlegging. Kamprapportskriving med data, observasjoner og konklusjon trener faglig rapportering. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, data og skriftlig fremstilling i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Poengberegning og resultattabeller (addisjon med flere lag)', howWeAddress: 'Resultattabellark der elevene adderer poeng per runde, rangerer lag og beregner differanser' },
      { milestone: 'Tidsm\u00e5ling i minutter og sekunder (sport-kontekst)', howWeAddress: 'Tidtakingsark der elevene registrerer tider, sammenligner prestasjoner og beregner forskjeller i sekunder' },
      { milestone: 'Sportsstatistikk i s\u00f8ylediagrammer', howWeAddress: 'Statistikkark der elevene lager s\u00f8ylediagrammer av m\u00e5l, poeng eller tider og analyserer m\u00f8nstre' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle resultattabeller med to lag, hele minutter og forenklede diagrammer. For avanserte elever i 2. klasse tilf\u00f8yes beregning med sekunder, sammenligning av fire lag over flere kamper og selvstendig kamprapport med statistisk analyse.',
    parentTakeaway: 'Bruk sport som mattetrening: \u00abhvilket lag vant \u2014 og med hvor mange poeng?\u00bb Ta tiden p\u00e5 l\u00f8p i hagen: \u00abdu brukte 45 sekunder, forrige gang 52 \u2014 hvor mye raskere?\u00bb La barnet f\u00f8re resultattabell over favorittlaget og lage s\u00f8ylediagram. Sport gj\u00f8r matematikk til en konkurranse.',
    classroomIntegration: 'Sportstemaet i 2. klasse integreres med kropps\u00f8ving: idrettstimen med tidtaking og poengregistrering, mattetimen med resultattabeller og statistikk, norsktimen med kamprapporter og fair play-argumentasjon. Klassemesterskap gir ekte data. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, data og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Poengberegning og resultattabeller', emerging: 'adderer poeng for to lag med st\u00f8tte', proficient: 'f\u00f8rer selvstendig resultattabell for flere lag, beregner totaler og rangerer', advanced: 'analyserer resultater over flere kamper, beregner differanser og formulerer konklusjoner' },
      { skill: 'Tidsm\u00e5ling (minutter og sekunder)', emerging: 'm\u00e5ler tid i hele minutter med st\u00f8tte', proficient: 'registrerer selvstendig tid i minutter og sekunder og beregner forskjeller', advanced: 'sammenligner tider p\u00e5 tvers av \u00f8velser, beregner forbedring og presenterer data i diagram' },
      { skill: 'Kamprapport med data', emerging: 'skriver 3\u20134 setninger om en kamp med st\u00f8tte', proficient: 'skriver selvstendig kamprapport med resultat, h\u00f8ydepunkter og konklusjon', advanced: 'skriver detaljert rapport med statistikk, sammenligning og analyse av lagets utvikling' },
    ],
  },

  spring: {
    snippetAnswer: 'V\u00e5r-oppgaver for 2. klasse (7\u20138 \u00e5r) trener m\u00e5ling av plantevekst i cm, temperaturregistrering med diagrammer, fenologisk observasjon av v\u00e5rtegn og selvstendig skriving av v\u00e5rforskningsrapporter med data. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir v\u00e5rtemaet et langtidsforskningsprosjekt \u2014 syv- og \u00e5tte\u00e5ringer m\u00e5ler plantevekst i centimeter over flere uker, registrerer temperaturstigninger i diagrammer, og dokumenterer v\u00e5rtegn som f\u00f8rste krokus, f\u00f8rste sommerfugl og isl\u00f8sning. Addisjon og subtraksjon innenfor 100 brukes p\u00e5 temperaturendringer og vekstdata. Multiplikasjon modellerer v\u00e5rens m\u00f8nstre: 5 planter med 3 blomster = 15 blomster. Lesetekster dekker fotosyntese p\u00e5 barneniv\u00e5, trekkfuglenes retur og fr\u00f8spiring. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, m\u00e5ling og skriftlig rapportering i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Langtidsm\u00e5ling av plantevekst (cm over flere uker)', howWeAddress: 'Vekstdagbok der elevene m\u00e5ler planter ukentlig i cm, registrerer data i tabell og lager vekstkurve' },
      { milestone: 'Temperaturregistrering og diagramtolkning', howWeAddress: 'V\u00e5rtemperaturark der elevene registrerer daglige temperaturer og lager s\u00f8ylediagrammer for \u00e5 se stigning' },
      { milestone: 'Fenologisk observasjon av v\u00e5rtegn', howWeAddress: 'V\u00e5rtegn-sjekkliste der elevene registrerer dato for f\u00f8rste observasjon av krokus, sommerfugl, trekkfugl osv.' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, m\u00e5l i hele centimeter, bruk forenklede diagrammaler og begrens v\u00e5rtegn-sjekklisten til fem arter. For avanserte elever i 2. klasse tilf\u00f8yes m\u00e5ling i millimeter, vekstkurver med flere planter og selvstendig v\u00e5rforskningsrapport med hypotese og dataanalyse.',
    parentTakeaway: 'S\u00e5 et fr\u00f8 sammen og m\u00e5l veksten hver uke: \u00abhvor mange centimeter vokste den denne uken?\u00bb Lag et v\u00e5rtegn-oppdrag: hvem ser den f\u00f8rste krokus, f\u00f8rste sommerfugl, f\u00f8rste svale? Les av termometeret og lag et temperaturdiagram. V\u00e5ren er naturens st\u00f8rste vitenskapseksperiment \u2014 og det skjer rett utenfor d\u00f8ren.',
    classroomIntegration: 'V\u00e5rtemaet i 2. klasse kj\u00f8res som langsg\u00e5ende prosjekt: naturfagstimen med fr\u00f8forsking og fenologi, mattetimen med vekstdata og temperaturdiagrammer, norsktimen med v\u00e5rrapporter og observasjonsbeskrivelser, utetimen med praktisk feltarbeid. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, m\u00e5ling og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Langtidsm\u00e5ling av plantevekst', emerging: 'm\u00e5ler planteh\u00f8yde i hele cm med st\u00f8tte', proficient: 'f\u00f8rer selvstendig vekstdagbok med ukentlige m\u00e5linger, tabell og enkel vekstkurve', advanced: 'm\u00e5ler i mm, sammenligner veksthastighet mellom planter og analyserer hva som p\u00e5virker vekst' },
      { skill: 'Temperaturdiagram', emerging: 'leser av et ferdig s\u00f8ylediagram med st\u00f8tte', proficient: 'registrerer selvstendig temperaturer og lager s\u00f8ylediagram som viser v\u00e5rstigning', advanced: 'sammenligner temperaturer p\u00e5 tvers av m\u00e5neder, beregner gjennomsnitt og trekker konklusjoner' },
      { skill: 'V\u00e5rforskningsrapport', emerging: 'skriver 3\u20134 observasjoner med st\u00f8tte', proficient: 'skriver selvstendig rapport med v\u00e5robservasjoner, data og konklusjon', advanced: 'skriver forskningsrapport med hypotese, data fra flere kilder og perspektivering' },
    ],
  },

  summer: {
    snippetAnswer: 'Sommer-oppgaver for 2. klasse (7\u20138 \u00e5r) trener feriematematikk med reisebudsjett, tidsberegning med ferieplaner, m\u00e5ling av utend\u00f8rsaktiviteter og selvstendig skriving av ferierapporter med strukturert fortelling. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir sommertemaet et praktisk livsmatematikk-prosjekt \u2014 syv- og \u00e5tte\u00e5ringer planlegger feriereiser med budsjett (transport 250 kr + overnatting 400 kr + mat 150 kr), beregner reisetid med klokkesl\u00e5tt, og m\u00e5ler utend\u00f8rsaktiviteter som sv\u00f8mmelengder og turavstander i meter. Multiplikasjon modellerer feriedager: 7 dager med 3 m\u00e5ltider = 21 m\u00e5ltider. Lesetekster dekker norske feriemål, friluftsliv og sommertradisjonej. Feriedagbok-skriving trener kronologisk fortelling med detaljer. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for pengematematikk, tid og skriftlig fremstilling i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Feriebudsjett med pengematematikk (flere poster, totalsum)', howWeAddress: 'Reisebudsjettark der elevene planlegger ferie med transport, overnatting og mat og beregner totalkostnad' },
      { milestone: 'Tidsberegning med reiseplan (varighet mellom klokkesl\u00e5tt)', howWeAddress: 'Reiseplanark der elevene beregner reisetid, ankomsttid og tidsforskjeller mellom aktiviteter' },
      { milestone: 'M\u00e5ling av utend\u00f8rsaktiviteter (meter og km i kontekst)', howWeAddress: 'Aktivitetsm\u00e5lingsark der elevene m\u00e5ler sv\u00f8mmelengder, turavstander og hoppst\u00f8rrelser' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele kroner innenfor 100, hele timer og hele meter. For avanserte elever i 2. klasse tilf\u00f8yes desimaltall i budsjett, tidsberegning med halvtimer og kvarter, og selvstendig ferieplanlegging med komplett budsjett og tidsplan.',
    parentTakeaway: 'Gj\u00f8r sommerferien til et matteprosjekt: la barnet planlegge \u00e9n feriedag med budsjett (\u00abhvor mye koster is + inngang + buss?\u00bb), beregne reisetider (\u00abbi drar kl. 10 og er fremme kl. 12:30 \u2014 hvor lenge tok det?\u00bb) og m\u00e5le sv\u00f8mmeturer i meter. Feriematematikk er den morsomste matematikken.',
    classroomIntegration: 'Sommertemaet i 2. klasse integreres som ferieprosjekt: mattetimen med reisebudsjett og tidsberegning, norsktimen med feriedagbok og reisebeskrivelser, samfunnsfagstimen med norske feriemål og tradisjoner. Klassens ferieplanlegging gir autentisk kontekst. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for penger, tid og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Feriebudsjett (pengematematikk)', emerging: 'adderer to ferieutgifter i hele kroner med st\u00f8tte', proficient: 'planlegger selvstendig et reisebudsjett med flere poster og beregner totalsum', advanced: 'l\u00f8ser flertrinnsproblemer med budsjettbegrensninger og optimerer ferievalg' },
      { skill: 'Tidsberegning med ferieplan', emerging: 'beregner varighet i hele timer med st\u00f8tte', proficient: 'beregner selvstendig reisetid og ankomsttid med timer og halve timer', advanced: 'planlegger komplekse reiseruter med flere stopp og beregner total reisetid' },
      { skill: 'Feriedagbok/reiserapport', emerging: 'skriver 3\u20134 setninger om en feriedag med st\u00f8tte', proficient: 'skriver selvstendig en kronologisk ferierapport med detaljer og refleksjon', advanced: 'skriver en detaljert reisebeskrivelse med sammenligning av opplevelser og personlig vurdering' },
    ],
  },

  superheroes: {
    snippetAnswer: 'Superhelt-oppgaver for 2. klasse (7\u20138 \u00e5r) trener sammenligning av store tall med superkrefter, logisk resonnering med probleml\u00f8sningsoppgaver, kreativ skriving med superheltfortellinger og selvstendig design av superhelter med geometriske former. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse brukes superhelttemaet til avansert probleml\u00f8sing \u2014 syv- og \u00e5tte\u00e5ringer sammenligner superkrefter med tall i hundrerne (superhelt A l\u00f8fter 350 kg, superhelt B l\u00f8fter 275 kg \u2014 hvem er sterkest og med hvor mye?), l\u00f8ser logiske g\u00e5ter med superkraftregler, og designer superhelter med geometriske former og symmetri. Multiplikasjon modellerer superheltoppdrag: 5 oppdrag med 3 reddede personer = 15 reddede. Narrativ skriving med superheltfortellinger trener spenningskurve, dialog og beskrivende spr\u00e5k. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tallforst\u00e5else, probleml\u00f8sing og kreativ skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Sammenligning av tresifrede tall (superkraft-kontekst)', howWeAddress: 'Superkraft-sammenligningsark der elevene rangerer helter etter styrke, hastighet og hopp med tresifrede tall' },
      { milestone: 'Logisk resonnering med regler og betingelser', howWeAddress: 'Superheltg\u00e5ter der elevene bruker \u00abhvis-s\u00e5\u00bb-logikk for \u00e5 l\u00f8se oppdrag med flere betingelser' },
      { milestone: 'Narrativ skriving med spenningskurve og dialog', howWeAddress: 'Superheltfortelling-maler med struktur for innledning, konflikt, h\u00f8ydepunkt og l\u00f8sning' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk tosifrede tall, enkle g\u00e5ter med \u00e9n betingelse og fortellingsmaler med setningsstartere. For avanserte elever i 2. klasse tilf\u00f8yes firesifrede tall, g\u00e5ter med flere n\u00f8stede betingelser og selvstendig superheltfortelling med dialog og overraskende vending.',
    parentTakeaway: 'Lag en superhelt sammen: \u00abhva er superkraften? Hvor sterk er helten p\u00e5 en skala til 1000?\u00bb Regn med superheltdata: \u00abhelten redder 8 personer per oppdrag og har 5 oppdrag \u2014 hvor mange er reddet?\u00bb La barnet skrive en superheltfortelling med begynnelse, problem og l\u00f8sning. Superhelter gj\u00f8r all l\u00e6ring episk.',
    classroomIntegration: 'Superhelttemaet i 2. klasse integreres kreativt: mattetimen med tallsammenligning og logiske g\u00e5ter, norsktimen med superheltfortellinger og dialog, kunsttimen med superheltdesign med geometriske former. Et klassesuperhelt-prosjekt gir motivasjon p\u00e5 tvers av fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tall, probleml\u00f8sing og kreativ skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Sammenligning av store tall', emerging: 'sammenligner tosifrede tall med st\u00f8tte', proficient: 'sammenligner selvstendig tresifrede tall, beregner forskjeller og rangerer', advanced: 'arbeider med firesifrede tall, forklarer posisjonsverdi og l\u00f8ser sammenligningsoppgaver med flere kriterier' },
      { skill: 'Logisk resonnering', emerging: 'l\u00f8ser enkle g\u00e5ter med \u00e9n betingelse med st\u00f8tte', proficient: 'l\u00f8ser selvstendig g\u00e5ter med to betingelser og forklarer resonnementet', advanced: 'l\u00f8ser komplekse g\u00e5ter med n\u00f8stede betingelser og formulerer egne logiske oppgaver' },
      { skill: 'Superheltfortelling', emerging: 'skriver en kort fortelling med begynnelse og slutt med st\u00f8tte', proficient: 'skriver selvstendig en fortelling med innledning, konflikt, h\u00f8ydepunkt og l\u00f8sning', advanced: 'skriver en detaljert fortelling med dialog, beskrivende spr\u00e5k og uventet vending' },
    ],
  },

  toys: {
    snippetAnswer: 'Leke-oppgaver for 2. klasse (7\u20138 \u00e5r) trener prisberegning og byttepenger, sortering etter flere kriterier, m\u00e5ling av lekedimensjoner i cm og selvstendig skriving av overbevisende tekst om favorittleker. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse gir leketemaet autentisk matematisk kontekst \u2014 syv- og \u00e5tte\u00e5ringer beregner priser og byttepenger ved lekehandel innenfor 100, sorterer leker etter flere kriterier samtidig (materiale, st\u00f8rrelse, alder), og m\u00e5ler lekedimensjoner i centimeter for \u00e5 sammenligne st\u00f8rrelser. Multiplikasjon brukes i butikkontekst: 4 brett med 6 terninger = 24 terninger. Venn-diagrammer sammenligner to leker. Overbevisende skriving (\u00abhvilken leke b\u00f8r klassen kj\u00f8pe og hvorfor?\u00bb) trener argumentasjon med begrunnelse. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for pengematematikk, m\u00e5ling og argumenterende skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Pengematematikk med priser og byttepenger (handel-kontekst)', howWeAddress: 'Lekebutikkark der elevene beregner totalpris for flere leker, betaler med sedler og finner byttepenger' },
      { milestone: 'Sortering etter flere kriterier (flerkriteriers klassifisering)', howWeAddress: 'Sorteringsark der elevene organiserer leker etter materiale, st\u00f8rrelse og aldersgruppe i tabeller' },
      { milestone: 'Argumenterende skriving om preferanser (overbevisende tekst)', howWeAddress: 'Overbevisningsark der elevene argumenterer for hvilken leke klassen b\u00f8r kj\u00f8pe med fakta og begrunnelse' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk priser i hele tier-kroner innenfor 50, sorter etter \u00e9tt kriterium og tilby argumentasjonsrammer med setningsstartere. For avanserte elever i 2. klasse tilf\u00f8yes prisberegning med \u00f8re, flerkriteriers sammenligning i Venn-diagram og selvstendig debattinnlegg med motargument.',
    parentTakeaway: 'Lek butikk hjemme: sett prislapper p\u00e5 leker og la barnet handle med ekte mynter. \u00ab47 kr for bilen, du betaler med en 50-lapp \u2014 hvor mye f\u00e5r du tilbake?\u00bb La barnet sortere leker etter ulike regler og skrive: \u00abjeg mener Lego er den beste leken fordi...\u00bb Hverdagsleker er den beste mattetreningen.',
    classroomIntegration: 'Leketemaet i 2. klasse integreres praktisk: mattetimen med prisberegning og sortering, norsktimen med argumenterende tekst om favorittleker, kunsttimen med lekedesign. En klassens lekebutikk gir rollespill med ekte pengebruk. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for penger, klassifisering og argumentasjon st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Prisberegning og byttepenger', emerging: 'adderer to priser i hele kroner med st\u00f8tte', proficient: 'beregner selvstendig totalpris for flere varer og finner byttepenger korrekt', advanced: 'l\u00f8ser flertrinnsproblemer med budsjettbegrensning og sammenligner kj\u00f8psmuligheter' },
      { skill: 'Sortering etter flere kriterier', emerging: 'sorterer etter \u00e9tt kriterium med st\u00f8tte', proficient: 'sorterer selvstendig etter to kriterier og forklarer systemet', advanced: 'lager egne klassifiseringssystemer med tre kriterier og presenterer i tabell eller Venn-diagram' },
      { skill: 'Overbevisende tekst om leker', emerging: 'skriver en mening med \u00e9n begrunnelse med st\u00f8tte', proficient: 'skriver selvstendig en argumenterende tekst med p\u00e5stand, to begrunnelser og konklusjon', advanced: 'skriver en overbevisende tekst med fakta, motargument og sterk avslutning' },
    ],
  },

  transportation: {
    snippetAnswer: 'Transport-oppgaver for 2. klasse (7\u20138 \u00e5r) trener avstandsberegning og ruteplanlegging, tidsberegning med rutetabeller, sammenligning av transportmidler med data og selvstendig skriving av reiseplanleggingsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse gir transporttemaet avansert probleml\u00f8sing med virkelighetskontekst \u2014 syv- og \u00e5tte\u00e5ringer beregner avstander mellom byer med addisjon innenfor 100, leser rutetabeller med klokkesl\u00e5tt, og sammenligner transportmidler (buss, tog, fly) etter hastighet, pris og milj\u00f8p\u00e5virkning. Multiplikasjon modellerer passasjertall: 4 busser med 25 passasjerer = 100 passasjerer. Kartlesing med avstandsm\u00e5l utvider romlig forst\u00e5else. Lesetekster dekker norsk samferdselshistorie, milj\u00f8vennlig transport og trafikksikkerhet. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, samfunnsfag og skriftlig fremstilling i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Rutetabelllesing med klokkesl\u00e5tt (avgang og ankomst)', howWeAddress: 'Rutetabellark der elevene finner avgangstider, beregner reisetid og planlegger reiser med bytte' },
      { milestone: 'Avstandsberegning med addisjon (kilometerdata)', howWeAddress: 'Reiseruteark der elevene adderer delstrekninger mellom byer og finner total avstand' },
      { milestone: 'Sammenligning av transportmidler etter flere kriterier', howWeAddress: 'Sammenligningsark der elevene vurderer buss, tog og fly etter pris, tid og milj\u00f8 i tabeller' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk forenklede rutetabeller med hele timer, avstandsberegning innenfor 50 og sammenligning av to transportmidler. For avanserte elever i 2. klasse tilf\u00f8yes rutetabeller med minutter, avstandsberegning innenfor 200 og selvstendig reiseplanlegging med budsjett og milj\u00f8vurdering.',
    parentTakeaway: 'Bruk hverdagsreiser som mattetrening: \u00abbussen g\u00e5r kl. 08:15 og ankommer kl. 08:45 \u2014 hvor lang er reisen?\u00bb Sammenlign: \u00abdet er 35 km til farmor med bil og 42 km med tog \u2014 hvorfor er det forskjellig?\u00bb La barnet planlegge en familiereise med rutetabell. Transport gj\u00f8r matematikk til noe man bruker hver dag.',
    classroomIntegration: 'Transporttemaet i 2. klasse integreres tverrfaglig: mattetimen med rutetabeller og avstandsberegning, samfunnsfagstimen med samferdselshistorie og milj\u00f8, norsktimen med reiseplanlegging og argumentasjon. En virtuell klassetur med reiseplanlegging gir autentisk kontekst. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tid, m\u00e5ling og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Rutetabelllesing og tidsberegning', emerging: 'finner \u00e9n avgangstid i en enkel rutetabell med st\u00f8tte', proficient: 'leser selvstendig rutetabeller, beregner reisetid og planlegger reise med \u00e9tt bytte', advanced: 'planlegger komplekse reiser med flere bytter, sammenligner ruter og optimerer reisetid' },
      { skill: 'Avstandsberegning (km)', emerging: 'adderer to delstrekninger innenfor 50 med st\u00f8tte', proficient: 'beregner selvstendig total avstand med flere delstrekninger innenfor 100', advanced: 'beregner avstander innenfor 200, sammenligner ruter og finner den korteste' },
      { skill: 'Reiseplanleggingsrapport', emerging: 'skriver 3\u20134 setninger om en reise med st\u00f8tte', proficient: 'skriver selvstendig en reiseplan med transportvalg, tider og begrunnelse', advanced: 'skriver en detaljert rapport med budsjett, milj\u00f8vurdering og sammenligning av alternativer' },
    ],
  },

  travel: {
    snippetAnswer: 'Reise-oppgaver for 2. klasse (7\u20138 \u00e5r) trener valutaomregning med enkel multiplikasjon, kartlesing med avstandsm\u00e5l, kultursammenligning i tabeller og selvstendig skriving av reisedagbok med beskrivende spr\u00e5k. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse gir reisetemaet globalt perspektiv p\u00e5 matematikk og spr\u00e5k \u2014 syv- og \u00e5tte\u00e5ringer \u00f8ver enkel valutaomregning (10 euro = ca. 110 kr.), leser forenklete verdenskart med avstandsm\u00e5l, og sammenligner kulturer i tabeller med flere kolonner. Multiplikasjon brukes i reisekontekst: 5 dager med 3 m\u00e5ltider = 15 m\u00e5ltider. Lesetekster dekker ulike land, tradisjoner og geografiske fenomener. Reisedagbok-skriving med beskrivende spr\u00e5k og kronologisk struktur trener narrativ tekst. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, samfunnsfag og norskfaget i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Enkel valutaforst\u00e5else med omregning (multiplikasjon)', howWeAddress: 'Valutaark der elevene regner om mellom norske kroner og enkle valutakurser med gjentatt addisjon' },
      { milestone: 'Kartlesing med avstandsm\u00e5l (forenklet verdenskart)', howWeAddress: 'Kartleggingsark der elevene finner land, m\u00e5ler avstander med linjal p\u00e5 kart og beregner reisedager' },
      { milestone: 'Kultursammenligning med flere kriterier', howWeAddress: 'Sammenligningsark der elevene sammenligner to land etter spr\u00e5k, mat, klima og tradisjoner i tabell' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk kun norske kroner, forenklede kart med tre land og sammenligning av to kulturtr\u00e6kk. For avanserte elever i 2. klasse tilf\u00f8yes reell valutaomregning med tosifrede tall, detaljert kartlesing med flere land og selvstendig reisedagbok med kulturrefleksjon.',
    parentTakeaway: 'Planlegg en \u00abdrammereise\u00bb: velg et land p\u00e5 kartet, finn ut hva ting koster der (\u00ab1 euro er ca. 11 kroner \u2014 hva koster en is til 3 euro i norske kroner?\u00bb) og skriv en reisedagbok for tenkte feriedager. Sammenlign: \u00abhva spiser de til frokost i Japan vs. Norge?\u00bb Reiser \u00e5pner verden.',
    classroomIntegration: 'Reisetemaet i 2. klasse integreres globalt: mattetimen med valuta og avstand, samfunnsfagstimen med landkunnskap og kulturforst\u00e5else, norsktimen med reisedagbok og beskrivende tekst. Et virtuelt klassereiseprosjekt gir motivasjon p\u00e5 tvers av fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, samfunnsfag og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Valutaomregning (enkel)', emerging: 'gjenkjenner at ulike land har ulike penger med st\u00f8tte', proficient: 'regner selvstendig om mellom to valutaer med enkel multiplikasjon', advanced: 'l\u00f8ser flertrinnsproblemer med valuta, sammenligner priser i ulike land' },
      { skill: 'Kartlesing med avstandsm\u00e5l', emerging: 'finner \u00e9tt land p\u00e5 et forenklet kart med st\u00f8tte', proficient: 'leser selvstendig kart, m\u00e5ler avstander og beregner reisetid', advanced: 'planlegger reiseruter mellom flere land, beregner total avstand og sammenligner ruter' },
      { skill: 'Reisedagbok med beskrivende spr\u00e5k', emerging: 'skriver 3\u20134 setninger om en reiseopplevelse med st\u00f8tte', proficient: 'skriver selvstendig kronologisk reisedagbok med sansedetaljer og refleksjon', advanced: 'skriver detaljert reisedagbok med kultursammenligning, dialog og personlig vurdering' },
    ],
  },

  vegetables: {
    snippetAnswer: 'Gr\u00f8nnsak-oppgaver for 2. klasse (7\u20138 \u00e5r) trener vektm\u00e5ling i gram og kilogram, prisberegning p\u00e5 gr\u00f8nnsakmarked, vekstdata i tabeller og selvstendig skriving av oppskrifter med prosedyretekst. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse kobles gr\u00f8nnsaktemaet til praktisk livsferdighet \u2014 syv- og \u00e5tte\u00e5ringer veier gr\u00f8nnsaker i gram og kilogram, beregner priser p\u00e5 markedet med addisjon innenfor 100, og f\u00f8rer vekstdagbok for skolehagen med m\u00e5linger i centimeter. Multiplikasjon brukes i oppskriftkontekst: oppskriften trenger 3 dl per porsjon, vi lager 4 porsjoner = 12 dl. Br\u00f8kbegreper introduseres gjennom halve, kvarte og hele gr\u00f8nnsaker. Lesetekster dekker n\u00e6ringsstoffer, sesongkalender og norsk matproduksjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, naturfag og skriftlig fremstilling i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Vektm\u00e5ling i gram og kilogram (praktisk m\u00e5ling)', howWeAddress: 'Gr\u00f8nnsakveiingsark der elevene veier ulike gr\u00f8nnsaker, registrerer i tabell og beregner totalvekt' },
      { milestone: 'Prisberegning med addisjon og byttepenger (markedskontekst)', howWeAddress: 'Markedshandel-ark der elevene beregner totalpriser for gr\u00f8nnsakhandel og finner byttepenger' },
      { milestone: 'Oppskriftskriving med mengdeberegning (prosedyretekst med m\u00e5l)', howWeAddress: 'Oppskriftmaler der elevene skriver trinnvise instruksjoner med mengdeangivelser og beregner for flere porsjoner' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele kilogram, priser i hele tier-kroner og oppskrifter med tre trinn. For avanserte elever i 2. klasse tilf\u00f8yes gram-til-kg-omregning, prisberegning med \u00f8re og selvstendig oppskrift med porsjonsomregning og n\u00e6ringsberegning.',
    parentTakeaway: 'Lag mat sammen og gj\u00f8r det til matematikk: vei gr\u00f8nnsaker (\u00ab300 gram gulr\u00f8tter + 200 gram l\u00f8k = ?\u00bb), beregn priser p\u00e5 butikken (\u00ab3 pakker \u00e0 15 kr = ?\u00bb) og la barnet skrive oppskriften med m\u00e5l og trinn. Doble oppskriften: \u00abhvis vi trenger 2 dl for 4 personer, hvor mye for 8?\u00bb Matlaging er den mest praktiske matematikken.',
    classroomIntegration: 'Gr\u00f8nnsaktemaet i 2. klasse integreres i skolehageprosjekt: naturfagstimen med vekst og n\u00e6ring, mattetimen med vekt, pris og mengdeberegning, norsktimen med oppskrifter og prosedyretekst, mat og helse-timen med matlaging. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, naturfag og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Vektm\u00e5ling (gram og kg)', emerging: 'sammenligner to gr\u00f8nnsaker etter vekt (\u00abstyngst/lettest\u00bb) med st\u00f8tte', proficient: 'veier selvstendig i gram, registrerer data og beregner totalvekt', advanced: 'omregner mellom gram og kilogram, beregner gjennomsnittsvekt og analyserer data' },
      { skill: 'Prisberegning (markedshandel)', emerging: 'adderer to priser i hele kroner med st\u00f8tte', proficient: 'beregner selvstendig totalpris for flere varer og finner byttepenger', advanced: 'l\u00f8ser flertrinnsproblemer med mengderabatt og budsjettbegrensning' },
      { skill: 'Oppskrift (prosedyretekst)', emerging: 'skriver 3\u20134 trinn for en enkel oppskrift med st\u00f8tte', proficient: 'skriver selvstendig en komplett oppskrift med ingrediensliste, mengder og trinnvise instruksjoner', advanced: 'skriver oppskrift med porsjonsomregning, n\u00e6ringstips og alternative ingredienser' },
    ],
  },

  weather: {
    snippetAnswer: 'V\u00e6r-oppgaver for 2. klasse (7\u20138 \u00e5r) trener temperaturberegning med tosifrede tall, datainnsamling av v\u00e6rdata over tid, analyse av v\u00e6rdiagrammer og selvstendig skriving av v\u00e6rrapporter med fagvokabular. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse l\u00f8ftes v\u00e6rtemaet fra observasjon til systematisk meteorologisk forskning \u2014 syv- og \u00e5tte\u00e5ringer registrerer daglige temperaturdata, beregner temperaturendringer med addisjon og subtraksjon innenfor 100, og analyserer v\u00e6rm\u00f8nstre i s\u00f8ylediagrammer over flere uker. Multiplikasjon modellerer nedb\u00f8rsdata: 5 mm per dag i 7 dager = 35 mm total nedb\u00f8r. Lesetekster dekker vannets kretsl\u00f8p, v\u00e6rvarsling og norske v\u00e6rsystemer. Sammenlignende skriving kontrasterer v\u00e6ret i to m\u00e5neder med data og konklusjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, data og skriftlig rapportering i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Temperaturberegning med tosifrede tall (temperaturendring)', howWeAddress: 'Temperaturendringsark der elevene beregner stigning og fall gjennom dagen med addisjon og subtraksjon' },
      { milestone: 'Langtids v\u00e6rdatainnsamling (systematisk observasjon)', howWeAddress: 'V\u00e6rdagbok der elevene registrerer daglig temperatur, nedb\u00f8r, vind og skytype over flere uker' },
      { milestone: 'V\u00e6rdiagramanalyse (tolke m\u00f8nstre over tid)', howWeAddress: 'Diagramtolkningsark der elevene analyserer s\u00f8ylediagrammer med v\u00e6rdata og besvarer analysessp\u00f8rsm\u00e5l' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk kun positive temperaturer, forenklede diagrammer og v\u00e6rdagbok med avkrysning. For avanserte elever i 2. klasse tilf\u00f8yes negative temperaturer, doble s\u00f8ylediagrammer og selvstendig v\u00e6rforskningsrapport med klimasammenligning.',
    parentTakeaway: 'F\u00f8r en v\u00e6rdagbok sammen: les av termometeret hver morgen og kveld, noter nedb\u00f8r og lag et ukediagram. Beregn: \u00abdet var 3 grader om morgenen og 15 om ettermiddagen \u2014 hvor mye steg temperaturen?\u00bb Diskuter v\u00e6rvarselet: \u00abble det som meteorologen sa?\u00bb V\u00e6ret er den mest tilgjengelige vitenskapen.',
    classroomIntegration: 'V\u00e6rtemaet i 2. klasse kj\u00f8res som langtidsprosjekt: naturfagstimen med vannets kretsl\u00f8p og v\u00e6rsystemer, mattetimen med temperaturberegning og diagrammer, norsktimen med v\u00e6rrapporter og sammenlignende skriving. En klasse-v\u00e6rstasjon gir daglig datamateriale. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, data og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Temperaturberegning (tosifrede tall)', emerging: 'leser av termometer i hele grader med st\u00f8tte', proficient: 'beregner selvstendig temperaturendringer med addisjon og subtraksjon innenfor 100', advanced: 'arbeider med negative temperaturer, beregner daglig temperaturspenn og finner ukesgjennomsnitt' },
      { skill: 'V\u00e6rdatainnsamling og diagramtolkning', emerging: 'registrerer v\u00e6r med forenklede symboler med st\u00f8tte', proficient: 'f\u00f8rer selvstendig v\u00e6rdagbok, lager s\u00f8ylediagram og besvarer analysessp\u00f8rsm\u00e5l', advanced: 'analyserer v\u00e6rdata over flere uker, identifiserer m\u00f8nstre og formulerer begrunnede konklusjoner' },
      { skill: 'V\u00e6rrapport med fagvokabular', emerging: 'skriver 2\u20133 setninger om v\u00e6ret med st\u00f8tte', proficient: 'skriver selvstendig en v\u00e6rrapport med data, observasjoner og konklusjon', advanced: 'skriver sammenlignende v\u00e6rrapport med data fra flere m\u00e5neder og klimaperspektiv' },
    ],
  },

  winter: {
    snippetAnswer: 'Vinter-oppgaver for 2. klasse (7\u20138 \u00e5r) trener negative temperaturer i kontekst, m\u00e5ling av sn\u00f8dybde i cm, dataanalyse av vinterv\u00e6r over tid og selvstendig skriving av vinterforskningsrapporter med observasjoner. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse gir vintertemaet unike matematiske muligheter \u2014 syv- og \u00e5tte\u00e5ringer m\u00f8ter negative tall gjennom temperaturm\u00e5linger (det var minus 8 grader i g\u00e5r og minus 3 i dag \u2014 hvor mye varmere ble det?), m\u00e5ler sn\u00f8dybde i centimeter over vinteren, og analyserer vinterv\u00e6rdata i diagrammer. Multiplikasjon modellerer vinterm\u00f8nstre: 5 dager med 3 cm sn\u00f8fall = 15 cm totalt. Lesetekster dekker norske vintertradisjoner, dyrs vintertilpasninger og aggregattilstander (is, vann, damp). Observasjonsskriving om vinterlandskapet trener beskrivende spr\u00e5k. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, m\u00e5ling og skriftlig fremstilling i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Begynnende forst\u00e5else av negative tall (temperaturkontekst)', howWeAddress: 'Vintertemperaturark der elevene leser av negative temperaturer, sammenligner og beregner forskjeller p\u00e5 tallinje' },
      { milestone: 'M\u00e5ling av sn\u00f8dybde over tid (langtidsobservasjon i cm)', howWeAddress: 'Sn\u00f8dagbok der elevene m\u00e5ler ukentlig sn\u00f8dybde, registrerer data og lager vekstkurve' },
      { milestone: 'Aggregattilstander i kontekst (is, vann, damp)', howWeAddress: 'Eksperimentark der elevene observerer is som smelter, m\u00e5ler vannmengde og forklarer endringen med fagord' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk kun positive temperaturer ned til null, m\u00e5l sn\u00f8 i hele centimeter og tilby forenklede observasjonsmaler. For avanserte elever i 2. klasse tilf\u00f8yes beregning med negative tall p\u00e5 tallinje, m\u00e5ling i millimeter og selvstendig vinterforskningsrapport med eksperimentbeskrivelse.',
    parentTakeaway: 'Gj\u00f8r vinteren til et vitenskapsprosjekt: m\u00e5l sn\u00f8dybden med meterstokk hver uke og lag et diagram. Les av utetemperaturet: \u00abminus 5 i g\u00e5r og minus 2 i dag \u2014 hvor mye varmere?\u00bb Frys vann i ulike former og m\u00e5l: \u00abhvor mye plass tar isen vs. vannet?\u00bb Vinteren er det beste laboratoriet for naturfag.',
    classroomIntegration: 'Vintertemaet i 2. klasse kj\u00f8res som langsg\u00e5ende vinterprosjekt: naturfagstimen med aggregattilstander og dyrs vintertilpasninger, mattetimen med negative tall og sn\u00f8m\u00e5linger, norsktimen med vinterbeskrivelser og forskningsrapporter, utetimen med praktisk observasjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, m\u00e5ling og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Negative tall (temperaturkontekst)', emerging: 'leser av temperaturer ned til null med st\u00f8tte', proficient: 'leser selvstendig negative temperaturer, sammenligner og beregner forskjell p\u00e5 tallinje', advanced: 'beregner temperaturendringer mellom negative og positive tall og forklarer tallinjekonseptet' },
      { skill: 'Sn\u00f8dybdem\u00e5ling over tid', emerging: 'm\u00e5ler sn\u00f8dybde i hele cm med st\u00f8tte', proficient: 'f\u00f8rer selvstendig sn\u00f8dagbok med ukentlige m\u00e5linger og lager diagram', advanced: 'm\u00e5ler presist, beregner endringer og analyserer sammenheng mellom temperatur og sn\u00f8dybde' },
      { skill: 'Vinterforskningsrapport', emerging: 'skriver 3\u20134 observasjoner med st\u00f8tte', proficient: 'skriver selvstendig rapport med vinterobservasjoner, m\u00e5ledata og konklusjon', advanced: 'skriver forskningsrapport med eksperiment, hypotese, resultater og refleksjon' },
    ],
  },

  xmas: {
    snippetAnswer: 'Jule-oppgaver for 2. klasse (7\u20138 \u00e5r) trener gavebudsjett med pengematematikk, tidsberegning med julekalender, m\u00f8nstergjenkjenning i juledekorasjoner og selvstendig skriving av julfortellinger med spenningskurve. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse gir juletemaet rikt matematisk innhold \u2014 syv- og \u00e5tte\u00e5ringer planlegger gavebudsjetter med addisjon og subtraksjon innenfor 100, beregner nedtelling med julekalender (24. desember minus dagens dato = dager igjen), og analyserer symmetrim\u00f8nstre i julepynt og snj\u00f8krystaller. Multiplikasjon brukes i julekontekst: 8 familiemedlemmer med 3 gaver = 24 gaver. Lesetekster dekker norske juletradisjoner, julefeiringens historie og julefortellinger. Narrativ skriving med juleeventyr trener struktur og beskrivende spr\u00e5k. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for pengematematikk, m\u00f8nster og kreativ skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Gavebudsjett med pengematematikk (planlegge og prioritere)', howWeAddress: 'Julebudsjettark der elevene planlegger gaveinnkj\u00f8p med begrenset bel\u00f8p, adderer priser og prioriterer' },
      { milestone: 'Nedtellingsberegning med datoer (subtraksjon i kontekst)', howWeAddress: 'Julekalenderark der elevene beregner antall dager igjen til jul og planlegger aktiviteter for hver uke' },
      { milestone: 'Symmetrim\u00f8nstre i juledekorasjon (gjenkjenne og lage)', howWeAddress: 'Juledekorasjonsark der elevene identifiserer symmetrilinjer i sn\u00f8krystaller og designer egne symmetriske m\u00f8nstre' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk priser i hele tier-kroner innenfor 50, enkel nedtelling og forenklede symmetrim\u00f8nstre. For avanserte elever i 2. klasse tilf\u00f8yes detaljert budsjettplanlegging med begrensninger, beregning av tidsperioder i uker og dager, og komplekse symmetriske juledesign.',
    parentTakeaway: 'Gj\u00f8r juleplanleggingen til matematikk: la barnet planlegge et gavebudsjett p\u00e5 200 kr \u2014 \u00abhva kan du kj\u00f8pe og hva blir til overs?\u00bb Tell ned til jul: \u00abdagens dato er 8. desember, juleaften er 24. \u2014 hvor mange dager?\u00bb Klipp symmetriske sn\u00f8krystaller og finn symmetrilinjene. Julematematikk er \u00e5rets mest motiverende.',
    classroomIntegration: 'Juletemaet i 2. klasse integreres i desemberprosjekt: mattetimen med gavebudsjett og julekalender, norsktimen med juleeventyr og tradisjonstekster, kunsttimen med symmetriske dekorasjoner. Klassens juleverksted gir praktisk kontekst for all l\u00e6ring. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for penger, m\u00f8nster og kreativ skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Gavebudsjett (pengematematikk)', emerging: 'adderer to priser i hele kroner med st\u00f8tte', proficient: 'planlegger selvstendig et budsjett med flere poster og holder seg innenfor rammen', advanced: 'l\u00f8ser flertrinnsproblemer med budsjettbegrensning, optimerer valg og forklarer strategien' },
      { skill: 'Nedtellingsberegning med datoer', emerging: 'teller dager p\u00e5 kalender med st\u00f8tte', proficient: 'beregner selvstendig antall dager mellom to datoer og planlegger et tidsforl\u00f8p', advanced: 'beregner tidsperioder i uker og dager, konverterer og l\u00f8ser kalenderproblemer' },
      { skill: 'Juleeventyr (narrativ skriving)', emerging: 'skriver en kort julfortelling med begynnelse og slutt med st\u00f8tte', proficient: 'skriver selvstendig et juleeventyr med innledning, handling og avslutning', advanced: 'skriver et detaljert juleeventyr med spenningskurve, dialog og beskrivende spr\u00e5k' },
    ],
  },

  zoo: {
    snippetAnswer: 'Dyrehage-oppgaver for 2. klasse (7\u20138 \u00e5r) trener billettberegning med flertrinnsproblemer, sammenligning av dyrearter med Venn-diagrammer, kartlesing av dyrehagekart og selvstendig skriving av dyrehageforskningsrapporter med data. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir dyrehagetemaet et avansert tverrfaglig prosjekt \u2014 syv- og \u00e5tte\u00e5ringer beregner billettpriser for familier med flertrinnsproblemer (2 voksne \u00e0 120 kr + 3 barn \u00e0 60 kr = ?), leser dyrehagekart med avstandsn\u00f8kkel, og sammenligner dyrearter med Venn-diagrammer og tabeller med flere kriterier. Multiplikasjon modellerer f\u00f4ringsdata: 5 dyr med 3 kg f\u00f4r = 15 kg per dag. Lesetekster dekker dyrehagenes bevaringsarbeid, truede arter og dyrevelfer. Argumenterende skriving (\u00abhvorfor er dyrehager viktige?\u00bb) trener saklig begrunnelse. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, naturfag og skriftlig argumentasjon i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnsproblemer med billettpriser (multiplikasjon og addisjon)', howWeAddress: 'Billettberegningsark der elevene beregner totalpris for familier med ulike sammensetninger og rabatter' },
      { milestone: 'Sammenligning med Venn-diagram (flere kriterier)', howWeAddress: 'Dyresammenligningsark der elevene sammenligner to arter etter kost, levested, st\u00f8rrelse og klasse i Venn-diagram' },
      { milestone: 'Kartlesing med avstandsn\u00f8kkel (dyrehagekart)', howWeAddress: 'Dyrehagekartark der elevene planlegger ruter, m\u00e5ler avstander med n\u00f8kkel og beregner total gangavstand' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle billetpriser med hele hundrekroner, forenklede Venn-diagrammer med to kriterier og dyrehagekart med f\u00e6rre utstillinger. For avanserte elever i 2. klasse tilf\u00f8yes billetberegning med rabatter, Venn-diagrammer med fire kriterier og selvstendig dyrehageforskningsrapport med bevaringsdata.',
    parentTakeaway: 'Gj\u00f8r et dyrehagebes\u00f8k til et matteprosjekt: beregn billettpriser f\u00f8r dere g\u00e5r (\u00ab2 voksne og 2 barn \u2014 hva koster det totalt?\u00bb), bruk kartet til \u00e5 planlegge ruten og m\u00e5l gangavstand. La barnet velge to dyr og sammenligne dem i et Venn-diagram. Dyrehagen er et levende klasserom \u2014 bruk det!',
    classroomIntegration: 'Dyrehagetemaet i 2. klasse integreres som \u00e5rsprosjekt: mattetimen med billettberegning og kartlesing, naturfagstimen med artskunnskap og bevaring, norsktimen med dyrehageforskningsrapporter og argumentasjon. Et virtuelt eller reelt dyrehagebes\u00f8k gir autentisk motivasjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, naturfag og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Billettberegning (flertrinnsproblemer)', emerging: 'beregner pris for \u00e9n type billett med st\u00f8tte', proficient: 'beregner selvstendig totalpris for en familie med b\u00e5de voksne og barn', advanced: 'l\u00f8ser flertrinnsproblemer med rabatter, sammenligner billettpakker og finner billigste alternativ' },
      { skill: 'Dyresammenligning med Venn-diagram', emerging: 'plasserer egenskaper i to grupper med st\u00f8tte', proficient: 'lager selvstendig Venn-diagram med to arter og flere kriterier', advanced: 'analyserer likheter og forskjeller, trekker konklusjoner og presenterer funn skriftlig' },
      { skill: 'Dyrehageforskningsrapport', emerging: 'skriver 3\u20134 fakta om et dyr med st\u00f8tte', proficient: 'skriver selvstendig rapport med innledning, fakta, data og konklusjon', advanced: 'skriver detaljert forskningsrapport med bevaringsdata, argumentasjon og kildehenvisning' },
    ],
  },
};

// \u2500\u2500 helpers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function buildInsertionText(data) {
  const lines = [];
  lines.push('');
  lines.push(`      snippetAnswer: '${esc(data.snippetAnswer)}',`);
  lines.push(`      uniqueGradeAngle: '${esc(data.uniqueGradeAngle)}',`);

  // developmentalMilestones
  lines.push('      developmentalMilestones: [');
  for (const m of data.developmentalMilestones) {
    lines.push(`        { milestone: '${esc(m.milestone)}', howWeAddress: '${esc(m.howWeAddress)}' },`);
  }
  lines.push('      ],');

  lines.push(`      differentiationNotes: '${esc(data.differentiationNotes)}',`);
  lines.push(`      parentTakeaway: '${esc(data.parentTakeaway)}',`);
  lines.push(`      classroomIntegration: '${esc(data.classroomIntegration)}',`);

  // assessmentRubric
  lines.push('      assessmentRubric: [');
  for (const r of data.assessmentRubric) {
    lines.push(`        { skill: '${esc(r.skill)}', emerging: '${esc(r.emerging)}', proficient: '${esc(r.proficient)}', advanced: '${esc(r.advanced)}' },`);
  }
  lines.push('      ],');

  return lines.join('\n');
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// \u2500\u2500 main loop \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

let successCount = 0;
let errorCount = 0;
const themes = Object.keys(enrichments);

for (const theme of themes) {
  const filePath = path.join(THEMES_DIR, theme, 'no.ts');

  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${filePath}`);
    errorCount++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Find grade block boundaries
  const secondGradeIdx = content.indexOf("'second-grade'");
  const thirdGradeIdx = content.indexOf("'third-grade'");

  if (secondGradeIdx === -1 || thirdGradeIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/no.ts`);
    errorCount++;
    continue;
  }

  // Check if snippetAnswer already exists in second-grade block
  const secondGradeBlock = content.substring(secondGradeIdx, thirdGradeIdx);
  if (secondGradeBlock.includes('snippetAnswer')) {
    console.log(`SKIP (already enriched): ${theme}/no.ts`);
    continue;
  }

  // Find the last "],\n" in the second-grade block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(secondGradeBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/no.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = secondGradeIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/no.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
