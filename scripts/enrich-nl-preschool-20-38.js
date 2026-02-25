#!/usr/bin/env node
/**
 * SEO Part 319: NL Preschool Grade Enrichment — Themes 20-38
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the preschool grade block of 19 NL theme files (fruits through space).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  fruits: {
    seoTitle: 'Fruit-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare fruit-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'fruit kleuterschool, fruit oefeningen 3\u20134 jaar, fruit oefeningen kleuterschool, fruit uitprintbaar kleuterschool, fruit werkbladen kleuterschool, fruit activiteiten kleuterschool, fruit leerbladen 3\u20134 jaar, fruit gratis kleuterschool, fruit PDF kleuterschool, fruit kleuren',
    snippetAnswer: 'Fruit-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken appels, bananen en aardbeien om tellen, kleuren en sorteren te oefenen. De vertrouwdheid van fruit bij maaltijden maakt het een krachtig leerthema voor fijne motoriek en getalbegrip. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het fruitthema is uniek geschikt voor kleuters omdat drie- en vierjarigen fruit kennen als een van de eerste voorwerpen die ze bij naam, kleur en smaak kunnen herkennen \u2014 elke maaltijd en elk tussendoortje biedt een zintuiglijke ervaring die werkbladen kunnen verdiepen. Deze diepe vertrouwdheid maakt fruit tot een ideale steiger voor het opbouwen van tellen, sorteren en kleuren. Kinderen tellen appels in een fruitschaal en bouwen zo \u00e9\u00e9n-op-\u00e9\u00e9n-correspondentie op, sorteren fruit op kleur of grootte en ontwikkelen classificatievaardigheden, en kleuren gedetailleerde fruitafbeeldingen voor fijne motoriek. De SLO-leerlijnen benadrukken het verkennen van de wereld via zintuigen, en het fruitthema vervult dit doel wanneer kinderen het fruit op het werkblad verbinden met wat ze dagelijks proeven en aanraken. Bovendien ondersteunt het fruitthema gezonde eetgewoonten door positieve associaties met voedzaam voedsel op te bouwen.',
    developmentalMilestones: [
      { milestone: 'Tellen van kleine verzamelingen (\u00e9\u00e9n-op-\u00e9\u00e9n-correspondentie tot 10)', howWeAddress: 'Telactiviteiten met appels, bananen en aardbeien in een fruitschaal bouwen getalbegrip op via vertrouwde, tastbare voorwerpen' },
      { milestone: 'Sorteren op \u00e9\u00e9n kenmerk (3\u20134-jarigen leren groeperen op kleur of grootte)', howWeAddress: 'Sorteeractiviteiten waarbij fruit wordt gegroepeerd op kleur (rood/geel/groen) of grootte (groot/klein) ontwikkelen classificatievermogen' },
      { milestone: 'Zintuiglijke woordenschat (kleuters leren voorwerpen beschrijven met kleur, vorm en smaak)', howWeAddress: 'Benoem-activiteiten waarbij kinderen fruitsoorten beschrijven stimuleren de mondelinge taalontwikkeling en zintuiglijk bewustzijn' },
      { milestone: 'Fijnmotorische precisie bij kleuren (verfijning van pengreep en controle)', howWeAddress: 'Kleurplaten van fruitsoorten met variatie in detailniveau van eenvoudige appels tot gedetailleerde fruitmanden ondersteunen progressieve motorische ontwikkeling' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot drie of vier bekende fruitsoorten (appel, banaan, aardbei, sinaasappel), gebruik echt fruit als concrete aanvulling op het werkblad, en richt u op \u00e9\u00e9n vaardigheid tegelijk (alleen tellen of alleen sorteren). Voor gevorderde kleuters: breid uit met minder bekende fruitsoorten, introduceer eenvoudige patronen met fruitreeksen, en laat kinderen hun eigen fruitschaal ontwerpen met een bepaald aantal vruchten.',
    parentTakeaway: 'Fruit is het meest toegankelijke leerthema omdat het dagelijks op tafel staat. Laat uw kind bij het boodschappen doen fruit uitzoeken en tellen, sorteer samen appels op kleur en grootte, en maak een fruitsalade waarbij uw kind de ingredi\u00ebnten telt. Na een fruitwerkblad kunt u samen een fruitproeverij doen en nieuwe fruitsoorten ontdekken \u2014 elke maaltijd wordt een leermogelijkheid die tellen, kleuren en woordenschat versterkt.',
    classroomIntegration: 'Het fruitthema loopt door het hele kleuterschooljaar: in de kring wordt het fruit van de week ge\u00efntroduceerd met een echt exemplaar om te ruiken en voelen, bij werkhoeken worden tel- en kleurbladen gemaakt, bij het tussendoortje worden fruitsoorten benoemd en geteld, en in de ontdekhoek wordt fruit op kleur gesorteerd. Deze integratie sluit aan bij de SLO-doelen voor natuur\u00e9ducatie, rekenvaardigheid en gezondheidsbevordering.',
    assessmentRubric: [
      { skill: 'Tellen van fruitvoorwerpen', emerging: 'telt 1\u20134 fruitstukken met hulp en aanwijzen', proficient: 'telt zelfstandig tot 8 fruitstukken en koppelt aan het juiste cijfer', advanced: 'telt tot 10+, groepeert en vergelijkt hoeveelheden (meer appels dan bananen)' },
      { skill: 'Sorteren van fruit op kenmerk', emerging: 'sorteert fruit in twee groepen (bijv. rood/geel) met hulp van een volwassene', proficient: 'sorteert zelfstandig op \u00e9\u00e9n kenmerk (kleur of grootte) en benoemt de groepen', advanced: 'sorteert op meerdere kenmerken en legt de sorteerstrategie uit' },
      { skill: 'Fruitafbeeldingen kleuren', emerging: 'kleurt fruitvormen grotendeels buiten de lijnen met volle-vuist greep', proficient: 'kleurt binnen de lijnen met driepuntgreep en kiest passende kleuren', advanced: 'kleurt gedetailleerd met kleurvariatie en voegt zelf fruitdetails toe' },
    ],
  },

  furniture: {
    seoTitle: 'Meubels-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare meubels-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'meubels kleuterschool, meubels oefeningen 3\u20134 jaar, meubels oefeningen kleuterschool, meubels uitprintbaar kleuterschool, meubels werkbladen kleuterschool, meubels activiteiten kleuterschool, meubels leerbladen 3\u20134 jaar, meubels gratis kleuterschool, meubels PDF kleuterschool, meubels kleuren',
    snippetAnswer: 'Meubels-oefeningen voor de kleuterschool (3\u20134 jaar) helpen kinderen stoelen, tafels en kasten te herkennen, tellen en kleuren. De vertrouwde thuisomgeving maakt meubels tot een motiverend thema voor ruimtelijk bewustzijn en fijne motoriek. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het meubelthema is bijzonder geschikt voor kleuters omdat drie- en vierjarigen dagelijks omringd worden door meubels \u2014 ze zitten op stoelen, eten aan tafels, slapen in bedden en bergen speelgoed op in kasten. Deze alledaagse vertrouwdheid maakt meubels tot een krachtig anker voor leren, omdat elk werkbladconcept direct kan worden gekoppeld aan de eigen leefwereld van het kind. Kleuters in deze fase ontwikkelen ruimtelijk bewustzijn en leren positiewoorden als op, onder, naast en in, en meubels bieden de meest natuurlijke context om deze begrippen te oefenen. Het tellen van stoelen rond een tafel of het sorteren van meubels op kamer (keuken, slaapkamer, woonkamer) bouwt zowel getalbegrip als classificatievermogen op. De SLO-leerlijnen voor ori\u00ebntatie op jezelf en de wereld benadrukken het belang van de directe leefomgeving, en meubelwerkbladen vervullen dit doel op een gestructureerde, speelse manier.',
    developmentalMilestones: [
      { milestone: 'Ruimtelijke begrippen (3\u20134-jarigen leren positiewoorden als op, onder, naast, in)', howWeAddress: 'Positiewoordactiviteiten met meubels (de kat zit OP de stoel, de bal ligt ONDER de tafel) koppelen abstracte begrippen aan vertrouwde situaties' },
      { milestone: 'Classificatie op functie (kleuters leren dat voorwerpen bij bepaalde ruimtes horen)', howWeAddress: 'Sorteeractiviteiten waarbij meubels worden gekoppeld aan de juiste kamer (bed = slaapkamer, fornuis = keuken) stimuleren logisch denken' },
      { milestone: 'Tellen van voorwerpen in een afbeelding', howWeAddress: 'Telactiviteiten waarbij kinderen meubels in een kamer tellen bouwen getalbegrip op via herkenbare ruimtes' },
      { milestone: 'Fijnmotorische ontwikkeling door rechte en gebogen lijnen', howWeAddress: 'Kleur- en overtrekactiviteiten met meubels (rechte tafelpoten, ronde stoelzittingen) oefenen zowel rechte als gebogen lijnen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vijf basismeubelstukken (stoel, tafel, bed, kast, bank), gebruik poppenhuis-meubeltjes als tastbare aanvulling, en richt u op \u00e9\u00e9n positiewoord per sessie. Voor gevorderde kleuters: introduceer meer gedetailleerde meubels en kamers, voeg links/rechts begrippen toe, en laat kinderen hun droomkamer ontwerpen met een bepaald aantal meubels.',
    parentTakeaway: 'Uw huis is een volledig ingericht klaslokaal. Maak samen een meubeljacht: tel de stoelen in huis, benoem meubels per kamer, en oefen positiewoorden door een knuffel op, onder en naast meubels te leggen. Na een meubelwerkblad kunt u samen een tekening van de eigen slaapkamer maken \u2014 het tekenen van het bed, de kast en het bureau versterkt zowel ruimtelijk bewustzijn als fijne motoriek.',
    classroomIntegration: 'Het meubelthema integreert natuurlijk in de kleuterschoolroutines: in de kring worden positiewoorden geoefend met klasmeubilair, bij werkhoeken worden meubels geteld en gekleurd op werkbladen, in de huishoek wordt gespeeld met poppenhuis-meubels, en bij bewegingsactiviteiten worden positiewoorden geoefend (kruip ONDER de tafel, spring OP de mat). Dit sluit aan bij de SLO-doelen voor ori\u00ebntatie op de leefomgeving en taalontwikkeling.',
    assessmentRubric: [
      { skill: 'Positiewoorden gebruiken', emerging: 'begrijpt 1\u20132 positiewoorden (op, in) met hulp van een volwassene', proficient: 'gebruikt zelfstandig 4\u20135 positiewoorden (op, onder, naast, in, voor) met meubels', advanced: 'gebruikt alle positiewoorden correct en legt uit waar voorwerpen zich bevinden ten opzichte van meubels' },
      { skill: 'Meubels classificeren per kamer', emerging: 'koppelt 1\u20132 meubels aan de juiste kamer met hulp', proficient: 'sorteert zelfstandig 5\u20136 meubels bij de juiste kamer en benoemt ze', advanced: 'classificeert meubels op functie en kamer en bedenkt zelf nieuwe indelingscriteria' },
      { skill: 'Tellen van meubels in een sc\u00e8ne', emerging: 'telt 1\u20134 meubelstukken met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 meubelstukken in een kamersc\u00e8ne', advanced: 'telt boven de 10 en vergelijkt aantallen per kamer' },
    ],
  },

  garden: {
    seoTitle: 'Tuin-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare tuin-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'tuin kleuterschool, tuin oefeningen 3\u20134 jaar, tuin oefeningen kleuterschool, tuin uitprintbaar kleuterschool, tuin werkbladen kleuterschool, tuin activiteiten kleuterschool, tuin leerbladen 3\u20134 jaar, tuin gratis kleuterschool, tuin PDF kleuterschool, tuin kleuren',
    snippetAnswer: 'Tuin-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken bloemen, groenten en tuingereedschap om tellen, sorteren en kleuren te oefenen. De tuin biedt een rijke sensorische context voor natuur\u00e9ducatie en fijne motoriek. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het tuinthema is een van de rijkste thema\u2019s voor kleuters omdat drie- en vierjarigen gefascineerd zijn door het wonder van groei \u2014 een zaadje dat een plant wordt is voor hen bijna magisch. Deze verwondering is pedagogisch goud dat werkbladen systematisch kunnen benutten. Tuinwerkbladen laten kinderen bloemen en groenten tellen, tuingereedschap sorteren op functie, en kleurrijke tuinsc\u00e8nes kleuren. Nederland heeft een rijke tuincultuur en veel kinderen hebben toegang tot een tuin, balkon of schooltuin, waardoor werkbladen direct kunnen aansluiten bij echte ervaringen. De SLO-leerlijnen benadrukken het belang van natuur\u00e9ducatie en het waarnemen van groeiprocessen, en het tuinthema vervult beide doelen wanneer kinderen via gestructureerde activiteiten leren over planten, seizoenen en zorg voor de natuur.',
    developmentalMilestones: [
      { milestone: 'Begrip van groeiprocessen (3\u20134-jarigen beginnen oorzaak en gevolg te begrijpen)', howWeAddress: 'Volgorde-activiteiten waarbij kinderen de groei van zaad naar plant ordenen bouwen sequenti\u00eble denkvaardigheden en natuurbegrip op' },
      { milestone: 'Tellen van natuurobjecten in een sc\u00e8ne', howWeAddress: 'Telactiviteiten met bloemen, groenten en zaden in een tuinsc\u00e8ne versterken getalbegrip in een rijke visuele context' },
      { milestone: 'Kleurherkenning en -benoemen (kleuters verfijnen hun kleurkennis met natuurlijke kleuren)', howWeAddress: 'Kleuractiviteiten met bloemen in verschillende kleuren en groenten in diverse tinten breiden de kleurwoordenschat uit' },
      { milestone: 'Fijnmotorische ontwikkeling via gevarieerde vormen', howWeAddress: 'Kleurplaten van tuinsc\u00e8nes met ronde bloemen, rechte stengels en kronkelende wortels oefenen diverse motorische bewegingen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met drie of vier herkenbare tuinobjecten (bloem, wortel, gieter, schep), bied grote contouren aan, en combineer met een echte plantervaring (zaadjes in een potje). Voor gevorderde kleuters: introduceer meer tuingereedschap en plantensoorten, voeg eenvoudige groeivolgordes toe, en laat kinderen hun droomtuin ontwerpen en beschrijven.',
    parentTakeaway: 'Een tuin of zelfs een bloempot op het balkon is een levend klaslokaal. Plant samen een zaadje en laat uw kind de groei volgen door elke week te meten en tekenen. Tel samen de bloemen in de tuin, sorteer tuingereedschap op grootte, en benoem kleuren van bloemen. Na een tuinwerkblad kunt u samen onkruid wieden of bloemen water geven \u2014 de verbinding tussen werkblad en echte tuinervaring maakt het leren betekenisvol en duurzaam.',
    classroomIntegration: 'Het tuinthema is ideaal voor een seizoensproject: in het voorjaar worden zaadjes geplant in de schooltuin, in de kring wordt de groei besproken, bij werkhoeken worden tuinwerkbladen gecombineerd met zand- en wateractiviteiten, en buiten wordt in de moestuin gewerkt. Tuinwerkbladen met tel- en sorteeractiviteiten sluiten aan bij de SLO-doelen voor natuur\u00e9ducatie, rekenvaardigheid en verantwoordelijkheidsbesef.',
    assessmentRubric: [
      { skill: 'Groeivolgorde begrijpen', emerging: 'benoemt 1\u20132 stappen van plantengroei (zaad, bloem) met hulp', proficient: 'ordent zelfstandig 3\u20134 stappen van zaad naar plant en beschrijft elke stap', advanced: 'legt het groeiproces uit met meerdere stappen en benoemt wat een plant nodig heeft (water, licht)' },
      { skill: 'Tellen van tuinobjecten', emerging: 'telt 1\u20134 bloemen of groenten met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 tuinobjecten en noteert het juiste cijfer', advanced: 'telt boven de 10, vergelijkt hoeveelheden en groepeert objecten per soort' },
      { skill: 'Kleuren van tuinsc\u00e8nes', emerging: 'kleurt bloemen en planten grotendeels buiten de lijnen', proficient: 'kleurt binnen de lijnen met passende kleuren en driepuntgreep', advanced: 'kleurt gedetailleerd, kiest realistische kleuren en voegt eigen tuinelementen toe' },
    ],
  },

  halloween: {
    seoTitle: 'Halloween-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare halloween-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'halloween kleuterschool, halloween oefeningen 3\u20134 jaar, halloween oefeningen kleuterschool, halloween uitprintbaar kleuterschool, halloween werkbladen kleuterschool, halloween activiteiten kleuterschool, halloween leerbladen 3\u20134 jaar, halloween gratis kleuterschool, halloween PDF kleuterschool, halloween kleuren',
    snippetAnswer: 'Halloween-oefeningen voor de kleuterschool (3\u20134 jaar) combineren pompoenen, spoken en vleermuizen met tellen, kleuren en koppelen. Het spannende thema maakt leren tot een avontuur. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het halloweenthema spreekt kleuters aan op een unieke manier omdat drie- en vierjarigen zich in een fase bevinden waarin ze het verschil tussen echt en fantasie verkennen \u2014 spoken en heksen zijn griezelig genoeg om opwindend te zijn, maar niet zo eng dat het overweldigend wordt wanneer werkbladen ze in kleurrijke, vriendelijke illustraties presenteren. Deze milde spanning is een krachtige motivator die de betrokkenheid bij werkbladen verhoogt. Halloween biedt ook een rijke visuele context met herkenbare symbolen (pompoenen, vleermuizen, spoken, heksenhoeden) die perfect zijn voor telactiviteiten, patroonherkenning en kleurwerk. De SLO-leerlijnen benadrukken het belang van verbeelding en creatieve expressie, en het halloweenthema vervult deze doelen wanneer kinderen fantasiesc\u00e8nes kleuren en verhaaltjes vertellen over hun werkbladen.',
    developmentalMilestones: [
      { milestone: 'Verbeelding en fantasie-werkelijkheid onderscheid (3\u20134-jarigen verkennen het verschil tussen echt en nep)', howWeAddress: 'Halloweenactiviteiten met vriendelijke spoken en pompoenen helpen kinderen op een veilige manier het fantasie-werkelijkheid onderscheid te verkennen' },
      { milestone: 'Patroonherkenning met thematische elementen', howWeAddress: 'Slingerpatronen met pompoenen, vleermuizen en spoken helpen kinderen AB- en ABC-patronen herkennen in een motiverende context' },
      { milestone: 'Tellen van thematische voorwerpen', howWeAddress: 'Telactiviteiten met pompoenen, spoken en snoepjes in halloweensc\u00e8nes bouwen getalbegrip op met hoge betrokkenheid' },
      { milestone: 'Expressief kleuren met donkere en heldere kleuren', howWeAddress: 'Kleurplaten van halloweensc\u00e8nes die zwart, oranje en paars combineren stimuleren bewuste kleurkeuze en contrastbegrip' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik alleen vrolijke, niet-enge afbeeldingen (lachende pompoenen, vriendelijke spoken), beperk tellopdrachten tot vijf, en bied dikke contouren aan voor het kleuren. Voor gevorderde kleuters: voeg complexere patronen toe, introduceer eenvoudige optelopdrachten met snoepjes, en laat kinderen hun eigen halloweensc\u00e8ne ontwerpen en beschrijven.',
    parentTakeaway: 'Halloween biedt een schat aan leermomenten. Snijd samen een pompoen uit en tel de zaden, maak een halloweenslinger met herhalende patronen, en tel samen de snoepjes na het trick-or-treaten. Na een halloweenwerkblad kunt u samen een halloweenverhaal bedenken over de personages op het werkblad. Dit versterkt zowel getalbegrip als mondelinge taalvaardigheid op een manier die voelt als feest.',
    classroomIntegration: 'Het halloweenthema past perfect in een themaweek rond eind oktober: in de kring worden halloweenboeken voorgelezen, bij werkhoeken worden tel- en kleurbladen gemaakt, bij creatieve activiteiten worden maskers en slingers geknutseld, en op het schoolplein wordt een pompoenspeurtocht georganiseerd. Dit sluit aan bij de SLO-doelen voor creatieve expressie, rekenvaardigheid en sociaal-emotionele ontwikkeling.',
    assessmentRubric: [
      { skill: 'Tellen in halloweencontext', emerging: 'telt 1\u20134 pompoenen of spoken met hulp en aanwijzen', proficient: 'telt zelfstandig tot 8 halloweenvoorwerpen en koppelt aan het juiste cijfer', advanced: 'telt boven de 10 en vergelijkt aantallen van verschillende halloweenobjecten' },
      { skill: 'Patroonherkenning (halloweenthema)', emerging: 'herkent een AB-patroon in halloweenslingers met hulp', proficient: 'zet zelfstandig AB- en ABC-patronen voort en benoemt het patroon', advanced: 'cre\u00ebert eigen patronen met halloweenelementen en beschrijft de regel' },
      { skill: 'Creatief kleuren (halloweensc\u00e8nes)', emerging: 'kleurt halloweenplaatjes met willekeurige kleuren, grotendeels buiten de lijnen', proficient: 'kleurt binnen de lijnen met passende kleuren (oranje pompoen, zwarte vleermuis)', advanced: 'kleurt gedetailleerd met kleurvariatie en voegt eigen halloweenelementen toe' },
    ],
  },

  holidays: {
    seoTitle: 'Vakanties-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare vakanties-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vakanties kleuterschool, vakanties oefeningen 3\u20134 jaar, vakanties oefeningen kleuterschool, vakanties uitprintbaar kleuterschool, vakanties werkbladen kleuterschool, vakanties activiteiten kleuterschool, vakanties leerbladen 3\u20134 jaar, vakanties gratis kleuterschool, vakanties PDF kleuterschool, vakanties kleuren',
    snippetAnswer: 'Vakanties-oefeningen voor de kleuterschool (3\u20134 jaar) combineren feestdagen als Sinterklaas, Kerst en Pasen met tellen, kleuren en koppelen. De feestelijke sfeer maakt leren extra motiverend. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het vakantiethema heeft een unieke emotionele kracht voor kleuters omdat drie- en vierjarigen feestdagen beleven als de hoogtepunten van het jaar \u2014 Sinterklaas, Kerst, Carnaval en Pasen creëren een opwindende spanning die werkbladen als leerhefboom kunnen benutten. Deze feestelijke motivatie verhoogt de betrokkenheid bij tellen, kleuren en koppelen aanzienlijk. Vakantiethema\u2019s bieden ook een rijke culturele context die kinderen helpt tradities te begrijpen en te waarderen. In Nederland zijn feestdagen als Koningsdag, Sinterklaas en Kerst diep verankerd in het dagelijks leven, en werkbladen die deze vieringen gebruiken sluiten naadloos aan bij de leefwereld van het kind. De SLO-leerlijnen benadrukken het belang van ori\u00ebntatie op de samenleving en cultureel bewustzijn, en het vakantiethema vervult deze doelen terwijl het tegelijkertijd rekenvaardigheid en fijne motoriek versterkt.',
    developmentalMilestones: [
      { milestone: 'Tijdsbesef en seizoensritme (3\u20134-jarigen beginnen het jaarritme van feestdagen te herkennen)', howWeAddress: 'Koppelactiviteiten waarbij feestdagen aan seizoenen worden gekoppeld (Kerst = winter, Pasen = lente) bouwen kalenderbesef op' },
      { milestone: 'Cultureel bewustzijn (kleuters leren dat er verschillende tradities en vieringen bestaan)', howWeAddress: 'Vakantie-werkbladen die diverse feestdagen presenteren verbreden het wereldbeeld en stimuleren gesprekken over tradities' },
      { milestone: 'Tellen in feestelijke contexten (koppeling van getallen aan emotioneel geladen voorwerpen)', howWeAddress: 'Telactiviteiten met cadeautjes, kerstballen en paaseieren benutten de feestelijke motivatie voor getalontwikkeling' },
      { milestone: 'Fijnmotorische expressie bij versieringsactiviteiten', howWeAddress: 'Kleurplaten van feestsc\u00e8nes met veel decoratieve details stimuleren nauwkeurig kleuren en creatieve expressie' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: richt u op \u00e9\u00e9n feestdag per keer, gebruik werkbladen met grote, eenvoudige afbeeldingen, en verbind de activiteit met concrete ervaringen (eigen Sinterklaaservaring). Voor gevorderde kleuters: combineer meerdere feestdagen op \u00e9\u00e9n werkblad, voeg seizoenssortering toe, en laat kinderen hun eigen feestdagkaart ontwerpen met een patroon van versieringen.',
    parentTakeaway: 'Feestdagen zijn van nature leermomenten. Tel samen de cadeautjes onder de kerstboom, sorteer paaseieren op kleur, en maak Sinterklaastekeningen met een bepaald aantal pepernoten. Na een vakantiewerkblad kunt u samen een feestkalender maken waarop uw kind de feestdagen tekent en telt hoeveel nachten het nog slapen is. Elk feest wordt zo een les in tellen, kleuren en seizoensbesef.',
    classroomIntegration: 'Het vakantiethema biedt het hele jaar door thematische ankerpunten: Herfst/Sint-Maarten, Sinterklaas, Kerst, Carnaval, Pasen en Koningsdag. Bij elk feest worden passende werkbladen ingezet in de werkhoeken, wordt er in de kring gesproken over tradities, en worden creatieve activiteiten gekoppeld aan de feestdag. Dit sluit aan bij de SLO-doelen voor cultureel bewustzijn, rekenvaardigheid en creatieve expressie.',
    assessmentRubric: [
      { skill: 'Feestdagen herkennen en benoemen', emerging: 'herkent 1\u20132 feestdagen (Kerst, verjaardag) met hulp', proficient: 'benoemt zelfstandig 4\u20135 feestdagen en koppelt ze aan het juiste seizoen', advanced: 'beschrijft tradities van meerdere feestdagen en vergelijkt verschillende vieringen' },
      { skill: 'Tellen in feestelijke context', emerging: 'telt 1\u20134 feestelijke voorwerpen met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 voorwerpen en noteert het juiste cijfer', advanced: 'telt boven de 10 en vergelijkt hoeveelheden van verschillende feestobjecten' },
      { skill: 'Creatief kleuren (feestsc\u00e8nes)', emerging: 'kleurt feestplaatjes met willekeurige kleuren, buiten de lijnen', proficient: 'kleurt binnen de lijnen met passende feestelijke kleuren', advanced: 'kleurt gedetailleerd en voegt eigen decoratieve elementen toe' },
    ],
  },

  household: {
    seoTitle: 'Huishouden-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare huishouden-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'huishouden kleuterschool, huishouden oefeningen 3\u20134 jaar, huishouden oefeningen kleuterschool, huishouden uitprintbaar kleuterschool, huishouden werkbladen kleuterschool, huishouden activiteiten kleuterschool, huishouden leerbladen 3\u20134 jaar, huishouden gratis kleuterschool, huishouden PDF kleuterschool, huishouden kleuren',
    snippetAnswer: 'Huishouden-oefeningen voor de kleuterschool (3\u20134 jaar) helpen kinderen dagelijkse huishoudelijke voorwerpen te herkennen, tellen en sorteren. Borden, kopjes en bestek worden leermiddelen voor classificatie en fijne motoriek. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het huishoudthema is zeer geschikt voor kleuters omdat drie- en vierjarigen gefascineerd zijn door het nabootsen van huishoudelijke taken \u2014 ze willen helpen met koken, tafeldekken en opruimen. Dit nabootsingsdrang is een van de krachtigste leermechanismen op deze leeftijd. Werkbladen over huishoudelijke voorwerpen (borden, kopjes, pannen, bezems) sluiten direct aan bij het dagelijks spel in de huishoek en de eigen thuissituatie. Het tellen van borden voor het tafeldekken oefent \u00e9\u00e9n-op-\u00e9\u00e9n-correspondentie op de meest praktische manier, terwijl het sorteren van keukengerei op functie classificatievaardigheden ontwikkelt. De SLO-leerlijnen benadrukken het belang van zelfredzaamheid en ori\u00ebntatie op de dagelijkse leefomgeving, en het huishoudthema vervult beide doelen wanneer kinderen via werkbladen leren over de voorwerpen die ze dagelijks gebruiken.',
    developmentalMilestones: [
      { milestone: 'Zelfredzaamheid en nabootsing (3\u20134-jarigen willen helpen met huishoudelijke taken)', howWeAddress: 'Koppelactiviteiten waarbij huishoudelijke voorwerpen aan hun functie worden gekoppeld (bord = eten, bezem = vegen) versterken zelfredzaamheid en woordenschat' },
      { milestone: '\u00c9\u00e9n-op-\u00e9\u00e9n-correspondentie (tafeldekken als natuurlijke telcontext)', howWeAddress: 'Telactiviteiten waarbij kinderen voor elk familielid een bord, vork en mes tellen oefenen correspondentie in een praktische context' },
      { milestone: 'Classificatie op functie en ruimte', howWeAddress: 'Sorteeractiviteiten waarbij huishoudelijke voorwerpen worden gegroepeerd op de kamer waar ze horen of de taak waarvoor ze dienen' },
      { milestone: 'Fijnmotorische controle bij eenvoudige vormen', howWeAddress: 'Kleur- en overtrekactiviteiten met kopjes, borden en bestek oefenen het volgen van ronde en rechte vormen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vijf basishoudelijke voorwerpen (bord, kopje, lepel, bezem, emmer), gebruik speelgoedversies als concrete aanvulling, en richt u op \u00e9\u00e9n sorteercriterium. Voor gevorderde kleuters: breid uit met meer keukengerei en schoonmaakartikelen, voeg eenvoudige telscenario\u2019s toe (hoeveel borden heb je nodig voor vier personen?), en laat kinderen een tafeldekopdracht uitvoeren.',
    parentTakeaway: 'Huishoudelijke taken zijn dagelijkse lessen in tellen en sorteren. Laat uw kind helpen met tafeldekken en tel samen de borden, vorken en messen. Sorteer samen de afwas op soort (borden bij borden, kopjes bij kopjes) en benoem de voorwerpen. Na een huishoudwerkblad kunt u uw kind vragen om de knuffels of poppen te voeden met speelgoedbordjes \u2014 elk rollenspelmoment versterkt de vaardigheden van het werkblad.',
    classroomIntegration: 'Het huishoudthema komt tot leven in de huishoek: kinderen spelen met speelgoedkeukens, dekken de tafel, en ruimen op. Werkbladen worden gecombineerd met rollenspelactiviteiten en de dagelijkse opruimroutine. In de kring worden huishoudelijke voorwerpen besproken en benoemd, en bij werkhoeken worden tel- en sorteerbladen gemaakt. Dit sluit aan bij de SLO-doelen voor zelfredzaamheid, taalontwikkeling en sociaal spel.',
    assessmentRubric: [
      { skill: 'Huishoudelijke voorwerpen benoemen', emerging: 'benoemt 3\u20134 basisvoorwerpen (bord, kopje, lepel) met hulp', proficient: 'benoemt zelfstandig 7\u20138 huishoudelijke voorwerpen en beschrijft hun functie', advanced: 'benoemt 12+ voorwerpen, groepeert ze per ruimte en legt hun gebruik uit' },
      { skill: 'Tafeldekken-correspondentie', emerging: 'legt met hulp 1\u20132 voorwerpen per persoon neer', proficient: 'dekt zelfstandig een tafel voor 3\u20134 personen met bord, vork en mes', advanced: 'dekt voor 5+ personen, controleert of alles compleet is en corrigeert fouten' },
      { skill: 'Sorteren van huishoudelijke voorwerpen', emerging: 'sorteert 2\u20133 voorwerpen in twee groepen met hulp', proficient: 'sorteert zelfstandig op functie of kamer en benoemt de groepen', advanced: 'sorteert op meerdere criteria en bedenkt eigen indelingscategorie\u00ebn' },
    ],
  },

  insects: {
    seoTitle: 'Insecten-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare insecten-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'insecten kleuterschool, insecten oefeningen 3\u20134 jaar, insecten oefeningen kleuterschool, insecten uitprintbaar kleuterschool, insecten werkbladen kleuterschool, insecten activiteiten kleuterschool, insecten leerbladen 3\u20134 jaar, insecten gratis kleuterschool, insecten PDF kleuterschool, insecten kleuren',
    snippetAnswer: 'Insecten-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken vlinders, lieveheersbeestjes en bijen om tellen, patronen en kleuren te oefenen. De fascinatie van jonge kinderen voor kriebelbeestjes maakt leren bijzonder motiverend. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het insectenthema is magnetisch voor kleuters omdat drie- en vierjarigen een aangeboren fascinatie hebben voor kleine kriebelbeestjes \u2014 ze hurken neer om mieren te volgen, vangen lieveheersbeestjes op hun vinger en bewonderen vlinders in de tuin. Deze spontane nieuwsgierigheid is een krachtige motivator die werkbladen kunnen benutten. Insecten bieden ook prachtige kansen voor patroonherkenning: de stippen op een lieveheersbeestje, de symmetrie van vlindervleugels en de strepen van een bij zijn visuele patronen die kleuters kunnen tellen en benoemen. Het tellen van insectenpoten (zes!) introduceert een specifiek getal dat kinderen fascineert. De SLO-leerlijnen benadrukken het belang van natuur\u00e9ducatie en het waarnemen van kleine dieren in de omgeving, en het insectenthema vervult deze doelen op een manier die aansluit bij de natuurlijke verwondering van kleuters.',
    developmentalMilestones: [
      { milestone: 'Gedetailleerde waarneming (3\u20134-jarigen leren nauwkeurig kijken naar kleine details)', howWeAddress: 'Observatie-activiteiten met insectenafbeeldingen waarbij kinderen poten, vleugels en voelsprieten tellen scherpen het waarnemingsvermogen' },
      { milestone: 'Patroonherkenning in de natuur (stippen, strepen, symmetrie)', howWeAddress: 'Activiteiten met lieveheersbeestjes-stippen en vlindervleugel-symmetrie laten kinderen patronen herkennen in een natuurlijke context' },
      { milestone: 'Tellen tot 10 met specifieke aantallen (6 poten, 8 poten)', howWeAddress: 'Telactiviteiten met insectenpoten en -vleugels bouwen getalbegrip op met concrete, verifieerbare aantallen' },
      { milestone: 'Fijnmotorische precisie bij kleine details', howWeAddress: 'Kleurplaten van insecten met kleine details (stippen, strepen, vleugels) vereisen nauwkeurige motorische controle' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik drie of vier bekende insecten (vlinder, lieveheersbeestje, bij, mier), bied grote kleurplaten met dikke lijnen aan, en richt u op \u00e9\u00e9n kenmerk per sessie (alleen tellen of alleen kleuren). Voor gevorderde kleuters: introduceer meer insectensoorten met hun specifieke kenmerken, voeg symmetrie-activiteiten toe (vlindervleugels), en laat kinderen insecten sorteren op aantal poten of vleugels.',
    parentTakeaway: 'Insecten zijn overal en vormen een gratis leermiddel. Ga samen op insectenjacht in de tuin of het park: tel de mieren op het pad, zoek lieveheersbeestjes in de struiken, en bewonder vlinders in de bloemen. Na een insectenwerkblad kunt u samen een insectenhotel bouwen of een vergrootglas gebruiken om insecten van dichtbij te bekijken. De verbinding tussen werkblad en echte natuur maakt het leren onvergetelijk.',
    classroomIntegration: 'Het insectenthema past ideaal in het voorjaar en de zomer: in de kring worden insectenboeken voorgelezen en echte insecten bekeken met een vergrootglas, bij werkhoeken worden insecten geteld en gekleurd, buiten worden insecten gezocht en geobserveerd, en in de knutselhoek worden vlinders en lieveheersbeestjes gemaakt. Dit sluit aan bij de SLO-doelen voor natuur\u00e9ducatie, waarneming en rekenvaardigheid.',
    assessmentRubric: [
      { skill: 'Insectenherkenning', emerging: 'herkent 1\u20132 insecten (vlinder, lieveheersbeestje) met hulp', proficient: 'benoemt zelfstandig 4\u20135 insecten en beschrijft een opvallend kenmerk', advanced: 'herkent 7+ insecten en vergelijkt kenmerken (aantal poten, vleugels, leefomgeving)' },
      { skill: 'Tellen van insectenkenmerken', emerging: 'telt 1\u20134 poten of stippen met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 kenmerken (6 poten, stippen op lieveheersbeestje) en noteert het cijfer', advanced: 'telt boven de 10 en vergelijkt aantallen tussen verschillende insecten' },
      { skill: 'Patroonherkenning (insectenpatronen)', emerging: 'herkent een eenvoudig patroon (stippen) met hulp', proficient: 'herkent zelfstandig stippen-, strepen- en symmetriepatronen bij insecten', advanced: 'cre\u00ebert eigen insectenpatronen en beschrijft de symmetrieregel' },
    ],
  },

  jobs: {
    seoTitle: 'Beroepen-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare beroepen-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'beroepen kleuterschool, beroepen oefeningen 3\u20134 jaar, beroepen oefeningen kleuterschool, beroepen uitprintbaar kleuterschool, beroepen werkbladen kleuterschool, beroepen activiteiten kleuterschool, beroepen leerbladen 3\u20134 jaar, beroepen gratis kleuterschool, beroepen PDF kleuterschool, beroepen kleuren',
    snippetAnswer: 'Beroepen-oefeningen voor de kleuterschool (3\u20134 jaar) helpen kinderen brandweermannen, dokters en bakkers te herkennen en hun gereedschappen te koppelen. Het thema stimuleert sociaal bewustzijn en fijne motoriek. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het beroepenthema is bijzonder geschikt voor kleuters omdat drie- en vierjarigen actief bezig zijn met rollenspel \u2014 ze spelen doktertje, brandweerman en winkeltje, en verkennen zo de volwassen wereld op hun eigen manier. Dit fantasiespel is een kernactiviteit in de kleuterontwikkeling en werkbladen over beroepen voeden deze verbeelding. Beroepenactiviteiten waarbij kinderen gereedschappen aan beroepen koppelen (stethoscoop = dokter, slang = brandweerman) bouwen classificatie- en redeneervermogen op, terwijl het kleuren van mensen in diverse beroepen sociale bewustwording en respect voor alle soorten werk stimuleert. De SLO-leerlijnen benadrukken het belang van ori\u00ebntatie op de samenleving en het verkennen van sociale rollen, en het beroepenthema vervult deze doelen wanneer kinderen via gestructureerde activiteiten leren over de mensen die hun gemeenschap draaiende houden.',
    developmentalMilestones: [
      { milestone: 'Rollenspel en sociale verbeelding (3\u20134-jarigen verkennen sociale rollen via fantasiespel)', howWeAddress: 'Beroepenactiviteiten met herkenbare figuren (dokter, brandweerman, bakker) voeden het verbeeldingsspel en stimuleren sociaal bewustzijn' },
      { milestone: 'Koppelen van voorwerpen aan functie (gereedschap bij het juiste beroep)', howWeAddress: 'Koppelactiviteiten waarbij gereedschappen aan beroepen worden verbonden (spuit = verpleger, hamer = timmerman) bouwen logisch redeneren op' },
      { milestone: 'Woordenschatuitbreiding met sociale begrippen', howWeAddress: 'Benoem-activiteiten waarbij kinderen beroepen en gereedschappen leren benoemen breiden de woordenschat uit met maatschappelijk relevante woorden' },
      { milestone: 'Fijnmotorische expressie bij menselijke figuren', howWeAddress: 'Kleurplaten van mensen in beroepskleding met variatie in detail bieden uitdaging voor motorische precisie en kleurkeuze' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vier of vijf bekende beroepen (dokter, brandweerman, politieagent, leraar, bakker), gebruik rollenspelattributen als aanvulling, en richt u op \u00e9\u00e9n koppeling per keer. Voor gevorderde kleuters: introduceer minder bekende beroepen, voeg meerdere gereedschappen per beroep toe, en laat kinderen hun droomberoep tekenen en beschrijven.',
    parentTakeaway: 'Beroepen komen overal voor in het dagelijks leven. Benoem de beroepen die u tegenkomt: de bakker bij de bakkerij, de postbode die de post brengt, de dokter bij het consultatiebureau. Speel samen beroepen na met eenvoudige attributen (een plastic stethoscoop, een kookmuts). Na een beroepenwerkblad kunt u uw kind vragen wat het later wil worden en samen een tekening maken van dat droomberoep \u2014 dit stimuleert verbeelding en woordenschat.',
    classroomIntegration: 'Het beroepenthema leeft in de kleuterschool via de verkleedhoek met beroepsattributen, bezoekjes van ouders die hun beroep presenteren, en uitstapjes naar de bakker of de brandweerkazerne. Werkbladen worden gecombineerd met rollenspelactiviteiten in de huishoek en de constructiehoek. Dit sluit aan bij de SLO-doelen voor ori\u00ebntatie op de samenleving, taalontwikkeling en sociaal-emotionele ontwikkeling.',
    assessmentRubric: [
      { skill: 'Beroepen herkennen en benoemen', emerging: 'herkent 2\u20133 beroepen (dokter, brandweerman, politie) met hulp', proficient: 'benoemt zelfstandig 5\u20136 beroepen en beschrijft wat ze doen', advanced: 'benoemt 8+ beroepen, beschrijft hun taken en gereedschappen en vergelijkt ze' },
      { skill: 'Gereedschap-beroep koppeling', emerging: 'koppelt 1\u20132 gereedschappen aan het juiste beroep met hulp', proficient: 'koppelt zelfstandig 4\u20135 gereedschappen aan beroepen en benoemt ze', advanced: 'koppelt 7+ gereedschappen en bedenkt zelf extra gereedschappen per beroep' },
      { skill: 'Kleuren van beroepsfiguren', emerging: 'kleurt figuren grotendeels buiten de lijnen met willekeurige kleuren', proficient: 'kleurt binnen de lijnen met passende kleuren voor beroepskleding', advanced: 'kleurt gedetailleerd met realistische kleuren en voegt eigen achtergronddetails toe' },
    ],
  },

  music: {
    seoTitle: 'Muziek-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare muziek-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'muziek kleuterschool, muziek oefeningen 3\u20134 jaar, muziek oefeningen kleuterschool, muziek uitprintbaar kleuterschool, muziek werkbladen kleuterschool, muziek activiteiten kleuterschool, muziek leerbladen 3\u20134 jaar, muziek gratis kleuterschool, muziek PDF kleuterschool, muziek kleuren',
    snippetAnswer: 'Muziek-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken instrumenten, noten en ritmes om tellen, patronen en kleuren te oefenen. Muziek versterkt auditief bewustzijn en fijne motoriek op speelse wijze. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het muziekthema is bijzonder krachtig voor kleuters omdat drie- en vierjarigen van nature reageren op muziek \u2014 ze dansen spontaan, klappen in hun handen en experimenteren met geluiden. Dit aangeboren muzikale instinct is een uitstekend vertrekpunt voor gestructureerd leren. Muziekwerkbladen combineren instrumentherkenning met tellen (hoeveel trommels tel je?), patroonherkenning met ritmes (klap-klap-stamp, klap-klap-stamp), en fijne motoriek met het kleuren van instrumenten. Het auditieve aspect van muziek activeert andere hersengebieden dan visuele taken, waardoor muziekwerkbladen een waardevolle aanvulling bieden op reguliere activiteiten. De SLO-leerlijnen voor kunstzinnige ori\u00ebntatie benadrukken het belang van muzikale ervaring, en werkbladen bouwen de visuele herkenning van instrumenten en muzikale patronen op die deze ervaringen verdiepen.',
    developmentalMilestones: [
      { milestone: 'Ritmegevoel en patroonherkenning (3\u20134-jarigen voelen ritmes aan en herkennen herhalingen)', howWeAddress: 'Ritmepatroon-activiteiten waarbij kinderen visuele patronen van muzieknoten voortzetten bouwen een brug tussen auditief ritme en visueel patroondenken' },
      { milestone: 'Instrumentherkenning (kleuters leren de namen en klanken van basismuziekinstrumenten)', howWeAddress: 'Koppelactiviteiten waarbij instrumenten aan hun geluid of speelwijze worden gekoppeld bouwen muzikale woordenschat op' },
      { milestone: 'Tellen van muzikale elementen', howWeAddress: 'Telactiviteiten met instrumenten, muzieknoten en muzikanten in een sc\u00e8ne versterken getalbegrip via een motiverend thema' },
      { milestone: 'Fijnmotorische expressie bij gevarieerde vormen', howWeAddress: 'Kleurplaten van instrumenten met diverse vormen (ronde trommel, gebogen viool, rechte fluit) oefenen verschillende motorische bewegingen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vier basismuziekinstrumenten (trommel, xylofoon, tamboerijn, maracas), combineer werkbladen met echte instrumenten om te bespelen, en richt u op eenvoudige AB-patronen. Voor gevorderde kleuters: introduceer meer instrumenten en instrumentfamilies, voeg complexere ritmepatronen toe, en laat kinderen hun eigen muzikaal patroon ontwerpen.',
    parentTakeaway: 'Muziek is overal in het dagelijks leven en biedt eindeloze leermogelijkheden. Maak samen muziek met potten en pannen als instrumenten, klap ritmes na en tel de slagen. Luister naar muziek en benoem instrumenten die u hoort. Na een muziekwerkblad kunt u samen een ritme-instrument maken van rijst in een plastic fles \u2014 het schudden en tellen combineert muzikale ervaring met getalbegrip.',
    classroomIntegration: 'Het muziekthema doorweeft de hele kleuterschooldag: in de kring worden liedjes gezongen en ritmes geklapt, bij werkhoeken worden muziekwerkbladen gecombineerd met een muziekhoek met instrumenten, bij bewegingsactiviteiten wordt gedanst en gestopt op het ritme, en bij creatieve activiteiten worden instrumenten geknutseld. Dit sluit aan bij de SLO-doelen voor kunstzinnige ori\u00ebntatie, motorische ontwikkeling en rekenvaardigheid (patronen).',
    assessmentRubric: [
      { skill: 'Instrumentherkenning', emerging: 'herkent 1\u20132 instrumenten (trommel, xylofoon) met hulp', proficient: 'benoemt zelfstandig 4\u20135 instrumenten en beschrijft hoe je ze bespeelt', advanced: 'herkent 7+ instrumenten, groepeert ze op speelwijze (slaan, blazen, tokkelen) en benoemt hun klank' },
      { skill: 'Ritmepatronen herkennen', emerging: 'herkent een AB-ritme met hulp (klap-stamp, klap-stamp)', proficient: 'zet zelfstandig AB- en ABC-patronen voort en klapt ze na', advanced: 'cre\u00ebert eigen ritmepatronen en kan ze uitleggen en voordoen' },
      { skill: 'Tellen van muzikale elementen', emerging: 'telt 1\u20134 instrumenten of noten met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 en koppelt aan het juiste cijfer', advanced: 'telt boven de 10 en vergelijkt aantallen in een muzieksc\u00e8ne' },
    ],
  },

  nature: {
    seoTitle: 'Natuur-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare natuur-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'natuur kleuterschool, natuur oefeningen 3\u20134 jaar, natuur oefeningen kleuterschool, natuur uitprintbaar kleuterschool, natuur werkbladen kleuterschool, natuur activiteiten kleuterschool, natuur leerbladen 3\u20134 jaar, natuur gratis kleuterschool, natuur PDF kleuterschool, natuur kleuren',
    snippetAnswer: 'Natuur-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken bomen, rivieren en bergen om tellen, sorteren en kleuren te oefenen. Het brede natuurthema stimuleert verwondering en ecologisch bewustzijn bij jonge kinderen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het natuurthema is het meest omvattende thema voor kleuters omdat drie- en vierjarigen zich in een fase van intense verwondering bevinden \u2014 ze willen alles in de buitenwereld aanraken, ruiken en onderzoeken. Deze natuurlijke nieuwsgierigheid is de krachtigste motivator voor leren op deze leeftijd. Natuurwerkbladen bieden een breed canvas dat bomen, bloemen, rivieren, bergen, wolken en seizoenen omvat, waardoor er eindeloze variatie mogelijk is in tel-, sorteer- en kleuractiviteiten. Het brede karakter van het natuurthema maakt het bijzonder waardevol voor het bouwen van een ecologisch basisbewustzijn: kinderen leren dat planten, dieren, water en aarde samen een geheel vormen. De SLO-leerlijnen benadrukken het belang van natuur- en milieueducatie als doorlopende leerlijn, en het natuurthema is het fundament waarop alle specifiekere thema\u2019s (bos, tuin, oceaan) voortbouwen.',
    developmentalMilestones: [
      { milestone: 'Verwondering en nieuwsgierigheid (3\u20134-jarigen ontwikkelen een onderzoekende houding tegenover de natuur)', howWeAddress: 'Observatie-activiteiten waarbij kinderen natuurelementen op werkbladen herkennen van buitenervaringen stimuleren de onderzoekende houding' },
      { milestone: 'Seizoensbesef (kleuters beginnen de vier seizoenen te herkennen)', howWeAddress: 'Seizoens-sorteeractiviteiten waarbij kinderen natuursc\u00e8nes aan seizoenen koppelen bouwen kalenderbesef en natuurbegrip op' },
      { milestone: 'Tellen van natuurobjecten in diverse sc\u00e8nes', howWeAddress: 'Telactiviteiten met bomen, bloemen, wolken en dieren in natuursc\u00e8nes versterken getalbegrip in gevarieerde contexten' },
      { milestone: 'Fijnmotorische expressie bij organische vormen', howWeAddress: 'Kleurplaten van natuurlandschappen met bomen, bergen en rivieren oefenen diverse motorische bewegingen van vloeiende tot rechte lijnen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met herkenbare natuurelementen (zon, boom, bloem, wolk), bied grote contouren aan, en combineer met een buitenactiviteit. Voor gevorderde kleuters: introduceer meer gedetailleerde natuursc\u00e8nes met meerdere elementen, voeg seizoensvergelijkingen toe, en laat kinderen hun favoriete natuurplek tekenen met een bepaald aantal elementen.',
    parentTakeaway: 'De natuur is het grootste en gratis klaslokaal ter wereld. Maak dagelijks een korte wandeling en tel samen bomen, bloemen en vogels. Verzamel bladeren en steentjes om thuis te sorteren op grootte en kleur. Na een natuurwerkblad kunt u samen een seizoensboek maken waarin uw kind elke maand een natuurtekening maakt. Deze regelmatige verbinding tussen werkblad en buitenervaring bouwt zowel natuurkennis als schoolvaardigheden op.',
    classroomIntegration: 'Het natuurthema loopt als rode draad door het hele kleuterschooljaar: elk seizoen biedt nieuwe natuurelementen om te verkennen. In de kring worden seizoensveranderingen besproken, bij werkhoeken worden natuurwerkbladen gemaakt, buiten wordt de natuur geobserveerd met zoekkaarten, en op de natuurtafel worden vondsten uitgestald. Dit sluit aan bij de SLO-doelen voor natuur- en milieueducatie, rekenvaardigheid en taalontwikkeling.',
    assessmentRubric: [
      { skill: 'Natuurelementen herkennen en benoemen', emerging: 'benoemt 2\u20133 natuurelementen (zon, boom, bloem) met hulp', proficient: 'benoemt zelfstandig 6\u20137 natuurelementen en beschrijft waar je ze vindt', advanced: 'benoemt 10+ elementen, beschrijft relaties (de boom heeft bladeren die vallen in de herfst) en koppelt aan seizoenen' },
      { skill: 'Seizoensherkenning', emerging: 'herkent zomer en winter met hulp van een volwassene', proficient: 'benoemt zelfstandig vier seizoenen en koppelt passende natuurbeelden', advanced: 'beschrijft seizoensveranderingen en legt uit waarom de natuur er per seizoen anders uitziet' },
      { skill: 'Tellen in natuursc\u00e8nes', emerging: 'telt 1\u20134 natuurobjecten met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 objecten in een natuursc\u00e8ne en noteert het cijfer', advanced: 'telt boven de 10, groepeert per soort en vergelijkt hoeveelheden' },
    ],
  },

  numbers: {
    seoTitle: 'Getallen-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare getallen-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'getallen kleuterschool, getallen oefeningen 3\u20134 jaar, getallen oefeningen kleuterschool, getallen uitprintbaar kleuterschool, getallen werkbladen kleuterschool, getallen activiteiten kleuterschool, getallen leerbladen 3\u20134 jaar, getallen gratis kleuterschool, getallen PDF kleuterschool, getallen kleuren',
    snippetAnswer: 'Getallen-oefeningen voor de kleuterschool (3\u20134 jaar) helpen kinderen cijfers 1\u201310 te herkennen, tellen en schrijven. Het getallen-thema is het fundament voor alle rekenvaardigheden en bouwt getalbegrip op via kleuren en koppelen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het getallenthema is het meest fundamentele thema voor kleuters omdat drie- en vierjarigen zich in de cruciale fase bevinden waarin ze de betekenis van cijfers gaan begrijpen \u2014 dat het symbool 3 staat voor drie vingers, drie appels of drie blokken. Dit conceptuele getalbegrip is de hoeksteen van alle latere rekenvaardigheid. Getallenwerkbladen op kleuterniveau bouwen deze basis systematisch op: kinderen leren cijfers herkennen via overtrekken, koppelen cijfers aan hoeveelheden via tel-en-koppel-activiteiten, en ontwikkelen getalvolgorde via oplopende reeksen. De motorische component van het schrijven van cijfers \u2014 het correct vormen van 1 tot 10 \u2014 is tegelijkertijd een fijnmotorische oefening die de pengreep versterkt. De SLO-leerlijnen voor rekenen en wiskunde benadrukken getalbegrip als kernleerdoel voor de kleuterschool, en getallenwerkbladen zijn het meest directe middel om dit doel te bereiken.',
    developmentalMilestones: [
      { milestone: 'Cijferherkenning (3\u20134-jarigen leren het verschil zien tussen cijfers en letters)', howWeAddress: 'Cijfer-herkenningsactiviteiten met grote, duidelijke cijfers en koppeling aan hoeveelheden bouwen visuele herkenning van 1\u201310 op' },
      { milestone: '\u00c9\u00e9n-op-\u00e9\u00e9n-correspondentie (elk voorwerp precies \u00e9\u00e9n keer tellen)', howWeAddress: 'Tel-en-koppel-activiteiten waarbij kinderen voorwerpen tellen en aan het juiste cijfer koppelen oefenen de basisprincipes van tellen' },
      { milestone: 'Getalvolgorde (kleuters leren dat cijfers in een vaste volgorde staan)', howWeAddress: 'Getallenreeks-activiteiten waarbij kinderen ontbrekende cijfers invullen bouwen het begrip van ordinale getalvolgorde op' },
      { milestone: 'Motorische vorming van cijfers', howWeAddress: 'Overtrek-activiteiten met stippellijncijfers begeleiden de hand bij het correct vormen van cijfers en versterken de pengreep' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: begin met de cijfers 1\u20135, gebruik concrete tellers (blokken, kralen) naast het werkblad, en richt u op \u00e9\u00e9n cijfer per sessie met veel herhaling. Voor gevorderde kleuters: breid uit tot 10\u201320, introduceer eenvoudige hoeveelheidsvergelijkingen (meer/minder), en voeg getallenpatronen toe (2, 4, 6, ...).',
    parentTakeaway: 'Getallen zitten overal in het dagelijks leven. Tel samen de treden van de trap, de borden op tafel en de knoopjes op de jas. Wijs huisnummers aan tijdens wandelingen en laat uw kind de verdiepingknoppen in de lift indrukken. Na een getallenwerkblad kunt u samen een getallenboekje maken waarin uw kind voor elk cijfer het juiste aantal voorwerpen tekent. Houd het speels en drukvrij \u2014 op kleuterleeftijd gaat het om plezier in getallen, niet om prestaties.',
    classroomIntegration: 'Het getallenthema vormt de rode draad in het kleuterschoolrekenen: elke dag worden getallen geoefend bij het tellen van kinderen in de kring, bij het verdelen van materialen, en bij werkhoeken met getallenwerkbladen. De cijfer-van-de-week aanpak geeft elk cijfer een eigen week met bijpassende activiteiten. Dit sluit aan bij de SLO-kerndoelen voor rekenen en wiskunde en de leerlijnen voor getalbegrip.',
    assessmentRubric: [
      { skill: 'Cijferherkenning (1\u201310)', emerging: 'herkent 2\u20133 cijfers met hulp van een volwassene', proficient: 'herkent zelfstandig de cijfers 1\u201310 en kan ze benoemen', advanced: 'herkent cijfers tot 20, schrijft ze zelfstandig en koppelt aan hoeveelheden' },
      { skill: 'Tellen met \u00e9\u00e9n-op-\u00e9\u00e9n-correspondentie', emerging: 'telt 1\u20134 voorwerpen met hulp en aanwijzen', proficient: 'telt zelfstandig tot 10 en koppelt aan het juiste cijfer', advanced: 'telt boven de 10, telt terug en slaat geen voorwerpen over' },
      { skill: 'Cijfervorming (schrijven)', emerging: 'trekt 2\u20133 cijfers over op stippellijnen herkenbaar', proficient: 'schrijft de cijfers 1\u201310 zelfstandig met de juiste streekrichting', advanced: 'schrijft vlot en leesbaar, ook in kleine formaten en zonder voorbeeld' },
    ],
  },

  ocean: {
    seoTitle: 'Oceaan-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare oceaan-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'oceaan kleuterschool, oceaan oefeningen 3\u20134 jaar, oceaan oefeningen kleuterschool, oceaan uitprintbaar kleuterschool, oceaan werkbladen kleuterschool, oceaan activiteiten kleuterschool, oceaan leerbladen 3\u20134 jaar, oceaan gratis kleuterschool, oceaan PDF kleuterschool, oceaan kleuren',
    snippetAnswer: 'Oceaan-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken vissen, schelpen en zeesterren om tellen, sorteren en kleuren te oefenen. De fascinerende onderwaterwereld maakt leren tot een ontdekkingsreis. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het oceaanthema is magnetisch voor kleuters omdat drie- en vierjarigen gefascineerd zijn door de mysterieuze onderwaterwereld \u2014 kleurrijke vissen, zeesterren, schelpen en walvissen spreken tot de verbeelding op een manier die weinig andere thema\u2019s evenaren. Nederland heeft als kustland een bijzondere band met de zee, en veel kinderen hebben herinneringen aan strandbezoeken waar ze schelpen verzamelden en golven ontdekten. Oceaanwerkbladen benutten deze fascinatie door kinderen zeedieren te laten tellen, schelpen te sorteren en onderwatersc\u00e8nes te kleuren. De variatie aan vormen in het oceaanmilieu \u2014 ronde schelpen, stervormige zeesterren, kronkelende octopuspoten \u2014 biedt rijke mogelijkheden voor visuele discriminatie en fijne motoriek. De SLO-leerlijnen benadrukken het belang van natuur\u00e9ducatie en het verkennen van verschillende ecosystemen, en het oceaanthema opent de deur naar een wereld die de meeste kleuters nog grotendeels moeten ontdekken.',
    developmentalMilestones: [
      { milestone: 'Verwondering voor het onbekende (3\u20134-jarigen zijn gefascineerd door de mysterieuze onderwaterwereld)', howWeAddress: 'Onderwatersc\u00e8ne-activiteiten die kleurrijke zeeleven presenteren voeden de verbeelding en stimuleren vragen en gesprekken' },
      { milestone: 'Vormenherkenning (kleuters leren diverse vormen herkennen in natuurlijke contexten)', howWeAddress: 'Vormactiviteiten met schelpen (rond), zeesterren (stervorm) en vissen (ovaal) bouwen vormenbegrip op via natuurlijke vormen' },
      { milestone: 'Tellen van zeedieren in een sc\u00e8ne', howWeAddress: 'Telactiviteiten met vissen, schelpen en zeesterren in onderwatersc\u00e8nes versterken getalbegrip in een visueel rijke context' },
      { milestone: 'Fijnmotorische expressie bij gevarieerde contouren', howWeAddress: 'Kleurplaten van zeeleven met ronde, stervormige en golvende contouren oefenen diverse motorische bewegingen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik drie of vier bekende zeedieren (vis, schelp, zeester, krab), bied grote kleurplaten met dikke lijnen aan, en combineer met schelpen om vast te houden. Voor gevorderde kleuters: introduceer meer zeedieren (octopus, zeepaardje, walvis), voeg grootte-vergelijkingen toe, en laat kinderen hun eigen onderwatersc\u00e8ne ontwerpen met een bepaald aantal dieren.',
    parentTakeaway: 'De oceaan fascineert elk kind. Bekijk samen oceaanboeken en -video\u2019s en tel de zeedieren die u ziet. Als u naar het strand gaat, verzamel dan schelpen en sorteer ze thuis op grootte, kleur en vorm. Na een oceaanwerkblad kunt u samen een aquarium tekenen op een groot vel papier \u2014 uw kind plakt of tekent het juiste aantal vissen en zeesterren. Zelfs in bad kunt u met speelgoedvisjes tellen en sorteren oefenen.',
    classroomIntegration: 'Het oceaanthema is ideaal voor een onderwaterproject: richt een oceaanhoek in met schelpen, koraal en blauw doek, lees oceaanboeken voor in de kring, maak onderwaterwerkbladen bij werkhoeken, en knutsel zeedieren voor een klassenmuuraquarium. Dit sluit aan bij de SLO-doelen voor natuur\u00e9ducatie, rekenvaardigheid en creatieve expressie.',
    assessmentRubric: [
      { skill: 'Zeedieren herkennen', emerging: 'herkent 1\u20132 zeedieren (vis, schelp) met hulp', proficient: 'benoemt zelfstandig 4\u20135 zeedieren en beschrijft een opvallend kenmerk', advanced: 'herkent 7+ zeedieren en vergelijkt hun kenmerken (grootte, vorm, leefomgeving)' },
      { skill: 'Tellen van oceaanobjecten', emerging: 'telt 1\u20134 zeedieren met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 objecten in een onderwatersc\u00e8ne en noteert het cijfer', advanced: 'telt boven de 10, groepeert per soort en vergelijkt hoeveelheden' },
      { skill: 'Vormenherkenning (oceaanvormen)', emerging: 'herkent ronde schelpen als \u201crond\u201d met hulp', proficient: 'benoemt zelfstandig vormen van zeedieren (rond, stervormig, ovaal)', advanced: 'vergelijkt vormen van verschillende zeedieren en beschrijft overeenkomsten en verschillen' },
    ],
  },

  pets: {
    seoTitle: 'Huisdieren-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare huisdieren-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'huisdieren kleuterschool, huisdieren oefeningen 3\u20134 jaar, huisdieren oefeningen kleuterschool, huisdieren uitprintbaar kleuterschool, huisdieren werkbladen kleuterschool, huisdieren activiteiten kleuterschool, huisdieren leerbladen 3\u20134 jaar, huisdieren gratis kleuterschool, huisdieren PDF kleuterschool, huisdieren kleuren',
    snippetAnswer: 'Huisdieren-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken honden, katten en konijnen om tellen, sorteren en kleuren te oefenen. De emotionele band met huisdieren maakt leren persoonlijk en motiverend. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het huisdierenthema is een van de meest persoonlijke thema\u2019s voor kleuters omdat drie- en vierjarigen vaak een diepe emotionele band hebben met een huisdier of een intens verlangen koesteren om er een te hebben. Deze persoonlijke connectie is een van de krachtigste motivatoren voor leren op deze leeftijd. Huisdierenwerkbladen spreken kinderen direct aan omdat ze over hun favoriete onderwerp gaan: de hond die ze aaien, de kat die op hun schoot komt, het konijn dat ze voeren. Het tellen van huisdieren, het sorteren op grootte en het kleuren van huisdierportretten combineren rekenvaardigheden met emotionele betrokkenheid. De SLO-leerlijnen benadrukken het belang van zorg en verantwoordelijkheid als sociaal-emotionele ontwikkeldoelen, en het huisdierenthema vervult deze doelen wanneer kinderen via werkbladen leren over de behoeften van dieren.',
    developmentalMilestones: [
      { milestone: 'Empathie en zorggedrag (3\u20134-jarigen ontwikkelen zorg voor levende wezens)', howWeAddress: 'Huisdier-zorg-activiteiten waarbij kinderen koppelen wat een huisdier nodig heeft (voer, water, slaapplek) stimuleren empathie en verantwoordelijkheidsbesef' },
      { milestone: 'Categorisering van dieren (kleuters leren het verschil tussen huisdieren en wilde dieren)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen huisdieren onderscheiden van andere dieren bouwen classificatievermogen op via een emotioneel anker' },
      { milestone: 'Tellen met emotionele betrokkenheid', howWeAddress: 'Telactiviteiten met honden, katten en andere huisdieren benutten de persoonlijke motivatie voor getalontwikkeling' },
      { milestone: 'Fijnmotorische expressie bij dierportretten', howWeAddress: 'Kleurplaten van huisdieren met variatie in vachtpatronen (vlekken, strepen) oefenen gedetailleerde motorische controle' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot drie of vier bekende huisdieren (hond, kat, vis, konijn), gebruik knuffels als concrete aanvulling, en richt u op \u00e9\u00e9n vaardigheid per sessie. Voor gevorderde kleuters: breid uit met minder voorkomende huisdieren (cavia, schildpad, hamster), voeg huisdier-zorgtaken toe aan koppelactiviteiten, en laat kinderen een huisdierpaspoort maken.',
    parentTakeaway: 'Huisdieren bieden dagelijkse leermogelijkheden. Als u een huisdier heeft, betrek uw kind bij het voeren en tel samen de scheppen voer. Benoem lichaamsdelen van het dier (poten, oren, staart) en vergelijk ze met die van het kind. Heeft u geen huisdier? Bezoek samen een kinderboerderij of dierenwinkel. Na een huisdierenwerkblad kunt u uw kind vragen om een tekening te maken van zijn droomhuisdier en te beschrijven hoe het eruitziet en wat het nodig heeft.',
    classroomIntegration: 'Het huisdierenthema leeft in de kleuterschool via de huishoek met knuffelhuisdieren, een mogelijke bezoekdag met echte huisdieren van ouders, en werkbladen bij de werkhoeken. In de kring vertellen kinderen over hun eigen huisdier, bij werkhoeken worden huisdieren geteld en gekleurd, en bij creatieve activiteiten worden huisdieren geknutseld. Dit sluit aan bij de SLO-doelen voor natuur\u00e9ducatie, sociaal-emotionele ontwikkeling en taalontwikkeling.',
    assessmentRubric: [
      { skill: 'Huisdieren herkennen en benoemen', emerging: 'benoemt 2\u20133 huisdieren (hond, kat, vis) met hulp', proficient: 'benoemt zelfstandig 5\u20136 huisdieren en beschrijft een kenmerk per dier', advanced: 'benoemt 8+ huisdieren, vergelijkt kenmerken en beschrijft wat elk dier nodig heeft' },
      { skill: 'Tellen van huisdieren', emerging: 'telt 1\u20134 huisdieren met hulp en aanwijzen', proficient: 'telt zelfstandig tot 8 en koppelt aan het juiste cijfer', advanced: 'telt boven de 10 en vergelijkt aantallen van verschillende huisdiersoorten' },
      { skill: 'Sorteren van huisdieren', emerging: 'sorteert dieren in twee groepen (huisdier/geen huisdier) met hulp', proficient: 'sorteert zelfstandig op grootte of type en benoemt de groepen', advanced: 'sorteert op meerdere kenmerken en bedenkt eigen sorteercriteria' },
    ],
  },

  pirates: {
    seoTitle: 'Piraten-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare piraten-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'piraten kleuterschool, piraten oefeningen 3\u20134 jaar, piraten oefeningen kleuterschool, piraten uitprintbaar kleuterschool, piraten werkbladen kleuterschool, piraten activiteiten kleuterschool, piraten leerbladen 3\u20134 jaar, piraten gratis kleuterschool, piraten PDF kleuterschool, piraten kleuren',
    snippetAnswer: 'Piraten-oefeningen voor de kleuterschool (3\u20134 jaar) combineren schepen, schatten en zeeroverskaarten met tellen, kleuren en koppelen. Het avontuurlijke thema prikkelt de verbeelding en maakt leren tot een schattenjacht. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het piratenthema is een van de meest motiverende thema\u2019s voor kleuters omdat drie- en vierjarigen gefascineerd zijn door het avontuur van schattenjachten, piratenschepen en mysterieuze eilanden. Deze verbeeldingskracht is een krachtige motor voor leren die werkbladen tot spannende avonturen maakt. Piratenwerkbladen combineren tellen (hoeveel goudstukken in de schatkist?), koppelen (welk gereedschap hoort bij de piraat?) en kleuren (kleur het piratenschip) met een verhaalcontext die kinderen meezuigt. Het piratenthema is ook uitstekend geschikt voor ruimtelijk denken: schatkaarten introduceren begrippen als links, rechts, boven en onder op een speelse manier. De SLO-leerlijnen benadrukken het belang van verbeeldingsspel en spelend leren, en het piratenthema is een van de krachtigste contexten om deze doelen te bereiken.',
    developmentalMilestones: [
      { milestone: 'Verbeeldingsspel en narratief denken (3\u20134-jarigen ontwikkelen uitgebreidere fantasiesc\u00e8nes)', howWeAddress: 'Piratensc\u00e8nes op werkbladen prikkelen het vertellen van avonturenverhalen en stimuleren narratieve vaardigheden' },
      { milestone: 'Ruimtelijk denken (kleuters leren richtingsbegrippen als links, rechts, boven, onder)', howWeAddress: 'Schatkaart-activiteiten die eenvoudige routes volgen introduceren richtingsbegrippen in een spannende context' },
      { milestone: 'Tellen van schatten en piratenvoorwerpen', howWeAddress: 'Telactiviteiten met goudstukken, schelpen en edelstenen bouwen getalbegrip op met hoge betrokkenheid' },
      { milestone: 'Fijnmotorische expressie bij gedetailleerde sc\u00e8nes', howWeAddress: 'Kleurplaten van piratenschepen en schatkaarten met variatie in detail bieden progressieve motorische uitdaging' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met eenvoudige piratenafbeeldingen en maximaal vijf voorwerpen om te tellen, bied dikke contouren aan, en verbind met concreet spel (een piratenhoed en een verrekijker). Voor gevorderde kleuters: voeg complexere schatkaarten toe met meerdere stappen, introduceer eenvoudige optellen met goudstukken, en laat kinderen hun eigen piratenavontuur vertellen.',
    parentTakeaway: 'Piratenspel is educatief goud. Maak samen een schatkist van een schoenendoos en vul die met muntjes om te tellen. Teken een schatkaart door uw huis en laat uw kind de aanwijzingen volgen (drie stappen naar rechts, twee stappen naar voren). Na een piratenwerkblad kunt u samen een piratenverhaal bedenken \u2014 dit versterkt zowel getalbegrip als vertelvaardigheden op een manier die voelt als een groot avontuur.',
    classroomIntegration: 'Het piratenthema is perfect voor een themaweek: richt de klas in als piratenschip, verberg schatten op het schoolplein voor een speurtocht, en gebruik piratenwerkbladen bij de werkhoeken. In de kring worden piratenboeken voorgelezen, bij de constructiehoek worden piratenschepen gebouwd, en bij creatieve activiteiten worden piratenvlaggen gemaakt. Dit sluit aan bij de SLO-doelen voor verbeelding, rekenvaardigheid en sociaal spel.',
    assessmentRubric: [
      { skill: 'Tellen in piratencontext', emerging: 'telt 1\u20134 goudstukken of schelpen met hulp en aanwijzen', proficient: 'telt zelfstandig tot 8 schatten en koppelt aan het juiste cijfer', advanced: 'telt boven de 10 en vergelijkt schatten in verschillende kisten' },
      { skill: 'Richtingsbegrippen (schatkaart)', emerging: 'volgt een route van 1\u20132 stappen met hulp', proficient: 'volgt zelfstandig een route van 3\u20134 stappen met richtingsaanwijzingen', advanced: 'maakt eigen routes met meerdere stappen en gebruikt alle richtingsbegrippen' },
      { skill: 'Verbeeldend vertellen (piratenavontuur)', emerging: 'benoemt elementen op het werkblad met enkele woorden', proficient: 'vertelt een kort piratenavontuur met 3\u20134 zinnen', advanced: 'vertelt een uitgebreid verhaal met begin, midden en einde en betrekt eigen idee\u00ebn' },
    ],
  },

  robots: {
    seoTitle: 'Robots-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare robots-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'robots kleuterschool, robots oefeningen 3\u20134 jaar, robots oefeningen kleuterschool, robots uitprintbaar kleuterschool, robots werkbladen kleuterschool, robots activiteiten kleuterschool, robots leerbladen 3\u20134 jaar, robots gratis kleuterschool, robots PDF kleuterschool, robots kleuren',
    snippetAnswer: 'Robots-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken kleurrijke robots om vormen, tellen en patronen te oefenen. De geometrische vormen van robots maken ze ideaal voor het aanleren van vormenbegrip en fijne motoriek. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het robotsthema is bijzonder geschikt voor kleuters omdat drie- en vierjarigen gefascineerd zijn door machines die bewegen en \u201cpraten\u201d \u2014 robots spreken tot hun verbeelding als vriendelijke, kleurrijke figuren die tegelijkertijd geometrisch en speels zijn. Het unieke van robots voor werkbladen is dat ze uit herkenbare geometrische vormen bestaan: vierkante lichamen, ronde koppen, rechthoekige armen en driehoekige hoeden. Dit maakt robots tot het perfecte voertuig voor het aanleren van vormenbegrip. Het tellen van robotonderdelen (twee ogen, twee armen, vier wielen) combineert getalbegrip met visuele analyse. De SLO-leerlijnen benadrukken het belang van meetkunde en vormenbegrip, en robots bieden een motiverende context waarin kleuters vormen herkennen en benoemen in een figuur die hen fascineert.',
    developmentalMilestones: [
      { milestone: 'Vormenherkenning in samengestelde figuren (3\u20134-jarigen leren vormen herkennen in complexere afbeeldingen)', howWeAddress: 'Robot-vorm-activiteiten waarbij kinderen vierkanten, cirkels en driehoeken in een robot aanwijzen bouwen vormenbegrip op in een motiverende context' },
      { milestone: 'Tellen van onderdelen (kleuters tellen kenmerken van een samengesteld geheel)', howWeAddress: 'Telactiviteiten met robotonderdelen (ogen, armen, knoppen, wielen) oefenen gedetailleerd tellen' },
      { milestone: 'Bouwen en construeren (kleuters ontwikkelen ruimtelijk inzicht)', howWeAddress: 'Bouw-een-robot-activiteiten waarbij kinderen vormen combineren tot een robot stimuleren ruimtelijk denken en planning' },
      { milestone: 'Fijnmotorische precisie bij geometrische vormen', howWeAddress: 'Kleurplaten van robots met rechte lijnen en hoeken oefenen het nauwkeurig kleuren van geometrische vormen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met eenvoudige robots uit twee of drie basisvormen, bied grote contouren aan, en combineer met het bouwen van een robot uit dozen. Voor gevorderde kleuters: introduceer robots met meer onderdelen en kleinere details, voeg symmetrie-activiteiten toe (maak de andere helft van de robot), en laat kinderen hun eigen robot ontwerpen met specifieke vormen.',
    parentTakeaway: 'Robots zijn een geweldig thema om thuis mee te spelen en leren. Bouw samen een robot uit lege dozen en benoem de vormen die u gebruikt (vierkante doos voor het lichaam, ronde dop voor de ogen). Tel samen de onderdelen: hoeveel knoppen heeft onze robot? Na een robotwerkblad kunt u uw kind vragen om een robot te tekenen met precies vijf knoppen en twee antennes \u2014 dit combineert vormenbegrip, tellen en creatieve expressie.',
    classroomIntegration: 'Het robotsthema combineert meetkunde met technologie-ori\u00ebntatie: in de kring worden robotboeken voorgelezen, bij werkhoeken worden robots gekleurd en geteld, in de bouwhoek worden robots gebouwd uit dozen en recyclemateriaal, en bij constructiemateriaal worden robots nagebouwd met blokken. Dit sluit aan bij de SLO-doelen voor meetkunde, technologie-ori\u00ebntatie en creatieve ontwikkeling.',
    assessmentRubric: [
      { skill: 'Vormen herkennen in robots', emerging: 'herkent 1\u20132 vormen (cirkel, vierkant) in een robot met hulp', proficient: 'benoemt zelfstandig 3\u20134 vormen in een robot en wijst ze aan', advanced: 'herkent alle basisvormen inclusief driehoek en rechthoek en bouwt zelf een robot uit vormen' },
      { skill: 'Tellen van robotonderdelen', emerging: 'telt 1\u20134 onderdelen met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 robotonderdelen en noteert het juiste cijfer', advanced: 'telt alle onderdelen en vergelijkt aantallen tussen verschillende robots' },
      { skill: 'Robot bouwen/ontwerpen', emerging: 'plaatst 2\u20133 vormen samen tot een eenvoudige robot met hulp', proficient: 'bouwt zelfstandig een herkenbare robot uit 5+ vormen', advanced: 'ontwerpt een gedetailleerde robot met symmetrie en legt de vormkeuzes uit' },
    ],
  },

  school: {
    seoTitle: 'School-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare school-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'school kleuterschool, school oefeningen 3\u20134 jaar, school oefeningen kleuterschool, school uitprintbaar kleuterschool, school werkbladen kleuterschool, school activiteiten kleuterschool, school leerbladen 3\u20134 jaar, school gratis kleuterschool, school PDF kleuterschool, school kleuren',
    snippetAnswer: 'School-oefeningen voor de kleuterschool (3\u20134 jaar) helpen kinderen schoolmaterialen te herkennen, tellen en kleuren. Het thema bereidt kleuters voor op de schoolroutine en bouwt positieve schoolassociaties op. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het schoolthema heeft een bijzondere betekenis voor kleuters omdat drie- en vierjarigen voor het eerst de schoolwereld betreden \u2014 alles is nieuw en opwindend, van de kleurpotloden tot de kring, van het bord tot de schooltas. Werkbladen over het schoolthema helpen kinderen deze nieuwe omgeving te verkennen op een veilige, gestructureerde manier. Het herkennen en benoemen van schoolmaterialen (potlood, schaar, lijm, rugzak) bouwt woordenschat op die kinderen dagelijks nodig hebben. Het tellen van potloden in een etui of het sorteren van materialen op type versterkt rekenvaardigheden via vertrouwde voorwerpen. De SLO-leerlijnen benadrukken het belang van een positieve schoolhouding en zelfredzaamheid in de schoolomgeving, en het schoolthema vervult deze doelen door kinderen te laten wennen aan de schoolwereld via speelse werkbladen.',
    developmentalMilestones: [
      { milestone: 'Schoolse gewenning (3\u20134-jarigen leren de schoolomgeving kennen en voelen zich er veilig)', howWeAddress: 'Werkbladen met herkenbare schoolmaterialen helpen kinderen de schoolomgeving te verkennen en positieve associaties op te bouwen' },
      { milestone: 'Schoolmaterialen benoemen (kleuters leren de namen van dagelijks gebruikte voorwerpen)', howWeAddress: 'Benoem-en-koppel-activiteiten met schoolspullen (potlood, schaar, gum, liniaal) bouwen de schoolwoordenschat op' },
      { milestone: 'Tellen en sorteren van schoolmaterialen', howWeAddress: 'Telactiviteiten met potloden, boeken en pennen oefenen getalbegrip via dagelijks gebruikte voorwerpen' },
      { milestone: 'Fijnmotorische voorbereiding op schrijven', howWeAddress: 'Overtrekactiviteiten en kleurplaten met schoolthema-afbeeldingen versterken de pengreep als voorbereiding op formeel schrijven' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met vijf basismaterialen (potlood, schaar, lijm, papier, rugzak), bied de echte materialen aan als referentie, en richt u op benoemen en herkennen. Voor gevorderde kleuters: voeg meer schoolmaterialen toe, introduceer routineactiviteiten (wat heb je nodig voor tekenen?), en laat kinderen hun eigen schooltas tekenen en vullen met een bepaald aantal spullen.',
    parentTakeaway: 'De schoolervaring begint thuis. Oefen samen het pakken van de schooltas en benoem elk voorwerp dat erin gaat. Tel samen de kleurpotloden en sorteer ze op kleur. Na een schoolwerkblad kunt u samen schooltje spelen: uw kind is de meester of juf en u bent de leerling. Dit rollenspel versterkt de schoolwoordenschat en bouwt zelfvertrouwen op voor de echte schooldag.',
    classroomIntegration: 'Het schoolthema is ideaal aan het begin van het schooljaar: in de kring worden de klasregels besproken en materialen benoemd, bij werkhoeken worden schoolwerkbladen gecombineerd met echt materiaal, in de schrijfhoek wordt geoefend met schoolgereedschap, en bij opruimactiviteiten worden materialen gesorteerd. Dit sluit aan bij de SLO-doelen voor zelfredzaamheid, taalontwikkeling en een positieve schoolhouding.',
    assessmentRubric: [
      { skill: 'Schoolmaterialen benoemen', emerging: 'benoemt 2\u20133 schoolmaterialen (potlood, schaar) met hulp', proficient: 'benoemt zelfstandig 6\u20137 schoolmaterialen en beschrijft hun gebruik', advanced: 'benoemt 10+ materialen, groepeert ze per activiteit en legt hun functie uit' },
      { skill: 'Tellen van schoolspullen', emerging: 'telt 1\u20134 materialen met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 en koppelt aan het juiste cijfer', advanced: 'telt boven de 10, vergelijkt hoeveelheden en lost eenvoudige verdeelvraagstukken op' },
      { skill: 'Pengreep en schrijfvoorbereiding', emerging: 'houdt het potlood vast met volle vuist en trekt eenvoudige lijnen over', proficient: 'gebruikt driepuntgreep en trekt rechte en gebogen lijnen zelfstandig over', advanced: 'schrijft herkenbare letters en cijfers met goede greep en controle' },
    ],
  },

  seasons: {
    seoTitle: 'Seizoenen-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare seizoenen-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'seizoenen kleuterschool, seizoenen oefeningen 3\u20134 jaar, seizoenen oefeningen kleuterschool, seizoenen uitprintbaar kleuterschool, seizoenen werkbladen kleuterschool, seizoenen activiteiten kleuterschool, seizoenen leerbladen 3\u20134 jaar, seizoenen gratis kleuterschool, seizoenen PDF kleuterschool, seizoenen kleuren',
    snippetAnswer: 'Seizoenen-oefeningen voor de kleuterschool (3\u20134 jaar) helpen kinderen lente, zomer, herfst en winter te herkennen door middel van kleuren, tellen en sorteren. Het seizoensritme biedt een natuurlijk kader voor tijdsbegrip. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het seizoenenthema is een van de meest waardevolle thema\u2019s voor kleuters omdat drie- en vierjarigen voor het eerst bewust het cyclische ritme van de seizoenen ervaren \u2014 ze merken dat bladeren vallen, sneeuw komt, bloemen bloeien en de zon langer schijnt. Dit groeiende seizoensbesef is een belangrijke cognitieve mijlpaal die werkbladen systematisch kunnen versterken. Seizoenenwerkbladen laten kinderen kledingstukken aan het juiste seizoen koppelen, seizoensgebonden activiteiten sorteren, en vier contrasterende landschappen kleuren. Nederland heeft vier uitgesproken seizoenen die het leven sterk be\u00efnvloeden, waardoor werkbladen direct aansluiten bij de dagelijkse ervaring van het kind. De SLO-leerlijnen benadrukken het belang van tijd- en seizoensbesef als onderdeel van ori\u00ebntatie op de wereld, en het seizoenenthema is het meest directe middel om dit doel te bereiken.',
    developmentalMilestones: [
      { milestone: 'Seizoensherkenning (3\u20134-jarigen beginnen de vier seizoenen visueel te onderscheiden)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen afbeeldingen aan het juiste seizoen koppelen bouwen visueel seizoensbesef op' },
      { milestone: 'Koppeling van kleding aan weer (kleuters leren dat kleding verandert met het seizoen)', howWeAddress: 'Kleding-seizoen-koppelactiviteiten (winterjas bij winter, zwembroek bij zomer) verbinden abstract seizoensbegrip met dagelijkse ervaringen' },
      { milestone: 'Tellen van seizoensgebonden elementen', howWeAddress: 'Telactiviteiten met seizoensobjecten (sneeuwvlokken, bloemen, bladeren, zonnestralen) bouwen getalbegrip op in een cyclische context' },
      { milestone: 'Kleurvariatie per seizoen (kleuters leren dat seizoenen eigen kleurpaletten hebben)', howWeAddress: 'Kleurplaten van seizoenslandschappen stimuleren bewuste kleurkeuze (herfst = oranje/bruin, lente = groen/roze)' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: begin met twee contrasterende seizoenen (zomer en winter), gebruik foto\u2019s van echte seizoenssc\u00e8nes als referentie, en bied grote kleurplaten met seizoenskenmerken. Voor gevorderde kleuters: breid uit naar alle vier seizoenen met subtiele verschillen (vroege herfst vs. late herfst), voeg seizoensvolgordes toe, en laat kinderen een seizoenskalender maken.',
    parentTakeaway: 'Seizoenen zijn het levende leerboek voor uw kind. Maak bij elke seizoenswisseling samen een wandeling en benoem de veranderingen: de bladeren verkleuren, de eerste sneeuw valt, de knoppen openen, de zon verwarmt. Maak vier seizoensfoto\u2019s op dezelfde plek en vergelijk ze. Na een seizoenwerkblad kunt u samen de kledingkast bekijken en bespreken welke kleding bij het huidige seizoen past. Elke dag biedt een les in seizoensbesef.',
    classroomIntegration: 'Het seizoenenthema loopt door het hele kleuterschooljaar als vast ritueel: elk seizoen wordt gevierd met een seizoenstafel, seizoensliedjes in de kring, seizoenswerkbladen bij werkhoeken, en buitenactiviteiten die het seizoen benadrukken. De overgang tussen seizoenen wordt bewust gemarkeerd, waardoor kinderen het cyclische karakter van het jaar ervaren. Dit sluit aan bij de SLO-doelen voor tijdsbesef, natuur\u00e9ducatie en taalontwikkeling.',
    assessmentRubric: [
      { skill: 'Seizoensherkenning', emerging: 'herkent zomer en winter met hulp van een volwassene', proficient: 'benoemt zelfstandig vier seizoenen en koppelt passende kenmerken', advanced: 'beschrijft seizoensveranderingen, legt uit waarom ze optreden en koppelt aan eigen ervaringen' },
      { skill: 'Kleding-seizoen koppeling', emerging: 'koppelt 1\u20132 kledingstukken aan het juiste seizoen met hulp', proficient: 'koppelt zelfstandig 4\u20135 kledingstukken aan seizoenen en benoemt waarom', advanced: 'stelt complete seizoensoutfits samen en bespreekt wat er gebeurt als je de verkeerde kleding draagt' },
      { skill: 'Tellen van seizoensobjecten', emerging: 'telt 1\u20134 seizoensobjecten (sneeuwvlokken, bloemen) met hulp', proficient: 'telt zelfstandig tot 8 en noteert het juiste cijfer', advanced: 'telt boven de 10, vergelijkt hoeveelheden en groepeert per seizoen' },
    ],
  },

  shapes: {
    seoTitle: 'Vormen-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare vormen-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vormen kleuterschool, vormen oefeningen 3\u20134 jaar, vormen oefeningen kleuterschool, vormen uitprintbaar kleuterschool, vormen werkbladen kleuterschool, vormen activiteiten kleuterschool, vormen leerbladen 3\u20134 jaar, vormen gratis kleuterschool, vormen PDF kleuterschool, vormen kleuren',
    snippetAnswer: 'Vormen-oefeningen voor de kleuterschool (3\u20134 jaar) leren kinderen cirkels, vierkanten, driehoeken en rechthoeken herkennen, benoemen en kleuren. Vormenbegrip is de basis voor meetkunde en ruimtelijk denken. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het vormenthema is een van de meest fundamentele thema\u2019s voor kleuters omdat drie- en vierjarigen zich in een cruciale fase bevinden voor het ontwikkelen van ruimtelijk denken \u2014 ze beginnen vormen te onderscheiden van willekeurige krabbels en leren dat een cirkel altijd rond is, ongeacht de grootte of kleur. Dit vormenbegrip is de basis voor alle latere meetkundevaardigheden. Vormenwerkbladen bouwen deze basis systematisch op: kinderen leren de vier basisvormen (cirkel, vierkant, driehoek, rechthoek) herkennen en benoemen, vinden vormen in de omgeving (de klok is rond, het raam is vierkant), en combineren vormen tot samengestelde figuren. De SLO-leerlijnen voor rekenen en wiskunde benadrukken meetkunde en ruimtelijk inzicht als kernleerdoelen, en vormenwerkbladen zijn het meest directe middel om deze doelen bij kleuters te bereiken.',
    developmentalMilestones: [
      { milestone: 'Vormherkenning (3\u20134-jarigen leren basisvormen onderscheiden van willekeurige vormen)', howWeAddress: 'Vorm-herkenningsactiviteiten met grote, duidelijke cirkel, vierkant, driehoek en rechthoek bouwen visueel onderscheidingsvermogen op' },
      { milestone: 'Vormen benoemen (kleuters koppelen namen aan vormkenmerken: rond, hoekig)', howWeAddress: 'Benoem-activiteiten waarbij kinderen vormen aanwijzen en benoemen verbinden taal aan meetkundig begrip' },
      { milestone: 'Vormen vinden in de omgeving (overgang van werkblad naar echte wereld)', howWeAddress: 'Vormenjacht-activiteiten waarbij kinderen vormen in alledaagse voorwerpen herkennen bouwen een brug tussen abstract en concreet' },
      { milestone: 'Fijnmotorische vorming van basisvormen', howWeAddress: 'Overtrekactiviteiten met stippellijnvormen en kleurplaten met vormenfiguren versterken de motorische controle bij het tekenen van ronde en rechte lijnen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: begin met twee vormen (cirkel en vierkant), gebruik houten of plastic vormblokken als tastbare referentie, en richt u op herkennen voor benoemen. Voor gevorderde kleuters: voeg ovaal, ruit en ster toe, introduceer vormeneigenschappen (hoeken, zijden), en laat kinderen samengestelde figuren bouwen uit meerdere vormen.',
    parentTakeaway: 'Vormen zijn overal. Ga samen op vormenjacht in huis: de klok is een cirkel, het raam een vierkant, het dak een driehoek. Bak samen koekjes met vormenuitstekers en benoem elke vorm. Na een vormenwerkblad kunt u samen een vormencollage maken door vormen uit te knippen uit tijdschriften. Het dagelijks benoemen van vormen in de omgeving is de krachtigste manier om vormenbegrip op te bouwen.',
    classroomIntegration: 'Het vormenthema doorweeft de hele kleuterschooldag: in de kring wordt de vorm van de week ge\u00efntroduceerd, bij werkhoeken worden vormenwerkbladen gecombineerd met vormenpuzzels en -blokken, bij creatieve activiteiten worden vormen geknipt en geplakt, en in de klas worden vormen aangewezen op posters en in de omgeving. Dit sluit aan bij de SLO-doelen voor meetkunde en ruimtelijk inzicht.',
    assessmentRubric: [
      { skill: 'Basisvormen herkennen en benoemen', emerging: 'herkent cirkel en vierkant met hulp', proficient: 'benoemt zelfstandig vier basisvormen (cirkel, vierkant, driehoek, rechthoek)', advanced: 'herkent zes of meer vormen inclusief ovaal en ruit en beschrijft hun kenmerken (hoeken, zijden)' },
      { skill: 'Vormen vinden in de omgeving', emerging: 'vindt \u00e9\u00e9n vorm in de klas met aanwijzing', proficient: 'vindt zelfstandig 3\u20134 vormen in de omgeving en benoemt ze', advanced: 'vindt vormen overal, beschrijft waarom het die vorm is en vindt nieuwe voorbeelden' },
      { skill: 'Vormen tekenen en overtrekken', emerging: 'trekt een cirkel en een vierkant over op stippellijnen', proficient: 'tekent zelfstandig vier basisvormen herkenbaar', advanced: 'tekent nauwkeurige vormen en combineert ze tot samengestelde figuren (huis, robot)' },
    ],
  },

  space: {
    seoTitle: 'Ruimte-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare ruimte-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'ruimte kleuterschool, ruimte oefeningen 3\u20134 jaar, ruimte oefeningen kleuterschool, ruimte uitprintbaar kleuterschool, ruimte werkbladen kleuterschool, ruimte activiteiten kleuterschool, ruimte leerbladen 3\u20134 jaar, ruimte gratis kleuterschool, ruimte PDF kleuterschool, ruimte kleuren',
    snippetAnswer: 'Ruimte-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken raketten, planeten en sterren om tellen, vormen en kleuren te oefenen. Het mysterieuze ruimtethema prikkelt de verbeelding en maakt leren tot een avontuur. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het ruimtethema is een van de meest betoverende thema\u2019s voor kleuters omdat drie- en vierjarigen gefascineerd zijn door de maan, de sterren en het idee dat er raketten naar de ruimte vliegen. Deze verwondering voor het onbekende is een krachtige motor voor leren die werkbladen tot kosmische avonturen maakt. Ruimtewerkbladen combineren tellen (hoeveel sterren tel je?), vormherkenning (planeten zijn rond, raketten zijn driehoekig) en kleuren (donkere lucht met felle sterren) in een visueel spectaculaire context. Het contrast tussen de donkere ruimte en heldere objecten biedt unieke mogelijkheden voor kleuractiviteiten die contrastbegrip ontwikkelen. De SLO-leerlijnen benadrukken het belang van verwondering en nieuwsgierigheid als motor voor leren, en het ruimtethema is een van de krachtigste contexten om deze natuurlijke verwondering aan te wakkeren en te kanaliseren.',
    developmentalMilestones: [
      { milestone: 'Verwondering als leermotivatie (3\u20134-jarigen zijn gefascineerd door het onbekende en mysterieuze)', howWeAddress: 'Ruimtesc\u00e8nes met raketten, planeten en sterren voeden de verwondering en kanaliseren deze naar gestructureerde leeractiviteiten' },
      { milestone: 'Vormherkenning in nieuwe contexten (kleuters passen vormkennis toe op onbekende objecten)', howWeAddress: 'Vormactiviteiten waarbij kinderen vormen herkennen in ruimteobjecten (ronde planeten, driehoekige raketten) verdiepen het vormenbegrip' },
      { milestone: 'Tellen in visueel complexe sc\u00e8nes', howWeAddress: 'Telactiviteiten met sterren, planeten en raketten in een donkere ruimtesc\u00e8ne oefenen het tellen in visueel rijke afbeeldingen' },
      { milestone: 'Creatieve expressie met contrast (donker/licht)', howWeAddress: 'Kleurplaten van ruimtesc\u00e8nes met donkere achtergrond en heldere objecten stimuleren bewuste kleurkeuze en contrastbegrip' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met herkenbare ruimteobjecten (raket, ster, maan), bied grote contouren aan op een lichte achtergrond, en beperk tellopdrachten tot vijf. Voor gevorderde kleuters: introduceer meer planeten en ruimtevoorwerpen, voeg eenvoudige groottevergelijkingen toe (grote ster/kleine ster), en laat kinderen hun eigen ruimtesc\u00e8ne ontwerpen met een bepaald aantal objecten.',
    parentTakeaway: 'De ruimte fascineert elk kind. Kijk samen naar de sterren op een heldere avond en tel er zoveel mogelijk. Wijs de maan aan en bespreek de vormen die u aan de hemel ziet (ronde maan, twinkelende sterren). Na een ruimtewerkblad kunt u samen een raket bouwen van kartonnen dozen of een ruimtehelm maken van aluminiumfolie. Deze speelse verbinding tussen werkblad en verbeeldingsspel maakt het leren onvergetelijk.',
    classroomIntegration: 'Het ruimtethema is ideaal voor een projectweek: richt een ruimtehoek in met sterren aan het plafond en planeten aan de muur, lees ruimteboeken voor in de kring, maak ruimtewerkbladen bij werkhoeken, en bouw raketten in de constructiehoek. In de gymzaal kunnen kinderen astronauten zijn die op de maan lopen. Dit sluit aan bij de SLO-doelen voor verwondering, rekenvaardigheid, meetkunde en creatieve expressie.',
    assessmentRubric: [
      { skill: 'Ruimteobjecten herkennen en benoemen', emerging: 'herkent 1\u20132 ruimteobjecten (raket, ster) met hulp', proficient: 'benoemt zelfstandig 4\u20135 ruimteobjecten (raket, ster, maan, planeet, astronaut)', advanced: 'benoemt 7+ ruimteobjecten en beschrijft hun kenmerken en functie' },
      { skill: 'Tellen in ruimtesc\u00e8nes', emerging: 'telt 1\u20134 sterren of planeten met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 objecten in een ruimtesc\u00e8ne en noteert het cijfer', advanced: 'telt boven de 10, groepeert per soort en vergelijkt hoeveelheden' },
      { skill: 'Vormen herkennen in ruimteobjecten', emerging: 'herkent dat de maan rond is met hulp', proficient: 'benoemt zelfstandig vormen in ruimteobjecten (ronde planeet, driehoekige raket)', advanced: 'vergelijkt vormen van verschillende ruimteobjecten en tekent ze zelfstandig' },
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
