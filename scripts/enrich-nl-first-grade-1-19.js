#!/usr/bin/env node
/**
 * SEO Part 324: NL First-Grade Enrichment \u2014 Themes 1-19
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the first-grade grade block of 19 NL theme files (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    seoTitle: 'Alfabet-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare alfabet-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'alfabet groep 3, alfabet oefeningen 6\u20137 jaar, alfabet oefeningen groep 3, alfabet uitprintbaar groep 3, alfabet werkbladen groep 3, alfabet activiteiten groep 3, alfabet leerbladen 6\u20137 jaar, alfabet gratis groep 3, alfabet PDF groep 3, alfabet rekenen groep 3',
    snippetAnswer: 'Alfabet-oefeningen voor groep 3 (6\u20137 jaar) verschuiven de focus van letterherkenning naar toepassing: kinderen decoderen onbekende woorden, schrijven zinnen op gelinieerd papier en gebruiken alfabetische volgorde voor naslagwerken. Woordpuzzels en kruiswoorden versterken klank-letterkoppeling in de context van formeel leesonderwijs. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 is het alfabet niet langer een leerdoel maar een leermiddel: zes- en zevenjarigen hebben de meeste letters geautomatiseerd en gebruiken hun alphabetkennis nu als springplank voor het formele leesonderwijs dat in groep 3 begint. De Kerndoelen en SLO-leerlijnen markeren groep 3 als het jaar van de doorbraak in technisch lezen \u2014 kinderen leren woorden decoderen door klanken samen te voegen, schrijven zelfstandig korte zinnen en passen alfabetische volgorde toe bij het opzoeken van woorden. Woordpuzzel-werkbladen versterken de mentale flexibiliteit die nodig is om letterposities te manipuleren, kruiswoorden met plaatjes integreren fonemische analyse met spellingproductie, en schrijfopdrachten verschuiven van losse letters naar hele woorden en zinnen. Het alfabet wordt zo de sleutel tot alle andere vakgebieden: wie vlot leest en schrijft, kan rekenverhalen oplossen, instructies volgen en zelfstandig informatie opzoeken.',
    developmentalMilestones: [
      { milestone: 'Vlot decoderen van onbekende woorden (6\u20137-jarigen voegen klanken samen tot woorden)', howWeAddress: 'Woordpuzzel- en kruiswoordactiviteiten vereisen dat kinderen letters in de juiste volgorde plaatsen en klanken samenvoegen, waarmee de decodeervaardigheid wordt versterkt' },
      { milestone: 'Zelfstandig schrijven van woorden en korte zinnen (overgang van losse letters naar zinsniveau)', howWeAddress: 'Schrijfwerkbladen met gelinieerd papier en woordmodellen begeleiden de overgang van letterproductie naar zinsbouw' },
      { milestone: 'Alfabetische volgorde toepassen (kinderen gebruiken de vaste lettervolgorde als zoekstrategie)', howWeAddress: 'Alfabettrein-activiteiten op woordniveau laten kinderen woorden ordenen op beginletter als voorbereiding op woordenboekgebruik' },
      { milestone: 'Fonemische analyse in spellingcontext (kinderen splitsen woorden in klanken en schrijven de juiste letter)', howWeAddress: 'Kruiswoordpuzzels met plaatjes vereisen stapsgewijze fonemische analyse: plaatje herkennen, woord in klanken opdelen, letters schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: bied woordpuzzels aan met een woordenbank en maximaal vier letters, gebruik overtreklijnen bij schrijfopdrachten en beperk kruiswoorden tot drieletter-woorden. Voor gevorderde kinderen: introduceer woordpuzzels zonder woordenbank met vijf- en zesletter-woorden, laat hen zinnen dicteren en zelfstandig schrijven, en daag hen uit met woordraadactiviteiten waarbij aanwijzingen uit definities komen.',
    parentTakeaway: 'In groep 3 maakt uw kind de sprong van letters kennen naar letters gebruiken. Laat uw kind thuis korte briefjes schrijven: een boodschappenlijstje, een verjaardagskaart of een zin over de dag. Lees samen en wijs onbekende woorden aan: welke letters zie je, welke klanken hoor je? Oefen samen het opzoeken van woorden in een kinderwoordenboek \u2014 dit versterkt zowel de alfabetische volgorde als het leesplezier.',
    classroomIntegration: 'Het alfabet is in groep 3 de ruggengraat van het taalonderwijs: woordpuzzels en kruiswoorden worden ingezet als woordenschat-opwarmers bij de leesles, schrijfwerkbladen sluiten aan bij de methode voor aanvankelijk lezen, en alfabetische ordeningsopdrachten bereiden kinderen voor op zelfstandig opzoeken in naslagwerken. Bij rekenen worden letterpatronen ingezet voor logisch denken, en bij wereldori\u00ebntatie schrijven kinderen korte verslagen met de woorden die ze hebben geleerd, in lijn met de SLO-doelen voor taal en rekenen.',
    assessmentRubric: [
      { skill: 'Woorden decoderen', emerging: 'decodeert drieletterwoorden met hulp maar hapert bij langere woorden', proficient: 'decodeert zelfstandig woorden tot vijf letters door klanken samen te voegen', advanced: 'decodeert vlot meerlettergrepige woorden en leest korte zinnen met begrip' },
      { skill: 'Zinnen schrijven', emerging: 'schrijft losse woorden maar vormt nog geen zinnen zelfstandig', proficient: 'schrijft korte zinnen met correcte woordgrenzen en leesbare letters', advanced: 'schrijft meerdere zinnen achter elkaar met correcte hoofdletter en punt' },
      { skill: 'Alfabetische volgorde toepassen', emerging: 'ordent woorden op beginletter met hulp van een alfabet-kaart', proficient: 'ordent zelfstandig tien woorden op beginletter zonder hulpmiddel', advanced: 'ordent woorden op tweede letter en gebruikt een woordenboek om woorden op te zoeken' },
    ],
  },

  animals: {
    seoTitle: 'Dieren-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare dieren-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dieren groep 3, dieren oefeningen 6\u20137 jaar, dieren oefeningen groep 3, dieren uitprintbaar groep 3, dieren werkbladen groep 3, dieren activiteiten groep 3, dieren leerbladen 6\u20137 jaar, dieren gratis groep 3, dieren PDF groep 3, dieren rekenen groep 3',
    snippetAnswer: 'Dieren-oefeningen voor groep 3 (6\u20137 jaar) gebruiken diercontexten voor optellen en aftrekken tot 20, redactiesommen, dierennamen lezen en schrijven en classificatie op leefomgeving. Kinderen lossen rekenverhalen op over dieren in de natuur. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het dierenthema een krachtige context voor de overgang naar formeel rekenen en lezen: zes- en zevenjarigen gebruiken dieren niet meer alleen om te tellen maar om echte rekenverhalen op te lossen. Vijf eenden zwemmen in de vijver, drie vliegen weg \u2014 hoeveel blijven er? Dit type redactiesom vereist begrijpend lezen, rekenkundige vertaling en notatie, precies de vaardigheden die de SLO-leerlijnen voor groep 3 als kerndoelen stellen. Tegelijkertijd biedt het dierenthema rijke taalcontexten: dierennamen zijn uitstekend oefenmateriaal voor technisch lezen omdat ze vari\u00ebren van korte woorden als vis en kat tot langere woorden als krokodil en vlinder. Classificatie wordt wetenschappelijker: kinderen ordenen dieren op leefomgeving, voedsel en voortbeweging en leggen hun redenering uit \u2014 de eerste stap naar gestructureerd biologieonderwijs.',
    developmentalMilestones: [
      { milestone: 'Redactiesommen oplossen (6\u20137-jarigen vertalen een verhaaltje naar een rekenbewerking)', howWeAddress: 'Dierverhaal-opdrachten waarbij kinderen een kort verhaaltje lezen en de juiste optel- of aftreksom opstellen bouwen de brug tussen taal en rekenen' },
      { milestone: 'Optellen en aftrekken tot 20 (geautomatiseerd rekenen in betekenisvolle context)', howWeAddress: 'Rekenactiviteiten met dierenaantallen in natuurscenes bieden herhaalde oefening van sommen tot 20 in een motiverende context' },
      { milestone: 'Dierennamen vlot lezen (decoderen van woorden met wisselende lengte)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met dierennamen oefenen het decoderen van korte \u00e9n langere woorden in een bekende context' },
      { milestone: 'Classificatie op meerdere kenmerken (dieren ordenen op leefomgeving, voedsel, voortbeweging)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen dieren groeperen op twee kenmerken tegelijk en hun keuze schriftelijk toelichten' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen en aftrekken tot 10, bied redactiesommen aan met ondersteunende plaatjes en gebruik een woordenbank voor dierennamen. Voor gevorderde kinderen: introduceer sommen tot 20 met meerdere bewerkingen, laat hen eigen redactiesommen bedenken en schrijven, en daag hen uit met classificatie op drie kenmerken met schriftelijke toelichting.',
    parentTakeaway: 'Dieren maken rekenen en lezen vanzelfsprekend voor kinderen in groep 3. Bezoek samen een kinderboerderij of dierentuin en stel rekenvragen: als er acht geiten zijn en drie weglopen, hoeveel blijven er? Laat uw kind na een dierenwerkblad een kort verhaaltje schrijven over een dier met ten minste \u00e9\u00e9n rekensom erin. Lees samen een dierenboek en oefen het opzoeken van dierennamen in een kinderwoordenboek.',
    classroomIntegration: 'Het dierenthema verbindt in groep 3 rekenen, taal en wereldori\u00ebntatie: bij rekenen worden dierverhaal-sommen opgesteld en opgelost, bij taal worden dierennamen gelezen en korte beschrijvingen geschreven, en bij natuur worden dieren geclassificeerd op leefomgeving en voeding. Een dierenproject met werkbladen, leesteksten en een klassenposter combineert alle vakken, in lijn met de SLO-kerndoelen voor rekenen, taal en ori\u00ebntatie op natuur.',
    assessmentRubric: [
      { skill: 'Redactiesommen met dieren', emerging: 'leest het verhaal maar stelt de rekensom niet zelfstandig op', proficient: 'vertaalt een dierverhaal correct naar een optel- of aftreksom tot 20 en noteert het antwoord', advanced: 'lost meerstaps-redactiesommen op en bedenkt eigen dierverhaal-sommen' },
      { skill: 'Dierennamen lezen en schrijven', emerging: 'leest korte dierennamen (kat, vis) maar hapert bij langere woorden', proficient: 'leest en schrijft zelfstandig acht tot tien dierennamen van wisselende lengte', advanced: 'leest vlot langere dierennamen en schrijft korte zinnen over dieren' },
      { skill: 'Dierclassificatie', emerging: 'sorteert dieren op \u00e9\u00e9n kenmerk (leefomgeving) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en legt de redenering schriftelijk uit' },
    ],
  },

  birds: {
    seoTitle: 'Vogels-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare vogels-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vogels groep 3, vogels oefeningen 6\u20137 jaar, vogels oefeningen groep 3, vogels uitprintbaar groep 3, vogels werkbladen groep 3, vogels activiteiten groep 3, vogels leerbladen 6\u20137 jaar, vogels gratis groep 3, vogels PDF groep 3, vogels rekenen groep 3',
    snippetAnswer: 'Vogels-oefeningen voor groep 3 (6\u20137 jaar) gebruiken vogelsoorten als context voor optellen en aftrekken tot 20, redactiesommen over vogels in de tuin, vogelnamen lezen en schrijven en symmetrie in vleugels. Kinderen leren tellen, rekenen en lezen met de natuur. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het vogelthema een brug tussen natuurobservatie en formeel leren: zes- en zevenjarigen kunnen vogels niet alleen herkennen maar ook tellen, vergelijken en beschrijven in zinnen. De SLO-leerlijnen voor groep 3 benadrukken zowel technisch lezen als rekenen in betekenisvolle contexten, en vogels bieden beide. Redactiesommen over vogels aan het voederhuisje \u2014 er zitten zes mezen en vier vliegen weg, hoeveel blijven er? \u2014 combineren begrijpend lezen met aftrekken. Vogelnamen als merel, specht en zwaluw zijn uitstekend oefenmateriaal voor decoderen omdat ze vari\u00ebren in lengte en klankstructuur. Symmetrie in vleugels biedt een visuele ingang voor meetkunde, terwijl het bijhouden van een vogeltellijst dataregistratie en getalbegrip verbindt. Het seizoensgebonden karakter van vogels \u2014 trekvogels, wintervogels \u2014 voegt een tijdsdimensie toe die kalendervaardigheden en seizoensbegrip versterkt.',
    developmentalMilestones: [
      { milestone: 'Redactiesommen in natuurcontext (6\u20137-jarigen lezen een vogelverhaaltje en stellen de som op)', howWeAddress: 'Vogelverhaaltjes met optel- en aftreksituaties oefenen de vertaling van taal naar rekenbewerking in een herkenbare context' },
      { milestone: 'Optellen en aftrekken tot 20 met gestructureerde notatie (kinderen schrijven de som op)', howWeAddress: 'Rekenactiviteiten waarbij kinderen sommen met vogelcontext noteren op de juiste manier: 6 + 4 = 10' },
      { milestone: 'Vogelnamen decoderen en schrijven (woorden van wisselende lengte en klankstructuur)', howWeAddress: 'Woordzoek- en kruiswoordpuzzels met vogelnamen oefenen het decoderen en spellen van woorden met \u00e9\u00e9n tot drie lettergrepen' },
      { milestone: 'Symmetrie herkennen in natuurvormen (vleugels als spiegelbeeld)', howWeAddress: 'Symmetrie-activiteiten met vogelvleugels laten kinderen de spiegellijn vinden en de ontbrekende helft tekenen of aanvullen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied vogelnamen aan met afbeeldingen en een woordenbank, en gebruik eenvoudige symmetriefiguren met een duidelijke hulplijn. Voor gevorderde kinderen: introduceer sommen tot 20 met aftrekken en ontbrekende termen, laat hen eigen vogelredactiesommen schrijven en daag hen uit met complexe symmetrietekeningen van vogelsilhouetten.',
    parentTakeaway: 'Vogels zijn overal en bieden dagelijks rekenkansen voor groep 3. Hang samen een voederhuisje op en laat uw kind tellen hoeveel vogels er komen: zes mezen plus drie mussen, hoeveel bij elkaar? Hoeveel vliegen er weg? Na een vogelwerkblad kunt u samen een vogeltellijst bijhouden per week en de aantallen vergelijken \u2014 dit combineert rekenen, schrijven en natuurobservatie in \u00e9\u00e9n project.',
    classroomIntegration: 'Het vogelthema werkt in groep 3 vakoverstijgend: bij rekenen worden vogelredactiesommen opgelost en telgegevens geregistreerd, bij taal worden vogelnamen gelezen en beschrijvingen geschreven, bij natuur worden vogels geobserveerd en geclassificeerd op seizoen en leefomgeving, en bij beeldende vorming worden symmetrische vogeltekeningen gemaakt. Een vogelproject met werkbladen en buitenobservaties sluit aan bij de SLO-doelen voor rekenen, taal en natuur.',
    assessmentRubric: [
      { skill: 'Vogelredactiesommen', emerging: 'leest het verhaaltje maar heeft hulp nodig om de som op te stellen', proficient: 'vertaalt zelfstandig een vogelverhaaltje naar een optel- of aftreksom tot 20', advanced: 'lost meerstaps-sommen op en schrijft zelf vogelredactiesommen met correcte notatie' },
      { skill: 'Vogelnamen lezen en schrijven', emerging: 'leest korte vogelnamen (duif, uil) maar hapert bij langere woorden', proficient: 'leest en schrijft acht tot tien vogelnamen correct inclusief tweelettergrepige woorden', advanced: 'leest vlot drielettergrepige vogelnamen en schrijft korte zinnen over vogels' },
      { skill: 'Symmetrie in vogels', emerging: 'herkent symmetrie met hulp maar tekent de spiegelhelft niet nauwkeurig', proficient: 'vindt zelfstandig de spiegellijn en voltooit een symmetrische vogeltekening', advanced: 'ontwerpt eigen symmetrische vogelsilhouetten en legt het symmetrieconcept uit' },
    ],
  },

  birthday: {
    seoTitle: 'Verjaardag-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare verjaardag-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'verjaardag groep 3, verjaardag oefeningen 6\u20137 jaar, verjaardag oefeningen groep 3, verjaardag uitprintbaar groep 3, verjaardag werkbladen groep 3, verjaardag activiteiten groep 3, verjaardag leerbladen 6\u20137 jaar, verjaardag gratis groep 3, verjaardag PDF groep 3, verjaardag rekenen groep 3',
    snippetAnswer: 'Verjaardag-oefeningen voor groep 3 (6\u20137 jaar) combineren feestcontext met optellen en aftrekken tot 20, eerlijk verdelen van traktaties, een verjaardagskaart schrijven en redactiesommen over een feestje. Kinderen rekenen met cadeaus en taarten. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het verjaardagsthema een emotioneel geladen context die rekenen en taal onlosmakelijk verbindt: zes- en zevenjarigen organiseren mentaal een feestje waarbij ze traktaties eerlijk verdelen, cadeaus tellen en uitnodigingen schrijven. De SLO-leerlijnen voor groep 3 benadrukken rekenen in alledaagse situaties en het verjaardagsthema is de meest persoonlijke situatie die een kind kent. Redactiesommen over feestjes \u2014 er zijn 12 snoepjes voor 4 kinderen, hoeveel krijgt ieder? \u2014 introduceren het concept van eerlijk delen als voorbereiding op deelsommen. Optellen en aftrekken tot 20 wordt geoefend met ballonnen, kaarsen op de taart en gasten op het feest. Schrijfopdrachten zoals het maken van een uitnodiging of verjaardagskaart oefenen functioneel schrijven: een echt doel voor een echt publiek. Het tijdsaspect \u2014 leeftijden, data, volgorde van de dag \u2014 versterkt kalendervaardigheden.',
    developmentalMilestones: [
      { milestone: 'Eerlijk verdelen als voorbereiding op delen (6\u20137-jarigen verdelen traktaties over groepen)', howWeAddress: 'Verdeelactiviteiten waarbij kinderen traktaties eerlijk over gasten verdelen introduceren het concept van gelijkmatig delen met concreet materiaal' },
      { milestone: 'Optellen en aftrekken tot 20 in feestcontext (rekenen met cadeaus, ballonnen, gasten)', howWeAddress: 'Rekenactiviteiten met feestmateriaal bieden motiverende context voor sommen tot 20 die kinderen graag willen oplossen' },
      { milestone: 'Functioneel schrijven (uitnodigingen, kaarten, lijstjes met een echt doel)', howWeAddress: 'Schrijfopdrachten zoals een verjaardagsuitnodiging of bedankkaart oefenen zinsbouw en spelling in een betekenisvolle context' },
      { milestone: 'Kalendervaardigheden (datum, leeftijd, volgorde van gebeurtenissen)', howWeAddress: 'Activiteiten rond verjaardagen op de klassenkalender oefenen het aflezen van data, berekenen van leeftijden en ordenen van gebeurtenissen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied verdeelopdrachten aan met concreet materiaal (blokjes als traktaties), en geef schrijfkaders voor uitnodigingen met invulwoorden. Voor gevorderde kinderen: introduceer sommen tot 20 met ontbrekende termen, laat hen een feestbudget berekenen, en daag hen uit om een verjaardagsverhaal te schrijven met meerdere zinnen.',
    parentTakeaway: 'De verjaardag van uw kind is een natuurlijke rekenles in groep 3. Laat uw kind helpen met het verdelen van traktaties: als er 16 koekjes zijn voor 8 kinderen, hoeveel krijgt ieder? Tel samen de kaarsen op de taart en reken: hoe oud word je over drie jaar? Laat uw kind zelf de uitnodigingen schrijven \u2014 naam, datum, tijd en adres oefenen functioneel schrijven op het niveau van groep 3.',
    classroomIntegration: 'Het verjaardagsthema biedt in groep 3 integratiemogelijkheden: bij rekenen worden traktaties verdeeld en feestsommen opgelost, bij taal worden uitnodigingen en kaarten geschreven, bij wereldori\u00ebntatie wordt de klassenkalender bijgehouden met verjaardagen, en bij creatieve vorming worden decoraties ontworpen. Een klassenverjaardag-project met werkbladen combineert alle vakken, in lijn met de SLO-doelen voor rekenen en taal.',
    assessmentRubric: [
      { skill: 'Eerlijk verdelen', emerging: 'verdeelt met hulp maar maakt ongelijke groepen', proficient: 'verdeelt zelfstandig traktaties gelijk over groepen tot zes en controleert het resultaat', advanced: 'verdeelt snel en correct, berekent hoeveel extra nodig zijn bij ongelijke verdeling' },
      { skill: 'Feestsommen tot 20', emerging: 'lost optelopdrachten tot 10 op maar heeft moeite met aftrekken', proficient: 'rekent vlot op en af tot 20 in feestcontext en noteert de sommen correct', advanced: 'lost meerstaps-redactiesommen op en bedenkt eigen feestsommen' },
      { skill: 'Functioneel schrijven', emerging: 'schrijft losse woorden op een kaart met hulp van een voorbeeld', proficient: 'schrijft zelfstandig een korte uitnodiging of kaart met correcte zinnen', advanced: 'schrijft uitgebreide kaarten met meerdere zinnen en persoonlijke details' },
    ],
  },

  body: {
    seoTitle: 'Lichaam-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare lichaam-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'lichaam groep 3, lichaam oefeningen 6\u20137 jaar, lichaam oefeningen groep 3, lichaam uitprintbaar groep 3, lichaam werkbladen groep 3, lichaam activiteiten groep 3, lichaam leerbladen 6\u20137 jaar, lichaam gratis groep 3, lichaam PDF groep 3, lichaam rekenen groep 3',
    snippetAnswer: 'Lichaam-oefeningen voor groep 3 (6\u20137 jaar) combineren het menselijk lichaam met optellen en aftrekken tot 20, lichaamswoorden lezen en schrijven, redactiesommen over lengte en gewicht en symmetrie van het lichaam. Kinderen meten, rekenen en schrijven over zichzelf. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het lichaamsthema een startpunt voor meten en gegevensverwerking: zes- en zevenjarigen zijn gefascineerd door hun groeiende lichaam en die interesse kan worden ingezet voor formeel rekenen en schrijven. De SLO-leerlijnen benadrukken meten als kerndoel in groep 3, en het eigen lichaam is het meest persoonlijke meetobject: lengte meten met een meetlint, de armspanwijdte vergelijken met de lichaamslengte, en het aantal tanden tellen. Redactiesommen over het lichaam \u2014 je hebt 20 melktanden, er vallen er 4 uit, hoeveel heb je nog? \u2014 verbinden rekenen met de dagelijkse ervaring. Anatomische woorden als schouder, elleboog en enkel bieden uitstekend decodeermateriaal van oplopende moeilijkheid. Symmetrie van het lichaam \u2014 linkerhand spiegelt rechterhand \u2014 geeft een tastbare ervaring van het meetkundeconcept. Schrijfopdrachten zoals het beschrijven van de eigen kenmerken oefenen functioneel schrijven met persoonlijke betekenis.',
    developmentalMilestones: [
      { milestone: 'Meten met standaard- en niet-standaardeenheden (6\u20137-jarigen meten hun eigen lichaam)', howWeAddress: 'Meetactiviteiten waarbij kinderen lichaamslengte, handspanwijdte en voetstappen meten en registreren bouwen meetvaardigheden op met persoonlijke referentiepunten' },
      { milestone: 'Rekenen met lichaamsgetallen (tanden, vingers, gewrichten in sommen tot 20)', howWeAddress: 'Rekenactiviteiten met lichaamsaantallen \u2014 20 melktanden, 10 vingers \u2014 bieden herkenbare getallen voor optel- en aftreksommen' },
      { milestone: 'Anatomische woorden lezen en schrijven (woorden van oplopende moeilijkheid decoderen)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met lichaamswoorden oefenen het decoderen van korte (arm, been) tot langere woorden (schouder, elleboog)' },
      { milestone: 'Lichaamssymmetrie als meetkundeconcept (spiegellijn door het lichaam herkennen)', howWeAddress: 'Symmetrieactiviteiten waarbij kinderen de linker- en rechterhelft van het lichaam vergelijken en symmetrische tekeningen maken' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk meten tot vergelijken (langer/korter), bied lichaamswoorden aan met plaatjes en een woordenbank, en gebruik het eigen lichaam als concreet referentiepunt. Voor gevorderde kinderen: introduceer meten in centimeters, laat hen meetgegevens in een tabel noteren en vergelijken, en daag hen uit om een kort beschrijvend stukje te schrijven over hun lichaam met meetresultaten.',
    parentTakeaway: 'Het lichaam van uw kind is het beste leermiddel in groep 3. Meet samen de lengte en markeer de groei op een deurpost \u2014 hoeveel centimeter erbij sinds vorig jaar? Tel samen de tanden die zijn uitgevallen en reken: hoeveel melktanden heb je nog? Laat uw kind een zelfportret tekenen en alle lichaamsdelen labelen. Na een lichaamswerkblad kunt u samen meten wie de langste armspanwijdte heeft in het gezin.',
    classroomIntegration: 'Het lichaamsthema integreert in groep 3 met rekenen (meten, tellen, sommen met lichaamsgetallen), taal (lichaamswoorden lezen en schrijven, beschrijvingen maken), natuur (functies van lichaamsdelen, gezond leven) en bewegingsonderwijs (lichaamsbewustzijn, co\u00f6rdinatie). Een lichaamsproject met meetkaarten, werkbladen en een klassengrafiek van lengtes combineert alle vakken, in lijn met de SLO-kerndoelen.',
    assessmentRubric: [
      { skill: 'Meten van het lichaam', emerging: 'vergelijkt twee lengtes (langer/korter) maar meet niet zelfstandig', proficient: 'meet correct met een meetlint in centimeters en noteert het resultaat', advanced: 'meet meerdere lichaamsdelen, vergelijkt de metingen en registreert ze in een tabel' },
      { skill: 'Lichaamsrekensommen', emerging: 'lost optelsommen tot 10 op met lichaamscontext maar heeft moeite met aftrekken', proficient: 'rekent vlot op en af tot 20 in lichaamscontext en noteert sommen correct', advanced: 'lost redactiesommen op met meerdere stappen en formuleert eigen lichaamssommen' },
      { skill: 'Lichaamswoorden lezen en schrijven', emerging: 'leest korte woorden (arm, been) maar hapert bij langere anatomische termen', proficient: 'leest en schrijft acht tot tien lichaamswoorden correct op gelinieerd papier', advanced: 'leest vlot langere woorden en schrijft korte beschrijvende zinnen over het lichaam' },
    ],
  },

  camping: {
    seoTitle: 'Kamperen-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kamperen-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kamperen groep 3, kamperen oefeningen 6\u20137 jaar, kamperen oefeningen groep 3, kamperen uitprintbaar groep 3, kamperen werkbladen groep 3, kamperen activiteiten groep 3, kamperen leerbladen 6\u20137 jaar, kamperen gratis groep 3, kamperen PDF groep 3, kamperen rekenen groep 3',
    snippetAnswer: 'Kamperen-oefeningen voor groep 3 (6\u20137 jaar) gebruiken kampeerscenario\u2019s voor optellen en aftrekken tot 20, redactiesommen over tent en kampvuur, kampeerwoorden lezen en schrijven en plattegrondlezen. Kinderen rekenen, lezen en schrijven in een avontuurlijke buitencontext. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het kamperthema een avontuurlijk leerplatform dat rekenen, taal en ruimtelijk denken combineert: zes- en zevenjarigen plannen mentaal een kampeertocht waarbij ze benodigdheden tellen, afstanden inschatten en een kampeerverslag schrijven. De SLO-leerlijnen benadrukken rekenen in praktische situaties en plattegrondvaardigheden als kerndoelen, en kamperen biedt beide in een spannende context. Redactiesommen over kamperen \u2014 er liggen 14 houtblokken bij het kampvuur, je gebruikt er 6, hoeveel heb je nog? \u2014 oefenen aftrekken in een betekenisvolle situatie. Plattegrondlezen \u2014 waar staat de tent ten opzichte van het meer? \u2014 bouwt ruimtelijke ori\u00ebntatie op. Kampeerwoorden als slaapzak, kampvuur en zaklamp zijn motiverend oefenmateriaal voor technisch lezen en het schrijven van een kampeerdagboek oefent verhalend schrijven met persoonlijke ervaringen.',
    developmentalMilestones: [
      { milestone: 'Redactiesommen in praktische context (6\u20137-jarigen lossen kampeerrekenverhalen op)', howWeAddress: 'Kampeerverhaaltjes met optel- en aftreksituaties oefenen de vertaling van een praktische situatie naar een rekenbewerking' },
      { milestone: 'Plattegrondlezen en ruimtelijke ori\u00ebntatie (kinderen lezen een eenvoudige kaart)', howWeAddress: 'Kampeerplattegrond-activiteiten waarbij kinderen de positie van tent, meer en bos beschrijven bouwen ruimtelijk vocabulaire en kaartleesvaardigheden op' },
      { milestone: 'Kampeerwoorden decoderen en schrijven (thematisch vocabulaire)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met kampeerwoorden oefenen het decoderen van samengestelde woorden als kampvuur en slaapzak' },
      { milestone: 'Verhalend schrijven op basis van ervaring (een kampeerdagboek bijhouden)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een kampeerdag beschrijven oefenen zinsbouw en chronologisch vertellen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied een eenvoudige plattegrond met drie elementen en gebruik afbeeldingen bij kampeerwoorden. Voor gevorderde kinderen: introduceer meerstaps-sommen tot 20, laat hen een eigen kampeerplattegrond tekenen en labelen, en daag hen uit om een kampeerverhaal te schrijven met meerdere alinea\u2019s.',
    parentTakeaway: 'Kamperen biedt ontelbare rekenmomenten voor groep 3. Laat uw kind bij het inpakken de spullen tellen en een inpaklijst schrijven: hoeveel sokken, hoeveel shirts? Bij het kampvuur: als we 15 marshmallows hebben en 7 opeten, hoeveel zijn er nog? Na een kampeerwerkblad kunt u samen een plattegrond van de kampeerplek tekenen en alle elementen labelen \u2014 tent, kampvuur, meer, bos.',
    classroomIntegration: 'Het kamperthema integreert in groep 3 met rekenen (sommen met kampeermateriaal, plattegrondlezen), taal (kampeerwoorden lezen, een kampeerdagboek schrijven), aardrijkskunde (kaart en kompas, ruimtelijke ori\u00ebntatie) en natuur (buitenleven, seizoenen). Een kampeerdagproject in de schooltuin combineert werkbladen met buitenactiviteiten, in lijn met de SLO-doelen voor rekenen, taal en ori\u00ebntatie.',
    assessmentRubric: [
      { skill: 'Kampeerredactiesommen', emerging: 'leest het verhaaltje maar stelt de som niet zelfstandig op', proficient: 'vertaalt kampeerverhaaltjes correct naar sommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op en bedenkt eigen kampeerredactiesommen' },
      { skill: 'Plattegrondlezen', emerging: 'benoemt elementen op de kaart maar beschrijft posities niet correct', proficient: 'beschrijft de positie van elementen met positiewoorden en volgt een route op de plattegrond', advanced: 'tekent een eigen plattegrond met legenda en beschrijft routes schriftelijk' },
      { skill: 'Kampeerwoorden lezen en schrijven', emerging: 'leest korte kampeerwoorden met hulp maar hapert bij samengestelde woorden', proficient: 'leest en schrijft zelfstandig acht tot tien kampeerwoorden inclusief samenstellingen', advanced: 'leest vlot langere samengestelde woorden en schrijft korte kampeerverhalen' },
    ],
  },

  circus: {
    seoTitle: 'Circus-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare circus-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'circus groep 3, circus oefeningen 6\u20137 jaar, circus oefeningen groep 3, circus uitprintbaar groep 3, circus werkbladen groep 3, circus activiteiten groep 3, circus leerbladen 6\u20137 jaar, circus gratis groep 3, circus PDF groep 3, circus rekenen groep 3',
    snippetAnswer: 'Circus-oefeningen voor groep 3 (6\u20137 jaar) gebruiken circusacts als context voor optellen en aftrekken tot 20, redactiesommen over artiesten en publiek, circuswoorden lezen en schrijven en patronen in circusvoorstellingen. Kinderen rekenen met clowns, acrobaten en dieren. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het circusthema een spectaculaire context die de motivatie voor rekenen en schrijven enorm verhoogt: zes- en zevenjarigen zijn gefascineerd door acrobaten, clowns en dressuur en die fascinatie wordt productief ingezet. De SLO-leerlijnen voor groep 3 benadrukken geautomatiseerd rekenen tot 20 en functioneel schrijven, en het circus biedt voor beide een onweerstaanbare context. Redactiesommen over de circusvoorstelling \u2014 er zijn 18 stoelen in de rij en 5 zijn bezet, hoeveel zijn er vrij? \u2014 combineren begrijpend lezen met rekenen. Circuswoorden als acrobaat, goochelaar en trapeze zijn uitdagend decodeermateriaal dat de leesmotivatie verhoogt. Patronen in circusoptochten en jongleerreeksen oefenen het logisch denken dat wiskunde vereist. Een circusverslag schrijven oefent verhalend schrijven met een chronologische structuur: eerst, daarna, tot slot.',
    developmentalMilestones: [
      { milestone: 'Geautomatiseerd rekenen tot 20 in spannende context (6\u20137-jarigen rekenen vlot in circusscenario\u2019s)', howWeAddress: 'Rekenactiviteiten met circusthema \u2014 stoelen tellen, artiesten optellen \u2014 bieden herhaalde oefening in een context die kinderen intrinsiek boeit' },
      { milestone: 'Redactiesommen met meerdere gegevens (kinderen verwerken twee of meer getallen uit een verhaaltje)', howWeAddress: 'Circusverhaal-opdrachten met twee getallen en een vraag oefenen het selecteren van relevante informatie uit een tekst' },
      { milestone: 'Circuswoorden decoderen (langere en onbekende woorden vlot lezen)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met circuswoorden oefenen het decoderen van meerlettergrepige woorden als goochelaar en acrobaat' },
      { milestone: 'Verhalend schrijven met chronologie (eerst, daarna, tot slot)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een circusbezoek beschrijven oefenen chronologisch vertellen met signaalwoorden' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied circuswoorden aan met plaatjes en een woordenbank, en geef schrijfkaders met invulzinnen. Voor gevorderde kinderen: introduceer sommen tot 20 met ontbrekende termen, laat hen een eigen circusprogramma bedenken met berekende tijden, en daag hen uit om een uitgebreid circusverslag te schrijven.',
    parentTakeaway: 'Het circus biedt verrassende leermomenten voor groep 3. Kijk samen een circusvideo en stel rekenvragen: hoeveel ballen jongleert de clown, als hij er \u00e9\u00e9n laat vallen? Tel de stoelen in een rij en bereken hoeveel er vrij zijn. Laat uw kind na een circuswerkblad een verslag schrijven van een echt of verzonnen circusbezoek \u2014 wie trad er op, wat vond je het leukst en waarom?',
    classroomIntegration: 'Het circusthema integreert in groep 3 met rekenen (sommen met stoelen, artiesten en kaartjes), taal (circuswoorden lezen, een circusverslag schrijven), drama (zelf circusacts bedenken en opvoeren) en beeldende vorming (circusposters ontwerpen). Een circusweek met werkbladen, een klassencircus en een schrijfproject combineert alle vakken, in lijn met de SLO-doelen voor rekenen, taal en kunstzinnige ori\u00ebntatie.',
    assessmentRubric: [
      { skill: 'Circusredactiesommen', emerging: 'leest het verhaal maar selecteert niet zelfstandig de juiste getallen', proficient: 'vertaalt circusverhalen correct naar sommen tot 20 met optel- en aftrekbewerkingen', advanced: 'lost sommen met meerdere stappen op en formuleert eigen circusredactiesommen' },
      { skill: 'Circuswoorden lezen', emerging: 'leest korte circuswoorden (clown, tent) maar hapert bij langere woorden', proficient: 'decodeert zelfstandig meerlettergrepige circuswoorden als goochelaar en acrobaat', advanced: 'leest vlot alle circuswoorden en gebruikt ze correct in eigen zinnen' },
      { skill: 'Verhalend schrijven', emerging: 'schrijft losse zinnen over het circus zonder chronologische ordening', proficient: 'schrijft een kort verslag met eerst, daarna en tot slot', advanced: 'schrijft een uitgebreid circusverslag met details, dialoog en een persoonlijke mening' },
    ],
  },

  clothing: {
    seoTitle: 'Kleding-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kleding-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kleding groep 3, kleding oefeningen 6\u20137 jaar, kleding oefeningen groep 3, kleding uitprintbaar groep 3, kleding werkbladen groep 3, kleding activiteiten groep 3, kleding leerbladen 6\u20137 jaar, kleding gratis groep 3, kleding PDF groep 3, kleding rekenen groep 3',
    snippetAnswer: 'Kleding-oefeningen voor groep 3 (6\u20137 jaar) combineren het kledingthema met optellen en aftrekken tot 20, redactiesommen over kledingprijzen, kledingwoorden lezen en schrijven en classificatie op seizoen en weer. Kinderen rekenen met een garderobekast. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het kledingthema een praktisch leerplatform voor rekenen met geld en classificatie: zes- en zevenjarigen kiezen dagelijks hun kleding en die ervaring wordt verbonden met formeel leren. De SLO-leerlijnen benadrukken rekenen met geld en meten als kerndoelen, en kleding biedt een natuurlijke context: hoeveel kost een shirt en een broek samen, hoeveel wisselgeld krijg je terug? Redactiesommen over kledingwinkels oefenen optellen, aftrekken en het werken met euro\u2019s. Classificatie op meerdere kenmerken \u2014 seizoen, materiaal, gelegenheid \u2014 wordt wetenschappelijker dan in de kleutergroepen. Kledingwoorden van wisselende lengte (jas, trui, spijkerbroek, regenjas) zijn uitstekend decodeermateriaal, en het schrijven van een kledingbeschrijving oefent bijvoeglijke naamwoorden: de rode, warme, zachte trui.',
    developmentalMilestones: [
      { milestone: 'Rekenen met geld in kledingcontext (6\u20137-jarigen optellen en aftrekken met eurobedragen)', howWeAddress: 'Kledingwinkel-activiteiten waarbij kinderen prijzen optellen en wisselgeld berekenen oefenen rekenen met geld in een herkenbare context' },
      { milestone: 'Classificatie op meerdere kenmerken (kleding ordenen op seizoen, weer, gelegenheid)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen kleding groeperen op twee of drie kenmerken en hun keuze toelichten' },
      { milestone: 'Kledingwoorden decoderen en schrijven (inclusief samengestelde woorden)', howWeAddress: 'Woordactiviteiten met kledingwoorden van oplopende lengte oefenen het decoderen en schrijven van enkelvoudige en samengestelde woorden' },
      { milestone: 'Beschrijvend schrijven met bijvoeglijke naamwoorden (kleding beschrijven)', howWeAddress: 'Schrijfopdrachten waarbij kinderen kledingstukken beschrijven oefenen het gebruik van bijvoeglijke naamwoorden voor kleur, materiaal en pasvorm' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk geldsommen tot hele euro\u2019s onder 10, bied kledingwoorden aan met plaatjes, en gebruik sorteeractiviteiten met \u00e9\u00e9n criterium. Voor gevorderde kinderen: introduceer sommen met euro\u2019s en centen, laat hen een kledingbudget berekenen voor een uitje, en daag hen uit om een uitgebreide kledingbeschrijving te schrijven met meerdere bijvoeglijke naamwoorden.',
    parentTakeaway: 'Kleding biedt dagelijkse rekenkansen in groep 3. Laat uw kind bij het aankleden kiezen op basis van het weer \u2014 welke kleding hoort bij regen, zon, sneeuw? Ga samen kledingprijzen vergelijken: als een shirt 8 euro kost en een broek 12 euro, hoeveel is dat samen? Na een kledingwerkblad kunt u samen de kast opruimen en kleding sorteren op seizoen \u2014 tellen, ordenen en labelen in \u00e9\u00e9n activiteit.',
    classroomIntegration: 'Het kledingthema verbindt in groep 3 rekenen (geldsommen, maten vergelijken), taal (kledingwoorden lezen, beschrijvingen schrijven), wereldori\u00ebntatie (weer en seizoenen, kleding in andere landen) en creatieve vorming (kledingontwerpen tekenen). Een kledingwinkelhoek met prijskaartjes en speelgeld combineert werkbladen met rollenspel, in lijn met de SLO-doelen voor rekenen en taal.',
    assessmentRubric: [
      { skill: 'Rekenen met kledingprijzen', emerging: 'telt twee prijzen op tot 10 euro met hulp maar berekent geen wisselgeld', proficient: 'telt prijzen op tot 20 euro en berekent wisselgeld correct', advanced: 'berekent een kledingbudget met meerdere artikelen en vergelijkt totalen' },
      { skill: 'Kledingclassificatie', emerging: 'sorteert kleding op \u00e9\u00e9n kenmerk (seizoen) met hulp', proficient: 'classificeert zelfstandig op twee kenmerken en benoemt de groepen', advanced: 'classificeert op drie kenmerken, bedenkt eigen criteria en legt de redenering schriftelijk uit' },
      { skill: 'Kledingwoorden lezen en schrijven', emerging: 'leest korte kledingwoorden (jas, rok) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien kledingwoorden correct inclusief samenstellingen', advanced: 'schrijft kledingbeschrijvingen met bijvoeglijke naamwoorden in volledige zinnen' },
    ],
  },

  colors: {
    seoTitle: 'Kleuren-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare kleuren-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kleuren groep 3, kleuren oefeningen 6\u20137 jaar, kleuren oefeningen groep 3, kleuren uitprintbaar groep 3, kleuren werkbladen groep 3, kleuren activiteiten groep 3, kleuren leerbladen 6\u20137 jaar, kleuren gratis groep 3, kleuren PDF groep 3, kleuren rekenen groep 3',
    snippetAnswer: 'Kleuren-oefeningen voor groep 3 (6\u20137 jaar) gebruiken kleurcontexten voor optellen en aftrekken tot 20, redactiesommen over kleurmenging, kleurwoorden lezen en schrijven en logische patronen met kleurenreeksen. Kinderen rekenen, lezen en schrijven met een kleurenwereld. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het kleurenthema een instrument voor logisch denken en taaluitbreiding: zes- en zevenjarigen kennen de basiskleuren en zijn klaar om kleurmenging te verkennen, patronen te analyseren en kleurwoorden in zinnen te gebruiken. De SLO-leerlijnen benadrukken patroonherkenning en logisch redeneren als kerndoelen voor rekenen, en kleuren bieden een visueel aantrekkelijke context. Rood plus geel is oranje \u2014 dit concept van combineren sluit aan bij het optellen. Kleurenreeksen in patronen (rood, blauw, rood, blauw, ...) oefenen het herkennen en voortzetten van regelmatige reeksen. Kleurwoorden zijn uitstekend decodeermateriaal: van korte woorden als rood en blauw tot samengestelde woorden als lichtgroen en donkerblauw. Het beschrijven van objecten met kleurwoorden \u2014 de groene appel, het blauwe meer \u2014 oefent het gebruik van bijvoeglijke naamwoorden in zinnen.',
    developmentalMilestones: [
      { milestone: 'Patroonherkenning en -voortzetting (6\u20137-jarigen analyseren kleurenreeksen en voorspellen het volgende element)', howWeAddress: 'Patroonactiviteiten met kleurenreeksen van oplopende complexiteit oefenen het herkennen, beschrijven en voortzetten van regelmatige patronen' },
      { milestone: 'Rekenen met kleurgroepen (optellen en aftrekken van gekleurde objecten tot 20)', howWeAddress: 'Rekenactiviteiten waarbij kinderen gekleurde objecten tellen, optellen en aftrekken in kleurrijke contexten' },
      { milestone: 'Kleurwoorden en samenstellingen lezen en schrijven', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met kleurwoorden van oplopende moeilijkheid oefenen het decoderen van enkelvoudige en samengestelde kleurwoorden' },
      { milestone: 'Beschrijvend taalgebruik met bijvoeglijke naamwoorden (kleuren als eigenschap)', howWeAddress: 'Schrijfopdrachten waarbij kinderen objecten beschrijven met kleurwoorden oefenen de zinsbouw met bijvoeglijke naamwoorden' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk patronen tot twee kleuren in afwisseling, bied kleurwoorden aan met kleurvlakken als visuele steun, en geef schrijfkaders met invulzinnen. Voor gevorderde kinderen: introduceer patronen met drie of vier kleuren, laat hen samengestelde kleurwoorden zelfstandig schrijven, en daag hen uit met redactiesommen over kleurmenging.',
    parentTakeaway: 'Kleuren zijn overal en bieden rekenkansen voor groep 3. Sorteer samen de was op kleur en tel: hoeveel rode kledingstukken, hoeveel blauwe? Hoeveel bij elkaar? Meng samen verf en ontdek: rood plus geel geeft oranje. Na een kleurenwerkblad kunt u samen een schilderij beschrijven \u2014 welke kleuren zie je, welke is het meest, welke het minst? Dit oefent tellen, vergelijken en beschrijvend taalgebruik.',
    classroomIntegration: 'Het kleurenthema werkt in groep 3 vakoverstijgend: bij rekenen worden kleurenpatronen geanalyseerd en kleurgroepen geteld, bij taal worden kleurwoorden gelezen en beschrijvingen geschreven, bij beeldende vorming worden kleuren gemengd en kleurenwielen gemaakt, en bij natuur worden seizoenskleuren besproken. Werkbladen worden ingezet bij zelfstandig rekenen en taalactiviteiten, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Kleurenpatronen', emerging: 'herkent een tweekleurig patroon maar voorspelt het volgende element niet zelfstandig', proficient: 'herkent en zet patronen met twee of drie kleuren zelfstandig voort', advanced: 'ontwerpt eigen complexe patronen en beschrijft de regel die het patroon bepaalt' },
      { skill: 'Rekenen met kleurgroepen', emerging: 'telt gekleurde objecten maar combineert groepen niet zelfstandig tot 20', proficient: 'telt op en trekt af tot 20 met gekleurde objecten en noteert sommen correct', advanced: 'lost kleurenredactiesommen op en bedenkt eigen sommen met kleurcontext' },
      { skill: 'Kleurwoorden lezen en schrijven', emerging: 'leest basiskleurwoorden (rood, blauw) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien kleurwoorden correct inclusief lichtgroen en donkerblauw', advanced: 'schrijft beschrijvende zinnen met meerdere kleurwoorden als bijvoeglijke naamwoorden' },
    ],
  },

  construction: {
    seoTitle: 'Bouw-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare bouw-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'bouw groep 3, bouw oefeningen 6\u20137 jaar, bouw oefeningen groep 3, bouw uitprintbaar groep 3, bouw werkbladen groep 3, bouw activiteiten groep 3, bouw leerbladen 6\u20137 jaar, bouw gratis groep 3, bouw PDF groep 3, bouw rekenen groep 3',
    snippetAnswer: 'Bouw-oefeningen voor groep 3 (6\u20137 jaar) gebruiken bouwplaatsscenario\u2019s voor optellen en aftrekken tot 20, redactiesommen over materialen, bouwwoorden lezen en schrijven en meten van lengtes. Kinderen rekenen met bakstenen, planken en gereedschap. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het bouwthema een praktisch leerplatform voor meten en rekenen: zes- en zevenjarigen zijn gefascineerd door bouwplaatsen en die fascinatie kan worden ingezet voor de formele leerdoelen die de SLO-leerlijnen stellen. Meten met liniaal en meetlint \u2014 hoe lang is de plank, hoe breed is de deur? \u2014 is een kerndoel dat op de bouwplaats een logische context krijgt. Redactiesommen over bouwmateriaal \u2014 er liggen 17 bakstenen, de metselaar gebruikt er 9, hoeveel zijn er over? \u2014 oefenen aftrekken in een betekenisvolle situatie. Bouwwoorden als schep, cement, hijskraan en steiger zijn uitdagend decodeermateriaal dat de woordenschat verrijkt. Het tekenen en labelen van een bouwplattegrond oefent ruimtelijk denken en functioneel schrijven. De concrete, tastbare aard van bouwen maakt abstracte rekenbegrippen als meten, schatten en berekenen tastbaar.',
    developmentalMilestones: [
      { milestone: 'Meten met een liniaal en meetlint (6\u20137-jarigen meten in centimeters)', howWeAddress: 'Meetactiviteiten waarbij kinderen bouwmaterialen meten in centimeters en de resultaten noteren bouwen nauwkeurige meetvaardigheden op' },
      { milestone: 'Redactiesommen met bouwmateriaal (kinderen rekenen met aantallen materialen)', howWeAddress: 'Bouwplaatsverhalen met optel- en aftreksituaties oefenen het vertalen van een praktische context naar een rekenbewerking' },
      { milestone: 'Bouwwoorden decoderen en schrijven (inclusief samengestelde bouwwoorden)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met bouwwoorden oefenen het decoderen van woorden als hijskraan, bouwplaats en betonmixer' },
      { milestone: 'Ruimtelijk denken met bouwplattegronden (bovenaanzicht lezen en tekenen)', howWeAddress: 'Plattegrond-activiteiten waarbij kinderen een bouwproject van bovenaf tekenen en labelen oefenen ruimtelijke vertaling' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk meten tot vergelijken (langer/korter), bied bouwwoorden aan met plaatjes en een woordenbank, en gebruik sommen tot 10. Voor gevorderde kinderen: introduceer meten in centimeters met optelling van metingen, laat hen een bouwplattegrond tekenen op schaal, en daag hen uit met meerstaps-sommen over bouwmateriaalbestellingen.',
    parentTakeaway: 'Bouwen en knutselen bieden uitstekende rekenkansen in groep 3. Meet samen meubels of speelgoed met een liniaal: hoe lang is je bed in centimeters? Bouw samen met blokken en tel de lagen: als elke laag 5 blokken heeft en we bouwen 3 lagen, hoeveel blokken hebben we nodig? Na een bouwwerkblad kunt u samen een bouwproject plannen en een lijstje maken van benodigde materialen met aantallen.',
    classroomIntegration: 'Het bouwthema integreert in groep 3 met rekenen (meten, sommen met materialen, schatten), taal (bouwwoorden lezen, een bouwverslag schrijven), techniek (constructies bouwen en testen) en aardrijkskunde (plattegronden lezen). Een bouwproject in de klas met meetopdrachten en werkbladen combineert alle vakken, in lijn met de SLO-doelen voor rekenen, taal en ori\u00ebntatie op techniek.',
    assessmentRubric: [
      { skill: 'Meten in bouwcontext', emerging: 'vergelijkt twee lengtes (langer/korter) maar meet niet nauwkeurig met een liniaal', proficient: 'meet correct in centimeters met een liniaal en noteert het resultaat', advanced: 'meet meerdere objecten, telt metingen op en vergelijkt de totalen' },
      { skill: 'Bouwredactiesommen', emerging: 'leest het verhaal maar stelt de som niet zelfstandig op', proficient: 'vertaalt bouwverhalen correct naar sommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op en bedenkt eigen bouwplaatsredactiesommen' },
      { skill: 'Bouwwoorden lezen en schrijven', emerging: 'leest korte bouwwoorden (schep, bak) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien bouwwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle bouwwoorden en schrijft een kort bouwverslag met correcte zinnen' },
    ],
  },

  cooking: {
    seoTitle: 'Koken-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare koken-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'koken groep 3, koken oefeningen 6\u20137 jaar, koken oefeningen groep 3, koken uitprintbaar groep 3, koken werkbladen groep 3, koken activiteiten groep 3, koken leerbladen 6\u20137 jaar, koken gratis groep 3, koken PDF groep 3, koken rekenen groep 3',
    snippetAnswer: 'Koken-oefeningen voor groep 3 (6\u20137 jaar) gebruiken recepten en keukenactiviteiten voor optellen en aftrekken tot 20, redactiesommen over ingredi\u00ebnten, kookwoorden lezen en schrijven en meten van hoeveelheden. Kinderen rekenen met lepels, kopjes en grammen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het kookthema een natuurlijk leerplatform voor meten en instructief lezen: zes- en zevenjarigen kunnen recepten volgen waarbij ze hoeveelheden meten, ingredi\u00ebnten tellen en stappen in de juiste volgorde uitvoeren. De SLO-leerlijnen benadrukken meten en instructief taalgebruik als kerndoelen, en koken combineert beide in een praktische activiteit. Redactiesommen over recepten \u2014 je hebt 3 eieren nodig voor \u00e9\u00e9n cake, hoeveel voor 2 cakes? \u2014 introduceren vermenigvuldiging als herhaald optellen. Kookwoorden als ingredi\u00ebnt, keukenmachine en maatbeker zijn motiverend decodeermateriaal. Het schrijven van een recept oefent instructief schrijven: een tekst met een doel, volgorde en nauwkeurige hoeveelheden. De multisensorische aard van koken \u2014 ruiken, proeven, voelen \u2014 verdiept het leren voor alle leertypen.',
    developmentalMilestones: [
      { milestone: 'Meten van hoeveelheden (6\u20137-jarigen meten met kopjes, lepels en weegschaal)', howWeAddress: 'Receptactiviteiten waarbij kinderen ingredi\u00ebnten afmeten en hoeveelheden noteren oefenen meten in een functionele context' },
      { milestone: 'Herhaald optellen als voorbereiding op vermenigvuldiging (2 keer 3 eieren = 6)', howWeAddress: 'Receptrekensommen waarbij kinderen ingredi\u00ebnten verdubbelen of halveren introduceren het concept van herhaald optellen' },
      { milestone: 'Instructief lezen (een recept stap voor stap volgen)', howWeAddress: 'Receptleesactiviteiten waarbij kinderen de juiste volgorde bepalen en stappen volgen oefenen instructief begrijpend lezen' },
      { milestone: 'Instructief schrijven (een recept opstellen met hoeveelheden en stappen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een eigen recept schrijven oefenen instructief taalgebruik met signaalwoorden als eerst, dan en tot slot' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied recepten aan met plaatjes bij elke stap, en gebruik eenvoudige meetactiviteiten met hele kopjes. Voor gevorderde kinderen: introduceer sommen met verdubbeling en halvering, laat hen een receptenboekje samenstellen met zelfgeschreven recepten, en daag hen uit met weegschaaloefeningen in grammen.',
    parentTakeaway: 'Koken is de leukste rekenles voor groep 3. Laat uw kind helpen bij het afmeten: hoeveel kopjes bloem, hoeveel lepels suiker? Als het recept 4 eieren vraagt en je wilt het dubbele maken, hoeveel heb je dan nodig? Laat uw kind na een kookwerkblad een eigen recept opschrijven voor het lievelingsgerecht \u2014 met ingredi\u00ebnten en stappen. Dit combineert meten, rekenen en schrijven in \u00e9\u00e9n heerlijke activiteit.',
    classroomIntegration: 'Het kookthema integreert in groep 3 met rekenen (meten, hoeveelheden berekenen, herhaald optellen), taal (recepten lezen en schrijven, kookwoorden), natuur (voedingsstoffen, gezonde voeding) en sociale vaardigheden (samenwerken in de keuken). Een kookproject met werkbladen en een echt kookmoment combineert alle vakken, in lijn met de SLO-doelen voor rekenen, taal en gezondheid.',
    assessmentRubric: [
      { skill: 'Meten bij het koken', emerging: 'vult een maatbeker maar leest de hoeveelheid niet nauwkeurig af', proficient: 'meet correct met kopjes en lepels en noteert de hoeveelheid', advanced: 'meet met een weegschaal in grammen en berekent de hoeveelheden voor een dubbel recept' },
      { skill: 'Receptrekensommen', emerging: 'telt ingredi\u00ebnten op tot 10 maar verdubbelt niet zelfstandig', proficient: 'berekent ingredi\u00ebnten voor dubbele hoeveelheden tot 20 en noteert de sommen', advanced: 'lost meerstaps-receptsommen op en bedenkt eigen receptrekenvragen' },
      { skill: 'Recept lezen en schrijven', emerging: 'leest een recept met hulp maar volgt de stappen niet zelfstandig', proficient: 'leest een eenvoudig recept zelfstandig en schrijft een eigen recept met stappen', advanced: 'schrijft een uitgebreid recept met nauwkeurige hoeveelheden, volgorde en illustraties' },
    ],
  },

  dinosaurs: {
    seoTitle: 'Dinosaurussen-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare dinosaurussen-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dinosaurussen groep 3, dinosaurussen oefeningen 6\u20137 jaar, dinosaurussen oefeningen groep 3, dinosaurussen uitprintbaar groep 3, dinosaurussen werkbladen groep 3, dinosaurussen activiteiten groep 3, dinosaurussen leerbladen 6\u20137 jaar, dinosaurussen gratis groep 3, dinosaurussen PDF groep 3, dinosaurussen rekenen groep 3',
    snippetAnswer: 'Dinosaurussen-oefeningen voor groep 3 (6\u20137 jaar) gebruiken dinosaurusthema\u2019s voor optellen en aftrekken tot 20, redactiesommen over dinosauruskuddes, dinosaurusnamen lezen en schrijven en vergelijken van groottes. Kinderen rekenen met T-rex, Triceratops en Stegosaurus. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het dinosaurusthema een wetenschappelijke context voor rekenen en lezen: zes- en zevenjarigen zijn gefascineerd door deze prehistorische reuzen en die fascinatie stimuleert het leren op alle fronten. De SLO-leerlijnen benadrukken vergelijken en ordenen als kerndoelen, en dinosaurussen bieden een unieke schaalcontext: de T-rex was 12 meter lang, de Compsognathus slechts 1 meter \u2014 hoeveel verschil? Redactiesommen over dinosauruskuddes oefenen optellen en aftrekken tot 20 in een spannend scenario. Dinosaurusnamen als Tyrannosaurus, Triceratops en Stegosaurus zijn het ultieme decodeermateriaal: lange, meerlettergrepige woorden die kinderen gemotiveerd zijn om te kunnen lezen. Het schrijven van dinosaurusfeitjes oefent informatief schrijven. Vergelijken op grootte, gewicht en voedsel bouwt wetenschappelijk denken op.',
    developmentalMilestones: [
      { milestone: 'Vergelijken en ordenen op grootte (6\u20137-jarigen ordenen dinosaurussen van klein naar groot)', howWeAddress: 'Vergelijkingsactiviteiten waarbij kinderen dinosaurussen ordenen op lengte en deze vergelijking in getallen uitdrukken' },
      { milestone: 'Redactiesommen met grote thematische getallen (dinosauruskuddes tot 20)', howWeAddress: 'Dinoredactiesommen waarbij kinderen een verhaaltje over een kudde lezen en de juiste optel- of aftreksom opstellen' },
      { milestone: 'Meerlettergrepige woorden decoderen (dinosaurusnamen als uitdagend leesmateriaal)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met dinosaurusnamen oefenen het decoderen van lange woorden door ze in lettergrepen op te delen' },
      { milestone: 'Informatief schrijven (dinosaurusfeitjes opschrijven in korte zinnen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen drie feitjes over een dinosaurus opschrijven oefenen informatief schrijven met feiten en structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied korte dinosaurusnamen aan (T-rex, Dino) met plaatjes, en gebruik vergelijkingsopdrachten met twee dinosaurussen. Voor gevorderde kinderen: introduceer sommen tot 20 met verschilberekening, laat hen lange dinosaurusnamen in lettergrepen splitsen en zelfstandig schrijven, en daag hen uit met een dinosaurussteckbrief met meerdere feitjes.',
    parentTakeaway: 'Dinosaurussen maken rekenen en lezen spannend in groep 3. Lees samen een dinoboek en oefen het lezen van lange namen: Ty-ran-no-sau-rus \u2014 lettergreep voor lettergreep. Vergelijk lengtes: als de T-rex 12 meter was en de Stegosaurus 9 meter, hoeveel verschil? Na een dinowerkblad kunt u samen een dinosaurus-top-5 maken met lengte en gewicht \u2014 ordenen, vergelijken en opschrijven in \u00e9\u00e9n activiteit.',
    classroomIntegration: 'Het dinosaurusthema integreert in groep 3 met rekenen (vergelijken, ordenen, sommen met kuddes), taal (dinosaurusnamen decoderen, feitjes schrijven), natuur (prehistorie, fossielen, uitsterven) en beeldende vorming (dinosaurustekeningen). Een dinoweek met werkbladen, leesteksten en een klassenmuseum combineert alle vakken, in lijn met de SLO-doelen voor rekenen, taal en ori\u00ebntatie op natuur.',
    assessmentRubric: [
      { skill: 'Vergelijken en ordenen', emerging: 'vergelijkt twee dinosaurussen (groter/kleiner) maar ordent niet zelfstandig', proficient: 'ordent zelfstandig vijf dinosaurussen op lengte en drukt het verschil in getallen uit', advanced: 'ordent op meerdere kenmerken, berekent de verschillen en registreert de gegevens in een tabel' },
      { skill: 'Dinoredactiesommen', emerging: 'leest het verhaal maar stelt de som niet zelfstandig op', proficient: 'vertaalt dinoverhalen correct naar sommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op en formuleert eigen dinoredactiesommen' },
      { skill: 'Dinosaurusnamen lezen en schrijven', emerging: 'leest korte namen (T-rex, Dino) maar hapert bij lange woorden', proficient: 'decodeert zelfstandig meerlettergrepige dinosaurusnamen en schrijft ze correct over', advanced: 'leest vlot lange namen, splitst ze in lettergrepen en schrijft ze uit het geheugen' },
    ],
  },

  easter: {
    seoTitle: 'Pasen-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare pasen-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'pasen groep 3, pasen oefeningen 6\u20137 jaar, pasen oefeningen groep 3, pasen uitprintbaar groep 3, pasen werkbladen groep 3, pasen activiteiten groep 3, pasen leerbladen 6\u20137 jaar, pasen gratis groep 3, pasen PDF groep 3, pasen rekenen groep 3',
    snippetAnswer: 'Pasen-oefeningen voor groep 3 (6\u20137 jaar) combineren het paasthema met optellen en aftrekken tot 20, redactiesommen over paaseieren verdelen, paaswoorden lezen en schrijven en patronen in eidecoraties. Kinderen rekenen met eieren, hazen en mandje. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 biedt het paasthema een seizoensgebonden context die rekenen en taal feestelijk verbindt: zes- en zevenjarigen organiseren mentaal een paaseierenzoektocht waarbij ze eieren tellen, eerlijk verdelen en het resultaat opschrijven. De SLO-leerlijnen voor groep 3 benadrukken rekenen in alledaagse situaties en eerlijk delen als voorbereiding op deelsommen. Redactiesommen over paaseieren \u2014 je vindt 8 eieren in de tuin en 6 in huis, hoeveel heb je bij elkaar? \u2014 oefenen optellen tot 20 in een motiverende context. Het verdelen van eieren over mandjes introduceert het concept van gelijke verdeling. Paaswoorden als paasei, paashaas en kuiken zijn seizoensgebonden decodeermateriaal dat kinderen graag lezen en schrijven. Patronen in eidecoraties \u2014 strepen, stippen, zigzag \u2014 oefenen patroonherkenning. Het schrijven van een paasbrief combineert functioneel schrijven met feestbeleving.',
    developmentalMilestones: [
      { milestone: 'Optellen en aftrekken tot 20 in paascontext (6\u20137-jarigen rekenen met eieren en snoep)', howWeAddress: 'Paasrekenactiviteiten met eieren, mandjes en snoep bieden herhaalde oefening van sommen tot 20 in een feestelijke context' },
      { milestone: 'Eerlijk verdelen van paaseieren (introductie van gelijke verdeling)', howWeAddress: 'Verdeelactiviteiten waarbij kinderen eieren gelijk over mandjes verdelen introduceren delen als eerlijk verdelen' },
      { milestone: 'Paaswoorden lezen en schrijven (seizoensgebonden vocabulaire)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met paaswoorden oefenen het decoderen en schrijven van samengestelde woorden als paasei en paashaas' },
      { milestone: 'Patronen herkennen in decoraties (strepen, stippen, zigzag analyseren)', howWeAddress: 'Decoratieactiviteiten waarbij kinderen patronen op eieren analyseren en voortzetten oefenen patroonherkenning en -productie' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied eenvoudige verdeelactiviteiten met even aantallen, en gebruik paaswoorden met plaatjes als visuele steun. Voor gevorderde kinderen: introduceer sommen tot 20 met ontbrekende termen, laat hen ongelijke verdeling berekenen (hoeveel extra nodig?), en daag hen uit om een paasverhaal te schrijven met redactiesommen erin verwerkt.',
    parentTakeaway: 'Pasen biedt overvloedige rekenkansen in groep 3. Laat uw kind bij de paaseierenzoektocht tellen: hoeveel in de tuin, hoeveel in huis, hoeveel bij elkaar? Verdeel samen de eieren eerlijk: als er 15 eieren zijn voor 3 kinderen, hoeveel krijgt ieder? Laat uw kind na een paaswerkblad een paasbrief schrijven aan oma met daarin hoeveel eieren er gevonden zijn \u2014 rekenen en schrijven in \u00e9\u00e9n feestelijke activiteit.',
    classroomIntegration: 'Het paasthema biedt in groep 3 integratiemogelijkheden: bij rekenen worden eieren geteld, sommen opgelost en eerlijk verdeeld, bij taal worden paaswoorden gelezen en een paasbrief geschreven, bij beeldende vorming worden eieren gedecoreerd met patronen, en bij natuur wordt de lente besproken. Een paasweek met werkbladen en een eierenzoektocht combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Paasrekensommen tot 20', emerging: 'lost optelsommen tot 10 op maar heeft moeite met aftrekken in paascontext', proficient: 'rekent vlot op en af tot 20 met paaseieren en noteert sommen correct', advanced: 'lost meerstaps-redactiesommen op en formuleert eigen paasrekenvragen' },
      { skill: 'Eerlijk verdelen', emerging: 'verdeelt met hulp maar maakt ongelijke groepen', proficient: 'verdeelt zelfstandig eieren gelijk over groepen tot zes en controleert het resultaat', advanced: 'verdeelt snel, berekent hoeveel extra nodig zijn bij ongelijke verdeling en noteert de deelsom' },
      { skill: 'Paaswoorden lezen en schrijven', emerging: 'leest korte paaswoorden (haas, ei) met hulp', proficient: 'leest en schrijft zelfstandig acht tot tien paaswoorden inclusief samenstellingen', advanced: 'schrijft een paasbrief met correcte zinnen en meerdere paaswoorden' },
    ],
  },

  emotions: {
    seoTitle: 'Emoties-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare emoties-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'emoties groep 3, emoties oefeningen 6\u20137 jaar, emoties oefeningen groep 3, emoties uitprintbaar groep 3, emoties werkbladen groep 3, emoties activiteiten groep 3, emoties leerbladen 6\u20137 jaar, emoties gratis groep 3, emoties PDF groep 3, emoties rekenen groep 3',
    snippetAnswer: 'Emoties-oefeningen voor groep 3 (6\u20137 jaar) combineren sociaal-emotioneel leren met optellen en aftrekken tot 20, emotiewoorden lezen en schrijven, redactiesommen over gevoelens en het schrijven van een gevoelsdagboek. Kinderen leren rekenen, lezen en schrijven over wat ze voelen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het emotiethema een brug tussen sociaal-emotionele ontwikkeling en formeel taalonderwijs: zes- en zevenjarigen ontwikkelen een genuanceerder emotioneel vocabulaire en kunnen nu gevoelens beschrijven in zinnen. De SLO-leerlijnen benadrukken zowel mondelinge als schriftelijke taalvaardigheid en sociaal-emotionele competenties als kerndoelen. Emotiewoorden van oplopende complexiteit \u2014 van blij en boos naar teleurgesteld, opgelucht en trots \u2014 zijn uitstekend decodeermateriaal dat tegelijkertijd het emotioneel vocabulaire verrijkt. Redactiesommen in emotionele contexten \u2014 van de 20 kinderen in de klas zijn 12 blij en de rest is verdrietig, hoeveel zijn verdrietig? \u2014 verbinden rekenen met sociaal bewustzijn. Het schrijven van een gevoelsdagboek oefent persoonlijk-expressief schrijven: ik voelde me trots omdat ik de som goed had.',
    developmentalMilestones: [
      { milestone: 'Uitgebreid emotioneel vocabulaire (6\u20137-jarigen benoemen genuanceerde gevoelens)', howWeAddress: 'Woordactiviteiten met emotiewoorden van oplopende complexiteit breiden het vocabulaire uit van basisemoties naar genuanceerde gevoelswoorden' },
      { milestone: 'Rekenen in sociaal-emotionele context (sommen over gevoelens in groepssituaties)', howWeAddress: 'Redactiesommen waarbij kinderen emoties in een groep tellen en berekenen verbinden rekenen met sociaal bewustzijn' },
      { milestone: 'Persoonlijk-expressief schrijven (gevoelens in zinnen beschrijven)', howWeAddress: 'Dagboekactiviteiten waarbij kinderen schrijven over hun gevoelens oefenen zinsbouw met persoonlijke inhoud' },
      { milestone: 'Oorzaak en gevolg bij emoties (begrijpen waarom je iets voelt)', howWeAddress: 'Activiteiten waarbij kinderen de oorzaak van een emotie beschrijven oefenen logisch redeneren en het gebruik van omdat-zinnen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk emotiewoorden tot vijf basisemoties met gezichtsuitdrukkingen als visuele steun, bied schrijfkaders met invulzinnen (ik voel me... omdat...), en gebruik sommen tot 10. Voor gevorderde kinderen: introduceer genuanceerde emotiewoorden als teleurgesteld en opgelucht, laat hen emotionele situaties beschrijven in meerdere zinnen, en daag hen uit met redactiesommen die meerdere emoties combineren.',
    parentTakeaway: 'Emoties bespreken versterkt zowel taal als welzijn in groep 3. Vraag uw kind elke avond: hoe voelde je je vandaag en waarom? Help met het vinden van het juiste woord \u2014 niet alleen blij of boos maar ook trots, opgelucht of teleurgesteld. Na een emotiewerkblad kunt u samen een gevoelsdagboek bijhouden: uw kind schrijft elke dag \u00e9\u00e9n zin over een gevoel. Dit oefent schrijven en verdiept het emotioneel bewustzijn.',
    classroomIntegration: 'Het emotiethema integreert in groep 3 met taal (emotiewoorden lezen en schrijven, gevoelsdagboek bijhouden), rekenen (sommen over emoties in groepssituaties), burgerschap (empathie, conflictoplossing) en drama (emoties uitbeelden). Een emotieproject met werkbladen, kringgesprekken en een klassengevoelsthermometer combineert alle vakken, in lijn met de SLO-doelen voor taal en sociaal-emotionele ontwikkeling.',
    assessmentRubric: [
      { skill: 'Emotiewoorden lezen en schrijven', emerging: 'leest en schrijft drie tot vier basisemotiewoorden met hulp van gezichtjes', proficient: 'leest en schrijft zelfstandig acht tot tien emotiewoorden van wisselende complexiteit', advanced: 'leest vlot genuanceerde emotiewoorden en gebruikt ze correct in beschrijvende zinnen' },
      { skill: 'Rekenen in emotiecontext', emerging: 'telt emoties in een groep maar stelt de som niet zelfstandig op', proficient: 'vertaalt emotiesituaties naar optel- en aftreksommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op en bedenkt eigen emotierekenvragen' },
      { skill: 'Gevoelens beschrijven in zinnen', emerging: 'schrijft losse emotiewoorden maar vormt geen zinnen', proficient: 'schrijft korte zinnen met oorzaak: ik voel me trots omdat ik goed heb gelezen', advanced: 'schrijft uitgebreide dagboekaantekeningen met meerdere gevoelens en oorzaken' },
    ],
  },

  'fairy-tales': {
    seoTitle: 'Sprookjes-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare sprookjes-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'sprookjes groep 3, sprookjes oefeningen 6\u20137 jaar, sprookjes oefeningen groep 3, sprookjes uitprintbaar groep 3, sprookjes werkbladen groep 3, sprookjes activiteiten groep 3, sprookjes leerbladen 6\u20137 jaar, sprookjes gratis groep 3, sprookjes PDF groep 3, sprookjes rekenen groep 3',
    snippetAnswer: 'Sprookjes-oefeningen voor groep 3 (6\u20137 jaar) gebruiken sprookjescontexten voor optellen en aftrekken tot 20, redactiesommen over sprookjesfiguren, sprookjeswoorden lezen en schrijven en verhaalstructuur begrijpen. Kinderen rekenen met draken, prinsessen en tovenaars. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het sprookjesthema een krachtige context voor begrijpend lezen en verhalend schrijven: zes- en zevenjarigen kennen klassieke sprookjes en kunnen nu de verhaalstructuur analyseren \u2014 begin, midden, eind \u2014 en zelf korte verhalen schrijven. De SLO-leerlijnen benadrukken begrijpend lezen en verhalend schrijven als kerndoelen, en sprookjes bieden de meest toegankelijke verhaalstructuur: een held, een probleem, een oplossing. Redactiesommen in sprookjescontext \u2014 de draak bewaakte 15 goudstukken, de ridder nam er 7, hoeveel bleven er? \u2014 combineren begrijpend lezen met rekenen in een fantasierijke setting. Sprookjeswoorden als tovenaar, prinses en betoverd zijn motiverend decodeermateriaal. Het analyseren van sprookjespatronen \u2014 drie wensen, drie broers, drie proeven \u2014 oefent patroonherkenning in een literaire context die het wiskundig denken versterkt.',
    developmentalMilestones: [
      { milestone: 'Verhaalstructuur begrijpen (begin, midden, eind herkennen in sprookjes)', howWeAddress: 'Ordeningsactiviteiten waarbij kinderen sprookjessc\u00e8nes in de juiste volgorde leggen oefenen het begrijpen van narratieve structuur' },
      { milestone: 'Redactiesommen in fantasiecontext (rekenen met sprookjesgetallen tot 20)', howWeAddress: 'Sprookjesredactiesommen met goudstukken, toverdranken en ridders maken rekenen tot een avontuur' },
      { milestone: 'Sprookjeswoorden decoderen (motiverend meerlettergrepig vocabulaire)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met sprookjeswoorden oefenen het decoderen van woorden als tovenaar, betoverd en drakenei' },
      { milestone: 'Verhalend schrijven met structuur (een eigen sprookje schrijven)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een kort sprookje schrijven met begin, midden en eind oefenen verhalend schrijven met structuur' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied sprookjeswoorden aan met plaatjes, en geef schrijfkaders met een voorgestructureerd begin-midden-eind. Voor gevorderde kinderen: introduceer sommen tot 20 met meerdere stappen, laat hen een eigen sprookje schrijven met dialoog, en daag hen uit met het analyseren van sprookjespatronen (het getal drie in sprookjes).',
    parentTakeaway: 'Sprookjes zijn de perfecte leescontext voor groep 3. Lees samen een sprookje en bespreek de structuur: wie is de held, wat is het probleem, hoe wordt het opgelost? Stel rekenvragen: als Roodkapje 12 koekjes meeneemt en 5 aan de wolf geeft, hoeveel heeft ze nog? Laat uw kind na een sprookjeswerkblad een eigen kort sprookje schrijven of het einde van een bestaand sprookje veranderen \u2014 dit oefent verhalend schrijven en creatief denken.',
    classroomIntegration: 'Het sprookjesthema integreert in groep 3 met taal (sprookjes lezen, woorden decoderen, eigen sprookjes schrijven), rekenen (redactiesommen in sprookjescontext, het getal drie als patroon), drama (sprookjes naspelen) en beeldende vorming (sprookjesillustraties maken). Een sprookjesweek met werkbladen, voorlezen en een schrijfproject combineert alle vakken, in lijn met de SLO-doelen voor taal en rekenen.',
    assessmentRubric: [
      { skill: 'Verhaalstructuur begrijpen', emerging: 'benoemt \u00e9\u00e9n element (het begin) maar herkent midden en eind niet zelfstandig', proficient: 'herkent en beschrijft zelfstandig begin, midden en eind van een sprookje', advanced: 'analyseert de verhaalstructuur, herkent sprookjespatronen en vergelijkt twee sprookjes' },
      { skill: 'Sprookjesredactiesommen', emerging: 'leest het verhaal maar heeft hulp nodig bij het opstellen van de som', proficient: 'vertaalt sprookjesverhalen correct naar sommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op en bedenkt eigen sprookjesredactiesommen met correcte structuur' },
      { skill: 'Sprookjeswoorden lezen en schrijven', emerging: 'leest korte woorden (fee, draak) maar hapert bij langere sprookjeswoorden', proficient: 'decodeert zelfstandig meerlettergrepige sprookjeswoorden en schrijft ze correct', advanced: 'leest vlot alle sprookjeswoorden en gebruikt ze in eigen geschreven sprookjes' },
    ],
  },

  farm: {
    seoTitle: 'Boerderij-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare boerderij-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'boerderij groep 3, boerderij oefeningen 6\u20137 jaar, boerderij oefeningen groep 3, boerderij uitprintbaar groep 3, boerderij werkbladen groep 3, boerderij activiteiten groep 3, boerderij leerbladen 6\u20137 jaar, boerderij gratis groep 3, boerderij PDF groep 3, boerderij rekenen groep 3',
    snippetAnswer: 'Boerderij-oefeningen voor groep 3 (6\u20137 jaar) gebruiken het boerderijleven voor optellen en aftrekken tot 20, redactiesommen over dieren en oogst, boerderijwoorden lezen en schrijven en eerlijk verdelen van producten. Kinderen rekenen met koeien, kippen en appels. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het boerderijthema een veelzijdig leerplatform voor rekenen en taal in een herkenbare context: zes- en zevenjarigen begrijpen het concept van productie en verdeling en kunnen nu rekenproblemen oplossen die op een echte boerderij voorkomen. De SLO-leerlijnen benadrukken rekenen in alledaagse situaties en de boerderij biedt de meest concrete context: hoeveel eieren leggen de kippen per dag, hoeveel dozen van 6 kun je vullen? Dit introduceert herhaald optellen als voorbereiding op vermenigvuldiging. Redactiesommen over de boerderij oefenen optellen en aftrekken tot 20 met dieren, fruit en groenten. Boerderijwoorden als tractor, schuur, hooiberg en melkmachine zijn uitdagend samengesteld decodeermateriaal. Het schrijven van een boerderijverslag oefent informatief schrijven met feiten en structuur.',
    developmentalMilestones: [
      { milestone: 'Herhaald optellen als voorbereiding op vermenigvuldiging (6\u20137-jarigen tellen groepen gelijk)', howWeAddress: 'Boerderijactiviteiten waarbij kinderen eieren per doos, appels per kist tellen oefenen het concept van gelijke groepen als basis voor vermenigvuldiging' },
      { milestone: 'Redactiesommen met boerderijcontext (rekenen met dieren en oogst)', howWeAddress: 'Boerderijverhaaltjes met optel- en aftreksituaties oefenen het vertalen van een praktische landbouwsituatie naar een rekenbewerking' },
      { milestone: 'Boerderijwoorden decoderen en schrijven (samengestelde woorden ontleden)', howWeAddress: 'Woordactiviteiten met boerderijwoorden oefenen het ontleden van samenstellingen als melkmachine en hooiwagen in herkenbare delen' },
      { milestone: 'Informatief schrijven over de boerderij (feitjes in zinnen opschrijven)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een boerderijverslag schrijven oefenen het structureren van feitelijke informatie in zinnen' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied boerderijwoorden aan met plaatjes en een woordenbank, en gebruik verdeelactiviteiten met kleine aantallen. Voor gevorderde kinderen: introduceer herhaald optellen tot 20 (3 kisten van 5 appels), laat hen een boerderijverslag schrijven met meerdere alinea\u2019s, en daag hen uit met meerstaps-sommen over de boerderijproductie.',
    parentTakeaway: 'De boerderij biedt rijke rekenkansen voor groep 3. Bezoek samen een kinderboerderij en tel de dieren per soort: hoeveel kippen, hoeveel koeien, hoeveel bij elkaar? Koop samen eieren en bereken: als er 6 eieren in een doos zitten en we kopen 2 dozen, hoeveel eieren zijn dat? Na een boerderijwerkblad kunt u samen een boerderijdagboek bijhouden met feiten over wat een boer allemaal doet \u2014 dit combineert rekenen, schrijven en natuurkennis.',
    classroomIntegration: 'Het boerderijthema integreert in groep 3 met rekenen (sommen met dieren en oogst, herhaald optellen, verdelen), taal (boerderijwoorden lezen, een boerderijverslag schrijven), natuur (waar komt ons voedsel vandaan, seizoenen op de boerderij) en aardrijkskunde (platteland versus stad). Een boerderijbezoek met werkbladen en een schrijfproject combineert alle vakken, in lijn met de SLO-doelen.',
    assessmentRubric: [
      { skill: 'Boerderijredactiesommen', emerging: 'leest het verhaal maar stelt de som niet zelfstandig op', proficient: 'vertaalt boerderijverhaaltjes correct naar sommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op met herhaald optellen en bedenkt eigen boerderijsommen' },
      { skill: 'Herhaald optellen', emerging: 'telt objecten \u00e9\u00e9n voor \u00e9\u00e9n in plaats van in groepen', proficient: 'telt zelfstandig in groepen van 2, 5 of 10 en noteert het totaal', advanced: 'telt vlot in groepen, herkent het verband met vermenigvuldiging en noteert het als herhaalde optelling' },
      { skill: 'Boerderijwoorden lezen en schrijven', emerging: 'leest korte woorden (koe, kip) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien boerderijwoorden correct inclusief samenstellingen', advanced: 'leest vlot alle boerderijwoorden en schrijft een informatief boerderijverslag' },
    ],
  },

  flowers: {
    seoTitle: 'Bloemen-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare bloemen-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'bloemen groep 3, bloemen oefeningen 6\u20137 jaar, bloemen oefeningen groep 3, bloemen uitprintbaar groep 3, bloemen werkbladen groep 3, bloemen activiteiten groep 3, bloemen leerbladen 6\u20137 jaar, bloemen gratis groep 3, bloemen PDF groep 3, bloemen rekenen groep 3',
    snippetAnswer: 'Bloemen-oefeningen voor groep 3 (6\u20137 jaar) gebruiken het bloementhema voor optellen en aftrekken tot 20, redactiesommen over blaadjes en vazen, bloemnamen lezen en schrijven en symmetrie in bloemen. Kinderen rekenen met tulpen, rozen en zonnebloemen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het bloementhema een wetenschappelijk gestructureerde context voor rekenen en natuur: zes- en zevenjarigen kunnen bloemdelen benoemen, blaadjes tellen en groeiprocessen beschrijven in zinnen. De SLO-leerlijnen benadrukken systematisch observeren en rekenen in natuurcontexten. Redactiesommen over bloemen \u2014 een tulp heeft 6 blaadjes, een roos heeft 5, hoeveel blaadjes zijn dat samen? \u2014 verbinden rekenen met natuurobservatie. Symmetrie in bloemen \u2014 een madeliefje als stervorm, een tulp als spiegelvorm \u2014 biedt een visuele ingang voor meetkunde. Bloemnamen van wisselende lengte (roos, tulp, zonnebloem, chrysant) zijn uitdagend decodeermateriaal. Het schrijven van een groeiverslag oefent informatief schrijven met chronologie: eerst zaaide ik, toen sproetten de zaadjes, daarna bloeiden de bloemen.',
    developmentalMilestones: [
      { milestone: 'Rekenen met natuurlijke aantallen (blaadjes, bloemen per vaas, zaden per pot)', howWeAddress: 'Bloemenrekenactiviteiten met blaadjes en vazen bieden concrete context voor optellen en aftrekken tot 20' },
      { milestone: 'Symmetrie herkennen in bloemen (spiegellijnen in bloembladeren en -vormen)', howWeAddress: 'Symmetrieactiviteiten met bloemen laten kinderen de spiegellijn vinden en symmetrische bloemen tekenen of aanvullen' },
      { milestone: 'Bloemnamen decoderen en schrijven (van kort tot meerlettergrepig)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met bloemnamen oefenen het decoderen van korte (roos, lelie) tot lange woorden (zonnebloem, chrysant)' },
      { milestone: 'Informatief schrijven over groeiprocessen (observaties in zinnen vastleggen)', howWeAddress: 'Groeiverslag-activiteiten waarbij kinderen het groeiproces van een bloem beschrijven oefenen chronologisch informatief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied bloemnamen aan met afbeeldingen, en gebruik eenvoudige symmetrieopdrachten met een duidelijke hulplijn. Voor gevorderde kinderen: introduceer sommen met meerdere bloemen en vazen, laat hen een uitgebreid groeiverslag schrijven met metingen, en daag hen uit met complexe symmetrietekeningen van bloemen.',
    parentTakeaway: 'Bloemen bieden prachtige rekenkansen voor groep 3. Tel samen de blaadjes van een bloem: een tulp heeft zes blaadjes, een madeliefje veel meer \u2014 hoeveel verschil? Plant samen een zaakje en laat uw kind de groei wekelijks meten en opschrijven. Na een bloemenwerkblad kunt u samen een vaas vullen en rekenen: als er 5 tulpen en 8 narcissen in de vaas staan, hoeveel bloemen zijn dat bij elkaar?',
    classroomIntegration: 'Het bloementhema integreert in groep 3 met rekenen (sommen met blaadjes en vazen, symmetrie), taal (bloemnamen lezen, een groeiverslag schrijven), natuur (bloemdelen, groeicyclus, seizoenen) en beeldende vorming (bloemen tekenen en schilderen). Een bloemenproject met een klassentuin, meetkaarten en werkbladen combineert alle vakken, in lijn met de SLO-doelen voor rekenen, taal en natuur.',
    assessmentRubric: [
      { skill: 'Bloemenrekensommen', emerging: 'telt blaadjes maar combineert aantallen niet zelfstandig tot 20', proficient: 'lost bloemenredactiesommen tot 20 correct op en noteert de bewerking', advanced: 'lost meerstaps-sommen op en formuleert eigen bloemenrekenvragen' },
      { skill: 'Symmetrie in bloemen', emerging: 'herkent symmetrie met hulp maar tekent de spiegelhelft niet nauwkeurig', proficient: 'vindt zelfstandig de spiegellijn en voltooit een symmetrische bloementekening', advanced: 'ontwerpt eigen symmetrische bloemen en legt het symmetrieconcept uit in zinnen' },
      { skill: 'Bloemnamen lezen en schrijven', emerging: 'leest korte bloemnamen (roos, lelie) maar hapert bij langere woorden', proficient: 'leest en schrijft acht tot tien bloemnamen correct inclusief samenstellingen als zonnebloem', advanced: 'leest vlot alle bloemnamen en schrijft een informatief groeiverslag' },
    ],
  },

  food: {
    seoTitle: 'Eten-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare eten-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'eten groep 3, eten oefeningen 6\u20137 jaar, eten oefeningen groep 3, eten uitprintbaar groep 3, eten werkbladen groep 3, eten activiteiten groep 3, eten leerbladen 6\u20137 jaar, eten gratis groep 3, eten PDF groep 3, eten rekenen groep 3',
    snippetAnswer: 'Eten-oefeningen voor groep 3 (6\u20137 jaar) combineren voedselcontexten met optellen en aftrekken tot 20, redactiesommen over boodschappen, voedselwoorden lezen en schrijven en classificatie op voedselgroep. Kinderen rekenen met brood, groenten en fruit bij de winkel. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het etenthema een praktisch leerplatform voor rekenen met geld en gezondheidsonderwijs: zes- en zevenjarigen begrijpen het concept van boodschappen doen en kunnen prijzen optellen, wisselgeld berekenen en een boodschappenlijst schrijven. De SLO-leerlijnen benadrukken rekenen met geld en gezonde voeding als kerndoelen, en het etenthema combineert beide. Redactiesommen over de supermarkt \u2014 een brood kost 3 euro en kaas 5 euro, hoeveel betaal je? \u2014 oefenen optellen met geld. Classificatie op voedselgroep (groenten, fruit, zuivel, granen) bouwt wetenschappelijk denken op. Voedselwoorden van wisselende lengte zijn uitdagend decodeermateriaal, en het schrijven van een boodschappenlijst of menu oefent functioneel schrijven met een echt doel.',
    developmentalMilestones: [
      { milestone: 'Rekenen met geld in voedselcontext (6\u20137-jarigen optellen en aftrekken met eurobedragen)', howWeAddress: 'Supermarkt-activiteiten waarbij kinderen voedselprijzen optellen en wisselgeld berekenen oefenen rekenen met geld in een dagelijkse context' },
      { milestone: 'Classificatie op voedselgroep (groenten, fruit, zuivel, granen onderscheiden)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen voedsel indelen in de juiste voedselgroep en hun keuze toelichten' },
      { milestone: 'Voedselwoorden decoderen en schrijven (van kort tot samengesteld)', howWeAddress: 'Woordzoek- en kruiswoordactiviteiten met voedselwoorden oefenen het decoderen van korte (brood, kaas) tot samengestelde woorden (aardappel, sinaasappel)' },
      { milestone: 'Functioneel schrijven (boodschappenlijst, menu samenstellen)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een boodschappenlijst of menu schrijven oefenen functioneel taalgebruik met hoeveelheden en productwoorden' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk geldsommen tot hele euro\u2019s onder 10, bied voedselwoorden aan met plaatjes, en gebruik classificatie met drie voedselgroepen. Voor gevorderde kinderen: introduceer sommen met euro\u2019s en centen, laat hen een weekmenu samenstellen met berekende kosten, en daag hen uit om een recept te schrijven met ingredi\u00ebntenlijst.',
    parentTakeaway: 'Boodschappen doen is de leukste rekenles voor groep 3. Geef uw kind een budget van 10 euro en laat het zelf kiezen: past het brood \u00e9n de kaas binnen het budget? Hoeveel wisselgeld krijg je terug? Laat uw kind de boodschappenlijst schrijven en afvinken in de winkel. Na een etenwerkblad kunt u samen een weekmenu bedenken en de ingredi\u00ebnten opschrijven \u2014 dit combineert rekenen, schrijven en gezonde voeding.',
    classroomIntegration: 'Het etenthema integreert in groep 3 met rekenen (geldsommen, hoeveelheden, verdelen), taal (voedselwoorden lezen, boodschappenlijst schrijven), gezondheid (voedselgroepen, de schijf van vijf) en wereldori\u00ebntatie (waar komt ons voedsel vandaan). Een supermarkthoek met prijskaartjes en speelgeld combineert werkbladen met rollenspel, in lijn met de SLO-doelen voor rekenen, taal en gezondheid.',
    assessmentRubric: [
      { skill: 'Rekenen met voedselprijzen', emerging: 'telt twee prijzen op tot 10 euro met hulp maar berekent geen wisselgeld', proficient: 'telt prijzen op tot 20 euro en berekent wisselgeld correct', advanced: 'berekent een boodschappenbudget met meerdere producten en vergelijkt totalen' },
      { skill: 'Voedselclassificatie', emerging: 'sorteert voedsel op \u00e9\u00e9n kenmerk met hulp', proficient: 'classificeert zelfstandig voedsel in vier voedselgroepen en benoemt ze', advanced: 'classificeert voedsel, legt de gezondheidswaarde uit en stelt een gebalanceerd menu samen' },
      { skill: 'Voedselwoorden lezen en schrijven', emerging: 'leest korte voedselwoorden (brood, kaas) maar hapert bij langere woorden', proficient: 'leest en schrijft acht tot tien voedselwoorden correct inclusief samenstellingen', advanced: 'schrijft een boodschappenlijst of menu met correcte woorden en hoeveelheden' },
    ],
  },

  forest: {
    seoTitle: 'Bos-oefeningen Groep 3 | LessonCraftStudio',
    seoDescription: 'Uitprintbare bos-oefeningen voor groep 3 (6\u20137 jaar). Optellen en aftrekken tot 20, lezen, schrijven en redactiesommen. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'bos groep 3, bos oefeningen 6\u20137 jaar, bos oefeningen groep 3, bos uitprintbaar groep 3, bos werkbladen groep 3, bos activiteiten groep 3, bos leerbladen 6\u20137 jaar, bos gratis groep 3, bos PDF groep 3, bos rekenen groep 3',
    snippetAnswer: 'Bos-oefeningen voor groep 3 (6\u20137 jaar) gebruiken het bos als context voor optellen en aftrekken tot 20, redactiesommen over bosdieren en bomen, boswoorden lezen en schrijven en meten van boomhoogtes. Kinderen rekenen, lezen en schrijven in een groene natuuromgeving. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'In groep 3 wordt het bosthema een rijke leeromgeving voor rekenen, taal en natuuronderwijs: zes- en zevenjarigen kunnen het bos niet alleen verkennen maar ook systematisch observeren, gegevens registreren en bevindingen opschrijven. De SLO-leerlijnen benadrukken systematisch observeren, meten en informatief schrijven als kerndoelen, en het bos biedt een onuitputtelijke context. Redactiesommen over het bos \u2014 in het bos staan 13 eiken en 7 berken, hoeveel bomen bij elkaar? \u2014 verbinden rekenen met natuurkennis. Het meten van boomstamomtrekken en schattend meten van boomhoogtes oefenen meetvaardigheden. Boswoorden als paddenstoel, eikenhout, dennenboom en boswachter zijn uitdagend samengesteld decodeermateriaal. Het schrijven van een bosverslag na een wandeling oefent informatief schrijven: wat zag je, hoeveel telde je, wat vond je bijzonder?',
    developmentalMilestones: [
      { milestone: 'Meten en schatten in de natuur (6\u20137-jarigen meten boomstammen en schatten hoogtes)', howWeAddress: 'Meetactiviteiten waarbij kinderen boomstamomtrekken meten en boomhoogtes schatten oefenen meten in een authentieke buitencontext' },
      { milestone: 'Redactiesommen met boscontext (rekenen met bomen, dieren en bladeren)', howWeAddress: 'Bosverhaal-sommen met optel- en aftreksituaties oefenen het vertalen van natuurobservaties naar rekenbeweringen' },
      { milestone: 'Boswoorden decoderen en schrijven (samengestelde natuurwoorden ontleden)', howWeAddress: 'Woordactiviteiten met boswoorden oefenen het ontleden van samenstellingen als paddenstoel, eikenboom en boswachter' },
      { milestone: 'Informatief schrijven over natuurobservaties (een bosverslag met feiten)', howWeAddress: 'Schrijfopdrachten waarbij kinderen een bosverslag schrijven met observaties, aantallen en beschrijvingen oefenen informatief schrijven' },
    ],
    differentiationNotes: 'Voor kinderen die extra ondersteuning nodig hebben: beperk sommen tot optellen tot 10, bied boswoorden aan met plaatjes en een woordenbank, en gebruik meetopdrachten met vergelijken (dikker/dunner). Voor gevorderde kinderen: introduceer sommen tot 20 met meerdere boomsoorten, laat hen een uitgebreid bosverslag schrijven met meetresultaten in een tabel, en daag hen uit met classificatie van bomen op bladtype en grootte.',
    parentTakeaway: 'Een boswandeling is de beste rekenles voor groep 3. Tel samen de bomen langs het pad: hoeveel eiken, hoeveel berken, hoeveel bij elkaar? Meet samen de omtrek van een boomstam met een meetlint \u2014 welke boom is het dikst? Verzamel bladeren en sorteer ze op grootte en vorm. Laat uw kind na een boswerkblad een bosverslag schrijven: wat zag je, hoeveel telde je, wat was het bijzonderst? Dit combineert rekenen, schrijven en natuurervaring.',
    classroomIntegration: 'Het bosthema integreert in groep 3 met rekenen (sommen met bomen en dieren, meten van stammen), taal (boswoorden lezen, een bosverslag schrijven), natuur (boomsoorten, bosdieren, seizoenen in het bos) en bewegingsonderwijs (een boswandeling als buitenles). Een bosproject met een excursie, werkbladen en een schrijfopdracht combineert alle vakken, in lijn met de SLO-doelen voor rekenen, taal en natuur.',
    assessmentRubric: [
      { skill: 'Meten in het bos', emerging: 'vergelijkt twee boomstammen (dikker/dunner) maar meet niet zelfstandig', proficient: 'meet boomstamomtrekken correct met een meetlint en noteert het resultaat in centimeters', advanced: 'meet meerdere bomen, vergelijkt de metingen in een tabel en schat boomhoogtes' },
      { skill: 'Bosredactiesommen', emerging: 'leest het verhaal maar stelt de som niet zelfstandig op', proficient: 'vertaalt bosverhalen correct naar sommen tot 20 en noteert het antwoord', advanced: 'lost meerstaps-sommen op en formuleert eigen bosredactiesommen met correcte structuur' },
      { skill: 'Boswoorden lezen en schrijven', emerging: 'leest korte boswoorden (bos, boom) maar hapert bij samengestelde woorden', proficient: 'leest en schrijft acht tot tien boswoorden correct inclusief samenstellingen als paddenstoel', advanced: 'leest vlot alle boswoorden en schrijft een informatief bosverslag met correcte zinnen' },
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
process.exit(errorCount > 0 ? 1 : 0);
