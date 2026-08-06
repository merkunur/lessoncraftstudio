#!/usr/bin/env node
/**
 * SEO Part 227: DA First-Grade Grade Enrichment — Themes 20-38
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the first-grade grade block of 19 DA theme files (fruits through space).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  fruits: {
    snippetAnswer: `Frugt-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner addition og subtraktion inden for 20 med frugtscener, br\u00f8ker med halvdele og fjerdedele af frugter, og selvst\u00e6ndig skrivning af frugtbeskrivelser med adjektiver. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver frugttemaet et br\u00f8k- og datalaboratorium \u2014 seks- og syv\u00e5rige kan dele frugter i halvdele, fjerdedele og tredjedele, indsamle data om klassens yndlingsfrugter i s\u00f8jlediagrammer og l\u00f8se flertrinsproblemer med frugtkurve. Addition og subtraktion inden for 20 med frugtscener giver kontekstualiseret regning med tierovergang. M\u00e5ling af frugtv\u00e6gt med v\u00e6gt og gram introducerer standardenheder. Skrivning af frugtbeskrivelser med farve, smag og tekstur tr\u00e6ner adjektivrig faglitter\u00e6r skrivning. F\u00e6lles M\u00e5ls m\u00e5l for br\u00f8ker, data og skriftlig beskrivelse i 1. klasse m\u00f8des direkte.`,
    developmentalMilestones: [
      { milestone: `Br\u00f8kforst\u00e5else med konkrete genstande (6\u20137-\u00e5rige deler frugter i lige store dele)`, howWeAddress: `Frugtdelingsark, hvor eleverne skraverer halvdele, fjerdedele og tredjedele af \u00e6bler og appelsiner, giver h\u00e5ndgribelig br\u00f8kforst\u00e5else` },
      { milestone: `Dataindsamling og diagraml\u00e6sning (s\u00f8jlediagrammer med kategorier)`, howWeAddress: `Yndlingsfrugt-unders\u00f8gelsesark med s\u00f8jlediagrammer, hvor eleverne registrerer, afl\u00e6ser og sammenligner data` },
      { milestone: `M\u00e5ling med v\u00e6gt og gram (begyndende v\u00e6gtm\u00e5ling)`, howWeAddress: `Frugtv\u00e6gtsark, hvor eleverne vejer frugter, noterer gram og sammenligner \u2014 funktionel m\u00e5ling` },
      { milestone: `Beskrivende skrivning med sanseord (smag, farve, tekstur)`, howWeAddress: `Frugtbeskrivelsesark med sensoriske adjektivrammer guider pr\u00e6cis, adjektivrig skrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns til halvdele, brug kun tre frugter i diagrammer, og tilbyd adjektivordbank. For avancerede elever i 1. klasse tilf\u00f8jes fjerdedele og tredjedele, flertrinsproblemer med frugtpriser, og selvst\u00e6ndig skrivning af frugtanmeldelser med begrundede meninger.`,
    parentTakeaway: `Del frugter ved middagsbordet og tal om br\u00f8ker: \u201dhvor mange fjerdedele er der i et \u00e6ble?\u201d Vej frugter i k\u00f8kkenet og sammenlign. Lad barnet t\u00e6lle frugter i sk\u00e5len og lave et diagram. Skriv sammen: \u201d\u00c6blet er r\u00f8dt, s\u00f8dt og sproedt.\u201d Frugt er den smagfulde vej til br\u00f8ker og data.`,
    classroomIntegration: `Frugttemaet i 1. klasse integreres i matematik og natur/teknik: br\u00f8kcirkler med frugtbilleder, s\u00f8jlediagrammer med klassens yndlingsfrugter, v\u00e6gtsm\u00e5ling i naturfagstimen og sansebeskrivelser i dansktimen. En frugtuge med smagning og dataindsamling forbinder alle fag. F\u00e6lles M\u00e5ls m\u00e5l for br\u00f8ker, data og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Br\u00f8kforst\u00e5else (frugtkontekst)`, emerging: `deler en frugt i to halvdele med st\u00f8tte`, proficient: `deler selvst\u00e6ndigt frugter i halvdele og fjerdedele og navngiver br\u00f8kerne korrekt`, advanced: `deler i tredjedele, sammenligner br\u00f8kst\u00f8rrelser og l\u00f8ser enkle br\u00f8kopgaver med frugter` },
      { skill: `Dataindsamling og diagrammer (frugtdata)`, emerging: `registrerer data i et forh\u00e5ndslavet diagram med st\u00f8tte`, proficient: `opretter selvst\u00e6ndigt et s\u00f8jlediagram med frugtdata og besvarer sammenligningssp\u00f8rgsm\u00e5l`, advanced: `analyserer data fra egne unders\u00f8gelser, drager konklusioner og pr\u00e6senterer resultater` },
      { skill: `Sansebeskrivelse af frugter`, emerging: `skriver 1\u20132 s\u00e6tninger med adjektivst\u00f8tte fra ordbank`, proficient: `skriver selvst\u00e6ndigt 3\u20134 beskrivende s\u00e6tninger med farve, smag og tekstur`, advanced: `skriver en sammenh\u00e6ngende frugtanmeldelse med begrundede meninger og sammenligning` },
    ],
  },

  furniture: {
    snippetAnswer: `M\u00f8bel-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner m\u00e5ling med lineal i centimeter, geometriske former i m\u00f8beldesign, og selvst\u00e6ndig skrivning af rumbeskrivelser. Rumlig orientering og positionsord styrkes. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver m\u00f8beltemaet et geometri- og m\u00e5leprojekt \u2014 seks- og syv\u00e5rige kan identificere geometriske former i m\u00f8bler (bordpladen er rektangul\u00e6r, stoleben er cylindriske), m\u00e5le m\u00f8bler med lineal i centimeter og bruge positionsord pr\u00e6cist i skriftlige rumbeskrivelser. Flertrinsproblemer med m\u00f8belkob (\u201dsofaen koster 12 kr. og stolen 8 kr.\u201d) giver funktionel addition inden for 20. Sortering efter materiale, funktion og rum udvider klassifikationsf\u00e6rdigheder. Rumtegning med m\u00f8belplacering tr\u00e6ner rumlig orientering. F\u00e6lles M\u00e5ls m\u00e5l for geometri, m\u00e5ling og skriftlig beskrivelse i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Geometriske former i virkeligheden (6\u20137-\u00e5rige genkender former i dagligdagsgenstande)`, howWeAddress: `M\u00f8bel-form-ark, hvor eleverne identificerer og navngiver geometriske former i billeder af m\u00f8bler` },
      { milestone: `M\u00e5ling med lineal (centimeter p\u00e5 virkelige genstande)`, howWeAddress: `M\u00f8belm\u00e5lingsark, hvor eleverne m\u00e5ler borde, stole og hylder i centimeter med lineal` },
      { milestone: `Positionsord i skrivning (ved siden af, over, under, bag)`, howWeAddress: `Rumbeskrivelsesark med positionsord-rammer guider pr\u00e6cis rumlig skrivning om m\u00f8belplacering` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns til tre grundformer, m\u00e5l i hele centimeter med stor lineal, og tilbyd positionsord-ordbank. For avancerede elever i 1. klasse tilf\u00f8jes 3D-former i m\u00f8bler, m\u00e5ling med millimeter, og selvst\u00e6ndig skrivning af rumindretningstekster med m\u00e5l og begrundelser.`,
    parentTakeaway: `G\u00e5 p\u00e5 m\u00f8beljagt derhjemme: \u201dhvilken form har bordpladen? Hvor mange hj\u00f8rner har den?\u201d M\u00e5l m\u00f8bler med en lineal og skriv resultaterne ned. Lad barnet beskrive sit v\u00e6relse med positionsord. Tegn v\u00e6relset set ovenfra. M\u00f8bler er geometri og m\u00e5ling i barnets egen verden.`,
    classroomIntegration: `M\u00f8beltemaet i 1. klasse bruges tv\u00e6rfagligt: matematik med formanalyse og m\u00e5ling, dansk med rumbeskrivelser og positionsord, billedkunst med m\u00f8beldesigntegninger, og natur/teknik med materialeunders\u00f8gelse. En klassev\u00e6relsesindretning med m\u00e5ltagning integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for geometri, m\u00e5ling og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Geometriske former i m\u00f8bler`, emerging: `navngiver firkant og cirkel i m\u00f8bler med st\u00f8tte`, proficient: `identificerer selvst\u00e6ndigt 4\u20135 geometriske former i m\u00f8bler og beskriver deres egenskaber`, advanced: `finder 3D-former, forklarer forskelle mellem 2D og 3D, og kategoriserer m\u00f8bler efter form` },
      { skill: `M\u00e5ling med lineal (m\u00f8belkontekst)`, emerging: `m\u00e5ler med st\u00f8tte og afl\u00e6ser hele centimeter`, proficient: `m\u00e5ler selvst\u00e6ndigt m\u00f8bler i centimeter og noterer resultaterne korrekt`, advanced: `m\u00e5ler pr\u00e6cist, sammenligner m\u00e5l og besvarer sp\u00f8rgsm\u00e5l om forskelle` },
      { skill: `Rumbeskrivelse med positionsord`, emerging: `skriver 1\u20132 s\u00e6tninger med positionsord fra ordbank`, proficient: `skriver selvst\u00e6ndigt 3\u20134 s\u00e6tninger med korrekte positionsord om m\u00f8belplacering`, advanced: `skriver en sammenh\u00e6ngende rumbeskrivelse med pr\u00e6cise positionsord og m\u00e5langivelser` },
    ],
  },

  garden: {
    snippetAnswer: `Have-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner m\u00e5ling af plantev\u00e6kst i centimeter, dataindsamling med v\u00e6kstdiagrammer, og selvst\u00e6ndig skrivning af planteobservationer. Naturvidenskabelig metode i praksis. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver havetemaet et naturvidenskabeligt l\u00e6ringsprojekt \u2014 seks- og syv\u00e5rige kan m\u00e5le plantev\u00e6kst i centimeter over tid, registrere data i v\u00e6kstdiagrammer og skrive observationsrapporter med egne ord. Systematisk dataindsamling (m\u00e5l planten hver uge, noter i tabel) introducerer videnskabelig metode. Addition og subtraktion med fr\u00f8- og plantetal inden for 20 giver kontekstualiserede flertrinsproblemer. Klassifikation af planter efter type (blomst, gr\u00f8ntsag, tr\u00e6) udvides med kriterier som livscyklus og v\u00e6kstbetingelser. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig unders\u00f8gelse, m\u00e5ling og skriftlig rapportering i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Systematisk m\u00e5ling over tid (6\u20137-\u00e5rige m\u00e5ler og registrerer gentagne gange)`, howWeAddress: `Plantev\u00e6kst-dagbog med ugentlig m\u00e5ling i centimeter og registrering i tabel giver longitudinel dataindsamling` },
      { milestone: `Datavisualisering (s\u00f8jlediagrammer over v\u00e6kst)`, howWeAddress: `V\u00e6kstdiagram-ark, hvor eleverne overforer tabeldata til s\u00f8jlediagrammer og afl\u00e6ser resultater` },
      { milestone: `Observationsskrivning (beskrive hvad man ser med fagord)`, howWeAddress: `Planteobservationsark med rammer for dato, m\u00e5l, udseende og \u00e6ndringer guider systematisk fagskrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, m\u00e5l i hele centimeter med stor lineal, brug forh\u00e5ndsudfyldte tabeller, og tilbyd s\u00e6tningsstartere til observationer. For avancerede elever i 1. klasse tilf\u00f8jes sammenligningsdiagrammer for to planter, hypoteseformulering (\u201dhvad sker der med mere vand?\u201d) og selvst\u00e6ndig rapportskrivning med konklusion.`,
    parentTakeaway: `Plant et fr\u00f8 i en kop og m\u00e5l v\u00e6ksten hver uge med en lineal. Skriv tallene ned og lav et diagram p\u00e5 k\u00f8leskabet. Tal om, hvad planten har brug for: vand, lys, jord. Lad barnet skrive tre observationer: \u201dplanten er 4 cm h\u00f8j, den har to blade, den er gr\u00f8n.\u201d Haven er et gratis naturvidenskabslaboratorium.`,
    classroomIntegration: `Havetemaet i 1. klasse k\u00f8rer som \u00e5rsprojekt: klassens karseb\u00f8tte m\u00e5les ugentligt, data registreres i tabeller og diagrammer i matematiktimen, observationsrapporter skrives i dansktimen, og livscyklus studeres i naturfag. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig unders\u00f8gelse, m\u00e5ling, data og skrivning integreres naturligt.`,
    assessmentRubric: [
      { skill: `Plantev\u00e6kstm\u00e5ling (cm)`, emerging: `m\u00e5ler med st\u00f8tte og noterer et enkelt m\u00e5l`, proficient: `m\u00e5ler selvst\u00e6ndigt i centimeter, registrerer i tabel og sammenligner m\u00e5l over tid`, advanced: `m\u00e5ler pr\u00e6cist, beregner v\u00e6kst mellem m\u00e5linger og formulerer konklusioner` },
      { skill: `Datavisualisering (v\u00e6kstdiagrammer)`, emerging: `overforer \u00e9t datapunkt til et diagram med st\u00f8tte`, proficient: `opretter selvst\u00e6ndigt et s\u00f8jlediagram med flere datapunkter og afl\u00e6ser resultater`, advanced: `sammenligner diagrammer, finder m\u00f8nstre og drager konklusioner om v\u00e6kstbetingelser` },
      { skill: `Planteobservationsskrivning`, emerging: `skriver 1\u20132 observationer med s\u00e6tningsstartere`, proficient: `skriver selvst\u00e6ndigt 3\u20134 observationer med dato, m\u00e5l og beskrivelse`, advanced: `skriver en sammenh\u00e6ngende observationsrapport med hypotese, data og konklusion` },
    ],
  },

  halloween: {
    snippetAnswer: `Halloween-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner addition og subtraktion inden for 20 med uhyggelige scener, symmetri med halloween-motiver og kreativ skrivning af sp\u00f8gelseshistorier med narrativ struktur. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r halloweentemaet matematisk og litteraer dybde \u2014 seks- og syv\u00e5rige l\u00f8ser flertrinsproblemer med slik, gr\u00e6skar og udkl\u00e6dning, udforsker symmetri i halloween-masker og -figurer, og skriver sp\u00f8gelseshistorier med begyndelse, midte og slutning. Slikmatematik med addition og subtraktion inden for 20 giver autentisk kontekst for tierovergang. Sortering af slik i kategorier og dataindsamling med s\u00f8jlediagrammer forbinder temaet med statistik. Ordforr\u00e5dsudvidelse med halloween-gloser (heks, flagermus, edderkop, sp\u00f8gelse) beriger sproget. F\u00e6lles M\u00e5ls m\u00e5l for tal, symmetri og kreativ skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Flertrinsproblemer med kontekst (6\u20137-\u00e5rige l\u00f8ser to-trins-opgaver)`, howWeAddress: `Slikscenarier som \u201ddu har 15 bolsjer, giver 7 v\u00e6k, finder 4 til \u2014 hvor mange nu?\u201d tr\u00e6ner sekventiel beregning` },
      { milestone: `Symmetri i figurer (genkende og producere symmetriske billeder)`, howWeAddress: `Halloween-symmetriark med masker og gr\u00e6skar, hvor eleverne tegner den manglende halvdel pr\u00e6cist` },
      { milestone: `Narrativ skrivning med struktur (begyndelse, midte, slutning)`, howWeAddress: `Sp\u00f8gelseshistorie-skabeloner med strukturrammer guider kreativ skrivning med narrativ opbygning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold regning inden for 10 med billedst\u00f8tte, brug symmetriark med tydelige hj\u00e6lpelinjer, og tilbyd historiestartere. For avancerede elever i 1. klasse tilf\u00f8jes flertrinsproblemer med tre operationer, rotationssymmetri, og selvst\u00e6ndig horror-historieskrivning med dialog og overraskende slutning.`,
    parentTakeaway: `Brug trick or treat som matematik: t\u00e6l slik i kategorier, lav et s\u00f8jlediagram, og l\u00f8s regnestykker (\u201dhvis du spiser 3 af 18 bolsjer...\u201d). Lav symmetriske halloween-masker med papir foldet p\u00e5 midten. Skriv en sp\u00f8gelseshistorie sammen. Halloween er den mest motiverende ramme for matematik og skrivning.`,
    classroomIntegration: `Halloweentemaet i 1. klasse bruges som motiverende temauge: matematik med slikregning og symmetri, dansk med sp\u00f8gelseshistorier og ordforr\u00e5dsopbygning, billedkunst med symmetriske masker, og drama med uhyggelige rollespil. F\u00e6lles M\u00e5ls m\u00e5l for tal, symmetri og kreativ skrivning integreres i et engagerende tema.`,
    assessmentRubric: [
      { skill: `Flertrinsproblemer (halloweenkontekst)`, emerging: `l\u00f8ser \u00e9t-trins-opgaver inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt to-trins-problemer inden for 20 med halloweenscenarier`, advanced: `l\u00f8ser tre-trins-problemer og formulerer egne flertrinsopgaver med halloweentema` },
      { skill: `Symmetri (halloween-motiver)`, emerging: `genkender symmetri i en maske med st\u00f8tte`, proficient: `tegner selvst\u00e6ndigt den manglende halvdel af et symmetrisk halloweenbillede`, advanced: `finder symmetriakser i flere figurer og designer egne symmetriske halloween-motiver` },
      { skill: `Kreativ sp\u00f8gelseshistorie`, emerging: `skriver 2\u20133 s\u00e6tninger med st\u00f8tte fra billeder og startere`, proficient: `skriver selvst\u00e6ndigt en kort sp\u00f8gelseshistorie med begyndelse, midte og slutning`, advanced: `skriver en detaljeret historie med dialog, sp\u00e6nding og overraskende slutning` },
    ],
  },

  holidays: {
    snippetAnswer: `Ferie- og h\u00f8jtids-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner kalenderregning, tidslinjer med m\u00e5neder, addition/subtraktion inden for 20 med festscenarier og selvst\u00e6ndig skrivning af h\u00f8jtidsbeskrivelser. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r h\u00f8jtidstemaet tidsmassig og sproglig dybde \u2014 seks- og syv\u00e5rige kan placere h\u00f8jtider p\u00e5 en \u00e5rstidslinje, beregne dage mellem begivenheder og skrive beskrivelser af traditioner med struktur. Kalenderregning med m\u00e5neder og uger giver funktionel tidsforst\u00e5else. Addition og subtraktion med gaveindkob, g\u00e6ster og festforberedelser giver flertrinsproblemer med reel kontekst. Kulturforst\u00e5else udvides med sammenligning af danske og internationale h\u00f8jtider. Skrivning af h\u00f8jtidsbeskrivelser med kronologisk opbygning tr\u00e6ner struktureret skrivning. F\u00e6lles M\u00e5ls m\u00e5l for tid, tal og skriftlig fremstilling i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Kalender- og tidsforst\u00e5else (6\u20137-\u00e5rige l\u00e6ser kalendere og beregner dage)`, howWeAddress: `H\u00f8jtidskalender-ark, hvor eleverne finder datoer, t\u00e6ller dage mellem h\u00f8jtider og placerer begivenheder p\u00e5 tidslinjer` },
      { milestone: `Kulturel sammenligning (forst\u00e5else af traditioner)`, howWeAddress: `Sammenligningsark, hvor eleverne beskriver danske og internationale h\u00f8jtider side om side` },
      { milestone: `Kronologisk beskrivelse (f\u00f8rst\u2013s\u00e5\u2013til sidst)`, howWeAddress: `H\u00f8jtidsbeskrivelsesark med kronologiske signalord guider struktureret skrivning om festtraditioner` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns til tre velkendte h\u00f8jtider, brug billedkalender, og tilbyd s\u00e6tningsstartere. For avancerede elever i 1. klasse tilf\u00f8jes tidsberegning over m\u00e5neder, kultursammenligningsessays og selvst\u00e6ndig skrivning af fiktive h\u00f8jtidstraditioner.`,
    parentTakeaway: `Brug h\u00f8jtider til kalendermatematik: \u201dhvor mange dage til jul? Hvilken m\u00e5ned er p\u00e5ske i?\u201d Lav en familietidslinje med \u00e5rets h\u00f8jtider. Lad barnet skrive om sin yndlingsh\u00f8jtid med tegning: hvad sker f\u00f8rst, hvad sker s\u00e5, hvad sker til sidst? Traditioner giver struktur til b\u00e5de tid og skrivning.`,
    classroomIntegration: `H\u00f8jtidstemaet i 1. klasse bruges \u00e5ret rundt: matematik med kalenderregning og tidslinjer, dansk med h\u00f8jtidsbeskrivelser og ordforr\u00e5d, kristendom/livsoplysning med traditionsforst\u00e5else, og billedkunst med h\u00f8jtidsdekorationer. Hver h\u00f8jtid bliver et mini-temaforl\u00f8b. F\u00e6lles M\u00e5ls m\u00e5l for tid, kulturforst\u00e5else og skrivning integreres.`,
    assessmentRubric: [
      { skill: `Kalenderregning og tidslinjer`, emerging: `finder en dato p\u00e5 en kalender med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt dage mellem datoer og placerer h\u00f8jtider p\u00e5 en tidslinje korrekt`, advanced: `beregner uger og m\u00e5neder, sammenligner tidsintervaller og forklarer kronologi` },
      { skill: `Addition/subtraktion (festkontekst)`, emerging: `l\u00f8ser \u00e9t-trins-opgaver inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt to-trins-problemer inden for 20 med festscenarier`, advanced: `l\u00f8ser flertrinsproblemer med gavebudgetter og g\u00e6steberegninger` },
      { skill: `H\u00f8jtidsbeskrivelse (kronologisk)`, emerging: `skriver 1\u20132 s\u00e6tninger om en h\u00f8jtid med st\u00f8tte`, proficient: `skriver selvst\u00e6ndigt en kronologisk beskrivelse med 3\u20134 s\u00e6tninger og signalord`, advanced: `skriver en detaljeret h\u00f8jtidsbeskrivelse med kulturel sammenligning og personlig refleksion` },
    ],
  },

  household: {
    snippetAnswer: `Husholdnings-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner m\u00e5ling med standardenheder, sortering efter flere kriterier, pengeregning med indkobslister og selvst\u00e6ndig skrivning af instruktioner. Hverdagsmatematik i praksis. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver husholdningstemaet et funktionelt matematikprojekt \u2014 seks- og syv\u00e5rige kan maale rumtemperatur, veje ingredienser i gram og beregne indkobspriser med addition inden for 20. Sortering af husholdningsgenstande efter materiale, funktion og rum udvider klassifikationsf\u00e6rdigheder til tre samtidige kriterier. Instruktionstekster (\u201ds\u00e5dan rydder du op p\u00e5 dit v\u00e6relse\u201d) traener proceduretekst med nummererede trin. Tidsforst\u00e5else med dagligdagsrutiner (morgenmad kl. 7, skole kl. 8) forbinder klokkeslaet med virkelighed. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, tal og proceduretekst i 1. klasse m\u00f8des direkte.`,
    developmentalMilestones: [
      { milestone: `Funktionel m\u00e5ling med standardenheder (gram, liter, grader)`, howWeAddress: `Husholdningsm\u00e5lingsark, hvor eleverne vejer, m\u00e5ler og afl\u00e6ser v\u00e6rdier p\u00e5 k\u00f8kkenredskaber` },
      { milestone: `Begyndende pengeregning (kroner og priser)`, howWeAddress: `Indkobslisteark, hvor eleverne adderer priser, sammenligner og beregner byttepenge inden for 20 kr.` },
      { milestone: `Proceduretekst (nummererede trin i en instruktion)`, howWeAddress: `Instruktionsark, hvor eleverne skriver 4\u20136 nummererede trin til husholdningsopgaver` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns til hele kroner og to-tre genstande, brug forenklede m\u00e5leark med billedst\u00f8tte, og tilbyd s\u00e6tningsstartere til instruktioner. For avancerede elever i 1. klasse tilf\u00f8jes prisberegning med \u00f8re, flertrinsproblemer med husholdningsbudget og selvst\u00e6ndig skrivning af opskrifter som proceduretekst.`,
    parentTakeaway: `G\u00f8r hverdagsopgaver til matematik: lad barnet veje mel p\u00e5 kokkenv\u00e6gten, t\u00e6lle priser p\u00e5 indkobssedlen, og time oprydning med et stopur. Skriv en instruktion sammen: \u201ds\u00e5dan daekker vi bord.\u201d Husholdning er den mest autentiske ramme for funktionel matematik og skrivning.`,
    classroomIntegration: `Husholdningstemaet i 1. klasse forbinder skole og hjem: matematik med m\u00e5ling, pengeregning og tidsforst\u00e5else, dansk med instruktionstekster og indkobslister, og natur/teknik med materialesortering. En klassens-husholdningsuge med rollespilsbutik og opskrifter integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, penge og proceduretekst underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `M\u00e5ling med standardenheder (husholdning)`, emerging: `afl\u00e6ser et m\u00e5leresultat med st\u00f8tte (hele tal)`, proficient: `m\u00e5ler selvst\u00e6ndigt med v\u00e6gt og m\u00e5lekop og noterer resultatet korrekt`, advanced: `m\u00e5ler praecist, sammenligner m\u00e5l og l\u00f8ser flertrinsproblemer med m\u00e5leenheder` },
      { skill: `Pengeregning (indkobskontekst)`, emerging: `adderer to priser inden for 10 kr. med st\u00f8tte`, proficient: `adderer selvstaendigt tre priser inden for 20 kr. og sammenligner priser`, advanced: `loser flertrinsproblemer med byttepenge og enkelt budgetlaegning` },
      { skill: `Instruktionstekst (proceduretekst)`, emerging: `skriver 2\u20133 trin med billedst\u00f8tte`, proficient: `skriver selvst\u00e6ndigt 4\u20136 nummererede trin i logisk raekkefolge`, advanced: `skriver detaljerede instruktioner med tidsangivelser, maengder og begrundelser` },
    ],
  },

  insects: {
    snippetAnswer: `Insekt-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner systematisk observation, dataindsamling med insektt\u00e6llinger, addition/subtraktion inden for 20 og selvst\u00e6ndig skrivning af insektfakta. Videnskabelig metode i miniformat. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver insekttemaet et felt-forskningsprojekt \u2014 seks- og syv\u00e5rige kan gennemf\u00f8re systematiske insektt\u00e6llinger, registrere fund i stregdiagrammer og l\u00e6se faktatekster om insekters livscyklus. Klassifikation med tre kriterier (antal ben, vinger, f\u00f8lere) adskiller insekter fra edderkopper og tusindben. Addition og subtraktion inden for 20 med insektscener giver kontekstualiseret regning. M\u00e5ling af insekter med millimeter og centimeter introducerer sm\u00e5 m\u00e5leenheder. Skrivning af insektfakta med egne ord tr\u00e6ner faglitter\u00e6r skrivning. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig unders\u00f8gelse, data og skriftlig rapportering i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Systematisk observation og registrering (6\u20137-\u00e5rige t\u00e6ller og noterer)`, howWeAddress: `Insektt\u00e6llingsark med stregdiagrammer, hvor eleverne registrerer fund fra skoleg\u00e5rden systematisk` },
      { milestone: `Klassifikation med fagtermer (insekt vs. edderkop vs. tusindben)`, howWeAddress: `Sorteringsark med tre kolonner og faglige kriterier (antal ben, vinger) tr\u00e6ner pr\u00e6cis klassifikation` },
      { milestone: `Faglitter\u00e6r skrivning (korte faktatekster med fagord)`, howWeAddress: `Insektfakta-ark med rammer for art, udseende, levested og f\u00f8de guider struktureret fagskrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns til fire velkendte insekter, brug forh\u00e5ndsudfyldte diagrammer, og tilbyd s\u00e6tningsstartere med ordbank. For avancerede elever i 1. klasse tilf\u00f8jes livscyklusdiagrammer, millimeterm\u00e5ling af insekter og selvst\u00e6ndig skrivning af insektforskningsrapporter.`,
    parentTakeaway: `G\u00e5 p\u00e5 insektjagt i haven med et forst\u00f8rrelsesglas. T\u00e6l ben: \u201dhar den 6 ben? S\u00e5 er den et insekt!\u201d F\u00f8r en insektdagbog med tegning og fakta. M\u00e5l en bille med lineal. Skriv tre fakta om dagens fund. Naturen er det bedste klasselokale for videnskabelig t\u00e6nkning.`,
    classroomIntegration: `Insekttemaet i 1. klasse k\u00f8rer som udeskole-projekt: insektt\u00e6llinger p\u00e5 skoleg\u00e5rden, dataregistrering i matematik, faktatekster i dansk, og livscyklusstudier i naturfag. Et klasseinsektarium med observationslogbog integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig unders\u00f8gelse, data og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Insektt\u00e6lling og dataregistrering`, emerging: `registrerer \u00e9n insekttype i et stregdiagram med st\u00f8tte`, proficient: `t\u00e6ller og registrerer selvst\u00e6ndigt 3\u20134 insekttyper i stregdiagrammer`, advanced: `gennemf\u00f8rer egne insektt\u00e6llinger, sammenligner data og drager konklusioner` },
      { skill: `Klassifikation (insekt vs. edderkop)`, emerging: `sorterer velkendte dyr i to grupper med billedst\u00f8tte`, proficient: `klassificerer selvst\u00e6ndigt efter antal ben og vinger med fagtermer`, advanced: `forklarer klassifikationskriterier og h\u00e5ndterer gr\u00e6nsetilf\u00e6lde med begrundelse` },
      { skill: `Insektfakta-skrivning`, emerging: `skriver 1\u20132 faktas\u00e6tninger med ordbank og st\u00f8tte`, proficient: `skriver selvst\u00e6ndigt 3\u20134 faktas\u00e6tninger med fagord om en insektart`, advanced: `skriver en sammenh\u00e6ngende forskningsrapport med indledning, fakta og konklusion` },
    ],
  },

  jobs: {
    snippetAnswer: `Erhverv-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner addition/subtraktion inden for 20 med erhvervsscenarier, tidsforst\u00e5else med arbejdsdage, og selvst\u00e6ndig skrivning af erhvervsbeskrivelser. Samfundsforst\u00e5else i praksis. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse udvides erhvervstemaet til funktionel matematik og samfundsforst\u00e5else \u2014 seks- og syv\u00e5rige kan l\u00f8se regneproblemer med erhvervsscenarier (bageren bager 12 br\u00f8d, s\u00e6lger 7), l\u00e6se om erhverv i korte faktatekster og skrive erhvervsbeskrivelser med struktur. Tidsforst\u00e5else med arbejdstider og ugedage giver funktionel kalenderl\u00e6sning. Pengeregning med l\u00f8n og priser introducerer \u00f8konomisk taenkning. Sortering af erhverv efter kategori (service, h\u00e5ndv\u00e6rk, sundhed) udvider klassifikation. Interviewskrivning med sp\u00f8rgsm\u00e5l og svar traener dialogformat. F\u00e6lles M\u00e5ls m\u00e5l for tal, samfundsforst\u00e5else og skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Kontekstualiseret regning (6\u20137-\u00e5rige l\u00f8ser tekstopgaver med erhvervsscenarier)`, howWeAddress: `Erhvervs-regneopgaver, hvor bagere, brandmaend og laerere giver kontekst for addition/subtraktion inden for 20` },
      { milestone: `Tidsforst\u00e5else (arbejdstider, ugedage, klokkeslaet)`, howWeAddress: `Arbejdsdags-ark, hvor eleverne l\u00e6ser skemaer, beregner timer og matcher erhverv med arbejdstider` },
      { milestone: `Erhvervsbeskrivelse med struktur (hvad, hvor, hvorn\u00e5r)`, howWeAddress: `Erhvervsfakta-ark med rammer for titel, opgaver, redskaber og arbejdssted guider struktureret fagskrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns til velkendte erhverv (laerer, brandmand, laege), hold regning inden for 10, og tilbyd s\u00e6tningsstartere. For avancerede elever i 1. klasse tilf\u00f8jes erhvervssammenligninger, l\u00f8nberegning med flertrin og selvst\u00e6ndig skrivning af erhvervsinterview med sp\u00f8rgsm\u00e5l og svar.`,
    parentTakeaway: `Tal om erhverv i hverdagen: \u201dhvad laver kasseekspedienten? Hvor mange varer scanner hun p\u00e5 \u00e9n time?\u201d Lad barnet interviewe en voksen om deres arbejde og skrive tre fakta. Spil butik med rigtige priser. Erhverv er den bedste ramme for at forst\u00e5, hvorfor matematik og l\u00e6sning er vigtigt.`,
    classroomIntegration: `Erhvervstemaet i 1. klasse bruges som samfundsfagligt tvaerfagligt projekt: matematik med erhvervsregning og tidsforst\u00e5else, dansk med erhvervsbeskrivelser og interview, og samfundsfag med erhvervskategorisering. G\u00e6stel\u00e6rere fra forskellige erhverv bes\u00f8ger klassen. F\u00e6lles M\u00e5ls m\u00e5l for tal, samfund og skrivning integreres.`,
    assessmentRubric: [
      { skill: `Tekstopgaver med erhvervsscenarier`, emerging: `l\u00f8ser \u00e9t-trins-opgaver inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt to-trins-problemer inden for 20 med erhvervskontekst`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne tekstopgaver med erhvervsscenarier` },
      { skill: `Tidsforst\u00e5else (arbejdstider)`, emerging: `l\u00e6ser hele klokkeslaet med st\u00f8tte`, proficient: `l\u00e6ser selvst\u00e6ndigt halve og hele timer og beregner enkle tidsforskelle`, advanced: `beregner arbejdstimer, sammenligner skemaer og l\u00f8ser tidsproblemer` },
      { skill: `Erhvervsbeskrivelse (skriftlig)`, emerging: `skriver 1\u20132 s\u00e6tninger om et erhverv med ordbank`, proficient: `skriver selvst\u00e6ndigt 3\u20134 s\u00e6tninger med erhvervsfagord og struktur`, advanced: `skriver en sammenh\u00e6ngende erhvervsbeskrivelse eller et interview med sp\u00f8rgsm\u00e5l og svar` },
    ],
  },

  music: {
    snippetAnswer: `Musik-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner m\u00f8nstergenkendelse med rytmer, br\u00f8ker med nodevaerdier, og selvst\u00e6ndig skrivning af sangbeskrivelser. Musikalske m\u00f8nstre styrker matematisk t\u00e6nkning. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r musiktemaet matematisk og sproglig dybde \u2014 seks- og syv\u00e5rige kan genkende og forl\u00e6nge rytmiske m\u00f8nstre med nodevaerdier, forst\u00e5 br\u00f8ker via halvnoder og fjerdedelsnoder, og skrive sangbeskrivelser med adjektiver. M\u00f8nstergenkendelse med musikalske symboler (fjerdedel, halvnode, helnode) overforer direkte til matematiske m\u00f8nstre. T\u00e6lling af taktslag i grupper traener multiplication som gentagen addition. Instrumentklassifikation efter type (strenge, bl\u00e6se, sl\u00e5) giver kategoriseringstraening. Skrivning om musik med f\u00f8lelsesord (glad, rolig, vild) udbygger ordforr\u00e5det. F\u00e6lles M\u00e5ls m\u00e5l for m\u00f8nstre, br\u00f8ker og kreativ skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Rytmiske m\u00f8nstre (6\u20137-\u00e5rige genkender, forl\u00e6nger og skaber rytmer)`, howWeAddress: `Rytmem\u00f8nster-ark med nodevaerdier, hvor eleverne forts\u00e6tter, korrigerer og designer egne rytmem\u00f8nstre` },
      { milestone: `Br\u00f8kforst\u00e5else via nodevaerdier (helnode, halvnode, fjerdedel)`, howWeAddress: `Nodevaerdi-br\u00f8kark, hvor eleverne matcher halvnoder med halvdele og fjerdedele med kvarte dele` },
      { milestone: `Beskrivende skrivning med f\u00f8lelsesord (musik v\u00e6kker f\u00f8lelser)`, howWeAddress: `Sangbeskrivelsesark med f\u00f8lelsesord-rammer guider skrivning om musikkens virkning og stemning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, brug kun to nodevaerdier (fjerdedel og halvnode), begr\u00e6ns m\u00f8nstre til AB og ABB, og tilbyd f\u00f8lelsesord-ordbank. For avancerede elever i 1. klasse tilf\u00f8jes tre nodevaerdier, komplekse m\u00f8nstre med pauser, og selvst\u00e6ndig skrivning af musikanmeldelser med begrundede meninger.`,
    parentTakeaway: `Klap rytmer sammen og lav m\u00f8nstre: kort-kort-lang, kort-kort-lang. Lyt til musik og beskriv f\u00f8lelsen: \u201ddenne sang er hurtig og glad.\u201d Sorter instrumenter p\u00e5 billeder: strengeinstrumenter, bl\u00e6seinstrumenter, sl\u00e5inst rumenter. Musik er matematik for \u00f8rerne \u2014 m\u00f8nstre, br\u00f8ker og struktur i lyd.`,
    classroomIntegration: `Musiktemaet i 1. klasse forbinder musik og matematik: rytmem\u00f8nstre i musiktimen overfores til m\u00f8nsterark i matematik, nodevaerdier introducerer br\u00f8ker visuelt, og dansktimen skriver sangbeskrivelser med f\u00f8lelsesord. En klassekomposition med enkle noder afslutter forl\u00f8bet. F\u00e6lles M\u00e5ls m\u00e5l for m\u00f8nstre, br\u00f8ker og kreativ skrivning integreres.`,
    assessmentRubric: [
      { skill: `Rytmiske m\u00f8nstre (musikkontekst)`, emerging: `gentager et AB-m\u00f8nster med klap med st\u00f8tte`, proficient: `forts\u00e6tter selvst\u00e6ndigt ABB- og AABB-rytmer med nodevaerdier og forklarer reglen`, advanced: `designer egne rytmem\u00f8nstre med tre nodevaerdier og formulerer reglen skriftligt` },
      { skill: `Br\u00f8ker via nodevaerdier`, emerging: `matcher en halvnode med \u201dhalvdel\u201d med billedst\u00f8tte`, proficient: `forklarer selvst\u00e6ndigt forholdet mellem helnode, halvnode og fjerdedel`, advanced: `l\u00f8ser br\u00f8kopgaver med nodevaerdier og overforer forst\u00e5elsen til andre kontekster` },
      { skill: `Musikbeskrivelse (skriftlig)`, emerging: `skriver 1\u20132 s\u00e6tninger om en sang med f\u00f8lelsesord fra ordbank`, proficient: `skriver selvst\u00e6ndigt 3\u20134 beskrivende s\u00e6tninger om musikkens tempo, stemning og instrumenter`, advanced: `skriver en sammenh\u00e6ngende musikanmeldelse med begrundede meninger og sammenligninger` },
    ],
  },

  nature: {
    snippetAnswer: `Natur-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner systematisk naturobservation, dataindsamling med stregdiagrammer, m\u00e5ling med standardenheder og selvst\u00e6ndig skrivning af naturrapporter. Videnskabelig metode i praksis. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver naturtemaet et struktureret forskningsprojekt \u2014 seks- og syv\u00e5rige kan gennemf\u00f8re systematiske observationer med checklister, registrere data i stregdiagrammer og skrive observationsrapporter med dato og m\u00e5leresultater. M\u00e5ling af blade, sten og pinde med centimeter giver funktionel brug af linealen. Klassifikation af naturmaterialer efter flere kriterier (levende/ikke-levende, plante/dyr, st\u00f8rrelse) styrker logisk t\u00e6nkning. Vejrobservation over tid introducerer longitudinelle data. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig unders\u00f8gelse, m\u00e5ling og skriftlig rapportering i 1. klasse m\u00f8des direkte.`,
    developmentalMilestones: [
      { milestone: `Systematisk observation med checkliste (6\u20137-\u00e5rige f\u00f8lger en plan for observation)`, howWeAddress: `Naturobservations-checklister, hvor eleverne systematisk registrerer fund af planter, dyr og naturmaterialer` },
      { milestone: `Longitudinel dataindsamling (data over tid)`, howWeAddress: `Vejrobservationsark med daglige registreringer over en uge giver forst\u00e5else af data over tid` },
      { milestone: `Naturrapportskrivning (fakta med m\u00e5l og observationer)`, howWeAddress: `Naturrapport-skabeloner med dato, sted, fund og m\u00e5leresultater guider systematisk fagskrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns observationslisten til fem elementer, m\u00e5l i hele centimeter, og tilbyd s\u00e6tningsstartere. For avancerede elever i 1. klasse tilf\u00f8jes hypoteseformulering, sammenligningsdata fra to naturomr\u00e5der og selvst\u00e6ndig rapportskrivning med konklusion.`,
    parentTakeaway: `Tag p\u00e5 naturvandring med en checkliste: \u201dfandt vi mos? Biller? Svampe?\u201d M\u00e5l blade og pinde med lineal. F\u00f8r en vejrdagbog p\u00e5 k\u00f8leskabet i en uge. Lad barnet skrive: \u201di dag fandt vi 3 snegle og 2 biller. Det var overskyet.\u201d Naturen er det bedste klasselokale for videnskab.`,
    classroomIntegration: `Naturtemaet i 1. klasse k\u00f8rer som udeskole-\u00e5rsprojekt: ugentlige naturobservationer p\u00e5 skoleg\u00e5rden, dataregistrering i matematik, naturrapporter i dansk, og \u00e5rstidsforandringer i naturfag. Et klassenaturbord med fund og m\u00e5leresultater integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, m\u00e5ling, data og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Systematisk naturobservation`, emerging: `finder og registrerer 2\u20133 elementer fra en checkliste med st\u00f8tte`, proficient: `gennemf\u00f8rer selvst\u00e6ndigt en observation med checkliste og registrerer alle fund`, advanced: `planl\u00e6gger egne observationer, formulerer sp\u00f8rgsm\u00e5l og drager konklusioner` },
      { skill: `M\u00e5ling af naturgenstande (cm)`, emerging: `m\u00e5ler \u00e9n genstand med st\u00f8tte og afl\u00e6ser resultatet`, proficient: `m\u00e5ler selvst\u00e6ndigt flere genstande i centimeter og sammenligner`, advanced: `m\u00e5ler praecist, organiserer data i tabeller og finder m\u00f8nstre` },
      { skill: `Naturrapportskrivning`, emerging: `skriver 1\u20132 observationer med s\u00e6tningsstartere`, proficient: `skriver selvst\u00e6ndigt en naturrapport med dato, sted, fund og m\u00e5l`, advanced: `skriver en detaljeret rapport med hypotese, observationer, data og konklusion` },
    ],
  },

  numbers: {
    snippetAnswer: `Tal-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner positionsvaerdi med tiere og enere, addition og subtraktion inden for 20 med tierovergang, og selvst\u00e6ndig l\u00f8sning af flertrinsproblemer. Talforst\u00e5elsen uddybes markant. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse g\u00e5r taltemaet fra t\u00e6lling til forst\u00e5else \u2014 seks- og syv\u00e5rige mestrer positionsvaerdi (tiere og enere), l\u00f8ser addition og subtraktion med tierovergang og arbejder med talm\u00f8nstre som lige/ulige og talr\u00e6kker med spring. Titalssystemet udbygges med hundredtavlen som v\u00e6rkt\u00f8j. Flertrinsproblemer (12 + 5 \u2212 3) kr\u00e6ver sekventiel t\u00e6nkning. Talsammenligning med >, < og = introduceres formelt. M\u00e5ling og penge giver funktionelle talkontekster. Skrivning af tallenes historie (\u201dhvorfor har vi ti cifre?\u201d) forbinder matematik med kultur. F\u00e6lles M\u00e5ls m\u00e5l for talforst\u00e5else, regning og probleml\u00f8sning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Positionsvaerdi (6\u20137-\u00e5rige forst\u00e5r tiere og enere)`, howWeAddress: `Tiere-enere-ark med bundtningsøvelser, hundredtavle og positionsvaerdi-spil giver konkret talforst\u00e5else` },
      { milestone: `Tierovergang i addition/subtraktion (10 + 3, 15 \u2212 7)`, howWeAddress: `Tierovergangs-ark med tiertalsstrategier, tallinjer og billedst\u00f8tte tr\u00e6ner den afg\u00f8rende f\u00e6rdighed` },
      { milestone: `Talm\u00f8nstre (lige/ulige, spring-t\u00e6lling)`, howWeAddress: `M\u00f8nster-ark med talr\u00e6kker, hundredtavle-farvning og regel-formulering udbygger tallenes struktur` },
      { milestone: `Talsammenligning med symboler (>, <, =)`, howWeAddress: `Sammenligningsark med krokodillemund-symboler giver visuel st\u00f8tte til formel talsammenligning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, brug talknopper og tallinjer til tierovergang, begr\u00e6ns til addition inden for 15, og tilbyd hundredtavle som hj\u00e6lpemiddel. For avancerede elever i 1. klasse tilf\u00f8jes talomr\u00e5de op til 100, spring-t\u00e6lling med 5 og 10, og selvst\u00e6ndig formulering af talproblemer.`,
    parentTakeaway: `\u00d8v positionsvaerdi med moenster og ti-bundter: 13 = 1 tier + 3 enere. Brug en hundredtavle p\u00e5 vaeggen. Spil terningespil med tierovergang. T\u00e6l med spring af 2, 5 og 10 p\u00e5 ture. Lad barnet v\u00e6re \u201dtall\u00e6rer\u201d og stille regneopgaver til familien. Tal er fundamentet for al matematik.`,
    classroomIntegration: `Taltemaet i 1. klasse er kernen i matematikundervisningen: daglige positionsvaerdi-\u00f8velser, ugentlige tierovergangsopgaver, hundredtavleaktiviteter og flertrinsproblemer i kontekst. Talsnak-rutiner (\u201dtallets dag\u201d med dagens dato) integrerer talforst\u00e5else i hverdagen. F\u00e6lles M\u00e5ls m\u00e5l for talforst\u00e5else, regning og probleml\u00f8sning underst\u00f8ttes direkte.`,
    assessmentRubric: [
      { skill: `Positionsvaerdi (tiere og enere)`, emerging: `t\u00e6ller genstande \u00e9n ad gangen op til 20 uden gruppering`, proficient: `grupperer selvst\u00e6ndigt i tiere og enere og angiver tallet korrekt (f.eks. 15 = 1 tier + 5 enere)`, advanced: `forklarer positionsvaerdi med egne ord, anvender p\u00e5 nye tal og l\u00f8ser positionsvaerdi-g\u00e5der` },
      { skill: `Addition/subtraktion med tierovergang`, emerging: `l\u00f8ser opgaver inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvstaendigt opgaver med tierovergang inden for 20 med strategi`, advanced: `l\u00f8ser flertrinsproblemer med tierovergang og forklarer sin regnestrategi mundtligt` },
      { skill: `Talm\u00f8nstre og -sammenligning`, emerging: `genkender lige og ulige med st\u00f8tte fra hundredtavle`, proficient: `fortsaetter selvstaendigt talmoenstre med spring af 2, 5 og 10 og bruger >, < korrekt`, advanced: `finder og formulerer egne talmoenstre og loser sammenligningsopgaver med begrundelse` },
    ],
  },

  ocean: {
    snippetAnswer: `Hav-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner dataindsamling med havdyr, addition/subtraktion inden for 20 med undervandscener, m\u00e5ling af havdyr og selvst\u00e6ndig skrivning af havdyrsfakta. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver havtemaet et oceanforskningsprojekt \u2014 seks- og syv\u00e5rige kan l\u00e6se faktatekster om havdyr, indsamle data om dyrearter i s\u00f8jlediagrammer og l\u00f8se flertrinsproblemer med undervandsscener. Klassifikation af havdyr efter type (fisk, pattedyr, bl\u00f8ddyr, krebsdyr) udbygger biologisk forst\u00e5else. M\u00e5ling af havdyrs laengde i centimeter giver konkret talforst\u00e5else. Sammenlignende laesning af faktatekster om to havdyr traener informationslaesning. Skrivning af havdyrsfakta med fagord traener faglitteraer skrivning. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, data og skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Biologisk klassifikation (6\u20137-\u00e5rige sorterer havdyr efter type med fagtermer)`, howWeAddress: `Havdyrs-sorteringsark med kategorier (fisk, pattedyr, krebsdyr) tr\u00e6ner biologisk klassifikation med fagord` },
      { milestone: `Informationslaesning og sammenligning (laese to tekster og finde forskelle)`, howWeAddress: `Sammenligningsark med to havdyr side om side, hvor eleverne finder ligheder og forskelle` },
      { milestone: `Faktaskrivning med fagord (havbiologi)`, howWeAddress: `Havdyrsfakta-ark med rammer for art, levested, fode og saerlige egenskaber guider fagskrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begraens til fire velkendte havdyr, brug billedst\u00f8tte til klassifikation, og tilbyd saetningsstartere. For avancerede elever i 1. klasse tilf\u00f8jes fodekaedeforstaelse, sammenlignende essays om to havdyr og selvstaendig skrivning af havforskningsrapporter.`,
    parentTakeaway: `Se en havdokunentar og stil fakta-sp\u00f8rgsm\u00e5l: \u201der en hval en fisk eller et pattedyr? Hvorfor?\u201d M\u00e5l havdyr p\u00e5 billeder med lineal. Lav et familiediagram over yndlingshavdyr. Lad barnet skrive tre fakta om en haj eller en blaeksprutte. Havet er fuldt af matematik og naturvidenskab.`,
    classroomIntegration: `Havtemaet i 1. klasse bruges som naturvidenskabeligt projekt: matematik med havdyrsdata og maaling, dansk med havdyrsfakta og sammenligningslaesning, naturfag med havbiologi og klassifikation, og billedkunst med undervandsscener. En havuge med film, boeger og skrivning integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for data, naturfag og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Havdyrsklassifikation`, emerging: `sorterer velkendte havdyr i to grupper med billedst\u00f8tte`, proficient: `klassificerer selvst\u00e6ndigt havdyr i 3\u20134 kategorier med fagtermer (fisk, pattedyr, krebsdyr)`, advanced: `forklarer klassifikationskriterier, h\u00e5ndterer gr\u00e6nsetilf\u00e6lde og bruger fagtermer pr\u00e6cist` },
      { skill: `Addition/subtraktion (undervandsscener)`, emerging: `l\u00f8ser \u00e9t-trins-opgaver inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt to-trins-problemer inden for 20 med havdyrsscenarier`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne tekstopgaver med havdata` },
      { skill: `Havdyrsfakta-skrivning`, emerging: `skriver 1\u20132 faktas\u00e6tninger med ordbank og st\u00f8tte`, proficient: `skriver selvst\u00e6ndigt 3\u20134 faktas\u00e6tninger med fagord om et havdyr`, advanced: `skriver en sammenh\u00e6ngende havdyrsrapport med sammenligning af to arter` },
    ],
  },

  pets: {
    snippetAnswer: `K\u00e6ledyr-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner dataindsamling om k\u00e6ledyr, addition/subtraktion inden for 20 med dyreplejebudgetter, m\u00e5ling af dyrets vaegt og l\u00e6ngde, og selvst\u00e6ndig skrivning af k\u00e6ledyrsdagbog. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver k\u00e6ledyrstemaet et ansvars- og forskningsprojekt \u2014 seks- og syv\u00e5rige kan indsamle data om klassens k\u00e6ledyr i s\u00f8jlediagrammer, beregne fodercudgifter med addition inden for 20, og skrive k\u00e6ledyrsdagbog med observationer over tid. M\u00e5ling af dyrets vaegt, laengde og h\u00f8jde giver funktionel brug af standardenheder. Sammenligning af k\u00e6ledyrs behov (foder, plads, motion) udbygger klassifikationsevner. Informationslaesning om dyreracer traener faglitteraer laesning. Ansvarsforstaelse (foderskema, dyrlaegebesoeg) forbinder temaet med livsfaerdigheder. F\u00e6lles M\u00e5ls m\u00e5l for data, maaling og skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Dataindsamling og diagrammer (6\u20137-\u00e5rige laver egne s\u00f8jlediagrammer)`, howWeAddress: `K\u00e6ledyrsunders\u00f8gelsesark, hvor eleverne sp\u00f8rger klassekammerater og registrerer data i s\u00f8jlediagrammer` },
      { milestone: `M\u00e5ling af levende v\u00e6sner (vaegt og laengde med standardenheder)`, howWeAddress: `Dyrem\u00e5lingsark, hvor eleverne m\u00e5ler og vejer (leget\u00f8js)dyr og registrerer i tabeller` },
      { milestone: `Dagbogsform (gentagne observationer over tid)`, howWeAddress: `K\u00e6ledyrsdagbog-skabeloner med dato, observation og m\u00e5leresultat guider longitudinel skrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begraens til tre k\u00e6ledyrstyper i diagrammer, maal i hele centimeter, og tilbyd saetningsstartere til dagbogen. For avancerede elever i 1. klasse tilf\u00f8jes budgetberegning for k\u00e6ledyrspleje, sammenlignende rapporter om to dyreracer og selvstaendig dagbogsskrivning med grafisk fremstilling.`,
    parentTakeaway: `Lad barnet v\u00e6re k\u00e6ledyrsforskeren: m\u00e5l hundens l\u00e6ngde med m\u00e5leb\u00e5nd, vej kattens foder p\u00e5 k\u00f8kkenv\u00e6gten, og for en dagbog over dyrets vaner. Beregn ugentlige foderudgifter. Sp\u00f8rg venner om deres k\u00e6ledyr og lav et s\u00f8jlediagram. K\u00e6ledyr laerer ansvar \u2014 og matematik.`,
    classroomIntegration: `K\u00e6ledyrstemaet i 1. klasse bruges tvaerfagligt: matematik med data og maalinger, dansk med k\u00e6ledyrsdagbog og faktatekster, naturfag med dyreklassifikation og behov, og etik med ansvarsforstaelse. Et klassekaledyr (f.eks. fisk) giver autentisk kontekst. F\u00e6lles M\u00e5ls m\u00e5l for data, m\u00e5ling, naturfag og skrivning integreres.`,
    assessmentRubric: [
      { skill: `Dataindsamling (k\u00e6ledyrsunders\u00f8gelse)`, emerging: `registrerer data i et forh\u00e5ndslavet diagram med st\u00f8tte`, proficient: `gennemf\u00f8rer selvst\u00e6ndigt en unders\u00f8gelse, opretter diagram og besvarer sp\u00f8rgsm\u00e5l om data`, advanced: `designer egne unders\u00f8gelser, sammenligner datasaet og drager konklusioner` },
      { skill: `M\u00e5ling af dyr (vaegt/l\u00e6ngde)`, emerging: `m\u00e5ler \u00e9n dimension med st\u00f8tte`, proficient: `m\u00e5ler selvst\u00e6ndigt vaegt og l\u00e6ngde i standardenheder og noterer korrekt`, advanced: `sammenligner m\u00e5l mellem dyr, beregner forskelle og praesenterer data i tabeller` },
      { skill: `K\u00e6ledyrsdagbog (skriftlig)`, emerging: `skriver 1\u20132 s\u00e6tninger med s\u00e6tningsstartere om en observation`, proficient: `skriver selvst\u00e6ndigt daglige observationer med dato, m\u00e5l og beskrivelse`, advanced: `f\u00f8rer en sammenhaengende dagbog over tid med refleksioner og konklusioner` },
    ],
  },

  pirates: {
    snippetAnswer: `Pirat-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner kortlaesning med koordinater, addition/subtraktion inden for 20 med skattejagt, m\u00e5ling af afstande og kreativ skrivning af pirathistorier med narrativ struktur. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r pirattemaet matematisk og sproglig dybde \u2014 seks- og syv\u00e5rige kan laese skattekort med enkle koordinater (raekke og kolonne), l\u00f8se flertrinsproblemer med guldm\u00f8nter og skattekister, og skrive pirathistorier med begyndelse, eventyr og slutning. Koordinatsystemer med bogstav og tal (A3, B5) introducerer formel rumlig t\u00e6nkning. Pengeregning med guldmoenter giver kontekst for addition og subtraktion med tierovergang. Kompassretninger (nord, syd, ost, vest) udvider orienteringsf\u00e6rdigheder. Piratordforraad beriger sproget kreativt. F\u00e6lles M\u00e5ls m\u00e5l for rumlig orientering, tal og kreativ skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Koordinatlaesning (6\u20137-\u00e5rige finder positioner med raekke og kolonne)`, howWeAddress: `Skattekort-ark med enkle koordinater (A1\u2013E5), hvor eleverne finder og markerer positioner` },
      { milestone: `Flertrinsproblemer med penge/vaerdier (addition/subtraktion inden for 20)`, howWeAddress: `Guldmoentre-regneopgaver med skattekister, hvor eleverne loser to-trins-problemer med kontekst` },
      { milestone: `Kreativ narrativ skrivning (begyndelse, eventyr, slutning)`, howWeAddress: `Pirathistorie-skabeloner med strukturrammer og piratordforraad guider eventyrlig kreativ skrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug 3\u00d73-kort med billedsymboler, hold regning inden for 10, og tilbyd historiestartere med billedsekvenser. For avancerede elever i 1. klasse tilf\u00f8jes 5\u00d75-koordinater, flertrinsproblemer med tre operationer og selvstaendig pirathistorieskrivning med dialog og plottwist.`,
    parentTakeaway: `Lav en skattejagt derhjemme med et kort og koordinater: \u201dskatten er ved B3!\u201d Brug legemoenster som guldmoenster og l\u00f8s regnestykker. Lad barnet skrive en pirathistorie med tegninger. Brug kompasretninger p\u00e5 ture: \u201dvi g\u00e5r mod nord!\u201d Pirater er det mest motiverende tema for matematik og skrivning.`,
    classroomIntegration: `Pirattemaet i 1. klasse bruges som motiverende temauge: matematik med koordinater, guldmoent-regning og afstandsmaaling, dansk med pirathistorier og ordforraadsopbygning, idraet med skattejagt og kompasleg, og billedkunst med skattekort. F\u00e6lles M\u00e5ls m\u00e5l for rumlig orientering, tal og kreativ skrivning integreres i et engagerende eventyr.`,
    assessmentRubric: [
      { skill: `Koordinatl\u00e6sning (skattekort)`, emerging: `finder en position p\u00e5 et 3\u00d73-kort med st\u00f8tte`, proficient: `finder og markerer selvst\u00e6ndigt positioner p\u00e5 et 5\u00d75-koordinatkort korrekt`, advanced: `plottter ruter mellem koordinater, bruger kompasretninger og designer egne skattekort` },
      { skill: `Flertrinsproblemer (piratkontekst)`, emerging: `l\u00f8ser \u00e9t-trins-opgaver inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt to-trins-problemer inden for 20 med guldm\u00f8ntscenarier`, advanced: `l\u00f8ser tre-trins-problemer og formulerer egne skattejagtopgaver` },
      { skill: `Kreativ pirathistorie`, emerging: `skriver 2\u20133 s\u00e6tninger med billedst\u00f8tte og startere`, proficient: `skriver selvst\u00e6ndigt en kort pirathistorie med begyndelse, eventyr og slutning`, advanced: `skriver en detaljeret pirathistorie med dialog, sp\u00e6nding og overraskende slutning` },
    ],
  },

  robots: {
    snippetAnswer: `Robot-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner algoritmisk t\u00e6nkning med trinvise instruktioner, geometrisk formanalyse i robotdesign, og selvst\u00e6ndig skrivning af robotprogrammer. Kodning uden computer. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver robottemaet et kodnings- og logikprojekt \u2014 seks- og syv\u00e5rige kan skrive trinvise instruktioner (algoritmer) til en robot, debugge fejl i kommandosekvenser og bygge robotter af geometriske former med pr\u00e6cise m\u00e5l. Algoritmisk t\u00e6nkning med \u201dhvis\u2013s\u00e5\u201d-betingelser introducerer grundlaegende programmeringslogik. Geometrisk analyse af robotkroppe (cylinderhoved, rektangulaert bryst, cirkulaere hjul) forbinder former med funktioner. M\u00e5ling af robotdele med centimeter giver funktionel linealbrug. Skrivning af robotprogrammer med nummererede trin traener proceduretekst. F\u00e6lles M\u00e5ls m\u00e5l for logik, geometri og proceduretekst i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Algoritmisk t\u00e6nkning (6\u20137-\u00e5rige kan skrive og f\u00f8lge trinvise instruktioner)`, howWeAddress: `Robot-programmeringsark, hvor eleverne skriver 4\u20136 trinvise kommandoer og tester dem med en \u201dhuman robot\u201d` },
      { milestone: `Debugging (finde og rette fejl i en sekvens)`, howWeAddress: `Fejlfindingsark med forkerte robotprogrammer, hvor eleverne identificerer og retter logiske fejl` },
      { milestone: `Geometrisk formanalyse i design (3D-former i robotkroppe)`, howWeAddress: `Robotdesign-ark, hvor eleverne navngiver former i robotdele og tegner egne robotter med praecise former` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begraens til tre kommandoer (gaa, drej, stop), brug billedbaserede instruktioner, og byg robotter af kun 2D-former. For avancerede elever i 1. klasse tilf\u00f8jes hvis-saa-betingelser, seks-trins-algoritmer og selvstaendig robotdesign med 3D-former og maalsat tegning.`,
    parentTakeaway: `Leg \u201dhuman robot\u201d: barnet giver instruktioner, og du f\u00f8lger dem bogstaveligt (\u201dg\u00e5 3 skridt, drej til h\u00f8jre, g\u00e5 2 skridt\u201d). Find fejlen sammen: hvad sker der, hvis trin 2 og 3 er byttet om? Byg en robot af papkasser og navngiv formerne. Programmering starter med pr\u00e6cise instruktioner \u2014 ikke med en skaerm.`,
    classroomIntegration: `Robottemaet i 1. klasse forbinder matematik, dansk og teknologi: matematik med geometrisk analyse og maaling, dansk med proceduretekst og debugging-forklaringer, og teknologi med algoritmisk taenkning og unplugged kodning. En klasses robotdag med human robots integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for logik, geometri og proceduretekst underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Algoritmisk taenkning (robotprogrammer)`, emerging: `skriver 2\u20133 trinvise kommandoer med st\u00f8tte`, proficient: `skriver selvstaendigt 4\u20136 praecise kommandoer i logisk raekkefoelge`, advanced: `skriver algoritmer med betingelser (hvis-saa), debugger fejl og optimerer programmer` },
      { skill: `Geometrisk formanalyse (robotdesign)`, emerging: `navngiver 2\u20133 former i en robot med billedst\u00f8tte`, proficient: `identificerer selvstaendigt 2D- og 3D-former i robotdele og beskriver egenskaber`, advanced: `designer egne robotter med praecise former, maaler dele og skriver en formbeskrivelse` },
      { skill: `Proceduretekst (robotinstruktioner)`, emerging: `skriver 2\u20133 trin med billedst\u00f8tte og ordbank`, proficient: `skriver selvstaendigt 4\u20136 nummererede trin med praecise kommandoer`, advanced: `skriver komplette robotprogrammer med betingelser, fejlhaandtering og begrundelser` },
    ],
  },

  school: {
    snippetAnswer: `Skole-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner tidsforst\u00e5else med skoleskemaer, addition/subtraktion inden for 20 med klassevaerelsesscenarier, og selvst\u00e6ndig skrivning af skoledagsbeskrivelser. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r skoletemaet funktionel dybde \u2014 seks- og syv\u00e5rige kan laese og bruge et skoleskema med klokkeslaet, l\u00f8se regneproblemer med klassevaerelsesscenarier (24 elever, 6 g\u00e5r til idraet) og skrive strukturerede skoledagsbeskrivelser. Tidsforst\u00e5else med hele og halve timer giver funktionel klokkelaesning. Sortering af skolefag efter type (kreative, boglige, fysiske) udbygger klassifikation. Dataindsamling om klassens yndlingsfag giver s\u00f8jlediagrammer med reel kontekst. Skrivning af regler og skemabeskrivelser traener proceduretekst. F\u00e6lles M\u00e5ls m\u00e5l for tid, tal og skriftlig fremstilling i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Klokkeslaet (hele og halve timer) med funktionel kontekst`, howWeAddress: `Skoleskema-ark, hvor eleverne laes er klokkeslaet, beregner frikvarterets laengde og planlagger skoledag` },
      { milestone: `Kontekstualiseret regning med store grupper (klassestaerrelse)`, howWeAddress: `Klassevaerelsesmatematik med 20\u201328 elever, hvor eleverne l\u00f8ser flertrinsproblemer med grupper og hold` },
      { milestone: `Skoledagsbeskrivelse med kronologisk struktur`, howWeAddress: `Dagbeskrivelsesark med tidsangivelser og signalord guider struktureret skrivning om en skoledag` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, brug kun hele timer, hold regning inden for 10, og tilbyd s\u00e6tningsstartere med billedskema. For avancerede elever i 1. klasse tilf\u00f8jes halve og kvarte timer, flertrinsproblemer med ugeskemaer og selvst\u00e6ndig skrivning af skoledagbog med refleksion.`,
    parentTakeaway: `Brug skoleskemaet som hverdagsmatematik: \u201dhvorn\u00e5r starter matematik? Hvor lang er frikvarteret?\u201d Lav et hjemmeskema for weekenden. Lad barnet fort\u00e6lle om sin skoledag i kronologisk r\u00e6kkef\u00f8lge og skrive tre s\u00e6tninger. Spil \u201dskolelleg\u201d, hvor barnet er l\u00e6reren og giver regneopgaver.`,
    classroomIntegration: `Skoletemaet i 1. klasse er naturligt integreret: matematik med skemalaesning og klassestatistik, dansk med skoledagsbeskrivelser og regelskrivning, og klassens time med yndlingsfagsundersoegelser. Skemaet p\u00e5 vaeggen bliver et dagligt matematikvaerktoej. F\u00e6lles M\u00e5ls m\u00e5l for tid, data og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Klokkeslaet og skemalaesning`, emerging: `laes er hele timer med st\u00f8tte og finder et fag p\u00e5 skemaet`, proficient: `laes er selvstaendigt hele og halve timer og besvarer sp\u00f8rgsm\u00e5l om skemaet korrekt`, advanced: `beregner tidsintervaller, planlaegger aktiviteter og l\u00f8ser tidsproblemer med kvarte timer` },
      { skill: `Addition/subtraktion (klassevaerelseskontekst)`, emerging: `l\u00f8ser \u00e9t-trins-opgaver inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvstaendigt to-trins-problemer inden for 20 med klassegrupper`, advanced: `l\u00f8ser flertrinsproblemer med 20+ elever og formulerer egne klassevaerelsesopgaver` },
      { skill: `Skoledagsbeskrivelse (kronologisk)`, emerging: `skriver 1\u20132 saetninger om en skoledag med st\u00f8tte`, proficient: `skriver selvstaendigt en kronologisk skoledagsbeskrivelse med 3\u20134 saetninger og tidsangivelser`, advanced: `skriver en detaljeret skoledagbog med refleksion, yndlingsmoment og laeringsmaal` },
    ],
  },

  seasons: {
    snippetAnswer: `\u00c5rstids-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner dataindsamling med vejrobservationer, m\u00e5ling af temperatur og nedb\u00f8r, kalenderregning og selvst\u00e6ndig skrivning af \u00e5rstidsbeskrivelser med sanseord. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver \u00e5rstidstemaet et vejrforskningsprojekt \u2014 seks- og syv\u00e5rige kan aflase termometre, registrere daglige vejrdata i tabeller og s\u00f8jlediagrammer, og skrive \u00e5rstidsbeskrivelser med sensoriske detaljer. Longitudinel dataindsamling over uger giver forst\u00e5else af vejrm\u00f8nstre og \u00e5rstidsskift. Kalenderregning med m\u00e5neder og \u00e5rstider giver funktionel tidsforst\u00e5else. Sammenligning af \u00e5rstider (\u201dvinter er koldere end sommer\u201d) traener komparativ taenkning. Skrivning med sanseord (koldt, fugtigt, duftende) beriger sproget. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig unders\u00f8gelse, data, maaling og skriftlig beskrivelse i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Termometeraflasning (6\u20137-\u00e5rige kan aflase temperatur i hele grader)`, howWeAddress: `Vejrregistreringsark med termometerbilleder, hvor eleverne aflaeser og noterer daglig temperatur` },
      { milestone: `Longitudinel dataindsamling (vejrdata over tid med diagrammer)`, howWeAddress: `Vejrdagbog med ugeregistrering i tabeller og s\u00f8jlediagrammer giver forstaelse af datam\u00f8nstre` },
      { milestone: `Sansebeskrivelse af \u00e5rstider (brug af sanseord i skrivning)`, howWeAddress: `\u00c5rstidsbeskrivelsesark med sanse-rammer (se, h\u00f8re, f\u00f8le, lugte) guider rig, beskrivende skrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, brug forenklede termometre med store tal, registrer kun solskin/regn/sne, og tilbyd sanseord-ordbank. For avancerede elever i 1. klasse tilf\u00f8jes sammenligningsdiagrammer over to \u00e5rstider, gennemsnitsberegning af temperatur og selvstaendig skrivning af \u00e5rstidsrapporter med data og konklusion.`,
    parentTakeaway: `Start en vejrdagbog p\u00e5 k\u00f8leskabet: noter temperatur og vejrtype hver dag. Lav et s\u00f8jlediagram over regnvejrsdage vs. solskinsdage. G\u00e5 en sansetur: \u201dhvad lugter efteraaret af? Hvad f\u00f8les vinteren som?\u201d Skriv sammen: \u201ddet er 5 grader, det regner, bladene er r\u00f8de.\u201d \u00c5rstiderne er naturfag i realtid.`,
    classroomIntegration: `\u00c5rstidstemaet i 1. klasse k\u00f8rer som \u00e5rsprojekt: daglig vejrregistrering i matematik, maanedlige \u00e5rstidsbeskrivelser i dansk, naturforandringer i naturfag, og aarstidsbilleder i billedkunst. Klassens vejrstation bliver et permanent laeringsvaerktoej. F\u00e6lles M\u00e5ls m\u00e5l for data, maaling, naturfag og skrivning integreres naturligt.`,
    assessmentRubric: [
      { skill: `Temperaturaflaesning og vejrdata`, emerging: `aflaeser et forenklet termometer med stoette og registrerer vejrtype`, proficient: `aflaeser selvstaendigt temperatur i hele grader og registrerer data i tabel`, advanced: `sammenligner temperaturdata over tid, finder moenstre og drager konklusioner om aarstider` },
      { skill: `Datavisualisering (vejrdiagrammer)`, emerging: `udfylder et forhaandslavet soejlediagram med stoette`, proficient: `opretter selvstaendigt soejlediagrammer med vejrdata og besvar sammenligningssp\u00f8rgsm\u00e5l`, advanced: `analyserer data fra flere uger, beregner forskelle og praesenterer resultater` },
      { skill: `\u00c5rstidsbeskrivelse med sanseord`, emerging: `skriver 1\u20132 saetninger med sanseord fra ordbank`, proficient: `skriver selvstaendigt 3\u20134 beskrivende saetninger med sanseord for syn, lyd og foelelse`, advanced: `skriver en sammenhaengende aarstidsbeskrivelse med alle sanser, sammenligning og personlig refleksion` },
    ],
  },

  shapes: {
    snippetAnswer: `Form-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner geometrisk analyse med sider og hj\u00f8rner, symmetri, m\u00e5ling af former med lineal og selvst\u00e6ndig skrivning af formbeskrivelser med geometriske fagtermer. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse g\u00e5r formtemaet fra genkendelse til analyse \u2014 seks- og syv\u00e5rige kan taelle sider og hj\u00f8rner, sammenligne former efter egenskaber, finde og producere symmetriske figurer og maale formers sider med lineal i centimeter. Formklassifikation med tre kriterier (antal sider, hjorner, lige/buede sider) udbygger logisk taenkning. Sammensatte former (hus = trekant + firkant) introducerer geometrisk komposition. 3D-former (kube, kugle, cylinder) forbindes med virkeligheder genstande. Skrivning af formbeskrivelser med fagtermer traener praecis fagkommunikation. F\u00e6lles M\u00e5ls m\u00e5l for geometri, maaling og fagligt sprog i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Geometrisk analyse (6\u20137-\u00e5rige taeller sider og hjorner og sammenligner)`, howWeAddress: `Form-analyse-ark, hvor eleverne taeller sider/hjorner, navngiver former og sorterer efter egenskaber` },
      { milestone: `Symmetri (genkendelse og produktion af symmetriske figurer)`, howWeAddress: `Symmetri-ark med halvfaerdige figurer, hvor eleverne tegner den manglende halvdel praecist med lineal` },
      { milestone: `Sammensatte former (kombinere grundformer til nye figurer)`, howWeAddress: `Formkompositionsark, hvor eleverne bygger huse, b\u00e5de og dyr af grundformer og navngiver delene` },
      { milestone: `3D-formerkendselse (kube, kugle, cylinder, kegle i virkeligheden)`, howWeAddress: `3D-form-jagt-ark, hvor eleverne matcher 3D-former med hverdagsgenstande (bold = kugle, dase = cylinder)` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begraens til fire 2D-former, brug store linjer ved symmetri, og tilbyd formnavne-ordbank. For avancerede elever i 1. klasse tilf\u00f8jes 3D-former med flader og kanter, maaling af alle sider med millimeter og selvstaendig skrivning af geometriske forklaringer.`,
    parentTakeaway: `G\u00e5 p\u00e5 formjagt derhjemme: \u201dhvor mange trekanter kan du finde? Hvor mange hj\u00f8rner har d\u00f8ren?\u201d Fold papir p\u00e5 midten og klip symmetriske figurer. M\u00e5l formers sider med lineal. Byg med klodser og navngiv 3D-formerne. Geometri er overalt \u2014 hjemmet er det bedste geometrilaboratorium.`,
    classroomIntegration: `Formtemaet i 1. klasse er kernen i geometriundervisningen: systematisk formanalyse med sider og hjorner, symmetriprojekt med klip og foldning, formjagt i skolens bygninger, og formbeskrivelser i dansk. Et formmuseum, hvor eleverne udstiller fundne former med etiketter, integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for geometri, maaling og fagsprog underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Geometrisk formanalyse (sider/hj\u00f8rner)`, emerging: `navngiver firkant og trekant med billedst\u00f8tte`, proficient: `taeller selvstaendigt sider og hjorner, navngiver 5+ former og beskriver egenskaber`, advanced: `sammenligner former, forklarer forskelle og klassificerer efter flere kriterier samtidig` },
      { skill: `Symmetri (genkendelse og produktion)`, emerging: `genkender symmetri i enkle figurer med stoette`, proficient: `tegner selvstaendigt den manglende halvdel af symmetriske figurer praecist`, advanced: `finder flere symmetriakser, designer egne symmetriske figurer og forklarer symmetribegrebet` },
      { skill: `Formbeskrivelse med fagtermer`, emerging: `navngiver en form og angiver antal sider med ordbank`, proficient: `skriver selvstaendigt 3\u20134 saetninger med geometriske fagtermer (side, hjorne, symmetrisk)`, advanced: `skriver sammenhaengende formbeskrivelser med sammenligning, 3D-termer og praecise maal` },
    ],
  },

  space: {
    snippetAnswer: `Rum-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner store tal med planetafstande, sortering af planeter efter egenskaber, m\u00e5ling med centimeter og selvst\u00e6ndig skrivning af planetfakta. Universet udvider talforst\u00e5elsen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r rumtemaet matematisk og videnskabelig dybde \u2014 seks- og syv\u00e5rige kan ordne planeter efter storrelse og afstand, arbejde med store tal i kontekst (Jorden er planet nr. 3, Solen er en stjerne) og skrive planetfakta med egne ord. Raekkefolgeordning af planeter traener ordinal taenkning og tallinjeforstaelse. Sortering efter flere kriterier (storrelse, temperatur, ringe/ingen ringe) udbygger klassifikation. Maaling af planetmodeller med centimeter giver funktionel linealbrug. Skrivning af planetfakta med fagord traener faglitteraer skrivning. Tidsforstaelse med dag/nat og aar/maaned forbindes med Jordens rotation. F\u00e6lles M\u00e5ls m\u00e5l for tal, maaling og skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Ordinal taenkning og raekkefolge (6\u20137-\u00e5rige ordner elementer efter storrelse og position)`, howWeAddress: `Planetraekkefoolge-ark, hvor eleverne ordner planeter fra Solen og bruger ordinale tal (1., 2., 3.)` },
      { milestone: `Klassifikation med videnskabelige kriterier (storrelse, temperatur, type)`, howWeAddress: `Planetsorteringsark med Venn-diagrammer, hvor eleverne klassificerer efter flere kriterier` },
      { milestone: `Faglitteraer skrivning med rumfagord (planet, stjerne, kredsloeb)`, howWeAddress: `Planetfakta-ark med rammer for navn, storrelse, afstand og saerlige egenskaber guider praecis fagskrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, begraens til fire planeter (Merkur, Venus, Jorden, Mars), brug billedbaseret sortering og tilbyd saetningsstartere med ordbank. For avancerede elever i 1. klasse tilf\u00f8jes alle otte planeter, sammenlignende planetessays og selvstaendig skrivning af rumforskningsrapporter med data.`,
    parentTakeaway: `Lav en planetraekke i stuen med frugter i forskellige storrelser (ært = Merkur, melon = Jupiter). M\u00e5l afstande mellem planeterne med skridt. Laes rumbooger og stil fakta-spoergsm\u00e5l: \u201dhvilken planet er stoerst? Hvad er den naermeste planet til Solen?\u201d Skriv tre fakta om Mars. Rummet goer store tal begribelige.`,
    classroomIntegration: `Rumtemaet i 1. klasse bruges som naturfagligt tvaerfagligt projekt: matematik med planetraekkefolge, stoerrelse og maaling, dansk med planetfakta og rumhistorier, naturfag med Solsystemet og dag/nat, og billedkunst med rumlandskaber. Et klassesolsystem p\u00e5 vaeggen med fakta integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for tal, maaling, naturfag og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Planetraekkefoelge og ordinal taenkning`, emerging: `navngiver 2\u20133 planeter og placerer dem med billedstoette`, proficient: `ordner selvstaendigt 6+ planeter efter afstand fra Solen med korrekte ordinale tal`, advanced: `forklarer planetraekkefoelgen, sammenligner afstande og loser ordinalproblemer` },
      { skill: `Klassifikation (planetegenskaber)`, emerging: `sorterer planeter i to grupper efter stoerrelse med stoette`, proficient: `klassificerer selvstaendigt efter 2\u20133 kriterier med fagtermer og forklarer valg`, advanced: `bruger Venn-diagrammer, haandterer graensetilfaelde og begrunder med videnskabelige fakta` },
      { skill: `Planetfakta-skrivning`, emerging: `skriver 1\u20132 faktasaetninger med ordbank og stoette`, proficient: `skriver selvstaendigt 3\u20134 faktasaetninger med rumfagord om en planet`, advanced: `skriver en sammenhaengende planetrapport med sammenligning af to planeter og data` },
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
