#!/usr/bin/env node
/**
 * SEO Part 264: NO Third-Grade Enrichment — Themes 1-25
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the third-grade grade block of 25 NO theme files (alphabet through household).
 *
 * CRITICAL DIFFERENCE from second-grade scripts: third-grade is the LAST grade block,
 * so the end boundary is the top-level `// -- FAQ --` comment, not another grade marker.
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    snippetAnswer: 'Alfabet-oppgaver for 3. klasse (8\u20139 \u00e5r) trener avansert morfologisk analyse med latinske og greske rotord, oppslagsferdigheter i ordbok med ledeord og uttaleangivelser, l\u00f8kkeskrift og selvstendig skriving av forskningsrapporter med kildehenvisning og avsnittsstruktur. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse er alfabetet et avansert forskningsverkt\u00f8y \u2014 \u00e5tte- og ni\u00e5ringer mestrer oppslagsferdigheter med ledeord, uttaleangivelser og flere definisjoner, deler ukjente ord i latinske og greske rotord med forstavelser og endelser (u-for-st\u00e5-elig, gjen-nom-skue-lig), og bruker alfabetisk ordning til \u00e5 navigere i indekser, ordlister og leksikon. L\u00f8kkeskrift introduseres systematisk med str\u00f8kgrupper. Ordfamilieunders\u00f8kelser avsl\u00f8rer hvordan \u00e9tt rotord genererer titalls relaterte ord. Skriving av flersnittrapporter med emnesetninger, st\u00f8ttende detaljer og kilder krever avansert avsnittsstruktur. Kryptogrammer og avanserte ordoppstokninger trener logisk tenkning. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for lesing, ordforr\u00e5d og skriftlig fremstilling i 3. trinn st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'Avansert morfologisk analyse (8\u20139-\u00e5ringer deler ord i latinske/greske rotord, forstavelser og endelser)', howWeAddress: 'Rotordsunders\u00f8kelser der elevene kartlegger ordfamilier visuelt og forklarer hvordan affikser endrer betydning' },
      { milestone: 'Oppslagsforskning med ledeord og uttaleangivelser (selvstendig referansebruk)', howWeAddress: 'Ordboksdetektiv-ark der elevene bruker ledeord til \u00e5 lokalisere ord, tolker uttaleangivelser og velger korrekt definisjon' },
      { milestone: 'L\u00f8kkeskrift (str\u00f8kgrupper og bokstavforbindelser)', howWeAddress: 'L\u00f8kkeskrift-\u00f8vingsark med str\u00f8kgrupper, forbindelsesbokstaver og avskrivning av korte tekster' },
      { milestone: 'Flersnittkomposisjon med avsnittsstruktur (emnesetning, detaljer, avslutning)', howWeAddress: 'Forskningsrapport-maler med avsnittsrammer veileder elevene fra kildeinnsamling til strukturert rapport' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tostavelsesord med \u00e9n forstavelse, tilby forenklet ordbok med bildest\u00f8tte, og gi l\u00f8kkeskrift med ekstra store bokstaver og f\u00e6rre forbindelser. For avanserte elever i 3. klasse legges til trestavelsesord med flere affikser, etymologisk analyse med ordhistorier, og selvstendig forskningsrapport med flere kilder og kryssreferanser.',
    parentTakeaway: 'Lek orddetektiv p\u00e5 h\u00f8yt niv\u00e5: finn rotordet i \u00abuforst\u00e5elig\u00bb og forklar hva forstavelsen \u00abu\u00bb og endelsen \u00abelig\u00bb gj\u00f8r med betydningen. Sl\u00e5 sammen opp et nytt ord i ordboken og les b\u00e5de uttaleveiledning og definisjon. \u00d8v l\u00f8kkeskrift ved \u00e5 skrive postkort til besteforeldre. Ordforr\u00e5det vokser eksponentielt n\u00e5r barnet forst\u00e5r ordenes byggesteiner.',
    classroomIntegration: 'Alfabetoppgaver i 3. klasse fungerer som forskningsverkt\u00f8y p\u00e5 tvers av alle fag: rotordsanalyse introduserer fagtermer i naturfag og historie, ordbok\u00f8velser st\u00f8tter selvstendig lesing, l\u00f8kkeskrift brukes i daglig skriving, og forskningsrapporter med kilder trenes i prosjektarbeid. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for lesing, ordforr\u00e5d og skriftlig fremstilling st\u00f8ttes systematisk.',
    assessmentRubric: [
      { skill: 'Morfologisk analyse (rotord, forstavelser, endelser)', emerging: 'identifiserer rotordet i sammensatte ord med st\u00f8tte og navngir \u00e9n forstavelse', proficient: 'deler selvstendig flerstavelsesord i rot, forstavelse og endelse og forklarer betydningsendringen', advanced: 'analyserer etymologi, kartlegger ordfamilier og anvender morfologisk analyse strategisk p\u00e5 ukjente fagord' },
      { skill: 'Oppslag og referanseforskning', emerging: 'finner ord i en enkel ordliste med alfabetisk ordning etter f\u00f8rstebokstav', proficient: 'bruker selvstendig ledeord, tolker uttaleangivelser og velger korrekt definisjon blant flere', advanced: 'navigerer flytende i ordbok, leksikon og indeks, kryssrefererer kilder og vurderer definisjonenes kontekst' },
      { skill: 'Flersnittkomposisjon med avsnittsstruktur', emerging: 'skriver ett avsnitt med emnesetning og 2\u20133 detaljer med st\u00f8tte fra rammer', proficient: 'skriver selvstendig en rapport med flere avsnitt, kilder og logisk struktur', advanced: 'skriver en velstrukturert rapport med innledning, hoveddel, konklusjon, kildeliste og avsnittsoverganger' },
    ],
  },

  animals: {
    snippetAnswer: 'Dyre-oppgaver for 3. klasse (8\u20139 \u00e5r) trener multiplikasjon og divisjon innenfor 100 med dyrepopulasjoner, br\u00f8ker med n\u00e6ringskjeder, sammenlignende forskningsrapporter med flere kilder og datafortolkning med linje- og s\u00f8ylediagrammer. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir dyretemaet et tverrfaglig forskningsprosjekt p\u00e5 h\u00f8yt niv\u00e5 \u2014 \u00e5tte- og ni\u00e5ringer mestrer multiplikasjon og divisjon innenfor 100 med dyrepopulasjonsdata (72 fugler fordelt p\u00e5 8 tr\u00e6r = 9 per tre), arbeider med br\u00f8ker i n\u00e6ringskjeder (en tredjedel av planteeterne er byttedyr), og analyserer dyredata i linjediagrammer over tid. Sammenlignende forskningsrapporter med flere kilder krever parafrasering, kildehenvisning og strukturerte avsnitt. Areal og omkrets beregnes for dyrehabitater. M\u00e5lekonvertering mellom cm, m og km brukes til dyreavstander. Klassifikasjon utvides til systematikk med rike, rekke og klasse. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, divisjon, data og skriftlig rapportering i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon og divisjon innenfor 100 (8\u20139-\u00e5ringer mestrer tabeller og omvendte operasjoner)', howWeAddress: 'Dyrepopulasjonsoppgaver med multiplikasjon og divisjon der elevene verifiserer med omvendt operasjon' },
      { milestone: 'Linjediagrammer over tid (datafortolkning med trender)', howWeAddress: 'Dyrebestandsdiagrammer over m\u00e5neder der elevene avleser trender og formulerer konklusjoner' },
      { milestone: 'Sammenlignende forskningsrapport med flere kilder', howWeAddress: 'Forskningsrapport-maler med krav om minst to kilder, parafrasering og kildeliste' },
      { milestone: 'Areal og omkrets med dyrehabitater (beregning i cm\u00b2 og cm)', howWeAddress: 'Habitat-arealark der elevene beregner areal og omkrets av innhegninger og sammenligner st\u00f8rrelser' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens tabeller til 2, 5 og 10, bruk enkle s\u00f8ylediagrammer, og tilby rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til divisjon med rest, linjediagrammer med to datasett, og selvstendig sammenlignende analyse av tre arter med statistikk.',
    parentTakeaway: 'Start et dyreforskningsprosjekt med to kilder: en bok og en nettside. Regn med dyredata: \u00ab84 fisker fordelt p\u00e5 7 akvarier \u2014 hvor mange i hvert?\u00bb Tegn et linjediagram over fugler ved fuglebrettet over fire uker. Beregn arealet av hundekurven. Dyrematematikk i 3. klasse handler om presisjon og systematikk.',
    classroomIntegration: 'Dyretemaet i 3. klasse er \u00e5rsprosjektets omdreiningspunkt: naturfagstimen med systematikk og \u00f8kosystemer, matematikktimen med multiplikasjon, divisjon og diagrammer, norsktimen med sammenlignende rapporter og presentasjoner. Et klasseforskningsbibliotek med elevrapporter bygges opp l\u00f8pende. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, divisjon, data og rapportering st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon og divisjon innenfor 100 (dyrekontekst)', emerging: 'l\u00f8ser multiplikasjon i 2-, 5- og 10-gangen med st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjon og divisjon innenfor 100 og verifiserer med omvendt operasjon', advanced: 'l\u00f8ser flertrinnsproblemer med b\u00e5de multiplikasjon og divisjon, formulerer egne oppgaver og forklarer strategier' },
      { skill: 'Linjediagrammer og datafortolkning', emerging: 'avleser enkle s\u00f8ylediagrammer og besvarer sp\u00f8rsm\u00e5l med st\u00f8tte', proficient: 'oppretter og fortolker selvstendig linjediagrammer, identifiserer trender og formulerer konklusjoner', advanced: 'sammenligner to linjediagrammer, forklarer \u00e5rsaker til trender og foresl\u00e5r prognoser basert p\u00e5 data' },
      { skill: 'Sammenlignende dyreforskningsrapport', emerging: 'skriver en rapport med \u00e9n kilde og setningsstartere', proficient: 'skriver selvstendig en sammenlignende rapport med to kilder, parafrasering og kildeliste', advanced: 'skriver en detaljert rapport med tre kilder, kryssreferanser, datadiagrammer og perspektivering' },
    ],
  },

  birds: {
    snippetAnswer: 'Fugle-oppgaver for 3. klasse (8\u20139 \u00e5r) trener linjediagrammer med sesongdata, divisjon med fugletrekkstall, areal av fuglehabitater, m\u00e5lekonvertering cm/m/km og selvstendig skriving av ornitologiske forskningsrapporter med hypotese og konklusjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir fugletemaet et vitenskapelig forskningsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer kan gjennomf\u00f8re sesongbaserte fugletelllinger, registrere resultater i linjediagrammer over fire sesonger og analysere trender. Divisjon med fugletrekkdata (96 storker fordelt p\u00e5 8 flokker = 12 per flokk) gir divisjon i naturkontekst. Areal og omkrets beregnes for fuglereservater i m\u00b2. M\u00e5lekonvertering mellom cm, m og km brukes til trekkruter. Forskningsrapporter med hypotese, metode, resultater og konklusjon trener full vitenskapelig metode. Br\u00f8ker brukes til fjærprosenter (tre \u00e5ttendedeler av fuglene er trekkfugler). Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, data og rapportering i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Linjediagrammer med sesongdata (8\u20139-\u00e5ringer analyserer trender over tid)', howWeAddress: 'Sesong-fugletellings-ark med linjediagrammer over fire sesonger der elevene identifiserer og forklarer trender' },
      { milestone: 'Divisjon i naturkontekst (fordeling av fugler i flokker med og uten rest)', howWeAddress: 'Fugleflokk-divisjonsark der elevene fordeler fugler likt og h\u00e5ndterer rest med forklaring' },
      { milestone: 'Vitenskapelig rapport med hypotese og konklusjon', howWeAddress: 'Fugleforsknings-maler med fire seksjoner (hypotese, metode, resultater, konklusjon) veileder vitenskapelig skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle s\u00f8ylediagrammer med to sesonger, hold divisjon innenfor 50, og tilby rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til doble linjediagrammer, divisjon med rest og desimaler, og selvstendig fugleforskningsrapport med statistisk analyse og kildevurdering.',
    parentTakeaway: 'F\u00f8r en sesongfugle-dagbok: tell fugler ved fuglebrettet en gang i m\u00e5neden og tegn et linjediagram over \u00e5ret. Regn med fugletall: \u00ab72 st\u00e6r fordelt p\u00e5 6 flokker \u2014 hvor mange i hver flokk?\u00bb Beregn arealet av fuglebrettet. M\u00e5l avstander i hagen i meter og konverter til cm. Fugletemaet er naturvitenskap, matematikk og skriving i \u00e9tt.',
    classroomIntegration: 'Fugletemaet i 3. klasse kj\u00f8rer som \u00e5rsprosjekt med m\u00e5nedlige datainnsamlinger: matematikktimen med linjediagrammer, divisjon og arealberegning, naturfagstimen med systematisk artsobservasjon og \u00f8kologi, norsktimen med forskningsrapporter med vitenskapelig metode. Et klasseornitologi-arkiv bygges opp l\u00f8pende. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for data, naturfag og rapportering st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Linjediagrammer med sesongdata', emerging: 'avleser et enkelt s\u00f8ylediagram med st\u00f8tte og besvarer enkle sp\u00f8rsm\u00e5l', proficient: 'oppretter og fortolker selvstendig linjediagrammer over fire sesonger og beskriver trender', advanced: 'sammenligner to linjediagrammer, foresl\u00e5r forklaringer p\u00e5 trender og formulerer prognoser' },
      { skill: 'Divisjon med fugledata', emerging: 'fordeler 20\u201330 fugler i 2\u20133 like grupper med konkreter', proficient: 'l\u00f8ser selvstendig divisjon innenfor 100, h\u00e5ndterer rest og verifiserer med multiplikasjon', advanced: 'l\u00f8ser flertrinnsdivisjonsoppgaver, formulerer egne oppgaver og forklarer sammenhengen med br\u00f8ker' },
      { skill: 'Vitenskapelig fugleforskningsrapport', emerging: 'skriver en rapport med resultater og konklusjon med st\u00f8tte fra mal', proficient: 'skriver selvstendig en rapport med hypotese, metode, resultater og konklusjon', advanced: 'skriver en detaljert rapport med statistisk analyse, feilkilder, kildevurdering og perspektivering' },
    ],
  },

  birthday: {
    snippetAnswer: 'Bursdags-oppgaver for 3. klasse (8\u20139 \u00e5r) trener flertrinnstekstoppgaver med tid og penger, br\u00f8kberegning med kake og gaver, multiplikasjon og divisjon med festbudsjett og selvstendig skriving av festplanlegging med overbevisende argumentasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir bursdagstemaet et avansert planleggings- og beregningsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer l\u00f8ser flertrinnstekstoppgaver med b\u00e5de tid og penger (festen starter kl. 14:30, varer 2 timer 45 minutter \u2014 n\u00e5r slutter den? Budsjettet er 500 kr. \u2014 hva har vi r\u00e5d til?). Br\u00f8ker brukes til kakedeling (en \u00e5ttendedel av kaken til 8 gjester) og gavefordeling. Divisjon med rest l\u00f8ser fordelingsproblemer (25 drops til 8 barn = 3 til hver, 1 til overs). Multiplikasjon med tosifrede tall beregner festkostnader. Overbevisende skriving trener argumentasjon for et festtema med p\u00e5stand, begrunnelse og motargument. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, br\u00f8ker og argumentasjon i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnstekstoppgaver med tid og penger (8\u20139-\u00e5ringer kombinerer to operasjoner i \u00e9n oppgave)', howWeAddress: 'Festplanleggingsoppgaver der elevene beregner tidsforl\u00f8p og budsjetter i samme oppgave med flere trinn' },
      { milestone: 'Br\u00f8ker med konkret deling (\u00e5ttendedeler, sjettedeler i festkontekst)', howWeAddress: 'Kakedeling-ark med \u00e5ttendedeler og sjettedeler der elevene beregner og sammenligner br\u00f8kst\u00f8rrelser' },
      { milestone: 'Divisjon med rest (fordelingsproblemer i virkeligheten)', howWeAddress: 'Festfordelingsark der elevene fordeler gaver, godteri og stoler med rest og forklarer hva resten betyr' },
      { milestone: 'Overbevisende argumentasjon (p\u00e5stand, begrunnelse, motargument)', howWeAddress: 'Festtema-debattark der elevene skriver overbevisende tekster for og imot et festtema med motargumenter' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, l\u00f8s totrinnsproblemer med hele timer og runde priser, bruk halvdeler og fjerdedeler, og tilby argumentrammer med setningsstartere. For avanserte elever i 3. klasse legges til tretrinnsproblemer med minutter og \u00f8reberegning, br\u00f8ksammenligning med ulike nevnere, og fri debattskriving med flere argumenter og nyansert konklusjon.',
    parentTakeaway: 'Planlegg bursdagen som avansert matematikk: \u00abbudsjett p\u00e5 500 kr. \u2014 kake 125 kr., pynt 89 kr., godteposer 8 stk. \u00e0 22 kr. Har vi r\u00e5d?\u00bb Del kaken i \u00e5ttendedeler. Beregn: \u00abfesten starter 14:30, varer 2 timer 45 minutter \u2014 n\u00e5r henter foreldrene?\u00bb La barnet argumentere for \u00f8nsketemaet. Festmatematikk er livets mest motiverende matematikk.',
    classroomIntegration: 'Bursdagstemaet i 3. klasse brukes som tverrfaglig prosjekt: matematikktimen med flertrinnsproblemer, br\u00f8ker og divisjon, norsktimen med overbevisende skriving og festinvitasjoner, samfunnsfag med budsjettl\u00e6ring og \u00f8konomi. Klassebursdag med elevplanlegging forbinder teori og praksis. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, br\u00f8ker og argumentasjon st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Flertrinnstekstoppgaver (tid og penger)', emerging: 'l\u00f8ser totrinnsproblemer med hele timer og runde priser med st\u00f8tte', proficient: 'l\u00f8ser selvstendig tretrinnsproblemer med tid i minutter og penger med \u00f8re, viser mellomregninger', advanced: 'formulerer egne flertrinnsproblemer, l\u00f8ser komplekse budsjett- og tidsproblemer og verifiserer systematisk' },
      { skill: 'Br\u00f8ker med festdeling', emerging: 'finner halvdeler og fjerdedeler av runde tall med konkreter', proficient: 'beregner selvstendig \u00e5ttendedeler og sjettedeler, sammenligner br\u00f8ker og forklarer metoden', advanced: 'sammenligner br\u00f8ker med ulike nevnere, l\u00f8ser br\u00f8koppgaver i kontekst og forklarer strategier' },
      { skill: 'Overbevisende festskriving', emerging: 'skriver 3\u20134 setninger med p\u00e5stand og enkel begrunnelse', proficient: 'skriver selvstendig en overbevisende tekst med p\u00e5stand, begrunnelse og motargument', advanced: 'skriver en nyansert argumentasjon med flere perspektiver, motargumenter og overbevisende konklusjon' },
    ],
  },

  body: {
    snippetAnswer: 'Kropp-oppgaver for 3. klasse (8\u20139 \u00e5r) trener detaljert organsystemanalyse, m\u00e5lekonvertering mellom cm/m/km, br\u00f8ker med n\u00e6ringsstoffer, datafortolkning med linjediagrammer og selvstendig skriving av helseforskningsrapporter med kilder. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse utvides kroppstemaet til avansert systemforst\u00e5else \u2014 \u00e5tte- og ni\u00e5ringer kan analysere samspillet mellom fire organsystemer (kretsl\u00f8p, \u00e5ndedrett, ford\u00f8yelse, bevegelsesapparat), forst\u00e5 at blod transporterer oksygen fra lungene til musklene. M\u00e5lekonvertering mellom cm, m og km brukes til kroppsdata (barnets h\u00f8yde 142 cm = 1,42 m). Br\u00f8ker beregner n\u00e6ringsstoffandeler (en fjerdedel av tallerkenen er protein). Linjediagrammer viser vekstdata over tid. Divisjon beregner gjennomsnittspuls (600 slag p\u00e5 10 minutter = 60 slag/minutt). Helseforskningsrapporter med hypotese og flere kilder trener vitenskapelig argumentasjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for helse, m\u00e5ling og vitenskapelig rapportering i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Organsystemers samspill (8\u20139-\u00e5ringer forst\u00e5r at systemer arbeider sammen p\u00e5 tvers)', howWeAddress: 'Systemsamspills-diagrammer der elevene forbinder fire organsystemer og forklarer oksygenets vei fra luft til muskel' },
      { milestone: 'M\u00e5lekonvertering cm/m/km (fleksibel omregning med kroppsdata)', howWeAddress: 'Kroppsm\u00e5lings-konverteringsark der elevene omregner h\u00f8yder og avstander mellom cm, m og km' },
      { milestone: 'Gjennomsnittsberegning med divisjon (pulsdata, vekstdata)', howWeAddress: 'Pulsdata-ark der elevene beregner gjennomsnittspuls med divisjon og sammenligner f\u00f8r/etter bevegelse' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, fokuser p\u00e5 to organsystemer og hele centimeter, bruk ferdiglagde diagrammer og tilby rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til fire organsystemers samspill, m\u00e5lekonvertering med desimaler, gjennomsnitt med store datasett og selvstendig helseforskningsrapport med statistikk og kildevurdering.',
    parentTakeaway: 'Gj\u00f8r kroppen til et hjemmelaboratorium: m\u00e5l barnets h\u00f8yde i cm og konverter til meter. Tell pulsen f\u00f8r og etter l\u00f8ping og beregn gjennomsnittet. Regn med n\u00e6ring: \u00aben fjerdedel av tallerkenen er protein \u2014 hva er det i gram?\u00bb Tegn et vekstdiagram over seks m\u00e5neder. Kroppen er det mest engasjerende vitenskapslaboratoriet.',
    classroomIntegration: 'Kroppstemaet i 3. klasse integrerer naturfag (organsystemer og helse), matematikk (m\u00e5lekonvertering, gjennomsnitt, br\u00f8ker) og norsk (forskningsrapporter) i et helhetlig prosjekt. Elevene gjennomf\u00f8rer helseunders\u00f8kelser, bygger klassestatistikk og skriver vitenskapelige rapporter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for helse, m\u00e5ling og rapportering st\u00f8ttes helhetlig.',
    assessmentRubric: [
      { skill: 'Organsystemers samspill (kroppskontekst)', emerging: 'navngir de fire organsystemene med st\u00f8tte og beskriver \u00e9n funksjon', proficient: 'forklarer selvstendig samspillet mellom to systemer og beskriver oksygenets vei', advanced: 'analyserer fire systemers samspill, forklarer konsekvensene av svikt i ett system og bruker fagterminologi' },
      { skill: 'M\u00e5lekonvertering og gjennomsnittsberegning', emerging: 'omregner cm til m med hele tall med st\u00f8tte', proficient: 'konverterer selvstendig mellom cm, m og km og beregner gjennomsnitt med divisjon', advanced: 'konverterer med desimaler, beregner gjennomsnitt av store datasett og tolker resultater i kontekst' },
      { skill: 'Helseforskningsrapport', emerging: 'skriver 3\u20134 setninger om et helsefunn med mal og ordbank', proficient: 'skriver selvstendig en rapport med hypotese, data, konklusjon og \u00e9n kilde', advanced: 'skriver en detaljert rapport med statistikk, flere kilder, kildevurdering og helser\u00e5d' },
    ],
  },

  camping: {
    snippetAnswer: 'Camping-oppgaver for 3. klasse (8\u20139 \u00e5r) trener arealberegning av teltplasser, m\u00e5lekonvertering med turdata, divisjon av proviant mellom deltakere, linjediagrammer med v\u00e6rdata og selvstendig skriving av turplanleggingsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir campingtemaet et avansert planleggings- og beregningsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer beregner areal og omkrets av teltplasser og leirplasser i m\u00b2, konverterer mellom cm, m og km for turveier, og fordeler proviant med divisjon (24 br\u00f8dskiver til 6 turdeltakere = 4 hver). Flertrinnsproblemer kombinerer tid, vekt og avstand: \u00abvi g\u00e5r 3 km/t i 2\u00bd time \u2014 hvor langt?\u00bb Linjediagrammer med v\u00e6rdata over turuka viser temperatursvingninger. Br\u00f8ker brukes til matporsjonering. Turplanleggingsrapporter med utstyrsliste, budsjett og tidsplan trener sakprosaskriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for areal, m\u00e5ling og praktisk matematikk i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Areal og omkrets med reelle m\u00e5l (8\u20139-\u00e5ringer beregner i m\u00b2 og m)', howWeAddress: 'Teltplass-arealark der elevene beregner areal og omkrets av leirplasser med oppgitte m\u00e5l' },
      { milestone: 'M\u00e5lekonvertering med turdata (cm, m, km fleksibelt)', howWeAddress: 'Turveiberegning-ark der elevene konverterer avstander mellom enheter og beregner total turlengde' },
      { milestone: 'Divisjon av proviant (fordeling med og uten rest)', howWeAddress: 'Proviantfordelingsark der elevene fordeler mat og utstyr likt og h\u00e5ndterer rest praktisk' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele meter i arealberegning, hold divisjon innenfor 50, og tilby turplan-maler med felt for hvert avsnitt. For avanserte elever i 3. klasse legges til arealberegning med desimaler, flertrinnsproblemer med tre operasjoner, og selvstendig turplanleggingsrapport med budsjett, kart og v\u00e6ranalyse.',
    parentTakeaway: 'Planlegg en familietur som matteprosjekt: beregn arealet av teltet (3 m \u00d7 2,5 m). Fordel proviant: \u00ab18 epler til 4 personer \u2014 hvor mange hver, og hva gj\u00f8r vi med resten?\u00bb Konverter turdistanser: \u00ab2 500 m = hvor mange km?\u00bb Tegn temperaturdiagram for turuka. Campingmatematikk er anvendt matematikk p\u00e5 sitt beste.',
    classroomIntegration: 'Campingtemaet i 3. klasse driver tverrfaglig l\u00e6ring: matematikktimen med areal, divisjon og m\u00e5lekonvertering, naturfagstimen med v\u00e6r og kartlesing, norsktimen med turplanlegging og rapportskriving. Et klasseturprosjekt med reell planlegging forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, data og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Areal og omkrets (campingkontekst)', emerging: 'beregner areal med hele tall og enkel multiplikasjon med st\u00f8tte', proficient: 'beregner selvstendig areal og omkrets av teltplasser og sammenligner st\u00f8rrelser', advanced: 'l\u00f8ser arealproblemer med desimaler og uregelrette former og formulerer egne oppgaver' },
      { skill: 'Divisjon av proviant og ressurser', emerging: 'fordeler 20\u201340 enheter i 2\u20134 like grupper med konkreter', proficient: 'l\u00f8ser selvstendig divisjon innenfor 100 med rest og forklarer praktisk l\u00f8sning for resten', advanced: 'l\u00f8ser flertrinnsproblemer med divisjon og multiplikasjon kombinert og verifiserer systematisk' },
      { skill: 'Turplanleggingsrapport', emerging: 'skriver en enkel utstyrsliste og 3\u20134 setninger om turplanen med st\u00f8tte', proficient: 'skriver selvstendig en turplan med budsjett, tidsplan, utstyrsliste og begrunnede valg', advanced: 'skriver en komplett turrapport med kart, v\u00e6ranalyse, budsjettoptimering og risikovurdering' },
    ],
  },

  circus: {
    snippetAnswer: 'Sirkus-oppgaver for 3. klasse (8\u20139 \u00e5r) trener multiplikasjon med billettsalg og publikumstall, br\u00f8ker med forestillingstider, arealberegning av arenaer, symmetri og m\u00f8nster i sirkusdesign og selvstendig skriving av anmeldelser med vurdering. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir sirkustemaet et matematisk og kreativt prosjekt p\u00e5 h\u00f8yt niv\u00e5 \u2014 \u00e5tte- og ni\u00e5ringer beregner billettsalg med multiplikasjon (7 rader \u00d7 12 stoler = 84 plasser), fordeler forestillingstid med br\u00f8ker (en fjerdedel til klovner, en tredjedel til akrobater), og beregner areal av sirkusarenaen. Linjediagrammer viser publikumstall over sesongen. Divisjon med rest fordeler kostymer og rekvisitter (50 baller til 8 sjongl\u00f8rer = 6 hver, 2 til overs). Geometri utforskes gjennom symmetri i sirkusplakater. Anmeldelser med p\u00e5stand, begrunnelse og anbefaling trener vurderende skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, br\u00f8ker og sakprosa i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med tosifrede tall (8\u20139-\u00e5ringer multipliserer rad \u00d7 seter)', howWeAddress: 'Billettsalg-ark der elevene beregner totalkapasitet, inntekt og fordeling med flersifret multiplikasjon' },
      { milestone: 'Br\u00f8ker med tidsfordeling (dele av en helhet i forestillingskontekst)', howWeAddress: 'Forestillingsprogram-ark der elevene beregner br\u00f8kdeler av total spilletid og sammenligner numrenes varighet' },
      { milestone: 'Vurderende skriving (anmeldelse med p\u00e5stand, begrunnelse, anbefaling)', howWeAddress: 'Sirkusanmeldelse-ark der elevene skriver strukturerte anmeldelser med vurderingskriterier og begrunnelse' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk ensifret multiplikasjon, halvdeler og fjerdedeler i tidsfordeling, og tilby anmeldelsesrammer med setningsstartere. For avanserte elever i 3. klasse legges til tosifret \u00d7 tosifret multiplikasjon, br\u00f8ksammenligning med ulike nevnere, og fri anmeldelse med flere vurderingskriterier og nyansert argumentasjon.',
    parentTakeaway: 'Bes\u00f8k et sirkus (eller se en video) og regn: \u00ab7 rader med 12 stoler \u2014 hvor mange publikummere?\u00bb Del forestillingstiden: \u00aben tredjedel av 90 minutter til akrobater.\u00bb Beregn arealet av sirkusringen. Skriv en anmeldelse med stjerner og begrunnelse. Sirkusmatematikk er underholdning og l\u00e6ring i ett.',
    classroomIntegration: 'Sirkustemaet i 3. klasse fungerer som tverrfaglig prosjekt: matematikktimen med multiplikasjon, br\u00f8ker og arealberegning, norsktimen med anmeldelser og plakattekster, kunst og h\u00e5ndverk med symmetridesign og sirkusplakater. En klassesirkusforestilling med elevplanlegging forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for regning, geometri og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med billettsalg', emerging: 'l\u00f8ser ensifret multiplikasjon i sirkuskontekst med st\u00f8tte', proficient: 'l\u00f8ser selvstendig tosifret multiplikasjon og beregner inntekter og kapasitet', advanced: 'l\u00f8ser flertrinnsproblemer med multiplikasjon og divisjon, formulerer egne billettoppgaver og verifiserer' },
      { skill: 'Br\u00f8ker med forestillingstid', emerging: 'finner halvdeler og fjerdedeler av hele timer med konkreter', proficient: 'beregner selvstendig tredjedeler og fjerdedeler av minuttall og sammenligner varigheter', advanced: 'sammenligner br\u00f8ker med ulike nevnere, beregner forholdet mellom numre og optimerer et program' },
      { skill: 'Sirkusanmeldelse med vurdering', emerging: 'skriver 3\u20134 setninger med enkel vurdering med st\u00f8tte', proficient: 'skriver selvstendig en anmeldelse med p\u00e5stand, begrunnelse og anbefaling', advanced: 'skriver en nyansert anmeldelse med flere kriterier, sammenligning og overbevisende konklusjon' },
    ],
  },

  clothing: {
    snippetAnswer: 'Kl\u00e6r-oppgaver for 3. klasse (8\u20139 \u00e5r) trener m\u00e5lekonvertering med stoflengder, arealberegning av stoff, multiplikasjon med kl\u00e6spriser, br\u00f8ker med m\u00f8nstre og selvstendig skriving av stilguider med argumentasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir kl\u00e6rtemaet et praktisk prosjekt med m\u00e5ling og \u00f8konomi \u2014 \u00e5tte- og ni\u00e5ringer konverterer mellom cm og m for stoflengder, beregner areal av stoffstykker for \u00e5 planlegge s\u00f8mprosjekter, og bruker multiplikasjon til prisberegning (8 klesplagg \u00e0 79 kr.). Br\u00f8ker vises gjennom m\u00f8nsterfordeling (tre \u00e5ttendedeler av stoffet er stripete). Divisjon fordeler kl\u00e6r i skap (36 plagg i 4 skuffer = 9 per skuff). Linjediagrammer viser sesongvise prisendringer. Stilguider med argumentasjon for klesvalg trener vurderende skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, \u00f8konomi og sakprosa i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'M\u00e5lekonvertering med cm/m i tekstilkontekst (8\u20139-\u00e5ringer konverterer fleksibelt)', howWeAddress: 'Stoflengde-konverteringsark der elevene m\u00e5ler, konverterer og beregner totalbehov for s\u00f8mprosjekter' },
      { milestone: 'Arealberegning av stoff (l\u00d7b i cm\u00b2 og m\u00b2)', howWeAddress: 'Stoff-arealark der elevene beregner areal av stoffstykker og planlegger utklipp med minimalt svinn' },
      { milestone: 'Multiplikasjon med prisberegning (tosifrede tall i \u00f8konomikontekst)', howWeAddress: 'Klesbudsjett-ark der elevene multipliserer priser, beregner totalsum og finner vekslepenger' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele centimeter og ensifret multiplikasjon, tilby ferdiglagde arealformler, og gi stilguide-maler med felt for hvert argument. For avanserte elever i 3. klasse legges til konvertering med desimaler, arealberegning med sammensatte former, og selvstendig stilguide med prissammenligning, b\u00e6rekraftsanalyse og overbevisende argumentasjon.',
    parentTakeaway: 'Gj\u00f8r klesskap til matematikk: \u00ab36 plagg i 4 skuffer \u2014 hvor mange i hver?\u00bb M\u00e5l et stoff til en pute: \u00ab40 cm \u00d7 40 cm = hvor stort areal?\u00bb Regn med kl\u00e6spriser p\u00e5 salg: \u00ab3 gensere \u00e0 149 kr.\u00bb Konverter: \u00ab1,5 m stoff = hvor mange cm?\u00bb La barnet skrive en stilguide med begrunnelser. Kl\u00e6rtemaet gj\u00f8r matematikk hverdagsnyttigt.',
    classroomIntegration: 'Kl\u00e6rtemaet i 3. klasse binder sammen matematikk (m\u00e5lekonvertering, areal, multiplikasjon), kunst og h\u00e5ndverk (tekstilarbeid og design), og norsk (stilguider og argumentasjon). Et klasse-s\u00f8mprosjekt med m\u00e5ling, budsjett og designvalg forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, \u00f8konomi og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'M\u00e5lekonvertering med stoflengder', emerging: 'konverterer cm til m med hele tall med st\u00f8tte', proficient: 'konverterer selvstendig mellom cm og m med desimaler og beregner totalbehov', advanced: 'planlegger komplekse s\u00f8mprosjekter med konvertering, svinnberegning og optimering' },
      { skill: 'Arealberegning av stoff', emerging: 'beregner areal av rektangler med hele tall og st\u00f8tte', proficient: 'beregner selvstendig areal av stoffstykker og sammenligner st\u00f8rrelser', advanced: 'beregner areal av sammensatte former, planlegger utklipp med minimalt svinn og forklarer strategien' },
      { skill: 'Stilguide med argumentasjon', emerging: 'skriver 3\u20134 setninger om et klesvalg med enkel begrunnelse', proficient: 'skriver selvstendig en stilguide med p\u00e5stander, begrunnelser og anbefalinger', advanced: 'skriver en nyansert guide med prissammenligning, b\u00e6rekraftsperspektiv og overbevisende argumentasjon' },
    ],
  },

  colors: {
    snippetAnswer: 'Farge-oppgaver for 3. klasse (8\u20139 \u00e5r) trener br\u00f8ker med fargeblandinger, multiplikasjon med fargekoder, m\u00f8nstergjenkjenning med fargesekvenser, arealberegning av fargeflater og selvstendig skriving av fargeteori-rapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir fargetemaet et vitenskapelig og matematisk prosjekt \u2014 \u00e5tte- og ni\u00e5ringer arbeider med br\u00f8ker i fargeblandinger (to femtedeler r\u00f8dt + tre femtedeler bl\u00e5tt = lilla), multipliserer med fargekoder (RGB-verdier), og beregner areal av fargefelter i kunstprosjekter. M\u00f8nstergjenkjenning med flertrinnsfargsekvenser krever algebraisk tenkning. Divisjon fordeler maling i porsjoner (500 ml i 8 kopper). Linjediagrammer viser lysstyrke over tid. Fargeteoretiske rapporter med forklaring av komplement\u00e6rfarger og fargehjulet trener faglig sakprosa. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, geometri og sakprosa i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Br\u00f8ker med fargeblandinger (8\u20139-\u00e5ringer forst\u00e5r deler av en helhet visuelt)', howWeAddress: 'Fargeblandings-ark der elevene beregner br\u00f8kforhold mellom farger og forutsier resultatfargen' },
      { milestone: 'M\u00f8nstergjenkjenning med flertrinnsekvenser (algebraisk fortenkning)', howWeAddress: 'Fargesekvens-oppgaver med voksende kompleksitet der elevene identifiserer regler og videref\u00f8rer m\u00f8nsteret' },
      { milestone: 'Arealberegning av fargeflater i kunst (l\u00d7b i cm\u00b2)', howWeAddress: 'Fargefelt-arealark der elevene beregner areal av hvert fargefelt i en komposisjon og finner totalarealet' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk halvdeler og fjerdedeler i blandinger, enkle todelte sekvenser, og ferdiglagde arealformler. For avanserte elever i 3. klasse legges til br\u00f8ker med ulike nevnere, flertrinnsekvenser med to variabler, og selvstendig fargeteorirapport med RGB-verdier og vitenskapelig begrunnelse.',
    parentTakeaway: 'Bland farger som matematikk: \u00abto femtedeler r\u00f8dt + tre femtedeler gult \u2014 hvilken farge f\u00e5r vi?\u00bb Beregn areal: \u00abmal en vegg 3 m \u00d7 2 m \u2014 hvor stort areal?\u00bb Fordel maling: \u00ab500 ml i 8 kopper.\u00bb Lag fargesekvenser og la barnet finne m\u00f8nsteret. Fargematematikk er kunst og logikk i perfekt harmoni.',
    classroomIntegration: 'Fargetemaet i 3. klasse integrerer matematikk (br\u00f8ker, areal, m\u00f8nstre), kunst og h\u00e5ndverk (fargeteori og komposisjon), og naturfag (lysspekter). Et kunstprosjekt med fargeblanding, arealberegning og vitenskapelig rapport forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, geometri og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Br\u00f8ker med fargeblandinger', emerging: 'finner halvdeler og fjerdedeler av fargemengder med konkreter', proficient: 'beregner selvstendig femtedeler og \u00e5ttendedeler i blandinger og forutsier resultatfargen', advanced: 'sammenligner br\u00f8ker med ulike nevnere, optimerer blandingsforhold og forklarer strategien matematisk' },
      { skill: 'M\u00f8nstergjenkjenning og sekvenser', emerging: 'videref\u00f8rer enkle todelte fargesekvenser med st\u00f8tte', proficient: 'identifiserer selvstendig regler i flertrinnsekvenser og videref\u00f8rer m\u00f8nsteret', advanced: 'skaper egne komplekse sekvenser, formulerer reglene algebraisk og varierer med to variabler' },
      { skill: 'Fargeteorirapport', emerging: 'skriver 3\u20134 setninger om fargeblanding med st\u00f8tte', proficient: 'skriver selvstendig en rapport om fargeteori med eksempler og forklaring av fargehjulet', advanced: 'skriver en detaljert rapport med vitenskapelig begrunnelse, RGB-verdier og praktiske anbefalinger' },
    ],
  },

  construction: {
    snippetAnswer: 'Bygge-oppgaver for 3. klasse (8\u20139 \u00e5r) trener arealberegning av rom og fasader, m\u00e5lekonvertering mellom cm/m/km, multiplikasjon med materialkostnader, br\u00f8ker med byggematerialer og selvstendig skriving av byggeprosjektrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir byggetemaet et fullstendig ingeni\u00f8rprosjekt \u2014 \u00e5tte- og ni\u00e5ringer beregner areal og omkrets av rom, fasader og tomter i m\u00b2, konverterer mellom cm, m og km for byggetegninger, og bruker multiplikasjon til materialkostnadsberegning (45 planker \u00e0 28 kr.). Br\u00f8ker vises i materialsammensetning (tre \u00e5ttendedeler av veggen er glass). Divisjon fordeler materialer mellom lag (72 murstein til 6 grupper). Linjediagrammer viser byggefremdrift over uker. Prosjektrapporter med tegning, budsjett og tidsplan trener teknisk sakprosa. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for areal, m\u00e5ling og teknologi i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Arealberegning av rom og fasader (8\u20139-\u00e5ringer beregner i m\u00b2 med tosifrede tall)', howWeAddress: 'Romplanlegging-ark der elevene beregner areal og omkrets av rom fra byggetegninger med oppgitte m\u00e5l' },
      { milestone: 'Multiplikasjon med materialkostnader (tosifret \u00d7 tosifret i \u00f8konomikontekst)', howWeAddress: 'Materialbudsjett-ark der elevene multipliserer antall \u00d7 pris, summerer og sammenligner med budsjett' },
      { milestone: 'Prosjektrapport med teknisk tegning og budsjett', howWeAddress: 'Byggeprosjekt-maler der elevene tegner romplan, beregner materialbehov og skriver fremdriftsrapport' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele meter og ensifret multiplikasjon, tilby ferdiglagde romtegninger og rapportmaler med felt. For avanserte elever i 3. klasse legges til arealberegning med desimaler, tosifret \u00d7 tosifret multiplikasjon, og selvstendig byggeprosjektrapport med m\u00e5lestokk, budsjettoptimering og b\u00e6rekraftsanalyse.',
    parentTakeaway: 'Gj\u00f8r hjemmet til et byggeprosjekt: beregn arealet av barnets rom (4 m \u00d7 3,5 m). Regn materialkostnader: \u00ab12 planker \u00e0 35 kr.\u00bb Fordel murstein: \u00ab72 klosser til 6 t\u00e5rn.\u00bb M\u00e5l vegger og konverter cm til m. La barnet tegne en romplan med m\u00e5l. Byggeprosjekter gj\u00f8r matematikk h\u00e5ndgripelig og motiverende.',
    classroomIntegration: 'Byggetemaet i 3. klasse binder sammen matematikk (areal, multiplikasjon, divisjon), naturfag/teknologi (materialer og konstruksjon), og norsk (prosjektrapporter). Et modellbyggeprosjekt med m\u00e5ling, budsjett og presentasjon forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for areal, m\u00e5ling og teknologi st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Arealberegning av rom og fasader', emerging: 'beregner areal av rektangler med hele tall og st\u00f8tte', proficient: 'beregner selvstendig areal og omkrets av rom fra tegninger og sammenligner st\u00f8rrelser', advanced: 'beregner areal av sammensatte former, bruker m\u00e5lestokk og planlegger rominnredning med arealbudsjett' },
      { skill: 'Multiplikasjon med materialkostnader', emerging: 'multipliserer ensifret \u00d7 tosifret med st\u00f8tte', proficient: 'l\u00f8ser selvstendig materialbudsjetter med tosifret multiplikasjon og summering', advanced: 'optimerer materialvalg med prissammenligning, beregner svinn og argumenterer for valg' },
      { skill: 'Byggeprosjektrapport', emerging: 'skriver en enkel materialliste og 3\u20134 setninger med st\u00f8tte', proficient: 'skriver selvstendig en prosjektrapport med tegning, materialliste, budsjett og tidsplan', advanced: 'skriver en komplett rapport med m\u00e5lestokk, budsjettoptimering, fremdriftsplan og b\u00e6rekraftsvurdering' },
    ],
  },

  cooking: {
    snippetAnswer: 'Matlaging-oppgaver for 3. klasse (8\u20139 \u00e5r) trener br\u00f8ker med oppskriftsskalering, m\u00e5lekonvertering mellom dl/l og g/kg, multiplikasjon med ingredienskostnader, divisjon av porsjoner og selvstendig skriving av oppskriftsbøker med n\u00e6ringsanalyse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir matlagingstemaet et avansert m\u00e5le- og beregningsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer skalerer oppskrifter med br\u00f8ker (dobler en tredjedel kopp til to tredjedeler), konverterer mellom dl og l, g og kg i oppskriftskontekst, og bruker multiplikasjon til ingredienskostnadsberegning. Divisjon fordeler porsjoner (et brett med 24 boller til 6 personer). N\u00e6ringsberegning med br\u00f8ker viser makrofordeling (en fjerdedel protein, en fjerdedel fett). Linjediagrammer viser temperaturkurver under steking. Oppskriftsb\u00f8ker med prosedyreskriving og n\u00e6ringsanalyse trener sakprosa. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, m\u00e5ling og sakprosa i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Br\u00f8ker med oppskriftsskalering (8\u20139-\u00e5ringer skalerer opp og ned med br\u00f8koperasjoner)', howWeAddress: 'Oppskriftskaleringsark der elevene dobler, halverer og tredobler ingredienser med br\u00f8kberegning' },
      { milestone: 'M\u00e5lekonvertering dl/l og g/kg (fleksibel omregning i matlagingskontekst)', howWeAddress: 'M\u00e5lekonverterings-oppgaver der elevene omregner mellom dl og l, g og kg i oppskrifter' },
      { milestone: 'Prosedyreskriving med n\u00e6ringsanalyse (teknisk sakprosa)', howWeAddress: 'Oppskriftsbok-maler der elevene skriver trinnvise oppskrifter med m\u00e5l, tider og n\u00e6ringsberegning' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk halvdeler og fjerdedeler i skalering, hele dl og kg, og tilby oppskriftsmaler med felt. For avanserte elever i 3. klasse legges til skalering med ulike nevnere, konvertering med desimaler, og selvstendig oppskriftsbok med kaloriberegning, prissammenligning og b\u00e6rekraftsanalyse.',
    parentTakeaway: 'Lag mat som matematikk: \u00aboppskriften er for 4 \u2014 vi er 6. Hvor mye av hver ingrediens?\u00bb Konverter: \u00ab2,5 dl = hvor mange liter?\u00bb Fordel: \u00ab24 boller til 6 \u2014 hvor mange hver?\u00bb Regn n\u00e6ring: \u00aben fjerdedel av tallerkenen er protein.\u00bb La barnet skrive oppskriften selv. Matlagingsmatematikk er den mest velsmakende matematikken.',
    classroomIntegration: 'Matlagingstemaet i 3. klasse driver tverrfaglig l\u00e6ring: matematikktimen med br\u00f8ker, m\u00e5lekonvertering og divisjon, mat og helse med n\u00e6ring og hygiene, norsktimen med oppskriftsskriving og prosedyretekster. Et klassekokebok-prosjekt med reell matlaging forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, m\u00e5ling og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Br\u00f8ker med oppskriftsskalering', emerging: 'halverer og dobler oppskrifter med hele tall og st\u00f8tte', proficient: 'skalerer selvstendig oppskrifter med tredjedeler og fjerdedeler og viser mellomregninger', advanced: 'skalerer med ulike nevnere, sammenligner br\u00f8ker og forklarer skaleringsstrategi' },
      { skill: 'M\u00e5lekonvertering i matlaging', emerging: 'konverterer dl til l med hele tall med st\u00f8tte', proficient: 'konverterer selvstendig mellom dl/l og g/kg med desimaler i oppskriftskontekst', advanced: 'konverterer fleksibelt mellom flere enheter, beregner totalbehov for storoppskrifter og optimerer' },
      { skill: 'Oppskriftsbok med prosedyre og n\u00e6ring', emerging: 'skriver en enkel oppskrift med 3\u20134 trinn med st\u00f8tte', proficient: 'skriver selvstendig en detaljert oppskrift med m\u00e5l, tider, trinn og enkel n\u00e6ringsinfo', advanced: 'skriver en komplett oppskriftsbok med skalering, n\u00e6ringsanalyse, prisberegning og vurdering' },
    ],
  },

  dinosaurs: {
    snippetAnswer: 'Dinosaur-oppgaver for 3. klasse (8\u20139 \u00e5r) trener m\u00e5lekonvertering med dinosaurlengder, multiplikasjon og divisjon med paleontologiske data, linjediagrammer over geologisk tid, br\u00f8ker med artsfordeling og selvstendig skriving av forskningsrapporter om utd\u00f8dde arter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir dinosaurtemaet et vitenskapelig forskningsprosjekt med avansert matematikk \u2014 \u00e5tte- og ni\u00e5ringer konverterer mellom cm, m og km for dinosaurlengder (Diplodocus 27 m = 2 700 cm), bruker multiplikasjon og divisjon med paleontologiske data (96 fossiler fordelt p\u00e5 8 utgravningsfelt), og analyserer linjediagrammer over geologiske tidsperioder. Br\u00f8ker viser artsfordeling (tre \u00e5ttendedeler av artene var planteetere). Arealberegning brukes p\u00e5 utgravningsfelt. Flertrinnsproblemer kombinerer flere operasjoner. Forskningsrapporter om utd\u00f8dde arter med hypotese, funn og konklusjon trener vitenskapelig metode. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, data og vitenskapelig rapportering i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'M\u00e5lekonvertering med store tall (8\u20139-\u00e5ringer konverterer dinosaurlengder mellom cm, m og km)', howWeAddress: 'Dinosaurm\u00e5l-konverteringsark der elevene omregner lengder og sammenligner arter p\u00e5 tvers av enheter' },
      { milestone: 'Multiplikasjon og divisjon med paleontologiske data (tresifrede tall)', howWeAddress: 'Fossilfordelingsark der elevene multipliserer og dividerer med store fossildata og verifiserer' },
      { milestone: 'Forskningsrapport med vitenskapelig metode (hypotese, funn, konklusjon)', howWeAddress: 'Dinosaurforsknings-maler med fire seksjoner der elevene skriver strukturerte rapporter med kilder' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, hold konvertering mellom cm og m med hele tall, bruk tosifret multiplikasjon og tilby rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til konvertering med desimaler, tresifrede beregninger, og selvstendig forskningsrapport med sammenlignende analyse og kildevurdering.',
    parentTakeaway: 'Utforsk dinosaurer som vitenskap: konverter \u00abT-Rex var 12 m lang \u2014 hvor mange cm?\u00bb Fordel: \u00ab96 fossiler i 8 felt.\u00bb Beregn: \u00ab3 av 8 arter var planteetere \u2014 hvilken br\u00f8k?\u00bb Tegn en tidslinje med dinosaurperioder og bruk linjediagram. La barnet skrive en forskningsrapport med hypotese. Dinosaurer er porten til vitenskapelig tenkning.',
    classroomIntegration: 'Dinosaurtemaet i 3. klasse fungerer som tverrfaglig forskningsprosjekt: matematikktimen med konvertering, multiplikasjon og diagrammer, naturfagstimen med geologi, evolusjon og fossiler, norsktimen med forskningsrapporter og presentasjoner. Et klassepaleontologi-museum med elevrapporter forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, data og rapportering st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'M\u00e5lekonvertering med dinosaurdata', emerging: 'konverterer cm til m med hele tall og st\u00f8tte', proficient: 'konverterer selvstendig mellom cm, m og km med store tall og sammenligner arter', advanced: 'konverterer med desimaler, beregner st\u00f8rrelsesforhold og formulerer egne sammenligningsoppgaver' },
      { skill: 'Multiplikasjon og divisjon med fossiler', emerging: 'l\u00f8ser ensifret multiplikasjon med fossildata med st\u00f8tte', proficient: 'l\u00f8ser selvstendig tosifret multiplikasjon og divisjon med paleontologiske data', advanced: 'l\u00f8ser flertrinnsproblemer med tre operasjoner og formulerer egne paleontologiske oppgaver' },
      { skill: 'Dinosaurforskningsrapport', emerging: 'skriver 3\u20134 setninger om en dinosaur med mal og ordbank', proficient: 'skriver selvstendig en rapport med hypotese, funn, konklusjon og \u00e9n kilde', advanced: 'skriver en detaljert rapport med sammenlignende analyse, flere kilder og perspektivering' },
    ],
  },

  easter: {
    snippetAnswer: 'P\u00e5ske-oppgaver for 3. klasse (8\u20139 \u00e5r) trener br\u00f8ker med p\u00e5skeeggdeling, multiplikasjon og divisjon med festbudsjett, m\u00f8nstergjenkjenning med p\u00e5skesekvenser, arealberegning av dekorasjoner og selvstendig skriving av p\u00e5sketradisjonsrapporter med kulturell sammenligning. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir p\u00e5sketemaet et matematisk og kulturelt prosjekt p\u00e5 h\u00f8yt niv\u00e5 \u2014 \u00e5tte- og ni\u00e5ringer arbeider med br\u00f8ker i p\u00e5skeeggdeling (tre \u00e5ttendedeler av eggene er bl\u00e5), multiplikasjon med festbudsjetter (8 barn \u00d7 12 kr. per godtepose), og divisjon av p\u00e5skegodt (48 sjokoladeegg til 6 barn = 8 hver). M\u00f8nstergjenkjenning med avanserte p\u00e5skesekvenser trener algebraisk tenkning. Areal beregnes for p\u00e5skedekorasjoner og plakater. Kulturelle tradisjonerrapporter sammenligner norsk p\u00e5ske med andre lands tradisjoner. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, multiplikasjon og kulturkunnskap i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Br\u00f8ker med p\u00e5skeeggfordeling (8\u20139-\u00e5ringer beregner \u00e5ttendedeler og sjettedeler)', howWeAddress: 'P\u00e5skeegg-br\u00f8kark der elevene fordeler egg i fargekategorier og beregner br\u00f8kandeler' },
      { milestone: 'Multiplikasjon med festbudsjett (tosifret i p\u00e5skekontekst)', howWeAddress: 'P\u00e5skebudsjett-ark der elevene multipliserer antall gjester \u00d7 pris og planlegger innkj\u00f8p' },
      { milestone: 'Kulturell sammenligningsrapport (norsk p\u00e5ske vs. andre tradisjoner)', howWeAddress: 'Tradisjonssammenlignings-ark der elevene forsker p\u00e5 to lands p\u00e5sketradisjoner og skriver rapport' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk halvdeler og fjerdedeler, ensifret multiplikasjon og tilby tradisjonsmaler med setningsstartere. For avanserte elever i 3. klasse legges til br\u00f8ker med ulike nevnere, tosifret \u00d7 tosifret multiplikasjon, og selvstendig sammenligningsrapport med tre land og kulturell analyse.',
    parentTakeaway: 'Gj\u00f8r p\u00e5sken matematisk: \u00ab48 egg til 6 barn \u2014 hvor mange hver?\u00bb Del i br\u00f8ker: \u00abtre av \u00e5tte egg er bl\u00e5.\u00bb Regn budsjett: \u00ab8 godteposer \u00e0 15 kr.\u00bb Sammenlign tradisjoner: \u00abhvordan feirer de p\u00e5ske i Spania?\u00bb La barnet skrive en p\u00e5sketradisjonsrapport. P\u00e5skematematikk gjor h\u00f8ytiden til et l\u00e6ringsprosjekt.',
    classroomIntegration: 'P\u00e5sketemaet i 3. klasse binder sammen matematikk (br\u00f8ker, multiplikasjon, divisjon), samfunnsfag/KRLE (p\u00e5sketradisjoner i ulike kulturer), og norsk (sammenligningsrapporter). Et p\u00e5sketradisjonsprosjekt med matematikk og kulturell forskning forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, kulturkunnskap og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Br\u00f8ker med p\u00e5skeegg', emerging: 'finner halvdeler og fjerdedeler av eggmengder med konkreter', proficient: 'beregner selvstendig \u00e5ttendedeler og sjettedeler og sammenligner br\u00f8ker i kontekst', advanced: 'sammenligner br\u00f8ker med ulike nevnere, l\u00f8ser br\u00f8koppgaver med flere steg og forklarer strategier' },
      { skill: 'Multiplikasjon og divisjon med p\u00e5skebudsjett', emerging: 'l\u00f8ser ensifret multiplikasjon med p\u00e5skedata med st\u00f8tte', proficient: 'l\u00f8ser selvstendig tosifret multiplikasjon og divisjon og beregner budsjetter', advanced: 'l\u00f8ser flertrinnsproblemer med b\u00e5de multiplikasjon og divisjon og optimerer innkj\u00f8p' },
      { skill: 'P\u00e5sketradisjonsrapport', emerging: 'skriver 3\u20134 setninger om norsk p\u00e5ske med st\u00f8tte', proficient: 'skriver selvstendig en sammenligningsrapport med to land, likheter og forskjeller', advanced: 'skriver en detaljert rapport med tre land, kulturell analyse, kilder og konklusjon' },
    ],
  },

  emotions: {
    snippetAnswer: 'F\u00f8lelser-oppgaver for 3. klasse (8\u20139 \u00e5r) trener datainnsamling med f\u00f8lelsesdiagrammer, br\u00f8ker med f\u00f8lelsesfordeling, multiplikasjon med sp\u00f8rreunders\u00f8kelsesdata, avansert f\u00f8lelsesordforr\u00e5d og selvstendig skriving av refleksjonstekster med emosjonell argumentasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir f\u00f8lelsestemaet et datadrevet forskningsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer gjennomf\u00f8rer sp\u00f8rreunders\u00f8kelser om f\u00f8lelser, registrerer data i diagrammer og analyserer resultater. Br\u00f8ker viser f\u00f8lelsesfordeling (tre \u00e5ttendedeler av klassen f\u00f8lte seg glad). Multiplikasjon beregner totale svar (8 grupper \u00d7 4 svar). Avansert f\u00f8lelsesordforr\u00e5d inkluderer nyanser som ambivalent, frustrert, tilfreds og melankolsk. Linjediagrammer viser f\u00f8lelsesutvikling over uker. Refleksjonstekster med perspektivtaking og emosjonell argumentasjon trener dypere selvinnsikt. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for livsmestring, data og skriving i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Sp\u00f8rreunders\u00f8kelse med datainnsamling (8\u20139-\u00e5ringer planlegger og gjennomf\u00f8rer unders\u00f8kelser)', howWeAddress: 'F\u00f8lelsesunders\u00f8kelses-ark der elevene designer sp\u00f8rsm\u00e5l, samler inn data og presenterer resultater' },
      { milestone: 'Br\u00f8ker med f\u00f8lelsesdata (deler av en helhet i datakontekst)', howWeAddress: 'F\u00f8lelsesfordeling-ark der elevene beregner br\u00f8kandeler av klassens f\u00f8lelsesdata' },
      { milestone: 'Refleksjonstekst med perspektivtaking (emosjonell argumentasjon)', howWeAddress: 'Refleksjonsskriving-ark der elevene beskriver en konflikt fra to perspektiver og argumenterer for empati' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk ferdiglagde sp\u00f8rreunders\u00f8kelser med fire alternativ, halvdeler og fjerdedeler, og refleksjonsmaler med setningsstartere. For avanserte elever i 3. klasse legges til egendefinerte unders\u00f8kelser, br\u00f8ker med ulike nevnere i dataanalyse, og selvstendig refleksjonsessay med nyansert perspektivtaking og forskningsbasert argumentasjon.',
    parentTakeaway: 'Gj\u00f8r f\u00f8lelser til forskning: gjennomf\u00f8r en familieunders\u00f8kelse om ukens f\u00f8lelser og lag et diagram. Bruk nyanserte f\u00f8lelsesord: \u00abf\u00f8ler du deg frustrert eller skuffet?\u00bb Regn: \u00abtre av \u00e5tte dager var gode dager.\u00bb \u00d8v perspektivtaking: \u00abhvordan tror du vennen din opplevde situasjonen?\u00bb F\u00f8lelsesforst\u00e5else er livets viktigste ferdighet.',
    classroomIntegration: 'F\u00f8lelsestemaet i 3. klasse integrerer matematikk (data, br\u00f8ker, diagrammer), norsk (refleksjonstekster og argumentasjon), og livsmestring (selvinnsikt og empati). Et klassens-f\u00f8lelsesforskningsprosjekt med sp\u00f8rreunders\u00f8kelse og presentasjon forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for data, livsmestring og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Sp\u00f8rreunders\u00f8kelse og datainnsamling', emerging: 'fyller inn en ferdiglagd unders\u00f8kelse og avleser et enkelt diagram med st\u00f8tte', proficient: 'designer selvstendig sp\u00f8rsm\u00e5l, gjennomf\u00f8rer unders\u00f8kelse og presenterer data i diagram', advanced: 'planlegger kompleks unders\u00f8kelse, analyserer data med br\u00f8ker og trekker begrunnede konklusjoner' },
      { skill: 'Br\u00f8ker med f\u00f8lelsesdata', emerging: 'finner halvdeler og fjerdedeler av f\u00f8lelsesdata med konkreter', proficient: 'beregner selvstendig \u00e5ttendedeler og sjettedeler fra data og sammenligner', advanced: 'sammenligner br\u00f8ker med ulike nevnere fra egne data og tolker resultatene i kontekst' },
      { skill: 'Refleksjonstekst med perspektivtaking', emerging: 'skriver 3\u20134 setninger om en f\u00f8lelsessituasjon med st\u00f8tte', proficient: 'skriver selvstendig en refleksjonstekst med to perspektiver og begrunnelse for empati', advanced: 'skriver et nyansert essay med flere perspektiver, motargumenter og forskningsbasert konklusjon' },
    ],
  },

  'fairy-tales': {
    snippetAnswer: 'Eventyr-oppgaver for 3. klasse (8\u20139 \u00e5r) trener br\u00f8ker med fortellingselementer, multiplikasjon med eventyrtall, m\u00f8nsteranalyse i fortellingsstrukturer, linjediagrammer med lesedata og selvstendig skriving av moderne eventyr med kompleks struktur. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir eventyrtemaet et litter\u00e6rt analyseprosjekt \u2014 \u00e5tte- og ni\u00e5ringer analyserer fortellingsstrukturer med br\u00f8ker (to femtedeler av historien er stigende handling), bruker multiplikasjon med eventyrtall (trollet hadde 7 poser med 12 gullmynter = 84 totalt), og identifiserer m\u00f8nstre i eventyrkonvensjoner. Divisjon fordeler eventyrkapitler (24 sider i 6 kapitler). Linjediagrammer viser spenningskurver. Skriving av moderne eventyr krever kompleks fortellingsstruktur med innledning, komplikasjon, klimaks og l\u00f8sning. Sammenlignende analyse av to eventyr trener kritisk lesing. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for lesing, litteraturanalyse og kreativ skriving i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Fortellingsstrukturanalyse (8\u20139-\u00e5ringer identifiserer innledning, komplikasjon, klimaks, l\u00f8sning)', howWeAddress: 'Strukturanalyse-ark der elevene kartlegger eventyrstrukturen visuelt og identifiserer hver del med sitat' },
      { milestone: 'Multiplikasjon med eventyrtall (store tall i fantasi-kontekst)', howWeAddress: 'Eventyrmatte-ark der elevene l\u00f8ser multiplikasjons- og divisjonsoppgaver med magiske gjenstander og eventyrfigurer' },
      { milestone: 'Kompleks fortellingsskriving (moderne eventyr med fire deler)', howWeAddress: 'Eventyr-skrivemaler med rammer for innledning, komplikasjon, klimaks og l\u00f8sning med veiledet struktur' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk kjente eventyr med tydelig struktur, ensifret multiplikasjon og skrivemaler med setningsstartere for hver del. For avanserte elever i 3. klasse legges til sammenlignende analyse av to eventyr, tosifret multiplikasjon med eventyrdata, og selvstendig moderne eventyr med dobbelstruktur og tematisk dybde.',
    parentTakeaway: 'Les eventyr analytisk: \u00abhvor begynner komplikasjonen? N\u00e5r er klimaks?\u00bb Regn med eventyrtall: \u00ab7 poser med 12 gullmynter.\u00bb Del kapitler: \u00ab24 sider i 6 kapitler.\u00bb La barnet skrive et moderne eventyr med innledning, komplikasjon, klimaks og l\u00f8sning. Eventyr er b\u00e5de litteraturanalyse og kreativ skriving p\u00e5 sitt beste.',
    classroomIntegration: 'Eventyrtemaet i 3. klasse integrerer norsk (litteraturanalyse og kreativ skriving), matematikk (multiplikasjon, br\u00f8ker og diagrammer), og kunst (eventyrillustrasjon). Et klasseeventyr-prosjekt med analyse, skriving og fremf\u00f8ring forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for lesing, skriving og litteraturforst\u00e5else st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Fortellingsstrukturanalyse', emerging: 'identifiserer innledning og slutt med st\u00f8tte', proficient: 'identifiserer selvstendig alle fire deler og forklarer funksjonen med sitater', advanced: 'sammenligner strukturen i to eventyr, analyserer variasjon og argumenterer for tolkninger' },
      { skill: 'Multiplikasjon med eventyrtall', emerging: 'l\u00f8ser ensifret multiplikasjon med eventyrdata med st\u00f8tte', proficient: 'l\u00f8ser selvstendig tosifret multiplikasjon og divisjon med eventyrdata', advanced: 'formulerer egne flertrinnsproblemer med eventyrtall og verifiserer systematisk' },
      { skill: 'Moderne eventyrskriving', emerging: 'skriver et kort eventyr med innledning og slutt med st\u00f8tte', proficient: 'skriver selvstendig et eventyr med fire deler, beskrivende spr\u00e5k og dialog', advanced: 'skriver et komplekst eventyr med tematisk dybde, dobbelstruktur og litter\u00e6re virkemidler' },
    ],
  },

  farm: {
    snippetAnswer: 'G\u00e5rd-oppgaver for 3. klasse (8\u20139 \u00e5r) trener multiplikasjon og divisjon med g\u00e5rdsdata, arealberegning av jorder og enger, br\u00f8ker med avlingsfordeling, linjediagrammer med produksjonsdata og selvstendig skriving av g\u00e5rdsforskningsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir g\u00e5rdstemaet et realistisk driftsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer bruker multiplikasjon og divisjon med g\u00e5rdsdata (72 h\u00f8ner fordelt p\u00e5 8 h\u00f8nsehus = 9 per hus), beregner areal og omkrets av jorder og enger i m\u00b2, og arbeider med br\u00f8ker i avlingsfordeling (to femtedeler av avlingen er hvete). M\u00e5lekonvertering mellom kg og tonn brukes til avlingsdata. Linjediagrammer viser produksjon over sesonger. Divisjon med rest l\u00f8ser fordelingsproblemer (50 liter melk i 6 tanker). G\u00e5rdsforskningsrapporter med driftsdata, analyse og anbefalinger trener sakprosa. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, areal og sakprosa i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon og divisjon med g\u00e5rdsdata (8\u20139-\u00e5ringer regner med tosifrede tall i driftskontekst)', howWeAddress: 'G\u00e5rdsdrifts-ark der elevene beregner dyrefordeling, eggproduksjon og f\u00f4rbehov med multiplikasjon og divisjon' },
      { milestone: 'Arealberegning av jorder og enger (m\u00b2 med tosifrede m\u00e5l)', howWeAddress: 'Jordbruksareal-ark der elevene beregner areal og omkrets av jorder fra kartskisser' },
      { milestone: 'G\u00e5rdsforskningsrapport med driftsdata', howWeAddress: 'G\u00e5rdsrapport-maler der elevene analyserer produksjonsdata, beregner n\u00f8kkeltall og skriver anbefalinger' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk ensifret multiplikasjon, hele meter i areal og rapportmaler med felt og setningsstartere. For avanserte elever i 3. klasse legges til tosifret \u00d7 tosifret multiplikasjon, arealberegning med desimaler, og selvstendig g\u00e5rdsforskningsrapport med \u00f8konomisk analyse, b\u00e6rekraftsvurdering og anbefalinger.',
    parentTakeaway: 'Utforsk g\u00e5rdsdrift som matematikk: \u00ab72 h\u00f8ner i 8 hus \u2014 hvor mange i hvert?\u00bb Beregn areal: \u00abengen er 25 m \u00d7 18 m.\u00bb Br\u00f8ker: \u00abto femtedeler av avlingen er hvete.\u00bb Konverter: \u00ab1 500 kg = hvor mange tonn?\u00bb La barnet skrive en g\u00e5rdsrapport med tall og anbefalinger. G\u00e5rdsmatematikk er virkelig livsmatematikk.',
    classroomIntegration: 'G\u00e5rdstemaet i 3. klasse driver tverrfaglig l\u00e6ring: matematikktimen med multiplikasjon, areal og diagrammer, naturfagstimen med \u00f8kosystemer og b\u00e6rekraft, norsktimen med g\u00e5rdsrapporter og sakprosa. Et klasse-g\u00e5rdsprosjekt med reelle data fra lokale g\u00e5rder forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for regning, naturfag og rapportering st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon og divisjon med g\u00e5rdsdata', emerging: 'l\u00f8ser ensifret multiplikasjon med g\u00e5rdsdata med st\u00f8tte', proficient: 'l\u00f8ser selvstendig tosifret multiplikasjon og divisjon med g\u00e5rdsdata og verifiserer', advanced: 'l\u00f8ser flertrinnsproblemer med tre operasjoner og formulerer egne g\u00e5rdsoppgaver' },
      { skill: 'Arealberegning av jorder', emerging: 'beregner areal av rektangler med hele tall og st\u00f8tte', proficient: 'beregner selvstendig areal og omkrets med tosifrede m\u00e5l og sammenligner jorder', advanced: 'beregner areal av sammensatte former, bruker m\u00e5lestokk og planlegger optimal jordfordeling' },
      { skill: 'G\u00e5rdsforskningsrapport', emerging: 'skriver 3\u20134 setninger om g\u00e5rdsdrift med st\u00f8tte', proficient: 'skriver selvstendig en rapport med driftsdata, analyse og anbefalinger', advanced: 'skriver en detaljert rapport med \u00f8konomisk analyse, b\u00e6rekraftsvurdering og optimeringsforslag' },
    ],
  },

  flowers: {
    snippetAnswer: 'Blomster-oppgaver for 3. klasse (8\u20139 \u00e5r) trener br\u00f8ker med kronbladfordeling, multiplikasjon med plantedata, arealberegning av blomsterbed, linjediagrammer med vekstdata og selvstendig skriving av botaniske forskningsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir blomstertemaet et botanisk forskningsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer arbeider med br\u00f8ker i kronbladfordeling (fem \u00e5ttendedeler av kronbladene er hvite), multiplikasjon med plantedata (7 rader \u00d7 9 planter = 63 totalt), og arealberegning av blomsterbed i m\u00b2. Linjediagrammer viser vekstdata over uker (stengelh\u00f8yde dag for dag). Divisjon fordeler fr\u00f8 i potter (45 fr\u00f8 i 5 potter = 9 per potte). M\u00e5lekonvertering mellom cm og m brukes til planteh\u00f8yder. Botaniske forskningsrapporter med observasjoner, data og konklusjon trener vitenskapelig metode. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, m\u00e5ling og rapportering i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Br\u00f8ker med botaniske data (8\u20139-\u00e5ringer beregner deler av en helhet i naturkontekst)', howWeAddress: 'Kronblad-br\u00f8kark der elevene teller, sorterer og beregner br\u00f8kandeler av ulike blomsterdeler' },
      { milestone: 'Linjediagrammer med vekstdata (observasjon over tid)', howWeAddress: 'Plantevekst-dagbok der elevene m\u00e5ler daglig og tegner linjediagram over vekstperioden' },
      { milestone: 'Botanisk forskningsrapport med vitenskapelig metode', howWeAddress: 'Planteforsknings-maler der elevene dokumenterer et vekstefors\u00f8k med hypotese, observasjoner og konklusjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk halvdeler og fjerdedeler, enkle s\u00f8ylediagrammer og rapportmaler med felt. For avanserte elever i 3. klasse legges til br\u00f8ker med ulike nevnere, doble linjediagrammer med to planter, og selvstendig forskningsrapport med kontrollert fors\u00f8k, feilkildeanalyse og perspektivering.',
    parentTakeaway: 'Dyrk et plantefors\u00f8k hjemme: plant fr\u00f8 og m\u00e5l h\u00f8yden hver dag i cm. Tegn et linjediagram over to uker. Regn: \u00ab45 fr\u00f8 i 5 potter.\u00bb Tell kronblad: \u00abfem av \u00e5tte er hvite \u2014 hvilken br\u00f8k?\u00bb Beregn arealet av et blomsterbed. La barnet skrive en forskningsrapport med data. Botanikk er vitenskap man kan lukte p\u00e5.',
    classroomIntegration: 'Blomstertemaet i 3. klasse integrerer naturfag (botanikk og \u00f8kologi), matematikk (br\u00f8ker, areal, linjediagrammer) og norsk (forskningsrapporter). Et klassevekstefors\u00f8k med m\u00e5ling, diagram og rapport forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, data og rapportering st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Br\u00f8ker med botaniske data', emerging: 'finner halvdeler og fjerdedeler av plantedata med konkreter', proficient: 'beregner selvstendig \u00e5ttendedeler og femtedeler fra botaniske data og sammenligner', advanced: 'sammenligner br\u00f8ker med ulike nevnere, tolker data i kontekst og forklarer strategier' },
      { skill: 'Linjediagrammer med vekstdata', emerging: 'avleser et enkelt vekstdiagram med st\u00f8tte', proficient: 'tegner og tolker selvstendig linjediagrammer med daglige m\u00e5linger og beskriver trender', advanced: 'sammenligner to vekstdiagrammer, analyserer \u00e5rsaker til forskjeller og formulerer konklusjoner' },
      { skill: 'Botanisk forskningsrapport', emerging: 'skriver 3\u20134 setninger om et plantenfors\u00f8k med st\u00f8tte', proficient: 'skriver selvstendig en rapport med hypotese, observasjoner, data og konklusjon', advanced: 'skriver en detaljert rapport med kontrollgruppe, feilkilder, kildehenvisning og perspektivering' },
    ],
  },

  food: {
    snippetAnswer: 'Mat-oppgaver for 3. klasse (8\u20139 \u00e5r) trener br\u00f8ker med n\u00e6ringsstoffandeler, multiplikasjon med matbudsjetter, m\u00e5lekonvertering g/kg og dl/l, divisjon av porsjoner og selvstendig skriving av n\u00e6ringsanalyserapporter med data. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir mattemaet et n\u00e6ringsvitenskapelig prosjekt \u2014 \u00e5tte- og ni\u00e5ringer beregner br\u00f8ker med n\u00e6ringsstoffandeler (en fjerdedel karbohydrater, en fjerdedel protein, halvparten gr\u00f8nnsaker), multipliserer matpriser for ukeshandel (8 yoghurt \u00e0 14 kr.), og konverterer mellom g og kg, dl og l i oppskrifter. Divisjon fordeler matpakker (36 fruktbiter til 6 barn). Linjediagrammer viser prisutvikling over m\u00e5neder. N\u00e6ringsanalyserapporter med data fra matdagbok, br\u00f8kberegning og anbefalinger trener sakprosa. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, m\u00e5ling og helse i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Br\u00f8ker med n\u00e6ringsstoffandeler (8\u20139-\u00e5ringer beregner deler av tallerkenmodellen)', howWeAddress: 'Tallerkenmodell-ark der elevene beregner br\u00f8kandeler av m\u00e5ltider og sammenligner med anbefalinger' },
      { milestone: 'Multiplikasjon med matbudsjett (tosifrede tall i \u00f8konomikontekst)', howWeAddress: 'Ukeshandel-ark der elevene multipliserer antall \u00d7 pris, summerer og holder seg innenfor budsjett' },
      { milestone: 'N\u00e6ringsanalyserapport med data og anbefalinger', howWeAddress: 'Matdagbok-analyse-ark der elevene registrerer kosthold, beregner n\u00e6ring og skriver anbefalinger' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk halvdeler og fjerdedeler, ensifret multiplikasjon med runde priser, og rapportmaler med felt. For avanserte elever i 3. klasse legges til br\u00f8ker med ulike nevnere, tosifret multiplikasjon med \u00f8re, og selvstendig n\u00e6ringsanalyserapport med kaloriberegning og b\u00e6rekraftsperspektiv.',
    parentTakeaway: 'Gj\u00f8r mathandelen til matematikk: \u00ab8 yoghurt \u00e0 14 kr. \u2014 hva koster det?\u00bb Del matpakken: \u00ab36 drueklaser til 6 \u2014 hvor mange hver?\u00bb Br\u00f8kberegn tallerkenmodellen: \u00aben fjerdedel protein.\u00bb F\u00f8r en matdagbok og analyser. La barnet skrive en n\u00e6ringsrapport. Matmatematikk er den sunneste matematikken.',
    classroomIntegration: 'Mattemaet i 3. klasse binder sammen matematikk (br\u00f8ker, multiplikasjon, m\u00e5lekonvertering), mat og helse (n\u00e6ring og kosthold), og norsk (n\u00e6ringsrapporter). Et klasseprosjekt med matdagbok, n\u00e6ringsanalyse og presentasjon forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, helse og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Br\u00f8ker med n\u00e6ringsstoffandeler', emerging: 'finner halvdeler og fjerdedeler av m\u00e5ltider med st\u00f8tte', proficient: 'beregner selvstendig br\u00f8kandeler av tallerkenmodellen og sammenligner med anbefalinger', advanced: 'sammenligner br\u00f8ker med ulike nevnere, beregner kaloribr\u00f8ker og optimerer m\u00e5ltider' },
      { skill: 'Multiplikasjon med matbudsjett', emerging: 'multipliserer ensifret \u00d7 tosifret med runde priser med st\u00f8tte', proficient: 'l\u00f8ser selvstendig ukesbudsjett med tosifret multiplikasjon og holder seg innenfor grense', advanced: 'optimerer handlelister med prissammenligning, rabattberegning og argumenterer for valg' },
      { skill: 'N\u00e6ringsanalyserapport', emerging: 'skriver 3\u20134 setninger om et m\u00e5ltid med st\u00f8tte', proficient: 'skriver selvstendig en rapport med data, br\u00f8kberegning og konkrete anbefalinger', advanced: 'skriver en detaljert rapport med kaloriberegning, b\u00e6rekraftsanalyse og vitenskapelig begrunnelse' },
    ],
  },

  forest: {
    snippetAnswer: 'Skog-oppgaver for 3. klasse (8\u20139 \u00e5r) trener arealberegning av skogomr\u00e5der, multiplikasjon og divisjon med tredata, br\u00f8ker med artsfordeling, linjediagrammer med sesongdata og selvstendig skriving av \u00f8kologiske forskningsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir skogtemaet et \u00f8kologisk forskningsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer beregner areal av skogomr\u00e5der i m\u00b2, multipliserer og dividerer med tredata (96 tr\u00e6r fordelt p\u00e5 8 ruter = 12 per rute), og arbeider med br\u00f8ker i artsfordeling (tre \u00e5ttendedeler er gran, to \u00e5ttendedeler er furu). M\u00e5lekonvertering mellom cm, m og km brukes til trestammer og stier. Linjediagrammer viser sesongvariasjoner i bladfall og temperaturer. \u00d8kologiske forskningsrapporter med n\u00e6ringskjeder, dataaanalyse og konklusjon trener vitenskapelig metode. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, areal og rapportering i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Arealberegning av skogomr\u00e5der (8\u20139-\u00e5ringer beregner i m\u00b2 med reelle data)', howWeAddress: 'Skogomr\u00e5de-ark der elevene beregner areal og omkrets av skogruter fra kart og sammenligner' },
      { milestone: 'Br\u00f8ker med artsfordeling i \u00f8kosystemer', howWeAddress: 'Artstellings-ark der elevene teller tr\u00e6r, beregner br\u00f8kandeler og sammenligner ulike skogtyper' },
      { milestone: '\u00d8kologisk forskningsrapport med n\u00e6ringskjede og data', howWeAddress: '\u00d8kologirapport-maler der elevene dokumenterer en skogunders\u00f8kelse med data, n\u00e6ringskjede og konklusjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele meter i areal, halvdeler og fjerdedeler, og rapportmaler med felt og setningsstartere. For avanserte elever i 3. klasse legges til arealberegning med desimaler, br\u00f8ker med ulike nevnere, og selvstendig \u00f8kologisk rapport med n\u00e6ringsnett, feilkilder og b\u00e6rekraftsvurdering.',
    parentTakeaway: 'Ta med p\u00e5 skogtur som forskning: m\u00e5l en skogrute (10 m \u00d7 10 m) og tell tr\u00e6rne. Regn br\u00f8ker: \u00abtre av \u00e5tte tr\u00e6r er gran.\u00bb Konverter: \u00abstien er 2 500 m \u2014 hvor mange km?\u00bb Tegn et linjediagram over temperatur i skogen gjennom fire sesonger. La barnet skrive en skogforskningsrapport. Skogen er det beste klasserommet.',
    classroomIntegration: 'Skogtemaet i 3. klasse integrerer naturfag (\u00f8kologi, n\u00e6ringskjeder, artsmangfold), matematikk (areal, br\u00f8ker, linjediagrammer) og norsk (forskningsrapporter). En uteskoledag med datainnsamling og rapport forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, areal og rapportering st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Arealberegning av skogomr\u00e5der', emerging: 'beregner areal av rektangler med hele tall og st\u00f8tte', proficient: 'beregner selvstendig areal og omkrets fra kartskisser og sammenligner omr\u00e5der', advanced: 'beregner areal av sammensatte former, bruker m\u00e5lestokk og tolker kartdata' },
      { skill: 'Br\u00f8ker med artsfordeling', emerging: 'finner halvdeler og fjerdedeler av artsdata med konkreter', proficient: 'beregner selvstendig \u00e5ttendedeler og femtedeler fra telledata og sammenligner', advanced: 'sammenligner br\u00f8ker med ulike nevnere fra to \u00f8kosystemer og trekker \u00f8kologiske konklusjoner' },
      { skill: '\u00d8kologisk forskningsrapport', emerging: 'skriver 3\u20134 setninger om et skogfunn med st\u00f8tte', proficient: 'skriver selvstendig en rapport med data, n\u00e6ringskjede og konklusjon', advanced: 'skriver en detaljert rapport med n\u00e6ringsnett, feilkilder, sammenligning og b\u00e6rekraftsvurdering' },
    ],
  },

  fruits: {
    snippetAnswer: 'Frukt-oppgaver for 3. klasse (8\u20139 \u00e5r) trener br\u00f8ker med fruktfordeling, multiplikasjon med fruktsalgsdata, m\u00e5lekonvertering g/kg, divisjon av fruktporsjoner og selvstendig skriving av n\u00e6ringsforskningsrapporter om frukt. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir frukttemaet et n\u00e6ringsvitenskapelig og \u00f8konomisk prosjekt \u2014 \u00e5tte- og ni\u00e5ringer arbeider med br\u00f8ker i fruktfordeling (tre \u00e5ttendedeler av fruktkurven er epler), multipliserer med fruktsalgsdata (8 kasser \u00d7 12 kg = 96 kg), og konverterer mellom g og kg. Divisjon fordeler frukt rettferdig (42 jordb\u00e6r til 6 barn). Linjediagrammer viser fruktpriser over sesonger. N\u00e6ringsforskningsrapporter med vitamindata, br\u00f8kberegning og anbefalinger trener sakprosa. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, m\u00e5ling og helse i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Br\u00f8ker med fruktfordeling (8\u20139-\u00e5ringer beregner \u00e5ttendedeler og sjettedeler)', howWeAddress: 'Fruktkurv-br\u00f8kark der elevene teller, sorterer og beregner br\u00f8kandeler av ulike frukttyper' },
      { milestone: 'Multiplikasjon med fruktsalgsdata (tosifrede tall i \u00f8konomikontekst)', howWeAddress: 'Fruktsalg-ark der elevene multipliserer kasser \u00d7 kg, beregner inntekt og sammenligner med budsjett' },
      { milestone: 'N\u00e6ringsforskningsrapport om frukt med data og anbefalinger', howWeAddress: 'Frukt-n\u00e6ringsark der elevene analyserer vitamininnhold, beregner dagsbehov og skriver anbefalinger' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk halvdeler og fjerdedeler, ensifret multiplikasjon og rapportmaler med felt. For avanserte elever i 3. klasse legges til br\u00f8ker med ulike nevnere, tosifret multiplikasjon med desimaler, og selvstendig forskningsrapport med vitaminsammenligning og b\u00e6rekraftsperspektiv.',
    parentTakeaway: 'Gj\u00f8r fruktkurven til matematikk: \u00abtre av \u00e5tte frukter er epler \u2014 hvilken br\u00f8k?\u00bb Regn med frukt: \u00ab8 poser \u00e0 1,5 kg.\u00bb Fordel: \u00ab42 jordb\u00e6r til 6 \u2014 hvor mange hver?\u00bb Konverter: \u00ab250 g = hvor mange kg?\u00bb La barnet skrive en fruktfakta-rapport med n\u00e6ringsdata. Fruktmatematikk er b\u00e5de sunn og smakfull.',
    classroomIntegration: 'Frukttemaet i 3. klasse binder sammen matematikk (br\u00f8ker, multiplikasjon, m\u00e5lekonvertering), mat og helse (n\u00e6ring og vitaminer), og norsk (forskningsrapporter). Et fruktsmaking-prosjekt med n\u00e6ringsanalyse og presentasjon forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, helse og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Br\u00f8ker med fruktdata', emerging: 'finner halvdeler og fjerdedeler av fruktmengder med konkreter', proficient: 'beregner selvstendig \u00e5ttendedeler og sjettedeler fra frukttellinger og sammenligner', advanced: 'sammenligner br\u00f8ker med ulike nevnere, tolker fordelingsdata og forklarer strategier' },
      { skill: 'Multiplikasjon med fruktsalg', emerging: 'multipliserer ensifret \u00d7 tosifret med st\u00f8tte', proficient: 'l\u00f8ser selvstendig tosifret multiplikasjon med fruktsalgsdata og beregner totalinntekt', advanced: 'optimerer salgsstrategier med prissammenligning og argumenterer for valg med data' },
      { skill: 'N\u00e6ringsforskningsrapport om frukt', emerging: 'skriver 3\u20134 setninger om en frukt med st\u00f8tte', proficient: 'skriver selvstendig en rapport med n\u00e6ringsdata, br\u00f8kberegning og anbefalinger', advanced: 'skriver en detaljert rapport med vitaminsammenligning, b\u00e6rekraftsanalyse og kildehenvisning' },
    ],
  },

  furniture: {
    snippetAnswer: 'M\u00f8bel-oppgaver for 3. klasse (8\u20139 \u00e5r) trener arealberegning av rom og m\u00f8belflater, m\u00e5lekonvertering mellom cm og m, multiplikasjon med m\u00f8belpriser, br\u00f8ker med romfordeling og selvstendig skriving av innredningsprosjektrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir m\u00f8beltemaet et innredningsprosjekt med avansert geometri \u2014 \u00e5tte- og ni\u00e5ringer beregner areal og omkrets av rom og m\u00f8belflater i cm\u00b2 og m\u00b2, konverterer mellom cm og m for romm\u00e5l, og bruker multiplikasjon til prisberegning (4 stoler \u00e0 349 kr.). Br\u00f8ker viser romfordeling (tre \u00e5ttendedeler av rommet er sitteplass). Divisjon fordeler m\u00f8bler (24 stoler i 6 rekker). Linjediagrammer viser m\u00f8belprisutvikling. Innredningsprosjektrapporter med romplan, materialvalg og budsjett trener teknisk sakprosa. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for areal, m\u00e5ling og sakprosa i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Arealberegning av rom og m\u00f8belflater (8\u20139-\u00e5ringer beregner i cm\u00b2 og m\u00b2)', howWeAddress: 'Romplanlegging-ark der elevene beregner areal av gulv, bord og hyller og planlegger innredning' },
      { milestone: 'M\u00e5lekonvertering cm/m for romm\u00e5l (fleksibel omregning)', howWeAddress: 'M\u00f8belm\u00e5l-konverteringsark der elevene m\u00e5ler m\u00f8bler og konverterer mellom cm og m' },
      { milestone: 'Innredningsprosjektrapport med romplan og budsjett', howWeAddress: 'Innredningsrapport-maler der elevene tegner romplan, velger m\u00f8bler og skriver begrunnede valg' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele meter og centimeter, ensifret multiplikasjon og ferdiglagde romplaner med felt. For avanserte elever i 3. klasse legges til arealberegning med desimaler, tosifret multiplikasjon med m\u00f8belpriser, og selvstendig innredningsrapport med m\u00e5lestokk, budsjettoptimering og designbegrunnelse.',
    parentTakeaway: 'Gj\u00f8r barnerommet til et matteprosjekt: m\u00e5l rommet og beregn arealet. M\u00e5l m\u00f8blene og konverter: \u00abbordet er 120 cm \u2014 det er 1,2 m.\u00bb Regn: \u00ab4 stoler \u00e0 349 kr.\u00bb Del rommet i br\u00f8ker: \u00abtre \u00e5ttendedeler er sitteplass.\u00bb La barnet tegne en romplan med m\u00e5l. Innredning er geometri i praksis.',
    classroomIntegration: 'M\u00f8beltemaet i 3. klasse binder sammen matematikk (areal, m\u00e5lekonvertering, multiplikasjon), kunst og h\u00e5ndverk (design og romplanlegging), og norsk (prosjektrapporter). Et klasse-innredningsprosjekt med reelle m\u00e5linger og budsjett forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for areal, m\u00e5ling og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Arealberegning av rom og m\u00f8bler', emerging: 'beregner areal med hele tall og enkel multiplikasjon med st\u00f8tte', proficient: 'beregner selvstendig areal og omkrets av rom og m\u00f8bler og planlegger innredning', advanced: 'beregner areal av sammensatte former, bruker m\u00e5lestokk og optimerer rombruk med begrunnelse' },
      { skill: 'M\u00e5lekonvertering med m\u00f8belm\u00e5l', emerging: 'konverterer cm til m med hele tall med st\u00f8tte', proficient: 'konverterer selvstendig mellom cm og m med desimaler og beregner totalbehov', advanced: 'konverterer fleksibelt og bruker m\u00e5l til \u00e5 planlegge innredning p\u00e5 m\u00e5lstokktegning' },
      { skill: 'Innredningsprosjektrapport', emerging: 'skriver en enkel m\u00f8belliste og 3\u20134 setninger med st\u00f8tte', proficient: 'skriver selvstendig en rapport med romplan, materialvalg, budsjett og begrunnelse', advanced: 'skriver en komplett rapport med m\u00e5lestokktegning, prissammenligning og designargumentasjon' },
    ],
  },

  garden: {
    snippetAnswer: 'Hage-oppgaver for 3. klasse (8\u20139 \u00e5r) trener arealberegning av bed og plener, multiplikasjon med plantebestillinger, br\u00f8ker med jordsammensetning, linjediagrammer med temperaturdata og selvstendig skriving av hageplanleggingsrapporter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir hagetemaet et landskapsarkitekturprosjekt \u2014 \u00e5tte- og ni\u00e5ringer beregner areal og omkrets av bed, plener og stier i m\u00b2, multipliserer med plantebestillinger (7 rader \u00d7 9 planter = 63), og arbeider med br\u00f8ker i jordsammensetning (tre \u00e5ttendedeler kompost, to \u00e5ttendedeler sand). M\u00e5lekonvertering mellom cm, m og km brukes til hageplaner. Divisjon fordeler fr\u00f8 og gjødsel (48 fr\u00f8 i 6 bed). Linjediagrammer viser temperatur og nedb\u00f8r over vekstsesongen. Hageplanleggingsrapporter med tegning, planteoversikt og v\u00e6ranalyse trener sakprosa. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for areal, m\u00e5ling og naturfag i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Arealberegning av bed og plener (8\u20139-\u00e5ringer beregner i m\u00b2 fra hageplaner)', howWeAddress: 'Hageplan-arealark der elevene beregner areal av ulike soner og planlegger beplantning per m\u00b2' },
      { milestone: 'Multiplikasjon med plantebestillinger (tosifrede tall i hagekontekst)', howWeAddress: 'Plantebestilling-ark der elevene multipliserer rader \u00d7 planter, beregner totalbehov og kostnad' },
      { milestone: 'Hageplanleggingsrapport med tegning og v\u00e6rdata', howWeAddress: 'Hageprosjekt-maler der elevene tegner hageplan, planlegger beplantning og analyserer v\u00e6rdata' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk hele meter i areal, ensifret multiplikasjon og ferdiglagde hageplaner med felt. For avanserte elever i 3. klasse legges til arealberegning av sammensatte former, tosifret multiplikasjon med desimaler, og selvstendig hageplanleggingsrapport med v\u00e6ranalyse, kostnadsoptimering og b\u00e6rekraftsvurdering.',
    parentTakeaway: 'Gj\u00f8r hagen til et matteprosjekt: beregn arealet av et bed (3 m \u00d7 1,5 m). Regn: \u00ab7 rader med 9 planter.\u00bb Del: \u00ab48 fr\u00f8 i 6 bed.\u00bb Lag br\u00f8ker: \u00abtre av \u00e5tte deler kompost.\u00bb Tegn en hageplan med m\u00e5l og la barnet planlegge beplantningen. Hagearbeid er matematikk, naturfag og kreativitet i ett.',
    classroomIntegration: 'Hagetemaet i 3. klasse integrerer matematikk (areal, multiplikasjon, br\u00f8ker), naturfag (vekstvilk\u00e5r og \u00f8kologi), og norsk (planleggingsrapporter). En klassehage med reell beplantning, m\u00e5ling og v\u00e6robservasjon forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for areal, naturfag og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Arealberegning av bed og plener', emerging: 'beregner areal av rektangler med hele tall og st\u00f8tte', proficient: 'beregner selvstendig areal og omkrets fra hageplaner og planlegger beplantning', advanced: 'beregner areal av sammensatte former, optimerer plassbruk og argumenterer for designvalg' },
      { skill: 'Multiplikasjon med plantedata', emerging: 'multipliserer ensifret \u00d7 ensifret med st\u00f8tte', proficient: 'l\u00f8ser selvstendig tosifret multiplikasjon med plantebestillinger og beregner totalkostnad', advanced: 'optimerer plantebestillinger med prissammenligning og beregner nøyaktig totalbehov per m\u00b2' },
      { skill: 'Hageplanleggingsrapport', emerging: 'skriver en enkel planteliste og 3\u20134 setninger med st\u00f8tte', proficient: 'skriver selvstendig en rapport med hageplan, planteoversikt, budsjett og v\u00e6rdata', advanced: 'skriver en komplett rapport med m\u00e5lestokktegning, v\u00e6ranalyse, b\u00e6rekraftsvurdering og optimering' },
    ],
  },

  halloween: {
    snippetAnswer: 'Halloween-oppgaver for 3. klasse (8\u20139 \u00e5r) trener multiplikasjon med kostymekostnader, br\u00f8ker med godterifordeling, m\u00f8nstergjenkjenning med halloweensekvenser, arealberegning av dekorasjoner og selvstendig skriving av uhyggelige fortellinger med kompleks struktur. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir halloweentemaet et kreativt og matematisk prosjekt \u2014 \u00e5tte- og ni\u00e5ringer multipliserer med kostymekostnader (6 meters stoff \u00e0 45 kr.), beregner br\u00f8ker med godterifordeling (tre \u00e5ttendedeler er sjokolade), og l\u00f8ser m\u00f8nstergjenkjenning med avanserte halloweensekvenser. Arealberegning brukes p\u00e5 veggdekorasjoner og plakater. Divisjon fordeler godteri rettferdig (56 drops til 8 barn). Linjediagrammer viser knusk-eller-godteri-data. Uhyggelige fortellinger med kompleks struktur (innledning, oppbygging, klimaks, vending) trener kreativ skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, br\u00f8ker og fortellingsskriving i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med kostymematerialer (8\u20139-\u00e5ringer beregner materialkostnader)', howWeAddress: 'Kostymebudsjett-ark der elevene multipliserer meterpris \u00d7 stofflengde, summerer og holder budsjett' },
      { milestone: 'Br\u00f8ker med godterifordeling (\u00e5ttendedeler og sjettedeler i festkontekst)', howWeAddress: 'Godterifordelingsark der elevene sorterer godteri i kategorier og beregner br\u00f8kandeler' },
      { milestone: 'Uhyggelig fortelling med kompleks struktur (fire deler med vending)', howWeAddress: 'Skrekkfortelling-maler med rammer for innledning, oppbygging, klimaks og overraskende vending' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk ensifret multiplikasjon, halvdeler og fjerdedeler, og fortellingsmaler med setningsstartere. For avanserte elever i 3. klasse legges til tosifret multiplikasjon med desimaler, br\u00f8ksammenligning med ulike nevnere, og selvstendig skrekkfortelling med flere vendinger og litter\u00e6re virkemidler.',
    parentTakeaway: 'Gj\u00f8r halloween til matematikk: \u00ab6 m stoff \u00e0 45 kr.\u00bb Del godteriet: \u00ab56 drops til 8 barn \u2014 hvor mange hver?\u00bb Br\u00f8kberegn: \u00abtre av \u00e5tte er sjokolade.\u00bb Beregn arealet av en halloweenplakat. La barnet skrive en uhyggelig fortelling med overraskende slutt. Halloweenmatematikk er skummelt morsomt.',
    classroomIntegration: 'Halloweentemaet i 3. klasse binder sammen matematikk (multiplikasjon, br\u00f8ker, areal), norsk (kreativ skriving og fortellingsstruktur), og kunst (kostymedesign og dekorasjoner). Et halloweenprosjekt med budsjett, dekorasjon og skrekkfortelling forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for regning, skriving og kreativitet st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med kostymekostnader', emerging: 'multipliserer ensifret \u00d7 tosifret med st\u00f8tte', proficient: 'l\u00f8ser selvstendig kostymebudsjetter med tosifret multiplikasjon og summering', advanced: 'optimerer kostymevalg med prissammenligning, beregner totalkostnad og argumenterer for valg' },
      { skill: 'Br\u00f8ker med godterifordeling', emerging: 'finner halvdeler og fjerdedeler med konkreter', proficient: 'beregner selvstendig \u00e5ttendedeler og sjettedeler fra godteridata og sammenligner', advanced: 'sammenligner br\u00f8ker med ulike nevnere, optimerer fordeling og forklarer strategien' },
      { skill: 'Uhyggelig fortelling med kompleks struktur', emerging: 'skriver en kort fortelling med innledning og slutt med st\u00f8tte', proficient: 'skriver selvstendig en fortelling med fire deler, beskrivende spr\u00e5k og overraskende vending', advanced: 'skriver en kompleks fortelling med flere vendinger, litter\u00e6re virkemidler og tematisk dybde' },
    ],
  },

  holidays: {
    snippetAnswer: 'H\u00f8ytid-oppgaver for 3. klasse (8\u20139 \u00e5r) trener flertrinnsproblemer med festbudsjetter, br\u00f8ker med tradisjonselementer, multiplikasjon med gaveinnkj\u00f8p, kulturell sammenligning med datadiagrammer og selvstendig skriving av h\u00f8ytidstradisjonsrapporter med kilder. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir h\u00f8ytidstemaet et kulturelt og matematisk forskningsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer l\u00f8ser flertrinnsproblemer med festbudsjetter (gaver + mat + pynt med totalgrense), beregner br\u00f8ker med tradisjonselementer (to femtedeler av julepynten er hjemmelaget), og multipliserer med gaveinnkj\u00f8p. Divisjon fordeler festmat (48 pepperkaker til 6 tallerkener). S\u00f8ylediagrammer sammenligner tradisjoner p\u00e5 tvers av land. Kulturelle sammenligningsrapporter med data fra to land trener sakprosa og kulturkunnskap. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, kulturkunnskap og sakprosa i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnsproblemer med festbudsjetter (8\u20139-\u00e5ringer kombinerer tre operasjoner)', howWeAddress: 'Festbudsjett-ark der elevene planlegger innkj\u00f8p, beregner totaler og holder seg innenfor budsjett med flere trinn' },
      { milestone: 'Br\u00f8ker med tradisjonselementer (deler av en helhet i kulturkontekst)', howWeAddress: 'Tradisjonsbr\u00f8k-ark der elevene beregner andeler av h\u00f8ytidselementer og sammenligner med andre land' },
      { milestone: 'Kulturell sammenligningsrapport med data og kilder', howWeAddress: 'Tradisjonsforsknings-maler der elevene sammenligner to lands h\u00f8ytider med data og skriver strukturert rapport' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk totrinnsproblemer med runde tall, halvdeler og fjerdedeler, og rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til tretrinnsproblemer med desimaler, br\u00f8ker med ulike nevnere, og selvstendig sammenligningsrapport med tre land, statistikk og kulturell analyse.',
    parentTakeaway: 'Planlegg h\u00f8ytiden som matematikk: \u00abbudsjett p\u00e5 2 000 kr. \u2014 gaver 800, mat 600, pynt 300 \u2014 hva er igjen?\u00bb Br\u00f8kregn: \u00abto av fem pyntegjenstander er hjemmelagde.\u00bb Fordel: \u00ab48 pepperkaker til 6.\u00bb Sammenlign: \u00abhvordan feirer de jul i Japan?\u00bb La barnet skrive en tradisjonsrapport. H\u00f8ytidsmatematikk er kulturell forst\u00e5else og regning i ett.',
    classroomIntegration: 'H\u00f8ytidstemaet i 3. klasse integrerer matematikk (flertrinnsproblemer, br\u00f8ker, diagrammer), samfunnsfag/KRLE (kulturelle tradisjoner), og norsk (sammenligningsrapporter). Et h\u00f8ytidsforskningsprosjekt med data fra ulike land forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, kulturkunnskap og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Flertrinnsproblemer med festbudsjetter', emerging: 'l\u00f8ser totrinnsproblemer med runde tall og st\u00f8tte', proficient: 'l\u00f8ser selvstendig tretrinnsproblemer med budsjetter og viser mellomregninger', advanced: 'formulerer egne flertrinnsproblemer, optimerer budsjetter og verifiserer systematisk' },
      { skill: 'Br\u00f8ker med tradisjonselementer', emerging: 'finner halvdeler og fjerdedeler av h\u00f8ytidsdata med konkreter', proficient: 'beregner selvstendig femtedeler og \u00e5ttendedeler og sammenligner tradisjonsandeler', advanced: 'sammenligner br\u00f8ker med ulike nevnere fra ulike land og trekker kulturelle konklusjoner' },
      { skill: 'Kulturell sammenligningsrapport', emerging: 'skriver 3\u20134 setninger om en norsk h\u00f8ytid med st\u00f8tte', proficient: 'skriver selvstendig en sammenligningsrapport med to land, likheter og forskjeller', advanced: 'skriver en detaljert rapport med tre land, statistikk, kulturell analyse og kildehenvisning' },
    ],
  },

  household: {
    snippetAnswer: 'Husarbeid-oppgaver for 3. klasse (8\u20139 \u00e5r) trener m\u00e5nedsbudsjett med flere poster, br\u00f8ker med budsjettfordeling, energiavlesning og forbruksberegning, divisjon med gjennomsnittsberegning og selvstendig skriving av husholdningsguider med \u00f8konomisk argumentasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir husholdningstemaet et reelt \u00f8konomi- og b\u00e6rekraftsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer h\u00e5ndterer m\u00e5nedsbudsjetter med 5\u20136 poster, beregner br\u00f8ker med budsjettfordeling (to femtedeler av budsjettet g\u00e5r til mat), og leser av energim\u00e5lere med forbruksberegning (15 kWh \u00d7 2,50 kr.). Divisjon beregner daglige gjennomsnitt fra m\u00e5nedsdata. Linjediagrammer viser str\u00f8mforbruk over m\u00e5neder. Husholdningsguider med sparetips, \u00f8konomisk analyse og b\u00e6rekraftsargumentasjon trener overbevisende sakprosa. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for \u00f8konomi, m\u00e5ling og argumentasjon i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'M\u00e5nedsbudsjett med flere poster (8\u20139-\u00e5ringer h\u00e5ndterer realistisk \u00f8konomi med addisjon og subtraksjon)', howWeAddress: 'Husholdningsbudsjett-ark med 5\u20136 poster der elevene beregner total, rest og identifiserer sparemuligheter' },
      { milestone: 'Br\u00f8ker med budsjettfordeling (deler av en helhet i \u00f8konomisk kontekst)', howWeAddress: 'Budsjettfordeling-br\u00f8kark der elevene beregner br\u00f8kdeler av m\u00e5nedsbudsjettet og sammenligner med anbefalinger' },
      { milestone: 'Energiavlesning og forbruksberegning (praktisk multiplikasjon og divisjon)', howWeAddress: 'Energi-ark der elevene leser av str\u00f8mm\u00e5ler, beregner m\u00e5nedsforbruk med multiplikasjon og finner daglig gjennomsnitt' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk tre budsjettsposter med runde tall, halvdeler og fjerdedeler i fordeling, og energioppgaver med hele kWh. For avanserte elever i 3. klasse legges til 6+ budsjettposter med spareanalyse, br\u00f8k- og prosentberegning av budsjettandeler, og selvstendig husholdningsguide med \u00f8konomisk optimering og b\u00e6rekraftsperspektiv.',
    parentTakeaway: 'Involver barnet i husholdnings\u00f8konomi: \u00abmatbudsjettet v\u00e5rt er 6 000 kr. i m\u00e5neden \u2014 hvor mange kr. per dag? Per m\u00e5ltid?\u00bb Beregn br\u00f8ker: \u00abto femtedeler av budsjettet g\u00e5r til mat.\u00bb Les av str\u00f8mm\u00e5leren og beregn: \u00ab15 kWh i dag \u00d7 2,50 kr.\u00bb La barnet skrive en spareguide med tre argumenter. Husholdning er den mest livspraktiske matematikken.',
    classroomIntegration: 'Husholdningstemaet i 3. klasse brukes som \u00f8konomi- og b\u00e6rekraftsprosjekt: matematikktimen med budsjettark, br\u00f8ker og energiberegning, naturfagstimen med energi og b\u00e6rekraft, norsktimen med husholdningsguider og argumentasjon. Et klasseprosjekt om b\u00e6rekraftig husholdning med budsjetter og spareplaner forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for \u00f8konomi, m\u00e5ling og argumentasjon st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'M\u00e5nedsbudsjett med flere poster', emerging: 'adderer 2\u20133 budsjettposter med runde tall og finner rest med st\u00f8tte', proficient: 'beregner selvstendig et budsjett med 5+ poster, finner rest og identifiserer sparemuligheter', advanced: 'optimerer budsjetter med begrensninger, sammenligner m\u00e5neders utgifter og argumenterer for prioriteringer' },
      { skill: 'Br\u00f8ker med budsjettfordeling', emerging: 'finner halvdelen og fjerdedelen av et budsjett med konkreter', proficient: 'beregner selvstendig femtedeler og \u00e5ttendedeler av budsjettet og sammenligner med anbefalinger', advanced: 'konverterer mellom br\u00f8k og prosent, analyserer budsjettfordelinger og foresl\u00e5r optimeringer' },
      { skill: 'Husholdningsguide med argumentasjon', emerging: 'skriver 3\u20134 sparetips med enkel begrunnelse med st\u00f8tte', proficient: 'skriver selvstendig en husholdningsguide med data, tre argumenter og konkrete anbefalinger', advanced: 'skriver en detaljert guide med \u00f8konomisk analyse, b\u00e6rekraftsperspektiv og overbevisende retorikk' },
    ],
  },
};

// Build the insertion text for each theme
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

// Process each theme
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
  // CRITICAL: third-grade is the LAST grade block, so end boundary is `// -- FAQ --` or `// -- Vanlige spørsmål --`
  const thirdGradeIdx = content.indexOf("'third-grade'");
  let faqCommentIdx = content.indexOf('// -- FAQ --', thirdGradeIdx);
  if (faqCommentIdx === -1) {
    faqCommentIdx = content.indexOf('// -- Vanlige sp\u00f8rsm\u00e5l --', thirdGradeIdx);
  }

  if (thirdGradeIdx === -1 || faqCommentIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/no.ts`);
    errorCount++;
    continue;
  }

  // Check if snippetAnswer already exists in third-grade block
  const thirdGradeBlock = content.substring(thirdGradeIdx, faqCommentIdx);
  if (thirdGradeBlock.includes('snippetAnswer')) {
    console.log(`SKIP (already enriched): ${theme}/no.ts`);
    continue;
  }

  // Find the last "],\n" in the third-grade block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(thirdGradeBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/no.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = thirdGradeIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/no.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
