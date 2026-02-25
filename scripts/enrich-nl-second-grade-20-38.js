#!/usr/bin/env node
/**
 * SEO Part 328: NL Second-Grade Enrichment \u2014 Themes 20-38
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the second-grade grade block of 19 NL theme files (fruits through space).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  fruits: {
    seoTitle: 'Fruit-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare fruit-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'fruit groep 4, fruit oefeningen 7\u20138 jaar, fruit oefeningen groep 4, fruit uitprintbaar groep 4, fruit werkbladen groep 4, fruit activiteiten groep 4, fruit leerbladen 7\u20138 jaar, fruit gratis groep 4, fruit PDF groep 4, fruit rekenen groep 4',
    snippetAnswer: 'Fruit-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met voedingswetenschap: breuken met fruitdelen, vermenigvuldigen van porties, tabellen met voedingswaarden, redactiesommen over fruitoogst en informatief schrijven over de reis van boerderij naar bord. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het fruitthema een rijke context voor breukenintroductie en dataverwerking: zeven- en achtjarigen begrijpen dat een appel in halven of kwarten kan worden gesneden en die vertrouwdheid biedt de meest intu\u00eftieve ingang voor breuken. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, breukenintroductie en informatief schrijven als kerndoelen, en fruit biedt alle vier in een smakelijke context. Breuken worden tastbaar wanneer kinderen ge\u00efllustreerd fruit in halven, kwarten en derden verdelen en de bijbehorende breuknotatie schrijven. Vermenigvuldigen met porties \u2014 elk gezinslid eet 2 porties fruit per dag, hoeveel porties voor 4 personen in 5 dagen? \u2014 oefent de tafels in een voedingscontext. Tabellen met voedingswaarden van verschillende fruitsoorten introduceren gegevensanalyse met betekenisvol materiaal. Redactiesommen over fruitoogst en -transport vereisen meerstapsberekeningen. Het schrijven van een informatieve tekst over de reis van een vrucht van boerderij naar bord oefent gestructureerd schrijven met feitelijke onderbouwing en chronologische ordening.',
    developmentalMilestones: [
      { milestone: 'Breukenintroductie met fruitmodellen (7\u20138-jarigen verdelen fruit in gelijke delen)', howWeAddress: 'Breukactiviteiten waarbij kinderen ge\u00efllustreerd fruit in halven, kwarten en derden verdelen en de breuknotatie schrijven maken abstracte breuken tastbaar en visueel' },
      { milestone: 'Vermenigvuldigen met fruitporties (hoeveelheden per persoon per dag berekenen)', howWeAddress: 'Portieberekeningen waarbij kinderen dagelijkse fruitconsumptie vermenigvuldigen voor een gezin of klas oefenen de tafels in een voedingscontext' },
      { milestone: 'Tabellen met voedingswaarden lezen en interpreteren (vitaminen, calorie\u00ebn per fruitsoort)', howWeAddress: 'Tabelactiviteiten waarbij kinderen voedingsgegevens van fruitsoorten vergelijken en vragen beantwoorden bouwen datageletterdheid op met gezondheidsrelevante informatie' },
      { milestone: 'Informatief schrijven over de fruitreis (van boerderij naar bord met chronologische ordening)', howWeAddress: 'Schrijfopdrachten waarbij kinderen de reis van een vrucht beschrijven met stappen als planten, groeien, oogsten, vervoeren en verkopen oefenen informatief schrijven met chronologie' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk breuken tot halven met visuele fruitmodellen, bied vermenigvuldigsommen aan met de tafels van 2 en 5 en fruitplaatjes, en laat een informatieve tekst schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer breuken tot achtsten met equivalente breuken, laat hen meerstaps-voedingsberekeningen uitvoeren en daag hen uit met een uitgebreid fruitverslag inclusief voedingstabel en grafiek.',
    parentTakeaway: 'Fruit biedt dagelijkse rekenkansen in groep 4. Snijd samen een appel in kwarten: hoeveel stukken, welk deel is elk stuk? Als iedereen 2 porties fruit per dag eet en er zijn 4 gezinsleden, hoeveel stuks fruit heb je per week nodig? Lees samen de voedingswaarden op een fruitverpakking: hoeveel vitamine C zit er in een sinaasappel? Na een fruitwerkblad kunt u samen de reis van een vrucht beschrijven \u2014 waar groeit het, hoe wordt het geoogst en hoe komt het in de winkel?',
    classroomIntegration: 'Het fruitthema integreert in groep 4 met rekenen (breuken met fruitdelen, vermenigvuldigen van porties, tabellen), taal (informatief schrijven, voedingswoordenschat), natuur en techniek (voeding, plantengroei, voedselproductie) en gezond gedrag (voedingskeuzes, de schijf van vijf). Een fruitproject met werkbladen, een klassenenqu\u00eate en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Breuken met fruitmodellen', emerging: 'herkent halven maar heeft moeite met kwarten en de bijbehorende notatie', proficient: 'verdeelt fruit correct in halven en kwarten, schrijft de breuknotatie en vergelijkt eenvoudige breuken', advanced: 'werkt met halven, kwarten, derden en achtsten, ontdekt equivalente breuken en past ze toe in nieuwe contexten' },
      { skill: 'Vermenigvuldigen met fruitporties', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp maar past dit niet toe in portieberekeningen', proficient: 'berekent zelfstandig porties voor een gezin met de tafels van 1\u20135 en noteert de berekening correct', advanced: 'lost meerstaps-voedingsberekeningen op, combineert vermenigvuldiging met optelling en vergelijkt uitkomsten' },
      { skill: 'Informatief schrijven over fruit', emerging: 'schrijft losse feiten over fruit maar ordent ze niet chronologisch', proficient: 'schrijft een gestructureerde tekst over de fruitreis met inleiding, chronologische stappen en slot', advanced: 'schrijft een uitgebreid fruitverslag met kopjes, een voedingstabel en vergelijking tussen fruitsoorten' },
    ],
  },

  furniture: {
    seoTitle: 'Meubels-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare meubels-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'meubels groep 4, meubels oefeningen 7\u20138 jaar, meubels oefeningen groep 4, meubels uitprintbaar groep 4, meubels werkbladen groep 4, meubels activiteiten groep 4, meubels leerbladen 7\u20138 jaar, meubels gratis groep 4, meubels PDF groep 4, meubels rekenen groep 4',
    snippetAnswer: 'Meubels-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met interieurontwerp: meten van meubels in centimeters, vermenigvuldigen van stoelen en tafels, plattegronden tekenen op ruitjespapier, redactiesommen over kamerinrichting en beschrijvend schrijven over meubelstukken. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het meubelthema een praktische context voor meten en ruimtelijk redeneren: zeven- en achtjarigen gebruiken dagelijks meubels en die vertrouwdheid maakt meten, plattegronden en vermenigvuldigen bijzonder concreet. De SLO-leerlijnen benadrukken meten in standaardeenheden, vermenigvuldigen, ruimtelijk inzicht en beschrijvend schrijven als kerndoelen, en meubels bieden alle vier. Meetactiviteiten waarbij kinderen de lengte, breedte en hoogte van tafels, stoelen en kasten meten in centimeters oefenen standaardeenheden aan vertrouwde voorwerpen. Vermenigvuldigsommen \u2014 in een klaslokaal staan 6 rijen van 5 stoelen, hoeveel stoelen in totaal? \u2014 maken de tafels ruimtelijk zichtbaar. Plattegronden tekenen op ruitjespapier waarbij meubels op schaal worden geplaatst introduceert ruimtelijk redeneren en schaaldenken. Redactiesommen over kamerinrichting \u2014 de kamer is 4 meter breed en de kast is 120 centimeter, past de kast twee keer naast elkaar? \u2014 vereisen meerstapsberekeningen met eenheden. Beschrijvend schrijven over een meubelstuk oefent gedetailleerd beschrijven met maten, materialen en functie.',
    developmentalMilestones: [
      { milestone: 'Meten van meubels in standaardeenheden (7\u20138-jarigen meten lengte, breedte en hoogte in centimeters)', howWeAddress: 'Meetactiviteiten waarbij kinderen echte meubels meten met een meetlint en de resultaten in een tabel noteren bouwen meetvaardigheden op met vertrouwde voorwerpen' },
      { milestone: 'Vermenigvuldigen met meubelaantallen (rijen stoelen, stapels dozen)', howWeAddress: 'Klaslokaal-rekenactiviteiten waarbij kinderen rijen maal kolommen berekenen voor stoelen en tafels maken vermenigvuldiging ruimtelijk en zichtbaar' },
      { milestone: 'Plattegronden tekenen op ruitjespapier (meubels plaatsen op een vereenvoudigde schaal)', howWeAddress: 'Plattegrondactiviteiten waarbij kinderen een kamer intekenen en meubels op schaal plaatsen ontwikkelen ruimtelijk inzicht en schaaldenken' },
      { milestone: 'Beschrijvend schrijven over een meubelstuk (materiaal, afmetingen, functie)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een meubelstuk beschrijven met maten, materiaal en gebruik oefenen beschrijvend schrijven met technische details' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk meten tot lengte met een liniaal, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met meubelplaatjes, en laat een beschrijving schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer meten van omtrek en oppervlakte, laat hen een volledige plattegrond ontwerpen met meubels op schaal en daag hen uit met een kamerinrichtingsproject inclusief budget en matenlijst.',
    parentTakeaway: 'Meubels bieden praktische meetkansen in groep 4. Meet samen de tafel: hoe lang, hoe breed, hoe hoog in centimeters? Past de nieuwe boekenkast in de hoek als de muur 2 meter breed is en de kast 90 centimeter? Teken samen een plattegrond van de kinderkamer: waar staan het bed, het bureau en de kast? Na een meubelwerkblad kunt u samen een meubelstuk beschrijven \u2014 van welk materiaal is het gemaakt, hoe groot is het en waarvoor gebruik je het?',
    classroomIntegration: 'Het meubelthema integreert in groep 4 met rekenen (meten in centimeters, vermenigvuldigen, plattegronden), taal (beschrijvend schrijven, meubelwoordenschat), natuur en techniek (materialen, ontwerp, duurzaamheid) en beeldende vorming (interieurontwerp). Een meubelproject met werkbladen, een klaslokaalmeting en een ontwerpactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Meten van meubels in centimeters', emerging: 'meet met een liniaal maar noteert niet altijd de juiste eenheid of waarde', proficient: 'meet zelfstandig lengte, breedte en hoogte in centimeters en noteert de resultaten correct', advanced: 'meet nauwkeurig, berekent het verschil tussen meubels en bepaalt of meubels in een ruimte passen' },
      { skill: 'Plattegronden tekenen', emerging: 'tekent meubels maar plaatst ze niet op schaal of in de juiste verhoudingen', proficient: 'tekent een plattegrond op ruitjespapier met meubels op een vereenvoudigde schaal', advanced: 'ontwerpt een volledige kamerindeling met meubels op schaal, berekent beschikbare ruimte en optimaliseert de indeling' },
      { skill: 'Beschrijvend schrijven over meubels', emerging: 'noemt het meubelstuk maar beschrijft het niet gedetailleerd', proficient: 'schrijft een beschrijving met materiaal, afmetingen en functie in volledige zinnen', advanced: 'schrijft een gedetailleerde beschrijving met vergelijking, gebruiksadvies en een persoonlijke beoordeling' },
    ],
  },

  garden: {
    seoTitle: 'Tuin-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare tuin-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'tuin groep 4, tuin oefeningen 7\u20138 jaar, tuin oefeningen groep 4, tuin uitprintbaar groep 4, tuin werkbladen groep 4, tuin activiteiten groep 4, tuin leerbladen 7\u20138 jaar, tuin gratis groep 4, tuin PDF groep 4, tuin rekenen groep 4',
    snippetAnswer: 'Tuin-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met tuinieren: vermenigvuldigen van zaadjes in rijen, oppervlakteberekening van tuinbedden, tabellen met groeigegevens, redactiesommen over oogst en informatief schrijven over plantengroei. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het tuinthema een levende context voor vermenigvuldiging en meten: zeven- en achtjarigen kunnen een schooltuin bijhouden en die praktische ervaring maakt rekenen met rijen, oppervlaktes en groeigegevens bijzonder betekenisvol. De SLO-leerlijnen benadrukken vermenigvuldigen, meten, gegevensverwerking en informatief schrijven als kerndoelen, en de tuin biedt alle vier. Vermenigvuldigsommen met zaadjes \u2014 5 rijen van 8 zaadjes, hoeveel in totaal? \u2014 maken de tafels zichtbaar in een tuinbed. Oppervlakteberekening van tuinbedden \u2014 het bed is 3 meter lang en 2 meter breed, hoeveel vierkante meter? \u2014 introduceert oppervlakte als lengte maal breedte. Groeitabellen bijhouden \u2014 elke week de hoogte van planten meten en noteren \u2014 bouwt datageletterdheid op met levende gegevens. Redactiesommen over oogst \u2014 elke plant levert 6 tomaten, hoeveel leveren 8 planten? \u2014 vereisen vermenigvuldiging in een landbouwcontext. Het schrijven van een informatieve tekst over plantengroei oefent gestructureerd schrijven met chronologie en wetenschappelijke observatie.',
    developmentalMilestones: [
      { milestone: 'Vermenigvuldigen met zaaipatronen (7\u20138-jarigen berekenen aantallen in rijen en kolommen)', howWeAddress: 'Tuinbed-activiteiten waarbij kinderen zaadjes in rijen en kolommen plaatsen en het totaal berekenen maken vermenigvuldiging concreet en visueel' },
      { milestone: 'Oppervlakteberekening van tuinbedden (lengte maal breedte in vierkante meters)', howWeAddress: 'Meetactiviteiten waarbij kinderen de lengte en breedte van tuinbedden meten en de oppervlakte berekenen introduceren oppervlakte als concept' },
      { milestone: 'Groeitabellen bijhouden en interpreteren (wekelijkse metingen van plantenhoogte)', howWeAddress: 'Tabelactiviteiten waarbij kinderen plantenhoogte meten en in een tabel noteren bouwen datageletterdheid op met levende gegevens' },
      { milestone: 'Informatief schrijven over plantengroei (van zaad tot oogst met chronologische ordening)', howWeAddress: 'Schrijfopdrachten over de groeicyclus van een plant met stappen als zaaien, ontkiemen, groeien en oogsten oefenen informatief schrijven met chronologie' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vermenigvuldiging tot de tafels van 2 en 5 met tuinplaatjes, bied oppervlakteberekeningen aan met kleine getallen en een raster, en laat een groeiverslag schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer oppervlakteberekeningen met grotere getallen, laat hen een tuinontwerp maken met meerdere bedden en daag hen uit met een uitgebreid groeirapport inclusief groeigrafiek en vergelijking tussen planten.',
    parentTakeaway: 'De tuin biedt levende rekenkansen in groep 4. Plant samen zaadjes in rijen: 4 rijen van 6 zaadjes, hoeveel in totaal? Meet het tuinbed: hoe lang, hoe breed, hoeveel vierkante meter? Meet elke week samen de hoogte van een plant en zet het in een tabel. Na een tuinwerkblad kunt u samen beschrijven hoe een plant groeit \u2014 van zaad tot oogst, stap voor stap.',
    classroomIntegration: 'Het tuinthema integreert in groep 4 met rekenen (vermenigvuldigen, oppervlakte, groeitabellen), taal (informatief schrijven, tuinwoordenschat), natuur en techniek (plantengroei, fotosynthese, bodem) en burgerschap (duurzaamheid, voedselproductie). Een tuinproject met werkbladen, een schooltuinmeting en een groeirapport combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vermenigvuldigen met zaaipatronen', emerging: 'telt zaadjes \u00e9\u00e9n voor \u00e9\u00e9n maar vermenigvuldigt niet zelfstandig rijen maal kolommen', proficient: 'berekent zelfstandig het totaal aantal zaadjes via rijen maal kolommen en noteert de berekening', advanced: 'ontwerpt eigen zaaipatronen, berekent het totaal en optimaliseert de verdeling over het tuinbed' },
      { skill: 'Oppervlakteberekening', emerging: 'meet lengte en breedte maar berekent de oppervlakte niet zelfstandig als product', proficient: 'berekent de oppervlakte correct als lengte maal breedte en noteert de eenheid (m\u00b2)', advanced: 'berekent oppervlaktes van meerdere tuinbedden, telt ze op en vergelijkt de totalen' },
      { skill: 'Informatief schrijven over plantengroei', emerging: 'schrijft losse feiten over planten maar ordent ze niet chronologisch', proficient: 'schrijft een gestructureerde tekst over de groeicyclus met inleiding, chronologische stappen en slot', advanced: 'schrijft een uitgebreid groeirapport met kopjes, een groeigrafiek en vergelijking tussen plantensoorten' },
    ],
  },

  halloween: {
    seoTitle: 'Halloween-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare halloween-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'halloween groep 4, halloween oefeningen 7\u20138 jaar, halloween oefeningen groep 4, halloween uitprintbaar groep 4, halloween werkbladen groep 4, halloween activiteiten groep 4, halloween leerbladen 7\u20138 jaar, halloween gratis groep 4, halloween PDF groep 4, halloween rekenen groep 4',
    snippetAnswer: 'Halloween-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met griezelig plezier: vermenigvuldigen van snoepjes per deur, budgetberekeningen voor kostuums, tabellen met snoeptelling, redactiesommen over trick-or-treat-routes en het schrijven van een spannend halloweenverhaal. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het halloweenthema een spannende context voor vermenigvuldiging en budgetrekenen: zeven- en achtjarigen zijn enthousiast over Halloween en die motivatie maakt rekenen met snoep, kostuums en routes bijzonder effectief. De SLO-leerlijnen benadrukken vermenigvuldigen, rekenen tot 100, gegevensverwerking en creatief schrijven als kerndoelen, en Halloween biedt alle vier in een feestelijke setting. Vermenigvuldigsommen met snoepjes \u2014 bij elke deur krijg je 3 snoepjes, hoeveel na 8 deuren? \u2014 oefenen de tafels in een motiverende context. Budgetberekeningen voor kostuums \u2014 de cape kost 12 euro, het masker 8 euro, de schmink 5 euro, hoeveel bij elkaar? \u2014 oefenen optellen en vergelijken met geld. Tabellen met snoeptelling \u2014 hoeveel van elk soort snoep \u2014 bouwen datageletterdheid op. Redactiesommen over trick-or-treat-routes vereisen meerstapsberekeningen met afstanden en aantallen. Het schrijven van een spannend halloweenverhaal oefent creatief schrijven met spanning, beschrijving en dialoog.',
    developmentalMilestones: [
      { milestone: 'Vermenigvuldigen met snoepverdeling (7\u20138-jarigen berekenen totalen per deur en per kind)', howWeAddress: 'Trick-or-treat-rekenactiviteiten waarbij kinderen snoepjes per deur vermenigvuldigen en het totaal berekenen oefenen de tafels in een feestelijke context' },
      { milestone: 'Budgetberekeningen voor kostuums (kosten van onderdelen optellen en vergelijken)', howWeAddress: 'Kostuum-budgetactiviteiten waarbij kinderen onderdelen prijzen en het totaal berekenen oefenen geldrekenen met een creatief doel' },
      { milestone: 'Tabellen met snoepgegevens interpreteren (sorteren, tellen en vergelijken)', howWeAddress: 'Snoeptelling-activiteiten waarbij kinderen hun verzameling sorteren, in een tabel zetten en vergelijkingsvragen beantwoorden bouwen datageletterdheid op' },
      { milestone: 'Creatief schrijven: spannend halloweenverhaal (spanning, beschrijving, dialoog)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een halloweenverhaal schrijven met een griezelige setting, personages en een spannende ontknoping oefenen creatief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vermenigvuldiging tot de tafels van 2 en 5 met snoepplaatjes, bied budgetsommen aan met ronde bedragen tot 50 en laat een halloweenverhaal schrijven met een verhaalkader. Voor gevorderde kinderen: introduceer tafels tot 10 met complexe snoepverdelingen, laat hen een compleet halloweenbudget opstellen met vergelijking en daag hen uit met een meerdelig halloweenverhaal met spanningsopbouw en plot-twist.',
    parentTakeaway: 'Halloween biedt motiverende rekenkansen in groep 4. Tel samen het snoep na trick-or-treat: hoeveel van elk soort, hoeveel bij elkaar? Als je bij 10 deuren langs gaat en overal 3 snoepjes krijgt, hoeveel heb je dan? Reken samen het kostuumbudget uit: hoeveel kosten alle onderdelen bij elkaar, hoeveel blijft er over van je budget? Na een halloweenwerkblad kunt u samen een spannend verhaaltje schrijven over een griezelige avontuur.',
    classroomIntegration: 'Het halloweenthema integreert in groep 4 met rekenen (vermenigvuldigen met snoep, budgetberekeningen, tabellen), taal (creatief schrijven, halloweenwoordenschat), culturele vorming (tradities, seizoensfeesten) en beeldende vorming (kostuumontwerp). Een halloweenproject met werkbladen, een snoeptelling en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vermenigvuldigen met snoepcontexten', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp maar past dit niet toe op nieuwe snoepsommen', proficient: 'past de tafels van 1\u20135 zelfstandig toe in trick-or-treat-berekeningen en noteert de berekening correct', advanced: 'lost meerstaps-snoepverdelingssommen op, combineert vermenigvuldiging met optelling en controleert het antwoord' },
      { skill: 'Budgetberekeningen voor kostuums', emerging: 'telt twee kostuumonderdelen op maar vergelijkt niet en berekent wisselgeld niet zelfstandig', proficient: 'berekent zelfstandig het totale kostuumbudget, vergelijkt opties en berekent wisselgeld correct', advanced: 'vergelijkt drie kostuumopties op kosten, berekent het verschil en kiest de voordeligste met onderbouwing' },
      { skill: 'Creatief schrijven: halloweenverhaal', emerging: 'schrijft een kort verhaal maar bouwt geen spanning op en gebruikt weinig beschrijving', proficient: 'schrijft een halloweenverhaal met een griezelige setting, personages, spanning en een ontknoping', advanced: 'schrijft een meerdelig verhaal met spanningsopbouw, dialoog, beschrijvende taal en een verrassende ontknoping' },
    ],
  },

  holidays: {
    seoTitle: 'Feestdagen-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare feestdagen-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'feestdagen groep 4, feestdagen oefeningen 7\u20138 jaar, feestdagen oefeningen groep 4, feestdagen uitprintbaar groep 4, feestdagen werkbladen groep 4, feestdagen activiteiten groep 4, feestdagen leerbladen 7\u20138 jaar, feestdagen gratis groep 4, feestdagen PDF groep 4, feestdagen rekenen groep 4',
    snippetAnswer: 'Feestdagen-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met feestelijke contexten: vermenigvuldigen van cadeaus en versieringen, budgetberekeningen voor feesten, kalenderrekenen met feestdata, tabellen met feestgegevens en het schrijven van feestbrieven. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het feestdagenthema een motiverende context voor kalenderrekenen en budgetberekeningen: zeven- en achtjarigen kijken uit naar feestdagen en die betrokkenheid maakt rekenen met data, kosten en hoeveelheden bijzonder effectief. De SLO-leerlijnen benadrukken vermenigvuldigen, rekenen tot 100, kloklezen en functioneel schrijven als kerndoelen, en feestdagen bieden alle vier. Kalenderrekenen \u2014 hoeveel dagen tot Kerst als het vandaag 10 december is? \u2014 oefent aftrekken met data. Vermenigvuldigsommen met versieringen \u2014 elk raam krijgt 4 sterren en er zijn 6 ramen, hoeveel sterren? \u2014 oefenen de tafels in een decoratieve context. Budgetberekeningen voor cadeaus en feestmaterialen oefenen geldrekenen. Tabellen met feestgegevens \u2014 welke feestdagen viert elk land \u2014 bouwen datageletterdheid op met culturele inhoud. Het schrijven van een feestbrief of wenskaart oefent functioneel schrijven met een communicatief doel.',
    developmentalMilestones: [
      { milestone: 'Kalenderrekenen met feestdata (7\u20138-jarigen berekenen dagen tussen data)', howWeAddress: 'Kalenderactiviteiten waarbij kinderen de dagen tot een feestdag tellen en de duur van vakanties berekenen oefenen aftrekken en tijdsbesef' },
      { milestone: 'Vermenigvuldigen met versieringen en cadeaus (hoeveelheden per persoon of per kamer)', howWeAddress: 'Decoratie-activiteiten waarbij kinderen versieringen per raam of kamer vermenigvuldigen en het totaal berekenen oefenen de tafels in een feestelijke context' },
      { milestone: 'Budgetberekeningen voor feesten (kosten van cadeaus, eten en decoraties)', howWeAddress: 'Feestbudget-activiteiten waarbij kinderen kosten optellen en vergelijken oefenen geldrekenen met een feestelijk doel' },
      { milestone: 'Functioneel schrijven: feestbrief en wenskaart (boodschap met datum en persoonlijke wens)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een feestbrief of wenskaart schrijven met een persoonlijke boodschap oefenen functioneel schrijven met een communicatief doel' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk kalenderrekenen tot hele weken, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met feestplaatjes, en laat een wenskaart schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer kalenderrekenen met maandovergangen, laat hen een compleet feestbudget opstellen met vergelijking en daag hen uit met een feestkalender inclusief budgetoverzicht en uitnodigingen voor meerdere feesten.',
    parentTakeaway: 'Feestdagen bieden natuurlijke rekenkansen in groep 4. Tel samen af: hoeveel dagen tot de volgende feestdag? Als je 5 cadeaus inpakt en elk cadeau 3 strikken krijgt, hoeveel strikken heb je nodig? Reken samen het feestbudget uit: hoeveel kosten de cadeaus, het eten en de decoraties bij elkaar? Na een feestdagenwerkblad kunt u samen een wenskaart schrijven met een persoonlijke boodschap en de juiste datum.',
    classroomIntegration: 'Het feestdagenthema integreert in groep 4 met rekenen (kalenderrekenen, vermenigvuldigen, budgetberekeningen), taal (functioneel schrijven, feestwoordenschat), culturele vorming (tradities, diversiteit, wereldfeesten) en beeldende vorming (kerstversiering, kaarten ontwerpen). Een feestdagenproject met werkbladen, een kalenderactiviteit en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Kalenderrekenen met feestdata', emerging: 'telt dagen op een kalender met hulp maar berekent de duur niet zelfstandig', proficient: 'berekent zelfstandig het aantal dagen tussen data en de duur van vakanties', advanced: 'rekent met maandovergangen, plant meerdere feestdata in en berekent tussenliggende periodes correct' },
      { skill: 'Budgetberekeningen voor feesten', emerging: 'telt twee feestkosten op maar vergelijkt niet en berekent wisselgeld niet', proficient: 'berekent zelfstandig een feestbudget met optelling en vergelijkt twee opties', advanced: 'stelt een compleet feestbudget op met meerdere categorie\u00ebn, vergelijkt drie opties en optimaliseert de keuze' },
      { skill: 'Functioneel schrijven: feestbrief', emerging: 'schrijft een korte wens maar vergeet datum of afzender', proficient: 'schrijft een feestbrief met datum, aanhef, persoonlijke boodschap en afsluiting', advanced: 'schrijft een uitgebreide feestbrief met persoonlijke herinneringen, wensen en correcte briefopmaak' },
    ],
  },

  household: {
    seoTitle: 'Huishouden-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare huishouden-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'huishouden groep 4, huishouden oefeningen 7\u20138 jaar, huishouden oefeningen groep 4, huishouden uitprintbaar groep 4, huishouden werkbladen groep 4, huishouden activiteiten groep 4, huishouden leerbladen 7\u20138 jaar, huishouden gratis groep 4, huishouden PDF groep 4, huishouden rekenen groep 4',
    snippetAnswer: 'Huishouden-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met dagelijkse taken: tijdberekeningen voor huishoudtaken, vermenigvuldigen van schoonmaakbenodigdheden, budgetrekenen voor boodschappen, tabellen met takenverdelingen en het schrijven van een instructietekst. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het huishoudthema een functionele context voor tijdrekenen en budgetberekeningen: zeven- en achtjarigen helpen thuis mee met taken en die betrokkenheid maakt rekenen met tijd, geld en hoeveelheden bijzonder praktisch. De SLO-leerlijnen benadrukken kloklezen, vermenigvuldigen, rekenen tot 100 en functioneel schrijven als kerndoelen, en het huishouden biedt alle vier. Tijdberekeningen \u2014 stofzuigen duurt 20 minuten, afwassen 15 minuten, hoe lang ben je bezig? \u2014 oefenen optellen met tijd. Vermenigvuldigsommen met schoonmaakbenodigdheden \u2014 elke kamer heeft 2 ramen en er zijn 5 kamers, hoeveel ramen moeten worden gewassen? \u2014 maken de tafels functioneel. Boodschappenbudget berekenen \u2014 6 liter melk van 1,50 euro per stuk, hoeveel in totaal? \u2014 oefent vermenigvuldiging met geld. Tabellen met takenverdeling per gezinslid bouwen datageletterdheid op. Het schrijven van een instructietekst \u2014 hoe maak je je kamer schoon \u2014 oefent functioneel schrijven met stapsgewijze ordening.',
    developmentalMilestones: [
      { milestone: 'Tijdberekeningen voor huishoudtaken (7\u20138-jarigen tellen de duur van taken op)', howWeAddress: 'Takenplanning-activiteiten waarbij kinderen de duur van huishoudtaken optellen en een schema maken oefenen kloklezen en optellen met tijd' },
      { milestone: 'Vermenigvuldigen met huishoudbenodigdheden (aantallen per kamer of per week)', howWeAddress: 'Schoonmaakactiviteiten waarbij kinderen benodigdheden per kamer vermenigvuldigen en het totaal berekenen oefenen de tafels in een praktische context' },
      { milestone: 'Boodschappenbudget berekenen (hoeveelheden vermenigvuldigen met prijzen)', howWeAddress: 'Boodschappenactiviteiten waarbij kinderen producten vermenigvuldigen met prijzen en het totaal berekenen oefenen geldrekenen met een alledaags doel' },
      { milestone: 'Functioneel schrijven: instructietekst (stapsgewijze uitleg van een huishoudtaak)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een instructietekst schrijven met genummerde stappen oefenen functioneel schrijven met chronologie en duidelijkheid' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tijdberekeningen tot hele en halve uren, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met plaatjes, en laat een instructie schrijven met drie stappen en een sjabloon. Voor gevorderde kinderen: introduceer tijdberekeningen met kwartieren en een weekschema, laat hen een compleet boodschappenbudget opstellen met vergelijking en daag hen uit met een huishoudhandboek inclusief takenplanning, budget en instructies.',
    parentTakeaway: 'Het huishouden biedt dagelijkse rekenkansen in groep 4. Plan samen de taken: stofzuigen duurt 20 minuten en afwassen 15, hoeveel tijd heb je nodig? Als je 3 kamers opruimt en in elke kamer 5 minuten bezig bent, hoe lang duurt het? Reken samen de boodschappen uit: 4 pakken melk van 1,50 euro, hoeveel betaal je? Na een huishoudwerkblad kunt u samen een instructie schrijven \u2014 hoe maak je je kamer schoon in vijf stappen?',
    classroomIntegration: 'Het huishoudthema integreert in groep 4 met rekenen (tijdberekeningen, vermenigvuldigen, budgetrekenen), taal (instructietekst schrijven, huishoudwoordenschat), sociaal-emotioneel leren (verantwoordelijkheid, samenwerken) en burgerschap (zelfstandigheid, zorg voor de omgeving). Een huishoudproject met werkbladen, een takenplanning en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Tijdberekeningen voor taken', emerging: 'telt duur op met hele uren maar heeft moeite met minuten en kwartieren', proficient: 'berekent de totale duur van meerdere taken correct en plant een schema met halve uren', advanced: 'plant een weekschema met kwartieren, berekent de totale tijd per dag en optimaliseert de verdeling' },
      { skill: 'Boodschappenbudget berekenen', emerging: 'telt twee productprijzen op maar vermenigvuldigt niet zelfstandig', proficient: 'berekent zelfstandig het boodschappenbudget met vermenigvuldiging en optelling en noteert het totaal', advanced: 'vergelijkt aanbiedingen, berekent de besparing en stelt een optimaal boodschappenlijstje samen binnen een budget' },
      { skill: 'Instructietekst schrijven', emerging: 'schrijft losse stappen maar nummert ze niet en mist details', proficient: 'schrijft een instructietekst met genummerde stappen, duidelijke taal en een resultaat', advanced: 'schrijft een gedetailleerde instructie met materiaallijst, genummerde stappen, tips en een controlecheck' },
    ],
  },

  insects: {
    seoTitle: 'Insecten-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare insecten-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'insecten groep 4, insecten oefeningen 7\u20138 jaar, insecten oefeningen groep 4, insecten uitprintbaar groep 4, insecten werkbladen groep 4, insecten activiteiten groep 4, insecten leerbladen 7\u20138 jaar, insecten gratis groep 4, insecten PDF groep 4, insecten rekenen groep 4',
    snippetAnswer: 'Insecten-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met entomologie: vermenigvuldigen van poten en vleugels, tabellen met insectengegevens, redactiesommen over bijenpopulaties, meten van insecten in millimeters en informatief schrijven over de levenscyclus van een insect. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het insectenthema een fascinerende context voor vermenigvuldiging en wetenschappelijk schrijven: zeven- en achtjarigen zijn nieuwsgierig naar insecten en die betrokkenheid maakt rekenen met lichaamsonderdelen, populaties en metamorfose bijzonder boeiend. De SLO-leerlijnen benadrukken vermenigvuldigen, meten, gegevensverwerking en informatief schrijven als kerndoelen, en insecten bieden alle vier. Vermenigvuldigsommen met lichaamsonderdelen \u2014 een insect heeft 6 poten, hoeveel poten hebben 9 insecten? \u2014 oefenen de tafels met een biologische wetmatigheid. Tabellen met insectengegevens \u2014 grootte, levensduur, snelheid \u2014 bouwen datageletterdheid op met wetenschappelijke inhoud. Redactiesommen over bijenpopulaties \u2014 een bijenkorf heeft 50.000 bijen, elke bij bezoekt 12 bloemen per uur \u2014 vereisen meerstapsberekeningen. Meten van insecten in millimeters oefent nauwkeurig meten met kleine eenheden. Het schrijven van een informatieve tekst over de levenscyclus van een vlinder oefent gestructureerd schrijven met biologische chronologie.',
    developmentalMilestones: [
      { milestone: 'Vermenigvuldigen met insectenlichaamsdelen (7\u20138-jarigen berekenen poten, vleugels en ogen)', howWeAddress: 'Insectenreken-activiteiten waarbij kinderen lichaamsonderdelen vermenigvuldigen met het aantal insecten oefenen de tafels met een biologische wetmatigheid' },
      { milestone: 'Tabellen met insectengegevens interpreteren (grootte, levensduur, snelheid)', howWeAddress: 'Tabelactiviteiten waarbij kinderen insectengegevens vergelijken en vragen beantwoorden bouwen datageletterdheid op met wetenschappelijke inhoud' },
      { milestone: 'Nauwkeurig meten in millimeters (insectengrootte opmeten met een liniaal)', howWeAddress: 'Meetactiviteiten waarbij kinderen insectenafbeeldingen meten in millimeters oefenen nauwkeurig meten met kleine eenheden' },
      { milestone: 'Informatief schrijven over de levenscyclus (ei, larve, pop, volwassen insect)', howWeAddress: 'Schrijfopdrachten over de metamorfose van een vlinder met chronologische stappen oefenen informatief schrijven met biologische inhoud' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vermenigvuldiging tot de tafels van 2, 5 en 6 met insectenplaatjes, bied meetopdrachten aan met centimeters in plaats van millimeters, en laat een levenscyclusbeschrijving schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer tafels tot 10 met complexe populatieberekeningen, laat hen insecten vergelijken in een uitgebreide tabel en daag hen uit met een wetenschappelijk verslag over een insectensoort inclusief diagram en gegevenstabel.',
    parentTakeaway: 'Insecten bieden fascinerende rekenkansen in groep 4. Tel samen poten: een spin heeft 8 poten, een insect 6 \u2014 hoeveel poten hebben 4 spinnen en 3 insecten bij elkaar? Meet samen een insect: hoe lang is een lieveheersbeestje in millimeters? Zoek samen insectenfeiten op: hoe snel vliegt een bij, hoe lang leeft een vlinder? Na een insectenwerkblad kunt u samen de levenscyclus van een vlinder beschrijven \u2014 van ei tot volwassen vlinder.',
    classroomIntegration: 'Het insectenthema integreert in groep 4 met rekenen (vermenigvuldigen met poten, tabellen, meten in mm), taal (informatief schrijven, insectenwoordenschat), natuur en techniek (entomologie, levenscycli, bestuiving) en beeldende vorming (insectenillustraties). Een insectenproject met werkbladen, een meetactiviteit en een levenscyclusopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vermenigvuldigen met insectenlichaamsdelen', emerging: 'vermenigvuldigt met de tafel van 6 met hulp maar past dit niet toe op nieuwe insectensommen', proficient: 'past de tafels van 1\u20138 zelfstandig toe in insectenberekeningen en noteert de som correct', advanced: 'lost meerstaps-populatiesommen op, combineert vermenigvuldiging met optelling en controleert het antwoord' },
      { skill: 'Meten in millimeters', emerging: 'meet met een liniaal maar leest millimeters niet altijd correct af', proficient: 'meet zelfstandig in millimeters en noteert de insectengrootte correct', advanced: 'meet nauwkeurig, berekent het verschil in grootte tussen insecten en ordent ze van klein naar groot' },
      { skill: 'Informatief schrijven over insecten', emerging: 'schrijft losse feiten over een insect maar ordent ze niet in een levenscyclus', proficient: 'schrijft een gestructureerde tekst over de levenscyclus met inleiding, chronologische stappen en slot', advanced: 'schrijft een uitgebreid insectenverslag met kopjes, een levenscyclusdiagram en vergelijking tussen soorten' },
    ],
  },

  jobs: {
    seoTitle: 'Beroepen-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare beroepen-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'beroepen groep 4, beroepen oefeningen 7\u20138 jaar, beroepen oefeningen groep 4, beroepen uitprintbaar groep 4, beroepen werkbladen groep 4, beroepen activiteiten groep 4, beroepen leerbladen 7\u20138 jaar, beroepen gratis groep 4, beroepen PDF groep 4, beroepen rekenen groep 4',
    snippetAnswer: 'Beroepen-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met de arbeidswereld: vermenigvuldigen van werkuren en salaris, redactiesommen over beroepssituaties, tabellen met beroepsgegevens, tijdberekeningen voor werkschema\u2019s en het schrijven van een beroepenbeschrijving. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het beroepenthema een motiverende context voor geldrekenen en tijdberekeningen: zeven- en achtjarigen zijn nieuwsgierig naar beroepen en die betrokkenheid maakt rekenen met lonen, werktijden en materialen bijzonder relevant. De SLO-leerlijnen benadrukken vermenigvuldigen, kloklezen, rekenen tot 100 en informatief schrijven als kerndoelen, en beroepen bieden alle vier. Vermenigvuldigsommen met werktijden \u2014 een bakker werkt 8 uur per dag, hoeveel uur in 5 dagen? \u2014 oefenen de tafels in een arbeidscontext. Geldrekenen met salaris \u2014 een kapper verdient 12 euro per knipbeurt en knipt 6 klanten, hoeveel? \u2014 maakt vermenigvuldiging functioneel. Redactiesommen over beroepssituaties vereisen meerstapsberekeningen. Tabellen met beroepsgegevens \u2014 werkuren, salaris, opleiding \u2014 bouwen datageletterdheid op. Het schrijven van een beroepsbeschrijving oefent informatief schrijven met structuur en details.',
    developmentalMilestones: [
      { milestone: 'Vermenigvuldigen met werkuren en salaris (7\u20138-jarigen berekenen uurloon maal werkdagen)', howWeAddress: 'Werktijd-activiteiten waarbij kinderen werkuren vermenigvuldigen met dagen en uurloon oefenen de tafels in een arbeidscontext' },
      { milestone: 'Redactiesommen over beroepssituaties (materiaalberekeningen, klantenaantallen)', howWeAddress: 'Beroepsverhalen waarbij kinderen materialen, klanten of producten berekenen in een beroepscontext oefenen meerstaps redeneren' },
      { milestone: 'Tabellen met beroepsgegevens interpreteren (werkuren, salaris, opleiding)', howWeAddress: 'Tabelactiviteiten waarbij kinderen beroepen vergelijken op werkuren en salaris bouwen datageletterdheid op met maatschappelijke inhoud' },
      { milestone: 'Informatief schrijven: beroepsbeschrijving (taken, werkplek, benodigde vaardigheden)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een beroep beschrijven met taken, werkplek en benodigdheden oefenen informatief schrijven met structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vermenigvuldiging tot de tafels van 2 en 5 met beroepsplaatjes, bied redactiesommen aan met \u00e9\u00e9n stap en laat een beroepsbeschrijving schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer tafels tot 10 met complexe salarisberekeningen, laat hen beroepen vergelijken in een uitgebreide tabel en daag hen uit met een beroepenpresentatie inclusief interview, gegevens en een persoonlijke reflectie.',
    parentTakeaway: 'Beroepen bieden motiverende rekenkansen in groep 4. Vraag samen: als een bakker 8 uur per dag werkt, hoeveel uur in 5 dagen? Als een tuinman 15 euro per uur verdient en 4 uur werkt, hoeveel verdient hij? Praat over beroepen in de familie: wat doen papa en mama, hoeveel dagen werken ze? Na een beroepenwerkblad kunt u samen een beroep beschrijven \u2014 wat doet iemand in dat beroep, waar werkt die persoon en wat moet je ervoor leren?',
    classroomIntegration: 'Het beroepenthema integreert in groep 4 met rekenen (vermenigvuldigen met werkuren, geldrekenen, tabellen), taal (beroepsbeschrijving schrijven, beroepenwoordenschat), burgerschap (maatschappelijke rollen, arbeid, gelijkheid) en sociaal-emotioneel leren (toekomstdromen, verantwoordelijkheid). Een beroepenproject met werkbladen, een beroepeninterview en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vermenigvuldigen met werkuren en salaris', emerging: 'vermenigvuldigt eenvoudige werkuren met hulp maar combineert dit niet met uurloon', proficient: 'berekent zelfstandig werkuren per week en uurloon maal uren en noteert de berekening correct', advanced: 'vergelijkt salarissen van twee beroepen, berekent weekverdiensten en trekt conclusies' },
      { skill: 'Beroepsgegevenstabellen interpreteren', emerging: 'leest afzonderlijke waarden af maar vergelijkt beroepen niet zelfstandig', proficient: 'leest een tabel met vijf beroepen af, vergelijkt op twee kenmerken en beantwoordt vragen', advanced: 'analyseert tabellen, ordent beroepen op een kenmerk en trekt conclusies over patronen' },
      { skill: 'Beroepsbeschrijving schrijven', emerging: 'noemt het beroep maar beschrijft taken en werkplek niet gedetailleerd', proficient: 'schrijft een beroepsbeschrijving met taken, werkplek en benodigde vaardigheden in volledige zinnen', advanced: 'schrijft een uitgebreide beroepsbeschrijving met interview, vergelijking en persoonlijke reflectie' },
    ],
  },

  music: {
    seoTitle: 'Muziek-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare muziek-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'muziek groep 4, muziek oefeningen 7\u20138 jaar, muziek oefeningen groep 4, muziek uitprintbaar groep 4, muziek werkbladen groep 4, muziek activiteiten groep 4, muziek leerbladen 7\u20138 jaar, muziek gratis groep 4, muziek PDF groep 4, muziek rekenen groep 4',
    snippetAnswer: 'Muziek-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met muziektheorie: breuken met nootwaarden, vermenigvuldigen van maten en tellen, ritmepatronen met tabellen, redactiesommen over concertkaartjes en het schrijven van een concertverslag. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het muziekthema een creatieve context voor breukenintroductie en patroonherkenning: zeven- en achtjarigen zingen en spelen instrumenten en die ervaring maakt breuken via nootwaarden bijzonder intu\u00eftief. De SLO-leerlijnen benadrukken breukenintroductie, vermenigvuldigen, patroonherkenning en informatief schrijven als kerndoelen, en muziek biedt alle vier. Breuken via nootwaarden \u2014 een hele noot is 4 tellen, een halve noot 2 tellen, een kwart noot 1 tel \u2014 maken breuken hoorbaar en voelbaar. Vermenigvuldigsommen met maten \u2014 elk lied heeft 16 maten van 4 tellen, hoeveel tellen? \u2014 oefenen de tafels in een muzikale context. Ritmepatronen herkennen en voortzetten oefent logisch redeneren. Redactiesommen over concertkaartjes \u2014 3 rijen van 10 stoelen, kaartjes van 8 euro \u2014 vereisen meerstapsberekeningen. Het schrijven van een concertverslag oefent informatief en evaluatief schrijven met een persoonlijk oordeel.',
    developmentalMilestones: [
      { milestone: 'Breukenintroductie via nootwaarden (7\u20138-jarigen begrijpen hele, halve en kwart noten)', howWeAddress: 'Nootwaarde-activiteiten waarbij kinderen hele, halve en kwart noten in maten plaatsen en de telwaarde berekenen maken breuken hoorbaar' },
      { milestone: 'Vermenigvuldigen met maten en tellen (maten per lied, tellen per maat)', howWeAddress: 'Muziekrekenactiviteiten waarbij kinderen maten vermenigvuldigen met telwaarden en het totaal berekenen oefenen de tafels muzikaal' },
      { milestone: 'Ritmepatronen herkennen en voortzetten (ritmische reeksen analyseren)', howWeAddress: 'Patroonactiviteiten waarbij kinderen ritmische reeksen analyseren en de volgende maat voorspellen oefenen logisch redeneren met muziek' },
      { milestone: 'Informatief en evaluatief schrijven: concertverslag (beschrijving en beoordeling)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een concertverslag schrijven met beschrijving van de muziek en een persoonlijk oordeel oefenen evaluatief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk nootwaarden tot hele en halve noten, bied vermenigvuldigsommen aan met de tafels van 2 en 4 met muzieknoten, en laat een concertverslag schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer achtste noten en punt-noten, laat hen complexe ritmepatronen ontwerpen en daag hen uit met een muziekrecensie inclusief vergelijking van twee muziekstukken en onderbouwde beoordeling.',
    parentTakeaway: 'Muziek maakt rekenen creatief in groep 4. Klap samen een ritme: een hele noot is 4 tellen, een halve 2 \u2014 hoeveel halve noten passen in een hele? Als een lied 8 maten heeft van 4 tellen, hoeveel tellen duurt het? Luister samen naar een lied en tel de maten. Na een muziekwerkblad kunt u samen een concertverslag schrijven \u2014 welk nummer vond je het mooist en waarom?',
    classroomIntegration: 'Het muziekthema integreert in groep 4 met rekenen (breuken via nootwaarden, vermenigvuldigen, patronen), taal (concertverslag schrijven, muziekwoordenschat), muziek (ritme, nootwaarden, samenspel) en beeldende vorming (instrumenten tekenen). Een muziekproject met werkbladen, een ritme-activiteit en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Breuken via nootwaarden', emerging: 'herkent hele en halve noten maar berekent de totale telwaarde van een maat niet zelfstandig', proficient: 'plaatst hele, halve en kwart noten correct in maten en berekent de totale telwaarde', advanced: 'werkt met achtste noten, combineert nootwaarden creatief en ontdekt breukrelaties tussen noten' },
      { skill: 'Vermenigvuldigen met maten', emerging: 'telt tellen per maat op maar vermenigvuldigt niet zelfstandig maten maal tellen', proficient: 'berekent zelfstandig het totaal aantal tellen door maten te vermenigvuldigen met telwaarden', advanced: 'berekent de duur van meerdere liederen, vergelijkt ze en trekt conclusies over muzikale structuur' },
      { skill: 'Concertverslag schrijven', emerging: 'schrijft losse zinnen over de muziek maar geeft geen gestructureerd oordeel', proficient: 'schrijft een verslag met beschrijving van de muziek, sfeer en een persoonlijke beoordeling', advanced: 'schrijft een uitgebreide muziekrecensie met vergelijking, onderbouwde beoordeling en aanbeveling' },
    ],
  },

  nature: {
    seoTitle: 'Natuur-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare natuur-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'natuur groep 4, natuur oefeningen 7\u20138 jaar, natuur oefeningen groep 4, natuur uitprintbaar groep 4, natuur werkbladen groep 4, natuur activiteiten groep 4, natuur leerbladen 7\u20138 jaar, natuur gratis groep 4, natuur PDF groep 4, natuur rekenen groep 4',
    snippetAnswer: 'Natuur-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met natuurwetenschap: vermenigvuldigen van dieren in ecosystemen, tabellen met weergegevens, oppervlakteberekeningen van natuurgebieden, redactiesommen over biodiversiteit en informatief schrijven over een ecosysteem. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het natuurthema een wetenschappelijke context voor gegevensverwerking en meten: zeven- en achtjarigen zijn nieuwsgierig naar de natuur en die betrokkenheid maakt rekenen met weergegevens, diertellingen en oppervlaktes bijzonder betekenisvol. De SLO-leerlijnen benadrukken vermenigvuldigen, meten, gegevensverwerking en informatief schrijven als kerndoelen, en de natuur biedt alle vier in een wetenschappelijke setting. Tabellen met weergegevens \u2014 temperatuur, neerslag, windsnelheid per dag \u2014 introduceren gegevensanalyse met echte metingen. Vermenigvuldigsommen met ecosystemen \u2014 in een vijver leven 8 groepen van 6 kikkers, hoeveel kikkers? \u2014 oefenen de tafels met ecologische inhoud. Oppervlakteberekeningen van natuurgebieden \u2014 het weiland is 50 meter lang en 30 meter breed \u2014 introduceren oppervlakte met grotere getallen. Redactiesommen over biodiversiteit vereisen meerstapsberekeningen over soortenaantallen. Het schrijven van een informatieve tekst over een ecosysteem oefent gestructureerd schrijven met wetenschappelijke inhoud.',
    developmentalMilestones: [
      { milestone: 'Tabellen met weergegevens interpreteren (7\u20138-jarigen lezen temperatuur en neerslag af)', howWeAddress: 'Weerdata-activiteiten waarbij kinderen dagelijkse metingen in een tabel zetten en vergelijkingsvragen beantwoorden bouwen datageletterdheid op met echte gegevens' },
      { milestone: 'Vermenigvuldigen met ecosystemen (dieraantallen in groepen berekenen)', howWeAddress: 'Ecosysteem-rekenactiviteiten waarbij kinderen diergroepen vermenigvuldigen en het totaal berekenen oefenen de tafels met ecologische inhoud' },
      { milestone: 'Oppervlakteberekening van natuurgebieden (lengte maal breedte met grotere getallen)', howWeAddress: 'Meetactiviteiten waarbij kinderen de oppervlakte van een weiland of bos berekenen introduceren oppervlakte met betekenisvolle contexten' },
      { milestone: 'Informatief schrijven over een ecosysteem (dieren, planten, samenhang)', howWeAddress: 'Schrijfopdrachten over een ecosysteem met informatie over dieren, planten en hun samenhang oefenen informatief schrijven met wetenschappelijke structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tabellen tot drie rijen met eenvoudige getallen, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met natuurplaatjes, en laat een ecosysteembeschrijving schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer tabellen met vijf kolommen en vergelijkingsvragen, laat hen oppervlaktes berekenen en vergelijken en daag hen uit met een uitgebreid natuurrapport inclusief weergegevens, dierentelling en grafiek.',
    parentTakeaway: 'De natuur biedt dagelijkse rekenkansen in groep 4. Meet samen de temperatuur: hoe warm is het vandaag, hoeveel graden verschil met gisteren? Als er 5 eenden op de vijver zwemmen en elk heeft 4 kuikens, hoeveel kuikens? Schat samen de oppervlakte van de tuin: hoe lang, hoe breed, hoeveel vierkante meter? Na een natuurwerkblad kunt u samen een ecosysteem beschrijven \u2014 welke dieren en planten leven er en hoe hangen ze samen?',
    classroomIntegration: 'Het natuurthema integreert in groep 4 met rekenen (vermenigvuldigen, oppervlakte, weergegevens), taal (informatief schrijven, natuurwoordenschat), natuur en techniek (ecosystemen, biodiversiteit, weer) en burgerschap (natuurbehoud, duurzaamheid). Een natuurproject met werkbladen, een weermeting en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Weergegevenstabellen interpreteren', emerging: 'leest een temperatuur af maar vergelijkt niet en beantwoordt vergelijkingsvragen niet zelfstandig', proficient: 'leest een weertabel af, vergelijkt waarden tussen dagen en beantwoordt vragen correct', advanced: 'analyseert weerpatronen over een week, berekent gemiddelden en trekt conclusies over trends' },
      { skill: 'Oppervlakteberekening van natuurgebieden', emerging: 'herkent lengte en breedte maar berekent de oppervlakte niet als product', proficient: 'berekent de oppervlakte correct als lengte maal breedte en noteert de eenheid', advanced: 'berekent oppervlaktes van meerdere gebieden, vergelijkt ze en trekt conclusies over biodiversiteit' },
      { skill: 'Informatief schrijven over een ecosysteem', emerging: 'schrijft losse feiten over dieren en planten maar beschrijft hun samenhang niet', proficient: 'schrijft een gestructureerde tekst over een ecosysteem met dieren, planten en hun samenhang', advanced: 'schrijft een uitgebreid natuurrapport met kopjes, een voedselwebdiagram en vergelijking tussen ecosystemen' },
    ],
  },

  numbers: {
    seoTitle: 'Getallen-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare getallen-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'getallen groep 4, getallen oefeningen 7\u20138 jaar, getallen oefeningen groep 4, getallen uitprintbaar groep 4, getallen werkbladen groep 4, getallen activiteiten groep 4, getallen leerbladen 7\u20138 jaar, getallen gratis groep 4, getallen PDF groep 4, getallen rekenen groep 4',
    snippetAnswer: 'Getallen-oefeningen voor groep 4 (7\u20138 jaar) bouwen getalbegrip uit tot 1000: plaatswaarde met honderdtallen, vermenigvuldigen en delen, getallenlijnen, redactiesommen met meerdere stappen en het schrijven van een uitleg over rekenstrategieeen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het getallenthema de kern van wiskundig denken: zeven- en achtjarigen breiden hun getalbegrip uit tot 1000 en die groei maakt plaatswaarde, vermenigvuldigen en strategisch rekenen bijzonder belangrijk. De SLO-leerlijnen benadrukken rekenen tot 1000, vermenigvuldigen, delen en rekenstrategieeen als kerndoelen, en getallen bieden de directe oefening. Plaatswaarde met honderdtallen \u2014 wat is de waarde van de 3 in 352? \u2014 verdiept getalbegrip. Vermenigvuldigen en delen \u2014 de tafels van 1 tot 10, delen als omkeerbewering \u2014 bouwen vlotte rekenvaardigheden op. Getallenlijnen met sprongen van 5, 10, 25 en 50 oefenen getalpatronen. Redactiesommen met meerdere stappen \u2014 je hebt 75 knikkers, geeft er 12 weg en krijgt er 8 terug \u2014 vereisen strategisch redeneren. Het schrijven van een uitleg over een rekenstrategie oefent wiskundige communicatie: hoe heb je dit uitgerekend en waarom werkt het?',
    developmentalMilestones: [
      { milestone: 'Plaatswaarde tot 1000 begrijpen (7\u20138-jarigen herkennen honderdtallen, tientallen en eenheden)', howWeAddress: 'Plaatswaarde-activiteiten waarbij kinderen getallen ontleden in honderdtallen, tientallen en eenheden en de waarde van elk cijfer benoemen verdiepen getalbegrip' },
      { milestone: 'Tafels van vermenigvuldiging vlot toepassen (tafels van 1 tot 10)', howWeAddress: 'Tafelactiviteiten met gevarieerde contexten en tempospellen bouwen automatisering op zodat kinderen de tafels vlot uit het hoofd kennen' },
      { milestone: 'Getallenlijnen met sprongen navigeren (sprongen van 5, 10, 25 en 50)', howWeAddress: 'Getallenlijn-activiteiten waarbij kinderen in vaste sprongen tellen en ontbrekende getallen invullen oefenen getalpatronen en flexibel rekenen' },
      { milestone: 'Wiskundige communicatie: rekenstrategie uitleggen (hoe en waarom)', howWeAddress: 'Schrijfopdrachten waarbij kinderen hun rekenstrategie stap voor stap uitleggen oefenen wiskundige communicatie en metacognitie' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk getallen tot 100, bied de tafels van 2, 5 en 10 aan met visuele ondersteuning, en laat een rekenstrategie uitleggen met een invulsjabloon. Voor gevorderde kinderen: introduceer getallen tot 1000, laat hen complexe redactiesommen met drie stappen oplossen en daag hen uit met het bedenken en uitleggen van eigen rekenstrategieeen voor vermenigvuldigen van tweecijferige getallen.',
    parentTakeaway: 'Getallen zijn de basis van rekenen in groep 4. Oefen samen de tafels: vraag willekeurig 6 x 7, 8 x 4, 9 x 3. Bespreek plaatswaarde: welk cijfer staat op de honderdtallen-plek in 482? Tel samen in sprongen van 25: 25, 50, 75, 100. Na een getallenwerkblad kunt u samen bespreken: hoe heb je deze som uitgerekend, welke stappen heb je genomen? Wiskundige gesprekken versterken het begrip.',
    classroomIntegration: 'Het getallenthema integreert in groep 4 met rekenen (plaatswaarde, tafels, getallenlijnen, redactiesommen), taal (wiskundige communicatie, rekenstrategieeen uitleggen), natuur en techniek (meten met grotere getallen) en sociaal-emotioneel leren (doorzetten bij uitdagende sommen). Een getallenproject met werkbladen, een tafelspel en een rekenopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Plaatswaarde tot 1000', emerging: 'herkent tientallen en eenheden maar benoemt de honderdtallen-waarde niet altijd correct', proficient: 'ontleedt getallen tot 1000 correct in honderdtallen, tientallen en eenheden', advanced: 'vergelijkt en ordent getallen tot 1000, benoemt de plaatswaarde van elk cijfer en rondt af op tientallen en honderdtallen' },
      { skill: 'Tafels van vermenigvuldiging', emerging: 'kent de tafels van 2, 5 en 10 maar heeft moeite met overige tafels', proficient: 'kent de tafels van 1 tot 10 uit het hoofd en past ze toe in redactiesommen', advanced: 'automatiseert alle tafels, past deelstrategieeen toe en bedenkt eigen tafelsommen in contexten' },
      { skill: 'Rekenstrategie uitleggen', emerging: 'geeft het antwoord maar legt de stappen niet uit', proficient: 'legt de rekenstrategie stap voor stap uit in begrijpelijke taal', advanced: 'vergelijkt twee rekenstrategieeen, legt uit waarom de ene efficienter is en past de meest geschikte toe' },
    ],
  },

  ocean: {
    seoTitle: 'Oceaan-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare oceaan-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'oceaan groep 4, oceaan oefeningen 7\u20138 jaar, oceaan oefeningen groep 4, oceaan uitprintbaar groep 4, oceaan werkbladen groep 4, oceaan activiteiten groep 4, oceaan leerbladen 7\u20138 jaar, oceaan gratis groep 4, oceaan PDF groep 4, oceaan rekenen groep 4',
    snippetAnswer: 'Oceaan-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met oceaanwetenschap: vermenigvuldigen van zeedieren in groepen, tabellen met oceaangegevens, diepteberekeningen met meten, redactiesommen over koraalriffen en informatief schrijven over zeedieren. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het oceaanthema een diepzeecontext voor vermenigvuldiging en gegevensanalyse: zeven- en achtjarigen zijn gefascineerd door de oceaan en die nieuwsgierigheid maakt rekenen met dieraantallen, dieptes en afstanden bijzonder motiverend. De SLO-leerlijnen benadrukken vermenigvuldigen, meten, gegevensverwerking en informatief schrijven als kerndoelen, en de oceaan biedt alle vier. Vermenigvuldigsommen met zeedieren \u2014 een octopus heeft 8 armen, hoeveel armen hebben 7 octopussen? \u2014 oefenen de tafels met fascinerende feiten. Tabellen met oceaangegevens \u2014 diepte van oceaanzones, grootte van zeedieren, watertemperatuur \u2014 bouwen datageletterdheid op. Diepteberekeningen \u2014 een duiker daalt 5 meter per minuut, hoe diep na 8 minuten? \u2014 oefenen vermenigvuldiging met meten. Redactiesommen over koraalriffen \u2014 een rif heeft 200 koraalsoorten en 50 vissoorten, hoeveel soorten samen? \u2014 vereisen meerstapsberekeningen. Het schrijven van een informatieve tekst over een zeedier oefent gestructureerd schrijven met wetenschappelijke inhoud.',
    developmentalMilestones: [
      { milestone: 'Vermenigvuldigen met zeediergroepen (7\u20138-jarigen berekenen totalen met lichaamsonderdelen)', howWeAddress: 'Oceaanreken-activiteiten waarbij kinderen armen, vinnen en tentakels vermenigvuldigen oefenen de tafels met fascinerende zeedierfeiten' },
      { milestone: 'Tabellen met oceaangegevens interpreteren (diepte, grootte, temperatuur)', howWeAddress: 'Tabelactiviteiten waarbij kinderen oceaangegevens vergelijken en vragen beantwoorden bouwen datageletterdheid op met mariene wetenschap' },
      { milestone: 'Diepteberekeningen met vermenigvuldiging (meters per minuut maal tijd)', howWeAddress: 'Duikactiviteiten waarbij kinderen de diepte berekenen via snelheid maal tijd oefenen vermenigvuldiging met meten' },
      { milestone: 'Informatief schrijven over een zeedier (uiterlijk, leefgebied, voedsel)', howWeAddress: 'Schrijfopdrachten over een zeedier met beschrijving van uiterlijk, leefgebied en voedselketen oefenen informatief schrijven met wetenschappelijke structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vermenigvuldiging tot de tafels van 2, 5 en 8 met zeedierplaatjes, bied tabellen aan met drie rijen en laat een zedierbeschrijving schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer tafels tot 10 met complexe diepteberekeningen, laat hen oceanendata vergelijken in uitgebreide tabellen en daag hen uit met een wetenschappelijk oceaanrapport inclusief gegevenstabel en diagram.',
    parentTakeaway: 'De oceaan biedt fascinerende rekenkansen in groep 4. Zoek samen oceaanfeiten op: hoe diep is de Marianentrog, hoe groot is een blauwe vinvis? Als een octopus 8 armen heeft en een zeester 5, hoeveel armen hebben 3 octopussen en 4 zeesterren bij elkaar? Vergelijk zeedieren: welk is het grootst, welk het snelst? Na een oceaanwerkblad kunt u samen een informatieve tekst schrijven over een favoriete zeedier \u2014 waar leeft het, wat eet het en hoe ziet het eruit?',
    classroomIntegration: 'Het oceaanthema integreert in groep 4 met rekenen (vermenigvuldigen, tabellen, diepteberekeningen), taal (informatief schrijven, oceaanwoordenschat), natuur en techniek (mariene biologie, oceaanzones, koraalriffen) en burgerschap (oceaanbescherming, plasticproblematiek). Een oceaanproject met werkbladen, een zeedierenonderzoek en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vermenigvuldigen met zeediercontexten', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp maar past dit niet toe op oceaansommen', proficient: 'past de tafels van 1\u20138 zelfstandig toe in zeedierberekeningen en noteert de som correct', advanced: 'lost meerstaps-oceaansommen op, combineert vermenigvuldiging met optelling en controleert het antwoord' },
      { skill: 'Oceaangegevenstabellen interpreteren', emerging: 'leest afzonderlijke waarden af maar vergelijkt zeedieren niet zelfstandig', proficient: 'leest een tabel met vijf zeedieren af, vergelijkt op twee kenmerken en beantwoordt vragen', advanced: 'analyseert tabellen, ordent zeedieren op een kenmerk en trekt conclusies over patronen' },
      { skill: 'Informatief schrijven over zeedieren', emerging: 'schrijft losse feiten over een zeedier maar organiseert ze niet', proficient: 'schrijft een gestructureerde tekst over een zeedier met uiterlijk, leefgebied en voedsel', advanced: 'schrijft een uitgebreid zeedierverslag met kopjes, vergelijking en een voedselketendiagram' },
    ],
  },

  pets: {
    seoTitle: 'Huisdieren-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare huisdieren-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'huisdieren groep 4, huisdieren oefeningen 7\u20138 jaar, huisdieren oefeningen groep 4, huisdieren uitprintbaar groep 4, huisdieren werkbladen groep 4, huisdieren activiteiten groep 4, huisdieren leerbladen 7\u20138 jaar, huisdieren gratis groep 4, huisdieren PDF groep 4, huisdieren rekenen groep 4',
    snippetAnswer: 'Huisdieren-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met dierenverzorging: vermenigvuldigen van voer en kosten, budgetberekeningen voor huisdierbenodigdheden, tabellen met verzorgingsgegevens, redactiesommen over dierenartsenbezoek en het schrijven van een huisdierverzorgingsgids. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het huisdierenthema een verantwoordelijke context voor budgetrekenen en plannen: zeven- en achtjarigen zorgen voor huisdieren of dromen erover en die betrokkenheid maakt rekenen met voerkosten, dierenartsenrekeningen en verzorgingsschema\u2019s bijzonder motiverend. De SLO-leerlijnen benadrukken vermenigvuldigen, rekenen tot 100, gegevensverwerking en functioneel schrijven als kerndoelen, en huisdieren bieden alle vier. Vermenigvuldigsommen met voer \u2014 een kat eet 2 porties per dag, hoeveel in een week? \u2014 oefenen de tafels met zorgverantwoordelijkheid. Budgetberekeningen \u2014 voer kost 8 euro per week, hoeveel per maand? \u2014 oefenen geldrekenen. Tabellen met verzorgingsgegevens \u2014 voeding, beweging, vaccinaties per huisdier \u2014 bouwen datageletterdheid op. Redactiesommen over dierenartsenbezoek vereisen meerstapsberekeningen. Het schrijven van een huisdierverzorgingsgids oefent functioneel schrijven met stapsgewijze instructies.',
    developmentalMilestones: [
      { milestone: 'Vermenigvuldigen met voerporties (7\u20138-jarigen berekenen dagelijks en wekelijks voer)', howWeAddress: 'Voerberekeningen waarbij kinderen porties per dag vermenigvuldigen met dagen per week oefenen de tafels met zorgverantwoordelijkheid' },
      { milestone: 'Budgetberekeningen voor huisdierbenodigdheden (voer, speelgoed, dierenarts)', howWeAddress: 'Huisdierbudget-activiteiten waarbij kinderen kosten optellen en vergelijken oefenen geldrekenen met een verantwoordelijk doel' },
      { milestone: 'Tabellen met verzorgingsgegevens interpreteren (voeding, beweging, vaccinaties)', howWeAddress: 'Tabelactiviteiten waarbij kinderen verzorgingsgegevens van huisdieren vergelijken bouwen datageletterdheid op met dierenverzorging' },
      { milestone: 'Functioneel schrijven: huisdierverzorgingsgids (stapsgewijze instructies)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een verzorgingsgids schrijven met dagelijkse taken en instructies oefenen functioneel schrijven met structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vermenigvuldiging tot de tafels van 2 en 5 met huisdierplaatjes, bied budgetsommen aan met ronde bedragen en laat een verzorgingsgids schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer maandbudgetten met vergelijking, laat hen een compleet verzorgingsplan opstellen voor twee huisdieren en daag hen uit met een huisdierenpresentatie inclusief budget, schema en informatieve tekst.',
    parentTakeaway: 'Huisdieren bieden dagelijkse rekenkansen in groep 4. Reken samen het voer uit: als de hond 3 porties per dag eet, hoeveel zakjes per week? Wat kost het voer per maand als een zak 12 euro kost en twee weken meegaat? Vergelijk samen huisdieren: welk huisdier kost het meest, welk het minst? Na een huisdierenwerkblad kunt u samen een verzorgingsgids schrijven \u2014 wat moet je elke dag doen om goed voor je huisdier te zorgen?',
    classroomIntegration: 'Het huisdierenthema integreert in groep 4 met rekenen (vermenigvuldigen met voer, budgetberekeningen, tabellen), taal (verzorgingsgids schrijven, huisdierwoordenschat), natuur en techniek (dierenverzorging, voeding, gezondheid) en sociaal-emotioneel leren (verantwoordelijkheid, empathie). Een huisdierenproject met werkbladen, een verzorgingsactiviteit en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vermenigvuldigen met voerporties', emerging: 'vermenigvuldigt dagporties met hulp maar berekent het weektotaal niet zelfstandig', proficient: 'berekent zelfstandig het dagelijkse en wekelijkse voer met vermenigvuldiging en noteert de berekening', advanced: 'berekent maandelijkse voerkosten, vergelijkt twee huisdieren en trekt conclusies over kosten' },
      { skill: 'Huisdierbudget berekenen', emerging: 'telt twee kosten op maar maakt geen maandbudget', proficient: 'berekent zelfstandig een maandbudget voor een huisdier met voer, speelgoed en dierenarts', advanced: 'vergelijkt budgetten voor twee huisdieren, berekent het verschil en kiest het voordeligste met onderbouwing' },
      { skill: 'Verzorgingsgids schrijven', emerging: 'noemt enkele taken maar ordent ze niet en mist details', proficient: 'schrijft een verzorgingsgids met dagelijkse taken, frequentie en tips in genummerde stappen', advanced: 'schrijft een uitgebreide gids met dagschema, weekschema, kostenoverzig en tips voor beginners' },
    ],
  },

  pirates: {
    seoTitle: 'Piraten-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare piraten-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'piraten groep 4, piraten oefeningen 7\u20138 jaar, piraten oefeningen groep 4, piraten uitprintbaar groep 4, piraten werkbladen groep 4, piraten activiteiten groep 4, piraten leerbladen 7\u20138 jaar, piraten gratis groep 4, piraten PDF groep 4, piraten rekenen groep 4',
    snippetAnswer: 'Piraten-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met piratenavontuur: vermenigvuldigen van goudstukken en schatkaarten, co\u00f6rdinaten op een raster, redactiesommen over schatverdeling, tabellen met piratengegevens en het schrijven van een piratenavontuurverhaal. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het piratenthema een avontuurlijke context voor co\u00f6rdinaatrekenen en eerlijk delen: zeven- en achtjarigen zijn dol op piratenavonturen en die motivatie maakt rekenen met schatkaarten, goudstukken en routes bijzonder effectief. De SLO-leerlijnen benadrukken vermenigvuldigen, co\u00f6rdinaten, delen en creatief schrijven als kerndoelen, en piraten bieden alle vier. Co\u00f6rdinaten op een raster \u2014 de schat ligt op (3, 5), welk vakje? \u2014 introduceren ruimtelijk denken met rasternavigatie. Vermenigvuldigsommen met goudstukken \u2014 elke schatkist bevat 8 goudstukken, hoeveel in 6 kisten? \u2014 oefenen de tafels. Eerlijk delen van de buit \u2014 48 goudstukken verdelen over 6 piraten \u2014 oefent delen als omgekeerde van vermenigvuldiging. Redactiesommen over schatverdeling vereisen meerstapsberekeningen. Het schrijven van een piratenavontuurverhaal oefent creatief schrijven met setting, personages en plot.',
    developmentalMilestones: [
      { milestone: 'Co\u00f6rdinaten op een raster lezen en plotten (7\u20138-jarigen navigeren een schatkaart)', howWeAddress: 'Schatkaart-activiteiten waarbij kinderen co\u00f6rdinaten aflezen en schatten plotten op een raster introduceren ruimtelijk denken met co\u00f6rdinaten' },
      { milestone: 'Vermenigvuldigen met goudstukken (schatkisten maal goudstukken per kist)', howWeAddress: 'Schatrekenactiviteiten waarbij kinderen goudstukken per kist vermenigvuldigen en het totaal berekenen oefenen de tafels in een avontuurcontext' },
      { milestone: 'Eerlijk delen van de buit (delen als omgekeerde van vermenigvuldigen)', howWeAddress: 'Verdeelactiviteiten waarbij kinderen goudstukken eerlijk verdelen over piraten introduceren delen als deelbewerking' },
      { milestone: 'Creatief schrijven: piratenavontuurverhaal (setting, personages, plot)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een piratenavontuur schrijven met een schatkaart, gevaren en een ontdekking oefenen creatief schrijven met verhaalstructuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk co\u00f6rdinaten tot een 5x5-raster, bied vermenigvuldigsommen aan met de tafels van 2 en 5 en laat delen met concrete verdeling over 2 of 5 piraten. Voor gevorderde kinderen: introduceer een 10x10-raster met routes, laat hen complexe schatverdelingsommen oplossen met rest en daag hen uit met een meerdelig piratenavontuur inclusief schatkaart en rekenuitdagingen.',
    parentTakeaway: 'Piraten maken rekenen avontuurlijk in groep 4. Teken samen een schatkaart op ruitjespapier: de schat ligt op vakje (4, 7), welke route neem je? Als er 5 schatkisten zijn met elk 8 goudstukken, hoeveel goud in totaal? Als 4 piraten de buit eerlijk verdelen, hoeveel krijgt ieder? Na een piratenwerkblad kunt u samen een kort piratenavontuur schrijven \u2014 wat gebeurt er op het eiland?',
    classroomIntegration: 'Het piratenthema integreert in groep 4 met rekenen (co\u00f6rdinaten, vermenigvuldigen, delen), taal (creatief schrijven, piratenwoordenschat), aardrijkskunde (kaartlezen, navigatie, ontdekkingsreizen) en beeldende vorming (schatkaarten ontwerpen). Een piratenproject met werkbladen, een schatzoektocht en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Co\u00f6rdinaten op een raster', emerging: 'vindt een punt op een raster met hulp maar verwisselt rij en kolom', proficient: 'leest en plot co\u00f6rdinaten correct op een raster en beschrijft een route tussen twee punten', advanced: 'plant een effici\u00ebnte route over meerdere schatten, berekent de totale afstand en tekent de route in' },
      { skill: 'Vermenigvuldigen en delen met goudstukken', emerging: 'vermenigvuldigt met de tafels van 2 en 5 maar deelt niet zelfstandig', proficient: 'vermenigvuldigt en deelt zelfstandig goudstukken en noteert beide bewerkingen correct', advanced: 'lost complexe verdeelraadsels op met rest, bedenkt eigen sommen en legt de strategie uit' },
      { skill: 'Piratenavontuurverhaal schrijven', emerging: 'schrijft een kort verhaal maar mist een duidelijke setting of plot', proficient: 'schrijft een piratenavontuur met setting, personages, probleem en oplossing', advanced: 'schrijft een meerdelig avontuur met spanningsopbouw, beschrijvende taal en een verrassende ontknoping' },
    ],
  },

  robots: {
    seoTitle: 'Robots-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare robots-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'robots groep 4, robots oefeningen 7\u20138 jaar, robots oefeningen groep 4, robots uitprintbaar groep 4, robots werkbladen groep 4, robots activiteiten groep 4, robots leerbladen 7\u20138 jaar, robots gratis groep 4, robots PDF groep 4, robots rekenen groep 4',
    snippetAnswer: 'Robots-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met technologie: programmeerlogica met stapsgewijze instructies, vermenigvuldigen van robotonderdelen, co\u00f6rdinaten voor robotnavigatie, redactiesommen over robotfabrieken en het schrijven van een robotontwerpbeschrijving. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het robotthema een technologische context voor algoritmisch denken en vermenigvuldiging: zeven- en achtjarigen zijn gefascineerd door robots en die motivatie maakt stapsgewijs denken, co\u00f6rdinaten en productieberekeningen bijzonder effectief. De SLO-leerlijnen benadrukken vermenigvuldigen, logisch redeneren, co\u00f6rdinaten en informatief schrijven als kerndoelen, en robots bieden alle vier. Programmeerlogica \u2014 schrijf een reeks instructies zodat de robot van A naar B loopt \u2014 oefent algoritmisch denken. Vermenigvuldigsommen met robotonderdelen \u2014 elke robot heeft 4 wielen, hoeveel wielen voor 9 robots? \u2014 oefenen de tafels. Co\u00f6rdinaten voor robotnavigatie op een raster introduceren ruimtelijk denken. Redactiesommen over robotfabrieken \u2014 de fabriek maakt 25 robots per dag, hoeveel in 4 dagen? \u2014 vereisen meerstapsberekeningen. Het schrijven van een robotontwerpbeschrijving oefent informatief schrijven met technische specificaties.',
    developmentalMilestones: [
      { milestone: 'Algoritmisch denken met stapsgewijze instructies (7\u20138-jarigen schrijven een robot-programma)', howWeAddress: 'Programmeeractiviteiten waarbij kinderen stapsgewijze instructies schrijven voor een robot oefenen logisch en sequentieel denken' },
      { milestone: 'Vermenigvuldigen met robotonderdelen (wielen, armen, sensoren per robot)', howWeAddress: 'Robotfabriek-activiteiten waarbij kinderen onderdelen per robot vermenigvuldigen en het totaal berekenen oefenen de tafels in een technologische context' },
      { milestone: 'Co\u00f6rdinaten voor robotnavigatie (een robot sturen over een raster)', howWeAddress: 'Navigatie-activiteiten waarbij kinderen een robot via co\u00f6rdinaten over een raster sturen ontwikkelen ruimtelijk inzicht en co\u00f6rdinaatvaardigheden' },
      { milestone: 'Informatief schrijven: robotontwerpbeschrijving (specificaties, functies, materialen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een eigen robotontwerp beschrijven met functies en specificaties oefenen informatief schrijven met technische inhoud' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk instructies tot drie stappen, bied vermenigvuldigsommen aan met de tafels van 2 en 4 met robotplaatjes, en laat een robotbeschrijving schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer voorwaardelijke instructies (als-dan), laat hen complexe fabrieksberekeningen maken en daag hen uit met een compleet robotontwerpdossier inclusief tekening, specificaties en kostenberekening.',
    parentTakeaway: 'Robots maken rekenen technologisch in groep 4. Speel samen het robotspel: geef uw kind instructies om als een robot door de kamer te lopen \u2014 drie stappen vooruit, draai rechts, twee stappen \u2014 en wissel van rol. Als een robot 4 wielen heeft, hoeveel wielen hebben 8 robots? Teken samen een robot op ruitjespapier en beschrijf hem: hoeveel armen, welke functies? Na een robotwerkblad kunt u samen een robotontwerp bedenken en beschrijven.',
    classroomIntegration: 'Het robotthema integreert in groep 4 met rekenen (vermenigvuldigen, co\u00f6rdinaten, fabrieksberekeningen), taal (informatief schrijven, technologiewoordenschat), natuur en techniek (programmeren, robotica, algoritmen) en beeldende vorming (robotontwerp). Een robotproject met werkbladen, een programmeeractiviteit en een ontwerpbeschrijving combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Algoritmisch denken', emerging: 'schrijft losse instructies maar in een onlogische volgorde', proficient: 'schrijft een correcte reeks stapsgewijze instructies die de robot van A naar B brengt', advanced: 'schrijft effici\u00ebnte algoritmes met herhalingen en voorwaarden en test ze op correctheid' },
      { skill: 'Vermenigvuldigen met robotonderdelen', emerging: 'vermenigvuldigt met de tafels van 2 en 4 met hulp maar past dit niet toe op fabrieksberekeningen', proficient: 'berekent zelfstandig onderdelen voor meerdere robots en fabrieksproductie per dag', advanced: 'lost complexe productiesommen op met meerdere stappen en optimaliseert de productie' },
      { skill: 'Robotontwerpbeschrijving schrijven', emerging: 'tekent een robot maar beschrijft functies en specificaties niet', proficient: 'schrijft een beschrijving van een robot met functies, materialen en specificaties', advanced: 'schrijft een compleet ontwerpdossier met tekening, specificaties, kostenberekening en gebruiksaanwijzing' },
    ],
  },

  school: {
    seoTitle: 'School-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare school-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'school groep 4, school oefeningen 7\u20138 jaar, school oefeningen groep 4, school uitprintbaar groep 4, school werkbladen groep 4, school activiteiten groep 4, school leerbladen 7\u20138 jaar, school gratis groep 4, school PDF groep 4, school rekenen groep 4',
    snippetAnswer: 'School-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met schoolcontexten: roosters lezen en tijdberekeningen, vermenigvuldigen van materialen per leerling, tabellen met schoolgegevens, redactiesommen over schoolactiviteiten en het schrijven van een schoolkrant-artikel. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het schoolthema een meta-context voor tijdrekenen en organisatie: zeven- en achtjarigen navigeren hun schooldag en die vertrouwdheid maakt rekenen met roosters, materialen en schoolgebeurtenissen bijzonder herkenbaar. De SLO-leerlijnen benadrukken kloklezen, vermenigvuldigen, gegevensverwerking en informatief schrijven als kerndoelen, en de school biedt alle vier. Roosterlezen \u2014 rekenen begint om 9:15 en duurt 45 minuten, hoe laat is het afgelopen? \u2014 oefent kloklezen en optellen met tijd. Vermenigvuldigsommen met materialen \u2014 elke leerling krijgt 3 potloden en er zijn 28 leerlingen, hoeveel potloden bestellen? \u2014 oefenen de tafels in een bekende context. Tabellen met schoolgegevens \u2014 leerlingenaantallen per klas, scores per vak \u2014 bouwen datageletterdheid op. Redactiesommen over schoolactiviteiten vereisen meerstapsberekeningen. Het schrijven van een schoolkrant-artikel oefent informatief schrijven met wie-wat-waar-wanneer.',
    developmentalMilestones: [
      { milestone: 'Roosters lezen en tijdberekeningen maken (7\u20138-jarigen berekenen begin- en eindtijden)', howWeAddress: 'Roosteractiviteiten waarbij kinderen lestijden aflezen en de duur berekenen oefenen kloklezen in een vertrouwde context' },
      { milestone: 'Vermenigvuldigen met schoolmaterialen (aantallen per leerling maal het aantal leerlingen)', howWeAddress: 'Bestelactiviteiten waarbij kinderen materialen per leerling vermenigvuldigen met het klassenantal oefenen de tafels praktisch' },
      { milestone: 'Tabellen met schoolgegevens interpreteren (leerlingenaantallen, scores)', howWeAddress: 'Tabelactiviteiten waarbij kinderen schoolgegevens vergelijken en vragen beantwoorden bouwen datageletterdheid op' },
      { milestone: 'Informatief schrijven: schoolkrant-artikel (wie, wat, waar, wanneer)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een artikel schrijven over een schoolgebeurtenis oefenen informatief schrijven met journalistieke structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tijdberekeningen tot hele en halve uren, bied vermenigvuldigsommen aan met de tafels van 2 en 5 en laat een artikel schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer tijdberekeningen met kwartieren en een weekrooster, laat hen een schoolbudget opstellen en daag hen uit met een complete schoolkranteditie inclusief meerdere artikelen en een grafiek.',
    parentTakeaway: 'De school biedt dagelijkse rekenkansen in groep 4. Bekijk samen het rooster: hoe laat begint rekenen, hoe lang duurt het, hoe laat is het pauze? Als er 25 leerlingen in de klas zitten en iedereen 2 schriften nodig heeft, hoeveel schriften bestel je? Vergelijk samen toetsscores: welk vak ging het beste, welk kan beter? Na een schoolwerkblad kunt u samen een artikel schrijven over iets leuks dat op school is gebeurd.',
    classroomIntegration: 'Het schoolthema integreert in groep 4 met rekenen (roosters, tijdrekenen, vermenigvuldigen), taal (schoolkrant schrijven, schoolwoordenschat), burgerschap (schoolregels, samenwerking) en sociaal-emotioneel leren (organisatie, verantwoordelijkheid). Een schoolproject met werkbladen, een roosteractiviteit en een schoolkrant combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Roosters lezen en tijdberekeningen', emerging: 'leest hele uren op een rooster maar berekent de duur niet zelfstandig', proficient: 'leest roosters met kwartieren, berekent begin- en eindtijden en bepaalt de duur correct', advanced: 'plant een compleet weekrooster, berekent totale lestijd per vak en optimaliseert de verdeling' },
      { skill: 'Vermenigvuldigen met schoolmaterialen', emerging: 'vermenigvuldigt met de tafels van 2 en 5 met hulp maar berekent geen bestelling', proficient: 'berekent zelfstandig een materialenbestelling met vermenigvuldiging en noteert de berekening', advanced: 'vergelijkt bestellingen bij twee leveranciers op prijs, berekent het verschil en kiest de voordeligste' },
      { skill: 'Schoolkrant-artikel schrijven', emerging: 'schrijft losse zinnen over een gebeurtenis maar mist essenti\u00eble informatie', proficient: 'schrijft een artikel met wie, wat, waar en wanneer in een logische volgorde', advanced: 'schrijft een uitgebreid artikel met citaten, achtergrond en een pakkende kop' },
    ],
  },

  seasons: {
    seoTitle: 'Seizoenen-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare seizoenen-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'seizoenen groep 4, seizoenen oefeningen 7\u20138 jaar, seizoenen oefeningen groep 4, seizoenen uitprintbaar groep 4, seizoenen werkbladen groep 4, seizoenen activiteiten groep 4, seizoenen leerbladen 7\u20138 jaar, seizoenen gratis groep 4, seizoenen PDF groep 4, seizoenen rekenen groep 4',
    snippetAnswer: 'Seizoenen-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met seizoenskennis: temperatuurvergelijkingen met tabellen, kalenderrekenen met seizoensperiodes, vermenigvuldigen van seizoensactiviteiten, redactiesommen over weerpatronen en informatief schrijven over een seizoen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het seizoenenthema een wetenschappelijke context voor gegevensanalyse en kalenderrekenen: zeven- en achtjarigen ervaren de seizoenswisselingen bewust en die observatie maakt rekenen met temperaturen, daglengtes en seizoensperiodes bijzonder betekenisvol. De SLO-leerlijnen benadrukken gegevensverwerking, meten, kalenderrekenen en informatief schrijven als kerndoelen, en seizoenen bieden alle vier. Temperatuurtabellen \u2014 gemiddelde temperatuur per maand in graden Celsius \u2014 introduceren gegevensanalyse met echte metingen. Kalenderrekenen \u2014 de lente begint op 21 maart en duurt tot 21 juni, hoeveel dagen? \u2014 oefent rekenen met data. Vermenigvuldiging met seizoensactiviteiten \u2014 elke week ga je 3 keer naar buiten spelen, hoeveel keer in 12 weken lente? \u2014 oefent de tafels. Redactiesommen over weerpatronen vereisen meerstapsberekeningen. Het schrijven van een informatieve tekst over een seizoen oefent gestructureerd schrijven met observaties en feiten.',
    developmentalMilestones: [
      { milestone: 'Temperatuurtabellen interpreteren (7\u20138-jarigen lezen en vergelijken maandtemperaturen)', howWeAddress: 'Weerdata-activiteiten waarbij kinderen maandtemperaturen in een tabel aflezen en vergelijkingsvragen beantwoorden bouwen datageletterdheid op' },
      { milestone: 'Kalenderrekenen met seizoensperiodes (dagen tellen, begin- en einddatum berekenen)', howWeAddress: 'Kalenderactiviteiten waarbij kinderen de duur van seizoenen en vakanties berekenen oefenen rekenen met data en periodes' },
      { milestone: 'Vermenigvuldigen met seizoensactiviteiten (frequentie maal weken)', howWeAddress: 'Activiteitsberekeningen waarbij kinderen wekelijkse activiteiten vermenigvuldigen met het aantal weken oefenen de tafels seizoensgebonden' },
      { milestone: 'Informatief schrijven over een seizoen (kenmerken, weer, natuur, activiteiten)', howWeAddress: 'Schrijfopdrachten over een seizoen met observaties, weergegevens en activiteiten oefenen informatief schrijven met natuurwetenschappelijke inhoud' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tabellen tot drie maanden met eenvoudige temperaturen, bied kalenderrekenen aan met hele weken en laat een seizoensbeschrijving schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer tabellen met vijf kolommen en trendanalyse, laat hen seizoenen vergelijken met gemiddelden en daag hen uit met een seizoenenrapport inclusief temperatuurgrafiek en vergelijking van twee seizoenen.',
    parentTakeaway: 'Seizoenen bieden dagelijkse rekenkansen in groep 4. Vergelijk samen de temperatuur: hoe warm was het gisteren, hoe warm vandaag, hoeveel graden verschil? Tel samen de dagen tot het volgende seizoen begint. Hoeveel keer per week zwem je in de zomer en hoeveel keer in 10 weken? Na een seizoenenwerkblad kunt u samen een seizoen beschrijven \u2014 wat zie je, wat ruik je, wat doe je in de herfst of lente?',
    classroomIntegration: 'Het seizoenenthema integreert in groep 4 met rekenen (temperatuurtabellen, kalenderrekenen, vermenigvuldigen), taal (informatief schrijven, seizoenswoordenschat), natuur en techniek (weer, plantengroei, diergedrag) en beeldende vorming (seizoenscollages). Een seizoenenproject met werkbladen, een weermeting en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Temperatuurtabellen interpreteren', emerging: 'leest een temperatuur af maar vergelijkt maanden niet zelfstandig', proficient: 'leest een temperatuurtabel correct af, vergelijkt maanden en beantwoordt vragen over het verschil', advanced: 'analyseert temperatuurtrends over vier seizoenen, berekent gemiddelden en trekt conclusies' },
      { skill: 'Kalenderrekenen met seizoenen', emerging: 'telt dagen op een kalender met hulp maar berekent seizoensduur niet zelfstandig', proficient: 'berekent zelfstandig de duur van seizoenen en vakanties in dagen en weken', advanced: 'vergelijkt seizoenslengtes, berekent het verschil en plant activiteiten over meerdere seizoenen' },
      { skill: 'Informatief schrijven over een seizoen', emerging: 'schrijft losse feiten over een seizoen maar organiseert ze niet', proficient: 'schrijft een gestructureerde tekst over een seizoen met kenmerken, weer en activiteiten', advanced: 'schrijft een uitgebreid seizoenenrapport met vergelijking, temperatuurgrafiek en persoonlijke observaties' },
    ],
  },

  shapes: {
    seoTitle: 'Vormen-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare vormen-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vormen groep 4, vormen oefeningen 7\u20138 jaar, vormen oefeningen groep 4, vormen uitprintbaar groep 4, vormen werkbladen groep 4, vormen activiteiten groep 4, vormen leerbladen 7\u20138 jaar, vormen gratis groep 4, vormen PDF groep 4, vormen rekenen groep 4',
    snippetAnswer: 'Vormen-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met meetkunde: omtrek en oppervlakte berekenen, vermenigvuldigen van zijden en hoeken, symmetrie herkennen, redactiesommen over vormkenmerken en het schrijven van een vormbeschrijving met wiskundige termen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het vormenthema een meetkundige context voor omtrek- en oppervlakteberekeningen: zeven- en achtjarigen zijn klaar om vormen niet alleen te herkennen maar ook te meten en te berekenen. De SLO-leerlijnen benadrukken meetkunde, meten, vermenigvuldigen en wiskundige communicatie als kerndoelen, en vormen bieden alle vier. Omtrekberekeningen \u2014 een rechthoek van 5 cm lang en 3 cm breed, wat is de omtrek? \u2014 introduceren omtrek als de som van alle zijden. Oppervlakteberekeningen \u2014 lengte maal breedte \u2014 bouwen voort op vermenigvuldigingsvaardigheden. Symmetrie herkennen in complexere vormen oefent ruimtelijk inzicht. Vermenigvuldigsommen met zijden en hoeken \u2014 een vijfhoek heeft 5 zijden, hoeveel zijden hebben 6 vijfhoeken? \u2014 oefenen de tafels meetkundig. Redactiesommen over vormkenmerken vereisen wiskundig redeneren. Het schrijven van een vormbeschrijving met wiskundige termen oefent wiskundige communicatie.',
    developmentalMilestones: [
      { milestone: 'Omtrekberekening van eenvoudige vormen (7\u20138-jarigen tellen de zijden op)', howWeAddress: 'Omtrekactiviteiten waarbij kinderen de zijden van rechthoeken en driehoeken opmeten en optellen introduceren omtrek als meetbaar concept' },
      { milestone: 'Oppervlakteberekening als lengte maal breedte (rechthoeken en vierkanten)', howWeAddress: 'Oppervlakte-activiteiten waarbij kinderen rasters tellen en de formule lengte maal breedte ontdekken bouwen oppervlaktebegrip op' },
      { milestone: 'Symmetrie herkennen in complexere vormen (symmetrielijnen tekenen)', howWeAddress: 'Symmetrie-activiteiten waarbij kinderen symmetrielijnen in vormen en letters tekenen ontwikkelen ruimtelijk inzicht' },
      { milestone: 'Wiskundige communicatie: vormbeschrijving met vaktermen (zijden, hoeken, omtrek)', howWeAddress: 'Schrijfopdrachten waarbij kinderen vormen beschrijven met wiskundige termen als zijden, hoeken en omtrek oefenen wiskundige communicatie' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk omtrekberekeningen tot vierkanten en rechthoeken met kleine getallen, bied symmetrieopdrachten aan met eenvoudige vormen en laat een vormbeschrijving schrijven met een woordenbank. Voor gevorderde kinderen: introduceer omtrek van onregelmatige vormen, laat hen oppervlaktes vergelijken en daag hen uit met een vormonderzoek: hoeveel symmetrielijnen hebben verschillende veelhoeken?',
    parentTakeaway: 'Vormen bieden dagelijkse meetkansen in groep 4. Meet samen de tafel: hoe lang, hoe breed, wat is de omtrek (alle zijden bij elkaar)? Wat is de oppervlakte (lengte maal breedte)? Zoek samen symmetrie in huis: welke voorwerpen zijn symmetrisch, waar loopt de symmetrielijn? Na een vormenwerkblad kunt u samen een vorm beschrijven met wiskundige woorden \u2014 hoeveel zijden, hoeveel hoeken, is het symmetrisch?',
    classroomIntegration: 'Het vormenthema integreert in groep 4 met rekenen (omtrek, oppervlakte, symmetrie, vermenigvuldigen), taal (wiskundige communicatie, vormbeschrijvingen), natuur en techniek (vormen in architectuur en natuur) en beeldende vorming (geometrische kunst). Een vormenproject met werkbladen, een meetactiviteit en een wiskundige schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Omtrekberekening', emerging: 'meet zijden maar telt ze niet altijd correct op tot de omtrek', proficient: 'berekent de omtrek van rechthoeken en vierkanten correct door alle zijden op te tellen', advanced: 'berekent de omtrek van onregelmatige vormen, vergelijkt omtrekken en ontdekt dat vormen met dezelfde omtrek verschillende oppervlaktes kunnen hebben' },
      { skill: 'Oppervlakteberekening', emerging: 'telt rasters maar past de formule lengte maal breedte niet zelfstandig toe', proficient: 'berekent de oppervlakte van rechthoeken correct als lengte maal breedte met de juiste eenheid', advanced: 'berekent oppervlaktes van samengestelde vormen door ze op te delen, vergelijkt en trekt conclusies' },
      { skill: 'Wiskundige communicatie over vormen', emerging: 'noemt de vormnaam maar gebruikt geen wiskundige termen als zijden of hoeken', proficient: 'beschrijft vormen met wiskundige termen: aantal zijden, hoeken, omtrek en symmetrie', advanced: 'vergelijkt vormen wiskundig, classificeert op eigenschappen en legt verbanden uit tussen omtrek en oppervlakte' },
    ],
  },

  space: {
    seoTitle: 'Ruimte-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare ruimte-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'ruimte groep 4, ruimte oefeningen 7\u20138 jaar, ruimte oefeningen groep 4, ruimte uitprintbaar groep 4, ruimte werkbladen groep 4, ruimte activiteiten groep 4, ruimte leerbladen 7\u20138 jaar, ruimte gratis groep 4, ruimte PDF groep 4, ruimte rekenen groep 4',
    snippetAnswer: 'Ruimte-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met sterrenkunde: vermenigvuldigen met planeetgegevens, tabellen met afstanden in het zonnestelsel, grote getallen vergelijken, redactiesommen over ruimtemissies en informatief schrijven over een planeet. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het ruimtethema een kosmische context voor grote getallen en gegevensanalyse: zeven- en achtjarigen zijn gefascineerd door het heelal en die betrokkenheid maakt rekenen met planeetgegevens, afstanden en missieduur bijzonder inspirerend. De SLO-leerlijnen benadrukken grotere getallen, vermenigvuldigen, gegevensverwerking en informatief schrijven als kerndoelen, en de ruimte biedt alle vier op een kosmische schaal. Tabellen met planeetgegevens \u2014 diameter, afstand tot de zon, aantal manen \u2014 introduceren gegevensanalyse met fascinerende cijfers. Vermenigvuldigsommen met manen \u2014 Jupiter heeft 95 manen, Saturnus 146, hoeveel samen? \u2014 oefenen optellen met grote getallen. Vergelijken van planeetdiameters en -afstanden oefent ordenen en vergelijken. Redactiesommen over ruimtemissies \u2014 een raket reist 28.000 km per uur, hoeveel in 3 uur? \u2014 vereisen vermenigvuldiging met grote getallen. Het schrijven van een informatieve tekst over een planeet oefent gestructureerd schrijven met wetenschappelijke feiten.',
    developmentalMilestones: [
      { milestone: 'Tabellen met planeetgegevens interpreteren (7\u20138-jarigen vergelijken diameter, afstand en manen)', howWeAddress: 'Planeettabel-activiteiten waarbij kinderen gegevens vergelijken en vragen beantwoorden bouwen datageletterdheid op met kosmische inhoud' },
      { milestone: 'Rekenen met grote getallen in een ruimtecontext (afstanden, snelheden)', howWeAddress: 'Ruimterekensommen waarbij kinderen grote getallen optellen en vermenigvuldigen oefenen rekenen voorbij 100 met inspirerende cijfers' },
      { milestone: 'Planeten ordenen en vergelijken op kenmerken (grootte, afstand, temperatuur)', howWeAddress: 'Vergelijkingsactiviteiten waarbij kinderen planeten ordenen op een kenmerk en het verschil berekenen oefenen ordenen en vergelijken' },
      { milestone: 'Informatief schrijven over een planeet (kenmerken, feiten, vergelijking met de aarde)', howWeAddress: 'Schrijfopdrachten over een planeet met diameter, atmosfeer en vergelijking met de aarde oefenen informatief schrijven met wetenschappelijke structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tabellen tot drie planeten met eenvoudige getallen, bied vergelijkingsvragen aan met twee kenmerken en laat een planeetbeschrijving schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer alle acht planeten met complexe vergelijkingen, laat hen afstanden berekenen en daag hen uit met een ruimtemissierapport inclusief reistijd, afstand en een planeetprofiel.',
    parentTakeaway: 'De ruimte biedt inspirerende rekenkansen in groep 4. Zoek samen planeetfeiten op: hoe groot is Jupiter, hoeveel manen heeft Saturnus? Vergelijk planeten: welke is het grootst, welke het verst van de zon? Als een raket 28.000 km per uur vliegt, hoeveel kilometer in 5 uur? Na een ruimtewerkblad kunt u samen een planeet beschrijven \u2014 hoe groot is hij, hoe ver van de zon, en hoe verschilt hij van de aarde?',
    classroomIntegration: 'Het ruimtethema integreert in groep 4 met rekenen (grote getallen, tabellen, vermenigvuldigen), taal (informatief schrijven, ruimtewoordenschat), natuur en techniek (sterrenkunde, zonnestelsel, ruimtevaart) en beeldende vorming (planeetmodellen). Een ruimteproject met werkbladen, een planeetonderzoek en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Planeetgegevenstabellen interpreteren', emerging: 'leest afzonderlijke waarden af maar vergelijkt planeten niet zelfstandig', proficient: 'leest een tabel met vijf planeten af, vergelijkt op twee kenmerken en beantwoordt vragen correct', advanced: 'analyseert tabellen, ordent planeten op een kenmerk en trekt conclusies over patronen in het zonnestelsel' },
      { skill: 'Rekenen met grote getallen', emerging: 'telt tot 100 maar heeft moeite met grotere getallen en vermenigvuldiging', proficient: 'vermenigvuldigt en telt op met getallen voorbij 100 in ruimtecontexten en noteert correct', advanced: 'rekent vlot met grote getallen, vergelijkt afstanden en trekt conclusies over schaalverhoudingen' },
      { skill: 'Informatief schrijven over een planeet', emerging: 'schrijft losse feiten over een planeet maar organiseert ze niet', proficient: 'schrijft een gestructureerde tekst over een planeet met kenmerken, feiten en vergelijking met de aarde', advanced: 'schrijft een uitgebreid planeetprofiel met kopjes, gegevenstabel en vergelijking tussen planeten' },
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
