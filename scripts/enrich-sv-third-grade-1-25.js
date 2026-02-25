#!/usr/bin/env node
/**
 * SEO Part 297: SV Third-Grade Enrichment \u2014 Themes 1-25
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the third-grade grade block of 25 SV theme files (alphabet through household).
 *
 * CRITICAL DIFFERENCE from second-grade scripts: third-grade is the LAST grade block,
 * so the end boundary is the top-level `// -- FAQ --` comment, not another grade marker.
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    seoTitle: 'Gratis Alfabet\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara alfabet\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Morfologisk analys, ordlistef\u00e4rdigheter och skrivstilsintroduktion. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'alfabet\u00f6vningar \u00e5rskurs 3, morfologisk analys 8\u20139 \u00e5r, rotord prefix suffix, ordlistef\u00e4rdigheter, skrivstil \u00f6vningar, Lgr22 svenska, ordfamiljer, uppslagsord, fleravstyckesskrivning, ordkunskap',
    snippetAnswer: 'Alfabet\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar avancerad morfologisk analys med rotord, prefix och suffix, ordlistef\u00e4rdigheter med uppslagsord och uttalsbeteckningar, skrivstilsintroduktion samt sj\u00e4lvst\u00e4ndig skrivning av forskningsrapporter med k\u00e4llh\u00e4nvisning och styckestruktur. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 \u00e4r alfabetet ett avancerat forskningsverktyg \u2014 \u00e5tta- och nio\u00e5ringar beh\u00e4rskar ordlistanv\u00e4ndning med uppslagsord, uttalsbeteckningar och flera definitioner, bryter ner ok\u00e4nda ord i rotord med prefix och suffix (o-hjlp-sam, f\u00f6r-st\u00e5-else) och anv\u00e4nder alfabetisk ordning f\u00f6r att navigera i register, ordlistor och uppslagsverk. Skrivstil introduceras systematiskt med streckmgrupper. Ordfamiljsunders\u00f6kningar avsl\u00f6jar hur ett enda rotord genererar dussintals relaterade ord. Skrivande av fleravstycke-rapporter med \u00e4mnesmeningar, st\u00f6djande detaljer och k\u00e4llor kr\u00e4ver avancerad styckestruktur. Kryptogram och avancerade ordf\u00f6rvrngningar tr\u00e4nar logiskt t\u00e4nkande. Lgr22:s m\u00e5l f\u00f6r l\u00e4sning, ordkunskap och skriftlig produktion i \u00e5rskurs 3 st\u00f6ds direkt.',
    developmentalMilestones: [
      { milestone: 'Avancerad morfologisk analys (8\u20139-\u00e5ringar bryter ner ord i rotord, prefix och suffix)', howWeAddress: 'Rotordsunders\u00f6kningar d\u00e4r eleverna kartl\u00e4gger ordfamiljer visuellt och f\u00f6rklarar hur affix f\u00f6r\u00e4ndrar betydelse' },
      { milestone: 'Ordlisteforskning med uppslagsord och uttalsbeteckningar (sj\u00e4lvst\u00e4ndig referensanv\u00e4ndning)', howWeAddress: 'Ordlistedetektiv-\u00f6vningar d\u00e4r eleverna anv\u00e4nder uppslagsord f\u00f6r att lokalisera ord, tolkar uttalsnycklar och v\u00e4ljer r\u00e4tt definition' },
      { milestone: 'Skrivstilsintroduktion (streckmgrupper och bokstavsf\u00f6rbindelser)', howWeAddress: 'Skrivstils\u00f6vningsblad med streckmgrupper, f\u00f6rbindelsebokst\u00e4ver och avskrivning av korta texter' },
      { milestone: 'Fleravstyckekomposition med styckestruktur (\u00e4mnesmening, detaljer, avslutning)', howWeAddress: 'Forskningsrapportmallar med styckeram som v\u00e4gleder eleverna fr\u00e5n k\u00e4llinsamling till strukturerad rapport' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tvstaviga ord med ett prefix, erbjud f\u00f6renklad ordlista med bildst\u00f6d och ge skrivstils\u00f6vningar med extra stora bokst\u00e4ver. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs trestaviga ord med flera affix, etymologisk analys med ordhistoria och sj\u00e4lvst\u00e4ndig forskningsrapport med flera k\u00e4llor till.',
    parentTakeaway: 'Lek orddetektiv p\u00e5 h\u00f6g niv\u00e5: hitta rotordet i \u201dof\u00f6rst\u00e5elig\u201d och f\u00f6rklara vad prefixet \u201do\u201d och suffixet \u201delig\u201d g\u00f6r med betydelsen. Sl\u00e5 upp ett nytt ord i ordlistan och l\u00e4s b\u00e5de uttalsvejledning och definition. \u00d6va skrivstil genom att skriva vykort till mor- och farf\u00f6r\u00e4ldrar. Ordkunskapen exploderar n\u00e4r barnet f\u00f6rst\u00e5r ordens byggstenar.',
    classroomIntegration: 'Alfabet\u00f6vningar i \u00e5rskurs 3 fungerar som forskningsverktyg tv\u00e4rs \u00f6ver alla \u00e4mnen: rotordsanalys introducerar \u00e4mnestermer i NO och SO, ordlistuppgifter st\u00f6djer sj\u00e4lvst\u00e4ndig l\u00e4sning, skrivstil anv\u00e4nds i dagligt skrivande och forskningsrapporter med k\u00e4llor tr\u00e4nas i projektarbete. Lgr22:s m\u00e5l f\u00f6r l\u00e4sning, ordkunskap och skriftlig produktion st\u00f6ds systematiskt.',
    assessmentRubric: [
      { skill: 'Morfologisk analys (rotord, prefix, suffix)', emerging: 'identifierar rotordet i sammansatta ord med st\u00f6d och namnger ett prefix', proficient: 'bryter sj\u00e4lvst\u00e4ndigt ner flerstaviga ord i rot, prefix och suffix och f\u00f6rklarar betydelsef\u00f6r\u00e4ndringen', advanced: 'analyserar etymologi, kartl\u00e4gger ordfamiljer och till\u00e4mpar morfologisk analys strategiskt p\u00e5 ok\u00e4nda \u00e4mnesord' },
      { skill: 'Ordlistanv\u00e4ndning och referensforskning', emerging: 'hittar ord i en enkel ordlista med alfabetisk ordning efter f\u00f6rsta bokstav', proficient: 'anv\u00e4nder sj\u00e4lvst\u00e4ndigt uppslagsord, tolkar uttalsnycklar och v\u00e4ljer r\u00e4tt definition bland flera', advanced: 'navigerar flytande i ordlista, uppslagsverk och register, korsrefererar k\u00e4llor och bed\u00f6mer definitioners kontext' },
      { skill: 'Fleravstyckekomposition med styckestruktur', emerging: 'skriver ett stycke med \u00e4mnesmening och 2\u20133 detaljer med st\u00f6d fr\u00e5n ram', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en rapport med flera stycken, k\u00e4llor och logisk struktur', advanced: 'skriver en v\u00e4lstrukturerad rapport med inledning, hovuddel, avslutning, k\u00e4llf\u00f6rteckning och stycke\u00f6verg\u00e5ngar' },
    ],
  },

  animals: {
    seoTitle: 'Gratis Djur\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara djur\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Multiplikation, division, br\u00e5k, linjediagram och forskningsrapporter med djurtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'djur\u00f6vningar \u00e5rskurs 3, multiplikation division djur, linjediagram data, br\u00e5k n\u00e4ringskedja, forskningsrapport djur 8\u20139 \u00e5r, areal omkrets habitat, Lgr22 matematik, klassificering systematik, ekosystem, j\u00e4mf\u00f6rande rapport',
    snippetAnswer: 'Djur\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar multiplikation och division inom 100 med djurpopulationer, br\u00e5k med n\u00e4ringskedjor, j\u00e4mf\u00f6rande forskningsrapporter med flera k\u00e4llor och datatolkning med linje- och stapeldiagram. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir djurtemat ett tv\u00e4rvetenskapligt forskningsprojekt p\u00e5 h\u00f6g niv\u00e5 \u2014 \u00e5tta- och nio\u00e5ringar beh\u00e4rskar multiplikation och division inom 100 med djurpopulationsdata (72 f\u00e5glar f\u00f6rdelade p\u00e5 8 tr\u00e4d = 9 per tr\u00e4d), arbetar med br\u00e5k i n\u00e4ringskedjor (en tredjedel av v\u00e4xt\u00e4tarna \u00e4r bytesdjur) och analyserar djurdata i linjediagram \u00f6ver tid. J\u00e4mf\u00f6rande forskningsrapporter med flera k\u00e4llor kr\u00e4ver parafrasering, k\u00e4llh\u00e4nvisning och strukturerade stycken. Areal och omkrets ber\u00e4knas f\u00f6r djurhabitat. M\u00e5ttomvandlingar mellan cm, m och km anv\u00e4nds f\u00f6r djuravst\u00e5nd. Klassificering utvidgas till systematik med rike, stam och klass. Lgr22:s m\u00e5l f\u00f6r multiplikation, division, data och skriftlig rapportering i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Multiplikation och division inom 100 (8\u20139-\u00e5ringar beh\u00e4rskar tabeller och omv\u00e4nda operationer)', howWeAddress: 'Djurpopulationsuppgifter med multiplikation och division d\u00e4r eleverna verifierar med omv\u00e4nd operation' },
      { milestone: 'Linjediagram \u00f6ver tid (datatolkning med trender)', howWeAddress: 'Djurbest\u00e5ndsdiagram \u00f6ver m\u00e5nader d\u00e4r eleverna avl\u00e4ser trender och formulerar slutsatser' },
      { milestone: 'J\u00e4mf\u00f6rande forskningsrapport med flera k\u00e4llor', howWeAddress: 'Forskningsrapportmallar med krav p\u00e5 minst tv\u00e5 k\u00e4llor, parafrasering och k\u00e4llf\u00f6rteckning' },
      { milestone: 'Areal och omkrets med djurhabitat (ber\u00e4kning i cm\u00b2 och cm)', howWeAddress: 'Habitat-areal\u00f6vningar d\u00e4r eleverna ber\u00e4knar areal och omkrets av inhsgnader och j\u00e4mf\u00f6r storlekar' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa tabellerna till 2, 5 och 10, anv\u00e4nd enkla stapeldiagram och erbjud rapportmallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs division med rest, linjediagram med tv\u00e5 dataserier och sj\u00e4lvst\u00e4ndig j\u00e4mf\u00f6rande analys av tre arter med statistik till.',
    parentTakeaway: 'Starta ett djurforskningsprojekt med tv\u00e5 k\u00e4llor: en bok och en webbsida. R\u00e4kna med djurdata: \u201d84 fiskar f\u00f6rdelade p\u00e5 7 akvarier \u2014 hur m\u00e5nga i varje?\u201d. Rita ett linjediagram \u00f6ver f\u00e5glar vid f\u00e5gelbr\u00e4det under fyra veckor. Ber\u00e4kna arealen av hundkorgen. Djurmatematik i \u00e5rskurs 3 handlar om precision och systematik.',
    classroomIntegration: 'Djurtemat i \u00e5rskurs 3 \u00e4r \u00e5rsprojektets k\u00e4rna: NO-lektionen med systematik och ekosystem, matematiklektionen med multiplikation, division och diagram, svenskalektionen med j\u00e4mf\u00f6rande rapporter och presentationer. Ett klassforskningsbibliotek med elevrapporter byggs upp l\u00f6pande. Lgr22:s m\u00e5l f\u00f6r multiplikation, division, data och rapportering st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Multiplikation och division inom 100 (djurkontext)', emerging: 'l\u00f6ser multiplikation i 2-, 5- och 10-tabellen med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt multiplikation och division inom 100 och verifierar med omv\u00e4nd operation', advanced: 'l\u00f6ser flerstegsuppgifter med b\u00e5de multiplikation och division, formulerar egna uppgifter och f\u00f6rklarar strategier' },
      { skill: 'Linjediagram och datatolkning', emerging: 'avl\u00e4ser enkla stapeldiagram och besvarar fr\u00e5gor med st\u00f6d', proficient: 'skapar och tolkar sj\u00e4lvst\u00e4ndigt linjediagram, identifierar trender och formulerar slutsatser', advanced: 'j\u00e4mf\u00f6r tv\u00e5 linjediagram, f\u00f6rklarar orsaker till trender och f\u00f6resl\u00e5r prognoser baserade p\u00e5 data' },
      { skill: 'J\u00e4mf\u00f6rande djurforskningsrapport', emerging: 'skriver en rapport med en k\u00e4lla och meningsstartare', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en j\u00e4mf\u00f6rande rapport med tv\u00e5 k\u00e4llor, parafrasering och k\u00e4llf\u00f6rteckning', advanced: 'skriver en detaljerad rapport med tre k\u00e4llor, korsreferenser, datadiagram och perspektivering' },
    ],
  },

  birds: {
    seoTitle: 'Gratis F\u00e5gel\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara f\u00e5gel\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Linjediagram med s\u00e4songdata, division med f\u00e5gelflocktal och vetenskapliga rapporter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'f\u00e5gel\u00f6vningar \u00e5rskurs 3, linjediagram s\u00e4songdata, division f\u00e5glar 8\u20139 \u00e5r, areal f\u00e5gelhabitat, vetenskaplig rapport, Lgr22 NO, ornitologi, m\u00e5ttomvandling cm m km, br\u00e5k f\u00e5glar, hypotes metod',
    snippetAnswer: 'F\u00e5gel\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar linjediagram med s\u00e4songdata, division med f\u00e5gelflocktal, areal av f\u00e5gelhabitat, m\u00e5ttomvandling cm/m/km och sj\u00e4lvst\u00e4ndig skrivning av ornitologiska forskningsrapporter med hypotes och slutsats. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir f\u00e5geltemat ett vetenskapligt forskningsprojekt \u2014 \u00e5tta- och nio\u00e5ringar genomf\u00f6r s\u00e4songsbaserade f\u00e5gelr\u00e4kningar, registrerar resultat i linjediagram \u00f6ver fyra s\u00e4songer och analyserar trender. Division med f\u00e5gelflockdata (96 storkar f\u00f6rdelade p\u00e5 8 flockar = 12 per flock) ger division i naturkontext. Areal och omkrets ber\u00e4knas f\u00f6r f\u00e5gelreservat i m\u00b2. M\u00e5ttomvandling mellan cm, m och km anv\u00e4nds f\u00f6r flyttf\u00e5gelrutter. Forskningsrapporter med hypotes, metod, resultat och slutsats tr\u00e4nar fullst\u00e4ndig vetenskaplig metod. Br\u00e5k anv\u00e4nds f\u00f6r f\u00e5gelandelar (tre \u00e5ttondelar av f\u00e5glarna \u00e4r flyttf\u00e5glar). Lgr22:s m\u00e5l f\u00f6r naturvetenskaplig unders\u00f6kning, data och rapportering i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Linjediagram med s\u00e4songdata (8\u20139-\u00e5ringar analyserar trender \u00f6ver tid)', howWeAddress: 'S\u00e4songs-f\u00e5gelr\u00e4knings\u00f6vningar med linjediagram \u00f6ver fyra s\u00e4songer d\u00e4r eleverna identifierar och f\u00f6rklarar trender' },
      { milestone: 'Division i naturkontext (f\u00f6rdelning av f\u00e5glar i flockar med och utan rest)', howWeAddress: 'F\u00e5gelflock-divisions\u00f6vningar d\u00e4r eleverna f\u00f6rdelar f\u00e5glar j\u00e4mnt och hanterar rest med f\u00f6rklaring' },
      { milestone: 'Vetenskaplig rapport med hypotes och slutsats', howWeAddress: 'F\u00e5gelforskningsmallar med fyra sektioner (hypotes, metod, resultat, slutsats) som v\u00e4gleder vetenskapligt skrivande' },
      { milestone: 'Areal och omkrets av f\u00e5gelhabitat (ber\u00e4kning i m\u00b2 och m)', howWeAddress: 'Habitat-\u00f6vningar d\u00e4r eleverna ber\u00e4knar areal och omkrets av f\u00e5gelholksomr\u00e5den och j\u00e4mf\u00f6r storlekar' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd enkla stapeldiagram med tv\u00e5 s\u00e4songer, h\u00e5ll division inom 50 och erbjud rapportmallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs dubbla linjediagram, division med rest och decimaler samt sj\u00e4lvst\u00e4ndig f\u00e5gelforskningsrapport med statistisk analys och k\u00e4llv\u00e4rdering till.',
    parentTakeaway: 'F\u00f6r en s\u00e4songsf\u00e5geldagbok: r\u00e4kna f\u00e5glar vid f\u00e5gelbr\u00e4det en g\u00e5ng i m\u00e5naden och rita ett linjediagram \u00f6ver \u00e5ret. R\u00e4kna med f\u00e5geltal: \u201d72 starar f\u00f6rdelade p\u00e5 6 flockar \u2014 hur m\u00e5nga i varje flock?\u201d. Ber\u00e4kna arealen av f\u00e5gelbr\u00e4det. M\u00e4t avst\u00e5nd i tr\u00e4dg\u00e5rden i meter och omvandla till cm. F\u00e5geltemat \u00e4r naturvetenskap, matematik och skrivning i ett.',
    classroomIntegration: 'F\u00e5geltemat i \u00e5rskurs 3 k\u00f6rs som \u00e5rsprojekt med m\u00e5natliga datainsamlingar: matematiklektionen med linjediagram, division och arealber\u00e4kning, NO-lektionen med systematisk artsobservation och ekologi, svenskalektionen med forskningsrapporter enligt vetenskaplig metod. Ett klassornitologiarkiv byggs upp l\u00f6pande. Lgr22:s m\u00e5l f\u00f6r data, naturvetenskap och rapportering st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Linjediagram med s\u00e4songdata', emerging: 'avl\u00e4ser ett enkelt stapeldiagram med st\u00f6d och besvarar enkla fr\u00e5gor', proficient: 'skapar och tolkar sj\u00e4lvst\u00e4ndigt linjediagram \u00f6ver fyra s\u00e4songer och beskriver trender', advanced: 'j\u00e4mf\u00f6r tv\u00e5 linjediagram, f\u00f6resl\u00e5r f\u00f6rklaringar till trender och formulerar prognoser' },
      { skill: 'Division med f\u00e5geldata', emerging: 'f\u00f6rdelar 20\u201330 f\u00e5glar i 2\u20133 lika grupper med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt division inom 100, hanterar rest och verifierar med multiplikation', advanced: 'l\u00f6ser flerstegs divisionsuppgifter, formulerar egna uppgifter och f\u00f6rklarar sambandet med br\u00e5k' },
      { skill: 'Vetenskaplig f\u00e5gelforskningsrapport', emerging: 'skriver en rapport med resultat och slutsats med st\u00f6d fr\u00e5n mall', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en rapport med hypotes, metod, resultat och slutsats', advanced: 'skriver en detaljerad rapport med statistisk analys, felk\u00e4llor, k\u00e4llv\u00e4rdering och perspektivering' },
    ],
  },

  birthday: {
    seoTitle: 'Gratis F\u00f6delsedags\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara f\u00f6delsedags\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Flerstegsuppgifter med tid och pengar, br\u00e5kber\u00e4kning och argumenterande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'f\u00f6delsedags\u00f6vningar \u00e5rskurs 3, flerstegsuppgifter tid pengar, br\u00e5k kakor 8\u20139 \u00e5r, budget matematik, argumenterande text, Lgr22 matematik, division rest, multiplikation tv\u00e5siffriga, festplanering, \u00f6vertygande skrivning',
    snippetAnswer: 'F\u00f6delsedags\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar flerstegs textuppgifter med tid och pengar, br\u00e5kber\u00e4kning med t\u00e5rta och presenter, multiplikation och division med festbudget samt sj\u00e4lvst\u00e4ndig skrivning av festplanering med \u00f6vertygande argumentation. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir f\u00f6delsedagstemat ett avancerat planerings- och ber\u00e4kningsprojekt \u2014 \u00e5tta- och nio\u00e5ringar l\u00f6ser flerstegs textuppgifter med b\u00e5de tid och pengar (kalaset b\u00f6rjar kl. 14:30, varar 2 timmar 45 minuter \u2014 n\u00e4r slutar det? Budgeten \u00e4r 500 kr \u2014 vad har vi r\u00e5d med?). Br\u00e5k anv\u00e4nds f\u00f6r t\u00e5rtdelning (en \u00e5ttondel av t\u00e5rtan till 8 g\u00e4ster) och presentf\u00f6rdelning. Division med rest l\u00f6ser f\u00f6rdelningsproblem (25 karameller till 8 barn = 3 var, 1 \u00f6ver). Multiplikation med tv\u00e5siffriga tal ber\u00e4knar festkostnader. \u00d6vertygande skrivning tr\u00e4nar argumentation f\u00f6r ett festtema med p\u00e5st\u00e5ende, motivering och motargument. Lgr22:s m\u00e5l f\u00f6r flerstegsuppgifter, br\u00e5k och argumentation i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Flerstegs textuppgifter med tid och pengar (8\u20139-\u00e5ringar kombinerar tv\u00e5 operationer i en uppgift)', howWeAddress: 'Festplaneringsuppgifter d\u00e4r eleverna ber\u00e4knar tidsf\u00f6rlopp och budgetar i samma uppgift med flera steg' },
      { milestone: 'Br\u00e5k med konkret delning (\u00e5ttondelar, sj\u00e4ttedelar i festkontext)', howWeAddress: 'T\u00e5rtdelnings\u00f6vningar med \u00e5ttondelar och sj\u00e4ttedelar d\u00e4r eleverna ber\u00e4knar och j\u00e4mf\u00f6r br\u00e5kstorlekar' },
      { milestone: 'Division med rest (f\u00f6rdelningsproblem i verkligheten)', howWeAddress: 'Festf\u00f6rdelnings\u00f6vningar d\u00e4r eleverna f\u00f6rdelar presenter, godis och stolar med rest och f\u00f6rklarar vad resten inneb\u00e4r' },
      { milestone: '\u00d6vertygande argumentation (p\u00e5st\u00e5ende, motivering, motargument)', howWeAddress: 'Festtemadebatt\u00f6vningar d\u00e4r eleverna skriver \u00f6vertygande texter f\u00f6r och emot ett festtema med motargument' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, l\u00f6s tvstegsuppgifter med hela timmar och j\u00e4mna priser, anv\u00e4nd halvor och fj\u00e4rdedelar och erbjud argumentationsramar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs trestegsuppgifter med minuter och \u00f6reber\u00e4kning, br\u00e5kj\u00e4mf\u00f6relse med olika n\u00e4mnare och fri debattskrivning med flera argument och nyanserad slutsats till.',
    parentTakeaway: 'Planera f\u00f6delsedagen som avancerad matematik: \u201dbudget p\u00e5 500 kr \u2014 t\u00e5rta 125 kr, pynt 89 kr, godisps\u00e5ar 8 st \u00e0 22 kr. Har vi r\u00e5d?\u201d. Dela t\u00e5rtan i \u00e5ttondelar. Ber\u00e4kna: \u201dkalaset b\u00f6rjar 14:30, varar 2 timmar 45 minuter \u2014 n\u00e4r h\u00e4mtar f\u00f6r\u00e4ldrarna?\u201d. L\u00e5t barnet argumentera f\u00f6r sitt \u00f6nsketema. Festmatematik \u00e4r livets mest motiverande matematik.',
    classroomIntegration: 'F\u00f6delsedagstemat i \u00e5rskurs 3 anv\u00e4nds som tv\u00e4r\u00e4mnesprojekt: i matematik l\u00f6ses flerstegsuppgifter, br\u00e5k\u00f6vningar och division, i svenska skrivs \u00f6vertygande texter och festinbjudningar, i SO diskuteras budgetl\u00e4rande och ekonomi. Klassf\u00f6delsedag med elevplanering f\u00f6rbinder teori och praktik. Lgr22:s m\u00e5l f\u00f6r flerstegsuppgifter, br\u00e5k och argumentation st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Flerstegs textuppgifter (tid och pengar)', emerging: 'l\u00f6ser tvstegsuppgifter med hela timmar och j\u00e4mna priser med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt trestegsuppgifter med tid i minuter och pengar med \u00f6re, visar mellanber\u00e4kningar', advanced: 'formulerar egna flerstegsuppgifter, l\u00f6ser komplexa budget- och tidsproblem och verifierar systematiskt' },
      { skill: 'Br\u00e5k med festdelning', emerging: 'hittar halvor och fj\u00e4rdedelar av j\u00e4mna tal med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt \u00e5ttondelar och sj\u00e4ttedelar, j\u00e4mf\u00f6r br\u00e5k och f\u00f6rklarar metoden', advanced: 'j\u00e4mf\u00f6r br\u00e5k med olika n\u00e4mnare, l\u00f6ser br\u00e5kuppgifter i kontext och f\u00f6rklarar strategier' },
      { skill: '\u00d6vertygande festskrivning', emerging: 'skriver 3\u20134 meningar med p\u00e5st\u00e5ende och enkel motivering', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en \u00f6vertygande text med p\u00e5st\u00e5ende, motivering och motargument', advanced: 'skriver en nyanserad argumentation med flera perspektiv, motargument och \u00f6vertygande slutsats' },
    ],
  },

  body: {
    seoTitle: 'Gratis Kropp\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara kropps\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Organsystem, m\u00e5ttomvandling, br\u00e5k med n\u00e4ring och h\u00e4lsoforskningsrapporter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'kropps\u00f6vningar \u00e5rskurs 3, organsystem samspel, m\u00e5ttomvandling cm m km, br\u00e5k n\u00e4ring 8\u20139 \u00e5r, linjediagram v\u00e4xt, Lgr22 NO, h\u00e4lsoforskning, genomsnitt division, pulsdata, vetenskaplig rapport',
    snippetAnswer: 'Kropps\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar detaljerad organsystemanalys, m\u00e5ttomvandling mellan cm/m/km, br\u00e5k med n\u00e4rings\u00e4mnen, datatolkning med linjediagram och sj\u00e4lvst\u00e4ndig skrivning av h\u00e4lsoforskningsrapporter med k\u00e4llor. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 utvidgas kroppstemat till avancerad systemf\u00f6rst\u00e5else \u2014 \u00e5tta- och nio\u00e5ringar kan analysera samspelet mellan fyra organsystem (cirkulation, andning, matsm\u00e4ltning, r\u00f6relseapparaten) och f\u00f6rst\u00e5 att blodet transporterar syre fr\u00e5n lungorna till musklerna. M\u00e5ttomvandling mellan cm, m och km anv\u00e4nds f\u00f6r kroppsdata (barnets l\u00e4ngd 142 cm = 1,42 m). Br\u00e5k ber\u00e4knar n\u00e4rings\u00e4mnesandelar (en fj\u00e4rdedel av tallriken \u00e4r protein). Linjediagram visar v\u00e4xtdata \u00f6ver tid. Division ber\u00e4knar genomsnittspuls (600 slag p\u00e5 10 minuter = 60 slag/minut). H\u00e4lsoforskningsrapporter med hypotes och flera k\u00e4llor tr\u00e4nar vetenskaplig argumentation. Lgr22:s m\u00e5l f\u00f6r h\u00e4lsa, m\u00e4tning och vetenskaplig rapportering i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Organsystems samspel (8\u20139-\u00e5ringar f\u00f6rst\u00e5r att system samverkar)', howWeAddress: 'Systemsamspelsdiagram d\u00e4r eleverna f\u00f6rbinder fyra organsystem och f\u00f6rklarar syrets v\u00e4g fr\u00e5n luft till muskel' },
      { milestone: 'M\u00e5ttomvandling cm/m/km (flexibel omr\u00e4kning med kroppsdata)', howWeAddress: 'Kroppsm\u00e5tts-omvandlings\u00f6vningar d\u00e4r eleverna omvandlar l\u00e4ngder och avst\u00e5nd mellan cm, m och km' },
      { milestone: 'Genomsnittsber\u00e4kning med division (pulsdata, v\u00e4xtdata)', howWeAddress: 'Pulsdata\u00f6vningar d\u00e4r eleverna ber\u00e4knar genomsnittspuls med division och j\u00e4mf\u00f6r f\u00f6re/efter r\u00f6relse' },
      { milestone: 'H\u00e4lsoforskningsrapport med hypotes och k\u00e4llor', howWeAddress: 'H\u00e4lsoforskningsmallar med sektioner f\u00f6r hypotes, metod, resultat och slutsats som v\u00e4gleder vetenskapligt skrivande' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, fokusera p\u00e5 tv\u00e5 organsystem med bildst\u00f6d, begr\u00e4nsa omvandling till cm och m och ge rapportmallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs alla organsystems samspel, omvandling med decimaler och sj\u00e4lvst\u00e4ndig forskningsrapport med statistisk analys av pulsdata till.',
    parentTakeaway: 'M\u00e4t hela familjen och omvandla: \u201ddu \u00e4r 142 cm \u2014 hur m\u00e5nga meter?\u201d. K\u00e4nn p\u00e5 pulsen f\u00f6re och efter att ha hoppat i 2 minuter och ber\u00e4kna genomsnittet. Dela tallriken i fj\u00e4rdedelar och diskutera n\u00e4ring. Rita ett linjediagram \u00f6ver barnets l\u00e4ngd de senaste \u00e5ren. Kroppen \u00e4r det mest personliga matematiktemat.',
    classroomIntegration: 'Kroppstemat i \u00e5rskurs 3 integrerar NO och matematik: organsystem och h\u00e4lsa i NO-lektionen, m\u00e5ttomvandling och genomsnittsber\u00e4kning i matematiklektionen, h\u00e4lsoforskningsrapporter i svenskalektionen. Pulsexperiment ger autentisk datainsamling. Lgr22:s m\u00e5l f\u00f6r h\u00e4lsa, m\u00e4tning och rapportering st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Organsystems samspel', emerging: 'namnger tv\u00e5 organsystem och deras funktion med st\u00f6d', proficient: 'f\u00f6rklarar sj\u00e4lvst\u00e4ndigt samspelet mellan fyra organsystem med exempel', advanced: 'analyserar komplexa samband mellan system och f\u00f6rklarar vad som h\u00e4nder vid belastning' },
      { skill: 'M\u00e5ttomvandling cm/m/km', emerging: 'omvandlar mellan cm och m med st\u00f6d', proficient: 'omvandlar sj\u00e4lvst\u00e4ndigt mellan cm, m och km med korrekta ber\u00e4kningar', advanced: 'till\u00e4mpar omvandling i komplexa problem och uppskattar rimlighet' },
      { skill: 'H\u00e4lsoforskningsrapport', emerging: 'skriver en rapport med resultat och enkel slutsats med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en rapport med hypotes, metod, resultat och slutsats', advanced: 'skriver en detaljerad rapport med statistisk analys, felk\u00e4llor och perspektivering' },
    ],
  },

  camping: {
    seoTitle: 'Gratis Camping\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara camping\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Kartl\u00e4sning, areal och omkrets, multiplikation med packning och \u00e4ventyrsber\u00e4ttelser. 33 generatorer. Gratis PDF.',
    seoKeywords: 'camping\u00f6vningar \u00e5rskurs 3, kartl\u00e4sning skala, areal omkrets t\u00e4lt, multiplikation packning 8\u20139 \u00e5r, \u00e4ventyrsber\u00e4ttelse, Lgr22 matematik, m\u00e5ttomvandling, kompass, budget planering, friluftsdag',
    snippetAnswer: 'Camping\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar kartl\u00e4sning med skala, areal och omkrets av t\u00e4ltplatser, multiplikation och division med packningsutrustning samt sj\u00e4lvst\u00e4ndig skrivning av \u00e4ventyrsber\u00e4ttelser med styckestruktur. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir campingtemat ett praktiskt matematik- och geografiprojekt \u2014 \u00e5tta- och nio\u00e5ringar l\u00e4ser kartor med enkel skala och kompassriktningar, ber\u00e4knar areal och omkrets av t\u00e4ltplatser och l\u00e4geromr\u00e5den, planerar packlistor med multiplikation (4 personer \u00d7 3 m\u00e5ltider \u00d7 2 dagar) och budgeterar med flerstegsber\u00e4kningar. M\u00e5ttomvandling mellan m och km anv\u00e4nds f\u00f6r vandringsleder. Division f\u00f6rdelar utrustning j\u00e4mnt mellan deltagare. \u00c4ventyrsber\u00e4ttelser med inledning, stegrande handling och uppl\u00f6sning tr\u00e4nar ber\u00e4ttarstruktur. Lgr22:s m\u00e5l f\u00f6r geometri, m\u00e4tning och ber\u00e4ttande text i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Kartl\u00e4sning med enkel skala och kompassriktningar (8\u20139-\u00e5ringar orienterar sig)', howWeAddress: 'Kartnavigerings\u00f6vningar d\u00e4r eleverna f\u00f6ljer rutter, avl\u00e4ser avst\u00e5nd med skala och anger kompassriktningar' },
      { milestone: 'Areal och omkrets av rektanglar (t\u00e4ltplatser, l\u00e4geromr\u00e5den)', howWeAddress: 'T\u00e4ltplats\u00f6vningar d\u00e4r eleverna ber\u00e4knar areal och omkrets och j\u00e4mf\u00f6r olika platsformer' },
      { milestone: 'Flerstegs multiplikation med packningsplanering', howWeAddress: 'Packlistuppgifter d\u00e4r eleverna ber\u00e4knar totala m\u00e4ngder f\u00f6r personer \u00d7 m\u00e5ltider \u00d7 dagar' },
      { milestone: '\u00c4ventyrsber\u00e4ttelse med styckestruktur (inledning, handling, uppl\u00f6sning)', howWeAddress: 'Camping-ber\u00e4ttelsemallar d\u00e4r eleverna skriver fleravstyckes\u00e4ventyr med tydlig dramatisk b\u00e5ge' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd f\u00f6renklade kartor utan skala, ber\u00e4kna omkrets med r\u00e4kning av rutor och ge ber\u00e4ttelseramar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs skalber\u00e4kningar med decimaler, sammansatta figurer f\u00f6r areal och sj\u00e4lvst\u00e4ndig \u00e4ventyrsber\u00e4ttelse med dialog och milj\u00f6beskrivning till.',
    parentTakeaway: 'Planera en campingutflykt som matematik: ber\u00e4kna avst\u00e5ndet p\u00e5 kartan, m\u00e4t t\u00e4ltplatsen och ber\u00e4kna arealen, g\u00f6r en packlista med multiplikation och budgetera. Efter resan \u2014 l\u00e5t barnet skriva en \u00e4ventyrsber\u00e4ttelse om upplevelsen. Campingmatematik \u00e4r matematik som luktar skog.',
    classroomIntegration: 'Campingtemat i \u00e5rskurs 3 integrerar matematik och geografi: kartl\u00e4sning och areal i matematiklektionen, kompass och natur i NO/SO, \u00e4ventyrsber\u00e4ttelser i svenskalektionen. En friluftsdag med matematikuppdrag f\u00f6rbinder klassrummet med utomhusl\u00e4rande. Lgr22:s m\u00e5l f\u00f6r geometri, m\u00e4tning och ber\u00e4ttande text st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Kartl\u00e4sning med skala', emerging: 'f\u00f6ljer en enkel karta och anger riktningar med st\u00f6d', proficient: 'l\u00e4ser karta med skala sj\u00e4lvst\u00e4ndigt och ber\u00e4knar verkliga avst\u00e5nd', advanced: 'planerar rutter p\u00e5 karta, ber\u00e4knar totalavst\u00e5nd och uppskattar tids\u00e5tg\u00e5ng' },
      { skill: 'Areal och omkrets', emerging: 'ber\u00e4knar omkrets genom att r\u00e4kna sidor med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt areal och omkrets av rektanglar med formel', advanced: 'l\u00f6ser sammansatta arealuppgifter och j\u00e4mf\u00f6r figurer med olika dimensioner' },
      { skill: '\u00c4ventyrsber\u00e4ttelse med styckestruktur', emerging: 'skriver en ber\u00e4ttelse med b\u00f6rjan och slut med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en fleravstyckes\u00e4ventyr med inledning, handling och uppl\u00f6sning', advanced: 'skriver en levande ber\u00e4ttelse med dialog, milj\u00f6beskrivning och \u00f6verraskande v\u00e4ndning' },
    ],
  },

  circus: {
    seoTitle: 'Gratis Cirkus\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara cirkus\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Multiplikation med biljettsystem, br\u00e5k, geometriska m\u00f6nster och f\u00f6rest\u00e4llningsrecensioner. 33 generatorer. Gratis PDF.',
    seoKeywords: 'cirkus\u00f6vningar \u00e5rskurs 3, multiplikation biljetter, br\u00e5k cirkus 8\u20139 \u00e5r, geometri m\u00f6nster symmetri, f\u00f6rest\u00e4llningsrecension, Lgr22 matematik, division grupper, areal man\u00e9ge, budgetplanering, \u00f6vertygande text',
    snippetAnswer: 'Cirkus\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar multiplikation med biljettsystem och sittplatser, br\u00e5kber\u00e4kning med artistgrupper, geometriska m\u00f6nster och symmetri i man\u00e9gen samt sj\u00e4lvst\u00e4ndig skrivning av f\u00f6rest\u00e4llningsrecensioner med \u00e5siktsargument. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir cirkustemat ett f\u00f6retagsprojekt \u2014 \u00e5tta- och nio\u00e5ringar planerar f\u00f6rest\u00e4llningar med multiplikation (8 rader \u00d7 12 stolar = 96 platser), ber\u00e4knar biljettint\u00e4kter och budgeterar kostnader med flerstegsuppgifter. Br\u00e5k anv\u00e4nds f\u00f6r artistgrupper (en fj\u00e4rdedel av artisterna \u00e4r akrobater). Geometri utforskas med cirkelns egenskaper i man\u00e9gen, symmetri i cirkusdekor och m\u00f6nster i jongleringsr\u00f6relser. Division f\u00f6rdelar artister i lika grupper. Areal ber\u00e4knas f\u00f6r man\u00e9gen. F\u00f6rest\u00e4llningsrecensioner tr\u00e4nar \u00e5siktsuttryck med argument och styckestruktur. Lgr22:s m\u00e5l f\u00f6r multiplikation, geometri och \u00e5siktstext i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Multiplikation med tv\u00e5siffriga faktorer (8\u20139-\u00e5ringar ber\u00e4knar med st\u00f6rre tal)', howWeAddress: 'Biljett- och sittplatsuppgifter d\u00e4r eleverna ber\u00e4knar totala platser och int\u00e4kter med multiplikation' },
      { milestone: 'Br\u00e5k med gruppindelning (fj\u00e4rdedelar, tredjedelar av artister)', howWeAddress: '\u00d6vningar d\u00e4r eleverna ber\u00e4knar br\u00e5k av cirkusgrupper och j\u00e4mf\u00f6r andelar' },
      { milestone: 'Geometriska m\u00f6nster och symmetri (cirkelf\u00f6rst\u00e5else, spegling)', howWeAddress: 'Man\u00e9ge-geometri\u00f6vningar d\u00e4r eleverna ritar symmetriska m\u00f6nster och unders\u00f6ker cirkelegenskaper' },
      { milestone: 'F\u00f6rest\u00e4llningsrecension med \u00e5sikt och argument', howWeAddress: 'Recensionsmallar d\u00e4r eleverna skriver strukturerade recensioner med beskrivning, \u00e5sikt och motivering' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa multiplikation till ensiffriga faktorer, anv\u00e4nd halvor och fj\u00e4rdedelar och ge recensionsramar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs budgetplanering med flerstegsber\u00e4kningar, br\u00e5k med blandade tal och sj\u00e4lvst\u00e4ndig recensionsskrivning med j\u00e4mf\u00f6relse av tv\u00e5 f\u00f6rest\u00e4llningar till.',
    parentTakeaway: 'Bygg en minicirkus hemma: ber\u00e4kna hur m\u00e5nga stolar som beh\u00f6vs (3 rader \u00d7 4 stolar), s\u00e4tt biljettpris och ber\u00e4kna int\u00e4kterna, g\u00f6r en budget. Rita en cirkelformad man\u00e9ge och diskutera symmetri. Efter att ha sett en f\u00f6rest\u00e4llning \u2014 l\u00e5t barnet skriva en recension med argument. Cirkusmatematik \u00e4r show med siffror.',
    classroomIntegration: 'Cirkustemat i \u00e5rskurs 3 integrerar \u00e4mnena genom ett skolcirkusprojekt: multiplikation och budgetering i matematik, symmetri och m\u00f6nster i bild, f\u00f6rest\u00e4llningsrecensioner i svenska, r\u00f6relse och balans i idrott. Lgr22:s m\u00e5l f\u00f6r multiplikation, geometri och \u00e5siktstext st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Multiplikation med cirkusdata', emerging: 'l\u00f6ser multiplikation med ensiffriga faktorer med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt produkter med tv\u00e5siffriga faktorer och f\u00f6rklarar strategin', advanced: 'l\u00f6ser flerstegsuppgifter med b\u00e5de multiplikation och division och budgeterar' },
      { skill: 'Geometri och symmetri', emerging: 'identifierar symmetrilinjer i enkla figurer med st\u00f6d', proficient: 'ritar symmetriska m\u00f6nster sj\u00e4lvst\u00e4ndigt och f\u00f6rklarar cirkelegenskaper', advanced: 'skapar komplexa symmetriska designer och ber\u00e4knar med cirkelf\u00f6rst\u00e5else' },
      { skill: 'F\u00f6rest\u00e4llningsrecension', emerging: 'skriver en kort \u00e5sikt med enkel motivering', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en strukturerad recension med beskrivning, \u00e5sikt och argument', advanced: 'skriver en j\u00e4mf\u00f6rande recension med flera perspektiv och nyanserad bed\u00f6mning' },
    ],
  },

  clothing: {
    seoTitle: 'Gratis Kl\u00e4d\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara kl\u00e4d\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Budgetber\u00e4kning, br\u00e5k med tyg, m\u00e5ttomvandling och modebeskrivande text. 33 generatorer. Gratis PDF.',
    seoKeywords: 'kl\u00e4d\u00f6vningar \u00e5rskurs 3, budget pengar 8\u20139 \u00e5r, br\u00e5k tyg, m\u00e5ttomvandling cm m, modebeskrivning text, Lgr22 matematik, multiplikation shoppping, division f\u00f6rdelning, areal m\u00f6nster, beskrivande text',
    snippetAnswer: 'Kl\u00e4d\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar budgetber\u00e4kning med kl\u00e4dink\u00f6p, br\u00e5k med tygdelning, m\u00e5ttomvandling f\u00f6r kroppsmtt och sj\u00e4lvst\u00e4ndig skrivning av modebeskrivande texter med adjektiv och styckestruktur. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir kl\u00e4dtemat ett ekonomi- och designprojekt \u2014 \u00e5tta- och nio\u00e5ringar planerar garderobbbudgetar med flerstegsber\u00e4kningar, j\u00e4mf\u00f6r priser med division (3 trsj\u00f6r f\u00f6r 180 kr = 60 kr/st) och ber\u00e4knar rabatter. Br\u00e5k anv\u00e4nds f\u00f6r tygdelning (tre fj\u00e4rdedelar av tyget \u00e4r m\u00f6nstrat). M\u00e5ttomvandling mellan cm och m till\u00e4mpas p\u00e5 kroppsmtt f\u00f6r storleksval. Areal ber\u00e4knas f\u00f6r tygbitar. Beskrivande texter tr\u00e4nar adjektivanv\u00e4ndning, j\u00e4mf\u00f6relse och styckestruktur. Lgr22:s m\u00e5l f\u00f6r ber\u00e4kningar, m\u00e4tning och beskrivande text i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Budgetber\u00e4kning med flerstegsuppgifter (8\u20139-\u00e5ringar planerar ink\u00f6p)', howWeAddress: 'Garderobbudget\u00f6vningar d\u00e4r eleverna v\u00e4ljer plagg, ber\u00e4knar total kostnad och j\u00e4mf\u00f6r alternativ' },
      { milestone: 'Br\u00e5k med tygdelning (fj\u00e4rdedelar, tredjedelar av material)', howWeAddress: 'Tygdelnings\u00f6vningar d\u00e4r eleverna ber\u00e4knar andelar m\u00f6nstrat vs. enfrgat tyg' },
      { milestone: 'M\u00e5ttomvandling f\u00f6r kroppsmtt (cm till m, storleksval)', howWeAddress: 'M\u00e5ttuppgifter d\u00e4r eleverna m\u00e4ter, omvandlar och matchar kroppsmtt med storlekstabeller' },
      { milestone: 'Beskrivande text med adjektiv och styckestruktur', howWeAddress: 'Modebeskrivningsuppgifter d\u00e4r eleverna beskriver kl\u00e4ddesign med rika adjektiv i organiserade stycken' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd j\u00e4mna priser utan decimaler, begr\u00e4nsa till halvor och fj\u00e4rdedelar och ge beskrivningsmallar med adjektivbank. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs procentrabatter, br\u00e5k med olika n\u00e4mnare och sj\u00e4lvst\u00e4ndig j\u00e4mf\u00f6rande modebeskrivning med argumentation till.',
    parentTakeaway: 'G\u00f6r kl\u00e4dshopping till matematik: ge barnet en budget p\u00e5 300 kr och l\u00e5t dem planera vad de kan k\u00f6pa. J\u00e4mf\u00f6r styckepris: \u201d3 par strumpor f\u00f6r 60 kr eller 2 par f\u00f6r 50 kr \u2014 vad \u00e4r billigast per par?\u201d. M\u00e4t barnet f\u00f6r storleksval och omvandla cm till m. Ekonomikunskap b\u00f6rjar i garderoben.',
    classroomIntegration: 'Kl\u00e4dtemat i \u00e5rskurs 3 integrerar matematik och slj\u00f6d: budgetber\u00e4kning och m\u00e5ttomvandling i matematik, textildesign och m\u00e4tning i slj\u00f6d, beskrivande texter i svenska. Lgr22:s m\u00e5l f\u00f6r ber\u00e4kningar, m\u00e4tning och beskrivande text st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Budgetber\u00e4kning med kl\u00e4dink\u00f6p', emerging: 'adderar tv\u00e5-tre priser med st\u00f6d', proficient: 'planerar sj\u00e4lvst\u00e4ndigt en budget, j\u00e4mf\u00f6r priser och ber\u00e4knar v\u00e4xel', advanced: 'ber\u00e4knar styckepris, j\u00e4mf\u00f6r erbjudanden och optimerar budget med motivering' },
      { skill: 'Br\u00e5k med tygmaterial', emerging: 'identifierar halvor och fj\u00e4rdedelar av tyg med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt tredjedelar och fj\u00e4rdedelar och j\u00e4mf\u00f6r br\u00e5k', advanced: 'l\u00f6ser br\u00e5kuppgifter med olika n\u00e4mnare i tygkontext och f\u00f6rklarar strategier' },
      { skill: 'Beskrivande modetext', emerging: 'skriver 3\u20134 meningar med enkla adjektiv', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en beskrivande text med rika adjektiv och styckestruktur', advanced: 'skriver en j\u00e4mf\u00f6rande beskrivning med varierat spr\u00e5k och \u00f6vertygande argumentation' },
    ],
  },

  colors: {
    seoTitle: 'Gratis F\u00e4rg\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara f\u00e4rg\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Br\u00e5k med f\u00e4rgblandning, datahantering med diagram, ljusl\u00e4ra och poetisk skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'f\u00e4rg\u00f6vningar \u00e5rskurs 3, br\u00e5k f\u00e4rgblandning, stapeldiagram f\u00e4rger 8\u20139 \u00e5r, ljusl\u00e4ra prisma, dikter om f\u00e4rger, Lgr22 NO, f\u00e4rgteori, proportioner, symmetri m\u00f6nster, beskrivande text',
    snippetAnswer: 'F\u00e4rg\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar br\u00e5k med f\u00e4rgblandningsproportioner, datahantering med stapel- och linjediagram, ljusl\u00e4ra med prisma och f\u00e4rgspektrum samt poetisk skrivning med sinnesintryck och bildsprk. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 kopplar f\u00e4rgtemat naturvetenskap till matematik och spr\u00e5k \u2014 \u00e5tta- och nio\u00e5ringar unders\u00f6ker ljusl\u00e4ra med prisma och f\u00e4rgspektrum, arbetar med br\u00e5k f\u00f6r f\u00e4rgblandningsproportioner (tv\u00e5 tredjedelar bl\u00e5tt plus en tredjedel gult ger gr\u00f6nt), skapar och tolkar stapeldiagram \u00f6ver klassens f\u00e4voritsf\u00e4rger och analyserar trender. Symmetriska m\u00f6nster med f\u00e4rger utforskar geometriska begrepp. Multiplikation ber\u00e4knar f\u00e4rg\u00e5tg\u00e5ng (8 elever \u00d7 3 f\u00e4rger = 24 f\u00e4rgburkar). Poetisk skrivning med sinnesintryck, liknelser och bildsprk ger spr\u00e5klig kreativitet. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, data, ljusl\u00e4ra och poetisk text i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Br\u00e5k med f\u00e4rgblandningsproportioner (8\u20139-\u00e5ringar f\u00f6rst\u00e5r andelar)', howWeAddress: 'F\u00e4rgblandnings\u00f6vningar d\u00e4r eleverna anv\u00e4nder br\u00e5k f\u00f6r att ber\u00e4kna proportioner och f\u00f6ruts\u00e4ga resultat' },
      { milestone: 'Datahantering med stapel- och linjediagram (f\u00e4rgpreferensdata)', howWeAddress: 'Enk\u00e4t\u00f6vningar d\u00e4r eleverna samlar f\u00e4rgdata, skapar diagram och drar slutsatser' },
      { milestone: 'Ljusl\u00e4ra med prisma och f\u00e4rgspektrum (naturvetenskaplig unders\u00f6kning)', howWeAddress: 'Ljusexperiment\u00f6vningar d\u00e4r eleverna dokumenterar observationer av prisma och regnb\u00e5ge' },
      { milestone: 'Poetisk skrivning med sinnesintryck och bildsprk', howWeAddress: 'F\u00e4rgdikts\u00f6vningar d\u00e4r eleverna skriver dikter med liknelser, metaforer och sinnesspr\u00e5k' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd halvor och fj\u00e4rdedelar f\u00f6r blandning, ge f\u00f6rfyllda diagrammallar och erbjud diktmallar med startfraser. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs br\u00e5k med sj\u00e4ttedelar och \u00e5ttondelar, sj\u00e4lvst\u00e4ndig datainsamling med analys och fri poetisk skrivning med avancerade stilfigurer till.',
    parentTakeaway: 'Blanda f\u00e4rger hemma och \u00f6va br\u00e5k: \u201dtv\u00e5 tredjedelar r\u00f6tt och en tredjedel vitt \u2014 vilken f\u00e4rg f\u00e5r vi?\u201d. G\u00f6r en f\u00e4rgpreferinsenk\u00e4t med familjen och rita ett stapeldiagram. Titta p\u00e5 en regnb\u00e5ge och diskutera ljusl\u00e4ra. Skriv en dikt om er favoritf\u00e4rg med sinnesintryck. F\u00e4rger \u00e4r b\u00e5de vetenskap och konst.',
    classroomIntegration: 'F\u00e4rgtemat i \u00e5rskurs 3 integrerar NO, matematik och bild: ljusl\u00e4ra och f\u00e4rgspektrum i NO, br\u00e5k och datadiagram i matematik, f\u00e4rgblandning och symmetri i bild, poetisk skrivning i svenska. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, data, ljusl\u00e4ra och poetisk text st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Br\u00e5k med f\u00e4rgproportioner', emerging: 'identifierar halvor och fj\u00e4rdedelar i f\u00e4rgblandning med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt tredjedelar och fj\u00e4rdedelar i proportioner och f\u00f6ruts\u00e4ger resultat', advanced: 'l\u00f6ser br\u00e5kuppgifter med olika n\u00e4mnare och f\u00f6rklarar sambandet mellan br\u00e5k och proportioner' },
      { skill: 'Datahantering med diagram', emerging: 'fyller i f\u00f6rgjort diagram med st\u00f6d', proficient: 'skapar och tolkar sj\u00e4lvst\u00e4ndigt stapel- och linjediagram', advanced: 'analyserar data, drar slutsatser och f\u00f6resl\u00e5r f\u00f6rklaringar baserade p\u00e5 diagram' },
      { skill: 'Poetisk skrivning om f\u00e4rger', emerging: 'skriver 3\u20134 rader med enkel beskrivning', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en dikt med liknelser och sinnesintryck', advanced: 'skriver en poetisk text med avancerade stilfigurer, bildsprk och k\u00e4nslosamt spr\u00e5k' },
    ],
  },

  construction: {
    seoTitle: 'Gratis Konstruktions\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara konstruktions\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Areal och omkrets, skalritning, multiplikation med byggmaterial och tekniska rapporter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'konstruktions\u00f6vningar \u00e5rskurs 3, areal omkrets bygge, skalritning 8\u20139 \u00e5r, multiplikation material, teknisk rapport, Lgr22 teknik, 3D-figurer, m\u00e5ttomvandling, h\u00e5llfasthet, ritningsf\u00f6rst\u00e5else',
    snippetAnswer: 'Konstruktions\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar areal och omkrets med byggytor, skalritning av konstruktioner, multiplikation och division med byggmaterial samt sj\u00e4lvst\u00e4ndig skrivning av tekniska rapporter med process och resultat. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir konstruktionstemat ett ingenj\u00f6rsprojekt \u2014 \u00e5tta- och nio\u00e5ringar ber\u00e4knar areal och omkrets av byggytor och rum, ritar enkla skalritningar av konstruktioner, ber\u00e4knar materialbehov med multiplikation (4 v\u00e4ggar \u00d7 12 klossar = 48 klossar) och budgeterar byggprojekt. M\u00e5ttomvandling mellan cm och m till\u00e4mpas p\u00e5 verkliga m\u00e5tt. 3D-figurer analyseras med sidor, kanter och h\u00f6rn. Division f\u00f6rdelar material j\u00e4mnt i grupper. Tekniska rapporter med processbeskrivning, material, resultat och f\u00f6rb\u00e4ttorf\u00f6rslag tr\u00e4nar vetenskapligt skrivande. Lgr22:s m\u00e5l f\u00f6r geometri, m\u00e4tning och teknisk rapportering i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Areal och omkrets av byggytor och rum (8\u20139-\u00e5ringar ber\u00e4knar med formel)', howWeAddress: 'Byggplats\u00f6vningar d\u00e4r eleverna ber\u00e4knar golvarea och st\u00e4ngsell\u00e4ngd f\u00f6r olika rum' },
      { milestone: 'Skalritning av enkla konstruktioner (f\u00f6rst\u00e5else f\u00f6r proportioner)', howWeAddress: 'Ritnings\u00f6vningar d\u00e4r eleverna ritar byggnader i skala och omvandlar m\u00e5tt' },
      { milestone: 'Multiplikation med materialber\u00e4kning (klossar, brder, skruvar)', howWeAddress: 'Materialliste\u00f6vningar d\u00e4r eleverna ber\u00e4knar totalt behov med multiplikation och kontrollerar med division' },
      { milestone: 'Teknisk rapport med processbeskrivning', howWeAddress: 'Rapportmallar d\u00e4r eleverna dokumenterar byggprocess, material, resultat och f\u00f6rb\u00e4ttrf\u00f6rslag' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd rutpapper f\u00f6r arealr\u00e4kning, begr\u00e4nsa till ensiffrig multiplikation och ge rapportmallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs sammansatta figurer f\u00f6r areal, skalber\u00e4kning med decimaler och sj\u00e4lvst\u00e4ndig teknisk rapport med j\u00e4mf\u00f6relse av konstruktioner till.',
    parentTakeaway: 'Bygg med barnet och r\u00e4kna: ber\u00e4kna hur m\u00e5nga klossar som beh\u00f6vs (4 sidor \u00d7 10 klossar), m\u00e4t rummet och ber\u00e4kna arealen, rita en planritning i skala. L\u00e5t barnet skriva en teknisk rapport om bygget. Konstruktion \u00e4r matematik man kan ta p\u00e5.',
    classroomIntegration: 'Konstruktionstemat i \u00e5rskurs 3 integrerar matematik, teknik och svenska: areal och skalritning i matematik, byggprojekt i teknik/slj\u00f6d, tekniska rapporter i svenska. Ett klassbyggprojekt f\u00f6rbinder begreppen i praktiken. Lgr22:s m\u00e5l f\u00f6r geometri, m\u00e4tning och teknisk rapportering st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Areal och omkrets av byggytor', emerging: 'r\u00e4knar rutor f\u00f6r areal med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt areal och omkrets med formel och korrekta enheter', advanced: 'l\u00f6ser sammansatta arealuppgifter och till\u00e4mpar p\u00e5 verkliga byggscenarier' },
      { skill: 'Materialber\u00e4kning med multiplikation', emerging: 'l\u00f6ser enkel multiplikation f\u00f6r materialbehov med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt materialbehov med flerstegs multiplikation', advanced: 'optimerar materialanv\u00e4ndning, j\u00e4mf\u00f6r alternativ och budgeterar med motivering' },
      { skill: 'Teknisk byggrapport', emerging: 'beskriver byggprocessen med st\u00f6d fr\u00e5n mall', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en teknisk rapport med process, material och resultat', advanced: 'skriver en detaljerad rapport med j\u00e4mf\u00f6relse, f\u00f6rb\u00e4ttringsf\u00f6rslag och tekniska termer' },
    ],
  },

  cooking: {
    seoTitle: 'Gratis Matlagnings\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara matlagnings\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Br\u00e5k med receptskalning, m\u00e5ttomvandling, multiplikation och receptskrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'matlagnings\u00f6vningar \u00e5rskurs 3, br\u00e5k recept skalning, m\u00e5ttomvandling dl liter, multiplikation portioner 8\u20139 \u00e5r, receptskrivning, Lgr22 matematik, n\u00e4ringsl\u00e4ra, budget matink\u00f6p, kemin i matlagning, instruerande text',
    snippetAnswer: 'Matlagnings\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar br\u00e5k med receptskalning, m\u00e5ttomvandling mellan dl och liter, multiplikation med portionsber\u00e4kning och sj\u00e4lvst\u00e4ndig receptskrivning med tydliga instruktioner och styckestruktur. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir matlagningstemat ett vetenskap- och matematikprojekt \u2014 \u00e5tta- och nio\u00e5ringar skalar recept med br\u00e5k (dubbla receptet: halv dl blir en hel dl, en tredjedel dl blir tv\u00e5 tredjedelar), omvandlar mellan dl, l och ml, ber\u00e4knar ink\u00f6pslistor med multiplikation (8 portioner \u00d7 75 g k\u00f6ttf\u00e4rs = 600 g) och budgeterar matink\u00f6p. Division f\u00f6rdelar mat j\u00e4mnt. N\u00e4ringsl\u00e4ra kopplar till br\u00e5k med tallriksmodellen. Kemin i matlagning unders\u00f6ks (vad h\u00e4nder n\u00e4r deg j\u00e4ser?). Instruerande texter skrivs med tydliga steg, exakta m\u00e5tt och kronologisk ordning. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, m\u00e4tning och instruerande text i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Br\u00e5k med receptskalning (8\u20139-\u00e5ringar dubblar och halverar recept)', howWeAddress: 'Receptskalnings\u00f6vningar d\u00e4r eleverna anv\u00e4nder br\u00e5k f\u00f6r att anpassa portioner och kontrollerar rimlighet' },
      { milestone: 'M\u00e5ttomvandling mellan dl, l och ml (volymm\u00e5tt i matlagning)', howWeAddress: 'Omvandlings\u00f6vningar d\u00e4r eleverna konverterar mellan volymm\u00e5tt i receptkontext' },
      { milestone: 'Multiplikation med ink\u00f6ps- och portionsber\u00e4kning', howWeAddress: 'Ink\u00f6psliste\u00f6vningar d\u00e4r eleverna ber\u00e4knar totala m\u00e4ngder och kostnader f\u00f6r flera portioner' },
      { milestone: 'Instruerande text med kronologiska steg och exakta m\u00e5tt', howWeAddress: 'Receptskrivnings\u00f6vningar d\u00e4r eleverna skriver tydliga recept med ingredienslista, steg och tidsangivelser' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd halvering och dubblering med hela tal, begr\u00e4nsa till dl och l och ge receptmallar med f\u00f6rfyllda steg. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs trefaldig skalning med br\u00e5k, omvandling med ml och sj\u00e4lvst\u00e4ndig receptskrivning med n\u00e4ringsber\u00e4kning till.',
    parentTakeaway: 'Laga mat tillsammans och r\u00e4kna: \u201dreceptet \u00e4r f\u00f6r 4 personer, vi \u00e4r 6 \u2014 hur mycket mj\u00f6l beh\u00f6ver vi?\u201d. \u00d6va m\u00e5ttomvandling: \u201d3 dl = hur m\u00e5nga ml?\u201d. Ber\u00e4kna matbudgeten f\u00f6r veckan. L\u00e5t barnet skriva sitt favoritrecept med exakta m\u00e5tt. K\u00f6ket \u00e4r det b\u00e4sta klassrummet f\u00f6r br\u00e5k.',
    classroomIntegration: 'Matlagningstemat i \u00e5rskurs 3 integrerar hemkunskap, matematik och svenska: br\u00e5k och m\u00e5ttomvandling i matematik, matlagning och n\u00e4ringsl\u00e4ra i hemkunskap, receptskrivning i svenska. Klasskokbok med elevrecept f\u00f6rbinder skrivande med matematik. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, m\u00e4tning och instruerande text st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Br\u00e5k med receptskalning', emerging: 'halverar och dubblar recept med hela tal med st\u00f6d', proficient: 'skalar recept sj\u00e4lvst\u00e4ndigt med br\u00e5k och kontrollerar rimlighet', advanced: 'skalar recept med blandade br\u00e5k, ber\u00e4knar f\u00f6r udda antal portioner och f\u00f6rklarar strategier' },
      { skill: 'M\u00e5ttomvandling dl/l/ml', emerging: 'omvandlar mellan dl och l med st\u00f6d', proficient: 'omvandlar sj\u00e4lvst\u00e4ndigt mellan dl, l och ml korrekt', advanced: 'till\u00e4mpar omvandling i komplexa recept och uppskattar rimlighet' },
      { skill: 'Instruerande receptskrivning', emerging: 'skriver ett recept med 3\u20134 steg och enkel ingredienslista', proficient: 'skriver sj\u00e4lvst\u00e4ndigt ett tydligt recept med exakta m\u00e5tt och kronologiska steg', advanced: 'skriver ett detaljerat recept med n\u00e4ringsinformation, varianter och tips' },
    ],
  },

  dinosaurs: {
    seoTitle: 'Gratis Dinosaurie\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara dinosaurie\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Stora tal, tidslinje milj\u00f6ner \u00e5r, j\u00e4mf\u00f6rande rapport och fossila bevis. 33 generatorer. Gratis PDF.',
    seoKeywords: 'dinosaurie\u00f6vningar \u00e5rskurs 3, stora tal milj\u00f6ner, tidslinje \u00e5r 8\u20139 \u00e5r, fossila bevis rapport, j\u00e4mf\u00f6rande text, Lgr22 NO, m\u00e5ttomvandling m km, linjediagram, paleontologi, vetenskaplig metod',
    snippetAnswer: 'Dinosaurie\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar stora tal i milj\u00f6nklassen, tidslinjer \u00f6ver geologiska perioder, j\u00e4mf\u00f6rande forskningsrapporter om arter och tolkning av fossila bevis med vetenskaplig metod. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir dinosaurietemat ett paleontologiskt forskningsprojekt \u2014 \u00e5tta- och nio\u00e5ringar arbetar med stora tal i milj\u00f6nklassen (Tyrannosaurus levde f\u00f6r 68 miljoner \u00e5r sedan), skapar tidslinjer \u00f6ver mesozoikum och ber\u00e4knar tidsskillnader. M\u00e5ttomvandling j\u00e4mf\u00f6r dinosauriel\u00e4ngder (Diplodocus 27 m = 2700 cm). Multiplikation ber\u00e4knar fossila fynd (8 utgrsvningsmr\u00e5den \u00d7 12 fossil = 96 fynd). J\u00e4mf\u00f6rande forskningsrapporter analyserar tv\u00e5 arter med data fr\u00e5n flera k\u00e4llor. Linjediagram visar artm\u00e5ngfald \u00f6ver geologiska perioder. Vetenskaplig metod till\u00e4mpas p\u00e5 fossiltolkning: observation, hypotes, bevis. Lgr22:s m\u00e5l f\u00f6r stora tal, m\u00e4tning och vetenskaplig rapportering i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Stora tal i milj\u00f6nklassen (8\u20139-\u00e5ringar f\u00f6rst\u00e5r platsv\u00e4rde bortom tusental)', howWeAddress: 'Dinosaurie-tids\u00f6vningar d\u00e4r eleverna l\u00e4ser, skriver och j\u00e4mf\u00f6r tal i milj\u00f6nklassen' },
      { milestone: 'Tidslinjer \u00f6ver geologiska perioder (kronologisk f\u00f6rst\u00e5else)', howWeAddress: 'Tidslinjeprojekt d\u00e4r eleverna placerar dinosauriearter p\u00e5 en skalenlig tidslinje' },
      { milestone: 'J\u00e4mf\u00f6rande forskningsrapport med flera k\u00e4llor', howWeAddress: 'Artj\u00e4mf\u00f6relse\u00f6vningar d\u00e4r eleverna skriver strukturerade rapporter med data fr\u00e5n minst tv\u00e5 k\u00e4llor' },
      { milestone: 'Vetenskaplig metod med fossiltolkning (observation, hypotes, bevis)', howWeAddress: 'Fossiltolknings\u00f6vningar d\u00e4r eleverna analyserar bilder av fossil och formulerar hypoteser med bevisstd' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tusental, anv\u00e4nd f\u00f6renklade tidslinjer med f\u00e4rre perioder och ge rapportmallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs ber\u00e4kningar med milj\u00f6ntal, detaljerade tidslinjer med alla perioder och sj\u00e4lvst\u00e4ndig j\u00e4mf\u00f6rande rapport med tre arter och statistik till.',
    parentTakeaway: 'Utforska dinosaurier med stora tal: \u201dTriceratops levde f\u00f6r 68 miljoner \u00e5r sedan, Stegosaurus f\u00f6r 155 miljoner \u2014 hur l\u00e5ng tid skilde dem?\u201d. J\u00e4mf\u00f6r storlekar: \u201dT-rex var 12 m \u2014 hur m\u00e5nga g\u00e5nger l\u00e4ngre \u00e4n v\u00e5r bil?\u201d. L\u00e5t barnet skriva en forskningsrapport om sin favoritdinosauri. Dinosaurier g\u00f6r stora tal begripliga.',
    classroomIntegration: 'Dinosaurietemat i \u00e5rskurs 3 integrerar NO, matematik och svenska: paleontologi och vetenskaplig metod i NO, stora tal och tidslinjer i matematik, j\u00e4mf\u00f6rande rapporter i svenska. Ett klassmuseum med dinosaurieutst\u00e4llning f\u00f6rbinder \u00e4mnena. Lgr22:s m\u00e5l f\u00f6r stora tal, m\u00e4tning och rapportering st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Stora tal i milj\u00f6nklassen', emerging: 'l\u00e4ser och skriver tal i tusenklassen med st\u00f6d', proficient: 'l\u00e4ser, skriver och j\u00e4mf\u00f6r sj\u00e4lvst\u00e4ndigt tal i milj\u00f6nklassen', advanced: 'ber\u00e4knar skillnader mellan milj\u00f6ntal och till\u00e4mpar p\u00e5 tidsskala-problem' },
      { skill: 'Tidslinjer med geologiska perioder', emerging: 'placerar h\u00e4ndelser i kronologisk ordning med st\u00f6d', proficient: 'skapar sj\u00e4lvst\u00e4ndigt en tidslinje med korrekta proportioner', advanced: 'analyserar tidslinjen, ber\u00e4knar tidsskillnader och f\u00f6rklarar samband' },
      { skill: 'J\u00e4mf\u00f6rande dinosaurierapport', emerging: 'skriver en rapport om en art med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en j\u00e4mf\u00f6rande rapport med tv\u00e5 arter och k\u00e4llor', advanced: 'skriver en detaljerad rapport med tre arter, statistik och vetenskaplig argumentation' },
    ],
  },

  easter: {
    seoTitle: 'Gratis P\u00e5sk\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara p\u00e5sk\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Br\u00e5k med \u00e4ggdelning, multiplikation, symmetriska m\u00f6nster och kulturjmf\u00f6rande texter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'p\u00e5sk\u00f6vningar \u00e5rskurs 3, br\u00e5k \u00e4gg delning, multiplikation p\u00e5sk 8\u20139 \u00e5r, symmetri m\u00f6nster \u00e4gg, kulturj\u00e4mf\u00f6relse text, Lgr22 matematik, division rest, areal \u00e4ggjakt, v\u00e5rtecken, traditioner v\u00e4rlden',
    snippetAnswer: 'P\u00e5sk\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar br\u00e5k med \u00e4ggdelning, multiplikation med p\u00e5skf\u00f6rberedelser, symmetriska m\u00f6nster p\u00e5 \u00e4gg och sj\u00e4lvst\u00e4ndig skrivning av kulturj\u00e4mf\u00f6rande texter om p\u00e5sktraditioner v\u00e4rlden \u00f6ver. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 kopplar p\u00e5sktemat matematik till kultur och naturvetenskap \u2014 \u00e5tta- och nio\u00e5ringar arbetar med br\u00e5k f\u00f6r \u00e4ggdelning (\u00e4ggkartongen inneh\u00e5ller 12 \u00e4gg, en fj\u00e4rdedel \u00e4r m\u00e5lade = 3 \u00e4gg), multiplikation f\u00f6r p\u00e5skf\u00f6rberedelser (6 barn \u00d7 4 \u00e4gg var = 24 \u00e4gg) och division med rest f\u00f6r f\u00f6rdelning. Symmetriska m\u00f6nster ritas p\u00e5 \u00e4gg med geometrisk precision. Areal ber\u00e4knas f\u00f6r \u00e4ggjaktomr\u00e5den. Kulturj\u00e4mf\u00f6rande texter analyserar p\u00e5sktraditioner i Sverige, Spanien och Grekland med styckestruktur. V\u00e5rtecken i naturen kopplar till NO. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, geometri och j\u00e4mf\u00f6rande text i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Br\u00e5k med \u00e4ggdelning (8\u20139-\u00e5ringar ber\u00e4knar andelar av m\u00e4ngder)', howWeAddress: '\u00c4ggkartonsg\u00f6vningar d\u00e4r eleverna ber\u00e4knar br\u00e5k av 12 och 24 i p\u00e5skkontext' },
      { milestone: 'Multiplikation med p\u00e5skf\u00f6rberedelser (flerstegs planering)', howWeAddress: 'P\u00e5skplaneringsuppgifter d\u00e4r eleverna ber\u00e4knar totala m\u00e4ngder f\u00f6r barn \u00d7 f\u00f6rem\u00e5l' },
      { milestone: 'Symmetriska m\u00f6nster p\u00e5 \u00e4gg (geometrisk precision)', howWeAddress: '\u00c4ggm\u00f6nster\u00f6vningar d\u00e4r eleverna ritar symmetriska designer med linjal och f\u00e4rgl\u00e4gger systematiskt' },
      { milestone: 'Kulturj\u00e4mf\u00f6rande text om traditioner (styckestruktur med j\u00e4mf\u00f6relse)', howWeAddress: 'Traditionsj\u00e4mf\u00f6relse\u00f6vningar d\u00e4r eleverna skriver texter som j\u00e4mf\u00f6r p\u00e5skfirande i olika l\u00e4nder' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd halvor och fj\u00e4rdedelar av 12, begr\u00e4nsa multiplikation till enkla tal och ge j\u00e4mf\u00f6relsemallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs br\u00e5k med \u00e5ttondelar, flerstegs budgetuppgifter och sj\u00e4lvst\u00e4ndig j\u00e4mf\u00f6rande rapport om tre l\u00e4nders traditioner till.',
    parentTakeaway: 'G\u00f6r p\u00e5sken till matematik: \u201dvi har 24 \u00e4gg och ska m\u00e5la en tredjedel bl\u00e5 \u2014 hur m\u00e5nga?\u201d. Ber\u00e4kna ink\u00f6p: \u201d6 barn \u00d7 4 \u00e4gg = hur m\u00e5nga beh\u00f6ver vi k\u00f6pa?\u201d. Rita symmetriska m\u00f6nster p\u00e5 \u00e4gg. Diskutera hur p\u00e5sk firas i andra l\u00e4nder. P\u00e5skmatematik \u00e4r tradition med siffror.',
    classroomIntegration: 'P\u00e5sktemat i \u00e5rskurs 3 integrerar matematik, NO och SO: br\u00e5k och symmetri i matematik, v\u00e5rtecken i NO, traditionsj\u00e4mf\u00f6relse i SO, j\u00e4mf\u00f6rande texter i svenska. En p\u00e5skvecka med matematiska och kulturella uppdrag binder ihop \u00e4mnena. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, geometri och j\u00e4mf\u00f6rande text st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Br\u00e5k med \u00e4ggdelning', emerging: 'hittar halvor och fj\u00e4rdedelar av 12 med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt tredjedelar, fj\u00e4rdedelar och sj\u00e4ttedelar av m\u00e4ngder', advanced: 'l\u00f6ser br\u00e5kuppgifter med olika n\u00e4mnare och f\u00f6rklarar sambandet mellan br\u00e5k och division' },
      { skill: 'Symmetriska m\u00f6nster', emerging: 'ritar enkel spegling med st\u00f6d', proficient: 'skapar sj\u00e4lvst\u00e4ndigt symmetriska m\u00f6nster med precision', advanced: 'designar komplexa m\u00f6nster med flera symmetrilinjer och f\u00e4rgkombinationer' },
      { skill: 'Kulturj\u00e4mf\u00f6rande text', emerging: 'beskriver en tradition med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en j\u00e4mf\u00f6rande text med tv\u00e5 l\u00e4nder och tydlig struktur', advanced: 'skriver en nyanserad j\u00e4mf\u00f6relse med tre l\u00e4nder, analys av likheter och skillnader' },
    ],
  },

  emotions: {
    seoTitle: 'Gratis K\u00e4nslo\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara k\u00e4nslo\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Datahantering med k\u00e4nslor, br\u00e5k, konfliktl\u00f6sning och reflekterande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'k\u00e4nslo\u00f6vningar \u00e5rskurs 3, datahantering k\u00e4nslor, br\u00e5k proportioner 8\u20139 \u00e5r, konfliktl\u00f6sning, reflekterande text, Lgr22 v\u00e4rdegrund, empati, sj\u00e4lvreflektion, diagramtolkning, social kompetens',
    snippetAnswer: 'K\u00e4nslo\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar datahantering med k\u00e4nslodata i stapeldiagram, br\u00e5k med k\u00e4nsloanalyser, konfliktl\u00f6sningsstrategier och sj\u00e4lvst\u00e4ndig reflekterande skrivning med styckestruktur och empatisk argumentation. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 f\u00f6rdjupas k\u00e4nslotemat till avancerad sj\u00e4lvreflektion och social analys \u2014 \u00e5tta- och nio\u00e5ringar dokumenterar k\u00e4nslor i stapeldiagram \u00f6ver en vecka och analyserar trender, anv\u00e4nder br\u00e5k f\u00f6r att beskriva k\u00e4nsloandelar (tv\u00e5 fj\u00e4rdedelar av klassen k\u00e4nde sig glada), l\u00f6ser konflikter med strukturerade strategier och skriver reflekterande texter med perspektivtagande. Division ber\u00e4knar genomsnittlig k\u00e4nslopo\u00e4ng. Multiplikation anv\u00e4nds i rolespelsscenarier med konsekvensber\u00e4kning. Lgr22:s v\u00e4rdegrundm\u00e5l f\u00f6r empati, sj\u00e4lvk\u00e4nnedom och konfliktl\u00f6sning i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Datahantering med k\u00e4nslodata (8\u20139-\u00e5ringar tolkar stapeldiagram \u00f6ver tid)', howWeAddress: 'K\u00e4nslodagboks\u00f6vningar d\u00e4r eleverna registrerar k\u00e4nslor, skapar diagram och analyserar m\u00f6nster' },
      { milestone: 'Br\u00e5k med k\u00e4nsloanalys (andelar av grupp)', howWeAddress: 'Klassen\u00e4kt\u00f6vningar d\u00e4r eleverna ber\u00e4knar br\u00e5k av klassens k\u00e4nslor och j\u00e4mf\u00f6r veckor' },
      { milestone: 'Konfliktl\u00f6sning med strukturerade strategier', howWeAddress: 'Konfliktscenario\u00f6vningar d\u00e4r eleverna analyserar situationer och v\u00e4ljer l\u00f6sningar med motivering' },
      { milestone: 'Reflekterande skrivning med perspektivtagande', howWeAddress: 'Reflektions\u00f6vningar d\u00e4r eleverna skriver ur olika personers perspektiv i samma situation' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd f\u00f6renklad k\u00e4nsloskala med 3 niv\u00e5er, ge f\u00f6rfyllda diagrammallar och erbjud skrivmallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs nyanserad k\u00e4nsloskala med 10 niv\u00e5er, sj\u00e4lvst\u00e4ndig dataanalys med trendtolkning och fri reflekterande skrivning med filosofiska fr\u00e5gor till.',
    parentTakeaway: 'F\u00f6r en k\u00e4nslodagbok hemma: l\u00e5t barnet po\u00e4ngs\u00e4tta sin dag 1\u201310 och rita ett linjediagram \u00f6ver veckan. Diskutera: \u201dvilken dag var b\u00e4st? Varf\u00f6r tror du det?\u201d. \u00d6va perspektivtagande: \u201dhur tror du kompisen k\u00e4nde sig?\u201d. K\u00e4nslomatematik bygger b\u00e5de sj\u00e4lvk\u00e4nnedom och datakunskap.',
    classroomIntegration: 'K\u00e4nslotemat i \u00e5rskurs 3 integrerar v\u00e4rdegrundsarbete med matematik och svenska: k\u00e4nslodata och diagram i matematik, konfliktl\u00f6sning och empati i v\u00e4rdegrundsarbete, reflekterande texter i svenska. Lgr22:s v\u00e4rdegrundm\u00e5l och m\u00e5l f\u00f6r datahantering st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Datahantering med k\u00e4nslodata', emerging: 'l\u00e4ser av enkla diagram med st\u00f6d', proficient: 'skapar och tolkar sj\u00e4lvst\u00e4ndigt stapeldiagram och identifierar m\u00f6nster', advanced: 'analyserar trender \u00f6ver tid, j\u00e4mf\u00f6r dataserier och formulerar slutsatser' },
      { skill: 'Konfliktl\u00f6sning', emerging: 'identifierar ett problem och f\u00f6resl\u00e5r en l\u00f6sning med st\u00f6d', proficient: 'analyserar sj\u00e4lvst\u00e4ndigt konfliktsituationer och v\u00e4ljer l\u00f6sning med motivering', advanced: 'ser situationer fr\u00e5n flera perspektiv och f\u00f6resl\u00e5r nyanserade l\u00f6sningar' },
      { skill: 'Reflekterande skrivning', emerging: 'skriver 3\u20134 meningar om en k\u00e4nsla med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en reflekterande text med perspektivtagande och styckestruktur', advanced: 'skriver en djup reflektion med flera perspektiv, f\u00f6rklaringar och filosofiskt resonemang' },
    ],
  },

  'fairy-tales': {
    seoTitle: 'Gratis Sago\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara sago\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Ber\u00e4ttelseanalys, j\u00e4mf\u00f6rande text, br\u00e5k i sagoproportioner och kreativt skrivande. 33 generatorer. Gratis PDF.',
    seoKeywords: 'sago\u00f6vningar \u00e5rskurs 3, ber\u00e4ttelseanalys 8\u20139 \u00e5r, j\u00e4mf\u00f6rande text sagor, br\u00e5k proportioner, kreativt skrivande, Lgr22 svenska, ber\u00e4ttarstruktur, karaktrsanalys, bokrecension, figurativt spr\u00e5k',
    snippetAnswer: 'Sago\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar ber\u00e4ttelseanalys med karaktrsj\u00e4mf\u00f6relse, j\u00e4mf\u00f6rande texter om sagor fr\u00e5n olika kulturer, br\u00e5k med sagoproportioner och sj\u00e4lvst\u00e4ndigt kreativt skrivande med avancerad ber\u00e4ttarstruktur. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 f\u00f6rdjupas sagotemat till litter\u00e4r analys \u2014 \u00e5tta- och nio\u00e5ringar j\u00e4mf\u00f6r ber\u00e4ttelsestrukturer i sagor fr\u00e5n olika kulturer, analyserar karakt\u00e4rer med motivering fr\u00e5n texten, identifierar figurativt spr\u00e5k som liknelser och metaforer samt skriver egna avancerade sagor med subplot. Br\u00e5k kopplas till sagokontext (trollet kr\u00e4ver en tredjedel av skatten). Multiplikation l\u00f6ser magiska uppgifter (3 trollkarlar \u00d7 7 trollformler = 21 formler). Division f\u00f6rdelar skatten j\u00e4mnt. Bokrecensioner tr\u00e4nar \u00e5siktsuttryck med argument fr\u00e5n texten. Lgr22:s m\u00e5l f\u00f6r l\u00e4sf\u00f6rst\u00e5else, litter\u00e4r analys och kreativt skrivande i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Ber\u00e4ttelseanalys med karaktrsj\u00e4mf\u00f6relse (8\u20139-\u00e5ringar motiverar med textbevis)', howWeAddress: 'Karaktrs\u00f6vningar d\u00e4r eleverna j\u00e4mf\u00f6r karakt\u00e4rer fr\u00e5n olika sagor med citat och bevis' },
      { milestone: 'J\u00e4mf\u00f6rande text om sagor fr\u00e5n olika kulturer', howWeAddress: 'Kulturj\u00e4mf\u00f6relse\u00f6vningar d\u00e4r eleverna analyserar likheter och skillnader mellan sagor' },
      { milestone: 'Figurativt spr\u00e5k (liknelser och metaforer)', howWeAddress: '\u00d6vningar d\u00e4r eleverna identifierar och skapar liknelser och metaforer i sagokontext' },
      { milestone: 'Kreativt skrivande med avancerad ber\u00e4ttarstruktur', howWeAddress: 'Sagoskrivnings\u00f6vningar d\u00e4r eleverna skriver sagor med inledning, problem, stegrande handling, h\u00f6jdpunkt och uppl\u00f6sning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge ber\u00e4ttelsekartor med f\u00f6rifyllda element, anv\u00e4nd k\u00e4nda sagor och erbjud skrivmallar med styckeramar. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs analys av berttarperspektiv, j\u00e4mf\u00f6relse av tre kulturers sagor och sj\u00e4lvst\u00e4ndig saga med subplot och karakt\u00e4rsutveckling till.',
    parentTakeaway: 'L\u00e4s sagor fr\u00e5n olika l\u00e4nder och j\u00e4mf\u00f6r: \u201dvad har Askungen och den japanska sagan gemensamt?\u201d. Hitta liknelser i texten: \u201dmodig som ett lejon\u201d. L\u00e5t barnet skriva en egen saga med problem och l\u00f6sning. Diskutera karakt\u00e4rernas val och varf\u00f6r de handlade som de gjorde. Sagor bygger b\u00e5de l\u00e4sf\u00f6rst\u00e5else och empati.',
    classroomIntegration: 'Sagotemat i \u00e5rskurs 3 integrerar svenska och SO: ber\u00e4ttelseanalys och kreativt skrivande i svenska, kulturj\u00e4mf\u00f6relser i SO, br\u00e5k och logiska uppgifter i matematik. Sagofestival med dramatiseringar f\u00f6rbinder l\u00e4sning, skrivning och framf\u00f6rande. Lgr22:s m\u00e5l f\u00f6r l\u00e4sf\u00f6rst\u00e5else och kreativt skrivande st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Ber\u00e4ttelseanalys med textbevis', emerging: 'beskriver en karakt\u00e4r med st\u00f6d', proficient: 'j\u00e4mf\u00f6r sj\u00e4lvst\u00e4ndigt karakt\u00e4rer med citat fr\u00e5n texten som bevis', advanced: 'analyserar karakt\u00e4rsutveckling, teman och berttarperspektiv med textbevis' },
      { skill: 'J\u00e4mf\u00f6rande text om sagor', emerging: 'n\u00e4mner en likhet mellan tv\u00e5 sagor med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en j\u00e4mf\u00f6rande text med likheter och skillnader', advanced: 'skriver en nyanserad analys av tre sagor med kulturell kontext och motiverade slutsatser' },
      { skill: 'Kreativt sagoskrivande', emerging: 'skriver en kort saga med b\u00f6rjan och slut', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en saga med fullst\u00e4ndig ber\u00e4ttarstruktur och figurativt spr\u00e5k', advanced: 'skriver en avancerad saga med subplot, karakt\u00e4rsutveckling och tematiskt djup' },
    ],
  },

  farm: {
    seoTitle: 'Gratis Bondg\u00e5rds\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara bondg\u00e5rds\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Multiplikation med sk\u00f6rd, br\u00e5k, areal av \u00e5krar och jordbruksrapporter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'bondg\u00e5rds\u00f6vningar \u00e5rskurs 3, multiplikation sk\u00f6rd, br\u00e5k bondg\u00e5rd 8\u20139 \u00e5r, areal omkrets \u00e5ker, jordbruksrapport, Lgr22 matematik, division djurf\u00f6da, linjediagram v\u00e4xt, budget lantbruk, h\u00e5llbar mat',
    snippetAnswer: 'Bondg\u00e5rds\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar multiplikation med sk\u00f6rdber\u00e4kningar, br\u00e5k med foderm\u00e4ngder, areal och omkrets av \u00e5krar och f\u00e4lt samt sj\u00e4lvst\u00e4ndig skrivning av jordbruksrapporter med data och slutsatser. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir bondg\u00e5rdstemat ett lantbruksf\u00f6retagsprojekt \u2014 \u00e5tta- och nio\u00e5ringar ber\u00e4knar sk\u00f6rdar med multiplikation (8 rader \u00d7 15 plantor = 120 plantor), arbetar med br\u00e5k f\u00f6r foderblandningar (tv\u00e5 fj\u00e4rdedelar hav och en fj\u00e4rdedel korn) och ber\u00e4knar areal och omkrets av \u00e5krar. Division f\u00f6rdelar sk\u00f6rd mellan marknader. Linjediagram visar v\u00e4xtf\u00f6rlopp \u00f6ver s\u00e4songen. Budgetber\u00e4kningar f\u00f6r fr\u00f6k\u00f6p och f\u00f6rs\u00e4ljning tr\u00e4nar ekonomif\u00f6rst\u00e5else. Jordbruksrapporter med data, analys och slutsats tr\u00e4nar vetenskapligt skrivande. H\u00e5llbar matproduktion kopplar till NO. Lgr22:s m\u00e5l f\u00f6r multiplikation, areal och rapportering i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Multiplikation med sk\u00f6rdber\u00e4kningar (8\u20139-\u00e5ringar ber\u00e4knar rader \u00d7 plantor)', howWeAddress: 'Sk\u00f6rduppgifter d\u00e4r eleverna ber\u00e4knar total sk\u00f6rd med multiplikation och verifierar med division' },
      { milestone: 'Br\u00e5k med foderblandningar och sk\u00f6rdf\u00f6rdelning', howWeAddress: 'Foderrecept\u00f6vningar d\u00e4r eleverna ber\u00e4knar br\u00e5k av foderm\u00e4ngder och j\u00e4mf\u00f6r proportioner' },
      { milestone: 'Areal och omkrets av \u00e5krar och f\u00e4lt (praktisk geometri)', howWeAddress: '\u00c5kerareal\u00f6vningar d\u00e4r eleverna ber\u00e4knar odlingsyta och st\u00e4ngsell\u00e4ngd' },
      { milestone: 'Jordbruksrapport med data och slutsats', howWeAddress: 'Rapportmallar d\u00e4r eleverna dokumenterar sk\u00f6rddata, skapar diagram och formulerar slutsatser' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa multiplikation till ensiffriga faktorer, anv\u00e4nd halvor och fj\u00e4rdedelar och ge rapportmallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs flerstegs sk\u00f6rdber\u00e4kningar, br\u00e5k med sj\u00e4ttedelar och \u00e5ttondelar samt sj\u00e4lvst\u00e4ndig jordbruksrapport med l\u00f6nsamhetsanalys till.',
    parentTakeaway: 'Bes\u00f6k en bondg\u00e5rd eller odla hemma: \u201dom vi planterar 6 rader med 8 fr\u00f6n \u2014 hur m\u00e5nga plantor?\u201d. Ber\u00e4kna arealen av en odlingsb\u00e4dd. M\u00e4t och rita ett linjediagram \u00f6ver hur plantorna v\u00e4xer. Ber\u00e4kna matkostnader f\u00f6r veckan. Bondg\u00e5rdsmatematik kopplar siffror till verkligheten.',
    classroomIntegration: 'Bondg\u00e5rdstemat i \u00e5rskurs 3 integrerar matematik, NO och SO: multiplikation och areal i matematik, v\u00e4xtodling och h\u00e5llbarhet i NO, matproduktion och ekonomi i SO, jordbruksrapporter i svenska. Klassodlingsprojekt f\u00f6rbinder teori och praktik. Lgr22:s m\u00e5l f\u00f6r multiplikation, areal och rapportering st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Multiplikation med sk\u00f6rddata', emerging: 'l\u00f6ser enkel multiplikation med bondg\u00e5rdstal med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt sk\u00f6rdar med multiplikation och verifierar med division', advanced: 'l\u00f6ser flerstegsuppgifter med b\u00e5de multiplikation och division samt budgeterar' },
      { skill: 'Areal och omkrets av \u00e5krar', emerging: 'ber\u00e4knar areal av en rektangel med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt areal och omkrets och anv\u00e4nder korrekta enheter', advanced: 'l\u00f6ser sammansatta arealproblem och till\u00e4mpar p\u00e5 verkliga odlingsscenarier' },
      { skill: 'Jordbruksrapport med data', emerging: 'beskriver odlingsresultat med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en rapport med data, diagram och slutsats', advanced: 'skriver en detaljerad rapport med j\u00e4mf\u00f6relse, l\u00f6nsamhetsanalys och f\u00f6rb\u00e4ttringsf\u00f6rslag' },
    ],
  },

  flowers: {
    seoTitle: 'Gratis Blom\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara blom\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Br\u00e5k med kronblad, symmetri, m\u00e4tning av v\u00e4xt och botanisk rapport. 33 generatorer. Gratis PDF.',
    seoKeywords: 'blom\u00f6vningar \u00e5rskurs 3, br\u00e5k kronblad, symmetri blommor 8\u20139 \u00e5r, m\u00e4tning v\u00e4xt, botanisk rapport, Lgr22 NO, linjediagram v\u00e4xtf\u00f6rlopp, multiplikation plantering, pollinering, vetenskaplig metod',
    snippetAnswer: 'Blom\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar br\u00e5k med kronbladsm\u00f6nster, symmetri i blomdesign, m\u00e4tning av v\u00e4xtf\u00f6rlopp med linjediagram och sj\u00e4lvst\u00e4ndig skrivning av botaniska forskningsrapporter med vetenskaplig metod. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir blomtemat ett botaniskt forskningsprojekt \u2014 \u00e5tta- och nio\u00e5ringar unders\u00f6ker br\u00e5k genom kronbladsm\u00f6nster (en femtedel av kronbladen \u00e4r r\u00f6da), analyserar symmetri i blommors utseende, m\u00e4ter och dokumenterar v\u00e4xtf\u00f6rlopp i linjediagram \u00f6ver veckor. Multiplikation ber\u00e4knar planteringsbehov (6 rader \u00d7 8 l\u00f6kar = 48 l\u00f6kar). Areal ber\u00e4knas f\u00f6r tr\u00e4dg\u00e5rdsrabatter. Pollinering och fr\u00f6spridning kopplar till ekologi. Botaniska forskningsrapporter med hypotes, experiment och resultat tr\u00e4nar vetenskaplig metod. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, m\u00e4tning och vetenskaplig rapportering i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Br\u00e5k med kronbladsm\u00f6nster (8\u20139-\u00e5ringar ber\u00e4knar andelar i naturkontext)', howWeAddress: 'Kronblads\u00f6vningar d\u00e4r eleverna ber\u00e4knar br\u00e5k av kronblad i olika f\u00e4rger' },
      { milestone: 'Symmetri i blommors form (geometrisk analys av natur)', howWeAddress: 'Symmetri\u00f6vningar d\u00e4r eleverna identifierar och ritar symmetrilinjer i blomdesigner' },
      { milestone: 'M\u00e4tning av v\u00e4xtf\u00f6rlopp med linjediagram', howWeAddress: 'V\u00e4xtdagboks\u00f6vningar d\u00e4r eleverna m\u00e4ter plantl\u00e4ngd veckovis och skapar linjediagram' },
      { milestone: 'Botanisk forskningsrapport med vetenskaplig metod', howWeAddress: 'Rapportmallar d\u00e4r eleverna dokumenterar v\u00e4xtexperiment med hypotes, metod och resultat' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd halvor och fj\u00e4rdedelar f\u00f6r br\u00e5k, ge f\u00f6rfyllda diagrammallar och erbjud rapportmallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs br\u00e5k med femtedelar och \u00e5ttondelar, sj\u00e4lvst\u00e4ndig datainsamling med analys och forskningsrapport med kontrollerade experiment till.',
    parentTakeaway: 'Plantera fr\u00f6n hemma och f\u00f6r v\u00e4xtdagbok: m\u00e4t varje vecka och rita ett linjediagram. R\u00e4kna kronblad: \u201d5 av 20 kronblad \u00e4r gula \u2014 vilken br\u00e5kdel?\u201d. Ber\u00e4kna planteringsbehov f\u00f6r rabatten. L\u00e5t barnet skriva en rapport om sitt v\u00e4xtexperiment. Blommor \u00e4r vetenskap som v\u00e4xer.',
    classroomIntegration: 'Blomtemat i \u00e5rskurs 3 integrerar NO, matematik och svenska: botanik och pollinering i NO, br\u00e5k och diagram i matematik, forskningsrapporter i svenska, blomdesign i bild. Klassodlingsprojekt ger autentisk datainsamling. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, m\u00e4tning och rapportering st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Br\u00e5k med blomm\u00f6nster', emerging: 'identifierar halvor och fj\u00e4rdedelar med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt br\u00e5k av antal och j\u00e4mf\u00f6r andelar', advanced: 'l\u00f6ser br\u00e5kuppgifter med olika n\u00e4mnare i naturkontext' },
      { skill: 'M\u00e4tning och linjediagram', emerging: 'm\u00e4ter med st\u00f6d och fyller i f\u00f6rgjort diagram', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och skapar linjediagram med korrekta v\u00e4rden', advanced: 'analyserar v\u00e4xtdiagram, identifierar trender och formulerar slutsatser' },
      { skill: 'Botanisk forskningsrapport', emerging: 'beskriver ett experiment med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en rapport med hypotes, metod och resultat', advanced: 'skriver en detaljerad rapport med kontrollgrupp, felk\u00e4llor och perspektivering' },
    ],
  },

  food: {
    seoTitle: 'Gratis Mat\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara mat\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). N\u00e4ringsl\u00e4ra med br\u00e5k, matbudget, multiplikation och h\u00e4lsorapporter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'mat\u00f6vningar \u00e5rskurs 3, n\u00e4ringsl\u00e4ra br\u00e5k, matbudget ber\u00e4kning 8\u20139 \u00e5r, multiplikation m\u00e5ltider, h\u00e4lsorapport, Lgr22 hemkunskap, tallriksmodellen, matsvinn, stapeldiagram n\u00e4ring, h\u00e5llbar mat',
    snippetAnswer: 'Mat\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar n\u00e4ringsl\u00e4ra med br\u00e5k via tallriksmodellen, matbudget med multiplikation och division, datahantering med n\u00e4ringsdiagram samt sj\u00e4lvst\u00e4ndig skrivning av h\u00e4lsorapporter om kost och h\u00e5llbarhet. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 kopplar mattemat till h\u00e4lsa och ekonomi \u2014 \u00e5tta- och nio\u00e5ringar anv\u00e4nder tallriksmodellen med br\u00e5k (en fj\u00e4rdedel protein, en fj\u00e4rdedel kolhydrater, halva gr\u00f6nsaker), budgeterar veckans matink\u00f6p med multiplikation och division, skapar stapeldiagram \u00f6ver n\u00e4rings\u00e4mnen och analyserar matsvinn. M\u00e5ttomvandling mellan g, kg och dl, l till\u00e4mpas p\u00e5 recept. J\u00e4mf\u00f6rande texter analyserar matvanor i olika l\u00e4nder. H\u00e4lsorapporter med data och slutsats tr\u00e4nar vetenskapligt skrivande. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, m\u00e4tning och h\u00e4lsa i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'N\u00e4ringsl\u00e4ra med br\u00e5k via tallriksmodellen (8\u20139-\u00e5ringar f\u00f6rst\u00e5r proportioner)', howWeAddress: 'Tallriksmodell\u00f6vningar d\u00e4r eleverna ber\u00e4knar br\u00e5k av n\u00e4rings\u00e4mnesgrupper och planerar m\u00e5ltider' },
      { milestone: 'Matbudget med multiplikation och division', howWeAddress: 'Matink\u00f6ps\u00f6vningar d\u00e4r eleverna planerar veckobudget och ber\u00e4knar styckepris' },
      { milestone: 'Datahantering med n\u00e4ringsdiagram (stapel- och cirkeldiagram)', howWeAddress: 'N\u00e4ringsdiagram\u00f6vningar d\u00e4r eleverna skapar diagram \u00f6ver dagligt intag och analyserar resultat' },
      { milestone: 'H\u00e4lsorapport om kost med data och slutsats', howWeAddress: 'Rapportmallar d\u00e4r eleverna dokumenterar matdagbok, analyserar data och formulerar h\u00e4lsor\u00e5d' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd halvor och fj\u00e4rdedelar, ge j\u00e4mna priser och erbjud rapportmallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs br\u00e5k med \u00e5ttondelar, kostnadsoptimering med begr\u00e4nsad budget och sj\u00e4lvst\u00e4ndig h\u00e4lsorapport med j\u00e4mf\u00f6rande kostanalys till.',
    parentTakeaway: 'G\u00f6r matink\u00f6p till matematik: ge barnet en budget p\u00e5 200 kr f\u00f6r en m\u00e5ltid och l\u00e5t dem planera. Anv\u00e4nd tallriksmodellen: \u201dvilken br\u00e5kdel \u00e4r gr\u00f6nsaker?\u201d. J\u00e4mf\u00f6r priser per kilo. F\u00f6r matdagbok och rita diagram \u00f6ver veckan. Mat \u00e4r matematik som smakar bra.',
    classroomIntegration: 'Mattemat i \u00e5rskurs 3 integrerar hemkunskap, matematik och NO: tallriksmodell och budget i matematik, matlagning och n\u00e4ringsl\u00e4ra i hemkunskap, h\u00e5llbar mat i NO, h\u00e4lsorapporter i svenska. Klassens matvecka f\u00f6rbinder \u00e4mnena. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, m\u00e4tning och h\u00e4lsa st\u00f6ds.',
    assessmentRubric: [
      { skill: 'N\u00e4ringsl\u00e4ra med br\u00e5k', emerging: 'identifierar halvor och fj\u00e4rdedelar p\u00e5 tallriken med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt br\u00e5k av n\u00e4rings\u00e4mnesgrupper och planerar balanserade m\u00e5ltider', advanced: 'analyserar n\u00e4ringsinneh\u00e5ll med br\u00e5k, j\u00e4mf\u00f6r m\u00e5ltider och optimerar kost' },
      { skill: 'Matbudget och ber\u00e4kning', emerging: 'adderar priser med st\u00f6d', proficient: 'planerar sj\u00e4lvst\u00e4ndigt matbudget med multiplikation och division', advanced: 'optimerar ink\u00f6p med prisj\u00e4mf\u00f6relse och h\u00e5ller budget med motivering' },
      { skill: 'H\u00e4lsorapport om kost', emerging: 'beskriver matvanor med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en rapport med data, diagram och slutsats', advanced: 'skriver en detaljerad rapport med j\u00e4mf\u00f6rande analys och evidensbaserade rekommendationer' },
    ],
  },

  forest: {
    seoTitle: 'Gratis Skogs\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara skogs\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Ekosystemforskning, areal av skogsomr\u00e5den, linjediagram och naturvetenskapliga rapporter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'skogs\u00f6vningar \u00e5rskurs 3, ekosystem forskning, areal skog 8\u20139 \u00e5r, linjediagram tr\u00e4dv\u00e4xt, naturvetenskaplig rapport, Lgr22 NO, multiplikation tr\u00e4d, m\u00e5ttomvandling m km, biologisk m\u00e5ngfald, h\u00e5llbarhet',
    snippetAnswer: 'Skogs\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar ekosystemforskning, areal av skogsomr\u00e5den, linjediagram \u00f6ver tr\u00e4dv\u00e4xt och sj\u00e4lvst\u00e4ndig skrivning av naturvetenskapliga rapporter om biologisk m\u00e5ngfald. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir skogstemat ett ekologiskt forskningsprojekt \u2014 \u00e5tta- och nio\u00e5ringar unders\u00f6ker ekosystem med n\u00e4ringskedjor och n\u00e4ringsv\u00e4var, ber\u00e4knar areal av skogsomr\u00e5den och naturreservat, m\u00e4ter tr\u00e4dh\u00f6jd och stamomf\u00e5ng med m\u00e5ttomvandling. Linjediagram dokumenterar \u00e5rstidernas f\u00f6r\u00e4ndringar. Multiplikation ber\u00e4knar tr\u00e4dantal (5 rader \u00d7 12 tr\u00e4d = 60 tr\u00e4d). Division f\u00f6rdelar utplanteringsomr\u00e5den. Br\u00e5k beskriver artf\u00f6rdelning. Naturvetenskapliga rapporter med hypotes och slutsats tr\u00e4nar vetenskaplig metod. H\u00e5llbart skogsbruk kopplar till samh\u00e4llsfr\u00e5gor. Lgr22:s m\u00e5l f\u00f6r ekologi, m\u00e4tning och rapportering i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Ekosystemf\u00f6rst\u00e5else med n\u00e4ringskedjor och n\u00e4ringsv\u00e4var (8\u20139-\u00e5ringar analyserar samband)', howWeAddress: 'Ekosystem\u00f6vningar d\u00e4r eleverna kartl\u00e4gger n\u00e4ringskedjor och f\u00f6rklarar samband mellan arter' },
      { milestone: 'Areal av skogsomr\u00e5den med m\u00e5ttomvandling (m\u00b2 och hektar)', howWeAddress: 'Skogsareal\u00f6vningar d\u00e4r eleverna ber\u00e4knar omr\u00e5den och j\u00e4mf\u00f6r storlekar med omvandling' },
      { milestone: 'Linjediagram \u00f6ver s\u00e4songsf\u00f6r\u00e4ndringar i skogen', howWeAddress: 'S\u00e4songsdagboks\u00f6vningar d\u00e4r eleverna registrerar f\u00f6r\u00e4ndringar och skapar linjediagram' },
      { milestone: 'Naturvetenskaplig rapport om biologisk m\u00e5ngfald', howWeAddress: 'Forskningsrapportmallar d\u00e4r eleverna dokumenterar skogsunders\u00f6kningar med vetenskaplig metod' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, fokusera p\u00e5 enkla n\u00e4ringskedjor med 3 led, anv\u00e4nd rutpapper f\u00f6r areal och ge rapportmallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs n\u00e4ringsv\u00e4var med 5+ arter, arealber\u00e4kning med sammansatta figurer och sj\u00e4lvst\u00e4ndig rapport om h\u00e5llbart skogsbruk till.',
    parentTakeaway: 'G\u00e5 p\u00e5 skogsutflykt och r\u00e4kna: hur m\u00e5nga tr\u00e4d p\u00e5 en yta av 10 \u00d7 10 meter? M\u00e4t en stams omkrets. Rita en n\u00e4ringskedja fr\u00e5n det ni ser. F\u00f6r en s\u00e4songsdagbok \u00f6ver vad som f\u00f6r\u00e4ndras. L\u00e5t barnet skriva en rapport om sin skogsunders\u00f6kning. Skogen \u00e4r det st\u00f6rsta laboratoriet.',
    classroomIntegration: 'Skogstemat i \u00e5rskurs 3 integrerar NO, matematik och svenska: ekosystem och biologisk m\u00e5ngfald i NO, areal och diagram i matematik, naturvetenskapliga rapporter i svenska. Utomhusdag i skogen ger autentisk datainsamling. Lgr22:s m\u00e5l f\u00f6r ekologi, m\u00e4tning och rapportering st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Ekosystemf\u00f6rst\u00e5else', emerging: 'beskriver en enkel n\u00e4ringskedja med 3 led med st\u00f6d', proficient: 'kartl\u00e4gger sj\u00e4lvst\u00e4ndigt n\u00e4ringsv\u00e4var och f\u00f6rklarar samband', advanced: 'analyserar ekosystemets svar p\u00e5 f\u00f6r\u00e4ndringar och f\u00f6resl\u00e5r konsekvenser' },
      { skill: 'Areal och m\u00e5ttomvandling', emerging: 'ber\u00e4knar areal med rutpapper med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt areal med formel och omvandlar enheter', advanced: 'l\u00f6ser sammansatta arealuppgifter och j\u00e4mf\u00f6r omr\u00e5den i olika enheter' },
      { skill: 'Naturvetenskaplig skogsrapport', emerging: 'beskriver observationer med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en rapport med hypotes, metod och resultat', advanced: 'skriver en detaljerad rapport med dataanalys, slutsatser och h\u00e5llbarhetsresonemang' },
    ],
  },

  fruits: {
    seoTitle: 'Gratis Frukt\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara frukt\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Br\u00e5k med fruktdelning, multiplikation, m\u00e5ttomvandling vikt och h\u00e4lsorapporter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'frukt\u00f6vningar \u00e5rskurs 3, br\u00e5k frukt delning, multiplikation frukthandel 8\u20139 \u00e5r, m\u00e5ttomvandling g kg, h\u00e4lsorapport frukt, Lgr22 matematik, division f\u00f6rdelning, stapeldiagram n\u00e4ring, fruktsallad recept, vitamin',
    snippetAnswer: 'Frukt\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar br\u00e5k med fruktdelning, multiplikation med frukthandel och portioner, m\u00e5ttomvandling mellan gram och kilogram samt sj\u00e4lvst\u00e4ndig skrivning av h\u00e4lsorapporter om frukt och n\u00e4ring. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 kopplar frukttemat matematik till h\u00e4lsa och handel \u2014 \u00e5tta- och nio\u00e5ringar arbetar med br\u00e5k genom fruktdelning (\u00e4pplet delas i \u00e5ttondelar, tre \u00e5ttondelar \u00e4ts), ber\u00e4knar priser med multiplikation (6 kg \u00e4pplen \u00e0 18 kr/kg) och omvandlar mellan g och kg. Division ber\u00e4knar styckepris och f\u00f6rdelar frukt j\u00e4mnt. Stapeldiagram visar fruktf\u00f6rbrukning. Fruktsalladrecept tr\u00e4nar instruerande text med exakta m\u00e5tt. H\u00e4lsorapporter om vitaminer och n\u00e4ring tr\u00e4nar vetenskapligt skrivande. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, m\u00e4tning och h\u00e4lsa i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Br\u00e5k med fruktdelning (8\u20139-\u00e5ringar f\u00f6rst\u00e5r delar av helhet)', howWeAddress: 'Fruktdelnings\u00f6vningar d\u00e4r eleverna ber\u00e4knar br\u00e5k av frukt och j\u00e4mf\u00f6r andelar' },
      { milestone: 'Multiplikation med frukthandel (prisber\u00e4kning, portioner)', howWeAddress: 'Fruktmarknads\u00f6vningar d\u00e4r eleverna ber\u00e4knar totalpris och styckepris med multiplikation och division' },
      { milestone: 'M\u00e5ttomvandling g/kg (viktber\u00e4kning med frukt)', howWeAddress: 'Omvandlings\u00f6vningar d\u00e4r eleverna v\u00e4ger, omvandlar och j\u00e4mf\u00f6r fruktvikter' },
      { milestone: 'H\u00e4lsorapport om frukt och n\u00e4ring', howWeAddress: 'Rapportmallar d\u00e4r eleverna unders\u00f6ker vitamininneh\u00e5ll, skapar diagram och formulerar slutsatser' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd halvor och fj\u00e4rdedelar, ge j\u00e4mna priser och erbjud rapportmallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs br\u00e5k med \u00e5ttondelar, prisj\u00e4mf\u00f6relse med division och sj\u00e4lvst\u00e4ndig rapport med j\u00e4mf\u00f6rande n\u00e4ringsanalys till.',
    parentTakeaway: 'G\u00f6r fruktink\u00f6p till matematik: \u201d6 kg \u00e4pplen \u00e0 18 kr/kg \u2014 vad kostar det?\u201d. Dela en apelsin i \u00e5ttondelar och \u00f6va br\u00e5k. V\u00e4g frukt och omvandla: \u201d750 g = hur m\u00e5nga kg?\u201d. G\u00f6r fruktsallad och skriv receptet. Fruktmatematik \u00e4r h\u00e4lsa med siffror.',
    classroomIntegration: 'Frukttemat i \u00e5rskurs 3 integrerar matematik, NO och hemkunskap: br\u00e5k och m\u00e5ttomvandling i matematik, vitaminer och n\u00e4ring i NO, fruktsalladtillverkning i hemkunskap, h\u00e4lsorapporter i svenska. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, m\u00e4tning och h\u00e4lsa st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Br\u00e5k med fruktdelning', emerging: 'identifierar halvor och fj\u00e4rdedelar med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt \u00e5ttondelar och tredjedelar och j\u00e4mf\u00f6r br\u00e5k', advanced: 'l\u00f6ser br\u00e5kuppgifter med olika n\u00e4mnare och f\u00f6rklarar samband med division' },
      { skill: 'M\u00e5ttomvandling g/kg', emerging: 'omvandlar mellan g och kg med st\u00f6d', proficient: 'omvandlar sj\u00e4lvst\u00e4ndigt och till\u00e4mpar i kontextuella uppgifter', advanced: 'l\u00f6ser komplexa vikter\u00e4kningar med omvandling och uppskattar rimlighet' },
      { skill: 'H\u00e4lsorapport om frukt', emerging: 'beskriver frukt och n\u00e4ring med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en rapport med data, diagram och slutsats', advanced: 'skriver en j\u00e4mf\u00f6rande rapport med vitaminanalys och evidensbaserade rekommendationer' },
    ],
  },

  furniture: {
    seoTitle: 'Gratis M\u00f6bel\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara m\u00f6bel\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Areal och omkrets, skalritning, m\u00e5ttomvandling och inredningsbeskrivningar. 33 generatorer. Gratis PDF.',
    seoKeywords: 'm\u00f6bel\u00f6vningar \u00e5rskurs 3, areal omkrets rum, skalritning 8\u20139 \u00e5r, m\u00e5ttomvandling cm m, inredningsbeskrivning text, Lgr22 matematik, planritning, rumsdesign, budget m\u00f6bler, geometri 3D',
    snippetAnswer: 'M\u00f6bel\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar areal och omkrets av rum, skalritning av m\u00f6bleringsplaner, m\u00e5ttomvandling mellan cm och m samt sj\u00e4lvst\u00e4ndig skrivning av inredningsbeskrivningar med adjektiv och styckestruktur. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir m\u00f6beltemat ett inredningsdesignprojekt \u2014 \u00e5tta- och nio\u00e5ringar ber\u00e4knar areal och omkrets av rum f\u00f6r m\u00f6blering, ritar skalritningar av m\u00f6bleringsplaner, omvandlar m\u00e5tt mellan cm och m f\u00f6r att matcha m\u00f6bler med utrymmen. Multiplikation ber\u00e4knar materialkostnader. Division f\u00f6rdelar budget p\u00e5 rum. 3D-figurer analyseras genom m\u00f6belformer (rektangul\u00e4ra prismor, cylindrar). Budgetplanering tr\u00e4nar ekonomisk f\u00f6rst\u00e5else. Inredningsbeskrivningar med rika adjektiv och rumslig f\u00f6rst\u00e5else tr\u00e4nar beskrivande skrivning. Lgr22:s m\u00e5l f\u00f6r geometri, m\u00e4tning och beskrivande text i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Areal och omkrets av rum (8\u20139-\u00e5ringar ber\u00e4knar f\u00f6r m\u00f6blering)', howWeAddress: 'Rumsplaneringsppgifter d\u00e4r eleverna ber\u00e4knar golvyta och v\u00e4ggl\u00e4ngd f\u00f6r m\u00f6bleringsval' },
      { milestone: 'Skalritning av m\u00f6bleringsplan (proportionsf\u00f6rst\u00e5else)', howWeAddress: 'Planritnings\u00f6vningar d\u00e4r eleverna ritar rum och m\u00f6bler i skala p\u00e5 rutpapper' },
      { milestone: 'M\u00e5ttomvandling cm/m f\u00f6r m\u00f6belstorlekar', howWeAddress: 'M\u00e5ttuppgifter d\u00e4r eleverna m\u00e4ter m\u00f6bler, omvandlar enheter och matchar med utrymmen' },
      { milestone: 'Inredningsbeskrivning med adjektiv och rumslig f\u00f6rst\u00e5else', howWeAddress: 'Beskrivnings\u00f6vningar d\u00e4r eleverna skriver detaljerade rumsbeskrivningar med rumsliga prepositioner' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd rutpapper f\u00f6r arealr\u00e4kning, begr\u00e4nsa till hela cm-m\u00e5tt och ge beskrivningsmallar. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs sammansatta rum, skalber\u00e4kning med decimaler och sj\u00e4lvst\u00e4ndig inredningsbeskrivning med budgetmotivering till.',
    parentTakeaway: 'M\u00e4t hemma och r\u00e4kna: ber\u00e4kna barnrummets areal, rita en planritning, flytta runt m\u00f6bler p\u00e5 papper f\u00f6re verkligheten. M\u00e4t en bokhylla och omvandla cm till m. Budgetera: \u201dom vi har 2 000 kr f\u00f6r nya m\u00f6bler, vad har vi r\u00e5d med?\u201d. M\u00f6belmatematik \u00e4r matematik man bor i.',
    classroomIntegration: 'M\u00f6beltemat i \u00e5rskurs 3 integrerar matematik, teknik och svenska: areal och skalritning i matematik, design och konstruktion i teknik/slj\u00f6d, inredningsbeskrivningar i svenska. Klassrumsom\u00f6blering som matematikprojekt f\u00f6rbinder teori och praktik. Lgr22:s m\u00e5l f\u00f6r geometri, m\u00e4tning och beskrivande text st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Areal och omkrets av rum', emerging: 'ber\u00e4knar areal med rutpapper med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt areal och omkrets med formel och enheter', advanced: 'l\u00f6ser sammansatta rumsplaneringsuppgifter och optimerar m\u00f6belplacering' },
      { skill: 'Skalritning', emerging: 'ritar enkla former i skala med st\u00f6d', proficient: 'ritar sj\u00e4lvst\u00e4ndigt rum och m\u00f6bler i korrekt skala', advanced: 'skapar detaljerade planritningar med korrekt skala och m\u00e5ttangivelser' },
      { skill: 'Inredningsbeskrivning', emerging: 'beskriver ett rum med enkla meningar', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en detaljerad beskrivning med adjektiv och rumsliga prepositioner', advanced: 'skriver en \u00f6vertygande inredningspresentation med motivering och budget' },
    ],
  },

  garden: {
    seoTitle: 'Gratis Tr\u00e4dg\u00e5rds\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara tr\u00e4dg\u00e5rds\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Areal och omkrets, v\u00e4xtexperiment, br\u00e5k och odlingsdagbok. 33 generatorer. Gratis PDF.',
    seoKeywords: 'tr\u00e4dg\u00e5rds\u00f6vningar \u00e5rskurs 3, areal omkrets odling, v\u00e4xtexperiment 8\u20139 \u00e5r, br\u00e5k plantering, odlingsdagbok, Lgr22 NO, linjediagram v\u00e4xt, multiplikation fr\u00f6, pollinering, h\u00e5llbar odling',
    snippetAnswer: 'Tr\u00e4dg\u00e5rds\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar areal och omkrets av odlingsb\u00e4ddar, v\u00e4xtexperiment med linjediagram, br\u00e5k med planteringsf\u00f6rdelning och sj\u00e4lvst\u00e4ndig skrivning av odlingsdagbok med vetenskaplig metod. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir tr\u00e4dg\u00e5rdstemat ett vetenskapligt odlingsprojekt \u2014 \u00e5tta- och nio\u00e5ringar ber\u00e4knar areal och omkrets av odlingsb\u00e4ddar, planerar v\u00e4xtexperiment med variabler (ljus, vatten, jord), dokumenterar v\u00e4xtf\u00f6rlopp i linjediagram. Multiplikation ber\u00e4knar fr\u00f6behov (4 rader \u00d7 10 fr\u00f6n = 40 fr\u00f6n). Br\u00e5k f\u00f6rdelar odlingsytan (en tredjedel mortsb\u00e4ddar, tv\u00e5 tredjedelar bl\u00f6mmor). Division f\u00f6rdelar sk\u00f6rd j\u00e4mnt. Pollinering och fotosyntes kopplar till NO. Odlingsdagbok med vetenskaplig struktur tr\u00e4nar rapportskrivning. H\u00e5llbar odling kopplar till samh\u00e4llsfr\u00e5gor. Lgr22:s m\u00e5l f\u00f6r areal, m\u00e4tning och vetenskaplig unders\u00f6kning i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Areal och omkrets av odlingsb\u00e4ddar (8\u20139-\u00e5ringar planerar odlingsytor)', howWeAddress: 'Tr\u00e4dg\u00e5rdsplaneringsppgifter d\u00e4r eleverna ber\u00e4knar b\u00e4ddaarea och kant\u00f6ngd' },
      { milestone: 'V\u00e4xtexperiment med variabler (kontrollerad unders\u00f6kning)', howWeAddress: 'Experiment\u00f6vningar d\u00e4r eleverna planerar f\u00f6rs\u00f6k med en variabel och dokumenterar resultat' },
      { milestone: 'Linjediagram \u00f6ver v\u00e4xtf\u00f6rlopp', howWeAddress: 'V\u00e4xtdagboks\u00f6vningar d\u00e4r eleverna m\u00e4ter veckovis och skapar diagram med trendanalys' },
      { milestone: 'Odlingsdagbok med vetenskaplig struktur', howWeAddress: 'Dagboksmallar d\u00e4r eleverna dokumenterar planering, genomf\u00f6rande, observationer och slutsatser' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd rutpapper f\u00f6r areal, ge f\u00f6renklade experimentf\u00f6rslag och erbjud dagboksmallar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs sammansatta b\u00e4ddar, experiment med tv\u00e5 variabler och sj\u00e4lvst\u00e4ndig forskningsrapport med statistisk analys till.',
    parentTakeaway: 'Odla hemma och r\u00e4kna: ber\u00e4kna arealen av odlingsb\u00e4dden, plantera med multiplikation (3 rader \u00d7 8 fr\u00f6n), m\u00e4t varje vecka och rita diagram. G\u00f6r ett enkelt experiment: \u201dv\u00e4xer plantan snabbare i sol eller skugga?\u201d. F\u00f6r odlingsdagbok. Tr\u00e4dg\u00e5rden \u00e4r det b\u00e4sta laboratoriet.',
    classroomIntegration: 'Tr\u00e4dg\u00e5rdstemat i \u00e5rskurs 3 integrerar NO, matematik och svenska: v\u00e4xtexperiment och ekologi i NO, areal och diagram i matematik, odlingsdagbok i svenska. Klasstr\u00e4dg\u00e5rd med matteuppdrag f\u00f6rbinder alla \u00e4mnen. Lgr22:s m\u00e5l f\u00f6r areal, m\u00e4tning och vetenskaplig unders\u00f6kning st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Areal och omkrets av odlingsb\u00e4ddar', emerging: 'ber\u00e4knar areal med rutpapper med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt areal och omkrets med formel', advanced: 'planerar sammansatta odlingsytor och optimerar placering' },
      { skill: 'V\u00e4xtexperiment och dokumentation', emerging: 'genomf\u00f6r experiment med st\u00f6d och g\u00f6r enkla observationer', proficient: 'planerar och genomf\u00f6r sj\u00e4lvst\u00e4ndigt experiment med en variabel', advanced: 'designar experiment med kontrollgrupp, analyserar data och formulerar slutsatser' },
      { skill: 'Odlingsdagbok', emerging: 'skriver korta dagboksanteckningar med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt dagbok med m\u00e4tdata, diagram och reflektioner', advanced: 'f\u00f6r en detaljerad vetenskaplig dagbok med analys och f\u00f6rb\u00e4ttringsf\u00f6rslag' },
    ],
  },

  halloween: {
    seoTitle: 'Gratis Halloween\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara halloween\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Multiplikation med godis, br\u00e5k, symmetri och skr\u00e4ckber\u00e4ttelser med styckestruktur. 33 generatorer. Gratis PDF.',
    seoKeywords: 'halloween\u00f6vningar \u00e5rskurs 3, multiplikation godis, br\u00e5k halloweenpynt 8\u20139 \u00e5r, symmetri pumpor, skr\u00e4ckber\u00e4ttelse, Lgr22 matematik, division f\u00f6rdelning, budget trick-or-treat, sp\u00f6khistoria, ber\u00e4ttarstruktur',
    snippetAnswer: 'Halloween\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar multiplikation med godisr\u00e4kning, br\u00e5k med halloweenpynt, symmetriska pumpadesigner och sj\u00e4lvst\u00e4ndig skrivning av skr\u00e4ckber\u00e4ttelser med fullst\u00e4ndig ber\u00e4ttarstruktur. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir halloweentemat ett kreativt matematik- och skrivprojekt \u2014 \u00e5tta- och nio\u00e5ringar ber\u00e4knar godisinsamling med multiplikation (15 hus \u00d7 4 godisar = 60 godisar), f\u00f6rdelar godis med division och rest, arbetar med br\u00e5k f\u00f6r halloweenpynt (en tredjedel sp\u00f6ken, en tredjedel pumpor, en tredjedel fladderm\u00f6ss). Symmetriska pumpadesigner utforskar geometri. Areal ber\u00e4knas f\u00f6r trick-or-treat-omr\u00e5den. Budgetber\u00e4kningar planerar halloweenfesten. Skr\u00e4ckber\u00e4ttelser med sp\u00e4nningskurva, milj\u00f6beskrivning och \u00f6verraskande v\u00e4ndning tr\u00e4nar avancerat ber\u00e4ttande. Lgr22:s m\u00e5l f\u00f6r multiplikation, br\u00e5k och ber\u00e4ttande text i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Multiplikation med godisr\u00e4kning (8\u20139-\u00e5ringar ber\u00e4knar med flerstegsuppgifter)', howWeAddress: 'Trick-or-treat-uppgifter d\u00e4r eleverna ber\u00e4knar total godisinsamling med multiplikation och addition' },
      { milestone: 'Br\u00e5k med halloweenpynt (tredjedelar, fj\u00e4rdedelar av dekoration)', howWeAddress: 'Pynt\u00f6vningar d\u00e4r eleverna ber\u00e4knar br\u00e5k av dekorationstyper och j\u00e4mf\u00f6r andelar' },
      { milestone: 'Symmetrisk pumpadesign (geometrisk kreativitet)', howWeAddress: 'Pumpadesign\u00f6vningar d\u00e4r eleverna skapar symmetriska ansikten och m\u00f6nster med linjal' },
      { milestone: 'Skr\u00e4ckber\u00e4ttelse med sp\u00e4nningskurva och styckestruktur', howWeAddress: 'Halloweenskrivnings\u00f6vningar d\u00e4r eleverna bygger ber\u00e4ttelser med stigande sp\u00e4nning, h\u00f6jdpunkt och uppl\u00f6sning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa multiplikation till ensiffriga tal, anv\u00e4nd halvor och fj\u00e4rdedelar och ge ber\u00e4ttelseramar med meningsstartare. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs flerstegs godisber\u00e4kningar, br\u00e5k med \u00e5ttondelar och sj\u00e4lvst\u00e4ndig skr\u00e4ckber\u00e4ttelse med dialog och figurativt spr\u00e5k till.',
    parentTakeaway: 'G\u00f6r halloween till matematik: ber\u00e4kna hur m\u00e5nga godisar ni f\u00e5r om ni bes\u00f6ker 12 hus. Dela godiset: \u201den tredjedel choklad, en tredjedel klubbor, en tredjedel gelgodis\u201d. Rita ett symmetriskt pumpansikte. L\u00e5t barnet skriva en sp\u00e4nnande sp\u00f6khistoria. Halloweenmatematik \u00e4r s\u00f6tt och kusligt.',
    classroomIntegration: 'Halloweentemat i \u00e5rskurs 3 integrerar matematik, bild och svenska: multiplikation och br\u00e5k i matematik, pumpadesign och symmetri i bild, skr\u00e4ckber\u00e4ttelser i svenska. Halloweenfest med matematiska stationer f\u00f6rbinder lek och l\u00e4rande. Lgr22:s m\u00e5l f\u00f6r multiplikation, br\u00e5k och ber\u00e4ttande text st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Multiplikation med halloweendata', emerging: 'l\u00f6ser enkel multiplikation med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt flerstegs multiplikationsuppgifter och f\u00f6rklarar strategin', advanced: 'formulerar egna uppgifter, l\u00f6ser komplexa ber\u00e4kningar och budgeterar' },
      { skill: 'Br\u00e5k med halloweenpynt', emerging: 'identifierar halvor och fj\u00e4rdedelar med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt tredjedelar och fj\u00e4rdedelar och j\u00e4mf\u00f6r andelar', advanced: 'l\u00f6ser br\u00e5kuppgifter med olika n\u00e4mnare och motiverar l\u00f6sningen' },
      { skill: 'Skr\u00e4ckber\u00e4ttelse', emerging: 'skriver en kort historia med b\u00f6rjan och slut', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en ber\u00e4ttelse med sp\u00e4nningskurva, milj\u00f6beskrivning och uppl\u00f6sning', advanced: 'skriver en avancerad ber\u00e4ttelse med dialog, figurativt spr\u00e5k och \u00f6verraskande v\u00e4ndning' },
    ],
  },

  holidays: {
    seoTitle: 'Gratis H\u00f6gtids\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara h\u00f6gtids\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Kulturj\u00e4mf\u00f6relse, tidsber\u00e4kning, budgetplanering och j\u00e4mf\u00f6rande texter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'h\u00f6gtids\u00f6vningar \u00e5rskurs 3, kulturj\u00e4mf\u00f6relse traditioner, tidsber\u00e4kning kalender 8\u20139 \u00e5r, budgetplanering h\u00f6gtid, j\u00e4mf\u00f6rande text, Lgr22 SO, multiplikation presenter, br\u00e5k traditioner, tid kalender, interkulturell f\u00f6rst\u00e5else',
    snippetAnswer: 'H\u00f6gtids\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar kulturj\u00e4mf\u00f6relser av traditioner v\u00e4rlden \u00f6ver, tidsber\u00e4kning med kalender och tidslinjer, budgetplanering f\u00f6r h\u00f6gtidsfirande och sj\u00e4lvst\u00e4ndig skrivning av j\u00e4mf\u00f6rande texter med styckestruktur. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir h\u00f6gtidstemat ett interkulturellt forskningsprojekt \u2014 \u00e5tta- och nio\u00e5ringar j\u00e4mf\u00f6r traditioner fr\u00e5n olika kulturer (jul i Sverige, Diwali i Indien, Eid i arabv\u00e4rlden), ber\u00e4knar tidsavst\u00e5nd med kalender (hur m\u00e5nga dagar fr\u00e5n midsommar till julafton?), budgeterar h\u00f6gtidsfirande med multiplikation och division. Br\u00e5k anv\u00e4nds f\u00f6r traditionsf\u00f6rdelning (tv\u00e5 fj\u00e4rdedelar av klassen firar lucia). Tidslinjer visar h\u00f6gtider \u00f6ver \u00e5ret. J\u00e4mf\u00f6rande texter analyserar likheter och skillnader med styckestruktur. Lgr22:s m\u00e5l f\u00f6r tid, interkulturell f\u00f6rst\u00e5else och j\u00e4mf\u00f6rande text i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Kulturj\u00e4mf\u00f6relse av traditioner (8\u20139-\u00e5ringar analyserar likheter och skillnader)', howWeAddress: 'Traditions\u00f6vningar d\u00e4r eleverna unders\u00f6ker h\u00f6gtider i tre kulturer och j\u00e4mf\u00f6r systematiskt' },
      { milestone: 'Tidsber\u00e4kning med kalender (dagar, veckor, m\u00e5nader)', howWeAddress: 'Kalender\u00f6vningar d\u00e4r eleverna ber\u00e4knar tidsavst\u00e5nd mellan h\u00f6gtider och planerar aktiviteter' },
      { milestone: 'Budgetplanering f\u00f6r h\u00f6gtidsfirande', howWeAddress: 'Budget\u00f6vningar d\u00e4r eleverna planerar h\u00f6gtidsfirande med begr\u00e4nsade medel och prioriterar' },
      { milestone: 'J\u00e4mf\u00f6rande text med styckestruktur', howWeAddress: 'Skrivuppgifter d\u00e4r eleverna j\u00e4mf\u00f6r h\u00f6gtider i organiserade stycken med likheter, skillnader och slutsats' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, j\u00e4mf\u00f6r tv\u00e5 bekanta h\u00f6gtider, anv\u00e4nd f\u00f6renklad kalender och ge j\u00e4mf\u00f6relsemallar. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs j\u00e4mf\u00f6relse av tre kulturer, tidsber\u00e4kning med tidszoner och sj\u00e4lvst\u00e4ndig j\u00e4mf\u00f6rande rapport med k\u00e4llor till.',
    parentTakeaway: 'J\u00e4mf\u00f6r h\u00f6gtider hemma: \u201dhur firar vi jul j\u00e4mf\u00f6rt med hur de firar Diwali i Indien?\u201d. Ber\u00e4kna: \u201dhur m\u00e5nga dagar till n\u00e4sta h\u00f6gtid?\u201d. Budgetera julklappar med barnet. L\u00e5t barnet skriva en j\u00e4mf\u00f6rande text om tv\u00e5 h\u00f6gtider. H\u00f6gtider bygger b\u00e5de matematikf\u00f6rst\u00e5else och v\u00e4rldskunskap.',
    classroomIntegration: 'H\u00f6gtidstemat i \u00e5rskurs 3 integrerar SO, matematik och svenska: interkulturell f\u00f6rst\u00e5else i SO, tidsber\u00e4kning och budget i matematik, j\u00e4mf\u00f6rande texter i svenska. H\u00f6gtidskalender med matematikuppdrag binder ihop \u00e4mnena \u00f6ver \u00e5ret. Lgr22:s m\u00e5l f\u00f6r tid, interkulturell f\u00f6rst\u00e5else och j\u00e4mf\u00f6rande text st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Kulturj\u00e4mf\u00f6relse', emerging: 'beskriver en tradition med st\u00f6d', proficient: 'j\u00e4mf\u00f6r sj\u00e4lvst\u00e4ndigt tv\u00e5 traditioner med likheter och skillnader', advanced: 'analyserar tre kulturers traditioner med historisk kontext och nyanserade slutsatser' },
      { skill: 'Tidsber\u00e4kning med kalender', emerging: 'ber\u00e4knar dagar inom en m\u00e5nad med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt tidsavst\u00e5nd \u00f6ver m\u00e5nader och planerar aktiviteter', advanced: 'l\u00f6ser komplexa tidsuppgifter med veckor, m\u00e5nader och schemaplanering' },
      { skill: 'J\u00e4mf\u00f6rande h\u00f6gtidstext', emerging: 'skriver enkla likheter mellan tv\u00e5 h\u00f6gtider med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en j\u00e4mf\u00f6rande text med styckestruktur', advanced: 'skriver en nyanserad j\u00e4mf\u00f6relse med analys, k\u00e4llor och motiverade slutsatser' },
    ],
  },

  household: {
    seoTitle: 'Gratis Hush\u00e5lls\u00f6vningar \u00c5rskurs 3 | LessonCraftStudio',
    seoDescription: 'Utskrivbara hush\u00e5lls\u00f6vningar f\u00f6r elever i \u00e5rskurs 3 (8\u20139 \u00e5r). Budgetplanering, m\u00e5ttomvandling, energiber\u00e4kning och instruerande texter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'hush\u00e5lls\u00f6vningar \u00e5rskurs 3, budgetplanering 8\u20139 \u00e5r, m\u00e5ttomvandling vardagen, energiber\u00e4kning, instruerande text, Lgr22 matematik, multiplikation ink\u00f6p, division f\u00f6rdelning, h\u00e5llbart hush\u00e5ll, ekonomi barn',
    snippetAnswer: 'Hush\u00e5lls\u00f6vningar f\u00f6r \u00e5rskurs 3 (8\u20139 \u00e5r) tr\u00e4nar budgetplanering med multiplikation och division, m\u00e5ttomvandling i vardagskontext, energi- och vattenber\u00e4kning f\u00f6r h\u00e5llbarhet samt sj\u00e4lvst\u00e4ndig skrivning av instruerande texter med tydliga steg. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 3 blir hush\u00e5llstemat ett ekonomi- och h\u00e5llbarhetsprojekt \u2014 \u00e5tta- och nio\u00e5ringar planerar veckobudgetar med multiplikation och division, omvandlar m\u00e5tt i vardagen (l vatten per dag, kg tv\u00e4tt per vecka, m\u00b2 boendeyta), ber\u00e4knar energif\u00f6rbrukning och j\u00e4mf\u00f6r h\u00e5llbarhetsval. Br\u00e5k anv\u00e4nds f\u00f6r inkomstf\u00f6rdelning (en fj\u00e4rdedel till mat, en fj\u00e4rdedel till hyra). Linjediagram visar f\u00f6rbrukning \u00f6ver tid. Division ber\u00e4knar styckekostnad och per-person-f\u00f6rdelning. Instruerande texter tr\u00e4nar tydlig steg-f\u00f6r-steg-kommunikation. H\u00e5llbart hush\u00e5ll kopplar till samh\u00e4llsfr\u00e5gor. Lgr22:s m\u00e5l f\u00f6r ekonomi, m\u00e4tning och instruerande text i \u00e5rskurs 3 st\u00f6ds.',
    developmentalMilestones: [
      { milestone: 'Budgetplanering med multiplikation och division (8\u20139-\u00e5ringar hanterar ekonomi)', howWeAddress: 'Veckobudget\u00f6vningar d\u00e4r eleverna planerar ink\u00f6p, ber\u00e4knar kostnader och f\u00f6rdelar budget' },
      { milestone: 'M\u00e5ttomvandling i vardagskontext (l, kg, m\u00b2)', howWeAddress: 'Vardagsomvandlings\u00f6vningar d\u00e4r eleverna omvandlar m\u00e5tt i hush\u00e5llskontext' },
      { milestone: 'Energi- och vattenber\u00e4kning f\u00f6r h\u00e5llbarhet', howWeAddress: 'H\u00e5llbarhets\u00f6vningar d\u00e4r eleverna ber\u00e4knar f\u00f6rbrukning och j\u00e4mf\u00f6r besparingsalternativ' },
      { milestone: 'Instruerande text med tydliga steg (hush\u00e5llsinstruktioner)', howWeAddress: 'Instruktionsskrivning d\u00e4r eleverna skriver steg-f\u00f6r-steg-guider f\u00f6r hush\u00e5llsuppgifter' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd j\u00e4mna belopp, begr\u00e4nsa till en enhet i taget och ge instruktionsmallar. F\u00f6r avancerade elever i \u00e5rskurs 3 l\u00e4ggs procentber\u00e4kningar, omvandling med decimaler och sj\u00e4lvst\u00e4ndig budgetrapport med besparingsanalys till.',
    parentTakeaway: 'L\u00e5t barnet hj\u00e4lpa till med hush\u00e5llsmatematik: planera veckans matbudget, ber\u00e4kna vattenf\u00f6rbrukning (\u201dvi anv\u00e4nder 150 l per dag \u2014 hur mycket per vecka?\u201d), j\u00e4mf\u00f6r elr\u00e4kningar. Skriv en instruktion f\u00f6r en hush\u00e5llsrutin. Hush\u00e5llsmatematik \u00e4r livets viktigaste matematik.',
    classroomIntegration: 'Hush\u00e5llstemat i \u00e5rskurs 3 integrerar matematik, hemkunskap och SO: budget och m\u00e5ttomvandling i matematik, hush\u00e5ll och h\u00e5llbarhet i hemkunskap/SO, instruerande texter i svenska. Klassprojekt om h\u00e5llbart boende f\u00f6rbinder alla \u00e4mnen. Lgr22:s m\u00e5l f\u00f6r ekonomi, m\u00e4tning och instruerande text st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Budgetplanering', emerging: 'adderar enkla kostnader med st\u00f6d', proficient: 'planerar sj\u00e4lvst\u00e4ndigt en veckobudget med multiplikation, division och prioritering', advanced: 'optimerar budget med prisj\u00e4mf\u00f6relse, sparplanering och motiverade val' },
      { skill: 'M\u00e5ttomvandling i vardagen', emerging: 'omvandlar mellan enkla enheter med st\u00f6d', proficient: 'omvandlar sj\u00e4lvst\u00e4ndigt mellan l, kg och m\u00b2 i vardagskontext', advanced: 'till\u00e4mpar omvandling i komplexa situationer och uppskattar rimlighet' },
      { skill: 'Instruerande text', emerging: 'skriver 3\u20134 steg med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt tydliga instruktioner med kronologiska steg', advanced: 'skriver detaljerade instruktioner med tips, varningar och alternativ' },
    ],
  },
};

// Build the SEO insertion text (3 fields) - goes right after "'third-grade': {"
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
  const filePath = path.join(THEMES_DIR, theme, 'sv.ts');

  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${filePath}`);
    errorCount++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // CRITICAL: third-grade is the LAST grade block, so end boundary is `// -- FAQ --`
  const thirdGradeIdx = content.indexOf("'third-grade'");
  const faqCommentIdx = content.indexOf('// -- FAQ --', thirdGradeIdx);

  if (thirdGradeIdx === -1 || faqCommentIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/sv.ts`);
    errorCount++;
    continue;
  }

  // Check if already enriched (seoTitle in third-grade block)
  const thirdGradeBlock = content.substring(thirdGradeIdx, faqCommentIdx);
  if (thirdGradeBlock.includes('seoTitle:')) {
    console.log(`SKIP (already enriched): ${theme}/sv.ts`);
    continue;
  }

  // STEP 1: Insert seoTitle/seoDescription/seoKeywords right after "'third-grade': {"
  const thirdGradeOpenPattern = "'third-grade': {";
  const thirdGradeOpenIdx = content.indexOf(thirdGradeOpenPattern);
  if (thirdGradeOpenIdx === -1) {
    console.error(`NO THIRD-GRADE OPEN FOUND: ${theme}/sv.ts`);
    errorCount++;
    continue;
  }

  const seoInsertPos = thirdGradeOpenIdx + thirdGradeOpenPattern.length;
  const seoText = '\n' + buildSeoInsertionText(enrichments[theme]);
  content = content.substring(0, seoInsertPos) + seoText + content.substring(seoInsertPos);

  // STEP 2: Insert 7 enrichment fields after faq array (recalculate positions after insertion)
  const newThirdGradeIdx = content.indexOf("'third-grade'");
  const newFaqCommentIdx = content.indexOf('// -- FAQ --', newThirdGradeIdx);
  const newThirdGradeBlock = content.substring(newThirdGradeIdx, newFaqCommentIdx);

  // Find the last "],\n" in the third-grade block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(newThirdGradeBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/sv.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const enrichInsertPos = newThirdGradeIdx + lastMatch.index + lastMatch[0].length;
  const enrichText = buildEnrichmentInsertionText(enrichments[theme]) + '\n';
  content = content.substring(0, enrichInsertPos) + enrichText + content.substring(enrichInsertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/sv.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
