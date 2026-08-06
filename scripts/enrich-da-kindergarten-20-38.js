#!/usr/bin/env node
/**
 * SEO Part 224: DA Kindergarten Grade Enrichment — Themes 20-38
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the kindergarten grade block of 19 DA theme files (fruits through space).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  fruits: {
    snippetAnswer: `Frugt-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 20, addition/subtraktion inden for 10, sortering efter farve og st\u00f8rrelse samt begyndende l\u00e6sning af frugtnavne. Sundhed og ern\u00e6ring integreres naturligt. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Frugttemaet blomstrer i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige g\u00e5r fra at kende frugter visuelt til at bruge dem som l\u00e6ringsredskaber \u2014 de t\u00e6ller \u00e6bler i grupper, l\u00e6gger jordb\u00e6r sammen (5+3), tr\u00e6kker druer fra (8\u20132) og sorterer efter flere egenskaber samtidig (farve og st\u00f8rrelse). Hvor f\u00f8rskoleb\u00f8rn navngav frugter, l\u00e6ser b\u00f8rnehaveklasseb\u00f8rn frugtord selvst\u00e6ndigt, skriver korte s\u00e6tninger (\u201dJeg kan lide \u00e6bler\u201d) og diskuterer ern\u00e6ring med fagligt ordforr\u00e5d. S\u00f8jlediagrammer over klassens yndlingsfrugter introducerer dataopsamling. F\u00e6lles M\u00e5ls m\u00e5l for matematik, sundhed og kommunikation m\u00f8des i \u00e9t saftigt tema.`,
    developmentalMilestones: [
      { milestone: `Addition og subtraktion inden for 10 med frugtt\u00e6llere (5\u20136-\u00e5rige mestrer grundregning)`, howWeAddress: `Frugtscener med addition (4 \u00e6bler plus 3 bananer) og subtraktion (7 druer minus 2 der spises) giver konkret repr\u00e6sentation` },
      { milestone: `Klassifikation efter flere egenskaber (farve + st\u00f8rrelse + type)`, howWeAddress: `Sorteringsark der grupperer frugter efter b\u00e5de farve og st\u00f8rrelse opbygger todimensionel logisk t\u00e6nkning` },
      { milestone: `Begyndende l\u00e6sning af hverdagsord (frugtnavne p\u00e5 3\u20136 bogstaver)`, howWeAddress: `Ord-billede-matchning og ordsporinger med \u00e6ble, p\u00e6re, banan og melon tr\u00e6ner l\u00e6sefundamentet med motiverende ord` },
      { milestone: `Dataopsamling og enkel grafisk repr\u00e6sentation`, howWeAddress: `Klasseunders\u00f8gelser om yndlingsfrugter med s\u00f8jlediagrammer introducerer datah\u00e5ndtering i en personlig kontekst` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til fire velkendte frugter (\u00e6ble, banan, p\u00e6re, appelsin), hold matematikken inden for 5 med konkrete frugtt\u00e6llere, og tilbyd ordkort med billeder. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes flertrinsproblemer (3 \u00e6bler + 4 bananer + 2 druer), br\u00f8kbegreber (halve \u00e6bler) og selvst\u00e6ndig skrivning af frugts\u00e6tninger.`,
    parentTakeaway: `Frugt er overalt i hverdagen \u2014 brug det! T\u00e6l frugter i frugtkurven, sorter efter farve ved mellemmad, og lad barnet skrive en indk\u00f8bsliste med frugtnavne. P\u00e5 markedet: \u201dhvor mange \u00e6bler skal vi k\u00f8be, hvis vi er fire og hver skal have to?\u201d Denne dagligdags matematik bygger talforst\u00e5else og sundhedsbevidsthed p\u00e5 \u00e9n gang.`,
    classroomIntegration: `Frugttemaet integreres i b\u00f8rnehaveklassens sundhedsuge: matematiktimen bruger frugt-additions- og sorteringsark, dansktimen l\u00e6ser og skriver frugtord, naturfag unders\u00f8ger fr\u00f8 og frugtens vej fra tr\u00e6 til tallerken, og kunsttimen trykker med halve frugter. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, matematik og kommunikation integreres.`,
    assessmentRubric: [
      { skill: `Addition/subtraktion med frugtt\u00e6llere`, emerging: `l\u00f8ser opgaver inden for 5 med konkrete frugter foran sig`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 10 med frugtbilleder p\u00e5 arbejdsark`, advanced: `l\u00f8ser flertrinsproblemer mentalt og formulerer egne frugt-regnestykker` },
      { skill: `Frugtklassifikation`, emerging: `sorterer frugter i to grupper efter \u00e9n egenskab (farve) med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter to egenskaber (farve og st\u00f8rrelse) og forklarer valget`, advanced: `opretter egne sorteringskriterier og klassificerer 10+ frugter i en Venn-diagramlignende struktur` },
      { skill: `L\u00e6sning af frugtord`, emerging: `genkender 3\u20134 frugtord med billedst\u00f8tte (\u00e6ble, banan)`, proficient: `l\u00e6ser selvst\u00e6ndigt 8\u201310 frugtnavne og staver dem i ordsogning`, advanced: `l\u00e6ser nye frugtnavne ved afkodning og skriver korte frugts\u00e6tninger selvst\u00e6ndigt` },
    ],
  },

  furniture: {
    snippetAnswer: `M\u00f8bel-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner geometriske former, rumlig orientering (foran/bagved/over/under), t\u00e6lling og begyndende l\u00e6sning med hverdagens m\u00f8bler. Praktisk matematik i hjemmet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `M\u00f8beltemaet er unikt v\u00e6rdifuldt i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige for f\u00f8rste gang kan beskrive rumlige relationer pr\u00e6cist \u2014 katten er under bordet, lampen st\u00e5r p\u00e5 hylden, stolen er ved siden af sengen. Denne rumlige sprogudvikling er en central milepael. Hvor f\u00f8rskoleb\u00f8rn legede med legekem\u00f8bler, analyserer b\u00f8rnehaveklasseb\u00f8rn geometriske former i m\u00f8bler (rektangul\u00e6re borde, cirkulere stole), t\u00e6ller m\u00f8bler i rum og bruger m\u00e5ling med uformelle enheder (bordet er 6 h\u00e5ndbrede langt). M\u00f8belord er ideelle l\u00e6seord med 3\u20136 bogstaver. F\u00e6lles M\u00e5ls m\u00e5l for geometri og rumlig forst\u00e5else m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Rumlige begreber og pr\u00e6positioner (5\u20136-\u00e5rige mestrer foran, bagved, over, under, ved siden af)`, howWeAddress: `Placeringsark der beder b\u00f8rn tegne genstande i forhold til m\u00f8bler opbygger pr\u00e6cist rumligt sprog` },
      { milestone: `Formgenkendelse i hverdagsgenstande (rektangler, cirkler, kvadrater i m\u00f8bler)`, howWeAddress: `Find-formen-i-m\u00f8blet-ark forbinder geometriske former med konkrete genstande i hjemmet` },
      { milestone: `Begyndende m\u00e5ling med uformelle enheder (h\u00e5ndbrede, skridt)`, howWeAddress: `M\u00e5leaktiviteter hvor b\u00f8rn m\u00e5ler m\u00f8bler med h\u00e5ndbrede og klodsbredder introducerer m\u00e5lekoncepter` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til fire basism\u00f8bler (bord, stol, seng, sofa), brug \u00e9n pr\u00e6position ad gangen, og supplement\u00e9r med konkrete dukkehusm\u00f8bler. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes v\u00e6relsesplanl\u00e6gning p\u00e5 gitterpapir, m\u00e5lesammenligninger og selvst\u00e6ndig skrivning af rumsbeskrivelser.`,
    parentTakeaway: `Hjemmet er et geometriklasselokale. Peg p\u00e5 former i m\u00f8bler: \u201dhvilken form har bordpladen? Spejlet?\u201d \u00d8v pr\u00e6positioner: \u201ds\u00e6t bamsen under stolen, bag sofaen.\u201d M\u00e5l m\u00f8bler med barnets fodl\u00e6ngder. Lad barnet tegne sit v\u00e6relse set ovenifra \u2014 det er begyndende kortl\u00e6sning.`,
    classroomIntegration: `M\u00f8beltemaet bruges i b\u00f8rnehaveklassens geometriforl\u00f8b: matematiktimen arbejder med form- og m\u00e5leark, dansktimen skriver m\u00f8belord og rumbeskrivelser, og dukkekrogen bruges som l\u00e6ringsstation med placerings\u00f8velser. Et klasseprojekt om at indrette et drommev\u00e6relse integrerer design, matematik og sprog. F\u00e6lles M\u00e5ls m\u00e5l for rumlig forst\u00e5else og kommunikation m\u00f8des.`,
    assessmentRubric: [
      { skill: `Rumlige pr\u00e6positioner`, emerging: `bruger 2\u20133 pr\u00e6positioner (p\u00e5, under) med st\u00f8tte og konkrete genstande`, proficient: `bruger selvst\u00e6ndigt 5\u20136 pr\u00e6positioner korrekt i b\u00e5de mundtlig og skriftlig kontekst`, advanced: `kombinerer pr\u00e6positioner i komplekse beskrivelser og tegner efter mundtlige instruktioner` },
      { skill: `Formgenkendelse i m\u00f8bler`, emerging: `identificerer cirkel og firkant i m\u00f8bler med st\u00f8tte`, proficient: `finder selvst\u00e6ndigt 4\u20135 geometriske former i m\u00f8blerede rum og navngiver dem`, advanced: `beskriver forme med sider og hj\u00f8rner og sammenligner m\u00f8blers geometri` },
      { skill: `M\u00e5ling af m\u00f8bler`, emerging: `m\u00e5ler med h\u00e5ndbrede med voksenst\u00f8tte (2\u20133 m\u00e5linger)`, proficient: `m\u00e5ler selvst\u00e6ndigt m\u00f8bler med uformelle enheder og noterer resultatet`, advanced: `sammenligner m\u00e5l og bruger begreber som dobbelt, halvt og forskel` },
    ],
  },

  garden: {
    snippetAnswer: `Have-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling, m\u00f8nstergenkendelse, livscyklus-sekvensering og begyndende l\u00e6sning med blomster, fr\u00f8 og insekter. Naturvidenskab og matematik forenes. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Havetemaet er ideelt for b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan observere v\u00e6kst over tid og forst\u00e5 livscyklus-sekvenser \u2014 en kognitiv f\u00e6rdighed der netop modnes i denne alder. Hvor f\u00f8rskoleb\u00f8rn plantede fr\u00f8 og ventede sp\u00e6ndt, registrerer b\u00f8rnehaveklasseb\u00f8rn systematisk v\u00e6kst med m\u00e5linger, t\u00e6ller kronblade og bl\u00e5de, og ordner livscyklusfaser (fr\u00f8 \u2192 spire \u2192 plante \u2192 blomst). Addition af blomster i bede (4+3) og m\u00f8nstergenkendelse i planteraker (tulipan, rose, tulipan, rose...) er naturligt indlejret. Haveord som spire, rod og bl\u00e5d tr\u00e6ner l\u00e6sning. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik m\u00f8des i gr\u00f8nne omgivelser.`,
    developmentalMilestones: [
      { milestone: `Livscyklusforst\u00e5else og sekvensering (5\u20136-\u00e5rige kan ordne biologiske faser kronologisk)`, howWeAddress: `Fr\u00f8-til-blomst-sekvenserings\u00f8velser med fire trin opbygger tidslig og biologisk forst\u00e5else` },
      { milestone: `Systematisk observation og registrering (b\u00f8rn registrerer v\u00e6kst over tid)`, howWeAddress: `V\u00e6kstdagbogs-ark der kombiner m\u00e5ling og tegning tr\u00e6ner naturfaglig metode med personligt engagement` },
      { milestone: `M\u00f8nstergenkendelse i naturlige r\u00e6kker (kronblade, plantem\u00f8nstre)`, howWeAddress: `M\u00f8nsterark med blomster- og bl\u00e5dsekvenser i AB-, ABB- og ABC-m\u00f8nstre tr\u00e6ner m\u00f8nstert\u00e6nkning` },
      { milestone: `T\u00e6lling og addition med naturlige genstande`, howWeAddress: `T\u00e6lleark med blomster i bede og fr\u00f8 i potter giver konkret matematik i en naturlig ramme` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns livscyklussen til tre trin (fr\u00f8-spire-blomst), brug \u00e9n velkendt plante (solsikke), og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes m\u00e5ling af plantev\u00e6kst i centimeter, flertrins-additionsproblemer og selvst\u00e6ndig skrivning af v\u00e6kstdagbog.`,
    parentTakeaway: `Plant et fr\u00f8 sammen og f\u00f8lg v\u00e6ksten \u2014 det er gratis naturfag og matematik. T\u00e6l kronblade p\u00e5 blomster i parken. M\u00e5l planten med en lineal og skriv h\u00f8jden ned. Lad barnet tegne havens blomster og skrive deres navne. Naturen er det bedste klasselokale.`,
    classroomIntegration: `Havetemaet f\u00f8lger \u00e5rstiderne: om for\u00e5ret plantes fr\u00f8, om sommeren observeres v\u00e6kst, og om efter\u00e5ret h\u00f8stes. Matematiktimen bruger t\u00e6lle- og m\u00f8nsterark med blomster, naturfagstimen registrerer v\u00e6kst, og dansktimen skriver havedagbog. En klassebed giver autentisk l\u00e6ring. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik integreres.`,
    assessmentRubric: [
      { skill: `Livscyklus-sekvensering (planter)`, emerging: `ordner 2 trin (fr\u00f8, blomst) med billedst\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 4 livscyklusfaser i korrekt r\u00e6kkef\u00f8lge og navngiver dem`, advanced: `forklarer hvert trin med egne ord og sammenligner forskellige planters livscyklusser` },
      { skill: `M\u00f8nstergenkendelse (havekontekst)`, emerging: `gentager et simpelt AB-m\u00f8nster med blomster med st\u00f8tte`, proficient: `forts\u00e6tter selvst\u00e6ndigt AB- og ABB-m\u00f8nstre med planteelementer`, advanced: `opretter egne ABC-m\u00f8nstre og forklarer m\u00f8nsterreglen mundtligt` },
      { skill: `T\u00e6lling og addition i haven`, emerging: `t\u00e6ller 5\u20138 blomster/fr\u00f8 med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 20 og l\u00f8ser additionsopgaver inden for 10 med havemotiver`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne regnestykker om haven` },
    ],
  },

  halloween: {
    snippetAnswer: `Halloween-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling, addition inden for 10, m\u00f8nstergenkendelse og begyndende l\u00e6sning med gr\u00e6skar, spindler og sp\u00f8gelser. Det uhyggelige tema holder motivationen h\u00f8j. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Halloweentemaet rammer b\u00f8rnehaveklassen perfekt, fordi fem- og seks\u00e5rige kan skelne mellem fantasi og virkelighed \u2014 de nyder det sp\u00e6ndende ved sp\u00f8gelser og hekse, men ved, det er p\u00e5 leg. Denne kognitive modenhed g\u00f8r halloweenarbejdsark engagerende uden at v\u00e6re skr\u00e6mmende. Hvor f\u00f8rskoleb\u00f8rn farvelagde gr\u00e6skar, t\u00e6ller b\u00f8rnehaveklasseb\u00f8rn slik i grupper, l\u00f8ser addition med sp\u00f8gelser (5+3) og subtraktion med flagermus (8\u20132), og genkender m\u00f8nstre i sp\u00f8gelsessekvenser. Halloweenord som heks, sp\u00f8gelse og vampyr er sp\u00e6ndende l\u00e6seord. F\u00e6lles M\u00e5ls m\u00e5l for tal, m\u00f8nstre og kreativitet m\u00f8des i \u00e9t uhyggeligt tema.`,
    developmentalMilestones: [
      { milestone: `Addition og subtraktion inden for 10 (b\u00f8rnehaveklassens matematiske kernef\u00e6rdighed)`, howWeAddress: `Halloweenscener med \u201d5 sp\u00f8gelser plus 3 sp\u00f8gelser\u201d og \u201d8 stykker slik minus 2 der spises\u201d giver motiverende regning` },
      { milestone: `M\u00f8nstergenkendelse og -forl\u00e6ngelse (AB, ABB, ABC)`, howWeAddress: `Sp\u00f8gelse-gr\u00e6skar-heks-m\u00f8nstre i sekvenser tr\u00e6ner m\u00f8nstert\u00e6nkning med visuelt engagerende elementer` },
      { milestone: `Begyndende l\u00e6sning af tematiske ord (3\u20136 bogstaver)`, howWeAddress: `Ordsporings- og ordsogningsark med halloweenord tr\u00e6ner l\u00e6sefundamentet med h\u00f8j motivation` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, brug venlige halloweenbilleder (smilende gr\u00e6skar), hold t\u00e6llingen inden for 5, og tilbyd ordkort med billeder. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes flertrinsproblemer med slikfordeling, ABC-m\u00f8nstre og selvst\u00e6ndig skrivning af halloweenhistorier.`,
    parentTakeaway: `Halloween er en gylden l\u00e6ringsanledning. T\u00e6l slik efter trick-or-treat, sorter efter type og farve, og lav additionsopgaver (\u201d3 chokolader plus 4 bolsjer\u201d). Sk\u00e6r gr\u00e6skar og t\u00e6l fr\u00f8. Skriv sp\u00f8gelseshistorier sammen. Barnet l\u00e6rer matematik og l\u00e6sning, mens det har det sjovt.`,
    classroomIntegration: `Halloweentemaet bruges som en kreativ temauge i oktober: matematiktimen arbejder med t\u00e6lle- og m\u00f8nsterark med halloweenmotiver, dansktimen l\u00e6ser sp\u00f8gelseshistorier og skriver halloweenord, og kunsttimen designer halloween-dekorationer. F\u00e6lles M\u00e5ls m\u00e5l for matematik, kreativitet og kommunikation integreres.`,
    assessmentRubric: [
      { skill: `Addition/subtraktion (halloweenkontekst)`, emerging: `l\u00f8ser opgaver inden for 5 med konkrete slikstykker eller sp\u00f8gelsesfigurer`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 10 med halloweenbilleder`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne halloweenregnestykker` },
      { skill: `M\u00f8nstergenkendelse (halloweenmotiver)`, emerging: `gentager et simpelt AB-m\u00f8nster med st\u00f8tte (gr\u00e6skar, sp\u00f8gelse...)`, proficient: `forts\u00e6tter selvst\u00e6ndigt AB- og ABB-m\u00f8nstre med halloweenelementer`, advanced: `opretter egne ABC-m\u00f8nstre og forklarer reglen mundtligt` },
      { skill: `Halloweenordforr\u00e5d og l\u00e6sning`, emerging: `genkender 2\u20133 halloweenord med billedst\u00f8tte (heks, sp\u00f8gelse)`, proficient: `l\u00e6ser selvst\u00e6ndigt 5\u20136 halloweenord og bruger dem i ordsogning`, advanced: `l\u00e6ser og skriver 8+ halloweenord og formulerer korte halloweens\u00e6tninger` },
    ],
  },

  holidays: {
    snippetAnswer: `H\u00f8jtids-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling, m\u00f8nstre, addition inden for 10 og begyndende l\u00e6sning med jul, p\u00e5ske, fastelavn og andre danske h\u00f8jtider. Traditioner driver l\u00e6ring. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `H\u00f8jtidstemaet er s\u00e6rligt kraftfuldt i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige for f\u00f8rste gang forst\u00e5r kalenderstrukturen \u2014 de ved, at julen kommer i december, p\u00e5sken om for\u00e5ret og fastelavn efter vinter. Denne tidsforst\u00e5else g\u00f8r h\u00f8jtiderne til meningsfulde l\u00e6ringsanledninger. Hvor f\u00f8rskoleb\u00f8rn nod dekorationerne, t\u00e6ller b\u00f8rnehaveklasseb\u00f8rn adventslys, l\u00f8ser p\u00e5ske\u00e6g-addition (6+4), genkender m\u00f8nstre i julepynt og l\u00e6ser h\u00f8jtidsord. Kalendermatematik (dage til jul, uger til p\u00e5ske) introducerer tidsbegreber. F\u00e6lles M\u00e5ls m\u00e5l for kultur, tal og kommunikation m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Tidsforst\u00e5else og kalenderstruktur (5\u20136-\u00e5rige forst\u00e5r \u00e5rets cyklus)`, howWeAddress: `H\u00f8jtidskalender-ark der placerer fester p\u00e5 \u00e5rets tidslinje opbygger kronologisk forst\u00e5else` },
      { milestone: `Addition og subtraktion inden for 10 med h\u00f8jtidsmotiver`, howWeAddress: `Jule- og p\u00e5skescener med addition (5 gaver plus 3 gaver) og subtraktion giver festlig matematik` },
      { milestone: `Kulturel bevidsthed (danske traditioner og deres betydning)`, howWeAddress: `H\u00f8jtidstraditions-arbejdsark introducerer fastelavn, sankthans og andre danske traditioner med ord og billeder` },
      { milestone: `M\u00f8nstergenkendelse i dekorationer (gentagne m\u00f8nstre)`, howWeAddress: `Julepynt-m\u00f8nsterark med kugle-stjerne-kugle-sekvenser tr\u00e6ner m\u00f8nstert\u00e6nkning festligt` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokus\u00e9r p\u00e5 \u00e9n h\u00f8jtid ad gangen med velkendte symboler (juletrae, p\u00e5ske\u00e6g), hold t\u00e6llingen inden for 10, og brug billedst\u00f8tte til ordl\u00e6sning. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes kalenderregning (dage til n\u00e6ste h\u00f8jtid), flertrins-addition og selvst\u00e6ndig skrivning af h\u00f8jtidsbeskrivelser.`,
    parentTakeaway: `Hver h\u00f8jtid er en l\u00e6ringsanledning. T\u00e6l adventslys, regn dage til jul, sorter p\u00e5ske\u00e6g efter farve og st\u00f8rrelse. Lad barnet skrive julekort og p\u00e5skehilsner. Tal om traditioner: \u201dhvorfor fejrer vi fastelavn?\u201d Disse samtaler opbygger kulturel forst\u00e5else og g\u00f8r l\u00e6ring personlig.`,
    classroomIntegration: `H\u00f8jtidstemaet f\u00f8lger skole\u00e5ret naturligt: adventskalender med daglig matematik i december, p\u00e5ske\u00e6gsjagt med t\u00e6lle\u00f8velser om for\u00e5ret, og fastelavnsforberedelse med m\u00f8nster- og skriveark. Temaet binder hele \u00e5ret sammen og giver b\u00f8rnene kulturelle fikspunkter. F\u00e6lles M\u00e5ls m\u00e5l for kultur, matematik og kommunikation integreres.`,
    assessmentRubric: [
      { skill: `Kalender- og tidsforst\u00e5else`, emerging: `navngiver 2\u20133 h\u00f8jtider og placerer dem i den rigtige \u00e5rstid med st\u00f8tte`, proficient: `placerer selvst\u00e6ndigt 5\u20136 h\u00f8jtider p\u00e5 en tidslinje i korrekt r\u00e6kkef\u00f8lge`, advanced: `regner dage/uger til n\u00e6ste h\u00f8jtid og forklarer \u00e5rets cykliske struktur` },
      { skill: `Addition med h\u00f8jtidsmotiver`, emerging: `l\u00f8ser additionsopgaver inden for 5 med konkrete h\u00f8jtidsgenstande`, proficient: `l\u00f8ser selvst\u00e6ndigt additions- og subtraktionsopgaver inden for 10 med h\u00f8jtidsbilleder`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne regnestykker om h\u00f8jtider` },
      { skill: `Dansk h\u00f8jtidskultur`, emerging: `genkender symboler for jul og p\u00e5ske med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 4\u20135 danske h\u00f8jtider og deres vigtigste traditioner`, advanced: `sammenligner h\u00f8jtider og forklarer traditioner med egne ord og kulturel forst\u00e5else` },
    ],
  },

  household: {
    snippetAnswer: `Husholdnings-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner sortering, t\u00e6lling, sikkerhedsbevidsthed og begyndende l\u00e6sning med k\u00f8kkenredskaber, rengoring og dagligvarer. Praktisk hverdagsl\u00e6ring. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Husholdningstemaet er s\u00e6rligt relevant for b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige begynder at udf\u00f8re sm\u00e5 husholdningsopgaver selvst\u00e6ndigt \u2014 d\u00e6kke bord, sortere bestik, l\u00e6gge t\u00f8j sammen. Denne nye selvst\u00e6ndighed g\u00f8r husholdningsarbejdsark meningsfulde. Hvor f\u00f8rskoleb\u00f8rn legede k\u00f8kken, udf\u00f8rer b\u00f8rnehaveklasseb\u00f8rn rigtige opgaver der kr\u00e6ver t\u00e6lling (d\u00e6k til fire personer \u2014 hvor mange gafler?), sortering (bestik i skuffen) og sikkerhedsforst\u00e5else (skarpe vs. sikre genstande). Husholdningsord er praktiske l\u00e6seord. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling og matematik m\u00f8des i hverdagens rammer.`,
    developmentalMilestones: [
      { milestone: `Selvst\u00e6ndighed i daglige rutiner (5\u20136-\u00e5rige mestrer enkle husholdningsopgaver)`, howWeAddress: `Bordd\u00e6knings- og sorteringsark tr\u00e6ner sekventering og t\u00e6lling i en autentisk hverdagskontekst` },
      { milestone: `Klassifikation af hverdagsgenstande (k\u00f8kken, badevarelse, sovevarelse)`, howWeAddress: `Sorteringsark der grupperer genstande efter rum i huset opbygger kategoriseringsevne med velkendte ting` },
      { milestone: `Sikkerhedsbevidsthed (farlige vs. sikre genstande i hjemmet)`, howWeAddress: `Sorterings\u00f8velser med sikre og farlige genstande opbygger kritisk t\u00e6nkning og sikkerhedsforst\u00e5else` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokus\u00e9r p\u00e5 k\u00f8kkenredskaber alene (ske, gaffel, tallerken), brug \u00e9n-til-\u00e9n t\u00e6lling med bordd\u00e6kning, og supplement\u00e9r med legek\u00f8kken. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes indk\u00f8bsliste-matematik, rengoring-sekvenseringsark og selvst\u00e6ndig skrivning af husregler.`,
    parentTakeaway: `Inddrag barnet i huslige opgaver og tal om l\u00e6ringen: \u201dvi er fire \u2014 hvor mange gafler skal du l\u00e6gge frem?\u201d Sorter bestik i skuffen, t\u00e6l tallerkener i opvaskemaskinen, og skriv en indk\u00f8bsliste sammen. Hverdagsopgaver er matematik og l\u00e6sning i naturlig kontekst.`,
    classroomIntegration: `Husholdningstemaet integreres i b\u00f8rnehaveklassens hverdagsrutiner: frokostsituationen bruges til t\u00e6lling og bordd\u00e6kning, temaugen om hjem og familie inkluderer sorteringsark, og legek\u00f8kkenet udstyres med t\u00e6lleopgaver. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling, matematik og sundhed underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Husholdningssortering`, emerging: `sorterer genstande i to rum (k\u00f8kken, badevarelse) med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt genstande i 4\u20135 rumkategorier og forklarer valget`, advanced: `opretter egne sorteringskriterier og finder genstande der h\u00f8rer til flere rum` },
      { skill: `T\u00e6lling i hverdagskontekst (bordd\u00e6kning)`, emerging: `t\u00e6ller bestik/tallerkener til 2\u20133 personer med st\u00f8tte`, proficient: `d\u00e6kker selvst\u00e6ndigt bord til 4\u20136 personer med korrekt antal af hvert emne`, advanced: `l\u00f8ser udvidede problemer (6 g\u00e6ster med 2 gafler hver \u2014 hvor mange gafler i alt?)` },
      { skill: `Sikkerhedsbevidsthed i hjemmet`, emerging: `identificerer 2\u20133 farlige genstande med st\u00f8tte (kniv, komfur)`, proficient: `sorterer selvst\u00e6ndigt 8\u201310 genstande i sikre og farlige kategorier`, advanced: `forklarer hvorfor genstande er farlige og formulerer sikkerhedsregler mundtligt` },
    ],
  },

  insects: {
    snippetAnswer: `Insekt-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling af ben og vinger, klassifikation, livscyklus-sekvensering og begyndende l\u00e6sning med sommerfugle, bier og marieh\u00f8ns. Naturfag og matematik m\u00f8des. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Insekttemaet er ideelt for b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan klassificere systematisk \u2014 de forst\u00e5r, at insekter har seks ben (ikke fire eller otte), og kan skelne insekter fra edderkopper og andre sm\u00e5dyr. Denne klassifikationsevne er ny sammenlignet med f\u00f8rskolens brede \u201dkryb og kravl\u201d-kategori. T\u00e6lling af insektben i grupper af seks introducerer skip-t\u00e6lling. Sommerfuglens livscyklus (\u00e6g \u2192 larve \u2192 puppe \u2192 sommerfugl) giver perfekt fire-trins sekvensering. Addition af insekter (5 bier plus 3 marieh\u00f8ns) og m\u00f8nstre i vingetegninger er naturligt indlejret. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Klassifikation med definerede kriterier (insekt = 6 ben, 3 kropsdele)`, howWeAddress: `Sorterings\u00f8velser der adskiller insekter fra edderkopper/snegle baseret p\u00e5 anatomiske tr\u00e6k opbygger videnskabelig t\u00e6nkning` },
      { milestone: `Livscyklusforst\u00e5else (sommerfuglens metamorfose i fire trin)`, howWeAddress: `Sekvenserings\u00f8velser med sommerfuglens livscyklus opbygger kronologisk forst\u00e5else og biologisk viden` },
      { milestone: `T\u00e6lling i grupper (skip-t\u00e6lling med insektben: 6, 12, 18)`, howWeAddress: `T\u00e6lleark der bruger insektben som springbr\u00e6t for skip-t\u00e6lling i grupper af 2 og 6 introducerer multiplikativ t\u00e6nkning` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokus\u00e9r p\u00e5 tre velkendte insekter (marieh\u00f8ne, sommerfugl, bi), brug konkrete insektfigurer, og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn introduceres insektanatomi (hoved, bryst, bagkrop), skip-t\u00e6lling i grupper af 6 og selvst\u00e6ndig skrivning af insektfakta.`,
    parentTakeaway: `G\u00e5 p\u00e5 insektjagt i haven eller parken. T\u00e6l ben (\u201dhar den seks ben? S\u00e5 er det et insekt!\u201d). Observer en sommerfugl og tal om dens livscyklus. Tegn insekter og skriv navne. K\u00f8b en sommerfugle-opdr\u00e6tskasse og folg forvandlingen \u2014 det er uforglemmelig naturfag.`,
    classroomIntegration: `Insekttemaet bruges om for\u00e5ret, n\u00e5r sm\u00e5dyr er aktive: naturfagstimen observerer insekter udend\u00f8rs, matematiktimen bruger t\u00e6lle- og sorteringsark, dansktimen l\u00e6ser insektfakta og skriver insektord. Et sommerfugleopdr\u00e6t i klassen giver autentisk livscyklusl\u00e6ring. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik integreres.`,
    assessmentRubric: [
      { skill: `Insektklassifikation`, emerging: `genkender 2\u20133 insekter med billedst\u00f8tte (sommerfugl, bi)`, proficient: `adskiller selvst\u00e6ndigt insekter fra ikke-insekter baseret p\u00e5 antal ben`, advanced: `forklarer insektklassifikation (6 ben, 3 kropsdele) og navngiver 8+ insektarter` },
      { skill: `Sommerfuglens livscyklus`, emerging: `ordner 2 trin (\u00e6g, sommerfugl) med billedst\u00f8tte`, proficient: `ordner selvst\u00e6ndigt alle 4 livscyklusfaser korrekt og navngiver dem`, advanced: `forklarer hvert trin med egne ord og sammenligner med andre insekters livscyklus` },
      { skill: `T\u00e6lling med insekter`, emerging: `t\u00e6ller insektben p\u00e5 \u00e9t insekt (6) med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt ben p\u00e5 3\u20134 insekter og l\u00f8ser additionsopgaver inden for 10`, advanced: `bruger skip-t\u00e6lling (6, 12, 18) og l\u00f8ser flertrinsproblemer med insektgrupper` },
    ],
  },

  jobs: {
    snippetAnswer: `Erhvervs-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner klassifikation, t\u00e6lling, ordforr\u00e5d og begyndende l\u00e6sning med brandmand, l\u00e6ge, bager og andre erhverv. B\u00f8rn l\u00e6rer at forbinde redskaber med jobs. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Erhvervstemaet f\u00e5r ny dybde i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige forst\u00e5r, at jobs kr\u00e6ver specifikke f\u00e6rdigheder og redskaber \u2014 brandmanden bruger slange og hjelm, l\u00e6gen bruger stetoskop og plaster. Denne forst\u00e5else af funktion-redskab-forbindelsen er en kognitiv milepael. Hvor f\u00f8rskoleb\u00f8rn legede l\u00e6ge og brandmand, klassificerer b\u00f8rnehaveklasseb\u00f8rn erhverv efter type (hj\u00e6lper-erhverv, h\u00e5ndvaerker-erhverv), matcher redskaber med jobs og l\u00f8ser t\u00e6lleopgaver i erhvervskontekst (bageren bager 8 br\u00f8d, s\u00e6lger 3 \u2014 hvor mange er tilbage?). Erhvervsord er ideelle l\u00e6seord. F\u00e6lles M\u00e5ls m\u00e5l for samfundsforst\u00e5else og kommunikation m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Klassifikation af erhverv efter funktion (hj\u00e6lpere, bygere, undervisere)`, howWeAddress: `Sorterings\u00f8velser der grupperer erhverv efter type opbygger kategoriseringsevne med samfundsrelevant indhold` },
      { milestone: `Funktion-redskab-forbindelse (hvert erhverv har specifikke v\u00e6rkt\u00f8jer)`, howWeAddress: `Matchningsark der parrer erhverv med redskaber tr\u00e6ner logisk t\u00e6nkning med konkrete forbindelser` },
      { milestone: `Begyndende regning i erhvervskontekst (bager, handler, landmand)`, howWeAddress: `Regnehistorier med erhvervsscenarier giver matematik et autentisk form\u00e5l og social kontekst` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til fire velkendte erhverv (brandmand, l\u00e6ge, l\u00e6rer, politibetjent), brug rollespil som supplement, og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes ukendte erhverv (arkitekt, biolog), flertrinsproblemer og selvst\u00e6ndig skrivning af \u201dhvad vil jeg vaere\u201d-tekster.`,
    parentTakeaway: `Tal om de erhverv, I m\u00f8der i hverdagen: \u201dhvad g\u00f8r busschauff\u00f8ren? Hvilke redskaber bruger tandl\u00e6gen?\u201d Bes\u00f8g en brandstation, bageri eller g\u00e5rd. Lad barnet tegne sit dr\u00f8mmejob og skrive, hvad man g\u00f8r. Rollespil tr\u00e6ner b\u00e5de ordforr\u00e5d og social forst\u00e5else.`,
    classroomIntegration: `Erhvervstemaet bruges som et samfundsforl\u00f8b: ugens erhverv pr\u00e6senteres med g\u00e6stebes\u00f8g, matematiktimen bruger erhvervsscenarie-ark, dansktimen skriver og l\u00e6ser erhvervsord, og rollespilhj\u00f8rnet indrettes som hospital, brandstation eller bageri. F\u00e6lles M\u00e5ls m\u00e5l for samfund, kommunikation og matematik integreres.`,
    assessmentRubric: [
      { skill: `Erhvervsklassifikation`, emerging: `navngiver 3\u20134 erhverv og matcher dem med \u00e9t redskab med st\u00f8tte`, proficient: `klassificerer selvst\u00e6ndigt 8\u201310 erhverv og matcher dem med redskaber og arbejdspladser`, advanced: `grupperer erhverv i kategorier og forklarer, hvilke f\u00e6rdigheder hvert erhverv kr\u00e6ver` },
      { skill: `Regning i erhvervskontekst`, emerging: `l\u00f8ser simple t\u00e6lleopgaver (bageren har 5 br\u00f8d) med st\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt additions-/subtraktionsopgaver inden for 10 med erhvervsscenarier`, advanced: `formulerer egne regnehistorier om erhverv og l\u00f8ser flertrinsproblemer` },
      { skill: `Erhvervsordforr\u00e5d og l\u00e6sning`, emerging: `genkender 3\u20134 erhvervsord med billedst\u00f8tte`, proficient: `l\u00e6ser selvst\u00e6ndigt 6\u20138 erhvervsord og bruger dem i mundtlige s\u00e6tninger`, advanced: `l\u00e6ser og skriver erhvervsord og formulerer korte tekster om jobs` },
    ],
  },

  music: {
    snippetAnswer: `Musik-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner rytme og m\u00f8nstre, t\u00e6lling af taktslag, instrumentgenkendelse og begyndende nodelasning med trommer, guitarer og fl\u00f8jter. Musik og matematik er t\u00e6t forbundne. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Musiktemaet f\u00e5r en ny dimension i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan holde en stabil puls, klappe rytmem\u00f8nstre og skelne mellem instrumentgrupper \u2014 f\u00e6rdigheder der kreaever den motoriske kontrol og auditive skelneevne, som netop modnes i denne alder. Hvor f\u00f8rskoleb\u00f8rn klappede frit, f\u00f8lger b\u00f8rnehaveklasseb\u00f8rn specifikke rytmem\u00f8nstre (lang-kort-kort = AB-m\u00f8nster), t\u00e6ller taktslag (1-2-3-4) og sorterer instrumenter efter type (strenge, bl\u00e6s, slag). Enkel nodenotation introducerer symbolsk repr\u00e6sentation. F\u00e6lles M\u00e5ls m\u00e5l for musik, m\u00f8nstre og motorik m\u00f8des harmonisk.`,
    developmentalMilestones: [
      { milestone: `Rytmem\u00f8nstre og stabil puls (5\u20136-\u00e5rige kan holde en j\u00e6vn puls og klappe m\u00f8nstre)`, howWeAddress: `Rytmeark med visuelle m\u00f8nstre (lang/kort noter) tr\u00e6ner b\u00e5de m\u00f8nstergenkendelse og motorisk kontrol` },
      { milestone: `Instrumentklassifikation (sortere efter type: strenge, bl\u00e6s, slag)`, howWeAddress: `Sorterings\u00f8velser der grupperer instrumenter efter lydproduktion opbygger auditiv og logisk t\u00e6nkning` },
      { milestone: `Symbolsk repr\u00e6sentation (enkle noder som symboler for lyde)`, howWeAddress: `Enkel nodenotation med hele og halve noder introducerer abstrakt symbol-lyd-forbindelse` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, brug kropslige rytmer (klap, stamp) f\u00f8r papirark, fokus\u00e9r p\u00e5 fire velkendte instrumenter (tromme, guitar, flejte, klaver), og hold m\u00f8nstre enkle (AB). For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes flerlagsrytmer, instrumentfamilier og komposition af egne rytmesekvenser.`,
    parentTakeaway: `Musik er matematik, man kan h\u00f8re. Klap rytmer sammen, t\u00e6l taktslag i en sang, og leg \u201dhvilket instrument h\u00f8rer du?\u201d Lav instrumenter af genbrugsmaterialer (ristromme, gummib\u00e5ndsguitar). Syng sange med t\u00e6lling: \u201dTi sm\u00e5 indianere\u201d er matematik og musik i \u00e9n sang.`,
    classroomIntegration: `Musiktemaet integreres i b\u00f8rnehaveklassens daglige rutiner: morgensangen bruges til rytme\u00f8velser, matematiktimen arbejder med m\u00f8nsterark med musikmotiver, musiktimen kobler teori og praksis, og dansktimen l\u00e6ser instrumentord. F\u00e6lles M\u00e5ls m\u00e5l for musik, m\u00f8nstre og motorik integreres.`,
    assessmentRubric: [
      { skill: `Rytme og m\u00f8nstre`, emerging: `klapper en simpel stabil puls med st\u00f8tte`, proficient: `klapper selvst\u00e6ndigt AB- og ABB-rytmem\u00f8nstre korrekt`, advanced: `opretter egne rytmesekvenser og forklarer m\u00f8nsterstrukturen` },
      { skill: `Instrumentgenkendelse`, emerging: `genkender 2\u20133 instrumenter visuelt (tromme, guitar)`, proficient: `navngiver selvst\u00e6ndigt 6\u20138 instrumenter og sorterer dem i typer`, advanced: `genkender instrumenter p\u00e5 lyd, klassificerer i familier og forklarer lydproduktion` },
      { skill: `Nodelasning (begyndende)`, emerging: `forst\u00e5r at noder repr\u00e6senterer lyde med forklaring`, proficient: `l\u00e6ser selvst\u00e6ndigt hele og halve noder og klapper den tilsvarende rytme`, advanced: `l\u00e6ser enkle rytmelinjer og skriver egne rytmem\u00f8nstre med nodenotation` },
    ],
  },

  nature: {
    snippetAnswer: `Natur-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner observation, klassifikation, t\u00e6lling og begyndende l\u00e6sning med tr\u00e6er, dyr, \u00e5rstider og vejrfanomener. Udend\u00f8rsl\u00e6ring og naturfag integreres. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Naturtemaet blomstrer i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan observere systematisk og registrere fund \u2014 de g\u00e5r fra at lege i naturen til at l\u00e6re af den. Hvor f\u00f8rskoleb\u00f8rn samlede blade og sten, klassificerer b\u00f8rnehaveklasseb\u00f8rn dem efter form, st\u00f8rrelse og farve, registrerer vejrobservationer i tabeller og forst\u00e5r \u00e5rstidernes cyklus. T\u00e6lling af naturf\u00e6nomener (fugle ved foderbr\u00e6ttet, blade p\u00e5 en gren) giver konkret matematik. Naturord som skov, s\u00f8, mark og sky er vigtige l\u00e6seord. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og udend\u00f8rspaedagogik m\u00f8des direkte.`,
    developmentalMilestones: [
      { milestone: `Systematisk observation og registrering (5\u20136-\u00e5rige kan f\u00f8re enkle logbager)`, howWeAddress: `Vejr- og naturdagbogs-ark der kombinerer tegning, t\u00e6lling og simple noteringer tr\u00e6ner videnskabelig metode` },
      { milestone: `\u00c5rstidsforst\u00e5else (fire \u00e5rstider med karakteristiske tr\u00e6k)`, howWeAddress: `\u00c5rstids-sorterings\u00f8velser og tidslinje-ark opbygger cyklisk tidsforst\u00e5else med naturlige observationer` },
      { milestone: `Klassifikation af naturlige materialer (blade, sten, frugter efter egenskaber)`, howWeAddress: `Sorterings- og sammenligningsark med naturmaterialer opbygger videnskabelig klassifikation` },
      { milestone: `T\u00e6lling og dataopsamling i naturen`, howWeAddress: `T\u00e6llelister for fugle, blomster og tr\u00e6er giver funktionel matematik i udend\u00f8rskontekst` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokus\u00e9r p\u00e5 \u00e9n \u00e5rstid ad gangen med f\u00e5 velkendte naturgenstande, brug sanseoplevelser (f\u00f8l, lugt) som supplement, og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes vejrdata-tabeller, naturteknisk ordforr\u00e5d og selvst\u00e6ndig skrivning af naturobservationer.`,
    parentTakeaway: `Tag naturen med ind i l\u00e6ringen. G\u00e5 ture og t\u00e6l fugle, saml blade og sorter efter form, f\u00f8r en vejrdagbog p\u00e5 k\u00f8leskabet. Stil sp\u00f8rgsm\u00e5l: \u201dhvorfor falder bladene om efter\u00e5ret?\u201d og \u201dhvor mange sten kan du finde med striber?\u201d Naturen er gratis og uudt\u00f8mmelig som l\u00e6ringsrum.`,
    classroomIntegration: `Naturtemaet er b\u00f8rnehaveklassens kernetema i udend\u00f8rspaedagogik: ugentlige naturture med t\u00e6lle- og observationsark, indendomrs-stationer med sortering af naturmaterialer, og klassens vejrstation med daglig registrering. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik, matematik og kommunikation integreres hele \u00e5ret.`,
    assessmentRubric: [
      { skill: `Naturobservation og registrering`, emerging: `tegner en naturgenstand med st\u00f8tte og navngiver den`, proficient: `registrerer selvst\u00e6ndigt 3\u20134 observationer med tegning og enkle ord`, advanced: `f\u00f8rer en struktureret naturlogbog med dato, tegning, t\u00e6lling og beskrivelse` },
      { skill: `\u00c5rstidsforst\u00e5else`, emerging: `navngiver 2\u20133 \u00e5rstider og et kendetegn for hver med st\u00f8tte`, proficient: `navngiver alle fire \u00e5rstider i r\u00e6kkef\u00f8lge og beskriver hvert \u00e5rstids kendetegn`, advanced: `forklarer \u00e5rstidernes cyklus og sammenligner, hvad der sker med tr\u00e6er, dyr og vejr` },
      { skill: `Klassifikation af naturmaterialer`, emerging: `sorterer naturmaterialer i to grupper efter \u00e9n egenskab med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter to egenskaber (form og st\u00f8rrelse) og forklarer valget`, advanced: `opretter egne klassifikationskriterier og bruger faglige begreber (blad, bark, mos)` },
    ],
  },

  numbers: {
    snippetAnswer: `Tal-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner talskrivning 0\u201320, addition og subtraktion inden for 10, talr\u00e6kkef\u00f8lge og begyndende talforst\u00e5else. Tal-fundamentet l\u00e6gges her. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Taltemaet er selve kernen i b\u00f8rnehaveklassens matematik \u2014 fem- og seks\u00e5rige g\u00e5r fra at t\u00e6lle mundtligt til at forst\u00e5 tal som maengder, skrive talsymboler korrekt og udf\u00f8re grundregning. Hvor f\u00f8rskoleb\u00f8rn t\u00e6llte til 10 med \u00e9n-til-\u00e9n, mestrer b\u00f8rnehaveklasseb\u00f8rn talskrivning, r\u00e6kkef\u00f8lge op til 20, addition og subtraktion inden for 10, og begyndende forst\u00e5else af titalssystemet (10 er \u00e9n tier og nul enere). Tallinjens brug som strategiv\u00e6rktoj introduceres. F\u00e6lles M\u00e5ls matematiksm\u00e5l for b\u00f8rnehaveklassen drejer sig direkte om tallenes verden.`,
    developmentalMilestones: [
      { milestone: `Talskrivning 0\u201320 (korrekt ciferform og r\u00e6kkef\u00f8lge)`, howWeAddress: `Sporings- og skriveark for hvert ciffer med linjerede felter opbygger motorisk pr\u00e6cision og talgenkendelse` },
      { milestone: `Addition og subtraktion inden for 10 (b\u00f8rnehaveklassens regnemilep\u00e6l)`, howWeAddress: `Visuelle additionsark med talt\u00e6llere og tallinjer g\u00f8r regneopgaver konkrete og overskuelige` },
      { milestone: `Talr\u00e6kkef\u00f8lge og m\u00f8nstre (t\u00e6l frem, t\u00e6l tilbage, spring et tal over)`, howWeAddress: `Udfyld-r\u00e6kken-ark og m\u00f8nsteropgaver med talsekvenser tr\u00e6ner algebraisk t\u00e6nkning tidligt` },
      { milestone: `Begyndende titalssystem (ti enere = \u00e9n tier)`, howWeAddress: `Tiergruppe-ark med bundter af ti genstande introducerer positionssystemet visuelt` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til tallene 0\u201310, brug konkrete t\u00e6llere (fingre, klodser) ved hvert ark, og fokus\u00e9r p\u00e5 addition alene for at bygge selvtillid. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes tal op til 50, tierovergange (8+5), og talg\u00e5der der kr\u00e6ver bagl\u00e6ns t\u00e6nkning.`,
    parentTakeaway: `Tal er overalt \u2014 brug hverdagen. T\u00e6l trapper, frugt og leget\u00f8j. \u00d8v addition ved bordet: \u201ddu har 3 kartofler, jeg giver dig 2 mere.\u201d Skriv tal med kridt p\u00e5 fortovet. Spil terningespil, der kr\u00e6ver t\u00e6lling og addition. Hvert dagligt ojeblik er en taltr\u00e6ningsmulighed.`,
    classroomIntegration: `Taltemaet er b\u00f8rnehaveklassens matematiske rygrad: daglig talt\u00f8velse med skriveark, morgensamlingen t\u00e6ller elever og dage, matematiktimen arbejder med additions- og subtraktionsark, og lege med tal bruges i frikvarteret (hinkeruder med tal). F\u00e6lles M\u00e5ls m\u00e5l for tal og algebra underst\u00f8ttes systematisk.`,
    assessmentRubric: [
      { skill: `Talskrivning 0\u201320`, emerging: `skriver tallene 0\u201310 l\u00e6seligt med model`, proficient: `skriver selvst\u00e6ndigt alle tal 0\u201320 korrekt og i r\u00e6kkef\u00f8lge`, advanced: `skriver tal op til 50 hurtigt og korrekt og skriver dem i bagl\u00e6ns r\u00e6kkef\u00f8lge` },
      { skill: `Addition/subtraktion inden for 10`, emerging: `l\u00f8ser additionsopgaver inden for 5 med konkrete t\u00e6llere`, proficient: `l\u00f8ser selvst\u00e6ndigt additions- og subtraktionsopgaver inden for 10 med visuel st\u00f8tte`, advanced: `regner inden for 10 mentalt og forklarer strategier mundtligt` },
      { skill: `Talr\u00e6kkef\u00f8lge og m\u00f8nstre`, emerging: `t\u00e6ller frem til 10 og udfylder manglende tal med st\u00f8tte`, proficient: `udfylder selvst\u00e6ndigt talr\u00e6kker til 20 og genkender skip-t\u00e6llingsm\u00f8nstre`, advanced: `t\u00e6ller bagl\u00e6ns fra 20, springer over (2, 4, 6...) og forklarer m\u00f8nstret` },
    ],
  },

  ocean: {
    snippetAnswer: `Hav-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling, st\u00f8rrelsessammenligning, klassifikation af havdyr og begyndende l\u00e6sning med fisk, hvaler, s\u00e6lhunde og krabber. Havet er et fascinerende l\u00e6ringsunivers. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Havtemaet f\u00e5r en ny faglig dimension i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan klassificere havdyr efter reelle biologiske tr\u00e6k \u2014 fisk vs. pattedyr, skal vs. bl\u00f8ddyr \u2014 i stedet for blot at sige \u201ddyr i vandet\u201d. Denne klassifikationsevne g\u00f8r havbiologi tilg\u00e6ngelig p\u00e5 et nyt niveau. T\u00e6lling af fisk i stimer giver t\u00e6lle\u00f8velser op til 20, st\u00f8rrelsessammenligning (hval vs. krabbe) introducerer m\u00e5lebegreber, og addition med havdyr (5 fisk plus 4 s\u00e6lhunde) er naturligt indlejret. Havord som hval, krabbe, tang og koral er sp\u00e6ndende l\u00e6seord. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik m\u00f8des under havoverfladen.`,
    developmentalMilestones: [
      { milestone: `Klassifikation af havdyr efter biologiske tr\u00e6k (5\u20136-\u00e5rige skelner fisk fra pattedyr)`, howWeAddress: `Sorterings\u00f8velser der adskiller fisk, pattedyr og bl\u00f8ddyr opbygger naturfaglig t\u00e6nkning med havmotiver` },
      { milestone: `St\u00f8rrelsessammenligning og ordning (sm\u00e5 til store havdyr)`, howWeAddress: `St\u00f8rrelses-sorteringsark der ordner havdyr fra krabbe til hval introducerer m\u00e5le- og sammenligningsbegreber` },
      { milestone: `T\u00e6lling i grupper og addition med havmotiver`, howWeAddress: `Fiskestim-t\u00e6lleark og additions\u00f8velser med havdyr giver konkret matematik i et sp\u00e6ndende milj\u00f8` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til fire velkendte havdyr (fisk, hval, krabbe, sael), brug store klare billeder, og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes havdyrs-klassifikation med fagbegreber, st\u00f8rrelsesordning med m\u00e5l og selvst\u00e6ndig skrivning af havfakta.`,
    parentTakeaway: `Havet fascinerer alle b\u00f8rn. Bes\u00f8g et akvarium og t\u00e6l fisk, sammenlign st\u00f8rrelser, og navngiv arter. Se naturdokumentarer om havet og stil sp\u00f8rgsm\u00e5l: \u201der hvalen en fisk?\u201d Tegn havdyr og skriv deres navne. Havet er et uudt\u00f8mmeligt l\u00e6ringsunivers.`,
    classroomIntegration: `Havtemaet bruges som et naturfagsforl\u00f8b: matematiktimen t\u00e6ller og sorterer havdyr, naturfagstimen l\u00e6rer om livet under vandet, dansktimen l\u00e6ser og skriver havord, og kunsttimen skaber havpanoramer. Et klasseakvarium giver autentisk observation. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik integreres.`,
    assessmentRubric: [
      { skill: `Havdyrklassifikation`, emerging: `genkender 3\u20134 havdyr med billedst\u00f8tte (fisk, hval)`, proficient: `sorterer selvst\u00e6ndigt havdyr i grupper (fisk, pattedyr, krebsdyr) og forklarer forskelle`, advanced: `bruger biologiske tr\u00e6k til klassifikation og navngiver 10+ havdyrarter` },
      { skill: `St\u00f8rrelsessammenligning og ordning`, emerging: `ordner 2\u20133 havdyr efter st\u00f8rrelse med st\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 5\u20136 havdyr fra mindst til st\u00f8rst korrekt`, advanced: `sammenligner med m\u00e5lebegreber (dobbelt, halvt) og ordner 8+ dyr` },
      { skill: `T\u00e6lling og addition med havmotiver`, emerging: `t\u00e6ller 5\u20138 fisk i en stim med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 20 og l\u00f8ser additionsopgaver inden for 10 med havdyr`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne havmatematikopgaver` },
    ],
  },

  pets: {
    snippetAnswer: `K\u00e6ledyr-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling, ansvarforst\u00e5else, klassifikation og begyndende l\u00e6sning med hunde, katte, kaniner og fisk. K\u00e6ledyr g\u00f8r l\u00e6ring personlig. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `K\u00e6ledyrstemaet er s\u00e6rligt effektivt i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige begynder at forst\u00e5 ansvar \u2014 de kan fodre et k\u00e6ledyr, fylde vandsk\u00e5len og hjaelpe med at borste pelsen. Denne ansvarsberedskab g\u00f8r k\u00e6ledyrsarbejdsark personligt meningsfulde. Hvor f\u00f8rskoleb\u00f8rn klappede og legede med dyr, l\u00e6rer b\u00f8rnehaveklasseb\u00f8rn at kategorisere k\u00e6ledyrs behov (mad, vand, motion, k\u00e6rlighed), t\u00e6lle fodringsmangder (3 ske hundemad morgen + 3 ske aften) og l\u00e6se k\u00e6ledyrsnavne og plejeinstruktioner. Regnehistorier med k\u00e6ledyr (kaninen spiste 4 guler\u00f8dder om mandagen og 3 om tirsdagen) g\u00f8r matematik personlig. F\u00e6lles M\u00e5ls m\u00e5l for ansvar og samv\u00e6r m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Ansvarforst\u00e5else og plejeopgaver (5\u20136-\u00e5rige kan udf\u00f8re daglige plejerutiner)`, howWeAddress: `K\u00e6ledyrs-plejeplan-ark der kr\u00e6ver sekvensering af daglige opgaver opbygger ansvarsbevidsthed struktureret` },
      { milestone: `Klassifikation af k\u00e6ledyr efter behov og egenskaber`, howWeAddress: `Sorterings\u00f8velser der grupperer k\u00e6ledyr efter st\u00f8rrelse, pelstype og behov tr\u00e6ner flerdimensionel t\u00e6nkning` },
      { milestone: `Regnehistorier med personlig forbindelse (k\u00e6ledyrskontekst)`, howWeAddress: `Additions- og subtraktionshistorier om k\u00e6ledyrspleje g\u00f8r matematik til en omsorgshandling` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til tre velkendte k\u00e6ledyr (hund, kat, fisk), brug barnets eget k\u00e6ledyr som udgangspunkt, og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes ugens plejeskema med t\u00e6llingsdata, sammenligning af k\u00e6ledyrsbehov og selvst\u00e6ndig skrivning af k\u00e6ledyrdagbog.`,
    parentTakeaway: `Hvis I har et k\u00e6ledyr, er det et dagligt l\u00e6ringsredskab. Lad barnet m\u00e5le foder, t\u00e6lle fodringstider og foere en plejeb\u00f8g. Hvis I ikke har k\u00e6ledyr, bes\u00f8g en dyrehandel eller g\u00e5rd. T\u00e6l og navngiv dyrene. Diskut\u00e9r ansvar: \u201dhvad har en hund brug for hver dag?\u201d`,
    classroomIntegration: `K\u00e6ledyrstemaet bruges som et ansvars- og samv\u00e6rsforl\u00f8b: klassens k\u00e6ledyr (fisk, snegle) passes af turhold, matematiktimen bruger k\u00e6ledyrs-regneark, dansktimen l\u00e6ser og skriver k\u00e6ledyrsord, og samlingen diskuterer k\u00e6ledyrsansvar. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling, matematik og natur integreres.`,
    assessmentRubric: [
      { skill: `K\u00e6ledyrsansvar og plejesekvensering`, emerging: `navngiver 2\u20133 daglige plejeopgaver (fodre, vand) med st\u00f8tte`, proficient: `sekvenserer selvst\u00e6ndigt en daglig plejeplan med 4\u20135 opgaver i korrekt r\u00e6kkef\u00f8lge`, advanced: `opretter en ugentlig plejeplan og forklarer, hvorfor hver opgave er vigtig` },
      { skill: `K\u00e6ledyrsklassifikation`, emerging: `navngiver 3\u20134 k\u00e6ledyr med billedst\u00f8tte`, proficient: `klassificerer selvst\u00e6ndigt k\u00e6ledyr efter egenskaber (pels, fjer, skael) og behov`, advanced: `sammenligner k\u00e6ledyrstyper og argumenterer for, hvilket der passer bedst til en given situation` },
      { skill: `Regning med k\u00e6ledyrskontekst`, emerging: `l\u00f8ser t\u00e6lleopgaver inden for 5 med k\u00e6ledyrsbilleder`, proficient: `l\u00f8ser selvst\u00e6ndigt additions-/subtraktionshistorier inden for 10 om k\u00e6ledyrspleje`, advanced: `formulerer egne regnehistorier og l\u00f8ser flertrinsproblemer om k\u00e6ledyr` },
    ],
  },

  pirates: {
    snippetAnswer: `Pirat-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling af skatte, kortl\u00e6sning, addition inden for 10 og begyndende l\u00e6sning med skattekister, piratskibe og s\u00f8kort. Eventyret driver l\u00e6ring. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Pirattemaet er perfekt for b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan folge korte og skattekort \u2014 en f\u00e6rdighed der kr\u00e6ver rumlig orientering, symbolforst\u00e5else og sekventering, som netop modnes i denne alder. Hvor f\u00f8rskoleb\u00f8rn legede pirat, bruger b\u00f8rnehaveklasseb\u00f8rn kort som v\u00e6rktoj, t\u00e6ller guldmonter i skattekister (op til 20), l\u00f8ser addition med piratbytte (6 guldmonter plus 4 diamanter) og genkender m\u00f8nstre i piratflag. Piratordforr\u00e5d som skattekort, kompas og anker er sp\u00e6ndende l\u00e6seord. F\u00e6lles M\u00e5ls m\u00e5l for rumlig forst\u00e5else, tal og fantasi m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Rumlig orientering og kortl\u00e6sning (5\u20136-\u00e5rige kan folge simple kort med symboler)`, howWeAddress: `Skattekort-ark med retningsangivelser (g\u00e5 3 skridt nord, drej ost) tr\u00e6ner rumlig navigation` },
      { milestone: `T\u00e6lling og addition med skattemotiver (op til 20 genstande)`, howWeAddress: `Skattekiste-t\u00e6lleark og additions\u00f8velser med guldm\u00f8nter g\u00f8r matematik til et eventyr` },
      { milestone: `M\u00f8nstergenkendelse i piratmotiver (flag, knogler, stjerner)`, howWeAddress: `Piratflag-monsterark med gentagende symboler tr\u00e6ner monstert\u00e6nkning i en sp\u00e6ndende ramme` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, brug simple kort med kun 2\u20133 trin, hold t\u00e6llingen inden for 10, og tilbyd billedst\u00f8tte til piratord. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes komplekse skattekort med koordinater, flertrinsproblemer med piratbytte og selvst\u00e6ndig skrivning af piratbreve.`,
    parentTakeaway: `Lav en skattejagt i haven eller lejligheden. Tegn et kort sammen og lad barnet folge det. T\u00e6l skatten n\u00e5r den er fundet. Brug terninger og legemunter til piratmatematik. L\u00e6s pirathistorier og lad barnet tegne sit eget piratskib og skrive dets navn.`,
    classroomIntegration: `Pirattemaet bruges som en eventyrlig temauge: matematiktimen arbejder med skatte-t\u00e6lleark og additionsopgaver, dansktimen l\u00e6ser pirathistorier og skriver piratord, og udend\u00f8rsl\u00e6ring inkluderer skattejagt p\u00e5 legepladsen. Klassen bygger et piratskib af papkasser. F\u00e6lles M\u00e5ls m\u00e5l for matematik, kreativitet og samarbejde integreres.`,
    assessmentRubric: [
      { skill: `Kortl\u00e6sning og rumlig navigation`, emerging: `f\u00f8lger 2 trin p\u00e5 et simpelt kort med st\u00f8tte`, proficient: `f\u00f8lger selvst\u00e6ndigt 4\u20135 trin p\u00e5 et skattekort og finder m\u00e5let`, advanced: `tegner egne skattekort med symboler og retningsangivelser` },
      { skill: `T\u00e6lling og addition med skattemotiver`, emerging: `t\u00e6ller guldmonter op til 10 med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 20 og l\u00f8ser additionsopgaver inden for 10 med skattegenstande`, advanced: `l\u00f8ser flertrinsproblemer og sammenligner skattebelab (hvem har flest guldmonter?)` },
      { skill: `Piratordforr\u00e5d og l\u00e6sning`, emerging: `genkender 2\u20133 piratord med billedst\u00f8tte (skib, skat)`, proficient: `l\u00e6ser selvst\u00e6ndigt 5\u20136 piratord og bruger dem i ordsogning`, advanced: `l\u00e6ser og skriver 8+ piratord og formulerer korte pirats\u00e6tninger` },
    ],
  },

  robots: {
    snippetAnswer: `Robot-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner geometriske former, sekvensering af instruktioner, m\u00f8nstergenkendelse og begyndende logisk t\u00e6nkning med robotter og teknologi. Tidlig kodningst\u00e6nkning. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Robottemaet er s\u00e6rligt relevant for b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan folge og give sekventielle instruktioner \u2014 grundlaget for algoritmisk t\u00e6nkning. Hvor f\u00f8rskoleb\u00f8rn tegnede robotter, programmerer b\u00f8rnehaveklasseb\u00f8rn dem konceptuelt: \u201dg\u00e5 frem, drej hojre, g\u00e5 frem, saml op\u201d. Robotter best\u00e5r af geometriske former (firkantede kroppe, cirkulaere ojne, rektangulaere arme), hvilket gor formgenkendelse funktionel. M\u00f8nstre i robotdesign (symetriske dele, gentagende elementer) tr\u00e6ner m\u00f8nstert\u00e6nkning. F\u00e6lles M\u00e5ls m\u00e5l for teknologiforst\u00e5else og logisk t\u00e6nkning m\u00f8des i et futuristisk tema.`,
    developmentalMilestones: [
      { milestone: `Sekventiel instruktionsgivning (5\u20136-\u00e5rige kan give og folge 3\u20134-trins instruktioner)`, howWeAddress: `Robot-programmeringsark hvor b\u00f8rn skriver trinvise instruktioner (g\u00e5, drej, stop) introducerer algoritmisk t\u00e6nkning` },
      { milestone: `Formgenkendelse i design (robottens kropsdele som geometriske former)`, howWeAddress: `Byg-en-robot-ark med geometriske former g\u00f8r formgenkendelse til en kreativ og funktionel \u00f8velse` },
      { milestone: `Symmetriforst\u00e5else (robotters bilaterale symmetri)`, howWeAddress: `Symmetri-f\u00e6rdigg\u00f8relses-ark med halvrobot-designs tr\u00e6ner rumlig t\u00e6nkning og formpr\u00e6cision` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, brug simple 2-trins instruktioner (g\u00e5 frem, stop), fokuser p\u00e5 tre grundformer i robotdesign, og supplement\u00e9r med fysiske robotfigurer. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes 5-trins programmer, betingede instruktioner (\u201dhvis mur, s\u00e5 drej\u201d) og design af egne robotter med m\u00e5l.`,
    parentTakeaway: `Leg robot-programmering derhjemme: barnet giver instruktioner, du er robotten (g\u00e5 3 skridt, drej venstre, loft armen). Byt roller. Byg robotter af karton og tal om formerne: \u201dhvilken form er hovedet? Kroppen?\u201d Enkle programmeringsapps som ScratchJr g\u00f8r kodningst\u00e6nkning h\u00e5ndgribelig.`,
    classroomIntegration: `Robottemaet bruges i b\u00f8rnehaveklassens teknologiforl\u00f8b: matematiktimen arbejder med form- og sekvenserings-ark, kodningens time (usynlig kodning) bruger robot-instruktionskort, og kunsttimen designer robotter af genbrugsmaterialer. F\u00e6lles M\u00e5ls m\u00e5l for teknologi, geometri og logisk t\u00e6nkning integreres.`,
    assessmentRubric: [
      { skill: `Sekventiel instruktion (robotprogrammering)`, emerging: `giver 2 instruktioner i korrekt r\u00e6kkef\u00f8lge med st\u00f8tte (g\u00e5, stop)`, proficient: `giver selvst\u00e6ndigt 4\u20135 trinvise instruktioner i korrekt r\u00e6kkef\u00f8lge`, advanced: `tilf\u00f8jer betingelser (\u201dhvis mur, drej\u201d) og debugger fejl i instruktionssekvenser` },
      { skill: `Formgenkendelse i robotdesign`, emerging: `identificerer cirkel og firkant i en robot med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 4\u20135 geometriske former i et robotdesign`, advanced: `designer en robot med navngivne former og beskriver den med geometriske begreber` },
      { skill: `Symmetri med robotter`, emerging: `genkender, at robotten har to ens sider med st\u00f8tte`, proficient: `faerdigg\u00f8r selvst\u00e6ndigt en symmetrisk robothalvdel korrekt`, advanced: `forklarer symmetribegrebet og anvender det i eget robotdesign` },
    ],
  },

  school: {
    snippetAnswer: `Skole-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling, sortering af skolematerialer, daglige rutiner og begyndende l\u00e6sning med b\u00f8ger, blyanter og tavler. Skolestarten bliver tryg. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Skoletemaet er unikt relevant for b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige oplever deres forste rigtige skolemilj\u00f8 \u2014 de l\u00e6rer rutiner, omg\u00e5s mange b\u00f8rn og bruger skolematerialer selvst\u00e6ndigt. Hvor f\u00f8rskoleb\u00f8rn legede skole, er b\u00f8rnehaveklasseb\u00f8rn i skole og har brug for f\u00e6rdigheder til at navigere det. T\u00e6lling af skolematerialer (8 farveblyanter, 5 b\u00f8ger) giver funktionel matematik. Sortering af materialer i penalhuse og skuffer tr\u00e6ner klassifikation. Dagsskema-sekvensering opbygger tidsforst\u00e5else. Skoleord som tavle, blyant, bog og penalhus er vigtige l\u00e6seord. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling og selvst\u00e6ndighed m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Daglige rutiner og tidsstruktur (5\u20136-\u00e5rige l\u00e6rer at folge et dagsskema)`, howWeAddress: `Dagsskema-sekvenserings-ark der ordner skoledagens aktiviteter kronologisk opbygger tidsforst\u00e5else` },
      { milestone: `Selvst\u00e6ndig organisering af materialer`, howWeAddress: `Sorteringsark for penalhuse og skoletasker tr\u00e6ner klassifikation med dagligdags relevans` },
      { milestone: `T\u00e6lling og ordning af skolematerialer`, howWeAddress: `T\u00e6llelister og invent\u00e9ringsark med skolematerialer giver funktionel matematik i skolekontekst` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, brug visuelle dagsskemaer med billeder, begr\u00e6ns til fire basismaterialer (blyant, viskelader, saks, lim), og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes skemaplanl\u00e6gning, materialebudget med addition og selvst\u00e6ndig skrivning af skoleregler.`,
    parentTakeaway: `Forbered skolestart derhjemme: pak skoletasken sammen og t\u00e6l materialerne, ov dagsskemaet (\u201dforst morgensamling, s\u00e5 dansk, s\u00e5 frikvarter\u201d), og l\u00e6s skoleord p\u00e5 materialerne. Tal om skoledagen: \u201dhvad lavede du forst? Hvad lavede du sidst?\u201d Disse samtaler bygger tidsforst\u00e5else og tryghed.`,
    classroomIntegration: `Skoletemaet bruges i skolestart-perioden: de forste uger arbejdes med rutine- og sorteringsark, morgensamlingen \u00f8ver dagsskemaet, og materialekendskab tr\u00e6nes med t\u00e6lleark. Et klasseprojekt om \u201dvores skole\u201d integrerer kortl\u00e6gning, t\u00e6lling og skrivning. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling og selvst\u00e6ndighed underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Dagsskema og tidsstruktur`, emerging: `navngiver 2\u20133 daglige aktiviteter med st\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 5\u20136 daglige aktiviteter i korrekt kronologisk raekkefolge`, advanced: `planlagger et dagsskema og forklarer, hvorfor raekkefolgen er vigtig` },
      { skill: `Materialesortering og klassifikation`, emerging: `sorterer materialer i to grupper (skrive/tegne) med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt skolematerialer i 3\u20134 kategorier og forklarer valget`, advanced: `opretter egne kategorier og inventerer klassens materialer med t\u00e6lning` },
      { skill: `T\u00e6lling af skolematerialer`, emerging: `t\u00e6ller 5\u20138 materialer med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 20 materialer og noterer antallet korrekt`, advanced: `l\u00f8ser additionsopgaver med materialer (8 blyanter + 6 farveblyanter)` },
    ],
  },

  seasons: {
    snippetAnswer: `\u00c5rstids-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner cyklisk tidsforst\u00e5else, naturobservation, t\u00e6lling og begyndende l\u00e6sning med for\u00e5r, sommer, efter\u00e5r og vinter. \u00c5rstiderne giver \u00e5ret struktur. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `\u00c5rstidstemaet er s\u00e6rligt meningsfuldt i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige for f\u00f8rste gang forst\u00e5r \u00e5rets cykliske struktur \u2014 de ved, at efter vinter kommer for\u00e5r, og at m\u00f8nstret gentager sig. Denne cykliske t\u00e6nkning er en vigtig kognitiv milepael. Hvor f\u00f8rskoleb\u00f8rn oplevede \u00e5rstiderne, analyserer b\u00f8rnehaveklasseb\u00f8rn dem: t\u00e6ller efteraarsblade, sammenligner dagslangde (vinter vs. sommer), registrerer vejr i tabeller og sorterer t\u00f8j efter \u00e5rstid. \u00c5rstidsord som for\u00e5r, frost, h\u00f8st og blomstring er vigtige l\u00e6seord. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og tid underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Cyklisk tidsforst\u00e5else (4 \u00e5rstider i en gentagende raekkefolge)`, howWeAddress: `\u00c5rstidshjul-ark der viser den cykliske struktur opbygger forst\u00e5elsen af, at \u00e5rstider gentager sig` },
      { milestone: `Sammenligning og kontrast (hvad er forskelligt mellem \u00e5rstiderne)`, howWeAddress: `Sammenlign-\u00e5rstiderne-ark med side-om-side illustrationer tr\u00e6ner analytisk t\u00e6nkning` },
      { milestone: `Naturobservation og vejrregistrering`, howWeAddress: `Vejrdagbogs-ark med daglig registrering af temperatur, sky og nedbor tr\u00e6ner systematisk observation` },
      { milestone: `\u00c5rstidsrelateret t\u00e6lling og sortering`, howWeAddress: `T\u00e6lleark med \u00e5rstidsgenstande (blade om efter\u00e5ret, snebolde om vinteren) giver kontekstrig matematik` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokuser p\u00e5 to \u00e5rstider ad gangen (sommer vs. vinter), brug sansebaserede aktiviteter (fol blade, se sne), og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes vejrdata i tabeller, dagslangde-sammenligning og selvst\u00e6ndig skrivning af \u00e5rstidsbeskrivelser.`,
    parentTakeaway: `\u00c5rstiderne er altid til stede. T\u00e6l efteraarsblade, byg en snemand og t\u00e6l snebolde, plant fr\u00f8 om foraret og mal sommerblomster. For en vejrdagbog p\u00e5 koleskabet: \u201dhvordan var vejret i dag?\u201d Tal om forandringer: \u201dhvad sker der med traerne om efter\u00e5ret?\u201d Naturen underviser gratis.`,
    classroomIntegration: `\u00c5rstidstemaet lober gennem hele skole\u00e5ret: hver \u00e5rstid f\u00e5r et temaforlob med t\u00e6lle-, observations- og skriveark. Vejrstationen opdateres dagligt, \u00e5rstidshjulet justeres m\u00e5nedligt, og naturfagsture dokumenteres med arbejdsark. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik, tid og matematik integreres hele \u00e5ret.`,
    assessmentRubric: [
      { skill: `\u00c5rstidsraekkefolge og cyklisk forst\u00e5else`, emerging: `navngiver 2\u20133 \u00e5rstider med st\u00f8tte og kender den aktuelle`, proficient: `navngiver alle fire \u00e5rstider i korrekt raekkefolge og beskriver hvert aarstids kendetegn`, advanced: `forklarer den cykliske struktur, forudsiger naeste \u00e5rstid og sammenligner med andre landes klima` },
      { skill: `Vejrobservation og registrering`, emerging: `beskriver dagens vejr med 1\u20132 ord (sol, regn) med st\u00f8tte`, proficient: `registrerer selvst\u00e6ndigt dagligt vejr med symboler og ord p\u00e5 et skema`, advanced: `analyserer vejrdata over en uge og finder monstre (det regnede 3 af 5 dage)` },
      { skill: `\u00c5rstidsrelateret t\u00e6lling`, emerging: `t\u00e6ller 5\u20138 \u00e5rstidsgenstande med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 20 og sorterer genstande efter \u00e5rstid`, advanced: `l\u00f8ser additionsopgaver med \u00e5rstidsdata og laver simple sammenligninger` },
    ],
  },

  shapes: {
    snippetAnswer: `Form-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner genkendelse af 2D- og begyndende 3D-former, formegenskaber (sider, hjorner), m\u00f8nstre med former og begyndende rumlig t\u00e6nkning. Geometriens fundament laegges her. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Formtemaet er b\u00f8rnehaveklassens geometriske kernetema \u2014 fem- og seks\u00e5rige g\u00e5r fra at genkende former visuelt til at analysere dem med egenskaber: en firkant har fire sider og fire hjorner, en trekant har tre af hver. Denne overgang fra perception til analyse er en afgorende kognitiv milepael. Hvor f\u00f8rskoleb\u00f8rn navngav cirkel og firkant, l\u00e6rer b\u00f8rnehaveklasseb\u00f8rn at skelne rektangel fra kvadrat, introduceres til 3D-former (kugle, terning, cylinder) og finder former i hverdagen (vinduet er rektangulaert, uret er cirkulaert). Formm\u00f8nstre i sekvenser opbygger algebraisk t\u00e6nkning. F\u00e6lles M\u00e5ls geometrim\u00e5l for b\u00f8rnehaveklassen d\u00e6kkes direkte.`,
    developmentalMilestones: [
      { milestone: `Formanalyse med egenskaber (sider, hjorner, lige/buede linjer)`, howWeAddress: `Form-egenskabs-ark der beder b\u00f8rn t\u00e6lle sider og hjorner opbygger analytisk geometrisk t\u00e6nkning` },
      { milestone: `Skelnen mellem lignende former (kvadrat vs. rektangel, cirkel vs. oval)`, howWeAddress: `Sammenlign-formerne-ark med side-om-side illustrationer tr\u00e6ner pr\u00e6cis formgenkendelse` },
      { milestone: `Begyndende 3D-forst\u00e5else (kugle, terning, cylinder i hverdagen)`, howWeAddress: `Find-3D-formen-ark der forbinder kugle med bold, terning med terning og cylinder med das introducerer 3D-geometri` },
      { milestone: `M\u00f8nstergenkendelse med geometriske former`, howWeAddress: `Formm\u00f8nster-forl\u00e6ngelses-ark med AB-, ABB- og ABC-sekvenser tr\u00e6ner algebraisk t\u00e6nkning visuelt` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokuser p\u00e5 fire grundformer (cirkel, trekant, firkant, rektangel), brug konkrete formklodser som supplement, og hold m\u00f8nstre enkle (AB). For avancerede b\u00f8rnehaveklasseb\u00f8rn introduceres 3D-former, formegenskaber med fagtermer og formkomposition (seks trekanter = sekskant).`,
    parentTakeaway: `Former er overalt. G\u00e5 p\u00e5 formjagt i hjemmet: \u201dhvilken form har d\u00f8ren? Tallerkenen? Vinduet?\u201d T\u00e6l sider og hjorner med fingeren. Byg med LEGO og tal om 3D-former. Klip former ud og lav m\u00f8nstre p\u00e5 koleskabet. Geometri er den matematik, man kan tage p\u00e5.`,
    classroomIntegration: `Formtemaet er b\u00f8rnehaveklassens geometrirygrad: daglig formjagt i klasselokalet, matematiktimen arbejder med form-egenskabs- og monsterark, konstruktionshj\u00f8rnet bygger med formklodser, og kunsttimen skaber formbilleder. F\u00e6lles M\u00e5ls geometrim\u00e5l underst\u00f8ttes systematisk gennem hele \u00e5ret.`,
    assessmentRubric: [
      { skill: `2D-formgenkendelse og egenskaber`, emerging: `navngiver cirkel, trekant og firkant med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 6+ 2D-former og angiver antal sider og hjorner korrekt`, advanced: `skelner praucist mellem lignende former (kvadrat/rektangel) og forklarer med egenskaber` },
      { skill: `3D-former (begyndende)`, emerging: `genkender kugle og terning med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt kugle, terning og cylinder og finder dem i hverdagen`, advanced: `beskriver 3D-formers egenskaber (flader, kanter) og sammenligner dem` },
      { skill: `Formm\u00f8nstre`, emerging: `gentager et simpelt AB-m\u00f8nster med former med st\u00f8tte`, proficient: `forts\u00e6tter selvst\u00e6ndigt AB- og ABB-m\u00f8nstre med geometriske former`, advanced: `opretter egne ABC-m\u00f8nstre og forklarer m\u00f8nsterreglen` },
    ],
  },

  space: {
    snippetAnswer: `Rum-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling af stjerner og planeter, st\u00f8rrelsesordning, m\u00f8nstre og begyndende l\u00e6sning med raketter, astronauter og solsystemet. Rummet inspirerer storstilet l\u00e6ring. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Rumtemaet f\u00e5r ny dybde i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan forst\u00e5 st\u00f8rrelsesforhold og raekkefolge \u2014 de forstaar, at Jorden er stor, men Jupiter er storre, og at Solen er storst af alle. Denne evne til ordnet sammenligning er ny sammenlignet med forskolens mere impressionistiske rumfascination. T\u00e6lling af stjerner og planeter giver \u00f8velse op til 20. St\u00f8rrelsesordning af planeter introducerer m\u00e5lebegreber. M\u00f8nstre i stjernebilleder opbygger m\u00f8nstert\u00e6nkning. Rumord som planet, raket, astronaut og galakse er sp\u00e6ndende l\u00e6seord. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik m\u00f8des i det ydre rum.`,
    developmentalMilestones: [
      { milestone: `St\u00f8rrelsesordning og sammenligning (planeter fra mindst til storst)`, howWeAddress: `Planet-st\u00f8rrelses-ordnings-ark giver konkret \u00f8velse i ordnet sammenligning med fascinerende indhold` },
      { milestone: `T\u00e6lling op til 20 med rummotiver (stjerner, planeter, meteoritter)`, howWeAddress: `Stjernetaelleark og planet-additionsovelser giver t\u00e6lle\u00f8velse i et univers af motivation` },
      { milestone: `Sekvensering (nedtaelling, raketopsendelsesprocedure)`, howWeAddress: `Nedtaellings\u00f8velser (10, 9, 8... lift-off!) og raketprocedure-sekvensering tr\u00e6ner baglens t\u00e6lling og sekventiel tankning` },
      { milestone: `Begyndende naturfaglig viden om solsystemet`, howWeAddress: `Planet-fakta-ark med navne, storrelser og r\u00e6kkef\u00f8lge introducerer astronomi p\u00e5 alderspassende niveau` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokuser p\u00e5 Jorden, Solen og M\u00e5nen alene, brug store klare billeder, og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes alle otte planeter i raekkefolge, nedtaelling fra 20 og selvst\u00e6ndig skrivning af planetfakta.`,
    parentTakeaway: `Kig p\u00e5 stjernerne sammen. T\u00e6l dem, find M\u00e5nen, og tal om planeterne. Byg en raket af papkasser og nedtael fra 10. Bes\u00f8g et planetarium. L\u00e6s rumbeger og lad barnet tegne sit eget solsystem. Rummets storhed inspirerer b\u00f8rn til at t\u00e6nke stort.`,
    classroomIntegration: `Rumtemaet bruges som et inspirationsforlob: matematiktimen arbejder med planet-t\u00e6lle- og st\u00f8rrelsesark, naturfagstimen l\u00e6rer om solsystemet, dansktimen l\u00e6ser og skriver rumord, og kunsttimen designer rumlandskaber. En raket-nedtaelling bliver klasses morgenritual. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik, matematik og kreativitet integreres.`,
    assessmentRubric: [
      { skill: `Planet-st\u00f8rrelsesordning`, emerging: `ordner 2\u20133 himmellegemer efter st\u00f8rrelse med st\u00f8tte (Maanen, Jorden, Solen)`, proficient: `ordner selvst\u00e6ndigt 5\u20136 planeter fra mindst til storst korrekt`, advanced: `ordner alle otte planeter og forklarer st\u00f8rrelsesforhold med egne ord` },
      { skill: `T\u00e6lling og nedtaelling (rumkontekst)`, emerging: `t\u00e6ller stjerner op til 10 og nedtaeller fra 5 med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 20 og nedtaeller fra 10 flydende`, advanced: `nedtaeller fra 20 og l\u00f8ser additionsopgaver med rum-taellere mentalt` },
      { skill: `Solsystem-viden (begyndende)`, emerging: `navngiver Jorden, Solen og Maanen med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 4\u20135 planeter og beskriver en simpel forskel (stor/lille)`, advanced: `navngiver alle otte planeter i raekkefolge og forklarer basale fakta om hver` },
    ],
  },
};

// --- Helpers (identical to Part 223 script) ---

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
