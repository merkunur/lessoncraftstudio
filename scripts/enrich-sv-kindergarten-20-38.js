#!/usr/bin/env node
/**
 * SEO Part 290: SV Kindergarten Grade Enrichment — Themes 20-38
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the kindergarten grade block of 19 SV theme files (fruits through space).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  fruits: {
    seoTitle: 'Gratis Frukt\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara frukt\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). Addition, subtraktion, sortering och ordpussel med fruktbilder. 33 generatorer. Gratis PDF.',
    seoKeywords: 'frukt\u00f6vningar f\u00f6rskoleklass, frukt arbetsblad 5\u20136 \u00e5r, r\u00e4kna frukter, addition subtraktion, fruktsortering, n\u00e4ringsl\u00e4ra f\u00f6rskoleklass, Lgr22, ordpussel frukt, tallriksmodellen, vitaminrik mat',
    snippetAnswer: 'Frukt\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder \u00e4pplen, bananer och b\u00e4r f\u00f6r addition, subtraktion och datainsamling. Sortering efter f\u00e4rg, storlek och matgrupp st\u00f6djer Lgr22:s m\u00e5l f\u00f6r matematik och h\u00e4lsa. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I f\u00f6rskoleklass f\u00f6rvandlas frukttemat fr\u00e5n enkel r\u00e4kning till riktig matematik och h\u00e4lsokunskap. Fem- och sex\u00e5ringar l\u00f6ser additions- och subtraktionsuppgifter med fruktbilder (tolv \u00e4pplen p\u00e5 tr\u00e4det, fem plockas \u2014 hur m\u00e5nga kvar?), skapar stapeldiagram \u00f6ver klassens favoritfrukter och sorterar frukter efter f\u00e4rg, storlek och matgrupp samtidigt. Tallriksmodellen introduceras naturligt: frukt som en av tre n\u00e4ringsgrupper p\u00e5 tallriken. Korsord och ords\u00f6kningar med fruktnamn bygger l\u00e4sf\u00e4rdighet och n\u00e4ringsordf\u00f6rr\u00e5d som vitaminer och fibrer. Lgr22 betonar h\u00e4lsa, matematiskt t\u00e4nkande och naturvetenskap, och frukttemat integrerar alla tre omr\u00e5dena i en kontext varje barn k\u00e4nner fr\u00e5n k\u00f6ksbordet.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion inom tio med fruktbilder', howWeAddress: 'R\u00e4kneuppgifter d\u00e4r frukter plockas, \u00e4ts eller l\u00e4ggs till g\u00f6r operationerna konkreta och begripliga' },
      { milestone: 'Datainsamling och diagram (favoritfruktunders\u00f6kning)', howWeAddress: 'Stapeldiagram\u00f6vningar d\u00e4r barn samlar och representerar data om klassens frukter bygger statistisk grund' },
      { milestone: 'Klassificering efter flera egenskaper (f\u00e4rg, storlek, matgrupp)', howWeAddress: 'Sorteringsuppgifter d\u00e4r barn grupperar frukter efter tv\u00e5 kriterier samtidigt utvecklar logiskt t\u00e4nkande' },
      { milestone: 'H\u00e4lsomedvetenhet och n\u00e4ringsordf\u00f6rr\u00e5d', howWeAddress: 'Ords\u00f6kningar och korsord med n\u00e4ringstermer som vitaminer, fibrer och tallriksmodellen bygger h\u00e4lsokunskap' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd konkret plastfrukt eller riktiga frukter som komplement, begr\u00e4nsa r\u00e4kneomr\u00e5det till fem och fokusera p\u00e5 en aktivitet per tillf\u00e4lle (r\u00e4kning eller sortering). F\u00f6r avancerade f\u00f6rskoleklassbarn utvidga till talomr\u00e5det tjugo, l\u00e4gg till datainsamling med diagram och l\u00e5t barnen skriva korta texter om varf\u00f6r frukt \u00e4r h\u00e4lsosamt.',
    parentTakeaway: 'Frukt finns i varje hem \u2014 anv\u00e4nd det! L\u00e5t barnet r\u00e4kna \u00e4pplen i fruktsk\u00e5len, sortera frukter efter f\u00e4rg vid mellanm\u00e5l och \u00f6va subtraktion: \u201dvi hade \u00e5tta vindruvor, du \u00e5t tre, hur m\u00e5nga \u00e4r kvar?\u201d. Handla frukt tillsammans och l\u00e5t barnet v\u00e4lja en ny frukt varje vecka att rita och beskriva. Prata om tallriksmodellen vid middagen. Varje m\u00e5ltid blir en matematiklektion.',
    classroomIntegration: 'Frukttemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: i matematiken \u00f6vas addition, subtraktion och datainsamling med fruktbilder, i svenskan \u00f6vas fruktord i pussel och skrivuppgifter, i NO diskuteras n\u00e4ring och tallriksmodellen, och vid mellanm\u00e5l praktiseras h\u00e4lsosamma val. Veckans frukt presenteras i samlingen med f\u00e4rgl\u00e4ggning, r\u00e4kning och smakning.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med fruktbilder', emerging: 'l\u00f6ser additionsuppgifter inom 5 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med fruktscenarier', advanced: 'l\u00f6ser uppgifter inom 20 och skapar egna tals\u00e4tser med fruktmotiv' },
      { skill: 'Fruktsortering och klassificering', emerging: 'sorterar frukter efter en egenskap med st\u00f6d (f\u00e4rg)', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter tv\u00e5 egenskaper (f\u00e4rg + storlek) och f\u00f6rklarar', advanced: 'skapar egna sorteringskriterier och kopplar till tallriksmodellen' },
      { skill: 'Ordpussel med fruktordf\u00f6rr\u00e5d', emerging: 'hittar 2\u20133 fruktnamn i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ords\u00f6kningar med 5\u20136 fruktord', advanced: 'l\u00f6ser korsord med n\u00e4ringstermer och anv\u00e4nder orden i skrivna meningar' },
    ],
  },

  furniture: {
    seoTitle: 'Gratis M\u00f6bel\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara m\u00f6bel\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, rumslig orientering och ordpussel med m\u00f6beltema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'm\u00f6bel\u00f6vningar f\u00f6rskoleklass, m\u00f6bler arbetsblad 5\u20136 \u00e5r, rumsuppfattning, prepositioner, r\u00e4kning m\u00f6bler, Lgr22, ordpussel m\u00f6bler, hemmet \u00f6vning, geometri f\u00f6rskoleklass, inredning barn',
    snippetAnswer: 'M\u00f6bel\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder stolar, bord och hyllor f\u00f6r r\u00e4kning, rumslig orientering och ordpussel. Prepositioner som p\u00e5, under och bredvid \u00f6vas i konkreta sammanhang. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I f\u00f6rskoleklass f\u00f6rvandlas m\u00f6beltemat till en bro mellan matematik och rumslig f\u00f6rst\u00e5else. Fem- och sex\u00e5ringar r\u00e4knar m\u00f6bler i rum, l\u00f6ser additionsuppgifter (tre stolar vid bordet, tv\u00e5 till kommer) och \u00f6var prepositioner systematiskt: p\u00e5 bordet, under s\u00e4ngen, bredvid bokhyllan, framf\u00f6r soffan. Geometriska former uppt\u00e4cks i m\u00f6bler \u2014 bordsskivan \u00e4r en rektangel, pallen en cirkel. Rumsplanering d\u00e4r barnen ritar sin drömm\u00f6blering utvecklar rumsligt t\u00e4nkande. Ordpussel med m\u00f6belnamn bygger vardagsordf\u00f6rr\u00e5d och l\u00e4sf\u00e4rdighet. Lgr22 betonar geometri, rumsuppfattning och vardagsanknytning, och m\u00f6beltemat uppfyller alla tre m\u00e5len i en kontext barnen k\u00e4nner fr\u00e5n sitt eget hem.',
    developmentalMilestones: [
      { milestone: 'Prepositionsf\u00f6rst\u00e5else (p\u00e5, under, bredvid, framf\u00f6r, bakom)', howWeAddress: 'Positionerings\u00f6vningar d\u00e4r barn placerar f\u00f6rem\u00e5l i f\u00f6rh\u00e5llande till m\u00f6bler och beskriver l\u00e4get tr\u00e4nar alla prepositioner' },
      { milestone: 'Geometriska former i vardagen (identifiera former i m\u00f6bler)', howWeAddress: 'Form\u00f6vningar d\u00e4r barn matchar m\u00f6bler med geometriska former (bordsskiva = rektangel) bygger geometrisk medvetenhet' },
      { milestone: 'Addition och subtraktion med rumsscenarier', howWeAddress: 'R\u00e4kneuppgifter med m\u00f6bler i rum (fem stolar, tv\u00e5 tas bort) g\u00f6r matematik vardagsn\u00e4ra' },
      { milestone: 'Rumsplanering och rumsligt t\u00e4nkande', howWeAddress: 'Rituppgifter d\u00e4r barn planerar en rumsinredning utvecklar f\u00f6rm\u00e5gan att t\u00e4nka i tv\u00e5 dimensioner' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd konkreta m\u00f6belfigurer eller dockhusm\u00f6bler, begr\u00e4nsa till tre prepositioner (p\u00e5, under, bredvid) och fokusera p\u00e5 r\u00e4kning inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera fler prepositioner, l\u00e4gg till rumsplaneringsuppgifter med m\u00e5ttangivelser och l\u00e5t barnen skriva beskrivningar av sitt drömrum.',
    parentTakeaway: 'Hemmet \u00e4r fullt av matematik \u2014 anv\u00e4nd m\u00f6blerna! L\u00e5t barnet r\u00e4kna stolar runt bordet, \u00f6va prepositioner med gosedjur (\u201ds\u00e4tt nallen p\u00e5 stolen, under bordet\u201d) och identifiera geometriska former i m\u00f6bler. Rita barnets rum tillsammans och diskutera var saker st\u00e5r. St\u00e4ll fr\u00e5gor: \u201dom vi har fyra stolar och beh\u00f6ver sex, hur m\u00e5nga fler beh\u00f6ver vi?\u201d.',
    classroomIntegration: 'M\u00f6beltemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: i matematiken \u00f6vas r\u00e4kning, geometri och prepositioner med m\u00f6belscenarier, i svenskan \u00f6vas m\u00f6belnamn i pussel och skrivuppgifter, och i bild skapas rum och inredningsritningar. Klassrummet sj\u00e4lvt anv\u00e4nds som l\u00e4randemilj\u00f6 d\u00e4r barnen beskriver m\u00f6blernas placering.',
    assessmentRubric: [
      { skill: 'Prepositionsanv\u00e4ndning med m\u00f6bler', emerging: 'f\u00f6rst\u00e5r och anv\u00e4nder 2\u20133 prepositioner med st\u00f6d', proficient: 'anv\u00e4nder sj\u00e4lvst\u00e4ndigt 5\u20136 prepositioner korrekt i meningar', advanced: 'kombinerar flera prepositioner i komplexa beskrivningar och instruktioner' },
      { skill: 'Geometriska former i m\u00f6bler', emerging: 'identifierar cirkel och rektangel i m\u00f6bler med st\u00f6d', proficient: 'identifierar sj\u00e4lvst\u00e4ndigt 4\u20135 former i vardagsm\u00f6bler', advanced: 'j\u00e4mf\u00f6r former och beskriver egenskaper (sidor, h\u00f6rn) i m\u00f6belkontext' },
      { skill: 'R\u00e4kning och addition med m\u00f6belscenarier', emerging: 'r\u00e4knar m\u00f6bler i ett rum inom 5 med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt additions- och subtraktionsuppgifter inom 10', advanced: 'l\u00f6ser textuppgifter om m\u00f6bler inom 20 och ritar rumsplaner' },
    ],
  },

  garden: {
    seoTitle: 'Gratis Tr\u00e4dg\u00e5rds\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara tr\u00e4dg\u00e5rds\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, v\u00e4xtcykler och ordpussel med tr\u00e4dg\u00e5rdstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'tr\u00e4dg\u00e5rds\u00f6vningar f\u00f6rskoleklass, tr\u00e4dg\u00e5rd arbetsblad 5\u20136 \u00e5r, v\u00e4xtcykel, fr\u00f6 till blomma, r\u00e4kning tr\u00e4dg\u00e5rd, Lgr22 naturvetenskap, ordpussel v\u00e4xter, pollinering barn, h\u00e5llbar utveckling, odling f\u00f6rskola',
    snippetAnswer: 'Tr\u00e4dg\u00e5rds\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder fr\u00f6n, blommor och insekter f\u00f6r r\u00e4kning, v\u00e4xtcykler och ordpussel. Naturvetenskapligt t\u00e4nkande kopplas till matematik och l\u00e4sf\u00e4rdighet. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Tr\u00e4dg\u00e5rdstemat i f\u00f6rskoleklass f\u00f6renar matematik med naturvetenskap p\u00e5 ett s\u00e4tt som Lgr22 betonar. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med blommor och fr\u00f6n (sju tulpaner i rabatten, tre till planteras), sekvenserar v\u00e4xtcykeln fr\u00e5n fr\u00f6 till blomma i fyra steg, och m\u00e4ter v\u00e4xters tillv\u00e4xt med icke-standardm\u00e5tt. Klassificering av v\u00e4xter efter bl\u00f6mtid, f\u00e4rg och typ blir vetenskaplig. Ordpussel med tr\u00e4dg\u00e5rdsordf\u00f6rr\u00e5d som fr\u00f6, rot, stj\u00e4lk, blad och blomma bygger biologisk terminologi. Svenska f\u00f6rskoleklassbarn har ofta skoltr\u00e4dg\u00e5rd eller odlingsl\u00e5dor, vilket ger stark koppling mellan arbetsblad och verklighet.',
    developmentalMilestones: [
      { milestone: 'V\u00e4xtcykelns sekvens (fr\u00f6 \u2192 grodd \u2192 planta \u2192 blomma)', howWeAddress: 'Sekvenserings\u00f6vningar d\u00e4r barn ordnar v\u00e4xtstadier i r\u00e4tt f\u00f6ljd bygger vetenskapligt processt\u00e4nkande' },
      { milestone: 'Addition och subtraktion med tr\u00e4dg\u00e5rdsscenarier', howWeAddress: 'R\u00e4kneuppgifter med blommor, fr\u00f6n och insekter i tr\u00e4dg\u00e5rdskontext g\u00f6r matematik meningsfull' },
      { milestone: 'M\u00e4tning av tillv\u00e4xt (j\u00e4mf\u00f6ra plantor)', howWeAddress: 'M\u00e4t\u00f6vningar d\u00e4r barn j\u00e4mf\u00f6r v\u00e4xters h\u00f6jd och dokumenterar tillv\u00e4xt introducerar datainsamling' },
      { milestone: 'Naturvetenskaplig terminologi (rot, stj\u00e4lk, blad, blomma)', howWeAddress: 'Ords\u00f6kningar och korsord med v\u00e4xttermer bygger biologiskt ordf\u00f6rr\u00e5d och l\u00e4sf\u00e4rdighet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd riktiga fr\u00f6n och plantor som komplement, f\u00f6renkla v\u00e4xtcykeln till tre steg och h\u00e5ll r\u00e4kneomr\u00e5det inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till detaljerade v\u00e4xtdelar, introducera m\u00e4tning med linjal och l\u00e5t barnen f\u00f6ra en odlingsdagbok med ritningar och siffror.',
    parentTakeaway: 'Odla n\u00e5got tillsammans hemma \u2014 \u00e4ven en kruka med krassefrön r\u00e4cker. L\u00e5t barnet m\u00e4ta tillv\u00e4xten varje vecka, r\u00e4kna blad och rita v\u00e4xtens utveckling. St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga nya blad har det kommit sedan f\u00f6rra veckan?\u201d. Bes\u00f6k en tr\u00e4dg\u00e5rdsbutik och l\u00e5t barnet identifiera v\u00e4xtdelar. Arbetsbladen f\u00f6rst\u00e4rker det barnet upplever med h\u00e4nderna.',
    classroomIntegration: 'Tr\u00e4dg\u00e5rdstemat i f\u00f6rskoleklassen kopplar direkt till skoltr\u00e4dg\u00e5rden eller klassrumets odlingsl\u00e5dor: i NO observeras v\u00e4xtcykler och dokumenteras tillv\u00e4xt, i matematiken r\u00e4knas fr\u00f6n och m\u00e4ts plantor, i svenskan \u00f6vas v\u00e4xttermer i pussel och skrivuppgifter. Lgr22:s m\u00e5l f\u00f6r naturvetenskap och h\u00e5llbar utveckling st\u00f6ds direkt genom odlingsprojekt.',
    assessmentRubric: [
      { skill: 'V\u00e4xtcykelns sekvensering', emerging: 'ordnar tv\u00e5 stadier i r\u00e4tt f\u00f6ljd med st\u00f6d', proficient: 'sekvenserar sj\u00e4lvst\u00e4ndigt alla fyra stadier och namnger dem', advanced: 'beskriver vad v\u00e4xten beh\u00f6ver i varje stadium och kopplar till pollinering' },
      { skill: 'Addition och subtraktion i tr\u00e4dg\u00e5rdskontext', emerging: 'l\u00f6ser additionsuppgifter inom 5 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med tr\u00e4dg\u00e5rdsscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och dokumenterar med tals\u00e4tser' },
      { skill: 'V\u00e4xtterminologi (ordpussel)', emerging: 'k\u00e4nner igen 2\u20133 v\u00e4xttermer med bildst\u00f6d', proficient: 'l\u00e4ser och skriver sj\u00e4lvst\u00e4ndigt 5\u20136 v\u00e4xttermer', advanced: 'anv\u00e4nder v\u00e4xttermer korrekt i skrivna meningar om odlingsprojekt' },
    ],
  },

  halloween: {
    seoTitle: 'Gratis Halloween\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara halloween\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). Addition, subtraktion och ordpussel med sp\u00f6k- och pumpamotiv. 33 generatorer. Gratis PDF.',
    seoKeywords: 'halloween\u00f6vningar f\u00f6rskoleklass, halloween arbetsblad 5\u20136 \u00e5r, pumpa r\u00e4kning, sp\u00f6ken matematik, addition subtraktion, Lgr22, ordpussel halloween, monstermatematik, halloweenpyssel, h\u00f6staktiviteter',
    snippetAnswer: 'Halloween\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder pumpor, sp\u00f6ken och fladderm\u00f6ss f\u00f6r addition, subtraktion och ordpussel. Det sp\u00e4nnande temat driver stark motivation. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Halloween i f\u00f6rskoleklass \u00e4r \u00e5rets mest motiverande tema f\u00f6r matematik och l\u00e4sf\u00e4rdighet. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med pumpor och sp\u00f6ken (fyra fladderm\u00f6ss p\u00e5 taket, tre till flyger dit), subtraherar godis fr\u00e5n p\u00e5sar, och \u00f6var m\u00f6nsterig\u00e4nk\u00e4nning med alternerande halloweenfigurer. Ordpussel med halloweenordf\u00f6rr\u00e5d som pumpa, h\u00e4xa, sp\u00f6ke och skelett bygger l\u00e4sf\u00e4rdighet i en sp\u00e4nnande kontext. F\u00f6rdelning av godis lika introducerar delningst\u00e4nkande. Lgr22 betonar vardagsmatematik och motivation, och halloweens popul\u00e4rkultur ger b\u00e5da. Den starka emotionella kopplingen till h\u00f6gtiden g\u00f6r att barnen anstr\u00e4nger sig extra.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med halloweenf\u00f6rem\u00e5l', howWeAddress: 'R\u00e4kneuppgifter med pumpor, sp\u00f6ken och fladderm\u00f6ss g\u00f6r operationerna sp\u00e4nnande och motiverande' },
      { milestone: 'M\u00f6nsterig\u00e4nk\u00e4nning och sekvensering', howWeAddress: 'M\u00f6nster\u00f6vningar med alternerande halloweenfigurer (pumpa-sp\u00f6ke-pumpa) bygger algebraiskt t\u00e4nkande' },
      { milestone: 'R\u00e4ttvis f\u00f6rdelning (godisdelning)', howWeAddress: 'Delningsscenarier d\u00e4r barn f\u00f6rdelar halloweengodis lika mellan grupper introducerar divisionst\u00e4nkande' },
      { milestone: 'Halloweenordf\u00f6rr\u00e5d som l\u00e4s\u00f6vning', howWeAddress: 'Ords\u00f6kningar och korsord med halloweentermer bygger ordigenk\u00e4nning och stavningsmedvetenhet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, h\u00e5ll halloweenbilderna vr\u00e4ntliga (glada pumpor, s\u00f6ta sp\u00f6ken), begr\u00e4nsa r\u00e4kneomr\u00e5det till fem och fokusera p\u00e5 en f\u00e4rdighet per tillf\u00e4lle. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till textuppgifter med halloweenscenarier, introducera enkel multiplikation (tre barn f\u00e5r fyra godis var) och l\u00e5t barnen skriva egna halloweenber\u00e4ttelser.',
    parentTakeaway: 'Halloween hemma \u00e4r en matematikfest! L\u00e5t barnet r\u00e4kna godis, sortera det efter typ och f\u00e4rg, och f\u00f6rdela det lika mellan familjemedlemmarna. Urholka en pumpa och r\u00e4kna fr\u00f6n. G\u00f6r en sp\u00f6kvandring och r\u00e4kna dekorationer i kvarteret. Alla dessa aktiviteter f\u00f6rl\u00e4nger arbetsbladen till verkliga upplevelser som barnet minns l\u00e4nge.',
    classroomIntegration: 'Halloweentemat i f\u00f6rskoleklassen ger h\u00f6g motivation under oktober: i matematiken l\u00f6ses pumpataluppgifter och godisf\u00f6rdelning, i svenskan \u00f6vas halloweenord i pussel och skrivuppgifter, i bild skapas masker och dekorationer, och p\u00e5 samlingen ber\u00e4ttas sp\u00f6khistorier. Lgr22:s m\u00e5l f\u00f6r motivation och vardagsmatematik st\u00f6ds naturligt.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med halloweenmotiv', emerging: 'l\u00f6ser additionsuppgifter inom 5 med pumpabilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med halloweenscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna halloweenmatematikproblem' },
      { skill: 'M\u00f6nsterig\u00e4nk\u00e4nning med halloweenfigurer', emerging: 'forts\u00e4tter ett AB-m\u00f6nster med st\u00f6d', proficient: 'forts\u00e4tter sj\u00e4lvst\u00e4ndigt ABC-m\u00f6nster och identifierar m\u00f6nsterregeln', advanced: 'skapar egna komplexa m\u00f6nster och f\u00f6rklarar uppbyggnaden' },
      { skill: 'Halloweenordpussel', emerging: 'hittar 2\u20133 halloweenord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ords\u00f6kningar med 5\u20136 halloweenord', advanced: 'l\u00f6ser korsord och skriver halloweenord i meningar' },
    ],
  },

  holidays: {
    seoTitle: 'Gratis H\u00f6gtids\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara h\u00f6gtids\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, kalender och ordpussel med h\u00f6gtidstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'h\u00f6gtids\u00f6vningar f\u00f6rskoleklass, h\u00f6gtider arbetsblad 5\u20136 \u00e5r, jul matematik, p\u00e5sk r\u00e4kning, kalender\u00f6vning, Lgr22, ordpussel h\u00f6gtider, midsommar, lucia, traditioner barn',
    snippetAnswer: 'H\u00f6gtids\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder jul, p\u00e5sk, midsommar och lucia f\u00f6r r\u00e4kning, kalenderarbete och ordpussel. Svenska traditioner ger stark kulturell f\u00f6rankring. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'H\u00f6gtidstemat i f\u00f6rskoleklass f\u00f6renar matematik med kulturf\u00f6rst\u00e5else p\u00e5 ett s\u00e4tt som \u00e4r s\u00e4rskilt relevant i Sverige. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med julklappar och p\u00e5sk\u00e4gg, \u00f6var kalender och tidsf\u00f6ljd (n\u00e4r infaller varje h\u00f6gtid?), och sekvenserar traditioner i r\u00e4tt ordning. Ordpussel med h\u00f6gtidsordf\u00f6rr\u00e5d som advent, midsommarst\u00e5ng, luciat\u00e5g och p\u00e5skris bygger kulturellt ordf\u00f6rr\u00e5d och l\u00e4sf\u00e4rdighet. Delningsuppgifter med festf\u00f6rem\u00e5l (tolv julklappar till fyra barn) introducerar division. Lgr22 betonar kulturarv och tidsf\u00f6rst\u00e5else, och svenska h\u00f6gtider \u00e4r den perfekta kontexten f\u00f6r att integrera matematik, historia och spr\u00e5k.',
    developmentalMilestones: [
      { milestone: 'Kalender- och tidsf\u00f6rst\u00e5else (\u00e5rets h\u00f6gtider i ordning)', howWeAddress: 'Sekvenserings\u00f6vningar d\u00e4r barn placerar h\u00f6gtider p\u00e5 en \u00e5rskalender bygger tidsf\u00f6rst\u00e5else' },
      { milestone: 'Addition och subtraktion med h\u00f6gtidsf\u00f6rem\u00e5l', howWeAddress: 'R\u00e4kneuppgifter med julklappar, p\u00e5sk\u00e4gg och midsommarkransar g\u00f6r matematik festligt motiverande' },
      { milestone: 'Kulturellt ordf\u00f6rr\u00e5d och traditionskunskap', howWeAddress: 'Ords\u00f6kningar och matchnings\u00f6vningar med h\u00f6gtidstermer bygger kulturell medvetenhet och l\u00e4sf\u00e4rdighet' },
      { milestone: 'R\u00e4ttvis f\u00f6rdelning i festscenarier', howWeAddress: 'Delningsuppgifter d\u00e4r barn f\u00f6rdelar julklappar och p\u00e5skgodis lika introducerar delningst\u00e4nkande' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, fokusera p\u00e5 tv\u00e5 h\u00f6gtider \u00e5t g\u00e5ngen (jul och p\u00e5sk), h\u00e5ll r\u00e4kneomr\u00e5det inom fem och anv\u00e4nd konkreta f\u00f6rem\u00e5l som tillh\u00f6r h\u00f6gtiden. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till alla svenska h\u00f6gtider p\u00e5 en tidslinje, introducera j\u00e4mf\u00f6relse mellan kulturer och l\u00e5t barnen skriva om sin favorithtid.',
    parentTakeaway: 'Varje h\u00f6gtid \u00e4r en l\u00e4randestund! R\u00e4kna adventljus, f\u00f6rdela p\u00e5skgodis lika, och prata om n\u00e4r n\u00e4sta h\u00f6gtid infaller. Titta p\u00e5 kalendern och r\u00e4kna dagar till jul. L\u00e5t barnet skriva en \u00f6nskelista (skriv\u00f6vning!) och rita bilder fr\u00e5n luciafirandet. Fr\u00e5ga: \u201dhur m\u00e5nga dagar \u00e4r det till midsommar?\u201d. H\u00f6gtider engagerar barn maximalt och ger naturliga matematik- och spr\u00e5k\u00f6vningar.',
    classroomIntegration: 'H\u00f6gtidstemat i f\u00f6rskoleklassen anv\u00e4nds \u00e5ret runt: advent och lucia i december, p\u00e5sk p\u00e5 v\u00e5ren, midsommar innan sommarlovet. I matematiken r\u00e4knas h\u00f6gtidsf\u00f6rem\u00e5l och \u00f6vas kalenderarbete, i svenskan skrivs h\u00f6gtidskort och \u00f6vas ordf\u00f6rr\u00e5d, i bild skapas dekorationer. Lgr22:s m\u00e5l f\u00f6r kulturarv, tidsf\u00f6rst\u00e5else och spr\u00e5kutveckling st\u00f6ds naturligt.',
    assessmentRubric: [
      { skill: 'Kalender och h\u00f6gtidssekvens', emerging: 'namnger 2\u20133 h\u00f6gtider men os\u00e4ker p\u00e5 ordningen', proficient: 'placerar sj\u00e4lvst\u00e4ndigt 5\u20136 h\u00f6gtider i r\u00e4tt ordning p\u00e5 \u00e5rskalendern', advanced: 'kopplar h\u00f6gtider till \u00e5rstider och m\u00e5nader och ber\u00e4knar dagar mellan dem' },
      { skill: 'Addition med h\u00f6gtidsf\u00f6rem\u00e5l', emerging: 'l\u00f6ser additionsuppgifter inom 5 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med h\u00f6gtidsscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna h\u00f6gtidsmatematikproblem' },
      { skill: 'H\u00f6gtidsordf\u00f6rr\u00e5d', emerging: 'k\u00e4nner igen 3\u20134 h\u00f6gtidsord med bildst\u00f6d', proficient: 'l\u00e4ser och skriver sj\u00e4lvst\u00e4ndigt 6\u20138 h\u00f6gtidstermer', advanced: 'anv\u00e4nder h\u00f6gtidsord i skrivna meningar och beskriver traditioner' },
    ],
  },

  household: {
    seoTitle: 'Gratis Hemma\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara hemma\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, sortering och ordpussel med husf\u00f6rem\u00e5l. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'hemma\u00f6vningar f\u00f6rskoleklass, hush\u00e5ll arbetsblad 5\u20136 \u00e5r, r\u00e4kna husf\u00f6rem\u00e5l, sortering hem, Lgr22, ordpussel hemmet, k\u00f6ksmatematik, vardagsmatematik, s\u00e4kerhet hemma, rumsordf\u00f6rr\u00e5d',
    snippetAnswer: 'Hemma\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder k\u00f6ksf\u00f6rem\u00e5l, verktyg och hush\u00e5llsvaror f\u00f6r r\u00e4kning, sortering och ordpussel. Vardagsf\u00f6rankring g\u00f6r matematiken meningsfull. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Hush\u00e5llstemat i f\u00f6rskoleklass g\u00f6r vardagen till ett klassrum. Fem- och sex\u00e5ringar r\u00e4knar tallrikar f\u00f6r middagsdukning (vi \u00e4r fem, hur m\u00e5nga tallrikar beh\u00f6vs?), sorterar tv\u00e4tt efter f\u00e4rg och typ, och m\u00e4ter ingredienser i k\u00f6ket. Addition och subtraktion kopplas till verkliga scenarier: \u00e5tta glas i sk\u00e5pet, tre anv\u00e4nds \u2014 hur m\u00e5nga kvar? Ordpussel med hush\u00e5llsordf\u00f6rr\u00e5d bygger vardagssprlighet. Geometriska former finns \u00f6verallt i hemmet: tallriken \u00e4r en cirkel, bordet en rektangel. Lgr22 betonar att matematik ska upplevas som anv\u00e4ndbar i vardagen, och hush\u00e5llstemat uppfyller detta till fullo.',
    developmentalMilestones: [
      { milestone: 'Vardagsmatematik (dukning, matlagning, sortering)', howWeAddress: 'R\u00e4kneuppgifter med hush\u00e5llsscenarier som dukning och tv\u00e4ttsortering g\u00f6r matematik konkret och anv\u00e4ndbar' },
      { milestone: 'Sortering och kategorisering (hush\u00e5llsf\u00f6rem\u00e5l efter rum och typ)', howWeAddress: 'Sorterings\u00f6vningar d\u00e4r barn grupperar f\u00f6rem\u00e5l efter vilket rum de tillh\u00f6r utvecklar logisk klassificering' },
      { milestone: 'M\u00e4tning i k\u00f6kskontext (dl, matsked)', howWeAddress: 'M\u00e4t\u00f6vningar med k\u00f6ksm\u00e5tt introducerar volymmtning i en begrpllig kontext' },
      { milestone: 'Hush\u00e5llsordf\u00f6rr\u00e5d som l\u00e4s\u00f6vning', howWeAddress: 'Ords\u00f6kningar med vardagsord fr\u00e5n hemmet bygger l\u00e4sf\u00e4rdighet och funktionellt ordf\u00f6rr\u00e5d' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd riktiga hush\u00e5llsf\u00f6rem\u00e5l som komplement, begr\u00e4nsa till ett rum (k\u00f6ket) och h\u00e5ll r\u00e4kneomr\u00e5det inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till receptmatematik med m\u00e5ttenheter, introducera tidsbegrepp (hur l\u00e5ng tid i ugnen?) och l\u00e5t barnen planera en dukning f\u00f6r g\u00e4ster med ber\u00e4kningar.',
    parentTakeaway: 'Hemmet \u00e4r den b\u00e4sta matematiklektionen! L\u00e5t barnet duka och r\u00e4kna tallrikar, sortera tv\u00e4tt, m\u00e4ta ingredienser i k\u00f6ket. St\u00e4ll fr\u00e5gor: \u201dvi har sex koppar men beh\u00f6ver \u00e5tta, hur m\u00e5nga fler?\u201d. L\u00e5t barnet hj\u00e4lpa till med att organisera en l\u00e5da eller hylla \u2014 det \u00e4r sortering p\u00e5 riktigt. Varje hush\u00e5llssyssla \u00e4r en m\u00f6jlighet att \u00f6va matematik och ordförr\u00e5d.',
    classroomIntegration: 'Hush\u00e5llstemat i f\u00f6rskoleklassen anv\u00e4nds i rollspelsh\u00f6rnan med leksaksk\u00f6k och affärsstuga: i matematiken \u00f6vas r\u00e4kning och m\u00e4tning med k\u00f6ksf\u00f6rem\u00e5l, i svenskan \u00f6vas vardagsord i pussel och skrivuppgifter, och i NO diskuteras s\u00e4kerhet hemma och h\u00e4lsosamma vanor. Lgr22:s m\u00e5l f\u00f6r vardagsmatematik och sj\u00e4lvst\u00e4ndighet st\u00f6ds naturligt.',
    assessmentRubric: [
      { skill: 'Vardagsmatematik med hush\u00e5llsscenarier', emerging: 'r\u00e4knar f\u00f6rem\u00e5l inom 5 med konkret st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt vardagsmatematik inom 10 (dukning, handling)', advanced: 'l\u00f6ser flerstegsuppgifter inom 20 och ber\u00e4knar saknade f\u00f6rem\u00e5l' },
      { skill: 'Sortering av hush\u00e5llsf\u00f6rem\u00e5l', emerging: 'sorterar efter en egenskap (rum) med st\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter tv\u00e5 egenskaper (rum + funktion)', advanced: 'skapar egna kategorier och f\u00f6rklarar sorteringsprincipen muntligt' },
      { skill: 'Hush\u00e5llsordf\u00f6rr\u00e5d i ordpussel', emerging: 'hittar 2\u20133 hush\u00e5llsord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ords\u00f6kningar med 5\u20136 vardagsord', advanced: 'l\u00f6ser korsord och anv\u00e4nder orden i skrivna instruktioner' },
    ],
  },

  insects: {
    seoTitle: 'Gratis Insekts\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara insekts\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, klassificering och ordpussel med insektsbilder. 33 generatorer. Gratis PDF.',
    seoKeywords: 'insekts\u00f6vningar f\u00f6rskoleklass, insekter arbetsblad 5\u20136 \u00e5r, r\u00e4kna insekter, livscykel fj\u00e4ril, klassificering, Lgr22 naturvetenskap, ordpussel insekter, sm\u00e5kryp, pollinering, sex ben',
    snippetAnswer: 'Insekts\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder fj\u00e4rilar, nyckelpigor och myror f\u00f6r r\u00e4kning, livscykelsekvensering och ordpussel. Naturvetenskaplig klassificering kombineras med matematik. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Insektstemat i f\u00f6rskoleklass \u00f6ppnar d\u00f6rren till riktigt naturvetenskapligt t\u00e4nkande kombinerat med matematik. Fem- och sex\u00e5ringar r\u00e4knar insektsben (alla insekter har sex ben \u2014 hur m\u00e5nga ben p\u00e5 tre nyckelpigor?), sekvenserar fj\u00e4rilens livscykel (\u00e4gg \u2192 larv \u2192 puppa \u2192 fj\u00e4ril) och klassificerar sm\u00e5kryp vetenskapligt: insekt eller spindeldjur? Additionsuppgifter med insektsbilder g\u00f6r matematik levande. Ordpussel med insektstermer som antenn, vinge, larv och pollinering bygger naturvetenskapligt ordf\u00f6rr\u00e5d. Lgr22 betonar biologisk m\u00e5ngfald och naturvetenskapligt arbetss\u00e4tt, och insektstemat uppfyller b\u00e5da m\u00e5len. Svenska f\u00f6rskoleklassbarn observerar insekter p\u00e5 utedagar, vilket ger stark koppling till verkligheten.',
    developmentalMilestones: [
      { milestone: 'Livscykelsekvensering (fj\u00e4rilens metamorfos)', howWeAddress: 'Sekvenserings\u00f6vningar med fyra stadier (g, larv, puppa, fj\u00e4ril) bygger processt\u00e4nkande och naturvetenskap' },
      { milestone: 'Multiplikativt t\u00e4nkande (r\u00e4kna insektsben i grupper om sex)', howWeAddress: 'Gruppr\u00e4knings\u00f6vningar d\u00e4r barn r\u00e4knar ben p\u00e5 flera insekter introducerar tidig multiplikation' },
      { milestone: 'Vetenskaplig klassificering (insekt vs spindeldjur)', howWeAddress: 'Sorteringsuppgifter d\u00e4r barn anv\u00e4nder antal ben och kroppsdelar som kriterier bygger biologisk klassificering' },
      { milestone: 'Naturvetenskapligt ordf\u00f6rr\u00e5d (antenn, vinge, larv)', howWeAddress: 'Ords\u00f6kningar och korsord med insektstermer bygger vetenskaplig terminologi och l\u00e4sf\u00e4rdighet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, fokusera p\u00e5 tre v\u00e4lk\u00e4nda insekter (fj\u00e4ril, nyckelpiga, myra), anv\u00e4nd luppar och konkreta observationer och h\u00e5ll r\u00e4kneomr\u00e5det inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till fler arter med detaljer, introducera gruppr\u00e4kning (6, 12, 18 ben) och l\u00e5t barnen skriva insektsfaktab\u00f6cker.',
    parentTakeaway: 'Insekter finns \u00f6verallt \u2014 ta med ett f\u00f6rstoringsglas p\u00e5 promenaden! L\u00e5t barnet r\u00e4kna ben (sex = insekt, \u00e5tta = spindel), observera myror i arbete och f\u00f6lja en fj\u00e4rils r\u00f6relser. St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga ben har tre nyckelpigor sammanlagt?\u201d. L\u00e5t barnet rita och namnge insekter de hittar. Arbetsbladen f\u00f6rst\u00e4rker utomhusobservationerna.',
    classroomIntegration: 'Insektstemat i f\u00f6rskoleklassen kopplar till utomhuspedagogik: p\u00e5 utedagar observeras och r\u00e4knas insekter, inne arbetas med arbetsblad f\u00f6r matematik och naturvetenskap, i NO sekvenseras livscykler, och i bild skapas insektskonst. Lgr22:s m\u00e5l f\u00f6r biologisk m\u00e5ngfald och vetenskapligt arbetss\u00e4tt st\u00f6ds direkt.',
    assessmentRubric: [
      { skill: 'Livscykelsekvensering', emerging: 'ordnar tv\u00e5 stadier i r\u00e4tt f\u00f6ljd med st\u00f6d', proficient: 'sekvenserar sj\u00e4lvst\u00e4ndigt alla fyra stadier och namnger dem', advanced: 'f\u00f6rklarar vad som h\u00e4nder i varje stadium och kopplar till pollinering' },
      { skill: 'Insektsbensr\u00e4kning och addition', emerging: 'r\u00e4knar ben p\u00e5 en insekt med st\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt ben p\u00e5 2\u20133 insekter och adderar', advanced: 'anv\u00e4nder gruppr\u00e4kning (6, 12, 18) och l\u00f6ser relaterade textuppgifter' },
      { skill: 'Insektsklassificering', emerging: 'identifierar 2\u20133 insekter med bildst\u00f6d', proficient: 'klassificerar sj\u00e4lvst\u00e4ndigt 5\u20136 sm\u00e5kryp som insekt eller ej', advanced: 'anv\u00e4nder vetenskapliga kriterier (ben, antenner, kroppsdelar) och f\u00f6rklarar' },
    ],
  },

  jobs: {
    seoTitle: 'Gratis Yrkes\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara yrkes\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, matchning och ordpussel med yrkestema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'yrkes\u00f6vningar f\u00f6rskoleklass, yrken arbetsblad 5\u20136 \u00e5r, samh\u00e4llsyrken, brandman l\u00e4rare, matchning verktyg, Lgr22, ordpussel yrken, rollspel, samh\u00e4llskunskap, arbetsredskap',
    snippetAnswer: 'Yrkes\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder brandman, l\u00e4kare och l\u00e4rare f\u00f6r matchning, r\u00e4kning och ordpussel. Barnen l\u00e4r sig om samh\u00e4llsfunktioner kopplat till matematik. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Yrkestemat i f\u00f6rskoleklass bygger samh\u00e4llsf\u00f6rst\u00e5else kopplat till matematik och l\u00e4sf\u00e4rdighet. Fem- och sex\u00e5ringar matchar yrken med verktyg och arbetsplatser, l\u00f6ser r\u00e4kneuppgifter i yrkesscenarier (brandmannen r\u00e4ddar fem katter p\u00e5 m\u00e5ndag och tre p\u00e5 tisdag) och ordpussel med yrkesordförr\u00e5d. Logiskt t\u00e4nkande utvecklas n\u00e4r barnen resonerar om vilka verktyg som h\u00f6r till vilket yrke och varf\u00f6r. Skrivuppgifter d\u00e4r barnet beskriver sitt drömyrke ger meningsfull kontext f\u00f6r handskrift. Lgr22 betonar samh\u00e4llskunskap och elevernas framtidsdrömmar, och yrkestemat kopplar abstrakt matematik till begripliga samh\u00e4llsfunktioner.',
    developmentalMilestones: [
      { milestone: 'Logisk matchning (yrke \u2192 verktyg \u2192 arbetsplats)', howWeAddress: 'Matchnings\u00f6vningar med tre kolumner (yrke, verktyg, plats) bygger logiskt resonemang och kategorisering' },
      { milestone: 'Addition och subtraktion i yrkesscenarier', howWeAddress: 'R\u00e4kneuppgifter d\u00e4r yrkespersoner l\u00f6ser vardagsproblem (l\u00e4karen behandlar patienter) g\u00f6r matematik samh\u00e4llsrelevant' },
      { milestone: 'Samh\u00e4llsf\u00f6rst\u00e5else (vad g\u00f6r olika yrkesgrupper?)', howWeAddress: 'Informationsuppgifter d\u00e4r barn l\u00e4r sig vad yrken bidrar med bygger medborgerlig medvetenhet' },
      { milestone: 'Yrkesordförr\u00e5d och skrivf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar med yrkesord och skrivuppgifter om drömyrket bygger ordf\u00f6rr\u00e5d och skrivfärdighet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fem v\u00e4lk\u00e4nda yrken (brandman, l\u00e4kare, l\u00e4rare, polis, kock), anv\u00e4nd bildst\u00f6d och fokusera p\u00e5 enkel matchning. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till fler yrken med detaljer, introducera textuppgifter med yrkesscenarier och l\u00e5t barnen intervjua en vuxen om sitt yrke och skriva om det.',
    parentTakeaway: 'Prata om yrken i vardagen: vad g\u00f6r bussf\u00f6raren, kass\u00f6rskan, l\u00e4karen? R\u00e4kna m\u00e4nniskor i olika yrken ni m\u00f6ter p\u00e5 en dag. St\u00e4ll fr\u00e5gor: \u201dom l\u00e4karen tr\u00e4ffar fyra patienter p\u00e5 f\u00f6rmiddagen och tre p\u00e5 eftermiddagen, hur m\u00e5nga totalt?\u201d. L\u00e5t barnet leka yrken hemma med rollspel. Fr\u00e5ga om drömyrket och hj\u00e4lp barnet skriva om det.',
    classroomIntegration: 'Yrkestemat i f\u00f6rskoleklassen passar i samh\u00e4llsorientering: i matematiken l\u00f6ses yrkesmatematik, i svenskan \u00f6vas yrkesord i pussel och skrivs drömyrkesber\u00e4ttelser, i bild m\u00e5las yrkespersoner, och vid studiebes\u00f6k (brandstation, bibliotek) kopplas teori till verklighet. Lgr22:s m\u00e5l f\u00f6r samh\u00e4llskunskap och framtidstro st\u00f6ds.',
    assessmentRubric: [
      { skill: 'Yrke-verktyg-matchning', emerging: 'matchar 2\u20133 yrken med r\u00e4tt verktyg med st\u00f6d', proficient: 'matchar sj\u00e4lvst\u00e4ndigt 5\u20136 yrken med b\u00e5de verktyg och arbetsplats', advanced: 'f\u00f6rklarar samband mellan yrke, verktyg och samh\u00e4llsfunktion muntligt' },
      { skill: 'R\u00e4kning i yrkesscenarier', emerging: 'l\u00f6ser additionsuppgifter inom 5 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med yrkesscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna yrkesmatematikproblem' },
      { skill: 'Yrkesordf\u00f6rr\u00e5d (ordpussel och skrivning)', emerging: 'k\u00e4nner igen 3\u20134 yrkesnamn med bildst\u00f6d', proficient: 'l\u00e4ser och skriver sj\u00e4lvst\u00e4ndigt 6\u20138 yrkesord', advanced: 'skriver meningar om yrken och beskriver arbetsuppgifter' },
    ],
  },

  music: {
    seoTitle: 'Gratis Musik\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara musik\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, m\u00f6nster och ordpussel med musikinstrument. 33 generatorer. Gratis PDF.',
    seoKeywords: 'musik\u00f6vningar f\u00f6rskoleklass, musik arbetsblad 5\u20136 \u00e5r, r\u00e4kna instrument, rytmm\u00f6nster, Lgr22 musik, ordpussel instrument, noter barn, taktk\u00e4nsla, sortering instrument, s\u00e5ngtexter',
    snippetAnswer: 'Musik\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder instrument, noter och rytmer f\u00f6r r\u00e4kning, m\u00f6nsterig\u00e4nk\u00e4nning och ordpussel. Musik och matematik delar m\u00f6nster och struktur. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Musiktemat i f\u00f6rskoleklass utnyttjar den starka kopplingen mellan musik och matematik. Fem- och sex\u00e5ringar r\u00e4knar instrument i en orkester, klappar rytmm\u00f6nster (lång-kort-lång-kort) och \u00f6ver m\u00f6nsterig\u00e4nk\u00e4nning med notv\u00e4rden. Addition och subtraktion kopplas till musikscenarier: fem trummisar p\u00e5 scenen, tv\u00e5 g\u00e5r av. Klassificering av instrument efter typ (str\u00e4ng, bl\u00e5s, slagverk) introducerar vetenskaplig kategorisering. Ordpussel med musiktermer som melodi, rytm, takt och not bygger \u00e4mnesspecifikt ordf\u00f6rr\u00e5d. Lgr22 inkluderar musik som estetiskt uttryck, och arbetsbladen \u00f6verbrygar musik\u00e4mnet med matematik och svenska p\u00e5 ett naturligt s\u00e4tt.',
    developmentalMilestones: [
      { milestone: 'Rytm- och m\u00f6nsterig\u00e4nk\u00e4nning (klappa och forts\u00e4tta m\u00f6nster)', howWeAddress: 'M\u00f6nster\u00f6vningar med notv\u00e4rden och rytmsymboler bygger algebraiskt t\u00e4nkande genom musik' },
      { milestone: 'Klassificering av instrument (str\u00e4ng, bl\u00e5s, slagverk)', howWeAddress: 'Sorterings\u00f6vningar d\u00e4r barn kategoriserar instrument efter typ och ljud utvecklar logisk gruppering' },
      { milestone: 'Addition och subtraktion i musikscenarier', howWeAddress: 'R\u00e4kneuppgifter med musiker och instrument p\u00e5 scenen g\u00f6r matematik kreativ och engagerande' },
      { milestone: 'Musikordf\u00f6rr\u00e5d och notl\u00e4sning', howWeAddress: 'Ords\u00f6kningar med musiktermer och enkla notl\u00e4snings\u00f6vningar bygger musikalisk och spr\u00e5klig kompetens' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd riktiga instrument f\u00f6r konkret upplevelse, begr\u00e4nsa till tre instrumenttyper och fokusera p\u00e5 enkla AB-m\u00f6nster. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera notv\u00e4rden, l\u00e4gg till komplexa m\u00f6nster (ABC, AABB) och l\u00e5t barnen komponera egna rytmm\u00f6nster och spela dem.',
    parentTakeaway: 'Musik hemma \u00e4r matematik i f\u00f6rkl\u00e4dnad! Klappa rytmer tillsammans och l\u00e5t barnet forts\u00e4tta m\u00f6nstret. R\u00e4kna instrument i s\u00e5nger ni lyssnar p\u00e5. G\u00f6r hemmagjorda instrument (rispurk-maracas, gummibandsgitarr) och klassificera dem. St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga slag i takten?\u201d. S\u00e5ng och dans f\u00f6rst\u00e4rker m\u00f6nstert\u00e4nkande som \u00e4r grunden f\u00f6r matematik.',
    classroomIntegration: 'Musiktemat i f\u00f6rskoleklassen integreras naturligt med musiklektioner: klappa rytmer och \u00f6verf\u00f6r till m\u00f6nster\u00f6vningar p\u00e5 papper, sortera klassrumsinstrument och r\u00e4kna dem, \u00f6va musikord i pussel under svenskan. Lgr22:s m\u00e5l f\u00f6r estetiska uttryck och m\u00f6nsterig\u00e4nk\u00e4nning f\u00f6renas i musikarbetsbladen.',
    assessmentRubric: [
      { skill: 'Rytm- och m\u00f6nsterig\u00e4nk\u00e4nning', emerging: 'klappar ett AB-m\u00f6nster med st\u00f6d', proficient: 'forts\u00e4tter sj\u00e4lvst\u00e4ndigt ABC-m\u00f6nster och identifierar m\u00f6nsterregeln', advanced: 'skapar egna komplexa rytmm\u00f6nster och \u00f6versätter dem till symboler p\u00e5 papper' },
      { skill: 'Instrumentklassificering', emerging: 'k\u00e4nner igen 3\u20134 instrument med bildst\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt 6\u20138 instrument i kategorier (str\u00e4ng, bl\u00e5s, slagverk)', advanced: 'f\u00f6rklarar varf\u00f6r instrument tillh\u00f6r sin kategori och beskriver ljudet' },
      { skill: 'Musikordf\u00f6rr\u00e5d (ordpussel)', emerging: 'hittar 2\u20133 musikord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 musiktermer', advanced: 'anv\u00e4nder musiktermer korrekt i meningar och noterar rytmer med symboler' },
    ],
  },

  nature: {
    seoTitle: 'Gratis Natur\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara natur\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, observation och ordpussel med naturtema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'natur\u00f6vningar f\u00f6rskoleklass, natur arbetsblad 5\u20136 \u00e5r, naturobservation, ekosystem, r\u00e4kning natur, Lgr22, ordpussel natur, v\u00e4xter djur, h\u00e5llbar utveckling, utomhuspedagogik',
    snippetAnswer: 'Natur\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder v\u00e4xter, djur och naturfenomen f\u00f6r r\u00e4kning, observation och ordpussel. Utomhuspedagogik f\u00f6rst\u00e4rker l\u00e4randet. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Naturtemat i f\u00f6rskoleklass \u00e4r kärnan i svensk utomhuspedagogik. Fem- och sex\u00e5ringar anv\u00e4nder naturen f\u00f6r systematisk observation och dokumentation: r\u00e4kna v\u00e4xter och djur, m\u00e4ta med naturmaterial, och f\u00f6ra enkel naturdagbok. Addition och subtraktion kopplas till ekologiska scenarier (sju f\u00e5glar vid vattnet, fyra flyger \u2014 hur m\u00e5nga kvar?). Klassificering av naturfenomen (levande/icke-levande, v\u00e4xt/djur) bygger vetenskaplig grund. Ordpussel med naturtermer som ekosystem, f\u00f6tovsyntes och livsmilj\u00f6 introducerar naturvetenskapligt spr\u00e5k. Lgr22 betonar h\u00e5llbar utveckling och naturvetenskap, och naturtemat \u00e4r den mest centrala kontexten f\u00f6r svensk f\u00f6rskoleklass.',
    developmentalMilestones: [
      { milestone: 'Systematisk naturobservation och dokumentation', howWeAddress: 'Observationsprotokoll d\u00e4r barn ritar och skriver om naturfynd bygger vetenskapligt arbetss\u00e4tt' },
      { milestone: 'Klassificering av naturf\u00f6rem\u00e5l (levande/icke-levande, v\u00e4xt/djur)', howWeAddress: 'Sorteringsuppgifter med naturmaterial som stenar, l\u00f6v och insekter utvecklar vetenskaplig kategorisering' },
      { milestone: 'Addition och subtraktion i naturscenarier', howWeAddress: 'R\u00e4kneuppgifter med djur och v\u00e4xter i naturen g\u00f6r matematik verklighetskopplad' },
      { milestone: 'Naturvetenskapligt ordf\u00f6rr\u00e5d och spr\u00e5k', howWeAddress: 'Ords\u00f6kningar och korsord med naturtermer bygger vetenskaplig terminologi fr\u00e5n tidig \u00e5lder' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd konkreta naturf\u00f6rem\u00e5l (stenar, kottar, l\u00f6v) som komplement, begr\u00e4nsa klassificering till tv\u00e5 kategorier och fokusera p\u00e5 enkel r\u00e4kning. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till naturdagbok med m\u00e4tningar, introducera enkla n\u00e4ringskedjor och l\u00e5t barnen skriva informationstexter om naturfynd.',
    parentTakeaway: 'Naturen \u00e4r alltid tillg\u00e4nglig! G\u00e5 ut och r\u00e4kna fglar, samla l\u00f6v att sortera hemma, m\u00e4t en sten med fingerspann. St\u00e4ll fr\u00e5gor: \u201d\u00e4r den h\u00e4r levande eller inte?\u201d, \u201dhur m\u00e5nga olika l\u00f6v hittade vi?\u201d. L\u00e5t barnet f\u00f6ra en naturdagbok med ritningar och enkla ord. Varje promenad \u00e4r en lektion i matematik, naturvetenskap och spr\u00e5k.',
    classroomIntegration: 'Naturtemat i f\u00f6rskoleklassen \u00e4r centralt i svensk pedagogik: utedagar anv\u00e4nds f\u00f6r observation och r\u00e4kning, inne arbetas med naturarbetsblad i matematik och svenska, i NO klassificeras naturfenomen och utforskas livsmilj\u00f6er. Lgr22:s m\u00e5l f\u00f6r naturvetenskap, h\u00e5llbar utveckling och utomhuspedagogik st\u00f6ds direkt och genomg\u00e5ende.',
    assessmentRubric: [
      { skill: 'Naturobservation och dokumentation', emerging: 'ritar ett naturfynd med vuxenst\u00f6d', proficient: 'ritar och skriver sj\u00e4lvst\u00e4ndigt om 3\u20134 naturfynd fr\u00e5n en utflykt', advanced: 'f\u00f6r systematisk naturdagbok med datum, plats och detaljerade observationer' },
      { skill: 'Klassificering av naturf\u00f6rem\u00e5l', emerging: 'sorterar i tv\u00e5 kategorier (levande/icke-levande) med st\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter flera kriterier (djur/v\u00e4xt, milj\u00f6)', advanced: 'skapar egna kategorier och f\u00f6rklarar sorteringsprinciper muntligt' },
      { skill: 'Naturordf\u00f6rr\u00e5d (ordpussel)', emerging: 'k\u00e4nner igen 2\u20133 naturtermer med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 naturord', advanced: 'anv\u00e4nder naturtermer korrekt i skrivna observationstexter' },
    ],
  },

  numbers: {
    seoTitle: 'Gratis Sifferövningar Förskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara sifferövningar för förskoleklassbarn (5\u20136 år). Addition, subtraktion, tallinjen och ordpussel med siffertema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'sifferövningar förskoleklass, siffror arbetsblad 5\u20136 år, tallinje, addition subtraktion, räkna till tjugo, Lgr22 matematik, ordpussel siffror, taluppfattning, tiokamrater, talföljder',
    snippetAnswer: 'Sifferövningar för förskoleklass (5\u20136 år) tränar addition, subtraktion, tallinjen och tiokamrater. Systematisk taluppfattning inom 20 stödjer Lgr22:s matematikmål. Gratis utskrivbara PDF-arbetsblad på LessonCraftStudio.',
    uniqueGradeAngle: 'Siffertemat i förskoleklass är matematikens kärna \u2014 det år då taluppfattning inom tjugo ska bli automatisk. Fem- och sexåringar behärskar tallinjen, löser addition och subtraktion inom tio med flyt, och börjar utforska tiokamrater (3+7, 4+6). Sifferarbetsblad på denna nivå går bortom räkning till strukturerad matematik: talföljder, saknade tal, jämförelse med större-än och mindre-än, och positionssystemets grunder (ental och tiotal). Ordpussel med matematiktermer som addition, subtraktion, summa och differens bygger matematiskt språk. Lgr22 betonar taluppfattning som grunden för all senare matematik, och förskoleklassen är det kritiska året för att säkerställa att varje barn förstår talens innebörd, ordning och relationer.',
    developmentalMilestones: [
      { milestone: 'Automatisk taluppfattning inom 20 (räkna, jämföra, ordna)', howWeAddress: 'Tallinje- och jämförelseövningar säkerställer att barn kan placera, jämföra och ordna tal inom 20 med flyt' },
      { milestone: 'Addition och subtraktion inom 10 med flyt', howWeAddress: 'Systematiska övningar med talkamrater, saknade tal och dubblor bygger automatiserad räknefärdighet' },
      { milestone: 'Tiokamrater (talpar som bildar 10)', howWeAddress: 'Specifika övningar med tiokamrater (1+9, 2+8, 3+7, 4+6, 5+5) bygger fundamentet för huvudräkning' },
      { milestone: 'Matematiskt språk (addition, subtraktion, summa)', howWeAddress: 'Ordpussel och matchningsövningar med matematiktermer bygger ämnesterminologi från tidig ålder' },
    ],
    differentiationNotes: 'För förskoleklassbarn som behöver stöd, använd konkreta räknehjälpmedel (klossar, fingrar), begränsa talområdet till fem och fokusera på en operation åt gången. För avancerade förskoleklassbarn utvidga till talområdet tjugo, introducera tiokamrater systematiskt och låt barnen lösa saknade-tal-uppgifter och skriva egna talsätser.',
    parentTakeaway: 'Siffror finns överallt hemma! Räkna trappsteg, husnummer och ingredienser. Öva tiokamrater som ett spel: \u201djag säger tre, du säger talet som gör tio!\u201d. Använd tallinje på kylskåpet och peka på tal vid varje tillfälle. Ställ frågor: \u201dvad är fem plus tre?\u201d, \u201dvad är nio minus fyra?\u201d. Kort, daglig övning bygger automatisk taluppfattning som är grunden för all matematik.',
    classroomIntegration: 'Siffertemat genomsyrar hela förskoleklassens dag: morgonsamling med räkning och kalender, matematiklektion med addition och subtraktion, tallinjeövningar som uppvärmning. Lgr22:s grundläggande matematikmål för taluppfattning, talkamrater och operationer stöds systematiskt genom daglig sifferövning.',
    assessmentRubric: [
      { skill: 'Taluppfattning inom 20', emerging: 'räknar till 10 och känner igen siffror inom 20 med stöd', proficient: 'räknar, jämför och ordnar tal inom 20 självständigt', advanced: 'förstår positionssystemet (ental/tiotal) och arbetar med tal över 20' },
      { skill: 'Addition och subtraktion inom 10', emerging: 'löser enkla additionsuppgifter med konkret stöd', proficient: 'löser självständigt addition och subtraktion inom 10 med flyt', advanced: 'behärskar alla tiokamrater och löser saknade-tal-uppgifter automatiskt' },
      { skill: 'Matematiskt språk', emerging: 'förstår orden addition och subtraktion med stöd', proficient: 'använder korrekt termerna summa, differens och tallinje', advanced: 'förklarar lösningsstrategier med matematiska termer muntligt' },
    ],
  },

  ocean: {
    seoTitle: 'Gratis Havs\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara havs\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, klassificering och ordpussel med havsdjur. 33 generatorer. Gratis PDF.',
    seoKeywords: 'havs\u00f6vningar f\u00f6rskoleklass, havet arbetsblad 5\u20136 \u00e5r, havsdjur r\u00e4kning, korallrev, klassificering, Lgr22, ordpussel havet, marina djur, ekosystem havet, vattendjur',
    snippetAnswer: 'Havs\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder fiskar, v\u00e5gor och havsdjur f\u00f6r r\u00e4kning, klassificering och ordpussel. Havsekosystem introducerar naturvetenskapligt t\u00e4nkande. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Havstemat i f\u00f6rskoleklass \u00f6ppnar en fascinerande v\u00e4rld av matematik och naturvetenskap. Fem- och sex\u00e5ringar r\u00e4knar fiskar i stim (nio fiskar simmar, fyra simmar iv\u00e4g), klassificerar havsdjur vetenskapligt (fisk, bl\u00e4ckfisk, krabba, manet) och utforskar havets djupzoner. M\u00f6nsterig\u00e4nk\u00e4nning utvecklas med v\u00e5gm\u00f6nster och fiskm\u00f6nster. Ordpussel med havsordf\u00f6rr\u00e5d som korallrev, tidvatten, fen och g\u00e4lar bygger naturvetenskapligt spr\u00e5k. Storleksjf\u00f6relse (val kontra sj\u00f6h\u00e4st) ger matematisk j\u00e4mf\u00f6relse i en sp\u00e4nnande kontext. Lgr22 betonar naturvetenskap och milj\u00f6medvetenhet, och havsekosystem ger rika m\u00f6jligheter att diskutera biologisk m\u00e5ngfald och milj\u00f6v\u00e5rd.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med havsdjurscenarier', howWeAddress: 'R\u00e4kneuppgifter med fiskstim och havsdjurgrupper g\u00f6r matematik sp\u00e4nnande och visuellt tilltalande' },
      { milestone: 'Vetenskaplig klassificering av havsdjur', howWeAddress: 'Sorterings\u00f6vningar d\u00e4r barn grupperar havsdjur efter kroppstyp, r\u00f6relses\u00e4tt och livsmilj\u00f6 bygger biologi' },
      { milestone: 'Storleksj\u00e4mf\u00f6relse och ordning (st\u00f6rst till minst)', howWeAddress: 'J\u00e4mf\u00f6relse\u00f6vningar med havsdjur i olika storlekar tr\u00e4nar matematisk ordning och begreppsbildning' },
      { milestone: 'Havsordförr\u00e5d och naturvetenskapliga termer', howWeAddress: 'Ords\u00f6kningar och korsord med havstermer bygger vetenskapligt spr\u00e5k och l\u00e4sf\u00e4rdighet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fem v\u00e4lk\u00e4nda havsdjur (fisk, krabba, sj\u00f6stj\u00e4rna, val, delfin), anv\u00e4nd plastdjur som komplement och h\u00e5ll r\u00e4kneomr\u00e5det inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till fler arter med detaljer, introducera havets djupzoner och l\u00e5t barnen skriva informationstexter om sitt favorithavsdjur.',
    parentTakeaway: 'Havet fascinerar alla barn! Titta p\u00e5 havsdjursdokument\u00e4rer och r\u00e4kna djur p\u00e5 sk\u00e4rmen, bes\u00f6k ett akvarium och klassificera djuren ni ser. St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga fenor har en fisk?\u201d, \u201dvem \u00e4r st\u00f6rst, valen eller delfinen?\u201d. L\u00e5t barnet rita ett korallrev med r\u00e4tt antal djur. Arbetsbladen f\u00f6rl\u00e4nger havsfascinationen till matematik och l\u00e4sning.',
    classroomIntegration: 'Havstemat i f\u00f6rskoleklassen ger veckor av tv\u00e4r\u00e4mnesarbete: i matematiken r\u00e4knas havsdjur och \u00f6vas storleksj\u00e4mf\u00f6relse, i NO klassificeras marina arter och diskuteras milj\u00f6v\u00e5rd, i svenskan \u00f6vas havsord i pussel, och i bild skapas undervattenscener. Lgr22:s m\u00e5l f\u00f6r naturvetenskap och h\u00e5llbar utveckling st\u00f6ds genom havsekosystemet.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med havsdjur', emerging: 'l\u00f6ser additionsuppgifter inom 5 med fiskbilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med havsscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna havsmatematikproblem' },
      { skill: 'Klassificering av havsdjur', emerging: 'namnger 3\u20134 havsdjur med bildst\u00f6d', proficient: 'klassificerar sj\u00e4lvst\u00e4ndigt 6\u20138 havsdjur efter kroppstyp och milj\u00f6', advanced: 'f\u00f6rklarar klassificeringskriterierna och beskriver djurens anpassningar' },
      { skill: 'Havsordpussel', emerging: 'hittar 2\u20133 havsord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 havstermer', advanced: 'l\u00f6ser korsord och skriver informationsmeningar om havsdjur' },
    ],
  },

  pets: {
    seoTitle: 'Gratis Husdjurs\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara husdjurs\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, ansvar och ordpussel med husdjurstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'husdjurs\u00f6vningar f\u00f6rskoleklass, husdjur arbetsblad 5\u20136 \u00e5r, r\u00e4kna husdjur, djurv\u00e5rd, Lgr22, ordpussel husdjur, katt hund, ansvar barn, djurbehov, matchning',
    snippetAnswer: 'Husdjurs\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder katter, hundar och kaniner f\u00f6r r\u00e4kning, ansvars\u00f6vningar och ordpussel. Djurv\u00e5rd kopplas till matematik och empati. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Husdjurstemat i f\u00f6rskoleklass f\u00f6renar matematik med ansvar och empati. Fem- och sex\u00e5ringar l\u00f6ser additions- och subtraktionsuppgifter med husdjurscenarier (tre kattungar f\u00f6ddes, en adopteras \u2014 hur m\u00e5nga kvar?), skapar diagram \u00f6ver klassens husdjur, och matchar djur med deras behov (mat, motion, sk\u00f6tsel). Tids\u00f6vningar introduceras genom utfodringsscheman. Ordpussel med husdjursordf\u00f6rr\u00e5d bygger l\u00e4sf\u00e4rdighet i en personligt relevant kontext. Lgr22 betonar ansvar och empati parallellt med akademiska f\u00e4rdigheter, och husdjurstemat uppfyller b\u00e5da m\u00e5len. Barnens starka k\u00e4nslom\u00e4ssiga koppling till husdjur driver exceptionell motivation.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med husdjurscenarier', howWeAddress: 'R\u00e4kneuppgifter med katter, hundar och kaniner i vardagssituationer g\u00f6r matematik personlig och engagerande' },
      { milestone: 'Datainsamling (klassens husdjursunders\u00f6kning)', howWeAddress: 'Diagram\u00f6vningar d\u00e4r barn samlar och representerar data om vilka husdjur klassen har bygger statistisk grund' },
      { milestone: 'Ansvar och schema (utfodrings- och sk\u00f6tseltider)', howWeAddress: 'Tids\u00f6vningar med husdjurscheman introducerar klockan och rutiner i en motiverande kontext' },
      { milestone: 'Husdjursordf\u00f6rr\u00e5d och skrivf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar och skrivuppgifter om husdjur bygger l\u00e4sf\u00e4rdighet och ber\u00e4ttandekomp\u00e9tens' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, fokusera p\u00e5 tre v\u00e4lk\u00e4nda husdjur (katt, hund, kanin), anv\u00e4nd bilder och konkreta figurer och h\u00e5ll r\u00e4kneomr\u00e5det inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till fler husdjur med specifika behov, introducera tidsber\u00e4kningar (mata varannan timme) och l\u00e5t barnen skriva en husdjursdagbok.',
    parentTakeaway: 'Om ni har husdjur, anv\u00e4nd dem f\u00f6r l\u00e4rande! L\u00e5t barnet m\u00e4ta foder, r\u00e4kna promenader per vecka och f\u00f6ra ett sk\u00f6tselschema. Utan husdjur: bes\u00f6k en djurpark eller l\u00e5tsasadoptera ett gosedjur med skrtsschema. St\u00e4ll fr\u00e5gor: \u201dom katten \u00e4ter tre g\u00e5nger per dag, hur m\u00e5nga g\u00e5nger p\u00e5 en vecka?\u201d. Husdjursansvar l\u00e4r empati och matematik samtidigt.',
    classroomIntegration: 'Husdjurstemat i f\u00f6rskoleklassen passar i SO-undervisningen om ansvar: i matematiken r\u00e4knas och j\u00e4mf\u00f6rs husdjur, i svenskan skrivs husdjursber\u00e4ttelser och \u00f6vas ordf\u00f6rr\u00e5d, i NO diskuteras djurbehov och djurv\u00e5rd. Klassens diagram \u00f6ver husdjur ger autentisk datainsamling. Lgr22:s m\u00e5l f\u00f6r ansvar, empati och matematik st\u00f6ds naturligt.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med husdjur', emerging: 'l\u00f6ser additionsuppgifter inom 5 med djurbilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med husdjurscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna husdjursmatematikproblem' },
      { skill: 'Husdjursdatainsamling och diagram', emerging: 'bidrar till klassens unders\u00f6kning med st\u00f6d', proficient: 'l\u00e4ser och tolkar sj\u00e4lvst\u00e4ndigt ett husdjursdiagram', advanced: 'skapar egna diagram och drar slutsatser fr\u00e5n datan' },
      { skill: 'Husdjursordf\u00f6rr\u00e5d (ordpussel och skrivning)', emerging: 'k\u00e4nner igen 3\u20134 husdjursord med bildst\u00f6d', proficient: 'l\u00e4ser och skriver sj\u00e4lvst\u00e4ndigt 6\u20138 husdjurstermer', advanced: 'skriver meningar om husdjursv\u00e5rd och anv\u00e4nder ordf\u00f6rr\u00e5det korrekt' },
    ],
  },

  pirates: {
    seoTitle: 'Gratis Pirat\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara pirat\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). Skattr\u00e4kning, kartl\u00e4sning och ordpussel med pirattema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'pirat\u00f6vningar f\u00f6rskoleklass, pirater arbetsblad 5\u20136 \u00e5r, skattkarta, r\u00e4kna guldmynt, Lgr22, ordpussel pirater, kartl\u00e4sning, rumslig orientering, piratmatematik, \u00e4ventyr barn',
    snippetAnswer: 'Pirat\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder skattkartor, guldmynt och piratskepp f\u00f6r r\u00e4kning, kartl\u00e4sning och ordpussel. \u00c4ventyrskonceptet driver maximal motivation. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Pirattemat i f\u00f6rskoleklass f\u00f6rvandlar matematik till \u00e4ventyr. Fem- och sex\u00e5ringar r\u00e4knar guldmynt i skattkistor (en kista med \u00e5tta mynt, en med fem \u2014 hur m\u00e5nga totalt?), f\u00f6ljer skattkartor med riktningar (tre steg \u00f6ster, tv\u00e5 steg s\u00f6der) och l\u00f6ser kodknäckaruppgifter. Rumsligt t\u00e4nkande utvecklas genom kartl\u00e4sning och riktningsf\u00f6ljning. F\u00f6rdelning av skatt lika introducerar delning. Ordpussel med piratordf\u00f6rr\u00e5d som kompass, skattkarta, \u00f6 och sj\u00f6r\u00f6vare bygger l\u00e4sf\u00e4rdighet. Lgr22 betonar probleml\u00f6sning och rumsuppfattning, och pirattemat erbjuder b\u00e5da i en kontext som f\u00e5r varje barn att vilja l\u00f6sa n\u00e4sta uppgift.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med skattscenarier', howWeAddress: 'R\u00e4kneuppgifter med guldmynt, \u00e4delstenar och skattkistor g\u00f6r matematik sp\u00e4nnande och motiverande' },
      { milestone: 'Rumslig orientering och kartl\u00e4sning', howWeAddress: 'Skattkartor d\u00e4r barn f\u00f6ljer riktningar (h\u00f6ger, v\u00e4nster, framåt) bygger rumsligt t\u00e4nkande och begreppsbildning' },
      { milestone: 'R\u00e4ttvis f\u00f6rdelning av skatt', howWeAddress: 'Delningsscenarier d\u00e4r pirater f\u00f6rdelar guldmynt lika introducerar divisionst\u00e4nkande i \u00e4ventyrskontxt' },
      { milestone: 'Piratordförr\u00e5d och kodkn\u00e4ckare', howWeAddress: 'Ords\u00f6kningar och korsord med piratord bygger l\u00e4sf\u00e4rdighet och logiskt t\u00e4nkande' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd konkreta guldmynt och en enkel karta med tv\u00e5 riktningar, h\u00e5ll r\u00e4kneomr\u00e5det inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till koordinater p\u00e5 kartan, introducera kodkn\u00e4ckare med siffror och bokst\u00e4ver och l\u00e5t barnen rita egna skattkartor med matematiska ledtr\u00e5dar.',
    parentTakeaway: 'Skapa en skattjakt hemma! G\u00f6m \u201dguldmynt\u201d (chokladpengar eller stenar) och rita en enkel karta med riktningar. L\u00e5t barnet r\u00e4kna skatten och f\u00f6rdela lika. St\u00e4ll fr\u00e5gor: \u201dom vi hittar sex mynt och delar p\u00e5 tv\u00e5, hur m\u00e5nga f\u00e5r var?\u201d. Pirattemat g\u00f6r matematik till ett \u00e4ventyr som barnet vill \u00e5terv\u00e4nda till om och om igen.',
    classroomIntegration: 'Pirattemat i f\u00f6rskoleklassen ger h\u00f6g motivation veckovis: i matematiken l\u00f6ses skattrr\u00e4kning och f\u00f6rdelning, i svenskan \u00f6vas piratord i pussel och skrivs piratber\u00e4ttelser, i bild skapas skattkartor och piratskepp, och p\u00e5 utedag g\u00f6rs skattjakter. Lgr22:s m\u00e5l f\u00f6r probleml\u00f6sning, rumsuppfattning och motivation st\u00f6ds naturligt.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med skatt', emerging: 'r\u00e4knar guldmynt inom 5 med konkret st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med skattscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna piratmatematikproblem' },
      { skill: 'Kartl\u00e4sning och riktningar', emerging: 'f\u00f6ljer en enkel karta med tv\u00e5 steg och vuxenst\u00f6d', proficient: 'f\u00f6ljer sj\u00e4lvst\u00e4ndigt en karta med 4\u20135 riktningssteg', advanced: 'ritar egna skattkartor med riktningar och f\u00f6rklarar v\u00e4gen muntligt' },
      { skill: 'Piratordpussel', emerging: 'hittar 2\u20133 piratord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 piratord', advanced: 'l\u00f6ser kodkn\u00e4ckare och skriver meningar med piratordförr\u00e5d' },
    ],
  },

  robots: {
    seoTitle: 'Gratis Robot\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara robot\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, m\u00f6nster och ordpussel med robottema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'robot\u00f6vningar f\u00f6rskoleklass, robotar arbetsblad 5\u20136 \u00e5r, kodning f\u00f6rskoleklass, sekvensering, r\u00e4kning robotar, Lgr22 teknik, ordpussel robotar, programmering barn, algoritm, geometri robotar',
    snippetAnswer: 'Robot\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder robotar f\u00f6r r\u00e4kning, sekvensering och ordpussel. Tidig programmeringst\u00e4nkning kombineras med matematik och geometri. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Robottemat i f\u00f6rskoleklass introducerar datalogiskt t\u00e4nkande \u2014 en allt viktigare kompetens i Lgr22. Fem- och sex\u00e5ringar skriver sekvenser av kommandon f\u00f6r att styra en robot (fram, fram, h\u00f6ger, fram), l\u00f6ser additionsuppgifter med robotdelar (tre robotar med tv\u00e5 armar var) och identifierar geometriska former i robotkroppar (rektangelkropp, cirkelhuvud). Kodningssekvenser p\u00e5 papper bygger algoritmiskt t\u00e4nkande utan sk\u00e4rm. M\u00f6nsterig\u00e4nk\u00e4nning med robotsignaler (ljus-ljud-ljus-ljud) st\u00e4rker algebraisk grund. Ordpussel med tekniktermer som program, sensor och kommando bygger framtidsordf\u00f6rr\u00e5d. Lgr22 betonar teknik och digital kompetens, och robottemat g\u00f6r dessa abstrakta begrepp konkreta och gripbara.',
    developmentalMilestones: [
      { milestone: 'Sekvensering och algoritmiskt t\u00e4nkande (kommandon i ordning)', howWeAddress: 'Kodnings\u00f6vningar p\u00e5 papper d\u00e4r barn skriver steg-f\u00f6r-steg-instruktioner f\u00f6r en robot bygger algoritmiskt t\u00e4nkande' },
      { milestone: 'Geometriska former i robotkonstruktion', howWeAddress: 'Bygg-en-robot-\u00f6vningar d\u00e4r barn anv\u00e4nder geometriska former (rektangel, cirkel, triangel) utvecklar geometrisk medvetenhet' },
      { milestone: 'Addition och subtraktion med robotscenarier', howWeAddress: 'R\u00e4kneuppgifter med robotdelar och robotgrupper g\u00f6r matematik futuristisk och engagerande' },
      { milestone: 'Teknikordf\u00f6rr\u00e5d (program, sensor, kommando)', howWeAddress: 'Ords\u00f6kningar och matchnings\u00f6vningar med tekniktermer bygger digital vokabul\u00e4r' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd konkreta robotleksaker eller pilkort f\u00f6r sekvensering, begr\u00e4nsa till tv\u00e5 kommandon (fram, sväng) och bygg robotar med tre former. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till villkor (om hinder \u2192 sväng), introducera symmetri i robotdesign och l\u00e5t barnen programmera verkliga golbrobotar.',
    parentTakeaway: 'Programmering b\u00f6rjar utan sk\u00e4rm! Lek \u201drobotleken\u201d d\u00e4r barnet ger er kommandon (tv\u00e5 steg fram, sväng h\u00f6ger) och ni lyder exakt \u2014 det visar vad sekvensering och precision betyder. Bygg robotar av kartonger och identifiera former. St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga kommandon beh\u00f6vs f\u00f6r att n\u00e5 k\u00f6ket?\u201d. Lgr22:s nya teknikm\u00e5l b\u00f6rjar h\u00e4r.',
    classroomIntegration: 'Robottemat i f\u00f6rskoleklassen integreras med Lgr22:s teknikm\u00e5l: i matematiken \u00f6vas geometri, r\u00e4kning och sekvensering med robotmotiv, i teknik introduceras kodning p\u00e5 papper och med konkreta robotar, i svenskan \u00f6vas teknikord i pussel, och i bild byggs robotar av \u00e5tervunnet material. Kodningsveckan \u00e4r en naturlig h\u00f6jdpunkt.',
    assessmentRubric: [
      { skill: 'Sekvensering och kodning p\u00e5 papper', emerging: 'f\u00f6ljer en tv\u00e5stegssekvens med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en sekvens med 4\u20135 kommandon som leder roboten r\u00e4tt', advanced: 'fels\u00f6ker en felaktig sekvens och korrigerar den sj\u00e4lvst\u00e4ndigt' },
      { skill: 'Geometri i robotkonstruktion', emerging: 'identifierar 2\u20133 former i en robot med st\u00f6d', proficient: 'bygger sj\u00e4lvst\u00e4ndigt en robot av 4\u20135 geometriska former', advanced: 'skapar symmetriska robotar och beskriver formernas egenskaper' },
      { skill: 'Teknikordf\u00f6rr\u00e5d (ordpussel)', emerging: 'k\u00e4nner igen 2\u20133 teknikord med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 tekniktermer', advanced: 'anv\u00e4nder tekniktermer korrekt i instruktioner och f\u00f6rklaringar' },
    ],
  },

  school: {
    seoTitle: 'Gratis Skol\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara skol\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, sortering och ordpussel med skoltema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'skol\u00f6vningar f\u00f6rskoleklass, skola arbetsblad 5\u20136 \u00e5r, klassrumsmatematik, skolmaterial, Lgr22, ordpussel skola, schema, r\u00e4kning skolsaker, sortering material, skolstart',
    snippetAnswer: 'Skol\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder pennor, b\u00f6cker och klassrumsf\u00f6rem\u00e5l f\u00f6r r\u00e4kning, sortering och ordpussel. Skolvardagen blir en l\u00e4randekontext. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Skoltemat i f\u00f6rskoleklass \u00e4r maximalt relevant \u2014 barnen lever i denna v\u00e4rld varje dag. Fem- och sex\u00e5ringar r\u00e4knar pennor i pennskrinnet, l\u00f6ser additionsuppgifter med skolmaterial (sju b\u00f6cker p\u00e5 hyllan, tre l\u00e5nas ut), och sorterar klassrumsf\u00f6rem\u00e5l efter kategori och funktion. Schema\u00f6vningar introducerar tidsplanering: vad g\u00f6r vi f\u00f6rst, sedan, sist? Ordpussel med skoltermer som lektion, rast, l\u00e4xa och prov bygger skolordförr\u00e5d. Geometriska former uppt\u00e4cks i klassrummet (tavlan = rektangel, klockan = cirkel). Lgr22 betonar elevens f\u00f6rm\u00e5ga att organisera sitt l\u00e4rande, och skoltemat g\u00f6r denna metakognitiva f\u00e4rdighet konkret.',
    developmentalMilestones: [
      { milestone: 'R\u00e4kning och sortering av skolmaterial', howWeAddress: 'R\u00e4kneuppgifter med pennor, suddgummin och b\u00f6cker g\u00f6r matematik kopplad till barnets vardag i klassrummet' },
      { milestone: 'Tidsplanering och schema (f\u00f6rst, sedan, sist)', howWeAddress: 'Schema\u00f6vningar d\u00e4r barn ordnar dagens aktiviteter i sekvens bygger tids- och planeringsf\u00f6rst\u00e5else' },
      { milestone: 'Geometriska former i klassrummet', howWeAddress: 'Form\u00f6vningar d\u00e4r barn identifierar former i klassrumsmilj\u00f6n (tavla, klocka, d\u00f6rr) bygger geometrisk medvetenhet' },
      { milestone: 'Skolordf\u00f6rr\u00e5d och skrivf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar med skoltermer och skrivuppgifter om skoldagen bygger funktionellt spr\u00e5k' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd riktiga skolsaker fr\u00e5n klassrummet, begr\u00e4nsa till r\u00e4kning av en typ \u00e5t g\u00e5ngen och fokusera p\u00e5 tv\u00e5 delar av schemat. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till tids\u00f6vningar med klockan, introducera inventering (r\u00e4kna alla pennor i klassen) och l\u00e5t barnen skriva om sin favoritlektion.',
    parentTakeaway: 'Prata om skoldagen varje kv\u00e4ll! St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga lektioner hade du idag?\u201d, \u201dvad gjorde ni f\u00f6rst?\u201d. R\u00e4kna skolmaterial i ryggsäcken tillsammans. Titta p\u00e5 veckoschemat och \u00f6va ordning: \u201dvad \u00e4r efter matten?\u201d. L\u00e5t barnet packa sin v\u00e4ska sj\u00e4lv och checka av en lista. Dessa vardagsrutiner bygger planering och sj\u00e4lvst\u00e4ndighet.',
    classroomIntegration: 'Skoltemat i f\u00f6rskoleklassen anv\u00e4nds naturligt i klassrummet sj\u00e4lvt: r\u00e4kna material vid morgonsamlingen, \u00f6va schemat varje dag, identifiera former i rummet. I matematiken l\u00f6ses r\u00e4kneuppgifter med skolsaker, i svenskan \u00f6vas skolord i pussel. Lgr22:s m\u00e5l f\u00f6r elevers f\u00f6rm\u00e5ga att organisera sitt l\u00e4rande st\u00f6ds direkt.',
    assessmentRubric: [
      { skill: 'R\u00e4kning med skolmaterial', emerging: 'r\u00e4knar skolsaker inom 5 med konkret st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt additions- och subtraktionsuppgifter inom 10 med skolscenarier', advanced: 'inventerar material, l\u00f6ser textuppgifter inom 20 och dokumenterar med tals\u00e4tser' },
      { skill: 'Schema och tidsplanering', emerging: 'ordnar 2\u20133 aktiviteter med st\u00f6d', proficient: 'sj\u00e4lvst\u00e4ndigt ordnar 5\u20136 dagliga aktiviteter i r\u00e4tt sekvens', advanced: 'skapar ett veckoschema och kopplar tider till aktiviteter' },
      { skill: 'Skolordf\u00f6rr\u00e5d (ordpussel)', emerging: 'k\u00e4nner igen 3\u20134 skolord med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 skoltermer', advanced: 'skriver meningar om skoldagen med korrekt anv\u00e4ndning av skoltermer' },
    ],
  },

  seasons: {
    seoTitle: 'Gratis \u00c5rstids\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara \u00e5rstids\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, kalender och ordpussel med \u00e5rstidstema. 33 generatorer. Gratis PDF.',
    seoKeywords: '\u00e5rstids\u00f6vningar f\u00f6rskoleklass, \u00e5rstider arbetsblad 5\u20136 \u00e5r, v\u00e5r sommar h\u00f6st vinter, kalender\u00f6vning, Lgr22, ordpussel \u00e5rstider, natur\u00f6vning, v\u00e4der barn, tidsf\u00f6rst\u00e5else, s\u00e4songdjur',
    snippetAnswer: '\u00c5rstids\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder v\u00e5r, sommar, h\u00f6st och vinter f\u00f6r r\u00e4kning, kalenderarbete och ordpussel. Tidsf\u00f6rst\u00e5else kopplas till naturvetenskap. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: '\u00c5rstidstemat i f\u00f6rskoleklass bygger tidsf\u00f6rst\u00e5else kopplat till matematik och naturvetenskap. Fem- och sex\u00e5ringar sekvenserar de fyra \u00e5rstiderna, l\u00f6ser additionsuppgifter med \u00e5rstidsrelaterade f\u00f6rem\u00e5l (sex snowklumpar, tre sm\u00e4lter) och f\u00f6r v\u00e4derobservationer med diagram. Kalenderarbete f\u00f6rst\u00e4rks genom m\u00e5nader kopplad till \u00e5rstider. Naturvetenskaplig observation \u2014 hur f\u00f6r\u00e4ndras tr\u00e4det, djurens beteende, dagsl\u00e4ngden? \u2014 bygger vetenskapligt t\u00e4nkande. Ordpussel med \u00e5rstidsordförr\u00e5d som is, grodd, sk\u00f6rd och bl\u00e5st bygger naturvetenskapligt spr\u00e5k. I Sverige \u00e4r \u00e5rstiderna extremt tydliga, vilket ger rika kopplingar till barns verklighet.',
    developmentalMilestones: [
      { milestone: '\u00c5rstidssekvensering (v\u00e5r \u2192 sommar \u2192 h\u00f6st \u2192 vinter som cykel)', howWeAddress: 'Sekvenserings\u00f6vningar med cyklisk modell bygger f\u00f6rst\u00e5else f\u00f6r \u00e5rstidernas \u00e5terkommande m\u00f6nster' },
      { milestone: 'V\u00e4derobservation och datainsamling', howWeAddress: 'V\u00e4derdiagram d\u00e4r barn dokumenterar dagligt v\u00e4der och sammanst\u00e4ller m\u00e5nadsdata bygger statistisk grund' },
      { milestone: 'Addition och subtraktion i \u00e5rstidsscenarier', howWeAddress: 'R\u00e4kneuppgifter med sn\u00f6flingor, blommor och l\u00f6v g\u00f6r matematik s\u00e4songsrelevant och engagerande' },
      { milestone: 'Naturf\u00f6r\u00e4ndringar genom \u00e5ret (tr\u00e4d, djur, dagsl\u00e4ngd)', howWeAddress: 'Observationsuppgifter d\u00e4r barn j\u00e4mf\u00f6r naturen i olika \u00e5rstider bygger vetenskapligt t\u00e4nkande' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, fokusera p\u00e5 tv\u00e5 kontrasterande \u00e5rstider (sommar och vinter), anv\u00e4nd tydliga bilder och h\u00e5ll r\u00e4kneomr\u00e5det inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till m\u00e5nader kopplad till \u00e5rstider, introducera v\u00e4derdataanalys och l\u00e5t barnen skriva \u00e5rstidsdagbok med observationer.',
    parentTakeaway: '\u00c5rstiderna \u00e4r synliga varje dag! Prata om vad som f\u00f6r\u00e4ndras: \u201dvarfr tappar tr\u00e4det l\u00f6ven?\u201d, \u201dvarf\u00f6r \u00e4r det m\u00f6rkt s\u00e5 tidigt?\u201d. R\u00e4kna s\u00e5nger p\u00e5 tr\u00e4det, sn\u00f6bollar i h\u00f6gen, blommor i rabatten. F\u00f6r v\u00e4derkalender hemma och j\u00e4mf\u00f6r veckor. L\u00e5t barnet rita samma plats i alla fyra \u00e5rstider. Arbetsbladen f\u00f6rst\u00e4rker dessa dagliga observationer.',
    classroomIntegration: '\u00c5rstidstemat i f\u00f6rskoleklassen \u00e5terkomm\u00e5r naturligt hela \u00e5ret: v\u00e4derobservationer dagligen, \u00e5rstidsf\u00f6r\u00e4ndringar diskuteras i samlingen, i matematiken r\u00e4knas \u00e5rstidsf\u00f6rem\u00e5l, i NO utforskas naturcykler, i bild m\u00e5las \u00e5rstidsbilder. Lgr22:s m\u00e5l f\u00f6r tidsf\u00f6rst\u00e5else, naturvetenskap och observation st\u00f6ds genom denna \u00e5terkommande tematik.',
    assessmentRubric: [
      { skill: '\u00c5rstidssekvensering', emerging: 'namnger 2\u20133 \u00e5rstider men os\u00e4ker p\u00e5 ordningen', proficient: 'sekvenserar sj\u00e4lvst\u00e4ndigt alla fyra \u00e5rstider och kopplar till m\u00e5nader', advanced: 'f\u00f6rklarar \u00e5rstidernas cykel och beskriver naturf\u00f6r\u00e4ndringar i varje' },
      { skill: 'V\u00e4derobservation och data', emerging: 'registrerar dagligt v\u00e4der med vuxenst\u00f6d', proficient: 'f\u00f6r sj\u00e4lvst\u00e4ndigt v\u00e4derkalender och l\u00e4ser av data', advanced: 'j\u00e4mf\u00f6r v\u00e4derdata \u00f6ver veckor och drar slutsatser om \u00e5rstidstrender' },
      { skill: '\u00c5rstidsordpussel', emerging: 'hittar 2\u20133 \u00e5rstidsord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 \u00e5rstidstermer', advanced: 'skriver informationsmeningar om \u00e5rstider med korrekt terminologi' },
    ],
  },

  shapes: {
    seoTitle: 'Gratis Form\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara form\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). Geometri, m\u00f6nster och ordpussel med formtema. 33 generatorer. Gratis PDF. Skriv ut direkt.',
    seoKeywords: 'form\u00f6vningar f\u00f6rskoleklass, former arbetsblad 5\u20136 \u00e5r, geometri f\u00f6rskoleklass, cirkel triangel rektangel, symmetri, Lgr22, ordpussel former, h\u00f6rn sidor, m\u00f6nsterig\u00e4nk\u00e4nning, rumsuppfattning',
    snippetAnswer: 'Form\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) tr\u00e4nar geometrisk igenk\u00e4nning, formers egenskaper och m\u00f6nster. Barn l\u00e4r sig h\u00f6rn, sidor och symmetri. 33 generatorer. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Formtemat i f\u00f6rskoleklass g\u00e5r bortom igenk\u00e4nning till formernas egenskaper och relationer. Fem- och sex\u00e5ringar r\u00e4knar h\u00f6rn och sidor, j\u00e4mf\u00f6r former (triangel har tre sidor, rektangel har fyra), och identifierar former i vardagsf\u00f6rem\u00e5l. Symmetri introduceras genom att vika former och spegla m\u00f6nster. M\u00f6nsterig\u00e4nk\u00e4nning med alternerande former bygger algebraiskt t\u00e4nkande. Sammansatta former skapas genom att kombinera grundformer (tv\u00e5 trianglar bildar en rektangel). Ordpussel med geometritermer som diagonal, symmetri, h\u00f6rn och sida bygger matematiskt spr\u00e5k. Lgr22 betonar geometri och rumsuppfattning som grundl\u00e4ggande matematikomr\u00e5den, och formtemat \u00e4r den mest direkt geomtriska kontexten.',
    developmentalMilestones: [
      { milestone: 'Formers egenskaper (r\u00e4kna h\u00f6rn och sidor)', howWeAddress: 'Egenskaps\u00f6vningar d\u00e4r barn r\u00e4knar och j\u00e4mf\u00f6r h\u00f6rn och sidor bygger formell geometrisk f\u00f6rst\u00e5else' },
      { milestone: 'Symmetri (sp\u00e4gelbildsigenk\u00e4nning och skapande)', howWeAddress: 'Symmetri\u00f6vningar d\u00e4r barn kompletterar halva former och identifierar symmetrilinjer utvecklar rumsligt t\u00e4nkande' },
      { milestone: 'M\u00f6nster med geometriska former', howWeAddress: 'M\u00f6nster\u00f6vningar med alternerande former (cirkel-triangel-cirkel) bygger algebraiskt t\u00e4nkande' },
      { milestone: 'Sammansatta former (kombinera grundformer)', howWeAddress: 'Bygg\u00f6vningar d\u00e4r barn skapar bilder av geometriska former (hus = fyrkant + triangel) utvecklar kreativ geometri' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fyra grundformer (cirkel, triangel, kvadrat, rektangel), anv\u00e4nd konkreta formklossar och fokusera p\u00e5 igenk\u00e4nning f\u00f6re egenskaper. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera hexagon och pentagon, \u00f6va symmetri med spegel och l\u00e5t barnen skapa komplexa formbilder med egenskapslistor.',
    parentTakeaway: 'Former finns \u00f6verallt hemma! Lek \u201dhitta formen\u201d: \u201dpeka p\u00e5 n\u00e5got som \u00e4r en cirkel!\u201d. R\u00e4kna h\u00f6rn p\u00e5 f\u00f6nstret, bordet och tallriken. G\u00f6r symmetri med pappersvikning. Bygg bilder av klippta former (hus, b\u00e5t, robot). St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga sidor har en triangel?\u201d, \u201dvad \u00e4r skillnaden mellan en kvadrat och en rektangel?\u201d. Formf\u00f6rst\u00e5else \u00e4r grunden f\u00f6r all geometri.',
    classroomIntegration: 'Formtemat i f\u00f6rskoleklassen genomsyrar matematiklektionerna: formjakter i klassrummet, m\u00f6nster\u00f6vningar med formstämplar, symmetri med speglar, och sammansatta bilder av former. I bild skapas konst med geometriska former. Lgr22:s m\u00e5l f\u00f6r geometri, rumsuppfattning och m\u00f6nsterig\u00e4nk\u00e4nning st\u00f6ds systematiskt.',
    assessmentRubric: [
      { skill: 'Formigenk\u00e4nning och egenskaper', emerging: 'k\u00e4nner igen och namnger 3\u20134 former med st\u00f6d', proficient: 'k\u00e4nner igen alla grundformer och r\u00e4knar sj\u00e4lvst\u00e4ndigt h\u00f6rn och sidor', advanced: 'j\u00e4mf\u00f6r former efter egenskaper och identifierar former i komplexa bilder' },
      { skill: 'Symmetri', emerging: 'identifierar enkla symmetriska bilder med st\u00f6d', proficient: 'kompletterar sj\u00e4lvst\u00e4ndigt halva symmetriska former korrekt', advanced: 'skapar egna symmetriska m\u00f6nster och identifierar flera symmetrilinjer' },
      { skill: 'M\u00f6nster med former', emerging: 'forts\u00e4tter ett AB-m\u00f6nster med st\u00f6d', proficient: 'forts\u00e4tter sj\u00e4lvst\u00e4ndigt ABC-m\u00f6nster och identifierar regeln', advanced: 'skapar egna komplexa formm\u00f6nster och f\u00f6rklarar uppbyggnaden' },
    ],
  },

  space: {
    seoTitle: 'Gratis Rymd\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara rymd\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, planetordning och ordpussel med rymdtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'rymd\u00f6vningar f\u00f6rskoleklass, rymden arbetsblad 5\u20136 \u00e5r, planeter r\u00e4kning, solsystemet, Lgr22, ordpussel rymden, stj\u00e4rnor matematik, astronaut barn, m\u00e5nen, raket\u00f6vning',
    snippetAnswer: 'Rymd\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder planeter, stj\u00e4rnor och raketer f\u00f6r r\u00e4kning, sekvensering och ordpussel. Rymdfascinationen driver stark motivation f\u00f6r matematik. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Rymdtemat i f\u00f6rskoleklass anv\u00e4nder barnens naturliga rymdfascination f\u00f6r avancerad matematik och naturvetenskap. Fem- och sex\u00e5ringar r\u00e4knar stj\u00e4rnor i konstellationer, l\u00f6ser additionsuppgifter med raketer och planeter (tre raketer i rymden, tv\u00e5 till skjuts upp), och sekvenserar solsystemets planeter i ordning fr\u00e5n solen. Storleksj\u00e4mf\u00f6relse med planeter (Jupiter \u00e4r st\u00f6rst, Merkurius minst) ger matematisk ordning i kosmisk skala. Ordpussel med rymdtermer som galax, orbit, krater och nebulosa bygger vetenskapligt ordf\u00f6rr\u00e5d. Nedräkning (10, 9, 8... 1, start!) \u00f6var baklängesräkning. Lgr22 betonar naturvetenskap och nyfikenhet, och rymden \u00e4r det ultimata nyfikenhetstemat f\u00f6r barn i denna \u00e5lder.',
    developmentalMilestones: [
      { milestone: 'Planetsekvensering (solsystemets ordning)', howWeAddress: 'Sekvenserings\u00f6vningar d\u00e4r barn ordnar planeter efter avst\u00e5nd fr\u00e5n solen bygger ordningsf\u00f6rst\u00e5else' },
      { milestone: 'Addition och subtraktion med rymdscenarier', howWeAddress: 'R\u00e4kneuppgifter med raketer, stj\u00e4rnor och astronauter g\u00f6r matematik kosmisk och sp\u00e4nnande' },
      { milestone: 'Storleksj\u00e4mf\u00f6relse och ordning (planeter fr\u00e5n st\u00f6rst till minst)', howWeAddress: 'J\u00e4mf\u00f6relse\u00f6vningar med planeter i olika storlekar tr\u00e4nar matematisk ordning i fascinerande skala' },
      { milestone: 'Rymdordförr\u00e5d och baklängesräkning', howWeAddress: 'Ords\u00f6kningar med rymdtermer och nedr\u00e4knings\u00f6vningar bygger b\u00e5de ordf\u00f6rr\u00e5d och talf\u00f6rst\u00e5else' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, fokusera p\u00e5 jorden, m\u00e5nen och solen, anv\u00e4nd konkreta planetmodeller och h\u00e5ll r\u00e4kneomr\u00e5det inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera alla \u00e5tta planeter med fakta, l\u00e4gg till nedr\u00e4kning fr\u00e5n tjugo och l\u00e5t barnen skriva om vad en astronaut g\u00f6r.',
    parentTakeaway: 'Rymden fascinerar alla barn \u2014 anv\u00e4nd det! Titta p\u00e5 stj\u00e4rnorna tillsammans och r\u00e4kna dem. L\u00e4s bilderb\u00f6cker om rymden och prata om planeternas ordning. G\u00f6r en nedr\u00e4kning vid raketlekar: \u201dtio, nio, \u00e5tta... start!\u201d. St\u00e4ll fr\u00e5gor: \u201dvilken planet \u00e4r st\u00f6rst?\u201d, \u201dhur m\u00e5nga planeter finns det?\u201d. Bygg en raket av kartong och r\u00e4kna f\u00f6nstren. Rymden g\u00f6r matematik magisk.',
    classroomIntegration: 'Rymdtemat i f\u00f6rskoleklassen ger veckor av fascinerande l\u00e4rande: i matematiken r\u00e4knas stj\u00e4rnor och \u00f6vas nedr\u00e4kning, i NO utforskas solsystemet och diskuteras dag/natt, i svenskan \u00f6vas rymdord i pussel och skrivs rymdberättelser, och i bild skapas rymdkonst. Lgr22:s m\u00e5l f\u00f6r naturvetenskap och nyfikenhet st\u00f6ds naturligt av rymdtemat.',
    assessmentRubric: [
      { skill: 'Planetsekvensering', emerging: 'namnger 2\u20133 planeter men os\u00e4ker p\u00e5 ordningen', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt de \u00e5tta planeterna fr\u00e5n solen ut\u00e5t', advanced: 'kopplar planeter till egenskaper (storlek, temperatur) och f\u00f6rklarar ordningen' },
      { skill: 'Addition och subtraktion med rymdmotiv', emerging: 'l\u00f6ser additionsuppgifter inom 5 med rymdbilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med rymdscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och anv\u00e4nder nedr\u00e4kning fr\u00e5n tjugo flytande' },
      { skill: 'Rymdordpussel', emerging: 'hittar 2\u20133 rymdord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 rymdtermer', advanced: 'l\u00f6ser korsord och skriver informationsmeningar om rymden' },
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
