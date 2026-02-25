#!/usr/bin/env node
/**
 * SEO Part 321: NL Kindergarten Grade Enrichment — Themes 1-19
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the kindergarten grade block of 19 NL theme files (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    seoTitle: 'Alfabet-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare alfabet-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'alfabet groep 1-2, alfabet oefeningen 5\u20136 jaar, alfabet oefeningen groep 1-2, alfabet uitprintbaar groep 1-2, alfabet werkbladen groep 1-2, alfabet activiteiten groep 1-2, alfabet leerbladen 5\u20136 jaar, alfabet gratis groep 1-2, alfabet PDF groep 1-2, alfabet rekenen',
    snippetAnswer: 'Alfabet-oefeningen voor groep 1-2 (5\u20136 jaar) bouwen voort op de kleuterkennis door alle 52 lettervormen te leren herkennen, klanken te koppelen en op gelinieerd papier te schrijven. Woordpuzzels, kruiswoorden en schrijfoefeningen bereiden kinderen voor op het formele leesonderwijs in groep 3. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 verschuift het alfabet van een verkennend thema naar een systematisch leerdoel: vijf- en zesjarigen worden verwacht alle 52 lettervormen te beheersen, klanken te koppelen aan letters en de fijne motoriek te ontwikkelen om op gelinieerd papier te schrijven. Dit is de gevoelige periode waarin kinderen de cognitieve sprong maken van letterherkenning naar fonemisch bewustzijn \u2014 ze beginnen te begrijpen dat woorden zijn opgebouwd uit afzonderlijke klanken die door letters worden weergegeven. De Kerndoelen en SLO-leerlijnen voor taal benadrukken dat deze klank-letterkoppeling het fundament is waarop al het latere leesonderwijs in groep 3 rust. Werkbladen op dit niveau bieden gerichte oefening met overtrekken, zelfstandig schrijven, woordopbouw en letterherkenning in meerdere contexten, waardoor automatisering wordt opgebouwd die cognitieve ruimte vrijmaakt voor leesbegrip.',
    developmentalMilestones: [
      { milestone: 'Automatische letterherkenning (5\u20136-jarigen herkennen alle 26 hoofdletters en beginnen kleine letters te beheersen)', howWeAddress: 'Koppelactiviteiten en woordzoekpuzzels presenteren letters in wisselende contexten, zodat herkenning automatisch wordt ongeacht lettertype of positie' },
      { milestone: 'Fonemisch bewustzijn (kinderen isoleren beginklanken en beginnen woorden in klanken op te delen)', howWeAddress: 'Kruiswoordpuzzels met plaatjes vereisen dat kinderen woorden opdelen in klanken en elke klank aan een letter koppelen, waarmee de auditief-visuele brug wordt versterkt' },
      { milestone: 'Zelfstandig schrijven op gelinieerd papier (overgang van overtrekken naar uit het geheugen schrijven)', howWeAddress: 'Schrijfwerkbladen met gelinieerde vakken en richtlijnen begeleiden de overgang van overtrekken naar zelfstandige letterproductie met correcte grootte en plaatsing' },
      { milestone: 'Alfabetische volgorde beheersen (kinderen leren de vaste positie van letters in de reeks)', howWeAddress: 'Alfabettrein-activiteiten presenteren letters in volgorde met visuele ankers, waarmee de sequenti\u00eble kennis wordt opgebouwd die later woordenboekgebruik ondersteunt' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: bied overtrekwerkbladen aan met grote stippelletters en richtingspijlen, focus op de letters die persoonlijk betekenisvol zijn (naamletters, familienamen), en beperk het aantal nieuwe letters per week tot twee of drie. Voor gevorderde kinderen: introduceer woordopbouw met drieletter-woorden, daag hen uit met woordpuzzels en kruiswoordpuzzels, en laat hen korte woorden dicteren en zelfstandig schrijven.',
    parentTakeaway: 'In groep 1-2 verschuift de rol van ouders van het aanwijzen van letters naar het ondersteunen van de klank-letterkoppeling. Vraag bij het voorlezen: met welke letter begint dat woord? Laat uw kind woorden bedenken die met dezelfde klank beginnen. Oefen samen het schrijven van korte woorden op een krijtbord of in een schrift \u2014 de overstap van overtrekken naar zelfstandig schrijven is een grote stap die thuis veel baat heeft bij rustige, positieve oefenmomenten.',
    classroomIntegration: 'Het alfabetthema is de ruggengraat van het taalonderwijs in groep 1-2: elke ochtend begint met een letteractiviteit (overtrekken, koppelen of woordopbouw), de letter-van-de-week krijgt een prominente plek op de lettermuur, en woordzoek- en kruiswoordpuzzels worden ingezet bij zelfstandig werken. Schrijfwerkbladen sluiten aan bij de methode voor aanvankelijk lezen en bereiden kinderen systematisch voor op het formele leesonderwijs in groep 3, in lijn met de SLO-leerlijnen voor taal.',
    assessmentRubric: [
      { skill: 'Letterherkenning (alle vormen)', emerging: 'herkent 15\u201320 hoofdletters maar verwisselt regelmatig b/d en p/q', proficient: 'herkent alle 26 hoofdletters en 20+ kleine letters zonder aarzeling', advanced: 'herkent alle 52 lettervormen automatisch in elk lettertype en elke context' },
      { skill: 'Klank-letterkoppeling', emerging: 'koppelt 8\u201312 letters aan hun klank met enige hulp', proficient: 'produceert zelfstandig de primaire klank voor 20+ letters', advanced: 'koppelt alle 26 letters aan hun klank en herkent alternatieve klanken (c als s/k)' },
      { skill: 'Zelfstandig schrijven', emerging: 'schrijft 10\u201315 letters herkenbaar maar met inconsistente grootte en plaatsing', proficient: 'schrijft alle letters leesbaar op gelinieerd papier met correcte vorming', advanced: 'schrijft vloeiend met consistente grootte, spati\u00ebring en vorming en begint korte woorden te schrijven' },
    ],
  },

  animals: {
    seoTitle: 'Dieren-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare dieren-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dieren groep 1-2, dieren oefeningen 5\u20136 jaar, dieren oefeningen groep 1-2, dieren uitprintbaar groep 1-2, dieren werkbladen groep 1-2, dieren activiteiten groep 1-2, dieren leerbladen 5\u20136 jaar, dieren gratis groep 1-2, dieren PDF groep 1-2, dieren rekenen',
    snippetAnswer: 'Dieren-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken dierenfascinatie als motor voor tellen tot 20, optellen en aftrekken tot 10, beginlezen en schrijfoefeningen. Sorteeractiviteiten met diergroepen bouwen classificatievaardigheden op. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 transformeert het dierenthema van een emotioneel aansprekend kleuterthema naar een rijk leerplatform dat rekenen, taal en natuuronderwijs verbindt. Vijf- en zesjarigen hebben de cognitieve rijpheid om dieren op meerdere kenmerken tegelijk te classificeren (zoogdier/vogel/vis, leefomgeving, voeding) en deze classificatievaardigheden sluiten direct aan bij de SLO-leerlijnen voor rekenen (sorteren en ordenen) en natuur en techniek (kenmerken van levende wezens). Het tellen van dieren breidt uit van \u00e9\u00e9n-op-\u00e9\u00e9n-correspondentie naar optellen en aftrekken tot 10: vijf vogels in een boom plus drie vogels erbij is acht vogels. Tegelijkertijd bieden dierennamen uitstekend materiaal voor beginlezen \u2014 korte woorden als kat, vis en hond zijn ideaal voor het oefenen van klank-letterkoppeling en woordopbouw.',
    developmentalMilestones: [
      { milestone: 'Classificatie op meerdere kenmerken (5\u20136-jarigen sorteren op twee of meer eigenschappen tegelijk)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen dieren classificeren op leefomgeving \u00e9n lichaamsbedekking bouwen meervoudig classificatievermogen op' },
      { milestone: 'Optellen en aftrekken tot 10 (overgang van tellen naar rekenen)', howWeAddress: 'Beeldoptel-werkbladen met dierengroepen visualiseren optelling en aftrekking in een betekenisvolle context' },
      { milestone: 'Beginlezen met korte woorden (kinderen decoderen eenvoudige dierennamen)', howWeAddress: 'Woordpuzzel- en kruiswoordactiviteiten met dierennamen (kat, vis, hond, eend) oefenen klank-letterkoppeling en woordherkenning' },
      { milestone: 'Informatieve tekst begrijpen (kinderen luisteren naar en verwerken feitelijke informatie)', howWeAddress: 'Koppelactiviteiten met dierenfeitjes (hoeveel poten, wat eten ze) bouwen het vermogen op om feitelijke informatie te verwerken en onthouden' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk classificatie tot \u00e9\u00e9n kenmerk tegelijk, gebruik optelling met concrete materialen (plastic dieren) naast het werkblad, en bied woordkaarten met afbeeldingen als steun bij leesactiviteiten. Voor gevorderde kinderen: introduceer optelling boven de 10, laat dierennamen schrijven zonder voorbeeld, en daag hen uit met dierenkruiswoorden die langere woorden bevatten.',
    parentTakeaway: 'In groep 1-2 kunt u dierenactiviteiten uitbreiden naar echte rekensommen: hoeveel poten heeft een hond? En twee honden samen? Bezoek een kinderboerderij en laat uw kind tellen, sorteren en notities maken. Lees samen informatieve dierenboeken en bespreek de feiten \u2014 dit bouwt zowel leesvaardigheid als kennis van de wereld op. Na een dierenwerkblad kunt u uw kind vragen om een eigen dierenquiz te bedenken.',
    classroomIntegration: 'Het dierenthema integreert in groep 1-2 vakoverstijgend: bij rekenen worden dieren gebruikt voor optellen en aftrekken, bij taal voor beginlezen en woordopbouw, bij natuur voor classificatie en leefomgevingen. Een dierenproject over meerdere weken biedt kansen voor werkbladen, excursies naar een kinderboerderij, boekhoekactiviteiten en presentaties. Dit sluit aan bij de SLO-doelen voor zowel rekenen als natuur en techniek.',
    assessmentRubric: [
      { skill: 'Classificatie van dieren', emerging: 'sorteert dieren op \u00e9\u00e9n kenmerk (bijv. groot/klein) met hulp', proficient: 'sorteert zelfstandig op twee kenmerken (leefomgeving \u00e9n lichaamsbedekking) en benoemt de groepen', advanced: 'classificeert dieren op drie kenmerken, bedenkt eigen criteria en legt de redenering uit' },
      { skill: 'Optellen met dierencontext', emerging: 'telt twee groepjes dieren apart maar combineert nog niet zelfstandig', proficient: 'voert optellingen tot 10 uit met dierenbeelden en noteert de som', advanced: 'rekent boven de 10, lost aftrekopgaven op en formuleert eigen dierensommen' },
      { skill: 'Dierennamen lezen en schrijven', emerging: 'herkent 2\u20133 geschreven dierennamen met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 6\u20138 korte dierennamen', advanced: 'leest langere dierennamen, schrijft ze correct en gebruikt ze in zinnen' },
    ],
  },

  birds: {
    seoTitle: 'Vogels-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare vogels-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vogels groep 1-2, vogels oefeningen 5\u20136 jaar, vogels oefeningen groep 1-2, vogels uitprintbaar groep 1-2, vogels werkbladen groep 1-2, vogels activiteiten groep 1-2, vogels leerbladen 5\u20136 jaar, vogels gratis groep 1-2, vogels PDF groep 1-2, vogels rekenen',
    snippetAnswer: 'Vogels-oefeningen voor groep 1-2 (5\u20136 jaar) combineren vogelobservatie met tellen tot 20, optellen, beginlezen van vogelnamen en schrijfoefeningen. Classificatie op kenmerken als snavelvorm en verenkleed bouwt wetenschappelijk denken op. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het vogelthema een brug tussen dagelijkse waarneming en gestructureerd leren: vijf- en zesjarigen kunnen vogelsoorten herkennen, kenmerken vergelijken en eenvoudige natuurwetenschappelijke classificaties uitvoeren. De SLO-leerlijnen voor natuur en techniek benadrukken het systematisch waarnemen en beschrijven van levende wezens, en vogels zijn hiervoor ideaal omdat ze zichtbaar, divers en seizoensgebonden zijn. Rekenkundig biedt het vogelthema rijke contexten: optellen (drie mussen plus twee mussen), vergelijken (meer koolmezen dan roodborstjes) en meten (een zwaan is groter dan een mus). Tegelijkertijd zijn korte vogelnamen als mus, eend en uil uitstekend materiaal voor beginlezen en klank-letterkoppeling.',
    developmentalMilestones: [
      { milestone: 'Systematisch waarnemen (5\u20136-jarigen leren gericht kijken en beschrijven wat ze zien)', howWeAddress: 'Observatiewerkbladen met vogelkenmerken (snavelvorm, pootlengte, verenkleur) begeleiden kinderen in het systematisch beschrijven van wat ze waarnemen' },
      { milestone: 'Optellen en vergelijken (kinderen werken met hoeveelheden tot 20)', howWeAddress: 'Rekenactiviteiten met vogeltellingen (hoeveel vogels op het hek plus hoeveel in de boom) visualiseren optelling in een herkenbare context' },
      { milestone: 'Beginlezen van korte woorden (kinderen decoderen eenvoudige vogelnamen)', howWeAddress: 'Woordpuzzels en woordzoekactiviteiten met vogelnamen (mus, eend, uil, duif) oefenen klank-letterkoppeling met bekende woorden' },
      { milestone: 'Seizoensbewustzijn (kinderen begrijpen dat de natuur verandert door het jaar)', howWeAddress: 'Seizoensactiviteiten met trekvogels en standvogels bouwen het begrip op dat sommige vogels verhuizen en andere blijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vijf herkenbare vogelsoorten, gebruik vogelplaatjes als steun bij rekenactiviteiten, en bied woordkaarten met afbeeldingen voor leesactiviteiten. Voor gevorderde kinderen: introduceer vogelsoorten met langere namen, voeg optelling boven de 10 toe, en laat hen een vogelobservatiedagboek bijhouden met tekeningen en korte notities.',
    parentTakeaway: 'Groep 1-2 is het perfecte moment om samen vogels te gaan tellen \u2014 de jaarlijkse tuinvogeltelling is een uitstekende aanleiding. Hang een voederhuisje op en laat uw kind turven hoeveel vogels er per soort komen. Na een vogelwerkblad kunt u samen een vogelgids bekijken en de vogels opzoeken die uw kind op het werkblad heeft gezien. Het optellen van vogeltellingen en het schrijven van vogelnamen verbindt schoolwerk direct met de echte wereld.',
    classroomIntegration: 'Het vogelthema leent zich uitstekend voor een vakoverstijgend project in groep 1-2: bij rekenen worden vogels geteld en opgeteld, bij taal worden vogelnamen gelezen en geschreven, bij natuur worden vogelkenmerken bestudeerd, en bij beeldende vorming worden vogels getekend en gekleurd. Een vogelobservatieproject op het schoolplein, met werkbladen als registratiemiddel, sluit aan bij de SLO-doelen voor zowel natuur en techniek als rekenen.',
    assessmentRubric: [
      { skill: 'Vogelherkenning en beschrijving', emerging: 'herkent 2\u20133 vogelsoorten en beschrijft \u00e9\u00e9n kenmerk met hulp', proficient: 'herkent zelfstandig 5\u20137 soorten en beschrijft twee of meer kenmerken per soort', advanced: 'herkent 10+ soorten, vergelijkt systematisch en classificeert op eigen criteria' },
      { skill: 'Optellen in vogelcontext', emerging: 'telt twee groepjes vogels apart maar combineert nog niet zelfstandig', proficient: 'voert optellingen tot 10 uit met vogelbeelden en noteert de som correct', advanced: 'rekent tot 20, vergelijkt hoeveelheden en formuleert eigen vogelrekensommen' },
      { skill: 'Vogelnamen lezen en schrijven', emerging: 'herkent 1\u20132 geschreven vogelnamen met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 4\u20136 korte vogelnamen op gelinieerd papier', advanced: 'leest langere vogelnamen, schrijft ze correct en gebruikt ze in zinnen over vogelobservaties' },
    ],
  },

  birthday: {
    seoTitle: 'Verjaardag-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare verjaardag-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'verjaardag groep 1-2, verjaardag oefeningen 5\u20136 jaar, verjaardag oefeningen groep 1-2, verjaardag uitprintbaar groep 1-2, verjaardag werkbladen groep 1-2, verjaardag activiteiten groep 1-2, verjaardag leerbladen 5\u20136 jaar, verjaardag gratis groep 1-2, verjaardag PDF groep 1-2, verjaardag rekenen',
    snippetAnswer: 'Verjaardag-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken taarten, ballonnen en cadeautjes als context voor optellen tot 10, tellen tot 20, patroonherkenning en beginlezen. De emotionele band met verjaardagen maakt rekenen persoonlijk en betekenisvol. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 krijgt het verjaardagsthema een rekendimensie die verder gaat dan tellen: vijf- en zesjarigen zijn klaar voor echte optelopdrachten (drie cadeautjes plus vier cadeautjes), vergelijken van hoeveelheden (wie heeft meer ballonnen?) en het werken met patronen in slingers en versiering. De emotionele betrokkenheid bij verjaardagen blijft de krachtigste motivator, maar de cognitieve eisen stijgen. De SLO-leerlijnen voor rekenen benadrukken het belang van getalbegrip in betekenisvolle contexten, en verjaardagen bieden die context als geen ander: een kind dat berekent hoeveel traktaties het nodig heeft voor de hele klas, lost een authentiek wiskundeprobleem op. Tegelijkertijd biedt het thema kansen voor beginlezen en schrijven \u2014 verjaardagskaarten schrijven combineert fijne motoriek met functionele geletterdheid.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 10 (5\u20136-jarigen maken de sprong van tellen naar rekenen)', howWeAddress: 'Optelopdrachten met cadeautjes en ballonnen visualiseren de rekenbewerkingen in een feestelijke context die kinderen intrinsiek motiveert' },
      { milestone: 'Vergelijken van hoeveelheden (kinderen bepalen meer, minder of evenveel)', howWeAddress: 'Vergelijkingsactiviteiten met verjaardagstaarten en traktaties oefenen het begrip van meer, minder en evenveel' },
      { milestone: 'Complexere patronen herkennen en voortzetten (AABB, ABC)', howWeAddress: 'Slingerpatroon-activiteiten breiden uit van AB naar AABB en ABC, waarmee het patroonbegrip systematisch wordt opgebouwd' },
      { milestone: 'Functioneel schrijven (kinderen schrijven met een doel: kaarten, lijstjes)', howWeAddress: 'Verjaardagskaart-activiteiten combineren schrijfoefening met een authentiek doel dat kinderen motiveert om zorgvuldig te schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk optelling tot sommen onder de 5, gebruik concrete materialen (blokjes als cadeautjes) naast het werkblad, en bied schrijfactiviteiten aan met overtrekletters. Voor gevorderde kinderen: introduceer aftrekking, sommen tot 20 met verjaardagscontext, en laat hen zelfstandig een verjaardagsuitnodiging schrijven met datum, tijd en adres.',
    parentTakeaway: 'De verjaardag van uw kind is een gouden leermogelijkheid in groep 1-2. Laat uw kind berekenen hoeveel traktaties het moet meenemen (optellen), hoeveel kaarsjes op de taart moeten (getalbegrip), en een uitnodigingslijst maken (schrijven). Na een verjaardagswerkblad kunt u samen een verjaardagskalender bijhouden voor de klas \u2014 wanneer is de volgende verjaardag? Hoeveel dagen nog? Dit maakt rekenen persoonlijk en betekenisvol.',
    classroomIntegration: 'Het verjaardagsthema loopt het hele jaar door in groep 1-2: elke kinderenverjaardag is een rekenles (hoeveel jaar, hoeveel traktaties, hoeveel kinderen), de verjaardagskalender biedt dagelijks oefenmateriaal voor tijdsbegrip, en verjaardagswerkbladen worden ingezet bij zelfstandig rekenen en taalactiviteiten. Verjaardagskaarten schrijven combineert taal- en rekendoelen met sociaal-emotionele ontwikkeling, in lijn met de SLO-leerlijnen.',
    assessmentRubric: [
      { skill: 'Optellen tot 10 (verjaardagscontext)', emerging: 'telt twee groepjes cadeautjes apart maar combineert niet zelfstandig', proficient: 'voert zelfstandig optellingen tot 10 uit en noteert de som correct', advanced: 'rekent vlot tot 20, lost aftrekopgaven op en formuleert eigen verjaardagssommen' },
      { skill: 'Patroonherkenning en -voortzetting', emerging: 'herkent een AB-patroon in slingers met hulp', proficient: 'zet zelfstandig AB-, ABB- en ABC-patronen voort en benoemt de regel', advanced: 'cre\u00ebert eigen complexe patronen en past ze toe op nieuwe materialen' },
      { skill: 'Functioneel schrijven', emerging: 'schrijft de eigen naam op een kaart met hulp', proficient: 'schrijft zelfstandig korte boodschappen op verjaardagskaarten', advanced: 'schrijft volledige zinnen op kaarten met correcte lettervorming en spati\u00ebring' },
    ],
  },

  body: {
    seoTitle: 'Lichaam-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare lichaam-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'lichaam groep 1-2, lichaam oefeningen 5\u20136 jaar, lichaam oefeningen groep 1-2, lichaam uitprintbaar groep 1-2, lichaam werkbladen groep 1-2, lichaam activiteiten groep 1-2, lichaam leerbladen 5\u20136 jaar, lichaam gratis groep 1-2, lichaam PDF groep 1-2, lichaam rekenen',
    snippetAnswer: 'Lichaam-oefeningen voor groep 1-2 (5\u20136 jaar) combineren het benoemen van lichaamsdelen met tellen (hoeveel vingers?), optellen, schrijven van lichaamsdeel-woorden en links/rechts-ori\u00ebntatie. Het eigen lichaam als leermateriaal maakt abstracte concepten concreet. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het lichaamsthema een veelzijdig leerplatform dat rekenen, taal, ori\u00ebntatie en gezondheid verbindt. Vijf- en zesjarigen zijn klaar om verder te gaan dan het benoemen van basisdelen: ze leren gedetailleerdere lichaamsdelen kennen (elleboog, enkel, pols), ontwikkelen links/rechts-begrip, en beginnen te begrijpen hoe lichaamsdelen samenwerken voor beweging en zintuiglijke waarneming. De SLO-leerlijnen voor mens en samenleving benadrukken gezondheid en lichaamsbesef, terwijl de rekenleerlijnen meten en ori\u00ebntatie als doel stellen. Het lichaamsthema vervult beide: tien vingers tellen is rekenen, links/rechts onderscheiden is ruimtelijke ori\u00ebntatie, en lichaamsdeel-woorden schrijven is functionele geletterdheid.',
    developmentalMilestones: [
      { milestone: 'Links/rechts-ori\u00ebntatie (5\u20136-jarigen beginnen links en rechts te onderscheiden aan het eigen lichaam)', howWeAddress: 'Ori\u00ebntatie-werkbladen waarbij kinderen links en rechts markeren op lichaamstekeningen bouwen ruimtelijk bewustzijn op' },
      { milestone: 'Gedetailleerd lichaamsbesef (kinderen leren meer lichaamsdelen en hun functies)', howWeAddress: 'Labelactiviteiten met uitgebreide lichaamsdelen (elleboog, knie, pols, enkel) breiden het vocabulaire en het lichaamsbesef uit' },
      { milestone: 'Tellen en optellen met lichaamsparen (vingers, tenen)', howWeAddress: 'Rekenactiviteiten met vingers als telmateriaal bouwen getalbegrip op via het meest concrete referentiekader dat er bestaat' },
      { milestone: 'Tekenen van gedetailleerde menselijke figuren (romp, gewrichten, kleding)', howWeAddress: 'Teken-en-label activiteiten begeleiden kinderen in het tekenen van steeds gedetailleerdere menselijke figuren met gewrichten en gezichtskenmerken' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot tien hoofdlichaamsdelen, gebruik een spiegel als hulpmiddel, en bied overtrekwoorden aan voor lichaamsdeelnamen. Voor gevorderde kinderen: introduceer de vijf zintuigen en bijbehorende lichaamsdelen, laat hen lichaamsdeel-woorden zelfstandig schrijven, en daag hen uit met optelopdrachten die lichaamsparen combineren (twee handen met vijf vingers elk).',
    parentTakeaway: 'Het eigen lichaam is het beste rekenmateriaal voor groep 1-2. Gebruik vingers voor optellen en aftrekken \u2014 kinderen die goed met hun vingers rekenen, bouwen een sterk getalbegrip op. Benoem samen lichaamsdelen tijdens het aankleden en oefen links/rechts bij het schoenen aantrekken. Na een lichaamswerkblad kunt u samen een levensgrote lichaamstekening maken op een groot vel papier, met labels voor alle lichaamsdelen \u2014 dit combineert schrijven, tekenen en lichaamsbesef.',
    classroomIntegration: 'Het lichaamsthema integreert in groep 1-2 met bewegingsonderwijs (lichaamsdelen benoemen tijdens gym), rekenen (tellen en optellen met lichaamsdelen), taal (lichaamsdeel-woorden lezen en schrijven) en natuur (zintuigen en gezondheid). Een lichaamsproject over twee weken biedt kansen voor werkbladen, bewegingsactiviteiten, een levensgrote tekening en een presentatie over de vijf zintuigen, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Benoemen van lichaamsdelen', emerging: 'benoemt 6\u20138 basis-lichaamsdelen met hulp', proficient: 'benoemt zelfstandig 15+ lichaamsdelen inclusief gewrichten en organen', advanced: 'benoemt 20+ lichaamsdelen, beschrijft functies en gebruikt links/rechts correct' },
      { skill: 'Rekenen met lichaamsparen', emerging: 'telt vingers en tenen maar combineert nog niet in sommen', proficient: 'rekent optelling tot 10 met vingers als hulpmiddel en noteert de som', advanced: 'rekent tot 20, combineert vingers van twee handen vlot en formuleert eigen sommen' },
      { skill: 'Lichaamsdeel-woorden schrijven', emerging: 'schrijft 2\u20133 lichaamsdeel-woorden met hulp van woordkaarten', proficient: 'schrijft zelfstandig 6\u20138 korte lichaamsdeel-woorden op gelinieerd papier', advanced: 'schrijft langere woorden correct en labelt een lichaamstekening zelfstandig' },
    ],
  },

  camping: {
    seoTitle: 'Kamperen-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kamperen-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kamperen groep 1-2, kamperen oefeningen 5\u20136 jaar, kamperen oefeningen groep 1-2, kamperen uitprintbaar groep 1-2, kamperen werkbladen groep 1-2, kamperen activiteiten groep 1-2, kamperen leerbladen 5\u20136 jaar, kamperen gratis groep 1-2, kamperen PDF groep 1-2, kamperen rekenen',
    snippetAnswer: 'Kamperen-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken tenten, kampvuren en sterren als context voor optellen tot 10, tellen tot 20, woordherkenning en schrijfoefeningen. Het avontuurlijke thema stimuleert verbeelding en probleemoplossend denken. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het kamperen-thema een context voor probleemoplossend denken: vijf- en zesjarigen kunnen nadenken over wat je nodig hebt voor een kampeertrip, hoeveel van elk item je moet meenemen, en hoe je een kampeerlijst organiseert. De SLO-leerlijnen voor rekenen benadrukken het oplossen van praktische problemen, en kamperen biedt die problemen als vanzelf: hoeveel marshmallows als er zes kinderen zijn en ieder er twee krijgt? Tegelijkertijd stimuleert het thema functioneel schrijven (kampeerlijst maken), beginlezen (kampeerwoorden herkennen) en ruimtelijk denken (kaartlezen, orientatie). De verbeeldingskracht die kleuters al aansprak, wordt nu gecombineerd met logisch en planmatig denken.',
    developmentalMilestones: [
      { milestone: 'Probleemoplossend denken (5\u20136-jarigen leren plannen en anticiperen op behoeften)', howWeAddress: 'Kampeerlijst-activiteiten waarbij kinderen berekenen hoeveel items ze nodig hebben combineren rekenen met logisch denken' },
      { milestone: 'Optellen en verdelen (kinderen werken met eenvoudige verdeelsituaties)', howWeAddress: 'Verdeelactiviteiten met kampeervoedsel (6 marshmallows verdelen over 3 kinderen) bouwen het begrip van eerlijk delen op' },
      { milestone: 'Functioneel schrijven (kinderen schrijven met een praktisch doel)', howWeAddress: 'Kampeerlijst- en briefschrijf-activiteiten geven schrijfoefening een authentiek doel dat kinderen motiveert' },
      { milestone: 'Ruimtelijke ori\u00ebntatie (kinderen leren eenvoudige routes en richtingen)', howWeAddress: 'Eenvoudige plattegrond-activiteiten van een kampeerterrein oefenen ruimtelijk denken en richtingsbegrippen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk optelopdrachten tot onder de 5, gebruik concrete kampeerattributen als telmateriaal, en bied schrijfactiviteiten aan met overtrekwoorden. Voor gevorderde kinderen: introduceer eenvoudige vermenigvuldiging via verdeling, laat hen een kampeerplanning schrijven met dagen en activiteiten, en daag hen uit met kaartlees-activiteiten.',
    parentTakeaway: 'Kamperen \u2014 of het nu in de tuin is of op een echte camping \u2014 biedt rekenkansen die kinderen in groep 1-2 enthousiast maken. Laat uw kind helpen bij het plannen: hoeveel borden nodig? Hoeveel nachten slapen we? Maak samen een kampeerlijst en laat uw kind de items opschrijven en turven. Na een kampeerwerkblad kunt u samen een plattegrond tekenen van uw kampeerterrein \u2014 dit combineert ruimtelijk denken met creatieve expressie.',
    classroomIntegration: 'Het kamperen-thema werkt in groep 1-2 als een rijke themaweek: bij rekenen worden kampeerbenodigdheden geteld en opgeteld, bij taal worden kampeerwoorden gelezen en kampeerlijsten geschreven, bij natuur worden bos- en nachtdieren besproken, en in de bouwhoek wordt een kampeerterrein nagebouwd. Een kampeerhoek in de klas stimuleert rollenspel waarin kinderen rekenen, plannen en schrijven toepassen, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Optellen in kampeercontext', emerging: 'telt kampeervoorwerpen maar voert nog geen optellingen zelfstandig uit', proficient: 'rekent optellingen tot 10 met kampeerbeelden en noteert de som', advanced: 'rekent tot 20, lost verdeelproblemen op en formuleert eigen kampeersommen' },
      { skill: 'Functioneel schrijven (kampeerlijst)', emerging: 'tekent kampeervoorwerpen en schrijft 1\u20132 woorden met hulp', proficient: 'schrijft zelfstandig een kampeerlijst met 5\u20136 items in herkenbare woorden', advanced: 'schrijft een georganiseerde lijst met categorie\u00ebn en volledige woorden' },
      { skill: 'Probleemoplossend denken', emerging: 'beantwoordt eenvoudige hoeveel-vragen met hulp', proficient: 'lost zelfstandig eenvoudige verdeelproblemen op en legt de oplossing uit', advanced: 'bedenkt eigen kampeerproblemen, stelt de som op en lost deze op' },
    ],
  },

  circus: {
    seoTitle: 'Circus-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare circus-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'circus groep 1-2, circus oefeningen 5\u20136 jaar, circus oefeningen groep 1-2, circus uitprintbaar groep 1-2, circus werkbladen groep 1-2, circus activiteiten groep 1-2, circus leerbladen 5\u20136 jaar, circus gratis groep 1-2, circus PDF groep 1-2, circus rekenen',
    snippetAnswer: 'Circus-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken clowns, acrobaten en jongleurs als context voor optellen tot 10, patroonherkenning, symmetrie en beginlezen. De spectaculaire circuswereld maakt abstracte rekenconcepten visueel en tastbaar. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 biedt het circusthema een visueel rijk platform voor wiskundige concepten die verder gaan dan basisgetallen: vijf- en zesjarigen ontdekken symmetrie in circustenten en clownsgezichten, herkennen complexere patronen in slingers en kostuums, en lossen optelopdrachten op met circusvoorwerpen. De SLO-leerlijnen voor rekenen benadrukken meetkunde en patronen naast getalbegrip, en het circus biedt dit alles in \u00e9\u00e9n kleurrijk geheel. Tegelijkertijd stimuleert het thema creatief schrijven (een circusverhaaltje), woordherkenning (circuswoorden lezen) en expressieve vaardigheden. De betovering van het circus houdt kinderen gemotiveerd bij taken die anders als abstract worden ervaren.',
    developmentalMilestones: [
      { milestone: 'Symmetrie herkennen (5\u20136-jarigen beginnen symmetrie in vormen en afbeeldingen te zien)', howWeAddress: 'Symmetrie-activiteiten met circustenten en clownsgezichten laten kinderen de spiegellijn ontdekken en symmetrische figuren completeren' },
      { milestone: 'Complexere patroonherkenning (kinderen werken met AABB- en ABC-patronen)', howWeAddress: 'Circusslinger-activiteiten met drie of vier elementen bouwen het patroonbegrip uit van eenvoudig naar complex' },
      { milestone: 'Optellen tot 10 met groepjes (kinderen combineren twee groepen tot een totaal)', howWeAddress: 'Jonglerenballen- en circusdieren-optelopdrachten visualiseren de rekenbewerking in een motiverende context' },
      { milestone: 'Verhalend schrijven (kinderen vertellen en schrijven korte verhaaltjes)', howWeAddress: 'Circusverhaal-activiteiten waarin kinderen een circusact beschrijven combineren schrijfoefening met creatieve expressie' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk patronen tot AB, houd optelopdrachten onder de 5, en bied schrijfactiviteiten aan met zinsopeners en woordkaarten. Voor gevorderde kinderen: introduceer spiegelsymmetrie-tekeningen, sommen tot 20 met circuscontext, en laat hen een eigen circusprogramma schrijven met acts en beschrijvingen.',
    parentTakeaway: 'Het circus biedt in groep 1-2 onverwachte rekenkansen. Vraag uw kind: als een clown met vier ballen jongleert en er twee bijpakt, hoeveel heeft hij dan? Zoek samen symmetrie in plaatjes van circustenten en clowns. Na een circuswerkblad kunt u samen een circusprogramma maken waarbij uw kind de acts opschrijft en telt hoeveel artiesten er optreden \u2014 rekenen en schrijven in \u00e9\u00e9n feestelijke activiteit.',
    classroomIntegration: 'Het circusthema is in groep 1-2 ideaal voor een projectweek: bij rekenen worden circusvoorwerpen opgeteld en patronen gemaakt, bij taal worden circusverhalen geschreven en circuswoorden gelezen, bij gym worden balanceer- en jongleractiviteiten gedaan, en bij beeldende vorming worden circusmaskers en -slingers gemaakt. Een eigen circusvoorstelling als afsluiting integreert alle leergebieden, in lijn met de SLO-doelen voor creatieve en rekenvaardigheid.',
    assessmentRubric: [
      { skill: 'Symmetrie herkennen', emerging: 'herkent symmetrie in eenvoudige vormen (cirkel, vierkant) met hulp', proficient: 'vindt zelfstandig de spiegellijn in circusafbeeldingen en voltooit symmetrische tekeningen', advanced: 'herkent symmetrie in complexe figuren, tekent spiegelbeelden en legt het concept uit' },
      { skill: 'Patroonherkenning (circuscontext)', emerging: 'zet een AB-patroon voort met hulp', proficient: 'zet zelfstandig AABB- en ABC-patronen voort en benoemt de patroonregel', advanced: 'ontwerpt eigen complexe patronen met vier elementen en past ze toe op nieuwe materialen' },
      { skill: 'Optellen met circusvoorwerpen', emerging: 'telt groepjes circusvoorwerpen apart maar combineert niet zelfstandig', proficient: 'voert optellingen tot 10 vlot uit met circusbeelden', advanced: 'rekent tot 20, lost aftrekopgaven op en formuleert eigen circussommen' },
    ],
  },

  clothing: {
    seoTitle: 'Kleding-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kleding-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kleding groep 1-2, kleding oefeningen 5\u20136 jaar, kleding oefeningen groep 1-2, kleding uitprintbaar groep 1-2, kleding werkbladen groep 1-2, kleding activiteiten groep 1-2, kleding leerbladen 5\u20136 jaar, kleding gratis groep 1-2, kleding PDF groep 1-2, kleding rekenen',
    snippetAnswer: 'Kleding-oefeningen voor groep 1-2 (5\u20136 jaar) combineren kledingsortering met optellen, vergelijken van hoeveelheden, kledingwoorden lezen en schrijfoefeningen. Seizoensgebonden kledingkeuzes bouwen logisch denken en zelfredzaamheid op. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het kledingthema een platform voor logisch redeneren en meervoudige classificatie: vijf- en zesjarigen leren kleding sorteren op seizoen, weer, gelegenheid en materiaal tegelijkertijd. De SLO-leerlijnen benadrukken zelfredzaamheid en wereldori\u00ebntatie, en kledingkeuzes zijn een dagelijks oefenmoment voor beide. Rekenkundig biedt kleding rijke contexten: optellen (drie broeken plus twee broeken), vergelijken (meer sokken dan schoenen), en eenvoudige prijsberekeningen. Taalkundig zijn kledingwoorden ideaal voor beginlezen \u2014 korte woorden als jas, rok, pet en sok zijn uitstekend decodeermateriaal. Het functionele karakter van het thema maakt leren direct toepasbaar in het dagelijks leven.',
    developmentalMilestones: [
      { milestone: 'Meervoudige classificatie (5\u20136-jarigen sorteren op twee of meer criteria tegelijk)', howWeAddress: 'Sorteeractiviteiten waarbij kleding wordt geordend op seizoen \u00e9n type bouwen het vermogen op om meerdere kenmerken tegelijk te hanteren' },
      { milestone: 'Optellen en vergelijken van hoeveelheden', howWeAddress: 'Rekenactiviteiten met kledingkasten (hoeveel shirts plus hoeveel broeken) oefenen optelling in een herkenbare context' },
      { milestone: 'Beginlezen van korte kledingwoorden', howWeAddress: 'Woordpuzzel- en labelactiviteiten met kledingwoorden (jas, rok, pet) oefenen klank-letterkoppeling met functioneel vocabulaire' },
      { milestone: 'Logisch redeneren (als het regent, dan heb ik nodig...)', howWeAddress: 'Als-dan-activiteiten met weer en kleding bouwen het causale denken op dat logisch redeneren ondersteunt' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk classificatie tot twee categorie\u00ebn (winter/zomer), gebruik echte kledingstukken als aanvulling, en bied woordkaarten met afbeeldingen bij leesactiviteiten. Voor gevorderde kinderen: introduceer meervoudige classificatie met drie criteria, laat hen kledingwoorden schrijven zonder voorbeeld, en voeg eenvoudige prijsberekeningen toe (hoeveel kost een broek en een shirt samen?).',
    parentTakeaway: 'Aankleden is in groep 1-2 een dagelijkse rekenles. Laat uw kind zelf kiezen en beargumenteren waarom: het regent, dus ik heb een regenjas nodig. Tel samen de sokken bij het opvouwen van de was en oefen paren maken. Na een kledingwerkblad kunt u samen de seizoenskleding sorteren en tellen \u2014 hoeveel winterjassen hebben we? En hoeveel zomershirts? Dit combineert rekenen, logisch denken en zelfredzaamheid.',
    classroomIntegration: 'Het kledingthema integreert in groep 1-2 met de dagelijkse routine: bij binnenkomst worden kledingkeuzes besproken (past bij het weer?), bij rekenen worden kledingstukken geteld en opgeteld, bij taal worden kledingwoorden gelezen en geschreven, en bij wereldori\u00ebntatie wordt seizoenskleding bestudeerd. Een verkleedhoek in de klas biedt kansen voor rollenspel waarin classificatie en taal samenkomen, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Kledingclassificatie', emerging: 'sorteert kleding in twee groepen (bijv. winter/zomer) met hulp', proficient: 'sorteert zelfstandig op twee criteria (seizoen \u00e9n type) en benoemt de groepen', advanced: 'classificeert op drie criteria, bedenkt eigen sorteersystemen en legt de logica uit' },
      { skill: 'Optellen met kledingcontext', emerging: 'telt kledingstukken maar voert nog geen optellingen zelfstandig uit', proficient: 'voert optellingen tot 10 uit met kledingbeelden en noteert de som', advanced: 'rekent tot 20, vergelijkt hoeveelheden en lost eenvoudige verdeelproblemen op' },
      { skill: 'Kledingwoorden lezen en schrijven', emerging: 'herkent 2\u20133 kledingwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte kledingwoorden', advanced: 'leest en schrijft langere kledingwoorden en gebruikt ze in beschrijvende zinnen' },
    ],
  },

  colors: {
    seoTitle: 'Kleuren-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kleuren-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kleuren groep 1-2, kleuren oefeningen 5\u20136 jaar, kleuren oefeningen groep 1-2, kleuren uitprintbaar groep 1-2, kleuren werkbladen groep 1-2, kleuren activiteiten groep 1-2, kleuren leerbladen 5\u20136 jaar, kleuren gratis groep 1-2, kleuren PDF groep 1-2, kleuren rekenen',
    snippetAnswer: 'Kleuren-oefeningen voor groep 1-2 (5\u20136 jaar) breiden kleurkennis uit naar kleurmenging, tellen en optellen per kleur, kleurwoorden lezen en schrijven, en het gebruik van kleur als classificatiekenmerk. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 evolueert het kleurenthema van basisherkenning naar conceptueel begrip: vijf- en zesjarigen leren dat kleuren kunnen worden gemengd (rood plus geel wordt oranje), dat kleuren warme en koude families vormen, en dat kleur een krachtig classificatiekenmerk is in rekenen en wetenschap. De SLO-leerlijnen voor kunstzinnige ori\u00ebntatie benadrukken kleurgebruik als expressief middel, terwijl de rekenleerlijnen classificatie als basisvaardigheid benoemen. Het kleurenthema verbindt beide: het sorteren van voorwerpen op kleur is tegelijkertijd een reken- en een creatieve vaardigheid. Taalkundig zijn kleurwoorden uitstekend beginleesmateriaal \u2014 korte, bekende woorden als rood, blauw en geel die kinderen dagelijks gebruiken en nu leren lezen en schrijven.',
    developmentalMilestones: [
      { milestone: 'Kleurmenging begrijpen (5\u20136-jarigen ontdekken dat twee kleuren een derde maken)', howWeAddress: 'Kleurmengactiviteiten op werkbladen laten kinderen voorspellen en vastleggen welke kleur ontstaat, waarmee wetenschappelijk denken wordt gestimuleerd' },
      { milestone: 'Classificatie op kleur als rekenvaardigheid (voorwerpen sorteren en tellen per kleurgroep)', howWeAddress: 'Tel-en-sorteer activiteiten waarbij kinderen voorwerpen per kleur groeperen en de aantallen vergelijken bouwen dataverzamelingsvaardigheden op' },
      { milestone: 'Kleurwoorden lezen en schrijven (kinderen decoderen bekende kleurwoorden)', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met kleurwoorden (rood, blauw, geel, groen) oefenen beginlezen met hoog-frequente woorden' },
      { milestone: 'Kleur als expressief middel (bewuste kleurkeuze bij creatieve opdrachten)', howWeAddress: 'Creatieve kleuractiviteiten waarbij kinderen kleuren kiezen en hun keuze beargumenteren bouwen expressieve vaardigheden en metacognitie op' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot de zes basiskleuren, gebruik concrete kleurmaterialen (verf, kleurblokken) naast het werkblad, en bied woordkaarten met kleurvlakken bij leesactiviteiten. Voor gevorderde kinderen: introduceer mengkleuren en tinten, laat hen kleurwoorden zelfstandig schrijven, en daag hen uit met tabel-activiteiten waarin ze kleuren tellen en optellen.',
    parentTakeaway: 'Kleuren zijn in groep 1-2 overal en altijd beschikbaar als leermateriaal. Experimenteer samen met waterverf en ontdek kleurmenging: wat gebeurt er als je rood en blauw mengt? Sorteer snoepjes of kralen op kleur en tel hoeveel er van elke kleur zijn. Na een kleurenwerkblad kunt u samen kleurwoorden oefenen bij het boodschappen doen \u2014 pak de groene appels, hoeveel rode paprika\u2019s zien we? Dit maakt kleur tot een brug tussen rekenen, taal en de echte wereld.',
    classroomIntegration: 'Het kleurenthema is in groep 1-2 een natuurlijke verbinding tussen kunstzinnige vorming en rekenen: bij beeldende vorming wordt ge\u00ebxperimenteerd met kleurmenging, bij rekenen worden voorwerpen op kleur gesorteerd en geteld, bij taal worden kleurwoorden gelezen en geschreven, en bij natuur worden seizoenskleuren besproken. Kleurenwerkbladen dienen als dataverzamelingsoefening wanneer kinderen turven hoeveel voorwerpen van elke kleur er in de klas zijn, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Kleurkennis en -menging', emerging: 'benoemt de 6 basiskleuren maar begrijpt menging nog niet', proficient: 'benoemt 10+ kleuren en voorspelt correct welke kleur ontstaat bij menging van primaire kleuren', advanced: 'begrijpt warm/koud, licht/donker en mengt doelgericht om gewenste tinten te maken' },
      { skill: 'Classificatie en tellen op kleur', emerging: 'sorteert voorwerpen op kleur maar telt de groepen niet zelfstandig', proficient: 'sorteert, telt per groep en vergelijkt hoeveelheden zelfstandig', advanced: 'maakt kleurengrafieken, telt tot 20 per groep en trekt conclusies uit de data' },
      { skill: 'Kleurwoorden lezen en schrijven', emerging: 'herkent 2\u20133 kleurwoorden met hulp van kleurvlakken', proficient: 'leest en schrijft zelfstandig 6\u20138 kleurwoorden', advanced: 'leest en schrijft alle basiskleurnamen correct en gebruikt ze in beschrijvende zinnen' },
    ],
  },

  construction: {
    seoTitle: 'Bouw-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare bouw-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'bouw groep 1-2, bouw oefeningen 5\u20136 jaar, bouw oefeningen groep 1-2, bouw uitprintbaar groep 1-2, bouw werkbladen groep 1-2, bouw activiteiten groep 1-2, bouw leerbladen 5\u20136 jaar, bouw gratis groep 1-2, bouw PDF groep 1-2, bouw rekenen',
    snippetAnswer: 'Bouw-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken kranen, vrachtwagens en gebouwen als context voor optellen tot 10, meten, vormen herkennen en bouwwoorden lezen. Het constructiethema stimuleert ruimtelijk inzicht en probleemoplossend denken. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het bouwthema een platform voor meetkunde en ruimtelijk redeneren: vijf- en zesjarigen herkennen vormen in gebouwen (rechthoeken, driehoeken, vierkanten), vergelijken afmetingen (hoger, breder, langer) en lossen eenvoudige constructieproblemen op. De SLO-leerlijnen voor rekenen benadrukken meetkunde en meten als essenti\u00eble domeinen naast getallen, en het bouwthema maakt beide concreet en tastbaar. Optellen wordt authentiek wanneer kinderen bakstenen tellen en combineren, meten wordt zinvol wanneer ze bouwhoogtes vergelijken, en ruimtelijk denken ontwikkelt zich wanneer ze plattegronden interpreteren. Tegelijkertijd bieden bouwwoorden (kraan, steen, muur, dak) uitstekend materiaal voor beginlezen.',
    developmentalMilestones: [
      { milestone: 'Vormherkenning in de echte wereld (5\u20136-jarigen identificeren geometrische vormen in gebouwen)', howWeAddress: 'Vormzoek-activiteiten in bouwsc\u00e8nes laten kinderen driehoeken, rechthoeken en vierkanten aanwijzen in daken, muren en ramen' },
      { milestone: 'Vergelijken en meten (kinderen gebruiken woorden als hoger, breder, langer)', howWeAddress: 'Meetactiviteiten met gebouwen en torens oefenen het vergelijken van afmetingen met correct wiskundig vocabulaire' },
      { milestone: 'Optellen in bouwcontext (kinderen tellen en combineren bouwmaterialen)', howWeAddress: 'Optelopdrachten met bakstenen en planken visualiseren de rekenbewerking in een concrete, tastbare context' },
      { milestone: 'Ruimtelijk redeneren (kinderen interpreteren eenvoudige plattegronden en bouwtekeningen)', howWeAddress: 'Eenvoudige plattegrond-activiteiten bouwen het vermogen op om 2D-tekeningen te koppelen aan 3D-constructies' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk vormen tot drie basistypes (driehoek, vierkant, rechthoek), gebruik bouwblokken als concreet hulpmiddel, en bied woordkaarten met afbeeldingen bij leesactiviteiten. Voor gevorderde kinderen: introduceer symmetrie in gebouwen, laat hen bouwtekeningen ontwerpen met maten, en daag hen uit met sommen die lengte en breedte combineren.',
    parentTakeaway: 'Bouwen is het ultieme rekenspel voor groep 1-2. Bouw samen met blokken en tel hoeveel blokken je nodig hebt. Meet de toren met je handen \u2014 hoeveel handen hoog? Bekijk samen gebouwen in de buurt en zoek vormen: waar zien we driehoeken? Na een bouwwerkblad kunt u samen een ontwerp maken voor een droomhuis, met vormen, maten en een lijst van benodigde materialen. Dit combineert meetkunde, rekenen en creatief denken.',
    classroomIntegration: 'Het bouwthema is in groep 1-2 vakoverstijgend bij uitstek: bij rekenen worden vormen herkend en bouwmaterialen geteld, bij taal worden bouwwoorden gelezen en een bouwverslag geschreven, bij natuur en techniek worden materialen en constructieprincipes verkend, en in de bouwhoek worden ontwerpen gerealiseerd. Een bouwproject waarbij kinderen een maquette maken met een bouwtekening integreert alle leergebieden, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vormherkenning in bouwcontext', emerging: 'herkent vierkant en driehoek in gebouwen met hulp', proficient: 'identificeert zelfstandig 4\u20135 geometrische vormen in bouwsc\u00e8nes en benoemt ze', advanced: 'herkent vormen in complexe constructies, beschrijft eigenschappen en combineert vormen in eigen ontwerpen' },
      { skill: 'Meten en vergelijken', emerging: 'gebruikt hoger/lager met hulp maar meet nog niet zelfstandig', proficient: 'vergelijkt zelfstandig afmetingen met correct vocabulaire en meet met niet-standaard eenheden', advanced: 'meet met eenvoudige standaardmaten, noteert resultaten en vergelijkt nauwkeurig' },
      { skill: 'Optellen met bouwmaterialen', emerging: 'telt bouwmaterialen maar combineert nog niet zelfstandig', proficient: 'voert optellingen tot 10 uit met bakstenen/planken en noteert de som', advanced: 'rekent tot 20, lost meerstaps-bouwproblemen op en formuleert eigen sommen' },
    ],
  },

  cooking: {
    seoTitle: 'Koken-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare koken-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'koken groep 1-2, koken oefeningen 5\u20136 jaar, koken oefeningen groep 1-2, koken uitprintbaar groep 1-2, koken werkbladen groep 1-2, koken activiteiten groep 1-2, koken leerbladen 5\u20136 jaar, koken gratis groep 1-2, koken PDF groep 1-2, koken rekenen',
    snippetAnswer: 'Koken-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken recepten, ingredi\u00ebnten en keukengerei als context voor optellen, meten, volgorde-begrip en beginlezen. Een recept volgen is wiskunde in actie: tellen, meten, ordenen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt koken een authentieke wiskundige ervaring: vijf- en zesjarigen kunnen recepten volgen, ingredi\u00ebnten tellen en meten, en de volgorde van stappen begrijpen. De SLO-leerlijnen voor rekenen benadrukken het belang van meten en ordenen in betekenisvolle contexten, en koken is de meest alledaagse context die er bestaat. Een recept is in wezen een algoritme \u2014 een stapsgewijze instructie die kinderen leren volgen, begrijpen en uitvoeren. Optellen wordt authentiek wanneer je drie eieren en twee eieren combineert, meten wordt concreet wanneer je een beker vullen meel afmeet, en volgorde wordt belangrijk wanneer stap twee niet kan zonder stap \u00e9\u00e9n. Tegelijkertijd zijn receptwoorden uitstekend materiaal voor functioneel lezen.',
    developmentalMilestones: [
      { milestone: 'Meten met niet-standaard eenheden (5\u20136-jarigen leren afmeten met bekers, lepels, koppen)', howWeAddress: 'Meetactiviteiten met keukenmaten laten kinderen ervaren dat meten een gereedschap is voor nauwkeurigheid, niet alleen een schooloefening' },
      { milestone: 'Sequenti\u00eble volgorde begrijpen (kinderen begrijpen dat stappen in een bepaalde orde moeten)', howWeAddress: 'Receptvolgorde-activiteiten waarbij kinderen stappen ordenen bouwen het begrip op van sequentie als logisch principe' },
      { milestone: 'Optellen in receptcontext (combineren van ingredi\u00ebnten)', howWeAddress: 'Optelopdrachten met ingredi\u00ebnten (drie appels plus twee appels) maken optelling concreet en functioneel' },
      { milestone: 'Functioneel lezen (kinderen lezen een eenvoudig recept)', howWeAddress: 'Receptlees-activiteiten oefenen functionele geletterdheid met een duidelijk doel: iets lekkers maken' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: gebruik werkbladen met picto-recepten (afbeeldingen in plaats van tekst), beperk meten tot hele bekers en lepels, en bied overtrekwoorden aan voor ingredi\u00ebnten. Voor gevorderde kinderen: introduceer halve maten, laat hen zelf een recept opschrijven, en daag hen uit met verdubbel-opdrachten (het recept is voor 2, maar wij zijn met 4).',
    parentTakeaway: 'Samen koken is de beste wiskundeles voor groep 1-2. Laat uw kind ingredi\u00ebnten tellen en afmeten, de volgorde van het recept volgen, en de timer instellen. Vraag: als we drie eieren nodig hebben en er liggen er vijf in de doos, hoeveel blijven er dan over? Na een kookwerkblad kunt u samen een echt gerecht maken, waarbij uw kind het recept voorleest en de ingredi\u00ebnten klaarlegt. Dit maakt rekenen en lezen functioneel en onvergetelijk.',
    classroomIntegration: 'Het kookthema integreert in groep 1-2 met alle leergebieden: bij rekenen worden ingredi\u00ebnten geteld, gemeten en opgeteld, bij taal worden recepten gelezen en geschreven, bij natuur wordt besproken waar voedsel vandaan komt, en bij sociaal-emotionele ontwikkeling wordt samengewerkt in kookgroepjes. Een wekelijks kookmoment waarbij kinderen om beurten een recept volgen is een krachtige integratie van de SLO-doelen voor rekenen, taal en wereldori\u00ebntatie.',
    assessmentRubric: [
      { skill: 'Meten met keukenmaten', emerging: 'vult een beker of lepel maar begrijpt het concept van nauwkeurig meten nog niet', proficient: 'meet zelfstandig met bekers en lepels en begrijpt dat de maat bepaalt hoeveel je nodig hebt', advanced: 'meet nauwkeurig, begrijpt halve maten en past hoeveelheden aan bij meer of minder porties' },
      { skill: 'Receptvolgorde begrijpen', emerging: 'volgt receptstappen met continue begeleiding', proficient: 'ordent zelfstandig 4\u20136 receptstappen in de juiste volgorde en voert ze uit', advanced: 'begrijpt waarom de volgorde belangrijk is, signaleert fouten en corrigeert zelfstandig' },
      { skill: 'Optellen in kookcontext', emerging: 'telt ingredi\u00ebnten maar combineert nog niet in sommen', proficient: 'voert optellingen tot 10 uit met ingredi\u00ebnten en noteert de som', advanced: 'rekent tot 20, lost verdubbel- en halveerproblemen op en formuleert eigen kooksommen' },
    ],
  },

  dinosaurs: {
    seoTitle: 'Dinosaurussen-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare dinosaurussen-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dinosaurussen groep 1-2, dinosaurussen oefeningen 5\u20136 jaar, dinosaurussen oefeningen groep 1-2, dinosaurussen uitprintbaar groep 1-2, dinosaurussen werkbladen groep 1-2, dinosaurussen activiteiten groep 1-2, dinosaurussen leerbladen 5\u20136 jaar, dinosaurussen gratis groep 1-2, dinosaurussen PDF groep 1-2, dinosaurussen rekenen',
    snippetAnswer: 'Dinosaurussen-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken de dinosaurusfascinatie als motor voor optellen tot 10, vergelijken van grootte, beginlezen van dinonamen en classificatie op kenmerken. De imposante prehistorische dieren maken leren tot een avontuur. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 transformeert de dinosaurusfascinatie in een leervehikel voor vergelijken, classificeren en informatief lezen: vijf- en zesjarigen willen alles weten over dinosaurussen en deze intrinsieke motivatie drijft hen naar taken die anders als uitdagend worden ervaren. De SLO-leerlijnen benadrukken het vergelijken en ordenen als rekenvaardigheden en het verwerken van informatieve teksten als taalvaardigheid \u2014 dinosaurussen vervullen beide. Het vergelijken van grootte (T-rex versus Compsognathus), het classificeren op kenmerken (vleeseters versus planteneters), en het ordenen op tijdlijn zijn authentieke wiskundige activiteiten. Tegelijkertijd bieden lange dinosaurusnamen een unieke uitdaging voor beginlezen die kinderen gretig aangaan omdat ze de namen al kennen van hun speelgoed en boeken.',
    developmentalMilestones: [
      { milestone: 'Vergelijken en ordenen op grootte (5\u20136-jarigen gebruiken wiskundig vocabulaire als groter, kleiner, langst)', howWeAddress: 'Vergelijkingsactiviteiten met dinosaurussen van verschillende grootte oefenen het ordenen van groot naar klein en het gebruik van vergelijkende taal' },
      { milestone: 'Classificatie op meerdere kenmerken (vleeseters/planteneters, groot/klein)', howWeAddress: 'Sorteeractiviteiten met dinosaurussen bouwen het vermogen op om op twee kenmerken tegelijk te classificeren' },
      { milestone: 'Informatief lezen (kinderen verwerken feitelijke informatie over dinosaurussen)', howWeAddress: 'Feitenkaart-activiteiten met dinosaurusgegevens (lengte, voedsel, tijdperk) oefenen het lezen en verwerken van informatieve tekst' },
      { milestone: 'Optellen met grote getallen (kinderen werken met hoeveelheden tot 20)', howWeAddress: 'Optelopdrachten met dinosaurusgroepen motiveren kinderen om met grotere getallen te werken omdat ze de context boeiend vinden' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vijf bekende dinosaurussen, gebruik concrete dinosaurusfiguren als telmateriaal, en bied woordkaarten met afbeeldingen bij leesactiviteiten. Voor gevorderde kinderen: introduceer tijdlijnactiviteiten, laat hen dinosaurusnamen zelfstandig schrijven, en daag hen uit met vergelijkingssommen (de T-rex is 12 meter, de Triceratops 9 meter, hoeveel meter verschil?).',
    parentTakeaway: 'De dinosauruspassie van uw kind is een goudmijn voor leren in groep 1-2. Bezoek samen een natuurhistorisch museum en laat uw kind de lengte van dinosaurussen vergelijken. Lees samen informatieve dinoboeken en bespreek de feiten \u2014 hoeveel tanden had een T-rex? Sorteer speelgoeddino\u2019s op grootte en type. Na een dinowerkblad kunt u samen een dinosaurus-top-10 maken, geordend van groot naar klein, waarbij uw kind de namen schrijft en de lengtes noteert.',
    classroomIntegration: 'Het dinosaurusthema is in groep 1-2 een van de meest motiverende projectthema\u2019s: bij rekenen worden dino\u2019s vergeleken en opgeteld, bij taal worden dinoboeken gelezen en dinofeitjes geschreven, bij natuur worden uitgestorven dieren besproken, en bij beeldende vorming worden dino\u2019s getekend en gekleurd. Een dinoprojectweek met werkbladen, museumbezoek en een dino-expositie in de klas integreert alle leergebieden, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Vergelijken en ordenen', emerging: 'vergelijkt twee dinosaurussen op grootte met hulp (groter/kleiner)', proficient: 'ordent zelfstandig 4\u20135 dinosaurussen van groot naar klein en gebruikt correct vocabulaire', advanced: 'ordent 8+ objecten, vergelijkt op meerdere kenmerken en legt de ordening uit' },
      { skill: 'Classificatie van dinosaurussen', emerging: 'sorteert in twee groepen (vleeseters/planteneters) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en verdedigt de indeling' },
      { skill: 'Dinonamen lezen en schrijven', emerging: 'herkent 1\u20132 korte dinonamen met hulp van afbeeldingen', proficient: 'leest en schrijft 4\u20136 dinosaurusnamen herkenbaar', advanced: 'leest en schrijft langere namen correct en gebruikt ze in informatieve zinnen' },
    ],
  },

  easter: {
    seoTitle: 'Pasen-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare pasen-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'pasen groep 1-2, pasen oefeningen 5\u20136 jaar, pasen oefeningen groep 1-2, pasen uitprintbaar groep 1-2, pasen werkbladen groep 1-2, pasen activiteiten groep 1-2, pasen leerbladen 5\u20136 jaar, pasen gratis groep 1-2, pasen PDF groep 1-2, pasen rekenen',
    snippetAnswer: 'Pasen-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken paaseieren, hazen en kuikens als context voor optellen tot 10, verdelen, symmetrie en paaswoorden lezen. De paaseierjacht wordt een wiskundig avontuur. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt Pasen een rekenfestijn: vijf- en zesjarigen zijn klaar voor echte optelopdrachten met paaseieren, verdeelproblemen (eieren eerlijk verdelen), symmetrie in paaseierpatronen en het lezen van paaswoorden. De SLO-leerlijnen benadrukken het oplossen van contextuele rekenproblemen, en de paaseierjacht biedt die context als geen ander: hoeveel eieren heb je gevonden? Als je er vijf hebt en er drie bijvindt, hoeveel dan? Het seizoensgebonden karakter van het thema cre\u00ebert een natuurlijk urgentiegevoel dat de motivatie verhoogt. Tegelijkertijd bieden paaspatronen op eieren een rijke context voor symmetrie en meetkundig denken.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 10 (kinderen werken met samenvoegen en wegnemen)', howWeAddress: 'Paaseier-optelopdrachten (5 eieren gevonden, 3 erbij) en aftrekactiviteiten (8 eieren, 2 opgegeten) maken bewerkingen concreet' },
      { milestone: 'Eerlijk verdelen (kinderen beginnen het concept van gelijke verdeling te begrijpen)', howWeAddress: 'Verdeelactiviteiten met paaseieren over mandjes bouwen het begrip van eerlijk delen op als voorbereiding op deling' },
      { milestone: 'Symmetrie in patronen (kinderen herkennen en maken symmetrische versieringen)', howWeAddress: 'Paaseier-versieractiviteiten met symmetrische patronen laten kinderen de spiegellijn ontdekken en toepassen' },
      { milestone: 'Seizoensgebonden woorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met paaswoorden (ei, haas, kuiken, nest) oefenen beginlezen in een motiverende seizoenscontext' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk optelopdrachten tot onder de 5, gebruik plastic paaseieren als concreet telmateriaal, en bied overtrekwoorden aan voor paaswoorden. Voor gevorderde kinderen: introduceer sommen tot 20, complexe verdeelproblemen (12 eieren over 3 mandjes), en laat hen een paasverhaaltje schrijven.',
    parentTakeaway: 'Pasen is een wiskundefestijn voor groep 1-2. Maak van de paaseierjacht een rekenactiviteit: laat uw kind de gevonden eieren tellen, per kleur sorteren en optellen. Verdeel samen de eieren eerlijk over alle familieleden \u2014 hoeveel krijgt iedereen? Na een paaswerkblad kunt u samen paaseieren versieren met symmetrische patronen: wat je aan de ene kant doet, doe je ook aan de andere kant. Dit maakt meetkunde tastbaar en feestelijk.',
    classroomIntegration: 'Het paasthema biedt in groep 1-2 een seizoensgebonden piek in motivatie: bij rekenen worden paaseieren geteld, opgeteld en verdeeld, bij taal worden paasverhalen gelezen en paaswoorden geschreven, bij natuur worden lentedieren (kuikens, lammetjes) besproken, en bij beeldende vorming worden symmetrische paaseieren gemaakt. Een paaseierjacht op het schoolplein met rekenkaarten bij elk ei integreert beweging en wiskunde, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Optellen en aftrekken (paascontext)', emerging: 'telt paaseieren maar voert nog geen bewerkingen zelfstandig uit', proficient: 'voert optellingen en aftrekkingen tot 10 uit met paaseierbeelden', advanced: 'rekent vlot tot 20, lost meerstapsproblemen op en formuleert eigen paassommen' },
      { skill: 'Eerlijk verdelen', emerging: 'verdeelt met hulp door \u00e9\u00e9n-voor-\u00e9\u00e9n uit te delen', proficient: 'verdeelt zelfstandig 10 eieren eerlijk over 2\u20133 groepen', advanced: 'verdeelt grotere aantallen, herkent wanneer het niet eerlijk kan en legt uit waarom' },
      { skill: 'Symmetrie in paaspatronen', emerging: 'herkent symmetrie in eenvoudige eipatronen met hulp', proficient: 'voltooit zelfstandig symmetrische patronen op een paaseier', advanced: 'ontwerpt eigen symmetrische patronen en past symmetrie toe op nieuwe vormen' },
    ],
  },

  emotions: {
    seoTitle: 'Emoties-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare emoties-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'emoties groep 1-2, emoties oefeningen 5\u20136 jaar, emoties oefeningen groep 1-2, emoties uitprintbaar groep 1-2, emoties werkbladen groep 1-2, emoties activiteiten groep 1-2, emoties leerbladen 5\u20136 jaar, emoties gratis groep 1-2, emoties PDF groep 1-2, emoties rekenen',
    snippetAnswer: 'Emoties-oefeningen voor groep 1-2 (5\u20136 jaar) helpen kinderen gevoelens herkennen, benoemen en reguleren, gecombineerd met tellen, grafiekactiviteiten en emotiewoorden lezen en schrijven. Emotionele geletterdheid is de basis voor sociaal succes op school. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt emotioneel leren een bewuste vaardigheid: vijf- en zesjarigen kunnen nuances onderscheiden (teleurgesteld versus boos, zenuwachtig versus bang), emoties bij zichzelf en anderen herkennen, en strategische\u00ebn bedenken om met moeilijke gevoelens om te gaan. De SLO-leerlijnen voor sociaal-emotionele ontwikkeling benadrukken dat kinderen in groep 1-2 leren om hun gevoelens te reguleren en rekening te houden met anderen. Werkbladen combineren dit met rekenvaardigheden: het turven en grafisch weergeven van gevoelens gedurende een week is dataverzameling, het tellen van gezichtsuitdrukkingen is getalbegrip, en het schrijven van emotiewoorden is functionele geletterdheid. De combinatie van sociaal-emotioneel leren met academische vaardigheden maakt dit thema bijzonder waardevol.',
    developmentalMilestones: [
      { milestone: 'Emotioneel vocabulaire uitbreiden (5\u20136-jarigen leren genuanceerde gevoelswoorden)', howWeAddress: 'Woordherkenning-activiteiten met uitgebreide emotiewoorden (teleurgesteld, trots, zenuwachtig) bouwen het emotionele vocabulaire systematisch uit' },
      { milestone: 'Emotieregulatie (kinderen leren strategie\u00ebn om met sterke gevoelens om te gaan)', howWeAddress: 'Strategie-werkbladen die kinderen helpen een persoonlijk regulatieplan te maken (als ik boos ben, dan...) bevorderen zelfregulerend vermogen' },
      { milestone: 'Dataverzameling en grafische weergave (kinderen turven en maken eenvoudige grafieken)', howWeAddress: 'Gevoelsturving-activiteiten waarbij kinderen dagelijks hun gevoel turven en een grafiek maken combineren emotioneel bewustzijn met rekenvaardigheid' },
      { milestone: 'Perspectief nemen (kinderen beginnen te begrijpen dat anderen anders kunnen voelen)', howWeAddress: 'Situatiekaart-activiteiten waarbij kinderen raden hoe iemand zich voelt in een situatie bouwen empathisch vermogen op' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vijf basisemoties met duidelijke gezichtsuitdrukkingen, gebruik emotiekaarten als fysiek hulpmiddel, en bied overtrekwoorden aan. Voor gevorderde kinderen: introduceer gemengde emoties (blij en zenuwachtig tegelijk), laat hen emotieverhalen schrijven, en daag hen uit met grafieken die meerdere weken beslaan.',
    parentTakeaway: 'Groep 1-2 is het moment waarop kinderen leren hun gevoelens te verwoorden in plaats van te uiten door gedrag. Benoem emoties samen \u2014 niet alleen blij en boos, maar ook trots, teleurgesteld en zenuwachtig. Na een emotiewerkblad kunt u samen een gevoelsthermometer maken voor thuis: hoe voel je je vandaag? Het dagelijks bespreken van gevoelens bouwt het vocabulaire en het bewustzijn op dat kinderen nodig hebben voor succesvol sociaal functioneren op school.',
    classroomIntegration: 'Het emotiethema loopt in groep 1-2 door het hele jaar: elke ochtend begint met een gevoelsronde (hoe voel je je?), emotiewerkbladen worden ingezet bij conflicten en positieve momenten, en een wekelijkse gevoelsturving levert materiaal voor rekenactiviteiten. Bij taal worden emotiewoorden gelezen en geschreven, bij beeldende vorming worden gezichtsuitdrukkingen getekend. Dit integreert sociaal-emotionele ontwikkeling met academische vaardigheden, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Emotioneel vocabulaire', emerging: 'benoemt 3\u20134 basisemoties (blij, boos, verdrietig, bang) met hulp', proficient: 'benoemt zelfstandig 8\u201310 emoties inclusief nuances en herkent ze bij anderen', advanced: 'beschrijft gemengde emoties, verklaart mogelijke oorzaken en stelt regulatiestrategie\u00ebn voor' },
      { skill: 'Gevoelsturving en grafieken', emerging: 'turft dagelijks gevoel met hulp maar interpreteert de grafiek nog niet', proficient: 'turft zelfstandig, maakt een staafgrafiek en vergelijkt dagen', advanced: 'analyseert patronen in de grafiek, trekt conclusies en presenteert bevindingen aan de klas' },
      { skill: 'Emotiewoorden lezen en schrijven', emerging: 'herkent 2\u20133 emotiewoorden met hulp van gezichtsuitdrukkingen', proficient: 'leest en schrijft zelfstandig 6\u20138 emotiewoorden', advanced: 'schrijft zinnen over gevoelens en gebruikt emotiewoorden in context' },
    ],
  },

  'fairy-tales': {
    seoTitle: 'Sprookjes-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare sprookjes-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'sprookjes groep 1-2, sprookjes oefeningen 5\u20136 jaar, sprookjes oefeningen groep 1-2, sprookjes uitprintbaar groep 1-2, sprookjes werkbladen groep 1-2, sprookjes activiteiten groep 1-2, sprookjes leerbladen 5\u20136 jaar, sprookjes gratis groep 1-2, sprookjes PDF groep 1-2, sprookjes rekenen',
    snippetAnswer: 'Sprookjes-oefeningen voor groep 1-2 (5\u20136 jaar) combineren bekende verhalen met optellen, volgorde-oefeningen, woordherkenning en creatief schrijven. De verhalende structuur van sprookjes bouwt begrijpend luisteren en narratief denken op. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 worden sprookjes een krachtig middel voor narratief begrip en taalontwikkeling: vijf- en zesjarigen begrijpen dat verhalen een begin, midden en einde hebben, dat personages doelen nastreven en obstakels tegenkomen, en dat herhalingen een structurerend element zijn (drie biggetjes, drie beren). De SLO-leerlijnen voor taal benadrukken begrijpend luisteren en vertelvaardigheden, en sprookjes bieden het ideale oefenmateriaal. Rekenkundig verschijnen sprookjes verrassend vaak met wiskundige elementen: de drie biggetjes (tellen en vergelijken), Goudlokje en de drie beren (vergelijken: te groot, te klein, precies goed), en Hans en Grietje (route en ori\u00ebntatie). Deze natuurlijke verbinding maakt vakoverstijgend leren vanzelfsprekend.',
    developmentalMilestones: [
      { milestone: 'Narratief begrip (5\u20136-jarigen begrijpen verhaalstructuur: begin, midden, einde)', howWeAddress: 'Volgordeactiviteiten met sprookjessc\u00e8nes laten kinderen verhaalgebeurtenissen in de juiste volgorde leggen en navertellen' },
      { milestone: 'Vergelijken en ordenen (kinderen gebruiken vergelijkende taal)', howWeAddress: 'Sprookjesactiviteiten met vergelijking (groot/groter/grootst bij de drie beren) oefenen wiskundig vergelijken in een verhalende context' },
      { milestone: 'Vertelvaardigheden (kinderen vertellen en hervertellen verhalen)', howWeAddress: 'Hervertel-activiteiten met beeldkaarten begeleiden kinderen in het gestructureerd navertellen van een sprookje' },
      { milestone: 'Sprookjeswoorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met sprookjeswoorden (prins, draak, fee, kasteel) oefenen beginlezen met fantasierijk vocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: werk met bekende sprookjes (Roodkapje, drie biggetjes), beperk volgorde-activiteiten tot drie of vier sc\u00e8nes, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: laat hen een eigen sprookje bedenken en opschrijven, introduceer vergelijkingsrekenen met drie trappen, en daag hen uit met een kruiswoordpuzzel met sprookjeswoorden.',
    parentTakeaway: 'Sprookjes zijn het krachtigste middel voor taalontwikkeling dat u thuis heeft. Lees elke avond een sprookje voor en bespreek het: wie zijn de personages, wat willen ze, wat gebeurt er? Na een sprookjeswerkblad kunt u samen het verhaal naspelen, waarbij uw kind de verteller is. Stel rekenvragen bij het lezen \u2014 hoeveel biggetjes? Als de wolf \u00e9\u00e9n huis blaast, hoeveel huizen zijn er dan nog? Dit maakt rekenen onderdeel van een geliefd ritueel.',
    classroomIntegration: 'Het sprookjesthema is in groep 1-2 een rode draad door het taalonderwijs: bij lezen worden sprookjes gelezen en besproken, bij schrijven worden eigen sprookjes gemaakt, bij rekenen worden sprookjesrekensommen opgelost, en bij drama worden sprookjes nagespeeld. Een sprookjesproject over meerdere weken \u2014 met elke week een ander sprookje en bijbehorende werkbladen \u2014 bouwt systematisch begrijpend luisteren, vertelvaardigheden en woordenschat op, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Narratief begrip', emerging: 'vertelt losse sc\u00e8nes uit een sprookje met hulp', proficient: 'hervertelt een sprookje zelfstandig met begin, midden en einde in de juiste volgorde', advanced: 'hervertelt met detail, beschrijft motivaties van personages en vergelijkt sprookjes onderling' },
      { skill: 'Vergelijken in sprookjescontext', emerging: 'gebruikt groot/klein met hulp bij de drie beren', proficient: 'vergelijkt zelfstandig met trapsgewijze taal (groot, groter, grootst) en past toe op nieuwe situaties', advanced: 'gebruikt vergelijkende taal in complexe contexten en formuleert eigen vergelijkingsvragen' },
      { skill: 'Sprookjeswoorden lezen en schrijven', emerging: 'herkent 2\u20133 sprookjeswoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 sprookjeswoorden', advanced: 'schrijft eigen sprookjeszinnen met correct gespelde kernwoorden' },
    ],
  },

  farm: {
    seoTitle: 'Boerderij-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare boerderij-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'boerderij groep 1-2, boerderij oefeningen 5\u20136 jaar, boerderij oefeningen groep 1-2, boerderij uitprintbaar groep 1-2, boerderij werkbladen groep 1-2, boerderij activiteiten groep 1-2, boerderij leerbladen 5\u20136 jaar, boerderij gratis groep 1-2, boerderij PDF groep 1-2, boerderij rekenen',
    snippetAnswer: 'Boerderij-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken boerderijdieren, gewassen en machines als context voor optellen tot 10, verdelen, vergelijken en boerderijwoorden lezen. De boerderij maakt rekenen tastbaar en verbindt kinderen met voedselproductie. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt de boerderij een authentiek wiskundeplatform: vijf- en zesjarigen lossen echte boerderijproblemen op \u2014 hoeveel eieren leggen vijf kippen in een week, hoe verdeel je hooi eerlijk over vier paarden, hoeveel melk geeft een koe per dag? De SLO-leerlijnen benadrukken het werken met contextuele rekenproblemen en het verkennen van de herkomst van voedsel, en de boerderij combineert beide. Optellen wordt functioneel wanneer oogsten worden gecombineerd, vergelijken wordt concreet wanneer diergroottes worden geordend, en verdelen wordt authentiek wanneer voer over dieren wordt verdeeld. Tegelijkertijd bieden korte boerderijwoorden (koe, kip, varken, hooi) uitstekend materiaal voor beginlezen en schrijven.',
    developmentalMilestones: [
      { milestone: 'Contextueel rekenen (5\u20136-jarigen lossen wiskundige problemen op in realistische situaties)', howWeAddress: 'Boerderijrekensommen (hoeveel eieren verzameld, hoeveel hooi verdeeld) maken wiskunde functioneel en herkenbaar' },
      { milestone: 'Eerlijk verdelen (kinderen begrijpen gelijke verdeling als wiskundig concept)', howWeAddress: 'Verdeelactiviteiten met dierenvoer over stallen bouwen het begrip van delen en eerlijke verdeling op' },
      { milestone: 'Vergelijken en ordenen (kinderen ordenen boerderijdieren op grootte, gewicht)', howWeAddress: 'Vergelijkingsactiviteiten met boerderijdieren (kip versus koe versus paard) oefenen ordening met trapsgewijze taal' },
      { milestone: 'Boerderijwoorden lezen en schrijven', howWeAddress: 'Woordpuzzel- en schrijfactiviteiten met boerderijvocabulaire (koe, kip, tractor, schuur) oefenen beginlezen in een rijke thematische context' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vijf bekende boerderijdieren, gebruik plastic speelgoeddieren als concreet materiaal, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer meerstaps-rekenproblemen (kippen leggen eieren, verzamelen, verdelen), laat hen een boerderijdagboek schrijven, en daag hen uit met oogstvergelijkingen in tabelformaat.',
    parentTakeaway: 'De boerderij biedt eindeloze rekenkansen voor groep 1-2. Bezoek een kinderboerderij en laat uw kind dieren tellen per soort. Bespreek thuis waar voedsel vandaan komt: hoeveel melk voor een pak kaas? Na een boerderijwerkblad kunt u samen een boodschappenlijst maken en nadenken over welke producten van de boerderij komen. Plant eventueel een klein tuintje en tel de zaadjes \u2014 rekenen wordt levend wanneer het groeit.',
    classroomIntegration: 'Het boerderijthema is in groep 1-2 een rijk vakoverstijgend project: bij rekenen worden eieren geteld, dieren opgeteld en voer verdeeld, bij taal worden boerderijboeken gelezen en een boerderijverslag geschreven, bij natuur wordt de herkomst van voedsel besproken, en een excursie naar een kinderboerderij maakt het leren tastbaar. Werkbladen dienen als voorbereiding en verwerking rondom het boerderijbezoek, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Contextueel rekenen (boerderij)', emerging: 'telt boerderijdieren maar lost nog geen contextuele sommen op', proficient: 'lost zelfstandig optel- en verdeelproblemen op in boerderijcontext tot 10', advanced: 'rekent tot 20, lost meerstapsproblemen op en formuleert eigen boerderijsommen' },
      { skill: 'Eerlijk verdelen (dierenvoer)', emerging: 'verdeelt met hulp door \u00e9\u00e9n-voor-\u00e9\u00e9n uit te delen', proficient: 'verdeelt zelfstandig 10\u201312 items eerlijk over 2\u20134 groepen', advanced: 'verdeelt grote aantallen, herkent restanten en legt de verdeelstrategie uit' },
      { skill: 'Boerderijwoorden lezen en schrijven', emerging: 'herkent 2\u20133 boerderijwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 6\u20138 korte boerderijwoorden', advanced: 'leest en schrijft langere woorden en gebruikt ze in beschrijvende zinnen over de boerderij' },
    ],
  },

  flowers: {
    seoTitle: 'Bloemen-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare bloemen-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'bloemen groep 1-2, bloemen oefeningen 5\u20136 jaar, bloemen oefeningen groep 1-2, bloemen uitprintbaar groep 1-2, bloemen werkbladen groep 1-2, bloemen activiteiten groep 1-2, bloemen leerbladen 5\u20136 jaar, bloemen gratis groep 1-2, bloemen PDF groep 1-2, bloemen rekenen',
    snippetAnswer: 'Bloemen-oefeningen voor groep 1-2 (5\u20136 jaar) combineren bloemobservatie met tellen van blaadjes, optellen, symmetrie herkennen en bloemenwoorden lezen en schrijven. De natuurlijke schoonheid van bloemen maakt meetkunde en natuur tastbaar. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het bloementhema een brug tussen natuur en meetkunde: vijf- en zesjarigen ontdekken dat bloemen symmetrisch zijn, dat blaadjes geteld en vergeleken kunnen worden, en dat de groei van een plant een meetbaar proces is. De SLO-leerlijnen voor natuur en techniek benadrukken het observeren van plantengroei, terwijl de rekenleerlijnen meetkunde en meten als doel stellen. Het bloementhema verenigt beide: het tellen van bloembladen is rekenen, het herkennen van symmetrie in bloemen is meetkunde, het meten van plantengroei is wiskunde in actie, en het schrijven van bloemnamen is functionele geletterdheid. Bloemen zijn beschikbaar in elke seizoen en elk lokaal, waardoor het thema altijd toegankelijk is.',
    developmentalMilestones: [
      { milestone: 'Symmetrie in de natuur herkennen (5\u20136-jarigen zien symmetrie in bloemen en bladeren)', howWeAddress: 'Bloemsymmetrie-activiteiten laten kinderen de spiegellijn in bloemen vinden en symmetrische bloemen voltekenen' },
      { milestone: 'Tellen en vergelijken (kinderen tellen bloembladen en vergelijken aantallen)', howWeAddress: 'Bladtelling-activiteiten bouwen getalbegrip op door het tellen en vergelijken van bloembladen bij verschillende bloemen' },
      { milestone: 'Groeiproces observeren en vastleggen (kinderen volgen de groei van een plant)', howWeAddress: 'Groeiregistratie-werkbladen laten kinderen de groei meten en tekenen, waarmee meetvaardigheden en observatievermogen worden geoefend' },
      { milestone: 'Bloemenwoorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met bloemnamen (roos, tulp, lelie, madeliefje) oefenen beginlezen met natuurvocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: werk met drie of vier bekende bloemen, bied grote kleurplaten aan met duidelijke symmetrielijnen, en gebruik woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer het tellen van bloembladen bij verschillende soorten en het vergelijken in een tabel, laat hen een bloemendagboek bijhouden, en daag hen uit met symmetrietekeningen van complexere bloemen.',
    parentTakeaway: 'Bloemen zijn een prachtig leermateriaal voor groep 1-2. Plant samen een bloembak en meet wekelijks hoe hoog de plantjes groeien \u2014 noteer de metingen en bespreek het verschil. Tel bloembladen tijdens een wandeling en vergelijk: de madeliefje heeft meer blaadjes dan de tulp. Na een bloemenwerkblad kunt u samen geperste bloemen maken en labelen met de namen. Elke seizoenswisseling biedt nieuwe bloemen en nieuwe leermomenten.',
    classroomIntegration: 'Het bloementhema integreert in groep 1-2 met natuur (plantengroei observeren), rekenen (bloembladen tellen, symmetrie), taal (bloemnamen lezen en schrijven) en beeldende vorming (bloemen tekenen en schilderen). Een tuinproject waarbij de klas bloemen zaait, de groei meet en registreert op werkbladen, en de bloemen tekent en beschrijft, is een krachtige integratie van de SLO-doelen voor alle leergebieden.',
    assessmentRubric: [
      { skill: 'Symmetrie herkennen in bloemen', emerging: 'herkent dat een bloem twee gelijke helften heeft met hulp', proficient: 'vindt zelfstandig de spiegellijn in bloemen en voltooit symmetrische bloemtekeningen', advanced: 'herkent symmetrie in complexe bloemen, beschrijft de symmetrie en past het concept toe op andere natuurvormen' },
      { skill: 'Tellen en vergelijken (bloembladen)', emerging: 'telt bloembladen tot 5 met hulp', proficient: 'telt zelfstandig bloembladen tot 15 en vergelijkt aantallen bij verschillende bloemen', advanced: 'telt tot 20+, maakt een vergelijkingstabel en trekt conclusies' },
      { skill: 'Bloemnamen lezen en schrijven', emerging: 'herkent 1\u20132 bloemnamen met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 4\u20136 bloemnamen', advanced: 'schrijft langere bloemnamen correct en gebruikt ze in beschrijvende zinnen over de natuur' },
    ],
  },

  food: {
    seoTitle: 'Eten-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare eten-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'eten groep 1-2, eten oefeningen 5\u20136 jaar, eten oefeningen groep 1-2, eten uitprintbaar groep 1-2, eten werkbladen groep 1-2, eten activiteiten groep 1-2, eten leerbladen 5\u20136 jaar, eten gratis groep 1-2, eten PDF groep 1-2, eten rekenen',
    snippetAnswer: 'Eten-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken fruit, groenten en maaltijden als context voor optellen, verdelen, classificatie op voedingsgroep en voedselwoorden lezen en schrijven. Gezonde voeding wordt een wiskundeles. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het voedselthema een multidisciplinair leerplatform: vijf- en zesjarigen leren voedsel classificeren op voedingsgroep (groente, fruit, zuivel, graan), hoeveelheden optellen en vergelijken, en voedselwoorden lezen en schrijven. De SLO-leerlijnen voor gezond gedrag benadrukken voedingsbewustzijn, terwijl de rekenleerlijnen classificatie en rekenen met hoeveelheden als doel stellen. Het voedselthema combineert beide: het sorteren van boodschappen is classificatie, het tellen van fruit is getalbegrip, het verdelen van pizza is deling, en het lezen van een boodschappenlijst is functionele geletterdheid. De dagelijkse ervaring met eten maakt elk concept onmiddellijk herkenbaar en toepasbaar.',
    developmentalMilestones: [
      { milestone: 'Classificatie op voedingsgroep (5\u20136-jarigen leren de vijf voedingsgroepen herkennen)', howWeAddress: 'Sorteeractiviteiten met voedingsgroepen bouwen zowel voedingskennis als classificatievaardigheden op' },
      { milestone: 'Optellen en verdelen in voedselcontext', howWeAddress: 'Optel- en verdeelactiviteiten met fruit, brood en snoep maken rekenbewerkingen concreet en motiverend' },
      { milestone: 'Vergelijken van hoeveelheden (meer/minder/evenveel)', howWeAddress: 'Vergelijkingsactiviteiten met boodschappenmandjes oefenen het begrip van meer, minder en evenveel' },
      { milestone: 'Voedselwoorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met korte voedselwoorden (appel, brood, melk, kaas) oefenen beginlezen met alledaags vocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot twee voedingsgroepen (fruit en groente), gebruik plastic voedsel als concreet materiaal, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer alle vijf voedingsgroepen, laat hen een weekmenu samenstellen en opschrijven, en daag hen uit met prijsberekeningen bij een nep-supermarkt.',
    parentTakeaway: 'Eten biedt dagelijks rekenkansen voor groep 1-2. Neem uw kind mee boodschappen doen en laat het fruit tellen en afwegen. Verdeel samen pizza of taart in gelijke stukken \u2014 hoeveel stukken voor vier personen? Na een voedselwerkblad kunt u samen een gezond bord samenstellen en de voedingsgroepen bespreken. Koken en boodschappen doen zijn de meest authentieke wiskundelessen die er bestaan.',
    classroomIntegration: 'Het voedselthema integreert in groep 1-2 met gezondheidsonderwijs (voedingsgroepen, gezonde keuzes), rekenen (tellen, optellen, verdelen), taal (voedselwoorden lezen en schrijven) en wereldori\u00ebntatie (waar komt voedsel vandaan). Een supermarkthoek in de klas biedt kansen voor rollenspel met rekenen, en een gezamenlijk kookmoment maakt het leren tastbaar. Dit sluit aan bij de SLO-doelen voor gezond gedrag en rekenvaardigheid.',
    assessmentRubric: [
      { skill: 'Voedselclassificatie', emerging: 'sorteert voedsel in twee groepen (fruit/groente) met hulp', proficient: 'classificeert zelfstandig in vier voedingsgroepen en benoemt ze', advanced: 'classificeert in alle vijf groepen, legt uit waarom elk voedingsmiddel erbij hoort en evalueert maaltijden' },
      { skill: 'Optellen en verdelen (voedselcontext)', emerging: 'telt voedselitems maar voert nog geen bewerkingen zelfstandig uit', proficient: 'voert optellingen en verdelingen tot 10 uit en noteert correct', advanced: 'rekent tot 20, verdeelt eerlijk over ongelijke groepen en formuleert eigen voedselsommen' },
      { skill: 'Voedselwoorden lezen en schrijven', emerging: 'herkent 2\u20133 voedselwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 6\u20138 korte voedselwoorden', advanced: 'leest en schrijft langere woorden, maakt boodschappenlijsten en schrijft recepten' },
    ],
  },

  forest: {
    seoTitle: 'Bos-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare bos-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'bos groep 1-2, bos oefeningen 5\u20136 jaar, bos oefeningen groep 1-2, bos uitprintbaar groep 1-2, bos werkbladen groep 1-2, bos activiteiten groep 1-2, bos leerbladen 5\u20136 jaar, bos gratis groep 1-2, bos PDF groep 1-2, bos rekenen',
    snippetAnswer: 'Bos-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken bomen, bladeren en bosdieren als context voor optellen tot 10, classificatie, seizoensveranderingen observeren en boswoorden lezen en schrijven. Het bos als openluchtklasrum maakt natuur en rekenen onlosmakelijk verbonden. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het bos een levend laboratorium voor natuur en wiskunde: vijf- en zesjarigen observeren seizoensveranderingen, classificeren bladeren op vorm en kleur, tellen en vergelijken bomen en bosdieren, en meten stamomtrek en boomhoogte. De SLO-leerlijnen voor natuur en techniek benadrukken het systematisch observeren van de directe leefomgeving, terwijl de rekenleerlijnen classificatie, meten en getalbegrip als doelen stellen. Het bos combineert alles: bladeren sorteren is classificatie, bomen tellen is getalbegrip, de stamomtrek meten is wiskunde, en het schrijven van boswoorden is geletterdheid. Een bosbezoek wordt een vakoverstijgende expeditie wanneer werkbladen de structuur bieden voor observatie en registratie.',
    developmentalMilestones: [
      { milestone: 'Seizoensveranderingen observeren en beschrijven (5\u20136-jarigen begrijpen dat het bos verandert door het jaar)', howWeAddress: 'Seizoenswerkbladen met bossc\u00e8nes laten kinderen de vier seizoenen vergelijken en veranderingen beschrijven en registreren' },
      { milestone: 'Classificatie van natuurmaterialen (bladeren op vorm, kleur, grootte)', howWeAddress: 'Bladclassificatie-activiteiten bouwen het vermogen op om natuurmaterialen systematisch te sorteren op meerdere kenmerken' },
      { milestone: 'Meten in de natuur (stamomtrek, boomhoogte, padlengte)', howWeAddress: 'Meetactiviteiten met boselementen oefenen het meten met niet-standaard eenheden in een authentieke context' },
      { milestone: 'Boswoorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met boswoorden (boom, blad, mos, vos, uil) oefenen beginlezen met natuurvocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk classificatie tot twee kenmerken, gebruik echte bladeren en takken als concreet materiaal, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer meetactiviteiten met standaardmaten, laat hen een bosobservatiedagboek bijhouden, en daag hen uit met seizoensvergelijkingen in grafiekvorm.',
    parentTakeaway: 'Een wandeling in het bos is de beste les voor groep 1-2. Verzamel bladeren en sorteer ze thuis op vorm en kleur. Meet samen de omtrek van een boomstam met een touwtje \u2014 welke boom is het dikst? Tel de ringen op een boomstronk om de leeftijd te schatten. Na een boswerkblad kunt u samen een seizoensboek maken: fotografeer hetzelfde bospad in elk seizoen en beschrijf de veranderingen. Dit maakt natuur en wiskunde tot \u00e9\u00e9n avontuur.',
    classroomIntegration: 'Het bosthema is in groep 1-2 een krachtig vakoverstijgend project: bij natuur worden boselementen geobserveerd en geclassificeerd, bij rekenen worden bladeren gesorteerd en bomen geteld, bij taal worden bosboeken gelezen en een bosverslag geschreven, en een excursie naar een nabijgelegen bos maakt het leren ervaringsgericht. Werkbladen dienen als observatieformulieren tijdens het bosbezoek en als verwerkingsmateriaal achteraf, in lijn met de SLO-doelen voor natuur, rekenen en taal.',
    assessmentRubric: [
      { skill: 'Seizoensobservatie', emerging: 'benoemt zomer en winter met hulp maar beschrijft geen details', proficient: 'beschrijft zelfstandig de vier seizoenen in het bos en benoemt drie veranderingen per seizoen', advanced: 'vergelijkt seizoenen systematisch, legt oorzaken uit en registreert waarnemingen in een tabel' },
      { skill: 'Classificatie van natuurmaterialen', emerging: 'sorteert bladeren op \u00e9\u00e9n kenmerk (kleur) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken (vorm \u00e9n kleur) en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en presenteert de indeling' },
      { skill: 'Boswoorden lezen en schrijven', emerging: 'herkent 2\u20133 boswoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte boswoorden op gelinieerd papier', advanced: 'leest en schrijft langere woorden en gebruikt ze in beschrijvende zinnen over het bos' },
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

  // Check if already enriched (seoTitle in kindergarten block)
  const kindergartenIdx = content.indexOf("'kindergarten'");
  const firstGradeIdx = content.indexOf("'first-grade'");

  if (kindergartenIdx === -1 || firstGradeIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  const kindergartenBlock = content.substring(kindergartenIdx, firstGradeIdx);
  if (kindergartenBlock.includes('seoTitle:')) {
    console.log(`SKIP (already enriched): ${theme}/nl.ts`);
    continue;
  }

  // STEP 1: Insert seoTitle/seoDescription/seoKeywords right after "'kindergarten': {"
  const kindergartenOpenPattern = "'kindergarten': {";
  const kindergartenOpenIdx = content.indexOf(kindergartenOpenPattern);
  if (kindergartenOpenIdx === -1) {
    console.error(`NO KINDERGARTEN OPEN FOUND: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  const seoInsertPos = kindergartenOpenIdx + kindergartenOpenPattern.length;
  const seoText = '\n' + buildSeoInsertionText(enrichments[theme]);
  content = content.substring(0, seoInsertPos) + seoText + content.substring(seoInsertPos);

  // STEP 2: Insert 7 enrichment fields after faq array (recalculate positions after insertion)
  const newKindergartenIdx = content.indexOf("'kindergarten'");
  const newFirstGradeIdx = content.indexOf("'first-grade'");
  const newKindergartenBlock = content.substring(newKindergartenIdx, newFirstGradeIdx);

  // Find the last "],\n" in the kindergarten block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(newKindergartenBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/nl.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const enrichInsertPos = newKindergartenIdx + lastMatch.index + lastMatch[0].length;
  const enrichText = buildEnrichmentInsertionText(enrichments[theme]) + '\n';
  content = content.substring(0, enrichInsertPos) + enrichText + content.substring(enrichInsertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/nl.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
