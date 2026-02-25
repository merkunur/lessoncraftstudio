#!/usr/bin/env node
/**
 * SEO Part 329: NL Second-Grade Enrichment \u2014 Themes 39-50
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the second-grade grade block of 12 NL theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    seoTitle: 'Sport-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare sport-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'sport groep 4, sport oefeningen 7\u20138 jaar, sport oefeningen groep 4, sport uitprintbaar groep 4, sport werkbladen groep 4, sport activiteiten groep 4, sport leerbladen 7\u20138 jaar, sport gratis groep 4, sport PDF groep 4, sport rekenen groep 4',
    snippetAnswer: 'Sport-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met atletiek: scoretabellen bijhouden en vergelijken, vermenigvuldigen van punten per ronde, tijdberekeningen met stopwatch, redactiesommen over wedstrijden en het schrijven van een wedstrijdverslag. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het sportthema een dynamische context voor gegevensverwerking en tijdrekenen: zeven- en achtjarigen zijn enthousiast over sport en die motivatie maakt rekenen met scores, tijden en afstanden bijzonder effectief. De SLO-leerlijnen benadrukken vermenigvuldigen, gegevensverwerking, meten en functioneel schrijven als kerndoelen, en sport biedt alle vier in een actieve context. Scoretabellen bijhouden \u2014 wie scoorde hoeveel punten in welke ronde \u2014 bouwt datageletterdheid op met persoonlijk relevante gegevens. Vermenigvuldigsommen met punten \u2014 bij handbal telt een doelpunt 1 punt, een vrije worp ook 1 punt; als je team 6 doelpunten maakt en 4 vrije worpen scoort, hoeveel punten in totaal? \u2014 oefenen de tafels in een wedstrijdcontext. Tijdberekeningen met stopwatch \u2014 de sprint duurde 14 seconden, de tweede poging 12 seconden, hoeveel sneller? \u2014 oefenen aftrekken met tijdseenheden. Redactiesommen over sportwedstrijden vereisen meerstapsberekeningen. Het schrijven van een wedstrijdverslag oefent functioneel schrijven met chronologie, feiten en een conclusie.',
    developmentalMilestones: [
      { milestone: 'Scoretabellen bijhouden en vergelijken (7\u20138-jarigen noteren scores per ronde en berekenen totalen)', howWeAddress: 'Wedstrijdactiviteiten waarbij kinderen scores per ronde in een tabel noteren, totalen berekenen en resultaten vergelijken bouwen datageletterdheid op met sportgegevens' },
      { milestone: 'Vermenigvuldigen met sportscores (punten per ronde maal aantal rondes)', howWeAddress: 'Score-rekenactiviteiten waarbij kinderen punten per ronde vermenigvuldigen en het totaal berekenen oefenen de tafels in een competitieve context' },
      { milestone: 'Tijdberekeningen met sportprestaties (sneller, langzamer, verschil in seconden)', howWeAddress: 'Stopwatchactiviteiten waarbij kinderen sprinttijden meten, vergelijken en het verschil berekenen oefenen aftrekken met tijdseenheden' },
      { milestone: 'Functioneel schrijven: wedstrijdverslag (wie, wat, waar, uitslag, conclusie)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een wedstrijdverslag schrijven met de uitslag, hoogtepunten en een sportief oordeel oefenen functioneel schrijven met feiten' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tabellen tot twee teams met kleine scores, bied vermenigvuldigsommen aan met de tafels van 2 en 5 en sportplaatjes, en laat een wedstrijdverslag schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer tabellen met meerdere rondes en teams, laat hen gemiddelden berekenen en daag hen uit met een sportstatistiekenrapport inclusief grafieken en vergelijkingen.',
    parentTakeaway: 'Sport biedt motiverende rekenkansen in groep 4. Houd samen de score bij tijdens een wedstrijd: wie scoorde hoeveel punten per helft, hoeveel bij elkaar? Meet samen de sprinttijd: hoe snel was de eerste poging, hoe snel de tweede, hoeveel verschil? Als je team 3 wedstrijden speelt en elke keer 4 doelpunten maakt, hoeveel doelpunten in totaal? Na een sportwerkblad kunt u samen een kort wedstrijdverslag schrijven over de laatste wedstrijd.',
    classroomIntegration: 'Het sportthema integreert in groep 4 met rekenen (scoretabellen, vermenigvuldigen, tijdberekeningen), taal (functioneel schrijven, sportwoordenschat), bewegingsonderwijs (prestatiemeting, fair play) en burgerschap (sportiviteit, samenwerking). Een sportproject met werkbladen, een klassentoernooi en een verslagactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Scoretabellen bijhouden', emerging: 'noteert scores maar berekent totalen niet zelfstandig en vergelijkt niet', proficient: 'houdt een scoretabel bij met totalen per team, vergelijkt resultaten en beantwoordt vragen correct', advanced: 'analyseert scoretabellen over meerdere rondes, berekent gemiddelden en identificeert trends' },
      { skill: 'Tijdberekeningen met sport', emerging: 'leest tijden af maar berekent het verschil niet zelfstandig', proficient: 'berekent tijdverschillen in seconden, vergelijkt prestaties en bepaalt wie sneller was', advanced: 'berekent tijdverschillen, gemiddelde tijden en voorspelt prestaties op basis van trends' },
      { skill: 'Functioneel schrijven: wedstrijdverslag', emerging: 'vermeldt de uitslag maar beschrijft het verloop niet en mist structuur', proficient: 'schrijft een wedstrijdverslag met wie, wat, waar, uitslag en een sportieve conclusie', advanced: 'schrijft een uitgebreid verslag met hoogtepunten, statistieken, citaten en een evaluatie' },
    ],
  },

  spring: {
    seoTitle: 'Lente-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare lente-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'lente groep 4, lente oefeningen 7\u20138 jaar, lente oefeningen groep 4, lente uitprintbaar groep 4, lente werkbladen groep 4, lente activiteiten groep 4, lente leerbladen 7\u20138 jaar, lente gratis groep 4, lente PDF groep 4, lente rekenen groep 4',
    snippetAnswer: 'Lente-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met natuurontwaken: groeitabellen van planten bijhouden, vermenigvuldigen van bloembollen in rijen, daglengte berekenen met zonsopkomst en -ondergang, redactiesommen over tuinieren en informatief schrijven over de lente. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het lentethema een levende context voor meten en gegevensverwerking: zeven- en achtjarigen zien de natuur veranderen en die directe observatie maakt rekenen met groei, temperatuur en daglengte bijzonder betekenisvol. De SLO-leerlijnen benadrukken meten, vermenigvuldigen, gegevensverwerking en informatief schrijven als kerndoelen, en de lente biedt alle vier. Groeitabellen bijhouden \u2014 elke week de hoogte van een narcis meten en noteren \u2014 bouwt datageletterdheid op met levende gegevens. Vermenigvuldigsommen met bloembollen \u2014 5 rijen van 8 tulpen, hoeveel bloembollen in totaal? \u2014 maken de tafels zichtbaar in het tuinbed. Daglengteberekeningen \u2014 de zon komt op om 7:15 en gaat onder om 19:45, hoeveel uur licht? \u2014 oefenen tijdrekenen met seizoensgebonden gegevens. Redactiesommen over tuinieren vereisen meerstapsberekeningen met hoeveelheden en kosten. Het schrijven van een informatieve tekst over de lente oefent gestructureerd schrijven met observaties en wetenschappelijke feiten.',
    developmentalMilestones: [
      { milestone: 'Groeitabellen van planten bijhouden (7\u20138-jarigen meten en noteren wekelijks)', howWeAddress: 'Meetactiviteiten waarbij kinderen plantenhoogte wekelijks meten, in een tabel noteren en de groei vergelijken bouwen datageletterdheid op met seizoensgegevens' },
      { milestone: 'Vermenigvuldigen met bloembollen en zaden (rijen maal kolommen in het tuinbed)', howWeAddress: 'Tuinactiviteiten waarbij kinderen bloembollen in rijen en kolommen planten en het totaal berekenen maken vermenigvuldiging concreet en seizoensgebonden' },
      { milestone: 'Daglengte berekenen met tijden (verschil tussen zonsopkomst en zonsondergang)', howWeAddress: 'Tijdrekenactiviteiten waarbij kinderen de daglengte berekenen uit zonsopkomst en -ondergang oefenen tijdrekenen met seizoensgegevens' },
      { milestone: 'Informatief schrijven over de lente (observaties, veranderingen, oorzaken)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een informatieve tekst schrijven over lenteveranderingen met observaties en verklaringen oefenen informatief schrijven met wetenschappelijke inhoud' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk groeitabellen tot drie meetmomenten met eenvoudige getallen, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met bloemplaatjes, en laat een lentetekst schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer groeigrafieken met weekvergelijkingen, laat hen daglengtes over meerdere weken vergelijken en daag hen uit met een lenterapport inclusief groeitabel, temperatuurgrafiek en seizoensvergelijking.',
    parentTakeaway: 'De lente biedt levende rekenkansen in groep 4. Meet samen een plant in de tuin: hoe hoog is hij nu, hoe hoog was hij vorige week, hoeveel centimeter gegroeid? Plant samen bloembollen: 4 rijen van 6 tulpen, hoeveel in totaal? Kijk samen naar de zonsopkomst en -ondergang: hoeveel uur licht is het vandaag, is dat meer dan vorige maand? Na een lentewerkblad kunt u samen beschrijven wat er in de lente verandert \u2014 welke bloemen bloeien, welke dieren worden wakker?',
    classroomIntegration: 'Het lentethema integreert in groep 4 met rekenen (groeitabellen, vermenigvuldigen, tijdrekenen), taal (informatief schrijven, lentewoordenschat), natuur en techniek (plantengroei, seizoenen, weer) en beeldende vorming (bloemen tekenen, lentekunst). Een lenteproject met werkbladen, een schooltuinmeting en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Groeitabellen bijhouden en interpreteren', emerging: 'meet de plant maar noteert niet consequent en vergelijkt metingen niet', proficient: 'meet wekelijks correct, noteert in een tabel en vergelijkt de groei tussen meetmomenten', advanced: 'houdt een nauwkeurige groeitabel bij, tekent een groeigrafiek en trekt conclusies over groeisnelheid' },
      { skill: 'Daglengte berekenen', emerging: 'leest tijden af maar berekent het verschil niet zelfstandig', proficient: 'berekent de daglengte correct uit zonsopkomst en -ondergang en vergelijkt over weken', advanced: 'berekent daglengtes over meerdere weken, tekent een grafiek en verklaart het seizoenspatroon' },
      { skill: 'Informatief schrijven over de lente', emerging: 'noemt lenteverschijnselen maar organiseert ze niet en mist verklaringen', proficient: 'schrijft een gestructureerde tekst over lenteveranderingen met observaties en verklaringen', advanced: 'schrijft een uitgebreid lenterapport met kopjes, gegevens en vergelijking tussen seizoenen' },
    ],
  },

  summer: {
    seoTitle: 'Zomer-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare zomer-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'zomer groep 4, zomer oefeningen 7\u20138 jaar, zomer oefeningen groep 4, zomer uitprintbaar groep 4, zomer werkbladen groep 4, zomer activiteiten groep 4, zomer leerbladen 7\u20138 jaar, zomer gratis groep 4, zomer PDF groep 4, zomer rekenen groep 4',
    snippetAnswer: 'Zomer-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met vakantie-avonturen: budgetberekeningen voor uitjes, vermenigvuldigen van ijsjes en zwembadkaartjes, temperatuurtabellen vergelijken, redactiesommen over vakantieplannen en het schrijven van een vakantiedagboek. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het zomerthema een motiverende context voor geldrekenen en temperatuurmeting: zeven- en achtjarigen kijken uit naar de zomervakantie en die anticipatie maakt rekenen met budgetten, temperaturen en hoeveelheden bijzonder effectief. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, meten en creatief schrijven als kerndoelen, en de zomer biedt alle vier. Budgetberekeningen voor zomeruitjes \u2014 zwemkaartje 4 euro, ijsje 2 euro, drankje 1,50 euro, hoeveel voor 3 kinderen? \u2014 oefenen vermenigvuldiging en optelling met geld. Temperatuurtabellen \u2014 de temperatuur per dag in de vakantieweek noteren en vergelijken \u2014 bouwen datageletterdheid op met weersgegevens. Vermenigvuldigsommen met vakantie-items \u2014 elke dag 2 ijsjes voor 7 dagen, hoeveel ijsjes in totaal? \u2014 maken de tafels concreet. Redactiesommen over vakantieplannen vereisen meerstapsberekeningen. Het schrijven van een vakantiedagboek oefent creatief schrijven met persoonlijke ervaringen, chronologie en beschrijving.',
    developmentalMilestones: [
      { milestone: 'Budgetberekeningen voor zomeruitjes (7\u20138-jarigen rekenen met geld en vermenigvuldigen kosten)', howWeAddress: 'Vakantiebudget-activiteiten waarbij kinderen kosten per persoon vermenigvuldigen en het totaal berekenen oefenen geldrekenen in een vakantiecontext' },
      { milestone: 'Temperatuurtabellen bijhouden en vergelijken (dagtemperaturen noteren en analyseren)', howWeAddress: 'Weeractiviteiten waarbij kinderen de dagtemperatuur noteren in een tabel en de warmste en koelste dag bepalen bouwen datageletterdheid op' },
      { milestone: 'Vermenigvuldigen met vakantie-items (hoeveelheden per dag maal aantal dagen)', howWeAddress: 'Vakantie-rekenactiviteiten waarbij kinderen dagelijkse hoeveelheden vermenigvuldigen voor de hele vakantie oefenen de tafels in een zomerse context' },
      { milestone: 'Creatief schrijven: vakantiedagboek (persoonlijke ervaringen met chronologie en beschrijving)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een vakantiedagboek bijhouden met datum, activiteiten en een persoonlijke reflectie oefenen creatief schrijven met structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk budgetsommen tot twee items met ronde bedragen, bied vermenigvuldigsommen aan met de tafels van 2 en 5 en zomerplaatjes, en laat een vakantiedagboek schrijven met een invulsjabloon per dag. Voor gevorderde kinderen: introduceer budgetten met meerdere personen en wisselgeld, laat hen temperatuurgrafieken tekenen en daag hen uit met een vakantieplanningsproject inclusief budget, reisschema en dagboek.',
    parentTakeaway: 'De zomer biedt dagelijkse rekenkansen in groep 4. Reken samen het uitjesbudget uit: als het zwembad 4 euro per persoon kost en jullie met 4 personen gaan, hoeveel kost dat? Houd samen de temperatuur bij: hoe warm was het maandag, hoe warm dinsdag, welke dag was het warmst? Als je elke dag 2 ijsjes eet in een vakantie van 7 dagen, hoeveel ijsjes is dat? Na een zomerwerkblad kunt u samen een dagboekpagina schrijven over de leukste vakantiedag.',
    classroomIntegration: 'Het zomerthema integreert in groep 4 met rekenen (budgetberekeningen, vermenigvuldigen, temperatuurtabellen), taal (creatief schrijven, vakantiewoordenschat), aardrijkskunde (weer, klimaat, vakantiebestemmingen) en bewegingsonderwijs (zomersporten, buitenactiviteiten). Een zomerproject met werkbladen, een weerstation en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Budgetberekeningen voor zomeruitjes', emerging: 'telt twee kosten op maar vermenigvuldigt niet voor meerdere personen', proficient: 'berekent zelfstandig het totale budget voor meerdere personen met vermenigvuldiging en optelling', advanced: 'vergelijkt budgetten voor verschillende uitjes, berekent wisselgeld en kiest de voordeligste optie met onderbouwing' },
      { skill: 'Temperatuurtabellen interpreteren', emerging: 'leest temperaturen af maar vergelijkt niet en bepaalt niet het verschil', proficient: 'leest een temperatuurtabel af, bepaalt de warmste en koelste dag en berekent het verschil', advanced: 'analyseert temperatuurgegevens over weken, tekent een grafiek en beschrijft het weerpatroon' },
      { skill: 'Creatief schrijven: vakantiedagboek', emerging: 'schrijft korte zinnen over een dag maar gebruikt weinig beschrijving en geen chronologie', proficient: 'schrijft een dagboekpagina met datum, activiteiten, beschrijving en een persoonlijke reflectie', advanced: 'schrijft een meerdaags dagboek met gevarieerde zinsbouw, levendige beschrijvingen en een terugblik' },
    ],
  },

  superheroes: {
    seoTitle: 'Superhelden-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare superhelden-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'superhelden groep 4, superhelden oefeningen 7\u20138 jaar, superhelden oefeningen groep 4, superhelden uitprintbaar groep 4, superhelden werkbladen groep 4, superhelden activiteiten groep 4, superhelden leerbladen 7\u20138 jaar, superhelden gratis groep 4, superhelden PDF groep 4, superhelden rekenen groep 4',
    snippetAnswer: 'Superhelden-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met heldenvermogens: vermenigvuldigen van superkrachten, vergelijkingstabellen van helden, redactiesommen over reddingsmissies, tijdberekeningen en het schrijven van een eigen superheldenverhaal. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het superheldenthema een fantasierijke context voor vergelijkend rekenen en creatief schrijven: zeven- en achtjarigen zijn gefascineerd door superhelden en die passie maakt rekenen met vermogens, scores en missies bijzonder motiverend. De SLO-leerlijnen benadrukken vermenigvuldigen, vergelijken, gegevensverwerking en creatief schrijven als kerndoelen, en superhelden bieden alle vier. Vergelijkingstabellen van helden \u2014 snelheid, kracht en behendigheid op een schaal van 1 tot 10 \u2014 bouwen datageletterdheid op met boeiende gegevens. Vermenigvuldigsommen met superkrachten \u2014 de held redt 4 mensen per missie en gaat op 7 missies, hoeveel mensen gered? \u2014 oefenen de tafels in een heroische context. Tijdberekeningen bij reddingsmissies \u2014 de held vertrok om 14:30 en was om 15:15 klaar, hoeveel minuten duurde de missie? \u2014 oefenen tijdrekenen. Redactiesommen over reddingsmissies vereisen meerstapsberekeningen. Het schrijven van een eigen superheldenverhaal oefent creatief schrijven met karakterontwikkeling, spanning en dialoog.',
    developmentalMilestones: [
      { milestone: 'Vergelijkingstabellen van superhelden interpreteren (7\u20138-jarigen vergelijken eigenschappen op schaal)', howWeAddress: 'Heldenprofielactiviteiten waarbij kinderen eigenschappen van superhelden in een tabel zetten en vergelijken bouwen datageletterdheid op met fantasiegegevens' },
      { milestone: 'Vermenigvuldigen met reddingsmissies (mensen per missie maal aantal missies)', howWeAddress: 'Missie-rekenactiviteiten waarbij kinderen het totaal aantal geredde mensen berekenen via vermenigvuldiging oefenen de tafels in een heroische context' },
      { milestone: 'Tijdberekeningen bij missies (duur van een reddingsoperatie in minuten)', howWeAddress: 'Tijdrekenactiviteiten waarbij kinderen de duur van superheldenmissies berekenen uit start- en eindtijd oefenen tijdrekenen met spanning' },
      { milestone: 'Creatief schrijven: eigen superheldenverhaal (karakter, kracht, missie, ontknoping)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een eigen superheld bedenken en een avontuur schrijven met spanning en dialoog oefenen creatief schrijven met structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vergelijkingstabellen tot twee helden met drie eigenschappen, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met heldenplaatjes, en laat een superheldenverhaal schrijven met een verhaalkader. Voor gevorderde kinderen: introduceer tabellen met vijf helden en complexe vergelijkingen, laat hen missiestatistieken berekenen en daag hen uit met een superheldenstrip inclusief dialoog, actie en een morele boodschap.',
    parentTakeaway: 'Superhelden bieden fantasierijke rekenkansen in groep 4. Bedenk samen een superheld: als hij 5 mensen per missie redt en 6 missies doet, hoeveel mensen heeft hij gered? Vergelijk superhelden: wie is sterker, wie is sneller, zet het in een tabel. Als een missie begint om 3 uur en 45 minuten duurt, hoe laat is de held klaar? Na een superheldenwerkblad kunt u samen een kort avontuur schrijven over jullie eigen superheld.',
    classroomIntegration: 'Het superheldenthema integreert in groep 4 met rekenen (vergelijkingstabellen, vermenigvuldigen, tijdrekenen), taal (creatief schrijven, superheldenwoordenschat), burgerschap (helpen, rechtvaardigheid, verantwoordelijkheid) en beeldende vorming (superheldenontwerp). Een superheldenproject met werkbladen, een heldenprofiel en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vergelijkingstabellen van superhelden', emerging: 'leest afzonderlijke waarden af maar vergelijkt helden niet zelfstandig op meerdere eigenschappen', proficient: 'vergelijkt superhelden op drie eigenschappen, ordent ze en beantwoordt vergelijkingsvragen correct', advanced: 'analyseert tabellen met vijf helden, rankt ze op meerdere criteria en onderbouwt wie de sterkste held is' },
      { skill: 'Vermenigvuldigen met reddingsmissies', emerging: 'vermenigvuldigt met de tafels van 2 en 5 maar past dit niet toe in missiecontexten', proficient: 'berekent zelfstandig het totaal aantal geredde mensen via vermenigvuldiging en noteert de berekening', advanced: 'lost meerstaps-missiesommen op, combineert vermenigvuldiging met optelling en vergelijkt missieresultaten' },
      { skill: 'Creatief schrijven: superheldenverhaal', emerging: 'beschrijft een superheld maar schrijft geen compleet verhaal met plot en ontknoping', proficient: 'schrijft een superheldenverhaal met karakter, kracht, missie, spanning en ontknoping', advanced: 'schrijft een meerdelig verhaal met karakterontwikkeling, dialoog, beschrijvende taal en een morele boodschap' },
    ],
  },

  toys: {
    seoTitle: 'Speelgoed-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare speelgoed-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'speelgoed groep 4, speelgoed oefeningen 7\u20138 jaar, speelgoed oefeningen groep 4, speelgoed uitprintbaar groep 4, speelgoed werkbladen groep 4, speelgoed activiteiten groep 4, speelgoed leerbladen 7\u20138 jaar, speelgoed gratis groep 4, speelgoed PDF groep 4, speelgoed rekenen groep 4',
    snippetAnswer: 'Speelgoed-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met speelgoedwinkel: prijsvergelijkingen en budgetrekenen, vermenigvuldigen van aantallen en kosten, tabellen met speelgoedkenmerken, redactiesommen over spaaracties en het schrijven van een speelgoedrecensie. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het speelgoedthema een herkenbare context voor geldrekenen en consumentenbewustzijn: zeven- en achtjarigen kennen speelgoedprijzen en die vertrouwdheid maakt rekenen met budgetten, vergelijkingen en hoeveelheden bijzonder concreet. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, geldrekenen en functioneel schrijven als kerndoelen, en speelgoed biedt alle vier. Prijsvergelijkingen \u2014 de lego kost 24 euro en de puzzel 12 euro, hoeveel duurder is de lego? \u2014 oefenen aftrekken met geld. Budgetberekeningen \u2014 je hebt 50 euro, kun je de auto (18 euro) en de pop (15 euro) allebei kopen? \u2014 oefenen optellen en vergelijken. Vermenigvuldigsommen met speelgoed \u2014 elk kind krijgt 3 speelgoedjes en er zijn 8 kinderen, hoeveel speelgoedjes in totaal? \u2014 oefenen de tafels. Tabellen met speelgoedkenmerken \u2014 prijs, leeftijdsadvies, materiaal \u2014 bouwen datageletterdheid op. Het schrijven van een speelgoedrecensie oefent functioneel schrijven met een mening, argumenten en een advies.',
    developmentalMilestones: [
      { milestone: 'Prijsvergelijkingen en budgetrekenen (7\u20138-jarigen vergelijken kosten en berekenen wisselgeld)', howWeAddress: 'Speelgoedwinkelactiviteiten waarbij kinderen prijzen vergelijken, het totaal berekenen en wisselgeld uitrekenen oefenen geldrekenen met vertrouwde producten' },
      { milestone: 'Vermenigvuldigen met speelgoedaantallen (hoeveelheden per kind maal aantal kinderen)', howWeAddress: 'Verdeelactiviteiten waarbij kinderen speelgoed verdelen over kinderen en het totaal berekenen via vermenigvuldiging oefenen de tafels in een speelse context' },
      { milestone: 'Tabellen met speelgoedkenmerken interpreteren (prijs, leeftijd, materiaal vergelijken)', howWeAddress: 'Tabelactiviteiten waarbij kinderen speelgoedkenmerken in een tabel zetten en vergelijkingsvragen beantwoorden bouwen datageletterdheid op met consumenteninformatie' },
      { milestone: 'Functioneel schrijven: speelgoedrecensie (mening, argumenten, sterren, advies)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een speelgoedrecensie schrijven met een beoordeling en onderbouwing oefenen functioneel schrijven met een overtuigend doel' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk prijsvergelijkingen tot twee speelgoedjes met ronde bedragen, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met speelgoedplaatjes, en laat een recensie schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer budgetsommen met meerdere items en wisselgeld, laat hen een speelgoedcatalogus vergelijken en daag hen uit met een consumentenrapport inclusief prijsvergelijking, sterrenbeoordeling en koopadvies.',
    parentTakeaway: 'Speelgoed biedt vertrouwde rekenkansen in groep 4. Vergelijk samen prijzen: welk speelgoed is duurder, hoeveel verschil? Als je 30 euro hebt, welke twee speelgoedjes kun je kopen en hoeveel houd je over? Als elk kind 3 cadeautjes krijgt en er zijn 6 kinderen op het feest, hoeveel cadeautjes heb je nodig? Na een speelgoedwerkblad kunt u samen een recensie schrijven: hoe leuk vind je het speelgoed, waarom, en zou je het aanraden?',
    classroomIntegration: 'Het speelgoedthema integreert in groep 4 met rekenen (geldrekenen, vermenigvuldigen, tabellen), taal (functioneel schrijven, speelgoedwoordenschat), burgerschap (consumentenbewustzijn, reclame herkennen) en natuur en techniek (materialen, duurzaamheid). Een speelgoedproject met werkbladen, een klassenwinkel en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Prijsvergelijkingen en budgetrekenen', emerging: 'vergelijkt twee prijzen maar berekent wisselgeld niet zelfstandig', proficient: 'vergelijkt prijzen, berekent het totaal en wisselgeld correct bij aankoop van meerdere items', advanced: 'vergelijkt meerdere opties, berekent de voordeligste combinatie binnen een budget en onderbouwt de keuze' },
      { skill: 'Vermenigvuldigen met speelgoedaantallen', emerging: 'vermenigvuldigt met de tafels van 2 en 5 maar past dit niet toe op speelgoedverdelingen', proficient: 'berekent zelfstandig het totaal via vermenigvuldiging en past dit toe in verdeelsituaties', advanced: 'lost meerstaps-verdeelsommen op, combineert vermenigvuldiging met optelling en controleert het antwoord' },
      { skill: 'Functioneel schrijven: speelgoedrecensie', emerging: 'geeft een mening maar onderbouwt niet met argumenten en structuur', proficient: 'schrijft een recensie met beschrijving, mening, argumenten en een sterrenbeoordeling', advanced: 'schrijft een uitgebreide recensie met vergelijking, voor- en nadelen en een onderbouwd koopadvies' },
    ],
  },

  transportation: {
    seoTitle: 'Vervoer-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare vervoer-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vervoer groep 4, vervoer oefeningen 7\u20138 jaar, vervoer oefeningen groep 4, vervoer uitprintbaar groep 4, vervoer werkbladen groep 4, vervoer activiteiten groep 4, vervoer leerbladen 7\u20138 jaar, vervoer gratis groep 4, vervoer PDF groep 4, vervoer rekenen groep 4',
    snippetAnswer: 'Vervoer-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met mobiliteit: reistijden berekenen met vertrek- en aankomsttijden, vermenigvuldigen van passagiers en ritten, vergelijkingstabellen van voertuigen, redactiesommen over routes en informatief schrijven over vervoersmiddelen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het vervoerthema een praktische context voor tijdrekenen en vergelijken: zeven- en achtjarigen reizen dagelijks en die ervaring maakt rekenen met reistijden, afstanden en passagiersaantallen bijzonder herkenbaar. De SLO-leerlijnen benadrukken tijdrekenen, vermenigvuldigen, gegevensverwerking en informatief schrijven als kerndoelen, en vervoer biedt alle vier. Reistijdberekeningen \u2014 de trein vertrekt om 8:15 en komt aan om 9:00, hoeveel minuten duurt de reis? \u2014 oefenen tijdrekenen met dienstregelingen. Vermenigvuldigsommen met passagiers \u2014 elke bus heeft 30 stoelen en er rijden 4 bussen, hoeveel passagiers kunnen mee? \u2014 oefenen de tafels met grote aantallen. Vergelijkingstabellen van voertuigen \u2014 snelheid, capaciteit, brandstofverbruik \u2014 bouwen datageletterdheid op met technische gegevens. Redactiesommen over routes vereisen meerstapsberekeningen met afstanden en tijden. Het schrijven van een informatieve tekst over een vervoersmiddel oefent gestructureerd schrijven met feiten en vergelijkingen.',
    developmentalMilestones: [
      { milestone: 'Reistijdberekeningen met dienstregelingen (7\u20138-jarigen berekenen de reisduur uit vertrek- en aankomsttijd)', howWeAddress: 'Dienstregeling-activiteiten waarbij kinderen reistijden berekenen uit vertrek- en aankomsttijden oefenen tijdrekenen met vertrouwde situaties' },
      { milestone: 'Vermenigvuldigen met passagiersaantallen (stoelen per voertuig maal aantal voertuigen)', howWeAddress: 'Vervoerrekenactiviteiten waarbij kinderen het totaal aantal passagiers berekenen via vermenigvuldiging oefenen de tafels met grote getallen' },
      { milestone: 'Vergelijkingstabellen van voertuigen interpreteren (snelheid, capaciteit, kosten)', howWeAddress: 'Tabelactiviteiten waarbij kinderen voertuigkenmerken vergelijken en het beste vervoersmiddel kiezen bouwen datageletterdheid op met technische informatie' },
      { milestone: 'Informatief schrijven over een vervoersmiddel (kenmerken, werking, voor- en nadelen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een informatieve tekst schrijven over een vervoersmiddel met feiten en vergelijking oefenen informatief schrijven met technische inhoud' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk reistijdberekeningen tot hele uren, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met voertuigplaatjes, en laat een voertuigbeschrijving schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer dienstregelingen met overstaptijden, laat hen routeberekeningen maken met meerdere haltes en daag hen uit met een vervoersrapport inclusief tijdtabel, kostenberekening en milieuvergelijking.',
    parentTakeaway: 'Vervoer biedt dagelijkse rekenkansen in groep 4. Bekijk samen de dienstregeling: als de trein om 8:15 vertrekt en om 9:00 aankomt, hoeveel minuten reis je? Als een bus 30 stoelen heeft en er rijden 3 bussen, hoeveel mensen kunnen mee? Vergelijk samen vervoersmiddelen: wat is sneller, wat is goedkoper, wat is beter voor het milieu? Na een vervoerwerkblad kunt u samen beschrijven hoe een voertuig werkt en waarom je het zou kiezen.',
    classroomIntegration: 'Het vervoerthema integreert in groep 4 met rekenen (tijdrekenen, vermenigvuldigen, vergelijkingstabellen), taal (informatief schrijven, vervoerwoordenschat), aardrijkskunde (routes, steden, afstanden) en burgerschap (duurzaam reizen, verkeersveiligheid). Een vervoerproject met werkbladen, een dienstregeling-activiteit en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Reistijdberekeningen', emerging: 'leest vertrek- en aankomsttijden af maar berekent de reisduur niet zelfstandig', proficient: 'berekent de reisduur correct in minuten en vergelijkt reistijden van verschillende routes', advanced: 'berekent reistijden met overstappen, telt wachttijd op en bepaalt de snelste route' },
      { skill: 'Vergelijkingstabellen van voertuigen', emerging: 'leest afzonderlijke waarden af maar vergelijkt voertuigen niet op meerdere kenmerken', proficient: 'vergelijkt voertuigen op drie kenmerken, ordent ze en kiest het beste vervoersmiddel met uitleg', advanced: 'analyseert tabellen met vijf voertuigen, weegt criteria af en onderbouwt een vervoersadvies' },
      { skill: 'Informatief schrijven over vervoer', emerging: 'noemt een voertuig maar beschrijft het niet gedetailleerd en vergelijkt niet', proficient: 'schrijft een informatieve tekst met kenmerken, werking en voor- en nadelen van een vervoersmiddel', advanced: 'schrijft een uitgebreid vervoersrapport met vergelijking van meerdere voertuigen, feiten en een conclusie' },
    ],
  },

  travel: {
    seoTitle: 'Reizen-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare reizen-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'reizen groep 4, reizen oefeningen 7\u20138 jaar, reizen oefeningen groep 4, reizen uitprintbaar groep 4, reizen werkbladen groep 4, reizen activiteiten groep 4, reizen leerbladen 7\u20138 jaar, reizen gratis groep 4, reizen PDF groep 4, reizen rekenen groep 4',
    snippetAnswer: 'Reizen-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met wereldavonturen: afstandsberekeningen op een kaart, vermenigvuldigen van reisdagen en kosten, landentabellen vergelijken, redactiesommen over vakantiebudget en het schrijven van een reisverslag. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het reisthema een avontuurlijke context voor kaartlezen en budgetrekenen: zeven- en achtjarigen dromen over verre landen en die nieuwsgierigheid maakt rekenen met afstanden, kosten en tijdzones bijzonder boeiend. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, gegevensverwerking en functioneel schrijven als kerndoelen, en reizen biedt alle vier. Afstandsberekeningen \u2014 van Amsterdam naar Parijs is 500 kilometer, van Parijs naar Barcelona 1000 kilometer, hoeveel bij elkaar? \u2014 oefenen optellen met grote getallen. Budgetberekeningen voor reizen \u2014 het hotel kost 80 euro per nacht voor 5 nachten, hoeveel in totaal? \u2014 oefenen vermenigvuldiging met geld. Landentabellen \u2014 hoofdstad, taal, inwoners, oppervlakte \u2014 bouwen datageletterdheid op met aardrijkskundige gegevens. Redactiesommen over reisbudget vereisen meerstapsberekeningen. Het schrijven van een reisverslag oefent functioneel schrijven met chronologie, beschrijving en feiten over bestemmingen.',
    developmentalMilestones: [
      { milestone: 'Afstandsberekeningen op een kaart (7\u20138-jarigen tellen kilometers tussen steden op)', howWeAddress: 'Kaartactiviteiten waarbij kinderen afstanden tussen steden optellen en totale reisafstanden berekenen oefenen optellen met grote getallen in een aardrijkskundige context' },
      { milestone: 'Vermenigvuldigen met reiskosten (prijs per nacht maal aantal nachten)', howWeAddress: 'Reisbudget-activiteiten waarbij kinderen hotelkosten vermenigvuldigen en het totale budget berekenen oefenen de tafels met geldcontexten' },
      { milestone: 'Landentabellen vergelijken (hoofdstad, taal, oppervlakte, inwoners)', howWeAddress: 'Tabelactiviteiten waarbij kinderen landengegevens vergelijken en vragen beantwoorden bouwen datageletterdheid op met aardrijkskundige informatie' },
      { milestone: 'Functioneel schrijven: reisverslag (bestemming, activiteiten, tips)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een reisverslag schrijven met een bestemming, hoogtepunten en reistips oefenen functioneel schrijven met informatief doel' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk afstandsberekeningen tot twee steden met ronde getallen, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met reisplaatjes, en laat een reisverslag schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer routes met meerdere stops en afstandsoptellingen, laat hen een compleet reisbudget opstellen en daag hen uit met een reisbrochure inclusief kaart, budget en beschrijving van drie bestemmingen.',
    parentTakeaway: 'Reizen biedt avontuurlijke rekenkansen in groep 4. Zoek samen afstanden op: hoe ver is het van jullie stad naar oma, hoeveel kilometer? Als het hotel 60 euro per nacht kost en jullie 4 nachten blijven, hoeveel kost dat? Vergelijk samen landen: welk land is groter, welk land heeft meer inwoners? Na een reizenwerkblad kunt u samen een reisverslag schrijven over jullie laatste vakantie of een droombestemming.',
    classroomIntegration: 'Het reisthema integreert in groep 4 met rekenen (afstandsberekeningen, vermenigvuldigen, budgetrekenen), taal (functioneel schrijven, reiswoordenschat), aardrijkskunde (landen, steden, kaartlezen) en burgerschap (culturele diversiteit, respect). Een reisproject met werkbladen, een kaartactiviteit en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Afstandsberekeningen', emerging: 'leest afstanden af maar telt routes met meerdere stops niet zelfstandig op', proficient: 'berekent totale afstanden over meerdere stops correct en vergelijkt routes', advanced: 'berekent de kortste en langste route, vergelijkt opties en onderbouwt de beste keuze' },
      { skill: 'Vermenigvuldigen met reiskosten', emerging: 'vermenigvuldigt met de tafels van 2 en 5 maar past dit niet toe in budgetberekeningen', proficient: 'berekent zelfstandig hotelkosten en eetbudget via vermenigvuldiging en telt het totaal op', advanced: 'stelt een compleet reisbudget op met meerdere kostenposten, vergelijkt bestemmingen en kiest de voordeligste' },
      { skill: 'Functioneel schrijven: reisverslag', emerging: 'noemt een bestemming maar beschrijft de reis niet met structuur en details', proficient: 'schrijft een reisverslag met bestemming, activiteiten, hoogtepunten en tips in een logische volgorde', advanced: 'schrijft een uitgebreide reisbrochure met meerdere bestemmingen, vergelijking en een persoonlijk advies' },
    ],
  },

  vegetables: {
    seoTitle: 'Groenten-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare groenten-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'groenten groep 4, groenten oefeningen 7\u20138 jaar, groenten oefeningen groep 4, groenten uitprintbaar groep 4, groenten werkbladen groep 4, groenten activiteiten groep 4, groenten leerbladen 7\u20138 jaar, groenten gratis groep 4, groenten PDF groep 4, groenten rekenen groep 4',
    snippetAnswer: 'Groenten-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met voedselwetenschap: wegen van groenten in grammen, vermenigvuldigen van porties en hoeveelheden, voedingswaardentabellen vergelijken, redactiesommen over recepten en informatief schrijven over gezonde voeding. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het groententhema een voedzame context voor meten en gegevensverwerking: zeven- en achtjarigen leren over gezonde voeding en die kennis maakt rekenen met gewichten, porties en voedingswaarden bijzonder praktisch. De SLO-leerlijnen benadrukken meten in standaardeenheden, vermenigvuldigen, gegevensverwerking en informatief schrijven als kerndoelen, en groenten bieden alle vier. Weegactiviteiten \u2014 hoeveel gram weegt een wortel, hoeveel een paprika, welke is zwaarder? \u2014 oefenen meten in grammen met tastbare producten. Vermenigvuldigsommen met porties \u2014 elk bord krijgt 3 stukken broccoli en er zijn 8 borden, hoeveel stukken in totaal? \u2014 oefenen de tafels in een voedingscontext. Voedingswaardentabellen \u2014 vitaminen, vezels en calorie\u00ebn per groentesoort \u2014 bouwen datageletterdheid op met gezondheidsrelevante informatie. Redactiesommen over recepten \u2014 voor 4 personen heb je 200 gram spinazie nodig, hoeveel voor 8 personen? \u2014 vereisen meerstapsberekeningen met verdubbeling. Het schrijven van een informatieve tekst over gezonde voeding oefent gestructureerd schrijven met feiten en adviezen.',
    developmentalMilestones: [
      { milestone: 'Wegen van groenten in grammen (7\u20138-jarigen meten gewicht met een weegschaal)', howWeAddress: 'Weegactiviteiten waarbij kinderen groenten wegen, de waarde in grammen noteren en vergelijken oefenen meten in standaardeenheden met tastbare producten' },
      { milestone: 'Vermenigvuldigen met porties en hoeveelheden (recept opschalen voor meer personen)', howWeAddress: 'Receptactiviteiten waarbij kinderen hoeveelheden vermenigvuldigen voor meer of minder personen oefenen de tafels in een kookcontext' },
      { milestone: 'Voedingswaardentabellen interpreteren (vitaminen, vezels, calorie\u00ebn vergelijken)', howWeAddress: 'Tabelactiviteiten waarbij kinderen voedingswaarden van groenten vergelijken en de gezondste keuze bepalen bouwen datageletterdheid op met gezondheidsinformatie' },
      { milestone: 'Informatief schrijven over gezonde voeding (feiten, adviezen, de schijf van vijf)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een informatieve tekst schrijven over gezond eten met feiten en tips oefenen informatief schrijven met een gezondheidsthema' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk weegactiviteiten tot vergelijken van twee groenten, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met groenteplaatjes, en laat een gezondtekst schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer receptberekeningen met verdrie- en vervierdubbeling, laat hen voedingswaarden vergelijken en daag hen uit met een gezondheidsrapport inclusief voedingstabel, receptberekening en voedingsadvies.',
    parentTakeaway: 'Groenten bieden keukenrekenkansen in groep 4. Weeg samen groenten: hoeveel gram weegt een tomaat, hoeveel een ui, welke is zwaarder? Als een recept 150 gram wortels vraagt voor 4 personen en jullie koken voor 8, hoeveel gram heb je nodig? Bekijk samen een voedingsetiket: hoeveel vezels zitten er in broccoli, hoeveel in spinazie? Na een groentenwerkblad kunt u samen opschrijven waarom groenten gezond zijn en welke groenten jullie het lekkerst vinden.',
    classroomIntegration: 'Het groententhema integreert in groep 4 met rekenen (wegen, vermenigvuldigen, voedingswaardentabellen), taal (informatief schrijven, groentewoordenschat), natuur en techniek (voeding, plantengroei, gezondheid) en burgerschap (gezond gedrag, de schijf van vijf). Een groentenproject met werkbladen, een kookactiviteit en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Wegen van groenten in grammen', emerging: 'weegt met een weegschaal maar noteert niet altijd de juiste waarde en eenheid', proficient: 'weegt zelfstandig groenten in grammen, noteert correct en vergelijkt gewichten', advanced: 'weegt nauwkeurig, berekent gewichtsverschillen en bepaalt hoeveel gram nodig is voor een recept' },
      { skill: 'Vermenigvuldigen met recepthoeveelheden', emerging: 'verdubbelt hoeveelheden met hulp maar past vermenigvuldiging niet zelfstandig toe bij opschalen', proficient: 'schaalt een recept zelfstandig op via vermenigvuldiging en noteert de nieuwe hoeveelheden correct', advanced: 'schaalt recepten op en af met verschillende vermenigvuldigingsfactoren en controleert de verhoudingen' },
      { skill: 'Informatief schrijven over gezonde voeding', emerging: 'noemt gezonde voeding maar onderbouwt niet met feiten en structuur', proficient: 'schrijft een informatieve tekst over gezond eten met feiten, adviezen en een logische opbouw', advanced: 'schrijft een uitgebreid gezondheidsrapport met voedingstabel, vergelijking en een persoonlijk voedingsadvies' },
    ],
  },

  weather: {
    seoTitle: 'Weer-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare weer-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'weer groep 4, weer oefeningen 7\u20138 jaar, weer oefeningen groep 4, weer uitprintbaar groep 4, weer werkbladen groep 4, weer activiteiten groep 4, weer leerbladen 7\u20138 jaar, weer gratis groep 4, weer PDF groep 4, weer rekenen groep 4',
    snippetAnswer: 'Weer-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met meteorologie: temperatuurtabellen bijhouden en vergelijken, temperatuurverschillen berekenen, neerslagtabellen analyseren, redactiesommen over weersvoorspellingen en informatief schrijven over weersverschijnselen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het weerthema een wetenschappelijke context voor gegevensverwerking en meten: zeven- en achtjarigen ervaren dagelijks het weer en die directe beleving maakt rekenen met temperaturen, neerslag en windsnelheden bijzonder relevant. De SLO-leerlijnen benadrukken gegevensverwerking, meten, rekenen tot 100 en informatief schrijven als kerndoelen, en weer biedt alle vier. Temperatuurtabellen bijhouden \u2014 elke dag de temperatuur meten en noteren \u2014 bouwt datageletterdheid op met wetenschappelijke metingen. Temperatuurverschillen berekenen \u2014 maandag was het 12 graden, dinsdag 8 graden, hoeveel verschil? \u2014 oefent aftrekken met negatieve en positieve getallen. Neerslagtabellen \u2014 hoeveel millimeter regen per dag, per week \u2014 introduceren meten in millimeters. Redactiesommen over weersvoorspellingen vereisen meerstapsberekeningen. Het schrijven van een informatieve tekst over weersverschijnselen oefent gestructureerd schrijven met wetenschappelijke verklaringen.',
    developmentalMilestones: [
      { milestone: 'Temperatuurtabellen bijhouden en analyseren (7\u20138-jarigen meten en noteren dagtemperaturen)', howWeAddress: 'Weerstation-activiteiten waarbij kinderen dagelijks de temperatuur meten, in een tabel noteren en de warmste en koelste dag bepalen bouwen datageletterdheid op' },
      { milestone: 'Temperatuurverschillen berekenen (verschil tussen dag- en nachttemperatuur of tussen dagen)', howWeAddress: 'Rekenactiviteiten waarbij kinderen temperatuurverschillen berekenen via aftrekken oefenen aftrekken met meetgegevens' },
      { milestone: 'Neerslagtabellen analyseren (millimeters regen per dag vergelijken en optellen)', howWeAddress: 'Neerslagactiviteiten waarbij kinderen dagelijkse neerslag in een tabel zetten en weektotalen berekenen oefenen optellen en meten in millimeters' },
      { milestone: 'Informatief schrijven over weersverschijnselen (beschrijving, oorzaak, gevolg)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een informatieve tekst schrijven over een weersverschijnsel met beschrijving en verklaring oefenen informatief schrijven met wetenschappelijke inhoud' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk temperatuurtabellen tot drie dagen met ronde getallen, bied temperatuurverschillen aan met alleen positieve getallen en laat een weertekst schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer temperatuurgrafieken met weekvergelijkingen, laat hen gemiddelde temperaturen berekenen en daag hen uit met een weerrapport inclusief temperatuurgrafiek, neerslagtabel en een weersvoorspelling.',
    parentTakeaway: 'Weer biedt dagelijkse rekenkansen in groep 4. Meet samen de temperatuur: hoe warm is het vandaag, hoe warm was het gisteren, hoeveel verschil? Houd samen een weertabel bij: noteer elke dag de temperatuur en bepaal aan het eind van de week welke dag het warmst was. Als het maandag 5 mm regent en dinsdag 8 mm, hoeveel samen? Na een weerwerkblad kunt u samen beschrijven waarom het regent, hoe wolken ontstaan of wat wind veroorzaakt.',
    classroomIntegration: 'Het weerthema integreert in groep 4 met rekenen (temperatuurtabellen, aftrekken, neerslagmetingen), taal (informatief schrijven, weerwoordenschat), natuur en techniek (meteorologie, waterkringloop, klimaat) en aardrijkskunde (klimaatzones, seizoenen). Een weerproject met werkbladen, een klasweerstation en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Temperatuurtabellen bijhouden', emerging: 'meet de temperatuur maar noteert niet consequent en vergelijkt metingen niet', proficient: 'meet dagelijks correct, noteert in een tabel, bepaalt warmste en koelste dag en berekent het verschil', advanced: 'houdt een nauwkeurige weertabel bij, berekent gemiddelde temperaturen en tekent een temperatuurgrafiek' },
      { skill: 'Temperatuurverschillen berekenen', emerging: 'trekt twee temperaturen af met hulp maar herkent niet altijd welke groter is', proficient: 'berekent zelfstandig het temperatuurverschil tussen twee metingen en vergelijkt resultaten', advanced: 'berekent temperatuurverschillen over meerdere dagen, herkent patronen en voorspelt trends' },
      { skill: 'Informatief schrijven over weer', emerging: 'noemt een weersverschijnsel maar verklaart het niet en mist structuur', proficient: 'schrijft een informatieve tekst over een weersverschijnsel met beschrijving, oorzaak en gevolg', advanced: 'schrijft een uitgebreid weerrapport met meerdere verschijnselen, wetenschappelijke verklaringen en een vergelijking' },
    ],
  },

  winter: {
    seoTitle: 'Winter-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare winter-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'winter groep 4, winter oefeningen 7\u20138 jaar, winter oefeningen groep 4, winter uitprintbaar groep 4, winter werkbladen groep 4, winter activiteiten groep 4, winter leerbladen 7\u20138 jaar, winter gratis groep 4, winter PDF groep 4, winter rekenen groep 4',
    snippetAnswer: 'Winter-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met winteractiviteiten: temperatuurberekeningen met vorst, vermenigvuldigen van winteritems, tabellen met sneeuwval vergelijken, redactiesommen over winteruitjes en het schrijven van een winterverhaal. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het winterthema een koele context voor temperatuurrekenen en seizoensvergelijking: zeven- en achtjarigen ervaren vorst en sneeuw en die beleving maakt rekenen met temperaturen onder nul, daglengte en winteractiviteiten bijzonder tastbaar. De SLO-leerlijnen benadrukken rekenen tot 100, meten, gegevensverwerking en creatief schrijven als kerndoelen, en de winter biedt alle vier. Temperatuurberekeningen met vorst \u2014 het is -3 graden, gisteren was het 2 graden, hoeveel verschil? \u2014 introduceren rekenen met getallen onder nul. Vermenigvuldigsommen met winteritems \u2014 elk kind krijgt 2 warme chocomelk per schooldag, hoeveel voor 5 dagen? \u2014 oefenen de tafels in een winterse context. Tabellen met sneeuwval \u2014 hoeveel centimeter sneeuw per dag \u2014 bouwen datageletterdheid op met seizoensgegevens. Redactiesommen over winteruitjes \u2014 schaatskaartjes kosten 5 euro per persoon, hoeveel voor een gezin van 4? \u2014 vereisen meerstapsberekeningen. Het schrijven van een winterverhaal oefent creatief schrijven met sfeer, beschrijving en dialoog.',
    developmentalMilestones: [
      { milestone: 'Temperatuurberekeningen met vorst (7\u20138-jarigen rekenen met getallen onder nul)', howWeAddress: 'Vorstactiviteiten waarbij kinderen temperatuurverschillen berekenen met positieve en negatieve getallen introduceren rekenen onder nul in een seizoenscontext' },
      { milestone: 'Vermenigvuldigen met winteritems (warme dranken, wanten, sneeuwballen per kind)', howWeAddress: 'Winterrekenactiviteiten waarbij kinderen hoeveelheden per kind vermenigvuldigen voor de klas oefenen de tafels in een gezellige wintercontext' },
      { milestone: 'Tabellen met sneeuwvalgegevens analyseren (centimeters per dag vergelijken en optellen)', howWeAddress: 'Sneeuwvalactiviteiten waarbij kinderen dagelijkse sneeuwval in een tabel zetten en weektotalen berekenen oefenen meten en optellen met wintergegevens' },
      { milestone: 'Creatief schrijven: winterverhaal (sfeer, beschrijving, dialoog)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een winterverhaal schrijven met een besneeuwde setting, personages en een avontuur oefenen creatief schrijven met sfeerbeschrijving' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk temperatuurberekeningen tot positieve getallen en kleine verschillen, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met winterplaatjes, en laat een winterverhaal schrijven met een verhaalkader. Voor gevorderde kinderen: introduceer temperaturen onder nul en complexe berekeningen, laat hen sneeuwvaltabellen omzetten naar grafieken en daag hen uit met een winterdagboek inclusief temperatuurlog, activiteitenbeschrijving en een seizoensvergelijking.',
    parentTakeaway: 'De winter biedt koele rekenkansen in groep 4. Meet samen de temperatuur: hoe koud is het vandaag, is het onder nul, hoeveel verschil met gisteren? Als elk kind 2 kopjes chocomelk drinkt en er zijn 6 kinderen, hoeveel kopjes maak je? Houd samen bij hoeveel sneeuw er valt: hoeveel centimeter per dag, hoeveel samen? Na een winterwerkblad kunt u samen een verhaal schrijven over een sneeuwavontuur met beschrijvende woorden en dialoog.',
    classroomIntegration: 'Het winterthema integreert in groep 4 met rekenen (temperatuurrekenen, vermenigvuldigen, sneeuwvaltabellen), taal (creatief schrijven, winterwoordenschat), natuur en techniek (weer, seizoenen, aggregatietoestanden van water) en bewegingsonderwijs (wintersporten). Een winterproject met werkbladen, een klasweerstation en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Temperatuurberekeningen met vorst', emerging: 'leest temperaturen af maar berekent het verschil niet als een van de waarden onder nul is', proficient: 'berekent temperatuurverschillen correct, ook met getallen onder nul, en vergelijkt winterdagen', advanced: 'rekent vlot met positieve en negatieve temperaturen, berekent gemiddelden en herkent patronen' },
      { skill: 'Sneeuwvaltabellen analyseren', emerging: 'leest sneeuwvalcijfers af maar telt ze niet op en vergelijkt niet', proficient: 'houdt een sneeuwvaltabel bij, berekent weektotalen en bepaalt de dag met de meeste sneeuw', advanced: 'analyseert sneeuwvalgegevens over weken, tekent een grafiek en vergelijkt met andere seizoenen' },
      { skill: 'Creatief schrijven: winterverhaal', emerging: 'schrijft over winter maar bouwt geen sfeer op en gebruikt weinig beschrijving', proficient: 'schrijft een winterverhaal met een besneeuwde setting, personages, dialoog en een afronding', advanced: 'schrijft een meerdelig winterverhaal met sfeerbeschrijving, spanningsopbouw en een verrassende ontknoping' },
    ],
  },

  xmas: {
    seoTitle: 'Kerst-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kerst-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kerst groep 4, kerst oefeningen 7\u20138 jaar, kerst oefeningen groep 4, kerst uitprintbaar groep 4, kerst werkbladen groep 4, kerst activiteiten groep 4, kerst leerbladen 7\u20138 jaar, kerst gratis groep 4, kerst PDF groep 4, kerst rekenen groep 4',
    snippetAnswer: 'Kerst-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met feestelijke traditie: cadeaubudget berekenen en verdelen, vermenigvuldigen van kerstversieringen, kalenderrekenen met de adventstijd, tabellen met kerstinkopen en het schrijven van een kerstverhaal of wensbrief. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het kerstthema een feestelijke context voor budgetrekenen en kalenderrekenen: zeven- en achtjarigen leven toe naar Kerst en die opwinding maakt rekenen met cadeaubudgetten, versieringen en adventsdata bijzonder motiverend. De SLO-leerlijnen benadrukken rekenen tot 100, vermenigvuldigen, kalenderrekenen en functioneel schrijven als kerndoelen, en Kerst biedt alle vier. Cadeaubudgetberekeningen \u2014 je hebt 50 euro, het boek kost 12 euro, de puzzel 15 euro, de LEGO 20 euro, kun je alles kopen? \u2014 oefenen optellen en vergelijken met geld. Vermenigvuldigsommen met versieringen \u2014 elk raam krijgt 5 sterren en er zijn 6 ramen, hoeveel sterren in totaal? \u2014 oefenen de tafels in een kerstsfeer. Kalenderrekenen \u2014 hoeveel dagen tot Kerst, hoeveel adventszondagen, wanneer begint de kerstvakantie? \u2014 oefent rekenen met data. Tabellen met kerstinkopen bouwen datageletterdheid op. Het schrijven van een kerstverhaal of wensbrief oefent functioneel en creatief schrijven.',
    developmentalMilestones: [
      { milestone: 'Cadeaubudget berekenen en verdelen (7\u20138-jarigen rekenen met geld en vergelijken kosten)', howWeAddress: 'Cadeauwinkelactiviteiten waarbij kinderen cadeaukosten optellen, het budget bewaken en wisselgeld berekenen oefenen geldrekenen in een feestelijke context' },
      { milestone: 'Vermenigvuldigen met kerstversieringen (aantallen per raam, per kamer, per boom)', howWeAddress: 'Kerstversiering-activiteiten waarbij kinderen versieringen per locatie vermenigvuldigen en het totaal berekenen oefenen de tafels in een kerstsfeer' },
      { milestone: 'Kalenderrekenen met de adventstijd (dagen tot Kerst, duur van de vakantie)', howWeAddress: 'Adventsactiviteiten waarbij kinderen de dagen tot Kerst tellen en de vakantieduur berekenen oefenen kalenderrekenen met anticipatie' },
      { milestone: 'Functioneel schrijven: kerstwensbrief (persoonlijke boodschap, datum, wensen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een kerstwensbrief schrijven met een persoonlijke boodschap en wensen oefenen functioneel schrijven met een communicatief doel' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk cadeaubudget tot twee items met ronde bedragen, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met kerstplaatjes, en laat een kerstkaart schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer cadeaubudgetten voor meerdere personen met wisselgeld, laat hen een kerstmarktbudget opstellen en daag hen uit met een kerstverhaal inclusief budgetoverzicht, cadeaulijst en een persoonlijke reflectie.',
    parentTakeaway: 'Kerst biedt feestelijke rekenkansen in groep 4. Reken samen het cadeaubudget uit: hoeveel kosten de cadeaus, hoeveel heb je te besteden, hoeveel houd je over? Als je 4 ramen versiert met elk 6 sterren, hoeveel sterren heb je nodig? Tel samen af: hoeveel dagen tot Kerst, hoeveel dagen kerstvakantie? Na een kerstwerkblad kunt u samen een kerstbrief schrijven aan oma, een vriendje of de Kerstman.',
    classroomIntegration: 'Het kerstthema integreert in groep 4 met rekenen (budgetberekeningen, vermenigvuldigen, kalenderrekenen), taal (functioneel schrijven, kerstwoordenschat), culturele vorming (kersttradities, diversiteit, het verhaal achter feestdagen) en beeldende vorming (kerstversiering maken). Een kerstproject met werkbladen, een adventskalender en een schrijfactiviteit combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Cadeaubudget berekenen', emerging: 'telt twee cadeauprijzen op maar bewaakt het budget niet en berekent wisselgeld niet', proficient: 'berekent het totaal van meerdere cadeaus, vergelijkt met het budget en berekent wisselgeld correct', advanced: 'stelt een cadeaubudget op voor meerdere personen, vergelijkt opties en kiest de beste verdeling binnen het budget' },
      { skill: 'Kalenderrekenen met de advent', emerging: 'telt dagen met hulp maar berekent niet zelfstandig hoeveel dagen tot een datum', proficient: 'berekent zelfstandig het aantal dagen tot Kerst en de duur van de vakantie', advanced: 'berekent dagen tussen data, plant activiteiten op een kalender en maakt een tijdlijn voor de adventsperiode' },
      { skill: 'Functioneel schrijven: kerstwensbrief', emerging: 'schrijft een korte wens maar mist structuur, datum en persoonlijke boodschap', proficient: 'schrijft een kerstwensbrief met datum, aanhef, persoonlijke boodschap, wensen en afsluiting', advanced: 'schrijft een uitgebreide brief met persoonlijke reflectie, meerdere wensen en een creatieve vormgeving' },
    ],
  },

  zoo: {
    seoTitle: 'Dierentuin-oefeningen Groep 4 | LessonCraftStudio',
    seoDescription: 'Uitprintbare dierentuin-oefeningen voor groep 4 (7\u20138 jaar). Rekenen tot 100, tafels, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dierentuin groep 4, dierentuin oefeningen 7\u20138 jaar, dierentuin oefeningen groep 4, dierentuin uitprintbaar groep 4, dierentuin werkbladen groep 4, dierentuin activiteiten groep 4, dierentuin leerbladen 7\u20138 jaar, dierentuin gratis groep 4, dierentuin PDF groep 4, dierentuin rekenen groep 4',
    snippetAnswer: 'Dierentuin-oefeningen voor groep 4 (7\u20138 jaar) combineren rekenen tot 100 met dierkunde: dierengegevenstabellen vergelijken, vermenigvuldigen van voerporties en dieraantallen, kaartafstanden berekenen, redactiesommen over dierentuinbezoek en informatief schrijven over diersoorten. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 4 wordt het dierentuinthema een boeiende context voor gegevensverwerking en groot-getallenrekenen: zeven- en achtjarigen zijn gefascineerd door exotische dieren en die interesse maakt rekenen met gewichten, lengtes en aantallen bijzonder motiverend. De SLO-leerlijnen benadrukken gegevensverwerking, vermenigvuldigen, meten en informatief schrijven als kerndoelen, en de dierentuin biedt alle vier. Dierengegevenstabellen \u2014 gewicht, lengte, levensverwachting per diersoort \u2014 bouwen datageletterdheid op met fascinerende feiten. Vermenigvuldigsommen met voerporties \u2014 elke olifant eet 50 kilo hooi per dag, hoeveel eten 3 olifanten in 5 dagen? \u2014 oefenen de tafels met grote getallen. Kaartafstanden berekenen \u2014 van de ingang naar de leeuwen is 200 meter, naar de apen 350 meter, hoeveel bij elkaar? \u2014 oefenen optellen met afstanden. Redactiesommen over dierentuinbezoek vereisen meerstapsberekeningen met entreeprijzen en aantallen. Het schrijven van een informatieve tekst over een diersoort oefent gestructureerd schrijven met feiten en classificatie.',
    developmentalMilestones: [
      { milestone: 'Dierengegevenstabellen interpreteren (7\u20138-jarigen vergelijken gewicht, lengte en levensverwachting)', howWeAddress: 'Tabelactiviteiten waarbij kinderen dierkenmerken in een tabel vergelijken en het zwaarste, langste of oudste dier bepalen bouwen datageletterdheid op met zoologische gegevens' },
      { milestone: 'Vermenigvuldigen met voerporties (hoeveelheid per dier maal aantal dieren maal dagen)', howWeAddress: 'Voeractiviteiten waarbij kinderen dagelijkse voerporties vermenigvuldigen voor meerdere dieren oefenen de tafels met grote getallen in een verzorgingscontext' },
      { milestone: 'Kaartafstanden berekenen (meters tussen verblijven optellen voor een wandelroute)', howWeAddress: 'Plattegrondactiviteiten waarbij kinderen afstanden op een dierentuinkaart optellen en de kortste route bepalen oefenen optellen met afstanden' },
      { milestone: 'Informatief schrijven over een diersoort (uiterlijk, leefgebied, voeding, bedreigingen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een informatieve tekst schrijven over een dier met kenmerken en feiten oefenen informatief schrijven met wetenschappelijke inhoud' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tabellen tot drie dieren met eenvoudige getallen, bied vermenigvuldigsommen aan met de tafels van 2 en 5 met dierenplaatjes, en laat een dierbeschrijving schrijven met een invulsjabloon. Voor gevorderde kinderen: introduceer tabellen met tien dieren en complexe vergelijkingen, laat hen voerbudgetten voor een week berekenen en daag hen uit met een dierentuingids inclusief diertabellen, routekaart en informatieve teksten over vijf dieren.',
    parentTakeaway: 'De dierentuin biedt fascinerende rekenkansen in groep 4. Vergelijk samen dieren: hoeveel weegt een olifant, hoeveel een pinguïn, hoeveel verschil? Als een leeuw 8 kilo vlees per dag eet en er zijn 3 leeuwen, hoeveel vlees per week? Bekijk samen de dierentuinkaart: hoe ver is het van de ingang naar de giraffen, welke route is het kortst? Na een dierentuinwerkblad kunt u samen een tekst schrijven over jullie lievelingsdier met feiten over hoe het eruitziet, waar het leeft en wat het eet.',
    classroomIntegration: 'Het dierentuinthema integreert in groep 4 met rekenen (gegevenstabellen, vermenigvuldigen, afstandsberekeningen), taal (informatief schrijven, dierenwoordenschat), natuur en techniek (zoölogie, ecosystemen, bedreigde diersoorten) en burgerschap (dierenwelzijn, natuurbescherming). Een dierentuinproject met werkbladen, een dieronderzoek en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Dierengegevenstabellen interpreteren', emerging: 'leest afzonderlijke waarden af maar vergelijkt dieren niet zelfstandig op meerdere kenmerken', proficient: 'vergelijkt dieren op drie kenmerken, ordent ze en beantwoordt vergelijkingsvragen correct', advanced: 'analyseert tabellen met tien dieren, rankt ze op meerdere criteria en trekt conclusies over patronen' },
      { skill: 'Vermenigvuldigen met voerporties', emerging: 'vermenigvuldigt met de tafels van 2 en 5 maar past dit niet toe in voerberekeningen', proficient: 'berekent zelfstandig dagelijkse en wekelijkse voerporties via vermenigvuldiging en noteert correct', advanced: 'lost meerstaps-voerberekeningen op voor meerdere dieren over meerdere dagen en vergelijkt de kosten' },
      { skill: 'Informatief schrijven over een diersoort', emerging: 'noemt een dier maar beschrijft het niet gedetailleerd en mist structuur', proficient: 'schrijft een informatieve tekst over een diersoort met uiterlijk, leefgebied, voeding en een interessant feit', advanced: 'schrijft een uitgebreide diergids met kopjes, gegevenstabel, vergelijking met verwante soorten en een oproep tot bescherming' },
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
