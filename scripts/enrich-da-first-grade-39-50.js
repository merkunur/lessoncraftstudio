#!/usr/bin/env node
/**
 * SEO Part 228: DA First-Grade Grade Enrichment — Themes 39-50
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the first-grade grade block of 12 DA theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    snippetAnswer: `Sport-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner addition og subtraktion inden for 20 med pointt\u00e6lling, flertrinsproblemer med kampe og turneringer, samt selvst\u00e6ndig l\u00e6sning og skrivning af sportsregler og kampbeskrivelser. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r sporttemaet matematisk dybde \u2014 seks- og syv\u00e5rige forst\u00e5r holdopstillinger, regler og pointsystemer og kan bruge dem til flertrinsproblemer: to halvleges m\u00e5l l\u00e6gges sammen, spillere der udskiftes tr\u00e6kkes fra, og holdst\u00f8rrelser sammenlignes. Tekstopgaver med sportscenarier kr\u00e6ver sekventiel beregning inden for 20 med tierovergang. L\u00e6sning af korte tekster om sportens regler, tr\u00e6ningsrutiner og fair play tr\u00e6ner informationsl\u00e6sning. Skrivning af kampbeskrivelser og sportsregler med egne ord opbygger faglitter\u00e6r skrivning. Datah\u00e5ndtering med stregdiagrammer over kampresultater introducerer statistisk t\u00e6nkning. F\u00e6lles M\u00e5ls m\u00e5l for matematik, l\u00e6sning og bev\u00e6gelse i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Flertrinsproblemer med pointt\u00e6lling (6\u20137-\u00e5rige l\u00f8ser to-trins-opgaver inden for 20)`, howWeAddress: `Kampsceanarier med to halvlege, udskiftninger og slutresultater giver flertrinsproblemer med autentisk kontekst` },
      { milestone: `Informationsl\u00e6sning om regler og procedurer (l\u00e6sning af korte fagtekster)`, howWeAddress: `Sportsregeltekster p\u00e5 3\u20134 s\u00e6tninger med forst\u00e5elsessp\u00f8rgsm\u00e5l tr\u00e6ner informationsl\u00e6sning med h\u00f8j motivation` },
      { milestone: `Datah\u00e5ndtering med stregdiagrammer (registrering og afl\u00e6sning)`, howWeAddress: `Kampresultat-diagrammer, hvor eleverne registrerer m\u00e5l og sammenligner hold, opbygger statistisk t\u00e6nkning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold regning inden for 10 med billedst\u00f8tte af sportsscener, brug forh\u00e5ndsudfyldte diagrammer, og tilbyd s\u00e6tningsstartere til skrivning. For avancerede elever i 1. klasse tilf\u00f8jes tre-trins-problemer med tre halvlege, selvst\u00e6ndig diagramoprettelse og skrivning af kampkommentarer med flere afsnit.`,
    parentTakeaway: `Se en kamp sammen og f\u00f8r stilling p\u00e5 papir \u2014 l\u00e6g halvlegenes m\u00e5l sammen, tr\u00e6k udskiftede spillere fra. Lad barnet skrive tre regler for sin yndlingssport. Bes\u00f8g en lokal idr\u00e6tsforening og t\u00e6l spillere, point og omgange. Bev\u00e6gelse og tal h\u00f8rer naturligt sammen i 1. klasse.`,
    classroomIntegration: `Sporttemaet i 1. klasse integreres i idr\u00e6tstimen med pointt\u00e6lling, matematiktimen med kampresultat-diagrammer og flertrinsproblemer, dansktimen med l\u00e6sning af sportsregler og skrivning af kampbeskrivelser, og morgenstunden med sportsstafet-matematik. F\u00e6lles M\u00e5ls m\u00e5l for matematik, l\u00e6sning, skrivning og bev\u00e6gelse underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Flertrinsproblemer med pointt\u00e6lling`, emerging: `l\u00f8ser \u00e9t-trins-pointopgaver inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt to-trins-problemer inden for 20 med kampsceanarier`, advanced: `l\u00f8ser tre-trins-problemer og formulerer egne pointopgaver med sportsdata` },
      { skill: `Informationsl\u00e6sning om sport`, emerging: `l\u00e6ser 1\u20132 s\u00e6tninger om en sportsgren med st\u00f8tte og besvarer sp\u00f8rgsm\u00e5l mundtligt`, proficient: `l\u00e6ser selvst\u00e6ndigt 3\u20134 s\u00e6tninger om sportsregler og besvarer forst\u00e5elsessp\u00f8rgsm\u00e5l skriftligt`, advanced: `l\u00e6ser l\u00e6ngere tekster om flere sportsgrene, sammenligner regler og skriver egne sportsregler` },
      { skill: `Datah\u00e5ndtering med kampdiagrammer`, emerging: `afl\u00e6ser et forh\u00e5ndslavet stregdiagram med st\u00f8tte`, proficient: `udfylder selvst\u00e6ndigt et kampresultat-diagram og besvarer sammenligningssp\u00f8rgsm\u00e5l`, advanced: `opretter egne diagrammer, beregner totaler og drager konklusioner fra data` },
    ],
  },

  spring: {
    snippetAnswer: `For\u00e5r-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner m\u00e5ling med centimeter, plantelivscyklus, dataindsamling med spiringsdiagrammer og selvst\u00e6ndig skrivning af naturobservationer. For\u00e5ret bliver et levende laboratorium. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver for\u00e5rstemaet en videnskabelig unders\u00f8gelse \u2014 seks- og syv\u00e5rige kan m\u00e5le plantev\u00e6kst i centimeter over uger, registrere spiringsdata i diagrammer og forst\u00e5 plantelivscyklus som en logisk sekvens (fr\u00f8\u2192spire\u2192st\u00e6ngel\u2192blomst\u2192frugt). Addition og subtraktion inden for 20 med tulipaner, regndage og fuglet\u00e6llinger giver flertrinsproblemer med \u00e5rstidskontekst. L\u00e6sning af korte fagtekster om best\u00f8vning og tr\u00e6kfugle tr\u00e6ner informationsl\u00e6sning. Naturobservationsdagbog med dato, m\u00e5ling og tegning opbygger faglitter\u00e6r rapportering. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, m\u00e5ling og skriftlig rapportering i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `M\u00e5ling af v\u00e6kst med standardenheder (6\u20137-\u00e5rige bruger lineal og centimeter)`, howWeAddress: `Plantev\u00e6kst-m\u00e5leark, hvor eleverne m\u00e5ler spirer i centimeter over uger, giver autentisk linealbrug` },
      { milestone: `Livscyklusforst\u00e5else (sekvensering af biologiske processer)`, howWeAddress: `Plantelivscyklus-ark med klip-og-s\u00e6t-i-r\u00e6kkef\u00f8lge-aktiviteter styrker logisk sekvenst\u00e6nkning` },
      { milestone: `Dataindsamling og registrering (spiringsdiagrammer med ugentlige m\u00e5linger)`, howWeAddress: `V\u00e6kstdiagrammer med felter for ugenummer, h\u00f8jde og tegning tr\u00e6ner systematisk dataindsamling` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, m\u00e5l kun i hele centimeter uden millimeter, begr\u00e6ns livscyklus til tre trin (fr\u00f8-spire-blomst), og tilbyd s\u00e6tningsstartere til observationsnotater. For avancerede elever i 1. klasse tilf\u00f8jes m\u00e5ling i halve centimeter, sammenligning af to plantearters v\u00e6kst og selvst\u00e6ndig skrivning af naturrapporter med data og konklusion.`,
    parentTakeaway: `Plant et fr\u00f8 sammen og m\u00e5l h\u00f8jden hver uge med en lineal \u2014 skriv tallet ned og tegn spiren. Tal om, hvad planten har brug for: vand, lys, jord. G\u00e5 en for\u00e5rstur og t\u00e6l blomster, fugle og insekter. Skriv en naturobservation sammen: \u201dvi s\u00e5... vi m\u00e5lte... vi tror...\u201d For\u00e5ret er det bedste klasselokale.`,
    classroomIntegration: `For\u00e5rstemaet i 1. klasse k\u00f8rer som \u00e5rstidsprojekt: klassens spirefors\u00f8g med ugentlige m\u00e5linger i naturfag, m\u00e5le- og diagramark i matematik, l\u00e6sning af for\u00e5rstekster i dansk og observationsdagbog med tegning og skrivning. Et for\u00e5rstidslinje h\u00e6nger i klassen. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, m\u00e5ling og skriftlig rapportering integreres.`,
    assessmentRubric: [
      { skill: `M\u00e5ling af plantev\u00e6kst`, emerging: `m\u00e5ler med lineal med st\u00f8tte og afl\u00e6ser hele centimeter usikkert`, proficient: `m\u00e5ler selvst\u00e6ndigt spirer i centimeter og registrerer korrekt i v\u00e6kstdiagram`, advanced: `m\u00e5ler pr\u00e6cist, beregner v\u00e6kstforskel mellem uger og sammenligner to planters v\u00e6kst` },
      { skill: `Plantelivscyklus-sekvensering`, emerging: `ordner tre trin (fr\u00f8-spire-blomst) med billedst\u00f8tte`, proficient: `ordner selvst\u00e6ndigt fem trin i plantelivscyklus og navngiver hvert trin`, advanced: `forklarer livscyklus med egne ord, sammenligner to planters cyklus og tegner hele forl\u00f8bet` },
      { skill: `Naturobservationsskrivning (for\u00e5r)`, emerging: `skriver 1\u20132 s\u00e6tninger om en for\u00e5rsobservation med s\u00e6tningsstartere`, proficient: `skriver selvst\u00e6ndigt en observation med dato, m\u00e5ling og beskrivelse`, advanced: `skriver en sammenh\u00e6ngende naturrapport med indledning, observation, data og konklusion` },
    ],
  },

  summer: {
    snippetAnswer: `Sommer-arbejdsark til 1. klasse (6\u20137 \u00e5r) forebygger sommerl\u00e6ringstab med addition/subtraktion inden for 20, tidsfornemmelse, pengeberegning og selvst\u00e6ndig l\u00e6sning og skrivning om ferieaktiviteter. Motivationen er h\u00f8j. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse er sommertemaet afg\u00f8rende for at fastholde hele \u00e5rets l\u00e6ring \u2014 seks- og syv\u00e5rige risikerer 1\u20133 m\u00e5neders fagligt tab uden \u00f8velse, og sommerarbejdsark g\u00f8r vedligeholdelsen lystbetonet. Addition og subtraktion inden for 20 med is, badeg\u00e6ster og feriebudget giver flertrinsproblemer med reel kontekst. Tidsfornemmelse (festen starter kl. 14, vi bader i 2 timer) og pengeberegning (isen koster 15 kr., vi har 50 kr.) introduceres naturligt. L\u00e6sning af korte tekster om sommersikkerhed, vejrforhold og ferieplanl\u00e6gning tr\u00e6ner informationsl\u00e6sning. Skrivning af feriedagbog og strandhistorier med dato og sensoriske detaljer opbygger kreativ og faglitter\u00e6r skrivning. F\u00e6lles M\u00e5ls m\u00e5l for matematik, l\u00e6sning og skrivning i 1. klasse vedligeholdes.`,
    developmentalMilestones: [
      { milestone: `Sommerl\u00e6ringsfastholdelse (6\u20137-\u00e5rige bibeholder f\u00e6rdigheder med regelm\u00e6ssig \u00f8velse)`, howWeAddress: `Engagerende sommerscenarier sikrer, at b\u00f8rn \u00f8ver 2\u20133 gange ugentligt frivilligt og forebygger l\u00e6ringstab` },
      { milestone: `Tidsfornemmelse og urforst\u00e5else (hele og halve timer)`, howWeAddress: `Ferieplaner med klokkeslaet (\u201dbadetid kl. 14, middag kl. 18\u201d) giver funktionel tidsl\u00e6ring` },
      { milestone: `Pengeberegning med kroner (addition og subtraktion med m\u00f8ntv\u00e6rdier)`, howWeAddress: `Strandbodscenarier med ispriser og budgetberegning tr\u00e6ner pengeforst\u00e5else i autentisk kontekst` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold regning inden for 10 med billedst\u00f8tte, brug kun hele timer til tidsl\u00e6ring, og tilbyd udfyldte ferieskabeloner til skrivning. For avancerede elever i 1. klasse tilf\u00f8jes flertrinsproblemer med tre regneoperationer, halve timer og pengeberegning med byttepenge.`,
    parentTakeaway: `G\u00f8r sommeren til et levende l\u00e6ringsv\u00e6rksted: lad barnet betale isen selv og t\u00e6lle byttepenge, f\u00f8r en feriedagbog med dato og tegning, l\u00e6s en kort tekst dagligt, og planl\u00e6g dagens program med klokkeslaet. To arbejdsark om ugen i ti minutter forebygger det meste sommerl\u00e6ringstab.`,
    classroomIntegration: `Sommertemaet bruges som feriebrobl\u00e6gning: inden ferien laves en sommerpakke med to ark om ugen, feriematematik med is- og strandopgaver, l\u00e6sehefter med sommertekster og en feriedagbogs-skabelon. Efter ferien deles oplevelser med data fra dagb\u00f8gerne. F\u00e6lles M\u00e5ls m\u00e5l for l\u00e6ringsfastholdelse underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Addition/subtraktion med sommerscenarier`, emerging: `l\u00f8ser \u00e9t-trins-opgaver inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt to-trins-problemer inden for 20 med ferie- og strandscenarier`, advanced: `l\u00f8ser tre-trins-problemer med pengeberegning og formulerer egne sommeropgaver` },
      { skill: `Tidsfornemmelse (hele og halve timer)`, emerging: `afl\u00e6ser hele timer p\u00e5 analogt ur med st\u00f8tte`, proficient: `afl\u00e6ser selvst\u00e6ndigt hele og halve timer og planl\u00e6gger simple dagsprogrammer`, advanced: `beregner tidsforskelle (fra kl. 14 til kl. 16 = 2 timer) og opretter detaljerede ferieplaner` },
      { skill: `Feriedagbogsskrivning`, emerging: `skriver 1\u20132 s\u00e6tninger om en sommerdag med s\u00e6tningsstartere`, proficient: `skriver selvst\u00e6ndigt 3\u20134 s\u00e6tninger med dato, aktivitet og sensorisk beskrivelse`, advanced: `skriver sammenh\u00e6ngende dagbogsindl\u00e6g med indledning, h\u00e6ndelsesforl\u00f8b og refleksion` },
    ],
  },

  superheroes: {
    snippetAnswer: `Superhelte-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner addition/subtraktion inden for 20 med missionsproblemer, positionsv\u00e6rdi med superkr\u00e6fter-tal, og selvst\u00e6ndig l\u00e6sning og skrivning af heltebeskrivelser og missionsrapporter. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r superheltetemaet kognitiv dybde \u2014 seks- og syv\u00e5rige kan l\u00f8se flertrinsmissioner, hvor helten f\u00f8rst redder 8 mennesker, derefter 7 mere og til sidst mister 3 (sekventiel beregning inden for 20). Positionsv\u00e6rdi illustreres med superkr\u00e6fter: en helt med styrke 14 har 1 tier og 4 enere. L\u00e6sning af korte heltehistorier med morale (\u201dhvorfor hjalp helten?\u201d) tr\u00e6ner inferens og v\u00e6rdirefleksion. Skrivning af egne heltebeskrivelser med superkr\u00e6fter, udseende og mission opbygger kreativ og beskrivende skrivning. Probleml\u00f8sning med logikpuslespil i missionsformat udvikler strategisk t\u00e6nkning. F\u00e6lles M\u00e5ls m\u00e5l for matematik, l\u00e6sning og kreativ skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Sekventiel beregning (6\u20137-\u00e5rige l\u00f8ser opgaver med to-tre trin)`, howWeAddress: `Missionsscenarier med flere faser (red 8 + red 7 - mist 3) giver naturlige flertrinsopgaver` },
      { milestone: `Positionsv\u00e6rdi med tocifrede tal (forst\u00e5else af tiere og enere)`, howWeAddress: `Superkr\u00e6fter-talark, hvor heltens styrke opdeles i tiere og enere, g\u00f8r positionsv\u00e6rdi spandende` },
      { milestone: `Inferensl\u00e6sning (at drage slutninger om personers motiver)`, howWeAddress: `Heltehistorier med sp\u00f8rgsm\u00e5l som \u201dhvorfor valgte helten at hj\u00e6lpe?\u201d tr\u00e6ner inferens og v\u00e6rdirefleksion` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold missioner p\u00e5 \u00e9t trin inden for 10 med billedst\u00f8tte, begr\u00e6ns positionsv\u00e6rdi til talene 10\u201315, og tilbyd heltebeskrivelse-skabeloner. For avancerede elever i 1. klasse tilf\u00f8jes tre-trins-missioner med tierovergang, positionsv\u00e6rdi op til 50 og selvst\u00e6ndig skrivning af heltehistorier med dialog.`,
    parentTakeaway: `Opfind en superhelt sammen og giv den et styrke-tal: \u201dhvordan opdeler vi 16 i tiere og enere?\u201d Lav missioner p\u00e5 papir: \u201dhelten redder 9, s\u00e5 5 mere \u2014 hvor mange i alt?\u201d L\u00e6s heltehistorier og tal om, hvad der g\u00f8r en rigtig helt (mod, venlighed, hj\u00e6lpsomhed). Skriv en heltebeskrivelse sammen.`,
    classroomIntegration: `Superheltetemaet i 1. klasse bruges som motivationsramme: matematik med missionsopgaver og positionsv\u00e6rdi-helteark, dansk med heltehistoriel\u00e6sning og heltebeskrivelse-skrivning, klassens v\u00e6rdier illustreret med \u201dhverdagsheltes\u201d kvaliteter, og morgenopvarmning med logikpuslespil i missionsformat. F\u00e6lles M\u00e5ls m\u00e5l for tal, l\u00e6sning, skrivning og social kompetence underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Flertrinsberegning (missionsformat)`, emerging: `l\u00f8ser \u00e9t-trins-missioner inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt to-trins-missioner inden for 20 med korrekt sekventiel beregning`, advanced: `l\u00f8ser tre-trins-missioner med tierovergang og formulerer egne missionsopgaver` },
      { skill: `Positionsv\u00e6rdi (superhelte-tal)`, emerging: `identificerer tiere og enere i tal 10\u201315 med konkret st\u00f8tte`, proficient: `opdeler selvst\u00e6ndigt tocifrede tal op til 20 i tiere og enere og forklarer`, advanced: `opdeler tal op til 50 og bruger positionsv\u00e6rdi til beregninger` },
      { skill: `Heltebeskrivelse-skrivning`, emerging: `skriver 1\u20132 s\u00e6tninger om en helt med skabelonst\u00f8tte`, proficient: `skriver selvst\u00e6ndigt en beskrivelse med udseende, superkraft og mission`, advanced: `skriver en sammenh\u00e6ngende heltehistorie med indledning, handling og afslutning` },
    ],
  },

  toys: {
    snippetAnswer: `Leget\u00f8j-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner addition/subtraktion inden for 20 med leget\u00f8jsbutik-priser, klassifikation efter flere egenskaber, og selvst\u00e6ndig l\u00e6sning og skrivning af leget\u00f8jsbeskrivelser og anmeldelser. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r leget\u00f8jstemaet matematisk og sproglig dybde \u2014 seks- og syv\u00e5rige kan bruge leget\u00f8jsbutik-scenarier til pengeberegning og flertrinsproblemer: en dukke koster 12 kr. og en bil 7 kr., hvad koster begge? Klassifikation udvides til tre kriterier (materiale, farve, funktion), og Venn-diagrammer sammenligner leget\u00f8jsgrupper. L\u00e6sning af korte produktbeskrivelser og brugsanvisninger tr\u00e6ner funktionel l\u00e6sning. Skrivning af leget\u00f8jsanmeldelser med begrundelse (\u201djeg kan lide den, fordi...\u201d) opbygger argumenterende skrivning. M\u00e5ling af leget\u00f8j i centimeter introducerer standardm\u00e5l. F\u00e6lles M\u00e5ls m\u00e5l for matematik, l\u00e6sning og skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Pengeberegning med enkle priser (6\u20137-\u00e5rige adderer og subtraherer kronev\u00e6rdier)`, howWeAddress: `Leget\u00f8jsbutik-scenarier med prisskilte og budget giver autentisk pengeregning inden for 20` },
      { milestone: `Klassifikation med tre kriterier (materiale, farve, funktion)`, howWeAddress: `Sorteringsark med leget\u00f8j efter tre egenskaber og Venn-diagrammer opbygger avanceret logisk t\u00e6nkning` },
      { milestone: `Argumenterende skrivning (begrundelse af en mening)`, howWeAddress: `Leget\u00f8jsanmeldelse-skabeloner med \u201djeg synes... fordi...\u201d tr\u00e6ner begyndende argumentation` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold priser inden for 10 med billedst\u00f8tte, begr\u00e6ns klassifikation til to kriterier, og tilbyd s\u00e6tningsstartere til anmeldelser. For avancerede elever i 1. klasse tilf\u00f8jes byttepenge-beregning, tredobbelt Venn-diagrammer og selvst\u00e6ndig skrivning af produktbeskrivelser med flere afsnit.`,
    parentTakeaway: `Leg leget\u00f8jsbutik derhjemme: s\u00e6t prisskilte p\u00e5 leget\u00f8j, giv barnet et budget p\u00e5 20 kr. i legepenfe, og lad det k\u00f8be og beregne rest. Sort\u00e9r leget\u00f8j i kasser efter tre egenskaber. Lad barnet skrive en anmeldelse af sit yndlingsleget\u00f8j: \u201dhvad er det, hvad kan det, hvorfor kan jeg lide det?\u201d`,
    classroomIntegration: `Leget\u00f8jstemaet i 1. klasse bruges til pengeberegning i matematik med leget\u00f8jsbutik-rollespil, klassifikation med sorteringsark, funktionel l\u00e6sning af brugsanvisninger i dansk, og leget\u00f8jsanmeldelse-skrivning. En klasseudstilling af hjemmebrkugt leget\u00f8j med m\u00e5linger og beskrivelser samler fagene. F\u00e6lles M\u00e5ls m\u00e5l for matematik, l\u00e6sning og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Pengeberegning (leget\u00f8jsbutik)`, emerging: `l\u00e6gger to priser inden for 10 sammen med billedst\u00f8tte`, proficient: `beregner selvst\u00e6ndigt samlet pris og rest inden for 20 med prisskilte`, advanced: `l\u00f8ser flertrinsproblemer med tre varer og byttepenge-beregning` },
      { skill: `Klassifikation med flere kriterier`, emerging: `sorterer leget\u00f8j efter \u00e9n egenskab (farve eller st\u00f8rrelse) med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter to\u2013tre kriterier og forklarer valget`, advanced: `bruger Venn-diagrammer til at sammenligne leget\u00f8jsgrupper og finder overlap` },
      { skill: `Leget\u00f8jsanmeldelse-skrivning`, emerging: `skriver 1\u20132 s\u00e6tninger med skabelonst\u00f8tte (\u201djeg kan lide...\u201d)`, proficient: `skriver selvst\u00e6ndigt en anmeldelse med beskrivelse, mening og begrundelse`, advanced: `skriver en detaljeret anmeldelse med flere begrundelser og sammenligning med andet leget\u00f8j` },
    ],
  },

  transportation: {
    snippetAnswer: `Transport-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner addition/subtraktion inden for 20 med passagert\u00e6lling, m\u00e5ling af k\u00f8ret\u00f8jer i centimeter, og selvst\u00e6ndig l\u00e6sning og skrivning om trafikregler og k\u00f8ret\u00f8jstyper. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r transporttemaet funktionel dybde \u2014 seks- og syv\u00e5rige kan l\u00f8se flertrinsproblemer med passagerer (12 stiger p\u00e5 bussen, 5 stiger af, 3 nye stiger p\u00e5 \u2014 hvor mange nu?), m\u00e5le k\u00f8ret\u00f8jsmodeller i centimeter og klassificere transport efter flere kriterier (land/vand/luft, motor/muskelkraft, privat/offentlig). L\u00e6sning af korte tekster om trafikregler og transporthistorie tr\u00e6ner informationsl\u00e6sning. Skrivning af k\u00f8ret\u00f8jsbeskrivelser og rejsedagb\u00f8ger opbygger faglitter\u00e6r og kreativ skrivning. Dataindsamling med k\u00f8ret\u00f8jst\u00e6llinger i stregdiagrammer introducerer trafikdata. F\u00e6lles M\u00e5ls m\u00e5l for matematik, m\u00e5ling, l\u00e6sning og naturfag i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Flertrinsproblemer med passagert\u00e6lling (6\u20137-\u00e5rige l\u00f8ser to-trins-busopgaver)`, howWeAddress: `Bus- og togscenarier med p\u00e5stigning, afstigning og nye passagerer giver sekventielle beregninger` },
      { milestone: `M\u00e5ling af genstande i centimeter (konkret linealbrug)`, howWeAddress: `K\u00f8ret\u00f8jsm\u00e5lingsark, hvor eleverne m\u00e5ler leget\u00f8jsbiler og sammenligner l\u00e6ngder` },
      { milestone: `Klassifikation efter tre kriterier (land/vand/luft, motor/muskel, privat/offentlig)`, howWeAddress: `Sorteringsark med transport i tredobbelt klassifikation opbygger multidimensionel logisk t\u00e6nkning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold passageropgaver p\u00e5 \u00e9t trin inden for 10 med billedst\u00f8tte, begr\u00e6ns klassifikation til to kriterier, og brug leget\u00f8jsk\u00f8ret\u00f8jer som konkret supplement. For avancerede elever i 1. klasse tilf\u00f8jes tre-trins-opgaver med tierovergang, m\u00e5ling med halve centimeter og selvst\u00e6ndig skrivning af transporthistorie-tekster.`,
    parentTakeaway: `T\u00e6l k\u00f8ret\u00f8jer p\u00e5 en ggt\u00e5tur: hvor mange biler, cykler, busser? F\u00f8r et stregdiagram p\u00e5 papir. M\u00e5l leget\u00f8jsbiler med en lineal. Tal om trafikregler: \u201dhvorfor stopper vi ved r\u00f8dt?\u201d Tag bussen og t\u00e6l, hvem der stiger p\u00e5 og af. Lad barnet skrive en rejsedagbog: \u201dvi tog toget til... det tog 45 minutter.\u201d`,
    classroomIntegration: `Transporttemaet i 1. klasse integreres i matematik med passageropgaver og k\u00f8ret\u00f8jsm\u00e5ling, naturfag med klassifikation af transportmidler, dansk med l\u00e6sning af trafikregler og skrivning af rejsebeskrivelser, og samfundsfag med offentlig transport og trafiksikkerhed. F\u00e6lles M\u00e5ls m\u00e5l for matematik, m\u00e5ling, l\u00e6sning og samfundsforst\u00e5else underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Flertrinsproblemer med passagerer`, emerging: `l\u00f8ser \u00e9t-trins-passageropgaver inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt to-trins-busopgaver inden for 20 med korrekt sekventiel beregning`, advanced: `l\u00f8ser tre-trins-opgaver med tierovergang og formulerer egne transportopgaver` },
      { skill: `M\u00e5ling af k\u00f8ret\u00f8jer (centimeter)`, emerging: `m\u00e5ler med lineal med st\u00f8tte og afl\u00e6ser hele centimeter`, proficient: `m\u00e5ler selvst\u00e6ndigt leget\u00f8jsk\u00f8ret\u00f8jer og sammenligner l\u00e6ngder korrekt`, advanced: `m\u00e5ler i halve centimeter, beregner l\u00e6ngdeforskelle og rangordner flere k\u00f8ret\u00f8jer` },
      { skill: `Transportklassifikation`, emerging: `sorterer k\u00f8ret\u00f8jer i to grupper (land/vand) med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter tre kriterier og forklarer klassifikationen mundtligt`, advanced: `finder undtagelser (amfibiek\u00f8ret\u00f8jer), diskuterer grat\u00e6nser og opretter egne klassifikationssystemer` },
    ],
  },

  travel: {
    snippetAnswer: `Rejse-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner addition/subtraktion inden for 20 med rejsebudget, kortopl\u00e6sning med enkle verdenskort, og selvst\u00e6ndig l\u00e6sning og skrivning af rejsebeskrivelser og postkort. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r rejsetemaet geografisk og matematisk dybde \u2014 seks- og syv\u00e5rige kan bruge enkle kort, forst\u00e5 himmelretninger (nord, syd, \u00f8st, vest) og beregne rejsebudgetter med addition inden for 20 (billet 12 kr. + madpakke 8 kr.). L\u00e6sning af korte rejsetekster om lande, kulturer og sev\u00e6rdigheder tr\u00e6ner informationsl\u00e6sning. Skrivning af postkort og rejsedagb\u00f8ger med beskrivelser af steder og oplevelser opbygger funktionel og kreativ skrivning. Klassifikation af lande efter kontinent og sammenligning af afstande styrker geografisk t\u00e6nkning. Tidszoner og valuta giver tidlige tv\u00e6rfaglige forbindelser. F\u00e6lles M\u00e5ls m\u00e5l for matematik, geografi, l\u00e6sning og skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Kortforst\u00e5else og himmelretninger (6\u20137-\u00e5rige l\u00e6ser enkle kort)`, howWeAddress: `Rejse-kortark med landegrenser og himmelretningspile, hvor eleverne f\u00f8lger ruter og navngiver retninger` },
      { milestone: `Budgetberegning med flertrinsaddition (rejseomkostninger)`, howWeAddress: `Rejsebudget-ark med billet, mad og souvenir-priser giver autentisk flertrinsregning` },
      { milestone: `Funktionel skrivning (postkort og dagbog med adressat, hilsen og beskrivelse)`, howWeAddress: `Postkortskabeloner med felter for adresse, hilsen, beskrivelse og afsender tr\u00e6ner struktureret funktionel skrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns til to\u2013tre velkendte lande, hold budgetregning inden for 10, og tilbyd postkortskabeloner med s\u00e6tningsstartere. For avancerede elever i 1. klasse tilf\u00f8jes verdenskort med alle kontinenter, flertrinsproblemer med tre udgiftsposter og selvst\u00e6ndig skrivning af rejsebeskrivelser med flere afsnit.`,
    parentTakeaway: `Planl\u00e6g en fantasirejse p\u00e5 verdenskortet: v\u00e6lg et land, beregn et legebudget, og skriv et postkort hjem. Brug feriefotos til at lave en rejsedagbog med dato og beskrivelse. Tal om himmelretninger p\u00e5 en g\u00e5tur: \u201dhvilken vej er nord?\u201d Send et rigtigt postkort fra ferien og lad barnet skrive det selv.`,
    classroomIntegration: `Rejsetemaet i 1. klasse k\u00f8rer som tv\u00e6rfagligt projekt: geografi med verdenskort og himmelretninger, matematik med rejsebudgetberegning, dansk med postkort- og dagbogsskrivning, og kulturforst\u00e5else med korte tekster om andre lande. En klasse-rejsev\u00e6g med postkort fra \u201dbesagte\u201d lande samler fagene visuelt. F\u00e6lles M\u00e5ls m\u00e5l for geografi, matematik, l\u00e6sning og skrivning integreres.`,
    assessmentRubric: [
      { skill: `Kortl\u00e6sning og himmelretninger`, emerging: `peger p\u00e5 et land p\u00e5 kortet med st\u00f8tte og kender nord/syd`, proficient: `finder selvst\u00e6ndigt lande p\u00e5 et simpelt verdenskort og bruger alle fire himmelretninger`, advanced: `planl\u00e6gger en rute mellem lande og beskriver retningen med pr\u00e6cise himmelretninger` },
      { skill: `Rejsebudgetberegning`, emerging: `l\u00e6gger to rejseudgifter inden for 10 sammen med billedst\u00f8tte`, proficient: `beregner selvst\u00e6ndigt et budget med tre poster inden for 20 og finder resten`, advanced: `l\u00f8ser flertrinsproblemer med flere udgifter og beregner byttepenge` },
      { skill: `Postskrivning (postkort og rejsedagbog)`, emerging: `udfylder et postkort med st\u00f8tte fra skabelon og voksen`, proficient: `skriver selvst\u00e6ndigt et postkort med adresse, hilsen, beskrivelse og afsender`, advanced: `skriver b\u00e5de postkort og dagbogsindl\u00e6g med flere s\u00e6tninger og levende beskrivelser` },
    ],
  },

  vegetables: {
    snippetAnswer: `Gr\u00f8ntsag-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner m\u00e5ling og vejning af gr\u00f8ntsager, f\u00f8devaregruppeforst\u00e5else, og selvst\u00e6ndig l\u00e6sning af opskrifter og skrivning af madrapporter. Sunde valg f\u00e5r faglig substans. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r gr\u00f8ntsagstemaet funktionel dybde \u2014 seks- og syv\u00e5rige kan m\u00e5le gr\u00f8ntsager i centimeter (guler\u00f8ddens l\u00e6ngde), veje i hele gram og forst\u00e5 f\u00f8devaregrupper som et system. Addition inden for 20 med ingredienser (8 guler\u00f8dder + 6 kartofler), br\u00f8kbegreber med halvering og fjerdedele af gr\u00f8ntsager (halv agurk, kvart peberfrugt) og prisberegning p\u00e5 gr\u00f8ntmarkedet giver rig matematisk kontekst. L\u00e6sning af simple opskrifter med trinvis instruktion tr\u00e6ner procesl\u00e6sning. Skrivning af madrapporter (\u201dvi lavede salat: f\u00f8rst vaskede vi...\u201d) opbygger procesbeskrivelse. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, sundhed og skriftlig fremstilling i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `M\u00e5ling og vejning af genstande (6\u20137-\u00e5rige bruger lineal og simpel v\u00e6gt)`, howWeAddress: `Gr\u00f8ntsagsm\u00e5lingsark, hvor eleverne m\u00e5ler l\u00e6ngde i cm og v\u00e6gt i hele gram med konkrete gr\u00f8ntsager` },
      { milestone: `F\u00f8devaregruppeforst\u00e5else (klassifikation af mad i grupper)`, howWeAddress: `Sorteringsark med f\u00f8devaregrupper (gr\u00f8ntsager, frugt, korn, protein) opbygger sundhedsforst\u00e5else` },
      { milestone: `Procesl\u00e6sning (f\u00f8lge trinvise instruktioner i r\u00e6kkef\u00f8lge)`, howWeAddress: `Opskriftsl\u00e6sningsark med enkle salat- og suppeopskrifter tr\u00e6ner sekventiel procesl\u00e6sning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, m\u00e5l kun i hele centimeter med store gr\u00f8ntsager, begr\u00e6ns til tre f\u00f8devaregrupper, og brug billedopskrifter. For avancerede elever i 1. klasse tilf\u00f8jes vejning og prisberegning, br\u00f8kbegreber med halve og kvarte gr\u00f8ntsager, og selvst\u00e6ndig skrivning af egne opskrifter.`,
    parentTakeaway: `Lav mad sammen og lad barnet m\u00e5le: \u201dhvor lang er guler\u00f8dden?\u201d Vej kartofler p\u00e5 en k\u00f8kkenv\u00e6gt. L\u00e6s opskriften h\u00f8jt og f\u00f8lg trinene sammen. Tal om f\u00f8devaregrupper ved m\u00e5ltiderne: \u201dhvilken gruppe h\u00f8rer broccoli til?\u201d Lad barnet skrive en madrapport efter m\u00e5ltidet: \u201dvi brugte 5 tomater og 3 agurker.\u201d`,
    classroomIntegration: `Gr\u00f8ntsagstemaet i 1. klasse integreres i sundhedsundervisning med f\u00f8devaregrupper, matematik med m\u00e5ling og vejning, dansk med opskriftsl\u00e6sning og madrapportskrivning, og madkundskab med salattilberedning. Et klassek\u00f8kken-projekt, hvor eleverne m\u00e5ler, vejer, laver og skriver, samler alle fag. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, m\u00e5ling, l\u00e6sning og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `M\u00e5ling og vejning af gr\u00f8ntsager`, emerging: `m\u00e5ler med lineal med st\u00f8tte og afl\u00e6ser hele centimeter usikkert`, proficient: `m\u00e5ler selvst\u00e6ndigt l\u00e6ngde i cm og v\u00e6gt i gram og registrerer korrekt`, advanced: `m\u00e5ler pr\u00e6cist, beregner forskelle og sammenligner flere gr\u00f8ntsagers m\u00e5l` },
      { skill: `F\u00f8devaregruppe-klassifikation`, emerging: `sorterer 3\u20134 f\u00f8devarer i to grupper med billedst\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt 8\u201310 f\u00f8devarer i fire grupper og navngiver grupperne`, advanced: `forklarer n\u00e6ringsindhold, diskuterer sunde valg og placerer undtagelser korrekt` },
      { skill: `Opskriftsl\u00e6sning og madrapport`, emerging: `f\u00f8lger en billedopskrift med 3 trin med st\u00f8tte`, proficient: `l\u00e6ser selvst\u00e6ndigt en skriftlig opskrift og f\u00f8lger trinene korrekt`, advanced: `l\u00e6ser opskrifter og skriver egne madrapporter med ingredienser, trin og resultat` },
    ],
  },

  weather: {
    snippetAnswer: `Vejr-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner dataindsamling med vejrdiagrammer, temperaturforst\u00e5else, og selvst\u00e6ndig l\u00e6sning og skrivning af vejrrapporter. Systematisk observation g\u00f8r vejret til videnskab. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver vejrtemaet et videnskabeligt observationsprojekt \u2014 seks- og syv\u00e5rige kan registrere dagligt vejr i diagrammer over uger, l\u00e6se temperaturer p\u00e5 termometre og sammenligne vejrdata med stregdiagrammer. Addition inden for 20 med vejrdata (8 solskinsdage + 6 regnvejrsdage), temperatursammenligning (\u201dmandag var 12\u00b0C, tirsdag var 8\u00b0C \u2014 hvor meget koldere?\u201d) og gennemsnitlig nedb\u00f8r giver funktionel matematik. L\u00e6sning af vejrudsigter og \u00e5rstidstekster tr\u00e6ner informationsl\u00e6sning. Skrivning af vejrrapporter med dato, temperatur og beskrivelse opbygger fagrapportering. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, data, m\u00e5ling og skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Systematisk dataindsamling over tid (6\u20137-\u00e5rige registrerer dagligt vejr i tabeller)`, howWeAddress: `Vejrdagbogsark med felter for dato, symbol, temperatur og nedb\u00f8r giver daglig dataindsamlingsrutine` },
      { milestone: `Temperaturl\u00e6sning p\u00e5 termometer (forst\u00e5else af grader Celsius)`, howWeAddress: `Termometerafl\u00e6sningsark med illustrerede termometre og sammenligningsopgaver tr\u00e6ner m\u00e5leafl\u00e6sning` },
      { milestone: `Vejrrapportskrivning (dato, observation, data og konklusion)`, howWeAddress: `Vejrrapportskabeloner guider eleverne fra observation til struktureret skriftlig rapport` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, brug billedsymboler i stedet for tekst i vejrdiagrammer, afl\u00e6s kun hele 5-graders-trin, og tilbyd s\u00e6tningsstartere til vejrrapporter. For avancerede elever i 1. klasse tilf\u00f8jes temperaturberegning (forskel mellem dage), ugentlige diagrammer med analyse og selvst\u00e6ndig skrivning af vejrudsigter.`,
    parentTakeaway: `Lav en familievejrstation: h\u00e6ng et termometer udenfor og lad barnet afl\u00e6se temperaturen hver morgen. F\u00f8r et vejrdiagram p\u00e5 k\u00f8leskabet med solskin, sky, regn. Tal om vejrudsigten: \u201dhvad tror du, vejret bliver i morgen?\u201d Skriv en ugentlig vejrrapport sammen. Vejret er gratis naturfag.`,
    classroomIntegration: `Vejrtemaet i 1. klasse k\u00f8rer som \u00e5rsprojekt: daglig vejrregistrering i morgensamlingen, ugentlige diagrammer i matematik, \u00e5rstidstekster i dansk, og temperaturafl\u00e6sning i naturfag. Klassens vejrtavle viser m\u00e5nedens data. F\u00e6lles M\u00e5ls m\u00e5l for data, m\u00e5ling, naturfag og skrivning integreres hele \u00e5ret.`,
    assessmentRubric: [
      { skill: `Vejrdataindsamling og -registrering`, emerging: `tegner vejrsymboler i et diagram med st\u00f8tte`, proficient: `registrerer selvst\u00e6ndigt dagligt vejr med symbol, temperatur og nedb\u00f8r i et diagram`, advanced: `analyserer ugedata, sammenligner m\u00f8nstre og drager konklusioner om vejrtendenser` },
      { skill: `Temperaturafl\u00e6sning (grader Celsius)`, emerging: `afl\u00e6ser temperatur p\u00e5 markerede 5-graders-trin med st\u00f8tte`, proficient: `afl\u00e6ser selvst\u00e6ndigt temperatur i hele grader og sammenligner to dages temperatur`, advanced: `beregner temperaturforskel mellem dage og forklarer sammenh\u00e6ng mellem temperatur og vejrtype` },
      { skill: `Vejrrapportskrivning`, emerging: `skriver 1\u20132 s\u00e6tninger om dagens vejr med s\u00e6tningsstartere`, proficient: `skriver selvst\u00e6ndigt en rapport med dato, temperatur, vejrtype og kort beskrivelse`, advanced: `skriver en sammenh\u00e6ngende ugerapport med data, sammenligning og konklusion` },
    ],
  },

  winter: {
    snippetAnswer: `Vinter-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner addition/subtraktion inden for 20 med vintersportspoint, temperaturberegning under frysepunktet, og selvst\u00e6ndig l\u00e6sning og skrivning om vinterf\u00e6nomener og traditioner. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r vintertemaet matematisk og naturvidenskabelig dybde \u2014 seks- og syv\u00e5rige forst\u00e5r frysepunktet og kan sammenligne temperaturer (\u201dmandag var -3\u00b0C, tirsdag var 2\u00b0C \u2014 hvilken dag var koldest?\u201d). Addition inden for 20 med snekuglekampe, skist\u00e6vnemobl\u00e5l og julekalendertal giver vinterstemning i matematikken. M\u00e5ling af snedybde i centimeter og sammenligning over dage tr\u00e6ner dataindsamling. L\u00e6sning af korte tekster om isens fysik, dyrenes vinterstrategier (dvale, tr\u00e6k, vinterpels) og danske vintertraditioner giver rig informationsl\u00e6sning. Skrivning af vinterdagbog og beretninger om snedage opbygger kreativ og faglitter\u00e6r skrivning. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, m\u00e5ling, data og l\u00e6sning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Temperaturforst\u00e5else inkl. negative tal (6\u20137-\u00e5rige l\u00e6ser termometre under 0\u00b0C)`, howWeAddress: `Vintertermometer-ark med skalaer fra -10 til +10 giver tidlig forst\u00e5else af negative temperaturer` },
      { milestone: `M\u00e5ling af snedybde (dataindsamling med centimeter over tid)`, howWeAddress: `Snedybde-m\u00e5lingsark med daglige registreringer i et v\u00e6kstdiagram tr\u00e6ner systematisk dataindsamling` },
      { milestone: `Forst\u00e5else af dyrenes vinterstrategier (dvale, tr\u00e6k, tilpasning)`, howWeAddress: `Sorteringsark der grupperer dyr efter vinterstrategi opbygger biologisk forst\u00e5else og klassifikation` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold temperaturer over 0\u00b0C og regning inden for 10, brug billedst\u00f8tte til vinterstrategier (dvale = sovende bj\u00f8rn), og tilbyd s\u00e6tningsstartere. For avancerede elever i 1. klasse tilf\u00f8jes negative tal p\u00e5 termometre, temperaturberegning (forskel mellem -3 og 5), og selvst\u00e6ndig skrivning af naturfagstekster om isens fysik.`,
    parentTakeaway: `M\u00e5l snedybden med en lineal og f\u00f8r et diagram over ugen. Afl\u00e6s termometret hver morgen og tal om frysepunktet: \u201dhvorfor er der is, n\u00e5r det er under nul?\u201d S\u00f8g efter spor af dyrenes vinterstrategier: fuglebr\u00e6t (standfugle), tomme fuglekasser (tr\u00e6kfugle). Skriv en vinterdagbog med temperatur og oplevelser.`,
    classroomIntegration: `Vintertemaet i 1. klasse integreres i naturfag med temperaturafl\u00e6sning og dyrevinterstrategier, matematik med snedybdedata og vinterregnestykker, dansk med vintertekstl\u00e6sning og dagbogsskrivning, og kunst med snekrystalgeometri. Klassens vintertermometer opdateres dagligt. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, data, m\u00e5ling og l\u00e6sning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Temperaturafl\u00e6sning inkl. negative tal`, emerging: `afl\u00e6ser temperatur over 0\u00b0C p\u00e5 markerede trin med st\u00f8tte`, proficient: `afl\u00e6ser selvst\u00e6ndigt temperaturer fra -10 til +10 og sammenligner to dages v\u00e6rdier`, advanced: `beregner temperaturforskel mellem negative og positive v\u00e6rdier og forklarer frysepunktets betydning` },
      { skill: `Snedybde-dataindsamling`, emerging: `m\u00e5ler snedybde i hele centimeter med st\u00f8tte og tegner i diagram`, proficient: `registrerer selvst\u00e6ndigt daglige m\u00e5linger og afl\u00e6ser sit eget diagram korrekt`, advanced: `analyserer m\u00f8nstre i snedybdedata, beregner forskelle og drager konklusioner om vejret` },
      { skill: `Dyrs vinterstrategier`, emerging: `navngiver 1\u20132 vinterstrategier (dvale, tr\u00e6k) med billedst\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt 6\u20138 dyr efter vinterstrategi og forklarer valget`, advanced: `forklarer sammenh\u00e6ngen mellem f\u00f8degrundlag, klima og vinterstrategi med egne ord` },
    ],
  },

  xmas: {
    snippetAnswer: `Jule-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner addition/subtraktion inden for 20 med julekalendertal, positionsv\u00e6rdi med gavel\u00e5ger, og selvst\u00e6ndig l\u00e6sning og skrivning af julebeskrivelser og \u00f8nskelister. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r juletemaet matematisk og kulturel dybde \u2014 seks- og syv\u00e5rige bruger julekalenderen som t\u00e6lle- og additionsv\u00e6rkt\u00f8j (24 l\u00e5ger, dag 8 + dag 16 = dag 24), gaver med prisskilte til flertrinsregning (en bog til 15 kr. + et spil til 12 kr. = 27 kr. i alt), og julepynt i m\u00f8nstre til positionsv\u00e6rdi og m\u00f8nstergenkendelse. L\u00e6sning af korte tekster om danske juletraditioner (nisser, julefrokost, lucia) tr\u00e6ner kulturel l\u00e6sning. Skrivning af \u00f8nskelister med begrundelse (\u201djeg \u00f8nsker mig... fordi...\u201d) og julebeskrivelser opbygger argumenterende og beskrivende skrivning. F\u00e6lles M\u00e5ls m\u00e5l for matematik, l\u00e6sning, skrivning og kulturforst\u00e5else i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Julekalendermatematik (6\u20137-\u00e5rige bruger tal 1\u201324 funktionelt)`, howWeAddress: `Kalendertal-ark med addition, subtraktion og talr\u00e6kkef\u00f8lge inden for 24 giver daglig matematiktr\u00e6ning` },
      { milestone: `Prisberegning med tocifrede tal (begyndende positionsv\u00e6rdi)`, howWeAddress: `Gavebutik-scenarier med priser op til 20\u201330 kr. tr\u00e6ner flertrinsaddition og positionsv\u00e6rdi` },
      { milestone: `Kulturel l\u00e6sning (forst\u00e5else af traditioner gennem tekst)`, howWeAddress: `Korte tekster om nisser, julefrokost og lucia med forst\u00e5elsessp\u00f8rgsm\u00e5l tr\u00e6ner kulturel l\u00e6seforst\u00e5else` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold regning inden for 10 med juleilllustrationer, begr\u00e6ns til tre traditioner med billedst\u00f8tte, og tilbyd \u00f8nskeliste-skabeloner. For avancerede elever i 1. klasse tilf\u00f8jes prisberegning med byttepenge, sammenligning af juletraditioner i forskellige lande og selvst\u00e6ndig skrivning af julebeskrivelser med flere afsnit.`,
    parentTakeaway: `Brug julekalenderen som daglig matematik: \u201dhvilket nummer er det i dag, og hvad er i morgen? Hvor mange dage til juleaften?\u201d Skriv en \u00f8nskeliste med priser og l\u00e6g sammen. L\u00e6s om danske juletraditioner sammen. Lad barnet skrive julekort til bedstefor\u00e6ldre med egen hilsen og beskrivelse af juleaktiviteter.`,
    classroomIntegration: `Juletemaet i 1. klasse integreres i december-m\u00e5nedens undervisning: daglig kalendermatematik, ugentlig juletraditions-l\u00e6sning, jule\u00f8nskeliste-skrivning med begrundelse, og julepynt-m\u00f8nsterark. Et julekultur-projekt med fokus p\u00e5 danske og nordiske traditioner samler fagene. F\u00e6lles M\u00e5ls m\u00e5l for matematik, l\u00e6sning, skrivning og kulturforst\u00e5else underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Julekalendermatematik (tal 1\u201324)`, emerging: `t\u00e6ller kalenderdage med st\u00f8tte og l\u00f8ser addition inden for 10`, proficient: `l\u00f8ser selvst\u00e6ndigt additions- og subtraktionsopgaver med kalendertal inden for 24`, advanced: `l\u00f8ser flertrinsproblemer med kalendertal og formulerer egne julematematikopgaver` },
      { skill: `Prisberegning (gavebutik)`, emerging: `l\u00e6gger to priser inden for 10 sammen med billedst\u00f8tte`, proficient: `beregner selvst\u00e6ndigt samlet pris for to\u2013tre gaver inden for 20\u201330 kr.`, advanced: `l\u00f8ser budgetproblemer med byttepenge og sammenligner forskellige gavekombinationer` },
      { skill: `Julebeskrivelse og \u00f8nskeliste`, emerging: `skriver 1\u20132 \u00f8nsker med skabelonst\u00f8tte`, proficient: `skriver selvst\u00e6ndigt en \u00f8nskeliste med begrundelse og en kort julebeskrivelse`, advanced: `skriver en sammenh\u00e6ngende julebeskrivelse med traditioner, oplevelser og refleksion` },
    ],
  },

  zoo: {
    snippetAnswer: `Zoo-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner flertrinsproblemer med dyreindhegninger, kortl\u00e6sning med zoo-kort, klassifikation efter levested og f\u00f8devalg, og selvst\u00e6ndig skrivning af dyrefaktaark. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver zootemaet et tv\u00e6rfagligt forskningsprojekt \u2014 seks- og syv\u00e5rige kan navigere et zoo-kort med himmelretninger, l\u00f8se flertrinsproblemer med dyreindhegninger (14 aber minus 6 der sover + 3 nye = ?) og klassificere zoodyr efter tre kriterier (kontinent, f\u00f8devalg, kropsd\u00e6kke). L\u00e6sning af korte dyrefaktatekster med forst\u00e5elsessp\u00f8rgsm\u00e5l tr\u00e6ner informationsl\u00e6sning. Skrivning af egne dyrefaktaark med tre-fire fakta opbygger faglitter\u00e6r skrivning. M\u00e5ling af dyresh\u00f8jder i centimeter p\u00e5 illustrationer og sammenligning med stregdiagrammer giver funktionel m\u00e5ling. Bevaringsbegreber (truede arter, levestedstab) v\u00e6kker retf\u00e6rdighedssans. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, matematik, geografi og l\u00e6sning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Kortl\u00e6sning med himmelretninger (6\u20137-\u00e5rige navigerer et simpelt zoo-kort)`, howWeAddress: `Zoo-kortark med himmelretningspile og ruteplanl\u00e6gning tr\u00e6ner rumlig orientering og kortforst\u00e5else` },
      { milestone: `Treklassifikation af dyr (kontinent, f\u00f8devalg, kropsd\u00e6kke)`, howWeAddress: `Sorteringsark med zoodyr efter tre kriterier og Venn-diagrammer opbygger avanceret logisk t\u00e6nkning` },
      { milestone: `Dyrefakta-skrivning (korte informative tekster med struktur)`, howWeAddress: `Dyrefaktaark-skabeloner med felter for navn, udseende, f\u00f8de og levested guider faglitter\u00e6r skrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns zoo-kortet til fire omr\u00e5der, hold klassifikation p\u00e5 to kriterier, og tilbyd dyrefaktaskabeloner med s\u00e6tningsstartere. For avancerede elever i 1. klasse tilf\u00f8jes detaljerede zoo-kort med afstandsberegning, tredobbelt klassifikation og selvst\u00e6ndig skrivning af bevaringsargumenter.`,
    parentTakeaway: `Planl\u00e6g et zoobes\u00f8g med et zoo-kort: \u201dhvilken vej g\u00e5r vi til aberne \u2014 nord eller syd?\u201d T\u00e6l dyr i indhegningerne og l\u00f8s regnestykker: \u201dder er 12 pingviner, 5 sv\u00f8mmer \u2014 hvor mange st\u00e5r p\u00e5 land?\u201d Lad barnet skrive tre fakta om sit yndlingsdyr. Tal om truede arter: \u201dhvorfor er det vigtigt at beskytte dem?\u201d`,
    classroomIntegration: `Zootemaet i 1. klasse k\u00f8rer som naturfagsprojekt: forberedelse med kortl\u00e6sning og dyrefakta, matematiklektion med flertrinsproblemer og m\u00e5ling, dansklektion med l\u00e6sning af dyretekster og skrivning af faktaark, og en klasseudflugt eller virtuel tur til zoo. Et klasse-dyreatlas bygges op over forl\u00f8bet. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, geografi, matematik og l\u00e6sning integreres.`,
    assessmentRubric: [
      { skill: `Kortl\u00e6sning med zoo-kort`, emerging: `peger p\u00e5 omr\u00e5der p\u00e5 zoo-kortet med st\u00f8tte`, proficient: `navigerer selvst\u00e6ndigt et zoo-kort med himmelretninger og planl\u00e6gger en rute`, advanced: `beregner afstande mellem indhegninger og optimerer en rute for at se flest dyr` },
      { skill: `Dyreklassifikation (tre kriterier)`, emerging: `sorterer zoodyr efter \u00e9n egenskab (kontinent) med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter to\u2013tre kriterier og forklarer klassifikationen mundtligt`, advanced: `opretter egne klassifikationssystemer, bruger fagtermer og finder undtagelser` },
      { skill: `Dyrefakta-skrivning (zoo)`, emerging: `skriver 1\u20132 faktas\u00e6tninger med skabelonst\u00f8tte`, proficient: `skriver selvst\u00e6ndigt et dyrefaktaark med 3\u20134 fakta om udseende, f\u00f8de og levested`, advanced: `skriver en sammenh\u00e6ngende dyreprofil med fakta, sammenligning med andre arter og bevaringsargument` },
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

  // Check if already enriched (snippetAnswer in first-grade block)
  const firstGradeIdx = content.indexOf("'first-grade'");
  const secondGradeIdx = content.indexOf("'second-grade'");

  if (firstGradeIdx === -1 || secondGradeIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  // Check if snippetAnswer already exists in first-grade block
  const firstGradeBlock = content.substring(firstGradeIdx, secondGradeIdx);
  if (firstGradeBlock.includes('snippetAnswer')) {
    console.log(`SKIP (already enriched): ${theme}/da.ts`);
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
    console.error(`NO FAQ END FOUND: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = firstGradeIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/da.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
