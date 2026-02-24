#!/usr/bin/env node
/**
 * SEO Part 261: NO First-Grade Enrichment \u2014 Themes 39-50
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the first-grade grade block of 12 NO theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    snippetAnswer: 'Sport-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon og subtraksjon innenfor 20 med poengtavler, m\u00e5nstergjenkjenning i draktnummersekvenser og selvstendig skriving av sportsregler. Lagmatematikk og fair play integreres. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse blir sport et matematisk og spr\u00e5klig prosjekt \u2014 seks- og sju\u00e5ringer kan f\u00f8re poengregnskap med addisjon og subtraksjon innenfor 20, lese korte sportsregler og skrive egne kampreferater. Flertrinnsproblemer som \u00ablaget scoret 8 m\u00e5l i f\u00f8rste omgang og 6 i andre, motstanderen scoret 11 \u2014 hvem vant?\u00bb krever sekvensiell beregning med sammenligning. M\u00f8nstergjenkjenning i draktnummersekvenser (2, 4, 6, ?) bygger algebraisk tenkning. Tidsmessig introduseres klokken gjennom kampvarighet. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, lesing og kropps\u00f8ving i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnsproblemer med poengtavler (6\u20137-\u00e5ringer l\u00f8ser to regnestykker i sekvens)', howWeAddress: 'Kampscenarier der elevene beregner totalscore med addisjon og sammenligner med subtraksjon trener sekvensiell tenkning' },
      { milestone: 'M\u00f8nstergjenkjenning i tallsekvenser (partall, oddetall, hopptelling)', howWeAddress: 'Draktnummersekvenser og poengutviklingsrekker gir m\u00f8nster\u00f8velse med sportskontekst' },
      { milestone: 'Informasjonslesing om regler og instruksjoner', howWeAddress: 'Korte tekster om sportsregler med forst\u00e5elsessp\u00f8rsm\u00e5l trener lesing av instruksjonstekst' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til addisjon innenfor 10 med bildest\u00f8tte av b\u00e5lltyper, og tilby forenklede poengtavler. For avanserte elever i 1. klasse tilf\u00f8yes flertrinnsproblemer med tre lag, selvstendig skriving av kampreferater og opprettelse av egne draktnummersekvenser.',
    parentTakeaway: 'Gj\u00f8r sport til matematikk: f\u00f8r poengtavle sammen n\u00e5r dere ser en kamp p\u00e5 TV, beregn hvem som leder etter hver omgang. Spill et bakgardsspill og skriv ned resultatene etterpå. La barnet forklare reglene i favorittsporten til en yngre s\u00f8sken \u2014 det er instruksjonsskriving i praksis.',
    classroomIntegration: 'Sportstemaet i 1. klasse kj\u00f8rer som en tverrfaglig uke: mattetimen l\u00f8ser poengproblemer med addisjon og subtraksjon, norsktimen leser sportsregler og skriver kampreferater, gymtimen spiller de aktuelle idrettene, og kunsttimen designer laglogoer. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, lesing, skriving og kropps\u00f8ving integreres.',
    assessmentRubric: [
      { skill: 'Poengberegning med addisjon/subtraksjon', emerging: 'beregner en enkel poengsum innenfor 10 med st\u00f8tte', proficient: 'beregner selvstendig totalscore og differanse innenfor 20 med sportscenarier', advanced: 'l\u00f8ser flertrinnsproblemer med tre lag og formulerer egne poengoppgaver' },
      { skill: 'M\u00f8nstergjenkjenning (tallsekvenser)', emerging: 'gjenkjenner enkle m\u00f8nstre med st\u00f8tte (2, 4, 6)', proficient: 'identifiserer og utvider selvstendig m\u00f8nstre i draktnummersekvenser', advanced: 'oppretter egne tallm\u00f8nstre og forklarer regelen muntlig' },
      { skill: 'Sportsregel-lesing og -skriving', emerging: 'leser enkle regler med st\u00f8tte og besvarer sp\u00f8rsm\u00e5l muntlig', proficient: 'leser selvstendig korte sportsregler og besvarer forst\u00e5elsessp\u00f8rsm\u00e5l skriftlig', advanced: 'skriver egne regler for et oppfunnet spill med klar struktur' },
    ],
  },

  spring: {
    snippetAnswer: 'V\u00e5r-oppgaver for 1. klasse (6\u20137 \u00e5r) trener m\u00e5ling med centimeter, v\u00e5rtegn-observasjon med strekdiagrammer og selvstendig skriving av v\u00e5rdagbok. Naturfag og matematikk m\u00f8tes i \u00e5rtidens forandringer. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse blir v\u00e5ren et vitenskapelig prosjekt \u2014 seks- og sju\u00e5ringer kan m\u00e5le plantevekst i centimeter, registrere v\u00e5rtegn (krokus, trekk-fugler, sm\u00e5kryp) i strekdiagrammer og skrive v\u00e5rdagbok med datoer og observasjoner. Addisjon med blomstergrupper (6 krokus + 8 tulipaner) gir kontekstrualisert regning innenfor 20. Sortering av v\u00e5rtegn etter type (plante, dyr, v\u00e6r) trener flerkriterietenkning. Tidslinjer over \u00e5rstidenes gang introduserer sekvensiell forst\u00e5else. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Systematisk naturobservasjon (6\u20137-\u00e5ringer registrerer funn i tabeller og diagrammer)', howWeAddress: 'V\u00e5rtegn-registreringsark med strekdiagrammer trener systematisk datainnsamling fra naturen' },
      { milestone: 'M\u00e5ling av vekst med centimeter (plantevekst som autentisk m\u00e5lekontekst)', howWeAddress: 'Plantem\u00e5lingsark der elevene m\u00e5ler spirer i centimeter ukentlig gir reell m\u00e5leerfaring' },
      { milestone: 'Dagbokskriving med dato og observasjon (funksjonell skriving)', howWeAddress: 'V\u00e5rdagbok-maler med felt for dato, v\u00e6r, observasjon og tegning trener strukturert skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre v\u00e5rtegn med bilder, bruk forh\u00e5ndstegnede diagrammer med f\u00e5 kategorier, og tilby setningsstartere for dagboken. For avanserte elever i 1. klasse tilf\u00f8yes m\u00e5ling i millimeter, sammenligning av vekstdata over tid og selvstendig skriving av v\u00e5rforskningsrapporter.',
    parentTakeaway: 'G\u00e5 p\u00e5 v\u00e5rtur hver uke og la barnet notere hva som har forandret seg: nye blomster, fugler, sm\u00e5kryp. M\u00e5l en plante hjemme med linjal og skriv ned resultatet. Lag et v\u00e5rkalender-prosjekt p\u00e5 kj\u00f8leskapet med tegninger og m\u00e5linger. Naturobservasjon er vitenskap i praksis.',
    classroomIntegration: 'V\u00e5rtemaet i 1. klasse kj\u00f8rer som et \u00e5rstidsprosjekt: naturfagstimen observerer og registrerer v\u00e5rtegn, mattetimen m\u00e5ler plantevekst og lager diagrammer, norsktimen skriver v\u00e5rdagbok, og kunsttimen tegner v\u00e5rens forandringer. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og skriving integreres tverrfaglig.',
    assessmentRubric: [
      { skill: 'V\u00e5rtegn-observasjon og registrering', emerging: 'navngir 1\u20132 v\u00e5rtegn med st\u00f8tte og registrerer i forh\u00e5ndslaget diagram', proficient: 'observerer selvstendig v\u00e5rtegn og registrerer i strekdiagram med korrekte tall', advanced: 'klassifiserer v\u00e5rtegn etter type, sammenligner data og trekker konklusjoner' },
      { skill: 'Plantem\u00e5ling i centimeter', emerging: 'm\u00e5ler med st\u00f8tte og oppgir omtrentlig lengde', proficient: 'm\u00e5ler selvstendig plantevekst i hele centimeter og registrerer korrekt', advanced: 'sammenligner vekstdata over tid og forklarer m\u00f8nstre med matematisk spr\u00e5k' },
      { skill: 'V\u00e5rdagbok-skriving', emerging: 'skriver 1\u20132 setninger med st\u00f8tte fra mal', proficient: 'skriver selvstendig dagbokinnlegg med dato, v\u00e6r og observasjon', advanced: 'f\u00f8rer sammenhengende dagbok med detaljer, m\u00e5linger og refleksjoner over forandring' },
    ],
  },

  summer: {
    snippetAnswer: 'Sommer-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon innenfor 20 med strandscenarier, m\u00e5ling med centimeter og selvstendig skriving av sommeropplevelser. Feriekontekst gj\u00f8r l\u00e6ringen lystbetont. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r sommertemaet akademisk tyngde \u2014 seks- og sju\u00e5ringer kan l\u00f8se flertrinnsproblemer med strandscenarier (12 skjell samlet, 5 gitt bort, 8 nye funnet = ?), m\u00e5le sandslott og skjell i centimeter, og skrive sommeropplevelser med begynnelse, midtdel og slutt. Temperaturlesing introduserer tallinja, iskrempriser gir addisjon med kronebel\u00f8p, og strandkart trener romlig orientering. Sommerens dagliglivskontekst gj\u00f8r abstrakt matematikk konkret. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, naturfag og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnsproblemer med tre operasjoner (samle, gi bort, finne nye)', howWeAddress: 'Strandscenarier med tre regnetrinn gir kontekst for sekvensiell beregning innenfor 20' },
      { milestone: 'Temperaturlesing p\u00e5 tallinja (introduksjon av termometer)', howWeAddress: 'V\u00e6rm\u00e5lingsark der elevene leser temperatur p\u00e5 en forenklet tallinjemodell kobler tall til virkeligheten' },
      { milestone: 'Fortellende skriving med struktur (begynnelse, midtdel, slutt)', howWeAddress: 'Skrivemaler for sommeropplevelser med tre deler guider elevene mot strukturert fortelling' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til addisjon innenfor 10 med strandbilder, bruk tallinjer som visuelt hj\u00e5lpemiddel, og tilby setningsstartere for skriving. For avanserte elever i 1. klasse tilf\u00f8yes prisberegning med kronebel\u00f8p, temperatursammenligning og selvstendig skriving av sommerdagbok med dato og v\u00e6r.',
    parentTakeaway: 'Sommeren er ett stort klasserom. M\u00e5l skjell og steiner med linjal, f\u00f8r v\u00e6rdagbok med temperatur, beregn iskrempriser og la barnet skrive om dagens opplevelse f\u00f8r leggetid. Bruk feriereisen til \u00e5 telle kilometermerker og lese skilt. Hver sommerdag er en leksjon som venter.',
    classroomIntegration: 'Sommertemaet i 1. klasse brukes som repetisjonsramme f\u00f8r ferien: mattetimen l\u00f8ser strandproblemer med addisjon og m\u00e5ling, norsktimen skriver sommeropplevelser med struktur, naturfagstimen studerer sommerdyr og v\u00e6r, og kunsttimen lager strandkunst. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, skriving og naturfag st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Flertrinnsproblemer (sommerkontekst)', emerging: 'l\u00f8ser etttrinnsproblemer innenfor 10 med bildest\u00f8tte', proficient: 'l\u00f8ser selvstendig totrinnsproblemer innenfor 20 med strandscenarier', advanced: 'l\u00f8ser tretrinnsproblemer og formulerer egne sommermatteoppgaver' },
      { skill: 'Temperaturlesing p\u00e5 tallinja', emerging: 'leser temperatur i hele tier (10, 20, 30) med st\u00f8tte', proficient: 'leser selvstendig temperatur p\u00e5 tallinja og oppgir korrekt verdi', advanced: 'sammenligner temperaturer og forklarer forskjeller med matematisk spr\u00e5k' },
      { skill: 'Sommeropplevelse-skriving', emerging: 'skriver 1\u20132 setninger om sommeren med st\u00f8tte', proficient: 'skriver selvstendig en tekst med begynnelse, midtdel og slutt', advanced: 'skriver en levende, detaljert sommerfortelling med adjektiver og f\u00f8lelser' },
    ],
  },

  superheroes: {
    snippetAnswer: 'Superhelt-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon innenfor 20 med oppdragsscenarier, logisk tenkning med kodeknekking og selvstendig skriving av superheltfortellinger. Fantasien driver l\u00e6ringen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse blir superhelttemaet en ramme for logisk tenkning og kreativ skriving \u2014 seks- og sju\u00e5ringer kan l\u00f8se matteoppgaver forkledd som hemmelige oppdrag (l\u00f8s regnestykket for \u00e5 f\u00e5 koden til hvelvet!), bruke logiske resonnement til \u00e5 knekke tallkoder, og skrive egne superheltfortellinger med begynnelse, problem og l\u00f8sning. Superkrefter kvantifiseres med tall (styrke 15, hurtighet 18 \u2014 hvem er sterkest?), og superheltens utstyr m\u00e5les i centimeter. Sammenligning med st\u00f8rre-enn og mindre-enn f\u00e5r naturlig kontekst. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, logikk og kreativ skriving i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Logisk resonnement med tallkoder (6\u20137-\u00e5ringer l\u00f8ser fletrinnspuslespill)', howWeAddress: 'Kodeknekkerark der regnestykker gir bokstaver som danner et hemmelig ord trener logisk sekvenstenkning' },
      { milestone: 'Sammenligning med st\u00f8rre-enn/mindre-enn (tallverdier opp til 20)', howWeAddress: 'Superkraft-sammenligningsark der elevene avgj\u00f8r hvem som er sterkest/raskest gir kontekstualisert tallsammenligning' },
      { milestone: 'Kreativ fortellingsskriving med struktur (problem og l\u00f8sning)', howWeAddress: 'Superheltfortelling-maler med ramme for helt, problem, superkraft og l\u00f8sning guider narrativ skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens tallkoder til addisjon innenfor 10, tilby bildest\u00f8tte for sammenligning, og bruk skrivemaler med setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes flertrinnkoder med subtraksjon, selvstendig skriving av superheltfortellinger med flere avsnitt og oppfinnelse av egne superheltmatteoppgaver.',
    parentTakeaway: 'Superhelter er motivasjon i seg selv. Lag et \u00abhemmelig oppdrag\u00bb-ark med matteoppgaver som gir en kode. La barnet finne p\u00e5 en superhelt med tallbaserte superkrefter og sammenlign dem. Skriv en superheltfortelling sammen f\u00f8r leggetid \u2014 hvem er helten, hva er problemet, hvordan l\u00f8ses det? Fantasien driver l\u00e6ringen.',
    classroomIntegration: 'Superhelttemaet i 1. klasse kj\u00f8rer som et motivasjonsprosjekt: mattetimen l\u00f8ser hemmelige oppdrag med koder, norsktimen skriver superheltfortellinger, kunsttimen designer helter og emblemer, og gymtimen \u00f8ver \u00absuperkrefter\u00bb (hopping, l\u00f8ping, klatring). Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, kreativ skriving og motorisk utvikling st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Kodeknekking med regning', emerging: 'l\u00f8ser enkle addisjonsoppgaver innenfor 10 med st\u00f8tte for \u00e5 finne bokstaver', proficient: 'l\u00f8ser selvstendig kodeoppgaver innenfor 20 og danner det hemmelige ordet', advanced: 'oppretter egne kodeark med addisjon og subtraksjon for klassekamerater' },
      { skill: 'Tallsammenligning (st\u00f8rre-enn/mindre-enn)', emerging: 'sammenligner to tall innenfor 10 med st\u00f8tte fra tallinja', proficient: 'sammenligner selvstendig tall innenfor 20 og bruker symbolene > og < korrekt', advanced: 'ordner flere tall etter st\u00f8rrelse og forklarer resonneringen muntlig' },
      { skill: 'Superheltfortelling-skriving', emerging: 'skriver 1\u20132 setninger om en superhelt med st\u00f8tte', proficient: 'skriver selvstendig en fortelling med helt, problem og l\u00f8sning', advanced: 'skriver en detaljert fortelling med flere avsnitt, adjektiver og dialog' },
    ],
  },

  toys: {
    snippetAnswer: 'Leketøy-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon med prisberegning, sortering etter materiale og funksjon, og selvstendig skriving av leketøybeskrivelser. Dagliglivets matematikk g\u00e5r gjennom leken. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse kobles leketøytemaet til \u00f8konomi og materialkunnskap \u2014 seks- og sju\u00e5ringer kan sortere leketøy etter materiale (tre, plast, metall, stoff), beregne priser med addisjon og subtraksjon, og skrive leketøybeskrivelser med adjektiver. Butikkscenarier introduserer penger (en dukke koster 40 kr. og en bil koster 35 kr. \u2014 hva koster begge?). Sortering etter to kriterier samtidig (materiale og funksjon) trener logisk tenkning. M\u00e5ling av leketøy i centimeter gir autentisk m\u00e5lepraksis. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, naturfag og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Pengeforst\u00e5else (6\u20137-\u00e5ringer beregner priser med addisjon av kronebel\u00f8p)', howWeAddress: 'Leketøysbutikk-ark med prislapper trener addisjon og subtraksjon med penger i realistisk kontekst' },
      { milestone: 'Flerkriteriesortering (materiale og funksjon samtidig)', howWeAddress: 'Sorteringsark der elevene grupperer leketøy etter b\u00e5de materiale og bruk bygger logisk klassifisering' },
      { milestone: 'Beskrivende skriving med adjektiver (st\u00f8rrelse, farge, materiale)', howWeAddress: 'Leketøybeskrivelse-maler med felt for egenskaper trener adjektivbruk og strukturert skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til sortering etter \u00e9tt kriterium, hold prisberegning innenfor 10 kr. med bildest\u00f8tte, og tilby ordbanker for beskrivelsesskriving. For avanserte elever i 1. klasse tilf\u00f8yes budsjettoppgaver (50 kr. \u00e5 handle for), materialkompetanse med egenskaper og selvstendig skriving av leketøysanmeldelser.',
    parentTakeaway: 'Leketøy er daglig matematikk. La barnet \u00ableke butikk\u00bb med prislapper p\u00e5 leketøy og beregne totalpris. Sorter leketøy ved opprydning etter materiale eller type. La barnet skrive en anmeldelse av favorittleketøyet \u2014 tre setninger om hvordan det ser ut og hva som er g\u00f8y med det.',
    classroomIntegration: 'Leketøytemaet i 1. klasse integreres i dagliglivsundervisning: mattetimen beregner leketøyspriser og sammenligner st\u00f8rrelser, naturfagstimen studerer materialer (tre, plast, metall), norsktimen skriver leketøybeskrivelser, og kunsttimen designer drømmeleketøy. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, naturfag og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Prisberegning med leketøy', emerging: 'legger sammen to priser innenfor 10 kr. med st\u00f8tte', proficient: 'beregner selvstendig totalpriser p\u00e5 3\u20134 leketøy innenfor 100 kr.', advanced: 'l\u00f8ser budsjettoppgaver med vekslepenger og prissammenligning' },
      { skill: 'Sortering etter materiale og funksjon', emerging: 'sorterer leketøy etter \u00e9n egenskap med st\u00f8tte', proficient: 'sorterer selvstendig etter to kriterier og begrunner valget', advanced: 'oppretter egne sorteringssystemer og forklarer klassifiseringen' },
      { skill: 'Leketøybeskrivelse-skriving', emerging: 'beskriver leketøy med farge med st\u00f8tte', proficient: 'skriver selvstendig beskrivelser med farge, st\u00f8rrelse og materiale', advanced: 'skriver detaljerte anmeldelser med sammenligninger og vurderinger' },
    ],
  },

  transportation: {
    snippetAnswer: 'Transport-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon med passasjertelling, m\u00e5ling av kj\u00f8retøy i centimeter og selvstendig skriving av reisebeskrivelser. Systematisk klassifisering av transportmidler st\u00e5r sentralt. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse blir transporttemaet et klassifiserings- og m\u00e5leprosjekt \u2014 seks- og sju\u00e5ringer kan sortere kj\u00f8retøy etter tre kriterier (luft, land, vann), beregne passasjerantall med addisjon og subtraksjon, og m\u00e5le kj\u00f8retøymodeller i centimeter. Flertrinnsproblemer som \u00abbussen hadde 15 passasjerer, 7 gikk av, 4 nye gikk p\u00e5 \u2014 hvor mange n\u00e5?\u00bb trener sekvensiell tenkning. S\u00f8ylediagrammer over klassens favoritt-kj\u00f8retøy gir datainnsamling. Selvstendig skriving av reisebeskrivelser trener faglitter\u00e6r tekst. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, naturfag og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Treklassifisering av transportmidler (luft, land, vann)', howWeAddress: 'Sorteringsark med kj\u00f8retøy som skal plasseres i tre kategorier bygger systematisk klassifisering' },
      { milestone: 'Flertrinnsproblemer med passasjertelling (p\u00e5stigning og avstigning)', howWeAddress: 'Bussscenarier med p\u00e5- og avstigning gir flertrinnsproblemer med realistisk kontekst' },
      { milestone: 'M\u00e5ling av kj\u00f8retøy i centimeter (modeller og tegninger)', howWeAddress: 'Kj\u00f8retøym\u00e5lingsark der elevene m\u00e5ler biler, busser og fly i centimeter gir autentisk m\u00e5lepraksis' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til to kategorier (land/vann) og addisjon innenfor 10 med bildest\u00f8tte. For avanserte elever i 1. klasse tilf\u00f8yes underkategorier (lastebil, personbil, buss), flertrinnsproblemer med tre stopp og selvstendig skriving av kj\u00f8retøyfakta-rapporter.',
    parentTakeaway: 'Tell kj\u00f8retøy p\u00e5 tur: hvor mange busser, biler, lastebiler? Lag et s\u00f8ylediagram hjemme. Ta bussen og tell passasjerer ved hvert stopp. La barnet m\u00e5le lekebiler med linjal og skrive ned resultatene. Transport er matematikk og naturfag i bevegelse.',
    classroomIntegration: 'Transporttemaet i 1. klasse integreres tverrfaglig: mattetimen l\u00f8ser passasjerproblemer og m\u00e5ler kj\u00f8retøy, naturfagstimen studerer drivstoff og milj\u00f8, norsktimen skriver reisebeskrivelser, og kunsttimen designer fremtidens kj\u00f8retøy. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, naturfag og skriving st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Transportklassifisering (luft/land/vann)', emerging: 'sorterer kj\u00f8retøy i to grupper med st\u00f8tte', proficient: 'sorterer selvstendig kj\u00f8retøy i tre kategorier og begrunner valget', advanced: 'oppretter underkategorier og forklarer klassifiseringssystemet' },
      { skill: 'Passasjertelling med addisjon/subtraksjon', emerging: 'l\u00f8ser etttrinnsproblemer innenfor 10 med bildest\u00f8tte', proficient: 'l\u00f8ser selvstendig flertrinnsproblemer med p\u00e5-/avstigning innenfor 20', advanced: 'l\u00f8ser tretrinnsproblemer med flere stopp og formulerer egne oppgaver' },
      { skill: 'Reisebeskrivelse-skriving', emerging: 'skriver 1\u20132 setninger om en reise med st\u00f8tte', proficient: 'skriver selvstendig en reisebeskrivelse med transportmiddel, rute og opplevelse', advanced: 'skriver en sammenhengende reisetekst med detaljer, sammenligninger og refleksjoner' },
    ],
  },

  travel: {
    snippetAnswer: 'Reise-oppgaver for 1. klasse (6\u20137 \u00e5r) trener kartkunnskap med enkle symboler, addisjon med reisekostnader og selvstendig skriving av reisedagbok. Geografi og matematikk m\u00f8tes gjennom ferieplanlegging. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r reisetemaet geografisk og \u00f8konomisk dybde \u2014 seks- og sju\u00e5ringer kan lese enkle kart med symboler, beregne reisekostnader med addisjon (billett 30 kr. + mat 25 kr. = ?), og skrive reisedagbok med sted, dato og opplevelse. Avstandsm\u00e5ling p\u00e5 kart introduserer centimeter i en ny kontekst. Sortering av land etter verdensdel gir klassifisering. Tidssoner forenklet (\u00abnorge og Storbritannia har klokken 12 og 11\u00bb) kobles til tallinja. Selvstendig planlegging av en fantasireise trener strukturert tenkning. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, samfunnsfag og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Kartlesing med symboler (6\u20137-\u00e5ringer forst\u00e5r at symboler representerer steder)', howWeAddress: 'Reisekart-ark med symboler for flyplasser, hoteller og sev\u00e6rdigheter trener kartlesing og orientering' },
      { milestone: 'Pengeberegning med reisekostnader (addisjon av kronebel\u00f8p)', howWeAddress: 'Reisebudsjett-ark der elevene beregner kostnader for billett, mat og souvenir gir funksjonell pengebruk' },
      { milestone: 'Dagbokskriving med sted og dato (stedsbevisst skriving)', howWeAddress: 'Reisedagbok-maler med felt for land, dato, v\u00e6r og opplevelse guider stedsbevisst skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til kart med tre symboler, kostnadsberegning innenfor 10 kr. og skrivemaler med setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes verdenskartkunnskap, budsjettering av en hel fantasireise og selvstendig skriving av reiseguider med flere avsnitt.',
    parentTakeaway: 'Planlegg en fantasireise med barnet: velg et land, tegn et enkelt kart, beregn \u00abkostnader\u00bb og skriv dagbok. Bruk familieferien som l\u00e6ring: la barnet skrive postkort, telle mynter og lese skilt. Reiseplanlegging er matematikk, geografi og skriving i \u00e9n pakke.',
    classroomIntegration: 'Reisetemaet i 1. klasse kj\u00f8rer som et tverrfaglig prosjekt: mattetimen beregner reisekostnader og m\u00e5ler avstander, samfunnsfagstimen studerer kart og land, norsktimen skriver reisedagbok, og kunsttimen lager postkort. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, samfunnsfag og skriving integreres.',
    assessmentRubric: [
      { skill: 'Kartlesing med symboler', emerging: 'gjenkjenner 1\u20132 kartsymboler med st\u00f8tte', proficient: 'leser selvstendig et reisekart med 5\u20136 symboler og beskriver rute', advanced: 'tegner egne kart med symbolforklaring og bruker retningsbegreper' },
      { skill: 'Reisekostnadsberegning', emerging: 'legger sammen to bel\u00f8p innenfor 10 kr. med st\u00f8tte', proficient: 'beregner selvstendig reisekostnader med 3\u20134 poster innenfor 100 kr.', advanced: 'lager et komplett reisebudsjett med vekslepenger og sammenligning' },
      { skill: 'Reisedagbok-skriving', emerging: 'skriver 1\u20132 setninger om en reise med st\u00f8tte', proficient: 'skriver selvstendig dagbokinnlegg med sted, dato og opplevelse', advanced: 'skriver sammenhengende reisedagbok med detaljer, f\u00f8lelser og refleksjoner' },
    ],
  },

  vegetables: {
    snippetAnswer: 'Gr\u00f8nnsak-oppgaver for 1. klasse (6\u20137 \u00e5r) trener m\u00e5ling av gr\u00f8nnsaker i centimeter, addisjon med innhøstingsdata og selvstendig skriving av dyrkningsdagbok. Naturfag og matematikk m\u00f8tes i skolehagen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r gr\u00f8nnsakstemaet vitenskapelig dybde \u2014 seks- og sju\u00e5ringer kan m\u00e5le gulr\u00f8tter og agurker i centimeter, registrere vekstdata i tabeller, og l\u00f8se innhøstingsproblemer med addisjon og subtraksjon (vi plukket 14 tomater, spiste 6 \u2014 hvor mange igjen?). Sortering etter plantedel (rot, stengel, blad, frukt) gir biologisk klassifisering. Oppskriftslesing med mengdeangivelse kobler lesing til m\u00e5ling. Selvstendig skriving av dyrkningsdagbok trener faglitter\u00e6r tekst med dato og observasjoner. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'M\u00e5ling av naturlige gjenstander i centimeter (gr\u00f8nnsaker som autentisk kontekst)', howWeAddress: 'Gr\u00f8nnsakm\u00e5lingsark der elevene m\u00e5ler lengden p\u00e5 gulr\u00f8tter, agurker og paprika gir reell m\u00e5leerfaring' },
      { milestone: 'Biologisk klassifisering (rot, stengel, blad, frukt)', howWeAddress: 'Sorteringsark der elevene grupperer gr\u00f8nnsaker etter plantedel bygger biologisk forst\u00e5else' },
      { milestone: 'Dagbokskriving med observasjonsdata (dato, m\u00e5ling, forandring)', howWeAddress: 'Dyrkningsdagbok-maler med felt for dato, h\u00f8yde i cm og observasjon trener vitenskapelig skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre kjente gr\u00f8nnsaker, m\u00e5ling i hele centimeter med bildest\u00f8tte, og forh\u00e5ndsfylte dagboksider. For avanserte elever i 1. klasse tilf\u00f8yes vekstsammenligning over tid med diagrammer, n\u00e6ringsinnholdslesing og selvstendig skriving av gr\u00f8nnsaksfakta-rapporter.',
    parentTakeaway: 'Dyrk en gr\u00f8nnsak hjemme og m\u00e5l den ukentlig \u2014 dette er vitenskap, matematikk og skriving i ett. La barnet f\u00f8re en dyrkningsdagbok med dato og m\u00e5l. Sorter gr\u00f8nnsaker ved middag etter farge, form eller smak. G\u00e5 p\u00e5 markedet og beregn priser sammen.',
    classroomIntegration: 'Gr\u00f8nnsakstemaet i 1. klasse kj\u00f8rer som et skolehageprosjekt: naturfagstimen planter og observerer vekst, mattetimen m\u00e5ler og registrerer data, norsktimen skriver dyrkningsdagbok, og mat-og-helse-timen lager enkel mat med innhøstede gr\u00f8nnsaker. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og helse integreres.',
    assessmentRubric: [
      { skill: 'M\u00e5ling av gr\u00f8nnsaker i centimeter', emerging: 'm\u00e5ler med st\u00f8tte og oppgir omtrentlig lengde', proficient: 'm\u00e5ler selvstendig gr\u00f8nnsaker i hele centimeter og registrerer korrekt', advanced: 'sammenligner m\u00e5l, beregner vekst over tid og forklarer m\u00f8nstre' },
      { skill: 'Biologisk klassifisering av gr\u00f8nnsaker', emerging: 'sorterer gr\u00f8nnsaker i to grupper med st\u00f8tte', proficient: 'klassifiserer selvstendig etter plantedel og begrunner valget', advanced: 'forklarer sammenhengen mellom plantedel og funksjon med fagbegreper' },
      { skill: 'Dyrkningsdagbok-skriving', emerging: 'skriver 1\u20132 observasjoner med st\u00f8tte fra mal', proficient: 'skriver selvstendig dagbokinnlegg med dato, m\u00e5ling og observasjon', advanced: 'f\u00f8rer systematisk dagbok med veksttrender og refleksjoner' },
    ],
  },

  weather: {
    snippetAnswer: 'V\u00e6r-oppgaver for 1. klasse (6\u20137 \u00e5r) trener temperaturlesing p\u00e5 tallinja, v\u00e6rdata i strekdiagrammer og selvstendig skriving av v\u00e6rrapporter. Systematisk observasjon og registrering st\u00e5r sentralt. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r v\u00e6rtemaet vitenskapelig struktur \u2014 seks- og sju\u00e5ringer kan lese termometer med forenklede skalaer, registrere daglig v\u00e6r i strekdiagrammer (sol, regn, sn\u00f8, vind) og skrive v\u00e6rrapporter med dato, temperatur og beskrivelse. Addisjon med v\u00e6rdata (3 soldager + 4 regndager = 7 m\u00e5ledager) gir kontekstualisert regning. Sammenligning av m\u00e5nedstemperaturer introduserer st\u00f8rre-enn/mindre-enn med relevante tall. V\u00e6rsymboler leses som informasjonsgrafikk. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og norsk i 1. trinn st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'Temperaturlesing p\u00e5 termometer (forenklede skalaer med hele tier)', howWeAddress: 'Termometerark der elevene leser av og registrerer temperatur gir autentisk tallinjepraksis' },
      { milestone: 'Datainnsamling med strekdiagrammer (daglig v\u00e6rregistrering)', howWeAddress: 'V\u00e6rdagbok-ark med strekdiagram for v\u00e6rtyper trener systematisk datainnsamling over tid' },
      { milestone: 'Rapportskriving med fakta og dato (v\u00e6rrapport som funksjonell tekst)', howWeAddress: 'V\u00e6rrapport-maler med felt for dato, temperatur, v\u00e6rtype og beskrivelse guider faglitter\u00e6r skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, bruk forenklede termometre med bare tier, begrens v\u00e6rtyper til tre (sol, regn, sn\u00f8), og tilby skrivemaler med setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes temperatursammenligning mellom byer, v\u00e6rstatistikk med s\u00f8ylediagrammer og selvstendig skriving av v\u00e6rprognoser.',
    parentTakeaway: 'Gj\u00f8r v\u00e6ret til daglig vitenskap. Heng et termometer ved vinduet og la barnet lese av temperaturen hver morgen. F\u00f8r en v\u00e6rkalender p\u00e5 kj\u00f8leskapet med symboler. Tell soldager og regndager i m\u00e5neden og lag et s\u00f8ylediagram. V\u00e6robservasjon er barnets f\u00f8rste forskningsprosjekt.',
    classroomIntegration: 'V\u00e6rtemaet i 1. klasse kj\u00f8rer som et \u00e5rsprosjekt: daglig temperaturavlesing med klassens termometer, ukentlig v\u00e6rdiagram p\u00e5 tavla, mattetimen analyserer v\u00e6rdata, og norsktimen skriver v\u00e6rrapporter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, datainnsamling og skriving integreres i daglige rutiner.',
    assessmentRubric: [
      { skill: 'Temperaturlesing p\u00e5 termometer', emerging: 'leser temperatur i hele tier med st\u00f8tte', proficient: 'leser selvstendig temperatur p\u00e5 termometer og registrerer korrekt', advanced: 'sammenligner temperaturer mellom dager og forklarer forskjeller med tallspr\u00e5k' },
      { skill: 'V\u00e6rdatainnsamling med diagrammer', emerging: 'registrerer v\u00e6rdata i forh\u00e5ndslaget diagram med st\u00f8tte', proficient: 'fyller selvstendig ut strekdiagram over en uke og leser resultatet korrekt', advanced: 'oppretter egne diagrammer, trekker konklusjoner og sammenligner perioder' },
      { skill: 'V\u00e6rrapport-skriving', emerging: 'skriver 1\u20132 setninger om v\u00e6ret med st\u00f8tte', proficient: 'skriver selvstendig v\u00e6rrapport med dato, temperatur og beskrivelse', advanced: 'skriver v\u00e6rprognoser og sammenligner v\u00e6r mellom steder med faglig spr\u00e5k' },
    ],
  },

  winter: {
    snippetAnswer: 'Vinter-oppgaver for 1. klasse (6\u20137 \u00e5r) trener temperaturlesing under null, addisjon/subtraksjon med vinterkontekst og selvstendig skriving av vinterdagbok. Is, sn\u00f8 og kulde gir autentisk naturfag. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r vintertemaet naturfaglig og matematisk dybde \u2014 seks- og sju\u00e5ringer kan lese termometer med minusgrader (en forenklet introduksjon av negative tall), l\u00f8se vinterproblemer med addisjon og subtraksjon (8 sn\u00f8baller laget, 3 kastet, 5 nye laget = ?), og skrive vinterdagbok med temperatur og observasjoner. M\u00e5ling av sn\u00f8dybde i centimeter gir autentisk m\u00e5leerfaring. Sortering av vinterdyr (trekker s\u00f8rover, i dvale, aktive) kobler biologi til \u00e5rstidsforst\u00e5else. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Introduksjon av negative tall via temperatur (enkel forst\u00e5else av \u00abunder null\u00bb)', howWeAddress: 'Termometerark med minusgrader gir en f\u00f8rste, konkret forst\u00e5else av negative tall' },
      { milestone: 'M\u00e5ling av sn\u00f8dybde i centimeter (m\u00e5ling i utemilj\u00f8)', howWeAddress: 'Sn\u00f8m\u00e5lingsark der elevene m\u00e5ler sn\u00f8dybde med linjal og registrerer over tid gir autentisk m\u00e5ling' },
      { milestone: 'Dagbokskriving med v\u00e6rdata og naturobservasjoner', howWeAddress: 'Vinterdagbok-maler med felt for temperatur, sn\u00f8dybde og observasjon guider systematisk skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, hold temperatur over null, begrens til addisjon innenfor 10 med vinterbilder, og tilby dagboksider med setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes temperatursammenligning mellom uker, sn\u00f8dybdestatistikk med s\u00f8ylediagrammer og selvstendig skriving av vinterforskningsrapporter.',
    parentTakeaway: 'Vinteren er et utelaboratorium. M\u00e5l sn\u00f8dybden med linjal og skriv ned resultatet. Les termometeret sammen og snakk om minusgrader. Lag sn\u00f8ball-matteoppgaver ute. La barnet skrive vinterdagbok med tegning, temperatur og hva dere s\u00e5 \u2014 systematisk naturobservasjon bygger forskermentalitet.',
    classroomIntegration: 'Vintertemaet i 1. klasse kj\u00f8rer som et \u00e5rstidsprosjekt: daglig temperaturavlesing med termometer, ukentlig sn\u00f8m\u00e5ling, mattetimen l\u00f8ser vinterproblemer, naturfagstimen studerer is og dyrestrategier, og norsktimen skriver vinterdagbok. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, m\u00e5ling og skriving integreres i daglige vinterrutiner.',
    assessmentRubric: [
      { skill: 'Temperaturlesing med minusgrader', emerging: 'leser temperatur over null med st\u00f8tte', proficient: 'leser selvstendig temperatur b\u00e5de over og under null p\u00e5 termometer', advanced: 'sammenligner temperaturer, forklarer minusgrader og beregner temperaturforskjeller' },
      { skill: 'Sn\u00f8dybdem\u00e5ling i centimeter', emerging: 'm\u00e5ler sn\u00f8dybde med st\u00f8tte og oppgir omtrentlig verdi', proficient: 'm\u00e5ler selvstendig sn\u00f8dybde i hele centimeter og registrerer korrekt', advanced: 'sammenligner sn\u00f8dybder over tid og forklarer m\u00f8nstre med matematisk spr\u00e5k' },
      { skill: 'Vinterdagbok-skriving', emerging: 'skriver 1\u20132 setninger med st\u00f8tte fra mal', proficient: 'skriver selvstendig dagbokinnlegg med temperatur, sn\u00f8dybde og observasjon', advanced: 'f\u00f8rer systematisk vinterdagbok med trender, refleksjoner og naturfaglige forklaringer' },
    ],
  },

  xmas: {
    snippetAnswer: 'Jule-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon med gavebudsjett, adventskalendermatematikk med nedtelling og selvstendig skriving av julebrev og \u00f8nskeliste. Tradisjoner m\u00f8ter tall. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r juletemaet matematisk og skriftlig dybde \u2014 seks- og sju\u00e5ringer kan beregne gavepriser med addisjon og subtraksjon, bruke adventskalenderen til nedtellingsmatematikk (24 minus dager som har g\u00e5tt = dager igjen), og skrive julebrev med hilsen, innhold og avslutning. M\u00f8nstergjenkjenning i julepyntkjeder (r\u00f8d, gr\u00f8nn, gull, r\u00f8d, gr\u00f8nn, ?) bygger algebraisk tenkning. Julemarkedproblemer introduserer penger med reell kontekst. Selvstendig \u00f8nskelisteskriving trener funksjonell tekst. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, norsk og kultur i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Nedtellingsmatematikk (subtraksjon fra 24 som reell kontekst)', howWeAddress: 'Adventskalender-ark der elevene beregner gjenv\u00e6rende dager med subtraksjon gir meningsfull nedtelling' },
      { milestone: 'Prisberegning med gaver (addisjon av kronebel\u00f8p innenfor 100)', howWeAddress: 'Gavebudsjett-ark med prislapper trener addisjon og budsjettering med juleinnkj\u00f8pskontekst' },
      { milestone: 'Brevskriving med struktur (hilsen, innhold, avslutning)', howWeAddress: 'Julebrev-maler med felt for mottaker, \u00f8nsker og hilsen trener formelt brevformat' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens nedtelling til tierne (24, 20, 10), hold prisberegning innenfor 10 kr. med bildest\u00f8tte, og tilby brevmaler med setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes budsjettering av flere gaver, m\u00f8nsterdesign med tre eller flere elementer og selvstendig skriving av julefortellinger.',
    parentTakeaway: 'Julen er full av matematikk. Tell ned dagene til julaften med subtraksjon hver kveld. La barnet skrive \u00f8nskeliste og beregne totalpriser. Bruk julepyntlaging til \u00e5 \u00f8ve m\u00f8nstre (r\u00f8d, gr\u00f8nn, gull). Skriv julebrev til besteforeldre sammen \u2014 brevskriving er en ferdighet som varer livet ut.',
    classroomIntegration: 'Juletemaet i 1. klasse kj\u00f8rer som et desemberprosjekt: daglig adventsmatematikk med nedtelling, mattetimen l\u00f8ser gavebudsjettproblemer, norsktimen skriver julebrev og \u00f8nskelister, og kunsttimen lager julepynt med m\u00f8nstre. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, skriving og kulturforst\u00e5else integreres i julefeiringen.',
    assessmentRubric: [
      { skill: 'Nedtellingsmatematikk (advent)', emerging: 'teller ned fra 10 med st\u00f8tte', proficient: 'beregner selvstendig gjenv\u00e6rende dager fra 24 med subtraksjon', advanced: 'l\u00f8ser flertrinnsproblemer med dager, uker og m\u00e5neder og forklarer nedtellingen' },
      { skill: 'Gavebudsjett med addisjon', emerging: 'legger sammen to priser innenfor 10 kr. med st\u00f8tte', proficient: 'beregner selvstendig totalpriser p\u00e5 3\u20134 gaver innenfor 100 kr.', advanced: 'budsjettering med fast bel\u00f8p, vekslepenger og prioritering av \u00f8nsker' },
      { skill: 'Julebrev-skriving', emerging: 'skriver 1\u20132 setninger til en mottaker med st\u00f8tte', proficient: 'skriver selvstendig et julebrev med hilsen, innhold og avslutning', advanced: 'skriver julebrev og julefortellinger med detaljer, f\u00f8lelser og personlig stemme' },
    ],
  },

  zoo: {
    snippetAnswer: 'Dyrehage-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon med inngangsbilettkostnader, dyreklassifisering med tre kriterier og selvstendig skriving av dyrehagerapporter. Biologi og matematikk m\u00f8tes bak gjerdet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r dyrehagetemaet vitenskapelig og \u00f8konomisk dybde \u2014 seks- og sju\u00e5ringer kan klassifisere dyr etter tre kriterier (pattedyr/fugl/krypdyr, planteter/kj\u00f8tteter, habitat), beregne inngangspriser med addisjon, og skrive dyrehagerapporter med artsnavn, fakta og tegning. Flertrinnsproblemer som \u00ab15 aper i innhegningen, 4 g\u00e5r inn i hulen, 3 nye kommer ut \u2014 hvor mange ser vi?\u00bb trener sekvensiell beregning. M\u00e5ling av dyrest\u00f8rrelser i centimeter introduserer sammenlignende m\u00e5l. S\u00f8ylediagrammer over klassens favorittdyr gir datainnsamling. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Treklassifisering av dyr (type, kost, habitat)', howWeAddress: 'Sorteringsark med dyrehagens dyr som skal plasseres i tre dimensjoner bygger systematisk biologisk tenkning' },
      { milestone: 'Flertrinnsproblemer med dyrescenarier (dyr som kommer og g\u00e5r)', howWeAddress: 'Innhegningsscenarier med addisjon og subtraksjon i sekvens trener sekvensiell beregning med kontekst' },
      { milestone: 'Faglitter\u00e6r skriving med artsfakta (dyrehagerapport)', howWeAddress: 'Dyrehagerapport-maler med felt for artsnavn, utseende, kost og habitat guider faglitter\u00e6r skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til fem velkjente dyr, sortering etter \u00e9tt kriterium og addisjon innenfor 10 med bildest\u00f8tte. For avanserte elever i 1. klasse tilf\u00f8yes klassifisering med latinske undergrupper (primat, kattefamilien), flertrinnsproblemer med tre operasjoner og selvstendig skriving av sammenligningsrapporter mellom to arter.',
    parentTakeaway: 'Bes\u00f8k en dyrehage og gj\u00f8r det til en forskerdag: tell dyr i hver innhegning, merk av favoritter i et s\u00f8ylediagram, og la barnet skrive tre fakta om hvert dyr etter bes\u00f8ket. Beregn inngangspriser og kioskkostnader sammen. Dyrehagen er et levende klasserom \u2014 bruk oppgavearkene som forberedelse og oppf\u00f8lging.',
    classroomIntegration: 'Dyrehagetemaet i 1. klasse kj\u00f8rer som et naturfagsprosjekt: mattetimen l\u00f8ser dyrehageproblemer med addisjon og inngangspriser, naturfagstimen klassifiserer dyr etter kriterier, norsktimen skriver dyrehagerapporter, og kunsttimen tegner dyr fra observasjon. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og skriving integreres.',
    assessmentRubric: [
      { skill: 'Dyreklassifisering med tre kriterier', emerging: 'sorterer dyr i to grupper etter \u00e9n egenskap med st\u00f8tte', proficient: 'klassifiserer selvstendig etter tre kriterier og forklarer valget', advanced: 'oppretter egne klassifiseringssystemer med underkategorier og fagbegreper' },
      { skill: 'Flertrinnsproblemer (dyrehagekontekst)', emerging: 'l\u00f8ser etttrinnsproblemer innenfor 10 med bildest\u00f8tte', proficient: 'l\u00f8ser selvstendig totrinnsproblemer innenfor 20 med dyrescenarier', advanced: 'l\u00f8ser tretrinnsproblemer og formulerer egne dyrehagematteoppgaver' },
      { skill: 'Dyrehagerapport-skriving', emerging: 'skriver 1\u20132 fakta om et dyr med st\u00f8tte', proficient: 'skriver selvstendig en rapport med artsnavn, utseende, kost og habitat', advanced: 'skriver sammenligningsrapporter mellom to arter med faglige begreper' },
    ],
  },
};

// \u2500\u2500 helpers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

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

// \u2500\u2500 main loop \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

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
