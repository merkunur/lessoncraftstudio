#!/usr/bin/env node
/**
 * SEO Part 289: SV Kindergarten Grade Enrichment — Themes 1-19
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the kindergarten grade block of 19 SV theme files (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    seoTitle: 'Gratis Alfabet\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara alfabet\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). Bokstavsljud, skrivning ur minnet och ordbyggande. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'alfabet\u00f6vningar f\u00f6rskoleklass, bokstavsljud 5\u20136 \u00e5r, skriva bokst\u00e4ver, fonemisk medvetenhet, bokstav-ljud koppling, versaler gemener, Lgr22 alfabet, ordbyggande, bokstavsformering, l\u00e4sberedskap',
    snippetAnswer: 'Alfabet\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) tr\u00e4nar alla bokstavsljud, sj\u00e4lvst\u00e4ndig bokstavsproduktion och ordbyggande. Arbetsbladen st\u00f6djer Lgr22:s m\u00e5l f\u00f6r automatisk bokstavsigenk\u00e4nning och tidig l\u00e4sf\u00e4rdighet. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'F\u00f6rskoleklassen \u00e4r \u00e5ret d\u00e5 bokstavskunskap ska bli automatisk \u2014 varje bokstav k\u00e4nns igen p\u00e5 blixtsnabb tid, dess ljud produceras utan tv\u00e5kan och formeras p\u00e5 papper ur minnet. Fem- och sex\u00e5ringar anl\u00e4nder med vitt skilda f\u00f6rkunskaper, fr\u00e5n barn som redan ljudar ihop enkla ord till de som fortfarande l\u00e4r sig skriva sitt namn. Arbetsblad m\u00e5ste betj\u00e4na hela spektrumet. Det svenska alfabetets tjugo\u00e5tta bokst\u00e4ver inklusive \u00e5, \u00e4 och \u00f6 kr\u00e4ver systematisk genomg\u00e5ng. Lgr22 betonar fonologisk medvetenhet och tidig l\u00e4sutveckling, och alfabet\u00f6vningar p\u00e5 denna niv\u00e5 g\u00e5r bortom igenk\u00e4nning till aktiv anv\u00e4ndning: ordbyggande, ordf\u00f6rvrngningar och korsord med bildledtr\u00e5dar. Skrivarbetsblad kr\u00e4ver sj\u00e4lvst\u00e4ndig produktion p\u00e5 linjerat papper.',
    developmentalMilestones: [
      { milestone: 'Automatisk bokstavsigenk\u00e4nning (5\u20136-\u00e5ringar k\u00e4nner igen alla versaler och gemener utan tv\u00e5kan)', howWeAddress: 'Matchnings- och bokstavst\u00e5gsaktiviteter med alla 28 svenska bokst\u00e4ver s\u00e4kerst\u00e4ller att varje bokstav \u00f6vas regelbundet' },
      { milestone: 'Bokstav-ljud-koppling (barnet producerar prim\u00e4rljudet f\u00f6r varje bokstav)', howWeAddress: 'Bildmatchning d\u00e4r barn identifierar begynnelseljudet i ord och kopplar det till r\u00e4tt bokstav' },
      { milestone: 'Sj\u00e4lvst\u00e4ndig bokstavsproduktion (skrivning ur minnet p\u00e5 linjerat papper)', howWeAddress: 'Skrivarbetsblad som g\u00e5r fr\u00e5n sp\u00e5rning via ofullst\u00e4ndiga bokst\u00e4ver till fri skrivning p\u00e5 linjer' },
      { milestone: 'Fonemisk segmentering (barnet bryter ner enkla ord i enskilda ljud)', howWeAddress: 'Ordf\u00f6rvrngnings- och korsords\u00f6vningar d\u00e4r barnet segmenterar ord ljud-f\u00f6r-ljud och skriver varje bokstav' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, forts\u00e4tt med sp\u00e5rningsblad f\u00f6r bokst\u00e4ver som \u00e4nnu inte \u00e4r automatiserade, anv\u00e4nd riktningspilar och startpunkter, och fokusera p\u00e5 h\u00f6gfrekventa bokst\u00e4ver som S, T, M, A och P s\u00e5 att barnet snabbt kan ljuda ihop riktiga ord. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera ordbyggande med ordf\u00f6rvrngningar, korsord med bildledtr\u00e5dar och skrivuppgifter d\u00e4r barnet producerar hela ord och korta meningar.',
    parentTakeaway: 'I f\u00f6rskoleklassen \u00e4r m\u00e5let att alla bokst\u00e4ver ska sitta \u2014 b\u00e5de igenk\u00e4nning och ljud. Hemma kan ni \u00f6va genom att ljuda ihop ord p\u00e5 skyltar, spela bokstavsspel och l\u00e5ta barnet skriva korta meddelanden. St\u00e4ll fr\u00e5gor som \u201dvilket ljud h\u00f6r du f\u00f6rst i sol?\u201d. H\u00f6gl\u00e4sning \u00e4r fortfarande den viktigaste aktiviteten, men nu kan barnet b\u00f6rja peka p\u00e5 ord det k\u00e4nner igen. Fira varje nytt ord barnet ljudar ihop sj\u00e4lvst\u00e4ndigt.',
    classroomIntegration: 'Alfabet\u00f6vningar i f\u00f6rskoleklassen anv\u00e4nds dagligen som uppv\u00e4rmning under l\u00e4s- och skrivperioden: m\u00e5ndag sp\u00e5rning och skrivning, tisdag ljudmatchning, onsdag ordbyggande, torsdag korsord, fredag ords\u00f6kning. Veckans bokstav f\u00e5r en hemarbetsp\u00e5se med ett sp\u00e5rningsblad, en ljudmatchningssida och en ords\u00f6kning. Lgr22:s m\u00e5l f\u00f6r l\u00e4s- och skrivinl\u00e4rning st\u00f6ds systematiskt genom denna roterande modell.',
    assessmentRubric: [
      { skill: 'Automatisk bokstavsigenk\u00e4nning', emerging: 'k\u00e4nner igen 15\u201320 bokst\u00e4ver men tv\u00e5kar vid n\u00e5gra', proficient: 'k\u00e4nner sj\u00e4lvst\u00e4ndigt igen alla 28 versaler och de flesta gemener', advanced: 'k\u00e4nner igen alla bokst\u00e4ver i alla typsnitt och sammanhang blixtsnabbt' },
      { skill: 'Bokstav-ljud-produktion', emerging: 'producerar ljud f\u00f6r 10\u201315 bokst\u00e4ver korrekt', proficient: 'producerar prim\u00e4rljudet f\u00f6r alla bokst\u00e4ver och ljud\u00e4r ihop enkla trestaviga ord', advanced: 'ljud\u00e4r flytande ihop flerstaviga ord och k\u00e4nner till alternativa ljud f\u00f6r flera bokst\u00e4ver' },
      { skill: 'Sj\u00e4lvst\u00e4ndig bokstavsproduktion', emerging: 'skriver de flesta bokst\u00e4ver ur minnet men med inkonsekventa former', proficient: 'skriver alla bokst\u00e4ver l\u00e4sligt p\u00e5 linjerat papper med korrekt storlek', advanced: 'skriver ord och korta meningar med korrekt formering, mellanrum och interpunktion' },
    ],
  },

  animals: {
    seoTitle: 'Gratis Djur\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara djur\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, addition, subtraktion och klassificering med djurbilder. 33 generatorer. Gratis PDF.',
    seoKeywords: 'djur\u00f6vningar f\u00f6rskoleklass, djur arbetsblad 5\u20136 \u00e5r, r\u00e4kna djur, addition subtraktion, klassificering djur, Lgr22 matematik, djur naturvetenskap, ordpussel djur, visuell diskriminering, f\u00e4rgl\u00e4ggning',
    snippetAnswer: 'Djur\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder djurbilder f\u00f6r addition, subtraktion, klassificering och ordpussel. Aktiviteterna st\u00f6djer Lgr22:s m\u00e5l f\u00f6r matematik och naturvetenskap. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I f\u00f6rskoleklass f\u00f6rvandlas barnens djurfascination till systematiskt l\u00e4rande: fem- och sex\u00e5ringar kan nu r\u00e4kna till tjugo och l\u00e4ngre, utf\u00f6ra addition och subtraktion inom tio, och f\u00f6lja flerstegsuppdrag sj\u00e4lvst\u00e4ndigt. Djurarbetsblad p\u00e5 denna niv\u00e5 g\u00e5r fr\u00e5n enkel r\u00e4kning till konkret matematik: fem f\u00e5glar sitter p\u00e5 en gren, tv\u00e5 flyger iv\u00e4g \u2014 hur m\u00e5nga \u00e4r kvar? Klassificering blir vetenskaplig n\u00e4r barnen sorterar djur efter p\u00e4ls, fj\u00e4drar, antal ben och livsmilj\u00f6 samtidigt. Ordpussel med djurnamn bygger l\u00e4sf\u00e4rdighet. Lgr22 betonar b\u00e5de matematiskt t\u00e4nkande och naturvetenskapligt utforskande, och djurtemat uppfyller b\u00e5da m\u00e5len i en motiverande kontext.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion inom tio (f\u00f6rskoleklassbarn arbetar med konkreta bilder)', howWeAddress: 'Visuella additions- och subtraktionsuppgifter med djurbilder som r\u00e4kneenheter g\u00f6r abstrakta operationer begripliga' },
      { milestone: 'Vetenskaplig klassificering (sortering efter flera egenskaper samtidigt)', howWeAddress: 'Kategoriserings\u00f6vningar d\u00e4r barn grupperar djur efter tv\u00e5 egenskaper (t.ex. p\u00e4ls + fyra ben) introducerar logiskt AND-t\u00e4nkande' },
      { milestone: 'Bokstavsljud och ordigenk\u00e4nning (djurnamn som l\u00e4s\u00f6vning)', howWeAddress: 'Ords\u00f6kningar och ordf\u00f6rvrngningar med djurordf\u00f6rr\u00e5d bygger visuell ordigenk\u00e4nning och stavningsmedvetenhet' },
      { milestone: 'Flerstegsresonemang (h\u00e5lla fr\u00e5ga i minnet medan man skannar information)', howWeAddress: 'Bildkorsord och r\u00e4kneuppdrag som kr\u00e4ver att barnet h\u00e5ller instruktionen och r\u00e4knar samtidigt st\u00e4rker arbetsminnet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd konkreta plastdjur som komplement till arbetsbladen, begr\u00e4nsa r\u00e4kneomr\u00e5det till fem, och fokusera p\u00e5 en f\u00e4rdighet per tilf\u00e4lle (r\u00e4kning eller matchning, inte b\u00e5da). F\u00f6r avancerade f\u00f6rskoleklassbarn utvidga r\u00e4kneomr\u00e5det till tjugo, l\u00e4gg till textuppgifter med djurscenarier och introducera korsord med djurordf\u00f6rr\u00e5d.',
    parentTakeaway: 'F\u00f6rskoleklassen \u00e4r r\u00e4tt tid att koppla djurintresset till riktigt skolarbete hemma. R\u00e4kna djur i bilderb\u00f6cker, st\u00e4ll fr\u00e5gor som \u201dom tre katter sitter och en g\u00e5r, hur m\u00e5nga \u00e4r kvar?\u201d, och l\u00e5t barnet skriva djurnamn. Bes\u00f6k p\u00e5 djurparken kan f\u00f6ljas av arbetsblad f\u00f6r att f\u00f6rl\u00e4nga l\u00e4randet. Uppmuntra barnet att sortera sina gosedjur efter egenskaper och ber\u00e4tta varf\u00f6r.',
    classroomIntegration: 'Djurtemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: p\u00e5 matematiklektionen anv\u00e4nds djurbilder f\u00f6r addition och subtraktion, i svenska \u00f6vas djurnamn i ords\u00f6kningar och skrivuppgifter, och p\u00e5 NO-lektionen klassificeras djur efter vetenskapliga kriterier. Veckans djur presenteras i samlingen, och arbetsbladen kompletterar med r\u00e4kning, l\u00e4sning och klassificering under arbetspassen.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med djurbilder', emerging: 'l\u00f6ser additionsuppgifter inom 5 med konkret st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med djurbilder', advanced: 'l\u00f6ser uppgifter inom 20 och skriver egna tals\u00e4tser utifr\u00e5n djurscenarier' },
      { skill: 'Klassificering av djur', emerging: 'sorterar djur efter en egenskap med st\u00f6d (t.ex. ben)', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter tv\u00e5 egenskaper (livsmilj\u00f6 + kroppsbeklädnad)', advanced: 'skapar egna sorteringskriterier och f\u00f6rklarar sitt resonemang muntligt' },
      { skill: 'Ordpussel med djurnamn', emerging: 'hittar 2\u20133 djurnamn i en ords\u00f6kning med vuxenst\u00f6d', proficient: 'hittar sj\u00e4lvst\u00e4ndigt 5\u20136 djurnamn och l\u00e4ser dem h\u00f6gt', advanced: 'l\u00f6ser ordf\u00f6rvrngningar med djurnamn och anv\u00e4nder dem i skrivna meningar' },
    ],
  },

  birds: {
    seoTitle: 'Gratis F\u00e5gel\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara f\u00e5gel\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, addition och naturkunskap med f\u00e5gelbilder. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'f\u00e5gel\u00f6vningar f\u00f6rskoleklass, f\u00e5glar arbetsblad 5\u20136 \u00e5r, r\u00e4kna f\u00e5glar, addition f\u00f6rskoleklass, f\u00e5gelarter, naturkunskap f\u00f6rskoleklass, Lgr22, klassificering f\u00e5glar, ordpussel, visuell matchning',
    snippetAnswer: 'F\u00e5gel\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder f\u00e5gelbilder f\u00f6r addition, subtraktion och naturvetenskaplig klassificering. Barnen \u00f6var r\u00e4kning, artigenk\u00e4nning och ordpussel. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I f\u00f6rskoleklass blir f\u00e5geltemat en bro mellan matematik och naturvetenskap. Fem- och sex\u00e5ringar kan nu anv\u00e4nda f\u00e5gelbilder f\u00f6r konkret addition och subtraktion: sex f\u00e5glar vid f\u00e5gelbordet, tre flyger iv\u00e4g. Klassificering g\u00e5r bortom storlek till vetenskapliga egenskaper som n\u00e4bb form, bof\u00f6rm\u00e5ga och flyttf\u00e5gel kontra stannf\u00e5gel. Ordpussel med f\u00e5gelnamn st\u00e4rker l\u00e4sf\u00e4rdigheten. Svenska f\u00f6rskoleklassbarn har ofta erfarenhet av f\u00e5gelobservation fr\u00e5n utomhuspedagogik, vilket ger stark koppling till verkligheten. Lgr22 betonar naturvetenskaplig nyfikenhet, och f\u00e5geltemat uppfyller detta genom att kombinera r\u00e4kning med artkunskap.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med visuella f\u00e5gelbilder', howWeAddress: 'R\u00e4kneuppgifter d\u00e4r f\u00e5glar flyger till och fr\u00e5n en scen g\u00f6r operationerna konkreta och f\u00f6rst\u00e5eliga' },
      { milestone: 'Vetenskaplig artigenk\u00e4nning (namnge och beskriva vanliga f\u00e5glar)', howWeAddress: 'Matchnings\u00f6vningar d\u00e4r barn parar ihop f\u00e5glar med namn och egenskaper bygger naturvetenskapligt ordf\u00f6rr\u00e5d' },
      { milestone: 'Klassificering efter flera kriterier (flyttf\u00e5gel/stannf\u00e5gel, n\u00e4bbtyp)', howWeAddress: 'Sorteringstabeller d\u00e4r barn kategoriserar f\u00e5glar efter tv\u00e5 egenskaper samtidigt utvecklar logiskt t\u00e4nkande' },
      { milestone: 'L\u00e4sf\u00e4rdighet genom ordpussel', howWeAddress: 'Ords\u00f6kningar med f\u00e5gelnamn tr\u00e4nar visuell skanning och bokstavssekvensiGenk\u00e4nning' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fem v\u00e4lk\u00e4nda f\u00e5glar (sparv, bl\u00e5mes, r\u00f6dhake, duva, and), anv\u00e4nd bilder med tydliga egenskaper och h\u00e5ll r\u00e4kneomr\u00e5det inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn utvidga artlistan, l\u00e4gg till textuppgifter med f\u00e5gelscenarier och introducera diagram d\u00e4r barnen r\u00e4knar f\u00e5glar och f\u00f6r in data i en tabell.',
    parentTakeaway: 'F\u00f6rskoleklassen \u00e4r perfekt f\u00f6r att utveckla f\u00e5gelintresset till riktigt l\u00e4rande. S\u00e4tt upp en f\u00e5gelbok vid f\u00f6nstret och l\u00e5t barnet identifiera arter med bilder. St\u00e4ll matematikfr\u00e5gor: \u201ddet satt fyra f\u00e5glar, tv\u00e5 fl\u00f6g, hur m\u00e5nga \u00e4r kvar?\u201d. L\u00e5t barnet skriva f\u00e5gelnamn p\u00e5 en lista. Arbetsbladen f\u00f6rst\u00e4rker b\u00e5de matematiken och naturvetenskapen fr\u00e5n vardagsupplevelserna.',
    classroomIntegration: 'F\u00e5geltemat i f\u00f6rskoleklassen kopplar till Lgr22:s m\u00e5l f\u00f6r matematik, svenska och NO: i matematiken r\u00e4knas f\u00e5glar och l\u00f6ses additions-/subtraktionsuppgifter, i svenskan \u00f6vas f\u00e5gelnamn i ords\u00f6kningar och skrivuppgifter, och i NO klassificeras f\u00e5glar efter vetenskapliga egenskaper. \u00c5rstidsf\u00f6r\u00e4ndringar i f\u00e5gellivet ger naturliga kopplingar till kalenderarbete och v\u00e4derobservationer.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med f\u00e5gelbilder', emerging: 'l\u00f6ser additionsuppgifter inom 5 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med f\u00e5gelscenarier', advanced: 'l\u00f6ser uppgifter inom 20 och skriver egna tals\u00e4tser med f\u00e5gelmotiv' },
      { skill: 'F\u00e5gelartigenk\u00e4nning', emerging: 'namnger 3\u20134 vanliga f\u00e5glar med bildst\u00f6d', proficient: 'identifierar sj\u00e4lvst\u00e4ndigt 6\u20138 f\u00e5gelarter och beskriver enkla egenskaper', advanced: 'k\u00e4nner igen 10+ arter och kategoriserar dem efter livsmilj\u00f6 och beteende' },
      { skill: 'Ordpussel med f\u00e5gelnamn', emerging: 'hittar 2\u20133 ord i ords\u00f6kning med vuxenst\u00f6d', proficient: 'hittar sj\u00e4lvst\u00e4ndigt 5\u20136 f\u00e5gelnamn i pussel', advanced: 'l\u00f6ser ordf\u00f6rvrngningar och skriver f\u00e5gelnamn sj\u00e4lvst\u00e4ndigt' },
    ],
  },

  birthday: {
    seoTitle: 'Gratis F\u00f6delsedag\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara f\u00f6delsedag\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). Addition, subtraktion och ordpussel med festtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'f\u00f6delsedag\u00f6vningar f\u00f6rskoleklass, kalas matematik, r\u00e4kna ljus, addition subtraktion, festtema arbetsblad, Lgr22, ordpussel f\u00f6delsedag, personlig matematik, delning lika, skriv\u00f6vning',
    snippetAnswer: 'F\u00f6delsedag\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder t\u00e5rtor, ljus och presenter f\u00f6r addition, subtraktion och ordpussel. Den personliga kopplingen till firande driver stark motivation. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I f\u00f6rskoleklass f\u00f6rvandlas f\u00f6delsedagstemat fr\u00e5n personlig r\u00e4kning till riktig matematik. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med ljus (tre ljus plus fyra ljus), subtraherar ballonger som spricker, och f\u00f6rdelar t\u00e5rtbitar lika. Delningskonceptet introduceras naturligt genom festscenarier: tolv kakor till fyra barn, hur m\u00e5nga f\u00e5r varje barn? Ordpussel med festordf\u00f6rr\u00e5d st\u00e4rker l\u00e4sf\u00e4rdigheten, och skrivuppgifter som f\u00f6delsedagsinbjudningar ger meningsfull kontext f\u00f6r handskrifts\u00f6vning. Lgr22 betonar att matematik ska kopplas till elevernas vardag, och f\u00f6delsedagar \u00e4r den mest personligt relevanta kontexten f\u00f6r barn i denna \u00e5lder.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med f\u00f6delsedagsf\u00f6rem\u00e5l (konkret matematik)', howWeAddress: 'R\u00e4kneuppgifter med ljus, ballonger och presenter som visuella r\u00e4kneenheter g\u00f6r operationerna gripbara' },
      { milestone: 'Rättvis fördelning (tidig division genom delningsscenarier)', howWeAddress: 'Festscenarier d\u00e4r barnen f\u00f6rdelar t\u00e5rtbitar och godis lika mellan g\u00e4ster introducerar delningst\u00e4nkande' },
      { milestone: 'Skrivf\u00e4rdighet genom meningsfulla texter (inbjudningar, tackbrev)', howWeAddress: 'Skrivuppgifter d\u00e4r barnet f\u00f6rfat tar en f\u00f6delsedagsinbjudan ger autentisk motivation f\u00f6r handskrift' },
      { milestone: 'Ordigenk\u00e4nning (festordförr\u00e5d som l\u00e4s\u00f6vning)', howWeAddress: 'Ords\u00f6kningar och ordf\u00f6rvrngningar med festord bygger visuell ordigenk\u00e4nning och stavningsmedvetenhet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, h\u00e5ll r\u00e4kneomr\u00e5det inom fem, anv\u00e4nd fysiska ljus eller ballonger som komplement, och fokusera p\u00e5 en operation per tilf\u00e4lle (addition eller subtraktion). F\u00f6r avancerade f\u00f6rskoleklassbarn utvidga till talomr\u00e5det upp till tjugo, l\u00e4gg till delningsuppgifter och l\u00e5t barnen skriva egna textuppgifter med f\u00f6delsedagstema.',
    parentTakeaway: 'Barnets f\u00f6delsedag \u00e4r en naturlig matematiklektion hemma. L\u00e5t barnet r\u00e4kna ljus, f\u00f6rdela godis i kalaspåsar lika, och r\u00e4kna ut hur m\u00e5nga tallrikar som beh\u00f6vs. Skriv inbjudningar tillsammans \u2014 det \u00e4r b\u00e5de skriv\u00f6vning och planering. Fr\u00e5ga: \u201dom vi bjuder sex kompisar och tv\u00e5 inte kan, hur m\u00e5nga kommer?\u201d. Varje kalas kan bli en l\u00e4rande\u00f6vning utan att det k\u00e4nns som skolarbete.',
    classroomIntegration: 'F\u00f6delsedagstemat i f\u00f6rskoleklassen anv\u00e4nds n\u00e4r n\u00e5gon i klassen fyller \u00e5r: i matematiken l\u00f6ses additionsuppgifter med festf\u00f6rem\u00e5l, i svenskan skrivs gratulationskort, och i bild skapas f\u00f6delsedagsteckningar. M\u00e5nadens f\u00f6delsedag firas med r\u00e4kne\u00f6vningar (hur gammal, hur m\u00e5nga har fyllt \u00e5r hittills). Lgr22:s m\u00e5l f\u00f6r vardagsmatematik och social utveckling st\u00f6ds naturligt.',
    assessmentRubric: [
      { skill: 'Addition med festf\u00f6rem\u00e5l', emerging: 'l\u00f6ser additionsuppgifter inom 5 med bildst\u00f6d (ljus, ballonger)', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med festscenarier', advanced: 'l\u00f6ser uppgifter inom 20 och skapar egna tals\u00e4tser med f\u00f6delsedagstema' },
      { skill: 'Rättvis fördelning', emerging: 'f\u00f6rdelar med konkret st\u00f6d (en till varje)', proficient: 'f\u00f6rdelar sj\u00e4lvst\u00e4ndigt f\u00f6rem\u00e5l lika mellan 2\u20134 grupper', advanced: 'l\u00f6ser delningsuppgifter med rest och f\u00f6rklarar sitt resonemang' },
      { skill: 'Skrivning av festtexter', emerging: 'skriver sitt namn och enkla ord med st\u00f6d', proficient: 'skriver korta inbjudningar med namn, datum och plats', advanced: 'f\u00f6rfat tar fullst\u00e4ndiga inbjudningar med meningar och dekorativa element' },
    ],
  },

  body: {
    seoTitle: 'Gratis Kropp\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara kropps\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). Kroppsdelar, r\u00e4kning, m\u00e4tning och ordpussel. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'kropp\u00f6vningar f\u00f6rskoleklass, kroppsdelar arbetsblad, m\u00e4tning kroppen, r\u00e4kning f\u00f6rskoleklass, Lgr22, h\u00e4lsa och kroppen, ordpussel kropp, sinnen \u00f6vning, anatomi barn, visuell matchning',
    snippetAnswer: 'Kropps\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder kroppsdelar och sinnen f\u00f6r r\u00e4kning, m\u00e4tning och ordpussel. Barnen l\u00e4r sig anatomi kopplat till matematik och l\u00e4sf\u00e4rdighet. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I f\u00f6rskoleklass utvecklas kroppen fr\u00e5n enkelt namngivande till ett konkret m\u00e4tverktyg och en anatomisk utforskning. Fem- och sex\u00e5ringar m\u00e4ter med handspann och fotsteg, r\u00e4knar fingerknoppar, och j\u00e4mf\u00f6r kroppsl\u00e4ngder. Sinnesorganen utforskas systematiskt: vad du ser, h\u00f6r, k\u00e4nner, luktar och smakar. Ordpussel med kroppsdelar bygger ordkunskap och l\u00e4sf\u00e4rdighet. Lgr22 betonar h\u00e4lsa, kroppsmedvetenhet och naturvetenskap, och kroppstemat integrerar alla tre omr\u00e5dena. Barn i denna \u00e5lder \u00e4r intensivt nyfikna p\u00e5 hur kroppen fungerar, och arbetsbladen kanaliserar denna nyfikenhet till strukturerat l\u00e4rande.',
    developmentalMilestones: [
      { milestone: 'Icke-standardm\u00e4tning med kroppsm\u00e5tt (handspann, fotsteg)', howWeAddress: 'M\u00e4t\u00f6vningar d\u00e4r barn m\u00e4ter f\u00f6rem\u00e5l med handspann och j\u00e4mf\u00f6r resultat introducerar m\u00e4tningens grundprinciper' },
      { milestone: 'Kroppsdelarnas namngivning och funktion (anatomi p\u00e5 \u00e5ldersadekvat niv\u00e5)', howWeAddress: 'Matchnings\u00f6vningar d\u00e4r barn parar ihop kroppsdelar med deras funktion bygger naturvetenskapligt ordf\u00f6rr\u00e5d' },
      { milestone: 'Sinnesutforskning (systematisk observation med alla fem sinnen)', howWeAddress: 'Aktiviteter d\u00e4r barn anv\u00e4nder sinnen f\u00f6r att beskriva f\u00f6rem\u00e5l och skriver ner sina observationer' },
      { milestone: 'L\u00e4s- och skrivf\u00e4rdighet (kroppsordförr\u00e5d)', howWeAddress: 'Ords\u00f6kningar och korsord med kroppsdelar bygger stavningsmedvetenhet och ordigenk\u00e4nning' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till de mest k\u00e4nda kroppsdelarna (arm, ben, huvud, hand), anv\u00e4nd spegel och egen kropp som konkret st\u00f6d, och fokusera p\u00e5 en aktivitet per tilf\u00e4lle. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera inre organ p\u00e5 enkel niv\u00e5 (hj\u00e4rta, lungor), l\u00e4gg till m\u00e4t\u00f6vningar med j\u00e4mf\u00f6relse och l\u00e5t barnen skriva korta texter om sinnesobservationer.',
    parentTakeaway: 'Kroppen \u00e4r det mest tillg\u00e4ngliga l\u00e4randeverktyget hemma. M\u00e4t rummet med fotsteg, r\u00e4kna fingrar och t\u00e5r, och utforska sinnena: \u201dblunda, vad luktar du?\u201d. Prata om varf\u00f6r vi beh\u00f6ver s\u00f6mn, n\u00e4ring och r\u00f6relse. L\u00e5t barnet rita sin kropp och namnge delarna. Dessa vardagliga samtal bygger b\u00e5de naturvetenskaplig kunskap och h\u00e4lsomedvetenhet som arbetsbladen f\u00f6rst\u00e4rker.',
    classroomIntegration: 'Kroppstemat i f\u00f6rskoleklassen integreras tv\u00e4rs \u00f6ver \u00e4mnen: i matematiken m\u00e4ts med kroppsm\u00e5tt och r\u00e4knas kroppsdelar, i svenskan \u00f6vas kroppsordförr\u00e5d i ords\u00f6kningar och skrivuppgifter, i NO utforskas sinnen och grundl\u00e4ggande anatomi, och i idrott kopplas r\u00f6relse till kroppsmedvetenhet. Lgr22:s m\u00e5l f\u00f6r h\u00e4lsa och naturvetenskap st\u00f6ds genom denna helhetssyn.',
    assessmentRubric: [
      { skill: 'M\u00e4tning med kroppsm\u00e5tt', emerging: 'm\u00e4ter f\u00f6rem\u00e5l med handspann med vuxenst\u00f6d', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt med handspann och fotsteg och registrerar resultaten', advanced: 'j\u00e4mf\u00f6r m\u00e4tresultat och f\u00f6rklarar varf\u00f6r olika kroppsm\u00e5tt ger olika svar' },
      { skill: 'Kroppsdelar och funktion', emerging: 'namnger 6\u20138 kroppsdelar med bildst\u00f6d', proficient: 'namnger sj\u00e4lvst\u00e4ndigt 12+ kroppsdelar och beskriver deras funktion', advanced: 'f\u00f6rklarar hur sinnesorgan fungerar och kopplar kroppsdelar till h\u00e4lsovanor' },
      { skill: 'Ordpussel med kroppsordförr\u00e5d', emerging: 'hittar 2\u20133 kroppsord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ords\u00f6kningar och korsord med 5\u20136 kroppsord', advanced: 'l\u00f6ser komplexa pussel och anv\u00e4nder kroppstermer i skrivna meningar' },
    ],
  },

  camping: {
    seoTitle: 'Gratis Camping\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara camping\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, ordpussel och naturuppgifter med campingtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'camping\u00f6vningar f\u00f6rskoleklass, camping arbetsblad, r\u00e4kning utomhus, Lgr22, ordpussel camping, naturkunskap, friluftsliv barn, t\u00e4lt \u00f6vning, addition subtraktion, utomhuspedagogik',
    snippetAnswer: 'Camping\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder t\u00e4lt, l\u00e4gereldar och naturbider f\u00f6r addition, ordpussel och naturobservation. Friluftslivets popularitet i Sverige g\u00f6r temat extra motiverande. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Campingtemat \u00e4r s\u00e4rskilt relevant f\u00f6r svenska f\u00f6rskoleklassbarn d\u00e4r friluftsliv \u00e4r en central del av kulturen och skolans utomhuspedagogik. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med campingf\u00f6rem\u00e5l (tre kottar plus fyra kottar), ordpussel med friluftsordförr\u00e5d, och naturobservationsuppgifter som kopplar till verkliga utomhusupplevelser. Rumsligt t\u00e4nkande utvecklas n\u00e4r barnen ritar l\u00e4gerkartor och planerar var t\u00e4ltet ska st\u00e5. Lgr22 betonar naturvetenskap och h\u00e5llbar utveckling, och campingtemat integrerar matematik, l\u00e4sf\u00e4rdighet och milj\u00f6medvetenhet i en kontext som barn \u00e4lskar.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion i utomhusscenarier', howWeAddress: 'R\u00e4kneuppgifter med campingf\u00f6rem\u00e5l (t\u00e4lt, kottar, stj\u00e4rnor) g\u00f6r matematik kopplad till friluftsupplevelser' },
      { milestone: 'Rumslig orientering (kartl\u00e4sning och riktningar)', howWeAddress: 'L\u00e4gerkartor d\u00e4r barn ritar in t\u00e4lt, eld och vatten utvecklar rumsligt t\u00e4nkande och begreppsbildning' },
      { milestone: 'Naturvetenskaplig observation (v\u00e4der, djur, v\u00e4xter)', howWeAddress: 'Observationsuppgifter d\u00e4r barn dokumenterar naturfynd p\u00e5 en campingtur st\u00e4rker vetenskapligt t\u00e4nkande' },
      { milestone: 'L\u00e4sf\u00e4rdighet genom friluftsordförr\u00e5d', howWeAddress: 'Ords\u00f6kningar och korsord med campingord (t\u00e4lt, eld, sj\u00f6, skog) bygger ordigenk\u00e4nning' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd konkreta campingf\u00f6rem\u00e5l som komplement, h\u00e5ll r\u00e4kneomr\u00e5det inom fem och fokusera p\u00e5 enkla matchnings\u00f6vningar. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till textuppgifter med campingscenarier, introducera enkel kartritning med riktningar och l\u00e5t barnen skriva campingdagbok.',
    parentTakeaway: 'Camping och utflykter \u00e4r fyllda med l\u00e4randem\u00f6jligheter. R\u00e4kna pinnar till l\u00e4gerelden, m\u00e4t avst\u00e5nd i steg, identifiera v\u00e4xter och djur, och l\u00e5t barnet skriva en campingdagbok. St\u00e4ll fr\u00e5gor: \u201dom vi har tre marshmallows var och vi \u00e4r fyra, hur m\u00e5nga beh\u00f6ver vi?\u201d. Svenska barns naturliga koppling till friluftsliv g\u00f6r varje utflykt till en l\u00e4randestund.',
    classroomIntegration: 'Campingtemat i f\u00f6rskoleklassen passar perfekt ihop med utomhuspedagogik: p\u00e5 utedag \u00f6vas r\u00e4kning och observation i naturen, inne arbetas med campingarbetsblad f\u00f6r matematik och svenska, och i bild skapas l\u00e4gerkartor. Temasamlingar om friluftsliv, s\u00e4kerhet och naturv\u00e5rd kopplar till Lgr22:s m\u00e5l f\u00f6r h\u00e5llbar utveckling och naturvetenskap.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med campingtema', emerging: 'l\u00f6ser additionsuppgifter inom 5 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med campingscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna campingmatematikuppgifter' },
      { skill: 'Rumslig orientering (kartor)', emerging: 'l\u00e4ser en enkel bildkarta med vuxenst\u00f6d', proficient: 'ritar en enkel l\u00e4gerkarta med 4\u20135 element p\u00e5 r\u00e4tt plats', advanced: 'ritar kartor med riktningar och f\u00f6rklarar v\u00e4gen mellan platser muntligt' },
      { skill: 'Ordpussel med friluftsordförr\u00e5d', emerging: 'hittar 2\u20133 ord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ords\u00f6kningar med 5\u20136 campingord', advanced: 'l\u00f6ser korsord och ordf\u00f6rvrngningar med campingordförr\u00e5d' },
    ],
  },

  circus: {
    seoTitle: 'Gratis Cirkus\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara cirkus\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, m\u00f6nster och ordpussel med cirkustema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'cirkus\u00f6vningar f\u00f6rskoleklass, cirkus arbetsblad, m\u00f6nster cirkus, r\u00e4kning f\u00f6rskoleklass, Lgr22, clown matematik, jonglering m\u00f6nster, ordpussel cirkus, sekvens\u00f6vning, kreativ matematik',
    snippetAnswer: 'Cirkus\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder clowner, jongl\u00f6rer och cirkusdjur f\u00f6r r\u00e4kning, m\u00f6nsterigenk\u00e4nning och ordpussel. Det sp\u00e4nnande temat driver stark motivation. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Cirkustemat \u00e4r unikt motiverande f\u00f6r f\u00f6rskoleklassbarn tack vare dess visuella dramatik och \u00f6verraskningsmoment. Fem- och sex\u00e5ringar anv\u00e4nder cirkusscener f\u00f6r m\u00f6nsterigenk\u00e4nning (clown, akrobat, clown, akrobat \u2014 vem kommer h\u00e4rn\u00e4st?), addition med jongl\u00f6rbollar, och symmetri\u00f6vningar med cirkust\u00e4lt. Ordpussel med cirkusordförr\u00e5d bygger l\u00e4sf\u00e4rdighet i en lustfylld kontext. Cirkustemat erbjuder ocks\u00e5 naturliga kopplingar till social-emotionellt l\u00e4rande: mod att tr\u00e4da fram, samarbete i grupp och gl\u00e4dje \u00f6ver andras f\u00f6rest\u00e4llningar. Lgr22:s m\u00e5l f\u00f6r kreativitet och estetiskt l\u00e4rande st\u00f6ds genom cirkusets rika uttrycksformer.',
    developmentalMilestones: [
      { milestone: 'M\u00f6nsterigenk\u00e4nning och sekvensering (AB, ABB, ABC-m\u00f6nster)', howWeAddress: 'Cirkussekvenser d\u00e4r barn forts\u00e4tter m\u00f6nster med artister och f\u00f6rem\u00e5l bygger algebraiskt f\u00f6rt\u00e4nkande' },
      { milestone: 'Addition och subtraktion med visuella r\u00e4kneenheter', howWeAddress: 'R\u00e4kneuppgifter med jongl\u00f6rbollar, cirkusbiljetter och ballonger g\u00f6r matematik till en f\u00f6rest\u00e4llning' },
      { milestone: 'Symmetri och rumsligt t\u00e4nkande', howWeAddress: 'Symmetri\u00f6vningar med cirkust\u00e4lt och clownansikte utvecklar geometrisk f\u00f6rst\u00e5else' },
      { milestone: 'L\u00e4sf\u00e4rdighet med cirkusordförr\u00e5d', howWeAddress: 'Ords\u00f6kningar och korsord med cirkustermer bygger ordigenk\u00e4nning och stavningsmedvetenhet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd enklare AB-m\u00f6nster, begr\u00e4nsa r\u00e4kneomr\u00e5det och fokusera p\u00e5 f\u00e4rgl\u00e4ggning med symmetri. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera ABB- och ABC-m\u00f6nster, textuppgifter med cirkusscenarier och korsord med l\u00e4ngre cirkusord.',
    parentTakeaway: 'Cirkustemat \u00e4r perfekt f\u00f6r att g\u00f6ra matematik rolig hemma. Jonglera med bollar och r\u00e4kna kast, skapa m\u00f6nster med leksaker, och l\u00e5t barnet rita en egen cirkusf\u00f6rest\u00e4llning med publik att r\u00e4kna. Spela cirkus hemma och r\u00e4kna biljetter, platser och f\u00f6rest\u00e4llningsnummer. Koppla gl\u00e4djen till l\u00e4randet \u2014 det \u00e4r cirkusens pedagogiska magi.',
    classroomIntegration: 'Cirkustemat i f\u00f6rskoleklassen lyfter kreativitet och matematik: i matematiken \u00f6vas m\u00f6nster och r\u00e4kning med cirkusmotiv, i svenskan skrivs cirkusber\u00e4ttelser och \u00f6vas ordpussel, i bild och musik skapas en egen klasscirkus. Temaveckor d\u00e4r barnen \u00f6var cirkusnummer st\u00e4rker b\u00e5de grovmotorik och sj\u00e4lvk\u00e4nsla. Lgr22:s m\u00e5l f\u00f6r estetiskt l\u00e4rande integreras med matematik och spr\u00e5k.',
    assessmentRubric: [
      { skill: 'M\u00f6nsterigenk\u00e4nning', emerging: 'forts\u00e4tter enkla AB-m\u00f6nster med konkret st\u00f6d', proficient: 'forts\u00e4tter sj\u00e4lvst\u00e4ndigt AB- och ABB-m\u00f6nster och identifierar regelm\u00e4ssigheten', advanced: 'skapar och forts\u00e4tter ABC-m\u00f6nster och f\u00f6rklarar m\u00f6nsterregeln muntligt' },
      { skill: 'Addition och subtraktion med cirkusbilder', emerging: 'l\u00f6ser additionsuppgifter inom 5 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna cirkusmatematikuppgifter' },
      { skill: 'Ordpussel med cirkusordförr\u00e5d', emerging: 'hittar 2\u20133 cirkusord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ords\u00f6kningar med 5\u20136 cirkusord', advanced: 'l\u00f6ser korsord med cirkustermer och skriver cirkusmeningar' },
    ],
  },

  clothing: {
    seoTitle: 'Gratis Kl\u00e4d\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara kl\u00e4d\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). Sortering, r\u00e4kning och ordpussel med kl\u00e4dtema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'kl\u00e4d\u00f6vningar f\u00f6rskoleklass, kl\u00e4der arbetsblad, sortering kl\u00e4der, r\u00e4kning f\u00f6rskoleklass, Lgr22, \u00e5rstidskl\u00e4der, ordpussel kl\u00e4der, sj\u00e4lvst\u00e4ndighet p\u00e5kl\u00e4dning, kategori \u00f6vning, v\u00e4derkl\u00e4der',
    snippetAnswer: 'Kl\u00e4d\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder kl\u00e4desplagg f\u00f6r sortering, r\u00e4kning och ordpussel. Barnen l\u00e4r sig koppla kl\u00e4dval till v\u00e4der och \u00e5rstid. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Kl\u00e4dtemat \u00e4r s\u00e4rskilt l\u00e4mpat f\u00f6r f\u00f6rskoleklass eftersom barnen f\u00f6rv\u00e4ntas bli alltmer sj\u00e4lvst\u00e4ndiga i sin p\u00e5kl\u00e4dning och sina v\u00e4derkl\u00e4dval. Fem- och sex\u00e5ringar l\u00f6ser sorteringsuppgifter (vinterkl\u00e4der vs. sommerkl\u00e4der), r\u00e4kneuppgifter (hur m\u00e5nga vantar beh\u00f6vs till sex barn?), och ordpussel med kl\u00e4dordförr\u00e5d. M\u00f6nster\u00f6vningar med randiga och rutiga plagg introducerar geometriska begrepp. Kl\u00e4dtemat kopplar ocks\u00e5 till sj\u00e4lvst\u00e4ndighet, vardagsplanering och v\u00e4derf\u00f6rst\u00e5else. Lgr22 betonar elevernas vardagsmatematik och sj\u00e4lvst\u00e4ndighet, och kl\u00e4der \u00e4r n\u00e5got varje barn hanterar dagligen.',
    developmentalMilestones: [
      { milestone: 'Klassificering efter \u00e5rstid och v\u00e4der (logisk sortering)', howWeAddress: 'Sorteringsuppgifter d\u00e4r barn placerar kl\u00e4desplagg i r\u00e4tt \u00e5rstidskategori bygger logiskt resonemang' },
      { milestone: 'Multiplikativt t\u00e4nkande (parbildning: vantar, skor, strumpor)', howWeAddress: 'R\u00e4kneuppgifter som kr\u00e4ver tv\u00e5-av-varje-t\u00e4nkande introducerar tidigt multiplikativt resonemang' },
      { milestone: 'M\u00f6nsterigenk\u00e4nning (r\u00e4nder, rutor, prickar)', howWeAddress: 'Kl\u00e4dplangm\u00f6nster d\u00e4r barn forts\u00e4tter och skapar m\u00f6nster bygger geometrisk f\u00f6rst\u00e5else' },
      { milestone: 'Ordkunskap och stavning (kl\u00e4dordförr\u00e5d)', howWeAddress: 'Ords\u00f6kningar och korsord med kl\u00e4dtermer st\u00e4rker l\u00e4sf\u00e4rdighet och ordigenk\u00e4nning' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd riktiga kl\u00e4desplagg f\u00f6r konkret sortering, begr\u00e4nsa till tv\u00e5 kategorier (\u00e5rstider) och fokusera p\u00e5 v\u00e4lk\u00e4nda plagg. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till r\u00e4kneuppgifter med parbildning, m\u00f6nster med tre element och skrivuppgifter d\u00e4r barnen beskriver sin favoritoutfit.',
    parentTakeaway: 'P\u00e5kl\u00e4dningen varje morgon \u00e4r en l\u00e4randestund. L\u00e5t barnet v\u00e4lja kl\u00e4der efter v\u00e4dret och fr\u00e5ga varf\u00f6r. R\u00e4kna strumpor i tv\u00e4tten, sortera kl\u00e4der efter f\u00e4rg, och \u00f6va ordningen (f\u00f6rst underl\u00e4der, sen byxor, sist tröjan). F\u00f6rskoleklassbarnet beh\u00f6ver \u00f6va sj\u00e4lvst\u00e4ndighet, och kl\u00e4drutiner bygger b\u00e5de planeringsf\u00f6rm\u00e5ga och sekvensering.',
    classroomIntegration: 'Kl\u00e4dtemat i f\u00f6rskoleklassen kopplar till vardagskunskap: p\u00e5 matemiklektionen r\u00e4knas och sorteras kl\u00e4desplagg, i svenskan \u00f6vas kl\u00e4dord i pussel och skrivuppgifter, och under samlingar diskuteras v\u00e4derkl\u00e4dval. \u00c5rstidsf\u00f6r\u00e4ndringar ger naturliga tillf\u00e4llen att \u00e5tervnda till temat. Lgr22:s m\u00e5l f\u00f6r sj\u00e4lvst\u00e4ndighet och vardagsmatematik st\u00f6ds direkt.',
    assessmentRubric: [
      { skill: 'Sortering av kl\u00e4der efter \u00e5rstid', emerging: 'sorterar kl\u00e4der i vinter/sommar med st\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt i fyra \u00e5rstider och f\u00f6rklarar valet', advanced: 'sorterar efter flera kriterier (\u00e5rstid + aktivitet) och motiverar' },
      { skill: 'R\u00e4kning med kl\u00e4desplagg (parbildning)', emerging: 'r\u00e4knar enstaka kl\u00e4desplagg med st\u00f6d', proficient: 'l\u00f6ser parbildningsuppgifter (hur m\u00e5nga vantar till 5 barn?)', advanced: 'l\u00f6ser flerstegsuppgifter och skriver egna r\u00e4kneuppgifter med kl\u00e4dtema' },
      { skill: 'Ordpussel med kl\u00e4dordförr\u00e5d', emerging: 'hittar 2\u20133 kl\u00e4dord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ords\u00f6kningar med 5\u20136 kl\u00e4dord', advanced: 'l\u00f6ser korsord med kl\u00e4dtermer och skriver klädsbeskrivningar' },
    ],
  },

  colors: {
    seoTitle: 'Gratis F\u00e4rg\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara f\u00e4rg\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). F\u00e4rgblandning, m\u00f6nster och ordpussel med f\u00e4rgtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'f\u00e4rg\u00f6vningar f\u00f6rskoleklass, f\u00e4rger arbetsblad, f\u00e4rgblandning, m\u00f6nster f\u00e4rger, Lgr22, prim\u00e4rf\u00e4rger sekund\u00e4rf\u00e4rger, ordpussel f\u00e4rger, f\u00e4rgsortering, diagram f\u00e4rger, estetiskt l\u00e4rande',
    snippetAnswer: 'F\u00e4rg\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder f\u00e4rgblandning, m\u00f6nster och diagram f\u00f6r att utforska prim\u00e4r- och sekund\u00e4rf\u00e4rger. Ordpussel med f\u00e4rgord bygger l\u00e4sf\u00e4rdighet. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I f\u00f6rskoleklass utvecklas f\u00e4rgtemat fr\u00e5n grundl\u00e4ggande namngivning till f\u00e4rgteori och datainsamling. Fem- och sex\u00e5ringar utforskar f\u00e4rgblandning (r\u00f6d + gul = orange), sorterar f\u00f6rem\u00e5l efter f\u00e4rg och skapar stapeldiagram \u00f6ver favoritf\u00e4rger i klassen. M\u00f6nster med f\u00e4rgsekvenser bygger algebraiskt f\u00f6rt\u00e4nkande. Ordpussel med f\u00e4rgnamn p\u00e5 svenska st\u00e4rker stavning och ordigenk\u00e4nning. F\u00e4rg \u00e4r ocks\u00e5 en bro till k\u00e4nslor (varma vs. kalla f\u00e4rger) och estetik. Lgr22 betonar b\u00e5de matematiskt t\u00e4nkande och estetiskt l\u00e4rande, och f\u00e4rgtemat integrerar b\u00e5da p\u00e5 ett engagerande s\u00e4tt.',
    developmentalMilestones: [
      { milestone: 'F\u00e4rgblandningsf\u00f6rst\u00e5else (prim\u00e4rf\u00e4rger bildar sekund\u00e4rf\u00e4rger)', howWeAddress: 'F\u00e4rgblandnings\u00f6vningar d\u00e4r barn f\u00f6ruts\u00e4ger resultat och verifierar bygger vetenskapligt t\u00e4nkande' },
      { milestone: 'Datainsamling och diagram (stapeldiagram med f\u00e4rger)', howWeAddress: 'Unders\u00f6kningar av favoritf\u00e4rger i klassen med stapeldiagram introducerar statistiskt t\u00e4nkande' },
      { milestone: 'M\u00f6nsterigenk\u00e4nning med f\u00e4rgsekvenser', howWeAddress: 'F\u00e4rgm\u00f6nster som barn forts\u00e4tter och skapar bygger algebraiskt f\u00f6rt\u00e4nkande' },
      { milestone: 'Stavning och ordigenk\u00e4nning (f\u00e4rgord p\u00e5 svenska)', howWeAddress: 'Ords\u00f6kningar och korsord med f\u00e4rgnamn tr\u00e4nar visuell ordigenk\u00e4nning' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, arbeta med de sex grundl\u00e4ggande f\u00e4rgerna, anv\u00e4nd konkret m\u00e5lning f\u00f6r f\u00e4rgblandning och h\u00e5ll m\u00f6nstren enkla. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera nyanser och skuggor, l\u00e4gg till tvåstegsm\u00f6nster och l\u00e5t barnen skapa egna diagramfr\u00e5gor utifr\u00e5n f\u00e4rgdata.',
    parentTakeaway: 'F\u00e4rger \u00e4r \u00f6verallt och g\u00f6r l\u00e4rande enkelt hemma. Blanda f\u00e4rger med vattenf\u00e4rg och fr\u00e5ga vad som h\u00e4nder n\u00e4r r\u00f6d m\u00f6ter bl\u00e5. Sortera leksaker efter f\u00e4rg, skapa m\u00f6nster med p\u00e4rlor, och l\u00e5t barnet g\u00f6ra en favoritf\u00e4rgsunders\u00f6kning i familjen. Prata om varma och kalla f\u00e4rger och hur f\u00e4rger p\u00e5verkar k\u00e4nslor. Varje ritdstund \u00e4r en f\u00e4rglektion.',
    classroomIntegration: 'F\u00e4rgtemat i f\u00f6rskoleklassen integreras tv\u00e4rs \u00f6ver \u00e4mnen: i matematiken skapas diagram och m\u00f6nster, i svenskan \u00f6vas f\u00e4rgord i pussel, i bild utforskas f\u00e4rgblandning, och i NO diskuteras ljus och f\u00e4rg. Klassens favoritf\u00e4rgsunders\u00f6kning med stapeldiagram kopplar till Lgr22:s m\u00e5l f\u00f6r statistik och estetiskt l\u00e4rande.',
    assessmentRubric: [
      { skill: 'F\u00e4rgblandning', emerging: 'namnger prim\u00e4rf\u00e4rgerna och blandar med vuxenst\u00f6d', proficient: 'f\u00f6ruts\u00e4ger sj\u00e4lvst\u00e4ndigt resultatet av prim\u00e4rf\u00e4rgsblandningar', advanced: 'blandar nyanser och beskriver f\u00e4rgrelationer (komplementf\u00e4rger)' },
      { skill: 'Datainsamling med f\u00e4rgdiagram', emerging: 'fyller i ett f\u00e4rdiggjort stapeldiagram med vuxenst\u00f6d', proficient: 'skapar sj\u00e4lvst\u00e4ndigt ett stapeldiagram och l\u00e4ser av resultaten', advanced: 'st\u00e4ller egna fr\u00e5gor utifr\u00e5n diagramdata och j\u00e4mf\u00f6r kategorier' },
      { skill: 'M\u00f6nster med f\u00e4rgsekvenser', emerging: 'forts\u00e4tter enkla AB-m\u00f6nster med f\u00e4rger', proficient: 'forts\u00e4tter och skapar ABB-m\u00f6nster sj\u00e4lvst\u00e4ndigt', advanced: 'skapar ABC-m\u00f6nster och f\u00f6rklarar m\u00f6nsterregeln' },
    ],
  },

  construction: {
    seoTitle: 'Gratis Bygg\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara bygg\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). Geometri, m\u00e4tning och ordpussel med byggtema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'bygg\u00f6vningar f\u00f6rskoleklass, konstruktion arbetsblad, geometri f\u00f6rskoleklass, m\u00e4tning byggprojekt, Lgr22, former och figurer, ordpussel bygg, byggverktyg, rumsligt t\u00e4nkande, probleml\u00f6sning',
    snippetAnswer: 'Bygg\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder konstruktionsscener f\u00f6r geometri, m\u00e4tning och ordpussel. Barnen \u00f6var former, rumsligt t\u00e4nkande och probleml\u00f6sning. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Byggtemat \u00e4r idealiskt f\u00f6r f\u00f6rskoleklass d\u00e4r barn \u00e4r redo f\u00f6r konkret geometri och rumsligt t\u00e4nkande. Fem- och sex\u00e5ringar identifierar geometriska former i byggnader (rektangul\u00e4ra f\u00f6nster, triangul\u00e4ra tak), m\u00e4ter med linjal och icke-standardm\u00e5tt, och l\u00f6ser rumsliga pussel. Konstruktionsscenarier bygger probleml\u00f6sningsf\u00f6rm\u00e5ga n\u00e4r barnen planerar och utv\u00e4rderar: vilka former beh\u00f6vs f\u00f6r att bygga ett hus? M\u00e4tning av l\u00e4ngd och h\u00f6jd med byggmaterial introducerar standardm\u00e5tt. Ordpussel med byggordförr\u00e5d st\u00e4rker l\u00e4sf\u00e4rdigheten. Lgr22 betonar geometri och probleml\u00f6sning, och byggtemat uppfyller b\u00e5da m\u00e5len i en praktisk kontext.',
    developmentalMilestones: [
      { milestone: 'Geometrisk formigenk\u00e4nning i verkliga strukturer', howWeAddress: 'Aktiviteter d\u00e4r barn identifierar former i byggnader (rektanglar, trianglar, cirklar) kopplar geometri till verkligheten' },
      { milestone: 'M\u00e4tning med linjal och icke-standardm\u00e5tt', howWeAddress: 'M\u00e4t\u00f6vningar med byggmaterial utvecklar f\u00f6rst\u00e5else f\u00f6r l\u00e4ngd, h\u00f6jd och bredd' },
      { milestone: 'Rumsligt t\u00e4nkande och planering', howWeAddress: 'Byggrutor d\u00e4r barn v\u00e4ljer r\u00e4tt former f\u00f6r att komplettera en konstruktion utvecklar rumslig f\u00f6rest\u00e4llningsf\u00f6rm\u00e5ga' },
      { milestone: 'Teknisk probleml\u00f6sning (planera, bygga, utv\u00e4rdera)', howWeAddress: 'Designuppgifter d\u00e4r barn planerar en konstruktion, v\u00e4ljer material och utv\u00e4rderar resultatet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre grundformer (cirkel, fyrkant, triangel), anv\u00e4nd byggklossar som konkret komplement och fokusera p\u00e5 formigenk\u00e4nning. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera fler former (hexagon, romb), l\u00e4gg till m\u00e4tning med linjal i centimeter och l\u00e5t barnen designa egna byggnader med geometriska specifikationer.',
    parentTakeaway: 'Allt som byggs hemma \u00e4r en geometri- och matematiklektion. L\u00e5t barnet bygga med klossar och prata om formerna: \u201dden \u00e4r rektangul\u00e4r, den \u00e4r triangul\u00e4r\u201d. M\u00e4t m\u00f6bler med en m\u00e5ttstock, r\u00e4kna fönster p\u00e5 huset, och j\u00e4mf\u00f6r h\u00f6jder. N\u00e4r ni g\u00e5r f\u00f6rbi en byggarbetsplats, prata om vad som byggs och vilka former ni ser. Varje konstruktion \u00e4r en l\u00e4randestund.',
    classroomIntegration: 'Byggtemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: i matematiken \u00f6vas geometri och m\u00e4tning med byggscenarier, i teknik och NO bygger och utv\u00e4rderar barnen konstruktioner, i svenskan \u00f6vas byggordförr\u00e5d i pussel, och i bild ritar barnen arkitektritningar. Byggh\u00f6rnan kompletterar arbetsbladen med hands-on-upplevelser.',
    assessmentRubric: [
      { skill: 'Geometrisk formigenk\u00e4nning', emerging: 'identifierar cirkel, fyrkant och triangel med st\u00f6d', proficient: 'namnger sj\u00e4lvst\u00e4ndigt 5\u20136 former och hittar dem i byggnader', advanced: 'beskriver formers egenskaper (sidor, h\u00f6rn) och anv\u00e4nder dem i konstruktioner' },
      { skill: 'M\u00e4tning (l\u00e4ngd och h\u00f6jd)', emerging: 'm\u00e4ter med icke-standardm\u00e5tt med vuxenst\u00f6d', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt med linjal och registrerar resultaten', advanced: 'j\u00e4mf\u00f6r m\u00e4tningar och ber\u00e4knar skillnader mellan l\u00e4ngder' },
      { skill: 'Ordpussel med byggordförr\u00e5d', emerging: 'hittar 2\u20133 byggord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ords\u00f6kningar med 5\u20136 byggord', advanced: 'l\u00f6ser korsord med byggtermer och anv\u00e4nder dem i skrivna meningar' },
    ],
  },

  cooking: {
    seoTitle: 'Gratis Matlagnings\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara matlagnings\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). M\u00e4tning, br\u00e5k och ordpussel med mattema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'matlagnings\u00f6vningar f\u00f6rskoleklass, matlagning arbetsblad, m\u00e4tning recept, br\u00e5k halva, Lgr22, ordpussel matlagning, receptl\u00e4sning, k\u00f6ksmatematik, sekvens\u00f6vning, h\u00e4lsa och mat',
    snippetAnswer: 'Matlagnings\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder recept och k\u00f6ksscenarier f\u00f6r m\u00e4tning, enkel br\u00e5kf\u00f6rst\u00e5else och ordpussel. Barnen l\u00e4r sig f\u00f6lja instruktioner i r\u00e4tt ordning. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Matlagningstemat \u00e4r unikt kraftfullt i f\u00f6rskoleklass d\u00e4r barn \u00e4r redo f\u00f6r m\u00e4tning, sekvensering och tidig br\u00e5kf\u00f6rst\u00e5else. Fem- och sex\u00e5ringar m\u00e4ter ingredienser med decilitermat och matskedar, l\u00e4r sig halva och fj\u00e4rdedel genom att dela pizza och sm\u00f6rg\u00e5sar, och f\u00f6ljer receptsteg i r\u00e4tt ordning. Receptl\u00e4sning \u00e4r en autentisk l\u00e4s\u00f6vning som visar barn att l\u00e4sning har praktiskt syfte. K\u00f6ksmatematiken inkluderar r\u00e4kning av ingredienser, tidsuppfattning vid bakning, och j\u00e4mf\u00f6relse av m\u00e4ngder. Lgr22 betonar vardagsmatematik och h\u00e4lsa, och matlagningstemat integrerar b\u00e5da naturligt.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning med standardm\u00e5tt (dl, msk, tsk)', howWeAddress: 'Recept\u00f6vningar d\u00e4r barn m\u00e4ter ingredienser med r\u00e4tt m\u00e5tt introducerar standardm\u00e4tning' },
      { milestone: 'Tidig br\u00e5kf\u00f6rst\u00e5else (halva, fj\u00e4rdedel)', howWeAddress: 'Delningsuppgifter d\u00e4r barn delar pizza och sm\u00f6rg\u00e5sar i lika delar g\u00f6r br\u00e5k begripligt' },
      { milestone: 'Sekvensering (f\u00f6lja steg i r\u00e4tt ordning)', howWeAddress: 'Receptsteg som barn ordnar kronologiskt tr\u00e4nar logisk sekvensering och instruktionsf\u00f6rst\u00e5else' },
      { milestone: 'L\u00e4sf\u00e4rdighet genom receptl\u00e4sning', howWeAddress: 'Enkla recept med bilder och text ger autentisk l\u00e4s\u00f6vning med praktiskt syfte' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd bildrecept med f\u00e4rre steg, fokusera p\u00e5 m\u00e4tning med ett m\u00e5tt i taget och g\u00f6r konkret matlagning som komplement. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera skrivna recept utan bilder, l\u00e4gg till uppgifter d\u00e4r de f\u00f6rdubblar eller halverar recept, och l\u00e5t dem skriva egna recept.',
    parentTakeaway: 'K\u00f6ket \u00e4r det b\u00e4sta klassrummet hemma. Laga mat tillsammans och l\u00e5t barnet m\u00e4ta ingredienser, r\u00e4kna \u00e4gg, och f\u00f6lja receptet steg f\u00f6r steg. Fr\u00e5ga: \u201dom vi beh\u00f6ver tv\u00e5 dl mj\u00f6l och har h\u00e4llt en, hur mycket m\u00e5ste vi l\u00e4gga till?\u201d. Dela en sm\u00f6rg\u00e5s p\u00e5 mitten och prata om halva. Varje m\u00e5ltid \u00e4r en matematik- och l\u00e4slektion.',
    classroomIntegration: 'Matlagningstemat i f\u00f6rskoleklassen kopplar till Lgr22:s m\u00e5l: i matematiken \u00f6vas m\u00e4tning och br\u00e5k med receptscenarier, i svenskan l\u00e4ses och skrivs enkla recept, i NO diskuteras n\u00e4ring och h\u00e4lsa, och i hemkunskap eller temadagar lagas verklig mat. Receptb\u00f6cker som klassen skapar tillsammans blir b\u00e5de l\u00e4s\u00f6vning och dokumentation.',
    assessmentRubric: [
      { skill: 'M\u00e4tning med k\u00f6ksm\u00e5tt', emerging: 'h\u00e4ller i r\u00e4tt m\u00e5tt med vuxenst\u00f6d', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt med dl och msk och registrerar m\u00e4ngder', advanced: 'j\u00e4mf\u00f6r m\u00e4ngder och f\u00f6rdubblar eller halverar recept' },
      { skill: 'Br\u00e5kf\u00f6rst\u00e5else (halva, fj\u00e4rdedel)', emerging: 'delar f\u00f6rem\u00e5l i tv\u00e5 lika delar med st\u00f6d', proficient: 'delar sj\u00e4lvst\u00e4ndigt i halva och fj\u00e4rdedel och namnger delarna', advanced: 'l\u00f6ser br\u00e5kuppgifter i receptkontext och f\u00f6rklarar sitt resonemang' },
      { skill: 'Receptsekvensering', emerging: 'ordnar 3\u20134 receptsteg med bildst\u00f6d', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt 5\u20136 steg i r\u00e4tt ordning', advanced: 'skriver egna recept med korrekta steg och m\u00e4ngdangivelser' },
    ],
  },

  dinosaurs: {
    seoTitle: 'Gratis Dinosaurie\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara dinosaurie\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, storleksj\u00e4mf\u00f6relse och ordpussel med dinosaurietema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'dinosaurie\u00f6vningar f\u00f6rskoleklass, dinosaurier arbetsblad, r\u00e4kna dinosaurier, storleksj\u00e4mf\u00f6relse, Lgr22, ordpussel dinosaurier, tidsuppfattning, klassificering dinosaurier, addition subtraktion, paleontologi barn',
    snippetAnswer: 'Dinosaurie\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder dinosaurier f\u00f6r r\u00e4kning, storleksj\u00e4mf\u00f6relse och ordpussel. Barnens dinosauriefascination driver stark l\u00e4randemotivation. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Dinosaurietemat i f\u00f6rskoleklass utnyttjar barnens intensiva fascination f\u00f6r att driva avancerade l\u00e4rande\u00f6vningar. Fem- och sex\u00e5ringar anv\u00e4nder dinosaurier f\u00f6r storleksj\u00e4mf\u00f6relser (l\u00e5ng/kort, tung/l\u00e4tt), tids\u00e5ldersbegrepp (l\u00e4nge sedan/nu), och vetenskaplig klassificering (\u00e4tit v\u00e4xter/\u00e4tit k\u00f6tt). Addition och subtraktion inom tio f\u00e5r extra dragningskraft n\u00e4r dinosaurier \u00e4r r\u00e4kneenheterna. Ordpussel med dinosaurienamn bygger b\u00e5de l\u00e4sf\u00e4rdighet och naturvetenskapligt ordförr\u00e5d. Lgr22 betonar naturvetenskaplig nyfikenhet och tidsperspektiv, och dinosaurietemat uppfyller b\u00e5da genom att kombinera matematik med paleontologisk utforskning.',
    developmentalMilestones: [
      { milestone: 'Storleksj\u00e4mf\u00f6relse och ordning (l\u00e4ngst, st\u00f6rst, tyngst)', howWeAddress: 'J\u00e4mf\u00f6relsuppgifter d\u00e4r barn ordnar dinosaurier efter storlek bygger m\u00e4tbegrepp och ordningsf\u00f6rst\u00e5else' },
      { milestone: 'Tidsuppfattning (l\u00e4nge sedan, nu, nutid vs. forntid)', howWeAddress: 'Tidslinje\u00f6vningar som placerar dinosaurier i forntiden och nutidens djur i nutid utvecklar tidsperspektiv' },
      { milestone: 'Addition och subtraktion med dinosauriebilder', howWeAddress: 'R\u00e4kneuppgifter d\u00e4r dinosaurier anl\u00e4nder och f\u00f6rsvinner fr\u00e5n scener g\u00f6r matematik sp\u00e4nnande' },
      { milestone: 'Vetenskaplig klassificering (växt\u00e4tare vs. k\u00f6tt\u00e4tare)', howWeAddress: 'Sorteringsuppgifter d\u00e4r barn grupperar dinosaurier efter kost och kroppssegenskaper introducerar biologisk klassificering' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fyra eller fem v\u00e4lk\u00e4nda dinosaurier, anv\u00e4nd plastdinosaurier som konkret komplement och h\u00e5ll j\u00e4mf\u00f6relserna enkla (stor/liten). F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till fler arter med detaljerade fakta, introducera textuppgifter och l\u00e5t barnen skapa egna dinosauriefakta sidor med text och bild.',
    parentTakeaway: 'Dinosaurier \u00e4r en av de st\u00f6rsta l\u00e4randemotorerna f\u00f6r barn. Hemma kan ni j\u00e4mf\u00f6ra plastdinosauriers storlek, r\u00e4kna samlingen, l\u00e4sa faktab\u00f6cker och prata om varf\u00f6r dinosaurierna f\u00f6rsvann. St\u00e4ll fr\u00e5gor: \u201dom tre triceratops m\u00f6ter tv\u00e5 stegosaurar, hur m\u00e5nga \u00e4r det totalt?\u201d. Bes\u00f6k naturhistoriska museet f\u00f6r att g\u00f6ra l\u00e4randet levande.',
    classroomIntegration: 'Dinosaurietemat i f\u00f6rskoleklassen kopplar till Lgr22:s m\u00e5l f\u00f6r matematik och NO: r\u00e4kne\u00f6vningar med dinosaurier p\u00e5 matematiklektionen, artnamn och klassificering p\u00e5 NO, ords\u00f6kningar och faktatexter i svenskan, och dinosauriekonst i bild. Temaveckor med utst\u00e4llning av barnens arbeten skapar en meningsfull l\u00e4randemilj\u00f6.',
    assessmentRubric: [
      { skill: 'Storleksj\u00e4mf\u00f6relse och ordning', emerging: 'j\u00e4mf\u00f6r tv\u00e5 dinosaurier (stor/liten) med bildst\u00f6d', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt 4\u20135 dinosaurier efter storlek och anv\u00e4nder ordningsbegrepp', advanced: 'ordnar 6+ dinosaurier och f\u00f6rklarar sitt resonemang med j\u00e4mf\u00f6relseord' },
      { skill: 'Addition och subtraktion med dinosauriebilder', emerging: 'l\u00f6ser additionsuppgifter inom 5 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med dinosauriescenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna tals\u00e4tser' },
      { skill: 'Ordpussel med dinosaurienamn', emerging: 'hittar 2\u20133 namn i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 dinosaurienamn', advanced: 'stavar dinosaurienamn korrekt och anv\u00e4nder dem i skrivna meningar' },
    ],
  },

  easter: {
    seoTitle: 'Gratis P\u00e5sk\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara p\u00e5sk\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, m\u00f6nster och ordpussel med p\u00e5sktema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'p\u00e5sk\u00f6vningar f\u00f6rskoleklass, p\u00e5sk arbetsblad, r\u00e4kna p\u00e5sk\u00e4gg, m\u00f6nster p\u00e5sk, Lgr22, symmetri \u00e4gg, ordpussel p\u00e5sk, addition subtraktion, p\u00e5sktraditioner, sekvens\u00f6vning',
    snippetAnswer: 'P\u00e5sk\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder p\u00e5sk\u00e4gg, kycklingar och p\u00e5skk\u00e4rringar f\u00f6r r\u00e4kning, m\u00f6nster och ordpussel. Svenska p\u00e5sktraditioner g\u00f6r temat extra engagerande. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'P\u00e5sktemat i f\u00f6rskoleklass utnyttjar Svenska p\u00e5sktraditioner \u2014 p\u00e5skk\u00e4rringar, \u00e4ggm\u00e5lning och p\u00e5skris \u2014 f\u00f6r rik l\u00e4randeupplevelse. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med p\u00e5sk\u00e4gg, skapar symmetriska m\u00f6nster p\u00e5 \u00e4gg, och ordnar p\u00e5sktraditioner i sekvens. M\u00f6nster\u00f6vningar med dekorerade \u00e4gg bygger algebraiskt f\u00f6rt\u00e4nkande och symmetrif\u00f6rst\u00e5else. Ordpussel med p\u00e5skordförr\u00e5d st\u00e4rker l\u00e4sf\u00e4rdigheten. Lgr22 betonar kulturellt l\u00e4rande och matematiskt t\u00e4nkande, och p\u00e5sktemat integrerar b\u00e5da genom traditioner som alla barn k\u00e4nner till.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med p\u00e5skmotiv', howWeAddress: 'R\u00e4kneuppgifter med p\u00e5sk\u00e4gg, kycklingar och godis g\u00f6r matematik kopplad till det k\u00e4ra firandet' },
      { milestone: 'Symmetri och m\u00f6nster (\u00e4ggdekorering)', howWeAddress: 'Symmetriska \u00e4ggdekorations\u00f6vningar d\u00e4r barn skapar speglade m\u00f6nster bygger geometrisk f\u00f6rst\u00e5else' },
      { milestone: 'Sekvensering (p\u00e5skf\u00f6rberedelser i r\u00e4tt ordning)', howWeAddress: 'Ordningsuppgifter d\u00e4r barn placerar p\u00e5sktraditioner kronologiskt tr\u00e4nar logisk sekvensering' },
      { milestone: 'Kulturell och spr\u00e5klig medvetenhet (p\u00e5skordförr\u00e5d)', howWeAddress: 'Ords\u00f6kningar och korsord med p\u00e5sktermer bygger ordkunskap och kulturf\u00f6rst\u00e5else' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, h\u00e5ll r\u00e4kneomr\u00e5det inom fem, anv\u00e4nd konkreta p\u00e5sk\u00e4gg som komplement och fokusera p\u00e5 enkla AB-m\u00f6nster. F\u00f6r avancerade f\u00f6rskoleklassbarn utvidga r\u00e4kneomr\u00e5det, l\u00e4gg till komplexa symmetriska m\u00f6nster och l\u00e5t barnen skriva p\u00e5skber\u00e4ttelser med ordlistor.',
    parentTakeaway: 'P\u00e5sken \u00e4r full av l\u00e4randem\u00f6jligheter hemma. R\u00e4kna \u00e4gg i p\u00e5sk\u00e4ggsjakten, m\u00e5la symmetriska m\u00f6nster p\u00e5 \u00e4gg, och f\u00f6rdela godis lika i p\u00e5sk\u00e4ggen. Ber\u00e4tta om p\u00e5sktraditioner och l\u00e5t barnet ordna f\u00f6rberedelserna i r\u00e4tt ordning. Kl\u00e4 ut er till p\u00e5skk\u00e4rringar och prata om traditionen. Varje p\u00e5skaktivitet kan bli en matematik- och spr\u00e5klektion.',
    classroomIntegration: 'P\u00e5sktemat i f\u00f6rskoleklassen integreras naturligt med v\u00e5ren: i matematiken l\u00f6ses r\u00e4kne- och m\u00f6nsteruppgifter med p\u00e5skmotiv, i svenskan l\u00e4ses p\u00e5skber\u00e4ttelser och \u00f6vas ordpussel, i bild m\u00e5las \u00e4gg med symmetriska m\u00f6nster, och i samlingen diskuteras p\u00e5sktraditioner. Lgr22:s m\u00e5l f\u00f6r kulturell medvetenhet och matematik st\u00f6ds genom denna integration.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med p\u00e5skmotiv', emerging: 'r\u00e4knar p\u00e5sk\u00e4gg inom 5 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med p\u00e5sktema', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna p\u00e5skmatematikuppgifter' },
      { skill: 'Symmetri (\u00e4ggm\u00f6nster)', emerging: 'kopierar ett enkelt m\u00f6nster p\u00e5 en \u00e4gghalva', proficient: 'skapar sj\u00e4lvst\u00e4ndigt symmetriska m\u00f6nster p\u00e5 \u00e4gg', advanced: 'designar komplexa symmetriska dekorationer och f\u00f6rklarar symmetrilinjen' },
      { skill: 'P\u00e5skordförr\u00e5d (ords\u00f6kning/korsord)', emerging: 'hittar 2\u20133 p\u00e5skord med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 p\u00e5skord', advanced: 'anv\u00e4nder p\u00e5skord korrekt i skrivna meningar och ber\u00e4ttelser' },
    ],
  },

  emotions: {
    seoTitle: 'Gratis K\u00e4nslo\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara k\u00e4nslo\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). K\u00e4nsloigenk\u00e4nning, ordpussel och sociala scenarier. 33 generatorer. Gratis PDF.',
    seoKeywords: 'k\u00e4nslo\u00f6vningar f\u00f6rskoleklass, k\u00e4nslor arbetsblad, social-emotionellt l\u00e4rande, Lgr22, k\u00e4nsloord, empati \u00f6vning, konfliktl\u00f6sning, sj\u00e4lvreglering barn, ordpussel k\u00e4nslor, ansiktsuttryck',
    snippetAnswer: 'K\u00e4nslo\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder ansiktsuttryck och sociala scenarier f\u00f6r k\u00e4nsloigenk\u00e4nning, empati\u00f6vning och ordpussel. Barnen l\u00e4r sig namnge och hantera k\u00e4nslor. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'K\u00e4nslotemat i f\u00f6rskoleklass \u00e4r avg\u00f6rande f\u00f6r skolstarten d\u00e5 barn m\u00f6ter nya sociala utmaningar. Fem- och sex\u00e5ringar beh\u00f6ver utveckla f\u00f6rm\u00e5gan att namnge komplexa k\u00e4nslor (frustrerad, avundsjuk, stolt), f\u00f6rst\u00e5 andras perspektiv, och anv\u00e4nda strategier f\u00f6r sj\u00e4lvreglering. Arbetsblad med sociala scenarier l\u00e4r barn att l\u00e4sa ansiktsuttryck, f\u00f6rutse konsekvenser av handlingar och v\u00e4lja l\u00e4mpliga reaktioner. Ordpussel med k\u00e4nsloord bygger det ordförr\u00e5d som beh\u00f6vs f\u00f6r att uttrycka sig verbalt ist\u00e4llet f\u00f6r fysiskt. Lgr22 betonar social kompetens och sj\u00e4lvk\u00e4nnedom, och k\u00e4nslotemat st\u00f6djer dessa m\u00e5l systematiskt.',
    developmentalMilestones: [
      { milestone: 'Nyanserad k\u00e4nsloigenk\u00e4nning (ut\u00f6ver glad/ledsen till frustrerad, stolt, avundsjuk)', howWeAddress: 'Matchnings\u00f6vningar med nyanserade ansiktsuttryck och situationsbilder utvidgar k\u00e4nsloordförr\u00e5det' },
      { milestone: 'Perspektivtagande (f\u00f6rst\u00e5 andras k\u00e4nslor i sociala situationer)', howWeAddress: 'Scenariobaserade uppgifter d\u00e4r barn identifierar hur alla parter k\u00e4nner sig bygger empati' },
      { milestone: 'Sj\u00e4lvreglering (strategier f\u00f6r att hantera starka k\u00e4nslor)', howWeAddress: 'Arbetsblad d\u00e4r barn v\u00e4ljer l\u00e4mplig strategi (djupandning, r\u00e4kna till tio, prata med vuxen) f\u00f6r olika situationer' },
      { milestone: 'K\u00e4nslouttryck genom skrift och ord', howWeAddress: 'Ords\u00f6kningar och skrivuppgifter med k\u00e4nsloord bygger verbal uttrycksf\u00f6rm\u00e5ga f\u00f6r emotioner' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, b\u00f6rja med grundk\u00e4nslor (glad, ledsen, arg, r\u00e4dd), anv\u00e4nd tydliga ansiktsbilder och fokusera p\u00e5 igenk\u00e4nning f\u00f6re strategier. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till nyanserade k\u00e4nslor, komplexa sociala scenarier med flera perspektiv och skrivuppgifter d\u00e4r barnen beskriver l\u00f6sningsstrategier.',
    parentTakeaway: 'K\u00e4nslor \u00e4r n\u00e5got ni \u00f6var varje dag hemma. Namnge k\u00e4nslor h\u00f6gt: \u201djag ser att du \u00e4r frustrerad\u201d. L\u00e4s bilderb\u00f6cker och fr\u00e5ga hur figurerna k\u00e4nner sig. \u00d6va strategier: \u201dn\u00e4r du blir arg, vad kan du g\u00f6ra?\u201d. Spela rollspel med situationer som att dela leksaker. I f\u00f6rskoleklass m\u00f6ter barnet m\u00e5nga nya sociala situationer, och ett rikt k\u00e4nsloordförr\u00e5d \u00e4r det b\u00e4sta verktyget.',
    classroomIntegration: 'K\u00e4nslotemat i f\u00f6rskoleklassen integreras dagligen: morgonsamling b\u00f6rjar med k\u00e4nsloinkeckning (\u201dhur k\u00e4nner du dig idag?\u201d), i svenskan \u00f6vas k\u00e4nsloord i pussel och ber\u00e4ttelser, i samh\u00e4llskunskap diskuteras sociala scenarier, och i bild ritas k\u00e4nsloansikten. Lgr22:s m\u00e5l f\u00f6r social kompetens och sj\u00e4lvk\u00e4nnedom st\u00f6ds genom denna dagliga praktik.',
    assessmentRubric: [
      { skill: 'K\u00e4nsloigenk\u00e4nning', emerging: 'identifierar 4 grundk\u00e4nslor i ansiktsbilder', proficient: 'namnger sj\u00e4lvst\u00e4ndigt 8\u201310 nyanserade k\u00e4nslor och kopplar dem till situationer', advanced: 'tolkar komplexa ansiktsuttryck och f\u00f6rklarar varf\u00f6r personen k\u00e4nner s\u00e5' },
      { skill: 'Perspektivtagande', emerging: 'identifierar huvudpersonens k\u00e4nsla i en scen med st\u00f6d', proficient: 'beskriver hur alla parter i ett scenario k\u00e4nner sig', advanced: 'f\u00f6ruts\u00e4ger k\u00e4nslom\u00e4ssiga konsekvenser och f\u00f6resl\u00e5r l\u00f6sningar som tar h\u00e4nsyn till alla' },
      { skill: 'K\u00e4nslouttryck genom skrift', emerging: 'skriver 1\u20132 k\u00e4nsloord med st\u00f6d', proficient: 'skriver meningar om k\u00e4nslor i sociala situationer', advanced: 'skriver reflekterande texter om k\u00e4nslor och strategier' },
    ],
  },

  'fairy-tales': {
    seoTitle: 'Gratis Sag\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara sag\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). L\u00e4sf\u00f6rst\u00e5else, ordpussel och ber\u00e4ttarstruktur med sagotema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'sag\u00f6vningar f\u00f6rskoleklass, sagor arbetsblad, l\u00e4sf\u00f6rst\u00e5else, ber\u00e4ttarstruktur, Lgr22, ordpussel sagor, sekvensering, karaktärsanalys, sagofigurer, skrivning f\u00f6rskoleklass',
    snippetAnswer: 'Sag\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder v\u00e4lk\u00e4nda sagor f\u00f6r l\u00e4sf\u00f6rst\u00e5else, ber\u00e4ttarstruktur och ordpussel. Barnen l\u00e4r sig b\u00f6rjan-mitten-slutet och karaktärsanalys. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Sagotemat i f\u00f6rskoleklass utnyttjar barnens k\u00e4rlek till ber\u00e4ttelser f\u00f6r att bygga verklig l\u00e4sf\u00f6rst\u00e5else. Fem- och sex\u00e5ringar kan nu analysera sagans struktur: b\u00f6rjan (det var en g\u00e5ng), mitten (problemet) och slutet (l\u00f6sningen). De j\u00e4mf\u00f6r karaktärer, ordnar h\u00e4ndelser kronologiskt och f\u00f6rutser vad som h\u00e4nder h\u00e4rn\u00e4st. Ordpussel med sagotexter st\u00e4rker ordigenk\u00e4nning. Skrivuppgifter d\u00e4r barnet skriver egna sagoavslutningar ger meningsfull motivation. Lgr22 betonar l\u00e4sf\u00f6rst\u00e5else, ber\u00e4ttande och fantasi, och sagotemat uppfyller alla tre genom v\u00e4lk\u00e4nda och \u00e4lskade sagor.',
    developmentalMilestones: [
      { milestone: 'Ber\u00e4ttarstruktur (b\u00f6rjan, mitten, slut)', howWeAddress: 'Sekvenserings\u00f6vningar d\u00e4r barn ordnar sagoscener kronologiskt bygger narrativ f\u00f6rst\u00e5else' },
      { milestone: 'Karaktärsanalys (f\u00f6rst\u00e5 karaktärers motiv och k\u00e4nslor)', howWeAddress: 'Arbetsblad d\u00e4r barn beskriver sagofigurers egenskaper och k\u00e4nslor utvecklar empatisk l\u00e4sf\u00f6rst\u00e5else' },
      { milestone: 'Prediktion (f\u00f6rutse vad som h\u00e4nder h\u00e4rn\u00e4st)', howWeAddress: 'Uppgifter d\u00e4r barn f\u00f6ruts\u00e4ger sagans forts\u00e4ttning tr\u00e4nar inferens och kritiskt t\u00e4nkande' },
      { milestone: 'Skriftligt ber\u00e4ttande (skriva egna sagor)', howWeAddress: 'Skrivmallar f\u00f6r egna sagoslut ger struktur och motivation f\u00f6r tidig skrivutveckling' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd v\u00e4lk\u00e4nda sagor med tydlig struktur (Guldlock, Bockarna Bruse), fokusera p\u00e5 bildsekvensering och h\u00e5ll skrivuppgifterna korta. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera mindre k\u00e4nda sagor, l\u00e4gg till karaktärsj\u00e4mf\u00f6relser och l\u00e5t barnen skriva egna fullst\u00e4ndiga sagor.',
    parentTakeaway: 'L\u00e4s sagor varje kv\u00e4ll och st\u00e4ll fr\u00e5gor: \u201dvad tror du h\u00e4nder sen?\u201d, \u201dhur k\u00e4nner sig trollet?\u201d, \u201dvad hade du gjort?\u201d. L\u00e5t barnet \u00e5terber\u00e4tta sagan med egna ord \u2014 det tr\u00e4nar sekvensering. Uppmuntra barnet att hitta p\u00e5 egna sagor och skriv ner dem tillsammans. Sagov\u00e4rlden \u00e4r ing\u00e5ngen till l\u00e4sf\u00f6rst\u00e5else, fantasi och spr\u00e5kligt sj\u00e4lvf\u00f6rtroende.',
    classroomIntegration: 'Sagotemat i f\u00f6rskoleklassen \u00e4r centralt i svenska-undervisningen: h\u00f6gl\u00e4sning med diskussion i samlingen, sago-arbetsblad f\u00f6r l\u00e4sf\u00f6rst\u00e5else under arbetspass, dramatisering av sagor p\u00e5 dramalektionen, och sagoskrivning i skrivh\u00f6rnan. Lgr22:s m\u00e5l f\u00f6r l\u00e4sutveckling, ber\u00e4ttande och fantasi st\u00f6ds genom denna m\u00e5ngfacetterade integration.',
    assessmentRubric: [
      { skill: 'Ber\u00e4ttarstruktur', emerging: 'identifierar sagans b\u00f6rjan och slut med st\u00f6d', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt 4\u20136 sagoscener i r\u00e4tt ordning', advanced: '\u00e5terber\u00e4ttar hela sagan med b\u00f6rjan, mitten och slut i egna ord' },
      { skill: 'Karaktärsf\u00f6rst\u00e5else', emerging: 'namnger sagans huvudkarakt\u00e4r och grundk\u00e4nsla', proficient: 'beskriver karakt\u00e4rers egenskaper och motiv', advanced: 'j\u00e4mf\u00f6r karakt\u00e4rer fr\u00e5n olika sagor och f\u00f6rklarar skillnader' },
      { skill: 'Sagoordförr\u00e5d (ordpussel)', emerging: 'hittar 2\u20133 sagoord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 sagoord', advanced: 'anv\u00e4nder sagospr\u00e5k i egna skrivna sagor' },
    ],
  },

  farm: {
    seoTitle: 'Gratis Bondg\u00e5rds\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara bondg\u00e5rds\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, gruppering och ordpussel med bondg\u00e5rdstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'bondg\u00e5rds\u00f6vningar f\u00f6rskoleklass, bondg\u00e5rd arbetsblad, r\u00e4kna bondg\u00e5rdsdjur, addition subtraktion, Lgr22, gruppering, ordpussel bondg\u00e5rd, lantbruk barn, multiplikation intro, producent konsument',
    snippetAnswer: 'Bondg\u00e5rds\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder bondg\u00e5rdsdjur och gr\u00f6dor f\u00f6r r\u00e4kning, gruppering och ordpussel. Barnen kopplar mat till dess ursprung. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Bondg\u00e5rdstemat i f\u00f6rskoleklass f\u00f6renar matematik med naturkunskap och samhällsf\u00f6rst\u00e5else. Fem- och sex\u00e5ringar r\u00e4knar djur i hagar (addition), f\u00f6rdelar foder lika (tidig division), och grupperar djur efter produkt (mj\u00f6lk, \u00e4gg, ull). Konceptet producent-konsument introduceras: kon ger mj\u00f6lk, h\u00f6nan l\u00e4gger \u00e4gg. Ordpussel med bondg\u00e5rdsordförr\u00e5d st\u00e4rker l\u00e4sf\u00e4rdigheten. Lgr22 betonar f\u00f6rst\u00e5else f\u00f6r samh\u00e4llet och naturvetenskap, och bondg\u00e5rdstemat visar barn varifrn maten kommer och hur m\u00e4nniskor och djur samverkar.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med bondg\u00e5rdsscenarier', howWeAddress: 'R\u00e4kneuppgifter d\u00e4r djur r\u00f6r sig mellan hagar och f\u00e4lt g\u00f6r matematik till lantbruksupplevelse' },
      { milestone: 'Gruppering och tidig multiplikation (lika grupper)', howWeAddress: '\u00d6vningar d\u00e4r barn f\u00f6rdelar djur i lika stora hagar introducerar multiplikativt t\u00e4nkande' },
      { milestone: 'Samband mellan producent och produkt (matens ursprung)', howWeAddress: 'Matchnings\u00f6vningar d\u00e4r barn kopplar djur till produkter (ko\u2192mj\u00f6lk, h\u00f6na\u2192\u00e4gg) bygger samh\u00e4llsf\u00f6rst\u00e5else' },
      { milestone: 'Ordkunskap och stavning (bondg\u00e5rdsordförr\u00e5d)', howWeAddress: 'Ords\u00f6kningar och korsord med bondg\u00e5rdstermer st\u00e4rker l\u00e4sf\u00e4rdighet och ordigenk\u00e4nning' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fem v\u00e4lk\u00e4nda djur, anv\u00e4nd plastdjur som komplement och h\u00e5ll r\u00e4kneomr\u00e5det inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till fler djur och gr\u00f6dor, introducera textuppgifter med bondg\u00e5rdsscenarier och l\u00e5t barnen skriva faktatexter om bondg\u00e5rdsdjur.',
    parentTakeaway: 'Bondg\u00e5rden \u00e4r ett perfekt l\u00e4randetema hemma. Bes\u00f6k en bondg\u00e5rd och r\u00e4kna djur, prata om var maten p\u00e5 tallriken kommer ifr\u00e5n, och l\u00e5t barnet sortera matvaror efter djur/v\u00e4xt. St\u00e4ll fr\u00e5gor: \u201dom b\u00f6ndan har fyra kor och k\u00f6per tre till, hur m\u00e5nga kor har han d\u00e5?\u201d. Arbetsbladen f\u00f6rl\u00e4nger l\u00e4randet fr\u00e5n bondg\u00e5rdsbes\u00f6ket.',
    classroomIntegration: 'Bondg\u00e5rdstemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: i matematiken r\u00e4knas och grupperas djur, i NO diskuteras djurs behov och matens ursprung, i svenskan \u00f6vas bondg\u00e5rdsord i pussel och faktatexter, och p\u00e5 utflykter bes\u00f6ks lokala bondg\u00e5rdar. Klassens odlingsprojekt (fr\u00f6 till planta) kompletterar temat med hands-on-vetenskap.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med bondg\u00e5rdsdjur', emerging: 'l\u00f6ser additionsuppgifter inom 5 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med bondg\u00e5rdsscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skriver egna matematikber\u00e4ttelser' },
      { skill: 'Gruppering (lika grupper)', emerging: 'f\u00f6rdelar djur i tv\u00e5 lika grupper med st\u00f6d', proficient: 'f\u00f6rdelar sj\u00e4lvst\u00e4ndigt i 3\u20134 lika grupper', advanced: 'l\u00f6ser grupperingsuppgifter och kopplar till multiplikation' },
      { skill: 'Ordpussel med bondg\u00e5rdsordförr\u00e5d', emerging: 'hittar 2\u20133 ord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 bondg\u00e5rdsord', advanced: 'l\u00f6ser korsord och skriver faktameningar med bondg\u00e5rdstermer' },
    ],
  },

  flowers: {
    seoTitle: 'Gratis Blom\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara blom\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, symmetri och ordpussel med blomtema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'blom\u00f6vningar f\u00f6rskoleklass, blommor arbetsblad, symmetri blommor, r\u00e4kning kronblad, Lgr22, v\u00e4xtcykel, ordpussel blommor, naturkunskap, m\u00f6nster kronblad, botanik barn',
    snippetAnswer: 'Blom\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder blommor f\u00f6r symmetri, r\u00e4kning och ordpussel. Barnen utforskar v\u00e4xtcykeln och kronbladsm\u00f6nster. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Blomtemat i f\u00f6rskoleklass kopplar matematik och naturvetenskap genom symmetri och v\u00e4xtcykeln. Fem- och sex\u00e5ringar r\u00e4knar kronblad, skapar symmetriska blommor, och f\u00f6ljer v\u00e4xtens utveckling fr\u00e5n fr\u00f6 till blomma i sekvens\u00f6vningar. M\u00f6nster i naturen (kronbladsantal, bl\u00f6mningsordning) introducerar matematiska begrepp. Ordpussel med blomnamn och botaniska termer st\u00e4rker l\u00e4sf\u00e4rdigheten. V\u00e5ren i Sverige med s\u00e5dd och blomning ger stark koppling till verkligheten. Lgr22 betonar naturvetenskapligt utforskande och v\u00e5rdnad om naturen, och blomtemat uppfyller b\u00e5da m\u00e5len.',
    developmentalMilestones: [
      { milestone: 'Symmetrif\u00f6rst\u00e5else (speglade m\u00f6nster i blomformer)', howWeAddress: 'Aktiviteter d\u00e4r barn ritar den andra halvan av en blomma utvecklar symmetrisk t\u00e4nkande' },
      { milestone: 'R\u00e4kning och m\u00f6nster (kronblad, bl\u00f6mningssekvenser)', howWeAddress: 'R\u00e4kne\u00f6vningar med kronblad och m\u00f6nsteraktiviteter med blomsekvenser bygger taluppfattning' },
      { milestone: 'V\u00e4xtcykelns f\u00f6rst\u00e5else (fr\u00f6 till blomma)', howWeAddress: 'Sekvenserings\u00f6vningar d\u00e4r barn ordnar v\u00e4xtstadier kronologiskt bygger naturvetenskaplig f\u00f6rst\u00e5else' },
      { milestone: 'Botaniskt ordförr\u00e5d och l\u00e4sf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar och korsord med blomnamn och v\u00e4xttermer st\u00e4rker l\u00e4s- och skrivf\u00e4rdighet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd f\u00e5 v\u00e4lk\u00e4nda blommor, fokusera p\u00e5 enkel symmetri (halv blomma) och h\u00e5ll v\u00e4xtcykeln till tre steg. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till fler arter med namn, komplexa symmetrim\u00f6nster och skrivuppgifter d\u00e4r barnen beskriver v\u00e4xtcykeln i egna ord.',
    parentTakeaway: 'Blommor \u00e4r det enklaste s\u00e4ttet att utforska naturvetenskap hemma. S\u00e5 fr\u00f6n tillsammans och dokumentera tillv\u00e4xten, r\u00e4kna kronblad p\u00e5 promenader, och leta efter symmetri i blommor. Prata om vad blommor beh\u00f6ver: sol, vatten, jord. L\u00e5t barnet rita och namnge blommor ni hittar. V\u00e5ren i Sverige \u00e4r full av blomsterl\u00e4rande.',
    classroomIntegration: 'Blomtemat i f\u00f6rskoleklassen kopplar till v\u00e5ren: i matematiken r\u00e4knas kronblad och \u00f6vas symmetri, i NO f\u00f6ljs klassens fr\u00f6s\u00e5dd fr\u00e5n fr\u00f6 till blomma, i svenskan \u00f6vas blomnamn i pussel och skrivuppgifter, och i bild m\u00e5las och trycks blommor. Lgr22:s m\u00e5l f\u00f6r naturvetenskap, matematik och estetik integreras genom klassens odlingsprojekt.',
    assessmentRubric: [
      { skill: 'Symmetri med blomformer', emerging: 'kopierar en enkel blomhalva med st\u00f6d', proficient: 'ritar sj\u00e4lvst\u00e4ndigt den andra halvan av en symmetrisk blomma', advanced: 'skapar egna symmetriska blom-m\u00f6nster och identifierar symmetrilinjer' },
      { skill: 'R\u00e4kning av kronblad och v\u00e4xtdelar', emerging: 'r\u00e4knar kronblad p\u00e5 enkla blommor med st\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt och j\u00e4mf\u00f6r antal kronblad p\u00e5 olika blommor', advanced: 'identifierar m\u00f6nster i kronbladsantal och kopplar till naturen' },
      { skill: 'V\u00e4xtcykelsekvensering', emerging: 'ordnar 3 stadier (fr\u00f6, planta, blomma) med st\u00f6d', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt 5 stadier och namnger dem', advanced: 'beskriver v\u00e4xtcykeln i skrift och f\u00f6rklarar varje stadium' },
    ],
  },

  food: {
    seoTitle: 'Gratis Mat\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara mat\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). Matgrupper, br\u00e5k och ordpussel med mattema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'mat\u00f6vningar f\u00f6rskoleklass, mat arbetsblad, matgrupper, br\u00e5k mat, Lgr22, n\u00e4ring barn, ordpussel mat, h\u00e4lsa, tallriksmodellen, matsortering',
    snippetAnswer: 'Mat\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder matgrupper, tallriksmodellen och receptscenarier f\u00f6r r\u00e4kning, br\u00e5kf\u00f6rst\u00e5else och ordpussel. Barnen l\u00e4r sig om n\u00e4ring och h\u00e4lsa. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Mattemat i f\u00f6rskoleklass g\u00e5r fr\u00e5n enkel sortering till n\u00e4ringsl\u00e4ra och matematisk f\u00f6rst\u00e5else. Fem- och sex\u00e5ringar l\u00e4r sig tallriksmodellen (en tredjedel kolhydrater, en tredjedel gr\u00f6nsaker, en tredjedel protein), delar mat i halva och fj\u00e4rdedel, och kategoriserar matvaror i n\u00e4ringsgrupper. R\u00e4kne\u00f6vningar med frukt och gr\u00f6nsaker g\u00f6r matematik kopplad till vardagen. Ordpussel med matordförr\u00e5d st\u00e4rker l\u00e4sf\u00e4rdigheten. Lgr22 betonar h\u00e4lsa, vardagsmatematik och naturvetenskap, och mattemat integrerar alla tre genom mat som varje barn k\u00e4nner till.',
    developmentalMilestones: [
      { milestone: 'N\u00e4ringsgruppf\u00f6rst\u00e5else (tallriksmodellen)', howWeAddress: 'Sorteringsuppgifter d\u00e4r barn placerar matvaror i r\u00e4tt n\u00e4ringsgrupp p\u00e5 tallriksmodellen' },
      { milestone: 'Br\u00e5kf\u00f6rst\u00e5else genom matdelning (halva, tredjedel, fj\u00e4rdedel)', howWeAddress: '\u00d6vningar d\u00e4r barn delar mat (pizza, sm\u00f6rg\u00e5s, frukt) i lika delar g\u00f6r br\u00e5k konkret' },
      { milestone: 'R\u00e4kning och j\u00e4mf\u00f6relse av m\u00e4ngder', howWeAddress: 'R\u00e4kneuppgifter med frukt och gr\u00f6nsaker d\u00e4r barn r\u00e4knar, j\u00e4mf\u00f6r och adderar' },
      { milestone: 'H\u00e4lsomedvetenhet och matordförr\u00e5d', howWeAddress: 'Ords\u00f6kningar och korsord med matord bygger b\u00e5de l\u00e4sf\u00e4rdighet och h\u00e4lsokunskap' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd konkret mat eller plastmat, begr\u00e4nsa till tv\u00e5 matgrupper och fokusera p\u00e5 delning i halva. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera tallriksmodellen med tre grupper, l\u00e4gg till br\u00e5kj\u00e4mf\u00f6relser och l\u00e5t barnen planera en meny med n\u00e4ringsbalans.',
    parentTakeaway: 'Varje m\u00e5ltid \u00e4r en l\u00e4randestund. Prata om tallriksmodellen vid middagen, l\u00e5t barnet hj\u00e4lpa till att dela mat (halva sm\u00f6rg\u00e5sen, fj\u00e4rdedel av \u00e4pplet), och r\u00e4kna matvaror n\u00e4r ni handlar. Fr\u00e5ga: \u201dvarf\u00f6r \u00e4r gr\u00f6nsaker bra f\u00f6r dig?\u201d. L\u00e5t barnet planera mellanm\u00e5l med en nyttig och en god sak. H\u00e4lsa och matematik g\u00e5r hand i hand vid matbordet.',
    classroomIntegration: 'Mattemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: i matematiken \u00f6vas r\u00e4kning och br\u00e5k med matscenarier, i NO diskuteras n\u00e4ring och h\u00e4lsa, i svenskan \u00f6vas matord i pussel och receptskrivning, och vid mellanm\u00e5l pr\u00e4ktiseras tallriksmodellen. Skolbespisningen ger dagliga kopplingar till temat.',
    assessmentRubric: [
      { skill: 'N\u00e4ringsgruppsortering (tallriksmodellen)', emerging: 'sorterar mat i tv\u00e5 grupper med st\u00f6d', proficient: 'placerar sj\u00e4lvst\u00e4ndigt matvaror i 3 n\u00e4ringsgrupper p\u00e5 tallriksmodellen', advanced: 'planerar en balanserad m\u00e5ltid och f\u00f6rklarar varf\u00f6r varje grupp beh\u00f6vs' },
      { skill: 'Br\u00e5kf\u00f6rst\u00e5else med mat', emerging: 'delar mat i halva med st\u00f6d', proficient: 'delar sj\u00e4lvst\u00e4ndigt i halva och fj\u00e4rdedel och namnger delarna', advanced: 'l\u00f6ser br\u00e5kuppgifter och j\u00e4mf\u00f6r delar (vilken \u00e4r st\u00f6rre, halva eller fj\u00e4rdedel?)' },
      { skill: 'Matordförr\u00e5d (ords\u00f6kning/korsord)', emerging: 'hittar 2\u20133 matord i pussel med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 matord', advanced: 'anv\u00e4nder matord korrekt i skrivna meningar och recept' },
    ],
  },

  forest: {
    seoTitle: 'Gratis Skogs\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara skogs\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, naturobservation och ordpussel med skogstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'skogs\u00f6vningar f\u00f6rskoleklass, skog arbetsblad, skogsdjur r\u00e4kning, naturvetenskap f\u00f6rskoleklass, Lgr22, utomhuspedagogik, ordpussel skog, tr\u00e4darter, ekosystem, \u00e5rstider skog',
    snippetAnswer: 'Skogs\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder skogsdjur, tr\u00e4d och naturfenomen f\u00f6r r\u00e4kning, observation och ordpussel. Utomhuspedagogiken f\u00f6rst\u00e4rker l\u00e4randet. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Skogstemat i f\u00f6rskoleklass \u00e4r centralt i svensk skolkultur d\u00e4r utomhuspedagogik och skogsutflykter \u00e4r en sj\u00e4lvklarhet. Fem- och sex\u00e5ringar anv\u00e4nder skogen f\u00f6r avancerad matematik och naturvetenskap: r\u00e4kna och j\u00e4mf\u00f6ra tr\u00e4d, m\u00e4ta med pinnar, observera \u00e5rstidsf\u00f6r\u00e4ndringar systematiskt, och klassificera skogsdjur vetenskapligt. Addition och subtraktion kopplas till verkliga scenarier (fem r\u00e5djur syntes, tv\u00e5 sprang \u2014 hur m\u00e5nga \u00e4r kvar?). Ordpussel med skogsordförr\u00e5d bygger naturvetenskaplig terminologi. Lgr22 betonar naturvetenskap, h\u00e5llbar utveckling och utomhusl\u00e4rande, och skogstemat \u00e4r den perfekta kontexten f\u00f6r f\u00f6rskoleklass.',
    developmentalMilestones: [
      { milestone: 'Systematisk naturobservation (dokumentera fynd fr\u00e5n skogsbes\u00f6k)', howWeAddress: 'Observationsprotokoll d\u00e4r barn ritar och skriver om naturfynd bygger vetenskapligt arbetss\u00e4tt' },
      { milestone: 'Addition och subtraktion i naturscenarier', howWeAddress: 'R\u00e4kneuppgifter med skogsdjur och tr\u00e4d i verklighetskopplade scener g\u00f6r matematik meningsfull' },
      { milestone: '\u00c5rstidsf\u00f6rst\u00e5else (\u00e5rstidernas p\u00e5verkan p\u00e5 skogen)', howWeAddress: 'J\u00e4mf\u00f6relsuppgifter d\u00e4r barn beskriver skogen i olika \u00e5rstider bygger tidsf\u00f6rst\u00e5else och ordförr\u00e5d' },
      { milestone: 'Vetenskaplig klassificering (tr\u00e4darter, djurgrupper)', howWeAddress: 'Sorteringsuppgifter med barr- och l\u00f6vtr\u00e4d, d\u00e4ggdjur och f\u00e5glar introducerar biologisk klassificering' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, fokusera p\u00e5 fyra eller fem v\u00e4lk\u00e4nda skogsdjur, anv\u00e4nd naturmaterial fr\u00e5n utedagar som komplement och h\u00e5ll r\u00e4kneomr\u00e5det inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till fler arter med detaljer, introducera enkel datainsamling (r\u00e4kna tr\u00e4darter p\u00e5 promenad) och l\u00e5t barnen skriva skogsdagbok.',
    parentTakeaway: 'Skogen \u00e4r Sveriges st\u00f6rsta klassrum \u2014 anv\u00e4nd den! G\u00e5 p\u00e5 skogsutflykter och r\u00e4kna tr\u00e4d, m\u00e4t med pinnar, identifiera djursp\u00e5r, och samla naturmaterial att sortera hemma. St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga granar ser du?\u201d, \u201dvarf\u00f6r tappar bj\u00f6rken l\u00f6ven?\u201d. L\u00e5t barnet f\u00f6ra en skogsdagbok d\u00e4r det ritar och skriver om varje utflykt. Arbetsbladen f\u00f6rl\u00e4nger utomhusupplevelserna.',
    classroomIntegration: 'Skogstemat i f\u00f6rskoleklassen \u00e4r centralt i svensk pedagogik: p\u00e5 utedagar observeras och r\u00e4knas naturfenomen, inne arbetas med skogsarbetsblad i matematik och svenska, i NO klassificeras tr\u00e4d och djur, och i bild skapas konst av naturmaterial. \u00c5rstids\u00f6verg\u00e5ngar ger naturliga tillf\u00e4llen att \u00e5tervnda till temat. Lgr22:s m\u00e5l f\u00f6r naturvetenskap och h\u00e5llbar utveckling st\u00f6ds direkt.',
    assessmentRubric: [
      { skill: 'Naturobservation och dokumentation', emerging: 'ritar ett naturfynd med vuxenst\u00f6d', proficient: 'ritar och skriver sj\u00e4lvst\u00e4ndigt om 3\u20134 naturfynd fr\u00e5n en utflykt', advanced: 'f\u00f6r systematisk skogsdagbok med datum, plats och detaljerade observationer' },
      { skill: 'Addition och subtraktion i skogsscenarier', emerging: 'l\u00f6ser additionsuppgifter inom 5 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med skogsscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna r\u00e4kneuppgifter fr\u00e5n skogsupplevelser' },
      { skill: 'Artigenk\u00e4nning (tr\u00e4d och djur)', emerging: 'namnger 3\u20134 skogsdjur och 2 tr\u00e4darter med st\u00f6d', proficient: 'identifierar sj\u00e4lvst\u00e4ndigt 6\u20138 arter och sorterar dem i grupper', advanced: 'klassificerar arter efter vetenskapliga kriterier och beskriver deras roll i ekosystemet' },
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

  // Check if already enriched (seoTitle in kindergarten block)
  const kindergartenIdx = content.indexOf("'kindergarten'");
  const firstGradeIdx = content.indexOf("'first-grade'");

  if (kindergartenIdx === -1 || firstGradeIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/sv.ts`);
    errorCount++;
    continue;
  }

  const kindergartenBlock = content.substring(kindergartenIdx, firstGradeIdx);
  if (kindergartenBlock.includes('seoTitle:')) {
    console.log(`SKIP (already enriched): ${theme}/sv.ts`);
    continue;
  }

  // STEP 1: Insert seoTitle/seoDescription/seoKeywords right after "'kindergarten': {"
  const kindergartenOpenPattern = "'kindergarten': {";
  const kindergartenOpenIdx = content.indexOf(kindergartenOpenPattern);
  if (kindergartenOpenIdx === -1) {
    console.error(`NO KINDERGARTEN OPEN FOUND: ${theme}/sv.ts`);
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
    console.error(`NO FAQ END FOUND: ${theme}/sv.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const enrichInsertPos = newKindergartenIdx + lastMatch.index + lastMatch[0].length;
  const enrichText = buildEnrichmentInsertionText(enrichments[theme]) + '\n';
  content = content.substring(0, enrichInsertPos) + enrichText + content.substring(enrichInsertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/sv.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
