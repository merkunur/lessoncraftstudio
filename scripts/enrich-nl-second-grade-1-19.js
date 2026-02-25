#!/usr/bin/env node
/**
 * SEO Part 327: NL Second-Grade Enrichment — Themes 1-19
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the second-grade grade block of 19 NL theme files (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    seoTitle: 'Alfabet-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare alfabet-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'alfabet groep 4, alfabet oefeningen 7\u20138 jaar, alfabet oefeningen groep 4, alfabet uitprintbaar groep 4, alfabet werkbladen groep 4, alfabet activiteiten groep 4, alfabet leerbladen 7\u20138 jaar, alfabet gratis groep 4, alfabet PDF groep 4, alfabet rekenen groep 4',
    snippetAnswer: 'Alfabet-oefeningen voor groep 4 (7\u20138 jaar) verdiepen taalvaardigheid met gevorderd decoderen van meerlettergrepige woorden, spellingpatronen met voor- en achtervoegsels, woordenboekvaardigheden en alinea-schrijven. Kinderen analyseren woordstructuur, zoeken woorden op en schrijven samenhangende teksten. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 is het alfabet getransformeerd van een herkennings- en decodeervaardigheid naar een gereedschap voor woordanalyse en naslagwerk: zeven- en achtjarigen hebben automatische letterherkenning en basisdecodering bereikt en zijn klaar om de diepere structuur van woorden te verkennen. De SLO-leerlijnen benadrukken dat groep 4 de overgang markeert van leren lezen naar lezen om te leren, en alfabetwerkbladen ondersteunen beide kanten. Woordpuzzel-werkbladen met meerlettergrepige woorden oefenen het herkennen van lettergrepen, klinkerpatronen en morfologische structuur. Kruiswoordpuzzels vereisen gevorderde fonemische analyse waarbij kinderen complexe woorden in lettergrepen opdelen en de juiste spelling per klank selecteren. Het werken met voor- en achtervoegsels onthult dat taal een regelgestuurd systeem is: wie on-, her- en -baar begrijpt, ontsluit honderden woorden. Woordenboekvaardigheden met gidswoorden en ordening op tweede en derde letter maken kinderen zelfstandige woordonderzoekers. Schrijfopdrachten verschuiven van losse zinnen naar georganiseerde alinea\u2019s met topiczinnen en ondersteunende details, waarmee de spellingkennis in betekenisvolle contexten wordt toegepast.',
    developmentalMilestones: [
      { milestone: 'Meerlettergrepige woorden decoderen (7\u20138-jarigen herkennen lettergrepen en klinkerpatronen)', howWeAddress: 'Woordpuzzel- en kruiswoordactiviteiten met langere woorden vereisen dat kinderen lettergrepen identificeren en klankregels toepassen bij het samenstellen van woorden' },
      { milestone: 'Morfologisch bewustzijn ontwikkelen (voor- en achtervoegsels herkennen als betekenisdragende eenheden)', howWeAddress: 'Woordbouw-activiteiten waarbij kinderen woorden ontleden in voorvoegsel, stam en achtervoegsel maken de regelmatigheid van het spellingsysteem zichtbaar' },
      { milestone: 'Woordenboekvaardigheden opbouwen (ordenen op tweede en derde letter, gidswoorden gebruiken)', howWeAddress: 'Alfabettrein-activiteiten op woordniveau oefenen ordening op tweede en derde letter als voorbereiding op zelfstandig opzoeken in naslagwerken' },
      { milestone: 'Alinea-schrijven met spellingbewustzijn (georganiseerde teksten met topiczinnen en details)', howWeAddress: 'Schrijfopdrachten die kinderen uitdagen korte alinea\u2019s te schrijven met correcte spelling en structuur passen woordkennis toe in uitgebreide teksten' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: bied woordpuzzels aan met een woordenbank en maximaal zes letters, richt kruiswoorden op tweelettergrepige woorden en gebruik een vereenvoudigd woordenboek met plaatjes. Voor gevorderde kinderen: introduceer woordpuzzels zonder woordenbank met acht- en negenletter-woorden, laat hen woorden analyseren op voorvoegsel-stam-achtervoegsel en daag hen uit met een woordfamilie-onderzoek waarbij zij verwante woorden in een woordweb plaatsen.',
    parentTakeaway: 'In groep 4 wordt het alfabet een onderzoeksinstrument. Laat uw kind thuis een woord opzoeken in een echt woordenboek: welke gidswoorden staan bovenaan de pagina, op welke letter moet je zoeken? Speel samen het woordontleedspel: neem een lang woord als on-geloof-lijk en ontdek samen de onderdelen. Na een alfabetwerkblad kunt u uw kind vragen een alinea te schrijven over een onderwerp naar keuze, zodat spelling en schrijven samenkomen in betekenisvol taalgebruik.',
    classroomIntegration: 'Het alfabetthema integreert in groep 4 met taal (spellingpatronen, woordenboekvaardigheden, alinea-schrijven), rekenen (logisch ordenen, patronen herkennen), natuur en techniek (vakoverstijgende woordenschat opzoeken) en burgerschap (zelfstandig informatie verwerven). Een woordonderzoeksweek met werkbladen, een woordenboekrace en een schrijfproject combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Meerlettergrepige woorden decoderen', emerging: 'decodeert tweelettergrepige woorden maar hapert bij langere woorden met complexe klinkerpatronen', proficient: 'decodeert zelfstandig woorden tot vier lettergrepen door klanken en patronen toe te passen', advanced: 'decodeert vlot complexe woorden, herkent voor- en achtervoegsels en leidt woordbetekenis af uit de structuur' },
      { skill: 'Woordenboekvaardigheden', emerging: 'vindt woorden op beginletter maar heeft moeite met ordening op tweede letter', proficient: 'zoekt zelfstandig woorden op via tweede en derde letter en gebruikt gidswoorden', advanced: 'navigeert vlot in woordenboeken, interpreteert meerdere definities en past het juiste gebruik toe in zinnen' },
      { skill: 'Alinea-schrijven', emerging: 'schrijft losse zinnen maar organiseert ze niet tot een samenhangende alinea', proficient: 'schrijft een alinea met een topiczin, ondersteunende details en correcte spelling', advanced: 'schrijft meerdere samenhangende alinea\u2019s met gevarieerde zinsstructuur en correcte spelling van meerlettergrepige woorden' },
    ],
  },

  animals: {
    seoTitle: 'Dieren-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare dieren-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dieren groep 4, dieren oefeningen 7\u20138 jaar, dieren oefeningen groep 4, dieren uitprintbaar groep 4, dieren werkbladen groep 4, dieren activiteiten groep 4, dieren leerbladen 7\u20138 jaar, dieren gratis groep 4, dieren PDF groep 4, dieren rekenen groep 4',
    snippetAnswer: 'Dieren-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met dierenwetenschappen: vermenigvuldigen met diergroepen, redactiesommen over leefgebieden, tabellen met diergegevens lezen, informatieve teksten over dieren schrijven en meten in standaardeenheden. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het dierenthema een krachtige context voor dataverwerking en informatief schrijven: zeven- en achtjarigen zijn gefascineerd door dierfeiten en die nieuwsgierigheid kan worden ingezet voor formeel rekenen en wetenschappelijk denken. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, meten en informatief schrijven als kerndoelen, en dieren bieden ideale contexten. Vermenigvuldigsommen met diergroepen \u2014 een spin heeft 8 poten, hoeveel poten hebben 6 spinnen? \u2014 maken de tafels concreet. Redactiesommen met meerdere stappen over dierentelling in leefgebieden oefenen het vertalen van complexe situaties naar berekeningen. Tabellen met diergegevens \u2014 snelheid, gewicht, levensduur \u2014 introduceren gegevensanalyse met betekenisvol materiaal. Meten in standaardeenheden wordt relevant wanneer kinderen dierformaten vergelijken: een giraf is 5 meter, een olifant weegt 6000 kilogram. Het schrijven van een informatief dierverslag met inleiding, kern en slot oefent gestructureerd schrijven met feitelijke onderbouwing.',
    developmentalMilestones: [
      { milestone: 'Vermenigvuldigen met diergroepen (7\u20138-jarigen gebruiken de tafels in diercontexten)', howWeAddress: 'Tafels-activiteiten met diergroepen waarbij kinderen poten, vleugels en eieren vermenigvuldigen maken abstracte tafels concreet en memorabel' },
      { milestone: 'Redactiesommen met meerdere stappen over dieren (complexe situaties vertalen naar berekeningen)', howWeAddress: 'Meerstapsverhalen over diertellingen in leefgebieden vereisen dat kinderen informatie selecteren, de juiste bewerkingen kiezen en stap voor stap uitrekenen' },
      { milestone: 'Tabellen met diergegevens lezen en interpreteren (snelheid, gewicht, levensduur)', howWeAddress: 'Tabelactiviteiten waarbij kinderen diergegevens aflezen, vergelijken en vragen beantwoorden bouwen datageletterdheid op in een fascinerende context' },
      { milestone: 'Informatief dierverslag schrijven (inleiding, kern, slot met feitelijke onderbouwing)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een gestructureerd dierverslag opstellen met feiten, kopjes en een slotzin oefenen informatief schrijven op alinea-niveau' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vermenigvuldiging tot de tafels van 2 en 5 met dierplaatjes, bied redactiesommen aan met \u00e9\u00e9n stap en een rekenmodel, en laat tabellen met drie rijen aflezen. Voor gevorderde kinderen: introduceer tafels tot 10 met complexe diersommen, laat hen meerstaps-redactiesommen ontwerpen voor klasgenoten en daag hen uit met een uitgebreid dierverslag inclusief tabel, grafiek en vergelijking.',
    parentTakeaway: 'Dieren maken rekenen fascinerend in groep 4. Zoek samen dierfeiten op: hoeveel poten hebben 7 spinnen bij elkaar? Als een cheeta 100 km/u rent en een haas 70, hoeveel sneller is de cheeta? Lees samen een tabel met diergegevens en stel vragen: welk dier leeft het langst, welk is het zwaarst? Na een dierenwerkblad kunt u samen een kort dierverslag schrijven \u2014 met een inleiding, drie interessante feiten en een slotzin.',
    classroomIntegration: 'Het dierenthema integreert in groep 4 met rekenen (vermenigvuldigen met diergroepen, redactiesommen, tabellen aflezen), taal (informatief schrijven, dierwoordenschat), natuur en techniek (leefgebieden, voedselketens, classificatie) en burgerschap (dierenwelzijn, natuurbehoud). Een dierenproject met werkbladen, een dierverslag en een grafiekactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vermenigvuldigen met diercontexten', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp van plaatjes maar past dit niet toe in nieuwe situaties', proficient: 'past de tafels van 1\u20135 zelfstandig toe in diersommen en noteert de berekening correct', advanced: 'vermenigvuldigt vlot met alle tafels, lost meerstaps-diersommen op en bedenkt eigen vermenigvuldigvragen' },
      { skill: 'Tabellen met diergegevens interpreteren', emerging: 'leest afzonderlijke waarden af maar vergelijkt niet zelfstandig', proficient: 'leest een tabel met vijf dieren af, vergelijkt waarden en beantwoordt vragen correct', advanced: 'analyseert tabellen, ordent dieren op een kenmerk en trekt conclusies over patronen' },
      { skill: 'Informatief dierverslag schrijven', emerging: 'schrijft losse feiten maar organiseert ze niet in alinea\u2019s', proficient: 'schrijft een gestructureerd verslag met inleiding, kern en slot en feitelijke onderbouwing', advanced: 'schrijft een uitgebreid verslag met kopjes, vergelijkingen en een tabel of grafiek' },
    ],
  },

  birds: {
    seoTitle: 'Vogels-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare vogels-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vogels groep 4, vogels oefeningen 7\u20138 jaar, vogels oefeningen groep 4, vogels uitprintbaar groep 4, vogels werkbladen groep 4, vogels activiteiten groep 4, vogels leerbladen 7\u20138 jaar, vogels gratis groep 4, vogels PDF groep 4, vogels rekenen groep 4',
    snippetAnswer: 'Vogels-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met vogelobservatie: vermenigvuldigen met zwermen, redactiesommen over nesten en eieren, tabellen met vogelgegevens, informatieve teksten over trekvogels en meten van vleugelspanwijdte. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het vogelthema een observatiecontext voor dataverwerking en meten: zeven- en achtjarigen kunnen systematisch vogeltellingen uitvoeren en de resultaten in tabellen en grafieken verwerken. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, gegevensverwerking en informatief schrijven als kerndoelen, en vogels bieden alle vier. Vermenigvuldigsommen met zwermen \u2014 er vliegen 4 groepen van 8 spreeuwen, hoeveel bij elkaar? \u2014 oefenen de tafels in een visuele context. Redactiesommen over nesten en eieren \u2014 een merel legt 4 eieren per nest en bouwt 2 nesten per jaar, hoeveel eieren in 3 jaar? \u2014 vereisen meerstapsberekeningen. Tabellen met vogelgegevens over vleugelspanwijdte, gewicht en trekafstand introduceren gegevensanalyse met werkelijke maten. Het meten van vleugelspanwijdte en nestgrootte in centimeters past meetvaardigheden toe met standaardeenheden. Het schrijven van een informatieve tekst over een trekvogel oefent gestructureerd schrijven met inleiding, feiten en conclusie.',
    developmentalMilestones: [
      { milestone: 'Vermenigvuldigen met vogelzwermen (7\u20138-jarigen berekenen aantallen in groepen)', howWeAddress: 'Zwerm-rekenactiviteiten waarbij kinderen groepen vogels vermenigvuldigen en het totaal berekenen maken de tafels visueel en concreet' },
      { milestone: 'Meerstaps-redactiesommen over vogelbiologie (nesten, eieren, broedseizoenen)', howWeAddress: 'Verhaalcontexten over voortplanting en nestbouw waarbij kinderen meerdere bewerkingen achtereenvolgens uitvoeren oefenen complex redeneren' },
      { milestone: 'Gegevenstabellen over vogels interpreteren (vleugelspanwijdte, trekafstand, gewicht)', howWeAddress: 'Tabelactiviteiten met werkelijke vogelgegevens bouwen datageletterdheid op terwijl kinderen feiten vergelijken en vragen beantwoorden' },
      { milestone: 'Informatief schrijven over een trekvogel (gestructureerde tekst met feiten)', howWeAddress: 'Schrijfopdrachten over trekvogels oefenen het organiseren van feitelijke informatie in alinea\u2019s met inleiding, kern en slot' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vermenigvuldiging tot de tafels van 2 en 5 met vogelplaatjes, bied redactiesommen aan met \u00e9\u00e9n stap en een visueel model, en laat tabellen met drie rijen aflezen. Voor gevorderde kinderen: introduceer tafels tot 10 met complexe zwermberekeningen, laat hen meerstaps-redactiesommen met drie bewerkingen oplossen en daag hen uit met een informatieve poster over een trekvogel inclusief kaart en gegevenstabel.',
    parentTakeaway: 'Vogels maken rekenen en schrijven levendig in groep 4. Ga samen naar buiten en tel vogels: hoeveel mussen, hoeveel merels, hoeveel bij elkaar? Als er 3 nesten zijn met elk 4 eieren, hoeveel eieren in totaal? Zoek samen vogelfeiten op in een vogelgids of online: hoe ver vliegt een zwaluw, hoe groot is zijn vleugelspanwijdte? Na een vogelwerkblad kunt u samen een kort verslag schrijven over een favoriete vogel met feiten en een tekening.',
    classroomIntegration: 'Het vogelthema integreert in groep 4 met rekenen (vermenigvuldigen met zwermen, tabellen aflezen, meten), taal (informatief schrijven, vogelwoordenschat), natuur en techniek (vogelbiologie, trek, leefgebieden) en beeldende vorming (vogelillustraties). Een vogelproject met werkbladen, een tuinvogeltelling en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vermenigvuldigen met vogelcontexten', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp maar past dit niet toe in nieuwe situaties', proficient: 'past de tafels van 1\u20135 zelfstandig toe in vogelsommen en noteert de berekening correct', advanced: 'vermenigvuldigt vlot met alle tafels, lost meerstaps-vogelsommen op en controleert het antwoord' },
      { skill: 'Vogelgegevenstabellen interpreteren', emerging: 'leest afzonderlijke waarden af maar vergelijkt niet zelfstandig', proficient: 'leest een tabel met vijf vogelsoorten af, vergelijkt waarden en beantwoordt vragen', advanced: 'analyseert tabellen, ordent vogels op een kenmerk en trekt conclusies over patronen' },
      { skill: 'Informatief schrijven over vogels', emerging: 'schrijft losse feiten maar organiseert ze niet in alinea\u2019s', proficient: 'schrijft een gestructureerde tekst over een vogel met inleiding, kern en slot', advanced: 'schrijft een uitgebreid vogelverslag met kopjes, vergelijkingen en een gegevenstabel' },
    ],
  },

  birthday: {
    seoTitle: 'Verjaardag-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare verjaardag-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'verjaardag groep 4, verjaardag oefeningen 7\u20138 jaar, verjaardag oefeningen groep 4, verjaardag uitprintbaar groep 4, verjaardag werkbladen groep 4, verjaardag activiteiten groep 4, verjaardag leerbladen 7\u20138 jaar, verjaardag gratis groep 4, verjaardag PDF groep 4, verjaardag rekenen groep 4',
    snippetAnswer: 'Verjaardag-oefeningen voor groep 4 (7\u20138 jaar) gebruiken feestcontexten voor rekenen tot 100: vermenigvuldigen van traktaties, budgetberekeningen voor een feestje, tijdberekeningen met kloklezen, uitnodigingen schrijven en tabellen met feestgegevens. Kinderen plannen een feestje met rekenen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het verjaardagsthema een rijke context voor budgetrekenen en tijdberekeningen: zeven- en achtjarigen organiseren hun eigen feestjes en die betrokkenheid maakt rekenen met geld en tijd bijzonder motiverend. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, kloklezen en functioneel schrijven als kerndoelen, en een verjaardagsfeestje biedt alle vier. Budgetberekeningen \u2014 15 uitnodigingen kosten 2 euro per stuk, hoeveel in totaal? \u2014 oefenen vermenigvuldigen met geld. Tijdberekeningen \u2014 het feestje begint om 14:00 en duurt 2,5 uur, hoe laat is het afgelopen? \u2014 oefenen kloklezen en optellen met tijd. Het vermenigvuldigen van traktaties per gast vereist het toepassen van de tafels in een functionele context. Het schrijven van een uitnodiging met datum, tijd, adres en activiteiten oefent functioneel schrijven met een echt communicatief doel. Tabellen met feestgegevens \u2014 kosten per onderdeel, aantal gasten per activiteit \u2014 bouwen datageletterdheid op in een feestelijke setting.',
    developmentalMilestones: [
      { milestone: 'Budgetberekeningen met vermenigvuldiging (7\u20138-jarigen rekenen met prijzen en aantallen)', howWeAddress: 'Feestbudget-activiteiten waarbij kinderen traktaties, versieringen en cadeautjes vermenigvuldigen en het totaal berekenen oefenen geldrekenen' },
      { milestone: 'Tijdberekeningen met kloklezen (begin- en eindtijd berekenen, duur bepalen)', howWeAddress: 'Feestplanning-activiteiten waarbij kinderen begin- en eindtijden berekenen en de duur in uren en minuten bepalen oefenen kloklezen' },
      { milestone: 'Tabellen met feestgegevens interpreteren (kosten, aantallen, activiteiten)', howWeAddress: 'Tabelactiviteiten met feestbudgetten en gastenaantallen bouwen datageletterdheid op terwijl kinderen feestdetails vergelijken en berekenen' },
      { milestone: 'Functioneel schrijven: uitnodiging en bedankkaart (datum, tijd, adres, boodschap)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een uitnodiging met alle benodigde informatie opstellen oefenen functioneel schrijven met een communicatief doel' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk budgetsommen tot optellen tot 50 met eenvoudige prijzen, bied een klokmodel aan bij tijdberekeningen en laat uitnodigingen schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer budgetten tot 100 euro met wisselgeld en vergelijking van opties, laat hen feestschema\u2019s plannen met kwartieren en daag hen uit met een compleet feestplan inclusief budget, tijdschema en uitnodiging.',
    parentTakeaway: 'Een verjaardag is de perfecte rekenkans in groep 4. Plan samen het feestje: hoeveel traktaties heb je nodig als er 12 kinderen komen en iedereen er 2 krijgt? Als de taart 8 euro kost en de versieringen 15 euro, hoeveel geef je uit? Laat uw kind de uitnodigingen schrijven met de juiste datum, tijd en adres. Na een verjaardagswerkblad kunt u samen het budget bijhouden \u2014 hoeveel is er al uitgegeven en hoeveel is er nog over?',
    classroomIntegration: 'Het verjaardagsthema integreert in groep 4 met rekenen (vermenigvuldigen met traktaties, budgetberekeningen, tijdrekenen), taal (uitnodigingen schrijven, feestverslagen), sociaal-emotioneel leren (gastvrijheid, delen, waarderen) en beeldende vorming (uitnodigingen ontwerpen). Een feestplanningsproject met werkbladen, een budgetopdracht en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Budgetberekeningen met vermenigvuldiging', emerging: 'vermenigvuldigt eenvoudige prijzen met hulp maar berekent het totaalbudget niet zelfstandig', proficient: 'berekent zelfstandig een feestbudget met vermenigvuldiging en optelling en noteert de berekening', advanced: 'vergelijkt meerdere budgetopties, berekent het verschil en kiest de voordeligste met onderbouwing' },
      { skill: 'Tijdberekeningen', emerging: 'leest hele uren op de klok maar berekent duur niet zelfstandig', proficient: 'berekent begin- en eindtijden en duur correct met halve en hele uren', advanced: 'plant een feestschema met kwartieren, berekent totale duur en past aan bij wijzigingen' },
      { skill: 'Functioneel schrijven: uitnodiging', emerging: 'schrijft een uitnodiging met hulp maar vergeet essenti\u00eble informatie', proficient: 'schrijft zelfstandig een uitnodiging met datum, tijd, adres en activiteiten', advanced: 'schrijft een aantrekkelijke uitnodiging met alle details, een persoonlijke boodschap en correcte spelling' },
    ],
  },

  body: {
    seoTitle: 'Lichaam-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare lichaam-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'lichaam groep 4, lichaam oefeningen 7\u20138 jaar, lichaam oefeningen groep 4, lichaam uitprintbaar groep 4, lichaam werkbladen groep 4, lichaam activiteiten groep 4, lichaam leerbladen 7\u20138 jaar, lichaam gratis groep 4, lichaam PDF groep 4, lichaam rekenen groep 4',
    snippetAnswer: 'Lichaam-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met het menselijk lichaam: meten van lichaamslengte en armspanwijdte, vermenigvuldigen met botaantallen, tabellen met lichaamsgegevens, redactiesommen over hartslag en informatieve teksten over organen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 biedt het lichaamsthema een fascinerend kader voor meten en dataverwerking: zeven- en achtjarigen zijn nieuwsgierig naar hoe hun lichaam werkt en die betrokkenheid maakt meetopdrachten en gegevensanalyse persoonlijk relevant. De SLO-leerlijnen benadrukken meten in standaardeenheden, vermenigvuldigen, gegevensverwerking en informatief schrijven als kerndoelen, en het lichaam biedt alle vier. Meetactiviteiten \u2014 lichaamslengte in centimeters, armspanwijdte, handlengte \u2014 oefenen het werken met standaardeenheden aan eigen lichaamsgegevens. Vermenigvuldigsommen met botaantallen \u2014 elke hand heeft 27 botten, hoeveel botten in 2 handen? \u2014 maken de tafels medisch fascinerend. Tabellen met lichaamsgegevens van de klas \u2014 lengte, gewicht, schoenmaat \u2014 introduceren gegevensanalyse met persoonlijke data. Redactiesommen over hartslag \u2014 je hart klopt 70 keer per minuut, hoeveel keer in 10 minuten? \u2014 vereisen vermenigvuldiging in een levensechte context. Het schrijven van een informatieve tekst over een orgaan oefent gestructureerd schrijven met wetenschappelijke inhoud.',
    developmentalMilestones: [
      { milestone: 'Meten van het eigen lichaam in standaardeenheden (7\u20138-jarigen meten lengte, spanwijdte en omtrek)', howWeAddress: 'Meetactiviteiten waarbij kinderen hun eigen lichaam meten en de resultaten in centimeters noteren bouwen meetvaardigheden op met persoonlijk relevante data' },
      { milestone: 'Vermenigvuldigen met lichaamsaantallen (botten, tanden, gewrichten per lichaamsdeel)', howWeAddress: 'Lichaamsrekensommen waarbij kinderen aantallen per lichaamsdeel vermenigvuldigen maken de tafels concreet en fascinerend' },
      { milestone: 'Klasgegevens in tabellen verwerken (lengte, gewicht, schoenmaat van klasgenoten)', howWeAddress: 'Data-activiteiten waarbij kinderen klassematen meten en de resultaten in een tabel zetten introduceren statistische basisconcepten' },
      { milestone: 'Informatief schrijven over een orgaan (gestructureerde tekst met wetenschappelijke feiten)', howWeAddress: 'Schrijfopdrachten over het hart, de longen of het skelet oefenen informatief schrijven met inleiding, feiten en een slotzin' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk meten tot lengte en handlengte met een meetlint, bied vermenigvuldigsommen aan met de tafels van 2 en 5 en lichaamsplaatjes, en schrijf over \u00e9\u00e9n orgaan met een invulsjabloon. Voor gevorderde kinderen: introduceer meten van omtrek en het berekenen van gemiddelden, laat hen meerstaps-hartslagsommen oplossen en daag hen uit met een uitgebreid verslag over het spijsverteringsstelsel inclusief een diagram.',
    parentTakeaway: 'Het lichaam biedt dagelijkse meetkansen in groep 4. Meet samen de lengte van uw kind: hoeveel centimeter, hoeveel gegroeid sinds vorig jaar? Vergelijk armspanwijdte met lichaamslengte: zijn ze gelijk? Tel samen de hartslag: hoeveel kloppen in 15 seconden, vermenigvuldig met 4 voor een minuut. Na een lichaamswerkblad kunt u samen een tekst schrijven over een favoriete lichaamsfeit \u2014 wist je dat je skelet uit 206 botten bestaat?',
    classroomIntegration: 'Het lichaamsthema integreert in groep 4 met rekenen (meten in standaardeenheden, vermenigvuldigen, tabellen en gemiddelden), taal (informatief schrijven, medische woordenschat), natuur en techniek (menselijk lichaam, organen, skelet) en bewegingsonderwijs (hartslag meten na inspanning). Een lichaamsproject met werkbladen, een klassemeting en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Meten in standaardeenheden', emerging: 'meet met een liniaal maar noteert niet altijd de juiste eenheid of waarde', proficient: 'meet zelfstandig in centimeters en kilogrammen en noteert de resultaten correct in een tabel', advanced: 'meet nauwkeurig, berekent het verschil tussen metingen en bepaalt het gemiddelde van drie metingen' },
      { skill: 'Vermenigvuldigen met lichaamsaantallen', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp maar past dit niet toe in nieuwe contexten', proficient: 'past de tafels van 1\u20135 zelfstandig toe in lichaamssommen en noteert de berekening correct', advanced: 'lost meerstaps-lichaamssommen op, combineert vermenigvuldiging met optelling en controleert het antwoord' },
      { skill: 'Informatief schrijven over het lichaam', emerging: 'schrijft losse feiten over een orgaan maar organiseert ze niet', proficient: 'schrijft een gestructureerde tekst met inleiding, feiten en slotzin', advanced: 'schrijft een uitgebreid verslag met kopjes, een diagram en vergelijking tussen organen' },
    ],
  },

  camping: {
    seoTitle: 'Kamperen-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kamperen-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kamperen groep 4, kamperen oefeningen 7\u20138 jaar, kamperen oefeningen groep 4, kamperen uitprintbaar groep 4, kamperen werkbladen groep 4, kamperen activiteiten groep 4, kamperen leerbladen 7\u20138 jaar, kamperen gratis groep 4, kamperen PDF groep 4, kamperen rekenen groep 4',
    snippetAnswer: 'Kamperen-oefeningen voor groep 4 (7\u20138 jaar) gebruiken buitencontexten voor rekenen tot 100: budgetberekeningen voor kampeerspullen, vermenigvuldigen van porties voor maaltijden, kaartlezen met afstanden, redactiesommen over kampeeractiviteiten en het schrijven van een kampeerdagboek. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het kampeerthema een praktische context voor budgetrekenen en kaartvaardigheden: zeven- en achtjarigen kennen de kampeerervaring en die vertrouwdheid maakt rekenen met afstanden, porties en kosten bijzonder motiverend. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, meten en informatief schrijven als kerndoelen, en kamperen biedt alle vier in een avontuurlijke setting. Budgetberekeningen voor kampeerspullen \u2014 een slaapzak kost 25 euro, een matje 15 euro, hoeveel voor 2 personen? \u2014 oefenen vermenigvuldiging met geld. Porties berekenen voor maaltijden \u2014 elk persoon eet 3 pannenkoeken, er zijn 6 kampeerders, hoeveel pannenkoeken bakken? \u2014 maken de tafels functioneel. Afstanden op een kaart aflezen en berekenen introduceert kaartvaardigheden met standaardeenheden. Redactiesommen over kampeeractiviteiten vereisen meerstapsberekeningen. Het schrijven van een kampeerdagboek oefent informatief schrijven met chronologie, details en reflectie.',
    developmentalMilestones: [
      { milestone: 'Budgetberekeningen voor kampeerspullen (7\u20138-jarigen rekenen met prijzen en aantallen)', howWeAddress: 'Kampeerbudget-activiteiten waarbij kinderen spullen prijzen, vermenigvuldigen en het totaal berekenen oefenen geldrekenen in een avontuurlijke context' },
      { milestone: 'Porties vermenigvuldigen voor kampeermaaltijden (hoeveelheden berekenen per persoon)', howWeAddress: 'Receptactiviteiten waarbij kinderen ingredi\u00ebnten vermenigvuldigen voor een groep kampeerders maken de tafels functioneel en smakelijk' },
      { milestone: 'Afstanden aflezen en berekenen op een kaart (kilometers, routeplanning)', howWeAddress: 'Kaartactiviteiten waarbij kinderen afstanden tussen bestemmingen aflezen en het totaal berekenen bouwen kaart- en meetvaardigheden op' },
      { milestone: 'Informatief schrijven: kampeerdagboek (chronologie, details, reflectie)', howWeAddress: 'Dagboekactiviteiten waarbij kinderen een kampeerdag beschrijven met datum, activiteiten en persoonlijke reflectie oefenen informatief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk budgetten tot optellen tot 50, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met plaatjes, en laat een dagboekpagina schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer budgetten tot 100 euro met vergelijking en wisselgeld, laat hen een kampeerroute plannen met afstandsberekeningen en daag hen uit met een meerdaags kampeerdagboek inclusief budget- en routeoverzicht.',
    parentTakeaway: 'Kamperen biedt natuurlijke rekenkansen in groep 4. Plan samen een kampeertrip: hoeveel kost de camping per nacht, hoeveel voor 3 nachten? Als iedereen 4 marshmallows roosteren bij het kampvuur en er zijn 5 personen, hoeveel marshmallows heb je nodig? Lees samen een kaart: hoe ver is het naar de camping, hoeveel kilometer? Na een kampeerwerkblad kunt u samen een dagboekpagina schrijven over een echte of verzonnen kampeerdag.',
    classroomIntegration: 'Het kampeerthema integreert in groep 4 met rekenen (budgetberekeningen, porties vermenigvuldigen, afstanden berekenen), taal (kampeerdagboek schrijven, kampeerwoordenschat), aardrijkskunde (kaartlezen, routeplanning, natuur) en sociaal-emotioneel leren (samenwerken, zelfstandigheid). Een kampeerproject met werkbladen, een routeplanningsopdracht en een dagboekactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Budgetberekeningen met vermenigvuldiging', emerging: 'telt eenvoudige kampeerkosten op maar vermenigvuldigt niet zelfstandig', proficient: 'berekent zelfstandig een kampeerbudget met vermenigvuldiging en optelling en noteert de berekening', advanced: 'vergelijkt meerdere kampeeropties op kosten, berekent het verschil en kiest de voordeligste met onderbouwing' },
      { skill: 'Afstanden op een kaart berekenen', emerging: 'leest afstanden af met hulp maar berekent de totale route niet', proficient: 'leest zelfstandig afstanden af en berekent de totale afstand van een route met meerdere stops', advanced: 'plant een effici\u00ebnte route, vergelijkt twee opties op afstand en tijd en kiest de snelste' },
      { skill: 'Kampeerdagboek schrijven', emerging: 'schrijft losse zinnen over een kampeerdag maar ordent ze niet chronologisch', proficient: 'schrijft een dagboekpagina met chronologische volgorde, details en een persoonlijke reflectie', advanced: 'schrijft een meerdaags dagboek met beschrijvende taal, reflecties en een samenvatting' },
    ],
  },

  circus: {
    seoTitle: 'Circus-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare circus-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'circus groep 4, circus oefeningen 7\u20138 jaar, circus oefeningen groep 4, circus uitprintbaar groep 4, circus werkbladen groep 4, circus activiteiten groep 4, circus leerbladen 7\u20138 jaar, circus gratis groep 4, circus PDF groep 4, circus rekenen groep 4',
    snippetAnswer: 'Circus-oefeningen voor groep 4 (7\u20138 jaar) gebruiken circuscontexten voor rekenen tot 100: vermenigvuldigen van kaartjes en rijen stoelen, redactiesommen over voorstellingen en artiesten, tabellen met circusgegevens, tijdberekeningen voor acts en het schrijven van een circusverslag. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het circusthema een spectaculaire context voor vermenigvuldigen en tijdberekeningen: zeven- en achtjarigen zijn betoverd door circusvoorstellingen en die betrokkenheid maakt rekenen met rijen, kaartjes en programmaplanning bijzonder motiverend. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, kloklezen en informatief schrijven als kerndoelen, en het circus biedt alle vier. Vermenigvuldigsommen met stoelen \u2014 8 rijen van 10 stoelen, hoeveel plaatsen? \u2014 oefenen de tafels in een ruimtelijke context. Kaartjesverkoop met verschillende prijzen voor kinderen en volwassenen vereist meerstapsberekeningen. Tijdberekeningen voor circusacts \u2014 de acrobaten treden 15 minuten op, de clown 20 minuten, hoe lang duurt de hele voorstelling? \u2014 oefenen optellen met tijd. Het schrijven van een circusverslag met beschrijving van acts en persoonlijke beoordeling oefent informatief en evaluatief schrijven.',
    developmentalMilestones: [
      { milestone: 'Vermenigvuldigen met rijen en stoelen (7\u20138-jarigen berekenen aantallen in een raster)', howWeAddress: 'Rasteractiviteiten waarbij kinderen rijen maal kolommen berekenen voor circusstoelen maken vermenigvuldiging ruimtelijk en visueel' },
      { milestone: 'Meerstaps-kaartjesberekeningen (verschillende prijzen voor kinderen en volwassenen)', howWeAddress: 'Kassasommen waarbij kinderen kaartjes vermenigvuldigen per categorie en het totaal optellen oefenen meerstaps geldrekenen' },
      { milestone: 'Tijdberekeningen voor een circusprogramma (duur van acts optellen)', howWeAddress: 'Programma-activiteiten waarbij kinderen de duur van acts optellen en de eindtijd berekenen oefenen kloklezen en optellen met tijd' },
      { milestone: 'Informatief en evaluatief schrijven: circusverslag (beschrijving, beoordeling)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een circusverslag schrijven met beschrijving van acts en een persoonlijk oordeel oefenen evaluatief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vermenigvuldiging tot de tafels van 2 en 5 met circusplaatjes, bied tijdberekeningen aan met hele uren en laat een verslag schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer tafels tot 10 met complexe kaartjesberekeningen inclusief korting, laat hen een circusprogramma plannen met kwartieren en daag hen uit met een volledige circusrecensie met sterrenwadering en onderbouwing.',
    parentTakeaway: 'Het circus maakt rekenen spectaculair in groep 4. Reken samen bij een bezoek: hoeveel kost het als er 2 volwassenen en 3 kinderen gaan? Als elke act 15 minuten duurt en er zijn 6 acts, hoe lang duurt de voorstelling? Hoeveel stoelen zijn er als je 8 rijen van 10 telt? Na een circuswerkblad kunt u samen een verslag schrijven over een circusbezoek of een verzonnen voorstelling \u2014 welke act vond je het beste en waarom?',
    classroomIntegration: 'Het circusthema integreert in groep 4 met rekenen (vermenigvuldigen met rijen, kaartjesberekeningen, tijdrekenen), taal (circusverslag schrijven, circuswoordenschat), bewegingsonderwijs (acrobatiek, balans) en beeldende vorming (circusposter ontwerpen). Een circusproject met werkbladen, een programmaplanningsopdracht en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vermenigvuldigen met rijen en kaartjes', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp maar combineert niet met optelling', proficient: 'berekent zelfstandig stoelenaantallen en kaartjeskosten met vermenigvuldiging en optelling', advanced: 'lost meerstaps-kassasommen op met verschillende prijzen, korting en wisselgeld' },
      { skill: 'Tijdberekeningen voor een programma', emerging: 'telt duur op met hele uren maar heeft moeite met minuten', proficient: 'berekent de totale duur en eindtijd correct met uren en minuten', advanced: 'plant een compleet programma met pauzes, berekent de eindtijd en past aan bij wijzigingen' },
      { skill: 'Circusverslag schrijven', emerging: 'schrijft losse zinnen over acts maar geeft geen oordeel', proficient: 'schrijft een verslag met beschrijving van acts en een persoonlijke beoordeling', advanced: 'schrijft een uitgebreide recensie met beschrijving, beoordeling, vergelijking en aanbeveling' },
    ],
  },

  clothing: {
    seoTitle: 'Kleding-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kleding-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kleding groep 4, kleding oefeningen 7\u20138 jaar, kleding oefeningen groep 4, kleding uitprintbaar groep 4, kleding werkbladen groep 4, kleding activiteiten groep 4, kleding leerbladen 7\u20138 jaar, kleding gratis groep 4, kleding PDF groep 4, kleding rekenen groep 4',
    snippetAnswer: 'Kleding-oefeningen voor groep 4 (7\u20138 jaar) gebruiken kledingcontexten voor rekenen tot 100: budgetberekeningen voor outfits, vermenigvuldigen van kledingprijzen, tabellen met maatgegevens, meten van lichaatsmaten en het schrijven van een kledingbeschrijving. Kinderen rekenen met mode. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het kledingthema een functionele context voor geldrekenen en meten: zeven- en achtjarigen zijn bewust van kleding en mode en die betrokkenheid maakt budgetberekeningen en maatvoering bijzonder motiverend. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, meten en functioneel schrijven als kerndoelen, en kleding biedt alle vier. Budgetberekeningen voor een outfit \u2014 een T-shirt kost 12 euro, een broek 25 euro, schoenen 35 euro, hoeveel bij elkaar? \u2014 oefenen optellen en vergelijken met geld. Vermenigvuldiging bij uitverkoop \u2014 3 paar sokken van 4 euro, hoeveel in totaal? \u2014 maakt de tafels functioneel. Meten met een meetlint \u2014 taillemaat, beenlengte, schoenmaat \u2014 oefent standaardeenheden aan het eigen lichaam. Tabellen met maten en prijzen bouwen datageletterdheid op. Het schrijven van een kledingbeschrijving oefent beschrijvend schrijven met details over kleur, materiaal en stijl.',
    developmentalMilestones: [
      { milestone: 'Budgetberekeningen voor kleding (7\u20138-jarigen rekenen met prijzen en vergelijken)', howWeAddress: 'Winkelactiviteiten waarbij kinderen kledingprijzen optellen, vergelijken en het voordeligste alternatief kiezen oefenen geldrekenen en vergelijken' },
      { milestone: 'Vermenigvuldigen met kledingaantallen (meerdere stuks van dezelfde prijs)', howWeAddress: 'Uitverkoopactiviteiten waarbij kinderen hoeveelheden vermenigvuldigen met prijzen en het totaal berekenen maken de tafels functioneel' },
      { milestone: 'Meten met een meetlint (lichaatsmaten in centimeters voor kledingmaten)', howWeAddress: 'Meetactiviteiten waarbij kinderen lichaatsmaten opmeten en de juiste kledingmaat bepalen oefenen meten in standaardeenheden' },
      { milestone: 'Beschrijvend schrijven: kledingbeschrijving (kleur, materiaal, stijl)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een kledingstuk beschrijven met details over kleur, materiaal en stijl oefenen beschrijvend schrijven met zintuiglijke woorden' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk budgetten tot optellen tot 50 met ronde bedragen, bied meetopdrachten aan met begeleiding en laat een kledingbeschrijving schrijven met een woordenbank. Voor gevorderde kinderen: introduceer budgetten met kortingsberekeningen (helft van de prijs), laat hen maattabellen interpreteren en vergelijken en daag hen uit met het ontwerpen en beschrijven van een eigen kledinglijn inclusief prijslijst.',
    parentTakeaway: 'Kleding biedt praktische rekenkansen in groep 4. Reken samen bij het winkelen: hoeveel kosten deze schoenen en dat T-shirt bij elkaar? Als de broek 30 euro kost en je hebt 50 euro, hoeveel krijg je terug? Meet samen de juiste maat: hoeveel centimeter is de taillemaat, welke maat past? Na een kledingwerkblad kunt u samen een outfit beschrijven \u2014 welke kleur, welk materiaal, bij welk weer draag je het?',
    classroomIntegration: 'Het kledingthema integreert in groep 4 met rekenen (budgetberekeningen, vermenigvuldigen, meten), taal (beschrijvend schrijven, kledingwoordenschat), natuur en techniek (materialen, textiel, duurzaamheid) en beeldende vorming (mode-ontwerp). Een kledingproject met werkbladen, een maatactiviteit en een beschrijvingsopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Budgetberekeningen met kleding', emerging: 'telt twee kledingprijzen op maar vergelijkt niet en berekent wisselgeld niet zelfstandig', proficient: 'berekent zelfstandig een outfitbudget, vergelijkt opties en berekent wisselgeld correct', advanced: 'berekent kortingen, vergelijkt drie opties en kiest de voordeligste met onderbouwing' },
      { skill: 'Meten voor kledingmaten', emerging: 'meet met een meetlint met hulp maar leest de waarde niet altijd correct af', proficient: 'meet zelfstandig in centimeters en bepaalt de juiste kledingmaat uit een maattabel', advanced: 'meet nauwkeurig meerdere lichaatsmaten en interpreteert een complexe maattabel met meerdere merken' },
      { skill: 'Beschrijvend schrijven over kleding', emerging: 'noemt kleur en type maar beschrijft niet gedetailleerd', proficient: 'schrijft een beschrijving met kleur, materiaal, stijl en passend bij gelegenheid', advanced: 'schrijft een aantrekkelijke kledingbeschrijving met zintuiglijke details, vergelijking en aanbeveling' },
    ],
  },

  colors: {
    seoTitle: 'Kleuren-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kleuren-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kleuren groep 4, kleuren oefeningen 7\u20138 jaar, kleuren oefeningen groep 4, kleuren uitprintbaar groep 4, kleuren werkbladen groep 4, kleuren activiteiten groep 4, kleuren leerbladen 7\u20138 jaar, kleuren gratis groep 4, kleuren PDF groep 4, kleuren rekenen groep 4',
    snippetAnswer: 'Kleuren-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met kleurtheorie: vermenigvuldigen van verfhoeveelheden, breukenintroductie met kleurmenging, tabellen met kleurcombinaties, redactiesommen over verfverbruik en het schrijven van een beschrijvende tekst met kleurwoorden. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het kleurenthema een visuele context voor breukenintroductie en vermenigvuldiging: zeven- en achtjarigen begrijpen kleurmenging en die ervaring biedt een intuuitieve ingang voor breuken en verhoudingen. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, introductie van breuken en beschrijvend schrijven als kerndoelen, en kleuren bieden alle vier. Breukenintroductie via kleurmenging \u2014 een halve beker blauw en een halve beker geel geeft groen \u2014 maakt breuken visueel en tastbaar. Vermenigvuldiging met verfhoeveelheden \u2014 voor \u00e9\u00e9n schilderij heb je 3 kleuren nodig, hoeveel verftubes voor 4 schilderijen? \u2014 oefent de tafels in een creatieve context. Tabellen met kleurcombinaties \u2014 welke twee kleuren geven welke mengkleur \u2014 bouwen logisch ordenen op. Redactiesommen over verfverbruik per vierkante meter vereisen meerstapsberekeningen. Het schrijven van een beschrijvende tekst met kleurwoorden oefent zintuiglijk beschrijvend schrijven.',
    developmentalMilestones: [
      { milestone: 'Breukenintroductie via kleurmenging (7\u20138-jarigen ervaren halven en kwarten visueel)', howWeAddress: 'Mengactiviteiten waarbij kinderen halve en kwart porties verf combineren maken breuken concreet en visueel via kleurresultaten' },
      { milestone: 'Vermenigvuldigen met verfhoeveelheden (hoeveelheden per schilderij berekenen)', howWeAddress: 'Verfberekeningen waarbij kinderen materialen vermenigvuldigen voor meerdere projecten oefenen de tafels in een creatieve context' },
      { milestone: 'Tabellen met kleurcombinaties interpreteren (mengtabellen, kleurwielen)', howWeAddress: 'Tabelactiviteiten waarbij kinderen kleurcombinaties opzoeken en voorspellen bouwen logisch denken op met visuele feedback' },
      { milestone: 'Beschrijvend schrijven met kleurwoorden (zintuiglijke beschrijvingen van beelden)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een schilderij of landschap beschrijven met precieze kleurwoorden oefenen zintuiglijk beschrijvend schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk breuken tot halven met concrete verfpotjes, bied vermenigvuldigsommen aan met de tafels van 2 en 5 en kleurplaatjes, en schrijf een beschrijving met een kleurwoordenbank. Voor gevorderde kinderen: introduceer kwarten en derden bij kleurmenging, laat hen een compleet verfbudget berekenen voor een kunstproject en daag hen uit met een beschrijvende tekst over een kunstwerk met gevarieerde kleurwoorden en beeldspraak.',
    parentTakeaway: 'Kleuren bieden creatieve rekenkansen in groep 4. Meng samen verf: als je een halve beker rood en een halve beker wit mengt, welke kleur krijg je? Hoeveel verftubes heb je nodig als je 3 schilderijen maakt en elk schilderij 4 kleuren nodig heeft? Na een kleurenwerkblad kunt u samen een kunstwerk maken en het beschrijven met precieze kleurwoorden \u2014 niet gewoon blauw maar azuurblauw, hemelblauw of donkerblauw.',
    classroomIntegration: 'Het kleurenthema integreert in groep 4 met rekenen (breukenintroductie, vermenigvuldigen, tabellen), taal (beschrijvend schrijven met kleurwoorden), beeldende vorming (kleurtheorie, mengen, schilderen) en natuur en techniek (licht en kleur, pigmenten). Een kleurenproject met werkbladen, een mengexperiment en een beschrijvingsopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Breukenintroductie met kleuren', emerging: 'herkent een halve portie visueel maar benoemt de breuk niet correct', proficient: 'benoemt halven en kwarten correct en past ze toe bij kleurmenging', advanced: 'werkt met derden en zesden, voorspelt mengresultaten en legt de breukenverhoudingen schriftelijk uit' },
      { skill: 'Vermenigvuldigen met verfhoeveelheden', emerging: 'vermenigvuldigt met de tafels van 2 met hulp maar past dit niet toe bij meerdere kleuren', proficient: 'berekent zelfstandig verfhoeveelheden voor meerdere projecten met de tafels van 1\u20135', advanced: 'berekent een compleet verfbudget met hoeveelheden, prijzen en een totaaloverzicht' },
      { skill: 'Beschrijvend schrijven met kleurwoorden', emerging: 'gebruikt basiskleurnamen (rood, blauw) maar beschrijft niet gedetailleerd', proficient: 'schrijft een beschrijving met gevarieerde kleurwoorden en zintuiglijke details', advanced: 'schrijft een rijke beschrijving met precieze kleurbenamingen, vergelijkingen en beeldspraak' },
    ],
  },

  construction: {
    seoTitle: 'Bouw-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare bouw-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'bouw groep 4, bouw oefeningen 7\u20138 jaar, bouw oefeningen groep 4, bouw uitprintbaar groep 4, bouw werkbladen groep 4, bouw activiteiten groep 4, bouw leerbladen 7\u20138 jaar, bouw gratis groep 4, bouw PDF groep 4, bouw rekenen groep 4',
    snippetAnswer: 'Bouw-oefeningen voor groep 4 (7\u20138 jaar) gebruiken bouwcontexten voor rekenen tot 100: vermenigvuldigen van bouwmaterialen, meten van lengtes en oppervlaktes, redactiesommen over bouwprojecten, tabellen met materiaallijsten en het schrijven van een bouwinstructie. Kinderen rekenen als architecten. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het bouwthema een technische context voor meten en vermenigvuldigen: zeven- en achtjarigen zijn gefascineerd door bouwmachines en constructie en die betrokkenheid maakt rekenen met afmetingen en materialen bijzonder motiverend. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, meten in standaardeenheden en procedureel schrijven als kerndoelen, en bouwen biedt alle vier. Vermenigvuldiging met bouwmaterialen \u2014 voor \u00e9\u00e9n muur heb je 50 stenen nodig, hoeveel voor 3 muren? \u2014 maakt de tafels grootschalig en concreet. Meten van lengtes \u2014 de balk is 2 meter lang, je hebt 4 balken nodig, hoeveel meter in totaal? \u2014 combineert meten met vermenigvuldigen. Oppervlakteberekening van een kamer introduceert het concept lengte maal breedte. Redactiesommen over bouwprojecten vereisen meerstapsberekeningen met maten en aantallen. Het schrijven van een bouwinstructie oefent procedureel schrijven met stappen, materialen en maataanduidingen.',
    developmentalMilestones: [
      { milestone: 'Vermenigvuldigen met bouwmaterialen (7\u20138-jarigen berekenen hoeveelheden voor constructie)', howWeAddress: 'Materiaalberekeningen waarbij kinderen stenen, planken en tegels vermenigvuldigen voor bouwprojecten maken de tafels grootschalig en concreet' },
      { milestone: 'Meten en berekenen van lengtes en oppervlaktes (meters, centimeters, lengte maal breedte)', howWeAddress: 'Meetactiviteiten waarbij kinderen afmetingen meten en oppervlaktes berekenen introduceren het concept van lengte maal breedte in een bouwcontext' },
      { milestone: 'Meerstaps-redactiesommen over bouwprojecten (materialen, kosten, maten combineren)', howWeAddress: 'Bouwproject-verhalen waarbij kinderen materialen berekenen, kosten optellen en maten combineren oefenen complex meerstaps rekenen' },
      { milestone: 'Procedureel schrijven: bouwinstructie (stappen, materialen, maataanduidingen)', howWeAddress: 'Instructie-opdrachten waarbij kinderen een bouwinstructie schrijven met genummerde stappen en materiaaltlijst oefenen procedureel schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vermenigvuldiging tot de tafels van 2 en 5 met bouwplaatjes, bied meetopdrachten aan met begeleiding en laat een instructie schrijven met een stappensjabloon. Voor gevorderde kinderen: introduceer oppervlakteberekeningen met grotere getallen, laat hen een compleet bouwplan maken met materiaaltlijst en kostenberekening en daag hen uit met een technische bouwinstructie inclusief schaalmodel.',
    parentTakeaway: 'Bouwen biedt technische rekenkansen in groep 4. Bouw samen met blokken of lego: hoeveel blokken heb je nodig voor een muur van 5 breed en 4 hoog? Meet samen iets in huis: hoe lang is de tafel, hoe breed is de kamer, hoeveel tegels passen op de vloer? Na een bouwwerkblad kunt u samen een bouwinstructie schrijven \u2014 stap voor stap, met materialen en maten, alsof iemand anders het moet nabouwen.',
    classroomIntegration: 'Het bouwthema integreert in groep 4 met rekenen (vermenigvuldigen met materialen, meten, oppervlakte), taal (procedureel schrijven, bouwwoordenschat), natuur en techniek (constructie, materiaalkennis, stabiliteit) en beeldende vorming (ontwerpen, schaalmodellen). Een bouwproject met werkbladen, een constructie-activiteit en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vermenigvuldigen met bouwmaterialen', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp maar combineert niet met optelling', proficient: 'berekent zelfstandig materiaalHoeveelheden voor een bouwproject met vermenigvuldiging en optelling', advanced: 'berekent materialen, kosten en oppervlaktes voor een compleet project en controleert het resultaat' },
      { skill: 'Meten en oppervlakte berekenen', emerging: 'meet lengtes met een liniaal maar berekent de oppervlakte niet zelfstandig', proficient: 'meet correct in centimeters en meters en berekent de oppervlakte van een rechthoek', advanced: 'berekent oppervlaktes van samengestelde vormen en past de resultaten toe in een bouwplan' },
      { skill: 'Procedureel schrijven: bouwinstructie', emerging: 'schrijft losse stappen maar nummert niet en vergeet materialen', proficient: 'schrijft een duidelijke instructie met genummerde stappen, materiaallijst en maataanduidingen', advanced: 'schrijft een gedetailleerde technische instructie met diagram, materiaaltlijst en tips voor mogelijke problemen' },
    ],
  },

  cooking: {
    seoTitle: 'Koken-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare koken-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'koken groep 4, koken oefeningen 7\u20138 jaar, koken oefeningen groep 4, koken uitprintbaar groep 4, koken werkbladen groep 4, koken activiteiten groep 4, koken leerbladen 7\u20138 jaar, koken gratis groep 4, koken PDF groep 4, koken rekenen groep 4',
    snippetAnswer: 'Koken-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met keukenvaardigheden: vermenigvuldigen van ingredi\u00ebnten, breukenintroductie met maatbekers, recepten lezen met hoeveelheden, tijdberekeningen voor baktijden en het schrijven van een eigen recept. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het kookthema een smakelijke context voor breuken en vermenigvuldiging: zeven- en achtjarigen helpen graag in de keuken en die betrokkenheid maakt rekenen met hoeveelheden, maten en tijd bijzonder motiverend. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, introductie van breuken en procedureel schrijven als kerndoelen, en koken biedt alle vier op een functionele manier. Breukenintroductie via maatbekers \u2014 een half kopje melk, een kwart theelepel zout \u2014 maakt breuken tastbaar en zinvol. Vermenigvuldiging bij het verdubbelen van een recept \u2014 het recept is voor 4 personen, hoeveel ingredi\u00ebnten voor 8? \u2014 oefent de tafels met een culinair doel. Tijdberekeningen voor baktijden \u2014 de cake moet 35 minuten in de oven, je begint om 14:15, hoe laat is hij klaar? \u2014 combineren kloklezen met optellen. Het schrijven van een eigen recept oefent procedureel schrijven met precieze hoeveelheden, stappen en tijdsaanduidingen.',
    developmentalMilestones: [
      { milestone: 'Breukenintroductie via maatbekers (7\u20138-jarigen ervaren halven en kwarten concreet)', howWeAddress: 'Maatbekeractiviteiten waarbij kinderen halve en kwart hoeveelheden afmeten maken breuken tastbaar in een functionele keukencontext' },
      { milestone: 'Vermenigvuldigen van recepthoeveelheden (recept verdubbelen of verdrievoudigen)', howWeAddress: 'Receptverdubbeling-activiteiten waarbij kinderen alle ingredi\u00ebnten vermenigvuldigen oefenen de tafels met een smakelijk resultaat' },
      { milestone: 'Tijdberekeningen voor bak- en kooktijden (beginnen, duur, eindtijd)', howWeAddress: 'Baktijdactiviteiten waarbij kinderen de eindtijd berekenen bij een gegeven starttijd en duur oefenen kloklezen en optellen met tijd' },
      { milestone: 'Procedureel schrijven: een eigen recept (ingredi\u00ebnten, stappen, hoeveelheden)', howWeAddress: 'Receptschrijfopdrachten waarbij kinderen een compleet recept opstellen met ingredi\u00ebntenlijst, genummerde stappen en maataanduidingen oefenen procedureel schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk breuken tot halven met concrete maatbekers, bied vermenigvuldiging aan met de tafels van 2 en gebruik hele uren bij baktijdberekeningen. Voor gevorderde kinderen: introduceer kwarten en derden, laat hen een recept voor 12 personen omrekenen vanuit 4 en daag hen uit met een receptboekje inclusief inhoudsopgave, ingredi\u00ebntenlijsten en gedetailleerde stappen.',
    parentTakeaway: 'Koken biedt de lekkerste rekenkansen in groep 4. Kook samen en laat uw kind afmeten: een halve liter melk, een kwart kopje suiker. Verdubbel samen een recept: als je 2 eieren nodig hebt voor 4 personen, hoeveel voor 8? Stel de keukenwekker in en laat uw kind de eindtijd berekenen. Na een kookwerkblad kunt u samen een recept opschrijven \u2014 met alle ingredi\u00ebnten, hoeveelheden en stappen, zodat iemand anders het kan namaken.',
    classroomIntegration: 'Het kookthema integreert in groep 4 met rekenen (breuken met maatbekers, vermenigvuldigen, tijdberekeningen), taal (procedureel schrijven, receptwoordenschat), natuur en techniek (voedingsstoffen, kookprocessen) en sociaal-emotioneel leren (samenwerken, delen, verantwoordelijkheid). Een kookproject met werkbladen, een bakactiviteit en een receptschrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Breuken met maatbekers', emerging: 'herkent een halve maatbeker visueel maar benoemt de breuk niet correct', proficient: 'meet zelfstandig halve en kwart hoeveelheden en benoemt de breuken correct', advanced: 'werkt met derden en zesden, rekent hoeveelheden om en legt de breukenverhoudingen uit' },
      { skill: 'Recepthoeveelheden vermenigvuldigen', emerging: 'verdubbelt eenvoudige hoeveelheden met hulp maar past dit niet toe bij alle ingredi\u00ebnten', proficient: 'vermenigvuldigt zelfstandig alle ingredi\u00ebnten bij het verdubbelen of verdrievoudigen van een recept', advanced: 'rekent recepten om voor willekeurige aantallen personen en controleert de verhoudingen' },
      { skill: 'Procedureel schrijven: recept', emerging: 'schrijft stappen maar vergeet hoeveelheden of volgorde', proficient: 'schrijft een compleet recept met ingredi\u00ebntenlijst, genummerde stappen en maataanduidingen', advanced: 'schrijft een gedetailleerd recept met tips, variaties en precieze tijdsaanduidingen' },
    ],
  },

  dinosaurs: {
    seoTitle: 'Dinosaurussen-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare dinosaurussen-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dinosaurussen groep 4, dinosaurussen oefeningen 7\u20138 jaar, dinosaurussen oefeningen groep 4, dinosaurussen uitprintbaar groep 4, dinosaurussen werkbladen groep 4, dinosaurussen activiteiten groep 4, dinosaurussen leerbladen 7\u20138 jaar, dinosaurussen gratis groep 4, dinosaurussen PDF groep 4, dinosaurussen rekenen groep 4',
    snippetAnswer: 'Dinosaurussen-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met paleontologie: vermenigvuldigen met dinoaantallen, grote getallen vergelijken (lengte, gewicht), tijdlijnen aflezen, tabellen met dinogegevens en informatieve teksten over dinosauri\u00ebrs schrijven. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het dinosaurussenthema een fascinerende context voor grote getallen en gegevensanalyse: zeven- en achtjarigen zijn geobsedeerd door dinosauri\u00ebrs en die passie kan worden ingezet voor rekenen met grote maten en vergelijkingen. De SLO-leerlijnen benadrukken rekenen tot 100, vergelijken, meten en informatief schrijven als kerndoelen, en dinosaurussen bieden alle vier op een epische schaal. Grote getallen vergelijken \u2014 een T-Rex was 12 meter lang, een Brachiosaurus 25 meter, hoeveel verschil? \u2014 oefent aftrekken met betekenisvolle context. Vermenigvuldiging met dinogroepen \u2014 een kudde van 8 Triceratops, 3 kuddes bij elkaar, hoeveel dieren? \u2014 maakt de tafels prehistorisch. Tabellen met dinogegevens over lengte, gewicht en voedsel introduceren gegevensanalyse met indrukwekkende getallen. Tijdlijnen van het mesozoicum oefenen het aflezen van schalen en het vergelijken van periodes. Het schrijven van een informatieve tekst over een dinosaurus oefent gestructureerd schrijven met wetenschappelijke feiten.',
    developmentalMilestones: [
      { milestone: 'Grote getallen vergelijken en ordenen (7\u20138-jarigen werken met dinosauruslengtes en -gewichten)', howWeAddress: 'Vergelijkingsactiviteiten waarbij kinderen dinoformaten ordenen van klein naar groot en het verschil berekenen oefenen groottebesef en aftrekken' },
      { milestone: 'Vermenigvuldigen met dinogroepen (kuddes en nesten berekenen)', howWeAddress: 'Kudde-rekenactiviteiten waarbij kinderen groepsaantallen vermenigvuldigen en het totaal berekenen maken de tafels prehistorisch fascinerend' },
      { milestone: 'Tabellen met dinosaurusgegevens interpreteren (lengte, gewicht, voedsel, periode)', howWeAddress: 'Tabelactiviteiten met werkelijke dinogegevens bouwen datageletterdheid op terwijl kinderen feiten vergelijken en vragen beantwoorden' },
      { milestone: 'Informatief schrijven over een dinosaurus (gestructureerde tekst met feiten en classificatie)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een informatief profiel van een dinosaurus opstellen oefenen gestructureerd schrijven met wetenschappelijke inhoud' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk getallen tot vergelijkingen tot 50, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met dinoplaatjes, en laat een dinoprofiel schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer vergelijkingen met driecijferige getallen, laat hen een dinotabel zelf opstellen met vijf soorten en daag hen uit met een uitgebreid verslag over een dinosauri\u00ebrfamilie inclusief tijdlijn en vergelijkingstabel.',
    parentTakeaway: 'Dinosaurussen maken rekenen episch in groep 4. Zoek samen dinofeiten op: hoe lang was een T-Rex, hoe zwaar een Brachiosaurus? Vergelijk: hoeveel langer was de Diplodocus dan de Velociraptor? Als er 5 nesten zijn met elk 8 eieren, hoeveel dino-eieren in totaal? Na een dinowerkblad kunt u samen een dinoprofiel schrijven \u2014 met naam, lengte, gewicht, voedsel en de periode waarin hij leefde.',
    classroomIntegration: 'Het dinosaurussenthema integreert in groep 4 met rekenen (grote getallen vergelijken, vermenigvuldigen, tabellen), taal (informatief schrijven, wetenschappelijke woordenschat), natuur en techniek (paleontologie, fossielen, evolutie) en beeldende vorming (dinoillustraties, schaalmodellen). Een dinoproject met werkbladen, een fossieljacht en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Grote getallen vergelijken en ordenen', emerging: 'vergelijkt twee getallen maar ordent niet zelfstandig meer dan drie', proficient: 'ordent zelfstandig vijf dinoformaten van klein naar groot en berekent het verschil correct', advanced: 'vergelijkt complexe gegevens, berekent verschillen en trekt conclusies over patronen in grootte' },
      { skill: 'Vermenigvuldigen met dinocontexten', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp', proficient: 'past de tafels van 1\u20135 zelfstandig toe in dinosaurussommen en noteert de berekening', advanced: 'lost meerstaps-dinosommen op met vermenigvuldiging en optelling en controleert het antwoord' },
      { skill: 'Informatief schrijven over dinosaurussen', emerging: 'schrijft losse feiten maar organiseert ze niet', proficient: 'schrijft een gestructureerd dinoprofiel met inleiding, feiten en slot', advanced: 'schrijft een uitgebreid dinoVerslag met vergelijkingen, een tabel en een classificatie' },
    ],
  },

  easter: {
    seoTitle: 'Pasen-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare pasen-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'pasen groep 4, pasen oefeningen 7\u20138 jaar, pasen oefeningen groep 4, pasen uitprintbaar groep 4, pasen werkbladen groep 4, pasen activiteiten groep 4, pasen leerbladen 7\u20138 jaar, pasen gratis groep 4, pasen PDF groep 4, pasen rekenen groep 4',
    snippetAnswer: 'Pasen-oefeningen voor groep 4 (7\u20138 jaar) gebruiken paascontexten voor rekenen tot 100: vermenigvuldigen van paaseieren en mandjes, eerlijk verdelen als voorbereiding op delen, tabellen met paasgegevens, breukenintroductie bij het verdelen van chocolade en het schrijven van een paasverhaal. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het paasthema een feestelijke context voor verdelen en breukenintroductie: zeven- en achtjarigen leven enorm toe naar Pasen en die betrokkenheid maakt rekenen met verdeling, vermenigvuldiging en breuken bijzonder motiverend. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, introductie van eerlijk verdelen en verhalend schrijven als kerndoelen, en Pasen biedt alle vier. Vermenigvuldiging met paaseieren \u2014 in elk mandje liggen 6 eieren, er zijn 8 mandjes, hoeveel eieren? \u2014 oefent de tafels in een feestelijke context. Eerlijk verdelen \u2014 48 paaseieren over 6 kinderen, hoeveel krijgt ieder? \u2014 introduceert delen als omgekeerde van vermenigvuldigen. Breukenintroductie bij het verdelen van een chocolade-ei \u2014 in halven, kwarten, achtsten \u2014 maakt breuken tastbaar. Het schrijven van een paasverhaal oefent verhalend schrijven met sfeer, dialoog en een plot.',
    developmentalMilestones: [
      { milestone: 'Eerlijk verdelen als voorbereiding op delen (7\u20138-jarigen verdelen paaseieren gelijk over groepen)', howWeAddress: 'Verdeelactiviteiten waarbij kinderen paaseieren gelijk verdelen en de deelsom noteren introduceren delen als omgekeerde van vermenigvuldigen' },
      { milestone: 'Vermenigvuldigen met paasaantallen (mandjes, eieren, decoraties)', howWeAddress: 'Paasrekenactiviteiten waarbij kinderen eieren per mandje vermenigvuldigen en het totaal berekenen oefenen de tafels in een feestelijke context' },
      { milestone: 'Breukenintroductie bij het verdelen van chocolade (halven, kwarten, achtsten)', howWeAddress: 'Chocolade-verdeelactiviteiten waarbij kinderen een ei in gelijke delen breken maken breuken concreet en smakelijk' },
      { milestone: 'Verhalend schrijven: paasverhaal (sfeer, dialoog, plot met begin-midden-eind)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een paasverhaal schrijven met de paashaas als hoofdpersonage oefenen verhalend schrijven met verhaalstructuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk verdeling tot even aantallen over 2 of 4 groepen, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met paasplaatjes, en schrijf een paasverhaal met een beginzin als voorbeeld. Voor gevorderde kinderen: introduceer verdeling met rest, laat hen breuken toepassen bij het verdelen van een chocoladereep over 3 en 6 personen en daag hen uit met een uitgebreid paasverhaal met dialoog en een verrassende wending.',
    parentTakeaway: 'Pasen biedt feestelijke rekenkansen in groep 4. Verdeel samen paaseieren: als er 36 eieren zijn voor 4 kinderen, hoeveel krijgt ieder? Hoeveel is de helft van een chocolade-ei, en de helft van de helft? Vermenigvuldig bij het eieren zoeken: als er in elke kamer 5 eieren verstopt zijn en er zijn 6 kamers, hoeveel eieren moet je vinden? Na een paaswerkblad kunt u samen een paasverhaal schrijven over de paashaas \u2014 wat gebeurt er, wie komen ze tegen en hoe loopt het af?',
    classroomIntegration: 'Het paasthema integreert in groep 4 met rekenen (vermenigvuldigen, verdelen, breuken), taal (verhalend schrijven, paaswoordenschat), natuur en techniek (lente, eieren, kuikens) en beeldende vorming (paaseieren versieren, paasposter). Een paasproject met werkbladen, een eierzoektocht met rekenraadsels en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Eerlijk verdelen (voorbereiding op delen)', emerging: 'verdeelt met hulp maar maakt ongelijke groepen', proficient: 'verdeelt zelfstandig paaseieren gelijk over groepen tot acht en noteert de deelsom', advanced: 'verdeelt snel, berekent de rest bij ongelijke verdeling en noteert deelsom met rest' },
      { skill: 'Vermenigvuldigen met paascontexten', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp', proficient: 'past de tafels van 1\u20135 zelfstandig toe in paassommen en noteert de berekening correct', advanced: 'lost meerstaps-paassommen op met vermenigvuldiging en verdeling en controleert het antwoord' },
      { skill: 'Verhalend schrijven: paasverhaal', emerging: 'schrijft losse zinnen over Pasen maar heeft geen verhaalstructuur', proficient: 'schrijft een paasverhaal met begin, midden en eind en een hoofdpersonage', advanced: 'schrijft een uitgebreid paasverhaal met dialoog, beschrijvende sfeerwoorden en een verrassende wending' },
    ],
  },

  emotions: {
    seoTitle: 'Emoties-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare emoties-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'emoties groep 4, emoties oefeningen 7\u20138 jaar, emoties oefeningen groep 4, emoties uitprintbaar groep 4, emoties werkbladen groep 4, emoties activiteiten groep 4, emoties leerbladen 7\u20138 jaar, emoties gratis groep 4, emoties PDF groep 4, emoties rekenen groep 4',
    snippetAnswer: 'Emoties-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met sociaal-emotioneel leren: tabellen en grafieken over gevoelens, vermenigvuldigen met stemmingsgegevens, redactiesommen over emotionele situaties en het schrijven van reflectieve teksten over gevoelens. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het emotiesthema een reflectieve context voor gegevensverwerking en beschrijvend schrijven: zeven- en achtjarigen ontwikkelen steeds meer emotioneel bewustzijn en die groeiende zelfreflectie kan worden ingezet voor dataverzameling en schrijfopdrachten. De SLO-leerlijnen benadrukken gegevensverwerking, rekenen tot 100 en reflectief schrijven als kerndoelen, en emoties bieden alle drie op een persoonlijk relevante manier. Stemmingstabellen bijhouden \u2014 elke dag je gevoel noteren en aan het eind van de week turven \u2014 introduceert dataverzameling en -analyse. Grafieken maken van klasstemmingen \u2014 hoeveel kinderen voelen zich blij, hoeveel gespannen? \u2014 oefent het visualiseren van gegevens. Vermenigvuldiging met stemmingsgegevens \u2014 als 5 kinderen per dag blij zijn en de week heeft 5 dagen, hoeveel blije noteringen? \u2014 maakt de tafels persoonlijk. Het schrijven van reflectieve teksten over gevoelens oefent beschrijvend en betoggend schrijven met emotiewoorden en zelfreflectie.',
    developmentalMilestones: [
      { milestone: 'Gegevens verzamelen en verwerken over emoties (7\u20138-jarigen houden een stemmingstabel bij)', howWeAddress: 'Stemmingstabelactiviteiten waarbij kinderen dagelijks hun gevoel noteren en wekelijks turven en tellen introduceren dataverzameling op persoonlijk niveau' },
      { milestone: 'Grafieken lezen en maken over emoties (staafdiagrammen van klasstemmingen)', howWeAddress: 'Grafiekactiviteiten waarbij kinderen stemmingsgegevens omzetten in staafdiagrammen en vragen beantwoorden bouwen datavisualisatievaardigheden op' },
      { milestone: 'Vermenigvuldigen met stemmingsgegevens (herhaalde emotietellingen over meerdere dagen)', howWeAddress: 'Rekenactiviteiten waarbij kinderen dagelijkse stemmingsaantallen vermenigvuldigen met het aantal dagen oefenen de tafels met persoonlijke data' },
      { milestone: 'Reflectief schrijven over gevoelens (beschrijven, verklaren, strategieen benoemen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een emotie beschrijven, de oorzaak verklaren en een copingstrategie benoemen oefenen reflectief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk de stemmingstabel tot drie emoties met smileys, bied grafieken aan met vijf staven en laat reflectieve zinnen schrijven met startzinnen. Voor gevorderde kinderen: introduceer zes of meer emoties in de tabel met nuances, laat hen een dubbel staafdiagram maken voor twee weken en daag hen uit met een uitgebreid reflectief essay over het omgaan met een moeilijke emotie.',
    parentTakeaway: 'Emoties bieden reflectieve leerkansen in groep 4. Houd samen een stemmingskalender bij: welk gevoel had je vandaag, en gisteren? Tel aan het eind van de week: hoeveel blije dagen, hoeveel lastige? Maak er een grafiek van: welk gevoel kwam het vaakst voor? Na een emotiewerkblad kunt u samen praten over gevoelens \u2014 wat maakt je blij, wat helpt als je boos bent, en hoe kun je dat opschrijven zodat je het later nog weet?',
    classroomIntegration: 'Het emotiesthema integreert in groep 4 met rekenen (tabellen bijhouden, grafieken maken, vermenigvuldigen met gegevens), taal (reflectief schrijven, emotiewoordenschat), sociaal-emotioneel leren (zelfbewustzijn, empathie, copingstrategien) en burgerschap (respect, samenwerken). Een emotieproject met werkbladen, een klasstemming-grafiek en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Gegevens verzamelen en grafieken maken', emerging: 'vult een stemmingstabel in met hulp maar maakt geen grafiek zelfstandig', proficient: 'houdt zelfstandig een stemmingstabel bij en zet gegevens om in een correct staafdiagram', advanced: 'verzamelt gegevens over twee weken, maakt vergelijkende grafieken en trekt conclusies over patronen' },
      { skill: 'Vermenigvuldigen met stemmingsgegevens', emerging: 'vermenigvuldigt dagaantallen met hulp maar past dit niet toe in nieuwe contexten', proficient: 'vermenigvuldigt zelfstandig stemmingsaantallen met dagen en berekent totalen correct', advanced: 'combineert vermenigvuldiging met vergelijking en berekent gemiddelden over meerdere weken' },
      { skill: 'Reflectief schrijven over emoties', emerging: 'benoemt een emotie maar beschrijft oorzaak en strategie niet', proficient: 'schrijft een reflectieve tekst met emotie, oorzaak, gevolg en copingstrategie', advanced: 'schrijft een genuanceerd reflectief essay met meerdere perspectieven en concrete voorbeelden' },
    ],
  },

  'fairy-tales': {
    seoTitle: 'Sprookjes-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare sprookjes-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'sprookjes groep 4, sprookjes oefeningen 7\u20138 jaar, sprookjes oefeningen groep 4, sprookjes uitprintbaar groep 4, sprookjes werkbladen groep 4, sprookjes activiteiten groep 4, sprookjes leerbladen 7\u20138 jaar, sprookjes gratis groep 4, sprookjes PDF groep 4, sprookjes rekenen groep 4',
    snippetAnswer: 'Sprookjes-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met verhaalanalyse: redactiesommen in sprookjescontexten, vermenigvuldigen met magische getallen, tabellen met sprookjesfiguren, verhaalstructuur analyseren en het schrijven van een eigen sprookje met dialoog. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het sprookjesthema een literaire context voor verhalend schrijven en redeneren: zeven- en achtjarigen kennen veel sprookjes en die vertrouwdheid biedt een springplank voor verhaalanalyse, complex rekenen en creatief schrijven. De SLO-leerlijnen benadrukken rekenen tot 100, logisch redeneren, leesbegrip en verhalend schrijven als kerndoelen, en sprookjes bieden alle vier. Redactiesommen in sprookjescontexten \u2014 Roodkapje plukt 24 bloemen en geeft er 3 bossen van 6 aan oma, hoeveel houdt ze over? \u2014 combineren vermenigvuldiging met aftrekken. Tabellen met sprookjesfiguren \u2014 personage, sprookje, eigenschap, rol \u2014 oefenen classificatie en gegevensordening. Verhaalstructuuranalyse \u2014 begin, probleem, oplossing, einde \u2014 bouwt leesbegrip op. Het schrijven van een eigen sprookje met dialoog, beschrijving en moraal oefent verhalend schrijven op een geavanceerder niveau met karakterontwikkeling.',
    developmentalMilestones: [
      { milestone: 'Meerstaps-redactiesommen in sprookjescontext (7\u20138-jarigen combineren bewerkingen in een verhaal)', howWeAddress: 'Sprookjesverhaal-opdrachten waarbij kinderen vermenigvuldiging en aftrekking combineren in \u00e9\u00e9n som oefenen meerstaps rekenen in een betoverende context' },
      { milestone: 'Tabellen met sprookjesfiguren ordenen (personage, sprookje, eigenschap, rol)', howWeAddress: 'Classificatieactiviteiten waarbij kinderen sprookjesfiguren in tabellen ordenen op meerdere kenmerken bouwen gegevensordening op' },
      { milestone: 'Verhaalstructuur analyseren (begin, probleem, oplossing, moraal identificeren)', howWeAddress: 'Leesactiviteiten waarbij kinderen de structuur van bekende sprookjes analyseren en vergelijken bouwen leesbegrip en literair bewustzijn op' },
      { milestone: 'Een eigen sprookje schrijven met dialoog en moraal (verhalend schrijven op geavanceerd niveau)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een eigen sprookje bedenken met personages, een probleem, dialoog en een moraal oefenen verhalend schrijven met structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk redactiesommen tot \u00e9\u00e9n bewerking in sprookjescontext, bied een verhaalplanner aan met afbeeldingen en laat een sprookje schrijven met een verhaalkader. Voor gevorderde kinderen: introduceer meerstapssommen met drie bewerkingen, laat hen twee sprookjes vergelijken op structuur en thema en daag hen uit met een uitgebreid sprookje met meerdere personages, dialoog en een verrassende moraal.',
    parentTakeaway: 'Sprookjes maken rekenen magisch in groep 4. Lees samen een sprookje en stel rekenvragen: als de reus 3 kippen heeft die elk 7 gouden eieren leggen, hoeveel eieren heeft hij? Als Assepoester 24 appels verdeelt over 4 dwergen, hoeveel krijgt ieder? Na een sprookjeswerkblad kunt u samen een eigen sprookje bedenken \u2014 wie is de held, wat is het probleem, hoe wordt het opgelost en wat is de les?',
    classroomIntegration: 'Het sprookjesthema integreert in groep 4 met rekenen (meerstapssommen, vermenigvuldigen, tabellen), taal (verhaalanalyse, verhalend schrijven, dialoog), sociaal-emotioneel leren (moraal, empathie, keuzes) en beeldende vorming (sprookjesillustraties). Een sprookjesproject met werkbladen, een verhaalanalyse en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Meerstaps-redactiesommen in sprookjescontext', emerging: 'lost \u00e9\u00e9nstapssommen op in sprookjescontext maar combineert geen bewerkingen', proficient: 'lost zelfstandig tweestapssommen op met vermenigvuldiging en aftrekking in sprookjescontext', advanced: 'lost driestapssommen op, bedenkt eigen sprookjesrekenvragen en controleert het antwoord' },
      { skill: 'Verhaalstructuur analyseren', emerging: 'benoemt het begin en einde maar identificeert probleem en oplossing niet', proficient: 'identificeert zelfstandig begin, probleem, oplossing en moraal van een sprookje', advanced: 'vergelijkt de structuur van twee sprookjes, herkent thematische overeenkomsten en formuleert de moraal in eigen woorden' },
      { skill: 'Eigen sprookje schrijven', emerging: 'schrijft een kort verhaal maar zonder duidelijke structuur of moraal', proficient: 'schrijft een sprookje met personages, probleem, oplossing, dialoog en moraal', advanced: 'schrijft een uitgebreid sprookje met meerdere personages, beschrijvende sfeerpassages en een verrassende wending' },
    ],
  },

  farm: {
    seoTitle: 'Boerderij-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare boerderij-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'boerderij groep 4, boerderij oefeningen 7\u20138 jaar, boerderij oefeningen groep 4, boerderij uitprintbaar groep 4, boerderij werkbladen groep 4, boerderij activiteiten groep 4, boerderij leerbladen 7\u20138 jaar, boerderij gratis groep 4, boerderij PDF groep 4, boerderij rekenen groep 4',
    snippetAnswer: 'Boerderij-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met landbouw: vermenigvuldigen van oogst en vee, eerlijk verdelen van producten, tabellen met boerderijgegevens, meten van akkeroppervlaktes en informatieve teksten over landbouw schrijven. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het boerderijthema een praktische context voor vermenigvuldigen, verdelen en meten: zeven- en achtjarigen begrijpen de boerderij als voedselbron en die kennis maakt rekenen met oogsten, vee en oppervlaktes bijzonder betekenisvol. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, eerlijk verdelen en informatief schrijven als kerndoelen, en de boerderij biedt alle vier. Vermenigvuldiging met vee \u2014 elke koe geeft 8 liter melk per dag, hoeveel liter bij 5 koeien? \u2014 maakt de tafels agrarisch. Eerlijk verdelen van oogst \u2014 72 appels over 9 bakken, hoeveel per bak? \u2014 introduceert delen in een functionele context. Meten van akkeroppervlaktes \u2014 het weiland is 50 meter lang en 20 meter breed \u2014 past oppervlakteberekening toe. Tabellen met boerderijgegevens over melkproductie, eieropbrengst en oogstgewicht bouwen datageletterdheid op. Het schrijven van een informatieve tekst over een boerderijbedrijf oefent gestructureerd schrijven met feiten.',
    developmentalMilestones: [
      { milestone: 'Vermenigvuldigen met vee en oogst (7\u20138-jarigen berekenen opbrengst per dier of plant)', howWeAddress: 'Opbrengstactiviteiten waarbij kinderen melkliters, eieren en oogstgewicht vermenigvuldigen met het aantal dieren of planten maken de tafels agrarisch' },
      { milestone: 'Eerlijk verdelen van boerderijproducten (oogst over bakken, melk over flessen)', howWeAddress: 'Verdeelactiviteiten waarbij kinderen producten gelijk verdelen en de deelsom noteren introduceren delen in een functionele boerderijcontext' },
      { milestone: 'Oppervlakteberekening van akkers en weilanden (lengte maal breedte)', howWeAddress: 'Meetactiviteiten waarbij kinderen akkerformaten berekenen introduceren oppervlakte als lengte maal breedte in een betekenisvolle context' },
      { milestone: 'Informatief schrijven over een boerderijbedrijf (productie, dieren, seizoenen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een informatieve tekst over een type boerderij schrijven oefenen gestructureerd schrijven met feiten en structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vermenigvuldiging tot de tafels van 2 en 5 met boerderijplaatjes, bied verdeelsommen aan met even aantallen en laat een tekst schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer tafels tot 10 met complexe opbrengstsommen, laat hen oppervlaktes berekenen en vergelijken en daag hen uit met een compleet boerderijbedrijfsplan inclusief productieberekening, verdeelschema en informatieve tekst.',
    parentTakeaway: 'De boerderij biedt praktische rekenkansen in groep 4. Reken samen: als elke kip 1 ei per dag legt en er zijn 7 kippen, hoeveel eieren in een week? Als je 60 aardappels hebt en ze in zakken van 5 doet, hoeveel zakken heb je nodig? Meet samen de tuin: hoe lang en hoe breed, en hoeveel vierkante meter is dat? Na een boerderijwerkblad kunt u samen een tekst schrijven over hoe voedsel van de boerderij naar uw bord komt.',
    classroomIntegration: 'Het boerderijthema integreert in groep 4 met rekenen (vermenigvuldigen, verdelen, oppervlakte, tabellen), taal (informatief schrijven, landbouwwoordenschat), natuur en techniek (voedselproductie, seizoenen, duurzaamheid) en aardrijkskunde (landbouwgebieden, landschap). Een boerderijproject met werkbladen, een productieberekening en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vermenigvuldigen met boerderijopbrengst', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp maar past dit niet toe bij meerdere dieren', proficient: 'berekent zelfstandig opbrengsten met de tafels van 1\u20135 en noteert de berekening correct', advanced: 'berekent complexe opbrengsten over meerdere dagen en dieren en vergelijkt resultaten' },
      { skill: 'Eerlijk verdelen van producten', emerging: 'verdeelt met hulp maar noteert de deelsom niet correct', proficient: 'verdeelt zelfstandig en noteert de deelsom correct, inclusief controle via vermenigvuldiging', advanced: 'verdeelt met rest, berekent hoeveel extra nodig is en noteert de complete berekening' },
      { skill: 'Informatief schrijven over landbouw', emerging: 'schrijft losse feiten over de boerderij maar organiseert ze niet', proficient: 'schrijft een gestructureerde tekst met inleiding, feiten over productie en een slot', advanced: 'schrijft een uitgebreid verslag met kopjes, vergelijkingen en een productieoverzicht' },
    ],
  },

  flowers: {
    seoTitle: 'Bloemen-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare bloemen-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'bloemen groep 4, bloemen oefeningen 7\u20138 jaar, bloemen oefeningen groep 4, bloemen uitprintbaar groep 4, bloemen werkbladen groep 4, bloemen activiteiten groep 4, bloemen leerbladen 7\u20138 jaar, bloemen gratis groep 4, bloemen PDF groep 4, bloemen rekenen groep 4',
    snippetAnswer: 'Bloemen-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met plantkunde: vermenigvuldigen van bloembollen en blaadjes, meten van groei in centimeters, tabellen met bloemgegevens, symmetrie in bloemen en het schrijven van een beschrijvende tekst over bloemen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het bloementhema een natuurwetenschappelijke context voor meten, vermenigvuldigen en symmetrie: zeven- en achtjarigen kunnen systematisch plantgroei meten en de resultaten verwerken in tabellen en grafieken. De SLO-leerlijnen benadrukken meten in standaardeenheden, vermenigvuldigen, meetkunde en beschrijvend schrijven als kerndoelen, en bloemen bieden alle vier. Meten van groei in centimeters \u2014 elke week de plant meten en de groei berekenen \u2014 oefent meten en aftrekken met standaardeenheden. Vermenigvuldiging met bloembollen \u2014 elke bol geeft 3 bloemen, je plant 8 bollen, hoeveel bloemen verwacht je? \u2014 maakt de tafels botanisch. Symmetrie in bloemen \u2014 bloemblaadjes tellen en symmetrielijnen tekenen \u2014 introduceert meetkundige concepten. Tabellen met bloemgegevens over bloeitijd, hoogte en kleur bouwen datageletterdheid op. Het schrijven van een beschrijvende tekst over een bloem oefent zintuiglijk beschrijvend schrijven met geur, kleur en textuur.',
    developmentalMilestones: [
      { milestone: 'Plantgroei meten en de groei berekenen (7\u20138-jarigen meten wekelijks en vergelijken)', howWeAddress: 'Groeiproject-activiteiten waarbij kinderen wekelijks hun plant meten en de groei per week berekenen oefenen meten en aftrekken met standaardeenheden' },
      { milestone: 'Vermenigvuldigen met bloembollen en blaadjes (opbrengst per bol berekenen)', howWeAddress: 'Bollenactiviteiten waarbij kinderen het verwachte aantal bloemen berekenen door bollen te vermenigvuldigen met bloemen per bol maken de tafels botanisch' },
      { milestone: 'Symmetrie herkennen en tekenen in bloemen (symmetrielijnen, bloemblaadjes tellen)', howWeAddress: 'Symmetrieactiviteiten waarbij kinderen bloemen analyseren op symmetrielijnen en de andere helft tekenen introduceren meetkundige concepten' },
      { milestone: 'Beschrijvend schrijven over een bloem (geur, kleur, textuur, groeiwijze)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een bloem beschrijven met zintuiglijke details oefenen beschrijvend schrijven met precieze woorden' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk meten tot hele centimeters met een vereenvoudigde groeitabel, bied vermenigvuldigsommen aan met de tafels van 2 en 5 en bloemenplaatjes, en schrijf een bloemenbeschrijving met een zintuiglijke woordenbank. Voor gevorderde kinderen: introduceer meten in millimeters met groeigrafieken, laat hen een bloemencatalogus maken met vermenigvuldiging van prijzen en aantallen en daag hen uit met een beschrijvende tekst die vergelijking en beeldspraak gebruikt.',
    parentTakeaway: 'Bloemen bieden prachtige rekenkansen in groep 4. Plant samen bollen en meet elke week de groei: hoeveel centimeter deze week, hoeveel in totaal? Als elke tulpenbol 1 bloem geeft en je plant er 12, hoeveel tulpen verwacht je? Tel de blaadjes van een bloem en zoek de symmetrie. Na een bloemenwerkblad kunt u samen een bloem beschrijven \u2014 welke kleur, hoe ruikt hij, hoe voelen de blaadjes, hoe hoog is de stengel?',
    classroomIntegration: 'Het bloementhema integreert in groep 4 met rekenen (meten, vermenigvuldigen, symmetrie, tabellen), taal (beschrijvend schrijven, plantenwoordenschat), natuur en techniek (plantkunde, groei, bestuiving) en beeldende vorming (bloemen tekenen, symmetrie). Een bloemenproject met werkbladen, een groeiexperiment en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Plantgroei meten en berekenen', emerging: 'meet de plant maar berekent de groei per week niet zelfstandig', proficient: 'meet wekelijks correct in centimeters en berekent de groei per week door aftrekking', advanced: 'meet nauwkeurig, maakt een groeigrafiek en trekt conclusies over groeipatronen' },
      { skill: 'Vermenigvuldigen met bloemencontexten', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp', proficient: 'berekent zelfstandig bloemaantallen met de tafels van 1\u20135 en noteert de berekening', advanced: 'berekent complexe bloemenopbrengsten over meerdere weken en vergelijkt de resultaten' },
      { skill: 'Beschrijvend schrijven over bloemen', emerging: 'noemt kleur en naam maar beschrijft niet met zintuiglijke details', proficient: 'schrijft een beschrijving met kleur, geur, textuur en groeiwijze', advanced: 'schrijft een rijke beschrijving met vergelijkingen, beeldspraak en wetenschappelijke details' },
    ],
  },

  food: {
    seoTitle: 'Eten-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare eten-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'eten groep 4, eten oefeningen 7\u20138 jaar, eten oefeningen groep 4, eten uitprintbaar groep 4, eten werkbladen groep 4, eten activiteiten groep 4, eten leerbladen 7\u20138 jaar, eten gratis groep 4, eten PDF groep 4, eten rekenen groep 4',
    snippetAnswer: 'Eten-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met voedselthema\u2019s: boodschappenbudget berekenen, vermenigvuldigen van porties, breukenintroductie bij het verdelen van pizza en taart, tabellen met voedingswaarden en het schrijven van een menuplan. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het etenthema een functionele context voor geldrekenen, breuken en gegevensanalyse: zeven- en achtjarigen helpen bij boodschappen en koken en die dagelijkse ervaring maakt rekenen met prijzen, porties en voedingswaarden bijzonder relevant. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, introductie van breuken en functioneel schrijven als kerndoelen, en eten biedt alle vier. Boodschappenbudget berekenen \u2014 3 broden van 2 euro en 4 liter melk van 1 euro, hoeveel in totaal? \u2014 oefent vermenigvuldiging met geld. Breukenintroductie bij het verdelen van pizza \u2014 een pizza in 8 stukken, ieder krijgt 2 stukken, welk deel is dat? \u2014 maakt breuken smakelijk. Tabellen met voedingswaarden \u2014 calorie\u00ebn, eiwitten, suikers per voedingsmiddel \u2014 bouwen datageletterdheid op met gezondheidscontext. Het schrijven van een menuplan met ingredi\u00ebnten, hoeveelheden en kosten oefent functioneel schrijven met overzichtstabellen.',
    developmentalMilestones: [
      { milestone: 'Boodschappenbudget berekenen met vermenigvuldiging (7\u20138-jarigen rekenen met prijzen en hoeveelheden)', howWeAddress: 'Boodschappenactiviteiten waarbij kinderen producten vermenigvuldigen met prijzen en het totaal berekenen oefenen geldrekenen in een dagelijkse context' },
      { milestone: 'Breukenintroductie bij het verdelen van voedsel (pizza, taart, chocoladereep)', howWeAddress: 'Verdeelactiviteiten waarbij kinderen pizza in gelijke stukken verdelen en de breuk benoemen maken breuken concreet en smakelijk' },
      { milestone: 'Tabellen met voedingswaarden lezen (calorie\u00ebn, suikers per portie vergelijken)', howWeAddress: 'Tabelactiviteiten waarbij kinderen voedingswaarden aflezen en vergelijken bouwen datageletterdheid op met gezondheidsrelevante inhoud' },
      { milestone: 'Functioneel schrijven: menuplan met ingredi\u00ebnten en kosten (overzichtstabel)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een weekmenuplan opstellen met ingredi\u00ebnten, hoeveelheden en totaalkosten oefenen functioneel schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk budgetten tot optellen tot 50 met ronde bedragen, bied breuken aan als halven met concrete pizza-illustraties en laat een menuplan schrijven voor \u00e9\u00e9n dag. Voor gevorderde kinderen: introduceer budgetten tot 100 met wisselgeldberekening, laat hen breuken toepassen bij kwarten en achtsten en daag hen uit met een compleet weekmenuplan inclusief boodschappenlijst, kostenberekening en voedingsoverwegingen.',
    parentTakeaway: 'Eten biedt dagelijkse rekenkansen in groep 4. Ga samen boodschappen doen en laat uw kind meerekenen: hoeveel kosten 3 zakken chips van 2 euro? Als de pizza in 8 stukken is gesneden en er zijn 4 personen, hoeveel stukken krijgt ieder? Lees samen een voedseletiket: hoeveel suiker zit hierin, en in die andere? Na een etenwerkblad kunt u samen een menuplan maken \u2014 wat eten we deze week, wat hebben we nodig en hoeveel kost het?',
    classroomIntegration: 'Het etenthema integreert in groep 4 met rekenen (vermenigvuldigen met prijzen, breuken, tabellen), taal (functioneel schrijven, voedselwoordenschat), natuur en techniek (voedingsstoffen, gezondheid) en burgerschap (voedselkeuzes, duurzaamheid). Een voedselproject met werkbladen, een boodschappenopdracht en een menuschrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Boodschappenbudget berekenen', emerging: 'telt twee productprijzen op maar vermenigvuldigt niet zelfstandig', proficient: 'berekent zelfstandig een boodschappenbudget met vermenigvuldiging en optelling en noteert het totaal', advanced: 'vergelijkt budgetten voor twee boodschappenlijsten, berekent wisselgeld en kiest de voordeligste optie' },
      { skill: 'Breuken met voedsel', emerging: 'herkent een halve pizza visueel maar benoemt de breuk niet correct', proficient: 'benoemt halven en kwarten correct en past ze toe bij het verdelen van voedsel', advanced: 'werkt met achtsten, vergelijkt breuken en berekent hoeveel stukken ieder krijgt bij ongelijke verdeling' },
      { skill: 'Functioneel schrijven: menuplan', emerging: 'schrijft een lijst met maaltijden maar zonder hoeveelheden of kosten', proficient: 'schrijft een menuplan met ingredi\u00ebnten, hoeveelheden en totaalkosten voor drie dagen', advanced: 'schrijft een compleet weekmenuplan met boodschappenlijst, kostenberekening en voedingsoverwegingen' },
    ],
  },

  forest: {
    seoTitle: 'Bos-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare bos-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'bos groep 4, bos oefeningen 7\u20138 jaar, bos oefeningen groep 4, bos uitprintbaar groep 4, bos werkbladen groep 4, bos activiteiten groep 4, bos leerbladen 7\u20138 jaar, bos gratis groep 4, bos PDF groep 4, bos rekenen groep 4',
    snippetAnswer: 'Bos-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met bosecologie: vermenigvuldigen van bomen en dieren, oppervlakteberekening van bosdelen, tabellen met bosgegevens, meten van boomhoogtes en het schrijven van een informatieve tekst over het ecosysteem bos. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het bosthema een ecologische context voor meten, vermenigvuldigen en gegevensverwerking: zeven- en achtjarigen kunnen het bos als ecosysteem begrijpen en die diepere kennis maakt rekenen met boomtellingen, oppervlaktes en dierenaantallen bijzonder betekenisvol. De SLO-leerlijnen benadrukken meten in standaardeenheden, vermenigvuldigen, gegevensverwerking en informatief schrijven als kerndoelen, en het bos biedt alle vier. Vermenigvuldiging met bomen \u2014 op elke hectare staan 50 bomen, hoeveel op 4 hectare? \u2014 maakt de tafels ecologisch. Oppervlakteberekening van bosdelen \u2014 het bos is 80 meter lang en 60 meter breed \u2014 introduceert grotere oppervlakteberekeningen. Tabellen met bosgegevens over boomsoorten, dieraantallen en seizoensveranderingen bouwen datageletterdheid op met ecologische inhoud. Meten van boomhoogtes met schaduwmethoden introduceert indirect meten. Het schrijven van een informatieve tekst over het bosecosysteem oefent gestructureerd schrijven met wetenschappelijke feiten.',
    developmentalMilestones: [
      { milestone: 'Vermenigvuldigen met bomen en bosdieren (7\u20138-jarigen berekenen aantallen per oppervlakte)', howWeAddress: 'Bostelactiviteiten waarbij kinderen bomen en dieren per oppervlakte-eenheid vermenigvuldigen maken de tafels ecologisch en grootschalig' },
      { milestone: 'Oppervlakteberekening van bosdelen (lengte maal breedte met grotere getallen)', howWeAddress: 'Kaartactiviteiten waarbij kinderen bosoppervlaktes berekenen introduceren oppervlakte met getallen tot 100 in een betekenisvolle context' },
      { milestone: 'Tabellen met bosgegevens interpreteren (boomsoorten, aantallen, seizoensveranderingen)', howWeAddress: 'Tabelactiviteiten met ecologische bosgegevens bouwen datageletterdheid op terwijl kinderen seizoenspatronen ontdekken' },
      { milestone: 'Informatief schrijven over het bosecosysteem (bomen, dieren, voedselketens)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een informatieve tekst over het bos schrijven met kopjes, feiten en een voedselketen oefenen wetenschappelijk schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vermenigvuldiging tot de tafels van 2 en 5 met bosplaatjes, bied eenvoudige oppervlaktes aan tot 50 en laat een bostext schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer vermenigvuldiging met grotere getallen en oppervlakteberekeningen tot 100, laat hen een bosinventarisatie maken met tabel en grafiek en daag hen uit met een uitgebreid verslag over een voedselketen in het bos.',
    parentTakeaway: 'Het bos biedt rijke rekenkansen in groep 4. Ga samen het bos in en tel: hoeveel bomen tel je in een rij, hoeveel rijen zie je, hoeveel bomen bij elkaar? Schat de hoogte van een boom: als je schaduw 1 meter is en je bent 1,5 meter lang, en de boomschaduw is 10 meter, hoe hoog is de boom? Na een boswerkblad kunt u samen een tekst schrijven over wat het bos bijzonder maakt \u2014 welke bomen groeien er, welke dieren leven er en wie eet wie?',
    classroomIntegration: 'Het bosthema integreert in groep 4 met rekenen (vermenigvuldigen, oppervlakte, tabellen en grafieken), taal (informatief schrijven, ecologische woordenschat), natuur en techniek (ecosystemen, voedselketens, biodiversiteit) en aardrijkskunde (bossen in Nederland, landschappen). Een bosproject met werkbladen, een bosexcursie en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vermenigvuldigen met boscontexten', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp maar past dit niet toe bij grotere getallen', proficient: 'berekent zelfstandig boom- en dieraantallen met de tafels van 1\u20135 en noteert de berekening', advanced: 'lost complexe bossommen op met vermenigvuldiging, optelling en vergelijking en controleert het antwoord' },
      { skill: 'Oppervlakteberekening van bosdelen', emerging: 'herkent lengte en breedte maar berekent de oppervlakte niet zelfstandig', proficient: 'berekent de oppervlakte van een rechthoekig bosdeel correct als lengte maal breedte', advanced: 'berekent oppervlaktes van meerdere bosdelen, telt ze op en vergelijkt de totalen' },
      { skill: 'Informatief schrijven over het bos', emerging: 'schrijft losse feiten over het bos maar organiseert ze niet', proficient: 'schrijft een gestructureerde tekst met inleiding, feiten over bomen en dieren en een slot', advanced: 'schrijft een uitgebreid verslag met kopjes, een voedselketendiagram en vergelijking tussen boomsoorten' },
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

  // Check if already enriched (seoTitle in second-grade block)
  const secondGradeIdx = content.indexOf("'second-grade'");
  const thirdGradeIdx = content.indexOf("'third-grade'");

  if (secondGradeIdx === -1 || thirdGradeIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  const secondGradeBlock = content.substring(secondGradeIdx, thirdGradeIdx);
  if (secondGradeBlock.includes('seoTitle:')) {
    console.log(`SKIP (already enriched): ${theme}/nl.ts`);
    continue;
  }

  // STEP 1: Insert seoTitle/seoDescription/seoKeywords right after "'second-grade': {"
  const secondGradeOpenPattern = "'second-grade': {";
  const secondGradeOpenIdx = content.indexOf(secondGradeOpenPattern);
  if (secondGradeOpenIdx === -1) {
    console.error(`NO SECOND-GRADE OPEN FOUND: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  const seoInsertPos = secondGradeOpenIdx + secondGradeOpenPattern.length;
  const seoText = '\n' + buildSeoInsertionText(enrichments[theme]);
  content = content.substring(0, seoInsertPos) + seoText + content.substring(seoInsertPos);

  // STEP 2: Insert 7 enrichment fields after faq array (recalculate positions after insertion)
  const newSecondGradeIdx = content.indexOf("'second-grade'");
  const newThirdGradeIdx = content.indexOf("'third-grade'");
  const newSecondGradeBlock = content.substring(newSecondGradeIdx, newThirdGradeIdx);

  // Find the last "],\n" in the second-grade block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(newSecondGradeBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const enrichInsertPos = newSecondGradeIdx + lastMatch.index + lastMatch[0].length;
  const enrichText = buildEnrichmentInsertionText(enrichments[theme]) + '\n';
  content = content.substring(0, enrichInsertPos) + enrichText + content.substring(enrichInsertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/nl.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount}/${themes.length} enriched, ${errorCount} errors`);
