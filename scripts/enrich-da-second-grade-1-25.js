#!/usr/bin/env node
/**
 * SEO Part 229: DA Second-Grade Grade Enrichment \u2014 Themes 1-25
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the second-grade grade block of 25 DA theme files (alphabet through household).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    snippetAnswer: `Alfabet-arbejdsark til 2. klasse (7\u20138 \u00e5r) styrker avanceret stavning, ordfamilier, opslagsf\u00e6rdigheder i ordb\u00f8ger og morfologisk analyse med forstavelser og endelser. Ordforr\u00e5det vokser eksponentielt. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse er alfabetet ikke l\u00e6ngere noget, der l\u00e6res \u2014 det er et v\u00e6rkt\u00f8j, der bruges strategisk. Syv- og otte\u00e5rige afkoder flerstavelesord ved at opdele dem i forstavelser, rodord og endelser (u-ven-lig, gen-brug-s-station), anvender stavekonventioner for lange vokalm\u00f8nstre og dobbeltkonsonanter, og sl\u00e5r ord op i ordb\u00f8ger ved hj\u00e6lp af andet og tredje bogstav. Ordforvirrings\u00f8velser med flerstavelesord kr\u00e6ver b\u00e5de fonologisk og morfologisk bevidsthed. Krydsord uden ordbanker tvinger selvst\u00e6ndig stavning. Ordsogninger med fagordforr\u00e5d fra naturfag og matematik udvider tvaerfaglig ordviden. F\u00e6lles M\u00e5ls m\u00e5l for l\u00e6sning, stavning og ordforr\u00e5d i 2. klasse underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Morfologisk analyse (7\u20138-\u00e5rige genkender forstavelser, rodord og endelser som meningsb\u00e6rende enheder)`, howWeAddress: `Ordopdelingsark, hvor eleverne opdeler ord i forstavelse + rod + endelse og forklarer betydningen af hver del` },
      { milestone: `Opslagsf\u00e6rdigheder i ordbog (brug af andet og tredje bogstav til pr\u00e6cis lokalisering)`, howWeAddress: `Ordbogs\u00f8velser med ordlister, hvor eleverne ordner efter andet/tredje bogstav og sl\u00e5r definitioner op` },
      { milestone: `Stavekonventioner for dobbeltkonsonant og lang vokal (regelbaseret stavning)`, howWeAddress: `Stavesorteringsark, hvor eleverne grupperer ord efter vokalm\u00f8nster og formulerer stavereglen` },
      { milestone: `Flydende l\u00e6sning af flerstavelesord (automatisk afkodning af komplekse ord)`, howWeAddress: `Ordforvirrings- og krydsord med flerstavelesord tr\u00e6ner hurtig, pr\u00e6cis afkodning og stavning` },
    ],
    differentiationNotes: `For elever der har brug for st\u00f8tte, begr\u00e6ns til tostavelsesord, tilbyd ordbanker ved krydsord og brug farvemarkering af forstavelser og endelser. For avancerede elever i 2. klasse fjernes ordbanker helt, tilf\u00f8jes trestavelsesord med flere affikser, og eleverne skriver egne ordfamilieplancher med rod, forstavelse og endelse.`,
    parentTakeaway: `Leg \u201dorddetektiv\u201d derhjemme: find rodordet i uvenlig, genbruge, uretf\u00e6rdig. Sl\u00e5 et nyt ord op i ordbogen sammen og l\u00e6s definitionen hoejt. Spil ordforvirring med magnetbogstaver og brug flerstavelesord. Hver gang barnet opdager et m\u00f8nster i sproget, vokser ordforr\u00e5det eksponentielt.`,
    classroomIntegration: `Alfabetarbejdsark i 2. klasse fungerer som sprogvaerktoej p\u00e5 tvaers af fag: ordopdelingsark introducerer fagord foer en lektion, stavesorteringsark foerstaerker ugens stavefokus, ordbogs\u00f8velser bruges i forskningstimer, og krydsord fungerer som morgenopvarmning. F\u00e6lles M\u00e5ls m\u00e5l for l\u00e6sning, stavning og ordforr\u00e5d underst\u00f8ttes systematisk.`,
    assessmentRubric: [
      { skill: `Morfologisk analyse (forstavelser, rodord, endelser)`, emerging: `identificerer rodordet i sammensatte ord med st\u00f8tte`, proficient: `opdeler selvstaendigt ord i forstavelse, rod og endelse og forklarer betydningen`, advanced: `anvender morfologisk analyse p\u00e5 ukendte ord og genererer nye ord med samme rodord` },
      { skill: `Opslagsf\u00e6rdigheder og alfabetisk ordning`, emerging: `ordner ord efter foerstebogstav og finder ord i en simpel ordliste`, proficient: `ordner efter andet og tredje bogstav og sl\u00e5r selvstaendigt ord op i ordbog`, advanced: `bruger opslagsord, fortolker flere definitioner og vaelger den korrekte i kontekst` },
      { skill: `Stavekonventioner og m\u00f8nstre`, emerging: `staver lydrette tostavelsesord med stoette fra stavereglen`, proficient: `anvender selvstaendigt staveregler for dobbeltkonsonant og lang vokal i diktat og fri skrivning`, advanced: `overforer staveregler til ukendte ord, forklarer reglen og retter egne fejl strategisk` },
    ],
  },

  animals: {
    snippetAnswer: `Dyre-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner addition og subtraktion inden for 100, systematisk dyreforskning med noter, sammenlignende analyse i tabeller og selvst\u00e6ndig skrivning af dyreforskningsrapporter. Naturvidenskabelig taenkning styrkes. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse g\u00e5r dyretemaet fra faktal\u00e6sning til systematisk forskning \u2014 syv- og otte\u00e5rige kan indsamle og organisere dyredata i tabeller, sammenligne arter p\u00e5 tvaers af flere kriterier og skrive strukturerede forskningsrapporter med indledning, fakta og konklusion. Addition og subtraktion inden for 100 med dyrepopulationsdata giver flertrinsproblemer med tierovergang. Multiplikation som gentagen addition introduceres med dyregrupper (5 akvarier med 4 fisk = ?). S\u00f8jlediagrammer med dobbeltsoejler sammenligner to dyregrupper. Dyreklassifikation udvides til vertebrater og invertebrater med undergrupper. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, matematik og skriftlig rapportering i 2. klasse m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Addition/subtraktion inden for 100 (7\u20138-\u00e5rige mestrer tierovergang med trecifrede tal)`, howWeAddress: `Dyrepopulationsopgaver med tal inden for 100 giver kontekstualiseret regning med tierovergang` },
      { milestone: `Multiplikation som gentagen addition (begyndende ganget\u00e6nkning)`, howWeAddress: `Dyregrupperingsark (6 bure med 3 kaniner) giver konkret forstaelse af multiplikation som gentagen addition` },
      { milestone: `Struktureret forskningsrapport (indledning, hoveddel, konklusion)`, howWeAddress: `Dyreforsknings-skabeloner med tre sektioner guider eleverne fra dataindsamling til skriftlig konklusion` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold regning inden for 50, brug tal-linje til tierovergang, og tilbyd rapportskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes regning inden for 200, multiplikationstabeller og selvstaendig dyreforskningsrapport med datadiagrammer og kildehenvisning.`,
    parentTakeaway: `Start et hjemme-dyreforskningsprojekt: vaelg et dyr, find fem fakta i en bog eller p\u00e5 biblioteket, skriv dem i en tabel, og lav en rapport. Regn med dyretal: \u201d47 pingviner paa isen, 28 springer i vandet \u2014 hvor mange er tilbage?\u201d Dyreinteressen er den staerkeste motor for selvstaendig forskning.`,
    classroomIntegration: `Dyretemaet i 2. klasse fungerer som aarsprojekt med forskningsfokus: naturfagstimen med dyreklassifikation og \u00f8kosystemer, matematiktimen med populationsdata og multiplikation, dansktimen med forskningsrapporter og pr\u00e6sentationer. Et klasseforskningsbibliotek opbygges l\u00f8bende. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, regning og skriftlig fremstilling underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Addition/subtraktion inden for 100 (dyrekontekst)`, emerging: `l\u00f8ser opgaver inden for 50 med talknopper eller tallinje`, proficient: `l\u00f8ser selvstaendigt opgaver inden for 100 med tierovergang i dyrekontekst`, advanced: `l\u00f8ser flertrinsopgaver inden for 200 og formulerer egne tekstopgaver med dyredata` },
      { skill: `Multiplikation som gentagen addition`, emerging: `taeller grupper ved gentagen addition med konkreter (3+3+3)`, proficient: `l\u00f8ser selvstaendigt gentagen-additions-opgaver og skriver dem som gange-stykker (3\u00d74)`, advanced: `anvender multiplikation fleksibelt i kontekst og forklarer sammenaengen mellem addition og multiplikation` },
      { skill: `Dyreforskningsrapport`, emerging: `skriver 3\u20134 faktas\u00e6tninger med st\u00f8tte fra skabelon og ordbank`, proficient: `skriver selvstaendigt en rapport med indledning, fakta og konklusion`, advanced: `skriver en detaljeret rapport med data, diagrammer, kildehenvisning og perspektivering` },
    ],
  },

  birds: {
    snippetAnswer: `Fugle-arbejdsark til 2. klasse (7\u20138 \u00e5r) tr\u00e6ner dobbelte soejlediagrammer, multiplikation med fugledata, systematisk artsg enkendelse og selvstaendig skrivning af fugleforskningsrapporter med data og konklusion. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse bliver fugletemaet et avanceret dataforskningsprojekt \u2014 syv- og otte\u00e5rige kan gennemf\u00f8re m\u00e5nedlige fuglet\u00e6llinger, registrere resultater i dobbelte s\u00f8jlediagrammer (januar vs. februar) og analysere \u00e6ndringer over tid. Multiplikation med fugledata (4 reder med 5 \u00e6g = ?) giver konkret gangetaenkning. Systematisk artsbestemmelse med bestemmelses n\u00f8gle introducerer videnskabelig metode. Addition og subtraktion inden for 100 med tr\u00e6kfugledata giver realistiske flertrinsproblemer. Fuglefakta-rapporter med kildehenvisning og konklusion tr\u00e6ner faglitter\u00e6r rapportering paa h\u00f8jere niveau. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig unders\u00f8gelse, data og skriftlig rapportering i 2. klasse underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Dobbelte s\u00f8jlediagrammer (7\u20138-\u00e5rige kan sammenligne to datas\u00e6t visuelt)`, howWeAddress: `Fuglet\u00e6llings-diagrammer med to soejler pr. fugleart (m\u00e5ned 1 vs. m\u00e5ned 2) traener sammenlignende dataanalyse` },
      { milestone: `Multiplikation med naturdata (gentagen addition i kontekst)`, howWeAddress: `Fuglerede-opgaver (7 reder med 4 \u00e6g) giver multiplikation som gentagen addition med autentiske data` },
      { milestone: `Systematisk artsbestemmelse (brug af bestemmelses n\u00f8gle)`, howWeAddress: `Fuglebestemmelses-ark med ja/nej-sp\u00f8rgsm\u00e5l (r\u00f8dt bryst? lang hale?) introducerer systematisk klassifikation` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug enkle soejlediagrammer med tre arter, hold multiplikation ved 2-tabellen, og tilbyd artsbestemmelse med kun fire fugle. For avancerede elever i 2. klasse tilf\u00f8jes tredobbelte diagrammer, multiplikation i 5- og 10-tabellen, og selvstaendig fugleforskningsrapport med hypotese og konklusion.`,
    parentTakeaway: `F\u00f8r en fugle-forskningsdagbog: t\u00e6l fugle ved foderbraettet hver weekend og lav et dobbelt s\u00f8jlediagram (denne uge vs. forrige uge). Regn med reder: \u201d3 reder med 5 \u00e6g \u2014 hvor mange tilsammen?\u201d Brug en fuglebog til artsbestemmelse. Systematisk observation er den bedste forskningstraening.`,
    classroomIntegration: `Fugletemaet i 2. klasse koerer som aarsprojekt med m\u00e5nedlige dataindsamlinger: matematiktimen analyserer fugledata med diagrammer og multiplikation, naturfagstimen bestemmer arter og studerer traekm\u00f8nstre, dansktimen skriver fugleforskningsrapporter. En klassefugle-database opbygges digitalt eller analogt. F\u00e6lles M\u00e5ls m\u00e5l for data, naturfag og rapportskrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Dobbelte s\u00f8jlediagrammer (fugledata)`, emerging: `afl\u00e6ser et enkelt s\u00f8jlediagram med st\u00f8tte og besvarer sp\u00f8rgsm\u00e5l`, proficient: `opretter og afl\u00e6ser selvstaendigt dobbelte s\u00f8jlediagrammer og sammenligner data`, advanced: `analyserer tendenser over tid, formulerer konklusioner og foresl\u00e5r forklaringer` },
      { skill: `Multiplikation med fugledata`, emerging: `loser gentagen addition (4+4+4) med konkreter og billedst\u00f8tte`, proficient: `skriver selvstaendigt gentagen addition som gange-stykke og loser opgaver i 2-, 5- og 10-tabellen`, advanced: `anvender multiplikation fleksibelt i nye kontekster og verificerer med gentagen addition` },
      { skill: `Fugleforskningsrapport`, emerging: `skriver 3\u20134 saetninger med stoette fra skabelon og ordbank`, proficient: `skriver selvstaendigt en rapport med data, observation og konklusion`, advanced: `skriver en detaljeret rapport med hypotese, metode, resultater og perspektivering` },
    ],
  },

  birthday: {
    snippetAnswer: `Foedselsdags-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener positionsvaerdi til 1000, pengematematik med budget, klokkesl\u00e6t og tidsberegning samt selvstaendig skrivning af festplanlaegning med flere afsnit. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse faar foedselsdagstemaet avanceret matematisk dybde \u2014 syv- og otteaarige arbejder med positionsvaerdi til 1000 (et foedselsdagsmaratondansehold indsamlede 365 kr.), pengematematik med budgetlaegning (50 kr. til gaver, 80 kr. til kage \u2014 hvad koster festen?), og tidsberegning med klokkesl\u00e6t (festen starter kl. 14:00, varer 2\u00bd time \u2014 hvornaar slutter den?). Multiplikation med festgenstande (8 gaester med 3 balloner = ?) giver gentagen addition i festkontekst. Skrivning af festinvitationer og -beskrivelser kr\u00e6ver flervalgsafsnit med detaljer om tid, sted og aktiviteter. F\u00e6lles M\u00e5ls m\u00e5l for positionsvaerdi, penge, tid og skriftlig kommunikation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Positionsvaerdi til 1000 (7\u20138-\u00e5rige forst\u00e5r hundreder, tiere og enere)`, howWeAddress: `Foedselsdagstal-ark, hvor eleverne opdeler priser og beloeb i hundreder, tiere og enere med festkontekst` },
      { milestone: `Pengematematik med budget (addition/subtraktion med kroner og oere)`, howWeAddress: `Festbudget-ark, hvor eleverne planlaegger indkoeb, adderer priser og finder byttepenge` },
      { milestone: `Tidsberegning med klokkesl\u00e6t (varighed i timer og minutter)`, howWeAddress: `Festprogram-ark med start- og sluttider, hvor eleverne beregner varighed og planlaegger et tidsforloeb` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold positionsvaerdi inden for 100, brug hele kroner uden oere, og giv tidsberegning med hele timer. For avancerede elever i 2. klasse tilf\u00f8jes positionsvaerdi til 1000 med omveksling, prisberegning med oere og decimaltal, og tidsberegning med halve og kvarte timer i komplekse festprogrammer.`,
    parentTakeaway: `Planlaeeg barnets foedselsdag som et mateprojekt: lav et budget p\u00e5 300 kr. og regn sammen (kage 85 kr. + pynt 45 kr. + gaver 120 kr.). Beregn tider: \u201dfesten starter kl. 14 og varer 2\u00bd time \u2014 hvornaar skal vi rydde op?\u201d Multiplik\u00e9r: \u201d8 gaester med 3 slikposer.\u201d Festmatematik er den sjoveste matematik.`,
    classroomIntegration: `Foedselsdagstemaet i 2. klasse bruges til positionsvaerdi med trecifrede foedselsdagstal, pengematematik med festbudgetter, tidsberegning med festprogrammer og skrivning af invitationer og festbeskrivelser med flere afsnit. Klassens foedselsdagskalender giver anledning til statistik over foedselsmaaneder. F\u00e6lles M\u00e5ls m\u00e5l for positionsvaerdi, penge, tid og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Positionsvaerdi til 1000`, emerging: `identificerer tiere og enere i tocifrede tal med stoette`, proficient: `opdeler selvstaendigt trecifrede tal i hundreder, tiere og enere og sammenligner dem`, advanced: `omveksler mellem positionsenheder, runder tal og forklarer positionsvaerdi med egne ord` },
      { skill: `Pengematematik (budget)`, emerging: `adderer to priser i hele kroner inden for 100 kr. med stoette`, proficient: `planlaegger selvstaendigt et budget, adderer flere poster og finder byttepenge`, advanced: `loser flertrins budgetopgaver med begr\u00e6nsninger og optimerer indkoeb` },
      { skill: `Tidsberegning (klokkesl\u00e6t)`, emerging: `aflaeses hele timer p\u00e5 analogt ur og beregner varighed i hele timer`, proficient: `beregner selvstaendigt varighed med timer og halve timer og planlaegger et tidsforloeb`, advanced: `beregner med minutter, konverterer mellem analog og digital tid og l\u00f8ser tidsforloebsproblemer` },
    ],
  },

  body: {
    snippetAnswer: `Krop-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener organsystemer og deres sammenaeng, maaling med centimeter og meter, sundhedsdata i tabeller og selvstaendig skrivning af sundhedsrapporter med argumentation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse udvides kropstemaet til systemtaenkning \u2014 syv- og otteaarige forstaar, at organer arbejder sammen i systemer (kredsloebssystemet: hjerte pumper blod gennem aarer til muskler). M\u00e5ling udvides til meter og centimeter med omregning (125 cm = 1 m 25 cm). Pulsdataindsamling foer og efter bevaegelse giver diagrammer med to datasaet. Sundhedsvalg diskuteres med argumentation (\u201dhvorfor er bevaegelse godt for hjertet?\u201d). Multiplikation med kropstal (2 haender med 5 fingre = 10) giver funktionel gangetaenkning. Skrivning af sundhedsrapporter med p\u00e5stand og begrundelse traener argumenterende tekst. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, maaling og skriftlig argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Organsystemer og sammenh\u00e6ng (7\u20138-\u00e5rige forst\u00e5r, at organer arbejder sammen)`, howWeAddress: `System-diagrammer, hvor eleverne forbinder organer i kredsloeb og fordoejelse, opbygger systemforstaelse` },
      { milestone: `Maaling med cm og m med omregning (125 cm = 1 m 25 cm)`, howWeAddress: `Kropsmaaling-ark, hvor eleverne maaler i cm, omregner til m og sammenligner paa tvaers af klassen` },
      { milestone: `Argumenterende sundhedsskrivning (pastand + begrundelse)`, howWeAddress: `Sundhedsargument-ark med rammer for \u201djeg mener... fordi...\u201d traener skriftlig argumentation om sundhed` },
    ],
    differentiationNotes: `For elever der har brug for stoette, begraens til to organsystemer, maal kun i hele centimeter, og tilbyd saetningsstartere til argumentation. For avancerede elever i 2. klasse tilf\u00f8jes fire organsystemer med forklarende diagrammer, maaling med millimeter og omregning, og selvstaendig sundhedsdebat med flere argumenter.`,
    parentTakeaway: `Maal barnets hoejde i centimeter og omregn til meter: \u201d132 cm er 1 meter og 32 centimeter.\u201d Foer en sundhedsdagbog: noter bevaegelse, soevn og maaltider. Diskuter: \u201dhvorfor er det godt at loebe? Hvad sker der med hjertet?\u201d Lad barnet skrive: \u201djeg synes, bevaegelse er vigtigt, fordi...\u201d Kroppen er det mest personlige laeringsemne.`,
    classroomIntegration: `Kropstemaet i 2. klasse integreres som sundhedsprojekt: naturfagstimen med organsystemer og kropsdiagrammer, matematiktimen med kropsmaaling og dataindsamling, dansktimen med sundhedsrapporter og argumentation, idraettstimen med pulsmaaling og dataregistrering. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, maaling og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Organsystemer og sammenhaeng`, emerging: `navngiver 2\u20133 organer og deres funktion med billedst\u00f8tte`, proficient: `forklarer selvstaendigt to organsystemer og hvordan organerne arbejder sammen`, advanced: `forbinder flere systemer, forklarer aarsa g-virkning og relaterer til sundhedsvalg` },
      { skill: `Maaling med cm og m (kropsdata)`, emerging: `maaler i hele cm med stoette og noterer resultatet`, proficient: `maaler selvstaendigt i cm, omregner til m og sammenligner maal paa tvaers`, advanced: `maaler med mm-praecision, omregner fleksibelt og analyserer maaldata statistisk` },
      { skill: `Argumenterende sundhedsskrivning`, emerging: `skriver 1\u20132 saetninger med saetningsstartere (\u201djeg synes...\u201d)`, proficient: `skriver selvstaendigt et sundhedsargument med paastand, begrundelse og eksempel`, advanced: `skriver en sammenhaegende sundhedsdebat med flere argumenter, modargument og konklusion` },
    ],
  },

  camping: {
    snippetAnswer: `Camping-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener kortlaesning med koordinater, afstandsberegning i meter, multiplikation med pakkelister og selvstaendig skrivning af campingdagboeger med flere afsnit. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse bliver campingtemaet et avanceret orienterings- og beregningsprojekt \u2014 syv- og otteaarige kan laese kort med enkle koordinater (A3, B5), beregne afstande i meter med addition og subtraktion inden for 100, og planlaegge pakkelister med multiplikation (4 dage med 2 saetstykker toej = ?). Kompasretninger udvides til otte retninger (nordoest, sydvest). Tidsberegning for dagsprogrammer (vandrestart kl. 9:30, ankomst kl. 11:45 \u2014 hvor lang tid?) giver funktionel klokkeregning. Campingdagboeger med kronologisk opbygning, beskrivelser og refleksion traener struktureret skrivning. F\u00e6lles M\u00e5ls m\u00e5l for rumlig orientering, maaling, multiplikation og skrivning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Koordinatlaesning paa kort (7\u20138-\u00e5rige kan lokalisere punkter med bogstav-tal-koordinater)`, howWeAddress: `Campingkort-ark med A-F/1-6-gitter, hvor eleverne finder og markerer steder med koordinater` },
      { milestone: `Afstandsberegning i meter (addition/subtraktion med laengdemaal)`, howWeAddress: `Ruteplanlaegning p\u00e5 campingkort med meterangivelser, hvor eleverne adderer delstraekninger` },
      { milestone: `Multiplikation med pakkelister (gange-taenkning i kontekst)`, howWeAddress: `Pakkeliste-ark (5 dage \u00d7 3 maaltider = 15 maaltider) giver multiplikation i praktisk planlaegningskontekst` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug et simpelt 3\u00d73-gitter, hold afstande under 50 m, og begr\u00e6ns multiplikation til 2-tabellen. For avancerede elever i 2. klasse tilf\u00f8jes 8\u00d78-koordinatgitter, afstandsberegning med kilometer og meter, og multiplikation med flercifrede tal i avancerede pakkelister.`,
    parentTakeaway: `Planlaeg en campingtur som et mateprojekt: tegn et kort over campingpladsen med koordinater, beregn afstande (\u201d120 m til toilettet + 85 m til soeen = 205 m\u201d), og lav pakkelisten med gange (\u201d3 dage gange 2 t-shirts\u201d). Skriv en dagbog sammen bagefter. Udendoersmatematik er den bedste matematik.`,
    classroomIntegration: `Campingtemaet i 2. klasse bruges som tvaerfagligt udeskole-projekt: matematik med koordinater, afstandsberegning og multiplikation, dansk med dagboegsskrivning og ruteplanlaegning, naturfag med naturobservation og artsgenkendelse. En klasse-campingdag afslutter temaet. F\u00e6lles M\u00e5ls m\u00e5l for orientering, maaling, multiplikation og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Koordinatlaesning og kortorientering`, emerging: `finder steder p\u00e5 et kort med 3\u00d73-gitter med stoette`, proficient: `lokaliserer selvstaendigt steder med bogstav-tal-koordinater p\u00e5 et 6\u00d76-gitter`, advanced: `planlaegger ruter med koordinater, bruger kompasretninger og beregner afstande paa kortet` },
      { skill: `Afstandsberegning i meter`, emerging: `adderer to afstande under 50 m med stoette`, proficient: `adderer og subtraherer selvstaendigt afstande inden for 200 m i rutekontekst`, advanced: `beregner med km og m, omregner og loser flertrinsproblemer med afstande` },
      { skill: `Multiplikation med pakkelister`, emerging: `loser gentagen addition (3+3+3) med konkreter og billedstotte`, proficient: `skriver selvstaendigt gange-stykker fra pakkelister og loser dem (5\u00d74=20)`, advanced: `anvender multiplikation fleksibelt i nye planlaegningskontekster og verificerer med division` },
    ],
  },

  circus: {
    snippetAnswer: `Cirkus-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener multiplikation med cirkusgrupper, symmetri og spejling, avancerede moenstre med variabel og selvstaendig skrivning af cirkusanmeldelser med argumentation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse bliver cirkustemaet et avanceret matematik- og skrivevaerksted \u2014 syv- og otteaarige arbejder med multiplikation i cirkuskontekst (3 ringe med 5 akrobater = ?), udvidet symmetri med spejling og rotation af cirkusmotiver, og moensterregler med en \u201dukendt\u201d (ABCABC-moenstre, hvor eleverne finder det naeste element). Addition og subtraktion inden for 100 med billetsalg og publikumstal giver realistisk regning. Skrivning af cirkusanmeldelser med mening, begrundelse og anbefaling traener argumenterende tekst. Cirkusordforraad som trapezkunstner, equilibrist og dompteur udvider fagsprog. F\u00e6lles M\u00e5ls m\u00e5l for multiplikation, geometri og skriftlig argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Multiplikation med grupper (7\u20138-\u00e5rige mestrer gentagen addition og gange-notation)`, howWeAddress: `Cirkusgruppe-ark (4 shows med 6 numre) giver multiplikation som gentagen addition i underholdningskontekst` },
      { milestone: `Spejling og rotation (udvidet symmetri med transformation)`, howWeAddress: `Cirkusmotiv-spejlingsark, hvor eleverne tegner den spejlede version af klovne og akrobater praecist` },
      { milestone: `Argumenterende anmeldelse (mening + begrundelse + anbefaling)`, howWeAddress: `Cirkusanmeldelses-skabeloner med rammer for \u201djeg synes... fordi... jeg anbefaler...\u201d traener meningsbaseret skrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold multiplikation i 2- og 5-tabellen, brug enkel spejling med gitterlinjer, og tilbyd saetningsstartere til anmeldelser. For avancerede elever i 2. klasse tilf\u00f8jes multiplikation i 3-, 4- og 6-tabellen, rotation af figurer, og fri anmeldelseskrivning med flere argumenter og sammenligninger.`,
    parentTakeaway: `Se et cirkusshow og skriv en anmeldelse sammen: \u201djeg synes, akrobaterne var bedst, fordi...\u201d Regn med cirkustal: \u201d4 ringe med 3 klovne \u2014 hvor mange tilsammen?\u201d Tegn symmetriske klovneansigter og spejl dem. Cirkus er kreativitet, matematik og argumentation i \u00e9t.`,
    classroomIntegration: `Cirkustemaet i 2. klasse bruges som kreativ temauge: matematiktimen med multiplikation og symmetriark, dansktimen med cirkusanmeldelser og ordforraad, kunsttimen med spejling og rotation af cirkusmotiver, og drama med cirkusnumre. Billetsalgsmatematik integrerer penge og multiplikation. F\u00e6lles M\u00e5ls m\u00e5l for multiplikation, geometri og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Multiplikation med cirkusgrupper`, emerging: `taeller grupper med gentagen addition med konkreter (5+5+5)`, proficient: `skriver selvstaendigt gange-stykker fra cirkusscenarier og loser dem korrekt`, advanced: `anvender multiplikation fleksibelt, vender opgaver om (20 akrobater i 4 grupper = ?) og verificerer` },
      { skill: `Spejling og symmetri (cirkusmotiver)`, emerging: `tegner den spejlede halvdel af et enkelt motiv med gitterst\u00f8tte`, proficient: `spejler selvstaendigt komplekse cirkusmotiver praecist over en akse`, advanced: `udf\u00f8rer baade spejling og rotation, forklarer begreberne og finder dem i hverdagen` },
      { skill: `Argumenterende cirkusanmeldelse`, emerging: `skriver 2\u20133 saetninger med mening og enkel begrundelse med stoette`, proficient: `skriver selvstaendigt en anmeldelse med mening, begrundelse og anbefaling`, advanced: `skriver en detaljeret anmeldelse med flere argumenter, sammenligning og nuanceret konklusion` },
    ],
  },

  clothing: {
    snippetAnswer: `Toej-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener pengematematik med kroner og oere, multiplikation med toejindkoeb, sortering i Venn-diagrammer og selvstaendig skrivning af toejguider med argumentation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse faar toejtemaet oekonomisk og analytisk dybde \u2014 syv- og otteaarige kan arbejde med priser i kroner og oere (jakke: 199,50 kr.), beregne byttepenge, multiplicere toejindkoeb (3 par sokker a 25 kr.) og sortere toej i Venn-diagrammer med to kriterier (varmt OG vandtaet vs. kun varmt). Procentbegrebet introduceres visuelt (\u201d50% rabat \u2014 halvdelen af prisen\u201d). Stoerrelsesskemaer med cm-maaling forbinder abstrakte tal med kropsmaaling. Skrivning af toejguider (\u201dhvilken jakke er bedst til vinter? Jeg anbefaler... fordi...\u201d) traener argumenterende tekst. F\u00e6lles M\u00e5ls m\u00e5l for penge, multiplikation og skriftlig argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Pengematematik med kroner og oere (7\u20138-\u00e5rige arbejder med decimalpriser)`, howWeAddress: `Toejbutik-ark med priser i kr. og oere, hvor eleverne adderer, finder byttepenge og sammenligner tilbud` },
      { milestone: `Multiplikation med indkoeb (antal gange stykpris)`, howWeAddress: `Indkoebsopgaver (4 t-shirts a 45 kr.) giver multiplikation i hverdagskontekst` },
      { milestone: `Venn-diagrammer med to kriterier (overlappende egenskaber)`, howWeAddress: `Toej-Venn-diagrammer, hvor eleverne sorterer efter to kriterier (materiale OG aarsttid), traener logisk taenkning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug hele kroner uden oere, hold multiplikation i 2- og 5-tabellen, og brug Venn-diagrammer med kun to kategorier. For avancerede elever i 2. klasse tilf\u00f8jes prisberegning med oere og decimaltal, multiplikation med tocifrede priser, og tredobbelte Venn-diagrammer med argumentation.`,
    parentTakeaway: `Goer toejshopping til avanceret matematik: \u201ddenne troeje koster 149,50 kr. \u2014 du betaler med 200 kr., hvad faar du tilbage?\u201d Multiplic\u00e9r: \u201d3 par sokker til 29 kr.\u201d Sortter vintertoej: hvad er baade varmt OG vandtaet? Lad barnet skrive en toejguide: \u201djeg anbefaler denne jakke, fordi...\u201d Hverdagsokonomi er den bedste matematiklaerer.`,
    classroomIntegration: `Toejtemaet i 2. klasse bruges som oekonomiprojekt: matematiktimen med prisberegning, multiplikation og Venn-diagrammer, dansktimen med toejguider og argumentation, naturfag med materialeundersoegelse (bomuld vs. polyester). En klassebutik med rigtigt sortiment forbinder alle fag. F\u00e6lles M\u00e5ls m\u00e5l for penge, multiplikation, logik og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Pengematematik med toejpriser`, emerging: `adderer to priser i hele kroner inden for 100 med stoette`, proficient: `adderer selvstaendigt priser med kroner og oere, finder byttepenge og sammenligner tilbud`, advanced: `loser flertrins budgetopgaver med rabatter og optimerer indkoeb med begr\u00e6nsninger` },
      { skill: `Multiplikation med indkoeb`, emerging: `loser gentagen addition med konkreter (25+25+25)`, proficient: `skriver selvstaendigt gange-stykker fra indkoebsscenarier og loser dem korrekt`, advanced: `multiplicerer med tocifrede tal, vender opgaver om (120 kr. for 4 par = pris pr. par) og verificerer` },
      { skill: `Venn-diagrammer (toejsortering)`, emerging: `sorterer toej i to grupper med stoette`, proficient: `udfylder selvstaendigt et Venn-diagram med to kriterier og forklarer overlapzonen`, advanced: `opretter egne Venn-diagrammer med tre kriterier og drager logiske konklusioner` },
    ],
  },

  colors: {
    snippetAnswer: `Farve-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener broeker med farvedeling, dobbelte soejlediagrammer, farveteori med primaer- og sekundaerfarver og selvstaendig skrivning af farveforsoegsrapporter. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse udvikles farvetemaet til et systematisk eksperiment \u2014 syv- og otteaarige arbejder med broeker ud over halvdele (tredjedele, fjerdedele, sjettedele) ved at dele farvecirkler og sammenlignebroeker visuelt. Dobbelte soejlediagrammer sammenligner farvedata fra to klasser eller to tidspunkter. Farveteori udvides til primaer-, sekundaer- og tertiaerfarver med systematiske blandingsforsoegs. Multiplikation med farveforhold (3 dele blaa + 1 del gul = groen, 4 portioner = ?) giver gangetaenkning i praksis. Farveforsoegsrapporter med hypotese, fremgangsmaade og konklusion traener naturvidenskabelig rapportering. F\u00e6lles M\u00e5ls m\u00e5l for broeker, data og naturfaglig rapportering i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Broeker ud over halvdele (7\u20138-\u00e5rige arbejder med tredjedele, fjerdedele og sjettedele)`, howWeAddress: `Farvecirkel-delingsark med tredjedele, fjerdedele og sjettedele, hvor eleverne farvelaegger og sammenligner broekers stoerrelse` },
      { milestone: `Dobbelte soejlediagrammer (sammenligning af to datasaet)`, howWeAddress: `Farvedataark, hvor eleverne opretter dobbelte soejlediagrammer og analyserer forskelle mellem datasaet` },
      { milestone: `Naturvidenskabelig rapportering (hypotese, metode, resultat, konklusion)`, howWeAddress: `Farveforsoeg-rapportskabeloner med fire sektioner guider eleverne gennem videnskabelig rapportering` },
    ],
    differentiationNotes: `For elever der har brug for stoette, begraens til halvdele og fjerdedele, brug enkle soejlediagrammer, og tilbyd saetningsstartere til rapporter. For avancerede elever i 2. klasse tilf\u00f8jes sjettedele og ottendedele, tredobbelte diagrammer, og selvstaendig forsoegsrapport med dataanalyse og perspektivering.`,
    parentTakeaway: `Bland vandfarver og lav et forsoeg: \u201dhvad sker der, naar vi blander roed og blaa? Hvad troede du ville ske?\u201d Skriv en forsogsrapport sammen: \u201dvi troede... vi blandede... resultatet blev...\u201d Del farvecirkler i fjerdedele og tredjedele. Farver er den smukkeste indgang til naturvidenskab.`,
    classroomIntegration: `Farvetemaet i 2. klasse integreres som naturvidenskabeligt forsoegsprojekt: matematiktimen med broekark og datadiagrammer, naturfagstimen med farveblanding og forsoegsrapporter, kunsttimen med farveteori og komposition. En farveforsoegs-udstilling afslutter temaet. F\u00e6lles M\u00e5ls m\u00e5l for broeker, data og naturfaglig rapportering underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Broekforstaelse (farvecirkler)`, emerging: `farvelaegger halvdele og fjerdedele med billedst\u00f8tte`, proficient: `deler selvstaendigt cirkler i tredjedele og fjerdedele, navngiver broekerne og sammenligner stoerrelse`, advanced: `arbejder med sjettedele og ottendedele, sammenligner broeker paa tvaers og loser enkle broekopgaver` },
      { skill: `Dobbelte soejlediagrammer (farvedata)`, emerging: `aflaeses et enkelt soejlediagram med stoette`, proficient: `opretter og aflaeses selvstaendigt dobbelte soejlediagrammer og sammenligner datasaet`, advanced: `analyserer tendenser, formulerer konklusioner og foresl\u00e5r forklaringer p\u00e5 forskelle` },
      { skill: `Forsoegsrapportering (farvekontekst)`, emerging: `beskriver et forsoegsresultat i 2\u20133 saetninger med stoette`, proficient: `skriver selvstaendigt en rapport med hypotese, fremgangsmaade og konklusion`, advanced: `skriver en detaljeret rapport med dataanalyse, fejlkilder og perspektivering` },
    ],
  },

  construction: {
    snippetAnswer: `Byggeri-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener 3D-former og deres egenskaber, maaling med mm-praecision, areal og omkreds i centimeter og selvstaendig skrivning af byggebeskrivelser med fagtermer. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse udvikles byggetemaet til formel geometri \u2014 syv- og otteaarige arbejder med 3D-former (kube, kegle, cylinder, prisme), identificerer flader, kanter og hjoerner, og beregner areal og omkreds af enkle figurer med centimeter. Maaltegning med mm-praecision kr\u00e6ver avanceret linealanvendelse. Multiplikation med byggematerialer (4 vaegge med 12 mursten = ?) giver gangetaenkning i byggekontekst. Byggebeskrivelser med fagtermer (vinkelret, parallel, symmetrisk) traener fagsprog. F\u00e6lles M\u00e5ls m\u00e5l for geometri, maaling og problemloesning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `3D-formanalyse (7\u20138-\u00e5rige identificerer flader, kanter og hjoerner)`, howWeAddress: `3D-form-analyseark, hvor eleverne taeller flader, kanter og hjoerner p\u00e5 kuber, cylindre og prismer` },
      { milestone: `Areal og omkreds (begyndende beregning med cm)`, howWeAddress: `Bygge-areal-ark, hvor eleverne taeller kvadratcentimeter og maaler sider for at beregne omkreds` },
      { milestone: `Maaltegning med mm-praecision (avanceret linealanvendelse)`, howWeAddress: `Byggetegnings-ark, hvor eleverne tegner figurer efter maalsat med millimeter-noejagtighed` },
    ],
    differentiationNotes: `For elever der har brug for stoette, begraens til tre 3D-former, beregn kun omkreds med hele centimeter, og tilbyd foerdigmaalt gitterpapir til areal. For avancerede elever i 2. klasse tilf\u00f8jes alle seks 3D-grundformer, arealberegning med multiplikation, og selvstaendig design af byggetegninger med maalsaet og fagtermer.`,
    parentTakeaway: `Byg med LEGO og taenk geometri: \u201dhvor mange flader har denne klods? Kanter? Hjoerner?\u201d Maal gulvet i barnets vaerelse: \u201dhvor mange skridt langt? Maal med maaleb\u00e5nd \u2014 laengde gange bredde.\u201d Tegn droemhuset med maal i centimeter. Matematik i 2. klasse handler om at maale, beregne og beskrive den virkelige verden praecist.`,
    classroomIntegration: `Byggetemaet i 2. klasse forbinder geometri og praktisk matematik: geometritimen analyserer 3D-former i bygninger, maaletimen beregner areal og omkreds, konstruktionshjoernet bygger efter maaltegninger, og dansktimen skriver byggebeskrivelser med fagtermer. Et klasseprojekt om modelbyggeri integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for geometri, maaling og problemloesning moedes.`,
    assessmentRubric: [
      { skill: `3D-formanalyse (flader, kanter, hjoerner)`, emerging: `navngiver kube og cylinder med stoette og taeller flader paa \u00e9n form`, proficient: `identificerer selvstaendigt 4\u20135 3D-former, taeller flader/kanter/hjoerner og beskriver egenskaber`, advanced: `sammenligner 3D-former systematisk, forklarer forskelle og relaterer dem til virkelige bygninger` },
      { skill: `Areal og omkreds i cm`, emerging: `taeller kvadrater paa gitterpapir med stoette for at finde arealet`, proficient: `beregner selvstaendigt areal ved kvaadratcentimeter-taelling og omkreds ved sidemaaling`, advanced: `beregner areal med multiplikation (laengde \u00d7 bredde) og loser omkredsopgaver med ukendte sider` },
      { skill: `Byggebeskrivelse med fagtermer`, emerging: `beskriver en bygning med 2\u20133 saetninger og hverdagssprog`, proficient: `skriver selvstaendigt en byggebeskrivelse med geometriske fagtermer (vinkelret, parallel, symmetrisk)`, advanced: `skriver en detaljeret byggebeskrivelse med maal, diagrammer og begrundelse for designvalg` },
    ],
  },

  cooking: {
    snippetAnswer: `Madlavnings-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener broeker i opskrifter, maaling med g og dl, multiplikation ved skalering og selvstaendig skrivning af opskrifter med naeringsberegning. Koekkenmatematik paa hoejt niveau. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse bliver madlavningstemaet et avanceret maale- og broeklaboratorium \u2014 syv- og otteaarige kan skalere opskrifter med multiplikation (dobbelt portion: 2 \u00d7 3 dl = 6 dl), arbejde med broeker i praksis (en tredjedel af 300 g mel), og beregne naeringsindhold med addition af flercifrede tal. Maaling med gram, deciliter og milliliter kr\u00e6ver praecision og enhedsvalg. Tidsberegning for bagetider (ind i ovnen kl. 13:15, bager 45 min \u2014 hvornaar er det faerdigt?) giver funktionel klokkeregning. Proceduretekst udvides til opskrifter med ingrediensliste, fremgangsmaade og naeringsoplysninger. F\u00e6lles M\u00e5ls m\u00e5l for broeker, maaling og proceduretekst i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Broeker i praktisk kontekst (7\u20138-\u00e5rige kan halvere, tredjedele og fordoble maengder)`, howWeAddress: `Opskriftskaleringsark, hvor eleverne halverer og fordobler ingredienser med broekberegning` },
      { milestone: `Maaling med flere enheder (g, dl, ml med enhedsvalg)`, howWeAddress: `Praecisionsmaalings-ark, hvor eleverne vaelger korrekt enhed og maaler ingredienser noejagtigt` },
      { milestone: `Tidsberegning med minutter (bagetider og ventetider)`, howWeAddress: `Bagetids-beregningsark, hvor eleverne adderer og subtraherer minutter med klokkeslaet i kontekst` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug kun halvering med hele tal, maal i hele dl og runde gram-tal, og giv tidsberegning med hele kvarter. For avancerede elever i 2. klasse tilf\u00f8jes tredjedeling og firededeling, maaling med ml og g med decimaltal, og selvstaendig opskriftskrivning med naeringsberegning.`,
    parentTakeaway: `Bag sammen og lad barnet skalere opskriften: \u201dvi skal lave dobbelt portion \u2014 2 gange 150 g mel er...?\u201d Beregn bagetiden: \u201dind kl. 15:30, bager 35 minutter \u2014 hvornaar er det faerdigt?\u201d Lad barnet skrive opskriften med ingrediensliste og trin. Koekkenmatematik er broeker, maaling og tid i \u00e9t.`,
    classroomIntegration: `Madlavningstemaet i 2. klasse integreres som tvaerfagligt projekt: matematiktimen med broeker og skaleringsark, dansktimen med opskriftskrivning og proceduretekst, naturfagstimen med naering og sundhed. Ugentlig bagning med beregningsark forbinder teori og praksis. F\u00e6lles M\u00e5ls m\u00e5l for broeker, maaling og proceduretekst underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Broeker i opskriftkontekst`, emerging: `halverer enkle tal (2, 4, 6) med konkreter`, proficient: `halverer og fordobler selvstaendigt maengder i dl og g og beregner tredjedele af runde tal`, advanced: `skalerer opskrifter fleksibelt med broeker, forklarer strategien og verificerer med omvendt beregning` },
      { skill: `Maaling med g, dl og ml`, emerging: `maaler med \u00e9n enhed (dl) med stoette og runde tal`, proficient: `vaelger selvstaendigt korrekt enhed, maaler praecist og noterer resultatet med enheds angivelse`, advanced: `omregner mellem enheder (1 dl = 100 ml), maaler med mm-praecision og loser maaleproblemmer` },
      { skill: `Tidsberegning (bagetider)`, emerging: `adderer hele kvarterer til et klokkeslaet med stoette`, proficient: `beregner selvstaendigt start- og sluttider med minutter og planlaegger et bagepprogram`, advanced: `loser komplekse tidsfoerloebs-problemer med flere trin og konverterer mellem timer og minutter` },
    ],
  },

  dinosaurs: {
    snippetAnswer: `Dinosaur-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener store tal og stoerrelsesordenr, tidslinjer med millioner af aar, sammenlignende dataanalyse og selvstaendig skrivning af dinosaurforskningsrapporter med kilder. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse udnyttes dinosaurfascinationen til akademisk praecision \u2014 syv- og otteaarige kan arbejde med store tal (T-rex vejede 7.000 kg!) og forstaa stoerelsesorden, placere dinosaurer paa tidslinjer med millioner af aar, og sammenligne artsdata i tabeller med flere kolonner. Multiplikation med dinosaurtal (5 triceratops med 3 horn = 15 horn) giver gangetaenkning. Venn-diagrammer udvides til tre grupper (planteaedere, koedaedere, altaedere). Forskningsrapporter med kildehenvisning og konklusion traener akademisk skrivning. F\u00e6lles M\u00e5ls m\u00e5l for store tal, data og skriftlig rapportering i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Store tal og stoerelsesorden (7\u20138-\u00e5rige forstaar tusinder og sammenligner stoerelseer)`, howWeAddress: `Dinosaur-stoerrelses-ark, hvor eleverne ordner arter efter vaegt/laengde og arbejder med tusindetal` },
      { milestone: `Tidslinjer med millioner (begribelse af dyb tid)`, howWeAddress: `Geotidslinjeark, hvor eleverne placerer dinosaurer i perioder og arbejder med millioner som tidsenhied` },
      { milestone: `Akademisk forskningsrapport med kildehenvisning`, howWeAddress: `Forskningsrapport-skabeloner med felter for kilde, fakta og konklusion guider akademisk skrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug tal inden for 100 til sammenligning, forenklede tidslinjer med tre perioder, og rapportskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes tal i tusinder med sammenligning, tidslinjer med underperioder, og selvstaendig forskningsrapport med flere kilder og perspektivering.`,
    parentTakeaway: `Foelg dinosaurinteressen med matematik: \u201dT-rex var 12 m lang og vejede 7000 kg \u2014 stegosaurus var 9 m og vejede 5000 kg. Hvad er forskellen?\u201d Lav en tidslinje paa gulvet med meterstok. Lad barnet skrive en forskningsrapport om sin yndlingsdinosaur med tre kilder. Store tal bliver spaendende med dinosaurer.`,
    classroomIntegration: `Dinosaurtemaet i 2. klasse er det ideelle forskningsprojekt: naturfagstimen med tidslinjer og klassifikation, matematiktimen med store tal og datasammenligning, dansktimen med forskningsrapporter og prasentationer. Et klassedinosaurmuseum med elevernes rapporter fejrer laeringsresultaterne. F\u00e6lles M\u00e5ls m\u00e5l for store tal, data og skriftlig rapportering underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Store tal og stoerelsesorden (dinosaurkontekst)`, emerging: `sammenligner to dinosaurers stoerrelse med stoette (stoerst/mindst)`, proficient: `ordner selvstaendigt tal i tusinder, sammenligner og beregner forskelle`, advanced: `arbejder fleksibelt med tal til 10.000, runder og estimerer i dinosaurkontekst` },
      { skill: `Tidslinjer med dyb tid`, emerging: `placerer 2\u20133 dinosaurer paa en tidslinje med tre perioder med stoette`, proficient: `placerer selvstaendigt 5+ dinosaurer korrekt og forklarer periodernes raekkefoelge`, advanced: `forklarer tidsforskelle i millioner af aar og relaterer til Jordens historie` },
      { skill: `Dinosaurforskningsrapport`, emerging: `skriver 3\u20134 saetninger med stoette fra skabelon og ordbank`, proficient: `skriver selvstaendigt en rapport med indledning, fakta, konklusion og \u00e9n kilde`, advanced: `skriver en detaljeret rapport med flere kilder, datasammenligning og perspektivering` },
    ],
  },

  easter: {
    snippetAnswer: `Paaske-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener division som deling, broeker med chokolade og aeg, multiplikation med paasketal og selvstaendig skrivning af paaskehistorier med dialog og beskrivelse. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse faar paasketemaet avanceret matematisk dybde \u2014 syv- og otteaarige arbejder med division som den omvendte operation af multiplikation (24 aeg fordelt paa 6 kurve = 4 i hver), broeker med konkret deling af paaskeaeg og chokolade (en fjerdedel af 20 aeg = 5 aeg), og multiplikation med paaskedata (8 boern med 3 aeg = 24 aeg). Moenstre udvides til talfoelger med regler (2, 5, 8, 11 \u2014 hvad er reglen?). Dataindsamling med dobbelte soejlediagrammer sammenligner paaskejagt-resultater. Kreativ skrivning af paaskehistorier med dialog, beskrivelse og overraskende handling traener avanceret fortaelleteknik. F\u00e6lles M\u00e5ls m\u00e5l for division, broeker og kreativ skrivning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Division som omvendt multiplikation (7\u20138-\u00e5rige forstaar sammenhaengen mellem gange og dele)`, howWeAddress: `Paaskeaeg-divisionsark, hvor eleverne fordeler aeg ligeligt og skriver divisionsstrykker med kontrolregning` },
      { milestone: `Broeker med konkret deling (en fjerdedel af 20, en tredjedel af 12)`, howWeAddress: `Chokoladedelingsark, hvor eleverne beregner broekdele af konkrete maengder med paaskekontekst` },
      { milestone: `Talfoelger med regler (find moenstret og formuler reglen)`, howWeAddress: `Paaskemoenster-ark med talfoelger, hvor eleverne finder, forts\u00e6tter og formulerer reglen skriftligt` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold division inden for 20 med konkreter, brug kun halvdele og fjerdedele, og tilbyd billedbaserede historiestartere. For avancerede elever i 2. klasse tilf\u00f8jes division med rest, broekberegning med tredjedele og sjettedele, og fri paaskehistorieskrivning med dialog, beskrivelse og flashback.`,
    parentTakeaway: `Goer paaskejagten til avanceret matematik: \u201dvi fandt 24 aeg \u2014 fordel dem ligeligt paa 4 kurve. Hvad er en fjerdedel af 24?\u201d Find moenstre i paaskepynt: \u201droed, gul, roed, gul, roed... hvad er reglen?\u201d Lad barnet skrive en paaskehistorie med dialog. Paasken er matematik, moenstre og fortaelling i \u00e9t.`,
    classroomIntegration: `Paasketemaet i 2. klasse bruges som foraarsprojekt: matematiktimen med division, broeker og talfoelger, dansktimen med paaskehistorieskrivning og dialog, kunsttimen med moensterdesign. En klasse-paaskejagt med matematikopgaver paa hvert stop forbinder alle fag. F\u00e6lles M\u00e5ls m\u00e5l for division, broeker og kreativ skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Division som deling (paaskekontekst)`, emerging: `fordeler 10\u201312 aeg i 2 lige grupper med konkreter`, proficient: `loser selvstaendigt divisionsopgaver inden for 50 og skriver divisionsstykker med kontrolregning`, advanced: `loser division med rest, forklarer sammenhaengen med multiplikation og formulerer egne divisionsopgaver` },
      { skill: `Broeker af konkrete maengder`, emerging: `finder halvdelen af runde tal (10, 20) med konkreter`, proficient: `beregner selvstaendigt fjerdedele og tredjedele af runde tal og forklarer metoden`, advanced: `beregner broekdele af flercifrede tal, sammenligner broeker og loser broekproblemer i kontekst` },
      { skill: `Kreativ paaskeskrivning med dialog`, emerging: `skriver 3\u20134 saetninger med stoette fra billedstartere`, proficient: `skriver selvstaendigt en paaskehistorie med dialog, beskrivelse og klar handling`, advanced: `skriver en detaljeret historie med flere karakterer, dialog, beskrivelse og overraskende vendepunkt` },
    ],
  },

  emotions: {
    snippetAnswer: `Foelelses-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener avanceret perspektivtagning, konfliktanalyse med flere parter, emotionel dataindsamling og selvstaendig skrivning af foelelsesessays med argumentation og refleksion. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse bliver foelelsestemaet et avanceret socialt analyseprojekt \u2014 syv- og otteaarige kan analysere komplekse sociale situationer med flere parter, identificere blandede foelelser (glad OG nervoes paa samme tid), og anvende konkrete strategier fra en repertoire af 6\u20138 metoder (taelle til ti, gaa vaek, tale med en voksen, skrive om det). Foelelsesdata indsamles systematisk (humortermometer over en uge) og prasenteres i soejlediagrammer. Empatitraening udvides til bogkarakterers perspektiver og motiver. Skrivning af foelelsesessays med paastand, begrundelse og refleksion traener argumenterende og refleksiv tekst. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling, empati og skriftlig argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Blandede foelelser (7\u20138-\u00e5rige forstaar, at man kan foele flere ting paa \u00e9n gang)`, howWeAddress: `Blandefoelelsesark med scenarier, hvor eleverne identificerer 2\u20133 samtidige foelelser og forklarer dem` },
      { milestone: `Strategirepertoire (6\u20138 konkrete strategier til foelelseshaandtering)`, howWeAddress: `Strategikort-ark, hvor eleverne matcher situationer med egnede strategier og begrunder valget` },
      { milestone: `Foelelsesdata og selvmonitorering (humortermometer og soejlediagrammer)`, howWeAddress: `Ugentlige humortermometer-ark med diagrammering traener selvbevidsthed og dataregistrering` },
    ],
    differentiationNotes: `For elever der har brug for stoette, begraens til tre strategier med billedkort, brug enkle topersoners scenarier, og tilbyd saetningsstartere til essays. For avancerede elever i 2. klasse tilf\u00f8jes komplekse flerpartskonflikter, foelelsesanalyse af bogkarakterer med citater, og selvstaendig essayskrivning med modargument og konklusion.`,
    parentTakeaway: `Tal om blandede foelelser: \u201dman kan vaere glad for foedsselsdagen og nervoes for gaesterne paa samme tid \u2014 det er helt normalt.\u201d Foer et humortermometer: noter foelelsen ved sengetid og tal om den. Diskuter strategier: \u201dhvad goer du, naar du er frustreret?\u201d Lad barnet skrive: \u201djeg mener, det er vigtigt at tale om foelelser, fordi...\u201d`,
    classroomIntegration: `Foelelsestemaet i 2. klasse integreres som aarsprojekt: daglig check-in med humortermometer, ugentlig scenarieanalyse med strategivalg, dansktimen med foelelsesessays og karakteranalyse i laesning, matematik med foelelsesdata i soejlediagrammer. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling, empati og argumentation underst\u00f8ttes hele aaret.`,
    assessmentRubric: [
      { skill: `Blandede foelelser og nuancering`, emerging: `navngiver 4\u20136 basale foelelser og genkender, at man kan vaere glad og nervoes paa \u00e9n gang`, proficient: `identificerer selvstaendigt 2\u20133 samtidige foelelser i scenarier og forklarer dem praecist`, advanced: `analyserer blandede foelelser i komplekse situationer, relaterer til egne oplevelser og formulerer indsigter` },
      { skill: `Strategirepertoire og -valg`, emerging: `vaelger \u00e9n strategi fra billedkort med stoette i en enkel situation`, proficient: `vaelger selvstaendigt blandt 4\u20136 strategier, begrunder valget og vurderer effekten`, advanced: `tilpasser strategier til komplekse situationer, foresl\u00e5r nye strategier og reflekterer over erfaringer` },
      { skill: `Foelelsesessay (argumentation og refleksion)`, emerging: `skriver 2\u20133 saetninger med saetningsstartere om en foelelse`, proficient: `skriver selvstaendigt et essay med paastand, begrundelse og personlig refleksion`, advanced: `skriver et nuanceret essay med flere argumenter, modargument og perspektiverende konklusion` },
    ],
  },

  'fairy-tales': {
    snippetAnswer: `Eventyr-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener sammenlignende analyse af eventyr, karakterudvikling med motiver, avanceret genfortaelling med eget perspektiv og selvstaendig eventyrskrivning med dialog og beskrivelse. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse gaar eventyrtemaet fra analyse til kreation og kritik \u2014 syv- og otteaarige kan sammenligne tre eventyr i dobbelte Venn-diagrammer, analysere karakterers motiver (\u201dhvorfor goer ulven det? Hvad oensker han egentlig?\u201d), og genfortaelle eventyr fra en anderledes synsvinkel (historien set fra ulvens perspektiv). Eventyrstrukturanalyse udvides til narrative greb som genttagelse, tregangsmoenster og morale. Skrivning af egne eventyr med dialog, beskrivelse og overraskende vendepunkt kr\u00e6ver avanceret fortaelleteknik. Ordforraad med eventyrsprog (engang, fordum, moralen er) styrker genrebevidsthed. F\u00e6lles M\u00e5ls m\u00e5l for laesning, narrativ kompetence og kreativ skrivning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Sammenlignende eventyranalyse (7\u20138-\u00e5rige kan sammenligne tre tekster systematisk)`, howWeAddress: `Dobbelte Venn-diagram-ark med tre eventyr traener avanceret sammenlignende laesning` },
      { milestone: `Karaktermotivation og synsvinkel (forstaa karakterers motiver og fortaelle fra andre perspektiver)`, howWeAddress: `Perspektivskifte-ark, hvor eleverne genfortaeller fra antagonistens synsvinkel og analyserer motiver` },
      { milestone: `Avanceret eventyrskrivning med dialog og beskrivelse`, howWeAddress: `Eventyrskrive-vaerksted med minilessons om dialog, beskrivelse og vendepunkt guider avanceret kreativ skrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, sammenlign kun to eventyr, brug billedkort til motivanalyse, og tilbyd rammer for dialog og beskrivelse. For avancerede elever i 2. klasse tilf\u00f8jes sammenligning af eventyr paa tvaers af kulturer, selvstaendig karakteranalyse med citater, og fri eventyrskrivning med flere kapitler.`,
    parentTakeaway: `Laes eventyr og diskuter: \u201dhvorfor handler ulven saadan? Hvad ville DU goere, hvis du var Roedhaette?\u201d Genfortael historien fra ulvens perspektiv. Sammenlign to eventyr: \u201dhvordan ligner H.C. Andersens eventyr Grimms?\u201d Lad barnet skrive sit eget eventyr med dialog. Eventyr er den aeeldste skriveskole.`,
    classroomIntegration: `Eventyrtemaet i 2. klasse er danskfagets omdrejningspunkt: ugentlig eventyrlaesning med analyseark, skrivevaerksted med minilessons om dialog og beskrivelse, dramatisering med perspektivskifte, og sammenlignende laesning paa tvaers af kulturer. Et klasseeventyrbibliotek med elevskrevne eventyr udgives som bog. F\u00e6lles M\u00e5ls m\u00e5l for laesning, skrivning og mundtlig fremstilling underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Sammenlignende eventyranalyse`, emerging: `finder 1\u20132 ligheder mellem to eventyr med stoette`, proficient: `udfylder selvstaendigt et Venn-diagram med tre eventyr og formulerer konklusioner`, advanced: `sammenligner eventyr paa tvaers af kulturer, finder narrative moenstre og formulerer analysen skriftligt` },
      { skill: `Karaktermotivation og perspektivskifte`, emerging: `beskriver, hvad en karakter goer, med billedst\u00f8tte`, proficient: `forklarer selvstaendigt en karakters motiver og genfortaeller fra en alternativ synsvinkel`, advanced: `analyserer komplekse motiver, sammenligner karakterer og skriver overbevisende perspektivskifte` },
      { skill: `Eventyrskrivning med dialog og beskrivelse`, emerging: `skriver 4\u20135 saetninger med stoette fra rammer og billedstartere`, proficient: `skriver selvstaendigt et eventyr med dialog, beskrivelse og klar narrativ struktur`, advanced: `skriver et detaljeret eventyr med flere karakterer, vendepunkt, dialog og morale` },
    ],
  },

  farm: {
    snippetAnswer: `Gaard-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener multiplikation med gaarddata, produktionsk\u00e6der med oekonomi, dataanalyse med dobbelte diagrammer og selvstaendig skrivning af gaardforskningsrapporter med kilder. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse gaar gaardtemaet fra observation til oekonomisk og videnskabelig analyse \u2014 syv- og otteaarige kan beregne gaardproduktion med multiplikation (7 hoener laegger 7 aeg om dagen \u2014 hvor mange paa en uge?), forstaa produktionsk\u00e6der med oekonomiske led (bonden saelger maelk til mejeriet for 3 kr./liter), og analysere vaekstdata i dobbelte soejlediagrammer. Division introduceres med fordeling af hoest (48 aebler fordelt paa 6 kasser = 8 i hver). Forskningsrapporter om gaardprodukter med kildehenvisning traener akademisk skrivning. F\u00e6lles M\u00e5ls m\u00e5l for multiplikation, data og skriftlig rapportering i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Multiplikation med gaardproduktion (7\u20138-\u00e5rige regner med grupper i kontekst)`, howWeAddress: `Gaardproduktions-ark (5 koeer med 12 liter maelk/dag) giver multiplikation i landbrugskontekst` },
      { milestone: `Produktionskaaeder med oekonomi (pris pr. led i kaeden)`, howWeAddress: `Oekonomik\u00e6de-ark, hvor eleverne foelger prisen fra gaard til butik og beregner forskelle` },
      { milestone: `Division med fordeling af hoest (ligelig deling med og uden rest)`, howWeAddress: `Hoestfordelingsark, hvor eleverne fordeler afgroeder ligeligt og haandterer rest` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold multiplikation i 2- og 5-tabellen, brug toleddet produktionskaaeder, og tilbyd rapportskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes multiplikation med tocifrede tal, femleddet produktionsk\u00e6der med prisberegning, og selvstaendig forskningsrapport med diagrammer og kildeanalyse.`,
    parentTakeaway: `Besoeg en gaard og regn: \u201d8 hoens laegger 8 aeg om dagen \u2014 hvor mange paa en uge? Det er 8 gange 7!\u201d Foelg maden til butikken: \u201dhvad koster maelken hos bonden? I butikken? Hvorfor er der forskel?\u201d Lad barnet skrive en forskningsrapport om et gaardprodukt. Gaarden er oekonomi, naturfag og matematik i \u00e9t.`,
    classroomIntegration: `Gaardtemaet i 2. klasse integreres som tvaerfagligt aarsprojekt: naturfag med produktionskaaeder og vaekstdata, matematik med multiplikation, division og diagrammer, dansk med forskningsrapporter og praesentationer. Et klassevaeksthus med oekonomisk regnskab forbinder alle fag. F\u00e6lles M\u00e5ls m\u00e5l for multiplikation, data og skriftlig rapportering underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Multiplikation med gaarddata`, emerging: `loser gentagen addition (5+5+5+5) med konkreter i gaardkontekst`, proficient: `skriver selvstaendigt gange-stykker fra gaardscenarier og loser dem korrekt`, advanced: `anvender multiplikation fleksibelt med tocifrede tal og formulerer egne gaardopgaver` },
      { skill: `Division med hoestfordeling`, emerging: `fordeler 12\u201320 genstande i 2\u20133 lige grupper med konkreter`, proficient: `loser selvstaendigt divisionsopgaver inden for 50 med og uden rest`, advanced: `forklarer sammenhaengen mellem multiplikation og division og loser flertrinsproblemer` },
      { skill: `Gaardforskningsrapport`, emerging: `skriver 3\u20134 saetninger med stoette fra skabelon`, proficient: `skriver selvstaendigt en rapport med indledning, fakta, data og konklusion`, advanced: `skriver en detaljeret rapport med flere kilder, diagrammer og perspektivering` },
    ],
  },

  flowers: {
    snippetAnswer: `Blomster-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener systematisk vaekstdataanalyse, multiplikation med kronblade, symmetri med flere akser og selvstaendig skrivning af botaniske forskningsrapporter. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse gaar blomstertemaet fra maaling til videnskabelig analyse \u2014 syv- og otteaarige kan analysere vaekstdata over flere uger i linjediagrammer, beregne med multiplikation (6 tulipaner med 6 kronblade = 36), og undersoege bestovning som et system med gensidige afhaengigheder. Symmetrianalyse udvides til rotationssymmetri i blomster. Maaling med mm-praecision giver noejagttig kronblads- og bladdata. Botaniske forskningsrapporter med hypotese, data og konklusion traener naturvidenskabelig taaenkning. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig undersoegelse, multiplikation og skriftlig rapportering i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Linjediagrammer med vaekstdata (7\u20138-\u00e5rige kan plotte og aflaese data over tid)`, howWeAddress: `Plantevaekst-diagramark, hvor eleverne plotter ugentlige maaling i et linjediagram og analyserer vaekstkurven` },
      { milestone: `Multiplikation med naturdata (kronblade, blade, planter)`, howWeAddress: `Kronblads-multiplikationsark (8 blomster med 5 kronblade) giver gangetaenkning med botaniske data` },
      { milestone: `Rotationssymmetri (symmetri ved drejning)`, howWeAddress: `Blomster-rotationsark, hvor eleverne identificerer og producerer rotationssymmetriske moenstre` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug soejlediagrammer i stedet for linjediagrammer, hold multiplikation i 2- og 5-tabellen, og tilbyd rapportskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes linjediagrammer med to kurver, multiplikation med tocifrede tal, og selvstaendig botanisk forskningsrapport med dataanalyse og fejlkilder.`,
    parentTakeaway: `Foelg plantens vaekst med et linjediagram: maal hver uge, plot paa papir, og tal om kurven (\u201dhvorfor voksede den mest i uge 3?\u201d). Tael kronblade og multiplicer: \u201d5 blomster med 8 kronblade = ?\u201d Find rotationssymmetri i blomster i haven. Lad barnet skrive en forskningsrapport om vaekstforsoeget. Blomster er naturvidenskab paa sit smukkeste.`,
    classroomIntegration: `Blomstertemaet i 2. klasse koerer som videnskabeligt foraarsprojekt: plantning med ugentlig maaling og linjediagrammer, matematik med multiplikation og symmetri, naturfag med bestovning og vaekstcyklus, dansk med forskningsrapporter. En klassebotanik-udstilling afslutter projektet. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, data, multiplikation og rapportering underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Linjediagrammer med vaekstdata`, emerging: `aflaeses et faerdiglavet soejlediagram med stoette`, proficient: `plotter selvstaendigt data i et linjediagram, aflaeeser det korrekt og beskriver tendenser`, advanced: `sammenligner to vaekstkurver, analyserer forskelle og formulerer hypoteser om aarsager` },
      { skill: `Multiplikation med botaniske data`, emerging: `loser gentagen addition (5+5+5) med konkreter og billedstotte`, proficient: `skriver selvstaendigt gange-stykker fra blomsterdata og loser dem korrekt`, advanced: `anvender multiplikation fleksibelt med tocifrede tal og verificerer med division` },
      { skill: `Botanisk forskningsrapport`, emerging: `beskriver et forsoegsresultat i 2\u20133 saetninger med stoette`, proficient: `skriver selvstaendigt en rapport med hypotese, data, diagram og konklusion`, advanced: `skriver en detaljeret rapport med dataanalyse, fejlkilder og perspektivering` },
    ],
  },

  food: {
    snippetAnswer: `Mad-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener naeringsberegning med flercifrede tal, prissammenligning med division, kostpyramide-analyse og selvstaendig skrivning af sundhedsdebatter med argumentation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse gaar madtemaet fra sundhedsviden til kvantitativ analyse \u2014 syv- og otteaarige kan beregne kalorier og naeringsstoffer med addition af flercifrede tal, sammenligne priser pr. enhed med division (200 g for 20 kr. = 10 kr./100 g), og analysere kostpyramiden med anbefalede maengder. Multiplikation med opskriftskalering (dobbelt portion: 4 \u00d7 2 dl maelk) giver praktisk gangetaenkning. Sundhedsdebatter med pastand, begrundelse og modargument (\u201der sukker altid usundt?\u201d) traener kritisk taenkning og argumentation. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, regning og skriftlig argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Flercifret addition med naeringsdata (7\u20138-\u00e5rige adderer tal over 100)`, howWeAddress: `Naeringsberegningsark, hvor eleverne adderer kalorier og naeringsvaerdier for et maaltid` },
      { milestone: `Prissammenligning med division (pris pr. enhed)`, howWeAddress: `Supermarkedsark, hvor eleverne beregner pris pr. 100 g og sammenligner produkter` },
      { milestone: `Argumenterende sundhedsdebat (paastand + begrundelse + modargument)`, howWeAddress: `Sundhedsdebat-ark med rammer for argument og modargument traener kritisk sundhedsskrivning` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug runde tal under 100 til naeringsberegning, enkel prissammenligning uden division, og saetningsstartere til debatter. For avancerede elever i 2. klasse tilf\u00f8jes naeringsberegning med tusindetal, prissammenligning med oere og decimaltal, og selvstaendig sundhedsdebat med flere argumenter og videnskabeligt belaeeg.`,
    parentTakeaway: `Laes naeringsdeklarationer sammen: \u201ddenne yoghurt har 120 kalorier, denne har 85 \u2014 hvad er forskellen?\u201d Sammenlign priser: \u201d200 g ost for 30 kr. eller 300 g for 40 kr. \u2014 hvilken er billigst pr. 100 g?\u201d Diskuter: \u201der chokolade altid usundt? Hvad mener du?\u201d Maden er sundhed, matematik og kritisk taenkning i \u00e9t.`,
    classroomIntegration: `Madtemaet i 2. klasse integreres som sundhedsprojekt: naturfag med naeringslaering og kostpyramide, matematik med naeringsberegning og prissammenligning, dansk med sundhedsdebatter og argumenterende tekst. Et klassemadprojekt med naeringsanalyse forbinder alle fag. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, regning og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Naeringsberegning med flercifrede tal`, emerging: `adderer to tal under 100 med stoette i madkontekst`, proficient: `adderer selvstaendigt flercifrede naeringsvaerdier og sammenligner maaltider`, advanced: `beregner naeringsindhold for hele dage, analyserer balance og foresl\u00e5r forbedringer` },
      { skill: `Prissammenligning (pris pr. enhed)`, emerging: `sammenligner to priser direkte (billigst/dyrest) med stoette`, proficient: `beregner selvstaendigt pris pr. 100 g og vaelger det bedste tilbud`, advanced: `sammenligner priser paa tvaers af enheder, regner med oere og optimerer et indkoebsbudget` },
      { skill: `Argumenterende sundhedsdebat`, emerging: `skriver 2\u20133 saetninger med mening og enkel begrundelse med stoette`, proficient: `skriver selvstaendigt et debatindlaeg med paastand, begrundelse og modargument`, advanced: `skriver en nuanceret sundhedsdebat med flere argumenter, belaeeg og perspektiverende konklusion` },
    ],
  },

  forest: {
    snippetAnswer: `Skov-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener oekosystemforstaelse, dataanalyse med linjediagrammer, multiplikation med naturdata og selvstaendig skrivning af feltforskningsrapporter med hypotese og konklusion. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse bliver skovtemaet et avanceret feltforskningsprojekt \u2014 syv- og otteaarige kan undersoege oekosystemer med producentter, forbrugere og nedbrydere, registrere data i linjediagrammer over tid, og beregne med multiplikation (5 traeer med 12 fuglekasser = ?). Foedenettet erstatter den lineaere foedek\u00e6de og viser komplekse sammenhaenge. Maaling af traeer med omkreds og hoejde giver avanceret centimeter- og meterbrug. Feltforskningsrapporter med hypotese, metode, resultater og konklusion traener komplet videnskabelig rapportering. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig undersoegelse, data, maaling og skriftlig rapportering i 2. klasse underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Oekosystemforstaelse (7\u20138-\u00e5rige forstaar producent-forbruger-nedbryder-kredsloeb)`, howWeAddress: `Oekosystem-diagramark, hvor eleverne forbinder organismer i et foedenet og identificerer roller` },
      { milestone: `Linjediagrammer med feltdata over tid (temperatur, nedbor, artstaelling)`, howWeAddress: `Feltdata-diagramark, hvor eleverne plotter maanedlige observationer og analyserer aendringer` },
      { milestone: `Komplet feltforskningsrapport (hypotese, metode, resultater, konklusion)`, howWeAddress: `Feltforsknings-skabeloner med fire sektioner guider eleverne gennem videnskabelig rapportering` },
    ],
    differentiationNotes: `For elever der har brug for stoette, begraens oekosystemet til tre organismer, brug soejlediagrammer i stedet for linjediagrammer, og tilbyd rapportskabeloner med saetningsstartere. For avancerede elever i 2. klasse tilf\u00f8jes komplekse foedenet med 8+ organismer, linjediagrammer med to kurver, og selvstaendig feltforskningsrapport med dataanalyse og fejlkilder.`,
    parentTakeaway: `Gaa en skovtur med forskningsbriller: \u201dhvem producerer energi? Hvem spiser hvem? Hvem nedbryder?\u201d Maal et traes omkreds og hoejde. Foer en naturforskningsdagbog med maanedlige observationer. Lad barnet skrive en forskningsrapport: \u201djeg troede... jeg undersogte... jeg fandt ud af...\u201d Skoven er det stoerste laboratorium.`,
    classroomIntegration: `Skovtemaet i 2. klasse er udeskole-fundamentet med forskningsfokus: maanedlige skovture med feltark og dataregistrering, naturfag med oekosystemanalyse, matematik med linjediagrammer og multiplikation, dansk med feltforskningsrapporter. Et aarshjul med skovens oekosystem haenger i klassen. F\u00e6lles M\u00e5ls m\u00e5l for naturfag, data, maaling og rapportering underst\u00f8ttes hele aaret.`,
    assessmentRubric: [
      { skill: `Oekosystemforstaelse (producent, forbruger, nedbryder)`, emerging: `navngiver 2\u20133 organismer i en enkel foedek\u00e6de med stoette`, proficient: `opbygger selvstaendigt et foedenet med 5\u20136 organismer og forklarer rollerne producent, forbruger og nedbryder`, advanced: `analyserer komplekse foedenet, forklarer konsekvenser af aendringer og relaterer til virkelige oekosystemer` },
      { skill: `Linjediagrammer med feltdata`, emerging: `aflaeses et faerdiglavet soejlediagram med stoette`, proficient: `plotter selvstaendigt feltdata i linjediagrammer og beskriver tendenser`, advanced: `sammenligner to datasaet i linjediagrammer, analyserer aendringer og formulerer hypoteser` },
      { skill: `Feltforskningsrapport`, emerging: `skriver 3\u20134 saetninger om en skovtur med stoette fra skabelon`, proficient: `skriver selvstaendigt en rapport med hypotese, metode, resultater og konklusion`, advanced: `skriver en detaljeret rapport med dataanalyse, diagrammer, fejlkilder og perspektivering` },
    ],
  },

  fruits: {
    snippetAnswer: `Frugt-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener broeker med frugtdeling, multiplikation med frugtdata, prisberegning med sammenligning og selvstaendig skrivning af sundhedsrapporter med argumentation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse gaar frugttemaet fra sortering til kvantitativ analyse \u2014 syv- og otteaarige kan beregne broeker med frugtdeling (en fjerdedel af 16 aebler = 4), multiplicere med frugtkasser (5 kasser med 8 appelsiner = 40), og sammenligne frugtpriser pr. kilogram. Naeringsdata giver addition af flercifrede tal (et aeble har 52 kcal, en banan 89 kcal). Dataindsamling med klassens frugtforbrug over en uge giver dobbelte soejlediagrammer. Sundhedsrapporter med paastand og begrundelse (\u201dfrugt er vigtigere end juice, fordi...\u201d) traener argumenterende tekst. F\u00e6lles M\u00e5ls m\u00e5l for broeker, multiplikation og argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Broeker med frugtdeling (7\u20138-\u00e5rige beregner broekdele af konkrete maengder)`, howWeAddress: `Frugtdelingsark, hvor eleverne beregner fjerdedele og tredjedele af konkrete frugtmaengder` },
      { milestone: `Multiplikation med frugtkasser (grupper af samme stoerrelse)`, howWeAddress: `Frugtlager-ark (6 kasser med 10 aebler) giver multiplikation i logistikkontekst` },
      { milestone: `Prissammenligning pr. kilogram (enhedspris)`, howWeAddress: `Frugtmarked-ark, hvor eleverne beregner kilopris og vaelger det bedste tilbud` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug kun halvdele med konkreter, hold multiplikation i 2- og 5-tabellen, og tilbyd enkel prissammenligning uden kilogram. For avancerede elever i 2. klasse tilf\u00f8jes broeker med sjettedele, multiplikation med tocifrede tal, og naeringsanalyse med prisoptimering.`,
    parentTakeaway: `Koeb frugt og regn: \u201d1 kg aebler koster 25 kr., vi koeber 3 kg \u2014 hvad koster det?\u201d Del frugten: \u201dvi har 20 vindruer til 4 personer \u2014 hvor mange til hver?\u201d Sammenlign: \u201der det billigere at koebe 1 kg for 30 kr. eller 2 kg for 50 kr.?\u201d Lad barnet skrive: \u201dfrugt er vigtigt, fordi...\u201d Frugt er sund matematik.`,
    classroomIntegration: `Frugttemaet i 2. klasse integreres som sundhedsprojekt: matematik med broeker, multiplikation og prisberegning, naturfag med naering og vitaminer, dansk med sundhedsrapporter og argumentation. Et klassefrugtmarked med rigtigt sortiment forbinder alle fag. F\u00e6lles M\u00e5ls m\u00e5l for broeker, multiplikation og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Broeker med frugtdeling`, emerging: `finder halvdelen af runde tal (10, 20) med konkreter`, proficient: `beregner selvstaendigt fjerdedele og tredjedele af frugtmaengder og forklarer metoden`, advanced: `beregner broekdele af flercifrede tal, sammenligner broeker og loser problemmer i kontekst` },
      { skill: `Multiplikation med frugtkasser`, emerging: `loser gentagen addition med konkreter i frugtkontekst`, proficient: `skriver selvstaendigt gange-stykker og loser dem korrekt (7\u00d78=56)`, advanced: `multiplicerer med tocifrede tal, vender opgaver om til division og verificerer` },
      { skill: `Sundhedsrapport med argumentation`, emerging: `skriver 2\u20133 saetninger med saetningsstartere om frugt og sundhed`, proficient: `skriver selvstaendigt et argument med paastand, begrundelse og eksempel`, advanced: `skriver en nuanceret rapport med flere argumenter, modargument og konkluison` },
    ],
  },

  furniture: {
    snippetAnswer: `Moebler-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener areal og omkreds med moebelmaaling, 3D-formgenkendelse i hverdagsgenstande, prisberegning med budgettering og selvstaendig skrivning af indretningsforslag med argumentation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse faar moebeltemaet geometrisk og oekonomisk dybde \u2014 syv- og otteaarige kan beregne areal og omkreds af moebler (bordet er 120 cm \u00d7 80 cm = 9.600 cm\u00b2), identificere 3D-former i hverdagsgenstande (reol = rektangulaert prisme, lampeskaerm = keglestub), og budgettere moebelindkoeb med flercifret addition og multiplikation. Symmetri i moebeldesign giver praecis geometrisk observation. Maalestoksforstaelse introduceres med rumtegninger (1 cm = 10 cm i virkeligheden). Indretningsforslag med argumentation (\u201djeg foresl\u00e5r denne sofa, fordi...\u201d) traener skriftlig overbevisning. F\u00e6lles M\u00e5ls m\u00e5l for geometri, maaling og argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Areal og omkreds med moebler (7\u20138-\u00e5rige beregner med maal fra virkeligheden)`, howWeAddress: `Moebelmaalings-ark, hvor eleverne maaler borde og hylder og beregner areal og omkreds i cm` },
      { milestone: `3D-former i hverdagsgenstande (identifikation og navngivning)`, howWeAddress: `Form-jagt-ark, hvor eleverne finder og navngiver 3D-former (kube, cylinder, prisme) i moebler hjemme` },
      { milestone: `Budgettering med moebelpriser (flercifret addition og sammenligning)`, howWeAddress: `Indretningsbudget-ark, hvor eleverne vaelger moebler inden for et budget og argumenterer for valgene` },
    ],
    differentiationNotes: `For elever der har brug for stoette, begraens til omkreds med hele cm, navngiv kun tre 3D-former, og giv et budget med runde tal. For avancerede elever i 2. klasse tilf\u00f8jes arealberegning med multiplikation, maalestokstegning, og selvstaendig indretningsplan med budget, diagrammer og begrundelse.`,
    parentTakeaway: `Maal moebler derhjemme: \u201dbordet er 120 cm langt og 80 cm bredt \u2014 hvad er omkredsen?\u201d Find 3D-former: \u201dhvilken form har reolen? Og lampen?\u201d Planlaeg en indretning med et budget paa 500 kr. Lad barnet skrive: \u201djeg foresl\u00e5r denne reol, fordi...\u201d Matematik i hjemmet er den mest konkrete matematik.`,
    classroomIntegration: `Moebeltemaet i 2. klasse forbinder geometri og praktisk matematik: maaletimen med areal og omkreds af klasselokalet moebler, geometritimen med 3D-former i hverdagen, matematiktimen med budgettering og prisberegning, dansktimen med indretningsforslag og argumentation. Et klasseprojekt om at omindre klasselokalet integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for geometri, maaling og argumentation moedes.`,
    assessmentRubric: [
      { skill: `Areal og omkreds (moebelkontekst)`, emerging: `maaler en sides laengde og beregner omkreds med stoette`, proficient: `beregner selvstaendigt areal og omkreds af rektangulaere moebler i cm`, advanced: `beregner med multiplikation, sammenligner arealer og loser omkredsopgaver med ukendte sider` },
      { skill: `3D-former i hverdagsgenstande`, emerging: `navngiver kube og cylinder i moebler med billedstotte`, proficient: `identificerer selvstaendigt 4\u20135 3D-former i hverdagsgenstande og beskriver egenskaber`, advanced: `forklarer forskelle mellem 3D-former, relaterer til 2D-figurer og finder former i nye kontekster` },
      { skill: `Indretningsforslag med argumentation`, emerging: `skriver 2\u20133 saetninger med mening om et moebelvalg med stoette`, proficient: `skriver selvstaendigt et indretningsforslag med moebelvalg, budget og begrundelse`, advanced: `skriver et detaljeret forslag med diagrammer, prisberegning, flere argumenter og konklusion` },
    ],
  },

  garden: {
    snippetAnswer: `Have-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener arealberegning med bede, multiplikation med raekker og kolonner, vaekstdata i linjediagrammer og selvstaendig skrivning af haveplanlaegning med argumentation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse gaar havetemaet fra observation til planlaegning og beregning \u2014 syv- og otteaarige kan beregne arealet af plantebede med multiplikation (3 raekker med 5 planter = 15 planter), planlaegge en have med maalestok og koordinater, og analysere vaekstdata i linjediagrammer over flere uger. Division med hoestfordeling (24 gulerroedder til 6 boern) giver funktionel deling. Aarstidsberegning (hvornaar skal vi saa, hvis det tager 8 uger at vokse?) introducerer tidsplanlaegning. Haveplanlaegningsrapporter med argumentation (\u201djeg foresl\u00e5r at plante tomater her, fordi...\u201d) traener beslutningsskrivning. F\u00e6lles M\u00e5ls m\u00e5l for areal, multiplikation og argumenterende tekst i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Arealberegning med multiplikation (raekker \u00d7 kolonner)`, howWeAddress: `Havebed-ark, hvor eleverne beregner areal og plantetal med raekke-kolonne-multiplikation` },
      { milestone: `Haveplanlaegning med maalestok (kortlaesning og -tegning)`, howWeAddress: `Haveplan-ark med koordinatgitter, hvor eleverne planlaegger bede og beregner afstande` },
      { milestone: `Vaekstdata i linjediagrammer (plotte og analysere over tid)`, howWeAddress: `Plantevaekst-registrerings- og diagramark med ugentlige maalinger og trendanalyse` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug soejlediagrammer i stedet for linjediagrammer, hold multiplikation i 2- og 5-tabellen, og tilbyd en faerdigtegnet haveplan. For avancerede elever i 2. klasse tilf\u00f8jes maalestokstegning med cm til m-omregning, multiplikation med tocifrede tal, og selvstaendig haveplan med budget, aarstidskalender og argumentation.`,
    parentTakeaway: `Planlaeg et haveprojekt: \u201dvi planter 4 raekker med 6 planter \u2014 hvor mange tilsammen?\u201d Tegn en haveplan med maal. Maal vaeksten hver uge og lav et linjediagram. Beregn: \u201dhvis vi saar nu og det tager 8 uger, hvornaar kan vi hoeste?\u201d Lad barnet skrive en planlaegningsrapport. Haven er det bedste matematiklaboratorium.`,
    classroomIntegration: `Havetemaet i 2. klasse integreres som tvaerfagligt foraarsprojekt: matematik med arealberegning, multiplikation og linjediagrammer, naturfag med vaekst og planteanatomi, dansk med haveplanlaegningsrapporter. Et klassehave-projekt med budget og plan forbinder alle fag. F\u00e6lles M\u00e5ls m\u00e5l for areal, multiplikation og argumenterende tekst underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Arealberegning med multiplikation (havekontekst)`, emerging: `taeller planter i et 2\u00d73-gitter med billedst\u00f8tte`, proficient: `beregner selvstaendigt areal som raekker \u00d7 kolonner og anvender det paa havebede`, advanced: `beregner areal af sammensatte figurer, omregner mellem enheder og loser designproblemer` },
      { skill: `Haveplanlaegning med maalestok`, emerging: `tegner en enkel haveplan med 2\u20133 bede med stoette`, proficient: `tegner selvstaendigt en haveplan med koordinater, maal og planteplacering`, advanced: `bruger maalestok, beregner virkelige afstande og planlaegger med aarstidskalender` },
      { skill: `Haveplanlaegningsrapport med argumentation`, emerging: `skriver 2\u20133 saetninger om sin haveplan med stoette`, proficient: `skriver selvstaendigt en planlaegningsrapport med forslag, begrundelse og beregning`, advanced: `skriver en detaljeret rapport med budget, tidsplan, diagrammer og perspektivering` },
    ],
  },

  halloween: {
    snippetAnswer: `Halloween-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener multiplikation med slikposer, division med retfaerdig fordeling, pengematematik med halloweenbudget og selvstaendig skrivning af uhyggelige historier med spaendingsopbygning. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse faar halloweentemaet matematisk kompleksitet \u2014 syv- og otteaarige kan multiplicere med slikposer (8 boern med 5 stykker slik = 40), dividere med retfaerdig deling (36 stykker slik til 9 boern = 4 til hver), og budgettere halloweenindkoeb med flercifret addition. Moenstergenkendelse udvides til talfoelger med variabel regel. Dataindsamling med dobbelte soejlediagrammer sammenligner sliktyper og praeferencer. Uhyggelige historier med spaendingsopbygning, klimaks og oplosning traener avanceret narrativ teknik. F\u00e6lles M\u00e5ls m\u00e5l for multiplikation, division og kreativ skrivning i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Multiplikation i kontekst (7\u20138-\u00e5rige mestrer gange-stykker i hverdagssituationer)`, howWeAddress: `Slikpose-multiplikationsark (6 boern med 4 stykker) giver gangetaenkning i festkontekst` },
      { milestone: `Division med retfaerdig fordeling (inklusive rest)`, howWeAddress: `Slikfordelingsark, hvor eleverne deler op, haandterer rest og skriver divisionsstykker med kontrolregning` },
      { milestone: `Narrativ spaendingsopbygning (stigende handling, klimaks, oplosning)`, howWeAddress: `Uhygge-skrivevaerksted med spaendingskurve-skabelon guider eleverne gennem narrativ spaendingsteknik` },
    ],
    differentiationNotes: `For elever der har brug for stoette, hold multiplikation i 2- og 5-tabellen, divider kun i lige grupper uden rest, og tilbyd illustrerede spaendingsstartere. For avancerede elever i 2. klasse tilf\u00f8jes multiplikation i 6\u20139-tabellen, division med rest og begrundelse, og fri uhyggelig historieskrivning med dialog, beskrivelse og overraskende slutning.`,
    parentTakeaway: `Goer Halloween til matematik: \u201d8 boern med 5 stykker slik \u2014 hvor mange tilsammen? Del 42 stykker til 6 boern ligeligt.\u201d Lav et halloweenbudget: \u201dkostume 80 kr. + pynt 45 kr. + slik 60 kr. = ?\u201d Lad barnet skrive en uhyggelig historie med spaending. Halloween er gange, deling og fortaelling i \u00e9t.`,
    classroomIntegration: `Halloweentemaet i 2. klasse bruges som temauge: matematiktimen med multiplikation, division og budgettering, dansktimen med uhyggelige historier og spaendingsopbygning, kunsttimen med halloweendesign. Et klasse-halloween-marked med prisberegning integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for multiplikation, division og kreativ skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Multiplikation i halloweenkontekst`, emerging: `loser gentagen addition med konkreter (5+5+5+5)`, proficient: `skriver selvstaendigt gange-stykker fra halloweenscenarier og loser dem korrekt`, advanced: `anvender multiplikation fleksibelt, vender opgaver om og verificerer med division` },
      { skill: `Division med retfaerdig fordeling`, emerging: `fordeler 10\u201320 genstande i 2 lige grupper med konkreter`, proficient: `loser selvstaendigt divisionsopgaver inden for 50, inklusive rest, med kontrolregning`, advanced: `forklarer sammenhaengen med multiplikation, haandterer rest og formulerer egne divisionsopgaver` },
      { skill: `Uhyggelig historie med spaendingsopbygning`, emerging: `skriver 3\u20134 saetninger med stoette fra billedstartere og spaendingsord`, proficient: `skriver selvstaendigt en uhyggelig historie med spaendingskurve: opbygning, klimaks og oplosning`, advanced: `skriver en detaljeret historie med dialog, beskrivelse, overraskende vendepunkt og reflekterende slutning` },
    ],
  },

  holidays: {
    snippetAnswer: `Ferie-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener tidsberegning med kalendere, rejsebudgettering med flercifrede tal, afstandsberegning paa kort og selvstaendig skrivning af rejsedagboeger og ferieplanlaegning. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse gaar ferietemaet fra beskrivelse til planlaegning og beregning \u2014 syv- og otteaarige kan beregne feriedage og uger paa en kalender, budgettere rejseudgifter med flercifret addition (hotel 450 kr./nat \u00d7 5 naetter), og beregne afstande paa kort med maalestok. Multiplikation med ferieindkoeb (3 is a 25 kr. = ?) giver gangetaenkning i feriereekontekst. Tidszonner introduceres enkelt (\u201dhvis klokken er 14 her, er den 15 i Sverige\u201d). Rejsedagboeger med kronologisk opbygning og refleksion traener struktureret skrivning. Ferieplanlaegning med argumentation (\u201djeg foresl\u00e5r Legoland, fordi...\u201d) traener beslutningsskrivning. F\u00e6lles M\u00e5ls m\u00e5l for tid, penge og skriftlig kommunikation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Kalenderberegning (7\u20138-\u00e5rige beregner dage, uger og maaneder paa kalendere)`, howWeAddress: `Feriekalender-ark, hvor eleverne beregner feerielangde, nedtaelling og ugedage` },
      { milestone: `Rejsebudgettering med multiplikation (pris gange antal)`, howWeAddress: `Rejsebudget-ark, hvor eleverne beregner overnatning, transport og aktiviteter med multiplikation` },
      { milestone: `Afstandsberegning paa kort (maalestok og kilometerangivelser)`, howWeAddress: `Rejsekort-ark med afstande, hvor eleverne adderer delstraekninger og beregner rejsetid` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug enkle kalenderberegninger med hele uger, runde tal til budgettering, og direkte afstandslaesning uden maalestok. For avancerede elever i 2. klasse tilf\u00f8jes kalenderberegning med maanedsskift, budget med oere og valutaomregning, og maalestoksberegning paa rigtige kort.`,
    parentTakeaway: `Planlaeg ferien som et mateprojekt: \u201dvi rejser 15. juli og er vaek i 10 dage \u2014 hvornaar kommer vi hjem?\u201d Laav et budget: \u201dhotel 500 kr./nat gange 5 naetter plus benzin 800 kr.\u201d Find afstande paa et kort. Lad barnet skrive en rejsedagbog og foresl\u00e5 naeste feriemaal med begrundelse. Ferieplanlaegning er den sjoveste matematik.`,
    classroomIntegration: `Ferietemaet i 2. klasse bruges som tvaerfagligt foraarsprojekt: matematik med kalenderberegning, multiplikation og budgettering, geografi med kortlaesning og afstande, dansk med rejsedagboeger og ferieplanlaegning. Et klasseprojekt, hvor eleverne planlaegger en droemmerejse, integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for tid, penge og skrivning underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Kalenderberegning (feriekontekst)`, emerging: `taeller dage paa en kalender med stoette og finder ugedage`, proficient: `beregner selvstaendigt ferielaengde, nedtaelling og datoer med maanedsskift`, advanced: `loser komplekse kalenderproblemer med aar, skudaar og tidszoneforskelle` },
      { skill: `Rejsebudgettering med multiplikation`, emerging: `adderer 2\u20133 poster med runde tal inden for 100 med stoette`, proficient: `budgetterer selvstaendigt med multiplikation (pris \u00d7 antal) og flercifret addition`, advanced: `optimerer et budget med begr\u00e6nsninger, sammenligner alternativer og argumenterer for valget` },
      { skill: `Rejsedagbog og ferieplanlaegning`, emerging: `skriver 3\u20134 saetninger om en ferie med saetningsstartere`, proficient: `skriver selvstaendigt en rejsedagbog med kronologi og refleksion, og en ferieplan med argumentation`, advanced: `skriver en detaljeret dagbog med beskrivelse, dialog og perspektivering, samt en ferieplan med budget og kort` },
    ],
  },

  household: {
    snippetAnswer: `Husholdnings-arbejdsark til 2. klasse (7\u20138 \u00e5r) traener maaling med liter og kilogram, pengematematik med husholdningsbudget, energiforstaelse med aflasning og selvstaendig skrivning af husholdningsguider med argumentation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `I 2. klasse gaar husholdningstemaet fra sortering til oekonomisk og naturvidenskabelig forstaelse \u2014 syv- og otteaarige kan beregne husholdningsbudgetter med flercifret addition, maale med liter og kilogram i daglige sammenhaenge, og forst\u00e5 energiforbrug ved at aflaese simple diagrammer. Multiplikation med ugentlige forbrug (7 dage \u00d7 2 liter maelk = 14 liter) giver gangetaenkning i hverdagskontekst. Vand- og stroembesparelse introducerer miljoebevidsthed med tal (\u201dvi bruger 150 liter vand om dagen \u2014 hvordan sparer vi?\u201d). Husholdningsguider med argumentation (\u201dvi boer spare paa vandet, fordi...\u201d) traener overbevisende tekst. F\u00e6lles M\u00e5ls m\u00e5l for maaling, penge og argumentation i 2. klasse moedes.`,
    developmentalMilestones: [
      { milestone: `Maaling med liter og kilogram (7\u20138-\u00e5rige bruger vaegt og rumfang i hverdagen)`, howWeAddress: `Husholdningsmaalings-ark, hvor eleverne maaler vand i liter, madvarer i kg og sammenligner` },
      { milestone: `Husholdningsbudget med flercifrede tal (ugentligt forbrug)`, howWeAddress: `Ugebudget-ark, hvor eleverne adderer daglige udgifter og beregner ugens samlede forbrug` },
      { milestone: `Energi- og ressourceforstaelse (aflasning af forbrug)`, howWeAddress: `Energiforbrugs-ark med enkle diagrammer, hvor eleverne aflaeses, sammenligner og foresl\u00e5r besparelser` },
    ],
    differentiationNotes: `For elever der har brug for stoette, brug hele liter og kilogram, hold budget under 100 kr. med runde tal, og tilbyd enkle aflasningsoopgaver. For avancerede elever i 2. klasse tilf\u00f8jes maaling med ml og g, budgettering med oere og maanedlig opsummering, og selvstaendig energispareguide med beregninger og argumentation.`,
    parentTakeaway: `Goer husholdningen til matematik: \u201dvi bruger 2 liter maelk om dagen \u2014 hvor mange paa en uge? Hvad koster det?\u201d Laes elregningen sammen og tal om energiforbrug. Vej madvarer i koekkenvet: \u201dhvor mange gram pasta skal vi bruge til 4 personer?\u201d Lad barnet skrive en spareguide: \u201dvi boer slukke lyset, fordi...\u201d Husholdning er matematik i virkeligheden.`,
    classroomIntegration: `Husholdningstemaet i 2. klasse integreres som oekonomiprojekt: matematik med maaling, budget og multiplikation, naturfag med energi og ressourcer, dansk med husholdningsguider og argumentation. Et klasseprojekt om at drive en husholdning med budget forbinder alle fag. F\u00e6lles M\u00e5ls m\u00e5l for maaling, penge og argumentation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Maaling med liter og kilogram`, emerging: `maaler med \u00e9n enhed (liter) med stoette og runde tal`, proficient: `maaler selvstaendigt med liter og kilogram, vaelger korrekt enhed og noterer praecist`, advanced: `omregner mellem enheder (1 kg = 1000 g), maaler praecist og loser maaleproblemmer` },
      { skill: `Husholdningsbudget (flercifrede tal)`, emerging: `adderer 2\u20133 poster med runde tal under 100 med stoette`, proficient: `budgetterer selvstaendigt med flercifret addition og multiplikation for en uge`, advanced: `planlaegger maanedsbudget, sammenligner perioder og foresl\u00e5r besparelser med beregning` },
      { skill: `Energispareguide med argumentation`, emerging: `skriver 2\u20133 saetninger med saetningsstartere om at spare energi`, proficient: `skriver selvstaendigt en guide med paastand, begrundelse og konkret sparetip med tal`, advanced: `skriver en detaljeret guide med beregninger, diagrammer, flere argumenter og perspektivering` },
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
