#!/usr/bin/env node
/**
 * SEO Part 325: NL First-Grade Enrichment — Themes 20-38
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the first-grade grade block of 19 NL theme files (fruits through space).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  fruits: {
    seoTitle: 'Fruit-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare fruit-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'fruit groep 3, fruit oefeningen 6\u20137 jaar, fruit oefeningen groep 3, fruit uitprintbaar groep 3, fruit werkbladen groep 3, fruit activiteiten groep 3, fruit leerbladen 6\u20137 jaar, fruit gratis groep 3, fruit PDF groep 3, fruit rekenen groep 3',
    snippetAnswer: 'Fruit-oefeningen voor groep 3 (6\u20137 jaar) gebruiken fruitcontexten voor optellen en aftrekken tot 20, redactiesommen over fruitmandje en markt, fruitnamen lezen en schrijven en classificatie op kleur, vorm en smaak. Kinderen rekenen met appels, bananen en druiven. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het fruitthema een krachtige context voor rekenen met hoeveelheden en classificatie op meerdere kenmerken: zes- en zevenjarigen kennen de basisfruiten en zijn klaar om ze te gebruiken als rekenmiddel. De SLO-leerlijnen voor groep 3 benadrukken optellen en aftrekken tot 20 in alledaagse situaties, en fruit biedt de meest herkenbare context: vijf appels in de schaal plus drie van de markt, hoeveel bij elkaar? Redactiesommen over een fruitkraam oefenen het vertalen van een verhaaltje naar een rekenbewerking. Classificatie wordt wetenschappelijker: kinderen ordenen fruit op kleur, vorm, smaak en herkomst en leggen hun redenering uit. Fruitwoorden vari\u00ebren van korte woorden als peer en pruim tot samengestelde woorden als watermeloen en sinaasappel, wat uitstekend decodeermateriaal oplevert. Het schrijven van een boodschappenlijstje met fruit oefent functioneel schrijven met een echt doel. De voedingscontext verbindt het thema met gezondheidsonderwijs.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 20 met fruithoeveelheden (6\u20137-jarigen rekenen in een herkenbare context)', howWeAddress: 'Rekenactiviteiten met fruitaantallen op de markt en in de schaal bieden herhaalde oefening van sommen tot 20 in een motiverende alledaagse context' },
      { milestone: 'Redactiesommen over fruitsituaties (kinderen vertalen een fruitverhaal naar een rekenbewerking)', howWeAddress: 'Fruitverhaal-opdrachten waarbij kinderen een kort verhaaltje over fruitkoop lezen en de juiste som opstellen oefenen de brug tussen taal en rekenen' },
      { milestone: 'Fruitnamen decoderen en schrijven (woorden van wisselende lengte en samenstelling)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met fruitnamen oefenen het decoderen van korte woorden als peer tot samengestelde woorden als sinaasappel' },
      { milestone: 'Classificatie op meerdere kenmerken (fruit ordenen op kleur, vorm, smaak)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen fruit groeperen op twee of drie kenmerken en hun keuze schriftelijk toelichten bouwen wetenschappelijk denken op' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied fruitnamen aan met plaatjes en een woordenbank, en gebruik sorteeractiviteiten met \u00e9\u00e9n criterium. Voor gevorderde kinderen: introduceer sommen tot 20 met ontbrekende termen, laat hen een fruitboodschappenlijst schrijven met prijzen en totalen berekenen, en daag hen uit met classificatie op drie kenmerken met schriftelijke toelichting.',
    parentTakeaway: 'Fruit biedt dagelijkse rekenkansen in groep 3. Laat uw kind bij de supermarkt fruit tellen: hoeveel appels in de zak, hoeveel bananen erbij, hoeveel bij elkaar? Verdeel fruit eerlijk: als er 12 druiven zijn voor 3 kinderen, hoeveel krijgt ieder? Na een fruitwerkblad kunt u samen een fruitschaal samenstellen en alles sorteren op kleur en grootte \u2014 tellen, vergelijken en opschrijven in \u00e9\u00e9n activiteit.',
    classroomIntegration: 'Het fruitthema verbindt in groep 3 rekenen (sommen met fruithoeveelheden, eerlijk verdelen), taal (fruitnamen lezen, een boodschappenlijst schrijven), natuur (waar groeit fruit, voedingsstoffen) en gezondheidsonderwijs (gezond eten). Een fruitweek met werkbladen, een proeverij en een klassenfruitschaal combineert alle vakken, in lijn met de SLO-doelen voor rekenen, taal en natuur.',
    assessmentRubric: [
      { skill: 'Fruitrekensommen tot 20', emerging: 'lost optelsommen tot 10 op met fruitcontext maar heeft moeite met aftrekken', proficient: 'rekent vlot op en af tot 20 met fruithoeveelheden en noteert sommen correct', advanced: 'lost meerstaps-fruitredactiesommen op en bedenkt eigen rekenvragen over fruit' },
      { skill: 'Fruitnamen lezen en schrijven', emerging: 'leest korte fruitnamen (peer, kers) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft zelfstandig acht tot tien fruitnamen correct inclusief samenstellingen', advanced: 'leest vlot alle fruitnamen en schrijft een boodschappenlijst met correcte spelling' },
      { skill: 'Fruitclassificatie', emerging: 'sorteert fruit op \u00e9\u00e9n kenmerk (kleur) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en legt de redenering schriftelijk uit' },
    ],
  },

  furniture: {
    seoTitle: 'Meubels-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare meubels-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'meubels groep 3, meubels oefeningen 6\u20137 jaar, meubels oefeningen groep 3, meubels uitprintbaar groep 3, meubels werkbladen groep 3, meubels activiteiten groep 3, meubels leerbladen 6\u20137 jaar, meubels gratis groep 3, meubels PDF groep 3, meubels rekenen groep 3',
    snippetAnswer: 'Meubels-oefeningen voor groep 3 (6\u20137 jaar) gebruiken meubelcontexten voor optellen en aftrekken tot 20, redactiesommen over kamers inrichten, meubelwoorden lezen en schrijven en meten van lengtes en breedtes. Kinderen rekenen met stoelen, tafels en kasten. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het meubelthema een praktische context voor meten en ruimtelijk denken: zes- en zevenjarigen gebruiken dagelijks meubels en die vertrouwdheid kan worden ingezet voor formeel rekenen en taalonderwijs. De SLO-leerlijnen benadrukken meten met standaardeenheden en plattegrondlezen als kerndoelen, en meubels bieden een logische context: hoe breed is de tafel in centimeters, past de kast tussen het raam en de deur? Redactiesommen over kamers inrichten \u2014 er staan 8 stoelen in de klas, er komen 6 bij, hoeveel zijn het er nu? \u2014 oefenen optellen in een herkenbare situatie. Meubelwoorden als boekenkast, nachtkastje en ladeblok zijn uitstekend decodeermateriaal met samengestelde woorden. Het tekenen en labelen van een kamerplattegrond oefent ruimtelijk denken en functioneel schrijven. De link met het dagelijks leven maakt het thema bijzonder toegankelijk voor alle leerlingen.',
    developmentalMilestones: [
      { milestone: 'Meten van meubels in centimeters (6\u20137-jarigen meten met een liniaal of meetlint)', howWeAddress: 'Meetactiviteiten waarbij kinderen tafels, stoelen en kasten opmeten en de resultaten noteren in centimeters bouwen nauwkeurige meetvaardigheden op' },
      { milestone: 'Redactiesommen over inrichting (kinderen rekenen met aantallen meubels)', howWeAddress: 'Inrichtingsverhalen met optel- en aftreksituaties oefenen het vertalen van een huiselijke context naar een rekenbewerking' },
      { milestone: 'Samengestelde meubelwoorden decoderen en schrijven (boekenkast, nachtkastje)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met meubelwoorden oefenen het decoderen van samengestelde woorden door ze in delen op te splitsen' },
      { milestone: 'Plattegrond lezen en tekenen (bovenaanzicht van een kamer met meubels)', howWeAddress: 'Plattegrondactiviteiten waarbij kinderen meubels in een kamer tekenen en labelen oefenen ruimtelijke vertaling en positiewoorden' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied meubelwoorden aan met plaatjes en een woordenbank, en gebruik eenvoudige plattegronden met drie meubels. Voor gevorderde kinderen: introduceer sommen tot 20 met meerdere bewerkingen, laat hen een kamerplattegrond op schaal tekenen met metingen, en daag hen uit met een schrijfopdracht waarin ze hun droomkamer beschrijven.',
    parentTakeaway: 'Meubels bieden dagelijkse rekenkansen in groep 3. Meet samen de tafel: hoe lang, hoe breed? Past het nieuwe bureau in de hoek \u2014 meet de ruimte en vergelijk. Tel de stoelen in huis: hoeveel in de keuken, hoeveel in de woonkamer, hoeveel bij elkaar? Na een meubelwerkblad kunt u samen een plattegrond van de kinderkamer tekenen en alle meubels labelen met hun maat.',
    classroomIntegration: 'Het meubelthema integreert in groep 3 met rekenen (meten, sommen met meubels, plattegrondlezen), taal (meubelwoorden lezen, een kamerbeschrijving schrijven), techniek (ontwerpen en construeren) en aardrijkskunde (plattegronden, positiewoorden). Een klaslokaalproject waarbij kinderen de klas opmeten en een plattegrond tekenen combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Meten van meubels', emerging: 'vergelijkt twee meubels (groter/kleiner) maar meet niet zelfstandig met een liniaal', proficient: 'meet correct in centimeters met een liniaal en noteert het resultaat', advanced: 'meet meerdere meubels, vergelijkt de metingen en berekent of een meubel in een ruimte past' },
      { skill: 'Meubelredactiesommen', emerging: 'leest het verhaal maar stelt de som niet zelfstandig op', proficient: 'vertaalt inrichtingsverhalen correct naar sommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op en bedenkt eigen meubelredactiesommen' },
      { skill: 'Meubelwoorden lezen en schrijven', emerging: 'leest korte meubelwoorden (stoel, tafel) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien meubelwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle meubelwoorden en schrijft een kamerbeschrijving met correcte zinnen' },
    ],
  },

  garden: {
    seoTitle: 'Tuin-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare tuin-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'tuin groep 3, tuin oefeningen 6\u20137 jaar, tuin oefeningen groep 3, tuin uitprintbaar groep 3, tuin werkbladen groep 3, tuin activiteiten groep 3, tuin leerbladen 6\u20137 jaar, tuin gratis groep 3, tuin PDF groep 3, tuin rekenen groep 3',
    snippetAnswer: 'Tuin-oefeningen voor groep 3 (6\u20137 jaar) gebruiken tuinscenario\u2019s voor optellen en aftrekken tot 20, redactiesommen over planten en zaden, tuinwoorden lezen en schrijven en meten van plantgroei. Kinderen rekenen met bloemen, groenten en tuingereedschap. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het tuinthema een levend laboratorium voor meten en gegevensregistratie: zes- en zevenjarigen kunnen planten verzorgen, groei bijhouden en hun waarnemingen opschrijven. De SLO-leerlijnen benadrukken meten en gegevensverwerking als kerndoelen, en de schooltuin biedt een authentieke context. Kinderen meten hoe hoog hun plant in centimeters is gegroeid, noteren de meetresultaten in een groeigrafiek en vergelijken de groei van verschillende planten. Redactiesommen over de tuin \u2014 je plant 12 zaden, er komen 8 op, hoeveel kwamen er niet op? \u2014 verbinden rekenen met natuurobservatie. Tuinwoorden als gieter, bloembol, moestuin en zonnebloem zijn motiverend decodeermateriaal met samengestelde woorden. Het bijhouden van een tuindagboek oefent informatief schrijven met data, metingen en observaties.',
    developmentalMilestones: [
      { milestone: 'Meten van plantgroei in centimeters (6\u20137-jarigen meten en registreren groei)', howWeAddress: 'Meetactiviteiten waarbij kinderen plantjes meten en de resultaten in een groeigrafiek noteren bouwen meetvaardigheden en gegevensregistratie op' },
      { milestone: 'Redactiesommen over de tuin (kinderen rekenen met zaden, planten en oogst)', howWeAddress: 'Tuinverhaal-opdrachten met optel- en aftreksituaties oefenen het vertalen van een groeicontext naar een rekenbewerking' },
      { milestone: 'Tuinwoorden decoderen en schrijven (samengestelde woorden als bloembol en gieter)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met tuinwoorden oefenen het decoderen van samengestelde woorden door ze in delen op te splitsen' },
      { milestone: 'Informatief schrijven in een tuindagboek (observaties, metingen, conclusies)', howWeAddress: 'Dagboekactiviteiten waarbij kinderen hun tuinwaarnemingen opschrijven met datum, meting en tekening oefenen informatief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied tuinwoorden aan met plaatjes en een woordenbank, en meet met niet-standaardeenheden (blokjes). Voor gevorderde kinderen: introduceer sommen tot 20 met verschilberekeningen, laat hen een groeigrafiek met meetresultaten maken en vergelijken, en daag hen uit met een uitgebreid tuindagboek met conclusies.',
    parentTakeaway: 'De tuin is een schitterend klaslokaal voor groep 3. Plant samen zaden en meet elke week hoe hoog het plantje is gegroeid \u2014 hoeveel centimeter erbij? Tel de bloemen in de tuin: hoeveel rode, hoeveel gele, hoeveel bij elkaar? Laat uw kind een tuindagboek bijhouden met tekeningen en metingen. Na een tuinwerkblad kunt u samen de moestuin bekijken en rekensom maken: als we 15 wortels plukken en 6 opeten, hoeveel bewaren we?',
    classroomIntegration: 'Het tuinthema integreert in groep 3 met rekenen (meten, groeigrafiek, sommen met planten), taal (tuinwoorden lezen, een tuindagboek schrijven), natuur (plantgroei, seizoenen, bodemsoorten) en beeldende vorming (plantjes tekenen en schilderen). Een schooltuinproject met werkbladen, meetkaarten en een klassendagboek combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Meten van plantgroei', emerging: 'vergelijkt planthoogtes (hoger/lager) maar meet niet zelfstandig in centimeters', proficient: 'meet correct met een liniaal in centimeters en noteert het resultaat in een tabel', advanced: 'meet wekelijks, berekent de groei per week en maakt een groeigrafiek' },
      { skill: 'Tuinredactiesommen', emerging: 'leest het verhaal maar stelt de som niet zelfstandig op', proficient: 'vertaalt tuinverhalen correct naar sommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op en formuleert eigen tuinredactiesommen met correcte structuur' },
      { skill: 'Tuinwoorden lezen en schrijven', emerging: 'leest korte tuinwoorden (tuin, zaad) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien tuinwoorden correct inclusief samenstellingen als bloembol', advanced: 'leest vlot alle tuinwoorden en schrijft informatieve zinnen in een tuindagboek' },
    ],
  },

  halloween: {
    seoTitle: 'Halloween-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare halloween-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'halloween groep 3, halloween oefeningen 6\u20137 jaar, halloween oefeningen groep 3, halloween uitprintbaar groep 3, halloween werkbladen groep 3, halloween activiteiten groep 3, halloween leerbladen 6\u20137 jaar, halloween gratis groep 3, halloween PDF groep 3, halloween rekenen groep 3',
    snippetAnswer: 'Halloween-oefeningen voor groep 3 (6\u20137 jaar) combineren het halloweenthema met optellen en aftrekken tot 20, redactiesommen over snoep en pompoenen, halloweenwoorden lezen en schrijven en patronen in decoraties. Kinderen rekenen met spoken, heksen en pompoenen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het halloweenthema een spannende seizoenscontext die de motivatie voor rekenen en schrijven sterk verhoogt: zes- en zevenjarigen genieten van de griezelsfeer en die betrokkenheid kan productief worden ingezet. De SLO-leerlijnen benadrukken rekenen in alledaagse contexten en eerlijk verdelen, en halloween biedt beide in een feestelijke setting. Redactiesommen over snoepverdeling \u2014 er zijn 16 snoepjes voor 4 kinderen, hoeveel krijgt ieder? \u2014 oefenen verdeling als voorbereiding op delen. Optellen en aftrekken tot 20 met spoken, vleermuizen en pompoenen is intrinsiek motiverend. Halloweenwoorden als spinnenweb, vleermuisvleugel en pompoensoep zijn uitstekend decodeermateriaal met samengestelde woorden. Het schrijven van een griezelverhaal oefent verhalend schrijven met sfeer en chronologie. Symmetrie in vleermuisvleugels en spinnenwebben biedt een visuele ingang voor meetkunde.',
    developmentalMilestones: [
      { milestone: 'Eerlijk verdelen van halloweensnoep (6\u20137-jarigen verdelen snoep over groepen)', howWeAddress: 'Verdeelactiviteiten waarbij kinderen snoep gelijk over mandjes verdelen introduceren het concept van gelijke verdeling in een feestelijke context' },
      { milestone: 'Optellen en aftrekken tot 20 in halloweencontext (rekenen met spoken en pompoenen)', howWeAddress: 'Rekenactiviteiten met halloweenmateriaal bieden herhaalde oefening van sommen tot 20 die kinderen intrinsiek boeit' },
      { milestone: 'Halloweenwoorden decoderen en schrijven (samengestelde griezelwoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met halloweenwoorden oefenen het decoderen van samengestelde woorden als spinnenweb en vleermuisvleugel' },
      { milestone: 'Verhalend schrijven met sfeer (een griezelverhaal met spanning opbouwen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een kort griezelverhaal schrijven oefenen verhalend schrijven met sfeerwoorden en chronologie' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied halloweenwoorden aan met plaatjes en een woordenbank, en gebruik eenvoudige verdeelactiviteiten met even aantallen. Voor gevorderde kinderen: introduceer sommen tot 20 met ontbrekende termen, laat hen een uitgebreid griezelverhaal schrijven met dialoog, en daag hen uit met symmetrietekeningen van spinnenwebben.',
    parentTakeaway: 'Halloween biedt speelse rekenkansen in groep 3. Laat uw kind na het ophalen van snoep alles tellen en sorteren: hoeveel chocolade, hoeveel lollies, hoeveel bij elkaar? Verdeel het snoep eerlijk over gezinsleden: als er 18 snoepjes zijn voor 3 personen, hoeveel krijgt ieder? Na een halloweenwerkblad kunt u samen een griezelverhaal schrijven \u2014 wie, wat, waar en hoe spannend!',
    classroomIntegration: 'Het halloweenthema biedt in groep 3 integratiemogelijkheden: bij rekenen worden snoepjes geteld en verdeeld, bij taal worden halloweenwoorden gelezen en een griezelverhaal geschreven, bij beeldende vorming worden pompoenen en spinnenwebben getekend met symmetrie, en bij drama worden griezelsketches opgevoerd. Een halloweenweek met werkbladen en feestactiviteiten combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Halloweenrekensommen', emerging: 'lost optelsommen tot 10 op maar heeft moeite met aftrekken in halloweencontext', proficient: 'rekent vlot op en af tot 20 met halloweenmateriaal en noteert sommen correct', advanced: 'lost meerstaps-redactiesommen op en bedenkt eigen halloweenrekenvragen' },
      { skill: 'Snoep eerlijk verdelen', emerging: 'verdeelt met hulp maar maakt ongelijke groepen', proficient: 'verdeelt zelfstandig snoep gelijk over groepen tot zes en controleert het resultaat', advanced: 'verdeelt snel, berekent hoeveel extra nodig zijn bij ongelijke verdeling en noteert de deelsom' },
      { skill: 'Halloweenwoorden lezen en schrijven', emerging: 'leest korte woorden (heks, spook) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien halloweenwoorden correct inclusief samenstellingen', advanced: 'schrijft een griezelverhaal met halloweenwoorden in correcte zinnen' },
    ],
  },

  holidays: {
    seoTitle: 'Feestdagen-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare feestdagen-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'feestdagen groep 3, feestdagen oefeningen 6\u20137 jaar, feestdagen oefeningen groep 3, feestdagen uitprintbaar groep 3, feestdagen werkbladen groep 3, feestdagen activiteiten groep 3, feestdagen leerbladen 6\u20137 jaar, feestdagen gratis groep 3, feestdagen PDF groep 3, feestdagen rekenen groep 3',
    snippetAnswer: 'Feestdagen-oefeningen voor groep 3 (6\u20137 jaar) gebruiken feestcontexten voor optellen en aftrekken tot 20, redactiesommen over cadeaus en decoratie, feestwoorden lezen en schrijven en kalendervaardigheden. Kinderen rekenen met kerstballen, sinterklaassnoep en verjaardagstaarten. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het feestdagenthema een emotioneel rijke context die rekenen, taal en kalendervaardigheden verbindt: zes- en zevenjarigen beleven feestdagen intens en die betrokkenheid verhoogt de leermotivatie. De SLO-leerlijnen benadrukken kalendervaardigheden en rekenen in alledaagse situaties als kerndoelen, en feestdagen bieden een natuurlijke context voor beide. Hoeveel dagen tot Sinterklaas, hoeveel weken tot kerst? Dit oefent aftrekken en tijdsbegrip. Redactiesommen over feestinkopen \u2014 je koopt 3 cadeaus van 5 euro, hoeveel betaal je? \u2014 introduceren herhaald optellen. Feestwoorden als kerstversiering, Sinterklaasgedicht en verjaardagsslinger zijn motiverend decodeermateriaal met lange samenstellingen. Het schrijven van een Sinterklaasgedicht of kerstwens oefent creatief en functioneel schrijven. De culturele diversiteit van feestdagen biedt kansen voor intercultureel bewustzijn.',
    developmentalMilestones: [
      { milestone: 'Kalendervaardigheden (6\u20137-jarigen berekenen dagen en weken tot een feestdag)', howWeAddress: 'Kalenderactiviteiten waarbij kinderen aftellen naar feestdagen oefenen tijdsbegrip, aftrekken en het aflezen van een kalender' },
      { milestone: 'Rekenen met feestinkopen (optellen van prijzen en berekenen van totalen)', howWeAddress: 'Cadeauwinkel-activiteiten met prijzen oefenen optellen tot 20 en het concept van herhaald optellen in een motiverende context' },
      { milestone: 'Feestwoorden decoderen en schrijven (lange samengestelde woorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met feestwoorden oefenen het decoderen van lange samenstellingen als kerstversiering en verjaardagsslinger' },
      { milestone: 'Creatief schrijven bij feestdagen (gedichten, wensen, kaarten)', howWeAddress: 'Schrijfopdrachten zoals een Sinterklaasgedicht of kerstwens oefenen creatief taalgebruik met rijm, sfeer en persoonlijke uitdrukking' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied feestwoorden aan met plaatjes en een woordenbank, en gebruik een eenvoudige kalender met markeerbare data. Voor gevorderde kinderen: introduceer sommen tot 20 met meerdere bewerkingen, laat hen een feestbudget berekenen, en daag hen uit met het schrijven van een Sinterklaasgedicht met rijm.',
    parentTakeaway: 'Feestdagen zijn de beste leermomenten in groep 3. Tel samen af naar Sinterklaas of kerst op de kalender: hoeveel dagen nog? Laat uw kind helpen met feestinkopen: als een cadeau 7 euro kost en je hebt 15 euro, hoeveel houd je over? Schrijf samen een Sinterklaasgedicht of kerstwens \u2014 rijmen, bedenken en opschrijven oefent taal op het leukste niveau.',
    classroomIntegration: 'Het feestdagenthema biedt in groep 3 integratiemogelijkheden: bij rekenen worden feestinkopen berekend en kalendervaardigheden geoefend, bij taal worden feestwoorden gelezen en gedichten geschreven, bij wereldori\u00ebntatie worden feestdagen uit verschillende culturen besproken, en bij beeldende vorming worden decoraties ontworpen. Seizoensgebonden werkbladen sluiten aan bij de SLO-doelen voor rekenen, taal en burgerschap.',
    assessmentRubric: [
      { skill: 'Feestrekensommen', emerging: 'telt twee prijzen op tot 10 euro maar berekent geen totaal bij meerdere cadeaus', proficient: 'rekent vlot op en af tot 20 in feestcontext en noteert sommen correct', advanced: 'berekent een feestbudget met meerdere posten en vergelijkt totalen' },
      { skill: 'Kalendervaardigheden', emerging: 'leest de datum op de kalender maar berekent niet zelfstandig hoeveel dagen tot een feestdag', proficient: 'telt zelfstandig dagen en weken tot een feestdag en noteert het antwoord', advanced: 'berekent periodes tussen feestdagen en vergelijkt de wachttijden' },
      { skill: 'Feestwoorden lezen en schrijven', emerging: 'leest korte feestwoorden (kado, feest) maar hapert bij lange samenstellingen', proficient: 'leest en schrijft acht tot tien feestwoorden correct inclusief samenstellingen', advanced: 'schrijft een feestgedicht of wenskaart met correcte zinnen en creatief taalgebruik' },
    ],
  },

  household: {
    seoTitle: 'Huishouden-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare huishouden-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'huishouden groep 3, huishouden oefeningen 6\u20137 jaar, huishouden oefeningen groep 3, huishouden uitprintbaar groep 3, huishouden werkbladen groep 3, huishouden activiteiten groep 3, huishouden leerbladen 6\u20137 jaar, huishouden gratis groep 3, huishouden PDF groep 3, huishouden rekenen groep 3',
    snippetAnswer: 'Huishouden-oefeningen voor groep 3 (6\u20137 jaar) gebruiken huishoudelijke situaties voor optellen en aftrekken tot 20, redactiesommen over boodschappen en klusjes, huishoudwoorden lezen en schrijven en tijdsindeling. Kinderen rekenen met boodschappen, schoonmaakartikelen en klusjes. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het huishoudthema de meest praktische context voor rekenen en functioneel schrijven: zes- en zevenjarigen helpen thuis mee en die ervaring kan worden verbonden met formele leerdoelen. De SLO-leerlijnen benadrukken rekenen in alledaagse situaties en instructief taalgebruik, en huishouden combineert beide. Redactiesommen over boodschappen \u2014 melk kost 2 euro, brood 3 euro, hoeveel bij elkaar? \u2014 oefenen optellen met geld. Een boodschappenlijst schrijven oefent functioneel schrijven met een echt doel. Klusjes verdelen over dagen oefent tijdsindeling en planning. Huishoudwoorden als stofzuiger, afwasmiddel en wasmachine zijn uitstekend decodeermateriaal met lange samenstellingen. De dagelijkse herkenning maakt abstracte rekenbegrippen tastbaar en relevant voor alle leerlingen.',
    developmentalMilestones: [
      { milestone: 'Rekenen met boodschappenprijzen (6\u20137-jarigen optellen en aftrekken met eurobedragen)', howWeAddress: 'Boodschappenwinkel-activiteiten met prijzen oefenen optellen tot 20 en wisselgeldberekeningen in een herkenbare context' },
      { milestone: 'Tijdsindeling en planning (klusjes verdelen over dagen van de week)', howWeAddress: 'Planningsactiviteiten waarbij kinderen klusjes op een weekkalender indelen oefenen tijdsbegrip en organisatievaardigheden' },
      { milestone: 'Huishoudwoorden decoderen en schrijven (lange samengestelde woorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met huishoudwoorden oefenen het decoderen van samenstellingen als stofzuiger en afwasmiddel' },
      { milestone: 'Functioneel schrijven (boodschappenlijst, klusjesrooster, instructies)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een boodschappenlijst of klusjesrooster maken oefenen functioneel schrijven met een echt doel' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk boodschappensommen tot optellen tot 10 met hele euro\u2019s, bied huishoudwoorden aan met plaatjes, en geef een voorgestructureerd weekrooster om in te vullen. Voor gevorderde kinderen: introduceer sommen met wisselgeld tot 20 euro, laat hen een weekboodschappenlijst met budget berekenen, en daag hen uit met het schrijven van een huishoudelijke instructie in stappen.',
    parentTakeaway: 'Het huishouden biedt dagelijkse leerkansen in groep 3. Laat uw kind meekijken bij het boodschappen doen: als melk 2 euro kost en kaas 4 euro, hoeveel betalen we? Maak samen een boodschappenlijstje \u2014 uw kind schrijft de artikelen op. Verdeel klusjes over de week en hang het rooster op de koelkast. Na een huishoudwerkblad kunt u samen tellen hoeveel klusjes er deze week zijn gedaan.',
    classroomIntegration: 'Het huishoudthema verbindt in groep 3 rekenen (boodschappensommen, tijdsindeling), taal (huishoudwoorden lezen, een boodschappenlijst schrijven), wereldori\u00ebntatie (dagelijkse routines, zelfstandigheid) en sociaal-emotioneel leren (verantwoordelijkheid, samenwerken). Een huishoudhoek in de klas met speelgeld en producten combineert werkbladen met rollenspel, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Boodschappenrekenen', emerging: 'telt twee prijzen op tot 10 euro maar berekent geen wisselgeld', proficient: 'telt prijzen op tot 20 euro en berekent wisselgeld correct', advanced: 'berekent een boodschappenbudget met meerdere artikelen en vergelijkt totalen' },
      { skill: 'Planning en tijdsindeling', emerging: 'plaatst klusjes op een weekkalender met hulp maar plant niet zelfstandig', proficient: 'verdeelt zelfstandig klusjes over de week en leest het rooster correct', advanced: 'plant effici\u00ebnt, houdt rekening met tijdsduur en past het rooster aan bij veranderingen' },
      { skill: 'Huishoudwoorden lezen en schrijven', emerging: 'leest korte woorden (zeep, dweil) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien huishoudwoorden correct inclusief samenstellingen', advanced: 'schrijft een boodschappenlijst en huishoudelijke instructies in correcte zinnen' },
    ],
  },

  insects: {
    seoTitle: 'Insecten-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare insecten-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'insecten groep 3, insecten oefeningen 6\u20137 jaar, insecten oefeningen groep 3, insecten uitprintbaar groep 3, insecten werkbladen groep 3, insecten activiteiten groep 3, insecten leerbladen 6\u20137 jaar, insecten gratis groep 3, insecten PDF groep 3, insecten rekenen groep 3',
    snippetAnswer: 'Insecten-oefeningen voor groep 3 (6\u20137 jaar) gebruiken insectencontexten voor optellen en aftrekken tot 20, redactiesommen over poten en vleugels, insectennamen lezen en schrijven en classificatie op lichaamsdelen. Kinderen rekenen met lieveheersbeestjes, vlinders en mieren. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het insectenthema een wetenschappelijke context voor tellen, classificeren en informatief schrijven: zes- en zevenjarigen zijn gefascineerd door kleine beestjes en die nieuwsgierigheid kan worden omgezet in formeel leren. De SLO-leerlijnen benadrukken classificatie en vergelijken als kerndoelen, en insecten bieden een natuurlijke context. Alle insecten hebben zes poten \u2014 drie lieveheersbeestjes hebben samen hoeveel poten? Dit type som oefent herhaald optellen als voorbereiding op vermenigvuldiging. Redactiesommen over insecten in de tuin combineren tellen met begrijpend lezen. Insectennamen als lieveheersbeestje, sprinkhaan en waterjuffer zijn uitstekend decodeermateriaal met samengestelde en meerlettergrepige woorden. Symmetrie in vlindervleugels biedt een visuele ingang voor meetkunde. Het schrijven van een insectensteckbrief oefent informatief schrijven met feitelijke gegevens.',
    developmentalMilestones: [
      { milestone: 'Herhaald optellen met insectenpoten (6\u20137-jarigen tellen poten van meerdere insecten)', howWeAddress: 'Potentel-activiteiten waarbij kinderen de poten van drie insecten optellen (3 \u00d7 6 = 18) introduceren het concept van herhaald optellen' },
      { milestone: 'Classificatie op lichaamsdelen (insecten ordenen op vleugels, poten, voelsprieten)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen insecten groeperen op lichaamsdelen bouwen wetenschappelijke classificatievaardigheden op' },
      { milestone: 'Insectennamen decoderen en schrijven (samengestelde en meerlettergrepige woorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met insectennamen oefenen het decoderen van woorden als lieveheersbeestje en sprinkhaan' },
      { milestone: 'Symmetrie herkennen in vlindervleugels (spiegelpatronen analyseren)', howWeAddress: 'Symmetrieactiviteiten met vlindervleugels laten kinderen patronen spiegelen en de spiegellijn aanwijzen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied insectennamen aan met plaatjes en een woordenbank, en gebruik eenvoudige symmetriefiguren met een hulplijn. Voor gevorderde kinderen: introduceer herhaald optellen tot 20 met grotere aantallen insecten, laat hen een uitgebreide insectensteckbrief schrijven, en daag hen uit met symmetrietekeningen van complexe vlinderpatronen.',
    parentTakeaway: 'Insecten bieden verrassende rekenkansen in groep 3. Zoek samen insecten in de tuin en tel de poten: als een kever 6 poten heeft en je vindt 3 kevers, hoeveel poten bij elkaar? Bekijk een vlinder en bespreek de symmetrie: wat zie je links, wat rechts? Na een insectenwerkblad kunt u samen een insectensteckbrief maken: naam, aantal poten, kleur, leefomgeving \u2014 schrijven en tekenen in \u00e9\u00e9n.',
    classroomIntegration: 'Het insectenthema integreert in groep 3 met rekenen (herhaald optellen met poten, sommen met insecten), taal (insectennamen lezen, een steckbrief schrijven), natuur (insectenkenmerken, leefomgeving, nut van insecten) en beeldende vorming (symmetrische vlindertekeningen). Een insectenproject met werkbladen en buitenobservaties combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Herhaald optellen met insecten', emerging: 'telt poten van \u00e9\u00e9n insect maar combineert niet zelfstandig meerdere insecten', proficient: 'telt poten van drie insecten correct op door herhaald optellen en noteert de som', advanced: 'past herhaald optellen vlot toe en verwoordt de strategie als voorloper van vermenigvuldiging' },
      { skill: 'Insectenclassificatie', emerging: 'sorteert insecten op \u00e9\u00e9n kenmerk met hulp', proficient: 'classificeert zelfstandig op twee kenmerken en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en legt de redenering schriftelijk uit' },
      { skill: 'Insectennamen lezen en schrijven', emerging: 'leest korte woorden (bij, mier) maar hapert bij samengestelde insectennamen', proficient: 'leest en schrijft acht tot tien insectennamen correct inclusief samenstellingen', advanced: 'leest vlot alle insectennamen en schrijft een informatieve steckbrief met correcte zinnen' },
    ],
  },

  jobs: {
    seoTitle: 'Beroepen-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare beroepen-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'beroepen groep 3, beroepen oefeningen 6\u20137 jaar, beroepen oefeningen groep 3, beroepen uitprintbaar groep 3, beroepen werkbladen groep 3, beroepen activiteiten groep 3, beroepen leerbladen 6\u20137 jaar, beroepen gratis groep 3, beroepen PDF groep 3, beroepen rekenen groep 3',
    snippetAnswer: 'Beroepen-oefeningen voor groep 3 (6\u20137 jaar) gebruiken beroepcontexten voor optellen en aftrekken tot 20, redactiesommen over werkdagen en gereedschap, beroepennamen lezen en schrijven en classificatie op werkplek. Kinderen rekenen met brandweerlieden, artsen en bakkers. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het beroepenthema een brug naar de maatschappij: zes- en zevenjarigen zijn nieuwsgierig naar wat volwassenen doen en die nieuwsgierigheid kan worden ingezet voor rekenen, lezen en schrijven. De SLO-leerlijnen benadrukken ori\u00ebntatie op de samenleving als kerndoel, en beroepen bieden een directe verbinding. Redactiesommen over beroepen \u2014 de bakker bakt 14 broden, er worden 9 verkocht, hoeveel zijn er over? \u2014 combineren rekenen met maatschappelijke kennis. Beroepenwoorden als brandweerman, dierenarts en politieagent zijn uitstekend decodeermateriaal met samengestelde woorden. Het schrijven van een beroepeninterview oefent informatief schrijven met vragen en antwoorden. Classificatie op werkplek (binnen/buiten, kantoor/fabriek) bouwt categoriseringsvaardigheden op.',
    developmentalMilestones: [
      { milestone: 'Redactiesommen in beroepcontext (6\u20137-jarigen rekenen met werkscenario\u2019s)', howWeAddress: 'Beroepenverhalen met optel- en aftreksituaties oefenen het vertalen van een maatschappelijke context naar een rekenbewerking' },
      { milestone: 'Beroepenwoorden decoderen en schrijven (samengestelde beroepsnamen)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met beroepenwoorden oefenen het decoderen van samenstellingen als brandweerman en dierenarts' },
      { milestone: 'Classificatie op werkplek en gereedschap (beroepen ordenen op kenmerken)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen beroepen groeperen op werkplek en gereedschap bouwen categoriseringsvaardigheden op' },
      { milestone: 'Informatief schrijven (een beroepeninterview of beroepsbeschrijving)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een beroep beschrijven of een interview uitwerken oefenen informatief schrijven met vragen en feitjes' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied beroepenwoorden aan met plaatjes en een woordenbank, en gebruik sorteeractiviteiten met \u00e9\u00e9n criterium. Voor gevorderde kinderen: introduceer sommen tot 20 met meerdere bewerkingen, laat hen een uitgebreid beroepeninterview schrijven, en daag hen uit met classificatie op drie kenmerken met schriftelijke toelichting.',
    parentTakeaway: 'Beroepen bieden boeiende rekenkansen in groep 3. Vraag bij een bezoek aan de bakker: als er 15 broden in de vitrine liggen en 7 worden verkocht, hoeveel zijn er over? Laat uw kind een ouder of buurman interviewen over hun beroep en de antwoorden opschrijven. Na een beroepenwerkblad kunt u samen beroepen sorteren: welke werken binnen, welke buiten, welke met dieren?',
    classroomIntegration: 'Het beroepenthema verbindt in groep 3 rekenen (beroepensommen, gereedschap tellen), taal (beroepenwoorden lezen, een interview schrijven), wereldori\u00ebntatie (beroepen in de wijk, maatschappelijke functies) en drama (beroepen naspelen). Een beroepenweek met werkbladen, gastsprekers en rollenspel combineert alle vakken, in lijn met de SLO-doelen voor rekenen, taal en burgerschap.',
    assessmentRubric: [
      { skill: 'Beroepenredactiesommen', emerging: 'leest het verhaal maar stelt de som niet zelfstandig op', proficient: 'vertaalt beroepenverhalen correct naar sommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op en bedenkt eigen beroepenredactiesommen' },
      { skill: 'Beroepenclassificatie', emerging: 'sorteert beroepen op \u00e9\u00e9n kenmerk met hulp', proficient: 'classificeert zelfstandig op twee kenmerken en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en legt de redenering schriftelijk uit' },
      { skill: 'Beroepenwoorden lezen en schrijven', emerging: 'leest korte woorden (arts, kok) maar hapert bij samengestelde beroepenwoorden', proficient: 'leest en schrijft acht tot tien beroepenwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle beroepenwoorden en schrijft een beroepsbeschrijving met correcte zinnen' },
    ],
  },

  music: {
    seoTitle: 'Muziek-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare muziek-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'muziek groep 3, muziek oefeningen 6\u20137 jaar, muziek oefeningen groep 3, muziek uitprintbaar groep 3, muziek werkbladen groep 3, muziek activiteiten groep 3, muziek leerbladen 6\u20137 jaar, muziek gratis groep 3, muziek PDF groep 3, muziek rekenen groep 3',
    snippetAnswer: 'Muziek-oefeningen voor groep 3 (6\u20137 jaar) gebruiken muzikale contexten voor optellen en aftrekken tot 20, redactiesommen over instrumenten en noten, muziekwoorden lezen en schrijven en patronen in ritmes. Kinderen rekenen met noten, instrumenten en orkestleden. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het muziekthema een unieke verbinding tussen wiskunde en creativiteit: zes- en zevenjarigen kunnen ritmepatronen klappen, noten tellen en die ervaring inzetten voor formeel rekenen. De SLO-leerlijnen benadrukken patroonherkenning en logisch redeneren als kerndoelen, en muziek is intrinsiek patroonmatig. Ritmepatronen \u2014 kort-kort-lang, kort-kort-lang \u2014 oefenen het herkennen en voortzetten van reeksen. Redactiesommen over een orkest \u2014 er zijn 8 violen en 6 fluiten, hoeveel instrumenten bij elkaar? \u2014 oefenen optellen in een culturele context. Muziekwoorden als xylofoon, tamboerijn en blokfluit zijn uitdagend decodeermateriaal. Het schrijven van een liedtekst oefent creatief schrijven met rijm en ritme. De multisensorische aard van muziek \u2014 horen, klappen, zingen \u2014 activeert meerdere leerkanalen.',
    developmentalMilestones: [
      { milestone: 'Patroonherkenning in ritmes (6\u20137-jarigen herkennen en herhalen ritmische patronen)', howWeAddress: 'Ritmeactiviteiten waarbij kinderen klap-patronen herkennen, voortzetten en opschrijven oefenen wiskundig patroondenken via muziek' },
      { milestone: 'Optellen en aftrekken tot 20 met instrumenten (orkestleden tellen)', howWeAddress: 'Rekenactiviteiten met instrumentenaantallen in een orkest bieden herhaalde oefening van sommen tot 20 in een muzikale context' },
      { milestone: 'Muziekwoorden decoderen en schrijven (uitdagende meerlettergrepige woorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met muziekwoorden oefenen het decoderen van woorden als xylofoon, tamboerijn en blokfluit' },
      { milestone: 'Creatief schrijven met rijm en ritme (een liedtekst of rap maken)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een kort liedje of rap schrijven oefenen creatief taalgebruik met rijm en ritme' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk patronen tot twee elementen in afwisseling, bied muziekwoorden aan met plaatjes en een woordenbank, en gebruik sommen tot 10. Voor gevorderde kinderen: introduceer patronen met drie of vier elementen, laat hen een uitgebreide liedtekst schrijven met rijmschema, en daag hen uit met sommen over een compleet orkest.',
    parentTakeaway: 'Muziek biedt verrassende rekenkansen in groep 3. Klap samen een ritmepatroon en laat uw kind het herhalen en voortzetten. Tel de instrumenten in een orkest op televisie: hoeveel violen zie je, hoeveel slagwerkers? Na een muziekwerkblad kunt u samen een liedje schrijven over de dag \u2014 rijmen, tellen en zingen in \u00e9\u00e9n activiteit. Muziek maakt rekenen vrolijk!',
    classroomIntegration: 'Het muziekthema integreert in groep 3 met rekenen (ritmepatronen, instrumenten tellen), taal (muziekwoorden lezen, een liedtekst schrijven), muziekonderwijs (instrumenten bespelen, ritme klappen) en beeldende vorming (instrumenten tekenen). Een muziekproject met werkbladen en een klassenconcert combineert alle vakken, in lijn met de SLO-doelen voor rekenen, taal en kunstzinnige ori\u00ebntatie.',
    assessmentRubric: [
      { skill: 'Muzikale patronen', emerging: 'klapt een tweedelig patroon na maar herkent het niet op papier', proficient: 'herkent, schrijft en zet ritmische patronen met twee of drie elementen voort', advanced: 'ontwerpt eigen complexe ritmepatronen en beschrijft de regel die het patroon bepaalt' },
      { skill: 'Muziekrekensommen', emerging: 'telt instrumenten maar combineert groepen niet zelfstandig tot 20', proficient: 'telt op en trekt af tot 20 met instrumentenaantallen en noteert sommen correct', advanced: 'lost meerstaps-orkestsommen op en bedenkt eigen muziekrekenvragen' },
      { skill: 'Muziekwoorden lezen en schrijven', emerging: 'leest korte woorden (fluit, drum) maar hapert bij langere muziekwoorden', proficient: 'leest en schrijft acht tot tien muziekwoorden correct inclusief meerlettergrepige woorden', advanced: 'leest vlot alle muziekwoorden en schrijft een creatieve liedtekst met correcte spelling' },
    ],
  },

  nature: {
    seoTitle: 'Natuur-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare natuur-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'natuur groep 3, natuur oefeningen 6\u20137 jaar, natuur oefeningen groep 3, natuur uitprintbaar groep 3, natuur werkbladen groep 3, natuur activiteiten groep 3, natuur leerbladen 6\u20137 jaar, natuur gratis groep 3, natuur PDF groep 3, natuur rekenen groep 3',
    snippetAnswer: 'Natuur-oefeningen voor groep 3 (6\u20137 jaar) gebruiken natuurcontexten voor optellen en aftrekken tot 20, redactiesommen over planten en dieren, natuurwoorden lezen en schrijven en gegevensregistratie van weerwaarnemingen. Kinderen rekenen met bomen, rivieren en seizoenen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het natuurthema een brede wetenschappelijke context voor meten, registreren en informatief schrijven: zes- en zevenjarigen kunnen de natuur niet alleen waarnemen maar ook meten, vastleggen en beschrijven. De SLO-leerlijnen benadrukken meten en gegevensverwerking als kerndoelen, en de natuur biedt een eindeloze bron van meetbare verschijnselen: temperatuur, regenval, plantgroei, zonuren. Redactiesommen over de natuur \u2014 er zitten 12 vogels in de boom, 5 vliegen weg, hoeveel blijven er? \u2014 verbinden rekenen met observatie. Natuurwoorden als paddenstoel, waterval en zonnebloem zijn motiverend decodeermateriaal met samengestelde woorden. Het bijhouden van een weerlogboek oefent informatief schrijven met data, meetwaarden en symbolen. De seizoenscyclus biedt een langlopende context voor kalendervaardigheden en periodiek vergelijken.',
    developmentalMilestones: [
      { milestone: 'Gegevens registreren en vergelijken (6\u20137-jarigen houden een weerlogboek bij)', howWeAddress: 'Weerregistratie-activiteiten waarbij kinderen dagelijks temperatuur en neerslag noteren en vergelijken bouwen gegevensvaardigheden op' },
      { milestone: 'Redactiesommen in natuurcontext (kinderen rekenen met planten en dieren)', howWeAddress: 'Natuurverhalen met optel- en aftreksituaties oefenen het vertalen van een observatie naar een rekenbewerking' },
      { milestone: 'Natuurwoorden decoderen en schrijven (samengestelde woorden uit de natuur)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met natuurwoorden oefenen het decoderen van samenstellingen als paddenstoel en zonnebloem' },
      { milestone: 'Informatief schrijven over de natuur (observaties, metingen, conclusies)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een natuurobservatie beschrijven met datum, meting en tekening oefenen informatief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied natuurwoorden aan met plaatjes en een woordenbank, en gebruik een eenvoudig weerkaartje met symbolen. Voor gevorderde kinderen: introduceer sommen tot 20 met verschilberekeningen, laat hen een weekgrafiek van temperaturen maken en vergelijken, en daag hen uit met een uitgebreid natuurverslag.',
    parentTakeaway: 'De natuur biedt eindeloze leerkansen in groep 3. Houd samen een weerlogboek bij: noteer elke dag de temperatuur en het weer. Hoeveel graden verschil tussen maandag en vrijdag? Tel samen de bomen in het park: hoeveel eiken, hoeveel berken, hoeveel bij elkaar? Na een natuurwerkblad kunt u samen een wandeling maken en een natuurverslag schrijven over wat u zag, hoorde en telde.',
    classroomIntegration: 'Het natuurthema integreert in groep 3 met rekenen (sommen met natuuraantallen, meten, gegevensregistratie), taal (natuurwoorden lezen, een natuurverslag schrijven), natuur (seizoenen, weer, planten en dieren) en beeldende vorming (natuurtekeningen). Een jaarrond-natuurproject met werkbladen, buitenobservaties en een klassenweergrafiek combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Gegevens registreren', emerging: 'vult een weerkaartje in met hulp maar vergelijkt gegevens niet zelfstandig', proficient: 'registreert dagelijks weergegevens correct en vergelijkt waarden over meerdere dagen', advanced: 'maakt een weekgrafiek, berekent gemiddelden en trekt conclusies uit de gegevens' },
      { skill: 'Natuurredactiesommen', emerging: 'leest het verhaal maar stelt de som niet zelfstandig op', proficient: 'vertaalt natuurverhalen correct naar sommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op en formuleert eigen natuurredactiesommen' },
      { skill: 'Natuurwoorden lezen en schrijven', emerging: 'leest korte woorden (boom, blad) maar hapert bij samengestelde natuurwoorden', proficient: 'leest en schrijft acht tot tien natuurwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle natuurwoorden en schrijft een informatief natuurverslag met correcte zinnen' },
    ],
  },

  numbers: {
    seoTitle: 'Getallen-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare getallen-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'getallen groep 3, getallen oefeningen 6\u20137 jaar, getallen oefeningen groep 3, getallen uitprintbaar groep 3, getallen werkbladen groep 3, getallen activiteiten groep 3, getallen leerbladen 6\u20137 jaar, getallen gratis groep 3, getallen PDF groep 3, getallen rekenen groep 3',
    snippetAnswer: 'Getallen-oefeningen voor groep 3 (6\u20137 jaar) bieden gerichte oefening in optellen en aftrekken tot 20, getallenreeksen, getallenlijn, redactiesommen en getallenwoorden lezen en schrijven. Kinderen automatiseren basisbewerkingen en bouwen getalbegrip op. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 staat het getalbegrip tot 20 centraal: zes- en zevenjarigen moeten optellen en aftrekken automatiseren als fundament voor alle verdere wiskunde. De SLO-leerlijnen stellen geautomatiseerd rekenen tot 20 als kernleerdoel voor groep 3, en het getallenthema biedt de meest directe weg. Getallenreeksen \u2014 2, 4, 6, 8, ... \u2014 oefenen patroonherkenning en leggen de basis voor de tafels van vermenigvuldiging. De getallenlijn biedt een visueel model voor optellen en aftrekken: drie stappen naar rechts is erbij, twee stappen naar links is eraf. Redactiesommen worden zuiverder \u2014 geen thematische verpakking maar puur getalbegrip. Getallenwoorden lezen en schrijven (dertien, veertien, achttien) oefent het decoderen van samengestelde woorden die het tientallig stelsel weerspiegelen. Splitsen \u2014 14 is 10 en 4, of 7 en 7 \u2014 bouwt flexibel rekenen op.',
    developmentalMilestones: [
      { milestone: 'Geautomatiseerd optellen en aftrekken tot 20 (6\u20137-jarigen rekenen vlot zonder tellen)', howWeAddress: 'Herhaalde rekenactiviteiten met oplopende moeilijkheid automatiseren basisbewerkingen tot het niveau van vlot rekenen' },
      { milestone: 'Getallenreeksen herkennen en voortzetten (patronen als 2-4-6-8)', howWeAddress: 'Reeksactiviteiten waarbij kinderen het patroon ontdekken en voortzetten oefenen wiskundig patroondenken en leggen de basis voor tafels' },
      { milestone: 'De getallenlijn gebruiken als rekenmodel (sprongen vooruit en achteruit)', howWeAddress: 'Getallenlijn-activiteiten waarbij kinderen sprongen maken voor optellen en aftrekken bieden een visueel model voor rekenbewerkingen' },
      { milestone: 'Getallen splitsen en samenvoegen (14 = 10 + 4 = 7 + 7)', howWeAddress: 'Splitsactiviteiten waarbij kinderen getallen op meerdere manieren splitsen bouwen flexibel getalbegrip en rekenstrategiek op' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot sommen tot 10 met concreet materiaal, bied de getallenlijn tot 20 aan als visuele steun, en oefen eenvoudige reeksen met sprongen van 1. Voor gevorderde kinderen: introduceer sommen tot 20 met ontbrekende termen en gemengde bewerkingen, laat hen complexe reeksen voortzetten (3-6-9-12), en daag hen uit met splitsingen in drie of meer delen.',
    parentTakeaway: 'Getallen zijn het fundament van groep 3. Oefen dagelijks kort: 8 + 5 = ? 17 - 9 = ? Gebruik een getallenlijn op de koelkast als visueel hulpmiddel. Tel samen in tweesprongen (2, 4, 6, 8) of vijfsprongen (5, 10, 15, 20) tijdens een wandeling. Na een getallenwerkblad kunt u splitsingen oefenen: hoeveel manieren kun je 12 maken met twee getallen? Dit speelse oefenen bouwt het rekenfundament.',
    classroomIntegration: 'Het getallenthema is in groep 3 de kern van het rekenonderwijs: getallenreeksen worden ingezet als opwarmer, de getallenlijn hangt als permanent rekenmodel in de klas, splitsactiviteiten ondersteunen alle rekenlessen, en redactiesommen worden dagelijks geoefend. Werkbladen sluiten direct aan bij de rekenmethode en de SLO-kerndoelen voor geautomatiseerd rekenen tot 20.',
    assessmentRubric: [
      { skill: 'Optellen en aftrekken tot 20', emerging: 'rekent tot 10 vlot maar heeft bij sommen tot 20 nog steeds concreet materiaal nodig', proficient: 'rekent vlot op en af tot 20 zonder materiaal en noteert sommen correct', advanced: 'lost sommen met ontbrekende termen en gemengde bewerkingen vlot en foutloos op' },
      { skill: 'Getallenreeksen', emerging: 'herkent eenvoudige reeksen (+1) maar hapert bij sprongen van 2 of 5', proficient: 'herkent en zet reeksen met sprongen van 2, 5 en 10 zelfstandig voort', advanced: 'ontdekt en zet complexe reeksen voort (3-6-9, 4-8-12) en beschrijft de regel' },
      { skill: 'Getallen splitsen', emerging: 'splitst getallen tot 10 in twee delen met hulp', proficient: 'splitst getallen tot 20 op meerdere manieren en noteert de splitsingssommen', advanced: 'splitst vlot in twee of drie delen en past splitsen toe als rekenstrategie bij moeilijke sommen' },
    ],
  },

  ocean: {
    seoTitle: 'Oceaan-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare oceaan-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'oceaan groep 3, oceaan oefeningen 6\u20137 jaar, oceaan oefeningen groep 3, oceaan uitprintbaar groep 3, oceaan werkbladen groep 3, oceaan activiteiten groep 3, oceaan leerbladen 6\u20137 jaar, oceaan gratis groep 3, oceaan PDF groep 3, oceaan rekenen groep 3',
    snippetAnswer: 'Oceaan-oefeningen voor groep 3 (6\u20137 jaar) gebruiken onderwatercontexten voor optellen en aftrekken tot 20, redactiesommen over vissen en schelpen, zeedierennamen lezen en schrijven en classificatie op leefomgeving. Kinderen rekenen met walvissen, dolfijnen en koraalriffen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het oceaanthema een fascinerende context voor vergelijken, classificeren en informatief schrijven: zes- en zevenjarigen zijn betoverd door de onderwaterwereld en die betovering verhoogt de leermotivatie. De SLO-leerlijnen benadrukken vergelijken en classificatie als kerndoelen, en de oceaan biedt extreme schaalverschillen: de blauwe vinvis is 30 meter, een zeepaardje slechts 15 centimeter. Redactiesommen over de oceaan \u2014 er zwemmen 14 vissen in het rif, 6 zwemmen weg, hoeveel blijven er? \u2014 oefenen aftrekken in een spannende context. Zeedierennamen als octopus, zeeschildpad en kwallenarm zijn motiverend decodeermateriaal. Het schrijven van een onderwaterdagboek oefent informatief schrijven met feitjes en beschrijvingen. Classificatie op leefomgeving (koraalrif, diepzee, kustwater) bouwt wetenschappelijk denken op.',
    developmentalMilestones: [
      { milestone: 'Vergelijken op grootte in extreme schaalverschillen (walvis versus zeepaardje)', howWeAddress: 'Vergelijkingsactiviteiten waarbij kinderen zeedieren ordenen op grootte en de verschillen in getallen uitdrukken' },
      { milestone: 'Redactiesommen in onderwatercontext (kinderen rekenen met vissen en schelpen)', howWeAddress: 'Oceaanverhalen met optel- en aftreksituaties oefenen het vertalen van een onderwaterschenario naar een rekenbewerking' },
      { milestone: 'Zeedierennamen decoderen en schrijven (meerlettergrepige en samengestelde woorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met zeedierennamen oefenen het decoderen van woorden als zeeschildpad en kwallenarm' },
      { milestone: 'Classificatie op leefomgeving (koraalrif, diepzee, kustwater)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen zeedieren groeperen op leefomgeving bouwen wetenschappelijke categoriseringsvaardigheden op' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied zeedierennamen aan met plaatjes en een woordenbank, en gebruik eenvoudige vergelijkingen (groter/kleiner). Voor gevorderde kinderen: introduceer sommen tot 20 met verschilberekeningen in meters, laat hen een onderwatersteckbrief schrijven met feitjes, en daag hen uit met classificatie op drie kenmerken.',
    parentTakeaway: 'De oceaan biedt boeiende rekenkansen in groep 3. Bekijk samen een onderwaterdocumentaire en tel de dieren: hoeveel vissen in de school, hoeveel schildpadden? Vergelijk groottes: een dolfijn is 3 meter, een walvis 20 meter \u2014 hoeveel verschil? Na een oceaanwerkblad kunt u samen een onderwatersteckbrief maken van het lievelingszeedier: naam, grootte, leefomgeving, voedsel \u2014 schrijven en tekenen in \u00e9\u00e9n.',
    classroomIntegration: 'Het oceaanthema integreert in groep 3 met rekenen (vergelijken, sommen met zeedieren, classificatie), taal (zeedierennamen lezen, een onderwaterdagboek schrijven), natuur (zeeleven, ecosystemen, milieu) en beeldende vorming (onderwatersc\u00e8nes tekenen). Een oceaanproject met werkbladen, een klassenaquarium en leesteksten combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vergelijken van zeedieren', emerging: 'vergelijkt twee dieren (groter/kleiner) maar drukt het verschil niet in getallen uit', proficient: 'ordent zelfstandig vijf zeedieren op grootte en berekent de verschillen', advanced: 'ordent op meerdere kenmerken, berekent de verschillen en registreert de gegevens in een tabel' },
      { skill: 'Oceaanredactiesommen', emerging: 'leest het verhaal maar stelt de som niet zelfstandig op', proficient: 'vertaalt oceaanverhalen correct naar sommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op en formuleert eigen oceaanredactiesommen' },
      { skill: 'Zeedierennamen lezen en schrijven', emerging: 'leest korte woorden (vis, krab) maar hapert bij langere zeedierennamen', proficient: 'leest en schrijft acht tot tien zeedierennamen correct inclusief samenstellingen', advanced: 'leest vlot alle zeedierennamen en schrijft een informatieve steckbrief met correcte zinnen' },
    ],
  },

  pets: {
    seoTitle: 'Huisdieren-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare huisdieren-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'huisdieren groep 3, huisdieren oefeningen 6\u20137 jaar, huisdieren oefeningen groep 3, huisdieren uitprintbaar groep 3, huisdieren werkbladen groep 3, huisdieren activiteiten groep 3, huisdieren leerbladen 6\u20137 jaar, huisdieren gratis groep 3, huisdieren PDF groep 3, huisdieren rekenen groep 3',
    snippetAnswer: 'Huisdieren-oefeningen voor groep 3 (6\u20137 jaar) gebruiken huisdiercontexten voor optellen en aftrekken tot 20, redactiesommen over voer en verzorging, huisdiernamen lezen en schrijven en gegevensregistratie over gewicht en groei. Kinderen rekenen met honden, katten en konijnen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het huisdierenthema een persoonlijke context voor meten, gegevensregistratie en verantwoordelijkheid: zes- en zevenjarigen zijn emotioneel betrokken bij huisdieren en die betrokkenheid verhoogt de leermotivatie. De SLO-leerlijnen benadrukken meten en gegevensverwerking als kerndoelen, en een huisdier biedt een authentieke meetcontext: hoe zwaar is de hond, hoeveel gram voer per dag, hoe lang is de kat van neus tot staart? Redactiesommen over huisdierenverzorging \u2014 de hond eet 3 bakjes per dag, hoeveel in een week van 5 dagen? \u2014 introduceren herhaald optellen. Huisdierwoorden als cavia, parkiet en voerbak zijn motiverend decodeermateriaal. Het schrijven van een huisdierdagboek oefent informatief schrijven met dagelijkse observaties. De verantwoordelijkheid voor een huisdier verbindt het thema met sociaal-emotioneel leren.',
    developmentalMilestones: [
      { milestone: 'Meten van huisdiergegevens (6\u20137-jarigen meten gewicht en lengte van huisdieren)', howWeAddress: 'Meetactiviteiten waarbij kinderen huisdiergewicht en -lengte registreren en vergelijken bouwen meetvaardigheden op met een persoonlijke context' },
      { milestone: 'Herhaald optellen met voer (dagelijkse hoeveelheden optellen over meerdere dagen)', howWeAddress: 'Voerberekeningen waarbij kinderen dagportions optellen over een week introduceren herhaald optellen als voorbereiding op vermenigvuldiging' },
      { milestone: 'Huisdierwoorden decoderen en schrijven (diernamen en verzorgingswoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met huisdierwoorden oefenen het decoderen van woorden als cavia, parkiet en voerbak' },
      { milestone: 'Informatief schrijven in een huisdierdagboek (observaties, metingen, verzorging)', howWeAddress: 'Dagboekactiviteiten waarbij kinderen dagelijks over hun huisdier schrijven oefenen informatief schrijven met persoonlijke betrokkenheid' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied huisdierwoorden aan met plaatjes en een woordenbank, en gebruik eenvoudige meetopdrachten met vergelijken. Voor gevorderde kinderen: introduceer herhaald optellen over een hele week, laat hen een uitgebreid huisdierdagboek schrijven met meetresultaten in een tabel, en daag hen uit met een huisdierverzorgingsschema berekenen.',
    parentTakeaway: 'Een huisdier is de beste rekenleraar in groep 3. Laat uw kind het voer afmeten: hoeveel gram per dag, hoeveel per week? Weeg het huisdier samen en houd de groei bij. Na een huisdierenwerkblad kunt u samen een huisdierdagboek bijhouden: wat at het dier, hoeveel bewoog het, hoe zwaar is het \u2014 meten, rekenen en schrijven in \u00e9\u00e9n activiteit.',
    classroomIntegration: 'Het huisdierenthema verbindt in groep 3 rekenen (meten, herhaald optellen, voerberekeningen), taal (huisdierwoorden lezen, een dagboek schrijven), natuur (huisdierenverzorging, voeding, gedrag) en sociaal-emotioneel leren (verantwoordelijkheid, empathie). Een klassenhuisdierproject met werkbladen en een verzorgingsrooster combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Huisdiermeten', emerging: 'vergelijkt twee huisdieren (zwaarder/lichter) maar meet niet zelfstandig', proficient: 'meet correct met een weegschaal of meetlint en noteert het resultaat', advanced: 'meet wekelijks, registreert de groei in een tabel en berekent de verandering' },
      { skill: 'Herhaald optellen met voer', emerging: 'telt dagportions tot 10 op maar rekent niet over meerdere dagen', proficient: 'berekent voerhoeveelheden correct over vijf dagen door herhaald optellen', advanced: 'berekent voer voor een hele week en past de berekening aan bij veranderende hoeveelheden' },
      { skill: 'Huisdierwoorden lezen en schrijven', emerging: 'leest korte woorden (hond, kat) maar hapert bij langere huisdierwoorden', proficient: 'leest en schrijft acht tot tien huisdierwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle huisdierwoorden en schrijft een informatief dagboek met correcte zinnen' },
    ],
  },

  pirates: {
    seoTitle: 'Piraten-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare piraten-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'piraten groep 3, piraten oefeningen 6\u20137 jaar, piraten oefeningen groep 3, piraten uitprintbaar groep 3, piraten werkbladen groep 3, piraten activiteiten groep 3, piraten leerbladen 6\u20137 jaar, piraten gratis groep 3, piraten PDF groep 3, piraten rekenen groep 3',
    snippetAnswer: 'Piraten-oefeningen voor groep 3 (6\u20137 jaar) gebruiken piratencontexten voor optellen en aftrekken tot 20, redactiesommen over schatten en goudstukken, piratenwoorden lezen en schrijven en kaartlezen. Kinderen rekenen met schatkisten, zeeroversboten en eilanden. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het piratenthema een avontuurlijke context die de motivatie voor rekenen en lezen enorm verhoogt: zes- en zevenjarigen zijn gefascineerd door schattenjachten en die betrokkenheid kan productief worden ingezet. De SLO-leerlijnen benadrukken plattegrondlezen en rekenen in contexten als kerndoelen, en het piratenthema biedt beide in een spannend scenario. Schatkaartlezen oefent ruimtelijke ori\u00ebntatie met richtingswoorden en co\u00f6rdinaten. Redactiesommen over schatten \u2014 de piraat vindt 12 goudstukken en verdeelt ze over 3 kisten, hoeveel in elke kist? \u2014 oefenen eerlijk delen. Optellen en aftrekken met buit en bemanning is intrinsiek motiverend. Piratenwoorden als schatkist, zeerover en uitkijktoren zijn uitdagend decodeermateriaal met samengestelde woorden. Het schrijven van een piratendagboek oefent verhalend schrijven met avontuur en spanning.',
    developmentalMilestones: [
      { milestone: 'Kaartlezen en ruimtelijke ori\u00ebntatie (6\u20137-jarigen volgen een schatkaart met richtingen)', howWeAddress: 'Schatkaartactiviteiten waarbij kinderen richtingswoorden en eenvoudige co\u00f6rdinaten gebruiken bouwen kaartleesvaardigheden op' },
      { milestone: 'Eerlijk verdelen van piratenbuit (goudstukken over kisten verdelen)', howWeAddress: 'Verdeelactiviteiten met goudstukken oefenen gelijke verdeling als voorbereiding op delen in een motiverende context' },
      { milestone: 'Piratenwoorden decoderen en schrijven (samengestelde avontuurwoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met piratenwoorden oefenen het decoderen van samenstellingen als schatkist en uitkijktoren' },
      { milestone: 'Verhalend schrijven met spanning (een piratendagboek bijhouden)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een piratendagboek schrijven oefenen verhalend schrijven met chronologie en spanning' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied een eenvoudige schatkaart met drie stappen, en gebruik piratenwoorden met plaatjes. Voor gevorderde kinderen: introduceer sommen tot 20 met eerlijk verdelen en restberekening, laat hen een uitgebreide schatkaart tekenen met co\u00f6rdinaten, en daag hen uit met een piratenverhaal met dialoog.',
    parentTakeaway: 'Piraten maken rekenen spannend in groep 3. Organiseer een schattenjacht in huis met een zelfgetekende kaart en rekenvragen bij elke aanwijzing: 8 + 6 = ? om de volgende stap te vinden. Verdeel speelgoedmunten eerlijk: als er 15 goudstukken zijn voor 3 piraten, hoeveel krijgt ieder? Na een piratenwerkblad kunt u samen een piratendagboek schrijven: wat vond de piraat, waar ging hij naartoe, hoeveel schatten telde hij?',
    classroomIntegration: 'Het piratenthema biedt in groep 3 integratiemogelijkheden: bij rekenen worden goudstukken verdeeld en schatten geteld, bij taal worden piratenwoorden gelezen en een dagboek geschreven, bij aardrijkskunde worden kaarten gelezen en getekend, en bij drama worden piratensc\u00e8nes nagespeeld. Een piratenweek met werkbladen en een schattenjacht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Schatkaart lezen', emerging: 'volgt een route op de kaart met hulp maar beschrijft posities niet zelfstandig', proficient: 'leest zelfstandig een schatkaart met richtingswoorden en vindt het eindpunt', advanced: 'tekent een eigen schatkaart met co\u00f6rdinaten en schrijft de routebeschrijving' },
      { skill: 'Piratenschatten verdelen', emerging: 'verdeelt met hulp maar maakt ongelijke groepen', proficient: 'verdeelt zelfstandig goudstukken gelijk over groepen en controleert het resultaat', advanced: 'verdeelt snel, berekent de rest bij ongelijke verdeling en noteert de deelsom' },
      { skill: 'Piratenwoorden lezen en schrijven', emerging: 'leest korte woorden (boot, goud) maar hapert bij samengestelde piratenwoorden', proficient: 'leest en schrijft acht tot tien piratenwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle piratenwoorden en schrijft een piratendagboek met correcte zinnen' },
    ],
  },

  robots: {
    seoTitle: 'Robots-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare robots-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'robots groep 3, robots oefeningen 6\u20137 jaar, robots oefeningen groep 3, robots uitprintbaar groep 3, robots werkbladen groep 3, robots activiteiten groep 3, robots leerbladen 6\u20137 jaar, robots gratis groep 3, robots PDF groep 3, robots rekenen groep 3',
    snippetAnswer: 'Robots-oefeningen voor groep 3 (6\u20137 jaar) gebruiken robotcontexten voor optellen en aftrekken tot 20, redactiesommen over robotonderdelen, robotwoorden lezen en schrijven en logisch denken met instructiereeksen. Kinderen rekenen met tandwielen, schroeven en robots. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het robotthema een unieke verbinding tussen rekenen, taal en computational thinking: zes- en zevenjarigen zijn gefascineerd door robots en die fascinatie kan worden ingezet voor logisch denken. De SLO-leerlijnen benadrukken logisch redeneren en stapsgewijs denken als kerndoelen, en robots functioneren via instructiereeksen: stap 1, stap 2, stap 3 \u2014 precies het soort sequenti\u00eble logica dat kinderen nodig hebben voor rekenen en schrijven. Redactiesommen over robots \u2014 een robot heeft 4 tandwielen per arm en 2 armen, hoeveel tandwielen in totaal? \u2014 combineren herhaald optellen met technisch vocabulaire. Robotwoorden als tandwiel, sensor en afstandsbediening zijn uitdagend decodeermateriaal. Het schrijven van een robot-instructie oefent instructief schrijven: een reeks stappen in de juiste volgorde. Symmetrie in robotontwerpen biedt een meetkundige ingang.',
    developmentalMilestones: [
      { milestone: 'Logisch denken met instructiereeksen (6\u20137-jarigen volgen en bedenken stapsgewijze instructies)', howWeAddress: 'Robot-instructieactiviteiten waarbij kinderen stapsgewijze opdrachten volgen en schrijven oefenen sequenti\u00eble logica als basis voor programmeerdenken' },
      { milestone: 'Herhaald optellen met robotonderdelen (tandwielen, schroeven, sensoren per robot)', howWeAddress: 'Rekenactiviteiten waarbij kinderen onderdelen per robot tellen en de totalen voor meerdere robots berekenen' },
      { milestone: 'Robotwoorden decoderen en schrijven (technisch vocabulaire)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met robotwoorden oefenen het decoderen van technische woorden als tandwiel en afstandsbediening' },
      { milestone: 'Instructief schrijven (een robot-instructie opstellen in stappen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een reeks instructies voor een robot schrijven oefenen instructief taalgebruik met signaalwoorden' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk instructiereeksen tot drie stappen, bied robotwoorden aan met plaatjes en een woordenbank, en gebruik sommen tot 10. Voor gevorderde kinderen: introduceer instructiereeksen met vertakkingen (als... dan...), laat hen sommen tot 20 met robotonderdelen berekenen, en daag hen uit met het schrijven van een compleet robotprogramma in stappen.',
    parentTakeaway: 'Robots maken logisch denken leuk in groep 3. Speel samen een robotspel: uw kind geeft instructies en u voert ze letterlijk uit (stap vooruit, draai rechts, pak op) \u2014 kinderen leren dat instructies precies moeten zijn. Tel robotonderdelen op een tekening: hoeveel schroeven, hoeveel tandwielen, hoeveel bij elkaar? Na een robotwerkblad kunt u samen een robot-instructie schrijven voor een dagelijkse taak: stap 1, stap 2, stap 3.',
    classroomIntegration: 'Het robotthema integreert in groep 3 met rekenen (sommen met onderdelen, herhaald optellen), taal (robotwoorden lezen, instructies schrijven), techniek (eenvoudig programmeren, constructie) en logisch denken (instructiereeksen, oorzaak en gevolg). Een robotproject met werkbladen en een programmeeractiviteit (bijv. Bee-Bot) combineert alle vakken, in lijn met de SLO-doelen voor rekenen, taal en digitale geletterdheid.',
    assessmentRubric: [
      { skill: 'Instructiereeksen volgen en schrijven', emerging: 'volgt een reeks van drie stappen met hulp maar schrijft niet zelfstandig', proficient: 'volgt en schrijft zelfstandig een instructiereeks van vijf stappen in de juiste volgorde', advanced: 'schrijft complexe instructies met vertakkingen en controleert of de reeks logisch klopt' },
      { skill: 'Robotrekensommen', emerging: 'telt onderdelen van \u00e9\u00e9n robot maar combineert niet zelfstandig meerdere robots', proficient: 'berekent totalen voor meerdere robots door herhaald optellen tot 20', advanced: 'lost meerstaps-sommen op en formuleert eigen robotrekenvragen' },
      { skill: 'Robotwoorden lezen en schrijven', emerging: 'leest korte woorden (robot, arm) maar hapert bij technische samenstellingen', proficient: 'leest en schrijft acht tot tien robotwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle robotwoorden en schrijft een robot-instructie met correcte technische termen' },
    ],
  },

  school: {
    seoTitle: 'School-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare school-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'school groep 3, school oefeningen 6\u20137 jaar, school oefeningen groep 3, school uitprintbaar groep 3, school werkbladen groep 3, school activiteiten groep 3, school leerbladen 6\u20137 jaar, school gratis groep 3, school PDF groep 3, school rekenen groep 3',
    snippetAnswer: 'School-oefeningen voor groep 3 (6\u20137 jaar) gebruiken schoolcontexten voor optellen en aftrekken tot 20, redactiesommen over schoolmateriaal en leerlingen, schoolwoorden lezen en schrijven en roosterlezen. Kinderen rekenen met potloden, boeken en klasgenoten. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het schoolthema de meest directe context voor formeel leren: zes- en zevenjarigen brengen de meeste tijd door op school en die vertrouwdheid maakt het thema bijzonder toegankelijk. De SLO-leerlijnen benadrukken tijdsindeling en rekenen in de schoolcontext, en het schoolthema biedt beide. Roosterlezen \u2014 welk vak hebben we om 10 uur, hoeveel minuten duurt de pauze? \u2014 oefent klok- en kalendervaardigheden. Redactiesommen over schoolmateriaal \u2014 er liggen 18 potloden in de la, 7 worden uitgedeeld, hoeveel zijn er over? \u2014 zijn herkenbaar en motiverend. Schoolwoorden als schriften, liniaal en puntenslijper zijn functioneel decodeermateriaal dat kinderen dagelijks gebruiken. Het schrijven van een schooldagboek oefent verhalend schrijven over persoonlijke ervaringen. Het schoolthema biedt een meta-leerervaring: leren over leren.',
    developmentalMilestones: [
      { milestone: 'Rooster lezen en tijdsindeling (6\u20137-jarigen lezen een dagprogramma en berekenen tijdsduur)', howWeAddress: 'Roosteractiviteiten waarbij kinderen het dagprogramma lezen en berekenen hoe lang elk blok duurt oefenen klok- en planningsvaardigheden' },
      { milestone: 'Redactiesommen met schoolmateriaal (kinderen rekenen met potloden, boeken, schriften)', howWeAddress: 'Schoolverhalen met optel- en aftreksituaties oefenen rekenen in de meest vertrouwde context van het kind' },
      { milestone: 'Schoolwoorden decoderen en schrijven (functioneel vocabulaire)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met schoolwoorden oefenen het decoderen van dagelijkse woorden als schriften en puntenslijper' },
      { milestone: 'Verhalend schrijven over de schooldag (een dagboek of weekverslag)', howWeAddress: 'Schrijfopdrachten waarbij kinderen over hun schooldag schrijven oefenen verhalend schrijven met chronologie en persoonlijke reflectie' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied schoolwoorden aan met plaatjes en een woordenbank, en gebruik een visueel dagprogramma met pictogrammen. Voor gevorderde kinderen: introduceer sommen tot 20 met tijdsberekeningen, laat hen een uitgebreid weekverslag schrijven, en daag hen uit met het ontwerpen van een eigen lesrooster met tijden en vakken.',
    parentTakeaway: 'School is de meest herkenbare rekencontext in groep 3. Vraag na schooltijd: hoeveel kinderen waren er vandaag in de klas, hoeveel waren er ziek, hoeveel verschil? Tel samen de potloden in de etui en reken: als je er 3 uitleent, hoeveel heb je nog? Na een schoolwerkblad kunt u samen een dagboek bijhouden over de schoolweek: wat leerde je bij rekenen, wat bij taal?',
    classroomIntegration: 'Het schoolthema is in groep 3 een meta-leerervaring: bij rekenen worden schoolmaterialen geteld en het rooster berekend, bij taal worden schoolwoorden gelezen en een schooldagboek geschreven, bij sociaal-emotioneel leren wordt gereflecteerd op het eigen leren. Werkbladen sluiten direct aan bij de dagelijkse schoolpraktijk, in lijn met de SLO-doelen voor rekenen, taal en burgerschapsonderwijs.',
    assessmentRubric: [
      { skill: 'Rooster lezen', emerging: 'herkent vakken op het rooster maar berekent niet zelfstandig de tijdsduur', proficient: 'leest zelfstandig een dagprogramma en berekent hoe lang elk blok duurt', advanced: 'ontwerpt een eigen rooster met tijden en berekent de totale lestijd per dag' },
      { skill: 'Schoolredactiesommen', emerging: 'leest het verhaal maar stelt de som niet zelfstandig op', proficient: 'vertaalt schoolverhalen correct naar sommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op en bedenkt eigen schoolredactiesommen' },
      { skill: 'Schoolwoorden lezen en schrijven', emerging: 'leest korte schoolwoorden (pen, boek) maar hapert bij langere woorden', proficient: 'leest en schrijft acht tot tien schoolwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle schoolwoorden en schrijft een schooldagboek met correcte zinnen' },
    ],
  },

  seasons: {
    seoTitle: 'Seizoenen-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare seizoenen-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'seizoenen groep 3, seizoenen oefeningen 6\u20137 jaar, seizoenen oefeningen groep 3, seizoenen uitprintbaar groep 3, seizoenen werkbladen groep 3, seizoenen activiteiten groep 3, seizoenen leerbladen 6\u20137 jaar, seizoenen gratis groep 3, seizoenen PDF groep 3, seizoenen rekenen groep 3',
    snippetAnswer: 'Seizoenen-oefeningen voor groep 3 (6\u20137 jaar) gebruiken seizoenscontexten voor optellen en aftrekken tot 20, redactiesommen over weerveranderingen, seizoenswoorden lezen en schrijven en gegevensregistratie van temperaturen. Kinderen rekenen met seizoenen, maanden en weerverschijnselen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het seizoenenthema een langlopende context voor kalendervaardigheden en gegevensverwerking: zes- en zevenjarigen ervaren de seizoenswisseling bewust en kunnen die ervaring koppelen aan meten en registreren. De SLO-leerlijnen benadrukken kalendervaardigheden en gegevensverwerking als kerndoelen, en de seizoenen bieden een jaarrond thema. Hoeveel maanden heeft de winter, hoeveel weken de herfst? Dit oefent tijdsrekenen. Temperatuurregistratie per maand bouwt gegevensvaardigheden op. Redactiesommen over seizoenen \u2014 in de herfst vallen 15 bladeren, de wind blaast er 7 weg, hoeveel liggen er nog? \u2014 verbinden rekenen met natuurobservatie. Seizoenswoorden als voorjaarsbloem, herfstkleuren en winterjas zijn motiverend decodeermateriaal. Het schrijven van een seizoensdagboek met observaties oefent informatief schrijven over een langere periode.',
    developmentalMilestones: [
      { milestone: 'Kalendervaardigheden (6\u20137-jarigen berekenen maanden en weken per seizoen)', howWeAddress: 'Kalenderactiviteiten waarbij kinderen maanden toewijzen aan seizoenen en weken tellen oefenen tijdsrekenen en kalenderkennis' },
      { milestone: 'Gegevensregistratie over seizoenen (temperatuur en weer per maand bijhouden)', howWeAddress: 'Registratieactiviteiten waarbij kinderen maandelijks weer en temperatuur noteren en vergelijken bouwen gegevensvaardigheden op' },
      { milestone: 'Seizoenswoorden decoderen en schrijven (samengestelde woorden per seizoen)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met seizoenswoorden oefenen het decoderen van samenstellingen als voorjaarsbloem en herfstkleuren' },
      { milestone: 'Informatief schrijven over seizoensveranderingen (observaties over langere tijd)', howWeAddress: 'Seizoensdagboek-opdrachten waarbij kinderen veranderingen per seizoen beschrijven oefenen informatief schrijven met vergelijkingen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot twee seizoenen tegelijk, bied seizoenswoorden aan met plaatjes en een woordenbank, en gebruik eenvoudige weersymbolen op een maandkalender. Voor gevorderde kinderen: laat hen alle vier seizoenen vergelijken in een tabel, introduceer temperatuurgrafieken, en daag hen uit met een uitgebreid seizoensdagboek met conclusies.',
    parentTakeaway: 'De seizoenen bieden een jaarrond rekenles in groep 3. Houd samen een seizoensdagboek bij: hoe ziet het er buiten uit in de lente versus de herfst? Meet de temperatuur elke week en vergelijk: hoeveel graden warmer dan vorige maand? Tel de maanden tot het volgende seizoen: als het nu november is, hoeveel maanden tot de lente? Na een seizoenwerkblad kunt u samen bladeren verzamelen en sorteren op kleur en grootte.',
    classroomIntegration: 'Het seizoenenthema integreert in groep 3 met rekenen (kalendervaardigheden, temperatuurregistratie, sommen per seizoen), taal (seizoenswoorden lezen, een seizoensdagboek schrijven), natuur (weerpatronen, planten en dieren per seizoen) en beeldende vorming (seizoenstekeningen). Een jaarrond seizoenproject met maandelijkse werkbladen en observaties combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Kalendervaardigheden bij seizoenen', emerging: 'benoemt de seizoenen maar berekent niet zelfstandig het aantal maanden per seizoen', proficient: 'wijst maanden toe aan seizoenen en berekent weken en maanden correct', advanced: 'berekent periodes tussen seizoenen, vergelijkt de lengte van seizoenen en trekt conclusies' },
      { skill: 'Gegevensregistratie', emerging: 'vult een weertabel in met hulp maar vergelijkt gegevens niet zelfstandig', proficient: 'registreert maandelijks weergegevens correct en vergelijkt twee maanden', advanced: 'maakt een jaargrafiek van temperaturen, berekent gemiddelden en beschrijft trends' },
      { skill: 'Seizoenswoorden lezen en schrijven', emerging: 'leest korte woorden (zon, ijs) maar hapert bij samengestelde seizoenswoorden', proficient: 'leest en schrijft acht tot tien seizoenswoorden correct inclusief samenstellingen', advanced: 'leest vlot alle seizoenswoorden en schrijft informatieve seizoensbeschrijvingen' },
    ],
  },

  shapes: {
    seoTitle: 'Vormen-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare vormen-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vormen groep 3, vormen oefeningen 6\u20137 jaar, vormen oefeningen groep 3, vormen uitprintbaar groep 3, vormen werkbladen groep 3, vormen activiteiten groep 3, vormen leerbladen 6\u20137 jaar, vormen gratis groep 3, vormen PDF groep 3, vormen rekenen groep 3',
    snippetAnswer: 'Vormen-oefeningen voor groep 3 (6\u20137 jaar) bieden gerichte oefening in vormherkenning, hoeken tellen, zijden tellen, symmetrie en ruimtelijke ori\u00ebntatie. Kinderen leren driehoeken, vierkanten en zeshoeken benoemen, vergelijken en tekenen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het vormenthema wiskundig formeler: zes- en zevenjarigen herkennen de basisvormen en zijn klaar om eigenschappen te analyseren. De SLO-leerlijnen benadrukken meetkunde als kerndoel, met nadruk op het benoemen, vergelijken en classificeren van vormen op basis van eigenschappen. Hoeveel zijden heeft een zeshoek, hoeveel hoeken een vijfhoek? Dit type telvraag verbindt meetkunde met rekenen. Symmetrie wordt formeler: kinderen vinden de spiegellijn in regelmatige vormen en voltooien symmetrische figuren. De getallenlijn wordt uitgebreid naar het meetkundige vlak: positie op een raster met co\u00f6rdinaten. Vormwoorden als driehoek, rechthoek en zeshoek oefenen samengestelde woorden die wiskundige taal opbouwen. Het schrijven van vormbeschrijvingen \u2014 deze vorm heeft vier gelijke zijden en vier rechte hoeken \u2014 oefent informatief schrijven met wiskundige precisie.',
    developmentalMilestones: [
      { milestone: 'Vormeigenschappen analyseren (6\u20137-jarigen tellen zijden en hoeken)', howWeAddress: 'Vormactiviteiten waarbij kinderen zijden en hoeken tellen en vormen op basis hiervan classificeren bouwen wiskundig vormdenken op' },
      { milestone: 'Symmetrie in vormen herkennen en toepassen (spiegellijn vinden en figuren voltooien)', howWeAddress: 'Symmetrieactiviteiten met regelmatige vormen laten kinderen de spiegellijn vinden en ontbrekende helften tekenen' },
      { milestone: 'Positie op een raster (eenvoudige co\u00f6rdinaten lezen en tekenen)', howWeAddress: 'Rasteractiviteiten waarbij kinderen vormen op een co\u00f6rdinatenraster plaatsen oefenen ruimtelijke ori\u00ebntatie en co\u00f6rdinaatlezen' },
      { milestone: 'Wiskundige taal voor vormen (vormbeschrijvingen schrijven met precisie)', howWeAddress: 'Schrijfopdrachten waarbij kinderen vormen beschrijven met zijden, hoeken en symmetrie oefenen wiskundig taalgebruik' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot driehoek, vierkant en cirkel, bied vormen aan met grote voorbeelden om na te trekken, en gebruik symmetrieactiviteiten met een duidelijke hulplijn. Voor gevorderde kinderen: introduceer vijfhoek, zeshoek en ruit, laat hen vormen tekenen op een co\u00f6rdinatenraster, en daag hen uit met een uitgebreide vormbeschrijving inclusief symmetrie-eigenschappen.',
    parentTakeaway: 'Vormen zijn overal en bieden meetkundekansen in groep 3. Zoek samen vormen in huis: het raam is een rechthoek, het bord een cirkel \u2014 hoeveel zijden, hoeveel hoeken? Teken samen vormen en zoek de spiegellijn. Na een vormenwerkblad kunt u samen een vormenzoektocht doen in de buurt: welke vormen zie je aan gebouwen, verkeersborden, speeltoestellen? Tellen, benoemen en opschrijven.',
    classroomIntegration: 'Het vormenthema is in groep 3 de kern van het meetkundeonderwijs: vormeigenschappen worden geanalyseerd bij rekenen, symmetrieactiviteiten ondersteunen beeldende vorming, rasterco\u00f6rdinaten bouwen aardrijkskundevaardigheden op, en vormbeschrijvingen oefenen wiskundig taalgebruik bij taal. Werkbladen sluiten direct aan bij de SLO-kerndoelen voor meetkunde en ruimtelijke ori\u00ebntatie.',
    assessmentRubric: [
      { skill: 'Vormeigenschappen analyseren', emerging: 'benoemt basisvormen maar telt zijden en hoeken niet zelfstandig', proficient: 'telt zijden en hoeken correct en classificeert vormen op basis van deze eigenschappen', advanced: 'vergelijkt vormen op meerdere eigenschappen en beschrijft de overeenkomsten en verschillen schriftelijk' },
      { skill: 'Symmetrie in vormen', emerging: 'herkent symmetrie in eenvoudige vormen met hulp maar tekent de spiegelhelft niet nauwkeurig', proficient: 'vindt zelfstandig de spiegellijn in regelmatige vormen en voltooit symmetrische figuren', advanced: 'ontwerpt eigen symmetrische figuren en beschrijft de symmetrie-eigenschappen' },
      { skill: 'Vormwoorden en -beschrijvingen', emerging: 'benoemt basisvormen (driehoek, cirkel) maar schrijft geen beschrijvingen', proficient: 'schrijft korte vormbeschrijvingen met zijden, hoeken en symmetrie-informatie', advanced: 'schrijft uitgebreide wiskundige beschrijvingen en vergelijkt vormen schriftelijk' },
    ],
  },

  space: {
    seoTitle: 'Ruimte-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare ruimte-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'ruimte groep 3, ruimte oefeningen 6\u20137 jaar, ruimte oefeningen groep 3, ruimte uitprintbaar groep 3, ruimte werkbladen groep 3, ruimte activiteiten groep 3, ruimte leerbladen 6\u20137 jaar, ruimte gratis groep 3, ruimte PDF groep 3, ruimte rekenen groep 3',
    snippetAnswer: 'Ruimte-oefeningen voor groep 3 (6\u20137 jaar) gebruiken ruimtevaartcontexten voor optellen en aftrekken tot 20, redactiesommen over planeten en sterren, ruimtewoorden lezen en schrijven en vergelijken van afstanden en groottes. Kinderen rekenen met raketten, planeten en astronauten. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het ruimtethema een inspirerende context die de motivatie voor rekenen en lezen naar grote hoogten tilt: zes- en zevenjarigen zijn gefascineerd door planeten, raketten en astronauten en die fascinatie kan productief worden ingezet. De SLO-leerlijnen benadrukken vergelijken en ordenen als kerndoelen, en de ruimte biedt extreme schaalverschillen: de aarde is kleiner dan Jupiter maar groter dan Mars \u2014 ordenen op grootte oefent vergelijkend denken. Redactiesommen over de ruimte \u2014 er zijn 8 planeten in ons zonnestelsel, je hebt er al 5 geleerd, hoeveel nog? \u2014 oefenen aftrekken met fascinerende feiten. Ruimtewoorden als astronaut, zonnestelsel en ruimtestation zijn motiverend decodeermateriaal met lange samenstellingen. Het schrijven van een ruimtedagboek vanuit een astronaut oefent creatief en informatief schrijven. De countdown (10, 9, 8, ... 0, lancering!) is een natuurlijke oefening voor terugtellen.',
    developmentalMilestones: [
      { milestone: 'Vergelijken en ordenen op grootte (6\u20137-jarigen ordenen planeten van klein naar groot)', howWeAddress: 'Planetenvergelijkingsactiviteiten waarbij kinderen planeten ordenen op grootte en de volgorde noteren oefenen vergelijkend denken' },
      { milestone: 'Terugtellen en aftrekken (countdown als aftrekoefening)', howWeAddress: 'Countdownactiviteiten waarbij kinderen van 20 naar 0 terugtellen oefenen aftrekken als achterwaarts tellen in een spannende context' },
      { milestone: 'Ruimtewoorden decoderen en schrijven (lange samengestelde woorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met ruimtewoorden oefenen het decoderen van samenstellingen als zonnestelsel en ruimtestation' },
      { milestone: 'Creatief en informatief schrijven (een ruimtedagboek vanuit een astronaut)', howWeAddress: 'Schrijfopdrachten waarbij kinderen vanuit een astronaut schrijven combineren creatief verbeelden met informatieve feitjes over de ruimte' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot de zon, aarde en maan als vergelijkingsobjecten, bied ruimtewoorden aan met plaatjes en een woordenbank, en oefen countdown van 10 naar 0. Voor gevorderde kinderen: introduceer alle acht planeten met ordening op grootte en afstand, laat hen sommen tot 20 met planeetfeitjes berekenen, en daag hen uit met een uitgebreid ruimtedagboek met feitjes en tekeningen.',
    parentTakeaway: 'De ruimte maakt rekenen magisch in groep 3. Tel samen af als een raketlancering: 10, 9, 8, ... hoeveel stappen tot 0? Bekijk samen een plaat van het zonnestelsel en ordenen de planeten van klein naar groot. Hoeveel planeten zijn er en hoeveel heb je al geleerd, hoeveel nog? Na een ruimtewerkblad kunt u samen een ruimtedagboek schrijven: als jij een astronaut was, wat zou je zien, hoeveel sterren zou je tellen?',
    classroomIntegration: 'Het ruimtethema integreert in groep 3 met rekenen (vergelijken, ordenen, countdown-aftrekken, sommen met planeten), taal (ruimtewoorden lezen, een ruimtedagboek schrijven), natuur (het zonnestelsel, dag en nacht, seizoenen door de aardas) en beeldende vorming (planeten en raketten tekenen). Een ruimteproject met werkbladen, een planetenwandkaart en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Planeten vergelijken en ordenen', emerging: 'vergelijkt twee planeten (groter/kleiner) maar ordent niet zelfstandig alle acht', proficient: 'ordent zelfstandig de planeten op grootte en benoemt de volgorde correct', advanced: 'ordent op grootte en afstand, beschrijft de verschillen en registreert de gegevens in een tabel' },
      { skill: 'Countdown en aftrekken', emerging: 'telt terug van 10 met hulp maar hapert bij langere countdowns', proficient: 'telt vlot terug van 20 naar 0 en vertaalt countdowns naar aftreksommen', advanced: 'gebruikt countdown als strategie bij complexe aftreksommen en past de methode flexibel toe' },
      { skill: 'Ruimtewoorden lezen en schrijven', emerging: 'leest korte woorden (ster, maan) maar hapert bij lange samenstellingen', proficient: 'leest en schrijft acht tot tien ruimtewoorden correct inclusief samenstellingen', advanced: 'leest vlot alle ruimtewoorden en schrijft een creatief ruimtedagboek met correcte zinnen' },
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
