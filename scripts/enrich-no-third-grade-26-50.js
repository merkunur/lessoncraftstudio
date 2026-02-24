#!/usr/bin/env node
/**
 * SEO Part 265: NO Third-Grade Enrichment — Themes 26-50
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the third-grade grade block of 25 NO theme files (insects through zoo).
 *
 * CRITICAL DIFFERENCE from second-grade scripts: third-grade is the LAST grade block,
 * so the end boundary is the top-level `// -- FAQ --` comment, not another grade marker.
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  insects: {
    snippetAnswer: 'Insekt-oppgaver for 3. klasse (8\u20139 \u00e5r) trener multiplikasjon med insektkroppsberegning (6 bein \u00d7 12 insekter), br\u00f8ker med metamorfosestadier, linjediagrammer med populasjonsdata over sesonger og selvstendig skriving av forklarende tekster om livssykluser med vitenskapelig vokabular. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir insekttemaet et avansert tverrfaglig forskningsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer mestrer multiplikasjon med insektkroppsberegning (6 bein \u00d7 15 biller = 90 bein, 4 vinger \u00d7 18 sommerfugler = 72 vinger), analyserer metamorfose med br\u00f8ker (tre fjerdedeler av livssyklusen tilbringes som larve), og registrerer insektobservasjoner i linjediagrammer over fire sesonger. Divisjon med rest l\u00f8ser fordelingsproblemer i kolonier (96 maur fordelt p\u00e5 8 tunneler = 12 per tunnel). Areal og omkrets beregnes for insekthabitater. Forklarende tekster med vitenskapelig vokabular, kildehenvisninger og avsnittsstruktur trener vitenskapelig formidling. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, naturfaglig unders\u00f8kelse og skriftlig formidling i 3. trinn st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med konsistente kroppsstrukturer (8\u20139-\u00e5ringer bruker insektkropper som multiplikasjonsmodell)', howWeAddress: 'Insektkropps-beregningsark der elevene multipliserer bein, vinger og antenner for grupper av insekter og verifiserer med gjentatt addisjon' },
      { milestone: 'Metamorfoseanalyse med br\u00f8ker (tidsandeler i livssyklusstadier)', howWeAddress: 'Metamorfose-br\u00f8kark der elevene beregner hvor stor andel av livssyklusen hvert stadium utgj\u00f8r' },
      { milestone: 'Sesongbaserte linjediagrammer med insektpopulasjoner', howWeAddress: 'Insekttellings-diagramark der elevene registrerer observasjoner over fire sesonger og analyserer trender' },
      { milestone: 'Forklarende vitenskapelig tekst med kildehenvisninger', howWeAddress: 'Livssyklus-forklaringsark der elevene skriver fireavsnittstekster om metamorfose med kilder og vitenskapelig vokabular' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens multiplikasjon til 2-, 5- og 10-gangen med insektbilder, bruk halvdeler i livssyklusandeler, og tilby forklaringsmaler med setningsstartere. For avanserte elever i 3. klasse legges til flertrinnsmultiplikasjon (bein + vinger + antenner totalt), br\u00f8ksammenligning mellom ulike arters livssykluser, og selvstendig forskningsrapport med statistisk analyse og kildevurdering.',
    parentTakeaway: 'G\u00e5 p\u00e5 insektjakt og regn: \u00ab7 marih\u00f8ner med 6 bein hver \u2014 hvor mange bein totalt?\u00bb F\u00f8r en insektdagbok over fire uker og tegn et linjediagram. Utforsk metamorfose: \u00abhvor stor del av livet tilbringer en sommerfugl som larve?\u00bb La barnet skrive en forklarende tekst om et favoritinsekt. Insektmatematikk er naturforskning i praksis.',
    classroomIntegration: 'Insekttemaet i 3. klasse fungerer som \u00e5rsprosjekt i naturfag og matematikk: naturfagstimen med metamorfose, \u00f8kosystemer og klassifikasjon, matematikktimen med multiplikasjon, br\u00f8ker og linjediagrammer, norsktimen med forklarende tekster og forskningsrapporter. Et klasseinsektarium med observasjonslogger forbinder teori og praksis. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, multiplikasjon og formidling st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med insektkroppsdata', emerging: 'multipliserer i 2- og 5-gangen med insektbilder som st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjon innenfor 100 med insektdata og verifiserer med gjentatt addisjon', advanced: 'l\u00f8ser flertrinnsproblemer med b\u00e5de multiplikasjon og divisjon, formulerer egne insektoppgaver og forklarer strategier' },
      { skill: 'Br\u00f8ker med metamorfosestadier', emerging: 'identifiserer halvdeler og fjerdedeler i livssyklusdiagrammer med st\u00f8tte', proficient: 'beregner selvstendig br\u00f8kandeler for hvert metamorfosestadium og sammenligner', advanced: 'sammenligner livssyklusbr\u00f8ker mellom arter, konverterer til prosent og analyserer biologiske m\u00f8nstre' },
      { skill: 'Forklarende tekst om insektlivssyklus', emerging: 'skriver 3\u20134 setninger om metamorfose med bildest\u00f8tte', proficient: 'skriver selvstendig en fireavsnittstekst med vitenskapelig vokabular og \u00e9n kilde', advanced: 'skriver en detaljert forklarende tekst med flere kilder, presist vokabular og sammenlignende analyse' },
    ],
  },

  jobs: {
    snippetAnswer: 'Yrke-oppgaver for 3. klasse (8\u20139 \u00e5r) trener flertrinnstekstoppgaver med l\u00f8nn og arbeidstid, br\u00f8ker med budsjettfordeling, multiplikasjon med vareproduksjon og selvstendig skriving av yrkesrapporter med sammenligning og argumentasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir yrketemaet et avansert \u00f8konomi- og samfunnsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer l\u00f8ser flertrinnstekstoppgaver med l\u00f8nn og arbeidstid (en l\u00e6rer tjener 480 000 kr. i \u00e5ret \u2014 hvor mye per m\u00e5ned? Per uke?), beregner br\u00f8ker med budsjettfordeling (en tredjedel til mat, en fjerdedel til husleie), og bruker multiplikasjon til vareproduksjon (en baker lager 24 br\u00f8d per dag \u00d7 5 dager). Divisjon med rest l\u00f8ser fordelingsproblemer (150 pakker fordelt p\u00e5 8 hyller). Sammenlignende rapporter om to yrker med argumentasjon trener avansert skriving. M\u00e5lekonvertering brukes til yrkesverkt\u00f8y. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, \u00f8konomi og argumentasjon i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnstekstoppgaver med l\u00f8nn og arbeidstid (8\u20139-\u00e5ringer kombinerer divisjon og multiplikasjon)', howWeAddress: 'L\u00f8nnsberegningsark der elevene regner \u00e5rsl\u00f8nn til m\u00e5nedsl\u00f8nn og ukesl\u00f8nn med divisjon og sammenligner yrker' },
      { milestone: 'Budsjettfordeling med br\u00f8ker (tredjedeler, fjerdedeler, femtedeler)', howWeAddress: 'Yrkesbudsjett-ark der elevene fordeler l\u00f8nn i br\u00f8kdeler og sammenligner utgiftsposter' },
      { milestone: 'Multiplikasjon med produksjonsdata (daglig \u00d7 ukentlig \u00d7 m\u00e5nedlig)', howWeAddress: 'Produksjonsberegnings-ark der elevene multipliserer daglig produksjon med arbeidsdager og uker' },
      { milestone: 'Sammenlignende yrkesrapport med argumentasjon', howWeAddress: 'Sammenlignende rapportmaler der elevene analyserer to yrker med data, fordeler/ulemper og argumentert konklusjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk runde l\u00f8nnstall med enkle divisjoner, halvdeler og fjerdedeler i budsjett, og rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til tretrinnsl\u00f8nnsberegning med overtid, br\u00f8k- og prosentbudsjetter, og selvstendig analyse av tre yrker med kryssreferanser og \u00f8konomisk vurdering.',
    parentTakeaway: 'Utforsk yrker med matematikk: \u00aben sykepleier jobber 37,5 timer i uken \u00d7 4 uker \u2014 hvor mange timer i m\u00e5neden?\u00bb Beregn budsjett: \u00aben tredjedel av l\u00f8nnen g\u00e5r til husleie.\u00bb La barnet intervjue et familiemedlem om yrket og skrive en rapport. Yrkesmatematikk gir barn et vindu inn i voksenverdenens \u00f8konomi.',
    classroomIntegration: 'Yrketemaet i 3. klasse brukes som samfunnsfag- og \u00f8konomiprosjekt: matematikktimen med l\u00f8nn, budsjetter og produksjon, norsktimen med yrkesrapporter og intervjuskriving, samfunnsfag med arbeidslivskunnskap og yrkesvalg. Et klasseyrkesmesse-prosjekt med elevpresentasjoner forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, \u00f8konomi og samfunnskunnskap st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Flertrinnstekstoppgaver med l\u00f8nn og tid', emerging: 'l\u00f8ser totrinnsproblemer med runde l\u00f8nnstall og hele timer med st\u00f8tte', proficient: 'l\u00f8ser selvstendig tretrinnsproblemer med \u00e5rs-, m\u00e5neds- og ukesl\u00f8nn og viser mellomregninger', advanced: 'formulerer egne l\u00f8nnsproblemer, sammenligner flere yrker og verifiserer systematisk' },
      { skill: 'Budsjettfordeling med br\u00f8ker', emerging: 'finner halvdelen og fjerdedelen av et l\u00f8nnsbel\u00f8p med konkreter', proficient: 'beregner selvstendig tredjedeler og femtedeler av budsjetter og sammenligner poster', advanced: 'konverterer mellom br\u00f8k og prosent, optimerer budsjetter og argumenterer for prioriteringer' },
      { skill: 'Sammenlignende yrkesrapport', emerging: 'skriver en kort beskrivelse av \u00e9tt yrke med faktasetninger', proficient: 'skriver selvstendig en sammenlignende rapport om to yrker med argumentasjon', advanced: 'skriver en detaljert analyse av tre yrker med data, kryssreferanser og nyansert konklusjon' },
    ],
  },

  music: {
    snippetAnswer: 'Musikk-oppgaver for 3. klasse (8\u20139 \u00e5r) trener br\u00f8ker med taktarter og notelengder, multiplikasjon med rytmem\u00f8nstre, linjediagrammer med lydfrekvensdata og selvstendig skriving av musikkanalyser med fagtermer og sammenlignende struktur. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir musikktemaet et avansert br\u00f8k- og m\u00f8nsterprosjekt \u2014 \u00e5tte- og ni\u00e5ringer forst\u00e5r at en helnote deles i halvnoter, fjerdedelsnoter og \u00e5ttendedelsnoter, og bruker br\u00f8ker til \u00e5 beregne taktfylling (tre fjerdedeler + en fjerdedel = en hel takt). Multiplikasjon med rytmem\u00f8nstre beregner totalt antall slag i et musikkstykke (4 slag per takt \u00d7 16 takter = 64 slag). M\u00e5lekonvertering mellom sekunder og minutter brukes til sanglengder. Linjediagrammer viser toneh\u00f8yde og dynamikk over tid. Sammenlignende musikkanalyser med fagtermer (tempo, dynamikk, toneart) trener avansert fagskriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, m\u00f8nstre og estetisk refleksjon i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Br\u00f8ker med notelengder og taktarter (8\u20139-\u00e5ringer kobler musikkteori til br\u00f8kforst\u00e5else)', howWeAddress: 'Notelengde-br\u00f8kark der elevene beregner hvordan ulike notekombinasjoner fyller takten og sammenligner taktarter' },
      { milestone: 'Multiplikasjon med rytmem\u00f8nstre (slag per takt \u00d7 antall takter)', howWeAddress: 'Rytmeberegnings-ark der elevene multipliserer slag, takter og gjentakelser for \u00e5 beregne totalt antall slag' },
      { milestone: 'Sammenlignende musikkanalyse med fagtermer (tempo, dynamikk, form)', howWeAddress: 'Musikkanalyse-maler der elevene sammenligner to musikkstykker med strukturerte avsnitt og fagvokabular' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk halvnoter og fjerdedelsnoter kun, hold multiplikasjon i 4-gangen, og tilby analysemaler med ordbank. For avanserte elever i 3. klasse legges til \u00e5ttendedelsnoter med punktering, flertrinnsmultiplikasjon med tempo\u00e5ndringer, og selvstendig analyse med musikkhistorisk perspektiv og komposisjonsvurdering.',
    parentTakeaway: 'Utforsk musikk med br\u00f8ker: klapp en fjerdedelsnote, klapp to \u00e5ttendedeler \u2014 \u00abhvorfor er to \u00e5ttendedeler like lang som \u00e9n fjerdedel?\u00bb Tell slag i favorittsangen: \u00ab4 slag per takt \u00d7 32 takter = ?\u00bb M\u00e5l sanglengder i sekunder og konverter til minutter. La barnet sammenligne to sanger skriftlig. Musikkmatematikk gj\u00f8r br\u00f8ker h\u00f8rbare.',
    classroomIntegration: 'Musikktemaet i 3. klasse integrerer matematikk og estetikk: matematikktimen med br\u00f8ker, multiplikasjon og m\u00e5lekonvertering, musikktimen med notelesing og komposisjon, norsktimen med musikkanalyser og fagskriving. Et klassekomposisjonsprosjekt med matematisk planlegging forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, m\u00f8nstre og estetisk refleksjon st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Br\u00f8ker med notelengder og taktarter', emerging: 'identifiserer halvnoter og fjerdedelsnoter og teller slag i enkel taktart med st\u00f8tte', proficient: 'beregner selvstendig br\u00f8kkombinasjoner som fyller takten og sammenligner taktarter', advanced: 'arbeider med \u00e5ttendedelsnoter og punktering, analyserer komplekse rytmer og forklarer br\u00f8ksammenhengen' },
      { skill: 'Multiplikasjon med rytmestrukturer', emerging: 'multipliserer slag per takt i 4-gangen med konkreter', proficient: 'l\u00f8ser selvstendig multiplikasjon med ulike taktarter og beregner totalt antall slag i musikkstykker', advanced: 'l\u00f8ser flertrinnsproblemer med tempo\u00e5ndringer, formulerer egne rytmeoppgaver og verifiserer' },
      { skill: 'Sammenlignende musikkanalyse', emerging: 'beskriver \u00e9tt musikkstykke med 3\u20134 setninger og enkle fagord', proficient: 'skriver selvstendig en sammenlignende analyse av to musikkstykker med fagtermer og struktur', advanced: 'skriver en detaljert analyse med musikkhistorisk kontekst, personlig vurdering og faglig argumentasjon' },
    ],
  },

  nature: {
    snippetAnswer: 'Natur-oppgaver for 3. klasse (8\u20139 \u00e5r) trener linjediagrammer med fenologiske data, multiplikasjon med \u00f8kosystemberegninger, br\u00f8ker med n\u00e6ringskjeder og selvstendig skriving av milj\u00f8forskningsrapporter med hypotese, metode og konklusjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir naturtemaet et vitenskapelig langtidsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer registrerer fenologiske observasjoner (f\u00f8rste krokus, f\u00f8rste svale, l\u00f8vfall) i linjediagrammer over m\u00e5neder og analyserer sesongm\u00f8nstre. Multiplikasjon beregner \u00f8kosystemdata (12 trær \u00d7 45 blader = 540 blader). Br\u00f8ker beskriver n\u00e6ringskjeder (to femtedeler av artene er planteetere). Areal og omkrets beregnes for naturreservater. M\u00e5lekonvertering mellom cm, m og km brukes til avstander i naturen. Milj\u00f8forskningsrapporter med hypotese, metode, resultater og konklusjon trener full vitenskapelig metode. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, data og rapportering i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Fenologiske linjediagrammer (8\u20139-\u00e5ringer registrerer og analyserer sesongendringer over tid)', howWeAddress: 'Fenologi-diagramark der elevene registrerer naturobservasjoner m\u00e5nedlig og identifiserer m\u00f8nstre' },
      { milestone: 'Multiplikasjon med \u00f8kosystemdata (flertrinnsberegning)', howWeAddress: '\u00d8kosystem-beregningsark der elevene multipliserer arter, individer og egenskaper i naturen' },
      { milestone: 'Br\u00f8ker i n\u00e6ringskjeder (andeler av arter i \u00f8kosystemer)', howWeAddress: 'N\u00e6ringskjede-br\u00f8kark der elevene beregner andeler av produsenter, planteetere og rovdyr' },
      { milestone: 'Vitenskapelig milj\u00f8forskningsrapport med full struktur', howWeAddress: 'Forskningsrapport-maler med hypotese, metode, resultater og konklusjon for naturoppdrag' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle s\u00f8ylediagrammer med to sesonger, multiplikasjon i 2- og 5-gangen, og rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til doble linjediagrammer med temperaturkorrelasjon, flertrinnsmultiplikasjon med \u00f8kosystemkjeder, og selvstendig milj\u00f8rapport med statistisk analyse og b\u00e6rekraftsperspektiv.',
    parentTakeaway: 'Start en fenologidagbok: noter n\u00e5r f\u00f8rste krokus blomstrer, f\u00f8rste svale ankommer, l\u00f8vfallet starter. Tegn et linjediagram over \u00e5ret. Regn med naturen: \u00ab8 fuglearter med 6 individer av hver \u2014 hvor mange fugler?\u00bb Beregn: \u00abto femtedeler av artene er insekter.\u00bb La barnet skrive en forskningsrapport om natur\u00e5ret. Naturobservasjon er vitenskapelig tenkning.',
    classroomIntegration: 'Naturtemaet i 3. klasse er \u00e5rets omdreiningspunkt: naturfagstimen med fenologi, \u00f8kosystemer og n\u00e6ringskjeder, matematikktimen med linjediagrammer, multiplikasjon og arealberegning, norsktimen med forskningsrapporter og vitenskapelig metode. Et klasse\u00f8kosystem-prosjekt med m\u00e5nedlige observasjoner forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, data og rapportering st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Fenologiske linjediagrammer', emerging: 'registrerer observasjoner i enkel tabell og avleser s\u00f8ylediagram med st\u00f8tte', proficient: 'oppretter og fortolker selvstendig linjediagrammer over sesonger og beskriver trender', advanced: 'sammenligner linjediagrammer med klimadata, forklarer \u00e5rsakssammenhenger og foresl\u00e5r prognoser' },
      { skill: 'Multiplikasjon med \u00f8kosystemdata', emerging: 'multipliserer i 2- og 5-gangen med naturbilder som st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjon innenfor 100 med \u00f8kosystemdata og verifiserer med divisjon', advanced: 'l\u00f8ser flertrinnsproblemer med arter og individer, formulerer egne \u00f8kosystemoppgaver' },
      { skill: 'Vitenskapelig milj\u00f8rapport', emerging: 'skriver en observasjonsrapport med resultater og enkel konklusjon med st\u00f8tte', proficient: 'skriver selvstendig en rapport med hypotese, metode, resultater og konklusjon', advanced: 'skriver en detaljert rapport med statistisk analyse, feilkilder og b\u00e6rekraftsperspektiv' },
    ],
  },

  numbers: {
    snippetAnswer: 'Tall-oppgaver for 3. klasse (8\u20139 \u00e5r) trener firesifrede tall med plassverdisystem, multiplikasjon og divisjon innenfor 100 med omvendte operasjoner, br\u00f8ker med tallinje og ekvivalens, og selvstendig skriving av matematiske forklaringer med bevis og begrunnelse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse utvides talltemaet til avansert tallforst\u00e5else og operasjonsmestring \u2014 \u00e5tte- og ni\u00e5ringer arbeider med firesifrede tall i plassverdisystemet, mestrer alle gangetabeller innenfor 100 med omvendte divisjonsoperasjoner, og utvikler br\u00f8kforst\u00e5else med tallinje, ekvivalente br\u00f8ker og sammenligning. Avrunding til n\u00e6rmeste tier og hundreer brukes til estimering. Flertrinnstekstoppgaver krever valg av operasjon og systematisk l\u00f8sning. Tallm\u00f8nstre med regler (legg til 7, multipliser med 3) trener algebraisk tenkning. Matematiske forklaringer med bevis og begrunnelse trener metakognisjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tallforst\u00e5else, regning og matematisk argumentasjon i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Firesifrede tall med plassverdisystem (8\u20139-\u00e5ringer forst\u00e5r tusener, hundreer, tiere, enere)', howWeAddress: 'Plassverdisystem-ark der elevene bygger, sammenligner og ordner firesifrede tall med konkreter og tabeller' },
      { milestone: 'Multiplikasjon og divisjon innenfor 100 med omvendte operasjoner', howWeAddress: 'Gangetabell-mestringsark der elevene l\u00f8ser multiplikasjon og verifiserer med divisjon systematisk' },
      { milestone: 'Br\u00f8ker p\u00e5 tallinje med ekvivalens og sammenligning', howWeAddress: 'Tallinje-br\u00f8kark der elevene plasserer br\u00f8ker, identifiserer ekvivalente br\u00f8ker og sammenligner st\u00f8rrelser' },
      { milestone: 'Matematisk forklaring med bevis og begrunnelse', howWeAddress: 'Matematisk skriving-ark der elevene forklarer l\u00f8sningsstrategier, begrunner svar og vurderer andres metoder' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, arbeid med tresifrede tall, begrens til 2-, 5- og 10-gangen, og bruk halvdeler og fjerdedeler p\u00e5 tallinje. For avanserte elever i 3. klasse legges til femsifrede tall med desimaler, divisjon med rest og tolkningskontekst, ekvivalente br\u00f8ker med ulike nevnere, og selvstendig matematisk argumentasjon med moteksempler.',
    parentTakeaway: '\u00d8v gangetabeller i hverdagen: \u00ab7 \u00d7 8 = 56, sjekk: 56 \u00f7 8 = 7.\u00bb Utforsk store tall: \u00abhvor mange sider har du lest i \u00e5r? Avrund til n\u00e6rmeste hundre.\u00bb Bruk br\u00f8ker: \u00abdu har lest tre \u00e5ttendedeler av boken \u2014 vis det p\u00e5 en tallinje.\u00bb La barnet forklare l\u00f8sningsstrategien sin skriftlig. Tall i 3. klasse handler om dypforst\u00e5else, ikke bare riktig svar.',
    classroomIntegration: 'Talltemaet i 3. klasse er kjernen i matematikkundervisningen: daglig talltrening med gangetabeller og plassverdisystem, ukentlige br\u00f8kutforskninger med tallinje og ekvivalens, m\u00e5nedlige flertrinnsproblemer med matematisk argumentasjon. Tallm\u00f8nsterstasjoner og matematisk dagbok forbinder ferdighetstrening med refleksjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tallforst\u00e5else, regning og argumentasjon st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Firesifrede tall og plassverdisystem', emerging: 'leser og skriver tresifrede tall og identifiserer hundreer, tiere og enere med st\u00f8tte', proficient: 'arbeider selvstendig med firesifrede tall, sammenligner, ordner og runder av til n\u00e6rmeste tier/hundre', advanced: 'arbeider med femsifrede tall og desimaler, forklarer plassverdisystemets struktur og anvender p\u00e5 ukjente tall' },
      { skill: 'Multiplikasjon og divisjon innenfor 100', emerging: 'l\u00f8ser multiplikasjon i 2-, 5- og 10-gangen med st\u00f8tte', proficient: 'mestrer alle gangetabeller innenfor 100, verifiserer med omvendt operasjon og l\u00f8ser tekstoppgaver', advanced: 'l\u00f8ser flertrinnsproblemer med b\u00e5de multiplikasjon og divisjon, formulerer egne oppgaver og beviser strategier' },
      { skill: 'Br\u00f8ker p\u00e5 tallinje', emerging: 'plasserer halvdeler og fjerdedeler p\u00e5 tallinje med st\u00f8tte', proficient: 'plasserer selvstendig br\u00f8ker med ulike nevnere, identifiserer ekvivalente br\u00f8ker og sammenligner', advanced: 'argumenterer for ekvivalens, konverterer mellom br\u00f8kformer og l\u00f8ser br\u00f8kproblemer med talllinjebevis' },
    ],
  },

  ocean: {
    snippetAnswer: 'Hav-oppgaver for 3. klasse (8\u20139 \u00e5r) trener multiplikasjon med havdyrpopulasjoner, br\u00f8ker med saltvannskonsentrasjoner, linjediagrammer med tidevannsdata og selvstendig skriving av marine forskningsrapporter med vitenskapelig metode og kildehenvisninger. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir havtemaet et avansert marinbiologisk forskningsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer mestrer multiplikasjon med havdyrpopulasjoner (en korallrev har 15 arter \u00d7 8 individer = 120 organismer), beregner br\u00f8ker med saltvannskonsentrasjoner og havdybder (en fjerdedel av havet er over 4000 meter dypt), og analyserer tidevannsm\u00f8nstre i linjediagrammer. Areal og omkrets beregnes for marine verneomr\u00e5der. Divisjon med rest fordeler fangst i like andeler. M\u00e5lekonvertering mellom ml, l og m\u00b3 brukes til vannvolumer. Marine forskningsrapporter med hypotese, kilder og konklusjon trener vitenskapelig formidling. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, multiplikasjon og rapportering i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med marine populasjonsdata (8\u20139-\u00e5ringer beregner bestander i \u00f8kosystemer)', howWeAddress: 'Korallrev-beregningsark der elevene multipliserer arter og individer for \u00e5 beregne totale populasjoner' },
      { milestone: 'Br\u00f8ker med havdybder og konsentrasjoner (forst\u00e5else av andeler i naturdata)', howWeAddress: 'Havdybde-br\u00f8kark der elevene beregner andeler av havbunnen p\u00e5 ulike dybder og sammenligner' },
      { milestone: 'Linjediagrammer med tidevannsm\u00f8nstre (periodiske data over tid)', howWeAddress: 'Tidevanns-diagramark der elevene avleser tidevannstabeller, tegner linjediagrammer og identifiserer m\u00f8nstre' },
      { milestone: 'Marin forskningsrapport med vitenskapelig metode', howWeAddress: 'Forskningsrapport-maler for marine temaer med hypotese, metode, resultater og konklusjon med kilder' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens multiplikasjon til 2- og 5-gangen med havbilder, bruk halvdeler og fjerdedeler, og tilby rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til flertrinnsmultiplikasjon med n\u00e6ringskjeder, br\u00f8ksammenligning med ulike nevnere for saltholdighet, og selvstendig marin rapport med statistikk og milj\u00f8perspektiv.',
    parentTakeaway: 'Utforsk havet med tall: \u00aben hval spiser 80 kg krill per dag \u00d7 7 dager \u2014 hvor mye per uke?\u00bb Beregn br\u00f8ker: \u00abto tredjedeler av jorden er dekket av hav.\u00bb Studer tidevann: \u00abn\u00e5r er det h\u00f8yvann og lavvann i dag?\u00bb og tegn et diagram. La barnet skrive en forskningsrapport om et havdyr. Havmatematikk \u00e5pner en verden av vitenskapelig undring.',
    classroomIntegration: 'Havtemaet i 3. klasse er et tverrfaglig forskningsprosjekt: naturfagstimen med marine \u00f8kosystemer og tidevann, matematikktimen med multiplikasjon, br\u00f8ker og linjediagrammer, norsktimen med forskningsrapporter og vitenskapelig formidling. Et klasseakvarium-prosjekt med m\u00e5linger og observasjonslogger forbinder teori og praksis. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, data og rapportering st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med marine populasjoner', emerging: 'multipliserer i 2- og 5-gangen med havdyrbilder som st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjon innenfor 100 med marine data og verifiserer med divisjon', advanced: 'l\u00f8ser flertrinnsproblemer med n\u00e6ringskjeder, formulerer egne oppgaver og forklarer strategier' },
      { skill: 'Br\u00f8ker med havdata', emerging: 'identifiserer halvdeler og fjerdedeler i havdiagrammer med st\u00f8tte', proficient: 'beregner selvstendig br\u00f8kandeler for havdybder og konsentrasjoner og sammenligner', advanced: 'sammenligner br\u00f8ker med ulike nevnere, konverterer til prosent og analyserer marine m\u00f8nstre' },
      { skill: 'Marin forskningsrapport', emerging: 'skriver en observasjonsrapport om et havdyr med bildest\u00f8tte', proficient: 'skriver selvstendig en rapport med hypotese, metode, resultater og konklusjon', advanced: 'skriver en detaljert rapport med statistikk, kildevurdering og milj\u00f8perspektiv' },
    ],
  },

  pets: {
    snippetAnswer: 'Kj\u00e6ledyr-oppgaver for 3. klasse (8\u20139 \u00e5r) trener flertrinnstekstoppgaver med dyrehold og kostnader, br\u00f8ker med f\u00f4rporsjoner, multiplikasjon med veterin\u00e6rbudsjetter og selvstendig skriving av overbevisende tekster om ansvarlig dyrehold med argumentasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir kj\u00e6ledyrtemaet et avansert ansvars- og \u00f8konomiprosjekt \u2014 \u00e5tte- og ni\u00e5ringer l\u00f8ser flertrinnstekstoppgaver med dyreholdskostnader (f\u00f4r 350 kr./m\u00e5ned + veterin\u00e6r 200 kr. + forsikring 150 kr. = \u00e5rskostnad?), beregner br\u00f8ker med f\u00f4rporsjoner (tre fjerdedeler av dagsrasjonen om morgenen, en fjerdedel om kvelden), og bruker multiplikasjon til \u00e5 beregne langtidskostnader (12 m\u00e5neder \u00d7 700 kr.). Divisjon fordeler oppgaver blant familiemedlemmer. Linjediagrammer viser vekstdata over m\u00e5neder. Overbevisende tekster med p\u00e5stand, begrunnelse og motargument trener argumentasjon om ansvarlig dyrehold. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, \u00f8konomi og argumentasjon i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnstekstoppgaver med dyreholdskostnader (8\u20139-\u00e5ringer kombinerer addisjon, multiplikasjon og divisjon)', howWeAddress: 'Dyreholds\u00f8konomi-ark der elevene beregner m\u00e5neds- og \u00e5rskostnader med flere poster og operasjoner' },
      { milestone: 'Br\u00f8ker med f\u00f4rporsjoner (daglige rasjoner fordelt p\u00e5 m\u00e5ltider)', howWeAddress: 'F\u00f4rporsjons-ark der elevene beregner br\u00f8kdeler av dagsrasjoner og sammenligner for ulike dyrearter' },
      { milestone: 'Linjediagrammer med vekstdata over tid (m\u00e5nedlig veiing)', howWeAddress: 'Vekstkurve-ark der elevene registrerer kj\u00e6ledyrvekt m\u00e5nedlig og analyserer vekstm\u00f8nstre' },
      { milestone: 'Overbevisende tekst om ansvarlig dyrehold (p\u00e5stand, begrunnelse, motargument)', howWeAddress: 'Debattskriving-ark der elevene argumenterer for ansvarlig dyrehold med fakta, \u00f8konomiske data og motargumenter' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk to kostnadsposter med runde tall, halvdeler og fjerdedeler i f\u00f4rporsjoner, og argumentmaler med setningsstartere. For avanserte elever i 3. klasse legges til fem+ kostnadsposter med \u00e5rsbudsjett og spareplan, br\u00f8k- og prosentberegning av f\u00f4rfordeling, og selvstendig debattekst med \u00f8konomisk analyse og etisk perspektiv.',
    parentTakeaway: 'Bruk kj\u00e6ledyret som matematikkl\u00e6rer: \u00abf\u00f4r koster 85 kr. per uke \u00d7 4 uker \u2014 hvor mye per m\u00e5ned? Per \u00e5r?\u00bb Del f\u00f4rrasjonen: \u00abtre fjerdedeler til frokost, en fjerdedel til kvelds.\u00bb Vei kj\u00e6ledyret m\u00e5nedlig og tegn en vekstkurve. La barnet skrive en overbevisende tekst om hvorfor det er viktig \u00e5 ta vare p\u00e5 dyr. Ansvar for et kj\u00e6ledyr er livets beste matematikkprosjekt.',
    classroomIntegration: 'Kj\u00e6ledyrtemaet i 3. klasse brukes som ansvars- og \u00f8konomiprosjekt: matematikktimen med flertrinnsproblemer, br\u00f8ker og linjediagrammer, norsktimen med overbevisende tekster og debatt, naturfag med dyrevelferd og biologi. Et klassekj\u00e6ledyr-prosjekt med budsjett og stelleplan forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for \u00f8konomi, argumentasjon og naturfag st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Flertrinnstekstoppgaver med dyreholdskostnader', emerging: 'l\u00f8ser totrinnsproblemer med runde priser og st\u00f8tte', proficient: 'l\u00f8ser selvstendig tretrinnsproblemer med m\u00e5neds- og \u00e5rskostnader og viser mellomregninger', advanced: 'formulerer egne dyreholdsproblemer, optimerer budsjetter og verifiserer systematisk' },
      { skill: 'Br\u00f8ker med f\u00f4rporsjoner', emerging: 'finner halvdeler og fjerdedeler av f\u00f4rmengder med konkreter', proficient: 'beregner selvstendig tredjedeler og \u00e5ttendedeler av f\u00f4rrasjoner og sammenligner', advanced: 'sammenligner f\u00f4rbr\u00f8ker med ulike nevnere, konverterer til gram og argumenterer for fordelingen' },
      { skill: 'Overbevisende tekst om dyrehold', emerging: 'skriver 3\u20134 setninger med p\u00e5stand og enkel begrunnelse', proficient: 'skriver selvstendig en overbevisende tekst med p\u00e5stand, begrunnelse og motargument', advanced: 'skriver en nyansert argumentasjon med \u00f8konomisk analyse, etisk perspektiv og overbevisende konklusjon' },
    ],
  },

  pirates: {
    snippetAnswer: 'Pirat-oppgaver for 3. klasse (8\u20139 \u00e5r) trener multiplikasjon og divisjon med skattfordeling, br\u00f8ker med lastdeling, koordinatsystem med skattkart og selvstendig skriving av eventyrfortellinger med avansert spenningsoppbygging og perspektivskift. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir pirattemaet et avansert matematikk- og skriveprosjekt \u2014 \u00e5tte- og ni\u00e5ringer l\u00f8ser divisjon med rest ved skattfordeling (97 gullmynter til 8 pirater = 12 til hver, 1 til overs \u2014 hvem f\u00e5r den siste?), beregner br\u00f8ker med lastdeling (to femtedeler av lasten er krydder, tre femtedeler er silke), og navigerer i koordinatsystemer med skattkart (G\u00e5 til punkt (7, 4), deretter 3 ruter \u00f8st). Multiplikasjon beregner flottestyrker (8 skip \u00d7 12 pirater). Areal og omkrets beregnes for \u00f8yer. Eventyrfortellinger med spenningskurve, perspektivskift og dialog trener avansert narrativ skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for divisjon, koordinater og kreativ skriving i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Divisjon med rest i skattfordelingskontekst (8\u20139-\u00e5ringer tolker resten praktisk)', howWeAddress: 'Skattfordelings-ark der elevene fordeler ulike skatter med rest og begrunner hva som skjer med resten' },
      { milestone: 'Koordinatsystem med skattkartnavigasjon (rutenettforst\u00e5else)', howWeAddress: 'Skattkart-koordinatark der elevene plotter punkter, f\u00f8lger instruksjoner og tegner ruter i rutenettet' },
      { milestone: 'Br\u00f8ker med lastfordeling (andeler av piratlast)', howWeAddress: 'Lastfordelings-br\u00f8kark der elevene beregner andeler av lasten og sammenligner med andre skip' },
      { milestone: 'Eventyrfortelling med spenningskurve og perspektivskift', howWeAddress: 'Piratfortelling-maler med spenningskurve der elevene skriver eventyr med perspektivskift og dialog' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk divisjon uten rest med sm\u00e5 tall, enkle rutenett (5\u00d75), og fortellingsmaler med setningsstartere. For avanserte elever i 3. klasse legges til divisjon med rest og konteksttolkning, koordinatsystem med fire kvadranter, br\u00f8ksammenligning med ulike nevnere, og fri eventyrskriving med flere perspektiver og integrerte matteutfordringer.',
    parentTakeaway: 'Lek pirat med matematikk: \u00ab97 gullmynter til 8 pirater \u2014 hvor mange f\u00e5r hver, og hva gj\u00f8r vi med resten?\u00bb Tegn et skattkart p\u00e5 rutepapir og gi koordinatinstruksjoner. Del opp en \u00ablast\u00bb (godteri): \u00abto femtedeler er sjokolade, tre femtedeler er drops.\u00bb La barnet skrive en piratfortelling med spenning og dialog. Pirater gj\u00f8r matematikk og skriving til eventyr.',
    classroomIntegration: 'Pirattemaet i 3. klasse brukes som temauke eller prosjekt: matematikktimen med divisjon, koordinater og br\u00f8ker, norsktimen med eventyrskriving og spenningsoppbygging, samfunnsfag med sj\u00f8fartshistorie og handel. Et klasse-piratspill med matteutfordringer og fortellingsstasjoner forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for divisjon, koordinater og kreativ skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Divisjon med rest (skattkontekst)', emerging: 'fordeler skatt i like deler uten rest med sm\u00e5 tall og st\u00f8tte', proficient: 'l\u00f8ser selvstendig divisjon med rest innenfor 100, tolker resten i kontekst og verifiserer', advanced: 'formulerer egne fordelingsproblemer med rest, begrunner tolkninger og l\u00f8ser flertrinnsproblemer' },
      { skill: 'Koordinatsystem med skattkart', emerging: 'finner punkter i et enkelt rutenett (5\u00d75) med st\u00f8tte', proficient: 'plotter selvstendig punkter i koordinatsystem, f\u00f8lger instruksjoner og tegner ruter', advanced: 'arbeider i fire kvadranter, beregner avstander mellom punkter og lager egne skattkartoppgaver' },
      { skill: 'Eventyrfortelling med spenningskurve', emerging: 'skriver en kort fortelling med begynnelse, midtdel og slutt med st\u00f8tte', proficient: 'skriver selvstendig en eventyrfortelling med spenningskurve, dialog og perspektivskift', advanced: 'skriver en detaljert fortelling med flere perspektiver, indre konflikter og overraskende vendepunkter' },
    ],
  },

  robots: {
    snippetAnswer: 'Robot-oppgaver for 3. klasse (8\u20139 \u00e5r) trener algoritmisk tenkning med flertrinnsprogrammering, multiplikasjon med sensordata, br\u00f8ker med batterikapasitet og selvstendig skriving av tekniske instruksjoner med presist spr\u00e5k og logisk struktur. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir robottemaet et avansert logikk- og teknologiprosjekt \u2014 \u00e5tte- og ni\u00e5ringer designer flertrinnsprogrammer med betingelser og l\u00f8kker (gjenta 5 ganger: g\u00e5 frem 3 steg, sving h\u00f8yre), beregner sensordata med multiplikasjon (8 sensorer \u00d7 12 m\u00e5linger per minutt = 96 datapunkter), og bruker br\u00f8ker til batterikapasitet (tre \u00e5ttendedeler av batteriet brukt \u2014 hvor mye gjenst\u00e5r?). Koordinatsystemer styrer robotnavigasjon. Divisjon beregner effektivitet (120 oppgaver p\u00e5 8 timer = 15 per time). Tekniske instruksjoner med presist spr\u00e5k og logisk sekvens trener presisjonsskriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for algoritmisk tenkning, multiplikasjon og sakprosaskriving i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnsprogrammering med betingelser og l\u00f8kker (8\u20139-\u00e5ringer tenker algoritmisk)', howWeAddress: 'Robot-programmeringsark der elevene skriver flertrinnsprogrammer med betingelser (hvis vegg, sving) og l\u00f8kker' },
      { milestone: 'Multiplikasjon med sensordata (datapunkter per tidsenhet)', howWeAddress: 'Sensordata-beregningsark der elevene multipliserer sensorer, m\u00e5linger og tidsperioder' },
      { milestone: 'Br\u00f8ker med batterikapasitet (gjenst\u00e5ende og brukt andel)', howWeAddress: 'Batteri-br\u00f8kark der elevene beregner gjenst\u00e5ende kapasitet og planlegger ladestrategier' },
      { milestone: 'Teknisk instruksjonsskriving med presisjonspr\u00e5k', howWeAddress: 'Instruksjonsskriving-ark der elevene formulerer presise, nummererte instruksjoner for robotoppgaver' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle sekvenser uten betingelser, multiplikasjon i 2- og 5-gangen, og instruksjonsmaler med ordbank. For avanserte elever i 3. klasse legges til nestede l\u00f8kker med variabler, flertrinnsmultiplikasjon med effektivitetsberegning, og selvstendig teknisk manual med feilh\u00e5ndtering og flytskjema.',
    parentTakeaway: 'Lek robot hjemme: gi barnet presise instruksjoner for \u00e5 g\u00e5 fra kj\u00f8kkenet til stuen \u2014 \u00abhvor mange steg trengs? Gjenta 3 ganger: 4 steg frem, sving venstre.\u00bb Beregn: \u00abroboten bruker tre \u00e5ttendedeler av batteriet \u2014 hvor mye er igjen?\u00bb La barnet skrive instruksjoner for en daglig rutine som en robotprogrammer. Robottenkning er fremtidens kompetanse.',
    classroomIntegration: 'Robottemaet i 3. klasse integrerer teknologi og matematikk: matematikktimen med multiplikasjon, br\u00f8ker og koordinater, teknologitimen med programmering og algoritmisk tenkning, norsktimen med instruksjonsskriving og teknisk spr\u00e5k. Et klasserobotprosjekt med programmering og presentasjon forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for algoritmisk tenkning, multiplikasjon og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Algoritmisk tenkning med betingelser og l\u00f8kker', emerging: 'f\u00f8lger en tretrinnsinstruksjon og skriver en enkel sekvens med st\u00f8tte', proficient: 'designer selvstendig programmer med betingelser og l\u00f8kker og foruts\u00e5r resultatet', advanced: 'designer programmer med nestede l\u00f8kker, optimerer koden og forklarer logikken skriftlig' },
      { skill: 'Multiplikasjon med sensordata', emerging: 'multipliserer i 2- og 5-gangen med sensorbilder som st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjon med sensordata innenfor 100 og beregner totale datapunkter', advanced: 'l\u00f8ser flertrinnsproblemer med sensorer, tid og effektivitet, formulerer egne oppgaver' },
      { skill: 'Teknisk instruksjonsskriving', emerging: 'skriver 3\u20134 nummererte instruksjoner med enkelt spr\u00e5k', proficient: 'skriver selvstendig presise flertrinnsinstruksjoner med betingelser og logisk rekkef\u00f8lge', advanced: 'skriver en teknisk manual med feilh\u00e5ndtering, flytskjema og presisjonspr\u00e5k' },
    ],
  },

  school: {
    snippetAnswer: 'Skole-oppgaver for 3. klasse (8\u20139 \u00e5r) trener flertrinnstekstoppgaver med timeplan og organisering, br\u00f8ker med fagfordeling, multiplikasjon med skolestatistikk og selvstendig skriving av argumenterende tekster om skolehverdagen med faktagrunnlag. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir skoletemaet et avansert organisasjons- og statistikkprosjekt \u2014 \u00e5tte- og ni\u00e5ringer l\u00f8ser flertrinnstekstoppgaver med timeplaner (6 timer per dag \u00d7 5 dager = 30 timer, minus 3 timer gym = andel fagtimer?), beregner br\u00f8ker med fagfordeling (to sjettedeler av ukens timer er matematikk), og bruker multiplikasjon til skolestatistikk (24 elever \u00d7 8 klasser = 192 elever p\u00e5 trinnet). Divisjon fordeler materiell likt. Linjediagrammer viser skoleprestasjon over tid. Argumenterende tekster om skolehverdagen (l\u00e4ngre friminutt, flere kunsttimer) trener demokratisk deltakelse. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, data og demokratisk deltakelse i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnstekstoppgaver med tidsplanlegging (8\u20139-\u00e5ringer kombinerer tid og aritmetikk)', howWeAddress: 'Timeplan-beregningsark der elevene beregner fagtimer, friminutt og total skoletid med flere operasjoner' },
      { milestone: 'Br\u00f8ker med fagfordeling (ukentlige timer fordelt p\u00e5 fag)', howWeAddress: 'Fagfordelings-br\u00f8kark der elevene beregner andelen av uken som g\u00e5r til hvert fag' },
      { milestone: 'Multiplikasjon med skolestatistikk (elever, klasser, trinn)', howWeAddress: 'Skolestatistikk-ark der elevene multipliserer og sammenligner data p\u00e5 tvers av klasser og trinn' },
      { milestone: 'Argumenterende tekst om skolehverdagen med faktagrunnlag', howWeAddress: 'Debattskriving-ark der elevene bruker skoledata til \u00e5 argumentere for forbedringer med p\u00e5stand og bevis' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle timeplaner med hele timer, halvdeler i fagfordeling, og argumentmaler med setningsstartere. For avanserte elever i 3. klasse legges til tretrinnsproblemer med minutter, br\u00f8k- og prosentberegning av fagfordeling, og selvstendig debattinnlegg med statistisk analyse og forslag til elevr\u00e5det.',
    parentTakeaway: 'Utforsk skoledagen med matematikk: \u00abhvor stor andel av uken bruker du p\u00e5 matematikk? P\u00e5 gym?\u00bb Beregn: \u00ab6 timer per dag \u00d7 5 dager \u2014 hvor mange skoletimer per uke?\u00bb La barnet lage et s\u00f8ylediagram over favorittpenger. Skriv sammen et argument for lengre friminutt med fakta. Skolematematikk l\u00e6rer barnet at tall kan brukes til \u00e5 forandre verden.',
    classroomIntegration: 'Skoletemaet i 3. klasse brukes som demokrati- og organisasjonsprosjekt: matematikktimen med timeplanberegning, br\u00f8ker og statistikk, norsktimen med argumenterende tekster og debattinnlegg, samfunnsfag med elevr\u00e5d og demokratisk deltakelse. Et klasseforbedringsprosjekt med datainnsamling og presentasjon forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for data, argumentasjon og demokrati st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Flertrinnstekstoppgaver med timeplan', emerging: 'l\u00f8ser totrinnsproblemer med hele timer og st\u00f8tte', proficient: 'l\u00f8ser selvstendig tretrinnsproblemer med timer og minutter og viser mellomregninger', advanced: 'formulerer egne timeplanproblemer, sammenligner skolesystemer og verifiserer systematisk' },
      { skill: 'Br\u00f8ker med fagfordeling', emerging: 'finner halvdeler og fjerdedeler av ukens timer med konkreter', proficient: 'beregner selvstendig sjettedeler og \u00e5ttendedeler av fagfordelingen og sammenligner fag', advanced: 'konverterer mellom br\u00f8k og prosent, analyserer fagfordeling p\u00e5 tvers av skoler' },
      { skill: 'Argumenterende tekst om skolehverdagen', emerging: 'skriver 3\u20134 setninger med p\u00e5stand og enkel begrunnelse', proficient: 'skriver selvstendig en argumenterende tekst med faktagrunnlag, begrunnelse og motargument', advanced: 'skriver et nyansert debattinnlegg med statistisk analyse, flere perspektiver og overbevisende konklusjon' },
    ],
  },

  seasons: {
    snippetAnswer: '\u00c5rstid-oppgaver for 3. klasse (8\u20139 \u00e5r) trener linjediagrammer med temperatur- og dagslysdata, br\u00f8ker med sesongfordeling, multiplikasjon med fenologiske observasjoner og selvstendig skriving av sammenlignende forskningsrapporter om \u00e5rstider med dataanalyse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir \u00e5rstidtemaet et avansert datatolk- og forskningsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer tegner linjediagrammer med temperaturdata over 12 m\u00e5neder og analyserer sesongvariasjoner. Br\u00f8ker beskriver \u00e5rsfordeling (en fjerdedel av \u00e5ret er vinter, men dagslysbr\u00f8ken varierer). Multiplikasjon beregner fenologiske data (15 trekkfuglarter \u00d7 6 individer per art). M\u00e5lekonvertering mellom timer og minutter brukes til dagslysberegning. Areal av sesongaktiviteter beregnes i m\u00b2. Sammenlignende forskningsrapporter analyserer to \u00e5rstider med data, diagrammer og konklusjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for data, naturfag og sammenlignende analyse i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Linjediagrammer med temperaturdata over \u00e5ret (8\u20139-\u00e5ringer analyserer \u00e5rsvariasjoner)', howWeAddress: 'Temperatur-linjediagramark der elevene plotter m\u00e5nedsdata, identifiserer trender og forklarer sesonger' },
      { milestone: 'Br\u00f8ker med \u00e5rstidsfordeling (varierende andeler av dagslys og m\u00f8rke)', howWeAddress: '\u00c5rstids-br\u00f8kark der elevene beregner dagslysandeler per sesong og sammenligner geografiske variasjoner' },
      { milestone: 'Multiplikasjon med fenologiske data (arter \u00d7 individer)', howWeAddress: 'Fenologi-beregningsark der elevene multipliserer arter og individer for \u00e5 beregne sesongbestander' },
      { milestone: 'Sammenlignende forskningsrapport om to \u00e5rstider med dataanalyse', howWeAddress: 'Sammenlignende rapportmaler der elevene analyserer to \u00e5rstider med temperaturdata, fenologi og diagrammer' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk s\u00f8ylediagrammer med fire sesonger, halvdeler og fjerdedeler, og rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til doble linjediagrammer med nedb\u00f8rskorrelasjon, br\u00f8ksammenligning mellom geografiske soner, og selvstendig forskningsrapport med statistikk og klimaperspektiv.',
    parentTakeaway: 'F\u00f8r en \u00e5rstidsdagbok: m\u00e5l temperaturen daglig og tegn et linjediagram over m\u00e5neden. Beregn dagslys: \u00abhvor stor br\u00f8kdel av d\u00f8gnet er det lyst i desember vs. juni?\u00bb Tell v\u00e5rtegn: \u00ab8 krokusplanter \u00d7 5 blomster per plante.\u00bb La barnet skrive en rapport som sammenligner v\u00e5r og h\u00f8st. \u00c5rstidsmatematikk er norsk naturvitenskap p\u00e5 sitt beste.',
    classroomIntegration: '\u00c5rstidtemaet i 3. klasse kj\u00f8rer som \u00e5rsprosjekt: naturfagstimen med fenologi og \u00f8kosystemer, matematikktimen med linjediagrammer, br\u00f8ker og multiplikasjon, norsktimen med forskningsrapporter og sammenlignende analyse. Et klasse\u00e5rshjul med m\u00e5nedlige observasjoner og data forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for data, naturfag og rapportering st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Linjediagrammer med temperaturdata', emerging: 'avleser et enkelt s\u00f8ylediagram med fire sesonger og besvarer sp\u00f8rsm\u00e5l', proficient: 'oppretter og fortolker selvstendig linjediagrammer over 12 m\u00e5neder og beskriver trender', advanced: 'sammenligner linjediagrammer med nedb\u00f8rsdata, analyserer korrelasjon og foresl\u00e5r forklaringer' },
      { skill: 'Br\u00f8ker med \u00e5rstidsfordeling', emerging: 'identifiserer fjerdedeler av \u00e5ret som sesonger med konkreter', proficient: 'beregner selvstendig dagslys- og m\u00f8rkebr\u00f8ker for hver sesong og sammenligner', advanced: 'sammenligner \u00e5rstidsbr\u00f8ker mellom geografiske soner, konverterer til prosent og analyserer m\u00f8nstre' },
      { skill: 'Sammenlignende \u00e5rstidsrapport', emerging: 'skriver en rapport om \u00e9n sesong med observasjoner og bildest\u00f8tte', proficient: 'skriver selvstendig en sammenlignende rapport om to \u00e5rstider med data og diagrammer', advanced: 'skriver en detaljert rapport med klimadata, statistisk analyse og perspektiv p\u00e5 klimaendringer' },
    ],
  },

  shapes: {
    snippetAnswer: 'Form-oppgaver for 3. klasse (8\u20139 \u00e5r) trener areal og omkrets av sammensatte figurer, br\u00f8ker med geometrisk inndeling, symmetrianalyse med rotasjon og selvstendig skriving av geometriske forklaringer med presisjonspr\u00e5k og bevisf\u00f8ring. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse utvides formtemaet til avansert geometrisk analyse \u2014 \u00e5tte- og ni\u00e5ringer beregner areal og omkrets av rektangler og sammensatte figurer (L-former, T-former), arbeider med br\u00f8ker gjennom geometrisk inndeling (del et rektangel i \u00e5ttendedeler \u2014 fargelegg tre \u00e5ttendedeler), og analyserer symmetri med b\u00e5de speilsymmetri og rotasjonssymmetri. Multiplikasjon med rutenettareal (lengde \u00d7 bredde) kobler geometri til aritmetikk. Vinkler identifiseres som rette, spisse og stumpe. Klassifikasjon av trekanter og firkanter etter egenskaper trener logisk tenkning. Geometriske forklaringer med presisjonspr\u00e5k og bevisf\u00f8ring trener matematisk kommunikasjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for geometri, m\u00e5ling og matematisk argumentasjon i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Areal og omkrets av sammensatte figurer (8\u20139-\u00e5ringer dekomponerer komplekse former)', howWeAddress: 'Sammensatt figur-ark der elevene deler L- og T-former i rektangler og beregner total areal og omkrets' },
      { milestone: 'Br\u00f8ker gjennom geometrisk inndeling (flatedeler av figurer)', howWeAddress: 'Geometrisk br\u00f8kark der elevene deler figurer i like deler, fargelegger br\u00f8kandeler og sammenligner' },
      { milestone: 'Symmetrianalyse med speil- og rotasjonssymmetri', howWeAddress: 'Symmetri-analysark der elevene identifiserer symmetrilinjer, tester rotasjonssymmetri og klassifiserer figurer' },
      { milestone: 'Geometrisk forklaring med presisjonspr\u00e5k og bevisf\u00f8ring', howWeAddress: 'Geometri-skriveark der elevene forklarer l\u00f8sningsmetoder med korrekte fagtermer og begrunner trinn for trinn' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, arbeid med enkle rektanglers areal og omkrets, halvdeler og fjerdedeler i forminndelingen, og speilsymmetri kun. For avanserte elever i 3. klasse legges til sammensatte figurer med tre+ deler, \u00e5ttendedelsinndelinger med br\u00f8ksammenligning, rotasjonssymmetri med gradangivelse, og selvstendig geometrisk bevisf\u00f8ring.',
    parentTakeaway: 'M\u00e5l hjemme: \u00abberegn arealet av bordet (lengde \u00d7 bredde) og omkretsen (sum av alle sider).\u00bb Del en pizza i \u00e5ttendedeler og bruk br\u00f8kspr\u00e5k. Finn symmetrilinjer i daglige gjenstander. La barnet forklare skriftlig: \u00abhvorfor er arealet av stuen st\u00f8rre enn soverommet?\u00bb Geometri i 3. klasse handler om \u00e5 se matematikk overalt.',
    classroomIntegration: 'Formtemaet i 3. klasse er kjernestoff i geometriundervisningen: matematikktimen med areal, omkrets og symmetri, kunst- og h\u00e5ndverkstimen med m\u00f8nsterdesign og tesselasjon, norsktimen med geometriske forklaringer og presisjonspr\u00e5k. Et klassearkitekturprosjekt med arealberegning og modellbygging forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for geometri, m\u00e5ling og argumentasjon st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Areal og omkrets av sammensatte figurer', emerging: 'beregner areal og omkrets av et enkelt rektangel med rutenettst\u00f8tte', proficient: 'dekomponerer selvstendig L- og T-former i rektangler og beregner total areal og omkrets', advanced: 'l\u00f8ser komplekse sammensatte figurer med tre+ deler, verifiserer med alternative dekomponeringer' },
      { skill: 'Br\u00f8ker med geometrisk inndeling', emerging: 'identifiserer halvdeler og fjerdedeler i enkle figurer med st\u00f8tte', proficient: 'deler selvstendig figurer i \u00e5ttendedeler, fargelegger br\u00f8kandeler og sammenligner', advanced: 'sammenligner br\u00f8kinndelinger p\u00e5 tvers av figurer, beviser ekvivalens og l\u00f8ser geometriske br\u00f8kproblemer' },
      { skill: 'Geometrisk forklaring med presisjonspr\u00e5k', emerging: 'beskriver former med 3\u20134 setninger og hverdagsspr\u00e5k', proficient: 'forklarer selvstendig l\u00f8sninger med geometriske fagtermer og trinnvis begrunnelse', advanced: 'skriver en geometrisk bevisf\u00f8ring med definisjoner, logiske steg og konklusjon' },
    ],
  },

  space: {
    snippetAnswer: 'Verdensrom-oppgaver for 3. klasse (8\u20139 \u00e5r) trener store tall med planetavstander, multiplikasjon med baneperioder, br\u00f8ker med solsystemfordeling og selvstendig skriving av astronomiske forskningsrapporter med kildehenvisning og dataanalyse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir romtemaet et avansert tall- og forskningsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer arbeider med store tall i planetavstander (Jorden til Solen: 150 millioner km), bruker multiplikasjon til baneberegninger (Jorden g\u00e5r rundt Solen p\u00e5 365 dager \u2014 Mars bruker nesten dobbelt s\u00e5 lang tid), og analyserer solsystemet med br\u00f8ker (fire \u00e5ttendedeler av planetene er gassplaneter). M\u00e5lekonvertering mellom km og millioner km utvider tallforst\u00e5elsen. Linjediagrammer viser temperaturdata for planeter. Astronomiske forskningsrapporter med kilder, datadiagrammer og konklusjon trener vitenskapelig formidling. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for store tall, data og vitenskapelig rapportering i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Store tall med planetavstander (8\u20139-\u00e5ringer utvider tallforst\u00e5elsen til millioner)', howWeAddress: 'Planetavstands-ark der elevene sammenligner, ordner og avrunder store tall med romkontekst' },
      { milestone: 'Multiplikasjon med baneperioder og romdata (skalering og sammenligning)', howWeAddress: 'Baneberegnings-ark der elevene multipliserer og sammenligner planetdata i tabeller' },
      { milestone: 'Br\u00f8ker med solsystemfordeling (typer planeter og m\u00e5ner)', howWeAddress: 'Solsystem-br\u00f8kark der elevene beregner andeler av steinplaneter, gassplaneter og dverplaneter' },
      { milestone: 'Astronomisk forskningsrapport med kilder og dataanalyse', howWeAddress: 'Forskningsrapport-maler for romtemaer med krav om planetdata, diagrammer og kildehenvisninger' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, arbeid med tall innenfor 10 000, bruk halvdeler og fjerdedeler i planetfordeling, og tilby rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til millioner og milliarder med vitenskapelig notasjon, br\u00f8ksammenligning mellom planetsystemer, og selvstendig forskningsrapport med statistikk og perspektivering.',
    parentTakeaway: 'Utforsk verdensrommet med tall: \u00abhvor langt er det til Solen? Til Mars? Sammenlign med avstander p\u00e5 Jorden.\u00bb Bruk br\u00f8ker: \u00abfire \u00e5ttendedeler av planetene er gassplaneter \u2014 hvilke?\u00bb Lag et temperaturdiagram for planetene. La barnet skrive en forskningsrapport om en favorittplanet. Rommatematikk \u00e5pner barnets perspektiv til det uendelige.',
    classroomIntegration: 'Romtemaet i 3. klasse er et tverrfaglig forskningsprosjekt: naturfagstimen med solsystemet og astronomi, matematikktimen med store tall, multiplikasjon og br\u00f8ker, norsktimen med forskningsrapporter og vitenskapelig formidling. Et klassesolsystem-prosjekt med skalamodell og datapresentasjon forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tall, data og naturfag st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Store tall med planetavstander', emerging: 'leser og sammenligner tall innenfor 10 000 med rombilder som st\u00f8tte', proficient: 'arbeider selvstendig med tall i millioner, ordner planetavstander og avrunder korrekt', advanced: 'forklarer st\u00f8rrelsesforhold med skalamodeller, konverterer mellom enheter og estimerer avstander' },
      { skill: 'Multiplikasjon med romdata', emerging: 'multipliserer enkle planetverdier i 2- og 5-gangen med st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjon med planetdata, sammenligner resultater og verifiserer', advanced: 'l\u00f8ser flertrinnsproblemer med baneperioder og avstander, formulerer egne romoppgaver' },
      { skill: 'Astronomisk forskningsrapport', emerging: 'skriver en faktaside om \u00e9n planet med bildest\u00f8tte', proficient: 'skriver selvstendig en forskningsrapport med data, diagram, kilder og konklusjon', advanced: 'skriver en detaljert rapport med sammenligning av planeter, statistisk analyse og perspektivering' },
    ],
  },

  sports: {
    snippetAnswer: 'Sport-oppgaver for 3. klasse (8\u20139 \u00e5r) trener statistikk med idrettsdata, multiplikasjon med poengsystemer, br\u00f8ker med kamptid og selvstendig skriving av sportsanalyser med diagrammer, sammenligning og argumentasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir sportstemaet et avansert statistikk- og analyseprosjekt \u2014 \u00e5tte- og ni\u00e5ringer beregner idrettsstatistikk med gjennomsnitt (48 poeng p\u00e5 8 kamper = 6 poeng per kamp), bruker multiplikasjon med poengsystemer (3 poeng per seier \u00d7 7 seiere = 21 poeng), og analyserer kamptid med br\u00f8ker (tre fjerdedeler av kampen spilt). Linjediagrammer viser lagprestasjon over en sesong. M\u00e5lekonvertering mellom sekunder, minutter og timer brukes til sportsrekorder. Divisjon med rest fordeler lag (25 elever i lag p\u00e5 6). Sportsanalyser med data, diagrammer og argumentasjon trener kritisk tenkning. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for statistikk, multiplikasjon og sakprosaskriving i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Gjennomsnittsberegning med idrettsdata (8\u20139-\u00e5ringer bruker divisjon til gjennomsnitt)', howWeAddress: 'Idrettsstatistikk-ark der elevene beregner gjennomsnittlig poengsum, m\u00e5l eller tid per kamp' },
      { milestone: 'Multiplikasjon med poengsystemer (seiere, uavgjort, tap \u00d7 poengverdi)', howWeAddress: 'Tabellberegnings-ark der elevene multipliserer kampresultater med poengverdier og rangerer lag' },
      { milestone: 'Br\u00f8ker med kamptid og sesonginndeling (tidsandeler)', howWeAddress: 'Kamptids-br\u00f8kark der elevene beregner spilt tid, gjenv\u00e6rende tid og pauser som br\u00f8ker' },
      { milestone: 'Sportsanalyse med data, diagrammer og argumentasjon', howWeAddress: 'Analyse-maler der elevene skriver sportsrapporter med statistikk, linjediagrammer og begrunnede sp\u00e5dommer' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle gjennomsnitt med sm\u00e5 tall, multiplikasjon i 2- og 3-gangen, og analysemaler med ordbank. For avanserte elever i 3. klasse legges til sammensatte gjennomsnitt med vekting, flertrinnstabellberegning med avanserte poengsystemer, og selvstendig sportsanalyse med statistisk sammenligning og prediksjoner.',
    parentTakeaway: 'Bruk sport som matematikk: \u00abbarnet ditt scoret 4, 6, 3, 7 m\u00e5l p\u00e5 fire kamper \u2014 hva er gjennomsnittet?\u00bb Beregn tabeller: \u00ab3 poeng per seier \u00d7 5 seiere + 1 poeng per uavgjort \u00d7 3.\u00bb Bruk br\u00f8ker: \u00abtre fjerdedeler av kampen er spilt.\u00bb La barnet skrive en analyse av favoritlaget. Sportsmatematikk gj\u00f8r statistikk engasjerende.',
    classroomIntegration: 'Sportstemaet i 3. klasse brukes som statistikk- og helseprosjekt: matematikktimen med gjennomsnitt, multiplikasjon og linjediagrammer, norsktimen med sportsanalyser og argumentasjon, kropps\u00f8ving med datainnsamling og m\u00e5ling. Et klasseturnering-prosjekt med statistikkf\u00f8ring og rapportskriving forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for statistikk, multiplikasjon og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Gjennomsnittsberegning med sportsdata', emerging: 'beregner gjennomsnitt av 2\u20133 sm\u00e5 tall med st\u00f8tte', proficient: 'beregner selvstendig gjennomsnitt av 4\u20136 verdier, tolker resultatet i sportskontekst', advanced: 'beregner sammensatte gjennomsnitt, sammenligner spillerstatistikk og foresl\u00e5r forklaringer' },
      { skill: 'Multiplikasjon med poengsystemer', emerging: 'multipliserer i 2- og 3-gangen med enkle kampresultater', proficient: 'beregner selvstendig tabellpoeng med flere operasjoner og rangerer lag korrekt', advanced: 'l\u00f8ser flertrinnsproblemer med avanserte poengsystemer, formulerer egne turneringsscenarier' },
      { skill: 'Sportsanalyse med argumentasjon', emerging: 'skriver 3\u20134 setninger om et lagresultat med enkle data', proficient: 'skriver selvstendig en sportsanalyse med data, diagram og begrunnede sp\u00e5dommer', advanced: 'skriver en detaljert analyse med statistisk sammenligning, trendidentifikasjon og argumentert prediksjon' },
    ],
  },

  spring: {
    snippetAnswer: 'V\u00e5r-oppgaver for 3. klasse (8\u20139 \u00e5r) trener linjediagrammer med v\u00e5rtemperaturer, multiplikasjon med v\u00e5rblomstring og fugleankomst, br\u00f8ker med dagslys\u00f8kning og selvstendig skriving av fenologiske forskningsrapporter med observasjoner og dataanalyse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir v\u00e5rtemaet et vitenskapelig observasjonsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer registrerer v\u00e5rtemperaturer i linjediagrammer over uker og analyserer oppvarmingstrenden. Multiplikasjon beregner v\u00e5rfenomener (14 krokusplanter \u00d7 6 blomster = 84 blomster). Br\u00f8ker beskriver dagslys\u00f8kning (dagslyset \u00f8ker fra en tredjedel til to tredjedeler av d\u00f8gnet). M\u00e5lekonvertering mellom cm og m brukes til plantem\u00e5ling. Divisjon beregner gjennomsnittlig temperatur\u00f8kning. Fenologiske forskningsrapporter med hypotese, observasjoner og konklusjon trener vitenskapelig metode i norsk naturkontekst. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, data og rapportering i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Linjediagrammer med v\u00e5rtemperaturer (8\u20139-\u00e5ringer analyserer oppvarmingstrend)', howWeAddress: 'V\u00e5rtemperatur-diagramark der elevene plotter ukentlige temperaturer og analyserer trenden' },
      { milestone: 'Multiplikasjon med v\u00e5rblomstring og fugleankomst (sesongdata)', howWeAddress: 'V\u00e5rtegn-beregningsark der elevene multipliserer planter, blomster og fuglearter' },
      { milestone: 'Br\u00f8ker med dagslys\u00f8kning (andel av d\u00f8gnet som er lyst)', howWeAddress: 'Dagslys-br\u00f8kark der elevene beregner lysandelen for ulike uker i v\u00e5ren og sammenligner' },
      { milestone: 'Fenologisk forskningsrapport med observasjoner og dataanalyse', howWeAddress: 'Forskningsrapport-maler for v\u00e5robservasjoner med hypotese, ukentlige data og konklusjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk s\u00f8ylediagrammer med fire datapunkter, multiplikasjon i 2- og 5-gangen, og rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til doble linjediagrammer med temperatur og nedb\u00f8r, flertrinnsmultiplikasjon med artsberegning, og selvstendig rapport med statistisk analyse og klimaperspektiv.',
    parentTakeaway: 'F\u00f8r en v\u00e5rdagbok: m\u00e5l temperaturen hver morgen og tegn et linjediagram. Tell v\u00e5rblomster: \u00ab9 tulipaner \u00d7 4 kronblader per tulipan.\u00bb Beregn dagslys: \u00abhvor stor del av d\u00f8gnet er det lyst i april vs. mars?\u00bb La barnet skrive en forskningsrapport om v\u00e5ren i hagen. V\u00e5rmatematikk er norsk naturobservasjon med tall.',
    classroomIntegration: 'V\u00e5rtemaet i 3. klasse brukes som fenologiprosjekt: naturfagstimen med v\u00e5rtegn, planteliv og fugletrekk, matematikktimen med linjediagrammer, multiplikasjon og br\u00f8ker, norsktimen med forskningsrapporter og vitenskapelig skriving. En klasse-v\u00e5rdagbok med ukentlige observasjoner og data forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, data og rapportering st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Linjediagrammer med v\u00e5rtemperaturer', emerging: 'avleser et enkelt s\u00f8ylediagram med v\u00e5rdata og besvarer sp\u00f8rsm\u00e5l', proficient: 'oppretter og fortolker selvstendig linjediagrammer over v\u00e5ruker og beskriver oppvarmingstrenden', advanced: 'sammenligner v\u00e5rtemperaturer med nedb\u00f8rsdata, analyserer korrelasjon og foresl\u00e5r forklaringer' },
      { skill: 'Multiplikasjon med v\u00e5rfenomener', emerging: 'multipliserer i 2- og 5-gangen med v\u00e5rbilder som st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjon med v\u00e5rdata innenfor 100 og verifiserer med divisjon', advanced: 'l\u00f8ser flertrinnsproblemer med arter og individer, formulerer egne v\u00e5roppgaver' },
      { skill: 'Fenologisk forskningsrapport', emerging: 'skriver en observasjonsrapport med 3\u20134 v\u00e5rtegn og bildest\u00f8tte', proficient: 'skriver selvstendig en rapport med hypotese, ukentlige observasjoner og konklusjon', advanced: 'skriver en detaljert rapport med statistisk analyse, klimaperspektiv og perspektivering' },
    ],
  },

  summer: {
    snippetAnswer: 'Sommer-oppgaver for 3. klasse (8\u20139 \u00e5r) trener flertrinnstekstoppgaver med ferieplanlegging, br\u00f8ker med sommeraktivitetsfordeling, multiplikasjon med reisedata og selvstendig skriving av reisedagb\u00f8ker med refleksjon og dataintegrasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir sommertemaet et avansert planleggings- og skriveprosjekt \u2014 \u00e5tte- og ni\u00e5ringer l\u00f8ser flertrinnstekstoppgaver med ferieplanlegging (5 dagers ferie, reise kl. 08:30, ankomst 14:15 \u2014 reisetid? Budsjett: 8 000 kr. fordelt p\u00e5 5 dager), beregner br\u00f8ker med aktivitetsfordeling (to femtedeler av feriedagene p\u00e5 stranden, en femtedel p\u00e5 fjelltur), og bruker multiplikasjon til reiseberegning (45 km/t \u00d7 4 timer). Linjediagrammer viser sommertemperaturer over uker. Divisjon fordeler ferieoppgaver likt. Reisedagb\u00f8ker med refleksjon, data og fotografibeskrivelser trener integrert skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, br\u00f8ker og kreativ sakprosa i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnstekstoppgaver med ferieplanlegging (8\u20139-\u00e5ringer kombinerer tid, penger og avstand)', howWeAddress: 'Ferieplanleggings-ark der elevene beregner reisetid, budsjett og aktivitetsfordeling i samme oppgave' },
      { milestone: 'Br\u00f8ker med aktivitetsfordeling (dager fordelt p\u00e5 aktiviteter)', howWeAddress: 'Sommeraktivitets-br\u00f8kark der elevene beregner andelen av ferien brukt p\u00e5 ulike aktiviteter' },
      { milestone: 'Multiplikasjon med reisedata (hastighet \u00d7 tid = avstand)', howWeAddress: 'Reiseberegnings-ark der elevene multipliserer hastighet og tid for ferieturer' },
      { milestone: 'Reisedagbok med refleksjon og dataintegrasjon', howWeAddress: 'Dagbok-maler der elevene skriver daglige innlegg med temperatur, aktiviteter, \u00f8konomi og refleksjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk totrinnsproblemer med hele timer og runde tall, halvdeler og fjerdedeler i aktivitetsfordeling, og dagbokmaler med setningsstartere. For avanserte elever i 3. klasse legges til tretrinnsproblemer med minutterberegning, br\u00f8k- og prosentbudsjetter, og selvstendig reisedagbok med \u00f8konomisk analyse og kulturelle refleksjoner.',
    parentTakeaway: 'Planlegg sommerferien med matematikk: \u00abbudsjett 10 000 kr. fordelt p\u00e5 7 dager \u2014 hvor mye per dag?\u00bb Beregn reisetid: \u00ab350 km med 70 km/t \u2014 hvor lang tid?\u00bb Bruk br\u00f8ker: \u00abtre sjuendedeler av ferien p\u00e5 stranden.\u00bb La barnet f\u00f8re reisedagbok med temperaturer og utgifter. Sommerferie er den mest motiverende matematikken i hele \u00e5ret.',
    classroomIntegration: 'Sommertemaet i 3. klasse brukes som planleggingsprosjekt f\u00f8r ferien: matematikktimen med flertrinnsproblemer, br\u00f8ker og multiplikasjon, norsktimen med reisedagb\u00f8ker og reflekterende skriving, samfunnsfag med geografi og \u00f8konomi. Et klasse-ferieplanlegging-prosjekt med budsjetter og presentasjoner forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, br\u00f8ker og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Flertrinnstekstoppgaver med ferieplanlegging', emerging: 'l\u00f8ser totrinnsproblemer med hele timer og runde bel\u00f8p med st\u00f8tte', proficient: 'l\u00f8ser selvstendig tretrinnsproblemer med tid, penger og avstand og viser mellomregninger', advanced: 'formulerer egne ferieproblemer, optimerer budsjetter og verifiserer med alternative metoder' },
      { skill: 'Br\u00f8ker med aktivitetsfordeling', emerging: 'finner halvdeler og fjerdedeler av feriedager med konkreter', proficient: 'beregner selvstendig femtedeler og sjuendedeler av ferieaktiviteter og sammenligner', advanced: 'konverterer mellom br\u00f8k og prosent, analyserer feriefordeling og argumenterer for valg' },
      { skill: 'Reisedagbok med refleksjon', emerging: 'skriver korte daglige innlegg med enkle fakta og st\u00f8tte', proficient: 'skriver selvstendig daglige innlegg med data, refleksjoner og variert spr\u00e5k', advanced: 'skriver en detaljert reisedagbok med \u00f8konomisk analyse, kulturelle refleksjoner og personlig utvikling' },
    ],
  },

  superheroes: {
    snippetAnswer: 'Superhelt-oppgaver for 3. klasse (8\u20139 \u00e5r) trener multiplikasjon med superkrefter og skalaberegning, br\u00f8ker med oppdragsfordeling, koordinatsystem med bynavigasjon og selvstendig skriving av superheltfortellinger med karakterutvikling og moralsk dilemma. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir superhelttemaet et avansert kreativt matematikkprosjekt \u2014 \u00e5tte- og ni\u00e5ringer bruker multiplikasjon med superkrefter (superhastighet: 8 km \u00d7 12 sekunder = 96 km, superstyrke: l\u00f8fter 9 \u00d7 egen vekt), beregner br\u00f8ker med oppdragsfordeling (tre femtedeler av oppdragene er redningsaksjoner), og navigerer i koordinatsystemer med bykart for \u00e5 lokalisere hendelser. Divisjon fordeler ressurser mellom helter (84 redningsaksjoner fordelt p\u00e5 7 helter). Areal og omkrets beregnes for beskyttelsessoner. Superheltfortellinger med karakterutvikling, moralsk dilemma og overraskende l\u00f8sning trener avansert narrativ skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, koordinater og kreativ skriving i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med superkrefter og skalering (8\u20139-\u00e5ringer bruker store multiplikander)', howWeAddress: 'Superkraft-beregningsark der elevene multipliserer hastigheter, styrker og avstander i heltkontekst' },
      { milestone: 'Br\u00f8ker med oppdragsfordeling (andeler av oppdragstyper)', howWeAddress: 'Oppdragsfordelings-br\u00f8kark der elevene beregner andeler av redning, etterforskning og trening' },
      { milestone: 'Koordinatsystem med bynavigasjon (lokalisering av hendelser)', howWeAddress: 'Bykart-koordinatark der elevene plotter hendelser, planlegger ruter og beregner avstander' },
      { milestone: 'Superheltfortelling med karakterutvikling og moralsk dilemma', howWeAddress: 'Fortelling-maler med karakterbue der elevene skriver historier med indre konflikter og moralske valg' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk multiplikasjon i 2- og 5-gangen med superkraftbilder, halvdeler i oppdragsfordeling, og enkle rutenett (5\u00d75). For avanserte elever i 3. klasse legges til flertrinnsmultiplikasjon med hastighet og tid, br\u00f8ksammenligning mellom helter, fire-kvadrant koordinatsystem, og selvstendig fortelling med flere perspektiver og tematisk dybde.',
    parentTakeaway: 'Lek superhelt med matematikk: \u00absupermarin l\u00f8per 8 km p\u00e5 12 sekunder \u2014 hvor langt p\u00e5 1 minutt?\u00bb Fordel oppdrag: \u00abtre femtedeler er redning \u2014 hvor mange av 15 oppdrag?\u00bb Tegn et bykart p\u00e5 rutepapir og gi koordinatinstruksjoner. La barnet skrive en superheltfortelling med et moralsk dilemma. Superhelter gj\u00f8r matematikk og skriving til eventyr.',
    classroomIntegration: 'Superhelttemaet i 3. klasse brukes som kreativt prosjekt: matematikktimen med multiplikasjon, koordinater og br\u00f8ker, norsktimen med fortelling og karakterutvikling, kunst- og h\u00e5ndverk med superheltdesign. Et klasse-superheltspill med matteutfordringer og fortellerstasjoner forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, koordinater og kreativ skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med superkrefter', emerging: 'multipliserer i 2- og 5-gangen med superkraftbilder som st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjon innenfor 100 med heltkontekst og verifiserer med divisjon', advanced: 'l\u00f8ser flertrinnsproblemer med hastighet, tid og avstand, formulerer egne superkraftoppgaver' },
      { skill: 'Br\u00f8ker med oppdragsfordeling', emerging: 'finner halvdeler og fjerdedeler av oppdrag med konkreter', proficient: 'beregner selvstendig femtedeler og \u00e5ttendedeler av oppdragsfordelingen og sammenligner', advanced: 'sammenligner oppdragsbr\u00f8ker mellom helter, konverterer til prosent og analyserer effektivitet' },
      { skill: 'Superheltfortelling med moralsk dilemma', emerging: 'skriver en kort fortelling med begynnelse, midtdel og slutt', proficient: 'skriver selvstendig en fortelling med karakterutvikling, moralsk dilemma og overraskende l\u00f8sning', advanced: 'skriver en detaljert fortelling med flere perspektiver, indre konflikter og tematisk dybde' },
    ],
  },

  toys: {
    snippetAnswer: 'Leke-oppgaver for 3. klasse (8\u20139 \u00e5r) trener multiplikasjon med lekeregnskap og produksjon, br\u00f8ker med samlingoversikt, flertrinnstekstoppgaver med budsjett og selvstendig skriving av produktbeskrivelser med overbevisende spr\u00e5k og m\u00e5lgruppebevissthet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir leketemaet et avansert \u00f8konomi- og designprosjekt \u2014 \u00e5tte- og ni\u00e5ringer bruker multiplikasjon til produksjonsberegning (en fabrikk lager 24 biler per time \u00d7 8 timer = 192 biler), beregner br\u00f8ker med samlingsoversikt (tre \u00e5ttendedeler av samlingen er byggeklosser, to \u00e5ttendedeler er dukker), og l\u00f8ser flertrinnstekstoppgaver med lekerbudsjetert (spareplan: 50 kr./uke \u00d7 8 uker \u2014 r\u00e5d til 375 kr. + 45 kr. frakt?). Divisjon fordeler leker i like grupper. Areal beregnes for lekeplass. Produktbeskrivelser med overbevisende spr\u00e5k, m\u00e5lgruppebevissthet og prisinformasjon trener markedsf\u00f8ringsskriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, \u00f8konomi og sakprosa i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med produksjonsdata (8\u20139-\u00e5ringer beregner st\u00f8rre produksjonstall)', howWeAddress: 'Lekefabrikk-beregningsark der elevene multipliserer produksjon per time med arbeidstimer og dager' },
      { milestone: 'Br\u00f8ker med samlingsoversikt (andeler av ulike leketyper)', howWeAddress: 'Samlings-br\u00f8kark der elevene beregner andeler av leketyper og sammenligner samlinger' },
      { milestone: 'Flertrinnstekstoppgaver med lekerbudsjettering (sparing og kj\u00f8p)', howWeAddress: 'Budsjetterings-ark der elevene beregner sparetid, totalkostnad med frakt og vekslepenger' },
      { milestone: 'Produktbeskrivelse med overbevisende spr\u00e5k og m\u00e5lgruppe', howWeAddress: 'Produktskriving-maler der elevene formulerer overbevisende beskrivelser med fakta, fordeler og m\u00e5lgruppe' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle produksjonstall med 2- og 5-gangen, halvdeler i samlingsoversikt, og produktmaler med ordbank. For avanserte elever i 3. klasse legges til flertrinnsproduksjon med kvalitetskontroll, br\u00f8k- og prosentberegning av samlinger, og selvstendig markedsf\u00f8ringsplan med prisstrategi og konkurrentanalyse.',
    parentTakeaway: 'Bruk leker som \u00f8konomiprosjekt: \u00abspareplan p\u00e5 50 kr. per uke \u2014 n\u00e5r har du r\u00e5d til Lego til 395 kr.?\u00bb Sorter lekesamlingen: \u00abhvor stor andel er byggeklosser? Dukker? Biler?\u00bb Beregn: \u00aben fabrikk lager 15 biler per time \u00d7 8 timer.\u00bb La barnet skrive en produktbeskrivelse for en oppfunnet leke. Lekermatematikk gj\u00f8r \u00f8konomi konkret.',
    classroomIntegration: 'Leketemaet i 3. klasse brukes som design- og \u00f8konomiprosjekt: matematikktimen med multiplikasjon, br\u00f8ker og budsjetttering, norsktimen med produktbeskrivelser og markedsf\u00f8ringsskriving, kunst- og h\u00e5ndverk med lekedesign. Et klasse-lekemesse-prosjekt med produksjon, prissetting og presentasjon forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, \u00f8konomi og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med produksjonsdata', emerging: 'multipliserer i 2- og 5-gangen med lekebilder som st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjon med produksjonsdata innenfor 100 og verifiserer', advanced: 'l\u00f8ser flertrinnsproduksjonsproblemer med tid og kvalitet, formulerer egne oppgaver' },
      { skill: 'Br\u00f8ker med samlingsoversikt', emerging: 'identifiserer halvdeler og fjerdedeler av en samling med konkreter', proficient: 'beregner selvstendig \u00e5ttendedeler av samlingen, sammenligner samlinger og forklarer', advanced: 'konverterer mellom br\u00f8k og prosent, analyserer samlingssammensetning og argumenterer for valg' },
      { skill: 'Produktbeskrivelse med overbevisende spr\u00e5k', emerging: 'skriver 3\u20134 setninger om en leke med enkle adjektiver', proficient: 'skriver selvstendig en produktbeskrivelse med fordeler, m\u00e5lgruppe og prisinformasjon', advanced: 'skriver en komplett markedsf\u00f8ringstekst med konkurranseanalyse, m\u00e5lgruppebevissthet og overbevisende retorikk' },
    ],
  },

  transportation: {
    snippetAnswer: 'Transport-oppgaver for 3. klasse (8\u20139 \u00e5r) trener multiplikasjon med hastighet og avstand, br\u00f8ker med passasjerfordeling, linjediagrammer med trafikkdata og selvstendig skriving av sammenlignende transportanalyser med milj\u00f8perspektiv. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir transporttemaet et avansert beregnings- og milj\u00f8prosjekt \u2014 \u00e5tte- og ni\u00e5ringer mestrer multiplikasjon med hastighet og avstand (tog: 80 km/t \u00d7 3 timer = 240 km), beregner br\u00f8ker med passasjerfordeling (tre fjerdedeler av bussen er full \u2014 hvor mange tomme seter?), og analyserer trafikkdata i linjediagrammer over ukedager. M\u00e5lekonvertering mellom km, m og cm brukes til kj\u00f8ret\u00f8ydimensjoner. Divisjon beregner gjennomsnittlig drivstofforbruk. Sammenlignende transportanalyser med milj\u00f8perspektiv, data og argumentasjon trener kritisk tenkning. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, data og b\u00e6rekraft i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med hastighet og avstand (8\u20139-\u00e5ringer kobler hastighet \u00d7 tid = distanse)', howWeAddress: 'Reiseavstands-ark der elevene beregner avstander for ulike transportmidler med multiplikasjon' },
      { milestone: 'Br\u00f8ker med passasjerfordeling (kapasitet og belegg)', howWeAddress: 'Passasjer-br\u00f8kark der elevene beregner belegg, tomme plasser og sammenligner transportmidler' },
      { milestone: 'Linjediagrammer med trafikkdata over ukedager', howWeAddress: 'Trafikkdata-diagramark der elevene plotter passasjertall over fem ukedager og analyserer m\u00f8nstre' },
      { milestone: 'Sammenlignende transportanalyse med milj\u00f8perspektiv', howWeAddress: 'Analyse-maler der elevene sammenligner transportmidler med data om tid, kostnad og milj\u00f8p\u00e5virkning' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk runde hastigheter og hele timer, halvdeler i passasjerfordeling, og analysemaler med ordbank. For avanserte elever i 3. klasse legges til tretrinnsproblemer med hastighetsendring, br\u00f8k- og prosentberegning av kapasitet, og selvstendig milj\u00f8analyse med CO2-beregning og b\u00e6rekraftsargumentasjon.',
    parentTakeaway: 'Regn transport i hverdagen: \u00abtoget kj\u00f8rer 80 km/t i 2 timer \u2014 hvor langt?\u00bb Sammenlign: \u00abfly 800 km/t vs. bil 80 km/t \u2014 hvor mange ganger raskere?\u00bb Bruk br\u00f8ker: \u00abtre fjerdedeler av bussen er full \u2014 hvor mange av 48 seter er ledige?\u00bb La barnet skrive en analyse: \u00abhvilket transportmiddel er best for milj\u00f8et?\u00bb Transportmatematikk gir b\u00e6rekraftsperspektiv.',
    classroomIntegration: 'Transporttemaet i 3. klasse brukes som milj\u00f8- og teknologiprosjekt: matematikktimen med multiplikasjon, br\u00f8ker og linjediagrammer, naturfagstimen med milj\u00f8p\u00e5virkning og energi, norsktimen med transportanalyser og argumentasjon. Et klassetransport-prosjekt med data, sammenligning og presentasjon forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, data og b\u00e6rekraft st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med hastighet og avstand', emerging: 'multipliserer runde hastigheter med hele timer med st\u00f8tte', proficient: 'l\u00f8ser selvstendig hastighet \u00d7 tid-problemer innenfor 1000 og sammenligner transportmidler', advanced: 'l\u00f8ser flertrinnsproblemer med hastighetsendring og stopp, formulerer egne reisescenarier' },
      { skill: 'Br\u00f8ker med passasjerfordeling', emerging: 'finner halvdeler og fjerdedeler av passasjerkapasitet med konkreter', proficient: 'beregner selvstendig br\u00f8kandeler av belegg, sammenligner transportmidler og forklarer', advanced: 'konverterer mellom br\u00f8k og prosent, analyserer kapasitetsdata og argumenterer for l\u00f8sninger' },
      { skill: 'Sammenlignende transportanalyse', emerging: 'skriver 3\u20134 setninger som sammenligner to transportmidler med enkle data', proficient: 'skriver selvstendig en analyse med data, milj\u00f8perspektiv og begrunnede anbefalinger', advanced: 'skriver en detaljert analyse med CO2-beregning, kostnadssammenligning og b\u00e6rekraftsargumentasjon' },
    ],
  },

  travel: {
    snippetAnswer: 'Reise-oppgaver for 3. klasse (8\u20139 \u00e5r) trener flertrinnstekstoppgaver med reiseplanlegging, br\u00f8ker med budsjettfordeling, multiplikasjon med valutaberegning og selvstendig skriving av reiseguider med geografisk fakta og kulturelle perspektiver. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir reisetemaet et avansert geografi- og \u00f8konomiprosjekt \u2014 \u00e5tte- og ni\u00e5ringer l\u00f8ser flertrinnstekstoppgaver med reiseplanlegging (fly 2 500 kr. + hotell 800 kr./natt \u00d7 5 netter + mat 300 kr./dag \u00d7 5 dager = totalbudsjett?), beregner br\u00f8ker med budsjettfordeling (to femtedeler til overnatting, en femtedel til mat), og bruker multiplikasjon til enkel valutaberegning (100 NOK = 10 EUR \u2014 500 NOK = ?). M\u00e5lekonvertering mellom km brukes til kartavstander. Linjediagrammer viser reisetemperaturer. Reiseguider med geografisk fakta, kulturelle perspektiver og anbefalinger trener sakprosaskriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, \u00f8konomi og geografi i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnstekstoppgaver med reiseplanlegging (8\u20139-\u00e5ringer kombinerer transport, overnatting og mat)', howWeAddress: 'Reisebudsjett-ark der elevene beregner totalkostnad med fly, hotell og mat over flere dager' },
      { milestone: 'Br\u00f8ker med reisebudsjettfordeling (andeler per post)', howWeAddress: 'Budsjettfordelings-br\u00f8kark der elevene beregner budsjettandeler og sammenligner reisealternativer' },
      { milestone: 'Multiplikasjon med valutaberegning (enkel kursomregning)', howWeAddress: 'Valutaberegnings-ark der elevene multipliserer med enkle vekslingskurser og sammenligner valutaer' },
      { milestone: 'Reiseguide med fakta, kultur og anbefalinger', howWeAddress: 'Reiseguide-maler der elevene skriver informative tekster med fakta, kulturelle perspektiver og personlige anbefalinger' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk totrinnsproblemer med runde priser, halvdeler i budsjettfordeling, og guidemaler med setningsstartere. For avanserte elever i 3. klasse legges til tretrinnsproblemer med valutaomregning og rabatter, br\u00f8k- og prosentbudsjetter, og selvstendig reiseguide med sammenlignende analyse av flere destinasjoner.',
    parentTakeaway: 'Planlegg en dr\u00f8mmereise med matematikk: \u00abhotell 900 kr./natt \u00d7 4 netter + fly 3 000 kr. \u2014 totalbudsjett?\u00bb Beregn valuta: \u00ab100 kr. = 10 euro \u2014 hva koster 500 kr. i euro?\u00bb Fordel budsjettet: \u00abto femtedeler til overnatting.\u00bb La barnet skrive en reiseguide om dr\u00f8mmedestinasjon. Reisematematikk gj\u00f8r geografi og \u00f8konomi levende.',
    classroomIntegration: 'Reisetemaet i 3. klasse brukes som geografi- og \u00f8konomiprosjekt: matematikktimen med flertrinnsproblemer, br\u00f8ker og valutaberegning, norsktimen med reiseguider og sakprosaskriving, samfunnsfag med geografi, kultur og \u00f8konomi. Et klassereisem\u00e5l-prosjekt med planlegging, budsjett og presentasjon forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, \u00f8konomi og geografi st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Flertrinnstekstoppgaver med reiseplanlegging', emerging: 'l\u00f8ser totrinnsproblemer med runde priser og hele dager med st\u00f8tte', proficient: 'l\u00f8ser selvstendig tretrinnsproblemer med transport, overnatting og mat og viser mellomregninger', advanced: 'formulerer egne reiseproblemer med valutaomregning, rabatter og verifiserer systematisk' },
      { skill: 'Br\u00f8ker med reisebudsjettfordeling', emerging: 'finner halvdeler og fjerdedeler av et reisebudsjett med konkreter', proficient: 'beregner selvstendig femtedeler og \u00e5ttendedeler av budsjettpostene og sammenligner', advanced: 'konverterer mellom br\u00f8k og prosent, optimerer budsjetter og argumenterer for prioriteringer' },
      { skill: 'Reiseguide med kulturelle perspektiver', emerging: 'skriver 3\u20134 setninger om en destinasjon med enkle fakta', proficient: 'skriver selvstendig en reiseguide med fakta, kulturelle perspektiver og anbefalinger', advanced: 'skriver en detaljert guide med sammenligning av destinasjoner, \u00f8konomisk analyse og personlig vurdering' },
    ],
  },

  vegetables: {
    snippetAnswer: 'Gr\u00f8nnsak-oppgaver for 3. klasse (8\u20139 \u00e5r) trener multiplikasjon med h\u00f8stberegning og radplanting, br\u00f8ker med n\u00e6ringsinnhold, linjediagrammer med vekstdata og selvstendig skriving av instruksjonstekster om gr\u00f8nnsakdyrking med fagtermer og sesongplanlegging. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir gr\u00f8nnsaktemaet et avansert kjekkenhagetematikk og n\u00e6ringsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer mestrer multiplikasjon med h\u00f8stberegning (8 rader \u00d7 12 gulr\u00f8tter per rad = 96 gulr\u00f8tter), beregner br\u00f8ker med n\u00e6ringsinnhold (tre \u00e5ttendedeler av tallerkenen er gr\u00f8nnsaker), og registrerer vekstdata i linjediagrammer over uker. Areal beregnes for plantekasser og bed (lengde \u00d7 bredde). Divisjon fordeler h\u00f8st i like porsjoner. M\u00e5lekonvertering mellom g, kg og ml brukes til oppskrifter. Instruksjonstekster om s\u00e5ing, stell og h\u00f8sting med sesongkalender og fagtermer trener sakprosaskriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, m\u00e5ling og sakprosa i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med radplanting og h\u00f8stberegning (8\u20139-\u00e5ringer bruker arrays)', howWeAddress: 'Kj\u00f8kkenhagen-beregningsark der elevene multipliserer rader og planter for \u00e5 beregne total h\u00f8st' },
      { milestone: 'Br\u00f8ker med n\u00e6ringsinnhold (andeler p\u00e5 tallerkenen)', howWeAddress: 'N\u00e6rings-br\u00f8kark der elevene beregner gr\u00f8nnsakandelen og sammenligner med kostholdsr\u00e5d' },
      { milestone: 'Linjediagrammer med vekstdata over uker (plantevekst)', howWeAddress: 'Vekstdata-diagramark der elevene m\u00e5ler og plotter planteh\u00f8yde ukentlig og analyserer vekstfaser' },
      { milestone: 'Instruksjonstekst om gr\u00f8nnsakdyrking med fagtermer og sesongplan', howWeAddress: 'Dyrkingsguide-maler der elevene skriver trinnvise instruksjoner med s\u00e5tidspunkt, stell og h\u00f8sttid' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk multiplikasjon i 2- og 5-gangen med planteillustrasjoner, halvdeler i n\u00e6ringsfordeling, og instruksjonsmaler med ordbank. For avanserte elever i 3. klasse legges til flertrinnsh\u00f8stberegning med kvalitetssortering, br\u00f8k- og prosentberegning av n\u00e6ringsstoffer, og selvstendig dyrkingsguide med \u00f8konomisk analyse og b\u00e6rekraftsperspektiv.',
    parentTakeaway: 'Dyrk matematikk i hagen: \u00ab6 rader med 8 gulr\u00f8tter per rad \u2014 hvor mange totalt?\u00bb M\u00e5l plantevekst ukentlig og tegn et linjediagram. Bruk br\u00f8ker p\u00e5 tallerkenen: \u00abtre \u00e5ttendedeler b\u00f8r v\u00e6re gr\u00f8nnsaker.\u00bb La barnet skrive en dyrkingsguide med s\u00e5tider og h\u00f8sttider. Gr\u00f8nnsaksmatematikk er helse og naturfag i \u00e9tt.',
    classroomIntegration: 'Gr\u00f8nnsaktemaet i 3. klasse brukes som kj\u00f8kkenhageprosjekt: naturfagstimen med plantevekst og n\u00e6ring, matematikktimen med multiplikasjon, br\u00f8ker og linjediagrammer, norsktimen med instruksjonstekster og dyrkingsguider. Et klasse-kj\u00f8kkenhagen-prosjekt med s\u00e5ing, m\u00e5ling og h\u00f8sting forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, multiplikasjon og sakprosa st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med radplanting og h\u00f8st', emerging: 'multipliserer i 2- og 5-gangen med plantebilder som st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjon med arrays og beregner total h\u00f8st innenfor 100', advanced: 'l\u00f8ser flertrinnsproblemer med planting, vekst og h\u00f8st, formulerer egne kj\u00f8kkenhageoppgaver' },
      { skill: 'Br\u00f8ker med n\u00e6ringsinnhold', emerging: 'identifiserer halvdeler og fjerdedeler av en tallerken med konkreter', proficient: 'beregner selvstendig \u00e5ttendedeler av n\u00e6ringsfordelingen og sammenligner med anbefalinger', advanced: 'konverterer mellom br\u00f8k og prosent, analyserer kosthold og argumenterer for sunne valg' },
      { skill: 'Instruksjonstekst om gr\u00f8nnsakdyrking', emerging: 'skriver 3\u20134 nummererte trinn med enkelt spr\u00e5k', proficient: 'skriver selvstendig en dyrkingsguide med fagtermer, s\u00e5tider og h\u00f8sttider', advanced: 'skriver en detaljert guide med \u00f8konomisk analyse, sesongkalender og b\u00e6rekraftsperspektiv' },
    ],
  },

  weather: {
    snippetAnswer: 'V\u00e6r-oppgaver for 3. klasse (8\u20139 \u00e5r) trener linjediagrammer med temperatur og nedb\u00f8r, br\u00f8ker med v\u00e6rstatistikk, multiplikasjon med meteorologiske beregninger og selvstendig skriving av v\u00e6rforskningsrapporter med hypotese og dataanalyse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir v\u00e6rtemaet et vitenskapelig langtidsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer registrerer daglige temperatur- og nedb\u00f8rsm\u00e5linger i linjediagrammer over uker og m\u00e5neder og analyserer trender. Br\u00f8ker beskriver v\u00e6rstatistikk (tre femtedeler av dagene i november var regnv\u00e6rsdager). Multiplikasjon beregner nedb\u00f8rsmengder (12 mm/dag \u00d7 5 dager = 60 mm). M\u00e5lekonvertering mellom mm, cm og m brukes til nedb\u00f8r og sn\u00f8dybde. Divisjon beregner gjennomsnittstemperatur. V\u00e6rforskningsrapporter med hypotese, m\u00e5lemetoder, data og konklusjon trener full vitenskapelig metode. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for data, naturfag og vitenskapelig rapportering i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Linjediagrammer med temperatur- og nedb\u00f8rsdata (8\u20139-\u00e5ringer analyserer v\u00e6rtrender)', howWeAddress: 'V\u00e6rstasjons-diagramark der elevene plotter daglige m\u00e5linger og identifiserer m\u00f8nstre over uker' },
      { milestone: 'Br\u00f8ker med v\u00e6rstatistikk (andel regnv\u00e6rsdager, solskinnsdager)', howWeAddress: 'V\u00e6rstatistikk-br\u00f8kark der elevene beregner andeler av v\u00e6rtyper for en m\u00e5ned og sammenligner' },
      { milestone: 'Multiplikasjon med nedb\u00f8rsberegning (mm per dag \u00d7 antall dager)', howWeAddress: 'Nedb\u00f8rs-beregningsark der elevene multipliserer daglig nedb\u00f8r med antall v\u00e6rdager' },
      { milestone: 'V\u00e6rforskningsrapport med hypotese og dataanalyse', howWeAddress: 'Forskningsrapport-maler for v\u00e6rprosjekter med hypotese, m\u00e5lemetode, data og konklusjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk s\u00f8ylediagrammer med ukentlige data, halvdeler i v\u00e6rstatistikk, og rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til doble linjediagrammer med temperatur og nedb\u00f8r, br\u00f8ksammenligning mellom m\u00e5neder, og selvstendig v\u00e6rrapport med klimaperspektiv og statistisk analyse.',
    parentTakeaway: 'Start en v\u00e6rstasjon hjemme: m\u00e5l temperaturen morgen og kveld, registrer nedb\u00f8r, og tegn et linjediagram. Beregn: \u00ab8 mm nedb\u00f8r per dag \u00d7 6 dager.\u00bb Bruk br\u00f8ker: \u00abtre femtedeler av dagene i oktober var regnv\u00e6r.\u00bb La barnet skrive en v\u00e6rforskningsrapport med en hypotese. V\u00e6rmatematikk gj\u00f8r barnet til en minimetorolog.',
    classroomIntegration: 'V\u00e6rtemaet i 3. klasse kj\u00f8rer som \u00e5rsprosjekt: naturfagstimen med v\u00e6rfenomener og klima, matematikktimen med linjediagrammer, br\u00f8ker og multiplikasjon, norsktimen med forskningsrapporter og vitenskapelig skriving. En klasse-v\u00e6rstasjon med daglige m\u00e5linger og m\u00e5nedlige rapporter forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for data, naturfag og rapportering st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Linjediagrammer med v\u00e6rdata', emerging: 'avleser et enkelt s\u00f8ylediagram med v\u00e6rdata og besvarer sp\u00f8rsm\u00e5l', proficient: 'oppretter og fortolker selvstendig linjediagrammer med temperatur og nedb\u00f8r over uker', advanced: 'sammenligner doble linjediagrammer, analyserer korrelasjon mellom temperatur og nedb\u00f8r' },
      { skill: 'Br\u00f8ker med v\u00e6rstatistikk', emerging: 'identifiserer halvdeler av v\u00e6rdager med konkreter', proficient: 'beregner selvstendig br\u00f8kandeler av v\u00e6rtyper for en m\u00e5ned og sammenligner', advanced: 'sammenligner v\u00e6rbr\u00f8ker mellom m\u00e5neder, konverterer til prosent og analyserer klimas\u00f8nstrender' },
      { skill: 'V\u00e6rforskningsrapport', emerging: 'skriver en observasjonsrapport med v\u00e6rdata og bildest\u00f8tte', proficient: 'skriver selvstendig en rapport med hypotese, m\u00e5lemetode, data og konklusjon', advanced: 'skriver en detaljert rapport med statistisk analyse, klimaperspektiv og feilkildevurdering' },
    ],
  },

  winter: {
    snippetAnswer: 'Vinter-oppgaver for 3. klasse (8\u20139 \u00e5r) trener linjediagrammer med temperatur under null, multiplikasjon med vinteraktivitetsdata, br\u00f8ker med dagslysfordeling i m\u00f8rketid og selvstendig skriving av naturforskningsrapporter om vinteroverlevelse med vitenskapelig metode. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir vintertemaet et avansert naturvitenskapelig prosjekt med norsk vinteridentitet \u2014 \u00e5tte- og ni\u00e5ringer arbeider med negative tall i temperaturdiagrammer (minusgrader), tegner linjediagrammer med temperaturer over og under null. Multiplikasjon beregner vinteraktivitetsdata (12 skil\u00f8pere \u00d7 8 runder = 96 runder). Br\u00f8ker beskriver dagslysfordeling i m\u00f8rketid (kun en sjettedel av d\u00f8gnet er lyst i desember). M\u00e5lekonvertering mellom cm og m brukes til sn\u00f8dybde. Divisjon beregner gjennomsnittlig sn\u00f8fall. Naturforskningsrapporter om dyrs vinteroverlevelse med dvale, trekk og tilpasning trener vitenskapelig formidling. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for negative tall, data og naturfag i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Negative tall i temperaturdiagrammer (8\u20139-\u00e5ringer forst\u00e5r minusgrader)', howWeAddress: 'Vintertemperatur-ark der elevene plotter temperaturer over og under null og beregner temperaturforskjeller' },
      { milestone: 'Multiplikasjon med vinteraktivitetsdata (runder, deltakere, utstyr)', howWeAddress: 'Vinteraktivitets-beregningsark der elevene multipliserer deltakere, runder og poeng' },
      { milestone: 'Br\u00f8ker med dagslysfordeling i m\u00f8rketid (minimalt dagslys)', howWeAddress: 'M\u00f8rketids-br\u00f8kark der elevene beregner lysandelen per d\u00f8gn i november, desember og januar' },
      { milestone: 'Naturforskningsrapport om vinteroverlevelse (dvale, trekk, tilpasning)', howWeAddress: 'Forskningsrapport-maler der elevene skriver om dyrs vinterstrategier med observasjoner og kilder' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk temperaturer fra 0 til minus 10 p\u00e5 tallinje, multiplikasjon i 2- og 5-gangen, og rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til temperaturforskjeller mellom byer (Troms\u00f8 vs. Oslo), flertrinnsmultiplikasjon med vinteridrett, og selvstendig rapport med sammenligning av overlevelsesstrategier og statistisk analyse.',
    parentTakeaway: 'Utforsk vinteren med tall: m\u00e5l temperaturen daglig og tegn et linjediagram med plusser og minuser. Beregn: \u00ab\u201312 \u00b0C om morgenen, \u20135 \u00b0C midt p\u00e5 dagen \u2014 hvor mye steg temperaturen?\u00bb Bruk br\u00f8ker: \u00abbare en sjettedel av d\u00f8gnet er lyst i desember.\u00bb La barnet skrive om hvordan ekorn overlever vinteren. Norsk vintermatematikk gir dypforst\u00e5else for v\u00e5r natur.',
    classroomIntegration: 'Vintertemaet i 3. klasse brukes som naturfag- og kulturprosjekt: naturfagstimen med vinteroverlevelse, temperatur og is, matematikktimen med negative tall, linjediagrammer og multiplikasjon, norsktimen med forskningsrapporter og vitenskapelig skriving. Et klassevinterprosjekt med daglige m\u00e5linger og dyreforskningsrapporter forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for negative tall, data og naturfag st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Negative tall i temperaturdiagrammer', emerging: 'leser temperaturer over og under null p\u00e5 termometer med st\u00f8tte', proficient: 'plotter selvstendig temperaturer i linjediagram og beregner temperaturforskjeller over null', advanced: 'sammenligner vintertemperaturer mellom byer, analyserer forskjeller og forklarer geografiske \u00e5rsaker' },
      { skill: 'Multiplikasjon med vinteraktiviteter', emerging: 'multipliserer i 2- og 5-gangen med vinterbilder som st\u00f8tte', proficient: 'l\u00f8ser selvstendig multiplikasjon med vinterdata innenfor 100 og verifiserer med divisjon', advanced: 'l\u00f8ser flertrinnsproblemer med idrettsstatistikk, formulerer egne vinteroppgaver' },
      { skill: 'Naturforskningsrapport om vinteroverlevelse', emerging: 'skriver en beskrivelse av \u00e9tt dyrs vinterstrategi med bildest\u00f8tte', proficient: 'skriver selvstendig en rapport om tre dyrs vinterstrategier med sammenligning og konklusjon', advanced: 'skriver en detaljert rapport med statistikk, \u00f8kologisk perspektiv og kildevurdering' },
    ],
  },

  xmas: {
    snippetAnswer: 'Jule-oppgaver for 3. klasse (8\u20139 \u00e5r) trener flertrinnstekstoppgaver med julebudsjett og gaveplanlegging, br\u00f8ker med adventskalenderfordeling, multiplikasjon med julebakst og selvstendig skriving av juleerindringer med refleksjon og tradisjonsbeskrivelse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir juletemaet et avansert \u00f8konomi- og tradisjonsprosjekt \u2014 \u00e5tte- og ni\u00e5ringer l\u00f8ser flertrinnstekstoppgaver med julebudsjett (gaver: 8 stk. \u00e0 75 kr. + papir: 45 kr. + sjokolade: 120 kr. = totalbudsjett?), beregner br\u00f8ker med adventskalenderfordeling (tolv tjuefjerdedeler av lukene er \u00e5pnet \u2014 hvor mange gjenst\u00e5r?). Multiplikasjon beregner julebakst (3 plater \u00d7 12 kaker per plate \u00d7 4 dager). Divisjon fordeler gaver likt. M\u00e5lekonvertering brukes til bakstoppskrifter (g, kg, dl, l). Juleerindringer med tradisjonsbeskrivelse, sanselige detaljer og refleksjon trener personlig-kulturell skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, br\u00f8ker og kulturformidling i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnstekstoppgaver med julebudsjett (8\u20139-\u00e5ringer planlegger \u00f8konomisk)', howWeAddress: 'Julebudsjett-ark der elevene beregner totalkostnad for gaver, mat og pynt med flere operasjoner' },
      { milestone: 'Br\u00f8ker med adventskalenderfordeling (dager og luker)', howWeAddress: 'Adventskalender-br\u00f8kark der elevene beregner \u00e5pnede og gjenst\u00e5ende luker som br\u00f8ker' },
      { milestone: 'Multiplikasjon med julebakst (plater \u00d7 kaker \u00d7 dager)', howWeAddress: 'Bakst-beregningsark der elevene multipliserer oppskriftsmengder med antall plater og bakedager' },
      { milestone: 'Juleerindring med tradisjonsbeskrivelse og refleksjon', howWeAddress: 'Erindringsskrivings-maler der elevene beskriver juletradisjoner med sanselige detaljer og personlig refleksjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk tre budsjettposter med runde tall, halvdeler i adventsberegning, og erindring-maler med setningsstartere. For avanserte elever i 3. klasse legges til 6+ budsjettposter med rabatter og prosent, br\u00f8ksammenligning mellom adventskalendere, og selvstendig juleerindring med sammenligning av tradisjoner p\u00e5 tvers av kulturer.',
    parentTakeaway: 'Bruk julen som matematikkprosjekt: \u00ab8 gaver \u00e0 75 kr. + innpakning 45 kr. \u2014 hva koster julegavene?\u00bb Tell ned med br\u00f8ker: \u00abni tjuefjerdedeler av adventskalenderen er \u00e5pnet.\u00bb Bak med multiplikasjon: \u00ab3 plater \u00d7 12 pepperkaker.\u00bb La barnet skrive om en juleerindring med lukter, lyder og f\u00f8lelser. Julen er \u00e5rets mest matematiske og kulturelle fest.',
    classroomIntegration: 'Juletemaet i 3. klasse brukes som kultur- og \u00f8konomiprosjekt: matematikktimen med budsjett, br\u00f8ker og multiplikasjon, norsktimen med juleerindringer og tradisjonsbeskrivelser, samfunnsfag med norske og internasjonale juletradisjoner. Et klassejuleverksted med bakst, \u00f8konomi og skriving forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for flertrinnsproblemer, br\u00f8ker og kulturformidling st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Flertrinnstekstoppgaver med julebudsjett', emerging: 'l\u00f8ser totrinnsproblemer med runde julepriser og st\u00f8tte', proficient: 'l\u00f8ser selvstendig tretrinnsproblemer med gaver, mat og pynt og viser mellomregninger', advanced: 'formulerer egne julebudsjettproblemer med rabatter, optimerer \u00f8konomien og verifiserer' },
      { skill: 'Br\u00f8ker med adventskalender', emerging: 'finner halvdelen av adventslukene med konkreter', proficient: 'beregner selvstendig br\u00f8kandeler av \u00e5pnede og gjenst\u00e5ende luker og sammenligner', advanced: 'sammenligner br\u00f8ker for ulike adventsdager, konverterer til prosent og lager egne adventsoppgaver' },
      { skill: 'Juleerindring med tradisjonsbeskrivelse', emerging: 'skriver 3\u20134 setninger om en juletradisjon med enkel beskrivelse', proficient: 'skriver selvstendig en erindring med sanselige detaljer, tradisjonsforklaring og refleksjon', advanced: 'skriver en detaljert erindring med kulturell sammenligning, personlig perspektiv og litterær kvalitet' },
    ],
  },

  zoo: {
    snippetAnswer: 'Dyrehage-oppgaver for 3. klasse (8\u20139 \u00e5r) trener multiplikasjon med innhegningsberegning og bes\u00f8ksstatistikk, br\u00f8ker med dyrefordeling p\u00e5 tvers av avdelinger, linjediagrammer med bes\u00f8ksdata og selvstendig skriving av naturvernrapporter med data og argumentasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 3. klasse blir dyrehagetemaet et avansert statistikk- og naturvernprosjekt \u2014 \u00e5tte- og ni\u00e5ringer mestrer multiplikasjon med innhegningsberegning (areal: 15 m \u00d7 8 m = 120 m\u00b2 per innhegning) og bes\u00f8ksstatistikk (850 bes\u00f8kende per dag \u00d7 7 dager). Br\u00f8ker beskriver dyrefordeling (tre \u00e5ttendedeler av dyrehagens arter er fugler). Linjediagrammer viser m\u00e5nedlige bes\u00f8kstall over et \u00e5r. Divisjon beregner gjennomsnittlig bes\u00f8kstall og f\u00f4rfordeling. M\u00e5lekonvertering mellom kg og tonn brukes til dyrevekter. Naturvernrapporter med truede arter, data og argumentasjon for bevaring trener vitenskapelig og etisk skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for multiplikasjon, statistikk og b\u00e6rekraft i 3. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Multiplikasjon med innhegningsareal og bes\u00f8ksstatistikk (8\u20139-\u00e5ringer arbeider med st\u00f8rre tall)', howWeAddress: 'Innhegnings-arealark der elevene beregner areal, sammenligner dyrebehov og analyserer bes\u00f8kstrender' },
      { milestone: 'Br\u00f8ker med dyrefordeling p\u00e5 tvers av avdelinger (andeler av artsgrupper)', howWeAddress: 'Dyrefordeling-br\u00f8kark der elevene beregner andeler av fugler, pattedyr, reptiler og fisk' },
      { milestone: 'Linjediagrammer med m\u00e5nedlige bes\u00f8kstall (sesongvariasjon)', howWeAddress: 'Bes\u00f8ksdata-diagramark der elevene plotter m\u00e5nedlige tall, identifiserer h\u00f8ysesong og forklarer trender' },
      { milestone: 'Naturvernrapport med truede arter, data og argumentasjon', howWeAddress: 'Naturvernrapport-maler der elevene skriver om truede arter med statistikk, \u00e5rsaker og bevaringstiltak' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk enkle arealberegninger med sm\u00e5 tall, halvdeler i dyrefordeling, og rapportmaler med setningsstartere. For avanserte elever i 3. klasse legges til sammensatte innhegninger med L-form, br\u00f8k- og prosentberegning av artsfordeling, og selvstendig naturvernrapport med internasjonal sammenligning og handlingsplan.',
    parentTakeaway: 'Bes\u00f8k dyrehagen med matematikk: \u00abbberegn arealet av tigerinnhegningen: 18 m \u00d7 12 m.\u00bb Tell arter: \u00abtre \u00e5ttendedeler av dyrene er fugler \u2014 stemmer det?\u00bb Lag et linjediagram over bes\u00f8kstall gjennom \u00e5ret. La barnet skrive en rapport om et truet dyr med forslag til bevaring. Dyrehagematematikk er naturvern og vitenskapelig tenkning.',
    classroomIntegration: 'Dyrehagetemaet i 3. klasse brukes som naturvern- og statistikkprosjekt: naturfagstimen med truede arter og \u00f8kosystemer, matematikktimen med multiplikasjon, br\u00f8ker og linjediagrammer, norsktimen med naturvernrapporter og argumentasjon. Et dyrehagebes\u00f8k med datainnsamling og rapportskriving forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for statistikk, naturfag og b\u00e6rekraft st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Multiplikasjon med innhegningsareal og bes\u00f8k', emerging: 'beregner areal av et enkelt rektangel med sm\u00e5 tall og st\u00f8tte', proficient: 'l\u00f8ser selvstendig arealberegning og bes\u00f8ksstatistikk innenfor 1000 og sammenligner', advanced: 'beregner sammensatte innhegningsareal, analyserer bes\u00f8kstrender og formulerer egne statistikkoppgaver' },
      { skill: 'Br\u00f8ker med dyrefordeling', emerging: 'identifiserer halvdeler og fjerdedeler av dyregrupper med konkreter', proficient: 'beregner selvstendig \u00e5ttendedeler av dyrefordelingen, sammenligner avdelinger og forklarer', advanced: 'konverterer mellom br\u00f8k og prosent, analyserer artsfordeling p\u00e5 tvers av dyrehager' },
      { skill: 'Naturvernrapport med argumentasjon', emerging: 'skriver en beskrivelse av ett truet dyr med enkle fakta', proficient: 'skriver selvstendig en naturvernrapport med data, \u00e5rsaker og bevaringsforslag', advanced: 'skriver en detaljert rapport med internasjonal sammenligning, statistisk analyse og handlingsplan' },
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
