#!/usr/bin/env node
/**
 * SEO Part 295: SV Second-Grade Enrichment — Themes 1-25
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the second-grade grade block of 25 SV theme files (alphabet through household).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    seoTitle: 'Gratis Alfabet\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara alfabet\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Avancerad avkodning, stavningsm\u00f6nster och prefix/suffix. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'alfabet\u00f6vningar \u00e5rskurs 2, stavningsm\u00f6nster 7\u20138 \u00e5r, prefix suffix \u00f6vningar, ordavkodning flerstaviga ord, korsord \u00e5rskurs 2, ordf\u00f6rvrngning, Lgr22 svenska, l\u00e4sflyt, ordlistefrdigheter, morfologisk medvetenhet',
    snippetAnswer: 'Alfabet\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar avancerad avkodning av flerstaviga ord, stavningsm\u00f6nster med prefix och suffix samt ordlistef\u00e4rdigheter. Arbetsbladen st\u00f6djer Lgr22:s m\u00e5l f\u00f6r l\u00e4sflyt och skriftlig produktion. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 \u00f6verg\u00e5r elever fr\u00e5n att l\u00e4ra sig l\u00e4sa till att l\u00e4sa f\u00f6r att l\u00e4ra. Sju- och \u00e5tta\u00e5ringar avkodar flerstaviga ord med hj\u00e4lp av prefix, suffix och vokalmm\u00f6nster. Ordf\u00f6rvrngningar inneh\u00e5ller l\u00e4ngre ord som kr\u00e4ver morfologisk analys, bildkorsord f\u00f6ruts\u00e4tter att eleven segmenterar komplexa ord i stavelser och ords\u00f6kningar inkluderar akademiskt ordvf\u00f6rr\u00e5d fr\u00e5n naturvetenskap och samh\u00e4llskunskap. Skrivarbetsblad g\u00e5r bortom meningar till organiserade stycken. Lgr22 betonar att elever i \u00e5rskurs 2 ska kunna l\u00e4sa text p\u00e5 \u00e5rskursniv\u00e5 med precision och flyt.',
    developmentalMilestones: [
      { milestone: 'Avkodning av flerstaviga ord med prefix och suffix', howWeAddress: 'Ordf\u00f6rvrngningar och korsord med flerstaviga ord d\u00e4r eleven till\u00e4mpar fonikregler och morfologisk medvetenhet' },
      { milestone: 'Stavning av ord p\u00e5 \u00e5rskursniv\u00e5 med konventioner och m\u00f6nster', howWeAddress: 'Ords\u00f6kningar och skrivuppgifter som ger flerfaldig exponering f\u00f6r korrekt stavade ord i olika format' },
      { milestone: 'Alfabetisk ordning genom andra och tredje bokstaven', howWeAddress: 'Bokstavst\u00e5gs\u00f6vningar d\u00e4r eleven ordnar ord efter andra och tredje bokstav f\u00f6r ordlisteanv\u00e4ndning' },
      { milestone: 'Styckesskrivning med korrekt stavning och interpunktion', howWeAddress: 'Skriv\u00f6vningar d\u00e4r eleven producerar organiserade stycken med inledande mening, detaljer och avslutning' },
    ],
    differentiationNotes: 'F\u00f6r elever i \u00e5rskurs 2 som beh\u00f6ver st\u00f6d, forts\u00e4tt med kortare ord och ge ordbanker vid korsord, fokusera p\u00e5 ett prefix eller suffix i taget. F\u00f6r avancerade elever, introducera flerstaviga ord med dubbla affix, korsord utan ordbank d\u00e4r eleven f\u00f6rlitar sig p\u00e5 bildledtr\u00e5dar och egen fonikkunskap, samt skrivuppgifter i fleravstyckeformat.',
    parentTakeaway: 'I \u00e5rskurs 2 l\u00e4ser ert barn l\u00e4ngre texter sj\u00e4lvst\u00e4ndigt. Uppmuntra daglig l\u00e4sning av kapitelb\u00f6cker och diskutera handlingen efterf\u00e5t. L\u00e5t barnet sl\u00e5 upp obekanta ord i en ordlista. Spela stavningsspel vid matbordet d\u00e4r ni bygger ord med prefix och suffix. Skriv tillsammans: vykort, dagboksinl\u00e4gg eller recept.',
    classroomIntegration: 'Alfabet\u00f6vningar i \u00e5rskurs 2 integreras i l\u00e4s- och skrivpasset: ordf\u00f6rvrngningar f\u00f6r stavningsm\u00f6nster, korsord f\u00f6r ordkunskap, ords\u00f6kningar med \u00e4mnesordvf\u00f6rr\u00e5d och skrivuppgifter f\u00f6r styckeproduktion. Lgr22:s m\u00e5l f\u00f6r l\u00e4sflyt, stavning och skrivutveckling st\u00f6ds systematiskt. Veckans stavningsm\u00f6nster \u00f6vas i pussel och skrivuppgifter.',
    assessmentRubric: [
      { skill: 'Avkodning av flerstaviga ord', emerging: 'avkodar tvstaviga ord med visst st\u00f6d', proficient: 'avkodar sj\u00e4lvst\u00e4ndigt flerstaviga ord med vanliga prefix och suffix', advanced: 'avkodar komplexa ord med dubbla affix och ovanliga vokalmm\u00f6nster flytande' },
      { skill: 'Stavning p\u00e5 \u00e5rskursniv\u00e5', emerging: 'stavar h\u00f6gfrekventa ord korrekt men g\u00f6r fel p\u00e5 vokalmm\u00f6nster', proficient: 'stavar korrekt med vanliga stavningsm\u00f6nster och konventioner', advanced: 'till\u00e4mpar stavningsregler p\u00e5 nya ord och sj\u00e4lvkorrigerar' },
      { skill: 'Alfabetisk ordning', emerging: 'sorterar efter f\u00f6rsta bokstav korrekt', proficient: 'sorterar efter andra och tredje bokstav sj\u00e4lvst\u00e4ndigt', advanced: 'anv\u00e4nder ordlista och register effektivt f\u00f6r att hitta information' },
    ],
  },

  animals: {
    seoTitle: 'Gratis Djur\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara djur\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Addition och subtraktion inom 100, flerstegsuppgifter och l\u00e4sf\u00f6rst\u00e5else. 33 generatorer. Gratis PDF.',
    seoKeywords: 'djur\u00f6vningar \u00e5rskurs 2, addition subtraktion 100, flerstegsuppgifter djur, l\u00e4sf\u00f6rst\u00e5else djurtema 7\u20138 \u00e5r, stapeldiagram, klassificering, Lgr22 matematik, multiplikation upprepad addition, ekosystem, n\u00e4ringskedja',
    snippetAnswer: 'Djur\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar addition och subtraktion inom 100 med tiv\u00e4xling, multiplikation som upprepad addition och flerstegs ordproblem i djurkontext. Eleverna l\u00e4ser informationstexter och tolkar stapeldiagram. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 utvecklas djurarbetsblad till flerstegsuppgifter d\u00e4r sju- och \u00e5tta\u00e5ringar arbetar med addition och subtraktion inom 100 inklusive tiv\u00e4xling. Multiplikation introduceras som upprepad addition: \u201dom varje hund har 4 ben, hur m\u00e5nga ben har 6 hundar?\u201d. Eleverna l\u00e4ser fleravstyckestexter om djurs livscykler och ekosystem, identifierar huvudid\u00e9n och st\u00f6djande detaljer. Data tolkas i stapeldiagram och streckr\u00e4kning. Klassificering sker med flera kriterier samtidigt. Lgr22 betonar matematiskt resonemang och naturvetenskaplig unders\u00f6kning p\u00e5 denna niv\u00e5.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion inom 100 med tiv\u00e4xling', howWeAddress: 'Ordproblem med djurscenarier d\u00e4r eleven l\u00f6ser flerstegsuppgifter som kr\u00e4ver tiv\u00e4xling (t.ex. 47 + 35 f\u00e5glar)' },
      { milestone: 'Multiplikation som upprepad addition', howWeAddress: 'Djuruppgifter d\u00e4r eleven r\u00e4knar grupper av lika m\u00e5nga (t.ex. 5 grupper med 3 kaniner)' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av fleravstyckesinformationstexter', howWeAddress: 'Djurfaktatexter d\u00e4r eleven identifierar huvudid\u00e9, detaljer och drar slutsatser fr\u00e5n flera stycken' },
      { milestone: 'Tolkning av stapeldiagram och tabeller', howWeAddress: 'Diagram\u00f6vningar d\u00e4r eleven l\u00e4ser av, j\u00e4mf\u00f6r och besvarar fr\u00e5gor om djurdata i stapeldiagram' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa talomr\u00e5det till 50 utan tiv\u00e4xling, ge kortare texter med bildst\u00f6d och anv\u00e4nd konkreta bilder vid diagramtolkning. F\u00f6r avancerade elever, ut\u00f6ka till addition inom 200, introducera multiplikation med st\u00f6rre tal och ge l\u00e4ngre texter med inferensfr\u00e5gor som kr\u00e4ver syntes.',
    parentTakeaway: 'I \u00e5rskurs 2 l\u00f6ser ert barn flerstegsuppgifter. St\u00e4ll djurfr\u00e5gor hemma: \u201dom 3 katter \u00e4ter 4 fiskar var, hur m\u00e5nga fiskar beh\u00f6vs?\u201d. L\u00e4s djurb\u00f6cker och diskutera vad texten handlar om. Skapa stapeldiagram \u00f6ver djur ni sett p\u00e5 promenaden. Bes\u00f6k djurpark och f\u00f6lj upp med arbetsblad.',
    classroomIntegration: 'Djurtemat i \u00e5rskurs 2 integreras \u00f6ver \u00e4mnena: i matematik l\u00f6ses flerstegsordproblem och data presenteras i stapeldiagram, i svenska l\u00e4ses faktatexter om ekosystem och eleverna skriver egna djurtexter med styckestruktur, i NO klassificeras djur och n\u00e4ringskedjor unders\u00f6ks. Lgr22:s m\u00e5l f\u00f6r probleml\u00f6sning och naturvetenskap st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion inom 100', emerging: 'l\u00f6ser uppgifter inom 50 utan tiv\u00e4xling', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt uppgifter inom 100 med tiv\u00e4xling', advanced: 'l\u00f6ser flerstegsuppgifter och f\u00f6rklarar sina strategier' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else av informationstexter', emerging: '\u00e5terber\u00e4ttar fakta fr\u00e5n ett stycke med st\u00f6d', proficient: 'identifierar sj\u00e4lvst\u00e4ndigt huvudid\u00e9 och detaljer i fleravstyckestexter', advanced: 'drar slutsatser och j\u00e4mf\u00f6r information mellan texter' },
      { skill: 'Datahantering och diagram', emerging: 'l\u00e4ser av enskilda v\u00e4rden i stapeldiagram med st\u00f6d', proficient: 'j\u00e4mf\u00f6r data och besvarar fr\u00e5gor om stapeldiagram sj\u00e4lvst\u00e4ndigt', advanced: 'skapar egna diagram och formulerar fr\u00e5gor utifr\u00e5n data' },
    ],
  },

  birds: {
    seoTitle: 'Gratis F\u00e5gel\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara f\u00e5gel\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). M\u00e4tning i cm/m, datainsamling och informationstexter om f\u00e5glar. 33 generatorer. Gratis PDF.',
    seoKeywords: 'f\u00e5gel\u00f6vningar \u00e5rskurs 2, m\u00e4tning cm meter, datainsamling f\u00e5glar, informationstexter 7\u20138 \u00e5r, stapeldiagram f\u00e5gelarter, Lgr22 NO, klassificering f\u00e5glar, f\u00e5gelholkar, ordproblem, multiplikation',
    snippetAnswer: 'F\u00e5gel\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar m\u00e4tning i standardenheter, datainsamling med stapeldiagram och l\u00e4sf\u00f6rst\u00e5else av informationstexter om f\u00e5glar. Addition inom 100 och multiplikation som upprepad addition ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 anv\u00e4nds f\u00e5geltemat f\u00f6r att koppla matematik till naturvetenskap. Sju- och \u00e5tta\u00e5ringar m\u00e4ter l\u00e4ngder i centimeter och meter, j\u00e4mf\u00f6r vingl\u00e4ngder och kroppsm\u00e5tt och \u00f6var enhetsbyte. Datainsamling fr\u00e5n f\u00e5gelobs presenteras i stapeldiagram och tabeller. Informationstexter om f\u00e5glars livscykler och habitats l\u00e4ses med fokus p\u00e5 huvudid\u00e9 och detaljer. Multiplikation introduceras genom grupper: \u201dom 4 bon har 3 \u00e4gg var\u201d. Lgr22 betonar m\u00e4tning, datahantering och naturvetenskapligt unders\u00f6kande.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning i standardenheter (cm och m)', howWeAddress: 'Eleverna m\u00e4ter f\u00e5glars vingl\u00e4ngd, kroppsl\u00e4ngd och n\u00e4bbstorlek och dokumenterar i tabeller' },
      { milestone: 'Datainsamling och redovisning i stapeldiagram', howWeAddress: 'F\u00e5gelobs-\u00f6vningar d\u00e4r eleven r\u00e4knar arter och skapar stapeldiagram fr\u00e5n insamlad data' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av informationstexter med flera stycken', howWeAddress: 'F\u00e5gelfaktatexter d\u00e4r eleven identifierar huvudid\u00e9, detaljer och svarar p\u00e5 fr\u00e5gor som kr\u00e4ver inferens' },
      { milestone: 'Multiplikation som upprepad addition i kontext', howWeAddress: 'Uppgifter som \u201d4 bon med 3 \u00e4gg var\u201d d\u00e4r eleven kopplar upprepad addition till multiplikation' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd konkreta m\u00e4tverktyg med st\u00f6rre enheter, ge f\u00f6rfyllda diagrammallar och korta enmeningstexter. F\u00f6r avancerade elever, introducera enhetsbyte cm till m, l\u00e5t eleven skapa egna diagram och ge l\u00e4ngre texter med j\u00e4mf\u00f6rande fr\u00e5gor.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet anv\u00e4nda linjal och m\u00e4ta i cm. G\u00e5 p\u00e5 f\u00e5gelobs tillsammans och r\u00e4kna arter ni ser. L\u00e5t barnet rita ett stapeldiagram \u00f6ver resultatet. L\u00e4s korta f\u00e5gelb\u00f6cker och diskutera varf\u00f6r f\u00e5glar ser olika ut. Bygg en enkel f\u00e5gelholk och m\u00e4t allt i centimeter.',
    classroomIntegration: 'F\u00e5geltemat i \u00e5rskurs 2 integreras genom att matematik kopplas till NO: eleverna m\u00e4ter och j\u00e4mf\u00f6r f\u00e5glar, skapar diagram fr\u00e5n f\u00e5gelobs och l\u00f6ser ordproblem med f\u00e5geldata. I svenska l\u00e4ses faktatexter och eleverna skriver egna f\u00e5gelbeskrivningar med styckestruktur. Lgr22:s m\u00e5l f\u00f6r m\u00e4tning och datainsamling uppfylls.',
    assessmentRubric: [
      { skill: 'M\u00e4tning i cm och m', emerging: 'm\u00e4ter med st\u00f6d och avl\u00e4ser till n\u00e4rmaste cm', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och j\u00e4mf\u00f6r l\u00e4ngder korrekt', advanced: 'v\u00e4xlar mellan enheter och uppskattar l\u00e4ngder innan m\u00e4tning' },
      { skill: 'Datainsamling och diagram', emerging: 'fyller i f\u00f6rgjord tabell med st\u00f6d', proficient: 'samlar data sj\u00e4lvst\u00e4ndigt och skapar stapeldiagram', advanced: 'analyserar diagram, drar slutsatser och formulerar egna fr\u00e5gor' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else av faktatexter', emerging: '\u00e5terger enstaka fakta fr\u00e5n texten med st\u00f6d', proficient: 'identifierar huvudid\u00e9 och st\u00f6djande detaljer sj\u00e4lvst\u00e4ndigt', advanced: 'j\u00e4mf\u00f6r information fr\u00e5n flera texter och drar slutsatser' },
    ],
  },

  birthday: {
    seoTitle: 'Gratis F\u00f6delsedags\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara f\u00f6delsedags\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Klockan, tidber\u00e4kning, pengaber\u00e4kning och inbjudningsskrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'f\u00f6delsedags\u00f6vningar \u00e5rskurs 2, klockan \u00f6vningar 7\u20138 \u00e5r, pengar ber\u00e4kning, inbjudningar skriva, Lgr22 matematik, multiplikation, tidber\u00e4kning, flerstegsuppgifter, styckesskrivning, ordproblem fest',
    snippetAnswer: 'F\u00f6delsedags\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar klockan, tidber\u00e4kning, pengaber\u00e4kning och multiplikation i festkontext. Eleverna skriver inbjudningar med styckestruktur och l\u00f6ser flerstegsuppgifter. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar f\u00f6delsedag till praktisk matematik. Sju- och \u00e5tta\u00e5ringar l\u00e4ser klockan i kvart och halvtimme, ber\u00e4knar hur l\u00e5ng tid aktiviteter tar och planerar festscheman. Pengar\u00e4kning med kronor och \u00f6ren introducerar decimaler i vardagskontext. Multiplikation \u00f6vas: \u201d8 g\u00e4ster f\u00e5r 3 ballonger var\u201d. Inbjudningsskrivning kr\u00e4ver styckestruktur med datum, tid, plats och aktiviteter. Flerstegsordproblem integrerar addition, subtraktion och j\u00e4mf\u00f6relse. Lgr22 betonar tid, pengar och skriftlig kommunikation.',
    developmentalMilestones: [
      { milestone: 'L\u00e4sa klockan i kvart och halvtimme samt ber\u00e4kna tidsintervall', howWeAddress: 'Festplaneringsuppgifter d\u00e4r eleven schemal\u00e4gger aktiviteter och ber\u00e4knar hur l\u00e5ng tid varje moment tar' },
      { milestone: 'Pengaber\u00e4kning med kronor och \u00f6ren', howWeAddress: 'Budget\u00f6vningar d\u00e4r eleven r\u00e4knar ut kostnaden f\u00f6r festf\u00f6rn\u00f6denheter och f\u00e5r tillbaka v\u00e4xel' },
      { milestone: 'Multiplikation som upprepad addition i vardagssituationer', howWeAddress: 'Uppgifter d\u00e4r eleven ber\u00e4knar totalt antal f\u00f6rem\u00e5l f\u00f6r alla g\u00e4ster med grupper av lika m\u00e5nga' },
      { milestone: 'Skriftlig produktion med styckestruktur', howWeAddress: 'Inbjudningsskrivning d\u00e4r eleven producerar text med inledning, information och avslutning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med hel- och halvtimmar, anv\u00e4nd j\u00e4mna kronbelopp utan \u00f6ren och ge skrivmallar med rubriker. F\u00f6r avancerade elever, introducera klockan i fem-minuters-intervall, l\u00e5t eleven planera en budget med begr\u00e4nsade medel och skriv inbjudningar med kreativ text och styckeindelning.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet anv\u00e4nda klockan och r\u00e4kna med pengar. L\u00e5t barnet planera sin n\u00e4sta f\u00f6delsedag: hur l\u00e5ng tid ska varje lek vara, hur mycket kostar godisp\u00e5sar, hur m\u00e5nga ballonger beh\u00f6vs? Skriv inbjudningar tillsammans p\u00e5 papper. \u00d6va klockan dagligen n\u00e4r ni pratar om rutiner.',
    classroomIntegration: 'F\u00f6delsedagstemat i \u00e5rskurs 2 integrerar matematik och svenska: i matematik l\u00f6ses tids- och pengauppgifter, multiplikation \u00f6vas i festkontext och data fr\u00e5n klassenk\u00e4ter presenteras i diagram. I svenska skrivs inbjudningar, tackbrev och festber\u00e4ttelser med styckestruktur. Lgr22:s m\u00e5l f\u00f6r tid, pengar och skriftlig produktion uppfylls.',
    assessmentRubric: [
      { skill: 'Klockan och tidber\u00e4kning', emerging: 'l\u00e4ser heltimmar och identifierar halvtimme med st\u00f6d', proficient: 'l\u00e4ser klockan i kvart och halvtimme och ber\u00e4knar enkla tidsintervall', advanced: 'ber\u00e4knar komplexa tidsintervall och schemal\u00e4gger aktiviteter sj\u00e4lvst\u00e4ndigt' },
      { skill: 'Pengaber\u00e4kning', emerging: 'r\u00e4knar med j\u00e4mna kronbelopp med st\u00f6d', proficient: 'adderar och subtraherar belopp med kronor och \u00f6ren', advanced: 'planerar budget, j\u00e4mf\u00f6r priser och ber\u00e4knar v\u00e4xel sj\u00e4lvst\u00e4ndigt' },
      { skill: 'Skriftlig produktion', emerging: 'skriver korta meddelanden med st\u00f6d av mall', proficient: 'skriver inbjudningar med all n\u00f6dv\u00e4ndig information och styckestruktur', advanced: 'producerar kreativa texter med varierad meningsbyggnad och tydlig struktur' },
    ],
  },

  body: {
    seoTitle: 'Gratis Kropp\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara kropp\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). M\u00e4tning, organsystem, informationstexter och flerstegsuppgifter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'kropp\u00f6vningar \u00e5rskurs 2, m\u00e4tning kroppen cm, organsystem barn, informationstexter 7\u20138 \u00e5r, Lgr22 NO, skelett muskler, matspj\u00e4lkning, addition subtraktion 100, h\u00e4lsa, hygien',
    snippetAnswer: 'Kropp\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar m\u00e4tning av kroppsdelar i cm, l\u00e4sf\u00f6rst\u00e5else av texter om organsystem och ordproblem med kroppsdata. Eleverna klassificerar och j\u00e4mf\u00f6r. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplas kroppen till m\u00e4tning och naturvetenskap. Sju- och \u00e5tta\u00e5ringar m\u00e4ter sina kroppsdelar i centimeter och meter, j\u00e4mf\u00f6r data i tabeller och skapar stapeldiagram \u00f6ver klassens l\u00e4ngder. Informationstexter om organsystem som skelett, muskler och matspj\u00e4lkning l\u00e4ses med fokus p\u00e5 huvudid\u00e9 och stf\u00f6djande detaljer. Ordproblem med kroppsdata kr\u00e4ver flerstegsber\u00e4kningar inom 100. Lgr22 betonar kroppen och h\u00e4lsa i NO samt m\u00e4tning med standardenheter i matematik.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning av kroppsdelar i standardenheter och j\u00e4mf\u00f6relse', howWeAddress: 'Eleverna m\u00e4ter arml\u00e4ngd, fotl\u00e4ngd och h\u00f6jd i cm, f\u00f6r in data i tabeller och j\u00e4mf\u00f6r resultat' },
      { milestone: 'F\u00f6rst\u00e5else av grundl\u00e4ggande organsystem', howWeAddress: 'Informationstexter om skelett, muskler och matspj\u00e4lkning med f\u00f6rst\u00e5elsefr\u00e5gor och etiketter\u00f6vningar' },
      { milestone: 'Flerstegsber\u00e4kningar med kroppsdata', howWeAddress: 'Ordproblem d\u00e4r eleven adderar, subtraherar och j\u00e4mf\u00f6r m\u00e5tt p\u00e5 kroppsdelar' },
      { milestone: 'Strukturerad skrivning om h\u00e4lsa och hygien', howWeAddress: 'Styckesskrivning d\u00e4r eleven f\u00f6rklarar hur man tar hand om kroppen med inledning, detaljer och avslutning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd bildst\u00f6d vid organsystem, begr\u00e4nsa m\u00e4tning till hela cm och ge f\u00f6renklade texter. F\u00f6r avancerade elever, introducera mm och enhetsbyte, ge texter med j\u00e4mf\u00f6rande fr\u00e5gor mellan organsystem och l\u00e5t eleven skriva forskningsrapporter.',
    parentTakeaway: 'I \u00e5rskurs 2 \u00e4r barnet nyfiket p\u00e5 hur kroppen fungerar. M\u00e4t kroppsdelar hemma och f\u00f6r bok \u00f6ver hur barnet v\u00e4xer. Diskutera varf\u00f6r vi beh\u00f6ver mat, s\u00f6mn och r\u00f6relse. L\u00e5t barnet l\u00e4sa enkla kroppsfaktab\u00f6cker och ber\u00e4tta vad de l\u00e4rt sig. Rita kroppen tillsammans och namnge organ.',
    classroomIntegration: 'Kroppstemat i \u00e5rskurs 2 integreras genom matematik (m\u00e4tning, tabeller, diagram), NO (organsystem, h\u00e4lsa) och svenska (informationstexter, skrivuppgifter). Eleverna genomf\u00f6r m\u00e4tprojekt d\u00e4r klassens kroppsdata samlas in, analyseras och redovisas. Lgr22:s m\u00e5l f\u00f6r m\u00e4tning och kropp och h\u00e4lsa uppfylls.',
    assessmentRubric: [
      { skill: 'M\u00e4tning med standardenheter', emerging: 'm\u00e4ter med st\u00f6d och avl\u00e4ser till n\u00e4rmaste cm', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt, dokumenterar och j\u00e4mf\u00f6r resultat', advanced: 'uppskattar f\u00f6re m\u00e4tning och v\u00e4xlar mellan enheter' },
      { skill: 'F\u00f6rst\u00e5else av organsystem', emerging: 'namnger huvudsakliga kroppsdelar med st\u00f6d', proficient: 'f\u00f6rklarar funktionen hos skelett, muskler och matspj\u00e4lkning', advanced: 'beskriver samband mellan organsystem och drar slutsatser' },
      { skill: 'Informationsl\u00e4sning om kroppen', emerging: '\u00e5terger enstaka fakta med st\u00f6d', proficient: 'identifierar huvudid\u00e9 och detaljer i fleravstyckestexter', advanced: 'syntetiserar information fr\u00e5n flera k\u00e4llor och skriver sammanfattningar' },
    ],
  },

  camping: {
    seoTitle: 'Gratis Camping\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara camping\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Karta och kompass, m\u00e4tning, flerstegsuppgifter och ber\u00e4ttelseskrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'camping\u00f6vningar \u00e5rskurs 2, karta kompass barn, m\u00e4tning utomhus, flerstegsuppgifter 7\u20138 \u00e5r, Lgr22 friluftsliv, addition subtraktion 100, ber\u00e4ttelseskrivning, multiplikation, packlista, naturkunskap',
    snippetAnswer: 'Camping\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar karll\u00e4sning, m\u00e4tning utomhus, flerstegsordproblem och ber\u00e4ttelseskrivning i campingkontext. Addition inom 100 och multiplikation som upprepad addition ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 blir campingtemat en bro mellan klassrum och natur. Sju- och \u00e5tta\u00e5ringar l\u00e4ser enkla kartor, orienterar sig med v\u00e4derstreck och ber\u00e4knar avst\u00e5nd. Flerstegsuppgifter kr\u00e4ver budgetering f\u00f6r campingutrustning, f\u00f6rdelning av mat och tidsplanering. Multiplikation \u00f6vas: \u201d6 t\u00e4lt med 2 sov\u00e4ckar var\u201d. Ber\u00e4ttelseskrivning med inledning, handling och avslutning kr\u00e4ver styckestruktur. Lgr22 betonar friluftsliv, orientering och matematiskt resonemang i vardagskontext.',
    developmentalMilestones: [
      { milestone: 'Enkel kartl\u00e4sning och orientering med v\u00e4derstreck', howWeAddress: 'Kart\u00f6vningar d\u00e4r eleven anv\u00e4nder v\u00e4derstreck f\u00f6r att navigera en campingplats och hittar m\u00e5lpunkter' },
      { milestone: 'Flerstegsordproblem med addition och subtraktion inom 100', howWeAddress: 'Budgeterings- och f\u00f6rdelningsuppgifter i campingkontext d\u00e4r eleven l\u00f6ser problem i flera steg' },
      { milestone: 'Multiplikation som upprepad addition', howWeAddress: 'Uppgifter om packf\u00f6rdelning d\u00e4r eleven ber\u00e4knar totalt antal f\u00f6rem\u00e5l f\u00f6r gruppen' },
      { milestone: 'Ber\u00e4ttelseskrivning med tydlig styckestruktur', howWeAddress: 'Campingber\u00e4ttelser d\u00e4r eleven skriver inledning, handling och avslutning med detaljer' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge f\u00f6renklade kartor med f\u00e4rre detaljer, arbeta med addition inom 50 och anv\u00e4nd skrivmallar. F\u00f6r avancerade elever, introducera skalor p\u00e5 kartor, flerstegsbudgetar med v\u00e4xelber\u00e4kning och l\u00e5t eleven skriva l\u00e4ngre ber\u00e4ttelser med dialog.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet f\u00f6lja en enkel karta. Planera en campingutflykt tillsammans: skriv packlista, ber\u00e4kna hur mycket mat som beh\u00f6vs och titta p\u00e5 kartan. L\u00e5t barnet navigera p\u00e5 en promenad med v\u00e4derstreck. Efterf\u00e5t skrivs en campingber\u00e4ttelse med bild.',
    classroomIntegration: 'Campingtemat i \u00e5rskurs 2 kopplar matematik till geografi och svenska: kartl\u00e4sning med v\u00e4derstreck, m\u00e4tning av avst\u00e5nd, budgetering och flerstegsuppgifter. I svenska skrivs campingber\u00e4ttelser och packlistor. I NO studeras v\u00e4xter och djur i naturen. Lgr22:s m\u00e5l f\u00f6r orientering och friluftsliv integreras.',
    assessmentRubric: [
      { skill: 'Kartl\u00e4sning och orientering', emerging: 'identifierar platser p\u00e5 en enkel karta med st\u00f6d', proficient: 'anv\u00e4nder v\u00e4derstreck f\u00f6r att navigera och beskriva position', advanced: 'tolkar kartsymboler och planerar rutter sj\u00e4lvst\u00e4ndigt' },
      { skill: 'Flerstegsuppgifter', emerging: 'l\u00f6ser tvstegsuppgifter med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt flerstegsuppgifter inom 100', advanced: 'formulerar egna flerstegsuppgifter och v\u00e4ljer effektiva strategier' },
      { skill: 'Ber\u00e4ttelseskrivning', emerging: 'skriver en kort ber\u00e4ttelse med inledning och handling', proficient: 'skriver ber\u00e4ttelse med inledning, handling och avslutning i styckeform', advanced: 'anv\u00e4nder dialog, beskrivningar och varierad meningsbyggnad' },
    ],
  },

  circus: {
    seoTitle: 'Gratis Cirkus\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara cirkus\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Geometri, symmetri, multiplikation och kreativt skrivande. 33 generatorer. Gratis PDF.',
    seoKeywords: 'cirkus\u00f6vningar \u00e5rskurs 2, geometri symmetri, multiplikation cirkus, kreativt skrivande 7\u20138 \u00e5r, Lgr22 matematik, m\u00f6nster, addition subtraktion 100, cirkusber\u00e4ttelse, formkunskap, rumsl\u00e4ge',
    snippetAnswer: 'Cirkus\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar geometriska former, symmetri, multiplikation och kreativt skrivande i cirkuskontext. Flerstegsuppgifter med biljetter och s\u00e4tesordning ing\u00e5r. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 anv\u00e4nds cirkustemat f\u00f6r geometri och kreativitet. Sju- och \u00e5tta\u00e5ringar unders\u00f6ker symmetri i cirkusbilder, identifierar och j\u00e4mf\u00f6r geometriska former i arenan och skapar m\u00f6nster. Multiplikation \u00f6vas med biljetter och sittplatser: \u201d5 rader med 8 stolar\u201d. Flerstegsordproblem kr\u00e4ver ber\u00e4kning av biljettint\u00e4kter och materialkostnader. Kreativt skrivande om cirkusf\u00f6rest\u00e4llningar kr\u00e4ver styckestruktur med beskrivande detaljer. Lgr22 betonar geometri, symmetri och estetiskt skapande.',
    developmentalMilestones: [
      { milestone: 'Identifiera och j\u00e4mf\u00f6ra geometriska former och symmetri', howWeAddress: 'Cirkusbilder d\u00e4r eleven hittar symmetrilinjer och namnger former i arenan, kl\u00e4der och utrustning' },
      { milestone: 'Multiplikation med rader och grupper', howWeAddress: 'S\u00e4tesuppgifter d\u00e4r eleven ber\u00e4knar totalt antal platser i rader och sektioner med upprepad addition' },
      { milestone: 'Flerstegsordproblem med pengar', howWeAddress: 'Biljett- och kostnadsuppgifter d\u00e4r eleven ber\u00e4knar int\u00e4kter, utgifter och vinst i flera steg' },
      { milestone: 'Kreativt skrivande med styckestruktur', howWeAddress: 'Cirkusber\u00e4ttelser d\u00e4r eleven beskriver en f\u00f6rest\u00e4llning med inledning, beskrivande detaljer och avslutning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, fokusera p\u00e5 grundl\u00e4ggande former och enkel symmetri, arbeta med sm\u00e5 tal i multiplikation och ge skrivmallar. F\u00f6r avancerade elever, introducera komplexa symmetriska m\u00f6nster, flerstegsuppgifter med flera r\u00e4kneoperationer och l\u00e5t eleven skriva l\u00e4ngre ber\u00e4ttelser med dialog.',
    parentTakeaway: 'I \u00e5rskurs 2 ser barnet geometri \u00f6verallt. Peka p\u00e5 symmetri i naturen och byggnader. L\u00e5t barnet r\u00e4kna rader och kolumner i biosalong eller stadion. Skapa en cirkusf\u00f6rest\u00e4llning hemma och l\u00e5t barnet skriva ett program med priser och tider. Rita symmetriska cirkusbilder tillsammans.',
    classroomIntegration: 'Cirkustemat i \u00e5rskurs 2 integrerar matematik (geometri, symmetri, multiplikation), svenska (kreativt skrivande, beskrivande text) och bild (symmetriska m\u00f6nster, cirkusaffischer). Eleverna planerar en klasscirkus d\u00e4r de ber\u00e4knar biljettpriser, skapar affischer och skriver program. Lgr22:s m\u00e5l f\u00f6r geometri och skapande uppfylls.',
    assessmentRubric: [
      { skill: 'Geometri och symmetri', emerging: 'identifierar grundl\u00e4ggande former med st\u00f6d', proficient: 'hittar symmetrilinjer och j\u00e4mf\u00f6r former sj\u00e4lvst\u00e4ndigt', advanced: 'skapar komplexa symmetriska m\u00f6nster och f\u00f6rklarar egenskaper' },
      { skill: 'Multiplikation med grupper', emerging: 'r\u00e4knar grupper av 2 och 5 med st\u00f6d', proficient: 'l\u00f6ser multiplikationsuppgifter med rader och grupper sj\u00e4lvst\u00e4ndigt', advanced: 'anv\u00e4nder multiplikation i flerstegsuppgifter och f\u00f6rklarar sambandet' },
      { skill: 'Kreativt skrivande', emerging: 'skriver korta texter med grundl\u00e4ggande handling', proficient: 'skriver ber\u00e4ttelser med styckestruktur och beskrivande detaljer', advanced: 'anv\u00e4nder dialog, liknelser och varierad meningsbyggnad' },
    ],
  },

  clothing: {
    seoTitle: 'Gratis Kl\u00e4d\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara kl\u00e4d\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Pengaber\u00e4kning, sortering, m\u00e4tning och beskrivande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'kl\u00e4d\u00f6vningar \u00e5rskurs 2, pengar shopping, sortering kategorisering, m\u00e4tning kl\u00e4der, Lgr22 matematik, multiplikation, beskrivande text 7\u20138 \u00e5r, v\u00e4der kl\u00e4dval, budget, prisj\u00e4mf\u00f6relse',
    snippetAnswer: 'Kl\u00e4d\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar pengaber\u00e4kning med shopping, sortering efter flera kriterier, m\u00e4tning av tygstycken och beskrivande skrivning om kl\u00e4der. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar kl\u00e4dtemat matematik till vardagsbeslut. Sju- och \u00e5tta\u00e5ringar ber\u00e4knar priser, j\u00e4mf\u00f6r erbjudanden och planerar kl\u00e4dink\u00f6p med en budget. Sortering sker efter flera kriterier: material, \u00e5rstid, f\u00e4rg och funktion. M\u00e4tning av tygstycken i cm introducerar l\u00e4ngdm\u00e5tt i kontext. Beskrivande skrivning om kl\u00e4der kr\u00e4ver adjektiv och styckestruktur. Multiplikation \u00f6vas: \u201d4 barn beh\u00f6ver 2 vantar var\u201d. Lgr22 betonar pengar, sortering och skriftlig produktion.',
    developmentalMilestones: [
      { milestone: 'Pengaber\u00e4kning med kronor och prisj\u00e4mf\u00f6relse', howWeAddress: 'Shopping-uppgifter d\u00e4r eleven j\u00e4mf\u00f6r priser, ber\u00e4knar totalkostnad och v\u00e4xel' },
      { milestone: 'Sortering och kategorisering med flera kriterier', howWeAddress: 'Kl\u00e4dsorteringsuppgifter d\u00e4r eleven grupperar efter material, \u00e5rstid och funktion samtidigt' },
      { milestone: 'M\u00e4tning i centimeter f\u00f6r praktiskt syfte', howWeAddress: 'Eleverna m\u00e4ter tygstycken, \u00e4rml\u00e4ngder och midjem\u00e5tt och dokumenterar i tabeller' },
      { milestone: 'Beskrivande skrivning med adjektiv och styckestruktur', howWeAddress: 'Kl\u00e4dbeskrivningar d\u00e4r eleven anv\u00e4nder sinnesord, adjektiv och organiserar texten i stycken' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med j\u00e4mna kronbelopp, sortera efter ett kriterium i taget och ge bildst\u00f6d f\u00f6r skrivning. F\u00f6r avancerade elever, introducera procent-rabatter i enkel form, Venndiagram f\u00f6r sortering och l\u00e5t eleven skriva j\u00e4mf\u00f6rande texter om kl\u00e4der.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet hj\u00e4lpa till med verklig shopping. L\u00e5t barnet j\u00e4mf\u00f6ra priser i butiken, ber\u00e4kna hur mycket tv\u00e5 plagg kostar tillsammans och f\u00e5 tillbaka v\u00e4xel. Sortera garderobst\u00e4dning efter \u00e5rstid. L\u00e5t barnet v\u00e4lja kl\u00e4der efter v\u00e4dret och f\u00f6rklara varf\u00f6r.',
    classroomIntegration: 'Kl\u00e4dtemat i \u00e5rskurs 2 integrerar matematik (pengar, sortering, m\u00e4tning), NO (material, v\u00e4der) och svenska (beskrivande text, ordkunskap). Eleverna driver en klassbutik d\u00e4r de priss\u00e4tter, s\u00e4ljer och ber\u00e4knar. Lgr22:s m\u00e5l f\u00f6r pengar, kategorisering och skriftlig produktion uppfylls.',
    assessmentRubric: [
      { skill: 'Pengaber\u00e4kning och budget', emerging: 'adderar tv\u00e5 priser med st\u00f6d', proficient: 'j\u00e4mf\u00f6r priser, ber\u00e4knar totalt och v\u00e4xel sj\u00e4lvst\u00e4ndigt', advanced: 'planerar budget med begr\u00e4nsade medel och optimerar ink\u00f6p' },
      { skill: 'Sortering och kategorisering', emerging: 'sorterar efter ett kriterium med st\u00f6d', proficient: 'sorterar efter flera kriterier och f\u00f6rklarar indelningen', advanced: 'skapar egna kategoriseringssystem och anv\u00e4nder Venndiagram' },
      { skill: 'Beskrivande skrivning', emerging: 'skriver korta beskrivningar med n\u00e5gra adjektiv', proficient: 'skriver stycken med varierade adjektiv och tydlig struktur', advanced: 'producerar j\u00e4mf\u00f6rande texter med rik beskrivning och styckeindelning' },
    ],
  },

  colors: {
    seoTitle: 'Gratis F\u00e4rg\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara f\u00e4rg\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Br\u00e5k, diagramtolkning, m\u00f6nster och beskrivande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'f\u00e4rg\u00f6vningar \u00e5rskurs 2, br\u00e5k halva fj\u00e4rdedel, diagramtolkning f\u00e4rger, m\u00f6nster symmetri, Lgr22 matematik, beskrivande text 7\u20138 \u00e5r, f\u00e4rgblandning, data stapeldiagram, kreativt skrivande, optik',
    snippetAnswer: 'F\u00e4rg\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar enkla br\u00e5k med f\u00e4rgade ytor, diagramtolkning, m\u00f6nster och symmetri samt beskrivande skrivning med f\u00e4rgord. Addition inom 100 och multiplikation ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar f\u00e4rgtemat till br\u00e5k, data och visuellt t\u00e4nkande. Sju- och \u00e5tta\u00e5ringar delar f\u00e4rgade ytor i halvor och fj\u00e4rdedelar och \u00f6var enkla br\u00e5k visuellt. Diagramtolkning anv\u00e4nder f\u00e4rgdata: \u201dhur m\u00e5nga elever valde bl\u00e5tt?\u201d. M\u00f6nster och symmetri skapas med f\u00e4rger i rutn\u00e4t. F\u00e4rgblandningsexperiment kopplar NO till matematik d\u00e4r eleven dokumenterar resultat. Beskrivande skrivning kr\u00e4ver rik anv\u00e4ndning av f\u00e4rgadjektiv. Lgr22 betonar br\u00e5k, datahantering och estetisk medvetenhet.',
    developmentalMilestones: [
      { milestone: 'F\u00f6rst\u00e5 och anv\u00e4nda enkla br\u00e5k (halva, tredjedel, fj\u00e4rdedel)', howWeAddress: 'F\u00e4rgade ytor d\u00e4r eleven delar i lika delar och namnger br\u00e5k visuellt med f\u00e4rgkodning' },
      { milestone: 'Tolka och skapa diagram med kategorisk data', howWeAddress: 'Enk\u00e4ter om favoritf\u00e4rger d\u00e4r eleven samlar data, skapar stapeldiagram och besvarar fr\u00e5gor' },
      { milestone: 'Skapa och utvidga m\u00f6nster med f\u00e4rger', howWeAddress: 'Rutn\u00e4ts\u00f6vningar d\u00e4r eleven skapar, f\u00f6rl\u00e4nger och beskriver f\u00e4rgm\u00f6nster med regler' },
      { milestone: 'Beskrivande skrivning med sinnesord och adjektiv', howWeAddress: 'F\u00e4rgbeskrivningar d\u00e4r eleven anv\u00e4nder rika adjektiv f\u00f6r att m\u00e5la bilder med ord' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med halva och hel, ge f\u00f6rfyllda diagrammallar och enkla m\u00f6nster med tv\u00e5 f\u00e4rger. F\u00f6r avancerade elever, introducera \u00e5ttondelar, l\u00e5t eleven skapa egna enk\u00e4ter och diagram samt komplexa m\u00f6nster med rotationssymmetri.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet se matematik i f\u00e4rger. Dela en pizza eller t\u00e5rta i halvor och fj\u00e4rdedelar och namnge delarna. G\u00f6r en familjeenk\u00e4t om favoritf\u00e4rger och rita ett diagram. Blanda f\u00e4rger och l\u00e5t barnet f\u00f6rutsp\u00e5 resultatet. Uppmuntra beskrivande spr\u00e5k: inte bara \u201dbl\u00e5\u201d utan \u201dhimmelsbl\u00e5\u201d.',
    classroomIntegration: 'F\u00e4rgtemat i \u00e5rskurs 2 integrerar matematik (br\u00e5k, diagram, m\u00f6nster), NO (f\u00e4rgblandning, optik) och bild (f\u00e4rgteori, symmetri). Eleverna genomf\u00f6r enk\u00e4tprojekt d\u00e4r data samlas in, analyseras och presenteras. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, datahantering och estetiskt skapande uppfylls.',
    assessmentRubric: [
      { skill: 'Enkla br\u00e5k', emerging: 'identifierar halva av en yta med st\u00f6d', proficient: 'namnger och visar halva, tredjedel och fj\u00e4rdedel sj\u00e4lvst\u00e4ndigt', advanced: 'j\u00e4mf\u00f6r br\u00e5k och anv\u00e4nder dem i probleml\u00f6sning' },
      { skill: 'Datahantering med diagram', emerging: 'l\u00e4ser av diagram med st\u00f6d', proficient: 'skapar och tolkar stapeldiagram sj\u00e4lvst\u00e4ndigt', advanced: 'analyserar data, drar slutsatser och presenterar resultat' },
      { skill: 'M\u00f6nster och symmetri', emerging: 'forts\u00e4tter enkla f\u00e4rgm\u00f6nster med st\u00f6d', proficient: 'skapar och beskriver m\u00f6nster med regler sj\u00e4lvst\u00e4ndigt', advanced: 'designar komplexa symmetriska m\u00f6nster och f\u00f6rklarar symmetriregler' },
    ],
  },

  construction: {
    seoTitle: 'Gratis Bygge\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara bygge\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Geometri, m\u00e4tning, flerstegsuppgifter och instruktionsskrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'bygge\u00f6vningar \u00e5rskurs 2, geometri 3D-former, m\u00e4tning bygge, flerstegsuppgifter 7\u20138 \u00e5r, Lgr22 teknik, multiplikation, instruktionstext, materialber\u00e4kning, byggnadsritning, rumsl\u00e4ge',
    snippetAnswer: 'Bygge\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar geometriska former i 3D, m\u00e4tning med standardenheter, flerstegsordproblem med materialber\u00e4kning och instruktionsskrivning. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar byggtemat geometri till teknik och probleml\u00f6sning. Sju- och \u00e5tta\u00e5ringar identifierar 3D-former i byggnader, m\u00e4ter l\u00e4ngder f\u00f6r byggnadsritningar i cm och m samt ber\u00e4knar materialm\u00e4ngder med multiplikation. Flerstegsuppgifter integrerar m\u00e4tning, ber\u00e4kning och j\u00e4mf\u00f6relse. Instruktionstexter skrivs med steg-f\u00f6r-steg-struktur. Lgr22 betonar geometri, m\u00e4tning och tekniskt skapande d\u00e4r eleven planerar, genomf\u00f6r och utv\u00e4rderar.',
    developmentalMilestones: [
      { milestone: 'Identifiera och namnge 3D-former (kub, r\u00e4tblock, cylinder, kon)', howWeAddress: 'Byggbilder d\u00e4r eleven hittar och namnger 3D-former i verkliga konstruktioner' },
      { milestone: 'M\u00e4tning f\u00f6r byggprojekt i cm och m', howWeAddress: 'Byggnadsritnings\u00f6vningar d\u00e4r eleven m\u00e4ter, dokumenterar och anv\u00e4nder m\u00e5tt f\u00f6r att planera' },
      { milestone: 'Materialber\u00e4kning med multiplikation', howWeAddress: 'Uppgifter d\u00e4r eleven ber\u00e4knar hur m\u00e5nga klossar, plankor eller plattor som beh\u00f6vs med upprepad addition' },
      { milestone: 'Instruktionsskrivning med steg-f\u00f6r-steg-struktur', howWeAddress: 'Bygginstruktioner d\u00e4r eleven skriver tydliga steg med ordningstal och beskrivande detaljer' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, fokusera p\u00e5 2D-former, m\u00e4t med hela cm och ge f\u00f6rskrivna instruktionsmallar. F\u00f6r avancerade elever, introducera egenskaper hos 3D-former (sidor, h\u00f6rn, kanter), l\u00e5t eleven rita i skala och skriva komplexa instruktioner med villkor.',
    parentTakeaway: 'I \u00e5rskurs 2 ser barnet former i byggnader \u00f6verallt. Bygg med klossar eller LEGO och diskutera former. L\u00e5t barnet m\u00e4ta m\u00f6bler hemma och rita ritningar. Ber\u00e4kna tillsammans hur m\u00e5nga klossar som beh\u00f6vs f\u00f6r en mur. L\u00e5t barnet skriva bygginstruktioner som n\u00e5gon annan ska f\u00f6lja.',
    classroomIntegration: 'Byggtemat i \u00e5rskurs 2 integrerar matematik (geometri, m\u00e4tning, multiplikation), teknik (planera och bygga), svenska (instruktionstexter) och bild (byggnadsritningar). Eleverna genomf\u00f6r byggprojekt d\u00e4r de planerar, m\u00e4ter, ber\u00e4knar och dokumenterar. Lgr22:s m\u00e5l f\u00f6r teknik och geometri uppfylls.',
    assessmentRubric: [
      { skill: 'Geometriska 3D-former', emerging: 'identifierar kub och cylinder med st\u00f6d', proficient: 'namnger och j\u00e4mf\u00f6r 3D-former sj\u00e4lvst\u00e4ndigt', advanced: 'beskriver egenskaper och relaterar till verkliga objekt' },
      { skill: 'M\u00e4tning och materialber\u00e4kning', emerging: 'm\u00e4ter med st\u00f6d och ber\u00e4knar enkla m\u00e4ngder', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och ber\u00e4knar materialbehov med multiplikation', advanced: 'planerar hela projekt med m\u00e5ttsatta ritningar och materiallistor' },
      { skill: 'Instruktionsskrivning', emerging: 'skriver korta instruktioner med n\u00e5gra steg', proficient: 'skriver tydliga steg-f\u00f6r-steg-instruktioner med ordningstal', advanced: 'producerar detaljerade instruktioner med villkor och alternativ' },
    ],
  },

  cooking: {
    seoTitle: 'Gratis Matlagnings\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara matlagnings\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Br\u00e5k, m\u00e4tning, recept och instruktionsskrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'matlagnings\u00f6vningar \u00e5rskurs 2, br\u00e5k recept, m\u00e4tning dl liter, instruktionstext recept, Lgr22 matematik, multiplikation, tidber\u00e4kning, n\u00e4ringsl\u00e4ra 7\u20138 \u00e5r, receptskrivning, volym',
    snippetAnswer: 'Matlagnings\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar br\u00e5k i receptkontext, m\u00e4tning av volym i dl och liter, tidber\u00e4kning och instruktionsskrivning av recept. Multiplikation vid f\u00f6rstorad portion ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar matlagning br\u00e5k och m\u00e4tning till vardagen. Sju- och \u00e5tta\u00e5ringar halverar och dubblerar recept, m\u00e4ter volym i dl och liter och ber\u00e4knar tid f\u00f6r tillagningsmomenten. Multiplikation \u00f6vas vid f\u00f6rstorade portioner: \u201dom receptet \u00e4r f\u00f6r 2 och vi \u00e4r 6\u201d. Instruktionstexter skrivs med tydliga steg, ordningstal och tidsangivelser. N\u00e4ringsl\u00e4ra integreras d\u00e4r eleven kategoriserar livsmedel. Lgr22 betonar br\u00e5k, m\u00e4tning, tid och h\u00e4lsa.',
    developmentalMilestones: [
      { milestone: 'Enkla br\u00e5k i vardagskontext (halva, tredjedel, fj\u00e4rdedel)', howWeAddress: 'Receptuppgifter d\u00e4r eleven halverar och dubblerar ingrediensar och anv\u00e4nder br\u00e5k vid m\u00e4tning' },
      { milestone: 'M\u00e4tning av volym i dl och liter', howWeAddress: 'M\u00e4t\u00f6vningar d\u00e4r eleven anv\u00e4nder decilitermf\u00e5tt och l\u00e4r sig sambandet mellan dl och liter' },
      { milestone: 'Tidber\u00e4kning med klockan', howWeAddress: 'Tillagnings\u00f6vningar d\u00e4r eleven ber\u00e4knar start- och sluttid och planerar flera moment parallellt' },
      { milestone: 'Instruktionsskrivning av recept', howWeAddress: 'Receptskrivning d\u00e4r eleven producerar tydliga steg med ingredienslista, ordningstal och tidsangivelser' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med halvor och hela dl, ge illustrerade receptmallar och fokusera p\u00e5 korta recept med f\u00e5 steg. F\u00f6r avancerade elever, introducera tredjedelar och fj\u00e4rdedelar, l\u00e5t eleven f\u00f6rstora recept f\u00f6r st\u00f6rre grupper och skriva detaljerade recept med tidsplanering.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet hj\u00e4lpa till p\u00e5 riktigt i k\u00f6ket. L\u00e5t barnet m\u00e4ta ingredienser med decilitermf\u00e5tt, l\u00e4sa recept och f\u00f6lja stegen. Diskutera varf\u00f6r vi beh\u00f6ver olika m\u00e5tt. Dubbla ett recept tillsammans och l\u00e5t barnet ber\u00e4kna. Skriv egna familjerecept i en bok.',
    classroomIntegration: 'Matlagningstemat i \u00e5rskurs 2 integrerar matematik (br\u00e5k, m\u00e4tning, tid), NO (n\u00e4ringsl\u00e4ra, h\u00e4lsa), svenska (instruktionstexter, recept) och hemkunskap. Eleverna genomf\u00f6r en kokvecka d\u00e4r de planerar, ber\u00e4knar och lagar mat. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, m\u00e4tning och h\u00e4lsa uppfylls.',
    assessmentRubric: [
      { skill: 'Br\u00e5k i vardagskontext', emerging: 'identifierar halva med st\u00f6d av bilder', proficient: 'anv\u00e4nder halva, tredjedel och fj\u00e4rdedel i receptber\u00e4kningar', advanced: 'halverar och dubblerar recept sj\u00e4lvst\u00e4ndigt med olika br\u00e5k' },
      { skill: 'M\u00e4tning av volym', emerging: 'm\u00e4ter med st\u00f6d i hela dl', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och f\u00f6rst\u00e5r sambandet dl\u2013liter', advanced: 'v\u00e4ljer r\u00e4tt enhet och uppskattar volymer innan m\u00e4tning' },
      { skill: 'Instruktionsskrivning', emerging: 'skriver korta steg med st\u00f6d av mall', proficient: 'skriver fullst\u00e4ndiga recept med ingredienslista och tydliga steg', advanced: 'producerar detaljerade recept med tips, variationer och tidsplanering' },
    ],
  },

  dinosaurs: {
    seoTitle: 'Gratis Dinosaurie\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara dinosaurie\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Stora tal, m\u00e4tning, tidslinje och informationstexter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'dinosaurie\u00f6vningar \u00e5rskurs 2, stora tal hundra, m\u00e4tning l\u00e4ngd, tidslinje historia, Lgr22 NO, informationstexter 7\u20138 \u00e5r, j\u00e4mf\u00f6relse storlek, addition subtraktion 100, fossil, utd\u00f6da djur',
    snippetAnswer: 'Dinosaurie\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar stora tal inom 100, l\u00e4ngdm\u00e4tning och j\u00e4mf\u00f6relse, tidslinjer och l\u00e4sf\u00f6rst\u00e5else av informationstexter om dinosaurier. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar dinosaurietemat stora tal till naturvetenskaplig nyfikenhet. Sju- och \u00e5tta\u00e5ringar arbetar med tal inom 100 och 1000 f\u00f6r att f\u00f6rst\u00e5 dinosauriers storlek: \u201dT-rex var 12 meter l\u00e5ng, Brachiosaurus 25 meter\u201d. M\u00e4tning och j\u00e4mf\u00f6relse i meter och cm g\u00f6r abstrakta tal konkreta. Tidslinjer introducerar kronologiskt t\u00e4nkande. Informationstexter om arter, habitat och utd\u00f6ende l\u00e4ses med fokus p\u00e5 huvudid\u00e9 och stf\u00f6djande detaljer. Lgr22 betonar stora tal, m\u00e4tning och naturvetenskapligt unders\u00f6kande.',
    developmentalMilestones: [
      { milestone: 'F\u00f6rst\u00e5else av stora tal och tallinjen upp till 1000', howWeAddress: 'Dinosauriestorlekskort d\u00e4r eleven placerar tal p\u00e5 tallinjen och j\u00e4mf\u00f6r m\u00e5tt' },
      { milestone: 'M\u00e4tning och j\u00e4mf\u00f6relse i meter', howWeAddress: '\u00d6vningar d\u00e4r eleven j\u00e4mf\u00f6r dinosauriers l\u00e4ngd med vardagsf\u00f6rem\u00e5l och ber\u00e4knar skillnader' },
      { milestone: 'Kronologiskt t\u00e4nkande med tidslinjer', howWeAddress: 'Tidslinje\u00f6vningar d\u00e4r eleven ordnar dinosaurier och h\u00e4ndelser i tidsordning' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av informationstexter', howWeAddress: 'Dinosauriefaktatexter d\u00e4r eleven identifierar huvudid\u00e9, detaljer och besvarar fr\u00e5gor' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll talomr\u00e5det inom 100, ge enkla tidslinjer med f\u00e5 h\u00e4ndelser och korta texter med bildst\u00f6d. F\u00f6r avancerade elever, ut\u00f6ka till tal inom 1000, introducera tidsskillnader i miljontal \u00e5r konceptuellt och l\u00e5t eleven skriva egna faktatexter.',
    parentTakeaway: 'I \u00e5rskurs 2 \u00e4r m\u00e5nga barn fascinerade av dinosaurier. Anv\u00e4nd intresset: m\u00e4t upp 12 meter i tr\u00e4dg\u00e5rden f\u00f6r att se hur l\u00e5ng T-rex var. J\u00e4mf\u00f6r med familjens bil. L\u00e4s dinosaurieb\u00f6cker och diskutera fakta. Skapa en tidslinje \u00f6ver familjens historia som \u00f6vning.',
    classroomIntegration: 'Dinosaurietemat i \u00e5rskurs 2 integrerar matematik (stora tal, m\u00e4tning, j\u00e4mf\u00f6relse), NO (utd\u00f6da arter, fossil, evolution), SO (tidslinjer) och svenska (informationstexter, skrivande). Eleverna genomf\u00f6r ett dinosaurieprojekt med forskning, ber\u00e4kningar och presentation. Lgr22:s m\u00e5l f\u00f6r tal, m\u00e4tning och naturvetenskap uppfylls.',
    assessmentRubric: [
      { skill: 'Stora tal och taluppfattning', emerging: 'j\u00e4mf\u00f6r tal inom 100 med st\u00f6d', proficient: 'ordnar och j\u00e4mf\u00f6r tal inom 1000 sj\u00e4lvst\u00e4ndigt p\u00e5 tallinjen', advanced: 'uppskattar och resonerar om stora tal i kontext' },
      { skill: 'M\u00e4tning och j\u00e4mf\u00f6relse', emerging: 'j\u00e4mf\u00f6r l\u00e4ngder med st\u00f6d', proficient: 'm\u00e4ter och ber\u00e4knar skillnader i meter och cm sj\u00e4lvst\u00e4ndigt', advanced: 'v\u00e4ljer l\u00e4mplig enhet och uppskattar innan m\u00e4tning' },
      { skill: 'Informationsl\u00e4sning', emerging: '\u00e5terger enstaka fakta med st\u00f6d', proficient: 'identifierar huvudid\u00e9 och stf\u00f6djande detaljer sj\u00e4lvst\u00e4ndigt', advanced: 'syntetiserar information fr\u00e5n flera texter och drar slutsatser' },
    ],
  },

  easter: {
    seoTitle: 'Gratis P\u00e5sk\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara p\u00e5sk\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Br\u00e5k, symmetri, multiplikation och ber\u00e4ttelseskrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'p\u00e5sk\u00f6vningar \u00e5rskurs 2, br\u00e5k p\u00e5sk\u00e4gg, symmetri m\u00f6nster, multiplikation \u00f6vning, Lgr22 matematik, ber\u00e4ttelseskrivning 7\u20138 \u00e5r, p\u00e5sktraditioner, ordproblem, dekoration, v\u00e5rtecken',
    snippetAnswer: 'P\u00e5sk\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar br\u00e5k med p\u00e5sk\u00e4ggsdelning, symmetri i dekoration, multiplikation i f\u00f6rdelningsuppgifter och ber\u00e4ttelseskrivning om p\u00e5sktraditioner. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar p\u00e5sktemat br\u00e5k och symmetri till h\u00f6gtidstraditioner. Sju- och \u00e5tta\u00e5ringar delar p\u00e5sk\u00e4gg i halvor och fj\u00e4rdedelar f\u00f6r att \u00f6va br\u00e5k visuellt. Symmetriska p\u00e5skm\u00f6nster skapas och analyseras. Multiplikation \u00f6vas: \u201d5 barn f\u00e5r 4 \u00e4gg var\u201d. Flerstegsordproblem integrerar addition, subtraktion och f\u00f6rdelning. Ber\u00e4ttelseskrivning om p\u00e5sktraditioner kr\u00e4ver styckestruktur. Lgr22 betonar br\u00e5k, geometri och kulturell f\u00f6rst\u00e5else.',
    developmentalMilestones: [
      { milestone: 'Enkla br\u00e5k med konkreta f\u00f6rem\u00e5l', howWeAddress: 'P\u00e5sk\u00e4ggsdelning d\u00e4r eleven delar godis och \u00e4gg i halvor, tredjedelar och fj\u00e4rdedelar' },
      { milestone: 'Symmetri i m\u00f6nster och dekoration', howWeAddress: 'P\u00e5sk\u00e4ggsdekoration d\u00e4r eleven skapar och identifierar symmetriska m\u00f6nster' },
      { milestone: 'Multiplikation som f\u00f6rdelning i lika grupper', howWeAddress: 'F\u00f6rdelningsuppgifter d\u00e4r eleven ber\u00e4knar hur m\u00e5nga \u00e4gg varje barn f\u00e5r' },
      { milestone: 'Ber\u00e4ttelseskrivning med styckestruktur', howWeAddress: 'P\u00e5skber\u00e4ttelser d\u00e4r eleven skriver om traditioner med inledning, handling och avslutning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med halvor, enkla symmetriska m\u00f6nster och multiplikation med 2 och 5. F\u00f6r avancerade elever, introducera oj\u00e4mn f\u00f6rdelning med rest, komplexa symmetriska m\u00f6nster och l\u00e5t eleven skriva l\u00e4ngre ber\u00e4ttelser med dialog.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet anv\u00e4nda p\u00e5sken f\u00f6r matematik. Dela godis r\u00e4ttvist mellan syskon och r\u00e4kna: \u201dom 12 \u00e4gg delas p\u00e5 3 barn\u201d. Dekorera \u00e4gg med symmetriska m\u00f6nster. Skriv en p\u00e5skber\u00e4ttelse eller dagbok fr\u00e5n p\u00e5sklovet. G\u00f6r en p\u00e5sk\u00e4ggsjakt d\u00e4r ledtr\u00e5darna inneh\u00e5ller mattetal.',
    classroomIntegration: 'P\u00e5sktemat i \u00e5rskurs 2 integrerar matematik (br\u00e5k, symmetri, multiplikation), SO (traditioner, kultur), bild (dekoration, m\u00f6nster) och svenska (ber\u00e4ttelseskrivning). Eleverna genomf\u00f6r ett p\u00e5skprojekt d\u00e4r de ber\u00e4knar, dekorerar och skriver. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, geometri och kulturf\u00f6rst\u00e5else uppfylls.',
    assessmentRubric: [
      { skill: 'Enkla br\u00e5k', emerging: 'delar i halvor med st\u00f6d av bilder', proficient: 'delar i halvor, tredjedelar och fj\u00e4rdedelar sj\u00e4lvst\u00e4ndigt', advanced: 'l\u00f6ser f\u00f6rdelningsproblem och f\u00f6rklarar sambandet mellan br\u00e5k och division' },
      { skill: 'Symmetri', emerging: 'identifierar enkel symmetri med st\u00f6d', proficient: 'skapar och analyserar symmetriska m\u00f6nster sj\u00e4lvst\u00e4ndigt', advanced: 'designar komplexa m\u00f6nster med flera symmetrilinjer' },
      { skill: 'Ber\u00e4ttelseskrivning', emerging: 'skriver korta texter om p\u00e5sk med n\u00e5gra meningar', proficient: 'skriver ber\u00e4ttelser med styckestruktur och beskrivande detaljer', advanced: 'producerar l\u00e4ngre texter med dialog och varierad meningsbyggnad' },
    ],
  },

  emotions: {
    seoTitle: 'Gratis K\u00e4nslo\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara k\u00e4nslo\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Datahantering, diagramtolkning, reflekterande skrivning och ordkunskap. 33 generatorer. Gratis PDF.',
    seoKeywords: 'k\u00e4nslo\u00f6vningar \u00e5rskurs 2, datahantering k\u00e4nslor, diagramtolkning, reflekterande skrivning 7\u20138 \u00e5r, Lgr22 livskunskap, ordkunskap k\u00e4nslord, empati, konfliktl\u00f6sning, sj\u00e4lvreglering, socialt l\u00e4rande',
    snippetAnswer: 'K\u00e4nslo\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar datahantering med k\u00e4nslodata, diagramtolkning, ordkunskap med k\u00e4nslord och reflekterande skrivning om egna upplevelser. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar k\u00e4nslotemat sj\u00e4lvk\u00e4nnedom till akademiska f\u00e4rdigheter. Sju- och \u00e5tta\u00e5ringar samlar k\u00e4nslodata under veckan och skapar stapeldiagram \u00f6ver sina upplevelser. K\u00e4nslordskunskap ut\u00f6kas fr\u00e5n grundl\u00e4ggande till nyanserade uttryck: fr\u00e5n \u201dglad\u201d till \u201dstolt, tacksam, lttad\u201d. Reflekterande skrivning kr\u00e4ver styckestruktur d\u00e4r eleven beskriver situation, k\u00e4nsla och handling. Lgr22 betonar elevens f\u00f6rm\u00e5ga att uttrycka sig skriftligt och socialt l\u00e4rande.',
    developmentalMilestones: [
      { milestone: 'Datahantering med personlig data (k\u00e4nslolopp)', howWeAddress: 'K\u00e4nslodagbok d\u00e4r eleven samlar data dagligen och skapar stapeldiagram \u00f6ver sina k\u00e4nslor' },
      { milestone: 'Nyanserad ordkunskap om k\u00e4nslor', howWeAddress: 'Ord\u00f6vningar d\u00e4r eleven l\u00e4r sig och anv\u00e4nder nyanserade k\u00e4nslord i kontext' },
      { milestone: 'Reflekterande skrivning med styckestruktur', howWeAddress: 'Skriv\u00f6vningar d\u00e4r eleven beskriver en k\u00e4nslosituation med inledning, beskrivning och reflektion' },
      { milestone: 'Empati och perspektivtagande', howWeAddress: 'Ber\u00e4ttelser d\u00e4r eleven skriver ur en annan persons perspektiv och f\u00f6rklarar k\u00e4nslor' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd k\u00e4nslobilder och begr\u00e4nsa till grundk\u00e4nslor, ge f\u00f6rfyllda diagrammallar och skrivmallar. F\u00f6r avancerade elever, ut\u00f6ka ordvf\u00f6rr\u00e5det med abstrakta k\u00e4nslor, l\u00e5t eleven analysera data och skriva l\u00e4ngre reflekterande texter.',
    parentTakeaway: 'I \u00e5rskurs 2 utvecklas barnets f\u00f6rm\u00e5ga att s\u00e4tta ord p\u00e5 k\u00e4nslor. Fr\u00e5ga dagligen \u201dhur k\u00e4nde du dig idag och varf\u00f6r?\u201d. Hj\u00e4lp barnet att hitta r\u00e4tt ord: inte bara arg utan frustrerad eller besviken. F\u00f6r en k\u00e4nslodagbok d\u00e4r barnet ritar och skriver. Diskutera karaktf\u00e4rers k\u00e4nslor n\u00e4r ni l\u00e4ser b\u00f6cker.',
    classroomIntegration: 'K\u00e4nslotemat i \u00e5rskurs 2 integrerar matematik (datahantering, diagram), svenska (ordkunskap, reflekterande skrivning) och livskunskap (sj\u00e4lvreglering, empati). Eleverna genomf\u00f6r ett k\u00e4nsloprojekt med datainsamling, analys och presentation. Lgr22:s m\u00e5l f\u00f6r socialt l\u00e4rande och skriftlig produktion uppfylls.',
    assessmentRubric: [
      { skill: 'Datahantering med k\u00e4nslodata', emerging: 'f\u00f6r enkel k\u00e4nslodagbok med st\u00f6d', proficient: 'samlar data, skapar diagram och besvarar fr\u00e5gor sj\u00e4lvst\u00e4ndigt', advanced: 'analyserar m\u00f6nster i data och drar slutsatser om sina k\u00e4nslor' },
      { skill: 'K\u00e4nslordkunskap', emerging: 'anv\u00e4nder grundl\u00e4ggande k\u00e4nslord (glad, ledsen, arg)', proficient: 'anv\u00e4nder nyanserade k\u00e4nslord i r\u00e4tt kontext', advanced: 'f\u00f6rklarar skillnader mellan snarlika k\u00e4nslor och anv\u00e4nder dem i skrift' },
      { skill: 'Reflekterande skrivning', emerging: 'skriver korta beskrivningar av k\u00e4nslor med st\u00f6d', proficient: 'skriver stycken med situation, k\u00e4nsla och reflektion', advanced: 'skriver ur andras perspektiv och reflekterar \u00f6ver konsekvenser' },
    ],
  },

  'fairy-tales': {
    seoTitle: 'Gratis Sago\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara sago\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Ber\u00e4ttelsestruktur, ordkunskap, styckesskrivning och m\u00f6nsterigenk\u00e4nning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'sago\u00f6vningar \u00e5rskurs 2, ber\u00e4ttelsestruktur, ordkunskap sagor, styckesskrivning 7\u20138 \u00e5r, Lgr22 svenska, m\u00f6nster sagor, karaktf\u00e4rsbeskrivning, j\u00e4mf\u00f6rande text, l\u00e4sf\u00f6rst\u00e5else, kreativt skrivande',
    snippetAnswer: 'Sago\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar ber\u00e4ttelsestruktur, ordkunskap med sagogenreord, styckesskrivning och m\u00f6nsterigenk\u00e4nning i ber\u00e4ttelser. Eleverna skriver egna sagor med styckeindelning. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 g\u00e5r sagol\u00e4sning \u00f6ver till analys och eget skapande. Sju- och \u00e5tta\u00e5ringar identifierar ber\u00e4ttelsestruktur: inledning, problem, l\u00f6sning och avslutning. De j\u00e4mf\u00f6r sagor fr\u00e5n olika kulturer och hittar m\u00f6nster. Ordkunskapen ut\u00f6kas med genrespecifika ord som \u201dfordom, trolldom, f\u00f6rtrollad\u201d. Styckesskrivning av egna sagor kr\u00e4ver planering, karaktf\u00e4rsbeskrivning och dialog. Lgr22 betonar l\u00e4sf\u00f6rst\u00e5else, textanalys och skriftligt ber\u00e4ttande.',
    developmentalMilestones: [
      { milestone: 'Identifiera ber\u00e4ttelsestruktur (inledning, problem, l\u00f6sning, avslutning)', howWeAddress: 'Analysverktyg d\u00e4r eleven kartl\u00e4gger sagostruktur och j\u00e4mf\u00f6r m\u00f6nster mellan sagor' },
      { milestone: 'Genrespecifik ordkunskap', howWeAddress: 'Korsord och ords\u00f6kningar med sagoord d\u00e4r eleven l\u00e4r sig och anv\u00e4nder genrespecifikt ordvf\u00f6rr\u00e5d' },
      { milestone: 'Styckesskrivning av egna sagor', howWeAddress: 'Sagoskrivning d\u00e4r eleven planerar, skriver och reviderar en saga med styckeindelning' },
      { milestone: 'J\u00e4mf\u00f6rande l\u00e4sning', howWeAddress: '\u00d6vningar d\u00e4r eleven j\u00e4mf\u00f6r tv\u00e5 versioner av samma saga och beskriver likheter och skillnader' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd bildkort f\u00f6r ber\u00e4ttelsestruktur, ge ordbanker med sagoord och skrivmallar. F\u00f6r avancerade elever, l\u00e5t eleven skriva l\u00e4ngre sagor med flera karaktf\u00e4rer och subplot, j\u00e4mf\u00f6ra sagor fr\u00e5n olika kulturer och \u00e4ndra perspektiv.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet f\u00f6rst\u00e5 och ber\u00e4tta sagor med struktur. L\u00e4s sagor tillsammans och diskutera: vad var problemet, hur l\u00f6stes det? L\u00e5t barnet ber\u00e4tta om egna versioner. Skriv en gemensam familjesaga. Bes\u00f6k biblioteket och l\u00e5t barnet v\u00e4lja sagor fr\u00e5n olika l\u00e4nder.',
    classroomIntegration: 'Sagotemat i \u00e5rskurs 2 integrerar svenska (l\u00e4sf\u00f6rst\u00e5else, skrivande, ordkunskap), SO (sagor fr\u00e5n olika kulturer) och bild (sagobilder, bokillustration). Eleverna genomf\u00f6r ett sagoprojekt d\u00e4r de l\u00e4ser, analyserar och skriver egna sagor. Lgr22:s m\u00e5l f\u00f6r l\u00e4sf\u00f6rst\u00e5else och skriftlig produktion uppfylls.',
    assessmentRubric: [
      { skill: 'Ber\u00e4ttelsestruktur', emerging: 'identifierar inledning och avslutning med st\u00f6d', proficient: 'kartl\u00e4gger fullst\u00e4ndig struktur och j\u00e4mf\u00f6r m\u00f6nster sj\u00e4lvst\u00e4ndigt', advanced: 'analyserar flera strukturelement och anv\u00e4nder dem i eget skrivande' },
      { skill: 'Sagogenrens ordkunskap', emerging: 'k\u00e4nner igen n\u00e5gra sagoord', proficient: 'anv\u00e4nder genrespecifika ord i r\u00e4tt kontext', advanced: 'anv\u00e4nder rikt sagospr\u00e5k med liknelser och bildligt spr\u00e5k' },
      { skill: 'Sagoskrivning med styckestruktur', emerging: 'skriver kort saga med inledning och slut', proficient: 'skriver saga med alla strukturelement och styckeindelning', advanced: 'producerar l\u00e4ngre saga med dialog, beskrivningar och karaktf\u00e4rsutveckling' },
    ],
  },

  farm: {
    seoTitle: 'Gratis Bondg\u00e5rds\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara bondg\u00e5rds\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Multiplikation, m\u00e4tning, datainsamling och informationstexter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'bondg\u00e5rds\u00f6vningar \u00e5rskurs 2, multiplikation bondg\u00e5rd, m\u00e4tning odling, datainsamling 7\u20138 \u00e5r, Lgr22 NO, ordproblem, stapeldiagram, sk\u00f6rd, djuruppf\u00f6dning, instruktionstext',
    snippetAnswer: 'Bondg\u00e5rds\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar multiplikation med djurgrupper, m\u00e4tning vid odling, datainsamling om sk\u00f6rd och informationstexter om lantbruk. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 anv\u00e4nds bondg\u00e5rdstemat f\u00f6r multiplikation och naturvetenskap. Sju- och \u00e5tta\u00e5ringar ber\u00e4knar med grupper: \u201d3 h\u00f6nsh\u00f6nor l\u00e4gger 5 \u00e4gg per dag\u201d. M\u00e4tning kopplas till odling d\u00e4r eleven m\u00e4ter plantor i cm och dokumenterar tillv\u00e4xt. Data fr\u00e5n bondg\u00e5rden presenteras i tabeller och stapeldiagram. Informationstexter om jordbruk och djuruppf\u00f6dning l\u00e4ses med fokus p\u00e5 huvudid\u00e9 och detaljer. Lgr22 betonar multiplikation, m\u00e4tning och naturvetenskapligt dokumenterande.',
    developmentalMilestones: [
      { milestone: 'Multiplikation med grupper i vardagskontext', howWeAddress: 'Bondg\u00e5rdsuppgifter d\u00e4r eleven ber\u00e4knar totalt antal \u00e4gg, liter mj\u00f6lk och djur med upprepad addition' },
      { milestone: 'M\u00e4tning och dokumentation av tillv\u00e4xt', howWeAddress: 'Odlings\u00f6vningar d\u00e4r eleven m\u00e4ter plantor veckovis och dokumenterar i tillv\u00e4xtdiagram' },
      { milestone: 'Datainsamling och redovisning', howWeAddress: 'Bondg\u00e5rdsdata (sk\u00f6rd, djur, produktion) som samlas i tabeller och presenteras i stapeldiagram' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av informationstexter om lantbruk', howWeAddress: 'Faktatexter om jordbruk d\u00e4r eleven identifierar huvudid\u00e9, detaljer och besvarar fr\u00e5gor' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd bilder vid multiplikation, begr\u00e4nsa till grupper av 2 och 5 och ge korta texter. F\u00f6r avancerade elever, introducera multiplikation med st\u00f6rre tal, l\u00e5t eleven planera en hel odlingss\u00e4song och skriva informationstexter.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet koppla matematik till verklig produktion. R\u00e4kna \u00e4gg i kartonger som multiplikation. Bes\u00f6k en bondg\u00e5rd och l\u00e5t barnet r\u00e4kna djur. Odla n\u00e5got hemma och m\u00e4t tillv\u00e4xten veckovis. Diskutera var maten kommer fr\u00e5n och hur den produceras.',
    classroomIntegration: 'Bondg\u00e5rdstemat i \u00e5rskurs 2 integrerar matematik (multiplikation, m\u00e4tning, data), NO (jordbruk, v\u00e4xtodling) och svenska (informationstexter, instruktioner). Eleverna genomf\u00f6r ett odlingsprojekt d\u00e4r de s\u00e5r, m\u00e4ter, dokumenterar och presenterar. Lgr22:s m\u00e5l f\u00f6r multiplikation och naturvetenskaplig dokumentation uppfylls.',
    assessmentRubric: [
      { skill: 'Multiplikation i kontext', emerging: 'r\u00e4knar grupper av 2 och 5 med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt multiplikationsuppgifter i bondg\u00e5rdskontext', advanced: 'anv\u00e4nder multiplikation i flerstegsuppgifter och f\u00f6rklarar strategier' },
      { skill: 'M\u00e4tning och dokumentation', emerging: 'm\u00e4ter med st\u00f6d och f\u00f6r anteckningar', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt, dokumenterar och skapar tillv\u00e4xtdiagram', advanced: 'analyserar data, drar slutsatser och presenterar resultat' },
      { skill: 'Informationsl\u00e4sning', emerging: '\u00e5terger fakta fr\u00e5n en kort text med st\u00f6d', proficient: 'identifierar huvudid\u00e9 och detaljer sj\u00e4lvst\u00e4ndigt', advanced: 'syntetiserar information och skriver egna faktatexter' },
    ],
  },

  flowers: {
    seoTitle: 'Gratis Blom\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara blom\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Symmetri, m\u00e4tning, livscykler och beskrivande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'blom\u00f6vningar \u00e5rskurs 2, symmetri blommor, m\u00e4tning v\u00e4xter, livscykel v\u00e4xt, Lgr22 NO, beskrivande text 7\u20138 \u00e5r, klassificering, br\u00e5k kronblad, datahantering, fotosyntes',
    snippetAnswer: 'Blom\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar symmetri i blommor, m\u00e4tning av v\u00e4xttillv\u00e4xt, livscykler och beskrivande skrivning om blommor. Br\u00e5k med kronblad och datainsamling ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar blomtemat symmetri och m\u00e4tning till biologi. Sju- och \u00e5tta\u00e5ringar analyserar symmetri i blommors kronblad och skapar symmetriska m\u00f6nster. M\u00e4tning av v\u00e4xttillv\u00e4xt i cm dokumenteras i tabeller och diagram. Livscykler studeras i sekvens\u00f6vningar. Br\u00e5k \u00f6vas med kronblad: \u201dhur stor del \u00e4r r\u00f6d?\u201d. Beskrivande skrivning kr\u00e4ver sinnesord och adjektiv. Lgr22 betonar livscykler, m\u00e4tning och naturvetenskaplig dokumentation.',
    developmentalMilestones: [
      { milestone: 'Identifiera och analysera symmetri i naturen', howWeAddress: 'Blommanalyser d\u00e4r eleven hittar symmetrilinjer i kronblad, blad och hela v\u00e4xter' },
      { milestone: 'M\u00e4tning och dokumentation av v\u00e4xttillv\u00e4xt', howWeAddress: 'Odlings\u00f6vningar d\u00e4r eleven m\u00e4ter och dokumenterar tillv\u00e4xt i cm veckovis i tabeller' },
      { milestone: 'F\u00f6rst\u00e5else av livscykler (fr\u00f6, grodd, v\u00e4xt, blomma, fr\u00f6)', howWeAddress: 'Sekvens\u00f6vningar d\u00e4r eleven ordnar livscykelstadier och f\u00f6rklarar varje steg' },
      { milestone: 'Beskrivande skrivning med sinnesord', howWeAddress: 'Blombeskrivningar d\u00e4r eleven anv\u00e4nder syn, doft och k\u00e4nsel f\u00f6r att beskriva blommor detaljerat' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd enkla symmetriska bilder, ge f\u00f6rfyllda m\u00e4ttabeller och bildbaserade livscykler. F\u00f6r avancerade elever, analysera rotsymmetri, l\u00e5t eleven f\u00f6rklara fotosyntes i enkla termer och skriva j\u00e4mf\u00f6rande texter om olika blommor.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet se matematik i naturen. Titta p\u00e5 blommor och r\u00e4kna kronblad, hitta symmetri. S\u00e5 fr\u00f6n hemma och m\u00e4t tillv\u00e4xten tillsammans. Pressa blommor och diskutera delar: kronblad, \u00e5ngare, pistill. L\u00e5t barnet skriva och rita i en naturdagbok.',
    classroomIntegration: 'Blomtemat i \u00e5rskurs 2 integrerar matematik (symmetri, m\u00e4tning, br\u00e5k, data), NO (livscykler, v\u00e4xtdelar, fotosyntes), svenska (beskrivande text) och bild (blomm\u00e5lning). Eleverna odlar v\u00e4xter och dokumenterar vetenskapligt. Lgr22:s m\u00e5l f\u00f6r livscykler, m\u00e4tning och naturvetenskaplig arbetsmetod uppfylls.',
    assessmentRubric: [
      { skill: 'Symmetri i naturen', emerging: 'identifierar enkel symmetri med st\u00f6d', proficient: 'hittar och beskriver symmetrilinjer i blommor sj\u00e4lvst\u00e4ndigt', advanced: 'analyserar komplexa symmetrim\u00f6nster och skapar egna' },
      { skill: 'M\u00e4tning och dokumentation', emerging: 'm\u00e4ter med st\u00f6d och fyller i f\u00f6rgjord tabell', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och skapar tillv\u00e4xtdiagram', advanced: 'analyserar tillv\u00e4xtdata och drar slutsatser om optimala f\u00f6rh\u00e5llanden' },
      { skill: 'Beskrivande skrivning', emerging: 'skriver korta beskrivningar med n\u00e5gra adjektiv', proficient: 'anv\u00e4nder sinnesord och styckestruktur i blombeskrivningar', advanced: 'producerar rika beskrivande texter med j\u00e4mf\u00f6relser och detaljerade observationer' },
    ],
  },

  food: {
    seoTitle: 'Gratis Mat\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara mat\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Br\u00e5k, vikt, n\u00e4ringsl\u00e4ra och informationstexter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'mat\u00f6vningar \u00e5rskurs 2, br\u00e5k mat, vikt gram kilo, n\u00e4ringsl\u00e4ra barn, Lgr22 hemkunskap, kategorisering livsmedel, stapeldiagram, recept matematik, h\u00e4lsa kost 7\u20138 \u00e5r, ordproblem mat',
    snippetAnswer: 'Mat\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar br\u00e5k vid matportionering, vikt i gram och kilo, n\u00e4ringsl\u00e4ra med kategorisering och informationstexter om mat och h\u00e4lsa. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar mattemat br\u00e5k och m\u00e4tning till h\u00e4lsa. Sju- och \u00e5tta\u00e5ringar delar mat i halvor, tredjedelar och fj\u00e4rdedelar, v\u00e4ger ingredienser i gram och kilo och kategoriserar livsmedel i n\u00e4ringsgrupper. Stapeldiagram visar klassens matvanor. Multiplikation \u00f6vas vid matplanering: \u201d4 portioner \u00e0 150 g\u201d. Informationstexter om n\u00e4ring l\u00e4ses med fokus p\u00e5 huvudid\u00e9. Lgr22 betonar br\u00e5k, m\u00e4tning, h\u00e4lsa och livsstil.',
    developmentalMilestones: [
      { milestone: 'Br\u00e5k i vardagskontext (halva, tredjedel, fj\u00e4rdedel)', howWeAddress: 'Matportionering d\u00e4r eleven delar pizza, t\u00e5rta och br\u00f6d i lika delar och namnger br\u00e5k' },
      { milestone: 'M\u00e4tning av vikt i gram och kilo', howWeAddress: 'V\u00e4gnings\u00f6vningar d\u00e4r eleven v\u00e4ger ingredienser och l\u00e4r sig sambandet gram\u2013kilo' },
      { milestone: 'Kategorisering av livsmedel i n\u00e4ringsgrupper', howWeAddress: 'Sorteringsuppgifter d\u00e4r eleven klassificerar mat i grupper och diskuterar h\u00e4lsosam kost' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av informationstexter om n\u00e4ring', howWeAddress: 'Faktatexter om n\u00e4ring d\u00e4r eleven identifierar huvudid\u00e9, detaljer och besvarar fr\u00e5gor' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med halvor, v\u00e4g med hela kilo och ge bildbaserade kategoriserings\u00f6vningar. F\u00f6r avancerade elever, introducera \u00e5ttondelar, v\u00e4g i gram med decimaltal konceptuellt och l\u00e5t eleven skriva informationstexter om n\u00e4ring.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet v\u00e4ga och m\u00e4ta i k\u00f6ket. L\u00e5t barnet v\u00e4ga ingredienser p\u00e5 k\u00f6ksv\u00e5gen. Dela pizza och diskutera: \u201dhur stor del fick du?\u201d. Handla mat och l\u00e5t barnet j\u00e4mf\u00f6ra priser per kilo. Diskutera n\u00e4ringsgrupper och varf\u00f6r varierad kost \u00e4r viktig.',
    classroomIntegration: 'Mattemat i \u00e5rskurs 2 integrerar matematik (br\u00e5k, vikt, diagram), NO (n\u00e4ringsl\u00e4ra, h\u00e4lsa), hemkunskap och svenska (informationstexter, recept). Eleverna genomf\u00f6r en matvecka d\u00e4r de v\u00e4ger, kategoriserar och presenterar data. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, m\u00e4tning och h\u00e4lsa uppfylls.',
    assessmentRubric: [
      { skill: 'Br\u00e5k med mat', emerging: 'identifierar halva med bildst\u00f6d', proficient: 'anv\u00e4nder halva, tredjedel och fj\u00e4rdedel vid portionering sj\u00e4lvst\u00e4ndigt', advanced: 'j\u00e4mf\u00f6r br\u00e5k och l\u00f6ser br\u00e5kuppgifter i matkontext' },
      { skill: 'M\u00e4tning av vikt', emerging: 'v\u00e4ger med st\u00f6d i hela kilo', proficient: 'v\u00e4ger sj\u00e4lvst\u00e4ndigt i gram och kilo och f\u00f6rst\u00e5r sambandet', advanced: 'uppskattar vikt och v\u00e4xlar mellan enheter' },
      { skill: 'N\u00e4ringsl\u00e4ra och kategorisering', emerging: 'sorterar mat i tv\u00e5 grupper med st\u00f6d', proficient: 'kategoriserar livsmedel i n\u00e4ringsgrupper och f\u00f6rklarar', advanced: 'analyserar matvanor och ger kostf\u00f6rslag baserat p\u00e5 n\u00e4ringskunskap' },
    ],
  },

  forest: {
    seoTitle: 'Gratis Skogs\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara skogs\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Ekosystem, m\u00e4tning, datainsamling och informationstexter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'skogs\u00f6vningar \u00e5rskurs 2, ekosystem skog, m\u00e4tning tr\u00e4d, datainsamling natur, Lgr22 NO, n\u00e4ringsvv\u00e4v, klassificering 7\u20138 \u00e5r, fotosyntes, faktatexter, ordproblem skog',
    snippetAnswer: 'Skogs\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar ekosystemf\u00f6rst\u00e5else, m\u00e4tning av tr\u00e4d och v\u00e4xter, datainsamling i naturen och l\u00e4sf\u00f6rst\u00e5else av informationstexter om skogen. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 blir skogen ett naturvetenskapligt laboratorium. Sju- och \u00e5tta\u00e5ringar m\u00e4ter tr\u00e4dh\u00f6jd, stamomkrets och bladstorlek i cm och m. Datainsamling fr\u00e5n skogsbes\u00f6k dokumenteras i tabeller och stapeldiagram. Ekosystemet studeras: n\u00e4ringskedjor, nedbrytare och \u00e5rstidsv\u00e4xlingar. Informationstexter om skogens lager l\u00e4ses med fokus p\u00e5 huvudid\u00e9 och detaljer. Flerstegsordproblem anv\u00e4nder skogsdata. Lgr22 betonar naturvetenskapligt unders\u00f6kande, m\u00e4tning och ekologi.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning av naturf\u00f6rem\u00e5l i standardenheter', howWeAddress: 'Skogsm\u00e4tningar d\u00e4r eleven m\u00e4ter tr\u00e4d, kottar, blad och stigar i cm och m' },
      { milestone: 'Datainsamling och presentation fr\u00e5n f\u00e4ltbes\u00f6k', howWeAddress: 'Skogsinventering d\u00e4r eleven r\u00e4knar arter, dokumenterar i tabeller och skapar diagram' },
      { milestone: 'F\u00f6rst\u00e5else av ekosystem och n\u00e4ringskedjor', howWeAddress: '\u00d6vningar d\u00e4r eleven kartl\u00e4gger n\u00e4ringskedjor och f\u00f6rklarar sambandet mellan arter' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av fleravstyckesinformationstexter', howWeAddress: 'Skogsfaktatexter d\u00e4r eleven identifierar huvudid\u00e9, stf\u00f6djande detaljer och drar slutsatser' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge bildst\u00f6d vid n\u00e4ringskedjor, begr\u00e4nsa m\u00e4tning till hela cm och anv\u00e4nd korta texter. F\u00f6r avancerade elever, introducera n\u00e4ringsv\u00e4var, l\u00e5t eleven planera egna unders\u00f6kningar och skriva forskningsrapporter.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet observera och dokumentera naturen. G\u00e5 p\u00e5 skogsutflykter och l\u00e5t barnet m\u00e4ta tr\u00e4d, r\u00e4kna arter och skriva ner observationer. Diskutera vem som \u00e4ter vem i skogen. F\u00f6r en naturdagbok d\u00e4r barnet ritar och skriver. Samla l\u00f6v och kottar f\u00f6r sortering hemma.',
    classroomIntegration: 'Skogstemat i \u00e5rskurs 2 integrerar NO (ekosystem, n\u00e4ringskedjor, \u00e5rstider), matematik (m\u00e4tning, data, diagram) och svenska (informationstexter, dokumentation). Eleverna genomf\u00f6r skogsbes\u00f6k d\u00e4r de samlar data, analyserar och presenterar. Lgr22:s m\u00e5l f\u00f6r naturvetenskap och m\u00e4tning uppfylls.',
    assessmentRubric: [
      { skill: 'M\u00e4tning i naturen', emerging: 'm\u00e4ter med st\u00f6d och avl\u00e4ser till n\u00e4rmaste cm', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och dokumenterar resultat korrekt', advanced: 'planerar egna m\u00e4tningar och j\u00e4mf\u00f6r data systematiskt' },
      { skill: 'Ekosystemf\u00f6rst\u00e5else', emerging: 'namnger n\u00e5gra skogsdjur och v\u00e4xter med st\u00f6d', proficient: 'beskriver n\u00e4ringskedjor och sambanden i skogens ekosystem', advanced: 'f\u00f6rklarar n\u00e4ringsv\u00e4var och f\u00f6ruts\u00e4ger konsekvenser av f\u00f6r\u00e4ndringar' },
      { skill: 'Naturvetenskaplig dokumentation', emerging: 'antecknar observationer med st\u00f6d', proficient: 'dokumenterar sj\u00e4lvst\u00e4ndigt med tabeller och diagram', advanced: 'skriver forskningsrapporter med metod, resultat och slutsatser' },
    ],
  },

  fruits: {
    seoTitle: 'Gratis Frukt\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara frukt\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Br\u00e5k, vikt, datainsamling och beskrivande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'frukt\u00f6vningar \u00e5rskurs 2, br\u00e5k frukt, vikt gram, datainsamling 7\u20138 \u00e5r, Lgr22 matematik, stapeldiagram frukt, kategorisering, multiplikation, beskrivande text, h\u00e4lsa frukt',
    snippetAnswer: 'Frukt\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar br\u00e5k vid fruktdelning, vikt i gram, datainsamling med favoritfrukt-enk\u00e4ter och beskrivande skrivning om frukter. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 anv\u00e4nds frukttemat f\u00f6r br\u00e5k, vikt och datainsamling. Sju- och \u00e5tta\u00e5ringar delar frukter i halvor, tredjedelar och fj\u00e4rdedelar. V\u00e4gning av frukter i gram och kilo ger praktisk m\u00e4tning. Enk\u00e4ter om favoritfrukt presenteras i stapeldiagram. Multiplikation \u00f6vas: \u201d5 barn \u00e4ter 3 \u00e4pplen var\u201d. Beskrivande texter anv\u00e4nder sinnesord f\u00f6r smak, f\u00e4rg och textur. Lgr22 betonar br\u00e5k, m\u00e4tning, datahantering och h\u00e4lsa.',
    developmentalMilestones: [
      { milestone: 'Br\u00e5k med konkreta f\u00f6rem\u00e5l (halva, tredjedel, fj\u00e4rdedel)', howWeAddress: 'Fruktdelnings\u00f6vningar d\u00e4r eleven delar \u00e4pplen och apelsiner i lika delar och namnger br\u00e5k' },
      { milestone: 'V\u00e4gning i gram och kilo', howWeAddress: 'Eleverna v\u00e4ger olika frukter, j\u00e4mf\u00f6r vikter och l\u00e4r sig sambandet gram\u2013kilo' },
      { milestone: 'Datainsamling och diagramskapande', howWeAddress: 'Frukt-enk\u00e4ter d\u00e4r eleven samlar data, skapar stapeldiagram och besvarar fr\u00e5gor' },
      { milestone: 'Beskrivande skrivning med sinnesord', howWeAddress: 'Fruktbeskrivningar d\u00e4r eleven anv\u00e4nder smak, doft, f\u00e4rg och textur f\u00f6r att beskriva frukter' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med halvor, v\u00e4g i hela delar och ge bildst\u00f6d f\u00f6r skrivning. F\u00f6r avancerade elever, j\u00e4mf\u00f6r br\u00e5k, v\u00e4g i gram med precision och l\u00e5t eleven analysera data och skriva j\u00e4mf\u00f6rande texter.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet \u00f6va matematik med frukt hemma. Dela en apelsin och namnge delarna. V\u00e4g frukter p\u00e5 k\u00f6ksv\u00e5gen och j\u00e4mf\u00f6r: \u201dvad v\u00e4ger mest, \u00e4pplet eller bananen?\u201d. G\u00f6r en familjeenk\u00e4t om favoritfrukt och rita ett diagram. Diskutera varf\u00f6r frukt \u00e4r bra f\u00f6r kroppen.',
    classroomIntegration: 'Frukttemat i \u00e5rskurs 2 integrerar matematik (br\u00e5k, vikt, diagram), NO (n\u00e4ring, h\u00e4lsa, v\u00e4xtdelar), svenska (beskrivande text) och hemkunskap. Eleverna genomf\u00f6r en fruktdag med v\u00e4gning, provsmak och dokumentation. Lgr22:s m\u00e5l f\u00f6r br\u00e5k, m\u00e4tning och h\u00e4lsa uppfylls.',
    assessmentRubric: [
      { skill: 'Br\u00e5k med konkreta f\u00f6rem\u00e5l', emerging: 'identifierar halva med st\u00f6d', proficient: 'delar sj\u00e4lvst\u00e4ndigt i halvor, tredjedelar och fj\u00e4rdedelar och namnger', advanced: 'j\u00e4mf\u00f6r br\u00e5k och l\u00f6ser f\u00f6rdelningsproblem' },
      { skill: 'V\u00e4gning i gram och kilo', emerging: 'v\u00e4ger med st\u00f6d och avl\u00e4ser till n\u00e4rmaste hela', proficient: 'v\u00e4ger sj\u00e4lvst\u00e4ndigt och j\u00e4mf\u00f6r vikter korrekt', advanced: 'uppskattar vikt och v\u00e4xlar mellan enheter' },
      { skill: 'Beskrivande skrivning', emerging: 'skriver korta beskrivningar med n\u00e5gra sinnesord', proficient: 'anv\u00e4nder varierade sinnesord i styckestruktur', advanced: 'producerar rika j\u00e4mf\u00f6rande texter med detaljerade sinnsbeskrivningar' },
    ],
  },

  furniture: {
    seoTitle: 'Gratis M\u00f6bel\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara m\u00f6bel\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). M\u00e4tning, geometri, rumsplanering och instruktionsskrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'm\u00f6bel\u00f6vningar \u00e5rskurs 2, m\u00e4tning cm m\u00f6bler, geometri 3D-former, rumsplanering, Lgr22 teknik, instruktionstext 7\u20138 \u00e5r, ordproblem, material, area, omkrets',
    snippetAnswer: 'M\u00f6bel\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar m\u00e4tning i cm och m, geometriska former i m\u00f6bler, rumsplanering med enkel area och instruktionsskrivning om montering. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar m\u00f6beltemat m\u00e4tning och geometri till vardagslivet. Sju- och \u00e5tta\u00e5ringar m\u00e4ter m\u00f6bler i cm och m, identifierar 3D-former i bord, hyllor och skf\u00e5p. Enkel rumsplanering introducerar area konceptuellt: \u201df\u00e5r soffan plats?\u201d. Materialkategorisering kopplar till NO: tr\u00e4, metall, plast. Instruktionsskrivning om monteringsordning kr\u00e4ver steg-f\u00f6r-steg-struktur. Lgr22 betonar m\u00e4tning, geometri, teknik och skriftlig produktion.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning av m\u00f6bler och rum i cm och m', howWeAddress: 'Eleven m\u00e4ter m\u00f6bler, d\u00f6rr\u00f6ppningar och rum och dokumenterar m\u00e5tt f\u00f6r rumsplanering' },
      { milestone: 'Identifiera 3D-former i vardagsf\u00f6rem\u00e5l', howWeAddress: 'M\u00f6belformjakt d\u00e4r eleven hittar kuber, r\u00e4tblock och cylindrar i m\u00f6bler och f\u00f6rem\u00e5l' },
      { milestone: 'Enkel area och rumsplanering', howWeAddress: 'Planerings\u00f6vningar d\u00e4r eleven ritar m\u00f6bler i rutn\u00e4t och avg\u00f6r vad som f\u00e5r plats' },
      { milestone: 'Instruktionsskrivning med steg-f\u00f6r-steg', howWeAddress: 'Monteringsinstruktioner d\u00e4r eleven skriver tydliga steg med ordningstal' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, m\u00e4t med hela cm, fokusera p\u00e5 grundl\u00e4ggande former och ge skrivmallar. F\u00f6r avancerade elever, introducera mm, l\u00e5t eleven ber\u00e4kna enkel area med rutor och skriva detaljerade instruktioner med verktygslistor.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet m\u00e4ta m\u00f6bler och rum hemma. L\u00e5t barnet m\u00e4ta sitt skrivbord, sin s\u00e4ng och rummet. Rita en plankarta tillsammans. Diskutera vilka former m\u00f6bler har. N\u00e4r ni bygger n\u00e5got, l\u00e5t barnet l\u00e4sa och f\u00f6lja monteringsinstruktionen.',
    classroomIntegration: 'M\u00f6beltemat i \u00e5rskurs 2 integrerar matematik (m\u00e4tning, geometri, area), teknik (material, konstruktion), svenska (instruktionstexter) och bild (rumsritningar). Eleverna designar sitt dr\u00f6mrum p\u00e5 papper med korrekta m\u00e5tt. Lgr22:s m\u00e5l f\u00f6r m\u00e4tning, geometri och teknik uppfylls.',
    assessmentRubric: [
      { skill: 'M\u00e4tning av m\u00f6bler och rum', emerging: 'm\u00e4ter med st\u00f6d till n\u00e4rmaste cm', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och dokumenterar m\u00e5tt korrekt', advanced: 'planerar rumsuppl\u00e4gg med m\u00e5ttsatta ritningar' },
      { skill: '3D-former i vardagen', emerging: 'identifierar kub och cylinder med st\u00f6d', proficient: 'namnger och j\u00e4mf\u00f6r 3D-former i m\u00f6bler sj\u00e4lvst\u00e4ndigt', advanced: 'beskriver formegenskaper och skapar egna konstruktioner' },
      { skill: 'Instruktionsskrivning', emerging: 'skriver n\u00e5gra steg med st\u00f6d', proficient: 'skriver tydliga steg-f\u00f6r-steg-instruktioner med ordningstal', advanced: 'producerar komplexa instruktioner med villkor och materiallistor' },
    ],
  },

  garden: {
    seoTitle: 'Gratis Tr\u00e4dg\u00e5rds\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara tr\u00e4dg\u00e5rds\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). M\u00e4tning, area, livscykler och dokumenterande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'tr\u00e4dg\u00e5rds\u00f6vningar \u00e5rskurs 2, m\u00e4tning odling, area planering, livscykler v\u00e4xter, Lgr22 NO, dokumenterande text 7\u20138 \u00e5r, multiplikation, datainsamling, v\u00e4xttillv\u00e4xt, sk\u00f6rd',
    snippetAnswer: 'Tr\u00e4dg\u00e5rds\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar m\u00e4tning vid odling, enkel area f\u00f6r planering, v\u00e4xters livscykler och dokumenterande skrivning om tr\u00e4dg\u00e5rdsarbete. St\u00f6djer Lgr22. Gratis utskrivbara PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 blir tr\u00e4dg\u00e5rden ett utomhusklassrum f\u00f6r matematik och naturvetenskap. Sju- och \u00e5tta\u00e5ringar planerar odlingsytor genom att m\u00e4ta och ber\u00e4kna enkel area med rutor. Multiplikation \u00f6vas vid utsf\u00e4de: \u201d4 rader med 6 fr\u00f6n\u201d. V\u00e4xternas livscykel dokumenteras med m\u00e4tningar och observationer. Data fr\u00e5n odlingen presenteras i diagram. Lgr22 betonar m\u00e4tning, naturvetenskapligt unders\u00f6kande och dokumentation.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning och enkel area f\u00f6r odlingsplanering', howWeAddress: 'Tr\u00e4dg\u00e5rdsplaneringsuppgifter d\u00e4r eleven m\u00e4ter ytor och ber\u00e4knar hur m\u00e5nga v\u00e4xter som f\u00e5r plats' },
      { milestone: 'Multiplikation i rader och kolumner', howWeAddress: 'Uts\u00e4des\u00f6vningar d\u00e4r eleven planterar i rutn\u00e4t och ber\u00e4knar totalt antal med upprepad addition' },
      { milestone: 'F\u00f6rst\u00e5 och dokumentera v\u00e4xters livscykel', howWeAddress: 'Odlingsdagbok d\u00e4r eleven observerar, m\u00e4ter och dokumenterar fr\u00f6 till sk\u00f6rd' },
      { milestone: 'Dokumenterande och beskrivande skrivning', howWeAddress: 'Odlingsrapporter d\u00e4r eleven skriver om processen med styckestruktur och data' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge f\u00f6rfyllda odlingsmallar, arbeta med sm\u00e5 rutn\u00e4t och korta dokumentationer. F\u00f6r avancerade elever, l\u00e5t eleven planera hela tr\u00e4dg\u00e5rdar med m\u00e5ttsatta ritningar, ber\u00e4kna materialbudget och skriva detaljerade odlingsguider.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet odla och l\u00e4ra matematik samtidigt. Plantera fr\u00f6n hemma och l\u00e5t barnet m\u00e4ta tillv\u00e4xten varje vecka. Planera en rabatt och diskutera hur m\u00e5nga v\u00e4xter som f\u00e5r plats. L\u00e5t barnet f\u00f6ra odlingsdagbok med ritningar, m\u00e5tt och observationer.',
    classroomIntegration: 'Tr\u00e4dg\u00e5rdstemat i \u00e5rskurs 2 integrerar matematik (m\u00e4tning, area, multiplikation, data), NO (livscykler, jordm\u00e5n, v\u00e4xtbehov) och svenska (dokumenterande text). Eleverna driver en klassrabatt d\u00e4r de planerar, planterar, m\u00e4ter och rapporterar. Lgr22:s m\u00e5l f\u00f6r naturvetenskap och m\u00e4tning uppfylls.',
    assessmentRubric: [
      { skill: 'M\u00e4tning och area', emerging: 'm\u00e4ter med st\u00f6d och r\u00e4knar rutor i sm\u00e5 rutn\u00e4t', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och ber\u00e4knar area med rutor', advanced: 'planerar odlingsytor med m\u00e5ttsatta ritningar och materialber\u00e4kning' },
      { skill: 'Livscykelff\u00f6rst\u00e5else', emerging: 'ordnar stadier med bildst\u00f6d', proficient: 'f\u00f6rklarar livscykelns alla stadier sj\u00e4lvst\u00e4ndigt', advanced: 'j\u00e4mf\u00f6r livscykler mellan v\u00e4xtarter och drar slutsatser' },
      { skill: 'Dokumenterande skrivning', emerging: 'skriver korta observationer med st\u00f6d', proficient: 'skriver odlingsrapporter med data och styckestruktur', advanced: 'producerar detaljerade rapporter med analys och slutsatser' },
    ],
  },

  halloween: {
    seoTitle: 'Gratis Halloween\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara halloween\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Multiplikation, pengaber\u00e4kning, sp\u00e4nnande skrivning och logik. 33 generatorer. Gratis PDF.',
    seoKeywords: 'halloween\u00f6vningar \u00e5rskurs 2, multiplikation godis, pengaber\u00e4kning, sp\u00e4nnande ber\u00e4ttelse 7\u20138 \u00e5r, Lgr22 matematik, logikpussel, flerstegsuppgifter, m\u00f6nster, ordproblem, dekoration',
    snippetAnswer: 'Halloween\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar multiplikation med godisf\u00f6rdelning, pengaber\u00e4kning, sp\u00e4nnande ber\u00e4ttelseskrivning och logikpussel. Flerstegsuppgifter och m\u00f6nsterarbete ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 anv\u00e4nds halloweentemat f\u00f6r multiplikation och kreativt skrivande. Sju- och \u00e5tta\u00e5ringar r\u00e4knar godis med upprepad addition: \u201d8 barn f\u00e5r 5 karameller var\u201d. Pengaber\u00e4kning \u00f6vas vid ink\u00f6p av halloweensaker. Logikpussel med sp\u00f6ktema tr\u00e4nar slutledning. Sp\u00e4nnande ber\u00e4ttelseskrivning kr\u00e4ver styckestruktur med sp\u00e4nningsuppbyggnad, beskrivande detaljer och upplf\u00f6sning. Lgr22 betonar multiplikation, resonemang och kreativt skrivande.',
    developmentalMilestones: [
      { milestone: 'Multiplikation i f\u00f6rdelningskontext', howWeAddress: 'Godisf\u00f6rdelningsuppgifter d\u00e4r eleven ber\u00e4knar totalt antal med upprepad addition och multiplikation' },
      { milestone: 'Pengaber\u00e4kning med flerstegsuppgifter', howWeAddress: 'Halloweenbudget d\u00e4r eleven planerar ink\u00f6p, ber\u00e4knar kostnad och f\u00e5r tillbaka v\u00e4xel' },
      { milestone: 'Logiskt resonemang och slutledning', howWeAddress: 'Logikpussel d\u00e4r eleven anv\u00e4nder ledtr\u00e5dar f\u00f6r att l\u00f6sa halloweenmysterier' },
      { milestone: 'Sp\u00e4nnande ber\u00e4ttelseskrivning med styckestruktur', howWeAddress: 'Sp\u00f6khistorier d\u00e4r eleven bygger sp\u00e4nning med milj\u00f6beskrivning, handling och uppl\u00f6sning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med multiplikation med 2 och 5, j\u00e4mna kronbelopp och ge skrivmallar f\u00f6r ber\u00e4ttelser. F\u00f6r avancerade elever, introducera multiplikation med st\u00f6rre tal, komplexa budgetar och l\u00e5t eleven skriva l\u00e4ngre sp\u00e4nningsber\u00e4ttelser med dialog och cliffhangers.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet r\u00e4kna godis som multiplikation. R\u00e4kna godis efter bus-eller-godis: \u201dom du har 6 h\u00f6gar med 4 godis, hur m\u00e5nga totalt?\u201d. L\u00e5t barnet planera en halloweenfest med budget. Skriv en sp\u00f6khistoria tillsammans. G\u00f6r logikpussel vid kv\u00e4llsfikat.',
    classroomIntegration: 'Halloweentemat i \u00e5rskurs 2 integrerar matematik (multiplikation, pengar, logik), svenska (sp\u00e4nnande ber\u00e4ttelse, ordkunskap) och bild (dekoration, design). Eleverna planerar en klassfest med budget, skriver sp\u00f6khistorier och l\u00f6ser logikpussel. Lgr22:s m\u00e5l f\u00f6r multiplikation och skriftlig produktion uppfylls.',
    assessmentRubric: [
      { skill: 'Multiplikation', emerging: 'r\u00e4knar grupper av 2 och 5 med st\u00f6d av bilder', proficient: 'l\u00f6ser multiplikationsuppgifter sj\u00e4lvst\u00e4ndigt i kontext', advanced: 'anv\u00e4nder multiplikation i flerstegsuppgifter och f\u00f6rklarar strategier' },
      { skill: 'Logiskt resonemang', emerging: 'f\u00f6ljer enkla ledtr\u00e5dar med st\u00f6d', proficient: 'l\u00f6ser logikpussel sj\u00e4lvst\u00e4ndigt med systematiskt t\u00e4nkande', advanced: 'skapar egna logikpussel och f\u00f6rklarar resonemanget' },
      { skill: 'Sp\u00e4nnande ber\u00e4ttelseskrivning', emerging: 'skriver kort text med halloweentema', proficient: 'skriver ber\u00e4ttelse med sp\u00e4nningsuppbyggnad och styckestruktur', advanced: 'producerar l\u00e4ngre text med milj\u00f6beskrivning, dialog och cliffhanger' },
    ],
  },

  holidays: {
    seoTitle: 'Gratis H\u00f6gtids\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara h\u00f6gtids\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Kalender, tidber\u00e4kning, kulturkunskap och j\u00e4mf\u00f6rande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'h\u00f6gtids\u00f6vningar \u00e5rskurs 2, kalender\u00f6vningar, tidber\u00e4kning, kulturkunskap 7\u20138 \u00e5r, Lgr22 SO, j\u00e4mf\u00f6rande text, traditioner, \u00e5rstidscykel, multiplikation, ordproblem h\u00f6gtid',
    snippetAnswer: 'H\u00f6gtids\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar kalenderkunskap, tidber\u00e4kning, kulturf\u00f6rst\u00e5else och j\u00e4mf\u00f6rande skrivning om traditioner. Multiplikation vid festf\u00f6rberedelser och ordproblem ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar h\u00f6gtidstemat kalender och tid till kulturf\u00f6rst\u00e5else. Sju- och \u00e5tta\u00e5ringar arbetar med kalender\u00e5ret: m\u00e5nader, veckor och dagar till n\u00e4sta h\u00f6gtid. Tidber\u00e4kning anv\u00e4nds f\u00f6r att planera festf\u00f6rberedelser. H\u00f6gtider fr\u00e5n olika kulturer j\u00e4mf\u00f6rs: vad firas, hur och varf\u00f6r. Multiplikation \u00f6vas vid materialf\u00f6rberedelser. J\u00e4mf\u00f6rande skrivning kr\u00e4ver styckestruktur med likheter och skillnader. Lgr22 betonar tid, kulturell f\u00f6rst\u00e5else och skriftlig produktion.',
    developmentalMilestones: [
      { milestone: 'Kalenderkunskap: m\u00e5nader, veckor och datumber\u00e4kning', howWeAddress: 'Kalender\u00f6vningar d\u00e4r eleven ber\u00e4knar dagar till n\u00e4sta h\u00f6gtid och planerar med kalender' },
      { milestone: 'Tidber\u00e4kning f\u00f6r planering', howWeAddress: 'Festplaneringsuppgifter d\u00e4r eleven schemal\u00e4gger f\u00f6rberedelser med tidsangivelser' },
      { milestone: 'Kulturf\u00f6rst\u00e5else genom h\u00f6gtidstraditioner', howWeAddress: 'J\u00e4mf\u00f6relse\u00f6vningar d\u00e4r eleven l\u00e4ser om och j\u00e4mf\u00f6r h\u00f6gtider fr\u00e5n olika kulturer' },
      { milestone: 'J\u00e4mf\u00f6rande skrivning med styckestruktur', howWeAddress: 'Texter d\u00e4r eleven beskriver likheter och skillnader mellan h\u00f6gtider i organiserade stycken' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, fokusera p\u00e5 kf\u00e4nda svenska h\u00f6gtider, ge bildbaserade j\u00e4mf\u00f6relser och skrivmallar. F\u00f6r avancerade elever, inkludera h\u00f6gtider fr\u00e5n fler kulturer, l\u00e5t eleven forska sj\u00e4lvst\u00e4ndigt och skriva l\u00e4ngre j\u00e4mf\u00f6rande texter med flera h\u00f6gtider.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet planera med kalendern. Markera h\u00f6gtider och r\u00e4kna dagar till n\u00e4sta. Ber\u00e4tta om familjens traditioner och l\u00e5t barnet skriva ner dem. Diskutera hur andra familjer firar samma eller andra h\u00f6gtider. Planera en fest tillsammans med tidsschema.',
    classroomIntegration: 'H\u00f6gtidstemat i \u00e5rskurs 2 integrerar SO (kulturer, traditioner), matematik (kalender, tid, multiplikation) och svenska (j\u00e4mf\u00f6rande text, informationstexter). Eleverna genomf\u00f6r ett h\u00f6gtidsprojekt d\u00e4r de forskar om och presenterar olika h\u00f6gtider. Lgr22:s m\u00e5l f\u00f6r kulturf\u00f6rst\u00e5else och skriftlig produktion uppfylls.',
    assessmentRubric: [
      { skill: 'Kalender och tid', emerging: 'namnger m\u00e5nader och r\u00e4knar dagar med st\u00f6d', proficient: 'anv\u00e4nder kalendern sj\u00e4lvst\u00e4ndigt f\u00f6r planering och tidber\u00e4kning', advanced: 'planerar komplexa tidsscheman och ber\u00e4knar tidsintervall \u00f6ver m\u00e5nader' },
      { skill: 'Kulturf\u00f6rst\u00e5else', emerging: 'beskriver en svensk h\u00f6gtid med st\u00f6d', proficient: 'j\u00e4mf\u00f6r tv\u00e5 h\u00f6gtider fr\u00e5n olika kulturer sj\u00e4lvst\u00e4ndigt', advanced: 'analyserar traditioner fr\u00e5n flera kulturer och reflekterar \u00f6ver likheter' },
      { skill: 'J\u00e4mf\u00f6rande skrivning', emerging: 'namnger n\u00e5gra likheter och skillnader', proficient: 'skriver j\u00e4mf\u00f6rande stycken med tydlig struktur', advanced: 'producerar v\u00e4lorganiserade j\u00e4mf\u00f6rande texter med slutsatser' },
    ],
  },

  household: {
    seoTitle: 'Gratis Hem\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara hem\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Budget, m\u00e4tning, tidplanering och instruktionsskrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'hem\u00f6vningar \u00e5rskurs 2, budget hush\u00e5ll, m\u00e4tning hemma, tidplanering 7\u20138 \u00e5r, Lgr22 matematik, pengaber\u00e4kning, instruktionstext, energi, \u00e5tervinning, s\u00e4kerhet hemmet',
    snippetAnswer: 'Hem\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar hush\u00e5llsbudget, m\u00e4tning i hemmet, tidplanering f\u00f6r sysslor och instruktionsskrivning om hush\u00e5llsuppgifter. Multiplikation och pengar ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar hemtemat matematik till ansvarstagande. Sju- och \u00e5tta\u00e5ringar r\u00e4knar med veckopeng, planerar enkel hush\u00e5llsbudget och j\u00e4mf\u00f6r priser. Tidplanering f\u00f6r hush\u00e5llssysslor \u00f6var klockan och tidintervall. M\u00e4tning i hemmet (rum, m\u00f6bler, f\u00f6rem\u00e5l) ger praktisk \u00f6vning. Instruktionstexter om hur man st\u00e4dar eller lagar enkel mat kr\u00e4ver steg-f\u00f6r-steg-struktur. Lgr22 betonar pengar, tid, m\u00e4tning och skriftlig produktion i vardagskontext.',
    developmentalMilestones: [
      { milestone: 'Enkel budgetering med kronor och veckopeng', howWeAddress: 'Budget\u00f6vningar d\u00e4r eleven f\u00f6rdelar veckopeng p\u00e5 sparande och utgifter och f\u00f6ljer upp' },
      { milestone: 'Tidplanering f\u00f6r hush\u00e5llssysslor', howWeAddress: 'Schema\u00f6vningar d\u00e4r eleven planerar sysslor med klockan och ber\u00e4knar hur l\u00e5ng tid varje moment tar' },
      { milestone: 'M\u00e4tning i hemmet f\u00f6r praktiska \u00e4ndam\u00e5l', howWeAddress: 'Hus\u00f6vningar d\u00e4r eleven m\u00e4ter rum, f\u00f6nster och d\u00f6rrar och dokumenterar resultat' },
      { milestone: 'Instruktionsskrivning om hush\u00e5llsuppgifter', howWeAddress: 'Syssloinstruktioner d\u00e4r eleven skriver steg-f\u00f6r-steg med ordningstal och tidsangivelser' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med j\u00e4mna kronbelopp, ge tidsscheman med bilder och korta instruktionsmallar. F\u00f6r avancerade elever, introducera veckobudget med flera utgiftskategorier, l\u00e5t eleven planera en hel dag med tidsber\u00e4kning och skriva detaljerade instruktioner.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet ta ansvar f\u00f6r enkel hush\u00e5llsplanering. Ge en liten veckopeng och l\u00e5t barnet planera hur den anv\u00e4nds. G\u00f6r ett syssloschema tillsammans med tider. L\u00e5t barnet m\u00e4ta saker i hemmet. Be barnet skriva instruktioner f\u00f6r en hush\u00e5llssyssla som n\u00e5gon annan ska f\u00f6lja.',
    classroomIntegration: 'Hemtemat i \u00e5rskurs 2 integrerar matematik (pengar, tid, m\u00e4tning), NO (energi, \u00e5tervinning, s\u00e4kerhet) och svenska (instruktionstexter, skrivande). Eleverna genomf\u00f6r ett hush\u00e5llsprojekt d\u00e4r de planerar, budgeterar och dokumenterar. Lgr22:s m\u00e5l f\u00f6r pengar, tid och skriftlig produktion uppfylls.',
    assessmentRubric: [
      { skill: 'Budget och pengar', emerging: 'r\u00e4knar med j\u00e4mna kronbelopp med st\u00f6d', proficient: 'f\u00f6rdelar veckopeng och ber\u00e4knar saldo sj\u00e4lvst\u00e4ndigt', advanced: 'planerar veckobudget med flera kategorier och sparande' },
      { skill: 'Tidplanering', emerging: 'l\u00e4ser heltimmar och f\u00f6ljer enkelt schema', proficient: 'planerar sysslor med klockan och ber\u00e4knar tidsintervall', advanced: 'skapar komplexa tidsscheman och optimerar tidsanv\u00e4ndning' },
      { skill: 'Instruktionsskrivning', emerging: 'skriver n\u00e5gra steg med st\u00f6d', proficient: 'producerar tydliga steg-f\u00f6r-steg-instruktioner', advanced: 'skriver detaljerade instruktioner med tips, alternativ och tidsangivelser' },
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
  const filePath = path.join(THEMES_DIR, theme, 'sv.ts');

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
    console.error(`MISSING GRADE BLOCKS: ${theme}/sv.ts`);
    errorCount++;
    continue;
  }

  const secondGradeBlock = content.substring(secondGradeIdx, thirdGradeIdx);
  if (secondGradeBlock.includes('seoTitle:')) {
    console.log(`SKIP (already enriched): ${theme}/sv.ts`);
    continue;
  }

  // STEP 1: Insert seoTitle/seoDescription/seoKeywords right after "'second-grade': {"
  const secondGradeOpenPattern = "'second-grade': {";
  const secondGradeOpenIdx = content.indexOf(secondGradeOpenPattern);
  if (secondGradeOpenIdx === -1) {
    console.error(`NO SECOND-GRADE OPEN FOUND: ${theme}/sv.ts`);
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
    console.error(`NO FAQ END FOUND: ${theme}/sv.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const enrichInsertPos = newSecondGradeIdx + lastMatch.index + lastMatch[0].length;
  const enrichText = buildEnrichmentInsertionText(enrichments[theme]) + '\n';
  content = content.substring(0, enrichInsertPos) + enrichText + content.substring(enrichInsertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/sv.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
