#!/usr/bin/env node
/**
 * SEO Part 323: NL Kindergarten Grade Enrichment \u2014 Themes 39-50
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the kindergarten grade block of 12 NL theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    seoTitle: 'Sport-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare sport-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'sport groep 1-2, sport oefeningen 5\u20136 jaar, sport oefeningen groep 1-2, sport uitprintbaar groep 1-2, sport werkbladen groep 1-2, sport activiteiten groep 1-2, sport leerbladen 5\u20136 jaar, sport gratis groep 1-2, sport PDF groep 1-2, sport rekenen',
    snippetAnswer: 'Sport-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken voetballen, basketballen en zwembanen als context voor optellen tot 10, scorebijhouden, groottevergelijking en sportwoorden lezen en schrijven. De competitieve energie houdt kinderen gemotiveerd. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het sportthema een veelzijdig platform voor rekenen, taal en sociaal-emotioneel leren: vijf- en zesjarigen zijn klaar om sportscores niet alleen te tellen maar ook op te tellen en af te trekken \u2014 vier doelpunten in de eerste helft plus drie in de tweede is zeven in totaal. De SLO-leerlijnen voor rekenen benadrukken getalbegrip in betekenisvolle contexten, en sport biedt die context op de meest motiverende manier. Vergelijken van sportballen op grootte introduceert meetvocabulaire, terwijl het ordenen van scores het begrip van meer en minder versterkt. Tegelijkertijd zijn sportwoorden als bal, goal, team en race ideaal voor beginlezen en klank-letterkoppeling. Het sportthema stimuleert ook sociaal-emotionele vaardigheden: eerlijk spelen, samenwerken in teams en omgaan met winst en verlies \u2014 kernwaarden die de SLO-leerlijnen voor burgerschap benadrukken.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 10 met scorescenario\u2019s (5\u20136-jarigen rekenen in competitieve contexten)', howWeAddress: 'Scoreoptelopdrachten waarbij kinderen doelpunten of punten van twee helften samenvoegen maken de rekenbewerking zichtbaar als een echte sportuitslag' },
      { milestone: 'Groottevergelijking en ordening (kinderen vergelijken sportballen en -attributen)', howWeAddress: 'Vergelijkingsactiviteiten met sportballen van golfbal tot basketbal bouwen meetvocabulaire op: groter, kleiner, hoogste, laagste' },
      { milestone: 'Sportwoordenschat lezen en schrijven (functionele taalverwerving)', howWeAddress: 'Woordzoek- en schrijfactiviteiten met sportwoorden (bal, goal, team, race) oefenen klank-letterkoppeling met motiverend vocabulaire' },
      { milestone: 'Teamwork en fair play begrijpen (sociaal-emotionele groei via sport)', howWeAddress: 'Werkbladen met teamscenario\u2019s waarbij kinderen spelers eerlijk verdelen en samenwerken combineren rekenen met sociaal-emotioneel leren' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk optelling tot sommen onder de 5, gebruik concrete sportmateriaal als referentie, en bied woordkaarten met afbeeldingen van sportattributen. Voor gevorderde kinderen: introduceer aftrekking, sommen tot 20, meervoudige vergelijkingen (ordenen van vijf ballen op grootte) en laat hen sportverslagen schrijven met volledige zinnen.',
    parentTakeaway: 'Sport biedt dagelijks rekenkansen in groep 1-2. Houd samen de score bij tijdens een spelletje in de tuin: hoeveel goals heeft elk team? Tel samen op. Vergelijk sportballen thuis: welke is het grootst? Laat uw kind na een sportwerkblad een eigen wedstrijdverslag tekenen en beschrijven \u2014 hoeveel punten, wie won, hoeveel verschil? Dit combineert optellen, vergelijken en schrijven in \u00e9\u00e9n sportieve activiteit.',
    classroomIntegration: 'Het sportthema integreert in groep 1-2 met rekenen (scorebijhouden, optellen, vergelijken), taal (sportwoorden lezen en schrijven), lichamelijke opvoeding (bewegingsspellen met telcomponenten) en sociaal-emotioneel leren (teamwork, fair play). Een weekrotatie waarbij elke dag een andere sport centraal staat combineert werkbladen met beweging. Het scorebord in de klas biedt dagelijks oefenmateriaal voor optellen, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Optellen met sportscores', emerging: 'telt twee groepjes punten apart maar combineert niet zelfstandig', proficient: 'voert optellingen tot 10 uit met sportscores en noteert de som correct', advanced: 'rekent vlot tot 20, lost aftrekopgaven op en formuleert eigen sportsommen' },
      { skill: 'Groottevergelijking van sportattributen', emerging: 'vergelijkt twee ballen (groter/kleiner) met hulp', proficient: 'ordent zelfstandig vier sportballen van klein naar groot en beschrijft de volgorde', advanced: 'vergelijkt op meerdere kenmerken (grootte \u00e9n gewicht), ordent en legt de redenering uit' },
      { skill: 'Sportwoorden lezen en schrijven', emerging: 'herkent 2\u20133 sportwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte sportwoorden op gelinieerd papier', advanced: 'leest langere sportwoorden, schrijft ze correct en gebruikt ze in korte sportverslagen' },
    ],
  },

  spring: {
    seoTitle: 'Lente-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare lente-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'lente groep 1-2, lente oefeningen 5\u20136 jaar, lente oefeningen groep 1-2, lente uitprintbaar groep 1-2, lente werkbladen groep 1-2, lente activiteiten groep 1-2, lente leerbladen 5\u20136 jaar, lente gratis groep 1-2, lente PDF groep 1-2, lente rekenen',
    snippetAnswer: 'Lente-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken bloemen, lammetjes en regenbuien als context voor optellen tot 10, groeicycli ordenen, patroonherkenning en lentewoorden lezen en schrijven. Het seizoen van vernieuwing maakt natuur en rekenen onlosmakelijk verbonden. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het lentethema een brug tussen natuurobservatie en gestructureerd leren: vijf- en zesjarigen zien de natuur ontwaken en kunnen die veranderingen nu systematisch registreren en kwantificeren. De SLO-leerlijnen voor natuur en techniek benadrukken het waarnemen van seizoensveranderingen, terwijl de rekenleerlijnen meten en getalbegrip als doelen stellen. Lente combineert beide: bloemen tellen in de tuin is getalbegrip, de groeicyclus van zaad tot bloem ordenen is sequenti\u00eble logica, en de lengte van de dag meten is tijdsbegrip. Rekenkundig biedt het thema optelling (vijf krokussen plus drie tulpen), patroonherkenning (bloeipatronen in een border), en vergelijking (welke plant is het hoogst?). Taalkundig zijn lentewoorden gevarieerd en poëtisch: knop, bloem, nest, lam \u2014 korte woorden die kinderen buiten tegenkomen en op papier leren herkennen.',
    developmentalMilestones: [
      { milestone: 'Seizoensveranderingen waarnemen en beschrijven (5\u20136-jarigen registreren lentekenmerken)', howWeAddress: 'Observatiewerkbladen waarbij kinderen lentekenmerken turven (bloemen, vogels, regenbuien) bouwen het vermogen op om systematisch waar te nemen' },
      { milestone: 'Groeicycli ordenen (kinderen begrijpen de volgorde van zaad tot bloem)', howWeAddress: 'Ordening-activiteiten met groeistadia laten kinderen de sequentie vastleggen en beschrijven met woorden als eerst, dan, daarna' },
      { milestone: 'Optellen met lentebeelden (kinderen rekenen met bloemen, dieren en regendruppels)', howWeAddress: 'Optelopdrachten met lentebeelden (drie lammetjes plus vier erbij) maken rekenen seizoensgebonden en concreet' },
      { milestone: 'Lentewoorden lezen en schrijven (seizoensgebonden vocabulaire)', howWeAddress: 'Woordpuzzel- en schrijfactiviteiten met lentewoorden (knop, bloem, nest, lam) oefenen klank-letterkoppeling met woorden die kinderen buiten herkennen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk optelling tot onder de 5, gebruik echte lentemateriaal (bloemen, takjes) als referentie, en bied overtrekkaarten voor lentewoorden. Voor gevorderde kinderen: introduceer aftrekking, groeimeting met een liniaal, een lentedagboek met wekelijkse observaties en laat hen lentegedichtjes schrijven met rijmwoorden.',
    parentTakeaway: 'De lente is een gratis rekenles buiten de deur in groep 1-2. Ga samen wandelen en tel de bloemen: hoeveel krokussen, hoeveel tulpen? Meer of minder? Volg samen een knop tot bloem en bespreek de stappen. Na een lentewerkblad kunt u samen een lentekalender bijhouden: elke dag turven wat jullie buiten zien \u2014 dit combineert tellen, schrijven en natuurobservatie in \u00e9\u00e9n dagelijks ritueel.',
    classroomIntegration: 'Het lentethema loopt van maart tot juni in groep 1-2: bij natuur worden seizoensveranderingen geobserveerd en geregistreerd, bij rekenen worden bloemen en dieren geteld en opgeteld, bij taal worden lentewoorden gelezen en een lentedagboek bijgehouden, en bij beeldende vorming worden bloemstillevens en lentecollagen gemaakt. Een klastuintje of zaaiproject biedt wekelijks meetmomenten en registratieoefeningen, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Seizoensveranderingen observeren', emerging: 'benoemt 1\u20132 lentekenmerken met hulp', proficient: 'benoemt zelfstandig 4\u20135 lentekenmerken en registreert observaties in een tabel', advanced: 'vergelijkt lente met andere seizoenen, beschrijft oorzaken en houdt een observatiedagboek bij' },
      { skill: 'Optellen in lentecontext', emerging: 'telt twee groepjes lentevoorwerpen apart maar combineert niet zelfstandig', proficient: 'voert optellingen tot 10 uit met lentebeelden en noteert de som correct', advanced: 'rekent vlot tot 20, lost aftrekopgaven op en formuleert eigen lentesommen' },
      { skill: 'Lentewoorden lezen en schrijven', emerging: 'herkent 2\u20133 lentewoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte lentewoorden op gelinieerd papier', advanced: 'leest langere lentewoorden, schrijft ze correct en gebruikt ze in beschrijvende zinnen' },
    ],
  },

  summer: {
    seoTitle: 'Zomer-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare zomer-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'zomer groep 1-2, zomer oefeningen 5\u20136 jaar, zomer oefeningen groep 1-2, zomer uitprintbaar groep 1-2, zomer werkbladen groep 1-2, zomer activiteiten groep 1-2, zomer leerbladen 5\u20136 jaar, zomer gratis groep 1-2, zomer PDF groep 1-2, zomer rekenen',
    snippetAnswer: 'Zomer-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken strand, ijs en vakantie als context voor optellen tot 10, meten van temperatuur en tijd, patronen in vakantieactiviteiten en zomerwoorden lezen en schrijven. De vakantiesfeer maakt leren zorgeloos en speels. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 biedt het zomerthema een krachtige context voor rekenen en taal in een ontspannen sfeer: vijf- en zesjarigen associëren de zomer met vrijheid, strand en ijs, en die positieve associaties versterken de leermotivatie. De SLO-leerlijnen voor rekenen benadrukken het toepassen van getalbegrip in alledaagse situaties, en de zomer biedt die situaties overvloedig: ijsjes tellen en optellen, schelpen sorteren op grootte, en vakantiedagen aftellen op de kalender. Meten wordt concreet via temperatuur (warm/koud), tijdsbegrip via de lange zomerdagen, en classificatie via strandvondsten. Taalkundig zijn zomerwoorden motiverend en veelzijdig: zon, zee, ijs, zand \u2014 korte woorden die kinderen dagelijks gebruiken. Het zomerthema biedt ook kansen voor functioneel schrijven: een vakantiekaart, een ijsjeslijst, een strandschelpen-inventaris.',
    developmentalMilestones: [
      { milestone: 'Optellen in vakantiecontext (5\u20136-jarigen rekenen met zomervoorwerpen)', howWeAddress: 'Optelopdrachten met ijsjes, schelpen en strandballen maken rekenen tot een vakantieactiviteit die kinderen intrinsiek motiveert' },
      { milestone: 'Meten en vergelijken (kinderen ervaren temperatuur, lengte en hoeveelheid)', howWeAddress: 'Meetactiviteiten met zomerthema\u2019s (hoe warm is het? hoe lang is de schaduw?) introduceren meetconcepten in een ervaarbare context' },
      { milestone: 'Classificatie van strandvondsten (sorteren op meerdere kenmerken)', howWeAddress: 'Sorteeractiviteiten met schelpen, stenen en zeeglas oefenen classificatie op kleur, grootte en vorm met authentiek materiaal' },
      { milestone: 'Zomerwoorden lezen en schrijven (seizoensgebonden taalverwerving)', howWeAddress: 'Woordpuzzel- en schrijfactiviteiten met zomerwoorden (zon, zee, ijs, zand) oefenen beginlezen met woorden die dagelijks in de zomer voorkomen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk optelling tot onder de 5, gebruik echte schelpen of plastic ijsjes als concreet materiaal, en bied woordkaarten met zomerafbeeldingen. Voor gevorderde kinderen: introduceer aftrekking, een temperatuurgrafiek bijhouden, vakantieverslagen schrijven en laat hen een strandschelpen-inventaris maken met tellingen en beschrijvingen.',
    parentTakeaway: 'De zomer biedt eindeloze rekenkansen in groep 1-2. Tel samen ijsbolletjes: hoeveel hebben we in totaal? Sorteer schelpen op het strand: welke is de grootste? Houd een zomerkalender bij en tel af naar het vakantie-uitje. Na een zomerwerkblad kunt u samen een vakantiedagboek starten: elke dag iets tekenen, een zin schrijven en turven hoeveel ijsjes er zijn gegeten \u2014 rekenen, schrijven en herinneringen bewaren in \u00e9\u00e9n activiteit.',
    classroomIntegration: 'Het zomerthema werkt in groep 1-2 als een feestelijke afsluiting van het schooljaar: bij rekenen worden zomervoorwerpen geteld en opgeteld, bij taal worden zomerwoorden gelezen en vakantieplannen beschreven, bij natuur worden zomerkenmerken en temperatuur besproken, en bij beeldende vorming worden strandtaferelen gemaakt. Een zomertafel in de klas met schelpen, zonnebrillen en zand biedt concreet sorteer- en telmateriaal, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Optellen in zomercontext', emerging: 'telt twee groepjes zomervoorwerpen apart maar combineert niet zelfstandig', proficient: 'voert optellingen tot 10 uit met zomerbeelden en noteert de som correct', advanced: 'rekent vlot tot 20, lost aftrekopgaven op en formuleert eigen zomersommen' },
      { skill: 'Classificatie van zomervondsten', emerging: 'sorteert schelpen op \u00e9\u00e9n kenmerk (grootte) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken (kleur \u00e9n grootte) en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en legt de redenering uit' },
      { skill: 'Zomerwoorden lezen en schrijven', emerging: 'herkent 2\u20133 zomerwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte zomerwoorden op gelinieerd papier', advanced: 'leest langere zomerwoorden, schrijft ze correct en houdt een vakantiedagboek bij' },
    ],
  },

  superheroes: {
    seoTitle: 'Superhelden-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare superhelden-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'superhelden groep 1-2, superhelden oefeningen 5\u20136 jaar, superhelden oefeningen groep 1-2, superhelden uitprintbaar groep 1-2, superhelden werkbladen groep 1-2, superhelden activiteiten groep 1-2, superhelden leerbladen 5\u20136 jaar, superhelden gratis groep 1-2, superhelden PDF groep 1-2, superhelden rekenen',
    snippetAnswer: 'Superhelden-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken helden, maskers en superkrachten als context voor optellen tot 10, patroonherkenning, symmetrie in superheldenkostuums en heldenwoorden lezen en schrijven. De fantasie maakt leren tot een avontuur. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 biedt het superheldenthema een fantasierijke context die de intrinsieke motivatie voor rekenen en taal maximaal aanspreekt: vijf- en zesjarigen identificeren zich met helden en willen zelf \u201erekensuperkrachten\u201d en \u201eleessuperkrachten\u201d ontwikkelen. De SLO-leerlijnen voor rekenen benadrukken het opbouwen van rekenzelvertrouwen, en het superheldenverhaal \u2014 elke opgeloste som is een missie volbracht \u2014 bouwt dat zelfvertrouwen spelenderwijs op. Rekenkundig biedt het thema optelling (vijf helden in het team plus drie erbij), symmetrie in kostuumontwerpen, en patroonherkenning in superheldensymbolen. Taalkundig stimuleert het thema creatief denken: kinderen bedenken namen, beschrijven krachten en schrijven korte heldenverhalen. De morele dimensie van superhelden \u2014 helpen, beschermen, eerlijk zijn \u2014 sluit aan bij de SLO-doelen voor burgerschap en sociaal-emotioneel leren.',
    developmentalMilestones: [
      { milestone: 'Optellen als \u201emissie\u201d (5\u20136-jarigen ontwikkelen rekenzelvertrouwen via verhaallijn)', howWeAddress: 'Optelopdrachten verpakt als heldenmissies (red vijf mensen plus nog drie) transformeren rekenangst in rekenenthousiasme' },
      { milestone: 'Symmetrie in kostuumontwerp (kinderen herkennen en cre\u00ebren spiegelbeelden)', howWeAddress: 'Symmetrie-activiteiten met superheldenkostuums laten kinderen de spiegellijn ontdekken en symmetrische ontwerpen maken' },
      { milestone: 'Patroonherkenning in superheldensymbolen (kinderen zetten patronen voort)', howWeAddress: 'Patroonactiviteiten met superheldensymbolen en -kleuren bouwen het algebra\u00efsch denken op via herhaalde reeksen' },
      { milestone: 'Heldenwoorden lezen en schrijven (fantasierijke taalverwerving)', howWeAddress: 'Woordpuzzel- en schrijfactiviteiten met heldenwoorden (held, masker, cape, kracht) combineren beginlezen met creatief denken' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk optelling tot onder de 5, gebruik superheldenfiguurtjes als concreet materiaal, en bied eenvoudige missiekaarten met visuele ondersteuning. Voor gevorderde kinderen: introduceer aftrekking, sommen tot 20, laat hen een eigen superheld ontwerpen met symmetrisch kostuum en een kort heldenverhaal schrijven.',
    parentTakeaway: 'Superhelden maken rekenen tot een avontuur in groep 1-2. Geef uw kind \u201erekenmissies\u201d: hoeveel knuffels kun jij redden als je er eerst drie pakt en dan nog vier? Ontwerp samen een superheldenkostuum en bespreek de symmetrie: is het links hetzelfde als rechts? Na een superheldenwerkblad kunt u samen een heldenboekje maken met een zelfbedachte superheld, een beschrijving van de krachten en een rekenmissie \u2014 fantasie, schrijven en rekenen in \u00e9\u00e9n creatief project.',
    classroomIntegration: 'Het superheldenthema werkt in groep 1-2 als een motiverend kader voor de hele week: bij rekenen worden heldenmissies opgelost (optellen, patronen), bij taal worden heldenwoorden gelezen en superheldenverhalen verzonnen, bij beeldende vorming worden symmetrische kostuums ontworpen, en bij sociaal-emotioneel leren worden heldenwaarden besproken: helpen, eerlijk zijn, samenwerken. Een heldenmuur in de klas waarop voltooide missies worden bijgehouden biedt dagelijks rekenoverzicht, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Optellen in heldencontext', emerging: 'telt twee groepjes apart maar combineert niet zelfstandig', proficient: 'voert optellingen tot 10 uit in heldenmissies en noteert de som correct', advanced: 'rekent vlot tot 20, lost aftrekopgaven op en formuleert eigen heldensommen' },
      { skill: 'Symmetrie in kostuumontwerp', emerging: 'herkent symmetrie in eenvoudige vormen met hulp', proficient: 'vindt zelfstandig de spiegellijn in superheldenkostuums en voltooit symmetrische ontwerpen', advanced: 'ontwerpt eigen symmetrische figuren en legt het symmetrieconcept uit' },
      { skill: 'Heldenwoorden lezen en schrijven', emerging: 'herkent 2\u20133 heldenwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 heldenwoorden op gelinieerd papier', advanced: 'leest langere woorden, schrijft ze correct en gebruikt ze in korte heldenverhalen' },
    ],
  },

  toys: {
    seoTitle: 'Speelgoed-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare speelgoed-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'speelgoed groep 1-2, speelgoed oefeningen 5\u20136 jaar, speelgoed oefeningen groep 1-2, speelgoed uitprintbaar groep 1-2, speelgoed werkbladen groep 1-2, speelgoed activiteiten groep 1-2, speelgoed leerbladen 5\u20136 jaar, speelgoed gratis groep 1-2, speelgoed PDF groep 1-2, speelgoed rekenen',
    snippetAnswer: 'Speelgoed-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken blokken, poppen en auto\u2019s als context voor optellen tot 10, classificatie op meerdere kenmerken, meten en speelgoedwoorden lezen en schrijven. Het herkenbare thema maakt abstract rekenen direct tastbaar. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het speelgoedthema een springplank voor meervoudige classificatie en functioneel rekenen: vijf- en zesjarigen kunnen speelgoed niet alleen tellen maar ook sorteren op kleur, materiaal, grootte en functie \u2014 een complexere classificatie dan in de kleuterklas. De SLO-leerlijnen voor rekenen benadrukken het ordenen en classificeren als wiskundig fundament, en de speelgoedkist biedt het meest herkenbare oefenmateriaal. Rekenkundig biedt het thema optelling (drie blokken plus vijf erbij), verdeling (hoeveel auto\u2019s per kind bij eerlijk delen?), en meting (welke pop is het langst?). Taalkundig zijn speelgoedwoorden ideaal voor beginlezen: korte, alledaagse woorden als pop, bal, auto en blok die kinderen dagelijks gebruiken. Het thema stimuleert ook verantwoordelijkheid: opruimen is classificeren, delen is verdelen \u2014 rekenvaardigheden met een sociaal-emotionele dimensie.',
    developmentalMilestones: [
      { milestone: 'Meervoudige classificatie (5\u20136-jarigen sorteren speelgoed op twee of meer kenmerken)', howWeAddress: 'Sorteeractiviteiten waarbij speelgoed wordt geordend op kleur \u00e9n materiaal \u00e9n grootte bouwen het classificatievermogen systematisch op' },
      { milestone: 'Eerlijk verdelen (kinderen verdelen speelgoed gelijkmatig over groepen)', howWeAddress: 'Verdeelactiviteiten waarbij kinderen speelgoed eerlijk verdelen over twee of drie groepen introduceren het deelconcept concreet' },
      { milestone: 'Meten en vergelijken (kinderen meten speelgoed in niet-standaard eenheden)', howWeAddress: 'Meetactiviteiten waarbij kinderen speelgoed meten in blokjes of handbreedtes bouwen het meetbegrip op met tastbaar materiaal' },
      { milestone: 'Speelgoedwoorden lezen en schrijven (functioneel vocabulaire)', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met speelgoedwoorden (pop, bal, auto, blok) oefenen beginlezen met alledaags vocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk classificatie tot twee categorie\u00ebn (groot/klein), gebruik echt speelgoed als referentie, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer classificatie op drie kenmerken, laat hen een speelgoedwinkel spelen met prijzen en optelling, en laat hen een speelgoedcatalogus schrijven met beschrijvingen.',
    parentTakeaway: 'De speelgoedkist is een rekenparadijs in groep 1-2. Laat uw kind het speelgoed sorteren bij het opruimen: alle auto\u2019s bij elkaar, alle poppen bij elkaar. Hoeveel van elk? Tel samen en vergelijk. Verdeel speelgoed eerlijk als een vriendje komt spelen: hoeveel auto\u2019s ieder? Na een speelgoedwerkblad kunt u samen een speelgoedinventaris maken: tellen, opschrijven en sorteren \u2014 opruimen wordt een reken- en schrijfactiviteit.',
    classroomIntegration: 'Het speelgoedthema integreert in groep 1-2 met rekenen (tellen, classificeren, verdelen, meten), taal (speelgoedwoorden lezen en schrijven, een verlanglijst maken), sociaal-emotioneel leren (delen, om de beurt, opruimen) en wereldori\u00ebntatie (waar komt speelgoed vandaan?). Een speelgoedwinkel in de klassenhoek combineert rollenspel met functioneel rekenen en schrijven, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Speelgoedclassificatie', emerging: 'sorteert speelgoed op \u00e9\u00e9n kenmerk (kleur) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken (kleur \u00e9n grootte) en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en legt de redenering uit' },
      { skill: 'Eerlijk verdelen', emerging: 'verdeelt met hulp maar maakt ongelijke groepen', proficient: 'verdeelt zelfstandig speelgoed in gelijke groepen bij twee of drie kinderen', advanced: 'verdeelt in ongelijke aantallen, berekent het verschil en past de verdeling aan' },
      { skill: 'Speelgoedwoorden lezen en schrijven', emerging: 'herkent 2\u20133 speelgoedwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte speelgoedwoorden', advanced: 'schrijft langere woorden correct en maakt beschrijvende lijsten of een catalogus' },
    ],
  },

  transportation: {
    seoTitle: 'Vervoer-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare vervoer-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vervoer groep 1-2, vervoer oefeningen 5\u20136 jaar, vervoer oefeningen groep 1-2, vervoer uitprintbaar groep 1-2, vervoer werkbladen groep 1-2, vervoer activiteiten groep 1-2, vervoer leerbladen 5\u20136 jaar, vervoer gratis groep 1-2, vervoer PDF groep 1-2, vervoer rekenen',
    snippetAnswer: 'Vervoer-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken auto\u2019s, treinen en vliegtuigen als context voor optellen tot 10, classificatie op voortbewegingswijze, snelheidsvergelijking en vervoerwoorden lezen en schrijven. De fascinatie voor voertuigen maakt rekenen tot een reis. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het vervoerthema een kader voor classificatie, ruimtelijk denken en maatschappijbegrip: vijf- en zesjarigen ontdekken dat voertuigen kunnen worden ingedeeld op voortbewegingswijze (wielen, rails, water, lucht), op brandstof, en op functie (personen, goederen, hulpdiensten). De SLO-leerlijnen voor natuur en techniek benadrukken het verkennen van technologie in de eigen omgeving, en vervoer is de meest zichtbare technologie voor jonge kinderen. Rekenkundig biedt het thema optelling (drie bussen plus twee treinen), groottevergelijking (van fiets tot vliegtuig), snelheidsvergelijking en routeplanning. Taalkundig zijn vervoerwoorden enorm gevarieerd \u2014 van korte woorden als bus, trein en boot tot langere als helikopter en locomotief \u2014 waardoor het thema differentiatie in beginlezen ondersteunt.',
    developmentalMilestones: [
      { milestone: 'Classificatie op voortbewegingswijze (5\u20136-jarigen groeperen voertuigen op hoe ze bewegen)', howWeAddress: 'Sorteeractiviteiten met voertuigen (weg, rails, water, lucht) bouwen het classificatievermogen op met een logisch en visueel aantrekkelijk systeem' },
      { milestone: 'Grootte- en snelheidsvergelijking (kinderen ordenen voertuigen)', howWeAddress: 'Vergelijkingsactiviteiten waarbij kinderen voertuigen ordenen van langzaam naar snel en van klein naar groot bouwen orderings- en meetvocabulaire op' },
      { milestone: 'Optellen met voertuigen (kinderen rekenen met vervoermiddelen)', howWeAddress: 'Optelopdrachten met voertuigen (drie auto\u2019s plus vier bussen) maken rekenen tot een verkeersscenario dat kinderen herkennen' },
      { milestone: 'Vervoerwoorden lezen en schrijven (variatie in woordlengte)', howWeAddress: 'Woordactiviteiten met korte (bus, trein) en langere (vliegtuig, helikopter) vervoerwoorden bieden gedifferentieerd leesmateriaal' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vier herkenbare voertuigen (auto, bus, trein, fiets), gebruik speelgoedvoertuigen als concreet materiaal, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer alle voortbewegingswijzen, laat hen een vervoerskaart tekenen met routes, en schrijf korte beschrijvingen van elk voertuig met snelheids- en groottevergelijkingen.',
    parentTakeaway: 'Verkeer is overal en biedt gratis rekenlessen in groep 1-2. Tel samen voertuigen onderweg: hoeveel auto\u2019s? Hoeveel bussen? Welke zijn er meer? Vergelijk de grootte van voertuigen die jullie tegenkomen. Na een vervoerwerkblad kunt u samen een vervoerboek maken: voor elk voertuig een tekening, de naam opschrijven en een feitje noteren \u2014 dit combineert schrijven, tekenen en classificeren.',
    classroomIntegration: 'Het vervoerthema integreert in groep 1-2 met rekenen (voertuigen tellen, optellen, vergelijken op grootte en snelheid), taal (vervoerwoorden lezen en schrijven), techniek (hoe bewegen voertuigen? wielen, propellers, motoren) en wereldori\u00ebntatie (verkeersveiligheid, openbaar vervoer). Een verkeershoek met speelgoedvoertuigen en een plattegrond stimuleert classificatie en routeplanning, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Voertuigclassificatie', emerging: 'sorteert voertuigen op \u00e9\u00e9n kenmerk (grootte) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken (voortbewegingswijze \u00e9n functie) en benoemt de groepen', advanced: 'classificeert op drie kenmerken, vergelijkt systemen en legt de logica uit' },
      { skill: 'Optellen met voertuigen', emerging: 'telt twee groepjes voertuigen apart maar combineert niet zelfstandig', proficient: 'voert optellingen tot 10 uit met voertuigbeelden en noteert de som correct', advanced: 'rekent vlot tot 20, lost aftrekopgaven op en formuleert eigen vervoersommen' },
      { skill: 'Vervoerwoorden lezen en schrijven', emerging: 'herkent 2\u20133 korte vervoerwoorden met hulp', proficient: 'leest en schrijft zelfstandig 5\u20137 vervoerwoorden van variabele lengte', advanced: 'leest langere vervoerwoorden vlot en schrijft beschrijvende zinnen over voertuigen' },
    ],
  },

  travel: {
    seoTitle: 'Reizen-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare reizen-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'reizen groep 1-2, reizen oefeningen 5\u20136 jaar, reizen oefeningen groep 1-2, reizen uitprintbaar groep 1-2, reizen werkbladen groep 1-2, reizen activiteiten groep 1-2, reizen leerbladen 5\u20136 jaar, reizen gratis groep 1-2, reizen PDF groep 1-2, reizen rekenen',
    snippetAnswer: 'Reizen-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken koffers, landkaarten en bestemmingen als context voor optellen tot 10, ruimtelijk denken, afstandsbegrip en reiswoorden lezen en schrijven. De avontuurlijke sfeer maakt rekenen tot een wereldreis. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 biedt het reisthema een kader voor ruimtelijk denken en cultureel bewustzijn: vijf- en zesjarigen ontdekken dat de wereld groter is dan hun eigen buurt, dat reizen plannen vereist en dat kaarten de wereld in het klein weergeven. De SLO-leerlijnen voor aardrijkskunde benadrukken het verkennen van de wereld voorbij de directe omgeving, en het reisthema maakt die verkenning tastbaar. Rekenkundig biedt het thema optelling (vijf koffers inpakken plus drie cadeautjes), afstandsvergelijking (welk land is verder weg?), en tijdsbegrip (hoeveel dagen duurt de vakantie?). Taalkundig stimuleert reizen functioneel schrijven: ansichtkaarten, paklijsten en reisdagboeken. De multiculturele dimensie sluit aan bij de SLO-doelen voor burgerschap: kinderen leren dat mensen op verschillende plekken anders leven en toch veel gemeen hebben.',
    developmentalMilestones: [
      { milestone: 'Ruimtelijk denken met kaarten (5\u20136-jarigen ontdekken dat kaarten de wereld weergeven)', howWeAddress: 'Eenvoudige kaartactiviteiten waarbij kinderen bestemmingen aanwijzen en routes tekenen bouwen het ruimtelijk voorstellingsvermogen op' },
      { milestone: 'Optellen bij het inpakken (kinderen rekenen met reisbenodigdheden)', howWeAddress: 'Optelopdrachten met koffers en reisartikelen (vier shirts plus drie broeken) maken rekenen functioneel en planmatig' },
      { milestone: 'Tijds- en afstandsbegrip (kinderen vergelijken reisduur en afstand)', howWeAddress: 'Vergelijkingsactiviteiten met reisbestemmingen (dichtbij/ver, kort/lang) introduceren abstracte begrippen via concrete reiservaring' },
      { milestone: 'Reiswoorden lezen en schrijven (functioneel en cultureel vocabulaire)', howWeAddress: 'Woordactiviteiten met reiswoorden (kaart, koffer, vliegtuig, strand) combineren beginlezen met wereldori\u00ebntatie' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot bekende bestemmingen (oma, strand, dierentuin), gebruik een eenvoudige plattegrond in plaats van een wereldkaart, en bied woordkaarten met reisafbeeldingen. Voor gevorderde kinderen: introduceer een wereldkaart met continenten, laat hen een reisdagboek schrijven en een paklijst opstellen met tellingen, en voeg afstandsvergelijkingen toe.',
    parentTakeaway: 'Elke reis \u2014 zelfs een dagje uit \u2014 is een rekenles in groep 1-2. Laat uw kind meehelpen inpakken en tellen: hoeveel shirts? Hoeveel sokken? Tel samen de koffer. Bekijk samen een kaart: waar gaan we heen? Is dat ver of dichtbij? Na een reiswerkblad kunt u samen een reisplanner maken: bestemming kiezen, paklijst schrijven, en de dagen aftellen op de kalender \u2014 rekenen, schrijven en plannen in \u00e9\u00e9n avontuurlijk project.',
    classroomIntegration: 'Het reisthema werkt in groep 1-2 als een vakoverstijgend project: bij rekenen worden reisartikelen geteld en opgeteld, bij taal worden reiswoorden gelezen en ansichtkaarten geschreven, bij aardrijkskunde worden bestemmingen op de kaart aangewezen, en bij burgerschap worden verschillende culturen verkend. Een reisbureau in de klassenhoek combineert rollenspel met functioneel schrijven en rekenen, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Ruimtelijk denken met kaarten', emerging: 'wijst de eigen woonplaats aan met hulp maar ori\u00ebnteert niet zelfstandig', proficient: 'wijst zelfstandig 3\u20134 bestemmingen aan op een eenvoudige kaart en tekent een route', advanced: 'gebruikt de wereldkaart, vergelijkt afstanden en beschrijft routes met richtingswoorden' },
      { skill: 'Optellen bij het inpakken', emerging: 'telt reisartikelen maar voert geen optellingen zelfstandig uit', proficient: 'voert optellingen tot 10 uit met reisartikelen en noteert correct', advanced: 'rekent tot 20, maakt een paklijst met hoeveelheden en berekent het totaal' },
      { skill: 'Reiswoorden lezen en schrijven', emerging: 'herkent 2\u20133 reiswoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte reiswoorden op gelinieerd papier', advanced: 'leest langere reiswoorden, schrijft ze correct en maakt een reisdagboek' },
    ],
  },

  vegetables: {
    seoTitle: 'Groenten-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare groenten-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'groenten groep 1-2, groenten oefeningen 5\u20136 jaar, groenten oefeningen groep 1-2, groenten uitprintbaar groep 1-2, groenten werkbladen groep 1-2, groenten activiteiten groep 1-2, groenten leerbladen 5\u20136 jaar, groenten gratis groep 1-2, groenten PDF groep 1-2, groenten rekenen',
    snippetAnswer: 'Groenten-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken wortels, tomaten en paprika\u2019s als context voor optellen tot 10, gewichtsvergelijking, classificatie op kleur en vorm en groentewoorden lezen en schrijven. Gezond eten en rekenen gaan hand in hand. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het groententhema een veelzijdig leerplatform dat rekenen, taal en gezondheid verbindt: vijf- en zesjarigen zijn klaar om groenten niet alleen te tellen maar ook op te tellen, te wegen en te vergelijken. De SLO-leerlijnen voor natuur en gezondheid benadrukken het belang van gevarieerd eten, en het groententhema maakt die boodschap concreet door groenten in rekenactiviteiten te verwerken. Classificatie wordt complexer: kinderen sorteren groenten op kleur, vorm, groeiwijze (ondergronds/bovengronds) en seizoen. Wegen en vergelijken biedt meetoefeningen: welke pompoen is het zwaarst? Hoeveel wortels wegen evenveel als \u00e9\u00e9n paprika? Taalkundig zijn groentewoorden gevarieerd: van korte woorden als ui en biet tot langere als bloemkool en courgette, waardoor differentiatie in beginlezen mogelijk is.',
    developmentalMilestones: [
      { milestone: 'Optellen en wegen met groenten (5\u20136-jarigen rekenen in keuken- en tuincontext)', howWeAddress: 'Optelopdrachten met groentebeelden en weegactiviteiten (drie tomaten plus vier wortels) verbinden rekenen met kookervaring' },
      { milestone: 'Meervoudige classificatie (kinderen sorteren groenten op kleur, vorm en groeiwijze)', howWeAddress: 'Sorteeractiviteiten met groenten op meerdere kenmerken (groen/rood, rond/lang, ondergronds/bovengronds) bouwen systematisch classificatievermogen op' },
      { milestone: 'Gewichtsvergelijking (kinderen schatten en vergelijken gewichten)', howWeAddress: 'Weegactiviteiten waarbij kinderen groenten op hand schatten en daarna controleren bouwen het meetbegrip op via directe ervaring' },
      { milestone: 'Groentewoorden lezen en schrijven (gezondheids- en keukenvocabulaire)', howWeAddress: 'Woordactiviteiten met groentewoorden (ui, biet, wortel, tomaat) oefenen beginlezen met functioneel keukenvocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vijf herkenbare groenten, gebruik plastic groenten als concreet materiaal, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer alle groeiwijzen, laat hen een groentetuinplan tekenen met tellingen, en schrijf recepten met hoeveelheden en weegresultaten.',
    parentTakeaway: 'De keuken en supermarkt bieden dagelijks rekenlessen met groenten in groep 1-2. Laat uw kind groenten tellen en sorteren bij het boodschappen doen: hoeveel tomaten? Welke paprika is het zwaarst? Sorteer de groenten thuis op kleur. Na een groentenwerkblad kunt u samen een eenvoudig recept volgen en de ingredi\u00ebnten tellen, wegen en opschrijven \u2014 rekenen, lezen en gezond eten in \u00e9\u00e9n kookactiviteit.',
    classroomIntegration: 'Het groententhema integreert in groep 1-2 met rekenen (tellen, optellen, wegen, classificeren), taal (groentewoorden lezen en schrijven, een recept lezen), gezondheid (gevarieerd eten, vitamines) en natuur (groeiwijzen, seizoensgroenten, schooltuin). Een kookactiviteit in de klas combineert meten, tellen en taalactiviteiten. Werkbladen worden ingezet bij zelfstandig rekenen en bij de taalactiviteiten, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Optellen en wegen met groenten', emerging: 'telt groenten maar voert geen optellingen of gewichtsvergelijkingen zelfstandig uit', proficient: 'voert optellingen tot 10 uit en vergelijkt twee groenten op gewicht correct', advanced: 'rekent tot 20, ordent drie of meer groenten op gewicht en formuleert eigen rekenvragen' },
      { skill: 'Groenteclassificatie', emerging: 'sorteert groenten op \u00e9\u00e9n kenmerk (kleur) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken (kleur \u00e9n groeiwijze) en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en legt de redenering uit' },
      { skill: 'Groentewoorden lezen en schrijven', emerging: 'herkent 2\u20133 groentewoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte groentewoorden op gelinieerd papier', advanced: 'leest langere groentewoorden, schrijft ze correct en maakt een receptenlijst' },
    ],
  },

  weather: {
    seoTitle: 'Weer-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare weer-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'weer groep 1-2, weer oefeningen 5\u20136 jaar, weer oefeningen groep 1-2, weer uitprintbaar groep 1-2, weer werkbladen groep 1-2, weer activiteiten groep 1-2, weer leerbladen 5\u20136 jaar, weer gratis groep 1-2, weer PDF groep 1-2, weer rekenen',
    snippetAnswer: 'Weer-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken zon, regen en sneeuw als context voor optellen tot 10, temperatuurvergelijking, weerregistratie en weerwoorden lezen en schrijven. Het dagelijks wisselende weer maakt elke rekenles actueel. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het weerthema een dagelijks terugkerend kader voor meten, registreren en analyseren: vijf- en zesjarigen kunnen het weer niet alleen beschrijven maar ook systematisch bijhouden en vergelijken. De SLO-leerlijnen voor natuur benadrukken het waarnemen en registreren van natuurverschijnselen, en weer is het meest toegankelijke onderwerp \u2014 het verandert dagelijks en elk kind ervaart het. Rekenkundig biedt het thema rijke contexten: temperatuur vergelijken (warmer/kouder), weerdagen turven en een grafiek maken, regendruppels tellen en optellen. Taalkundig zijn weerwoorden basisvocabulaire dat kinderen dagelijks gebruiken: zon, regen, wind, sneeuw, wolk \u2014 korte woorden ideaal voor beginlezen. Het thema stimuleert ook wetenschappelijk denken: voorspellen, meten en controleren \u2014 de kern van de wetenschappelijke methode op kindniveau.',
    developmentalMilestones: [
      { milestone: 'Systematisch observeren en registreren (5\u20136-jarigen houden een weerkalender bij)', howWeAddress: 'Weerkalender-activiteiten waarbij kinderen dagelijks het weer observeren en turven bouwen de vaardigheid op om systematisch gegevens te verzamelen' },
      { milestone: 'Temperatuurvergelijking (kinderen begrijpen warm/koud als meetbaar verschil)', howWeAddress: 'Temperatuuractiviteiten met eenvoudige thermometers laten kinderen ervaren dat warmte meetbaar is en vergelijkbaar' },
      { milestone: 'Eenvoudige grafieken maken (kinderen visualiseren weergegevens)', howWeAddress: 'Grafiekactiviteiten waarbij kinderen turven omzetten in een staafgrafiek introduceren datavisualisatie via het dagelijkse weer' },
      { milestone: 'Weerwoorden lezen en schrijven (dagelijks vocabulaire)', howWeAddress: 'Woordactiviteiten met weerwoorden (zon, regen, wind, sneeuw) oefenen beginlezen met woorden die kinderen elke dag gebruiken' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vier weertypen (zon, regen, bewolkt, sneeuw) met pictogrammen, gebruik een eenvoudige turftabel, en bied overtrekkaarten voor weerwoorden. Voor gevorderde kinderen: introduceer een thermometer met graden, laat hen een weekgrafiek maken met analyse (welke dag was het warmst?), en schrijf weerbulletins met volledige zinnen.',
    parentTakeaway: 'Het weer biedt dagelijks een gratis rekenles in groep 1-2. Kijk samen elke ochtend naar buiten: welk weer is het? Houd een weekkalender bij met weerpictogrammen. Op vrijdag tellen jullie samen: hoeveel zonnige dagen? Hoeveel regendagen? Na een weerwerkblad kunt u samen een weergrafiek maken voor de hele maand \u2014 turven, tellen en vergelijken, en bespreken welk weer het vaakst voorkwam.',
    classroomIntegration: 'Het weerthema loopt het hele jaar door in groep 1-2: de dagelijkse weerbespreking biedt een vast rekenmoment (turven, tellen, vergelijken), bij taal worden weerwoorden gelezen en een weerverslag geschreven, bij natuur worden seizoenspatronen besproken, en bij beeldende vorming worden weertaferelen gemaakt. De weerkalender in de klas is tegelijk rekenhulpmiddel en taalprikkel, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Weerobservatie en registratie', emerging: 'beschrijft het weer mondeling maar registreert nog niet zelfstandig', proficient: 'turft zelfstandig het dagelijkse weer en vult de weerkalender correct in', advanced: 'analyseert weekgegevens, maakt een grafiek en trekt conclusies over patronen' },
      { skill: 'Temperatuurvergelijking', emerging: 'gebruikt warm/koud maar vergelijkt niet systematisch', proficient: 'vergelijkt temperaturen van twee dagen correct en beschrijft het verschil', advanced: 'leest een eenvoudige thermometer, ordent temperaturen en berekent het verschil' },
      { skill: 'Weerwoorden lezen en schrijven', emerging: 'herkent 2\u20133 weerwoorden met hulp van pictogrammen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte weerwoorden op gelinieerd papier', advanced: 'leest langere weerwoorden, schrijft ze correct en maakt een weerbulletin' },
    ],
  },

  winter: {
    seoTitle: 'Winter-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare winter-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'winter groep 1-2, winter oefeningen 5\u20136 jaar, winter oefeningen groep 1-2, winter uitprintbaar groep 1-2, winter werkbladen groep 1-2, winter activiteiten groep 1-2, winter leerbladen 5\u20136 jaar, winter gratis groep 1-2, winter PDF groep 1-2, winter rekenen',
    snippetAnswer: 'Winter-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken sneeuw, ijs en winterkleding als context voor optellen tot 10, symmetrie in sneeuwvlokken, temperatuurmeting en winterwoorden lezen en schrijven. De koude seizoensfeer maakt rekenen gezellig en seizoensgebonden. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 biedt het winterthema een rijke context voor meten, symmetrie en seizoensbegrip: vijf- en zesjarigen ervaren de winter intens \u2014 koude handen, sneeuw, korte dagen \u2014 en die directe ervaring maakt abstracte concepten als temperatuur en symmetrie tastbaar. De SLO-leerlijnen voor natuur benadrukken het waarnemen van seizoensveranderingen, en winter biedt de meest dramatische veranderingen: bevriezing, sneeuwval, bladval. Rekenkundig biedt het thema optelling (drie sneeuwballen plus vier erbij), symmetrie in sneeuwvlokken en ijskristallen, en temperatuurmeting (vrieskoude versus kamertemperatuur). Taalkundig zijn winterwoorden sfeervol en motiverend: sneeuw, ijs, muts, sjaal, slee \u2014 korte woorden die kinderen dagelijks gebruiken in het winterseizoen. Het aankleedmoment (\u201ehoeveel kledingstukken trek je aan?\u201d) is een dagelijkse rekenactiviteit.',
    developmentalMilestones: [
      { milestone: 'Symmetrie in sneeuwvlokken (5\u20136-jarigen ontdekken spiegelbeeldsymmetrie in de natuur)', howWeAddress: 'Sneeuwvlok-symmetrie-activiteiten laten kinderen de spiegellijn ontdekken en symmetrische patronen voltooien met winterbeelden' },
      { milestone: 'Temperatuurervaring en -vergelijking (kinderen begrijpen warm/koud als meetbaar)', howWeAddress: 'Winterse temperatuuractiviteiten waarbij kinderen binnen en buiten vergelijken maken het abstracte begrip temperatuur ervaringsgericht' },
      { milestone: 'Optellen met wintercontext (kinderen rekenen met sneeuwballen, kledingstukken en winterdieren)', howWeAddress: 'Optelopdrachten met winterbeelden (vijf sneeuwballen plus drie erbij) combineren rekenen met het geliefde winterthema' },
      { milestone: 'Winterwoorden lezen en schrijven (seizoensgebonden vocabulaire)', howWeAddress: 'Woordpuzzel- en schrijfactiviteiten met winterwoorden (sneeuw, ijs, muts, sjaal) oefenen beginlezen met dagelijks wintervocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk optelling tot onder de 5, gebruik winterattributen (wanten, muts) als telmiddel, en bied overtrekkaarten voor winterwoorden. Voor gevorderde kinderen: introduceer aftrekking, symmetrie-ontwerpen met eigen patronen, een winterdagboek met temperatuurmetingen en laat hen winterverhalen schrijven.',
    parentTakeaway: 'De winter biedt dagelijks rekenkansen in groep 1-2. Tel samen de winterkledingstukken voor een wandeling: muts, sjaal, jas, wanten, laarzen \u2014 hoeveel? Maak samen een sneeuwpop en bespreek de symmetrie: zijn de ogen gelijk? De knopen recht onder elkaar? Na een winterwerkblad kunt u samen sneeuwvlokken vouwen en knippen en de symmetrie onderzoeken \u2014 dit combineert meetkunde, fijne motoriek en winterpret.',
    classroomIntegration: 'Het winterthema loopt van november tot februari in groep 1-2: bij rekenen worden wintervoorwerpen geteld en opgeteld, sneeuwvloksymmetrie onderzocht en temperatuur vergeleken, bij taal worden winterwoorden gelezen en een winterdagboek bijgehouden, bij natuur worden winterverschijnselen besproken (ijs, sneeuw, winterslaap), en bij beeldende vorming worden symmetrische sneeuwvlokken en winterlandschappen gemaakt, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Symmetrie in wintercontext', emerging: 'herkent symmetrie in een sneeuwvlok met hulp maar voltooit niet zelfstandig', proficient: 'vindt zelfstandig de spiegellijn en voltooit symmetrische winterpatronen', advanced: 'ontwerpt eigen symmetrische sneeuwvlokken en legt het symmetrieconcept uit' },
      { skill: 'Optellen met winterbeelden', emerging: 'telt twee groepjes wintervoorwerpen apart maar combineert niet zelfstandig', proficient: 'voert optellingen tot 10 uit met winterbeelden en noteert de som correct', advanced: 'rekent vlot tot 20, lost aftrekopgaven op en formuleert eigen wintersommen' },
      { skill: 'Winterwoorden lezen en schrijven', emerging: 'herkent 2\u20133 winterwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte winterwoorden op gelinieerd papier', advanced: 'leest langere winterwoorden, schrijft ze correct en schrijft korte winterverhalen' },
    ],
  },

  xmas: {
    seoTitle: 'Kerst-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kerst-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kerst groep 1-2, kerst oefeningen 5\u20136 jaar, kerst oefeningen groep 1-2, kerst uitprintbaar groep 1-2, kerst werkbladen groep 1-2, kerst activiteiten groep 1-2, kerst leerbladen 5\u20136 jaar, kerst gratis groep 1-2, kerst PDF groep 1-2, kerst rekenen',
    snippetAnswer: 'Kerst-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken kerstbomen, cadeautjes en kerstballen als context voor optellen tot 10, patronen in versieringen, symmetrie en kerstwoorden lezen en schrijven. De magische sfeer maakt elke rekenles tot een feest. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 biedt het kerstthema de meest motiverende context van het hele schooljaar voor rekenen en taal: vijf- en zesjarigen zijn in december zo enthousiast dat elke kerstactiviteit met volle overgave wordt gedaan. De SLO-leerlijnen voor rekenen benadrukken getalbegrip in betekenisvolle contexten, en kerst is voor kinderen de meest betekenisvolle context die er bestaat. Rekenkundig biedt het thema rijke mogelijkheden: cadeautjes tellen en optellen, kerstballen in patronen aan de boom hangen, symmetrie in kerstversieringen ontdekken, en aftellen naar kerstdag. Taalkundig stimuleert kerst zowel functioneel schrijven (kerstkaarten, verlanglijstjes) als woordherkenning (kerstwoorden lezen). De emotionele lading van het thema zorgt voor diepe verankering van geleerde vaardigheden omdat elke rekenactiviteit verbonden is met een sterk positieve herinnering.',
    developmentalMilestones: [
      { milestone: 'Optellen met cadeautjes en versieringen (5\u20136-jarigen rekenen in een emotioneel geladen context)', howWeAddress: 'Optelopdrachten met kerstbeelden (vier cadeautjes onder de boom plus drie erbij) benutten de kerstmotivatie voor maximale rekenbetrokkenheid' },
      { milestone: 'Patroonherkenning in kerstversieringen (kinderen ontdekken herhaling in slingers en ballen)', howWeAddress: 'Versieringpatroon-activiteiten met kerstballen en slingers laten kinderen patronen herkennen, voortzetten en zelf ontwerpen' },
      { milestone: 'Symmetrie in kerstvormen (kerstboom, ster, sneeuwvlok)', howWeAddress: 'Symmetrie-activiteiten met kerstvormen laten kinderen de spiegellijn vinden en symmetrische versieringen voltooien' },
      { milestone: 'Kerstwoorden lezen en schrijven (functioneel en emotioneel vocabulaire)', howWeAddress: 'Kerstkaart- en schrijfactiviteiten met kerstwoorden (boom, ster, kaars, engel) combineren beginlezen met het schrijven van echte kerstwensen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk optelling tot onder de 5, gebruik kerstversieringen als telmiddel, en bied overtrekkaarten voor kerstkaarten. Voor gevorderde kinderen: introduceer aftrekking, sommen tot 20, complexe patronen met drie elementen, en laat hen zelfstandig kerstkaarten schrijven met volledige zinnen en rekenpuzzelkaarten ontwerpen.',
    parentTakeaway: 'December biedt eindeloze rekenkansen in groep 1-2. Laat uw kind meehelpen met het versieren van de kerstboom: hoeveel ballen? In welk patroon? Tel samen de cadeautjes onder de boom. Maak samen een adventskalender en tel dagelijks af. Na een kerstwerkblad kunt u samen kerstkaarten schrijven: uw kind schrijft de wens, tekent een symmetrische kerstboom en berekent hoeveel kaarten er nog verstuurd moeten worden \u2014 rekenen, schrijven en kerstsfeer in \u00e9\u00e9n activiteit.',
    classroomIntegration: 'Het kerstthema is in groep 1-2 het hoogtepunt van de decembermaand: bij rekenen worden cadeautjes geteld en opgeteld, versieringspatronen onderzocht en symmetrie in kerstvormen ontdekt, bij taal worden kerstwoorden gelezen en kerstkaarten geschreven, bij beeldende vorming worden symmetrische versieringen en kerststukjes gemaakt, en bij muziek worden kerstliederen gezongen. De kersthoek in de klas biedt dagelijks tel- en schrijfkansen, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Optellen in kerstcontext', emerging: 'telt cadeautjes en kerstballen maar combineert niet zelfstandig', proficient: 'voert optellingen tot 10 uit met kerstbeelden en noteert de som correct', advanced: 'rekent vlot tot 20, lost aftrekopgaven op en ontwerpt eigen kerstrekenpuzzels' },
      { skill: 'Patroonherkenning in versieringen', emerging: 'herkent een eenvoudig AB-patroon met hulp', proficient: 'herkent en zet zelfstandig ABC-patronen voort in kerstversieringen', advanced: 'ontwerpt eigen complexe patronen en legt het patroonprincipe uit' },
      { skill: 'Kerstwoorden lezen en schrijven', emerging: 'herkent 2\u20133 kerstwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 kerstwoorden en schrijft een korte kerstwens', advanced: 'leest langere woorden, schrijft correcte zinnen en maakt een eigen kerstkaart met tekst' },
    ],
  },

  zoo: {
    seoTitle: 'Dierentuin-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare dierentuin-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dierentuin groep 1-2, dierentuin oefeningen 5\u20136 jaar, dierentuin oefeningen groep 1-2, dierentuin uitprintbaar groep 1-2, dierentuin werkbladen groep 1-2, dierentuin activiteiten groep 1-2, dierentuin leerbladen 5\u20136 jaar, dierentuin gratis groep 1-2, dierentuin PDF groep 1-2, dierentuin rekenen',
    snippetAnswer: 'Dierentuin-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken leeuwen, giraffen en pingu\u00efns als context voor optellen tot 10, dierenclassificatie, groottevergelijking en dierentuinwoorden lezen en schrijven. De fascinerend diverse dierenwereld maakt elke rekenles een expeditie. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het dierentuinthema een kader voor wetenschappelijke classificatie en vergelijking op een hoger niveau dan in de kleuterklas: vijf- en zesjarigen kunnen dieren niet alleen benoemen maar ook indelen op leefgebied (savanne, oerwoud, pool), voedseltype (planteneter, vleeseter) en lichaamskenmerken. De SLO-leerlijnen voor natuur en techniek benadrukken het systematisch observeren en beschrijven van dieren, en de dierentuin biedt de grootste verscheidenheid in \u00e9\u00e9n context. Rekenkundig biedt het thema optelling (drie leeuwen plus vier giraffen), groottevergelijking (van muis tot olifant), en pootentelling als herhaalde optelling. Taalkundig zijn dierentuinwoorden enorm gevarieerd: van korte woorden als aap en leeuw tot langere als nijlpaard en krokodil, waardoor het thema differentiatie in beginlezen uitstekend ondersteunt.',
    developmentalMilestones: [
      { milestone: 'Wetenschappelijke classificatie (5\u20136-jarigen groeperen dieren op leefgebied en voedseltype)', howWeAddress: 'Classificatieactiviteiten met dierentuindieren op leefgebied en voedseltype bouwen het wetenschappelijk categorisatievermogen op' },
      { milestone: 'Groottevergelijking en ordening (kinderen ordenen dieren van klein naar groot)', howWeAddress: 'Vergelijkingsactiviteiten met dierentuindieren (van muis tot olifant) bouwen orderings- en meetvocabulaire op met spectaculaire grootteverschillen' },
      { milestone: 'Optellen met dierentuindieren (kinderen rekenen met verblijfsbezetting)', howWeAddress: 'Optelopdrachten met dieren in verblijven (drie apen plus vier erbij) maken rekenen tot een dierentuinscenario dat kinderen fascineert' },
      { milestone: 'Dierentuinwoorden lezen en schrijven (variatie in woordlengte)', howWeAddress: 'Woordactiviteiten met korte (aap, leeuw) en langere (krokodil, nijlpaard) dierenwoorden bieden gedifferentieerd leesmateriaal' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vijf herkenbare dieren, gebruik dierenfiguurtjes als concreet materiaal, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer alle classificatiecriteria (leefgebied, voedseltype, lichaamskenmerken), laat hen een dierentuingids schrijven, en voeg pootentelling als herhaalde optelling toe.',
    parentTakeaway: 'Een bezoek aan de dierentuin is de ultieme rekenles in groep 1-2. Tel samen de dieren in elk verblijf: hoeveel flamingo\u2019s? Vergelijk groottes: welk dier is het grootst? Sorteer dieren in groepen: welke eten planten, welke eten vlees? Na een dierentuinwerkblad kunt u samen een dierentuinboek maken: voor elk dier een tekening, de naam opschrijven, het verblijf benoemen en een telgegeven toevoegen \u2014 dit combineert schrijven, tekenen en classificeren.',
    classroomIntegration: 'Het dierentuinthema werkt in groep 1-2 als een vakoverstijgend project: bij natuur worden dieren geobserveerd en geclassificeerd, bij rekenen worden dieren geteld, vergeleken op grootte en in verblijven opgeteld, bij taal worden dierenwoorden gelezen en een dierentuingids geschreven, en bij beeldende vorming worden dierentaferelen gemaakt. Een dierentuinhoek in de klas met speelgoeddieren biedt dagelijks sorteer- en telmateriaal, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Dierenclassificatie', emerging: 'benoemt 3\u20134 dierentuindieren maar classificeert niet op kenmerken', proficient: 'classificeert zelfstandig op twee criteria (leefgebied \u00e9n voedseltype) en benoemt de groepen', advanced: 'classificeert op drie criteria, beschrijft kenmerken en presenteert een overzicht' },
      { skill: 'Optellen met dierentuincontext', emerging: 'telt dieren in \u00e9\u00e9n verblijf maar combineert niet bij twee verblijven', proficient: 'voert optellingen tot 10 uit met dierenbeelden en noteert de som correct', advanced: 'rekent vlot tot 20, past herhaalde optelling toe (poten tellen) en formuleert eigen sommen' },
      { skill: 'Dierentuinwoorden lezen en schrijven', emerging: 'herkent 2\u20133 korte dierenwoorden met hulp', proficient: 'leest en schrijft zelfstandig 5\u20137 dierenwoorden van variabele lengte', advanced: 'leest langere dierenwoorden vlot, schrijft ze correct en maakt een dierentuingids' },
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

console.log(`\nDone: ${successCount}/${themes.length} enriched, ${errorCount} errors`);
process.exit(errorCount > 0 ? 1 : 0);
