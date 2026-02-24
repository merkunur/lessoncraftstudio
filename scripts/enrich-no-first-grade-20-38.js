#!/usr/bin/env node
/**
 * SEO Part 260: NO First-Grade Enrichment — Themes 20-38
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the first-grade grade block of 19 NO theme files (fruits through space).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  fruits: {
    snippetAnswer: 'Frukt-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon og subtraksjon innenfor 20 med fruktscener, br\u00f8kintroduksjon med halvdeler og fjerdedeler av frukter, og selvstendig skriving av fruktbeskrivelser med sanseadjektiver. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse blir frukttemaet et br\u00f8k- og dataverksted \u2014 seks- og sju\u00e5ringer kan dele frukter i halvdeler, fjerdedeler og tredjedeler, samle inn data om klassens favorittfrukter i s\u00f8ylediagrammer og l\u00f8se flertrinnsproblemer med fruktkurver. Addisjon og subtraksjon innenfor 20 med fruktscener gir kontekstualisert regning med tierovergang. M\u00e5ling av fruktvekt med v\u00e5g og gram introduserer standardenheter. Skriving av fruktbeskrivelser med farge, smak og tekstur trener adjektivrik faglitter\u00e6r skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, data og skriftlig beskrivelse i 1. trinn m\u00f8tes direkte.',
    developmentalMilestones: [
      { milestone: 'Br\u00f8kforst\u00e5else med konkrete gjenstander (6\u20137-\u00e5ringer deler frukter i like store deler)', howWeAddress: 'Fruktdelingsark der elevene skraverer halvdeler, fjerdedeler og tredjedeler av epler og appelsiner gir h\u00e5ndgripelig br\u00f8kforst\u00e5else' },
      { milestone: 'Datainnsamling og diagramlesing (s\u00f8ylediagrammer med kategorier)', howWeAddress: 'Favorittfrukt-unders\u00f8kelsesark med s\u00f8ylediagrammer der elevene registrerer, avleser og sammenligner data' },
      { milestone: 'M\u00e5ling med v\u00e5g og gram (begynnende vektm\u00e5ling)', howWeAddress: 'Fruktvektsark der elevene veier frukter, noterer gram og sammenligner \u2014 funksjonell m\u00e5ling' },
      { milestone: 'Beskrivende skriving med sanseord (smak, farge, tekstur)', howWeAddress: 'Fruktbeskrivelsesark med sensoriske adjektivrammer veileder presis, adjektivrik skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til halvdeler, bruk kun tre frukter i diagrammer, og tilby adjektivordbank. For avanserte elever i 1. klasse tilf\u00f8yes fjerdedeler og tredjedeler, flertrinnsproblemer med fruktpriser, og selvstendig skriving av fruktanmeldelser med begrunnede meninger.',
    parentTakeaway: 'Del frukter ved middagsbordet og snakk om br\u00f8ker: \u00abhvor mange fjerdedeler er det i et eple?\u00bb Vei frukter p\u00e5 kj\u00f8kkenet og sammenlign. La barnet telle frukter i sk\u00e5len og lage et diagram. Skriv sammen: \u00ab\u00c5Eplet er r\u00f8dt, s\u00f8tt og sproedt.\u00bb Frukt er den smakfulle veien til br\u00f8ker og data.',
    classroomIntegration: 'Frukttemaet i 1. klasse integreres i matematikk og naturfag: br\u00f8ksirkler med fruktbilder, s\u00f8ylediagrammer med klassens favorittfrukter, vektm\u00e5ling i naturfagstimen og sansebeskrivelser i norsktimen. En fruktuke med smakingsstasjoner og datainnsamling forbinder alle fag. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for br\u00f8ker, data og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Br\u00f8kforst\u00e5else (fruktkontekst)', emerging: 'deler en frukt i to halvdeler med st\u00f8tte', proficient: 'deler selvstendig frukter i halvdeler og fjerdedeler og navngir br\u00f8kene korrekt', advanced: 'deler i tredjedeler, sammenligner br\u00f8kst\u00f8rrelser og l\u00f8ser enkle br\u00f8koppgaver med frukter' },
      { skill: 'Datainnsamling og diagrammer (fruktdata)', emerging: 'registrerer data i et forh\u00e5ndslaget diagram med st\u00f8tte', proficient: 'oppretter selvstendig et s\u00f8ylediagram med fruktdata og besvarer sammenligningssp\u00f8rsm\u00e5l', advanced: 'analyserer data fra egne unders\u00f8kelser, trekker konklusjoner og presenterer resultater' },
      { skill: 'Fruktbeskrivelse med sanseadjektiver', emerging: 'beskriver frukt med \u00e9n sans (farge) med st\u00f8tte', proficient: 'skriver selvstendig beskrivelser med farge, smak og tekstur', advanced: 'skriver detaljerte fruktanmeldelser med sammenligninger, vurderinger og begrunnelser' },
    ],
  },

  furniture: {
    snippetAnswer: 'M\u00f8bel-oppgaver for 1. klasse (6\u20137 \u00e5r) trener m\u00e5ling i centimeter, geometriske former i m\u00f8bler og selvstendig skriving av rombeskrivelser. Romplanlegging og matematikk m\u00f8tes i dagliglivet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r m\u00f8beltemaet en romlig og matematisk dimensjon \u2014 seks- og sju\u00e5ringer kan m\u00e5le m\u00f8bler i centimeter, gjenkjenne geometriske former i m\u00f8beldesign (rektangul\u00e6re bord, sirkelformede stoler, trekantede hyller) og tegne enkle romkart med m\u00f8belplassering. Addisjon og subtraksjon med m\u00f8belpriser (stol 80 kr. + bord 120 kr.) gir funksjonell pengeregning. Sortering etter rom, materiale og funksjon trener flerkriterietenkning. Selvstendig skriving av rombeskrivelser med posisjonsord (ved siden av, foran, bak) styrker romlig spr\u00e5k. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, geometri og funksjonell skriving i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'M\u00e5ling av gjenstander i centimeter (6\u20137-\u00e5ringer bruker linjal p\u00e5 hverdagsgjenstander)', howWeAddress: 'M\u00f8belm\u00e5lingsark der elevene m\u00e5ler bredde og h\u00f8yde p\u00e5 stol, bord og hylle i centimeter' },
      { milestone: 'Formgjenkjenning i hverdagsgjenstander (rektangler, sirkler, trekanter)', howWeAddress: 'M\u00f8belanalyseark der elevene identifiserer og fargemarkerer former i m\u00f8belbilder' },
      { milestone: 'Romlig spr\u00e5k med posisjonsord (foran, bak, ved siden av, under, over)', howWeAddress: 'Rombeskrivelsesark der elevene plasserer m\u00f8bler p\u00e5 kart og skriver posisjoner trener romlig ordforr\u00e5d' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre m\u00f8beltyper, m\u00e5l med hele centimeter og bruk forenklede romkart. For avanserte elever i 1. klasse tilf\u00f8yes arealberegning (lengde \u00d7 bredde p\u00e5 bordplater), m\u00f8belbudsjett med flertrinnsproblemer og selvstendig skriving av romplanleggingsforslag.',
    parentTakeaway: 'M\u00f8bler er daglig geometri og m\u00e5ling. La barnet m\u00e5le bordet med en linjal, identifisere former i bokhyllen og beskrive rommets m\u00f8bler med posisjonsord. Tegn et romkart sammen og flytt p\u00e5 m\u00f8bler \u2014 det er matematikk, spr\u00e5k og romforst\u00e5else i praksis.',
    classroomIntegration: 'M\u00f8beltemaet i 1. klasse integreres i tverrfaglig prosjektarbeid: mattetimen m\u00e5ler klasseromsmm\u00f8bler, geometritimen finner former i interioeeret, norsktimen skriver rombeskrivelser, og kunsttimen designer droemmerom. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, geometri og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'M\u00e5ling av m\u00f8bler i centimeter', emerging: 'm\u00e5ler med st\u00f8tte og leser av linjalen un\u00f8yaktig', proficient: 'm\u00e5ler selvstendig bredde og h\u00f8yde p\u00e5 m\u00f8bler i hele centimeter', advanced: 'm\u00e5ler presist, sammenligner m\u00e5l og beregner totallengder' },
      { skill: 'Formgjenkjenning i m\u00f8bler', emerging: 'gjenkjenner \u00e9n form i m\u00f8belbilder med st\u00f8tte', proficient: 'identifiserer selvstendig rektangler, sirkler og trekanter i m\u00f8beldesign', advanced: 'analyserer sammensatte former og forklarer hvorfor visse former brukes i m\u00f8bler' },
      { skill: 'Rombeskrivelse med posisjonsord', emerging: 'bruker \u00e9tt posisjonsord (foran) med st\u00f8tte', proficient: 'skriver selvstendig rombeskrivelser med 3\u20134 posisjonsord', advanced: 'skriver detaljerte romplanleggingsforslag med presise posisjonsangivelser' },
    ],
  },

  garden: {
    snippetAnswer: 'Hage-oppgaver for 1. klasse (6\u20137 \u00e5r) trener m\u00e5ling av plantevekst i centimeter, dataregistrering med vekstdiagrammer og selvstendig skriving av plantedagbok. Naturfag og matematikk vokser sammen i hagen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse blir hagetemaet et vitenskapelig langstidsprosjekt \u2014 seks- og sju\u00e5ringer kan m\u00e5le plantevekst i centimeter over tid, registrere data i vekstdiagrammer og bruke resultatene til addisjon og sammenligning. S\u00e5ing, vanning og observasjon gir systematisk naturfaglig unders\u00f8kelse. Plantenes deler (r\u00f8tter, stengel, blader, blomst) l\u00e6res med fagterminologi. Addisjon med fr\u00f8 og planter (plantet 8 fr\u00f8, spirte 5, hvor mange spirte ikke?) gir kontekstbasert regning innenfor 20. Selvstendig dagbokskriving med dato, m\u00e5ling og observasjon trener faglitter\u00e6r skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, m\u00e5ling og skriving i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Systematisk m\u00e5ling over tid (6\u20137-\u00e5ringer m\u00e5ler plantevekst ukentlig i centimeter)', howWeAddress: 'Vekstm\u00e5lingsark der elevene m\u00e5ler og registrerer planteh\u00f8yde hver uke bygger systematisk m\u00e5lekompetanse' },
      { milestone: 'Dataregistrering i diagrammer (vekstkurver og s\u00f8ylediagrammer)', howWeAddress: 'Vekstdiagramark der elevene plotter ukentlige m\u00e5linger trener visuell datarepresentasjon' },
      { milestone: 'Plantekunnskap med fagbegreper (r\u00f8tter, stengel, blader, blomst, fr\u00f8)', howWeAddress: 'Planteanatomidiagrammer der elevene navnsetter og kobler delene med funksjonene trener fagterminologi' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre plantedeler, m\u00e5l med hele centimeter og bruk forenklede vekstdiagrammer med f\u00e5 datapunkter. For avanserte elever i 1. klasse tilf\u00f8yes kontrollerte eksperimenter (lys vs. skygge), flertrinnsproblemer med s\u00e5ingsbudsjett og selvstendig skriving av planteforskningsrapporter.',
    parentTakeaway: 'S\u00e5 fr\u00f8 i vinduskarmen med barnet og f\u00f8r en vekstdagbok: m\u00e5l planteh\u00f8yden hver s\u00f8ndag i centimeter og tegn det inn p\u00e5 et diagram p\u00e5 kj\u00f8leskapet. Navngi plantedelene sammen. Hageprosjekter gir ukentlig matematikk og naturfag uten at barnet merker at det l\u00e6rer.',
    classroomIntegration: 'Hagetemaet i 1. klasse integreres som \u00e5rsprosjekt: naturfagstimen s\u00e5r fr\u00f8 og observerer vekst, mattetimen m\u00e5ler og diagrammer planteh\u00f8yde, norsktimen skriver plantedagbok, og uteundervisningen bes\u00f8ker skolehagen. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, m\u00e5ling og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'M\u00e5ling av plantevekst', emerging: 'm\u00e5ler planteh\u00f8yde med st\u00f8tte og registrerer un\u00f8yaktig', proficient: 'm\u00e5ler selvstendig i centimeter, registrerer korrekt og sammenligner m\u00e5linger over tid', advanced: 'tolker vekstkurver, identifiserer trender og formulerer hypoteser om \u00e5rsaker' },
      { skill: 'Dataregistrering med vekstdiagrammer', emerging: 'plotter datapunkter i forh\u00e5ndslaget diagram med st\u00f8tte', proficient: 'oppretter selvstendig s\u00f8ylediagram med ukentlige m\u00e5linger og leser resultatet', advanced: 'sammenligner vekstkurver for ulike planter og trekker konklusjoner' },
      { skill: 'Plantedagbok-skriving', emerging: 'skriver 1\u20132 observasjoner med st\u00f8tte fra mal', proficient: 'skriver selvstendig dagbokinnlegg med dato, m\u00e5ling og observasjon', advanced: 'f\u00f8rer systematisk dagbok med trender, sammenligninger og hypoteser' },
    ],
  },

  halloween: {
    snippetAnswer: 'Halloween-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon innenfor 20 med godteriscenarier, symmetri med gresskardesign og selvstendig skriving av spennende historier. Matematikk og kreativitet feirer sammen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r Halloween-temaet matematisk og spr\u00e5klig dybde \u2014 seks- og sju\u00e5ringer l\u00f8ser flertrinnsproblemer med godteriscenarier (samlet 15 godterier, spiste 4, fikk 6 til \u2014 hvor mange n\u00e5?), gjenkjenner symmetri i gresskardesign og skriver egne skrekkhistorier med innledning, midtdel og avslutning. Godteritelling introduserer posisjonsverdi (23 godterier = 2 tiere + 3 enere), og sortering av godteri etter type gir diagramdata. M\u00e5ling av gresskarets omkrets og h\u00f8yde i centimeter gir autentisk m\u00e5lepraksis. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, norsk og kreativitet i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnsproblemer med godteriscenarier (6\u20137-\u00e5ringer takler sekvensiell beregning)', howWeAddress: 'Halloween-regneark med to\u2013tre regnetrinn (samle, spise, dele godteri) trener sekvensiell matematisk tenkning' },
      { milestone: 'Symmetrigjenkjenning og -produksjon i dekorasjonsmotiver', howWeAddress: 'Gresskar- og spindelvevdesign som skal fullf\u00f8res symmetrisk trener romlig tenkning og presisjon' },
      { milestone: 'Spenningsskriving med tredelt struktur (innledning, midtdel, avslutning)', howWeAddress: 'Skrekkhistorie-maler med rammer for setting, hendelse og avslutning veileder strukturert kreativ skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, hold regning innenfor 10 med bildest\u00f8tte, tilby symmetrimaler med st\u00f8ttelinjer og bruk setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes godteribudsjett med penger, avanserte symmetrim\u00f8nstre og selvstendig skriving av lengre spenningshistorier.',
    parentTakeaway: 'Bruk Halloween som matematikkfest: la barnet sortere godteriet etter type og lage et s\u00f8ylediagram, telle i grupper p\u00e5 ti og \u00f8ve posisjonsverdi. M\u00e5l gresskarets h\u00f8yde og omkrets. Skriv en skrekkhistorie sammen. Halloween er engasjement p\u00e5 h\u00f8ygir \u2014 bruk det til l\u00e6ring.',
    classroomIntegration: 'Halloween-temaet i 1. klasse kj\u00f8rer som temadager: mattetimen l\u00f8ser godteriproblemer med flertrinn, norsktimen skriver spenningshistorier, kunsttimen lager symmetriske gresskardesign, og naturfagstimen studerer edderkoppens symmetri. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, norsk og kreative fag st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Flertrinnsproblemer (halloweenkontekst)', emerging: 'l\u00f8ser etttrinnsproblemer innenfor 10 med st\u00f8tte', proficient: 'l\u00f8ser selvstendig totrinnsproblemer innenfor 20 med godteriscenarier', advanced: 'l\u00f8ser tretrinnsproblemer og formulerer egne flertrinnoppgaver med halloweentema' },
      { skill: 'Symmetri (halloweenmotiver)', emerging: 'gjenkjenner symmetri i enkle figurer med st\u00f8tte', proficient: 'fullf\u00f8rer selvstendig symmetriske gresskar- og spindelvevdesign', advanced: 'skaper egne symmetriske design med flere symmetriakser og forklarer begrepet' },
      { skill: 'Spenningshistorie-skriving', emerging: 'skriver 1\u20132 setninger om Halloween med st\u00f8tte', proficient: 'skriver selvstendig en spenningshistorie med innledning, midtdel og avslutning', advanced: 'skriver en levende historie med adjektiver, dialog og uventet vri' },
    ],
  },

  holidays: {
    snippetAnswer: 'H\u00f8ytids-oppgaver for 1. klasse (6\u20137 \u00e5r) trener kalenderkunnskap, addisjon/subtraksjon med festscenarier og selvstendig skriving av h\u00f8ytidsbeskrivelser. Kultur, tradisjon og matematikk feires sammen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r h\u00f8ytidstemaet kulturell og matematisk dybde \u2014 seks- og sju\u00e5ringer kan lese kalenderen, telle dager mellom h\u00f8ytider, l\u00f8se flertrinnsproblemer med gavescenarier og skrive h\u00f8ytidsbeskrivelser med kulturelt innhold. Adventstelling gir daglig subtraksjon (24 minus dagens dato), julebudsjett introduserer penger, og sammenligning av tradisjoner p\u00e5 tvers av kulturer trener kritisk tenkning. Tidslinjer over \u00e5rets h\u00f8ytider kobler kronologisk forst\u00e5else med matematikk. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, samfunnsfag og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Kalenderkunnskap (6\u20137-\u00e5ringer leser m\u00e5neder, ukedager og teller dager mellom datoer)', howWeAddress: 'H\u00f8ytidskalender-ark der elevene markerer h\u00f8ytidsdatoer, teller dager og planlegger feiring trener tidsregning' },
      { milestone: 'Kulturforst\u00e5else (sammenligning av norske og internasjonale h\u00f8ytider)', howWeAddress: 'Tradisjonssammenligningsark der elevene finner likheter og forskjeller mellom h\u00f8ytider bygger kulturkompetanse' },
      { milestone: 'Beskrivende skriving om tradisjoner (mattradisjon, pynting, familieaktiviteter)', howWeAddress: 'H\u00f8ytidsbeskrivelsesmaler med rammer for mat, dekorasjoner og aktiviteter veileder strukturert skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre h\u00f8ytider barnet kjenner godt, hold regning innenfor 10 og tilby bildemaler. For avanserte elever i 1. klasse tilf\u00f8yes tidslinjer med alle \u00e5rets h\u00f8ytider, budsjettoppgaver med gavekj\u00f8p og selvstendig skriving av sammenlignende h\u00f8ytidstekster.',
    parentTakeaway: 'Bruk h\u00f8ytidene som l\u00e6ringsfester: la barnet telle dager til julaften p\u00e5 kalenderen, beregne gavebudsjett med addisjon og skrive om familiens tradisjoner. Sammenlign norske h\u00f8ytider med tradisjoner fra andre land. Hvert \u00e5r gir tolv h\u00f8ytider \u2014 tolv l\u00e6ringskontekster.',
    classroomIntegration: 'H\u00f8ytidstemaet i 1. klasse integreres gjennom \u00e5ret: mattetimen teller dager p\u00e5 kalenderen og beregner budsjett, samfunnsfagstimen sammenligner tradisjoner, norsktimen skriver h\u00f8ytidsbeskrivelser, og kunsttimen lager dekorasjoner. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, samfunnsfag og kulturforst\u00e5else st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Kalenderkunnskap (h\u00f8ytidskontekst)', emerging: 'finner h\u00f8ytidsdatoer p\u00e5 kalenderen med st\u00f8tte', proficient: 'leser selvstendig kalenderen, teller dager mellom h\u00f8ytider og navngir m\u00e5neder', advanced: 'planlegger tidslinjer, beregner uker til neste h\u00f8ytid og forklarer kalenderstrukturen' },
      { skill: 'Addisjon/subtraksjon med festscenarier', emerging: 'l\u00f8ser addisjonsoppgaver innenfor 10 med h\u00f8ytidsbilder', proficient: 'l\u00f8ser selvstendig flertrinnsproblemer innenfor 20 med gave- og festscenarier', advanced: 'l\u00f8ser budsjettoppgaver med flere gjenstander og vekslepenger' },
      { skill: 'H\u00f8ytidsbeskrivelse-skriving', emerging: 'skriver 1\u20132 setninger om en h\u00f8ytid med st\u00f8tte', proficient: 'skriver selvstendig en h\u00f8ytidsbeskrivelse med mat, pynt og aktiviteter', advanced: 'skriver sammenlignende tekster om h\u00f8ytider i ulike kulturer med detaljer og refleksjoner' },
    ],
  },

  household: {
    snippetAnswer: 'Husholdnings-oppgaver for 1. klasse (6\u20137 \u00e5r) trener m\u00e5ling med kopper og liter, sortering av gjenstander etter rom og funksjon, og selvstendig skriving av instruksjonstekster. Dagliglivets matematikk l\u00e6res hjemme. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r husholdningstemaet praktisk-matematisk fokus \u2014 seks- og sju\u00e5ringer kan m\u00e5le volum med kopper og desiliter, sortere husholdningsgjenstander etter rom og funksjon, og skrive instruksjonstekster for husarbeid. Vaskemaskinprogrammer gir klokkelesing, matlagingsoppskrifter krever m\u00e5ling, og renholdsbudsjett introduserer penger. Flertrinnsproblemer med handlelister (3 sjeletter \u00e0 15 kr. + vaskemiddel \u00e0 35 kr.) trener addisjon innenfor 100. Sortering av gjenbruk og avfall kobler milj\u00f8l\u00e6re med logisk tenkning. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, helse og dagliglivskompetanse i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Volumm\u00e5ling med kopper og desiliter (6\u20137-\u00e5ringer m\u00e5ler v\u00e6sker i hverdagen)', howWeAddress: 'Matlagingsm\u00e5lingsark der elevene m\u00e5ler ingredienser i dl og kopper gir autentisk volumerfaring' },
      { milestone: 'Flerkriteriesortering av hverdagsgjenstander (rom, funksjon, materiale)', howWeAddress: 'Husholdningssorteringsark der elevene klassifiserer gjenstander etter kj\u00f8kken/bad/soverom og funksjon' },
      { milestone: 'Instruksjonsskriving med rekkef\u00f8lge (f\u00f8rst, s\u00e5, deretter, til slutt)', howWeAddress: 'Husarbeidsinstruksjonsark der elevene skriver trinn-for-trinn-oppskrifter med rekkef\u00f8lgeord' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til sortering etter rom med bilder, bruk m\u00e5ling med hele kopper og tilby instruksjonsmaler. For avanserte elever i 1. klasse tilf\u00f8yes handleliste med budsjett, avansert m\u00e5ling med desiliter og selvstendig skriving av oppskrifter og renholdsplaner.',
    parentTakeaway: 'Kj\u00f8kkenet er det beste klasserommet hjemme. La barnet m\u00e5le mel og melk i oppskrifter, sortere varerene etter handlekurv og skrive instruksjoner for \u00e5 dekke bordet. Tell bestikk i skuffen, sorter gjenbruk og beregn handlelisten. Dagliglivet er full av matematikk \u2014 vis barnet det.',
    classroomIntegration: 'Husholdningstemaet i 1. klasse integreres i mat-og-helse-undervisning: mattetimen m\u00e5ler ingredienser og beregner handlelister, norsktimen skriver oppskrifter og instruksjoner, naturfagstimen sorterer avfall og l\u00e6rer om gjenbruk. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, mat og helse st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Volumm\u00e5ling (husholdningskontekst)', emerging: 'm\u00e5ler med hele kopper med st\u00f8tte', proficient: 'm\u00e5ler selvstendig i kopper og desiliter og registrerer korrekt', advanced: 'beregner doble og halve mengder og anvender m\u00e5ling i egne oppskrifter' },
      { skill: 'Sortering av husholdningsgjenstander', emerging: 'sorterer gjenstander i to grupper med st\u00f8tte', proficient: 'sorterer selvstendig etter rom, funksjon og materiale', advanced: 'oppretter egne sorteringskategorier og begrunner valgene' },
      { skill: 'Instruksjonsskriving (husarbeid)', emerging: 'skriver 1\u20132 trinn med st\u00f8tte fra bilder', proficient: 'skriver selvstendig instruksjoner med 3\u20134 trinn og rekkef\u00f8lgeord', advanced: 'skriver detaljerte instruksjoner med tidsangivelser og sikkerhetsregler' },
    ],
  },

  insects: {
    snippetAnswer: 'Insekt-oppgaver for 1. klasse (6\u20137 \u00e5r) trener systematisk observasjon, datainnsamling med insektdiagrammer og selvstendig skriving av insektfakta. Naturfag og matematikk m\u00f8tes under steiner og blader. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse blir insekttemaet et vitenskapelig feltprosjekt \u2014 seks- og sju\u00e5ringer kan gjennomf\u00f8re systematiske insektjakter med tellelister, registrere funn i strekdiagrammer, klassifisere insekter etter antall bein og vinger, og skrive observasjonsrapporter. Livsloepet fra egg til voksen (metamorfose) l\u00e6res som sekvens. Addisjon med insektdata (6 bein per insekt \u00d7 3 insekter = 18 bein) gir kontekstbasert multiplikasjonsintroduksjon. M\u00e5ling av insektst\u00f8rrelser i millimeter introduserer sm\u00e5 enheter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, data og faglitter\u00e6r skriving i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Systematisk observasjon og registrering (6\u20137-\u00e5ringer gjennomf\u00f8rer tellinger med sjekklister)', howWeAddress: 'Insektjakt-ark med sjekklister og strekdiagrammer trener systematisk datainnsamling i felten' },
      { milestone: 'Klassifisering med naturfaglige kriterier (bein, vinger, kroppssegmenter)', howWeAddress: 'Insektklassifiseringsark med kriterier som seksbeint/\u00e5ttebeint, med/uten vinger bygger vitenskapelig sortering' },
      { milestone: 'Sekvensforst\u00e5else (livsl\u00f8p fra egg til voksen)', howWeAddress: 'Metamorfose-sekvenseringsark der elevene ordner stadiene (egg, larve, puppe, voksen) trener kronologisk tenkning' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre velkjente insekter (marih\u00f8ne, sommerfugl, maur), bruk forenklede sjekklister og tilby setningsstartere til skriving. For avanserte elever i 1. klasse tilf\u00f8yes avansert klassifisering, mikroskopobservasjon med tegning og selvstendig skriving av insektforskningsrapporter.',
    parentTakeaway: 'Insektjakt er gratis naturfag. Ta med barnet ut med en lupe og en sjekkliste: hvilke insekter finner dere under steiner, p\u00e5 blomster, i gresset? Registrer funnene i et strekdiagram. La barnet tegne insektet og skrive tre fakta. Naturen er det st\u00f8rste laboratoriet \u2014 og det er rett utenfor d\u00f8ren.',
    classroomIntegration: 'Insekttemaet i 1. klasse integreres i uteundervisning: naturfagstimen gjennomf\u00f8rer insektjakt med sjekklister, mattetimen analyserer insektdata i diagrammer, norsktimen skriver insektfakta, og kunsttimen tegner insektobservasjoner med detalj. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, data og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Systematisk insektobservasjon', emerging: 'registrerer 1\u20132 insekter med st\u00f8tte fra sjekkliste', proficient: 'gjennomf\u00f8rer selvstendig en insekttelling med sjekkliste og strekdiagram', advanced: 'planlegger egne unders\u00f8kelser, velger observasjonssted og analyserer funnene' },
      { skill: 'Insektklassifisering', emerging: 'sorterer insekter i to grupper med st\u00f8tte', proficient: 'klassifiserer selvstendig etter bein, vinger og kroppssegmenter', advanced: 'bruker fagbegreper som leddyr, larve, metamorfose og forklarer kriteriene' },
      { skill: 'Insektfakta-skriving', emerging: 'skriver 1\u20132 fakta med st\u00f8tte', proficient: 'skriver selvstendig 3\u20134 faktasetninger med fagord og tegning', advanced: 'skriver en sammenhengende insektrapport med innledning, fakta og konklusjon' },
    ],
  },

  jobs: {
    snippetAnswer: 'Yrkes-oppgaver for 1. klasse (6\u20137 \u00e5r) trener lesing av yrkesbeskrivelser, addisjon med l\u00f8nnsscenarier og selvstendig skriving av \u00abmin dr\u00f8mmejobb\u00bb-tekster. Samfunnsl\u00e6re og matematikk m\u00f8tes i arbeidslivet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r yrkestemaet samfunnsfaglig dybde \u2014 seks- og sju\u00e5ringer kan lese korte yrkesbeskrivelser, forst\u00e5 at yrker krever ulike ferdigheter og verkt\u00f8y, og skrive om sin egen dr\u00f8mmejobb med begrunnelse. Addisjon med l\u00f8nnsscenarier (kokken tjener 200 kr. om dagen, l\u00e6reren 250 kr.) introduserer penger og sammenligning. Sortering av yrker etter arbeidsplass (innend\u00f8rs/utend\u00f8rs), verkt\u00f8y og utdanning trener flerkriterietenkning. Intervjuskriving med sp\u00f8rsm\u00e5l og svar gir dialogformat. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for samfunnsfag, matematikk og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Yrkesforst\u00e5else (6\u20137-\u00e5ringer kobler yrker med verkt\u00f8y, arbeidssted og ferdigheter)', howWeAddress: 'Yrkeskoblingsark der elevene matcher yrker med verkt\u00f8y, uniformer og arbeidssteder bygger samfunnsforst\u00e5else' },
      { milestone: 'Pengebruk og sammenligning (addisjon og sammenligning av bel\u00f8p)', howWeAddress: 'L\u00f8nns- og prisscenarier der elevene beregner og sammenligner inntekter gir funksjonell pengeregning' },
      { milestone: 'Argumenterende skriving (\u00abmin dr\u00f8mmejobb er ... fordi ...\u00bb)', howWeAddress: 'Dr\u00f8mmejobb-skrivemaler med rammer for valg, begrunnelse og beskrivelse trener argumentativ skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til fem velkjente yrker med bilder, hold pengeberegning innenfor 20 kr. og tilby setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes yrkesintervjuer med dialogskriving, budsjettoppgaver og selvstendig skriving av yrkessammenligninger.',
    parentTakeaway: 'Snakk om yrker n\u00e5r dere m\u00f8ter dem i hverdagen: hva gj\u00f8r bussjf\u00f8ren, brannmannen, legen? La barnet intervjue en slektning om jobben sin og skrive ned svarene. Diskuter hva ulike yrker tjener og regn ut enkel l\u00f8nn. Yrkeskunnskap gir barnet forst\u00e5else for samfunnet rundt seg.',
    classroomIntegration: 'Yrkestemaet i 1. klasse integreres i samfunnsfag: yrkesuke med bes\u00f8k fra foreldre med ulike yrker, mattetimen beregner l\u00f8nn og priser, norsktimen skriver dr\u00f8mmejobb-tekster og intervjuer, og kunsttimen tegner yrkesuniformer. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for samfunnsfag, matematikk og norsk st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Yrkesforst\u00e5else og kobling', emerging: 'kobler 1\u20132 yrker med verkt\u00f8y med st\u00f8tte', proficient: 'kobler selvstendig 5+ yrker med verkt\u00f8y, arbeidssted og ferdigheter', advanced: 'sammenligner yrker, forklarer utdanningskrav og beskriver arbeidsdager' },
      { skill: 'Pengeberegning (l\u00f8nnskontekst)', emerging: 'legger sammen to bel\u00f8p innenfor 20 kr. med st\u00f8tte', proficient: 'beregner selvstendig l\u00f8nn og priser innenfor 100 kr. og sammenligner', advanced: 'l\u00f8ser budsjettoppgaver med flere poster og vekslepenger' },
      { skill: 'Dr\u00f8mmejobb-skriving', emerging: 'skriver 1\u20132 setninger om et yrke med st\u00f8tte', proficient: 'skriver selvstendig en dr\u00f8mmejobb-tekst med valg, begrunnelse og beskrivelse', advanced: 'skriver sammenligninger av yrker med fakta, meninger og refleksjoner' },
    ],
  },

  music: {
    snippetAnswer: 'Musikk-oppgaver for 1. klasse (6\u20137 \u00e5r) trener rytmem\u00f8nstre, addisjon med taktarter og selvstendig skriving av sangbeskrivelser. Matematikkens m\u00f8nstre h\u00f8res i musikken. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse kobles musikktemaet til matematisk m\u00f8nsterforst\u00e5else \u2014 seks- og sju\u00e5ringer kan gjenkjenne og skape rytmem\u00f8nstre, forst\u00e5 taktarter som mattestrukturer (4/4 = fire slag per takt) og kategorisere instrumenter etter lydfremstilling (strenge, bl\u00e5se, sl\u00e5). Addisjon med notelengder (halvnote + to fjerdedeler = hel takt) gir abstrakt matematikk konkret betydning. Sortering av instrumenter etter orkesterfamilie trener klassifisering. Selvstendig skriving av sangbeskrivelser med sanse- og f\u00f8lelsesord trener beskrivende skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for musikk, matematikk og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Rytmem\u00f8nster-gjenkjenning (6\u20137-\u00e5ringer identifiserer og gjentar rytmiske m\u00f8nstre)', howWeAddress: 'Rytmekort-ark der elevene leser, klapper og forlenger m\u00f8nstre (ta-ta-ti-ti-ta) bygger m\u00f8nsterkompetanse' },
      { milestone: 'Instrumentklassifisering (strenge, bl\u00e5se, sl\u00e5)', howWeAddress: 'Instrumentsorteringsark der elevene grupperer instrumenter etter lydfremstillingsm\u00e5te trener klassifisering' },
      { milestone: 'Beskrivende skriving med sanse- og f\u00f8lelsesord', howWeAddress: 'Sangbeskrivelsesark med rammer for tempo, stemning og instrumenter veileder musikalsk skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til enkle tomakterssm\u00f8nstre, bruk tre kjente instrumenter og tilby ordbanker med f\u00f8lelsesord. For avanserte elever i 1. klasse tilf\u00f8yes notelengder med addisjon, komposisjon av egne rytmem\u00f8nstre og selvstendig skriving av musikkritikk.',
    parentTakeaway: 'Musikk er h\u00f8rbar matematikk. Klapp rytmer sammen med barnet og la det gjenta og forlenge m\u00f8nstre. Lytt til sanger og sp\u00f8rr: \u00abhvilke instrumenter h\u00f8rer du? Er den rask eller langsom?\u00bb La barnet tegne instrumenter og skrive en sang-beskrivelse. Musikk gj\u00f8r m\u00f8nstre og f\u00f8lelser h\u00f8rbare.',
    classroomIntegration: 'Musikktemaet i 1. klasse integreres tverrfaglig: musikktimen l\u00e6rer rytmem\u00f8nstre og instrumentfamilier, mattetimen analyserer m\u00f8nstre og taktarter, norsktimen skriver sangbeskrivelser, og kunsttimen tegner instrumenter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for musikk, matematikk og norsk st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Rytmem\u00f8nster-gjenkjenning', emerging: 'klapper et enkelt m\u00f8nster etter med st\u00f8tte', proficient: 'gjenkjenner selvstendig m\u00f8nstre, gjentar og forlenger dem korrekt', advanced: 'skaper egne m\u00f8nstre, varierer tempo og forklarer strukturen' },
      { skill: 'Instrumentklassifisering', emerging: 'navngir 2\u20133 instrumenter med st\u00f8tte', proficient: 'klassifiserer selvstendig 6+ instrumenter i strenge-, bl\u00e5se- og sl\u00e5instrumenter', advanced: 'beskriver lydfremstillingsm\u00e5ter og sammenligner instrumenter p\u00e5 tvers av familier' },
      { skill: 'Sangbeskrivelse-skriving', emerging: 'skriver 1\u20132 setninger om en sang med st\u00f8tte', proficient: 'skriver selvstendig en beskrivelse med tempo, stemning og instrumenter', advanced: 'skriver musikkritikk med begrunnede meninger og sammenligninger' },
    ],
  },

  nature: {
    snippetAnswer: 'Natur-oppgaver for 1. klasse (6\u20137 \u00e5r) trener \u00f8kosystemforst\u00e5else, datainnsamling med naturobservasjoner og selvstendig skriving av naturdagbok. Vitenskapelig tenkning l\u00e6res ute i naturen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r naturtemaet \u00f8kologisk dybde \u2014 seks- og sju\u00e5ringer kan forst\u00e5 enkle n\u00e6ringskjeder, gjennomf\u00f8re systematiske naturobservasjoner med sjekklister og registrere funn i diagrammer. V\u00e6rregistrering med temperatur gir daglig datainnsamling, og sammenligning av \u00e5rstider trener kronologisk og syklisk tenkning. Addisjon med naturdata (tellet 8 l\u00f8vetrr\u00e6r og 12 grantr\u00e6r \u2014 hvor mange totalt?) gir kontekstbasert regning. M\u00e5ling av naturgjenstander i centimeter styrker m\u00e5lekompetansen. Selvstendig naturdagbok-skriving trener faglitter\u00e6r skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og uteundervisning i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'N\u00e6ringskjede-forst\u00e5else (6\u20137-\u00e5ringer ordner organismer i produsent\u2013forbruker\u2013rovdyr-kjeder)', howWeAddress: 'N\u00e6ringskjede-ark der elevene ordner plante, planteeter og rovdyr i riktig rekkef\u00f8lge trener \u00f8kologisk tenkning' },
      { milestone: 'Systematisk naturobservasjon med registrering (sjekklister og strekdiagrammer)', howWeAddress: 'Naturobservasjonsark med sjekklister for tr\u00e6r, blomster og dyr trener vitenskapelig datainnsamling' },
      { milestone: '\u00c5rstidsforst\u00e5else som syklisk system (v\u00e5r, sommer, h\u00f8st, vinter og tilbake)', howWeAddress: '\u00c5rstidssirkel-ark der elevene kobler naturendringer med m\u00e5neder og temperaturer trener syklisk tenkning' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens n\u00e6ringskjeder til to ledd, bruk forenklede sjekklister med bilder og tilby naturdagbokmaler. For avanserte elever i 1. klasse tilf\u00f8yes fireledd-n\u00e6ringskjeder, v\u00e6rdataanalyse over tid og selvstendig skriving av naturforskningsrapporter.',
    parentTakeaway: 'Naturen er rett utenfor d\u00f8ren. Ta med barnet p\u00e5 ukentlige naturvandringer med en sjekkliste: hvilke tr\u00e6r, dyr og blomster ser dere? F\u00f8r en naturdagbok med dato, temperatur og observasjoner. Snakk om n\u00e6ringskjeder: \u00abhva spiser fuglen, og hvem spiser den?\u00bb Systematisk naturobservasjon er vitenskap i praksis.',
    classroomIntegration: 'Naturtemaet i 1. klasse integreres i uteundervisning: naturfagstimen gjennomf\u00f8rer observasjoner og n\u00e6ringskjede\u00f8velser, mattetimen analyserer naturdata i diagrammer, norsktimen skriver naturdagbok, og gymtimen driver friluftsliv. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og uteundervisning st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'N\u00e6ringskjede-forst\u00e5else', emerging: 'ordner to organismer i n\u00e6ringskjede med st\u00f8tte', proficient: 'ordner selvstendig en treledd n\u00e6ringskjede og forklarer retningen', advanced: 'konstruerer fireledd-n\u00e6ringskjeder og forklarer \u00f8kologiske sammenhenger' },
      { skill: 'Systematisk naturobservasjon', emerging: 'registrerer 1\u20132 observasjoner med st\u00f8tte', proficient: 'gjennomf\u00f8rer selvstendig observasjon med sjekkliste og registrerer funn i diagram', advanced: 'planlegger egne unders\u00f8kelser, sammenligner data over tid og trekker konklusjoner' },
      { skill: 'Naturdagbok-skriving', emerging: 'skriver 1\u20132 setninger med st\u00f8tte fra mal', proficient: 'skriver selvstendig dagbokinnlegg med dato, v\u00e6r og observasjoner', advanced: 'f\u00f8rer systematisk dagbok med trender, sammenligninger og hypoteser' },
    ],
  },

  numbers: {
    snippetAnswer: 'Tall-oppgaver for 1. klasse (6\u20137 \u00e5r) trener posisjonsverdi med tiere og enere, addisjon/subtraksjon innenfor 20 med tierovergang og selvstendig skriving av tallhistorier. Tallforst\u00e5elsen bygges solid fra grunnen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse utvides talltemaet til det viktigste matematiske fundamentet \u2014 posisjonsverdi. Seks- og sju\u00e5ringer l\u00e6rer at 14 best\u00e5r av 1 tier og 4 enere, mestrer tierovergang i addisjon og subtraksjon, og bygger regneflyten som all videre matematikk hviler p\u00e5. Talllinjen brukes aktivt til hopp og strategier. Tallm\u00f8nstre som partall/oddetall og tellemm\u00f8nstre i 2, 5 og 10 legger grunnlaget for multiplikasjon. Tekstoppgaver med hverdagsscenarier krever oversettelse mellom fortelling og regnestykke. Selvstendig skriving av tallhistorier trener matematisk spr\u00e5k. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tallforst\u00e5else, regning og probleml\u00f8sing i 1. trinn m\u00f8tes direkte.',
    developmentalMilestones: [
      { milestone: 'Posisjonsverdi (6\u20137-\u00e5ringer forst\u00e5r tiere og enere som byggesteiner i totallssystemet)', howWeAddress: 'Tier-og-ener-grupperingsark med konkrete illustrasjoner (tistaver og enerkuber) bygger solid posisjonsverdiorst\u00e5else' },
      { milestone: 'Tierovergang i addisjon og subtraksjon (8 + 5 = 13 via tifylling)', howWeAddress: 'Strategiark med tifylling, tallinje og oppdelingsmetoder trener effektiv tierovergang' },
      { milestone: 'Tallm\u00f8nstre og tellem\u00f8nstre (partall, oddetall, telling i 2, 5 og 10)', howWeAddress: 'M\u00f8nstergjenkjenningsark med tallrekker der elevene finner og forlenger m\u00f8nstre bygger algebraisk tenkning' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, hold regning innenfor 10 uten tierovergang, bruk konkrete gjenstander og tistaver, og tilby tallinje som hjelpemiddel. For avanserte elever i 1. klasse tilf\u00f8yes tallomr\u00e5de opp til 50, flertrinnsproblemer og selvstendig formulering av tekstoppgaver.',
    parentTakeaway: 'Posisjonsverdi er f\u00f8rsteklassens viktigste milepel. Bruk hv\u00e6rdagssituasjoner: \u00abhvor mange tiere og enere er det i 17 kr.?\u00bb Tell i grupper p\u00e5 ti med sm\u00e5godteri eller klosser. \u00d8v tierovergang med fingre og hopp p\u00e5 tallinjen. N\u00e5r barnet forst\u00e5r at 14 = 10 + 4, er fundamentet p\u00e5 plass.',
    classroomIntegration: 'Talltemaet i 1. klasse er selve kjernen i matematikkundervisningen: daglige regneeuekter med tifylling og tallinje, ukentlige strategitreninger med posisjonsverdi, tallm\u00f8nsterl\u00f8p og tallhistorie-skriving i norsktimen. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tallforst\u00e5else og regning gjennomtrenger all undervisning i 1. trinn.',
    assessmentRubric: [
      { skill: 'Posisjonsverdi (tiere og enere)', emerging: 'teller gjenstander ett om gangen uten gruppering', proficient: 'grupperer selvstendig i tiere og enere og angir tallet korrekt', advanced: 'forklarer posisjonsverdi med egne ord og anvender det p\u00e5 tall opp til 50' },
      { skill: 'Addisjon/subtraksjon med tierovergang', emerging: 'l\u00f8ser oppgaver innenfor 10 uten tierovergang', proficient: 'l\u00f8ser selvstendig oppgaver innenfor 20 med tierovergang via tifyllingsmetode', advanced: 'l\u00f8ser flertrinnsproblemer og velger effektiv regnestreategi selvstendig' },
      { skill: 'Tallm\u00f8nster-gjenkjenning', emerging: 'gjenkjenner enkle m\u00f8nstre (+1, +2) med st\u00f8tte', proficient: 'finner selvstendig m\u00f8nstre i tallrekker og forlenger dem korrekt', advanced: 'oppdager sammensatte m\u00f8nstre, forklarer regelen og lager egne m\u00f8nstre' },
    ],
  },

  ocean: {
    snippetAnswer: 'Hav-oppgaver for 1. klasse (6\u20137 \u00e5r) trener m\u00e5ling og datainnsamling med havdyr, n\u00e6ringskjeder i havet og selvstendig skriving av havfakta. Havet er verdens st\u00f8rste naturfagsklasserom. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r havtemaet \u00f8kologisk og matematisk dybde \u2014 seks- og sju\u00e5ringer kan forst\u00e5 marine n\u00e6ringskjeder (plankton \u2192 sm\u00e5fisk \u2192 storfisk \u2192 sel), klassifisere havdyr etter egenskaper (fisk, pattedyr, bl\u00f8tdyr, krepsdyr) og samle data om havdyr i diagrammer. Addisjon og subtraksjon med fisketellinger innenfor 20 gir kontekstbasert regning. M\u00e5ling av havdyrst\u00f8rrelser i centimeter (sjstjerne 12 cm, krabbe 8 cm) gir autentisk m\u00e5lepraksis. Selvstendig skriving av havfakta trener faglitter\u00e6r skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, data og skriving i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Marine n\u00e6ringskjeder (6\u20137-\u00e5ringer ordner havorganismer i spis-og-bli-spist-kjeder)', howWeAddress: 'Havets n\u00e6ringskjede-ark der elevene ordner plankton, fisk, sel og hval trener \u00f8kologisk sekvenstenkning' },
      { milestone: 'Klassifisering av havdyr med naturfaglige kriterier', howWeAddress: 'Havdyrsorteringsark med kriterier som fisk/pattedyr/bl\u00f8tdyr bygger vitenskapelig klassifisering' },
      { milestone: 'M\u00e5ling og sammenligning av havdyrst\u00f8rrelser', howWeAddress: 'Havdyrsm\u00e5lingsark der elevene m\u00e5ler illustrerte havdyr og sammenligner i centimeter' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre velkjente havdyr, bruk toledd-n\u00e6ringskjeder og tilby setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes fireledd-n\u00e6ringskjeder, havdyrdataanalyse med diagrammer og selvstendig skriving av havforskningsrapporter.',
    parentTakeaway: 'Havet fascinerer alle barn. Se p\u00e5 havdokumentarer sammen og sp\u00f8rr: \u00abhvem spiser hvem i havet?\u00bb Bes\u00f8k et akvarium og la barnet telle og tegne dyrene det ser. Sammenlign st\u00f8rrelser: \u00abblekspruten er 30 cm, krabben er 10 cm \u2014 hvor mye st\u00f8rre?\u00bb Havet er naturfag og matematikk i ett.',
    classroomIntegration: 'Havtemaet i 1. klasse integreres i naturfagsundervisning: n\u00e6ringskjede\u00f8velser med marine organismer, mattetimen analyserer havdyrdata, norsktimen skriver havfakta, og kunsttimen lager havdyr av gjenbruksmaterialer. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, data og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Marine n\u00e6ringskjeder', emerging: 'ordner to havdyr i kjede med st\u00f8tte', proficient: 'ordner selvstendig en treledd havkjede og forklarer retningen', advanced: 'konstruerer fireledd-kjeder med fagbegreper og forklarer \u00f8kologiske konsekvenser' },
      { skill: 'Havdyr-klassifisering', emerging: 'sorterer havdyr i to grupper med st\u00f8tte', proficient: 'klassifiserer selvstendig etter fisk, pattedyr, bl\u00f8tdyr og krepsdyr', advanced: 'bruker fagbegreper, forklarer kriterier og sammenligner dyregrupper' },
      { skill: 'Havfakta-skriving', emerging: 'skriver 1\u20132 fakta med st\u00f8tte', proficient: 'skriver selvstendig 3\u20134 faktasetninger om havdyr med fagord', advanced: 'skriver en sammenhengende havrapport med innledning, fakta og konklusjon' },
    ],
  },

  pets: {
    snippetAnswer: 'Kj\u00e6ledyr-oppgaver for 1. klasse (6\u20137 \u00e5r) trener datainnsamling med kj\u00e6ledyrstatistikk, addisjon med f\u00f4ringsscenarier og selvstendig skriving av kj\u00e6ledyrbeskrivelser. Ansvar og matematikk m\u00f8tes i dyrepasset. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r kj\u00e6ledyrtemaet ansvarsdimensjon og matematisk dybde \u2014 seks- og sju\u00e5ringer kan samle inn data om klassens kj\u00e6ledyr i s\u00f8ylediagrammer, l\u00f8se flertrinnsproblemer med f\u00f4ring og stell (katten spiser 2 porsjoner om dagen, hunden 3 \u2014 hvor mange p\u00e5 en uke?), og skrive kj\u00e6ledyrbeskrivelser med adjektiver. Klokkelesing kobles til f\u00f4ringstider, pengebruk til kj\u00f8p av dyremat, og m\u00e5ling til dyrest\u00f8rrelser. Sortering etter behov (mat, mosjon, helsesjekk) trener ansvarsplanlegging. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, naturfag og etikk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Datainnsamling med s\u00f8ylediagrammer (6\u20137-\u00e5ringer registrerer og tolker kj\u00e6ledyrdata)', howWeAddress: 'Klassens kj\u00e6ledyr-unders\u00f8kelsesark med s\u00f8ylediagrammer trener datainnsamling og visuell presentasjon' },
      { milestone: 'Flertrinnsproblemer med dyrepasscenarier (f\u00f4ring, stell, kostnader)', howWeAddress: 'F\u00f4ringsregneark med dags- og ukesberegninger gir flertrinnpmatematikk i omsorgskontekst' },
      { milestone: 'Beskrivende skriving med adjektiver (utseende, oppf\u00f8rsel, personlighet)', howWeAddress: 'Kj\u00e6ledyrbeskrivelsesark med rammer for utseende, vaner og personlighet trener adjektivrik skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre kj\u00e6ledyrtyper, hold regning innenfor 10 og tilby bildest\u00f8ttede skrivemaler. For avanserte elever i 1. klasse tilf\u00f8yes ukesbudsjett for kj\u00e6ledyr, sammenlignende analyser av dyregrupper og selvstendig skriving av kj\u00e6ledyrguider.',
    parentTakeaway: 'Kj\u00e6ledyr er daglig ansvarsoppl\u00e6ring og matematikk. La barnet m\u00e5le opp dyrematen, beregne ukentlig forbruk og lage et f\u00f4ringsskjema. M\u00e5l dyrets h\u00f8yde og vekt og f\u00f8r vekstdagbok. Skriv en beskrivelse av familiens kj\u00e6ledyr med utseende og personlighet. Dyrepass er omsorg, matematikk og skriving i ett.',
    classroomIntegration: 'Kj\u00e6ledyrtemaet i 1. klasse integreres i KRLE og naturfag: klassens kj\u00e6ledyr-unders\u00f8kelse med s\u00f8ylediagram, mattetimen beregner f\u00f4rmengder, norsktimen skriver kj\u00e6ledyrbeskrivelser, og etikktimen diskuterer ansvar for dyr. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for data, naturfag og etikk st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Datainnsamling om kj\u00e6ledyr', emerging: 'registrerer data i et forh\u00e5ndslaget diagram med st\u00f8tte', proficient: 'samler selvstendig inn data, lager s\u00f8ylediagram og leser resultatet', advanced: 'analyserer data, sammenligner kategorier og trekker konklusjoner' },
      { skill: 'Flertrinnsproblemer (dyrepasskontekst)', emerging: 'l\u00f8ser etttrinnsproblemer innenfor 10 med st\u00f8tte', proficient: 'l\u00f8ser selvstendig totrinnsproblemer innenfor 20 med f\u00f4ringsscenarier', advanced: 'l\u00f8ser ukesberegninger og budsjettoppgaver med flere kj\u00e6ledyr' },
      { skill: 'Kj\u00e6ledyrbeskrivelse-skriving', emerging: 'skriver 1\u20132 setninger om et dyr med st\u00f8tte', proficient: 'skriver selvstendig en beskrivelse med utseende, vaner og personlighet', advanced: 'skriver kj\u00e6ledyrguider med sammenligning av dyretyper og begrunnede anbefalinger' },
    ],
  },

  pirates: {
    snippetAnswer: 'Pirat-oppgaver for 1. klasse (6\u20137 \u00e5r) trener kartkunnskap med koordinater, addisjon/subtraksjon med skattscenarier og selvstendig skriving av pirateventyr. Matematikk og eventyr seiler sammen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r pirattemaet romlig og spr\u00e5klig dybde \u2014 seks- og sju\u00e5ringer kan lese enkle rutenettskart med koordinater, f\u00f8lge flertrinnsinstruksjoner for \u00e5 finne skatten og l\u00f8se matematiske g\u00e5ter underveis. Addisjon og subtraksjon med gullmynter innenfor 20 gir engasjerende regning, m\u00e5ling av kartavstander i centimeter trener linjalebruk, og deling av skatten likt mellom pirater introduserer br\u00f8k og divisjonstenkning. Selvstendig skriving av pirateventyr med innledning, komplikasjon og l\u00f8sning trener narrativ struktur. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, norsk og kreativ skriving i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Koordinatforst\u00e5else i rutenett (6\u20137-\u00e5ringer finner posisjoner med rad og kolonne)', howWeAddress: 'Skattekart-ark med enkle rutenett der elevene bruker koordinater (A3, B5) til \u00e5 finne skatten' },
      { milestone: 'Flertrinnsinstruksjoner (f\u00f8lg rute fra A til B via hint)', howWeAddress: 'Piratruteoppdrag der elevene l\u00f8ser matteg\u00e5ter p\u00e5 hvert stoppested trener sekvensiell probleml\u00f8sing' },
      { milestone: 'Narrativ skriving med tredelt struktur (innledning, komplikasjon, l\u00f8sning)', howWeAddress: 'Pirateventyr-maler med rammer for setting, problem og avslutning veileder strukturert historieskriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk forenklet rutenett (3\u00d73), hold regning innenfor 10 og tilby eventyr-setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes st\u00f8rre rutenett med kompass-retninger, skattebudsjettering med flertrinn og selvstendig skriving av lengre pirateventyr med dialog.',
    parentTakeaway: 'Piratjakt er romlig matematikk i praksis. Lag et skattekart i hagen med et rutenett og la barnet finne skatten med koordinater. Fordel \u00abgullmynter\u00bb (knapper) likt og \u00f8v divisjonstenkning. La barnet skrive et pirateventyr med en skatt, et problem og en l\u00f8sning. Eventyret gj\u00f8r matematikk til en skattejakt.',
    classroomIntegration: 'Pirattemaet i 1. klasse kj\u00f8rer som temauke: mattetimen l\u00f8ser skatteg\u00e5ter med koordinater og addisjon, norsktimen skriver pirateventyr, kunsttimen tegner skattekart, og gymtimen arrangerer piratskattejakt i skoleg\u00e5rden. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, norsk og kreative fag st\u00f8ttes tverrfaglig.',
    assessmentRubric: [
      { skill: 'Koordinatbruk i rutenett', emerging: 'finner posisjoner i et 2\u00d72-rutenett med st\u00f8tte', proficient: 'bruker selvstendig koordinater i et 5\u00d75-rutenett og beskriver ruter', advanced: 'navigerer i st\u00f8rre rutenett med kompassretninger og planlegger egne ruter' },
      { skill: 'Addisjon/subtraksjon med skattscenarier', emerging: 'l\u00f8ser addisjonsoppgaver innenfor 10 med st\u00f8tte', proficient: 'l\u00f8ser selvstendig flertrinnsproblemer innenfor 20 med gullmyntscenarier', advanced: 'l\u00f8ser skattefordelingsoppgaver og formulerer egne matteg\u00e5ter' },
      { skill: 'Pirateventyr-skriving', emerging: 'skriver 1\u20132 setninger om pirater med st\u00f8tte', proficient: 'skriver selvstendig et eventyr med innledning, komplikasjon og l\u00f8sning', advanced: 'skriver et detaljert eventyr med dialog, spenning og uventet avslutning' },
    ],
  },

  robots: {
    snippetAnswer: 'Robot-oppgaver for 1. klasse (6\u20137 \u00e5r) trener algoritmisk tenkning med trinnvise instruksjoner, symmetri med robotdesign og selvstendig skriving av robotbeskrivelser. Programmering og matematikk bygges analog. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r robottemaet algoritmisk og geometrisk dybde \u2014 seks- og sju\u00e5ringer kan skrive sekvensielle instruksjoner for \u00e5 styre en robot (g\u00e5 3 skritt, sving h\u00f8yre, g\u00e5 2 skritt), gjenkjenne symmetri i robotdesign og l\u00f8se logiske g\u00e5ter med betingelser (hvis veien er sperret, snu). Denne analoge programmeringen bygger algoritmisk tenkning uten skjerm. Addisjon med robotdeler (2 armer + 2 bein + 1 hode = 5 deler) gir regning i kontekst. Formgjenkjenning i roboter kobler geometri til design. Selvstendig skriving av robotbeskrivelser trener teknisk spr\u00e5k. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for algoritmisk tenkning, matematikk og teknologi i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Algoritmisk tenkning (6\u20137-\u00e5ringer skriver sekvensielle instruksjoner med presisjon)', howWeAddress: 'Robotinstruksjonsark der elevene skriver trinnvise kommandoer for \u00e5 navigere en robot gjennom en labyrint' },
      { milestone: 'Symmetri i design (gjenkjenning og produksjon av symmetriske figurer)', howWeAddress: 'Robotdesign-symmetriark der elevene fullf\u00f8rer den symmetriske halvdelen av en robot trener romlig tenkning' },
      { milestone: 'Betinget logikk (hvis\u2013s\u00e5-tenkning)', howWeAddress: 'Logiske g\u00e5ter med robotbetingelser (hvis roedt lys, stopp; hvis groennt, g\u00e5) bygger betinget resonnement' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre instruksjonstyper (g\u00e5, snu, stopp), bruk enkle symmetrimaler og tilby bildest\u00f8tte. For avanserte elever i 1. klasse tilf\u00f8yes flerbetingelsesalgoritmer, robotdesign med m\u00e5l og selvstendig skriving av robotbruksanvisninger.',
    parentTakeaway: 'Analog programmering er enkelt hjemme. La barnet \u00abprogrammere\u00bb deg: skriv instruksjoner for \u00e5 g\u00e5 til kj\u00f8leskapet og hente melk, og f\u00f8lg dem bokstavelig (feil instruksjoner gir morsom l\u00e6ring). Tegn symmetriske roboter sammen. Bygg roboter av esker og tell delene. Algoritmisk tenkning starter med \u00e5 gi presise instruksjoner.',
    classroomIntegration: 'Robottemaet i 1. klasse integreres i teknologiundervisning: mattetimen l\u00f8ser robotg\u00e5ter med algoritmisk tenkning, geometritimen studerer symmetri i robotdesign, norsktimen skriver robotinstruksjoner, og kunsttimen designer og bygger roboter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for algoritmisk tenkning, matematikk og teknologi st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Algoritmisk instruksjonsskriving', emerging: 'skriver 1\u20132 instruksjoner med st\u00f8tte', proficient: 'skriver selvstendig en sekvens p\u00e5 4\u20136 presise instruksjoner som navigerer roboten korrekt', advanced: 'inkluderer betingelser, l\u00f8kker og feilh\u00e5ndtering i instruksjonssekvenser' },
      { skill: 'Symmetri (robotdesign)', emerging: 'gjenkjenner symmetri i enkle roboter med st\u00f8tte', proficient: 'fullf\u00f8rer selvstendig den symmetriske halvdelen av en robot langs symmetriaksen', advanced: 'designer egne symmetriske roboter og forklarer symmetribegrepet' },
      { skill: 'Robotbeskrivelse-skriving', emerging: 'skriver 1\u20132 setninger om en robot med st\u00f8tte', proficient: 'skriver selvstendig en robotbeskrivelse med deler, funksjoner og utseende', advanced: 'skriver en detaljert robotbruksanvisning med teknisk spr\u00e5k og illustrasjoner' },
    ],
  },

  school: {
    snippetAnswer: 'Skole-oppgaver for 1. klasse (6\u20137 \u00e5r) trener tidsplanlegging med klokken, addisjon med timeplanerscenarier og selvstendig skriving av dagbeskrivelser. Skolehverdagen er matematikk og spr\u00e5k i praksis. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r skoletemaet metakognitiv og matematisk betydning \u2014 seks- og sju\u00e5ringer kan lese timeplanen, forst\u00e5 klokken til hele og halve timer, og beregne varighet av aktiviteter. Telling av skoleutstyr gir addisjon (8 blyanter + 5 viskelr\u00e6r = 13 gjenstander), sortering av fag etter type trener klassifisering, og skriving av skoledagbeskrivelser med kronologisk struktur trener tidsordbruk. Datainnsamling om favorittfag med s\u00f8ylediagrammer gir statistikk i kontekst. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for klokke, data og skriftlig formidling i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Klokkelesing til hele og halve timer (6\u20137-\u00e5ringer leser analog klokke)', howWeAddress: 'Timeplan-klokkeark der elevene tegner klokkesl\u00e5tt for hver skoletime trener analog klokkelesing' },
      { milestone: 'Tidsplanlegging og sekvensering (kronologisk rekkef\u00f8lge med tidsord)', howWeAddress: 'Skoledags-sekvenseringsark der elevene ordner aktiviteter med \u00abf\u00f8rst, deretter, s\u00e5, til slutt\u00bb' },
      { milestone: 'Datainnsamling om skolehverdagen (favorittfag, aktiviteter)', howWeAddress: 'Klassens favorittfag-unders\u00f8kelsesark med s\u00f8ylediagram trener data og visuell representasjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til hele timer p\u00e5 klokken, bruk bilder av aktiviteter og tilby skrivemaler. For avanserte elever i 1. klasse tilf\u00f8yes halve timer og kvarter, varighetsberegninger og selvstendig skriving av detaljerte dagbeskrivelser med refleksjoner.',
    parentTakeaway: 'Klokken og timeplanen er daglig matematikk. La barnet lese klokken n\u00e5r skoledagen starter og slutter: \u00abhvor lang tid var mattetimen?\u00bb Skriv sammen en dagsbeskrivelse med tidsord. Lag en s\u00f8ndag-timeplan med barnet og \u00f8v klokkelesing. Skolehverdagen er full av lreringsmuligheter.',
    classroomIntegration: 'Skoletemaet i 1. klasse brukes metakognitivt: morgensamlingen leser klokken og g\u00e5r gjennom timeplanen, mattetimen beregner tidsvarighet, norsktimen skriver dagbeskrivelser, og klassens favorittfag-unders\u00f8kelse gir dataprosjekt. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for klokke, data og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Klokkelesing (hele og halve timer)', emerging: 'leser hele timer p\u00e5 analog klokke med st\u00f8tte', proficient: 'leser selvstendig hele og halve timer og kobler med daglige aktiviteter', advanced: 'leser kvarter, beregner tidsvarighet og planlegger egne timeplaner' },
      { skill: 'Tidsplanlegging med sekvensering', emerging: 'ordner 2\u20133 aktiviteter kronologisk med st\u00f8tte', proficient: 'sekvensierer selvstendig en hel skoledag med tidsord', advanced: 'planlegger egne dagschemaer med tidsangivelser og begrunner rekkef\u00f8lgen' },
      { skill: 'Skoledags-beskrivelse-skriving', emerging: 'skriver 1\u20132 setninger om skoledagen med st\u00f8tte', proficient: 'skriver selvstendig en dagbeskrivelse med 4\u20135 setninger i kronologisk rekkef\u00f8lge', advanced: 'skriver detaljerte dagbeskrivelser med refleksjoner, f\u00f8lelser og vurderinger' },
    ],
  },

  seasons: {
    snippetAnswer: '\u00c5rstids-oppgaver for 1. klasse (6\u20137 \u00e5r) trener temperaturregistrering, dataanalyse med v\u00e6rdiagrammer og selvstendig skriving av \u00e5rstidsbeskrivelser. Naturens syklus er matematikk og naturfag i ett. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r \u00e5rstidstemaet datavitenskapelig dybde \u2014 seks- og sju\u00e5ringer kan registrere daglig temperatur, plotte data i diagrammer og sammenligne \u00e5rstider med talldata. Syklisk tenkning (v\u00e5r \u2192 sommer \u2192 h\u00f8st \u2192 vinter \u2192 v\u00e5r igjen) kobles til m\u00e5nedene og kalenderen. Addisjon med \u00e5rstidsdata (6 regndager i oktober + 8 i november = 14) gir kontekstualisert regning. Sortering av kl\u00e6r og aktiviteter etter sesong trener logisk kategorisering. Selvstendig skriving av \u00e5rstidsbeskrivelser med sanseadjektiver trener beskrivende skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for data, naturfag og skriving i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Temperaturregistrering og -avlesning (6\u20137-\u00e5ringer leser termometer og noterer grader)', howWeAddress: 'V\u00e6rdagbok-ark der elevene leser termometer daglig og f\u00f8rer temperaturlogg bygger systematisk datainnsamling' },
      { milestone: 'Syklisk tenkning (forst\u00e5else av \u00e5rstidene som gjentagende syklus)', howWeAddress: '\u00c5rstidssirkel-ark der elevene plasserer m\u00e5neder, temperaturer og naturendringer i syklisk diagram' },
      { milestone: 'Sammenlignende analyse med data (mer regn i oktober enn i juli)', howWeAddress: '\u00c5rstidssammenligningsark der elevene bruker diagramdata til \u00e5 sammenligne v\u00e6r p\u00e5 tvers av sesonger' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til to \u00e5rstider, bruk forenklede termometerskalaer og tilby bildemaler for skriving. For avanserte elever i 1. klasse tilf\u00f8yes gjennomsnittsberekning av temperaturer, v\u00e6rsammenligninger over m\u00e5neder og selvstendig skriving av \u00e5rstidsforskningsrapporter.',
    parentTakeaway: 'F\u00f8r en familiens v\u00e6rdagbok: la barnet lese termometeret hver morgen og skrive ned temperaturen. Sammenlign uke for uke og m\u00e5ned for m\u00e5ned. Snakk om hva som endres i naturen mellom \u00e5rstidene. Tegn en \u00e5rstidssirkel p\u00e5 kj\u00f8leskapet og oppdater den m\u00e5nedlig. V\u00e6ret er daglig dataviitenskap.',
    classroomIntegration: '\u00c5rstidstemaet i 1. klasse integreres som \u00e5rsprosjekt: daglig temperaturregistrering i klasserommet, m\u00e5nedlige v\u00e6rdiagrammer i mattetimen, \u00e5rstidsbeskrivelser i norsktimen, og naturvandringer i naturfagstimen. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for data, naturfag og skriving integreres gjennom hele skole\u00e5ret.',
    assessmentRubric: [
      { skill: 'Temperaturregistrering og -avlesning', emerging: 'leser termometer til n\u00e6rmeste 10 grader med st\u00f8tte', proficient: 'leser selvstendig termometer korrekt og registrerer daglig temperatur', advanced: 'analyserer temperaturdata over tid, finner trender og formulerer konklusjoner' },
      { skill: 'Syklisk \u00e5rstidsforst\u00e5else', emerging: 'navngir fire \u00e5rstider i rekkef\u00f8lge med st\u00f8tte', proficient: 'kobler selvstendig \u00e5rstider med m\u00e5neder, v\u00e6r og naturendringer', advanced: 'forklarer \u00e5rstidssyklusen som system og sammenligner norske \u00e5rstider med andre land' },
      { skill: '\u00c5rstidsbeskrivelse-skriving', emerging: 'skriver 1\u20132 setninger om en \u00e5rstid med st\u00f8tte', proficient: 'skriver selvstendig en \u00e5rstidsbeskrivelse med sanseadjektiver og v\u00e6rdetaljer', advanced: 'skriver sammenlignende tekster om \u00e5rstider med data, observasjoner og refleksjoner' },
    ],
  },

  shapes: {
    snippetAnswer: 'Form-oppgaver for 1. klasse (6\u20137 \u00e5r) trener formegenskaper med sider og hj\u00f8rner, sammensatte figurer og selvstendig skriving av formbeskrivelser. Geometrien g\u00e5r fra gjenkjenning til analyse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse g\u00e5r formtemaet fra gjenkjenning til egenskapsanalyse \u2014 seks- og sju\u00e5ringer teller sider og hj\u00f8rner, sammenligner former systematisk og bygger sammensatte figurer av grunnformer. Et rektangel har 4 sider og 4 hj\u00f8rner, en trekant 3 og 3 \u2014 dette tallbaserte formarbeidet kobler geometri og aritmetikk. Symmetri i former l\u00e6res med speilaksen, og m\u00f8nstergjenkjenning med formsekvenser bygger algebraisk tenkning. Selvstendig skriving av formbeskrivelser (\u00aben trekant har tre like lange sider\u00bb) trener fagterminologi. Formgjenkjenning i hverdagen (vindu = rektangel, klokke = sirkel) kobler geometri til virkeligheten. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for geometri, m\u00f8nstre og matematisk spr\u00e5k i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Formegenskaper med sider og hj\u00f8rner (6\u20137-\u00e5ringer analyserer former kvantitativt)', howWeAddress: 'Formanalyseark der elevene teller sider og hj\u00f8rner og fyller ut egenskapstabeller bygger systematisk geometri' },
      { milestone: 'Sammensatte figurer (bygging av nye former fra grunnformer)', howWeAddress: 'Formbyggeark der elevene kombinerer trekanter og rektangler til hus, b\u00e5t og dyr trener romlig konstruksjon' },
      { milestone: 'Symmetri i geometriske former (identifisering og tegning av symmetriakser)', howWeAddress: 'Symmetrigjenkjenningsark der elevene finner og tegner symmetriakser i former styrker romforst\u00e5elsen' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre grunnformer (sirkel, trekant, rektangel), bruk formsorterere og tilby tellemaler for sider. For avanserte elever i 1. klasse tilf\u00f8yes mangekanter (femkant, sekskant), multiple symmetriakser og selvstendig skriving av formguider med sammenligninger.',
    parentTakeaway: 'Former er overalt. G\u00e5 p\u00e5 formjakt i hjemmet: \u00abhvor mange rektangler finner du p\u00e5 kj\u00f8kkenet?\u00bb Tell sider og hj\u00f8rner p\u00e5 tallerkener, vinduer og boeeker. Bygg figurer av papirtrekanter og rektangler. Tegn symmetrilinjer p\u00e5 sommerfugler og snoeflak. Geometri l\u00e6res best n\u00e5r barnet ser former i sin egen verden.',
    classroomIntegration: 'Formtemaet i 1. klasse er kjernen i geometriundervisningen: formanalyse med side- og hj\u00f8rnetelling, formjakt i klasserommet, sammensatte figurer i kunsttimen, og formbeskrivelse-skriving i norsktimen. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for geometri, m\u00f8nstre og matematisk kommunikasjon st\u00f8ttes direkte.',
    assessmentRubric: [
      { skill: 'Formegenskaper (sider og hj\u00f8rner)', emerging: 'navngir former med st\u00f8tte uten \u00e5 telle sider', proficient: 'teller selvstendig sider og hj\u00f8rner og skiller mellom former basert p\u00e5 egenskaper', advanced: 'analyserer mangekanter, sammenligner egenskaper og formulerer definisjoner' },
      { skill: 'Sammensatte figurer', emerging: 'bygger enkle figurer med to grunnformer med st\u00f8tte', proficient: 'bygger selvstendig sammensatte figurer av 3\u20134 grunnformer og navngir komponentene', advanced: 'designer komplekse figurer, forklarer valgene og beregner totalt antall sider' },
      { skill: 'Formbeskrivelse-skriving', emerging: 'navngir en form i en setning med st\u00f8tte', proficient: 'skriver selvstendig en formbeskrivelse med antall sider, hj\u00f8rner og symmetri', advanced: 'skriver sammenlignende formtekster med fagterminologi og virkelighetskoblinger' },
    ],
  },

  space: {
    snippetAnswer: 'Verdensrom-oppgaver for 1. klasse (6\u20137 \u00e5r) trener tallst\u00f8rrelser med planeavstander, rekkef\u00f8lge i solsystemet og selvstendig skriving av romfakta. Universets st\u00f8rrelse gj\u00f8r tallene store og l\u00e6ringen spennende. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r verdensromtemaet matematisk og vitenskapelig dybde \u2014 seks- og sju\u00e5ringer kan l\u00e6re rekkef\u00f8lgen av planetene, forst\u00e5 st\u00f8rrelsesforhold (Jupiter er mye st\u00f8rre enn Jorden) og jobbe med store tall i en kontekst som fascinerer. Solsystemets rekkef\u00f8lge trener sekvensering og ordenstall. Addisjon med romscenarier (3 astronauter + 4 til = 7 i romstasjonen) gir engasjerende regning innenfor 20. Sammenligning av planetst\u00f8rrelser trener st\u00f8rre/mindre-begreper. Selvstendig skriving av romfakta trener faglitter\u00e6r skriving med fagord som galakse, orbit og atmosf\u00e6re. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og skriving i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Sekvensering og ordenstall (6\u20137-\u00e5ringer l\u00e6rer rekkef\u00f8lge med f\u00f8rste, andre, tredje ...)', howWeAddress: 'Planetsekvenseringsark der elevene ordner planetene fra solen og bruker ordenstall trener sekvensiell tenkning' },
      { milestone: 'St\u00f8rrelsessammenligning med relativ skala (st\u00f8rre enn, mindre enn, mye st\u00f8rre)', howWeAddress: 'Planetsammenligningsark med relativ st\u00f8rrelse der elevene rangerer og sammenligner bygger sammenligningskompetanse' },
      { milestone: 'Faglitter\u00e6r skriving med vitenskapelig ordforr\u00e5d', howWeAddress: 'Romfakta-skrivemaler med rammer for planetnavn, egenskaper og fakta trener vitenskapelig skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til fire planeter (Merkur, Venus, Jorden, Mars), bruk st\u00f8rrelsesbilder og tilby setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes alle \u00e5tte planeter, relative avstandsberegninger og selvstendig skriving av planteforskningsrapporter med flere fakta.',
    parentTakeaway: 'Verdensrommet fascinerer alle barn. Se p\u00e5 stjernene sammen og navngi planetene i rekkef\u00f8lge fra solen. Sammenlign st\u00f8rrelser: \u00abJupiter er s\u00e5 stor at over 1000 jordkloder f\u00e5r plass inni.\u00bb La barnet skrive tre fakta om favorittplaneten sin. Romforskning er naturfag med stjernestjoev i \u00f8ynene.',
    classroomIntegration: 'Romtemaet i 1. klasse integreres i naturfagsundervisning: planetrekkef\u00f8lge og st\u00f8rrelsessammenligning, mattetimen bruker romdata til addisjon og sammenligning, norsktimen skriver romfakta, og kunsttimen lager solsystemmodeller. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Planetsekvensering og ordenstall', emerging: 'navngir 2\u20133 planeter uten rekkef\u00f8lge', proficient: 'ordner selvstendig planetene fra solen med ordenstall og navngir minst 6', advanced: 'forklarer planetenes egenskaper, avstand og bruker fagbegreper som orbit og atmosf\u00e6re' },
      { skill: 'St\u00f8rrelsessammenligning (planetkontekst)', emerging: 'sammenligner to planeter med st\u00f8tte (st\u00f8rre/mindre)', proficient: 'rangerer selvstendig 4\u20136 planeter etter st\u00f8rrelse og bruker sammenligningsord', advanced: 'forklarer relative st\u00f8rrelser med analogi og beregner enkle st\u00f8rrelsesforhold' },
      { skill: 'Romfakta-skriving', emerging: 'skriver 1\u20132 fakta om en planet med st\u00f8tte', proficient: 'skriver selvstendig 3\u20134 faktasetninger med vitenskapelig ordforr\u00e5d', advanced: 'skriver en sammenhengende planetrapport med innledning, fakta og oppsummering' },
    ],
  },
};

// ── helpers ──────────────────────────────────────────────────

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

// ── main loop ────────────────────────────────────────────────

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
  const firstGradeIdx = content.indexOf("'first-grade'");
  const secondGradeIdx = content.indexOf("'second-grade'");

  if (firstGradeIdx === -1 || secondGradeIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/no.ts`);
    errorCount++;
    continue;
  }

  // Check if snippetAnswer already exists in first-grade block
  const firstGradeBlock = content.substring(firstGradeIdx, secondGradeIdx);
  if (firstGradeBlock.includes('snippetAnswer')) {
    console.log(`SKIP (already enriched): ${theme}/no.ts`);
    continue;
  }

  // Find the last "],\n" in the first-grade block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(firstGradeBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/no.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = firstGradeIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/no.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
