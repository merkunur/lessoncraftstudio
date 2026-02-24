#!/usr/bin/env node
/**
 * SEO Part 230: DA Second-Grade Grade Enrichment \u2014 Themes 26-50
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the second-grade grade block of 25 DA theme files (insects through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  insects: {
    snippetAnswer: `Insekt-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner multiplikation med insektben og -grupper, systematisk artsbeskrivelse med fagtermer, dobbelte s\u00f8jlediagrammer med insektt\u00e6llingsdata og selvst\u00e6ndig skrivning af entomologiske forskningsrapporter. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse bliver insekttemaet et rigtigt forskningsprojekt \u2014 syv- og otte\u00e5rige kan gennemf\u00f8re systematiske insektt\u00e6llinger over tid, registrere data i dobbelte s\u00f8jlediagrammer og skrive entomologiske rapporter med indledning, metode og konklusion. Multiplikation med insektben (14 myrer \u00d7 6 ben = ?) giver funktionel ganget\u00e6nkning med store tal. M\u00e5ling af insekter i millimeter og centimeter med omregning tr\u00e6ner pr\u00e6cis m\u00e5ling. Systematisk artsbeskrivelse med bestemmelses n\u00f8gle (antal ben, vinger, f\u00f8lere) uddyber videnskabelig metode. Sammenligning af livscyklusser p\u00e5 tv\u00e6rs af arter (fuldst\u00e6ndig vs. ufuldst\u00e6ndig metamorfose) giver komparativ analyse. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig unders\u00f8gelse, data og rapportering i 2. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Multiplikation med insektdata (7\u20138-\u00e5rige anvender gentagen addition i st\u00f8rre tal)`, howWeAddress: `Insektben-opgaver (12 biller \u00d7 6 ben) og grupperingsoopgaver giver konkret multiplikation med autentiske data` },
      { milestone: `Systematisk artsbeskrivelse med bestemmelses n\u00f8gle (videnskabelig metode)`, howWeAddress: `Bestemmelses-ark med ja/nej-sp\u00f8rgsm\u00e5l om antal ben, vinger og f\u00f8lere tr\u00e6ner systematisk klassifikation` },
      { milestone: `Dobbelte s\u00f8jlediagrammer med insektdata (sammenligning over tid)`, howWeAddress: `Insektt\u00e6llings-diagrammer med to m\u00e5neders data giver sammenlignende dataanalyse i naturfagskontekst` },
      { milestone: `Entomologisk forskningsrapport (indledning, metode, konklusion)`, howWeAddress: `Forskningsrapport-skabeloner med tre sektioner guider eleverne fra dataindsamling til skriftlig rapportering` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold multiplikation i 2- og 5-tabellen, brug enkle s\u00f8jlediagrammer med tre arter, og tilbyd rapportskabeloner med s\u00e6tningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes multiplikation i 6-tabellen med insektben, tredobbelte diagrammer, sammenligning af fuldst\u00e6ndig og ufuldst\u00e6ndig metamorfose og selvst\u00e6ndig forskningsrapport med hypotese og konklusion.`,
    parentTakeaway: `G\u00e5 p\u00e5 insektjagt med forsttoerrelsesglas og dagbog: t\u00e6l insekter i haven to weekender i tr\u00e6k og lav et dobbelt s\u00f8jlediagram. Regn med ben: \u201d8 biller har 8 \u00d7 6 = 48 ben.\u201d Brug en bestemmelsesn\u00f8gle til at identificere arter. Lad barnet skrive en forskningsrapport med tegninger og data. Systematisk observation er den bedste naturvidenskabelige tr\u00e6ning.`,
    classroomIntegration: `Insekttemaet i 2. klasse k\u00f8rer som forskningsprojekt: naturfagstimen med insektt\u00e6llinger og bestemmelsesn\u00f8gler, matematiktimen med multiplikation og diagrammer, dansktimen med forskningsrapporter og pr\u00e6sentationer. Et klasseinsektarium med observationslogbog integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, data og rapportskrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Multiplikation med insektdata`, emerging: `l\u00f8ser gentagen addition (6+6+6) med konkreter og billedst\u00f8tte`, proficient: `skriver selvst\u00e6ndigt gentagen addition som gangestykke (5\u00d76=30) og l\u00f8ser insektbenopgaver`, advanced: `anvender multiplikation fleksibelt med st\u00f8rre tal og verificerer med gentagen addition` },
      { skill: `Systematisk artsbestemmelse`, emerging: `sorterer insekter i to grupper (insekt vs. edderkop) med st\u00f8tte`, proficient: `anvender selvst\u00e6ndigt en bestemmelsesn\u00f8gle med tre kriterier og navngiver 6+ arter`, advanced: `konstruerer egen bestemmelsesn\u00f8gle og h\u00e5ndterer gr\u00e6nsetilf\u00e6lde med begrundelse` },
      { skill: `Entomologisk forskningsrapport`, emerging: `skriver 3\u20134 faktas\u00e6tninger med st\u00f8tte fra skabelon og ordbank`, proficient: `skriver selvst\u00e6ndigt en rapport med indledning, data og konklusion`, advanced: `skriver en detaljeret rapport med hypotese, metode, resultater og perspektivering` },
    ],
  },

  jobs: {
    snippetAnswer: `Erhvervs-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner pengematematik med l\u00f8n og budget, tidsberegning med arbejdsdage, multiplikation med jobrelaterede tal og selvst\u00e6ndig skrivning af erhvervsbeskrivelser med argumentation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r erhvervstemaet \u00f8konomisk dybde \u2014 syv- og otte\u00e5rige kan beregne ugel\u00f8n (5 dage \u00d7 timel\u00f8n), l\u00e6gge budget for en arbejdsdag (transport + frokost + materialer) og sammenligne erhverv ud fra v\u00e6rkt\u00f8jer, uddannelse og arbejdssted. Multiplikation med erhvervstal (en bager laver 8 br\u00f8d \u00d7 5 dage = 40 br\u00f8d om ugen) giver funktionel ganget\u00e6nkning. Tidsberegning med arbejdstider (starter kl. 8, slutter kl. 16 \u2014 hvor mange timer?) tr\u00e6ner varighed. Erhvervsbeskrivelser med argumentation (\u201djeg vil v\u00e6re dyrl\u00e6ge, fordi...\u201d) styrker overbevisende tekst. Fakta vs. holdning skelnes i erhvervstekster. F\u00e6lles M\u00e5ls m\u00e5l for penge, tid og argumentation i 2. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Pengematematik med l\u00f8n og budget (7\u20138-\u00e5rige forst\u00e5r indt\u00e6gt og udgift)`, howWeAddress: `L\u00f8n- og budgetark, hvor eleverne beregner ugel\u00f8n, planl\u00e6gger udgifter og finder overskud` },
      { milestone: `Tidsberegning med arbejdstider (varighed i timer)`, howWeAddress: `Arbejdstids-ark, hvor eleverne beregner varighed fra start til slut og planl\u00e6gger en arbejdsdag` },
      { milestone: `Argumenterende erhvervsskrivning (p\u00e5stand + begrundelse)`, howWeAddress: `Dr\u00f8mmeerhverv-ark med rammer for \u201djeg \u00f8nsker at blive..., fordi...\u201d tr\u00e6ner skriftlig argumentation` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, brug runde tal i hele kroner, hold tidsberegning i hele timer, og tilbyd s\u00e6tningsstartere til erhvervsbeskrivelser. For avancerede elever i 2. klasse tilf\u00f8jes l\u00f8nberegning med \u00f8re, tidsberegning med halve timer, sammenlignende analyse af to erhverv og selvst\u00e6ndig argumenterende tekst med flere begrundelser.`,
    parentTakeaway: `Tal om erhverv i hverdagen: \u201dhvad tjener en l\u00e6rer om dagen? Hvad koster frokosten?\u201d Beregn arbejdstider: \u201dmor starter kl. 8 og slutter kl. 16 \u2014 hvor mange timer?\u201d Lad barnet skrive om sit dr\u00f8mmeerhverv med tre begrundelser. Interview en nabo om deres job. Erhvervstemaet g\u00f8r matematik og skrivning til virkelighedens f\u00e6rdigheder.`,
    classroomIntegration: `Erhvervstemaet i 2. klasse bruges som samfundsprojekt: matematik med l\u00f8n, budget og tidsberegning, dansk med erhvervsbeskrivelser og argumentation, samfundsfag med erhvervsroller og v\u00e6rkt\u00f8jer. G\u00e6stel\u00e6rere fra forskellige erhverv giver autentisk l\u00e6ring. F\u00e6lles M\u00e5ls m\u00e5l for penge, tid og skriftlig argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Pengematematik (l\u00f8n og budget)`, emerging: `adderer 2\u20133 poster med runde tal under 100 kr. med st\u00f8tte`, proficient: `beregner selvst\u00e6ndigt ugel\u00f8n, planl\u00e6gger budget og finder overskud/underskud`, advanced: `l\u00f8ser flertrins \u00f8konomiproblemer med sammenligning af to erhvervs indt\u00e6gt og udgift` },
      { skill: `Tidsberegning (arbejdstimer)`, emerging: `beregner varighed i hele timer med st\u00f8tte fra tallinje`, proficient: `beregner selvst\u00e6ndigt varighed med timer og halve timer og planl\u00e6gger en arbejdsdag`, advanced: `beregner med minutter, konverterer mellem analog og digital tid og l\u00f8ser komplekse tidsforl\u00f8b` },
      { skill: `Argumenterende erhvervsbeskrivelse`, emerging: `skriver 2\u20133 s\u00e6tninger med s\u00e6tningsstartere om et erhverv`, proficient: `skriver selvst\u00e6ndigt en beskrivelse med p\u00e5stand, begrundelse og eksempel`, advanced: `skriver en sammenlignende tekst om to erhverv med flere argumenter og perspektivering` },
    ],
  },

  music: {
    snippetAnswer: `Musik-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner br\u00f8ker med nodevaerdier, multiplikation med takter og instrumentgrupper, rytmem\u00f8nstre i notation og selvst\u00e6ndig skrivning af koncertanmeldelser med vurdering. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r musiktemaet matematisk og analytisk dybde \u2014 syv- og otte\u00e5rige kan forst\u00e5 br\u00f8ker gennem noder (hel, halv, kvart) og beregne taktarter. Multiplikation med instrumentgrupper (et orkester har 4 instrumentgrupper med 8 musikere = 32) giver ganget\u00e6nkning i kulturkontekst. Rytmem\u00f8nstre i notation (fjerdedel-fjerdedel-halvnode) tr\u00e6ner m\u00f8nstergenkendelse p\u00e5 avanceret niveau. Koncertanmeldelser med vurdering og begrundelse (\u201djeg synes, stykket var sp\u00e6ndende, fordi...\u201d) tr\u00e6ner argumenterende tekst. Sammenligning af instrumentfamilier med Venn-diagrammer styrker klassifikation. F\u00e6lles M\u00e5ls m\u00e5l for br\u00f8ker, m\u00f8nstre og argumentation i 2. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Br\u00f8kforst\u00e5else med nodevaerdier (7\u20138-\u00e5rige forst\u00e5r halv og kvart)`, howWeAddress: `Nodevaerdi-ark, hvor eleverne opdeler takter i hele, halve og kvarte noder og beregner varighed` },
      { milestone: `Multiplikation med instrumentgrupper (gentagen addition i orkesterkontekst)`, howWeAddress: `Orkester-opgaver (5 strygere \u00d7 4 pulte) giver multiplikation med kulturelt autentiske tal` },
      { milestone: `Argumenterende anmeldelse (vurdering + begrundelse)`, howWeAddress: `Koncertanmeldelses-ark med rammer for vurdering, begrundelse og anbefalingskonklusion` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns til halve og hele noder, hold multiplikation i 2- og 5-tabellen, og tilbyd s\u00e6tningsstartere til anmeldelser. For avancerede elever i 2. klasse tilf\u00f8jes kvart- og ottendedelsnoder, komponering af egne taktm\u00f8nstre, multiplikation i 4- og 8-tabellen og selvst\u00e6ndig anmeldelse med flere argumenter.`,
    parentTakeaway: `Lyt til musik sammen og tal om br\u00f8ker: \u201den halvnode varer halvdelen af en helnode \u2014 kan du klappe rytmen?\u201d T\u00e6l instrumenter i et orkesterbillede og gang op: \u201d4 grupper med 6 musikere.\u201d Lad barnet skrive en anmeldelse af en yndlingssang: \u201djeg kan lide den, fordi...\u201d Musik g\u00f8r matematik h\u00f8rbar og f\u00f8lbar.`,
    classroomIntegration: `Musiktemaet i 2. klasse integreres tv\u00e6rfagligt: matematik med br\u00f8ker og multiplikation via nodevaerdier, dansk med koncertanmeldelser og argumentation, musik med rytme\u00f8velser og instrumentkendskab. En klassekoncert med elevkompositioner giver autentisk performance. F\u00e6lles M\u00e5ls m\u00e5l for br\u00f8ker, m\u00f8nstre og skriftlig vurdering underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Br\u00f8ker med nodevaerdier`, emerging: `genkender hel- og halvnoder med billedst\u00f8tte`, proficient: `opdeler selvst\u00e6ndigt takter i hele, halve og kvartnoder og beregner varighed`, advanced: `komponerer egne taktm\u00f8nstre med blandede nodevaerdier og forklarer br\u00f8ksammenh\u00e6ngen` },
      { skill: `Multiplikation med instrumentgrupper`, emerging: `t\u00e6ller grupper ved gentagen addition (6+6+6) med billedst\u00f8tte`, proficient: `skriver selvst\u00e6ndigt gentagen addition som gangestykke og l\u00f8ser orkesteropgaver`, advanced: `anvender multiplikation fleksibelt og formulerer egne orkester-regneopgaver` },
      { skill: `Koncertanmeldelse med argumentation`, emerging: `skriver 2\u20133 s\u00e6tninger med s\u00e6tningsstartere om et musikstykke`, proficient: `skriver selvst\u00e6ndigt en anmeldelse med vurdering, begrundelse og anbefaling`, advanced: `skriver en detaljeret anmeldelse med flere argumenter, sammenligning og perspektivering` },
    ],
  },

  nature: {
    snippetAnswer: `Natur-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner m\u00e5ling med meter og centimeter i naturkontekst, dataindsamling med naturforskning, multiplikation med plantegrupper og selvst\u00e6ndig skrivning af naturforskningsrapporter med data og konklusion. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse bliver naturtemaet et systematisk forskningsprojekt \u2014 syv- og otte\u00e5rige kan m\u00e5le tr\u00e6h\u00f8jder med skygge og lineal, registrere vejrdata i dobbelte s\u00f8jlediagrammer og skrive strukturerede naturforskningsrapporter. Multiplikation med naturtal (6 tr\u00e6er med 5 fuglekasser = 30) giver ganget\u00e6nkning i \u00f8kologisk kontekst. M\u00e5ling med meter og centimeter af planter, blade og stammer giver pr\u00e6cis m\u00e5ling i felten. Sammenligning af \u00e5rstidsdata p\u00e5 tv\u00e6rs af to m\u00e5neder med diagrammer tr\u00e6ner dataanalyse. \u00d8kosystemforst\u00e5else (\u201dhvad sker der, hvis bierne forsvinder?\u201d) introducerer \u00e5rsag-virkning. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, m\u00e5ling og rapportering i 2. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `M\u00e5ling i felten med meter og centimeter (7\u20138-\u00e5rige m\u00e5ler natur genstande pr\u00e6cist)`, howWeAddress: `Naturm\u00e5lings-ark, hvor eleverne m\u00e5ler blade, grene og stammer og omregner cm til m` },
      { milestone: `Dataindsamling med dobbelte s\u00f8jlediagrammer (sammenligning over tid)`, howWeAddress: `Vejr- og naturdata-ark med to m\u00e5neders registrering og sammenlignende diagrammer` },
      { milestone: `Naturforskningsrapport med data og konklusion`, howWeAddress: `Rapport-skabeloner med indledning, data, analyse og konklusion guider struktureret naturfagsskrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, m\u00e5l kun i hele centimeter, brug enkle s\u00f8jlediagrammer med tre kategorier, og tilbyd rapportskabeloner med s\u00e6tningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes m\u00e5ling med millimeter, tredobbelte diagrammer med \u00e5rstidsdata, multiplikation i \u00f8kosystemkontekst og selvst\u00e6ndig forskningsrapport med hypotese og perspektivering.`,
    parentTakeaway: `G\u00f8r naturture til forskning: m\u00e5l blade med lineal, t\u00e6l fugle i tr\u00e6er og f\u00f8r en naturdagbog med data. Lav et dobbelt s\u00f8jlediagram over fugle i haven to weekender i tr\u00e6k. Regn med naturtal: \u201d4 tr\u00e6er med 3 fuglekasser \u2014 hvor mange i alt?\u201d Lad barnet skrive en naturforskningsrapport. Naturen er det bedste laboratorium.`,
    classroomIntegration: `Naturtemaet i 2. klasse k\u00f8rer som udeskole-forskningsprojekt: naturfag med feltobservation og \u00f8kosystemer, matematik med m\u00e5ling og datadiagrammer, dansk med forskningsrapporter og argumentation. En klassenatur-database opbygges l\u00f8bende. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig unders\u00f8gelse, m\u00e5ling og rapportering underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `M\u00e5ling i naturen (cm og m)`, emerging: `m\u00e5ler i hele centimeter med st\u00f8tte og lineal`, proficient: `m\u00e5ler selvst\u00e6ndigt i cm, omregner til m og sammenligner m\u00e5linger`, advanced: `m\u00e5ler pr\u00e6cist med mm, omregner fleksibelt og l\u00f8ser m\u00e5leproblemer i kontekst` },
      { skill: `Datadiagrammer med naturdata`, emerging: `afl\u00e6ser et enkelt s\u00f8jlediagram med st\u00f8tte`, proficient: `opretter og afl\u00e6ser selvst\u00e6ndigt dobbelte s\u00f8jlediagrammer og sammenligner data`, advanced: `analyserer tendenser over tid, formulerer konklusioner og foresl\u00e5r forklaringer` },
      { skill: `Naturforskningsrapport`, emerging: `skriver 3\u20134 faktas\u00e6tninger med skabelon og ordbank`, proficient: `skriver selvst\u00e6ndigt en rapport med indledning, data og konklusion`, advanced: `skriver en detaljeret rapport med hypotese, metode, resultater og perspektivering` },
    ],
  },

  numbers: {
    snippetAnswer: `Tal-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner positionsv\u00e6rdi til 1000, multiplikation og division, talm\u00f8nstre med tabelr\u00e6kker og selvst\u00e6ndig formulering af matematiske begrundelser. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse n\u00e5r taltemaet ny kompleksitet \u2014 syv- og otte\u00e5rige arbejder med positionsv\u00e6rdi til 1000 (hundreder, tiere, enere), mestrer tierovergang i addition og subtraktion inden for 100, og introduceres til multiplikation som gentagen addition og division som deling. Talm\u00f8nstre med tabelr\u00e6kker (2, 4, 6, 8... og 5, 10, 15, 20...) opbygger algebraisk t\u00e6nkning. Sammenligning og ordning af trecifrede tal tr\u00e6ner talforst\u00e5else. Tallinjen udvides til 1000 med spring af 10 og 100. Matematisk argumentation (\u201dhvorfor er 347 st\u00f8rre end 274?\u201d) tr\u00e6ner begrebsforst\u00e5else. F\u00e6lles M\u00e5ls m\u00e5l for positionsv\u00e6rdi, regnearter og talm\u00f8nstre i 2. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Positionsv\u00e6rdi til 1000 (7\u20138-\u00e5rige forst\u00e5r hundreder, tiere og enere)`, howWeAddress: `Positionsv\u00e6rdi-ark, hvor eleverne opdeler trecifrede tal, sammenligner og ordner med forst\u00e5else` },
      { milestone: `Multiplikation og division (begyndende gang og deling)`, howWeAddress: `Tabeltr\u00e6nings-ark med gentagen addition, gangestykker og delingsopgaver i visuelt format` },
      { milestone: `Talm\u00f8nstre og algebraisk t\u00e6nkning (tabelr\u00e6kker og m\u00f8nstre)`, howWeAddress: `M\u00f8nster-ark, hvor eleverne identificerer, udvider og forklarer talr\u00e6kker som 3, 6, 9, 12...` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold positionsv\u00e6rdi inden for 100, brug 2- og 5-tabellen med konkreter, og tilbyd forudfyldte tallinjer. For avancerede elever i 2. klasse tilf\u00f8jes positionsv\u00e6rdi til 1000 med omveksling, alle tabeller til 10, sammensatte talm\u00f8nstre og matematisk argumentation med skriftlig begrundelse.`,
    parentTakeaway: `\u00d8v positionsv\u00e6rdi i hverdagen: \u201dhvad betyder 3-tallet i 347?\u201d T\u00e6l i tabeller under k\u00f8returen: 2, 4, 6, 8... og 5, 10, 15, 20... L\u00f8s hverdagsopgaver: \u201d125 + 78 = ? Brug hundreder, tiere og enere.\u201d Spil \u201dhvilket tal er st\u00f8rst?\u201d med trecifrede tal. Talforst\u00e5else er fundamentet for al matematik.`,
    classroomIntegration: `Taltemaet i 2. klasse er matematikkens rygrad: positionsv\u00e6rdi-\u00f8velser i morgensamlingen, tabeltr\u00e6ning som daglig rutine, talm\u00f8nstre i probleml\u00f8sningssessioner og matematisk argumentation i diskussioner. Tallinjen p\u00e5 v\u00e6ggen udvides l\u00f8bende til 1000. F\u00e6lles M\u00e5ls m\u00e5l for positionsv\u00e6rdi, regnearter og m\u00f8nstre underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Positionsv\u00e6rdi til 1000`, emerging: `identificerer tiere og enere i tocifrede tal med st\u00f8tte`, proficient: `opdeler selvst\u00e6ndigt trecifrede tal i hundreder, tiere og enere og sammenligner`, advanced: `omveksler mellem positionsenheder, runder tal og forklarer positionsv\u00e6rdi med egne ord` },
      { skill: `Multiplikation og division`, emerging: `l\u00f8ser gentagen addition (3+3+3) med konkreter`, proficient: `skriver selvst\u00e6ndigt gangestykker i 2-, 5- og 10-tabellen og l\u00f8ser delingsopgaver`, advanced: `anvender tabelviden fleksibelt i kontekst og forklarer sammenh\u00e6ngen gang-deling` },
      { skill: `Talm\u00f8nstre og tabelr\u00e6kker`, emerging: `forts\u00e6tter enkle r\u00e6kker (2, 4, 6...) med st\u00f8tte`, proficient: `identificerer og udvider selvst\u00e6ndigt m\u00f8nstre i flere tabelr\u00e6kker`, advanced: `opdager m\u00f8nstre p\u00e5 tv\u00e6rs af tabeller, formulerer reglen og skaber egne talm\u00f8nstre` },
    ],
  },

  ocean: {
    snippetAnswer: `Hav-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner multiplikation med havdyrsgrupper, m\u00e5ling af dybde og afstand, dobbelte s\u00f8jlediagrammer med havdata og selvst\u00e6ndig skrivning af havforskningsrapporter med data og konklusion. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse bliver havtemaet et dybdeg\u00e5ende forskningsprojekt \u2014 syv- og otte\u00e5rige kan arbejde med dybdem\u00e5l i meter (Marianergraven: 11.034 m), multiplikation med havdyrsgrupper (en s\u00e6lkoloni med 8 grupper \u00e0 6 s\u00e6ler = 48) og dataanalyse med dobbelte s\u00f8jlediagrammer over havtemperaturer. Sammenligning af havdyrs st\u00f8rrelser i tabeller (blahval: 30 m, delfin: 3 m) giver proportional t\u00e6nkning. F\u00f8dekaedeforstaaelse (plankton \u2192 fisk \u2192 haj) introducerer systemtaenkning. Forskningsrapporter om havmilj\u00f8problemer (plastikforurening) traener argumenterende tekst med data. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, m\u00e5ling og argumentation i 2. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `M\u00e5ling med store tal i meter (7\u20138-\u00e5rige forst\u00e5r st\u00f8rrelsesforhold i havet)`, howWeAddress: `Havdybde- og dyrest\u00f8rrelses-ark, hvor eleverne sammenligner m\u00e5l i tabeller og p\u00e5 tallinjer` },
      { milestone: `Multiplikation med havdyrsgrupper (gentagen addition i havkontekst)`, howWeAddress: `Havdyrs-grupperingsark (7 stimer med 5 fisk) giver konkret multiplikation med autentiske data` },
      { milestone: `F\u00f8dek\u00e6deforst\u00e5else (systemt\u00e6nkning med \u00e5rsag-virkning)`, howWeAddress: `F\u00f8dek\u00e6de-ark, hvor eleverne ordner organismer i k\u00e6der og forudsiger konsekvenser af \u00e6ndringer` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold m\u00e5ling inden for 100, brug 2- og 5-tabellen med havdyr, og tilbyd forenklede f\u00f8dek\u00e6der med tre led. For avancerede elever i 2. klasse tilf\u00f8jes m\u00e5ling med tusinder (havdybder), multiplikation i 6- og 8-tabellen, komplekse f\u00f8dek\u00e6der med forgreninger og selvst\u00e6ndig rapport om havmilj\u00f8et.`,
    parentTakeaway: `Udforsk havet med matematik: \u201den blahval er 30 meter \u2014 hvor mange gange l\u00e6ngere er den end en delfin p\u00e5 3 meter?\u201d Lav en f\u00f8dek\u00e6de-plakat: plankton \u2192 fisk \u2192 s\u00e6l \u2192 haj. Regn med stimer: \u201d5 stimer med 8 fisk = ?\u201d Tal om plastikforurening og lad barnet skrive en havforskningsrapport. Havet vokser med matematikken.`,
    classroomIntegration: `Havtemaet i 2. klasse k\u00f8rer som milj\u00f8forskningsprojekt: naturfag med f\u00f8dek\u00e6der og havmilj\u00f8, matematik med m\u00e5ling og multiplikation, dansk med forskningsrapporter og argumentation om havbeskyttelse. Et klasseakvarium eller virtuelt havlaboratorium integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, m\u00e5ling og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `M\u00e5ling og st\u00f8rrelsessammenligning (havdyr)`, emerging: `sammenligner to havdyrs st\u00f8rrelser med st\u00f8tte fra billeder`, proficient: `sammenligner selvst\u00e6ndigt flere havdyr i tabeller og p\u00e5 tallinjer med metertal`, advanced: `beregner forskelle, finder proportioner og pr\u00e6senterer data i diagrammer` },
      { skill: `Multiplikation med havdyrsgrupper`, emerging: `l\u00f8ser gentagen addition (5+5+5) med billedst\u00f8tte`, proficient: `skriver selvst\u00e6ndigt gangestykker og l\u00f8ser opgaver i 2-, 5- og 10-tabellen med havdyr`, advanced: `anvender multiplikation fleksibelt med st\u00f8rre tal og formulerer egne havdyrsopgaver` },
      { skill: `Havforskningsrapport med data`, emerging: `skriver 3\u20134 faktas\u00e6tninger med skabelon om et havdyr`, proficient: `skriver selvst\u00e6ndigt en rapport med data, f\u00f8dek\u00e6de og konklusion`, advanced: `skriver en detaljeret rapport med milj\u00f8argumentation, data og l\u00f8sningsforslag` },
    ],
  },

  pets: {
    snippetAnswer: `K\u00e6ledyrs-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner pengematematik med k\u00e6ledyrsbudget, v\u00e6gt- og m\u00e5ling med dyredata, multiplikation med foderberegning og selvst\u00e6ndig skrivning af k\u00e6ledyrsplejeGuider med argumentation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r k\u00e6ledyrstemaet \u00f8konomisk og videnskabelig dybde \u2014 syv- og otte\u00e5rige kan beregne m\u00e5nedlige k\u00e6ledyrsomkostninger (foder + dyrl\u00e6ge + leget\u00f8j), m\u00e5le og veje k\u00e6ledyr i kilogram og centimeter, og registrere vaegtudvikling i diagrammer. Multiplikation med foderportioner (2 m\u00e5ltider \u00d7 7 dage = 14 portioner om ugen) giver hverdagsgange. Sammenligning af k\u00e6ledyrsracer med tabeller (vaegt, hoejde, levetid) traener dataanalyse. K\u00e6ledyrsplejeguider med argumentation (\u201det er vigtigt at g\u00e5 tur, fordi...\u201d) styrker overbevisende tekst. Ansvarstaenkning udvikles. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, penge og argumentation i 2. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Pengematematik med k\u00e6ledyrsbudget (7\u20138-\u00e5rige planlaegger m\u00e5nedlige udgifter)`, howWeAddress: `Budget-ark, hvor eleverne beregner foder, dyrl\u00e6ge og tilbeh\u00f8r og finder den samlede m\u00e5nedsomkostning` },
      { milestone: `M\u00e5ling med kg og cm (vej og m\u00e5l k\u00e6ledyr pr\u00e6cist)`, howWeAddress: `K\u00e6ledyrsdata-ark, hvor eleverne registrerer v\u00e6gt og l\u00e6ngde og sammenligner p\u00e5 tv\u00e6rs af racer` },
      { milestone: `Argumenterende plejeguide (p\u00e5stand + begrundelse om ansvar)`, howWeAddress: `Plejeguide-ark med rammer for \u201det er vigtigt at... fordi...\u201d tr\u00e6ner overbevisende tekst om k\u00e6ledyrspleje` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, brug runde tal i hele kroner, m\u00e5l kun i hele centimeter, og tilbyd s\u00e6tningsstartere til plejeguiden. For avancerede elever i 2. klasse tilf\u00f8jes budgettering med \u00f8re, m\u00e5ling med gram og millimeter, sammenlignende raceanalyse med flere kriterier og selvst\u00e6ndig argumentation for ansvarligt k\u00e6ledyrshold.`,
    parentTakeaway: `G\u00f8r k\u00e6ledyret til et mateprojekt: vej katten m\u00e5nedligt og f\u00f8r et v\u00e6gtdiagram. Beregn foderudgifter: \u201d2 d\u00e5ser om dagen \u00d7 7 dage = 14 d\u00e5ser om ugen. Hvad koster det?\u201d M\u00e5l hundens hoejde i centimeter. Lad barnet skrive en k\u00e6ledyrsplejeguide: \u201dhvorfor skal hunden luftes hver dag?\u201d K\u00e6ledyr er den mest personlige l\u00e6ringskontekst.`,
    classroomIntegration: `K\u00e6ledyrstemaet i 2. klasse bruges som ansvarsprojekt: matematik med budget, m\u00e5ling og multiplikation, naturfag med dyreracer og pleje, dansk med plejeguider og argumentation. G\u00e6stel\u00e6rer fra en dyrl\u00e6ge giver autentisk l\u00e6ring. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, penge og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `K\u00e6ledyrsbudget (penge)`, emerging: `adderer 2\u20133 poster med runde tal under 100 kr. med st\u00f8tte`, proficient: `planlaegger selvst\u00e6ndigt et m\u00e5nedsbudget med flere poster og finder totalen`, advanced: `sammenligner budgetter for to k\u00e6ledyrstyper og foresl\u00e5r besparelser med beregning` },
      { skill: `M\u00e5ling af k\u00e6ledyr (kg og cm)`, emerging: `m\u00e5ler med \u00e9n enhed med st\u00f8tte og runde tal`, proficient: `m\u00e5ler selvst\u00e6ndigt med kg og cm, registrerer i tabel og sammenligner`, advanced: `omregner mellem g og kg, sammenligner racer i diagrammer og drager konklusioner` },
      { skill: `K\u00e6ledyrsplejeguide med argumentation`, emerging: `skriver 2\u20133 s\u00e6tninger med s\u00e6tningsstartere om k\u00e6ledyrspleje`, proficient: `skriver selvst\u00e6ndigt en guide med p\u00e5stand, begrundelse og konkrete plejer\u00e5d`, advanced: `skriver en detaljeret guide med flere argumenter, sammenligning og perspektivering` },
    ],
  },

  pirates: {
    snippetAnswer: `Pirat-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner positionsvaerdi med skattebeloeb, kortnavigation med himmelretninger og afstand, multiplikation med mandskabstal og selvstaendig skrivning af pirateventyr med plotstruktur. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r pirattemaet avanceret matematisk og narrativ dybde \u2014 syv- og otte\u00e5rige kan navigere skattekort med koordinater og himmelretninger, beregne skattebeloeb med positionsvaerdi til 1000 (347 guldmoenter + 256 soelvmoenter = ?) og planlaegge rejseruter med afstandsberegning. Multiplikation med mandskab (4 skibe med 8 soemaend = 32) giver gangetaenkning i eventyrkontekst. Tidsberegning med rejsedage (sejler 12 dage, ankommer dag 15 \u2014 hvorn\u00e5r startede de?) tr\u00e6ner bagl\u00e6ns regning. Piratfortaellinger med plotstruktur (indledning, problem, loesning) traener narrativ skrivning. F\u00e6lles M\u00e5ls m\u00e5l for positionsvaerdi, navigation og narrativ skrivning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Kortnavigation med koordinater og himmelretninger (7\u20138-\u00e5rige orienterer sig p\u00e5 kort)`, howWeAddress: `Skattekort-ark med koordinatgitter og himmelretningspile, hvor eleverne planlaegger ruter og finder skatten` },
      { milestone: `Positionsvaerdi med store tal i eventyr (skattetal til 1000)`, howWeAddress: `Skatteberegnings-ark, hvor eleverne adderer og subtraherer trecifrede skattebeloeb med positionsforstaelse` },
      { milestone: `Narrativ skrivning med plotstruktur (indledning, problem, loesning)`, howWeAddress: `Pirateventyr-ark med tre-dels-struktur guider selvstaendig fortaelling med begyndelse, midte og slutning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug forenklede kort med fire felter, hold beregning inden for 100, og tilbyd plotskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes komplekse koordinatkort, positionsvaerdi til 1000 med omveksling, tidsberegning med dage og timer og selvstaendig piratfortaelling med flere kapitler.`,
    parentTakeaway: `Lav en skattejagt derhjemme med et kort og himmelretninger: \u201dg\u00e5 3 skridt nord, 2 skridt \u00f8st.\u201d Regn med skattetal: \u201d347 guldmoenter + 256 soelvmoenter = ?\u201d Gang mandskab op: \u201d4 skibe med 8 soemaend.\u201d Lad barnet skrive et pirateventyr med problem og loesning. Eventyret driver matematikken fremad.`,
    classroomIntegration: `Pirattemaet i 2. klasse k\u00f8rer som tv\u00e6rfagligt eventyrprojekt: matematik med positionsvaerdi og navigation, dansk med piratfortaellinger og plotstruktur, geografi med kort og himmelretninger. En klassepiratuge med skattejagt i skolegaarden giver autentisk laering. F\u00e6lles M\u00e5ls m\u00e5l for positionsvaerdi, navigation og narrativ skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Kortnavigation med himmelretninger`, emerging: `f\u00f8lger simple retningsangivelser (nord/syd) med stoette`, proficient: `navigerer selvstaendigt et koordinatkort med fire himmelretninger og finder m\u00e5let`, advanced: `planlaegger optimale ruter, beregner afstande og bruger koordinater praecist` },
      { skill: `Positionsvaerdi med skattetal`, emerging: `adderer tocifrede tal med stoette fra tallinje`, proficient: `adderer og subtraherer selvstaendigt trecifrede tal med tierovergang`, advanced: `l\u00f8ser flertrinsopgaver med trecifrede tal og forklarer positionsvaerdi strategien` },
      { skill: `Piratfortaelling med plotstruktur`, emerging: `skriver 3\u20134 saetninger med stoette fra skabelon`, proficient: `skriver selvstaendigt en fortaelling med indledning, problem og loesning`, advanced: `skriver en detaljeret fortaelling med flere karakterer, plot-vendinger og refleksion` },
    ],
  },

  robots: {
    snippetAnswer: `Robot-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner algoritmisk taenkning med flertrins-instruktioner, multiplikation med robotdele, geometriske former i robotdesign og selvstaendig skrivning af robotbygge-instruktioner. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r robottemaet programmeringslogik \u2014 syv- og otte\u00e5rige kan skrive flertrins-algoritmer (hvis-s\u00e5-ellers), designe robotter med geometriske former (rektangler, cirkler, trekanter) og beregne materialebehov med multiplikation. Algoritmisk sekventering med betingelser (\u201dhvis venstre er blokeret, drej hoejre\u201d) introducerer computational thinking. Multiplikation med robotdele (4 robotter med 6 sensorer = 24) giver gangetaenkning i teknologikontekst. Symmetri i robotdesign traener geometrisk forstaelse. Instruktionsskrivning med nummererede trin traener proceduretekst. F\u00e6lles M\u00e5ls m\u00e5l for geometri, algoritmer og proceduretekst i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Algoritmisk taenkning med betingelser (7\u20138-\u00e5rige forst\u00e5r hvis-s\u00e5-ellers)`, howWeAddress: `Robot-algoritme-ark med betingelsesdiagrammer, hvor eleverne planlaegger robothandlinger med forgreninger` },
      { milestone: `Geometriske former i design (rektangler, cirkler, trekanter i robotkontekst)`, howWeAddress: `Robotdesign-ark, hvor eleverne bygger robotter af geometriske former og beregner antal af hver type` },
      { milestone: `Proceduretekst med nummererede instruktioner`, howWeAddress: `Instruktions-ark, hvor eleverne skriver trinvise bygge- eller programmeringsvejledninger til en robot` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug lineaere algoritmer uden betingelser, begraens til tre geometriske former, og tilbyd nummererede skabeloner til instruktioner. For avancerede elever i 2. klasse tilf\u00f8jes algoritmer med to betingelser, sammensatte geometriske former, multiplikation med robotkomponenter og selvstaendig proceduretekst med fejlfinding.`,
    parentTakeaway: `Leg robot derhjemme: lad barnet skrive instruktioner, du foelger bogstaveligt (\u201dg\u00e5 3 skridt, drej venstre\u201d). Byg en robot af papkasser og taeel formerne: \u201dhvor mange rektangler brugte vi?\u201d Gang robotter op: \u201d3 robotter med 4 hjul = ?\u201d Lad barnet tegne sin droemme robot med symmetri. Robotter goer logisk taenkning sjov.`,
    classroomIntegration: `Robottemaet i 2. klasse integreres som teknologiprojekt: matematik med geometri og multiplikation, dansk med instruktionsskrivning, teknologi med algoritmisk taenkning og programmering. Et LEGO-robotprojekt eller paprobotvaerksted giver hands-on laering. F\u00e6lles M\u00e5ls m\u00e5l for geometri, algoritmer og proceduretekst underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Algoritmisk taenkning (robotprogrammering)`, emerging: `f\u00f8lger en trins algoritme med stoette`, proficient: `skriver selvstaendigt en algoritme med 4\u20135 trin og en betingelse (hvis-s\u00e5)`, advanced: `designer algoritmer med flere betingelser, finder fejl og optimerer instruktioner` },
      { skill: `Geometriske former i robotdesign`, emerging: `identificerer rektangler og cirkler i et robotdesign med stoette`, proficient: `designer selvstaendigt en robot af geometriske former og taeller antal af hver`, advanced: `beregner areal af robotdele, bruger symmetri og forklarer formvalg med geometriske begreber` },
      { skill: `Proceduretekst (robotinstruktioner)`, emerging: `skriver 2\u20133 nummererede trin med stoette`, proficient: `skriver selvstaendigt en klar instruktion med 5\u20136 trin og praecise angivelser`, advanced: `skriver detaljerede instruktioner med betingelser, fejlhaandtering og illustration` },
    ],
  },

  school: {
    snippetAnswer: `Skole-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner skemaberegning med tidsintervaller, statistik med klassedata, multiplikation med skolematerialer og selvstaendig skrivning af skolebeskrivelser med argumentation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r skoletemaet analytisk dybde \u2014 syv- og otte\u00e5rige kan beregne tidsintervaller i et skoleskema (dansk fra 8:00 til 9:30 = 1\u00bd time), indsamle og visualisere klassedata i soejlediagrammer (yndlingsfag, transportm\u00e5de til skole) og planlaegge et skoleprojekt med budget. Multiplikation med skolematerialer (28 elever med 3 boeger = 84) giver gangetaenkning i hverdagskontekst. Sammenligning af data p\u00e5 tvaers af klasser traener statistisk taenkning. Skolebeskrivelser med argumentation (\u201dmin yndlingsstund er..., fordi...\u201d) styrker overbevisende tekst. F\u00e6lles M\u00e5ls m\u00e5l for tid, data og argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Tidsberegning med skoleskema (7\u20138-\u00e5rige beregner varighed af lektioner)`, howWeAddress: `Skema-ark, hvor eleverne beregner lektioners varighed, pauser og den samlede skoledag` },
      { milestone: `Statistik med klassedata (indsamling og visualisering)`, howWeAddress: `Klasseundersoegelse-ark, hvor eleverne indsamler data, laver soejlediagrammer og analyserer resultater` },
      { milestone: `Argumenterende skolebeskrivelse (vurdering + begrundelse)`, howWeAddress: `Min-skole-ark med rammer for yndlingsfag, begrundelse og forbedringsforslag traener argumentation` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug hele timer i skemaet, hold diagrammer til tre kategorier, og tilbyd saetningsstartere til beskrivelser. For avancerede elever i 2. klasse tilf\u00f8jes beregning med halve og kvarte timer, dobbelte soejlediagrammer med sammenligning, multiplikation med materialebestilling og selvstaendig argumentation med flere perspektiver.`,
    parentTakeaway: `Brug skoledagen som matematik: \u201ddansk starter kl. 8 og slutter kl. 9:30 \u2014 hvor lang tid er det?\u201d Lav en undersoegelse i familien: \u201dhvad er alles yndlingsfag?\u201d og tegn et diagram. Gang materialer op: \u201d28 elever med 2 boeger = ?\u201d Lad barnet skrive om sin skole: \u201dhvad er bedst, og hvorfor?\u201d Skolen er den naermeste laeringsarena.`,
    classroomIntegration: `Skoletemaet i 2. klasse bruges som metaprojekt om laering: matematik med skemaberegning og klassestatistik, dansk med skolebeskrivelser og argumentation, samfundsfag med skoledemokrati og medbestemmelse. Klassens egen data bruges til autentisk statistik. F\u00e6lles M\u00e5ls m\u00e5l for tid, data og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Tidsberegning (skoleskema)`, emerging: `beregner varighed i hele timer med stoette fra ur`, proficient: `beregner selvstaendigt varighed med timer og halve timer og planlaegger en skoledag`, advanced: `beregner med kvarte timer, finder overlap og optimerer et skoleskema` },
      { skill: `Statistik med klassedata`, emerging: `aflaesser et enkelt soejlediagram med stoette og besvarer spoergsm\u00e5l`, proficient: `indsamler selvstaendigt data, laver soejlediagram og drager simple konklusioner`, advanced: `sammenligner datasaet, identificerer tendenser og praesenterer fund mundtligt` },
      { skill: `Argumenterende skolebeskrivelse`, emerging: `skriver 2\u20133 saetninger med saetningsstartere om skolen`, proficient: `skriver selvstaendigt en beskrivelse med vurdering, begrundelse og forbedringsforslag`, advanced: `skriver en detaljeret tekst med flere argumenter, modargumenter og konklusion` },
    ],
  },

  seasons: {
    snippetAnswer: `\u00c5rstids-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner temperaturm\u00e5ling og sammenligning, datadiagrammer med vejrobservationer, multiplikation med aarstidens kendetegn og selvstaendig skrivning af aarsbeskrivelser med kronologisk struktur. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r aarstidstemaet datavidenskabelig dybde \u2014 syv- og otte\u00e5rige kan aflaese termometre, registrere temperaturer i tabeller og oprette dobbelte soejlediagrammer der sammenligner to maaneder. Multiplikation med aarstidstal (12 traeer taber 8 blade hver = 96) giver gangetaenkning i naturkontekst. Beregning af dagslys-timer (solopgang til solnedgang) traener subtraktion med klokkeslaet. Aarsbeskrivelser med kronologisk struktur (foraar \u2192 sommer \u2192 efteraar \u2192 vinter) traener sekventiel faglitteraer skrivning. Sammenligning af danske aarstider med andre landes klimaer udvidder perspektivet. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, data og skrivning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Temperaturm\u00e5ling og registrering (7\u20138-\u00e5rige aflaesser termometre og foerer data)`, howWeAddress: `Vejrdata-ark, hvor eleverne aflaesser temperaturer, registrerer i tabeller og opretter diagrammer` },
      { milestone: `Dobbelte soejlediagrammer med vejrdata (sammenligning over tid)`, howWeAddress: `M\u00e5nedssammenlignings-ark med to soejler pr. uge giver visuel dataanalyse af aarstidsforandringer` },
      { milestone: `Kronologisk aarsbeskrivelse (sekventiel faglitteraer tekst)`, howWeAddress: `\u00c5rstidsrapport-ark med fire sektioner (for\u00e5r\u2013sommer\u2013efter\u00e5r\u2013vinter) guider struktureret helaarsskrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug afrundede temperaturer i hele grader, enkle soejlediagrammer med to kategorier, og tilbyd skriveskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes temperaturberegning med negative tal, tredobbelte diagrammer, dagslysllaengdeberegning og selvstaendig aarsbeskrivelse med klimasammenligning.`,
    parentTakeaway: `Foer en vejrdagbog: maal temperaturen hver morgen og tegn et diagram over en maaned. Sammenlign to maaneder: \u201dvar november koldere end oktober?\u201d Beregn dagslystimer: \u201dsolen staar op kl. 8 og gaar ned kl. 16 \u2014 hvor mange timers lys?\u201d Lad barnet skrive om alle fire aarstider. Vejret er den mest tilgaengelige datakildehed.`,
    classroomIntegration: `\u00c5rstidstemaet i 2. klasse koerer som helaarsprojekt: daglige vejrobservationer i matematik, maanedlige datadiagrammer, naturfag med aarstidsforandringer, dansk med aarsbeskrivelser og kronologisk skrivning. Et klassetemperaturdiagram p\u00e5 vaeggen vokser hele aaret. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, data og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Temperaturm\u00e5ling og data`, emerging: `aflaesser et termometer med stoette og noterer temperaturen`, proficient: `aflaesser selvstaendigt, registrerer i tabel og opretter soejlediagram over en uge`, advanced: `sammenligner temperaturer over tid, beregner gennemsnit og identificerer tendenser` },
      { skill: `Dobbelte soejlediagrammer (vejrdata)`, emerging: `aflaesser et enkelt diagram med stoette`, proficient: `opretter og aflaesser selvstaendigt dobbelte soejlediagrammer og sammenligner perioder`, advanced: `analyserer tendenser, formulerer konklusioner og foresl\u00e5r forklaringer med naturviden` },
      { skill: `Kronologisk aarsbeskrivelse`, emerging: `skriver 2\u20133 saetninger om en aarstid med stoette`, proficient: `skriver selvstaendigt om alle fire aarstider i kronologisk raekkefoelge med detaljer`, advanced: `skriver en detaljeret aarsbeskrivelse med klimadata, sammenligning og perspektivering` },
    ],
  },

  shapes: {
    snippetAnswer: `Form-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner areal og omkreds med rektangler, symmetri og spejling, sammensatte former og selvstaendig formulering af geometriske begrundelser. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse n\u00e5r formtemaet abstrakt geometrisk forstaelse \u2014 syv- og otte\u00e5rige kan beregne omkreds ved at laegge sidelangder sammen, forstaa areal som antallet af kvadrater i et gitter, og identificere symmetrilinjer i komplekse figurer. Sammensatte former (L-former, T-former) kr\u00e6ver opdeling i rektangler foer beregning. Spejling og drejning i koordinatgitter traener rumlig forstaelse. Multiplikation forbindes med areal (4 raekker med 5 kvadrater = 20). Geometrisk argumentation (\u201ddenne figur har to symmetrilinjer, fordi...\u201d) traener matematisk begrundelse. F\u00e6lles M\u00e5ls m\u00e5l for geometri, m\u00e5ling og matematisk argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Areal og omkreds (7\u20138-\u00e5rige beregner med rektangler og gitterkvadrater)`, howWeAddress: `Areal-og-omkreds-ark med gitterrektangler, hvor eleverne taeller kvadrater og adderer sider` },
      { milestone: `Symmetri og spejling (identifikation af symmetrilinjer i komplekse figurer)`, howWeAddress: `Symmetri-ark, hvor eleverne tegner symmetrilinjer, spejler figurer og kontrollerer med foldning` },
      { milestone: `Geometrisk argumentation (begrundelse med formegenskaber)`, howWeAddress: `Argumentations-ark, hvor eleverne forklarer, hvorfor en form har bestemte egenskaber med geometrisk sprog` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug enkle rektangler med gitterlinjer, begr\u00e6ns symmetri til lodrette linjer, og tilbyd formordbank. For avancerede elever i 2. klasse tilf\u00f8jes sammensatte former med arealberegning, flere symmetrilinjer, spejling i koordinatgitter og selvstaendig geometrisk argumentation.`,
    parentTakeaway: `Find former overalt: \u201dhvor mange rektangler kan du se i stuen? Hvad er omkredsen af bordet?\u201d Tegn figurer p\u00e5 gitterpapir og t\u00e6l kvadrater for at finde arealet. Fold papir for at finde symmetrilinjer. Spejl figurer med en lineal. Lad barnet forklare: \u201dhvorfor er dette et rektangel og ikke et kvadrat?\u201d Geometri er overalt.`,
    classroomIntegration: `Formtemaet i 2. klasse er geometriens kerne: areal-og-omkreds-oevelser med konkrete materialer, symmetri med foldning og spejle, sammensatte former med klippe-klistre, og geometrisk argumentation i matematiksamtaler. Et klasseformmuseum med elevernes fund integrerer geometri i hverdagen. F\u00e6lles M\u00e5ls m\u00e5l for geometri, m\u00e5ling og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Areal og omkreds`, emerging: `taeller kvadrater i et gitter med stoette for at finde areal`, proficient: `beregner selvstaendigt areal ved taelling og omkreds ved sideaddition for rektangler`, advanced: `beregner areal og omkreds af sammensatte former og forklarer strategien` },
      { skill: `Symmetri og spejling`, emerging: `identificerer \u00e9n symmetrilinje i enkle figurer med stoette`, proficient: `finder selvstaendigt symmetrilinjer og spejler figurer praecist`, advanced: `identificerer flere symmetrilinjer, spejler i koordinatgitter og forklarer symmetri med egne ord` },
      { skill: `Geometrisk argumentation`, emerging: `navngiver former med stoette (rektangel, trekant)`, proficient: `forklarer selvstaendigt formegenskaber (antal sider, vinkler, symmetri) med korrekte termer`, advanced: `argumenterer for klassifikation, finder ligheder og forskelle og haandterer graensetilfaelde` },
    ],
  },

  space: {
    snippetAnswer: `Rummet-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner store tal med planetafstande, multiplikation med rumfart\u00f8jsdata, tidsberegning med rumrejser og selvstaendig skrivning af rumforskningsrapporter med data og konklusion. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r rumtemaet matematisk storhed \u2014 syv- og otte\u00e5rige kan arbejde med store tal i planetkontekst (Jorden til Maanen: 384.400 km), sammenligne planetstoerrelser i tabeller og beregne rejsetider med division. Multiplikation med rumfartsdata (en raket med 6 motorer \u00d7 4 raketter = 24 motorer) giver gangetaenkning i teknologikontekst. Positionsvaerdi til 1000 forstaerkes med kosmiske tal. Planetsorterings-ark med flere kriterier (stoerrelse, afstand, temperatur) traener tabellaesning. Rumforskningsrapporter med data og konklusion traener faglitteraer skrivning. F\u00e6lles M\u00e5ls m\u00e5l for store tal, data og rapportering i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Store tal i kontekst (7\u20138-\u00e5rige forst\u00e5r tal ud over 1000 via rumkontekst)`, howWeAddress: `Planetdata-ark, hvor eleverne sammenligner afstande og stoerrelser i tabeller med store tal` },
      { milestone: `Multiplikation med rumfartsdata (gentagen addition i teknologikontekst)`, howWeAddress: `Rumfartoejes-ark (3 missioner med 4 astronauter) giver konkret multiplikation med rumtema` },
      { milestone: `Rumforskningsrapport med data og konklusion`, howWeAddress: `Planetforsknings-skabeloner med felter for data, sammenligning og konklusion guider struktureret rapportering` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold tal inden for 100, brug 2- og 5-tabellen med rumobjekter, og tilbyd forudfyldte planettabeller. For avancerede elever i 2. klasse tilf\u00f8jes tal til 10.000, multiplikation i flere tabeller, sammenligning af planeter med dobbelte soejlediagrammer og selvstaendig forskningsrapport med hypotese.`,
    parentTakeaway: `Udforsk rummet med tal: \u201dMaanen er 384.400 km vaek \u2014 hvilket tal er stoerst, Maanens afstand eller Solens?\u201d Sammenlign planeter: \u201dJupiter er 11 gange stoerre end Jorden.\u201d Gang rumfartstal: \u201d3 raketter med 5 astronauter = ?\u201d Lad barnet skrive en planetforskningsrapport. Rummets tal er de stoerste og mest fascinerende.`,
    classroomIntegration: `Rumtemaet i 2. klasse koerer som forskningsprojekt: matematik med store tal og multiplikation, naturfag med solsystemet og planeter, dansk med forskningsrapporter og praesentationer. Et klassesolsystem p\u00e5 vaeggen med skala vokser loebende. F\u00e6lles M\u00e5ls m\u00e5l for store tal, data og rapportering underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Store tal i rumkontekst`, emerging: `sammenligner to tal inden for 100 med stoette`, proficient: `sammenligner og ordner selvstaendigt trecifrede tal og forst\u00e5r positionsvaerdi til 1000`, advanced: `arbejder med tal over 1000, forklarer stoerrelsen og prasenterer i tabeller og diagrammer` },
      { skill: `Multiplikation med rumfartsdata`, emerging: `loser gentagen addition (4+4+4) med billedstoette`, proficient: `skriver selvstaendigt gangestykker og loeser rumfartsopgaver i 2-, 5- og 10-tabellen`, advanced: `anvender multiplikation fleksibelt med stoerre tal og formulerer egne rumfartsopgaver` },
      { skill: `Rumforskningsrapport`, emerging: `skriver 3\u20134 faktasaetninger om en planet med skabelon`, proficient: `skriver selvstaendigt en rapport med data, sammenligning og konklusion`, advanced: `skriver en detaljeret rapport med hypotese, data, analyse og perspektivering` },
    ],
  },

  sports: {
    snippetAnswer: `Sports-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner statistik med kampresultater, tidsmaaling med sportsrekorder, multiplikation med holdopstillinger og selvstaendig skrivning af sportskamprapporter med data og vurdering. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r sportstemaet dataanalytisk dybde \u2014 syv- og otte\u00e5rige kan foere statistik over kampresultater i tabeller, beregne gennemsnit med division, og oprette dobbelte soejlediagrammer der sammenligner to holds praestation. Multiplikation med holdtal (11 spillere \u00d7 2 hold = 22) giver gangetaenkning i sportskontekst. Tidsmaaling med sekunder og minutter (100 meter paa 15 sekunder vs. 18 sekunder \u2014 hvor stor forskel?) traener praecis tidsregning. Kamprapporter med data og vurdering (\u201dholdet vandt, fordi...\u201d) traener argumenterende tekst. F\u00e6lles M\u00e5ls m\u00e5l for data, tid og argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Statistik med kampresultater (7\u20138-\u00e5rige foerer data og analyserer)`, howWeAddress: `Kamptabel-ark, hvor eleverne registrerer resultater, beregner totaler og sammenligner holds praestation` },
      { milestone: `Tidsmaaling med sekunder og minutter (praecis sportskronometrering)`, howWeAddress: `Sportsrekord-ark, hvor eleverne sammenligner tider, beregner forskelle og sorterer resultater` },
      { milestone: `Kamprapport med data og argumentation`, howWeAddress: `Kamprapport-ark med rammer for resultat, statistik og vurdering traener datadrevet argumentation` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug enkle tabeller med tre hold, hele sekunder uden minutter, og tilbyd rapportskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes dobbelte soejlediagrammer, tidsberegning med minutter og sekunder, gennemsnitsberegning med division og selvstaendig kampanalyse med flere datapunkter.`,
    parentTakeaway: `Goer sport til matematik: foer statistik over familiespil (\u201dhvor mange maal scorede vi i alt p\u00e5 fem kampe?\u201d). Tidsmaaling med stopuret: \u201dhvor hurtigt loeber du 50 meter? Hvad er forskellen fra sidst?\u201d Gang holdtal op: \u201d11 spillere med 2 sokker = ?\u201d Lad barnet skrive en kamprapport med resultater. Sport driver engagement med tal.`,
    classroomIntegration: `Sportstemaet i 2. klasse integreres med idraet: matematik med kampstatistik og tidsmaaling, dansk med kamprapporter og argumentation, idraet med praestationsmaaling og fair play. En klasseturnering med statistikfoering giver autentisk dataarbejde. F\u00e6lles M\u00e5ls m\u00e5l for data, tid og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Statistik med kampresultater`, emerging: `aflaesser en kamptabel med stoette og besvarer spoergsm\u00e5l`, proficient: `registrerer selvstaendigt data i tabeller, beregner totaler og sammenligner hold`, advanced: `opretter dobbelte soejlediagrammer, beregner gennemsnit og drager konklusioner` },
      { skill: `Tidsmaaling (sekunder og minutter)`, emerging: `sammenligner to tider i hele sekunder med stoette`, proficient: `beregner selvstaendigt tidsforskelle i sekunder og sorterer resultater`, advanced: `beregner med minutter og sekunder, finder gennemsnit og analyserer praestation over tid` },
      { skill: `Kamprapport med argumentation`, emerging: `skriver 2\u20133 saetninger om en kamp med saetningsstartere`, proficient: `skriver selvstaendigt en rapport med resultat, data og vurdering`, advanced: `skriver en detaljeret analyse med statistik, argumentation og perspektivering` },
    ],
  },

  spring: {
    snippetAnswer: `For\u00e5rs-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner maaling af plantevakst, datadiagrammer med for\u00e5rsobservationer, multiplikation med froegrupper og selvstaendig skrivning af for\u00e5rsforskningsrapporter med data og konklusion. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r for\u00e5rstemaet forskningsmassig dybde \u2014 syv- og otte\u00e5rige kan registrere plantevakst over tid i tabeller, oprette linjegrafer der viser vakst pr. uge og skrive forskningsrapporter med data og konklusion. Multiplikation med for\u00e5rstal (6 urtepotter med 5 froe = 30) giver gangetaenkning i havekontekst. Maaling af kimplanter i centimeter og millimeter traener praecis maaling. Dagslyslaengde-beregning (solopgang kl. 6, solnedgang kl. 20 = 14 timer) styrker tidsmatematik. For\u00e5rsobservationer med dobbelte soejlediagrammer (denne uge vs. forrige uge) traener dataanalyse. F\u00e6lles M\u00e5ls m\u00e5l for maaling, data og rapportering i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Plantevakstmaaling over tid (7\u20138-\u00e5rige registrerer og visualiserer vakst)`, howWeAddress: `Vakstdagbogs-ark, hvor eleverne maaler kimplanter ugentligt og tegner en vakstgraf` },
      { milestone: `Dobbelte soejlediagrammer med for\u00e5rsdata (sammenligning uge for uge)`, howWeAddress: `For\u00e5rsobservations-ark med to soejler pr. kategori giver sammenlignende dataanalyse` },
      { milestone: `For\u00e5rsforskningsrapport med data og konklusion`, howWeAddress: `Rapport-skabeloner med felter for hypotese, data og konklusion guider struktureret naturforskningsskrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, maal kun i hele centimeter, brug enkle soejlediagrammer, og tilbyd rapportskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes maaling med millimeter, linjegrafer, dagslysberegning og selvstaendig forskningsrapport med hypotese og perspektivering.`,
    parentTakeaway: `Plant froee derhjemme og foer en vakstdagbog: maal kimplanten hver uge og tegn en graf. Beregn dagslys: \u201dsolen staar op kl. 6 og gaar ned kl. 20 \u2014 14 timers lys!\u201d Gang for\u00e5rstal: \u201d6 urtepotter med 4 froe = ?\u201d Lad barnet skrive en for\u00e5rsrapport med data. For\u00e5ret er det bedste tidspunkt for naturforskning.`,
    classroomIntegration: `For\u00e5rstemaet i 2. klasse koerer som vakstprojekt: naturfag med froesaaning og observation, matematik med maaling og datadiagrammer, dansk med forskningsrapporter og praesentationer. Et klassevaksthus eller vindueskarm-laboratorium giver daglige observationer. F\u00e6lles M\u00e5ls m\u00e5l for maaling, data og rapportering underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Plantevakstmaaling`, emerging: `maaler i hele centimeter med stoette og noterer`, proficient: `maaler selvstaendigt praecist i cm, registrerer i tabel og tegner en vakstgraf`, advanced: `maaler med mm, sammenligner flere planter og analyserer vakstmoenstre` },
      { skill: `Dobbelte soejlediagrammer (for\u00e5rsdata)`, emerging: `aflaesser et enkelt diagram med stoette`, proficient: `opretter og aflaesser selvstaendigt dobbelte diagrammer og sammenligner uger`, advanced: `analyserer tendenser, formulerer konklusioner og foresl\u00e5r forklaringer` },
      { skill: `For\u00e5rsforskningsrapport`, emerging: `skriver 3\u20134 saetninger med skabelon om for\u00e5ret`, proficient: `skriver selvstaendigt en rapport med data, observation og konklusion`, advanced: `skriver en detaljeret rapport med hypotese, metode, resultater og perspektivering` },
    ],
  },

  summer: {
    snippetAnswer: `Sommer-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner pengematematik med feriebudget, tidsberegning med sommeraktiviteter, multiplikation med ferietal og selvstaendig skrivning af feriebeskrivelser med kronologisk struktur. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r sommertemaet oekonomisk og analytisk dybde \u2014 syv- og otte\u00e5rige kan planlaegge et feriebudget med flercifret addition (overnatning 450 kr. + mad 300 kr. + aktiviteter 250 kr. = 1000 kr.), beregne rejsetider og udforske afstande p\u00e5 kort. Multiplikation med ferietal (5 dage med 3 aktiviteter = 15) giver gangetaenkning i ferierkontekst. Temperatursammenligninger mellem danske sommerdage og sydlige destinationer traener dataanalyse. Feriebeskrivelser med kronologisk struktur (dag 1, dag 2...) traener sekventiel skrivning. Fakta vs. holdning i feriereklamer traener kritisk laesning. F\u00e6lles M\u00e5ls m\u00e5l for penge, tid og skrivning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Pengematematik med feriebudget (7\u20138-\u00e5rige planlaegger flerpostbudgetter)`, howWeAddress: `Feriebudget-ark, hvor eleverne adderer overnatning, mad og aktiviteter og finder totalen` },
      { milestone: `Tidsberegning med rejse og aktiviteter (varighed i timer)`, howWeAddress: `Ferieplan-ark, hvor eleverne beregner rejsetid, aktivitetsvarighed og dagsprogram` },
      { milestone: `Kronologisk feriebeskrivelse (sekventiel skrivning med dagsstruktur)`, howWeAddress: `Feriedagbogs-ark med dag-for-dag-skabelon guider kronologisk skrivning med detaljer` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold budget under 100 kr. med runde tal, brug hele timer til tidsberegning, og tilbyd dagbogsskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes flercifret budgettering med oere, tidsberegning med halve timer, afstandsberegning p\u00e5 kort og selvstaendig feriebeskrivelse med vurdering.`,
    parentTakeaway: `Planlaeg sommerferien som matematik: \u201dhvad koster 5 dage p\u00e5 camping? 5 \u00d7 150 kr. = 750 kr.\u201d Beregn rejsetid: \u201dvi koerer 3 timer \u2014 hvornaar er vi fremme?\u201d Lad barnet foere feriedagbog med dato, aktiviteter og udgifter. Sammenlign temperaturer: \u201dhjemme 22\u00b0C, i Spanien 35\u00b0C \u2014 hvor stor forskel?\u201d Ferien er det bedste matematikeventyr.`,
    classroomIntegration: `Sommertemaet i 2. klasse bruges foer sommerferien: matematik med feriebudget og tidsberegning, dansk med feriebeskrivelser og dagboger, geografi med rejsem\u00e5l og kort. Et klasserejseprojekt med virtuelle destinationer giver autentisk laering. F\u00e6lles M\u00e5ls m\u00e5l for penge, tid og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Pengematematik (feriebudget)`, emerging: `adderer 2\u20133 poster med runde tal under 100 kr. med stoette`, proficient: `planlaegger selvstaendigt et flerdages feriebudget med flercifret addition`, advanced: `optimerer et budget med begraensninger, sammenligner destinationer og foresl\u00e5r besparelser` },
      { skill: `Tidsberegning (ferieplan)`, emerging: `beregner varighed i hele timer med stoette`, proficient: `beregner selvstaendigt rejsetid og aktivitetsvarighed og planlaegger et dagsprogram`, advanced: `beregner med halve timer, finder overlap og optimerer en ferieplan` },
      { skill: `Kronologisk feriebeskrivelse`, emerging: `skriver 2\u20133 saetninger om \u00e9n feriedag med stoette`, proficient: `skriver selvstaendigt en kronologisk beskrivelse af flere feriedage med detaljer`, advanced: `skriver en detaljeret feriedagbog med vurdering, sammenligning og refleksion` },
    ],
  },

  superheroes: {
    snippetAnswer: `Superhelte-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner multiplikation med superkraefter, flertrins-tekstopgaver med heroisk tematik, m\u00f8nstergenkendelse i heltekoder og selvstaendig skrivning af superheltehistorier med plotstruktur. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r superheltetemaet avanceret matematisk og narrativ dybde \u2014 syv- og otte\u00e5rige kan l\u00f8se flertrins-tekstopgaver med superhelte (en helt redder 8 mennesker \u00d7 3 missioner = 24), afkode hemmelige m\u00f8nstre i talkoder og designe superhelte med geometriske former. Positionsvaerdi med store superheltepoint (347 + 256 = 603) giver regning med trecifrede tal. Tidsberegning med missionsvarighed (mission start kl. 14, varighed 2\u00bd time) traener klokken. Superheltehistorier med plotstruktur (problem, plan, handling, resultat) traener avanceret narrativ skrivning. F\u00e6lles M\u00e5ls m\u00e5l for multiplikation, m\u00f8nstre og narrativ skrivning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Flertrins-tekstopgaver (7\u20138-\u00e5rige l\u00f8ser opgaver med flere regneoperationer)`, howWeAddress: `Superhelte-missionsark med to-trins opgaver (f\u00f8rst multiplikation, derefter addition) traener flertrinstaenkning` },
      { milestone: `M\u00f8nstergenkendelse med talkoder (afkodning af sekvenser)`, howWeAddress: `Hemmelig-kode-ark med talmoenstre, hvor eleverne finder reglen og afkoder superheltens besked` },
      { milestone: `Narrativ skrivning med plotstruktur (problem, plan, handling, resultat)`, howWeAddress: `Superhelte-historieark med fire-dels plotskabelon guider avanceret fortaelling med spaending og loesning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold opgaver inden for 50, brug enkle talmoenstre, og tilbyd plotskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes trecifrede flertrinsopgaver, komplekse talkoder med to regler og selvstaendig superheltefortaelling med flere kapitler og karakterudvikling.`,
    parentTakeaway: `Leg superhelt med matematik: \u201ddu redder 6 mennesker pr. mission \u2014 hvor mange p\u00e5 4 missioner?\u201d Lav hemmelige talkoder: 3, 6, 9, ? Tegn en superhelt med geometriske former og t\u00e6l dem. Lad barnet skrive en superheltehistorie med et problem og en loesning. Superhelte g\u00f8r matematik modig og skrivning sp\u00e6ndende.`,
    classroomIntegration: `Superheltetemaet i 2. klasse koerer som kreativt projekt: matematik med multiplikation og talkoder, dansk med superheltehistorier og plotstruktur, kunst med superheltedesign og geometri. En klassesuperhelte-antologi samler alles historier. F\u00e6lles M\u00e5ls m\u00e5l for multiplikation, m\u00f8nstre og narrativ skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Flertrins-tekstopgaver (superhelte)`, emerging: `loser \u00e9n-trins opgaver med multiplikation med stoette`, proficient: `loser selvstaendigt to-trins opgaver med multiplikation og addition/subtraktion`, advanced: `formulerer egne flertrinsopgaver og verificerer med alternative strategier` },
      { skill: `M\u00f8nstergenkendelse (talkoder)`, emerging: `fortsaetter enkle moenstre (+2, +5) med stoette`, proficient: `afkoder selvstaendigt talmoenstre med \u00e9n regel og forudsiger naeste tal`, advanced: `afkoder moenstre med to regler, formulerer reglen og skaber egne koder` },
      { skill: `Superheltehistorie med plotstruktur`, emerging: `skriver 3\u20134 saetninger med stoette fra skabelon`, proficient: `skriver selvstaendigt en fortaelling med problem, plan, handling og resultat`, advanced: `skriver en detaljeret historie med flere karakterer, spaending og refleksion` },
    ],
  },

  toys: {
    snippetAnswer: `Leget\u00f8js-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner pengematematik med leget\u00f8jsbutik, sammensatte former i leget\u00f8jsdesign, multiplikation med leget\u00f8jssamlinger og selvstaendig skrivning af leget\u00f8jsanmeldelser med argumentation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r leget\u00f8jstemaet oekonomisk og analytisk dybde \u2014 syv- og otte\u00e5rige kan beregne priser i en leget\u00f8jsbutik med flercifret addition, planlaegg et oenskeseddelbudget og sammenligne tilbud. Multiplikation med leget\u00f8jssamlinger (4 saet med 6 brikker = 24) giver gangetaenkning i samlingskontekst. Geometriske former i leget\u00f8jsdesign (LEGO-modeller best\u00e5r af rektangler og cylindre) traener formgenkendelse. Leget\u00f8jsanmeldelser med vurdering og argumentation (\u201djeg giver 4 ud af 5 stjerner, fordi...\u201d) traener overbevisende tekst. Fakta vs. holdning i reklamer traener kritisk laesning. F\u00e6lles M\u00e5ls m\u00e5l for penge, geometri og argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Pengematematik med leget\u00f8jspriser (7\u20138-\u00e5rige beregner flercifrede priser)`, howWeAddress: `Leget\u00f8jsbutik-ark, hvor eleverne adderer priser, sammenligner tilbud og finder byttepenge` },
      { milestone: `Multiplikation med leget\u00f8jssamlinger (saet og brikker)`, howWeAddress: `Samlings-ark (5 pakker med 8 kort) giver multiplikation som gentagen addition i leget\u00f8jskontekst` },
      { milestone: `Argumenterende anmeldelse med vurdering (stjerner + begrundelse)`, howWeAddress: `Anmeldelses-ark med stjernevurdering og rammer for begrundelse traener overbevisende tekst` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold priser under 100 kr. med runde tal, brug 2- og 5-tabellen, og tilbyd anmeldelsesskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes flercifrede priser med oere, multiplikation i flere tabeller, prissammenligning med procent og selvstaendig anmeldelse med flere kriterier.`,
    parentTakeaway: `Goer leget\u00f8jsbutikken til matematik: \u201dhvis du har 200 kr. \u2014 hvad kan du koebe?\u201d Sammenlign priser: \u201dhvilket tilbud er bedst?\u201d Gang samlinger op: \u201d4 pakker med 6 kort = ?\u201d Lad barnet skrive en anmeldelse af sit yndlingslegetoej: \u201dhvor mange stjerner giver du, og hvorfor?\u201d Leget\u00f8j goer matematik relevant og sjov.`,
    classroomIntegration: `Leget\u00f8jstemaet i 2. klasse bruges som oekonomiprojekt: matematik med priser og multiplikation, dansk med anmeldelser og argumentation, kunst med leget\u00f8jsdesign og geometri. En klasseleget\u00f8jsbutik med prisskilte giver autentisk pengematematik. F\u00e6lles M\u00e5ls m\u00e5l for penge, geometri og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Pengematematik (leget\u00f8jsbutik)`, emerging: `adderer 2\u20133 priser under 50 kr. med stoette`, proficient: `beregner selvstaendigt flercifrede priser, finder byttepenge og sammenligner tilbud`, advanced: `optimerer indkoeb inden for et budget og forklarer valg med beregning` },
      { skill: `Multiplikation med leget\u00f8jssamlinger`, emerging: `loser gentagen addition (6+6+6) med billedstoette`, proficient: `skriver selvstaendigt gangestykker og loser samlings-opgaver i flere tabeller`, advanced: `anvender multiplikation fleksibelt, formulerer egne opgaver og verificerer` },
      { skill: `Leget\u00f8jsanmeldelse med argumentation`, emerging: `skriver 2\u20133 saetninger med saetningsstartere og stjernevurdering`, proficient: `skriver selvstaendigt en anmeldelse med vurdering, begrundelse og anbefaling`, advanced: `skriver en detaljeret anmeldelse med flere kriterier, sammenligning og perspektivering` },
    ],
  },

  transportation: {
    snippetAnswer: `Transport-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner afstandsberegning med kilometertal, tidsberegning med rejseplaner, multiplikation med passagertal og selvstaendig skrivning af rejsebeskrivelser med kronologisk struktur. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r transporttemaet funktionel matematik \u2014 syv- og otte\u00e5rige kan beregne afstande p\u00e5 kort med kilometertal, planlaegge rejser med koereplaner (toget afgaar kl. 10:15, ankomst kl. 11:45 \u2014 rejsetid?), og sammenligne transportmidlers hastighed i tabeller. Multiplikation med passagertal (3 busser med 40 passagerer = 120) giver gangetaenkning med store tal. Billet-prisberegning med zoner og rabatter traener pengematematik. Rejsebeskrivelser med kronologisk struktur traener sekventiel skrivning. Miljoesammenligning (CO2 fra bil vs. tog) introducerer baeredygtighedstaenkning. F\u00e6lles M\u00e5ls m\u00e5l for maaling, penge og skrivning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Afstandsberegning med kilometer (7\u20138-\u00e5rige laesser kort med afstandsangivelser)`, howWeAddress: `Kort-ark, hvor eleverne maaler afstande, sammenligner ruter og beregner total rejselangde` },
      { milestone: `Tidsberegning med koereplaner (afgang, ankomst, rejsetid)`, howWeAddress: `Koerreplans-ark, hvor eleverne aflaesser togtider, beregner rejsevarighed og planlaegger forbindelser` },
      { milestone: `Kronologisk rejsebeskrivelse (sekventiel tekst med transporttrin)`, howWeAddress: `Rejsedagbogs-ark med kronologisk skabelon guider sekventiel skrivning med transportdetaljer` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug afrundede afstande, hele timer i koereplaner, og tilbyd rejseskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes praecise kilometertal, koerreplaner med minutter, prisberegning med zoner og selvstaendig rejseplan med miljoevurdering.`,
    parentTakeaway: `Goer rejser til matematik: \u201dhvor langt er der til farmor? 120 km. Hvis vi koerer 80 km i timen, hvor lang tid tager det?\u201d Aflaes koereplaner p\u00e5 stationen: \u201dtoget afgaar kl. 10:15 og ankommer kl. 11:45.\u201d Lad barnet foere rejsedagbog med transportmidler og tider. Sammenlign priser: \u201dhvad er billigst \u2014 bus eller tog?\u201d Transport er hverdagsmatematik.`,
    classroomIntegration: `Transporttemaet i 2. klasse bruges som rejseprojekt: matematik med afstand, tid og priser, dansk med rejsebeskrivelser og koereplaner, geografi med kort og ruter, naturfag med miljoepaavirkning. Et klassens rejseprojekt med virtuelle destinationer giver autentisk laering. F\u00e6lles M\u00e5ls m\u00e5l for maaling, penge og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Afstandsberegning (kort)`, emerging: `aflaesser enkle afstande p\u00e5 kort med stoette`, proficient: `beregner selvstaendigt afstande, sammenligner ruter og finder total rejselaengde`, advanced: `optimerer ruter, beregner tid fra afstand og hastighed og praesenterer i tabeller` },
      { skill: `Tidsberegning (koereplaner)`, emerging: `aflaesser hele timer i en koerrplan med stoette`, proficient: `beregner selvstaendigt rejsetid fra afgang/ankomst og planlaegger forbindelser`, advanced: `planlaegger komplekse rejser med skift, ventetid og total rejsetid i timer og minutter` },
      { skill: `Kronologisk rejsebeskrivelse`, emerging: `skriver 2\u20133 saetninger om en rejse med stoette`, proficient: `skriver selvstaendigt en kronologisk rejsebeskrivelse med transportdetaljer og tider`, advanced: `skriver en detaljeret rejsedagbog med vurdering, prissammenligning og refleksion` },
    ],
  },

  travel: {
    snippetAnswer: `Rejse-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner valutaomregning med enkle tal, afstandsberegning med verdenskort, multiplikation med rejsedata og selvstaendig skrivning af rejseguider med faktuelle informationer. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r rejsetemaet global og oekonomisk dimension \u2014 syv- og otte\u00e5rige kan sammenligne afstande p\u00e5 verdenskort, beregne rejsebudgetter i danske kroner og introduceres til enkle valutaforhold (1 euro \u2248 7 kr.). Multiplikation med rejsedata (5 overnatninger \u00d7 400 kr. = 2000 kr.) giver gangetaenkning med store tal. Tidsforskelle mellem lande (\u201di Japan er klokken 8 timer foran\u201d) traener tidsmatematik. Rejseguider med faktuelle informationer om klima, kultur og mad traener faglitteraer skrivning. Sammenligning af lande i tabeller styrker dataanalyse. F\u00e6lles M\u00e5ls m\u00e5l for penge, geografi og skrivning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Enkle valutaberegninger (7\u20138-\u00e5rige forst\u00e5r at penge har forskellig vaerdi i lande)`, howWeAddress: `Valuta-ark, hvor eleverne omregner enkle beloeb mellem kroner og euro med en fast kurs` },
      { milestone: `Afstandssammenligning p\u00e5 verdenskort (global skala)`, howWeAddress: `Verdenskort-ark, hvor eleverne sammenligner afstande til forskellige destinationer og ordner dem` },
      { milestone: `Faglitteraer rejseguide (faktuel tekst med struktur)`, howWeAddress: `Rejseguide-ark med felter for klima, mad, sprog og sevaerdigheder guider struktureret fagskrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold beregninger i hele kroner under 100, brug forenklede kort med f\u00e5 destinationer, og tilbyd guideskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes valutaomregning med multiplikation, praecise afstande i tusinder af kilometer, tidszoneberegning og selvstaendig rejseguide med sammenligning af to lande.`,
    parentTakeaway: `Planlaeg en fantasirejse: \u201dhvor langt er der til Japan? Hvad koster flybilletten?\u201d Omregn valuta: \u201d10 euro er ca. 75 kr. \u2014 hvad koster en is til 2 euro?\u201d Sammenlign tidszoner: \u201dhvad er klokken i New York nu?\u201d Lad barnet skrive en rejseguide om sit droemmerejsemaal. Rejser aabner verden for matematik og geografi.`,
    classroomIntegration: `Rejsetemaet i 2. klasse bruges som verdensprojekt: matematik med valuta og afstand, dansk med rejseguider og faglitteraer skrivning, geografi med verdenskort og kulturer. Et virtuelt klasserejseprojekt med en ny destination hver uge giver global bevidsthed. F\u00e6lles M\u00e5ls m\u00e5l for penge, geografi og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Valuta og pengematematik (rejse)`, emerging: `sammenligner to priser i hele kroner med stoette`, proficient: `omregner selvstaendigt enkle beloeb mellem valutaer og beregner rejsebudget`, advanced: `loser flertrins valutaopgaver, sammenligner rejseomkostninger og optimerer budget` },
      { skill: `Afstandsberegning (verdenskort)`, emerging: `peger p\u00e5 lande paa kortet og sammenligner to afstande med stoette`, proficient: `ordner selvstaendigt destinationer efter afstand og sammenligner i tabel`, advanced: `beregner rejsetid fra afstand, sammenligner ruter og praesenterer i diagrammer` },
      { skill: `Faglitteraer rejseguide`, emerging: `skriver 3\u20134 faktas\u00e6tninger med skabelon om et land`, proficient: `skriver selvstaendigt en rejseguide med klima, mad, sprog og sevaerdigheder`, advanced: `skriver en sammenlignende guide om to lande med data, tabeller og vurdering` },
    ],
  },

  vegetables: {
    snippetAnswer: `Groentsags-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner maaling med gram og kilogram, multiplikation med hoestaetal, datadiagrammer med groentsagsproduktion og selvstaendig skrivning af opskrifter med praecise maaleenheder. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r groentsagstemaet maale- og datavidenskabelig dybde \u2014 syv- og otte\u00e5rige kan veje groentsager i gram og kilogram, omregne mellem enhederne (1 kg = 1000 g), og registrere hoestaetal i dobbelte soejlediagrammer. Multiplikation med hoestdata (4 raekker med 8 guleroeeder = 32) giver gangetaenkning i havekontekst. Opskriftslasning med praecise maal (250 g mel, 2 dl vand) traener funktionel maaling. Sammenligning af groentsagers naeringsindhold i tabeller styrker datalaesning. Opskriftskrivning med nummererede trin og maaleenheder traener proceduretekst. F\u00e6lles M\u00e5ls m\u00e5l for maaling, data og proceduretekst i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Maaling med gram og kilogram (7\u20138-\u00e5rige vejer og omregner)`, howWeAddress: `Groentsagsvaegt-ark, hvor eleverne vejer groentsager, registrerer i gram og omregner til kg` },
      { milestone: `Multiplikation med hoestaetal (gentagen addition i havekontekst)`, howWeAddress: `Hoesteberegnings-ark (6 planter med 5 tomater) giver multiplikation med autentiske havetal` },
      { milestone: `Proceduretekst med maaleenheder (opskriftskrivning)`, howWeAddress: `Opskrifts-ark, hvor eleverne skriver trinvise instruktioner med praecise gram- og literangivelser` },
    ],
    differentiationNotes: `For elever der har brug for stoette, vej kun i hele kilogram, hold multiplikation i 2- og 5-tabellen, og tilbyd opskriftskabeloner med udfyldte maal. For avancerede elever i 2. klasse tilf\u00f8jes vejning med gram, omregning kg\u2194g, dobbelte hoestaediagrammer og selvstaendig opskriftudvikling med naeringsberegning.`,
    parentTakeaway: `Goer koekkennet til laboratorium: vej groentsager med koekkenvaegt (\u201d3 guleroeeder vejer 450 g \u2014 er det mere eller mindre end \u00bd kg?\u201d). Gang hoesttal: \u201d4 tomatplanter med 6 tomater = ?\u201d Lad barnet skrive en opskrift med praecise maal. Sammenlign naeringsindhold p\u00e5 pakker. Groentsager goer maaling og matematik spiselig.`,
    classroomIntegration: `Groentsagstemaet i 2. klasse bruges som have-og-koekken-projekt: matematik med vejning og multiplikation, naturfag med plantevaekst og naering, dansk med opskriftskrivning og proceduretekst. Et klassekoekken eller skolehaveprojekt giver autentisk laering. F\u00e6lles M\u00e5ls m\u00e5l for maaling, data og proceduretekst underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Maaling med gram og kilogram`, emerging: `vejer i hele kilogram med stoette og koekkenvaegt`, proficient: `vejer selvstaendigt i gram og kilogram, omregner og sammenligner`, advanced: `omregner fleksibelt mellem g og kg, loser maaleproblemmer og forklarer enheder` },
      { skill: `Multiplikation med hoestaetal`, emerging: `loser gentagen addition (5+5+5) med billedstoette`, proficient: `skriver selvstaendigt gangestykker og loser hoestopgaver i flere tabeller`, advanced: `anvender multiplikation fleksibelt med stoerre hoesttal og formulerer egne opgaver` },
      { skill: `Opskriftskrivning med maaleenheder`, emerging: `skriver 2\u20133 nummererede trin med stoette og forudfyldte maal`, proficient: `skriver selvstaendigt en komplet opskrift med praecise maaleenheder og klar raekkefoelge`, advanced: `udvikler en original opskrift med omregning til flere portioner og naeringsberegning` },
    ],
  },

  weather: {
    snippetAnswer: `Vejr-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner temperaturaflaesning med negative tal, datadiagrammer med vejrobservationer, multiplikation med nedborsdata og selvstaendig skrivning af vejrrapporter med data og forudsigelser. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r vejrtemaet meteorologisk dybde \u2014 syv- og otte\u00e5rige kan aflaese termometre med negative tal (vintertemperaturer under 0\u00b0C), oprette dobbelte soejlediagrammer med ugentlige vejrdata og forstaa vejrfaenomener som nedbor, vind og lufttryk. Multiplikation med vejrdata (7 dage \u00d7 3 mm regn = 21 mm pr. uge) giver gangetaenkning i naturkontekst. Sammenligning af vejr mellem byer i tabeller traener dataanalyse. Vejrrapporter med data og forudsigelser traener faglitteraer skrivning med argumentation. Vandkredslobet forklarer nedborsmoenstre. F\u00e6lles M\u00e5ls m\u00e5l for maaling, data og rapportering i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Temperaturaflaesning med negative tal (7\u20138-\u00e5rige forst\u00e5r tal under nul)`, howWeAddress: `Termometer-ark med vintertemperaturer, hvor eleverne aflaesser, sammenligner og beregner forskelle` },
      { milestone: `Dobbelte soejlediagrammer med vejrdata (sammenligning over tid)`, howWeAddress: `Ugentlige vejrdata-ark med to soejler giver sammenlignende analyse af temperatur og nedbor` },
      { milestone: `Vejrrapport med data og forudsigelse`, howWeAddress: `Vejrrapport-ark med felter for data, analyse og forudsigelse guider meteorologisk skrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold temperaturer over nul, brug enkle diagrammer med tre dage, og tilbyd rapportskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes negative tal, ugediagrammer med temperatur og nedbor, beregning af gennemsnittemperatur og selvstaendig vejrrapport med vandkredslobet.`,
    parentTakeaway: `Foer en vejrdagbog: aflaes termometeret hver morgen og noter. Lav et ugediagram: \u201dmandag 5\u00b0C, tirsdag 3\u00b0C, onsdag -1\u00b0C \u2014 hvorn\u00e5r var det koldest?\u201d Beregn nedbor: \u201d3 mm regn om dagen \u00d7 7 dage = ?\u201d Lad barnet skrive en vejrrapport som en meteorolog. Vejret er den mest tilgaengelige naturvidenskab.`,
    classroomIntegration: `Vejrtemaet i 2. klasse koerer som meteorologiprojekt: daglige vejrobservationer med termometer og regnmaaler, ugentlige datadiagrammer i matematik, naturfag med vandkredslobet, dansk med vejrrapporter. En klassevejrstation med daglig opdatering giver autentisk laering. F\u00e6lles M\u00e5ls m\u00e5l for maaling, data og rapportering underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Temperaturaflaesning (inkl. negative tal)`, emerging: `aflaesser positive temperaturer p\u00e5 et termometer med stoette`, proficient: `aflaesser selvstaendigt positive og negative temperaturer og beregner forskelle`, advanced: `beregner gennemsnit, sammenligner byer og forstaar temperaturtendenser` },
      { skill: `Dobbelte soejlediagrammer (vejrdata)`, emerging: `aflaesser et enkelt vejrdiagram med stoette`, proficient: `opretter og aflaesser selvstaendigt dobbelte soejlediagrammer med temperatur eller nedbor`, advanced: `kombinerer temperatur og nedbor i \u00e9t diagram, analyserer sammenaenge og formulerer konklusioner` },
      { skill: `Vejrrapport med forudsigelse`, emerging: `skriver 2\u20133 saetninger om dagens vejr med stoette`, proficient: `skriver selvstaendigt en vejrrapport med data, analyse og forudsigelse for i morgen`, advanced: `skriver en detaljeret rapport med ugedata, vandkredslobet og langsigtet tendens` },
    ],
  },

  winter: {
    snippetAnswer: `Vinter-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner beregning med negative temperaturer, m\u00e5ling med sne og is, multiplikation med vinteraktiviteter og selvstaendig skrivning af vinterbeskrivelser med sansedetaljer. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r vintertemaet naturvidenskabelig og matematisk dybde \u2014 syv- og otte\u00e5rige kan arbejde med negative tal p\u00e5 termometre (\u201dhvis det var -3\u00b0C i morges og -7\u00b0C nu, hvor meget koldere er det?\u201d), m\u00e5le snedybde i centimeter og is-tykkelse med omregning. Multiplikation med vintertal (6 snefnug-m\u00f8nstre \u00d7 8 = 48 symmetriske former) giver gangetaenkning i naturkontekst. Dagslysberegning i december (7 timers lys) sammenlignes med juni (17 timer) \u2014 differensen traener subtraktion. Vinterbeskrivelser med sansedetaljer (syn, hoersel, foersel) traener deskriptiv skrivning. F\u00e6lles M\u00e5ls m\u00e5l for negative tal, maaling og deskriptiv skrivning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Negative tal p\u00e5 termometeret (7\u20138-\u00e5rige forst\u00e5r temperatur under nul)`, howWeAddress: `Vintertemperatur-ark, hvor eleverne aflaesser, sammenligner og beregner forskelle med negative tal` },
      { milestone: `M\u00e5ling af sne og is (centimeter med omregning)`, howWeAddress: `Snemaaling-ark, hvor eleverne m\u00e5ler snedybde ugentligt og tegner et maalings-diagram` },
      { milestone: `Deskriptiv vinterskrivning med sansedetaljer`, howWeAddress: `Vinterbeskrivelses-ark med rammer for syn, lyd, foersel, lugt og smag guider sansedrevet skrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold temperaturer ved enkle negative tal (-1 til -5), m\u00e5l kun i hele centimeter, og tilbyd sanseskabeloner med ordbanker. For avancerede elever i 2. klasse tilf\u00f8jes beregning med negative tal, omregning cm\u2194m med snedybde, dagslyslaengde-analyse og selvstaendig vinterfortaelling med sanse- og stemningsdetaljer.`,
    parentTakeaway: `G\u00f8r vinteren til matematik: aflaes termometeret (\u201d-5\u00b0C i dag \u2014 er det koldere end i g\u00e5r?\u201d). M\u00e5l sne med lineal: \u201d15 cm sne \u2014 er det mere end sidst?\u201d Beregn dagslys: \u201dsolen staar op kl. 8:30 og gaar ned kl. 15:30 \u2014 hvor mange timer?\u201d Lad barnet skrive om vinteren med alle sanser. Vinteren goer matematik haandgribelig og skrivning levende.`,
    classroomIntegration: `Vintertemaet i 2. klasse koerer som aarstidsprojekt: matematik med negative tal og maaling, naturfag med vandets tilstandsformer og dagslys, dansk med vinterbeskrivelser og sansepoesi. Udendoers snemaaling og temperaturregistrering giver daglig autentisk matematik. F\u00e6lles M\u00e5ls m\u00e5l for negative tal, maaling og deskriptiv skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Negative tal (temperatur)`, emerging: `aflaesser -1 til -5 p\u00e5 termometer med stoette`, proficient: `aflaesser selvstaendigt negative temperaturer, sammenligner og beregner forskelle`, advanced: `beregner med negative tal i kontekst, finder temperaturfald og forklarer med egne ord` },
      { skill: `Maaling af sne/is (cm)`, emerging: `maaler i hele centimeter med stoette og lineal`, proficient: `maaler selvstaendigt praecist, registrerer i tabel og tegner maalingsdiagram`, advanced: `omregner cm\u2194m, sammenligner ugentlige maalinger og analyserer moenstre` },
      { skill: `Deskriptiv vinterskrivning`, emerging: `skriver 2\u20133 saetninger med \u00e9n sans med stoette`, proficient: `skriver selvstaendigt en vinterbeskrivelse med mindst tre sanser og levende detaljer`, advanced: `skriver en stemningsfuld tekst med alle sanser, billedsprog og refleksion` },
    ],
  },

  xmas: {
    snippetAnswer: `Jule-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner pengematematik med juleindkoeb, tidsberegning med julekalender og festplan, multiplikation med julegaver og selvstaendig skrivning af juleopskrifter og -fortaellinger. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r juletemaet oekonomisk og tidsmassig dybde \u2014 syv- og otte\u00e5rige kan planlaegge juleindkoeb med budget (gaveliste med priser, addere totalen, finde overskud), beregne dage til juleaften med nedtaelling og planlaegge julens tidsforloeb. Multiplikation med julegaver (4 familiemedlemmer \u00d7 3 gaver = 12) giver gangetaenkning i festkontekst. Br\u00f8ker i opskrifter (\u00bd kg mel, \u00bc l maelk) traener praecis maaling. Julefortaellinger med plotstruktur og stemning traener narrativ skrivning. Juletraditiones sammenligning p\u00e5 tvaers af lande traener faktuel tekst. F\u00e6lles M\u00e5ls m\u00e5l for penge, tid og skrivning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Pengematematik med julebudget (7\u20138-\u00e5rige planlaegger indkoeb med flerecifrede tal)`, howWeAddress: `Juleindkoebs-ark, hvor eleverne pricer gaver, adderer totalen og holder budgettet` },
      { milestone: `Tidsberegning med julekalender (nedtaelling og tidsforloeb)`, howWeAddress: `Julekalender-ark med nedtaelling, datoberegning og planlaegning af julens aktiviteter dag for dag` },
      { milestone: `Narrativ juleskrivning med stemning og plotstruktur`, howWeAddress: `Julefortaellings-ark med plotskabelon og stemnings-ordbank guider levende og struktureret skrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold budget under 100 kr. med runde tal, brug hele dage i nedtaelling, og tilbyd fortaellingsskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes flercifret budgettering med oere, tidsberegning med timer og minutter, br\u00f8ker i opskrifter og selvstaendig julefortaelling med stemning og refleksion.`,
    parentTakeaway: `G\u00f8r julen til matematik: lav en gaveliste med priser (\u201d4 gaver \u00d7 75 kr. = 300 kr. \u2014 raekker budgettet?\u201d). T\u00e6l ned til juleaften: \u201dhvor mange dage endnu?\u201d Bag julekager med maaleenheder: \u201d\u00bd kg mel, 250 g smorge.\u201d Lad barnet skrive en julefortaelling eller juleopskrift. Julen er aarets bedste matematik- og skrivevaerksted.`,
    classroomIntegration: `Juletemaet i 2. klasse bruges som decemberprojekt: matematik med julebudget og opskriftmaaling, dansk med julefortaellinger og opskrifter, kultur med juletraditioner fra forskellige lande. En julebasar med prisberegning giver autentisk pengematematik. F\u00e6lles M\u00e5ls m\u00e5l for penge, tid og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Pengematematik (julebudget)`, emerging: `adderer 2\u20133 priser under 50 kr. med stoette`, proficient: `planlaegger selvstaendigt et julebudget med flercifret addition og finder rest/overskud`, advanced: `optimerer indkoeb med begraensninger, sammenligner tilbud og foresl\u00e5r besparelser` },
      { skill: `Tidsberegning (julekalender)`, emerging: `taeller dage til juleaften med stoette`, proficient: `beregner selvstaendigt dage, planlaegger aktiviteter og laver et tidsforloeb`, advanced: `planlaegger julens program med timer og minutter, finder overlap og optimerer` },
      { skill: `Julefortaelling med stemning`, emerging: `skriver 3\u20134 saetninger med stoette fra skabelon`, proficient: `skriver selvstaendigt en julefortaelling med plotstruktur og stemningsord`, advanced: `skriver en detaljeret fortaelling med stemning, billedsprog, dialog og refleksion` },
    ],
  },

  zoo: {
    snippetAnswer: `Zoo-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner kortlaesning med afstandsberegning, multiplikation med dyregrupper og besoegstal, dobbelte soejlediagrammer med zoo-statistik og selvstaendig skrivning af dyreforskningsrapporter med data og bevaringsargument. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse f\u00e5r zootemaet dataanalytisk og geografisk dybde \u2014 syv- og otte\u00e5rige kan navigere zoo-kort med afstandsberegning i meter, beregne besoegstal med multiplikation (350 gaester \u00d7 5 dage = 1750 om ugen) og oprette dobbelte soejlediagrammer der sammenligner dyrebestande i to aar. Venn-diagrammer med dyresammenligning p\u00e5 tvaers af flere egenskaber (kontinent, foedevalg, kropsdaekke) traener avanceret klassifikation. Bevaringsrapporter med fakta og argument (\u201dvi boer beskytte isbjornen, fordi...\u201d) traener overbevisende faglitteraer tekst. Billetprisberegning med familierabat traener pengematematik. F\u00e6lles M\u00e5ls m\u00e5l for data, penge og argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Kortlaesning med afstandsberegning (7\u20138-\u00e5rige beregner meter mellem indhegninger)`, howWeAddress: `Zoo-kort-ark med afstandsnoegle, hvor eleverne planlaegger ruter og beregner total gangafstand` },
      { milestone: `Multiplikation med besoegs- og dyredata (store tal i zoo-kontekst)`, howWeAddress: `Besoegsberegnings-ark (350 gaester pr. dag \u00d7 antal dage) giver multiplikation med autentiske zoo-tal` },
      { milestone: `Bevaringsrapport med fakta og argumentation`, howWeAddress: `Bevarings-ark med rammer for truet art, fakta, argument og handlingsforslag traener overbevisende fagtekst` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug forenklede zoo-kort med fire omraader, hold multiplikation i 2- og 5-tabellen, og tilbyd bevaringssskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes detaljerede kort med afstandsberegning, multiplikation med trecifrede tal, dobbelte soejlediagrammer og selvstaendig bevaringsrapport med multiple datakilder.`,
    parentTakeaway: `Naeste gang I besoeget zooen, tag et kort med: \u201dhvor langt er der fra aberne til pingvinerne? 200 meter + 150 meter = ?\u201d T\u00e6l dyr i indhegningen og gang op: \u201d4 familier med 3 unge = ?\u201d Tal om truede arter: \u201dhvorfor er det vigtigt at beskytte dem?\u201d Lad barnet skrive en bevaringsrapport. Zooen er matematik, naturfag og empati i \u00e9n oplevelse.`,
    classroomIntegration: `Zootemaet i 2. klasse koerer som bevarings- og dataprojekt: matematik med kortberegning og multiplikation, naturfag med dyreklassifikation og bevaring, dansk med bevaringsrapporter og argumentation. En klasseadoption af et truet dyr giver autentisk engagement. F\u00e6lles M\u00e5ls m\u00e5l for data, penge og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Kortlaesning med afstandsberegning (zoo)`, emerging: `peger p\u00e5 omraader p\u00e5 zoo-kortet med stoette`, proficient: `navigerer selvstaendigt, beregner afstande i meter og planlaegger en rute`, advanced: `optimerer ruter, beregner totalafstand og praesenterer i tabel med begrundelse` },
      { skill: `Multiplikation med zoo-data`, emerging: `loser gentagen addition (5+5+5) med billedstoette`, proficient: `skriver selvstaendigt gangestykker og loser besoegs- og dyredata-opgaver`, advanced: `anvender multiplikation med trecifrede tal og formulerer egne zoo-regneopgaver` },
      { skill: `Bevaringsrapport med argumentation`, emerging: `skriver 2\u20133 saetninger om et truet dyr med stoette`, proficient: `skriver selvstaendigt en rapport med fakta, argument og handlingsforslag`, advanced: `skriver en detaljeret rapport med data fra flere kilder, modargumenter og perspektivering` },
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
  const filePath = path.join(THEMES_DIR, theme, 'da.ts');
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
    console.error(`MISSING GRADE BLOCKS: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  // Check if snippetAnswer already exists in second-grade block
  const secondGradeBlock = content.substring(secondGradeIdx, thirdGradeIdx);
  if (secondGradeBlock.includes('snippetAnswer')) {
    console.log(`SKIP (already enriched): ${theme}/da.ts`);
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
    console.error(`NO FAQ END FOUND: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = secondGradeIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/da.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
