#!/usr/bin/env node
/**
 * SEO Part 332: NL Third-Grade Enrichment — Themes 39-50
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the third-grade grade block of 12 NL theme files (sports through zoo).
 *
 * CRITICAL: third-grade is the LAST grade in gradeContent, so the boundary
 * marker is "// -- FAQ --" (global FAQ comment) instead of a next grade key.
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    seoTitle: 'Sport-oefeningen Groep 5 | LessonCraftStudio',
    seoDescription: 'Uitprintbare sport-oefeningen voor groep 5 (8\u20139 jaar). Vermenigvuldigen, delen, breuken, begrijpend lezen en informatief schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'sport groep 5, sport oefeningen 8\u20139 jaar, sport oefeningen groep 5, sport uitprintbaar groep 5, sport werkbladen groep 5, sport activiteiten groep 5, sport leerbladen 8\u20139 jaar, sport gratis groep 5, sport PDF groep 5, sport rekenen groep 5',
    snippetAnswer: 'Sport-oefeningen voor groep 5 (8\u20139 jaar) combineren vermenigvuldigen en delen met atletiekstatistiek: seizoensscores berekenen over meerdere wedstrijden, breuken bij speeltijdverdeling en winstpercentages, gegevenstabellen met teamstatistieken vergelijken, begrijpend lezen over sportgeschiedenis en het schrijven van een analytisch verslag dat twee teams vergelijkt met statistisch bewijs. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 5 wordt het sportthema een statistisch-analytische context voor vermenigvuldigen, delen en breuken: acht- en negenjarigen volgen actief sportwedstrijden en die betrokkenheid maakt rekenen met seizoensstatistieken, gemiddelden en winstpercentages bijzonder motiverend. De SLO-leerlijnen benadrukken vermenigvuldigen en delen tot 100, breuken, gegevensanalyse met grafieken en informatief schrijven als kerndoelen, en sport biedt alle vier in een competitieve context. Seizoensscores \u2014 een voetbalteam scoort in 9 wedstrijden respectievelijk 3, 1, 4, 2, 3, 5, 0, 2 en 4 doelpunten, wat is het totaal en het gemiddelde? \u2014 oefenen optelling, deling en gemiddelde. Speeltijdbreuken \u2014 een speler speelt 45 van de 90 minuten, welk deel is dat? \u2014 maken breuken sportief concreet. Teamvergelijkingstabellen \u2014 gescoorde doelpunten, tegendoelpunten, punten per team over een seizoen \u2014 bouwen datageletterdheid op. Het schrijven van een analytisch sportverslag dat twee teams vergelijkt met statistisch bewijs oefent meerparagraaf-schrijven met argumentatie.',
    developmentalMilestones: [
      { milestone: 'Seizoensstatistieken berekenen met vermenigvuldiging en deling (8\u20139-jarigen berekenen totalen en gemiddelden)', howWeAddress: 'Statistiekactiviteiten waarbij kinderen doelpunten over een seizoen optellen en het gemiddelde per wedstrijd berekenen oefenen deling met sportief relevante gegevens' },
      { milestone: 'Breuken bij speeltijdverdeling en winstpercentages (speelminuten als breuk van de wedstrijd)', howWeAddress: 'Speeltijdactiviteiten waarbij kinderen speelminuten als breuken uitdrukken en winstpercentages berekenen maken breuken competitief betekenisvol' },
      { milestone: 'Teamstatistieken vergelijken in gegevenstabellen (meerdere categorie\u00ebn per team)', howWeAddress: 'Tabelactiviteiten waarbij kinderen teamstatistieken aflezen, vergelijken en rangschikken bouwen datageletterdheid op met echte sportgegevens' },
      { milestone: 'Analytisch sportverslag schrijven (twee teams vergelijken met statistisch bewijs)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een verslag schrijven dat twee teams vergelijkt met statistieken, grafieken en een beargumenteerde conclusie oefenen analytisch schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk seizoensstatistieken tot optelling van vijf wedstrijden met kleine scores, gebruik halven bij speeltijdbreuken en bied een schrijfkader aan voor het sportverslag. Voor gevorderde kinderen: introduceer gemiddelden met rest, laat hen winstpercentages omzetten naar breuken en decimalen en daag hen uit met een uitgebreid sportanalyserapport inclusief vergelijkingstabel, trendgrafiek en beargumenteerde voorspelling voor de volgende wedstrijd.',
    parentTakeaway: 'Sport biedt statistiekkansen in groep 5. Bereken samen het gemiddelde: als uw kind in vijf wedstrijden 3, 2, 4, 1 en 5 doelpunten maakt, wat is het gemiddelde per wedstrijd? Welk deel van de wedstrijd speelde hij of zij? Vergelijk samen teamstatistieken in de krant of online. Na een sportwerkblad kunt u samen een kort analyseverslag schrijven over de favoriete club met echte seizoensstatistieken.',
    classroomIntegration: 'Het sportthema integreert in groep 5 met rekenen (seizoensstatistieken, gemiddelden, breuken met speeltijd), taal (analytisch schrijven, sportwoordenschat), bewegingsonderwijs (prestatiemeting, strategie) en burgerschap (sportiviteit, fair play, samenwerking). Een sportstatistiekenproject met werkbladen, een teamvergelijking en een presentatie combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Seizoensstatistieken berekenen', emerging: 'telt scores op maar berekent niet zelfstandig het gemiddelde per wedstrijd', proficient: 'berekent zelfstandig totaalscores en gemiddelden over een seizoen en vergelijkt teams', advanced: 'analyseert seizoenstrends, berekent gemiddelden met rest en voorspelt toekomstige prestaties op basis van gegevens' },
      { skill: 'Breuken bij speeltijd en winstpercentages', emerging: 'herkent halve speeltijd maar drukt andere speeltijden niet als breuken uit', proficient: 'berekent zelfstandig speeltijdbreuken en winstpercentages en vergelijkt spelers', advanced: 'vergelijkt complexe speeltijdbreuken, vereenvoudigt en zet om naar percentages voor een volledige teamanalyse' },
      { skill: 'Analytisch sportverslag', emerging: 'noemt statistieken maar vergelijkt niet systematisch twee teams met bewijs', proficient: 'schrijft een gestructureerd verslag dat twee teams vergelijkt op drie statistische kenmerken met conclusie', advanced: 'schrijft een uitgebreid analyserapport met vergelijkingstabel, trendgrafiek, statistisch bewijs en beargumenteerde voorspelling' },
    ],
  },

  spring: {
    seoTitle: 'Lente-oefeningen Groep 5 | LessonCraftStudio',
    seoDescription: 'Uitprintbare lente-oefeningen voor groep 5 (8\u20139 jaar). Vermenigvuldigen, delen, breuken, begrijpend lezen en informatief schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'lente groep 5, lente oefeningen 8\u20139 jaar, lente oefeningen groep 5, lente uitprintbaar groep 5, lente werkbladen groep 5, lente activiteiten groep 5, lente leerbladen 8\u20139 jaar, lente gratis groep 5, lente PDF groep 5, lente rekenen groep 5',
    snippetAnswer: 'Lente-oefeningen voor groep 5 (8\u20139 jaar) combineren vermenigvuldigen en delen met seizoenswetenschap: groeisnelheden van planten berekenen, breuken bij zaai- en oogsttijdlijnen, temperatuurgegevens bijhouden in lijndiagrammen, begrijpend lezen over lente-ecosystemen en het schrijven van een onderzoeksverslag over de invloed van daglengte op plantengroei. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 5 wordt het lentethema een natuurwetenschappelijke context voor meten, gegevensanalyse en informatief schrijven: acht- en negenjarigen merken de veranderingen in de natuur op en die observaties maken rekenen met groeisnelheden, temperaturen en breuken bijzonder betekenisvol. De SLO-leerlijnen benadrukken vermenigvuldigen en delen, meten in standaardeenheden, gegevensanalyse met grafieken en informatief schrijven als kerndoelen, en de lente biedt alle vier. Groeisnelheden \u2014 een tulp groeit 3 cm per week, na 6 weken hoeveel centimeter? \u2014 oefenen vermenigvuldiging met meetkunde. Zaaitijdlijnen \u2014 als je in week 10 zaait en de plant na 8 weken bloeit, in welke week bloeit hij? \u2014 oefenen tijdrekenen. Temperatuurgrafieken \u2014 dagelijkse temperatuur meten en in een lijndiagram tekenen, de trend beschrijven \u2014 bouwen datageletterdheid op. Het schrijven van een onderzoeksverslag over hoe daglengte plantengroei be\u00efnvloedt oefent wetenschappelijk informatief schrijven.',
    developmentalMilestones: [
      { milestone: 'Groeisnelheden berekenen met vermenigvuldiging (8\u20139-jarigen berekenen planthoogte na meerdere weken)', howWeAddress: 'Groeiactiviteiten waarbij kinderen de hoogte van planten na een aantal weken berekenen via vermenigvuldiging oefenen rekenvaardigheden met levende gegevens' },
      { milestone: 'Tijdlijnen met zaai- en bloeidata (weken tellen en data berekenen)', howWeAddress: 'Kalenderactiviteiten waarbij kinderen zaai-, groei- en bloeidata berekenen en op een tijdlijn plaatsen oefenen tijdrekenen met seizoenscontext' },
      { milestone: 'Temperatuurgegevens bijhouden in lijndiagrammen (dagelijkse metingen visualiseren)', howWeAddress: 'Meetactiviteiten waarbij kinderen dagelijkse temperaturen meten en in een lijndiagram tekenen bouwen datageletterdheid op met weergegevens' },
      { milestone: 'Onderzoeksverslag schrijven over daglengte en plantengroei (hypothese, waarnemingen, conclusie)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een lenteonderzoek beschrijven in een meerparagraaf-verslag met hypothese, methode en conclusie oefenen wetenschappelijk schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk groeiberekeningen tot de tafels van 2 en 5 met visuele groeistapjes, gebruik voorgetekende grafieken voor temperatuurgegevens en bied een schrijfkader aan voor het lenteverslag. Voor gevorderde kinderen: introduceer groeisnelheidvergelijkingen tussen plantensoorten, laat hen gemiddelde temperatuurstijging per week berekenen en daag hen uit met een uitgebreid ecologisch rapport over lente-ecosystemen inclusief groeigrafiek, temperatuurtabel en beargumenteerde conclusie over klimaatinvloed.',
    parentTakeaway: 'De lente biedt levende rekenkansen in groep 5. Meet samen een plant: als hij vorige week 12 cm was en nu 15 cm, hoeveel groeide hij? Als hij 3 cm per week groeit, hoe hoog is hij over 4 weken? Meet samen de buitentemperatuur en teken een weekgrafiekje. Bereken samen: als je in maart zaait en de plant na 8 weken bloeit, wanneer bloeit hij? Na een lentewerkblad kunt u samen een kort verslag schrijven over wat er in jullie tuin of park verandert.',
    classroomIntegration: 'Het lentethema integreert in groep 5 met rekenen (groeisnelheden, temperatuurgrafieken, tijdlijnen), taal (wetenschappelijk schrijven, seizoenswoordenschat), natuur en techniek (plantengroei, ecosystemen, fotosynthese) en beeldende vorming (lenteobservaties tekenen, natuurfotografie). Een schooltuinproject met werkbladen, groeigrafieken en een onderzoeksverslag combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Groeisnelheden berekenen', emerging: 'vermenigvuldigt groei per week maar berekent niet zelfstandig de hoogte na meerdere weken', proficient: 'berekent zelfstandig planthoogtes na meerdere weken en vergelijkt groeisnelheden van twee planten', advanced: 'vergelijkt groeisnelheden van meerdere planten, berekent wanneer ze even hoog zijn en analyseert de invloed van omstandigheden' },
      { skill: 'Temperatuurgegevens in lijndiagrammen', emerging: 'vult temperaturen in een tabel in maar tekent niet zelfstandig een lijndiagram', proficient: 'meet temperaturen, tekent een correct lijndiagram en beschrijft de trend over een week', advanced: 'vergelijkt temperatuurgrafieken van meerdere weken, berekent gemiddelden en trekt conclusies over seizoensverandering' },
      { skill: 'Onderzoeksverslag over daglengte en plantengroei', emerging: 'beschrijft waarnemingen maar formuleert geen hypothese en trekt geen conclusie', proficient: 'schrijft een gestructureerd verslag met hypothese, waarnemingen en conclusie over plantengroei in de lente', advanced: 'schrijft een uitgebreid verslag met vergelijking van twee proefopstellingen, groeigrafiek en beargumenteerde conclusie over omgevingsfactoren' },
    ],
  },

  summer: {
    seoTitle: 'Zomer-oefeningen Groep 5 | LessonCraftStudio',
    seoDescription: 'Uitprintbare zomer-oefeningen voor groep 5 (8\u20139 jaar). Vermenigvuldigen, delen, breuken, begrijpend lezen en informatief schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'zomer groep 5, zomer oefeningen 8\u20139 jaar, zomer oefeningen groep 5, zomer uitprintbaar groep 5, zomer werkbladen groep 5, zomer activiteiten groep 5, zomer leerbladen 8\u20139 jaar, zomer gratis groep 5, zomer PDF groep 5, zomer rekenen groep 5',
    snippetAnswer: 'Zomer-oefeningen voor groep 5 (8\u20139 jaar) combineren vermenigvuldigen en delen met zomeractiviteiten: vakantiebudgetten berekenen, breuken bij zonnebrandverdeling en recepten, temperatuurgegevens vergelijken in grafieken, begrijpend lezen over zomerecosystemen en het schrijven van een vakantieplanning met routeberekening en kostenanalyse. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 5 wordt het zomerthema een financi\u00eble en geografische context voor vermenigvuldigen, breuken en functioneel schrijven: acht- en negenjarigen kijken uit naar de zomervakantie en die betrokkenheid maakt rekenen met budgetten, afstanden en temperaturen bijzonder motiverend. De SLO-leerlijnen benadrukken vermenigvuldigen en delen, breuken, meten in standaardeenheden en informatief schrijven als kerndoelen, en zomeractiviteiten bieden alle vier. Vakantiebudgetten \u2014 5 nachten camping \u00e0 35 euro per nacht, plus benzine 80 euro, hoeveel in totaal? \u2014 oefenen meerstapsvermenigvuldiging met geld. Receptbreuken \u2014 3/4 liter limonade per persoon voor 8 personen, hoeveel liter totaal? \u2014 maken breuken zomers concreet. Temperatuurvergelijkingen \u2014 dagelijkse maxima van twee vakantiebestemmingen in een dubbel lijndiagram \u2014 bouwen datageletterdheid op. Het schrijven van een vakantieplanning met route, budget en activiteitenoverzicht oefent functioneel schrijven.',
    developmentalMilestones: [
      { milestone: 'Vakantiebudgetten berekenen met meerstapsvermenigvuldiging (8\u20139-jarigen combineren overnachtings-, vervoer- en activiteitenkosten)', howWeAddress: 'Budgetactiviteiten waarbij kinderen een vakantie doorrekenen met meerdere kostenposten oefenen financieel rekenen met vermenigvuldiging en optelling' },
      { milestone: 'Breuken bij recepten en hoeveelheden (limonade, ijsjes, zonnebrand verdelen)', howWeAddress: 'Receptactiviteiten waarbij kinderen zomerrecepten opschalen met breuken en hoeveelheden berekenen voor groepen maken breuken vakantieproof' },
      { milestone: 'Temperatuurgegevens vergelijken in dubbele grafieken (twee bestemmingen naast elkaar)', howWeAddress: 'Grafiekactiviteiten waarbij kinderen temperaturen van twee vakantiebestemmingen in een dubbel lijndiagram tekenen en vergelijken bouwen datageletterdheid op' },
      { milestone: 'Vakantieplanning schrijven met route en budget (functioneel-informatief schrijven)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een vakantieplanning schrijven met route, dagprogramma en kostenoverzicht oefenen functioneel schrijven met praktische inhoud' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk budgetberekeningen tot twee kostenposten met ronde bedragen, gebruik halven en kwarten bij receptbreuken en bied een schrijfkader aan met invulvelden voor de vakantieplanning. Voor gevorderde kinderen: introduceer budgetoptimalisatie met alternatieven en wisselgeldberekeningen, laat hen recepten opschalen met onbekende aantallen en daag hen uit met een uitgebreide vakantieplanning inclusief routekaart, vergelijking van twee bestemmingen en beargumenteerde keuze.',
    parentTakeaway: 'De zomer biedt dagelijkse rekenkansen in groep 5. Plan samen de vakantie: als de camping 35 euro per nacht kost en jullie blijven 7 nachten, hoeveel kost dat? Maak samen limonade: als het recept 3/4 liter per persoon vraagt en er zijn 6 personen, hoeveel liter heb je nodig? Vergelijk samen de temperatuur van twee bestemmingen. Na een zomerwerkblad kunt u samen een dagplanning maken met activiteiten, tijden en kosten.',
    classroomIntegration: 'Het zomerthema integreert in groep 5 met rekenen (budgetberekeningen, breuken met recepten, temperatuurgrafieken), taal (functioneel schrijven, reiswoordenschat), aardrijkskunde (bestemmingen, klimaat, kaartlezen) en burgerschap (duurzaam reizen, milieubewustzijn). Een vakantieplanningsproject met werkbladen, een bestemmingsvergelijking en een presentatie combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vakantiebudgetten berekenen', emerging: 'vermenigvuldigt \u00e9\u00e9n kostenpost maar combineert niet meerdere posten tot een totaalbudget', proficient: 'berekent zelfstandig een vakantiebudget met overnachting, vervoer en activiteiten en controleert het totaal', advanced: 'vergelijkt budgetten van twee vakanties, optimaliseert binnen een limiet en beargumenteert de beste keuze' },
      { skill: 'Breuken bij zomerrecepten', emerging: 'herkent halve hoeveelheden maar past kwarten en derden niet toe bij het opschalen', proficient: 'berekent zelfstandig breukhoeveelheden voor een groep en vergelijkt recepten op hoeveelheid', advanced: 'schaalt recepten op naar willekeurige aantallen, combineert breuken en berekent totalen met gemengde breuken' },
      { skill: 'Vakantieplanning schrijven', emerging: 'noemt een bestemming en activiteiten maar mist structuur en kostenberekening', proficient: 'schrijft een gestructureerde planning met route, dagprogramma, budget en onderbouwing', advanced: 'schrijft een uitgebreide planning die twee bestemmingen vergelijkt met kostenanalyse, klimaatvergelijking en beargumenteerde keuze' },
    ],
  },

  superheroes: {
    seoTitle: 'Superhelden-oefeningen Groep 5 | LessonCraftStudio',
    seoDescription: 'Uitprintbare superhelden-oefeningen voor groep 5 (8\u20139 jaar). Vermenigvuldigen, delen, breuken, begrijpend lezen en informatief schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'superhelden groep 5, superhelden oefeningen 8\u20139 jaar, superhelden oefeningen groep 5, superhelden uitprintbaar groep 5, superhelden werkbladen groep 5, superhelden activiteiten groep 5, superhelden leerbladen 8\u20139 jaar, superhelden gratis groep 5, superhelden PDF groep 5, superhelden rekenen groep 5',
    snippetAnswer: 'Superhelden-oefeningen voor groep 5 (8\u20139 jaar) combineren vermenigvuldigen en delen met heldenverhalen: krachtberekeningen met vermenigvuldiging, breuken bij het verdelen van missietijd, gegevenstabellen met superheldeneigenschappen vergelijken, begrijpend lezen over het heldenarchetype in verhalen en het schrijven van een analytisch verslag dat twee helden vergelijkt op basis van eigenschappen en prestaties. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 5 wordt het superheldenthema een narratieve en analytische context voor vermenigvuldigen, breuken en vergelijkend schrijven: acht- en negenjarigen zijn gefascineerd door superhelden en die betrokkenheid maakt rekenen met krachtniveaus, missiestatistieken en vergelijkende analyse bijzonder motiverend. De SLO-leerlijnen benadrukken vermenigvuldigen en delen, breuken, gegevensanalyse en informatief schrijven als kerndoelen, en superhelden bieden alle vier in een fantasierijke context. Krachtberekeningen \u2014 een superheld kan 500 kg tillen, haar partner 3 keer zoveel, hoeveel tillen ze samen? \u2014 oefenen vermenigvuldiging met grote getallen. Missietijdbreuken \u2014 een held besteedt 2/5 van de missietijd aan verkenning en 3/5 aan actie, hoeveel minuten bij een missie van 60 minuten? \u2014 maken breuken spannend. Eigenschappentabellen \u2014 snelheid, kracht, intelligentie per held op een schaal \u2014 bouwen datageletterdheid op. Het schrijven van een analytisch verslag dat twee superhelden vergelijkt op basis van eigenschappen en prestaties oefent vergelijkend schrijven.',
    developmentalMilestones: [
      { milestone: 'Krachtberekeningen met vermenigvuldiging (8\u20139-jarigen vermenigvuldigen heldenkrachten en berekenen samenwerking)', howWeAddress: 'Superheldrekenactiviteiten waarbij kinderen krachtniveaus vermenigvuldigen en totalen bij samenwerking berekenen oefenen vermenigvuldiging met fantasierijke getallen' },
      { milestone: 'Breuken bij missietijdverdeling (delen van een missie als breuken uitdrukken)', howWeAddress: 'Missieactiviteiten waarbij kinderen missietijd verdelen in breuken voor verkenning, actie en terugtocht maken breuken tot heldenwerk' },
      { milestone: 'Eigenschappentabellen vergelijken (snelheid, kracht, intelligentie per held)', howWeAddress: 'Tabelactiviteiten waarbij kinderen superheldeneigenschappen in een tabel vergelijken en rangschikken bouwen datageletterdheid op met motiverende gegevens' },
      { milestone: 'Vergelijkend analytisch verslag schrijven (twee helden vergelijken op prestaties)', howWeAddress: 'Schrijfopdrachten waarbij kinderen twee superhelden vergelijken in een meerparagraaf-verslag met eigenschappenanalyse en beargumenteerde conclusie oefenen vergelijkend schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk krachtberekeningen tot de tafels van 2 en 5 met kleinere getallen, gebruik halven bij missietijdbreuken en bied een schrijfkader aan met vergelijkingskolommen. Voor gevorderde kinderen: introduceer meerstapsberekeningen met gecombineerde heldenkrachten, laat hen missietijd als breuken en percentages vergelijken en daag hen uit met een uitgebreid heldenanalyserapport inclusief eigenschappentabel, vergelijkingsgrafiek en beargumenteerd betoog over de ideale superheldcombinatie.',
    parentTakeaway: 'Superhelden maken rekenen episch in groep 5. Bereken samen: als een held 200 km per uur vliegt en een missie 3 uur duurt, hoeveel kilometer legt hij af? Als een held 2/5 van de missietijd vecht en de missie duurt 50 minuten, hoeveel minuten vecht hij? Vergelijk samen twee favoriete helden op kracht en snelheid. Na een superheldenwerkblad kunt u samen een kort verslag schrijven dat twee helden vergelijkt en beargumenteert wie het sterkste team vormt.',
    classroomIntegration: 'Het superheldenthema integreert in groep 5 met rekenen (vermenigvuldiging met krachten, breuken met missietijd, gegevenstabellen), taal (vergelijkend schrijven, verhaalanalyse), kunstzinnige ori\u00ebntatie (heldenarchetypen, verhaallijn) en burgerschap (heldenmoed, verantwoordelijkheid, samenwerking). Een superheldenproject met werkbladen, een eigenschappenvergelijking en een creatief verslag combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Krachtberekeningen met vermenigvuldiging', emerging: 'vermenigvuldigt \u00e9\u00e9n krachtniveau maar combineert niet de krachten van meerdere helden', proficient: 'berekent zelfstandig gecombineerde krachtniveaus via vermenigvuldiging en vergelijkt heldenteams', advanced: 'lost meerstaps-krachtproblemen op met drie of meer helden, optimaliseert teamsamenstelling en beargumenteert de keuze' },
      { skill: 'Breuken bij missietijdverdeling', emerging: 'herkent halve missietijd maar past andere breuken niet toe bij de verdeling', proficient: 'berekent zelfstandig missietijdbreuken en vergelijkt tijdverdelingen van twee helden', advanced: 'vergelijkt complexe missietijdverdelingen, combineert breuken en berekent de effici\u00ebntste tijdverdeling' },
      { skill: 'Vergelijkend analytisch verslag', emerging: 'beschrijft twee helden apart maar vergelijkt niet systematisch op eigenschappen', proficient: 'schrijft een gestructureerd verslag dat twee helden vergelijkt op drie eigenschappen met conclusie', advanced: 'schrijft een uitgebreid analyserapport met vergelijkingstabel, grafiek, statistisch bewijs en beargumenteerde teamaanbeveling' },
    ],
  },

  toys: {
    seoTitle: 'Speelgoed-oefeningen Groep 5 | LessonCraftStudio',
    seoDescription: 'Uitprintbare speelgoed-oefeningen voor groep 5 (8\u20139 jaar). Vermenigvuldigen, delen, breuken, begrijpend lezen en informatief schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'speelgoed groep 5, speelgoed oefeningen 8\u20139 jaar, speelgoed oefeningen groep 5, speelgoed uitprintbaar groep 5, speelgoed werkbladen groep 5, speelgoed activiteiten groep 5, speelgoed leerbladen 8\u20139 jaar, speelgoed gratis groep 5, speelgoed PDF groep 5, speelgoed rekenen groep 5',
    snippetAnswer: 'Speelgoed-oefeningen voor groep 5 (8\u20139 jaar) combineren vermenigvuldigen en delen met speelgoedontwerp en -handel: productieberekeningen met vermenigvuldiging, breuken bij het verdelen van materialen, kostenanalyse met gegevenstabellen, begrijpend lezen over de geschiedenis van speelgoed en het schrijven van een bedrijfsplan voor een speelgoedwerkplaats met productie- en winstberekening. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 5 wordt het speelgoedthema een economische en technische context voor vermenigvuldigen, breuken en functioneel schrijven: acht- en negenjarigen zijn ge\u00efnteresseerd in hoe speelgoed wordt gemaakt en verkocht en die nieuwsgierigheid maakt rekenen met productieaantallen, materiaalkosten en winstmarges bijzonder boeiend. De SLO-leerlijnen benadrukken vermenigvuldigen en delen, breuken, gegevensanalyse en informatief schrijven als kerndoelen, en speelgoed biedt alle vier in een ondernemende context. Productieberekeningen \u2014 een werkplaats maakt 12 poppen per dag, 5 dagen per week, hoeveel per week en per maand? \u2014 oefenen meerstapsvermenigvuldiging. Materiaalbreuken \u2014 elke pop heeft 3/4 meter stof nodig, hoeveel meter voor 8 poppen? \u2014 maken breuken tastbaar. Kostenanalyse \u2014 materiaalkosten, arbeidskosten en verkoopprijs per product vergelijken \u2014 bouwt datageletterdheid op met economische concepten. Het schrijven van een bedrijfsplan voor een speelgoedwerkplaats oefent functioneel schrijven met zakelijke inhoud.',
    developmentalMilestones: [
      { milestone: 'Productieberekeningen met meerstapsvermenigvuldiging (8\u20139-jarigen berekenen dag-, week- en maandproductie)', howWeAddress: 'Werkplaatsactiviteiten waarbij kinderen de productie van speelgoed per dag, week en maand berekenen oefenen meerstapsvermenigvuldiging met economische context' },
      { milestone: 'Breuken bij materiaalverdeling (stoflengte, verf en onderdelen per product)', howWeAddress: 'Materiaalactiviteiten waarbij kinderen de benodigde hoeveelheid stof of verf in breuken berekenen voor meerdere producten maken breuken praktisch en tastbaar' },
      { milestone: 'Kostenanalyse met gegevenstabellen (materiaal-, arbeids- en verkoopkosten vergelijken)', howWeAddress: 'Tabelactiviteiten waarbij kinderen kostenposten per speelgoedtype vergelijken en winstmarges berekenen bouwen financi\u00eble geletterdheid op' },
      { milestone: 'Bedrijfsplan schrijven voor een speelgoedwerkplaats (productie, kosten, winst)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een bedrijfsplan opstellen met productieplan, kostenberekening en winstprognose oefenen functioneel-informatief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk productieberekeningen tot \u00e9\u00e9n vermenigvuldigingsstap met de tafels van 5, gebruik halven bij materiaalbreuken en bied een schrijfkader aan voor het bedrijfsplan. Voor gevorderde kinderen: introduceer meerstapsproductieberekeningen met seizoensvariatie, laat hen winstmarges berekenen als breuken en percentages en daag hen uit met een uitgebreid bedrijfsplan inclusief productietabel, kostengrafiek en beargumenteerde marketingstrategie.',
    parentTakeaway: 'Speelgoed biedt ondernemerskansen in groep 5. Bereken samen: als een bouwpakket 8 euro kost en er zitten 24 onderdelen in, hoeveel kost elk onderdeel? Als je 5 paketten per dag maakt en 20 werkdagen hebt, hoeveel paketten maak je? Verdeel samen materiaal: als elke pop 3/4 meter stof nodig heeft en je hebt 6 meter, voor hoeveel poppen is dat genoeg? Na een speelgoedwerkblad kunt u samen een mini-bedrijfsplan maken voor een denkbeeldige speelgoedwinkel.',
    classroomIntegration: 'Het speelgoedthema integreert in groep 5 met rekenen (productieberekeningen, breuken met materialen, kostenanalyse), taal (functioneel schrijven, bedrijfswoordenschat), natuur en techniek (ontwerp, materialen, productieprocessen) en burgerschap (ondernemerschap, eerlijke handel, duurzaam produceren). Een speelgoedwerkplaatsproject met werkbladen, een productieplan en een verkooppresentatie combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Productieberekeningen met vermenigvuldiging', emerging: 'vermenigvuldigt \u00e9\u00e9n stap maar combineert niet dag- naar week- naar maandproductie', proficient: 'berekent zelfstandig de productie per dag, week en maand en vergelijkt productiecapaciteiten', advanced: 'optimaliseert productieplanningen met seizoensvariatie, berekent jaaroverzichten en analyseert effici\u00ebntie' },
      { skill: 'Breuken bij materiaalverdeling', emerging: 'herkent halve hoeveelheden maar berekent niet zelfstandig breuken voor meerdere producten', proficient: 'berekent zelfstandig de benodigde materiaalhoeveelheid in breuken voor een serie producten', advanced: 'vergelijkt materiaalbehoeften van verschillende producten, optimaliseert materiaalgebruik en minimaliseert verspilling met breukberekeningen' },
      { skill: 'Bedrijfsplan voor speelgoedwerkplaats', emerging: 'noemt productie-idee\u00ebn maar mist structuur en kostenberekening', proficient: 'schrijft een gestructureerd bedrijfsplan met productieplan, kostenberekening en winstprognose', advanced: 'schrijft een uitgebreid plan met marktanalyse, vergelijking van productiemethoden, kostengrafiek en beargumenteerde strategie' },
    ],
  },

  transportation: {
    seoTitle: 'Vervoer-oefeningen Groep 5 | LessonCraftStudio',
    seoDescription: 'Uitprintbare vervoer-oefeningen voor groep 5 (8\u20139 jaar). Vermenigvuldigen, delen, breuken, begrijpend lezen en informatief schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vervoer groep 5, vervoer oefeningen 8\u20139 jaar, vervoer oefeningen groep 5, vervoer uitprintbaar groep 5, vervoer werkbladen groep 5, vervoer activiteiten groep 5, vervoer leerbladen 8\u20139 jaar, vervoer gratis groep 5, vervoer PDF groep 5, vervoer rekenen groep 5',
    snippetAnswer: 'Vervoer-oefeningen voor groep 5 (8\u20139 jaar) combineren vermenigvuldigen en delen met logistiek: afstand-snelheid-tijdberekeningen, breuken bij brandstofverdeling en vervoersmix, gegevenstabellen met vervoersmiddelen vergelijken op snelheid en CO\u2082-uitstoot, begrijpend lezen over de geschiedenis van transport en het schrijven van een duurzaam vervoersplan met berekeningen en onderbouwing. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 5 wordt het vervoerthema een logistieke en milieuwetenschappelijke context voor vermenigvuldigen, breuken en gegevensanalyse: acht- en negenjarigen zijn ge\u00efnteresseerd in voertuigen en snelheid en die fascinatie maakt rekenen met afstanden, reistijden en CO\u2082-uitstoot bijzonder motiverend. De SLO-leerlijnen benadrukken vermenigvuldigen en delen, meten in standaardeenheden, gegevensanalyse en informatief schrijven als kerndoelen, en vervoer biedt alle vier. Afstand-snelheid-tijd \u2014 een trein rijdt 120 km per uur en de reis duurt 3 uur, hoeveel kilometer? \u2014 oefent vermenigvuldiging met meetkunde. Brandstofbreuken \u2014 een auto verbruikt 1/10 tank per 50 km, hoeveel tank na 200 km? \u2014 maakt breuken logistiek relevant. Vergelijkingstabellen \u2014 snelheid, kosten en CO\u2082-uitstoot per vervoersmiddel \u2014 bouwen datageletterdheid op met maatschappelijk belang. Het schrijven van een duurzaam vervoersplan oefent informatief schrijven met milieu-argumentatie.',
    developmentalMilestones: [
      { milestone: 'Afstand-snelheid-tijdberekeningen (8\u20139-jarigen vermenigvuldigen snelheid maal tijd)', howWeAddress: 'Reisactiviteiten waarbij kinderen afstanden berekenen via snelheid maal tijd oefenen vermenigvuldiging met logistieke toepassing' },
      { milestone: 'Breuken bij brandstofverbruik (tankinhoud als breuken verdelen over afstanden)', howWeAddress: 'Brandstofactiviteiten waarbij kinderen tankverbruik als breuken berekenen per traject maken breuken relevant met duurzaamheidscontext' },
      { milestone: 'Vervoersmiddelen vergelijken in gegevenstabellen (snelheid, kosten, CO\u2082 per middel)', howWeAddress: 'Tabelactiviteiten waarbij kinderen vervoersmiddelen vergelijken op drie criteria en de duurzaamste optie beargumenteren bouwen datageletterdheid op' },
      { milestone: 'Duurzaam vervoersplan schrijven (onderbouwd met berekeningen en milieu-argumenten)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een vervoersplan voor een schoolreis schrijven met routeberekening, kostenanalyse en milieuvergelijking oefenen functioneel schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk afstandsberekeningen tot snelheden in hele tientallen en reistijden van 1\u20135 uur, gebruik halven bij brandstofbreuken en bied een schrijfkader aan voor het vervoersplan. Voor gevorderde kinderen: introduceer reistijdberekeningen met overstappen en wachttijd, laat hen CO\u2082-uitstoot berekenen per passagier en vergelijken en daag hen uit met een uitgebreid duurzaamheidsrapport inclusief vergelijkingstabel, routekaart en beargumenteerd betoog over mobiliteit.',
    parentTakeaway: 'Vervoer biedt rekenkansen onderweg in groep 5. Bereken samen op de snelweg: als jullie 100 km per uur rijden en de bestemming is 350 km ver, hoe lang duurt de rit? Als de trein 2 uur doet en de auto 3 uur, hoeveel tijd bespaar je met de trein? Vergelijk samen: hoeveel CO\u2082 stoot een vliegtuig uit per passagier vergeleken met de trein? Na een vervoerwerkblad kunt u samen de route naar school vergelijken: met de fiets, bus of auto \u2014 wat is het snelst, goedkoopst en schoonst?',
    classroomIntegration: 'Het vervoerthema integreert in groep 5 met rekenen (afstand-snelheid-tijd, breuken met brandstof, vergelijkingstabellen), taal (informatief schrijven, vervoerswoordenschat), aardrijkskunde (routes, kaartlezen, steden en afstanden) en burgerschap (duurzame mobiliteit, milieubewustzijn). Een schoolreisplanningsproject met werkbladen, een vervoersvergelijking en een presentatie combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Afstand-snelheid-tijdberekeningen', emerging: 'vermenigvuldigt snelheid maal tijd maar lost geen omgekeerde problemen op (tijd gegeven afstand en snelheid)', proficient: 'berekent zelfstandig afstand, snelheid of tijd gegeven de andere twee en vergelijkt reizen', advanced: 'lost complexe reisproblemen op met overstappen, combineert vervoersmiddelen en optimaliseert reistijd' },
      { skill: 'Breuken bij brandstofverbruik', emerging: 'herkent halve tank maar berekent niet zelfstandig fractie van tankverbruik per traject', proficient: 'berekent zelfstandig brandstofverbruik als breuken per traject en vergelijkt voertuigen', advanced: 'berekent brandstofkosten per kilometer, vergelijkt vervoersmiddelen op effici\u00ebntie en onderbouwt de duurzaamste keuze' },
      { skill: 'Duurzaam vervoersplan schrijven', emerging: 'noemt vervoersmiddelen maar vergelijkt niet op kosten en milieu-impact', proficient: 'schrijft een gestructureerd plan met routeberekening, kostenvergelijking en milieu-argument', advanced: 'schrijft een uitgebreid rapport met vergelijkingstabel, routekaart, CO\u2082-berekening per optie en beargumenteerde duurzaamheidsaanbeveling' },
    ],
  },

  travel: {
    seoTitle: 'Reizen-oefeningen Groep 5 | LessonCraftStudio',
    seoDescription: 'Uitprintbare reizen-oefeningen voor groep 5 (8\u20139 jaar). Vermenigvuldigen, delen, breuken, begrijpend lezen en informatief schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'reizen groep 5, reizen oefeningen 8\u20139 jaar, reizen oefeningen groep 5, reizen uitprintbaar groep 5, reizen werkbladen groep 5, reizen activiteiten groep 5, reizen leerbladen 8\u20139 jaar, reizen gratis groep 5, reizen PDF groep 5, reizen rekenen groep 5',
    snippetAnswer: 'Reizen-oefeningen voor groep 5 (8\u20139 jaar) combineren vermenigvuldigen en delen met wereldverkenning: valutaomrekeningen, breuken bij het verdelen van reisbudgetten, afstandsberekeningen op kaarten met schaal, gegevenstabellen met landenvergelijking en het schrijven van een reisverslag met routebeschrijving, culturele observaties en kostenberekening. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 5 wordt het reisthema een interculturele en geografische context voor vermenigvuldigen, breuken en functioneel schrijven: acht- en negenjarigen dromen van verre bestemmingen en die fantasie maakt rekenen met valuta, afstanden en tijdzones bijzonder inspirerend. De SLO-leerlijnen benadrukken vermenigvuldigen en delen, meten, gegevensanalyse en informatief schrijven als kerndoelen, en reizen biedt alle vier. Valutaomrekeningen \u2014 1 euro is 1,10 dollar, hoeveel dollar voor 50 euro? \u2014 oefenen vermenigvuldiging met decimalen. Budgetbreuken \u2014 1/3 van het reisbudget voor overnachting, 1/4 voor eten, hoeveel voor activiteiten? \u2014 maken breuken realistisch. Kaartschaalberekeningen \u2014 1 cm op de kaart is 100 km, de afstand meet 7 cm, hoeveel kilometer? \u2014 oefenen proportioneel denken. Het schrijven van een reisverslag met routebeschrijving, culturele waarnemingen en budget oefent informatief schrijven met interculturele inhoud.',
    developmentalMilestones: [
      { milestone: 'Valutaomrekeningen met vermenigvuldiging (8\u20139-jarigen rekenen euro om naar andere valuta)', howWeAddress: 'Valuta-activiteiten waarbij kinderen bedragen omrekenen met wisselkoersen oefenen vermenigvuldiging met financi\u00eble context' },
      { milestone: 'Breuken bij reisbudgetverdeling (budget verdelen over categorie\u00ebn als breuken)', howWeAddress: 'Budgetactiviteiten waarbij kinderen een reisbudget verdelen in breuken voor overnachting, eten en activiteiten maken breuken realistisch' },
      { milestone: 'Kaartschaalberekeningen (afstanden meten en omrekenen met schaal)', howWeAddress: 'Kaartactiviteiten waarbij kinderen afstanden meten op een kaart en met de schaal omrekenen naar werkelijke kilometers oefenen proportioneel denken' },
      { milestone: 'Reisverslag schrijven met culturele observaties (route, budget, ervaringen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een reisverslag schrijven met routebeschrijving, culturele waarnemingen en kostenberekening oefenen informatief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk valutaberekeningen tot hele euro\u2019s met eenvoudige wisselkoersen (1:2, 1:10), gebruik halven bij budgetbreuken en bied een schrijfkader aan voor het reisverslag. Voor gevorderde kinderen: introduceer wisselkoersen met decimalen en omgekeerde berekeningen, laat hen budgetbreuken vergelijken voor twee reizen en daag hen uit met een uitgebreid reisgidsverslag inclusief kaartroute, valutavergelijking, cultureel portret en beargumenteerde bestemmingsaanbeveling.',
    parentTakeaway: 'Reizen biedt wereldwijde rekenkansen in groep 5. Bereken samen: als 1 euro 10 Zweedse kronen is en het hotel 800 kronen per nacht kost, hoeveel euro is dat? Meet samen afstanden op een kaart: als 1 cm 50 km is en de afstand 8 cm meet, hoe ver is het? Verdeel samen het vakantiebudget: 1/3 voor slapen, 1/4 voor eten, hoeveel blijft er over voor activiteiten? Na een reiswerkblad kunt u samen een droomreis plannen met route, budget en bezienswaardigheden.',
    classroomIntegration: 'Het reisthema integreert in groep 5 met rekenen (valutaomrekeningen, kaartschaal, budgetbreuken), taal (informatief schrijven, reiswoordenschat), aardrijkskunde (landen, culturen, klimaat, kaartlezen) en burgerschap (intercultureel bewustzijn, duurzaam toerisme). Een reisgidsproject met werkbladen, een landenvergelijking en een presentatie combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Valutaomrekeningen', emerging: 'vermenigvuldigt met hele wisselkoersen maar past decimalen niet toe', proficient: 'rekent zelfstandig bedragen om met wisselkoersen en vergelijkt prijzen in twee valuta', advanced: 'rekent heen en terug om, vergelijkt wisselkoersen van drie landen en analyseert prijsverschillen' },
      { skill: 'Kaartschaalberekeningen', emerging: 'meet afstanden op een kaart maar rekent niet zelfstandig om met de schaal', proficient: 'berekent zelfstandig afstanden via kaartschaal en vergelijkt routes op werkelijke afstand', advanced: 'berekent routes met meerdere tussenstops, optimaliseert de totale afstand en vergelijkt vervoersopties per traject' },
      { skill: 'Reisverslag schrijven', emerging: 'noemt een bestemming maar beschrijft niet de route, cultuur en kosten in samenhang', proficient: 'schrijft een gestructureerd reisverslag met routebeschrijving, culturele observaties en budgetoverzicht', advanced: 'schrijft een uitgebreid reisgidsartikel met vergelijking van bestemmingen, valutaberekening, cultureel portret en beargumenteerde aanbeveling' },
    ],
  },

  vegetables: {
    seoTitle: 'Groenten-oefeningen Groep 5 | LessonCraftStudio',
    seoDescription: 'Uitprintbare groenten-oefeningen voor groep 5 (8\u20139 jaar). Vermenigvuldigen, delen, breuken, begrijpend lezen en informatief schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'groenten groep 5, groenten oefeningen 8\u20139 jaar, groenten oefeningen groep 5, groenten uitprintbaar groep 5, groenten werkbladen groep 5, groenten activiteiten groep 5, groenten leerbladen 8\u20139 jaar, groenten gratis groep 5, groenten PDF groep 5, groenten rekenen groep 5',
    snippetAnswer: 'Groenten-oefeningen voor groep 5 (8\u20139 jaar) combineren vermenigvuldigen en delen met voedselwetenschap: oogstberekeningen per seizoen, breuken bij recepten en voedingswaarden, gegevenstabellen met vitamine- en mineraalgehalte vergelijken, begrijpend lezen over groenteproductie en het schrijven van een onderzoeksverslag over duurzame landbouw met productiecijfers en voedingsanalyse. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 5 wordt het groententhema een voedingswetenschappelijke en agrarische context voor vermenigvuldigen, breuken en gegevensanalyse: acht- en negenjarigen worden zich bewust van gezonde voeding en die interesse maakt rekenen met oogstopbrengsten, recepthoeveelheden en voedingswaarden bijzonder relevant. De SLO-leerlijnen benadrukken vermenigvuldigen en delen, breuken, gegevensanalyse en informatief schrijven als kerndoelen, en groenten bieden alle vier. Oogstberekeningen \u2014 een moestuin levert 8 kg tomaten per bed en er zijn 6 bedden, hoeveel kilogram totaal? \u2014 oefenen vermenigvuldiging met agrarische context. Receptbreuken \u2014 een soeprecept vraagt 3/4 kg wortels per 4 personen, hoeveel voor 12 personen? \u2014 maken breuken keukenrelevant. Voedingswaardetabellen \u2014 vitaminegehalte, vezels en calorie\u00ebn per groente vergelijken \u2014 bouwen datageletterdheid op met gezondheidsrelevantie. Het schrijven van een onderzoeksverslag over duurzame groenteproductie oefent informatief schrijven met maatschappelijke inhoud.',
    developmentalMilestones: [
      { milestone: 'Oogstberekeningen met vermenigvuldiging (8\u20139-jarigen berekenen seizoensopbrengsten per bed en per moestuin)', howWeAddress: 'Moestuinactiviteiten waarbij kinderen de oogst per bed vermenigvuldigen met het aantal bedden oefenen vermenigvuldiging met agrarische toepassing' },
      { milestone: 'Breuken bij recepten en porties (groentehoeveelheden opschalen voor meer personen)', howWeAddress: 'Receptactiviteiten waarbij kinderen ingredi\u00ebnthoeveelheden als breuken opschalen voor grotere groepen maken breuken keukenrelevant en tastbaar' },
      { milestone: 'Voedingswaardetabellen analyseren (vitamines, vezels en calorie\u00ebn per groente vergelijken)', howWeAddress: 'Tabelactiviteiten waarbij kinderen voedingswaarden aflezen, ordenen en de gezondste combinatie beargumenteren bouwen gezondheidsgeletterdheid op' },
      { milestone: 'Onderzoeksverslag schrijven over duurzame groenteproductie (van zaad tot bord)', howWeAddress: 'Schrijfopdrachten waarbij kinderen de productieketen van een groente beschrijven in een meerparagraaf-verslag met feiten, cijfers en duurzaamheidsanalyse' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk oogstberekeningen tot de tafels van 5 en 10 met kleine aantallen bedden, gebruik halven en kwarten bij receptbreuken en bied een schrijfkader aan voor het groenteverslag. Voor gevorderde kinderen: introduceer seizoensvergelijkingen met opbrengsten per maand, laat hen recepten opschalen met gemengde breuken en daag hen uit met een uitgebreid landbouwrapport inclusief productietabel, voedingswaardevergelijking en beargumenteerd betoog over biologische teelt.',
    parentTakeaway: 'Groenten bieden gezonde rekenkansen in groep 5. Bereken samen in de keuken: als het recept 3/4 kg wortels vraagt per 4 personen en jullie zijn met 8, hoeveel kilogram heb je nodig? Vergelijk samen voedingslabels: welke groente heeft de meeste vezels, welke de meeste vitamine C? Bereken samen de oogst: als elk bed 5 kg oplevert en je hebt 4 bedden, hoeveel kilogram totaal? Na een groentenwerkblad kunt u samen een kort verslag schrijven over hoe jullie favoriete groente van het land op het bord komt.',
    classroomIntegration: 'Het groententhema integreert in groep 5 met rekenen (oogstberekeningen, breuken met recepten, voedingswaardetabellen), taal (informatief schrijven, voedingswoordenschat), natuur en techniek (plantgroei, voeding, duurzame landbouw) en burgerschap (gezonde voeding, voedselketen, milieubewustzijn). Een moestuinproject met werkbladen, een voedingsonderzoek en een duurzaamheidsverslag combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Oogstberekeningen met vermenigvuldiging', emerging: 'vermenigvuldigt opbrengst per bed maar berekent niet de totale moestuinoogst over meerdere bedden', proficient: 'berekent zelfstandig de totale oogst per moestuin en vergelijkt opbrengsten van twee seizoenen', advanced: 'berekent seizoensopbrengsten met variatie per bed, vergelijkt teeltmethoden en optimaliseert de moestuinindeling' },
      { skill: 'Breuken bij recepten', emerging: 'herkent halve hoeveelheden maar schaalt niet zelfstandig op naar meerdere porties', proficient: 'berekent zelfstandig ingredi\u00ebnthoeveelheden in breuken voor een verdubbeld of verdrievoudigd recept', advanced: 'schaalt recepten op naar willekeurige aantallen, combineert gemengde breuken en berekent de boodschappenlijst' },
      { skill: 'Onderzoeksverslag over groenteproductie', emerging: 'noemt feiten over groenten maar beschrijft de productieketen niet samenhangend', proficient: 'schrijft een gestructureerd verslag over de productieketen van een groente met feiten, cijfers en conclusie', advanced: 'schrijft een uitgebreid rapport dat twee teeltmethoden vergelijkt met productiecijfers, voedingswaardeanalyse en beargumenteerde aanbeveling' },
    ],
  },

  weather: {
    seoTitle: 'Weer-oefeningen Groep 5 | LessonCraftStudio',
    seoDescription: 'Uitprintbare weer-oefeningen voor groep 5 (8\u20139 jaar). Vermenigvuldigen, delen, breuken, begrijpend lezen en informatief schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'weer groep 5, weer oefeningen 8\u20139 jaar, weer oefeningen groep 5, weer uitprintbaar groep 5, weer werkbladen groep 5, weer activiteiten groep 5, weer leerbladen 8\u20139 jaar, weer gratis groep 5, weer PDF groep 5, weer rekenen groep 5',
    snippetAnswer: 'Weer-oefeningen voor groep 5 (8\u20139 jaar) combineren vermenigvuldigen en delen met meteorologie: temperatuurgemiddelden berekenen, breuken bij neerslagverdeling over maanden, weergegevens bijhouden in lijn- en staafdiagrammen, begrijpend lezen over klimaatzones en het schrijven van een weeronderzoeksverslag met seizoensvergelijking en klimaatanalyse. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 5 wordt het weerthema een meteorologische en wetenschappelijke context voor gegevensanalyse, breuken en informatief schrijven: acht- en negenjarigen volgen het dagelijks weer en die betrokkenheid maakt rekenen met temperaturen, neerslagcijfers en klimaatgegevens bijzonder relevant. De SLO-leerlijnen benadrukken vermenigvuldigen en delen, breuken, gegevensanalyse met grafieken en informatief schrijven als kerndoelen, en het weer biedt alle vier. Temperatuurgemiddelden \u2014 vijf dagen met maxima van 18, 20, 22, 19 en 21 graden, wat is het gemiddelde? \u2014 oefenen optelling en deling. Neerslagbreuken \u2014 in maart valt 1/4 van de jaarlijkse neerslag, in totaal 800 mm per jaar, hoeveel in maart? \u2014 maken breuken meteorologisch concreet. Klimaatdiagrammen \u2014 maandelijkse temperatuur en neerslag in een gecombineerd diagram \u2014 bouwen datageletterdheid op met echte weergegevens. Het schrijven van een klimaatonderzoeksverslag dat twee seizoenen of steden vergelijkt oefent wetenschappelijk informatief schrijven.',
    developmentalMilestones: [
      { milestone: 'Temperatuurgemiddelden berekenen met deling (8\u20139-jarigen tellen dagtemperaturen op en delen door het aantal dagen)', howWeAddress: 'Weeractiviteiten waarbij kinderen dagelijkse temperaturen optellen en het gemiddelde berekenen oefenen deling met praktische meteorologische gegevens' },
      { milestone: 'Breuken bij neerslagverdeling over maanden (jaarlijkse neerslag als breuken per seizoen)', howWeAddress: 'Neerslagactiviteiten waarbij kinderen de jaarlijkse neerslag verdelen in breuken per seizoen maken breuken relevant met klimaatcontext' },
      { milestone: 'Klimaatdiagrammen tekenen en interpreteren (temperatuur en neerslag per maand)', howWeAddress: 'Diagramactiviteiten waarbij kinderen een klimaatdiagram tekenen met temperatuurlijn en neerslagstaven en de patronen beschrijven bouwen wetenschappelijke datageletterdheid op' },
      { milestone: 'Klimaatonderzoeksverslag schrijven (twee steden of seizoenen vergelijken)', howWeAddress: 'Schrijfopdrachten waarbij kinderen het klimaat van twee steden vergelijken in een meerparagraaf-verslag met gegevens, grafieken en conclusie oefenen vergelijkend wetenschappelijk schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk gemiddelden tot drie dagtemperaturen met ronde getallen, gebruik halven en kwarten bij neerslagbreuken en bied een schrijfkader aan voor het weerverslag. Voor gevorderde kinderen: introduceer gemiddelden over langere periodes met temperaturen die rest opleveren, laat hen klimaatdiagrammen van drie steden vergelijken en daag hen uit met een uitgebreid klimaatrapport inclusief vergelijkende diagrammen, seizoensanalyse en beargumenteerde conclusie over klimaatverandering.',
    parentTakeaway: 'Het weer biedt dagelijkse rekenkansen in groep 5. Bereken samen het weekgemiddelde: als het maandag 18 graden was, dinsdag 20, woensdag 22, donderdag 19 en vrijdag 21, wat is het gemiddelde? Vergelijk samen de neerslag: als er in een jaar 800 mm regen valt en 1/4 in de herfst, hoeveel millimeter is dat? Teken samen een weekgrafiekje van de temperatuur. Na een weerwerkblad kunt u samen het weer van twee steden vergelijken en opschrijven welke droger en warmer is.',
    classroomIntegration: 'Het weerthema integreert in groep 5 met rekenen (gemiddelden, breuken met neerslag, klimaatdiagrammen), taal (wetenschappelijk schrijven, meteorologische woordenschat), natuur en techniek (weersverschijnselen, waterkringloop, klimaat) en aardrijkskunde (klimaatzones, seizoenen, steden vergelijken). Een weerstation-project met werkbladen, een klimaatvergelijking en een presentatie combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Temperatuurgemiddelden berekenen', emerging: 'telt temperaturen op maar deelt niet zelfstandig door het aantal dagen', proficient: 'berekent zelfstandig het gemiddelde van vijf dagtemperaturen en vergelijkt weekgemiddelden', advanced: 'berekent gemiddelden over langere periodes, vergelijkt seizoensgemiddelden en analyseert temperatuurtrends' },
      { skill: 'Breuken bij neerslagverdeling', emerging: 'herkent halve jaarlijkse neerslag maar past kwarten en derden niet toe per seizoen', proficient: 'berekent zelfstandig de neerslag per seizoen als breuk van het jaartotaal en vergelijkt seizoenen', advanced: 'vergelijkt neerslagverdelingen van twee steden, berekent percentages en analyseert klimaatverschillen' },
      { skill: 'Klimaatonderzoeksverslag', emerging: 'noemt weergegevens maar vergelijkt niet systematisch twee steden of seizoenen', proficient: 'schrijft een gestructureerd verslag dat twee steden vergelijkt op temperatuur en neerslag met diagrammen en conclusie', advanced: 'schrijft een uitgebreid klimaatrapport met vergelijkende diagrammen, seizoensanalyse, bronvermelding en beargumenteerde conclusie over klimaatpatronen' },
    ],
  },

  winter: {
    seoTitle: 'Winter-oefeningen Groep 5 | LessonCraftStudio',
    seoDescription: 'Uitprintbare winter-oefeningen voor groep 5 (8\u20139 jaar). Vermenigvuldigen, delen, breuken, begrijpend lezen en informatief schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'winter groep 5, winter oefeningen 8\u20139 jaar, winter oefeningen groep 5, winter uitprintbaar groep 5, winter werkbladen groep 5, winter activiteiten groep 5, winter leerbladen 8\u20139 jaar, winter gratis groep 5, winter PDF groep 5, winter rekenen groep 5',
    snippetAnswer: 'Winter-oefeningen voor groep 5 (8\u20139 jaar) combineren vermenigvuldigen en delen met winterwetenschap: temperatuurverschillen berekenen met negatieve getallen, breuken bij het verdelen van wintervoorraad, sneeuwvalgegevens bijhouden in grafieken, begrijpend lezen over winteraanpassingen van dieren en het schrijven van een onderzoeksverslag over hoe dieren en planten de winter overleven. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 5 wordt het winterthema een natuurwetenschappelijke en wiskundige context voor temperatuurrekenen, gegevensanalyse en informatief schrijven: acht- en negenjarigen ervaren de winter bewust en die beleving maakt rekenen met vriestemperaturen, sneeuwval en daglengteverschillen bijzonder tastbaar. De SLO-leerlijnen benadrukken vermenigvuldigen en delen, meten, gegevensanalyse en informatief schrijven als kerndoelen, en de winter biedt alle vier. Temperatuurverschillen \u2014 overdag 3 graden, \u2019s nachts \u20135 graden, hoeveel verschil? \u2014 introduceren rekenen over de nul heen. Wintervoorraadbreuken \u2014 een eekhoorn verzamelt 200 eikels en eet er 1/5 per maand, hoeveel maanden redt hij het? \u2014 maken breuken tot overlevingswiskunde. Sneeuwvalgrafieken \u2014 dagelijkse sneeuwval meten en in een staafdiagram tekenen \u2014 bouwen datageletterdheid op met seizoensgegevens. Het schrijven van een onderzoeksverslag over winteraanpassingen van dieren oefent wetenschappelijk informatief schrijven.',
    developmentalMilestones: [
      { milestone: 'Temperatuurverschillen berekenen met negatieve getallen (8\u20139-jarigen rekenen over de nul heen)', howWeAddress: 'Thermometeractiviteiten waarbij kinderen het verschil berekenen tussen positieve en negatieve temperaturen introduceren rekenen met negatieve getallen' },
      { milestone: 'Breuken bij wintervoorraden (eten als breuk van totale voorraad per maand)', howWeAddress: 'Voorraadactiviteiten waarbij kinderen berekenen hoeveel een dier per maand eet als breuk van de totale wintervoorraad maken breuken ecologisch relevant' },
      { milestone: 'Sneeuwvalgegevens bijhouden in staafdiagrammen (dagelijkse metingen visualiseren)', howWeAddress: 'Meetactiviteiten waarbij kinderen sneeuwval meten en in een staafdiagram tekenen bouwen datageletterdheid op met winterse meteorologische gegevens' },
      { milestone: 'Onderzoeksverslag schrijven over winteraanpassingen (hibernatie, migratie, isolatie)', howWeAddress: 'Schrijfopdrachten waarbij kinderen winteraanpassingen van drie dieren vergelijken in een meerparagraaf-verslag met wetenschappelijke feiten en conclusie' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk temperatuurberekeningen tot kleine getallen rond de nul met een thermometervisualisatie, gebruik halven bij voorraadbreuken en bied een schrijfkader aan voor het winterverslag. Voor gevorderde kinderen: introduceer temperatuurgemiddelden over een winterweek met negatieve getallen, laat hen wintervoorraden berekenen met meerdere diersoorten en breukvergelijking en daag hen uit met een uitgebreid ecologisch rapport over winteroverleving inclusief vergelijkingstabel, temperatuurgrafiek en beargumenteerd betoog over klimaatverandering en winteraanpassingen.',
    parentTakeaway: 'De winter biedt koude rekenkansen in groep 5. Bereken samen: als het overdag 2 graden is en \u2019s nachts \u20134 graden, hoeveel verschil is dat? Als een eekhoorn 200 noten heeft en er 40 per maand eet, hoeveel maanden redt hij het? Meet samen de sneeuwlaag met een liniaal en houd een weekgrafiekje bij. Vergelijk samen de daglengte: in december is het om 16:30 donker, in juni om 22:00 \u2014 hoeveel uur verschil? Na een winterwerkblad kunt u samen een kort verslag schrijven over hoe dieren in jullie buurt de winter overleven.',
    classroomIntegration: 'Het winterthema integreert in groep 5 met rekenen (temperatuurverschillen, breuken met voorraden, sneeuwvaldiagrammen), taal (wetenschappelijk schrijven, winterwoordenschat), natuur en techniek (winteraanpassingen, waterkringloop, seizoenen) en beeldende vorming (winterlandschappen, ijskristalpatronen). Een winteronderzoeksproject met werkbladen, een dierenaanpassingsvergelijking en een presentatie combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Temperatuurverschillen met negatieve getallen', emerging: 'leest temperaturen af maar berekent niet zelfstandig het verschil over de nul', proficient: 'berekent zelfstandig temperatuurverschillen tussen positieve en negatieve waarden en vergelijkt winterdagen', advanced: 'berekent weekgemiddelden met negatieve getallen, vergelijkt wintermaanden en analyseert temperatuurtrends' },
      { skill: 'Breuken bij wintervoorraden', emerging: 'herkent dat een dier elke maand een deel eet maar berekent niet hoeveel maanden de voorraad meegaat', proficient: 'berekent zelfstandig hoeveel maanden een wintervoorraad meegaat en vergelijkt twee diersoorten', advanced: 'vergelijkt voorraadbehoefen van meerdere dieren, berekent het tekort en beargumenteert overlevingsstrategieën' },
      { skill: 'Onderzoeksverslag over winteraanpassingen', emerging: 'noemt feiten over winterdieren maar vergelijkt niet systematisch hun aanpassingsstrategieën', proficient: 'schrijft een gestructureerd verslag dat drie dieren vergelijkt op winteraanpassing met feiten en conclusie', advanced: 'schrijft een uitgebreid rapport met vergelijkingstabel, temperatuurgegevens, ecologische analyse en beargumenteerde visie op klimaatimpact' },
    ],
  },

  xmas: {
    seoTitle: 'Kerst-oefeningen Groep 5 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kerst-oefeningen voor groep 5 (8\u20139 jaar). Vermenigvuldigen, delen, breuken, begrijpend lezen en informatief schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kerst groep 5, kerst oefeningen 8\u20139 jaar, kerst oefeningen groep 5, kerst uitprintbaar groep 5, kerst werkbladen groep 5, kerst activiteiten groep 5, kerst leerbladen 8\u20139 jaar, kerst gratis groep 5, kerst PDF groep 5, kerst rekenen groep 5',
    snippetAnswer: 'Kerst-oefeningen voor groep 5 (8\u20139 jaar) combineren vermenigvuldigen en delen met feestplanning: kerstbudgetten berekenen, breuken bij het verdelen van kerstgebak en cadeaus, gegevenstabellen met kerstvieringen in verschillende landen vergelijken, begrijpend lezen over kersttradities wereldwijd en het schrijven van een vergelijkend verslag over hoe kerst in drie landen wordt gevierd. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 5 wordt het kerstthema een interculturele en financi\u00eble context voor budgetrekenen, breuken en vergelijkend schrijven: acht- en negenjarigen zijn enthousiast over kerst en die betrokkenheid maakt rekenen met cadeaubudgetten, recepthoeveelheden en traditievergelijkingen bijzonder motiverend. De SLO-leerlijnen benadrukken vermenigvuldigen en delen, breuken, gegevensanalyse en informatief schrijven als kerndoelen, en kerst biedt alle vier in een feestelijke context. Cadeaubudgetten \u2014 8 cadeaus met een gemiddelde van 15 euro per stuk, hoeveel in totaal, hoeveel wisselgeld van 150 euro? \u2014 oefenen meerstapsvermenigvuldiging met geld. Kerstgebakbreuken \u2014 een recept voor 12 kerstkoekjes vraagt 3/4 kopje suiker, hoeveel voor 36 koekjes? \u2014 maken breuken feestelijk concreet. Traditievergelijkingstabellen \u2014 datum, typisch gerecht, cadeau-uitwisseling per land \u2014 bouwen culturele datageletterdheid op. Het schrijven van een vergelijkend verslag over kerstviering in drie landen oefent intercultureel informatief schrijven.',
    developmentalMilestones: [
      { milestone: 'Kerstbudgetten berekenen met vermenigvuldiging (8\u20139-jarigen berekenen cadeaukosten en wisselgeld)', howWeAddress: 'Budgetactiviteiten waarbij kinderen cadeaukosten vermenigvuldigen, het totaal berekenen en wisselgeld bepalen oefenen meerstaps-geldrekenen' },
      { milestone: 'Breuken bij kerstgebak en cadeauverdeling (recepten opschalen, cadeaus eerlijk verdelen)', howWeAddress: 'Bakactiviteiten waarbij kinderen recepthoeveelheden als breuken opschalen voor grotere batches maken breuken feestelijk en tastbaar' },
      { milestone: 'Kerstvieringen in gegevenstabellen vergelijken (tradities per land op meerdere kenmerken)', howWeAddress: 'Tabelactiviteiten waarbij kinderen kersttradities uit vijf landen vergelijken op datum, gerecht en cadeau-gebruik bouwen interculturele datageletterdheid op' },
      { milestone: 'Vergelijkend verslag schrijven over kerstviering wereldwijd (drie landen, drie kenmerken)', howWeAddress: 'Schrijfopdrachten waarbij kinderen kerstviering in drie landen vergelijken in een meerparagraaf-verslag met vergelijkingstabel en culturele reflectie' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk budgetberekeningen tot ronde bedragen met de tafels van 5 en 10, gebruik halven bij receptbreuken en bied een schrijfkader aan met vergelijkingskolommen voor het kerstverslag. Voor gevorderde kinderen: introduceer budgetoptimalisatie met kortingsberekeningen, laat hen recepten opschalen met gemengde breuken en daag hen uit met een uitgebreid intercultureel kerstrapport inclusief vergelijkingstabel, wereldkaart, tradities-tijdlijn en beargumenteerde reflectie over culturele diversiteit.',
    parentTakeaway: 'Kerst biedt gezellige rekenkansen in groep 5. Bereken samen het cadeaubudget: als elk cadeau gemiddeld 12 euro kost en er zijn 6 cadeaus nodig, hoeveel in totaal? Bak samen kerstkoekjes: als het recept 3/4 kopje bloem per 12 koekjes vraagt en jullie willen 48 koekjes, hoeveel bloem heb je nodig? Vergelijk samen: hoe vieren ze kerst in Duitsland, Engeland en Australi\u00eb? Na een kerstwerkblad kunt u samen een kort verslag schrijven over hoe kerst er in een ander land uitziet.',
    classroomIntegration: 'Het kerstthema integreert in groep 5 met rekenen (budgetberekeningen, breuken met recepten, traditietabellen), taal (vergelijkend schrijven, feestwoordenschat), aardrijkskunde (tradities wereldwijd, klimaatverschillen rond kerst) en burgerschap (intercultureel bewustzijn, respect voor diversiteit). Een kerstproject met werkbladen, een wereldkerstmarkt en een traditiepresentatie combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Kerstbudgetten berekenen', emerging: 'vermenigvuldigt \u00e9\u00e9n cadeauprijs maar berekent niet het totaalbudget en wisselgeld', proficient: 'berekent zelfstandig het totale cadeaubudget met meerdere posten en bepaalt wisselgeld', advanced: 'optimaliseert een budget met kortingsberekeningen, vergelijkt alternatieven en beargumenteert de beste verdeling' },
      { skill: 'Breuken bij kerstgebak', emerging: 'herkent halve hoeveelheden maar schaalt niet zelfstandig recepten op met kwarten en derden', proficient: 'schaalt zelfstandig een kerstrecept op met breuken voor een verdrievoudigde batch en berekent totalen', advanced: 'schaalt recepten op naar willekeurige aantallen, combineert gemengde breuken en berekent de volledige boodschappenlijst' },
      { skill: 'Vergelijkend verslag over kerstviering', emerging: 'beschrijft \u00e9\u00e9n kersttraditie maar vergelijkt niet systematisch tussen landen', proficient: 'schrijft een gestructureerd verslag dat drie landen vergelijkt op datum, gerecht en cadeau-traditie met conclusie', advanced: 'schrijft een uitgebreid intercultureel rapport met vergelijkingstabel, wereldkaart, historische achtergrond en beargumenteerde reflectie over culturele uitwisseling' },
    ],
  },

  zoo: {
    seoTitle: 'Dierentuin-oefeningen Groep 5 | LessonCraftStudio',
    seoDescription: 'Uitprintbare dierentuin-oefeningen voor groep 5 (8\u20139 jaar). Vermenigvuldigen, delen, breuken, begrijpend lezen en informatief schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dierentuin groep 5, dierentuin oefeningen 8\u20139 jaar, dierentuin oefeningen groep 5, dierentuin uitprintbaar groep 5, dierentuin werkbladen groep 5, dierentuin activiteiten groep 5, dierentuin leerbladen 8\u20139 jaar, dierentuin gratis groep 5, dierentuin PDF groep 5, dierentuin rekenen groep 5',
    snippetAnswer: 'Dierentuin-oefeningen voor groep 5 (8\u20139 jaar) combineren vermenigvuldigen en delen met dierenverzorging: voedingsberekeningen per dier per week, breuken bij de verdeling van verblijfsoppervlakte, bezoekersgegevens bijhouden in grafieken, begrijpend lezen over bedreigde diersoorten en het schrijven van een onderzoeksverslag over een dierentuinbeschermingsprogramma met populatiegegevens en beargumenteerde conclusie. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 5 wordt het dierentuinthema een zoölogische en ecologische context voor vermenigvuldigen, breuken en gegevensanalyse: acht- en negenjarigen zijn gefascineerd door exotische dieren en die verwondering maakt rekenen met voedingsschema\u2019s, verblijfsafmetingen en populatiegegevens bijzonder boeiend. De SLO-leerlijnen benadrukken vermenigvuldigen en delen, breuken, gegevensanalyse met tabellen en informatief schrijven als kerndoelen, en de dierentuin biedt alle vier. Voedingsberekeningen \u2014 een olifant eet 150 kg per dag, hoeveel per week? \u2014 oefenen vermenigvuldiging met grote getallen. Verblijfsbreuken \u2014 een verblijf van 500 m\u00b2 wordt verdeeld: 2/5 wateroppervlak, 2/5 land, 1/5 schuilplaats \u2014 maken breuken ruimtelijk concreet. Bezoekersgrafieken \u2014 dagelijks bezoekersaantal per maand in een staafdiagram \u2014 bouwen datageletterdheid op met recreatieve gegevens. Het schrijven van een onderzoeksverslag over een dierenbeschermingsprogramma oefent informatief schrijven met ecologische inhoud.',
    developmentalMilestones: [
      { milestone: 'Voedingsberekeningen met vermenigvuldiging (8\u20139-jarigen berekenen weekvoeding voor dierentuindieren)', howWeAddress: 'Voedingsactiviteiten waarbij kinderen de dagelijkse voedselbehoefte van dieren vermenigvuldigen naar een weekplan oefenen vermenigvuldiging met grote getallen' },
      { milestone: 'Breuken bij verblijfsindeling (oppervlakte verdelen in water, land en schuilplaats)', howWeAddress: 'Verblijfsactiviteiten waarbij kinderen de oppervlakte van een dierenverblijf verdelen in breuken voor verschillende zones maken breuken ruimtelijk en ecologisch relevant' },
      { milestone: 'Bezoekersgegevens bijhouden in staafdiagrammen (dagelijks of maandelijks bezoekersaantal)', howWeAddress: 'Grafiekactiviteiten waarbij kinderen bezoekersaantallen in een staafdiagram tekenen en seizoenspatronen beschrijven bouwen datageletterdheid op' },
      { milestone: 'Onderzoeksverslag schrijven over een dierenbeschermingsprogramma (populatiegegevens en maatregelen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een beschermingsprogramma beschrijven met populatiecijfers, maatregelen en conclusie oefenen wetenschappelijk-informatief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk voedingsberekeningen tot de tafels van 5 en 10 met kleinere dieren, gebruik halven bij verblijfsbreuken en bied een schrijfkader aan voor het dierenverslag. Voor gevorderde kinderen: introduceer voedingsbudgetberekeningen met kosten per kilogram per diersoort, laat hen verblijfsbreuken vergelijken voor verschillende dieren en omzetten naar percentages en daag hen uit met een uitgebreid zoölogisch rapport inclusief populatietabel, vergelijkingsgrafiek en beargumenteerd betoog over dierenwelzijn en soortbehoud.',
    parentTakeaway: 'De dierentuin biedt fascinerende rekenkansen in groep 5. Bereken samen: als een leeuw 8 kg vlees per dag eet, hoeveel per week? Als een verblijf 400 m\u00b2 is en 2/5 water, hoeveel vierkante meter water is dat? Tel samen de bezoekers bij het apenverblijf en vergelijk met de olifanten. Vergelijk samen: welk dier eet het meest per dag, welk het minst? Na een dierentuinwerkblad kunt u samen een kort verslag schrijven over een bedreigd dier en wat de dierentuin doet om het te beschermen.',
    classroomIntegration: 'Het dierentuinthema integreert in groep 5 met rekenen (voedingsberekeningen, breuken met verblijfsindeling, bezoekersgrafieken), taal (informatief schrijven, zoölogische woordenschat), natuur en techniek (dierenverzorging, ecosystemen, bedreigde soorten) en burgerschap (dierenwelzijn, natuurbescherming, biodiversiteit). Een dierentuinproject met werkbladen, een dierenpaspoort en een beschermingsverslag combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Voedingsberekeningen voor dierentuindieren', emerging: 'vermenigvuldigt dagvoeding maar berekent niet zelfstandig het weektotaal voor meerdere dieren', proficient: 'berekent zelfstandig weekvoeding voor drie dieren en vergelijkt voedselbehoefen in een tabel', advanced: 'berekent voedingsbudgetten per dier per maand, vergelijkt kosten en optimaliseert het voederplan' },
      { skill: 'Breuken bij verblijfsindeling', emerging: 'herkent halve oppervlakte maar verdeelt niet zelfstandig in vijfden of derden', proficient: 'verdeelt zelfstandig een verblijfsoppervlakte in breuken en berekent het aantal vierkante meters per zone', advanced: 'vergelijkt verblijfsindelingen van drie dieren, berekent de optimale verdeling en beargumenteert de keuze op basis van dierbehoeften' },
      { skill: 'Onderzoeksverslag over dierenbescherming', emerging: 'noemt een bedreigd dier maar beschrijft niet het beschermingsprogramma met gegevens', proficient: 'schrijft een gestructureerd verslag over een beschermingsprogramma met populatiecijfers, maatregelen en conclusie', advanced: 'schrijft een uitgebreid rapport dat twee programma\u2019s vergelijkt met populatiegrafiek, succesfactoren en beargumenteerde visie op natuurbehoud' },
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

  // Check if already enriched (seoTitle in third-grade block)
  const thirdGradeIdx = content.indexOf("'third-grade'");
  const faqCommentIdx = content.indexOf("// -- FAQ --");

  if (thirdGradeIdx === -1 || faqCommentIdx === -1) {
    console.error(`MISSING GRADE/FAQ BLOCKS: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  const thirdGradeBlock = content.substring(thirdGradeIdx, faqCommentIdx);
  if (thirdGradeBlock.includes('seoTitle:')) {
    console.log(`SKIP (already enriched): ${theme}/nl.ts`);
    continue;
  }

  // STEP 1: Insert seoTitle/seoDescription/seoKeywords right after "'third-grade': {"
  const thirdGradeOpenPattern = "'third-grade': {";
  const thirdGradeOpenIdx = content.indexOf(thirdGradeOpenPattern);
  if (thirdGradeOpenIdx === -1) {
    console.error(`NO THIRD-GRADE OPEN FOUND: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  const seoInsertPos = thirdGradeOpenIdx + thirdGradeOpenPattern.length;
  const seoText = '\n' + buildSeoInsertionText(enrichments[theme]);
  content = content.substring(0, seoInsertPos) + seoText + content.substring(seoInsertPos);

  // STEP 2: Insert 7 enrichment fields after faq array (recalculate positions after insertion)
  const newThirdGradeIdx = content.indexOf("'third-grade'");
  const newFaqCommentIdx = content.indexOf("// -- FAQ --");
  const newThirdGradeBlock = content.substring(newThirdGradeIdx, newFaqCommentIdx);

  // Find the last "],\n" in the third-grade block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(newThirdGradeBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const enrichInsertPos = newThirdGradeIdx + lastMatch.index + lastMatch[0].length;
  const enrichText = buildEnrichmentInsertionText(enrichments[theme]) + '\n';
  content = content.substring(0, enrichInsertPos) + enrichText + content.substring(enrichInsertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/nl.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount}/${themes.length} enriched, ${errorCount} errors`);
