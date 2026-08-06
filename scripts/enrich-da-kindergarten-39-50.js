#!/usr/bin/env node
/**
 * SEO Part 225: DA Kindergarten Grade Enrichment — Themes 39-50
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the kindergarten grade block of 12 DA theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    snippetAnswer: `Sport-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 20, addition/subtraktion inden for 10, holdsamarbejde og begyndende l\u00e6sning af idr\u00e6tsord som bold, m\u00e5l og hold. Regler og fairplay-begreber introduceres. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Sporttemaet blomstrer i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige for f\u00f8rste gang forst\u00e5r regler, turtagning og retf\u00e6rdighed \u2014 de kan spille organiserede spil med f\u00e6lles spilleregler i stedet for f\u00f8rskolens frie bev\u00e6gelsesleg. Denne kognitive modenhed g\u00f8r det muligt at bruge sportscenarier som autentiske matematikkontekster: t\u00e6lling af point i to halvlege, addition af m\u00e5l (4+3), subtraktion af spillere der g\u00e5r ud (8\u20132) og sammenligning af holdst\u00f8rrelser. L\u00e6sning af idr\u00e6tsord p\u00e5 3\u20136 bogstaver (bold, m\u00e5l, hold, l\u00f8b) tr\u00e6ner l\u00e6sefundamentet med h\u00f8j motivation. M\u00f8nstergenkendelse i tr\u00f8jenumre og holdfarvesekvenser opbygger algebraisk t\u00e6nkning. F\u00e6lles M\u00e5ls m\u00e5l for matematik, bev\u00e6gelse og sociale f\u00e6rdigheder m\u00f8des i \u00e9t dynamisk tema.`,
    developmentalMilestones: [
      { milestone: `Addition og subtraktion inden for 10 med pointt\u00e6lling (5\u20136-\u00e5rige mestrer grundl\u00e6ggende regning)`, howWeAddress: `Kampscener med \u201d4 m\u00e5l plus 3 m\u00e5l\u201d og \u201d8 spillere minus 2 der g\u00e5r ud\u201d giver motiverende, autentisk regning` },
      { milestone: `Regelforst\u00e5else og turtagning (b\u00f8rnehaveklassens sociale milepoel)`, howWeAddress: `Holdfordelingsark og retf\u00e6rdighedsopgaver (\u201der der lige mange p\u00e5 hvert hold?\u201d) opbygger social matematik` },
      { milestone: `Begyndende l\u00e6sning af handlingsord og sportsordforr\u00e5d`, howWeAddress: `Ordsporings- og ordsogningsark med idr\u00e6tsord tr\u00e6ner l\u00e6sefundamentet med kindstetisk motiverende indhold` },
      { milestone: `M\u00f8nstergenkendelse i sekvenser (tr\u00f8jenumre, holdfarver)`, howWeAddress: `Sportsm\u00f8nsterark med AB-, ABB- og ABC-sekvenser af udstyr og farver opbygger algebraisk t\u00e6nkning` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokus\u00e9r p\u00e5 \u00e9n sportsgren (fodbold), hold t\u00e6llingen inden for 5 med konkrete bolde, og brug billedst\u00f8tte til ordl\u00e6sning. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes flertrinsproblemer (3 m\u00e5l i f\u00f8rste halvleg + 4 i anden), statistikf\u00f8ring over flere kampe og selvst\u00e6ndig skrivning af kampresultater.`,
    parentTakeaway: `Grib enhver sportsanledning: t\u00e6l m\u00e5l p\u00e5 tv, f\u00f8r stilling p\u00e5 papir, del snacks ligeligt mellem holdkammerater. Spark bold i haven og t\u00e6l vellykkede spark. Tal om fairplay og turtagning: \u201dhvorfor er det vigtigt, at alle f\u00e5r bolden?\u201d Idraetforeningen bliver et levende matematiklaboratorium, n\u00e5r barnet t\u00e6ller holdkammerater og sammenligner resultater.`,
    classroomIntegration: `Sporttemaet integreres som ugentlig temabev\u00e6gelse: i idr\u00e6tstimen leges organiserede boldspil med pointt\u00e6lling, i matematiktimen l\u00f8ses additions- og m\u00f8nsterark med sportsmotiver, i dansktimen l\u00e6ses og skrives idr\u00e6tsord, og i samlingen diskuteres fairplay og samarbejde. F\u00e6lles M\u00e5ls m\u00e5l for matematik, bev\u00e6gelse og sociale f\u00e6rdigheder integreres.`,
    assessmentRubric: [
      { skill: `Addition/subtraktion med pointt\u00e6lling`, emerging: `l\u00f8ser opgaver inden for 5 med konkrete bolde eller figurer`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 10 med sportsbilleder og noterer resultatet`, advanced: `l\u00f8ser flertrinsproblemer (to halvlege) og formulerer egne sportsregnestykker` },
      { skill: `Sportsordforr\u00e5d og l\u00e6sning`, emerging: `genkender 2\u20133 idr\u00e6tsord med billedst\u00f8tte (bold, m\u00e5l)`, proficient: `l\u00e6ser selvst\u00e6ndigt 5\u20136 sportsord og finder dem i ordsogning`, advanced: `l\u00e6ser nye idr\u00e6tsord ved afkodning og skriver korte kampbeskrivelser` },
      { skill: `M\u00f8nstergenkendelse (sportsmotiver)`, emerging: `gentager et simpelt AB-m\u00f8nster med bolde med st\u00f8tte`, proficient: `forts\u00e6tter selvst\u00e6ndigt AB- og ABB-m\u00f8nstre med sportsudstyr`, advanced: `opretter egne ABC-m\u00f8nstre og forklarer m\u00f8nsterreglen mundtligt` },
    ],
  },

  spring: {
    snippetAnswer: `For\u00e5rs-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner livscyklussekvensering, t\u00e6lling til 20, m\u00f8nstergenkendelse og begyndende l\u00e6sning med blomster, sommerfugle og fuglerede. Naturens fornyelse driver l\u00e6ringen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `For\u00e5rstemaet n\u00e5r et nyt niveau i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan observere, registrere og forudsige forandringer over tid \u2014 de kan f\u00f8re en v\u00e6kstdagbog, m\u00e5le spirens h\u00f8jde og forudsige, hvorn\u00e5r blomsten \u00e5bner sig. Denne evne til systematisk observation er ny i forhold til f\u00f8rskolens spontane begejstring. Livscyklussekvensering med fire trin (fr\u00f8 \u2192 spire \u2192 plante \u2192 blomst) tr\u00e6ner kronologisk t\u00e6nkning. T\u00e6lling af kronblade, marieh\u00f8ns og fugle\u00e6g n\u00e5r op til 20. Addition med for\u00e5rselementer (5 tulipaner + 3 p\u00e5skeliljer) og m\u00f8nstre i blomstersenge (tulipan-rose-tulipan-rose) bygger matematik ind i naturoplevelsen. For\u00e5rsord som spire, kvist og larve tr\u00e6ner l\u00e6sning. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik m\u00f8des i \u00e5rstidstemaet.`,
    developmentalMilestones: [
      { milestone: `Livscyklusforst\u00e5else og sekvensering (5\u20136-\u00e5rige kan ordne biologiske faser kronologisk)`, howWeAddress: `Fr\u00f8-til-blomst- og larve-til-sommerfugl-sekvenserings\u00f8velser med fire trin opbygger tidslig og biologisk forst\u00e5else` },
      { milestone: `Systematisk observation og registrering (b\u00f8rn registrerer forandringer over tid)`, howWeAddress: `V\u00e6kstdagbogs-ark der kombinerer m\u00e5ling og tegning tr\u00e6ner naturfaglig metode med personligt engagement` },
      { milestone: `M\u00f8nstergenkendelse i naturlige r\u00e6kker (blomster, farver, blade)`, howWeAddress: `For\u00e5rsm\u00f8nsterark med blomster- og insektsekvenser i AB-, ABB- og ABC-m\u00f8nstre tr\u00e6ner algebraisk t\u00e6nkning` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns livscyklussen til tre trin (fr\u00f8-spire-blomst), fokus\u00e9r p\u00e5 \u00e9n velkendt blomst (tulipan), og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes m\u00e5ling af plantev\u00e6kst i centimeter, sommerfuglelivscyklus med fem trin og selvst\u00e6ndig skrivning af for\u00e5rsdagbog.`,
    parentTakeaway: `For\u00e5ret er gratis naturfag: plant fr\u00f8 i vindueskarmen og lad barnet m\u00e5le spirens v\u00e6kst hver dag. T\u00e6l blomster i haven, sammenlign farver og st\u00f8rrelser. Bed barnet tegne et for\u00e5rstr\u00e6 f\u00f8r og efter l\u00f8vspring. G\u00e5 p\u00e5 insektjagt og t\u00e6l marieh\u00f8ns. Skriv en for\u00e5rsseddel sammen: \u201di dag s\u00e5 jeg 3 sommerfugle og 5 bier\u201d.`,
    classroomIntegration: `For\u00e5rstemaet driver b\u00f8rnehaveklassens udeskole i marts-maj: naturfagstimen observerer knopper og spirer, matematiktimen bruger t\u00e6lle- og m\u00f8nsterark med for\u00e5rsmotiver, dansktimen skriver v\u00e6kstdagbog, og kunststimen printer blomster med rigtige blade. En klassebed giver autentisk l\u00e6ring hele for\u00e5ret. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik integreres.`,
    assessmentRubric: [
      { skill: `Livscyklus-sekvensering (for\u00e5r)`, emerging: `ordner 2 trin (fr\u00f8, blomst) med billedst\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 4 livscyklusfaser i korrekt r\u00e6kkef\u00f8lge og navngiver dem`, advanced: `forklarer hvert trin med egne ord og sammenligner plante- og sommerfuglelivscyklus` },
      { skill: `T\u00e6lling og addition (for\u00e5rskontekst)`, emerging: `t\u00e6ller 5\u20138 for\u00e5rselementer med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 20 og l\u00f8ser additionsopgaver inden for 10 med for\u00e5rsmotiver`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne for\u00e5rsregnestykker` },
      { skill: `For\u00e5rsobservation og registrering`, emerging: `navngiver 2\u20133 for\u00e5rsforandringer med st\u00f8tte (blomster, varme)`, proficient: `beskriver selvst\u00e6ndigt 5\u20136 for\u00e5rsforandringer og registrerer dem med tegning og ord`, advanced: `forudsiger kommende forandringer og forklarer \u00e5rsag-virkningssammenh\u00e6nge (varme \u2192 v\u00e6kst)` },
    ],
  },

  summer: {
    snippetAnswer: `Sommer-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 20, addition inden for 10, m\u00e5ling og begyndende l\u00e6sning med strand, is, sol og feriemotiver. Sommerens frihed motiverer l\u00e6ringen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Sommertemaet har en s\u00e6rlig styrke i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige er parate til at bruge sommerens aktiviteter som l\u00e6ringskontekster \u2014 de kan t\u00e6lle konkylier og sortere dem efter st\u00f8rrelse, m\u00e5le sandslottets h\u00f8jde med h\u00e5ndbrede og l\u00f8se additionsopgaver med iskugler (3+4). Hvor f\u00f8rskoleb\u00f8rn legede frit p\u00e5 stranden, kan b\u00f8rnehaveklasseb\u00f8rn strukturere oplevelsen: de f\u00f8rer sommerdagbog, registrerer vejret og t\u00e6ller badetimer. M\u00e5ling med uformelle enheder (sandslottet er 6 spande h\u00f8jt) introducerer m\u00e5lekoncepter naturligt. Sommerord som strand, b\u00f8lge, solcreme og badering er motiverende l\u00e6seord. M\u00f8nstre i strandelementer (konkylie-s\u00f8stjerne-konkylie) tr\u00e6ner algebraisk t\u00e6nkning. F\u00e6lles M\u00e5ls m\u00e5l for matematik, natur og kommunikation m\u00f8des i det feriefyldte tema.`,
    developmentalMilestones: [
      { milestone: `M\u00e5ling med uformelle enheder (5\u20136-\u00e5rige begynder at sammenligne st\u00f8rrelser systematisk)`, howWeAddress: `M\u00e5leaktiviteter med sandslotte, istapstjerners arm og konkylier introducerer m\u00e5lekoncepter med sanselige sommermaterialer` },
      { milestone: `Addition og subtraktion inden for 10 (b\u00f8rnehaveklassens matematiske kernef\u00e6rdighed)`, howWeAddress: `Sommerscener med \u201d3 iskugler plus 4 iskugler\u201d og \u201d8 konkylier minus 3 der gives v\u00e6k\u201d giver motiverende regning` },
      { milestone: `Tidsforst\u00e5else og kalenderstruktur (forst\u00e5 sommerm\u00e5neder og ferieplanl\u00e6gning)`, howWeAddress: `Sommerkalender-ark med ugedage, m\u00e5neder og ferieaktiviteter opbygger tidsforst\u00e5else i en engagerende kontekst` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokus\u00e9r p\u00e5 tre velkendte sommeremner (strand, is, sol), hold t\u00e6llingen inden for 10 med konkrete konkylier, og tilbyd ordkort med sommerbilleder. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes m\u00e5ling i centimeter, flertrinsproblemer med ferieplanl\u00e6gning og selvst\u00e6ndig skrivning af sommerdagbog.`,
    parentTakeaway: `Sommerferien er det bedste klasselokale. T\u00e6l konkylier p\u00e5 stranden og sorter dem efter st\u00f8rrelse. Byg sandslotte og m\u00e5l h\u00f8jden med en lineal. K\u00f8b is og l\u00f8s additions: \u201d3 kugler til dig og 2 til mig \u2014 hvor mange i alt?\u201d F\u00f8r en sommerdagbog med tegninger og korte s\u00e6tninger. Skriv postkort til bedstefor\u00e6ldre og \u00f8v bogstavskrivning naturligt.`,
    classroomIntegration: `Sommertemaet bruges til at afslutte b\u00f8rnehaveklasse\u00e5ret med gl\u00e6de: matematiktimen bruger t\u00e6lle- og m\u00e5leark med strandmotiver, naturfagstimen unders\u00f8ger sommervejr og insekter, dansktimen skriver sommerdagbog og postkort, og kunsttimen skaber strandcollager. F\u00e6lles M\u00e5ls m\u00e5l for matematik, natur og kommunikation integreres i festlig sommerstemning.`,
    assessmentRubric: [
      { skill: `M\u00e5ling med uformelle enheder (sommerkontekst)`, emerging: `sammenligner to genstandest\u00f8rrelser (st\u00f8rst/mindst) med st\u00f8tte`, proficient: `m\u00e5ler selvst\u00e6ndigt genstande med h\u00e5ndbrede/spande og noterer resultatet`, advanced: `sammenligner m\u00e5l, bruger begreber som dobbelt og halvt og forklarer m\u00e5leprocessen` },
      { skill: `Addition/subtraktion (sommertema)`, emerging: `l\u00f8ser opgaver inden for 5 med konkrete konkylier eller isfigurer`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 10 med sommerbilleder p\u00e5 arbejdsark`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne sommerregnestykker` },
      { skill: `Sommerordforr\u00e5d og l\u00e6sning`, emerging: `genkender 2\u20133 sommerord med billedst\u00f8tte (sol, is)`, proficient: `l\u00e6ser selvst\u00e6ndigt 5\u20136 sommerord og bruger dem i ordsogning`, advanced: `l\u00e6ser nye sommerord ved afkodning og skriver korte sommers\u00e6tninger` },
    ],
  },

  superheroes: {
    snippetAnswer: `Superhelte-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 20, addition inden for 10, m\u00f8nstergenkendelse og begyndende l\u00e6sning med kappe-, maske- og superkraftmotiver. Fantasien driver faglig l\u00e6ring. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Superheltetemaet rammer b\u00f8rnehaveklassen perfekt, fordi fem- og seks\u00e5rige er midt i den mest intense fantasilegperiode \u2014 de opfinder egne superhelte, forhandler superkr\u00e6fter og l\u00f8ser imagin\u00e6re konflikter med retf\u00e6rdighedslogik. Denne kognitive modenhed g\u00f8r det muligt at bruge superheltescenarier som matematikkontekster: t\u00e6lling af reddede borgere (op til 20), addition af superkr\u00e6fter (3 flyvende + 4 stearke = 7 i alt) og subtraktion af besejrede skurke (8\u20133). B\u00f8rnehaveklasseb\u00f8rn kan skabe deres egen superhelt med skriftlig beskrivelse, hvilket integrerer kreativ skrivning. M\u00f8nstre i kappefarver og maskedesigns tr\u00e6ner m\u00f8nstergenkendelse. Superhelteord som kappe, maske, mission og redning er motiverende l\u00e6seord. F\u00e6lles M\u00e5ls m\u00e5l for tal, kreativitet og kommunikation m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Addition og subtraktion inden for 10 (5\u20136-\u00e5rige mestrer grundl\u00e6ggende regning)`, howWeAddress: `Superheltescener med \u201d5 reddede borgere plus 3 til\u201d og \u201d8 skurke minus 3 besejrede\u201d giver engagerende regning` },
      { milestone: `Narrativ t\u00e6nkning og kreativ produktion (b\u00f8rn skaber sammenheangende historier)`, howWeAddress: `Superhelte-skabelsesark med tegning og selvst\u00e6ndig skrivning af navn, superkraft og mission tr\u00e6ner narrative f\u00e6rdigheder` },
      { milestone: `M\u00f8nstergenkendelse i visuelle sekvenser (kappe-maske-m\u00f8nstre)`, howWeAddress: `Superheltem\u00f8nsterark med AB-, ABB- og ABC-sekvenser af kapper, masker og emblemer tr\u00e6ner algebraisk t\u00e6nkning` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokus\u00e9r p\u00e5 simple superheltescenarier med \u00e9n superkraft, hold matematikken inden for 5, og tilbyd ordkort med superheltebilleder. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes flertrinsmissioner (red 4 borgere, derefter 3 til, men 2 flygtede), selvst\u00e6ndig historieskrivning og kodningsaktiviteter med superheltebev\u00e6gelser.`,
    parentTakeaway: `Superheltelegen er en l\u00e6ringsmotor. Lad barnet designe sin egen superhelt med navn, superkraft og kostume \u2014 det er kreativ skrivning i forkleedning. Leg \u201dsuperheltens regnestykke\u201d: \u201ddu reddede 4 borgere, s\u00e5 reddede du 3 til \u2014 hvor mange i alt?\u201d Byg en superhelteborg af pap og t\u00e6l klodser. L\u00e6s superhelteb\u00f8ger og tal om, hvad der g\u00f8r en helt god: mod, venlighed, samarbejde.`,
    classroomIntegration: `Superheltetemaet bruges som kreativ temauge: matematiktimen l\u00f8ser missions-additions- og m\u00f8nsterark, dansktimen skaber superhelte med tegning og skrivning, idr\u00e6tstimen laver superhelte-forhindringsbane med t\u00e6lleposter, og samlingen diskuterer v\u00e6rdier som mod og venlighed. F\u00e6lles M\u00e5ls m\u00e5l for matematik, kreativitet og sociale f\u00e6rdigheder integreres.`,
    assessmentRubric: [
      { skill: `Addition/subtraktion (superheltekontekst)`, emerging: `l\u00f8ser opgaver inden for 5 med konkrete superhelte-figurer`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 10 med superheltebilleder`, advanced: `l\u00f8ser flertrinsmissioner og formulerer egne superhelte-regnestykker` },
      { skill: `Kreativ produktion (superhelt-skabelse)`, emerging: `tegner en superhelt med voksenst\u00f8tte og kopierer et navn`, proficient: `tegner selvst\u00e6ndigt en superhelt og skriver navn og superkraft`, advanced: `skaber en hel superheltehistorie med tegning, navn, mission og kort fortaelling` },
      { skill: `Superhelteordforr\u00e5d og l\u00e6sning`, emerging: `genkender 2\u20133 superhelteord med billedst\u00f8tte (helt, kappe)`, proficient: `l\u00e6ser selvst\u00e6ndigt 5\u20136 superhelteord og finder dem i ordsogning`, advanced: `l\u00e6ser og skriver 8+ superhelteord og bruger dem i korte s\u00e6tninger` },
    ],
  },

  toys: {
    snippetAnswer: `Leget\u00f8j-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 20, addition/subtraktion inden for 10, sortering efter flere egenskaber og begyndende l\u00e6sning med dukker, biler, klodser og puslespil. Legen driver l\u00e6ringen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Leget\u00f8jstemaet f\u00e5r en ny dimension i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige begynder at organisere, kategorisere og t\u00e6lle deres leget\u00f8j systematisk \u2014 de g\u00e5r fra at lege med tingene til at taenke over dem. Hvor f\u00f8rskoleb\u00f8rn navngav leget\u00f8j, kan b\u00f8rnehaveklasseb\u00f8rn sortere efter flere egenskaber (materiale + st\u00f8rrelse), t\u00e6lle samlinger op til 20, l\u00f8se additionsopgaver med klodser (6+4) og subtraktionsopgaver med biler (9\u20133). Leget\u00f8jsbutiksleg integrerer t\u00e6lling, pris og fordeling \u2014 tidlig \u00f8konomiforst\u00e5else. L\u00e6sning af leget\u00f8jsnavne p\u00e5 3\u20136 bogstaver (bold, dukke, bil, lego) tr\u00e6ner l\u00e6sefundamentet. M\u00f8nstergenkendelse i klodsr\u00e6kker opbygger algebraisk t\u00e6nkning. F\u00e6lles M\u00e5ls m\u00e5l for matematik, sprog og kreativitet m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Klassifikation efter flere egenskaber (5\u20136-\u00e5rige sorterer efter to kriterier samtidig)`, howWeAddress: `Sorteringsark der grupperer leget\u00f8j efter b\u00e5de materiale og st\u00f8rrelse opbygger todimensionel logisk t\u00e6nkning` },
      { milestone: `Addition og subtraktion inden for 10 med leget\u00f8jst\u00e6llere`, howWeAddress: `Leget\u00f8jsscener med \u201d6 klodser plus 4 klodser\u201d og \u201d9 biler minus 3 der gives v\u00e6k\u201d giver konkret regning med kendte genstande` },
      { milestone: `Tidlig \u00f8konomiforst\u00e5else (t\u00e6lling, fordeling, pris)`, howWeAddress: `Leget\u00f8jsbutiksark med priser inden for 10 kr. tr\u00e6ner t\u00e6lling, addition og ligedeling i en meningsfuld kontekst` },
      { milestone: `Begyndende l\u00e6sning af hverdagsord (leget\u00f8jsnavne)`, howWeAddress: `Ordsporings- og matchningsark med leget\u00f8jsord p\u00e5 3\u20136 bogstaver tr\u00e6ner l\u00e6sefundamentet med personligt motiverende indhold` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til fire velkendte leget\u00f8jsstykker (bold, dukke, bil, klods), hold t\u00e6llingen inden for 10 med konkrette leget\u00f8j ved siden af, og brug billedst\u00f8tte til ordl\u00e6sning. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes leget\u00f8jsbutik med byttepenge, flertrinsproblemer og selvst\u00e6ndig skrivning af leget\u00f8jsanmeldelser.`,
    parentTakeaway: `Leget\u00f8jskassen er et matematiklaboratorium. T\u00e6l klodser sammen, sorter biler efter farve og st\u00f8rrelse, byg t\u00e5rne og m\u00e5l h\u00f8jden. Leg leget\u00f8jsbutik: \u201ddukken koster 5 kr., bilen koster 3 kr. \u2014 hvor meget i alt?\u201d Lad barnet skrive en \u00f8nskeseddel med leget\u00f8jsnavne. Hvert legetid kan blive en l\u00e6ringsanledning uden at barnet maerker det.`,
    classroomIntegration: `Leget\u00f8jstemaet integreres i b\u00f8rnehaveklassens hverdagsl\u00e6ring: matematiktimen bruger t\u00e6lle-, sorterings- og additionsark med leget\u00f8jsmotiver, dansktimen l\u00e6ser og skriver leget\u00f8jsord, i legehj\u00f8rnet drives en leget\u00f8jsbutik med prisskilte og t\u00e6lling, og kunststimen designer nyt leget\u00f8j. F\u00e6lles M\u00e5ls m\u00e5l for matematik, kommunikation og kreativitet integreres.`,
    assessmentRubric: [
      { skill: `Leget\u00f8jsklassifikation`, emerging: `sorterer leget\u00f8j i to grupper efter \u00e9n egenskab (farve) med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter to egenskaber (materiale og st\u00f8rrelse) og forklarer valget`, advanced: `opretter egne sorteringskriterier og klassificerer 10+ stykker leget\u00f8j i flerdimensionelle grupper` },
      { skill: `Addition/subtraktion med leget\u00f8jst\u00e6llere`, emerging: `l\u00f8ser opgaver inden for 5 med konkret leget\u00f8j foran sig`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 10 med leget\u00f8jsbilleder p\u00e5 arbejdsark`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne leget\u00f8jsregnestykker` },
      { skill: `L\u00e6sning af leget\u00f8jsord`, emerging: `genkender 2\u20133 leget\u00f8jsord med billedst\u00f8tte (bold, bil)`, proficient: `l\u00e6ser selvst\u00e6ndigt 5\u20136 leget\u00f8jsnavne og staver dem i ordsogning`, advanced: `l\u00e6ser nye leget\u00f8jsord ved afkodning og skriver korte leget\u00f8jsbeskrivelser` },
    ],
  },

  transportation: {
    snippetAnswer: `Transport-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 20, sortering efter flere egenskaber, m\u00e5ling og begyndende l\u00e6sning med biler, busser, tog, fly og cykler. K\u00f8ret\u00f8jer fascinerer og driver l\u00e6ringen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Transporttemaet n\u00e5r et nyt niveau i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige begynder at forst\u00e5 transportsystemer \u2014 de ved, at bussen k\u00f8rer en rute, toget stopper ved stationer, og flyet flyver mellem byer. Denne systemforst\u00e5else g\u00e5r langt ud over f\u00f8rskolens navngivning af k\u00f8ret\u00f8jer. B\u00f8rnehaveklasseb\u00f8rn kan klassificere transportmidler efter flere egenskaber (jord/vand/luft + motor/muskelkraft), t\u00e6lle hjul p\u00e5 k\u00f8ret\u00f8jer i grupper (4 hjul pr. bil \u00d7 3 biler = 12 hjul), l\u00f8se additionsopgaver med passagerer (6+4) og m\u00e5le k\u00f8ret\u00f8jers l\u00e6ngde med uformelle enheder. Transportord som station, billet, rute og passager tr\u00e6ner l\u00e6sning. F\u00e6lles M\u00e5ls m\u00e5l for matematik, natur/teknik og kommunikation m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Klassifikation efter flere egenskaber (5\u20136-\u00e5rige sorterer efter medium og drivkraft)`, howWeAddress: `Sorteringsark der grupperer transportmidler efter b\u00e5de medium (jord/vand/luft) og drivkraft (motor/muskel) opbygger logisk t\u00e6nkning` },
      { milestone: `T\u00e6lling i grupper (hjul, vinduer, passagerer p\u00e5 k\u00f8ret\u00f8jer)`, howWeAddress: `Gruppert\u00e6llingsark med hjul (4 pr. bil, 2 pr. cykel) introducerer tidlig multiplikativ t\u00e6nkning` },
      { milestone: `Begyndende m\u00e5ling (sammenligning af k\u00f8ret\u00f8jers st\u00f8rrelse)`, howWeAddress: `M\u00e5leaktiviteter hvor b\u00f8rn sammenligner k\u00f8ret\u00f8jers l\u00e6ngde med klodsbredder introducerer m\u00e5lekoncepter` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til fire velkendte k\u00f8ret\u00f8jer (bil, bus, cykel, tog), brug leget\u00f8jsbiler som supplement, og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes ruteplanl\u00e6gning p\u00e5 et simpelt kort, tidsberegning (hvorn\u00e5r ankommer bussen?) og selvst\u00e6ndig skrivning af rejsebeskrivelser.`,
    parentTakeaway: `Hver transport er en lektion. T\u00e6l biler p\u00e5 vejen, busser ved stoppestedet, cykler i stativet. I toget: \u201dhvor mange stationer er der til bedstemor?\u201d I bilen: \u201dvi har k\u00f8rt 5 minutter \u2014 hvor lang tid er der igen?\u201d Byg k\u00f8ret\u00f8jer af genbrugsmaterialer og t\u00e6l hjul. Lad barnet \u201dk\u00f8be\u201d en billet og t\u00e6lle penge.`,
    classroomIntegration: `Transporttemaet integreres i b\u00f8rnehaveklassens samfundsfagsundervisning: matematiktimen bruger sorterings- og t\u00e6lleark med k\u00f8ret\u00f8jer, naturfag/teknik unders\u00f8ger hjul og motorer, dansktimen l\u00e6ser og skriver transportord, og en klasserejse planl\u00e6gges p\u00e5 kort med stoppesteder. F\u00e6lles M\u00e5ls m\u00e5l for matematik, natur/teknik og kommunikation integreres.`,
    assessmentRubric: [
      { skill: `Transportklassifikation`, emerging: `sorterer k\u00f8ret\u00f8jer i to grupper efter \u00e9n egenskab (jord/vand) med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter to egenskaber (medium og drivkraft) og forklarer valget`, advanced: `opretter egne klassifikationskriterier og diskuterer fordele ved hvert transportmiddel` },
      { skill: `T\u00e6lling og gruppert\u00e6lling (k\u00f8ret\u00f8jskontekst)`, emerging: `t\u00e6ller 5\u20138 k\u00f8ret\u00f8jer med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 20 og t\u00e6ller hjul i grupper af 2 og 4`, advanced: `l\u00f8ser gruppert\u00e6llingsopgaver og formulerer egne transportregnestykker` },
      { skill: `Transportordforr\u00e5d og l\u00e6sning`, emerging: `genkender 2\u20133 transportord med billedst\u00f8tte (bil, bus)`, proficient: `l\u00e6ser selvst\u00e6ndigt 5\u20136 transportord og finder dem i ordsogning`, advanced: `l\u00e6ser nye transportord ved afkodning og skriver korte rejsebeskrivelser` },
    ],
  },

  travel: {
    snippetAnswer: `Rejse-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling, addition inden for 10, kortl\u00e6sning og begyndende l\u00e6sning med kufferter, landkort, fly og verdenskultur. Eventyrlysten driver l\u00e6ringen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Rejsetemaet \u00e5bner b\u00f8rnehaveklassens verden, fordi fem- og seks\u00e5rige for f\u00f8rste gang kan forstaa, at der findes lande uden for Danmark \u2014 de har et mentalt kort, der r\u00e6kker ud over deres eget kvarter. Denne geografiske bevidsthed g\u00f8r det muligt at bruge rejsescenarier som l\u00e6ringskontekster: t\u00e6lling af kufferter og billetter, addition med rejsende (5+4), simpel kortl\u00e6sning med symboler, og kulturel bevidsthed om, at b\u00f8rn i andre lande lever anderledes. Hvor f\u00f8rskoleb\u00f8rn kiggede p\u00e5 billeder af fly og tog, kan b\u00f8rnehaveklasseb\u00f8rn planl\u00e6gge en fantasirejse med stoppesteder, pakke en kuffert og t\u00e6lle genstande. Rejseord som pas, lufthavn, kuffert og rejseplan tr\u00e6ner l\u00e6sning. F\u00e6lles M\u00e5ls m\u00e5l for matematik, omverden og kommunikation m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Geografisk bevidsthed (5\u20136-\u00e5rige forst\u00e5r, at der findes lande og byer uden for deres eget)`, howWeAddress: `Enkle kortaktiviteter med symboler og stoppesteder opbygger rumlig forst\u00e5else og geografisk grundlag` },
      { milestone: `Addition og subtraktion inden for 10 med rejsescenarier`, howWeAddress: `Kuffertpakning (\u201d5 ting i kufferten plus 4 til\u201d) og billetk\u00f8b giver meningsfuld matematik i en sp\u00e6ndende kontekst` },
      { milestone: `Kulturel bevidsthed og mangfoldighed (forst\u00e5else for, at verden er stor og varieret)`, howWeAddress: `Rejseark med flag, mad og traditioner fra forskellige lande opbygger interkulturel forst\u00e5else naturligt` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokus\u00e9r p\u00e5 kendte rejsem\u00e5l (bedstefor\u00e6ldres hjem, sommerhus), brug konkret leget\u00f8jskuffert til t\u00e6lling, og hold matematikken inden for 5. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes verdenskortet med kontinenter, tidsberegning (hvorn\u00e5r lander flyet?), og selvst\u00e6ndig skrivning af rejsedagbog.`,
    parentTakeaway: `Enhver tur er en rejselektion. Pak kufferten sammen og t\u00e6l genstande. Kig p\u00e5 et kort: \u201dhvor bor bedstemor? Hvilken vej skal vi k\u00f8re?\u201d I lufthavnen: \u201dhvor mange fly kan du se?\u201d P\u00e5 ferien: skriv postkort og f\u00f8r rejsedagbog med tegninger. Tal om, hvad b\u00f8rn i andre lande spiser og leger \u2014 det bygger b\u00e5de geografi og empati.`,
    classroomIntegration: `Rejsetemaet bruges som tvaerfaglig temauge: matematiktimen l\u00f8ser t\u00e6lle- og additionsark med rejsemotiver, geografitimen udforsker et verdenskort med flag og symboler, dansktimen skriver rejsedagbog og postkort, og samlingen deler rejseoplevelser fra familier. F\u00e6lles M\u00e5ls m\u00e5l for matematik, omverden og kommunikation integreres i en eventyrlig ramme.`,
    assessmentRubric: [
      { skill: `Enkel kortl\u00e6sning og geografisk bevidsthed`, emerging: `peger p\u00e5 Danmark p\u00e5 et kort med st\u00f8tte`, proficient: `finder selvst\u00e6ndigt 3\u20134 lande p\u00e5 et simpelt kort og forst\u00e5r symboler`, advanced: `planlaegger en fantasirejse p\u00e5 et kort med stoppesteder og forklarer ruten` },
      { skill: `Addition/subtraktion (rejsekontekst)`, emerging: `l\u00f8ser opgaver inden for 5 med konkrete rejsegenstande (kuffertindhold)`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 10 med rejsebilleder p\u00e5 arbejdsark`, advanced: `l\u00f8ser flertrinsproblemer (pakning + billetk\u00f8b) og formulerer egne rejseregnestykker` },
      { skill: `Rejseordforr\u00e5d og l\u00e6sning`, emerging: `genkender 2\u20133 rejseord med billedst\u00f8tte (fly, kuffert)`, proficient: `l\u00e6ser selvst\u00e6ndigt 5\u20136 rejseord og bruger dem i ordsogning`, advanced: `l\u00e6ser nye rejseord ved afkodning og skriver korte rejses\u00e6tninger` },
    ],
  },

  vegetables: {
    snippetAnswer: `Gr\u00f8ntsags-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 20, addition/subtraktion inden for 10, sortering efter farve og form samt begyndende l\u00e6sning af gr\u00f8ntsagsnavne. Sundhed og mad integreres naturligt. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Gr\u00f8ntsagstemaet f\u00e5r reel faglig dybde i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige g\u00e5r fra at kende gr\u00f8ntsager visuelt til at bruge dem som l\u00e6ringsredskaber \u2014 de t\u00e6ller gul\u00e6r\u00f8dder i bunker, l\u00e6gger kartofler sammen (5+3), traekker agurker fra (8\u20132) og sorterer efter flere egenskaber (farve + form + hvor de vokser). Hvor f\u00f8rskoleb\u00f8rn matchede gr\u00f8ntsager med billeder, l\u00e6ser b\u00f8rnehaveklasseb\u00f8rn gr\u00f8ntsagsord selvst\u00e6ndigt, skriver korte s\u00e6tninger (\u201dJeg spiser gul\u00e6r\u00f8dder\u201d) og diskuterer sund kost med fagligt ordforr\u00e5d. V\u00e6kstsekvenser (fr\u00f8 \u2192 spire \u2192 plante \u2192 gr\u00f8ntsag) tr\u00e6ner kronologisk t\u00e6nkning. F\u00e6lles M\u00e5ls m\u00e5l for matematik, sundhed og kommunikation m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Addition og subtraktion inden for 10 med gr\u00f8ntsagst\u00e6llere (5\u20136-\u00e5rige mestrer grundregning)`, howWeAddress: `Gr\u00f8ntsagsscener med addition (4 gul\u00e6r\u00f8dder plus 3 tomater) og subtraktion (7 kartofler minus 2 der koges) giver konkret repr\u00e6sentation` },
      { milestone: `Klassifikation efter flere egenskaber (farve + form + v\u00e6kststed)`, howWeAddress: `Sorteringsark der grupperer gr\u00f8ntsager efter b\u00e5de farve og v\u00e6kststed (over/under jorden) opbygger todimensionel logik` },
      { milestone: `Begyndende l\u00e6sning af hverdagsord (gr\u00f8ntsagsnavne p\u00e5 3\u20137 bogstaver)`, howWeAddress: `Ord-billede-matchning og ordsporinger med tomat, l\u00f8g, porre og gul\u00e6rod tr\u00e6ner l\u00e6sefundamentet med sundhedsrelevante ord` },
      { milestone: `V\u00e6kstforst\u00e5else og livscyklus (fr\u00f8 til gr\u00f8ntsag)`, howWeAddress: `Sekvenserings\u00f8velser med fire v\u00e6kstfaser giver biologisk og kronologisk forst\u00e5else i en h\u00e5ndgribelig kontekst` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til fire velkendte gr\u00f8ntsager (gul\u00e6rod, tomat, agurk, kartoffel), hold t\u00e6llingen inden for 5 med konkrete gr\u00f8ntsager, og tilbyd ordkort med billeder. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes kogeaktiviteter med opskrifter (3 gul\u00e6r\u00f8dder + 2 kartofler + 1 l\u00f8g), m\u00e5ling med v\u00e6gt og laengde, og selvst\u00e6ndig skrivning af opskrifter.`,
    parentTakeaway: `K\u00f8kkenet er det bedste klasselokale for gr\u00f8ntsager. T\u00e6l gul\u00e6r\u00f8dder og kartofler i indk\u00f8bsposen, sorter efter farve, og kog suppe med matematisk opskrift: \u201d3 gul\u00e6r\u00f8dder plus 2 kartofler \u2014 hvor mange gr\u00f8ntsager i alt?\u201d Lad barnet sk\u00e6re (med b\u00f8rnekniv) og t\u00e6lle stykker. Plant et fr\u00f8 i vindueskarmen og f\u00f8lg spiringen. Skriv en indk\u00f8bsliste med gr\u00f8ntsagsnavne.`,
    classroomIntegration: `Gr\u00f8ntsagstemaet integreres i b\u00f8rnehaveklassens sundhedsundervisning: matematiktimen bruger t\u00e6lle- og sorteringsark med gr\u00f8ntsagsmotiver, naturfag planter fr\u00f8 og f\u00f8lger v\u00e6kst, dansktimen l\u00e6ser og skriver gr\u00f8ntsagsord og simple opskrifter, og k\u00f8kkenstationen laver sund mad med t\u00e6lling og m\u00e5ling. F\u00e6lles M\u00e5ls m\u00e5l for matematik, sundhed og kommunikation integreres.`,
    assessmentRubric: [
      { skill: `Addition/subtraktion med gr\u00f8ntsagst\u00e6llere`, emerging: `l\u00f8ser opgaver inden for 5 med konkrete gr\u00f8ntsager foran sig`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 10 med gr\u00f8ntsagsbilleder p\u00e5 arbejdsark`, advanced: `l\u00f8ser flertrinsproblemer (opskrifter med flere gr\u00f8ntsager) og formulerer egne regnestykker` },
      { skill: `Gr\u00f8ntsagsklassifikation`, emerging: `sorterer gr\u00f8ntsager i to grupper efter \u00e9n egenskab (farve) med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter to egenskaber (farve og v\u00e6kststed) og forklarer valget`, advanced: `opretter egne sorteringskriterier og klassificerer 10+ gr\u00f8ntsager med forklaring` },
      { skill: `L\u00e6sning af gr\u00f8ntsagsord`, emerging: `genkender 2\u20133 gr\u00f8ntsagsord med billedst\u00f8tte (tomat, gul\u00e6rod)`, proficient: `l\u00e6ser selvst\u00e6ndigt 6\u20138 gr\u00f8ntsagsnavne og staver dem i ordsogning`, advanced: `l\u00e6ser nye gr\u00f8ntsagsord ved afkodning og skriver simple opskrifter selvst\u00e6ndigt` },
    ],
  },

  weather: {
    snippetAnswer: `Vejr-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling, dataregistrering, m\u00f8nstergenkendelse og begyndende l\u00e6sning med sol, regn, sne, sky og temperatur. Daglig vejrobservation driver systematisk l\u00e6ring. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Vejrtemaet er unikt kraftfuldt i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige for f\u00f8rste gang kan registrere data systematisk over tid \u2014 de kan f\u00f8re en vejrdagbog, notere dagens vejr med symboler og sammenligne ugens observationer. Denne evne til daglig registrering og dataopsamling er en central videnskabelig kompetence. Hvor f\u00f8rskoleb\u00f8rn navngav vejrtyper, t\u00e6ller b\u00f8rnehaveklasseb\u00f8rn solskinsdage vs. regnvejrsdage, opretter simple s\u00f8jlediagrammer og sammenligner (flere sol-dage end regn-dage denne uge). Addition med vejrelementer (5 regndr\u00e5ber + 3 regndr\u00e5ber) og temperatursammenligning (koldere/varmere) introducerer m\u00e5ling. Vejrord som temperatur, nedb\u00f8r, sky og storm tr\u00e6ner fagligt ordforr\u00e5d. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik m\u00f8des i den daglige vejrrutine.`,
    developmentalMilestones: [
      { milestone: `Dataregistrering og enkel grafisk repr\u00e6sentation (5\u20136-\u00e5rige kan f\u00f8re daglige optegnelser)`, howWeAddress: `Vejrdagbogs-ark med symboler og t\u00e6lletabeller opbygger daglig registreringsvane og datah\u00e5ndtering` },
      { milestone: `Sammenligning og ordning af data (mere/f\u00e6rre, varmere/koldere)`, howWeAddress: `S\u00f8jlediagramark med ugens vejr l\u00e6rer b\u00f8rn at sammenligne m\u00e6ngder og drage enkle konklusioner fra data` },
      { milestone: `Naturvidenskabelig observation (\u00e5rsag-virkning med vejr)`, howWeAddress: `Vejrforandring-ark der forbinder vejrtype med passende p\u00e5kl\u00e6dning og aktiviteter opbygger logisk t\u00e6nkning` },
      { milestone: `Begyndende l\u00e6sning af fagord (vejrterminologi)`, howWeAddress: `Ordsporings- og matchningsark med vejrord tr\u00e6ner l\u00e6sefundamentet med fagligt indhold` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til tre vejrtyper (sol, regn, sky), brug store billedsymboler til daglig registrering, og hold dataopsamlingen til \u00e9n uge. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes temperaturm\u00e5ling med termometer, m\u00e5nedslang vejrdagbog og selvst\u00e6ndig skrivning af vejrrapporter.`,
    parentTakeaway: `Vejret er gratis l\u00e6ring hver eneste dag. Start en morgenvejrrutine: kig ud af vinduet, navngiv vejret og skriv et symbol i kalenderen. T\u00e6l solskinsdage ved ugens slutning: \u201dhvor mange soldage? Hvor mange regndage? Hvad er flest?\u201d Tal om, hvad man skal have p\u00e5 i dag: \u201dhvorfor regnt\u00f8j? Fordi det regner!\u201d Hvert vejrskift er en lektion i \u00e5rsag og virkning.`,
    classroomIntegration: `Vejrtemaet er b\u00f8rnehaveklassens daglige rutine: i morgensamlingen registreres dagens vejr p\u00e5 klassetavlen med symboler, om fredagen laves s\u00f8jlediagram over ugens vejr, matematiktimen l\u00f8ser t\u00e6lle- og sammenligningsark med vejrdata, naturfagstimen diskuterer \u00e5rstider og vejrforandringer. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik, matematik og daglig registrering integreres hele \u00e5ret.`,
    assessmentRubric: [
      { skill: `Vejrregistrering og dataopsamling`, emerging: `registrerer dagens vejr med billedsymbol med st\u00f8tte`, proficient: `registrerer selvst\u00e6ndigt dagligt vejr i en uge og t\u00e6ller dage pr. vejrtype`, advanced: `opretter selvst\u00e6ndigt s\u00f8jlediagram over en uges vejr og drager konklusioner` },
      { skill: `Sammenligning og ordning (vejrkontekst)`, emerging: `peger p\u00e5 den st\u00f8rste gruppe (flest soldage) med st\u00f8tte`, proficient: `sammenligner selvst\u00e6ndigt to vejrtyper (flere/faerre) og formulerer svaret`, advanced: `rangordner 3\u20134 vejrtyper og forklarer resultaterne med egne ord` },
      { skill: `Vejrordforr\u00e5d og l\u00e6sning`, emerging: `genkender 2\u20133 vejrord med billedst\u00f8tte (sol, regn)`, proficient: `l\u00e6ser selvst\u00e6ndigt 5\u20136 vejrord og bruger dem i ordsogning`, advanced: `l\u00e6ser nye vejrord ved afkodning og skriver korte vejrrapporter selvst\u00e6ndigt` },
    ],
  },

  winter: {
    snippetAnswer: `Vinter-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 20, addition/subtraktion inden for 10, m\u00f8nstre og begyndende l\u00e6sning med sne, is, snebolde og vinterdyr. \u00c5rstidens magi motiverer l\u00e6ringen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Vintertemaet n\u00e5r en ny dybde i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan forst\u00e5 vinterens videnskab \u2014 de kan diskutere, hvorfor det sner, hvorfor s\u00f8en fryser, og hvorfor dyr g\u00e5r i hi. Denne naturvidenskabelige nysgerrighed g\u00e5r langt ud over f\u00f8rskolens sanselige sneoplevelse. B\u00f8rnehaveklasseb\u00f8rn t\u00e6ller snebolde i grupper (op til 20), l\u00f8ser addition med vinterelementer (6 snebolde + 4 isterninger = 10) og subtraktion (8 fugle ved foderbr\u00e6ttet minus 3 der flyver vaek). Symmetri i snefnug tr\u00e6ner geometrisk t\u00e6nkning. M\u00f8nstre i vinterklader (vante-hue-vante-hue) opbygger algebraisk t\u00e6nkning. Vinterord som frost, is, sne og dvale tr\u00e6ner l\u00e6sning. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik m\u00f8des i den kolde \u00e5rstid.`,
    developmentalMilestones: [
      { milestone: `Naturvidenskabelig forst\u00e5else (\u00e5rsag-virkning med kulde, is og sne)`, howWeAddress: `Vintervidenskabs-ark der forbinder temperatur med tilstandsformer (vand \u2192 is) opbygger kausal t\u00e6nkning` },
      { milestone: `Symmetriforst\u00e5else (snefnugs symmetri som geometrisk koncept)`, howWeAddress: `Snefnug-symmetriark hvor b\u00f8rn f\u00e6rdigg\u00f8r den anden halvdel tr\u00e6ner rumlig t\u00e6nkning og pr\u00e6cision` },
      { milestone: `Addition og subtraktion inden for 10 med vintert\u00e6llere`, howWeAddress: `Vinterscener med snebolde, fugle og isterninger giver konkret regning i en sanselig kontekst` },
      { milestone: `M\u00f8nstergenkendelse i sekvenser (vinterbeklaedning, snefnug)`, howWeAddress: `Vinterm\u00f8nsterark med AB-, ABB- og ABC-sekvenser af vinterting opbygger m\u00f8nstert\u00e6nkning` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokus\u00e9r p\u00e5 tre velkendte vinterelementer (sne, snem\u00e6nd, vanter), hold t\u00e6llingen inden for 10 med konkrete snebolde (bomuldsbolde), og brug billedst\u00f8tte til ordl\u00e6sning. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes temperaturm\u00e5ling, snefnuggeometri med spejling og selvst\u00e6ndig skrivning af vinterhistorier.`,
    parentTakeaway: `Vinteren er et naturlaboratorium. Byg en snem\u00e6nd og t\u00e6l sneboldene (3 store + 2 sm\u00e5). Frys vand i forskellige forme og observer: \u201dhvorfor blev vandet til is?\u201d T\u00e6l fugle ved foderbr\u00e6ttet. Klip snefnug af papir og find symmetrien. Skriv en vinterhistorie sammen: \u201dI dag lavede vi 5 snebolde og kastede 2 \u2014 hvor mange var der tilbage?\u201d`,
    classroomIntegration: `Vintertemaet driver b\u00f8rnehaveklassens undervisning i december-februar: naturfag laver forsog med is og sne, matematiktimen bruger t\u00e6lle-, m\u00f8nster- og symmetriark med vintermotiver, dansktimen l\u00e6ser vinterhistorier og skriver snevejrsdagbog, og kunststimen klipper snefnug. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik, matematik og kreativitet integreres.`,
    assessmentRubric: [
      { skill: `Addition/subtraktion (vinterkontekst)`, emerging: `l\u00f8ser opgaver inden for 5 med konkrete snebolde/bomuldsbolde`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 10 med vinterbilleder p\u00e5 arbejdsark`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne vinterregnestykker` },
      { skill: `Symmetri (snefnug og vinterfigurer)`, emerging: `kopierer et simpelt symmetrisk m\u00f8nster med st\u00f8tte`, proficient: `f\u00e6rdigg\u00f8r selvst\u00e6ndigt den anden halvdel af et snefnug korrekt`, advanced: `skaber egne symmetriske vinterdesigns og forklarer symmetrireglen` },
      { skill: `Vinterordforr\u00e5d og l\u00e6sning`, emerging: `genkender 2\u20133 vinterord med billedst\u00f8tte (sne, is)`, proficient: `l\u00e6ser selvst\u00e6ndigt 5\u20136 vinterord og finder dem i ordsogning`, advanced: `l\u00e6ser nye vinterord ved afkodning og skriver korte vinters\u00e6tninger` },
    ],
  },

  xmas: {
    snippetAnswer: `Jule-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 24, addition inden for 10, m\u00f8nstergenkendelse og begyndende l\u00e6sning med juletrae, julem\u00e6nd, gaver og adventslys. Julens magi driver l\u00e6ringen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Juletemaet har en helt s\u00e6rlig kraft i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige for f\u00f8rste gang forst\u00e5r adventskalenderen som en tidsstruktur \u2014 de taeller 24 dage ned med stigende sp\u00e6nding, og denne daglige t\u00e6lling er ren matematik i forkleedning. Hvor f\u00f8rskoleb\u00f8rn \u00e5bnede luger med hj\u00e6lp, t\u00e6ller b\u00f8rnehaveklasseb\u00f8rn selvst\u00e6ndigt dage til juleaften, l\u00f8ser addition med gaver (5+4), subtraktion med adventslys (4\u20131 pr. s\u00f8ndag) og genkender m\u00f8nstre i julepynt (kugle-stjerne-kugle-stjerne). L\u00e6sning af juleord som gaver, nisse, stjerne og julefrokost tr\u00e6ner l\u00e6sefundamentet med den h\u00f8jeste motivation. Skrivning af \u00f8nskesedler og julekort integrerer funktionel kommunikation. F\u00e6lles M\u00e5ls m\u00e5l for tal, m\u00f8nstre, kommunikation og kulturel bevidsthed m\u00f8des i decembers mest elskede tema.`,
    developmentalMilestones: [
      { milestone: `T\u00e6lling til 24 via adventskalenderen (b\u00f8rnehaveklassens naturlige t\u00e6lleramme)`, howWeAddress: `Adventskalender-aktiviteter der t\u00e6ller ned fra 24 opbygger talforst\u00e5else og tidsbevidsthed i en sp\u00e6ndende kontekst` },
      { milestone: `Addition og subtraktion inden for 10 med julemotiver`, howWeAddress: `Julescener med \u201d5 gaver plus 4 gaver\u201d og \u201d4 adventslys minus 1 der braender ned\u201d giver festlig matematik` },
      { milestone: `M\u00f8nstergenkendelse i julepynt (gentagende dekorations-m\u00f8nstre)`, howWeAddress: `Julepynt-m\u00f8nsterark med kugle-stjerne-sekvenser i AB-, ABB- og ABC-m\u00f8nstre tr\u00e6ner algebraisk t\u00e6nkning` },
      { milestone: `Funktionel skrivning (\u00f8nskesedler, julekort)`, howWeAddress: `Juleskrivnings-ark med \u00f8nskeseddel-skabeloner og julekortformater giver autentisk skrivetr\u00e6ning` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokus\u00e9r p\u00e5 adventskalenderen (t\u00e6lling 1\u201324) med daglige luger, hold additionsopgaver inden for 5, og tilbyd prikkede bogstavmodeller til \u00f8nskesedlen. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes gaveprisberegning (6 kr. + 4 kr.), flertrinsproblemer med juleplanl\u00e6gning og selvst\u00e6ndig skrivning af julehistorier.`,
    parentTakeaway: `December er den mest l\u00e6ringsrige m\u00e5ned i \u00e5ret. T\u00e6l adventslys, regn dage til juleaften p\u00e5 kalenderen, og skriv \u00f8nskeseddel sammen (det er funktionel skrivning). Bag julekager og t\u00e6l: \u201d5 sm\u00e5kager p\u00e5 pladen, vi tilf\u00f8jer 3 til \u2014 hvor mange i alt?\u201d Pak gaver ind og t\u00e6l dem. Hvert julerutual er en minimatematiklektion.`,
    classroomIntegration: `Juletemaet driver hele b\u00f8rnehaveklassens december: adventskalenderen bruges som daglig matematikrutine, matematiktimen l\u00f8ser t\u00e6lle- og m\u00f8nsterark med julemotiver, dansktimen skriver \u00f8nskesedler og julekort, og kunststimen skaber juledekorationer med m\u00f8nstre. Julefrokosten integrerer t\u00e6lling og fordeling. F\u00e6lles M\u00e5ls m\u00e5l for matematik, kommunikation og kultur integreres.`,
    assessmentRubric: [
      { skill: `T\u00e6lling til 24 (julekontekst)`, emerging: `t\u00e6ller 1\u201310 julegenstande med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 24 og bruger adventskalenderen korrekt`, advanced: `t\u00e6ller bagl\u00e6ns fra 24 og l\u00f8ser nedtaellingsproblemer` },
      { skill: `Addition/subtraktion (juletema)`, emerging: `l\u00f8ser opgaver inden for 5 med konkrete julefigurer`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 10 med julebilleder`, advanced: `l\u00f8ser flertrinsproblemer med juleplanl\u00e6gning og formulerer egne juleregnestykker` },
      { skill: `Juleskrivning (\u00f8nskesedler og kort)`, emerging: `kopierer enkle ord fra model (Gl\u00e6delig jul, navn)`, proficient: `skriver selvst\u00e6ndigt \u00f8nskeseddel med 3\u20134 \u00f8nsker og julekort med korte s\u00e6tninger`, advanced: `skriver flere s\u00e6tninger med korrekt bogstavering og kreativt juleindhold` },
    ],
  },

  zoo: {
    snippetAnswer: `Zoo-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 20, addition/subtraktion inden for 10, klassifikation efter flere egenskaber og begyndende l\u00e6sning med l\u00f8ver, elefanter, aber og pingviner. Eksotiske dyr fascinerer og driver l\u00e6ringen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Zootemaet blomstrer i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige for f\u00f8rste gang kan l\u00e6re om dyr fagligt \u2014 de g\u00e5r fra at beundre dyrene til at klassificere dem systematisk efter levested (savanne, regnskov, arktis), kropsdaekke (pels, fjer, skael) og fodevalg (planteaeder, k\u00f8daeder). Denne multidimensionelle klassifikation er en central kognitiv milepael. T\u00e6lling af dyr i indhegninger n\u00e5r op til 20, addition med zoodyr (5 aber + 3 papeg\u00f8jer = 8) og subtraktion (7 pingviner minus 2 der sv\u00f8mmer vaek) giver autentisk matematik. Zoodyr-navne som elefant, giraf, krokodille og flamingo er sp\u00e6ndende l\u00e6seord med varieret l\u00e6ngde. M\u00f8nstre i dyregrupper (stribet-prikket-stribet) tr\u00e6ner m\u00f8nstergenkendelse. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Klassifikation efter flere egenskaber (5\u20136-\u00e5rige kan sortere efter to-tre kriterier)`, howWeAddress: `Sorteringsark der grupperer zoodyr efter levested, kropsd\u00e6kke og f\u00f8devalg opbygger avanceret logisk t\u00e6nkning` },
      { milestone: `Addition og subtraktion inden for 10 med dyret\u00e6llere`, howWeAddress: `Zooscener med \u201d5 aber plus 3 papeg\u00f8jer\u201d og \u201d7 pingviner minus 2\u201d giver konkret regning med engagerende dyr` },
      { milestone: `Begyndende l\u00e6sning af dyrenavne (varieret l\u00e6ngde: l\u00f8ve \u2192 krokodille)`, howWeAddress: `Ord-billede-matchning med korte (abe, l\u00f8ve) og l\u00e6ngere dyrenavne (elefant, flamingo) differentierer l\u00e6seniveauer` },
      { milestone: `Naturvidenskabelig observation (dyrs udseende, adf\u00e6rd, levested)`, howWeAddress: `Observationsark der beder b\u00f8rn beskrive dyrs kendetegn opbygger videnskabelig dokumentationsf\u00e6rdighed` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til fire velkendte zoodyr (l\u00f8ve, elefant, abe, pingvin), hold t\u00e6llingen inden for 10 med konkrete dyrefigurer, og brug billedst\u00f8tte til ordl\u00e6sning. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes kontinentkort med dyrs levesteder, f\u00f8dekaedesekvenser og selvst\u00e6ndig skrivning af dyrefakta.`,
    parentTakeaway: `Et zoobes\u00f8g er den ultimative l\u00e6ringsoplevelse. Forbered med arbejdsark derhjemme: \u201dhvilke dyr skal vi se? T\u00e6l dem p\u00e5 arket.\u201d I zoo: t\u00e6l dyr i indhegningen, sammenlign st\u00f8rrelser (st\u00f8rre/mindre), og bed barnet tegne sit yndlingsdyr. Derhjemme: skriv en zoo-dagbog (\u201djeg s\u00e5 5 aber og 3 giraf\u2019er\u201d). Brug dyreb\u00f8ger til at udvide med fakta om levesteder og f\u00f8de.`,
    classroomIntegration: `Zootemaet er b\u00f8rnehaveklassens store naturfagsforl\u00f8b: en klasserejse til zoo forberedes med t\u00e6lle- og sorteringsark, naturfagstimen klassificerer dyr efter levested og kroppe, matematiktimen l\u00f8ser additions- og sammenligningsark med zoodyr, og dansktimen skriver dyrefakta og zoodagbog. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik, matematik og kommunikation integreres i \u00e9t fascinerende tema.`,
    assessmentRubric: [
      { skill: `Dyreklassifikation (zoo)`, emerging: `sorterer zoodyr i to grupper efter \u00e9n egenskab (stort/lille) med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter to egenskaber (levested og kropsd\u00e6kke) med 6+ dyr`, advanced: `klassificerer efter tre egenskaber og forklarer klassifikationen mundtligt` },
      { skill: `Addition/subtraktion med zodyrt\u00e6llere`, emerging: `l\u00f8ser opgaver inden for 5 med konkrete dyrefigurer`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 10 med zoodyr-billeder`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne zoo-regnestykker` },
      { skill: `L\u00e6sning af zoodyr-navne`, emerging: `genkender 2\u20133 korte dyrenavne med billedst\u00f8tte (abe, l\u00f8ve)`, proficient: `l\u00e6ser selvst\u00e6ndigt 6\u20138 zoodyr-navne inkl. l\u00e6ngere ord (elefant, giraf)`, advanced: `l\u00e6ser nye dyrenavne ved afkodning og skriver korte dyrefaktaark selvst\u00e6ndigt` },
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

  // Check if already enriched (snippetAnswer in kindergarten block)
  const kindergartenIdx = content.indexOf("'kindergarten'");
  const firstGradeIdx = content.indexOf("'first-grade'");

  if (kindergartenIdx === -1 || firstGradeIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  // Check if snippetAnswer already exists in kindergarten block
  const kindergartenBlock = content.substring(kindergartenIdx, firstGradeIdx);
  if (kindergartenBlock.includes('snippetAnswer')) {
    console.log(`SKIP (already enriched): ${theme}/da.ts`);
    continue;
  }

  // Find the last "],\n" in the kindergarten block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(kindergartenBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = kindergartenIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/da.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
