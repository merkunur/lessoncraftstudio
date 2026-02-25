#!/usr/bin/env node
/**
 * SEO Part 326: NL First-Grade Enrichment — Themes 39-50
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the first-grade grade block of 12 NL theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    seoTitle: 'Sport-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare sport-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'sport groep 3, sport oefeningen 6\u20137 jaar, sport oefeningen groep 3, sport uitprintbaar groep 3, sport werkbladen groep 3, sport activiteiten groep 3, sport leerbladen 6\u20137 jaar, sport gratis groep 3, sport PDF groep 3, sport rekenen groep 3',
    snippetAnswer: 'Sport-oefeningen voor groep 3 (6\u20137 jaar) gebruiken sportcontexten voor optellen en aftrekken tot 20, redactiesommen over scores en wedstrijden, sportwoorden lezen en schrijven en gegevens ordenen in eenvoudige tabellen. Kinderen rekenen met doelpunten, speelrondes en teams. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het sportthema een dynamische context voor rekenen met scores en gegevensverwerking: zes- en zevenjarigen kennen de basissportregels en zijn klaar om scores bij te houden en te berekenen. De SLO-leerlijnen benadrukken optellen en aftrekken tot 20 en eenvoudige gegevensregistratie, en sport biedt de meest motiverende context. Redactiesommen over wedstrijden \u2014 het ene team scoort 9 doelpunten, het andere 7, hoeveel verschil? \u2014 oefenen het vertalen van een wedstrijdverslag naar een rekenbewerking. Het bijhouden van een scoretabel na elke speelronde introduceert gegevensordening in een herkenbare situatie. Sportwoorden als scheidsrechter, kampioenschap en basketbalveld zijn uitstekend decodeermateriaal met samengestelde woorden en lange klankcombinaties. Het schrijven van een wedstrijdverslag oefent informatief schrijven met chronologie en feitjes. De link met teamwork en fair play biedt waardevolle sociaal-emotionele leermomenten.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 20 met scores (6\u20137-jarigen rekenen met wedstrijdscores)', howWeAddress: 'Score-rekenactiviteiten waarbij kinderen doelpunten optellen, het verschil berekenen en de totaalscore noteren bieden herhaalde oefening in een spannende context' },
      { milestone: 'Gegevens registreren in een tabel (scoretabel bijhouden per speelronde)', howWeAddress: 'Tabelactiviteiten waarbij kinderen scores per ronde noteren en het totaal berekenen introduceren gegevensordening in een herkenbare setting' },
      { milestone: 'Sportwoorden decoderen en schrijven (samengestelde sportwoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met sportwoorden oefenen het decoderen van samenstellingen als scheidsrechter en basketbalveld' },
      { milestone: 'Informatief schrijven over wedstrijden (een verslag met chronologie en feitjes)', howWeAddress: 'Verslagactiviteiten waarbij kinderen een kort wedstrijdverslag schrijven oefenen informatief schrijven met tijdsvolgorde en sportwoordenschat' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10 met eenvoudige scores, bied sportwoorden aan met plaatjes en een woordenbank, en gebruik scoretabellen met twee ronden. Voor gevorderde kinderen: introduceer sommen tot 20 met verschilberekeningen en ontbrekende termen, laat hen een uitgebreide scoretabel met vijf ronden bijhouden, en daag hen uit met een volledig wedstrijdverslag inclusief analyse.',
    parentTakeaway: 'Sport maakt rekenen dynamisch in groep 3. Houd samen de score bij van een wedstrijd op televisie of in het park: hoeveel doelpunten in de eerste helft, hoeveel in de tweede, hoeveel bij elkaar? Speel een potje en laat uw kind de score bijhouden op papier \u2014 in een tabel, net als echte sportverslaggevers. Na een sportwerkblad kunt u samen het verschil berekenen: wie heeft er meer gescoord en hoeveel meer?',
    classroomIntegration: 'Het sportthema verbindt in groep 3 rekenen (sommen met scores, scoretabel bijhouden, verschilberekeningen), taal (sportwoorden lezen, een wedstrijdverslag schrijven), bewegingsonderwijs (spelregels, teamwork) en sociaal-emotioneel leren (fair play, samenwerken). Een sportweek met werkbladen, een minitornooi en verslagschrijven combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Scoreberekeningen tot 20', emerging: 'telt scores op tot 10 maar heeft moeite met verschilberekeningen', proficient: 'rekent vlot op en af tot 20 met wedstrijdscores en noteert sommen correct', advanced: 'lost meerstaps-scoresommen op, berekent verschil en gemiddelde en bedenkt eigen sportrekenvragen' },
      { skill: 'Scoretabel bijhouden', emerging: 'vult een tabel in met hulp maar maakt fouten bij de totalen', proficient: 'houdt zelfstandig een scoretabel bij met correcte ronde- en totaalscores', advanced: 'ontwerpt een eigen scoretabel, berekent totalen en vergelijkt de prestaties van twee teams' },
      { skill: 'Sportwoorden lezen en schrijven', emerging: 'leest korte sportwoorden (bal, doel) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien sportwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle sportwoorden en schrijft een informatief wedstrijdverslag met correcte zinnen' },
    ],
  },

  spring: {
    seoTitle: 'Lente-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare lente-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'lente groep 3, lente oefeningen 6\u20137 jaar, lente oefeningen groep 3, lente uitprintbaar groep 3, lente werkbladen groep 3, lente activiteiten groep 3, lente leerbladen 6\u20137 jaar, lente gratis groep 3, lente PDF groep 3, lente rekenen groep 3',
    snippetAnswer: 'Lente-oefeningen voor groep 3 (6\u20137 jaar) gebruiken de lentenatuur voor optellen en aftrekken tot 20, redactiesommen over bloemen en dieren, lentewoorden lezen en schrijven en seizoensobservaties vastleggen. Kinderen rekenen met bloembollen, vlinders en lammetjes. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het lentethema een buitenleslokaal voor meten en observeren: zes- en zevenjarigen kunnen plantgroei meten, weersveranderingen bijhouden en hun waarnemingen opschrijven. De SLO-leerlijnen benadrukken meten, gegevensregistratie en informatief schrijven als kerndoelen, en de lente biedt de rijkste seizoenscontext. Kinderen meten elke week hoe hoog hun krokus of tulp is gegroeid, noteren de temperatuur in een weertabel en vergelijken het weer van de afgelopen weken. Redactiesommen over de lente \u2014 er bloeien 8 tulpen, er komen er 5 bij, hoeveel bloeien er nu? \u2014 verbinden rekenen met natuurobservatie. Lentewoorden als sneeuwklokje, kikkerdril en voorjaarsstorm zijn motiverend decodeermateriaal. Het schrijven van een seizoensdagboek oefent informatief schrijven met datum, observatie en meting. De overgang van winter naar lente biedt rijke vergelijkingsmogelijkheden.',
    developmentalMilestones: [
      { milestone: 'Meten van plantgroei in centimeters (6\u20137-jarigen meten en registreren lentegroei)', howWeAddress: 'Meetactiviteiten waarbij kinderen lenteplantjes wekelijks meten en de resultaten in een groeigrafiek noteren bouwen meetvaardigheden op' },
      { milestone: 'Redactiesommen over de lente (kinderen rekenen met bloemen, dieren en eieren)', howWeAddress: 'Lenteverhaal-opdrachten met optel- en aftreksituaties oefenen het vertalen van natuurobservaties naar rekensom' },
      { milestone: 'Lentewoorden decoderen en schrijven (samengestelde seizoenswoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met lentewoorden oefenen het decoderen van samenstellingen als sneeuwklokje en kikkerdril' },
      { milestone: 'Informatief schrijven in een seizoensdagboek (weer, groei en dieren noteren)', howWeAddress: 'Dagboekactiviteiten waarbij kinderen dagelijks weer en natuur vastleggen oefenen informatief schrijven met datum, observatie en meting' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10 met lenteplaatjes, bied lentewoorden aan met foto\u2019s en een woordenbank, en meet met eenvoudige eenheden. Voor gevorderde kinderen: introduceer sommen tot 20 met verschilberekeningen over groei, laat hen een weertabel met vijf dagen bijhouden en vergelijken, en daag hen uit met een uitgebreid seizoensdagboek met conclusies over lentepatronen.',
    parentTakeaway: 'De lente biedt dagelijkse leerkansen in groep 3. Plant samen bollen en meet elke week de groei: hoeveel centimeter erbij, hoeveel in totaal? Tel samen de bloemen in de tuin of het park: hoeveel tulpen, hoeveel narcissen, hoeveel bij elkaar? Na een lentewerkblad kunt u samen een lentedagboek bijhouden \u2014 welke dieren zag je, hoe warm was het, hoeveel bloemen bloeien er al?',
    classroomIntegration: 'Het lentethema integreert in groep 3 met rekenen (meten, groeigrafiek, sommen met lenteaantallen), taal (lentewoorden lezen, een seizoensdagboek schrijven), natuur (plantgroei, diergedrag, weer) en beeldende vorming (lentelandschappen tekenen). Een lenteproject met werkbladen, een schooltuinactiviteit en een klassendagboek combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Meten van lentegroei', emerging: 'vergelijkt planthoogtes (hoger/lager) maar meet niet zelfstandig in centimeters', proficient: 'meet correct met een liniaal en noteert de resultaten wekelijks in een tabel', advanced: 'berekent de groei per week, vergelijkt planten onderling en maakt een groeigrafiek' },
      { skill: 'Lenterekensommen', emerging: 'lost optelsommen tot 10 op in lentecontext maar heeft moeite met aftrekken', proficient: 'rekent vlot op en af tot 20 met lenteaantallen en noteert sommen correct', advanced: 'lost meerstaps-redactiesommen op en bedenkt eigen lenterekenvragen' },
      { skill: 'Lentewoorden lezen en schrijven', emerging: 'leest korte lentewoorden (lam, tulp) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien lentewoorden correct inclusief samenstellingen', advanced: 'leest vlot alle lentewoorden en schrijft informatieve zinnen in een seizoensdagboek' },
    ],
  },

  summer: {
    seoTitle: 'Zomer-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare zomer-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'zomer groep 3, zomer oefeningen 6\u20137 jaar, zomer oefeningen groep 3, zomer uitprintbaar groep 3, zomer werkbladen groep 3, zomer activiteiten groep 3, zomer leerbladen 6\u20137 jaar, zomer gratis groep 3, zomer PDF groep 3, zomer rekenen groep 3',
    snippetAnswer: 'Zomer-oefeningen voor groep 3 (6\u20137 jaar) gebruiken zomertaferelen voor optellen en aftrekken tot 20, redactiesommen over strand en ijsjes, zomerwoorden lezen en schrijven en temperaturen vergelijken. Kinderen rekenen met schelpen, ijsbolletjes en zwembeurten. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het zomerthema een vakantiecontext die intrinsiek motiverend is en ideaal voor het tegengaan van de zomerdip: zes- en zevenjarigen verliezen zonder oefening rekenvaardigheden, en zomerwerkbladen houden de vooruitgang vast. De SLO-leerlijnen benadrukken optellen en aftrekken tot 20 en meten, en de zomer biedt speelse oefencontexten. Redactiesommen over het strand \u2014 je vindt 12 schelpen, geeft er 5 weg, hoeveel houd je over? \u2014 verbinden rekenen met vakantie-ervaringen. Temperaturen aflezen en vergelijken \u2014 maandag 24 graden, dinsdag 28 graden, hoeveel verschil? \u2014 introduceert meten met betekenis. Zomerwoorden als zonnebrandcr\u00e8me, watermeloen en zwemparadijs zijn motiverend decodeermateriaal met samengestelde woorden. Het schrijven van een vakantiedagboek oefent informatief schrijven met datum, activiteit en beleving.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 20 in zomercontext (6\u20137-jarigen rekenen met strandmateriaal)', howWeAddress: 'Strandrekenactiviteiten met schelpen, ijsjes en zwembeurten bieden herhaalde oefening van sommen tot 20 in een zomerse setting' },
      { milestone: 'Temperaturen aflezen en vergelijken (thermometer lezen en verschil berekenen)', howWeAddress: 'Thermometeractiviteiten waarbij kinderen dagtemperaturen aflezen, noteren en het verschil berekenen bouwen meetvaardigheden op' },
      { milestone: 'Zomerwoorden decoderen en schrijven (lange samengestelde zomerwoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met zomerwoorden oefenen het decoderen van samenstellingen als zonnebrandcr\u00e8me en watermeloen' },
      { milestone: 'Informatief schrijven in een vakantiedagboek (datum, activiteit, beleving)', howWeAddress: 'Dagboekactiviteiten waarbij kinderen dagelijks hun zomerbelevenissen opschrijven oefenen informatief schrijven met chronologie' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10 met zomerplaatjes, bied zomerwoorden aan met foto\u2019s en een woordenbank, en lees temperaturen af op een vereenvoudigde thermometer. Voor gevorderde kinderen: introduceer sommen tot 20 met meerdere bewerkingen, laat hen een weektabel met temperaturen bijhouden en het verschil berekenen, en daag hen uit met een uitgebreid vakantiedagboek met grafieken.',
    parentTakeaway: 'De zomer is ideaal om rekenvaardigheden van groep 3 te onderhouden. Tel samen schelpen op het strand: hoeveel witte, hoeveel roze, hoeveel bij elkaar? Lees samen de thermometer af: hoe warm is het vandaag, hoeveel warmer dan gisteren? Na een zomerwerkblad kunt u samen een vakantiedagboek bijhouden \u2014 wat deed je, hoeveel graden was het, hoeveel ijsjes heb je deze week gehad?',
    classroomIntegration: 'Het zomerthema integreert in groep 3 met rekenen (sommen met strandmateriaal, temperaturen vergelijken), taal (zomerwoorden lezen, een vakantiedagboek schrijven), natuur (seizoenskenmerken, zon en schaduw) en beeldende vorming (strandtaferelen tekenen). Een zomerproject met werkbladen, een thermometeractiviteit en dagboekschrijven combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Zomerrekensommen tot 20', emerging: 'lost optelsommen tot 10 op in zomercontext maar heeft moeite met aftrekken', proficient: 'rekent vlot op en af tot 20 met zomermateriaal en noteert sommen correct', advanced: 'lost meerstaps-redactiesommen op en bedenkt eigen zomerrekenvragen met temperaturen' },
      { skill: 'Temperaturen aflezen en vergelijken', emerging: 'leest een thermometer af met hulp maar berekent het verschil niet zelfstandig', proficient: 'leest zelfstandig temperaturen af en berekent het verschil tussen twee dagen', advanced: 'houdt een weektabel bij, berekent het warmste en koelste moment en maakt een temperatuurgrafiek' },
      { skill: 'Zomerwoorden lezen en schrijven', emerging: 'leest korte zomerwoorden (zon, zee) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien zomerwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle zomerwoorden en schrijft een informatief vakantiedagboek met correcte zinnen' },
    ],
  },

  superheroes: {
    seoTitle: 'Superhelden-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare superhelden-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'superhelden groep 3, superhelden oefeningen 6\u20137 jaar, superhelden oefeningen groep 3, superhelden uitprintbaar groep 3, superhelden werkbladen groep 3, superhelden activiteiten groep 3, superhelden leerbladen 6\u20137 jaar, superhelden gratis groep 3, superhelden PDF groep 3, superhelden rekenen groep 3',
    snippetAnswer: 'Superhelden-oefeningen voor groep 3 (6\u20137 jaar) gebruiken heldenscenario\u2019s voor optellen en aftrekken tot 20, redactiesommen over reddingsmissies, heldenwoorden lezen en schrijven en logisch redeneren bij missies. Kinderen rekenen met krachten, missies en superschurken. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het superheldenthema een fantasierijke context die de motivatie voor rekenen en schrijven sterk verhoogt: zes- en zevenjarigen zijn dol op superheldenverhalen en die betrokkenheid kan worden ingezet voor leerdoelen. De SLO-leerlijnen benadrukken optellen en aftrekken tot 20, logisch redeneren en verhalend schrijven, en superheldenmissies bieden alle drie. Redactiesommen over reddingsmissies \u2014 de held redt 8 mensen uit het ene gebouw en 7 uit het andere, hoeveel bij elkaar? \u2014 oefenen optellen in een meeslepende context. Logische puzzels over welke held welke superkracht heeft introduceren logisch redeneren. Heldenwoorden als onzichtbaarheid, superkracht en hoofdkwartier zijn uitstekend decodeermateriaal met meerlettergrepige woorden. Het schrijven van een eigen superheldenverhaal oefent verhalend schrijven met personage, probleem en oplossing. De morele thema\u2019s \u2014 helpen, moed en rechtvaardigheid \u2014 bieden waardevolle sociaal-emotionele leermomenten.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 20 met reddingsaantallen (6\u20137-jarigen rekenen met missiescores)', howWeAddress: 'Missie-rekenactiviteiten waarbij kinderen geredde personen optellen en de resterende berekenen bieden herhaalde oefening in een fantasierijke context' },
      { milestone: 'Logisch redeneren met heldenpuzzels (welke held heeft welke kracht?)', howWeAddress: 'Logische puzzels waarbij kinderen aanwijzingen combineren om helden aan superkrachten te koppelen oefenen deductief denken' },
      { milestone: 'Heldenwoorden decoderen en schrijven (meerlettergrepige fantasiewoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met heldenwoorden oefenen het decoderen van lange woorden als onzichtbaarheid en hoofdkwartier' },
      { milestone: 'Verhalend schrijven over een superheld (personage, probleem, oplossing)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een eigen superheldenverhaal bedenken oefenen verhalend schrijven met verhaalstructuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied heldenwoorden aan met plaatjes en een woordenbank, en gebruik eenvoudige puzzels met twee kenmerken. Voor gevorderde kinderen: introduceer sommen tot 20 met ontbrekende termen over missies, laat hen een logische puzzel met drie helden en drie krachten oplossen, en daag hen uit met een meerdelig superheldenverhaal met dialoog.',
    parentTakeaway: 'Superhelden maken rekenen avontuurlijk in groep 3. Bedenk samen een reddingsmissie: de held redt 6 mensen uit huis A en 9 uit huis B, hoeveel bij elkaar? Hoeveel moeten er nog gered worden als er 20 in nood zijn? Laat uw kind een eigen superheld bedenken met naam, kracht en verhaal. Na een superheldenwerkblad kunt u samen een heldenverhaal schrijven \u2014 wie is de held, wat is het probleem, en hoe lost de held het op?',
    classroomIntegration: 'Het superheldenthema verbindt in groep 3 rekenen (sommen met missieaantallen, logische puzzels), taal (heldenwoorden lezen, een superheldenverhaal schrijven), sociaal-emotioneel leren (moed, helpen, rechtvaardigheid) en beeldende vorming (een eigen superheld ontwerpen). Een heldenweek met werkbladen, een schrijfactiviteit en een kostumdag combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Missierekensommen tot 20', emerging: 'lost optelsommen tot 10 op in heldencontext maar heeft moeite met aftrekken', proficient: 'rekent vlot op en af tot 20 met missieaantallen en noteert sommen correct', advanced: 'lost meerstaps-missieredactiesommen op en bedenkt eigen heldenrekenvragen' },
      { skill: 'Logisch redeneren met heldenpuzzels', emerging: 'lost puzzels met twee kenmerken op met hulp', proficient: 'koppelt zelfstandig drie helden aan drie krachten op basis van aanwijzingen', advanced: 'lost complexe puzzels op met vier kenmerken en legt de redenering schriftelijk uit' },
      { skill: 'Heldenwoorden lezen en schrijven', emerging: 'leest korte heldenwoorden (held, cape) maar hapert bij lange woorden', proficient: 'leest en schrijft acht tot tien heldenwoorden correct inclusief meerlettergrepige woorden', advanced: 'leest vlot alle heldenwoorden en schrijft een verhalend superheldenverhaal met correcte zinnen' },
    ],
  },

  toys: {
    seoTitle: 'Speelgoed-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare speelgoed-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'speelgoed groep 3, speelgoed oefeningen 6\u20137 jaar, speelgoed oefeningen groep 3, speelgoed uitprintbaar groep 3, speelgoed werkbladen groep 3, speelgoed activiteiten groep 3, speelgoed leerbladen 6\u20137 jaar, speelgoed gratis groep 3, speelgoed PDF groep 3, speelgoed rekenen groep 3',
    snippetAnswer: 'Speelgoed-oefeningen voor groep 3 (6\u20137 jaar) gebruiken speelgoedcontexten voor optellen en aftrekken tot 20, redactiesommen over winkeltje spelen, speelgoedwoorden lezen en schrijven en sorteren op meerdere kenmerken. Kinderen rekenen met blokken, poppen en auto\u2019s. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het speelgoedthema een vertrouwde context voor winkeltje spelen en rekenen met geld: zes- en zevenjarigen spelen dagelijks met speelgoed en die vertrouwdheid kan worden ingezet voor formeel rekenen. De SLO-leerlijnen benadrukken optellen en aftrekken tot 20 en introductie van geldrekenen, en een speelgoedwinkel biedt de ideale setting. Redactiesommen over winkeltje spelen \u2014 een pop kost 8 euro, een auto 6 euro, hoeveel bij elkaar? \u2014 oefenen optellen met een functioneel doel. Prijzen vergelijken en wisselgeld berekenen introduceren geldconcepten. Speelgoedwoorden als legobouwdoos, knuffeldier en puzzelstuk zijn motiverend decodeermateriaal met samengestelde woorden. Het schrijven van een verlanglijstje of speelgoedrecensie oefent functioneel en overtuigend schrijven. Sorteren op prijs, grootte en materiaal oefent classificatie op meerdere kenmerken.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 20 met speelgoedprijzen (6\u20137-jarigen rekenen met winkelbedragen)', howWeAddress: 'Winkelactiviteiten waarbij kinderen speelgoedprijzen optellen en wisselgeld berekenen bieden herhaalde oefening in een functionele context' },
      { milestone: 'Sorteren op meerdere kenmerken (speelgoed ordenen op soort, prijs en materiaal)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen speelgoed classificeren op twee of drie kenmerken bouwen wetenschappelijk denken op' },
      { milestone: 'Speelgoedwoorden decoderen en schrijven (samengestelde speelgoedwoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met speelgoedwoorden oefenen het decoderen van samenstellingen als legobouwdoos en knuffeldier' },
      { milestone: 'Functioneel schrijven: verlanglijstje en recensie (overtuigend en informatief)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een verlanglijstje opstellen of een speelgoedrecensie schrijven oefenen functioneel schrijven met argumenten' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10 met eenvoudige prijzen, bied speelgoedwoorden aan met plaatjes en een woordenbank, en sorteer op \u00e9\u00e9n kenmerk. Voor gevorderde kinderen: introduceer sommen tot 20 met wisselgeldberekeningen, laat hen een speelgoedcatalogus maken met prijzen en totalen berekenen, en daag hen uit met een overtuigende speelgoedrecensie met argumenten.',
    parentTakeaway: 'Speelgoed biedt natuurlijke rekenkansen in groep 3. Speel samen winkeltje: hoeveel kost de beer, hoeveel de auto, hoeveel bij elkaar? Als je 20 euro hebt en de pop kost 13, hoeveel krijg je terug? Laat uw kind speelgoed sorteren: alle rode speeltjes bij elkaar, alle zachte apart. Na een speelgoedwerkblad kunt u samen een verlanglijstje schrijven met prijzen en uitrekenen hoeveel alles bij elkaar kost.',
    classroomIntegration: 'Het speelgoedthema integreert in groep 3 met rekenen (sommen met prijzen, wisselgeld, sorteren), taal (speelgoedwoorden lezen, een verlanglijstje en recensie schrijven), techniek (hoe werkt speelgoed, constructie) en sociaal-emotioneel leren (delen, ruilen, waarderen). Een speelgoedwinkeltje in de klas met werkbladen en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Speelgoedrekensommen tot 20', emerging: 'telt prijzen op tot 10 maar berekent wisselgeld niet zelfstandig', proficient: 'rekent vlot op en af tot 20 met speelgoedprijzen en berekent wisselgeld correct', advanced: 'lost meerstaps-winkelsommen op, vergelijkt totalen en bedenkt eigen prijsredactiesommen' },
      { skill: 'Speelgoed sorteren', emerging: 'sorteert op \u00e9\u00e9n kenmerk (kleur) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en legt de redenering schriftelijk uit' },
      { skill: 'Speelgoedwoorden lezen en schrijven', emerging: 'leest korte speelgoedwoorden (pop, bal) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien speelgoedwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle speelgoedwoorden en schrijft een overtuigende speelgoedrecensie met argumenten' },
    ],
  },

  transportation: {
    seoTitle: 'Vervoer-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare vervoer-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vervoer groep 3, vervoer oefeningen 6\u20137 jaar, vervoer oefeningen groep 3, vervoer uitprintbaar groep 3, vervoer werkbladen groep 3, vervoer activiteiten groep 3, vervoer leerbladen 6\u20137 jaar, vervoer gratis groep 3, vervoer PDF groep 3, vervoer rekenen groep 3',
    snippetAnswer: 'Vervoer-oefeningen voor groep 3 (6\u20137 jaar) gebruiken voertuigen voor optellen en aftrekken tot 20, redactiesommen over passagiers en ritten, vervoerwoorden lezen en schrijven en routes op een eenvoudige kaart volgen. Kinderen rekenen met bussen, treinen en fietsen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het vervoerthema een krachtige context voor rekenen met passagiers en routeplanning: zes- en zevenjarigen reizen dagelijks en die ervaring kan worden ingezet voor formeel rekenen en ruimtelijk denken. De SLO-leerlijnen benadrukken optellen en aftrekken tot 20, meten en ruimtelijke ori\u00ebntatie als kerndoelen, en vervoer biedt alle drie. Redactiesommen over busreizigers \u2014 bij de eerste halte stappen 8 mensen in, bij de tweede stappen er 5 uit, hoeveel zitten er nog in de bus? \u2014 zijn klassieke contexten voor rekenen met verandering. Afstanden vergelijken op een eenvoudige kaart \u2014 naar school is 3 blokken, naar de winkel 7 blokken, hoeveel verschil? \u2014 introduceren meten met betekenis. Vervoerwoorden als verkeerslicht, fietspad en spoorwegovergang zijn uitstekend decodeermateriaal met samengestelde woorden. Het schrijven van een reisbeschrijving oefent informatief schrijven met chronologie en locatie.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 20 met passagiers (6\u20137-jarigen rekenen met in- en uitstappers)', howWeAddress: 'Bushalte-rekenactiviteiten waarbij kinderen passagiers tellen bij in- en uitstappen bieden herhaalde oefening van sommen met verandering' },
      { milestone: 'Afstanden vergelijken op een eenvoudige kaart (meten in blokken of stappen)', howWeAddress: 'Kaartactiviteiten waarbij kinderen routes tellen en afstanden vergelijken oefenen ruimtelijk denken en meten' },
      { milestone: 'Vervoerwoorden decoderen en schrijven (samengestelde verkeerswoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met vervoerwoorden oefenen het decoderen van samenstellingen als verkeerslicht en spoorwegovergang' },
      { milestone: 'Informatief schrijven over een reis (route, vervoermiddel, chronologie)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een reis beschrijven met vervoermiddel, route en beleving oefenen informatief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10 met eenvoudige busscenario\u2019s, bied vervoerwoorden aan met plaatjes en een woordenbank, en gebruik een kaart met drie bestemmingen. Voor gevorderde kinderen: introduceer sommen tot 20 met meerdere haltes en in-/uitstappers, laat hen een route op een stadskaart plannen met afstandsberekeningen, en daag hen uit met een uitgebreide reisbeschrijving.',
    parentTakeaway: 'Vervoer biedt dagelijkse rekenkansen in groep 3. Tel samen in de bus: hoeveel mensen stappen hier in, hoeveel stappen er uit, hoeveel zitten er nu? Vergelijk afstanden: naar school zijn 5 straten, naar opa 12 straten, hoeveel verschil? Na een vervoerwerkblad kunt u samen een reis plannen: welk vervoermiddel, hoeveel haltes, hoe lang duurt het?',
    classroomIntegration: 'Het vervoerthema integreert in groep 3 met rekenen (sommen met passagiers, afstanden vergelijken), taal (vervoerwoorden lezen, een reisbeschrijving schrijven), aardrijkskunde (routes, kaartlezen, richtingen) en verkeerseducatie (veilig oversteken, verkeersborden). Een vervoerproject met werkbladen, een route-activiteit en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Passagiersrekensommen tot 20', emerging: 'telt instappers op tot 10 maar berekent uitstappers niet zelfstandig', proficient: 'rekent vlot op en af tot 20 met in- en uitstappers bij meerdere haltes', advanced: 'lost meerstaps-haltesommen op en bedenkt eigen vervoerredactiesommen' },
      { skill: 'Afstanden vergelijken op een kaart', emerging: 'telt blokken op een kaart met hulp maar vergelijkt niet zelfstandig', proficient: 'telt zelfstandig afstanden op een eenvoudige kaart en berekent het verschil', advanced: 'plant een effici\u00ebnte route langs meerdere bestemmingen en berekent de totale afstand' },
      { skill: 'Vervoerwoorden lezen en schrijven', emerging: 'leest korte vervoerwoorden (bus, trein) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien vervoerwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle vervoerwoorden en schrijft een informatieve reisbeschrijving met correcte zinnen' },
    ],
  },

  travel: {
    seoTitle: 'Reizen-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare reizen-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'reizen groep 3, reizen oefeningen 6\u20137 jaar, reizen oefeningen groep 3, reizen uitprintbaar groep 3, reizen werkbladen groep 3, reizen activiteiten groep 3, reizen leerbladen 6\u20137 jaar, reizen gratis groep 3, reizen PDF groep 3, reizen rekenen groep 3',
    snippetAnswer: 'Reizen-oefeningen voor groep 3 (6\u20137 jaar) gebruiken reisscenario\u2019s voor optellen en aftrekken tot 20, redactiesommen over koffers en reisdagen, reiswoorden lezen en schrijven en landen vergelijken. Kinderen rekenen met koffers, postzegels en reisdagen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het reisthema een avontuurlijke context voor rekenen met tijd, aantallen en vergelijkingen: zes- en zevenjarigen zijn gefascineerd door verre landen en die nieuwsgierigheid kan worden ingezet voor leerdoelen. De SLO-leerlijnen benadrukken optellen en aftrekken tot 20, vergelijken en ori\u00ebntatie op de wereld als kerndoelen, en reizen biedt alle drie. Redactiesommen over reizen \u2014 in de koffer liggen 9 kledingstukken, je pakt er 4 uit, hoeveel liggen er nog in? \u2014 oefenen optellen en aftrekken in een spannende context. Landen vergelijken op grootte, afstand en taal introduceert basisaardrijkskunde. Reiswoorden als vliegtuigticket, paspoortcontrole en kampeerterrein zijn uitstekend decodeermateriaal met samengestelde woorden. Het schrijven van een reisdagboek of ansichtkaart oefent informatief schrijven met locatie, beleving en groet. De link met cultuurverschillen biedt waardevolle burgerschapsmomenten.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 20 met reisaantallen (6\u20137-jarigen rekenen met koffers en reisdagen)', howWeAddress: 'Reisrekenactiviteiten waarbij kinderen kledingstukken in koffers tellen en reisdagen berekenen bieden herhaalde oefening in een avontuurlijke context' },
      { milestone: 'Landen vergelijken op kenmerken (grootte, afstand, taal)', howWeAddress: 'Vergelijkingsactiviteiten waarbij kinderen twee landen naast elkaar leggen en overeenkomsten en verschillen benoemen oefenen vergelijkend denken' },
      { milestone: 'Reiswoorden decoderen en schrijven (samengestelde reiswoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met reiswoorden oefenen het decoderen van samenstellingen als vliegtuigticket en paspoortcontrole' },
      { milestone: 'Informatief schrijven: reisdagboek en ansichtkaart (locatie, beleving, groet)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een reisdagboek of ansichtkaart schrijven oefenen informatief schrijven met locatie en persoonlijke beleving' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10 met eenvoudige reisscenario\u2019s, bied reiswoorden aan met plaatjes en een woordenbank, en vergelijk twee bekende landen. Voor gevorderde kinderen: introduceer sommen tot 20 met meerdere bewerkingen over reisdagen en kosten, laat hen drie landen vergelijken op meerdere kenmerken, en daag hen uit met een uitgebreid reisdagboek met feitjes en tekeningen.',
    parentTakeaway: 'Reizen maakt rekenen avontuurlijk in groep 3. Pak samen een koffer in en tel: hoeveel T-shirts, hoeveel broeken, hoeveel bij elkaar? Hoeveel dagen duurt de reis en hoeveel nachten slaap je ergens anders? Na een reiswerkblad kunt u samen een ansichtkaart schrijven aan oma \u2014 waar ben je, wat heb je gezien, hoeveel uur heb je gereisd?',
    classroomIntegration: 'Het reisthema integreert in groep 3 met rekenen (sommen met reisaantallen, dagen tellen), taal (reiswoorden lezen, een dagboek en ansichtkaart schrijven), aardrijkskunde (landen, continenten, kaartlezen) en burgerschap (cultuurverschillen, gastvrijheid). Een reisweken-project met werkbladen, een wereldkaartactiviteit en ansichtkaartschrijven combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Reisrekensommen tot 20', emerging: 'lost optelsommen tot 10 op in reiscontext maar heeft moeite met aftrekken', proficient: 'rekent vlot op en af tot 20 met reisaantallen en noteert sommen correct', advanced: 'lost meerstaps-reisredactiesommen op en bedenkt eigen rekenvragen over reizen' },
      { skill: 'Landen vergelijken', emerging: 'benoemt \u00e9\u00e9n verschil tussen twee landen met hulp', proficient: 'vergelijkt zelfstandig twee landen op drie kenmerken en noteert de verschillen', advanced: 'vergelijkt drie landen, ordent op grootte of afstand en legt de redenering schriftelijk uit' },
      { skill: 'Reiswoorden lezen en schrijven', emerging: 'leest korte reiswoorden (reis, kaart) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien reiswoorden correct inclusief samenstellingen', advanced: 'leest vlot alle reiswoorden en schrijft een informatief reisdagboek met correcte zinnen' },
    ],
  },

  vegetables: {
    seoTitle: 'Groenten-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare groenten-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'groenten groep 3, groenten oefeningen 6\u20137 jaar, groenten oefeningen groep 3, groenten uitprintbaar groep 3, groenten werkbladen groep 3, groenten activiteiten groep 3, groenten leerbladen 6\u20137 jaar, groenten gratis groep 3, groenten PDF groep 3, groenten rekenen groep 3',
    snippetAnswer: 'Groenten-oefeningen voor groep 3 (6\u20137 jaar) gebruiken groentesituaties voor optellen en aftrekken tot 20, redactiesommen over de moestuin en markt, groentewoorden lezen en schrijven en classificatie op kleur, vorm en smaak. Kinderen rekenen met wortels, tomaten en paprika\u2019s. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het groentethema een praktische context voor meten, wegen en classificeren: zes- en zevenjarigen kennen de basisgroenten en zijn klaar om ze te gebruiken als rekenmiddel en wetenschappelijk observatiemateriaal. De SLO-leerlijnen benadrukken meten, classificeren en informatief schrijven als kerndoelen, en groenten bieden alle drie. Groenten wegen op een balans \u2014 wat weegt meer, een wortel of een komkommer? \u2014 introduceert gewichtsbesef. Redactiesommen over de moestuin \u2014 je oogst 14 wortels en geeft er 6 aan de buurvrouw, hoeveel houd je over? \u2014 verbinden rekenen met de natuur. Groentewoorden als bloemkool, spruitjes en aardappelschilmes zijn motiverend decodeermateriaal met samengestelde woorden. Het schrijven van een recept oefent procedureel schrijven met stappen en hoeveelheden. De voedingscontext biedt een natuurlijke link met gezondheidsonderwijs.',
    developmentalMilestones: [
      { milestone: 'Meten en wegen van groenten (6\u20137-jarigen vergelijken gewicht en lengte)', howWeAddress: 'Weeg- en meetactiviteiten waarbij kinderen groenten vergelijken op gewicht en lengte bouwen meetvaardigheden op met concreet materiaal' },
      { milestone: 'Redactiesommen over de moestuin (kinderen rekenen met oogst en verdeling)', howWeAddress: 'Moestuinverhaal-opdrachten met optel- en aftreksituaties oefenen het vertalen van een tuinsituatie naar een rekenbewerking' },
      { milestone: 'Groentewoorden decoderen en schrijven (samengestelde voedselwoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met groentewoorden oefenen het decoderen van samenstellingen als bloemkool en aardappelschilmes' },
      { milestone: 'Procedureel schrijven: een groentesoeprecept (stappen en hoeveelheden)', howWeAddress: 'Receptactiviteiten waarbij kinderen een eenvoudig soeprecept opschrijven oefenen procedureel schrijven met volgorde en maataanduidingen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10 met groenteplaatjes, bied groentewoorden aan met foto\u2019s en een woordenbank, en vergelijk twee groenten op \u00e9\u00e9n kenmerk. Voor gevorderde kinderen: introduceer sommen tot 20 met meerdere bewerkingen over oogst en verdeling, laat hen groenten classificeren op drie kenmerken en een uitgebreid recept schrijven met hoeveelheden en bereidingstijd.',
    parentTakeaway: 'Groenten bieden dagelijkse rekenkansen in groep 3. Laat uw kind bij het koken helpen tellen: hoeveel wortels heb je nodig, hoeveel snij je er af, hoeveel blijven er over? Weeg samen groenten: wat is zwaarder, de pompoen of de kool? Na een groentewerkblad kunt u samen een recept opschrijven \u2014 hoeveel van elk ingredient, in welke volgorde, en hoeveel porties levert het op?',
    classroomIntegration: 'Het groentethema integreert in groep 3 met rekenen (meten, wegen, sommen met groenteaantallen), taal (groentewoorden lezen, een recept schrijven), natuur (groei, voedingsstoffen, seizoensgroenten) en gezondheidsonderwijs (gezond eten, voedselkeuzes). Een moestuinproject met werkbladen, een proeverij en een receptboek combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Groenten meten en wegen', emerging: 'vergelijkt twee groenten (groter/kleiner) maar weegt niet zelfstandig', proficient: 'meet en weegt zelfstandig groenten en noteert de resultaten correct', advanced: 'vergelijkt meerdere groenten op lengte en gewicht, ordent ze en registreert de gegevens in een tabel' },
      { skill: 'Moestuinrekensommen', emerging: 'lost optelsommen tot 10 op in groentecontext maar heeft moeite met aftrekken', proficient: 'rekent vlot op en af tot 20 met oogstaantallen en noteert sommen correct', advanced: 'lost meerstaps-moestuinsommen op en bedenkt eigen groenteRedactiesommen' },
      { skill: 'Groentewoorden lezen en schrijven', emerging: 'leest korte groentewoorden (ui, boon) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien groentewoorden correct inclusief samenstellingen als bloemkool', advanced: 'leest vlot alle groentewoorden en schrijft een procedureel recept met correcte stappen en hoeveelheden' },
    ],
  },

  weather: {
    seoTitle: 'Weer-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare weer-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'weer groep 3, weer oefeningen 6\u20137 jaar, weer oefeningen groep 3, weer uitprintbaar groep 3, weer werkbladen groep 3, weer activiteiten groep 3, weer leerbladen 6\u20137 jaar, weer gratis groep 3, weer PDF groep 3, weer rekenen groep 3',
    snippetAnswer: 'Weer-oefeningen voor groep 3 (6\u20137 jaar) gebruiken weerverschijnselen voor optellen en aftrekken tot 20, redactiesommen over temperatuur en regenbuien, weerwoorden lezen en schrijven en een weertabel bijhouden. Kinderen rekenen met temperaturen, regenmillimeters en zonnige dagen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het weerthema een dagelijkse observatiecontext voor meten en gegevensverwerking: zes- en zevenjarigen ervaren het weer elke dag en die directe beleving maakt het thema ideaal voor formeel rekenen en schrijven. De SLO-leerlijnen benadrukken meten, gegevens registreren en informatief schrijven als kerndoelen, en het weer biedt alle drie op een natuurlijke manier. Temperaturen aflezen, noteren en vergelijken \u2014 maandag 12 graden, dinsdag 8 graden, hoeveel kouder? \u2014 oefenen aftrekken in een betekenisvolle context. Regenbuien tellen en in een weertabel registreren introduceert gegevensordening. Weerwoorden als onweersbui, zonneschijn en hagelstenen zijn motiverend decodeermateriaal met samengestelde woorden. Het schrijven van een dagelijks weerbericht oefent informatief schrijven met feiten en voorspellingen. De link met seizoenen en natuur biedt rijke wetenschappelijke verbindingen.',
    developmentalMilestones: [
      { milestone: 'Temperaturen aflezen en vergelijken (6\u20137-jarigen lezen een thermometer en berekenen verschil)', howWeAddress: 'Thermometeractiviteiten waarbij kinderen dagelijks de temperatuur aflezen en het verschil met de vorige dag berekenen bouwen meetvaardigheden op' },
      { milestone: 'Gegevens registreren in een weertabel (dagen tellen per weertype)', howWeAddress: 'Weertabelactiviteiten waarbij kinderen dagelijks het weer noteren en aan het eind van de week turven en tellen introduceren gegevensverwerking' },
      { milestone: 'Weerwoorden decoderen en schrijven (samengestelde weerswoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met weerwoorden oefenen het decoderen van samenstellingen als onweersbui en zonneschijn' },
      { milestone: 'Informatief schrijven: een weerbericht (feiten, metingen en voorspellingen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een weerbericht voor de klas schrijven oefenen informatief schrijven met feiten en een voorspelling' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk temperatuurvergelijkingen tot verschil van maximaal 5, bied weerwoorden aan met symbolen en een woordenbank, en gebruik een weertabel met drie dagen. Voor gevorderde kinderen: introduceer temperatuurberekeningen tot 20 met negatieve context, laat hen een weektabel met vijf dagen bijhouden en een grafiek maken, en daag hen uit met een weerbericht voor de komende drie dagen met onderbouwde voorspellingen.',
    parentTakeaway: 'Het weer biedt dagelijkse leerkansen in groep 3. Lees samen de thermometer af: hoe warm is het vandaag, hoeveel graden verschil met gisteren? Houd samen een weertabel bij op de koelkast: elke dag een zonnetje, wolkje of regendruppel tekenen en aan het eind van de week tellen. Na een weerwerkblad kunt u samen een weerbericht bedenken \u2014 wat verwacht je morgen en waarom?',
    classroomIntegration: 'Het weerthema integreert in groep 3 met rekenen (temperaturen vergelijken, weertabel bijhouden, sommen), taal (weerwoorden lezen, een weerbericht schrijven), natuur (weerverschijnselen, waterkringloop, seizoenen) en beeldende vorming (weersymbolen tekenen). Een weerproject met een klasthermometer, werkbladen en een weerstationhoek combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Temperaturen aflezen en vergelijken', emerging: 'leest een thermometer af met hulp maar berekent het verschil niet zelfstandig', proficient: 'leest zelfstandig temperaturen af en berekent het verschil correct', advanced: 'houdt een weektabel bij, berekent het warmste en koelste moment en maakt een temperatuurgrafiek' },
      { skill: 'Weertabel bijhouden', emerging: 'noteert het weer met hulp maar turft en telt niet zelfstandig', proficient: 'houdt zelfstandig een weertabel bij, turft per weertype en berekent de totalen', advanced: 'analyseert de weertabel, vergelijkt twee weken en trekt conclusies over patronen' },
      { skill: 'Weerwoorden lezen en schrijven', emerging: 'leest korte weerwoorden (zon, wind) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien weerwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle weerwoorden en schrijft een informatief weerbericht met correcte feiten en voorspellingen' },
    ],
  },

  winter: {
    seoTitle: 'Winter-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare winter-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'winter groep 3, winter oefeningen 6\u20137 jaar, winter oefeningen groep 3, winter uitprintbaar groep 3, winter werkbladen groep 3, winter activiteiten groep 3, winter leerbladen 6\u20137 jaar, winter gratis groep 3, winter PDF groep 3, winter rekenen groep 3',
    snippetAnswer: 'Winter-oefeningen voor groep 3 (6\u20137 jaar) gebruiken winterscenario\u2019s voor optellen en aftrekken tot 20, redactiesommen over sneeuw en schaatsen, winterwoorden lezen en schrijven en temperaturen vergelijken. Kinderen rekenen met sneeuwballen, schaatsers en sleden. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het winterthema een seizoenscontext voor meten, vergelijken en informatief schrijven: zes- en zevenjarigen ervaren sneeuw, ijs en kou en die directe beleving maakt het thema ideaal voor formeel leren. De SLO-leerlijnen benadrukken optellen en aftrekken tot 20, meten en informatief schrijven als kerndoelen, en de winter biedt alle drie in een betoverende setting. Redactiesommen over winteractiviteiten \u2014 er schaatsen 12 kinderen op de vijver, er komen er 6 bij, hoeveel schaatsen er nu? \u2014 oefenen optellen in een herkenbare context. Temperaturen vergelijken \u2014 \u2019s ochtends 2 graden, \u2019s middags 8 graden, hoeveel warmer? \u2014 biedt betekenisvol aftrekken. Winterwoorden als sneeuwpop, ijsbloemen en schaatswedstrijd zijn motiverend decodeermateriaal met samengestelde woorden. Het schrijven van een winterverhaal of brief aan Sinterklaas oefent verhalend en functioneel schrijven. Symmetrie in sneeuwvlokken biedt een visuele ingang voor meetkunde.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 20 in wintercontext (6\u20137-jarigen rekenen met sneeuw en ijs)', howWeAddress: 'Winterrekenactiviteiten met sneeuwballen, schaatsers en sleden bieden herhaalde oefening van sommen tot 20 in een seizoenscontext' },
      { milestone: 'Wintertemperaturen vergelijken (verschil berekenen tussen ochtend en middag)', howWeAddress: 'Thermometeractiviteiten waarbij kinderen wintertemperaturen aflezen en het verschil berekenen oefenen aftrekken met betekenis' },
      { milestone: 'Winterwoorden decoderen en schrijven (samengestelde seizoenswoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met winterwoorden oefenen het decoderen van samenstellingen als sneeuwpop en schaatswedstrijd' },
      { milestone: 'Verhalend en functioneel schrijven (winterverhaal of brief)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een winterverhaal of een brief schrijven oefenen verhalend en functioneel schrijven met sfeer en structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10 met winterplaatjes, bied winterwoorden aan met foto\u2019s en een woordenbank, en vergelijk temperaturen met kleine verschil. Voor gevorderde kinderen: introduceer sommen tot 20 met meerdere bewerkingen, laat hen een weektabel met wintertemperaturen bijhouden en analyseren, en daag hen uit met een uitgebreid winterverhaal met dialoog en sfeerwoorden.',
    parentTakeaway: 'De winter biedt speelse rekenkansen in groep 3. Maak samen sneeuwballen en tel: hoeveel gemaakt, hoeveel gegooid, hoeveel over? Lees samen de thermometer af: hoe koud is het vandaag, hoeveel verschil met gisteren? Na een winterwerkblad kunt u samen een winterverhaal schrijven \u2014 wat deed je in de sneeuw, hoeveel sneeuwballen maakte je, hoe koud was het?',
    classroomIntegration: 'Het winterthema integreert in groep 3 met rekenen (sommen met wintermateriaal, temperaturen vergelijken), taal (winterwoorden lezen, een winterverhaal of brief schrijven), natuur (winterdieren, aggregatietoestanden, dag-nachtlengte) en beeldende vorming (sneeuwvloksymmetrie, winterlandschappen). Een winterproject met werkbladen, een thermometeractiviteit en een schrijfhoek combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Winterrekensommen tot 20', emerging: 'lost optelsommen tot 10 op in wintercontext maar heeft moeite met aftrekken', proficient: 'rekent vlot op en af tot 20 met wintermateriaal en noteert sommen correct', advanced: 'lost meerstaps-winterredactiesommen op en bedenkt eigen winterrekenvragen' },
      { skill: 'Wintertemperaturen vergelijken', emerging: 'leest een thermometer af met hulp maar berekent het verschil niet zelfstandig', proficient: 'leest zelfstandig wintertemperaturen af en berekent het verschil correct', advanced: 'houdt een weektabel bij, vergelijkt ochtend- en middagtemperaturen en trekt conclusies' },
      { skill: 'Winterwoorden lezen en schrijven', emerging: 'leest korte winterwoorden (ijs, kou) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien winterwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle winterwoorden en schrijft een verhalend winterverhaal met sfeerwoorden en correcte zinnen' },
    ],
  },

  xmas: {
    seoTitle: 'Kerst-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kerst-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kerst groep 3, kerst oefeningen 6\u20137 jaar, kerst oefeningen groep 3, kerst uitprintbaar groep 3, kerst werkbladen groep 3, kerst activiteiten groep 3, kerst leerbladen 6\u20137 jaar, kerst gratis groep 3, kerst PDF groep 3, kerst rekenen groep 3',
    snippetAnswer: 'Kerst-oefeningen voor groep 3 (6\u20137 jaar) gebruiken kerstscenario\u2019s voor optellen en aftrekken tot 20, redactiesommen over cadeautjes en kerstballen, kerstwoorden lezen en schrijven en symmetrie in kerstversieringen. Kinderen rekenen met cadeautjes, kerstballen en rendieren. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het kerstthema een feestelijke context die de motivatie voor rekenen en schrijven maximaal verhoogt: zes- en zevenjarigen leven enorm toe naar kerst en die betrokkenheid kan productief worden ingezet. De SLO-leerlijnen benadrukken optellen en aftrekken tot 20, eerlijk verdelen en functioneel schrijven als kerndoelen, en kerst biedt alle drie in een feestelijke setting. Redactiesommen over cadeautjes verdelen \u2014 er liggen 15 cadeautjes onder de boom voor 3 kinderen, hoeveel krijgt ieder? \u2014 oefenen verdeling als voorbereiding op delen. Kerstballen aan de boom tellen en groeperen oefent classificatie. Kerstwoorden als kerstboomversiering, rendiergewei en adventskrans zijn uitstekend decodeermateriaal met samengestelde woorden. Het schrijven van een verlanglijstje of kerstkaart oefent functioneel schrijven met een echt doel. Symmetrie in kerststerren en sneeuwvlokken biedt een visuele ingang voor meetkunde.',
    developmentalMilestones: [
      { milestone: 'Eerlijk verdelen van kerstcadeautjes (6\u20137-jarigen verdelen over groepen)', howWeAddress: 'Verdeelactiviteiten waarbij kinderen cadeautjes gelijk verdelen introduceren het concept van gelijke verdeling in een feestelijke context' },
      { milestone: 'Optellen en aftrekken tot 20 met kerstmateriaal (kerstballen, koekjes, cadeautjes)', howWeAddress: 'Kerstrekenactiviteiten met kerstmateriaal bieden herhaalde oefening van sommen tot 20 in een betoverende setting' },
      { milestone: 'Kerstwoorden decoderen en schrijven (samengestelde feestwoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met kerstwoorden oefenen het decoderen van samenstellingen als kerstboomversiering en adventskrans' },
      { milestone: 'Functioneel schrijven: verlanglijstje en kerstkaart (wensen, groet, layout)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een verlanglijstje of kerstkaart schrijven oefenen functioneel schrijven met een echt communicatief doel' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied kerstwoorden aan met plaatjes en een woordenbank, en verdeel even aantallen cadeautjes. Voor gevorderde kinderen: introduceer sommen tot 20 met verdeling en rest, laat hen een kerstcatalogus maken met prijzen en totalen berekenen, en daag hen uit met een uitgebreide kerstbrief met beschrijving van tradities.',
    parentTakeaway: 'Kerst biedt schitterende rekenkansen in groep 3. Tel samen de kerstballen aan de boom: hoeveel rode, hoeveel gouden, hoeveel bij elkaar? Verdeel koekjes eerlijk: als er 18 zijn voor 3 kinderen, hoeveel krijgt ieder? Na een kerstwerkblad kunt u samen een kerstkaart schrijven \u2014 aan wie, welke wens, en hoeveel kaarten moeten we in totaal versturen?',
    classroomIntegration: 'Het kerstthema integreert in groep 3 met rekenen (sommen met kerstmateriaal, verdelen van cadeautjes), taal (kerstwoorden lezen, een verlanglijstje en kerstkaart schrijven), beeldende vorming (symmetrische kerststerren, versieringen maken) en muziek (kerstliedjes met telrefreinen). Een kerstproject met werkbladen, een versiering- en schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Kerstrekensommen tot 20', emerging: 'lost optelsommen tot 10 op in kerstcontext maar heeft moeite met aftrekken', proficient: 'rekent vlot op en af tot 20 met kerstmateriaal en noteert sommen correct', advanced: 'lost meerstaps-kerstredactiesommen op en bedenkt eigen kerstrekenvragen' },
      { skill: 'Cadeautjes eerlijk verdelen', emerging: 'verdeelt met hulp maar maakt ongelijke groepen', proficient: 'verdeelt zelfstandig cadeautjes gelijk over groepen tot zes en controleert het resultaat', advanced: 'verdeelt snel, berekent hoeveel extra nodig zijn bij ongelijke verdeling en noteert de deelsom' },
      { skill: 'Kerstwoorden lezen en schrijven', emerging: 'leest korte kerstwoorden (ster, boom) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien kerstwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle kerstwoorden en schrijft een functionele kerstkaart met correcte wensen en zinnen' },
    ],
  },

  zoo: {
    seoTitle: 'Dierentuin-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare dierentuin-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dierentuin groep 3, dierentuin oefeningen 6\u20137 jaar, dierentuin oefeningen groep 3, dierentuin uitprintbaar groep 3, dierentuin werkbladen groep 3, dierentuin activiteiten groep 3, dierentuin leerbladen 6\u20137 jaar, dierentuin gratis groep 3, dierentuin PDF groep 3, dierentuin rekenen groep 3',
    snippetAnswer: 'Dierentuin-oefeningen voor groep 3 (6\u20137 jaar) gebruiken dierentuintaferelen voor optellen en aftrekken tot 20, redactiesommen over dieren en verblijven, dierentuinwoorden lezen en schrijven en classificatie van dieren op kenmerken. Kinderen rekenen met leeuwen, pinguins en olifanten. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het dierentuinthema een rijke context voor rekenen, classificeren en informatief schrijven: zes- en zevenjarigen zijn gefascineerd door exotische dieren en die betrokkenheid kan worden ingezet voor formeel leren. De SLO-leerlijnen benadrukken optellen en aftrekken tot 20, classificatie en informatief schrijven als kerndoelen, en de dierentuin biedt alle drie. Redactiesommen over de dierentuin \u2014 in het apenverblijf zitten 8 apen, er worden 4 geboren, hoeveel zijn het er nu? \u2014 oefenen optellen in een fascinerende context. Dieren classificeren op continent, voedsel en leefgebied introduceert wetenschappelijk ordenen. Dierentuinwoorden als olifantenverblijf, leeuwenwelp en pinguinkolonie zijn uitstekend decodeermateriaal met samengestelde woorden. Het schrijven van een dierentuinverslag of informatieposter oefent informatief schrijven met feitjes en structuur. De link met natuur en dierenwelzijn biedt waardevolle burgerschapsmomenten.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 20 met dierenaantallen (6\u20137-jarigen rekenen met verblijven en dieren)', howWeAddress: 'Dierentuinrekenactiviteiten waarbij kinderen dieren per verblijf tellen, geboortes optellen en verhuizingen aftrekken bieden herhaalde oefening' },
      { milestone: 'Dieren classificeren op meerdere kenmerken (continent, voedsel, leefgebied)', howWeAddress: 'Classificatieactiviteiten waarbij kinderen dieren groeperen op twee of drie kenmerken en hun keuze toelichten bouwen wetenschappelijk denken op' },
      { milestone: 'Dierentuinwoorden decoderen en schrijven (samengestelde dierenwoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met dierentuinwoorden oefenen het decoderen van samenstellingen als olifantenverblijf en pinguinkolonie' },
      { milestone: 'Informatief schrijven: dierentuinverslag of poster (feitjes, structuur, illustraties)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een dierentuinverslag of informatieposter maken oefenen informatief schrijven met feitjes en structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10 met bekende dieren, bied dierentuinwoorden aan met plaatjes en een woordenbank, en classificeer op \u00e9\u00e9n kenmerk. Voor gevorderde kinderen: introduceer sommen tot 20 met meerdere verblijven en verhuizingen, laat hen dieren classificeren op drie kenmerken met schriftelijke toelichting, en daag hen uit met een informatieve dierenposter met feitjes, tekening en classificatie.',
    parentTakeaway: 'De dierentuin biedt schitterende rekenkansen in groep 3. Tel samen bij elk verblijf: hoeveel leeuwen, hoeveel apen, hoeveel bij elkaar? Hoeveel meer leeuwen dan pingu\u00efns? Sorteer dieren samen: welke eten planten, welke eten vlees, welke allebei? Na een dierentuinwerkblad kunt u samen een dierentuinverslag schrijven \u2014 welke dieren zag je, hoeveel van elk, en welk dier vond je het leukst?',
    classroomIntegration: 'Het dierentuinthema integreert in groep 3 met rekenen (sommen met dierenaantallen, classificatie), taal (dierentuinwoorden lezen, een verslag of poster schrijven), natuur (diersoorten, leefgebieden, voedselketens) en burgerschap (dierenwelzijn, natuurbehoud). Een dierentuinproject met werkbladen, een classificatieactiviteit en een posteractiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Dierentuinrekensommen tot 20', emerging: 'lost optelsommen tot 10 op in dierentuincontext maar heeft moeite met aftrekken', proficient: 'rekent vlot op en af tot 20 met dierenaantallen en noteert sommen correct', advanced: 'lost meerstaps-dierentuinredactiesommen op en bedenkt eigen rekenvragen over dieren' },
      { skill: 'Dieren classificeren', emerging: 'sorteert dieren op \u00e9\u00e9n kenmerk (grootte) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en legt de redenering schriftelijk uit' },
      { skill: 'Dierentuinwoorden lezen en schrijven', emerging: 'leest korte dierwoorden (aap, leeuw) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien dierentuinwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle dierentuinwoorden en schrijft een informatief verslag met feitjes en correcte zinnen' },
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

  // Check if already enriched (seoTitle in first-grade block)
  const firstGradeIdx = content.indexOf("'first-grade'");
  const secondGradeIdx = content.indexOf("'second-grade'");

  if (firstGradeIdx === -1 || secondGradeIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  const firstGradeBlock = content.substring(firstGradeIdx, secondGradeIdx);
  if (firstGradeBlock.includes('seoTitle:')) {
    console.log(`SKIP (already enriched): ${theme}/nl.ts`);
    continue;
  }

  // STEP 1: Insert seoTitle/seoDescription/seoKeywords right after "'first-grade': {"
  const firstGradeOpenPattern = "'first-grade': {";
  const firstGradeOpenIdx = content.indexOf(firstGradeOpenPattern);
  if (firstGradeOpenIdx === -1) {
    console.error(`NO FIRST-GRADE OPEN FOUND: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  const seoInsertPos = firstGradeOpenIdx + firstGradeOpenPattern.length;
  const seoText = '\n' + buildSeoInsertionText(enrichments[theme]);
  content = content.substring(0, seoInsertPos) + seoText + content.substring(seoInsertPos);

  // STEP 2: Insert 7 enrichment fields after faq array (recalculate positions after insertion)
  const newFirstGradeIdx = content.indexOf("'first-grade'");
  const newSecondGradeIdx = content.indexOf("'second-grade'");
  const newFirstGradeBlock = content.substring(newFirstGradeIdx, newSecondGradeIdx);

  // Find the last "],\n" in the first-grade block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(newFirstGradeBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const enrichInsertPos = newFirstGradeIdx + lastMatch.index + lastMatch[0].length;
  const enrichText = buildEnrichmentInsertionText(enrichments[theme]) + '\n';
  content = content.substring(0, enrichInsertPos) + enrichText + content.substring(enrichInsertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/nl.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount}/${themes.length} enriched, ${errorCount} errors`);
