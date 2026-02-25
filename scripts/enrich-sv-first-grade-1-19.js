#!/usr/bin/env node
/**
 * SEO Part 292: SV First-Grade Enrichment — Themes 1-19
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the first-grade grade block of 19 SV theme files (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    seoTitle: 'Gratis Alfabet\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara alfabet\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordavkodning, meningsskrivning och alfabetisk ordning. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'alfabet\u00f6vningar \u00e5rskurs 1, ordavkodning 6\u20137 \u00e5r, meningsskrivning, alfabetisk ordning, korsord \u00e5rskurs 1, ordf\u00f6rvrngning, Lgr22 svenska, l\u00e4sflyt, stavnings\u00f6vningar, bokstavskunskap',
    snippetAnswer: 'Alfabet\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar sj\u00e4lvst\u00e4ndig ordavkodning, meningsskrivning och alfabetisk ordning. Arbetsbladen st\u00f6djer Lgr22:s m\u00e5l f\u00f6r l\u00e4sflyt och skriftlig produktion. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 \u00e4r bokst\u00e4verna inte l\u00e4ngre ett m\u00e5l utan ett verktyg. Sex- och sju\u00e5ringar har automatiserat bokstavsigenk\u00e4nning och skiftar till till\u00e4mpning: de avkodar obekanta ord sj\u00e4lvst\u00e4ndigt, skriver hela meningar med korrekt mellanrum och anv\u00e4nder alfabetisk ordning f\u00f6r att sl\u00e5 upp ord. Ordf\u00f6rvrngningar kr\u00e4ver mental manipulation av bokstavspositioner, bildkorsord kr\u00e4ver fonem-f\u00f6r-fonem analys och ordgissnings\u00f6vningar bygger inferensf\u00f6rm\u00e5ga. Skrivarbetsblad fokuserar p\u00e5 flyt och l\u00e4slighet ist\u00e4llet f\u00f6r grundl\u00e4ggande formering. Lgr22 betonar att elever i \u00e5rskurs 1 ska kunna ljuda ihop flerstaviga ord och skriva enkla texter, och dessa \u00f6vningar ger den varierade tr\u00e4ning som beh\u00f6vs.',
    developmentalMilestones: [
      { milestone: 'Sj\u00e4lvst\u00e4ndig ordavkodning (ljuda ihop flerstaviga ord utan st\u00f6d)', howWeAddress: 'Ordf\u00f6rvrngningar och korsord d\u00e4r eleven m\u00e5ste avkoda och \u00e5terskapa ord tr\u00e4nar systematisk ljudning' },
      { milestone: 'Meningsskrivning med korrekt formering och mellanrum', howWeAddress: 'Skriv\u00f6vningar som g\u00e5r fr\u00e5n enskilda ord till fullst\u00e4ndiga meningar med interpunktion' },
      { milestone: 'Alfabetisk ordning (sortera ord efter f\u00f6rsta och andra bokstav)', howWeAddress: 'Bokstavst\u00e5gs\u00f6vningar och sorteringsuppgifter d\u00e4r eleven ordnar ord alfabetiskt' },
      { milestone: 'Ordf\u00f6rr\u00e5dsutvidgning genom kontextledtr\u00e5dar', howWeAddress: 'Ordgissnings\u00f6vningar d\u00e4r eleven anv\u00e4nder bokstavs- och bildledtr\u00e5dar f\u00f6r att identifiera dolda ord' },
    ],
    differentiationNotes: 'F\u00f6r elever i \u00e5rskurs 1 som beh\u00f6ver st\u00f6d, forts\u00e4tt med korta trestaviga ord i ordf\u00f6rvrngningar, ge ordbanker vid korsord och fokusera p\u00e5 h\u00f6gfrekventa ord. F\u00f6r avancerade elever introducera flerstaviga ordf\u00f6rvrngningar utan ordbank, korsord med definitionsledtr\u00e5dar ist\u00e4llet f\u00f6r bilder och skrivuppgifter d\u00e4r eleven producerar flera meningar i styckeform.',
    parentTakeaway: 'I \u00e5rskurs 1 kan ert barn ljuda ihop de flesta ord sj\u00e4lvst\u00e4ndigt. Uppmuntra daglig l\u00e4sning av enkla b\u00f6cker och be barnet l\u00e4sa skyltar, recept och meddelanden h\u00f6gt. Spela ordspel vid matbordet: \u201dhur m\u00e5nga ord kan du hitta som b\u00f6rjar p\u00e5 S?\u201d. L\u00e5t barnet skriva korta meddelanden och inhandlingslistor. Fira varje bok barnet l\u00e4ser ut sj\u00e4lvst\u00e4ndigt.',
    classroomIntegration: 'Alfabet\u00f6vningar i \u00e5rskurs 1 anv\u00e4nds dagligen i l\u00e4s- och skrivpasset: ordf\u00f6rvrngningar som f\u00f6rl\u00e4snings\u00f6vning, korsord f\u00f6r stavningstr\u00e4ning, ords\u00f6kningar f\u00f6r visuell skanning och skriv\u00f6vningar f\u00f6r textproduktion. Lgr22:s m\u00e5l f\u00f6r l\u00e4sflyt och skrivutveckling st\u00f6ds systematiskt. Veckans fokusord \u00f6vas i pussel och skrivuppgifter tematiskt.',
    assessmentRubric: [
      { skill: 'Ordavkodning', emerging: 'ljudar ihop trestaviga ord med visst st\u00f6d', proficient: 'avkodar sj\u00e4lvst\u00e4ndigt flerstaviga ord med vanliga ljudm\u00f6nster', advanced: 'l\u00e4ser flytande med sj\u00e4lvkorrigering vid felljudning' },
      { skill: 'Meningsskrivning', emerging: 'skriver enskilda ord med korrekt formering', proficient: 'skriver fullst\u00e4ndiga meningar med mellanrum, stor bokstav och punkt', advanced: 'skriver flera sammanlnkade meningar med varierad meningsbyggnad' },
      { skill: 'Alfabetisk ordning', emerging: 'sorterar ord efter f\u00f6rsta bokstav med st\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter f\u00f6rsta och andra bokstav', advanced: 'anv\u00e4nder alfabetisk ordning f\u00f6r att navigera ordlista och register' },
    ],
  },

  animals: {
    seoTitle: 'Gratis Djur\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara djur\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Addition och subtraktion inom 20, l\u00e4sf\u00f6rst\u00e5else och klassificering. 33 generatorer. Gratis PDF.',
    seoKeywords: 'djur\u00f6vningar \u00e5rskurs 1, djur arbetsblad 6\u20137 \u00e5r, addition subtraktion 20, klassificering djur, l\u00e4sf\u00f6rst\u00e5else djur, Lgr22, ordproblem djur, stapeldiagram, datainsamling, skogsdjur',
    snippetAnswer: 'Djur\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar addition och subtraktion inom 20 med djurscenarier, klassificering efter flera kriterier och l\u00e4sf\u00f6rst\u00e5else med djurtexter. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 utvecklas djurarbetsblad fr\u00e5n konkret r\u00e4kning till riktig probleml\u00f6sning. Sex- och sju\u00e5ringar adderar och subtraherar inom tjugo med tiotals\u00f6verg\u00e5ng, l\u00e4ser korta faktatexter om djur sj\u00e4lvst\u00e4ndigt och klassificerar arter efter flera kriterier samtidigt. Ordproblem i djurkontext kr\u00e4ver att eleven tolkar en text, v\u00e4ljer r\u00e4knes\u00e4tt och skriver en tals\u00e4ts. Datainsamling introduceras: r\u00e4kna djur p\u00e5 en bild och f\u00f6ra in resultaten i en streckr\u00e4kningstabell eller ett stapeldiagram. Lgr22 betonar matematiskt resonemang och naturvetenskapligt unders\u00f6kande, och djurtemat uppfyller b\u00e5da m\u00e5len i en motiverande kontext f\u00f6r f\u00f6rsta\u00e5rselever.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion inom 20 med tiotals\u00f6verg\u00e5ng', howWeAddress: 'Ordproblem med djurscenarier d\u00e4r eleven m\u00e5ste korsa tiotalet (t.ex. 8 + 5 ekorrar) tr\u00e4nar \u00f6verg\u00e5ngsstrategier' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av korta faktatexter', howWeAddress: 'Djurfaktatexter med f\u00f6rst\u00e5elsefr\u00e5gor d\u00e4r eleven \u00e5terber\u00e4ttar och drar slutsatser' },
      { milestone: 'Klassificering efter flera kriterier samtidigt (habitat, f\u00f6da, kroppsbeklädnad)', howWeAddress: 'Sorteringstabeller d\u00e4r eleven grupperar djur efter tv\u00e5\u2013tre egenskaper och motiverar sina val' },
      { milestone: 'Enkel datainsamling och redovisning (streckr\u00e4kning, stapeldiagram)', howWeAddress: 'Aktiviteter d\u00e4r eleven r\u00e4knar djur p\u00e5 en bild och f\u00f6r in data i tabeller och diagram' },
    ],
    differentiationNotes: 'F\u00f6r elever i \u00e5rskurs 1 som beh\u00f6ver st\u00f6d, h\u00e5ll talomr\u00e5det inom 10 utan tiotals\u00f6verg\u00e5ng, ge korta enmeningstexter och begr\u00e4nsa klassificering till en egenskap. F\u00f6r avancerade elever ut\u00f6ka till addition inom 50, ge l\u00e4ngre faktatexter med inferensfr\u00e5gor och l\u00e5t eleven sj\u00e4lv v\u00e4lja klassificeringskriterier.',
    parentTakeaway: 'I \u00e5rskurs 1 kan barnet l\u00f6sa riktiga matematikproblem med djurtema hemma. St\u00e4ll fr\u00e5gor som \u201dom 12 f\u00e5glar sitter i tr\u00e4det och 5 flyger iv\u00e4g, hur m\u00e5nga \u00e4r kvar?\u201d. L\u00e4s korta djurb\u00f6cker och diskutera fakta. Skapa en djurdagbok d\u00e4r barnet ritar och skriver om djur ni sett. Bes\u00f6k p\u00e5 zoo eller i skogen f\u00f6ljs av arbetsblad som f\u00f6rl\u00e4nger upplevelsen.',
    classroomIntegration: 'Djurtemat i \u00e5rskurs 1 integreras \u00f6ver \u00e4mnena: i matematik l\u00f6ses ordproblem och data samlas in med djurbilder, i svenska l\u00e4ses faktatexter och skrivs djurber\u00e4ttelser, i NO klassificeras djur vetenskapligt. Streckr\u00e4kning av djurarter p\u00e5 skolog\u00e5rden kopplar utomhuspedagogik till Lgr22:s m\u00e5l f\u00f6r datainsamling och naturvetenskap.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion inom 20', emerging: 'l\u00f6ser uppgifter inom 10 utan tiotals\u00f6verg\u00e5ng', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 20 med djurscenarier', advanced: 'l\u00f6ser flerstegsproblem och skriver egna ordproblem med djurtema' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else av djurtexter', emerging: '\u00e5terger fakta fr\u00e5n en enmenigtext med st\u00f6d', proficient: 'svarar sj\u00e4lvst\u00e4ndigt p\u00e5 fr\u00e5gor om en kort faktatext', advanced: 'drar slutsatser och j\u00e4mf\u00f6r information fr\u00e5n flera texter' },
      { skill: 'Klassificering av djur', emerging: 'sorterar efter en egenskap med st\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter tv\u00e5 kriterier och f\u00f6rklarar', advanced: 'skapar egna klassificeringssystem och redovisar i tabell' },
    ],
  },

  birds: {
    seoTitle: 'Gratis F\u00e5gel\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara f\u00e5gel\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). R\u00e4kning inom 20, artigenk\u00e4nning och datainsamling med f\u00e5geltema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'f\u00e5gel\u00f6vningar \u00e5rskurs 1, f\u00e5glar arbetsblad 6\u20137 \u00e5r, artigenk\u00e4nning f\u00e5glar, addition subtraktion 20, datainsamling, streckr\u00e4kning, Lgr22 NO, flyttf\u00e5glar, f\u00e5gelobservation, ordproblem',
    snippetAnswer: 'F\u00e5gel\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar addition och subtraktion inom 20, artigenk\u00e4nning och datainsamling med f\u00e5gelbilder. Kopplar till Lgr22:s m\u00e5l f\u00f6r matematik och NO. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 f\u00f6rvandlas f\u00e5geltemat till vetenskapligt unders\u00f6kande. Sex- och sju\u00e5ringar r\u00e4knar f\u00e5glar vid f\u00e5gelbordet och f\u00f6r in data i streckr\u00e4kningstabeller, l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (13 f\u00e5glar minus 7) och l\u00e4ser korta faktatexter om flyttf\u00e5glar och stannf\u00e5glar. Datainsamlingen kopplas till stapeldiagram d\u00e4r eleven j\u00e4mf\u00f6r antal arter. Klassificeringsuppgifter anv\u00e4nder vetenskapliga kriterier som n\u00e4bbform, botyp och \u00e5rstidsbeteende. Svenska skolors tradition med f\u00e5gelholkar och f\u00e5gelr\u00e4kningar g\u00f6r temat extra autentiskt. Lgr22 betonar b\u00e5de dataredovisning och naturvetenskapligt unders\u00f6kande, och f\u00e5geltemat uppfyller b\u00e5da m\u00e5len.',
    developmentalMilestones: [
      { milestone: 'Datainsamling och redovisning (streckr\u00e4kning och stapeldiagram)', howWeAddress: 'F\u00e5gelr\u00e4kningsaktiviteter d\u00e4r eleven samlar data och redovisar i diagram tr\u00e4nar systematisk datainsamling' },
      { milestone: 'Addition och subtraktion inom 20 med f\u00e5gelscenarier', howWeAddress: 'Ordproblem med f\u00e5glar vid f\u00e5gelbordet tr\u00e4nar tiotals\u00f6verg\u00e5ng i meningsfull kontext' },
      { milestone: 'Artigenk\u00e4nning och vetenskaplig klassificering', howWeAddress: 'Matchnings\u00f6vningar d\u00e4r eleven parar ihop f\u00e5glar med egenskaper och kategoriserar efter n\u00e4bbtyp och boplats' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av korta faktatexter om f\u00e5glar', howWeAddress: 'F\u00e5gelfaktatexter med f\u00f6rst\u00e5elsefr\u00e5gor som kr\u00e4ver \u00e5terber\u00e4ttande och enkel slutledning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fem v\u00e4lk\u00e4nda arter (sparv, bl\u00e5mes, r\u00f6dhake, skata, duva), h\u00e5ll talomr\u00e5det inom 10 och ge bildst\u00f6d vid datainsamling. F\u00f6r avancerade elever ut\u00f6ka artlistan till 15+, l\u00e4gg till flerstegsordproblem och l\u00e5t eleven skriva egna f\u00e5gelfaktattexter.',
    parentTakeaway: 'I \u00e5rskurs 1 kan barnet driva ett eget f\u00e5gelprojekt. S\u00e4tt upp f\u00e5gelbordet och l\u00e5t barnet r\u00e4kna f\u00e5glar med streckr\u00e4kning. Rita ett stapeldiagram \u00f6ver veckans f\u00e5gelbes\u00f6k. L\u00e4s f\u00e5gelb\u00f6cker och diskutera vilka som \u00e4r flyttf\u00e5glar. St\u00e4ll ordproblem: \u201d15 sparvar satt, 8 fl\u00f6g \u2014 hur m\u00e5nga \u00e4r kvar?\u201d. Arbetsbladen f\u00f6rl\u00e4nger de verkliga observationerna.',
    classroomIntegration: 'F\u00e5geltemat i \u00e5rskurs 1 integreras med Lgr22:s \u00e4mneskrav: i matematik \u00f6vas datainsamling och r\u00e4kning med f\u00e5geldata, i svenska l\u00e4ses och skrivs faktatexter om f\u00e5glar, i NO klassificeras arter och unders\u00f6ks \u00e5rstidsbeteenden. Skolog\u00e5rdens f\u00e5gelholkar ger verklig datainsamling som redovisas i diagram p\u00e5 matematiklektionen.',
    assessmentRubric: [
      { skill: 'Datainsamling och diagramredovisning', emerging: 'r\u00e4knar f\u00e5glar och f\u00f6r streckr\u00e4kning med st\u00f6d', proficient: 'samlar sj\u00e4lvst\u00e4ndigt in data och redovisar i stapeldiagram', advanced: 'tolkar diagram, j\u00e4mf\u00f6r data och drar slutsatser om f\u00e5gelpopulationer' },
      { skill: 'Addition och subtraktion med f\u00e5gelscenarier', emerging: 'l\u00f6ser uppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med tiotals\u00f6verg\u00e5ng', advanced: 'l\u00f6ser flerstegsproblem och formul\u00e4r egna ordproblem med f\u00e5geltema' },
      { skill: 'F\u00e5gelartigenk\u00e4nning', emerging: 'namnger 4\u20135 arter med bildst\u00f6d', proficient: 'identifierar 8\u201310 arter och beskriver egenskaper', advanced: 'klassificerar arter efter vetenskapliga kriterier och motiverar muntligt' },
    ],
  },

  birthday: {
    seoTitle: 'Gratis F\u00f6delsedag\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara f\u00f6delsedag\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem inom 20, klockan, delning och skrivuppgifter. 33 generatorer. Gratis PDF.',
    seoKeywords: 'f\u00f6delsedag\u00f6vningar \u00e5rskurs 1, kalas matematik 6\u20137 \u00e5r, ordproblem f\u00f6delsedag, klockan, delning lika, skrivuppgift inbjudan, Lgr22, addition subtraktion 20, tidsl\u00e4sning, pengar',
    snippetAnswer: 'F\u00f6delsedag\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20, tidsl\u00e4sning och r\u00e4ttvis delning med festscenarier. Skrivuppgifter som inbjudningar ger meningsfull kontext. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 blir f\u00f6delsedagsmatematiken flerstegig och kopplad till vardagsf\u00e4rdigheter. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (vi k\u00f6pte 15 ballonger och 7 spr\u00e4cktes), l\u00e4ser klockan f\u00f6r att planera kalastider, och f\u00f6rdelar godis i kalas\u00e5sar med r\u00e4ttvis delning. Pengamatematik introduceras naturligt: hur mycket kostar det att k\u00f6pa tre presenter \u00e0 10 kronor? Skrivuppgifter som att f\u00f6rfat ta en f\u00f6delsedagsinbjudan eller ett tackbrev ger autentisk motivation f\u00f6r textproduktion. Lgr22 betonar vardagsmatematik, tidsl\u00e4sning och skriftlig produktion, och f\u00f6delsedagstemat uppfyller alla dessa m\u00e5l i en kontext som varje barn brinner f\u00f6r.',
    developmentalMilestones: [
      { milestone: 'Flerstegsproblem med addition och subtraktion inom 20', howWeAddress: 'Festscenarier d\u00e4r eleven f\u00f6rst adderar och sedan subtraherar (k\u00f6pte 18 ballonger, bl\u00e5ste upp 12, 3 spr\u00e4cktes) tr\u00e4nar flerstegsresonemang' },
      { milestone: 'Tidsl\u00e4sning (hel och halv timme)', howWeAddress: 'Kalasplanering d\u00e4r eleven l\u00e4ser klockan f\u00f6r start- och sluttider kopplar tid till verkliga h\u00e4ndelser' },
      { milestone: 'R\u00e4ttvis delning (tidig division)', howWeAddress: 'F\u00f6rdelning av godis, t\u00e5rtbitar och presenter lika mellan g\u00e4ster bygger konkret delningsf\u00f6rst\u00e5else' },
      { milestone: 'Skriftlig textproduktion (inbjudan, tackbrev)', howWeAddress: 'Meningsfulla skrivuppgifter d\u00e4r eleven skriver f\u00f6delsedagsinbjudningar med datum, tid och plats' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll problemen inom talomr\u00e5det 10, ge bildst\u00f6d vid delning och anv\u00e4nd enbart hela timmar vid tidsl\u00e4sning. F\u00f6r avancerade elever introducera pengar\u00e4kningar med kronor, flerstegsuppgifter med tre operationer och l\u00e5t eleven planera ett helt kalas med budget.',
    parentTakeaway: 'N\u00e4sta f\u00f6delsedag blir en hel matematiklektion! L\u00e5t barnet skriva inbjudningarna sj\u00e4lv, r\u00e4kna hur m\u00e5nga tallrikar och glas som beh\u00f6vs, f\u00f6rdela godis i kalas\u00e5sar lika och l\u00e4sa av klockan f\u00f6r start och slut. Fr\u00e5ga: \u201dom vi bj\u00f6d 8 kompisar och 3 inte kan, hur m\u00e5nga presenter beh\u00f6ver vi?\u201d. Vardagsmatematik g\u00f6r l\u00e4randet osynligt.',
    classroomIntegration: 'F\u00f6delsedagstemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem med festf\u00f6rem\u00e5l och delning, klockan \u00f6vas med kalastider, i svenska skrivs inbjudningar och tackbrev, i bild skapas f\u00f6delsedagskort. M\u00e5nadens f\u00f6delsedagsfirande kompletteras med tematiska arbetsblad i alla \u00e4mnen.',
    assessmentRubric: [
      { skill: 'Ordproblem med festscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt flerstegsproblem inom 20 med festtema', advanced: 'formulerar egna ordproblem och l\u00f6ser dem med tals\u00e4ts' },
      { skill: 'Tidsl\u00e4sning (klockan)', emerging: 'l\u00e4ser av hel timme p\u00e5 analog klocka', proficient: 'l\u00e4ser hel och halv timme och kopplar till dagsh\u00e4ndelser', advanced: 'l\u00e4ser kvart i och kvart \u00f6ver och ber\u00e4knar tidsintervall' },
      { skill: 'R\u00e4ttvis delning', emerging: 'f\u00f6rdelar med en-till-varje-metoden med st\u00f6d', proficient: 'f\u00f6rdelar sj\u00e4lvst\u00e4ndigt f\u00f6rem\u00e5l lika mellan 2\u20135 grupper', advanced: 'l\u00f6ser delning med rest och f\u00f6rklarar vad resten inneb\u00e4r' },
    ],
  },

  body: {
    seoTitle: 'Gratis Kropp\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara kropps\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). M\u00e4tning med cm, symmetri och l\u00e4sf\u00f6rst\u00e5else om kroppen. 33 generatorer. Gratis PDF.',
    seoKeywords: 'kropp\u00f6vningar \u00e5rskurs 1, m\u00e4nkroppen arbetsblad, m\u00e4tning cm, symmetri kroppen, sinnesorgan, Lgr22 NO, h\u00e4lsa \u00e5rskurs 1, skelett muskler, ordpussel kroppen, hygien',
    snippetAnswer: 'Kropps\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar m\u00e4tning i centimeter med kroppsl\u00e4ngder, symmetri med kroppens axel och l\u00e4sf\u00f6rst\u00e5else om sinnesorgan och skelett. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas kroppstemat till m\u00e4tmatematik och naturvetenskap p\u00e5 ny niv\u00e5. Sex- och sju\u00e5ringar m\u00e4ter handl\u00e4ngd, fotl\u00e4ngd och arml\u00e4ngd i centimeter med linjal, j\u00e4mf\u00f6r m\u00e5tt mellan klasskamrater och redovisar i tabeller. Kroppens symmetri unders\u00f6ks genom att rita den saknade halvan av ett ansikte eller en kropp. L\u00e4spassager om skelettets funktion, sinnesorganen och h\u00e4lsosamma vanor bygger naturvetenskapligt ordf\u00f6rr\u00e5d. Lgr22 betonar m\u00e4tning med standardenheter, kroppens biologi och h\u00e4lsa, och \u00f6vningarna kopplar alla tre m\u00e5len till barnets egen kropp som utg\u00e5ngspunkt.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning med standardenheter (cm och m)', howWeAddress: 'Eleven m\u00e4ter sin hand, fot och arm med linjal och f\u00f6r in m\u00e5tten i en tabell f\u00f6r j\u00e4mf\u00f6relse' },
      { milestone: 'Symmetrif\u00f6rst\u00e5else (kroppens spegelaxel)', howWeAddress: 'Rituppgifter d\u00e4r eleven kompletterar den saknade halvan av ett ansikte eller en kropp tr\u00e4nar rumslig symmetri' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else om kroppens funktioner (sinnesorgan, skelett)', howWeAddress: 'Korta faktatexter om sinnesorgan och skelett med f\u00f6rst\u00e5elsefr\u00e5gor bygger b\u00e5de l\u00e4sf\u00e4rdighet och NO-kunskap' },
      { milestone: 'H\u00e4lsomedvetenhet (hygien, kost, r\u00f6relse)', howWeAddress: 'Kopplingslinjer och sorteringsuppgifter om h\u00e4lsosamma val kopplar temat till vardagsbeslut' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge m\u00e4tmallar med tydliga markeringar, begr\u00e4nsa till en kroppsdel per \u00f6vning och anv\u00e4nd bildst\u00f6d i faktatexter. F\u00f6r avancerade elever l\u00e4gg till omvandling mellan cm och m, symmetri\u00f6vningar med koordinater och l\u00e4ngre texter med j\u00e4mf\u00f6relsefr\u00e5gor.',
    parentTakeaway: 'Kroppen \u00e4r det b\u00e4sta m\u00e4tverktyget hemma! L\u00e5t barnet m\u00e4ta sin l\u00e4ngd, fotl\u00e4ngd och armspann i centimeter och f\u00f6ra bok. Prata om sinnesorganen vid middag: \u201dvad k\u00e4nner du med tungan? vilka smaker finns det?\u201d. L\u00e5t barnet j\u00e4mf\u00f6ra h\u00e4nder med familjemedlemmar. Arbetsbladen kopplar till barnets egna kropp och g\u00f6r l\u00e4randet personligt.',
    classroomIntegration: 'Kroppstemat i \u00e5rskurs 1 integreras med Lgr22: i matematik m\u00e4ts kroppsdelar med linjal och data redovisas, i NO studeras sinnesorgan och skelett, i svenska l\u00e4ses och skrivs faktatexter, i idrott \u00f6vas r\u00f6relse och kroppskontroll. Veckans sinnesorgan presenteras med experiment och arbetsblad.',
    assessmentRubric: [
      { skill: 'M\u00e4tning med cm och m', emerging: 'm\u00e4ter med linjal med st\u00f6d och avl\u00e4ser med viss os\u00e4kerhet', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt i cm, f\u00f6r in resultat och j\u00e4mf\u00f6r', advanced: 'omvandlar mellan cm och m och uppskattar l\u00e4ngder innan m\u00e4tning' },
      { skill: 'Symmetri med kroppsmotiv', emerging: 'identifierar symmetrilinjen med st\u00f6d', proficient: 'ritar sj\u00e4lvst\u00e4ndigt den saknade halvan med korrekt proportioner', advanced: 'skapar egna symmetriska m\u00f6nster och f\u00f6rklarar spegelaxeln' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else om kroppen', emerging: '\u00e5terger ett faktum fr\u00e5n en kort text med st\u00f6d', proficient: 'svarar sj\u00e4lvst\u00e4ndigt p\u00e5 tre fr\u00e5gor om en faktatext', advanced: 'j\u00e4mf\u00f6r information fr\u00e5n tv\u00e5 texter och drar egna slutsatser' },
    ],
  },

  camping: {
    seoTitle: 'Gratis Camping\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara camping\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem inom 20, kartl\u00e4sning och naturkunskap med campingtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'camping\u00f6vningar \u00e5rskurs 1, camping arbetsblad 6\u20137 \u00e5r, ordproblem camping, kartl\u00e4sning, friluftsliv, Lgr22, naturkunskap, m\u00e4tning, packlista, l\u00e4sf\u00f6rst\u00e5else',
    snippetAnswer: 'Camping\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20, enkel kartl\u00e4sning och naturkunskap med campingscenarier. Kopplar till Lgr22:s m\u00e5l f\u00f6r friluftsliv och matematik. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas campingtemat till riktig probleml\u00f6sning och planeringsf\u00e4rdigheter. Sex- och sju\u00e5ringar l\u00f6ser ordproblem i campingkontext (vi hade 16 marshmallows och \u00e5t 9), l\u00e4ser enkla kartor med symboler och riktningar, och skriver packlistor med kategorisering. M\u00e4tning i centimeter \u00f6vas genom att m\u00e4ta campingutrustning. L\u00e4spassager om friluftsliv, allemansrtten och naturh\u00e4nsyn bygger b\u00e5de l\u00e4sflyt och milj\u00f6medvetenhet. Lgr22 betonar friluftsliv, orienteringsf\u00f6rm\u00e5ga och vardagsmatematik, och campingtemat knyter ihop alla tre i en kontext som elever i \u00e5rskurs 1 \u00e4lskar.',
    developmentalMilestones: [
      { milestone: 'Ordproblem med campingscenarier (addition/subtraktion inom 20)', howWeAddress: 'Realistiska campingproblem (antal pinnar, marshmallows, fiskar) tr\u00e4nar tiotals\u00f6verg\u00e5ng i motiverande kontext' },
      { milestone: 'Enkel kartl\u00e4sning med symboler och riktningar', howWeAddress: 'Campingkartor d\u00e4r eleven f\u00f6ljer riktningar och identifierar symboler bygger rumslig orientering' },
      { milestone: 'M\u00e4tning och j\u00e4mf\u00f6relse av l\u00e4ngder (cm)', howWeAddress: 'Eleven m\u00e4ter campingutrustning (rep, pinnar, t\u00e4ltpinnar) och j\u00e4mf\u00f6r resultat' },
      { milestone: 'Skriftlig planering (packlista med kategorier)', howWeAddress: 'Packlistor d\u00e4r eleven kategoriserar utrustning efter typ (mat, kl\u00e4der, verktyg) tr\u00e4nar b\u00e5de skrivande och logiskt t\u00e4nkande' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll ordproblem inom talomr\u00e5det 10, ge f\u00e4rdigritade kartor med f\u00e5 symboler och hj\u00e4lp med packlistans kategorier. F\u00f6r avancerade elever introducera flerstegsordproblem, kartl\u00e4sning med koordinatn\u00e4t och skrivuppgifter d\u00e4r eleven beskriver en campingupplevelse i styckeform.',
    parentTakeaway: 'Planera en campingtur tillsammans \u2014 p\u00e5 riktigt eller p\u00e5 l\u00e5tsas! L\u00e5t barnet skriva packlistan, r\u00e4kna hur m\u00e5nga k\u00f6ttbullar som beh\u00f6vs om varje person \u00e4ter fyra, och l\u00e4sa kartan under promenaden. St\u00e4ll fr\u00e5gor: \u201dom vi hade 14 marshmallows och \u00e5t 6, hur m\u00e5nga har vi kvar till imorgon?\u201d. Allemansrtten ger ocks\u00e5 milj\u00f6l\u00e4rdomar.',
    classroomIntegration: 'Campingtemat i \u00e5rskurs 1 kopplar till Lgr22: i matematik l\u00f6ses ordproblem och m\u00e4tning \u00f6vas med campingutrustning, i svenska skrivs packlistor och campingber\u00e4ttelser, i NO diskuteras allemansrtten och naturh\u00e4nsyn, i idrott \u00f6vas orientering. En campingdag p\u00e5 skolog\u00e5rden ger autentisk kontext f\u00f6r alla arbetsblad.',
    assessmentRubric: [
      { skill: 'Ordproblem i campingkontext', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med campingscenarier', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna ordproblem' },
      { skill: 'Kartl\u00e4sning och orientering', emerging: 'identifierar 2\u20133 kartsymboler med st\u00f6d', proficient: 'l\u00e4ser enkel karta med symboler och f\u00f6ljer riktningar', advanced: 'anv\u00e4nder koordinatn\u00e4t och ritar egen karta \u00f6ver campingplats' },
      { skill: 'M\u00e4tning med cm', emerging: 'm\u00e4ter med st\u00f6d och avl\u00e4ser ungef\u00e4rligt', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och j\u00e4mf\u00f6r l\u00e4ngder korrekt', advanced: 'uppskattar l\u00e4ngder f\u00f6re m\u00e4tning och ber\u00e4knar skillnader' },
    ],
  },

  circus: {
    seoTitle: 'Gratis Cirkus\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara cirkus\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). M\u00f6nster, symmetri och ordproblem med cirkustema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'cirkus\u00f6vningar \u00e5rskurs 1, cirkus arbetsblad 6\u20137 \u00e5r, m\u00f6nster matematik, symmetri, ordproblem cirkus, Lgr22, addition subtraktion 20, jonglering r\u00e4kning, l\u00e4sf\u00f6rst\u00e5else, sekvenser',
    snippetAnswer: 'Cirkus\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar m\u00f6nsterigenk\u00e4nning, symmetri och ordproblem inom 20 med cirkusmotiv. Jonglering och akrobatik ger visuella matematikscenarier. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 anv\u00e4nds cirkustemat f\u00f6r att tr\u00e4na m\u00f6nster, symmetri och algebraiskt t\u00e4nkande p\u00e5 inledande niv\u00e5. Sex- och sju\u00e5ringar identifierar och forts\u00e4tter m\u00f6nster med cirkusf\u00f6rem\u00e5l (boll, ring, klubba, boll, ring, ?), unders\u00f6ker symmetri i cirkusaffischer och l\u00f6ser ordproblem: clownen jonglerade med 14 bollar och tappade 6. L\u00e4spassager om cirkuskonstens historia och djurens roll v\u00e4cker etiska diskussioner. Skrivuppgifter som cirkusrecensioner och programblad ger meningsfull textproduktion. Lgr22 betonar m\u00f6nster och sekvenser som grund f\u00f6r algebraiskt t\u00e4nkande, och cirkusen erbjuder visuellt dr\u00e4gande material f\u00f6r dessa \u00f6vningar.',
    developmentalMilestones: [
      { milestone: 'M\u00f6nsterigenk\u00e4nning och forts\u00e4ttning (AB-, ABC- och ABB-m\u00f6nster)', howWeAddress: 'Sekvenser med cirkusf\u00f6rem\u00e5l d\u00e4r eleven identifierar regeln och forts\u00e4tter m\u00f6nstret' },
      { milestone: 'Symmetri (identifiera och skapa symmetriska figurer)', howWeAddress: 'Cirkusaffischer d\u00e4r eleven ritar den saknade halvan tr\u00e4nar rumslig symmetri' },
      { milestone: 'Ordproblem inom 20 med cirkusscenarier', howWeAddress: 'Jongleringsbollar, cirkusdjur och popcornf\u00f6rs\u00e4ljning ger konkreta r\u00e4knescenarier med tiotals\u00f6verg\u00e5ng' },
      { milestone: 'Skriftlig textproduktion (cirkusrecension, programblad)', howWeAddress: 'Eleven skriver korta texter om cirkusupplevelser med inledning, handling och avslutning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, b\u00f6rja med AB-m\u00f6nster med tv\u00e5 element, h\u00e5ll ordproblem inom 10 och ge symmetrimallar. F\u00f6r avancerade elever introducera AABB- och ABC-m\u00f6nster med fyra element, flerstegsproblem och l\u00e5t eleven designa egna symmetriska cirkusaffischer med f\u00f6rklaring.',
    parentTakeaway: 'Cirkustemat g\u00f6r matematik lekfull hemma! Spela jongleringsspel och r\u00e4kna bollar, skapa m\u00f6nster med leksaker p\u00e5 golvet och l\u00e5t barnet forts\u00e4tta sekvensen. St\u00e4ll fr\u00e5gor: \u201dom clownen har 15 ballonger och ger bort 8, hur m\u00e5nga har han kvar?\u201d. Efter ett cirkusbes\u00f6k kan barnet skriva en recension. Vik papper f\u00f6r att visa symmetri med cirkusmotiv.',
    classroomIntegration: 'Cirkustemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas m\u00f6nster, symmetri och ordproblem, i svenska skrivs cirkustexter och l\u00e4ses fakta om cirkushistoria, i bild skapas symmetriska affischer, i musik \u00f6vas rytm som \u00e4r en musikalisk form av m\u00f6nster. En cirkusvecka med f\u00f6rest\u00e4llning ger autentisk kontext.',
    assessmentRubric: [
      { skill: 'M\u00f6nsterigenk\u00e4nning', emerging: 'forts\u00e4tter AB-m\u00f6nster med st\u00f6d', proficient: 'identifierar och forts\u00e4tter ABC-m\u00f6nster sj\u00e4lvst\u00e4ndigt', advanced: 'skapar egna m\u00f6nster med fyra element och f\u00f6rklarar regeln' },
      { skill: 'Symmetri med cirkusmotiv', emerging: 'identifierar symmetrilinjen med st\u00f6d', proficient: 'ritar sj\u00e4lvst\u00e4ndigt den saknade halvan med korrekta proportioner', advanced: 'skapar egna symmetriska designer och f\u00f6rklarar spegelprincipen' },
      { skill: 'Ordproblem inom 20', emerging: 'l\u00f6ser enstegsuppgifter inom 10', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med cirkustema', advanced: 'l\u00f6ser flerstegsproblem och skriver egna cirkusordproblem' },
    ],
  },

  clothing: {
    seoTitle: 'Gratis Kl\u00e4d\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara kl\u00e4d\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Sortering, pengar och ordproblem med kl\u00e4dtema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'kl\u00e4d\u00f6vningar \u00e5rskurs 1, kl\u00e4der arbetsblad 6\u20137 \u00e5r, pengar matematik, sortering kategorisering, ordproblem kl\u00e4der, Lgr22, v\u00e4der kl\u00e4dval, l\u00e4sf\u00f6rst\u00e5else, skrivuppgift, \u00e5rstider',
    snippetAnswer: 'Kl\u00e4d\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar sortering, enkel pengamatematik och ordproblem med kl\u00e4dscenarier. Eleven kopplar kl\u00e4dval till v\u00e4der och \u00e5rstider. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas kl\u00e4dtemat till sortering, pengamatematik och naturkunskap om \u00e5rstider. Sex- och sju\u00e5ringar sorterar kl\u00e4dplagg efter flera kriterier (material, \u00e5rstid, kroppsdelar), l\u00f6ser ordproblem med kl\u00e4dinK\u00f6p (en tröja kostar 10 kr och en m\u00f6ssa 5 kr, hur mycket kostar b\u00e5da?) och l\u00e4ser korta texter om l\u00e4mpliga kl\u00e4dval f\u00f6r olika v\u00e4der. Skrivuppgifter som att beskriva sin favoritkl\u00e4dsel eller skriva en kl\u00e4dlista f\u00f6r en resa ger meningsfull textproduktion. Lgr22 betonar vardagsmatematik, logisk sortering och \u00e5rstidsf\u00f6rst\u00e5else, och kl\u00e4dtemat knyter ihop alla m\u00e5len med elevens vardag.',
    developmentalMilestones: [
      { milestone: 'Sortering efter flera kriterier (material, \u00e5rstid, funktion)', howWeAddress: 'Kategoriserings\u00f6vningar d\u00e4r eleven sorterar kl\u00e4der efter tv\u00e5\u2013tre egenskaper och motiverar valen' },
      { milestone: 'Enkel pengamatematik (addition med kronor)', howWeAddress: 'Kl\u00e4dbutikscenarier d\u00e4r eleven ber\u00e4knar totalpris och v\u00e4xel inom talomr\u00e5det 20' },
      { milestone: 'Koppling v\u00e4der\u2013kl\u00e4dval (naturkunskap)', howWeAddress: 'Matchnings\u00f6vningar d\u00e4r eleven v\u00e4ljer kl\u00e4der till olika v\u00e4dertyper med motivering' },
      { milestone: 'Beskrivande text om kl\u00e4der (adjektiv, detaljer)', howWeAddress: 'Skrivuppgifter d\u00e4r eleven beskriver kl\u00e4dplagg med f\u00e4rg, material och funktion' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa sortering till en egenskap, anv\u00e4nd kronor utan ören och ge bildst\u00f6d vid v\u00e4der-kl\u00e4dval. F\u00f6r avancerade elever introducera pengaräkningar med v\u00e4xel, sortering efter tre kriterier och skrivuppgifter d\u00e4r eleven j\u00e4mf\u00f6r kl\u00e4dval i olika klimat.',
    parentTakeaway: 'Kl\u00e4dtemat g\u00f6r vardagen till l\u00e4rande! L\u00e5t barnet v\u00e4lja kl\u00e4der utifr\u00e5n v\u00e4derprognosen och f\u00f6rklara varf\u00f6r. R\u00e4kna i kl\u00e4dbutiken: \u201dom tröjan kostar 15 kronor och du har 20, hur mycket f\u00e5r du tillbaka?\u201d. Sortera tv\u00e4tten tillsammans efter f\u00e4rg och storlek. L\u00e5t barnet skriva en packlista inf\u00f6r en resa. Varje kl\u00e4dval \u00e4r en \u00f6vning i logiskt t\u00e4nkande.',
    classroomIntegration: 'Kl\u00e4dtemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas sortering, pengar och ordproblem, i NO diskuteras material, v\u00e4der och \u00e5rstider, i svenska skrivs beskrivande texter och l\u00e4ses faktatexter, i slöjd unders\u00f6ks textilmaterial. V\u00e4derstationen i klassrummet kopplas dagligen till kl\u00e4dval och arbetsblad.',
    assessmentRubric: [
      { skill: 'Sortering av kl\u00e4der', emerging: 'sorterar efter en egenskap med st\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter tv\u00e5 kriterier och f\u00f6rklarar', advanced: 'skapar egna sorteringssystem med tre kriterier och motiverar' },
      { skill: 'Pengamatematik med kl\u00e4dscenarier', emerging: 'ber\u00e4knar summa av tv\u00e5 priser inom 10 kr', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt totalpris och v\u00e4xel inom 20 kr', advanced: 'l\u00f6ser flerstegsproblem med budget och j\u00e4mf\u00f6r priser' },
      { skill: 'V\u00e4der\u2013kl\u00e4dval', emerging: 'v\u00e4ljer l\u00e4mpliga kl\u00e4der f\u00f6r tv\u00e5 v\u00e4dertyper med st\u00f6d', proficient: 'motiverar kl\u00e4dval f\u00f6r alla \u00e5rstider sj\u00e4lvst\u00e4ndigt', advanced: 'j\u00e4mf\u00f6r kl\u00e4dbehov i olika klimat och skriver f\u00f6rklarande text' },
    ],
  },

  colors: {
    seoTitle: 'Gratis F\u00e4rg\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara f\u00e4rg\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). F\u00e4rgblandning, diagram och ordproblem med f\u00e4rgtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'f\u00e4rg\u00f6vningar \u00e5rskurs 1, f\u00e4rger arbetsblad 6\u20137 \u00e5r, f\u00e4rgblandning, stapeldiagram, ordproblem f\u00e4rger, Lgr22, prim\u00e4rf\u00e4rger, komplementf\u00e4rger, datainsamling, m\u00f6nster',
    snippetAnswer: 'F\u00e4rg\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar f\u00e4rgblandning, datainsamling i stapeldiagram och ordproblem med f\u00e4rgscenarier. Prim\u00e4r- och sekund\u00e4rf\u00e4rger utforskas systematiskt. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 blir f\u00e4rgtemat vetenskapligt och dataorienterat. Sex- och sju\u00e5ringar unders\u00f6ker f\u00e4rgblandning systematiskt (r\u00f6d + gul = orange, r\u00f6d + bl\u00e5 = lila), samlar in data om favoritf\u00e4rger i klassen och redovisar i stapeldiagram, och l\u00f6ser ordproblem: m\u00e5laren hade 18 r\u00f6da f\u00e4rgburkar och anv\u00e4nde 11, hur m\u00e5nga \u00e4r kvar? M\u00f6nsterigenk\u00e4nning med f\u00e4rgsekvenser bygger algebraiskt t\u00e4nkande. L\u00e4spassager om f\u00e4rgernas vetskap och konst ger tv\u00e4rvetenskaplig kunskap. Lgr22 betonar dataredovisning, m\u00f6nster och naturvetenskapligt unders\u00f6kande, och f\u00e4rgtemat levererar alla tre.',
    developmentalMilestones: [
      { milestone: 'Systematisk unders\u00f6kning av f\u00e4rgblandning (prim\u00e4r- till sekund\u00e4rf\u00e4rger)', howWeAddress: 'F\u00e4rgblandningsdiagram d\u00e4r eleven f\u00f6ruts\u00e4ger resultat och j\u00e4mf\u00f6r med verkligheten' },
      { milestone: 'Datainsamling och stapeldiagram', howWeAddress: 'Klassenk\u00e4ter om favoritf\u00e4rger som redovisas i stapeldiagram med j\u00e4mf\u00f6relsefr\u00e5gor' },
      { milestone: 'M\u00f6nsterigenk\u00e4nning med f\u00e4rgsekvenser', howWeAddress: 'F\u00e4rgm\u00f6nster (r\u00f6d, bl\u00e5, r\u00f6d, bl\u00e5, ?) d\u00e4r eleven identifierar regeln och forts\u00e4tter' },
      { milestone: 'Ordproblem inom 20 med f\u00e4rgkontext', howWeAddress: 'Konkreta scenarier med f\u00e4rgpennor, f\u00e4rgburkar och p\u00e4rlor tr\u00e4nar tiotals\u00f6verg\u00e5ng' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre prim\u00e4rf\u00e4rger, ge f\u00f6rifyllda diagrammallar och h\u00e5ll ordproblem inom 10. F\u00f6r avancerade elever introducera tert\u00e4rf\u00e4rger, dubbeldiagram d\u00e4r tv\u00e5 datam\u00e4ngder j\u00e4mf\u00f6rs och skrivuppgifter d\u00e4r eleven f\u00f6rklarar f\u00e4rgblandningsvetenskap.',
    parentTakeaway: 'F\u00e4rger finns \u00f6verallt hemma! M\u00e5la med vattenfärger och l\u00e5t barnet f\u00f6ruts\u00e4ga vad som h\u00e4nder n\u00e4r tv\u00e5 f\u00e4rger blandas. G\u00f6r en favoritf\u00e4rgenk\u00e4t i familjen och rita ett stapeldiagram p\u00e5 kylsk\u00e5pet. R\u00e4kna f\u00e4rgpennor: \u201dhur m\u00e5nga bl\u00e5 har du? hur m\u00e5nga fler r\u00f6da \u00e4n gr\u00f6na?\u201d. L\u00e5t barnet skapa m\u00f6nster med p\u00e4rlor och ber\u00e4tta om regeln.',
    classroomIntegration: 'F\u00e4rgtemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas diagram, m\u00f6nster och ordproblem med f\u00e4rgdata, i NO unders\u00f6ks f\u00e4rgblandning experimentellt, i bild skapas konst med f\u00e4rglära, i svenska skrivs beskrivande texter om f\u00e4rger. Klassenk\u00e4ter om favoritf\u00e4rger ger autentisk datainsamling.',
    assessmentRubric: [
      { skill: 'F\u00e4rgblandningsf\u00f6rst\u00e5else', emerging: 'blandar tv\u00e5 f\u00e4rger och namnger resultatet med st\u00f6d', proficient: 'f\u00f6ruts\u00e4ger sj\u00e4lvst\u00e4ndigt resultat av prim\u00e4rf\u00e4rgblandning', advanced: 'f\u00f6rklarar f\u00e4rghjulet och skapar m\u00e5lmedvetna f\u00e4rgkombinationer' },
      { skill: 'Stapeldiagram och datainsamling', emerging: 'f\u00f6r in data i f\u00f6rifylld mall med st\u00f6d', proficient: 'skapar sj\u00e4lvst\u00e4ndigt stapeldiagram och besvarar j\u00e4mf\u00f6relsefr\u00e5gor', advanced: 'tolkar diagram, ber\u00e4knar skillnader och drar slutsatser' },
      { skill: 'M\u00f6nsterigenk\u00e4nning med f\u00e4rger', emerging: 'forts\u00e4tter AB-m\u00f6nster med st\u00f6d', proficient: 'identifierar och forts\u00e4tter ABC-m\u00f6nster sj\u00e4lvst\u00e4ndigt', advanced: 'skapar egna komplexa m\u00f6nster och formulerar regeln' },
    ],
  },

  construction: {
    seoTitle: 'Gratis Bygg\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara bygg\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Geometri, m\u00e4tning och ordproblem med byggtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'bygg\u00f6vningar \u00e5rskurs 1, konstruktion arbetsblad 6\u20137 \u00e5r, geometri, m\u00e4tning cm, ordproblem byggarbetsplats, Lgr22, 2D-former, 3D-former, teknik, bygginstruktion',
    snippetAnswer: 'Bygg\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar geometriska former, m\u00e4tning i cm och ordproblem p\u00e5 byggarbetsplatsen. 2D- och 3D-former identifieras i byggnader. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas byggtemat till geometri och m\u00e4tning p\u00e5 ny niv\u00e5. Sex- och sju\u00e5ringar identifierar 2D-former (kvadrat, rektangel, triangel, cirkel) i byggnader och konstruktioner, m\u00e4ter byggobjekt i centimeter, och l\u00f6ser ordproblem p\u00e5 byggarbetsplatsen (arbetarna hade 17 plankor och anv\u00e4nde 9). 3D-former introduceras genom att koppla kloss, cylinder och kon till verkliga byggmaterial. Instruktionsskrivning \u2014 \u201dbygga en bro i tre steg\u201d \u2014 tr\u00e4nar b\u00e5de textproduktion och sekventiellt t\u00e4nkande. Lgr22 betonar geometrisk f\u00f6rst\u00e5else, m\u00e4tning och teknikens arbetsprocess, och byggtemat levererar alla tre m\u00e5len.',
    developmentalMilestones: [
      { milestone: 'Identifiering av 2D- och 3D-former i verkliga byggnader', howWeAddress: '\u00d6vningar d\u00e4r eleven ringar in former i bilder p\u00e5 byggnader och namnger dem korrekt' },
      { milestone: 'M\u00e4tning med linjal (cm) av byggmaterial', howWeAddress: 'Eleven m\u00e4ter och j\u00e4mf\u00f6r l\u00e4ngder p\u00e5 klossar, plankor och brodelar' },
      { milestone: 'Ordproblem med byggarbetsplatsscenarier', howWeAddress: 'Konkreta problem med byggmaterial tr\u00e4nar addition och subtraktion inom 20 med tiotals\u00f6verg\u00e5ng' },
      { milestone: 'Instruktionsskrivning (bygginstruktion i steg)', howWeAddress: 'Eleven skriver ordnade instruktioner f\u00f6r att bygga en enkel konstruktion, tr\u00e4nar sekvensiellt t\u00e4nkande' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, fokusera p\u00e5 fyra 2D-former, ge m\u00e4tmallar och h\u00e5ll ordproblem inom 10. F\u00f6r avancerade elever introducera fler 3D-former (pyramid, prisma), m\u00e4tning med omvandling cm/m och skrivuppgifter d\u00e4r eleven designar och beskriver en byggnad med m\u00e5tt.',
    parentTakeaway: 'Byggtemat lever hemma! Bygg med klossar och fr\u00e5ga: \u201dhur m\u00e5nga rektanglar ser du i v\u00e5rt hus? vilka former har taket och f\u00f6nstren?\u201d. M\u00e4t klossar med linjal. L\u00e5t barnet skriva en bygginstruktion i tre steg. St\u00e4ll ordproblem: \u201dom vi beh\u00f6ver 14 klossar och har 8, hur m\u00e5nga fattas?\u201d. Varje byggprojekt \u00e4r en geometrilektion.',
    classroomIntegration: 'Byggtemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas geometri, m\u00e4tning och ordproblem, i teknik bygger eleven modeller och dokumenterar processen, i svenska skrivs instruktioner och beskrivningar, i bild ritas byggnader med geometriska former. Byggh\u00f6rna i klassrummet ger daglig koppling till temat.',
    assessmentRubric: [
      { skill: 'Geometrisk formigenk\u00e4nning', emerging: 'namnger fyra 2D-former med st\u00f6d', proficient: 'identifierar sj\u00e4lvst\u00e4ndigt 2D- och enkla 3D-former i bilder', advanced: 'beskriver formers egenskaper (sidor, h\u00f6rn) och hittar dem i omgivningen' },
      { skill: 'M\u00e4tning av byggobjekt', emerging: 'm\u00e4ter med linjal med viss os\u00e4kerhet', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt och j\u00e4mf\u00f6r l\u00e4ngder korrekt i cm', advanced: 'uppskattar m\u00e5tt, m\u00e4ter och ber\u00e4knar skillnader' },
      { skill: 'Instruktionsskrivning', emerging: 'skriver tv\u00e5 steg med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt tre ordnade steg med numrering', advanced: 'skriver detaljerade instruktioner med m\u00e5tt och material\u00f6versikt' },
    ],
  },

  cooking: {
    seoTitle: 'Gratis Matlagnings\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara matlagnings\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Br\u00e5k, m\u00e4tning och receptl\u00e4sning med kökstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'matlagnings\u00f6vningar \u00e5rskurs 1, matlagning arbetsblad 6\u20137 \u00e5r, br\u00e5k halva fj\u00e4rdedel, m\u00e4tning dl, receptl\u00e4sning, Lgr22, ordproblem k\u00f6k, h\u00e4lsa kost, instruktionsskrivning, ingredienser',
    snippetAnswer: 'Matlagnings\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar br\u00e5k (halva, fj\u00e4rdedel), m\u00e4tning med dl och receptl\u00e4sning. K\u00f6ksmatematik g\u00f6r abstrakt matematik konkret. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 blir k\u00f6ket ett matematiklaboratorium. Sex- och sju\u00e5ringar m\u00e4ter ingredienser i deciliter, delar deg och frukt i halvor och fj\u00e4rdedelar, och l\u00e4ser enkla recept som flerstegsuppgifter. Ordproblem kopplas till verkliga k\u00f6ksscenarier: receptet kr\u00e4ver 3 dl mj\u00f6l men vi har bara 1 dl, hur mycket fattas? Instruktionsskrivning \u00f6vas genom att eleven skriver egna recept med numrerade steg. Lgr22 betonar br\u00e5kf\u00f6rst\u00e5else, m\u00e4tning med enheter och skriftlig textproduktion, och matlagningstemat knyter ihop matematiken med h\u00e4lsa och praktiska f\u00e4rdigheter.',
    developmentalMilestones: [
      { milestone: 'Br\u00e5kf\u00f6rst\u00e5else (halva och fj\u00e4rdedel med konkret material)', howWeAddress: 'Eleven delar matvaror (pizza, \u00e4pple, deg) i halvor och fj\u00e4rdedelar och namnger delarna' },
      { milestone: 'M\u00e4tning med dl (volym)', howWeAddress: 'Receptuppgifter d\u00e4r eleven avl\u00e4ser och j\u00e4mf\u00f6r volymer i deciliter' },
      { milestone: 'Receptl\u00e4sning (flerstegs instruktionstext)', howWeAddress: 'Eleven l\u00e4ser enkla recept och ordnar stegen i r\u00e4tt f\u00f6ljd' },
      { milestone: 'Instruktionsskrivning (eget recept med steg)', howWeAddress: 'Skrivuppgifter d\u00e4r eleven f\u00f6rfat tar ett recept med ingredienslista och numrerade steg' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till halva (ej fj\u00e4rdedel), anv\u00e4nd bilder av m\u00e5ttk\u00e4rl och ge recept med tre steg. F\u00f6r avancerade elever introducera tredjedelar, dubblering och halvering av recept och l\u00e5t eleven skriva egna recept med exakta m\u00e5tt.',
    parentTakeaway: 'Laga mat tillsammans och r\u00e4kna! L\u00e5t barnet m\u00e4ta mj\u00f6l och mj\u00f6lk i dl, dela deg i lika delar och l\u00e4sa receptet h\u00f6gt. Fr\u00e5ga: \u201dom vi beh\u00f6ver 4 dl och har m\u00e4tt 2, hur m\u00e5nga dl mer beh\u00f6vs?\u201d. L\u00e5t barnet skriva receptet efteråt. Br\u00e5k blir begripligt n\u00e4r barnet h\u00e5ller en halv pizza i handen.',
    classroomIntegration: 'Matlagningstemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas br\u00e5k och m\u00e4tning med k\u00f6ksscenarier, i svenska l\u00e4ses och skrivs recept, i NO diskuteras n\u00e4ring och h\u00e4lsa, i hemkunskap lagas verklig mat. En receptbok som klassprojekt f\u00f6renar alla \u00e4mnen.',
    assessmentRubric: [
      { skill: 'Br\u00e5kf\u00f6rst\u00e5else (halva, fj\u00e4rdedel)', emerging: 'delar i halva med st\u00f6d och namnger', proficient: 'delar sj\u00e4lvst\u00e4ndigt i halvor och fj\u00e4rdedelar och j\u00e4mf\u00f6r storlekar', advanced: 'l\u00f6ser br\u00e5kuppgifter och kopplar till konkreta scenarier' },
      { skill: 'M\u00e4tning med dl', emerging: 'avl\u00e4ser volym med st\u00f6d av bild', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt i dl och j\u00e4mf\u00f6r volymer', advanced: 'ber\u00e4knar skillnader och dubblerar recept' },
      { skill: 'Receptl\u00e4sning och instruktionsskrivning', emerging: 'l\u00e4ser ett recept med tre steg med st\u00f6d', proficient: 'l\u00e4ser och f\u00f6ljer recept sj\u00e4lvst\u00e4ndigt, skriver eget', advanced: 'skriver detaljerat recept med ingredienslista och tidsangivelser' },
    ],
  },

  dinosaurs: {
    seoTitle: 'Gratis Dinosaurie\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara dinosaurie\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). M\u00e4tning, j\u00e4mf\u00f6relse och l\u00e4sf\u00f6rst\u00e5else med dinosaurietema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'dinosaurie\u00f6vningar \u00e5rskurs 1, dinosaurier arbetsblad 6\u20137 \u00e5r, m\u00e4tning j\u00e4mf\u00f6relse, l\u00e4sf\u00f6rst\u00e5else dinosaurier, Lgr22, tidslinje, ordproblem, klassificering, fossiler, v\u00e4xt\u00e4tare rov\u00e4tare',
    snippetAnswer: 'Dinosaurie\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar m\u00e4tning, storleksj\u00e4mf\u00f6relse och l\u00e4sf\u00f6rst\u00e5else med dinosauriekontext. Klassificering av v\u00e4xt\u00e4tare och rov\u00e4tare st\u00e4rker naturvetenskapligt t\u00e4nkande. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kanaliseras dinosaurieintresset till rigorösa j\u00e4mf\u00f6relser och vetenskapligt t\u00e4nkande. Sex- och sju\u00e5ringar j\u00e4mf\u00f6r dinosauriers l\u00e4ngder i meter (T. rex 12 m, Triceratops 9 m \u2014 hur mycket l\u00e4ngre?), l\u00e4ser korta faktatexter om utd\u00f6da arter och klassificerar dem som v\u00e4xt\u00e4tare eller rov\u00e4tare. Tidslinjer introducerar historiskt t\u00e4nkande: triasperioden, juraperioden, kritaperioden. Ordproblem med dinosaurietal (en Stegosaurus hade 17 plattor och tappade 5) tr\u00e4nar tiotals\u00f6verg\u00e5ng. Lgr22 betonar j\u00e4mf\u00f6relse, tidsf\u00f6rst\u00e5else och vetenskaplig klassificering, och dinosaurier \u00e4r den mest motiverande kontexten f\u00f6r dessa f\u00e4rdigheter.',
    developmentalMilestones: [
      { milestone: 'Storleksj\u00e4mf\u00f6relse med m\u00e5tt (l\u00e4ngre, kortare, skillnad)', howWeAddress: 'J\u00e4mf\u00f6relsetabeller d\u00e4r eleven j\u00e4mf\u00f6r dinosauriers l\u00e4ngder och ber\u00e4knar skillnader' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av faktatexter (dinosauriefakta)', howWeAddress: 'Korta l\u00e4spassager om dinosauriearter med f\u00f6rst\u00e5elsefr\u00e5gor och ordpussel' },
      { milestone: 'Klassificering (v\u00e4xt\u00e4tare, rov\u00e4tare, allätare)', howWeAddress: 'Sorteringsuppgifter d\u00e4r eleven grupperar dinosaurier efter kost och motiverar valet' },
      { milestone: 'Tidsf\u00f6rst\u00e5else (tidslinjer med geologiska perioder)', howWeAddress: 'Enkla tidslinjer d\u00e4r eleven placerar dinosaurier i r\u00e4tt period och f\u00f6rst\u00e5r sekvens' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fem v\u00e4lk\u00e4nda arter, anv\u00e4nd bilder med tydliga egenskaper och h\u00e5ll j\u00e4mf\u00f6relser inom sm\u00e5 tal. F\u00f6r avancerade elever l\u00e4gg till fler arter med detaljerade fakta, ber\u00e4kning av storleksskillnader i meter och skrivuppgifter d\u00e4r eleven f\u00f6rfat tar en dinosauriefaktatext.',
    parentTakeaway: 'Dinosaurieintresset \u00e4r guld v\u00e4rt f\u00f6r l\u00e4rande! J\u00e4mf\u00f6r dinosauriers storlek med vardagsting: \u201dT. rex var 12 meter, v\u00e5rt vardagsrum \u00e4r 5 meter \u2014 hur m\u00e5nga vardagsrum l\u00e5ng?\u201d. L\u00e4s fakta och st\u00e4ll fr\u00e5gor: \u201d\u00e4t han v\u00e4xter eller k\u00f6tt? hur vet vi det?\u201d. Bes\u00f6k naturhistoriska museet. L\u00e5t barnet skriva en dinosauriebok.',
    classroomIntegration: 'Dinosaurietemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas m\u00e4tning, j\u00e4mf\u00f6relse och ordproblem, i NO klassificeras arter och studeras utd\u00f6ende, i svenska l\u00e4ses och skrivs faktatexter, i historia introduceras tidslinjer och geologiska perioder. Ett dinosaurieprojekt f\u00f6renar alla \u00e4mnen under flera veckor.',
    assessmentRubric: [
      { skill: 'Storleksj\u00e4mf\u00f6relse och m\u00e4tning', emerging: 'j\u00e4mf\u00f6r tv\u00e5 dinosaurier med \u201dl\u00e4ngre/kortare\u201d med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt skillnader i meter och ordnar efter storlek', advanced: 'j\u00e4mf\u00f6r med vardagsl\u00e4ngder och ber\u00e4knar proportioner' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else om dinosaurier', emerging: '\u00e5terger ett faktum fr\u00e5n en kort text med st\u00f6d', proficient: 'svarar sj\u00e4lvst\u00e4ndigt p\u00e5 fr\u00e5gor och drar enkla slutsatser', advanced: 'j\u00e4mf\u00f6r fakta fr\u00e5n olika texter och formulerar egna frågor' },
      { skill: 'Klassificering (v\u00e4xt\u00e4tare/rov\u00e4tare)', emerging: 'sorterar med bildst\u00f6d i tv\u00e5 grupper', proficient: 'klassificerar sj\u00e4lvst\u00e4ndigt och anger motivering', advanced: 'introducerar kategorin all\u00e4tare och f\u00f6rklarar \u00f6verg\u00e5ngar mellan grupper' },
    ],
  },

  easter: {
    seoTitle: 'Gratis P\u00e5sk\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara p\u00e5sk\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem, symmetri och l\u00e4sf\u00f6rst\u00e5else med p\u00e5sktema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'p\u00e5sk\u00f6vningar \u00e5rskurs 1, p\u00e5sk arbetsblad 6\u20137 \u00e5r, symmetri p\u00e5sk\u00e4gg, ordproblem, delning lika, Lgr22, p\u00e5sktraditioner, l\u00e4sf\u00f6rst\u00e5else, m\u00f6nster, skriv\u00f6vning',
    snippetAnswer: 'P\u00e5sk\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20, symmetri med p\u00e5sk\u00e4ggsm\u00f6nster och l\u00e4sf\u00f6rst\u00e5else om svenska p\u00e5sktraditioner. Delning lika med godis \u00f6vas. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas p\u00e5sktemat till flerstegsmatematik och kulturell l\u00e4sf\u00f6rst\u00e5else. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med p\u00e5sk\u00e4gg och godis (hittade 18 \u00e4gg, gav bort 7), skapar symmetriska m\u00f6nster p\u00e5 p\u00e5sk\u00e4gg och f\u00f6rdelar godis lika i p\u00e5sk\u00e5sar. L\u00e4spassager om svenska p\u00e5sktraditioner \u2014 p\u00e5skkärringar, p\u00e5skriset och p\u00e5skelden \u2014 bygger kulturell kunskap. Skrivuppgifter som p\u00e5skbrev och p\u00e5skhälsningar ger meningsfull textproduktion. Lgr22 betonar kulturf\u00f6rst\u00e5else, symmetri och vardagsmatematik, och p\u00e5sktemat f\u00f6renar alla tre i en \u00e5rlig fest som alla barn k\u00e4nner till.',
    developmentalMilestones: [
      { milestone: 'Ordproblem med p\u00e5skscenarier (addition/subtraktion inom 20)', howWeAddress: 'Realistiska p\u00e5skscenarier (samla \u00e4gg, f\u00f6rdela godis) tr\u00e4nar flerstegsresonemang med tiotals\u00f6verg\u00e5ng' },
      { milestone: 'Symmetri med p\u00e5sk\u00e4ggsm\u00f6nster', howWeAddress: 'Eleven dekorerar p\u00e5sk\u00e4gg med symmetriska m\u00f6nster och kompletterar den saknade halvan' },
      { milestone: 'R\u00e4ttvis delning (godis i p\u00e5sk\u00e5sar)', howWeAddress: 'F\u00f6rdelningsuppgifter d\u00e4r eleven delar godis lika mellan p\u00e5sk\u00e5sar' },
      { milestone: 'Kulturell l\u00e4sf\u00f6rst\u00e5else (svenska p\u00e5sktraditioner)', howWeAddress: 'L\u00e4spassager om p\u00e5sktraditioner med f\u00f6rst\u00e5elsefr\u00e5gor som kr\u00e4ver \u00e5terber\u00e4ttande' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll ordproblem inom 10, ge symmetrimallar och begr\u00e4nsa delning till tv\u00e5 grupper. F\u00f6r avancerade elever l\u00e4gg till flerstegsproblem, komplexa symmetrim\u00f6nster med fyra sektorer och skrivuppgifter d\u00e4r eleven j\u00e4mf\u00f6r p\u00e5sktraditioner i olika l\u00e4nder.',
    parentTakeaway: 'P\u00e5sken \u00e4r en matematikfest hemma! L\u00e5t barnet r\u00e4kna \u00e4gg vid \u00e4ggs\u00f6kningen, f\u00f6rdela godis i p\u00e5sk\u00e5sar lika och dekorera \u00e4gg med symmetriska m\u00f6nster. L\u00e4s om p\u00e5sktraditioner och l\u00e5t barnet ber\u00e4tta f\u00f6r morfar vad p\u00e5skk\u00e4rringarna g\u00f6r. Fr\u00e5ga: \u201dhittade 16 \u00e4gg, gav 7 till syster \u2014 hur m\u00e5nga har du kvar?\u201d',
    classroomIntegration: 'P\u00e5sktemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas ordproblem, symmetri och delning, i svenska l\u00e4ses och skrivs p\u00e5sktexter, i SO diskuteras traditioner, i bild skapas symmetriska p\u00e5sk\u00e4gg. P\u00e5skveckan ger intensiv temabaserad undervisning d\u00e4r alla \u00e4mnen knyts till p\u00e5sken.',
    assessmentRubric: [
      { skill: 'Ordproblem med p\u00e5sktema', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med p\u00e5skscenarier', advanced: 'formulerar egna flerstegsproblem och l\u00f6ser dem med tals\u00e4tser' },
      { skill: 'Symmetri med p\u00e5sk\u00e4gg', emerging: 'identifierar symmetrilinjen med st\u00f6d', proficient: 'skapar sj\u00e4lvst\u00e4ndigt symmetriska m\u00f6nster med korrekt spegling', advanced: 'designar komplexa symmetriska m\u00f6nster och f\u00f6rklarar principen' },
      { skill: 'R\u00e4ttvis delning av godis', emerging: 'f\u00f6rdelar med en-till-varje-metoden med st\u00f6d', proficient: 'f\u00f6rdelar sj\u00e4lvst\u00e4ndigt lika mellan 2\u20135 p\u00e5sar', advanced: 'hanterar rest och f\u00f6rklarar l\u00f6sningen' },
    ],
  },

  emotions: {
    seoTitle: 'Gratis K\u00e4nslo\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara k\u00e4nslo\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Diagram, l\u00e4sf\u00f6rst\u00e5else och skrivuppgifter om k\u00e4nslor. 33 generatorer. Gratis PDF.',
    seoKeywords: 'k\u00e4nslo\u00f6vningar \u00e5rskurs 1, k\u00e4nslor arbetsblad 6\u20137 \u00e5r, diagram k\u00e4nslor, l\u00e4sf\u00f6rst\u00e5else empati, Lgr22, socialt l\u00e4rande, skrivuppgift k\u00e4nslor, konflikthhantering, sj\u00e4lvreglering, k\u00e4nsloord',
    snippetAnswer: 'K\u00e4nslo\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar k\u00e4nsloigenk\u00e4nning, diagram \u00f6ver k\u00e4nslor och skrivuppgifter om empati. L\u00e4spassager om sociala situationer bygger sj\u00e4lvreglering. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 f\u00f6rdjupas k\u00e4nsloarbetet med l\u00e4sning, skrivning och dataanalys. Sex- och sju\u00e5ringar l\u00e4ser korta ber\u00e4ttelser om sociala situationer och identifierar karaktärernas k\u00e4nslor, skriver om egna upplevelser kopplat till specifika k\u00e4nslor och samlar in data om klassens humör i stapeldiagram. K\u00e4nsloordförr\u00e5det ut\u00f6kas fr\u00e5n grundl\u00e4ggande (glad, ledsen) till nyanserade ord (frustrerad, stolt, otålig). Lgr22 betonar social kompetens, l\u00e4sf\u00f6rst\u00e5else och dataredovisning, och k\u00e4nslotemat f\u00f6renar alla tre i en kontext som st\u00e4rker b\u00e5de akademiska och sociala f\u00e4rdigheter.',
    developmentalMilestones: [
      { milestone: 'Nyanserat k\u00e4nsloordförr\u00e5d (10+ k\u00e4nsloord)', howWeAddress: 'Matchnings\u00f6vningar d\u00e4r eleven kopplar ansiktsuttryck till nyanserade k\u00e4nsloord som frustrerad, stolt och \u00e5ngerful' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av sociala ber\u00e4ttelser', howWeAddress: 'Korta ber\u00e4ttelser d\u00e4r eleven identifierar karaktärernas k\u00e4nslor och f\u00f6resl\u00e5r l\u00f6sningar' },
      { milestone: 'Datainsamling om k\u00e4nslor (stapeldiagram)', howWeAddress: 'Humor\u00f6versikter d\u00e4r klassen samlar in data om dagsk\u00e4nslor och redovisar i diagram' },
      { milestone: 'Skriftligt uttryck av egna k\u00e4nslor', howWeAddress: 'Skrivuppgifter d\u00e4r eleven ber\u00e4ttar om en situation som v\u00e4ckte en specifik k\u00e4nsla' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till sex grundk\u00e4nslor med tydliga ansiktsbilder, ge meningsstarter vid skrivuppgifter och anv\u00e4nd f\u00f6rifylld diagrammall. F\u00f6r avancerade elever l\u00e4gg till komplexa k\u00e4nsloord, l\u00e4spassager med flera karaktärer och skrivuppgifter d\u00e4r eleven analyserar orsak och verkan i sociala situationer.',
    parentTakeaway: 'Prata om k\u00e4nslor hemma \u2014 det st\u00e4rker b\u00e5de empati och ordförr\u00e5d! Namnge k\u00e4nslor i vardagen: \u201djag ser att du \u00e4r frustrerad, kan du ber\u00e4tta varf\u00f6r?\u201d. L\u00e4s ber\u00e4ttelser och fr\u00e5ga vad karaktären k\u00e4nner. L\u00e5t barnet rita en k\u00e4nslotermometer och markera dagens humör. Skapa en k\u00e4nslodagbok d\u00e4r barnet skriver en mening om vad som h\u00e4nde och hur det k\u00e4ndes.',
    classroomIntegration: 'K\u00e4nslotemat i \u00e5rskurs 1 integreras med Lgr22: i matematik samlas k\u00e4nslodata och redovisas i diagram, i svenska l\u00e4ses ber\u00e4ttelser och skrivs reflekterande texter, i SO diskuteras rttigheter, empati och konflikthantering. Morgonsamlingen med k\u00e4nsloincheckning ger daglig koppling till temat.',
    assessmentRubric: [
      { skill: 'K\u00e4nsloordförr\u00e5d', emerging: 'namnger 4\u20135 grundk\u00e4nslor med bildst\u00f6d', proficient: 'anv\u00e4nder sj\u00e4lvst\u00e4ndigt 8\u201310 k\u00e4nsloord i r\u00e4tt kontext', advanced: 'anv\u00e4nder nyanserade k\u00e4nsloord och f\u00f6rklarar nyansskillnader' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else av sociala ber\u00e4ttelser', emerging: 'identifierar huvudkaraktärens k\u00e4nsla med st\u00f6d', proficient: 'identifierar sj\u00e4lvst\u00e4ndigt k\u00e4nslor och f\u00f6resl\u00e5r l\u00f6sning', advanced: 'analyserar orsak-verkan och f\u00f6rst\u00e5r flera perspektiv' },
      { skill: 'Dataredovisning av k\u00e4nslor', emerging: 'f\u00f6r in data i f\u00f6rifylld mall med st\u00f6d', proficient: 'skapar sj\u00e4lvst\u00e4ndigt stapeldiagram och besvarar fr\u00e5gor', advanced: 'tolkar diagram och drar slutsatser om m\u00f6nster \u00f6ver tid' },
    ],
  },

  'fairy-tales': {
    seoTitle: 'Gratis Sago\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara sago\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). L\u00e4sf\u00f6rst\u00e5else, ber\u00e4ttelsestruktur och ordpussel med sagotema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'sago\u00f6vningar \u00e5rskurs 1, sagor arbetsblad 6\u20137 \u00e5r, l\u00e4sf\u00f6rst\u00e5else sagor, ber\u00e4ttelsestruktur, ordpussel saga, Lgr22 svenska, karaktärer, h\u00e4ndelse, sekvensering, skrivuppgift',
    snippetAnswer: 'Sago\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar l\u00e4sf\u00f6rst\u00e5else, ber\u00e4ttelsestruktur (b\u00f6rjan\u2013mitten\u2013slut) och ordpussel med sagomotiv. Eleven sekvenserar h\u00e4ndelser och skriver egna sagoslut. Gratis PDF p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas sagotemat till l\u00e4sf\u00f6rst\u00e5elsestrategier och skriftlig textproduktion. Sex- och sju\u00e5ringar l\u00e4ser korta versioner av klassiska sagor sj\u00e4lvst\u00e4ndigt, identifierar ber\u00e4ttelsestrukturens delar (b\u00f6rjan, mitten, slut), sekvenserar h\u00e4ndelser i r\u00e4tt ordning och svarar p\u00e5 f\u00f6rst\u00e5elsefr\u00e5gor om karaktärer, h\u00e4ndelser och moral. Skrivuppgifter g\u00e5r bortom enskilda meningar: eleven f\u00f6rfat tar egna sagoslut eller korta sagober\u00e4ttelser med tydlig struktur. Ordpussel med sagoordförr\u00e5d bygger stavning och l\u00e4sf\u00e4rdighet. Lgr22 betonar ber\u00e4ttande texter, l\u00e4sf\u00f6rst\u00e5else och skriftlig produktion, och sagotemat \u00e4r den perfekta genren f\u00f6r alla tre m\u00e5len.',
    developmentalMilestones: [
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av ber\u00e4ttande text (karaktär, h\u00e4ndelse, l\u00f6sning)', howWeAddress: 'Korta sagor med f\u00f6rst\u00e5elsefr\u00e5gor d\u00e4r eleven identifierar huvudkaraktär, problem och l\u00f6sning' },
      { milestone: 'Sekvensering av h\u00e4ndelser (b\u00f6rjan\u2013mitten\u2013slut)', howWeAddress: 'Klipp-och-klistra-\u00f6vningar d\u00e4r eleven ordnar sagoh\u00e4ndelser i kronologisk ordning' },
      { milestone: 'Skriftlig textproduktion (eget sagoslut eller kort saga)', howWeAddress: 'Skrivuppgifter d\u00e4r eleven skriver ett alternativt slut p\u00e5 en k\u00e4nd saga med inledning och avslutning' },
      { milestone: 'Ordförr\u00e5d fr\u00e5n sagor (trollkarl, prinsessa, drake)', howWeAddress: 'Ords\u00f6kningar och korsord med sagoordförr\u00e5d bygger stavning och visuell ordigenk\u00e4nning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd k\u00e4nda sagor med tre h\u00e4ndelser, ge meningsstarter vid skrivning och begr\u00e4nsa ordpussel till fem ord. F\u00f6r avancerade elever introducera l\u00e4ngre sagor med sidohandlingar, l\u00e5t eleven j\u00e4mf\u00f6ra versioner av samma saga och skriva egna kompletta sagor med karaktärsbeskrivning.',
    parentTakeaway: 'L\u00e4s sagor varje kv\u00e4ll och st\u00e4ll fr\u00e5gor efteråt: \u201dvem var snlast? vad var problemet? hur l\u00f6ste det sig?\u201d. L\u00e5t barnet \u00e5terber\u00e4tta sagan i tre steg (b\u00f6rjan, mitten, slut). Uppmuntra barnet att hitta p\u00e5 ett nytt slut. Skapa en sagobok tillsammans d\u00e4r barnet skriver och ritar. Varje saga \u00e4r en l\u00e4sf\u00f6rst\u00e5else\u00f6vning.',
    classroomIntegration: 'Sagotemat i \u00e5rskurs 1 integreras med Lgr22: i svenska l\u00e4ses, \u00e5terber\u00e4ttas och skrivs sagor, ber\u00e4ttelsestruktur analyseras, i matematik l\u00f6ses ordproblem i sagokontext (trollet kr\u00e4vde 15 guldmynt), i bild illustreras sagoscener. Bokveckan ger extra intensivt sagoarbete med dramatisering och skrivprojekt.',
    assessmentRubric: [
      { skill: 'L\u00e4sf\u00f6rst\u00e5else av sagor', emerging: 'identifierar huvudkaraktären med st\u00f6d', proficient: '\u00e5terber\u00e4ttar sagan med karaktär, problem och l\u00f6sning', advanced: 'analyserar moral, j\u00e4mf\u00f6r versioner och drar slutsatser' },
      { skill: 'Sekvensering av h\u00e4ndelser', emerging: 'ordnar tre h\u00e4ndelser med bildst\u00f6d', proficient: 'sekvenserar sj\u00e4lvst\u00e4ndigt fem h\u00e4ndelser i r\u00e4tt ordning', advanced: 'identifierar orsak-verkan-kedjor och parallella h\u00e4ndelser' },
      { skill: 'Sagoskrivning', emerging: 'skriver en mening om en sagofigur med st\u00f6d', proficient: 'skriver ett sagoslut med b\u00f6rjan, mitten och slut', advanced: 'skriver en komplett kort saga med karaktärsbeskrivning och dialog' },
    ],
  },

  farm: {
    seoTitle: 'Gratis Bondg\u00e5rds\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara bondg\u00e5rds\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem, datainsamling och l\u00e4sf\u00f6rst\u00e5else med bondg\u00e5rdstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'bondg\u00e5rds\u00f6vningar \u00e5rskurs 1, bondg\u00e5rd arbetsblad 6\u20137 \u00e5r, ordproblem bondg\u00e5rd, datainsamling djur, Lgr22, sk\u00f6rd matematik, l\u00e4sf\u00f6rst\u00e5else, livsmedelsproduktion, streckr\u00e4kning, \u00e5rstider',
    snippetAnswer: 'Bondg\u00e5rds\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20, datainsamling med bondg\u00e5rdsdjur och l\u00e4sf\u00f6rst\u00e5else om livsmedelsproduktion. St\u00f6djer Lgr22:s m\u00e5l. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas bondg\u00e5rdstemat till datadriven matematik och naturvetenskaplig f\u00f6rst\u00e5else av livsmedelsproduktion. Sex- och sju\u00e5ringar l\u00f6ser flerstegsproblem (bonden hade 15 kor och s\u00e5lde 6, sedan fick han 3 kalvar), samlar in data om djurantal i streckr\u00e4kningstabeller och redovisar i stapeldiagram. L\u00e4spassager om hur mj\u00f6lk, \u00e4gg och spannm\u00e5l produceras bygger f\u00f6rst\u00e5else f\u00f6r matens v\u00e4g fr\u00e5n jord till bord. Skrivuppgifter som bondg\u00e5rdsdagbok ger meningsfull textproduktion. Lgr22 betonar h\u00e5llbar utveckling, dataredovisning och l\u00e4sf\u00f6rst\u00e5else, och bondg\u00e5rdstemat levererar alla tre.',
    developmentalMilestones: [
      { milestone: 'Flerstegsproblem med bondg\u00e5rdsscenarier', howWeAddress: 'Ordproblem med djurhandel, sk\u00f6rd och f\u00f6delse som kr\u00e4ver tv\u00e5 r\u00e4kneoperationer' },
      { milestone: 'Datainsamling och stapeldiagram (bondg\u00e5rdsdjur)', howWeAddress: 'Eleven r\u00e4knar djur p\u00e5 en bondg\u00e5rdsbild, f\u00f6r streckr\u00e4kning och skapar stapeldiagram' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else om livsmedelsproduktion', howWeAddress: 'Faktatexter om mj\u00f6lk, \u00e4gg och spannm\u00e5l med f\u00f6rst\u00e5elsefr\u00e5gor bygger h\u00e5llbarhetsmedvetenhet' },
      { milestone: '\u00c5rstidskoppling (s\u00e5dd, v\u00e4xt, sk\u00f6rd)', howWeAddress: 'Sekvenseringsuppgifter d\u00e4r eleven ordnar bondg\u00e5rds\u00e5ret kronologiskt' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll ordproblem inom talomr\u00e5det 10, ge f\u00f6rifylld diagrammall och fokusera p\u00e5 enstegsuppgifter. F\u00f6r avancerade elever ut\u00f6ka till tretal i ordproblem, l\u00e5t eleven j\u00e4mf\u00f6ra data fr\u00e5n tv\u00e5 bondg\u00e5rdar och skriva f\u00f6rklarande text om livsmedelsproduktion.',
    parentTakeaway: 'Bondg\u00e5rdstemat lever i matbutiken! L\u00e5t barnet l\u00e4sa p\u00e5 f\u00f6rpackningar var maten kommer fr\u00e5n, r\u00e4kna frukt och gr\u00f6nsaker, och ber\u00e4kna kostnader. Bes\u00f6k en bondg\u00e5rd och l\u00e5t barnet r\u00e4kna djur och f\u00f6ra streckr\u00e4kning. Fr\u00e5ga: \u201dom kon ger 12 liter mj\u00f6lk och vi beh\u00f6ver 5, hur mycket \u00e4r kvar?\u201d. Varje m\u00e5ltid kan kopplas till bondg\u00e5rden.',
    classroomIntegration: 'Bondg\u00e5rdstemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och data redovisas med bondg\u00e5rdstal, i NO studeras livsmedelsproduktion och \u00e5rstider, i svenska l\u00e4ses och skrivs bondg\u00e5rdstexter, i SO diskuteras h\u00e5llbar utveckling. Bondg\u00e5rdsbes\u00f6k ger autentisk datainsamling.',
    assessmentRubric: [
      { skill: 'Ordproblem med bondg\u00e5rdstema', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt flerstegsproblem inom 20', advanced: 'formulerar egna ordproblem och v\u00e4ljer r\u00e4knes\u00e4tt sj\u00e4lvst\u00e4ndigt' },
      { skill: 'Datainsamling och diagram', emerging: 'r\u00e4knar och f\u00f6r streckr\u00e4kning med st\u00f6d', proficient: 'skapar sj\u00e4lvst\u00e4ndigt stapeldiagram och besvarar j\u00e4mf\u00f6relsefr\u00e5gor', advanced: 'j\u00e4mf\u00f6r datam\u00e4ngder och drar slutsatser om m\u00f6nster' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else om livsmedel', emerging: '\u00e5terger ett faktum med st\u00f6d', proficient: 'svarar sj\u00e4lvst\u00e4ndigt p\u00e5 fr\u00e5gor om livsmedelskedjan', advanced: 'f\u00f6rklarar processen fr\u00e5n jord till bord med egna ord' },
    ],
  },

  flowers: {
    seoTitle: 'Gratis Blom\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara blom\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). M\u00e4tning, symmetri och naturkunskap med blomtema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'blom\u00f6vningar \u00e5rskurs 1, blommor arbetsblad 6\u20137 \u00e5r, symmetri blommor, m\u00e4tning cm, v\u00e4xtens delar, Lgr22 NO, pollinering, ordpussel blommor, datainsamling, \u00e5rstider',
    snippetAnswer: 'Blom\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar m\u00e4tning i cm, symmetri med blomsterm\u00f6nster och naturkunskap om v\u00e4xtens delar. Pollinering och \u00e5rstider utforskas. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas blomtemat till systematisk naturvetenskap och m\u00e4tmatematik. Sex- och sju\u00e5ringar m\u00e4ter blommornas h\u00f6jd i centimeter och j\u00e4mf\u00f6r tillv\u00e4xt \u00f6ver tid, unders\u00f6ker symmetri i kronblad och skapar symmetriska blommor. V\u00e4xtens delar (rot, stj\u00e4lk, blad, blomma) l\u00e4rs genom etiketterings\u00f6vningar. L\u00e4spassager om pollinering och bin bygger ekologisk f\u00f6rst\u00e5else. Ordpussel med blomnamn st\u00e4rker l\u00e4sf\u00e4rdigheten. Lgr22 betonar naturvetenskapligt unders\u00f6kande, m\u00e4tning och biologisk f\u00f6rst\u00e5else, och odling av v\u00e5rblommor i klassrummet g\u00f6r l\u00e4randet konkret.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning av v\u00e4xth\u00f6jd i cm (\u00f6ver tid)', howWeAddress: 'Eleven m\u00e4ter sin planta veckovis, f\u00f6r in data i tabell och j\u00e4mf\u00f6r tillv\u00e4xt' },
      { milestone: 'Symmetri i naturen (blommornas kronblad)', howWeAddress: 'Rit\u00f6vningar d\u00e4r eleven kompletterar halva blomman tr\u00e4nar symmetri med naturmotiv' },
      { milestone: 'V\u00e4xtens delar och deras funktion', howWeAddress: 'Etiketterings\u00f6vningar d\u00e4r eleven namnger rot, stj\u00e4lk, blad och blomma och beskriver funktionen' },
      { milestone: 'Ekologisk f\u00f6rst\u00e5else (pollinering och bin)', howWeAddress: 'L\u00e4spassager om pollineringsprocessen med j\u00e4mf\u00f6relsefr\u00e5gor bygger ekosystemf\u00f6rst\u00e5else' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, fokusera p\u00e5 tre v\u00e4xtdelar med tydliga bilder, ge m\u00e4tmallar och anv\u00e4nd symmetri med enkel speglingsaxel. F\u00f6r avancerade elever l\u00e4gg till tillv\u00e4xtdiagram \u00f6ver flera veckor, l\u00e4spassager om fotosyntesens grunder och skrivuppgifter d\u00e4r eleven f\u00f6rklarar blommornas roll i ekosystemet.',
    parentTakeaway: 'Odla en blomma tillsammans hemma! L\u00e5t barnet plantera ett fr\u00f6, m\u00e4ta v\u00e4xth\u00f6jden i cm varje vecka och f\u00f6ra dagbok. Prata om v\u00e4xtens delar vid promenader: \u201dvar \u00e4r roten? varf\u00f6r beh\u00f6vs stj\u00e4lken?\u201d. Observera bin och prata om pollinering. St\u00e4ll fr\u00e5gor: \u201dbloNman var 5 cm f\u00f6rra veckan och 8 cm nu \u2014 hur mycket v\u00e4xte den?\u201d.',
    classroomIntegration: 'Blomtemat i \u00e5rskurs 1 integreras med Lgr22: i matematik m\u00e4ts v\u00e4xth\u00f6jder och data redovisas, i NO studeras v\u00e4xtens delar och pollinering, i svenska l\u00e4ses och skrivs om blommor, i bild skapas symmetriska blommor. Skolans tr\u00e4dg\u00e5rd ger autentiskt odlingsprojekt d\u00e4r alla \u00e4mnen m\u00f6ts.',
    assessmentRubric: [
      { skill: 'M\u00e4tning av v\u00e4xth\u00f6jd', emerging: 'm\u00e4ter med st\u00f6d och avl\u00e4ser ungef\u00e4rligt', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt i cm och ber\u00e4knar tillv\u00e4xtskillnad', advanced: 'f\u00f6r tillv\u00e4xtdiagram och analyserar m\u00f6nster' },
      { skill: 'V\u00e4xtens delar', emerging: 'namnger tv\u00e5 delar med bildst\u00f6d', proficient: 'etiketterar sj\u00e4lvst\u00e4ndigt alla fyra delar och beskriver funktion', advanced: 'f\u00f6rklarar sambandet mellan delarna och v\u00e4xtens \u00f6verlevnad' },
      { skill: 'Symmetri med blommotiv', emerging: 'identifierar symmetrilinjen med st\u00f6d', proficient: 'ritar sj\u00e4lvst\u00e4ndigt den saknade halvan med korrekta kronblad', advanced: 'skapar komplexa symmetriska blommor med flera lager' },
    ],
  },

  food: {
    seoTitle: 'Gratis Mat\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara mat\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Br\u00e5k, sortering och n\u00e4ringskunskap med mattema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'mat\u00f6vningar \u00e5rskurs 1, mat arbetsblad 6\u20137 \u00e5r, br\u00e5k halva fj\u00e4rdedel, tallriksmodellen, n\u00e4ringsgrupper, Lgr22 h\u00e4lsa, ordproblem mat, sortering, pengar, receptl\u00e4sning',
    snippetAnswer: 'Mat\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar br\u00e5k med matdelning, n\u00e4ringssortering med tallriksmodellen och ordproblem med matink\u00f6p. H\u00e4lsa och matematik f\u00f6renas. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas mattemat till br\u00e5k, pengamatematik och h\u00e4lsokunskap. Sex- och sju\u00e5ringar delar matvaror i halvor och fj\u00e4rdedelar med konkret koppling (halva pizzan, en fj\u00e4rdedel av \u00e4pplet), sorterar mat i n\u00e4ringsgrupper med tallriksmodellen och l\u00f6ser ordproblem med matink\u00f6p (en banan kostar 3 kr och ett \u00e4pple 4 kr, hur mycket kostar b\u00e5da?). L\u00e4spassager om n\u00e4ring och h\u00e4lsa bygger h\u00e4lsomedvetenhet. Lgr22 betonar br\u00e5kf\u00f6rst\u00e5else, vardagsmatematik och h\u00e4lsa, och mattemat \u00e4r den mest naturliga kontexten f\u00f6r alla tre m\u00e5len.',
    developmentalMilestones: [
      { milestone: 'Br\u00e5k med konkret matdelning (halva, fj\u00e4rdedel)', howWeAddress: 'Delnings\u00f6vningar d\u00e4r eleven delar pizza, frukt och br\u00f6d och namnger delarna' },
      { milestone: 'N\u00e4ringssortering med tallriksmodellen', howWeAddress: 'Kategoriserings\u00f6vningar d\u00e4r eleven placerar matvaror i r\u00e4tt n\u00e4ringsgrupp p\u00e5 tallriken' },
      { milestone: 'Pengamatematik med matink\u00f6p', howWeAddress: 'Butikscenarier d\u00e4r eleven ber\u00e4knar totalpris och v\u00e4xel inom talomr\u00e5det 20' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else om n\u00e4ring och h\u00e4lsa', howWeAddress: 'Korta texter om varf\u00f6r kroppen beh\u00f6ver protein, kolhydrater och vitaminer' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till halvor, anv\u00e4nd tv\u00e5 n\u00e4ringsgrupper och h\u00e5ll priser inom 10 kr. F\u00f6r avancerade elever introducera tredjedelar, tre n\u00e4ringsgrupper med detaljerad tallriksmodell och l\u00e5t eleven planera en dag med balanserade m\u00e5ltider och ber\u00e4kna kostnader.',
    parentTakeaway: 'Matbordet \u00e4r en daglig lektion! L\u00e5t barnet dela frukt i halvor och fj\u00e4rdedelar, sortera maten p\u00e5 tallriken efter n\u00e4ringsgrupp, och handla med en budget. Fr\u00e5ga: \u201dom vi k\u00f6per 3 bananer f\u00f6r 4 kr styck, hur mycket kostar det?\u201d. Prata om varf\u00f6r vi beh\u00f6ver olika sorters mat. L\u00e5t barnet hj\u00e4lpa till att planera inhandlingslistan.',
    classroomIntegration: 'Mattemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas br\u00e5k, pengar och ordproblem, i NO diskuteras n\u00e4ring och h\u00e4lsa, i svenska l\u00e4ses och skrivs om mat, i hemkunskap lagas mat. Skolm\u00e5ltiden ger daglig koppling till tallriksmodellen och n\u00e4ringsgrupper.',
    assessmentRubric: [
      { skill: 'Br\u00e5kf\u00f6rst\u00e5else med mat', emerging: 'delar i halva med st\u00f6d', proficient: 'delar sj\u00e4lvst\u00e4ndigt i halvor och fj\u00e4rdedelar och j\u00e4mf\u00f6r', advanced: 'l\u00f6ser br\u00e5kuppgifter och kopplar till vardagssituationer' },
      { skill: 'N\u00e4ringssortering (tallriksmodellen)', emerging: 'sorterar med st\u00f6d i tv\u00e5 grupper', proficient: 'placerar sj\u00e4lvst\u00e4ndigt matvaror i r\u00e4tt n\u00e4ringsgrupp', advanced: 'planerar balanserad m\u00e5ltid och f\u00f6rklarar varf\u00f6r' },
      { skill: 'Pengamatematik med matink\u00f6p', emerging: 'adderar tv\u00e5 priser inom 10 kr med st\u00f6d', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt totalpris och v\u00e4xel inom 20 kr', advanced: 'planerar ink\u00f6p inom budget och j\u00e4mf\u00f6r alternativ' },
    ],
  },

  forest: {
    seoTitle: 'Gratis Skogs\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara skogs\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem inom 20, ekosystem och l\u00e4sf\u00f6rst\u00e5else med skogstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'skogs\u00f6vningar \u00e5rskurs 1, skog arbetsblad 6\u20137 \u00e5r, ekosystem, ordproblem skog, datainsamling, Lgr22 NO, utomhuspedagogik, tr\u00e4darter, \u00e5rstider, n\u00e4ringsv\u00e4v',
    snippetAnswer: 'Skogs\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20, ekosystemf\u00f6rst\u00e5else och l\u00e4sf\u00f6rst\u00e5else med skogstexter. Utomhuspedagogik kopplas till Lgr22:s m\u00e5l. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 f\u00f6rdjupas skogstemat med ekosystemt\u00e4nkande och datadriven matematik. Sex- och sju\u00e5ringar l\u00f6ser ordproblem om skogens djur och tr\u00e4d med tiotals\u00f6verg\u00e5ng (15 f\u00e5glar h\u00e4ckade, 6 fl\u00f6g s\u00f6derut), l\u00e4ser l\u00e4ngre passager om skogens ekosystemlager och samlar in data fr\u00e5n skogsbes\u00f6k i tabeller. Kopplingslinjer mellan djur och deras matkällor introducerar n\u00e4ringsv\u00e4vsbegrepp. M\u00e4tning med cm och m \u00f6vas genom att m\u00e4ta pinnar, tr\u00e4domkrets och avst\u00e5nd. Lgr22 betonar ekologisk f\u00f6rst\u00e5else, dataredovisning och utomhusl\u00e4rande, och den svenska skogen \u00e4r det perfekta klassrummet f\u00f6r alla tre m\u00e5len.',
    developmentalMilestones: [
      { milestone: 'Ordproblem med ekologiska scenarier (djurpopulationer)', howWeAddress: 'Realistiska problem om fågelflyttning, djurpopulationer och tr\u00e4df\u00e4llning tr\u00e4nar tiotals\u00f6verg\u00e5ng' },
      { milestone: 'Ekosystemf\u00f6rst\u00e5else (skogens lager och n\u00e4ringsv\u00e4v)', howWeAddress: 'Kopplingslinjer och sorteringsuppgifter d\u00e4r eleven f\u00f6rbinder djur, v\u00e4xter och skogslager' },
      { milestone: 'Datainsamling fr\u00e5n skogsbes\u00f6k (streckr\u00e4kning, tabell)', howWeAddress: 'Eleven r\u00e4knar tr\u00e4darter och djursp\u00e5r p\u00e5 skogsutflykten och redovisar i diagram' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av ekologiska texter', howWeAddress: 'L\u00e4spassager om skogens ekosystem med f\u00f6rst\u00e5elsefr\u00e5gor och slutledningsfr\u00e5gor' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll ordproblem inom 10, begr\u00e4nsa till tre skogsdjur och ge bildst\u00f6d vid datainsamling. F\u00f6r avancerade elever ut\u00f6ka med l\u00e4ngre ekologiska l\u00e4spassager, flerstegsproblem med tre operationer och skrivuppgifter d\u00e4r eleven f\u00f6rklarar en n\u00e4ringsv\u00e4v.',
    parentTakeaway: 'Varje skogsutflykt \u00e4r en lektion! L\u00e5t barnet r\u00e4kna tr\u00e4d av olika arter och f\u00f6ra streckr\u00e4kning, m\u00e4ta pinnar i cm och leta djursp\u00e5r. Fr\u00e5ga: \u201dom det bodde 13 ekorrar och 5 flyttade, hur m\u00e5nga \u00e4r kvar?\u201d. L\u00e4s om skogens lager och diskutera vid promenaden. Arbetsbladen f\u00f6rl\u00e4nger utomhusupplevelserna till klassrumsmatematik.',
    classroomIntegration: 'Skogstemat i \u00e5rskurs 1 \u00e4r centralt i Lgr22: i matematik l\u00f6ses ordproblem och data fr\u00e5n skogsbes\u00f6k redovisas, i NO studeras ekosystem och n\u00e4ringsv\u00e4var, i svenska l\u00e4ses och skrivs skogstexter, i idrott bedrivs utomhuspedagogik. Regelbundna skogsdagar ger autentisk data f\u00f6r alla \u00e4mnen.',
    assessmentRubric: [
      { skill: 'Ordproblem i skogskontext', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med tiotals\u00f6verg\u00e5ng', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna skogsordproblem' },
      { skill: 'Ekosystemf\u00f6rst\u00e5else', emerging: 'namnger tre skogens invånare med st\u00f6d', proficient: 'beskriver sj\u00e4lvst\u00e4ndigt skogens lager och kopplar djur till r\u00e4tt lager', advanced: 'f\u00f6rklarar enkla n\u00e4ringsv\u00e4var och sambandet mellan arter' },
      { skill: 'Datainsamling fr\u00e5n skogsbes\u00f6k', emerging: 'r\u00e4knar med st\u00f6d och f\u00f6r streckr\u00e4kning', proficient: 'samlar sj\u00e4lvst\u00e4ndigt data, skapar diagram och besvarar fr\u00e5gor', advanced: 'j\u00e4mf\u00f6r data fr\u00e5n tv\u00e5 bes\u00f6k och drar slutsatser om f\u00f6r\u00e4ndringar' },
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

  // Check if already enriched (seoTitle in first-grade block)
  const firstGradeIdx = content.indexOf("'first-grade'");
  const secondGradeIdx = content.indexOf("'second-grade'");

  if (firstGradeIdx === -1 || secondGradeIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/sv.ts`);
    errorCount++;
    continue;
  }

  const firstGradeBlock = content.substring(firstGradeIdx, secondGradeIdx);
  if (firstGradeBlock.includes('seoTitle:')) {
    console.log(`SKIP (already enriched): ${theme}/sv.ts`);
    continue;
  }

  // STEP 1: Insert seoTitle/seoDescription/seoKeywords right after "'first-grade': {"
  const firstGradeOpenPattern = "'first-grade': {";
  const firstGradeOpenIdx = content.indexOf(firstGradeOpenPattern);
  if (firstGradeOpenIdx === -1) {
    console.error(`NO FIRST-GRADE OPEN FOUND: ${theme}/sv.ts`);
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
    console.error(`NO FAQ END FOUND: ${theme}/sv.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const enrichInsertPos = newFirstGradeIdx + lastMatch.index + lastMatch[0].length;
  const enrichText = buildEnrichmentInsertionText(enrichments[theme]) + '\n';
  content = content.substring(0, enrichInsertPos) + enrichText + content.substring(enrichInsertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/sv.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
