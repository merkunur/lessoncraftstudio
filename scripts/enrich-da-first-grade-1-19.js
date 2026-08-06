#!/usr/bin/env node
/**
 * SEO Part 226: DA First-Grade Grade Enrichment — Themes 1-19
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the first-grade grade block of 19 DA theme files (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    snippetAnswer: `Alfabet-arbejdsark til 1. klasse (6\u20137 \u00e5r) styrker l\u00e6seflydende, ordafkodning og selvst\u00e6ndig skrivning af ord og korte s\u00e6tninger med alle 29 danske bogstaver som v\u00e6rkt\u00f8j. Ordforvirring, krydsord og ordgaetter udfordrer eleverne. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse skifter alfabetet rolle fra noget b\u00f8rn l\u00e6rer til noget b\u00f8rn bruger \u2014 seks- og syv\u00e5rige har automatisk bogstavgenkendelse og anvender nu lyd-bogstav-viden til at afkode ukendte ord, stave selvst\u00e6ndigt og skrive korte s\u00e6tninger. Ordforvirringer kr\u00e6ver mental manipulation af bogstavpositioner, billedkrydsord kr\u00e6ver flertrins fonemisk analyse, og ordg\u00e6tteaktiviteter opbygger slutningsf\u00e6rdigheder. Alfabetisk r\u00e6kkef\u00f8lge bruges funktionelt til at organisere ordlister og sl\u00e5 op i enkle ordb\u00f8ger. F\u00e6lles M\u00e5ls m\u00e5l for l\u00e6sning og skrivning i 1. klasse kr\u00e6ver netop denne overgang fra genkendelse til aktiv anvendelse.`,
    developmentalMilestones: [
      { milestone: `Selvst\u00e6ndig ordafkodning (6\u20137-\u00e5rige blander bogstavlyde til ord uden voksenst\u00f8tte)`, howWeAddress: `Ordforvirringer og ordg\u00e6tteark kr\u00e6ver aktiv afkodning og stavning, hvilket tr\u00e6ner den selvst\u00e6ndige lydblanding` },
      { milestone: `Flydende bogstavskrivning (overgang fra bevidst formning til automatisk produktion)`, howWeAddress: `Skriveark med ord og korte s\u00e6tninger p\u00e5 linjeret papir fremmer automatisk bogstavproduktion i kontekst` },
      { milestone: `Alfabetisk ordning som v\u00e6rkt\u00f8j (brug af r\u00e6kkef\u00f8lge til at organisere og finde information)`, howWeAddress: `Alfabettog-aktiviteter med ordlister og simpel ordbogsbrug g\u00f8r alfabetisk r\u00e6kkef\u00f8lge funktionel` },
      { milestone: `Fonemisk analyse p\u00e5 ordniveau (segmentering af hele ord i enkeltlyde)`, howWeAddress: `Billedkrydsord kr\u00e6ver fonem-for-fonem-analyse og styrker den pr\u00e6cise lydanalyse, der driver stavning` },
    ],
    differentiationNotes: `For elever der stadig afkoder langsomt, tilbyd ordbanker som st\u00f8tte, begr\u00e6ns til trebogstavsord og par arbejdsark med lydret l\u00e6sning. For avancerede l\u00e6sere i 1. klasse udfordres med krydsord uden ordbanker, flerstavel sesord i ordforvirringer og selvst\u00e6ndig brug af ordbog til at verificere stavning.`,
    parentTakeaway: `I 1. klasse skal bogstaverne arbejde \u2014 ikke bare genkendes. L\u00e6s sammen dagligt og lad barnet lydere nye ord selv. Spil ordforvirring med magnetbogstaver p\u00e5 k\u00f8leskabet. Lad barnet skrive indkobslister og korte beskeder. Hver gang barnet bruger bogstaver til et reelt form\u00e5l, styrkes overgangen fra genkendelse til anvendelse.`,
    classroomIntegration: `Alfabetarbejdsark i 1. klasse fungerer som v\u00e6rkt\u00f8j p\u00e5 tv\u00e6rs af fag: ordforvirringer introducerer n\u00f8gleord f\u00f8r en naturfagslektion, krydsord forstaarker ugens staveord, og ordgaetteark bruges som morgenopvarmning. Alfabetisk ordning integreres i bibliotekstimen. F\u00e6lles M\u00e5ls m\u00e5l for afkodning, stavning og skriftlig kommunikation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Ordafkodning og lydblanding`, emerging: `afkoder trebogstavsord langsomt med lyd-for-lyd-blanding`, proficient: `afkoder selvst\u00e6ndigt ord p\u00e5 4\u20136 bogstaver med sikker lydblanding`, advanced: `afkoder flerstavelesord og ukendte ord ved hj\u00e6lp af stavelsesdeling og kontekst` },
      { skill: `Selvst\u00e6ndig stavning`, emerging: `staver fonetisk med manglende bogstaver (hus \u2192 hs)`, proficient: `staver lydrette ord korrekt og h\u00f8jfrekvente uregelmassige ord fra hukommelsen`, advanced: `staver korrekt i frie tekster og anvender stavestrategier ved ukendte ord` },
      { skill: `Alfabetisk ordning og opslag`, emerging: `ordner ord efter f\u00f8rstebogstav med st\u00f8tte`, proficient: `ordner selvst\u00e6ndigt ord alfabetisk og finder ord i en simpel ordliste`, advanced: `ordner efter andet og tredje bogstav og bruger ordbog selvst\u00e6ndigt` },
    ],
  },

  animals: {
    snippetAnswer: `Dyre-arbejdsark til 1. klasse (6\u20137 \u00e5r) kombinerer addition og subtraktion inden for 20, dyrefakta-l\u00e6sning og selvst\u00e6ndig skrivning af dyrebeskrivelser. Klassifikation udvides til f\u00f8dek\u00e6der og levesteder. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse g\u00e5r dyretemaet fra observation til systematisk viden \u2014 seks- og syv\u00e5rige kan l\u00e6se enkle dyrefakta, skrive dyrebeskrivelser og forst\u00e5 f\u00f8dek\u00e6der som logiske sekvenser. Klassifikation udvides til tre eller flere kriterier samtidig (levested, f\u00f8de, kropsd\u00e6kke), og data om dyr indsamles med streg- og s\u00f8jlediagrammer. Addition og subtraktion inden for 20 med dyrescener giver flertrinsproblemer med kontekst. Sammenlignende m\u00e5ling (hvilken er l\u00e6ngst?) introducerer standardenheder. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik, matematik og dansk i 1. klasse underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Flertrinskategorisering (6\u20137-\u00e5rige sorterer efter tre kriterier samtidig)`, howWeAddress: `Venn-diagrammer og treklassifikationsark med dyr opbygger avanceret logisk t\u00e6nkning` },
      { milestone: `Addition og subtraktion inden for 20 (udvidet talomr\u00e5de med tierovergang)`, howWeAddress: `Dyrescener med talproblemer inden for 20, inkl. tierovergang, giver kontekstualiseret regning` },
      { milestone: `Informationslaesning (l\u00e6sning af korte faktatekster)`, howWeAddress: `Dyrefakta-kort med 3\u20134 saetninger og forst\u00e5elsessp\u00f8rgsm\u00e5l traener informationsl\u00e6sning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns til velkendte dyr og addition inden for 10 med billedst\u00f8tte. Brug talknopper til tierovergang. For avancerede elever i 1. klasse tilf\u00f8jes flertrinsopgaver med tre dyregrupper, selvst\u00e6ndig skrivning af dyrefaktaark og introduktion af simple diagrammer over dyredata.`,
    parentTakeaway: `L\u00e6s dyreb\u00f8ger sammen og stil faktasp\u00f8rgsm\u00e5l: hvad spiser den, hvor bor den, hvem spiser den? Lad barnet skrive tre fakta om sit yndlingsdyr. Bes\u00f8g zoo og t\u00e6l dyr i grupper af ti. Opret en hjemme-dyrebog, hvor barnet tegner og skriver om \u00e9t nyt dyr hver uge.`,
    classroomIntegration: `Dyrearbejdsark i 1. klasse integreres i naturfagsundervisningen som forskningsv\u00e6rkt\u00f8j: eleverne l\u00e6ser dyrefakta, udfylder klassifikationsark, l\u00f8ser matematikproblemer med dyredata og skriver dyrebeskrivelser. Et klassedyreatlas bygges op over \u00e5ret. F\u00e6lles M\u00e5ls m\u00e5l for natur, matematik og skriftlig fremstilling underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Dyreklassifikation med flere kriterier`, emerging: `sorterer dyr i to grupper efter \u00e9n egenskab med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter tre kriterier og forklarer valget mundtligt`, advanced: `opretter egne klassifikationssystemer og bruger fagtermer som pattedyr, kr\u00e6bdyr, insekt` },
      { skill: `Addition/subtraktion inden for 20 (dyrekontekst)`, emerging: `l\u00f8ser opgaver inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 20 inkl. tierovergang med dyrescener`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne tekstopgaver med dyredata` },
      { skill: `Informationsl\u00e6sning om dyr`, emerging: `l\u00e6ser 1\u20132 faktas\u00e6tninger med st\u00f8tte og besvarer sp\u00f8rgsm\u00e5l mundtligt`, proficient: `l\u00e6ser selvst\u00e6ndigt 3\u20134 faktas\u00e6tninger og besvarer forst\u00e5elsessp\u00f8rgsm\u00e5l skriftligt`, advanced: `l\u00e6ser l\u00e6ngere faktatekster, sammenligner dyrearter og skriver egne dyrebeskrivelser` },
    ],
  },

  birds: {
    snippetAnswer: `Fugle-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner dataindsamling med stregdiagrammer, addition/subtraktion inden for 20 og selvst\u00e6ndig skrivning af fuglefakta. Systematisk observation og registrering st\u00e5r centralt. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver fugletemaet et videnskabeligt projekt \u2014 seks- og syv\u00e5rige kan gennemf\u00f8re systematiske fuglet\u00e6llinger, registrere data i stregdiagrammer og bruge resultaterne til addition og sammenligning. Denne dataanvendelse er et kvantespring fra b\u00f8rnehaveklassens simple t\u00e6lling. Fuglefakta l\u00e6ses selvst\u00e6ndigt i korte tekster, og eleverne skriver egne observationsrapporter. Klassifikation udvides til tr\u00e6kfugle vs. standfugle, rovfugle vs. sangfugle. M\u00e5ling af fuglereder og vingefang introducerer centimeter. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig unders\u00f8gelse, data og skriftlig rapportering i 1. klasse underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Dataindsamling og -registrering (6\u20137-\u00e5rige kan f\u00f8re streg- og s\u00f8jlediagrammer)`, howWeAddress: `Fuglet\u00e6llings-ark med stregdiagrammer, hvor eleverne registrerer observationer og l\u00e6ser resultatet` },
      { milestone: `Sammenligning og fortolkning af data (mere end, f\u00e6rre end, flest)`, howWeAddress: `Sp\u00f8rgsm\u00e5l til fuglet\u00e6llingsdata (hvilken fugl s\u00e5 vi flest af?) tr\u00e6ner matematisk r\u00e6sonnement` },
      { milestone: `Informationsskrivning (korte faktarapporter med egne ord)`, howWeAddress: `Fuglefakta-skriveskabeloner med ramme for navn, udseende, f\u00f8de og levested guider selvst\u00e6ndig faglitteraer skrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns til tre velkendte fugle, brug forh\u00e5ndsudfyldte diagrammer med kun f\u00e5 manglende data, og tilbyd s\u00e6tningsstartere til skrivning. For avancerede elever i 1. klasse tilf\u00f8jes klassifikation af fuglegrupper, vingefangsm\u00e5ling i centimeter og selvst\u00e6ndig skrivning af fugleforskningsrapporter.`,
    parentTakeaway: `Fuglet\u00e6llinger er gratis matematik og naturfag. S\u00e6t et foderbr\u00e6t op og f\u00f8r en ugentlig t\u00e6lleliste: hvor mange musvitter, solsorte, duer? Lav et s\u00f8jlediagram p\u00e5 k\u00f8leskabet. Lad barnet skrive tre fakta om ugens fugl. Denne systematiske observation bygger forskningsf\u00e6rdigheder fra f\u00f8rste klasse.`,
    classroomIntegration: `Fugletemaet i 1. klasse k\u00f8rer som \u00e5rsprojekt: m\u00e5nedlige fuglet\u00e6llinger med registrering i klassens s\u00f8jlediagram, matematiktimen bruger data til addition og sammenligning, dansktimen skriver fuglefakta, og naturfagstimen klassificerer arter. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig unders\u00f8gelse, data og skrivning integreres.`,
    assessmentRubric: [
      { skill: `Dataindsamling og diagrammer (fuglekontekst)`, emerging: `registrerer data i et forh\u00e5ndslavet stregdiagram med st\u00f8tte`, proficient: `udfylder selvst\u00e6ndigt et stregdiagram og l\u00e6ser resultatet korrekt`, advanced: `opretter egne diagrammer, sammenligner data og drager konklusioner` },
      { skill: `Addition/subtraktion med fugledata`, emerging: `l\u00f8ser additions-opgaver inden for 10 med billedst\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 20 med fuglet\u00e6llingsdata`, advanced: `l\u00f8ser flertrinsproblemer med data fra egne fuglet\u00e6llinger` },
      { skill: `Fuglefakta-skrivning`, emerging: `skriver 1\u20132 s\u00e6tninger med st\u00f8tte fra s\u00e6tningsstartere`, proficient: `skriver selvst\u00e6ndigt 3\u20134 faktas\u00e6tninger om en fugl med korrekt stavning af n\u00f8gleord`, advanced: `skriver en sammenh\u00e6ngende faktarapport med indledning, fakta og afslutning` },
    ],
  },

  birthday: {
    snippetAnswer: `F\u00f8dselsdag-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner addition/subtraktion inden for 20, titalssystemet med f\u00f8dselsdagslys, og selvst\u00e6ndig skrivning af invitationer og festbeskrivelser. Tal f\u00e5r praktisk betydning. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r f\u00f8dselsdagstemaet matematisk dybde \u2014 seks- og syv\u00e5rige forst\u00e5r titalssystemet og kan bruge f\u00f8dselsdagslys til at illustrere positionsvaerdi (en kage med 7 lys = 7 enere, to kager med 10 lys = 2 tiere). Addition og subtraktion inden for 20 med g\u00e6ster, gaver og slikposer giver flertrinsproblemer med reel kontekst. Skrivning af invitationer og festbeskrivelser kr\u00e6ver korte afsavit med dato, sted og detaljer. M\u00e5ling af tid (\u201dfesten starter kl. 14\u201d) og penge (\u201dgaven koster 50 kr.\u201d) introduceres naturligt. F\u00e6lles M\u00e5ls m\u00e5l for tal, m\u00e5ling og skriftlig kommunikation i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Positionsv\u00e6rdi (6\u20137-\u00e5rige begynder at forst\u00e5 enere og tiere)`, howWeAddress: `F\u00f8dselsdagslys grupperet i tiere og enere (13 lys = 1 tier + 3 enere) giver konkret positionsvaerdi` },
      { milestone: `Flertrinsproblemer (to regnestykker i \u00e9n opgave)`, howWeAddress: `Festscenarier som \u201d8 g\u00e6ster kommer, 3 g\u00e5r, 5 nye ankommer \u2014 hvor mange nu?\u201d tr\u00e6ner sekventiel beregning` },
      { milestone: `Funktionel skrivning med struktur (invitation med dato, sted, tid)`, howWeAddress: `Invitationsskabeloner med felter for alle n\u00f8dvendige informationer l\u00e6rer struktureret, form\u00e5lsbestemt skrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold regning inden for 10 med billedst\u00f8tte, brug talknopper til tierovergang, og tilbyd udfyldte invitationsskabeloner. For avancerede elever i 1. klasse tilf\u00f8jes flertrinsproblemer med tre regneoperationer, pengeberegning og selvst\u00e6ndig skrivning af festbeskrivelser med flere afsnit.`,
    parentTakeaway: `Brug barnets f\u00f8dselsdag som et storstilet matematikprojekt: skriv invitationer med dato og klokkeslet, budgett\u00e9r gaver (50 kr. + 30 kr.), t\u00e6l g\u00e6ster og portioner, og del kagen ligeligt. Lad barnet skrive en festbeskrivelse bagefter \u2014 funktionel skrivning p\u00e5 sit bedste.`,
    classroomIntegration: `F\u00f8dselsdagstemaet i 1. klasse bruges til at tr\u00e6ne positionsv\u00e6rdi med lys, skrive invitationer i dansktimen, og l\u00f8se festmatematik med flertrinsproblemer. Klassens f\u00f8dselsdagskalender giver anledning til m\u00e5nedstal, aldersberegning og tidslinjer. F\u00e6lles M\u00e5ls m\u00e5l for matematik, skrivning og social kompetence underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Positionsv\u00e6rdi (tiere og enere)`, emerging: `t\u00e6ller lys \u00e9t ad gangen op til 20 uden gruppering`, proficient: `grupperer selvst\u00e6ndigt lys i tiere og enere og angiver tallet korrekt`, advanced: `forklarer positionsv\u00e6rdi med egne ord og anvender det p\u00e5 nye tal` },
      { skill: `Flertrinsproblemer (festkontekst)`, emerging: `l\u00f8ser \u00e9t-trins-opgaver inden for 10 med st\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt to-trins-problemer inden for 20 med festscenarier`, advanced: `l\u00f8ser tre-trins-problemer og formulerer egne flertrinsopgaver` },
      { skill: `Funktionel skrivning (invitationer)`, emerging: `udfylder en invitation med st\u00f8tte fra skabelon og voksen`, proficient: `skriver selvst\u00e6ndigt en komplet invitation med dato, tid, sted og navn`, advanced: `skriver invitationer og festbeskrivelser med flere s\u00e6tninger og korrekt tegns\u00e6tning` },
    ],
  },

  body: {
    snippetAnswer: `Krop-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner m\u00e5ling i centimeter, kroppens organer, sundhedsregler og selvst\u00e6ndig skrivning af kropsfakta. Tallene bruges til h\u00f8jde, v\u00e6gt og puls. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse udvides kropstemaet til videnskabelig forst\u00e5else \u2014 seks- og syv\u00e5rige l\u00e6rer om organer (hjerte, lunger, hjerne), m\u00e5ler kroppen med centimeter og forst\u00e5r sundhedsregler med begrundelse. M\u00e5ling af h\u00f8jde, armfavnsh\u00e5ndsbredde og fodl\u00e6ngde giver virkelig brug af linealen. Addition med kropstal (10 fingre + 10 t\u00e6er = 20) st\u00f8tter positionsv\u00e6rdi. Puls f\u00f8r og efter bev\u00e6gelse introducerer dataindsamling. Skrivning af kropsfakta med egne ord tr\u00e6ner faglitter\u00e6r skrivning. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, m\u00e5ling og naturfag i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `M\u00e5ling med standardenheder (6\u20137-\u00e5rige begynder at bruge lineal og centimeter)`, howWeAddress: `Kropsm\u00e5lingsark, hvor eleverne m\u00e5ler h\u00e5nd, fod og arm i centimeter, giver autentisk linealbrug` },
      { milestone: `Grundl\u00e6ggende organforst\u00e5else (hjerte, lunger, hjerne og deres funktioner)`, howWeAddress: `Organ-matchningsark og -diagrammer forbinder organer med funktioner i en simpel kropsmodel` },
      { milestone: `Dataindsamling om kroppen (puls, h\u00f8jde, fodl\u00e6ngde)`, howWeAddress: `M\u00e5le- og registreringsark, hvor eleverne m\u00e5ler og sammenligner kropsdata i tabeller` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns til tre organer (hjerte, lunger, hjerne), brug hele centimeter uden millimeter, og tilbyd s\u00e6tningsstartere til skrivning. For avancerede elever i 1. klasse tilf\u00f8jes skelettets knogler, pulsm\u00e5ling med diagrammer og sammenlignende analyse af kropsdata.`,
    parentTakeaway: `M\u00e5l barnets h\u00f8jde med en lineal og skriv det ned \u2014 gentag hver m\u00e5ned og sammenlign. F\u00f8l pulsen f\u00f8r og efter leg og t\u00e6l slag. Tal om, hvad hjertet og lungerne laver. Brug badet til at navngive kropsdele p\u00e5 dansk. M\u00e5ling af kroppen er den mest personlige matematiklektion.`,
    classroomIntegration: `Kropstemaet i 1. klasse integreres i sundhedsundervisning og matematik: m\u00e5leuge med linealer og kropsm\u00e5lingsark, naturfagslektion om organer med diagrammer, idraetstime med pulsdataindsamling, og dansktime med skrivning af kropsfakta. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, sundhed og naturfag m\u00f8des.`,
    assessmentRubric: [
      { skill: `M\u00e5ling med lineal (centimeter)`, emerging: `m\u00e5ler med st\u00f8tte og aflaeser hele centimeter med hj\u00e6lp`, proficient: `m\u00e5ler selvst\u00e6ndigt i hele centimeter og noterer resultatet korrekt`, advanced: `m\u00e5ler praecist, sammenligner m\u00e5l og besvarer sp\u00f8rgsm\u00e5l som \u201dhvor meget laengere?\u201d` },
      { skill: `Organforst\u00e5else`, emerging: `navngiver hjerte og lunger med billedst\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 3\u20134 organer og beskriver deres funktion`, advanced: `forklarer, hvordan organer arbejder sammen og relaterer sundhedsvalg til organfunktion` },
      { skill: `Kropsdata og sammenligning`, emerging: `registrerer \u00e9t m\u00e5l i en tabel med st\u00f8tte`, proficient: `registrerer selvst\u00e6ndigt flere m\u00e5l og sammenligner (laengere/kortere)`, advanced: `analyserer kropsdata, finder m\u00f8nstre og formulerer sp\u00f8rgsm\u00e5l baseret p\u00e5 data` },
    ],
  },

  camping: {
    snippetAnswer: `Camping-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner kortlaesning, m\u00e5ling i meter og centimeter, flertrinsproblemer med campingudstyr og selvst\u00e6ndig skrivning af campingdagbog. Udend\u00f8rslaering i praksis. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver campingtemaet et tv\u00e6rfagligt projekt \u2014 seks- og syv\u00e5rige kan l\u00e6se enkle kort med symboler, m\u00e5le afstande med skridt og meter, og l\u00f8se flertrinsproblemer med campingudstyr. Pakkelistematematik kr\u00e6ver addition af genstande i kategorier og sammenligning af m\u00e6ngder. Kortlaesning med kompasretninger (nord, syd, \u00f8st, vest) introducerer rumlig orientering. Campingdagbog med kronologisk opbygning (f\u00f8rst, s\u00e5, til sidst) tr\u00e6ner struktureret skrivning. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, rumlig orientering og skriftlig fremstilling i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Kortl\u00e6sning med symboler (6\u20137-\u00e5rige kan tolke enkle kortsymboler og f\u00f8lge en rute)`, howWeAddress: `Campingkort med symboler (telt, b\u00e5l, s\u00f8, sti) og ruter tr\u00e6ner rumlig t\u00e6nkning og symbolforst\u00e5else` },
      { milestone: `M\u00e5ling med skridt og meter (begyndende l\u00e6ngdem\u00e5ling)`, howWeAddress: `Afstandsm\u00e5ling p\u00e5 campingpladsen med skridt og meter giver funktionel m\u00e5ling udend\u00f8rs` },
      { milestone: `Kronologisk skrivning (f\u00f8rst\u2013s\u00e5\u2013til sidst)`, howWeAddress: `Campingdagbog-skabeloner med kronologiske signalord guider struktureret selvst\u00e6ndig skrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, forenkles kort til tre symboler, m\u00e5ling holdes i hele skridt, og dagbogsskrivning f\u00e5r s\u00e6tningsstartere. For avancerede elever i 1. klasse tilf\u00f8jes kompasretninger, m\u00e5ling i meter og centimeter, og fri dagbogsskrivning med flere afsnit.`,
    parentTakeaway: `Tag p\u00e5 camp i haven og lav et kort over omr\u00e5det. M\u00e5l afstande i skridt: \u201d12 skridt fra teltet til b\u00e5let.\u201d Pak rygsaekken og t\u00e6l genstande i kategorier. Skriv en campingdagbog sammen bagefter. Udend\u00f8rsoplevelser er den bedste ramme for matematik og skrivning i 1. klasse.`,
    classroomIntegration: `Campingtemaet i 1. klasse bruges som udeskole-ramme: matematik med m\u00e5ling og pakkelisteproblemer, dansk med campingdagbog og kortl\u00e6sning, naturfag med naturobservation og plante-/dyregenkendelse. Et klassecamp-projekt afslutter foraarstemaet. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, orientering og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Kortl\u00e6sning og orientering`, emerging: `f\u00f8lger en enkel rute p\u00e5 et kort med st\u00f8tte`, proficient: `l\u00e6ser selvst\u00e6ndigt et kort med 4\u20135 symboler og f\u00f8lger en rute korrekt`, advanced: `tegner eget kort med symbolforklaring og bruger kompasretninger` },
      { skill: `M\u00e5ling af afstande`, emerging: `m\u00e5ler med skridt med voksenst\u00f8tte og t\u00e6ller til 10`, proficient: `m\u00e5ler selvst\u00e6ndigt i skridt og meter og noterer resultatet`, advanced: `m\u00e5ler i meter og centimeter, sammenligner afstande og l\u00f8ser m\u00e5leproblemer` },
      { skill: `Kronologisk dagbogsskrivning`, emerging: `skriver 1\u20132 s\u00e6tninger med s\u00e6tningsstartere (F\u00f8rst...)`, proficient: `skriver selvst\u00e6ndigt 3\u20134 s\u00e6tninger i kronologisk r\u00e6kkef\u00f8lge med signalord`, advanced: `skriver en sammenh\u00e6ngende dagbogsentry med indledning, handling og afslutning` },
    ],
  },

  circus: {
    snippetAnswer: `Cirkus-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner avancerede m\u00f8nstre, addition/subtraktion inden for 20, symmetri med cirkusmotiver og kreativ skrivning af cirkushistorier. Showets drama driver l\u00e6ringen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver cirkustemaet et avanceret m\u00f8nster- og matematikv\u00e6rksted \u2014 seks- og syv\u00e5rige kan forl\u00e6nge og skabe komplekse m\u00f8nstre (AABB, ABBC, egne regler), l\u00f8se flertrinsproblemer med akrobatgrupper og forst\u00e5 symmetri i klovnekostumer og cirkustelte. Addition og subtraktion inden for 20 med cirkusscener giver kontekstualiseret regning med tierovergang. Kreativ skrivning af cirkushistorier kr\u00e6ver narrativ struktur med begyndelse, handling og slutning. Cirkusordforr\u00e5d som akrobatik, trapez og jonglering udvider ordforr\u00e5det. F\u00e6lles M\u00e5ls m\u00e5l for m\u00f8nstre, tal og kreativ skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Komplekse m\u00f8nstre og regelformulering (6\u20137-\u00e5rige kan skabe egne m\u00f8nstre og forklare reglen)`, howWeAddress: `M\u00f8nsterdesign-ark med cirkuselementer, hvor eleverne laver og formulerer egne m\u00f8nsterregler` },
      { milestone: `Symmetri (genkendelse og produktion af symmetriske figurer)`, howWeAddress: `Klovneansigt- og cirkustelt-symmetriark, hvor eleverne tegner den manglende halvdel pr\u00e6cist` },
      { milestone: `Kreativ fort\u00e6lling med narrativ struktur (begyndelse, midte, slutning)`, howWeAddress: `Cirkushistorie-skabeloner med plads til illustration og tekst guider struktureret kreativ skrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, brug AB- og ABB-m\u00f8nstre med tydelige farver, hold regning inden for 10, og tilbyd billedbaserede historiestartere. For avancerede elever i 1. klasse tilf\u00f8jes m\u00f8nstre med fire elementer, flertrinsproblemer med cirkusgruppering og fri cirkushistorieskrivning med dialog.`,
    parentTakeaway: `Se et cirkusshow og tal om m\u00f8nstre: \u201dhvilken r\u00e6kkef\u00f8lge har farverne p\u00e5 teltstribberne?\u201d Lav symmetriske klovneansigter med papir og farver. T\u00e6l jongl\u00f8rboldene i grupper af fem. Lad barnet skrive en cirkushistorie med tegninger. Cirkus er kreativitet og matematik i \u00e9t.`,
    classroomIntegration: `Cirkustemaet i 1. klasse bruges som kreativ temauge: matematik med m\u00f8nster- og symmetriark, dansk med cirkushistorieskrivning og ordforr\u00e5dsopbygning, kunst med symmetriske klovnekostumer, og musik/drama med cirkusnumre. F\u00e6lles M\u00e5ls m\u00e5l for m\u00f8nstre, kreativitet og skriftlig fremstilling integreres.`,
    assessmentRubric: [
      { skill: `M\u00f8nstergenkendelse og -design`, emerging: `forts\u00e6tter AB-m\u00f8nstre med st\u00f8tte`, proficient: `forts\u00e6tter selvst\u00e6ndigt ABB- og AABB-m\u00f8nstre og forklarer reglen`, advanced: `designer egne komplekse m\u00f8nstre med 3+ elementer og formulerer reglen skriftligt` },
      { skill: `Symmetri (cirkuskontekst)`, emerging: `genkender symmetri i et klovneansigt med voksenst\u00f8tte`, proficient: `tegner selvst\u00e6ndigt den manglende halvdel af et symmetrisk cirkusbillede`, advanced: `finder og forklarer symmetri i flere cirkuselementer og producerer egne symmetriske designs` },
      { skill: `Kreativ cirkushistorie`, emerging: `skriver 2\u20133 s\u00e6tninger med st\u00f8tte fra billeder og s\u00e6tningsstartere`, proficient: `skriver selvst\u00e6ndigt en kort cirkushistorie med begyndelse, handling og slutning`, advanced: `skriver en detaljeret historie med dialog, beskrivelse og overraskende slutning` },
    ],
  },

  clothing: {
    snippetAnswer: `T\u00f8j-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner sortering efter flere kriterier, pengeregning med prisskilte, m\u00e5ling af t\u00f8jst\u00f8rrelser og selvst\u00e6ndig skrivning af t\u00f8jbeskrivelser. Hverdagsmatematik i praksis. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse f\u00e5r t\u00f8jtemaet matematisk og sproglig dybde \u2014 seks- og syv\u00e5rige kan arbejde med prisskilte og begyndende pengeregning, m\u00e5le st\u00f8rrelser med centimeter, og skrive beskrivelser af t\u00f8j med adjektiver. Sortering udvides til tre kriterier samtidig (\u00e5rstid, materiale, funktion). Prissammenligninger (\u201dhvilken jakke er billigst?\u201d) introducerer pengevaerdi. Maalb\u00e5ndsm\u00e5ling af arml\u00e6ngde og livvidde giver autentisk brug af centimeter. Skrivning af t\u00f8jbeskrivelser med farve, materiale og funktion tr\u00e6ner adjektivbrug. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, penge og skriftlig beskrivelse i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Begyndende pengeforst\u00e5else (6\u20137-\u00e5rige genkender m\u00f8nter og priser)`, howWeAddress: `T\u00f8jbutik-ark med prisskilte, hvor eleverne adderer priser og sammenligner, giver funktionel pengeregning` },
      { milestone: `M\u00e5ling med m\u00e5leb\u00e5nd (centimeter i kontekst)`, howWeAddress: `St\u00f8rrelsesm\u00e5lingsark, hvor eleverne m\u00e5ler t\u00f8jdele med centimeter, giver autentisk linealbrug` },
      { milestone: `Beskrivende skrivning med adjektiver (farve, st\u00f8rrelse, materiale)`, howWeAddress: `T\u00f8jbeskrivelsesark med adjektivrammer guider eleverne til at skrive praecise beskrivelser` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, brug hele kroner uden \u00f8re, m\u00e5l i hele centimeter, og tilbyd ordbankmed adjektiver. For avancerede elever i 1. klasse tilf\u00f8jes prisberegning med \u00f8re, sammenligning af prisniveauer, og selvst\u00e6ndig skrivning af t\u00f8janmeldelser med begrundede meninger.`,
    parentTakeaway: `G\u00f8r t\u00f8jshopping til matematik: \u201ddenne tr\u00f8je koster 80 kr., den koster 65 kr. \u2014 hvilken er billigst?\u201d M\u00e5l barnets armlaengde med maalb\u00e5nd. Lad barnet sortere rent t\u00f8j efter type, farve og person. Skriv en t\u00f8jliste sammen: \u201d3 r\u00f8de t-shirts, 2 bl\u00e5 bukser.\u201d Hverdagst\u00f8j er hverdagsmatematik.`,
    classroomIntegration: `T\u00f8jtemaet i 1. klasse bruges i tvaerfaglige projekter: matematik med prisregning og maalb\u00e5ndsm\u00e5ling, dansk med t\u00f8jbeskrivelser og adjektivlaering, natur/teknik med materialeunders\u00f8gelse (uld, bomuld, polyester). En klassebutik med legepenge forbinder alle fag. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, penge og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Pengeregning med t\u00f8jpriser`, emerging: `genkender prisskilte og adderer to priser inden for 10 kr. med st\u00f8tte`, proficient: `adderer selvst\u00e6ndigt to-tre priser inden for 20 kr. og sammenligner priser`, advanced: `l\u00f8ser flertrins prisopgaver, giver byttepenge og budgetterer et indkob` },
      { skill: `M\u00e5ling med m\u00e5leb\u00e5nd (cm)`, emerging: `m\u00e5ler med st\u00f8tte og aflaeser resultatet med hj\u00e6lp`, proficient: `m\u00e5ler selvst\u00e6ndigt t\u00f8jdele i centimeter og noterer korrekt`, advanced: `m\u00e5ler, sammenligner og besvarer sp\u00f8rgsm\u00e5l om forskelle i m\u00e5l` },
      { skill: `Beskrivende skrivning (t\u00f8jkontekst)`, emerging: `skriver 1\u20132 s\u00e6tninger med adjektivst\u00f8tte fra ordbank`, proficient: `skriver selvst\u00e6ndigt 3\u20134 beskrivende s\u00e6tninger med farve, storrelse og materiale`, advanced: `skriver en sammenh\u00e6ngende t\u00f8jbeskrivelse med begrundede meninger og sammenligning` },
    ],
  },

  colors: {
    snippetAnswer: `Farve-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner dataindsamling med farvediagrammer, br\u00f8kbegreber med farveinddeling, avancerede m\u00f8nstre og selvst\u00e6ndig skrivning af farverapporter. Farverne bliver analytiske v\u00e6rkt\u00f8jer. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse skifter farvetemaet fra kreativt til analytisk \u2014 seks- og syv\u00e5rige bruger farver som datakategorier i s\u00f8jlediagrammer, udforsker br\u00f8ker ved at dele farvecirkler i halvdele og fjerdedele, og skaber avancerede farvem\u00f8nstre med egne regler. Farveblandingslogik udvides til sekund\u00e6r- og terti\u00e6rfarver med forudsigelses\u00f8velser. Dataindsamling (\u201dt\u00e6l farver p\u00e5 klassens t\u00f8j og lav et s\u00f8jlediagram\u201d) giver funktionel statistik. Skrivning af farverapporter med observationer og konklusioner tr\u00e6ner faglitter\u00e6r skrivning. F\u00e6lles M\u00e5ls m\u00e5l for data, br\u00f8ker og skriftlig rapportering i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `S\u00f8jlediagrammer med farvekategorier (6\u20137-\u00e5rige kan aflase og bygge enkle diagrammer)`, howWeAddress: `Farvet\u00e6llingsark, hvor eleverne t\u00e6ller, registrerer og afl\u00e6ser s\u00f8jlediagrammer med farvedata` },
      { milestone: `Br\u00f8kintroduktion med farvecirkler (halvdel, fjerdedel, tredjedel)`, howWeAddress: `Farvecirkel-delingsark, hvor eleverne farvel\u00e6gger halvdele og fjerdedele, giver visuelt konkret br\u00f8kforst\u00e5else` },
      { milestone: `M\u00f8nsterformulering (at forklare reglen bag et m\u00f8nster med ord)`, howWeAddress: `M\u00f8nsterbeskrivelsesark, hvor eleverne forts\u00e6tter et m\u00f8nster og skriftligt formulerer reglen` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, brug kun fire farver i diagrammer, introduc\u00e9r kun halvdele, og tilbyd s\u00e6tningsstartere til rapportskrivning. For avancerede elever i 1. klasse tilf\u00f8jes seks farvekategorier i diagrammer, tredjedele og fjerdedele i br\u00f8k\u00f8velser, og selvstaendig rapportskrivning med konklusion.`,
    parentTakeaway: `Lav et familiefarveprojekt: t\u00e6l farver p\u00e5 biler ud af vinduet og lav et s\u00f8jlediagram. Del en pizza og vis halvdele og fjerdedele med farver. Bland vandfarver og forudsig resultatet. Skriv sammen: \u201dvi s\u00e5 flest rode biler.\u201d Farver er overalt \u2014 brug dem som datakilder.`,
    classroomIntegration: `Farvetemaet i 1. klasse integreres i matematik og naturfag: matematiktimen laver farvediagrammer og br\u00f8kcirkler, naturfagstimen udforsker farver i naturen med systematiske t\u00e6llinger, kunsttimen eksperimenterer med farveteori, og dansktimen skriver farverapporter. F\u00e6lles M\u00e5ls m\u00e5l for data, br\u00f8ker og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `S\u00f8jlediagrammer med farver`, emerging: `afl\u00e6ser et foerdiglavet s\u00f8jlediagram med st\u00f8tte`, proficient: `opretter selvst\u00e6ndigt et s\u00f8jlediagram med data og besvarer sp\u00f8rgsm\u00e5l om det`, advanced: `sammenligner data p\u00e5 tvaers af diagrammer og drager konklusioner` },
      { skill: `Br\u00f8kforst\u00e5else (farvecirkler)`, emerging: `farvel\u00e6gger halvdelen af en cirkel med st\u00f8tte`, proficient: `deler selvst\u00e6ndigt cirkler i halvdele og fjerdedele og navngiver br\u00f8kerne korrekt`, advanced: `deler i tredjedele, sammenligner br\u00f8kstorrelser og l\u00f8ser enkle br\u00f8kopgaver` },
      { skill: `M\u00f8nsterbeskrivelse`, emerging: `forts\u00e6tter et AB-m\u00f8nster og peger p\u00e5 reglen mundtligt med st\u00f8tte`, proficient: `forts\u00e6tter komplekse m\u00f8nstre og formulerer reglen skriftligt i korte s\u00e6tninger`, advanced: `designer og beskriver egne m\u00f8nstre med pr\u00e6cis sprogbrug og begrundelse` },
    ],
  },

  construction: {
    snippetAnswer: `Byggeri-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner geometriske egenskaber (sider, hj\u00f8rner), m\u00e5ling med lineal, rumlig t\u00e6nkning og selvst\u00e6ndig skrivning af byggebeskrivelser. Konstruktionsprojekter forbinder matematik med virkelighed. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse udvikles byggetemaet fra formgenkendelse til formanalyse \u2014 seks- og syv\u00e5rige laerer at taelle sider og hjorner, maale med lineal i centimeter og tegne bygninger efter maalsat tegning. Geometriske egenskaber (en firkant har 4 sider og 4 hjorner, en trekant har 3 sider og 3 hjorner) identificeres i virkelige bygninger. Rumlig t\u00e6nkning styrkes med byg-fra-tegning-opgaver, der kraever omsaetning af 2D-model til 3D-konstruktion. Addition af byggematerialer i flertrinsproblemer giver kontekst for regning inden for 20. Skrivning af byggebeskrivelser med fagtermer traener faglitteraer kommunikation. F\u00e6lles M\u00e5ls m\u00e5l for geometri, maaling og probleml\u00f8sning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Geometrisk analyse (6\u20137-\u00e5rige taeller sider og hjorner og sammenligner former)`, howWeAddress: `Form-analyse-ark med bygningselementer, hvor eleverne taeller sider/hjorner og navngiver former praecist` },
      { milestone: `Maaling med lineal i centimeter (praecis maaling af laengder)`, howWeAddress: `Bygningstegninger med maalsat, hvor eleverne maaler og tegner linjer med lineal` },
      { milestone: `2D-til-3D-overfoersel (omsaetning af tegning til bygget model)`, howWeAddress: `Byg-efter-tegning-opgaver, der kraever at eleverne laes er en 2D-plan og bygger med klodser` },
    ],
    differentiationNotes: `For elever der har brug for stoette, begraens til tre grundformer, brug hele centimeter med stor lineal, og tilbyd praefabrikerede byggeklodser. For avancerede elever i 1. klasse tilf\u00f8jes 3D-former (kube, cylinder, kegle), maalsat tegning med millimeter, og selvstaendig design af bygninger med skriftlig byggebeskrivelse.`,
    parentTakeaway: `Byg med LEGO og t\u00e6l klodser \u2014 men tilfoej nu lineal: \u201dhvor hoejt er taarnet i centimeter?\u201d Tal om former i huset: doeren er rektangulaer, vinduet er firkantet, taget er trekantet. Lad barnet tegne sit droemhus med maal. Matematik i 1. klasse handler om at m\u00e5le og beskrive den virkelige verden.`,
    classroomIntegration: `Byggetemaet i 1. klasse forbinder matematik og praktisk arbejde: geometritimen analyserer former i bygninger, maaletimen maaler med lineal, konstruktionshjornet bygger efter tegninger, og dansktimen skriver byggebeskrivelser. Et klasseprojekt om at designe en modelby integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for geometri, maaling og problemloesning m\u00f8des.`,
    assessmentRubric: [
      { skill: `Geometrisk formanalyse`, emerging: `navngiver firkant og trekant med billedst\u00f8tte`, proficient: `taeller selvstaendigt sider og hjorner, navngiver 4\u20135 former og beskriver deres egenskaber`, advanced: `sammenligner former, forklarer forskelle og finder dem i bygninger og dagligdagsgenstande` },
      { skill: `M\u00e5ling med lineal (cm)`, emerging: `maaler med stoette og aflaeser resultatet med hjaelp`, proficient: `maaler selvstaendigt i centimeter og tegner linjer af bestemt laengde`, advanced: `maaler praecist med millimeter, sammenligner maal og loser maaleproblemer` },
      { skill: `Byggebeskrivelse (skriftlig)`, emerging: `skriver 1\u20132 saetninger om en bygning med ordbank`, proficient: `skriver selvstaendigt 3\u20134 saetninger med geometriske fagtermer`, advanced: `skriver en sammenhaegende byggebeskrivelse med maal, former og materialer` },
    ],
  },

  cooking: {
    snippetAnswer: `Madlavnings-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner m\u00e5ling med standardenheder (dl, g), br\u00f8ker (halve, kvarte), sekvensering af opskrifter og selvst\u00e6ndig skrivning af opskrifter. K\u00f8kkenet bliver et matematiklaboratorium. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver madlavningstemaet et m\u00e5le- og br\u00f8klaboratorium \u2014 seks- og syv\u00e5rige kan anvende standardm\u00e5leenheder (deciliter, gram), halvere og fordoble opskrifter, og selv skrive opskrifter med korrekt trin-for-trin-struktur. Sekvensering af 5\u20137 opskriftstrin kr\u00e6ver avanceret kronologisk t\u00e6nkning. Br\u00f8kforst\u00e5else med halvdele, fjerdedele og tredjedele g\u00f8res konkret med pizza, kage og frugt. Pengeregning med ingredienspriser giver funktionel matematik. Opskriftl\u00e6sning af proceduretekst st\u00f8tter informationsl\u00e6sning. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, br\u00f8ker og proceduretekst i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Standardm\u00e5leenheder (6\u20137-\u00e5rige begynder at bruge dl, g og ml)`, howWeAddress: `Opskriftark med m\u00e5leenheder i dl og g, hvor eleverne m\u00e5ler og registrerer, giver praecis m\u00e5letraening` },
      { milestone: `Halvering og fordobling (begyndende multiplikativ taenkning)`, howWeAddress: `Opskriftskalering (\u201dhvordan halverer vi opskriften til 2 personer?\u201d) giver autentisk halv/dobbelt-traening` },
      { milestone: `Proceduretekstl\u00e6sning og -skrivning (opskrift som teksttype)`, howWeAddress: `Opskriftskrivningsark med trin-numre og handlingsverber laerer struktureret proceduretekst` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug hele m\u00e5leenheder (1 dl, 2 dl), hold opskrifter p\u00e5 3\u20134 trin med billeder, og tilbyd opskriftskabeloner. For avancerede elever i 1. klasse tilf\u00f8jes halvering/fordobling med decimaltal, opskrifter med 7+ trin, og selvstaendig opskriftskrivning med ingrediensliste og fremgangsm\u00e5de.`,
    parentTakeaway: `Bag sammen og lad barnet maale: \u201d3 dl mel, 2 dl maelk.\u201d Halvér opskriften sammen: \u201dvi skal lave halvt s\u00e5 meget \u2014 hvad er halvdelen af 4 dl?\u201d Lad barnet skrive sin egen opskrift bagefter med nummererede trin. K\u00f8kkenet er det eneste klasselokal, hvor man kan spise resultatet.`,
    classroomIntegration: `Madlavningstemaet i 1. klasse integreres som maale-projekt: matematiktimen med m\u00e5le- og br\u00f8kark, dansktimen med opskriftl\u00e6sning og -skrivning, naturfag med sundhed og n\u00e6ringsstoffer. Ugentlig bagning med opskriftark forbinder teori og praksis. F\u00e6lles M\u00e5ls m\u00e5l for m\u00e5ling, br\u00f8ker og proceduretekst underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `M\u00e5ling med standardenheder (dl, g)`, emerging: `maaler med \u00e9n enhed (dl) med st\u00f8tte`, proficient: `maaler selvstaendigt med dl og g og noterer resultatet korrekt`, advanced: `vaelger korrekt m\u00e5leenhed og -redskab selvstaendigt og l\u00f8ser m\u00e5leproblemer` },
      { skill: `Halvering og fordobling`, emerging: `halverer enkle tal (2, 4, 6) med konkreter`, proficient: `halverer og fordobler tal til 20 selvst\u00e6ndigt i opskriftkontekst`, advanced: `halverer ulige tal med br\u00f8k (halvdelen af 3 = 1\u00bd) og forklarer strategien` },
      { skill: `Opskriftskrivning (proceduretekst)`, emerging: `nummererer 2\u20133 opskrifttrin med billedst\u00f8tte`, proficient: `skriver selvst\u00e6ndigt en opskrift med 4\u20135 trin, ingrediensliste og handlingsverber`, advanced: `skriver en komplet opskrift med m\u00e5langivelser, trin og tips til l\u00e6seren` },
    ],
  },

  dinosaurs: {
    snippetAnswer: `Dinosaur-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner tidslinjeforst\u00e5else, st\u00f8rrelsessammenligning med m\u00e5l, addition/subtraktion inden for 20 og selvst\u00e6ndig skrivning af dinosaurfakta. Fascinationen driver dybdel\u00e6ring. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse udnyttes dinosaurfascinationen til akademisk dybde \u2014 seks- og syv\u00e5rige kan l\u00e6se korte faktatekster om dinosaurer, arbejde med tal over 20 i st\u00f8rrelsessammenligninger (en T-rex var 12 meter lang!) og forst\u00e5 tidslinjer med perioder. M\u00e5ling med meter og centimeter giver kontekst, n\u00e5r dinosaurl\u00e6ngder sammenlignes med klasselocalet. Flerstabelsesord som tyrannosaurus og parasaurolophus traener avanceret fonemisk analyse. Faktaskrivning om dinosaurer med egne ord opbygger faglitteraer skrivning. Venn-diagrammer, der sammenligner planteaedere og k\u00f8d\u00e6dere, styrker logisk taenkning. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, m\u00e5ling og skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Tidslinjeforst\u00e5else (6\u20137-\u00e5rige forst\u00e5r kronologisk r\u00e6kkef\u00f8lge over lange perioder)`, howWeAddress: `Dinosaur-tidslinjeark med tre perioder (trias, jura, kridt) giver begyndende historisk t\u00e6nkning` },
      { milestone: `Sammenlignende m\u00e5ling med standardenheder (meter og centimeter)`, howWeAddress: `Dinosaurlaengde-sammenligningsark, hvor eleverne maaler og sammenligner med klassens m\u00e5l` },
      { milestone: `Faglitter\u00e6r skrivning med fakta (rapportskrivning)`, howWeAddress: `Dinosaurfakta-skabeloner med felter for navn, storrelse, foede og periode guider struktureret skrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begraens til tre velkendte dinosaurer, brug sammenligning uden tal (stoerst/mindst), og tilbyd saetningsstartere. For avancerede elever i 1. klasse tilf\u00f8jes tidslinjeopgaver med millioner af \u00e5r, m\u00e5leomregning og selvstaendig dinosaurforskningsrapport med flere afsnit.`,
    parentTakeaway: `Foelg dinosaurinteressen med fakta: l\u00e6s dinosaurb\u00f8ger sammen og find tal \u2014 \u201dT-rex var 12 meter! Hvor langt er det i vores stue?\u201d M\u00e5l med m\u00e5leb\u00e5nd. Lav en tidslinje p\u00e5 gulvet. Lad barnet skrive tre fakta om sin yndlingsdinosaur. Dyb interesse er den staerkeste laeringsmotor.`,
    classroomIntegration: `Dinosaurtemaet i 1. klasse er det perfekte forskningsprojekt: naturfagstimen laaser faktatekster og sorterer dinosaurer i Venn-diagrammer, matematiktimen maaler og sammenligner laengder, dansktimen skriver dinosaurrapporter, og kunsttimen illustrerer. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, maaling, data og skriftlig fremstilling underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Tidslinjeforst\u00e5else (dinosaurperioder)`, emerging: `placerer 2 dinosaurer p\u00e5 en tidslinje med billedst\u00f8tte`, proficient: `placerer selvst\u00e6ndigt 4\u20135 dinosaurer i korrekt periode p\u00e5 en tidslinje`, advanced: `forklarer perioders r\u00e6kkef\u00f8lge og nogen forskelle mellem dem` },
      { skill: `Sammenlignende m\u00e5ling (meter)`, emerging: `sammenligner to dinosaurlangder med st\u00f8tte (stoerre/mindre)`, proficient: `maaler og sammenligner selvstaendigt laengder i meter og besvarer sammenligningssp\u00f8rgsm\u00e5l`, advanced: `beregner forskelle (T-rex er 12 m, stegosaurus er 9 m \u2014 3 m forskel) og relaterer til kendte laengder` },
      { skill: `Dinosaurfaktaskrivning`, emerging: `skriver 1\u20132 faktas\u00e6tninger med st\u00f8tte og ordbank`, proficient: `skriver selvst\u00e6ndigt 3\u20134 faktas\u00e6tninger med korrekt stavning af n\u00f8gleord`, advanced: `skriver en sammenhaengende faktarapport med indledning, fakta og afslutning` },
    ],
  },

  easter: {
    snippetAnswer: `P\u00e5ske-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner addition/subtraktion inden for 20, m\u00f8nsterdesign, br\u00f8kforst\u00e5else med p\u00e5ske\u00e6g og selvst\u00e6ndig skrivning af p\u00e5skehistorier. Traditionen giver meningsfuld kontekst. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver p\u00e5sketemaet et matematisk og sprogligt projekt \u2014 seks- og syv\u00e5rige l\u00f8ser flertrinsproblemer med fundne \u00e6g, designer avancerede m\u00f8nstre p\u00e5 \u00e6g med egne regler, og forst\u00e5r br\u00f8kbegreber ved at dele p\u00e5ske\u00e6g og chokolade. Ligelig fordeling (\u201d12 \u00e6g til 4 b\u00f8rn \u2014 hvor mange til hver?\u201d) introducerer division som deling. Dataindsamling med p\u00e5ske-s\u00f8jlediagrammer (\u201dhvor mange \u00e6g af hver farve?\u201d) giver statistik i festkontekst. Kreativ skrivning af p\u00e5skehistorier med narrativ struktur tr\u00e6ner fort\u00e6llekompetence. F\u00e6lles M\u00e5ls m\u00e5l for tal, data og kreativ skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Ligelig fordeling og begyndende division (6\u20137-\u00e5rige kan dele ligeligt)`, howWeAddress: `Delings\u00f8velser med p\u00e5ske\u00e6g (\u201d12 \u00e6g til 3 kurve\u201d) giver konkret forstaelse af division som fair deling` },
      { milestone: `M\u00f8nsterdesign med regler (skabe egne moenstre og forklare dem)`, howWeAddress: `\u00c6gdekorationsark, hvor eleverne designer m\u00f8nstre og skriver reglen, tr\u00e6ner m\u00f8nstertaenkning` },
      { milestone: `Kreativ fort\u00e6lling med narrativ struktur`, howWeAddress: `P\u00e5skehistorie-skabeloner med plads til indledning, handling og afslutning guider struktureret kreativ skrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, hold deling inden for 10 med konkreter, brug AB-moenstre, og tilbyd billedbaserede historiestartere. For avancerede elever i 1. klasse tilfoejes deling med rest, komplekse moenstre med fire elementer og regelformulering, og fri p\u00e5skehistorieskrivning med dialog.`,
    parentTakeaway: `Goer p\u00e5ske\u00e6gjagten til matematik: \u201ddu fandt 8, din soester fandt 6 \u2014 hvor mange tilsammen? Hvis I deler dem ligeligt?\u201d Dekorer \u00e6g med m\u00f8nstre og tal om reglen. Del chokolade\u00e6g i halvdele og fjerdedele. Lad barnet skrive en p\u00e5skehistorie bagefter. Traditionen er den bedste laeringsramme.`,
    classroomIntegration: `P\u00e5sketemaet i 1. klasse bruges som forarstema: matematiktimen med delings- og m\u00f8nsterark, dansktimen med p\u00e5skehistorieskrivning og ordforr\u00e5d, kunsttimen med \u00e6gdekoration og m\u00f8nsterdesign. En klasse-\u00e6ggejagt med matematikopgaver kombinerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for tal, m\u00f8nstre og kreativ skrivning integreres.`,
    assessmentRubric: [
      { skill: `Ligelig fordeling (p\u00e5skekontekst)`, emerging: `deler 4\u20136 \u00e6g i 2 lige grupper med konkreter`, proficient: `deler selvstaendigt op til 20 \u00e6g i 2\u20134 lige grupper og angiver resultatet`, advanced: `deler med rest, forklarer strategien og formulerer egne delingsopgaver` },
      { skill: `M\u00f8nsterdesign og regelformulering`, emerging: `forts\u00e6tter et givet AB-m\u00f8nster med st\u00f8tte`, proficient: `designer selvstaendigt et m\u00f8nster og forklarer reglen mundtligt`, advanced: `designer komplekse m\u00f8nstre, formulerer reglen skriftligt og varierer m\u00f8nsteret systematisk` },
      { skill: `Kreativ p\u00e5skeskrivning`, emerging: `skriver 2\u20133 s\u00e6tninger med billedst\u00f8tte og s\u00e6tningsstartere`, proficient: `skriver selvstaendigt en kort p\u00e5skehistorie med begyndelse, handling og slutning`, advanced: `skriver en detaljeret historie med dialog, beskrivelse og overraskende slutning` },
    ],
  },

  emotions: {
    snippetAnswer: `F\u00f8lelses-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner nuanceret f\u00f8lelsesordforr\u00e5d, konfliktl\u00f8sningsstrategier, empatisk perspektivtagning og selvst\u00e6ndig skrivning af f\u00f8lelsesdagbog. Social kompetence styrkes systematisk. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver f\u00f8lelsestemaet et systematisk socialt l\u00e6ringsprojekt \u2014 seks- og syv\u00e5rige kan reflektere over egne f\u00f8lelser, forst\u00e5 andres perspektiver og anvende konkrete strategier i konflikter. F\u00f8lelsesordforr\u00e5det udvides til 15\u201320 ord (frustreret, skuffet, stolt, nervoes, taknemmelig, misundelig) med praecise definitioner og kontekster. Scenariebaserede opgaver kraever, at eleverne analyserer en situation, identificerer alle parters f\u00f8lelser og foresl\u00e5r loesninger. Dagbogsskrivning med f\u00f8lelsesrefleksion traener b\u00e5de skriftlig fremstilling og selvbevidsthed. Datasporing af egne f\u00f8lelser over en uge introducerer self-monitoring. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling, social kompetence og skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Nuanceret f\u00f8lelsesforst\u00e5else (6\u20137-\u00e5rige kan skelne mellem lignende f\u00f8lelser)`, howWeAddress: `F\u00f8lelsespar-ark, der sammenligner nervoes/bange, skuffet/ked af det, giver praecis f\u00f8lelsesdifferentiering` },
      { milestone: `Perspektivtagning i konflikter (forst\u00e5 begge sider)`, howWeAddress: `Tosidede scenarieark, hvor eleverne beskriver begge personers foelser og foresl\u00e5r f\u00e6lles l\u00f8sning` },
      { milestone: `Refleksiv skrivning (udtrykke egne f\u00f8lelser skriftligt)`, howWeAddress: `F\u00f8lelsesdagbog-skabeloner med daglige refleksionsprompts guider struktureret emotionel skrivning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begraens til 6\u20138 f\u00f8lelsesord med tydelige ansigtsbilleder, brug enkle to-personers scenarier, og tilbyd s\u00e6tningsstartere til dagbogen. For avancerede elever i 1. klasse tilf\u00f8jes komplekse flerpartskonflikter, f\u00f8lelsesanalyse af bogkarakter og fri refleksiv skrivning med begrundede l\u00f8sningsforslag.`,
    parentTakeaway: `Tal om f\u00f8lelser med praecist sprog: \u201ddu virker frustreret, ikke bare sur \u2014 kan du maerke forskellen?\u201d Del dine egne f\u00f8lelser: \u201djeg var nervoes f\u00f8r moedet i dag.\u201d Start en familiefoeelsesdagbog, hvor alle skriver \u00e9n saetning om deres dag. Hvert praecist f\u00f8lelsesord styrker barnets sociale kompetence.`,
    classroomIntegration: `F\u00f8lelsestemaet i 1. klasse integreres som \u00e5rsprojekt: daglig f\u00f8lelsescheck-in i morgensamling, ugentlig konfliktscenarieoeelse, dansktimen med f\u00f8lelsesdagbog og karakteranalyse i l\u00e6sning. Klasserummet f\u00e5r en foelelsesvaeg med strategikort. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling, social kompetence og skrivning underst\u00f8ttes hele \u00e5ret.`,
    assessmentRubric: [
      { skill: `Nuanceret f\u00f8lelsesordforr\u00e5d`, emerging: `navngiver 4\u20136 basale f\u00f8lelser med billedst\u00f8tte`, proficient: `anvender selvstaendigt 10\u201312 f\u00f8lelsesord korrekt i kontekst og forklarer forskelle`, advanced: `bruger 15+ nuancerede f\u00f8lelsesord praeecist og forklarer, hvorfor man f\u00f8ler som man g\u00f8r` },
      { skill: `Perspektivtagning og konfliktl\u00f8sning`, emerging: `identificerer \u00e9n persons f\u00f8lelse i et scenarie med st\u00f8tte`, proficient: `beskriver begge parters f\u00f8lelser og foresl\u00e5r en rimelig l\u00f8sning selvstaendigt`, advanced: `analyserer komplekse situationer med flere parter og foresl\u00e5r l\u00f8sninger, der tilgodeser alle` },
      { skill: `F\u00f8lelsesdagbog (refleksiv skrivning)`, emerging: `skriver 1\u20132 saetninger med s\u00e6tningsstartere om dagens f\u00f8lelse`, proficient: `skriver selvstaendigt 3\u20134 saetninger med f\u00f8lelsesrefleksion og begrundelse`, advanced: `skriver uddybende refleksioner med forbindelse til haendelser og strategier for naeste gang` },
    ],
  },

  'fairy-tales': {
    snippetAnswer: `Eventyr-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner narrativ analyse, genfortaelling med egne ord, karakterbeskrivelse og selvstaendig eventyrskrivning med begyndelse, midte og slutning. Klassiske og nye eventyr driver laesning og skrivning. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse g\u00e5r eventyrtemaet fra genfortaelling til analyse og kreation \u2014 seks- og syv\u00e5rige kan identificere narrative elementer (hovedperson, problem, l\u00f8sning), sammenligne eventyr p\u00e5 tvaers af historier og skrive egne eventyr med klar struktur. Karakterbeskrivelser med adjektiver (modig, klog, grinagtig) tr\u00e6ner beskrivende skrivning. Eventyrsekvensering i 5\u20137 trin kr\u00e6ver praecis kronologisk t\u00e6nkning. Sammenligning af to eventyr i Venn-diagrammer introducerer analytisk laesning. F\u00e6lles M\u00e5ls m\u00e5l for laesning, narrativ kompetence og kreativ skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Narrativ analyse (6\u20137-\u00e5rige kan identificere hovedperson, problem og loesning)`, howWeAddress: `Eventyranalyseark med felter for karakter, problem og loesning giver struktureret analysetaenkning` },
      { milestone: `Sammenligning af tekster (to eventyr sidestilles)`, howWeAddress: `Venn-diagram-ark, der sammenligner to eventyr, opbygger analytisk laesekompetence` },
      { milestone: `Selvst\u00e6ndig eventyrskrivning (begyndelse, midte, slutning)`, howWeAddress: `Eventyrskriveskabeloner med plads til illustration og tekst i tre dele guider kreativ skrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug velkendte eventyr med 3\u20134 sekvensbilleder, tilbyd ordbank med eventyrord, og giv rammer for skrivning. For avancerede elever i 1. klasse tilf\u00f8jes sammenligning af tre eventyr, karakteranalyse med citat, og fri eventyrskrivning med dialog og beskrivelser.`,
    parentTakeaway: `Laes et eventyr hver uge og tal om strukturen: \u201dhvem er helten? Hvad er problemet? Hvordan l\u00f8ses det?\u201d Sammenlign to eventyr: \u201dhvordan ligner Roedhaette og De Tre Sm\u00e5 Grise hinanden?\u201d Lad barnet skrive sit eget eventyr med tegninger. Eventyr er den \u00e6ldste og bedste skriveundervisning.`,
    classroomIntegration: `Eventyrtemaet i 1. klasse er danskfagets rygrad: ugentlig eventyrlaesning med analyseark, skriveworkshop med eventyrskabeloner, dramatisering i rollespil, og sammenlignende laesning med Venn-diagrammer. Et klasseventyrbibliotek med elevskrevne eventyr fejrer arbejdet. F\u00e6lles M\u00e5ls m\u00e5l for laesning, skrivning og mundtlig fremstilling underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Narrativ analyse (eventyr)`, emerging: `identificerer hovedpersonen med st\u00f8tte og genffort\u00e6ller 2\u20133 haendelser`, proficient: `identificerer selvstaendigt hovedperson, problem og loesning og genffort\u00e6ller i korrekt raekkefoelge`, advanced: `analyserer narrative elementer, sammenligner eventyr og forklarer temaer` },
      { skill: `Eventyrsammenligning (Venn-diagram)`, emerging: `finder 1\u20132 ligheder mellem to eventyr med voksenst\u00f8tte`, proficient: `udfylder selvstaendigt et Venn-diagram med ligheder og forskelle`, advanced: `sammenligner tre eventyr, drager konklusioner og formulerer dem skriftligt` },
      { skill: `Selvst\u00e6ndig eventyrskrivning`, emerging: `skriver 3\u20134 saetninger med skabelon og billedst\u00f8tte`, proficient: `skriver selvstaendigt et kort eventyr med begyndelse, midte og slutning`, advanced: `skriver et detaljeret eventyr med dialog, beskrivelser og overraskende handling` },
    ],
  },

  farm: {
    snippetAnswer: `G\u00e5rd-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner produktionsk\u00e6der, flertrinsmatematik med g\u00e5rddata, dataindsamling med tabeller og selvst\u00e6ndig skrivning af g\u00e5rdfakta. Landbruget giver tv\u00e6rfaglig l\u00e6ring. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse g\u00e5r g\u00e5rdtemaet fra navngivning til forst\u00e5else af systemer \u2014 seks- og syv\u00e5rige kan foelge produktionsk\u00e6der med flere led (korn\u2192mel\u2192broed), l\u00f8se flertrinsproblemer med g\u00e5rddata (12 hoens lagger 12 aeg, 4 bliver spist, hvor mange er tilbage?), og indsamle data om g\u00e5rddyr i tabeller og diagrammer. M\u00e5ling af veksthastighed (planter en froe og maaler i centimeter hver uge) giver langsgaaende dataindsamling. Faglitter\u00e6r skrivning om g\u00e5rddyr og produkter kraever strukturerede faktas\u00e6tninger. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, matematik og skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Produktionsk\u00e6der med flere led (6\u20137-\u00e5rige forst\u00e5r sammenkoblede processer)`, howWeAddress: `Produktionsk\u00e6de-ark (ko\u2192maelk\u2192smoer\u2192br\u00f8d) opbygger systemtaenkning med konkrete landbrugseksempler` },
      { milestone: `Flertrinsregning med g\u00e5rddata (2\u20133 operationer i raekkefoelge)`, howWeAddress: `G\u00e5rdtekstopgaver med flere trin giver kontekstualiseret flertrinstaenkning` },
      { milestone: `L\u00e6ngdedata over tid (maaling af vaekst uge for uge)`, howWeAddress: `Plantev\u00e6kst-registreringsark, hvor eleverne maaler og noterer i centimeter ugentligt` },
    ],
    differentiationNotes: `For elever der har brug for stoette, begraens produktionsk\u00e6der til to led, hold regning inden for 10, og tilbyd forudfyldte tabeller. For avancerede elever i 1. klasse tilf\u00f8jes produktionsk\u00e6der med fire led, flertrinsregning inden for 50, og selvstaendig skrivning af g\u00e5rdforskningsrapport med diagrammer.`,
    parentTakeaway: `Besoeg en gaard og foelg maden fra jord til bord: \u201dhvor kommer maelken fra? Og smoerret?\u201d Plant et froe derhjemme og maal vaeksten med lineal hver uge. Lav en tabel over vaeksten. Lad barnet skrive tre fakta om sit yndlingsg\u00e5rddyr. G\u00e5rden er det bedste tvaerfaglige klasselokale.`,
    classroomIntegration: `G\u00e5rdtemaet i 1. klasse integreres som aarsprojekt: naturfag med produktionsk\u00e6der og plantev\u00e6kst, matematik med flertrinsopgaver og m\u00e5ledata, dansk med g\u00e5rdfaktaskrivning. Et klassevaeksthus med ugentlige maalinger forbinder alle fag. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, maaling og skriftlig fremstilling underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Produktionsk\u00e6deforst\u00e5else`, emerging: `forbinder et dyr med \u00e9t produkt med billedst\u00f8tte (ko\u2192maelk)`, proficient: `ordner selvstaendigt en produktionsk\u00e6de med 3 led korrekt og forklarer den`, advanced: `forklarer produktionsk\u00e6der med 4+ led og sammenligner forskellige k\u00e6der` },
      { skill: `Flertrinsproblemer (g\u00e5rdkontekst)`, emerging: `l\u00f8ser \u00e9t-trins-opgaver inden for 10 med konkreter`, proficient: `l\u00f8ser selvstaendigt to-trins-problemer inden for 20 med g\u00e5rddata`, advanced: `loser tre-trins-problemer, formulerer egne opgaver og verificerer svar` },
      { skill: `Vaekstdata og maaling`, emerging: `maaler en plante med stoette og noterer \u00e9t m\u00e5l`, proficient: `maaler selvstaendigt i cm, noterer ugentligt og sammenligner (hoejere/lavere)`, advanced: `analyserer vaekstdata over tid, finder moenstre og formulerer sp\u00f8rgsm\u00e5l` },
    ],
  },

  flowers: {
    snippetAnswer: `Blomster-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner systematisk observation, m\u00e5ling af plantev\u00e6kst i cm, symmetri med kronblade, og selvst\u00e6ndig skrivning af v\u00e6kstrapporter. Botanik bliver et forskningsprojekt. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse g\u00e5r blomstertemaet fra iagttagelse til forskningsprojekt \u2014 seks- og syv\u00e5rige kan maale plantevakst systematisk i centimeter, registrere data i tabeller og sammenligne vaekstrater. Kronbladsmaaling og -taelling giver funktionel matematik (tulipan: 6 kronblade a 4 cm). Symmetrianalyse udvides til flere symmetrilinjer i blomster. Bestovningsprocessen (bi\u2192blomst\u2192froe) introducerer biologiske cykler. Skrivning af vaekstrapporter med data, observationer og konklusioner traener faglitteraer rapportering. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig undersoegelse, maaling og skrivning i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Systematisk dataindsamling over tid (6\u20137-\u00e5rige kan maale og registrere ugentligt)`, howWeAddress: `Plantev\u00e6kst-dagbogsark med felter for dato, hoejde i cm og tegning giver struktureret l\u00e6ngdedata` },
      { milestone: `Symmetrianalyse med flere akser (blomster har ofte flere symmetrilinjer)`, howWeAddress: `Blomster-symmetriark, der viser 2\u20134 symmetriakser, udfordrer rumlig taenkning pr\u00e6cist` },
      { milestone: `Biologiske cykler (bestovning og froedannelse)`, howWeAddress: `Bestovnings-sekvensering med 4\u20136 trin opbygger forst\u00e5elsen af biologiske processer` },
    ],
    differentiationNotes: `For elever der har brug for stoette, maal kun hoejde i hele cm, brug \u00e9n symmetrillinje, og tilbyd enkle vaekstark med billedstotte. For avancerede elever i 1. klasse tilfojes kronbladsmaaling med mm, flere symmetriakser, og selvstaendig vaekstrapport med datadiagram og konklusion.`,
    parentTakeaway: `Plant en froe sammen og maal vaeksten hver uge med lineal. Foer en vaeksttabel p\u00e5 koeleskabet. Gaa paa blomsterjagt i parken: tael kronblade, find symmetri, sammenlign blade. Lad barnet tegne og skrive om \u201dugens blomst.\u201d Blomster er den smukkeste indgang til naturvidenskab i 1. klasse.`,
    classroomIntegration: `Blomstertemaet i 1. klasse koerer som foraarsprojekt: plantning af froe med ugentlig maaling og registrering, matematiktimen med symmetriark og dataanalyse, naturfagstimen med bestovning og vaekstcyklus, dansktimen med vaekstrapportskrivning. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, maaling og skriftlig rapportering underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Plantev\u00e6kstmaaling og registrering`, emerging: `maaler med stoette og noterer \u00e9t maal i en tabel`, proficient: `maaler selvstaendigt i cm ugentligt, registrerer data korrekt og sammenligner (hoejere/lavere)`, advanced: `analyserer vaekstdata, finder moenstre (hurtig vaekst i uge 3) og formulerer konklusioner` },
      { skill: `Symmetri med blomster`, emerging: `genkender symmetri i en blomst med \u00e9n akse med st\u00f8tte`, proficient: `identificerer selvstaendigt 2 symmetriakser og tegner den manglende halvdel`, advanced: `finder flere symmetriakser, forklarer begrebet og anvender det p\u00e5 andre naturformer` },
      { skill: `V\u00e6kstrapportskrivning`, emerging: `skriver 1\u20132 saetninger om en plante med saetningsstartere`, proficient: `skriver selvstaendigt en rapport med observation, data og enkel konklusion`, advanced: `skriver en sammenhaengende rapport med indledning, data, analyse og konklusion` },
    ],
  },

  food: {
    snippetAnswer: `Mad-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner n\u00e6ringsstoffer og sundhedsvalg, m\u00e5ling af ingredienser, prisregning med madvarer og selvst\u00e6ndig skrivning af madanmeldelser. Sundhedskompetence opbygges systematisk. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse g\u00e5r madtemaet fra sortering til sundhedsforstaaelse \u2014 seks- og syv\u00e5rige kan forst\u00e5 n\u00e6ringsstoffer (protein, kulhydrater, fedt, vitaminer) og relatere dem til kroppens behov. Prisregning med madvarer (en liter maelk koster 12 kr., to liter koster...?) giver funktionel matematik med tierovergang. M\u00e5ling af ingredienser med dl og g supplerer pengeregningen. Dataindsamling om klassens madpakker i s\u00f8jlediagrammer giver statistik med personlig relevans. Skrivning af madanmeldelser (\u201djeg synes, at... fordi...\u201d) tr\u00e6ner meningsbaseret argumentation. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, m\u00e5ling og skriftlig argumentation i 1. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `N\u00e6ringsstofforst\u00e5else (6\u20137-\u00e5rige kan navngive og gruppere n\u00e6ringsstoffer)`, howWeAddress: `N\u00e6ringsstof-sorteringsark, hvor madvarer placeres i protein-, kulhydrat- og vitamingrupper` },
      { milestone: `Prisregning med madvarer (addition inden for 20\u201350)`, howWeAddress: `Indkoebslisteark med priser, hvor eleverne adderer, sammenligner og finder byttepenge` },
      { milestone: `Meningsbaseret skrivning (argumentation med begrundelse)`, howWeAddress: `Madanmeldelsesskabeloner med \u201djeg mener... fordi...\u201d-rammer tr\u00e6ner begrundet meningsskrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, begraens til tre naeringsgrupper med billedstotte, hold prisregning inden for 10 kr., og tilbyd saetningsstartere til anmeldelser. For avancerede elever i 1. klasse tilfojes fem naeringsgrupper med funktionsbeskrivelser, prisregning med oere, og selvstaendig skrivning af madanmeldelser med flere argumenter.`,
    parentTakeaway: `Gaa paa indkoeb sammen og laes prisskilte: \u201dhvad koster maalken? Og broedet? Hvad koster det tilsammen?\u201d Tal om naering: \u201dprotein i kodet bygger muskler, vitaminer i frugten holder dig rask.\u201d Lad barnet skrive en anmeldelse af aftensmaden: \u201djeg syntes, det smagte godt, fordi...\u201d Mad er sundhed, matematik og sprog i \u00e9t.`,
    classroomIntegration: `Madtemaet i 1. klasse integreres som sundhedsprojekt: naturfag med naeringstoflaering, matematik med indkoebsregning og maaleing, dansk med madanmeldelser og opskriftskrivning. Et klassemadpyramide-projekt forbinder alle fag. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, m\u00e5ling og skriftlig argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `N\u00e6ringsstofklassifikation`, emerging: `sorterer madvarer i 2 grupper (sundt/usundt) med stoette`, proficient: `sorterer selvstaendigt i 4 naeringsgrupper og forklarer hver gruppes funktion`, advanced: `analyserer et maaltid, vurderer naeringsbalancen og foresl\u00e5r forbedringer` },
      { skill: `Prisregning med madvarer`, emerging: `adderer to priser inden for 10 kr. med stoette`, proficient: `adderer selvstaendigt 3\u20134 priser inden for 20 kr. og finder byttepenge`, advanced: `loser flertrins indkoebsproblemer, budgetterer et maaltid og sammenligner priser` },
      { skill: `Meningsbaseret madskrivning`, emerging: `skriver 1\u20132 saetninger med saetningsstartere (\u201djeg synes...\u201d)`, proficient: `skriver selvstaendigt 3\u20134 saetninger med mening og begrundelse (\u201djeg synes... fordi...\u201d)`, advanced: `skriver en sammenhaengende madanmeldelse med flere argumenter og konklusion` },
    ],
  },

  forest: {
    snippetAnswer: `Skov-arbejdsark til 1. klasse (6\u20137 \u00e5r) tr\u00e6ner systematisk feltobservation, dataindsamling med stregdiagrammer, f\u00f8dek\u00e6deforst\u00e5else og selvst\u00e6ndig skrivning af naturrapporter. Udeskole bliver forskning. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 1. klasse bliver skovtemaet et forskningsprojekt \u2014 seks- og syv\u00e5rige kan gennemfoere strukturerede feltundersoegelser med tjeklister, registrere fund i tabeller og stregdiagrammer, og forst\u00e5 foedek\u00e6der som logiske systemer (egetrae\u2192larve\u2192musvit\u2192spurvehoeg). M\u00e5ling af traeomkreds og bladlangde med maaleb\u00e5nd giver funktionel centimeter-brug. Aarstidsdata indsamlet over hele aaret giver l\u00e6ngdedata til sammenligning. Skrivning af naturrapporter med observation, data og konklusion traener faglitteraer rapportering. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig undersoegelse, data, maaling og skriftlig rapportering i 1. klasse underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Struktureret feltundersoegelse (6\u20137-\u00e5rige kan foelge en undersoegelsesplan systematisk)`, howWeAddress: `Skov-feltark med tjeklister, maalezoner og registreringsfelter guider systematisk naturundersoegelse` },
      { milestone: `F\u00f8dek\u00e6deforst\u00e5else (hvem spiser hvem i skoven)`, howWeAddress: `F\u00f8dek\u00e6de-opbygningsark, hvor eleverne forbinder organismer i korrekt raekkefoelge` },
      { milestone: `Naturrapportskrivning (observation \u2192 data \u2192 konklusion)`, howWeAddress: `Rapportskabeloner med tre sektioner guider eleverne fra observation til skriftlig konklusion` },
    ],
    differentiationNotes: `For elever der har brug for stoette, begraens tjeklisten til 4\u20135 elementer, brug toleddet foedek\u00e6der (raev\u2192mus), og tilbyd saetningsstartere til rapportskrivning. For avancerede elever i 1. klasse tilf\u00f8jes 8\u201310-elements tjeklister, fireleddet foedek\u00e6der, og selvstaendig rapportskrivning med datadiagram og analyse.`,
    parentTakeaway: `Gaa en skovtur med et form\u00e5l: lav en tjekliste (5 traeer, 3 svampe, 2 fugle) og lad barnet registrere. Maal et traes omkreds med maaleb\u00e5nd. Tal om foedek\u00e6der: \u201dhvem spiser hvem?\u201d Skriv en naturrapport sammen bagefter: \u201dvi fandt... vi maalte... vi konkluderer...\u201d Skoven er det stoerste laboratorium.`,
    classroomIntegration: `Skovtemaet i 1. klasse er udeskole-fundamentet: maanedlige skovture med feltark, naturfagstimen med foedek\u00e6der og aarstidsdata, matematiktimen med maaledata og diagrammer, dansktimen med naturrapporter. Et aarshjul over skovens forandringer h\u00e6nger i klassen. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, maaling, data og skriftlig rapportering integreres hele aaret.`,
    assessmentRubric: [
      { skill: `Struktureret feltobservation`, emerging: `finder 2\u20133 elementer p\u00e5 en tjekliste med stoette`, proficient: `gennemfoerer selvstaendigt en feltundersoegelse med 6\u20138 elementer og registrerer fund korrekt`, advanced: `tilfojer egne observationer ud over tjeklisten og beskriver dem detaljeret` },
      { skill: `F\u00f8dek\u00e6deforst\u00e5else`, emerging: `forbinder to organismer (raev\u2192mus) med billedst\u00f8tte`, proficient: `opbygger selvstaendigt en treledet foedek\u00e6de og forklarer retningen`, advanced: `opbygger fireleddet foedek\u00e6der, forklarer begreberne rovdyr/byttedyr og forbinder til \u00f8kosystemet` },
      { skill: `Naturrapportskrivning`, emerging: `skriver 1\u20132 saetninger om en skovtur med saetningsstartere`, proficient: `skriver selvstaendigt en rapport med observation, data og enkel konklusion`, advanced: `skriver en sammenhaengende rapport med indledning, metode, resultater og konklusion` },
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
