#!/usr/bin/env node
/**
 * SEO Part 262: NO Second-Grade Enrichment \u2014 Themes 1-25
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the second-grade grade block of 25 NO theme files (alphabet through household).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    snippetAnswer: 'Alfabet-oppgaver for 2. klasse (7\u20138 \u00e5r) styrker avansert staving med ordfamilier, morfologisk analyse med forstavelser og endelser, oppslagsferdigheter i ordbok og systematisk vokabularutvidelse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse er alfabetet ikke lenger noe som l\u00e6res \u2014 det er et verkt\u00f8y som brukes strategisk. Syv- og \u00e5tte\u00e5ringer avkoder flerstavelsesord ved \u00e5 dele dem i forstavelser, rotord og endelser (u-venn-lig, gjen-bruk-s-stasjon), anvender stavekonvensjoner for lange vokaler og dobbeltkonsonanter, og sl\u00e5r opp ord i ordbok ved hjelp av andre og tredje bokstav. Ordoppstokking med flerstavelsesord krever b\u00e5de fonologisk og morfologisk bevissthet. Kryssord uten ordbanker tvinger selvstendig staving. Ords\u00f8k med fagvokabular fra naturfag og matematikk utvider tverrfaglig ordkunnskap. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for lesing, staving og ordforr\u00e5d i 2. trinn st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'Morfologisk analyse (7\u20138-\u00e5ringer gjenkjenner forstavelser, rotord og endelser som meningsb\u00e6rende enheter)', howWeAddress: 'Orddelingsark der elevene deler ord i forstavelse + rot + endelse og forklarer betydningen av hver del' },
      { milestone: 'Oppslagsferdigheter i ordbok (bruk av andre og tredje bokstav til presis lokalisering)', howWeAddress: 'Ordboks\u00f8velser med ordlister der elevene ordner etter andre/tredje bokstav og sl\u00e5r opp definisjoner' },
      { milestone: 'Stavekonvensjoner for dobbeltkonsonant og lang vokal (regelbasert staving)', howWeAddress: 'Stavesorteringsark der elevene grupperer ord etter vokalm\u00f8nster og formulerer staveregelen' },
      { milestone: 'Flytende lesing av flerstavelsesord (automatisk avkoding av komplekse ord)', howWeAddress: 'Ordoppstokking og kryssord med flerstavelsesord trener rask, presis avkoding og staving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tostavelsesord, tilby ordbanker ved kryssord og bruk fargekoding av forstavelser og endelser. For avanserte elever i 2. klasse fjernes ordbanker helt, og trestavelsesord med flere affikser legges til. Elevene skriver egne ordfamilieplakater med rot, forstavelse og endelse.',
    parentTakeaway: 'Lek \u00aborddetektiv\u00bb hjemme: finn rotordet i uvennlig, gjenbruke, urettferdig. Sl\u00e5 opp et nytt ord i ordboken sammen og les definisjonen h\u00f8yt. Spill ordoppstokking med bokstavmagneter og bruk flerstavelsesord. Hver gang barnet oppdager et m\u00f8nster i spr\u00e5ket, vokser ordforr\u00e5det eksponentielt.',
    classroomIntegration: 'Alfabetoppgaver i 2. klasse fungerer som spr\u00e5kverkt\u00f8y p\u00e5 tvers av fag: orddelingsark introduserer fagord f\u00f8r en leksjon, stavesorteringsark forsterker ukens stavefokus, ordboks\u00f8velser brukes i forskningstimer, og kryssord fungerer som morgenoppvarming. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for lesing, staving og ordforr\u00e5d st\u00f8ttes systematisk.',
    assessmentRubric: [
      { skill: 'Morfologisk analyse (forstavelser, rotord, endelser)', emerging: 'identifiserer rotordet i sammensatte ord med st\u00f8tte', proficient: 'deler selvstendig ord i forstavelse, rot og endelse og forklarer betydningen', advanced: 'anvender morfologisk analyse p\u00e5 ukjente ord og danner nye ord med samme rotord' },
      { skill: 'Oppslagsferdigheter og alfabetisk ordning', emerging: 'ordner ord etter f\u00f8rstebokstav og finner ord i en enkel ordliste', proficient: 'ordner etter andre og tredje bokstav og sl\u00e5r selvstendig opp ord i ordbok', advanced: 'bruker oppslagsord, tolker flere definisjoner og velger den korrekte i kontekst' },
      { skill: 'Stavekonvensjoner og m\u00f8nstre', emerging: 'staver lydrette tostavelsesord med st\u00f8tte fra staveregelen', proficient: 'anvender selvstendig staveregler for dobbeltkonsonant og lang vokal i diktat og fri skriving', advanced: 'overf\u00f8rer staveregler til ukjente ord, forklarer regelen og retter egne feil strategisk' },
    ],
  },

  animals: {
    snippetAnswer: 'Dyre-oppgaver for 2. klasse (7\u20138 \u00e5r) trener addisjon og subtraksjon innenfor 100, systematisk dyreforskning med notater, sammenlignende analyse i tabeller og selvstendig skriving av dyreforskningsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r dyretemaet fra faktalesing til systematisk forskning \u2014 syv- og \u00e5tte\u00e5ringer kan samle inn og organisere dyredata i tabeller, sammenligne arter p\u00e5 tvers av flere kriterier og skrive strukturerte forskningsrapporter med innledning, fakta og konklusjon. Addisjon og subtraksjon innenfor 100 med dyrepopulasjonsdata gir flertrinnsproblemer med tierovergang. Multiplikasjon som gjentatt addisjon introduseres med dyregrupper (5 akvarier med 4 fisker = ?). S\u00f8ylediagrammer med doble s\u00f8yler sammenligner to dyregrupper. Dyreklassifikasjon utvides til virveldyr og virvellose dyr med undergrupper. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og skriftlig rapportering i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Addisjon/subtraksjon innenfor 100 (7\u20138-\u00e5ringer mestrer tierovergang med tosifrede tall)', howWeAddress: 'Dyrepopulasjonsoppgaver med tall innenfor 100 gir kontekstualisert regning med tierovergang' },
      { milestone: 'Multiplikasjon som gjentatt addisjon (begynnende gangetenkning)', howWeAddress: 'Dyregrupperingsark (6 bur med 3 kaniner) gir konkret forst\u00e5else av multiplikasjon som gjentatt addisjon' },
      { milestone: 'Strukturert forskningsrapport (innledning, hoveddel, konklusjon)', howWeAddress: 'Dyreforsknings-maler med tre seksjoner veileder elevene fra datainnsamling til skriftlig konklusjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, hold regning innenfor 50, bruk tallinje til tierovergang, og tilby rapportmaler med setningsstartere. For avanserte elever i 2. klasse legges til regning innenfor 200, multiplikasjonstabeller og selvstendig dyreforskningsrapport med datadiagrammer og kildehenvisning.',
    parentTakeaway: 'Start et hjemme-dyreforskningsprosjekt: velg et dyr, finn fem fakta i en bok eller p\u00e5 biblioteket, skriv dem i en tabell, og lag en rapport. Regn med dyretall: \u00ab47 pingviner p\u00e5 isen, 28 hopper i vannet \u2014 hvor mange er igjen?\u00bb Dyreinteressen er den sterkeste motoren for selvstendig forskning.',
    classroomIntegration: 'Dyretemaet i 2. klasse fungerer som \u00e5rsprosjekt med forskningsfokus: naturfagstimen med dyreklassifikasjon og \u00f8kosystemer, matematikktimen med populasjonsdata og multiplikasjon, norsktimen med forskningsrapporter og presentasjoner. Et klasseforskningsbibliotek bygges opp l\u00f8pende. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, regning og skriftlig fremstilling st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Addisjon/subtraksjon innenfor 100 (dyrekontekst)', emerging: 'l\u00f8ser oppgaver innenfor 50 med telleklosser eller tallinje', proficient: 'l\u00f8ser selvstendig oppgaver innenfor 100 med tierovergang i dyrekontekst', advanced: 'l\u00f8ser flertrinnsproblemer innenfor 200 og formulerer egne tekstoppgaver med dyredata' },
      { skill: 'Multiplikasjon som gjentatt addisjon', emerging: 'teller grupper ved gjentatt addisjon med konkreter (3+3+3)', proficient: 'l\u00f8ser selvstendig gjentatt-addisjons-oppgaver og skriver dem som gangestykker (3\u00d74)', advanced: 'anvender multiplikasjon fleksibelt i kontekst og forklarer sammenhengen mellom addisjon og multiplikasjon' },
      { skill: 'Dyreforskningsrapport', emerging: 'skriver 3\u20134 faktasetninger med st\u00f8tte fra mal og ordbank', proficient: 'skriver selvstendig en rapport med innledning, fakta og konklusjon', advanced: 'skriver en detaljert rapport med data, diagrammer, kildehenvisning og perspektivering' },
    ],
  },

  birds: {
    snippetAnswer: 'Fugle-oppgaver for 2. klasse (7\u20138 \u00e5r) trener doble s\u00f8ylediagrammer, multiplikasjon med fugledata, systematisk artsgjenkjenning og selvstendig skriving av fugleforskningsrapporter med data og konklusjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir fugletemaet et avansert dataforskningsprosjekt \u2014 syv- og \u00e5tte\u00e5ringer kan gjennomf\u00f8re m\u00e5nedlige fugletelllinger, registrere resultater i doble s\u00f8ylediagrammer (januar vs. februar) og analysere endringer over tid. Multiplikasjon med fugledata (4 reir med 5 egg = ?) gir konkret gangetenkning. Systematisk artsbestemmelse med bestemmelsesn\u00f8kkel introduserer vitenskapelig metode. Addisjon og subtraksjon innenfor 100 med trekkfugledata gir realistiske flertrinnsproblemer. Fuglefakta-rapporter med kildehenvisning og konklusjon trener faglitter\u00e6r rapportering p\u00e5 h\u00f8yere niv\u00e5. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, data og skriftlig rapportering i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Doble s\u00f8ylediagrammer (7\u20138-\u00e5ringer kan sammenligne to datasett visuelt)', howWeAddress: 'Fugletellings-diagrammer med to s\u00f8yler per fugleart (m\u00e5ned 1 vs. m\u00e5ned 2) trener sammenlignende dataanalyse' },
      { milestone: 'Multiplikasjon med naturdata (gjentatt addisjon i kontekst)', howWeAddress: 'Fuglereir-oppgaver (7 reir med 4 egg) gir multiplikasjon som gjentatt addisjon med autentiske data' },
      { milestone: 'Systematisk artsbestemmelse (bruk av bestemmelsesn\u00f8kkel)', howWeAddress: 'Fuglebestemmelses-ark med ja/nei-sp\u00f8rsm\u00e5l (r\u00f8dt bryst? lang hale?) introduserer systematisk klassifikasjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle s\u00f8ylediagrammer med tre arter, hold multiplikasjon ved 2-gangen, og tilby artsbestemmelse med kun fire fugler. For avanserte elever i 2. klasse legges til tredoble diagrammer, multiplikasjon i 5- og 10-gangen, og selvstendig fugleforskningsrapport med hypotese og konklusjon.',
    parentTakeaway: 'F\u00f8r en fugle-forskningsdagbok: tell fugler ved fuglebrettet hver helg og lag et dobbelt s\u00f8ylediagram (denne uken vs. forrige uke). Regn med reir: \u00ab3 reir med 5 egg \u2014 hvor mange til sammen?\u00bb Bruk en fuglebok til artsbestemmelse. Systematisk observasjon er den beste forskningstreninga.',
    classroomIntegration: 'Fugletemaet i 2. klasse kj\u00f8rer som \u00e5rsprosjekt med m\u00e5nedlige datainnsamlinger: matematikktimen analyserer fugledata med diagrammer og multiplikasjon, naturfagstimen bestemmer arter og studerer trekkm\u00f8nstre, norsktimen skriver fugleforskningsrapporter. En klassefugle-database bygges opp digitalt eller analogt. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for data, naturfag og rapportskriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Doble s\u00f8ylediagrammer (fugledata)', emerging: 'avleser et enkelt s\u00f8ylediagram med st\u00f8tte og besvarer sp\u00f8rsm\u00e5l', proficient: 'oppretter og avleser selvstendig doble s\u00f8ylediagrammer og sammenligner data', advanced: 'analyserer tendenser over tid, formulerer konklusjoner og foresl\u00e5r forklaringer' },
      { skill: 'Multiplikasjon med fugledata', emerging: 'l\u00f8ser gjentatt addisjon (4+4+4) med konkreter og bildest\u00f8tte', proficient: 'skriver selvstendig gjentatt addisjon som gangestykke og l\u00f8ser oppgaver i 2-, 5- og 10-gangen', advanced: 'anvender multiplikasjon fleksibelt i nye kontekster og verifiserer med gjentatt addisjon' },
      { skill: 'Fugleforskningsrapport', emerging: 'skriver 3\u20134 setninger med st\u00f8tte fra mal og ordbank', proficient: 'skriver selvstendig en rapport med data, observasjon og konklusjon', advanced: 'skriver en detaljert rapport med hypotese, metode, resultater og perspektivering' },
    ],
  },

  birthday: {
    snippetAnswer: 'Bursdags-oppgaver for 2. klasse (7\u20138 \u00e5r) trener posisjonsverdi til 1000, pengematematikk med budsjett, klokkeslett og tidsberegning samt selvstendig skriving av festplanlegging med flere avsnitt. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse f\u00e5r bursdagstemaet avansert matematisk dybde \u2014 syv- og \u00e5tte\u00e5ringer arbeider med posisjonsverdi til 1000 (et bursdagsmaraton samlet inn 365 kr.), pengematematikk med budsjettering (50 kr. til gaver, 80 kr. til kake \u2014 hva koster festen?), og tidsberegning med klokkeslett (festen starter kl. 14:00, varer 2\u00bd time \u2014 n\u00e5r slutter den?). Multiplikasjon med festgjenstander (8 gjester med 3 ballonger = ?) gir gjentatt addisjon i festkontekst. Skriving av festinvitasjoner og festbeskrivelser krever flere avsnitt med detaljer om tid, sted og aktiviteter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for posisjonsverdi, penger, tid og skriftlig kommunikasjon i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Posisjonsverdi til 1000 (7\u20138-\u00e5ringer forst\u00e5r hundrere, tiere og enere)', howWeAddress: 'Bursdagstall-ark der elevene deler opp priser og bel\u00f8p i hundrere, tiere og enere med festkontekst' },
      { milestone: 'Pengematematikk med budsjett (addisjon/subtraksjon med kroner og \u00f8re)', howWeAddress: 'Festbudsjett-ark der elevene planlegger innkj\u00f8p, legger sammen priser og finner vekslepenger' },
      { milestone: 'Tidsberegning med klokkeslett (varighet i timer og minutter)', howWeAddress: 'Festprogram-ark med start- og sluttider der elevene beregner varighet og planlegger et tidsforl\u00f8p' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, hold posisjonsverdi innenfor 100, bruk hele kroner uten \u00f8re, og gi tidsberegning med hele timer. For avanserte elever i 2. klasse legges til posisjonsverdi til 1000 med veksling, prisberegning med \u00f8re og desimaltall, og tidsberegning med halve og kvarte timer i komplekse festprogrammer.',
    parentTakeaway: 'Planlegg barnets bursdag som et matteprosjekt: lag et budsjett p\u00e5 300 kr. og regn sammen (kake 85 kr. + pynt 45 kr. + gaver 120 kr.). Beregn tider: \u00abfesten starter kl. 14 og varer 2\u00bd time \u2014 n\u00e5r m\u00e5 vi rydde opp?\u00bb Multipliser: \u00ab8 gjester med 3 godteposer.\u00bb Festmatematikk er den morsomste matematikken.',
    classroomIntegration: 'Bursdagstemaet i 2. klasse driver tverrfaglig l\u00e6ring: matematikktimen med budsjett, posisjonsverdi og klokkeslett, norsktimen med invitasjonsskriving og festbeskrivelser, og kunst og h\u00e5ndverk med festdekorasjoner og planlegging. Elevene planlegger en klassefest som fellesprosjekt. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tallforst\u00e5else, m\u00e5ling og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Posisjonsverdi og pengeregning (festkontekst)', emerging: 'identifiserer tiere og enere innenfor 100 med st\u00f8tte', proficient: 'arbeider selvstendig med hundrere, tiere og enere og beregner festbudsjett med kroner', advanced: 'l\u00f8ser flertrinnsproblemer med posisjonsverdi til 1000, \u00f8re og vekslepenger' },
      { skill: 'Tidsberegning med klokkeslett', emerging: 'leser hele timer p\u00e5 klokken og beregner varighet med hele timer', proficient: 'leser halve og kvarte timer og beregner varighet i timer og minutter', advanced: 'planlegger komplekse festprogrammer med flere aktiviteter og beregner n\u00f8yaktige tider' },
      { skill: 'Festbeskrivelse og invitasjonsskriving', emerging: 'skriver en invitasjon med st\u00f8tte fra mal med felt for tid, sted, aktivitet', proficient: 'skriver selvstendig en invitasjon og en festbeskrivelse med flere avsnitt', advanced: 'skriver detaljerte festbeskrivelser med innledning, handlingsforl\u00f8p og refleksjon' },
    ],
  },

  body: {
    snippetAnswer: 'Kropp-oppgaver for 2. klasse (7\u20138 \u00e5r) trener m\u00e5ling av kroppsdeler i centimeter, organsystemer med enkel anatomi, datainnsamling med s\u00f8ylediagrammer og selvstendig skriving av helserapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r kroppstemaet fra ytre deler til indre systemer \u2014 syv- og \u00e5tte\u00e5ringer l\u00e6rer om fordeling av n\u00e6ringsstoffer via blod\u00e5rer, lunger som gassutveksler og skjelett som bevegelsesapparat. M\u00e5ling med centimeter og meter anvendes p\u00e5 kroppsdeler (armspenn, fotstorrelse, h\u00f8yde), og data registreres i tabeller og s\u00f8ylediagrammer for klassesammenligning. Addisjon og subtraksjon innenfor 100 med kroppsdata gir realistiske flertrinnsproblemer. Multiplikasjon introduseres gjennom kroppssymmetri (2 armer med 5 fingre = ?). Skriving av helsebrosjyrer og kroppsrapporter krever faglig presisjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for kropp og helse, m\u00e5ling og sakprosaskriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'M\u00e5ling med standardenheter (7\u20138-\u00e5ringer m\u00e5ler i centimeter og meter)', howWeAddress: 'Kroppsm\u00e5lings-ark der elevene m\u00e5ler armspenn, fotstorrelse og h\u00f8yde med m\u00e5leb\u00e5nd og linjal' },
      { milestone: 'Grunnleggende organkunnskap (hjerte, lunger, skjelett som systemer)', howWeAddress: 'Anatomiark med diagrammer der elevene navngir organer og forklarer funksjonen med egne ord' },
      { milestone: 'Datainnsamling og -presentasjon (tabeller og s\u00f8ylediagrammer med kroppsdata)', howWeAddress: 'Klassens kroppsdata-prosjekt der elevene m\u00e5ler, registrerer i tabell og tegner s\u00f8ylediagram' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, fokuser p\u00e5 ytre kroppsdeler og hele centimeter, bruk forh\u00e5ndslagde diagrammer og tilby ordbanker til rapportskriving. For avanserte elever i 2. klasse legges til organsystemer med sammenhenger, m\u00e5ling i millimeter og selvstendig skriving av helsebrosjyrer med fakta og r\u00e5d.',
    parentTakeaway: 'Gj\u00f8r kroppen til et hjemmelaboratorium: m\u00e5l barnets h\u00f8yde, armspenn og fotstorrelse og f\u00f8r en vekstlogg. Lek \u00aborganjakt\u00bb: kjenn hjertet sl\u00e5 etter l\u00f8ping, pust dypt og kjenn lungene utvide seg. Lag en kroppsplakat med data og fakta \u2014 f\u00f8rsteh\u00e5ndskunnskap sitter bedre enn lesing.',
    classroomIntegration: 'Kroppstemaet i 2. klasse integrerer naturfag (organsystemer), matematikk (m\u00e5ling, data, multiplikasjon) og norsk (rapportskriving) i et \u00e5rsprosjekt. Elevene m\u00e5ler seg selv, bygger klassestatistikk, l\u00e6rer anatomi og skriver helsebrosjyrer. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for kropp og helse, m\u00e5ling og skriving st\u00f8ttes helhetlig.',
    assessmentRubric: [
      { skill: 'M\u00e5ling med standardenheter (kroppskontekst)', emerging: 'm\u00e5ler kroppsdeler med st\u00f8tte og rapporterer i hele centimeter', proficient: 'm\u00e5ler selvstendig med m\u00e5leb\u00e5nd og linjal og registrerer data i tabell', advanced: 'm\u00e5ler presist i millimeter, sammenligner data og trekker konklusjoner fra klassestatistikk' },
      { skill: 'Organkunnskap og kroppssystemer', emerging: 'navngir de viktigste organene med st\u00f8tte fra diagram', proficient: 'forklarer selvstendig funksjonen til hjerte, lunger og skjelett med egne ord', advanced: 'beskriver sammenhenger mellom organsystemer og forklarer hvordan de samarbeider' },
      { skill: 'Helsebrosjyre og kroppsrapport', emerging: 'skriver 3\u20134 setninger om kroppen med st\u00f8tte fra ordbank', proficient: 'skriver selvstendig en rapport med fakta, data og helsetips', advanced: 'skriver en detaljert helsebrosjyre med fakta, diagrammer og begrunnede r\u00e5d' },
    ],
  },

  camping: {
    snippetAnswer: 'Camping-oppgaver for 2. klasse (7\u20138 \u00e5r) trener kartlesing med enkel koordinatnavigasjon, m\u00e5ling av teltpinner og turstier, naturforskning med artsobservasjon og selvstendig skriving av turdagb\u00f8ker. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir campingtemaet et tverrfaglig friluftsprosjekt \u2014 syv- og \u00e5tte\u00e5ringer leser enkle kart med rutenettkoordinater, m\u00e5ler avstander med linjal og m\u00e5leb\u00e5nd, og anvender addisjon og subtraksjon innenfor 100 p\u00e5 turplanlegging (avstand, forbruk, pakkelister). Multiplikasjon med campingutstyr (4 telt med 6 plugger = ?) gir gjentatt addisjon i friluftkontekst. Naturforskning med systematisk artsobservasjon og registrering i feltdagbok kobler direkte til Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig utforsking. Skriving av turdagb\u00f8ker med dato, v\u00e6r, observasjoner og refleksjon trener strukturert faglitter\u00e6r skriving i 2. trinn.',
    developmentalMilestones: [
      { milestone: 'Enkel kartlesing med rutenettkoordinater (7\u20138-\u00e5ringer navigerer med kolonner og rader)', howWeAddress: 'Campingkart-ark der elevene finner leirplasser, stier og vannkilder ved hjelp av rutenettkoordinater' },
      { milestone: 'Avstandsm\u00e5ling med standardenheter (m\u00e5ling i cm og m p\u00e5 kart og terreng)', howWeAddress: 'Turstikart-oppgaver der elevene m\u00e5ler avstand p\u00e5 kart med linjal og beregner reell avstand' },
      { milestone: 'Feltdagbok-skriving (strukturert registrering av observasjoner)', howWeAddress: 'Feltdagbok-maler med felt for dato, v\u00e6r, arter og refleksjon veileder systematisk naturskriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle kart med f\u00e5 symboler, hold regning innenfor 50, og tilby setningsstartere til dagbokskriving. For avanserte elever i 2. klasse legges til avansert kartnavigasjon med kompassretninger, flertrinnsproblemer med turplanlegging og selvstendig skriving av naturforskningsrapporter.',
    parentTakeaway: 'En campingtur er et komplett klassrom: les kartet sammen, m\u00e5l teltplassen i skritt og meter, tell fugler og planter, og f\u00f8r en turdagbok med dato og v\u00e6r. Regn med proviant: \u00ab3 dager med 4 brikkjuice per dag \u2014 hvor mange pakker?\u00bb Friluftsliv er den beste tverrfaglige undervisningen.',
    classroomIntegration: 'Campingtemaet i 2. klasse gir tverrfaglig l\u00e6ring: matematikk med kartkoordinater, m\u00e5ling og multiplikasjon, naturfag med artsobservasjon og feltdagbok, og norsk med turdagbok og turplanlegging. En simulert campingtur p\u00e5 skoleg\u00e5rden integrerer alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for utforsking, data og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Kartlesing og koordinatnavigasjon', emerging: 'finner steder p\u00e5 et enkelt kart med st\u00f8tte', proficient: 'bruker selvstendig rutenettkoordinater til \u00e5 finne og beskrive steder p\u00e5 campingkartet', advanced: 'navigerer med kompassretninger, m\u00e5ler avstander p\u00e5 kart og planlegger ruter selvstendig' },
      { skill: 'M\u00e5ling og beregning (campingkontekst)', emerging: 'l\u00f8ser addisjonsoppgaver innenfor 50 med campingkontekst', proficient: 'l\u00f8ser flertrinnsproblemer innenfor 100 med m\u00e5ling og gjentatt addisjon', advanced: 'planlegger en komplett campingtur med budsjett, avstand og tidsberegning' },
      { skill: 'Turdagbok og feltdagbok', emerging: 'skriver 3\u20134 setninger om turen med st\u00f8tte fra mal', proficient: 'skriver selvstendig en turdagbok med dato, v\u00e6r, observasjoner og refleksjon', advanced: 'skriver en detaljert feltrapport med artsregistreringer, data og vitenskapelige konklusjoner' },
    ],
  },

  circus: {
    snippetAnswer: 'Sirkus-oppgaver for 2. klasse (7\u20138 \u00e5r) trener multiplikasjon med billettsalg, geometriske m\u00f8nstre i sirkusarenaen, sekvensplanlegging av forestillinger og selvstendig skriving av anmeldelser og fortellinger. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir sirkustemaet en plattform for multiplikasjon, geometri og kreativ skriving \u2014 syv- og \u00e5tte\u00e5ringer beregner billettsalg (5 rader med 8 seter = ?), analyserer geometriske m\u00f8nstre i manesjen (symmetri, rotasjon, frise), og planlegger forestillingsrekkef\u00f8lge med tidsberegning. Addisjon og subtraksjon innenfor 100 med sirkusdata (solgte billetter, artister, kostymekostnader) gir realistiske flertrinnsproblemer. Lesing av sirkusanmeldelser trener kritisk lesing og meningsytring. Kreativ skriving av sirkusfortellinger med innledning, midtdel og slutt bygger narrativ kompetanse. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, m\u00f8nstre og kreativ skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med rader og kolonner (7\u20138-\u00e5ringer forst\u00e5r array-modellen)', howWeAddress: 'Sirkussete-ark med rader og kolonner der elevene beregner totalt antall seter og billetter' },
      { milestone: 'Geometriske m\u00f8nstre og symmetri (gjenkjenning og opprettelse av gjentatte m\u00f8nstre)', howWeAddress: 'Sirkusarena-m\u00f8nstre der elevene identifiserer, fortsetter og skaper symmetriske m\u00f8nstre' },
      { milestone: 'Narrativ skriving med struktur (fortelling med innledning, midtdel, slutt)', howWeAddress: 'Sirkusfortelling-maler der elevene planlegger og skriver en fortelling med tre tydelige deler' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk sm\u00e5 arrayer (2\u00d73, 3\u00d74), tilby m\u00f8nsterkort som hjelp og gi fortellingsskjeletter med setningsstartere. For avanserte elever i 2. klasse legges til st\u00f8rre arrayer (6\u00d78, 7\u00d79), komplekse friser med rotasjon og selvstendig skriving av sirkusanmeldelser med begrunnede meninger.',
    parentTakeaway: 'Bes\u00f8k et sirkus eller se en forestilling p\u00e5 video: tell rader og seter og regn ut totalt antall. Lag et sirkusprogram hjemme med tidsplan. Skriv en anmeldelse sammen: hva var best, og hvorfor? Sirkustemaet gj\u00f8r multiplikasjon, m\u00f8nstre og skriving magisk.',
    classroomIntegration: 'Sirkustemaet i 2. klasse kobler matematikk (multiplikasjon, m\u00f8nstre, tidsberegning), norsk (fortelling og anmeldelse) og kunst og h\u00e5ndverk (kostymer og plakater) i et forestillingsprosjekt. Elevene planlegger og gjennomf\u00f8rer en klassesirkus. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, m\u00f8nstre og kreativ skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med arrayer (sirkuskontekst)', emerging: 'teller rader og kolonner med st\u00f8tte og l\u00f8ser sm\u00e5 arrayer (2\u00d73)', proficient: 'l\u00f8ser selvstendig array-oppgaver og skriver gangestykker for sirkusscenarier', advanced: 'l\u00f8ser flertrinnsproblemer med multiplikasjon og anvender arrayer fleksibelt' },
      { skill: 'Geometriske m\u00f8nstre og symmetri', emerging: 'gjenkjenner og fortsetter enkle m\u00f8nstre med st\u00f8tte', proficient: 'identifiserer selvstendig symmetri og skaper gjentatte m\u00f8nstre', advanced: 'skaper komplekse friser med rotasjon og forklarer m\u00f8nsterreglene' },
      { skill: 'Sirkusfortelling og anmeldelse', emerging: 'skriver 3\u20134 setninger om sirkus med st\u00f8tte fra fortellingsskjelett', proficient: 'skriver selvstendig en fortelling med innledning, midtdel og slutt', advanced: 'skriver en detaljert anmeldelse med begrunnede meninger og en kreativ fortelling med dialog' },
    ],
  },

  clothing: {
    snippetAnswer: 'Kl\u00e6r-oppgaver for 2. klasse (7\u20138 \u00e5r) trener pengematematikk med kl\u00e6sbudsjett, m\u00e5ling av kl\u00e6sst\u00f8rrelser i centimeter, sortering etter materiale og funksjon, og selvstendig skriving av kl\u00e6sbeskrivelser og moteanmeldelser. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir kl\u00e6stemaet et praktisk matematikk- og spr\u00e5kprosjekt \u2014 syv- og \u00e5tte\u00e5ringer beregner kl\u00e6sbudsjett med addisjon og subtraksjon innenfor 100 (bukse 199 kr. + genser 149 kr. = ?), m\u00e5ler kroppsdeler for st\u00f8rrelse i centimeter, og klassifiserer kl\u00e6r etter materiale (ull, bomull, polyester) og funksjon (v\u00e6rbeskyttelse, sport, fest). Multiplikasjon med kl\u00e6sgrupper (4 garderobeknagger med 3 plagg = ?) gir gjentatt addisjon. Lesing av st\u00f8rrelsesveiledninger trener informasjonslesing. Skriving av kl\u00e6sbeskrivelser med adjektiver og sammenligninger styrker beskrivende skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, pengeforst\u00e5else og beskrivende skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Pengematematikk med kl\u00e6sbudsjett (7\u20138-\u00e5ringer beregner priser og vekslepenger)', howWeAddress: 'Kl\u00e6sbutikk-ark der elevene planlegger innkj\u00f8p, legger sammen priser og finner vekslepenger' },
      { milestone: 'M\u00e5ling av kroppsdeler for kl\u00e6sst\u00f8rrelse (cm og m)', howWeAddress: 'St\u00f8rrelsesguide-ark der elevene m\u00e5ler brystvidde, armlegde og beinlengde for \u00e5 finne riktig st\u00f8rrelse' },
      { milestone: 'Materialklassifisering (sortering etter egenskaper)', howWeAddress: 'Materialsorterings-ark der elevene unders\u00f8ker, sorterer og beskriver kl\u00e6smaterialer' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele kroner uten \u00f8re, enkel m\u00e5ling i hele centimeter, og to-tre materialkategorier. For avanserte elever i 2. klasse legges til prisberegning med \u00f8re, m\u00e5ling i millimeter, flertrinnsproblemer med rabatter og selvstendig skriving av kl\u00e6sanmeldelser med begrunnede meninger.',
    parentTakeaway: 'Gj\u00f8r kl\u00e6skj\u00f8p til en mattetime: les prislapper, regn ut totalkostnad, finn vekslepenger. La barnet m\u00e5le seg selv med m\u00e5leb\u00e5nd og finne riktig st\u00f8rrelse i st\u00f8rrelsesveiledningen. Sorter vasket\u00f8y etter materiale og farge. Praktisk matematikk og spr\u00e5k i hverdagen.',
    classroomIntegration: 'Kl\u00e6stemaet i 2. klasse integrerer matematikk (pengeregning, m\u00e5ling, multiplikasjon), naturfag (materialer og egenskaper) og norsk (beskrivende skriving og informasjonslesing) gjennom et kl\u00e6sbutikk-prosjekt. Elevene driver en klassebutikk med prising, m\u00e5ling og kundeservice. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, pengeforst\u00e5else og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Pengematematikk (kl\u00e6skontekst)', emerging: 'legger sammen to priser innenfor 100 med st\u00f8tte', proficient: 'beregner selvstendig kl\u00e6sbudsjett med addisjon, subtraksjon og vekslepenger', advanced: 'l\u00f8ser flertrinnsproblemer med rabatter, sammenligner priser og planlegger budsjett' },
      { skill: 'M\u00e5ling av kroppsdeler (cm og m)', emerging: 'm\u00e5ler i hele centimeter med st\u00f8tte', proficient: 'm\u00e5ler selvstendig med m\u00e5leb\u00e5nd og kobler m\u00e5linger til st\u00f8rrelsesveiledning', advanced: 'm\u00e5ler i millimeter, sammenligner data og trekker konklusjoner om vekst over tid' },
      { skill: 'Kl\u00e6sbeskrivelse og materialsortering', emerging: 'beskriver kl\u00e6r med 2\u20133 adjektiver og sorterer i to grupper', proficient: 'skriver selvstendig detaljerte kl\u00e6sbeskrivelser med materialer, farger og funksjon', advanced: 'skriver kl\u00e6sanmeldelser med sammenligninger og begrunnede meninger om stil og funksjon' },
    ],
  },

  colors: {
    snippetAnswer: 'Farge-oppgaver for 2. klasse (7\u20138 \u00e5r) trener fargeteori med prim\u00e6r- og sekund\u00e6rfarger, datainnsamling med fargediagrammer, br\u00f8kintroduksjon med fargedeling og selvstendig skriving av fargebeskrivelser med sansespr\u00e5k. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r fargetemaet fra gjenkjenning til systematisk fargeteori \u2014 syv- og \u00e5tte\u00e5ringer forst\u00e5r at prim\u00e6rfarger blandes til sekund\u00e6rfarger, eksperimenterer med fargenyanser (lysere/m\u00f8rkere), og analyserer fargebruk i kunst og natur. Matematisk anvendelse inkluderer br\u00f8kintroduksjon gjennom fargedeling (halvparten r\u00f8d, en fjerdedel bl\u00e5), datainnsamling med fargediagrammer (favorittfarge-unders\u00f8kelse i klassen) og symmetri i fargekomposisjoner. Skriving med sansespr\u00e5k der farger beskrives med metaforer og sammenligninger trener kreativ og beskrivende skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8k, data, kunst og kreativ skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Fargeteori med prim\u00e6r- og sekund\u00e6rfarger (7\u20138-\u00e5ringer forst\u00e5r fargeblandinger)', howWeAddress: 'Fargeblandings-ark der elevene forutsier resultater, eksperimenterer og registrerer i fargekart' },
      { milestone: 'Br\u00f8kintroduksjon gjennom fargedeling (halv, fjerdedel, tredjedel)', howWeAddress: 'Fargedelings-ark der elevene fargelegger br\u00f8ker av figurer og kobler til br\u00f8ksymboler' },
      { milestone: 'Datainnsamling med unders\u00f8kelse (fargediagrammer fra klassedata)', howWeAddress: 'Favorittfarge-unders\u00f8kelse der elevene samler data, tegner s\u00f8ylediagram og analyserer resultater' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre prim\u00e6rfarger, bruk halvdeler for br\u00f8k, og tilby fargeord som st\u00f8tte til skriving. For avanserte elever i 2. klasse legges til terti\u00e6rfarger, br\u00f8ker med ulike nevnere, og selvstendig skriving av fargedikt med metaforer og sansespr\u00e5k.',
    parentTakeaway: 'Utforsk farger hjemme: bland malingsfarger og forutsig resultater (r\u00f8d + gul = ?). Del en pizza i fjerdedeler med forskjellige toppinger og snakk om br\u00f8k. Beskriv solnedgangen med sansespr\u00e5k: \u00abhimmelen var brannoransje som en flamme\u00bb. Fargene er overalt \u2014 bruk dem til l\u00e6ring.',
    classroomIntegration: 'Fargetemaet i 2. klasse integrerer kunst og h\u00e5ndverk (fargeteori, blandeteknikk), matematikk (br\u00f8k, data, symmetri) og norsk (beskrivende skriving med sansespr\u00e5k) i et fargeprosjekt. Elevene gjennomf\u00f8rer en fargeunders\u00f8kelse, lager en fargeutstilling og skriver fargedikt. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8k, data og kreativ skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Fargeteori og fargeblanding', emerging: 'navngir prim\u00e6rfarger og blander to med st\u00f8tte', proficient: 'forklarer selvstendig fargeblanding og forutsier sekund\u00e6rfarger korrekt', advanced: 'eksperimenterer med nyanser, terti\u00e6rfarger og forklarer fargeteori med fagbegreper' },
      { skill: 'Br\u00f8k gjennom fargedeling', emerging: 'fargelegger halvdelen av en figur med st\u00f8tte', proficient: 'identifiserer og fargelegger selvstendig halvdeler, fjerdedeler og tredjedeler', advanced: 'sammenligner br\u00f8ker, forklarer ekvivalens og anvender br\u00f8k i nye kontekster' },
      { skill: 'Fargebeskrivelse med sansespr\u00e5k', emerging: 'beskriver farger med enkle adjektiver (r\u00f8d, stor, fin)', proficient: 'bruker selvstendig sammenligninger og sansespr\u00e5k i fargebeskrivelser', advanced: 'skriver fargedikt med metaforer, personifisering og variert sansespr\u00e5k' },
    ],
  },

  construction: {
    snippetAnswer: 'Bygge-oppgaver for 2. klasse (7\u20138 \u00e5r) trener geometriske figurer med areal og omkrets, m\u00e5ling med standardenheter, konstruksjonsplanlegging med materiallister og selvstendig skriving av byggebeskrivelser. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r byggetemaet fra fri konstruksjon til planlagt design \u2014 syv- og \u00e5tte\u00e5ringer tegner byggetegninger med m\u00e5l i centimeter, beregner materialforbruk med multiplikasjon (4 vegger med 6 klosser = ?), og l\u00e6rer geometriske figurer som byggekomponenter (rektangel for vegg, trekant for tak). M\u00e5ling med linjal og m\u00e5leb\u00e5nd gir presise byggeprosjekter. Addisjon og subtraksjon innenfor 100 med materialkostnader gir budsjetteringsproblemer. Skriving av byggebeskrivelser med trinn-for-trinn-instruksjoner trener prosedyreskriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for geometri, m\u00e5ling og prosedyreskriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Geometriske figurer som byggekomponenter (7\u20138-\u00e5ringer navngir og anvender figurer)', howWeAddress: 'Byggetegnings-ark der elevene identifiserer geometriske figurer i konstruksjoner og bruker dem i egne design' },
      { milestone: 'M\u00e5ling med linjal for presise byggeprosjekter (cm og m)', howWeAddress: 'Konstruksjonsark der elevene m\u00e5ler, tegner og bygger etter spesifikke m\u00e5l i centimeter' },
      { milestone: 'Materialliste med multiplikasjon (beregning av materialforbruk)', howWeAddress: 'Materialliste-ark der elevene beregner antall klosser, planker og skruer med gjentatt addisjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle figurer (firkant, trekant), m\u00e5ling i hele centimeter, og ferdiglagde materiallister. For avanserte elever i 2. klasse legges til sammensatte figurer, m\u00e5ling i millimeter, kostnadsberegning med budsjett og selvstendig skriving av komplette byggebeskrivelser.',
    parentTakeaway: 'Bygg hjemme med m\u00e5l: lag en Lego-konstruksjon etter en tegning med centimeterm\u00e5l. Beregn materialer: \u00ab4 vegger med 8 klosser hver \u2014 hvor mange trenger vi?\u00bb Tegn byggetegninger p\u00e5 ruteark. Skriv en byggebeskrivelse sammen. Praktisk geometri og m\u00e5ling i lek.',
    classroomIntegration: 'Byggetemaet i 2. klasse integrerer matematikk (geometri, m\u00e5ling, multiplikasjon), kunst og h\u00e5ndverk (design og konstruksjon) og norsk (prosedyreskriving og byggebeskrivelser) i et konstruksjonsprosjekt. Elevene designer, beregner materialer og bygger en modell. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for geometri, m\u00e5ling og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Geometriske figurer i konstruksjon', emerging: 'navngir grunnfigurer (firkant, trekant, sirkel) med st\u00f8tte', proficient: 'identifiserer selvstendig geometriske figurer i bygninger og bruker dem i egne tegninger', advanced: 'analyserer sammensatte figurer, beregner sider og vinkler og designer komplekse konstruksjoner' },
      { skill: 'M\u00e5ling og materialberegning', emerging: 'm\u00e5ler med linjal i hele centimeter med st\u00f8tte', proficient: 'm\u00e5ler selvstendig og beregner materialforbruk med gjentatt addisjon', advanced: 'lager presise byggetegninger med m\u00e5l og beregner budsjett for materialer' },
      { skill: 'Byggebeskrivelse og prosedyreskriving', emerging: 'skriver 3\u20134 trinn med st\u00f8tte fra bilder', proficient: 'skriver selvstendig en trinn-for-trinn-byggebeskrivelse med m\u00e5l og materialliste', advanced: 'skriver en komplett byggeveiledning med diagram, sikkerhetstips og begrunnede designvalg' },
    ],
  },

  cooking: {
    snippetAnswer: 'Matlaging-oppgaver for 2. klasse (7\u20138 \u00e5r) trener br\u00f8k med oppskriftsdeling, m\u00e5ling med dl og gram, multiplikasjon med porsjonsjustering og selvstendig skriving av oppskrifter med trinn-for-trinn-instruksjoner. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir matlagingtemaet et matematisk laboratorium \u2014 syv- og \u00e5tte\u00e5ringer arbeider med br\u00f8k i oppskrifter (halv kopp, kvart liter), m\u00e5ling med desilitermm\u00e5l og gram, og multiplikasjon for porsjonsjustering (oppskrift for 4 \u2014 doble til 8). Tidsberegning med klokkeslett (steketid 30 min, starter kl. 16:00 \u2014 n\u00e5r er maten ferdig?) og temperaturlesing fra oppskrift gir praktisk tallforst\u00e5else. Lesing av oppskrifter trener informasjonslesing med sekvensiell struktur. Skriving av egne oppskrifter med ingrediensliste og trinn-for-trinn-instruksjoner trener prosedyreskriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8k, m\u00e5ling, tid og prosedyreskriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Br\u00f8k i praktisk kontekst (halvdeler og fjerdedeler i oppskrifter)', howWeAddress: 'Oppskriftsbr\u00f8k-ark der elevene deler ingrediensm\u00e5l og kobler til br\u00f8ksymboler' },
      { milestone: 'M\u00e5ling med dl og gram (n\u00f8yaktig avlesing og registrering)', howWeAddress: 'M\u00e5lestasjons-ark der elevene m\u00e5ler opp ingredienser med ulike m\u00e5l og registrerer i tabell' },
      { milestone: 'Porsjonsjustering med multiplikasjon (doble/halvere oppskrifter)', howWeAddress: 'Porsjonskalkulator-ark der elevene dobler og halverer oppskrifter for ulikt antall porsjoner' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle oppskrifter med hele m\u00e5l (1 dl, 2 dl), halvdeler kun, og bilder som st\u00f8tte i instruksjoner. For avanserte elever i 2. klasse legges til fjerdedeler og tredjedeler, porsjonsjustering med treganger, og selvstendig skriving av komplette oppskrifter med n\u00e6ringsberegning.',
    parentTakeaway: 'Lag mat sammen og regn: doble oppskriften for bes\u00f8k (3 dl mel \u00d7 2 = ?), m\u00e5l ingredienser med desilitermm\u00e5l og vekt, beregn steketid. La barnet skrive sin egen oppskrift med m\u00e5l og trinn. Kj\u00f8kkenet er det beste mattelaboratoriet \u2014 br\u00f8k og m\u00e5ling blir h\u00e5ndgripelig.',
    classroomIntegration: 'Matlagingtemaet i 2. klasse integrerer matematikk (br\u00f8k, m\u00e5ling, multiplikasjon, tid), naturfag (n\u00e6ringsstoffer og hygiene) og norsk (prosedyreskriving og oppskriftslesing) gjennom et kokeprosjekt. Elevene planlegger, beregner og skriver en klassekokebok. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8k, m\u00e5ling og prosedyreskriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Br\u00f8k i oppskriftskontekst', emerging: 'fargelegger halvdelen av en figur og leser \u00bdj med st\u00f8tte', proficient: 'identifiserer selvstendig halvdeler og fjerdedeler i oppskrifter og kobler til symboler', advanced: 'sammenligner br\u00f8ker, halverer og dobler oppskrifter og forklarer ekvivalens' },
      { skill: 'M\u00e5ling med dl og gram', emerging: 'm\u00e5ler opp med hele desilitermm\u00e5l med st\u00f8tte', proficient: 'm\u00e5ler selvstendig med dl og gram og registrerer n\u00f8yaktig i tabell', advanced: 'konverterer mellom m\u00e5leenheter og justerer m\u00e5l for ulike porsjonst\u00f8rrelser' },
      { skill: 'Oppskriftsskriving (prosedyretekst)', emerging: 'skriver en ingrediensliste og 3\u20134 trinn med st\u00f8tte', proficient: 'skriver selvstendig en komplett oppskrift med m\u00e5l, rekkef\u00f8lge og tidsangivelser', advanced: 'skriver en detaljert oppskrift med variasjoner, n\u00e6ringsinformasjon og begrunnede tips' },
    ],
  },

  dinosaurs: {
    snippetAnswer: 'Dinosaur-oppgaver for 2. klasse (7\u20138 \u00e5r) trener store tall med posisjonsverdi, tidslinje med geologiske perioder, sammenlignende m\u00e5ling av dinosaurst\u00f8rrelser og selvstendig skriving av dinosaurforskningsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse \u00e5pner dinosaurtemaet for store tall og vitenskapelig tenkning \u2014 syv- og \u00e5tte\u00e5ringer arbeider med tall opp til 1000 gjennom dinosaurlengder og -vekter, plasserer arter p\u00e5 tidslinjer over geologiske perioder, og sammenligner st\u00f8rrelser med m\u00e5ling i meter (T-Rex 12 m, Diplodocus 27 m \u2014 hvor mye lengre?). Multiplikasjon med dinosaurgrupper (3 flokker med 7 Velociraptor = ?) gir gjentatt addisjon med spennende kontekst. Klassifikasjon av kj\u00f8tt- og planteetere utvides til familiegrupper med flere kjennetegn. Forskningsrapporter med kildehenvisning og konklusjon trener faglitter\u00e6r rapportering. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for store tall, m\u00e5ling og forskningsskriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Store tall med posisjonsverdi (7\u20138-\u00e5ringer arbeider med tall til 1000)', howWeAddress: 'Dinosaurtall-ark der elevene leser, sammenligner og ordner tresifrede tall basert p\u00e5 dinosaurlengder og -vekter' },
      { milestone: 'Tidslinje med rekkef\u00f8lge (plassering av hendelser i kronologisk orden)', howWeAddress: 'Geologisk tidslinjeark der elevene plasserer dinosaurarter i riktig periode (Trias, Jura, Kritt)' },
      { milestone: 'Sammenlignende m\u00e5ling i meter (st\u00f8rrelsesforskjeller med subtraksjon)', howWeAddress: 'Dinosaurst\u00f8rrelse-ark der elevene sammenligner lengder og vekter og beregner forskjeller' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, arbeid med tall innenfor 100, enkel tidslinje med tre perioder, og ferdiglagde rapportmaler. For avanserte elever i 2. klasse legges til tall over 1000, detaljert tidslinje med underperioder, flertrinnsproblemer med dinosaurdata og selvstendig forskninsrapport med diagrammer.',
    parentTakeaway: 'Dinosaurer fascinerer \u2014 bruk det! Sammenlign dinosaurstorrelser med ting hjemme: \u00abT-Rex var 12 meter, stuen er 5 meter \u2014 den ville ikke f\u00e5tt plass!\u00bb Les dinosaurboken og lag en tidslinje p\u00e5 veggen. Skriv en rapport om favoritten. Dinosaurinteressen driver b\u00e5de tall og forskning.',
    classroomIntegration: 'Dinosaurtemaet i 2. klasse integrerer matematikk (store tall, m\u00e5ling, multiplikasjon), naturfag (klassifikasjon, evolusjon, geologi) og norsk (forskningsrapport og faglesing) i et paleontologiprosjekt. Elevene bygger et klassemuseum med fakta, m\u00e5l og rapporter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tall, m\u00e5ling og faglig skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Store tall og posisjonsverdi (dinosaurkontekst)', emerging: 'leser og sammenligner tosifrede tall med st\u00f8tte', proficient: 'leser, sammenligner og ordner selvstendig tresifrede tall i dinosaurkontekst', advanced: 'arbeider med tall over 1000, avrunder og ansl\u00e5r dinosaurstorrelser' },
      { skill: 'Tidslinje og kronologisk plassering', emerging: 'plasserer tre dinosaurer p\u00e5 en enkel tidslinje med st\u00f8tte', proficient: 'plasserer selvstendig dinosaurer i riktig geologisk periode og forklarer rekkef\u00f8lgen', advanced: 'lager en detaljert tidslinje med underperioder, hendelser og forklarende tekst' },
      { skill: 'Dinosaurforskningsrapport', emerging: 'skriver 3\u20134 faktasetninger om en dinosaur med ordbank', proficient: 'skriver selvstendig en rapport med innledning, fakta, m\u00e5ldata og konklusjon', advanced: 'skriver en detaljert rapport med kildehenvisninger, diagrammer og sammenlignende analyse' },
    ],
  },

  easter: {
    snippetAnswer: 'P\u00e5ske-oppgaver for 2. klasse (7\u20138 \u00e5r) trener multiplikasjon med eggjakt, br\u00f8k med eggedeling, m\u00f8nstersekvenser i p\u00e5skedekorasjoner og selvstendig skriving av p\u00e5skefortellinger med dialog. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse f\u00e5r p\u00e5sketemaet matematisk og litter\u00e6r dybde \u2014 syv- og \u00e5tte\u00e5ringer l\u00f8ser multiplikasjonsproblemer med eggjaktsscenarier (5 reir med 4 egg = ?), deler p\u00e5skeegg i br\u00f8ker (halvdeler, fjerdedeler) med godtedeling, og analyserer m\u00f8nstersekvenser i tradisjonell p\u00e5skedekorasjon. Addisjon og subtraksjon innenfor 100 med p\u00e5skedata (samlede egg, utdelte godterier) gir flertrinnsproblemer. Lesing av p\u00e5sketradisjoner fra ulike land trener informasjonslesing med kulturelt perspektiv. Kreativ skriving av p\u00e5skefortellinger med dialog og spenningskurve utvikler narrativ kompetanse. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, br\u00f8k og kreativ skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med p\u00e5skescenarier (gjentatt addisjon med egg og godteri)', howWeAddress: 'Eggjakt-oppgaver der elevene beregner totalt antall egg i kurver, reir og gjemmesteder' },
      { milestone: 'Br\u00f8k med konkret deling (halvdeler og fjerdedeler av p\u00e5skeegg)', howWeAddress: 'P\u00e5skeeggedeling-ark der elevene deler godteri likt og kobler til br\u00f8ksymboler' },
      { milestone: 'M\u00f8nstersekvenser i dekorasjon (gjentatte og voksende m\u00f8nstre)', howWeAddress: 'P\u00e5skedekorasjons-m\u00f8nstre der elevene identifiserer, fortsetter og skaper egne sekvenser' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk sm\u00e5 multiplikasjonsgrupper (2\u00d73, 3\u00d74), halvdeler kun for br\u00f8k, og enkle m\u00f8nstre med to elementer. For avanserte elever i 2. klasse legges til st\u00f8rre multiplikasjon, fjerdedeler og tredjedeler, komplekse m\u00f8nstre og selvstendig skriving av p\u00e5skekrim med spenningskurve.',
    parentTakeaway: 'Gj\u00f8r p\u00e5sken til en mattefest: del godteriene i p\u00e5skeegget i halvdeler og fjerdedeler. Tell egg p\u00e5 eggjakten i grupper (3 kurver med 6 egg). Mal p\u00e5skeegg med m\u00f8nstersekvenser. Skriv en p\u00e5skekrim sammen \u2014 hvem stjal sjokoladeeggene? Matematikk og skriving i festkontekst.',
    classroomIntegration: 'P\u00e5sketemaet i 2. klasse integrerer matematikk (multiplikasjon, br\u00f8k, m\u00f8nstre), norsk (p\u00e5skefortelling og kulturlesing) og kunst og h\u00e5ndverk (dekorasjon og m\u00f8nsterdesign) i et p\u00e5skeprosjekt. Elevene planlegger og gjennomf\u00f8rer en klasse-p\u00e5skefeiring med matematikk i sentrum. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, m\u00f8nstre og kreativ skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med p\u00e5skedata', emerging: 'l\u00f8ser gjentatt addisjon med sm\u00e5 grupper (2+2+2) med st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjonsoppgaver med eggjaktsscenarier og skriver gangestykker', advanced: 'l\u00f8ser flertrinnsproblemer med multiplikasjon og addisjon i p\u00e5skekontekst' },
      { skill: 'Br\u00f8k med p\u00e5skegodteri', emerging: 'deler i halvdeler med konkret materiale og st\u00f8tte', proficient: 'identifiserer og oppretter selvstendig halvdeler og fjerdedeler med br\u00f8ksymboler', advanced: 'sammenligner br\u00f8ker, deler i tredjedeler og forklarer rettferdig deling' },
      { skill: 'P\u00e5skefortelling med dialog', emerging: 'skriver 3\u20134 setninger om p\u00e5ske med st\u00f8tte', proficient: 'skriver selvstendig en p\u00e5skefortelling med innledning, midtdel, slutt og dialog', advanced: 'skriver en p\u00e5skekrim med spenningskurve, dialog og overraskende avsl\u00f8ring' },
    ],
  },

  emotions: {
    snippetAnswer: 'F\u00f8lelse-oppgaver for 2. klasse (7\u20138 \u00e5r) trener f\u00f8lelsesregulering med strategier, datainnsamling med f\u00f8lelsesdiagrammer, sammenlignende analyse av f\u00f8lelsesuttrykk og selvstendig skriving av dagb\u00f8ker og empatifortellinger. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r f\u00f8lelsestemaet fra gjenkjenning til regulering og analyse \u2014 syv- og \u00e5tte\u00e5ringer l\u00e6rer konkrete strategier for \u00e5 h\u00e5ndtere sterke f\u00f8lelser (pustetrening, telle til ti, s\u00f8ke hjelp), analyserer f\u00f8lelsesuttrykk i ansikt og kroppsspr\u00e5k, og samler data om f\u00f8lelser i klassen med s\u00f8ylediagrammer. Matematisk anvendelse inkluderer datainnsamling (f\u00f8lelsesbarometer med klassedata), m\u00f8nstergjenkjenning i f\u00f8lelsessykluser og br\u00f8k med f\u00f8lelseshjul. Skriving av f\u00f8lelsesdagbok og empatifortellinger der elevene inntar andres perspektiv trener b\u00e5de skriveferdighet og sosial kompetanse. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for sosial l\u00e6ring, data og kreativ skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'F\u00f8lelsesregulering med strategier (7\u20138-\u00e5ringer velger bevisst blant reguleringsstrategier)', howWeAddress: 'Strategikort-ark der elevene l\u00e6rer, \u00f8ver og evaluerer ulike f\u00f8lelsesreguleringsstrategier' },
      { milestone: 'Empati og perspektivtaking (forst\u00e5 andres f\u00f8lelser i gitte situasjoner)', howWeAddress: 'Perspektivoppgaver der elevene leser scenarier og beskriver hva personene f\u00f8ler og hvorfor' },
      { milestone: 'Datainnsamling om f\u00f8lelser (f\u00f8lelsesbarometer med klassedata)', howWeAddress: 'F\u00f8lelsesunders\u00f8kelse der elevene registrerer egen f\u00f8lelse daglig og analyserer m\u00f8nstre over en uke' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til fire grunnf\u00f8lelser (glad, trist, sint, redd), tilby f\u00f8lelseskort med bilder, og bruk setningsstartere for dagbokskriving. For avanserte elever i 2. klasse legges til nyanserte f\u00f8lelser (skuffet, stolt, nervos), empatifortellinger med flere perspektiver og selvstendig analyse av f\u00f8lelsesdata over tid.',
    parentTakeaway: 'Snakk om f\u00f8lelser daglig: \u00abhvordan f\u00f8lte du deg p\u00e5 skolen i dag, og hva gjorde du med den f\u00f8lelsen?\u00bb \u00d8v strategier sammen: pust dypt fem ganger, tell til ti, tegn f\u00f8lelsen. Les en bok og diskuter hva karakterene f\u00f8ler. F\u00f8lelsesdagbok ved sengetid bygger b\u00e5de skriveferdighet og selvbevissthet.',
    classroomIntegration: 'F\u00f8lelsestemaet i 2. klasse integrerer livsmestring (f\u00f8lelsesregulering, empati), matematikk (data, diagrammer) og norsk (dagbok, empatifortelling) i et sosialt l\u00e6ringsprosjekt. Elevene f\u00f8rer f\u00f8lelsesbarometer, \u00f8ver strategier og skriver dagb\u00f8ker. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for livsmestring, data og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'F\u00f8lelsesregulering med strategier', emerging: 'navngir en strategi for \u00e5 h\u00e5ndtere sterke f\u00f8lelser med st\u00f8tte', proficient: 'velger selvstendig blant flere strategier og forklarer n\u00e5r hver passer', advanced: 'evaluerer strategiers effektivitet, tilpasser til situasjonen og veileder medelever' },
      { skill: 'Empati og perspektivtaking', emerging: 'gjenkjenner grunnf\u00f8lelser hos andre med bildest\u00f8tte', proficient: 'beskriver selvstendig hva personer i ulike scenarier f\u00f8ler og hvorfor', advanced: 'inntar flere perspektiver i samme situasjon og forklarer ulike reaksjoner empatisk' },
      { skill: 'F\u00f8lelsesdagbok og empatifortelling', emerging: 'skriver 2\u20133 setninger om egne f\u00f8lelser med st\u00f8tte', proficient: 'skriver selvstendig dagbokinnlegg med f\u00f8lelse, \u00e5rsak og strategi', advanced: 'skriver empatifortellinger med flere perspektiver, dialog og refleksjon' },
    ],
  },

  'fairy-tales': {
    snippetAnswer: 'Eventyr-oppgaver for 2. klasse (7\u20138 \u00e5r) trener narrativ struktur med tredelingsmodellen, karakteranalyse med motivasjon, m\u00f8nstergjenkjenning i eventyrtyper og selvstendig skriving av egne eventyr med dialog og spenningskurve. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r eventyrtemaet fra gjenfortelling til analyse og skapende skriving \u2014 syv- og \u00e5tte\u00e5ringer identifiserer narrativ struktur (innledning, midtdel, avslutning), analyserer karakterers motivasjon og utvikling, og gjenkjenner m\u00f8nstre p\u00e5 tvers av eventyrtyper (trylleventyr, dyreventyr, legendeventyr). Matematisk anvendelse inkluderer m\u00f8nstersekvenser (tre pr\u00f8ver, tre ganger), tallm\u00f8nstre med eventyrtall (3, 7, 12) og enkel statistikk over hendelser. Skriving av egne eventyr med spenningskurve, dialog og eventyrspr\u00e5k (\u00abdet var en gang\u00bb, \u00absnipp snapp snute\u00bb) utvikler narrativ kompetanse p\u00e5 h\u00f8yt niv\u00e5. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for litteraturforst\u00e5else, m\u00f8nstre og kreativ skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Narrativ strukturforst\u00e5else (7\u20138-\u00e5ringer identifiserer innledning, midtdel, avslutning)', howWeAddress: 'Eventyranalyse-ark der elevene sorterer hendelser i tre deler og identifiserer vendepunktet' },
      { milestone: 'Karakteranalyse med motivasjon (forst\u00e5 hvorfor karakterer handler som de gj\u00f8r)', howWeAddress: 'Karakterprofil-ark der elevene beskriver egenskaper, motivasjon og utvikling gjennom eventyret' },
      { milestone: 'M\u00f8nstergjenkjenning p\u00e5 tvers av eventyr (gjentatte strukturer og tall)', howWeAddress: 'Sammenlignende eventyrark der elevene finner likheter og forskjeller mellom eventyrtyper' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk kjente eventyr med tydelig tredeling, tilby eventyrskjeletter med setningsstartere og begrens til \u00e9n eventyrtekst. For avanserte elever i 2. klasse legges til sammenligning av to eventyrtyper, analyse av symbolikk og selvstendig skriving av eventyr med avansert dialog og fortellergrep.',
    parentTakeaway: 'Les eventyr h\u00f8yt og analyser sammen: \u00abhvorfor gj\u00f8r Askeladden det?\u00bb, \u00abhva er likt i alle tre eventyrene?\u00bb La barnet skrive sitt eget eventyr med \u00abdet var en gang\u00bb og \u00absnipp snapp snute\u00bb. Sammenlign norske eventyr med eventyr fra andre land. Eventyranalyse bygger kritisk tenkning fra f\u00f8rste stund.',
    classroomIntegration: 'Eventyrtemaet i 2. klasse integrerer norsk (litteraturanalyse, kreativ skriving), matematikk (m\u00f8nstre, tall) og kunst og h\u00e5ndverk (eventyrillustrasjoner og dramatisering) i et eventyrtprosjekt. Elevene analyserer, skriver og dramatiserer egne eventyr. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for litteraturforst\u00e5else og kreativ skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Narrativ strukturforst\u00e5else', emerging: 'identifiserer innledning og slutt i et kjent eventyr med st\u00f8tte', proficient: 'identifiserer selvstendig innledning, midtdel og avslutning og peker ut vendepunktet', advanced: 'sammenligner narrativ struktur p\u00e5 tvers av eventyr og forklarer spenningskurvens effekt' },
      { skill: 'Karakteranalyse og motivasjon', emerging: 'beskriver karakterers ytre egenskaper med st\u00f8tte', proficient: 'forklarer selvstendig karakterers motivasjon og handlingsvalg', advanced: 'analyserer karakterutvikling gjennom eventyret og kobler til tema og moral' },
      { skill: 'Selvstendig eventyrskriving', emerging: 'skriver et kort eventyr med st\u00f8tte fra skjelett og setningsstartere', proficient: 'skriver selvstendig et eventyr med tredeling, eventyrspr\u00e5k og enkel dialog', advanced: 'skriver et eventyr med spenningskurve, avansert dialog, symbolikk og kreative fortellergrep' },
    ],
  },

  farm: {
    snippetAnswer: 'G\u00e5rd-oppgaver for 2. klasse (7\u20138 \u00e5r) trener multiplikasjon med dyreflokker og avlinger, m\u00e5ling av jordbruksareal, datainnsamling med h\u00f8ststatistikk og selvstendig skriving av g\u00e5rdsforskningsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir g\u00e5rdstemaet et matematisk og naturfaglig forskningsprosjekt \u2014 syv- og \u00e5tte\u00e5ringer beregner flock-st\u00f8rrelser med multiplikasjon (3 innhegninger med 8 sauer = ?), m\u00e5ler jordbruksareal med m\u00e5leb\u00e5nd, og samler h\u00f8stdata i s\u00f8ylediagrammer for sammenligning. Addisjon og subtraksjon innenfor 100 med g\u00e5rdsdata (dyretelling, melkeproduksjon, kornh\u00f8st) gir realistiske flertrinnsproblemer. Klassifikasjon av husdyr vs. ville dyr og kulturplanter vs. ugress utvider naturfagkunnskapen. Skriving av g\u00e5rdsrapporter med data, diagrammer og konklusjon trener faglitter\u00e6r rapportering. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, data og forskningsskriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med dyregrupper (gjentatt addisjon med g\u00e5rdsscenarier)', howWeAddress: 'Dyreflokk-ark der elevene beregner totalt antall dyr i innhegninger, bur og staller' },
      { milestone: 'Datainnsamling med h\u00f8ststatistikk (s\u00f8ylediagrammer med g\u00e5rdsdata)', howWeAddress: 'H\u00f8stdiagram-ark der elevene registrerer avlingsdata og tegner sammenlignende s\u00f8ylediagrammer' },
      { milestone: 'Arealm\u00e5ling av g\u00e5rdsomr\u00e5der (lengde og bredde i meter)', howWeAddress: 'G\u00e5rdsplan-ark der elevene m\u00e5ler innhegninger, \u00e5krer og bygninger p\u00e5 plantegning' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk sm\u00e5 dyregrupper (2\u00d73, 3\u00d74), enkle s\u00f8ylediagrammer og rapportmaler med setningsstartere. For avanserte elever i 2. klasse legges til st\u00f8rre multiplikasjon, doble s\u00f8ylediagrammer med to avlinger og selvstendig g\u00e5rdsforskningsrapport med budget og effektivitetsanalyse.',
    parentTakeaway: 'Bes\u00f8k en g\u00e5rd eller matbutikk og regn: \u00ab4 kasser med 6 epler \u2014 hvor mange til sammen?\u00bb Lag et s\u00f8ylediagram over ukens frukt og gr\u00f8nt. Skriv en rapport om hvor maten kommer fra. G\u00e5rdstematikk kobler matematikk til hverdagslivet p\u00e5 en meningsfull m\u00e5te.',
    classroomIntegration: 'G\u00e5rdstemaet i 2. klasse integrerer matematikk (multiplikasjon, data, m\u00e5ling), naturfag (dyr, planter, \u00e5rstider) og norsk (forskningsrapport og informasjonslesing) i et g\u00e5rdsprosjekt. Elevene driver en simulert g\u00e5rd med budsjett, dyretelling og h\u00f8strapporter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, data og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med g\u00e5rdsdata', emerging: 'l\u00f8ser gjentatt addisjon med sm\u00e5 dyregrupper (2+2+2) med st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjonsoppgaver med g\u00e5rdsscenarier og skriver gangestykker', advanced: 'l\u00f8ser flertrinnsproblemer med multiplikasjon, addisjon og subtraksjon i g\u00e5rdskontekst' },
      { skill: 'Datainnsamling og s\u00f8ylediagrammer (h\u00f8stdata)', emerging: 'avleser et enkelt s\u00f8ylediagram med st\u00f8tte', proficient: 'tegner selvstendig s\u00f8ylediagram fra g\u00e5rdsdata og besvarer sammenligningssp\u00f8rsm\u00e5l', advanced: 'lager doble s\u00f8ylediagrammer, analyserer trender og trekker konklusjoner' },
      { skill: 'G\u00e5rdsforskningsrapport', emerging: 'skriver 3\u20134 setninger om g\u00e5rden med ordbank og st\u00f8tte', proficient: 'skriver selvstendig en rapport med fakta, data og konklusjon', advanced: 'skriver en detaljert rapport med budsjett, diagrammer og forbedringsforslag' },
    ],
  },

  flowers: {
    snippetAnswer: 'Blomster-oppgaver for 2. klasse (7\u20138 \u00e5r) trener planteforskning med veksteksperimenter, m\u00e5ling av plantevekst i centimeter, datainnsamling med vekstdiagrammer og selvstendig skriving av forskningsrapporter om blomstringsprosessen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir blomstertemaet et vitenskapelig eksperiment \u2014 syv- og \u00e5tte\u00e5ringer gjennomf\u00f8rer systematisk planteforskning der de planter fr\u00f8, m\u00e5ler vekst i centimeter over uker, registrerer data i tabeller og tegner vekstdiagrammer. Multiplikasjon med blomsterdeler (5 blomster med 6 kronblad = ?) og symmetri i blomsterformer kobler naturfag til matematikk. Klassifikasjon av blomster etter bl\u00e5farge, duft, bladform og blomstringstid utvider naturfaglig systematikk. Skriving av vekstrapporter med observasjoner, data og konklusjon trener vitenskapelig rapportering. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig utforsking, m\u00e5ling og forskningsskriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Systematisk planteforskning (7\u20138-\u00e5ringer gjennomf\u00f8rer kontrollerte eksperimenter)', howWeAddress: 'Veksteksperiment-ark der elevene planter fr\u00f8 under ulike betingelser og sammenligner resultater' },
      { milestone: 'M\u00e5ling av vekst over tid (cm-m\u00e5ling med registrering)', howWeAddress: 'Vekstlogg-ark der elevene m\u00e5ler planteh\u00f8yde ukentlig og registrerer i tabell og diagram' },
      { milestone: 'Blomsterklassifikasjon med flere kriterier (farge, form, blomstringstid)', howWeAddress: 'Klassifikasjonsark der elevene sorterer blomster etter flere egenskaper og lager bestemmelsesn\u00f8kkel' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle m\u00e5linger i hele centimeter, f\u00e5 sorterings\u00adkategorier og forh\u00e5ndslagde rapportmaler. For avanserte elever i 2. klasse legges til m\u00e5ling i millimeter, kontrollerte eksperimenter med hypotese og selvstendig skriving av forskningsrapporter med diagrammer og konklusjon.',
    parentTakeaway: 'Plant et fr\u00f8 hjemme og f\u00f8r en vekstdagbok: m\u00e5l h\u00f8yden hver uke med linjal og tegn et diagram. G\u00e5 p\u00e5 blomstertur og identifiser arter med en bestemmelsesbok. Press blomster og lag en samling med navn og fakta. Planting er den beste naturfagsundervisningen.',
    classroomIntegration: 'Blomstertemaet i 2. klasse kj\u00f8rer som \u00e5rsprosjekt: naturfag med planteforskning og klassifikasjon, matematikk med m\u00e5ling, data og multiplikasjon, norsk med forskningsrapporter og observasjonsskriving. Klassens blomsterhage gir autentiske data hele \u00e5ret. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for utforsking, m\u00e5ling og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Planteforskning og eksperiment', emerging: 'observerer plantevekst med st\u00f8tte og rapporterer muntlig', proficient: 'gjennomf\u00f8rer selvstendig et veksteksperiment med m\u00e5ling og registrering', advanced: 'designer et kontrollert eksperiment med hypotese, gjennomf\u00f8ring og konklusjon' },
      { skill: 'M\u00e5ling og vekstdiagram', emerging: 'm\u00e5ler i hele centimeter med st\u00f8tte og f\u00f8rer enkel logg', proficient: 'm\u00e5ler selvstendig ukentlig og tegner vekstdiagram med korrekt skala', advanced: 'analyserer vekstdata, beregner gjennomsnitt og sammenligner med klassens data' },
      { skill: 'Forskningsrapport om blomster', emerging: 'skriver 3\u20134 setninger om en blomst med ordbank', proficient: 'skriver selvstendig en vekstrapport med observasjoner, data og konklusjon', advanced: 'skriver en detaljert rapport med hypotese, metode, resultater, diagrammer og refleksjon' },
    ],
  },

  food: {
    snippetAnswer: 'Mat-oppgaver for 2. klasse (7\u20138 \u00e5r) trener n\u00e6ringsl\u00e6re med matgrupper, br\u00f8k med porsjonsdeling, pengeregning med matbudsjettt og selvstendig skriving av kostholdsrapporter og matanmeldelser. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r mattemaet fra gjenkjenning til analyse \u2014 syv- og \u00e5tte\u00e5ringer klassifiserer matvarer i n\u00e6ringsgrupper (karbohydrater, proteiner, fett, vitaminer), analyserer m\u00e5ltider for n\u00e6ringsbalanse, og beregner matbudsjett med addisjon og subtraksjon innenfor 100. Br\u00f8k med porsjonsdeling (del pizzaen i fjerdedeler, kaken i \u00e5ttedeler) gir konkret br\u00f8kforst\u00e5else. Multiplikasjon med matpakker (5 dager med 3 br\u00f8dskiver = ?) kobler gangetenkning til hverdagsplanlegging. Skriving av matanmeldelser og kostholdsrapporter trener meningsytring og faglitter\u00e6r skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for kropp og helse, br\u00f8k og sakprosaskriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'N\u00e6ringsgruppe-klassifikasjon (7\u20138-\u00e5ringer sorterer mat i n\u00e6ringsgrupper)', howWeAddress: 'N\u00e6ringssorterings-ark der elevene klassifiserer matvarer og vurderer m\u00e5ltidsbalanse' },
      { milestone: 'Br\u00f8k med porsjonsdeling (halvdeler, fjerdedeler, \u00e5ttedeler)', howWeAddress: 'Matdelings-ark der elevene deler mat i like deler og kobler til br\u00f8ksymboler' },
      { milestone: 'Matbudsjett med pengeregning (addisjon/subtraksjon med priser)', howWeAddress: 'Handlelisteark der elevene planlegger innkj\u00f8p, beregner priser og holder budsjett' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk fire hovedn\u00e6ringsgrupper med bildekort, halvdeler for br\u00f8k, og hele kroner for pengeregning. For avanserte elever i 2. klasse legges til detaljert n\u00e6ringsanalyse, br\u00f8ker med ulike nevnere, matbudsjett med \u00f8re og selvstendig skriving av ukemeny med n\u00e6ringsberegning.',
    parentTakeaway: 'Gj\u00f8r handlekj\u00f8p til matteleksjoner: sett et budsjett p\u00e5 100 kr. og la barnet addere priser. Del pizzaen i fjerdedeler og snakk om br\u00f8k. Vurder middagen sammen: \u00abhar vi proteiner, karbohydrater og vitaminer?\u00bb Mat er den mest engasjerende l\u00e6ringskonteksten.',
    classroomIntegration: 'Mattemaet i 2. klasse integrerer naturfag (n\u00e6ringsl\u00e6re, matproduksjon), matematikk (br\u00f8k, pengeregning, multiplikasjon) og norsk (matanmeldelse, kostholdsrapport) i et kostholdsprosjekt. Elevene planlegger en sunn ukemeny med budsjett. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for helse, br\u00f8k og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'N\u00e6ringsgruppe-klassifikasjon', emerging: 'sorterer matvarer i to grupper med bildest\u00f8tte', proficient: 'klassifiserer selvstendig matvarer i fire n\u00e6ringsgrupper og vurderer m\u00e5ltidsbalanse', advanced: 'analyserer m\u00e5ltider for n\u00e6ringsinnhold og foresl\u00e5r forbedringer med fagbegreper' },
      { skill: 'Br\u00f8k med matdeling', emerging: 'deler mat i halvdeler med konkret materiale', proficient: 'identifiserer og oppretter selvstendig halvdeler, fjerdedeler og \u00e5ttedeler', advanced: 'sammenligner br\u00f8ker, forklarer ekvivalens og anvender br\u00f8k i nye matkontekster' },
      { skill: 'Matanmeldelse og kostholdsrapport', emerging: 'skriver 3\u20134 setninger om mat med st\u00f8tte', proficient: 'skriver selvstendig en matanmeldelse med begrunnede meninger og en kostholdsrapport', advanced: 'skriver en detaljert kostholdsanalyse med n\u00e6ringsdata, diagrammer og anbefalinger' },
    ],
  },

  forest: {
    snippetAnswer: 'Skog-oppgaver for 2. klasse (7\u20138 \u00e5r) trener \u00f8kosystemforst\u00e5else med n\u00e6ringskjeder, m\u00e5ling av tr\u00e6r med h\u00f8yde og omkrets, datainnsamling med artsregistrering og selvstendig skriving av skogforskningsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse blir skogtemaet et \u00f8kologisk forskningsprosjekt \u2014 syv- og \u00e5tte\u00e5ringer forst\u00e5r n\u00e6ringskjeder (sol \u2192 plante \u2192 planteter \u2192 rovdyr), m\u00e5ler tr\u00e6r med m\u00e5leb\u00e5nd (stammeomkrets) og linjal (bladlengde), og registrerer arter systematisk i feltdagb\u00f8ker. Multiplikasjon med skogsdata (4 tr\u00e6r med 6 kongler = ?) og datainnsamling med s\u00f8ylediagrammer over artsforekomster gir matematisk dybde. Skriving av skogforskningsrapporter med observasjoner, m\u00e5ledata og \u00f8kologiske sammenhenger trener vitenskapelig rapportering. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig utforsking, \u00f8kosystemer og forskningsskriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'N\u00e6ringskjedeforst\u00e5else (7\u20138-\u00e5ringer forst\u00e5r energiflyt i \u00f8kosystemer)', howWeAddress: 'N\u00e6ringskjede-ark der elevene ordner organismer i rekkef\u00f8lge og forklarer energiflyten' },
      { milestone: 'M\u00e5ling av tr\u00e6r med standardenheter (omkrets og h\u00f8yde)', howWeAddress: 'Tr\u00e6m\u00e5lings-ark der elevene m\u00e5ler stammeomkrets og ansl\u00e5r h\u00f8yde med sammenligning' },
      { milestone: 'Artsregistrering med feltdagbok (systematisk naturobservasjon)', howWeAddress: 'Feltdagbok-ark der elevene registrerer arter, antall og betingelser i en strukturert logg' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle n\u00e6ringskjeder med tre ledd, m\u00e5ling i hele centimeter og forh\u00e5ndslagde feltdagb\u00f8ker. For avanserte elever i 2. klasse legges til n\u00e6ringsnett med flere forbindelser, presise m\u00e5linger i millimeter og selvstendig skriving av \u00f8kologiske forskningsrapporter.',
    parentTakeaway: 'G\u00e5 p\u00e5 skogtur og forsk: m\u00e5l et tre med m\u00e5leb\u00e5nd rundt stammen, tell kongler under fem tr\u00e6r og lag et s\u00f8ylediagram. Diskuter n\u00e6ringskjeder: \u00abhva spiser ekernet? Og hva spiser den som spiser ekernet?\u00bb Skriv en skograpport hjemme. Skogen er det beste uteklasserommet.',
    classroomIntegration: 'Skogtemaet i 2. klasse kj\u00f8rer som \u00e5rsprosjekt med ute\u00adundervisning: naturfag med \u00f8kosystemer og artsregistrering, matematikk med m\u00e5ling, data og multiplikasjon, norsk med feltdagbok og forskningsrapport. Klassens skogsomr\u00e5de bes\u00f8kes m\u00e5nedlig. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for utforsking, \u00f8kosystemer og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'N\u00e6ringskjeder og \u00f8kosystemer', emerging: 'ordner tre organismer i en n\u00e6ringskjede med st\u00f8tte', proficient: 'bygger selvstendig n\u00e6ringskjeder med fire ledd og forklarer energiflyten', advanced: 'tegner n\u00e6ringsnett med flere forbindelser og forklarer konsekvenser av endringer' },
      { skill: 'M\u00e5ling av tr\u00e6r (omkrets og h\u00f8yde)', emerging: 'm\u00e5ler stammeomkrets i hele centimeter med st\u00f8tte', proficient: 'm\u00e5ler selvstendig b\u00e5de omkrets og bladlengde og registrerer data i tabell', advanced: 'beregner gjennomsnittlig stammeomkrets, sammenligner trearter og trekker konklusjoner' },
      { skill: 'Skogforskningsrapport', emerging: 'skriver 3\u20134 observasjonssetninger med st\u00f8tte fra feltdagbok-mal', proficient: 'skriver selvstendig en rapport med observasjoner, m\u00e5ledata og konklusjon', advanced: 'skriver en detaljert \u00f8kologisk rapport med n\u00e6ringskjeder, data, diagrammer og refleksjon' },
    ],
  },

  fruits: {
    snippetAnswer: 'Frukt-oppgaver for 2. klasse (7\u20138 \u00e5r) trener br\u00f8k med fruktdeling, vektm\u00e5ling med gram og kilogram, datainnsamling med smakstester og selvstendig skriving av fruktforskningsrapporter og smaksanmeldelser. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r frukttemaet fra telling til vitenskapelig unders\u00f8kelse \u2014 syv- og \u00e5tte\u00e5ringer veier frukter med gram og kilogram, sammenligner vekter med subtraksjon, og deler frukter i br\u00f8ker (halvdeler, fjerdedeler, \u00e5ttedeler av eple, appelsin, melon). Multiplikasjon med fruktkasser (4 kasser med 8 epler = ?) gir praktisk gangetenkning. Datainnsamling med smakstester (s\u00f8t vs. sur, favorittfrukt) registreres i s\u00f8ylediagrammer for klasseanalyse. Skriving av fruktforskningsrapporter med opprinnelse, n\u00e6ring og smaksbeskrivelse trener faglitter\u00e6r og beskrivende skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, br\u00f8k og forskningsskriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Vektm\u00e5ling med gram og kilogram (7\u20138-\u00e5ringer veier og sammenligner)', howWeAddress: 'Fruktvekt-ark der elevene veier frukter med kj\u00f8kkenvekt, registrerer i gram og sammenligner' },
      { milestone: 'Br\u00f8k med fruktdeling (halvdeler, fjerdedeler, \u00e5ttedeler)', howWeAddress: 'Fruktdelings-ark der elevene deler frukter i like deler og kobler til br\u00f8ksymboler' },
      { milestone: 'Datainnsamling med smakstest (unders\u00f8kelse og s\u00f8ylediagram)', howWeAddress: 'Smakstest-ark der elevene gjennomf\u00f8rer en klasseunders\u00f8kelse og presenterer resultater i diagram' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele gram og halvdeler, enkle s\u00f8ylediagrammer med tre frukter, og rapportmaler med setningsstartere. For avanserte elever i 2. klasse legges til vektberegning med kilogram og gram, br\u00f8ker med ulike nevnere, og selvstendig skriving av fruktforskningsrapporter med n\u00e6ringsdata og opprinnelseskart.',
    parentTakeaway: 'Gj\u00f8r frukthandelen til forskning: vei epler p\u00e5 kj\u00f8kkenvekten, del en appelsin i fjerdedeler og snakk om br\u00f8k, lag en smakstest med familien og tegn et s\u00f8ylediagram. Skriv en anmeldelse av ukens frukt. Mat og matematikk h\u00f8rer sammen.',
    classroomIntegration: 'Frukttemaet i 2. klasse integrerer naturfag (vekst, n\u00e6ring, opprinnelse), matematikk (m\u00e5ling, br\u00f8k, data, multiplikasjon) og norsk (forskningsrapport, smaksanmeldelse) i et fruktprosjekt. Elevene gjennomf\u00f8rer smakstester, veier og skriver rapporter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, br\u00f8k og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Vektm\u00e5ling (gram og kilogram)', emerging: 'veier frukter med st\u00f8tte og rapporterer i hele gram', proficient: 'veier selvstendig med kj\u00f8kkenvekt og sammenligner vekter med subtraksjon', advanced: 'konverterer mellom gram og kilogram, beregner gjennomsnittsvekt og analyserer data' },
      { skill: 'Br\u00f8k med fruktdeling', emerging: 'deler en frukt i halvdeler med konkret materiale', proficient: 'identifiserer og oppretter selvstendig halvdeler, fjerdedeler og \u00e5ttedeler', advanced: 'sammenligner br\u00f8ker med ulike nevnere og forklarer ekvivalens med frukteksempler' },
      { skill: 'Fruktforskningsrapport', emerging: 'skriver 3\u20134 setninger om en frukt med bildest\u00f8tte', proficient: 'skriver selvstendig en rapport med fakta, m\u00e5ledata og smaksbeskrivelse', advanced: 'skriver en detaljert rapport med n\u00e6ringsanalyse, opprinnelse, diagram og anbefalinger' },
    ],
  },

  furniture: {
    snippetAnswer: 'M\u00f8bel-oppgaver for 2. klasse (7\u20138 \u00e5r) trener m\u00e5ling med centimeter og meter, arealberegning av romflater, romplanlegging med skala og selvstendig skriving av m\u00f8belbeskrivelser og designrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r m\u00f8beltemaet fra sortering til presist design \u2014 syv- og \u00e5tte\u00e5ringer m\u00e5ler m\u00f8bler med m\u00e5leb\u00e5nd og linjal, tegner romplaner p\u00e5 ruteark med enkel skala, og beregner om m\u00f8bler f\u00e5r plass (sengen er 190 cm, veggen er 200 cm \u2014 passer den?). Multiplikasjon med m\u00f8belgrupper (4 stoler med 4 bein = ?) gir gjentatt addisjon. Materialklassifikasjon (tre, metall, plast, tekstil) med egenskaper (hardt, mykt, tungt, lett) utvider naturfagkunnskapen. Skriving av m\u00f8belbeskrivelser med m\u00e5l, materiale og funksjon trener beskrivende og teknisk skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, geometri og beskrivende skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'M\u00e5ling med m\u00e5leb\u00e5nd og linjal (cm og m i praktisk kontekst)', howWeAddress: 'M\u00f8belm\u00e5lings-ark der elevene m\u00e5ler h\u00f8yde, bredde og dybde p\u00e5 klasserommets m\u00f8bler' },
      { milestone: 'Romplan med enkel skala (tegning p\u00e5 ruteark)', howWeAddress: 'Romdesign-ark der elevene tegner romplaner og plasserer m\u00f8bler etter m\u00e5l p\u00e5 ruteark' },
      { milestone: 'Materialklassifikasjon med egenskaper (tre, metall, plast, tekstil)', howWeAddress: 'Materialsorteringsark der elevene unders\u00f8ker og klassifiserer m\u00f8belmaterialer' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, m\u00e5l i hele centimeter, bruk enkle romplaner med f\u00e5 m\u00f8bler, og tilby materialbilder som st\u00f8tte. For avanserte elever i 2. klasse legges til m\u00e5ling i millimeter, komplekse romplaner med skalaberegning, og selvstendig skriving av m\u00f8beldesignrapporter med begrunnede designvalg.',
    parentTakeaway: 'M\u00e5l m\u00f8bler hjemme med m\u00e5leb\u00e5nd: hvor h\u00f8yt er bordet, hvor bred er sengen? Tegn en romplan p\u00e5 ruteark. Diskuter materialer: \u00abhvorfor er stolen av tre og puten av stoff?\u00bb La barnet designe drommer\u00f8mmet sitt p\u00e5 papir med m\u00e5l. Praktisk geometri i hverdagen.',
    classroomIntegration: 'M\u00f8beltemaet i 2. klasse integrerer matematikk (m\u00e5ling, geometri, multiplikasjon), naturfag (materialer og egenskaper) og norsk (beskrivende skriving og designrapporter) i et romdesignprosjekt. Elevene designer klassens ideelle lesekrok med m\u00e5l og materialliste. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, geometri og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'M\u00e5ling av m\u00f8bler (cm og m)', emerging: 'm\u00e5ler i hele centimeter med st\u00f8tte fra l\u00e6rer', proficient: 'm\u00e5ler selvstendig h\u00f8yde, bredde og dybde og registrerer data i tabell', advanced: 'm\u00e5ler presist, konverterer mellom cm og m, og sammenligner m\u00e5l p\u00e5 tvers' },
      { skill: 'Romplan og m\u00f8belplassering', emerging: 'tegner et enkelt rom med 2\u20133 m\u00f8bler p\u00e5 ruteark', proficient: 'tegner selvstendig en romplan med riktige proporsjoner og plasserer m\u00f8bler etter m\u00e5l', advanced: 'designer en komplett romplan med skala, materialvalg og begrunnelse for plassering' },
      { skill: 'M\u00f8belbeskrivelse og designrapport', emerging: 'beskriver m\u00f8bler med 2\u20133 egenskaper (farge, st\u00f8rrelse, materiale)', proficient: 'skriver selvstendig detaljerte m\u00f8belbeskrivelser med m\u00e5l, materiale og funksjon', advanced: 'skriver en designrapport med begrunnede valg, skisse og materialanalyse' },
    ],
  },

  garden: {
    snippetAnswer: 'Hage-oppgaver for 2. klasse (7\u20138 \u00e5r) trener arealberegning med hagebed, m\u00e5ling av planter og redskaper, multiplikasjon med planterad og selvstendig skriving av hageplanleggingsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r hagetemaet fra observasjon til systematisk planlegging \u2014 syv- og \u00e5tte\u00e5ringer tegner hagebed p\u00e5 ruteark, beregner beplantningsareal, og planlegger planterad med multiplikasjon (4 rader med 5 planter = ?). M\u00e5ling med m\u00e5leb\u00e5nd gir presise bed-m\u00e5l, og \u00e5rstidshjul med plantesykluser kobler naturfag til tidsforst\u00e5else. Datainnsamling med vekstm\u00e5linger over uker og s\u00f8ylediagrammer gir matematisk dybde. Skriving av hageplanleggingsrapporter med bedoversikt, plantevelg og tidsplan trener prosedyre- og faglig skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, multiplikasjon, \u00e5rstider og skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Arealforst\u00e5else med hagebed (lengde \u00d7 bredde som rutetelling)', howWeAddress: 'Hagebed-ark p\u00e5 ruteark der elevene teller ruter og introduseres for areal som antall ruter' },
      { milestone: 'Multiplikasjon med planterad (gjentatt addisjon med rader og kolonner)', howWeAddress: 'Planterad-ark der elevene plasserer planter i rader og beregner totalt antall' },
      { milestone: 'Vekstm\u00e5ling over tid (\u00e5rstidshjul og vekstdiagram)', howWeAddress: '\u00c5rstidshjul-ark der elevene f\u00f8lger plantesykluser og m\u00e5ler vekst ukentlig' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk sm\u00e5 hagebed (3\u00d74 ruter), enkle rader med f\u00e5 planter, og hageplanmaler med bilder. For avanserte elever i 2. klasse legges til st\u00f8rre bed med presise m\u00e5l i cm, flertrinnsproblemer med planteplanlegging og budsjett, og selvstendig skriving av hageforskningsrapporter med vekstdata.',
    parentTakeaway: 'Plant sammen i hagen eller i vinduskarmen: m\u00e5l bedst\u00f8rrelse, plant i rader og regn ut antall (3 rader med 4 fr\u00f8 = 12). M\u00e5l plantevekst ukentlig og tegn et diagram. Lag en hageplan p\u00e5 papir med m\u00e5l og plantevelg. Hagen er det ultimate tverrfaglige klasserommet.',
    classroomIntegration: 'Hagetemaet i 2. klasse kj\u00f8rer som \u00e5rsprosjekt med skolehage: matematikk med m\u00e5ling, multiplikasjon og arealberegning, naturfag med plantevekst og \u00e5rstider, norsk med hageplanlegging og vekstrapporter. Elevene driver klassenss kj\u00f8kkenhage gjennom hele \u00e5ret. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, utforsking og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Arealberegning med hagebed', emerging: 'teller ruter p\u00e5 et forh\u00e5ndstegnet bed med st\u00f8tte', proficient: 'tegner selvstendig et hagebed p\u00e5 ruteark og beregner areal ved rutetelling', advanced: 'beregner areal med lengde \u00d7 bredde og planlegger komplekse hager med flere bed' },
      { skill: 'Multiplikasjon med planterad', emerging: 'teller planter i rader med gjentatt addisjon og st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjonsoppgaver med planterad og skriver gangestykker', advanced: 'planlegger en komplett beplantning med flertrinnsproblemer og budsjett' },
      { skill: 'Hageplanleggingsrapport', emerging: 'skriver 3\u20134 setninger om hageplanen med st\u00f8tte', proficient: 'skriver selvstendig en hageplan med bedoversikt, plantevelg og tidsplan', advanced: 'skriver en detaljert hageforskningsrapport med vekstdata, diagrammer og anbefalinger' },
    ],
  },

  halloween: {
    snippetAnswer: 'Halloween-oppgaver for 2. klasse (7\u20138 \u00e5r) trener multiplikasjon med godteripakker, pengematematikk med kostymebudsjett, m\u00f8nstersekvenser i dekorasjon og selvstendig skriving av grsselsfortellinger med spenningskurve. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse f\u00e5r halloween-temaet matematisk og litter\u00e6r dybde \u2014 syv- og \u00e5tte\u00e5ringer beregner godterifordeling med multiplikasjon (6 hus med 4 godterier = ?), planlegger kostymebudsjett med addisjon og subtraksjon innenfor 100, og analyserer gjentatte m\u00f8nstre i halloween-dekorasjon. Br\u00f8k med godterideling (del 12 godterier likt p\u00e5 4 barn) gir praktisk divisjonsforst\u00e5else. Lesing av grusomme eventyr og spooky-tekster trener sjangerforst\u00e5else. Kreativ skriving av grsselsfortellinger med spenningskurve, stemningsbeskrivelse og dialog utvikler narrativ kompetanse. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, m\u00f8nstre og kreativ skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med godterigrupper (gjentatt addisjon med halloween-scenarier)', howWeAddress: 'Kn\u00f8tt-eller-godteri-ark der elevene beregner godteri per hus og totalt med multiplikasjon' },
      { milestone: 'Pengematematikk med kostymebudsjett (addisjon/subtraksjon med kroner)', howWeAddress: 'Kostymebudsjett-ark der elevene planlegger innkj\u00f8p og beregner totalkostnad og vekslepenger' },
      { milestone: 'Grsselsfortelling med spenning (stemningsbeskrivelse og spenningskurve)', howWeAddress: 'Fortelling-maler der elevene skaper en halloween-historie med spenningsoppbygging og overraskelse' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk sm\u00e5 multiplikasjonsgrupper (2\u00d73), hele kroner uten \u00f8re, og enkle fortellingsmaler med setningsstartere. For avanserte elever i 2. klasse legges til st\u00f8rre multiplikasjon, prisberegning med \u00f8re, og selvstendig skriving av grsselsfortellinger med avansert spenningskurve og dialog.',
    parentTakeaway: 'Gj\u00f8r halloween til en mattefest: lag et kostymebudsjett p\u00e5 200 kr. og regn sammen. Tell godterier etter kn\u00f8tt-eller-godteri-runden: \u00ab6 hus med 3 godterier \u2014 hvor mange fikk du?\u00bb Del godteriene likt. Skriv en grsselsfortelling sammen ved kveldsmat. Halloween-matte er den goyeste matten.',
    classroomIntegration: 'Halloween-temaet i 2. klasse integrerer matematikk (multiplikasjon, pengeregning, m\u00f8nstre), norsk (grsselsfortelling og sjangerlesing) og kunst og h\u00e5ndverk (kostymer og dekorasjon) i et halloween-prosjekt. Elevene planlegger og gjennomf\u00f8rer en klassefeiring. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, m\u00f8nstre og kreativ skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med halloween-data', emerging: 'l\u00f8ser gjentatt addisjon med sm\u00e5 grupper (3+3+3) med st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjonsoppgaver med godteriscenarier og skriver gangestykker', advanced: 'l\u00f8ser flertrinnsproblemer med multiplikasjon, addisjon og fordeling' },
      { skill: 'Pengematematikk med kostymebudsjett', emerging: 'legger sammen to priser innenfor 100 med st\u00f8tte', proficient: 'beregner selvstendig et kostymebudsjett med addisjon, subtraksjon og vekslepenger', advanced: 'planlegger et komplett fest- og kostymebudsjett med flertrinnsproblemer og prioritering' },
      { skill: 'Grsselsfortelling med spenning', emerging: 'skriver 3\u20134 setninger om halloween med st\u00f8tte', proficient: 'skriver selvstendig en grsselsfortelling med innledning, spenningsoppbygging og slutt', advanced: 'skriver en detaljert grsselsfortelling med stemningsbeskrivelse, dialog og overraskende vri' },
    ],
  },

  holidays: {
    snippetAnswer: 'Ferie-oppgaver for 2. klasse (7\u20138 \u00e5r) trener tidsberegning med ferieplanlegging, pengematematikk med reisebudsjett, kartlesing med feriereiser og selvstendig skriving av reisedagb\u00f8ker og ferierapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse f\u00e5r ferietemaet matematisk og geografisk dybde \u2014 syv- og \u00e5tte\u00e5ringer planlegger feriereiser med tidsberegning (avreise kl. 08:00, reisetid 3 timer \u2014 n\u00e5r er vi framme?), beregner reisebudsjett med addisjon og subtraksjon innenfor 100, og leser enkle kart med feriedestinasjoner. Multiplikasjon med ferieinnkj\u00f8p (5 suvenirer \u00e5 20 kr. = ?) gir gjentatt addisjon i reisekontekst. Lesing av feriebrosjyrer og reiseguider trener informasjonslesing. Skriving av reisedagb\u00f8ker med dato, sted, opplevelser og refleksjon trener strukturert faglitter\u00e6r skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tid, penger, kart og skriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Tidsberegning med reisetid (timer og minutter med klokkeslett)', howWeAddress: 'Ferieplan-ark der elevene beregner avreise, ankomst og varighet for reiseaktiviteter' },
      { milestone: 'Pengematematikk med reisebudsjett (addisjon/subtraksjon med kroner)', howWeAddress: 'Reisebudsjett-ark der elevene planlegger utgifter, adderer priser og holder seg innenfor budsjett' },
      { milestone: 'Enkel kartlesing med feriedestinasjoner (retninger og avstander)', howWeAddress: 'Feriekart-ark der elevene finner steder, beskriver retninger og ansl\u00e5r reiseavstander' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele timer for tidsberegning, hele kroner uten \u00f8re, og enkle kart med f\u00e5 steder. For avanserte elever i 2. klasse legges til tidsberegning med halve og kvarte timer, budsjett med \u00f8re, flertrinnsproblemer med valutaveksling og selvstendig skriving av komplette reiseguider.',
    parentTakeaway: 'Planlegg ferien sammen som et matteprosjekt: beregn reisetider, lag et budsjett, finn destinasjoner p\u00e5 kartet. La barnet f\u00f8re reisedagbok: \u00abi dag dro vi til... og det kostet...\u00bb Regn med suvenirer: \u00ab3 magneter \u00e5 25 kr. \u2014 har vi r\u00e5d?\u00bb Ferie er den beste tverrfaglige l\u00e6ringen.',
    classroomIntegration: 'Ferietemaet i 2. klasse integrerer matematikk (tid, penger, kart), samfunnsfag (geografi, kultur) og norsk (reisedagbok, feriebrosjyre) i et reiseprosjekt. Elevene planlegger en klasseferie med budsjett, rute og dagbok. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tid, m\u00e5ling og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Tidsberegning med reisetid', emerging: 'beregner varighet med hele timer og st\u00f8tte', proficient: 'beregner selvstendig reisetid med timer og minutter fra klokkeslett', advanced: 'planlegger komplekse feriedager med flere aktiviteter og n\u00f8yaktige tidsberegninger' },
      { skill: 'Pengematematikk med reisebudsjett', emerging: 'adderer to priser innenfor 100 med st\u00f8tte', proficient: 'beregner selvstendig et reisebudsjett med addisjon, subtraksjon og vekslepenger', advanced: 'planlegger et komplett feriebudsjett med flertrinnsproblemer og prioritering' },
      { skill: 'Reisedagbok og feriebrosjyre', emerging: 'skriver 3\u20134 setninger om en ferietur med st\u00f8tte', proficient: 'skriver selvstendig en reisedagbok med dato, sted, opplevelser og refleksjon', advanced: 'skriver en detaljert feriebrosjyre med anbefalinger, budsjett og kart' },
    ],
  },

  household: {
    snippetAnswer: 'Husholdnings-oppgaver for 2. klasse (7\u20138 \u00e5r) trener flertrinnsproblemer med m\u00e5ling av rom og m\u00f8bler, informasjonslesing om husholdningssystemer, prosedyreskriving om husarbeid og sikkerhetsvurderinger med begrunnelse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 2. klasse g\u00e5r husholdningstemaet fra sortering til m\u00e5ling og analyse \u2014 syv- og \u00e5tte\u00e5ringer m\u00e5ler rom og m\u00f8bler med m\u00e5leb\u00e5nd, beregner forskjeller mellom m\u00e5l, og l\u00f8ser flertrinnsproblemer med husholdningsdata (stuen er 4 m lang, kj\u00f8kkenet er 3 m \u2014 hvor mye lengre?). Multiplikasjon med husholdningsgjenstander (4 rom med 2 vinduer = ?) gir gjentatt addisjon. Informasjonslesing om hvordan r\u00f8r, str\u00f8m og oppvarming fungerer trener faglitter\u00e6r lesing. Prosedyreskriving om husarbeid (vaske kl\u00e6r, dekke bord) med trinn-for-trinn-instruksjoner bygger strukturert skriving. Sikkerhetsvurderinger med begrunnelse utvikler kritisk tenkning. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, lesing og prosedyreskriving i 2. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'M\u00e5ling av rom og m\u00f8bler med standardenheter (cm og m)', howWeAddress: 'Romm\u00e5lings-ark der elevene m\u00e5ler dimensjoner med m\u00e5leb\u00e5nd og registrerer i tabell' },
      { milestone: 'Flertrinnsproblemer med husholdningsdata (addisjon, subtraksjon, multiplikasjon)', howWeAddress: 'Husholdningsmatematikk-ark med realistiske scenarier som krever flere regnoperasjoner' },
      { milestone: 'Prosedyreskriving om husarbeid (strukturerte trinn-for-trinn-instruksjoner)', howWeAddress: 'Instruksjonsark der elevene skriver detaljerte prosedyrer for husholdningsoppgaver' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk m\u00e5ling i hele meter, flertrinnsproblemer med to trinn, og instruksjonsmaler med bilder og setningsstartere. For avanserte elever i 2. klasse legges til m\u00e5ling i centimeter og millimeter, flertrinnsproblemer med tre operasjoner, og selvstendig skriving av sikkerhetsmanualer med begrunnede vurderinger.',
    parentTakeaway: 'Gj\u00f8r hjemmet til et matteklassrom: m\u00e5l rom og m\u00f8bler sammen, regn ut forskjeller. La barnet skrive instruksjoner for husarbeid: \u00abhvordan dekker man bordet?\u00bb \u2014 trinn-for-trinn. Diskuter sikkerhet: \u00abhvorfor skal vi ikke r\u00f8re komfyren n\u00e5r den er varm?\u00bb Praktisk kunnskap og matematikk h\u00e5nd i h\u00e5nd.',
    classroomIntegration: 'Husholdningstemaet i 2. klasse integrerer matematikk (m\u00e5ling, flertrinnsproblemer, multiplikasjon), naturfag (materialer, systemer) og norsk (informasjonslesing, prosedyreskriving) i et hjemmeprosjekt. Elevene lager en m\u00e5lt romplan, skriver husarbeidsinstruksjoner og forsker p\u00e5 husholdningssystemer. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, lesing og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'M\u00e5ling av rom og m\u00f8bler', emerging: 'm\u00e5ler i hele meter med st\u00f8tte', proficient: 'm\u00e5ler selvstendig i centimeter med m\u00e5leb\u00e5nd og registrerer data i tabell', advanced: 'm\u00e5ler presist, beregner forskjeller og tegner m\u00e5lsatt romplan' },
      { skill: 'Flertrinnsproblemer (husholdningskontekst)', emerging: 'l\u00f8ser totrinnsproblemer innenfor 50 med st\u00f8tte', proficient: 'l\u00f8ser selvstendig flertrinnsproblemer innenfor 100 med husholdningsdata', advanced: 'l\u00f8ser komplekse problemer med tre operasjoner og formulerer egne husholdningsmatteoppgaver' },
      { skill: 'Prosedyreskriving om husarbeid', emerging: 'skriver 3\u20134 trinn for en enkel oppgave med st\u00f8tte', proficient: 'skriver selvstendig detaljerte prosedyrer med rekkef\u00f8lge, tidsangivelser og sikkerhetstips', advanced: 'skriver en komplett sikkerhetsmanual med begrunnede vurderinger og illustrasjoner' },
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
