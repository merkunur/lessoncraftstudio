#!/usr/bin/env node
/**
 * SEO Part 318: NL Preschool Grade Enrichment — Themes 1-19
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the preschool grade block of 19 NL theme files (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    seoTitle: 'Alfabet-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare alfabet-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'alfabet kleuterschool, alfabet oefeningen 3\u20134 jaar, alfabet oefeningen kleuterschool, alfabet uitprintbaar kleuterschool, alfabet werkbladen kleuterschool, alfabet activiteiten kleuterschool, alfabet leerbladen 3\u20134 jaar, alfabet gratis kleuterschool, alfabet PDF kleuterschool, alfabet kleuren',
    snippetAnswer: 'Alfabet-oefeningen voor de kleuterschool (3\u20134 jaar) introduceren lettervormen door middel van overtrekken, kleuren en letter-plaatje koppeling. Grote lettercontouren en herkenbare voorwerpen als ankerbeelden bouwen fonemisch bewustzijn en visuele herkenning op. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het alfabetthema is het absolute startpunt voor geletterdheid bij kleuters, omdat drie- en vierjarigen zich in het begin van de gevoelige periode voor letterherkenning bevinden \u2014 ze beginnen letters te onderscheiden van andere symbolen in hun omgeving en raken ge\u00efnteresseerd in het herkennen van de eerste letter van hun eigen naam. Deze natuurlijke nieuwsgierigheid is pedagogisch goud dat werkbladen systematisch kunnen verdiepen. Het Nederlandse alfabet heeft zesentwintig letters, en het is bijzonder belangrijk om vroeg te beginnen met herkenning. De SLO-leerlijnen voor taal benadrukken taalstimulering, en alfabetoefeningen vervullen dit wanneer het kind een visueel teken verbindt met een klank en een bekend woord. Overtrekken ontwikkelt tegelijkertijd fijne motoriek en spiergeheugen voor lettervorming.',
    developmentalMilestones: [
      { milestone: 'Visuele discriminatie van lettervormen (3\u20134-jarigen beginnen verschil te zien tussen letters en andere symbolen)', howWeAddress: 'Letterherkennings- en koppelactiviteiten waarbij grote letters duidelijk worden gepresenteerd met herkenbare voorwerpen als ankerbeelden' },
      { milestone: 'Koppeling tussen beginletter en voorwerp (kleuters leren dat woorden met bepaalde letters beginnen)', howWeAddress: 'Plaatje-letterkoppeling (A = aap, K = kat) bouwt fonemisch bewustzijn op door visuele ankers' },
      { milestone: 'Overtrekken van lettervormen (overgang van vrij tekenen naar geleide vorming)', howWeAddress: 'Stippellijn-overtrekbladen met grote letters begeleiden de hand en ontwikkelen fijne motoriek als voorbereiding op schrijven' },
      { milestone: 'Herkenning van letters in de eigen naam (kleuters zijn bijzonder ge\u00efnteresseerd in hun naamletters)', howWeAddress: 'Letteractiviteiten die aanmoedigen om bekende letters in verschillende contexten te zoeken benutten de emotionele band met de eigen naam' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: begin met drie of vier letters die persoonlijk betekenisvol zijn (letters uit de eigen naam), gebruik zand of klei voor een fysieke ervaring van lettervormen, en koppel elke letter aan een concreet voorwerp. Voor gevorderde kleuters: breid het letteraanbod uit, introduceer de koppeling tussen hoofdletters en kleine letters, en daag hen uit om beginletters te zoeken in boeken en de omgeving.',
    parentTakeaway: 'De belangrijkste taak voor ouders bij het leren van letters is om letters zichtbaar te maken in het dagelijks leven. Wijs samen letters aan op winkelborden, bushokjes en voedselverpakkingen. Begin met de naamletters van uw kind \u2014 die zijn de emotionele toegangspoort tot de alfabetwereld. Eis niet alle letters tegelijk; op kleuterleeftijd is het genoeg dat het kind er een paar herkent en er plezier in heeft om ze te zoeken. Elke avond voorlezen is de beste alfabetoefening.',
    classroomIntegration: 'Het alfabetthema loopt door het hele kleuterschooljaar: in een letter-van-de-week aanpak krijgt elke letter zijn eigen week waarin hij opduikt in de kring, werkhoeken, het tussendoortje en creatieve activiteiten. Alfabetwerkbladen worden gebruikt bij zelfstandig werken, letterliedjes in de kring en een letterjacht in het klaslokaal als observatieopdracht. Deze multisensorische aanpak sluit aan bij de SLO-doelen voor taalbewustzijn en vroege geletterdheid.',
    assessmentRubric: [
      { skill: 'Letterherkenning', emerging: 'herkent 2\u20134 letters (eigen naamletters) met hulp van een volwassene', proficient: 'herkent zelfstandig 8\u201312 hoofdletters en kan ze benoemen', advanced: 'herkent de meeste hoofdletters, koppelt ze aan beginletters in woorden en probeert te schrijven' },
      { skill: 'Beginletterkoppeling', emerging: 'koppelt 1\u20132 beginletters aan bekende voorwerpen met hulp van een volwassene', proficient: 'koppelt zelfstandig 4\u20136 beginletters aan de juiste voorwerpen', advanced: 'koppelt 8+ beginletters en vindt zelf nieuwe voorbeelden voor elke letter' },
      { skill: 'Lettervormen overtrekken', emerging: 'trekt 2\u20133 letters over op stippellijnen herkenbaar', proficient: 'trekt 6\u20138 letters duidelijk over met de juiste streekrichting', advanced: 'schrijft meerdere letters zelfstandig zonder voorbeeld en vormt korte woorden' },
    ],
  },

  animals: {
    seoTitle: 'Dieren-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare dieren-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dieren kleuterschool, dieren oefeningen 3\u20134 jaar, dieren oefeningen kleuterschool, dieren uitprintbaar kleuterschool, dieren werkbladen kleuterschool, dieren activiteiten kleuterschool, dieren leerbladen 3\u20134 jaar, dieren gratis kleuterschool, dieren PDF kleuterschool, dieren kleuren',
    snippetAnswer: 'Dieren-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken kleuren, tellen en koppelen met dierenafbeeldingen om fijne motoriek, getalherkenning en categorisering te versterken. De natuurlijke dierenfascinatie van kinderen drijft de motivatie. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het dierenthema is een van de krachtigste thema\u2019s voor kleuters, omdat drie- en vierjarigen een aangeboren fascinatie voor dieren hebben die als emotionele motor voor leren werkt. Kinderen in deze leeftijdsgroep beginnen de wereld om zich heen te categoriseren \u2014 grote dieren tegenover kleine dieren, dieren met vacht tegenover veren \u2014 en dit natuurlijke sorteervermogen is een cognitieve mijlpaal die dierenwerkbladen systematisch kunnen versterken. Het kleuren van dierenafbeeldingen met dikke contouren traint fijne motoriek, terwijl het tellen van dieren in een sc\u00e8ne \u00e9\u00e9n-op-\u00e9\u00e9n-correspondentie opbouwt. De SLO-leerlijnen benadrukken het verkennen van natuur en levende wezens, en dit doel wordt direct vervuld wanneer kleuters via gestructureerde activiteiten over dieren leren.',
    developmentalMilestones: [
      { milestone: 'Categorisch denken (3\u20134-jarigen beginnen voorwerpen op \u00e9\u00e9n eigenschap te sorteren)', howWeAddress: 'Sorteeractiviteiten met beeldsortering waarbij kinderen dieren groeperen op eigenschappen zoals vacht/veren of poten/vleugels' },
      { milestone: 'Tellen van kleine hoeveelheden (kleuters bouwen \u00e9\u00e9n-op-\u00e9\u00e9n-correspondentie op tot 10)', howWeAddress: 'Zoek-en-tel-activiteiten waarbij kinderen specifieke dieren in een sc\u00e8ne tellen en koppelen aan het juiste cijfer' },
      { milestone: 'Visuele discriminatie (kinderen leren verschillen zien tussen vergelijkbare vormen)', howWeAddress: 'Schaduwkoppeling met dierensilhouetten verscherpt het observatievermogen dat zowel leesvaardigheid als natuurkennis ondersteunt' },
      { milestone: 'Fijnmotorische controle (overgang van hele-arm naar polsgestuurde controle)', howWeAddress: 'Kleurplaten met dierenmotieven en dikke contouren ondersteunen de greepontwikkeling en hand-oogco\u00f6rdinatie' },
    ],
    differentiationNotes: 'Voor kleuters die ondersteuning nodig hebben: beperk tot drie of vier bekende dieren per activiteit, gebruik plastic speelgoeddieren als fysiek aanvulling op het werkblad, en richt u op \u00e9\u00e9n vaardigheid tegelijk (alleen tellen of alleen koppelen). Voor gevorderde kleuters: breid uit met meer dierencategorie\u00ebn, introduceer eenvoudige natuurwetenschappelijke classificatie en voeg letterovertrekken van dierennamen toe.',
    parentTakeaway: 'Dieren zijn een natuurlijke ingang tot leren voor jonge kinderen. Benut de diereninteresse van uw kind thuis door dieren te tellen in prentenboeken, knuffels te sorteren op grootte en kleur, en te praten over waar verschillende dieren wonen. Bezoeken aan kinderboerderijen of dierentuinen bieden eerstehandservaringen die versterken wat uw kind op de werkbladen leert. Laat uw kind zijn favoriete dier kiezen als uitgangspunt \u2014 de motivatie komt van binnenuit.',
    classroomIntegration: 'Het dierenthema past perfect in de weekroutines van de kleuterschool: in de kring wordt het dier van de week ge\u00efntroduceerd met afbeeldingen en geluiden, bij werkhoeken wordt gewerkt met kleur- en telbladen, in het vrije spel worden plastic dieren gebruikt voor rollenspel, en op natuuruitstapjes wordt gezocht naar insecten en vogels. Deze integratie over activiteiten heen ondersteunt de SLO-doelen voor zowel natuurverkenning als taalontwikkeling.',
    assessmentRubric: [
      { skill: 'Categorisering van dieren', emerging: 'sorteert dieren in twee groepen met hulp van een volwassene (bijv. groot/klein)', proficient: 'sorteert zelfstandig dieren op twee eigenschappen (leefomgeving, lichaamsbedekking)', advanced: 'vindt eigen sorteercriteria en legt uit waarom de dieren bij de groep horen' },
      { skill: 'Tellen van dieren', emerging: 'telt 1\u20135 dieren met \u00e9\u00e9n-op-\u00e9\u00e9n aanwijzing met hulp van een volwassene', proficient: 'telt zelfstandig tot 10 dieren en koppelt aan het juiste cijfer', advanced: 'telt boven de 10 en vergelijkt hoeveelheden (meer/minder)' },
      { skill: 'Visuele discriminatie (dierensilhouetten)', emerging: 'koppelt 2\u20133 dierensilhouetten met hulp van een volwassene', proficient: 'koppelt zelfstandig 5\u20136 silhouetten aan het juiste dier', advanced: 'koppelt complexe silhouetten en beschrijft welke kenmerken het dier verraden' },
    ],
  },

  birds: {
    seoTitle: 'Vogels-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare vogels-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'vogels kleuterschool, vogels oefeningen 3\u20134 jaar, vogels oefeningen kleuterschool, vogels uitprintbaar kleuterschool, vogels werkbladen kleuterschool, vogels activiteiten kleuterschool, vogels leerbladen 3\u20134 jaar, vogels gratis kleuterschool, vogels PDF kleuterschool, vogels kleuren',
    snippetAnswer: 'Vogels-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken kleurplaten, telactiviteiten en koppelspellen met vogelafbeeldingen om fijne motoriek, getalherkenning en observatievermogen te ontwikkelen. Vogels in de tuin bieden dagelijkse herkenningskansen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Vogels zijn een bijzonder geschikt thema voor kleuters omdat drie- en vierjarigen ze dagelijks in hun directe omgeving tegenkomen \u2014 in de tuin, op het schoolplein en in het park. Deze alledaagse waarnemingen vormen een krachtig pedagogisch anker: het kind kan de vogel op het werkblad koppelen aan een echte observatie. Kleuters beginnen in deze fase kenmerken te vergelijken (grote vogels versus kleine vogels, kleurrijke versus bruine) en ontwikkelen zo hun categoriseringsvermogen. Het kleuren van vogelafbeeldingen traint de fijne motoriek, terwijl het tellen van vogels in een boom het getalbegrip versterkt. De SLO-leerlijnen voor natuur en techniek benadrukken het waarnemen en benoemen van dieren in de directe omgeving, en vogelwerkbladen vervullen dit doel op een gestructureerde manier.',
    developmentalMilestones: [
      { milestone: 'Waarneming van dieren in de omgeving (3\u20134-jarigen leren bewust kijken naar natuur)', howWeAddress: 'Vogelherkenningsactiviteiten die bekende tuinvogels presenteren koppelen werkbladoefening aan dagelijkse waarnemingen' },
      { milestone: 'Vergelijken van kenmerken (kleuters beginnen objecten op \u00e9\u00e9n eigenschap te vergelijken)', howWeAddress: 'Koppelactiviteiten waarbij vogels worden gesorteerd op grootte, kleur of snavelvorm stimuleren vergelijkend denken' },
      { milestone: 'Tellen van voorwerpen in een afbeelding (opbouw van \u00e9\u00e9n-op-\u00e9\u00e9n-correspondentie)', howWeAddress: 'Tel-de-vogels activiteiten waarbij kinderen vogels in een boom of op een hek tellen en het juiste cijfer omcirkelen' },
      { milestone: 'Fijnmotorische controle bij kleuren (verfijning van greep en drukcontrole)', howWeAddress: 'Kleurplaten met vogelcontouren van toenemende complexiteit ondersteunen de overgang van grove naar precieze motoriek' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot drie of vier herkenbare vogels (mus, duif, eend, roodborstje), gebruik grote kleurplaten met dikke lijnen, en richt u op \u00e9\u00e9n vaardigheid per sessie. Voor gevorderde kleuters: introduceer minder bekende vogels, voeg beginletters van vogelnamen toe aan de activiteiten, en laat kinderen vogels sorteren op meerdere kenmerken tegelijk.',
    parentTakeaway: 'Vogels bieden een unieke leermogelijkheid omdat ze overal zichtbaar zijn. Hang een vogelvoederhuisje op bij het keukenraam en tel samen met uw kind hoeveel vogels er komen eten. Benoem de vogels die u ziet tijdens wandelingen \u2014 de mus, de merel, de duif. Na het invullen van een vogelwerkblad kunt u samen buiten op zoek gaan naar dezelfde vogels. Deze verbinding tussen werkblad en werkelijkheid maakt het leren betekenisvol en duurzaam.',
    classroomIntegration: 'Het vogelthema integreert natuurlijk in het kleuterschoolprogramma: in de kring wordt geluisterd naar vogelgeluiden en geraden welke vogel het is, bij werkhoeken worden kleur- en telbladen over vogels gemaakt, op het schoolplein worden vogels geobserveerd met een eenvoudige observatiekaart, en in de bouwhoek worden nestjes gebouwd. Deze vakoverstijgende aanpak sluit aan bij de SLO-doelen voor natuur\u00e9ducatie en taalontwikkeling.',
    assessmentRubric: [
      { skill: 'Vogelherkenning', emerging: 'herkent 1\u20132 veelvoorkomende vogels (duif, eend) met hulp', proficient: 'benoemt zelfstandig 4\u20135 tuinvogels en beschrijft een opvallend kenmerk', advanced: 'herkent 7+ vogels en vergelijkt hun kenmerken (grootte, kleur, snavel)' },
      { skill: 'Tellen met vogelafbeeldingen', emerging: 'telt 1\u20134 vogels met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 vogels in een sc\u00e8ne en noteert het juiste cijfer', advanced: 'telt boven de 10, groepeert en vergelijkt aantallen van verschillende vogelsoorten' },
      { skill: 'Kleuren binnen lijnen', emerging: 'kleurt vogelvormen grotendeels buiten de lijnen met volle-vuist greep', proficient: 'kleurt binnen de lijnen met driepuntgreep en kiest passende kleuren', advanced: 'kleurt gedetailleerd met kleurvariatie en voegt zelf achtergronddetails toe' },
    ],
  },

  birthday: {
    seoTitle: 'Verjaardag-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare verjaardag-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'verjaardag kleuterschool, verjaardag oefeningen 3\u20134 jaar, verjaardag oefeningen kleuterschool, verjaardag uitprintbaar kleuterschool, verjaardag werkbladen kleuterschool, verjaardag activiteiten kleuterschool, verjaardag leerbladen 3\u20134 jaar, verjaardag gratis kleuterschool, verjaardag PDF kleuterschool, verjaardag kleuren',
    snippetAnswer: 'Verjaardag-oefeningen voor de kleuterschool (3\u20134 jaar) combineren feestelijke afbeeldingen met tellen, kleuren en koppelen. Taartjes, ballonnen en cadeautjes maken leren tot een feest. Ideaal voor het oefenen van getallen tot 10 en fijne motoriek. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het verjaardagsthema heeft een unieke emotionele kracht voor kleuters, omdat drie- en vierjarigen hun eigen verjaardag ervaren als het allerbelangrijkste evenement van het jaar. Dit persoonlijke enthousiasme wordt een krachtige leermotivator wanneer werkbladen taartjes, ballonnen en cadeautjes gebruiken als context voor tellen, kleuren en koppelen. Het tellen van kaarsjes op een taart is een van de meest natuurlijke manieren om getalbegrip op te bouwen, omdat het kind de directe betekenis begrijpt: vier kaarsjes betekent vier jaar oud. Verjaardagswerkbladen sluiten aan bij de SLO-leerlijnen voor rekenen en wiskunde door getalbegrip te verankeren in persoonlijk betekenisvolle contexten. Tegelijkertijd ontwikkelen kleuractiviteiten met feestelijke illustraties de fijne motoriek die kleuters nodig hebben als voorbereiding op het schrijven.',
    developmentalMilestones: [
      { milestone: 'Getalbegrip gekoppeld aan leeftijd (3\u20134-jarigen beginnen te begrijpen dat cijfers hoeveelheid uitdrukken)', howWeAddress: 'Kaarsjes-tel-activiteiten waarbij het kind het juiste aantal kaarsjes op een taart tekent of kleurt koppelen getallen aan persoonlijke betekenis' },
      { milestone: 'Patroonherkenning (kleuters beginnen eenvoudige patronen te herkennen en voort te zetten)', howWeAddress: 'Slingerpatroon-activiteiten waarbij kinderen kleurpatronen van ballonnen en vlaggetjes herkennen en voortzetten' },
      { milestone: '\u00c9\u00e9n-op-\u00e9\u00e9n-correspondentie (elk voorwerp wordt precies \u00e9\u00e9n keer geteld)', howWeAddress: 'Koppelactiviteiten waarbij elk kind op een feestje precies \u00e9\u00e9n cadeautje krijgt oefenen de basisprincipes van tellen' },
      { milestone: 'Fijnmotorische precisie bij kleuren (verfijning van handcontrole)', howWeAddress: 'Kleurplaten met verjaardagstaarten, ballonnen en feestmutsen met variatie in detailniveau ondersteunen progressieve motorische ontwikkeling' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met maximaal vijf voorwerpen om te tellen, bied dikke contouren aan voor het kleuren, en verbind elke activiteit met de eigen verjaardag van het kind. Voor gevorderde kleuters: introduceer eenvoudige optelactiviteiten (drie cadeautjes plus twee cadeautjes), laat patronen uitbreiden tot drie kleuren, en voeg beginnende schrijfoefeningen toe met verjaardagswoorden.',
    parentTakeaway: 'Verjaardagen bieden talloze leermomenten. Laat uw kind helpen bij het tellen van uitnodigingen, het sorteren van snoepjes voor traktaties en het versieren met patronen. Tel samen de kaarsjes op de taart en vraag hoeveel het er volgend jaar zullen zijn. Na het invullen van een verjaardagswerkblad kunt u uw kind vragen om een verjaardagskaart te tekenen voor een familielid, waardoor creatieve expressie en fijne motoriek samen worden geoefend.',
    classroomIntegration: 'Het verjaardagsthema is het hele jaar door relevant in de kleuterschool: elke kinderenverjaardag wordt een leermogelijkheid door te tellen hoeveel kinderen er al jarig zijn geweest, een verjaardagskalender bij te houden en patronen te ontdekken in verjaardagsmaanden. In werkhoeken worden verjaardagswerkbladen gecombineerd met knutselactiviteiten zoals het maken van feestmutsen en slingers, wat de SLO-doelen voor zowel rekenvaardigheid als creatieve ontwikkeling ondersteunt.',
    assessmentRubric: [
      { skill: 'Tellen tot 10 (verjaardagscontext)', emerging: 'telt 1\u20133 kaarsjes of cadeautjes met hulp en aanwijzen', proficient: 'telt zelfstandig tot 7\u20138 voorwerpen en schrijft het juiste cijfer', advanced: 'telt tot 10+, vergelijkt hoeveelheden en lost eenvoudige optelopdrachten op' },
      { skill: 'Patroonherkenning', emerging: 'herkent een AB-patroon in slingers/ballonnen met hulp', proficient: 'zet zelfstandig AB- en ABC-patronen voort en benoemt het patroon', advanced: 'cre\u00ebert eigen patronen en legt uit welke regel het patroon volgt' },
      { skill: 'Fijnmotorisch kleuren', emerging: 'kleurt verjaardagsplaatjes grotendeels buiten de lijnen', proficient: 'kleurt binnen de lijnen met bewuste kleurkeuze en driepuntgreep', advanced: 'kleurt gedetailleerd, voegt eigen versieringen toe en gebruikt kleurmenging' },
    ],
  },

  body: {
    seoTitle: 'Lichaam-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare lichaam-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'lichaam kleuterschool, lichaam oefeningen 3\u20134 jaar, lichaam oefeningen kleuterschool, lichaam uitprintbaar kleuterschool, lichaam werkbladen kleuterschool, lichaam activiteiten kleuterschool, lichaam leerbladen 3\u20134 jaar, lichaam gratis kleuterschool, lichaam PDF kleuterschool, lichaam kleuren',
    snippetAnswer: 'Lichaam-oefeningen voor de kleuterschool (3\u20134 jaar) helpen kinderen lichaamsdelen te benoemen, tellen en kleuren. Activiteiten met gezichten, handen en voeten ontwikkelen lichaamsbesef en fijne motoriek. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het lichaamsthema is uniek geschikt voor kleuters omdat drie- en vierjarigen actief bezig zijn met het ontdekken van hun eigen lichaam \u2014 ze leren lichaamsdelen benoemen, begrijpen dat ze twee handen en twee voeten hebben, en ontdekken hoe hun lichaam beweegt. Dit zelfbewustzijn is een kernmijlpaal in de kleuterontwikkeling. Werkbladen over het lichaam sluiten direct aan bij deze ontwikkelingsfase door kinderen te laten tellen (hoeveel vingers?), koppelen (welk lichaamsdeel hoort waar?) en kleuren (kleur het gezicht). De SLO-leerlijnen voor mens en samenleving benadrukken het belang van lichaamsbesef en gezondheid, en deze werkbladen vervullen dat doel op speelse wijze. Het tekenen en kleuren van lichaamsdelen versterkt bovendien de fijne motoriek en het ruimtelijk bewustzijn.',
    developmentalMilestones: [
      { milestone: 'Benoemen van lichaamsdelen (3\u20134-jarigen leren de namen van hoofd, armen, benen, handen, voeten)', howWeAddress: 'Benoem-en-wijs-activiteiten waarbij kinderen lichaamsdelen op een tekening identificeren en het juiste woord koppelen' },
      { milestone: 'Lichaamsbesef en ruimtelijke ori\u00ebntatie (kleuters leren waar lichaamsdelen zitten ten opzichte van elkaar)', howWeAddress: 'Lichaam-puzzelactiviteiten waarbij kinderen lichaamsdelen in de juiste positie plaatsen op een leeg figuur' },
      { milestone: 'Tellen van paren (twee ogen, twee oren, tien vingers)', howWeAddress: 'Telactiviteiten gericht op lichaamsparen bouwen getalbegrip op via het meest vertrouwde referentiekader: het eigen lichaam' },
      { milestone: 'Tekenen van een menselijke figuur (overgang van hoofdvoeters naar figuren met romp)', howWeAddress: 'Teken-en-kleur activiteiten met geleidelijke opbouw ondersteunen de ontwikkeling van figuratieve tekenvaardigheid' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: begin met de vijf basis-lichaamsdelen (hoofd, armen, benen, handen, voeten), gebruik een spiegel zodat het kind zijn eigen lichaam als referentie kan gebruiken, en bied grote kleurplaten met dikke lijnen. Voor gevorderde kleuters: voeg kleinere lichaamsdelen toe (elleboog, knie, enkel), introduceer links/rechts begrippen, en laat kinderen lichaamsdelen labelen met beginletters.',
    parentTakeaway: 'Het eigen lichaam is het meest toegankelijke leermateriaal dat er bestaat. Zing samen liedjes over lichaamsdelen (Hoofd, schouders, knie en teen), tel vingers en tenen bij het aankleden, en benoem lichaamsdelen tijdens het baden. Na het invullen van een lichaamswerkblad kunt u uw kind vragen om zichzelf te tekenen \u2014 deze zelfportretten laten prachtig de groei in lichaamsbesef zien over de kleuterjaren heen.',
    classroomIntegration: 'Het lichaamsthema biedt natuurlijke verbindingen met bewegingsonderwijs, gezondheidsvoorlichting en creatieve expressie. In de kring worden bewegingsliedjes over lichaamsdelen gezongen, bij werkhoeken worden lichaamswerkbladen gecombineerd met puzzels en knutselactiviteiten (handafdrukken, voetafdrukken), en in de gymzaal worden lichaamsdelen benoemd tijdens bewegingsspellen. Deze holistische aanpak sluit aan bij de SLO-doelen voor lichamelijke opvoeding en taalontwikkeling.',
    assessmentRubric: [
      { skill: 'Benoemen van lichaamsdelen', emerging: 'benoemt 3\u20134 basis-lichaamsdelen (hoofd, hand, voet) met hulp', proficient: 'benoemt zelfstandig 8\u201310 lichaamsdelen en wijst ze aan op een tekening', advanced: 'benoemt 15+ lichaamsdelen inclusief gewrichten en gebruikt links/rechts' },
      { skill: 'Tellen van lichaamsparen', emerging: 'telt met hulp dat er twee ogen en twee oren zijn', proficient: 'telt zelfstandig paren en koppelt aan het juiste cijfer', advanced: 'telt alle tien vingers, vergelijkt aantallen en begrijpt het concept van paren' },
      { skill: 'Menselijke figuur tekenen', emerging: 'tekent een hoofdvoeter (cirkel met lijnen voor benen)', proficient: 'tekent een figuur met hoofd, romp, armen en benen', advanced: 'tekent een gedetailleerde figuur met gezichtskenmerken, kleding en handen met vingers' },
    ],
  },

  camping: {
    seoTitle: 'Kamperen-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare kamperen-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kamperen kleuterschool, kamperen oefeningen 3\u20134 jaar, kamperen oefeningen kleuterschool, kamperen uitprintbaar kleuterschool, kamperen werkbladen kleuterschool, kamperen activiteiten kleuterschool, kamperen leerbladen 3\u20134 jaar, kamperen gratis kleuterschool, kamperen PDF kleuterschool, kamperen kleuren',
    snippetAnswer: 'Kamperen-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken tenten, kampvuren en sterren om tellen, kleuren en patronen te oefenen. Het avontuurlijke thema prikkelt de verbeelding en maakt leren speels. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het kamperen-thema spreekt kleuters bijzonder aan omdat drie- en vierjarigen gefascineerd zijn door het idee van buiten slapen, kampvuren en avontuur in de natuur. Deze verbeeldingskracht is een krachtige leerhefboom: tellen van sterren aan de hemel, kleuren van tenten en kampvuursc\u00e8nes, en koppelen van kampeervoorwerpen aan hun functie verbinden rekenkundige en motorische vaardigheden met een spannend verhaalthema. Kleuters in deze fase ontwikkelen hun verbeeldingsspel sterk, en kampeerwerkbladen voeden dit door sc\u00e8nes te cre\u00ebren die uitnodigen tot vertellen en fantaseren. De SLO-leerlijnen benadrukken het belang van natuurbeleving en verbeeldingskracht, en het kamperen-thema vervult beide doelen tegelijk.',
    developmentalMilestones: [
      { milestone: 'Verbeeldingsspel (3\u20134-jarigen beginnen uitgebreidere fantasiesc\u00e8nes te spelen)', howWeAddress: 'Kampeersc\u00e8nes op werkbladen prikkelen de verbeelding en nodigen uit tot verhaaltjes vertellen over het kampeeravontuur' },
      { milestone: 'Tellen van voorwerpen in een sc\u00e8ne (opbouw van \u00e9\u00e9n-op-\u00e9\u00e9n-correspondentie)', howWeAddress: 'Tel-activiteiten met sterren, marshmallows en boomstammen bouwen getalbegrip op in een motiverende context' },
      { milestone: 'Classificatie van voorwerpen op functie (kleuters leren dat voorwerpen bij situaties horen)', howWeAddress: 'Koppelactiviteiten waarbij kampeeruitrusting wordt gekoppeld aan de juiste functie (tent = slapen, lantaarn = licht) stimuleren logisch denken' },
      { milestone: 'Fijnmotorische ontwikkeling bij gedetailleerd kleuren', howWeAddress: 'Kleurplaten met kampeersc\u00e8nes bieden variatie in detailniveau van eenvoudige tenten tot gedetailleerde bossen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met eenvoudige kampeersc\u00e8nes en maximaal vijf voorwerpen, bied dikke contouren aan, en verbind de activiteit met concrete ervaringen (een tentje in de klas). Voor gevorderde kleuters: voeg tellopdrachten boven de tien toe, introduceer eenvoudige kaartlezen-activiteiten, en laat kinderen hun eigen kampeerlijst schrijven met beginletters.',
    parentTakeaway: 'Kamperen biedt rijke leermomenten, zelfs zonder de deur uit te gaan. Bouw samen een tentje van dekens in de woonkamer en speel kamperen \u2014 tel sterren op het plafond, sorteer kampeervoorwerpen en vertel verhalen bij een denkbeeldig kampvuur. Na het invullen van een kampeerwerkblad kunt u samen een kampeerlijst maken door te tekenen wat u nodig heeft, waardoor tellen, categoriseren en fijne motoriek in een speelse context worden geoefend.',
    classroomIntegration: 'Het kamperen-thema leent zich uitstekend voor een themaweek in de kleuterschool: bouw een tent in de klas, richt een kampeerhoek in met kampeerattributen, en gebruik kampeerwerkbladen bij de rekenactiviteiten. In de kring worden kampeerverhaaltjes verteld, bij werkhoeken wordt gekleurd en geteld met kampeersc\u00e8nes, en in de buitenruimte wordt een speurtocht georganiseerd. Dit sluit aan bij de SLO-doelen voor natuur\u00e9ducatie, rekenvaardigheid en sociaal-emotionele ontwikkeling.',
    assessmentRubric: [
      { skill: 'Tellen in kampeercontext', emerging: 'telt 1\u20134 voorwerpen (sterren, marshmallows) met hulp en aanwijzen', proficient: 'telt zelfstandig tot 8 voorwerpen in een kampeersc\u00e8ne en noteert het cijfer', advanced: 'telt boven de 10, groepeert voorwerpen en vergelijkt hoeveelheden' },
      { skill: 'Classificatie van kampeervoorwerpen', emerging: 'koppelt 1\u20132 voorwerpen aan hun functie met hulp', proficient: 'koppelt zelfstandig 4\u20135 kampeervoorwerpen aan hun functie en benoemt ze', advanced: 'classificeert voorwerpen op meerdere criteria en bedenkt zelf nieuwe categorie\u00ebn' },
      { skill: 'Verbeeldend vertellen', emerging: 'benoemt wat er op het werkblad staat met enkele woorden', proficient: 'vertelt een kort verhaaltje over de kampeersc\u00e8ne met 3\u20134 zinnen', advanced: 'vertelt een uitgebreid verhaal met begin, midden en einde en betrekt eigen ervaringen' },
    ],
  },

  circus: {
    seoTitle: 'Circus-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare circus-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'circus kleuterschool, circus oefeningen 3\u20134 jaar, circus oefeningen kleuterschool, circus uitprintbaar kleuterschool, circus werkbladen kleuterschool, circus activiteiten kleuterschool, circus leerbladen 3\u20134 jaar, circus gratis kleuterschool, circus PDF kleuterschool, circus kleuren',
    snippetAnswer: 'Circus-oefeningen voor de kleuterschool (3\u20134 jaar) combineren clowns, acrobaten en dieren met tellen, kleuren en patronen. De kleurrijke circuswereld maakt leren tot een spektakel. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het circusthema is magnetisch voor kleuters omdat drie- en vierjarigen gefascineerd zijn door de kleurrijke, spectaculaire wereld van clowns, acrobaten en circusdieren. Deze betovering wordt een krachtige leerhefboom wanneer werkbladen circuselementen gebruiken als context voor tellen, patroonherkenning en fijne motoriek. Het tellen van ballen waarmee een clown jongleert of het voortzetten van een kleurpatroon in slingers combineert rekenkundige vaardigheden met visuele prikkelende illustraties. Kleuters in deze fase ontwikkelen hun vermogen om patronen te herkennen en voort te zetten, en circuswerkbladen bieden hier een natuurlijk rijke context voor. De SLO-leerlijnen benadrukken het belang van creatieve expressie en spelend leren, en het circusthema verenigt beide in \u00e9\u00e9n boeiend geheel.',
    developmentalMilestones: [
      { milestone: 'Patroonherkenning (3\u20134-jarigen beginnen eenvoudige herhalende patronen te zien)', howWeAddress: 'Slingerpatroon-activiteiten met circuskleuren en -vormen helpen kinderen AB- en ABC-patronen te herkennen en voort te zetten' },
      { milestone: 'Tellen van voorwerpen in groepjes (opbouw van kardinaal getalbegrip)', howWeAddress: 'Tel-activiteiten met jonglerenballen, circusdieren en acrobaten bouwen het vermogen op om hoeveelheden te bepalen' },
      { milestone: 'Visuele discriminatie van kleuren en vormen', howWeAddress: 'Koppelactiviteiten met circusattributen in verschillende kleuren en vormen scherpen het onderscheidingsvermogen' },
      { milestone: 'Expressieve fijnmotoriek (kleuren wordt creatiever en doelgerichter)', howWeAddress: 'Kleurplaten van circussc\u00e8nes met veel kleurvariatie stimuleren bewuste kleurkeuze en fijne motorische controle' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik eenvoudige circusafbeeldingen met maximaal drie kleuren, beperk tellopdrachten tot vijf, en gebruik concrete circusattributen (ballen, linten) als aanvulling. Voor gevorderde kleuters: introduceer complexere patronen (AABB, ABC), voeg eenvoudige optelopdrachten toe met circusvoorwerpen, en laat kinderen hun eigen circussc\u00e8ne ontwerpen en beschrijven.',
    parentTakeaway: 'Het circus biedt een schatkist aan leermomenten. Speel thuis circus: jongleer met zachte ballen en tel ze, maak slingers met herhalende kleurpatronen, en laat uw kind clownsschmink ontwerpen op papier. Na een circuswerkblad kunt u samen een mini-circusvoorstelling bedenken, waarbij uw kind de acts tekent en telt. Dit verbindt creativiteit met rekenvaardigheid op een manier die voelt als spel.',
    classroomIntegration: 'Het circusthema is ideaal voor een projectweek in de kleuterschool: richt de klas in als circustent, laat kinderen circusacts bedenken en oefenen, en gebruik circuswerkbladen bij de reken- en taalactiviteiten. In de kring worden circusliedjes gezongen, bij werkhoeken wordt geteld en gekleurd met circussc\u00e8nes, en in de gymzaal worden balanceer- en jongleractiviteiten gedaan. Dit sluit aan bij de SLO-doelen voor bewegingsonderwijs, rekenvaardigheid en creatieve expressie.',
    assessmentRubric: [
      { skill: 'Patroonherkenning (circuscontext)', emerging: 'herkent een AB-patroon in circuskleuren met hulp', proficient: 'zet zelfstandig AB- en ABC-patronen voort en benoemt het patroon', advanced: 'cre\u00ebert eigen patronen, beschrijft de regel en past toe op nieuwe situaties' },
      { skill: 'Tellen van circusvoorwerpen', emerging: 'telt 1\u20134 circusvoorwerpen met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 en koppelt aan het juiste cijfer', advanced: 'telt boven de 10 en vergelijkt aantallen tussen verschillende circusgroepen' },
      { skill: 'Creatief kleuren', emerging: 'kleurt circusplaatjes met willekeurige kleuren, grotendeels buiten de lijnen', proficient: 'kleurt binnen de lijnen met bewuste, passende kleurkeuze', advanced: 'kleurt gedetailleerd met kleurmenging, voegt eigen elementen toe aan de circussc\u00e8ne' },
    ],
  },

  clothing: {
    seoTitle: 'Kleding-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare kleding-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kleding kleuterschool, kleding oefeningen 3\u20134 jaar, kleding oefeningen kleuterschool, kleding uitprintbaar kleuterschool, kleding werkbladen kleuterschool, kleding activiteiten kleuterschool, kleding leerbladen 3\u20134 jaar, kleding gratis kleuterschool, kleding PDF kleuterschool, kleding kleuren',
    snippetAnswer: 'Kleding-oefeningen voor de kleuterschool (3\u20134 jaar) helpen kinderen kledingstukken te benoemen, sorteren en kleuren. Jassen, schoenen en mutsen worden leermiddelen voor categorisering en fijne motoriek. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het kledingthema sluit naadloos aan bij het dagelijks leven van kleuters, omdat drie- en vierjarigen dagelijks bezig zijn met aankleden en uitkleden \u2014 een kernactiviteit voor het ontwikkelen van zelfstandigheid. Deze dagelijkse ervaring maakt kleding tot een krachtig thema voor werkbladen: kinderen sorteren kleding op seizoen (winterjas versus zomershirt), koppelen kledingstukken aan lichaamsdelen, en leren categoriseren op functie. Het kleuren van kledingafbeeldingen traint de fijne motoriek, terwijl het tellen van kledingstukken in een kast getalbegrip opbouwt. De SLO-leerlijnen benadrukken het belang van zelfredzaamheid en wereldori\u00ebntatie, en het kledingthema vervult beide doelen wanneer kinderen leren welke kleding bij welk weer hoort.',
    developmentalMilestones: [
      { milestone: 'Zelfredzaamheid bij aankleden (3\u20134-jarigen oefenen zelfstandig kledingkeuzes maken)', howWeAddress: 'Koppelactiviteiten waarbij kinderen kleding aan het juiste weer of seizoen koppelen versterken het vermogen om functionele keuzes te maken' },
      { milestone: 'Categorisering op meerdere kenmerken (kleuters sorteren op kleur, type of seizoen)', howWeAddress: 'Sorteeractiviteiten met kledingstukken stimuleren het vermogen om op verschillende eigenschappen te groeperen' },
      { milestone: 'Tellen en vergelijken van hoeveelheden', howWeAddress: 'Tel-activiteiten met kledingkasten en wasmanden bouwen getalbegrip op: hoeveel sokken? Zijn er genoeg schoenen voor iedereen?' },
      { milestone: 'Fijnmotorische ontwikkeling door kleuren en overtrekken', howWeAddress: 'Kleurplaten van kledingstukken met variatie in patronen (strepen, stippen) oefenen precieze motorische controle' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vijf basiskledingstukken (jas, broek, shirt, schoenen, muts), gebruik echte kledingstukken als aanvulling, en richt u op \u00e9\u00e9n sorteerkenmerk tegelijk. Voor gevorderde kleuters: introduceer seizoensgebonden kledingkeuzes met meerdere criteria, voeg patronen toe aan kledingstukken om te tekenen, en laat kinderen hun eigen outfit ontwerpen en beschrijven.',
    parentTakeaway: 'Aankleden is dagelijks leren. Laat uw kind zelf kleding kiezen en bespreek waarom: het regent, dus we doen een regenjas aan. Tel samen de sokken bij het opvouwen van de was, sorteer kleding op kleur of eigenaar, en laat uw kind stickers op een werkblad plakken om een outfit samen te stellen. Na een kledingwerkblad kunt u samen de kledingkast opruimen en kledingstukken benoemen \u2014 elke dag is een les in categoriseren.',
    classroomIntegration: 'Het kledingthema integreert natuurlijk in de kleuterschoolroutines: bij het binnenkomen worden jassen en schoenen gesorteerd, in de kring wordt besproken welke kleding bij het weer past, bij werkhoeken worden kledingwerkbladen gecombineerd met verkleedhoekactiviteiten, en bij bewegingsactiviteiten worden kledingstukken benoemd. Dit sluit aan bij de SLO-doelen voor zelfredzaamheid, taalontwikkeling en wereldori\u00ebntatie.',
    assessmentRubric: [
      { skill: 'Categoriseren van kleding', emerging: 'sorteert kleding in twee groepen (bijv. schoenen/geen schoenen) met hulp', proficient: 'sorteert zelfstandig op seizoen of lichaamsdeel en benoemt de groepen', advanced: 'sorteert op meerdere criteria tegelijk en legt de sorteerstrategie uit' },
      { skill: 'Koppeling kleding-weer', emerging: 'koppelt 1\u20132 kledingstukken aan het juiste weer met hulp', proficient: 'koppelt zelfstandig 4\u20135 kledingstukken aan seizoen en weer', advanced: 'stelt complete outfits samen voor verschillende weertypes en legt keuzes uit' },
      { skill: 'Tellen van kledingstukken', emerging: 'telt 1\u20134 kledingstukken met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 kledingstukken en noteert het cijfer', advanced: 'telt boven de 10, vergelijkt hoeveelheden en lost eenvoudige deelvraagstukken op' },
    ],
  },

  colors: {
    seoTitle: 'Kleuren-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare kleuren-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'kleuren kleuterschool, kleuren oefeningen 3\u20134 jaar, kleuren oefeningen kleuterschool, kleuren uitprintbaar kleuterschool, kleuren werkbladen kleuterschool, kleuren activiteiten kleuterschool, kleuren leerbladen 3\u20134 jaar, kleuren gratis kleuterschool, kleuren PDF kleuterschool, kleuren kleuren',
    snippetAnswer: 'Kleuren-oefeningen voor de kleuterschool (3\u20134 jaar) leren kinderen basiskleuren herkennen, benoemen en sorteren. Kleurplaten, koppelactiviteiten en sorteerbladen bouwen kleurkennis en fijne motoriek op. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het kleurenthema is een van de meest fundamentele thema\u2019s voor kleuters, omdat drie- en vierjarigen actief bezig zijn met het leren benoemen en onderscheiden van kleuren \u2014 een cognitieve mijlpaal die de basis legt voor categorisering, beschrijving en visuele waarneming. Kleuren zijn overal in de omgeving van het kind aanwezig, waardoor werkbladen direct kunnen aansluiten bij dagelijkse ervaringen. Het sorteren op kleur is een van de eerste classificatievaardigheden die kinderen beheersen, en kleurenwerkbladen verdiepen dit systematisch. De SLO-leerlijnen voor rekenen en wiskunde benadrukken het belang van sorteren en classificeren, terwijl de leerlijnen voor kunstzinnige ori\u00ebntatie kleurgebruik als expressieve vaardigheid benoemen. Kleurwerkbladen combineren beide domeinen wanneer kinderen bewust kleuren kiezen en toepassen.',
    developmentalMilestones: [
      { milestone: 'Kleurherkenning en -benoeming (3\u20134-jarigen leren basiskleuren herkennen en benoemen)', howWeAddress: 'Kleurbenoemingsactiviteiten waarbij kinderen voorwerpen aan de juiste kleur koppelen bouwen het kleurvocabulaire systematisch op' },
      { milestone: 'Sorteren op kleur (een van de eerste classificatievaardigheden)', howWeAddress: 'Sorteeractiviteiten waarbij voorwerpen op kleur worden gegroepeerd versterken het categoriseringsvermogen' },
      { milestone: 'Kleurmenging begrijpen (basisbegrip dat twee kleuren een nieuwe kleur maken)', howWeAddress: 'Eenvoudige kleurmengactiviteiten op werkbladen introduceren het concept van primaire en secundaire kleuren' },
      { milestone: 'Bewuste kleurkeuze bij creatieve expressie', howWeAddress: 'Kleurplaten die bewuste kleurkeuze stimuleren (kleur de appel rood, het gras groen) bouwen de verbinding tussen kleur en betekenis op' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: begin met drie basiskleuren (rood, blauw, geel), gebruik concrete voorwerpen in die kleuren als referentie, en bied grote sorteervlakken aan. Voor gevorderde kleuters: introduceer kleurmenging, voeg pasteltinten en donkere tinten toe aan het vocabulaire, en laat kinderen kleurpatronen ontwerpen.',
    parentTakeaway: 'Kleuren leren is zo eenvoudig als rondkijken. Benoem kleuren bij alles wat u samen doet: de rode auto, de blauwe lucht, het groene gras. Sorteer samen Lego-blokjes op kleur, zoek tijdens een wandeling alle gele dingen die u kunt vinden, en vraag uw kind welke kleur zijn favoriete knuffel heeft. Na een kleurenwerkblad kunt u samen een kleurenjacht doen in huis \u2014 hoeveel rode voorwerpen kunnen we vinden?',
    classroomIntegration: 'Het kleurenthema loopt als een rode draad door alle kleuterschoolactiviteiten: in de kring wordt de kleur van de dag ge\u00efntroduceerd, bij werkhoeken worden kleurenwerkbladen gecombineerd met sorteeractiviteiten, in de verfhoek wordt ge\u00ebxperimenteerd met kleurmenging, en bij het opruimen worden materialen op kleur gesorteerd. Deze alomtegenwoordige aanpak sluit aan bij de SLO-doelen voor zowel rekenvaardigheid als kunstzinnige ori\u00ebntatie.',
    assessmentRubric: [
      { skill: 'Kleurherkenning en -benoeming', emerging: 'benoemt 2\u20133 basiskleuren (rood, blauw, geel) met hulp', proficient: 'benoemt zelfstandig 6\u20138 kleuren inclusief groen, oranje, paars', advanced: 'benoemt 10+ kleuren inclusief roze, bruin, grijs en beschrijft tintverschillen' },
      { skill: 'Sorteren op kleur', emerging: 'sorteert voorwerpen in 2 kleurgroepen met hulp', proficient: 'sorteert zelfstandig in 4\u20135 kleurgroepen', advanced: 'sorteert op kleur \u00e9n een tweede eigenschap en legt de strategie uit' },
      { skill: 'Kleurtoepassing bij kleuren', emerging: 'kleurt met willekeurige kleuren, ongeacht het voorwerp', proficient: 'kiest passende kleuren voor herkenbare voorwerpen (gras = groen)', advanced: 'past bewust kleurvariatie toe, gebruikt tinten en voegt creatieve kleurkeuzes toe met uitleg' },
    ],
  },

  construction: {
    seoTitle: 'Bouw-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare bouw-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'bouw kleuterschool, bouw oefeningen 3\u20134 jaar, bouw oefeningen kleuterschool, bouw uitprintbaar kleuterschool, bouw werkbladen kleuterschool, bouw activiteiten kleuterschool, bouw leerbladen 3\u20134 jaar, bouw gratis kleuterschool, bouw PDF kleuterschool, bouw kleuren',
    snippetAnswer: 'Bouw-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken kranen, vrachtwagens en gereedschap om tellen, vormen herkennen en kleuren te oefenen. Het bouwthema prikkelt het ruimtelijk inzicht en de fijne motoriek. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het bouwthema is bijzonder geschikt voor kleuters omdat drie- en vierjarigen van nature gefascineerd zijn door bouwen, graven en constructie \u2014 ze bouwen dagelijks met blokken, zand en dozen. Deze intrinsieke motivatie maakt bouwwerkbladen tot een krachtig leermiddel. Het tellen van bouwstenen, het herkennen van geometrische vormen in gebouwen en het sorteren van gereedschap op functie combineren rekenkundige vaardigheden met ruimtelijk inzicht. De SLO-leerlijnen voor rekenen en wiskunde benadrukken het belang van meetkunde en ruimtelijk denken, en het bouwthema vervult dit wanneer kinderen vormen in constructies herkennen en benoemen. Tegelijkertijd versterken kleuractiviteiten met bouwsc\u00e8nes de fijne motoriek.',
    developmentalMilestones: [
      { milestone: 'Ruimtelijk inzicht (3\u20134-jarigen beginnen te begrijpen hoe vormen in elkaar passen)', howWeAddress: 'Bouwpuzzel-activiteiten waarbij kinderen vormen in de juiste positie plaatsen om een constructie te voltooien' },
      { milestone: 'Vormherkenning (kleuters leren basale geometrische vormen onderscheiden)', howWeAddress: 'Vorm-zoek-activiteiten in bouwsc\u00e8nes waarbij kinderen vierkanten, driehoeken en rechthoeken identificeren in gebouwen en voertuigen' },
      { milestone: 'Tellen en hoeveelheden vergelijken', howWeAddress: 'Telactiviteiten met bouwstenen en wielen bouwen getalbegrip op: hoeveel blokken heeft deze toren nodig?' },
      { milestone: 'Fijnmotorische ontwikkeling door gedetailleerd kleuren', howWeAddress: 'Kleurplaten van bouwvoertuigen en gereedschap met rechte lijnen en hoeken oefenen precieze motorische controle' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met grote, eenvoudige bouwvormen, beperk tot drie basisvormen (vierkant, driehoek, cirkel), en combineer met echte blokken als hands-on aanvulling. Voor gevorderde kleuters: introduceer complexere constructies met meerdere vormtypen, voeg tellopdrachten boven de tien toe, en laat kinderen hun eigen bouwontwerp tekenen op ruitjespapier.',
    parentTakeaway: 'Bouwen is een van de rijkste leeractiviteiten voor jonge kinderen. Bouw samen torens van blokken en tel hoeveel blokken er nodig zijn, sorteer Lego op kleur en vorm, en bekijk samen bouwplaatsen in de buurt. Na een bouwwerkblad kunt u uw kind uitdagen om dezelfde constructie na te bouwen met blokken \u2014 dit vertaalt tweedimensionale werkbladen naar driedimensionaal ruimtelijk begrip.',
    classroomIntegration: 'Het bouwthema biedt natuurlijke verbindingen met de bouwhoek, het zandwater-spel en constructie-activiteiten. In de kring worden bouwplaatsfoto\u2019s besproken, bij werkhoeken worden bouwwerkbladen gecombineerd met blokkenactiviteiten, en in de bouwhoek bouwen kinderen constructies na die ze op werkbladen hebben gezien. Dit sluit aan bij de SLO-doelen voor meetkunde, ruimtelijk denken en techniek.',
    assessmentRubric: [
      { skill: 'Vormherkenning in bouwcontext', emerging: 'herkent cirkel en vierkant in bouwplaatjes met hulp', proficient: 'identificeert zelfstandig 4 basisvormen in constructies en benoemt ze', advanced: 'vindt vormen in complexe sc\u00e8nes, beschrijft eigenschappen en combineert vormen tot patronen' },
      { skill: 'Tellen van bouwmaterialen', emerging: 'telt 1\u20134 blokken of wielen met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 materialen en noteert het juiste cijfer', advanced: 'telt boven de 10, vergelijkt hoeveelheden en begrijpt meer/minder' },
      { skill: 'Ruimtelijk construeren op papier', emerging: 'plaatst vormen in een eenvoudig bouwraster met hulp', proficient: 'voltooit zelfstandig een bouwpatroon op een werkblad', advanced: 'ontwerpt eigen constructies op papier en beschrijft de positie van vormen' },
    ],
  },

  cooking: {
    seoTitle: 'Koken-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare koken-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'koken kleuterschool, koken oefeningen 3\u20134 jaar, koken oefeningen kleuterschool, koken uitprintbaar kleuterschool, koken werkbladen kleuterschool, koken activiteiten kleuterschool, koken leerbladen 3\u20134 jaar, koken gratis kleuterschool, koken PDF kleuterschool, koken kleuren',
    snippetAnswer: 'Koken-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken ingredi\u00ebnten, keukengerei en receptstappen om tellen, sorteren en volgordes te oefenen. Het kookthema verbindt rekenen met dagelijkse ervaringen. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het kokenthema is bijzonder effectief voor kleuters omdat drie- en vierjarigen gefascineerd zijn door wat er in de keuken gebeurt \u2014 ze willen helpen met roeren, gieten en proeven. Deze nieuwsgierigheid wordt een leerhefboom wanneer werkbladen ingredi\u00ebnten, keukengerei en receptstappen gebruiken als context voor tellen, volgorde en classificatie. Het volgen van een eenvoudig recept is in essentie het volgen van een algoritme, en werkbladen die receptstappen in de juiste volgorde laten zetten introduceren logisch denken op een intuïtieve manier. De SLO-leerlijnen benadrukken het belang van zintuiglijke waarneming en het begrijpen van oorzaak en gevolg, en kookactiviteiten vervullen beide wanneer kinderen leren dat mengen van ingredi\u00ebnten een resultaat oplevert.',
    developmentalMilestones: [
      { milestone: 'Sequenti\u00eble ordening (3\u20134-jarigen beginnen te begrijpen dat stappen in een bepaalde volgorde moeten)', howWeAddress: 'Receptvolgorde-activiteiten waarbij kinderen stappen in de juiste volgorde zetten (eerst eieren, dan mengen, dan bakken)' },
      { milestone: 'Tellen van ingredi\u00ebnten (opbouw van getalbegrip via bekende voorwerpen)', howWeAddress: 'Telactiviteiten met eieren, appels en koekjes bouwen getalbegrip op in een motiverende keukencontext' },
      { milestone: 'Classificatie van keukengerei (sorteren op functie of eigenschap)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen keukengerei groeperen op functie (snijden, roeren, meten) stimuleren logisch denken' },
      { milestone: 'Fijnmotorische controle (grijpen, roeren, gieten vertaald naar werkblad)', howWeAddress: 'Overtrek- en kleuractiviteiten met keukengerei en ingredi\u00ebnten oefenen de precieze handcontrole die ook bij echt koken nodig is' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met maximaal drie receptstappen, bied herkenbare ingredi\u00ebnten aan (brood, kaas, fruit), en combineer met een echte kookactiviteit in de klas. Voor gevorderde kleuters: introduceer recepten met meer stappen, voeg meetbegrippen toe (vol/leeg, veel/weinig), en laat kinderen hun eigen recept tekenen.',
    parentTakeaway: 'Koken met uw kind is een van de rijkste leeractiviteiten die u kunt doen. Laat uw kind ingredi\u00ebnten tellen (drie eieren, twee kopjes melk), benoem keukengerei, en volg samen een eenvoudig recept stap voor stap. Na een kookwerkblad kunt u het recept daadwerkelijk samen maken \u2014 de verbinding tussen werkblad en echte ervaring verdiept het leren enorm. Vergeet niet: het proces is belangrijker dan het resultaat.',
    classroomIntegration: 'Het kokenthema biedt rijke leermogelijkheden in de kleuterschool: in de kring worden ingredi\u00ebnten en keukengerei besproken, bij werkhoeken worden kookwerkbladen gecombineerd met een speelkeukenhoek, en regelmatig wordt er daadwerkelijk gekookt in de klas (fruit snijden, beleg smeren, koekjes bakken). Dit sluit aan bij de SLO-doelen voor natuur en techniek, rekenvaardigheid en gezondheidsvoorlichting.',
    assessmentRubric: [
      { skill: 'Volgorde begrip (receptstappen)', emerging: 'ordent 2 stappen in de juiste volgorde met hulp', proficient: 'ordent zelfstandig 3\u20134 receptstappen en beschrijft de volgorde', advanced: 'ordent 5+ stappen, verklaart waarom de volgorde belangrijk is en bedenkt eigen receptstappen' },
      { skill: 'Tellen van ingredi\u00ebnten', emerging: 'telt 1\u20134 ingredi\u00ebnten met aanwijzende hulp', proficient: 'telt zelfstandig tot 8 ingredi\u00ebnten en noteert het juiste aantal', advanced: 'telt boven de 10 en vergelijkt hoeveelheden (meer/minder/evenveel)' },
      { skill: 'Classificatie van keukengerei', emerging: 'sorteert 2\u20133 voorwerpen als keukengerei/niet-keukengerei met hulp', proficient: 'sorteert zelfstandig keukengerei op functie (snijden, roeren)', advanced: 'classificeert op meerdere criteria en bedenkt zelf nieuwe categorie\u00ebn' },
    ],
  },

  dinosaurs: {
    seoTitle: 'Dinosaurussen-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare dinosaurussen-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'dinosaurussen kleuterschool, dinosaurussen oefeningen 3\u20134 jaar, dinosaurussen oefeningen kleuterschool, dinosaurussen uitprintbaar kleuterschool, dinosaurussen werkbladen kleuterschool, dinosaurussen activiteiten kleuterschool, dinosaurussen leerbladen 3\u20134 jaar, dinosaurussen gratis kleuterschool, dinosaurussen PDF kleuterschool, dinosaurussen kleuren',
    snippetAnswer: 'Dinosaurussen-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken T-rex, Triceratops en andere dino\u2019s om tellen, kleuren en vergelijken te oefenen. De fascinatie voor deze reuzen maakt leren onweerstaanbaar. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het dinosaurussenthema is een van de meest motiverende thema\u2019s voor kleuters, omdat drie- en vierjarigen een bijna universele fascinatie voor deze prehistorische reuzen hebben. Het feit dat dinosaurussen echt hebben bestaan maar niet meer te zien zijn, prikkelt het abstracte denkvermogen dat kleuters in deze fase beginnen te ontwikkelen. Werkbladen met dinosaurussen motiveren zelfs kinderen die normaal minder ge\u00efnteresseerd zijn in werkbladactiviteiten. Het vergelijken van grootte (grote T-rex versus kleine Compsognathus), het tellen van dinosaurussen in een sc\u00e8ne en het kleuren van verschillende soorten combineren rekenkundige en motorische vaardigheden met fascinerend thematisch materiaal. De SLO-leerlijnen benadrukken het belang van verwondering en nieuwsgierigheid, en dinosaurussen wekken beide in overvloed.',
    developmentalMilestones: [
      { milestone: 'Vergelijken van grootte (3\u20134-jarigen beginnen groot/klein en lang/kort te onderscheiden)', howWeAddress: 'Grootte-vergelijkingsactiviteiten met dinosaurussen (rangschik van klein naar groot) bouwen meetkundig denken op' },
      { milestone: 'Tellen en getalherkenning (opbouw van kardinaal getalbegrip)', howWeAddress: 'Telactiviteiten met dinosaurussen in een sc\u00e8ne waarbij het kind het juiste aantal telt en koppelt aan het cijfer' },
      { milestone: 'Categorisering (sorteren op een zichtbaar kenmerk)', howWeAddress: 'Sorteeractiviteiten waarbij dinosaurussen worden gegroepeerd op kenmerken (vleugels/geen vleugels, groot/klein) versterken het classificatievermogen' },
      { milestone: 'Fijnmotorische expressie bij gedetailleerd kleuren', howWeAddress: 'Kleurplaten van dinosaurussen met variatie in detailniveau dagen de fijne motoriek uit en stimuleren creatieve expressie' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot drie of vier herkenbare dinosaurussen (T-rex, Triceratops, Stegosaurus), gebruik plastic dinosaurussen als concreet aanvulling, en richt u op \u00e9\u00e9n vaardigheid per werkblad. Voor gevorderde kleuters: introduceer meer dinosaurussoorten, voeg tellopdrachten boven de tien toe, en laat kinderen dinosaurussen vergelijken op meerdere kenmerken tegelijk.',
    parentTakeaway: 'De dinosaurusfascinatie van uw kind is een gouden leerkans. Benut die door samen dinosaurusboeken te lezen, plastic dino\u2019s te sorteren op grootte, en te tellen hoeveel dinosaurussen er op een plaat staan. Bezoek een natuurhistorisch museum voor een indrukwekkende ervaring. Na een dinosauruswerkblad kunt u samen een dino-landschap bouwen met speelgoed en tellen hoeveel dino\u2019s er wonen \u2014 dit vertaalt het werkblad naar creatief spel.',
    classroomIntegration: 'Het dinosaurussenthema is ideaal voor een themaweek in de kleuterschool: in de kring worden dinosaurusboeken voorgelezen en dinosaurusnamen geoefend, bij werkhoeken worden tel- en kleurbladen gemaakt, in de zandtafel worden dinosaurusfossielen opgegraven, en in de bouwhoek worden dinosauruswerelden gebouwd. Dit sluit aan bij de SLO-doelen voor natuur en techniek, taalontwikkeling en creatieve expressie.',
    assessmentRubric: [
      { skill: 'Grootte vergelijken (dinosauruscontext)', emerging: 'wijst de grootste en kleinste aan met hulp', proficient: 'rangschikt zelfstandig 3\u20134 dinosaurussen van klein naar groot', advanced: 'rangschikt 5+ items, vergelijkt op meerdere dimensies (hoogte, lengte) en beschrijft relaties' },
      { skill: 'Tellen van dinosaurussen', emerging: 'telt 1\u20134 dinosaurussen met aanwijzende hulp', proficient: 'telt zelfstandig tot 8\u201310 en koppelt aan het juiste cijfer', advanced: 'telt boven de 10 en vergelijkt aantallen van verschillende soorten' },
      { skill: 'Dinosaurussen kleuren', emerging: 'kleurt dinosaurussen grotendeels buiten de lijnen met beperkte kleurkeuze', proficient: 'kleurt binnen de lijnen met bewuste kleurkeuze en driepuntgreep', advanced: 'kleurt gedetailleerd met kleurvariatie, voegt achtergrondsc\u00e8nes toe en beschrijft keuzes' },
    ],
  },

  easter: {
    seoTitle: 'Pasen-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare pasen-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'pasen kleuterschool, pasen oefeningen 3\u20134 jaar, pasen oefeningen kleuterschool, pasen uitprintbaar kleuterschool, pasen werkbladen kleuterschool, pasen activiteiten kleuterschool, pasen leerbladen 3\u20134 jaar, pasen gratis kleuterschool, pasen PDF kleuterschool, pasen kleuren',
    snippetAnswer: 'Pasen-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken paaseieren, haasjes en kuikentjes om tellen, patronen en kleuren te oefenen. Het feestelijke thema maakt leren extra vrolijk. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het pasenthema heeft een bijzondere aantrekkingskracht op kleuters omdat drie- en vierjarigen de opwinding van paaseieren zoeken, konijntjes en vrolijke lentekleuren ervaren als pure magie. Deze emotionele betrokkenheid maakt paaswerkbladen tot een uitzonderlijk effectief leermiddel. Het tellen van paaseieren in een mand, het voortzetten van kleurpatronen op eieren en het koppelen van paasafbeeldingen aan hun naam combineert rekenkundige, taal- en motorische vaardigheden in \u00e9\u00e9n feestelijk geheel. Pasen valt in de lente, wat een natuurlijke verbinding biedt met het seizoenenthema en de natuur. De SLO-leerlijnen benadrukken het belang van cultureel bewustzijn en seizoensgebonden activiteiten, en paaswerkbladen vervullen dit doel op een vrolijke, toegankelijke manier.',
    developmentalMilestones: [
      { milestone: 'Patroonherkenning en -voortzetting (3\u20134-jarigen beginnen herhalende patronen te zien)', howWeAddress: 'Paaseieren-patroon-activiteiten waarbij kinderen kleurpatronen op eieren herkennen en voortzetten (rood-geel-rood-geel)' },
      { milestone: 'Tellen van voorwerpen in een verzameling (opbouw van kardinaal getalbegrip)', howWeAddress: 'Tel-activiteiten met paaseieren in mandjes, kuikentjes en bloemen bouwen getalbegrip op in een feestelijke context' },
      { milestone: 'Fijnmotorische precisie (kleuters verbeteren greep en kleurcontrole)', howWeAddress: 'Het versieren van paaseieren op werkbladen met patronen en kleuren oefent precieze handcontrole en creatieve expressie' },
      { milestone: 'Classificatie op meerdere kenmerken (kleur, grootte, patroon)', howWeAddress: 'Sorteeractiviteiten met paaseieren die verschillen in kleur, grootte en patroon versterken het meervoudig classificatievermogen' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot twee kleuren in patronen, gebruik grote paaseiercontouren voor het kleuren, en bied maximaal vijf voorwerpen om te tellen. Voor gevorderde kleuters: introduceer driekleurige patronen, voeg eenvoudige optelopdrachten toe met paaseieren, en laat kinderen hun eigen paaseierpatroon ontwerpen en aan een klasgenoot beschrijven.',
    parentTakeaway: 'Pasen biedt prachtige leermomenten. Verstop paaseieren en laat uw kind ze tellen terwijl het ze vindt, sorteer de eieren op kleur en grootte, en versier samen eieren met herhalende patronen. Na een paaswerkblad kunt u uw kind vragen om een paasmandje te tekenen met precies het aantal eieren dat op het werkblad stond \u2014 dit versterkt het getalbegrip via creatieve expressie.',
    classroomIntegration: 'Het pasenthema biedt een feestelijke context voor de kleuterschool in het voorjaar: in de kring worden paasverhaaltjes verteld en paaseieren geteld, bij werkhoeken worden patroon- en kleurbladen gemaakt, op het schoolplein wordt een eierjacht georganiseerd, en in de knutselhoek worden paaseieren versierd. Dit sluit aan bij de SLO-doelen voor cultureel bewustzijn, rekenvaardigheid en creatieve expressie.',
    assessmentRubric: [
      { skill: 'Patroonherkenning (paascontext)', emerging: 'herkent een AB-patroon in paaseikleuren met hulp', proficient: 'zet zelfstandig AB- en ABC-patronen voort op paaseieren', advanced: 'ontwerpt eigen patronen en beschrijft de regel, past patronen toe op nieuwe situaties' },
      { skill: 'Tellen van paasvoorwerpen', emerging: 'telt 1\u20134 paaseieren met aanwijzende hulp', proficient: 'telt zelfstandig tot 8\u201310 en noteert het juiste cijfer', advanced: 'telt boven de 10, vergelijkt hoeveelheden en lost eenvoudige optelsommen op' },
      { skill: 'Paaseieren versieren (fijnmotoriek)', emerging: 'kleurt eieren eenkleurig, grotendeels buiten de lijnen', proficient: 'versiert eieren met meerdere kleuren binnen de lijnen en eenvoudige patronen', advanced: 'cre\u00ebert gedetailleerde versieringen met kleurvariatie, patronen en symmetrie' },
    ],
  },

  emotions: {
    seoTitle: 'Emoties-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare emoties-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'emoties kleuterschool, emoties oefeningen 3\u20134 jaar, emoties oefeningen kleuterschool, emoties uitprintbaar kleuterschool, emoties werkbladen kleuterschool, emoties activiteiten kleuterschool, emoties leerbladen 3\u20134 jaar, emoties gratis kleuterschool, emoties PDF kleuterschool, emoties kleuren',
    snippetAnswer: 'Emoties-oefeningen voor de kleuterschool (3\u20134 jaar) helpen kinderen gezichtsuitdrukkingen herkennen, gevoelens benoemen en emoties kleuren. Werkbladen bouwen sociaal-emotioneel bewustzijn op via speelse activiteiten. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het emotiethema is cruciaal voor kleuters omdat drie- en vierjarigen midden in de ontwikkeling van hun emotionele vocabulaire zitten \u2014 ze ervaren sterke gevoelens maar missen vaak de woorden om ze uit te drukken. Dit leidt tot frustratie, driftbuien en sociale conflicten. Werkbladen over emoties bieden een veilige, gestructureerde manier om gevoelens te verkennen: het herkennen van gezichtsuitdrukkingen, het koppelen van gevoelens aan situaties en het kleuren van emotie-gezichten bouwen het emotionele vocabulaire op dat nodig is voor zelfregulatie. De SLO-leerlijnen voor sociaal-emotionele ontwikkeling benadrukken het belang van gevoelsherkenning en -expressie, en emotiewerkbladen zijn een concreet middel om deze doelen te bereiken.',
    developmentalMilestones: [
      { milestone: 'Herkenning van basisemoties in gezichten (3\u20134-jarigen leren blij, boos, verdrietig en bang herkennen)', howWeAddress: 'Gezichtsuitdrukking-koppelactiviteiten waarbij kinderen emoties in gezichten herkennen en aan het juiste woord koppelen' },
      { milestone: 'Emotioneel vocabulaire (kleuters leren woorden voor gevoelens)', howWeAddress: 'Benoem-de-emotie activiteiten breiden het vocabulaire uit van de vier basisemoties naar genuanceerder gevoelens' },
      { milestone: 'Koppeling emotie-situatie (begrijpen dat situaties gevoelens oproepen)', howWeAddress: 'Situatie-emotie koppelactiviteiten (een cadeau krijgen = blij, een ijsje laten vallen = verdrietig) bouwen emotioneel redeneren op' },
      { milestone: 'Expressie van eigen gevoelens via tekenen en kleuren', howWeAddress: 'Teken-je-gevoel activiteiten waarbij kinderen gezichten tekenen die hun huidige emotie uitdrukken stimuleren zelfexpressie' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: begin met twee contrasterende emoties (blij/verdrietig), gebruik een spiegel zodat kinderen hun eigen gezichtsuitdrukking kunnen zien, en koppel elke emotie aan een kleur. Voor gevorderde kleuters: introduceer genuanceerdere emoties (trots, teleurgesteld, opgewonden), laat kinderen emotieverhalen vertellen bij situatieplaatjes, en introduceer eenvoudige strategieen voor emotieregulatie.',
    parentTakeaway: 'Praten over gevoelens is de belangrijkste bijdrage die u thuis kunt leveren. Benoem uw eigen emoties hardop (ik voel me blij omdat..., ik ben een beetje gefrustreerd omdat...) zodat uw kind leert dat iedereen gevoelens heeft en dat het normaal is om erover te praten. Na een emotiewerkblad kunt u samen een \u201ehoe voel ik me vandaag\u201d-routine invoeren bij het ontbijt \u2014 dit dagelijkse gesprekje bouwt emotioneel bewustzijn op als gewoonte.',
    classroomIntegration: 'Het emotiethema loopt als een rode draad door de kleuterschool: in de kring wordt dagelijks gevraagd hoe kinderen zich voelen, bij werkhoeken worden emotiewerkbladen gecombineerd met een gevoelensthermometer, in de poppenhoek worden sociale situaties nagespeeld, en bij conflicten worden werkbladstrategieen toegepast. Dit sluit aan bij de SLO-doelen voor sociaal-emotionele ontwikkeling en burgerschapsvorming.',
    assessmentRubric: [
      { skill: 'Emotieherkenning in gezichten', emerging: 'herkent blij en verdrietig in gezichtsuitdrukkingen met hulp', proficient: 'herkent zelfstandig 4 basisemoties (blij, boos, verdrietig, bang) en benoemt ze', advanced: 'herkent 6+ emoties inclusief genuanceerder gevoelens en beschrijft waarom iemand zo voelt' },
      { skill: 'Emotioneel vocabulaire', emerging: 'gebruikt 2\u20133 emotiewoorden (blij, boos) in dagelijks taalgebruik', proficient: 'gebruikt 5\u20136 emotiewoorden en koppelt ze aan situaties', advanced: 'gebruikt 8+ emotiewoorden, beschrijft nuances en drukt eigen gevoelens verbaal uit' },
      { skill: 'Emotie-expressie via tekenen', emerging: 'tekent een gezicht met mond omhoog (blij) of omlaag (verdrietig)', proficient: 'tekent herkenbare gezichtsuitdrukkingen voor 4 basisemoties', advanced: 'tekent gedetailleerde emotie-gezichten en voegt lichaamstaal toe aan de tekening' },
    ],
  },

  'fairy-tales': {
    seoTitle: 'Sprookjes-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare sprookjes-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'sprookjes kleuterschool, sprookjes oefeningen 3\u20134 jaar, sprookjes oefeningen kleuterschool, sprookjes uitprintbaar kleuterschool, sprookjes werkbladen kleuterschool, sprookjes activiteiten kleuterschool, sprookjes leerbladen 3\u20134 jaar, sprookjes gratis kleuterschool, sprookjes PDF kleuterschool, sprookjes kleuren',
    snippetAnswer: 'Sprookjes-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken prinsessen, draken en kastelen om tellen, volgordes en kleuren te oefenen. De magische sprookjeswereld maakt leren tot een avontuur. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het sprookjesthema heeft een bijzondere pedagogische kracht voor kleuters omdat drie- en vierjarigen zich in de bloeiperiode van het magisch denken bevinden \u2014 ze geloven oprecht in tovenaars, draken en pratende dieren. Dit is geen ontwikkelingsachterstand maar juist een cognitieve prestatie: het vermogen om onzichtbare werelden voor te stellen is de basis voor abstract denken. Sprookjeswerkbladen benutten deze verbeeldingskracht door verhaalvolgordes te laten ordenen (eerst, dan, daarna), karakters te tellen en sprookjessc\u00e8nes te kleuren. De SLO-leerlijnen benadrukken het belang van verhaalbegrip en verbeelding, en sprookjesthema\u2019s vervullen beide doelen wanneer kinderen verhaalstructuren verkennen via werkbladen die ze als magisch ervaren.',
    developmentalMilestones: [
      { milestone: 'Verhaalbegrip (3\u20134-jarigen beginnen een begin, midden en einde in verhalen te herkennen)', howWeAddress: 'Verhaalvolgorde-activiteiten waarbij kinderen sprookjessc\u00e8nes in de juiste volgorde leggen (de wolf blaast, het huisje valt om)' },
      { milestone: 'Verbeeldingsspel en magisch denken (bloeiperiode bij kleuters)', howWeAddress: 'Kleur- en tekenactiviteiten met sprookjesfiguren voeden de verbeeldingskracht die de basis vormt voor creatief en abstract denken' },
      { milestone: 'Tellen in verhaalcontext (kleuters tellen karakters en voorwerpen in sc\u00e8nes)', howWeAddress: 'Telactiviteiten met sprookjeselementen (drie biggetjes, zeven dwergen) verbinden getalbegrip met bekende verhalen' },
      { milestone: 'Fijnmotorische expressie via gedetailleerd kleuren', howWeAddress: 'Kleurplaten van kastelen, kronen en sprookjesfiguren met toenemende detaillering dagen de fijne motoriek uit' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met bekende sprookjes (De drie biggetjes, Roodkapje), beperk verhaalvolgorde tot drie stappen, en bied grote kleurplaten met dikke lijnen. Voor gevorderde kleuters: introduceer minder bekende sprookjes, voeg schrijfoefeningen toe met sprookjeswoorden, en laat kinderen hun eigen sprookjeseinde bedenken en tekenen.',
    parentTakeaway: 'Sprookjes zijn een van de krachtigste leermiddelen voor jonge kinderen. Lees elke avond een sprookje voor en praat na over wat er gebeurde: wie waren de personages? Wat gebeurde er eerst? Hoe liep het af? Na een sprookjeswerkblad kunt u uw kind het verhaal laten naspelen met poppen of knuffels. Maak samen een sprookjesboek door tekeningen van uw kind in te binden \u2014 dit geeft het kind het gevoel een echte auteur te zijn.',
    classroomIntegration: 'Het sprookjesthema biedt een rijk kader voor de kleuterschool: in de kring worden sprookjes voorgelezen en nagespeeld, bij werkhoeken worden volgorde- en kleurbladen gemaakt, in de poppenhoek worden sprookjes nagespeeld met kostuums, en in de knutselhoek worden kronen en toverstokken gemaakt. Dit sluit aan bij de SLO-doelen voor taalontwikkeling, verhaalbegrip en creatieve expressie.',
    assessmentRubric: [
      { skill: 'Verhaalbegrip (sprookjescontext)', emerging: 'benoemt 1\u20132 personages uit een bekend sprookje met hulp', proficient: 'vertelt de hoofdlijn van een sprookje na met begin, midden en einde', advanced: 'vergelijkt sprookjes, identificeert herhalende patronen en bedenkt alternatieve eindes' },
      { skill: 'Verhaalvolgorde', emerging: 'ordent 2 sprookjessc\u00e8nes in de juiste volgorde met hulp', proficient: 'ordent zelfstandig 3\u20134 sc\u00e8nes in de juiste volgorde', advanced: 'ordent 5+ sc\u00e8nes en beschrijft wat er tussen elke sc\u00e8ne gebeurt' },
      { skill: 'Creatieve expressie via sprookjeskleuren', emerging: 'kleurt sprookjesfiguren met willekeurige kleuren buiten de lijnen', proficient: 'kleurt binnen de lijnen met bewuste kleurkeuze passend bij het personage', advanced: 'kleurt gedetailleerd, voegt eigen sprookjeselementen toe en vertelt een verhaal bij de tekening' },
    ],
  },

  farm: {
    seoTitle: 'Boerderij-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare boerderij-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'boerderij kleuterschool, boerderij oefeningen 3\u20134 jaar, boerderij oefeningen kleuterschool, boerderij uitprintbaar kleuterschool, boerderij werkbladen kleuterschool, boerderij activiteiten kleuterschool, boerderij leerbladen 3\u20134 jaar, boerderij gratis kleuterschool, boerderij PDF kleuterschool, boerderij kleuren',
    snippetAnswer: 'Boerderij-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken koeien, kippen en tractoren om tellen, sorteren en kleuren te oefenen. De vertrouwde boerderijwereld maakt leren herkenbaar en motiverend. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het boerderijthema is bijzonder effectief voor kleuters omdat drie- en vierjarigen de boerderij ervaren als een fascinerende wereld vol dieren, voertuigen en dagelijkse routines. De boerderij biedt een rijke context voor tellen (hoeveel kippen?), sorteren (welke dieren geven melk?) en classificeren (boerderijdieren versus huisdieren). Nederland heeft een sterke agrarische traditie, waardoor veel kinderen een herkenbare verbinding hebben met het boerderijthema. De SLO-leerlijnen benadrukken het belang van wereldori\u00ebntatie en het begrijpen van waar voedsel vandaan komt, en boerderijwerkbladen vervullen dit doel op een speelse, gestructureerde manier. Het kleuren van boerderijsc\u00e8nes ontwikkelt tegelijkertijd de fijne motoriek.',
    developmentalMilestones: [
      { milestone: 'Classificatie van dieren (3\u20134-jarigen leren boerderijdieren onderscheiden van andere dieren)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen boerderijdieren groeperen en onderscheiden van wilde dieren en huisdieren' },
      { milestone: 'Tellen met \u00e9\u00e9n-op-\u00e9\u00e9n-correspondentie (kleuters tellen voorwerpen door aanwijzen)', howWeAddress: 'Telactiviteiten met boerderijdieren en producten (tel de eieren, tel de koeien) bouwen nauwkeurig tellen op' },
      { milestone: 'Oorzaak-gevolg begrip (koe geeft melk, kip legt eieren)', howWeAddress: 'Koppelactiviteiten waarbij boerderijdieren worden verbonden met hun producten stimuleren logisch redeneren' },
      { milestone: 'Fijnmotorische ontwikkeling bij kleuren', howWeAddress: 'Kleurplaten van boerderijsc\u00e8nes met tractoren, schuren en dieren bieden variatie in detailniveau voor progressieve motorische ontwikkeling' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: beperk tot vier basisdieren (koe, kip, varken, paard), gebruik plastic boerderijdieren als concrete aanvulling, en richt u op \u00e9\u00e9n vaardigheid per werkblad. Voor gevorderde kleuters: introduceer meer dieren en hun producten, voeg beginletters van dierennamen toe, en laat kinderen hun eigen boerderij ontwerpen en de dieren tellen.',
    parentTakeaway: 'De boerderij is een fantastisch thema om thuis mee te werken. Sorteer plastic boerderijdieren, lees samen boerderijboeken en bespreek waar melk, eieren en groenten vandaan komen. Een bezoek aan een kinderboerderij maakt het werkblad levend \u2014 uw kind kan de dieren die het heeft gekleurd nu echt aien. Na een boerderijwerkblad kunt u samen koken met een boerderijproduct en bespreken welk dier het heeft geleverd.',
    classroomIntegration: 'Het boerderijthema is een van de populairste thema\u2019s in de kleuterschool: in de kring worden boerderijliedjes gezongen (Boer wat zeg je van mijn kippen), bij werkhoeken worden tel- en kleurbladen gemaakt, in de zandtafel wordt een boerderij nagebouwd, en een uitstapje naar een kinderboerderij vormt het hoogtepunt. Dit sluit aan bij de SLO-doelen voor natuur\u00e9ducatie, wereldori\u00ebntatie en taalontwikkeling.',
    assessmentRubric: [
      { skill: 'Classificatie boerderijdieren', emerging: 'benoemt 2\u20133 boerderijdieren met hulp', proficient: 'benoemt zelfstandig 5\u20136 boerderijdieren en hun producten', advanced: 'classificeert dieren op meerdere kenmerken en vergelijkt boerderijdieren met wilde dieren' },
      { skill: 'Tellen in boerderijcontext', emerging: 'telt 1\u20134 dieren met aanwijzende hulp', proficient: 'telt zelfstandig tot 8\u201310 dieren en noteert het juiste cijfer', advanced: 'telt boven de 10, groepeert en vergelijkt aantallen van verschillende diersoorten' },
      { skill: 'Oorzaak-gevolg begrip', emerging: 'koppelt 1 dier aan zijn product met hulp (kip = ei)', proficient: 'koppelt zelfstandig 3\u20134 dieren aan hun producten', advanced: 'beschrijft de keten van dier naar product naar voedsel en stelt vragen over het proces' },
    ],
  },

  flowers: {
    seoTitle: 'Bloemen-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare bloemen-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'bloemen kleuterschool, bloemen oefeningen 3\u20134 jaar, bloemen oefeningen kleuterschool, bloemen uitprintbaar kleuterschool, bloemen werkbladen kleuterschool, bloemen activiteiten kleuterschool, bloemen leerbladen 3\u20134 jaar, bloemen gratis kleuterschool, bloemen PDF kleuterschool, bloemen kleuren',
    snippetAnswer: 'Bloemen-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken tulpen, zonnebloemen en madeliefjes om tellen, kleuren en patronen te oefenen. De kleurrijke bloemenwereld maakt leren vrolijk en creatief. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het bloementhema is bijzonder geschikt voor kleuters omdat drie- en vierjarigen van nature aangetrokken worden door kleurrijke, visueel opvallende objecten \u2014 en bloemen zijn precies dat. Nederland heeft bovendien een sterke bloementraditie (tulpen, bollenvelden), waardoor bloemen een cultureel herkenbaar thema vormen. Werkbladen met bloemen bieden een rijke context voor het oefenen van kleuren (welke kleur heeft de tulp?), tellen (hoeveel blaadjes?) en patronen herkennen (een rij afwisselende bloemen). Het kleuren van bloemillustraties is een van de meest effectieve fijnmotorische oefeningen voor kleuters, omdat de variatie in bloemvormen verschillende motorische bewegingen vereist. De SLO-leerlijnen benadrukken zowel natuurverkenning als creatieve expressie, en het bloementhema verenigt beide.',
    developmentalMilestones: [
      { milestone: 'Kleurherkenning en -benoeming (3\u20134-jarigen breiden hun kleurvocabulaire uit)', howWeAddress: 'Bloem-kleur-activiteiten waarbij kinderen bloemen in de juiste kleur kleuren versterken de verbinding tussen kleurwoord en visuele waarneming' },
      { milestone: 'Tellen van onderdelen (kleuters leren delen van een geheel tellen)', howWeAddress: 'Blaadjes-tel-activiteiten waarbij kinderen bloemblaadjes tellen bouwen het deel-geheel begrip op' },
      { milestone: 'Patroonherkenning met natuurlijke vormen', howWeAddress: 'Bloemenrij-activiteiten waarbij kinderen kleur- of vormpatronen in een bloemenveld herkennen en voortzetten' },
      { milestone: 'Fijnmotorische expressie via creatief kleuren', howWeAddress: 'Kleurplaten van bloemen met variatie van eenvoudige tulpen tot complexe zonnebloemen bieden progressieve motorische uitdaging' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met drie of vier grote, eenvoudige bloemen, bied drie basiskleuren aan, en combineer met echte bloemen in de klas om te bekijken en te ruiken. Voor gevorderde kleuters: introduceer bloemenpatronen met drie of meer kleuren, voeg blaadjes-tel-opdrachten boven de tien toe, en laat kinderen hun eigen bloemtuin ontwerpen.',
    parentTakeaway: 'Bloemen zijn overal en altijd beschikbaar als leermateriaal. Plant samen een zaadje en volg de groei, tel bloemblaadjes in de tuin, en benoem kleuren van bloemen tijdens wandelingen. Na een bloemenwerkblad kunt u samen een boeket plukken of een bloem tekenen en de blaadjes tellen \u2014 de verbinding tussen werkblad en natuur maakt het leren concreet. Nederland\u2019s bloementraditie biedt bovendien een culturele context die u kunt bespreken.',
    classroomIntegration: 'Het bloementhema past prachtig in de kleuterschool, vooral in het voorjaar: in de kring worden bloemen besproken en gesorteerd, bij werkhoeken worden kleur- en telbladen over bloemen gemaakt, in de natuurhoek staan echte bloemen om te observeren en tekenen, en op het schoolplein worden bloemen gezocht en benoemd. Dit sluit aan bij de SLO-doelen voor natuur\u00e9ducatie, rekenvaardigheid en kunstzinnige ori\u00ebntatie.',
    assessmentRubric: [
      { skill: 'Kleurherkenning via bloemen', emerging: 'benoemt 2\u20133 basiskleuren van bloemen met hulp', proficient: 'benoemt zelfstandig 5\u20136 kleuren en koppelt ze aan specifieke bloemen', advanced: 'beschrijft kleurvariaties (lichtroze versus donkerroze) en benoemt 8+ kleuren' },
      { skill: 'Tellen van bloemen/blaadjes', emerging: 'telt 1\u20134 bloemen of blaadjes met aanwijzende hulp', proficient: 'telt zelfstandig tot 8\u201310 en noteert het juiste cijfer', advanced: 'telt boven de 10, vergelijkt aantallen blaadjes van verschillende bloemen' },
      { skill: 'Bloempatronen herkennen', emerging: 'herkent een AB-kleurpatroon in een bloemenrij met hulp', proficient: 'zet zelfstandig AB- en ABC-patronen voort en benoemt de regel', advanced: 'cre\u00ebert eigen bloemenpatronen en past de regelkennis toe op nieuwe contexten' },
    ],
  },

  food: {
    seoTitle: 'Eten-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare eten-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'eten kleuterschool, eten oefeningen 3\u20134 jaar, eten oefeningen kleuterschool, eten uitprintbaar kleuterschool, eten werkbladen kleuterschool, eten activiteiten kleuterschool, eten leerbladen 3\u20134 jaar, eten gratis kleuterschool, eten PDF kleuterschool, eten kleuren',
    snippetAnswer: 'Eten-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken fruit, groenten en brood om tellen, sorteren en kleuren te oefenen. Het herkenbare etenthema maakt leren dagelijks en betekenisvol. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het etenthema is een van de meest toegankelijke thema\u2019s voor kleuters, omdat drie- en vierjarigen dagelijks meerdere keren met eten in aanraking komen \u2014 bij het ontbijt, de lunch, het tussendoortje en het avondeten. Deze vertrouwdheid maakt voedsel tot een krachtig leerthema: kinderen sorteren voedsel op kleur, vorm en voedselgroep, tellen stuks fruit en leren over gezonde keuzes. Het Nederlandse Schijf van Vijf biedt een cultureel herkenbaar kader. De SLO-leerlijnen benadrukken het belang van gezondheid en bewuste voeding, en etenwerkbladen vervullen dit educatieve doel terwijl ze tegelijkertijd rekenkundige vaardigheden en fijne motoriek ontwikkelen.',
    developmentalMilestones: [
      { milestone: 'Classificatie van voedsel (3\u20134-jarigen beginnen voedsel te groeperen op kenmerken)', howWeAddress: 'Sorteeractiviteiten waarbij kinderen fruit, groenten en brood groeperen bouwen het classificatievermogen op' },
      { milestone: 'Tellen van voedselitems (opbouw van \u00e9\u00e9n-op-\u00e9\u00e9n-correspondentie)', howWeAddress: 'Telactiviteiten met appels, broodjes en wortels bouwen nauwkeurig tellen op via vertrouwde voorwerpen' },
      { milestone: 'Kleurherkenning via voedselkleuren (rood = aardbei, geel = banaan)', howWeAddress: 'Kleur-koppelactiviteiten waarbij voedsel aan de juiste kleur wordt gekoppeld versterken kleurkennis via betekenisvolle contexten' },
      { milestone: 'Fijnmotorische controle bij kleuren van kleine vormen', howWeAddress: 'Kleurplaten met fruit en groenten in verschillende groottes oefenen precieze motorische controle en greepverfijning' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met vijf herkenbare voedselitems (appel, brood, wortel, melk, ei), bied grote contouren aan, en combineer met echt voedsel om te bekijken en benoemen. Voor gevorderde kleuters: introduceer voedselgroepen en de Schijf van Vijf, voeg tellopdrachten boven de tien toe, en laat kinderen een gezond bord samenstellen en beschrijven.',
    parentTakeaway: 'Eten biedt dagelijks leerkansen. Laat uw kind helpen bij het klaarzetten van de tafel en tel samen de borden, sorteer boodschappen in de koelkast op soort, en benoem kleuren van fruit en groenten. Na een etenwerkblad kunt u samen een salade maken en de ingredi\u00ebnten tellen en benoemen. Bespreek welk eten gezond is en waarom \u2014 drie- en vierjarigen zijn verrassend ge\u00efnteresseerd in de vraag waar hun eten vandaan komt.',
    classroomIntegration: 'Het etenthema biedt dagelijkse verbindingen in de kleuterschool: bij het fruit eten wordt geteld en gesorteerd, in de kring worden voedselgroepen besproken, bij werkhoeken worden eten-werkbladen gecombineerd met een speelkeukenhoek, en regelmatig wordt er samen gekookt of gesneden. Dit sluit aan bij de SLO-doelen voor gezondheidsbevordering, rekenvaardigheid en wereldori\u00ebntatie.',
    assessmentRubric: [
      { skill: 'Classificatie van voedsel', emerging: 'sorteert 2\u20133 voedselitems in fruit/niet-fruit met hulp', proficient: 'sorteert zelfstandig voedsel in 3 groepen (fruit, groenten, brood)', advanced: 'classificeert voedsel op meerdere kenmerken en benoemt voedselgroepen' },
      { skill: 'Tellen van voedselitems', emerging: 'telt 1\u20134 items met aanwijzende hulp', proficient: 'telt zelfstandig tot 8\u201310 items en noteert het juiste cijfer', advanced: 'telt boven de 10, vergelijkt hoeveelheden en lost eenvoudige optelvragen op' },
      { skill: 'Voedselkleuren herkennen', emerging: 'koppelt 2\u20133 voedselitems aan de juiste kleur met hulp', proficient: 'koppelt zelfstandig 5\u20136 items aan hun kleur en kleurt ze correct', advanced: 'beschrijft kleurvariaties (lichtgroen, donkerrood) en benoemt voedsel met die kleur' },
    ],
  },

  forest: {
    seoTitle: 'Bos-oefeningen Kleuterschool | LessonCraftStudio',
    seoDescription: 'Uitprintbare bos-oefeningen voor kleuterschool (3\u20134 jaar). Kleuren, tellen tot 10 en fijne motoriek. 33 generatoren. Download en print. Gratis PDF.',
    seoKeywords: 'bos kleuterschool, bos oefeningen 3\u20134 jaar, bos oefeningen kleuterschool, bos uitprintbaar kleuterschool, bos werkbladen kleuterschool, bos activiteiten kleuterschool, bos leerbladen 3\u20134 jaar, bos gratis kleuterschool, bos PDF kleuterschool, bos kleuren',
    snippetAnswer: 'Bos-oefeningen voor de kleuterschool (3\u20134 jaar) gebruiken bomen, bladeren en bosdieren om tellen, sorteren en kleuren te oefenen. Het bosthema verbindt natuur\u00e9ducatie met rekenvaardigheid en fijne motoriek. Gratis uitprintbare PDF-werkbladen op LessonCraftStudio.',
    uniqueGradeAngle: 'Het bosthema is bijzonder waardevol voor kleuters omdat drie- en vierjarigen het bos ervaren als een magische wereld vol ontdekkingen \u2014 hoge bomen, raselende bladeren, verborgen dieren en paddenstoelen. Deze verwondering is de krachtigste motivator voor leren op deze leeftijd. Boswerkbladen benutten deze fascinatie door kinderen bomen en bladeren te laten tellen, bosdieren te sorteren en bossc\u00e8nes te kleuren. Nederland heeft veel bossen die toegankelijk zijn voor jonge kinderen, waardoor werkbladen direct kunnen aansluiten bij echte boservaringen. De SLO-leerlijnen benadrukken het belang van natuur\u00e9ducatie en buitenspel, en het bosthema vervult beide doelen wanneer werkbladen gecombineerd worden met buitenactiviteiten.',
    developmentalMilestones: [
      { milestone: 'Natuurwaarneming (3\u20134-jarigen leren bewust kijken naar hun natuurlijke omgeving)', howWeAddress: 'Observatie-activiteiten waarbij kinderen bosobjecten op werkbladen herkennen van echte boswandelingen bouwen waarnemingsvermogen op' },
      { milestone: 'Tellen van natuurobjecten (opbouw van getalbegrip via concrete voorwerpen)', howWeAddress: 'Telactiviteiten met bomen, bladeren en paddenstoelen bouwen getalbegrip op in een rijke natuurcontext' },
      { milestone: 'Seizoensbesef (kleuters beginnen te begrijpen dat het bos er per seizoen anders uitziet)', howWeAddress: 'Seizoens-koppelactiviteiten waarbij kinderen bossc\u00e8nes aan het juiste seizoen koppelen (herfstbladeren, sneeuw, bloesem)' },
      { milestone: 'Fijnmotorische expressie bij natuurtekeningen', howWeAddress: 'Kleurplaten van bossc\u00e8nes met variatie in complexiteit van eenvoudige bomen tot gedetailleerde boslandschappen bieden progressieve motorische uitdaging' },
    ],
    differentiationNotes: 'Voor kleuters die extra ondersteuning nodig hebben: gebruik werkbladen met herkenbare bosobjecten (boom, blad, paddenstoel, egel), bied grote contouren aan, en combineer met een echte boswandeling of bladeren in de klas. Voor gevorderde kleuters: introduceer meer bosdieren en boomsoorten, voeg seizoensvergelijkingen toe, en laat kinderen hun eigen bossc\u00e8ne ontwerpen met een bepaald aantal bomen en dieren.',
    parentTakeaway: 'Het bos is het mooiste klaslokaal dat er bestaat. Maak regelmatig boswandelingen en verzamel samen bladeren, dennenappels en kastanjes om thuis te tellen en sorteren. Na een boswerkblad kunt u een bladerenpers maken of een herfstcollage plakken. Benoem bomen, dieren en seizoensveranderingen tijdens uw wandeling \u2014 uw kind leert woordenschat, natuurkennis en getalbegrip tegelijk terwijl het geniet van de frisse lucht.',
    classroomIntegration: 'Het bosthema is een van de rijkste thema\u2019s voor de kleuterschool: in de kring worden bosboeken voorgelezen en seizoensveranderingen besproken, bij werkhoeken worden bos-werkbladen gecombineerd met een natuurtafel vol bosvondsten, op het schoolplein wordt een speurbos-activiteit georganiseerd, en regelmatig wordt er een boswandeling gemaakt. Dit sluit aan bij de SLO-doelen voor natuur\u00e9ducatie, rekenvaardigheid en bewegingsonderwijs.',
    assessmentRubric: [
      { skill: 'Natuurherkenning (bosobjecten)', emerging: 'benoemt 2\u20133 bosobjecten (boom, blad, paddenstoel) met hulp', proficient: 'benoemt zelfstandig 5\u20136 bosobjecten en beschrijft een kenmerk per object', advanced: 'benoemt 8+ bosobjecten, vergelijkt ze en koppelt ze aan seizoenen' },
      { skill: 'Tellen van natuurvoorwerpen', emerging: 'telt 1\u20135 objecten (bomen, bladeren) met aanwijzende hulp', proficient: 'telt zelfstandig tot 10 en noteert het juiste cijfer', advanced: 'telt boven de 10 en vergelijkt hoeveelheden tussen categorie\u00ebn (meer bomen dan paddenstoelen)' },
      { skill: 'Seizoenssortering (bossc\u00e8nes)', emerging: 'identificeert zomer en winter met hulp van een volwassene', proficient: 'sorteert zelfstandig bossc\u00e8nes in 3\u20134 seizoenen', advanced: 'beschrijft seizoensveranderingen en legt uit waarom het bos er anders uitziet' },
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
