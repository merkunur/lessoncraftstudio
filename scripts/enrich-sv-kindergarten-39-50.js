#!/usr/bin/env node
/**
 * SEO Part 291: SV Kindergarten Grade Enrichment \u2014 Themes 39-50
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the kindergarten grade block of 12 SV theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    seoTitle: 'Gratis Sport\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara sport\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). Po\u00e4ngr\u00e4kning, addition och ordpussel med idrottstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'sport\u00f6vningar f\u00f6rskoleklass, idrott arbetsblad 5\u20136 \u00e5r, po\u00e4ngr\u00e4kning matematik, addition subtraktion sport, Lgr22, ordpussel idrott, lagarbete \u00f6vningar, bollsporter barn, r\u00f6relse och matematik, f\u00f6reningsidrott',
    snippetAnswer: 'Sport\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder po\u00e4ngst\u00e4llningar, laguppst\u00e4llningar och idrottsutrustning f\u00f6r addition, subtraktion och ordpussel. Teman som fotboll, basket och simning driver stark motivation. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I f\u00f6rskoleklass f\u00f6rvandlas sporttemat till riktig matematiktr\u00e4ning genom po\u00e4ngr\u00e4kning och laguppst\u00e4llningar. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med matchresultat (fyra m\u00e5l i f\u00f6rsta halvlek, tre i andra \u2014 hur m\u00e5nga totalt?), j\u00e4mf\u00f6r utrustning efter storlek och \u00f6var subtraktion med bollscenarier. Ordpussel med sportordf\u00f6rr\u00e5d som racket, hj\u00e4lm, m\u00e5lvakt och pokal bygger l\u00e4sf\u00e4rdighet i en sp\u00e4nnande kontext. Lgr22 betonar r\u00f6relse, h\u00e4lsa och vardagsmatematik. I Sverige d\u00e4r barn ofta b\u00f6rjar i f\u00f6reningsidrott redan vid fem \u00e5rs \u00e5lder skapar sporttemat en perfekt bro mellan fysisk aktivitet och akademiskt l\u00e4rande.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion inom tio med po\u00e4ngscenarier', howWeAddress: 'R\u00e4kneuppgifter d\u00e4r barn adderar m\u00e5l och subtr\u00e4herar utvisningar g\u00f6r operationerna sp\u00e4nnande och begripliga' },
      { milestone: 'Storleksj\u00e4mf\u00f6relse med sportf\u00f6rem\u00e5l (bollar, racketar)', howWeAddress: 'J\u00e4mf\u00f6relse\u00f6vningar d\u00e4r barn ordnar utrustning efter storlek bygger m\u00e4tf\u00f6rst\u00e5else och ordningsf\u00f6rr\u00e5d' },
      { milestone: 'Regelbaserat t\u00e4nkande (f\u00f6rst\u00e5 spelregler)', howWeAddress: 'Arbetsblad med turordning och r\u00e4ttvis f\u00f6rdelning av spelare tr\u00e4nar logiskt och socialt t\u00e4nkande' },
      { milestone: 'Sportordpussel och l\u00e4sf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar och korsord med sporttermer bygger ordigenk\u00e4nning och stavningsmedvetenhet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till en sport i taget, h\u00e5ll r\u00e4kneomr\u00e5det inom fem och anv\u00e4nd konkret utrustning som komplement. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera flerstegsproblem med matchstatistik, utvidga till talomr\u00e5det tjugo och l\u00e5t barnen skriva korta matchrapporter.',
    parentTakeaway: 'Sport finns \u00f6verallt i barnets vardag \u2014 anv\u00e4nd det! R\u00e4kna m\u00e5l n\u00e4r ni tittar p\u00e5 match, h\u00e5ll po\u00e4ngen n\u00e4r ni spelar utomhus, och j\u00e4mf\u00f6r bollar efter storlek. St\u00e4ll fr\u00e5gor: \u201dom laget g\u00f6r tre m\u00e5l till, hur m\u00e5nga blir det totalt?\u201d. G\u00e5 p\u00e5 f\u00f6reningstr\u00e4ningen och r\u00e4kna spelare i varje lag. Varje match blir en matematiklektion.',
    classroomIntegration: 'Sporttemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: i matematiken \u00f6vas po\u00e4ngr\u00e4kning och additionsuppgifter, i svenskan \u00f6vas sportord i pussel och skrivuppgifter, i idrott praktiseras r\u00f6relse och regler, och p\u00e5 samlingen diskuteras r\u00e4ttvisa och lagarbete. Sportdagar och f\u00f6reningsbes\u00f6k f\u00f6rl\u00e4nger l\u00e4randet utanf\u00f6r klassrummet.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med po\u00e4ngscenarier', emerging: 'l\u00f6ser additionsuppgifter inom 5 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med sportscenarier', advanced: 'l\u00f6ser flerstegsproblem inom 20 och h\u00e5ller po\u00e4ngst\u00e4llningen' },
      { skill: 'Storleksj\u00e4mf\u00f6relse och ordning', emerging: 'j\u00e4mf\u00f6r tv\u00e5 sportf\u00f6rem\u00e5l efter storlek med st\u00f6d', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt 4\u20135 f\u00f6rem\u00e5l fr\u00e5n minst till st\u00f6rst', advanced: 'anv\u00e4nder j\u00e4mf\u00f6relseord korrekt och kopplar till m\u00e4tning i centimeter' },
      { skill: 'Sportordf\u00f6rr\u00e5d i ordpussel', emerging: 'hittar 2\u20133 sportord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ords\u00f6kningar med 5\u20136 sporttermer', advanced: 'l\u00f6ser korsord och skriver meningar med sportordena' },
    ],
  },

  spring: {
    seoTitle: 'Gratis V\u00e5r\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara v\u00e5r\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, naturobservation och ordpussel med v\u00e5rtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'v\u00e5r\u00f6vningar f\u00f6rskoleklass, v\u00e5r arbetsblad 5\u20136 \u00e5r, v\u00e5rblommor r\u00e4kning, kryp och sm\u00e5djur, Lgr22 naturvetenskap, ordpussel v\u00e5r, \u00e5rstider f\u00f6rskola, pollinerare, v\u00e5rtecken, fr\u00f6s\u00e5dd barn',
    snippetAnswer: 'V\u00e5r\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder blommor, insekter och v\u00e5rtecken f\u00f6r r\u00e4kning, naturobservation och ordpussel. V\u00e5rens uppvaknande ger stark koppling till Lgr22:s naturvetenskap. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'V\u00e5rtemat i f\u00f6rskoleklass kopplar matematik till naturens uppvaknande p\u00e5 ett s\u00e4tt Lgr22 betonar. Fem- och sex\u00e5ringar r\u00e4knar v\u00e5rblommor, l\u00f6ser additionsuppgifter med nyckelpigor och fj\u00e4rilar (sex nyckelpigor p\u00e5 bladet, fyra till landar \u2014 hur m\u00e5nga?), och dokumenterar v\u00e5rtecken systematiskt. Sekvensering av v\u00e5rens livscykler (fr\u00f6 till blomma, \u00e4gg till fj\u00e4ril) bygger vetenskapligt processt\u00e4nkande. Ordpussel med v\u00e5rord som krokus, maskros, grodd och bi bygger naturvetenskapligt ordf\u00f6rr\u00e5d. Svenska v\u00e5ren \u00e4r s\u00e4rskilt dramatisk efter den l\u00e5nga vintern, vilket g\u00f6r v\u00e5rteckenobservation till en meningsfull del av f\u00f6rskoleklassens vardag.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med v\u00e5rmotiv (blommor, insekter)', howWeAddress: 'R\u00e4kneuppgifter d\u00e4r blommor spirar och insekter landar g\u00f6r operationerna s\u00e4songsanknutna och begripliga' },
      { milestone: 'V\u00e5rteckenobservation och dokumentation', howWeAddress: 'Observationsprotokoll d\u00e4r barn registrerar v\u00e5rtecken (f\u00f6rsta blommorna, f\u00f6rsta fj\u00e4rilen) bygger vetenskapligt arbetss\u00e4tt' },
      { milestone: 'Livscykelsekvensering (fr\u00f6 till blomma, larv till fj\u00e4ril)', howWeAddress: 'Sekvenserings\u00f6vningar d\u00e4r barn ordnar stadier i r\u00e4tt f\u00f6ljd utvecklar processt\u00e4nkande' },
      { milestone: 'V\u00e5rordf\u00f6rr\u00e5d och l\u00e4sf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar och korsord med v\u00e5rtermer bygger ordigenk\u00e4nning och naturvetenskaplig terminologi' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, fokusera p\u00e5 tre v\u00e4lk\u00e4nda v\u00e5rtecken (blommor, f\u00e5glar, insekter), begr\u00e4nsa r\u00e4kneomr\u00e5det till fem och anv\u00e4nd riktiga v\u00e5rblommor som komplement. F\u00f6r avancerade f\u00f6rskoleklassbarn utvidga till fler livscykler, l\u00e4gg till datainsamling (\u00f6ver tid r\u00e4kna v\u00e5rblommor) och l\u00e5t barnen skriva v\u00e5rdagbok med ritningar och ord.',
    parentTakeaway: 'V\u00e5ren \u00e4r perfekt f\u00f6r utomhusmatematik! G\u00e5 p\u00e5 v\u00e5rteckenpromenad och r\u00e4kna blommor, insekter och f\u00e5glar. St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga krokusar ser du?\u201d, \u201dvi s\u00e5g \u00e5tta nyckelpigor, tre fl\u00f6g iv\u00e4g \u2014 hur m\u00e5nga kvar?\u201d. S\u00e5 fr\u00f6n tillsammans och m\u00e4t tillv\u00e4xten varje vecka. Plocka v\u00e5rblommor och sortera efter f\u00e4rg. Varje utflykt blir en matematiklektion.',
    classroomIntegration: 'V\u00e5rtemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: i matematiken r\u00e4knas blommor och insekter, i NO observeras v\u00e5rtecken och livscykler, i svenskan \u00f6vas v\u00e5rord i pussel och skrivuppgifter, och p\u00e5 utedagar dokumenteras naturens f\u00f6r\u00e4ndringar. V\u00e5rteckenkalender i klassrummet kopplar daglig observation till akademiskt l\u00e4rande.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med v\u00e5rmotiv', emerging: 'l\u00f6ser additionsuppgifter inom 5 med v\u00e5rbilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med v\u00e5rscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna v\u00e5rmatematikproblem' },
      { skill: 'V\u00e5rteckenobservation', emerging: 'identifierar 2\u20133 v\u00e5rtecken med st\u00f6d', proficient: 'dokumenterar sj\u00e4lvst\u00e4ndigt 5\u20136 v\u00e5rtecken med ritningar', advanced: 'f\u00f6r systematisk v\u00e5rdagbok med datum, plats och detaljerade observationer' },
      { skill: 'V\u00e5rordf\u00f6rr\u00e5d i pussel', emerging: 'hittar 2\u20133 v\u00e5rord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 v\u00e5rtermer', advanced: 'l\u00f6ser korsord och skriver meningar med v\u00e5rorden' },
    ],
  },

  summer: {
    seoTitle: 'Gratis Sommar\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara sommar\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, m\u00e4tning och ordpussel med sommartema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'sommar\u00f6vningar f\u00f6rskoleklass, sommar arbetsblad 5\u20136 \u00e5r, strandr\u00e4kning, glassr\u00e4kning, Lgr22, ordpussel sommar, bad\u00f6vning, sommarlov matematik, solskydd, utomhuslekar',
    snippetAnswer: 'Sommar\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder strand, glass och sommaraktiviteter f\u00f6r r\u00e4kning, m\u00e4tning och ordpussel. Sommartemat h\u00e5ller l\u00e4randet levande under lovet. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Sommartemat i f\u00f6rskoleklass anv\u00e4nder den svenska sommarens aktiviteter f\u00f6r meningsfull matematik. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med glass och vattenmelon (sju glassar, tre \u00e4ts upp \u2014 hur m\u00e5nga kvar?), m\u00e4ter med icke-standardm\u00e5tt p\u00e5 stranden och skapar m\u00f6nster med snäckor och sj\u00f6stj\u00e4rnor. Tidsuppfattning \u00f6vas genom sommarscheman och dagplanering. Ordpussel med sommarordf\u00f6rr\u00e5d som sandslott, solsk\u00e4rm, baddr\u00e4kt och vattenlek bygger l\u00e4sf\u00e4rdighet. Lgr22 betonar vardagsmatematik och s\u00e4songsanknytning. Den l\u00e5nga svenska sommaren ger veckor av utomhusl\u00e4rande som arbetsbladen f\u00f6rl\u00e4nger.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med sommarscenarier (glass, snäckor)', howWeAddress: 'Räkneuppgifter med strandföremål och sommaraktiviteter gör operationerna lustfyllda och säsongsanknutna' },
      { milestone: 'Mätning med icke-standardmått (snäckor, sandformar)', howWeAddress: 'Mätövningar där barn jämför längder och volymer med strandmaterial introducerar mätbegrepp konkret' },
      { milestone: 'Mönsterigenkänning med sommarföremål', howWeAddress: 'Mönsterövningar med snäckor, sjöstjärnor och sandformar bygger algebraiskt grundtänkande' },
      { milestone: 'Sommarordförråd och läsfärdighet', howWeAddress: 'Ordsökningar och korsord med sommartermer bygger ordkunskap och stavningsmedvetenhet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd konkreta sommarförem\u00e5l (sn\u00e4ckor, sandformar), begr\u00e4nsa r\u00e4kneomr\u00e5det till fem och fokusera p\u00e5 en aktivitet per tillf\u00e4lle. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till m\u00e4tning med linjal, introducera tidsuppfattning (klockan p\u00e5 sommarschemat) och l\u00e5t barnen skriva sommarber\u00e4ttelser.',
    parentTakeaway: 'Sommaren \u00e4r matematikens b\u00e4sta klassrum! R\u00e4kna sn\u00e4ckor p\u00e5 stranden, m\u00e4t sandslott med pinnar, och \u00f6va subtraktion med glassar: \u201dvi hade sex glassar, tre \u00e4r uppätna \u2014 hur m\u00e5nga kvar?\u201d. G\u00f6r ett sommarschema d\u00e4r barnet planerar dagens aktiviteter. Samla stenar och sortera efter storlek. Varje sommardag kan bli en l\u00e4randeupplevelse.',
    classroomIntegration: 'Sommartemat i f\u00f6rskoleklassen anv\u00e4nds f\u00f6re sommarlovet: i matematiken r\u00e4knas och m\u00e4ts med sommarförem\u00e5l, i NO diskuteras solskydd och vattenkunskap, i svenskan \u00f6vas sommarord i pussel och skrivuppgifter, och utedagar ger praktisk \u00f6vning. Sommararbetsblad skickas hem som lovaktiviteter f\u00f6r att h\u00e5lla l\u00e4randet ig\u00e5ng.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med sommarmotiv', emerging: 'l\u00f6ser additionsuppgifter inom 5 med strandbilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med sommarscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och dokumenterar med tals\u00e4tser' },
      { skill: 'M\u00e4tning med icke-standardm\u00e5tt', emerging: 'j\u00e4mf\u00f6r tv\u00e5 f\u00f6rem\u00e5l (l\u00e4ngre/kortare) med st\u00f6d', proficient: 'mäter sj\u00e4lvst\u00e4ndigt med icke-standardm\u00e5tt och j\u00e4mf\u00f6r resultat', advanced: 'mäter med linjal i centimeter och dokumenterar resultaten' },
      { skill: 'Sommarordpussel', emerging: 'hittar 2\u20133 sommarord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 sommartermer', advanced: 'l\u00f6ser korsord och skriver sommarber\u00e4ttelser med orden' },
    ],
  },

  superheroes: {
    seoTitle: 'Gratis Superhj\u00e4lte\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara superhj\u00e4lte\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, logik och ordpussel med superhj\u00e4ltetema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'superhj\u00e4lte\u00f6vningar f\u00f6rskoleklass, superhj\u00e4ltar arbetsblad 5\u20136 \u00e5r, superkraft matematik, addition subtraktion, Lgr22, ordpussel superhj\u00e4ltar, logik barn, uppdragsmatematik, hj\u00e4ltemod, probleml\u00f6sning',
    snippetAnswer: 'Superhj\u00e4lte\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder uppdrag, superkrafter och hj\u00e4ltescenarier f\u00f6r r\u00e4kning, logik och ordpussel. Starkt motiverande tema som driver engagemang. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Superhj\u00e4ltetemat i f\u00f6rskoleklass f\u00f6rvandlar matematik till sp\u00e4nnande uppdrag som fem- och sex\u00e5ringar vill l\u00f6sa. Additionsuppgifter blir r\u00e4ddningsuppdrag (hj\u00e4lten r\u00e4ddade fyra personer, sedan tre till \u2014 hur m\u00e5nga totalt?), och subtraktion blir skurkjakt. M\u00f6nsterig\u00e4nk\u00e4nning \u00f6vas genom superhj\u00e4ltesekvenser och kodknäckning. Logiska uppgifter d\u00e4r barnen utesluter f\u00f6rem\u00e5l som inte h\u00f6r hemma i superhj\u00e4ltens utrustning bygger kritiskt t\u00e4nkande. Ordpussel med hj\u00e4lteordf\u00f6rr\u00e5d som mask, mantel, uppdrag och mod bygger l\u00e4sf\u00e4rdighet. Lgr22 betonar probleml\u00f6sning och mod att pr\u00f6va, och superhj\u00e4ltetemat ger b\u00e5da i en kontext som barnen \u00e4lskar.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion genom uppdragsscenarier', howWeAddress: 'R\u00e4kneuppgifter inramade som r\u00e4ddningsuppdrag g\u00f6r operationerna sp\u00e4nnande och motiverande' },
      { milestone: 'M\u00f6nsterig\u00e4nk\u00e4nning och kodknäckning', howWeAddress: 'M\u00f6nster\u00f6vningar med superhj\u00e4ltesymboler och hemliga koder bygger algebraiskt grundt\u00e4nkande' },
      { milestone: 'Logiskt uteslutande (udda man ut i hj\u00e4lteutrustning)', howWeAddress: 'Klassificerings\u00f6vningar d\u00e4r barn identifierar vad som inte h\u00f6r hemma tr\u00e4nar kritiskt t\u00e4nkande' },
      { milestone: 'Hj\u00e4lteordf\u00f6rr\u00e5d och l\u00e4sf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar och korsord med superhj\u00e4ltetermer bygger ordigenk\u00e4nning i en starkt motiverande kontext' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, f\u00f6renkla uppdragen till ett steg i taget, begr\u00e4nsa r\u00e4kneomr\u00e5det till fem och l\u00e5t barnet v\u00e4lja sin superhj\u00e4lte. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till flerstegsuppdrag med hemliga koder, utvidga till talomr\u00e5det tjugo och l\u00e5t barnen skapa egna superhj\u00e4ltehistorier med matematikproblem.',
    parentTakeaway: 'Alla barn \u00e4lskar superhj\u00e4ltar \u2014 g\u00f6r matematik till ett uppdrag! Skapa \u201dsuperhj\u00e4ltetr\u00e4ning\u201d d\u00e4r barnet l\u00f6ser matematikuppgifter f\u00f6r att f\u00e5 superkrafter. R\u00e4kna r\u00e4ddningar i tecknade filmer, g\u00f6r en hj\u00e4ltekarta med uppdrag att l\u00f6sa hemma. St\u00e4ll fr\u00e5gor: \u201dhj\u00e4lten r\u00e4ddade fem katter och sedan tre till, hur m\u00e5nga totalt?\u201d. L\u00e5t barnet designa sin egen superhj\u00e4lte med mattebaserade superkrafter.',
    classroomIntegration: 'Superhj\u00e4ltetemat i f\u00f6rskoleklassen ger enorm motivation: i matematiken l\u00f6ses r\u00e4ddningsuppgifter och kodkn\u00e4ckning, i svenskan \u00f6vas hj\u00e4lteord i pussel och skrivs uppdragsber\u00e4ttelser, i bild skapas hj\u00e4ltemasker och mantlar, och i v\u00e4rdegrunden diskuteras hj\u00e4ltemod och att hj\u00e4lpa andra. Lgr22:s m\u00e5l f\u00f6r probleml\u00f6sning och socialt ansvar st\u00f6ds naturligt.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion i uppdragsformat', emerging: 'l\u00f6ser additionsuppgifter inom 5 med hj\u00e4ltebilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med uppdragsscenarier', advanced: 'l\u00f6ser flerstegsuppdrag inom 20 och skapar egna matematikuppdrag' },
      { skill: 'M\u00f6nsterig\u00e4nk\u00e4nning med hj\u00e4ltesymboler', emerging: 'forts\u00e4tter ett AB-m\u00f6nster med st\u00f6d', proficient: 'forts\u00e4tter sj\u00e4lvst\u00e4ndigt ABC-m\u00f6nster och identifierar m\u00f6nsterregeln', advanced: 'skapar egna hemliga koder och f\u00f6rklarar m\u00f6nstrets uppbyggnad' },
      { skill: 'Superhj\u00e4ltordpussel', emerging: 'hittar 2\u20133 hj\u00e4lteord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 hj\u00e4ltetermer', advanced: 'l\u00f6ser korsord och skriver korta uppdragsber\u00e4ttelser' },
    ],
  },

  toys: {
    seoTitle: 'Gratis Leksaks\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara leksaks\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, sortering och ordpussel med leksakstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'leksaks\u00f6vningar f\u00f6rskoleklass, leksaker arbetsblad 5\u20136 \u00e5r, sortering leksaker, r\u00e4kning barn, Lgr22, ordpussel leksaker, klassificering, f\u00f6rdelning \u00f6vningar, leksakskategorier, pengar och handel',
    snippetAnswer: 'Leksaks\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder dockor, bilar och br\u00e4dspel f\u00f6r r\u00e4kning, sortering och ordpussel. V\u00e4lbekant och motiverande kontext f\u00f6r matematik. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Leksakstemat i f\u00f6rskoleklass f\u00f6rvandlar barnets egen v\u00e4rld till matematik. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med leksaker (fem bilar p\u00e5 hyllan, tre till kommer \u2014 hur m\u00e5nga?), sorterar leksaker efter kategori, f\u00e4rg och storlek, och \u00f6var r\u00e4ttvis f\u00f6rdelning (dela lika mellan kompisar). Prisj\u00e4mf\u00f6relser i l\u00e5tsasaff\u00e4rer introducerar pengar och v\u00e4rdebegrepp. Ordpussel med leksaksordf\u00f6rr\u00e5d som docka, pussel, kloss och br\u00e4dspel bygger l\u00e4sf\u00e4rdighet. Lgr22 betonar vardagsmatematik och lek som l\u00e4rform, och leksakstemat f\u00f6renar b\u00e5da p\u00e5 ett naturligt s\u00e4tt.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med leksaksscenarier', howWeAddress: 'R\u00e4kneuppgifter d\u00e4r leksaker samlas, ges bort eller sorteras g\u00f6r operationerna vardagsn\u00e4ra' },
      { milestone: 'Klassificering efter flera egenskaper (typ, f\u00e4rg, storlek)', howWeAddress: 'Sorteringsuppgifter d\u00e4r barn grupperar leksaker efter tv\u00e5 kriterier samtidigt utvecklar logiskt t\u00e4nkande' },
      { milestone: 'R\u00e4ttvis f\u00f6rdelning (dela leksaker lika)', howWeAddress: 'Delningsscenarier d\u00e4r barn f\u00f6rdelar leksaker lika mellan grupper introducerar divisionst\u00e4nkande' },
      { milestone: 'Leksaksordf\u00f6rr\u00e5d och l\u00e4sf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar och korsord med leksakstermer bygger ordigenk\u00e4nning och stavningsmedvetenhet' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd riktiga leksaker som komplement, begr\u00e4nsa r\u00e4kneomr\u00e5det till fem och fokusera p\u00e5 sortering efter en egenskap i taget. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till prisj\u00e4mf\u00f6relser med l\u00e5tsaspengar, l\u00e4gg till f\u00f6rdelningsuppgifter och l\u00e5t barnen skapa en leksakskatalog med priser och beskrivningar.',
    parentTakeaway: 'Barnrummet \u00e4r en matematikverkstad! L\u00e5t barnet sortera leksaker efter typ, f\u00e4rg eller storlek n\u00e4r det \u00e4r st\u00e4ddag. R\u00e4kna bilar p\u00e5 hyllan, fördela dockor lika mellan syskon, och lek aff\u00e4r med prisskyltade leksaker. St\u00e4ll fr\u00e5gor: \u201dom du ger bort tre klossar och har tio kvar, hur m\u00e5nga hade du fr\u00e5n b\u00f6rjan?\u201d. Varje lekstund kan bli l\u00e4rande.',
    classroomIntegration: 'Leksakstemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: i matematiken \u00f6vas r\u00e4kning, sortering och f\u00f6rdelning med leksaker, i svenskan \u00f6vas leksaksordf\u00f6rr\u00e5d i pussel och skrivuppgifter, i bild skapas egna leksaksdesigner, och i v\u00e4rdegrunden diskuteras delning och samarbete. Leksaksaff\u00e4r i klassrummet ger rollspelsbaserat l\u00e4rande.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med leksaker', emerging: 'l\u00f6ser additionsuppgifter inom 5 med leksaksbilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med leksaksscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och inkluderar f\u00f6rdelningsproblem' },
      { skill: 'Klassificering av leksaker', emerging: 'sorterar leksaker efter en egenskap med st\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter tv\u00e5 egenskaper och f\u00f6rklarar', advanced: 'skapar egna sorteringskriterier och g\u00f6r diagram \u00f6ver resultat' },
      { skill: 'Leksakordpussel', emerging: 'hittar 2\u20133 leksaksord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 leksakstermer', advanced: 'l\u00f6ser korsord och skriver beskrivningar av leksaker' },
    ],
  },

  transportation: {
    seoTitle: 'Gratis Transport\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara transport\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, sortering och ordpussel med fordonstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'transport\u00f6vningar f\u00f6rskoleklass, fordon arbetsblad 5\u20136 \u00e5r, bilar r\u00e4kning, t\u00e5g matematik, Lgr22, ordpussel fordon, trafikundervisning, sortering transportmedel, flyg och b\u00e5t, kollektivtrafik',
    snippetAnswer: 'Transport\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder bilar, t\u00e5g, flyg och b\u00e5tar f\u00f6r r\u00e4kning, sortering och ordpussel. Transportmedel ger rik matematik och teknikkunskap. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Transporttemat i f\u00f6rskoleklass f\u00f6renar matematik med teknik och samh\u00e4llskunskap. Fem- och sex\u00e5ringar r\u00e4knar fordon, l\u00f6ser additionsuppgifter med passagerare (fem resenärer p\u00e5 bussen, tre kliver p\u00e5 \u2014 hur m\u00e5nga nu?), och sorterar transportmedel efter mark, vatten och luft. Storleksj\u00e4mf\u00f6relser (cykel < bil < buss < t\u00e5g) bygger ordningsbegrepp. Ordpussel med transportordf\u00f6rr\u00e5d som lokf\u00f6rare, flygplats, hamn och bilb\u00e4lte bygger l\u00e4sf\u00e4rdighet. Lgr22 betonar teknik och samh\u00e4lle, och i Sverige d\u00e4r barn \u00e5ker kollektivt tidigt ger transporttemat stark vardagsanknytning.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med passagerarscenarier', howWeAddress: 'R\u00e4kneuppgifter d\u00e4r passagerare kliver p\u00e5 och av bussar och t\u00e5g g\u00f6r operationerna vardagsn\u00e4ra' },
      { milestone: 'Klassificering efter transporttyp (mark, vatten, luft)', howWeAddress: 'Sorteringsuppgifter d\u00e4r barn grupperar fordon efter milj\u00f6 utvecklar kategoriskt t\u00e4nkande' },
      { milestone: 'Storleksordning av fordon', howWeAddress: 'Ordnings\u00f6vningar d\u00e4r barn rangordnar transportmedel efter storlek bygger j\u00e4mf\u00f6relsef\u00f6rm\u00e5ga' },
      { milestone: 'Transportordf\u00f6rr\u00e5d och l\u00e4sf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar och korsord med transporttermer bygger ordigenk\u00e4nning och tekniskt ordf\u00f6rr\u00e5d' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre transporttyper (bil, buss, t\u00e5g), h\u00e5ll r\u00e4kneomr\u00e5det inom fem och anv\u00e4nd leksaksfordon som komplement. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till tidtabellst\u00e4nkande, introducera enkel kartl\u00e4sning f\u00f6r rutter och l\u00e5t barnen skriva om sina favoritf\u00e4rdmedel.',
    parentTakeaway: 'Varje resa \u00e4r en matematiklektion! R\u00e4kna bilar p\u00e5 parkeringen, passagerare p\u00e5 bussen och vagnar p\u00e5 t\u00e5get. St\u00e4ll fr\u00e5gor: \u201dom fem personer kliver p\u00e5 och tre av, hur m\u00e5nga \u00e4r kvar?\u201d. Sortera fordon ni ser efter typ (lastbil, personbil, buss). L\u00e4s tidtabellen tillsammans och r\u00e4kna minuter till n\u00e4sta buss. Vardagens resor blir l\u00e4rande.',
    classroomIntegration: 'Transporttemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: i matematiken r\u00e4knas fordon och passagerare, i teknik diskuteras hur fordon fungerar, i samh\u00e4llskunskap utforskas kollektivtrafik, i svenskan \u00f6vas transportord i pussel och skrivuppgifter. Studiebes\u00f6k till brandstation eller t\u00e5gstation f\u00f6rl\u00e4nger l\u00e4randet.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med passagerare', emerging: 'l\u00f6ser additionsuppgifter inom 5 med fordonsbilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med resescenarier', advanced: 'l\u00f6ser textuppgifter inom 20 med p\u00e5- och avstigningsscenarier' },
      { skill: 'Klassificering av transportmedel', emerging: 'sorterar fordon i tv\u00e5 grupper med st\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt i tre grupper (mark, vatten, luft) och f\u00f6rklarar', advanced: 'skapar undergrupper och kopplar till milj\u00f6p\u00e5verkan' },
      { skill: 'Transportordpussel', emerging: 'hittar 2\u20133 fordonsord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 transporttermer', advanced: 'l\u00f6ser korsord och skriver meningar om transportmedel' },
    ],
  },

  travel: {
    seoTitle: 'Gratis Rese\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara rese\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, kartl\u00e4sning och ordpussel med resetema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'rese\u00f6vningar f\u00f6rskoleklass, resor arbetsblad 5\u20136 \u00e5r, kartl\u00e4sning barn, l\u00e4nder r\u00e4kning, Lgr22 geografi, ordpussel resor, packning matematik, flygresor, semesterplanering, v\u00e4rldskarta',
    snippetAnswer: 'Rese\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder kartor, packning och resm\u00e5l f\u00f6r r\u00e4kning, geografi och ordpussel. Resetemat ger bred v\u00e4rldsf\u00f6rst\u00e5else och kulturkunskap. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Resetemat i f\u00f6rskoleklass kombinerar matematik med geografi och kulturkunskap. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med packning (fyra skjortor i v\u00e4skan, tre till l\u00e4ggs i \u2014 hur m\u00e5nga?), l\u00e4ser enkla kartor och j\u00e4mf\u00f6r avst\u00e5nd. R\u00e4kning med valutor i l\u00e5tsasaff\u00e4rer introducerar v\u00e4rdebegrepp. Sortering av l\u00e4nder och flaggor efter kontinent bygger geografisk grund. Ordpussel med reseordf\u00f6rr\u00e5d som pass, flygplats, hotell och karta bygger l\u00e4sf\u00e4rdighet. Lgr22 betonar omv\u00e4rldskunskap och kulturf\u00f6rst\u00e5else. Svenska familjer reser ofta, vilket ger stark verklighetskoppling.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med resescenarier (packning, biljetter)', howWeAddress: 'R\u00e4kneuppgifter med v\u00e4skor, kl\u00e4der och biljetter g\u00f6r operationerna vardagsn\u00e4ra och sp\u00e4nnande' },
      { milestone: 'Enkel kartl\u00e4sning och riktningsf\u00f6rst\u00e5else', howWeAddress: 'Kart\u00f6vningar d\u00e4r barn f\u00f6ljer rutter och identifierar riktningar bygger rumslig orientering' },
      { milestone: 'Kulturell medvetenhet (l\u00e4nder, flaggor, traditioner)', howWeAddress: 'Matchnings\u00f6vningar med l\u00e4nder och flaggor vidgar v\u00e4rldsbilden och bygger kulturkunskap' },
      { milestone: 'Reseordf\u00f6rr\u00e5d och l\u00e4sf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar och korsord med resetermer bygger ordigenk\u00e4nning och funktionellt ordf\u00f6rr\u00e5d' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, fokusera p\u00e5 n\u00e4romr\u00e5desresor (buss till stan, t\u00e5g till mormor), begr\u00e4nsa r\u00e4kneomr\u00e5det till fem och anv\u00e4nd bilder snarare \u00e4n kartor. F\u00f6r avancerade f\u00f6rskoleklassbarn introducera enkel kartl\u00e4sning med riktningar, l\u00e4gg till valutaj\u00e4mf\u00f6relser och l\u00e5t barnen planera en dr\u00f6mresa med budget.',
    parentTakeaway: 'Varje resa \u00e4r l\u00e4rande! L\u00e5t barnet hj\u00e4lpa till att packa och r\u00e4kna kl\u00e4desplagg. Titta p\u00e5 kartan tillsammans och hitta resm\u00e5let. R\u00e4kna biljetter, v\u00e4skor och passagerare p\u00e5 flyget. St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga timmars t\u00e5gresa \u00e4r det?\u201d, \u201dvilket land ska vi till?\u201d. G\u00f6r en resebok med foton och r\u00e4kneuppgifter fr\u00e5n semestern.',
    classroomIntegration: 'Resetemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: i matematiken r\u00e4knas och j\u00e4mf\u00f6rs med resescenarier, i geografi utforskas l\u00e4nder och kartor, i svenskan \u00f6vas reseord i pussel och skrivuppgifter, och i v\u00e4rdegrunden diskuteras kulturm\u00f6ten. Temadag med \u201dresa runt v\u00e4rlden\u201d i klassrummet ger f\u00f6rdjupad upplevelse.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med resetema', emerging: 'l\u00f6ser additionsuppgifter inom 5 med resebilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med resescenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och planerar en resa med budget' },
      { skill: 'Enkel kartl\u00e4sning', emerging: 'f\u00f6ljer en enkel rutt p\u00e5 karta med st\u00f6d', proficient: 'identifierar sj\u00e4lvst\u00e4ndigt riktningar och l\u00e4nder p\u00e5 en f\u00f6renklad karta', advanced: 'planerar rutter och j\u00e4mf\u00f6r avst\u00e5nd mellan l\u00e4nder' },
      { skill: 'Reseordpussel', emerging: 'hittar 2\u20133 reseord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 resetermer', advanced: 'l\u00f6ser korsord och skriver om sin dr\u00f6mresa' },
    ],
  },

  vegetables: {
    seoTitle: 'Gratis Gr\u00f6nsaks\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara gr\u00f6nsaks\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, sortering och ordpussel med gr\u00f6nsakstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'gr\u00f6nsaks\u00f6vningar f\u00f6rskoleklass, gr\u00f6nsaker arbetsblad 5\u20136 \u00e5r, r\u00e4kna gr\u00f6nsaker, n\u00e4ringsl\u00e4ra barn, Lgr22, ordpussel gr\u00f6nsaker, tallriksmodellen, odling f\u00f6rskola, h\u00e4lsosam mat, sortering gr\u00f6nsaker',
    snippetAnswer: 'Gr\u00f6nsaks\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder mor\u00f6tter, tomater och \u00e4rtor f\u00f6r r\u00e4kning, sortering och ordpussel. N\u00e4ringsl\u00e4ra och tallriksmodellen integreras naturligt. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Gr\u00f6nsakstemat i f\u00f6rskoleklass kopplar matematik till h\u00e4lsokunskap p\u00e5 ett s\u00e4tt Lgr22 betonar. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med gr\u00f6nsaker (nio mor\u00f6tter i l\u00e5dan, fyra \u00e4ts \u2014 hur m\u00e5nga kvar?), sorterar gr\u00f6nsaker efter f\u00e4rg, typ och v\u00e4xtplats (ovan eller under jord), och skapar stapeldiagram \u00f6ver favoritgr\u00f6nsaker. Tallriksmodellen introduceras med gr\u00f6nsaker som en av tre matgrupper. Ordpussel med n\u00e4ringsordf\u00f6rr\u00e5d som vitamin, fiber, rot och blad bygger b\u00e5de l\u00e4sf\u00e4rdighet och h\u00e4lsokunskap. I Sverige d\u00e4r skolm\u00e5ltider serverar dagliga gr\u00f6nsaker ger temat omedelbar verklighetskoppling.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med gr\u00f6nsaksscenarier', howWeAddress: 'R\u00e4kneuppgifter med gr\u00f6nsaker i k\u00f6k, odling och matlagning g\u00f6r operationerna vardagsn\u00e4ra' },
      { milestone: 'Klassificering efter v\u00e4xtplats (ovan/under jord) och f\u00e4rg', howWeAddress: 'Sorteringsuppgifter d\u00e4r barn grupperar gr\u00f6nsaker efter flera egenskaper utvecklar logiskt t\u00e4nkande' },
      { milestone: 'Datainsamling med favoritgr\u00f6nsaksunders\u00f6kning', howWeAddress: 'Stapeldiagram\u00f6vningar d\u00e4r barn samlar och representerar data om klassens gr\u00f6nsaker bygger statistisk grund' },
      { milestone: 'H\u00e4lsomedvetenhet och n\u00e4ringsordf\u00f6rr\u00e5d', howWeAddress: 'Ords\u00f6kningar och korsord med n\u00e4ringstermer som vitamin, fiber och tallriksmodellen bygger h\u00e4lsokunskap' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd riktiga gr\u00f6nsaker som komplement, begr\u00e4nsa till fem v\u00e4lk\u00e4nda sorter och fokusera p\u00e5 r\u00e4kning inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till receptr\u00e4kning, introducera tallriksmodellen med alla tre matgrupper och l\u00e5t barnen skriva om sin favoritgr\u00f6nsak.',
    parentTakeaway: 'K\u00f6ket \u00e4r ett matematik- och h\u00e4lsolabb! L\u00e5t barnet r\u00e4kna gr\u00f6nsaker vid matlagning, sortera gr\u00f6nsaker efter f\u00e4rg p\u00e5 sk\u00e4rbr\u00e4dan och \u00f6va subtraktion: \u201dvi hade tio morötter, du skalade fyra, hur m\u00e5nga kvar?\u201d. Handla gr\u00f6nsaker tillsammans och l\u00e5t barnet v\u00e4lja en ny gr\u00f6nsak varje vecka. Prata om tallriksmodellen vid middagen.',
    classroomIntegration: 'Gr\u00f6nsakstemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: i matematiken r\u00e4knas och sorteras gr\u00f6nsaker, i NO diskuteras n\u00e4ring och tallriksmodellen, i svenskan \u00f6vas gr\u00f6nsaksord i pussel och skrivuppgifter, och vid skolm\u00e5ltiden praktiseras h\u00e4lsosamma val. Klassens odlingsl\u00e5da med gr\u00f6nsaker kopplar temat till verklig upplevelse.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med gr\u00f6nsaker', emerging: 'l\u00f6ser additionsuppgifter inom 5 med gr\u00f6nsaksbilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med k\u00f6ksscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och anv\u00e4nder recept som matematikkontext' },
      { skill: 'Gr\u00f6nsakssortering och klassificering', emerging: 'sorterar gr\u00f6nsaker efter en egenskap med st\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter tv\u00e5 egenskaper (f\u00e4rg + v\u00e4xtplats) och f\u00f6rklarar', advanced: 'skapar egna sorteringskriterier och kopplar till tallriksmodellen' },
      { skill: 'Gr\u00f6nsaksordpussel', emerging: 'hittar 2\u20133 gr\u00f6nsaksnamn i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 gr\u00f6nsaksord', advanced: 'l\u00f6ser korsord med n\u00e4ringstermer och skriver om h\u00e4lsosam mat' },
    ],
  },

  weather: {
    seoTitle: 'Gratis V\u00e4der\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara v\u00e4der\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, datainsamling och ordpussel med v\u00e4dertema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'v\u00e4der\u00f6vningar f\u00f6rskoleklass, v\u00e4der arbetsblad 5\u20136 \u00e5r, v\u00e4derobservation, temperatur barn, Lgr22, ordpussel v\u00e4der, regnm\u00e4tning, molntyper, klimat, v\u00e4derkalender',
    snippetAnswer: 'V\u00e4der\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder sol, regn, sn\u00f6 och moln f\u00f6r r\u00e4kning, datainsamling och ordpussel. V\u00e4derobservation kopplar naturvetenskap till vardagen. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'V\u00e4dertemat i f\u00f6rskoleklass f\u00f6renar matematik med naturvetenskap genom daglig observation. Fem- och sex\u00e5ringar dokumenterar v\u00e4dret varje dag i en kalender, skapar stapeldiagram \u00f6ver soltimmar och regndagar, och l\u00f6ser additionsuppgifter med v\u00e4dersymboler (fyra soltimmar p\u00e5 m\u00e5ndag, tre p\u00e5 tisdag \u2014 hur m\u00e5nga totalt?). Temperaturavl\u00e4sning introducerar tallinjen. Sekvensering av v\u00e4derfenomen bygger processt\u00e4nkande. Ordpussel med v\u00e4derordf\u00f6rr\u00e5d som termometer, hagel, \u00e5ska och dimma bygger naturvetenskaplig terminologi. I Sverige med dess dramatiska v\u00e4derskillnader \u00e4r v\u00e4derobservation en naturlig del av f\u00f6rskoleklassens vardag.',
    developmentalMilestones: [
      { milestone: 'Daglig v\u00e4derobservation och datainsamling', howWeAddress: 'V\u00e4derkalender d\u00e4r barn registrerar dagligt v\u00e4der med symboler bygger vetenskapligt arbetss\u00e4tt och dataf\u00f6rst\u00e5else' },
      { milestone: 'Addition och subtraktion med v\u00e4derdata', howWeAddress: 'R\u00e4kneuppgifter d\u00e4r barn adderar soltimmar och regndagar g\u00f6r matematik meningsfull' },
      { milestone: 'Temperaturf\u00f6rst\u00e5else (varmt, kallt, grader)', howWeAddress: 'Termometer\u00f6vningar d\u00e4r barn l\u00e4ser och j\u00e4mf\u00f6r temperaturer introducerar tallinjen naturligt' },
      { milestone: 'V\u00e4derordf\u00f6rr\u00e5d och l\u00e4sf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar och korsord med v\u00e4dertermer bygger naturvetenskapligt ordf\u00f6rr\u00e5d' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till tre v\u00e4dertyper (sol, regn, moln), anv\u00e4nd bildbaserad v\u00e4derkalender och h\u00e5ll r\u00e4kneomr\u00e5det inom fem. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till temperaturavl\u00e4sning, introducera enkel grafritning och l\u00e5t barnen j\u00e4mf\u00f6ra v\u00e4der i olika l\u00e4nder.',
    parentTakeaway: 'V\u00e4dret \u00e4r gratis matematik varje dag! Titta ut genom f\u00f6nstret och dokumentera v\u00e4dret tillsammans i en kalender. R\u00e4kna regndroppar p\u00e5 rutan, j\u00e4mf\u00f6r temperatur f\u00f6re och efter lunch. St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga soldagar hade vi den h\u00e4r veckan?\u201d, \u201d\u00e4r det varmare idag \u00e4n ig\u00e5r?\u201d. Bygg en regnm\u00e4tare av en PET-flaska och m\u00e4t regnet tillsammans.',
    classroomIntegration: 'V\u00e4dertemat i f\u00f6rskoleklassen ger daglig struktur: i matematiken dokumenteras v\u00e4der med data och diagram, i NO diskuteras v\u00e4derfenomen och \u00e5rstider, i svenskan \u00f6vas v\u00e4derord i pussel och skrivuppgifter, och p\u00e5 samlingen presenteras dagens v\u00e4der. Lgr22:s m\u00e5l f\u00f6r naturvetenskap och dataf\u00f6rst\u00e5else st\u00f6ds direkt genom daglig v\u00e4derobservation.',
    assessmentRubric: [
      { skill: 'V\u00e4derobservation och datainsamling', emerging: 'v\u00e4ljer r\u00e4tt v\u00e4dersymbol med st\u00f6d', proficient: 'dokumenterar sj\u00e4lvst\u00e4ndigt dagligt v\u00e4der och skapar enkel strecklist', advanced: 'skapar stapeldiagram \u00f6ver veckans v\u00e4der och drar slutsatser' },
      { skill: 'Addition och subtraktion med v\u00e4derdata', emerging: 'l\u00f6ser additionsuppgifter inom 5 med v\u00e4dersymboler', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med v\u00e4derscenarier', advanced: 'anv\u00e4nder v\u00e4derdata f\u00f6r att l\u00f6sa textuppgifter inom 20' },
      { skill: 'V\u00e4derordpussel', emerging: 'hittar 2\u20133 v\u00e4derord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 v\u00e4dertermer', advanced: 'l\u00f6ser korsord och skriver v\u00e4derrapporter med termerna' },
    ],
  },

  winter: {
    seoTitle: 'Gratis Vinter\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara vinter\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, m\u00e4tning och ordpussel med vintertema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'vinter\u00f6vningar f\u00f6rskoleklass, vinter arbetsblad 5\u20136 \u00e5r, sn\u00f6r\u00e4kning, vintermatematik, Lgr22, ordpussel vinter, is och sn\u00f6, temperatur, vinterdjur, vinterkl\u00e4der',
    snippetAnswer: 'Vinter\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder sn\u00f6, is och vinterdjur f\u00f6r r\u00e4kning, m\u00e4tning och ordpussel. Den svenska vinterns sn\u00f6 och kyla ger rik l\u00e4randekontext. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Vintertemat i f\u00f6rskoleklass anv\u00e4nder den l\u00e5nga svenska vintern f\u00f6r meningsfull matematik och naturvetenskap. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med sn\u00f6bollar och sn\u00f6gubbar (sex sn\u00f6bollar, tre kastas \u2014 hur m\u00e5nga kvar?), m\u00e4ter sn\u00f6djup med pinnar och j\u00e4mf\u00f6r temperaturer under noll. Sekvensering av vinteraktiviteter (kl\u00e4 p\u00e5 sig i r\u00e4tt ordning) bygger processt\u00e4nkande. Klassificering av vinterdjur efter anpassningsstrategier (dvala, flyttning, stanna) introducerar biologi. Ordpussel med vinterordf\u00f6rr\u00e5d som isgata, snödriva, p\u00e5lsa och pulkabacke bygger s\u00e4songsordf\u00f6rr\u00e5d. Lgr22 betonar naturvetenskap och \u00e5rstider, och vintern ger m\u00e5nader av autentiskt l\u00e4rande.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med vinterscenarier (sn\u00f6bollar, djur)', howWeAddress: 'R\u00e4kneuppgifter med sn\u00f6gubbar, sn\u00f6bollar och vinterdjur g\u00f6r operationerna s\u00e4songsanknutna och lustfyllda' },
      { milestone: 'M\u00e4tning av sn\u00f6djup och temperaturf\u00f6rst\u00e5else', howWeAddress: 'M\u00e4t\u00f6vningar med sn\u00f6 och termometeravl\u00e4sning introducerar m\u00e4tbegrepp och negativa tal' },
      { milestone: 'Sekvensering av vinteraktiviteter (kl\u00e4dordning)', howWeAddress: 'Ordnings\u00f6vningar d\u00e4r barn sekvenserar p\u00e5kl\u00e4dning f\u00f6r utevistelse bygger processt\u00e4nkande' },
      { milestone: 'Vinterordf\u00f6rr\u00e5d och l\u00e4sf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar och korsord med vintertermer bygger ordigenk\u00e4nning och s\u00e4songsspecifikt ordf\u00f6rr\u00e5d' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, anv\u00e4nd riktig sn\u00f6 och is som komplement, begr\u00e4nsa r\u00e4kneomr\u00e5det till fem och fokusera p\u00e5 en vinteraktivitet per tillf\u00e4lle. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till temperaturj\u00e4mf\u00f6relser med negativa tal, introducera vinterdjurens anpassningsstrategier och l\u00e5t barnen skriva en vinterdagbok.',
    parentTakeaway: 'Vintern \u00e4r matematikens vinterland! M\u00e4t sn\u00f6djupet i tr\u00e4dg\u00e5rden, r\u00e4kna sn\u00f6bollar, och \u00f6va subtraktion med vantar: \u201dvi hade \u00e5tta vantar, tv\u00e5 blev blöta, hur m\u00e5nga torra kvar?\u201d. L\u00e4s termometern varje morgon och j\u00e4mf\u00f6r med ig\u00e5r. Sp\u00e5ra djurfotsp\u00e5r i sn\u00f6n och r\u00e4kna dem. Bygg en sn\u00f6gubbe och r\u00e4kna knappar och pinnar.',
    classroomIntegration: 'Vintertemat i f\u00f6rskoleklassen ger m\u00e5nader av l\u00e4rande: i matematiken m\u00e4ts sn\u00f6 och r\u00e4knas vinterf\u00f6rem\u00e5l, i NO studeras vinterdjurens anpassningar och temperatur, i svenskan \u00f6vas vinterord i pussel och skrivuppgifter, och p\u00e5 utedagar \u00f6vas m\u00e4tning och observation i sn\u00f6n. Lgr22:s m\u00e5l f\u00f6r \u00e5rstidsf\u00f6rst\u00e5else st\u00f6ds direkt.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med vintermotiv', emerging: 'l\u00f6ser additionsuppgifter inom 5 med sn\u00f6bilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med vinterscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och inkluderar m\u00e4tuppdrag' },
      { skill: 'Sn\u00f6m\u00e4tning och temperaturf\u00f6rst\u00e5else', emerging: 'j\u00e4mf\u00f6r sn\u00f6djup (mer/mindre) med st\u00f6d', proficient: 'mäter sj\u00e4lvst\u00e4ndigt sn\u00f6djup med icke-standardm\u00e5tt och l\u00e4ser termometer', advanced: 'mäter i centimeter och j\u00e4mf\u00f6r temperaturer \u00f6ver tid' },
      { skill: 'Vinterordpussel', emerging: 'hittar 2\u20133 vinterord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 vintertermer', advanced: 'l\u00f6ser korsord och skriver vinterdagbok med orden' },
    ],
  },

  xmas: {
    seoTitle: 'Gratis Jul\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara jul\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, m\u00f6nster och ordpussel med jultema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'jul\u00f6vningar f\u00f6rskoleklass, jul arbetsblad 5\u20136 \u00e5r, julmatematik, julklappar r\u00e4kning, Lgr22, ordpussel jul, adventskalender, tomten, pepparkaksm\u00e4n, julpyssel',
    snippetAnswer: 'Jul\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder julklappar, pepparkakor och adventskalender f\u00f6r r\u00e4kning, m\u00f6nster och ordpussel. Julens magi ger maximal motivation. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Jultemat i f\u00f6rskoleklass anv\u00e4nder den svenska julens traditioner f\u00f6r meningsfull matematik. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med julklappar (sju paket under granen, fyra till kommer \u2014 hur m\u00e5nga?), r\u00e4knar nedat med adventskalendern och skapar m\u00f6nster med pepparkaksfigurer. R\u00e4ttvis f\u00f6rdelning av julklappar introducerar delningst\u00e4nkande. Ordpussel med julordf\u00f6rr\u00e5d som tomte, ren, julstj\u00e4rna och julbock bygger l\u00e4sf\u00e4rdighet. Lgr22 betonar traditioner och kulturell identitet. Svenska julens rika traditioner (lucia, julbord, julafton) ger veckor av engagerande l\u00e4rande.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med julscenarier (klappar, pepparkakor)', howWeAddress: 'R\u00e4kneuppgifter med julklappar, pepparkakor och dekorationer g\u00f6r operationerna festliga och motiverande' },
      { milestone: 'Nedr\u00e4kning och ordningstal (advent)', howWeAddress: 'Adventskalender\u00f6vningar d\u00e4r barn r\u00e4knar dagar till julafton bygger nedr\u00e4knings- och ordningstalsf\u00f6rst\u00e5else' },
      { milestone: 'M\u00f6nsterig\u00e4nk\u00e4nning med julfigurer', howWeAddress: 'M\u00f6nster\u00f6vningar med pepparkakor, stj\u00e4rnor och klockor bygger algebraiskt grundt\u00e4nkande' },
      { milestone: 'Julordf\u00f6rr\u00e5d och l\u00e4sf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar och korsord med jultermer bygger ordigenk\u00e4nning och kulturellt ordf\u00f6rr\u00e5d' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, begr\u00e4nsa till v\u00e4lk\u00e4nda julsymboler (tomte, gran, stj\u00e4rna), h\u00e5ll r\u00e4kneomr\u00e5det inom fem och anv\u00e4nd konkreta juldekorationer. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till budgetr\u00e4kning med julklappar, introducera pepparkaksrecept med m\u00e4tning och l\u00e5t barnen skriva \u00f6nskelistor med antal.',
    parentTakeaway: 'Julen \u00e4r matematik i varje tradition! R\u00e4kna dagar i adventskalendern, julklappar under granen och pepparkakor p\u00e5 pl\u00e5ten. St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga dagar kvar till julafton?\u201d, \u201dom vi bakar tolv pepparkakor och \u00e4ter tre, hur m\u00e5nga kvar?\u201d. Dekorera granen och r\u00e4kna kulor per f\u00e4rg. G\u00f6r en \u00f6nskelista och r\u00e4kna f\u00f6rem\u00e5len. Julen g\u00f6r matematik magisk.',
    classroomIntegration: 'Jultemat i f\u00f6rskoleklassen ger veckor av engagemang: i matematiken r\u00e4knas julklappar och bakas med m\u00e4tning, i svenskan \u00f6vas julord i pussel och skrivs \u00f6nskelistor, i bild skapas juldekorationer och luciakronor, och i musik sjungs juls\u00e5nger. Adventskalendern ger daglig nedr\u00e4kning. Lgr22:s m\u00e5l f\u00f6r traditioner och kulturell identitet st\u00f6ds naturligt.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med julmotiv', emerging: 'l\u00f6ser additionsuppgifter inom 5 med julbilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med julscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna julmatematikproblem' },
      { skill: 'Nedr\u00e4kning och m\u00f6nster', emerging: 'r\u00e4knar ner fr\u00e5n 5 med st\u00f6d och forts\u00e4tter AB-m\u00f6nster', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt ner fr\u00e5n 24 och forts\u00e4tter ABC-m\u00f6nster', advanced: 'r\u00e4knar ner med hopp och skapar egna komplexa m\u00f6nster' },
      { skill: 'Julordpussel', emerging: 'hittar 2\u20133 julord i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 jultermer', advanced: 'l\u00f6ser korsord och skriver julber\u00e4ttelser med orden' },
    ],
  },

  zoo: {
    seoTitle: 'Gratis Djurparks\u00f6vningar F\u00f6rskoleklass | LessonCraftStudio',
    seoDescription: 'Utskrivbara djurparks\u00f6vningar f\u00f6r f\u00f6rskoleklassbarn (5\u20136 \u00e5r). R\u00e4kning, klassificering och ordpussel med djurparkstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'djurparks\u00f6vningar f\u00f6rskoleklass, djurpark arbetsblad 5\u20136 \u00e5r, exotiska djur r\u00e4kning, klassificering djur, Lgr22, ordpussel djurpark, kontinenter, artkunskap, biologisk m\u00e5ngfald, djurv\u00e4lfärd',
    snippetAnswer: 'Djurparks\u00f6vningar f\u00f6r f\u00f6rskoleklass (5\u20136 \u00e5r) anv\u00e4nder lejon, elefanter och giraffer f\u00f6r r\u00e4kning, klassificering och ordpussel. Exotiska djur fascinerar och motiverar. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Djurparkstemat i f\u00f6rskoleklass kopplar matematik till biologi och geografi. Fem- och sex\u00e5ringar l\u00f6ser additionsuppgifter med djurparksdjur (sex apor i hägnet, tre till klättrar in \u2014 hur m\u00e5nga?), klassificerar djur efter kontinent, kost och djurgrupp, och skapar stapeldiagram \u00f6ver djurparkens populationer. Storleksj\u00e4mf\u00f6relser (mus < apa < lejon < elefant) bygger ordningsbegrepp. Ordpussel med djurparksordf\u00f6rr\u00e5d som h\u00e4gn, utst\u00e4llning, v\u00e4xt\u00e4tare och rovdjur bygger naturvetenskaplig terminologi. Lgr22 betonar biologisk m\u00e5ngfald och artkunskap. Svenska Skansen och Kolm\u00e5rden ger stark verklighetskoppling.',
    developmentalMilestones: [
      { milestone: 'Addition och subtraktion med djurparksscenarier', howWeAddress: 'R\u00e4kneuppgifter med djur i h\u00e4gn och p\u00e5 utst\u00e4llningar g\u00f6r operationerna sp\u00e4nnande och verklighetskopplade' },
      { milestone: 'Klassificering efter djurgrupp, kontinent och kost', howWeAddress: 'Sorteringsuppgifter d\u00e4r barn grupperar djur efter flera kriterier utvecklar vetenskapligt t\u00e4nkande' },
      { milestone: 'Storleksj\u00e4mf\u00f6relse och ordning av djur', howWeAddress: 'Ordnings\u00f6vningar d\u00e4r barn rangordnar djur efter storlek bygger j\u00e4mf\u00f6relsef\u00f6rm\u00e5ga och m\u00e4tordf\u00f6rr\u00e5d' },
      { milestone: 'Djurparksordf\u00f6rr\u00e5d och l\u00e4sf\u00e4rdighet', howWeAddress: 'Ords\u00f6kningar och korsord med djurparks- och biologitermer bygger ordigenk\u00e4nning' },
    ],
    differentiationNotes: 'F\u00f6r f\u00f6rskoleklassbarn som beh\u00f6ver st\u00f6d, fokusera p\u00e5 fem v\u00e4lk\u00e4nda djur, begr\u00e4nsa r\u00e4kneomr\u00e5det till fem och anv\u00e4nd leksaksdjur som komplement. F\u00f6r avancerade f\u00f6rskoleklassbarn l\u00e4gg till fler djur med fakta, introducera enkel kartl\u00e4sning f\u00f6r att hitta djurens hemkontinenter och l\u00e5t barnen skriva djurparksguidetexter.',
    parentTakeaway: 'Djurparksbes\u00f6k \u00e4r l\u00e4randeupplevelser! R\u00e4kna djur i varje h\u00e4gn, j\u00e4mf\u00f6r storlekar och sortera djur efter typ. St\u00e4ll fr\u00e5gor: \u201dhur m\u00e5nga apor r\u00e4knade vi?\u201d, \u201d\u00e4r giraffen st\u00f6rre eller mindre \u00e4n elefanten?\u201d. G\u00f6r en djurparkskarta hemma och rita era favoritdjur p\u00e5 r\u00e4tt plats. L\u00e4s om djur i bilderb\u00f6cker och prata om var de bor i v\u00e4rlden.',
    classroomIntegration: 'Djurparkstemat i f\u00f6rskoleklassen integreras med Lgr22:s m\u00e5l: i matematiken r\u00e4knas och sorteras djur, i NO studeras artkunskap och biologisk m\u00e5ngfald, i geografi utforskas kontinenter, i svenskan \u00f6vas djurparksord i pussel och skrivuppgifter. Studiebes\u00f6k till djurpark eller Skansen ger f\u00f6rstahandsupplevelse som arbetsbladen f\u00f6rl\u00e4nger.',
    assessmentRubric: [
      { skill: 'Addition och subtraktion med djurparksdjur', emerging: 'l\u00f6ser additionsuppgifter inom 5 med djurbilder', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion inom 10 med djurparksscenarier', advanced: 'l\u00f6ser textuppgifter inom 20 och skapar egna r\u00e4kneuppgifter om djur' },
      { skill: 'Djurklassificering', emerging: 'sorterar djur i tv\u00e5 grupper med st\u00f6d (stort/litet)', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter tre kriterier (kontinent, kost, djurgrupp)', advanced: 'skapar egna sorteringskriterier och kopplar till bevarandearbete' },
      { skill: 'Djurparksordpussel', emerging: 'hittar 2\u20133 djurnamn i ords\u00f6kning med st\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt pussel med 5\u20136 djurparkstermer', advanced: 'l\u00f6ser korsord med biologitermer och skriver djurfakta' },
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
