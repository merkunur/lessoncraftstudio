#!/usr/bin/env node
/**
 * SEO Part 320: NL Preschool Grade Enrichment — Themes 39-50
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the preschool grade block of 12 NL theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    seoTitle: 'Sport-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare sport-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'sport kleuterschool, sport oefeningen 3\u20134 jaar, sport oefeningen kleuterschool, sport uitprintbaar kleuterschool, sport werkbladen kleuterschool, sport activiteiten kleuterschool, sport leerbladen 3\u20134 jaar, sport gratis kleuterschool, sport PDF kleuterschool, sport kleuren',
    snippetAnswer: 'Sport-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken ballen, rackets en sportfiguren om tellen, kleuren en grove motoriek te oefenen. De natuurlijke bewegingsdrang van kleuters maakt sport tot een krachtig leerthema. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het sportthema is uitstekend geschikt voor kleuters omdat drie- en vierjarigen van nature een enorme bewegingsdrang hebben \u2014 rennen, springen en gooien zijn hun favoriete activiteiten. Sportwerkbladen benutten deze energie door bewegingsconcepten te koppelen aan cognitieve vaardigheden. Kinderen tellen ballen en sportattributen, kleuren sportsc\u00e8nes met diverse kleuren, en leren sportfiguren herkennen en benoemen. De SLO-leerlijnen benadrukken het belang van lichamelijke opvoeding en gezonde gewoonten vanaf jonge leeftijd, en sportwerkbladen vervullen dit doel door een positieve associatie met bewegen op te bouwen. Bovendien stimuleert het sportthema sociaal-emotionele vaardigheden zoals samenwerken en beurten nemen, fundamentele vaardigheden voor de kleuterschool.',
    developmentalMilestones: [
      { milestone: 'Grove motorische co\u00f6rdinatie (3\u20134-jarigen ontwikkelen balvaardigheid en evenwicht)', howWeAddress: 'Werkbladen met sportfiguren in beweging (gooien, vangen, rennen) worden gecombineerd met nabootsactiviteiten die grove motoriek stimuleren' },
      { milestone: 'Tellen van voorwerpen in een sportcontext', howWeAddress: 'Telactiviteiten met ballen, kegels en sportattributen bouwen getalbegrip op via een motiverend bewegingsthema' },
      { milestone: 'Kleuren en vormen herkennen in sportobjecten', howWeAddress: 'Kleuractiviteiten met diverse sportballen (ronde voetbal, ovale rugbybal) combineren kleurherkenning met vormherkenning' },
      { milestone: 'Sociaal bewustzijn en samenwerken (kleuters leren beurten nemen)', howWeAddress: 'Werkbladen met teamsporten en groepsspelen introduceren concepten van samenwerking en fair play op een leeftijdsgeschikte manier' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot drie of vier bekende sporten (voetbal, zwemmen, fietsen), gebruik grote, eenvoudige sportafbeeldingen, en combineer werkbladen met echte balactiviteiten. Voor gevorderde kleuters: introduceer meer sporten en sportattributen, voeg eenvoudige scoretelling toe, en laat kinderen hun favoriete sport tekenen en beschrijven.',
    parentTakeaway: 'Sport begint niet op het veld maar aan de keukentafel. Laat uw kind sportplaatjes tellen en kleuren, en benoem samen de sporten die u op televisie ziet. Ga daarna naar buiten: gooi een bal, ren een race, of fiets door het park. Na een sportwerkblad kunt u samen een puntentelling bijhouden bij een spel \u2014 dit verbindt cijferherkenning met de opwinding van sport en bevordert zowel motorische als cognitieve ontwikkeling.',
    classroomIntegration: 'Het sportthema verbindt binnen en buiten naadloos: in de kring worden sporten besproken en benoemd, bij werkhoeken worden tel- en kleurbladen gemaakt met sportattributen, in de gymzaal worden de sporten uit de werkbladen nagespeeld, en op het schoolplein worden eenvoudige sportspelletjes gespeeld. Dit sluit aan bij de SLO-doelen voor lichamelijke opvoeding, rekenvaardigheid en sociaal-emotionele ontwikkeling.',
    assessmentRubric: [
      { skill: 'Tellen van sportvoorwerpen', emerging: 'telt 1\u20134 ballen of kegels met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 sportattributen en koppelt aan het juiste cijfer', advanced: 'telt boven de 10, groepeert per sportsoort en vergelijkt hoeveelheden' },
      { skill: 'Sporten herkennen en benoemen', emerging: 'herkent 1\u20132 bekende sporten (voetbal, zwemmen) met hulp', proficient: 'benoemt zelfstandig 4\u20135 sporten en de bijbehorende attributen', advanced: 'beschrijft regels van meerdere sporten en vergelijkt overeenkomsten en verschillen' },
      { skill: 'Sportsc\u00e8nes kleuren', emerging: 'kleurt sportfiguren grotendeels buiten de lijnen met volle-vuist greep', proficient: 'kleurt binnen de lijnen met driepuntgreep en kiest passende kleuren', advanced: 'kleurt gedetailleerd met kleurvariatie en voegt eigen sportelementen toe' },
    ],
  },

  spring: {
    seoTitle: 'Lente-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare lente-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'lente kleuterschool, lente oefeningen 3\u20134 jaar, lente oefeningen kleuterschool, lente uitprintbaar kleuterschool, lente werkbladen kleuterschool, lente activiteiten kleuterschool, lente leerbladen 3\u20134 jaar, lente gratis kleuterschool, lente PDF kleuterschool, lente kleuren',
    snippetAnswer: 'Lente-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken bloemen, vlinders en lammetjes om tellen, kleuren en seizoensbewustzijn te oefenen. De lente biedt een rijke context voor natuur\u00e9ducatie en zintuiglijke waarneming. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het lentethema is pedagogisch waardevol voor kleuters omdat drie- en vierjarigen de seizoenswisseling intens beleven \u2014 na de winter zien ze plotseling overal bloemen, vlinders, lammetjes en regenbuien verschijnen. Deze zichtbare transformatie is een krachtig aanknopingspunt voor leren. Lentewerkbladen laten kinderen bloemen en vlinders tellen, lentekleuren benoemen (roze, geel, lichtgroen), en seizoensveranderingen in volgorde zetten. De SLO-leerlijnen benadrukken het waarnemen van seizoensveranderingen als onderdeel van ori\u00ebntatie op de wereld, en het lentethema vervult dit doel op een rijke, multi-zintuiglijke manier. Kinderen verbinden werkbladen met wat ze buiten zien: knoppen aan bomen, bloeiende bloembollen en nestende vogels, waardoor het leren betekenisvol en actueel wordt.',
    developmentalMilestones: [
      { milestone: 'Seizoensbewustzijn (3\u20134-jarigen beginnen seizoensveranderingen op te merken)', howWeAddress: 'Vergelijkingsactiviteiten met winter- en lentesc\u00e8nes helpen kinderen seizoenskenmerken herkennen en beschrijven' },
      { milestone: 'Tellen van natuurobjecten in een lentesc\u00e8ne', howWeAddress: 'Telactiviteiten met bloemen, vlinders en regendruppels bouwen getalbegrip op in een seizoensgebonden context' },
      { milestone: 'Kleurherkenning met pastelkleuren (kleuters verfijnen hun kleurenpalette)', howWeAddress: 'Kleuractiviteiten met lentebloemen in roze, lichtgeel en lichtgroen breiden de kleurwoordenschat uit voorbij de basiskleuren' },
      { milestone: 'Fijnmotorische verfijning via gevarieerde vormen', howWeAddress: 'Kleurplaten van bloemblaadjes, vlinderpatronen en regendruppels oefenen zowel ronde als fijne precieze bewegingen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vier herkenbare lente-elementen (bloem, vlinder, zon, regenbui), bied grote contouren aan, en combineer met een buitenwandeling om lenteverschijnselen te ontdekken. Voor gevorderde kleuters: introduceer de levenscyclus van een vlinder, voeg seizoensvolgorde-opdrachten toe, en laat kinderen een lentetuin ontwerpen en vertellen welke dieren er wonen.',
    parentTakeaway: 'De lente verandert uw buurt in een levend klaslokaal. Maak samen een lentewandeling en tel de bloemen, benoem de kleuren van bloembollen, en zoek vlinders en lieveheersbeestjes. Na een lentewerkblad kunt u samen bloembollen planten of een vlindertuin inrichten. Fotografeer dezelfde boom wekelijks en bespreek de veranderingen \u2014 deze seizoensdocumentatie verbindt werkbladen met echte natuurervaringen en bouwt wetenschappelijke observatievaardigheden op.',
    classroomIntegration: 'Het lentethema wordt een seizoensproject van maart tot mei: in de kring worden lenteverschijnselen besproken, bij werkhoeken worden bloemen en vlinders geteld en gekleurd, bij de zand- en watertafel wordt regenval nagespeeld, en buiten worden zaadjes geplant en bloemen gezocht. Dit sluit aan bij de SLO-doelen voor natuur\u00e9ducatie, seizoensbewustzijn en waarnemingsvaardigheden.',
    assessmentRubric: [
      { skill: 'Seizoenskenmerken herkennen', emerging: 'benoemt 1\u20132 lentekenmerken (bloemen, zon) met hulp van een volwassene', proficient: 'beschrijft zelfstandig 4\u20135 lentekenmerken en vergelijkt met winter', advanced: 'legt seizoensveranderingen uit en voorspelt wat er in de lente gebeurt met bomen, dieren en weer' },
      { skill: 'Tellen van lenteobjecten', emerging: 'telt 1\u20134 bloemen of vlinders met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 lenteobjecten en noteert het juiste cijfer', advanced: 'telt boven de 10, vergelijkt aantallen en groepeert per soort (bloemen vs. vlinders)' },
      { skill: 'Lentesc\u00e8nes kleuren', emerging: 'kleurt bloemen en vlinders grotendeels buiten de lijnen', proficient: 'kleurt binnen de lijnen met pastelkleuren en driepuntgreep', advanced: 'kleurt gedetailleerd met kleurvariatie, voegt eigen lente-elementen toe en beschrijft de sc\u00e8ne' },
    ],
  },

  summer: {
    seoTitle: 'Zomer-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare zomer-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'zomer kleuterschool, zomer oefeningen 3\u20134 jaar, zomer oefeningen kleuterschool, zomer uitprintbaar kleuterschool, zomer werkbladen kleuterschool, zomer activiteiten kleuterschool, zomer leerbladen 3\u20134 jaar, zomer gratis kleuterschool, zomer PDF kleuterschool, zomer kleuren',
    snippetAnswer: 'Zomer-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken stranden, ijsjes en zonnebloemen om tellen, kleuren en seizoensbewustzijn te oefenen. De zomer biedt eindeloze mogelijkheden voor zintuiglijk leren. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het zomerthema is bijzonder motiverend voor kleuters omdat drie- en vierjarigen de zomer associeren met hun leukste herinneringen \u2014 naar het strand, ijsjes eten, buiten spelen tot het donker wordt. Deze positieve emoties maken de betrokkenheid bij werkbladen uitzonderlijk hoog. Zomerwerkbladen laten kinderen schelpen en ijsjes tellen, strandsc\u00e8nes in heldere kleuren kleuren, en zomerse patronen herkennen. De SLO-leerlijnen benadrukken het belang van seizoensbewustzijn en zintuiglijke ervaring, en het zomerthema vervult beide doelen omdat kinderen werkbladen koppelen aan hun eigen vakantiebelevenissen. Het zomerthema is ook ideaal voor het oefenen van waterveiligheid en zonbescherming als levensvaardigheden.',
    developmentalMilestones: [
      { milestone: 'Seizoensbewustzijn (3\u20134-jarigen herkennen zomerkenmerken als warmte, zon en lang licht)', howWeAddress: 'Zomerwerkbladen met strandsc\u00e8nes, zon en water helpen kinderen zomerkenmerken benoemen en vergelijken met andere seizoenen' },
      { milestone: 'Tellen met concrete zomerobjecten', howWeAddress: 'Telactiviteiten met schelpen, ijsjes en zonnebloemen bouwen getalbegrip op via geliefd seizoensmateriaal' },
      { milestone: 'Kleurherkenning met heldere en warme kleuren', howWeAddress: 'Kleuractiviteiten met zomerse sc\u00e8nes in fel geel, oranje, blauw en groen breiden het kleurenpalette uit met warme tinten' },
      { milestone: 'Fijnmotorische controle bij gedetailleerd kleuren', howWeAddress: 'Kleurplaten van strandsc\u00e8nes met kleine schelpen, golfpatronen en ijsjesdetails stimuleren precieze motorische controle' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vier herkenbare zomerelementen (zon, strand, ijsje, zwemband), gebruik grote contouren, en combineer met water- en zandspel. Voor gevorderde kleuters: voeg tellopdrachten boven de tien toe, introduceer eenvoudige patronen met strandvoorwerpen, en laat kinderen hun ideale stranddag tekenen en beschrijven.',
    parentTakeaway: 'De zomer is een eindeloos klaslokaal. Tel samen schelpen op het strand, sorteer ze op grootte en kleur, en maak patronen in het zand. Maak een zomerdagboek waarin uw kind elke dag een zomeractiviteit tekent en u samen de dagen telt. Na een zomerwerkblad kunt u samen een ijsjeskraam spelen en beurten nemen bij het bestellen en tellen van bolletjes \u2014 deze speelse herhaling maakt getalbegrip stevig en zomerherinneringen onvergetelijk.',
    classroomIntegration: 'Het zomerthema vult de laatste schoolweken en de zomerperiode: in de kring worden vakantiebelevenissen gedeeld, bij werkhoeken worden strandsc\u00e8nes gekleurd en schelpen geteld, bij de zand- en watertafel wordt strandspel nagespeeld, en buiten worden waterspelletjes gespeeld. Dit sluit aan bij de SLO-doelen voor seizoensbewustzijn, sociale vaardigheden en zintuiglijke ervaring.',
    assessmentRubric: [
      { skill: 'Zomerkenmerken herkennen en benoemen', emerging: 'benoemt 1\u20132 zomerkenmerken (zon, strand) met hulp', proficient: 'beschrijft zelfstandig 4\u20135 zomerkenmerken en vergelijkt met winter of herfst', advanced: 'legt uit waarom het in de zomer warm is en beschrijft zomeractiviteiten gedetailleerd' },
      { skill: 'Tellen van strandvoorwerpen', emerging: 'telt 1\u20134 schelpen of ijsjes met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 strandvoorwerpen en noteert het juiste cijfer', advanced: 'telt boven de 10, sorteert en vergelijkt aantallen van verschillende objecten' },
      { skill: 'Zomersc\u00e8nes kleuren', emerging: 'kleurt strand- en zomersc\u00e8nes grotendeels buiten de lijnen', proficient: 'kleurt binnen de lijnen met heldere kleuren en driepuntgreep', advanced: 'kleurt gedetailleerd met kleurvariatie en voegt eigen zomerelementen toe aan de sc\u00e8ne' },
    ],
  },

  superheroes: {
    seoTitle: 'Superhelden-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare superhelden-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'superhelden kleuterschool, superhelden oefeningen 3\u20134 jaar, superhelden oefeningen kleuterschool, superhelden uitprintbaar kleuterschool, superhelden werkbladen kleuterschool, superhelden activiteiten kleuterschool, superhelden leerbladen 3\u20134 jaar, superhelden gratis kleuterschool, superhelden PDF kleuterschool, superhelden kleuren',
    snippetAnswer: 'Superhelden-oefeningen voor de kleuterschool (3\u20134 jaar) combineren capes, maskers en superkrachten met tellen, kleuren en fijne motoriek. Het fantasierijke thema motiveert kleuters om uitdagingen aan te gaan. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het superheldenthema is uniek motiverend voor kleuters omdat drie- en vierjarigen zich in de hoogtijdagen van fantasiespel bevinden \u2014 ze dragen graag capes, rennen door de tuin als superheld, en geloven oprecht in superkrachten. Deze intense betrokkenheid bij het superheldenthema maakt werkbladen tot een krachtig leermiddel. Superheldenactiviteiten laten kinderen sterren en bliksemschichten tellen op de cape, heldenmaskers in felle kleuren kleuren, en superkrachten aan de juiste held koppelen. De SLO-leerlijnen benadrukken het belang van sociaal-emotionele ontwikkeling en het opbouwen van zelfvertrouwen, en het superheldenthema vervult dit doel wanneer kinderen zich identificeren met helden die problemen oplossen en anderen helpen. Werkbladen worden missies en elke voltooide opdracht is een superkracht.',
    developmentalMilestones: [
      { milestone: 'Sociaal-emotionele ontwikkeling (3\u20134-jarigen bouwen zelfvertrouwen op via rollenspel)', howWeAddress: 'Superheldenwerkbladen waarbij kinderen hun eigen held ontwerpen stimuleren zelfexpressie en het gevoel van competentie' },
      { milestone: 'Tellen in een fantasiecontext', howWeAddress: 'Telactiviteiten met sterren, schilden en bliksemschichten op superheldenkostuums maken tellen tot een spannend avontuur' },
      { milestone: 'Kleurherkenning met felle, contrastrijke kleuren', howWeAddress: 'Kleuractiviteiten met superheldenkostuums in rood, blauw, geel en groen oefenen kleurherkenning met hoge visuele impact' },
      { milestone: 'Fijnmotorische controle bij complexe vormen', howWeAddress: 'Kleurplaten van superheldenfiguren met capes, maskers en emblemen stimuleren precieze motorische controle bij afwisselende vormen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: bied eenvoudige superheldenfiguren met grote contouren aan, beperk tellopdrachten tot vijf, en laat kinderen hun held een naam geven zonder schrijfdruk. Voor gevorderde kleuters: voeg complexere heldensc\u00e8nes toe, introduceer eenvoudige problemen die de held moet oplossen (tel de sterren om de kracht te activeren), en laat kinderen een stripverhaal met twee of drie panelen maken.',
    parentTakeaway: 'Uw kind is al een superheld \u2014 u hoeft het alleen te bevestigen. Maak samen een cape en masker, bedenk een superheldennaam, en geef uw kind superheldenmissies: tel alle rode voorwerpen in huis (superoog), zoek vijf vormen (superbrein), of kleur een superkostuum. Na een superheldenwerkblad kunt u samen een missieverhaal verzinnen: wie heeft hulp nodig en welke superkracht zetten we in? Dit stimuleert zowel getalbegrip als narratieve vaardigheden en zelfvertrouwen.',
    classroomIntegration: 'Het superheldenthema wordt een groeiend project: in de kring bespreken kinderen wat een held is, bij werkhoeken worden maskers geknutseld en werkbladen gemaakt, in de gymzaal worden superheldenparcoursen gelopen, en in de verkleedhoek worden heldenverhalen nagespeeld. Dit sluit aan bij de SLO-doelen voor sociaal-emotionele ontwikkeling, creatieve expressie en lichamelijke opvoeding.',
    assessmentRubric: [
      { skill: 'Tellen in superheldencontext', emerging: 'telt 1\u20134 sterren of schilden met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 superheldenelementen en koppelt aan het juiste cijfer', advanced: 'telt boven de 10, groepeert per soort en bedenkt eigen telopdrachten' },
      { skill: 'Creatieve zelfexpressie via heldenontwerp', emerging: 'kleurt een superheldenfiguur met hulp bij kleurkeuze', proficient: 'ontwerpt zelfstandig een held met naam en drie kenmerken (kleur, symbool, kracht)', advanced: 'vertelt een compleet heldenverhaal en tekent meerdere sc\u00e8nes' },
      { skill: 'Superheldenfiguren kleuren', emerging: 'kleurt heldenfiguren grotendeels buiten de lijnen met beperkte kleurkeuze', proficient: 'kleurt binnen de lijnen met felle kleuren en driepuntgreep', advanced: 'kleurt gedetailleerd, combineert kleuren creatief en voegt eigen elementen toe' },
    ],
  },

  toys: {
    seoTitle: 'Speelgoed-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare speelgoed-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'speelgoed kleuterschool, speelgoed oefeningen 3\u20134 jaar, speelgoed oefeningen kleuterschool, speelgoed uitprintbaar kleuterschool, speelgoed werkbladen kleuterschool, speelgoed activiteiten kleuterschool, speelgoed leerbladen 3\u20134 jaar, speelgoed gratis kleuterschool, speelgoed PDF kleuterschool, speelgoed kleuren',
    snippetAnswer: 'Speelgoed-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken poppen, auto\u2019s en blokken om tellen, sorteren en fijne motoriek te oefenen. Speelgoed is het meest vertrouwde thema voor kleuters. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het speelgoedthema is het meest directe en herkenbare thema voor kleuters omdat drie- en vierjarigen hun wereld via speelgoed verkennen \u2014 elke blok die ze stapelen, elke pop die ze aankleden en elke auto die ze laten rijden is een leerervaring. Speelgoedwerkbladen benutten deze diepe verbinding door kinderen hun eigen speelgoed te laten tellen, sorteren en kleuren op papier. Het tellen van blokken bouwt getalbegrip op, het sorteren van speelgoed op soort (poppen, auto\u2019s, dieren) ontwikkelt classificatievaardigheden, en het kleuren van gedetailleerd speelgoed stimuleert fijne motoriek. De SLO-leerlijnen benadrukken het belang van spelend leren en het verkennen van de directe leefomgeving, en speelgoedwerkbladen vervullen beide doelen omdat elk werkblad een verlengstuk is van wat kinderen dagelijks doen.',
    developmentalMilestones: [
      { milestone: 'Classificatie op categorie (3\u20134-jarigen leren groeperen op soort)', howWeAddress: 'Sorteeractiviteiten waarbij speelgoed wordt gegroepeerd op type (poppen, auto\u2019s, blokken, puzzels) bouwen classificatievermogen op via vertrouwd materiaal' },
      { milestone: 'Tellen van vertrouwde voorwerpen', howWeAddress: 'Telactiviteiten met blokken, auto\u2019s en poppen maken getalbegrip concreet en persoonlijk relevant' },
      { milestone: 'Fijnmotorische ontwikkeling via gedetailleerd kleuren', howWeAddress: 'Kleurplaten van gedetailleerd speelgoed met wielen, gezichten en bouwdetails oefenen precieze pencontrole' },
      { milestone: 'Bezitswoordenschat en delen (kleuters leren woorden als mijn, jouw, samen)', howWeAddress: 'Werkbladen waarbij kinderen speelgoed verdelen over twee of meer kinderen introduceren eerlijk delen en sociaal woordgebruik' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vier herkenbare speelgoedsoorten (pop, auto, blok, bal), bied grote afbeeldingen aan, en combineer met echt speelgoed als tastbare referentie. Voor gevorderde kleuters: introduceer meer speelgoedcategorie\u00ebn, voeg eenvoudige grafiekactiviteiten toe (welk speelgoed hebben we het meest?), en laat kinderen hun droomspeelgoedwinkel ontwerpen.',
    parentTakeaway: 'De speelgoedkist is een schatkist vol leerkansen. Tel samen de auto\u2019s, sorteer de blokken op kleur en grootte, en maak een speelgoedwinkel waar uw kind de kassier is die voorwerpen telt en prijzen noemt. Na een speelgoedwerkblad kunt u samen opruimen door speelgoed te sorteren in bakken per categorie \u2014 opruimen wordt een sorteeractiviteit die classificatievaardigheden versterkt en tegelijk orde schept.',
    classroomIntegration: 'Het speelgoedthema integreert natuurlijk in de kleuterschoolroutines: in de kring brengen kinderen hun favoriete speelgoed mee om te beschrijven, bij werkhoeken worden speelgoedwerkbladen gecombineerd met echt speelgoed, in de bouwhoek worden blokken geteld en gesorteerd, en bij opruimtijd wordt speelgoed gecategoriseerd per bak. Dit sluit aan bij de SLO-doelen voor spelend leren, classificatie en sociaal-emotionele ontwikkeling.',
    assessmentRubric: [
      { skill: 'Speelgoed classificeren op categorie', emerging: 'sorteert speelgoed in twee groepen (bijv. auto\u2019s en poppen) met hulp', proficient: 'sorteert zelfstandig op \u00e9\u00e9n kenmerk (soort, kleur of grootte) en benoemt de groepen', advanced: 'sorteert op meerdere kenmerken en legt de classificatiestrategie uit' },
      { skill: 'Tellen van speelgoedobjecten', emerging: 'telt 1\u20134 speelgoedobjecten met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 objecten en noteert het juiste cijfer', advanced: 'telt boven de 10, vergelijkt hoeveelheden en maakt een eenvoudige grafiek' },
      { skill: 'Speelgoedafbeeldingen kleuren', emerging: 'kleurt speelgoed grotendeels buiten de lijnen met beperkte kleurkeuze', proficient: 'kleurt binnen de lijnen met driepuntgreep en passende kleuren', advanced: 'kleurt gedetailleerd met kleurvariatie en voegt eigen speelgoedelementen toe' },
    ],
  },

  transportation: {
    seoTitle: 'Vervoer-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare vervoer-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vervoer kleuterschool, vervoer oefeningen 3\u20134 jaar, vervoer oefeningen kleuterschool, vervoer uitprintbaar kleuterschool, vervoer werkbladen kleuterschool, vervoer activiteiten kleuterschool, vervoer leerbladen 3\u20134 jaar, vervoer gratis kleuterschool, vervoer PDF kleuterschool, vervoer kleuren',
    snippetAnswer: 'Vervoer-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken auto\u2019s, treinen en vliegtuigen om tellen, sorteren en fijne motoriek te oefenen. Voertuigen fascineren kleuters en maken elk werkblad een avontuur. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het vervoerthema is een van de populairste thema\u2019s bij kleuters omdat drie- en vierjarigen gefascineerd zijn door alles wat beweegt \u2014 auto\u2019s, bussen, treinen, vliegtuigen en boten vormen een constante bron van verwondering. Vervoerwerkbladen benutten deze fascinatie door voertuigen te gebruiken als telmateriaal, sorteercategorie\u00ebn en kleurobjecten. Kinderen tellen wielen op een auto, sorteren voertuigen op waar ze rijden (weg, water, lucht) en kleuren gedetailleerde voertuigafbeeldingen. De SLO-leerlijnen benadrukken het verkennen van de gebouwde omgeving en het begrijpen van hoe mensen zich verplaatsen, en het vervoerthema vervult beide doelen wanneer kinderen hun dagelijkse reiservaringen (fiets, bus, auto) verbinden met werkbladactiviteiten. Bovendien ondersteunt het thema verkeersveiligheidsbewustzijn.',
    developmentalMilestones: [
      { milestone: 'Classificatie op categorie (3\u20134-jarigen leren groeperen op kenmerk)', howWeAddress: 'Sorteeractiviteiten waarbij voertuigen worden gegroepeerd op medium (weg, water, lucht) ontwikkelen classificatievermogen en logisch denken' },
      { milestone: 'Tellen van onderdelen (wielen, ramen, deuren)', howWeAddress: 'Telactiviteiten waarbij kinderen wielen van een auto of wagons van een trein tellen bouwen getalbegrip op via gedetailleerde observatie' },
      { milestone: 'Vormherkenning in voertuigonderdelen', howWeAddress: 'Voertuigwerkbladen waar kinderen ronde wielen, rechthoekige ramen en driehoekige zeilen herkennen verbinden vormkennis met echte objecten' },
      { milestone: 'Fijnmotorische controle bij rechte en gebogen lijnen', howWeAddress: 'Kleur- en overtrekactiviteiten met voertuigen (rechte wegranden, ronde wielen, gebogen carrosserie\u00ebn) oefenen diverse motorische bewegingen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vier bekende voertuigen (auto, bus, fiets, trein), bied grote contouren aan, en combineer met speelgoedvoertuigen als tastbare referentie. Voor gevorderde kleuters: introduceer meer voertuigtypen en vervoersmiddelen, voeg eenvoudige routes toe op een plattegrond, en laat kinderen hun droomvoertuig ontwerpen en beschrijven.',
    parentTakeaway: 'Elke reis is een leermoment. Tel samen de auto\u2019s op de parkeerplaats, benoem de kleuren van voorbijrijdende bussen, en sorteer speelgoedvoertuigen op grootte. Op de fiets kunt u samen verkeersborden herkennen en beschrijven. Na een vervoerwerkblad kunt u samen een reis plannen op een kaart: welk voertuig nemen we? Hoeveel stations zijn het? Tellen, sorteren en vervoerkennis komen samen in elke dagelijkse verplaatsing.',
    classroomIntegration: 'Het vervoerthema verbindt binnen en buiten: in de kring worden voertuigen besproken en gesorteerd, bij werkhoeken worden tel- en kleurbladen gemaakt, in de bouwhoek worden wegen en bruggen gebouwd voor speelgoedauto\u2019s, en buiten worden verkeersroutes nagespeeld op het schoolplein. Dit sluit aan bij de SLO-doelen voor ori\u00ebntatie op de gebouwde omgeving, rekenvaardigheid en verkeersveiligheid.',
    assessmentRubric: [
      { skill: 'Voertuigen classificeren per medium', emerging: 'benoemt 1\u20132 voertuigen (auto, boot) en waar ze rijden met hulp', proficient: 'sorteert zelfstandig 5\u20136 voertuigen in categorie\u00ebn weg, water en lucht', advanced: 'classificeert voertuigen op meerdere kenmerken en bedenkt eigen sorteercriteria' },
      { skill: 'Tellen van voertuigonderdelen', emerging: 'telt 1\u20134 wielen of ramen met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 onderdelen en noteert het juiste cijfer', advanced: 'telt boven de 10 en vergelijkt aantallen onderdelen van verschillende voertuigen' },
      { skill: 'Voertuigafbeeldingen kleuren', emerging: 'kleurt voertuigen grotendeels buiten de lijnen met volle-vuist greep', proficient: 'kleurt binnen de lijnen met driepuntgreep en passende kleuren', advanced: 'kleurt gedetailleerd, voegt eigen details toe (nummerplaat, passagiers) en beschrijft het voertuig' },
    ],
  },

  travel: {
    seoTitle: 'Reizen-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare reizen-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'reizen kleuterschool, reizen oefeningen 3\u20134 jaar, reizen oefeningen kleuterschool, reizen uitprintbaar kleuterschool, reizen werkbladen kleuterschool, reizen activiteiten kleuterschool, reizen leerbladen 3\u20134 jaar, reizen gratis kleuterschool, reizen PDF kleuterschool, reizen kleuren',
    snippetAnswer: 'Reizen-oefeningen voor de kleuterschool (3\u20134 jaar) combineren koffers, wereldkaarten en vakantiebestemmingen met tellen, kleuren en cultureel bewustzijn. Reizen verbreedt de wereld van kleuters. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het reizenthema opent een wereld van mogelijkheden voor kleuters omdat drie- en vierjarigen beginnen te begrijpen dat er plekken bestaan buiten hun directe omgeving \u2014 oma woont ver weg, het vliegtuig gaat naar een ander land, en op het strand is het altijd warm. Deze groeiende wereldori\u00ebntatie maakt het reizenthema pedagogisch waardevol. Reizenwerkbladen laten kinderen koffers inpakken (tellen van kledingstukken), bestemmingen kleuren (strand, bergen, stad), en reisattributen sorteren. De SLO-leerlijnen benadrukken het ontwikkelen van cultureel bewustzijn en ori\u00ebntatie op de wijdere wereld, en het reizenthema vervult dit doel wanneer kinderen via werkbladen verschillende landen, klimaten en culturen verkennen. Het thema stimuleert ook planning en volgorde-denken: eerst inpakken, dan reizen, dan uitpakken.',
    developmentalMilestones: [
      { milestone: 'Wereldori\u00ebntatie (3\u20134-jarigen beginnen te begrijpen dat er plekken buiten hun buurt bestaan)', howWeAddress: 'Reiswerkbladen met bestemmingen als strand, bergen en stad breiden het wereldbeeld uit en stimuleren nieuwsgierigheid naar andere plekken' },
      { milestone: 'Volgorde en planning (kleuters leren eenvoudige sequenties begrijpen)', howWeAddress: 'Inpakactiviteiten waarbij kinderen in de juiste volgorde een koffer vullen oefenen sequenti\u00eble denkvaardigheden' },
      { milestone: 'Tellen van reisattributen', howWeAddress: 'Telactiviteiten met koffers, paspoorten en reisbenodigdheden bouwen getalbegrip op in een avontuurlijke context' },
      { milestone: 'Fijnmotorische ontwikkeling via diverse reissc\u00e8nes', howWeAddress: 'Kleurplaten van reisbestemmingen met bergen, stranden en steden oefenen gevarieerde motorische bewegingen door de diversiteit aan vormen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vertrouwde reiservaringen (naar oma, naar het strand, naar de speeltuin), bied eenvoudige inpaklijsten met drie items aan, en combineer met een nep-koffer om echt in te pakken. Voor gevorderde kleuters: introduceer meer bestemmingen met bijpassend weer en kleding, voeg een eenvoudige routekaart toe, en laat kinderen een reisdagboek maken met tekeningen.',
    parentTakeaway: 'Elke uitstap is een wereldreis voor uw kleuter. Laat uw kind meehelpen met inpakken en samen de items tellen, bekijk samen een kaart en zoek waar oma woont, en maak een reisdagboek met tekeningen van bezochte plekken. Na een reiswerkblad kunt u samen een fantasiereis plannen: waar gaan we naartoe, wat pakken we in, en hoe reizen we? Dit stimuleert planning, tellen en verhalend denken in \u00e9\u00e9n speelse activiteit.',
    classroomIntegration: 'Het reizenthema wordt een meerdaags project: in de kring delen kinderen vakantiefoto\u2019s en -verhalen, bij werkhoeken worden koffers ingepakt en bestemmingen gekleurd, in de verkleedhoek worden reissc\u00e8nes nagespeeld met nep-paspoorten, en bij taalactiviteiten worden reiswoorden geleerd. Dit sluit aan bij de SLO-doelen voor cultureel bewustzijn, taalontwikkeling en ori\u00ebntatie op de wereld.',
    assessmentRubric: [
      { skill: 'Reissequenties begrijpen', emerging: 'benoemt 1\u20132 stappen van een reis (inpakken, gaan) met hulp', proficient: 'ordent zelfstandig 3\u20134 stappen van een reis in de juiste volgorde', advanced: 'beschrijft een complete reis met meerdere stappen en bedenkt variaties' },
      { skill: 'Tellen van reisbenodigdheden', emerging: 'telt 1\u20134 items in een koffer met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 reisitems en noteert het juiste cijfer', advanced: 'telt boven de 10 en vergelijkt wat nodig is voor verschillende bestemmingen' },
      { skill: 'Reissc\u00e8nes kleuren', emerging: 'kleurt reisbestemmingen grotendeels buiten de lijnen', proficient: 'kleurt binnen de lijnen met passende kleuren en driepuntgreep', advanced: 'kleurt gedetailleerd, kiest passende kleuren per bestemming en voegt eigen elementen toe' },
    ],
  },

  vegetables: {
    seoTitle: 'Groenten-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare groenten-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'groenten kleuterschool, groenten oefeningen 3\u20134 jaar, groenten oefeningen kleuterschool, groenten uitprintbaar kleuterschool, groenten werkbladen kleuterschool, groenten activiteiten kleuterschool, groenten leerbladen 3\u20134 jaar, groenten gratis kleuterschool, groenten PDF kleuterschool, groenten kleuren',
    snippetAnswer: 'Groenten-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken wortels, tomaten en komkommers om tellen, sorteren en fijne motoriek te oefenen. Groenten bevorderen zowel gezonde gewoonten als getalbegrip. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het groententhema is bijzonder geschikt voor kleuters omdat drie- en vierjarigen een cruciale fase doormaken waarin eetgewoonten worden gevormd \u2014 positieve associaties met groenten die nu worden opgebouwd, blijven een leven lang bestaan. Groentenwerkbladen combineren voedingseducatie met cognitieve vaardigheden: kinderen tellen wortels en tomaten, sorteren groenten op kleur (rode tomaat, groene komkommer, oranje wortel), en kleuren groentenafbeeldingen in natuurgetrouwe kleuren. De SLO-leerlijnen benadrukken gezondheidsbevordering en het verkennen van voeding, en het groententhema vervult beide doelen wanneer kinderen via werkbladen groenten leren herkennen, benoemen en positief waarderen. Het thema sluit ook aan bij het tuinthema en biedt mogelijkheden voor boerderij-naar-bord-begrip.',
    developmentalMilestones: [
      { milestone: 'Voedselherkenning (3\u20134-jarigen leren groenten herkennen en benoemen)', howWeAddress: 'Herkenningsactiviteiten met bekende groenten (wortel, tomaat, komkommer, paprika) bouwen woordenschat en voedselkennis op' },
      { milestone: 'Sorteren op kleur en grootte', howWeAddress: 'Sorteeractiviteiten waarbij groenten worden gegroepeerd op kleur (rood, groen, oranje) of grootte ontwikkelen classificatievaardigheden' },
      { milestone: 'Tellen van concrete voedselitems', howWeAddress: 'Telactiviteiten met groenten op een bord of in een mand bouwen getalbegrip op met tastbare, herkenbare objecten' },
      { milestone: 'Fijnmotorische precisie bij natuurlijke vormen', howWeAddress: 'Kleurplaten van groenten met ronde tomaten, langwerpige wortels en bobbelige broccoli oefenen diverse motorische bewegingen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vier bekende groenten (wortel, tomaat, komkommer, paprika), gebruik echte groenten als tastbare referentie, en bied werkbladen aan met twee in plaats van vier groenteafbeeldingen. Voor gevorderde kleuters: introduceer minder bekende groenten, voeg eenvoudige grafiekactiviteiten toe (welke groente is het populairst?), en laat kinderen een groentesoep ontwerpen met een bepaald aantal ingredi\u00ebnten.',
    parentTakeaway: 'De keuken is het ultieme groentenklasje. Laat uw kind meehelpen bij het koken: wortels tellen, tomaten sorteren op grootte, en paprika\u2019s op kleur groeperen. Maak samen een groentesoep en tel de ingredi\u00ebnten. Na een groentenwerkblad kunt u samen naar de markt gaan en de groenten van het werkblad in het echt zoeken \u2014 de verbinding tussen papier en boodschappentas maakt het leren tastbaar en bevordert tegelijk gezonde eetgewoonten.',
    classroomIntegration: 'Het groententhema loopt door de hele week: in de kring wordt de groente van de week ge\u00efntroduceerd met een echt exemplaar, bij werkhoeken worden groenten geteld en gekleurd, bij het tussendoortje worden groenten gesneden en geproefd, en in de keukenhoek wordt groentesoep gekookt. Dit sluit aan bij de SLO-doelen voor gezondheidsbevordering, rekenvaardigheid en zintuiglijke ontwikkeling.',
    assessmentRubric: [
      { skill: 'Groenten herkennen en benoemen', emerging: 'herkent 1\u20132 groenten (wortel, tomaat) met hulp van een afbeelding', proficient: 'benoemt zelfstandig 5\u20136 groenten en beschrijft hun kleur en vorm', advanced: 'benoemt 8+ groenten, beschrijft smaak en vertelt waar ze groeien' },
      { skill: 'Groenten sorteren op kenmerk', emerging: 'sorteert groenten in twee groepen (bijv. rood/groen) met hulp', proficient: 'sorteert zelfstandig op \u00e9\u00e9n kenmerk (kleur of grootte) en benoemt de groepen', advanced: 'sorteert op meerdere kenmerken en bedenkt eigen sorteercriteria' },
      { skill: 'Groentenafbeeldingen kleuren', emerging: 'kleurt groenten grotendeels buiten de lijnen met willekeurige kleuren', proficient: 'kleurt binnen de lijnen met natuurgetrouwe kleuren en driepuntgreep', advanced: 'kleurt gedetailleerd, kiest realistische kleuren en voegt eigen keukensc\u00e8ne-elementen toe' },
    ],
  },

  weather: {
    seoTitle: 'Weer-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare weer-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'weer kleuterschool, weer oefeningen 3\u20134 jaar, weer oefeningen kleuterschool, weer uitprintbaar kleuterschool, weer werkbladen kleuterschool, weer activiteiten kleuterschool, weer leerbladen 3\u20134 jaar, weer gratis kleuterschool, weer PDF kleuterschool, weer kleuren',
    snippetAnswer: 'Weer-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken zon, regen, wolken en sneeuw om tellen, kleuren en waarnemingsvaardigheden te oefenen. Het weer is dagelijks zichtbaar en maakt elk werkblad actueel. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het weerthema is pedagogisch krachtig voor kleuters omdat drie- en vierjarigen het weer elke dag ervaren \u2014 het is het eerste onderwerp dat ze bij het wakker worden waarnemen en dat hun dag be\u00efnvloedt (jas aan of niet, binnen of buiten spelen). Deze dagelijkse relevantie maakt het weerthema tot een perfect anker voor gestructureerd leren. Weerwerkbladen laten kinderen regendruppels en wolken tellen, weersymbolen sorteren, en weersc\u00e8nes in passende kleuren kleuren (gele zon, grijze regenwolken, witte sneeuw). De SLO-leerlijnen benadrukken waarnemingsvaardigheden en het beschrijven van de directe omgeving, en het weerthema vervult beide doelen wanneer kinderen dagelijks het weer waarnemen, beschrijven en op werkbladen vastleggen. Het thema ondersteunt ook de ontwikkeling van een dagelijkse routine via een weerkalender.',
    developmentalMilestones: [
      { milestone: 'Waarnemingsvaardigheden (3\u20134-jarigen leren observeren en beschrijven wat ze zien)', howWeAddress: 'Dagelijkse weerwaarnemingsactiviteiten waarbij kinderen het weer beschrijven en op werkbladen vastleggen bouwen observatievaardigheden op' },
      { milestone: 'Weersymbolen herkennen en koppelen', howWeAddress: 'Koppelactiviteiten waarbij kinderen weersymbolen (zon, wolk, regen, sneeuw) aan het juiste weer koppelen ontwikkelen symbolisch denken' },
      { milestone: 'Tellen in een weercontext', howWeAddress: 'Telactiviteiten met regendruppels, sneeuwvlokken en wolken bouwen getalbegrip op via dagelijks veranderend materiaal' },
      { milestone: 'Fijnmotorische ontwikkeling via weervormen', howWeAddress: 'Kleurplaten van ronde zonnen, kronkelende bliksem en druppelvormige regendruppels oefenen diverse motorische patronen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vier basale weertypes (zon, regen, wind, sneeuw), gebruik een groot weerkaartje als dagelijks ritueel, en combineer werkbladen met een raamkijksessie. Voor gevorderde kleuters: introduceer meer weertypes (mist, hagel, regenboog), voeg een weekoverzicht toe met weersymbolen, en laat kinderen een weerbericht presenteren aan de groep.',
    parentTakeaway: 'Het weer is het eenvoudigste gespreksonderwerp met uw kleuter \u2014 en het krachtigste. Begin elke ochtend met samen uit het raam kijken en het weer te beschrijven. Maak een weerkalender waarbij uw kind elke dag een weersymbool plakt. Na een weerwerkblad kunt u samen een regenmeter maken of wolkenvormen spotten. Deze dagelijkse herhaling bouwt waarnemingsvaardigheden, woordenschat en routines op die de basis vormen voor wetenschappelijk denken.',
    classroomIntegration: 'Het weerthema is het ideale doorlopende thema: elke ochtend wordt het weer waargenomen en op het weerbord genoteerd, bij werkhoeken worden weerwerkbladen gemaakt, bij de zand- en watertafel wordt regen nagespeeld, en buiten worden weerverschijnselen ervaren. De weerkalender wordt een wekelijks teldocument: hoeveel zonnige dagen hadden we? Dit sluit aan bij de SLO-doelen voor waarneming, rekenvaardigheid en taalontwikkeling.',
    assessmentRubric: [
      { skill: 'Weertypes herkennen en benoemen', emerging: 'benoemt 1\u20132 weertypes (zon, regen) met hulp en aanwijzen', proficient: 'beschrijft zelfstandig 4\u20135 weertypes en koppelt ze aan het juiste symbool', advanced: 'beschrijft weer gedetailleerd, vergelijkt weertypes en doet eenvoudige weervoorspellingen' },
      { skill: 'Tellen in weercontext', emerging: 'telt 1\u20134 regendruppels of wolken met hulp', proficient: 'telt zelfstandig tot 8 weerelementen en noteert het juiste cijfer', advanced: 'telt boven de 10 en maakt een eenvoudige weergrafiek van de week' },
      { skill: 'Weersc\u00e8nes kleuren', emerging: 'kleurt weersc\u00e8nes grotendeels buiten de lijnen met willekeurige kleuren', proficient: 'kleurt binnen de lijnen met passende kleuren (gele zon, grijze wolk) en driepuntgreep', advanced: 'kleurt gedetailleerd, combineert weertypes in \u00e9\u00e9n sc\u00e8ne en beschrijft het resultaat' },
    ],
  },

  winter: {
    seoTitle: 'Winter-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare winter-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'winter kleuterschool, winter oefeningen 3\u20134 jaar, winter oefeningen kleuterschool, winter uitprintbaar kleuterschool, winter werkbladen kleuterschool, winter activiteiten kleuterschool, winter leerbladen 3\u20134 jaar, winter gratis kleuterschool, winter PDF kleuterschool, winter kleuren',
    snippetAnswer: 'Winter-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken sneeuwpoppen, sneeuwvlokken en wanten om tellen, kleuren en seizoensbewustzijn te oefenen. De winter biedt unieke zintuiglijke ervaringen voor kleuters. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het winterthema is bijzonder geschikt voor kleuters omdat drie- en vierjarigen de winter intens beleven \u2014 sneeuw, ijs, warme chocomelk en dikke jassen vormen een zintuiglijke ervaring die geen ander seizoen kan evenaren. Winterwerkbladen benutten deze intense seizoenservaring door kinderen sneeuwvlokken en sneeuwpoppen te laten tellen, wintersc\u00e8nes in koele kleuren te kleuren, en winterkleding te sorteren. De SLO-leerlijnen benadrukken seizoensbewustzijn en het waarnemen van natuurverschijnselen, en het winterthema vervult beide doelen omdat kinderen de transformatie van hun omgeving door sneeuw en ijs direct ervaren. Het winterthema ondersteunt ook zelfredzaamheid (kleding kiezen bij koud weer) en biedt een rijk contrast met andere seizoenen voor vergelijkend leren.',
    developmentalMilestones: [
      { milestone: 'Seizoensbewustzijn (3\u20134-jarigen herkennen winterkenmerken als kou, sneeuw en ijs)', howWeAddress: 'Vergelijkingsactiviteiten met winter- en zomersc\u00e8nes helpen kinderen seizoenskenmerken herkennen en beschrijven' },
      { milestone: 'Tellen van winterobjecten', howWeAddress: 'Telactiviteiten met sneeuwvlokken, sneeuwballen en wanten bouwen getalbegrip op in een seizoensgebonden context' },
      { milestone: 'Patronen in sneeuwvlokken (kleuters ontdekken symmetrie)', howWeAddress: 'Sneeuwvlokwerkbladen waarbij kinderen patronen voltooien introduceren het concept symmetrie op een speelse manier' },
      { milestone: 'Zelfredzaamheid bij kleding kiezen', howWeAddress: 'Werkbladen waarbij kinderen winterkleding selecteren (muts, sjaal, wanten, jas) stimuleren zelfredzaamheid en weerbewustzijn' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vier herkenbare winterelementen (sneeuwpop, sneeuwvlok, want, muts), bied grote eenvoudige contouren aan, en combineer met echt sneeuw- of ijsspel. Voor gevorderde kleuters: introduceer symmetrische sneeuwvlokpatronen, voeg meer winterkleding en -activiteiten toe, en laat kinderen een winterverhaal vertellen en illustreren.',
    parentTakeaway: 'De winter verandert de wereld in een wit klaslokaal. Maak samen een sneeuwpop en tel de sneeuwballen, vang sneeuwvlokken op een donker papier en bekijk de vormen, en sorteer winterkleding bij het aankleden. Na een winterwerkblad kunt u samen warme chocomelk maken en de marshmallows tellen. Maak een winterdagboek met tekeningen van elke sneeuwdag \u2014 de verbinding tussen werkblad en winterervaring maakt het leren magisch en seizoensgebonden.',
    classroomIntegration: 'Het winterthema vult de maanden december tot februari: in de kring worden winterverschijnselen besproken, bij werkhoeken worden sneeuwvlokken geteld en wintersc\u00e8nes gekleurd, bij de zand- en watertafel wordt met ijs geexperimenteerd, en buiten worden sneeuwpoppen gebouwd en sneeuw onderzocht. Dit sluit aan bij de SLO-doelen voor seizoensbewustzijn, natuur\u00e9ducatie en wetenschappelijke waarneming.',
    assessmentRubric: [
      { skill: 'Winterkenmerken herkennen en benoemen', emerging: 'benoemt 1\u20132 winterkenmerken (sneeuw, kou) met hulp', proficient: 'beschrijft zelfstandig 4\u20135 winterkenmerken en vergelijkt met zomer', advanced: 'legt seizoensveranderingen uit en beschrijft hoe dieren en planten zich aanpassen aan de winter' },
      { skill: 'Tellen van winterobjecten', emerging: 'telt 1\u20134 sneeuwvlokken of sneeuwballen met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 winterobjecten en noteert het juiste cijfer', advanced: 'telt boven de 10, vergelijkt hoeveelheden en maakt een eenvoudige wintertelling' },
      { skill: 'Wintersc\u00e8nes kleuren', emerging: 'kleurt wintersc\u00e8nes grotendeels buiten de lijnen met beperkte kleurkeuze', proficient: 'kleurt binnen de lijnen met koele kleuren (wit, blauw, grijs) en driepuntgreep', advanced: 'kleurt gedetailleerd met kleurvariatie, voegt textuur toe (sneeuw, ijs) en beschrijft de sc\u00e8ne' },
    ],
  },

  xmas: {
    seoTitle: 'Kerst-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare kerst-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kerst kleuterschool, kerst oefeningen 3\u20134 jaar, kerst oefeningen kleuterschool, kerst uitprintbaar kleuterschool, kerst werkbladen kleuterschool, kerst activiteiten kleuterschool, kerst leerbladen 3\u20134 jaar, kerst gratis kleuterschool, kerst PDF kleuterschool, kerst kleuren',
    snippetAnswer: 'Kerst-oefeningen voor de kleuterschool (3\u20134 jaar) combineren kerstbomen, cadeaus en sterren met tellen, kleuren en patroonherkenning. De feestelijke sfeer maakt elk werkblad bijzonder motiverend. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het kerstthema is het meest opwindende thema voor kleuters omdat drie- en vierjarigen kerst als het hoogtepunt van het jaar ervaren \u2014 de verwachting, de versieringen, de cadeaus en de gezelligheid cre\u00ebren een emotionele betrokkenheid die onge\u00ebvenaard is. Kerstwerkbladen benutten deze intense motivatie door kinderen kerstballen en sterren te laten tellen, kerstbomen en cadeaus te kleuren, en kerstpatronen te herkennen in slingers en versiering. De SLO-leerlijnen benadrukken cultureel bewustzijn en het vieren van tradities, en het kerstthema vervult dit doel wanneer kinderen via werkbladen kersttradities verkennen. Bovendien biedt kerst een unieke context voor getalbegrip (aftellen naar kerst, cadeaus tellen) en patroonherkenning (kerstversiering met herhalende patronen).',
    developmentalMilestones: [
      { milestone: 'Anticipatie en aftellen (3\u20134-jarigen leren wachten en vooruitkijken)', howWeAddress: 'Adventskalender-activiteiten waarbij kinderen dagen aftellen bouwen getalvolgorde en geduld op via een feestelijke context' },
      { milestone: 'Patroonherkenning met kerstversiering', howWeAddress: 'Slingerpatronen met kerstballen, sterren en klokken helpen kinderen AB- en ABC-patronen herkennen en voortzetten' },
      { milestone: 'Tellen van kerstobjecten', howWeAddress: 'Telactiviteiten met kerstballen, cadeaus en sterren aan de kerstboom bouwen getalbegrip op met hoge feestelijke motivatie' },
      { milestone: 'Fijnmotorische ontwikkeling via feestelijke vormen', howWeAddress: 'Kleurplaten van kerstbomen, sterren en cadeaus met diverse detailniveaus stimuleren progressieve motorische ontwikkeling' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vier herkenbare kerstsymbolen (kerstboom, ster, cadeau, kerstbal), bied grote eenvoudige contouren aan, en combineer met echte kerstversiering als tastbare referentie. Voor gevorderde kleuters: voeg complexere patronen toe in kerstslingers, introduceer eenvoudige optelopdrachten met cadeaus, en laat kinderen hun eigen kerstkaart ontwerpen.',
    parentTakeaway: 'Kerst biedt weken van leermomenten. Versier samen de kerstboom en tel de kerstballen per kleur, maak een adventskalender en tel samen af, en sorteer kerstversiering op soort en kleur. Na een kerstwerkblad kunt u samen koekjes bakken en de ingredi\u00ebnten tellen, of kerstkaarten maken voor familie. De opwinding van kerst is de krachtigste leermotivator van het jaar \u2014 benut elke minuut voor tellen, kleuren en samen genieten.',
    classroomIntegration: 'Het kerstthema vult de hele decembermaand: in de kring wordt dagelijks afgeteld op de adventskalender, bij werkhoeken worden kerstbomen en cadeaus geteld en gekleurd, bij creatieve activiteiten worden kerstversieringen gemaakt, en bij zang- en vertelmomenten worden kerstliedjes en -verhalen gedeeld. Dit sluit aan bij de SLO-doelen voor cultureel bewustzijn, rekenvaardigheid en creatieve expressie.',
    assessmentRubric: [
      { skill: 'Kerstpatronen herkennen', emerging: 'herkent een AB-patroon in kerstslingers met hulp', proficient: 'zet zelfstandig AB- en ABC-patronen voort en benoemt het patroon', advanced: 'cre\u00ebert eigen patronen met kerstelementen en beschrijft de patroonregel' },
      { skill: 'Tellen van kerstobjecten', emerging: 'telt 1\u20134 kerstballen of cadeaus met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 kerstobjecten en koppelt aan het juiste cijfer', advanced: 'telt boven de 10, groepeert per soort en vergelijkt hoeveelheden' },
      { skill: 'Kerstsc\u00e8nes kleuren', emerging: 'kleurt kerstbomen en cadeaus grotendeels buiten de lijnen', proficient: 'kleurt binnen de lijnen met feestelijke kleuren (rood, groen, goud) en driepuntgreep', advanced: 'kleurt gedetailleerd met kleurvariatie en voegt eigen kerstelementen toe aan de sc\u00e8ne' },
    ],
  },

  zoo: {
    seoTitle: 'Dierentuin-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare dierentuin-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dierentuin kleuterschool, dierentuin oefeningen 3\u20134 jaar, dierentuin oefeningen kleuterschool, dierentuin uitprintbaar kleuterschool, dierentuin werkbladen kleuterschool, dierentuin activiteiten kleuterschool, dierentuin leerbladen 3\u20134 jaar, dierentuin gratis kleuterschool, dierentuin PDF kleuterschool, dierentuin kleuren',
    snippetAnswer: 'Dierentuin-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken leeuwen, olifanten en giraffen om tellen, sorteren en fijne motoriek te oefenen. De dierentuin brengt exotische dieren tot leven op het werkblad. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het dierentuinthema is onweerstaanbaar voor kleuters omdat drie- en vierjarigen gefascineerd zijn door grote, exotische dieren die ze normaal alleen in boeken zien \u2014 een leeuw die brult, een olifant die water spuit, een giraf met een eindeloos lange nek. Deze verwondering is een krachtige leermotivator die werkbladen transformeert in dierentuinavonturen. Dierentuinwerkbladen laten kinderen dieren tellen per verblijf, sorteren op kenmerk (groot/klein, gestreept/gevlekt), en gedetailleerde dierenafbeeldingen kleuren. De SLO-leerlijnen benadrukken het verkennen van de levende natuur en het respecteren van dieren, en het dierentuinthema vervult beide doelen wanneer kinderen via werkbladen leren over diersoorten, hun leefgebied en hun kenmerken. Bovendien stimuleert het thema empathie en zorgzaamheid voor dieren.',
    developmentalMilestones: [
      { milestone: 'Dierherkenning en -classificatie (3\u20134-jarigen leren dieren benoemen en groeperen)', howWeAddress: 'Sorteeractiviteiten waarbij dierentuindieren worden gegroepeerd op habitat (savanne, oerwoud, water) of kenmerk (gestreept, gevlekt) ontwikkelen classificatievaardigheden' },
      { milestone: 'Tellen van dieren per verblijf', howWeAddress: 'Telactiviteiten waarbij kinderen dieren in een dierentuinsc\u00e8ne tellen bouwen getalbegrip op met hoge betrokkenheid' },
      { milestone: 'Groottevergelijking (kleuters leren begrippen als groot, klein, lang, kort)', howWeAddress: 'Vergelijkingsactiviteiten met grote olifanten en kleine aapjes helpen kinderen groottebegrippen toepassen op echte dieren' },
      { milestone: 'Fijnmotorische ontwikkeling via dierencontouren', howWeAddress: 'Kleurplaten van dierentuindieren met strepen, vlekken en vachtpatronen oefenen precieze motorische controle bij gevarieerde texturen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vier bekende dierentuindieren (leeuw, olifant, aap, giraf), bied grote contouren aan zonder complexe patronen, en combineer met speelgoeddieren als tastbare referentie. Voor gevorderde kleuters: introduceer meer diersoorten en hun habitats, voeg eenvoudige dierkaarten toe met feiten, en laat kinderen hun eigen dierentuin ontwerpen met een plattegrond.',
    parentTakeaway: 'Een dierentuinbezoek is de ultieme leerervaring. Tel samen de dieren in elk verblijf, vergelijk de grootte van olifant en muis, en benoem de patronen op dierenvachten (strepen van de zebra, vlekken van de giraf). Na een dierentuinwerkblad kunt u samen een speelgoeddierentuin bouwen en de dieren sorteren op grootte, kleur of habitat. Maak een dierentuindagboek waarin uw kind bij elk bezoek een nieuw dier tekent \u2014 de combinatie van werkblad en echt bezoek maakt dierkennis levendig en duurzaam.',
    classroomIntegration: 'Het dierentuinthema wordt een meerdaags project met een schoolreis als hoogtepunt: in de kring worden dieren ge\u00efntroduceerd met foto\u2019s en geluiden, bij werkhoeken worden dierentuinwerkbladen gemaakt en speelgoeddieren gesorteerd, in de bouwhoek worden verblijven gebouwd, en de schoolreis naar de dierentuin vormt het bekronende leerevenement. Dit sluit aan bij de SLO-doelen voor natuur\u00e9ducatie, rekenvaardigheid en sociaal-emotionele ontwikkeling.',
    assessmentRubric: [
      { skill: 'Dierentuindieren classificeren', emerging: 'benoemt 1\u20132 dierentuindieren (leeuw, olifant) met hulp', proficient: 'sorteert zelfstandig 5\u20136 dieren op kenmerk (groot/klein, gestreept/gevlekt) en benoemt ze', advanced: 'classificeert dieren op habitat en kenmerk en legt de classificatie uit' },
      { skill: 'Tellen van dieren in een sc\u00e8ne', emerging: 'telt 1\u20134 dieren met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 dieren in een dierentuinsc\u00e8ne en noteert het cijfer', advanced: 'telt boven de 10, vergelijkt aantallen per verblijf en maakt een eenvoudige grafiek' },
      { skill: 'Dierentuindieren kleuren', emerging: 'kleurt dieren grotendeels buiten de lijnen met willekeurige kleuren', proficient: 'kleurt binnen de lijnen met natuurgetrouwe kleuren en driepuntgreep', advanced: 'kleurt gedetailleerd met vachtpatronen (strepen, vlekken) en voegt habitat-elementen toe' },
    ],
  },
};

// Build the SEO insertion text (seoTitle, seoDescription, seoKeywords) - goes BEFORE intro
function buildSeoInsertionText(data) {
  const lines = [];
  lines.push(`      seoTitle: '${esc(data.seoTitle)}',`);
  lines.push(`      seoDescription: '${esc(data.seoDescription)}',`);
  lines.push(`      seoKeywords: '${esc(data.seoKeywords)}',`);
  return lines.join('\n');
}

// Build the enrichment insertion text (7 fields) - goes AFTER faq
function buildEnrichmentInsertionText(data) {
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
  const filePath = path.join(THEMES_DIR, theme, 'nl.ts');

  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${filePath}`);
    errorCount++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already enriched (seoTitle in preschool block)
  const preschoolIdx = content.indexOf("'preschool'");
  const kindergartenIdx = content.indexOf("'kindergarten'");

  if (preschoolIdx === -1 || kindergartenIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  const preschoolBlock = content.substring(preschoolIdx, kindergartenIdx);
  if (preschoolBlock.includes('seoTitle:')) {
    console.log(`SKIP (already enriched): ${theme}/nl.ts`);
    continue;
  }

  // STEP 1: Insert seoTitle/seoDescription/seoKeywords right after "'preschool': {"
  const preschoolOpenPattern = "'preschool': {";
  const preschoolOpenIdx = content.indexOf(preschoolOpenPattern);
  if (preschoolOpenIdx === -1) {
    console.error(`NO PRESCHOOL OPEN FOUND: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  const seoInsertPos = preschoolOpenIdx + preschoolOpenPattern.length;
  const seoText = '\n' + buildSeoInsertionText(enrichments[theme]);
  content = content.substring(0, seoInsertPos) + seoText + content.substring(seoInsertPos);

  // STEP 2: Insert 7 enrichment fields after faq array (recalculate positions after insertion)
  const newPreschoolIdx = content.indexOf("'preschool'");
  const newKindergartenIdx = content.indexOf("'kindergarten'");
  const newPreschoolBlock = content.substring(newPreschoolIdx, newKindergartenIdx);

  // Find the last "],\n" in the preschool block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(newPreschoolBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const enrichInsertPos = newPreschoolIdx + lastMatch.index + lastMatch[0].length;
  const enrichText = buildEnrichmentInsertionText(enrichments[theme]) + '\n';
  content = content.substring(0, enrichInsertPos) + enrichText + content.substring(enrichInsertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/nl.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
