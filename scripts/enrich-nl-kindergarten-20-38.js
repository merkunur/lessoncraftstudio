#!/usr/bin/env node
/**
 * SEO Part 322: NL Kindergarten Grade Enrichment — Themes 20-38
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the kindergarten grade block of 19 NL theme files (fruits through space).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  fruits: {
    seoTitle: 'Fruit-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare fruit-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'fruit groep 1-2, fruit oefeningen 5\u20136 jaar, fruit oefeningen groep 1-2, fruit uitprintbaar groep 1-2, fruit werkbladen groep 1-2, fruit activiteiten groep 1-2, fruit leerbladen 5\u20136 jaar, fruit gratis groep 1-2, fruit PDF groep 1-2, fruit rekenen',
    snippetAnswer: 'Fruit-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken appels, peren en bessen als context voor optellen tot 10, tellen tot 20, gewichtsvergelijking en fruitwoorden lezen en schrijven. Sorteren op kleur, grootte en smaak bouwt classificatievaardigheden op. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het fruitthema een veelzijdig leerplatform dat rekenen, taal en gezondheid verbindt. Vijf- en zesjarigen zijn klaar om fruit niet alleen te tellen maar ook op te tellen en af te trekken: drie appels in de fruitschaal plus twee erbij is vijf appels. De SLO-leerlijnen voor rekenen benadrukken het belang van getalbegrip in betekenisvolle contexten, en fruit biedt die context dagelijks. Classificatie wordt complexer \u2014 kinderen sorteren op meerdere kenmerken tegelijk: kleur, grootte, smaak en seizoen. Tegelijkertijd zijn korte fruitwoorden als peer, kers en pruim ideaal voor beginlezen en klank-letterkoppeling. Het gezondheidsaspect sluit aan bij de SLO-doelen voor mens en samenleving: kinderen leren dat gevarieerd fruit eten bijdraagt aan een gezond lichaam.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 10 met concrete voorwerpen (5\u20136-jarigen maken de sprong van tellen naar rekenen)', howWeAddress: 'Optelopdrachten met fruitbeelden visualiseren de rekenbewerking: drie appels plus vier appels wordt zichtbaar als \u00e9\u00e9n groep van zeven' },
      { milestone: 'Meervoudige classificatie (kinderen sorteren op twee of meer kenmerken tegelijk)', howWeAddress: 'Sorteeractiviteiten waarbij fruit wordt geordend op kleur \u00e9n grootte bouwen het vermogen op om meerdere criteria tegelijk te hanteren' },
      { milestone: 'Vergelijken en ordenen (zwaarder/lichter, meer/minder)', howWeAddress: 'Vergelijkingsactiviteiten met fruitgewichten laten kinderen schatten, vergelijken en ordenen van licht naar zwaar' },
      { milestone: 'Fruitwoorden lezen en schrijven (korte woorden decoderen en produceren)', howWeAddress: 'Woordpuzzel- en schrijfactiviteiten met fruitwoorden (peer, kers, pruim) oefenen klank-letterkoppeling met alledaags vocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk optelling tot sommen onder de 5, gebruik echt fruit of plastic fruit als concreet materiaal, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer aftrekking, sommen tot 20, en laat hen fruitwoorden zelfstandig schrijven en een fruitlijst samenstellen met hoeveelheden.',
    parentTakeaway: 'Fruit biedt dagelijks rekenkansen in groep 1-2. Laat uw kind bij het boodschappen doen fruit tellen en wegen: hoeveel appels zitten er in de zak? Welke meloen is zwaarder? Verdeel samen druiven eerlijk over de gezinsleden en oefen optellen bij het vullen van de fruitschaal. Na een fruitwerkblad kunt u samen een fruitsalade maken en de ingredi\u00ebnten tellen en opschrijven \u2014 rekenen, lezen en gezond eten in \u00e9\u00e9n activiteit.',
    classroomIntegration: 'Het fruitthema integreert in groep 1-2 met gezondheidsonderwijs (vitamines, gevarieerd eten), rekenen (tellen, optellen, vergelijken), taal (fruitwoorden lezen en schrijven) en natuur (seizoensfruit, waar groeit fruit). Een fruitproefmoment in de klas combineert smaakervaring met classificatie en taalactiviteiten. Werkbladen worden ingezet bij zelfstandig rekenen en bij de taalactiviteiten rond de letter-van-de-week, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Optellen met fruitcontext', emerging: 'telt twee groepjes fruit apart maar combineert niet zelfstandig', proficient: 'voert optellingen tot 10 uit met fruitbeelden en noteert de som correct', advanced: 'rekent vlot tot 20, lost aftrekopgaven op en formuleert eigen fruitsommen' },
      { skill: 'Fruitclassificatie', emerging: 'sorteert fruit op \u00e9\u00e9n kenmerk (kleur) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken (kleur \u00e9n grootte) en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en legt de redenering uit' },
      { skill: 'Fruitwoorden lezen en schrijven', emerging: 'herkent 2\u20133 fruitwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte fruitwoorden op gelinieerd papier', advanced: 'leest langere fruitwoorden, schrijft ze correct en gebruikt ze in zinnen' },
    ],
  },

  furniture: {
    seoTitle: 'Meubels-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare meubels-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'meubels groep 1-2, meubels oefeningen 5\u20136 jaar, meubels oefeningen groep 1-2, meubels uitprintbaar groep 1-2, meubels werkbladen groep 1-2, meubels activiteiten groep 1-2, meubels leerbladen 5\u20136 jaar, meubels gratis groep 1-2, meubels PDF groep 1-2, meubels rekenen',
    snippetAnswer: 'Meubels-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken stoelen, tafels en kasten als context voor optellen, ruimtelijk redeneren, positiewoorden en meubelwoorden lezen en schrijven. Het herkenbare thuisthema maakt abstract rekenen concreet. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het meubelthema een springplank voor ruimtelijk redeneren en meetkunde: vijf- en zesjarigen leren positiewoorden (op, onder, naast, tussen, voor, achter) en passen deze toe op de inrichting van een kamer. De SLO-leerlijnen voor rekenen benadrukken ruimtelijke ori\u00ebntatie als kerndoel, en meubels bieden het meest concrete referentiekader \u2014 elk kind kent de indeling van zijn eigen kamer. Rekenkundig biedt het thema optelling (drie stoelen aan tafel plus twee erbij), vergelijking (welke kast is hoger?) en eenvoudige meting (hoe breed is de tafel in handbreedtes?). Taalkundig zijn meubelwoorden uitstekend beginleesmateriaal: korte woorden als bed, bank, stoel en kast die kinderen dagelijks gebruiken.',
    developmentalMilestones: [
      { milestone: 'Ruimtelijke ori\u00ebntatie met positiewoorden (5\u20136-jarigen beheersen op, onder, naast, tussen, voor, achter)', howWeAddress: 'Plattegrond-activiteiten waarbij kinderen meubels plaatsen en beschrijven met positiewoorden bouwen ruimtelijk vocabulaire op' },
      { milestone: 'Meten met niet-standaard eenheden (kinderen meten lengte en breedte)', howWeAddress: 'Meetactiviteiten waarbij kinderen meubels meten in handbreedtes of blokjes oefenen het begrip van meting als vergelijking' },
      { milestone: 'Optellen in huiselijke context (kinderen rekenen met voorwerpen uit hun eigen omgeving)', howWeAddress: 'Optelopdrachten met meubels in kamertekeningen maken rekenen herkenbaar en betekenisvol' },
      { milestone: 'Meubelwoorden lezen en schrijven (korte functionele woorden decoderen)', howWeAddress: 'Labelactiviteiten waarbij kinderen meubelwoorden koppelen aan afbeeldingen oefenen functionele geletterdheid' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk positiewoorden tot drie (op, onder, naast), gebruik echte klasmeubels als referentie, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer alle zes positiewoorden, laat hen een plattegrond van hun slaapkamer tekenen en labelen, en voeg meetopdrachten toe met standaardmaten.',
    parentTakeaway: 'Uw huis is een rekenparadijs voor groep 1-2. Laat uw kind meubels tellen per kamer: hoeveel stoelen in de woonkamer? Meet samen de tafel in handbreedtes \u2014 hoe breed is hij? Oefen positiewoorden: waar staat de lamp? Op de tafel, naast de bank. Na een meubelwerkblad kunt u samen een plattegrond van de kinderkamer tekenen en alle meubels labelen \u2014 dit combineert ruimtelijk denken, schrijven en meten in \u00e9\u00e9n activiteit.',
    classroomIntegration: 'Het meubelthema werkt in groep 1-2 als een praktisch project: bij rekenen worden klasmeubels geteld, gemeten en in plattegronden geplaatst, bij taal worden meubelwoorden gelezen en de klas beschreven met positiewoorden, en bij wereldori\u00ebntatie wordt besproken hoe kamers worden ingericht. Een herinrichtingsproject van de leeshoek combineert meten, plannen en overleggen, in lijn met de SLO-doelen voor rekenen en taal.',
    assessmentRubric: [
      { skill: 'Positiewoorden gebruiken', emerging: 'gebruikt 2\u20133 positiewoorden (op, onder) met hulp en aanwijzingen', proficient: 'gebruikt zelfstandig 5\u20136 positiewoorden correct in beschrijvingen van een kameropstelling', advanced: 'combineert positiewoorden in complexe beschrijvingen en geeft nauwkeurige route-instructies' },
      { skill: 'Meten van meubels', emerging: 'meet met niet-standaard eenheden maar rapporteert onnauwkeurig', proficient: 'meet correct met handbreedtes of blokjes en vergelijkt twee meubels', advanced: 'meet meerdere meubels, ordent van kort naar lang en registreert de metingen' },
      { skill: 'Meubelwoorden lezen en schrijven', emerging: 'herkent 2\u20133 meubelwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte meubelwoorden', advanced: 'schrijft langere woorden correct en labelt een plattegrond zelfstandig' },
    ],
  },

  garden: {
    seoTitle: 'Tuin-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare tuin-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'tuin groep 1-2, tuin oefeningen 5\u20136 jaar, tuin oefeningen groep 1-2, tuin uitprintbaar groep 1-2, tuin werkbladen groep 1-2, tuin activiteiten groep 1-2, tuin leerbladen 5\u20136 jaar, tuin gratis groep 1-2, tuin PDF groep 1-2, tuin rekenen',
    snippetAnswer: 'Tuin-oefeningen voor groep 1-2 (5\u20136 jaar) combineren planten, groenten en tuingereedschap met optellen tot 10, meten van groei, seizoensbegrip en tuinwoorden lezen en schrijven. De tuin als buitenklasrum maakt natuur en rekenen onlosmakelijk verbonden. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het tuinthema een brug tussen natuurobservatie en gestructureerd leren: vijf- en zesjarigen volgen de groeicyclus van zaad tot plant, meten plantgroei, registreren waarnemingen en leren dat de tuin per seizoen verandert. De SLO-leerlijnen voor natuur en techniek benadrukken het systematisch observeren en registreren, terwijl de rekenleerlijnen meten en getalbegrip als doelen stellen. De tuin combineert beide: plantengroei meten is wiskunde, zaden tellen is getalbegrip, en het bijhouden van een groeidagboek is functioneel schrijven. Het praktische karakter maakt abstracte concepten als tijd, groei en seizoenen tastbaar voor jonge kinderen.',
    developmentalMilestones: [
      { milestone: 'Groeicyclus begrijpen (5\u20136-jarigen volgen het proces van zaad tot plant)', howWeAddress: 'Groeicyclus-werkbladen met ordenen van stappen laten kinderen de volgorde van planten, groeien en oogsten vastleggen' },
      { milestone: 'Meten en registreren (kinderen meten plantgroei en noteren de resultaten)', howWeAddress: 'Meetactiviteiten waarbij kinderen de hoogte van planten meten en in een grafiek bijhouden bouwen meetvaardigheden en dataregistratie op' },
      { milestone: 'Optellen in tuincontext (kinderen rekenen met zaden, planten en groenten)', howWeAddress: 'Optelopdrachten met tuinelementen (vijf tomaten aan de plant plus drie erbij) maken rekenen ervaringsgericht' },
      { milestone: 'Tuinwoorden lezen en schrijven (functioneel vocabulaire decoderen)', howWeAddress: 'Labelactiviteiten met tuinwoorden (zaad, blad, wortel, bloem) oefenen beginlezen met woorden die kinderen in de schooltuin tegenkomen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk meetactiviteiten tot eenvoudig vergelijken (hoger/lager), gebruik echte planten en zaden als concreet materiaal, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer een groeidagboek met wekelijkse metingen, laat hen tuinwoorden zelfstandig schrijven, en voeg eenvoudige grafieken toe voor het registreren van groeigegevens.',
    parentTakeaway: 'Een tuintje \u2014 zelfs een paar potjes op het balkon \u2014 is de beste rekenles voor groep 1-2. Laat uw kind zaden tellen en planten, meet wekelijks de groei met een liniaal en noteer de resultaten samen. Na een tuinwerkblad kunt u samen een groeigrafiek maken: hoe hoog was de plant vorige week en hoe hoog deze week? Hoeveel centimeter erbij? Dit combineert meten, optellen en registreren in een levend project.',
    classroomIntegration: 'Het tuinthema is in groep 1-2 ideaal voor een langlopend project: een klastuintje biedt wekelijks meetmomenten, bij rekenen worden planten geteld en groei gemeten, bij taal worden tuinwoordjes gelezen en een groeidagboek bijgehouden, en bij natuur worden seizoensveranderingen geobserveerd. Werkbladen dienen als registratieformulieren voor het tuinproject, in lijn met de SLO-doelen voor natuur, rekenen en taal.',
    assessmentRubric: [
      { skill: 'Groeicyclus begrijpen', emerging: 'benoemt twee stappen (planten en groeien) met hulp', proficient: 'ordent vier stappen van de groeicyclus zelfstandig en beschrijft elke stap', advanced: 'legt de volledige cyclus uit met details over water, licht en seizoen' },
      { skill: 'Meten en registreren', emerging: 'vergelijkt twee planten (hoger/lager) maar meet nog niet zelfstandig', proficient: 'meet correct met een liniaal en registreert de meting in een tabel', advanced: 'meet wekelijks, berekent de groei per week en maakt een grafiek' },
      { skill: 'Tuinwoorden lezen en schrijven', emerging: 'herkent 2\u20133 tuinwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte tuinwoorden', advanced: 'schrijft langere woorden correct en houdt een eenvoudig groeidagboek bij' },
    ],
  },

  halloween: {
    seoTitle: 'Halloween-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare halloween-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'halloween groep 1-2, halloween oefeningen 5\u20136 jaar, halloween oefeningen groep 1-2, halloween uitprintbaar groep 1-2, halloween werkbladen groep 1-2, halloween activiteiten groep 1-2, halloween leerbladen 5\u20136 jaar, halloween gratis groep 1-2, halloween PDF groep 1-2, halloween rekenen',
    snippetAnswer: 'Halloween-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken pompoenen, spoken en vleermuizen als context voor optellen tot 10, patroonherkenning, symmetrie en halloweenwoorden lezen en schrijven. Het spannende thema maakt rekenen tot een avontuur. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 biedt het halloweenthema een emotioneel geladen context die de motivatie voor rekenen en taal enorm verhoogt: vijf- en zesjarigen zijn gefascineerd door griezelige elementen en die fascinatie kan worden ingezet voor leerdoelen. Optellen met pompoenen en spoken, symmetrie in vleermuisvleugels, patronen in spinnenwebben \u2014 het thema biedt rijke wiskundige contexten. De SLO-leerlijnen voor rekenen benadrukken getalbegrip en meetkunde, en Halloween combineert beide in een visueel aantrekkelijk geheel. Taalkundig stimuleert het thema zowel creatief schrijven (een griezelverhaal) als woordherkenning (halloweenwoorden lezen). De tijdgebonden aard van het thema cre\u00ebert urgentie en enthousiasme die reguliere rekenlessen niet altijd oproepen.',
    developmentalMilestones: [
      { milestone: 'Optellen tot 10 met thematische beelden (5\u20136-jarigen rekenen in een motiverende context)', howWeAddress: 'Optelopdrachten met pompoenen, spoken en snoepjes maken de rekenbewerking zichtbaar in een context die kinderen intrinsiek boeit' },
      { milestone: 'Symmetrie herkennen in thematische vormen (vleermuisvleugels, spinnenwebben)', howWeAddress: 'Symmetrie-activiteiten met halloweenfiguren laten kinderen de spiegellijn ontdekken en symmetrische figuren completeren' },
      { milestone: 'Patroonherkenning in decoraties (slingers, spinnenwebben)', howWeAddress: 'Halloweenslinger-activiteiten met drie of vier elementen bouwen het patroonbegrip uit met thematische beelden' },
      { milestone: 'Halloweenwoorden lezen en schrijven (thematisch vocabulaire)', howWeAddress: 'Woordpuzzel- en schrijfactiviteiten met halloweenwoorden (heks, spin, vleermuis) breiden het vocabulaire uit met seizoensgebonden woorden' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk optelopdrachten tot onder de 5, gebruik vriendelijke halloweenbeelden (lachende pompoenen), en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer aftrekking, symmetrie-tekeningen met eigen ontwerp, en laat hen een kort griezelverhaal schrijven met halloweenwoorden.',
    parentTakeaway: 'Halloween biedt in groep 1-2 onverwachte rekenkansen. Laat uw kind het snoep tellen en sorteren na trick-or-treat: hoeveel lolly\u2019s? Hoeveel chocolaatjes? Samen meer of minder? Snijd samen een pompoen en tel de zaden \u2014 hoeveel schatten jullie? Na een halloweenwerkblad kunt u samen een griezelverhaaltje bedenken en opschrijven, waarbij uw kind de halloweenwoorden schrijft die het op het werkblad heeft geleerd.',
    classroomIntegration: 'Het halloweenthema is in groep 1-2 een krachtige themaweek rond eind oktober: bij rekenen worden snoepjes geteld en opgeteld, bij taal worden griezelverhalen verteld en halloweenwoorden gelezen, bij beeldende vorming worden maskers en slingers gemaakt, en bij natuur worden spinnen en vleermuizen besproken als echte dieren. Werkbladen worden ingezet bij zelfstandig rekenen en taalactiviteiten, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Optellen in halloweencontext', emerging: 'telt twee groepjes halloweenvoorwerpen apart maar combineert niet zelfstandig', proficient: 'voert optellingen tot 10 vlot uit met halloweenbeelden en noteert de som', advanced: 'rekent tot 20, lost aftrekopgaven op en formuleert eigen halloweensommen' },
      { skill: 'Symmetrie herkennen', emerging: 'herkent symmetrie in eenvoudige vormen met hulp', proficient: 'vindt zelfstandig de spiegellijn in halloweenfiguren en voltooit symmetrische tekeningen', advanced: 'ontwerpt eigen symmetrische halloweenfiguren en legt het concept uit' },
      { skill: 'Halloweenwoorden lezen en schrijven', emerging: 'herkent 2\u20133 halloweenwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 halloweenwoorden op gelinieerd papier', advanced: 'leest langere woorden, schrijft ze correct en gebruikt ze in korte verhalen' },
    ],
  },

  holidays: {
    seoTitle: 'Vakanties-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare vakanties-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vakanties groep 1-2, vakanties oefeningen 5\u20136 jaar, vakanties oefeningen groep 1-2, vakanties uitprintbaar groep 1-2, vakanties werkbladen groep 1-2, vakanties activiteiten groep 1-2, vakanties leerbladen 5\u20136 jaar, vakanties gratis groep 1-2, vakanties PDF groep 1-2, vakanties rekenen',
    snippetAnswer: 'Vakanties-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken feestdagen en tradities als context voor optellen, tijdsbegrip (kalender), patroonherkenning in versieringen en vakantiewoorden lezen en schrijven. Het emotionele karakter maakt leren persoonlijk en motiverend. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het vakantiethema een kader voor tijdsbegrip en culturele geletterdheid: vijf- en zesjarigen leren de kalender kennen via feestdagen, begrijpen de cyclische aard van het jaar, en ontdekken dat verschillende culturen op verschillende momenten feesten. De SLO-leerlijnen voor rekenen benadrukken tijdsbegrip als kerndoel, en feestdagen zijn de meest betekenisvolle ijkpunten op de kalender voor jonge kinderen. Rekenkundig bieden vakanties rijke contexten: cadeautjes tellen en optellen, versieringpatronen herkennen, en aftellen naar de volgende feestdag. Taalkundig stimuleert het thema functioneel schrijven (kerstkaarten, verjaardagsuitnodigingen) en woordherkenning. Het emotionele karakter van feestdagen maakt elke rekenactiviteit persoonlijk betekenisvol.',
    developmentalMilestones: [
      { milestone: 'Tijdsbegrip via de kalender (5\u20136-jarigen leren maanden, seizoenen en feestdagen als ijkpunten)', howWeAddress: 'Kalenderactiviteiten met feestdagen als markerpunten bouwen het begrip op dat het jaar een vaste cyclische structuur heeft' },
      { milestone: 'Optellen en aftellen (kinderen rekenen met cadeautjes en versieringen)', howWeAddress: 'Optel- en aftelopdrachten met feestelijke voorwerpen combineren rekenvaardigheid met de opwinding van naderende feestdagen' },
      { milestone: 'Patroonherkenning in versieringen (kinderen ontdekken herhaling in slingers en versiering)', howWeAddress: 'Versieringpatroon-activiteiten laten kinderen complexere patronen herkennen en voortzetten in een feestelijke context' },
      { milestone: 'Functioneel schrijven (kaarten en wensen schrijven met een echt doel)', howWeAddress: 'Kaartschrijf-activiteiten combineren schrijfoefening met een authentiek communicatiedoel dat kinderen motiveert' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: focus op \u00e9\u00e9n feestdag tegelijk, beperk optelling tot onder de 5, en bied overtrekkaarten aan voor schrijfactiviteiten. Voor gevorderde kinderen: introduceer meerdere feestdagen op een kalender, laat hen zelfstandig kaarten schrijven met volledige zinnen, en voeg aftrekking en aftelopdrachten toe.',
    parentTakeaway: 'Feestdagen zijn de beste rekenlessen van het jaar in groep 1-2. Laat uw kind meehelpen met het versieren: hoeveel ballen in de boom? Hoeveel slingers nodig? Tel samen de cadeautjes en sorteer de kerstkaarten. Gebruik een aftelkalender en bespreek dagelijks hoeveel dagen nog. Na een vakantiewerkblad kunt u samen een feestdagenkalender maken voor het hele jaar \u2014 dit bouwt tijdsbegrip op terwijl het schrijf- en tekenvaardigheden oefent.',
    classroomIntegration: 'Het vakantiethema loopt het hele jaar door in groep 1-2: elke feestdag biedt een themaweek met reken-, taal- en creatieve activiteiten. Bij Sinterklaas worden pakjes geteld en schoengedichten geschreven, bij Kerstmis worden versieringen in patronen gehangen en kaarten geschreven, bij Pasen worden eieren geteld en verstopt. De feestdagenkalender in de klas biedt dagelijks oefenmateriaal voor tijdsbegrip, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Tijdsbegrip (kalender en feestdagen)', emerging: 'benoemt 2\u20133 feestdagen maar plaatst ze niet op de kalender', proficient: 'plaatst zelfstandig 5\u20136 feestdagen op de juiste maand en beschrijft het seizoen', advanced: 'ordent alle feestdagen chronologisch, berekent tussenliggende weken en begrijpt de jaarcyclus' },
      { skill: 'Optellen in vakantiecontext', emerging: 'telt feestelijke voorwerpen maar voert geen optellingen zelfstandig uit', proficient: 'voert optellingen tot 10 uit met cadeautjes en versieringen en noteert correct', advanced: 'rekent tot 20, lost aftrekopgaven op en formuleert eigen vakantiesommen' },
      { skill: 'Functioneel schrijven (kaarten)', emerging: 'schrijft de eigen naam op een kaart met hulp', proficient: 'schrijft zelfstandig korte wensen en boodschappen op feestkaarten', advanced: 'schrijft volledige zinnen met correcte spelling en voegt details toe' },
    ],
  },

  household: {
    seoTitle: 'Huishouden-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare huishouden-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'huishouden groep 1-2, huishouden oefeningen 5\u20136 jaar, huishouden oefeningen groep 1-2, huishouden uitprintbaar groep 1-2, huishouden werkbladen groep 1-2, huishouden activiteiten groep 1-2, huishouden leerbladen 5\u20136 jaar, huishouden gratis groep 1-2, huishouden PDF groep 1-2, huishouden rekenen',
    snippetAnswer: 'Huishouden-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken dagelijkse huishoudelijke voorwerpen als context voor optellen, classificatie, meten en huishoudwoorden lezen en schrijven. De herkenbare thuisomgeving maakt abstract rekenen direct toepasbaar. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het huishoudthema een platform voor functioneel rekenen en zelfredzaamheid: vijf- en zesjarigen leren dat wiskunde overal in huis aanwezig is \u2014 bij het dekken van de tafel (hoeveel borden voor vijf personen?), het opruimen (classificeren en sorteren), en het koken (meten en tellen). De SLO-leerlijnen benadrukken zelfredzaamheid en praktische vaardigheden naast rekendoelen. Huishoudelijke taken bieden authentieke rekencontexten die ver voorbij het werkblad reiken: eerlijk verdelen (hoeveel koekjes per persoon?), meten (hoeveel water in de kan?), en tijdsbegrip (de was duurt een uur). Taalkundig zijn huishoudwoorden ideaal voor beginlezen \u2014 korte, dagelijkse woorden als bord, pan, zeep en doek die kinderen thuis en op school tegenkomen.',
    developmentalMilestones: [
      { milestone: 'Praktisch rekenen (5\u20136-jarigen passen rekenvaardigheid toe op dagelijkse situaties)', howWeAddress: 'Tafel-dek activiteiten waarbij kinderen berekenen hoeveel bestek en borden nodig zijn bouwen functioneel getalbegrip op' },
      { milestone: 'Classificatie van huishoudelijke voorwerpen (sorteren op functie, materiaal, ruimte)', howWeAddress: 'Sorteeractiviteiten met keukengerei, schoonmaakspullen en gereedschap oefenen meervoudige classificatie' },
      { milestone: 'Meten met huishoudelijke eenheden (koppen, lepels, kannen)', howWeAddress: 'Kookactiviteiten met afmeten van ingredi\u00ebnten introduceren het begrip van standaardmaten via dagelijkse ervaring' },
      { milestone: 'Huishoudwoorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met huishoudwoorden (bord, pan, zeep) oefenen beginlezen met functioneel vocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk classificatie tot twee categorie\u00ebn (keuken/badkamer), gebruik echte voorwerpen als aanvulling, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer alle kamers en hun voorwerpen, laat hen een boodschappenlijst schrijven, en voeg eenvoudige maatberekeningen toe (hoeveel koppen melk voor vier personen?).',
    parentTakeaway: 'Elk huishoudklusje is een rekenles in groep 1-2. Laat uw kind de tafel dekken en tellen of alles er is. Geef bij het koken de opdracht om drie koppen meel af te meten. Sorteer samen de was op kleur en tel de sokken in paren. Na een huishoudwerkblad kunt u samen een opruimplan maken: uw kind schrijft op wat er in welke kamer moet worden opgeruimd en telt de voorwerpen \u2014 classificeren, schrijven en tellen in \u00e9\u00e9n dagelijkse activiteit.',
    classroomIntegration: 'Het huishoudthema integreert in groep 1-2 met de dagelijkse klasroutine: tafeldekken in de eethoek is een rekenmoment, de opruimtaak oefent classificatie, en kookactiviteiten combineren meten met taal. Een huishoek in de klas biedt kansen voor rollenspel waarin kinderen rekenen, plannen en schrijven toepassen. Werkbladen worden ingezet bij zelfstandig rekenen en bij taalactiviteiten rond functioneel schrijven, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Praktisch rekenen (tafeldekken)', emerging: 'telt borden maar berekent het benodigde aantal nog niet zelfstandig', proficient: 'berekent zelfstandig hoeveel van elk item nodig is voor een groep en legt het uit', advanced: 'lost complexere verdeelproblemen op en past rekenen toe op nieuwe huishoudelijke situaties' },
      { skill: 'Classificatie van huishoudvoorwerpen', emerging: 'sorteert voorwerpen in twee groepen met hulp', proficient: 'classificeert zelfstandig op twee criteria (functie \u00e9n ruimte) en benoemt de groepen', advanced: 'classificeert op drie criteria, bedenkt eigen systemen en legt de logica uit' },
      { skill: 'Huishoudwoorden lezen en schrijven', emerging: 'herkent 2\u20133 huishoudwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte huishoudwoorden', advanced: 'schrijft langere woorden en maakt functionele lijsten (boodschappen, opruimplan)' },
    ],
  },

  insects: {
    seoTitle: 'Insecten-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare insecten-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'insecten groep 1-2, insecten oefeningen 5\u20136 jaar, insecten oefeningen groep 1-2, insecten uitprintbaar groep 1-2, insecten werkbladen groep 1-2, insecten activiteiten groep 1-2, insecten leerbladen 5\u20136 jaar, insecten gratis groep 1-2, insecten PDF groep 1-2, insecten rekenen',
    snippetAnswer: 'Insecten-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken kevers, vlinders en mieren als context voor optellen, symmetrie, classificatie op lichaamskenmerken en insectenwoorden lezen en schrijven. De fascinatie voor kleine beestjes maakt wetenschappelijk denken spelenderwijs. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 biedt het insectenthema een ideaal platform voor beginnend wetenschappelijk denken: vijf- en zesjarigen leren de basiskenmerken van insecten (zes poten, drie lichaamsdelen, vaak vleugels) en gebruiken deze kenmerken om te classificeren. De SLO-leerlijnen voor natuur en techniek benadrukken het systematisch waarnemen en beschrijven van levende wezens, en insecten zijn hiervoor ideaal omdat ze klein, talrijk en fascinerend zijn. Rekenkundig bieden insecten rijke contexten: poten tellen (hoeveel poten hebben drie kevers samen?), symmetrie in vlindervleugels, en levenscycli ordenen. Taalkundig zijn insectenwoorden gevarieerd in lengte \u2014 van korte woorden als bij en mug tot langere als vlinder en sprinkhaan \u2014 waardoor ze differentiatie in beginlezen ondersteunen.',
    developmentalMilestones: [
      { milestone: 'Wetenschappelijk classificeren (5\u20136-jarigen groeperen insecten op lichaamskenmerken)', howWeAddress: 'Classificatie-activiteiten met insectenkenmerken (poten, vleugels, lichaamsdelen) bouwen het vermogen op om systematisch te sorteren op waarneembare kenmerken' },
      { milestone: 'Vermenigvuldiging via herhaald tellen (zes poten per kever, hoeveel bij drie kevers?)', howWeAddress: 'Potentelling-activiteiten waarbij kinderen zes poten per kever tellen en optellen introduceren vermenigvuldiging als herhaalde optelling' },
      { milestone: 'Symmetrie in de natuur herkennen (vlindervleugels als spiegelbeeld)', howWeAddress: 'Vlindersymmetrie-activiteiten laten kinderen het patroon van \u00e9\u00e9n vleugel spiegelen op de andere, waarmee het symmetriebegrip visueel wordt verankerd' },
      { milestone: 'Insectenwoorden lezen en schrijven (variatie in woordlengte)', howWeAddress: 'Woordactiviteiten met korte (bij, mug) en langere (vlinder, kever) insectenwoorden bieden gedifferentieerd leesmateriaal' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot drie herkenbare insecten (vlinder, bij, lieveheersbeestje), gebruik grote afbeeldingen voor classificatie, en bied korte woordkaarten. Voor gevorderde kinderen: introduceer alle kenmerken van insecten versus spinnen, laat hen een insectendagboek bijhouden, en voeg vermenigvuldiging-als-herhaalde-optelling toe.',
    parentTakeaway: 'Insecten zijn overal en bieden gratis rekenlessen in groep 1-2. Zoek samen insecten in de tuin en tel hun poten: klopt het dat het er altijd zes zijn? Bekijk een vlinder en bespreek de symmetrie: zijn beide vleugels hetzelfde? Na een insectenwerkblad kunt u samen een insectenzoektocht doen en turven hoeveel van elke soort jullie vinden \u2014 dit combineert tellen, classificeren en natuurobservatie.',
    classroomIntegration: 'Het insectenthema werkt in groep 1-2 als een vakoverstijgend project: bij natuur worden insecten geobserveerd en geclassificeerd, bij rekenen worden poten geteld en symmetrie onderzocht, bij taal worden insectenwoorden gelezen en een insectenboekje geschreven, en bij beeldende vorming worden symmetrische vlinders gemaakt. Een insectenhotel op het schoolplein maakt observatie doorlopend mogelijk, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Insectenclassificatie', emerging: 'benoemt 2\u20133 insecten maar classificeert niet op kenmerken', proficient: 'classificeert zelfstandig op twee kenmerken (poten \u00e9n vleugels) en onderscheidt insecten van spinnen', advanced: 'classificeert op drie kenmerken, beschrijft levenscycli en presenteert bevindingen' },
      { skill: 'Rekenen met insectencontext', emerging: 'telt poten van \u00e9\u00e9n insect maar combineert niet bij meerdere', proficient: 'berekent het totaal aantal poten bij 2\u20133 insecten en noteert de som', advanced: 'past herhaalde optelling toe bij grotere aantallen en formuleert eigen insectensommen' },
      { skill: 'Insectenwoorden lezen en schrijven', emerging: 'herkent 2\u20133 korte insectenwoorden met hulp', proficient: 'leest en schrijft zelfstandig 5\u20137 insectenwoorden van variabele lengte', advanced: 'leest langere woorden vlot, schrijft ze correct en gebruikt ze in beschrijvende zinnen' },
    ],
  },

  jobs: {
    seoTitle: 'Beroepen-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare beroepen-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'beroepen groep 1-2, beroepen oefeningen 5\u20136 jaar, beroepen oefeningen groep 1-2, beroepen uitprintbaar groep 1-2, beroepen werkbladen groep 1-2, beroepen activiteiten groep 1-2, beroepen leerbladen 5\u20136 jaar, beroepen gratis groep 1-2, beroepen PDF groep 1-2, beroepen rekenen',
    snippetAnswer: 'Beroepen-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken brandweerman, bakker en arts als context voor optellen, gereedschap-classificatie, rollenspel en beroepenwoorden lezen en schrijven. Het thema verbindt de schoolwereld met de maatschappij eromheen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 evolueert het beroepenthema van fantasierijke imitatie naar het begrijpen van maatschappelijke functies: vijf- en zesjarigen ontdekken dat beroepen verschillende gereedschappen, werkplekken en vaardigheden vereisen, en dat beroepen samen een gemeenschap vormen. De SLO-leerlijnen voor mens en samenleving benadrukken het verkennen van de directe leefomgeving, en beroepen zijn daarvoor het ideale thema. Rekenkundig biedt elk beroep unieke contexten: een bakker weegt en meet, een winkelier telt en rekent, een bouwvakker meet en schat. Taalkundig zijn beroepenwoorden gevarieerd en functioneel \u2014 van korte woorden als arts en kok tot langere als brandweerman en politieagent. Het thema stimuleert ook logisch redeneren: als je ziek bent, ga je naar de... dit causale denken is een fundament voor begrijpend lezen.',
    developmentalMilestones: [
      { milestone: 'Maatschappelijk bewustzijn (5\u20136-jarigen begrijpen dat beroepen samen een gemeenschap vormen)', howWeAddress: 'Koppelactiviteiten tussen beroepen en hun werkplekken bouwen het begrip op dat mensen verschillende rollen vervullen in de maatschappij' },
      { milestone: 'Beroepsspecifiek rekenen (kinderen passen wiskunde toe in beroepscontexten)', howWeAddress: 'Rekenactiviteiten per beroep (bakker: wegen, winkelier: optellen, bouwvakker: meten) laten zien dat rekenen in elk beroep nodig is' },
      { milestone: 'Gereedschap-classificatie (kinderen koppelen gereedschap aan het juiste beroep)', howWeAddress: 'Sorteeractiviteiten met gereedschap en beroepen oefenen logisch redeneren en classificatie op functie' },
      { milestone: 'Beroepenwoorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met beroepenwoorden oefenen beginlezen met maatschappelijk relevant vocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vijf herkenbare beroepen, gebruik rollenspelmateriaal als concreet referentiepunt, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer minder bekende beroepen, laat hen een beroepenpresentatie voorbereiden en opschrijven, en voeg complexere rekencontexten toe per beroep.',
    parentTakeaway: 'Elk bezoek aan een winkel, arts of garage is een les over beroepen in groep 1-2. Bespreek na elk bezoek: wat doet die persoon? Welk gereedschap gebruikt hij? Welk rekenen is nodig? Laat uw kind bij de bakker tellen hoeveel broodjes u koopt en het bedrag berekenen. Na een beroepenwerkblad kunt u samen een beroepenboek maken: voor elk beroep een tekening, een beschrijving en een rekenopgave \u2014 dit combineert schrijven, tekenen en rekenen.',
    classroomIntegration: 'Het beroepenthema werkt in groep 1-2 als een langlopend project: elke week staat een beroep centraal, met bijpassende rekenactiviteiten (bakker: wegen, winkelier: optellen), taalactiviteiten (beroepenwoorden lezen en schrijven), en een bezoeker uit dat beroep of een excursie. Een beroepenhoek in de klas met rollenspelmateriaal stimuleert functioneel taalgebruik en rekenen, in lijn met de SLO-doelen voor mens en samenleving.',
    assessmentRubric: [
      { skill: 'Beroepen en gereedschap koppelen', emerging: 'koppelt 2\u20133 beroepen aan hun gereedschap met hulp', proficient: 'koppelt zelfstandig 6\u20138 beroepen aan de juiste gereedschappen en werkplekken', advanced: 'beschrijft 10+ beroepen met hun functies, gereedschap en belang voor de gemeenschap' },
      { skill: 'Beroepsspecifiek rekenen', emerging: 'voert eenvoudige telopdrachten uit in beroepscontext met hulp', proficient: 'past optelling en meting zelfstandig toe in 2\u20133 beroepscontexten', advanced: 'lost complexere rekenproblemen op in diverse beroepscontexten en legt de strategie uit' },
      { skill: 'Beroepenwoorden lezen en schrijven', emerging: 'herkent 2\u20133 korte beroepenwoorden met afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 beroepenwoorden', advanced: 'leest langere beroepenwoorden vlot en schrijft beschrijvende zinnen over beroepen' },
    ],
  },

  music: {
    seoTitle: 'Muziek-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare muziek-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'muziek groep 1-2, muziek oefeningen 5\u20136 jaar, muziek oefeningen groep 1-2, muziek uitprintbaar groep 1-2, muziek werkbladen groep 1-2, muziek activiteiten groep 1-2, muziek leerbladen 5\u20136 jaar, muziek gratis groep 1-2, muziek PDF groep 1-2, muziek rekenen',
    snippetAnswer: 'Muziek-oefeningen voor groep 1-2 (5\u20136 jaar) combineren instrumenten en noten met tellen, ritmepatronen, optellen en muziekwoorden lezen en schrijven. Ritme en wiskunde delen dezelfde structuur van patronen en herhaling. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 onthult het muziekthema de diepe verbinding tussen muziek en wiskunde: vijf- en zesjarigen ontdekken dat ritme patronen volgt, dat noten lang en kort kunnen zijn, en dat muziekinstrumenten kunnen worden geclassificeerd op de manier waarop ze geluid maken. De SLO-leerlijnen voor kunstzinnige ori\u00ebntatie benadrukken het ervaren en beschrijven van muziek, terwijl de rekenleerlijnen patronen en ritme als wiskundig fundament benoemen. Ritmepatronen klappen is tegelijk muziek \u00e9n wiskunde: een patroon van lang-kort-kort is een ABBA-structuur. Rekenkundig biedt het thema verder optellen (hoeveel instrumenten in het orkest?) en classificatie (snaarinstrumenten vs. blaasinstrumenten). Taalkundig zijn muziekwoorden boeiend voor kinderen: trom, fluit, piano \u2014 woorden die klinken als wat ze beschrijven.',
    developmentalMilestones: [
      { milestone: 'Ritmepatronen herkennen en reproduceren (5\u20136-jarigen klappen complexere ritmes na)', howWeAddress: 'Ritmewerkbladen met visuele patronen (lang-kort-kort) laten kinderen ritme omzetten naar een visueel patroon en omgekeerd' },
      { milestone: 'Instrumentenclassificatie (kinderen groeperen op klankproductie)', howWeAddress: 'Sorteeractiviteiten met instrumenten (slaan, blazen, tokkelen, strijken) bouwen classificatievermogen op via een auditief-visueel kanaal' },
      { milestone: 'Optellen in muzikale context (kinderen tellen instrumenten en muzikanten)', howWeAddress: 'Orkest-optelopdrachten (drie violisten plus twee fluitisten) visualiseren optelling in een groepscontext' },
      { milestone: 'Muziekwoorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met muziekwoorden (trom, fluit, noot) oefenen beginlezen met klankrijke woorden' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk ritmepatronen tot twee elementen (lang-kort), gebruik echte instrumenten of klankapps, en bied woordkaarten met afbeeldingen en geluidssymbolen. Voor gevorderde kinderen: introduceer driedelige ritmepatronen, laat hen eigen ritmes noteren met symbolen, en voeg instrumentenclassificatie met vier categorie\u00ebn toe.',
    parentTakeaway: 'Muziek is wiskunde die je kunt horen in groep 1-2. Klap samen ritmepatronen en laat uw kind het patroon beschrijven: lang-kort-kort, lang-kort-kort. Maak muziek met huishoudelijke voorwerpen (pannen, lepels, dozen) en tel de slagen. Na een muziekwerkblad kunt u samen een orkest-tekening maken waarbij uw kind de instrumenten telt, sorteert en labelt \u2014 rekenen, classificeren en schrijven worden \u00e9\u00e9n muzikale ervaring.',
    classroomIntegration: 'Het muziekthema verrijkt groep 1-2 dagelijks: bij de ochtendkring worden ritmepatronen geklapt, bij rekenen worden instrumenten geteld en geclassificeerd, bij taal worden muziekwoorden gelezen en liedteksten geschreven, en bij muziekles worden de werkbladconcepten ervaringsgericht. Een muziekinstrumentenhoek in de klas biedt kansen voor verkennend spel met klank en ritme, in lijn met de SLO-doelen voor kunstzinnige ori\u00ebntatie en rekenen.',
    assessmentRubric: [
      { skill: 'Ritmepatronen herkennen en reproduceren', emerging: 'klapt een tweeledig patroon na met hulp', proficient: 'herkent en reproduceert zelfstandig driedelige patronen en beschrijft de structuur', advanced: 'cre\u00ebert eigen complexe patronen, noteert ze met symbolen en voert ze uit' },
      { skill: 'Instrumentenclassificatie', emerging: 'benoemt 3\u20134 instrumenten maar classificeert niet op klankproductie', proficient: 'classificeert zelfstandig 6\u20138 instrumenten in twee categorie\u00ebn en benoemt de groepen', advanced: 'classificeert in vier categorie\u00ebn, beschrijft de klankproductie en geeft voorbeelden per groep' },
      { skill: 'Muziekwoorden lezen en schrijven', emerging: 'herkent 2\u20133 muziekwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 muziekwoorden op gelinieerd papier', advanced: 'leest langere muziekwoorden vlot en schrijft korte zinnen over instrumenten' },
    ],
  },

  nature: {
    seoTitle: 'Natuur-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare natuur-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'natuur groep 1-2, natuur oefeningen 5\u20136 jaar, natuur oefeningen groep 1-2, natuur uitprintbaar groep 1-2, natuur werkbladen groep 1-2, natuur activiteiten groep 1-2, natuur leerbladen 5\u20136 jaar, natuur gratis groep 1-2, natuur PDF groep 1-2, natuur rekenen',
    snippetAnswer: 'Natuur-oefeningen voor groep 1-2 (5\u20136 jaar) combineren planten, dieren en weerverschijnselen met optellen, classificatie, seizoensobservatie en natuurwoorden lezen en schrijven. De buitenwereld als klaslokaal maakt wetenschap en rekenen ervaringsgericht. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het natuurthema het overkoepelende kader voor wetenschappelijk denken: vijf- en zesjarigen leren systematisch observeren, classificeren en registreren wat ze in de natuur waarnemen. De SLO-leerlijnen voor natuur en techniek stellen dit als kerndoel voor groep 1-2: kinderen leren vragen stellen over de natuur, waarnemingen doen en eenvoudige conclusies trekken. Het natuurthema combineert dit met rekenen (tellen, meten, vergelijken), taal (natuurwoordenschat, observatieverslagen) en meetkunde (vormen in de natuur). Elk jaargetijde brengt nieuwe observatiemogelijkheden: bladverkleuring in de herfst, sneeuw in de winter, bloei in de lente, warmte in de zomer. Het thema overstijgt andere thema\u2019s en biedt een levenslange basis voor wetenschappelijke nieuwsgierigheid.',
    developmentalMilestones: [
      { milestone: 'Systematisch observeren en registreren (5\u20136-jarigen leren gericht waarnemen en noteren)', howWeAddress: 'Observatiewerkbladen met gerichte vragen (hoeveel soorten bladeren? welke kleuren?) begeleiden kinderen in het systematisch registreren van waarnemingen' },
      { milestone: 'Classificatie van levende en niet-levende dingen', howWeAddress: 'Sorteeractiviteiten waarbij kinderen natuur-elementen classificeren als levend/niet-levend en verder op kenmerken bouwen wetenschappelijk denken op' },
      { milestone: 'Seizoensveranderingen begrijpen en beschrijven', howWeAddress: 'Seizoensvergelijkings-werkbladen laten kinderen de vier seizoenen beschrijven en veranderingen in planten, dieren en weer vastleggen' },
      { milestone: 'Natuurwoorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met natuurwoorden (zon, regen, bloem, boom) bouwen een rijke natuurwoordenschat op' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk observatie tot \u00e9\u00e9n seizoen tegelijk, gebruik foto\u2019s als aanvulling op directe observatie, en bied korte woordkaarten. Voor gevorderde kinderen: introduceer een seizoensdagboek met wekelijkse observaties, laat hen natuurwoorden in zinnen schrijven, en voeg meetactiviteiten toe (temperatuur, regenval).',
    parentTakeaway: 'De natuur is het grootste klaslokaal voor groep 1-2. Maak wekelijks een natuurwandeling en laat uw kind observeren en tellen: hoeveel verschillende bloemen? Welke vogels? Hoe verandert de boom bij het huis door de seizoenen? Na een natuurwerkblad kunt u samen een seizoensdagboek beginnen: elke week een tekening, een beschrijving en een telling van wat jullie zien \u2014 dit bouwt observatie-, schrijf- en rekenvaardigheden tegelijk op.',
    classroomIntegration: 'Het natuurthema is het vakoverstijgende thema bij uitstek in groep 1-2: bij natuur worden observaties gedaan en besproken, bij rekenen worden natuurelementen geteld en gemeten, bij taal worden natuurboeken gelezen en observaties opgeschreven, en bij beeldende vorming worden seizoenstekeningen gemaakt. Een seizoenstafel in de klas en regelmatige buitenlessen maken het leren ervaringsgericht, in lijn met de SLO-doelen voor natuur en techniek.',
    assessmentRubric: [
      { skill: 'Systematisch observeren', emerging: 'benoemt 2\u20133 natuur-elementen zonder structuur', proficient: 'observeert gericht op 3\u20134 kenmerken en registreert bevindingen in een tabel', advanced: 'observeert systematisch, vergelijkt waarnemingen over tijd en trekt eenvoudige conclusies' },
      { skill: 'Classificatie van natuur-elementen', emerging: 'sorteert op \u00e9\u00e9n kenmerk (groot/klein) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken (levend/niet-levend \u00e9n type) en benoemt groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en presenteert een classificatiesysteem' },
      { skill: 'Natuurwoorden lezen en schrijven', emerging: 'herkent 2\u20133 natuurwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 korte natuurwoorden', advanced: 'schrijft langere woorden correct en gebruikt ze in beschrijvende zinnen over observaties' },
    ],
  },

  numbers: {
    seoTitle: 'Getallen-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare getallen-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'getallen groep 1-2, getallen oefeningen 5\u20136 jaar, getallen oefeningen groep 1-2, getallen uitprintbaar groep 1-2, getallen werkbladen groep 1-2, getallen activiteiten groep 1-2, getallen leerbladen 5\u20136 jaar, getallen gratis groep 1-2, getallen PDF groep 1-2, getallen rekenen',
    snippetAnswer: 'Getallen-oefeningen voor groep 1-2 (5\u20136 jaar) bouwen het getalbegrip uit van tellen tot 20 naar optellen en aftrekken tot 10, getallen schrijven, getalvolgorde en de overgang van concreet naar abstract rekenwerk. Dit is het kernthema van het rekenonderwijs. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 staat het getallen-thema centraal in het rekenonderwijs: vijf- en zesjarigen maken de cruciale overgang van mechanisch tellen naar echt getalbegrip. Ze leren dat een getal een hoeveelheid vertegenwoordigt (kardinaliteit), dat getallen een vaste volgorde hebben (ordinaliteit), en dat getallen kunnen worden gecombineerd en ontleed (optellen en aftrekken). De SLO-leerlijnen voor rekenen stellen deze overgangen als kerndoelen voor groep 1-2. Het getalbegrip dat hier wordt opgebouwd is het fundament waarop al het latere rekenonderwijs rust \u2014 van vermenigvuldigen tot breuken. Werkbladen bieden de gerichte oefening die nodig is om telvaardigheden te automatiseren: getalherkenning, getallen schrijven, vergelijken (meer/minder), en optellen en aftrekken met beelden die de overgang naar abstracte sommen ondersteunen.',
    developmentalMilestones: [
      { milestone: 'Kardinaliteit beheersen (5\u20136-jarigen begrijpen dat het laatst getelde getal de hoeveelheid aangeeft)', howWeAddress: 'Telopdrachten met wisselende opstellingen van dezelfde hoeveelheid laten kinderen ontdekken dat de hoeveelheid niet verandert door de positie van de voorwerpen' },
      { milestone: 'Optellen en aftrekken tot 10 (de sprong van tellen naar rekenen)', howWeAddress: 'Stapsgewijze opbouw van optellen met beelden, via sommen met steunbeelden, naar kale sommen bouwt de overgang van concreet naar abstract op' },
      { milestone: 'Getallen correct schrijven (cijfervorming van 0 tot 20)', howWeAddress: 'Schrijfwerkbladen met richtingspijlen en gelinieerde vakken begeleiden de correcte vorming van alle cijfers' },
      { milestone: 'Getalvolgorde en vergelijken (meer/minder, groter/kleiner)', howWeAddress: 'Vergelijkingsactiviteiten met getallenlijn en blokjes bouwen het begrip op van de relatieve positie van getallen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk het getalbereik tot 10, gebruik altijd concrete materialen naast het werkblad, en bied getallen-schrijfbladen met grote stippelcijfers. Voor gevorderde kinderen: breid uit tot 20, introduceer aftrekking en ontbinding (7 = 3 + 4), en laat hen zelfstandig sommen formuleren en oplossen.',
    parentTakeaway: 'Getalbegrip is de belangrijkste rekenvaardigheid in groep 1-2 en u kunt het overal oefenen. Tel alles: treden, auto\u2019s, boodschappen. Oefen optellen bij het afruimen: er stonden vijf borden, we nemen er twee weg, hoeveel nog? Laat uw kind getallen schrijven op een krijtbord. Na een getallenwerkblad kunt u samen een getallenjacht doen in huis: waar zie je getallen? Op de klok, de afstandsbediening, de telefoon \u2014 getallen zijn overal en elk moment is een oefenmoment.',
    classroomIntegration: 'Het getallen-thema is de ruggengraat van het rekenonderwijs in groep 1-2: elke dag begint met een getalactiviteit (tellen, schrijven, vergelijken), de getallenlijn is een permanent referentiepunt, en optel- en aftrekwerkbladen worden dagelijks ingezet bij zelfstandig rekenen. Het thema loopt door alle andere thema\u2019s heen \u2014 bij elk thema wordt geteld en gerekend. De SLO-leerlijnen stellen getalbegrip als het centrale doel voor deze leeftijdsgroep.',
    assessmentRubric: [
      { skill: 'Getalbegrip (kardinaliteit en ordinaliteit)', emerging: 'telt tot 10 maar geeft niet altijd het totaal correct aan', proficient: 'telt betrouwbaar tot 20, begrijpt kardinaliteit en plaatst getallen in volgorde', advanced: 'telt tot 20 en terug, ontbindt getallen (8 = 5 + 3) en begrijpt meer/minder/evenveel diepgaand' },
      { skill: 'Optellen en aftrekken tot 10', emerging: 'voert optellingen uit met concreet materiaal maar niet zelfstandig op papier', proficient: 'rekent zelfstandig optellingen en aftrekkingen tot 10 op papier met steunbeelden', advanced: 'rekent vlot tot 10 zonder steunbeelden en begint met sommen tot 20' },
      { skill: 'Getallen schrijven (0\u201320)', emerging: 'schrijft 0\u201310 herkenbaar maar met inconsistente vorming', proficient: 'schrijft alle getallen 0\u201320 correct met juiste richting en grootte', advanced: 'schrijft getallen vloeiend, gebruikt ze in sommen en schrijft getalwoorden' },
    ],
  },

  ocean: {
    seoTitle: 'Oceaan-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare oceaan-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'oceaan groep 1-2, oceaan oefeningen 5\u20136 jaar, oceaan oefeningen groep 1-2, oceaan uitprintbaar groep 1-2, oceaan werkbladen groep 1-2, oceaan activiteiten groep 1-2, oceaan leerbladen 5\u20136 jaar, oceaan gratis groep 1-2, oceaan PDF groep 1-2, oceaan rekenen',
    snippetAnswer: 'Oceaan-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken vissen, walvissen en koraalriffen als context voor optellen, classificatie van zeedieren, symmetrie en oceaanwoorden lezen en schrijven. De onderwaterwereld maakt leren tot een ontdekkingsreis. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het oceaanthema een venster op biodiversiteit en wetenschappelijk denken: vijf- en zesjarigen ontdekken de enorme verscheidenheid van het zeeleven en leren classificeren op kenmerken als lichaamsbedekking (schubben, schelp, huid), voortbeweging (zwemmen, kruipen, drijven) en leefomgeving (diepzee, koraalrif, kust). De SLO-leerlijnen voor natuur en techniek benadrukken het verkennen van leefomgevingen, en de oceaan is de meest fascinerende daarvan. Rekenkundig biedt het thema rijke contexten: vissen tellen en optellen, zeesterarmen tellen als vermenigvuldiging, en symmetrie in zeedieren herkennen. Taalkundig zijn oceaanwoorden gevarieerd: van korte woorden als vis en krab tot langere als octopus en zeepaardje, waardoor differentiatie mogelijk is.',
    developmentalMilestones: [
      { milestone: 'Biodiversiteit begrijpen (5\u20136-jarigen ontdekken de verscheidenheid van het zeeleven)', howWeAddress: 'Classificatie-activiteiten met zeedieren bouwen het begrip op dat de oceaan een enorme verscheidenheid aan levensvormen herbergt' },
      { milestone: 'Classificatie op meerdere kenmerken (schubben/schelp, zwemmen/kruipen)', howWeAddress: 'Sorteeractiviteiten met zeedieren op lichaamsbedekking \u00e9n voortbeweging oefenen meervoudige classificatie' },
      { milestone: 'Optellen en herhaalde optelling (armen van zeesterren, poten van krabben)', howWeAddress: 'Telopdrachten met zeesterarmen (vijf armen per zeester, hoeveel bij drie zeesterren?) introduceren vermenigvuldiging als herhaalde optelling' },
      { milestone: 'Oceaanwoorden lezen en schrijven', howWeAddress: 'Woordpuzzel- en schrijfactiviteiten met oceaanwoorden (vis, krab, haai, walvis) oefenen beginlezen met fascinerend vocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vijf herkenbare zeedieren, gebruik grote afbeeldingen voor classificatie, en bied korte woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer diepzeeleven, laat hen een oceaanfeitenboek schrijven, en voeg vermenigvuldiging via herhaalde optelling toe met zeesterarmen en krabbenpoten.',
    parentTakeaway: 'De oceaan fascineert kinderen in groep 1-2 eindeloos. Bekijk samen een documentaire en tel de verschillende soorten die jullie zien. Sorteer plastic zeedieren op kenmerken: welke hebben schubben? Welke een schelp? Na een oceaanwerkblad kunt u samen een onderwaterposter maken: uw kind tekent en labelt zeedieren en telt hoeveel van elke soort er zijn \u2014 dit combineert natuur, rekenen, schrijven en creatieve expressie.',
    classroomIntegration: 'Het oceaanthema is in groep 1-2 een krachtig vakoverstijgend project: bij natuur worden zeedieren geclassificeerd en leefomgevingen besproken, bij rekenen worden zeedieren geteld en zeesterarmen opgeteld, bij taal worden oceaanboeken gelezen en oceaanwoorden geschreven, en bij beeldende vorming wordt een onderwatersc\u00e8ne gemaakt. Een oceaanhoek in de klas met schelpen, boeken en speelgoed stimuleert verkennend leren, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Classificatie van zeedieren', emerging: 'benoemt 3\u20134 zeedieren maar classificeert niet op kenmerken', proficient: 'classificeert zelfstandig op twee kenmerken (lichaamsbedekking \u00e9n voortbeweging) en benoemt groepen', advanced: 'classificeert op drie kenmerken, beschrijft leefomgevingen en presenteert een classificatiesysteem' },
      { skill: 'Rekenen in oceaancontext', emerging: 'telt zeedieren maar voert nog geen optellingen zelfstandig uit', proficient: 'voert optellingen tot 10 uit en berekent zeesterarmen via herhaalde optelling', advanced: 'rekent tot 20, past herhaalde optelling vlot toe en formuleert eigen oceaansommen' },
      { skill: 'Oceaanwoorden lezen en schrijven', emerging: 'herkent 2\u20133 korte oceaanwoorden met hulp', proficient: 'leest en schrijft zelfstandig 5\u20137 oceaanwoorden van variabele lengte', advanced: 'leest langere woorden vlot, schrijft ze correct en schrijft korte zinnen over het zeeleven' },
    ],
  },

  pets: {
    seoTitle: 'Huisdieren-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare huisdieren-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'huisdieren groep 1-2, huisdieren oefeningen 5\u20136 jaar, huisdieren oefeningen groep 1-2, huisdieren uitprintbaar groep 1-2, huisdieren werkbladen groep 1-2, huisdieren activiteiten groep 1-2, huisdieren leerbladen 5\u20136 jaar, huisdieren gratis groep 1-2, huisdieren PDF groep 1-2, huisdieren rekenen',
    snippetAnswer: 'Huisdieren-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken honden, katten en konijnen als context voor optellen, verantwoordelijkheid bespreken, classificatie op kenmerken en huisdierwoorden lezen en schrijven. De emotionele band met huisdieren maakt rekenen persoonlijk. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het huisdierenthema een brug tussen emotionele betrokkenheid en gestructureerd leren: vijf- en zesjarigen hebben vaak een huisdier of dromen ervan, en die persoonlijke connectie maakt elk rekenprobleem betekenisvol. De SLO-leerlijnen voor mens en samenleving benadrukken verantwoordelijkheid en zorg voor anderen, en huisdierenverzorging is de meest concrete uitdrukking daarvan voor jonge kinderen. Rekenkundig biedt het thema rijke contexten: voer afmeten (hoeveel schepjes per dag?), dierenartsenijkosten optellen, en huisdieren classificeren op kenmerken. Taalkundig zijn huisdierwoorden ideaal voor beginlezen \u2014 korte, emotioneel geladen woorden als hond, kat, vis en konijn die kinderen met plezier lezen en schrijven.',
    developmentalMilestones: [
      { milestone: 'Verantwoordelijkheidsbesef (5\u20136-jarigen begrijpen dat huisdieren dagelijkse zorg nodig hebben)', howWeAddress: 'Verzorgingsschema-activiteiten waarbij kinderen een dagelijks voer- en verzorgingsrooster bijhouden bouwen verantwoordelijkheidsbesef en tijdsbegrip op' },
      { milestone: 'Praktisch rekenen met huisdierverzorging (afmeten van voer, tellen van benodigdheden)', howWeAddress: 'Voer-afmeet-activiteiten combineren meten en tellen met een authentiek doel dat kinderen persoonlijk raakt' },
      { milestone: 'Classificatie op meerdere kenmerken (pootdieren/vissen, groot/klein, langharig/kortharig)', howWeAddress: 'Sorteeractiviteiten met huisdieren op meerdere kenmerken tegelijk bouwen het classificatievermogen uit' },
      { milestone: 'Huisdierwoorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met huisdierwoorden (hond, kat, vis, konijn) oefenen beginlezen met emotioneel geladen vocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vier herkenbare huisdieren, gebruik knuffels als concreet materiaal, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer minder bekende huisdieren, laat hen een huisdierverzorgingsboek schrijven, en voeg eenvoudige kostenberekeningen toe (hoeveel kost voer voor een week?).',
    parentTakeaway: 'Een huisdier is een dagelijkse rekenles in groep 1-2. Laat uw kind het voer afmeten: twee schepjes \u2019s ochtends en twee \u2019s avonds, hoeveel per dag? Maak samen een verzorgingskalender en oefen de dagen van de week. Als u geen huisdier heeft: bezoek een dierenwinkel en laat uw kind de dieren tellen en sorteren. Na een huisdierwerkblad kunt u samen een huisdierenpaspoort maken met naam, gewicht, leeftijd en kenmerken \u2014 schrijven en rekenen in \u00e9\u00e9n persoonlijk project.',
    classroomIntegration: 'Het huisdierenthema werkt in groep 1-2 als een persoonlijk project: bij rekenen worden huisdiergegevens verzameld en verwerkt (grafiek van wie welk huisdier heeft), bij taal worden huisdierverhalen geschreven en huisdierwoorden gelezen, en bij mens en samenleving wordt verantwoordelijkheid besproken. Een huisdierenfoto-expositie in de klas biedt aanleiding voor presentaties en vergelijkingen, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Huisdierenclassificatie', emerging: 'benoemt 3\u20134 huisdieren maar classificeert niet op kenmerken', proficient: 'classificeert zelfstandig op twee kenmerken (grootte \u00e9n type) en beschrijft de groepen', advanced: 'classificeert op drie kenmerken, vergelijkt verzorgingsbehoeften en presenteert bevindingen' },
      { skill: 'Praktisch rekenen (huisdierverzorging)', emerging: 'telt voerschepjes maar berekent nog niet het dagelijkse totaal', proficient: 'berekent zelfstandig dagelijkse voerhoeveelheden en maakt eenvoudige verzorgingsschema\u2019s', advanced: 'berekent weekhoeveelheden, maakt een kostenberekening en vergelijkt huisdieren op verzorgingsbehoefte' },
      { skill: 'Huisdierwoorden lezen en schrijven', emerging: 'herkent 2\u20133 huisdierwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 huisdierwoorden op gelinieerd papier', advanced: 'schrijft langere woorden correct en maakt een huisdierbeschrijving met meerdere zinnen' },
    ],
  },

  pirates: {
    seoTitle: 'Piraten-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare piraten-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'piraten groep 1-2, piraten oefeningen 5\u20136 jaar, piraten oefeningen groep 1-2, piraten uitprintbaar groep 1-2, piraten werkbladen groep 1-2, piraten activiteiten groep 1-2, piraten leerbladen 5\u20136 jaar, piraten gratis groep 1-2, piraten PDF groep 1-2, piraten rekenen',
    snippetAnswer: 'Piraten-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken schatkaarten, goudstukken en piratenschepen als context voor optellen, ruimtelijke ori\u00ebntatie, eerlijk verdelen en piratenwoorden lezen en schrijven. Het avontuurthema maakt rekenen tot een speurtocht. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 biedt het piratenthema een avontuurlijk kader voor complexere rekenvaardigheid: vijf- en zesjarigen gebruiken schatkaarten voor ruimtelijke ori\u00ebntatie, verdelen goudstukken eerlijk over de bemanning, en tellen en optellen met piratenattributen. De SLO-leerlijnen voor rekenen benadrukken ruimtelijke ori\u00ebntatie en verdeling als kerndoelen, en het piratenthema maakt deze abstracte concepten tot een speurtocht. Het lezen van een eenvoudige kaart vereist richtingsbegrippen (links, rechts, boven, onder), het verdelen van een schat vereist beginnend deelbegrip, en het plannen van een piratenreis vereist logisch denken en probleemoplossing. Taalkundig stimuleert het thema zowel woordherkenning (piratenwoorden) als creatief schrijven (een piratenbrief in een fles).',
    developmentalMilestones: [
      { milestone: 'Ruimtelijke ori\u00ebntatie via kaartlezen (5\u20136-jarigen volgen eenvoudige routes en richtingen)', howWeAddress: 'Schatkaart-activiteiten waarbij kinderen een route volgen met richtingsaanwijzingen bouwen ruimtelijk denken en richtingsbegrippen op' },
      { milestone: 'Eerlijk verdelen (kinderen verdelen hoeveelheden in gelijke groepen)', howWeAddress: 'Schatverdeelactiviteiten (12 goudstukken over 3 piraten) introduceren het deelbegrip als eerlijk verdelen' },
      { milestone: 'Optellen in piratencontext (kinderen rekenen met goudstukken en piratenvoorwerpen)', howWeAddress: 'Optelopdrachten met goudstukken en edelstenen maken rekenen tot een schatzoektocht die intrinsiek motiveert' },
      { milestone: 'Piratenwoorden lezen en schrijven', howWeAddress: 'Woordpuzzel- en schrijfactiviteiten met piratenwoorden (schat, boot, kaart, zwaard) oefenen beginlezen met avontuurlijk vocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk kaartactiviteiten tot \u00e9\u00e9n richting tegelijk, houd verdelingen onder de 10, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer complexere routes met meerdere richtingsveranderingen, laat hen piratenlogboeken schrijven, en voeg verdeelproblemen toe met restanten.',
    parentTakeaway: 'Een piratenavontuur is een gouden rekenles in groep 1-2. Maak samen een schatkaart van de tuin of het park en laat uw kind de route volgen met aanwijzingen (drie stappen naar links, twee naar voren). Verstop een \u201eschat\u201d en laat uw kind het aantal stukken verdelen over familieleden. Na een piratenwerkblad kunt u samen een piratenbrief schrijven en in een fles stoppen \u2014 dit combineert schrijven, fantasie en ruimtelijk denken.',
    classroomIntegration: 'Het piratenthema is in groep 1-2 ideaal voor een themaweek: bij rekenen worden goudstukken geteld, opgeteld en verdeeld, bij taal worden piratenverhalen verteld en piratenwoorden gelezen, bij gym wordt een schatzoekmissie georganiseerd met richtingsaanwijzingen, en bij beeldende vorming worden piratenhoeden en kaarten gemaakt. Een schatkist in de klas met rekenpiratenspellen stimuleert zelfstandig leren, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Ruimtelijke ori\u00ebntatie (kaartlezen)', emerging: 'volgt een route met \u00e9\u00e9n richting maar raakt in de war bij meerdere', proficient: 'volgt zelfstandig een route met drie richtingsveranderingen en beschrijft de weg', advanced: 'leest complexe kaarten, geeft eigen route-instructies en tekent een eenvoudige kaart' },
      { skill: 'Eerlijk verdelen', emerging: 'verdeelt concrete voorwerpen in twee groepen met hulp', proficient: 'verdeelt zelfstandig hoeveelheden tot 12 over 2\u20133 groepen en controleert de gelijkheid', advanced: 'verdeelt grotere hoeveelheden, herkent restanten en legt de verdeelstrategie uit' },
      { skill: 'Piratenwoorden lezen en schrijven', emerging: 'herkent 2\u20133 piratenwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 piratenwoorden op gelinieerd papier', advanced: 'leest langere piratenwoorden vlot en schrijft korte piratenverhalen' },
    ],
  },

  robots: {
    seoTitle: 'Robots-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare robots-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'robots groep 1-2, robots oefeningen 5\u20136 jaar, robots oefeningen groep 1-2, robots uitprintbaar groep 1-2, robots werkbladen groep 1-2, robots activiteiten groep 1-2, robots leerbladen 5\u20136 jaar, robots gratis groep 1-2, robots PDF groep 1-2, robots rekenen',
    snippetAnswer: 'Robots-oefeningen voor groep 1-2 (5\u20136 jaar) combineren robotontwerp met geometrische vormen, optellen, stapsgewijs programmeerdenken en robotwoorden lezen en schrijven. Het technologiethema maakt logisch denken en meetkunde tastbaar. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het robotthema een introductie tot computationeel denken: vijf- en zesjarigen leren dat robots instructies volgen in een vaste volgorde, dat elke stap duidelijk moet zijn, en dat fouten kunnen worden opgespoord door stappen te controleren. De SLO-leerlijnen voor natuur en techniek benadrukken technisch ontwerpen en programmeerdenken als 21e-eeuwse vaardigheden. Robots bouwen uit geometrische vormen combineert meetkunde met creatief denken: een vierkant lichaam, een ronde kop, rechthoekige armen. Rekenkundig biedt het thema optelling (hoeveel schroeven nodig?), meting (hoe hoog wordt de robot?) en patroonherkenning (instructiereeksen). De aantrekkingskracht van technologie motiveert kinderen voor taken die anders als abstract worden ervaren.',
    developmentalMilestones: [
      { milestone: 'Stapsgewijs denken (5\u20136-jarigen leren instructies in volgorde uit te voeren)', howWeAddress: 'Programmeeractiviteiten waarbij kinderen een robot stap voor stap instructies geven bouwen sequentieel denken op als basis voor programmeren' },
      { milestone: 'Geometrische vormen combineren tot ontwerpen (kinderen bouwen figuren uit basisvormen)', howWeAddress: 'Robotontwerp-activiteiten waarbij kinderen robots bouwen uit vierkanten, cirkels en rechthoeken oefenen vormherkenning en ruimtelijk samenstellen' },
      { milestone: 'Optellen in technische context (onderdelen tellen en combineren)', howWeAddress: 'Optelopdrachten met robotonderdelen (vier schroeven plus drie schroeven) verbinden rekenen met technisch ontwerp' },
      { milestone: 'Technische woorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met robotwoorden (knop, arm, wiel, lamp) oefenen beginlezen met technologisch vocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk instructiereeksen tot twee stappen, gebruik grote basisvormen voor robotontwerp, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer instructiereeksen van vijf stappen, laat hen een robotontwerp tekenen en labelen, en voeg foutopsporing toe (welke stap klopt niet?).',
    parentTakeaway: 'Robots fascineren kinderen in groep 1-2 en bieden een natuurlijke ingang tot logisch denken. Speel samen \u201erobot\u201d: uw kind geeft instructies en u voert ze letterlijk uit \u2014 als het kind zegt \u201ega naar de keuken\u201d maar niet zegt \u201eloop rechtdoor\u201d, loopt u de verkeerde kant op. Dit laat kinderen ervaren dat instructies precies moeten zijn. Na een robotwerkblad kunt u samen een robot bouwen uit dozen en de vormen benoemen en tellen \u2014 meetkunde, rekenen en creatief denken in \u00e9\u00e9n.',
    classroomIntegration: 'Het robotthema werkt in groep 1-2 als een STEM-project: bij rekenen worden robotonderdelen geteld en gemeten, bij taal worden robotverhalen geschreven en instructies opgesteld, bij techniek worden robots gebouwd uit dozen en de instructies getest, en bij beeldende vorming worden robots ontworpen uit vormen. Programmeeractiviteiten zonder computer (unplugged coding) bouwen logisch denken op, in lijn met de SLO-doelen voor natuur en techniek.',
    assessmentRubric: [
      { skill: 'Stapsgewijs denken (programmeerdenken)', emerging: 'voert twee opeenvolgende instructies uit maar raakt in de war bij meer', proficient: 'voert zelfstandig een reeks van vier instructies correct uit en beschrijft de volgorde', advanced: 'ontwerpt eigen instructiereeksen, spoort fouten op en corrigeert ze' },
      { skill: 'Geometrische vormen combineren', emerging: 'benoemt drie basisvormen maar combineert ze niet zelfstandig', proficient: 'bouwt zelfstandig een robot uit vijf of meer vormen en benoemt elke vorm', advanced: 'ontwerpt complexe robots, combineert acht of meer vormen en beschrijft de verhoudingen' },
      { skill: 'Robotwoorden lezen en schrijven', emerging: 'herkent 2\u20133 robotwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 robotwoorden op gelinieerd papier', advanced: 'schrijft langere woorden correct en stelt eenvoudige robot-instructies op schrift' },
    ],
  },

  school: {
    seoTitle: 'School-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare school-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'school groep 1-2, school oefeningen 5\u20136 jaar, school oefeningen groep 1-2, school uitprintbaar groep 1-2, school werkbladen groep 1-2, school activiteiten groep 1-2, school leerbladen 5\u20136 jaar, school gratis groep 1-2, school PDF groep 1-2, school rekenen',
    snippetAnswer: 'School-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken potloden, boeken en het klaslokaal als context voor optellen, tellen van schoolspullen, dagindeling en schoolwoorden lezen en schrijven. Het vertrouwde schoolthema maakt rekenen direct relevant. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het schoolthema metacognitief: vijf- en zesjarigen leren niet alleen in school maar ook over school \u2014 ze begrijpen de dagindeling, leren schoolspullen organiseren, en ontdekken dat rekenen en taal overal in het klaslokaal aanwezig zijn. De SLO-leerlijnen benadrukken zelfredzaamheid en leervaardigheden als kerndoelen, en het schoolthema adresseert beide direct. Rekenkundig biedt de school onuitputtelijke contexten: potloden tellen en verdelen, de dagindeling als tijdsbegrip, en het klaslokaal als meetomgeving (hoe breed is het bord?). Taalkundig zijn schoolwoorden het meest functionele vocabulaire dat bestaat \u2014 elk woord dat kinderen leren lezen en schrijven is direct toepasbaar in hun dagelijkse omgeving.',
    developmentalMilestones: [
      { milestone: 'Dagindeling en tijdsbegrip (5\u20136-jarigen begrijpen de structuur van een schooldag)', howWeAddress: 'Dagindelings-werkbladen waarbij kinderen de volgorde van schoolactiviteiten ordenen bouwen tijdsbegrip en sequentieel denken op' },
      { milestone: 'Zelfredzaamheid en organisatie (kinderen leren hun schoolspullen organiseren)', howWeAddress: 'Sorteer- en checklistactiviteiten met schoolspullen oefenen classificatie en zelfredzaamheid tegelijkertijd' },
      { milestone: 'Optellen en verdelen van schoolmateriaal', howWeAddress: 'Verdeelactiviteiten met potloden en schriften (18 potloden over 6 kinderen) combineren rekenen met de dagelijkse klasroutine' },
      { milestone: 'Schoolwoorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met schoolwoorden (boek, pen, bord, stoel) oefenen het meest functionele vocabulaire voor de schoolomgeving' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vijf schoolvoorwerpen, gebruik echte klasmateriaal als referentie, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer de volledige dagindeling met tijden, laat hen een klassenlijst bijhouden met aantallen, en voeg verdeelproblemen toe met grotere hoeveelheden.',
    parentTakeaway: 'Het schoolthema biedt in groep 1-2 een directe verbinding tussen thuis en school. Bereid samen de schooltas voor en laat uw kind tellen: hoeveel potloden? Hoeveel schriften? Bespreek de dagindeling: wat doe je eerst op school? En daarna? Na een schoolwerkblad kunt u samen een weekrooster maken met de schoolactiviteiten \u2014 dit oefent tijdsbegrip, schrijven en planvaardigheden die kinderen de rest van hun schoolcarri\u00e8re nodig hebben.',
    classroomIntegration: 'Het schoolthema is in groep 1-2 uniek omdat het de dagelijkse routine zelf tot leermateriaal maakt: de dagopening wordt een teloefening (hoeveel kinderen aanwezig?), het uitdelen van materiaal wordt een verdeellopdracht, en het opruimen wordt een classificatie-activiteit. Schoolwoorden zijn het eerste leesmateriaal dat kinderen zelfstandig in hun omgeving herkennen. Het thema loopt continu door het hele jaar, in lijn met de SLO-doelen voor zelfredzaamheid en leervaardigheden.',
    assessmentRubric: [
      { skill: 'Dagindeling begrijpen', emerging: 'benoemt 2\u20133 schoolactiviteiten maar ordent ze niet in volgorde', proficient: 'ordent zelfstandig vijf schoolactiviteiten in de juiste volgorde en beschrijft de dagstructuur', advanced: 'beschrijft de volledige dagindeling met tijdstippen en legt uit waarom de volgorde zo is' },
      { skill: 'Schoolmateriaal tellen en verdelen', emerging: 'telt schoolspullen maar verdeelt niet zelfstandig', proficient: 'verdeelt zelfstandig materiaal over groepjes en controleert de gelijkheid', advanced: 'lost verdeelproblemen op met restanten en formuleert eigen verdeelvragen' },
      { skill: 'Schoolwoorden lezen en schrijven', emerging: 'herkent 2\u20133 schoolwoorden in de klasomgeving', proficient: 'leest en schrijft zelfstandig 6\u20138 schoolwoorden op gelinieerd papier', advanced: 'leest alle gangbare schoolwoorden en schrijft korte zinnen over de schooldag' },
    ],
  },

  seasons: {
    seoTitle: 'Seizoenen-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare seizoenen-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'seizoenen groep 1-2, seizoenen oefeningen 5\u20136 jaar, seizoenen oefeningen groep 1-2, seizoenen uitprintbaar groep 1-2, seizoenen werkbladen groep 1-2, seizoenen activiteiten groep 1-2, seizoenen leerbladen 5\u20136 jaar, seizoenen gratis groep 1-2, seizoenen PDF groep 1-2, seizoenen rekenen',
    snippetAnswer: 'Seizoenen-oefeningen voor groep 1-2 (5\u20136 jaar) combineren lente, zomer, herfst en winter met optellen, tijdsbegrip, seizoenskenmerken vergelijken en seizoenswoorden lezen en schrijven. De cyclische structuur bouwt logisch denken en natuurbegrip op. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het seizoenenthema een kader voor tijdsbegrip en cyclisch denken: vijf- en zesjarigen leren dat het jaar vier seizoenen heeft die in een vaste volgorde terugkeren, dat elk seizoen eigen kenmerken heeft, en dat de natuur en het dagelijks leven meeveranderen. De SLO-leerlijnen voor natuur en techniek benadrukken seizoensbegrip als kerndoel, terwijl de rekenleerlijnen tijdsbegrip en vergelijken als doelen stellen. Seizoenen verbinden beide: de maanden ordenen is tijdsbegrip, temperaturen vergelijken is meten, en seizoenskledingkeuzes zijn logisch redeneren. Het cyclische karakter van seizoenen introduceert een denkpatroon dat later terugkomt bij kloklezen, breuken en kansberekening.',
    developmentalMilestones: [
      { milestone: 'Cyclisch tijdsbegrip (5\u20136-jarigen begrijpen dat seizoenen in een vaste volgorde terugkeren)', howWeAddress: 'Seizoenscyclus-werkbladen met een cirkeldiagram laten kinderen de vaste volgorde en terugkerende aard van seizoenen ontdekken' },
      { milestone: 'Seizoenskenmerken vergelijken (kinderen beschrijven en vergelijken de vier seizoenen)', howWeAddress: 'Vergelijkingsactiviteiten met temperatuur, kleding, natuur en activiteiten per seizoen bouwen het vermogen op om systematisch te vergelijken' },
      { milestone: 'Maanden en seizoenen koppelen (kinderen plaatsen maanden bij het juiste seizoen)', howWeAddress: 'Sorteeractiviteiten met maandenkaarten en seizoensafbeeldingen verankeren de twaalf maanden in de vier seizoenen' },
      { milestone: 'Seizoenswoorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met seizoenswoorden (lente, zon, sneeuw, herfst) bouwen seizoensgebonden vocabulaire op' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: focus op twee contrasterende seizoenen (zomer/winter), gebruik foto\u2019s van de eigen omgeving, en bied woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer alle twaalf maanden, laat hen een seizoensdagboek bijhouden met temperatuurmetingen, en voeg vergelijkende grafieken toe.',
    parentTakeaway: 'Seizoenen zijn het hele jaar door een leermogelijkheid in groep 1-2. Maak per seizoen een foto van hetzelfde uitzicht en vergelijk ze: wat is veranderd? Bespreek samen de maanden: in welk seizoen valt jouw verjaardag? Tel samen de winterjassen en de zomershirts \u2014 van welke heb je meer? Na een seizoenenwerkblad kunt u samen een seizoenenposter maken met tekeningen, woorden en een maandenlijst \u2014 dit combineert natuur, schrijven en tijdsbegrip.',
    classroomIntegration: 'Het seizoenenthema loopt het hele jaar door in groep 1-2: elke seizoenswisseling biedt aanleiding voor observatie, vergelijking en registratie. Bij rekenen worden temperaturen vergeleken en maanden geordend, bij taal worden seizoensverhalen geschreven en seizoenswoorden gelezen, en bij natuur worden seizoensveranderingen in de schooltuin geobserveerd. De seizoenstafel in de klas wordt regelmatig vernieuwd, in lijn met de SLO-doelen voor natuur en techniek.',
    assessmentRubric: [
      { skill: 'Seizoenscyclus begrijpen', emerging: 'benoemt twee seizoenen (zomer en winter) maar kent de volgorde niet', proficient: 'benoemt alle vier seizoenen in volgorde en beschrijft drie kenmerken per seizoen', advanced: 'legt de cyclische aard uit, koppelt alle maanden aan seizoenen en beschrijft oorzaken van seizoenswisselingen' },
      { skill: 'Vergelijken van seizoenskenmerken', emerging: 'benoemt \u00e9\u00e9n verschil tussen twee seizoenen met hulp', proficient: 'vergelijkt zelfstandig twee seizoenen op drie kenmerken en beschrijft overeenkomsten en verschillen', advanced: 'vergelijkt alle vier seizoenen systematisch, maakt een vergelijkingstabel en trekt conclusies' },
      { skill: 'Seizoenswoorden lezen en schrijven', emerging: 'herkent 2\u20133 seizoenswoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 seizoenswoorden op gelinieerd papier', advanced: 'leest langere seizoenswoorden vlot en schrijft beschrijvende zinnen over elk seizoen' },
    ],
  },

  shapes: {
    seoTitle: 'Vormen-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare vormen-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vormen groep 1-2, vormen oefeningen 5\u20136 jaar, vormen oefeningen groep 1-2, vormen uitprintbaar groep 1-2, vormen werkbladen groep 1-2, vormen activiteiten groep 1-2, vormen leerbladen 5\u20136 jaar, vormen gratis groep 1-2, vormen PDF groep 1-2, vormen rekenen',
    snippetAnswer: 'Vormen-oefeningen voor groep 1-2 (5\u20136 jaar) verdiepen vormkennis naar eigenschappen tellen (hoeken, zijden), symmetrie herkennen, vormen combineren tot figuren en vormwoorden lezen en schrijven. Meetkunde is het fundament van ruimtelijk denken. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 evolueert het vormenthema van herkenning naar analyse: vijf- en zesjarigen leren niet alleen vormen benoemen maar ook hun eigenschappen beschrijven \u2014 hoeveel zijden heeft een driehoek? Hoeveel hoeken een vierkant? De SLO-leerlijnen voor rekenen stellen meetkunde als kerndoel, met nadruk op het beschrijven en vergelijken van twee- en driedimensionale vormen. Dit is de leeftijd waarop kinderen de cognitieve sprong maken van \u201edat is een cirkel\u201d naar \u201eeen cirkel heeft geen hoeken en geen rechte zijden\u201d \u2014 van herkenning naar analyse. Vormen combineren tot grotere figuren (twee driehoeken maken een vierkant) bouwt het ruimtelijk inzicht op dat later nodig is voor breuken, oppervlakteberekening en geometrie. Het tellen van zijden en hoeken verbindt meetkunde direct met getalbegrip.',
    developmentalMilestones: [
      { milestone: 'Vormeigenschappen analyseren (5\u20136-jarigen tellen zijden en hoeken)', howWeAddress: 'Analysewerkbladen waarbij kinderen de zijden en hoeken van vormen tellen en vergelijken bouwen het vermogen op om vormen te beschrijven op basis van meetbare eigenschappen' },
      { milestone: 'Symmetrie herkennen en cre\u00ebren (kinderen ontdekken spiegellijnen in vormen)', howWeAddress: 'Symmetrie-activiteiten met vormen laten kinderen ontdekken welke vormen symmetrisch zijn en waar de spiegellijn loopt' },
      { milestone: 'Vormen combineren en ontleden (twee driehoeken vormen een vierkant)', howWeAddress: 'Tangram-achtige activiteiten waarbij kinderen grotere vormen bouwen uit kleinere bouwen ruimtelijk inzicht en combinatorisch denken op' },
      { milestone: 'Vormwoorden lezen en schrijven', howWeAddress: 'Woordherkenning- en schrijfactiviteiten met vormwoorden (cirkel, vierkant, driehoek) oefenen beginlezen met wiskundig vocabulaire' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot vier basisvormen (cirkel, vierkant, driehoek, rechthoek), gebruik tastbare vormblokken, en bied woordkaarten met vormafbeeldingen. Voor gevorderde kinderen: introduceer vijfhoek, zeshoek en driedimensionale vormen (kubus, bol), laat hen vormeigenschappen in een tabel registreren, en voeg complexere combinatieopdrachten toe.',
    parentTakeaway: 'Vormen zijn overal en groep 1-2 is het ideale moment om ze te onderzoeken. Doe samen een vormenjacht in huis: welke vormen zie je? Het raam is een rechthoek, het bord is een cirkel, de dakstructuur is een driehoek. Tel samen de hoeken en zijden. Na een vormenwerkblad kunt u samen een vormenkunstwerk maken: teken een huis, een robot of een dier met alleen basisvormen en label elke vorm \u2014 dit combineert meetkunde, tellen en creatieve expressie.',
    classroomIntegration: 'Het vormenthema is in groep 1-2 verweven met het hele curriculum: bij rekenen worden vormen geanalyseerd en gecombineerd, bij taal worden vormwoorden gelezen en geschreven, bij beeldende vorming worden vormkunstwerken gemaakt, en bij natuur worden vormen in de omgeving gezocht. De vormenwand in de klas met voorbeelden uit de echte wereld maakt meetkunde concreet en zichtbaar, in lijn met de SLO-doelen voor rekenen.',
    assessmentRubric: [
      { skill: 'Vormeigenschappen analyseren', emerging: 'benoemt drie basisvormen maar telt zijden en hoeken niet zelfstandig', proficient: 'telt zelfstandig zijden en hoeken van vijf vormen en vergelijkt hun eigenschappen', advanced: 'analyseert zes of meer vormen inclusief vijf- en zeshoeken en classificeert op eigenschappen' },
      { skill: 'Vormen combineren en ontleden', emerging: 'combineert twee vormen met hulp maar herkent het resultaat niet altijd', proficient: 'combineert zelfstandig drie of meer vormen tot een figuur en beschrijft de samenstelling', advanced: 'lost tangram-opdrachten op, ontleedt figuren in basisvormen en cre\u00ebert eigen ontwerpen' },
      { skill: 'Vormwoorden lezen en schrijven', emerging: 'herkent 2\u20133 vormwoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 vormwoorden op gelinieerd papier', advanced: 'schrijft alle vormwoorden correct en gebruikt ze in beschrijvende zinnen over eigenschappen' },
    ],
  },

  space: {
    seoTitle: 'Ruimte-oefeningen Groep 1-2 | LessonCraftStudio',
    seoDescription: 'Uitprintbare ruimte-oefeningen voor groep 1-2 (5\u20136 jaar). Tellen tot 20, optellen, lezen en schrijven. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'ruimte groep 1-2, ruimte oefeningen 5\u20136 jaar, ruimte oefeningen groep 1-2, ruimte uitprintbaar groep 1-2, ruimte werkbladen groep 1-2, ruimte activiteiten groep 1-2, ruimte leerbladen 5\u20136 jaar, ruimte gratis groep 1-2, ruimte PDF groep 1-2, ruimte rekenen',
    snippetAnswer: 'Ruimte-oefeningen voor groep 1-2 (5\u20136 jaar) gebruiken planeten, sterren en raketten als context voor optellen, groottevergelijking, ordening van de planeten en ruimtewoorden lezen en schrijven. Het oneindige heelal maakt abstracte getallen tastbaar via enorme schalen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 1-2 wordt het ruimtethema een springplank voor het begrijpen van grootte, afstand en ordening: vijf- en zesjarigen zijn diep gefascineerd door de ruimte en die fascinatie kan worden ingezet om wiskundige concepten te verdiepen. De SLO-leerlijnen voor natuur en techniek benadrukken het verkennen van de wereld voorbij de directe omgeving, en de ruimte is de ultieme uitbreiding daarvan. Rekenkundig biedt het thema rijke contexten: planeten ordenen op grootte en afstand, sterren tellen en optellen, en de volgorde van de planeten als vaste reeks onthouden. Het vergelijken van planetengroottes introduceert het concept van verhoudingen \u2014 de zon is zoveel keer groter dan de aarde. Taalkundig zijn ruimtewoorden boeiend: ster, maan, raket, planeet \u2014 woorden die de verbeelding prikkelen en kinderen motiveren om te lezen en schrijven.',
    developmentalMilestones: [
      { milestone: 'Ordening en reeksen (5\u20136-jarigen leren dat de planeten een vaste volgorde hebben)', howWeAddress: 'Planeetvolgorde-werkbladen waarbij kinderen de acht planeten in de juiste volgorde plaatsen bouwen het begrip op van vaste reeksen en ordening' },
      { milestone: 'Groottevergelijking en verhoudingen (kinderen vergelijken planeten op grootte)', howWeAddress: 'Vergelijkingsactiviteiten met planetengroottes laten kinderen ervaren dat objecten enorm in grootte kunnen verschillen en introduceren het verhoudingsbegrip' },
      { milestone: 'Optellen in ruimtecontext (sterren en planeten tellen en combineren)', howWeAddress: 'Optelopdrachten met sterren en planeten (vijf sterren aan de linkerkant plus drie rechts) verbinden rekenen met de fascinatie van het heelal' },
      { milestone: 'Ruimtewoorden lezen en schrijven', howWeAddress: 'Woordpuzzel- en schrijfactiviteiten met ruimtewoorden (ster, maan, zon, raket) oefenen beginlezen met woorden die de verbeelding prikkelen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk tot zon, maan en drie planeten, gebruik schaalmodellen voor groottevergelijking, en bied korte woordkaarten met afbeeldingen. Voor gevorderde kinderen: introduceer alle acht planeten met hun kenmerken, laat hen een ruimtedagboek bijhouden met maanfasen, en voeg grote getallen toe (de zon is zo groot als 1 miljoen aardes).',
    parentTakeaway: 'De nachtelijke hemel is het grootste klaslokaal voor groep 1-2. Ga samen sterren kijken en tel de sterren die jullie zien in een stukje lucht. Bekijk de maan en bespreek de vorm: is het een halve cirkel of een sikkel? Maak samen een planetenrij met fruit in verschillende groottes \u2014 een watermeloen als Jupiter, een druif als Mercurius. Na een ruimtewerkblad kunt u samen een zonnestelselmodel maken en de planeten ordenen \u2014 dit combineert ordening, groottevergelijking en creatieve expressie.',
    classroomIntegration: 'Het ruimtethema is in groep 1-2 een krachtig vakoverstijgend project: bij natuur worden zon, maan en sterren besproken, bij rekenen worden planeten geordend en sterren geteld, bij taal worden ruimteverhalen geschreven en ruimtewoorden gelezen, en bij beeldende vorming wordt een zonnestelsel gemaakt. Een ruimtehoek in de klas met boeken, modellen en werkbladen stimuleert verkennend leren, in lijn met de SLO-doelen voor natuur en techniek.',
    assessmentRubric: [
      { skill: 'Planeetvolgorde en ordening', emerging: 'benoemt zon en maan maar kent de planeetvolgorde niet', proficient: 'plaatst zelfstandig de acht planeten in de juiste volgorde en benoemt drie kenmerken', advanced: 'beschrijft alle planeten met kenmerken, vergelijkt systematisch en legt de volgorde uit' },
      { skill: 'Groottevergelijking', emerging: 'vergelijkt twee objecten (groter/kleiner) met hulp', proficient: 'ordent zelfstandig vijf objecten van klein naar groot en beschrijft de verhoudingen', advanced: 'vergelijkt met verhoudingstermen, schat relatieve groottes en maakt een schaalmodel' },
      { skill: 'Ruimtewoorden lezen en schrijven', emerging: 'herkent 2\u20133 ruimtewoorden met hulp van afbeeldingen', proficient: 'leest en schrijft zelfstandig 5\u20137 ruimtewoorden op gelinieerd papier', advanced: 'leest langere ruimtewoorden vlot en schrijft korte zinnen over het zonnestelsel' },
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
