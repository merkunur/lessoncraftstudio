#!/usr/bin/env node
/**
 * SEO Part 296: SV Second-Grade Enrichment \u2014 Themes 26-50
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the second-grade grade block of 25 SV theme files (insects through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  insects: {
    seoTitle: 'Gratis Insekts\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara insekts\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Livscykler, m\u00e4tning, klassificering och informationstexter om insekter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'insekts\u00f6vningar \u00e5rskurs 2, livscykel fj\u00e4ril, klassificering insekter 7\u20138 \u00e5r, m\u00e4tning cm insekter, informationstexter insekter, Lgr22 NO, metamorfos, stapeldiagram, multiplikation, ekosystem',
    snippetAnswer: 'Insekts\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar livscykler, m\u00e4tning i standardenheter, klassificering med flera kriterier och l\u00e4sf\u00f6rst\u00e5else av informationstexter om insekter. Multiplikation \u00f6vas som upprepad addition i insektskontext. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 f\u00f6rdjupas insektstemat till vetenskapligt unders\u00f6kande. Sju- och \u00e5tta\u00e5ringar m\u00e4ter insekters kroppsl\u00e4ngd i centimeter, j\u00e4mf\u00f6r data i tabeller och skapar stapeldiagram \u00f6ver observerade arter. Klassificering sker med flera kriterier: antal ben, vingar, levnadsmilj\u00f6. Livscykeln studeras som en flerstegsekvens d\u00e4r eleverna skriver organiserade stycken om metamorfos. Multiplikation introduceras: \u201dom 5 nyckelpigor har 6 ben var, hur m\u00e5nga ben totalt?\u201d. Informationstexter om insektsanpassningar l\u00e4ses med fokus p\u00e5 huvudid\u00e9 och detaljer. Lgr22 betonar naturvetenskapligt unders\u00f6kande och datahantering p\u00e5 denna niv\u00e5.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning och j\u00e4mf\u00f6relse med standardenheter', howWeAddress: 'Eleverna m\u00e4ter insekters kroppsl\u00e4ngd i cm, dokumenterar i tabeller och j\u00e4mf\u00f6r storleksskillnader' },
      { milestone: 'Klassificering med flera kriterier samtidigt', howWeAddress: 'Sorteringsuppgifter d\u00e4r insekter klassificeras efter antal ben, vingar, levnadsmilj\u00f6 och f\u00f6da' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av fleravstyckesinformationstexter', howWeAddress: 'Faktatexter om insektsanpassningar d\u00e4r eleven identifierar huvudid\u00e9 och st\u00f6djande detaljer' },
      { milestone: 'Dokumenterande skrivning med styckestruktur', howWeAddress: 'Eleverna skriver observationsrapporter om insekters livscykler med inledning, detaljer och avslutning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge bildst\u00f6dd klassificering med tv\u00e5 kriterier och korta enmeningstexter om insekter. F\u00f6r avancerade elever, ut\u00f6ka till trestegsklassificering, l\u00e5t eleven j\u00e4mf\u00f6ra livscykler mellan arter och skriva fleravstyckestexter med j\u00e4mf\u00f6rande struktur.',
    parentTakeaway: 'I \u00e5rskurs 2 utvecklar ert barn vetenskapligt t\u00e4nkande. G\u00e5 p\u00e5 insektsjakt med f\u00f6rstoringsglas och l\u00e5t barnet m\u00e4ta och dokumentera fynd. Diskutera livscykler: hur f\u00f6r\u00e4ndras en larv? Skapa stapeldiagram \u00f6ver insekter ni sett. L\u00e4s faktab\u00f6cker om insekter och prata om anpassningar.',
    classroomIntegration: 'Insektstemat i \u00e5rskurs 2 integrerar NO och matematik: eleverna m\u00e4ter och j\u00e4mf\u00f6r insekter, skapar diagram fr\u00e5n observationsdata och klassificerar med flera kriterier. I svenska l\u00e4ses faktatexter och eleverna skriver egna observationsrapporter med styckestruktur. Lgr22:s m\u00e5l f\u00f6r naturvetenskapligt unders\u00f6kande och datahantering uppfylls.',
    assessmentRubric: [
      { skill: 'M\u00e4tning och datahantering', emerging: 'm\u00e4ter med st\u00f6d och fyller i f\u00f6rgjorda tabeller', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt i cm och skapar stapeldiagram', advanced: 'analyserar m\u00e4tdata, drar slutsatser och formulerar egna fr\u00e5gor' },
      { skill: 'Klassificering med flera kriterier', emerging: 'sorterar efter ett kriterium med st\u00f6d', proficient: 'klassificerar sj\u00e4lvst\u00e4ndigt med tv\u00e5-tre kriterier', advanced: 'skapar egna klassificeringssystem och motiverar sina val' },
      { skill: 'Informationstextf\u00f6rst\u00e5else', emerging: '\u00e5terger enstaka fakta fr\u00e5n texten med st\u00f6d', proficient: 'identifierar huvudid\u00e9 och detaljer i fleravstyckestexter', advanced: 'j\u00e4mf\u00f6r information fr\u00e5n flera texter och drar egna slutsatser' },
    ],
  },

  jobs: {
    seoTitle: 'Gratis Yrkes\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara yrkes\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Pengaber\u00e4kning, klockan, skrivning om yrken och flerstegsuppgifter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'yrkes\u00f6vningar \u00e5rskurs 2, pengaber\u00e4kning 7\u20138 \u00e5r, klockan \u00f6vningar, skrivning om yrken, Lgr22 samh\u00e4llskunskap, flerstegsuppgifter, multiplikation, informationstexter, arbetsschema, probleml\u00f6sning',
    snippetAnswer: 'Yrkes\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar pengaber\u00e4kning, klockan och arbetsscheman, multiplikation i yrkeskontext och skrivning av informationsstycken om olika yrken. Flerstegsuppgifter integrerar matematik och l\u00e4sf\u00f6rst\u00e5else. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplas yrkestemat till praktisk matematik och samh\u00e4llsf\u00f6rst\u00e5else. Sju- och \u00e5tta\u00e5ringar ber\u00e4knar l\u00f6ner med enkla multiplikationer, planerar arbetsscheman med klockan i kvart och halvtimme och l\u00f6ser flerstegsordproblem: \u201den bagare bakar 4 pl\u00e5tar med 6 bullar p\u00e5 varje\u201d. Pengaber\u00e4kning med kronor och \u00f6ren \u00f6vas genom butiksscenarier. Eleverna l\u00e4ser informationstexter om samh\u00e4llstj\u00e4nster och skriver organiserade stycken om vad olika yrkesgrupper g\u00f6r. Lgr22 betonar samh\u00e4llskunskap, ekonomiskt t\u00e4nkande och skriftlig produktion.',
    developmentalMilestones: [
      { milestone: 'Pengaber\u00e4kning med kronor och \u00f6ren', howWeAddress: 'Butiksscenarier d\u00e4r eleven ber\u00e4knar priser, v\u00e4xel och total kostnad i yrkeskontext' },
      { milestone: 'Klockan och tidplanering', howWeAddress: 'Arbetsschema\u00f6vningar d\u00e4r eleven schemal\u00e4gger en arbetsdag och ber\u00e4knar tidsintervall' },
      { milestone: 'Multiplikation som upprepad addition i vardagssituationer', howWeAddress: 'Yrkesuppgifter d\u00e4r eleven ber\u00e4knar totala m\u00e4ngder: paket, portioner och leveranser' },
      { milestone: 'Informationsskrivning med styckestruktur', howWeAddress: 'Eleverna skriver organiserade stycken om yrken med inledande mening, fakta och avslutning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd j\u00e4mna kronbelopp utan \u00f6ren, arbeta med heltimmar och ge skrivmallar med f\u00e4rdiga rubriker. F\u00f6r avancerade elever, introducera budget\u00f6vningar med begr\u00e4nsade medel, scheman med femminutersintervall och skrivuppgifter d\u00e4r eleven j\u00e4mf\u00f6r tv\u00e5 yrken.',
    parentTakeaway: 'I \u00e5rskurs 2 f\u00f6rst\u00e5r ert barn pengar och tid b\u00e4ttre. Prata om yrken ni m\u00f6ter i vardagen: vad g\u00f6r kassapersonalen, brevb\u00e4raren, l\u00e4karen? L\u00e5t barnet hantera pengar vid sm\u00e5 ink\u00f6p och \u00f6va v\u00e4xelber\u00e4kning. Skapa en \u201darbetsdag\u201d hemma d\u00e4r barnet planerar aktiviteter med klockan.',
    classroomIntegration: 'Yrkestemat i \u00e5rskurs 2 integrerar SO, matematik och svenska: i matematik \u00f6vas pengar, tid och multiplikation genom yrkesscenarier. I SO diskuteras samh\u00e4llstj\u00e4nster och arbetsf\u00f6rdelning. I svenska l\u00e4ses informationstexter och eleverna skriver egna yrkesbeskrivningar med styckestruktur. Lgr22:s m\u00e5l f\u00f6r ekonomi och samh\u00e4llsf\u00f6rst\u00e5else st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Pengaber\u00e4kning', emerging: 'r\u00e4knar med j\u00e4mna kronbelopp med st\u00f6d', proficient: 'adderar och subtraherar belopp med kronor och \u00f6ren sj\u00e4lvst\u00e4ndigt', advanced: 'planerar budget, j\u00e4mf\u00f6r priser och ber\u00e4knar v\u00e4xel i komplexa scenarier' },
      { skill: 'Klockan och tidplanering', emerging: 'l\u00e4ser heltimmar och halvtimmar med st\u00f6d', proficient: 'l\u00e4ser klockan i kvart och planerar enkla scheman', advanced: 'ber\u00e4knar komplexa tidsintervall och schemal\u00e4gger sj\u00e4lvst\u00e4ndigt' },
      { skill: 'Informationsskrivning', emerging: 'skriver enstaka meningar om ett yrke med st\u00f6d', proficient: 'skriver organiserade stycken med inledning, fakta och avslutning', advanced: 'j\u00e4mf\u00f6r yrken i fleravstyckestexter med egna reflektioner' },
    ],
  },

  music: {
    seoTitle: 'Gratis Musik\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara musik\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). M\u00f6nster, br\u00e5k med notv\u00e4rden, rytmsekvenser och beskrivande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'musik\u00f6vningar \u00e5rskurs 2, m\u00f6nster rytm 7\u20138 \u00e5r, br\u00e5k notv\u00e4rden, beskrivande skrivning musik, Lgr22 musik, multiplikation, sekvenser, instrumentfamiljer, stapeldiagram, kreativt skapande',
    snippetAnswer: 'Musik\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar m\u00f6nsterigenkanning med rytmsekvenser, introduktion till br\u00e5k via notv\u00e4rden, multiplikation i musikkontext och beskrivande skrivning om instrument. Klassificering av instrumentfamiljer ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 anv\u00e4nds musiktemat f\u00f6r att koppla matematik till kreativt skapande. Sju- och \u00e5tta\u00e5ringar arbetar med m\u00f6nsterigenkanning genom rytmsekvenser och f\u00f6rl\u00e4nger m\u00f6nster. Notv\u00e4rden introducerar br\u00e5kbegrepp: en halvnot \u00e4r h\u00e4lften av en helnot. Multiplikation \u00f6vas: \u201dom 3 trumm\u00f6r sl\u00e5r 4 slag var, hur m\u00e5nga slag totalt?\u201d. Instrumentfamiljer klassificeras med flera kriterier: str\u00e4ng, bl\u00e5s, slagverk. Eleverna l\u00e4ser informationstexter om musiktraditioner och skriver beskrivande stycken om sitt favoritinstrument. Lgr22 betonar m\u00f6nster, kreativt uttryck och \u00e4mnes\u00f6vergripande arbete.',
    developmentalMilestones: [
      { milestone: 'M\u00f6nsterigenkanning och m\u00f6nsterf\u00f6rl\u00e4ngning', howWeAddress: 'Rytmsekvens\u00f6vningar d\u00e4r eleven identifierar, f\u00f6rl\u00e4nger och skapar egna m\u00f6nster med notv\u00e4rden' },
      { milestone: 'Introduktion till br\u00e5kbegrepp i kontext', howWeAddress: 'Not\u00f6vningar d\u00e4r eleven kopplar halv-, fjr\u00e4rdedels- och helnoter till br\u00e5kdelar av en takt' },
      { milestone: 'Klassificering av instrument i familjer', howWeAddress: 'Sorteringsuppgifter d\u00e4r eleven grupperar instrument efter spelss\u00e4tt: str\u00e4ng, bl\u00e5s och slagverk' },
      { milestone: 'Beskrivande skrivning med sinnesdetaljer', howWeAddress: 'Eleverna skriver organiserade stycken om instrument med beskrivningar av ljud, utseende och k\u00e4nsla' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd enklare AB-m\u00f6nster med bildst\u00f6d, fokusera p\u00e5 halv och hel som br\u00e5kbegrepp och ge skrivmallar. F\u00f6r avancerade elever, skapa komplexa ABCABC-m\u00f6nster, introducera fj\u00e4rdedels- och \u00e5ttondelar och l\u00e5t eleven skriva j\u00e4mf\u00f6rande texter om olika instrumentfamiljer.',
    parentTakeaway: 'I \u00e5rskurs 2 kan ert barn se m\u00f6nster \u00f6verallt. Lyssna p\u00e5 musik tillsammans och klappa rytmen. Fr\u00e5ga: vilka m\u00f6nster h\u00f6r du? Diskutera instrument: hur l\u00e5ter de, hur spelas de? L\u00e5t barnet rita och skriva om sin favoritmusik. Bes\u00f6k ett musikbibliotek eller se en konsert online.',
    classroomIntegration: 'Musiktemat i \u00e5rskurs 2 integrerar matematik, svenska och musik: m\u00f6nsterigenkanning \u00f6vas genom rytmsekvenser, br\u00e5kbegrepp genom notv\u00e4rden och klassificering genom instrumentfamiljer. I svenska skrivs beskrivande stycken och l\u00e4ses informationstexter om musiktraditioner. Lgr22:s m\u00e5l f\u00f6r m\u00f6nster och kreativt uttryck uppfylls.',
    assessmentRubric: [
      { skill: 'M\u00f6nsterigenkanning och -f\u00f6rl\u00e4ngning', emerging: 'identifierar enkla AB-m\u00f6nster med st\u00f6d', proficient: 'f\u00f6rl\u00e4nger och skapar ABC-m\u00f6nster sj\u00e4lvst\u00e4ndigt', advanced: 'skapar komplexa m\u00f6nster och f\u00f6rklarar m\u00f6nsterregler' },
      { skill: 'Br\u00e5kf\u00f6rst\u00e5else via notv\u00e4rden', emerging: 'identifierar hel och halv med st\u00f6d', proficient: 'kopplar notv\u00e4rden till br\u00e5kdelar av en takt sj\u00e4lvst\u00e4ndigt', advanced: 'arbetar med fj\u00e4rdedelar och \u00e5ttondelar och j\u00e4mf\u00f6r br\u00e5k' },
      { skill: 'Beskrivande skrivning', emerging: 'skriver enstaka meningar om ett instrument med st\u00f6d', proficient: 'skriver organiserade stycken med sinnesdetaljer', advanced: 'j\u00e4mf\u00f6r instrument i fleravstyckestexter med nyanserade beskrivningar' },
    ],
  },

  nature: {
    seoTitle: 'Gratis Natur\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara natur\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Ekosystem, m\u00e4tning, datahantering och informationstexter om natur. 33 generatorer. Gratis PDF.',
    seoKeywords: 'natur\u00f6vningar \u00e5rskurs 2, ekosystem 7\u20138 \u00e5r, m\u00e4tning v\u00e4xter, datahantering stapeldiagram, informationstexter natur, Lgr22 NO, n\u00e4ringskedja, observationsdagbok, klassificering, biologisk m\u00e5ngfald',
    snippetAnswer: 'Natur\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar ekosystemf\u00f6rst\u00e5else, m\u00e4tning av v\u00e4xters tillv\u00e4xt, datainsamling i stapeldiagram och l\u00e4sf\u00f6rst\u00e5else av informationstexter om natur. Multiplikation och flerstegsuppgifter ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 f\u00f6rdjupas naturtemat till ekosystemf\u00f6rst\u00e5else. Sju- och \u00e5tta\u00e5ringar m\u00e4ter v\u00e4xters tillv\u00e4xt i centimeter \u00f6ver tid, dokumenterar i tabeller och skapar stapeldiagram. N\u00e4ringskedjor studeras: producent, konsument, nedbrytare. Klassificering sker med flera kriterier: v\u00e4xter kontra djur, levnadsmilj\u00f6er, anpassningar. Multiplikation \u00f6vas: \u201dom 4 tr\u00e4d har 5 f\u00e5gelbon var\u201d. Eleverna l\u00e4ser fleravstyckestexter om biologisk m\u00e5ngfald och skriver observationsrapporter. Lgr22 betonar naturvetenskapligt unders\u00f6kande, systematisk dokumentation och ekologiskt t\u00e4nkande.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning av tillv\u00e4xt och f\u00f6r\u00e4ndring \u00f6ver tid', howWeAddress: 'Eleverna m\u00e4ter v\u00e4xters h\u00f6jd i cm veckovis och dokumenterar f\u00f6r\u00e4ndringar i tabeller och diagram' },
      { milestone: 'F\u00f6rst\u00e5else av n\u00e4ringskedjor och ekosystem', howWeAddress: 'Sorterings\u00f6vningar d\u00e4r eleven ordnar producenter, konsumenter och nedbrytare i n\u00e4ringskedjor' },
      { milestone: 'Datainsamling och presentation i stapeldiagram', howWeAddress: 'Naturobs-uppgifter d\u00e4r eleven r\u00e4knar arter utomhus och presenterar data i stapeldiagram' },
      { milestone: 'Informationsskrivning med fakta och observationer', howWeAddress: 'Observationsrapporter d\u00e4r eleven skriver organiserade stycken om naturf\u00f6r\u00e4ndringar' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge f\u00f6rfyllda tabeller, arbeta med enkla tv\u00e5ledade n\u00e4ringskedjor och korta texter med bildst\u00f6d. F\u00f6r avancerade elever, ut\u00f6ka till n\u00e4ringsv\u00e4var med f\u00f6rgreningar, l\u00e5t eleven analysera tillv\u00e4xtdata statistiskt och skriva j\u00e4mf\u00f6rande texter om olika ekosystem.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet unders\u00f6ka naturen systematiskt. G\u00e5 p\u00e5 naturpromenader och l\u00e5t barnet dokumentera vad det ser. Plantera fr\u00f6n och m\u00e4t tillv\u00e4xten varje vecka. Diskutera n\u00e4ringskedjor: vem \u00e4ter vem? Skapa diagram \u00f6ver v\u00e4xter och djur i er tr\u00e4dg\u00e5rd.',
    classroomIntegration: 'Naturtemat i \u00e5rskurs 2 integrerar NO, matematik och svenska: i NO studeras ekosystem och n\u00e4ringskedjor, i matematik \u00f6vas m\u00e4tning och datapresentation. I svenska l\u00e4ses faktatexter och eleverna skriver observationsrapporter. Utomhuspedagogik f\u00f6rst\u00e4rker l\u00e4randet. Lgr22:s m\u00e5l f\u00f6r biologisk m\u00e5ngfald och systematisk dokumentation uppfylls.',
    assessmentRubric: [
      { skill: 'M\u00e4tning och datadokumentation', emerging: 'm\u00e4ter med st\u00f6d och fyller i f\u00f6rgjorda tabeller', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och skapar stapeldiagram fr\u00e5n data', advanced: 'analyserar tillv\u00e4xtdata, identifierar m\u00f6nster och drar slutsatser' },
      { skill: 'Ekosystem och n\u00e4ringskedjor', emerging: 'namnger producenter och konsumenter med st\u00f6d', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt organismer i n\u00e4ringskedjor', advanced: 'f\u00f6rklarar samband i n\u00e4ringsv\u00e4var och diskuterar konsekvenser' },
      { skill: 'Observationsrapporter', emerging: 'skriver enstaka observationsmeningar med st\u00f6d', proficient: 'skriver organiserade rapporter med fakta och datum', advanced: 'j\u00e4mf\u00f6r observationer \u00f6ver tid och drar v\u00e4lgrundade slutsatser' },
    ],
  },

  numbers: {
    seoTitle: 'Gratis Siffer\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara siffer\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Platsv\u00e4rde till hundratal, addition och subtraktion inom 100 med tiv\u00e4xling. 33 generatorer. Gratis PDF.',
    seoKeywords: 'siffer\u00f6vningar \u00e5rskurs 2, platsv\u00e4rde hundratal 7\u20138 \u00e5r, addition subtraktion 100, tiv\u00e4xling, multiplikation upprepad addition, tallinjen, Lgr22 matematik, matematiskt resonemang, probleml\u00f6sning, udda j\u00e4mna tal',
    snippetAnswer: 'Siffer\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar platsv\u00e4rde till hundratal, addition och subtraktion inom 100 med tiv\u00e4xling samt multiplikation som upprepad addition. Tallinjen, udda och j\u00e4mna tal och flerstegsuppgifter ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 f\u00f6rdjupas taluppfattningen avseev\u00e4rt. Sju- och \u00e5tta\u00e5ringar arbetar med platsv\u00e4rde upp till hundratal och f\u00f6rst\u00e5r att 345 best\u00e5r av 3 hundratal, 4 tiotal och 5 ental. Addition och subtraktion inom 100 med tiv\u00e4xling \u00f6vas systematiskt. Multiplikation introduceras som upprepad addition p\u00e5 tallinjen. Udda och j\u00e4mna tal identifieras och m\u00f6nster utforskas. Flerstegsordproblem kr\u00e4ver att eleven v\u00e4ljer operation och l\u00f6ser i r\u00e4tt ordning. Lgr22 betonar matematiskt resonemang d\u00e4r eleven f\u00f6rklarar sina l\u00f6sningsstrategier.',
    developmentalMilestones: [
      { milestone: 'Platsv\u00e4rdef\u00f6rst\u00e5else upp till hundratal', howWeAddress: '\u00d6vningar d\u00e4r eleven delar upp tal i hundratal, tiotal och ental och representerar med block och siffror' },
      { milestone: 'Addition och subtraktion inom 100 med tiv\u00e4xling', howWeAddress: 'Systematiska ber\u00e4kningsuppgifter med och utan tiv\u00e4xling, b\u00e5de horisontellt och vertikalt' },
      { milestone: 'Multiplikation som upprepad addition', howWeAddress: 'Tallinje\u00f6vningar d\u00e4r eleven hoppar i lika steg och kopplar till multiplikation' },
      { milestone: 'Matematiskt resonemang och probleml\u00f6sning', howWeAddress: 'Flerstegsordproblem d\u00e4r eleven v\u00e4ljer strategi, l\u00f6ser och f\u00f6rklarar sitt t\u00e4nkande' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till talomr\u00e5det 0\u201350 utan tiv\u00e4xling, anv\u00e4nd konkreta block f\u00f6r platsv\u00e4rde och ge enstegsuppgifter. F\u00f6r avancerade elever, ut\u00f6ka till tusental, introducera division som omv\u00e4nd multiplikation och ge flerstegsuppgifter med \u00f6verfl\u00f6dig information.',
    parentTakeaway: 'I \u00e5rskurs 2 arbetar ert barn med st\u00f6rre tal. Anv\u00e4nd mynt och sedlar f\u00f6r att visa platsv\u00e4rde. St\u00e4ll vardagsfr\u00e5gor: \u201dom vi har 47 \u00e4pplen och k\u00f6per 35 till?\u201d. Spela t\u00e4rningsspel d\u00e4r ni adderar po\u00e4ng. L\u00e5t barnet f\u00f6rklara hur det t\u00e4nker n\u00e4r det r\u00e4knar.',
    classroomIntegration: 'Siffertemat i \u00e5rskurs 2 utg\u00f6r k\u00e4rnan i matematikundervisningen: platsv\u00e4rde, r\u00e4kneoperationer och multiplikation \u00f6vas dagligen. Integration med andra \u00e4mnen sker genom datainsamling i NO och tidsber\u00e4kning i SO. Matematiskt resonemang tr\u00e4nas genom att elever f\u00f6rklarar strategier f\u00f6r varandra. Lgr22:s m\u00e5l f\u00f6r taluppfattning och probleml\u00f6sning uppfylls.',
    assessmentRubric: [
      { skill: 'Platsv\u00e4rdef\u00f6rst\u00e5else', emerging: 'identifierar tiotal och ental i tv\u00e5siffriga tal med st\u00f6d', proficient: 'delar upp tresiffriga tal i hundratal, tiotal och ental sj\u00e4lvst\u00e4ndigt', advanced: 'j\u00e4mf\u00f6r och ordnar tresiffriga tal och f\u00f6rklarar platsv\u00e4rdets roll' },
      { skill: 'Addition och subtraktion inom 100', emerging: 'l\u00f6ser uppgifter utan tiv\u00e4xling med st\u00f6d', proficient: 'l\u00f6ser uppgifter med tiv\u00e4xling sj\u00e4lvst\u00e4ndigt', advanced: 'l\u00f6ser flerstegsuppgifter och v\u00e4ljer effektiva strategier' },
      { skill: 'Matematiskt resonemang', emerging: '\u00e5terger en given l\u00f6sningsstrategi', proficient: 'f\u00f6rklarar sitt t\u00e4nkande med egna ord', advanced: 'j\u00e4mf\u00f6r olika strategier och v\u00e4rderar deras effektivitet' },
    ],
  },

  ocean: {
    seoTitle: 'Gratis Havs\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara havs\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Havsdjur, m\u00e4tning, datatolkning och informationstexter om havet. 33 generatorer. Gratis PDF.',
    seoKeywords: 'havs\u00f6vningar \u00e5rskurs 2, havsdjur 7\u20138 \u00e5r, m\u00e4tning djup, datatolkning stapeldiagram, informationstexter havet, Lgr22 NO, n\u00e4ringskedja hav, multiplikation, klassificering, koralrev',
    snippetAnswer: 'Havs\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar m\u00e4tning och j\u00e4mf\u00f6relse av havsdjur, datatolkning med stapeldiagram, klassificering av marina organismer och l\u00e4sf\u00f6rst\u00e5else om havsmilj\u00f6er. Flerstegsuppgifter och multiplikation ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 utforskas havet genom matematik och naturvetenskap. Sju- och \u00e5tta\u00e5ringar m\u00e4ter och j\u00e4mf\u00f6r havsdjurs storlek i centimeter och meter, organiserar data i stapeldiagram och tolkar resultat. N\u00e4ringskedjor i havet studeras: plankton, sm\u00e5fisk, st\u00f6rre rovdjur. Klassificering sker med flera kriterier: ryggradsl\u00f6sa kontra ryggradsdjur, livsmilj\u00f6. Multiplikation \u00f6vas: \u201dom 6 bj\u00e4ckf\u00e4llvalar har 4 fenor var\u201d. Informationstexter om koralrev och havsmilj\u00f6er l\u00e4ses med fokus p\u00e5 huvudid\u00e9 och detaljer. Lgr22 betonar ekologisk f\u00f6rst\u00e5else och datahantering.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning och j\u00e4mf\u00f6relse i cm och m', howWeAddress: 'Eleverna j\u00e4mf\u00f6r havsdjurs storlek, m\u00e4ter l\u00e4ngder och dokumenterar i tabeller med standardenheter' },
      { milestone: 'Datatolkning fr\u00e5n stapeldiagram och tabeller', howWeAddress: 'Diagram\u00f6vningar d\u00e4r eleven l\u00e4ser av, j\u00e4mf\u00f6r och besvarar fr\u00e5gor om havsdata' },
      { milestone: 'N\u00e4ringskedjor och ekosystemf\u00f6rst\u00e5else', howWeAddress: 'Sorterings\u00f6vningar d\u00e4r eleven ordnar marina organismer i n\u00e4ringskedjor fr\u00e5n plankton till toppredator' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else med fokus p\u00e5 huvudid\u00e9 och detaljer', howWeAddress: 'Informationstexter om havsmilj\u00f6er d\u00e4r eleven identifierar huvudid\u00e9 och st\u00f6djande detaljer fr\u00e5n flera stycken' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd bildbaserade j\u00e4mf\u00f6relser med f\u00e4rre djur, ge f\u00f6rfyllda diagrammallar och korta texter med bildst\u00f6d. F\u00f6r avancerade elever, introducera m\u00e4tning i meter och kilometer, l\u00e5t eleven skapa egna n\u00e4ringsv\u00e4var och ge l\u00e4ngre texter med inferensfr\u00e5gor.',
    parentTakeaway: 'I \u00e5rskurs 2 f\u00f6rst\u00e5r barnet ekosystem. Titta p\u00e5 havsdokument\u00e4rer och diskutera n\u00e4ringskedjor: vem \u00e4ter vem? J\u00e4mf\u00f6r storlekar: hur l\u00e5ng \u00e4r en bl\u00e5val j\u00e4mf\u00f6rt med er bil? Bes\u00f6k ett akvarium och l\u00e5t barnet dokumentera vad det ser. Skapa diagram \u00f6ver favorithavsdjur.',
    classroomIntegration: 'Havstemat i \u00e5rskurs 2 integrerar NO, matematik och svenska: i NO studeras marina ekosystem och n\u00e4ringskedjor, i matematik \u00f6vas m\u00e4tning och datapresentation med havsdata. I svenska l\u00e4ses faktatexter och eleverna skriver egna havsdj\u00f6rbeskrivningar. Lgr22:s m\u00e5l f\u00f6r ekologisk f\u00f6rst\u00e5else och datahantering uppfylls.',
    assessmentRubric: [
      { skill: 'M\u00e4tning och j\u00e4mf\u00f6relse', emerging: 'j\u00e4mf\u00f6r storlekar visuellt med st\u00f6d', proficient: 'm\u00e4ter och j\u00e4mf\u00f6r i cm och m sj\u00e4lvst\u00e4ndigt', advanced: 'uppskattar m\u00e5tt, v\u00e4xlar enheter och analyserar storleksdata' },
      { skill: 'Ekosystem och n\u00e4ringskedjor', emerging: 'namnger tv\u00e5 led i en n\u00e4ringskedja med st\u00f6d', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt organismer i en fullst\u00e4ndig n\u00e4ringskedja', advanced: 'f\u00f6rklarar konsekvenser om en art f\u00f6rsvinner ur kedjan' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else av informationstexter', emerging: '\u00e5terger enstaka fakta med st\u00f6d', proficient: 'identifierar huvudid\u00e9 och detaljer i fleravstyckestexter', advanced: 'sammanfattar och drar slutsatser fr\u00e5n flera texter' },
    ],
  },

  pets: {
    seoTitle: 'Gratis Husdjurs\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara husdjurs\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). V\u00e4gning, datainsamling, ansvarsplanering och ber\u00e4ttande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'husdjurs\u00f6vningar \u00e5rskurs 2, v\u00e4gning kg 7\u20138 \u00e5r, datainsamling husdjur, ber\u00e4ttande skrivning, Lgr22, flerstegsuppgifter, pengaber\u00e4kning, schema, ansvar husdjur, multiplikation',
    snippetAnswer: 'Husdjurs\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar v\u00e4gning i kilogram, datainsamling med diagram, pengaber\u00e4kning f\u00f6r husdjurssk\u00f6tsel och ber\u00e4ttande skrivning om husdjursupplevelser. Ansvarsplanering och flerstegsuppgifter ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar husdjurstemat matematik till ansvar och omsorg. Sju- och \u00e5tta\u00e5ringar v\u00e4ger husdjur i kilogram, j\u00e4mf\u00f6r vikter och dokumenterar tillv\u00e4xt \u00f6ver tid. Pengaber\u00e4kning \u00f6vas: \u201dhur mycket kostar mat och veterinn\u00e4rbes\u00f6k per m\u00e5nad?\u201d. Multiplikation anv\u00e4nds: \u201dom 3 katter \u00e4ter 2 portioner per dag\u201d. Schemaplanering tr\u00e4nar klockan: utfodring, rastning, sk\u00f6tsel. Eleverna l\u00e4ser faktatexter om husdjursbehov och skriver ber\u00e4ttelser om husdjursupplevelser med styckestruktur. Lgr22 betonar m\u00e4tning, ekonomiskt t\u00e4nkande och ansvarskk\u00e4nsla.',
    developmentalMilestones: [
      { milestone: 'V\u00e4gning och j\u00e4mf\u00f6relse i kilogram', howWeAddress: 'Eleverna v\u00e4ger och j\u00e4mf\u00f6r husdjur, dokumenterar vikter i tabeller och ber\u00e4knar skillnader' },
      { milestone: 'Pengaber\u00e4kning i vardagssammanhang', howWeAddress: 'Budget\u00f6vningar d\u00e4r eleven ber\u00e4knar kostnader f\u00f6r husdjursmat, leksaker och veterinn\u00e4r' },
      { milestone: 'Tidsplanering och schemahantering', howWeAddress: 'Schemauppgifter d\u00e4r eleven planerar en husdjurs\u00e4gares dag med utfodring, rastning och sk\u00f6tsel' },
      { milestone: 'Ber\u00e4ttande skrivning med styckestruktur', howWeAddress: 'Eleverna skriver ber\u00e4ttelser om husdjursupplevelser med inledning, h\u00e4ndelsef\u00f6rlopp och avslutning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd j\u00e4mna kilogramv\u00e4rden, ge pengauppgifter med j\u00e4mna kronbelopp och skrivmallar med f\u00e4rdiga meningsinledningar. F\u00f6r avancerade elever, introducera gram och decimalv\u00e4rden, l\u00e5t eleven planera en m\u00e5nadsbudget och skriv l\u00e4ngre ber\u00e4ttelser med dialoger.',
    parentTakeaway: 'I \u00e5rskurs 2 kan husdjur bli ett l\u00e4randeprojekt. V\u00e4g husdjuret och f\u00f6lj tillv\u00e4xten. L\u00e5t barnet hj\u00e4lpa till med ink\u00f6pslistan f\u00f6r husdjursmat och ber\u00e4kna kostnaden. G\u00f6r ett schema f\u00f6r utfodring och rastning. Skriv tillsammans om husdjuret: hur det ser ut, vad det gillar att g\u00f6ra.',
    classroomIntegration: 'Husdjurstemat i \u00e5rskurs 2 integrerar matematik, NO och svenska: i matematik \u00f6vas v\u00e4gning, pengar och multiplikation genom husdjursscenarier. I NO diskuteras djurs behov och ansvar. I svenska skrivs ber\u00e4ttelser och faktatexter om husdjur. Lgr22:s m\u00e5l f\u00f6r m\u00e4tning, ekonomi och skrivutveckling uppfylls.',
    assessmentRubric: [
      { skill: 'V\u00e4gning och j\u00e4mf\u00f6relse', emerging: 'j\u00e4mf\u00f6r tyngd visuellt med st\u00f6d', proficient: 'v\u00e4ger i kg och j\u00e4mf\u00f6r vikter sj\u00e4lvst\u00e4ndigt', advanced: 'ber\u00e4knar viktskillnader och uppskattar vikt innan v\u00e4gning' },
      { skill: 'Pengaber\u00e4kning och budget', emerging: 'adderar j\u00e4mna kronbelopp med st\u00f6d', proficient: 'ber\u00e4knar kostnader med kronor och \u00f6ren sj\u00e4lvst\u00e4ndigt', advanced: 'planerar m\u00e5nadsbudget och j\u00e4mf\u00f6r alternativ' },
      { skill: 'Ber\u00e4ttande skrivning', emerging: 'skriver enstaka meningar om ett husdjur', proficient: 'skriver organiserade ber\u00e4ttelser med inledning och avslutning', advanced: 'skriver detaljerade ber\u00e4ttelser med dialoger och k\u00e4nslor' },
    ],
  },

  pirates: {
    seoTitle: 'Gratis Pirat\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara pirat\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Kartkoordinater, pengaber\u00e4kning, flerstegsuppgifter och \u00e4ventyrsskrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'pirat\u00f6vningar \u00e5rskurs 2, kartkoordinater 7\u20138 \u00e5r, skattjakt matematik, pengaber\u00e4kning kronor, \u00e4ventyrsskrivning, Lgr22, multiplikation, flerstegsuppgifter, kompassriktningar, probleml\u00f6sning',
    snippetAnswer: 'Pirat\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar kartkoordinater och kompassriktningar, pengaber\u00e4kning med kronor, multiplikation i piratkontext och \u00e4ventyrsskrivning med styckestruktur. Flerstegsuppgifter och probleml\u00f6sning ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 anv\u00e4nds pirattemat f\u00f6r att introducera rumsligt t\u00e4nkande och ekonomi. Sju- och \u00e5tta\u00e5ringar arbetar med kartkoordinater och kompassriktningar f\u00f6r att navigera skattkarter. Pengaber\u00e4kning med kronor och \u00f6ren sker i handelsscenarier: k\u00f6pa f\u00f6rn\u00f6denheter, f\u00f6rdela skatten. Multiplikation \u00f6vas: \u201dom 5 pirater f\u00e5r 4 guldmynt var\u201d. Flerstegsordproblem kombinerar addition, subtraktion och j\u00e4mf\u00f6relse. Eleverna skriver \u00e4ventyrber\u00e4ttelser med styckestruktur och logisk h\u00e4ndelsef\u00f6ljd. Lgr22 betonar rumslig orientering, ekonomiskt t\u00e4nkande och ber\u00e4ttande skrivning.',
    developmentalMilestones: [
      { milestone: 'Kartkoordinater och kompassriktningar', howWeAddress: 'Skattkarts\u00f6vningar d\u00e4r eleven navigerar med koordinater, kompassriktningar och steg\u00e4nvisningar' },
      { milestone: 'Pengaber\u00e4kning med kronor och \u00f6ren', howWeAddress: 'Handelsscenarier d\u00e4r eleven k\u00f6per piratf\u00f6rn\u00f6denheter, ber\u00e4knar total kostnad och v\u00e4xel' },
      { milestone: 'Flerstegsordproblem med flera operationer', howWeAddress: 'Pirat\u00e4ventyr d\u00e4r eleven l\u00f6ser tvstegsuppgifter som kombinerar addition, subtraktion och multiplikation' },
      { milestone: '\u00c4ventyrsskrivning med logisk h\u00e4ndelsef\u00f6ljd', howWeAddress: 'Eleverna skriver piratber\u00e4ttelser med inledning, problem, l\u00f6sning och avslutning i organiserade stycken' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd f\u00f6renklade kartor med f\u00e4rre rutor, j\u00e4mna kronbelopp och enstegsuppgifter med bildst\u00f6d. F\u00f6r avancerade elever, ut\u00f6ka till komplexa koordinater, l\u00e5t eleven designa egna skattkarter med instruktioner och skriv l\u00e4ngre \u00e4ventyr med bikaraktrer och plottvndningar.',
    parentTakeaway: 'I \u00e5rskurs 2 \u00e4lskar barn \u00e4ventyr. G\u00f6r en skattjakt hemma med ledtr\u00e5dar som inneh\u00e5ller matematikuppgifter. L\u00e5t barnet rita en karta med kompassriktningar. \u00d6va pengaber\u00e4kning genom att \u201dk\u00f6pa och s\u00e4lja\u201d piratf\u00f6rem\u00e5l. Skriv en piratber\u00e4ttelse tillsammans d\u00e4r barnet best\u00e4mmer handlingen.',
    classroomIntegration: 'Pirattemat i \u00e5rskurs 2 integrerar matematik, SO och svenska: i matematik \u00f6vas koordinater, pengar och multiplikation. I SO diskuteras kartor, kompassriktningar och handel. I svenska skrivs \u00e4ventyrber\u00e4ttelser och l\u00e4ses spknnande texter. Lgr22:s m\u00e5l f\u00f6r rumslig orientering och ber\u00e4ttande skrivning uppfylls.',
    assessmentRubric: [
      { skill: 'Kartkoordinater och orientering', emerging: 'f\u00f6ljer enkla v\u00e4gbeskrivningar med st\u00f6d', proficient: 'navigerar sj\u00e4lvst\u00e4ndigt med koordinater och kompassriktningar', advanced: 'skapar egna kartor med koordinatsystem och instruktioner' },
      { skill: 'Pengaber\u00e4kning', emerging: 'adderar j\u00e4mna kronbelopp med st\u00f6d', proficient: 'ber\u00e4knar totalkostnad och v\u00e4xel med kronor och \u00f6ren', advanced: 'l\u00f6ser komplexa handelsscenarier med begr\u00e4nsad budget' },
      { skill: '\u00c4ventyrsskrivning', emerging: 'skriver enstaka meningar om en pirath\u00e4ndelse', proficient: 'skriver organiserade ber\u00e4ttelser med inledning, problem och l\u00f6sning', advanced: 'skriver detaljerade \u00e4ventyr med dialoger och karaktarsutveckling' },
    ],
  },

  robots: {
    seoTitle: 'Gratis Robot\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara robot\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Algoritmiskt t\u00e4nkande, geometri, multiplikation och instruktionstskrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'robot\u00f6vningar \u00e5rskurs 2, algoritmiskt t\u00e4nkande 7\u20138 \u00e5r, programmering utan dator, geometri robotar, instruktionstskrivning, Lgr22 teknik, multiplikation, sekvensering, stegvisa instruktioner, probleml\u00f6sning',
    snippetAnswer: 'Robot\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar algoritmiskt t\u00e4nkande, geometriska former i robotdesign, multiplikation och instruktionstskrivning med stegvisa anvisningar. Sekvensering och fels\u00f6kning ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 f\u00f6rdjupas robottemat till algoritmiskt t\u00e4nkande. Sju- och \u00e5tta\u00e5ringar skriver flerstegsalgoritmmer med villkor: \u201dom v\u00e4ggen \u00e4r framf\u00f6r, sv\u00e4ng h\u00f6ger\u201d. Geometriska former anv\u00e4nds i robotdesign: rektanglar, cirklar, trianglar med m\u00e5ttangivelser i cm. Multiplikation \u00f6vas: \u201dom 4 robotar har 3 sensorer var\u201d. Fels\u00f6kning tr\u00e4nar kritiskt t\u00e4nkande n\u00e4r eleven hittar och korrigerar fel i en sekvens. Instruktionstskrivning kr\u00e4ver logisk ordning och precist spr\u00e5k. Lgr22 betonar digital kompetens, algoritmiskt t\u00e4nkande och teknisk probleml\u00f6sning.',
    developmentalMilestones: [
      { milestone: 'Algoritmiskt t\u00e4nkande med villkor', howWeAddress: 'Programmerings\u00f6vningar utan dator d\u00e4r eleven skriver algoritmer med om-d\u00e5-villkor f\u00f6r robotnavigering' },
      { milestone: 'Geometriska former med m\u00e5tt', howWeAddress: 'Robotdesign\u00f6vningar d\u00e4r eleven kombinerar former och anger m\u00e5tt i cm f\u00f6r kroppsdelar' },
      { milestone: 'Fels\u00f6kning och korrigering av sekvenser', howWeAddress: '\u00d6vningar d\u00e4r eleven identifierar och r\u00e4ttar fel i robotinstruktioner och f\u00f6rklarar korrigeringen' },
      { milestone: 'Instruktionstskrivning med stegvisa anvisningar', howWeAddress: 'Eleverna skriver tydliga steg-f\u00f6r-steg-instruktioner f\u00f6r hur en robot utf\u00f6r en uppgift' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd f\u00e4rre steg i algoritmer, ge bildbaserade sekvenser och f\u00f6renklade former utan m\u00e5tt. F\u00f6r avancerade elever, introducera villkor med tv\u00e5 alternativ, l\u00e5t eleven designa komplexa robotar med exakta m\u00e5tt och skriva algoritmer med loopar.',
    parentTakeaway: 'I \u00e5rskurs 2 utvecklar barnet logiskt t\u00e4nkande. Lek \u201drobotleken\u201d d\u00e4r barnet ger er steg-f\u00f6r-steg-instruktioner. Bygg robotar av \u00e5tervinningsmaterial och m\u00e4t delarna i cm. Diskutera: varf\u00f6r m\u00e5ste instruktioner vara exakta? Prova enkel programmering online tillsammans.',
    classroomIntegration: 'Robottemat i \u00e5rskurs 2 integrerar teknik, matematik och svenska: i teknik \u00f6vas algoritmiskt t\u00e4nkande och fels\u00f6kning, i matematik anv\u00e4nds geometri och multiplikation. I svenska skrivs instruktionstexter och tekniska beskrivningar. Lgr22:s m\u00e5l f\u00f6r digital kompetens och probleml\u00f6sning uppfylls.',
    assessmentRubric: [
      { skill: 'Algoritmiskt t\u00e4nkande', emerging: 'f\u00f6ljer en given trestegsalgoritm med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt algoritmer med villkor f\u00f6r robotnavigering', advanced: 'skapar algoritmer med loopar och fels\u00f6ker andras l\u00f6sningar' },
      { skill: 'Geometri i design', emerging: 'identifierar grundl\u00e4ggande former i en robotbild', proficient: 'kombinerar former och anger m\u00e5tt i cm sj\u00e4lvst\u00e4ndigt', advanced: 'designar komplexa robotar med exakta proportioner och symmetri' },
      { skill: 'Instruktionstskrivning', emerging: 'skriver enstaka steg med st\u00f6d', proficient: 'skriver logiskt ordnade steg-f\u00f6r-steg-instruktioner', advanced: 'skriver detaljerade instruktioner med villkor och alternativa v\u00e4gar' },
    ],
  },

  school: {
    seoTitle: 'Gratis Skol\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara skol\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Schemaplanering, tidsber\u00e4kning, datainsamling och ber\u00e4ttande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'skol\u00f6vningar \u00e5rskurs 2, schema tid 7\u20138 \u00e5r, datainsamling klass, ber\u00e4ttande skrivning skola, Lgr22, klockan, stapeldiagram, flerstegsuppgifter, multiplikation, klassrumssituation',
    snippetAnswer: 'Skol\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar schemaplanering med klockan, datainsamling fr\u00e5n klassrummet i stapeldiagram, flerstegsuppgifter i skolkontext och ber\u00e4ttande skrivning om skolupplevelser. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 anv\u00e4nds skoltemat f\u00f6r att tr\u00e4na f\u00e4rdigheter i elevens egen vardag. Sju- och \u00e5tta\u00e5ringar l\u00e4ser skolschemat med klockan, ber\u00e4knar lektionsl\u00e4ngder och rasttider. Datainsamling fr\u00e5n klassen presenteras i stapeldiagram: favoritmat, favoritbok, skol\u00e4mnen. Multiplikation \u00f6vas: \u201dom 5 bord har 4 stolar var\u201d. Flerstegsuppgifter kombinerar tid och antal. Eleverna skriver ber\u00e4ttelser om skoldagen med styckestruktur och tidsmarkeringar. Lgr22 betonar att matematik och spr\u00e5k ska vara relevanta f\u00f6r elevens vardag.',
    developmentalMilestones: [
      { milestone: 'L\u00e4sa schema och ber\u00e4kna tidsintervall', howWeAddress: 'Schema\u00f6vningar d\u00e4r eleven l\u00e4ser av lektionstider, ber\u00e4knar lektionsl\u00e4ngd och rasttid' },
      { milestone: 'Datainsamling och presentation i diagram', howWeAddress: 'Klassenk\u00e4ter d\u00e4r eleven samlar data fr\u00e5n klasskamrater och presenterar i stapeldiagram' },
      { milestone: 'Flerstegsuppgifter i vardagskontext', howWeAddress: 'Skolscenarier d\u00e4r eleven l\u00f6ser tvstegsuppgifter med tid, antal och pengar' },
      { milestone: 'Ber\u00e4ttande skrivning om vardagsupplevelser', howWeAddress: 'Eleverna skriver om skoldagen med inledning, h\u00e4ndelser i kronologisk ordning och reflektion' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med heltimmar, ge f\u00f6rfyllda diagrammallar och skrivmallar med meningsstarters. F\u00f6r avancerade elever, l\u00e5t eleven planera ett helt schema, skapa enk\u00e4ter och analysera data statistiskt och skriv l\u00e4ngre skolber\u00e4ttelser med dialoger.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet l\u00e4sa klockan och f\u00f6lja ett schema. Titta p\u00e5 skolschemat tillsammans och ber\u00e4kna: hur l\u00e5ng \u00e4r mattelektionen? G\u00f6r enk\u00e4ter hemma: favoritfilm, favoritmat. L\u00e5t barnet skriva om sin dag i skolan. Fr\u00e5ga: vad h\u00e4nde f\u00f6rst, sedan, sist?',
    classroomIntegration: 'Skoltemat i \u00e5rskurs 2 \u00e4r naturligt \u00e4mnes\u00f6vergripande: i matematik \u00f6vas tid och datahantering med klassrumsdata, i svenska skrivs ber\u00e4ttelser och enk\u00e4tresultat presenteras. Elevn\u00e4ra kontext \u00f6kar motivationen. Lgr22:s m\u00e5l f\u00f6r tid, datahantering och vardagsrelevant matematik uppfylls.',
    assessmentRubric: [
      { skill: 'Schema och tidsber\u00e4kning', emerging: 'l\u00e4ser av heltimmar p\u00e5 schemat med st\u00f6d', proficient: 'ber\u00e4knar lektionsl\u00e4ngder och rasttider sj\u00e4lvst\u00e4ndigt', advanced: 'planerar egna scheman och optimerar tidsf\u00f6rdelning' },
      { skill: 'Datainsamling och diagram', emerging: 'fyller i f\u00f6rgjord tabell med st\u00f6d', proficient: 'samlar data sj\u00e4lvst\u00e4ndigt och skapar stapeldiagram', advanced: 'analyserar data, drar slutsatser och presenterar resultat muntligt' },
      { skill: 'Ber\u00e4ttande skrivning', emerging: 'skriver enstaka meningar om skoldagen', proficient: 'skriver kronologiska ber\u00e4ttelser med styckestruktur', advanced: 'skriver detaljerade ber\u00e4ttelser med dialoger och reflektioner' },
    ],
  },

  seasons: {
    seoTitle: 'Gratis \u00c5rstids\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara \u00e5rstids\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Temperaturm\u00e4tning, dataj\u00e4mf\u00f6relse, \u00e5rscykel och beskrivande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: '\u00e5rstids\u00f6vningar \u00e5rskurs 2, temperatur 7\u20138 \u00e5r, dataj\u00e4mf\u00f6relse \u00e5rstider, \u00e5rscykel, beskrivande skrivning, Lgr22 NO, stapeldiagram, m\u00e4tning, naturf\u00f6r\u00e4ndringar, kalenderm\u00e5nader',
    snippetAnswer: '\u00c5rstids\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar temperaturm\u00e4tning och dataj\u00e4mf\u00f6relse mellan \u00e5rstider, stapeldiagram, kalenderm\u00e5nader och beskrivande skrivning om naturf\u00f6r\u00e4ndringar. Flerstegsuppgifter och klassificering ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplas \u00e5rstidstemat till systematisk datainsamling. Sju- och \u00e5tta\u00e5ringar m\u00e4ter temperatur, dokumenterar v\u00e4derdata \u00f6ver veckor och j\u00e4mf\u00f6r \u00e5rstider i stapeldiagram. Kalenderm\u00e5nader kopplas till \u00e5rstidscykeln. Klassificering sker: vilka djur \u00e4r aktiva vilken \u00e5rstid, vilka v\u00e4xter blommar n\u00e4r? Multiplikation \u00f6vas: \u201dom 4 tr\u00e4d tappar 5 l\u00f6v var per dag\u201d. Eleverna l\u00e4ser informationstexter om \u00e5rstidsv\u00e4xlingar och skriver beskrivande stycken med sinnesdetaljer. Lgr22 betonar systematisk observation, datahantering och naturkunskap.',
    developmentalMilestones: [
      { milestone: 'Temperaturm\u00e4tning och datadokumentation', howWeAddress: 'Eleverna m\u00e4ter daglig temperatur, dokumenterar i tabeller och j\u00e4mf\u00f6r mellan veckor och \u00e5rstider' },
      { milestone: 'Dataj\u00e4mf\u00f6relse och presentation i diagram', howWeAddress: 'Stapeldiagram d\u00e4r eleven j\u00e4mf\u00f6r v\u00e4derdata, dagl\u00e4ngd och naturf\u00f6r\u00e4ndringar mellan \u00e5rstider' },
      { milestone: 'Klassificering av naturf\u00f6r\u00e4ndringar efter \u00e5rstid', howWeAddress: 'Sorteringsuppgifter d\u00e4r eleven kopplar djurs beteende, v\u00e4xters cykel och v\u00e4der till r\u00e4tt \u00e5rstid' },
      { milestone: 'Beskrivande skrivning med sinnesdetaljer', howWeAddress: 'Eleverna skriver om sin favorit\u00e5rstid med detaljer om syn, h\u00f6rsel, k\u00e4nsla och doft' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd bildkort f\u00f6r \u00e5rstidssortering, ge f\u00f6rgjorda diagram och skrivmallar med sinnesord. F\u00f6r avancerade elever, l\u00e5t eleven j\u00e4mf\u00f6ra v\u00e4derdata mellan olika \u00e5r, skapa egna diagram och skriva j\u00e4mf\u00f6rande texter om tv\u00e5 \u00e5rstider.',
    parentTakeaway: 'I \u00e5rskurs 2 kan barnet observera systematiskt. H\u00e4ng en termometer utanf\u00f6r f\u00f6nstret och l\u00e5t barnet skriva ner temperaturen dagligen. J\u00e4mf\u00f6r veckor: \u00e4r det varmare nu \u00e4n f\u00f6rra veckan? G\u00e5 p\u00e5 naturpromenader varje \u00e5rstid och dokumentera f\u00f6r\u00e4ndringar. Skriv om favorit\u00e5rstiden.',
    classroomIntegration: '\u00c5rstidstemat i \u00e5rskurs 2 integrerar NO, matematik och svenska: i NO studeras \u00e5rstidsv\u00e4xlingar och naturf\u00f6r\u00e4ndringar, i matematik \u00f6vas m\u00e4tning, datahantering och kalendern. I svenska skrivs beskrivande texter. Utomhuspedagogik med regelbunden observation \u00f6ver terminen f\u00f6rst\u00e4rker l\u00e4randet. Lgr22:s m\u00e5l f\u00f6r systematisk observation uppfylls.',
    assessmentRubric: [
      { skill: 'Temperaturm\u00e4tning och data', emerging: 'l\u00e4ser av termometer med st\u00f6d', proficient: 'm\u00e4ter och dokumenterar temperatur sj\u00e4lvst\u00e4ndigt i tabeller', advanced: 'j\u00e4mf\u00f6r data \u00f6ver tid och identifierar m\u00f6nster' },
      { skill: '\u00c5rstidsklassificering', emerging: 'kopplar enkla bilder till r\u00e4tt \u00e5rstid med st\u00f6d', proficient: 'klassificerar sj\u00e4lvst\u00e4ndigt djur, v\u00e4xter och v\u00e4der efter \u00e5rstid', advanced: 'f\u00f6rklarar orsaker till \u00e5rstidsv\u00e4xlingar och samband mellan fenomen' },
      { skill: 'Beskrivande skrivning', emerging: 'skriver enstaka meningar om en \u00e5rstid', proficient: 'skriver organiserade stycken med sinnesdetaljer', advanced: 'j\u00e4mf\u00f6r tv\u00e5 \u00e5rstider i fleravstyckestexter med rik spr\u00e5kanv\u00e4ndning' },
    ],
  },

  shapes: {
    seoTitle: 'Gratis Form\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara form\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Geometriska egenskaper, symmetri, m\u00e4tning av sidor och formber\u00e4kningar. 33 generatorer. Gratis PDF.',
    seoKeywords: 'form\u00f6vningar \u00e5rskurs 2, geometri 7\u20138 \u00e5r, symmetri former, m\u00e4tning sidor cm, formegenskaper, Lgr22 matematik, h\u00f6rn sidor, tredimensionella former, m\u00f6nster, omkrets',
    snippetAnswer: 'Form\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar geometriska egenskaper som h\u00f6rn och sidor, symmetri, m\u00e4tning av sidor i cm och introduktion till omkrets. Tredimensionella former och m\u00f6nster med former ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 f\u00f6rdjupas geometriarbetet bortom igenkanning. Sju- och \u00e5tta\u00e5ringar analyserar formers egenskaper: antal h\u00f6rn, sidor, parallella sidor och r\u00e4ta vinklar. Symmetri utforskas genom att vika och rita spegelbilder. Sidor m\u00e4ts i centimeter och omkrets ber\u00e4knas genom addition. Tredimensionella former kopplas till tv\u00e5dimensionella: en kub har sex kvadratiska ytor. M\u00f6nster med former skapas och f\u00f6rl\u00e4ngs. Eleverna beskriver former med korrekt matematiskt spr\u00e5k. Lgr22 betonar geometriskt resonemang och f\u00f6rm\u00e5ga att beskriva formers egenskaper.',
    developmentalMilestones: [
      { milestone: 'Analysera formers egenskaper: h\u00f6rn, sidor, vinklar', howWeAddress: '\u00d6vningar d\u00e4r eleven r\u00e4knar h\u00f6rn och sidor, identifierar parallella sidor och r\u00e4ta vinklar i olika former' },
      { milestone: 'Symmetri och spegelbilder', howWeAddress: 'Vik\u00f6vningar och rituppgifter d\u00e4r eleven skapar och identifierar symmetrilinjer i geometriska former' },
      { milestone: 'M\u00e4tning av sidor och ber\u00e4kning av omkrets', howWeAddress: 'Eleverna m\u00e4ter formers sidor i cm med linjal och adderar f\u00f6r att ber\u00e4kna omkrets' },
      { milestone: 'Koppla 2D- och 3D-former', howWeAddress: '\u00d6vningar d\u00e4r eleven identifierar vilka 2D-former som bildar ytorna p\u00e5 3D-former som kuber och cylindrar' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med grundformer (cirkel, triangel, kvadrat, rektangel), anv\u00e4nd konkreta formblock och ge st\u00f6d vid m\u00e4tning. F\u00f6r avancerade elever, introducera sexh\u00f6rningar och andra polygoner, l\u00e5t eleven ber\u00e4kna omkrets f\u00f6r oregelbundna former och utforska area som koncept.',
    parentTakeaway: 'I \u00e5rskurs 2 ser barnet geometri \u00f6verallt. G\u00e5 p\u00e5 formjakt i hemmet: vilka former har f\u00f6nstren, borden, tallrikarna? M\u00e4t f\u00f6rem\u00e5l med linjal. Diskutera symmetri: \u00e4r en fj\u00e4ril symmetrisk? Bygg med klossar och prata om 3D-former: kub, cylinder, sf\u00e4r.',
    classroomIntegration: 'Formtemat i \u00e5rskurs 2 integrerar matematik och bild: geometriska egenskaper analyseras och m\u00e4ts, symmetri utforskas genom konst och 3D-former kopplas till NO och teknik. M\u00f6nster med former st\u00e4rker algebraiskt t\u00e4nkande. Lgr22:s m\u00e5l f\u00f6r geometriskt resonemang och formbeskrivning uppfylls.',
    assessmentRubric: [
      { skill: 'Formegenskaper och analys', emerging: 'namnger grundformer och r\u00e4knar sidor med st\u00f6d', proficient: 'analyserar sj\u00e4lvst\u00e4ndigt h\u00f6rn, sidor och vinklar', advanced: 'j\u00e4mf\u00f6r formers egenskaper och klassificerar polygoner' },
      { skill: 'Symmetri', emerging: 'identifierar symmetri i enkla former med st\u00f6d', proficient: 'ritar spegelbilder och identifierar symmetrilinjer sj\u00e4lvst\u00e4ndigt', advanced: 'hittar multipla symmetrilinjer och skapar komplexa symmetriska m\u00f6nster' },
      { skill: 'M\u00e4tning och omkrets', emerging: 'm\u00e4ter sidor med st\u00f6d', proficient: 'm\u00e4ter sidor i cm och ber\u00e4knar omkrets genom addition', advanced: 'ber\u00e4knar omkrets f\u00f6r oregelbundna former och uppskattar m\u00e5tt' },
    ],
  },

  space: {
    seoTitle: 'Gratis Rymd\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara rymd\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Planetdata, stora tal, j\u00e4mf\u00f6relse och informationstexter om rymden. 33 generatorer. Gratis PDF.',
    seoKeywords: 'rymd\u00f6vningar \u00e5rskurs 2, planeter 7\u20138 \u00e5r, stora tal j\u00e4mf\u00f6relse, planetdata diagram, informationstexter rymden, Lgr22 NO, solsystemet, multiplikation, datatolkning, astronomifakta',
    snippetAnswer: 'Rymd\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar arbete med stora tal, j\u00e4mf\u00f6relse av planetdata, datatolkning i diagram och l\u00e4sf\u00f6rst\u00e5else av informationstexter om solsystemet. Multiplikation och flerstegsuppgifter ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 inspirerar rymdtemat till arbete med stora tal och datatolkning. Sju- och \u00e5tta\u00e5ringar j\u00e4mf\u00f6r planeters storlek och avst\u00e5nd, ordnar planeter efter egenskaper och presenterar data i stapeldiagram. Platsv\u00e4rde ut\u00f6kas: tusental beh\u00f6vs f\u00f6r rymdavst\u00e5nd. Multiplikation \u00f6vas: \u201dom raketen f\u00e4rdas 3 km per sekund, hur l\u00e5ngt p\u00e5 5 sekunder?\u201d. Informationstexter om planeter och rymdfenomen l\u00e4ses med fokus p\u00e5 huvudid\u00e9. Eleverna skriver faktastycken om sin favoritplanet. Lgr22 betonar naturvetenskaplig nyfikenhet och f\u00f6rm\u00e5ga att tolka data.',
    developmentalMilestones: [
      { milestone: 'Arbete med stora tal och platsv\u00e4rde', howWeAddress: 'Planet\u00f6vningar d\u00e4r eleven j\u00e4mf\u00f6r och ordnar tresiffriga och fyrsiffriga tal i rymdkontext' },
      { milestone: 'Datatolkning och presentation i diagram', howWeAddress: 'Stapeldiagram \u00f6ver planetdata d\u00e4r eleven l\u00e4ser av, j\u00e4mf\u00f6r och besvarar fr\u00e5gor' },
      { milestone: 'Multiplikation i naturvetenskaplig kontext', howWeAddress: 'Rymdber\u00e4kningar d\u00e4r eleven anv\u00e4nder multiplikation f\u00f6r att ber\u00e4kna avst\u00e5nd och m\u00e4ngder' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av informationstexter med facktermer', howWeAddress: 'Planetfaktatexter d\u00e4r eleven identifierar huvudid\u00e9, l\u00e4r sig facktermer och sammanfattar' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tresiffriga tal, ge f\u00f6rgjorda diagram och korta faktameningar. F\u00f6r avancerade elever, arbeta med femsiffriga tal, l\u00e5t eleven skapa egna planetjm\u00e4f\u00f6relser i diagram och skriva fleravstyckestexter med facktermer.',
    parentTakeaway: 'I \u00e5rskurs 2 fascineras barn av rymden. Titta p\u00e5 planeter i b\u00f6cker eller online och j\u00e4mf\u00f6r storlekar. Anv\u00e4nd frukt f\u00f6r att visa skala: vattenmelon f\u00f6r Jupiter, vindruva f\u00f6r Jorden. Diskutera stora tal: hur l\u00e5ngt \u00e4r det till m\u00e5nen? L\u00e5t barnet skriva om sin favoritplanet.',
    classroomIntegration: 'Rymdtemat i \u00e5rskurs 2 integrerar NO, matematik och svenska: i NO studeras solsystemet och rymdfenomen, i matematik \u00f6vas stora tal, datatolkning och multiplikation. I svenska l\u00e4ses faktatexter och eleverna skriver informationsstycken. Lgr22:s m\u00e5l f\u00f6r naturvetenskaplig kunskap och datahantering uppfylls.',
    assessmentRubric: [
      { skill: 'Stora tal och platsv\u00e4rde', emerging: 'j\u00e4mf\u00f6r tv\u00e5siffriga tal med st\u00f6d', proficient: 'ordnar och j\u00e4mf\u00f6r tresiffriga tal sj\u00e4lvst\u00e4ndigt', advanced: 'arbetar med fyrsiffriga tal och f\u00f6rklarar platsv\u00e4rdets roll' },
      { skill: 'Datatolkning', emerging: 'l\u00e4ser av enstaka v\u00e4rden i diagram med st\u00f6d', proficient: 'j\u00e4mf\u00f6r data och besvarar fr\u00e5gor om diagram sj\u00e4lvst\u00e4ndigt', advanced: 'analyserar data, identifierar m\u00f6nster och formulerar egna slutsatser' },
      { skill: 'Informationstextf\u00f6rst\u00e5else', emerging: '\u00e5terger enstaka fakta med st\u00f6d', proficient: 'identifierar huvudid\u00e9 och facktermer i fleravstyckestexter', advanced: 'sammanfattar och j\u00e4mf\u00f6r information fr\u00e5n flera texter' },
    ],
  },

  sports: {
    seoTitle: 'Gratis Sport\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara sport\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Poangber\u00e4kning, tidsm\u00e4tning, statistik och ber\u00e4ttande skrivning om idrott. 33 generatorer. Gratis PDF.',
    seoKeywords: 'sport\u00f6vningar \u00e5rskurs 2, po\u00e4ngber\u00e4kning 7\u20138 \u00e5r, tidsm\u00e4tning idrott, statistik sport, ber\u00e4ttande skrivning, Lgr22, stapeldiagram, multiplikation, flerstegsuppgifter, tabell\u00f6vningar',
    snippetAnswer: 'Sport\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar po\u00e4ngber\u00e4kning och tidm\u00e4tning, sportstatistik i stapeldiagram, multiplikation i idrottskontext och ber\u00e4ttande skrivning om t\u00e4vlingsupplevelser. Flerstegsuppgifter ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar sporttemat matematik till fysisk aktivitet och datatolkning. Sju- och \u00e5tta\u00e5ringar ber\u00e4knar po\u00e4ng med addition och multiplikation: \u201dom varje m\u00e5l ger 2 po\u00e4ng och laget g\u00f6r 4 m\u00e5l\u201d. Tidsm\u00e4tning i minuter och sekunder dokumenteras i tabeller. Sportstatistik presenteras i stapeldiagram d\u00e4r eleven l\u00e4ser av och j\u00e4mf\u00f6r resultat. Flerstegsuppgifter kombinerar tid, avst\u00e5nd och antal. Eleverna skriver ber\u00e4ttelser om t\u00e4vlingar och matcher med styckestruktur. Lgr22 betonar datahantering, tidsm\u00e4tning och r\u00f6relsegl\u00e4dje.',
    developmentalMilestones: [
      { milestone: 'Po\u00e4ngber\u00e4kning med multiplikation', howWeAddress: 'Sportscenarier d\u00e4r eleven ber\u00e4knar totalpo\u00e4ng med multiplikation och addition' },
      { milestone: 'Tidsm\u00e4tning i minuter och sekunder', howWeAddress: 'Idrotts\u00f6vningar d\u00e4r eleven m\u00e4ter tid, ber\u00e4knar skillnader och dokumenterar i tabeller' },
      { milestone: 'Statistiktolkning fr\u00e5n diagram och tabeller', howWeAddress: 'Stapeldiagram med sportresultat d\u00e4r eleven l\u00e4ser av, j\u00e4mf\u00f6r och besvarar fr\u00e5gor' },
      { milestone: 'Ber\u00e4ttande skrivning om upplevelser', howWeAddress: 'Eleverna skriver t\u00e4vlings- och matchber\u00e4ttelser med inledning, h\u00e4ndelsef\u00f6rlopp och resultat' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd enkel addition f\u00f6r po\u00e4ng, hela minuter vid tidsm\u00e4tning och ge skrivmallar. F\u00f6r avancerade elever, introducera medelvr\u00e4kning, l\u00e5t eleven skapa egna statistiktabeller och skriv matchreferat med detaljerade beskrivningar.',
    parentTakeaway: 'I \u00e5rskurs 2 kan idrott bli matematik. R\u00e4kna po\u00e4ng vid sportmatcher p\u00e5 TV. Ta tid p\u00e5 barnet n\u00e4r det springer och j\u00e4mf\u00f6r resultat vecka f\u00f6r vecka. G\u00f6r stapeldiagram \u00f6ver tr\u00e4ningsresultat. L\u00e5t barnet skriva om sin favoritsport eller en match det sett.',
    classroomIntegration: 'Sporttemat i \u00e5rskurs 2 integrerar idrott, matematik och svenska: i idrott m\u00e4ts tid och po\u00e4ng, i matematik \u00f6vas datahantering och multiplikation med sportdata. I svenska skrivs matchber\u00e4ttelser och id\u00e9ttexter om fair play. Lgr22:s m\u00e5l f\u00f6r datahantering och r\u00f6relse uppfylls.',
    assessmentRubric: [
      { skill: 'Po\u00e4ng- och tidber\u00e4kning', emerging: 'adderar po\u00e4ng med st\u00f6d', proficient: 'ber\u00e4knar totalpo\u00e4ng med multiplikation och m\u00e4ter tid sj\u00e4lvst\u00e4ndigt', advanced: 'ber\u00e4knar po\u00e4ngskillnader och j\u00e4mf\u00f6r tidresultat systematiskt' },
      { skill: 'Statistiktolkning', emerging: 'l\u00e4ser av enstaka v\u00e4rden i diagram med st\u00f6d', proficient: 'j\u00e4mf\u00f6r sportstatistik i diagram och tabeller sj\u00e4lvst\u00e4ndigt', advanced: 'analyserar trender, ber\u00e4knar medelv\u00e4rde och presenterar slutsatser' },
      { skill: 'Ber\u00e4ttande skrivning', emerging: 'skriver enstaka meningar om en match', proficient: 'skriver organiserade ber\u00e4ttelser med styckestruktur', advanced: 'skriver levande referat med detaljer, dialoger och reflektioner' },
    ],
  },

  spring: {
    seoTitle: 'Gratis V\u00e5r\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara v\u00e5r\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). V\u00e4xttillv\u00e4xt, m\u00e4tning, datainsamling och beskrivande skrivning om v\u00e5ren. 33 generatorer. Gratis PDF.',
    seoKeywords: 'v\u00e5r\u00f6vningar \u00e5rskurs 2, v\u00e4xttillv\u00e4xt m\u00e4tning 7\u20138 \u00e5r, datainsamling v\u00e5ren, beskrivande skrivning, Lgr22 NO, fr\u00f6groning, stapeldiagram, temperatur, v\u00e5rblommor, naturobservation',
    snippetAnswer: 'V\u00e5r\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar m\u00e4tning av v\u00e4xttillv\u00e4xt, datainsamling med temperatur och stapeldiagram, fr\u00f6gronings\u00f6vningar och beskrivande skrivning om v\u00e5rens f\u00f6r\u00e4ndringar. Multiplikation och klassificering ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 \u00e4r v\u00e5ren ett levande laboratorium. Sju- och \u00e5tta\u00e5ringar planterar fr\u00f6n och m\u00e4ter tillv\u00e4xten i centimeter veckovis, dokumenterar i tabeller och skapar stapeldiagram. Temperaturf\u00f6r\u00e4ndringar registreras och j\u00e4mf\u00f6rs med vintern. Klassificering av v\u00e5rblommor och \u00e5terv\u00e4ndande f\u00e5glar \u00f6vas. Multiplikation kopplas till naturen: \u201dom 4 blommor har 5 kronblad var\u201d. Eleverna l\u00e4ser faktatexter om fr\u00f6groning och skriver beskrivande stycken om v\u00e5rens sinnesintryck. Lgr22 betonar systematisk observation och naturkunskap.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning av tillv\u00e4xt \u00f6ver tid', howWeAddress: 'Eleverna m\u00e4ter plantor i cm veckovis, dokumenterar i tabeller och skapar tillv\u00e4xtdiagram' },
      { milestone: 'Datainsamling och j\u00e4mf\u00f6relse', howWeAddress: 'Temperaturloggar och v\u00e5robservationer som presenteras i stapeldiagram f\u00f6r j\u00e4mf\u00f6relse' },
      { milestone: 'Klassificering av v\u00e5rens organismer', howWeAddress: 'Sorteringsuppgifter d\u00e4r eleven grupperar v\u00e5rblommor, insekter och f\u00e5glar efter egenskaper' },
      { milestone: 'Beskrivande skrivning med sinnesdetaljer', howWeAddress: 'Eleverna skriver om v\u00e5ren med detaljer om f\u00e4rger, dofter, ljud och k\u00e4nslor' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge f\u00f6rfyllda m\u00e4ttabeller, bildkort f\u00f6r klassificering och meningsstarters f\u00f6r skrivning. F\u00f6r avancerade elever, l\u00e5t eleven designa egna experiment med kontrollgrupp, analysera tillv\u00e4xtdata och skriva vetenskapliga rapporter.',
    parentTakeaway: 'I \u00e5rskurs 2 kan v\u00e5ren bli ett l\u00e5ngt l\u00e4randeprojekt. Plantera fr\u00f6n tillsammans och m\u00e4t tillv\u00e4xten varje vecka. Ta tempen ute dagligen och rita graf. G\u00e5 p\u00e5 v\u00e5rpromenad och dokumentera: vilka blommor \u00e4r f\u00f6rst ut? L\u00e5t barnet skriva v\u00e5rdagbok med teckningar och text.',
    classroomIntegration: 'V\u00e5rtemat i \u00e5rskurs 2 integrerar NO, matematik och svenska: i NO studeras fr\u00f6groning och \u00e5rstidsv\u00e4xlingar genom odling, i matematik \u00f6vas m\u00e4tning och datapresentation. I svenska skrivs beskrivande texter och observationsdagb\u00f6cker. Utomhuspedagogik f\u00f6rst\u00e4rker l\u00e4randet. Lgr22:s m\u00e5l f\u00f6r naturvetenskap och systematisk observation uppfylls.',
    assessmentRubric: [
      { skill: 'M\u00e4tning och tillv\u00e4xtdokumentation', emerging: 'm\u00e4ter med st\u00f6d och fyller i f\u00f6rgjorda tabeller', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och skapar tillv\u00e4xtdiagram', advanced: 'analyserar tillv\u00e4xtdata, identifierar m\u00f6nster och drar slutsatser' },
      { skill: 'Klassificering av organismer', emerging: 'sorterar efter ett kriterium med bildst\u00f6d', proficient: 'klassificerar sj\u00e4lvst\u00e4ndigt med flera kriterier', advanced: 'skapar egna klassificeringssystem och motiverar val' },
      { skill: 'Beskrivande skrivning', emerging: 'skriver enstaka meningar om v\u00e5ren', proficient: 'skriver organiserade stycken med sinnesdetaljer', advanced: 'skriver rika beskrivningar med j\u00e4mf\u00f6relser och bildligt spr\u00e5k' },
    ],
  },

  summer: {
    seoTitle: 'Gratis Sommar\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara sommar\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Tidm\u00e4tning, pengaber\u00e4kning, datainsamling och ber\u00e4ttande skrivning om sommaren. 33 generatorer. Gratis PDF.',
    seoKeywords: 'sommar\u00f6vningar \u00e5rskurs 2, tidm\u00e4tning 7\u20138 \u00e5r, pengar sommaraktiviteter, datainsamling sommar, ber\u00e4ttande skrivning, Lgr22, multiplikation, stapeldiagram, reseplanering, utomhusaktiviteter',
    snippetAnswer: 'Sommar\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar tidm\u00e4tning och planering, pengaber\u00e4kning f\u00f6r sommaraktiviteter, datainsamling om sommarv\u00e4der och ber\u00e4ttande skrivning om sommarupplevelser. Multiplikation och flerstegsuppgifter ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplas sommartemat till planering och f\u00e4rdighets\u00f6vning. Sju- och \u00e5tta\u00e5ringar planerar sommaraktiviteter med klockan och ber\u00e4knar hur l\u00e5ng tid varje moment tar. Pengaber\u00e4kning \u00f6vas: glassk\u00f6p, strandutrustning, utflykter. Multiplikation: \u201dom 5 familjer beh\u00f6ver 3 vattenflaskor var\u201d. V\u00e4derdata samlas in och presenteras i stapeldiagram. Eleverna l\u00e4ser informationstexter om svensk sommar och skriver ber\u00e4ttelser om semesterupplevelser. Lgr22 betonar vardagsrelevant matematik och ber\u00e4ttande skrivning.',
    developmentalMilestones: [
      { milestone: 'Tidsplanering och ber\u00e4kning av tidsintervall', howWeAddress: 'Sommarplaneringsuppgifter d\u00e4r eleven schemal\u00e4gger aktiviteter och ber\u00e4knar tids\u00e5tg\u00e5ng' },
      { milestone: 'Pengaber\u00e4kning i vardagssituationer', howWeAddress: 'Sommarbudget\u00f6vningar d\u00e4r eleven ber\u00e4knar kostnader f\u00f6r glass, utflykter och utrustning' },
      { milestone: 'Datainsamling och diagramskapande', howWeAddress: 'V\u00e4derloggar d\u00e4r eleven dokumenterar temperatur och sol/regn och presenterar i stapeldiagram' },
      { milestone: 'Ber\u00e4ttande skrivning om personliga upplevelser', howWeAddress: 'Sommarber\u00e4ttelser d\u00e4r eleven skriver om upplevelser med inledning, h\u00e4ndelsef\u00f6rlopp och k\u00e4nslor' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med heltimmar vid tidsplanering, j\u00e4mna kronbelopp och skrivmallar med meningsstarters. F\u00f6r avancerade elever, l\u00e5t eleven planera en hel semestervecka med budget, skapa detaljerade v\u00e4deranalyser och skriva l\u00e4ngre ber\u00e4ttelser med dialoger.',
    parentTakeaway: 'Sommaren \u00e4r perfekt f\u00f6r att \u00f6va matematik i vardagen. L\u00e5t barnet planera en utflykt: n\u00e4r \u00e5ker vi, hur l\u00e5ng tid tar det, vad kostar det? K\u00f6p glass och \u00f6va v\u00e4xelber\u00e4kning. F\u00f6r v\u00e4derdagbok under semestern. Skriv vykort eller dagbok \u2013 varje dag n\u00e5gra meningar.',
    classroomIntegration: 'Sommartemat i \u00e5rskurs 2 anv\u00e4nds f\u00f6re sommarlovet f\u00f6r att bef\u00e4sta \u00e5rets l\u00e4rande: i matematik repeteras tid, pengar och datahantering. I svenska skrivs ber\u00e4ttelser och brev. Sommarl\u00e4xor kan inneh\u00e5lla v\u00e4derdagbok och l\u00e4slogg. Lgr22:s m\u00e5l f\u00f6r vardagsmatematik och skrivutveckling bef\u00e4sts.',
    assessmentRubric: [
      { skill: 'Tids- och pengaplanering', emerging: 'ber\u00e4knar med heltimmar och j\u00e4mna kronbelopp med st\u00f6d', proficient: 'planerar sj\u00e4lvst\u00e4ndigt med kvartar och kronor/\u00f6ren', advanced: 'optimerar planering med tidsbegr\u00e4nsningar och budget' },
      { skill: 'Datahantering', emerging: 'fyller i f\u00f6rgjorda tabeller med st\u00f6d', proficient: 'samlar data sj\u00e4lvst\u00e4ndigt och skapar diagram', advanced: 'analyserar data\u00f6ver tid och presenterar slutsatser' },
      { skill: 'Ber\u00e4ttande skrivning', emerging: 'skriver enstaka meningar om sommaren', proficient: 'skriver organiserade ber\u00e4ttelser med styckestruktur', advanced: 'skriver levande ber\u00e4ttelser med sinnesdetaljer och dialoger' },
    ],
  },

  superheroes: {
    seoTitle: 'Gratis Superhj\u00e4lte\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara superhj\u00e4lte\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Multiplikation, logik, probleml\u00f6sning och ber\u00e4ttande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'superhj\u00e4lte\u00f6vningar \u00e5rskurs 2, multiplikation 7\u20138 \u00e5r, logik probleml\u00f6sning, ber\u00e4ttande skrivning superhj\u00e4ltar, Lgr22, flerstegsuppgifter, superkrafter, r\u00e4ddningsuppdrag, kreativ skrivning, matematiskt t\u00e4nkande',
    snippetAnswer: 'Superhj\u00e4lte\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar multiplikation i r\u00e4ddningsscenarier, logiskt t\u00e4nkande, flerstegsordproblem och ber\u00e4ttande skrivning om superhj\u00e4lte\u00e4ventyr. Probleml\u00f6sning och kreativt skapande ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 driver superhj\u00e4ltetemat engagemang i komplexa uppgifter. Sju- och \u00e5tta\u00e5ringar l\u00f6ser flerstegsordproblem d\u00e4r superhj\u00e4ltar r\u00e4ddar m\u00e4nniskor: \u201dom hj\u00e4lten r\u00e4ddar 3 grupper med 4 personer, hur m\u00e5nga totalt?\u201d. Logiska pussel kr\u00e4ver slutledning: vilken superhj\u00e4lte bor var? Tidsber\u00e4kning f\u00f6r uppdrag \u00f6var klockan. Eleverna skapar egna superhj\u00e4ltar med m\u00e4tbara superkrafter och skriver \u00e4ventyrber\u00e4ttelser med styckestruktur. Probleml\u00f6sning i flera steg tr\u00e4nar uth\u00e5llighet. Lgr22 betonar matematiskt resonemang och kreativt ber\u00e4ttande.',
    developmentalMilestones: [
      { milestone: 'Multiplikation och flerstegsuppgifter', howWeAddress: 'R\u00e4ddningsuppdrag d\u00e4r eleven l\u00f6ser flerstegsuppgifter med multiplikation, addition och subtraktion' },
      { milestone: 'Logiskt t\u00e4nkande och slutledning', howWeAddress: 'Superhj\u00e4ltepussel d\u00e4r eleven anv\u00e4nder ledtr\u00e5dar f\u00f6r att dra slutsatser och l\u00f6sa logiska problem' },
      { milestone: 'Tidsber\u00e4kning f\u00f6r uppdrag', howWeAddress: 'Uppdragsscenarier d\u00e4r eleven ber\u00e4knar hur l\u00e5ng tid r\u00e4ddningen tar och planerar med klockan' },
      { milestone: '\u00c4ventyrsskrivning med styckestruktur', howWeAddress: 'Eleverna skriver superhj\u00e4lteberr\u00e4ttelser med inledning, problem, l\u00f6sning och avslutning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd enstegsuppgifter med bildst\u00f6d, enkla logiska val och skrivmallar. F\u00f6r avancerade elever, ge trestegsuppgifter med \u00f6verfl\u00f6dig information, komplexa logikpussel och l\u00e5t eleven skriva l\u00e4ngre ber\u00e4ttelser med bikaraktrer och plottvndningar.',
    parentTakeaway: 'I \u00e5rskurs 2 motiverar superhj\u00e4ltar till matematik. Skapa r\u00e4ddningsuppdrag hemma: \u201dhj\u00e4lten m\u00e5ste r\u00e4dda 5 grupper med 3 m\u00e4nniskor\u201d. Spela logikspel tillsammans. L\u00e5t barnet designa en superhj\u00e4lte med superkrafter i siffror. Skriv en superhj\u00e4lteberr\u00e4ttelse tillsammans.',
    classroomIntegration: 'Superhj\u00e4ltetemat i \u00e5rskurs 2 integrerar matematik, svenska och bild: i matematik l\u00f6ses r\u00e4ddningsuppdrag med multiplikation och logik. I svenska skrivs \u00e4ventyrber\u00e4ttelser. I bild designas superhj\u00e4ltekost\u00fcmer och -embl\u00e8m. Lgr22:s m\u00e5l f\u00f6r probleml\u00f6sning och kreativt skapande uppfylls.',
    assessmentRubric: [
      { skill: 'Flerstegsuppgifter', emerging: 'l\u00f6ser enstegsuppgifter med st\u00f6d', proficient: 'l\u00f6ser tv\u00e5stegsuppgifter med multiplikation sj\u00e4lvst\u00e4ndigt', advanced: 'l\u00f6ser trestegsuppgifter och f\u00f6rklarar sin strategi' },
      { skill: 'Logiskt t\u00e4nkande', emerging: 'f\u00f6ljer enkla ledtr\u00e5dar med st\u00f6d', proficient: 'drar slutsatser fr\u00e5n flera ledtr\u00e5dar sj\u00e4lvst\u00e4ndigt', advanced: 'l\u00f6ser komplexa logikpussel och motiverar sitt resonemang' },
      { skill: '\u00c4ventyrsskrivning', emerging: 'skriver enstaka meningar om en superhj\u00e4lte', proficient: 'skriver organiserade ber\u00e4ttelser med problem och l\u00f6sning', advanced: 'skriver detaljerade \u00e4ventyr med karaktarsutveckling och sp\u00e4nning' },
    ],
  },

  toys: {
    seoTitle: 'Gratis Leksaks\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara leksaks\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Pengaber\u00e4kning, sortering, m\u00e4tning och beskrivande skrivning om leksaker. 33 generatorer. Gratis PDF.',
    seoKeywords: 'leksaks\u00f6vningar \u00e5rskurs 2, pengar leksaker 7\u20138 \u00e5r, sortering klassificering, m\u00e4tning leksaker, beskrivande skrivning, Lgr22, multiplikation, diagram, budget, \u00f6nskelista',
    snippetAnswer: 'Leksaks\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar pengaber\u00e4kning vid leksaksink\u00f6p, sortering och klassificering, m\u00e4tning av leksaker i cm och beskrivande skrivning. Multiplikation och budgetplanering ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplas leksakstemat till ekonomi och systematiskt t\u00e4nkande. Sju- och \u00e5tta\u00e5ringar r\u00e4knar med kronor och \u00f6ren: j\u00e4mf\u00f6r priser, ber\u00e4knar v\u00e4xel och planerar \u00f6nskelistor med budget. Klassificering sker med flera kriterier: material, storlek, anv\u00e4ndning. M\u00e4tning i cm och kg \u00f6vas: hur stor \u00e4r dockan, hur tung \u00e4r b\u00e5ten? Multiplikation: \u201dom 4 barn f\u00e5r 3 leksaker var\u201d. Eleverna skriver beskrivande stycken om favoritleksaken. Lgr22 betonar ekonomisk medvetenhet, m\u00e4tning och skrivutveckling.',
    developmentalMilestones: [
      { milestone: 'Pengaber\u00e4kning med kronor och \u00f6ren', howWeAddress: 'Leksaksbutik-scenarier d\u00e4r eleven j\u00e4mf\u00f6r priser, adderar kostnader och ber\u00e4knar v\u00e4xel' },
      { milestone: 'Klassificering med flera kriterier', howWeAddress: 'Sorteringsuppgifter d\u00e4r eleven grupperar leksaker efter material, storlek och anv\u00e4ndning' },
      { milestone: 'M\u00e4tning i cm och kg', howWeAddress: 'Eleverna m\u00e4ter leksakers l\u00e4ngd och vikt, dokumenterar och j\u00e4mf\u00f6r i tabeller' },
      { milestone: 'Beskrivande skrivning med detaljer', howWeAddress: 'Eleverna skriver organiserade stycken om sin favoritleksak med utseende, material och funktion' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd j\u00e4mna kronbelopp, sortering med tv\u00e5 kategorier och skrivmallar. F\u00f6r avancerade elever, ge budgetuppgifter med begr\u00e4nsade medel, trestegsklassificering och l\u00e5t eleven skriva recensioner som j\u00e4mf\u00f6r tv\u00e5 leksaker.',
    parentTakeaway: 'I \u00e5rskurs 2 kan leksaker l\u00e4ra matematik. L\u00e5t barnet r\u00e4kna priser i leksakskataloger och planera en \u00f6nskelista med budget. Sortera leksaker i lekrummet efter olika regler. M\u00e4t leksakerna med linjal och j\u00e4mf\u00f6r. Skriv om favoritleksaken: hur ser den ut, vad kan man g\u00f6ra med den?',
    classroomIntegration: 'Leksakstemat i \u00e5rskurs 2 integrerar matematik, teknik och svenska: i matematik \u00f6vas pengar, m\u00e4tning och klassificering. I teknik diskuteras material och konstruktion. I svenska skrivs beskrivande texter och leksaksrecensioner. Lgr22:s m\u00e5l f\u00f6r ekonomisk medvetenhet och skrivutveckling uppfylls.',
    assessmentRubric: [
      { skill: 'Pengaber\u00e4kning', emerging: 'adderar j\u00e4mna kronbelopp med st\u00f6d', proficient: 'j\u00e4mf\u00f6r priser och ber\u00e4knar v\u00e4xel sj\u00e4lvst\u00e4ndigt', advanced: 'planerar budget med begr\u00e4nsade medel och optimerar val' },
      { skill: 'Klassificering', emerging: 'sorterar efter ett kriterium med st\u00f6d', proficient: 'klassificerar med tv\u00e5-tre kriterier sj\u00e4lvst\u00e4ndigt', advanced: 'skapar egna klassificeringssystem och motiverar sina kategorier' },
      { skill: 'Beskrivande skrivning', emerging: 'skriver enstaka meningar om en leksak', proficient: 'skriver organiserade stycken med detaljer om utseende och funktion', advanced: 'skriver j\u00e4mf\u00f6rande recensioner med v\u00e4rderingar och motiveringar' },
    ],
  },

  transportation: {
    seoTitle: 'Gratis Transport\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara transport\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Avst\u00e5ndsber\u00e4kning, tidtabeller, j\u00e4mf\u00f6relse och informationstexter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'transport\u00f6vningar \u00e5rskurs 2, avst\u00e5nd tid 7\u20138 \u00e5r, tidtabeller, j\u00e4mf\u00f6relse fordon, informationstexter transport, Lgr22, multiplikation, m\u00e4tning, diagram, milj\u00f6transport',
    snippetAnswer: 'Transport\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar avst\u00e5nds- och tidber\u00e4kning, tidtabelll\u00e4sning, j\u00e4mf\u00f6relse av fordon i diagram och l\u00e4sf\u00f6rst\u00e5else av informationstexter om transport. Multiplikation och flerstegsuppgifter ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar transporttemat matematik till r\u00f6relse och geografi. Sju- och \u00e5tta\u00e5ringar l\u00e4ser tidtabeller, ber\u00e4knar restider och j\u00e4mf\u00f6r avst\u00e5nd. Fordon j\u00e4mf\u00f6rs i stapeldiagram: hastighet, passagerarantal, br\u00e4nslef\u00f6rbrukning. Multiplikation \u00f6vas: \u201dom 3 bussar har 40 platser var\u201d. M\u00e4tning i meter och kilometer introduceras. Informationstexter om transporthistoria och milj\u00f6v\u00e4nliga alternativ l\u00e4ses. Eleverna skriver j\u00e4mf\u00f6rande stycken om transportmedel. Lgr22 betonar vardagsmatematik, milj\u00f6medvetenhet och l\u00e4sf\u00f6rst\u00e5else.',
    developmentalMilestones: [
      { milestone: 'Tidtabelll\u00e4sning och tidsber\u00e4kning', howWeAddress: 'Tidtabells\u00f6vningar d\u00e4r eleven l\u00e4ser av avg\u00e5ngstider, ber\u00e4knar restid och planerar resor' },
      { milestone: 'J\u00e4mf\u00f6relse av data i diagram', howWeAddress: 'Stapeldiagram d\u00e4r eleven j\u00e4mf\u00f6r fordons hastighet, storlek och passagerarkapacitet' },
      { milestone: 'Multiplikation i transportkontext', howWeAddress: 'Fordonsuppgifter d\u00e4r eleven ber\u00e4knar totalt antal passagerare, hjul eller kostnader med multiplikation' },
      { milestone: 'J\u00e4mf\u00f6rande skrivning om transportmedel', howWeAddress: 'Eleverna skriver organiserade stycken som j\u00e4mf\u00f6r tv\u00e5 transportmedel med f\u00f6rdelar och nackdelar' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd f\u00f6renklade tidtabeller med heltimmar, bildbaserade j\u00e4mf\u00f6relser och skrivmallar. F\u00f6r avancerade elever, introducera reseplanering med flera byten, l\u00e5t eleven ber\u00e4kna biljettpriser och skriv argumenterande texter om milj\u00f6v\u00e4nlig transport.',
    parentTakeaway: 'I \u00e5rskurs 2 kan resor bli matematik. L\u00e4s tidtabellen vid buss- eller t\u00e5gresor tillsammans. Ber\u00e4kna: hur l\u00e5ng tid tar resan? J\u00e4mf\u00f6r: \u00e4r buss eller t\u00e5g snabbare? Diskutera milj\u00f6v\u00e4nliga alternativ. L\u00e5t barnet planera en resa p\u00e5 papper med tider och kostnader.',
    classroomIntegration: 'Transporttemat i \u00e5rskurs 2 integrerar SO, matematik och svenska: i SO diskuteras infrastruktur och milj\u00f6, i matematik \u00f6vas tid, datatolkning och multiplikation med transportdata. I svenska l\u00e4ses informationstexter och skrivs j\u00e4mf\u00f6rande texter. Lgr22:s m\u00e5l f\u00f6r vardagsmatematik och milj\u00f6medvetenhet uppfylls.',
    assessmentRubric: [
      { skill: 'Tidtabell och tidsber\u00e4kning', emerging: 'l\u00e4ser av heltimmar i tidtabeller med st\u00f6d', proficient: 'ber\u00e4knar restider och planerar enkla resor sj\u00e4lvst\u00e4ndigt', advanced: 'planerar resor med byten och optimerar restid' },
      { skill: 'Dataj\u00e4mf\u00f6relse i diagram', emerging: 'l\u00e4ser av enstaka v\u00e4rden med st\u00f6d', proficient: 'j\u00e4mf\u00f6r fordon i diagram och besvarar fr\u00e5gor sj\u00e4lvst\u00e4ndigt', advanced: 'analyserar transportdata och drar slutsatser om effektivitet' },
      { skill: 'J\u00e4mf\u00f6rande skrivning', emerging: 'skriver enstaka meningar om ett fordon', proficient: 'j\u00e4mf\u00f6r tv\u00e5 transportmedel med f\u00f6r- och nackdelar', advanced: 'skriver argumenterande texter med fakta och egna \u00e5sikter' },
    ],
  },

  travel: {
    seoTitle: 'Gratis Rese\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara rese\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Kartl\u00e4sning, pengaomr\u00e4kning, tidsplanering och resedagbok. 33 generatorer. Gratis PDF.',
    seoKeywords: 'rese\u00f6vningar \u00e5rskurs 2, kartl\u00e4sning 7\u20138 \u00e5r, pengaomr\u00e4kning, tidsplanering resa, resedagbok skrivning, Lgr22 SO, v\u00e4rldsl\u00e4nder, multiplikation, avst\u00e5nd, kulturer',
    snippetAnswer: 'Rese\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar kartl\u00e4sning, pengaomr\u00e4kning mellan valutor, tidsplanering f\u00f6r resor och resedagboksskrivning. Avst\u00e5ndsber\u00e4kning och kulturkunskap ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 vidgar resetemat perspektivet bortom hemmilj\u00f6n. Sju- och \u00e5tta\u00e5ringar l\u00e4ser enkla kartor med symboler, identifierar l\u00e4nder och anv\u00e4nder kompassriktningar. Pengaomr\u00e4kning introduceras: svenska kronor till euro. Tidsplanering \u00f6vas: avg\u00e5ngstider, flygtider, tidsskillnader. Multiplikation: \u201dom 4 familjer beh\u00f6ver 3 biljetter var\u201d. Informationstexter om l\u00e4nder och kulturer l\u00e4ses. Eleverna skriver resedagbok med datum, platser och upplevelser. Lgr22 betonar omv\u00e4rldskunskap, kulturf\u00f6rst\u00e5else och skrivutveckling.',
    developmentalMilestones: [
      { milestone: 'Kartl\u00e4sning med symboler och kompass', howWeAddress: 'Kart\u00f6vningar d\u00e4r eleven identifierar l\u00e4nder, anv\u00e4nder teckenf\u00f6rklaring och kompassriktningar' },
      { milestone: 'Enkel pengaomr\u00e4kning', howWeAddress: 'Valuta\u00f6vningar d\u00e4r eleven r\u00e4knar om belopp mellan kronor och euro med enkla omr\u00e4kningstal' },
      { milestone: 'Tidsplanering med tidtabeller', howWeAddress: 'Reseplaneringsuppgifter d\u00e4r eleven l\u00e4ser tidtabeller, ber\u00e4knar restid och planerar dagsprogram' },
      { milestone: 'Dagboksskrivning med datum och detaljer', howWeAddress: 'Resedagb\u00f6cker d\u00e4r eleven skriver dagliga inl\u00e4gg med datum, plats, aktiviteter och reflektioner' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd f\u00f6renklade kartor med f\u00e4rre l\u00e4nder, j\u00e4mna kronbelopp och dagboksmallar med f\u00e4rdiga rubriker. F\u00f6r avancerade elever, introducera flera valutor, l\u00e5t eleven planera en komplett resa med budget och skriv l\u00e4ngre dagboksinl\u00e4gg med kulturj\u00e4mf\u00f6relser.',
    parentTakeaway: 'I \u00e5rskurs 2 \u00e4r resor l\u00e4rande. Titta p\u00e5 kartan tillsammans: var bor vi, var ska vi \u00e5ka? \u00d6va pengaomr\u00e4kning inf\u00f6r en utlandsresa. L\u00e5t barnet f\u00f6ra resedagbok med datum och teckningar. Diskutera l\u00e4nder: vad \u00e4ter man d\u00e4r, vilka spr\u00e5k talar man?',
    classroomIntegration: 'Resetemat i \u00e5rskurs 2 integrerar SO, matematik och svenska: i SO studeras l\u00e4nder, kulturer och kartor. I matematik \u00f6vas pengar, tid och avst\u00e5nd genom reseplanering. I svenska skrivs resedagb\u00f6cker och l\u00e4ses informationstexter om l\u00e4nder. Lgr22:s m\u00e5l f\u00f6r omv\u00e4rldskunskap och kulturf\u00f6rst\u00e5else uppfylls.',
    assessmentRubric: [
      { skill: 'Kartl\u00e4sning', emerging: 'identifierar enkla symboler p\u00e5 karta med st\u00f6d', proficient: 'l\u00e4ser kartor sj\u00e4lvst\u00e4ndigt med teckenf\u00f6rklaring och kompass', advanced: 'planerar rutter p\u00e5 karta och uppskattar avst\u00e5nd' },
      { skill: 'Pengaomr\u00e4kning', emerging: 'r\u00e4knar med en valuta med st\u00f6d', proficient: 'omr\u00e4knar belopp mellan kronor och euro sj\u00e4lvst\u00e4ndigt', advanced: 'arbetar med flera valutor och j\u00e4mf\u00f6r priser i olika l\u00e4nder' },
      { skill: 'Resedagbok', emerging: 'skriver enstaka meningar med datum', proficient: 'skriver dagliga inl\u00e4gg med plats, aktiviteter och detaljer', advanced: 'skriver reflekterande dagbok med kulturj\u00e4mf\u00f6relser och personliga insikter' },
    ],
  },

  vegetables: {
    seoTitle: 'Gratis Gr\u00f6nsaks\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara gr\u00f6nsaks\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). V\u00e4gning, m\u00e4tning, receptber\u00e4kning och informationstexter om gr\u00f6nsaker. 33 generatorer. Gratis PDF.',
    seoKeywords: 'gr\u00f6nsaks\u00f6vningar \u00e5rskurs 2, v\u00e4gning kg 7\u20138 \u00e5r, m\u00e4tning gr\u00f6nsaker, receptber\u00e4kning, informationstexter gr\u00f6nsaker, Lgr22 NO, n\u00e4ring, odling, multiplikation, datainsamling',
    snippetAnswer: 'Gr\u00f6nsaks\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar v\u00e4gning och m\u00e4tning av gr\u00f6nsaker, receptber\u00e4kning med multiplikation, datainsamling om odling och l\u00e4sf\u00f6rst\u00e5else om n\u00e4ring och v\u00e4xttillv\u00e4xt. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar gr\u00f6nsakstemat matematik till h\u00e4lsa och odling. Sju- och \u00e5tta\u00e5ringar v\u00e4ger gr\u00f6nsaker i kilogram och gram, m\u00e4ter l\u00e4ngder i cm och dokumenterar tillv\u00e4xt. Receptber\u00e4kning \u00f6var multiplikation: \u201dom receptet \u00e4r f\u00f6r 2 men vi \u00e4r 6\u201d. Datainsamling fr\u00e5n skolodling presenteras i diagram. Informationstexter om n\u00e4rings\u00e4mnen, vitaminer och odling l\u00e4ses med fokus p\u00e5 huvudid\u00e9. Eleverna skriver instruktionstexter f\u00f6r att odla en gr\u00f6nsak. Lgr22 betonar m\u00e4tning, h\u00e4lsof\u00f6rst\u00e5else och naturvetenskapligt t\u00e4nkande.',
    developmentalMilestones: [
      { milestone: 'V\u00e4gning i kg och g samt m\u00e4tning i cm', howWeAddress: 'Eleverna v\u00e4ger och m\u00e4ter gr\u00f6nsaker, dokumenterar i tabeller och j\u00e4mf\u00f6r resultat' },
      { milestone: 'Receptber\u00e4kning med multiplikation', howWeAddress: 'Receptuppgifter d\u00e4r eleven dubblerar eller tredubblar ingredienser med multiplikation' },
      { milestone: 'Datainsamling fr\u00e5n odlingsprojekt', howWeAddress: 'Odlingsdagb\u00f6cker d\u00e4r eleven m\u00e4ter tillv\u00e4xt veckovis och presenterar i stapeldiagram' },
      { milestone: 'Instruktionstskrivning med stegvis ordning', howWeAddress: 'Eleverna skriver tydliga odlingsinstruktioner med steg-f\u00f6r-steg-beskrivning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd j\u00e4mna kilogramv\u00e4rden, enkla recept och bildst\u00f6dd skrivning. F\u00f6r avancerade elever, introducera gram och deciliter, l\u00e5t eleven skala recept f\u00f6r olika antal personer och skriv utvidgade faktatexter om n\u00e4rings\u00e4mnen.',
    parentTakeaway: 'I \u00e5rskurs 2 kan k\u00f6ket bli klassrum. L\u00e5t barnet v\u00e4ga gr\u00f6nsaker n\u00e4r ni lagar mat. Dubbla ett recept tillsammans och r\u00e4kna ut m\u00e4ngderna. Odla n\u00e5got p\u00e5 fvensterbrr\u00e4dan och m\u00e4t tillv\u00e4xten. Diskutera: vilka vitaminer ger mor\u00f6tter? Skriv recept tillsammans.',
    classroomIntegration: 'Gr\u00f6nsakstemat i \u00e5rskurs 2 integrerar NO, matematik och svenska: i NO studeras v\u00e4xttillv\u00e4xt och n\u00e4ring genom skolodling. I matematik \u00f6vas m\u00e4tning, v\u00e4gning och multiplikation genom recept. I svenska skrivs instruktions- och faktatexter. Lgr22:s m\u00e5l f\u00f6r h\u00e4lsa, m\u00e4tning och naturvetenskap uppfylls.',
    assessmentRubric: [
      { skill: 'V\u00e4gning och m\u00e4tning', emerging: 'v\u00e4ger i hela kg med st\u00f6d', proficient: 'v\u00e4ger och m\u00e4ter i kg, g och cm sj\u00e4lvst\u00e4ndigt', advanced: 'v\u00e4xlar mellan enheter och ber\u00e4knar skillnader' },
      { skill: 'Receptber\u00e4kning', emerging: 'l\u00e4ser av m\u00e4ngder i ett recept med st\u00f6d', proficient: 'dubblerar och tredubblar ingredienser sj\u00e4lvst\u00e4ndigt', advanced: 'skalar recept f\u00f6r valfritt antal och ber\u00e4knar kostnader' },
      { skill: 'Instruktionstskrivning', emerging: 'skriver enstaka steg med st\u00f6d', proficient: 'skriver tydliga steg-f\u00f6r-steg-instruktioner med ordningstal', advanced: 'skriver detaljerade instruktioner med tips och alternativ' },
    ],
  },

  weather: {
    seoTitle: 'Gratis V\u00e4der\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara v\u00e4der\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Temperaturm\u00e4tning, v\u00e4derdata, diagram och informationstexter om v\u00e4der. 33 generatorer. Gratis PDF.',
    seoKeywords: 'v\u00e4der\u00f6vningar \u00e5rskurs 2, temperatur 7\u20138 \u00e5r, v\u00e4derdata diagram, informationstexter v\u00e4der, Lgr22 NO, moln, nederb\u00f6rd, termometer, datainsamling, v\u00e4derprognos',
    snippetAnswer: 'V\u00e4der\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar temperaturm\u00e4tning med termometer, v\u00e4derdatainsamling och presentation i diagram, klassificering av v\u00e4derfenomen och l\u00e4sf\u00f6rst\u00e5else om v\u00e4dersystem. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 blir v\u00e4dertemat ett systematiskt vetenskapsprojekt. Sju- och \u00e5tta\u00e5ringar m\u00e4ter temperatur dagligen med termometer, registrerar molntyper och nederb\u00f6rd och presenterar data i stapeldiagram och tabeller. J\u00e4mf\u00f6relser g\u00f6rs mellan veckor och m\u00e5nader. V\u00e4derfenomen klassificeras: molntyper, nederb\u00f6rdsformer, vindriktningar. Multiplikation \u00f6vas: \u201dom det regnar 3 mm per timme i 4 timmar\u201d. Informationstexter om v\u00e4dersystem l\u00e4ses. Eleverna skriver v\u00e4derprognoser. Lgr22 betonar systematisk datainsamling och naturvetenskaplig f\u00f6rst\u00e5else.',
    developmentalMilestones: [
      { milestone: 'Temperaturavl\u00e4sning och registrering', howWeAddress: 'Daglig temperaturm\u00e4tning d\u00e4r eleven avl\u00e4ser termometer och dokumenterar i tabell' },
      { milestone: 'V\u00e4derdatapresentation i diagram', howWeAddress: 'Veckovisa stapeldiagram d\u00e4r eleven presenterar temperatur, nederb\u00f6rd och molntyper' },
      { milestone: 'Klassificering av v\u00e4derfenomen', howWeAddress: 'Sorteringsuppgifter d\u00e4r eleven grupperar molntyper, nederb\u00f6rd och vindf\u00f6rh\u00e5llanden' },
      { milestone: 'Informationsskrivning om v\u00e4der', howWeAddress: 'Eleverna skriver v\u00e4derprognoser och faktatexter om v\u00e4dersystem med facktermer' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd bildkort f\u00f6r v\u00e4dersymboler, f\u00f6rgjorda diagrammallar och enkel termometeravl\u00e4sning med hela grader. F\u00f6r avancerade elever, introducera negativa temperaturer, l\u00e5t eleven j\u00e4mf\u00f6ra v\u00e4derdata mellan st\u00e4der och skriva detaljerade v\u00e4derrapporter.',
    parentTakeaway: 'I \u00e5rskurs 2 kan v\u00e4dret bli vetenskap. H\u00e4ng en termometer vid f\u00f6nstret och l\u00e5t barnet l\u00e4sa av dagligen. F\u00f6r v\u00e4derdagbok med symboler f\u00f6r sol, regn och moln. Titta p\u00e5 v\u00e4derprognoser och j\u00e4mf\u00f6r med verkligheten. Diskutera: varf\u00f6r regnar det, varifrr\u00e5n kommer moln?',
    classroomIntegration: 'V\u00e4dertemat i \u00e5rskurs 2 integrerar NO och matematik: daglig v\u00e4derobservation ger data f\u00f6r matematik\u00f6vningar med diagram och j\u00e4mf\u00f6relser. I NO studeras v\u00e4derfenomen och vattnets kretslopp. I svenska skrivs v\u00e4derprognoser och faktatexter. Lgr22:s m\u00e5l f\u00f6r systematisk datainsamling och naturkunskap uppfylls.',
    assessmentRubric: [
      { skill: 'Temperaturm\u00e4tning och avl\u00e4sning', emerging: 'avl\u00e4ser termometer med st\u00f6d vid hela grader', proficient: 'avl\u00e4ser och registrerar temperatur sj\u00e4lvst\u00e4ndigt dagligen', advanced: 'j\u00e4mf\u00f6r temperaturer \u00f6ver tid och identifierar trender' },
      { skill: 'V\u00e4derdata och diagram', emerging: 'fyller i f\u00f6rgjord tabell med v\u00e4dersymboler', proficient: 'skapar sj\u00e4lvst\u00e4ndigt stapeldiagram fr\u00e5n v\u00e4derdata', advanced: 'analyserar v\u00e4derdata, j\u00e4mf\u00f6r perioder och drar slutsatser' },
      { skill: 'V\u00e4derskrivning', emerging: 'beskriver dagens v\u00e4der i enstaka meningar', proficient: 'skriver v\u00e4derprognoser med facktermer och styckestruktur', advanced: 'skriver detaljerade v\u00e4derrapporter med data och f\u00f6rklaringar' },
    ],
  },

  winter: {
    seoTitle: 'Gratis Vinter\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara vinter\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Temperatur under noll, m\u00e4tning, dataj\u00e4mf\u00f6relse och ber\u00e4ttande skrivning. 33 generatorer. Gratis PDF.',
    seoKeywords: 'vinter\u00f6vningar \u00e5rskurs 2, temperatur under noll 7\u20138 \u00e5r, sn\u00f6m\u00e4tning, dataj\u00e4mf\u00f6relse vinter, ber\u00e4ttande skrivning, Lgr22 NO, is sn\u00f6, stapeldiagram, multiplikation, vinterdjur',
    snippetAnswer: 'Vinter\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar temperatur under noll, sn\u00f6- och ism\u00e4tning, dataj\u00e4mf\u00f6relse mellan vinterveckor och ber\u00e4ttande skrivning om vinterupplevelser. Multiplikation och klassificering ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 utforskas vintern genom m\u00e4tning och data. Sju- och \u00e5tta\u00e5ringar arbetar med negativa tal f\u00f6r f\u00f6rsta g\u00e5ngen n\u00e4r de l\u00e4ser temperaturer under noll. Sn\u00f6djup m\u00e4ts i centimeter och dokumenteras \u00f6ver veckor i stapeldiagram. Is- och vattens\u00e5aggregat studeras genom experiment. Klassificering av vinterdjurs anpassningar: ide, vinterdvala, migration. Multiplikation: \u201dom 3 barn g\u00f6r 4 sn\u00f6bollar var\u201d. Eleverna skriver ber\u00e4ttelser om vinter\u00e4ventyr. Lgr22 betonar systematisk observation och f\u00f6rst\u00e5else f\u00f6r \u00e5rstidsv\u00e4xlingar.',
    developmentalMilestones: [
      { milestone: 'F\u00f6rst\u00e5else f\u00f6r negativa tal vid temperatur', howWeAddress: 'Termometer\u00f6vningar d\u00e4r eleven l\u00e4ser temperaturer under noll och j\u00e4mf\u00f6r minusgrader' },
      { milestone: 'M\u00e4tning av sn\u00f6djup och datadokumentation', howWeAddress: 'Sn\u00f6m\u00e4tning i cm d\u00e4r eleven dokumenterar \u00f6ver veckor och skapar tillv\u00e4xtdiagram' },
      { milestone: 'Klassificering av djurs vinteranpassningar', howWeAddress: 'Sorteringsuppgifter d\u00e4r eleven grupperar djur efter anpassningsstrategi: ide, vinterdvala, migration' },
      { milestone: 'Ber\u00e4ttande skrivning om vinterupplevelser', howWeAddress: 'Vinterber\u00e4ttelser d\u00e4r eleven skriver om vinter\u00e4ventyr med sinnesdetaljer och styckestruktur' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, arbeta med temperaturer \u00f6ver noll, ge bildbaserad klassificering och korta skrivmallar. F\u00f6r avancerade elever, introducera ber\u00e4kningar med negativa tal, l\u00e5t eleven j\u00e4mf\u00f6ra vinterv\u00e4der i olika st\u00e4der och skriva l\u00e4ngre ber\u00e4ttelser med naturbeskrivningar.',
    parentTakeaway: 'I \u00e5rskurs 2 kan vintern bli ett experiment. M\u00e4t sn\u00f6djupet varje dag och rita diagram. L\u00e4s termometern tillsammans: vad betyder minustecken? Diskutera: varf\u00f6r sover igeln om vintern? G\u00f6r isexperiment: fr\u00e4s vatten i olika former. Skriv om ert b\u00e4sta vinter\u00e4ventyr.',
    classroomIntegration: 'Vintertemat i \u00e5rskurs 2 integrerar NO, matematik och svenska: i NO studeras aggregat, vinteranpassningar och v\u00e4der. I matematik \u00f6vas m\u00e4tning, negativa tal och datahantering med vinterdata. I svenska skrivs vinterber\u00e4ttelser och faktatexter. Lgr22:s m\u00e5l f\u00f6r naturvetenskap och systematisk observation uppfylls.',
    assessmentRubric: [
      { skill: 'Temperatur och negativa tal', emerging: 'l\u00e4ser temperaturer \u00f6ver noll med st\u00f6d', proficient: 'l\u00e4ser och j\u00e4mf\u00f6r temperaturer under noll sj\u00e4lvst\u00e4ndigt', advanced: 'ber\u00e4knar temperaturskillnader \u00f6ver och under noll' },
      { skill: 'Sn\u00f6m\u00e4tning och data', emerging: 'm\u00e4ter med st\u00f6d och fyller i f\u00f6rgjord tabell', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och skapar stapeldiagram', advanced: 'analyserar sn\u00f6data \u00f6ver tid och drar slutsatser om m\u00f6nster' },
      { skill: 'Ber\u00e4ttande skrivning', emerging: 'skriver enstaka meningar om vintern', proficient: 'skriver organiserade ber\u00e4ttelser med sinnesdetaljer', advanced: 'skriver rika vinterber\u00e4ttelser med naturbeskrivningar och k\u00e4nslor' },
    ],
  },

  xmas: {
    seoTitle: 'Gratis Jul\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara jul\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Pengabudget, multiplikation, klockan och julber\u00e4ttelser med styckestruktur. 33 generatorer. Gratis PDF.',
    seoKeywords: 'jul\u00f6vningar \u00e5rskurs 2, julbudget pengar 7\u20138 \u00e5r, multiplikation julklappar, klockan julafton, julber\u00e4ttelser skrivning, Lgr22, adventstid, flerstegsuppgifter, julbak recept, jultraditioner',
    snippetAnswer: 'Jul\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar pengabudget f\u00f6r julklappar, multiplikation i julbakskontext, klockan f\u00f6r julschema och ber\u00e4ttande skrivning om jultraditioner. Flerstegsuppgifter och datatolkning ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kopplar jultemat matematik till traditioner och planering. Sju- och \u00e5tta\u00e5ringar planerar julklappsbudget med kronor och \u00f6ren, j\u00e4mf\u00f6r priser och ber\u00e4knar v\u00e4xel. Multiplikation \u00f6vas i julbak: \u201dom receptet \u00e4r f\u00f6r 12 pepparkakor men vi vill ha 36\u201d. Klockan anv\u00e4nds f\u00f6r julaftonens schema: n\u00e4r ska maten vara klar, n\u00e4r \u00e4r julklappsutdelning? Eleverna l\u00e4ser om jultraditioner fr\u00e5n olika kulturer och skriver egna julber\u00e4ttelser med styckestruktur. Lgr22 betonar kulturf\u00f6rst\u00e5else, ekonomiskt t\u00e4nkande och ber\u00e4ttande skrivning.',
    developmentalMilestones: [
      { milestone: 'Pengabudget och prisj\u00e4mf\u00f6relse', howWeAddress: 'Julklappsbudget d\u00e4r eleven planerar ink\u00f6p med begr\u00e4nsade medel och j\u00e4mf\u00f6r alternativ' },
      { milestone: 'Multiplikation i receptkontext', howWeAddress: 'Julbaksuppgifter d\u00e4r eleven dubblerar och tredubblar recept med multiplikation' },
      { milestone: 'Tidsplanering med klockan', howWeAddress: 'Julaftonens schema d\u00e4r eleven planerar aktiviteter med tidsangivelser och ber\u00e4knar intervall' },
      { milestone: 'Ber\u00e4ttande skrivning om traditioner', howWeAddress: 'Eleverna skriver julber\u00e4ttelser med inledning, h\u00e4ndelser och avslutning och beskriver traditioner' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd j\u00e4mna kronbelopp, enkla dubblingsrecept och skrivmallar med f\u00e4rdiga meningsinledningar. F\u00f6r avancerade elever, ge budgetuppgifter med flera mottagare, komplexa receptskalningar och l\u00e5t eleven skriva j\u00e4mf\u00f6rande texter om jultraditioner i olika l\u00e4nder.',
    parentTakeaway: 'Julen \u00e4r perfekt f\u00f6r praktisk matematik. L\u00e5t barnet vara med och planera julklappsbudgeten: hur mycket kan vi l\u00e4gga p\u00e5 var och en? Baka tillsammans och l\u00e5t barnet dubblera receptet. G\u00f6r ett julaftonschema p\u00e5 papper. Skriv julber\u00e4ttelse eller julbrev till mormor och morfar.',
    classroomIntegration: 'Jultemat i \u00e5rskurs 2 integrerar SO, matematik och svenska: i SO studeras jultraditioner fr\u00e5n olika kulturer. I matematik \u00f6vas pengar, multiplikation och tid genom julscenarier. I svenska skrivs julber\u00e4ttelser, \u00f6nskelistor och julkort. Adventskalender kan inneh\u00e5lla dagliga matteuppgifter. Lgr22:s m\u00e5l f\u00f6r kulturf\u00f6rst\u00e5else och vardagsmatematik uppfylls.',
    assessmentRubric: [
      { skill: 'Budget och pengaber\u00e4kning', emerging: 'adderar j\u00e4mna kronbelopp med st\u00f6d', proficient: 'planerar budget och j\u00e4mf\u00f6r priser sj\u00e4lvst\u00e4ndigt', advanced: 'optimerar budget med begr\u00e4nsningar och ber\u00e4knar v\u00e4xel exakt' },
      { skill: 'Receptber\u00e4kning och multiplikation', emerging: 'l\u00e4ser av m\u00e4ngder i recept med st\u00f6d', proficient: 'dubblerar ingredienser med multiplikation sj\u00e4lvst\u00e4ndigt', advanced: 'skalar recept f\u00f6r valfritt antal och l\u00f6ser komplexa bakuppgifter' },
      { skill: 'Julber\u00e4ttelser', emerging: 'skriver enstaka meningar om julen', proficient: 'skriver organiserade ber\u00e4ttelser om jultraditioner med styckestruktur', advanced: 'skriver rika julber\u00e4ttelser med kulturella j\u00e4mf\u00f6relser och personliga reflektioner' },
    ],
  },

  zoo: {
    seoTitle: 'Gratis Djurparks\u00f6vningar \u00c5rskurs 2 | LessonCraftStudio',
    seoDescription: 'Utskrivbara djurparks\u00f6vningar f\u00f6r elever i \u00e5rskurs 2 (7\u20138 \u00e5r). Kartnavigering, datainsamling, pengaber\u00e4kning och informationstexter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'djurparks\u00f6vningar \u00e5rskurs 2, djurparkskarta 7\u20138 \u00e5r, datainsamling djurpark, pengaber\u00e4kning biljetter, informationstexter djur, Lgr22, multiplikation, stapeldiagram, utrotningshotade arter, klassificering',
    snippetAnswer: 'Djurparks\u00f6vningar f\u00f6r \u00e5rskurs 2 (7\u20138 \u00e5r) tr\u00e4nar kartnavigering i djurparken, datainsamling och stapeldiagram, pengaber\u00e4kning f\u00f6r biljetter och souvenirer samt l\u00e4sf\u00f6rst\u00e5else om djurarter. Multiplikation och klassificering ing\u00e5r. St\u00f6djer Lgr22. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 2 kombinerar djurparkstemat flera matematiska och naturvetenskapliga f\u00e4rdigheter. Sju- och \u00e5tta\u00e5ringar navigerar djurparkskarter med symboler och koordinater. Datainsamling fr\u00e5n ett djurparksbes\u00f6k presenteras i stapeldiagram: antal arter per kontinent, favoritdjur i klassen. Pengaber\u00e4kning \u00f6vas: intr\u00e4de, lunch, souvenirer. Multiplikation: \u201dom 3 familjer k\u00f6per 4 biljetter var\u201d. Klassificering av djur sker med flera kriterier: d\u00e4ggdjur, f\u00e5glar, reptiler, kontinent. Informationstexter om utrotningshotade arter l\u00e4ses. Eleverna skriver bes\u00f6ksrapporter med styckestruktur. Lgr22 betonar datahantering, ekologisk medvetenhet och \u00e4mnes\u00f6vergripande arbete.',
    developmentalMilestones: [
      { milestone: 'Kartnavigering med symboler och koordinater', howWeAddress: 'Djurparkskart\u00f6vningar d\u00e4r eleven planerar rutter, anv\u00e4nder teckenf\u00f6rklaring och navigerar mellan omr\u00e5den' },
      { milestone: 'Datainsamling och presentation i diagram', howWeAddress: 'Enk\u00e4ter och observationer d\u00e4r eleven samlar djurdata och presenterar i stapeldiagram' },
      { milestone: 'Pengaber\u00e4kning f\u00f6r bes\u00f6ksbudget', howWeAddress: 'Budget\u00f6vningar d\u00e4r eleven ber\u00e4knar totalkostnad f\u00f6r intr\u00e4de, mat och souvenirer' },
      { milestone: 'Informationsskrivning med fakta och struktur', howWeAddress: 'Bes\u00f6ksrapporter d\u00e4r eleven skriver organiserade stycken om djur de sett med fakta och detaljer' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd f\u00f6renklade kartor med f\u00e4rre omr\u00e5den, j\u00e4mna kronbelopp och bildbaserade skrivuppgifter. F\u00f6r avancerade elever, ge komplexa kartor med avst\u00e5ndsber\u00e4kning, l\u00e5t eleven planera en hel djurparksdag med budget och skriv argumenterande texter om djurskydd.',
    parentTakeaway: 'I \u00e5rskurs 2 kan ett djurparksbes\u00f6k bli ett l\u00e4randeprojekt. Ge barnet kartan och l\u00e5t det navigera. R\u00e4kna ut kostnaden f\u00f6r besset\u00f6ket tillsammans. L\u00e5t barnet r\u00e4kna djur och g\u00f6ra diagram hemma. L\u00e4s skyltar om djuren och diskutera: varf\u00f6r \u00e4r n\u00e5gra arter hotade? Skriv bes\u00f6ksrapport efterr\u00e5t.',
    classroomIntegration: 'Djurparkstemat i \u00e5rskurs 2 integrerar NO, SO, matematik och svenska: i NO studeras djurklassificering och utrotningshotade arter. I SO diskuteras v\u00e4rldsdelar och kartor. I matematik \u00f6vas datahantering, pengar och multiplikation. I svenska skrivs bes\u00f6ksrapporter och faktatexter. Lgr22:s m\u00e5l f\u00f6r ekologisk medvetenhet och \u00e4mnesintegration uppfylls.',
    assessmentRubric: [
      { skill: 'Kartnavigering', emerging: 'f\u00f6ljer enkel karta med st\u00f6d', proficient: 'navigerar sj\u00e4lvst\u00e4ndigt med teckenf\u00f6rklaring och koordinater', advanced: 'planerar optimala rutter och uppskattar avst\u00e5nd' },
      { skill: 'Datahantering', emerging: 'fyller i f\u00f6rgjord tabell med st\u00f6d', proficient: 'samlar data sj\u00e4lvst\u00e4ndigt och skapar stapeldiagram', advanced: 'analyserar data, drar slutsatser och presenterar resultat' },
      { skill: 'Informationsskrivning', emerging: 'skriver enstaka meningar om ett djur', proficient: 'skriver organiserade rapporter med fakta och styckestruktur', advanced: 'skriver argumenterande texter om djurskydd med underbyggda \u00e5sikter' },
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
